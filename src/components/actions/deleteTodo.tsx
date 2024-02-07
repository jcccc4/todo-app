import { IconX } from "@tabler/icons-react";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { deleteTodo } from "./todoActions";

type Props = {
  data: { id: number; content: string | null; authorId: number | null };
  index: number;
};

type dataProps = {
  id: number;
  content: string | null;
  authorId: number | null;
};

function DeleteTodo({ data, index }: Props) {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
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
