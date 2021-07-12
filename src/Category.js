import React from 'react'
import TodoList from './TodoList'

export default function Category( {category , todos, toggleTodo} ) {

        return (
                <div id={category.name}>
                        <h1> {category.name} </h1>
                        <div id={category.name+"todos"}>
                              <TodoList todos={todos} toggleTodo={toggleTodo} category={category.name}/> 
                        </div>
                </div>
        )
}
