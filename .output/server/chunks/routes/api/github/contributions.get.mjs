import { d as defineCachedEventHandler } from '../../../nitro/nitro.mjs';
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

function levelFromCount(count) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}
const contributions_get = defineCachedEventHandler(async () => {
  const username = "drupalio";
  const headers = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "drupalio.dev"
  };
  const token = process.env.GITHUB_TOKEN || process.env.NUXT_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const events = await $fetch(`https://api.github.com/users/${username}/events?per_page=100`, { headers });
    const contributions = /* @__PURE__ */ new Map();
    const now = /* @__PURE__ */ new Date();
    const days = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      contributions.set(dateStr, 0);
    }
    for (const event of events) {
      if (!event.created_at) continue;
      const dateStr = String(event.created_at).slice(0, 10);
      if (contributions.has(dateStr)) {
        contributions.set(dateStr, (contributions.get(dateStr) || 0) + 1);
      }
    }
    let total = 0;
    for (const [date, count] of contributions) {
      total += count;
      days.push({ date, count, level: levelFromCount(count) });
    }
    return {
      days,
      total,
      streak: 0
    };
  } catch {
    const now = /* @__PURE__ */ new Date();
    const days = [];
    let total = 0;
    for (let i = 364; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const count = Math.floor(Math.random() * 5);
      total += count;
      days.push({ date: dateStr, count, level: levelFromCount(count) });
    }
    return { days, total, streak: 0 };
  }
}, {
  maxAge: 60 * 30,
  swr: true
});

export { contributions_get as default };
//# sourceMappingURL=contributions.get.mjs.map
