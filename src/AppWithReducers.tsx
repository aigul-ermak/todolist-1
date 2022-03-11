import React, {useReducer} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedusers() {
    let todolistID1 = v1();
    let todolistID2 = v1();


    // @ts-ignore
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'}
        ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });


    function removeTask(todolistID: string, id: string) {
        // const action = removeTaskAC(todolistID, id)
        // dispatchToTasksReducer(action)
    }

    const addTask = (todolistID: string, title: string) => {
        // const action = addTaskAC(todolistID, title)
        // dispatchToTasksReducer(action)
    }

    const updateTask = (todolistID: string, id: string, title: string) => {
        // const action = changeTaskTitleAC(todolistID, id, title)
        // dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistID: string) {
        // const action = changeTaskStatusAC(id, isDone, todolistID)
        // dispatchToTasksReducer(action)
    }

    const updateTodolist = (title: string, todolistID: string) => {
       // const action = changeTodolistTitleAC(title, todolistID)
        // dispatchToTodolistsReducer(action)
    }

    function removeTodolist(todolistID: string) {
       // const action = removeTodolistAC(todolistID)
        // dispatchToTodolistsReducer(action)
        // dispatchToTasksReducer(action)
    }

    function addTodolist(title: string) {
       // const action = addTodolistAC(title)
        // dispatchToTodolistsReducer(action)
        // dispatchToTasksReducer(action)
    }
    function changeFilter(todolistID: string, value: FilterValueType) {
        // const action = changeTodolistFilterAC(value, todolistID)
        // dispatchToTodolistsReducer(changeTodolistFilterAC(todolistID, value))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {/*{*/}
                    {/*    todolists.map(t  => {*/}
                    {/*        let tasksForTodolist = tasks[t.id];*/}
                    {/*        // if (t.filter === 'active') {*/}
                    {/*        //     tasksForTodolist = tasks[t.id].filter(t => t.isDone === false)*/}
                    {/*        // }*/}
                    {/*        // if (t.filter === 'completed') {*/}
                    {/*        //     tasksForTodolist = tasks[t.id].filter(t => t.isDone)*/}
                    {/*        // }*/}
                    {/*        return <Grid item>*/}
                    {/*            <Paper style={{padding: '10px'}}>*/}
                    {/*                <Todolist*/}
                    {/*                    title={t.title}*/}
                    {/*                    todolistID={t.id}*/}
                    {/*                    key={t.id}*/}
                    {/*                    tasks={tasksForTodolist}*/}
                    {/*                    removeTask={removeTask}*/}
                    {/*                    changeFilter={changeFilter}*/}
                    {/*                    addTask={addTask}*/}
                    {/*                    changeStatus={changeStatus}*/}
                    {/*                    filter={t.filter}*/}
                    {/*                    updateTodolist={updateTodolist}*/}
                    {/*                    removeTodolist={removeTodolist}*/}
                    {/*                    updateTask={updateTask}*/}
                    {/*                />*/}
                    {/*            </Paper>*/}

                    {/*        </Grid>*/}
                    {/*    })*/}
                    {/*}*/}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedusers;
