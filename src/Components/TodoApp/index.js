import React, {useState, useEffect} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  
  //useEffect to load storaged todos
  useEffect(() => {
    const getTodos = JSON.parse(localStorage.getItem('ReactMyTodos'));
    (getTodos) && setTodos([...getTodos]);
  }, []);

  //useEffect to update todos on changes
  useEffect(() => {
    localStorage.setItem('ReactMyTodos', JSON.stringify(todos));
  }, [todos]);

  //Create todo function
  function createTodo(todo) {
    let newTodo = {id: new Date().getTime(), todo, state: false };
    setTodos([newTodo, ...todos]);
  }

  //Update todo state function
  function updateTodos(todo) {
    let todosTmp = [...todos];
    todosTmp[todo].state = !todosTmp[todo].state;
    setTodos([...todosTmp]);
  }

  //Delete todo function
  function deleteTodo(id) {
    const filteredTodos = todos.filter((todo, index) => index !== id);
    setTodos([...filteredTodos]);
  }

  return (
    <div className="section mt-5 pt-0">
      <TodoForm createTodo={createTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodos={updateTodos} />
      {/*<FilterButtons />*/}
    </div>
  );
};

export default TodoApp;