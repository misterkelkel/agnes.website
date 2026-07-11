import { defineCollection, z } from "astro:content";

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    track: z.enum(["inner-table", "unfinished-conversations", "threshold", "general"]),
    date: z.date(),
    location: z.string().optional(),
    summary: z.string(),
    body: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const editions = defineCollection({
  type: "content",
  schema: z.object({
    track: z.enum(["inner-table", "unfinished-conversations", "threshold"]),
    edition: z.string(),                       // e.g. "April 2026"
    date: z.date(),
    gallery: z.array(z.string()).default([]),  // image paths
    note: z.string().optional(),
  }),
});

const galleries = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    event: z.string().optional(),
    images: z.array(z.string()).default([]),
  }),
});

export const collections = { events, editions, galleries };
