import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {
  //States
  const [filteredTodos, setFilteredTodos] = useState([])
  const [status, setStatus] = useState('All')
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem('todos')
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true))
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false))
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }
    filterHandler();
  }, [todos, status]);

  //saving local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <hr />
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        status={status}
        setStatus={setStatus}
      />
      <hr />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos} />
    </div>
  );
}

export default App;
