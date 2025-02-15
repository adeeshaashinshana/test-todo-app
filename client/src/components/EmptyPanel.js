import React from "react";

const EmptyPanel = ({ handleShowPopup }) => {
  return (
    <div className="emptyPanel">
      <h3>No any ToDo here...</h3>
      <button onClick={handleShowPopup} className="addNewTodoBtn">
        Add New Todo Now
      </button>
    </div>
  );
};

export default EmptyPanel;
