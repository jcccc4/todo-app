"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/app/lib/prisma";
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

// }

// export async function edit(formData: FormData) {
//   const input = formData.get("newTitle") as string;
//   const inputId = formData.get("inputId") as string;

//   await prisma.post.update({
//     where: {
//       id: inputId,
//     },
//     data: {
//       title: input,
//     },
//   });

//   revalidatePath("/");
// }

// export async function deleteTodo(formData: FormData) {
//   const inputId = formData.get("inputId") as string;

//   await prisma.post.delete({
//     where: {
//       id: inputId,
//     },
//   });

//   revalidatePath("/");
// }

// export async function todoStatus(formData: FormData) {
//   const inputId = formData.get("inputId") as string;
//   const todo = await prisma.todo.findUnique({
//     where: {
//       id: inputId,
//     },
//   });

//   if (!todo) {
//     return;
//   }

//   const updatedStatus = !todo.isCompleted;

//   await prisma.todo.update({
//     where: {
//       id: inputId,
//     },
//     data: {
//       isCompleted: updatedStatus,
//     },
//   });

//   revalidatePath("/");

//   return updatedStatus;
// }
