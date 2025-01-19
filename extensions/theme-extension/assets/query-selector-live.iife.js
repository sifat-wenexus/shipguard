var QuerySelectorLive = function(exports) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  var _a, _b, _c;
  function _0xd30b(_0x59ff39, _0x22b60f) {
    const _0x4f43af = _0x4f43();
    return _0xd30b = function(_0xd30b14, _0x11c65c) {
      _0xd30b14 = _0xd30b14 - 210;
      let _0x31f519 = _0x4f43af[_0xd30b14];
      return _0x31f519;
    }, _0xd30b(_0x59ff39, _0x22b60f);
  }
  function _0x4f43() {
    const _0x19c342 = ["562824bhnbhi", "add", "flatMap", "428gzMxVR", "clear", "observe", "querySelectorAll", "has", "delete", "4WKvHCj", "WeNexusQuerySelectorLive", "17074566tNBokp", "elements", "reconcile", "4976440QoxLwD", "documentElement", "34971MxCOpB", "from", "selector", "removeListener", "destroy", "size", "observer", "roots", "map", "8371356bYwHkg", "listeners", "8441700gRPaMJ", "addListener", "10050048zVgDcS"];
    _0x4f43 = function() {
      return _0x19c342;
    };
    return _0x4f43();
  }
  const _0x56ccb7 = _0xd30b;
  (function(_0x53a18d, _0x2065fc) {
    const _0x3a95f9 = _0xd30b, _0x1598a5 = _0x53a18d();
    while (!![]) {
      try {
        const _0x15caa5 = -parseInt(_0x3a95f9(228)) / 1 * (-parseInt(_0x3a95f9(219)) / 2) + parseInt(_0x3a95f9(235)) / 3 * (parseInt(_0x3a95f9(222)) / 4) + -parseInt(_0x3a95f9(233)) / 5 + parseInt(_0x3a95f9(216)) / 6 + parseInt(_0x3a95f9(214)) / 7 + -parseInt(_0x3a95f9(218)) / 8 + -parseInt(_0x3a95f9(230)) / 9;
        if (_0x15caa5 === _0x2065fc)
          break;
        else
          _0x1598a5["push"](_0x1598a5["shift"]());
      } catch (_0x3ac1d5) {
        _0x1598a5["push"](_0x1598a5["shift"]());
      }
    }
  })(_0x4f43, 827087);
  class QuerySelectorLive2 {
    constructor(_0x594ffc, _0x3729a5 = /* @__PURE__ */ new Set([document[_0x56ccb7(234)]])) {
      __publicField(this, _a, /* @__PURE__ */ new Set());
      __publicField(this, _b, /* @__PURE__ */ new Set());
      __publicField(this, _c, null);
      const _0x3b212d = _0x56ccb7;
      this[_0x3b212d(237)] = _0x594ffc, this[_0x3b212d(212)] = _0x3729a5;
    }
    ["setup"]() {
      const _0x3e97f9 = _0x56ccb7;
      if (this[_0x3e97f9(211)])
        return;
      this[_0x3e97f9(211)] = new MutationObserver(() => this[_0x3e97f9(232)]());
      for (const _0x43deea of this[_0x3e97f9(212)]) {
        this[_0x3e97f9(211)][_0x3e97f9(224)](_0x43deea, { "childList": !![], "subtree": !![] });
      }
      this[_0x3e97f9(232)]();
    }
    [(_a = _0x56ccb7(215), _b = _0x56ccb7(231), _c = _0x56ccb7(211), _0x56ccb7(232))]() {
      const _0x226abe = _0x56ccb7, _0x1c1c43 = new Set(Array[_0x226abe(236)](this[_0x226abe(212)])[_0x226abe(213)]((_0x213594) => _0x213594[_0x226abe(225)](this[_0x226abe(237)]))[_0x226abe(221)]((_0x40049d) => Array[_0x226abe(236)](_0x40049d))), _0x32d616 = /* @__PURE__ */ new Set(), _0x18ad18 = /* @__PURE__ */ new Set();
      for (const _0x32b60a of _0x1c1c43) {
        !this[_0x226abe(231)][_0x226abe(226)](_0x32b60a) && _0x18ad18[_0x226abe(220)](_0x32b60a);
      }
      for (const _0x185811 of this[_0x226abe(231)]) {
        !_0x1c1c43[_0x226abe(226)](_0x185811) && _0x32d616[_0x226abe(220)](_0x185811);
      }
      if (_0x18ad18[_0x226abe(210)] > 0 || _0x32d616[_0x226abe(210)] > 0) {
        this[_0x226abe(231)][_0x226abe(223)]();
        for (const _0x4fb8b3 of _0x1c1c43) {
          this[_0x226abe(231)][_0x226abe(220)](_0x4fb8b3);
        }
        for (const _0x34c048 of this[_0x226abe(215)]) {
          _0x34c048(this[_0x226abe(231)]);
        }
      }
    }
    [_0x56ccb7(217)](_0x13a259) {
      const _0x5ad031 = _0x56ccb7;
      this[_0x5ad031(215)][_0x5ad031(220)](_0x13a259), this["listeners"][_0x5ad031(210)] === 1 && this["setup"]();
    }
    [_0x56ccb7(238)](_0x4d8f12) {
      const _0x39caca = _0x56ccb7;
      this[_0x39caca(215)][_0x39caca(227)](_0x4d8f12), this[_0x39caca(215)][_0x39caca(210)] === 0 && this[_0x39caca(239)]();
    }
    [_0x56ccb7(239)]() {
      var _a2;
      const _0x2f47ad = _0x56ccb7;
      this[_0x2f47ad(215)][_0x2f47ad(223)](), (_a2 = this[_0x2f47ad(211)]) == null ? void 0 : _a2["disconnect"]();
    }
  }
  window[_0x56ccb7(229)] = QuerySelectorLive2;
  exports.QuerySelectorLive = QuerySelectorLive2;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
