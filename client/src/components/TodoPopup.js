import React, { useState, useEffect } from "react";

const TodoPopup = ({
  showPopup,
  handleHidePopup,
  addNewTodo,
  updateData,
  updateTodo,
}) => {
  const [title, setTitle] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isKeepAdding, setIsKeepAdding] = useState(false);

  const handleAddTodo = () => {
    if (title.trim() === "") {
      setIsValid(false);
    } else {
      addNewTodo(title);
      setTitle("");
      setIsValid(true);
      if (!isKeepAdding) {
        handleHidePopup();
      }
    }
  };

  const handleUpdateTodo = () => {
    if (title.trim() === "") {
      setIsValid(false);
    } else {
      updateTodo({
        id: updateData.id,
        name: title,
        isDone: updateData.isDone,
      });
      setTitle("");
      setIsValid(true);
      handleHidePopup();
    }
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);

    if (newTitle.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    if (updateData.id !== "") {
      setTitle(updateData.name);
    }
  }, []);

  return (
    <div className={`popupOverlay ${showPopup ? "show" : ""}`}>
      <div className="popupContent">
        <h2 className="popupHeader">
          {updateData.id === "" ? "Add New" : "Update"} ToDO
        </h2>
        <div className="popupBody">
          <p>Enter ToDo title here :</p>
          <input
            className={`todoText ${isValid ? "" : "notValid"}`}
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          {!isValid && (
            <p className="validationText">Please add a title here.!</p>
          )}
        </div>
        <div className="popupBtnPanel">
          {updateData.id === "" ? (
            <label>
              <input
                className="addTodoCheckbox"
                type="checkbox"
                checked={isKeepAdding}
                onChange={() => setIsKeepAdding(!isKeepAdding)}
              />
              Keep adding ToDos
            </label>
          ) : (
            <label></label>
          )}
          <span>
            {updateData.id === "" ? (
              <button onClick={handleAddTodo} className="addNewTodoBtn">
                Add
              </button>
            ) : (
              <button onClick={handleUpdateTodo} className="updateTodoBtn">
                Update
              </button>
            )}

            <button onClick={handleHidePopup} className="popupCloseBtn">
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoPopup;
