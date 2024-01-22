import ListHeader from "@/components/ui/listHeader";
import TaskList from "../components/ui/taskList";
import AddTodo from "@/components/ui/actions/addTodo";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
const prisma = new PrismaClient();

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
  if (session) {
    return <TaskList data={datas} />;
  }
}
