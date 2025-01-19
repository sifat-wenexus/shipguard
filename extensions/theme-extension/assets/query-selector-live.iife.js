var QuerySelectorLive = function(exports) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  var _a, _b, _c;
  const _0x579eb7 = _0x4351;
  function _0x22a2() {
    const _0x2a1331 = ["listeners", "8mWMhvh", "flatMap", "clear", "2020876YujYPB", "from", "WeNexusQuerySelectorLive", "setup", "observer", "9534080UrGoYO", "add", "elements", "selector", "reconcile", "1oJhZOL", "removeListener", "8094492YYcmRv", "roots", "size", "433930SdeqQC", "destroy", "4206090XipeJK", "2728659UmVQyx", "map", "514335lHAHHB", "4gxAUsq", "has", "disconnect", "observe"];
    _0x22a2 = function() {
      return _0x2a1331;
    };
    return _0x22a2();
  }
  function _0x4351(_0xe80988, _0x5d8ddd) {
    const _0x22a281 = _0x22a2();
    return _0x4351 = function(_0x4351c9, _0x54b9c3) {
      _0x4351c9 = _0x4351c9 - 170;
      let _0x29e128 = _0x22a281[_0x4351c9];
      return _0x29e128;
    }, _0x4351(_0xe80988, _0x5d8ddd);
  }
  (function(_0x5a863c, _0x309ea1) {
    const _0x142c2e = _0x4351, _0x214bd8 = _0x5a863c();
    while (!![]) {
      try {
        const _0x43c4f8 = parseInt(_0x142c2e(179)) / 1 * (parseInt(_0x142c2e(198)) / 2) + -parseInt(_0x142c2e(187)) / 3 + -parseInt(_0x142c2e(190)) / 4 * (parseInt(_0x142c2e(189)) / 5) + parseInt(_0x142c2e(186)) / 6 + -parseInt(_0x142c2e(184)) / 7 * (parseInt(_0x142c2e(195)) / 8) + parseInt(_0x142c2e(181)) / 9 + -parseInt(_0x142c2e(174)) / 10;
        if (_0x43c4f8 === _0x309ea1)
          break;
        else
          _0x214bd8["push"](_0x214bd8["shift"]());
      } catch (_0x375044) {
        _0x214bd8["push"](_0x214bd8["shift"]());
      }
    }
  })(_0x22a2, 583023);
  class QuerySelectorLive2 {
    constructor(_0x1f7ae3, _0x54fba1 = /* @__PURE__ */ new Set([document["documentElement"]])) {
      __publicField(this, _a, /* @__PURE__ */ new Set());
      __publicField(this, _b, /* @__PURE__ */ new Set());
      __publicField(this, _c, null);
      const _0x143501 = _0x4351;
      this[_0x143501(177)] = _0x1f7ae3, this[_0x143501(182)] = _0x54fba1;
    }
    ["setup"]() {
      const _0x479d98 = _0x579eb7;
      if (this["observer"])
        return;
      this[_0x479d98(173)] = new MutationObserver(() => this[_0x479d98(178)]());
      for (const _0x518b38 of this[_0x479d98(182)]) {
        this["observer"][_0x479d98(193)](_0x518b38, { "childList": !![], "subtree": !![] });
      }
      this[_0x479d98(178)]();
    }
    ["reconcile"]() {
      const _0x30971d = _0x579eb7, _0x376ca2 = new Set(Array[_0x30971d(170)](this["roots"])[_0x30971d(188)]((_0x4e38f9) => _0x4e38f9["querySelectorAll"](this[_0x30971d(177)]))[_0x30971d(196)]((_0x810ffa) => Array[_0x30971d(170)](_0x810ffa))), _0x412de8 = /* @__PURE__ */ new Set(), _0x2032f5 = /* @__PURE__ */ new Set();
      for (const _0x5c4c38 of _0x376ca2) {
        !this[_0x30971d(176)][_0x30971d(191)](_0x5c4c38) && _0x2032f5["add"](_0x5c4c38);
      }
      for (const _0x4bbbb0 of this[_0x30971d(176)]) {
        !_0x376ca2[_0x30971d(191)](_0x4bbbb0) && _0x412de8[_0x30971d(175)](_0x4bbbb0);
      }
      if (_0x2032f5[_0x30971d(183)] > 0 || _0x412de8[_0x30971d(183)] > 0) {
        this[_0x30971d(176)]["clear"]();
        for (const _0x3d3bc8 of _0x376ca2) {
          this[_0x30971d(176)][_0x30971d(175)](_0x3d3bc8);
        }
        for (const _0x4f09c6 of this[_0x30971d(194)]) {
          _0x4f09c6(this["elements"]);
        }
      }
    }
    ["addListener"](_0x2835ce) {
      const _0xdad93a = _0x579eb7;
      this["listeners"][_0xdad93a(175)](_0x2835ce), this[_0xdad93a(194)][_0xdad93a(183)] === 1 && this[_0xdad93a(172)]();
    }
    [(_a = _0x579eb7(194), _b = _0x579eb7(176), _c = _0x579eb7(173), _0x579eb7(180))](_0x3cc83e) {
      const _0xf1552b = _0x579eb7;
      this[_0xf1552b(194)]["delete"](_0x3cc83e), this[_0xf1552b(194)][_0xf1552b(183)] === 0 && this[_0xf1552b(185)]();
    }
    [_0x579eb7(185)]() {
      var _a2;
      const _0x442cfb = _0x579eb7;
      this[_0x442cfb(194)][_0x442cfb(197)](), (_a2 = this[_0x442cfb(173)]) == null ? void 0 : _a2[_0x442cfb(192)]();
    }
  }
  window[_0x579eb7(171)] = QuerySelectorLive2;
  exports.QuerySelectorLive = QuerySelectorLive2;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
