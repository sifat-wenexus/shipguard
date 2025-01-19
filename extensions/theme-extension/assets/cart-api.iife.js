var CartAPI = function(exports) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  var _a, _b, _c;
  const _0x20fa74 = _0x2961;
  (function(_0x943621, _0x2608bd) {
    const _0x511046 = _0x2961, _0x47be98 = _0x943621();
    while (!![]) {
      try {
        const _0x582b0c = parseInt(_0x511046(299)) / 1 * (-parseInt(_0x511046(273)) / 2) + parseInt(_0x511046(323)) / 3 * (parseInt(_0x511046(297)) / 4) + parseInt(_0x511046(327)) / 5 + -parseInt(_0x511046(291)) / 6 + -parseInt(_0x511046(260)) / 7 + parseInt(_0x511046(295)) / 8 + parseInt(_0x511046(305)) / 9;
        if (_0x582b0c === _0x2608bd)
          break;
        else
          _0x47be98["push"](_0x47be98["shift"]());
      } catch (_0x2b5e82) {
        _0x47be98["push"](_0x47be98["shift"]());
      }
    }
  })(_0x5c67, 834346);
  function _0x2961(_0x207345, _0x32b328) {
    const _0x5c67b1 = _0x5c67();
    return _0x2961 = function(_0x2961e1, _0x24b6d3) {
      _0x2961e1 = _0x2961e1 - 253;
      let _0x47778f = _0x5c67b1[_0x2961e1];
      return _0x47778f;
    }, _0x2961(_0x207345, _0x32b328);
  }
  const _XHRCustom = class _XHRCustom extends XMLHttpRequest {
    static [(_a = _0x20fa74(316), _b = _0x20fa74(309), _0x20fa74(284))](_0x48ff4b, _0x2e09bb, _0x11b5f0 = !![]) {
      const _0x58d1bb = _0x20fa74;
      _0x11b5f0 ? this["beforeListeners"][_0x48ff4b]["add"](_0x2e09bb) : this[_0x58d1bb(309)][_0x48ff4b][_0x58d1bb(301)](_0x2e09bb);
    }
    static ["removeEventListener"](_0x251f69, _0x37b8f6, _0x1a77ab = !![]) {
      const _0x441676 = _0x20fa74;
      _0x1a77ab ? this["beforeListeners"][_0x251f69]["delete"](_0x37b8f6) : this[_0x441676(309)][_0x251f69][_0x441676(275)](_0x37b8f6);
    }
    [_0x20fa74(285)](_0x5a876f, _0x3c84da, _0xdf239d = !![], _0x5baec4, _0x5ae46b) {
      const _0xee26b1 = _0x20fa74;
      for (const _0x5a53da of _XHRCustom[_0xee26b1(316)][_0xee26b1(285)]) {
        _0x5a53da(this, _0x5a876f, _0x3c84da, _0xdf239d, _0x5baec4, _0x5ae46b);
      }
      super[_0xee26b1(285)](_0x5a876f, _0x3c84da, _0xdf239d, _0x5baec4, _0x5ae46b);
      for (const _0x53f9c0 of _XHRCustom["afterListeners"]["open"]) {
        _0x53f9c0(this, _0x5a876f, _0x3c84da, _0xdf239d, _0x5baec4, _0x5ae46b);
      }
    }
  };
  __publicField(_XHRCustom, _a, { "open": /* @__PURE__ */ new Set() });
  __publicField(_XHRCustom, _b, { "open": /* @__PURE__ */ new Set() });
  let XHRCustom = _XHRCustom;
  const _CartApi = class _CartApi {
    constructor(_0xde7a10) {
      __publicField(this, "queue", /* @__PURE__ */ new Set());
      __publicField(this, "listeners", { "before": /* @__PURE__ */ new Set(), "after": /* @__PURE__ */ new Set() });
      __publicField(this, "running", null);
      __publicField(this, _c, null);
      const _0x16322b = _0x20fa74;
      this[_0x16322b(317)] = _0xde7a10;
      if (!_CartApi["instance"])
        _CartApi["instance"] = this;
      else
        return _CartApi[_0x16322b(271)];
      const _0x7e5e4 = async (_0xafebd7, _0x197fe2) => {
        const _0x440d05 = _0x16322b, _0x2a4571 = typeof _0xafebd7 === _0x440d05(308) || _0xafebd7 instanceof URL ? _0xafebd7[_0x440d05(315)]() : _0xafebd7[_0x440d05(259)], _0x3d9358 = this[_0x440d05(274)](_0x2a4571);
        if (_0x3d9358) {
          const _0x2e9eec = _0xde7a10(_0xafebd7, _0x197fe2);
          this["notifyListeners"](_0x3d9358, _0x2e9eec);
          const _0x22c697 = await _0x2e9eec;
          return await this[_0x440d05(287)](_0x3d9358), _0x22c697;
        }
        return _0xde7a10(_0xafebd7, _0x197fe2);
      };
      window[_0x16322b(289)] = _0x7e5e4, window["XMLHttpRequest"] = XHRCustom, XHRCustom["addEventListener"](_0x16322b(285), (_0x2830bb, _0x1e9cef, _0x30b657) => {
        const _0x2ea819 = _0x16322b, _0x2d4d4a = this[_0x2ea819(274)](_0x30b657);
        if (_0x2d4d4a) {
          const _0x1cdc72 = new Promise((_0x1fae75, _0x2ac2ea) => {
            const _0x3e9d14 = _0x2ea819;
            _0x2830bb[_0x3e9d14(284)](_0x3e9d14(307), () => {
              _0x1fae75(void 0), this["notifyListeners"](_0x2d4d4a);
            }), _0x2830bb[_0x3e9d14(284)](_0x3e9d14(304), _0x2ac2ea);
          });
          this["notifyListeners"](_0x2d4d4a, _0x1cdc72);
        }
      }, !![]);
      const _0x4917fe = localStorage[_0x16322b(326)](_0x16322b(281));
      _0x4917fe && (this[_0x16322b(302)] = new Set(JSON["parse"](_0x4917fe))), this[_0x16322b(267)](this[_0x16322b(302)]["size"] > 0), window[_0x16322b(284)](_0x16322b(265), (_0x4d3016) => {
        const _0x4487c4 = _0x16322b;
        if (this["queue"][_0x4487c4(270)] > 0)
          return _0x4d3016[_0x4487c4(311)](), _0x4487c4(254);
      });
    }
    [(_c = _0x20fa74(258), _0x20fa74(278))](_0x5aff99, _0x1d1808 = ![]) {
      const _0x289962 = _0x20fa74;
      return this[_0x289962(313)][_0x1d1808 ? _0x289962(257) : _0x289962(324)][_0x289962(301)](_0x5aff99), () => {
        const _0x349cd9 = _0x289962;
        this[_0x349cd9(325)](_0x5aff99, _0x1d1808);
      };
    }
    [_0x20fa74(325)](_0x18beca, _0x595693 = ![]) {
      const _0x2fb30b = _0x20fa74;
      this[_0x2fb30b(313)][_0x595693 ? "before" : _0x2fb30b(324)][_0x2fb30b(275)](_0x18beca);
    }
    async [_0x20fa74(279)](_0xade8fa = ![]) {
      const _0x380c71 = _0x20fa74;
      if (this[_0x380c71(258)] && !_0xade8fa)
        return this[_0x380c71(258)];
      const _0x481d68 = await fetch("/cart.js"), _0x4dd04e = await _0x481d68[_0x380c71(276)]();
      return this[_0x380c71(258)] = _0x4dd04e, _0x4dd04e;
    }
    async [_0x20fa74(321)](_0x35f963, _0x2dcd7d = !![]) {
      const _0x18c08b = _0x20fa74, { cart: _0x46a815 } = await this[_0x18c08b(292)]("update", { "updates": _0x35f963 }, _0x2dcd7d);
      return _0x46a815;
    }
    async [_0x20fa74(298)](_0x18e626, _0x368124 = !![]) {
      const _0x558fef = _0x20fa74, { cart: _0x16aa2f } = await this[_0x558fef(292)](_0x558fef(301), { "items": _0x18e626 }, _0x368124);
      return _0x16aa2f;
    }
    async [_0x20fa74(277)](_0x11d057, _0x3fabfd = !![]) {
      const _0x58c4a0 = _0x20fa74, _0x2b5a61 = _0x11d057["filter"]((_0x311388) => {
        var _a2;
        return (_a2 = this[_0x58c4a0(258)]) == null ? void 0 : _a2[_0x58c4a0(272)]["some"]((_0xe6fb9e) => _0xe6fb9e["variant_id"] === _0x311388);
      });
      if (!_0x2b5a61["length"])
        return await this[_0x58c4a0(279)]();
      const { cart: _0xdc4575 } = await this["request"]("update", { "updates": _0x2b5a61[_0x58c4a0(269)]((_0x20b241, _0x271498) => ({ ..._0x20b241, [_0x271498]: 0 }), {}) }, _0x3fabfd);
      return _0xdc4575;
    }
    ["getCartEndpoint"](_0x35aac0) {
      const _0x5cbae6 = _0x20fa74, _0x38b921 = typeof _0x35aac0 === _0x5cbae6(308) ? _0x35aac0 : _0x35aac0[_0x5cbae6(315)](), _0x346bbc = new URL(!_0x38b921[_0x5cbae6(328)](_0x5cbae6(296)) || !_0x38b921[_0x5cbae6(328)]("https://") ? window[_0x5cbae6(280)]["origin"] + "/" + _0x38b921 : _0x38b921), _0x422b60 = { "add": _0x5cbae6(262), "update": _0x5cbae6(293), "change": _0x5cbae6(282), "clear": _0x5cbae6(264) };
      for (const _0x2ffd8d in _0x422b60) {
        const _0x351eab = _0x422b60[_0x2ffd8d];
        if ([_0x351eab, _0x351eab + ".js"][_0x5cbae6(300)]((_0xde76c7) => _0x346bbc[_0x5cbae6(261)][_0x5cbae6(266)](_0xde76c7)))
          return _0x2ffd8d;
      }
      return null;
    }
    async ["notifyListeners"](_0x203247, _0x190ce8) {
      const _0x205ada = _0x20fa74, _0x458752 = this[_0x205ada(258)];
      if (_0x190ce8) {
        for (const _0x182311 of this["listeners"][_0x205ada(257)]) {
          _0x182311(_0x458752 ?? await this["get"](!![]), { "requestType": _0x203247, "updatedBy": _0x205ada(288) }, () => new Promise((_0x4712af) => {
            const _0x2d4d3a = () => {
              const _0x2ee3af = _0x2961;
              if (this[_0x2ee3af(302)][_0x2ee3af(270)] > 0 || this[_0x2ee3af(314)])
                return setTimeout(_0x2d4d3a, 800);
              _0x4712af(_0x190ce8[_0x2ee3af(303)](() => this[_0x2ee3af(279)](!![])));
            };
            setTimeout(_0x2d4d3a, 800);
          }));
        }
        await _0x190ce8;
        const _0x1f8c7e = await this[_0x205ada(279)](!![]);
        if (JSON["stringify"](_0x458752, null, 0) === JSON[_0x205ada(329)](_0x1f8c7e, null, 0))
          return _0x458752;
        return _0x1f8c7e;
      }
      const _0x487ef4 = await this["get"](!![]);
      if (JSON[_0x205ada(329)](_0x458752, null, 0) === JSON["stringify"](_0x487ef4, null, 0))
        return _0x458752;
      for (const _0x19b686 of this["listeners"][_0x205ada(324)]) {
        _0x19b686(_0x487ef4, { "requestType": _0x203247, "updatedBy": _0x205ada(288) });
      }
      return _0x487ef4;
    }
    async [_0x20fa74(267)](_0xdc0928 = ![]) {
      const _0x1c8e64 = _0x20fa74;
      if (this[_0x1c8e64(314)])
        return;
      for (const _0x3bc5ed of this[_0x1c8e64(302)]) {
        this[_0x1c8e64(314)] = _0x3bc5ed, this[_0x1c8e64(302)][_0x1c8e64(275)](_0x3bc5ed), localStorage[_0x1c8e64(322)]("wenexus-cart-queue", JSON[_0x1c8e64(329)](Array[_0x1c8e64(283)](this["queue"])));
        const _0x5276bc = await this[_0x1c8e64(317)][_0x1c8e64(253)](window, _0x1c8e64(255) + _0x3bc5ed[_0x1c8e64(268)] + _0x1c8e64(306), { "method": "POST", "headers": _0x3bc5ed[_0x1c8e64(312)] ? { "Content-Type": _0x1c8e64(319) } : void 0, "body": _0x3bc5ed[_0x1c8e64(312)] ? JSON[_0x1c8e64(329)](_0x3bc5ed[_0x1c8e64(312)]) : void 0 });
        window[_0x1c8e64(290)](new CustomEvent(_0x1c8e64(263) + _0x3bc5ed["id"], { "detail": _0x5276bc }));
      }
      this[_0x1c8e64(314)] = null, _0xdc0928 && (alert(_0x1c8e64(294)), this["notifyListeners"](_0x1c8e64(301))), this[_0x1c8e64(302)][_0x1c8e64(270)] > 0 && setTimeout(() => this[_0x1c8e64(267)](), 10);
    }
    [_0x20fa74(318)](_0x2498d7) {
      return new Promise((_0x4c861e) => {
        const _0x19218b = _0x2961;
        window[_0x19218b(284)]("wenexus-cart-response-" + _0x2498d7, (_0x19cb43) => _0x4c861e(_0x19cb43[_0x19218b(320)]));
      });
    }
    async [_0x20fa74(292)](_0x40f7d7, _0x18d0be, _0x5ad4c0 = !![]) {
      const _0x46ff9a = _0x20fa74, _0x2ed8e0 = Math[_0x46ff9a(256)]()[_0x46ff9a(315)](36)[_0x46ff9a(286)](2) + Date["now"]()["toString"](36);
      this[_0x46ff9a(302)][_0x46ff9a(301)]({ "id": _0x2ed8e0, "type": _0x40f7d7, "payload": _0x18d0be, "trigger": _0x5ad4c0 }), localStorage[_0x46ff9a(322)](_0x46ff9a(281), JSON["stringify"](Array[_0x46ff9a(283)](this[_0x46ff9a(302)]))), this["runQueue"]();
      const _0x490470 = await this["waitForResponse"](_0x2ed8e0);
      if (_0x5ad4c0)
        return { "cart": await this[_0x46ff9a(287)](_0x40f7d7), "response": await _0x490470[_0x46ff9a(276)]() };
      return { "cart": await this[_0x46ff9a(279)](!_0x5ad4c0), "response": await _0x490470[_0x46ff9a(276)]() };
    }
  };
  __publicField(_CartApi, "instance");
  let CartApi = _CartApi;
  function _0x5c67() {
    const _0x570306 = ["location", "wenexus-cart-queue", "/cart/change", "from", "addEventListener", "open", "slice", "notifyListeners", "api", "fetch", "dispatchEvent", "1692564GGUrtU", "request", "/cart/update", "Recovered from lost cart updates", "13280832PrGuab", "http://", "4DwUNMo", "append", "65181AfRkGu", "some", "add", "queue", "then", "error", "2501613yCLObO", ".js", "load", "string", "afterListeners", "weNexusCartApi", "preventDefault", "payload", "listeners", "running", "toString", "beforeListeners", "fetchFn", "waitForResponse", "application/json", "detail", "update", "setItem", "4460196CTUTMN", "after", "removeListener", "getItem", "500505wCqnje", "startsWith", "stringify", "call", "Cart updates are still in progress. Are you sure you want to leave?", "/cart/", "random", "before", "cart", "url", "5452503DOnGZt", "pathname", "/cart/add", "wenexus-cart-response-", "/cart/clear", "beforeunload", "endsWith", "runQueue", "type", "reduce", "size", "instance", "items", "50VGpiWW", "getCartEndpoint", "delete", "json", "remove", "addListener", "get"];
    _0x5c67 = function() {
      return _0x570306;
    };
    return _0x5c67();
  }
  window[_0x20fa74(310)] = new CartApi(fetch);
  exports.CartApi = CartApi;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
