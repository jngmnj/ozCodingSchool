import { useState } from 'react';
import './App.css';
import TodoListItem from './components/TodoListItem';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 0, content: "밥먹기"},
    {id: 0, content: "코딩 공부하기"},
  ]);

  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App
