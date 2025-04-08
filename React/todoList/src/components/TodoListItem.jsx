const TodoListItem = ({todo, setTodoList}) => {
  const handleDelete = () => {
    setTodoList(prev => prev.filter(item => item.id !== todo.id));
  }
  return <li>{todo.content}<button onClick={handleDelete}>삭제</button><button onClick={handleDelete}>삭제</button></li>;
}

export default TodoListItem