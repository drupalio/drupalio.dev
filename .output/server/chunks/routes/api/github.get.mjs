import { d as defineCachedEventHandler } from '../../nitro/nitro.mjs';
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

const github_get = defineCachedEventHandler(async () => {
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
    const res = await $fetch(`https://api.github.com/users/${username}`, { headers });
    return {
      username: res.login,
      publicRepos: res.public_repos,
      followers: res.followers,
      following: res.following,
      createdAt: res.created_at,
      avatarUrl: res.avatar_url
    };
  } catch {
    return {
      username: "drupalio",
      publicRepos: 47,
      followers: 12,
      following: 8,
      createdAt: "2013-03-01T00:00:00Z",
      avatarUrl: "https://avatars.githubusercontent.com/u/5186093"
    };
  }
}, {
  maxAge: 60 * 60,
  swr: true
});

export { github_get as default };
//# sourceMappingURL=github.get.mjs.map
