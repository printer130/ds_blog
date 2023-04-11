import { useStore } from '@nanostores/preact'
import algoliasearch from 'algoliasearch/lite'
import { useEffect, useState } from 'preact/hooks'
import { isSearchOpen } from 'src/state/c'

const searchClient = algoliasearch('VPJ1ILH2V9', '9d930af6938e5cba8fabe551fba44a2b')
const index = searchClient.initIndex('ds_blog')

const DEFAULT_HITS = [
	{
		title: 'Procesamiento del Lenguaje Natural',
		sub_title: 'Llevar a raíz',
		url: 'https://ds-blog-sigma.vercel.app/blog/natural_language_processing#llevar-a-ra%C3%ADz',
		description: 'Stemmizer: Recorta las palabras mediante un proceso heurístico. Es rápido y fácil de usar, pero a veces no es certero:\nLemmatizer: Utiliza un vocabulario y realiza un análisis morfológico de las palabras. Precisa que se le informe cual es la función de la palabra en el texto:\nEn lingüística, el lema es una unidad semántica que constituye el léxico de un idioma. Si se trata de verbos, es la conjugación verbal en infinitivo; si se trata de sustantivos, es el singular….',
		childs: []
	},
	{
		title: 'Procesamiento del Lenguaje Natural',
		sub_title: 'Normalizar',
		url: 'https://ds-blog-sigma.vercel.app/blog/natural_language_processing#normalizar',
		description: 'Consiste en llevar todo el texto a un formato común donde palabras escrita de manera distinta o con significados similares se representen de la misma manera.',
		childs: []
	}
]



function Hit ({ hit } = { hit: [] }) {
	return (
		<li class='list-none pb-4 rounded-t-lg rounded-b-lg px-4 hover:bg-slate-400'>
			<a href={hit.url} target='_self' class='w-full m-0 cursor-pointer'>
				<article class=''>
					{/* <img src={hit?.image} alt={hit?.name} /> */}
					<h1 class='p-0 m-0 text-[#120] text-xl font-semibold'>
						{/* 	<Highlight attribute='name' hit={hit} /> */}
						{hit?.title}.
					</h1>
					<h2 class='p-0 m-0 text-base font-semibold text-[#120]'>
						#{hit?.sub_title}
					</h2>
					<p class='p-0 m-0 text-base text-[#120] font-normal text-ellipsis whitespace-nowrap overflow-clip w-full max-w-full'>{hit?.description}</p>
				</article>
			</a>
		</li>
	)
}

export function SearchC () {
	const [find, setFind] = useState('')
	const [hits, setHits] = useState(DEFAULT_HITS)
	const $isSearchOpen = useStore(isSearchOpen)

	useEffect(() => {
		find.length >= 3 && index.search(find)
			.then(query => {
				setHits(query.hits)
			})
	}, [find])

	useEffect(() => {
		document.addEventListener('keydown', Escape)

		return () => { removeEventListener('keydown', Escape) }
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', SearchShortCut)

		return () => { removeEventListener('keydown', SearchShortCut) }
	}, [])

	const handleChange = e => {
		const v = e.target.value
		setFind(v)
	}

	function Escape (e) {
		if (e.keyCode === 27 || e.code === 'Escape') {
			setFind('')
			setHits(DEFAULT_HITS)
			isSearchOpen.set(false)
		}
	}

	const keysPressed = {}

	function SearchShortCut (e) {
		if (e.key === 'Control' && e.keyCode === 17) {
			keysPressed[e.key] = true
		}
		if (keysPressed.Control && e.key === 'k') {
			e.preventDefault()
			isSearchOpen.set(true)
		}
	}

	return (<>
		{
			$isSearchOpen && <>
				<div class='ais-SearchBox bg-[#f6f4f4] mx-auto items-center max-w-4xl top-0 left-0 right-0 flex flex-col w-full fixed bottom-0 h-screen z-20'>
					<div class='border w-[inherit] border-none sm:border-slate-400 rounded-lg mt-[20%] overflow-auto'>
						<form class='ais-SearchBox-form bg-transparent flex-col max-w-[640px] before:-mt-1 h-[54px]' novalidate >
							<input class='ais-SearchBox-input bg-transparent py-4 font-medium border-none text-lg shadow-none ' autocomplete='off' autocorrect='off' autocapitalize='off' placeholder='Buscar...' spellcheck='false' maxlength='512' type='search' value={find} onChange={handleChange} name='search' />

							<button class='ais-SearchBox-submit' title='Submit the search query.'>
								<svg class='ais-SearchBox-submitIcon' width='10' height='10' viewBox='0 0 40 40' aria-hidden='true'>
									<path d='M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z'></path>
								</svg>
							</button>
							<button
								class='ais-SearchBox-reset'
								type='reset'
								title='Clear the search query.' onClick={() => {
									setFind(''); setHits(DEFAULT_HITS); isSearchOpen.set(!$isSearchOpen)
								}} >
								<svg class='ais-SearchBox-resetIcon' viewBox='0 0 20 20' width='10' height='10' aria-hidden='true'>
									<path d='M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z'></path>
								</svg>
							</button>
							<span class='ais-SearchBox-loadingIndicator' hidden>
								<svg class='ais-SearchBox-loadingIcon w-4
							 h-4 ' viewBox='0 0 38 38' stroke='#444' aria-hidden='true'>
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
						<hr class='relative bg-slate-400 my-0 max-w-[640px] h-[1px] mx-1'/>
						<small class='inline-block text-[#120] max-w-[640px] pl-10 pb-1 text-sm bg-transparent border-slate-400'>Recomendado para ti</small>
						<ul class={'bg-transparent px-1 mb-1 h-fit max-w-[640px] overflow-auto overflow-y-auto border-none'}>
							{hits?.map(list => {
								return <Hit hit={list} />
							})}
						</ul>
					</div>
				</div>
			</>
		}
	</>
	)
}
