const hello = document.querySelector('.greeting')
export const arrayTime = {
	en: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
	ru: ['Спокойной ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
}

export function getTimeOfDay() {
	const hours = new Date().getHours()
	hello.textContent =
		arrayTime[localStorage.getItem('lang')][Math.trunc(hours / 6)]

	return arrayTime.en[Math.trunc(hours / 6)].slice(5)
}

function setLocalStorage() {
	localStorage.setItem('name', document.querySelector('.name').value)
}

function getLocalStorage() {
	if (localStorage.getItem('name')) {
		document.querySelector('.name').value = localStorage.getItem('name')
	}
}

window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)