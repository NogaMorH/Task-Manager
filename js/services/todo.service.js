'use strict'

var gTodos
var gFilterBy = 'ALL'
_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'ALL') return gTodos
    const todos = gTodos.filter(todo =>
        (gFilterBy === 'DONE' && todo.isDone) ||
        (gFilterBy === 'ACTIVE' && !todo.isDone))
    return todos
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt, priority = 1) {
    const todo = _createTodo(txt, priority)
    console.log('todo:', todo)
    gTodos.unshift(todo)
    _saveTodosToStorage()

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    if (sortBy === 'TXT') gTodos.sort((a, b) => {
        if (a.txt.toUpperCase() > b.txt.toUpperCase()) return 1
        else if (a.txt.toUpperCase() < b.txt.toUpperCase()) return -1
        return 0
    })
    if (sortBy === 'DATE') gTodos.sort((a, b) => b.createdAt - a.createdAt)
    if (sortBy === 'PRIORITY') gTodos.sort((a, b) => b.priority - a.priority)
    // if (sortBy === 'PRIORITY') gTodos.sort((a, b) => (a.priority < b.priority) ? -1 : 1)
    renderTodos()
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

// Private functions - used only by the service itself
function _createTodos() {

    var todos = loadFromStorage('todoDB')
    if (!todos || !todos.length) {
        todos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS')
        ]
    }

    gTodos = todos
    _saveTodosToStorage()
}

function _createTodo(txt, priority = 1) {
    const todo = {
        id: makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        priority
    }
    return todo
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}
