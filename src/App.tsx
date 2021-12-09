import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';

export type FilterValueType = 'all'|'active'|'completed';

function App() {
    let [tasks, setTasks] = useState (
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
            {id: 4, title: 'Material UI', isDone: true},
            {id: 5, title: 'Styled Component', isDone: true}
        ]
    )

    let [filter, setFilter] = useState<'all'|'active'|'completed'>('all')

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    function removeTask(id: number) {
    tasks = tasks.filter(t => t.id != id)
        setTasks(tasks);
    }

    function changeFilter( value: FilterValueType) {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
