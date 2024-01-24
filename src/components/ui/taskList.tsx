import AddTodo from "./actions/addTodo";

type Props = {
  data:
    | { id: number; content: string | null; authorId: number | null }[]
    | undefined;
};

function TaskList() {
  return (
    <div>
      <AddTodo />
    </div>
  );
}

export default TaskList;
