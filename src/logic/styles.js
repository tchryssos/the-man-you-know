import { getRandomItem, getRandomBetween } from '/src/logic/util'
import {
	drawLine,
	drawCurve,
	drawRectangle,
	drawEllipse,
} from '/src/logic/drawShapes'

export const drawMouth = ({ mouthYTop, mouthYBottom, mouthLX, mouthRX }) => {
	const mood = getRandomItem(['smile', 'frown', 'neutral'])
	let y = { top: mouthYTop, bot: mouthYBottom }

	switch (mood) {
		case 'neutral':
			drawLine(mouthLX, y.top, mouthRX, y.top)
			break
		case 'frown':
			// if frowning, flip top and bottom mouth y coords
			y = { top: mouthYBottom, bot: mouthYTop }
			drawCurve(
				mouthLX,
				y.top,
				getRandomBetween(mouthLX, mouthRX),
				y.bot,
				mouthRX,
				y.top,
			)
			break
		default:
			// smile
			drawCurve(
				mouthLX,
				y.top,
				getRandomBetween(mouthLX, mouthRX),
				y.bot,
				mouthRX,
				y.top,
			)
	}
	return y
}

export const drawNose = ({ headCenter, noseTop, noseBottom, noseX }) => {
	const shape = getRandomItem(['round', 'hook'])

	switch (shape) {
		case 'hook': {
			const bridgeBottom =
				noseTop + (noseBottom - noseTop) * (getRandomBetween(3, 7) / 10)
			drawLine(headCenter, noseTop, headCenter, bridgeBottom)
			const tipShift = noseX >= headCenter ? -1 : 1
			drawCurve(
				headCenter + tipShift,
				bridgeBottom - 2,
				noseX,
				(bridgeBottom + noseBottom) / 2,
				headCenter + tipShift,
				noseBottom,
			)
			break
		}
		default:
			// round

			drawCurve(
				headCenter,
				noseTop,
				noseX,
				(noseTop + noseBottom) / 2,
				headCenter,
				noseBottom,
			)
	}
}

export const drawPupils = ({
	pupilRX,
	pupilLX,
	pupilY,
	pupilXRadius,
	pupilYRadius,
	pupilColor,
}) => {
	const style = getRandomItem(['ellipse', 'square', 'cross'])
	switch (style) {
		case 'ellipse':
			drawEllipse(
				pupilRX,
				pupilY,
				pupilXRadius,
				pupilYRadius,
				0,
				2 * Math.PI,
				pupilColor,
				pupilColor,
			)
			drawEllipse(
				pupilLX,
				pupilY,
				pupilXRadius,
				pupilYRadius,
				0,
				2 * Math.PI,
				pupilColor,
				pupilColor,
			)
			break
		case 'cross':
			drawLine(
				pupilRX,
				pupilY - pupilYRadius,
				pupilRX,
				pupilY + pupilYRadius,
				pupilColor,
			)
			drawLine(
				pupilRX - pupilYRadius,
				pupilY,
				pupilRX + pupilYRadius,
				pupilY,
				pupilColor,
			)
			drawLine(
				pupilLX,
				pupilY - pupilYRadius,
				pupilLX,
				pupilY + pupilYRadius,
				pupilColor,
			)
			drawLine(
				pupilLX - pupilYRadius,
				pupilY,
				pupilLX + pupilYRadius,
				pupilY,
				pupilColor,
			)
			break
		default:
			//square
			drawRectangle(
				pupilRX - pupilXRadius,
				pupilY - pupilYRadius,
				pupilXRadius,
				pupilXRadius,
				pupilColor,
				pupilColor,
			)
			drawRectangle(
				pupilLX,
				pupilY - pupilYRadius,
				pupilXRadius,
				pupilXRadius,
				pupilColor,
				pupilColor,
			)
	}
}
