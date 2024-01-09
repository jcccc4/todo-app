import React, { useEffect, useState } from "react";

export interface Y {
  id: number;
  content: string;
}
type Props = {
  taskList: Array<Y>;
}
function TaskList({taskList}: Props) {
 

  return (
    <ul className="max-w-sm mx-auto ">
      {taskList.map((task) => (
        <li key={task.id}>{task.content}</li>
      ))}
    </ul>
  );
}

export default TaskList;
