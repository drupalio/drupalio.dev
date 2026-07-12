import { _ as _sfc_main$1 } from './SectionLabel-DTsiWQLU.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "AILabCard",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => {
      var _a, _b;
      return ((_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.locale) == null ? void 0 : _b.value) || "en";
    });
    const items = computed(() => {
      var _a;
      const skills = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.tm("skills");
      if (!skills) return [];
      const aiSkills = skills.aiAndLLMs || skills.aiAndMls || [];
      return Array.isArray(aiSkills) ? aiSkills : [];
    });
    const sectionTitle = computed(
      () => currentLocale.value === "en" ? "AI Lab" : "Laboratorio de IA"
    );
    const codeSnippet = [
      { line: 1, content: "// AI exploration", muted: true },
      { line: 2, content: 'const prompt = "design resilient systems"', muted: false },
      { line: 3, content: "const output = await model.generate({", muted: false },
      { line: 4, content: "  prompt,", muted: false },
      { line: 5, content: "  temperature: 0.7,", muted: false },
      { line: 6, content: "  max_tokens: 2048,", muted: false },
      { line: 7, content: "})", muted: false }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionLabel = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "05",
        label: unref(sectionTitle)
      }, null, _parent));
      _push(`<div class="rounded-xl bg-[#0d0d0f] p-4 font-mono text-xs leading-relaxed"><!--[-->`);
      ssrRenderList(codeSnippet, (line) => {
        _push(`<div class="flex gap-4"><span class="select-none text-text-muted/40 tabular-nums">${ssrInterpolate(line.line)}</span><span class="${ssrRenderClass(line.muted ? "text-text-muted/60" : "text-text/90")}">${ssrInterpolate(line.content)}</span></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(items).length) {
        _push(`<div class="flex flex-col gap-2"><!--[-->`);
        ssrRenderList(unref(items).slice(0, 6), (item) => {
          _push(`<div class="flex items-center justify-between gap-2"><span class="text-sm text-text">${ssrInterpolate(item.name)}</span><span class="font-mono text-[10px] uppercase text-text-muted">${ssrInterpolate(item.level)}</span></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/AILabCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AILabCard-CqbwL2Sd.mjs.map
