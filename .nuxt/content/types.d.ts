import type { PageCollectionItemBase, DataCollectionItemBase } from '@nuxt/content'

declare module '@nuxt/content' {
   interface ProjectsEnCollectionItem extends PageCollectionItemBase {
    title: string
    description: string
    company: string
    role: string
    period: string
    category: ("banking" | "ai" | "fintech" | "media" | "infrastructure" | "enterprise")
    stack: string[]
    metrics?: {
    label: string
    value: string
    }[]
    challenge: string
    architecture: string
    results: string
    status: ("shipped" | "ongoing" | "archived")
    featured?: boolean
    order?: number
  }
  
   interface ProjectsEsCollectionItem extends PageCollectionItemBase {
    title: string
    description: string
    company: string
    role: string
    period: string
    category: ("banking" | "ai" | "fintech" | "media" | "infrastructure" | "enterprise")
    stack: string[]
    metrics?: {
    label: string
    value: string
    }[]
    challenge: string
    architecture: string
    results: string
    status: ("shipped" | "ongoing" | "archived")
    featured?: boolean
    order?: number
  }
  
   interface ExperienceEnCollectionItem extends PageCollectionItemBase {
    title: string
    company: string
    period: string
    role: string
    description: string
    projects: {
    name: string
    description: string
    technologies: string[]
    }[]
    order?: number
  }
  
   interface ExperienceEsCollectionItem extends PageCollectionItemBase {
    title: string
    company: string
    period: string
    role: string
    description: string
    projects: {
    name: string
    description: string
    technologies: string[]
    }[]
    order?: number
  }
  
   interface BlogEnCollectionItem extends PageCollectionItemBase {
    title: string
    description: string
    date: string
    tags?: string[]
    readingTime?: number
    draft?: boolean
  }
  
   interface BlogEsCollectionItem extends PageCollectionItemBase {
    title: string
    description: string
    date: string
    tags?: string[]
    readingTime?: number
    draft?: boolean
  }
  

  interface PageCollections {
    projects_en: ProjectsEnCollectionItem
    projects_es: ProjectsEsCollectionItem
    experience_en: ExperienceEnCollectionItem
    experience_es: ExperienceEsCollectionItem
    blog_en: BlogEnCollectionItem
    blog_es: BlogEsCollectionItem
  }

  interface Collections {
    projects_en: ProjectsEnCollectionItem
    projects_es: ProjectsEsCollectionItem
    experience_en: ExperienceEnCollectionItem
    experience_es: ExperienceEsCollectionItem
    blog_en: BlogEnCollectionItem
    blog_es: BlogEsCollectionItem
  }
}
