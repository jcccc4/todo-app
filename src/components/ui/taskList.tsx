
import EditTodo from "./actions/editTodo";
import DeleteTodo from "./actions/deleteTodo";

type Props = {
  data: { id: number; content: string | null; authorId: number | null }[];
};

// const prisma = new PrismaClient();

// async function getData() {
//   const data = await prisma.post.findMany({
//     orderBy: {
//       id: "asc",
//     },
//   });

//   return data;
// }
async function TaskList({ data }: Props) {
  // const datas = await getData();
  return (
    <ul className="max-w-sm mx-auto flex flex-col gap-4">
      {data.map((data) => (
        <li
          key={data.id}
          className="w-full h-10 px-4 flex items-center justify-between border border-sky-500"
        >
          <EditTodo data={data} />
          <DeleteTodo data={data} />
        </li>
      ))}
      <p></p>
    </ul>
  );
}

export default TaskList;
