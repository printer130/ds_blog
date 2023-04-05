import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val: string | number | Date) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str: string | number | VarDate) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional()
	})
})

const labCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val: string | number | Date) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str: string | number | VarDate) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional()
	})
})

const ensamblersCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val: string | number | Date) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str: string | number | VarDate) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional()
	})
})

export const collections = {
	blog: blogCollection,
	lab: labCollection,
	ensamblers: ensamblersCollection,
	'lab/basics': {}
}
