
import ListHeader from "@/app/ui/listHeader";
import TaskList from "./ui/taskList";
import AddTodo from "@/app/ui/addTodo";
import { PrismaClient } from "@prisma/client";

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
  return (
    <main className="">
      <ListHeader listName="Task List" />
      <AddTodo />
      <TaskList data={datas}/>
    </main>
  );
}
