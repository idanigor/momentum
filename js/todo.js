import { settings } from './settings.js'
export const todoInput = document.querySelector('.todo-input')
const todoList = document.querySelector('.todo-list')

localStorage.tasks
	? (settings.tasks = JSON.parse(localStorage.getItem('tasks')))
	: (settings.tasks = [])

function setTodoLocal() {
	localStorage.setItem('tasks', JSON.stringify(settings.tasks))
}

todoInput.addEventListener('change', (e) => {
	if (todoInput.value !== '') {
		settings.tasks.push({ massage: todoInput.value, completed: false })
		setTodoLocal()
		createTasks()
		todoInput.value = ''
	}
})

function createTasks() {
	todoList.innerHTML = ''
	if (settings.tasks.length > 0) {
		settings.tasks = [
			...settings.tasks.filter((i) => i.completed),
			...settings.tasks.filter((i) => !i.completed),
		]
		settings.tasks.forEach((e, i) => {
			todoList.innerHTML += templateTask(i)
		})
	}
}

function templateTask(i) {
	return `<div class='todo-task'>
        <input class="todo-completed" ${
					settings.tasks[settings.tasks.length - 1 - i].completed
						? 'checked'
						: ''
				} type="checkbox">
        <div class="todo-massage ${
					settings.tasks[settings.tasks.length - 1 - i].completed
						? 'todo-massage--completed'
						: ''
				}" >${settings.tasks[settings.tasks.length - 1 - i].massage}</div>
        <button class="todo-delete"></button>
      </div>`
}

createTasks()

todoList.addEventListener('click', (e) => {
	const todoTaskList = document.querySelectorAll('.todo-task')
	for (let i = 0; i < todoTaskList.length; i++) {
		if (todoTaskList[i] === e.target.parentNode) {
			const item = todoTaskList.length - 1 - i
			if (e.target.localName === 'input') {
				settings.tasks[item].completed = !settings.tasks[item].completed
				if (settings.tasks[item].completed) {
					todoTaskList[i]
						.querySelector('.todo-massage')
						.classList.add('todo-massage--completed')
				} else {
					todoTaskList[i]
						.querySelector('.todo-massage')
						.classList.remove('todo-massage--completed')
				}
			}
			if (e.target.localName === 'button') {
				settings.tasks.splice(item, 1)
			}
			setTodoLocal()
			createTasks()
		}
	}
})

document.querySelector('.todo').addEventListener('click', () => {
	document.querySelector('.todom').classList.toggle('visible-off')
})
