"use client";

import React from "react";
import EditTodo from "./_actions/EditTodo";
import DeleteTodo from "./_actions/DeleteTodo";
import { getData } from "@/data-access/todoActions";

import { useQuery } from "@tanstack/react-query";

type dataProps = {
  id: number;
  content: string | null;
  email: string | null;
};

function TodoList() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getData });

  return (
    <ul className="max-w-sm mx-auto flex flex-col gap-4">
      {data?.map((data: dataProps, index: number) => (
        <li
          key={data.id}
          className="w-full h-10 px-4 flex items-center justify-between border border-sky-500"
        >
          <EditTodo data={data} />
          <DeleteTodo data={data} index={index} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
