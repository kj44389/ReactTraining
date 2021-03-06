import React, { useState, useRef, useEffect } from 'react';
import CategoryList from './CategoryList';
import SelectCategorys from './SelectCategorys'
import uuidv4 from 'uuid/dist/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const LOCAL_STORAGE_CATEGORY_KEY = 'todoApp.categories'
let beforeSearch =[];
let beforeCategorySearch = [];

function App() {

  const [todos, setTodos] = useState([])
  const [categories, setCategory] = useState([])
  const [selected, setSelected] = useState(null)
  const todoRefs = useRef([]);

  

  
// saving to localstorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(stored) setTodos(stored)
    // if(stored) setTodos([])
    const storedc = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY))

    if(storedc.length === 0) setCategory([{id: uuidv4(), name:'default'}])
    else setCategory(storedc)
    
    // if(storedc) setCategory([])
    
  }, [])

  // reading from localstorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(categories))
  }, [categories])


  function handleSearchTodo(){
    // get search name
    const searchedName = todoRefs.current['nameSearch'].value
    // if name is empty string or null
    if (searchedName === '' || searchedName === null) {
      // if not searched before just exit
      if(beforeSearch === []) return
      // if searched before and variable is not empty set it as normal todos
      setTodos(beforeSearch)
      setCategory(beforeCategorySearch)
      // clear beforesearch
      beforeSearch = []
      beforeCategorySearch = []
      return
    }
    // end if

    // get previous todos
    const prevtodos = [...todos]
    // if not searched before
    if(beforeSearch.length === 0) {
      // assign whole todos as before search
      beforeSearch = prevtodos
      beforeCategorySearch = [...categories]
      // set todos as only todos who mached
      setTodos(prevtodos.filter(todo => todo.name.slice(0, searchedName.length) === searchedName))
      // setCategory(todos.map(todo=>{return todo.category}))

    }
    // if searched before
    else{
      // search in beforesearch todos array 
      setTodos(beforeSearch.filter(todo => todo.name.slice(0, searchedName.length) === searchedName))
      // setCategory(todos.map(todo=>todo.category))

    }
    
  }
  function handleSearchCategory(){
    // get search name
    const searchedCategory = todoRefs.current['categorySearch'].value
    // if name is empty string or null
    if (searchedCategory === '' || searchedCategory === null) {
      // if not searched before just exit
      if(beforeCategorySearch === []) return
      // if searched before and variable is not empty set it as normal todos
      setCategory(beforeCategorySearch)
      // clear beforesearch
      beforeCategorySearch = []
      return
    }
    // end if

    // get previous todos
    const prevcategory = [...categories]
    // if not searched before
    if(beforeCategorySearch.length === 0) {
      // assign whole todos as before search
      beforeCategorySearch = prevcategory
      // set todos as only todos who mached
      setCategory(prevcategory.filter(category => category.name.slice(0, searchedCategory.length) === searchedCategory))
    }
    // if searched before
    else{
      // search in beforesearch todos array 
      setCategory(beforeCategorySearch.filter(category => category.name.slice(0, searchedCategory.length) === searchedCategory))
    }
  }
  function handleChangeSelected(e){
    if(e !== null) setSelected(e.target.value)
  }
  function handleAddTodo(e){
    const name = todoRefs.current['name'].value

    const selectedRef = selected;

    let selectedValue = 'default';

    if(selectedRef !== null) {selectedValue = selectedRef}
    
    else {
      if(categories.length <= 0)
      setCategory(prevCategory => 
        { 
          return [...prevCategory, {id:uuidv4(), name: selectedValue}]
        })
    }
    

    if(name === '') return 

    setTodos(prevTodos=>{
      return [...prevTodos, {id: uuidv4(), name: name, complete: false, category: selectedValue} //, categories: categories}
      ]})
      todoRefs.current['name'].value = null


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
  function handleAddCategory(){
    const name = todoRefs.current['categoryName'].value
    // let categories = todoRefs.current['categories'].value
    if(name === '') return 
    // if(categories === '') categories = 'default' 
    setCategory(prevCategory=>{
      return [...prevCategory, {id: uuidv4(), name: name} //, categories: categories}
      ]})

  }

  var SelectElement;
  if(categories.length>0){
    SelectElement = (<select id='dropdown' onChange={el => handleChangeSelected(el)}><SelectCategorys categories={categories} todoRefs={todoRefs} /></select>)
  }

  return (
    <>
      <header> Todo List App </header>
      <div className="form-group">
        <input type="text" className="form-control" onInput={handleSearchTodo} name="TaskNameSearch" id="taskNameSearch" placeholder='search todo name.. ' ref={el => todoRefs.current['nameSearch'] = el}/>
        <input type="text" className="form-control" onInput={handleSearchCategory} name="TaskCategory" id="searchTaskCategory"placeholder='search category name..' ref={el => todoRefs.current['categorySearch'] = el}/>
        
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="TaskName" id="taskName"placeholder='task name' ref={el => todoRefs.current['name'] = el}/>
        {SelectElement}
          
          
        
        <button onClick={handleAddTodo}> Add Task </button>
        <button onClick={handleClearTodo}>Clear Completed </button>
      </div>
        
      <div className="form-group">
        <input type="text" className="form-control" name="TaskCategory" id="taskCategory"placeholder='task categories' ref={el => todoRefs.current['categoryName'] = el}/> 
        <button onClick={handleAddCategory}> Add category </button>
      </div>

        <CategoryList categories={categories} todos={todos} toggleTodo={toggleTodo}/>
        <p> Todos left: {todos.filter(todo=>!todo.complete).length}</p>
    </>
  );
}

export default App;
