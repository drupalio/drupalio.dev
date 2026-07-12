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

const sitemap_xml_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const baseUrl = "https://drupalio.dev";
  const staticRoutes = [
    { loc: "/", priority: 1, changefreq: "weekly" },
    { loc: "/blog", priority: 0.8, changefreq: "weekly" }
  ];
  const projectRoutes = [];
  const blogRoutes = [];
  try {
    const enProjects = await queryCollection(event, "projects_en").all();
    const esProjects = await queryCollection(event, "projects_es").all();
    for (const p of enProjects) {
      const path = ((_a = p.path) == null ? void 0 : _a.replace(/^\/en/, "")) || "";
      if (path) projectRoutes.push({ loc: path, priority: 0.7, changefreq: "monthly" });
    }
    for (const p of esProjects) {
      const path = ((_b = p.path) == null ? void 0 : _b.replace(/^\/es/, "/es")) || "";
      if (path) projectRoutes.push({ loc: path, priority: 0.6, changefreq: "monthly" });
    }
    const enBlog = await queryCollection(event, "blog_en").where("draft", "=", false).all();
    const esBlog = await queryCollection(event, "blog_es").where("draft", "=", false).all();
    for (const b of enBlog) {
      const path = ((_c = b.path) == null ? void 0 : _c.replace(/^\/en/, "")) || "";
      if (path) blogRoutes.push({ loc: path, priority: 0.6, changefreq: "monthly" });
    }
    for (const b of esBlog) {
      const path = ((_d = b.path) == null ? void 0 : _d.replace(/^\/es/, "/es")) || "";
      if (path) blogRoutes.push({ loc: path, priority: 0.5, changefreq: "monthly" });
    }
  } catch (e) {
    console.error("Sitemap query error:", e);
  }
  const allRoutes = [...staticRoutes, ...projectRoutes, ...blogRoutes];
  const urls = allRoutes.filter((r) => r.loc).map((r) => `  <url>
    <loc>${baseUrl}${r.loc}</loc>
    <priority>${r.priority}</priority>
    <changefreq>${r.changefreq}</changefreq>
  </url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  setResponseHeader(event, "Content-Type", "application/xml");
  return xml;
});

export { sitemap_xml_get as default };
//# sourceMappingURL=sitemap.xml.get.mjs.map
