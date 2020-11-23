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
