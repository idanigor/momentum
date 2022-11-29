import playList from './playList.js'

const playBtn = document.querySelector('.play')
const playNextBtn = document.querySelector('.play-next')
const playPrevBtn = document.querySelector('.play-prev')
const audio = new Audio()
const list = document.querySelector('.play-list')
const titleStatus = document.querySelector('.player-title')
const durationSoundBar = document.querySelector('.duration')
const progressSoundBar = document.querySelector('.progress')
const timeDuration = document.querySelector('.time-duration')
const timeCurrentTime = document.querySelector('.time-progress')
const mute = document.querySelector('.mute')
const durationVolumeBar = document.querySelector('.volume-duration')
const progressVolumeBar = document.querySelector('.volume-progress')

let playNum = 0
let isPlay = false

function getTitleStatus() {
	titleStatus.textContent = playList[playNum].title
}
export function playAudio() {
	audio.src = playList[playNum].src
	audio.currentTime = 0
	audio.play()
	isPlay = true
}
function playPauseAudio() {
	if (!isPlay) {
		playAudio()
		list.querySelector(`#play-${playNum}`).classList.add('pause')
	} else {
		audio.pause()
		isPlay = false
		list.querySelector(`#play-${playNum}`).classList.remove('pause')
	}
	playBtn.classList.toggle('pause')
}
function toggleBtnPause() {
	if (!playBtn.classList.contains('pause')) {
		playBtn.classList.add('pause')
	}
}
function playNext() {
	playNum === playList.length - 1 ? (playNum = 0) : playNum++
	toggleActiveSoundInList()
	playAudio()
	toggleBtnPause()
	getTitleStatus()
	duration()
}
function playPrev() {
	playNum === 0 ? (playNum = playList.length - 1) : playNum--
	toggleActiveSoundInList()
	playAudio()
	toggleBtnPause()
	getTitleStatus()
	duration()
}
function toggleActiveSoundInList() {
	list.querySelector('.item-active').classList.remove('item-active')
	list.querySelector(`#play-${playNum}`).classList.add('item-active')
	if (list.querySelector('.pause') !== null) {
		list.querySelector('.pause').classList.remove('pause')
	}
	list.querySelector(`#play-${playNum}`).classList.add('pause')
}
function createPlayList() {
	playList.forEach((el) => {
		const li = document.createElement('li')
		list.append(li)
		li.classList.add('play-item')
		li.textContent = el.title
	})
}
function setImgList() {
	const li = document.querySelectorAll('.play-item')
	for (let i = 0; i < li.length; i++) {
		const btn = document.createElement('button')
		li[i].prepend(btn)
		btn.classList.add('play', 'player-icon', 'player-icon--mini')
		btn.id = `play-${i}`
	}
}
function soundBar(event) {
	const progress = event.offsetX
	const progressWidth = progress / durationSoundBar.offsetWidth

	progressSoundBar.style.width = progressWidth * 100 + '%'
}
function timer(s) {
	const min = Math.floor(s / 60)
	let sec = Math.floor(s - min * 60)
	if (sec < 10) {
		sec = '0' + sec
	}
	return min + ':' + sec
}
function duration() {
	timeDuration.textContent = playList[playNum].duration
}
function currentTime() {
	timeCurrentTime.textContent = timer(audio.currentTime)
}
function updProgress() {
	const { duration, currentTime } = this
	const progressPercent = (currentTime / duration) * 100

	progressSoundBar.style.width = progressPercent + '%'
}
function setProgress(event) {
	const width = this.clientWidth

	if (isPlay) {
		audio.currentTime = (event.offsetX / width) * audio.duration
	}
}
function setMute() {
	if (mute.classList.contains('mute-on')) {
		mute.classList.remove('mute-on')
		audio.muted = false
		progressVolumeBar.style.width = audio.volume * 100 + '%'
	} else {
		mute.classList.add('mute-on')
		audio.muted = true
		progressVolumeBar.style.width = '0%'
	}
}
function volumeBar(event) {
	const progress = event.offsetX
	const progressWidth = progress / durationVolumeBar.offsetWidth

	progressVolumeBar.style.width = progressWidth * 100 + '%'
}
function setProgressVolume(event) {
	const width = this.clientWidth

	audio.volume = event.offsetX / width
}
function listTrack(e) {
	if (e.target.classList.contains('player-icon--mini')) {
		const main = list.querySelector(`#play-${playNum}`)
		if (main !== e.target) {
			main.classList.remove('pause')
			playNum = +e.target.id.slice(-1)
			playAudio()
			e.target.classList.add('pause')
			playBtn.classList.add('pause')
			toggleActiveSoundInList()
		} else {
			playPauseAudio()
		}
		getTitleStatus()
		duration()
	}
}

getTitleStatus()
duration()
createPlayList()
setImgList()

audio.volume = 0.25
list.querySelector(`#play-${playNum}`).classList.add('item-active')

playNextBtn.addEventListener('click', playNext)
playPrevBtn.addEventListener('click', playPrev)
playBtn.addEventListener('click', playPauseAudio)

audio.addEventListener('ended', playNext)
audio.addEventListener('timeupdate', updProgress)
audio.addEventListener('timeupdate', currentTime)

durationSoundBar.addEventListener('click', soundBar)
durationSoundBar.addEventListener('click', setProgress)

mute.addEventListener('click', setMute)
durationVolumeBar.addEventListener('click', volumeBar)
durationVolumeBar.addEventListener('click', setProgressVolume)

list.addEventListener('click', listTrack)