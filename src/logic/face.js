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

const drawEyeEllipse = (x, y, rX, rY, color) => drawEllipse(
	x, y,
	rX, rY,
	0,
	2 * Math.PI,
	color, color,
)
const drawEyes = ({ canvasSize, headRadiusX, headRadiusY }) => {
	const headCenter = canvasSize / 2


	// Eyeballs
	const eyeRadiusX = getRandomBetween(headRadiusX / 8, headRadiusX / 4)
	const eyeRadiusY = getRandomBetween(headRadiusY / 8, headRadiusY / 4)
	const eyeInnerBound = headCenter + eyeRadiusX
	const eyeOuterBound = headCenter + headRadiusX - (eyeRadiusX * 2)

	const eyeRX = getRandomBetween(eyeInnerBound, eyeOuterBound)
	const eyeLX = headCenter - ((headCenter + headRadiusX) - eyeRX)
	const eyeY = canvasSize / 2

	// Draw eyeballs
	drawEyeEllipse(eyeRX, eyeY, eyeRadiusX, eyeRadiusY, '#fff')
	drawEyeEllipse(eyeLX, eyeY, eyeRadiusX, eyeRadiusY, '#fff')

	// Pupils
	const pupilRadiusX = getRandomBetween(eyeRadiusX / 4, eyeRadiusX / 2)
	const pupilRadiusY = getRandomBetween(eyeRadiusY / 4, eyeRadiusY / 2)
	const pupilRX = eyeRX + 4
	const pupilLX = eyeLX + 4
	const pupilY = eyeY + 4

	// Draw Pupils
	drawEyeEllipse(pupilRX, pupilY, pupilRadiusX, pupilRadiusY, '#000')
	drawEyeEllipse(pupilLX, pupilY, pupilRadiusX, pupilRadiusY, '#000')
}

export const createTheMan = () => {
	const headProps = drawHead()
	drawEyes(headProps)
}