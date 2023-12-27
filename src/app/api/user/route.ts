import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { signUpSchema } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let zodErrors = {};
    const result = signUpSchema.safeParse(body);
    if (result.success) {
      const { username, email, password } = result.data;

      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUserByEmail) {
        return NextResponse.json(
          { user: null, message: "User with this email already exists" },
          { status: 409 }
        );
      }

      const existingUserByUsername = await prisma.user.findUnique({
        where: { username: username },
      });

      if (existingUserByUsername) {
        return NextResponse.json(
          { user: null, message: "User with this email already exists" },
          { status: 409 }
        );
      }

      const hashedPassword = await hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });

      const { password: newUserPassword, ...rest } = newUser;

      return NextResponse.json(
        { user: rest, message: "User created successfully" },
        { status: 201 }
      );
    }
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json(
      Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { success: true }
    );
  } catch (err) {
    // Handle the error and return an appropriate response
    console.error("Error during signup:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
