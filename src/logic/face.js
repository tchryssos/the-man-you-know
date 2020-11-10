import { getCanvasSize } from '/src/logic/elements'
import { drawEllipse } from '/src/logic/drawShapes'
import { getRandomBetween, getRandomColorString } from '/src/logic/util'
import { getEllipsePoint } from '/src/logic/math'

const drawHead = () => {
	const canvasSize = getCanvasSize()
	const headRadiusX = getRandomBetween(canvasSize / 3, canvasSize / 2)
	const headRadiusY = getRandomBetween(canvasSize / 3, canvasSize / 2)
	const skinColor = getRandomColorString()

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
	const eyeXRadius = getRandomBetween(headRadiusX / 8, headRadiusX / 4)
	const eyeYRadius = getRandomBetween(headRadiusY / 8, headRadiusY / 4)
	const eyeInnerBound = headCenter + eyeXRadius
	const eyeOuterBound = headCenter + headRadiusX - (eyeXRadius * 2)

	const eyeRX = getRandomBetween(eyeInnerBound, eyeOuterBound)
	const eyeXOffset = eyeRX - headCenter
	const maxEyeYOffset = getEllipsePoint(
		[eyeRX + eyeXRadius, canvasSize / 2, headRadiusX],
		[canvasSize / 2, headRadiusY]
	)
	const eyeLX = headCenter - eyeXOffset
	const eyeY = getRandomBetween(canvasSize / 2, maxEyeYOffset)
	const eyeYOffset = eyeY - headCenter

	// Draw eyeballs
	drawEyeEllipse(eyeRX, eyeY, eyeXRadius, eyeYRadius, '#fff')
	drawEyeEllipse(eyeLX, eyeY, eyeXRadius, eyeYRadius, '#fff')

	// Pupils
	const pupilXRadius = getRandomBetween(eyeXRadius / 2, eyeXRadius / 1.5)
	const pupilYRadius = getRandomBetween(eyeYRadius / 4, eyeYRadius / 2)
	const pupilInnerBound = eyeRX - eyeXRadius + pupilXRadius
	const pupilOutterBound = eyeRX + eyeXRadius - pupilYRadius
	const pupilRX = getRandomBetween(pupilInnerBound, pupilOutterBound)
	const pupilXOffset = pupilRX - headCenter
	const pupilLX = headCenter - pupilXOffset
	const pupilY = eyeY
	const pupilYOffset = pupilY - headCenter

	// Draw Pupils
	drawEyeEllipse(pupilRX, pupilY, pupilXRadius, pupilYRadius, '#000')
	drawEyeEllipse(pupilLX, pupilY, pupilXRadius, pupilYRadius, '#000')

	return {
		eyeXOffset, eyeXRadius,
		eyeYOffset, eyeYRadius,
		pupilXOffset, pupilXRadius,
		pupilYOffset, pupilYRadius,
		maxEyeYOffset,
	}
}

const drawMouth = ({
	canvasSize, skinColor,
	headXRadius, headYRadius,
	eyeYOffset, eyeYRadius,
}) => {

}

export const createTheMan = () => {
	const headProps = drawHead()
	const eyeProps = drawEyes(headProps)
	const mouthProps = drawMouth({ ...headProps, ...eyeProps })
}