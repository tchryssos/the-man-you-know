import { canvasContext } from '/src/logic/elements'

export const drawCircle = (x = 55, y = 55, r = 50, fill = "#fff") => {
	canvasContext.beginPath()
	canvasContext.strokeStyle = fill
	canvasContext.arc(x, y, r, 0, 2 * Math.PI)
	canvasContext.stroke()
}