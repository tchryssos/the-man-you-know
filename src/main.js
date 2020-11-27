import { resizeCanvas, namePTag, nameForm, nameInput } from '/src/logic/elements'
import { createTheMan } from '/src/logic/face'
import { defaultNames, buildName } from '/src/logic/names'
import { getRandomItem } from '/src/logic/util'

resizeCanvas()
createTheMan()
const templateName = getRandomItem(defaultNames)
const name = buildName(templateName)
namePTag.textContent = name

nameForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const seed = nameInput.value
	let name
	if (!seed) {
		name = buildName(getRandomItem(defaultNames))
	} else {
		name = buildName(seed)
	}
	namePTag.textContent = name
	createTheMan()
})