"use client";
import { useEffect, useState } from "react";
import ListHeader from "@/app/ui/listHeader";
import TaskList from "./ui/taskList";
import { useRouter } from "next/navigation";
import { title } from "process";

export interface Y {
  id: number;
  action: string;
}

export default function Home() {
  const router = useRouter();
  const [task, setTask] = useState("");
  // const [taskList, setTaskList] = useState<Array<Y>>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setTask(input);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        useEffect(() => {
          fetch("/api/users/1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ authorId: 1, content: task }),
          });
          console.log(task)
          
        });
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <main className="">
      <ListHeader listName="Task List" />
      <input
        type="text"
        className="max-w-sm mx-auto mt-10 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="Add Task"
        value={task}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleSubmit(e)}
      />
      <TaskList />
    </main>
  );
}
