
import {v1} from 'uuid';
import {FilterValueType, TodolistType} from '../AppWithRedux';



export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState: Array<TodolistType> = []



export type ActionType = removeTodolistAT | addTodolistAT | changeTodolistTitleAT | changeTodolistFilterAT

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let copyState = [...state]
            return copyState.filter(t => t.id !== action.id)

        case 'ADD-TODOLIST':
            // const newTodolist = {
            //     id: action.todolistId, title: action.title, filter: 'all'
            // }
            return [...state, { id: action.todolistId, title: action.title, filter: 'all'}]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)

        default:
            return state;
    }
}


export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1()
    }  as const
}

export const changeTodolistTitleAC = (title: string, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        id
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        id
    } as const
}


export type removeTodolistAT = ReturnType<typeof removeTodolistAC>

export type addTodolistAT = ReturnType<typeof addTodolistAC>

export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>

export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>


