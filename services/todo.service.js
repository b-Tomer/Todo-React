
import { asyncStorageService } from './async-storage.service.js'


const STORAGE_KEY = 'todoDB'


export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo
}


function query(filterBy = {}) {
    // return axios.get(BASE_URL).then(res => res.data)
    return asyncStorageService.query(STORAGE_KEY)
        .then(todos => {
            if (filterBy.all) return todos
            if (filterBy.Active && filterBy.done) return todos
            if (filterBy.Active) todos = todos.filter(todo => !todo.isDone)
            if (filterBy.done) todos = todos.filter(todo => todo.isDone)
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                todos = todos.filter(todo => regExp.test(todo.txt))
            }
            return todos
        })
}
function getById(todoId) {
    return asyncStorageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
    // return Promise.reject('Not now!')
    return asyncStorageService.remove(STORAGE_KEY, todoId)
}
function save(todo) {
    if (todo._id) {
        return asyncStorageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        /* todo.creator = userService.getLoggedinUser() */
        return asyncStorageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo() {
    const timestamp = Date.now()
    return {
        txt: '', createdAt: moment(timestamp).fromNow(), creator: {}
    }
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


