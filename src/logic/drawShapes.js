import { ctx } from '/src/logic/elements'
import { standardLineWidth } from '/src/logic/constants'

export const drawEllipse = (
	x,
	y,
	rX,
	rY,
	startAngle,
	endAngle,
	stroke = '#fff',
	fill,
	drawCounterClockwise = true,
) => {
	ctx.beginPath()
	ctx.strokeStyle = stroke
	ctx.fillStyle = fill
	ctx.ellipse(
		x,
		y,
		rX,
		rY,
		Math.PI / 2,
		startAngle,
		endAngle,
		drawCounterClockwise,
	)
	ctx.stroke()
	ctx.fill()
}

export const drawCircle = (x, y, r, stroke, fill) => {
	ctx.beginPath()
	ctx.strokeStyle = stroke
	ctx.fillStyle = fill
	ctx.arc(x, y, r, 0, 2 * Math.PI)
	ctx.stroke()
	ctx.fill()
}

export const drawCurve = (
	startX,
	startY,
	middleX,
	middleY,
	endX,
	endY,
	fill = '#000',
) => {
	ctx.beginPath()
	ctx.fillStyle = fill
	ctx.lineWidth = standardLineWidth
	ctx.moveTo(startX, startY)
	ctx.quadraticCurveTo(middleX, middleY, endX, endY)
	ctx.stroke()
}

export const drawLine = (ax, ay, bx, by, stroke = '#000') => {
	ctx.beginPath()
	ctx.strokeStyle = stroke
	ctx.lineWidth = standardLineWidth
	ctx.moveTo(ax, ay)
	ctx.lineTo(bx, by)
	ctx.stroke()
}

export const drawTriangle = (ax, ay, bx, by, cx, cy, fill = '#000') => {
	ctx.beginPath()
	ctx.fillStyle = fill
	ctx.lineWidth = standardLineWidth
	ctx.moveTo(ax, ay)
	ctx.lineTo(bx, by)
	ctx.lineTo(cx, cy)
	ctx.fill()
} 
