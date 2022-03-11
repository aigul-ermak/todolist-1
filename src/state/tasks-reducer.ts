
import {TaskType} from '../Todolist';
import {addTodolistAT, removeTodolistAT} from './todolists-reducer';
import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';

export type ActionType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT
    | addTodolistAT |removeTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    // debugger
    switch (action.type) {
        case  'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistID]
            const filteredTask = tasks.filter(f => f.id !== action.id)
            stateCopy[action.todolistID] = filteredTask
            return stateCopy
            // return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)}
        }

        case  'ADD-TASK': {
            debugger
            // const newTask: TaskType = {id: '0', title: action.title, isDone: false}
            return {
                ...state, [action.todolistID]: state[action.todolistID] =
                    [{id: '0', title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        }

        case  'CHANGE-TASK-STATUS' : {
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.id
                        ? {...t, isDone: action.isDone}
                        : t)
            }
        }

        case  'CHANGE-TASK-TITLE' : {
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.id
                        ? {...t, title: action.title}
                        : t)
            }
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }

        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState


        default :
            return state
    }
}


export const removeTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistID
    } as const
}

export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistID
    } as const
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        isDone,
        todolistID
    } as const
}

export const changeTaskTitleAC = (id: string, title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id,
        title,
        todolistID
    } as const
}


export type removeTaskAT = ReturnType<typeof removeTaskAC>
export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
