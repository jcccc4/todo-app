"use client";
import {
  create,
  deleteTodo,
  editTodo,
} from "@/components/actions/todoActions";
import { useRef } from "react";
import EditTodo from "./editTodo";
import DeleteTodo from "./deleteTodo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import prisma from "@/lib/prisma";

type dataProps = {
  id: number;
  content: string | null;
  authorId: number | null;
};

function AddTodo() {
  const queryClient = useQueryClient();
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

  const addTodoMutation = useMutation({
    mutationFn: create,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousTodos = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old: dataProps[]) => [
        ...old,
        { authorId: 1, content: newTodo.get("input") as string },
      ]);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["posts"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const closeTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const index = newTodo.get("index") as string;
      console.log(index);
      queryClient.setQueryData(["posts"], (old: dataProps[]) =>
        old.filter((item: dataProps, dataIndex) => dataIndex !== Number(index))
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const id = newTodo.get("editId") as string;

      queryClient.setQueryData(["posts"], (old: dataProps[]) =>
        old.map((item: dataProps) => {
          if (item.id !== Number(id)) {
            item.content = newTodo.get("editContent") as string;
            return item;
          }
          return item;
        })
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <main>
      <form
        action={(formData) => addTodoMutation.mutate(formData)}
        className="w-1/2 m-auto"
        ref={formRef}
      >
        <input
          name="input"
          type="text"
          className="max-w-sm mx-auto mt-10 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Add Task"
        />
      </form>
      <ul className="max-w-sm mx-auto flex flex-col gap-4">
        {data?.map((data: dataProps, index: number) => (
          <li
            key={data.id}
            className="w-full h-10 px-4 flex items-center justify-between border border-sky-500"
          >
            <EditTodo data={data} editTodoMutation={editTodoMutation} />
            <DeleteTodo
              data={data}
              closeTodoMutation={closeTodoMutation}
              index={index}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default AddTodo;
