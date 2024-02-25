"use client";
import React, { useEffect, useRef, useState } from "react";
import { editAction } from "@/data-access/todoActions";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataProps } from "@/lib/types";

type Props = {
  data: dataProps;
};

function TodoStatus({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(data.isCompleted);

  const editTodoMutation = useMutation({
    mutationFn: editAction,
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
  });

  return (
    <form
      action={(formData) => editTodoMutation.mutate(formData)}
      ref={formRef}
      className="w-6 h-6"
    >
      <input type="hidden" name="editId" value={data.id} />
      <input name="editValue" type="checkbox" />
    </form>
  );
}

export default TodoStatus;
