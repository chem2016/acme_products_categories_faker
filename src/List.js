import React from 'react'

const List = (props) => {
    const { categories } = props;
    return(
        <ul>
            {categories.map((category)=>{
                return (<li key={category.id}>{category.name}</li>)
            })}
        </ul>
    )
}


export default List