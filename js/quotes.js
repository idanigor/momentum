import { settings } from './settings.js'
import { getRandomNum } from './slider.js'

const quote = document.querySelector('.quotes')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

export async function getQuotes() {
	const quotes = `./assets/json/quotes-${localStorage.getItem('lang')}.json`
	const res = await fetch(quotes)
	const data = await res.json()
	const random = getRandomNum(0, data.quotes.length)

	quote.textContent = `"${data.quotes[random].quote}"`
	author.textContent = data.quotes[random].author
}

getQuotes()

changeQuote.addEventListener('click', getQuotes)