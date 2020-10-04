import {
	canvasContext,
} from '/src/logic/elements'

export const drawEllipse = (x, y, r, fill = "#fff") => {
	canvasContext.beginPath()
	canvasContext.strokeStyle = fill
	canvasContext.arc(x, y, r, 0, 2 * Math.PI)
	canvasContext.stroke()
}