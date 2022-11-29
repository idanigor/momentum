import { getWeather } from './weather.js'
import { getQuotes } from './quotes.js'
import { getPlaceholder } from './lang.js'
import { sliderApi } from './slider.js'
import { settings } from './settings.js'

const language = document.querySelector('.language')
const background = document.querySelector('.background')
const tag = document.querySelector('.input-teg')
const display = document.querySelector('.settings-display')
const label = document.querySelectorAll('.label-set')

if (localStorage.getItem('display') === null) {
	localStorage.setItem('display', JSON.stringify(settings.display))
}

display.querySelectorAll('input[id*=checkbox]').forEach((elem) => {
	const displayObject = JSON.parse(localStorage.getItem('display'))
	settings.display = displayObject
	elem.checked = displayObject[elem.id.slice(0, -9)]
})

language.querySelector(
	`option[value=${localStorage.getItem('lang')}]`
).selected = true
background.querySelector(
	`option[value=${localStorage.getItem('sliderAPI')}]`
).selected = true
if (background.querySelector(`option[value=github]`).selected === true) {
	tag.disabled = true
}
tag.value = localStorage.getItem('tag')

language.addEventListener('change', () => {
	localStorage.setItem('lang', language.value)
	getWeather()
	getQuotes()
	getPlaceholder()
	getLabelLang()
})

background.addEventListener('change', () => {
	localStorage.setItem('sliderAPI', background.value)
	sliderApi()
})

tag.addEventListener('change', () => {
	localStorage.setItem('tag', tag.value)
	sliderApi()
})

display.addEventListener('change', (event) => {
	document
		.querySelector(`.${event.target.id.slice(0, -9)}`)
		.classList.toggle('visible-off')
	settings.display[event.target.id.slice(0, -9)] = event.target.checked
	localStorage.setItem('display', JSON.stringify(settings.display))
})

function getLabelLang() {
	for (let i = 0; i < label.length; i++) {
		label[i].innerHTML = settings.label[localStorage.getItem('lang')][i]
	}
}

getLabelLang()

document.querySelector('.settings-image').addEventListener('click', () => {
	document.querySelector('.settings').classList.toggle('visible-off')
})

const displayOff = () => {
	let display = settings.display
	for (let key in display) {
		if (!display[key]) {
			// if (!document.querySelector(`.${key}`).classList.contains('visible-off'))
				document.querySelector(`.${key}`).classList.toggle('visible-off')
		}
	}
}
displayOff()