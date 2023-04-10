import algoliasearch from 'algoliasearch/lite'
import { useEffect, useState } from 'preact/hooks'

const searchClient = algoliasearch('VPJ1ILH2V9', '9d930af6938e5cba8fabe551fba44a2b')
const index = searchClient.initIndex('ds_blog')

function Hit ({ hit } = { hit: [] }) {
	return (
		<li class='list-none pb-4'>
			<a href={hit.url} target='_self' class='w-full m-0 cursor-pointer hover:underline '>
				<article class=''>
					{/* <img src={hit?.image} alt={hit?.name} /> */}
					<h1 class='p-0 m-0 text-xl font-semibold'>
						{/* 	<Highlight attribute='name' hit={hit} /> */}
						{hit?.title}.
					</h1>
					<h2 class='p-0 m-0 text-lg font-semibold'>
						#{hit?.sub_title}
					</h2>
					<p class='p-0 m-0 text-base text-[#120] font-normal'>{hit?.description}</p>
				</article>
			</a>
		</li>
	)
}

export function SearchC () {
	const [find, setFind] = useState('')
	const [hits, setHits] = useState([])
	useEffect(() => {
		find.length >= 3 && index.search(find)
			.then(query => {
				setHits(query.hits)
			})
	}, [find])

	const handleChange = e => {
		const v = e.target.value
		setFind(v)
	}

	return (
		<div class='ais-SearchBox relative'>
			<ul class={`bg-[#f6f4f4] px-1 h-fit z-10 absolute pt-0 top-10 sm:-left-40 right-0 bottom-0-blue-400 overflow-auto overflow-y-auto max-h-[80vh] ${hits.length > 0 && 'border border-[#120]/20'}`}>
				{hits?.map(list => {
					return <Hit hit={list} />
				})}
			</ul>
			<form class='ais-SearchBox-form' novalidate >
				<input class='ais-SearchBox-input' autocomplete='off' autocorrect='off' autocapitalize='off' placeholder='Buscar...' spellcheck='false' maxlength='512' type='search' value={find} onChange={handleChange} name='search' />
				<button class='ais-SearchBox-submit' title='Submit the search query.'>
					<svg class='ais-SearchBox-submitIcon' width='10' height='10' viewBox='0 0 40 40' aria-hidden='true'>
						<path d='M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z'></path>
					</svg>
				</button>
				<button class={`ais-SearchBox-reset ${find?.length < 1 && 'hidden'}`} type='reset' title='Clear the search query.' onClick={() => {
					setFind(''); setHits([])
				}} >
					<svg class='ais-SearchBox-resetIcon' viewBox='0 0 20 20' width='10' height='10' aria-hidden='true'>
						<path d='M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z'></path>
					</svg>
				</button>
				<span class='ais-SearchBox-loadingIndicator' hidden>
					<svg width='16' height='16' viewBox='0 0 38 38' stroke='#444' class='ais-SearchBox-loadingIcon' aria-hidden='true'>
						<g fill='none' fillRule='evenodd'>
							<g transform='translate(1 1)' strokeWidth='2'>
								<circle strokeOpacity='.5' cx='18' cy='18' r='18' />
								<path d='M36 18c0-9.94-8.06-18-18-18'>
									<animateTransform
										attributeName='transform'
										type='rotate'
										from='0 18 18'
										to='360 18 18'
										dur='1s'
										repeatCount='indefinite'
									/>
								</path>
							</g>
						</g>
					</svg>
				</span>
			</form>
		</div>
	)
}
