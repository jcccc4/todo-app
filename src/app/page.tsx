"use client";
import { useState } from "react";
import ListHeader from "@/app/ui/listHeader";

export interface Y {
  id: number;
  action: string;
}

export default function Home() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Array<Y>>([]);


  
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
