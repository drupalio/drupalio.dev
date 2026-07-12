import { _ as _sfc_main$1 } from './SectionLabel-DTsiWQLU.mjs';
import { u as useNuxtApp, _ as __nuxt_component_1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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

const email = "hello@drupalio.dev";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContactCard",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const tm = (key) => {
      var _a, _b;
      return (_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.tm(key)) != null ? _b : [];
    };
    const t = (key) => {
      var _a, _b;
      return (_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.t(key)) != null ? _b : key;
    };
    const currentLocale = computed(() => {
      var _a, _b;
      return ((_b = (_a = $i18n == null ? void 0 : $i18n.global) == null ? void 0 : _a.locale) == null ? void 0 : _b.value) || "en";
    });
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

export { _sfc_main as default };
//# sourceMappingURL=ContactCard-_7JbG9u1.mjs.map
