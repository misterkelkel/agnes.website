import { defineCollection, z } from "astro:content";

const podcasts = defineCollection({
  type: "content",
  schema: z.object({
    number: z.number(),
    title: z.string(),
    guest: z.string().optional(),
    summary: z.string(),
    embedUrl: z.string(),                 // YouTube / Vimeo / Spotify
    duration: z.string().optional(),
    publishedAt: z.date(),
    cover: z.string().optional(),
  }),
});

const films = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    theme: z.string(),
    summary: z.string(),
    embedUrl: z.string().optional(),      // trailer
    laurels: z.array(z.string()).default([]),
    cover: z.string().optional(),
    order: z.number().default(0),
  }),
});

const press = defineCollection({
  type: "content",
  schema: z.object({
    outlet: z.string(),
    title: z.string(),
    url: z.string().optional(),
    date: z.date().optional(),
    quote: z.string().optional(),
  }),
});

export const collections = { podcasts, films, press };
