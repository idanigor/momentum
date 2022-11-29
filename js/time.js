import { getTimeOfDay } from './hello.js'

const time = document.querySelector('.time')
const date = document.querySelector('.date')

export function showTime() {
	time.textContent = new Date().toLocaleTimeString()
	showDate()
	getTimeOfDay()
	setTimeout(showTime, 1000)
}

function showDate() {
	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	}

	let lang = ''
	if (localStorage.getItem('lang') === 'en') {
		lang = 'en-US'
	} else {
		lang = 'ru-RU'
	}
	let currentDate = new Date().toLocaleDateString(lang, options)
	date.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1)
}

showTime()
