import { getCanvasWidth, getCanvasHeight } from '/src/logic/elements'
import { drawCircle } from '/src/logic/drawShapes'

drawCircle(getCanvasWidth() / 2, getCanvasHeight() / 2, 50)