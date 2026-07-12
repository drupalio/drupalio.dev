import { _ as _sfc_main$1 } from "./SectionLabel-DTsiWQLU.js";
import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
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
  __name: "CareerTimeline",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const tm = (key) => $i18n?.global?.tm(key) ?? [];
    const currentLocale = computed(() => $i18n?.global?.locale?.value || "en");
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
export {
  _sfc_main as default
};
//# sourceMappingURL=CareerTimeline-CQNr4mk1.js.map
