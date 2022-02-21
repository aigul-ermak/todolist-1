import {FilterValueType, TodolistType} from '../App';
import {v1} from 'uuid';


// type ActionType = {
//     type: string
//     [key: string]: any
// }

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let copyState = [...state]
            return copyState.filter(t => t.id !== action.id)

        case 'ADD-TODOLIST':
            const newTodolist = {
                id: v1(), title: action.title, filter: 'all'
            }
            return [...state, newTodolist]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)

        default:
            return state;
    }
}


export const removeTodolistAC = (id: string): removeTodolistAT => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}


export const addTodolistAC = (title: string): addTodolistAT => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistID: v1()
    }  as const
}
export const changeTodolistTitleAC = (title: string, id: string): changeTodolistTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        id
    } as const
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string): changeTodolistFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        id
    } as const
}


export type removeTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type addTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
export type changeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}


export type changeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}

export type ActionType = removeTodolistAT | addTodolistAT | changeTodolistTitleAT | changeTodolistFilterAT
