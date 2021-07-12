import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo, category}) {
        todos = todos.filter(todo => todo.category === category)
        return (
                todos.map(todo => {
                        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
                })
        )
}
// category {
//      todo {
//              id, name, completed, category
//      }       
// }