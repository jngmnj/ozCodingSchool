import { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 0, content: "밥먹기"},
    {id: 0, content: "코딩 공부하기"},
  ]);

  return (
    <div >
      <ul>
        <li></li>
      </ul>
    </div>
  )
}

export default App
