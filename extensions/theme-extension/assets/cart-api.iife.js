var CartAPI = function(exports) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  const _XHRCustom = class _XHRCustom extends XMLHttpRequest {
    static addEventListener(type, listener, before = true) {
      if (before) {
        this.beforeListeners[type].add(listener);
      } else {
        this.afterListeners[type].add(listener);
      }
    }
    static removeEventListener(type, listener, before = true) {
      if (before) {
        this.beforeListeners[type].delete(listener);
      } else {
        this.afterListeners[type].delete(listener);
      }
    }
    open(method, url, async = true, user, password) {
      for (const listener of _XHRCustom.beforeListeners.open) {
        listener(this, method, url, async, user, password);
      }
      super.open(method, url, async, user, password);
      for (const listener of _XHRCustom.afterListeners.open) {
        listener(this, method, url, async, user, password);
      }
    }
  };
  __publicField(_XHRCustom, "beforeListeners", {
    open: /* @__PURE__ */ new Set()
  });
  __publicField(_XHRCustom, "afterListeners", {
    open: /* @__PURE__ */ new Set()
  });
  let XHRCustom = _XHRCustom;
  const _CartApi = class _CartApi {
    constructor(fetchFn) {
      __publicField(this, "queue", /* @__PURE__ */ new Set());
      __publicField(this, "listeners", /* @__PURE__ */ new Set());
      __publicField(this, "cart", null);
      __publicField(this, "running", false);
      this.fetchFn = fetchFn;
      if (!_CartApi.instance) {
        _CartApi.instance = this;
      } else {
        return _CartApi.instance;
      }
      window.fetch = async (url, options) => {
        const urlStr = typeof url === "string" || url instanceof URL ? url.toString() : url.url;
        const type = this.getCartEndpoint(urlStr);
        if (type) {
          const res = await fetchFn(url, options);
          await this.notifyListeners(type);
          return res;
        }
        return fetchFn(url, options);
      };
      window.XMLHttpRequest = XHRCustom;
      XHRCustom.addEventListener(
        "open",
        (xhr, _method, url) => {
          const type = this.getCartEndpoint(url);
          if (type) {
            xhr.addEventListener("load", async () => this.notifyListeners(type));
          }
        },
        true
      );
      const queueRaw = localStorage.getItem("wenexus-cart-queue");
      if (queueRaw) {
        this.queue = new Set(JSON.parse(queueRaw));
      }
      this.runQueue(this.queue.size > 0);
      window.addEventListener("beforeunload", (evt) => {
        if (this.queue.size > 0) {
          evt.preventDefault();
          return "Cart updates are still in progress. Are you sure you want to leave?";
        }
      });
    }
    getCartEndpoint(url) {
      const urlStr = typeof url === "string" ? url : url.toString();
      const urlObj = new URL(
        !urlStr.startsWith("http://") || !urlStr.startsWith("https://") ? `${window.location.origin}/${urlStr}` : urlStr
      );
      const matchMap = {
        add: "/cart/add",
        update: "/cart/update",
        change: "/cart/change",
        clear: "/cart/clear"
      };
      for (const key in matchMap) {
        const path = matchMap[key];
        if ([path, `${path}.js`].some((p) => urlObj.pathname.endsWith(p))) {
          return key;
        }
      }
      return null;
    }
    async notifyListeners(requestType) {
      const oldCart = this.cart;
      const newCart = await this.get(true);
      if (JSON.stringify(oldCart, null, 0) === JSON.stringify(newCart, null, 0)) {
        return oldCart;
      }
      for (const listener of this.listeners) {
        listener(newCart, { requestType, updatedBy: "api" });
      }
      return newCart;
    }
    addListener(listener) {
      this.listeners.add(listener);
      return () => {
        this.listeners.delete(listener);
      };
    }
    removeListener(listener) {
      this.listeners.delete(listener);
    }
    async runQueue(recovered = false) {
      if (this.running) {
        return;
      }
      this.running = true;
      for (const request of this.queue) {
        this.queue.delete(request);
        localStorage.setItem(
          "wenexus-cart-queue",
          JSON.stringify(Array.from(this.queue))
        );
        const response = await this.fetchFn.call(
          window,
          `/cart/${request.type}.js`,
          {
            method: "POST",
            headers: request.payload ? {
              "Content-Type": "application/json"
            } : void 0,
            body: request.payload ? JSON.stringify(request.payload) : void 0
          }
        );
        window.dispatchEvent(
          new CustomEvent(`wenexus-cart-response-${request.id}`, {
            detail: response
          })
        );
      }
      this.running = false;
      if (recovered) {
        alert("Recovered from lost cart updates");
        this.notifyListeners("add");
      }
      if (this.queue.size > 0) {
        setTimeout(() => this.runQueue(), 10);
      }
    }
    waitForResponse(id) {
      return new Promise((resolve) => {
        window.addEventListener(
          `wenexus-cart-response-${id}`,
          (event) => resolve(event.detail)
        );
      });
    }
    async request(type, payload, trigger = true) {
      const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      this.queue.add({ id, type, payload, trigger });
      localStorage.setItem(
        "wenexus-cart-queue",
        JSON.stringify(Array.from(this.queue))
      );
      this.runQueue();
      const response = await this.waitForResponse(id);
      if (trigger) {
        return {
          cart: await this.notifyListeners(type),
          response: await response.json()
        };
      }
      return {
        cart: await this.get(!trigger),
        response: await response.json()
      };
    }
    async get(refresh = false) {
      if (this.cart && !refresh) {
        return this.cart;
      }
      const response = await fetch(`/cart.js`);
      const cart = await response.json();
      this.cart = cart;
      return cart;
    }
    async update(updates, trigger = true) {
      const { cart } = await this.request("update", { updates }, trigger);
      return cart;
    }
    async append(items, trigger = true) {
      const { cart } = await this.request("add", { items }, trigger);
      return cart;
    }
    async prepend(items, trigger = true) {
      const oldCart = await this.get();
      const updates = items.concat(
        Array.from(oldCart.items).reverse().map((item) => {
          var _a;
          return {
            id: item.variant_id,
            quantity: item.quantity,
            selling_plan: (_a = item.selling_plan) == null ? void 0 : _a.id,
            properties: item.properties
          };
        })
      );
      return this.replace(updates, trigger);
    }
    async change(item, trigger = true) {
      const { cart } = await this.request("change", item, trigger);
      return cart;
    }
    async remove(variantIds, trigger = true) {
      const toRemove = variantIds.filter(
        (id) => {
          var _a;
          return (_a = this.cart) == null ? void 0 : _a.items.some((item) => item.variant_id === id);
        }
      );
      if (!toRemove.length) {
        return await this.get();
      }
      const { cart } = await this.request(
        "update",
        {
          updates: toRemove.reduce(
            (acc, id) => ({
              ...acc,
              [id]: 0
            }),
            {}
          )
        },
        trigger
      );
      return cart;
    }
    async move(id, index, trigger = true) {
      const oldCart = await this.get();
      const item = oldCart.items.find((item2) => item2.variant_id === id);
      if (!item) {
        return oldCart;
      }
      const items = oldCart.items.filter((item2) => item2.variant_id !== id);
      items.splice(index, 0, item);
      return this.replace(
        items.map((item2) => {
          var _a;
          return {
            id: item2.variant_id,
            quantity: item2.quantity,
            selling_plan: (_a = item2.selling_plan) == null ? void 0 : _a.id,
            properties: item2.properties
          };
        }),
        trigger
      );
    }
    async replace(items, trigger = true) {
      this.clear(false);
      return this.append(items, trigger);
    }
    async clear(trigger = true) {
      const { cart } = await this.request("clear", void 0, trigger);
      return cart;
    }
  };
  __publicField(_CartApi, "instance");
  let CartApi = _CartApi;
  window.weNexusCartApi = new CartApi(fetch);
  exports.CartApi = CartApi;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
