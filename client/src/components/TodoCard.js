import React, { useState } from "react";

const TodoCard = ({ data, removeTodo, handleUpdateTodo }) => {
  const [isDone, setIsDone] = useState(data.isDone);

  const handleCheckboxChange = () => {
    setIsDone(!isDone);
  };

  return (
    <div className={`todoCard ${isDone ? "isDone" : ""}`}>
      <span>
        <span>{data.index}</span>
        <span>{data.name}</span>
      </span>
      <span className="todoCardControlerPanel">
        <button onClick={() => removeTodo(data.id)} className="todoRemoveBtn">
          Remove
        </button>
        <button
          onClick={() => handleUpdateTodo(data)}
          className="todoUpdateBtn"
          disabled={isDone}
        >
          Update
        </button>
        <input
          className="todoCheckbox"
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxChange}
        />
      </span>
    </div>
  );
};

export default TodoCard;
