import { a as defineEventHandler, b as queryCollectionSearchSections } from '../../nitro/nitro.mjs';
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
