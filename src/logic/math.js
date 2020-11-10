// From https://www.usingmaths.com/senior_secondary/javascript/ellipseequation.php
export const getEllipsePoint = (knownPointData, unknownPointData) => {
	const [kCoord, kCenter, kAxis] = knownPointData
	const [uCenter, uAxis] = unknownPointData
	const unknownCoord = uCenter + (uAxis / kAxis) * Math.sqrt(Math.pow(kAxis, 2) - Math.pow((kCoord - kCenter), 2))
	return unknownCoord
}