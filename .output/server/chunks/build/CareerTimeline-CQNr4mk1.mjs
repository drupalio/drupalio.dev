import { _ as _sfc_main$1 } from './SectionLabel-DTsiWQLU.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useNuxtApp } from './server.mjs';
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
  __name: "CareerTimeline",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const tm = (key) => {
      var _a, _b;
      return (_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.tm(key)) != null ? _b : [];
    };
    const currentLocale = computed(() => {
      var _a, _b;
      return ((_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.locale) == null ? void 0 : _b.value) || "en";
    });
    const workExperience = computed(() => {
      const data = tm("workExperience");
      return Array.isArray(data) ? data : [];
    });
    const sectionTitle = computed(
      () => currentLocale.value === "en" ? "Career Timeline" : "Trayectoria"
    );
    function yearFromPeriod(period) {
      if (!period) return "";
      const match = period.match(/(\d{4})/);
      return match ? match[1] : "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionLabel = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "07",
        label: unref(sectionTitle)
      }, null, _parent));
      _push(`<div class="relative flex items-center gap-4 overflow-x-auto pb-2"><!--[-->`);
      ssrRenderList(unref(workExperience), (job, index) => {
        _push(`<div class="flex min-w-[180px] flex-col gap-1"><div class="flex items-center gap-2"><span class="font-mono text-sm font-medium text-accent tabular-nums">${ssrInterpolate(yearFromPeriod(job.period))}</span>`);
        if (index < unref(workExperience).length - 1) {
          _push(`<div class="h-px flex-1 bg-border"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-sm font-medium text-text">${ssrInterpolate(job.company)}</p><p class="text-xs text-text-muted">${ssrInterpolate(job.title)}</p></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/CareerTimeline.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CareerTimeline-CQNr4mk1.mjs.map
