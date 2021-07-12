import React from 'react'
import Category from './Category'

export default function CategoryList({ categories, todos, toggleTodo }) {
        return (
            categories.map(category => {
                  return <Category key={category.id} category={category} todos={todos} toggleTodo={toggleTodo} />
            })
        )
}
