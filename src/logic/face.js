import { getCanvasSize } from '/src/logic/elements'
import { drawCircle } from '/src/logic/drawShapes'
import { getRandomBetween, getRandomColorString } from '/src/logic/util'

export const drawHead = () => {
	const canvasSize = getCanvasSize()
	const headRadiusX = getRandomBetween(canvasSize / 4, canvasSize / 2)
	const headRadiusY = getRandomBetween(canvasSize / 4, canvasSize / 2)
	const skinColor = getRandomColorString()

	drawCircle(canvasSize / 2, canvasSize / 2, headRadiusX, skinColor, skinColor)
}