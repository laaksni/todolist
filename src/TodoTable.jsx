import React from "react";

function TodoTable({ todos, deleteTodo }) {
  return (
    <table>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.description}</td>
            <td>{todo.date}</td>
            <td>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
