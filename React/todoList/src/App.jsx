import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoListItem from './components/TodoListItem';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 0, content: "밥먹기"},
    {id: 0, content: "코딩 공부하기"},
  ]);


  return (
    <div>
      <TodoForm setTodoList={setTodoList} />
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App