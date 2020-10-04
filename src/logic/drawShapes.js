import {
	canvasContext,
} from '/src/logic/elements'

export const drawEllipse = (
	x, y, r, startAngle = 0, endAngle = 2 * Math.PI,
	drawCounterClockwise = true, fill = "#fff",
) => {
	canvasContext.beginPath()
	canvasContext.strokeStyle = fill
	canvasContext.arc(x, y, r, startAngle, endAngle, drawCounterClockwise)
	canvasContext.stroke()
}