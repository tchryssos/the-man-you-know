import { getCanvasSize, resizeCanvas } from '/src/logic/elements'
import { drawCircle } from '/src/logic/drawShapes'

resizeCanvas()
drawCircle(getCanvasSize() / 2, getCanvasSize() / 2, 50)