import algoliasearch from 'algoliasearch/lite'
import {
	InstantSearch,
	SearchBox,
	Hits,
	Highlight
} from 'react-instantsearch-hooks-web'


const searchClient = algoliasearch('VPJ1ILH2V9', '9d930af6938e5cba8fabe551fba44a2b')
const index = searchClient.initIndex('ds_blog')

function Hit ({ hit }) {
	return (
		<article>
			<img src={hit.image} alt={hit.name} />
			<p>{hit.categories[0]}</p>
			<h1>
				<Highlight attribute='name' hit={hit} />
			</h1>
			<p>${hit.price}</p>
		</article>
	)
}

export default function SearchC () {
	return (
		<InstantSearch searchClient={searchClient} indexName={index}>
			<SearchBox />
			<Hits hitComponent={Hit} />
		</InstantSearch>
	)
}
