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


export const  getRandomColorString = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}
