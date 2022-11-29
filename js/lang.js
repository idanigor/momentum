import { settings } from './settings.js'
export const nameHello = document.querySelector('.name')

const city = document.querySelector('.city')

if (localStorage.getItem('lang') === null) {
localStorage.setItem('lang', settings.lang.en)}

export function getPlaceholder() {
	if (localStorage.getItem('lang') === 'en') {
		nameHello.placeholder = '[Enter name]'
		city.placeholder = '[Enter city]'
	} else {
		nameHello.placeholder = '[Введите имя]'
		city.placeholder = '[Введите город]'
	}
}

getPlaceholder()