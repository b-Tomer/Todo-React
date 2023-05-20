import { userService } from "../services/user.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const FILTER_BY = 'FILTER_BY'
export const PROGRESS = 'PROGRESS'
export const USER_STYLE = 'USER_STYLE'

export const SET_USER = 'SET_USER'
export const SET_USER_ACTIVITIES = 'SET_USER_ACTIVITIES'

const { createStore } = Redux

const initialState = {

    todos: [],
    filterBy: {},
    loggedinUser: userService.getLoggedinUser(),
    progress: 1,
    userStyle:{}

}

function appReducer(state = initialState, action) {

    let todos
    let filterBy

    switch (action.type) {

        // Todos
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            todos = state.todos.filter(c => c._id !== action.todoId)
            return { ...state, todos }
        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }
        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        case FILTER_BY:
            filterBy = { ...state.filterBy, ...action.filterToEdit }
            return { ...state, filterBy }
        case PROGRESS:
            return { ...state, progress: action.precent }
            
            // User
            case SET_USER:
                return { ...state, loggedinUser: action.user }
        case SET_USER_ACTIVITIES:
            const user = { ...state.loggedinUser, activities: action.activities }
            return { ...state, loggedinUser: user }
            case USER_STYLE:
                return { ...state, userStyle: action.userStyleToEdit }
       
            default:
                return { ...state }
            }
        }


export const store = createStore(appReducer)

// For debug
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})

