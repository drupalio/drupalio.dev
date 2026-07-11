import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://drupalio.dev'

  let posts: Array<{
    title: string
    description: string
    date: string
    path: string
  }> = []

  try {
    const enBlog = await queryCollection(event, 'blog_en')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .all()

    posts = enBlog.map((b) => ({
      title: b.title,
      description: b.description,
      date: b.date,
      path: b.path?.replace(/^\/en/, '') || '',
    }))
  } catch {
    // fallback
  }

  const items = posts
    .map((p) => `    <item>
      <title>${p.title}</title>
      <description>${p.description}</description>
      <link>${baseUrl}${p.path}</link>
      <guid>${baseUrl}${p.path}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ricardo Morales — Writing</title>
    <description>Thoughts on microservices, AI engineering, and building resilient systems.</description>
    <link>${baseUrl}/blog</link>
    <language>en</language>
${items}
  </channel>
</rss>`

  setResponseHeader(event, 'Content-Type', 'application/rss+xml')
  return xml
})