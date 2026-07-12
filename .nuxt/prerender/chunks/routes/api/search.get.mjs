import { defineEventHandler } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';
import { a as queryCollectionSearchSections } from '../../nitro/nitro.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/minimark@0.2.0/node_modules/minimark/dist/hast.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/@iconify+utils@2.3.0/node_modules/@iconify/utils/lib/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import 'node:module';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/db0@0.3.4_better-sqlite3@12.11.1/node_modules/db0/dist/connectors/better-sqlite3.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/ipx@2.1.1_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1_srvx@0.11.21/node_modules/ipx/dist/index.mjs';

const search_get = defineEventHandler(async (event) => {
  try {
    const sections = await queryCollectionSearchSections(event, "blog_en");
    return sections;
  } catch {
    return [];
  }
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
