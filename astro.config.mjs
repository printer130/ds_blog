import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	site: 'https://ds-blog-sigma.vercel.app',
	integrations: [mdx(), preact(), tailwind(), sitemap()],
	output: 'server',
	adapter: vercel()
})