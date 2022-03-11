import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {FilterValueType} from './AppWithRedux';



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void;
    changeFilter: (todolistID: string,value: FilterValueType) => void;
    addTask: (todolistID: string, title: string) => void;
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void;
    filter: FilterValueType;
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, id: string, title: string) => void
    updateTodolist: (todolistID: string, title: string) => void
}

const Todolist = (props: TodolistPropsType) => {

    const changeFilterHandlerAll = () => {
        props.changeFilter(props.todolistID, 'all')
    }
    const changeFilterHandlerActive = () => {
        props.changeFilter(props.todolistID, 'active')
    }
    const changeFilterHandlerCompleted = () => {
        props.changeFilter(props.todolistID, 'completed')
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const addItem = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const editableSpanHandler = (Tid: string, title: string) => {
        props.updateTask(props.todolistID, Tid, title)
    }

    const editableTodolistTitleHandler = (title: string) => {
        props.updateTodolist(props.todolistID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={(title) => editableTodolistTitleHandler(title)}/>
                {/*{props.title}*/}
                {/*<button onClick={removeTodolist}>X</button>*/}
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm callback={(title) => addItem(title)}/>
            <div>
                {props.tasks.map(t => {

                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistID, t.id)
                    }
                    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(t.id, newIsDoneValue,props.todolistID)
                    }
                    return (
                        <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox checked={t.isDone}
                                      onChange={onStatusChange}
                                      color="primary"/>
                            {/*<input type="checkbox" checked={t.isDone}*/}
                            {/*       onChange={onStatusChange}/>*/}
                            {/*<span>{t.title}</span>*/}
                            <EditableSpan title={t.title} callback={(title) => editableSpanHandler(t.id, title)}/>
                            {/*<button onClick={removeTaskHandler}>X</button>*/}
                            <IconButton onClick={removeTodolist}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })
                }
            </div>
            <div>
                <Button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={changeFilterHandlerAll}
                        color={props.filter === 'all' ?  'secondary' : 'primary'}>All
                </Button>
                <Button onClick={changeFilterHandlerActive}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        color={props.filter === 'active' ?  'secondary' : 'primary'}>Active
                </Button>
                <Button onClick={changeFilterHandlerCompleted}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        color={props.filter === 'completed' ?  'secondary' : 'primary'}>Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist;







