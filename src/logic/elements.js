export const getWindowSizeScore = () => {
	let heightScore = 0
	let widthScore = 0

	if (window.innerWidth >= 600) {
		widthScore = 1
	}
	if (window.innerHeight >= 600) {
		heightScore = 1
	}

	if (window.innerWidth >= 960) {
		widthScore = 2
	}
	if (window.innerHeight >= 700) {
		heightScore = 2
	}

	if (window.innerWidth >= 1280) {
		widthScore = 3
	}
	if (window.innerHeight >= 900) {
		heightScore = 3
	}

	return Math.min(heightScore, widthScore)
}

// START - CANVAS - START
export const canvas = document.getElementById('face-canvas')
export const ctx = canvas.getContext('2d')
export const setCanvasSize = (s) => {
	canvas.height = s
	canvas.width = s
}
export const getCanvasSize = () => canvas.height
export const resizeCanvas = () => {
	switch (getWindowSizeScore()) {
		case 1:
			setCanvasSize(400)
			break
		case 2:
			setCanvasSize(500)
			break
		case 3:
			setCanvasSize(700)
			break
		default:
			setCanvasSize(300)
	}
}
// END - CANVAS - END

// START - NAME - START
export const namePTag = document.getElementById('name')
// END - NAME - END
