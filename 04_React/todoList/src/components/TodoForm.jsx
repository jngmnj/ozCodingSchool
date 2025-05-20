import { useEffect, useState } from "react";
import { v4 } from "uuid";

const TodoForm = ({ setTodoList, currentTodo, setIsModalOpen }) => {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (currentTodo) {
      setInputValue(currentTodo.content);
    }
  }, [currentTodo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    if (currentTodo) {
      setTodoList((prev) =>
        prev.map((item) =>
          item.id === currentTodo.id ? { ...item, content: inputValue } : item
        )
      );
      // alert("성공적으로 변경되었습니다.");
      setIsModalOpen(false);
    } else {
      setTodoList((prev) => [...prev, { id: v4(), content: inputValue }]);
    }
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <input
        type="text"
        value={inputValue}
        placeholder="할일을 작성해주세요."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button>저장</button>
    </form>
  );
};

export default TodoForm;