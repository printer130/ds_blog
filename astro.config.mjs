import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/static'

const url =
	import.meta.VERCEL_ENV === 'production'
		? 'https://asurbanipal.xyz'
		: 'http://localhost:3001'

export default defineConfig({
	integrations: [mdx(), preact(), tailwind(), sitemap()],
	output: 'static',
	adapter: vercel(),
	site: url,
	image: {
		remotePatterns: [{ protocol: 'https' }]
	},
	experimental: {
		assets: true,
		prerender: true
	}
})
