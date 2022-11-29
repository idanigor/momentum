import { getTimeOfDay } from './hello.js'
import { settings } from './settings.js'

export const timeOfDay = getTimeOfDay()
let randomNum = getRandomNum(1, 20)
let bgNum = String(randomNum).padStart(2, 0)
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
const tag = document.querySelector('.input-teg')

export function getRandomNum(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function setBg() {
	const img = new Image()
	img.src = `https://raw.githubusercontent.com/idanigor/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
	img.onload = () => {
		document.body.style.backgroundImage = `url(${img.src})`
	}
}

export async function getLinkUnsplash(tag) {
	try {
		const res = await fetch(
			`https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=TmP15qn8UoXz10Od7HW2cGEP2SgAU7VrgZBYlYm-dJ8`
		)
		const data = await res.json()
		const img = new Image()
		img.src = data.urls.regular
		img.onload = () => {
			document.body.style.backgroundImage = `url(${img.src})`
		}
	} catch (err) {
		if (err.message.includes('undefined')) {
			alert(
				`тег не найден, заменен на ${timeOfDay}`
			)
		} else {
				alert(`Превышен лимит запросов по API. Повторите попытку через час.`)
		}
		// getLinkUnsplash(timeOfDay)
		localStorage.setItem('tag', timeOfDay)
		document.querySelector('.input-teg').value = timeOfDay
	}
}

export async function getLinkFlickr(tag) {
	try {
		const res = await fetch(
			`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=986b1541b441f6e9648d1c58a45cde5c&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`
		)
		const data = await res.json()
		const img = new Image()
		let temp
		do {
			temp =
				data.photos.photo[getRandomNum(1, data.photos.photo.length - 1)].url_l
		} while (temp === undefined)
		img.src = temp
		img.onload = () => {
			document.body.style.backgroundImage = `url(${img.src})`
		}
	} catch (err) {
			if (err.message.includes('undefined')) {
				alert(`тег не найден, заменен на ${timeOfDay}`)
			} else {
				alert(`Используйте VPN если Вы из Казахстана`)
			}
		localStorage.setItem('tag', timeOfDay)
		document.querySelector('.input-teg').value = timeOfDay
	}
}

if (localStorage.getItem('sliderAPI') === null) {
	localStorage.setItem('sliderAPI', settings.slider.github)
}
if (localStorage.getItem('tag') === null) {
	localStorage.setItem('tag', timeOfDay)
}

export function sliderApi() {
	const api = localStorage.getItem('sliderAPI')
	if (api === 'github') {
		document.querySelector('.input-teg').disabled = true
		setBg()
	}
	if (api === 'unsplash') {
		document.querySelector('.input-teg').disabled = false
		getLinkUnsplash(localStorage.getItem('tag'))
	}
	if (api === 'flickr') {
		document.querySelector('.input-teg').disabled = false
		getLinkFlickr(localStorage.getItem('tag'))
	}
}
sliderApi()

function getSlideNext() {
	randomNum === 20 ? (randomNum = 1) : randomNum++
	bgNum = String(randomNum).padStart(2, 0)
	sliderApi()
}

slideNext.addEventListener('click', getSlideNext)

function getSlidePrev() {
	randomNum === 1 ? (randomNum = 20) : randomNum--
	bgNum = String(randomNum).padStart(2, 0)
	sliderApi()
}

slidePrev.addEventListener('click', getSlidePrev)
