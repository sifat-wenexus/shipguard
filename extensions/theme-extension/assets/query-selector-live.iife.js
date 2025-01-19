var QuerySelectorLive = function(exports) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  class QuerySelectorLive2 {
    constructor(selector, roots = /* @__PURE__ */ new Set([document.documentElement])) {
      __publicField(this, "listeners", /* @__PURE__ */ new Set());
      __publicField(this, "elements", /* @__PURE__ */ new Set());
      __publicField(this, "observer", null);
      this.selector = selector;
      this.roots = roots;
    }
    setup() {
      if (this.observer) {
        return;
      }
      this.observer = new MutationObserver(() => this.reconcile());
      for (const root of this.roots) {
        this.observer.observe(root, {
          childList: true,
          subtree: true
        });
      }
      this.reconcile();
    }
    reconcile() {
      const elements = new Set(
        Array.from(this.roots).map((root) => root.querySelectorAll(this.selector)).flatMap((elements2) => Array.from(elements2))
      );
      const deletedElements = /* @__PURE__ */ new Set();
      const newElements = /* @__PURE__ */ new Set();
      for (const element of elements) {
        if (!this.elements.has(element)) {
          newElements.add(element);
        }
      }
      for (const element of this.elements) {
        if (!elements.has(element)) {
          deletedElements.add(element);
        }
      }
      if (newElements.size > 0 || deletedElements.size > 0) {
        this.elements.clear();
        for (const element of elements) {
          this.elements.add(element);
        }
        for (const listener of this.listeners) {
          listener(this.elements);
        }
      }
    }
    addListener(listener) {
      this.listeners.add(listener);
      if (this.listeners.size === 1) {
        this.setup();
      }
    }
    removeListener(listener) {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.destroy();
      }
    }
    destroy() {
      var _a;
      this.listeners.clear();
      (_a = this.observer) == null ? void 0 : _a.disconnect();
    }
  }
  window.WeNexusQuerySelectorLive = QuerySelectorLive2;
  exports.QuerySelectorLive = QuerySelectorLive2;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
