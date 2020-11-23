import { getCanvasSize } from '/src/logic/elements'
import { drawEllipse, drawCurve, drawLine } from '/src/logic/drawShapes'
import {
	getRandomBetween,
	getRandomColorString,
	getRandomItem,
} from '/src/logic/util'
import { getEllipsePoint } from '/src/logic/math'
import { drawCircle } from './drawShapes'

const drawHead = () => {
	const canvasSize = getCanvasSize()
	const headRadiusX = getRandomBetween(canvasSize / 3, canvasSize / 2)
	const headRadiusY = getRandomBetween(canvasSize / 3, canvasSize / 2)
	const skinColor = getRandomColorString()

	drawEllipse(
		canvasSize / 2,
		canvasSize / 2,
		headRadiusX,
		headRadiusY,
		0,
		2 * Math.PI,
		skinColor,
		skinColor,
	)
	return {
		canvasSize,
		headRadiusX,
		headRadiusY,
		skinColor,
		headCenter: canvasSize / 2,
	}
}

const drawEyeEllipse = (x, y, rX, rY, color) =>
	drawEllipse(x, y, rX, rY, 0, 2 * Math.PI, color, color)
const drawEyes = ({ canvasSize, headRadiusX, headRadiusY, headCenter }) => {
	// Eyeballs
	const eyeXRadius = getRandomBetween(headRadiusX / 8, headRadiusX / 4)
	const eyeYRadius = getRandomBetween(headRadiusY / 8, headRadiusY / 4)
	const eyeInnerBound = headCenter + eyeXRadius
	const eyeOuterBound = headCenter + headRadiusX - eyeXRadius * 2

	const eyeRX = getRandomBetween(eyeInnerBound, eyeOuterBound)
	const eyeXOffset = eyeRX - headCenter
	const maxEyeYOffset =
		getEllipsePoint(
			[eyeRX + eyeXRadius, headCenter, headRadiusX],
			[headCenter, headRadiusY],
		) + eyeYRadius
	const eyeLX = headCenter - eyeXOffset
	const eyeY = getRandomBetween(canvasSize / 2, maxEyeYOffset)
	const eyeYOffset = eyeY - headCenter

	// Draw eyeballs
	drawEyeEllipse(eyeRX, eyeY, eyeXRadius, eyeYRadius, '#fff')
	drawEyeEllipse(eyeLX, eyeY, eyeXRadius, eyeYRadius, '#fff')

	// Pupils
	const pupilXRadius = getRandomBetween(eyeXRadius / 2, eyeXRadius / 1.5)
	const pupilYRadius = getRandomBetween(eyeYRadius / 4, eyeYRadius / 2)
	const pupilInnerBound = eyeRX - eyeXRadius + pupilXRadius
	const pupilOutterBound = eyeRX + eyeXRadius - pupilYRadius
	const pupilRX = getRandomBetween(pupilInnerBound, pupilOutterBound)
	const pupilXOffset = pupilRX - headCenter
	const pupilLX = headCenter - pupilXOffset
	const pupilY = eyeY
	const pupilYOffset = pupilY - headCenter

	// Draw Pupils
	drawEyeEllipse(pupilRX, pupilY, pupilXRadius, pupilYRadius, '#000')
	drawEyeEllipse(pupilLX, pupilY, pupilXRadius, pupilYRadius, '#000')

	const eyesClose = eyeXOffset - eyeXRadius <= 20

	return {
		eyeXOffset,
		eyeXRadius,
		eyeYOffset,
		eyeYRadius,
		pupilXOffset,
		pupilXRadius,
		pupilYOffset,
		pupilYRadius,
		maxEyeYOffset,
		eyesClose,
	}
}

const drawMouth = ({ headRadiusX, headRadiusY, eyeYRadius, headCenter }) => {
	const mouthPadding = 60
	const mouthYTop = getRandomBetween(
		headCenter + eyeYRadius,
		headCenter + headRadiusY - mouthPadding,
	)
	const mouthYBottom = getRandomBetween(
		mouthYTop,
		headCenter + headRadiusY - mouthPadding,
	)
	const mouthXLMax =
		getEllipsePoint(
			[mouthYTop, headCenter, headRadiusY],
			[headCenter, headRadiusX],
		) + mouthPadding
	const mouthXRMax =
		getEllipsePoint(
			[mouthYTop, headCenter, headRadiusY],
			[headCenter, headRadiusX],
			'below',
		) - mouthPadding
	const mouthRX = getRandomBetween(headCenter, mouthXRMax)
	const mouthLX = headCenter - (mouthRX - headCenter)
	const mood = getRandomItem(['smile', 'frown', 'neutral'])
	let y = { top: mouthYTop, bot: mouthYBottom }
	if (mood === 'neutral') {
		drawLine(mouthLX, mouthRX, y.top)
	} else {
		if (mood === 'frown') {
			y = { top: mouthYBottom, bot: mouthYTop }
		}
		drawCurve(
			mouthLX,
			y.top,
			getRandomBetween(mouthLX, mouthRX),
			y.bot,
			mouthRX,
			y.top,
		)
	}
	return {
		mouthLX,
		mouthRX,
		mouthTop: y.top,
		mouthBottom: y.bot,
	}
}

const drawNose = ({
	headCenter,
	headRadiusX,
	headRadiusY,
	mouthTop,
	eyeYOffset,
	eyeYRadius,
	eyesClose,
	eyeXOffset,
	eyeXRadius,
}) => {
	const nosePadding = 20

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

export const createTheMan = () => {
	const headProps = drawHead()
	const eyeProps = drawEyes(headProps)
	const mouthProps = drawMouth({ ...headProps, ...eyeProps })
	const noseProps = drawNose({ ...headProps, ...eyeProps, ...mouthProps })
}
