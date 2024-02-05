"use client";
import React, { useEffect, useRef, useState } from "react";
import { editTodo } from "./todoActions";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  data: { id: number; content: string | null; authorId: number | null };
};
type dataProps = {
  id: number;
  content: string | null;
  authorId: number | null;
};

function EditTodo({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [firstRender, setFirstRender] = useState(true);
  const [value, setValue] = useState(data.content || "");
  const debouncedValue = useDebounce(value);

  const queryClient = useQueryClient();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!firstRender) {
      formRef.current?.requestSubmit();
    }
  }, [debouncedValue]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <form
      action={(formData) => editTodoMutation.mutate(formData)}
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
