import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'all'|'active'|'completed';

function App() {
    let [tasks, setTasks] = useState (
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Material UI', isDone: true},
            {id: v1(), title: 'Styled Component', isDone: true}
        ]
    )

    let [filter, setFilter] = useState<'all'|'active'|'completed'>('all')

    function removeTask(id: string) {
    tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks);
    }

    function changeFilter( value: FilterValueType) {
        setFilter(value)
    }

    const addTask = (title: string) => {

        let task: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [task, ...tasks]
        setTasks(newTasks)

    }

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function changeStatus (id: string, isDone: boolean){

    let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
