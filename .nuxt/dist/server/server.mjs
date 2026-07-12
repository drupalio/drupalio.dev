import { hasInjectionContext, getCurrentInstance, shallowReactive, reactive, effectScope, getCurrentScope, inject, toRef, ref, shallowRef, isReadonly, isRef, isShallow, isReactive, toRaw, defineAsyncComponent, computed, defineComponent, watch, h, nextTick, provide, Suspense, Fragment, useSSRContext, resolveComponent, unref, createElementBlock, cloneVNode, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, onServerPrefetch, toValue, onErrorCaptured, resolveDynamicComponent, createApp } from "vue";
import { $fetch as $fetch$1 } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import { baseURL } from "#internal/nuxt/paths";
import { createHooks } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import { getContext, executeAsync } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import { sanitizeStatusCode, createError as createError$1, appendHeader, getRequestHeader, setCookie, getCookie, deleteCookie } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import { START_LOCATION, createMemoryHistory, createRouter, RouterView } from "vue-router";
import { defu, defuFn } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import { parseURL, encodePath, decodePath, withQuery, hasProtocol, isScriptProtocol, joinURL, parseQuery, withTrailingSlash, withoutTrailingSlash } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import { parse } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/cookie-es@2.0.1/node_modules/cookie-es/dist/index.mjs";
import destr from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs";
import { isEqual } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs";
import { klona } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
import { useHead as useHead$1, headSymbol, useSeoMeta as useSeoMeta$1 } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/@unhead+vue@2.1.15_vue@3.5.39_typescript@5.9.3_/node_modules/@unhead/vue/dist/index.mjs";
import { createI18n } from "vue-i18n";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
import { debounce } from "/Users/drupalio/drupalio.dev/node_modules/.pnpm/perfect-debounce@2.1.0/node_modules/perfect-debounce/dist/index.mjs";
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const fetchDefaults = {};
const appId = "nuxt-app";
const crawlLinks = true;
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.8";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
import.meta.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
const HTML_ATTR_ENCODE_MAP = {
  "&": "%26",
  '"': "%22",
  "'": "%27",
  "<": "%3C",
  ">": "%3E"
};
function encodeForHtmlAttr(value) {
  return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedHeader = encodeURL(location2, isExternalHost);
        const encodedLoc = encodeForHtmlAttr(encodedHeader);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    const pathname = url.pathname.replace(/^\/{2,}/, "/");
    return pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
function freezeHead(head) {
  const realPush = head.push;
  head.push = () => ({ dispose: () => {
  }, patch: () => {
  }, _poll: () => {
  } });
  return () => {
    head.push = realPush;
  };
}
const unhead_bkuShh2zWc1A1ZyHeGoRYUIn_88URgblgkXlhr7O0Kg = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    if (nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const matcher = /* @__PURE__ */ (() => {
  const $0 = { prerender: true }, $1 = { payload: false };
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    if (p === "/__nuxt_content/projects_en/sql_dump.txt") {
      r.unshift({ data: $0 });
    } else if (p === "/__nuxt_content/projects_es/sql_dump.txt") {
      r.unshift({ data: $0 });
    } else if (p === "/__nuxt_content/experience_en/sql_dump.txt") {
      r.unshift({ data: $0 });
    } else if (p === "/__nuxt_content/experience_es/sql_dump.txt") {
      r.unshift({ data: $0 });
    } else if (p === "/__nuxt_content/blog_en/sql_dump.txt") {
      r.unshift({ data: $0 });
    } else if (p === "/__nuxt_content/blog_es/sql_dump.txt") {
      r.unshift({ data: $0 });
    }
    let s = p.split("/"), l2 = s.length;
    if (l2 > 1) {
      if (s[1] === "__nuxt_content") {
        r.unshift({ data: $1, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _routeRulesMatcher = (path) => defu({}, ...matcher("", typeof path === "string" ? path.toLowerCase() : path).map((r) => r.data).reverse());
const routeRulesMatcher = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher(path.toLowerCase());
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import("./_nuxt/index-SyQKCPqH.js")
  },
  {
    name: "blog",
    path: "/blog",
    component: () => import("./_nuxt/index-kLdzkazc.js")
  },
  {
    name: "blog-slug",
    path: "/blog/:slug(.*)*",
    component: () => import("./_nuxt/_...slug_-TzetRvpV.js")
  },
  {
    name: "projects-slug",
    path: "/projects/:slug(.*)*",
    component: () => import("./_nuxt/_...slug_-B76-y-Xa.js")
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => comp.components && comp.components.default === from.matched[index2]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    if (from === START_LOCATION) {
      return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
    }
    return new Promise((resolve) => {
      const doScroll = () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      };
      nuxtApp.hooks.hookOnce("page:loading:end", () => {
        const transitionPromise = nuxtApp["~transitionPromise"];
        if (transitionPromise) {
          transitionPromise.then(doScroll);
        } else {
          doScroll();
        }
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const hashMode = false;
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || tryUseNuxtApp();
  return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  });
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function useSeoMeta(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useSeoMeta$1(input, { head, ...options });
  }
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function prerenderRoutes(path) {
  if (!import.meta.prerender) {
    return;
  }
  const paths = toArray$1(path);
  appendHeader(useRequestEvent(), "x-nitro-prerender", paths.map((p) => encodeURIComponent(p)).join(", "));
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => {
    const decoded = decodeURIComponent(val);
    const parsed = destr(decoded);
    if (typeof parsed === "number" && (!Number.isFinite(parsed) || String(parsed) !== decoded)) {
      return decoded;
    }
    return parsed;
  },
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const locale_45global = /* @__PURE__ */ defineNuxtRouteMiddleware(() => {
  const { $i18n } = useNuxtApp();
  if (!$i18n?.global) return;
  const cookie = useCookie("language", {
    default: () => "en",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365
  });
  const knownLocales = ["en", "es"];
  const saved = cookie.value || "en";
  if (knownLocales.includes(saved) && saved !== $i18n.global.locale.value) {
    $i18n.global.locale.value = saved;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  locale_45global,
  manifest_45route_45rule
];
const namedMiddleware = {};
Object.assign(/* @__PURE__ */ Object.create(null), {});
const pageIslandRoutes = Object.assign(/* @__PURE__ */ Object.create(null), {});
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes2 = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes: routes2
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      const lastTo = to.matched.at(-1)?.components?.default;
      const lastFrom = from.matched.at(-1)?.components?.default;
      if (lastTo === lastFrom) {
        syncCurrentRoute();
        return;
      }
      if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
    if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    const hasDeferredRoute = false;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext && !isServerPage) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    if (isServerPage) {
      router.beforeResolve((to) => {
        const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
        const actual = to.matched.find((m) => m.components?.default?.__nuxt_island)?.components?.default;
        if (!expected || expected !== actual?.__nuxt_island) {
          nuxtApp.ssrContext["~renderResponse"] = {
            statusCode: 400,
            statusMessage: "Invalid island request path"
          };
          return false;
        }
      });
    }
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        if (hasDeferredRoute) ;
        else {
          await router.replace({
            ...resolvedInitialRoute,
            force: true
          });
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server__MvkmD7GMkKyX0OXji0_eELg68_AJSAeWxCbytIOZGU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const LazyProseA = defineAsyncComponent(() => import("./_nuxt/ProseA-Chx8jga7.js").then((r) => r["default"] || r.default || r));
const LazyProseBlockquote = defineAsyncComponent(() => import("./_nuxt/ProseBlockquote-BjjvpLfN.js").then((r) => r["default"] || r.default || r));
const LazyProseCode = defineAsyncComponent(() => import("./_nuxt/ProseCode-BmhFoCmw.js").then((r) => r["default"] || r.default || r));
const LazyProseEm = defineAsyncComponent(() => import("./_nuxt/ProseEm-CvJxsEFs.js").then((r) => r["default"] || r.default || r));
const LazyProseH1 = defineAsyncComponent(() => import("./_nuxt/ProseH1-EPKPHqwq.js").then((r) => r["default"] || r.default || r));
const LazyProseH2 = defineAsyncComponent(() => import("./_nuxt/ProseH2-CZR1np56.js").then((r) => r["default"] || r.default || r));
const LazyProseH3 = defineAsyncComponent(() => import("./_nuxt/ProseH3-CQewv5wL.js").then((r) => r["default"] || r.default || r));
const LazyProseH4 = defineAsyncComponent(() => import("./_nuxt/ProseH4-Du0sZQbH.js").then((r) => r["default"] || r.default || r));
const LazyProseH5 = defineAsyncComponent(() => import("./_nuxt/ProseH5-fdV5wHjC.js").then((r) => r["default"] || r.default || r));
const LazyProseH6 = defineAsyncComponent(() => import("./_nuxt/ProseH6-BCSw8-ma.js").then((r) => r["default"] || r.default || r));
const LazyProseHr = defineAsyncComponent(() => import("./_nuxt/ProseHr-uMjwJ038.js").then((r) => r["default"] || r.default || r));
const LazyProseImg = defineAsyncComponent(() => import("./_nuxt/ProseImg-CW5OILgc.js").then((r) => r["default"] || r.default || r));
const LazyProseLi = defineAsyncComponent(() => import("./_nuxt/ProseLi-CdM1M9WY.js").then((r) => r["default"] || r.default || r));
const LazyProseOl = defineAsyncComponent(() => import("./_nuxt/ProseOl-DBHmvXLb.js").then((r) => r["default"] || r.default || r));
const LazyProseP = defineAsyncComponent(() => import("./_nuxt/ProseP-Deldv5Po.js").then((r) => r["default"] || r.default || r));
const LazyProsePre = defineAsyncComponent(() => import("./_nuxt/ProsePre-C43ouD5l.js").then((r) => r["default"] || r.default || r));
const LazyProseScript = defineAsyncComponent(() => import("./_nuxt/ProseScript-ChLYwSib.js").then((r) => r["default"] || r.default || r));
const LazyProseStrong = defineAsyncComponent(() => import("./_nuxt/ProseStrong-DNMyRjgr.js").then((r) => r["default"] || r.default || r));
const LazyProseTable = defineAsyncComponent(() => import("./_nuxt/ProseTable-BDbWR6zw.js").then((r) => r["default"] || r.default || r));
const LazyProseTbody = defineAsyncComponent(() => import("./_nuxt/ProseTbody-D0AND-tQ.js").then((r) => r["default"] || r.default || r));
const LazyProseTd = defineAsyncComponent(() => import("./_nuxt/ProseTd-CxJUaMlV.js").then((r) => r["default"] || r.default || r));
const LazyProseTh = defineAsyncComponent(() => import("./_nuxt/ProseTh-CcSr2NYu.js").then((r) => r["default"] || r.default || r));
const LazyProseThead = defineAsyncComponent(() => import("./_nuxt/ProseThead-XbIamd6u.js").then((r) => r["default"] || r.default || r));
const LazyProseTr = defineAsyncComponent(() => import("./_nuxt/ProseTr-kmF9u8YQ.js").then((r) => r["default"] || r.default || r));
const LazyProseUl = defineAsyncComponent(() => import("./_nuxt/ProseUl-Bu8fShGU.js").then((r) => r["default"] || r.default || r));
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(() => index).then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["ProseA", LazyProseA],
  ["ProseBlockquote", LazyProseBlockquote],
  ["ProseCode", LazyProseCode],
  ["ProseEm", LazyProseEm],
  ["ProseH1", LazyProseH1],
  ["ProseH2", LazyProseH2],
  ["ProseH3", LazyProseH3],
  ["ProseH4", LazyProseH4],
  ["ProseH5", LazyProseH5],
  ["ProseH6", LazyProseH6],
  ["ProseHr", LazyProseHr],
  ["ProseImg", LazyProseImg],
  ["ProseLi", LazyProseLi],
  ["ProseOl", LazyProseOl],
  ["ProseP", LazyProseP],
  ["ProsePre", LazyProsePre],
  ["ProseScript", LazyProseScript],
  ["ProseStrong", LazyProseStrong],
  ["ProseTable", LazyProseTable],
  ["ProseTbody", LazyProseTbody],
  ["ProseTd", LazyProseTd],
  ["ProseTh", LazyProseTh],
  ["ProseThead", LazyProseThead],
  ["ProseTr", LazyProseTr],
  ["ProseUl", LazyProseUl],
  ["Icon", LazyIcon]
];
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
var l = { inherit: "inherit", current: "currentcolor", transparent: "transparent", black: "#000", white: "#fff", slate: { 50: "oklch(98.4% 0.003 247.858)", 100: "oklch(96.8% 0.007 247.896)", 200: "oklch(92.9% 0.013 255.508)", 300: "oklch(86.9% 0.022 252.894)", 400: "oklch(70.4% 0.04 256.788)", 500: "oklch(55.4% 0.046 257.417)", 600: "oklch(44.6% 0.043 257.281)", 700: "oklch(37.2% 0.044 257.287)", 800: "oklch(27.9% 0.041 260.031)", 900: "oklch(20.8% 0.042 265.755)", 950: "oklch(12.9% 0.042 264.695)" }, gray: { 50: "oklch(98.5% 0.002 247.839)", 100: "oklch(96.7% 0.003 264.542)", 200: "oklch(92.8% 0.006 264.531)", 300: "oklch(87.2% 0.01 258.338)", 400: "oklch(70.7% 0.022 261.325)", 500: "oklch(55.1% 0.027 264.364)", 600: "oklch(44.6% 0.03 256.802)", 700: "oklch(37.3% 0.034 259.733)", 800: "oklch(27.8% 0.033 256.848)", 900: "oklch(21% 0.034 264.665)", 950: "oklch(13% 0.028 261.692)" }, zinc: { 50: "oklch(98.5% 0 0)", 100: "oklch(96.7% 0.001 286.375)", 200: "oklch(92% 0.004 286.32)", 300: "oklch(87.1% 0.006 286.286)", 400: "oklch(70.5% 0.015 286.067)", 500: "oklch(55.2% 0.016 285.938)", 600: "oklch(44.2% 0.017 285.786)", 700: "oklch(37% 0.013 285.805)", 800: "oklch(27.4% 0.006 286.033)", 900: "oklch(21% 0.006 285.885)", 950: "oklch(14.1% 0.005 285.823)" }, neutral: { 50: "oklch(98.5% 0 0)", 100: "oklch(97% 0 0)", 200: "oklch(92.2% 0 0)", 300: "oklch(87% 0 0)", 400: "oklch(70.8% 0 0)", 500: "oklch(55.6% 0 0)", 600: "oklch(43.9% 0 0)", 700: "oklch(37.1% 0 0)", 800: "oklch(26.9% 0 0)", 900: "oklch(20.5% 0 0)", 950: "oklch(14.5% 0 0)" }, stone: { 50: "oklch(98.5% 0.001 106.423)", 100: "oklch(97% 0.001 106.424)", 200: "oklch(92.3% 0.003 48.717)", 300: "oklch(86.9% 0.005 56.366)", 400: "oklch(70.9% 0.01 56.259)", 500: "oklch(55.3% 0.013 58.071)", 600: "oklch(44.4% 0.011 73.639)", 700: "oklch(37.4% 0.01 67.558)", 800: "oklch(26.8% 0.007 34.298)", 900: "oklch(21.6% 0.006 56.043)", 950: "oklch(14.7% 0.004 49.25)" }, mauve: { 50: "oklch(98.5% 0 0)", 100: "oklch(96% 0.003 325.6)", 200: "oklch(92.2% 0.005 325.62)", 300: "oklch(86.5% 0.012 325.68)", 400: "oklch(71.1% 0.019 323.02)", 500: "oklch(54.2% 0.034 322.5)", 600: "oklch(43.5% 0.029 321.78)", 700: "oklch(36.4% 0.029 323.89)", 800: "oklch(26.3% 0.024 320.12)", 900: "oklch(21.2% 0.019 322.12)", 950: "oklch(14.5% 0.008 326)" }, olive: { 50: "oklch(98.8% 0.003 106.5)", 100: "oklch(96.6% 0.005 106.5)", 200: "oklch(93% 0.007 106.5)", 300: "oklch(88% 0.011 106.6)", 400: "oklch(73.7% 0.021 106.9)", 500: "oklch(58% 0.031 107.3)", 600: "oklch(46.6% 0.025 107.3)", 700: "oklch(39.4% 0.023 107.4)", 800: "oklch(28.6% 0.016 107.4)", 900: "oklch(22.8% 0.013 107.4)", 950: "oklch(15.3% 0.006 107.1)" }, mist: { 50: "oklch(98.7% 0.002 197.1)", 100: "oklch(96.3% 0.002 197.1)", 200: "oklch(92.5% 0.005 214.3)", 300: "oklch(87.2% 0.007 219.6)", 400: "oklch(72.3% 0.014 214.4)", 500: "oklch(56% 0.021 213.5)", 600: "oklch(45% 0.017 213.2)", 700: "oklch(37.8% 0.015 216)", 800: "oklch(27.5% 0.011 216.9)", 900: "oklch(21.8% 0.008 223.9)", 950: "oklch(14.8% 0.004 228.8)" }, taupe: { 50: "oklch(98.6% 0.002 67.8)", 100: "oklch(96% 0.002 17.2)", 200: "oklch(92.2% 0.005 34.3)", 300: "oklch(86.8% 0.007 39.5)", 400: "oklch(71.4% 0.014 41.2)", 500: "oklch(54.7% 0.021 43.1)", 600: "oklch(43.8% 0.017 39.3)", 700: "oklch(36.7% 0.016 35.7)", 800: "oklch(26.8% 0.011 36.5)", 900: "oklch(21.4% 0.009 43.1)", 950: "oklch(14.7% 0.004 49.3)" }, red: { 50: "oklch(97.1% 0.013 17.38)", 100: "oklch(93.6% 0.032 17.717)", 200: "oklch(88.5% 0.062 18.334)", 300: "oklch(80.8% 0.114 19.571)", 400: "oklch(70.4% 0.191 22.216)", 500: "oklch(63.7% 0.237 25.331)", 600: "oklch(57.7% 0.245 27.325)", 700: "oklch(50.5% 0.213 27.518)", 800: "oklch(44.4% 0.177 26.899)", 900: "oklch(39.6% 0.141 25.723)", 950: "oklch(25.8% 0.092 26.042)" }, orange: { 50: "oklch(98% 0.016 73.684)", 100: "oklch(95.4% 0.038 75.164)", 200: "oklch(90.1% 0.076 70.697)", 300: "oklch(83.7% 0.128 66.29)", 400: "oklch(75% 0.183 55.934)", 500: "oklch(70.5% 0.213 47.604)", 600: "oklch(64.6% 0.222 41.116)", 700: "oklch(55.3% 0.195 38.402)", 800: "oklch(47% 0.157 37.304)", 900: "oklch(40.8% 0.123 38.172)", 950: "oklch(26.6% 0.079 36.259)" }, amber: { 50: "oklch(98.7% 0.022 95.277)", 100: "oklch(96.2% 0.059 95.617)", 200: "oklch(92.4% 0.12 95.746)", 300: "oklch(87.9% 0.169 91.605)", 400: "oklch(82.8% 0.189 84.429)", 500: "oklch(76.9% 0.188 70.08)", 600: "oklch(66.6% 0.179 58.318)", 700: "oklch(55.5% 0.163 48.998)", 800: "oklch(47.3% 0.137 46.201)", 900: "oklch(41.4% 0.112 45.904)", 950: "oklch(27.9% 0.077 45.635)" }, yellow: { 50: "oklch(98.7% 0.026 102.212)", 100: "oklch(97.3% 0.071 103.193)", 200: "oklch(94.5% 0.129 101.54)", 300: "oklch(90.5% 0.182 98.111)", 400: "oklch(85.2% 0.199 91.936)", 500: "oklch(79.5% 0.184 86.047)", 600: "oklch(68.1% 0.162 75.834)", 700: "oklch(55.4% 0.135 66.442)", 800: "oklch(47.6% 0.114 61.907)", 900: "oklch(42.1% 0.095 57.708)", 950: "oklch(28.6% 0.066 53.813)" }, lime: { 50: "oklch(98.6% 0.031 120.757)", 100: "oklch(96.7% 0.067 122.328)", 200: "oklch(93.8% 0.127 124.321)", 300: "oklch(89.7% 0.196 126.665)", 400: "oklch(84.1% 0.238 128.85)", 500: "oklch(76.8% 0.233 130.85)", 600: "oklch(64.8% 0.2 131.684)", 700: "oklch(53.2% 0.157 131.589)", 800: "oklch(45.3% 0.124 130.933)", 900: "oklch(40.5% 0.101 131.063)", 950: "oklch(27.4% 0.072 132.109)" }, green: { 50: "oklch(98.2% 0.018 155.826)", 100: "oklch(96.2% 0.044 156.743)", 200: "oklch(92.5% 0.084 155.995)", 300: "oklch(87.1% 0.15 154.449)", 400: "oklch(79.2% 0.209 151.711)", 500: "oklch(72.3% 0.219 149.579)", 600: "oklch(62.7% 0.194 149.214)", 700: "oklch(52.7% 0.154 150.069)", 800: "oklch(44.8% 0.119 151.328)", 900: "oklch(39.3% 0.095 152.535)", 950: "oklch(26.6% 0.065 152.934)" }, emerald: { 50: "oklch(97.9% 0.021 166.113)", 100: "oklch(95% 0.052 163.051)", 200: "oklch(90.5% 0.093 164.15)", 300: "oklch(84.5% 0.143 164.978)", 400: "oklch(76.5% 0.177 163.223)", 500: "oklch(69.6% 0.17 162.48)", 600: "oklch(59.6% 0.145 163.225)", 700: "oklch(50.8% 0.118 165.612)", 800: "oklch(43.2% 0.095 166.913)", 900: "oklch(37.8% 0.077 168.94)", 950: "oklch(26.2% 0.051 172.552)" }, teal: { 50: "oklch(98.4% 0.014 180.72)", 100: "oklch(95.3% 0.051 180.801)", 200: "oklch(91% 0.096 180.426)", 300: "oklch(85.5% 0.138 181.071)", 400: "oklch(77.7% 0.152 181.912)", 500: "oklch(70.4% 0.14 182.503)", 600: "oklch(60% 0.118 184.704)", 700: "oklch(51.1% 0.096 186.391)", 800: "oklch(43.7% 0.078 188.216)", 900: "oklch(38.6% 0.063 188.416)", 950: "oklch(27.7% 0.046 192.524)" }, cyan: { 50: "oklch(98.4% 0.019 200.873)", 100: "oklch(95.6% 0.045 203.388)", 200: "oklch(91.7% 0.08 205.041)", 300: "oklch(86.5% 0.127 207.078)", 400: "oklch(78.9% 0.154 211.53)", 500: "oklch(71.5% 0.143 215.221)", 600: "oklch(60.9% 0.126 221.723)", 700: "oklch(52% 0.105 223.128)", 800: "oklch(45% 0.085 224.283)", 900: "oklch(39.8% 0.07 227.392)", 950: "oklch(30.2% 0.056 229.695)" }, sky: { 50: "oklch(97.7% 0.013 236.62)", 100: "oklch(95.1% 0.026 236.824)", 200: "oklch(90.1% 0.058 230.902)", 300: "oklch(82.8% 0.111 230.318)", 400: "oklch(74.6% 0.16 232.661)", 500: "oklch(68.5% 0.169 237.323)", 600: "oklch(58.8% 0.158 241.966)", 700: "oklch(50% 0.134 242.749)", 800: "oklch(44.3% 0.11 240.79)", 900: "oklch(39.1% 0.09 240.876)", 950: "oklch(29.3% 0.066 243.157)" }, blue: { 50: "oklch(97% 0.014 254.604)", 100: "oklch(93.2% 0.032 255.585)", 200: "oklch(88.2% 0.059 254.128)", 300: "oklch(80.9% 0.105 251.813)", 400: "oklch(70.7% 0.165 254.624)", 500: "oklch(62.3% 0.214 259.815)", 600: "oklch(54.6% 0.245 262.881)", 700: "oklch(48.8% 0.243 264.376)", 800: "oklch(42.4% 0.199 265.638)", 900: "oklch(37.9% 0.146 265.522)", 950: "oklch(28.2% 0.091 267.935)" }, indigo: { 50: "oklch(96.2% 0.018 272.314)", 100: "oklch(93% 0.034 272.788)", 200: "oklch(87% 0.065 274.039)", 300: "oklch(78.5% 0.115 274.713)", 400: "oklch(67.3% 0.182 276.935)", 500: "oklch(58.5% 0.233 277.117)", 600: "oklch(51.1% 0.262 276.966)", 700: "oklch(45.7% 0.24 277.023)", 800: "oklch(39.8% 0.195 277.366)", 900: "oklch(35.9% 0.144 278.697)", 950: "oklch(25.7% 0.09 281.288)" }, violet: { 50: "oklch(96.9% 0.016 293.756)", 100: "oklch(94.3% 0.029 294.588)", 200: "oklch(89.4% 0.057 293.283)", 300: "oklch(81.1% 0.111 293.571)", 400: "oklch(70.2% 0.183 293.541)", 500: "oklch(60.6% 0.25 292.717)", 600: "oklch(54.1% 0.281 293.009)", 700: "oklch(49.1% 0.27 292.581)", 800: "oklch(43.2% 0.232 292.759)", 900: "oklch(38% 0.189 293.745)", 950: "oklch(28.3% 0.141 291.089)" }, purple: { 50: "oklch(97.7% 0.014 308.299)", 100: "oklch(94.6% 0.033 307.174)", 200: "oklch(90.2% 0.063 306.703)", 300: "oklch(82.7% 0.119 306.383)", 400: "oklch(71.4% 0.203 305.504)", 500: "oklch(62.7% 0.265 303.9)", 600: "oklch(55.8% 0.288 302.321)", 700: "oklch(49.6% 0.265 301.924)", 800: "oklch(43.8% 0.218 303.724)", 900: "oklch(38.1% 0.176 304.987)", 950: "oklch(29.1% 0.149 302.717)" }, fuchsia: { 50: "oklch(97.7% 0.017 320.058)", 100: "oklch(95.2% 0.037 318.852)", 200: "oklch(90.3% 0.076 319.62)", 300: "oklch(83.3% 0.145 321.434)", 400: "oklch(74% 0.238 322.16)", 500: "oklch(66.7% 0.295 322.15)", 600: "oklch(59.1% 0.293 322.896)", 700: "oklch(51.8% 0.253 323.949)", 800: "oklch(45.2% 0.211 324.591)", 900: "oklch(40.1% 0.17 325.612)", 950: "oklch(29.3% 0.136 325.661)" }, pink: { 50: "oklch(97.1% 0.014 343.198)", 100: "oklch(94.8% 0.028 342.258)", 200: "oklch(89.9% 0.061 343.231)", 300: "oklch(82.3% 0.12 346.018)", 400: "oklch(71.8% 0.202 349.761)", 500: "oklch(65.6% 0.241 354.308)", 600: "oklch(59.2% 0.249 0.584)", 700: "oklch(52.5% 0.223 3.958)", 800: "oklch(45.9% 0.187 3.815)", 900: "oklch(40.8% 0.153 2.432)", 950: "oklch(28.4% 0.109 3.907)" }, rose: { 50: "oklch(96.9% 0.015 12.422)", 100: "oklch(94.1% 0.03 12.58)", 200: "oklch(89.2% 0.058 10.001)", 300: "oklch(81% 0.117 11.638)", 400: "oklch(71.2% 0.194 13.428)", 500: "oklch(64.5% 0.246 16.439)", 600: "oklch(58.6% 0.253 17.585)", 700: "oklch(51.4% 0.222 16.935)", 800: "oklch(45.5% 0.188 13.697)", 900: "oklch(41% 0.159 10.272)", 950: "oklch(27.1% 0.105 12.094)" } };
const cfg0 = defineAppConfig({});
const inlineConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  },
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "ellipsis": "i-lucide-ellipsis",
      "external": "i-lucide-arrow-up-right",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "loading": "i-lucide-loader-circle",
      "minus": "i-lucide-minus",
      "plus": "i-lucide-plus",
      "search": "i-lucide-search",
      "upload": "i-lucide-upload"
    }
  }
};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(__appConfig);
  return nuxtApp._appConfig;
}
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
function getColor(color, shade) {
  if (color in l && typeof l[color] === "object" && shade in l[color]) {
    return l[color][shade];
  }
  return "";
}
function generateShades(key, value) {
  return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value, shade)});`).join("\n  ")}`;
}
function generateColor(key, shade) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}
const colors_YTZvULqV1DZL0HK4ShSquSZdETxRGdGBfxieHx6_EQA = /* @__PURE__ */ defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  useNuxtApp();
  const root = computed(() => {
    const { neutral, ...colors2 } = appConfig.ui.colors;
    return `@layer base {
  :root {
  ${Object.entries(appConfig.ui.colors).map(([key, value]) => generateShades(key, value)).join("\n  ")}
  }
  :root, .light {
  ${Object.keys(colors2).map((key) => generateColor(key, 500)).join("\n  ")}
  }
  .dark {
  ${Object.keys(colors2).map((key) => generateColor(key, 400)).join("\n  ")}
  }
}`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors"
    }]
  };
  useHead(headData);
});
const preference = "dark";
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const plugin_server_XlivkfYBOcHtXydUVsxvbfczHZpJKCMwq769UkFyeKk = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate2, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) return null;
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) return null;
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate2 && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate2 && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate2 && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) return false;
  return !!((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) return resolved[name] = [];
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) resolved[name] = [parent].concat(value);
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
const defaultIconDimensions$1 = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
});
const defaultIconTransformations$1 = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps$1 = Object.freeze({
  ...defaultIconDimensions$1,
  ...defaultIconTransformations$1
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps$1,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) result.hFlip = true;
  if (!obj1.vFlip !== !obj2.vFlip) result.vFlip = true;
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) result.rotate = rotate;
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) if (key in defaultIconTransformations$1) {
    if (key in parent && !(key in result)) result[key] = defaultIconTransformations$1[key];
  } else if (key in child) result[key] = child[key];
  else if (key in parent) result[key] = parent[key];
  return result;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse2(name2) {
    currentProps = mergeIconData(icons[name2] || aliases[name2], currentProps);
  }
  parse2(name);
  tree.forEach(parse2);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") return names;
  if (data.not_found instanceof Array) data.not_found.forEach((name) => {
    callback(name, null);
    names.push(name);
  });
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions$1
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) if (prop in item && typeof item[prop] !== typeof defaults[prop]) return false;
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) return null;
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") return null;
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) return null;
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name || typeof icon.body !== "string" || !checkOptionalProps(icon, defaultExtendedIconProps)) return null;
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(icon, defaultExtendedIconProps)) return null;
  }
  return data;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) return [];
  return parseIconSet(data, (name, icon) => {
    if (icon) storage2.icons[name] = icon;
    else storage2.missing.add(name);
  });
}
let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") simpleNames = allow;
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function getIcon(name) {
  const result = getIconData(name);
  return result ? {
    ...defaultIconProps$1,
    ...result
  } : result;
}
const defaultIconSizeCustomisations$1 = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations$1 = Object.freeze({
  ...defaultIconSizeCustomisations$1,
  ...defaultIconTransformations$1
});
const unitsSplit$1 = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest$1 = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize$1(size, ratio, precision) {
  if (ratio === 1) return size;
  precision = precision || 100;
  if (typeof size === "number") return Math.ceil(size * ratio * precision) / precision;
  if (typeof size !== "string") return size;
  const oldParts = size.split(unitsSplit$1);
  if (oldParts === null || !oldParts.length) return size;
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest$1.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) newParts.push(code);
      else newParts.push(Math.ceil(num * ratio * precision) / precision);
    } else newParts.push(code);
    code = oldParts.shift();
    if (code === void 0) return newParts.join("");
    isNumber = !isNumber;
  }
}
function splitSVGDefs$1(content, tag = "defs") {
  let defs = "";
  const index2 = content.indexOf("<" + tag);
  while (index2 >= 0) {
    const start = content.indexOf(">", index2);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) break;
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) break;
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index2).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent$1(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent$1(body, start, end) {
  const split = splitSVGDefs$1(body);
  return mergeDefsAndContent$1(split.defs, start + split.content + end);
}
const isUnsetKeyword$1 = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG$1(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps$1,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations$1,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) if (vFlip) rotation += 2;
    else {
      transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
      transformations.push("scale(-1 1)");
      box.top = box.left = 0;
    }
    else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4;
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) body = wrapSVGContent$1(body, '<g transform="' + transformations.join(" ") + '">', "</g>");
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize$1(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize$1(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword$1(value)) attributes[prop] = value.toString();
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [
    box.left,
    box.top,
    boxWidth,
    boxHeight
  ];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
const regex = /\sid="(\S+)"/g;
const counters = /* @__PURE__ */ new Map();
function nextID(id) {
  id = id.replace(/[0-9]+$/, "") || "a";
  const count = counters.get(id) || 0;
  counters.set(id, count + 1);
  return count ? `${id}${count}` : id;
}
function replaceIDs(body) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) ids.push(match[1]);
  if (!ids.length) return body;
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = nextID(id);
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + suffix + "$3");
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") resources = [source.resources];
  else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) return null;
  }
  return {
    resources,
    path: source.path || "/",
    maxURL: source.maxURL || 500,
    rotate: source.rotate || 750,
    timeout: source.timeout || 5e3,
    random: source.random === true,
    index: source.index || 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = ["https://api.simplesvg.com", "https://api.unisvg.com"];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) if (fallBackAPISources.length === 1) fallBackAPI.push(fallBackAPISources.shift());
