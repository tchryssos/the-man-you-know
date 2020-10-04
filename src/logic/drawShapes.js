import {
	canvasContext,
} from '/src/logic/elements'

export const drawEllipse = (
	x, y, rX, rY, rotation,
	startAngle, endAngle, drawCounterClockwise = true, stroke = "#fff",
) => {
	canvasContext.beginPath()
	canvasContext.strokeStyle = stroke
	canvasContext.ellipse(
		x, y, rX, rY, rotation,
		startAngle, endAngle, drawCounterClockwise
	)
	canvasContext.stroke()
}

export const drawCircle = (x, y, r, stroke) => (
	drawEllipse(
		x, y,
		r, r,
		Math.PI / 2,
		0, 2 * Math.PI,
		true, stroke
	)
)