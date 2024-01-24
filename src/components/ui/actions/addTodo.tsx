"use client";
import {
  create,
  deleteTodo,
  editTodo,
} from "@/components/ui/actions/todoActions";
import { useOptimistic, useRef } from "react";
import EditTodo from "./editTodo";
import DeleteTodo from "./deleteTodo";
import { useQuery } from "@tanstack/react-query";
import { prisma } from "@/components/lib/prisma";

type Props = {
  data:
    | { id: number; content: string | null; authorId: number | null }[]
    | undefined;
};

type dataProps = {
  id: number;
  content: string | null;
  authorId: number | null;
};

type dataPropsWithAction = {
  id: number;
  content: string | null;
  authorId: number | null;
  action: string | null;
};

 function AddTodo() {
  
  async function getData() {
    const data = await prisma.post.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return data;
  }
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getData });
  console.log(data);
  return (
    <main>
      <form action={create} className="w-1/2 m-auto" ref={formRef}>
        <input
          name="input"
          type="text"
          className="max-w-sm mx-auto mt-10 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Add Task"
        />
      </form>
      <ul className="max-w-sm mx-auto flex flex-col gap-4">
        {data?.map((data: dataProps) => (
          <li
            key={data.id}
            className="w-full h-10 px-4 flex items-center justify-between border border-sky-500"
          >{data.content}
            {/* <EditTodo data={data} formEditAction={formEditAction} />
            <DeleteTodo data={data} formDeleteAction={formDeleteAction} /> */}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default AddTodo;
