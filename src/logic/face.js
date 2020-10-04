import { getCanvasSize } from '/src/logic/elements'
import { drawEllipse } from '/src/logic/drawShapes'
import { getRandomBetween, getRandomColorString } from '/src/logic/util'

const drawHead = () => {
	const canvasSize = getCanvasSize()
	const headRadiusX = getRandomBetween(canvasSize / 4, canvasSize / 2)
	const headRadiusY = getRandomBetween(canvasSize / 4, canvasSize / 2)
	const skinColor = getRandomColorString()

	console.log({
		headRadiusX, headRadiusY, skinColor,
	})

	drawEllipse(
		canvasSize / 2,
		canvasSize / 2,
		headRadiusX,
		headRadiusY,
		0,
		2 * Math.PI,
		skinColor,
		skinColor,
	)
	return { canvasSize, headRadiusX, headRadiusY, skinColor }
}

const drawEyes = ({ canvasSize, headRadiusX, headRadiusY }) => {
	const eyeX = canvasSize / 4
	const eyeY = canvasSize / 4
	const eyeRadiusX = getRandomBetween(headRadiusX / 8, headRadiusX / 4)
	const eyeRadiusY = getRandomBetween(headRadiusY / 8, headRadiusY / 4)
	// const eyeX = getRandomBetween(
	// 	canvasSize / 2,
	// 	(canvasSize / 2) + (headRadiusX - eyeRadiusX)
	// )
	drawEllipse(
		eyeX, eyeY,
		eyeRadiusX, eyeRadiusY,
		0,
		2 * Math.PI,
		'#fff', '#fff',
	)
}

export const createTheMan = () => {
	const headProps = drawHead()
	drawEyes(headProps)
}