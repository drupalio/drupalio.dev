import { _ as _sfc_main$2 } from './SectionLabel-DTsiWQLU.mjs';
import { u as useNuxtApp, f as __nuxt_component_0$1, _ as __nuxt_component_1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useContentQueries } from './useContentQueries-cBSYek9c.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FeaturedProjectCard",
  __ssrInlineRender: true,
  props: {
    project: {},
    layout: {},
    index: {}
  },
  setup(__props) {
    const props = __props;
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => {
      var _a, _b;
      return ((_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.locale) == null ? void 0 : _b.value) || "en";
    });
    const labels = computed(() => ({
      challenge: currentLocale.value === "en" ? "Challenge" : "Reto",
      stack: currentLocale.value === "en" ? "Stack" : "Stack",
      view: currentLocale.value === "en" ? "View case study" : "Ver caso"
    }));
    const stack = computed(() => props.project.stack || props.project.technologies || []);
    const href = computed(() => {
      if (!props.project.path) return "#";
      return props.project.path.replace(/^\/(en|es)\//, "/");
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["bento-card flex flex-col gap-4 p-6 transition-all duration-200 hover:border-accent/30", {
          "lg:col-span-2": __props.layout === "wide",
          "lg:row-span-2": __props.layout === "tall"
        }]
      }, _attrs))}><div class="flex items-center justify-between"><span class="font-mono text-xs text-text-muted tabular-nums">0${ssrInterpolate(__props.index + 1)}</span><div class="flex flex-wrap gap-1"><!--[-->`);
      ssrRenderList(unref(stack).slice(0, __props.layout === "compact" ? 3 : 5), (tech) => {
        _push(`<span class="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-muted">${ssrInterpolate(tech)}</span>`);
      });
      _push(`<!--]--></div></div><h3 class="${ssrRenderClass([{
        "text-xl": __props.layout === "compact",
        "text-2xl": __props.layout === "wide" || __props.layout === "tall"
      }, "text-balance font-medium tracking-tight text-text"])}">${ssrInterpolate(__props.project.title)}</h3><p class="${ssrRenderClass([{ "flex-1": __props.layout === "tall" }, "text-balance text-sm leading-relaxed text-text-muted"])}">${ssrInterpolate(__props.project.description)}</p>`);
      if (__props.layout !== "compact" && ((_a = __props.project.metrics) == null ? void 0 : _a.length)) {
        _push(`<div class="flex gap-6"><!--[-->`);
        ssrRenderList(__props.project.metrics, (metric) => {
          _push(`<div class="flex flex-col gap-0.5"><span class="text-lg font-semibold text-text">${ssrInterpolate(metric.value)}</span><span class="font-mono text-[10px] uppercase tracking-wider text-text-muted">${ssrInterpolate(metric.label)}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(href),
        class: "inline-flex items-center gap-1 text-sm text-accent transition-colors duration-150 hover:text-accent/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              size: "14"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(labels).view)}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:arrow-right",
                size: "14"
              }),
              createTextVNode(" " + toDisplayString(unref(labels).view), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/FeaturedProjectCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FeaturedProjects",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { featuredProjects } = useContentQueries();
    const { data: projects } = ([__temp, __restore] = withAsyncContext(() => featuredProjects()), __temp = await __temp, __restore(), __temp);
    const layouts = ["wide", "tall", "compact", "compact"];
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => {
      var _a, _b;
      return ((_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.locale) == null ? void 0 : _b.value) || "en";
    });
    const sectionTitle = computed(
      () => currentLocale.value === "en" ? "Featured Projects" : "Proyectos Destacados"
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_SectionLabel = _sfc_main$2;
      const _component_FeaturedProjectCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "03",
        label: unref(sectionTitle)
      }, null, _parent));
      if ((_a = unref(projects)) == null ? void 0 : _a.length) {
        _push(`<div class="grid grid-cols-1 gap-4 lg:grid-cols-2"><!--[-->`);
        ssrRenderList(unref(projects), (project, index) => {
          _push(ssrRenderComponent(_component_FeaturedProjectCard, {
            key: project.path || project.title,
            project,
            index,
            layout: layouts[index] || "compact"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/FeaturedProjects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=FeaturedProjects-Dx6cXO_3.mjs.map
