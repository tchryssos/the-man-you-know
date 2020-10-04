import { getCanvasSize, resizeCanvas } from '/src/logic/elements'
import { drawEllipse } from '/src/logic/drawShapes'

resizeCanvas()
drawEllipse(getCanvasSize() / 2, getCanvasSize() / 2, 50)