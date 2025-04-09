import React from 'react';
import TodoForm from './TodoForm';

const EditModal = ({ setTodoList, setIsModalOpen, currentTodo }) => {

  return (
    <div className="">
      <div
        className="fixed left-0 top-0 z-40 size-full cursor-pointer bg-black opacity-50"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className="relative rounded-lg bg-white p-8">
          <TodoForm setTodoList={setTodoList} currentTodo={currentTodo} setIsModalOpen={setIsModalOpen}/>
        </div>
      </div>
    </div>
  );
};

export default EditModal