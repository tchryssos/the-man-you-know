import { getRandomItem, getRandomBetween } from '/src/logic/util'
import { drawLine, drawCurve } from '/src/logic/drawShapes'

export const getMouth = ({ mouthYTop, mouthYBottom, mouthLX, mouthRX }) => {
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

export const getNose = ({ headCenter, noseTop, noseBottom, noseX }) => {
	const shape = getRandomItem(['round', 'hook'])

	switch (shape) {
		case 'hook': {
			const bridgeBottom = noseTop + (noseBottom - noseTop) * 0.5
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
