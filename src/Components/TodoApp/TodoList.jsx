import TodoItem from "./TodoItem";

const TodoList = ({ todos, deleteTodo, updateTodos }) => {
  return (
    <ul className="mt-5">
      {todos.map((item, index) => (
        <TodoItem
          todo={item}
          index={index}
          key={item.id}
          deleteTodo={deleteTodo}
          updateTodos={updateTodos}
        />
      ))}
    </ul>
  );
};

export default TodoList;
