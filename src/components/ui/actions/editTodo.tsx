"use client";
import React, { useEffect, useRef, useState } from "react";
import { editTodo } from "./todoActions";
import { useDebounce } from "../../hooks/useDebounce";
import { UseMutationResult } from "@tanstack/react-query";

type Props = {
  data: { id: number; content: string | null; authorId: number | null };
  editTodoMutation: UseMutationResult<void, Error, FormData, void>;
};

function EditTodo({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState(data.content || "");
  const debouncedValue = useDebounce(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    formRef.current?.requestSubmit();
  }, [debouncedValue]);

  return (
    <form
      action={editTodo}
      ref={formRef}
      className="w-6 h-6"
    >
      <input type="hidden" name="editId" value={data.id} />
      <input
        name="editValue"
        defaultValue={value}
        className="focus:outline-none "
        onChange={handleChange}
      />
    </form>
  );
}

export default EditTodo;
