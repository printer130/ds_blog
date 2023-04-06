import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'

const searchClient = algoliasearch('VPJ1ILH2V9', '9d930af6938e5cba8fabe551fba44a2b')

export default function SearchC () {
	return <InstantSearch searchClient={searchClient} indexName='ds'>
		<SearchBox />
		<Hits />
	</InstantSearch>
}
