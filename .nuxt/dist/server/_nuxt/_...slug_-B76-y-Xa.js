import { u as useContentQueries, _ as _sfc_main$1 } from "./useContentQueries-cBSYek9c.js";
import { _ as _sfc_main$2, a as _sfc_main$5 } from "./ContentRenderer-DK56Eka6.js";
import { g as useRoute, h as createError, u as useNuxtApp, b as useSeoMeta, d as _sfc_main$3, f as __nuxt_component_0, _ as __nuxt_component_1, e as _sfc_main$6 } from "../server.mjs";
import { _ as _sfc_main$4 } from "./SectionLabel-DTsiWQLU.js";
import { defineComponent, computed, withAsyncContext, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/cookie-es@2.0.1/node_modules/cookie-es/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/@unhead+vue@2.1.15_vue@3.5.39_typescript@5.9.3_/node_modules/@unhead/vue/dist/index.mjs";
import "vue-i18n";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/perfect-debounce@2.1.0/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { projectBySlug } = useContentQueries();
    const slug = computed(() => route.path);
    const { data: project } = ([__temp, __restore] = withAsyncContext(() => projectBySlug(slug.value)), __temp = await __temp, __restore(), __temp);
    if (!project.value) {
      throw createError({ statusCode: 404, statusMessage: "Project not found" });
    }
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => $i18n?.global?.locale?.value || "en");
    useSeoMeta({
      title: () => `${project.value?.title} — Ricardo Morales`,
      description: () => project.value?.description,
      ogTitle: () => `${project.value?.title} — Ricardo Morales`,
      ogDescription: () => project.value?.description,
      ogType: "website"
    });
    const labels = computed(() => ({
      challenge: currentLocale.value === "en" ? "Challenge" : "Reto",
      architecture: currentLocale.value === "en" ? "Architecture" : "Arquitectura",
      results: currentLocale.value === "en" ? "Results" : "Resultados",
      stack: currentLocale.value === "en" ? "Stack" : "Stack",
      metrics: currentLocale.value === "en" ? "Metrics" : "Métricas",
      back: currentLocale.value === "en" ? "Back to home" : "Volver al inicio"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScrollProgress = _sfc_main$1;
      const _component_ReadingProgress = _sfc_main$2;
      const _component_AppHeader = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_SectionLabel = _sfc_main$4;
      const _component_ContentRenderer = _sfc_main$5;
      const _component_AppFooter = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ScrollProgress, null, null, _parent));
      _push(ssrRenderComponent(_component_ReadingProgress, null, null, _parent));
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main class="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:px-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors duration-150 hover:text-text"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-left",
              size: "14"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(labels).back)}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:arrow-left",
                size: "14"
              }),
              createTextVNode(" " + toDisplayString(unref(labels).back), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(project)) {
        _push(`<article class="flex flex-col gap-8"><header class="flex flex-col gap-4"><div class="flex flex-wrap gap-1.5"><!--[-->`);
        ssrRenderList(unref(project).stack, (tech) => {
          _push(`<span class="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-muted">${ssrInterpolate(tech)}</span>`);
        });
        _push(`<!--]--></div><h1 class="text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">${ssrInterpolate(unref(project).title)}</h1><p class="text-balance text-lg leading-relaxed text-text-muted">${ssrInterpolate(unref(project).description)}</p><div class="flex flex-wrap items-center gap-4 text-sm text-text-muted"><span>${ssrInterpolate(unref(project).company)}</span><span class="text-border">·</span><span>${ssrInterpolate(unref(project).role)}</span><span class="text-border">·</span><span class="font-mono tabular-nums">${ssrInterpolate(unref(project).period)}</span></div></header>`);
        if (unref(project).metrics?.length) {
          _push(`<section class="grid grid-cols-2 gap-4 sm:grid-cols-4"><!--[-->`);
          ssrRenderList(unref(project).metrics, (metric) => {
            _push(`<div class="bento-card p-4"><p class="text-2xl font-semibold text-text">${ssrInterpolate(metric.value)}</p><p class="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">${ssrInterpolate(metric.label)}</p></div>`);
          });
          _push(`<!--]--></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).challenge) {
          _push(`<section class="flex flex-col gap-3">`);
          _push(ssrRenderComponent(_component_SectionLabel, {
            number: "01",
            label: unref(labels).challenge
          }, null, _parent));
          _push(`<p class="text-balance text-base leading-relaxed text-text-muted">${ssrInterpolate(unref(project).challenge)}</p></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).architecture) {
          _push(`<section class="flex flex-col gap-3">`);
          _push(ssrRenderComponent(_component_SectionLabel, {
            number: "02",
            label: unref(labels).architecture
          }, null, _parent));
          _push(`<p class="text-balance text-base leading-relaxed text-text-muted">${ssrInterpolate(unref(project).architecture)}</p></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).results) {
          _push(`<section class="flex flex-col gap-3">`);
          _push(ssrRenderComponent(_component_SectionLabel, {
            number: "03",
            label: unref(labels).results
          }, null, _parent));
          _push(`<p class="text-balance text-base leading-relaxed text-text-muted">${ssrInterpolate(unref(project).results)}</p></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).body) {
          _push(`<section class="prose prose-neutral max-w-none dark:prose-invert">`);
          _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(project) }, null, _parent));
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_...slug_-B76-y-Xa.js.map
