import { queryCollectionSearchSections } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  try {
    const sections = await queryCollectionSearchSections(event, 'blog_en')
    return sections
  } catch {
    return []
  }
})