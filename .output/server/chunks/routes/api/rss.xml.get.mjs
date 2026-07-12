import { a as defineEventHandler, q as queryCollection, s as setResponseHeader } from '../../nitro/nitro.mjs';
import 'minimark/hast';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'node:module';
import 'better-sqlite3';
import 'ipx';

const rss_xml_get = defineEventHandler(async (event) => {
  const baseUrl = "https://drupalio.dev";
  let posts = [];
  try {
    const enBlog = await queryCollection(event, "blog_en").where("draft", "=", false).order("date", "DESC").all();
    posts = enBlog.map((b) => {
      var _a;
      return {
        title: b.title,
        description: b.description,
        date: b.date,
        path: ((_a = b.path) == null ? void 0 : _a.replace(/^\/en/, "")) || ""
      };
    });
  } catch {
  }
  const items = posts.map((p) => `    <item>
      <title>${p.title}</title>
      <description>${p.description}</description>
      <link>${baseUrl}${p.path}</link>
      <guid>${baseUrl}${p.path}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ricardo Morales \u2014 Writing</title>
    <description>Thoughts on microservices, AI engineering, and building resilient systems.</description>
    <link>${baseUrl}/blog</link>
    <language>en</language>
${items}
  </channel>
</rss>`;
  setResponseHeader(event, "Content-Type", "application/rss+xml");
  return xml;
});

export { rss_xml_get as default };
//# sourceMappingURL=rss.xml.get.mjs.map
