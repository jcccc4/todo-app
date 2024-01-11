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
