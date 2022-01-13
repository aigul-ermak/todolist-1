import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
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
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})

    }

    function changeFilter(todolistID: string, value: FilterValueType) {
        setTodolists(todolists.map(f => f.id === todolistID ? {...f, filter: value} : f))
    }

    const addTask = (todolistID: string, title: string) => {
        let task: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: tasks[todolistID] = [task, ...tasks[todolistID]]})
    }

    const updateTask = (todolistID: string, id: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id
            ? {...t, title}
            : t)})
    }

    const updateTodolist = (todolistID: string,title: string) => {
        setTodolists(todolists.map(t => t.id === todolistID
        ? {...t, title}
        : t))
    }

    function changeStatus(todolistID: string, id: string, isDone: boolean) {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID]
                .map(f => f.id === id ? {...f, isDone} : f)
        })
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID];
        setTasks(tasks);
    }

    function addTodolist(title: string) {
        let newId = v1()
        setTodolists([{id: newId, title: title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newId]: tasks[newId] = []})
    }


    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {
                todolists.map(t => {
                    let tasksForTodolist = tasks[t.id];
                    if (t.filter === 'active') {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone === false)
                    }
                    if (t.filter === 'completed') {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone)
                    }
                    return (
                        <Todolist
                            title={t.title}
                            todolistID={t.id}
                            key={t.id}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={t.filter}
                            updateTodolist={updateTodolist}
                            removeTodolist={removeTodolist}
                            updateTask={updateTask}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
