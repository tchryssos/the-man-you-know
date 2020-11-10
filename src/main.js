import { resizeCanvas, namePTag } from '/src/logic/elements'
import { createTheMan } from '/src/logic/face'
import { defaultNames, buildName } from '/src/logic/names'
import { getRandomItem } from '/src/logic/util'

resizeCanvas()
createTheMan()
const templateName = getRandomItem(defaultNames)
const name = buildName(templateName)
namePTag.textContent = name