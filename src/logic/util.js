export const getRandomItem = (array) => (
	array[Math.floor(Math.random() * array.length)]
)

export const getRandomBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min)
}

export const addAndRemoveClass = (el, classString, time) => {
	el.classList.add(classString)
	setTimeout(() => el.classList.remove(classString), time)
}

export const getRandomColorString = () => (
	'#'+(Math.random()*0xFFFFFF<<0).toString(16)
)
