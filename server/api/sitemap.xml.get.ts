import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://drupalio.dev'

  type Route = { loc: string, priority: number, changefreq: string }
  const routes = new Map<string, Route>()
  const add = (route: Route) => {
    const prev = routes.get(route.loc)
    if (!prev || prev.priority < route.priority) routes.set(route.loc, route)
  }

  add({ loc: '/', priority: 1.0, changefreq: 'weekly' })
  add({ loc: '/blog', priority: 0.8, changefreq: 'weekly' })

  // Both locales share one URL (language is a cookie), so the /en and /es
  // prefixes are stripped and duplicates collapse into a single entry.
  try {
    const [enProjects, esProjects, enBlog, esBlog] = await Promise.all([
      queryCollection(event, 'projects_en').all(),
      queryCollection(event, 'projects_es').all(),
      queryCollection(event, 'blog_en').where('draft', '=', false).all(),
      queryCollection(event, 'blog_es').where('draft', '=', false).all(),
    ])

    for (const p of [...enProjects, ...esProjects]) {
      const loc = p.path?.replace(/^\/(en|es)/, '') || ''
      if (loc) add({ loc, priority: 0.7, changefreq: 'monthly' })
    }
    for (const b of [...enBlog, ...esBlog]) {
      const loc = b.path?.replace(/^\/(en|es)/, '') || ''
      if (loc) add({ loc, priority: 0.6, changefreq: 'monthly' })
    }
  } catch (e) {
    console.error('Sitemap query error:', e)
  }

  const urls = [...routes.values()]
    .map((r) => `  <url>\n    <loc>${baseUrl}${r.loc}</loc>\n    <priority>${r.priority}</priority>\n    <changefreq>${r.changefreq}</changefreq>\n  </url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml')
  return xml
})
