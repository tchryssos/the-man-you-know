import times from 'ramda/src/times'
import { getCanvasSize } from '/src/logic/elements'
import { drawEllipse, drawLine } from '/src/logic/drawShapes'
import {
	getRandomBetween,
	getRandomColorString,
	getRandomItem,
} from '/src/logic/util'
import { drawMouth, drawNose, drawPupils } from '/src/logic/styles'
import { getEllipsePoint } from '/src/logic/math'

const getHead = () => {
	const canvasSize = getCanvasSize()
	const headRadiusX = Math.round(
		getRandomBetween(canvasSize / 3.5, canvasSize / 2.5),
	)
	const headRadiusY = Math.round(
		getRandomBetween(canvasSize / 3.5, canvasSize / 2.5),
	)
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
const getEyes = ({ canvasSize, headRadiusX, headRadiusY, headCenter }) => {
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
	const pupilColor = getRandomColorString()
	drawPupils({
		pupilRX,
		pupilLX,
		pupilY,
		pupilXRadius,
		pupilYRadius,
		pupilColor,
	})

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

const getMouth = ({ headRadiusX, headRadiusY, eyeYRadius, headCenter }) => {
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
	let mouthXRMax =
		getEllipsePoint(
			[mouthYTop, headCenter, headRadiusY],
			[headCenter, headRadiusX],
			'below',
		) - mouthPadding
	const mouthRX = getRandomBetween(headCenter, mouthXRMax)
	const mouthLX = Math.min(headCenter - (mouthRX - headCenter), mouthRX - 20)
	const y = drawMouth({ mouthYTop, mouthYBottom, mouthLX, mouthRX })
	return {
		mouthLX,
		mouthRX,
		mouthXLMax,
		mouthXRMax,
		mouthTop: y.top,
		mouthBottom: y.bot,
	}
}

const getNose = ({
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
	let noseBottom = getRandomBetween(
		noseTop + 10,
		Math.min(noseTop + 80, mouthTop - 20),
	)

	if (noseTop - noseBottom < 20) {
		noseTop = noseTop - 20
	}

	let noseX = getRandomBetween(
		headCenter,
		headCenter + headRadiusX - nosePadding,
	)
	if (!eyesClose) {
		noseX = Math.min(noseX, headCenter + eyeXOffset - eyeXRadius)
	}
	noseX = Math.max(headCenter + 20, noseX)
	noseX = getRandomItem([noseX, headCenter - (noseX - headCenter)])

	drawNose({ headCenter, noseTop, noseBottom, noseX })
	return { noseTop, noseBottom, noseX }
}

const getHair = ({ headCenter, headRadiusY, headRadiusX }) => {
	const hairColor = getRandomColorString()
	const hairWidth = getRandomBetween(2, 10)
	const hairDensity = Math.floor(headRadiusX / hairWidth)
	const hairRoots = times((n) => {
		return getEllipsePoint(
			[headCenter - hairWidth * n, headCenter, headRadiusX],
			[headCenter, headRadiusY],
		)
	}, hairDensity)
	hairRoots.forEach((r, i) => {
		const startingLX = headCenter - hairWidth * i
		drawLine(
			startingLX,
			r,
			startingLX - hairWidth,
			r - getRandomBetween(2, 60),
			hairColor,
		)
		const startingRX = headCenter + hairWidth * i
		drawLine(
			startingRX,
			r,
			startingRX + hairWidth,
			r - getRandomBetween(2, 60),
			hairColor,
		)
	})
}

export const createTheMan = () => {
	let faceProps = { ...getHead() }
	faceProps = { ...faceProps, ...getEyes(faceProps) }
	faceProps = { ...faceProps, ...getMouth(faceProps) }
	faceProps = { ...faceProps, ...getNose(faceProps) }
	faceProps = { ...faceProps, ...getHair(faceProps) }
}
