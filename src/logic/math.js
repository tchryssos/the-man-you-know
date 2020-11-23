// From https://www.usingmaths.com/senior_secondary/javascript/ellipseequation.php
export const getEllipsePoint = (
	knownPointData,
	unknownPointData,
	hemisphere = 'above',
) => {
	const [kCoord, kCenter, kAxis] = knownPointData
	const [uCenter, uAxis] = unknownPointData
	const t2 =
		(kAxis / uAxis) *
		Math.sqrt(Math.pow(uAxis, 2) - Math.pow(kCoord - kCenter, 2))
	if (hemisphere === 'above') {
		return uCenter - t2
	} else {
		return uCenter + t2
	}
}
