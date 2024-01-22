
import AddTodo from "./actions/addTodo";

type Props = {
  data: { id: number; content: string | null; authorId: number | null }[];
};

function TaskList({data}: Props) {
  return (
    <div>
      <AddTodo data={data} />
     
    </div>
  );
}

export default TaskList;
