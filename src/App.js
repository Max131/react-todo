import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const Form = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const Input = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    Input.current.value = '';
    if (newTodo.trim() === '') return;
    addTodo(newTodo);
    setNewTodo('');
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
            onChange={e => setNewTodo(e.target.value)}
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

const FilterButtons = () => {
  return (
    <div className="buttons has-addons is-centered mt-5">
      <button className="button is-light">All</button>
      <button className="button is-light">Doned</button>
      <button className="button is-light">Pending</button>
    </div>
  );
};

const Todo = ({ todo, index, deleteTodo, updateTodo }) => {
  function handleDoubleClick(e) {
    updateTodo(e.target.id);
  }

  function handleClickClose(id) {
    deleteTodo(id);
  }

  return (
    <li
      className={
        todo.state
          ? 'notification mb-1 is-success'
          : 'notification mb-1 is-light'
      }
      key={index}
      id={index}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className="delete"
        id={index}
        onClick={e => handleClickClose(+e.target.id)}
      />
      {todo.todo}
    </li>
  );
};

const TodoList = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <ul className="mt-5">
      {todos.map((item, index) => (
        <Todo
          todo={item}
          index={index}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { todo: 'Hey, nothingo to do yet?', state: false }
  ]);

  useEffect(() => {
    console.table([...todos]);
  }, [todos]);

  function addTodo(todo) {
    let newTodo = { todo, state: false };
    setTodos([newTodo, ...todos]);
  }

  function updateTodo(todo) {
    let todosTmp = [...todos];
    todosTmp[todo].state = !todosTmp[todo].state;
    setTodos([...todosTmp]);
  }

  function deleteTodo(id) {
    const filteredTodos = todos.filter((todo, index) => index !== id);
    setTodos([...filteredTodos]);
  }
  return (
    <div className="section mt-5 pt-0">
      <Form addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      {/*<FilterButtons />*/}
    </div>
  );
};

export default function App() {
  return (
    <div className="columns is-centered">
      <div className="column is-5-desktop">
        <div className="section mb-0 pb-0">
          <h1 className="title">React ToDo</h1>
          <p className="subtitle">The power of procastinate!</p>
        </div>
        <TodoApp className="" />
      </div>
    </div>
  );
}
