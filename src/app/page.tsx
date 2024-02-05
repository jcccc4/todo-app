import { getServerSession } from "next-auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import AddTodo from "@/components/actions/addTodo";
import TodoList from "@/components/actions/todoList";
import { getData } from "@/components/actions/todoActions";

export default async function Home() {
  const session = await getServerSession();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getData,
  });

  if (session) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AddTodo />
        <TodoList />
      </HydrationBoundary>
    );
  }
}
