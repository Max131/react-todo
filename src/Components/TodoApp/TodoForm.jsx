import { useState, useRef } from "react";

const TodoForm = ({ createTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const Input = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    Input.current.value = "";
    if (newTodo.trim() === "") return;
    createTodo(newTodo);
    setNewTodo("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            name=""
            id=""
            onChange={(e) => setNewTodo(e.target.value)}
            ref={Input}
          />
        </div>
        <div className="control">
          <button className="button is-info">+Add</button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
