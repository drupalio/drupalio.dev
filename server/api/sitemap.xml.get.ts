import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://drupalio.dev'

  const staticRoutes = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/blog', priority: 0.8, changefreq: 'weekly' },
  ]

  const projectRoutes: Array<{ loc: string; priority: number; changefreq: string }> = []
  const blogRoutes: Array<{ loc: string; priority: number; changefreq: string }> = []

  try {
    const enProjects = await queryCollection(event, 'projects_en').all()
    const esProjects = await queryCollection(event, 'projects_es').all()
    for (const p of enProjects) {
      const path = p.path?.replace(/^\/en/, '') || ''
      if (path) projectRoutes.push({ loc: path, priority: 0.7, changefreq: 'monthly' })
    }
    for (const p of esProjects) {
      const path = p.path?.replace(/^\/es/, '/es') || ''
      if (path) projectRoutes.push({ loc: path, priority: 0.6, changefreq: 'monthly' })
    }

    const enBlog = await queryCollection(event, 'blog_en').where('draft', '=', false).all()
    const esBlog = await queryCollection(event, 'blog_es').where('draft', '=', false).all()
    for (const b of enBlog) {
      const path = b.path?.replace(/^\/en/, '') || ''
      if (path) blogRoutes.push({ loc: path, priority: 0.6, changefreq: 'monthly' })
    }
    for (const b of esBlog) {
      const path = b.path?.replace(/^\/es/, '/es') || ''
      if (path) blogRoutes.push({ loc: path, priority: 0.5, changefreq: 'monthly' })
    }
  } catch (e) {
    console.error('Sitemap query error:', e)
  }

  const allRoutes = [...staticRoutes, ...projectRoutes, ...blogRoutes]

  const urls = allRoutes
    .filter((r) => r.loc)
    .map((r) => `  <url>\n    <loc>${baseUrl}${r.loc}</loc>\n    <priority>${r.priority}</priority>\n    <changefreq>${r.changefreq}</changefreq>\n  </url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml')
  return xml
})