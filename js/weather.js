const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const errorWeather = document.querySelector('.weather-error')

function clearWeather() {
	weatherIcon.className = 'weather-icon owf'
	temperature.textContent = ``
	weatherDescription.textContent = ``
	wind.textContent = ``
	humidity.textContent = ``
}

function setCity() {
	if (!city.value) {
		if (localStorage.getItem('lang') === 'en') {
			errorWeather.textContent = `Error! Nothing to geocode for ''!`
		} else {
			errorWeather.textContent = `Ошибка! Не для чего геокодировать ''!`
		}
		clearWeather()
	} else {
		localStorage.setItem('city', city.value)
		getWeather()
	}
}

function getCity() {
	if (localStorage.getItem('city')) {
		city.value = localStorage.getItem('city')
	}
}

export async function getWeather() {
	const lang = localStorage.getItem('lang')
	try {
		if (localStorage.getItem('city')) {
			city.value = localStorage.getItem('city')
		} else {
			if (lang === 'en') {
				city.value = 'Minsk'
				localStorage.setItem('city', 'Minsk')
			} else {
				city.value = 'Минск'
				localStorage.setItem('city', 'Минск')
			}
		}
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${
			city.value
		}&lang=${localStorage.getItem(
			'lang'
		)}&appid=aaf7f5a692cb26d37234047d39f95414&units=metric`
		const res = await fetch(url)
		const data = await res.json()

		errorWeather.textContent = ``
		weatherIcon.className = 'weather-icon owf'
		weatherIcon.classList.add(`owf-${data.weather[0].id}`)
		temperature.textContent = `${Math.trunc(data.main.temp)}°C` // в demo такое округление
		weatherDescription.textContent = data.weather[0].description
		if (lang === 'en') {
			wind.textContent = `Wind speed: ${Math.trunc(data.wind.speed)} m/s`
			humidity.textContent = `Humidity: ${data.main.humidity}%`
		} else {
			wind.textContent = `Скорость ветра: ${Math.trunc(data.wind.speed)} м/с`
			humidity.textContent = `Влажность: ${data.main.humidity}%`
		}
	} catch (err) {
		if (lang === 'en') {
			errorWeather.textContent = `Error! Сity not found for '${city.value}'!
`
		} else {
			errorWeather.textContent = `Ошибка! Город '${city.value}' не найден!`
		}
		clearWeather()
	}
}

window.addEventListener('load', getCity)
city.addEventListener('change', setCity)

getWeather()
