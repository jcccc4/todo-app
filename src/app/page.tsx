"use client";
import { useState } from "react";
import ListHeader from "@/ui/listHeader";
import Button from "../ui/button";
import prisma from "@/lib/prisma";
export interface Y {
  id: number;
  action: string;
}
async function getPosts() {
  const posts = await prisma.post.findMany();
  where: {
    published: true;
  }
  include: {
    author: {
      select: {
        name: true;
      }
    }
  }
  return posts;
}
export default async function Home() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Array<Y>>([]);

  const posts = await getPosts();
  console.log(posts);
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    console.log(input);
    setTask(input);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTaskList([...taskList, { id: taskList.length, action: task }]);
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

      <ul className="max-w-sm mx-auto ">
        {taskList.map((task) => (
          <li key={task.id}>{task.action}</li>
        ))}
      </ul>
    </main>
  );
}
