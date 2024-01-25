import { IconX } from "@tabler/icons-react";
import { UseMutationResult } from "@tanstack/react-query";
import React from "react";

type Props = {
  data: { id: number; content: string | null; authorId: number | null };
  closeTodoMutation: UseMutationResult<void, Error, FormData, void>;
};

function DeleteTodo({ data, closeTodoMutation }: Props) {
  return (
    <form
      action={(formData) => closeTodoMutation.mutate(formData)}
      className="w-6 h-6"
    >
      <input type="hidden" name="inputId" value={data.id} />
      <button type="submit">
        <IconX />
      </button>
    </form>
  );
}

export default DeleteTodo;
