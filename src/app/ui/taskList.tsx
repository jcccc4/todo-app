import React, { useEffect, useState } from "react";
import { prisma } from "../lib/prisma";

export interface Y {
  id: number;
  content: string;
}
async function getData() {
  const data = await prisma.post.findMany();

  return data;
}
async function TaskList() {
  const datas = await getData();
  return (
    <ul className="max-w-sm mx-auto ">
      {datas.map((data) => (
        <li key={data.id}>{data.content}</li>
      ))}
    </ul>
  );
}

export default TaskList;
