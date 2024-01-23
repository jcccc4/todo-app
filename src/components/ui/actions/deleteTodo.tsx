import { IconX } from "@tabler/icons-react";
import React from "react";

type Props = {
  data: { id: number; content: string | null; authorId: number | null };
  formDeleteAction: (formData: FormData) => void;
};

function DeleteTodo({ data, formDeleteAction }: Props) {
  return (
    <form action={formDeleteAction} className="w-6 h-6">
      <input type="hidden" name="inputId" value={data.id} />
      <button type="submit">
        <IconX />
      </button>
    </form>
  );
}

export default DeleteTodo;
