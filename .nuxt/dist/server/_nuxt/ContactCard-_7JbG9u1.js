import { _ as _sfc_main$1 } from "./SectionLabel-DTsiWQLU.js";
import { u as useNuxtApp, _ as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
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
const email = "hello@drupalio.dev";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContactCard",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const tm = (key) => $i18n?.global?.tm(key) ?? [];
    const t = (key) => $i18n?.global?.t(key) ?? key;
    const currentLocale = computed(() => $i18n?.global?.locale?.value || "en");
    const links = computed(() => {
      const raw = tm("personalInfo.links");
      return Array.isArray(raw) ? raw : [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionLabel = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "09",
        label: unref(currentLocale) === "en" ? "Contact" : "Contacto"
      }, null, _parent));
      _push(`<h3 class="text-balance text-2xl font-medium tracking-tight text-text">${ssrInterpolate(t("contact.heading"))}</h3><p class="max-w-md text-balance text-sm leading-relaxed text-text-muted">${ssrInterpolate(t("contact.body"))}</p><a${ssrRenderAttr("href", `mailto:${email}`)} class="inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-accent/90">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:mail",
        size: "14"
      }, null, _parent));
      _push(` ${ssrInterpolate(email)}</a><div class="mt-2 flex flex-wrap gap-4"><!--[-->`);
      ssrRenderList(unref(links), (link) => {
        _push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener" class="text-sm text-text-muted transition-colors duration-150 hover:text-text">${ssrInterpolate(link.name)}</a>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/ContactCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ContactCard-_7JbG9u1.js.map