else if (Math.random() > 0.5) fallBackAPI.push(fallBackAPISources.shift());
else fallBackAPI.push(fallBackAPISources.pop());
configStorage[""] = createAPIConfig({ resources: ["https://api.iconify.design"].concat(fallBackAPI) });
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) return false;
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function listAPIProviders() {
  return Object.keys(configStorage);
}
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") return callback;
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function setFetch(fetch2) {
  fetchModule = fetch2;
}
function getFetch() {
  return fetchModule;
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) return 0;
  let result;
  if (!config.maxURL) result = 0;
  else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      maxHostLength = Math.max(maxHostLength, item.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status2) {
  return status2 === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index2) => {
    length += name.length + 1;
    if (length >= maxLength && index2 > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) return config.path;
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const iconsList = params.icons.join(",");
      const urlParams = new URLSearchParams({ icons: iconsList });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status2 = response.status;
    if (status2 !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status2) ? "abort" : "next", status2);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) callback("abort", data);
        else callback("next", defaultError);
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) storage2.loaderCallbacks = items.filter((row) => row.id !== id);
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) return;
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) return true;
          const name = icon.name;
          if (storage2.icons[name]) icons.loaded.push({
            provider,
            prefix,
            name
          });
          else if (storage2.missing.has(name)) icons.missing.push({
            provider,
            prefix,
            name
          });
          else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) removeCallback([storage2], item.id);
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) return abort;
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) return a.provider.localeCompare(b.provider);
    if (a.prefix !== b.prefix) return a.prefix.localeCompare(b.prefix);
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) return;
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) list = result.loaded;
    else if (prefix === "" || localStorage.missing.has(name)) list = result.missing;
    else list = result.pending;
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function listToIcons(list, validate2 = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate2, simpleNames2) : item;
    if (icon) result.push(icon);
  });
  return result;
}
const defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  const startTime = Date.now();
  let status2 = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") doneCallbacks.push(done);
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status2 === "pending") status2 = "aborted";
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") item.status = "aborted";
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) doneCallbacks = [];
    if (typeof callback === "function") doneCallbacks.push(callback);
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status: status2,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status2 = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") item.status = "aborted";
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status2) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) if (!resources.length) failQuery();
      else execNext();
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index2 = config.resources.indexOf(item.resource);
      if (index2 !== -1 && index2 !== config.index) config.index = index2;
    }
    status2 = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status2 !== "pending") return;
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status2 === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status22, data) => {
        moduleResponse(item, status22, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(config, payload, queryCallback, (data, error) => {
      cleanup();
      if (doneCallback) doneCallback(data, error);
    });
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  return {
    query,
    find,
    setIndex: (index2) => {
      config.index = index2;
    },
    getIndex: () => config.index,
    cleanup
  };
}
function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) return;
    redundancyCache[provider] = {
      config,
      redundancy: initRedundancy(config)
    };
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) redundancy = cached.redundancy;
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const api = getAPIModule(target.resources ? target.resources[0] : "");
      if (api) send2 = api.send;
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function checkIconNamesForAPI(icons) {
  const valid = [];
  const invalid = [];
  icons.forEach((name) => {
    (name.match(matchIconName) ? valid : invalid).push(name);
  });
  return {
    valid,
    invalid
  };
}
function parseLoaderResponse(storage2, icons, data) {
  function checkMissing() {
    const pending = storage2.pendingIcons;
    icons.forEach((name) => {
      if (pending) pending.delete(name);
      if (!storage2.icons[name]) storage2.missing.add(name);
    });
  }
  if (data && typeof data === "object") try {
    if (!addIconSet(storage2, data).length) {
      checkMissing();
      return;
    }
  } catch (err) {
    console.error(err);
  }
  checkMissing();
  loadedNewIcons(storage2);
}
function parsePossiblyAsyncResponse(response, callback) {
  if (response instanceof Promise) response.then((data) => {
    callback(data);
  }).catch(() => {
    callback(null);
  });
  else callback(response);
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) storage2.iconsToLoad = icons;
  else storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      if (!icons2 || !icons2.length) return;
      const customIconLoader = storage2.loadIcon;
      if (storage2.loadIcons && (icons2.length > 1 || !customIconLoader)) {
        parsePossiblyAsyncResponse(storage2.loadIcons(icons2, prefix, provider), (data) => {
          parseLoaderResponse(storage2, icons2, data);
        });
        return;
      }
      if (customIconLoader) {
        icons2.forEach((name) => {
          parsePossiblyAsyncResponse(customIconLoader(name, prefix, provider), (data) => {
            parseLoaderResponse(storage2, [name], data ? {
              prefix,
              icons: { [name]: data }
            } : null);
          });
        });
        return;
      }
      const { valid, invalid } = checkIconNamesForAPI(icons2);
      if (invalid.length) parseLoaderResponse(storage2, invalid, null);
      if (!valid.length) return;
      const api = prefix.match(matchIconName) ? getAPIModule(provider) : null;
      if (!api) {
        parseLoaderResponse(storage2, valid, null);
        return;
      }
      api.prepare(provider, prefix, valid).forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          parseLoaderResponse(storage2, item.icons, data);
        });
      });
    });
  }
}
const loadIcons = (icons, callback) => {
  const sortedIcons = sortIcons(listToIcons(icons, true, allowSimpleNames()));
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) setTimeout(() => {
      if (callCallback) callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
    });
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) return;
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) providerNewIcons[prefix] = [];
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage2 = getStorage(provider, prefix);
    const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage2) => {
    const list = newIcons[storage2.provider][storage2.prefix];
    if (list.length) loadNewIcons(storage2, list);
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
const loadIcon$1 = (icon) => {
  return new Promise((fulfill, reject) => {
    const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
    if (!iconObj) {
      reject(icon);
      return;
    }
    loadIcons([iconObj || icon], (loaded) => {
      if (loaded.length && iconObj) {
        const data = getIconData(iconObj);
        if (data) {
          fulfill({
            ...defaultIconProps$1,
            ...data
          });
          return;
        }
      }
      reject(icon);
    });
  });
};
function setCustomIconsLoader(loader, prefix, provider) {
  getStorage("", prefix).loadIcons = loader;
}
function mergeCustomisations(defaults, item) {
  const result = { ...defaults };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations$1) {
      if (value === null || value && (valueType === "string" || valueType === "number")) result[key] = value;
    } else if (valueType === typeof result[key]) result[key] = key === "rotate" ? value % 4 : value;
  }
  return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    switch (str.trim()) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) value2 += 4;
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) return 0;
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML$1(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL$1(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData$1(svg) {
  return "data:image/svg+xml," + encodeSVGforURL$1(svg);
}
function svgToURL$1(svg) {
  return 'url("' + svgToData$1(svg) + '")';
}
const defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations$1,
  inline: false
};
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
const commonProps = {
  display: "inline-block"
};
const monotoneProps = {
  backgroundColor: "currentColor"
};
const coloredProps = {
  backgroundColor: "transparent"
};
const propsToAdd = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
};
const propsToAddTo = {
  webkitMask: monotoneProps,
  mask: monotoneProps,
  background: coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + prop] = propsToAdd[prop];
  }
}
const customisationAliases = {};
["horizontal", "vertical"].forEach((prefix) => {
  const attr = prefix.slice(0, 1) + "Flip";
  customisationAliases[prefix + "-flip"] = attr;
  customisationAliases[prefix.slice(0, 1) + "-flip"] = attr;
  customisationAliases[prefix + "Flip"] = attr;
});
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
const render = (icon, props) => {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const componentProps = { ...svgDefaults };
  const mode = props.mode || "svg";
  const style = {};
  const propsStyle = props.style;
  const customStyle = typeof propsStyle === "object" && !(propsStyle instanceof Array) ? propsStyle : {};
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      // Properties to ignore
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
      case "ssr":
      case "customise":
        break;
      // Boolean attributes
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      // Flip as string: 'horizontal,vertical'
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      // Color: override style
      case "color":
        style.color = value;
        break;
      // Rotation as string
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      // Remove aria-hidden
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default: {
        const alias = customisationAliases[key];
        if (alias) {
          if (value === true || value === "true" || value === 1) {
            customisations[alias] = true;
          }
        } else if (defaultExtendedIconCustomisations[key] === void 0) {
          componentProps[key] = value;
        }
      }
    }
  }
  const item = iconToSVG$1(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style.verticalAlign = "-0.125em";
  }
  if (mode === "svg") {
    componentProps.style = {
      ...style,
      ...customStyle
    };
    Object.assign(componentProps, renderAttribs);
    componentProps["innerHTML"] = replaceIDs(item.body);
    return h("svg", componentProps);
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML$1(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  componentProps.style = {
    ...style,
    "--svg": svgToURL$1(html),
    "width": fixSize(renderAttribs.width),
    "height": fixSize(renderAttribs.height),
    ...commonProps,
    ...useMask ? monotoneProps : coloredProps,
    ...customStyle
  };
  return h("span", componentProps);
};
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
const emptyIcon = {
  ...defaultIconProps$1,
  body: ""
};
const Icon = defineComponent((props, { emit }) => {
  const loader = ref(null);
  function abortLoading() {
    if (loader.value) {
      loader.value.abort?.();
      loader.value = null;
    }
  }
  const rendering = ref(!!props.ssr);
  const lastRenderedIconName = ref("");
  const iconData = shallowRef(null);
  function getIcon2() {
    const icon = props.icon;
    if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
      lastRenderedIconName.value = "";
      return {
        data: icon
      };
    }
    let iconName;
    if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
      return null;
    }
    let data = getIconData(iconName);
    if (!data) {
      const oldState = loader.value;
      if (!oldState || oldState.name !== icon) {
        if (data === null) {
          loader.value = {
            name: icon
          };
        } else {
          loader.value = {
            name: icon,
            abort: loadIcons([iconName], updateIconData)
          };
        }
      }
      return null;
    }
    abortLoading();
    if (lastRenderedIconName.value !== icon) {
      lastRenderedIconName.value = icon;
      nextTick(() => {
        emit("load", icon);
      });
    }
    const customise = props.customise;
    if (customise) {
      data = Object.assign({}, data);
      const customised = customise(data.body, iconName.name, iconName.prefix, iconName.provider);
      if (typeof customised === "string") {
        data.body = customised;
      }
    }
    const classes = ["iconify"];
    if (iconName.prefix !== "") {
      classes.push("iconify--" + iconName.prefix);
    }
    if (iconName.provider !== "") {
      classes.push("iconify--" + iconName.provider);
    }
    return { data, classes };
  }
  function updateIconData() {
    const icon = getIcon2();
    if (!icon) {
      iconData.value = null;
    } else if (icon.data !== iconData.value?.data) {
      iconData.value = icon;
    }
  }
  if (rendering.value) {
    updateIconData();
  }
  watch(() => props.icon, updateIconData);
  return () => {
    const icon = iconData.value;
    if (!icon) {
      return render(emptyIcon, props);
    }
    let newProps = props;
    if (icon.classes) {
      newProps = {
        ...props,
        class: icon.classes.join(" ")
      };
    }
    return render({
      ...defaultIconProps$1,
      ...icon.data
    }, newProps);
  };
}, {
  props: [
    // Icon and render mode
    "icon",
    "mode",
    "ssr",
    // Layout and style
    "width",
    "height",
    "style",
    "color",
    "inline",
    // Transformations
    "rotate",
    "hFlip",
    "horizontalFlip",
    "vFlip",
    "verticalFlip",
    "flip",
    // Misc
    "id",
    "ariaHidden",
    "customise",
    "title"
  ],
  emits: ["load"]
});
const _api = {
  getAPIConfig,
  setAPIModule,
  sendAPIQuery,
  setFetch,
  getFetch,
  listAPIProviders
};
const plugin_ilvJVEzIuslut37swn6Xql6BaXiR9g8XINDwYevwNag = /* @__PURE__ */ defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    const configs = /* @__PURE__ */ useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    const resources = [];
    if (options.provider === "server") {
      const baseURL2 = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
      resources.push(baseURL2 + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else if (options.provider === "none") {
      _api.setFetch(() => Promise.resolve(new Response()));
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    async function customIconLoader(icons, prefix) {
      try {
        const data = await $fetch(resources[0] + "/" + prefix + ".json", {
          query: {
            icons: icons.join(",")
          }
        });
        if (!data || data.prefix !== prefix || !data.icons)
          throw new Error("Invalid data" + JSON.stringify(data));
        return data;
      } catch (e) {
        console.error("Failed to load custom icons", e);
        return null;
      }
    }
    addAPIProvider("", { resources });
    for (const prefix of options.customCollections || []) {
      if (prefix)
        setCustomIconsLoader(customIconLoader, prefix);
    }
  }
  // For type portability
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});
const animateDirective = {
  getSSRProps() {
    return {};
  },
  mounted(el, binding) {
    return;
  },
  unmounted(el) {
    el.__animateObserver?.disconnect();
    delete el.__animateObserver;
  }
};
const animate_SOY3MdT9y6nth7Z_2uuSsrqX_2gKW_MbS3RsNZCyazs = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animate", animateDirective);
});
const personalInfo$1 = { "name": "Ricardo Morales", "title": "Software Engineer", "picture": "https://avatars.githubusercontent.com/u/5186093", "links": [{ "name": "LinkedIn", "url": "https://www.linkedin.com/in/drupalio", "icon": ["fab", "linkedin"] }, { "name": "Website", "url": "https://www.drupalio.com", "icon": ["fas", "globe"] }] };
const summary$1 = { "title": "About me", "summaryText": "Experienced system developer with a strong ability to navigate diverse tech stacks, prioritize clean and efficient coding, and embrace innovation. Committed, creative, and driven by continuous learning. Excel in fostering collaboration and delivering high-quality results. Passionate about both technology and gastronomy, strive to leverage my skills to create meaningful impacts across industries and communities." };
const workExperienceSection$1 = { "title": "Work Experience" };
const workExperience$1 = [{ "title": "Java Senior Developer", "company": "Multiplica Talent", "period": "Apr 2024 - Present", "icon": ["fas", "briefcase"], "projects": [{ "name": "Hive & Colony", "description": "Integrated and implemented Zoho One and Shopify for streamlined business operations", "technologies": ["Java", "Zoho One", "Shopify"] }, { "name": "Banorte", "description": "Developed templates and modules for Banorte's new public portal using MagnoliaCMS", "technologies": ["Java", "MagnoliaCMS", "HTML", "CSS", "JavaScript"] }, { "name": "Qualitas", "description": "Developed and integrated a CRM core using SQL/PLus stored procedures, functions and a Java backend", "technologies": ["Java", "SQL/PLus", "Oracle", "CRM"] }] }, { "title": "Java Microservices Developer", "company": "Globant", "period": "May 2019 - Feb 2024", "icon": ["fas", "microchip"], "projects": [{ "name": "QuizzerA", "description": "Customized GPT for key projects and developed an interview follow-up system to enhance feedback and efficiency", "technologies": ["Java", "Spring Boot", "GPT", "AI"] }, { "name": "Banco Nacional del Peru", "description": "Modernized online banking with microservices using the YAPE framework", "technologies": ["Java", "Microservices", "YAPE Framework"] }, { "name": "Round Feather", "description": "Built and maintained financial microservices with Quarkus and Kubernetes on Google Cloud, automating deployments with GitHub Actions", "technologies": ["Java", "Quarkus", "Kubernetes", "Google Cloud", "GitHub Actions"] }, { "name": "Santander", "description": "Led the transition of its banking platform to microservices architecture with Spring Boot", "technologies": ["Java", "Spring Boot", "Microservices"] }, { "name": "Expedia (Despegar & Hotels.com)", "description": "Ensured seamless integration and optimized microservices performance", "technologies": ["Java", "Microservices", "Performance Optimization"] }, { "name": "AEPE Energy", "description": "Optimized CI/CD processes, maintenance and scalable architecture", "technologies": ["Java", "CI/CD", "DevOps"] }, { "name": "Commodity Finance", "description": "Maintained microservices and web platforms", "technologies": ["Java", "Microservices", "Web Development"] }, { "name": "MyGrowth", "description": "Implemented strategic microservices to improve assessments and user experience", "technologies": ["Java", "Microservices", "UX"] }, { "name": "Disney", "description": "Co-developed batch processing infrastructure for invoicing and cinema payments", "technologies": ["Java", "Batch Processing", "Payment Systems"] }, { "name": "HSBC", "description": "Expanded microservices and modernized its digital banking platform", "technologies": ["Java", "Microservices", "Digital Banking"] }] }, { "title": "Java Ssr Developer", "company": "GFT Technologies", "period": "Mar 2017 - Apr 2019", "icon": ["fas", "briefcase"], "projects": [{ "name": "Glomo", "description": "Migrated BBVA Bancomer's banking platform from a monolithic to a microservices architecture using CXF Spring Framework and BBVA's SDLO, applying SOLID principles and continuous integration", "technologies": ["Java", "CXF Spring Framework", "BBVA SDLO", "Microservices", "CI/CD"] }, { "name": "Claims", "description": "Provided first-level support for BBVA's claims system and developed core APIs for the claims engine/core system", "technologies": ["Java", "API Development", "Support"] }] }, { "title": "Java Specialist", "company": "Telcel Radio Dipsa", "period": "Jun 2015 - Mar 2017", "icon": ["fas", "mobile-alt"], "projects": [{ "name": "Telcel Blue Circle", "description": "Rebuilt the reactive campaigns engine and Telcel Blue Circle rewards system ", "technologies": ["Java", "Reactive Programming", "Rewards System"] }] }, { "title": "Java Developer", "company": "Grupo Salinas Dinero Expres", "period": "Apr 2015 - Jul 2015", "icon": ["fas", "money-bill-wave"], "projects": [{ "name": "Money Transfer System", "description": "Migrated Money Transfer WebServices (SOA) from Oracle Application Server to JBoss EAP", "technologies": ["Java", "SOA", "Oracle Application Server", "JBoss EAP"] }] }, { "title": "Java Developer Jr", "company": "MXD Solutions", "period": "Jun 2014 - Apr 2015", "icon": ["fas", "code"], "projects": [{ "name": "Money Transfer System", "description": "Migrated Money Transfer WebServices (SOA) from Oracle Application Server to JBoss EAP", "technologies": ["Java", "SOA", "Oracle Application Server", "JBoss EAP"] }] }, { "title": "Web Developer", "company": "Remodelaciones Industriales", "period": "Jan 2013 - Aug 2013", "icon": ["fas", "laptop-code"], "projects": [{ "name": "Client Management System", "description": "Developed, maintained and supported the CMS for client management", "technologies": ["PHP", "MySQL", "HTML", "CSS", "JavaScript"] }] }];
const education$1 = { "formalEducation": [{ "degree": "Bachelor of Computer System Engineering", "institution": "Tecnologico de estudios superiores de Ecatepec", "period": "Aug 2015 - Aug 2018" }, { "degree": "Computer Technician", "institution": "Centro de Estudios tecnologicos y de servicios numero 55", "period": "Jun 2005 - Aug 2008" }], "certifications": [{ "title": "Oracle Certified Associate Java", "platform": "Oracle", "issue_date": "Feb 2015", "credential_id": "237614080OCAJSE7", "icon": ["fab", "java"] }, { "title": "Scrum Fundamentals Certified", "platform": "VMEdu Inc.", "issue_date": "Apr 2018", "credential_id": "623619", "icon": ["fas", "users-cog"] }, { "title": "Introduction to Containers and Kubernetes", "platform": "Cloudevel®", "issue_date": "Sep 2020", "credential_id": "RMP-atikak8a", "icon": ["fab", "docker"] }], "courses": [{ "title": "Lambda Expressions and Streams in Java", "platform": "Udemy", "completion_date": "Dec 2023", "course_id": "UC-88a6eec7-1069-43ad-896c-cdc6965d9e16", "link": "https://ude.my/UC-88a6eec7-1069-43ad-896c-cdc6965d9e16", "icon": ["fas", "book"] }, { "title": "Communication Skills: Improve Your Communication", "platform": "Udemy", "completion_date": "Nov 2022", "course_id": "UC-7f69003d-0d60-4001-92fd-96a31cc19794", "link": "https://www.udemy.com/certificate/UC-7f69003d-0d60-4001-92fd-96a31cc19794", "icon": ["fas", "book"] }, { "title": "Leadership: Practical Leadership Skills", "platform": "Udemy", "completion_date": "Oct 2022", "course_id": "UC-ac5f7a9d-a0b9-4946-a3f5-9b716187068a", "link": "https://www.udemy.com/certificate/UC-ac5f7a9d-a0b9-4946-a3f5-9b716187068a", "icon": ["fas", "book"] }, { "title": "Learn to Program with GO", "platform": "Udemy", "completion_date": "Jun 2022", "course_id": "UC-18c498c4-d7b4-4db7-82ed-f429de7118e3", "link": "https://www.udemy.com/certificate/UC-18c498c4-d7b4-4db7-82ed-f429de7118e3/", "icon": ["fas", "book"] }, { "title": "Advanced Rust: Managing Projects", "platform": "LinkedIn", "completion_date": "May 2022", "link": "https://www.linkedin.com/learning/certificates/9cecaceaf16eedc5424645a18906233c6804aafe27e1ec79ff57bb32c094a38a", "icon": ["fab", "linkedin"] }, { "title": "Complete Jakarta EE 9 Guide: Java EE 9 from Beginner to Expert 2022", "platform": "Udemy", "completion_date": "May 2022", "course_id": "UC-766c49c2-cc32-4a65-b0c4-21c93e53fb92", "link": "https://www.udemy.com/certificate/UC-766c49c2-cc32-4a65-b0c4-21c93e53fb92", "icon": ["fas", "book"] }, { "title": "Microservices with Spring Boot, Cloud and Docker", "platform": "Udemy", "completion_date": "May 2022", "course_id": "UC-fef1b7d2-b227-417d-b6d8-604fe0251bae", "link": "https://www.udemy.com/certificate/UC-fef1b7d2-b227-417d-b6d8-604fe0251bae", "icon": ["fas", "book"] }, { "title": "Quarkus Fundamentals", "platform": "LinkedIn", "completion_date": "May 2022", "icon": ["fab", "linkedin"] }, { "title": "Rust Tips and Tricks", "platform": "LinkedIn", "completion_date": "May 2022", "icon": ["fab", "linkedin"] }, { "title": "All About Dotfiles", "platform": "CodelyTV", "completion_date": "Sep 2021", "icon": ["fas", "tv"] }, { "title": "Complete NoSQL Databases Guide with MongoDB and NodeJS", "platform": "Mastermind", "completion_date": "Jul 2021", "icon": ["fas", "brain"] }, { "title": "Android Architecture Masterclass", "platform": "Udemy", "completion_date": "May 2021", "course_id": "UC-0bc51045-bf1c-45e9-95b5-ad7eeeddaa53", "link": "https://www.udemy.com/certificate/UC-0bc51045-bf1c-45e9-95b5-ad7eeeddaa53", "icon": ["fas", "book"] }, { "title": "Android Unit Testing and Test Driven Development", "platform": "Udemy", "completion_date": "May 2021", "course_id": "UC-8d2c8311-9295-41be-9fd0-d91c3eb381ab", "link": "https://www.udemy.com/certificate/UC-8d2c8311-9295-41be-9fd0-d91c3eb381ab", "icon": ["fas", "book"] }, { "title": "Take Your First Steps with Rust", "platform": "Microsoft", "completion_date": "May 2021", "icon": ["fab", "microsoft"] }, { "title": "The Complete Android 11 Jetpack Masterclass 2021", "platform": "Udemy", "completion_date": "May 2021", "course_id": "UC-8ddbda67-c27a-4681-ba64-9e815c4a8030", "link": "https://www.udemy.com/certificate/UC-8ddbda67-c27a-4681-ba64-9e815c4a8030", "icon": ["fas", "book"] }, { "title": "Rust Fundamentals", "platform": "Pluralsight", "completion_date": "Apr 2021", "course_id": "4127", "icon": ["fas", "play-circle"] }, { "title": "Creating RESTful Services with PHP/MySQL (CodeIgniter 3)", "platform": "Udemy", "completion_date": "Mar 2021", "course_id": "UC-898bec2c-1ef3-4015-a8e5-8102e5b93984", "link": "https://www.udemy.com/certificate/UC-898bec2c-1ef3-4015-a8e5-8102e5b93984", "icon": ["fas", "book"] }, { "title": "Creating Offline-first Mobile Apps with HTML5", "platform": "Pluralsight", "completion_date": "Mar 2021", "course_id": "4127", "icon": ["fas", "play-circle"] }, { "title": "Full Stack Development with Laravel & VueJS", "platform": "Mastermind", "completion_date": "Mar 2021", "course_id": "237614080OCAJSE7", "icon": ["fas", "brain"] }, { "title": "Getting Started with WebAssembly & Emscripten", "platform": "Udemy", "completion_date": "Mar 2021", "course_id": "UC-b19c663c-900a-404f-9bfe-b4d8441aa5c2", "link": "https://www.udemy.com/certificate/UC-b19c663c-900a-404f-9bfe-b4d8441aa5c2", "icon": ["fas", "book"] }] };
const certifications$1 = [{ "title": "Oracle Certified Associate Java", "platform": "Oracle", "issue_date": "Feb 2015", "credential_id": "237614080OCAJSE7", "icon": ["fab", "java"] }, { "title": "Scrum Fundamentals Certified", "platform": "VMEdu Inc.", "issue_date": "Apr 2018", "credential_id": "623619", "icon": ["fas", "users-cog"] }, { "title": "Introduction to Containers and Kubernetes", "platform": "Cloudevel®", "issue_date": "Sep 2020", "credential_id": "RMP-atikak8a", "icon": ["fab", "docker"] }];
const courses$1 = [{ "title": "Lambda Expressions and Streams in Java", "platform": "Udemy", "completion_date": "Dec 2023", "icon": ["fas", "book"] }, { "title": "Communication Skills: Improve Your Communication", "platform": "Udemy", "completion_date": "Nov 2022", "icon": ["fas", "book"] }, { "title": "Leadership: Practical Leadership Skills", "platform": "Udemy", "completion_date": "Oct 2022", "icon": ["fas", "book"] }, { "title": "Learn to Program with GO", "platform": "Udemy", "completion_date": "Jun 2022", "icon": ["fas", "book"] }, { "title": "Advanced Rust: Managing Projects", "platform": "LinkedIn", "completion_date": "May 2022", "icon": ["fab", "linkedin"] }];
const skills$1 = { "categories": { "programming": "Programming Languages", "devFrameworks": "Development Frameworks", "testFrameworks": "Testing Frameworks", "databases": "Databases", "cloud": "Cloud Providers", "servers": "Servers & Containers" }, "programmingLanguages": [{ "name": "Java (17+)", "level": "Expert", "icon": ["fab", "java"] }, { "name": "Kotlin", "level": "Experienced", "icon": ["fab", "android"] }, { "name": "PHP", "level": "Experienced", "icon": ["fab", "php"] }, { "name": "Python", "level": "Experienced", "icon": ["fab", "python"] }, { "name": "JavaScript", "level": "Experienced", "icon": ["fab", "js"] }, { "name": "TypeScript", "level": "Experienced", "icon": ["fab", "js-square"] }, { "name": "Ruby", "level": "Proficient", "icon": ["fas", "gem"] }, { "name": "Rust", "level": "Proficient", "icon": ["fas", "cog"] }, { "name": "GoLang", "level": "Proficient", "icon": ["fas", "code"] }, { "name": "C#", "level": "Proficient", "icon": ["fab", "microsoft"] }, { "name": "C++", "level": "Proficient", "icon": ["fas", "code"] }, { "name": "Ziglang", "level": "Proficient", "icon": ["fas", "bolt"] }, { "name": "Swift", "level": "Proficient", "icon": ["fab", "apple"] }], "cloudProviders": [{ "name": "AWS", "level": "Experienced", "icon": ["fab", "aws"] }, { "name": "Google Cloud Platform", "level": "Proficient", "icon": ["fab", "google"] }, { "name": "Azure", "level": "Proficient", "icon": ["fab", "microsoft"] }], "serversAndContainers": [{ "name": "Tomcat", "level": "Experienced", "icon": ["fas", "server"] }, { "name": "Glassfish", "level": "Experienced", "icon": ["fas", "fish"] }, { "name": "IBM WebSphere", "level": "Proficient", "icon": ["fas", "globe"] }, { "name": "OpenLiberty", "level": "Proficient", "icon": ["fas", "flag"] }, { "name": "Apache", "level": "Experienced", "icon": ["fas", "feather"] }, { "name": "Payara", "level": "Proficient", "icon": ["fas", "fish"] }, { "name": "Jboss", "level": "Experienced", "icon": ["fas", "fire"] }, { "name": "Openshift", "level": "Proficient", "icon": ["fas", "ship"] }, { "name": "DOCKER", "level": "Experienced", "icon": ["fab", "docker"] }, { "name": "Kubernetes", "level": "Experienced", "icon": ["fas", "dharmachakra"] }], "developmentFrameworks": [{ "name": "Spring Framework", "level": "Expert", "icon": ["fas", "leaf"] }, { "name": "Quarkus", "level": "Experienced", "icon": ["fas", "bolt"] }, { "name": "Helidon", "level": "Proficient", "icon": ["fas", "sun"] }, { "name": "Hibernate", "level": "Experienced", "icon": ["fas", "database"] }, { "name": "EJB", "level": "Proficient", "icon": ["fas", "cubes"] }, { "name": "Apache Camel", "level": "Proficient", "icon": ["fas", "exchange-alt"] }, { "name": "Bootstrap", "level": "Proficient", "icon": ["fab", "bootstrap"] }, { "name": "Apache Kafka", "level": "Experienced", "icon": ["fas", "stream"] }, { "name": "RabbitMQ", "level": "Proficient", "icon": ["fas", "envelope"] }, { "name": "CodeIgniter", "level": "Proficient", "icon": ["fas", "fire"] }, { "name": "Vue.js", "level": "Proficient", "icon": ["fab", "vuejs"] }, { "name": "Django", "level": "Proficient", "icon": ["fab", "python"] }, { "name": "Express.js", "level": "Proficient", "icon": ["fab", "node-js"] }, { "name": "Wordpress", "level": "Proficient", "icon": ["fab", "wordpress"] }, { "name": "Drupal", "level": "Proficient", "icon": ["fab", "drupal"] }, { "name": "Foundation", "level": "Proficient", "icon": ["fas", "layer-group"] }, { "name": "Angular", "level": "Proficient", "icon": ["fab", "angular"] }, { "name": "jQuery", "level": "Proficient", "icon": ["fab", "js"] }, { "name": "Knockout", "level": "Proficient", "icon": ["fas", "box-open"] }, { "name": "Cordova", "level": "Proficient", "icon": ["fab", "android"] }, { "name": "Primefaces", "level": "Proficient", "icon": ["fas", "window-maximize"] }, { "name": "Flask", "level": "Proficient", "icon": ["fas", "flask"] }, { "name": "Gatsby", "level": "Proficient", "icon": ["fab", "react"] }, { "name": "Laravel", "level": "Proficient", "icon": ["fab", "laravel"] }, { "name": "React", "level": "Proficient", "icon": ["fab", "react"] }, { "name": "Next.js", "level": "Proficient", "icon": ["fab", "react"] }] };
const softSkillsSection$1 = { "title": "Soft Skills", "description": "Key personal attributes that complement my technical expertise:" };
const softSkills$1 = [{ "name": "Outside of the Box Thinker", "icon": ["fas", "lightbulb"] }, { "name": "Team Player", "icon": ["fas", "users"] }, { "name": "Leadership", "icon": ["fas", "user-tie"] }, { "name": "Fast Learner", "icon": ["fas", "book-reader"] }, { "name": "Adaptability", "icon": ["fas", "sync-alt"] }, { "name": "Critical Thinking", "icon": ["fas", "brain"] }, { "name": "Problem Solver", "icon": ["fas", "puzzle-piece"] }, { "name": "Teamwork", "icon": ["fas", "handshake"] }];
const nav$1 = { "about": "About", "experience": "Experience", "projects": "Projects", "stack": "Stack", "contact": "Contact", "writing": "Writing" };
const hero$1 = { "greeting": "Hello, I'm", "tagline": "Systems engineer focused on backend architecture, AI integration, and performance. I build resilient, high-throughput systems — from banking platforms processing millions of transactions to AI-assisted development tools." };
const status$1 = { "available": "Available for work", "location": "Location", "city": "Mexico City, MX", "connect": "Connect" };
const contact$1 = { "heading": "Let's build something resilient.", "body": "Open to engineering roles, architecture consulting, and AI systems work.", "email": "hello@drupalio.dev" };
const footer$1 = { "built": "Built with Nuxt 3, Tailwind v4, and care." };
const stack$1 = { "title": "Stack" };
const enData = {
  personalInfo: personalInfo$1,
  summary: summary$1,
  workExperienceSection: workExperienceSection$1,
  workExperience: workExperience$1,
  education: education$1,
  certifications: certifications$1,
  courses: courses$1,
  skills: skills$1,
  softSkillsSection: softSkillsSection$1,
  softSkills: softSkills$1,
  nav: nav$1,
  hero: hero$1,
  status: status$1,
  contact: contact$1,
  footer: footer$1,
  stack: stack$1
};
const personalInfo = { "name": "Ricardo Morales", "title": "Ingeniero de Software", "picture": "https://avatars.githubusercontent.com/u/5186093", "links": [{ "name": "LinkedIn", "url": "https://www.linkedin.com/in/drupalio", "icon": ["fab", "linkedin"] }, { "name": "Sitio Web", "url": "https://www.drupalio.com", "icon": ["fas", "globe"] }] };
const summary = { "title": "Sobre mí", "summaryText": "Desarrollador de sistemas con experiencia y una sólida capacidad para navegar por diversos stacks tecnológicos, priorizando un código limpio y eficiente, y abrazando la innovación. Comprometido, creativo y motivado por el aprendizaje continuo. Destaco en fomentar la colaboración y entregar resultados de alta calidad. Apasionado tanto por la tecnología como por la gastronomía, busco aprovechar mis habilidades para crear impactos significativos en diversas industrias y comunidades." };
const workExperienceSection = { "title": "Experiencias Laborales" };
const workExperience = [{ "title": "Desarrollador Senior Java", "company": "Multiplica Talent", "period": "Abr 2024 - Presente", "icon": ["fas", "briefcase"], "projects": [{ "name": "Hive & Colony", "description": "Integración e implementación de Zoho One y Shopify para operaciones empresariales optimizadas", "technologies": ["Java", "Zoho One", "Shopify"] }, { "name": "Banorte", "description": "Desarrollo de plantillas y módulos para el nuevo portal público de Banorte usando MagnoliaCMS", "technologies": ["Java", "MagnoliaCMS", "HTML", "CSS", "JavaScript"] }, { "name": "Qualitas", "description": "Desarrollo e integración del núcleo CRM utilizando procedimientos almacenados, funciones SQL/PLus y backend en Java", "technologies": ["Java", "SQL/PLus", "Oracle", "CRM"] }] }, { "title": "Desarrollador de Microservicios Java", "company": "Globant", "period": "May 2019 - Feb 2024", "icon": ["fas", "microchip"], "projects": [{ "name": "QuizzerA", "description": "Personalización de GPT para proyectos clave y desarrollo de sistema de seguimiento de entrevistas para mejorar la retroalimentación y eficiencia", "technologies": ["Java", "Spring Boot", "GPT", "AI"] }, { "name": "Banco Nacional del Perú", "description": "Modernización de banca en línea con microservicios usando el framework YAPE", "technologies": ["Java", "Microservicios", "YAPE Framework"] }, { "name": "Round Feather", "description": "Construcción y mantenimiento de microservicios financieros con Quarkus y Kubernetes en Google Cloud, automatizando despliegues con GitHub Actions", "technologies": ["Java", "Quarkus", "Kubernetes", "Google Cloud", "GitHub Actions"] }, { "name": "Santander", "description": "Liderazgo en la transición de la plataforma bancaria a arquitectura de microservicios con Spring Boot", "technologies": ["Java", "Spring Boot", "Microservicios"] }, { "name": "Expedia (Despegar & Hotels.com)", "description": "Integración fluida y optimización del rendimiento de microservicios", "technologies": ["Java", "Microservicios", "Optimización de Rendimiento"] }, { "name": "AEPE Energy", "description": "Optimización de procesos CI/CD, mantenimiento y arquitectura escalable", "technologies": ["Java", "CI/CD", "DevOps"] }, { "name": "Commodity Finance", "description": "Mantenimiento de microservicios y plataformas web", "technologies": ["Java", "Microservicios", "Desarrollo Web"] }, { "name": "MyGrowth", "description": "Implementación de microservicios estratégicos para mejorar evaluaciones y experiencia de usuario", "technologies": ["Java", "Microservicios", "UX"] }, { "name": "Disney", "description": "Co-desarrollo de infraestructura de procesamiento por lotes para facturación y pagos de cine", "technologies": ["Java", "Procesamiento por lotes", "Sistemas de Pago"] }, { "name": "HSBC", "description": "Expansión de microservicios y modernización de plataforma bancaria digital", "technologies": ["Java", "Microservicios", "Banca Digital"] }] }, { "title": "Java Ssr Developer", "company": "GFT Technologies", "period": "Mar 2017 - Abr 2019", "icon": ["fas", "briefcase"], "projects": [{ "name": "Glomo", "description": "Migración de la plataforma bancaria de BBVA Bancomer de una arquitectura monolítica a microservicios utilizando CXF Spring Framework y SDLO de BBVA, aplicando principios SOLID e integración continua", "technologies": ["Java", "CXF Spring Framework", "BBVA SDLO", "Microservicios", "CI/CD"] }, { "name": "Claims", "description": "Soporte de primer nivel para sistema de reclamaciones de BBVA y desarrollo de APIs centrales para el motor y sistema de reclamaciones", "technologies": ["Java", "Desarrollo de API", "Soporte"] }] }, { "title": "Especialista Java", "company": "Telcel Radio Dipsa", "period": "Jun 2015 - Mar 2017", "icon": ["fas", "mobile-alt"], "projects": [{ "name": "Telcel Blue Circle", "description": "Reconstrucción del motor de campañas reactivas y sistema de recompensas Telcel Blue Circle", "technologies": ["Java", "Programación Reactiva", "Sistema de Recompensas"] }] }, { "title": "Desarrollador Java", "company": "Grupo Salinas Dinero Expres", "period": "Abr 2015 - Jul 2015", "icon": ["fas", "money-bill-wave"], "projects": [{ "name": "Sistema de Transferencia de Dinero", "description": "Migración de servicios web de transferencias de dinero (SOA) de Oracle Application Server a JBoss EAP", "technologies": ["Java", "SOA", "Oracle Application Server", "JBoss EAP"] }] }, { "title": "Desarrollador Java Jr", "company": "MXD Solutions", "period": "Jun 2014 - Abr 2015", "icon": ["fas", "code"], "projects": [{ "name": "Sistema de Transferencia de Dinero", "description": "Migración de servicios web de transferencias de dinero (SOA) de Oracle Application Server a JBoss EAP", "technologies": ["Java", "SOA", "Oracle Application Server", "JBoss EAP"] }] }, { "title": "Desarrollador Web", "company": "Remodelaciones Industriales", "period": "Ene 2013 - Ago 2013", "icon": ["fas", "laptop-code"], "projects": [{ "name": "Sistema de Gestión de Clientes", "description": "Desarrollo, mantenimiento y soporte del CMS para la gestión de clientes", "technologies": ["PHP", "MySQL", "HTML", "CSS", "JavaScript"] }] }];
const education = { "formalEducation": [{ "degree": "Ingeniería en Sistemas Computacionales", "institution": "Tecnológico de estudios superiores de Ecatepec", "period": "Ago 2015 - Ago 2018" }, { "degree": "Técnico en computación", "institution": "Centro de Estudios tecnológicos y de servicios número 55", "period": "Jun 2005 - Ago 2008" }], "certifications": [{ "title": "Oracle Certified Associate Java", "platform": "Oracle", "issue_date": "Feb 2015", "credential_id": "237614080OCAJSE7", "icon": ["fab", "java"] }, { "title": "Scrum Fundamentals Certified", "platform": "VMEdu Inc.", "issue_date": "Abr 2018", "credential_id": "623619", "icon": ["fas", "users-cog"] }, { "title": "Introducción a Contenedores y Kubernetes", "platform": "Cloudevel®", "issue_date": "Sep 2020", "credential_id": "RMP-atikak8a", "icon": ["fab", "docker"] }], "courses": [{ "title": "Expresiones Lambda y Streams en Java", "platform": "Udemy", "completion_date": "Dic 2023", "course_id": "UC-88a6eec7-1069-43ad-896c-cdc6965d9e16", "link": "https://ude.my/UC-88a6eec7-1069-43ad-896c-cdc6965d9e16", "icon": ["fas", "book"] }, { "title": "Habilidades de Comunicación: Mejora Tu Comunicación", "platform": "Udemy", "completion_date": "Nov 2022", "course_id": "UC-7f69003d-0d60-4001-92fd-96a31cc19794", "link": "https://www.udemy.com/certificate/UC-7f69003d-0d60-4001-92fd-96a31cc19794", "icon": ["fas", "book"] }, { "title": "Liderazgo: Habilidades Prácticas de Liderazgo", "platform": "Udemy", "completion_date": "Oct 2022", "course_id": "UC-ac5f7a9d-a0b9-4946-a3f5-9b716187068a", "link": "https://www.udemy.com/certificate/UC-ac5f7a9d-a0b9-4946-a3f5-9b716187068a", "icon": ["fas", "book"] }, { "title": "Aprende a Programar con GO", "platform": "Udemy", "completion_date": "Jun 2022", "course_id": "UC-18c498c4-d7b4-4db7-82ed-f429de7118e3", "link": "https://www.udemy.com/certificate/UC-18c498c4-d7b4-4db7-82ed-f429de7118e3/", "icon": ["fas", "book"] }, { "title": "Rust Avanzado: Gestión de Proyectos", "platform": "LinkedIn", "completion_date": "May 2022", "link": "https://www.linkedin.com/learning/certificates/9cecaceaf16eedc5424645a18906233c6804aafe27e1ec79ff57bb32c094a38a", "icon": ["fab", "linkedin"] }, { "title": "Guía Completa de Jakarta EE 9: Java EE 9 de Principiante a Experto 2022", "platform": "Udemy", "completion_date": "May 2022", "course_id": "UC-766c49c2-cc32-4a65-b0c4-21c93e53fb92", "link": "https://www.udemy.com/certificate/UC-766c49c2-cc32-4a65-b0c4-21c93e53fb92", "icon": ["fas", "book"] }, { "title": "Microservicios con Spring Boot, Cloud y Docker", "platform": "Udemy", "completion_date": "May 2022", "course_id": "UC-fef1b7d2-b227-417d-b6d8-604fe0251bae", "link": "https://www.udemy.com/certificate/UC-fef1b7d2-b227-417d-b6d8-604fe0251bae", "icon": ["fas", "book"] }, { "title": "Fundamentos de Quarkus", "platform": "LinkedIn", "completion_date": "May 2022", "icon": ["fab", "linkedin"] }, { "title": "Consejos y Trucos de Rust", "platform": "LinkedIn", "completion_date": "May 2022", "icon": ["fab", "linkedin"] }, { "title": "Todo Sobre Dotfiles", "platform": "CodelyTV", "completion_date": "Sep 2021", "icon": ["fas", "tv"] }, { "title": "Guía Completa de Bases de Datos NoSQL con MongoDB y NodeJS", "platform": "Mastermind", "completion_date": "Jul 2021", "icon": ["fas", "brain"] }, { "title": "Masterclass de Arquitectura Android", "platform": "Udemy", "completion_date": "May 2021", "course_id": "UC-0bc51045-bf1c-45e9-95b5-ad7eeeddaa53", "link": "https://www.udemy.com/certificate/UC-0bc51045-bf1c-45e9-95b5-ad7eeeddaa53", "icon": ["fas", "book"] }, { "title": "Pruebas Unitarias en Android y Desarrollo Dirigido por Pruebas", "platform": "Udemy", "completion_date": "May 2021", "course_id": "UC-8d2c8311-9295-41be-9fd0-d91c3eb381ab", "link": "https://www.udemy.com/certificate/UC-8d2c8311-9295-41be-9fd0-d91c3eb381ab", "icon": ["fas", "book"] }, { "title": "Primeros Pasos con Rust", "platform": "Microsoft", "completion_date": "May 2021", "icon": ["fab", "microsoft"] }, { "title": "Masterclass Completa de Android 11 Jetpack 2021", "platform": "Udemy", "completion_date": "May 2021", "course_id": "UC-8ddbda67-c27a-4681-ba64-9e815c4a8030", "link": "https://www.udemy.com/certificate/UC-8ddbda67-c27a-4681-ba64-9e815c4a8030", "icon": ["fas", "book"] }, { "title": "Fundamentos de Rust", "platform": "Pluralsight", "completion_date": "Abr 2021", "course_id": "4127", "icon": ["fas", "play-circle"] }, { "title": "Creación de Servicios RESTful con PHP/MySQL (CodeIgniter 3)", "platform": "Udemy", "completion_date": "Mar 2021", "course_id": "UC-898bec2c-1ef3-4015-a8e5-8102e5b93984", "link": "https://www.udemy.com/certificate/UC-898bec2c-1ef3-4015-a8e5-8102e5b93984", "icon": ["fas", "book"] }, { "title": "Creación de Aplicaciones Móviles Offline-first con HTML5", "platform": "Pluralsight", "completion_date": "Mar 2021", "course_id": "4127", "icon": ["fas", "play-circle"] }, { "title": "Desarrollo Full Stack con Laravel y VueJS", "platform": "Mastermind", "completion_date": "Mar 2021", "course_id": "237614080OCAJSE7", "icon": ["fas", "brain"] }, { "title": "Introducción a WebAssembly y Emscripten", "platform": "Udemy", "completion_date": "Mar 2021", "course_id": "UC-b19c663c-900a-404f-9bfe-b4d8441aa5c2", "link": "https://www.udemy.com/certificate/UC-b19c663c-900a-404f-9bfe-b4d8441aa5c2", "icon": ["fas", "book"] }] };
const certifications = [{ "title": "Oracle Certified Associate Java", "platform": "Oracle", "issue_date": "Feb 2015", "credential_id": "237614080OCAJSE7", "icon": ["fab", "java"] }, { "title": "Scrum Fundamentals Certified", "platform": "VMEdu Inc.", "issue_date": "Abr 2018", "credential_id": "623619", "icon": ["fas", "users-cog"] }, { "title": "Introducción a Contenedores y Kubernetes", "platform": "Cloudevel®", "issue_date": "Sep 2020", "credential_id": "RMP-atikak8a", "icon": ["fab", "docker"] }];
const courses = [{ "title": "Expresiones Lambda y Streams en Java", "platform": "Udemy", "completion_date": "Dic 2023", "icon": ["fas", "book"] }, { "title": "Habilidades de Comunicación: Mejora Tu Comunicación", "platform": "Udemy", "completion_date": "Nov 2022", "icon": ["fas", "book"] }, { "title": "Liderazgo: Habilidades Prácticas de Liderazgo", "platform": "Udemy", "completion_date": "Oct 2022", "icon": ["fas", "book"] }, { "title": "Aprende a Programar con GO", "platform": "Udemy", "completion_date": "Jun 2022", "icon": ["fas", "book"] }, { "title": "Rust Avanzado: Gestión de Proyectos", "platform": "LinkedIn", "completion_date": "May 2022", "icon": ["fab", "linkedin"] }];
const skills = { "categories": { "programming": "Lenguajes de Programación", "devFrameworks": "Frameworks de Desarrollo", "testFrameworks": "Frameworks de Pruebas", "databases": "Bases de Datos", "cloud": "Proveedores de Nube", "servers": "Servidores y Contenedores" }, "programmingLanguages": [{ "name": "Java (17 y superior)", "level": "Experto", "icon": ["fab", "java"] }, { "name": "Kotlin", "level": "Experimentado", "icon": ["fab", "android"] }, { "name": "PHP", "level": "Experimentado", "icon": ["fab", "php"] }, { "name": "Python", "level": "Experimentado", "icon": ["fab", "python"] }, { "name": "JavaScript", "level": "Experimentado", "icon": ["fab", "js"] }, { "name": "TypeScript", "level": "Experimentado", "icon": ["fab", "js-square"] }, { "name": "Ruby", "level": "Hábil", "icon": ["fas", "gem"] }, { "name": "Rust", "level": "Hábil", "icon": ["fas", "cog"] }, { "name": "GoLang", "level": "Hábil", "icon": ["fas", "code"] }, { "name": "C#", "level": "Hábil", "icon": ["fab", "microsoft"] }, { "name": "C++", "level": "Hábil", "icon": ["fas", "code"] }, { "name": "Ziglang", "level": "Hábil", "icon": ["fas", "bolt"] }, { "name": "Swift", "level": "Hábil", "icon": ["fab", "apple"] }], "cloudProviders": [{ "name": "AWS", "level": "Experimentado", "icon": ["fab", "aws"] }, { "name": "Google Cloud Platform", "level": "Hábil", "icon": ["fab", "google"] }, { "name": "Azure", "level": "Hábil", "icon": ["fab", "microsoft"] }], "serversAndContainers": [{ "name": "Tomcat", "level": "Experimentado", "icon": ["fas", "server"] }, { "name": "Glassfish", "level": "Experimentado", "icon": ["fas", "fish"] }, { "name": "IBM WebSphere", "level": "Hábil", "icon": ["fas", "globe"] }, { "name": "OpenLiberty", "level": "Hábil", "icon": ["fas", "flag"] }, { "name": "Apache", "level": "Experimentado", "icon": ["fas", "feather"] }, { "name": "Payara", "level": "Hábil", "icon": ["fas", "fish"] }, { "name": "Jboss", "level": "Experimentado", "icon": ["fas", "fire"] }, { "name": "Openshift", "level": "Hábil", "icon": ["fas", "ship"] }, { "name": "DOCKER", "level": "Experimentado", "icon": ["fab", "docker"] }, { "name": "Kubernetes", "level": "Experimentado", "icon": ["fas", "dharmachakra"] }], "frameworks": [{ "name": "Spring Framework", "level": "Experto", "icon": ["fas", "leaf"] }, { "name": "Swagger", "level": "Experimentado", "icon": ["fas", "file-code"] }, { "name": "Junit", "level": "Experimentado", "icon": ["fas", "vial"] }, { "name": "Mockito", "level": "Experimentado", "icon": ["fas", "vials"] }, { "name": "Selenium", "level": "Hábil", "icon": ["fas", "atom"] }, { "name": "Quarkus", "level": "Experimentado", "icon": ["fas", "bolt"] }, { "name": "Helidon", "level": "Hábil", "icon": ["fas", "sun"] }, { "name": "ELK", "level": "Experimentado", "icon": ["fas", "search"] }, { "name": "Hibernate", "level": "Experimentado", "icon": ["fas", "database"] }, { "name": "EJB", "level": "Hábil", "icon": ["fas", "cubes"] }, { "name": "Apache Camel", "level": "Hábil", "icon": ["fas", "exchange-alt"] }, { "name": "Bootstrap", "level": "Hábil", "icon": ["fab", "bootstrap"] }, { "name": "Apache Kafka", "level": "Experimentado", "icon": ["fas", "stream"] }, { "name": "RabbitMQ", "level": "Hábil", "icon": ["fas", "envelope"] }, { "name": "CodeIgniter", "level": "Hábil", "icon": ["fas", "fire"] }, { "name": "VUE", "level": "Hábil", "icon": ["fab", "vuejs"] }, { "name": "Django", "level": "Hábil", "icon": ["fab", "python"] }, { "name": "Express.js", "level": "Hábil", "icon": ["fab", "node-js"] }, { "name": "Wordpress", "level": "Hábil", "icon": ["fab", "wordpress"] }, { "name": "Drupal", "level": "Hábil", "icon": ["fab", "drupal"] }, { "name": "Foundation", "level": "Hábil", "icon": ["fas", "layer-group"] }, { "name": "Angular", "level": "Hábil", "icon": ["fab", "angular"] }, { "name": "Jquery", "level": "Hábil", "icon": ["fab", "js"] }, { "name": "Knockout", "level": "Hábil", "icon": ["fas", "box-open"] }, { "name": "Cordova", "level": "Hábil", "icon": ["fab", "android"] }, { "name": "Primefaces", "level": "Hábil", "icon": ["fas", "window-maximize"] }, { "name": "Flask", "level": "Hábil", "icon": ["fas", "flask"] }, { "name": "Gatsby", "level": "Hábil", "icon": ["fab", "react"] }, { "name": "Laravel", "level": "Hábil", "icon": ["fab", "laravel"] }], "architectureAndMethodologies": [{ "name": "Arquitectura orientada a eventos", "level": "Experimentado" }, { "name": "ESB", "level": "Hábil" }, { "name": "Nativo en la nube", "level": "Experimentado" }, { "name": "Arquitectura limpia", "level": "Experimentado" }, { "name": "Arquitectura de microservicios", "level": "Experto" }, { "name": "Arquitectura en cebolla", "level": "Experimentado" }, { "name": "MVC/MVP/MVVM/MV*", "level": "Experimentado" }, { "name": "Arquitectura C4D", "level": "Hábil" }], "projectManagement": [{ "name": "Scrum", "level": "Experimentado" }, { "name": "Kanban", "level": "Experimentado" }, { "name": "SAFe", "level": "Hábil" }, { "name": "RUP", "level": "Hábil" }], "aiAndLLMs": [{ "name": "MagnifAI", "level": "Hábil", "icon": ["fas", "search-plus"] }, { "name": "Mistral", "level": "Hábil", "icon": ["fas", "wind"] }, { "name": "Hugging Face", "level": "Hábil", "icon": ["fas", "smile-beam"] }, { "name": "Vikuna", "level": "Hábil", "icon": ["fas", "paw"] }, { "name": "Bloom", "level": "Hábil", "icon": ["fas", "seedling"] }, { "name": "Stable Diffusion", "level": "Hábil", "icon": ["fas", "paint-brush"] }, { "name": "Midjourney", "level": "Hábil", "icon": ["fas", "mountain"] }, { "name": "LLama2", "level": "Hábil", "icon": ["fas", "comment-dots"] }, { "name": "RAG", "level": "Hábil", "icon": ["fas", "book"] }, { "name": "OpenAI (ChatGPT)", "level": "Hábil", "icon": ["fas", "robot"] }, { "name": "Copilot", "level": "Hábil", "icon": ["fas", "user-astronaut"] }], "developmentTools": [{ "name": "Intellij", "level": "Experimentado", "icon": ["fas", "laptop-code"] }, { "name": "Eclipse", "level": "Experimentado", "icon": ["fas", "moon"] }, { "name": "Jenkins", "level": "Experimentado", "icon": ["fas", "cogs"] }, { "name": "VS Code", "level": "Experimentado", "icon": ["fas", "code"] }, { "name": "MySQL", "level": "Experimentado", "icon": ["fas", "database"] }, { "name": "PostgreSQL", "level": "Experimentado", "icon": ["fas", "database"] }, { "name": "MongoDB", "level": "Hábil", "icon": ["fas", "leaf"] }, { "name": "SVN/GIT/Mecurial", "level": "Experimentado", "icon": ["fab", "git-alt"] }, { "name": "MAVEN/NPM/YARN/GRADLE", "level": "Experimentado", "icon": ["fas", "box"] }] };
const softSkillsSection = { "title": "Habilidades Blandas", "description": "Atributos personales clave que complementan mi experiencia técnica:" };
const softSkills = [{ "name": "Pensador fuera de la caja", "icon": ["fas", "lightbulb"] }, { "name": "Trabajo en equipo", "icon": ["fas", "users"] }, { "name": "Liderazgo", "icon": ["fas", "user-tie"] }, { "name": "Aprendiz rápido", "icon": ["fas", "book-reader"] }, { "name": "Adaptabilidad", "icon": ["fas", "sync-alt"] }, { "name": "Pensamiento crítico", "icon": ["fas", "brain"] }, { "name": "Resolución de problemas", "icon": ["fas", "puzzle-piece"] }, { "name": "Colaboración", "icon": ["fas", "handshake"] }];
const nav = { "about": "Acerca", "experience": "Experiencia", "projects": "Proyectos", "stack": "Stack", "contact": "Contacto", "writing": "Escritos" };
const hero = { "greeting": "Hola, soy", "tagline": "Ingeniero de sistemas enfocado en arquitectura backend, integración de IA y rendimiento. Construyo sistemas resilientes de alto throughput — desde plataformas bancarias que procesan millones de transacciones hasta herramientas de desarrollo asistidas por IA." };
const status = { "available": "Disponible para trabajar", "location": "Ubicación", "city": "Ciudad de México, MX", "connect": "Conectar" };
const contact = { "heading": "Construyamos algo resiliente.", "body": "Abierto a roles de ingeniería, consultoría de arquitectura y sistemas de IA.", "email": "hello@drupalio.dev" };
const footer = { "built": "Construido con Nuxt 3, Tailwind v4 y cuidado." };
const stack = { "title": "Stack" };
const esData = {
  personalInfo,
  summary,
  workExperienceSection,
  workExperience,
  education,
  certifications,
  courses,
  skills,
  softSkillsSection,
  softSkills,
  nav,
  hero,
  status,
  contact,
  footer,
  stack
};
const i18n_SMdHjDdqIId1QK07LHAPEyr3HZfMyKcn2rAtnZisyJE = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  const cookie = useCookie("language", {
    default: () => "en",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365
  });
  const initial = cookie.value === "es" ? "es" : "en";
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: initial,
    fallbackLocale: "en",
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false,
    fallbackWarn: false,
    messages: {
      en: enData,
      es: esData
    }
  });
  vueApp.use(i18n);
  return {
    provide: {
      i18n
    }
  };
});
let routes;
const prerender_server__y1bVtA4GV0zhHZswyGHp3qNHe3O32caqWn5oYgpHzg = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  if (!import.meta.prerender || hashMode) {
    return;
  }
  if (routes && !routes.length) {
    return;
  }
  routes ||= Array.from(processRoutes(([__temp, __restore] = executeAsync(() => routerOptions.routes?.(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes));
  const batch = routes.splice(0, 10);
  prerenderRoutes(batch);
});
const OPTIONAL_PARAM_RE = /^\/?:.*(?:\?|\(\.\*\)\*)$/;
function shouldPrerender(path) {
  return crawlLinks;
}
function processRoutes(routes2, currentPath = "/", routesToPrerender = /* @__PURE__ */ new Set()) {
  for (const route of routes2) {
    if (OPTIONAL_PARAM_RE.test(route.path) && !route.children?.length && shouldPrerender()) {
      routesToPrerender.add(currentPath);
    }
    if (route.path.includes(":")) {
      continue;
    }
    const fullPath = joinURL(currentPath, route.path);
    {
      routesToPrerender.add(fullPath);
    }
    if (route.children) {
      processRoutes(route.children, fullPath, routesToPrerender);
    }
  }
  return routesToPrerender;
}
const plugins = [
  unhead_bkuShh2zWc1A1ZyHeGoRYUIn_88URgblgkXlhr7O0Kg,
  plugin,
  revive_payload_server__MvkmD7GMkKyX0OXji0_eELg68_AJSAeWxCbytIOZGU,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  colors_YTZvULqV1DZL0HK4ShSquSZdETxRGdGBfxieHx6_EQA,
  plugin_server_XlivkfYBOcHtXydUVsxvbfczHZpJKCMwq769UkFyeKk,
  plugin_ilvJVEzIuslut37swn6Xql6BaXiR9g8XINDwYevwNag,
  animate_SOY3MdT9y6nth7Z_2uuSsrqX_2gKW_MbS3RsNZCyazs,
  i18n_SMdHjDdqIId1QK07LHAPEyr3HZfMyKcn2rAtnZisyJE,
  prerender_server__y1bVtA4GV0zhHZswyGHp3qNHe3O32caqWn5oYgpHzg
];
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_0$2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtPage = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]);
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
function sanitizeExternalHref(value) {
  let candidate = value.replace(/[\u0000-\u001f\s]+/g, "");
  while (candidate.toLowerCase().startsWith("view-source:")) {
    candidate = candidate.slice("view-source:".length);
  }
  const colon = candidate.indexOf(":");
  if (colon > 0 && isScriptProtocol(candidate.slice(0, colon + 1))) {
    return null;
  }
  return value;
}
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = unref(props.to) || unref(props.href) || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (unref(props.external)) {
        return true;
      }
      const path = unref(props.to) || unref(props.href) || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = unref(props.to) || unref(props.href) || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to, viewTransition: unref(props.viewTransition) });
    const href = computed(() => {
      const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        const raw = to.value;
        return typeof raw === "string" ? sanitizeExternalHref(raw) : raw;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        const safe = typeof href2 === "string" ? sanitizeExternalHref(href2) : href2;
        return safe === null ? null : applyTrailingSlashBehavior(safe, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        if (href.value === null) {
          return;
        }
        await navigateTo(href.value, { replace: unref(props.replace), external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: async (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            try {
              const encodedHref = encodeRoutePath(href.value ?? "");
              return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
            } finally {
            }
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useLanguage = () => {
  const { $i18n } = useNuxtApp();
  const cookie = useCookie("language", {
    default: () => "en",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365
  });
  const currentLocale = computed(() => {
    if (!$i18n?.global?.locale?.value) return "en";
    return $i18n.global.locale.value;
  });
  const set = (locale) => {
    if (!$i18n?.global) return;
    $i18n.global.locale.value = locale;
    cookie.value = locale;
  };
  const toggle = () => {
    const next = currentLocale.value === "en" ? "es" : "en";
    set(next);
  };
  return {
    current: currentLocale,
    toggle,
    set
  };
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "LanguageToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const { current } = useLanguage();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 font-mono text-xs font-medium uppercase tracking-wider text-text-muted transition-all duration-150 hover:text-text hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        "aria-label": `Switch language, current: ${unref(current)}`
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/LanguageToggle.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const useColorMode = () => {
  return useState("color-mode").value;
};
const useTheme = () => {
  const colorMode = useColorMode();
  const isDark = computed({
    get: () => colorMode.value === "dark",
    set: (val) => {
      colorMode.preference = val ? "dark" : "light";
    }
  });
  const toggle = () => {
    {
      isDark.value = !isDark.value;
    }
  };
  return {
    isDark,
    toggle
  };
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark } = useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition-all duration-150 hover:text-text hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        "aria-label": unref(isDark) ? "Switch to light mode" : "Switch to dark mode"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-4 w-4"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "h-4 w-4" })
            ];
          }
        })
      }, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ThemeToggle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
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
    const navItems = computed(() => [
      { label: t("nav.about"), href: "/#about" },
      { label: t("nav.experience"), href: "/#experience" },
      { label: t("nav.projects"), href: "/#projects" },
      { label: t("nav.stack"), href: "/#stack" },
      { label: t("nav.writing"), href: "/blog" },
      { label: t("nav.contact"), href: "/#contact" }
    ]);
    const scrolled = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_LanguageToggle = _sfc_main$5;
      const _component_ThemeToggle = _sfc_main$4;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["fixed inset-x-0 top-0 z-50 transition-all duration-200", unref(scrolled) ? "border-b border-border bg-bg/80 backdrop-blur-lg" : "border-transparent"]
      }, _attrs))}><nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "font-mono text-sm font-medium tracking-tight text-text"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ricardo<span class="text-text-muted"${_scopeId}>.dev</span>`);
          } else {
            return [
              createTextVNode(" ricardo"),
              createVNode("span", { class: "text-text-muted" }, ".dev")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden items-center gap-6 md:flex"><!--[-->`);
      ssrRenderList(unref(navItems), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.href,
          to: item.href,
          class: "text-sm text-text-muted transition-colors duration-150 hover:text-text"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_LanguageToggle, null, null, _parent));
      _push(ssrRenderComponent(_component_ThemeToggle, null, null, _parent));
      _push(`</div></nav></header>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
function makeViewBoxSquare(viewBox) {
  const [left, top, width, height] = viewBox;
  if (width !== height) {
    const max = Math.max(width, height);
    return [left - (max - width) / 2, top - (max - height) / 2, max, max];
  }
  return viewBox;
}
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index2 = content.indexOf("<" + tag);
  while (index2 >= 0) {
    const start = content.indexOf(">", index2);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index2).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
function getCommonCSSRules(options) {
  const result = {
    display: "inline-block",
    width: "1em",
    height: "1em"
  };
  const varName = options.varName;
  if (options.pseudoSelector) {
    result["content"] = "''";
  }
  switch (options.mode) {
    case "background":
      if (varName) {
        result["background-image"] = "var(--" + varName + ")";
      }
      result["background-repeat"] = "no-repeat";
      result["background-size"] = "100% 100%";
      break;
    case "mask":
      result["background-color"] = "currentColor";
      if (varName) {
        result["mask-image"] = result["-webkit-mask-image"] = "var(--" + varName + ")";
      }
      result["mask-repeat"] = result["-webkit-mask-repeat"] = "no-repeat";
      result["mask-size"] = result["-webkit-mask-size"] = "100% 100%";
      break;
  }
  return result;
}
function generateItemCSSRules(icon, options) {
  const result = {};
  const varName = options.varName;
  const buildResult = iconToSVG(icon);
  let viewBox = buildResult.viewBox;
  if (viewBox[2] !== viewBox[3]) {
    if (options.forceSquare) {
      viewBox = makeViewBoxSquare(viewBox);
    } else {
      result["width"] = calculateSize("1em", viewBox[2] / viewBox[3]);
    }
  }
  const svg = iconToHTML(
    buildResult.body.replace(/currentColor/g, options.color || "black"),
    {
      viewBox: `${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`,
      width: `${viewBox[2]}`,
      height: `${viewBox[3]}`
    }
  );
  const url = svgToURL(svg);
  if (varName) {
    result["--" + varName] = url;
  } else {
    switch (options.mode) {
      case "background":
        result["background-image"] = url;
        break;
      case "mask":
        result["mask-image"] = result["-webkit-mask-image"] = url;
        break;
    }
  }
  return result;
}
const format = {
  selectorStart: {
    compressed: "{",
    compact: " {",
    expanded: " {"
  },
  selectorEnd: {
    compressed: "}",
    compact: "; }\n",
    expanded: ";\n}\n"
  },
  rule: {
    compressed: "{key}:",
    compact: " {key}: ",
    expanded: "\n  {key}: "
  }
};
function formatCSS(data, mode = "expanded") {
  const results = [];
  for (let i = 0; i < data.length; i++) {
    const { selector, rules } = data[i];
    const fullSelector = selector instanceof Array ? selector.join(mode === "compressed" ? "," : ", ") : selector;
    let entry2 = fullSelector + format.selectorStart[mode];
    let firstRule = true;
    for (const key in rules) {
      if (!firstRule) {
        entry2 += ";";
      }
      entry2 += format.rule[mode].replace("{key}", key) + rules[key];
      firstRule = false;
    }
    entry2 += format.selectorEnd[mode];
    results.push(entry2);
  }
  return results.join(mode === "compressed" ? "" : "\n");
}
function getIconCSS(icon, options = {}) {
  const body = options.customise ? options.customise(icon.body) : icon.body;
  const mode = options.mode || (options.color || !body.includes("currentColor") ? "background" : "mask");
  let varName = options.varName;
  if (varName === void 0 && mode === "mask") {
    varName = "svg";
  }
  const newOptions = {
    ...options,
    // Override mode and varName
    mode,
    varName
  };
  if (mode === "background") {
    delete newOptions.varName;
  }
  const rules = {
    ...options.rules,
    ...getCommonCSSRules(newOptions),
    ...generateItemCSSRules(
      {
        ...defaultIconProps,
        ...icon,
        body
      },
      newOptions
    )
  };
  const selector = options.iconSelector || ".icon";
  return formatCSS(
    [
      {
        selector,
        rules
      }
    ],
    newOptions.format
  );
}
async function loadIcon(name, timeout) {
  if (!name)
    return null;
  const _icon = getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = loadIcon$1(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return getIcon(name);
}
function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = options.aliases?.[bare] || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}
function resolveCustomizeFn(customize, globalCustomize) {
  if (customize === false) return void 0;
  if (customize === true || customize === null) return globalCustomize;
  return customize;
}
const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props) {
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => props.name ? options.cssSelectorPrefix + props.name : "");
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: resolveCustomizeFn(props.customize, options.customize)
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    onServerPrefetch(async () => {
      {
        const configs = (/* @__PURE__ */ useRuntimeConfig()).icon || {};
        if (!configs?.serverKnownCssClasses?.includes(cssClass.value)) {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (props.name && !ssrCSS.has(props.name)) {
            const css = getCSS(icon, false);
            ssrCSS.set(props.name, css);
          }
          return null;
        }
      }
    });
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry2 = nuxtApp._asyncData[key.value];
      if (entry2?._abortController) {
        try {
          entry2._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry2._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  Object.defineProperties(asyncDataPromise, {
    then: { enumerable: true, value: asyncDataPromise.then.bind(asyncDataPromise) },
    catch: { enumerable: true, value: asyncDataPromise.catch.bind(asyncDataPromise) },
    finally: { enumerable: true, value: asyncDataPromise.finally.bind(asyncDataPromise) }
  });
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    {
      nuxtApp._asyncData[key].pending.value = false;
    }
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = !import.meta.prerender || !nuxtApp.ssrContext?.["~sharedPrerenderCache"] ? _handler : (nuxtApp2, options2) => {
    const value = nuxtApp2.ssrContext["~sharedPrerenderCache"].get(key);
    if (value) {
      return value;
    }
    const promise = Promise.resolve().then(() => nuxtApp2.runWithContext(() => _handler(nuxtApp2, options2)));
    nuxtApp2.ssrContext["~sharedPrerenderCache"].set(key, promise);
    return promise;
  };
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData != null;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: shallowRef(!hasCachedData),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer(opts.dedupe ?? options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData != null) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = asyncDataDefaults.errorValue;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      {
        asyncData.pending.value = true;
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return;
        }
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = asyncDataDefaults.errorValue;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        if (nuxtApp._asyncDataPromises[key] === promise) {
          {
            asyncData.pending.value = false;
          }
          delete nuxtApp._asyncDataPromises[key];
        }
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
            asyncData.data.value = asyncDataDefaults.value;
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => asyncDataDefaults.value;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      onServerPrefetch(async () => {
        {
          await useAsyncData(
            storeKey,
            async () => await loadIcon(name.value, options.fetchTimeout),
            { deep: false }
          );
        }
      });
    }
    return () => h(Icon, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: resolveCustomizeFn(props.customize, options.customize)
    }, slots);
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    const nuxtApp = useNuxtApp();
    const runtimeOptions = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const component = computed(
      () => nuxtApp.vueApp?.component(name.value) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss)
    );
    const style = computed(() => {
      const size = props.size || runtimeOptions.size;
      return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
    });
    return () => h(
      component.value,
      {
        ...runtimeOptions.attrs,
        name: name.value,
        class: runtimeOptions.class,
        style: style.value,
        customize: props.customize
      },
      slots
    );
  }
});
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { $i18n } = useNuxtApp();
    const t = (key) => $i18n?.global?.t(key) ?? key;
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-border px-6 py-12 lg:px-8" }, _attrs))}><div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-text-muted sm:flex-row"><p>${ssrInterpolate(t("footer.built"))}</p><p class="font-mono tabular-nums">© ${ssrInterpolate(unref(year))} Ricardo Morales</p></div></footer>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const props = __props;
    const is404 = computed(() => props.error?.statusCode === 404);
    const { $i18n } = useNuxtApp();
    const currentLocale = computed(() => $i18n?.global?.locale?.value || "en");
    const title = computed(
      () => is404.value ? currentLocale.value === "en" ? "Not found" : "No encontrado" : currentLocale.value === "en" ? "Something went wrong" : "Algo salió mal"
    );
    const message = computed(
      () => is404.value ? currentLocale.value === "en" ? "The page you're looking for doesn't exist or has been moved." : "La página que buscas no existe o ha sido movida." : currentLocale.value === "en" ? "An unexpected error occurred. Try going back home." : "Ocurrió un error inesperado. Intenta volver al inicio."
    );
    const backLabel = computed(
      () => currentLocale.value === "en" ? "Back to home" : "Volver al inicio"
    );
    useSeoMeta({
      title: () => `${title.value} — Ricardo Morales`,
      robots: "noindex"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1;
      const _component_AppFooter = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main class="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-32 text-center lg:px-8"><p class="mb-4 font-mono text-7xl font-semibold tabular-nums text-text-muted/20">${ssrInterpolate(__props.error?.statusCode || 500)}</p><h1 class="mb-3 text-balance text-2xl font-semibold tracking-tight text-text">${ssrInterpolate(unref(title))}</h1><p class="mb-8 max-w-md text-balance text-sm leading-relaxed text-text-muted">${ssrInterpolate(unref(message))}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-accent/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-left",
              size: "14"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(backLabel))}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:arrow-left",
                size: "14"
              }),
              createTextVNode(" " + toDisplayString(unref(backLabel)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    function invokeAppErrorHandler(err, target, info) {
      const errorHandler = nuxtApp.vueApp.config.errorHandler;
      if (errorHandler && !errorHandler.__nuxt_default) {
        try {
          errorHandler(err, target, info);
        } catch (handlerError) {
          console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
        }
      }
    }
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        invokeAppErrorHandler(err, target, info);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.21.8_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.39_better-sqlite3@12.11.1_cac@6_64f970d16c61448ca761f094a3f31f39/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));
export {
  __nuxt_component_1 as _,
  useLanguage as a,
  useSeoMeta as b,
  useHead as c,
  _sfc_main$3 as d,
  entry_default as default,
  _sfc_main$2 as e,
  __nuxt_component_0$1 as f,
  useRoute as g,
  createError as h,
  useRuntimeConfig as i,
  useAsyncData as j,
  _export_sfc as k,
  useRequestEvent as l,
  fetchDefaults as m,
  useRequestFetch as n,
  tryUseNuxtApp as t,
  useNuxtApp as u
};
//# sourceMappingURL=server.mjs.map
