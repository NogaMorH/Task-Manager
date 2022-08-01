'use strict'

function onInit() {
    console.log('Document is ready')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    var strHTMLs = ''
    if (todos.length === 0) {
        if (gFilterBy === 'ALL') strHTMLs = '<li>No todos</li>'
        if (gFilterBy === 'ACTIVE') strHTMLs = '<li>No active todos</li>'
        if (gFilterBy === 'DONE') strHTMLs = '<li>No done todos</li>'
    } else {
        strHTMLs = todos.map(todo =>
            `
        <li onclick="onToggleTodo('${todo.id}')" class="${(todo.isDone) ? 'done' : ''}">
            ${todo.txt} - priority ${todo.priority}
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>
        `
        ).join('')
    }
    document.querySelector('.todo-list').innerHTML = strHTMLs
    document.querySelector('.todo-total-count').innerText = getTotalCount()
    document.querySelector('.todo-active-count').innerText = getActiveCount()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)
    if (confirm('Are you sure you wand to delete this todo?')) {
        removeTodo(todoId)
        renderTodos()
    }
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=todo-txt]')
    const elPriority = document.querySelector('[name=priority')
    if (elTxt.value.length !== 0) {
        addTodo(elTxt.value, elPriority.value)
        renderTodos()
    }

    elTxt.value = ''
    elPriority.value = ''
}

function onSetFilter(filterBy) {
    // console.log('Setting filter', filterBy)
    setFilter(filterBy)

    renderTodos()

}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderTodos()
}