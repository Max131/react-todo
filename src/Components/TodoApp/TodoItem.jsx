const TodoItem = ({ todo, index, deleteTodo, updateTodos }) => {
  const noSelect = {
    userSelect: "none",
  };
  function handleDoubleClick(e) {
    updateTodos(index);
  }

  function handleClickClose(id) {
    deleteTodo(id);
  }

  return (
    <li
      className={
        todo.status
          ? "notification mb-1 is-success"
          : "notification mb-1 is-light"
      }
      key={todo.id}
      id={todo.id}
      onDoubleClick={handleDoubleClick}
      style={noSelect}
    >
      <div
        className="delete"
        data-id={index}
        onClick={(e) => handleClickClose(index)}
      />
      {todo.todo}
    </li>
  );
};

export default TodoItem;
