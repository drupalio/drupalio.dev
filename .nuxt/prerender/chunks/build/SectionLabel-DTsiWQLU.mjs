import { defineComponent, mergeProps, useSSRContext } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue@3.5.39_typescript@5.9.3/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'file:///Users/drupalio/drupalio.dev/node_modules/.pnpm/vue@3.5.39_typescript@5.9.3/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SectionLabel",
  __ssrInlineRender: true,
  props: {
    number: {},
    label: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-baseline gap-3" }, _attrs))}>`);
      if (__props.number) {
        _push(`<span class="font-mono text-sm text-text-muted tabular-nums">${ssrInterpolate(__props.number)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="section-label">${ssrInterpolate(__props.label)}</span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/SectionLabel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SectionLabel-DTsiWQLU.mjs.map
