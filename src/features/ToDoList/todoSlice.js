import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: JSON.parse(localStorage.getItem("todoList")) || [
    { id: 1, title: "Alışveriş Yapılacak", isCompleted: true },
    { id: 2, title: "Kursa Katılanacak", isCompleted: false },
    { id: 3, title: "Kahve İçilecek", isCompleted: true },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addNewTodo: (state, action) => {
      state.list.push(action.payload);

      localStorage.setItem("todoList", JSON.stringify(state.list));
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const deletedTodo = (state.list = state.list.filter(
        (item) => item.id !== id
      ));

      localStorage.setItem("todoList", JSON.stringify(state.list));
    },
    changeTheIsCompleted: (state, action) => {
      const { id, isCompleted } = action.payload;
      state.list = state.list.map((todo) =>
        todo.id === id ? { ...todo, isCompleted } : todo
      );
      localStorage.setItem("todoList", JSON.stringify(state.list));
    },
  },
});

export const { addNewTodo, changeTheIsCompleted, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
