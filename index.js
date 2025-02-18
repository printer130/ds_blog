const dicc = {
	0: 'o',
	1: 'i',
	3: 'e',
	4: 'a',
	5: 's',
	7: 't'
}

function decodeMessage(message) {
	for (let i = 0; i < message.length; i++) {
		const der = message[i + 1]
		const izq = message[i - 1]
		const current = message[i]

		if (dicc[current]) message.replace(current, dicc[current])

		if (message[i] === '>') {
			message = message.replace(der, izq)
			message = message.replace(izq, der)
			message = message.replace(current, '')
		}

		if (message[i] === '*') {
			message = message.replace(der, '')
			message = message.replace(current, '')
		}

		message = message.replace(/[^a-zA-Z0-9¿?!¡ áéíóúÁÉÍÓÚ]/g, '')
	}
	console.log(message)
	return message
}

decodeMessage('a*bc>d')
// "adc"
/* Convierte números a letras según:
0 -> o
1 -> i
3 -> e
4 -> a
5 -> s
7 -> t */
/* Si encuentras el símbolo >, intercambia la letra que está a su izquierda con la de la derecha. */
