import { IconX } from "@tabler/icons-react";
import React from "react";
import { deleteTodo } from "../actions/todoActions";

type Props = {
  data: { id: number; content: string | null; authorId: number | null };
};



function DeleteTodo({ data }: Props) {
  return (
    <form action={deleteTodo} className="w-6 h-6">
      <input type="hidden" name="inputId" value={data.id} />
      <button type="submit">
        <IconX />
      </button>
    </form>
  );
}

export default DeleteTodo;
