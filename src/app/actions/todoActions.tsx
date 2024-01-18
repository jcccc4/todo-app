"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";

export async function create(formData: FormData) {
  const input = formData.get("input") as string;

  if (!input.trim()) {
    return;
  }

  await prisma.post.create({
    data: {
      authorId: 1,
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
  console.log(content)
  
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
