
import { create } from "@/app/actions/todoActions";

function AddTodo() {
  return (
    <form action={create} className="w-1/2 m-auto">
      <input
        name="input"
        type="text"
        className="max-w-sm mx-auto mt-10 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="Add Task"
      />
      <button type="submit">submit</button>
    </form>
  );
}

export default AddTodo;
