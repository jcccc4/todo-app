import React, { useEffect, useState } from "react";
import { prisma } from "../lib/prisma";
import { IconX } from "@tabler/icons-react";
import { deleteTodo, editTodo } from "../actions/todoActions";
export interface Y {
  id: number;
  content: string;
}
async function getData() {
  const data = await prisma.post.findMany();

  return data;
}
async function TaskList() {
  const datas = await getData();
  return (
    <ul className="max-w-sm mx-auto flex flex-col gap-4">
      {datas.map((data) => (
        <li
          key={data.id}
          className="w-full h-10 px-4 flex items-center justify-between border border-sky-500"
        >
          <form action={editTodo} className="w-6 h-6">
            <input type="hidden" name="editId" value={data.id} />
            <input name="editValue" value={data.content || ""} />
          </form>


          <form action={deleteTodo} className="w-6 h-6">
            <input type="hidden" name="inputId" value={data.id} />
            <button type="submit">
              <IconX />
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
