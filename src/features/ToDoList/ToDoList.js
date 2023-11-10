import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, changeTheIsCompleted, deleteTodo } from "./todoSlice";
import { AiOutlineCheck } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";

const ToDoList = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const todoList = useSelector((state) => state.todo.list);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const newTodo = {
      id: todoList.length + 1,
      title: newTodoTitle,
      isCompleted: false,
    };
    dispatch(addNewTodo(newTodo));
    setNewTodoTitle("");
  };

  const handleUpdateIsCompleted = (id, isCompleted) => {
    const updatedCompleted = !isCompleted;
    dispatch(changeTheIsCompleted({ id, isCompleted: updatedCompleted }));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-white text-center">ToDo List</h1>
      <div className="flex flex-row gap-2 pt-10">
        <input
          className="bg-transparent border border-t-0 border-x-0 border-b-white outline-none text-white"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        ></input>
        <button
          className="bg-slate-500 text-white py-1 px-3"
          onClick={handleAddTodo}
        >
          Ekle
        </button>
      </div>
      <div className="flex flex-col gap-5 pt-10">
        {todoList.map((t) => (
          <li
            className="list-none text-center text-white flex flex-row items-center justify-between"
            key={t.id}
          >
            {t.isCompleted === true ? (
              <p className="text-green-600">{t.title}</p>
            ) : (
              <p className="text-red-600">{t.title}</p>
            )}
            <button
              onClick={() => handleUpdateIsCompleted(t.id, t.isCompleted)}
              value={t.isCompleted}
            >
              {t.isCompleted ? (
                <AiOutlineCheck className="text-xl text-green-600" />
              ) : (
                <MdDangerous className="text-xl text-red-600" />
              )}
            </button>
            <button onClick={() => handleDeleteTodo(t.id)}>
              <BsFillTrash3Fill className="text-lg text-white" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
