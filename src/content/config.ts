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

const hacked_blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    banner: z.string().optional()
  })
})

export const collections = {
	'hacked_blog': hacked_blog,
	blog: blogCollection,
	lab: labCollection,
	ensamblers: ensamblersCollection,
	'lab/basics': {}
}