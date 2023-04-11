import { useEffect } from 'preact/hooks'

export function listener ({ fn, type }) {
	useEffect(() => {
		document.addEventListener(type, fn)

		return () => { removeEventListener(type, fn) }
	}, [])
}