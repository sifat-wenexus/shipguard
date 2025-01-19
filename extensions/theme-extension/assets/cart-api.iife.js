var CartAPI = function(exports) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  var _a, _b, _c;
  function _0x5ee9() {
    const _0xd19455 = ["4493484FlIzMw", "get", "84615KgEzgY", "1637696buqojL", "/cart/add", "detail", "then", "Cart updates are still in progress. Are you sure you want to leave?", "/cart.js", "waitForResponse", "dispatchEvent", "removeListener", "pathname", "size", "beforeListeners", "fetch", "add", "weNexusCartApi", "/cart/clear", "string", "open", "/cart/", "2389233MkZzzx", "110qNBkwZ", "cart", "slice", "json", "remove", "stringify", "delete", "payload", "getItem", ".js", "XMLHttpRequest", "/cart/change", "variant_id", "runQueue", "request", "136HBOjxF", "items", "getCartEndpoint", "after", "fetchFn", "22849DldJAT", "Recovered from lost cart updates", "preventDefault", "before", "notifyListeners", "load", "error", "http://", "now", "instance", "some", "afterListeners", "beforeunload", "toString", "10FMBDMr", "addEventListener", "type", "setItem", "/cart/update", "reduce", "length", "https://", "30JxnLoY", "api", "176810KsHORi", "startsWith", "474677lgBqFl", "update", "listeners", "running", "parse", "wenexus-cart-queue", "from", "POST", "queue"];
    _0x5ee9 = function() {
      return _0xd19455;
    };
    return _0x5ee9();
  }
  const _0x12771a = _0x2cab;
  (function(_0x4134c6, _0x2965ed) {
    const _0x436e94 = _0x2cab, _0x325f06 = _0x4134c6();
    while (!![]) {
      try {
        const _0x4e9f51 = parseInt(_0x436e94(490)) / 1 * (parseInt(_0x436e94(470)) / 2) + -parseInt(_0x436e94(449)) / 3 * (parseInt(_0x436e94(485)) / 4) + -parseInt(_0x436e94(436)) / 5 * (-parseInt(_0x436e94(434)) / 6) + -parseInt(_0x436e94(438)) / 7 + parseInt(_0x436e94(450)) / 8 + parseInt(_0x436e94(447)) / 9 * (parseInt(_0x436e94(426)) / 10) + -parseInt(_0x436e94(469)) / 11;
        if (_0x4e9f51 === _0x2965ed)
          break;
        else
          _0x325f06["push"](_0x325f06["shift"]());
      } catch (_0x374bcc) {
        _0x325f06["push"](_0x325f06["shift"]());
      }
    }
  })(_0x5ee9, 893509);
  const _XHRCustom = class _XHRCustom extends XMLHttpRequest {
    static [_0x12771a(427)](_0x5c223a, _0x2e8a54, _0x4b2a77 = !![]) {
      const _0x5443b8 = _0x12771a;
      _0x4b2a77 ? this["beforeListeners"][_0x5c223a][_0x5443b8(463)](_0x2e8a54) : this[_0x5443b8(423)][_0x5c223a][_0x5443b8(463)](_0x2e8a54);
    }
    static ["removeEventListener"](_0x556bc7, _0x36fec4, _0x3b9721 = !![]) {
      const _0x7ceeb1 = _0x12771a;
      _0x3b9721 ? this["beforeListeners"][_0x556bc7][_0x7ceeb1(476)](_0x36fec4) : this[_0x7ceeb1(423)][_0x556bc7]["delete"](_0x36fec4);
    }
    [_0x12771a(467)](_0x3475e4, _0x53df91, _0x306ca6 = !![], _0xd2e2db, _0x10030d) {
      const _0x11c704 = _0x12771a;
      for (const _0xb5ac75 of _XHRCustom[_0x11c704(461)][_0x11c704(467)]) {
        _0xb5ac75(this, _0x3475e4, _0x53df91, _0x306ca6, _0xd2e2db, _0x10030d);
      }
      super[_0x11c704(467)](_0x3475e4, _0x53df91, _0x306ca6, _0xd2e2db, _0x10030d);
      for (const _0x284faf of _XHRCustom["afterListeners"][_0x11c704(467)]) {
        _0x284faf(this, _0x3475e4, _0x53df91, _0x306ca6, _0xd2e2db, _0x10030d);
      }
    }
  };
  __publicField(_XHRCustom, "beforeListeners", { "open": /* @__PURE__ */ new Set() });
  __publicField(_XHRCustom, "afterListeners", { "open": /* @__PURE__ */ new Set() });
  let XHRCustom = _XHRCustom;
  const _CartApi = class _CartApi {
    constructor(_0xb9c659) {
      __publicField(this, "queue", /* @__PURE__ */ new Set());
      __publicField(this, _b, { "before": /* @__PURE__ */ new Set(), "after": /* @__PURE__ */ new Set() });
      __publicField(this, _c, null);
      __publicField(this, "cart", null);
      const _0x94be7a = _0x12771a;
      this[_0x94be7a(489)] = _0xb9c659;
      if (!_CartApi[_0x94be7a(421)])
        _CartApi[_0x94be7a(421)] = this;
      else
        return _CartApi[_0x94be7a(421)];
      const _0x2f5563 = async (_0x1d564c, _0x396911) => {
        const _0x4a1b1f = _0x94be7a, _0x1da04 = typeof _0x1d564c === _0x4a1b1f(466) || _0x1d564c instanceof URL ? _0x1d564c[_0x4a1b1f(425)]() : _0x1d564c["url"], _0x3f45b6 = this["getCartEndpoint"](_0x1da04);
        if (_0x3f45b6) {
          const _0x14510d = _0xb9c659(_0x1d564c, _0x396911);
          this[_0x4a1b1f(494)](_0x3f45b6, _0x14510d);
          const _0x1cdebf = await _0x14510d;
          return await this[_0x4a1b1f(494)](_0x3f45b6), _0x1cdebf;
        }
        return _0xb9c659(_0x1d564c, _0x396911);
      };
      window[_0x94be7a(462)] = _0x2f5563, window[_0x94be7a(480)] = XHRCustom, XHRCustom[_0x94be7a(427)](_0x94be7a(467), (_0x4b88f3, _0x221524, _0x340435) => {
        const _0xfc7415 = _0x94be7a, _0x9cb4de = this["getCartEndpoint"](_0x340435);
        if (_0x9cb4de) {
          const _0x1b3860 = new Promise((_0x1e6f58, _0x553504) => {
            const _0x2f92d1 = _0x2cab;
            _0x4b88f3[_0x2f92d1(427)](_0x2f92d1(495), () => {
              const _0xc27683 = _0x2f92d1;
              _0x1e6f58(void 0), this[_0xc27683(494)](_0x9cb4de);
            }), _0x4b88f3[_0x2f92d1(427)](_0x2f92d1(418), _0x553504);
          });
          this[_0xfc7415(494)](_0x9cb4de, _0x1b3860);
        }
      }, !![]);
      const _0x105e06 = localStorage[_0x94be7a(478)](_0x94be7a(443));
      _0x105e06 && (this[_0x94be7a(446)] = new Set(JSON[_0x94be7a(442)](_0x105e06))), this[_0x94be7a(483)](this[_0x94be7a(446)][_0x94be7a(460)] > 0), window["addEventListener"](_0x94be7a(424), (_0x1e07b5) => {
        const _0x220603 = _0x94be7a;
        if (this[_0x220603(446)]["size"] > 0)
          return _0x1e07b5[_0x220603(492)](), _0x220603(454);
      });
    }
    ["addListener"](_0x451bec, _0xd9979d = ![]) {
      const _0x235b24 = _0x12771a;
      return this[_0x235b24(440)][_0xd9979d ? _0x235b24(493) : _0x235b24(488)][_0x235b24(463)](_0x451bec), () => {
        this["removeListener"](_0x451bec, _0xd9979d);
      };
    }
    [(_a = _0x12771a(421), _b = _0x12771a(440), _c = _0x12771a(441), _0x12771a(458))](_0x6d3de3, _0x8ee7de = ![]) {
      const _0x1bc91a = _0x12771a;
      this[_0x1bc91a(440)][_0x8ee7de ? _0x1bc91a(493) : "after"][_0x1bc91a(476)](_0x6d3de3);
    }
    async [_0x12771a(448)](_0x35d8bb = ![]) {
      const _0x31d792 = _0x12771a;
      if (this[_0x31d792(471)] && !_0x35d8bb)
        return this[_0x31d792(471)];
      const _0x3b1074 = await fetch(_0x31d792(455)), _0x29c417 = await _0x3b1074[_0x31d792(473)]();
      return this["cart"] = _0x29c417, _0x29c417;
    }
    async [_0x12771a(439)](_0x99fee, _0x5efd1f = !![]) {
      const _0x4f17ea = _0x12771a, { cart: _0x4a7fe5 } = await this[_0x4f17ea(484)](_0x4f17ea(439), { "updates": _0x99fee }, _0x5efd1f);
      return _0x4a7fe5;
    }
    async ["append"](_0x1397a5, _0x2ae47b = !![]) {
      const _0x3c6abd = _0x12771a, { cart: _0x3f9d7f } = await this["request"](_0x3c6abd(463), { "items": _0x1397a5 }, _0x2ae47b);
      return _0x3f9d7f;
    }
    async [_0x12771a(474)](_0x292bf8, _0x27ac3d = !![]) {
      const _0x4c48f6 = _0x12771a, _0x175840 = _0x292bf8["filter"]((_0x5ca774) => {
        var _a2;
        return (_a2 = this[_0x4c48f6(471)]) == null ? void 0 : _a2[_0x4c48f6(486)][_0x4c48f6(422)]((_0x584eb8) => _0x584eb8[_0x4c48f6(482)] === _0x5ca774);
      });
      if (!_0x175840[_0x4c48f6(432)])
        return await this["get"]();
      const { cart: _0x2cdc07 } = await this[_0x4c48f6(484)](_0x4c48f6(439), { "updates": _0x175840[_0x4c48f6(431)]((_0xc619b7, _0x12039c) => ({ ..._0xc619b7, [_0x12039c]: 0 }), {}) }, _0x27ac3d);
      return _0x2cdc07;
    }
    [_0x12771a(487)](_0x46677e) {
      const _0x3b062e = _0x12771a, _0x5146f6 = typeof _0x46677e === _0x3b062e(466) ? _0x46677e : _0x46677e[_0x3b062e(425)](), _0x5581d8 = new URL(!_0x5146f6[_0x3b062e(437)](_0x3b062e(419)) || !_0x5146f6["startsWith"](_0x3b062e(433)) ? window["location"]["origin"] + "/" + _0x5146f6 : _0x5146f6), _0x24e592 = { "add": _0x3b062e(451), "update": _0x3b062e(430), "change": _0x3b062e(481), "clear": _0x3b062e(465) };
      for (const _0x543b0f in _0x24e592) {
        const _0x122ef6 = _0x24e592[_0x543b0f];
        if ([_0x122ef6, _0x122ef6 + ".js"][_0x3b062e(422)]((_0x336ef6) => _0x5581d8[_0x3b062e(459)]["endsWith"](_0x336ef6)))
          return _0x543b0f;
      }
      return null;
    }
    async [_0x12771a(494)](_0x3bdf49, _0x53dfc5) {
      const _0x2d4482 = _0x12771a, _0x5341d8 = this[_0x2d4482(471)];
      if (_0x53dfc5) {
        for (const _0x49fd00 of this[_0x2d4482(440)][_0x2d4482(493)]) {
          _0x49fd00(_0x5341d8 ?? await this["get"](!![]), { "requestType": _0x3bdf49, "updatedBy": _0x2d4482(435) }, () => new Promise((_0x37822f) => {
            const _0x2d33eb = () => {
              const _0x3da49a = _0x2cab;
              if (this[_0x3da49a(446)][_0x3da49a(460)] > 0 || this[_0x3da49a(441)])
                return setTimeout(_0x2d33eb, 800);
              _0x37822f(_0x53dfc5[_0x3da49a(453)](() => this[_0x3da49a(448)](!![])));
            };
            setTimeout(_0x2d33eb, 800);
          }));
        }
        await _0x53dfc5;
        const _0x39f64b = await this[_0x2d4482(448)](!![]);
        if (JSON[_0x2d4482(475)](_0x5341d8, null, 0) === JSON[_0x2d4482(475)](_0x39f64b, null, 0))
          return _0x5341d8;
        return _0x39f64b;
      }
      const _0x46eed3 = await this[_0x2d4482(448)](!![]);
      if (JSON[_0x2d4482(475)](_0x5341d8, null, 0) === JSON[_0x2d4482(475)](_0x46eed3, null, 0))
        return _0x5341d8;
      for (const _0x25c158 of this[_0x2d4482(440)][_0x2d4482(488)]) {
        _0x25c158(_0x46eed3, { "requestType": _0x3bdf49, "updatedBy": "api" });
      }
      return _0x46eed3;
    }
    async ["runQueue"](_0x30b848 = ![]) {
      const _0x58397a = _0x12771a;
      if (this["running"])
        return;
      for (const _0x2264e8 of this[_0x58397a(446)]) {
        this["running"] = _0x2264e8, this[_0x58397a(446)][_0x58397a(476)](_0x2264e8), localStorage[_0x58397a(429)]("wenexus-cart-queue", JSON[_0x58397a(475)](Array[_0x58397a(444)](this[_0x58397a(446)])));
        const _0x287f56 = await this[_0x58397a(489)]["call"](window, _0x58397a(468) + _0x2264e8[_0x58397a(428)] + _0x58397a(479), { "method": _0x58397a(445), "headers": _0x2264e8[_0x58397a(477)] ? { "Content-Type": "application/json" } : void 0, "body": _0x2264e8[_0x58397a(477)] ? JSON["stringify"](_0x2264e8[_0x58397a(477)]) : void 0 });
        window[_0x58397a(457)](new CustomEvent("wenexus-cart-response-" + _0x2264e8["id"], { "detail": _0x287f56 }));
      }
      this[_0x58397a(441)] = null, _0x30b848 && (alert(_0x58397a(491)), this[_0x58397a(494)]("add")), this["queue"][_0x58397a(460)] > 0 && setTimeout(() => this[_0x58397a(483)](), 10);
    }
    ["waitForResponse"](_0x856ec6) {
      return new Promise((_0x54d894) => {
        const _0x1d2542 = _0x2cab;
        window[_0x1d2542(427)]("wenexus-cart-response-" + _0x856ec6, (_0xc29ee1) => _0x54d894(_0xc29ee1[_0x1d2542(452)]));
      });
    }
    async [_0x12771a(484)](_0xfbe7ef, _0x3ae619, _0x2542b7 = !![]) {
      const _0x423a8d = _0x12771a, _0x5247db = Math["random"]()["toString"](36)[_0x423a8d(472)](2) + Date[_0x423a8d(420)]()[_0x423a8d(425)](36);
      this["queue"]["add"]({ "id": _0x5247db, "type": _0xfbe7ef, "payload": _0x3ae619, "trigger": _0x2542b7 }), localStorage["setItem"]("wenexus-cart-queue", JSON[_0x423a8d(475)](Array["from"](this[_0x423a8d(446)]))), this[_0x423a8d(483)]();
      const _0x47034a = await this[_0x423a8d(456)](_0x5247db);
      if (_0x2542b7)
        return { "cart": await this[_0x423a8d(494)](_0xfbe7ef), "response": await _0x47034a["json"]() };
      return { "cart": await this[_0x423a8d(448)](!_0x2542b7), "response": await _0x47034a["json"]() };
    }
  };
  __publicField(_CartApi, _a);
  let CartApi = _CartApi;
  function _0x2cab(_0x27e015, _0x199e3e) {
    const _0x5ee9ce = _0x5ee9();
    return _0x2cab = function(_0x2caba3, _0x28caa3) {
      _0x2caba3 = _0x2caba3 - 418;
      let _0x1f90f = _0x5ee9ce[_0x2caba3];
      return _0x1f90f;
    }, _0x2cab(_0x27e015, _0x199e3e);
  }
  window[_0x12771a(464)] = new CartApi(fetch);
  exports.CartApi = CartApi;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
