import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType} from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValueType) => void;
    addTask: (title: string) => void;
}

const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        props.addTask(title)

        setTitle('');
    }

    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
       setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const changeFilterHandlerAll = () => {
        props.changeFilter('all')
    }
    const changeFilterHandlerActive = () => {
        props.changeFilter('active')
    }
    const changeFilterHandlerCompleted = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }
                    return (
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button onClick={changeFilterHandlerAll}>All</button>
                <button onClick={changeFilterHandlerActive}>Active</button>
                <button onClick={changeFilterHandlerCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;







