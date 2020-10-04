export const getEllipsePoint = (knownCoord, coordRadius, otherRadius) => (
	Math.sqrt(otherRadius) * Math.sqrt(1 - Math.pow(knownCoord / coordRadius, 2))
)
