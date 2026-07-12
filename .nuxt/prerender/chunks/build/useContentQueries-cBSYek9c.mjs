import { defineComponent, ref, mergeProps, unref, computed, useSSRContext } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue@3.5.39_typescript@5.9.3/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderStyle } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue@3.5.39_typescript@5.9.3/node_modules/vue/server-renderer/index.mjs';
import { a as useLanguage, j as useAsyncData, t as tryUseNuxtApp } from './server.mjs';
import { withoutTrailingSlash } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import { getRequestHeaders } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollProgress",
  __ssrInlineRender: true,
  setup(__props) {
    const progress = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" }, _attrs))}><div class="h-full bg-accent transition-[width] duration-75 ease-out" style="${ssrRenderStyle({ width: `${unref(progress)}%` })}"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/ScrollProgress.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const checksums = {
  "projects_en": "v3.5.0--UlpX9U-jdpGlxkf5pEV1CLZuv1_jY44EMwsCHiexjKQ",
  "projects_es": "v3.5.0--H2gdYnYUInZD8pDc1Acxqgi6h1tZF9vzuoG3ySNUqP4",
  "experience_en": "v3.5.0--eqBLU0TP01vx1ziOit0Iwsbe9IxkNnkYwpWoqu-ED20",
  "experience_es": "v3.5.0--RiVQuHazpesppi9tsfWpfBlHTVtFDsrVPavV_FCX5-o",
  "blog_en": "v3.5.0--kbDsqWvATbWtUDJvSX8S0zrZWHlODQIGe_-LaxxN9vA",
  "blog_es": "v3.5.0--OAPZf29Mir4syZxI16fhYfje4upl6fPhGMvmjF6DYYM"
};
const tables = {
  "projects_en": "_content_projects_en",
  "projects_es": "_content_projects_es",
  "experience_en": "_content_experience_en",
  "experience_es": "_content_experience_es",
  "blog_en": "_content_blog_en",
  "blog_es": "_content_blog_es",
  "info": "_content_info"
};
const buildGroup = (group, type) => {
  const conditions = group._conditions;
  return conditions.length > 0 ? `(${conditions.join(` ${type} `)})` : "";
};
const collectionQueryGroup = (collection) => {
  const conditions = [];
  const query = {
    // @ts-expect-error -- internal
    _conditions: conditions,
    where(field, operator, value) {
      let condition;
      switch (operator.toUpperCase()) {
        case "IN":
        case "NOT IN":
          if (Array.isArray(value)) {
            const values = value.map((val) => singleQuote(val)).join(", ");
            condition = `"${String(field)}" ${operator.toUpperCase()} (${values})`;
          } else {
            throw new TypeError(`Value for ${operator} must be an array`);
          }
          break;
        case "BETWEEN":
        case "NOT BETWEEN":
          if (Array.isArray(value) && value.length === 2) {
            condition = `"${String(field)}" ${operator.toUpperCase()} ${singleQuote(value[0])} AND ${singleQuote(value[1])}`;
          } else {
            throw new Error(`Value for ${operator} must be an array with two elements`);
          }
          break;
        case "IS NULL":
        case "IS NOT NULL":
          condition = `"${String(field)}" ${operator.toUpperCase()}`;
          break;
        case "LIKE":
        case "NOT LIKE":
          condition = `"${String(field)}" ${operator.toUpperCase()} ${singleQuote(value)}`;
          break;
        default:
          condition = `"${String(field)}" ${operator} ${singleQuote(typeof value === "boolean" ? Number(value) : value)}`;
      }
      conditions.push(`${condition}`);
      return query;
    },
    andWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      conditions.push(buildGroup(group, "AND"));
      return query;
    },
    orWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      conditions.push(buildGroup(group, "OR"));
      return query;
    }
  };
  return query;
};
const collectionQueryBuilder = (collection, fetch) => {
  const params = {
    conditions: [],
    selectedFields: [],
    offset: 0,
    limit: 0,
    orderBy: [],
    // Count query
    count: {
      field: "",
      distinct: false
    }
  };
  const query = {
    // @ts-expect-error -- internal
    __params: params,
    andWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      params.conditions.push(buildGroup(group, "AND"));
      return query;
    },
    orWhere(groupFactory) {
      const group = groupFactory(collectionQueryGroup());
      params.conditions.push(buildGroup(group, "OR"));
      return query;
    },
    path(path) {
      return query.where("path", "=", withoutTrailingSlash(path));
    },
    skip(skip) {
      params.offset = skip;
      return query;
    },
    where(field, operator, value) {
      query.andWhere((group) => group.where(String(field), operator, value));
      return query;
    },
    limit(limit) {
      params.limit = limit;
      return query;
    },
    select(...fields) {
      if (fields.length) {
        params.selectedFields.push(...fields);
      }
      return query;
    },
    order(field, direction) {
      params.orderBy.push(`"${String(field)}" ${direction}`);
      return query;
    },
    async all() {
      return fetch(collection, buildQuery()).then((res) => res || []);
    },
    async first() {
      return fetch(collection, buildQuery({ limit: 1 })).then((res) => res[0] || null);
    },
    async count(field = "*", distinct = false) {
      return fetch(collection, buildQuery({
        count: { field: String(field), distinct }
      })).then((m) => m[0].count);
    }
  };
  function buildQuery(opts = {}) {
    let query2 = "SELECT ";
    if (opts == null ? void 0 : opts.count) {
      query2 += `COUNT(${opts.count.distinct ? "DISTINCT " : ""}${opts.count.field}) as count`;
    } else {
      const fields = Array.from(new Set(params.selectedFields));
      query2 += fields.length > 0 ? fields.map((f) => `"${String(f)}"`).join(", ") : "*";
    }
    query2 += ` FROM ${tables[String(collection)]}`;
    if (params.conditions.length > 0) {
      query2 += ` WHERE ${params.conditions.join(" AND ")}`;
    }
    if (params.orderBy.length > 0) {
      query2 += ` ORDER BY ${params.orderBy.join(", ")}`;
    } else {
      query2 += ` ORDER BY stem ASC`;
    }
    const limit = (opts == null ? void 0 : opts.limit) || params.limit;
    if (limit > 0) {
      if (params.offset > 0) {
        query2 += ` LIMIT ${limit} OFFSET ${params.offset}`;
      } else {
        query2 += ` LIMIT ${limit}`;
      }
    }
    return query2;
  }
  return query;
};
function singleQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}
async function fetchContent(event, collection, path, options) {
  const headers = event ? getRequestHeaders(event) : {};
  headers["accept-encoding"] = void 0;
  const url = `/__nuxt_content/${collection}/${path}`;
  const fetchOptions = {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    },
    query: { v: checksums[String(collection)], t: void 0 }
  };
  return event ? await event.$fetch(url, fetchOptions) : await $fetch(url, fetchOptions);
}
async function fetchQuery(event, collection, sql) {
  return fetchContent(event, collection, "query", {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: {
      sql
    }
  });
}
const queryCollection = (collection) => {
  var _a, _b;
  const event = (_b = (_a = tryUseNuxtApp()) == null ? void 0 : _a.ssrContext) == null ? void 0 : _b.event;
  return collectionQueryBuilder(collection, (collection2, sql) => executeContentQuery(event, collection2, sql));
};
async function executeContentQuery(event, collection, sql) {
  {
    return fetchQuery(event, String(collection), sql);
  }
}
const useContentQueries = () => {
  const { current } = useLanguage();
  const projectsCollection = computed(
    () => current.value === "es" ? "projects_es" : "projects_en"
  );
  const experienceCollection = computed(
    () => current.value === "es" ? "experience_es" : "experience_en"
  );
  const blogCollection = computed(
    () => current.value === "es" ? "blog_es" : "blog_en"
  );
  const featuredProjects = () => useAsyncData(`featured-projects-${current.value}`, async () => {
    const projects = await queryCollection(projectsCollection.value).where("order", ">=", 0).order("order", "ASC").all();
    return projects.filter((p) => p.featured);
  }, { watch: [current] });
  const allProjects = () => useAsyncData(`all-projects-${current.value}`, async () => {
    return await queryCollection(projectsCollection.value).where("order", ">=", 0).order("order", "ASC").all();
  }, { watch: [current] });
  const projectBySlug = (slug) => useAsyncData(`project-${current.value}-${slug}`, async () => {
    const cleanSlug = slug.replace(/^\/(en|es)\//, "/");
    const contentPath = `/${current.value}${cleanSlug === "/" ? "" : cleanSlug}`;
    return await queryCollection(projectsCollection.value).path(contentPath).first();
  }, { watch: [current] });
  const allExperience = () => useAsyncData(`experience-${current.value}`, async () => {
    return await queryCollection(experienceCollection.value).where("order", ">=", 0).order("order", "ASC").all();
  }, { watch: [current] });
  const allBlogPosts = () => useAsyncData(`blog-${current.value}`, async () => {
    return await queryCollection(blogCollection.value).where("draft", "=", false).order("date", "DESC").all();
  }, { watch: [current] });
  const blogPostBySlug = (slug) => useAsyncData(`blog-post-${current.value}-${slug}`, async () => {
    const cleanSlug = slug.replace(/^\/(en|es)\//, "/");
    const contentPath = `/${current.value}${cleanSlug === "/" ? "" : cleanSlug}`;
    return await queryCollection(blogCollection.value).path(contentPath).first();
  }, { watch: [current] });
  return {
    featuredProjects,
    allProjects,
    projectBySlug,
    allExperience,
    allBlogPosts,
    blogPostBySlug
  };
};

export { _sfc_main as _, useContentQueries as u };
//# sourceMappingURL=useContentQueries-cBSYek9c.mjs.map
