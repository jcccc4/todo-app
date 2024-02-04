import TaskList from "../components/taskList";

import { getServerSession } from "next-auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import prisma from "@/lib/prisma";
import AddTodo from "@/components/actions/addTodo";

async function getData() {
  const data = await prisma.post.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return data;
}

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
      </HydrationBoundary>
    );
  }
}
