import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { PiPencilDuotone } from "react-icons/pi";

const TodoListItem = ({ todo, setTodoList, setIsModalOpen, setCurrentTodo }) => {
  const handleDelete = () => {
    setTodoList((prev) => prev.filter((item) => item.id !== todo.id));
  };

  const handleCheck = () => {
    setTodoList((prev) => 
      prev.map((item) => item.id === todo.id ? {...item, isDone: !item.isDone} : item)
    )
  }
  return (
    <li class="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`w-5 h-5 mr-3 border border-gray-300 rounded-sm cursor-pointer flex items-center justify-center ${
            todo.isDone ? "bg-green-500 border-none" : ""
          }`}
          onClick={handleCheck}
        >
          {todo.isDone && <FaCheck className="text-white text-[10px]" />}
        </div>
        <div className={todo.isDone && "line-through"}>todo.content</div>
        <button
          className="ml-2 p-1 cursor-pointer"
          onClick={() => {
            setIsModalOpen(true);
            setCurrentTodo(todo);
          }}
        >
          <PiPencilDuotone />
        </button>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 p-1 border-red-300 border rounded-lg cursor-pointer"
      >
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default TodoListItem;
