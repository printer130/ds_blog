import { useStore } from '@nanostores/preact'
import { isSearchOpen } from 'src/state/c'

export function Search () {
	const $isSearchOpen = useStore(isSearchOpen)

	return <button
		class='border-neutral-400 border rounded-lg px-2 text-neutral-400 py-1 text-base outline-none flex items-center gap-4'
		onclick={() => isSearchOpen.set(!$isSearchOpen)}>
		<svg data-testid='geist-icon' fill='none' height='18' shape-rendering='geometricPrecision' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' viewBox='0 0 24 24' width='18' class='w-4 h-4'><path d='M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z'></path><path d='M16 16l4.5 4.5'></path></svg>
			Buscar...
		<div class='flex-auto text-right'>
			<kbd class='border mr-1 border-neutral-400 bg-[#e4e4e4] rounded-md px-1'>
				<span class='text-sm'>Ctrl</span>
			</kbd>
			<kbd class='border border-neutral-400 bg-[#e4e4e4] rounded-md px-1'>
				<span class='text-sm'>K</span>
			</kbd>
		</div>
	</button>
}