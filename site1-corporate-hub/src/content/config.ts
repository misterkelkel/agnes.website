import { defineCollection, z } from "astro:content";

// Site 1 content collections — git-backed via Decap CMS (cms/config.yml).
const programs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    audience: z.enum(["b2b", "b2c", "mixed"]),
    eyebrow: z.string().optional(),
    duration: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    outcomes: z.array(z.string()).default([]),
    ctaLabel: z.string().default("Enquire"),
    ctaUrl: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  type: "content",
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    program: z.string().optional(),
    avatar: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { programs, testimonials };
