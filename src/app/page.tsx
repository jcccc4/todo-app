import TaskList from "../components/ui/taskList";

import { getServerSession } from "next-auth";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { prisma } from "@/components/lib/prisma";

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
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getData,
  })
  
  if (session) {
    return <HydrationBoundary state={dehydrate(queryClient)}><TaskList /></HydrationBoundary>;
  }
}
