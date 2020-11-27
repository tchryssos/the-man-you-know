import times from 'ramda/src/times'
import { getRandomItem, getRandomBetween } from '/src/logic/util'
import {
	drawLine,
	drawCurve,
	drawRectangle,
	drawEllipse,
	drawCross,
} from '/src/logic/drawShapes'

export const drawMouth = ({ mouthYTop, mouthYBottom, mouthLX, mouthRX }) => {
	const mood = getRandomItem(['smile', 'frown', 'neutral', 'grimmace'])
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
		case 'grimmace': {
			y.bot = Math.max(y.bot, y.top + 12)
			drawRectangle(
				mouthLX,
				y.top,
				mouthRX - mouthLX,
				y.bot - y.top,
				'#000',
				'#fff',
			)
			const teeth = getRandomBetween(2, 5)
			const mouthLength = mouthRX - mouthLX
			times((n) => {
				if (n === 0) return
				drawCross(
					mouthLX + ((mouthLength / teeth) * n),
					y.top,
					y.bot,
					mouthLX,
					(y.top + y.bot) / 2,
					mouthRX,
				)
			}, teeth)
			break
		}
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
			drawCross(
				pupilRX,
				pupilY - pupilYRadius,
				pupilY + pupilYRadius,
				pupilRX - pupilYRadius,
				pupilY,
				pupilRX + pupilYRadius,
				pupilColor,
			)
			drawCross(
				pupilLX,
				pupilY - pupilYRadius,
				pupilY + pupilYRadius,
				pupilLX - pupilYRadius,
				pupilY,
				pupilLX + pupilYRadius,
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
