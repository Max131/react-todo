import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Loader from "../Loader";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todoAction, setTodoAction] = useState({
    type: null,
    todo: {}
  });

  //useEffect to load storaged todos
  useEffect(() => {
    const getTodos = async () => {
       await fetch("https://todos-9a65.restdb.io/rest/todos", {
                    method: "GET",
                    headers: {
                      "x-apikey": "60f158b149cd3a5cfbd2291f",
                      "Cache-Control": "no-cache",
                      "content-type": "application/json"
                    },
                    credentials: "same-origin"})
                  .then(res => res.json())
                  .then(data => setTodos([...data].reverse()))
                  .catch(error => console.log(error.message));
                  setLoading(false);
                  }
    getTodos();
  }, []);

  //useEffect to update todos on changes
  useEffect(() => {
    const fetchType = {
      new: 'POST',
      update: 'PUT',
      delete: 'DELETE'
    }
    const url = `https://todos-9a65.restdb.io/rest/todos${(todoAction.type !== 'POST')? '/' + todoAction.todo["_id"] : ''}`;
    const api_key = "60f158b149cd3a5cfbd2291f";
    const fetchData = async () => {
        setLoading(true);
        /* START_FETCH */
        await fetch(url, {
                      method: fetchType[todoAction.type],
                      headers: {
                        "x-apikey": api_key,
                        "cache-control": "no-cache",
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(todoAction.todo),
                      credentials: "same-origin"})
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error));
        setLoading(false);
    }
    (todoAction.type) && fetchData();
    /* END_FETCH */

    setTodoAction({type: null, todo: {}});
  }, [todos]);

  //Create todo function
  function createTodo(todo) {
    let newTodo = { id: new Date().getTime(), todo, status: false };
    setTodoAction({type: 'new', todo: {...newTodo}});
    setTodos([newTodo, ...todos]);
  }

  //Update todo status function
  function updateTodos(todo) {
    const todoTmp = todos[todo];
    todoTmp.status = !todoTmp.status;
    setTodoAction({type: 'update', todo: {...todoTmp}});
    setTodos([...todos], todoTmp);
  }

  //Delete todo function
  function deleteTodo(id) {
    const filteredTodos = todos.filter((todo, index) => index !== id);
    const deleteTodo = todos.filter((todo, index) => index === id);
    setTodoAction({type: 'delete', todo: {...deleteTodo[0]}});
    setTodos([...filteredTodos]);
  }

  return (
    <div className="section mt-5 pt-0">
      {(loading) && <Loader />}
      <TodoForm createTodo={createTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodos={updateTodos}
      />
      {/*<FilterButtons />*/}
    </div>
  );
};

export default TodoApp;
