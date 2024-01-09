"use client";
import { useEffect, useState } from "react";
import ListHeader from "@/app/ui/listHeader";
import TaskList from "./ui/taskList";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { create } from "@/app/actions/todoActions";
export interface Y {
  id: number;
  content: string;
}

export default function Home() {
  const [task, setTask] = useState("");

  const [taskList, setTaskList] = useState<Array<Y>>([]);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/1/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTaskList(data);
      });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    console.log(input);
    setTask(input);
  };

  const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        await fetch("/api/users/1", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authorId: 1, content: task }),
        }).then((response) => {
          revalidatePath("/");
          router.refresh();
        });
        router.refresh();
      } catch (error) {
        console.error(error);
      }
      router.refresh();
    }
  };

  return (
    <main className="">
      <ListHeader listName="Task List" />
      <form action={create} className="w-1/2 m-auto">
        <input
          name="input"
          type="text"
          className="max-w-sm mx-auto mt-10 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Add Task"
          value={task}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleSubmit(e)}
        />
        <button type="submit">submit</button>
      </form>
      <TaskList taskList={taskList} />
    </main>
  );
}
