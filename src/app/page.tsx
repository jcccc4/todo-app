import TaskList from "../components/ui/taskList";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const prisma = new PrismaClient();
const queryClient = new QueryClient();
async function getData() {
  const data = await prisma.post.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return data;
}

export default async function Home() {
  const datas = await getData();
  const session = await getServerSession();
  const queryClient = new QueryClient();
  
  if (session) {
    return (
      <QueryClientProvider client={queryClient}>
        <TaskList data={datas} />
      </QueryClientProvider>
    );
  }
}
