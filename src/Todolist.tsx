import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType} from './App';


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
    changeStatus:(todolistID: string, id: string, isDone: boolean) => void;
    filter: FilterValueType;
    removeTodolist: (todolistID: string) => void
}

const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState<string>('')
    let [error,setError] = useState<string>('')

    const addTask = () => {
        if(title.trim() !=='') {
            props.addTask(props.todolistID, title);
            setTitle('');
        } else {
            setError("Title!!!")
        }
    }

    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
       setTitle(e.currentTarget.value)
        // console.log(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const changeFilterHandlerAll = () => {
        props.changeFilter(props.todolistID, 'all')
    }
    const changeFilterHandlerActive = () => {
        props.changeFilter(props.todolistID,'active')
    }
    const changeFilterHandlerCompleted = () => {
        props.changeFilter(props.todolistID,'completed')
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    return (
        <div>
            <h3>{props.title}
            <button onClick={removeTodolist}>X</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>

                {error && <div className="error-message">{error}</div>}

            </div>
            <ul >
                {props.tasks.map(t => {

                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistID, t.id)
                    }
                    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(props.todolistID, t.id, newIsDoneValue)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox" checked={t.isDone} onChange={onStatusChange}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={changeFilterHandlerAll}>All</button>
                <button onClick={changeFilterHandlerActive}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={changeFilterHandlerCompleted}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;







