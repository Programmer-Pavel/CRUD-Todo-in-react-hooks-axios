import React from 'react';

export const TodoList = ({todos, onRemove, onToggle, onUnToggle}) => {

    return <ul>
        {todos.map(todo => {
            return <li className='todo' key={todo.id}>
                    {!todo.completed
                        ? <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)}/>
                        : <input type="checkbox" checked={todo.completed} onChange={() => onUnToggle(todo.id)}/>}
                    <span>{todo.title}</span>
                    <button onClick={() => onRemove(todo.id)}>delete</button>

            </li>
        })
        }
    </ul>
}