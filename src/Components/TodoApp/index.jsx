import React, { useState, useEffect } from "react";
import useFetch from '../../Hooks/useFetch';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
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
                  .then(data => setTodos([...data]))
                  .catch(error => console.log(error.message));
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
    /*switch (todoAction.type){
      case 'new':
        console.log('New todo', todoAction);
        break;
      case 'update':
        console.log('Update todo', todoAction);
        break;
      case 'delete':
        console.log('Delete todo', todoAction);
        break;
    }*/
    useFetch({type: fetchType[todoAction.type], url: 'https://example.com', data: todoAction.todo});
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
    setTodoAction({type: 'delete', todo: {...deleteTodo}});
    setTodos([...filteredTodos]);
  }

  return (
    <div className="section mt-5 pt-0">
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
