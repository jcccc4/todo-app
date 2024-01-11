"use client";
import ListHeader from "@/app/ui/listHeader";
import TaskList from "./ui/taskList";
import AddTodo from "@/app/ui/AddTodo";

export interface Y {
  id: number;
  content: string;
}

export default function Home() {
  return (
    <main className="">
      <ListHeader listName="Task List" />
      <AddTodo />
      <TaskList />
    </main>
  );
}
