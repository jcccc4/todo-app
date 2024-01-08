import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { content, authorId } = await request.json();

  const newPost = await prisma.post.create({
    data: {
      content: content,
      authorId: authorId,
    },
  });
  return NextResponse.json({ newPost }, { status: 200 });
}
