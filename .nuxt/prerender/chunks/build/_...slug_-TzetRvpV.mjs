import { u as useContentQueries, _ as _sfc_main$1 } from './useContentQueries-cBSYek9c.mjs';
import { _ as _sfc_main$2, a as _sfc_main$4 } from './ContentRenderer-DK56Eka6.mjs';
import { g as useRoute, h as createError, u as useNuxtApp, b as useSeoMeta, d as _sfc_main$3, f as __nuxt_component_0$1, _ as __nuxt_component_1, e as _sfc_main$2$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue@3.5.39_typescript@5.9.3/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue@3.5.39_typescript@5.9.3/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/minimark@0.2.0/node_modules/minimark/dist/hast.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_better-sqlite3@12.11.1__ioredis@5.11.1/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs';
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
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue-router@4.6.4_vue@3.5.39_typescript@5.9.3_/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/cookie-es@2.0.1/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue-i18n@11.4.6_vue@3.5.39_typescript@5.9.3_/node_modules/vue-i18n/dist/vue-i18n.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/perfect-debounce@2.1.0/node_modules/perfect-debounce/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue-bundle-renderer@2.3.1/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unhead@2.1.15/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/devalue@5.8.1/node_modules/devalue/index.js';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unhead@2.1.15/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/unhead@2.1.15/node_modules/unhead/dist/utils.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { blogPostBySlug } = useContentQueries();
    const { data: post } = ([__temp, __restore] = withAsyncContext(() => blogPostBySlug(route.path)), __temp = await __temp, __restore(), __temp);
    if (!post.value) {
      throw createError({ statusCode: 404, statusMessage: "Post not found" });
    }
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => {
      var _a, _b;
      return ((_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.locale) == null ? void 0 : _b.value) || "en";
    });
    useSeoMeta({
      title: () => {
        var _a;
        return `${(_a = post.value) == null ? void 0 : _a.title} \u2014 Ricardo Morales`;
      },
      description: () => {
        var _a;
        return (_a = post.value) == null ? void 0 : _a.description;
      },
      ogTitle: () => {
        var _a;
        return `${(_a = post.value) == null ? void 0 : _a.title} \u2014 Ricardo Morales`;
      },
      ogDescription: () => {
        var _a;
        return (_a = post.value) == null ? void 0 : _a.description;
      },
      ogType: "article"
    });
    const backLabel = computed(
      () => currentLocale.value === "en" ? "Back to writing" : "Volver a escritos"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScrollProgress = _sfc_main$1;
      const _component_ReadingProgress = _sfc_main$2;
      const _component_AppHeader = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1;
      const _component_ContentRenderer = _sfc_main$4;
      const _component_AppFooter = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ScrollProgress, null, null, _parent));
      _push(ssrRenderComponent(_component_ReadingProgress, null, null, _parent));
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main class="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:px-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors duration-150 hover:text-text"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-left",
              size: "14"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(backLabel))}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:arrow-left",
                size: "14"
              }),
              createTextVNode(" " + toDisplayString(unref(backLabel)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(post)) {
        _push(`<article class="flex flex-col gap-6"><header class="flex flex-col gap-4"><div class="flex flex-wrap gap-1.5"><!--[-->`);
        ssrRenderList(unref(post).tags, (tag) => {
          _push(`<span class="font-mono text-[10px] uppercase tracking-wider text-text-muted"> #${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><h1 class="text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">${ssrInterpolate(unref(post).title)}</h1><p class="text-balance text-lg leading-relaxed text-text-muted">${ssrInterpolate(unref(post).description)}</p><div class="flex items-center gap-3 text-sm text-text-muted"><span class="font-mono tabular-nums">${ssrInterpolate(unref(post).date)}</span>`);
        if (unref(post).readingTime) {
          _push(`<span class="text-border">\xB7</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(post).readingTime) {
          _push(`<span>${ssrInterpolate(unref(post).readingTime)} min read</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></header><div class="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-headings:font-semibold prose-headings:text-text prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-accent prose-code:font-mono prose-code:text-sm prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-surface prose-pre:border prose-pre:border-border">`);
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(post) }, null, _parent));
        _push(`</div></article>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-TzetRvpV.mjs.map
