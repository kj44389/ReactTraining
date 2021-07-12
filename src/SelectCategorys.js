import React from 'react'
import uuidv4 from 'uuid/dist/v4'

export default function CategoryList({ categories, todoRefs }) {
        return (
            
                  categories.map(category => {
                        return <option value={category.name} ref={el => todoRefs.current['selected'] = el} key={uuidv4()}>{category.name}</option>
                  })
            
        )
}
