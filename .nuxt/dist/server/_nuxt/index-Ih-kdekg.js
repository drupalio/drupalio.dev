import { u as useContentQueries, _ as _sfc_main$9 } from "./useContentQueries-cBSYek9c.js";
import { u as useNuxtApp, _ as __nuxt_component_1, a as useLanguage, b as useSeoMeta, c as useHead, d as _sfc_main$a, e as _sfc_main$b } from "../server.mjs";
import { _ as _sfc_main$7 } from "./NuxtImg-C3D6XDEg.js";
import { defineComponent, computed, mergeProps, unref, useSSRContext, createVNode, resolveDynamicComponent, withCtx, renderSlot, withAsyncContext, ref, resolveDirective, openBlock, createBlock, createCommentVNode, defineAsyncComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderVNode, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _sfc_main$8 } from "./SectionLabel-DTsiWQLU.js";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/cookie-es@2.0.1/node_modules/cookie-es/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/@unhead+vue@2.1.15_vue@3.5.39_typescript@5.9.3_/node_modules/@unhead/vue/dist/index.mjs";
import "vue-i18n";
import "/Users/drupalio/drupalio.dev/node_modules/.pnpm/perfect-debounce@2.1.0/node_modules/perfect-debounce/dist/index.mjs";
const avatarUrl = "https://avatars.githubusercontent.com/u/5186093";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "HeroCard",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const t = (key) => {
      if (!$i18n?.global?.t) return key;
      try {
        return $i18n.global.t(key);
      } catch {
        return key;
      }
    };
    const name = computed(() => t("personalInfo.name"));
    const title = computed(() => t("personalInfo.title"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: avatarUrl,
        alt: unref(name),
        width: "56",
        height: "56",
        format: "avif",
        sizes: "56px sm:56px",
        class: "h-14 w-14 rounded-full ring-1 ring-border",
        loading: "eager"
      }, null, _parent));
      _push(`<p class="section-label">${ssrInterpolate(t("hero.greeting"))}</p></div><h1 class="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-7xl">${ssrInterpolate(unref(name))}</h1><p class="text-balance text-xl text-text-muted sm:text-2xl">${ssrInterpolate(unref(title))}</p><p class="max-w-xl text-base leading-relaxed text-text-muted">${ssrInterpolate(t("hero.tagline"))}</p></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/HeroCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BentoCard",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    padding: { default: "md" },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const paddingClass = computed(() => ({
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    })[props.padding]);
    const variantClass = computed(() => ({
      default: "bento-card",
      flat: "bg-transparent border-0 shadow-none",
      hover: "bento-card bento-card-hover cursor-pointer hover:-translate-y-0.5"
    })[props.variant]);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as), mergeProps({
        class: [unref(variantClass), unref(paddingClass)]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/BentoCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StatusCard",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const t = (key) => $i18n?.global?.t(key) ?? key;
    const links = computed(() => {
      const raw = $i18n?.global?.tm("personalInfo.links");
      if (!Array.isArray(raw)) return [];
      return raw;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col justify-between gap-6" }, _attrs))}><div class="flex items-center gap-2"><span class="relative flex h-2 w-2"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 duration-1000"></span><span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span></span><p class="text-sm font-medium text-text">${ssrInterpolate(t("status.available"))}</p></div><div class="flex flex-col gap-1"><p class="section-label">${ssrInterpolate(t("status.location"))}</p><p class="text-base text-text-muted">${ssrInterpolate(t("status.city"))}</p></div><div class="flex flex-col gap-3"><p class="section-label">${ssrInterpolate(t("status.connect"))}</p><div class="flex flex-col gap-1.5"><!--[-->`);
      ssrRenderList(unref(links), (link) => {
        _push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-150 hover:text-text">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: `lucide:${link.name.toLowerCase() === "linkedin" ? "linkedin" : "globe"}`,
          size: "14"
        }, null, _parent));
        _push(` ${ssrInterpolate(link.name)}</a>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/StatusCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const t = (key) => $i18n?.global?.t(key) ?? key;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionLabel = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "01",
        label: "About"
      }, null, _parent));
      _push(`<p class="max-w-3xl text-balance text-lg leading-relaxed text-text-muted">${ssrInterpolate(t("summary.summaryText"))}</p></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/AboutSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ExperienceTimeline",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { allExperience } = useContentQueries();
    const { data: workExperience } = ([__temp, __restore] = withAsyncContext(() => allExperience()), __temp = await __temp, __restore(), __temp);
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => $i18n?.global?.locale?.value || "en");
    const sectionTitle = computed(
      () => currentLocale.value === "en" ? "Work Experience" : "Experiencia Laboral"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionLabel = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "02",
        label: unref(sectionTitle)
      }, null, _parent));
      if (unref(workExperience)) {
        _push(`<div class="flex flex-col gap-1"><!--[-->`);
        ssrRenderList(unref(workExperience), (job) => {
          _push(`<div class="group relative border-l border-border pl-6 pb-6 last:pb-0"><div class="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-border transition-colors duration-200 group-hover:bg-accent"></div><div class="flex flex-col gap-1"><div class="flex flex-wrap items-baseline justify-between gap-2"><h3 class="text-base font-medium text-text">${ssrInterpolate(job.title)}</h3><span class="font-mono text-xs text-text-muted tabular-nums">${ssrInterpolate(job.period)}</span></div><p class="text-sm text-text-muted">${ssrInterpolate(job.company)}</p>`);
          if (job.projects?.length) {
            _push(`<div class="mt-3 flex flex-col gap-2"><!--[-->`);
            ssrRenderList(job.projects, (project, pIndex) => {
              _push(`<div class="rounded-lg bg-surface-2 px-3 py-2"><p class="text-sm font-medium text-text">${ssrInterpolate(project.name)}</p><p class="mt-0.5 text-xs leading-relaxed text-text-muted">${ssrInterpolate(project.description)}</p>`);
              if (project.technologies?.length) {
                _push(`<div class="mt-2 flex flex-wrap gap-1"><!--[-->`);
                ssrRenderList(project.technologies, (tech) => {
                  _push(`<span class="rounded-md bg-accent/5 px-1.5 py-0.5 font-mono text-[10px] text-accent">${ssrInterpolate(tech)}</span>`);
                });
                _push(`<!--]--></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/ExperienceTimeline.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TechStackGrid",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const tm = (key) => $i18n?.global?.tm(key) ?? [];
    const t = (key) => $i18n?.global?.t(key) ?? key;
    const currentLocale = computed(() => $i18n?.global?.locale?.value || "en");
    const allSkills = computed(() => {
      const skills = tm("skills");
      if (!skills || typeof skills !== "object") return [];
      const groups = [];
      const categoryMap = {
        programmingLanguages: currentLocale.value === "en" ? "Languages" : "Lenguajes",
        developmentFrameworks: currentLocale.value === "en" ? "Frameworks" : "Frameworks",
        cloudProviders: currentLocale.value === "en" ? "Cloud" : "Nube",
        serversAndContainers: currentLocale.value === "en" ? "Containers" : "Contenedores",
        frameworks: currentLocale.value === "en" ? "Frameworks" : "Frameworks",
        architectureAndMethodologies: currentLocale.value === "en" ? "Architecture" : "Arquitectura",
        aiAndLLMs: currentLocale.value === "en" ? "AI & LLMs" : "IA y LLMs",
        developmentTools: currentLocale.value === "en" ? "Tools" : "Herramientas"
      };
      for (const [key, items] of Object.entries(skills)) {
        if (!Array.isArray(items)) continue;
        const title = categoryMap[key] || key;
        groups.push({ title, items });
      }
      return groups;
    });
    const topLevelSkills = computed(() => {
      return allSkills.value.slice(0, 6);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionLabel = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SectionLabel, {
        number: "04",
        label: t("stack.title") || "Stack"
      }, null, _parent));
      _push(`<div class="grid grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(unref(topLevelSkills), (group) => {
        _push(`<div class="flex flex-col gap-2"><p class="font-mono text-xs uppercase tracking-wider text-text-muted">${ssrInterpolate(group.title)}</p><div class="flex flex-col gap-1"><!--[-->`);
        ssrRenderList(group.items.slice(0, 5), (skill) => {
          _push(`<div class="flex items-center justify-between gap-2"><span class="text-sm text-text">${ssrInterpolate(skill.name)}</span><span class="font-mono text-[10px] uppercase text-text-muted">${ssrInterpolate(skill.level)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bento/TechStackGrid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8_lazy = defineAsyncComponent(() => import("./FeaturedProjects-Dx6cXO_3.js").then((c) => c.default || c));
const __nuxt_component_9_lazy = defineAsyncComponent(() => import("./AILabCard-CqbwL2Sd.js").then((c) => c.default || c));
const __nuxt_component_10_lazy = defineAsyncComponent(() => import("./GitHubCard-D0LJG8ME.js").then((c) => c.default || c));
const __nuxt_component_11_lazy = defineAsyncComponent(() => import("./CareerTimeline-CQNr4mk1.js").then((c) => c.default || c));
const __nuxt_component_12_lazy = defineAsyncComponent(() => import("./SoftSkillsCloud-D5_UCv5e.js").then((c) => c.default || c));
const __nuxt_component_13_lazy = defineAsyncComponent(() => import("./ContactCard-_7JbG9u1.js").then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { current } = useLanguage();
    const showBelowFold = ref(false);
    useSeoMeta({
      title: "Ricardo Morales — Software Engineer",
      description: "Systems thinking, AI engineering, backend architecture, and performance work by Ricardo Morales.",
      ogTitle: "Ricardo Morales — Software Engineer",
      ogDescription: "Systems thinking, AI engineering, backend architecture, and performance work by Ricardo Morales.",
      ogType: "website",
      ogUrl: "https://drupalio.dev",
      ogImage: "https://avatars.githubusercontent.com/u/5186093",
      twitterCard: "summary_large_image",
      twitterTitle: "Ricardo Morales — Software Engineer",
      twitterDescription: "Systems thinking, AI engineering, backend architecture, and performance work.",
      twitterImage: "https://avatars.githubusercontent.com/u/5186093"
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ricardo Morales",
            jobTitle: "Software Engineer",
            url: "https://drupalio.dev",
            sameAs: [
              "https://www.linkedin.com/in/drupalio",
              "https://github.com/drupalio"
            ]
          })
        }
      ],
      htmlAttrs: {
        lang: () => current.value
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScrollProgress = _sfc_main$9;
      const _component_AppHeader = _sfc_main$a;
      const _component_HeroCard = _sfc_main$6;
      const _component_BentoCard = _sfc_main$5;
      const _component_StatusCard = _sfc_main$4;
      const _component_AboutSection = _sfc_main$3;
      const _component_ExperienceTimeline = _sfc_main$2;
      const _component_TechStackGrid = _sfc_main$1;
      const _component_LazyFeaturedProjects = __nuxt_component_8_lazy;
      const _component_LazyAILabCard = __nuxt_component_9_lazy;
      const _component_LazyGitHubCard = __nuxt_component_10_lazy;
      const _component_LazyCareerTimeline = __nuxt_component_11_lazy;
      const _component_LazySoftSkillsCloud = __nuxt_component_12_lazy;
      const _component_LazyContactCard = __nuxt_component_13_lazy;
      const _component_AppFooter = _sfc_main$b;
      const _directive_animate = resolveDirective("animate");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ScrollProgress, null, null, _parent));
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main class="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8"><div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6"><section${ssrRenderAttrs(mergeProps({
        id: "hero",
        class: "lg:col-span-7 lg:row-span-1 flex items-center"
      }, ssrGetDirectiveProps(_ctx, _directive_animate)))}>`);
      _push(ssrRenderComponent(_component_HeroCard, null, null, _parent));
      _push(`</section><section${ssrRenderAttrs(mergeProps({ class: "lg:col-span-5" }, ssrGetDirectiveProps(_ctx, _directive_animate, 80)))}>`);
      _push(ssrRenderComponent(_component_BentoCard, {
        variant: "hover",
        padding: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_StatusCard, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_StatusCard)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div><div class="mt-6 grid grid-cols-1 lg:grid-cols-12"><section${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "lg:col-span-12"
      }, ssrGetDirectiveProps(_ctx, _directive_animate)))}>`);
      _push(ssrRenderComponent(_component_AboutSection, null, null, _parent));
      _push(`</section></div><div class="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6"><section${ssrRenderAttrs(mergeProps({
        id: "experience",
        class: "lg:col-span-8"
      }, ssrGetDirectiveProps(_ctx, _directive_animate)))}>`);
      _push(ssrRenderComponent(_component_BentoCard, {
        variant: "default",
        padding: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ExperienceTimeline, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ExperienceTimeline)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section${ssrRenderAttrs(mergeProps({
        id: "stack",
        class: "lg:col-span-4"
      }, ssrGetDirectiveProps(_ctx, _directive_animate, 80)))}>`);
      _push(ssrRenderComponent(_component_BentoCard, {
        variant: "default",
        padding: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TechStackGrid, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TechStackGrid)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div><div class="mt-6"><section${ssrRenderAttrs(mergeProps({ id: "projects" }, ssrGetDirectiveProps(_ctx, _directive_animate)))}>`);
      if (unref(showBelowFold)) {
        _push(ssrRenderComponent(_component_LazyFeaturedProjects, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section></div><div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6"><section${ssrRenderAttrs(mergeProps({ class: "lg:col-span-6" }, ssrGetDirectiveProps(_ctx, _directive_animate)))}>`);
      _push(ssrRenderComponent(_component_BentoCard, {
        variant: "default",
        padding: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(showBelowFold)) {
              _push2(ssrRenderComponent(_component_LazyAILabCard, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(showBelowFold) ? (openBlock(), createBlock(_component_LazyAILabCard, { key: 0 })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section${ssrRenderAttrs(mergeProps({ class: "lg:col-span-6" }, ssrGetDirectiveProps(_ctx, _directive_animate, 80)))}>`);
      _push(ssrRenderComponent(_component_BentoCard, {
        variant: "default",
        padding: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(showBelowFold)) {
              _push2(ssrRenderComponent(_component_LazyGitHubCard, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(showBelowFold) ? (openBlock(), createBlock(_component_LazyGitHubCard, { key: 0 })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div><div${ssrRenderAttrs(mergeProps({ class: "mt-6" }, ssrGetDirectiveProps(_ctx, _directive_animate)))}>`);
      _push(ssrRenderComponent(_component_BentoCard, {
        variant: "default",
        padding: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(showBelowFold)) {
              _push2(ssrRenderComponent(_component_LazyCareerTimeline, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(showBelowFold) ? (openBlock(), createBlock(_component_LazyCareerTimeline, { key: 0 })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div${ssrRenderAttrs(mergeProps({ class: "mt-6" }, ssrGetDirectiveProps(_ctx, _directive_animate)))}>`);
      _push(ssrRenderComponent(_component_BentoCard, {
        variant: "default",
        padding: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(showBelowFold)) {
              _push2(ssrRenderComponent(_component_LazySoftSkillsCloud, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(showBelowFold) ? (openBlock(), createBlock(_component_LazySoftSkillsCloud, { key: 0 })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div${ssrRenderAttrs(mergeProps({ class: "mt-6" }, ssrGetDirectiveProps(_ctx, _directive_animate)))}><section id="contact">`);
      _push(ssrRenderComponent(_component_BentoCard, {
        variant: "default",
        padding: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(showBelowFold)) {
              _push2(ssrRenderComponent(_component_LazyContactCard, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(showBelowFold) ? (openBlock(), createBlock(_component_LazyContactCard, { key: 0 })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div></main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Ih-kdekg.js.map
