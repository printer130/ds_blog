import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
/* import sitemap from '@astrojs/sitemap' */
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/static'

// const url = 'production' === import.meta.

export default defineConfig({
	integrations: [mdx(), preact(), tailwind()],
	output: 'static',
	adapter: vercel(),
	site: 'http://localhost:3001',
	experimental: {
		assets: true,
		prerender: true
	}
})