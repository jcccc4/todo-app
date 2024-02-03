import { IconX } from "@tabler/icons-react";
import { UseMutationResult } from "@tanstack/react-query";
import React from "react";

type Props = {
  data: { id: number; content: string | null; authorId: number | null };
  closeTodoMutation: UseMutationResult<void, Error, FormData>;
  index: number;
};

function DeleteTodo({ data, closeTodoMutation, index }: Props) {
  return (
    <form
      action={(formData) => {
        formData.set("index", index.toString());
        closeTodoMutation.mutate(formData);
      }}
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
