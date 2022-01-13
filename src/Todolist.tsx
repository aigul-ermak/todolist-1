import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';


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
    changeFilter: (todolistID: string, value: FilterValueType) => void;
    addTask: (todolistID: string, title: string) => void;
    changeStatus: (todolistID: string, id: string, isDone: boolean) => void;
    filter: FilterValueType;
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, id: string, title: string) => void
    updateTodolist:(todolistID: string,title: string)=> void
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
                <button onClick={removeTodolist}>X</button>
            </h3>

            <AddItemForm callback={(title) => addItem(title)}/>
            <ul>
                {props.tasks.map(t => {

                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistID, t.id)
                    }
                    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(props.todolistID, t.id, newIsDoneValue)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox" checked={t.isDone}
                                                                                    onChange={onStatusChange}/>
                            {/*<span>{t.title}</span>*/}
                            <EditableSpan title={t.title} callback={(title) => editableSpanHandler(t.id, title)}/>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={changeFilterHandlerAll}>All
                </button>
                <button onClick={changeFilterHandlerActive}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={changeFilterHandlerCompleted}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;







