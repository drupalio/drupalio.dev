import { u as useContentQueries, _ as _sfc_main$1 } from './useContentQueries-cBSYek9c.mjs';
import { u as useNuxtApp, b as useSeoMeta, d as _sfc_main$3, f as __nuxt_component_0$1, e as _sfc_main$2$1 } from './server.mjs';
import { _ as _sfc_main$2 } from './SectionLabel-DTsiWQLU.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
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
import 'vue-router';
import 'vue-i18n';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { allBlogPosts } = useContentQueries();
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => allBlogPosts()), __temp = await __temp, __restore(), __temp);
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => {
      var _a, _b;
      return ((_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.locale) == null ? void 0 : _b.value) || "en";
    });
    const sectionTitle = computed(
      () => currentLocale.value === "en" ? "Writing" : "Escritos"
    );
    useSeoMeta({
      title: "Writing \u2014 Ricardo Morales",
      description: "Thoughts on microservices, AI engineering, and building resilient systems."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScrollProgress = _sfc_main$1;
      const _component_AppHeader = _sfc_main$3;
      const _component_SectionLabel = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ScrollProgress, null, null, _parent));
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main class="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:px-8"><div class="mb-12 flex flex-col gap-4">`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "",
        label: unref(sectionTitle)
      }, null, _parent));
      _push(`<h1 class="text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">${ssrInterpolate(unref(currentLocale) === "en" ? "Engineering deep dives, not hot takes." : "An\xE1lisis t\xE9cnico, no opiniones.")}</h1></div><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(unref(posts), (post) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: post.path,
          to: post.path.replace(/^\/(en|es)\//, "/"),
          class: "group flex flex-col gap-1 border-b border-border py-4 transition-colors duration-150 hover:border-accent/30"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`<div class="flex items-baseline justify-between gap-4"${_scopeId}><h2 class="text-balance text-lg font-medium text-text transition-colors duration-150 group-hover:text-accent"${_scopeId}>${ssrInterpolate(post.title)}</h2><span class="font-mono text-xs text-text-muted tabular-nums"${_scopeId}>${ssrInterpolate(post.date)}</span></div><p class="text-balance text-sm leading-relaxed text-text-muted"${_scopeId}>${ssrInterpolate(post.description)}</p>`);
              if ((_a = post.tags) == null ? void 0 : _a.length) {
                _push2(`<div class="mt-1 flex flex-wrap gap-1"${_scopeId}><!--[-->`);
                ssrRenderList(post.tags, (tag) => {
                  _push2(`<span class="font-mono text-[10px] uppercase tracking-wider text-text-muted"${_scopeId}> #${ssrInterpolate(tag)}</span>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "flex items-baseline justify-between gap-4" }, [
                  createVNode("h2", { class: "text-balance text-lg font-medium text-text transition-colors duration-150 group-hover:text-accent" }, toDisplayString(post.title), 1),
                  createVNode("span", { class: "font-mono text-xs text-text-muted tabular-nums" }, toDisplayString(post.date), 1)
                ]),
                createVNode("p", { class: "text-balance text-sm leading-relaxed text-text-muted" }, toDisplayString(post.description), 1),
                ((_b = post.tags) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-1 flex flex-wrap gap-1"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(post.tags, (tag) => {
                    return openBlock(), createBlock("span", {
                      key: tag,
                      class: "font-mono text-[10px] uppercase tracking-wider text-text-muted"
                    }, " #" + toDisplayString(tag), 1);
                  }), 128))
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-kLdzkazc.mjs.map
