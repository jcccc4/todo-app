import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create, deleteTodo, editTodo } from "./todoActions";

type dataProps = {
  id: number;
  content: string | null;
  authorId: number | null;
};

