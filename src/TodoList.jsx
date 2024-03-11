import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value
    });
  };

  const addTodo = () => {
    setTodos([todo, ...todos]);
    setTodo({ description: "", date: "", priority: "" });
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <>
      <input
        placeholder="Description"
        name="description"
        onChange={handleChange}
        value={todo.description}
      />
      <input
        type="date"
        placeholder="Date"
        name="date"
        onChange={handleChange}
        value={todo.date}
      />
      <input
        placeholder="Priority"
        name="priority"
        onChange={handleChange}
        value={todo.priority}
      />
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} deleteTodo={deleteTodo} />
    </>
  );
}

export default TodoList;
