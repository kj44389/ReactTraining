import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/dist/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'
let beforeSearch = []

function App() {

  const [todos, setTodos] = useState([])
  const todoRefs = useRef([]);
  

  

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(stored) setTodos(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleSearch(){
    const searchedName = todoRefs.current['nameSearch'].value
    if (searchedName === '' || searchedName === null) {
      if(beforeSearch === []) return
      setTodos(beforeSearch)
      beforeSearch = []
      return
    }
    const prevtodos = [...todos]
    if(beforeSearch.length === 0) {
      beforeSearch = prevtodos
      setTodos(prevtodos.filter(todo => todo.name.slice(0, searchedName.length) === searchedName))
    }
    else{
      setTodos(beforeSearch.filter(todo => todo.name.slice(0, searchedName.length) === searchedName))
    }
  }

  function handleAddTodo(e){
    const name = todoRefs.current['name'].value
    // let category = todoRefs.current['category'].value
    if(name === '') return 
    // if(category === '') category = 'default' 
    console.log(name)
    setTodos(prevTodos=>{
      return [...prevTodos, {id: uuidv4(), name: name, complete: false} //, category: category}
      ]})
      todoRefs.current['name'].value = null
      // todoRefs.current['category'].value = null
  }

  function handleClearTodo(){
    const newTodos = [...todos]
    const ntodos = newTodos.filter(todo=> !todo.complete)
    setTodos(ntodos)
  }

  function toggleTodo(id){
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodo)
  }

  return (
    <>
      <header> Todo List App </header>
      <div class="form-group">
        <input type="text" className="form-control" onInput={handleSearch} name="TaskNameSearch" id="taskNameSearch" placeholder='search.. ' ref={el => todoRefs.current['nameSearch'] = el}/>
        {/* <input type="text" class="form-control" name="TaskCategory" id="taskCategory"placeholder='task category' ref={el => todoRefs.current['category'] = el}/> */}
        
      </div>
      <div class="form-group">
        <input type="text" className="form-control" name="TaskName" id="taskName"placeholder='task name' ref={el => todoRefs.current['name'] = el}/>
        {/* <input type="text" class="form-control" name="TaskCategory" id="taskCategory"placeholder='task category' ref={el => todoRefs.current['category'] = el}/> */}
        <button onClick={handleAddTodo}> Add Task </button>
        <button onClick={handleClearTodo}>Clear Completed </button>
        
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <p> Todos left: {todos.filter(todo=>!todo.complete).length}</p>
    </>
  );
}

export default App;
