import {
	canvasContext,
} from '/src/logic/elements'

export const drawEllipse = (
	x, y, rX, rY,
	startAngle, endAngle, stroke = "#fff", fill, drawCounterClockwise = true
) => {
	canvasContext.beginPath()
	canvasContext.strokeStyle = stroke
	canvasContext.fillStyle = fill
	canvasContext.ellipse(
		x, y, rX, rY, Math.PI / 2,
		startAngle, endAngle, drawCounterClockwise
	)
	canvasContext.stroke()
	canvasContext.fill()
}

export const drawCircle = (x, y, r, stroke, fill) => (
	drawEllipse(
		x, y,
		r, r,
		Math.PI / 2,
		0, 2 * Math.PI,
		stroke, fill,
	)
)

export const drawCurve = (startX, startY, middleX, middleY, endX, endY, fill = "#000") => {
	canvasContext.beginPath()
	canvasContext.fillStyle = fill
	canvasContext.lineWidth = 4
	canvasContext.moveTo(startX, startY)
	canvasContext.quadraticCurveTo(middleX, middleY, endX, endY)
	canvasContext.stroke()
}

export const drawLine = (startX, endX, y, fill = '#000') => {
	canvasContext.beginPath()
	canvasContext.fillStyle = fill
	canvasContext.lineWidth = 4
	canvasContext.moveTo(startX, y)
	canvasContext.lineTo(endX, y)
	canvasContext.stroke()
}