import { PiPencilDuotone } from "react-icons/pi";
const TodoListItem = ({ todo, setTodoList, setIsModalOpen, setCurrentTodo }) => {
  const handleDelete = () => {
    setTodoList((prev) => prev.filter((item) => item.id !== todo.id));
  };

  return (
    <li>
      {todo.content}
      <button onClick={() => {
        setIsModalOpen(true);
        setCurrentTodo(todo)
      }}>
        <PiPencilDuotone />
      </button>
      <button onClick={handleDelete}>삭제</button>
    </li>
  );
};

export default TodoListItem;
