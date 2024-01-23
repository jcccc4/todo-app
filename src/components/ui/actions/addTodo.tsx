"use client";
import { create, deleteTodo, editTodo } from "@/components/ui/actions/todoActions";
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

type dataPropsWithAction = {
  id: number;
  content: string | null;
  authorId: number | null;
  action: string | null;
};

function AddTodo({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [optimisticState, addOptimistic] = useOptimistic(
    data,
    (state, test: dataPropsWithAction) => {
      if (test.action === "add") {
        return [
          ...state,
          {
            id: test.id,
            content: test.content as string,
            authorId: test.authorId,
          },
        ];
      } else if (test.action === "edit") {
        return state.map((item) => {
          if (item.id === test.id) {
            return {
              ...item,
              content: test.content as string,
            };
          }
          return item;
        });
      } else if(test.action === "delete"){
        return state.filter((item) => item.id !== test.id)
      }
      return state;
    } 
  );

  async function formAction(formData: FormData) {
    addOptimistic({
      id: 1,
      content: formData.get("input") as string,
      authorId: null,
      action: "add",
    });
    formRef.current?.reset();
    await create(formData);
  }
  async function formEditAction(formData: FormData) {
    const id = formData.get("editId") as string;
    const content = formData.get("editValue") as string;
    addOptimistic({
      id: Number(id),
      content: content as string,
      authorId: null,
      action: "edit",
    });
    formRef.current?.reset();
    await editTodo(formData);
  }

  async function formDeleteAction(formData: FormData) {
    const id = formData.get("inputId") as string;

    addOptimistic({
      id: Number(id),
      content: "",
      authorId: null,
      action: "delete",
    });
    formRef.current?.reset();
    await deleteTodo(formData);
  }

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
            <EditTodo data={data} formEditAction={formEditAction} />
            <DeleteTodo data={data} formDeleteAction={formDeleteAction}/>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default AddTodo;
