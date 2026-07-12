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
  __name: "SoftSkillsCloud",
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
    const softSkills = computed(() => {
      const data = tm("softSkills");
      return Array.isArray(data) ? data : [];
    });
    const sectionTitle = computed(
      () => currentLocale.value === "en" ? "Soft Skills" : "Habilidades Blandas"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionLabel = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "08",
        label: unref(sectionTitle)
      }, null, _parent));
      _push(`<div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(softSkills), (skill) => {
        _push(`<span class="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm text-text-muted transition-colors duration-150 hover:border-accent/30 hover:text-text">${ssrInterpolate(skill.name)}</span>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/SoftSkillsCloud.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SoftSkillsCloud-D5_UCv5e.mjs.map
