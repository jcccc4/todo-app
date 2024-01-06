import React, { useEffect, useState } from "react";

export interface Y {
  id: number;
  content: string;
}

function TaskList() {
  const [taskList, setTaskList] = useState<Array<Y>>([]);
  useEffect(() => {
    fetch("/api/users/1/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTaskList(data)});
  }, []);

  return (
    <ul className="max-w-sm mx-auto ">
      {taskList.map((task) => (
        <li key={task.id}>{task.content}</li>
      ))}
    </ul>
  );
}

export default TaskList;
