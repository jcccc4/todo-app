import { IconX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteAction } from "@/data-access/todoActions";
import { dataProps } from "@/lib/types";

type Props = {
  data: { id: number; content: string | null; email: string | null };
  index: number;
};


function DeleteTodo({ data, index }: Props) {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation({
    mutationFn: deleteAction,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const index = newTodo.get("index") as string;
      console.log(index);
      queryClient.setQueryData(["posts"], (old: dataProps[]) =>
        old.filter((item: dataProps, dataIndex) => dataIndex !== Number(index))
      );
    },
  });
  return (
    <form
      action={(formData) => {
        formData.set("index", index.toString());
        deleteTodoMutation.mutate(formData);
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
