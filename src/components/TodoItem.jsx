import React from "react";

export function TodoItem({ lista, toggleTask }) {
  const { id, task, completed } = lista;

  const handleTaskClick = () => {
    toggleTask(id);
  };

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={handleTaskClick} />
      {task}
    </li>
  );
}
