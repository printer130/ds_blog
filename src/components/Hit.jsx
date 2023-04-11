export function Hit ({ hit } = { hit: [] }) {
	return (
		<li class='list-none pb-4 rounded-t-lg rounded-b-lg px-4 hover:bg-slate-400'>
			<a href={hit.url} target='_self' class='w-full m-0 cursor-pointer'>
				<article class=''>
					<img src={hit?.image} alt={hit?.name} />
					<h1 class='p-0 m-0 text-[#120] text-xl font-semibold'>
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