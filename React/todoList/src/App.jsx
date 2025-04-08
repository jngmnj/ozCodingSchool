import { useState } from 'react';
import './App.css';
import EditModal from './components/EditModal';
import TodoForm from './components/TodoForm';
import TodoListItem from './components/TodoListItem';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 0, content: "밥먹기"},
    {id: 1, content: "코딩 공부하기"},
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  console.log(isModalOpen)

  return (
    <div>
      {isModalOpen && (
        <>
          <EditModal
            setIsModalOpen={setIsModalOpen}
            currentTodo={currentTodo}
            setTodoList={setTodoList}
          />
          test {isModalOpen}
        </>
      )}
      <TodoForm setTodoList={setTodoList} />
      <ul>
        {todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            setIsModalOpen={setIsModalOpen}
            setTodoList={setTodoList}
            setCurrentTodo={setCurrentTodo}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App