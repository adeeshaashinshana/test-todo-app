import React, { useState, useEffect } from "react";
import "./style/index.css";
import TodoCard from "./components/TodoCard";
import TodoPopup from "./components/TodoPopup";
import EmptyPanel from "./components/EmptyPanel";

const App = () => {
  const todos = [
    { id: 1, name: "Todo 1", isDone: false },
    { id: 2, name: "Todo 2", isDone: true },
    { id: 3, name: "Todo 3", isDone: false },
  ];
  const emptyTodo = { id: "", name: "", isDone: false };
  const [todoList, setTodoList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [updateData, setUpdateData] = useState(emptyTodo);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
    setUpdateData(emptyTodo);
  };

  const addNewTodo = (title) => {
    const newId = todoList.length + 1;
    const newTodo = {
      id: newId,
      name: title,
      isDone: false,
    };
    setTodoList((prevList) => [...prevList, newTodo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, name: updatedTodo.name } : todo
      )
    );
  };

  const handleUpdateTodo = (todo) => {
    setUpdateData(todo);
    handleShowPopup();
  };

  const removeTodo = (id) => {
    setTodoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setTodoList(todos);
  }, []);

  return (
    <div className="app">
      <h1>My ToDO List</h1>
      <button className="addTodoFloating" onClick={handleShowPopup}>
        +
      </button>
      <div className="todoContainer">
        {todoList.length === 0 ? (
          <EmptyPanel handleShowPopup={handleShowPopup} />
        ) : (
          todoList.map((todo, index) => {
            return (
              <TodoCard
                key={todo.id}
                index={index}
                data={todo}
                handleUpdateTodo={handleUpdateTodo}
                removeTodo={removeTodo}
              />
            );
          })
        )}
      </div>
      {showPopup && (
        <TodoPopup
          showPopup={showPopup}
          handleHidePopup={handleHidePopup}
          addNewTodo={addNewTodo}
          updateData={updateData}
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
};

export default App;
