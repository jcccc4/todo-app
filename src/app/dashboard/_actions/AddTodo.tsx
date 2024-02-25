"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAction } from "@/data-access/todoActions";
import { dataProps } from "@/lib/types";

function AddTodo() {
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation({
    mutationFn: createAction,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousTodos = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old: dataProps[]) => [
        ...old,
        { authorId: 1, content: newTodo.get("input") as string },
      ]);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["posts"], context?.previousTodos);
    },
  });

  return (
    <form
      action={(formData) => addTodoMutation.mutate(formData)}
      className="w-1/2 m-auto"
    >
      <input
        id="createTask"
        name="input"
        type="text"
        className="max-w-sm mx-auto mt-10 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="Add Task"
      />
    </form>
  );
}

export default AddTodo;
