import { _ as _sfc_main$1 } from "./SectionLabel-DTsiWQLU.js";
import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { u as useNuxtApp } from "../server.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/cookie-es@2.0.1/node_modules/cookie-es/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/@unhead+vue@2.1.15_vue@3.5.39_typescript@5.9.3_/node_modules/@unhead/vue/dist/index.mjs";
import "vue-i18n";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/perfect-debounce@2.1.0/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AILabCard",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => $i18n?.global?.locale?.value || "en");
    const items = computed(() => {
      const skills = $i18n?.global?.tm("skills");
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
export {
  _sfc_main as default
};
//# sourceMappingURL=AILabCard-CqbwL2Sd.js.map
