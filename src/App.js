import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";
import TodoForm from "./components/TodoForm";
import {TodoList} from "./components/TodoLIst";
import axios from "axios";

const useStyles = makeStyles({
    buttonAdd: {
        margin: "10px"
    },
    root: {
        width: 500
    },
    formButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexBasis: "height: 20px"
    },
    form: {
        width: '350px',
        margin: '10px'
    }
});

function App() {

    const classes = useStyles();
    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/tasks')
            .then(res => {
                setTodos(res.data)
            })
    })

    const onAdd = (title) => {
        axios.post('http://localhost:3000/tasks', {
            title: title,
            completed: false
        })
    }
    const toggleHandler = (id) => {
        axios.patch(`http://localhost:3000/tasks/${id}`, {completed: true})
    }

    const unToggleHandler = (id) => {
        axios.patch(`http://localhost:3000/tasks/${id}`, {completed: false})
    }

    const removeHandler = (id) => {
        axios.delete(`http://localhost:3000/tasks/` + id)
    }

    const addTask = () => {
        onAdd(title);
        setTitle('')
    }

    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = `Вы нажали ${count} раз`
    })

    return (
        <Box m={20}>
            <p>Вы нажали {count} раз</p>
            <button onClick={() => setCount(count + 1)}>click me</button>
            <Card className={classes.root}>
                <div className={classes.formButton}>
                    <div className={classes.form}>
                        <TodoForm title={title} setTitle={setTitle} onAdd={onAdd}/>
                    </div>
                    <div className={classes.buttonAdd}>
                        <Button onClick={addTask} variant="outlined" color="primary">
                            Add
                        </Button>
                    </div>
                </div>
                <div>
                    <TodoList todos={todos} setTitle={setTitle} title={title} onAdd={onAdd}
                              onToggle={toggleHandler} onUnToggle={unToggleHandler} onRemove={removeHandler}/>
                </div>
            </Card>
        </Box>
    );
}

export default App;
