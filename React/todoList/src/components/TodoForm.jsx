import { useState } from "react";
import { v4 } from "uuid";

const TodoForm = ({ setTodoList }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList((prev) => [...prev, { id: v4(), content: inputValue }]);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
