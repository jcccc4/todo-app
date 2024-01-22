"use client";
import { create } from "@/components/ui/actions/todoActions";
import { useOptimistic, useRef } from "react";
import EditTodo from "./editTodo";
import DeleteTodo from "./deleteTodo";

type Props = {
  data: { id: number; content: string | null; authorId: number | null }[];
};

type dataProps = {
  id: number;
  content: string | null;
  authorId: number | null;
};

function AddTodo({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  async function formAction(formData: FormData) {
    addOptimistic({
      id: 1,
      content: formData.get("input") as string,
      authorId: null,
    });
    formRef.current?.reset();
    await create(formData);
  }
  const [optimisticState, addOptimistic] = useOptimistic(
    data,
    (state, test: dataProps) => [...state, test]
  );
  return (
    <main>
      <form action={formAction} className="w-1/2 m-auto" ref={formRef}>
        <input
          name="input"
          type="text"
          className="max-w-sm mx-auto mt-10 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Add Task"
        />
      </form>
      <ul className="max-w-sm mx-auto flex flex-col gap-4">
        {optimisticState.map((data: dataProps) => (
          <li
            key={data.id}
            className="w-full h-10 px-4 flex items-center justify-between border border-sky-500"
          >
            <EditTodo data={data} />
            <DeleteTodo data={data} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default AddTodo;
