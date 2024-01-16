"use client";
import React, { useRef } from "react";
import { editTodo } from "../actions/todoActions";

type Props = {
  data: { id: number; content: string | null; authorId: number | null };
};

function EditTodo({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = () => {
    formRef.current?.submit();
  };

  return (
    <form action={editTodo} ref={formRef} className="w-6 h-6">
      <input type="hidden" name="editId" value={data.id} />
      <input
        name="editValue"
        value={data.content || ""}
        className="focus:outline-none "
        onChange={handleChange}
      />
    </form>
  );
}

export default EditTodo;
