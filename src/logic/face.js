import { getCanvasSize } from '/src/logic/elements'
import { drawEllipse } from '/src/logic/drawShapes'
import { getRandomBetween, getRandomColorString } from '/src/logic/util'

export const drawHead = () => {
	const canvasSize = getCanvasSize()
	const headRadiusX = getRandomBetween(canvasSize / 4, canvasSize / 2)
	const headRadiusY = getRandomBetween(canvasSize / 4, canvasSize / 2)
	const skinColor = getRandomColorString()

	drawEllipse(
		canvasSize / 2,
		canvasSize / 2,
		headRadiusX,
		headRadiusY,
		Math.PI / 2,
		0,
		2 * Math.PI,
		skinColor,
		skinColor,
	)
}