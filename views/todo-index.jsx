const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React

import moment from 'moment';
import { TodoFilter } from "../cmps/todo-filter.jsx";
import { TodoList } from "../cmps/todo-list.jsx";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { todoService } from "../services/todo.service.js";
import { FILTER_BY, PROGRESS } from "../store/store.js";
import { loadTodos, removeTodo, saveTodo } from '../store/todo.action.js'
import { addActivity } from "../store/user.action.js";




export function TodoIndex() {
    const dispatch = useDispatch()
    const todos = useSelector((storeState) => storeState.todos)
    const filterBy = useSelector((storeState) => storeState.filterBy)
    const userStyle = useSelector((storeState) => storeState.userStyle)
    const [sortBy, setSortBy] = useState('')
    const timestamp = moment().fromNow()
   


    useEffect(() => {
        loadTodos(filterBy)
        progressPrecent()
    }, [filterBy, sortBy])


    

    function onAddTodo() {
        const todoToSave = todoService.getEmptyTodo()
        saveTodo(todoToSave)
            .then((savedTodo) => {
                
                addActivity({ txt: `Added a Todo (id:${savedTodo._id})` , At: () => timestamp })
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add todo')
            })
    }

    function onEditTodo(todo) {
        const price = +prompt('New price?')
        const todoToSave = { ...todo, price }
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo updated to price: $${savedTodo.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update todo')
            })
    }

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                const timestamp = Date.now()
                addActivity({ txt: `Removed a Todo (id:${todoId})`, At:() => timestamp })
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo')
            })
    }

    function onSetFilter(filterToEdit) {
        dispatch({ type: FILTER_BY, filterToEdit })
    }


    function onSetSort(ev) {
        let userSortBy = ev.target.value
        setSortBy(userSortBy)
    }

    function onSearch(val) {
        console.log(val);
        const filterToEdit = { search: val }
        dispatch({ type: FILTER_BY, filterToEdit })
    }
    
    function progressPrecent() {
        todoService.query()
            .then((todos) => {
                const length = todos.length
                console.log('length: ',length);
                const done = todos.filter(todo => todo.isDone)
                console.log('done: ',done.length);
                const precent =  (done.length / length * 100).toFixed(1)
                console.log('precent: ', precent)
                dispatch({ type: PROGRESS, precent })
            })
    }

console.log(userStyle);

    return (
        <section style={userStyle} className="todo-index">
            <TodoFilter onSearch={onSearch} onSetFilter={onSetFilter} onSetSort={onSetSort} onAddTodo={onAddTodo} />
            <h1 className='todo-title'>What todo today?</h1>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onEditTodo={onEditTodo} progressPrecent={progressPrecent} />

        </section>
    )
}