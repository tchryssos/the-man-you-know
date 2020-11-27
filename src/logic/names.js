import { getRandomItem } from '/src/logic/util'
import { nameForm, namePTag, nameInput } from '/src/logic/elements'

export const defaultNames = [
	'Billy Joel',
	'Neil Diamond',
	'Art Garfunkel',
	'Barry Manilow',
	'England Dan',
	'Chuck Mangione',
]

// START - NAME GENERATOR - START
const vowels = ['a', 'e', 'i', 'o', 'u', 'y']

// Weightings roughly taken from english letter frequency
// http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html
const weightedConsonants = [
	['b', 2],
	['c', 4],
	['d', 7],
	['f', 4],
	['g', 3],
	['h', 10],
	['j', 1],
	['k', 1],
	['l', 6],
	['m', 4],
	['n', 11],
	['p', 3],
	['q', 1],
	['r', 10],
	['s', 10],
	['t', 15],
	['v', 2],
	['w', 3],
	['x', 1],
	['z', 1],
]
const consonants = weightedConsonants.map((c) => c[0])
const selectableConstants = []
// @TODO This is a very bad way of handling weighted random letters
weightedConsonants.forEach((c) => {
	for (let i = 0; i < c[1]; i++) {
		selectableConstants.push(c[0])
	}
})

const replaceLetter = (letter, optionArray) => {
	const replacement = getRandomItem(optionArray)
	if (letter === letter.toUpperCase()) {
		return replacement.toUpperCase()
	}
	return replacement
}

export const buildName = (templateName) => {
	const letters = templateName.split('')
	return letters
		.reduce((acc, cur, i, arr) => {
			let letter = cur
			if (i && arr[i - 1] === cur) {
				letter = acc[i - 1]
			} else if (vowels.indexOf(cur.toLowerCase()) !== -1) {
				letter = replaceLetter(letter, vowels)
			} else if (consonants.indexOf(cur.toLowerCase()) !== -1) {
				letter = replaceLetter(letter, selectableConstants)
			}
			return [...acc, letter]
		}, [])
		.join('')
}
// END - NAME GENERATOR - END
