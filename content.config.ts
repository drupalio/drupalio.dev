import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  category: z.enum(['banking', 'ai', 'fintech', 'media', 'infrastructure', 'enterprise']),
  stack: z.array(z.string()),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  challenge: z.string(),
  architecture: z.string(),
  results: z.string(),
  status: z.enum(['shipped', 'ongoing', 'archived']),
  featured: z.boolean().default(false),
  order: z.number().default(0),
})

const experienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  period: z.string(),
  role: z.string(),
  description: z.string(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
  })),
  order: z.number().default(0),
})

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  readingTime: z.number().optional(),
  draft: z.boolean().default(false),
})

export default defineContentConfig({
  collections: {
    projects_en: defineCollection({
      type: 'page',
      source: 'en/projects/**/*.md',
      schema: projectSchema,
    }),
    projects_es: defineCollection({
      type: 'page',
      source: 'es/projects/**/*.md',
      schema: projectSchema,
    }),
    experience_en: defineCollection({
      type: 'page',
      source: 'en/experience/**/*.md',
      schema: experienceSchema,
    }),
    experience_es: defineCollection({
      type: 'page',
      source: 'es/experience/**/*.md',
      schema: experienceSchema,
    }),
    blog_en: defineCollection({
      type: 'page',
      source: 'en/blog/**/*.md',
      schema: blogSchema,
    }),
    blog_es: defineCollection({
      type: 'page',
      source: 'es/blog/**/*.md',
      schema: blogSchema,
    }),
  },
})