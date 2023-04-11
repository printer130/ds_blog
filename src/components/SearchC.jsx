import { useStore } from '@nanostores/preact'
import { DEFAULT_HITS, KEYS_PRESSED } from 'src/consts'
import { isSearchOpen } from 'src/state/c'
import { Hit } from './Hit'
import { searchIndex } from 'src/lib/search'
import { listener } from '@utils/listener'

export function SearchC () {
	const $isSearchOpen = useStore(isSearchOpen)
	const { onFind, hits, onHits, find } = searchIndex()
	listener({ fn: Escape, type: 'keydown' })
	listener({ fn: SearchShortCut, type: 'keydown' })

	const handleChange = e => {
		const v = e.target.value
		onFind(v)
	}

	function Escape (e) {
		if (e.keyCode === 27 || e.code === 'Escape') {
			onFind('')
			onHits(DEFAULT_HITS)
			isSearchOpen.set(false)
		}
	}

	function SearchShortCut (e) {
		if (e.key === 'Control' && e.keyCode === 17) {
			KEYS_PRESSED[e.key] = true
		}
		if (KEYS_PRESSED.Control && e.key === 'k') {
			e.preventDefault()
			isSearchOpen.set(true)
		}
	}

	return (<>
		{
			$isSearchOpen && <>
				<div class='ais-SearchBox bg-[#f6f4f4] mx-auto items-center max-w-4xl top-0 left-0 right-0 flex flex-col w-full fixed bottom-0 h-screen z-20'>
					<div class='border w-[inherit] border-none sm:border-slate-400 rounded-lg mt-[20%] overflow-auto'>
						<form class='ais-SearchBox-form bg-transparent flex-col max-w-[640px] before:-mt-1 h-[54px] mx-auto' novalidate >
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
									onFind(''); onHits(DEFAULT_HITS); isSearchOpen.set(!$isSearchOpen)
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
							<hr class='m-0 p-0 pb-1'/>
							<small class=' text-[#120] pl-10 text-sm'>
								Recomendado para ti
							</small>
						</form>
						<ul class={'bg-transparent px-1 mb-1 h-fit max-w-[640px] overflow-auto overflow-y-auto mt-8 border-none mx-auto'}>
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
