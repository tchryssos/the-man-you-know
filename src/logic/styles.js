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

export const getNose = ({
	headCenter,
	eyeYOffset,
	eyesClose,
	eyeYRadius,
	mouthTop,
	headRadiusX,
	nosePadding,
	eyeXOffset,
	eyeXRadius,
	headRadiusY,
}) => {
	const shape = getRandomItem(['round', 'hook'])
	let noseTop = headCenter + eyeYOffset
	if (eyesClose) {
		noseTop = headCenter + eyeYRadius
	}
	const noseBottom = getRandomBetween(
		noseTop + 10,
		Math.min(noseTop + 80, mouthTop - 20),
	)

	let noseX = getRandomBetween(
		headCenter,
		headCenter + headRadiusX - nosePadding,
	)
	if (!eyesClose) {
		noseX = Math.min(noseX, headCenter + eyeXOffset - eyeXRadius)
	}
	noseX = Math.max(headCenter + 10, noseX)

	drawCurve(
		headCenter,
		noseTop,
		noseX,
		(noseTop + noseBottom) / 2,
		headCenter,
		noseBottom,
	)
	return { noseTop, noseBottom, noseX }
}
