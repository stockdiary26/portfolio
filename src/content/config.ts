import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
      year: z.number().int().min(2000).max(2100),
      order: z.number().int().default(0),
      thumbnail: image(),
      images: z
        .array(
          z.object({
            src: image(),
            caption: z.string().optional(),
          }),
        )
        .min(1, 'at least one image is required'),
      summary: z.string().min(1),
    }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().default('About'),
  }),
});

export const collections = { works, about };
