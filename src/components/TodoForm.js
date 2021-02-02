import React, {useState} from 'react';
import {TextField} from "@material-ui/core";

const TodoForm = (props) => {

    const changeHandler = (event) => {
        props.setTitle(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        props.onAdd(props.title);
        props.setTitle('')
    }

    return <form onSubmit={onSubmit}>
        <TextField
            value={props.title}
            onChange={changeHandler}
            variant="outlined"
            placeholder="Add todo"
            label="Add todo"
            fullWidth
        />
    </form>

}

export default TodoForm;