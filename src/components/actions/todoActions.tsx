"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function create(formData: FormData) {
  const input = formData.get("input") as string;
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  console.log("userEmail", userEmail);

  if (!input.trim()) {
    return;
  }

  await prisma.post.create({
    data: {
      email: userEmail,
      content: input,
    },
  });
  revalidatePath("/");
}

export async function editTodo(formData: FormData) {
  const id = formData.get("editId") as string;
  const content = formData.get("editValue") as string;

  await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      content: content,
    },
  });
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get("inputId") as string;

  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

  revalidatePath("/");
}

export async function getData() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  const data = await prisma.post.findMany({
    where: {
      email: userEmail,
    },
    orderBy: {
      id: "asc",
    },
  });

  return data;
}
