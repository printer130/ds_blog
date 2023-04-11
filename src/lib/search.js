import algoliasearch from 'algoliasearch/lite'
import { useEffect, useState } from 'preact/hooks'
import { DEFAULT_HITS } from 'src/consts'

export const searchClient = algoliasearch('VPJ1ILH2V9', '9d930af6938e5cba8fabe551fba44a2b')
export const index = searchClient.initIndex('ds_blog')

export function searchIndex () {
	const [find, setFind] = useState('')
	const [hits, setHits] = useState(DEFAULT_HITS)

	useEffect(() => {
		find.length >= 3 && index.search(find)
			.then(query => {
				setHits(query.hits)
			})
	}, [find])

	return {
		onFind: setFind,
		onHits: setHits,
		hits,
		find
	}
}