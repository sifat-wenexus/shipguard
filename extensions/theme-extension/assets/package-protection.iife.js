(function(){ var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function() {
  "use strict";
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  const _0x54fc1c = _0x2aba;
  (function(_0x2e3b5b, _0x495f8f) {
    const _0x4746e6 = _0x2aba, _0x189e1a = _0x2e3b5b();
    while (!![]) {
      try {
        const _0x2d7c30 = parseInt(_0x4746e6(347)) / 1 * (-parseInt(_0x4746e6(317)) / 2) + -parseInt(_0x4746e6(334)) / 3 * (-parseInt(_0x4746e6(335)) / 4) + -parseInt(_0x4746e6(324)) / 5 + -parseInt(_0x4746e6(315)) / 6 * (parseInt(_0x4746e6(297)) / 7) + parseInt(_0x4746e6(314)) / 8 * (parseInt(_0x4746e6(307)) / 9) + -parseInt(_0x4746e6(346)) / 10 + parseInt(_0x4746e6(340)) / 11 * (parseInt(_0x4746e6(312)) / 12);
        if (_0x2d7c30 === _0x495f8f)
          break;
        else
          _0x189e1a["push"](_0x189e1a["shift"]());
      } catch (_0x23c907) {
        _0x189e1a["push"](_0x189e1a["shift"]());
      }
    }
  })(_0x4d05, 404602);
  function _0x2aba(_0x4e09f0, _0x4b8e1d) {
    const _0x4d058f = _0x4d05();
    return _0x2aba = function(_0x2aba6a, _0x1d0dba) {
      _0x2aba6a = _0x2aba6a - 292;
      let _0x537d48 = _0x4d058f[_0x2aba6a];
      return _0x537d48;
    }, _0x2aba(_0x4e09f0, _0x4b8e1d);
  }
  var PackageProtectionType = ((_0x165601) => {
    const _0xf49fdd = _0x2aba;
    return _0x165601[_0xf49fdd(292)] = _0xf49fdd(292), _0x165601[_0xf49fdd(339)] = "PERCENTAGE", _0x165601["FIXED"] = "FIXED", _0x165601;
  })(PackageProtectionType || {});
  const _PackageProtectionApi = class _PackageProtectionApi {
    constructor(_0x63df8e, _0x435d16) {
      __publicField(this, "basedOnCartValueVariants", []);
      __publicField(this, _a, {});
      __publicField(this, _b, null);
      __publicField(this, _c, _0x54fc1c(339));
      __publicField(this, _d, /* @__PURE__ */ new Set());
      __publicField(this, "prices", []);
      const _0x13035f = _0x2aba;
      return this[_0x13035f(320)] = _0x63df8e, this["enabled"] = _0x435d16, _PackageProtectionApi[_0x13035f(299)] && (_PackageProtectionApi["instance"] = this), _PackageProtectionApi[_0x13035f(299)];
    }
    get [(_a = _0x54fc1c(306), _b = _0x54fc1c(294), _c = _0x54fc1c(345), _d = _0x54fc1c(309), _e = _0x54fc1c(299), _0x54fc1c(323))]() {
      const _0x4aa149 = _0x54fc1c;
      return this["prices"][this[_0x4aa149(343)][_0x4aa149(337)] - 1];
    }
    get ["lowestPrice"]() {
      const _0x2c952d = _0x54fc1c;
      return this[_0x2c952d(343)][0];
    }
    ["setVariants"](_0x4bee8b, _0x17b859) {
      const _0x7f61c3 = _0x54fc1c;
      this[_0x7f61c3(345)] = _0x4bee8b, this["prices"]["length"] = 0, this[_0x7f61c3(309)][_0x7f61c3(300)]();
      if (_0x4bee8b === _0x7f61c3(339)) {
        for (const _0x4ca695 of Object[_0x7f61c3(305)](this["percentageVariants"])) {
          delete this["percentageVariants"][_0x4ca695];
        }
        this[_0x7f61c3(343)][_0x7f61c3(296)](...Object[_0x7f61c3(305)](_0x17b859)[_0x7f61c3(331)](Number)["sort"]((_0x56a297, _0x48a563) => _0x56a297 - _0x48a563));
        for (const _0x94a2ee of Object[_0x7f61c3(305)](_0x17b859)) {
          this["percentageVariants"][_0x94a2ee] = _0x17b859[_0x94a2ee], this[_0x7f61c3(309)][_0x7f61c3(329)](_0x17b859[_0x94a2ee]);
        }
      } else
        _0x4bee8b === "FIXED" ? (this[_0x7f61c3(309)][_0x7f61c3(329)](_0x17b859[_0x7f61c3(342)]), this[_0x7f61c3(294)] = _0x17b859, this[_0x7f61c3(343)]["push"](_0x17b859[_0x7f61c3(302)])) : (this[_0x7f61c3(341)][_0x7f61c3(296)](..._0x17b859), this[_0x7f61c3(341)][_0x7f61c3(308)]((_0x428efb) => this[_0x7f61c3(309)][_0x7f61c3(329)](_0x428efb[_0x7f61c3(342)])), this["prices"][_0x7f61c3(296)](...this[_0x7f61c3(341)][_0x7f61c3(331)]((_0xd3db96) => _0xd3db96[_0x7f61c3(302)])[_0x7f61c3(326)]((_0x4d5cdc, _0xa988ec) => _0x4d5cdc - _0xa988ec)));
    }
    async [_0x54fc1c(349)]() {
      const _0x2f50c3 = _0x54fc1c, _0x72c39d = await window[_0x2f50c3(295)][_0x2f50c3(313)]();
      return _0x72c39d["items"][_0x2f50c3(330)]((_0x2ca9d8) => !this[_0x2f50c3(309)]["has"](_0x2ca9d8[_0x2f50c3(318)]));
    }
    async [_0x54fc1c(328)]() {
      const _0x2a674e = _0x54fc1c, _0x109be0 = await window[_0x2a674e(295)][_0x2a674e(313)]();
      return _0x109be0[_0x2a674e(325)][_0x2a674e(330)]((_0x34b7e3) => this[_0x2a674e(309)][_0x2a674e(321)](_0x34b7e3["variant_id"]));
    }
    async [_0x54fc1c(311)]() {
      const _0x3000b3 = _0x54fc1c, _0x3e4fa5 = await this[_0x3000b3(349)](), _0x422f14 = window[_0x3000b3(301)][_0x3000b3(336)][_0x3000b3(331)]((_0x4ab3fe) => {
        const _0x31e62a = _0x3000b3;
        return _0x4ab3fe["excludedPackageProtectionVariants"][_0x31e62a(331)]((_0x2fd09f) => Number(_0x2fd09f["id"][_0x31e62a(298)](_0x31e62a(322), "")));
      })[_0x3000b3(332)](), _0x3b3f7e = () => {
        const _0xfe02e6 = _0x3000b3, _0x5ea35a = [];
        for (let _0x2e714c = 0; _0x2e714c < _0x3e4fa5[_0xfe02e6(337)]; _0x2e714c++) {
          const _0x3aa066 = _0x3e4fa5[_0x2e714c][_0xfe02e6(318)];
          !_0x422f14[_0xfe02e6(293)](_0x3aa066) && _0x5ea35a[_0xfe02e6(296)](_0x3e4fa5[_0x2e714c]);
        }
        return _0x5ea35a;
      }, _0x4fcf11 = _0x3b3f7e(), _0x6043c3 = _0x4fcf11["reduce"]((_0x114681, _0x1d9d20) => _0x114681 + _0x1d9d20["final_line_price"], 0) / 100;
      if (this[_0x3000b3(345)] === _0x3000b3(338)) {
        if (this[_0x3000b3(294)] === null)
          throw new Error(_0x3000b3(303));
        return { "actualPrice": this[_0x3000b3(294)]["price"], "variantId": this["fixedVariantOption"]["variantId"], "coercedPrice": this[_0x3000b3(294)][_0x3000b3(302)][_0x3000b3(316)](2), "forPrice": _0x6043c3 };
      }
      if (this[_0x3000b3(345)] === _0x3000b3(339)) {
        if (this[_0x3000b3(343)][_0x3000b3(337)] === 0)
          throw new Error(_0x3000b3(344));
        let _0x4fc15e = this["lowestPrice"][_0x3000b3(316)](2), _0x435b48 = _0x6043c3 / 100 * this[_0x3000b3(320)];
        if (_0x435b48 <= this[_0x3000b3(323)] && _0x435b48 >= this[_0x3000b3(348)])
          for (const _0x324404 of this["prices"]) {
            if (_0x324404 > _0x435b48) {
              _0x4fc15e = _0x324404[_0x3000b3(316)](2);
              break;
            }
          }
        else {
          if (_0x435b48 > this["highestPrice"])
            _0x4fc15e = this[_0x3000b3(323)][_0x3000b3(316)](2);
          else
            _0x435b48 < this["lowestPrice"] && (_0x4fc15e = this[_0x3000b3(348)][_0x3000b3(316)](2));
        }
        return { "actualPrice": Number(_0x435b48[_0x3000b3(316)](2)), "variantId": this[_0x3000b3(306)][_0x4fc15e], "coercedPrice": _0x4fc15e, "forPrice": _0x6043c3 };
      }
      if (this[_0x3000b3(341)][_0x3000b3(337)] === 0)
        throw new Error(_0x3000b3(344));
      const _0x2d3f59 = _0x6043c3, _0xfff639 = this[_0x3000b3(341)][_0x3000b3(333)]((_0x3cada6) => _0x2d3f59 >= _0x3cada6[_0x3000b3(310)] && _0x2d3f59 <= _0x3cada6["max"]);
      if (!_0xfff639)
        throw new Error(_0x3000b3(319));
      return { "actualPrice": _0xfff639[_0x3000b3(302)], "variantId": _0xfff639[_0x3000b3(342)], "coercedPrice": _0xfff639[_0x3000b3(302)][_0x3000b3(316)](2), "forPrice": _0x6043c3 };
    }
    async ["add"]() {
      const _0x5d6afc = _0x54fc1c, _0x1fecbe = await this[_0x5d6afc(328)]();
      if (_0x1fecbe[_0x5d6afc(337)] > 0)
        return;
      const { variantId: _0x1c91f9 } = await this["calculate"](), _0x3202ef = await window[_0x5d6afc(295)][_0x5d6afc(304)]([{ "id": _0x1c91f9, "quantity": 1 }], ![]);
      return _0x3202ef[_0x5d6afc(325)][_0x5d6afc(333)]((_0xc52e66) => _0xc52e66["variant_id"] === _0x1c91f9);
    }
    async ["remove"]() {
      const _0x4b3190 = _0x54fc1c;
      if (this[_0x4b3190(343)][_0x4b3190(337)] === 0)
        throw new Error(_0x4b3190(344));
      const _0x399143 = await this[_0x4b3190(328)]();
      if (_0x399143[_0x4b3190(337)] === 0)
        return;
      return await window[_0x4b3190(295)][_0x4b3190(327)](_0x399143["map"]((_0x4195dc) => _0x4195dc[_0x4b3190(318)]), ![]), _0x399143[0];
    }
  };
  __publicField(_PackageProtectionApi, _e);
  let PackageProtectionApi = _PackageProtectionApi;
  function _0x4d05() {
    const _0x14cce4 = ["6013790sdScUu", "355151UkRlGu", "lowestPrice", "getNonPackageProtectionItems", "BASED_ON_CART_VALUE", "includes", "fixedVariantOption", "weNexusCartApi", "push", "77vTMHns", "replace", "instance", "clear", "WeNexusShipGuardPackageProtectionSettings", "price", "No variant has been set", "append", "keys", "percentageVariants", "1456200bUWxfg", "forEach", "variantIds", "min", "calculate", "17052wvADAh", "get", "8xXZtNC", "327708kcpPtT", "toFixed", "4udUTuS", "variant_id", "No variant found", "percentage", "has", "gid://shopify/ProductVariant/", "highestPrice", "114920lDBVRO", "items", "sort", "remove", "getPackageProtectionItems", "add", "filter", "map", "flat", "find", "186xKFNFX", "7876aEGRYd", "packageProtectionProductAndVariants", "length", "FIXED", "PERCENTAGE", "15917suAshp", "basedOnCartValueVariants", "variantId", "prices", "No variants have been set", "_type"];
    _0x4d05 = function() {
      return _0x14cce4;
    };
    return _0x4d05();
  }
  function _0x1697() {
    const _0x417100 = ["Creative", "Stockmart", "Colors", "Energy", "Gain", "Swipe", "Cascade", "Essence", "Exhibit", "Vision", "Nostalgia", "Prestige", "Gem", "Refine", "Veena", "Modular", "Spark", "Ascent", "Minion", "Redefine", "Praise", "Pursuit", "Baseline", "Essentials", "Refresh", "Origin", "Copenhagen", "Creator", "Madrid", "Mono", "Shapes", "Bazaar", "Koto", "Trade", "Taste", "Crave", "Ride", "Venue", "Noblesse", "Lute", "Blockshop", "Effortless", "Startup", "8362638jzhvlO", "2993727lxQDYg", "Pesto", "Parallax", "Blum", "Charge", "Focal", "Publisher", "North", "Atlantic", "Andaman", "Kidu", "Wonder", "Studio", "Abode", "King", "Infinity", "Stockholm", "Athens", "Select", "Streamline", "Galleria", "Keystone", "Alchemy", "Nimbus", "Cello", "Emporium", "Mr Parker", "Takeout", "Xtra", "Meka", "Soul", "Taiga", "Boost", "Retina", "Next", "Kairo", "Palo Alto", "Maker", "Ignite", "Satoshi", "2578954FnCurp", "Monk", "Unicorn", "Modules", "Multi", "Providence", "Berlin", "Split", "Brava", "Digital", "Masonry", "Lorenza", "Urban", "Bullet", "Agile", "Amber", "Emerge", "Honey", "Avenue", "Retro", "Align", "45RhTPqn", "Paris", "Pinnacle", "Iris", "Story", "Momentum", "Minimalista", "Dawn", "Shine", "Pipeline", "Monaco", "Xclusive", "Warehouse", "Habitat", "Loft", "371296KMQNHh", "Piano", "Roam", "Mavon", "Barcelona", "Chord", "Murmel", "Motion", "Marble", "Yuva", "Cama", "Whisk", "Sense", "Expanse", "Symmetry", "Mode", "Borders", "Vivid", "Reformation", "Label", "Flow", "Spotlight", "Area", "Noire", "Space", "Foodie", "Viola", "Electro", "Woodstock", "Empire", "Expression", "District", "Editions", "Sunrise", "Enterprise", "Envy", "Debutify", "Machina", "StyleScape", "Distinctive", "Atom", "119tsbVGn", "Stiletto", "Impact", "Icon", "Kingdom", "Vantage", "Fashionopolism", "Combine", "Concept", "Sydney", "Outsiders", "Tailor", "Aesthetic", "Release", "Divide", "Starlite", "Cornerstone", "Polyform", "4YyBXli", "Craft", "Aisle", "Aurora", "Colorblock", "Maranello", "Paper", "Toyo", "California", "Banjo", "ShowTime", "Neat", "Drop", "Highlight", "Fame", "Elysian", "Shark", "Grid", "Frame", "Boutique", "4724159XamFFp", "Zest", "Beyond", "Capital", "Mojave", "Broadcast", "297681bSstxR", "Local", "Mandolin", "Sahara", "Ultra", "Eurus", "Sitar", "Responsive", "Canopy", "Testament", "Flawless", "Nordic", "Luxe", "Igloo", "706068TejMlt", "Erickson", "Avante", "50wFNDim", "Forge", "Relax", "Portland"];
    _0x1697 = function() {
      return _0x417100;
    };
    return _0x1697();
  }
  const _0x308cdd = _0x5815;
  (function(_0xb83f16, _0x253180) {
    const _0x467be5 = _0x5815, _0x237f7d = _0xb83f16();
    while (!![]) {
      try {
        const _0x5cc1d7 = -parseInt(_0x467be5(456)) / 1 + -parseInt(_0x467be5(561)) / 2 + parseInt(_0x467be5(521)) / 3 * (-parseInt(_0x467be5(430)) / 4) + parseInt(_0x467be5(582)) / 5 * (parseInt(_0x467be5(470)) / 6) + -parseInt(_0x467be5(412)) / 7 * (parseInt(_0x467be5(597)) / 8) + parseInt(_0x467be5(520)) / 9 + parseInt(_0x467be5(473)) / 10 * (parseInt(_0x467be5(450)) / 11);
        if (_0x5cc1d7 === _0x253180)
          break;
        else
          _0x237f7d["push"](_0x237f7d["shift"]());
      } catch (_0x4fbabb) {
        _0x237f7d["push"](_0x237f7d["shift"]());
      }
    }
  })(_0x1697, 761558);
  const freeThemes = [{ "name": _0x308cdd(589), "attributes": { "theme_store_id": 887, "schema_name": _0x308cdd(589) } }, { "name": _0x308cdd(510), "attributes": { "theme_store_id": 2699, "schema_name": _0x308cdd(510) } }, { "name": _0x308cdd(434), "attributes": { "theme_store_id": 1499, "schema_name": "Colorblock" } }, { "name": _0x308cdd(512), "attributes": { "theme_store_id": 1363, "schema_name": "Crave" } }, { "name": _0x308cdd(511), "attributes": { "theme_store_id": 1434, "schema_name": _0x308cdd(511) } }, { "name": _0x308cdd(527), "attributes": { "theme_store_id": 1864, "schema_name": _0x308cdd(527) } }, { "name": _0x308cdd(513), "attributes": { "theme_store_id": 1500, "schema_name": _0x308cdd(513) } }, { "name": _0x308cdd(533), "attributes": { "theme_store_id": 1431, "schema_name": _0x308cdd(533) } }, { "name": _0x308cdd(502), "attributes": { "theme_store_id": 1841, "schema_name": "Origin" } }, { "name": _0x308cdd(609), "attributes": { "theme_store_id": 1356, "schema_name": _0x308cdd(609) } }, { "name": _0x308cdd(501), "attributes": { "theme_store_id": 1567, "schema_name": _0x308cdd(501) } }, { "name": "Craft", "attributes": { "theme_store_id": 1368, "schema_name": _0x308cdd(431) } }, { "name": _0x308cdd(618), "attributes": { "theme_store_id": 1891, "schema_name": "Spotlight" } }, { "name": "Be Yours", "attributes": { "theme_store_id": 1399, "schema_name": "Be Yours" } }, { "name": "Murmel", "attributes": { "theme_store_id": 2512, "schema_name": _0x308cdd(603) } }, { "name": _0x308cdd(421), "attributes": { "theme_store_id": 2117, "schema_name": _0x308cdd(421) } }];
  const enterpriseTheme = [{ "name": _0x308cdd(405), "attributes": { "theme_store_id": 1657, "schema_name": _0x308cdd(405) } }];
  const kingdomTheme = [{ "name": _0x308cdd(416), "attributes": { "theme_store_id": 725, "schema_name": _0x308cdd(416) } }, { "name": _0x308cdd(530), "attributes": { "theme_store_id": 1390, "schema_name": _0x308cdd(530) } }];
  const toyoTheme = [{ "name": _0x308cdd(526), "attributes": { "theme_store_id": 714, "schema_name": "Focal" } }, { "name": _0x308cdd(447), "attributes": { "theme_store_id": 718, "schema_name": _0x308cdd(447) } }, { "name": _0x308cdd(411), "attributes": { "theme_store_id": 1974, "schema_name": _0x308cdd(411) } }, { "name": _0x308cdd(579), "attributes": { "theme_store_id": 865, "schema_name": "Avenue" } }];
  const universalTheme = [{ "name": "Ascent", "attributes": { "theme_store_id": 2989, "schema_name": _0x308cdd(494) } }, { "name": _0x308cdd(433), "attributes": { "theme_store_id": 1770, "schema_name": _0x308cdd(433) } }, { "name": _0x308cdd(543), "attributes": { "theme_store_id": 657, "schema_name": "Alchemy" } }, { "name": _0x308cdd(553), "attributes": { "theme_store_id": 863, "schema_name": _0x308cdd(553) } }, { "name": "Masonry", "attributes": { "theme_store_id": 450, "schema_name": _0x308cdd(571) } }, { "name": _0x308cdd(401), "attributes": { "theme_store_id": 230, "schema_name": "Expression" } }, { "name": "Frame", "attributes": { "theme_store_id": 1716, "schema_name": _0x308cdd(448) } }, { "name": _0x308cdd(572), "attributes": { "theme_store_id": 798, "schema_name": "Lorenza" } }, { "name": "Spark", "attributes": { "theme_store_id": 911, "schema_name": _0x308cdd(493) } }, { "name": _0x308cdd(587), "attributes": { "theme_store_id": 1600, "schema_name": "Momentum" } }, { "name": "Influence", "attributes": { "theme_store_id": 1536, "schema_name": "Influence" } }, { "name": "Fresh", "attributes": { "theme_store_id": 908, "schema_name": "Fresh" } }, { "name": "Capital", "attributes": { "theme_store_id": 812, "schema_name": _0x308cdd(453) } }, { "name": _0x308cdd(406), "attributes": { "theme_store_id": 411, "schema_name": "Envy" } }, { "name": "Xclusive", "attributes": { "theme_store_id": 2221, "schema_name": _0x308cdd(593) } }, { "name": "Next", "attributes": { "theme_store_id": 2240, "schema_name": _0x308cdd(555) } }, { "name": _0x308cdd(474), "attributes": { "theme_store_id": 1492, "schema_name": "Forge" } }, { "name": _0x308cdd(595), "attributes": { "theme_store_id": 1581, "schema_name": _0x308cdd(595) } }, { "name": _0x308cdd(584), "attributes": { "theme_store_id": 2852, "schema_name": _0x308cdd(584) } }, { "name": _0x308cdd(417), "attributes": { "theme_store_id": 459, "schema_name": _0x308cdd(417) } }, { "name": _0x308cdd(442), "attributes": { "theme_store_id": 1197, "schema_name": _0x308cdd(442) } }, { "name": _0x308cdd(622), "attributes": { "theme_store_id": 918, "schema_name": _0x308cdd(622) } }, { "name": _0x308cdd(410), "attributes": { "theme_store_id": 2431, "schema_name": _0x308cdd(410) } }, { "name": "Icon", "attributes": { "theme_store_id": 686, "schema_name": _0x308cdd(415) } }, { "name": "Testament", "attributes": { "theme_store_id": 623, "schema_name": _0x308cdd(465) } }, { "name": _0x308cdd(486), "attributes": { "theme_store_id": 2053, "schema_name": _0x308cdd(486) } }, { "name": _0x308cdd(547), "attributes": { "theme_store_id": 567, "schema_name": "Mr Parker" } }, { "name": _0x308cdd(418), "attributes": { "theme_store_id": 141, "schema_name": "Fashionopolism" } }, { "name": _0x308cdd(528), "attributes": { "theme_store_id": 1460, "schema_name": _0x308cdd(528) } }, { "name": _0x308cdd(538), "attributes": { "theme_store_id": 1608, "schema_name": _0x308cdd(538) } }, { "name": _0x308cdd(435), "attributes": { "theme_store_id": 2186, "schema_name": _0x308cdd(435) } }, { "name": _0x308cdd(554), "attributes": { "theme_store_id": 601, "schema_name": _0x308cdd(554) } }, { "name": "Responsive", "attributes": { "theme_store_id": 304, "schema_name": _0x308cdd(463) } }, { "name": _0x308cdd(505), "attributes": { "theme_store_id": 2870, "schema_name": _0x308cdd(505) } }, { "name": "Charge", "attributes": { "theme_store_id": 2063, "schema_name": _0x308cdd(525) } }, { "name": _0x308cdd(475), "attributes": { "theme_store_id": 2477, "schema_name": _0x308cdd(475) } }, { "name": _0x308cdd(427), "attributes": { "theme_store_id": 2455, "schema_name": "Starlite" } }, { "name": _0x308cdd(484), "attributes": { "theme_store_id": 2366, "schema_name": "Essence" } }, { "name": _0x308cdd(534), "attributes": { "theme_store_id": 1918, "schema_name": "Abode" } }, { "name": "Loft", "attributes": { "theme_store_id": 846, "schema_name": _0x308cdd(596) } }, { "name": _0x308cdd(497), "attributes": { "theme_store_id": 2144, "schema_name": _0x308cdd(497) } }, { "name": "Roam", "attributes": { "theme_store_id": 1777, "schema_name": _0x308cdd(599) } }, { "name": _0x308cdd(581), "attributes": { "theme_store_id": 1966, "schema_name": _0x308cdd(581) } }, { "name": _0x308cdd(425), "attributes": { "theme_store_id": 2698, "schema_name": _0x308cdd(425) } }, { "name": _0x308cdd(529), "attributes": { "theme_store_id": 566, "schema_name": _0x308cdd(529) } }, { "name": _0x308cdd(400), "attributes": { "theme_store_id": 838, "schema_name": _0x308cdd(400) } }, { "name": _0x308cdd(612), "attributes": { "theme_store_id": 1578, "schema_name": _0x308cdd(612) } }, { "name": "Warehouse", "attributes": { "theme_store_id": 871, "schema_name": _0x308cdd(594) } }, { "name": _0x308cdd(606), "attributes": { "theme_store_id": 1615, "schema_name": _0x308cdd(606) } }, { "name": "Tokyo", "attributes": { "theme_store_id": 2629, "schema_name": "Tokyo" } }, { "name": _0x308cdd(496), "attributes": { "theme_store_id": 3007, "schema_name": _0x308cdd(496) } }, { "name": _0x308cdd(414), "attributes": { "theme_store_id": 1190, "schema_name": "Impact" } }];
  function _0x5815(_0x29d08b, _0x4052a8) {
    const _0x169744 = _0x1697();
    return _0x5815 = function(_0x581537, _0x45f1e4) {
      _0x581537 = _0x581537 - 398;
      let _0x1d8404 = _0x169744[_0x581537];
      return _0x1d8404;
    }, _0x5815(_0x29d08b, _0x4052a8);
  }
  const universalForSubTotalTheme = [{ "name": _0x308cdd(492), "attributes": { "theme_store_id": 849, "schema_name": _0x308cdd(492) } }, { "name": _0x308cdd(532), "attributes": { "theme_store_id": 2684, "schema_name": _0x308cdd(532) } }, { "name": _0x308cdd(578), "attributes": { "theme_store_id": 2160, "schema_name": _0x308cdd(578) } }, { "name": _0x308cdd(428), "attributes": { "theme_store_id": 2348, "schema_name": _0x308cdd(428) } }, { "name": _0x308cdd(413), "attributes": { "theme_store_id": 1621, "schema_name": _0x308cdd(413) } }, { "name": "Bullet", "attributes": { "theme_store_id": 1114, "schema_name": _0x308cdd(574) } }, { "name": _0x308cdd(615), "attributes": { "theme_store_id": 1762, "schema_name": _0x308cdd(615) } }, { "name": _0x308cdd(540), "attributes": { "theme_store_id": 872, "schema_name": _0x308cdd(540) } }, { "name": "Gem", "attributes": { "theme_store_id": 2222, "schema_name": _0x308cdd(489) } }, { "name": "Impulse", "attributes": { "theme_store_id": 857, "schema_name": "Impulse" } }, { "name": "Motion", "attributes": { "theme_store_id": 847, "schema_name": _0x308cdd(604) } }, { "name": "Essentials", "attributes": { "theme_store_id": 2482, "schema_name": _0x308cdd(500) } }, { "name": _0x308cdd(424), "attributes": { "theme_store_id": 2514, "schema_name": _0x308cdd(424) } }, { "name": "Whisk", "attributes": { "theme_store_id": 1819, "schema_name": _0x308cdd(608) } }, { "name": _0x308cdd(466), "attributes": { "theme_store_id": 2847, "schema_name": _0x308cdd(466) } }, { "name": _0x308cdd(503), "attributes": { "theme_store_id": 2564, "schema_name": _0x308cdd(503) } }, { "name": _0x308cdd(601), "attributes": { "theme_store_id": 2324, "schema_name": _0x308cdd(601) } }, { "name": _0x308cdd(592), "attributes": { "theme_store_id": 2125, "schema_name": "Monaco" } }, { "name": _0x308cdd(567), "attributes": { "theme_store_id": 2138, "schema_name": _0x308cdd(567) } }, { "name": _0x308cdd(498), "attributes": { "theme_store_id": 1654, "schema_name": _0x308cdd(498) } }, { "name": "Multi", "attributes": { "theme_store_id": 2337, "schema_name": _0x308cdd(565) } }, { "name": "ShowTime", "attributes": { "theme_store_id": 687, "schema_name": _0x308cdd(440) } }, { "name": _0x308cdd(541), "attributes": { "theme_store_id": 851, "schema_name": _0x308cdd(541) } }, { "name": _0x308cdd(570), "attributes": { "theme_store_id": 2539, "schema_name": _0x308cdd(570) } }, { "name": _0x308cdd(422), "attributes": { "theme_store_id": 2896, "schema_name": _0x308cdd(422) } }, { "name": "Swipe", "attributes": { "theme_store_id": 2737, "schema_name": _0x308cdd(482) } }, { "name": "Select", "attributes": { "theme_store_id": 2372, "schema_name": _0x308cdd(539) } }, { "name": _0x308cdd(588), "attributes": { "theme_store_id": 2316, "schema_name": "Minimalista" } }, { "name": _0x308cdd(478), "attributes": { "theme_store_id": 2105, "schema_name": _0x308cdd(478) } }, { "name": _0x308cdd(444), "attributes": { "theme_store_id": 2101, "schema_name": _0x308cdd(444) } }, { "name": _0x308cdd(481), "attributes": { "theme_store_id": 2077, "schema_name": _0x308cdd(481) } }, { "name": _0x308cdd(449), "attributes": { "theme_store_id": 3051, "schema_name": _0x308cdd(449) } }, { "name": _0x308cdd(460), "attributes": { "theme_store_id": 2967, "schema_name": _0x308cdd(460) } }, { "name": "Infinity", "attributes": { "theme_store_id": 2061, "schema_name": _0x308cdd(536) } }, { "name": _0x308cdd(479), "attributes": { "theme_store_id": 757, "schema_name": _0x308cdd(479) } }, { "name": _0x308cdd(438), "attributes": { "theme_store_id": 691, "schema_name": _0x308cdd(438) } }, { "name": _0x308cdd(537), "attributes": { "theme_store_id": 1405, "schema_name": "Stockholm" } }, { "name": _0x308cdd(476), "attributes": { "theme_store_id": 1924, "schema_name": _0x308cdd(476) } }, { "name": "Handmade", "attributes": { "theme_store_id": 1791, "schema_name": "Handmade" } }, { "name": _0x308cdd(531), "attributes": { "theme_store_id": 2268, "schema_name": "Kidu" } }, { "name": "Nexa", "attributes": { "theme_store_id": 2820, "schema_name": "Nexa" } }, { "name": _0x308cdd(573), "attributes": { "theme_store_id": 2405, "schema_name": "Urban" } }, { "name": _0x308cdd(575), "attributes": { "theme_store_id": 2346, "schema_name": "Agile" } }, { "name": _0x308cdd(487), "attributes": { "theme_store_id": 2175, "schema_name": _0x308cdd(487) } }, { "name": _0x308cdd(490), "attributes": { "theme_store_id": 2782, "schema_name": _0x308cdd(490) } }, { "name": _0x308cdd(458), "attributes": { "theme_store_id": 1696, "schema_name": _0x308cdd(458) } }, { "name": _0x308cdd(516), "attributes": { "theme_store_id": 2171, "schema_name": _0x308cdd(516) } }, { "name": _0x308cdd(439), "attributes": { "theme_store_id": 1778, "schema_name": "Banjo" } }, { "name": _0x308cdd(602), "attributes": { "theme_store_id": 1584, "schema_name": _0x308cdd(602) } }, { "name": "Effortless", "attributes": { "theme_store_id": 1743, "schema_name": _0x308cdd(518) } }, { "name": "Urge", "attributes": { "theme_store_id": 2213, "schema_name": "Urge" } }, { "name": "Huge", "attributes": { "theme_store_id": 2158, "schema_name": "Huge" } }, { "name": "Vincent", "attributes": { "theme_store_id": 2913, "schema_name": "Vincent" } }, { "name": _0x308cdd(495), "attributes": { "theme_store_id": 1571, "schema_name": "Minion" } }, { "name": _0x308cdd(619), "attributes": { "theme_store_id": 2073, "schema_name": _0x308cdd(619) } }, { "name": _0x308cdd(445), "attributes": { "theme_store_id": 2578, "schema_name": _0x308cdd(445) } }, { "name": "Brava", "attributes": { "theme_store_id": 2148, "schema_name": _0x308cdd(569) } }, { "name": _0x308cdd(471), "attributes": { "theme_store_id": 1790, "schema_name": _0x308cdd(471) } }, { "name": _0x308cdd(409), "attributes": { "theme_store_id": 2238, "schema_name": "StyleScape" } }, { "name": _0x308cdd(551), "attributes": { "theme_store_id": 2825, "schema_name": _0x308cdd(551) } }, { "name": _0x308cdd(546), "attributes": { "theme_store_id": 1854, "schema_name": _0x308cdd(546) } }, { "name": "Creator", "attributes": { "theme_store_id": 1922, "schema_name": _0x308cdd(504) } }, { "name": "Palo Alto", "attributes": { "theme_store_id": 777, "schema_name": _0x308cdd(557) } }, { "name": "Zora", "attributes": { "theme_store_id": 2505, "schema_name": "Zora" } }, { "name": _0x308cdd(591), "attributes": { "theme_store_id": 739, "schema_name": _0x308cdd(591) } }, { "name": _0x308cdd(586), "attributes": { "theme_store_id": 864, "schema_name": _0x308cdd(586) } }, { "name": "Broadcast", "attributes": { "theme_store_id": 868, "schema_name": _0x308cdd(455) } }, { "name": _0x308cdd(517), "attributes": { "theme_store_id": 606, "schema_name": "Blockshop" } }, { "name": _0x308cdd(452), "attributes": { "theme_store_id": 939, "schema_name": "Beyond" } }, { "name": _0x308cdd(558), "attributes": { "theme_store_id": 765, "schema_name": _0x308cdd(558) } }, { "name": _0x308cdd(577), "attributes": { "theme_store_id": 833, "schema_name": _0x308cdd(577) } }, { "name": _0x308cdd(459), "attributes": { "theme_store_id": 1926, "schema_name": _0x308cdd(459) } }, { "name": _0x308cdd(454), "attributes": { "theme_store_id": 1497, "schema_name": "Mojave" } }, { "name": "Tailor", "attributes": { "theme_store_id": 1457, "schema_name": _0x308cdd(423) } }, { "name": "Startup", "attributes": { "theme_store_id": 652, "schema_name": _0x308cdd(519) } }, { "name": _0x308cdd(403), "attributes": { "theme_store_id": 457, "schema_name": _0x308cdd(403) } }, { "name": _0x308cdd(552), "attributes": { "theme_store_id": 1751, "schema_name": _0x308cdd(552) } }, { "name": _0x308cdd(488), "attributes": { "theme_store_id": 855, "schema_name": _0x308cdd(488) } }, { "name": _0x308cdd(506), "attributes": { "theme_store_id": 1818, "schema_name": "Mono" } }, { "name": "Monk", "attributes": { "theme_store_id": 2515, "schema_name": _0x308cdd(562) } }, { "name": _0x308cdd(407), "attributes": { "theme_store_id": 0, "schema_name": _0x308cdd(407) } }];
  const universalForExponentSubtotal = [{ "name": _0x308cdd(464), "attributes": { "theme_store_id": 732, "schema_name": _0x308cdd(464) } }, { "name": "Fetch", "attributes": { "theme_store_id": 1949, "schema_name": "Fetch" } }, { "name": _0x308cdd(610), "attributes": { "theme_store_id": 902, "schema_name": _0x308cdd(610) } }];
  const switchTheme = [{ "name": "Avante", "attributes": { "theme_store_id": 1667, "schema_name": _0x308cdd(472) } }, { "name": _0x308cdd(549), "attributes": { "theme_store_id": 1609, "schema_name": _0x308cdd(549) } }, { "name": "Paris", "attributes": { "theme_store_id": 2702, "schema_name": _0x308cdd(583) } }, { "name": "Eclipse", "attributes": { "theme_store_id": 3070, "schema_name": "Eclipse" } }, { "name": _0x308cdd(468), "attributes": { "theme_store_id": 2779, "schema_name": _0x308cdd(468) } }, { "name": "Ignite", "attributes": { "theme_store_id": 3027, "schema_name": _0x308cdd(559) } }, { "name": _0x308cdd(451), "attributes": { "theme_store_id": 1611, "schema_name": _0x308cdd(451) } }, { "name": _0x308cdd(399), "attributes": { "theme_store_id": 2239, "schema_name": "Woodstock" } }, { "name": "Symmetry", "attributes": { "theme_store_id": 568, "schema_name": _0x308cdd(611) } }, { "name": "Sleek", "attributes": { "theme_store_id": 2821, "schema_name": "Sleek" } }, { "name": _0x308cdd(402), "attributes": { "theme_store_id": 735, "schema_name": _0x308cdd(402) } }, { "name": _0x308cdd(462), "attributes": { "theme_store_id": 2599, "schema_name": _0x308cdd(462) } }, { "name": _0x308cdd(420), "attributes": { "theme_store_id": 2412, "schema_name": _0x308cdd(420) } }, { "name": _0x308cdd(556), "attributes": { "theme_store_id": 1843, "schema_name": _0x308cdd(556) } }, { "name": _0x308cdd(485), "attributes": { "theme_store_id": 1828, "schema_name": _0x308cdd(485) } }, { "name": _0x308cdd(507), "attributes": { "theme_store_id": 1535, "schema_name": "Shapes" } }, { "name": _0x308cdd(483), "attributes": { "theme_store_id": 859, "schema_name": _0x308cdd(483) } }, { "name": _0x308cdd(616), "attributes": { "theme_store_id": 773, "schema_name": "Label" } }, { "name": _0x308cdd(514), "attributes": { "theme_store_id": 836, "schema_name": _0x308cdd(514) } }, { "name": _0x308cdd(477), "attributes": { "theme_store_id": 1829, "schema_name": "Creative" } }, { "name": _0x308cdd(398), "attributes": { "theme_store_id": 2164, "schema_name": _0x308cdd(398) } }, { "name": _0x308cdd(590), "attributes": { "theme_store_id": 2576, "schema_name": "Shine" } }, { "name": _0x308cdd(524), "attributes": { "theme_store_id": 1839, "schema_name": _0x308cdd(524) } }, { "name": _0x308cdd(523), "attributes": { "theme_store_id": 688, "schema_name": _0x308cdd(523) } }, { "name": _0x308cdd(491), "attributes": { "theme_store_id": 2566, "schema_name": "Veena" } }, { "name": _0x308cdd(509), "attributes": { "theme_store_id": 3001, "schema_name": _0x308cdd(509) } }, { "name": _0x308cdd(598), "attributes": { "theme_store_id": 2812, "schema_name": _0x308cdd(598) } }, { "name": _0x308cdd(545), "attributes": { "theme_store_id": 2328, "schema_name": "Cello" } }, { "name": _0x308cdd(623), "attributes": { "theme_store_id": 1701, "schema_name": _0x308cdd(623) } }, { "name": _0x308cdd(535), "attributes": { "theme_store_id": 2948, "schema_name": "King" } }, { "name": _0x308cdd(446), "attributes": { "theme_store_id": 2619, "schema_name": "Shark" } }, { "name": _0x308cdd(480), "attributes": { "theme_store_id": 2717, "schema_name": _0x308cdd(480) } }, { "name": _0x308cdd(469), "attributes": { "theme_store_id": 2315, "schema_name": _0x308cdd(469) } }, { "name": _0x308cdd(550), "attributes": { "theme_store_id": 2845, "schema_name": _0x308cdd(550) } }, { "name": _0x308cdd(566), "attributes": { "theme_store_id": 587, "schema_name": _0x308cdd(566) } }, { "name": _0x308cdd(576), "attributes": { "theme_store_id": 2217, "schema_name": _0x308cdd(576) } }, { "name": _0x308cdd(605), "attributes": { "theme_store_id": 1907, "schema_name": _0x308cdd(605) } }, { "name": "Sunrise", "attributes": { "theme_store_id": 57, "schema_name": _0x308cdd(404) } }, { "name": _0x308cdd(563), "attributes": { "theme_store_id": 2264, "schema_name": _0x308cdd(563) } }, { "name": _0x308cdd(585), "attributes": { "theme_store_id": 2489, "schema_name": _0x308cdd(585) } }, { "name": _0x308cdd(426), "attributes": { "theme_store_id": 2273, "schema_name": _0x308cdd(426) } }, { "name": _0x308cdd(548), "attributes": { "theme_store_id": 2534, "schema_name": _0x308cdd(548) } }, { "name": _0x308cdd(432), "attributes": { "theme_store_id": 2378, "schema_name": "Aisle Theme" } }, { "name": "Noblesse", "attributes": { "theme_store_id": 2546, "schema_name": _0x308cdd(515) } }, { "name": _0x308cdd(522), "attributes": { "theme_store_id": 2275, "schema_name": _0x308cdd(522) } }, { "name": "Satoshi", "attributes": { "theme_store_id": 2881, "schema_name": _0x308cdd(560) } }, { "name": _0x308cdd(564), "attributes": { "theme_store_id": 1795, "schema_name": _0x308cdd(564) } }, { "name": _0x308cdd(508), "attributes": { "theme_store_id": 1448, "schema_name": _0x308cdd(508) } }, { "name": _0x308cdd(544), "attributes": { "theme_store_id": 3094, "schema_name": _0x308cdd(544) } }, { "name": _0x308cdd(461), "attributes": { "theme_store_id": 2048, "schema_name": _0x308cdd(461) } }, { "name": "Showcase", "attributes": { "theme_store_id": 677, "schema_name": "Showcase" } }, { "name": _0x308cdd(607), "attributes": { "theme_store_id": 2204, "schema_name": _0x308cdd(607) } }, { "name": _0x308cdd(614), "attributes": { "theme_store_id": 2285, "schema_name": _0x308cdd(614) } }, { "name": _0x308cdd(580), "attributes": { "theme_store_id": 2630, "schema_name": _0x308cdd(580) } }, { "name": _0x308cdd(457), "attributes": { "theme_store_id": 1651, "schema_name": _0x308cdd(457) } }, { "name": _0x308cdd(443), "attributes": { "theme_store_id": 903, "schema_name": _0x308cdd(443) } }, { "name": _0x308cdd(568), "attributes": { "theme_store_id": 842, "schema_name": _0x308cdd(568) } }, { "name": _0x308cdd(613), "attributes": { "theme_store_id": 2491, "schema_name": _0x308cdd(613) } }, { "name": "Combine", "attributes": { "theme_store_id": 1826, "schema_name": _0x308cdd(419) } }, { "name": _0x308cdd(429), "attributes": { "theme_store_id": 2493, "schema_name": _0x308cdd(429) } }, { "name": _0x308cdd(620), "attributes": { "theme_store_id": 2926, "schema_name": "Noire" } }, { "name": _0x308cdd(441), "attributes": { "theme_store_id": 1878, "schema_name": _0x308cdd(441) } }, { "name": _0x308cdd(467), "attributes": { "theme_store_id": 2801, "schema_name": _0x308cdd(467) } }, { "name": _0x308cdd(437), "attributes": { "theme_store_id": 2358, "schema_name": _0x308cdd(437) } }, { "name": _0x308cdd(600), "attributes": { "theme_store_id": 1979, "schema_name": _0x308cdd(600) } }, { "name": _0x308cdd(499), "attributes": { "theme_store_id": 910, "schema_name": _0x308cdd(499) } }, { "name": _0x308cdd(617), "attributes": { "theme_store_id": 801, "schema_name": _0x308cdd(617) } }];
  const brickSpaceLabTheme = [{ "name": _0x308cdd(621), "attributes": { "theme_store_id": 2659, "schema_name": _0x308cdd(621) } }, { "name": _0x308cdd(542), "attributes": { "theme_store_id": 2943, "schema_name": _0x308cdd(542) } }, { "name": _0x308cdd(436), "attributes": { "theme_store_id": 1662, "schema_name": _0x308cdd(436) } }, { "name": _0x308cdd(408), "attributes": { "theme_store_id": 2883, "schema_name": "Machina" } }];
  const _0x4b16bb = _0x6c47;
  function _0x6c47(_0x1b227d, _0x4e5132) {
    const _0x3bd3ea = _0x3bd3();
    return _0x6c47 = function(_0x6c47bd, _0x26248e) {
      _0x6c47bd = _0x6c47bd - 485;
      let _0x5d969a = _0x3bd3ea[_0x6c47bd];
      return _0x5d969a;
    }, _0x6c47(_0x1b227d, _0x4e5132);
  }
  (function(_0x25828e, _0x25bd3d) {
    const _0x3e3198 = _0x6c47, _0x4fb022 = _0x25828e();
    while (!![]) {
      try {
        const _0x266dca = parseInt(_0x3e3198(594)) / 1 + parseInt(_0x3e3198(644)) / 2 + -parseInt(_0x3e3198(603)) / 3 + -parseInt(_0x3e3198(500)) / 4 + -parseInt(_0x3e3198(504)) / 5 * (-parseInt(_0x3e3198(542)) / 6) + parseInt(_0x3e3198(498)) / 7 * (parseInt(_0x3e3198(581)) / 8) + parseInt(_0x3e3198(577)) / 9 * (-parseInt(_0x3e3198(571)) / 10);
        if (_0x266dca === _0x25bd3d)
          break;
        else
          _0x4fb022["push"](_0x4fb022["shift"]());
      } catch (_0x4d5cc2) {
        _0x4fb022["push"](_0x4fb022["shift"]());
      }
    }
  })(_0x3bd3, 805295);
  const checkTheme = (_0x3a2810) => {
    const _0x5165f9 = _0x6c47, _0x32280c = window[_0x5165f9(519)][_0x5165f9(501)] || {};
    return _0x3a2810 == null ? void 0 : _0x3a2810["some"]((_0x354c8f) => Object[_0x5165f9(496)](_0x354c8f["attributes"])["some"]((_0x26ef70) => Object[_0x5165f9(496)](_0x32280c)[_0x5165f9(539)](_0x26ef70)));
  };
  class PackageProtectionClientBasic {
    constructor(_0x5a3444) {
      __publicField(this, _f, "https://cdn.shopify.com/s/files/1/1652/8827/files/g4990.png?v=1708754054");
      __publicField(this, "infoPageLink", "/pages/package-protection");
      __publicField(this, "containers", /* @__PURE__ */ new Map());
      __publicField(this, "title", _0x4b16bb(610));
      __publicField(this, _g, _0x4b16bb(562));
      __publicField(this, _h, "disabled description");
      __publicField(this, "buttonColor", _0x4b16bb(619));
      __publicField(this, _i, ![]);
      __publicField(this, _j, "");
      __publicField(this, _k, "left");
      const _0x347354 = _0x6c47;
      this[_0x347354(637)] = _0x5a3444;
    }
    ["formatPrice"](_0x42c464, _0x7512a6) {
      const _0xa58ef7 = _0x4b16bb;
      return new Intl[_0xa58ef7(544)](_0xa58ef7(630), { "style": "currency", "maximumFractionDigits": 2, "minimumFractionDigits": 2, "currency": _0x7512a6 })[_0xa58ef7(614)](_0x42c464);
    }
    async [(_f = _0x4b16bb(629), _g = _0x4b16bb(516), _h = _0x4b16bb(527), _i = _0x4b16bb(569), _j = _0x4b16bb(554), _k = _0x4b16bb(526), _0x4b16bb(582))]() {
      const _0x5bfc43 = _0x4b16bb, { coercedPrice: _0x398888 } = await this["api"][_0x5bfc43(649)](), _0x581d45 = await window[_0x5bfc43(494)][_0x5bfc43(611)]();
      return this["formatPrice"](Number(_0x398888), _0x581d45[_0x5bfc43(613)]);
    }
    [_0x4b16bb(574)]() {
      const _0x3b66ea = _0x4b16bb;
      let _0x16509a = "";
      return Array[_0x3b66ea(560)](document[_0x3b66ea(518)](_0x3b66ea(622)))[_0x3b66ea(596)]((_0x1404e3) => {
        const _0x17f29a = _0x3b66ea;
        _0x16509a = _0x1404e3 == null ? void 0 : _0x1404e3[_0x17f29a(570)];
      }), Number(_0x16509a[_0x3b66ea(583)](/[^0-9.]/g, ""));
    }
    async [_0x4b16bb(638)]() {
      const _0x3a33c3 = _0x4b16bb;
      return "" + (this["checked"] ? this[_0x3a33c3(516)] : this[_0x3a33c3(527)]);
    }
    async [_0x4b16bb(609)]() {
      const _0x1ff206 = _0x4b16bb;
      return this[_0x1ff206(569)];
    }
    async ["getCheckboxContainer"](_0x275072, _0x13f641) {
      const _0x1b936b = _0x4b16bb, _0x565f16 = document[_0x1b936b(525)](_0x1b936b(535)), _0x639147 = await this[_0x1b936b(582)](), _0x130959 = await this[_0x1b936b(638)]();
      _0x565f16["insertAdjacentHTML"](_0x1b936b(586), _0x1b936b(493) + this["css"] + _0x1b936b(549) + this[_0x1b936b(629)] + _0x1b936b(499) + this[_0x1b936b(568)] + " \n                " + (this[_0x1b936b(556)] ? _0x1b936b(646) + this["infoPageLink"] + _0x1b936b(640) : "") + _0x1b936b(541) + _0x130959 + ' </span></p>\n            </div>\n        </div>\n        <div class="wenexus-package-protection__toggle" >\n        \n        <div style="position:relative;">\n            <input type="checkbox" ' + (_0x13f641 ? "checked" : "") + ' style="position:absolute; width:100%; height:100%; left:0; z-index:99; opacity:0; margin:0px; cursor:pointer; display: block; clip:unset;">\n\n            <div class="toggle-container" style="display: flex;  width: 35px; height: 13px; background-color: ' + (_0x13f641 ? this[_0x1b936b(553)] : _0x1b936b(537)) + '; position: relative; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border-radius: 9999px; cursor: pointer; transition: background-color 0.5s ease-out;">\n                <span class="toggle-switch" style="height: 11px; width: 11px; position: absolute; top: 1.3px; left: 2px; background-color: white; border-radius: 9999px; ' + (_0x13f641 ? "transform: translateX(20px);" : "") + ' transition: all 0.3s ease-out; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); display: flex; align-items: center; justify-content: center;"></span>\n            </div>\n          <p style="margin:0px; font-size:10px; text-align:center;"><strong class="protection-price">' + _0x639147 + "</strong></p>\n            </div>\n        </div>\n      ");
      const _0x2727a6 = _0x565f16[_0x1b936b(576)](_0x1b936b(618)), _0x3b6e8b = _0x565f16["querySelector"](".toggle-container"), _0x75e716 = _0x565f16[_0x1b936b(576)](".toggle-switch");
      _0x565f16[_0x1b936b(523)] = _0x1b936b(625), _0x2727a6[_0x1b936b(502)](_0x1b936b(621), () => {
        const _0x4aa49c = _0x1b936b;
        _0x5e4a22(), this[_0x4aa49c(569)] = _0x2727a6["checked"];
      });
      const _0x5e4a22 = () => {
        const _0x1ff88a = _0x1b936b;
        _0x3b6e8b["style"][_0x1ff88a(620)] = _0x2727a6[_0x1ff88a(569)] ? this["buttonColor"] : _0x1ff88a(537), _0x75e716[_0x1ff88a(588)]["transform"] = _0x2727a6[_0x1ff88a(569)] ? _0x1ff88a(520) : _0x1ff88a(595);
      };
      return _0x5e4a22(), this[_0x1b936b(508)][_0x1b936b(551)](_0x275072, _0x565f16), { "container": _0x565f16, "checkbox": _0x2727a6 };
    }
    async [_0x4b16bb(607)]({ accentColor: _0x247aa4, imageWidth = 56, containerGap = [0, 10], contentGap = [0, 10], descriptionFontWeight = "normal", descriptionMargin = [0, 0, 0, 0], hideDescriptionPage = !![], containerMargin = [0, 0, 8, 0], containerJustify = "space-between", extraStyles = "", textAlign = "left", containerMaxWidth = _0x4b16bb(643) }) {
      const _0x4d687f = _0x4b16bb;
      return _0x4d687f(575) + containerJustify + ";\n            align-items: center;\n            margin: " + (containerMargin == null ? void 0 : containerMargin[_0x4d687f(631)](_0x4d687f(599))) + _0x4d687f(589) + containerGap[0] + " " + containerGap[1] + "px;   \n                   \n         }\n         \n         .wenexus-package-protection__content {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            gap: " + contentGap[0] + " " + contentGap[1] + _0x4d687f(517) + (imageWidth ?? 65) + "px;\n            max-height: " + (imageWidth ?? 65) + _0x4d687f(495) + textAlign + _0x4d687f(548) + containerMaxWidth + _0x4d687f(593) + descriptionFontWeight + _0x4d687f(545) + (descriptionMargin == null ? void 0 : descriptionMargin[_0x4d687f(631)](_0x4d687f(599))) + _0x4d687f(513) + (hideDescriptionPage ? _0x4d687f(633) : "") + _0x4d687f(601) + _0x247aa4 + " !important;\n            zoom: 1.55;\n         }\n         \n         " + extraStyles + "\n      </style>";
    }
    [_0x4b16bb(573)]() {
      const _0x102716 = _0x4b16bb;
      return [{ "selector": 'button[type="submit"][name="checkout"]', "insertPosition": _0x102716(584) }];
    }
    async [_0x4b16bb(546)]() {
      const _0x6c9883 = _0x4b16bb;
      this["containers"][_0x6c9883(596)](async (_0x4de901) => {
        const _0x30838e = _0x6c9883;
        _0x4de901[_0x30838e(576)](".protection-price")["textContent"] = await this[_0x30838e(582)]();
      });
    }
    async [_0x4b16bb(592)]() {
      const _0x30efd7 = _0x4b16bb, _0x3f0329 = [_0x30efd7(529), _0x30efd7(578), _0x30efd7(522), _0x30efd7(608), _0x30efd7(639), _0x30efd7(590), _0x30efd7(514), _0x30efd7(488), _0x30efd7(531), "form.sticky-cart__inner", _0x30efd7(534), _0x30efd7(530), _0x30efd7(509), ".cart-template__summary", _0x30efd7(561), ".cart-drawer__bottom", _0x30efd7(591), _0x30efd7(604), _0x30efd7(641), _0x30efd7(632), ".accordion-wrap", _0x30efd7(555), _0x30efd7(600), ".cart-table__checkoutWrp", ".cart-subtotal", 'div[data-element="subtotal-block"]', "#cart-drawer-live-region-subtotal", _0x30efd7(598), _0x30efd7(547), ".cart-footer__subtotal", ".cart-totals", _0x30efd7(528), _0x30efd7(585), _0x30efd7(487), ".subtotal .money ", _0x30efd7(559), _0x30efd7(492), _0x30efd7(634), ".cart-header-details", _0x30efd7(511), _0x30efd7(605), _0x30efd7(505), _0x30efd7(497), _0x30efd7(540), _0x30efd7(521), _0x30efd7(558), _0x30efd7(623), ".cart-items__total", _0x30efd7(564), _0x30efd7(648), _0x30efd7(579), _0x30efd7(489), _0x30efd7(565), _0x30efd7(617), _0x30efd7(647), _0x30efd7(536), _0x30efd7(510), _0x30efd7(557), _0x30efd7(648), _0x30efd7(490), _0x30efd7(506), ".cart__row--table"], _0x369a1d = await window["weNexusCartApi"]["get"](), _0x36226b = (_0x30e55d = 0) => {
        _0x3f0329["forEach"]((_0x339057) => {
          const _0xc22a3 = _0x6c47;
          let _0x54a0d0 = document["querySelectorAll"](_0x339057);
          function _0x23a804(_0x41c8e4) {
            const _0x4b3c2d = _0x6c47, _0x210f95 = Number(_0x369a1d["items_subtotal_price"] / 100)["toFixed"](2), _0x36f872 = Number(_0x369a1d[_0x4b3c2d(533)] / 100 + _0x30e55d)["toFixed"](2);
            if ((_0x41c8e4 == null ? void 0 : _0x41c8e4[_0x4b3c2d(616)]) === (Node == null ? void 0 : Node["TEXT_NODE"])) {
              if (_0x30e55d === 0) {
                const _0x21b594 = localStorage[_0x4b3c2d(642)](_0x4b3c2d(533));
                _0x41c8e4[_0x4b3c2d(597)] = _0x41c8e4[_0x4b3c2d(597)][_0x4b3c2d(583)](new RegExp("\\b" + _0x21b594 + "\\b", "g"), _0x36f872);
              } else
                localStorage["setItem"]("items_subtotal_price", _0x36f872), _0x41c8e4[_0x4b3c2d(597)] = _0x41c8e4[_0x4b3c2d(597)]["replace"](new RegExp("\\b" + _0x210f95 + "\\b", "g"), _0x36f872);
            } else
              (_0x41c8e4 == null ? void 0 : _0x41c8e4[_0x4b3c2d(616)]) === (Node == null ? void 0 : Node[_0x4b3c2d(602)]) && Array[_0x4b3c2d(560)](_0x41c8e4[_0x4b3c2d(503)])[_0x4b3c2d(596)](_0x23a804);
          }
          _0x54a0d0[_0xc22a3(596)]((_0x47343b) => {
            _0x23a804(_0x47343b);
          });
        });
      };
      setTimeout(() => {
        const _0x1c7ebc = _0x30efd7, _0x4bfe16 = this[_0x1c7ebc(574)](), _0x15386e = localStorage["getItem"](_0x1c7ebc(563));
        let _0x1437df = "";
        _0x15386e === "true" ? (_0x1437df = this[_0x1c7ebc(516)], _0x36226b(_0x4bfe16), _0x36226b(_0x4bfe16)) : (_0x1437df = this["disabledDescription"], _0x36226b(), _0x36226b());
        const _0x5a81fe = document[_0x1c7ebc(567)]("wenexus-package-protection-description");
        Array["from"](_0x5a81fe)[_0x1c7ebc(596)]((_0x499dd7) => _0x499dd7[_0x1c7ebc(570)] = _0x1437df + " ");
      }, 500);
    }
    [_0x4b16bb(512)]() {
      const _0x1295bd = _0x4b16bb, _0x21113b = document[_0x1295bd(518)](_0x1295bd(543));
      _0x21113b[_0x1295bd(596)]((_0x26351a) => {
        const _0x40e97a = _0x1295bd;
        _0x26351a[_0x40e97a(572)] = !![];
      });
    }
    [_0x4b16bb(550)]() {
      const _0x1957bb = _0x4b16bb, _0x3e6bbe = document["querySelectorAll"](_0x1957bb(543));
      _0x3e6bbe[_0x1957bb(596)]((_0x1ea69b) => {
        const _0x17e2c6 = _0x1957bb;
        _0x1ea69b[_0x17e2c6(572)] = ![];
      });
    }
    [_0x4b16bb(486)]() {
      const _0x375775 = _0x4b16bb;
      window[_0x375775(645)]["reload"]();
    }
    [_0x4b16bb(515)]() {
    }
  }
  function _0x3bd3() {
    const _0x24762b = [".cart-footer__summary", "enabled description", "package-protection-enabled", ".cart-drawer__total", ".cart__footer ", "free theme", "getElementsByClassName", "title", "checked", "innerHTML", "7386550TnnYzs", "disabled", "getInsertionPointSelectors", "getWidgetPrice", "\n      <style>\n         .wenexus-package-protection {\n            display: flex;\n            width: 100%;\n            max-width: 500px; \n            min-height: 70px;           \n            justify-content: ", "querySelector", "9QMtKdI", ".wt-cart__footer__body", ".totals__subtotal-value", "TEXT_NODE", "104whtEul", "getPrice", "replace", "before", ".more", "afterbegin", "toFixed", "style", ";\n            gap: ", ".quick-cart__footer", ".total-holder", "refreshWidget", ";\n         }\n\n         .wenexus-package-protection__desc h5 {\n            font-size:16px;\n            margin: 0;\n            font-weight: bold;            \n         }\n         \n         .wenexus-package-protection__desc p {           \n            font-size: 13px;\n            font-weight: ", "993682CaeqIT", "translateX(0)", "forEach", "textContent", "div[data-cart-subtotal-block]", "px ", ".template__cart__footer", "\n         }\n         \n         .wenexus-package-protection__toggle {\n            accent-color: ", "ELEMENT_NODE", "3920568rLszgk", ".main-cart_cart-totals-wrap", ".items-baseline", "log", "getStyleMarkup", ".drawer__footer", "getChecked", "package title", "get", "space-between", "currency", "format", "cart-count-bubble", "nodeType", ".cart-summary-line", ".wenexus-package-protection__toggle input", "#22c55e", "backgroundColor", "click", ".protection-price", ".cart-drawer__summary-total", ".totals__total-value, .totals, .cart-preview__total-price-value", "wenexus-package-protection", "onCartUpdate", "true", "getElementsByTagName", "thumbnail", "en-US", "join", ".main-cart_widget--totals", "display: none;", ".Cart__Total", "cart-notification", "cart-items", "api", "getDescription", ".cart__footer-inner", '" target="_blank" style="color:blue;">ⓘ</a> ', ".cart-drawer_foot-wrap", "getItem", "100%", "1106348PzuLsf", "location", '<a href="https://', ".cart__details", ".cart__subtotal", "calculate", "#2c7e3f", "cartUpdate", ".subtotal", 'button[type="submit"][name="checkout"]', "#CartDetails", ".totals", ".cart__ctas", ".CartDrawer__Total", "\n      <style>", "weNexusCartApi", "px;\n         }\n         \n         .wenexus-package-protection__image img {\n            width: 50px;\n            height: 50px;\n         }\n         .wenexus-package-protection__desc{\n            text-align: ", "values", "#cart-subtotal", "305263hSRJfR", '" alt="logo" />\n            </div>\n            <div class="wenexus-package-protection__desc">\n                <h5>', "1020028bMxChp", "theme", "addEventListener", "childNodes", "236200saYrEU", ".cart-drawer__totals", ".ajaxcart__price", ".cart-preview__btns-wrap", "containers", ".cart-drawer__container", ".cart-count", ".sub--total-cart", "disabledCheckoutButton", "px;\n         }\n         \n         .wenexus-package-protection__desc a {\n            text-decoration: none;\n            font-size:inherit;\n            outline: 0;\n            color: #222;\n            transition: .3s;\n            ", "cart-footer", "cartBubble", "enabledDescription", "px;\n           \n         }\n         \n         .wenexus-package-protection__image {            \n            max-width: ", "querySelectorAll", "Shopify", "translateX(20px)", ".cart--total-price", "#main-cart-footer", "className", "item_count", "createElement", "textAlign", "disabledDescription", ".order-summary-card", ".wt-cart__footer", ".cart-total-box", ".cart__footer", ".button-container", "items_subtotal_price", "form#CartPageForm", "div", ".cart-recap", "#7b7b7b", "toString", "includes", ".cart__total", '\n                </h5>\n                <p> <span class="wenexus-package-protection-description">', "126AtVwQi", "[name='checkout']", "NumberFormat", ";\n            margin: ", "refreshPriceUI", "subtotal-price", ";\n            max-width: ", '</style>\n        <div class="wenexus-package-protection__content">\n            <div class="wenexus-package-protection__image">\n                <img src="', "enabledCheckoutButton", "set", "wenexus-package-protection-description", "buttonColor", "css", ".shopping-cart", "infoPageLink", ".cart-total-price", ".cart__summary-total", ".cart-drawer-footer-total", "from"];
    _0x3bd3 = function() {
      return _0x24762b;
    };
    return _0x3bd3();
  }
  class PackageProtectionClientShopifyFreeTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, _l, "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static ["shouldUse"]() {
      return checkTheme(freeThemes);
    }
    [(_l = _0x4b16bb(629), _0x4b16bb(573))](_0x2f93f3, _0x3b4f7d) {
      const _0x4918a0 = _0x4b16bb;
      return [{ "selector": _0x3b4f7d ?? _0x4918a0(491), "insertPosition": _0x2f93f3 ?? _0x4918a0(584) }, { "selector": ".cart-notification__links", "insertPosition": _0x4918a0(584), "boundaryParents": new Set(Array[_0x4918a0(560)](document[_0x4918a0(518)](_0x4918a0(635)))) }, { "selector": _0x4918a0(532), "insertPosition": "before" }, { "selector": _0x4918a0(507), "insertPosition": _0x4918a0(584) }];
    }
    async [_0x4b16bb(607)](_0x2b25b7) {
      const _0x35f14a = _0x4b16bb;
      return super[_0x35f14a(607)]({ "imageWidth": 66, "containerMargin": [10, 0, 12, 0], "containerJustify": _0x35f14a(612), "titleFontSize": 1.8, "descriptionFontSize": 1.1, "hideDescriptionPage": ![], "descriptionMargin": [2, 0, 0, 0], ..._0x2b25b7, "accentColor": _0x35f14a(485) });
    }
    async [_0x4b16bb(592)]() {
      const _0x57a3bb = _0x4b16bb, _0x2e1e08 = [_0x57a3bb(624)], _0x3a77b0 = await window[_0x57a3bb(494)][_0x57a3bb(611)](), _0x2ecf1e = (_0x248771 = 0) => {
        const _0x2d5f5f = _0x57a3bb;
        _0x2e1e08[_0x2d5f5f(596)]((_0x57765d) => {
          const _0x22b828 = _0x2d5f5f;
          let _0x252f95 = document[_0x22b828(518)](_0x57765d);
          function _0x89a1b3(_0x41a4ef) {
            const _0x2078f5 = _0x22b828, _0x4dee10 = Number(_0x3a77b0[_0x2078f5(533)] / 100)[_0x2078f5(587)](2), _0x2e20a9 = Number(_0x3a77b0[_0x2078f5(533)] / 100 + _0x248771)[_0x2078f5(587)](2);
            if ((_0x41a4ef == null ? void 0 : _0x41a4ef["nodeType"]) === (Node == null ? void 0 : Node[_0x2078f5(580)])) {
              if (_0x248771 === 0) {
                const _0x8b66d3 = localStorage[_0x2078f5(642)]("items_subtotal_price");
                _0x41a4ef["textContent"] = _0x41a4ef[_0x2078f5(597)][_0x2078f5(583)](new RegExp("\\b" + _0x8b66d3 + "\\b", "g"), _0x2e20a9);
              } else
                localStorage["setItem"](_0x2078f5(533), _0x2e20a9), _0x41a4ef["textContent"] = _0x41a4ef[_0x2078f5(597)][_0x2078f5(583)](new RegExp("\\b" + _0x4dee10 + "\\b", "g"), _0x2e20a9);
            } else
              (_0x41a4ef == null ? void 0 : _0x41a4ef[_0x2078f5(616)]) === (Node == null ? void 0 : Node[_0x2078f5(602)]) && Array[_0x2078f5(560)](_0x41a4ef[_0x2078f5(503)])[_0x2078f5(596)](_0x89a1b3);
          }
          _0x252f95[_0x22b828(596)]((_0x57b208) => {
            _0x89a1b3(_0x57b208);
          });
        });
      };
      setTimeout(() => {
        const _0x88a45 = _0x57a3bb, _0x501b48 = this[_0x88a45(574)](), _0x24ff53 = localStorage[_0x88a45(642)]("package-protection-enabled");
        let _0x2993bc = "";
        _0x24ff53 === _0x88a45(627) ? (_0x2993bc = this["enabledDescription"], _0x2ecf1e(_0x501b48), _0x2ecf1e(_0x501b48)) : (_0x2993bc = this["disabledDescription"], _0x2ecf1e(), _0x2ecf1e());
        const _0x2440fe = document["getElementsByClassName"](_0x88a45(552));
        Array[_0x88a45(560)](_0x2440fe)[_0x88a45(596)]((_0x59659f) => _0x59659f[_0x88a45(570)] = _0x2993bc + " ");
      }, 500);
    }
    ["cartUpdate"]() {
      const _0x2a1773 = _0x4b16bb;
      console[_0x2a1773(606)](_0x2a1773(566)), Array[_0x2a1773(560)](document[_0x2a1773(628)](_0x2a1773(636)))[_0x2a1773(596)]((_0x5a9ffe) => _0x5a9ffe["onCartUpdate"]()), Array[_0x2a1773(560)](document["getElementsByTagName"]("cart-drawer-items"))[_0x2a1773(596)]((_0x47ea65) => _0x47ea65[_0x2a1773(626)]());
    }
    async [_0x4b16bb(515)]() {
      const _0x40e3f0 = _0x4b16bb, _0x293f8f = (await window[_0x40e3f0(494)][_0x40e3f0(611)]())[_0x40e3f0(524)];
      let _0x29ce38 = document[_0x40e3f0(567)](_0x40e3f0(615));
      Array[_0x40e3f0(560)](_0x29ce38)[_0x40e3f0(596)]((_0x73bf1a) => {
        const _0x1f2d9d = _0x40e3f0;
        _0x73bf1a["childNodes"][_0x1f2d9d(596)]((_0x5d40e6) => {
          const _0x5196b2 = _0x1f2d9d;
          _0x5d40e6[_0x5196b2(570)] && (_0x5d40e6[_0x5196b2(570)] = _0x293f8f[_0x5196b2(538)]());
        });
      });
    }
  }
  function _0x5728() {
    const _0x1d340a = ["formatPrice", "test", "#2c7e3f", "textContent", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753", "15SQunBK", "250px", ".cart__summary div p", "3390462PnTmHr", "innerHTML", "3190556VbarXA", "forEach", "Checkout - ", "currency", "11207040elDRzw", "763248GmJWqM", "package-protection-enabled", "true", "total_price", "thumbnail", "wenexus-package-protection-description", "lastElementChild", "70usWFaF", "3344550kjOPPZ", "querySelector", "weNexusCartApi", "getElementsByClassName", "getStyleMarkup", "2mTxNBF", "get", "reload", 'button[name="checkout"]', "enabledDescription", "229722mJSxrY", "getWidgetPrice", "doesCheckoutContainSubtotal", "10030293mpFNql", "cartUpdate"];
    _0x5728 = function() {
      return _0x1d340a;
    };
    return _0x5728();
  }
  const _0x4c0d22 = _0x29bf;
  (function(_0x140903, _0x329aac) {
    const _0x430c72 = _0x29bf, _0x5d6295 = _0x140903();
    while (!![]) {
      try {
        const _0x338663 = -parseInt(_0x430c72(385)) / 1 + parseInt(_0x430c72(398)) / 2 * (-parseInt(_0x430c72(403)) / 3) + parseInt(_0x430c72(418)) / 4 + parseInt(_0x430c72(413)) / 5 * (-parseInt(_0x430c72(393)) / 6) + -parseInt(_0x430c72(406)) / 7 + parseInt(_0x430c72(384)) / 8 + parseInt(_0x430c72(416)) / 9 * (parseInt(_0x430c72(392)) / 10);
        if (_0x338663 === _0x329aac)
          break;
        else
          _0x5d6295["push"](_0x5d6295["shift"]());
      } catch (_0x2dbe2b) {
        _0x5d6295["push"](_0x5d6295["shift"]());
      }
    }
  })(_0x5728, 890549);
  function _0x29bf(_0x494ad0, _0x94aa8f) {
    const _0x5728fb = _0x5728();
    return _0x29bf = function(_0x29bf9a, _0x253647) {
      _0x29bf9a = _0x29bf9a - 381;
      let _0x23d57a = _0x5728fb[_0x29bf9a];
      return _0x23d57a;
    }, _0x29bf(_0x494ad0, _0x94aa8f);
  }
  class PackageProtectionClientEnterpriseTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, _m, _0x4c0d22(412));
    }
    static ["shouldUse"]() {
      return checkTheme(enterpriseTheme);
    }
    ["getInsertionPointSelectors"]() {
      return [{ "selector": "button[name='checkout']", "insertPosition": "before" }];
    }
    async [(_m = _0x4c0d22(389), _0x4c0d22(397))](_0x5ace78) {
      const _0x10cb29 = _0x4c0d22;
      return super[_0x10cb29(397)]({ "imageWidth": 66, "containerMargin": [10, 0, 12, 0], "containerJustify": "end", "titleFontSize": 1, "descriptionFontSize": 0.8, "hideDescriptionPage": ![], "descriptionMargin": [2, 0, 0, 0], "containerMaxWidth": _0x10cb29(414), ..._0x5ace78, "accentColor": _0x10cb29(410) });
    }
    [_0x4c0d22(405)](_0x4df344) {
      const _0x4eb8b3 = _0x4c0d22;
      if (!_0x4df344)
        return ![];
      const _0x5a57cc = /checkout/i, _0x5943c3 = /\b\d+(\.\d{2})?\b/;
      return _0x5a57cc[_0x4eb8b3(409)](_0x4df344) && _0x5943c3[_0x4eb8b3(409)](_0x4df344);
    }
    async ["refreshWidget"]() {
      const _0x5cc408 = _0x4c0d22;
      console["log"]("enterpriseTheme");
      const _0xcccf9e = [_0x5cc408(415), _0x5cc408(401)], _0x1791b0 = await window[_0x5cc408(395)][_0x5cc408(399)](), _0xc4bda9 = (_0xb93a09 = 0) => {
        const _0x413435 = _0x5cc408;
        _0xcccf9e[_0x413435(381)]((_0x31acd5) => {
          const _0xc5dfc4 = _0x413435;
          let _0xbeda65 = document[_0xc5dfc4(394)](_0x31acd5);
          if (_0xbeda65 && this["doesCheckoutContainSubtotal"](_0xbeda65[_0xc5dfc4(411)])) {
            _0xbeda65[_0xc5dfc4(411)] = _0xc5dfc4(382) + this["formatPrice"](Number(_0x1791b0[_0xc5dfc4(388)] / 100 + _0xb93a09), _0x1791b0["currency"]);
            return;
          }
          if (_0xbeda65 && _0xbeda65[_0xc5dfc4(391)])
            _0xbeda65["lastElementChild"][_0xc5dfc4(417)] = _0xc5dfc4(382) + this[_0xc5dfc4(408)](Number(_0x1791b0["total_price"] / 100 + _0xb93a09), _0x1791b0[_0xc5dfc4(383)]);
          else
            _0xbeda65 && (_0xbeda65["innerHTML"] = this[_0xc5dfc4(408)](Number(_0x1791b0[_0xc5dfc4(388)] / 100 + _0xb93a09), _0x1791b0[_0xc5dfc4(383)]));
        });
      };
      setTimeout(() => {
        const _0x35125a = _0x5cc408, _0x502bf1 = this[_0x35125a(404)](), _0x67272e = localStorage["getItem"](_0x35125a(386));
        let _0x1177ec = "";
        _0x67272e === _0x35125a(387) ? (_0x1177ec = this[_0x35125a(402)], _0xc4bda9(_0x502bf1), _0xc4bda9(_0x502bf1)) : (_0x1177ec = this["disabledDescription"], _0xc4bda9(), _0xc4bda9());
        const _0x484844 = document[_0x35125a(396)](_0x35125a(390));
        Array["from"](_0x484844)["forEach"]((_0x2eebb4) => _0x2eebb4["innerHTML"] = _0x1177ec + " ");
      }, 500);
    }
    [_0x4c0d22(407)]() {
      const _0x385ab0 = _0x4c0d22;
      window["location"][_0x385ab0(400)]();
    }
  }
  const _0x19f6a4 = _0x1f48;
  (function(_0x2d529f, _0x3a622f) {
    const _0x2fb74f = _0x1f48, _0xfd3a5a = _0x2d529f();
    while (!![]) {
      try {
        const _0xb861ac = -parseInt(_0x2fb74f(351)) / 1 * (-parseInt(_0x2fb74f(339)) / 2) + parseInt(_0x2fb74f(340)) / 3 + -parseInt(_0x2fb74f(354)) / 4 + -parseInt(_0x2fb74f(324)) / 5 + -parseInt(_0x2fb74f(268)) / 6 * (parseInt(_0x2fb74f(327)) / 7) + -parseInt(_0x2fb74f(252)) / 8 + parseInt(_0x2fb74f(325)) / 9;
        if (_0xb861ac === _0x3a622f)
          break;
        else
          _0xfd3a5a["push"](_0xfd3a5a["shift"]());
      } catch (_0x2e9bb7) {
        _0xfd3a5a["push"](_0xfd3a5a["shift"]());
      }
    }
  })(_0x3c2e, 947248);
  function _0x1f48(_0x31bddc, _0x2801fd) {
    const _0x3c2ed1 = _0x3c2e();
    return _0x1f48 = function(_0x1f481d, _0x4de94b) {
      _0x1f481d = _0x1f481d - 225;
      let _0x5cc315 = _0x3c2ed1[_0x1f481d];
      return _0x5cc315;
    }, _0x1f48(_0x31bddc, _0x2801fd);
  }
  class PackageProtectionClientUniversalTheme extends PackageProtectionClientBasic {
    static [_0x19f6a4(367)]() {
      return checkTheme(universalTheme);
    }
    [_0x19f6a4(337)]() {
      const _0x3809ab = _0x19f6a4;
      return [{ "selector": _0x3809ab(247), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(236), "insertPosition": "before" }, { "selector": ".cart-buttons", "insertPosition": "before" }, { "selector": _0x3809ab(229), "insertPosition": "before" }, { "selector": _0x3809ab(227), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(250), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(296), "insertPosition": "before" }, { "selector": _0x3809ab(345), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(244), "insertPosition": "before" }, { "selector": _0x3809ab(240), "insertPosition": "before" }, { "selector": ".checkout-buttons", "insertPosition": _0x3809ab(288) }, { "selector": ".f-cart-drawer__buttons", "insertPosition": "before" }, { "selector": ".drawer__footer-buttons", "insertPosition": _0x3809ab(288) }, { "selector": ".cart__footer--buttons", "insertPosition": _0x3809ab(288) }, { "selector": "#CartDetails", "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(249), "insertPosition": _0x3809ab(264) }, { "selector": _0x3809ab(353), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(289), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(243), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(346), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(241), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(310), "insertPosition": _0x3809ab(288) }, { "selector": 'form.cart__wrapper div.cart-summary .cart-summary__buttons button[name="checkout"]', "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(286), "insertPosition": "before" }, { "selector": _0x3809ab(362), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(361), "insertPosition": "before" }, { "selector": _0x3809ab(308), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(226), "insertPosition": _0x3809ab(288) }, { "selector": ".cart__buttons-container", "insertPosition": _0x3809ab(288) }, { "selector": ".cart-template__footer-actions", "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(341), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(304), "insertPosition": "after" }, { "selector": _0x3809ab(316), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(303), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(285), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(260), "insertPosition": "before" }, { "selector": _0x3809ab(338), "insertPosition": "before" }, { "selector": _0x3809ab(237), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(297), "insertPosition": _0x3809ab(288) }, { "selector": ".cart-ctas", "insertPosition": "before" }, { "selector": _0x3809ab(300), "insertPosition": "before" }, { "selector": ".cart-template__checkout-buttons", "insertPosition": "before" }, { "selector": ".add-to-cart-wrap", "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(276), "insertPosition": "before" }, { "selector": _0x3809ab(261), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(238), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(282), "insertPosition": _0x3809ab(288) }, { "selector": "add-order-note", "insertPosition": _0x3809ab(264) }, { "selector": ".main-cart__footer__fine-print", "insertPosition": "after" }, { "selector": ".header-minicart-footer-wrapper", "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(283), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(309), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(255), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(332), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(311), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(281), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(326), "insertPosition": _0x3809ab(264) }, { "selector": _0x3809ab(333), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(248), "insertPosition": _0x3809ab(288) }, { "selector": ".cart-btn", "insertPosition": _0x3809ab(288) }, { "selector": ".cart-btn-container", "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(279), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(272), "insertPosition": _0x3809ab(288) }, { "selector": '.checkout-row input[type="submit"][name="checkout"]', "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(364), "insertPosition": _0x3809ab(288) }, { "selector": _0x3809ab(302), "insertPosition": "before" }];
    }
    async [_0x19f6a4(253)]() {
      const _0x39fa43 = _0x19f6a4;
      console[_0x39fa43(313)]("universal-1");
      const _0x3afcea = [_0x39fa43(363), _0x39fa43(331), _0x39fa43(228), _0x39fa43(343), _0x39fa43(266), _0x39fa43(298), _0x39fa43(275), ".subtotal-row", _0x39fa43(239), _0x39fa43(270), _0x39fa43(225), ".cart-drawer__footer", _0x39fa43(295), _0x39fa43(299), _0x39fa43(271), _0x39fa43(256), _0x39fa43(329), _0x39fa43(307), _0x39fa43(322), _0x39fa43(305), _0x39fa43(317), _0x39fa43(273), _0x39fa43(369), _0x39fa43(233), _0x39fa43(291), _0x39fa43(234), "div#main-cart-footer", _0x39fa43(246), _0x39fa43(320), _0x39fa43(335), ".ajaxcart__footer", _0x39fa43(355), _0x39fa43(242), ".quick-cart__footer", _0x39fa43(334), ".cart-drawer__subtotal", _0x39fa43(301), _0x39fa43(294), _0x39fa43(342), ".thb-cart-form--cart-collaterals", ".side-panel-footer", _0x39fa43(352), _0x39fa43(267), ".mini-cart-footer", ".cart-drawer__cart-total", _0x39fa43(366), _0x39fa43(347), _0x39fa43(246), _0x39fa43(259), _0x39fa43(257), ".main-cart__footer__total", _0x39fa43(287), _0x39fa43(235), "#total-bottom", _0x39fa43(319), _0x39fa43(357), _0x39fa43(312), _0x39fa43(265), _0x39fa43(370), _0x39fa43(350), 'div[slot="footer"]', _0x39fa43(306), ".mini-cart__recap", _0x39fa43(314), _0x39fa43(248), _0x39fa43(318), ".xo-cart-totals", _0x39fa43(231), _0x39fa43(251), _0x39fa43(263), 'button[type="submit"][name="checkout"]', 'div[slot="footer"]'], _0x183c24 = await window[_0x39fa43(280)][_0x39fa43(358)](), _0x380a7c = document[_0x39fa43(284)]('.wenexus-package-protection__toggle input[type="checkbox"]');
      if (_0x380a7c)
        _0x380a7c[_0x39fa43(230)][_0x39fa43(356)](_0x39fa43(254));
      const _0x500f2c = () => {
        const _0x28204e = _0x39fa43, _0x56a61c = document[_0x28204e(284)](_0x28204e(365));
        if (_0x56a61c)
          _0x56a61c[_0x28204e(323)][_0x28204e(360)] = _0x28204e(290);
      };
      _0x500f2c();
      const _0x3e8e29 = (_0x53eee8 = 0) => {
        const _0x428f59 = _0x39fa43;
        _0x3afcea[_0x428f59(293)]((_0x3b086b) => {
          const _0x24e662 = _0x428f59;
          let _0x4a3c89 = document[_0x24e662(278)](_0x3b086b);
          function _0x36d165(_0x5fa7d5) {
            const _0x2a440a = _0x24e662, _0x4150eb = Number(_0x183c24["items_subtotal_price"] / 100)[_0x2a440a(368)](2), _0x28f4d5 = Number(_0x183c24[_0x2a440a(344)] / 100 + _0x53eee8)[_0x2a440a(368)](2);
            if ((_0x5fa7d5 == null ? void 0 : _0x5fa7d5["nodeType"]) === (Node == null ? void 0 : Node["TEXT_NODE"])) {
              if (_0x53eee8 === 0) {
                const _0x75c1ba = localStorage["getItem"](_0x2a440a(344));
                _0x5fa7d5["textContent"] = _0x5fa7d5[_0x2a440a(232)][_0x2a440a(321)](new RegExp("\\b" + _0x75c1ba + "\\b", "g"), _0x28f4d5);
              } else
                localStorage[_0x2a440a(359)](_0x2a440a(344), _0x28f4d5), _0x5fa7d5[_0x2a440a(232)] = _0x5fa7d5[_0x2a440a(232)][_0x2a440a(321)](new RegExp("\\b" + _0x4150eb + "\\b", "g"), _0x28f4d5);
            } else
              (_0x5fa7d5 == null ? void 0 : _0x5fa7d5[_0x2a440a(269)]) === (Node == null ? void 0 : Node[_0x2a440a(258)]) && Array[_0x2a440a(277)](_0x5fa7d5[_0x2a440a(349)])["forEach"](_0x36d165);
          }
          _0x4a3c89[_0x24e662(293)]((_0x1f86c6) => {
            _0x36d165(_0x1f86c6);
          });
        });
      };
      setTimeout(() => {
        const _0xc188c7 = _0x39fa43, _0x1db93f = this[_0xc188c7(328)](), _0x30a870 = localStorage[_0xc188c7(348)](_0xc188c7(315));
        let _0xa32072 = "";
        _0x30a870 === _0xc188c7(245) ? (_0xa32072 = this["enabledDescription"], _0x3e8e29(_0x1db93f), _0x3e8e29(_0x1db93f)) : (_0xa32072 = this[_0xc188c7(274)], _0x3e8e29(), _0x3e8e29());
        const _0xf2d1f6 = document[_0xc188c7(292)](_0xc188c7(262));
        Array[_0xc188c7(277)](_0xf2d1f6)[_0xc188c7(293)]((_0x5c7278) => _0x5c7278[_0xc188c7(330)] = _0xa32072 + " ");
      }, 500);
    }
    [_0x19f6a4(336)]() {
      window["location"]["reload"]();
    }
  }
  function _0x3c2e() {
    const _0x22a63c = ["shouldUse", "toFixed", "div.cart-notification__links", ".totle-price", ".cart__summary", ".ajaxcart__footer", ".cart-summary__button", ".cart-subtotal", ".cart__ctas", "classList", ".xo-cart-mini-footer__price", "textContent", "div.ajax-cart__final-details", "div#CartDrawer", ".sticky-menu container", "cart-drawer-buttons-block", ".thb-cart-form--proceed", ".cart-sidebar__footer-actions", ".cart-drawer__summary", '.cart__summary button[name="checkout"]', "div.cart-purchase__checkout-section div.bottom-cart-wrapper", ".cart-template__footer", "fieldset aside p.link-btn.wide", ".drawer__footer details", "true", ".cart-sidebar__footer", ".footer-ctas", 'button[form="mini-cart-form"]', "main.drawer__inner.min-h-0.h-full small.text-caption", ".cart-submit", ".cart-total-price", "11263456WWvijs", "refreshWidget", "product-variant__input", ".cart-drawer__action-buttons", ".cart__details--row", ".sub-total", "ELEMENT_NODE", ".cart-totals", ".proceed-to-checkout", ".cart__checkout", "wenexus-package-protection-description", ".cart-form__totals", "after", ".cart-total-item", ".cart__footer", ".cart-footer", "6MZxAAq", "nodeType", "div[data-cart-footer]", ".drawer__footer-body", 'xo-cart-will-change button[type="submit"][name="checkout"]', "form.f8vl.f8vl-initialized ul.l4tt.form-group", "disabledDescription", ".drawer__footer", ".drawer__footer-actions", "from", "querySelectorAll", ".xo-cart-mini-footer__group", "weNexusCartApi", ".mini-cart__button-container", ".cart-modal-buttons", ".sticky-menu-buttons-slideout-closed", "querySelector", ".cart-drawer-buttons", "form#cart button#cart-notification-checkout", ".header-minicart-footer-wrapper", "before", "form.f8vl.f8vl-initialized p.link-btn.text-justify", "unset", "div.cart-purchase__buttons", "getElementsByClassName", "forEach", ".mini-cart__total", ".checkout-subtotal-container__right", ".cart-drawer__checkout-buttons", ".mini-cart__buttons", ".cart-summary__total-price-row", ".f-cart-drawer__subtotal-value", ".mini-cart-footer-actions", ".cart-total-box", 'safe-sticky button[name="checkout"]', ".checkout-btns", ".quick-cart__total", "ul.l4tt.m15.form-group ", "safe-sticky", "#CartTotal", ".theme-button--secondary", 'button[aria-label="Agree to Terms"]', "div.mini-cart__footer div.cart-summary__meta a.button", ".cart-checkout", ".checkout-subtotal-container", "log", ".card__section", "package-protection-enabled", ".cart-drawer__footer--buttons", "fieldset aside ul.l4tt.form-group", ".cart__recap", ".money[data-cart-total]", ".mini-cart__footer", "replace", "form.sticky-in-panel ", "style", "5837880ZpHkkG", "33626205ICnnyV", ".cart-recap__notices", "10760533ykOjvm", "getWidgetPrice", ".cart__details", "innerHTML", ".cart-drawer-subtotal__main-content", ".cart-mini-actions", ".buy-buttons--compact", ".cart__subtotal", ".cart-summary", "cartUpdate", "getInsertionPointSelectors", ".cart-drawer--buttons-container", "9566FxleeX", "4631841cRoaxM", ".cart__footer-actions", ".cart-drawer--footer", ".drawer__footer__inner", "items_subtotal_price", ".cart-drawer__footer  p.rte", ".cart-checkout-container", ".cart-page__block-container", "getItem", "childNodes", "#mini-cart-toggle", "302PDWfVk", ".cart-total", "div.py-24.flex div.md\\:ml-auto.max-sm\\:w-full div.flex.flex-col.items-end.gap-8 button", "6658732miMAgt", ".cart__blocks", "add", ".cart-mini-subtotal", "get", "setItem", "display", "form.ajax-cart__cart-form.grid__wrapper.edge.js-cart-form div.ajax-cart__buttons", "form.ajax-cart__cart-form.grid__wrapper.narrow.mb4.js-cart-form div.ajax-cart__buttons", ".cart-details-footer", ".overlay-buy_button", "div.ajax-cart__summary-wrapper.js-cart-summary", ".cart-template__cart-total"];
    _0x3c2e = function() {
      return _0x22a63c;
    };
    return _0x3c2e();
  }
  const _0x2d089d = _0x1d68;
  function _0x5aff() {
    const _0x1407aa = ['button[type="submit"][name="checkout"]', ".Cart__Total", ".order-summary-card", ".cart-drawer__totals", ".cart-drawer__container", ".cart-items__total", ".main-cart_cart-totals-wrap", "3917910ButHoZ", "weNexusCartApi", ".main-cart_widget--totals", "cartUpdate", ".cart-recap", "2287072IDKFOb", "#cart-subtotal", ".cart__footer-inner", "textContent", "9UMAWkj", "shouldUse", "1686366jmuXSS", ".wt-cart__footer__body", "subtotal-price", ".cart__total", "forEach", "#CartDetails", ".totals__subtotal-value", ".cart--total-price", "#cart-drawer-live-region-subtotal", "14262DLIVNV", "log", ".cart-drawer-footer-total", ".ajaxcart__price", ".quick-cart__footer", "disabledDescription", ".more", ".cart__summary-total", ".cart-footer__summary", ".cart-table__checkoutWrp", "form.sticky-cart__inner", "refreshWidget", "12azECEM", ".cart-total-price", "#main-cart-footer", "getWidgetPrice", "from", ".subtotal", "universal-for-sub-1", ".shopping-cart", "getItem", ".accordion-wrap", "querySelectorAll", "childNodes", "getElementsByClassName", ".cart__details", "152257ZXyXln", "nodeType", "package-protection-enabled", "wenexus-package-protection-description", "items_subtotal_price", "get", "ELEMENT_NODE", ".sub--total-cart", ".wt-cart__footer", ".cart__footer ", ".template__cart__footer", "true", ".cart__subtotal", "949036VpaaSG", "24oBVbwB", "toFixed", "cart-footer", ".items-baseline", "121755ZVVsRE", ".cart-drawer_foot-wrap", "replace", "location", ".cart__row--table", "13eYhyLQ"];
    _0x5aff = function() {
      return _0x1407aa;
    };
    return _0x5aff();
  }
  (function(_0x2d278a, _0x1f4777) {
    const _0x56dc7e = _0x1d68, _0x23ad98 = _0x2d278a();
    while (!![]) {
      try {
        const _0xbe5eff = parseInt(_0x56dc7e(369)) / 1 * (parseInt(_0x56dc7e(397)) / 2) + -parseInt(_0x56dc7e(388)) / 3 + -parseInt(_0x56dc7e(409)) / 4 * (parseInt(_0x56dc7e(364)) / 5) + parseInt(_0x56dc7e(360)) / 6 * (parseInt(_0x56dc7e(346)) / 7) + -parseInt(_0x56dc7e(382)) / 8 * (-parseInt(_0x56dc7e(386)) / 9) + parseInt(_0x56dc7e(377)) / 10 + parseInt(_0x56dc7e(359)) / 11;
        if (_0xbe5eff === _0x1f4777)
          break;
        else
          _0x23ad98["push"](_0x23ad98["shift"]());
      } catch (_0x32bb1f) {
        _0x23ad98["push"](_0x23ad98["shift"]());
      }
    }
  })(_0x5aff, 308483);
  function _0x1d68(_0x2a59e7, _0x21425a) {
    const _0x5afffd = _0x5aff();
    return _0x1d68 = function(_0x1d6864, _0x3c00ea) {
      _0x1d6864 = _0x1d6864 - 344;
      let _0x388cf4 = _0x5afffd[_0x1d6864];
      return _0x388cf4;
    }, _0x1d68(_0x2a59e7, _0x21425a);
  }
  class PackageProtectionClientUniversalForSubTotalTheme extends PackageProtectionClientBasic {
    static [_0x2d089d(387)]() {
      return checkTheme(universalForSubTotalTheme);
    }
    async [_0x2d089d(408)]() {
      const _0x43b9b8 = _0x2d089d;
      console[_0x43b9b8(398)](_0x43b9b8(415));
      const _0x530322 = [_0x43b9b8(354), _0x43b9b8(389), _0x43b9b8(411), ".drawer__footer", _0x43b9b8(384), _0x43b9b8(401), _0x43b9b8(362), _0x43b9b8(370), ".cart__footer", _0x43b9b8(407), "form#CartPageForm", ".cart-total-box", _0x43b9b8(374), ".cart-template__summary", _0x43b9b8(405), ".cart-drawer__bottom", ".total-holder", _0x43b9b8(376), _0x43b9b8(365), _0x43b9b8(379), _0x43b9b8(418), _0x43b9b8(416), _0x43b9b8(356), _0x43b9b8(406), ".cart-subtotal", 'div[data-element="subtotal-block"]', _0x43b9b8(396), "div[data-cart-subtotal-block]", _0x43b9b8(390), ".cart-footer__subtotal", ".cart-totals", _0x43b9b8(372), _0x43b9b8(403), _0x43b9b8(414), ".subtotal .money ", _0x43b9b8(399), ".CartDrawer__Total", _0x43b9b8(371), ".cart-header-details", _0x43b9b8(353), _0x43b9b8(363), _0x43b9b8(373), _0x43b9b8(383), _0x43b9b8(391), _0x43b9b8(395), _0x43b9b8(404), ".cart-drawer__summary-total", _0x43b9b8(375), ".cart-drawer__total", _0x43b9b8(358), _0x43b9b8(394), _0x43b9b8(393), _0x43b9b8(355), ".cart-summary-line", _0x43b9b8(345), _0x43b9b8(381), ".cart-count", _0x43b9b8(410), _0x43b9b8(358), _0x43b9b8(400), _0x43b9b8(368)], _0x36440e = await window[_0x43b9b8(378)][_0x43b9b8(351)](), _0x16203d = (_0x44646d = 0) => {
        const _0xddb84e = _0x43b9b8;
        _0x530322[_0xddb84e(392)]((_0x39124d) => {
          const _0x14ff1a = _0xddb84e;
          let _0x5c11ac = document[_0x14ff1a(419)](_0x39124d);
          function _0x3cee9e(_0x5e437d) {
            const _0x17f48d = _0x14ff1a, _0x13824c = Number(_0x36440e[_0x17f48d(350)] / 100)[_0x17f48d(361)](2), _0x5ad8b1 = Number(_0x36440e[_0x17f48d(350)] / 100 + _0x44646d)[_0x17f48d(361)](2);
            if ((_0x5e437d == null ? void 0 : _0x5e437d["nodeType"]) === (Node == null ? void 0 : Node["TEXT_NODE"])) {
              if (_0x44646d === 0) {
                const _0x52df8a = localStorage[_0x17f48d(417)](_0x17f48d(350));
                _0x5e437d[_0x17f48d(385)] = _0x5e437d["textContent"]["replace"](new RegExp("\\b" + _0x52df8a + "\\b", "g"), _0x5ad8b1);
              } else
                localStorage["setItem"](_0x17f48d(350), _0x5ad8b1), _0x5e437d[_0x17f48d(385)] = _0x5e437d[_0x17f48d(385)][_0x17f48d(366)](new RegExp("\\b" + _0x13824c + "\\b", "g"), _0x5ad8b1);
            } else
              (_0x5e437d == null ? void 0 : _0x5e437d[_0x17f48d(347)]) === (Node == null ? void 0 : Node[_0x17f48d(352)]) && Array["from"](_0x5e437d[_0x17f48d(420)])[_0x17f48d(392)](_0x3cee9e);
          }
          _0x5c11ac[_0x14ff1a(392)]((_0x35bcd7) => {
            _0x3cee9e(_0x35bcd7);
          });
        });
      };
      setTimeout(() => {
        const _0x12a2cf = _0x43b9b8, _0x4ffd22 = this[_0x12a2cf(412)](), _0x4fe3a6 = localStorage[_0x12a2cf(417)](_0x12a2cf(348));
        let _0x3f50ca = "";
        _0x4fe3a6 === _0x12a2cf(357) ? (_0x3f50ca = this["enabledDescription"], _0x16203d(_0x4ffd22), _0x16203d(_0x4ffd22)) : (_0x3f50ca = this[_0x12a2cf(402)], _0x16203d(), _0x16203d());
        const _0x3d137e = document[_0x12a2cf(344)](_0x12a2cf(349));
        Array[_0x12a2cf(413)](_0x3d137e)[_0x12a2cf(392)]((_0x3b1e82) => _0x3b1e82["innerHTML"] = _0x3f50ca + " ");
      }, 500);
    }
    [_0x2d089d(380)]() {
      const _0x55dc13 = _0x2d089d;
      window[_0x55dc13(367)]["reload"]();
    }
  }
  const _0x16d1f7 = _0x3b7f;
  (function(_0xa2f3f2, _0x52da14) {
    const _0x3be994 = _0x3b7f, _0x472c35 = _0xa2f3f2();
    while (!![]) {
      try {
        const _0x5bbb1b = -parseInt(_0x3be994(343)) / 1 * (-parseInt(_0x3be994(304)) / 2) + parseInt(_0x3be994(320)) / 3 * (-parseInt(_0x3be994(371)) / 4) + parseInt(_0x3be994(373)) / 5 * (parseInt(_0x3be994(349)) / 6) + parseInt(_0x3be994(309)) / 7 * (-parseInt(_0x3be994(364)) / 8) + parseInt(_0x3be994(312)) / 9 + -parseInt(_0x3be994(322)) / 10 + parseInt(_0x3be994(345)) / 11 * (parseInt(_0x3be994(310)) / 12);
        if (_0x5bbb1b === _0x52da14)
          break;
        else
          _0x472c35["push"](_0x472c35["shift"]());
      } catch (_0xbe1509) {
        _0x472c35["push"](_0x472c35["shift"]());
      }
    }
  })(_0x1f3a, 171684);
  function _0x3b7f(_0x283780, _0x4e6fa6) {
    const _0x1f3a15 = _0x1f3a();
    return _0x3b7f = function(_0x3b7fad, _0x567ad0) {
      _0x3b7fad = _0x3b7fad - 304;
      let _0x3bad10 = _0x1f3a15[_0x3b7fad];
      return _0x3bad10;
    }, _0x3b7f(_0x283780, _0x4e6fa6);
  }
  function _0x1f3a() {
    const _0x22570f = ["#CartTotal", ".cart__controls", "switch-1", ".cart__total", ".cart-popup__footer", ".subtotal_amount", "forEach", ".table-container", "log", ".cart__footer-inner", ".cart-drawer-footer", ".cart-total", ".wbcarthtotal", "8eIGmKX", "items_subtotal_price", "p[data-cart-subtotal]", "ELEMENT_NODE", "true", "replace", "disabledDescription", "652OGHJuv", "getElementsByClassName", "5FWkvRM", "add", "get", ".liveCartFooter", "weNexusCartApi", "childNodes", ".vendors", 'div[x-show="cart.total_price > 0"]', "refreshWidget", "72042mzhmuj", ".totals", "cart-dynamic", ".cart-drawer__text", "parentElement", "1657607BpDVMJ", "14868BOtFma", "querySelectorAll", "2024919CCZFhP", 'data-island[x-data="CartFooter"]', "innerHTML", "#main-cart-footer", ".drawer-inner__footer", "getWidgetPrice", "textContent", "nodeType", "513cNhkKs", 'button[name="checkout"][type="submit"], input[name="checkout"][type="submit"],button[name="checkout"], a[href="/checkout"], input[type="submit"][value="Checkout"]', "660840vSLgHe", "setItem", ".cart__footer ", ".subtotal .theme-money", "before", ".total-amount", ".product-price", ".cart-drawer__subtotal", 'span[x-html="formatMoney(state.total_price)"]', ".cart-form__footer", "cartUpdate", "marginBottom", ".wenexus-theme-support", "toFixed", ".cart-summary-price", ".cart-footer_wrapper", "div.total.row", "style", "getItem", ".totals__subtotal-value", "from", "7NAksny", "cart-dynamic.flex.gap-4.flex-col", "33PqwPoj", ".cart__item-subtotal", "reload", "getInsertionPointSelectors", "129522CJHUTq", "70px"];
    _0x1f3a = function() {
      return _0x22570f;
    };
    return _0x1f3a();
  }
  class PackageProtectionClientSwitchTheme extends PackageProtectionClientBasic {
    static ["shouldUse"]() {
      return checkTheme(switchTheme);
    }
    [_0x16d1f7(348)]() {
      const _0x3c72b4 = _0x16d1f7, _0x58a794 = document[_0x3c72b4(311)](_0x3c72b4(321));
      return _0x58a794[_0x3c72b4(357)]((_0x1c6026) => {
        const _0x45eccb = _0x3c72b4;
        _0x1c6026[_0x45eccb(308)] && _0x1c6026[_0x45eccb(308)]["classList"][_0x45eccb(374)]("wenexus-theme-support");
      }), [{ "selector": _0x3c72b4(334), "insertPosition": _0x3c72b4(326) }];
    }
    async [_0x16d1f7(381)]() {
      const _0x43234b = _0x16d1f7;
      console[_0x43234b(359)](_0x43234b(353));
      const _0x4e6375 = ["div[data-cart-footer]", _0x43234b(330), _0x43234b(315), _0x43234b(352), _0x43234b(360), _0x43234b(307), ".cart-amount", ".cart-drawer__footer", _0x43234b(356), _0x43234b(346), ".cart-drawer-price-total", _0x43234b(336), _0x43234b(338), _0x43234b(344), _0x43234b(380), _0x43234b(316), _0x43234b(331), ".minicart-top__wrapper", _0x43234b(337), _0x43234b(355), ".f-drawer__footer", _0x43234b(305), ".cart-summary ", ".cart-tot2", _0x43234b(361), _0x43234b(366), _0x43234b(376), _0x43234b(358), _0x43234b(328), _0x43234b(379), _0x43234b(325), _0x43234b(362), _0x43234b(313), _0x43234b(354), _0x43234b(324), _0x43234b(351), _0x43234b(306), ".sub-total", ".cart-totals", _0x43234b(327), _0x43234b(363), _0x43234b(341), _0x43234b(329)], _0xfbac12 = await window[_0x43234b(377)][_0x43234b(375)](), _0x5c2bb8 = Array["from"](document["querySelectorAll"](_0x43234b(307)));
      _0x5c2bb8["forEach"]((_0x468256) => {
        const _0x19e3b0 = _0x43234b;
        _0x468256[_0x19e3b0(339)][_0x19e3b0(333)] = _0x19e3b0(350);
      });
      const _0x2bb493 = (_0x17622e = 0) => {
        const _0x2b2183 = _0x43234b;
        _0x4e6375[_0x2b2183(357)]((_0x15f01a) => {
          const _0x536987 = _0x2b2183;
          let _0x50b79c = document[_0x536987(311)](_0x15f01a);
          function _0x76ac24(_0x16f38c) {
            const _0x1a1eed = _0x536987, _0x1f663d = Number(_0xfbac12[_0x1a1eed(365)] / 100)[_0x1a1eed(335)](2), _0x531e43 = Number(_0xfbac12[_0x1a1eed(365)] / 100 + _0x17622e)[_0x1a1eed(335)](2);
            if ((_0x16f38c == null ? void 0 : _0x16f38c["nodeType"]) === (Node == null ? void 0 : Node["TEXT_NODE"])) {
              if (_0x17622e === 0) {
                const _0x55241e = localStorage[_0x1a1eed(340)]("items_subtotal_price");
                _0x16f38c[_0x1a1eed(318)] = _0x16f38c[_0x1a1eed(318)][_0x1a1eed(369)](new RegExp("\\b" + _0x55241e + "\\b", "g"), _0x531e43);
              } else
                localStorage[_0x1a1eed(323)](_0x1a1eed(365), _0x531e43), _0x16f38c[_0x1a1eed(318)] = _0x16f38c["textContent"][_0x1a1eed(369)](new RegExp("\\b" + _0x1f663d + "\\b", "g"), _0x531e43);
            } else
              (_0x16f38c == null ? void 0 : _0x16f38c[_0x1a1eed(319)]) === (Node == null ? void 0 : Node[_0x1a1eed(367)]) && Array["from"](_0x16f38c[_0x1a1eed(378)])[_0x1a1eed(357)](_0x76ac24);
          }
          _0x50b79c[_0x536987(357)]((_0x39a5a0) => {
            _0x76ac24(_0x39a5a0);
          });
        });
      };
      setTimeout(() => {
        const _0x3ebab7 = _0x43234b, _0xc2163a = this[_0x3ebab7(317)](), _0x1070cf = localStorage[_0x3ebab7(340)]("package-protection-enabled");
        let _0x5019a8 = "";
        _0x1070cf === _0x3ebab7(368) ? (_0x5019a8 = this["enabledDescription"], _0x2bb493(_0xc2163a), _0x2bb493(_0xc2163a)) : (_0x5019a8 = this[_0x3ebab7(370)], _0x2bb493(), _0x2bb493());
        const _0x5c63cb = document[_0x3ebab7(372)]("wenexus-package-protection-description");
        Array[_0x3ebab7(342)](_0x5c63cb)["forEach"]((_0x535091) => _0x535091[_0x3ebab7(314)] = _0x5019a8 + " ");
      }, 500);
    }
    [_0x16d1f7(332)]() {
      const _0x1fbd4a = _0x16d1f7;
      window["location"][_0x1fbd4a(347)]();
    }
  }
  const _0x372bd5 = _0x2b37;
  (function(_0x24e75a, _0x3faf84) {
    const _0x217739 = _0x2b37, _0x59a1d7 = _0x24e75a();
    while (!![]) {
      try {
        const _0x55f57b = parseInt(_0x217739(169)) / 1 + parseInt(_0x217739(192)) / 2 * (-parseInt(_0x217739(193)) / 3) + -parseInt(_0x217739(176)) / 4 + parseInt(_0x217739(177)) / 5 * (parseInt(_0x217739(195)) / 6) + parseInt(_0x217739(187)) / 7 + -parseInt(_0x217739(179)) / 8 + parseInt(_0x217739(198)) / 9;
        if (_0x55f57b === _0x3faf84)
          break;
        else
          _0x59a1d7["push"](_0x59a1d7["shift"]());
      } catch (_0x4451b3) {
        _0x59a1d7["push"](_0x59a1d7["shift"]());
      }
    }
  })(_0x2199, 136128);
  function _0x2b37(_0x3d57e3, _0x1a7d26) {
    const _0x219935 = _0x2199();
    return _0x2b37 = function(_0x2b37dd, _0x4125ef) {
      _0x2b37dd = _0x2b37dd - 154;
      let _0x20dc0c = _0x219935[_0x2b37dd];
      return _0x20dc0c;
    }, _0x2b37(_0x3d57e3, _0x1a7d26);
  }
  function _0x2199() {
    const _0x55b37e = ["before", "126362JFsldi", "innerHTML", "true", "formatPrice", "end", "total_price", "get", "940424HYBYow", "25JYAqvv", "enabledDescription", "1750312DFXFsc", "thumbnail", ".cart__summary div.flex.justify-between.items-center p.mb-0.font-bold", "</sup> ", "getElementsByClassName", "log", "getItem", "exponent subtotal theme", "1806259cxXpjt", "from", "getInsertionPointSelectors", "getStyleMarkup", "div.cart__item-sub.cart__item-row.cart__item--subtotal span[aria-hidden='true']", "14dRlizs", "89949paOYXr", "wenexus-package-protection-description", "318786eHHHgK", "getWidgetPrice", 'button[name="checkout"]', "1348650JYPEws", "package-protection-enabled", "forEach", "weNexusCartApi", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753", "cartUpdate", "disabledDescription", "currency", "split", ".cart__summary div.flex.justify-between.items-center.mt-6 p.font-bold", "reload", "querySelector", "250px", "refreshWidget", "shouldUse"];
    _0x2199 = function() {
      return _0x55b37e;
    };
    return _0x2199();
  }
  class PackageProtectionClientUniversalExponentSubtotalTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, _n, _0x372bd5(157));
    }
    static [(_n = _0x372bd5(180), _0x372bd5(167))]() {
      return checkTheme(universalForExponentSubtotal);
    }
    [_0x372bd5(189)]() {
      const _0x15ecfe = _0x372bd5;
      return [{ "selector": _0x15ecfe(197), "insertPosition": _0x15ecfe(168) }];
    }
    async [_0x372bd5(190)](_0x3820b3) {
      const _0x2bd481 = _0x372bd5;
      return super[_0x2bd481(190)]({ "imageWidth": 66, "containerMargin": [10, 0, 12, 0], "containerJustify": _0x2bd481(173), "titleFontSize": 1, "descriptionFontSize": 0.8, "hideDescriptionPage": ![], "descriptionMargin": [2, 0, 0, 0], "containerMaxWidth": _0x2bd481(165), ..._0x3820b3, "accentColor": "#2c7e3f" });
    }
    async [_0x372bd5(166)]() {
      const _0x13b4cb = _0x372bd5;
      console[_0x13b4cb(184)](_0x13b4cb(186));
      const _0x219173 = ["div.cart-drawer__summary.relative.cart-drawer__summary--top.cart-drawer--checkout--sticky-true.cart-drawer--checkout--sticky-desktop-true.cart-drawer--checkout--sticky-mobile-true div.flex.flex-wrap.justify-between.items-center.mb-4 div.font-bold", _0x13b4cb(181), _0x13b4cb(162), _0x13b4cb(191)], _0x597d33 = await window[_0x13b4cb(156)][_0x13b4cb(175)](), _0x237e19 = (_0x1a389a = 0) => {
        const _0x495dfd = _0x13b4cb;
        _0x219173[_0x495dfd(155)]((_0xc1f509) => {
          const _0x3c84df = _0x495dfd;
          let _0x343903 = document[_0x3c84df(164)](_0xc1f509);
          if (_0x343903) {
            const _0x407a16 = this[_0x3c84df(172)](Number(_0x597d33[_0x3c84df(174)] / 100 + _0x1a389a), _0x597d33[_0x3c84df(160)]), _0x50fadf = _0x407a16[_0x3c84df(161)](".");
            _0x343903[_0x3c84df(170)] = _0x50fadf[0] + "<sup>" + _0x50fadf[1] + _0x3c84df(182) + _0x597d33[_0x3c84df(160)];
          }
        });
      };
      setTimeout(() => {
        const _0x12bc27 = _0x13b4cb, _0x1e7c5f = this[_0x12bc27(196)](), _0x255312 = localStorage[_0x12bc27(185)](_0x12bc27(154));
        let _0x4d7d0b = "";
        _0x255312 === _0x12bc27(171) ? (_0x4d7d0b = this[_0x12bc27(178)], _0x237e19(_0x1e7c5f), _0x237e19(_0x1e7c5f)) : (_0x4d7d0b = this[_0x12bc27(159)], _0x237e19(), _0x237e19());
        const _0x358c41 = document[_0x12bc27(183)](_0x12bc27(194));
        Array[_0x12bc27(188)](_0x358c41)[_0x12bc27(155)]((_0x15c098) => _0x15c098[_0x12bc27(170)] = _0x4d7d0b + " ");
      }, 500);
    }
    [_0x372bd5(158)]() {
      const _0x2acfc8 = _0x372bd5;
      window["location"][_0x2acfc8(163)]();
    }
  }
  function _0x581b(_0x4ed1c3, _0x2d7a66) {
    const _0x44b0fe = _0x44b0();
    return _0x581b = function(_0x581bde, _0x3650fa) {
      _0x581bde = _0x581bde - 320;
      let _0x2b8d6a = _0x44b0fe[_0x581bde];
      return _0x2b8d6a;
    }, _0x581b(_0x4ed1c3, _0x2d7a66);
  }
  const _0x23de19 = _0x581b;
  (function(_0xc1c487, _0x507910) {
    const _0x4181c8 = _0x581b, _0x55b8d5 = _0xc1c487();
    while (!![]) {
      try {
        const _0x509aa0 = parseInt(_0x4181c8(356)) / 1 + parseInt(_0x4181c8(346)) / 2 * (parseInt(_0x4181c8(323)) / 3) + parseInt(_0x4181c8(333)) / 4 * (parseInt(_0x4181c8(355)) / 5) + -parseInt(_0x4181c8(320)) / 6 + parseInt(_0x4181c8(341)) / 7 * (parseInt(_0x4181c8(340)) / 8) + -parseInt(_0x4181c8(321)) / 9 + -parseInt(_0x4181c8(322)) / 10;
        if (_0x509aa0 === _0x507910)
          break;
        else
          _0x55b8d5["push"](_0x55b8d5["shift"]());
      } catch (_0x42b050) {
        _0x55b8d5["push"](_0x55b8d5["shift"]());
      }
    }
  })(_0x44b0, 693289);
  class PackageProtectionClientKingdomTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, _o, _0x23de19(342));
    }
    static [(_o = _0x23de19(351), _0x23de19(339))]() {
      return checkTheme(kingdomTheme);
    }
    [_0x23de19(337)]() {
      const _0x5ad969 = _0x23de19;
      return [{ "selector": _0x5ad969(357), "insertPosition": _0x5ad969(347) }, { "selector": _0x5ad969(334), "insertPosition": _0x5ad969(347) }];
    }
    async [_0x23de19(336)](_0xcd94c3) {
      const _0x3bea85 = _0x23de19;
      return super[_0x3bea85(336)]({ "imageWidth": 66, "containerMargin": [10, 0, 12, 0], "containerJustify": _0x3bea85(324), "titleFontSize": 1, "descriptionFontSize": 0.8, "hideDescriptionPage": ![], "descriptionMargin": [2, 0, 0, 0], "containerMaxWidth": _0x3bea85(354), ..._0xcd94c3, "accentColor": _0x3bea85(348) });
    }
    async ["refreshWidget"]() {
      const _0x4b51f8 = _0x23de19;
      console["log"](_0x4b51f8(325));
      const _0x39b50b = ["#CartTotal strong", ".cart-summary-line"], _0x132e12 = await window["weNexusCartApi"][_0x4b51f8(335)](), _0x4ee3f9 = (_0x45a7fd = 0) => {
        const _0xa6b2f2 = _0x4b51f8;
        _0x39b50b[_0xa6b2f2(338)]((_0x478896) => {
          const _0x36389f = _0xa6b2f2;
          let _0x230b60 = document["querySelector"](_0x478896);
          if (_0x230b60 && _0x230b60["lastElementChild"])
            _0x230b60["lastElementChild"][_0x36389f(327)] = _0x36389f(329) + this[_0x36389f(330)](Number(_0x132e12[_0x36389f(345)] / 100 + _0x45a7fd), _0x132e12[_0x36389f(349)]);
          else
            _0x230b60 && (_0x230b60[_0x36389f(327)] = this[_0x36389f(330)](Number(_0x132e12[_0x36389f(345)] / 100 + _0x45a7fd), _0x132e12[_0x36389f(349)]));
        });
      };
      setTimeout(() => {
        const _0x1b24ac = _0x4b51f8, _0x1a3870 = this[_0x1b24ac(352)](), _0x50e1a0 = localStorage[_0x1b24ac(328)](_0x1b24ac(344));
        let _0x32e2a2 = "";
        _0x50e1a0 === "true" ? (_0x32e2a2 = this[_0x1b24ac(353)], _0x4ee3f9(_0x1a3870), _0x4ee3f9(_0x1a3870)) : (_0x32e2a2 = this["disabledDescription"], _0x4ee3f9(), _0x4ee3f9());
        const _0x4a047a = document[_0x1b24ac(331)](_0x1b24ac(332));
        Array["from"](_0x4a047a)[_0x1b24ac(338)]((_0x2f5edb) => _0x2f5edb[_0x1b24ac(327)] = _0x32e2a2 + " ");
      }, 500);
    }
    [_0x23de19(326)]() {
      const _0x3a25e2 = _0x23de19;
      window[_0x3a25e2(343)][_0x3a25e2(350)]();
    }
  }
  function _0x44b0() {
    const _0x5ee29a = ["shouldUse", "40784vleVez", "777dUIckt", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753", "location", "package-protection-enabled", "total_price", "2741078XMtJDj", "before", "#2c7e3f", "currency", "reload", "thumbnail", "getWidgetPrice", "enabledDescription", "250px", "5oTfBNt", "889534jisxLN", "button[name='checkout']", "5300094mjlYrF", "4731012dxtPyt", "18003770CKktqw", "3SshHNK", "end", "kingdomTheme", "cartUpdate", "innerHTML", "getItem", "SUBTOTAL ", "formatPrice", "getElementsByClassName", "wenexus-package-protection-description", "4306928TFfmYo", ".cart-buttons", "get", "getStyleMarkup", "getInsertionPointSelectors", "forEach"];
    _0x44b0 = function() {
      return _0x5ee29a;
    };
    return _0x44b0();
  }
  function _0x1f02(_0x39246c, _0x1b2038) {
    const _0x2c7080 = _0x2c70();
    return _0x1f02 = function(_0x1f02aa, _0x95c1b3) {
      _0x1f02aa = _0x1f02aa - 160;
      let _0x5db946 = _0x2c7080[_0x1f02aa];
      return _0x5db946;
    }, _0x1f02(_0x39246c, _0x1b2038);
  }
  const _0x46aee8 = _0x1f02;
  (function(_0x71210, _0x18a4fd) {
    const _0x1979b5 = _0x1f02, _0x17092c = _0x71210();
    while (!![]) {
      try {
        const _0x58d5c2 = parseInt(_0x1979b5(180)) / 1 * (-parseInt(_0x1979b5(170)) / 2) + parseInt(_0x1979b5(188)) / 3 * (parseInt(_0x1979b5(209)) / 4) + parseInt(_0x1979b5(187)) / 5 * (-parseInt(_0x1979b5(208)) / 6) + -parseInt(_0x1979b5(202)) / 7 * (-parseInt(_0x1979b5(164)) / 8) + -parseInt(_0x1979b5(199)) / 9 * (-parseInt(_0x1979b5(185)) / 10) + parseInt(_0x1979b5(218)) / 11 + parseInt(_0x1979b5(215)) / 12;
        if (_0x58d5c2 === _0x18a4fd)
          break;
        else
          _0x17092c["push"](_0x17092c["shift"]());
      } catch (_0x1b6471) {
        _0x17092c["push"](_0x17092c["shift"]());
      }
    }
  })(_0x2c70, 206934);
  function _0x2c70() {
    const _0x2ec71b = ["innerHTML", ".cart-buttons", "shouldUse", "1117300jZtNdW", "schema_name", "410YwrVof", "3VZpwwp", "wenexus-package-protection-description", "total_price", "get", "250px", ".wenexus-package-protection span.toggle-switch", "doesSelectorContainCheckoutWord", "#2c7e3f", "BUTTON", "end", ".cart-price", "9Wfnfke", "after", "Focal", "7GbLDvb", ".cartTotalSelector", "true", "querySelectorAll", "textContent", "getStyleMarkup", "24912rGSjLk", "101148sFPtDn", "</button>\n              ", "log", "theme", "padding", "refreshWidget", "2929596XGVYug", "formatPrice", "test", "2252811aOPNHJ", "thumbnail", "forEach", "getInsertionPointSelectors", "doesSelectorContainSubtotal", "1367000RqQfah", "tagName", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753", "Checkout -", '\n               <span class="checkout-button__lock"><svg focusable="false" width="17" height="17" class="icon icon--lock   " viewBox="0 0 17 17">\n                <path d="M2.5 7V15H14.5V7H2.5Z" stroke="currentColor" stroke-width="1.5" fill="none"></path>\n                <path d="M5.5 4C5.5 2.34315 6.84315 1 8.5 1V1C10.1569 1 11.5 2.34315 11.5 4V7H5.5V4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>\n                <circle cx="8.5" cy="11" r="0.5" stroke="currentColor"></circle>\n              </svg></span>Checkout<span class="square-separator"></span>', "reload", "209428kvfRBU", "location", "getItem", 'button[form="mini-cart-form"][type="submit"]', "currency", "cartUpdate", "from", "getWidgetPrice", "enabledDescription", "before", "2PMLgCA", "disabledDescription"];
    _0x2c70 = function() {
      return _0x2ec71b;
    };
    return _0x2c70();
  }
  class PackageProtectionClientToyoTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, _p, _0x46aee8(166));
    }
    static [(_p = _0x46aee8(160), _0x46aee8(184))]() {
      return checkTheme(toyoTheme);
    }
    [_0x46aee8(162)]() {
      const _0x8b25f = _0x46aee8;
      return [{ "selector": _0x8b25f(183), "insertPosition": _0x8b25f(179) }, { "selector": ".cart-buttons-container", "insertPosition": "before" }, { "selector": "div.shipping_msg.bottompad-half.clearfix shipping-message", "insertPosition": _0x8b25f(200) }, { "selector": ".cart__aside-inner button[type='submit'].cart__checkout-button", "insertPosition": _0x8b25f(179) }, { "selector": _0x8b25f(173), "insertPosition": _0x8b25f(179) }];
    }
    async [_0x46aee8(207)](_0x10d082) {
      const _0x35f9b2 = _0x46aee8;
      return super[_0x35f9b2(207)]({ "imageWidth": 66, "containerMargin": [10, 0, 12, 0], "containerJustify": _0x35f9b2(197), "titleFontSize": 1, "descriptionFontSize": 0.8, "hideDescriptionPage": ![], "descriptionMargin": [2, 0, 0, 0], "containerMaxWidth": _0x35f9b2(192), ..._0x10d082, "accentColor": _0x35f9b2(195) });
    }
    [_0x46aee8(163)](_0x5b52fe) {
      const _0x15a7e2 = _0x46aee8;
      if (!_0x5b52fe)
        return ![];
      const _0xa1bd10 = /\b\d+(\.\d{2})?\b/;
      return _0xa1bd10[_0x15a7e2(217)](_0x5b52fe);
    }
    [_0x46aee8(194)](_0x54089) {
      const _0x47427c = _0x46aee8, _0x4aa364 = /(\d{4})\b/;
      return _0x4aa364[_0x47427c(217)](_0x54089);
    }
    async [_0x46aee8(214)]() {
      const _0x42afba = _0x46aee8;
      console[_0x42afba(211)]("Toyo theme");
      const _0x431866 = document[_0x42afba(205)](_0x42afba(193));
      _0x431866[_0x42afba(161)]((_0x2195a0) => {
        const _0x275435 = _0x42afba;
        _0x2195a0["style"][_0x275435(213)] = "0";
      });
      const _0x239f84 = [".cart-total-price", _0x42afba(198), _0x42afba(203), "#total-cart-top", ".cart__total-container span:nth-of-type(2)", _0x42afba(173)], _0x39cba0 = await window["weNexusCartApi"][_0x42afba(191)](), _0x11dcf6 = (_0x4b3d57 = 0) => {
        const _0x262634 = _0x42afba;
        _0x239f84[_0x262634(161)]((_0x32fd34) => {
          const _0x2e07cc = _0x262634, _0x9681e3 = (_0x30a243) => {
            const _0x393bf2 = _0x1f02;
            console[_0x393bf2(211)](this[_0x393bf2(194)](_0x30a243[_0x393bf2(206)]));
            if (_0x30a243 && this[_0x393bf2(163)](_0x30a243[_0x393bf2(206)])) {
              if (_0x30a243[_0x393bf2(165)] === _0x393bf2(196) && window["Shopify"][_0x393bf2(212)][_0x393bf2(186)] === _0x393bf2(201)) {
                const _0x560052 = this[_0x393bf2(216)](Number(_0x39cba0[_0x393bf2(190)] / 100 + _0x4b3d57), _0x39cba0["currency"]);
                _0x30a243["innerHTML"] = _0x393bf2(168) + _0x560052 + _0x393bf2(210);
                return;
              }
              const _0x44c505 = _0x30a243[_0x393bf2(206)];
              if (this["doesSelectorContainCheckoutWord"](_0x44c505)) {
                console["log"](_0x44c505), _0x30a243[_0x393bf2(206)] = _0x393bf2(167) + this[_0x393bf2(216)](Number(_0x39cba0["total_price"] / 100 + _0x4b3d57), _0x39cba0[_0x393bf2(174)]) + " " + _0x39cba0[_0x393bf2(174)];
                return;
              }
              _0x30a243[_0x393bf2(206)] = this[_0x393bf2(216)](Number(_0x39cba0[_0x393bf2(190)] / 100 + _0x4b3d57), _0x39cba0[_0x393bf2(174)]) + " " + _0x39cba0["currency"];
              return;
            }
          };
          let _0x4d1b6f = document[_0x2e07cc(205)](_0x32fd34);
          _0x4d1b6f[_0x2e07cc(161)]((_0x2499bc) => {
            _0x9681e3(_0x2499bc);
          });
        });
      };
      setTimeout(() => {
        const _0x389598 = _0x42afba, _0x358908 = this[_0x389598(177)](), _0x4496a3 = localStorage[_0x389598(172)]("package-protection-enabled");
        let _0x567a7e = "";
        _0x4496a3 === _0x389598(204) ? (_0x567a7e = this[_0x389598(178)], _0x11dcf6(_0x358908), _0x11dcf6(_0x358908)) : (_0x567a7e = this[_0x389598(181)], _0x11dcf6(), _0x11dcf6());
        const _0x2b0488 = document["getElementsByClassName"](_0x389598(189));
        Array[_0x389598(176)](_0x2b0488)[_0x389598(161)]((_0x4fa7d2) => _0x4fa7d2[_0x389598(182)] = _0x567a7e + " ");
      }, 500);
    }
    [_0x46aee8(175)]() {
      const _0x462701 = _0x46aee8;
      window[_0x462701(171)][_0x462701(169)]();
    }
  }
  const _0xb3383b = _0xe0f8;
  function _0xe0f8(_0x558263, _0x3ad5f5) {
    const _0x5230a2 = _0x5230();
    return _0xe0f8 = function(_0xe0f81e, _0x2f3c35) {
      _0xe0f81e = _0xe0f81e - 202;
      let _0x41fcfc = _0x5230a2[_0xe0f81e];
      return _0x41fcfc;
    }, _0xe0f8(_0x558263, _0x3ad5f5);
  }
  (function(_0x490183, _0x417bee) {
    const _0x31632c = _0xe0f8, _0x12afe2 = _0x490183();
    while (!![]) {
      try {
        const _0xc1f8 = -parseInt(_0x31632c(259)) / 1 + -parseInt(_0x31632c(209)) / 2 + -parseInt(_0x31632c(239)) / 3 + parseInt(_0x31632c(235)) / 4 + -parseInt(_0x31632c(203)) / 5 * (parseInt(_0x31632c(233)) / 6) + -parseInt(_0x31632c(212)) / 7 * (parseInt(_0x31632c(225)) / 8) + parseInt(_0x31632c(204)) / 9;
        if (_0xc1f8 === _0x417bee)
          break;
        else
          _0x12afe2["push"](_0x12afe2["shift"]());
      } catch (_0x91e55d) {
        _0x12afe2["push"](_0x12afe2["shift"]());
      }
    }
  })(_0x5230, 389675);
  function _0x5230() {
    const _0x23fea4 = ["weNexusCartApi", "getStyleMarkup", "replace", "true", "getAttribute", "textContent", ".cart-buttons", "enabledDescription", "nodeType", "#2c7e3f", "50VrRLkt", "18766197QSwezD", "refreshWidget", "childNodes", "[name='checkout']", "getInsertionPointSelectors", "813932CaKNNz", "querySelector", "div.ajax-cart__summary-wrapper.js-cart-summary", "427eTtFqc", ".cart-total-price", "wenexus-package-protection-description", "setItem", ".cart__footer", "reload", "disabledDescription", "get", "thumbnail", "setAttribute", "location", "end", "after", "42384ohqKJp", "INPUT", "div.cart__blocks cart-note", "product-variant__input", "aside", ".cart_notification_links_inner", "getWidgetPrice", "add", "148098VvmLqQ", "innerHTML", "2013320eTZZFd", '.wenexus-package-protection__toggle input[type="checkbox"]', "log", "getElementsByClassName", "1867743tlhfXg", "shouldUse", "getItem", "Space theme", "querySelectorAll", "div.border--b-width.w-full.p-4.color__bg-tertiary.color__tertiary.color__border-divider-1", "before", "TEXT_NODE", "value", "tagName", ".cart-drawer-subtotal__main-content", "forEach", "items_subtotal_price", "unset", "cartUpdate", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753", "from", "ELEMENT_NODE", "classList", "display", "599233wkEVGf", "node element is input"];
    _0x5230 = function() {
      return _0x23fea4;
    };
    return _0x5230();
  }
  class PackageProtectionClientBrickSpaceTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, _q, _0xb3383b(254));
    }
    static [(_q = _0xb3383b(220), _0xb3383b(240))]() {
      return checkTheme(brickSpaceLabTheme);
    }
    [_0xb3383b(208)]() {
      const _0x548f0d = _0xb3383b;
      return [{ "selector": _0x548f0d(207), "insertPosition": _0x548f0d(245) }, { "selector": _0x548f0d(227), "insertPosition": _0x548f0d(224) }, { "selector": _0x548f0d(267), "insertPosition": "before" }];
    }
    async [_0xb3383b(262)](_0x546426) {
      const _0x2fb0c7 = _0xb3383b;
      return super[_0x2fb0c7(262)]({ "imageWidth": 66, "containerMargin": [10, 0, 12, 0], "containerJustify": _0x2fb0c7(223), "titleFontSize": 1, "descriptionFontSize": 0.8, "hideDescriptionPage": ![], "descriptionMargin": [2, 0, 0, 0], "containerMaxWidth": "250px", ..._0x546426, "accentColor": _0x2fb0c7(202) });
    }
    async [_0xb3383b(205)]() {
      const _0x2f8a63 = _0xb3383b;
      console[_0x2f8a63(237)](_0x2f8a63(242));
      const _0x4f582d = [".cart-details-footer", _0x2f8a63(249), _0x2f8a63(244), 'button[name="checkout"]', _0x2f8a63(229), 'input[name="checkout"]', _0x2f8a63(213), _0x2f8a63(216), _0x2f8a63(230)], _0x1ec3c6 = await window[_0x2f8a63(261)][_0x2f8a63(219)](), _0x129a31 = document[_0x2f8a63(210)](_0x2f8a63(236));
      if (_0x129a31)
        _0x129a31[_0x2f8a63(257)][_0x2f8a63(232)](_0x2f8a63(228));
      const _0x33056b = () => {
        const _0x43a64d = _0x2f8a63, _0x483518 = document["querySelector"](_0x43a64d(211));
        if (_0x483518)
          _0x483518["style"][_0x43a64d(258)] = _0x43a64d(252);
      };
      _0x33056b();
      const _0x21d3f2 = (_0x8e9762 = 0) => {
        const _0x1d7b37 = _0x2f8a63;
        _0x4f582d[_0x1d7b37(250)]((_0x4911d5) => {
          const _0x25e23c = _0x1d7b37;
          let _0x1f7618 = document[_0x25e23c(243)](_0x4911d5);
          function _0x509ca7(_0x5540df) {
            const _0x20d7ae = _0x25e23c, _0x349bf5 = Number(_0x1ec3c6["items_subtotal_price"] / 100)["toFixed"](2), _0x5618f6 = Number(_0x1ec3c6["items_subtotal_price"] / 100 + _0x8e9762)["toFixed"](2), _0x375c44 = () => {
              const _0x781538 = _0xe0f8;
              console["log"](_0x781538(260));
              if (_0x8e9762 === 0) {
                const _0x9f0db8 = localStorage[_0x781538(241)](_0x781538(251)), _0x12e51e = _0x5540df[_0x781538(265)](_0x781538(247));
                if (!_0x12e51e)
                  return;
                const _0x441880 = _0x12e51e["replace"](new RegExp("\\b" + _0x9f0db8 + "\\b", "g"), _0x5618f6);
                _0x5540df[_0x781538(221)](_0x781538(247), _0x441880);
              } else {
                localStorage[_0x781538(215)](_0x781538(251), _0x5618f6);
                const _0x4e9154 = _0x5540df[_0x781538(265)](_0x781538(247));
                if (!_0x4e9154)
                  return;
                const _0x499c75 = _0x4e9154[_0x781538(263)](new RegExp("\\b" + _0x349bf5 + "\\b", "g"), _0x5618f6);
                _0x5540df["setAttribute"](_0x781538(247), _0x499c75);
              }
            };
            if (_0x5540df[_0x20d7ae(248)] === _0x20d7ae(226)) {
              _0x375c44();
              return;
            }
            if ((_0x5540df == null ? void 0 : _0x5540df[_0x20d7ae(269)]) === (Node == null ? void 0 : Node[_0x20d7ae(246)])) {
              if (_0x8e9762 === 0) {
                const _0xd914fb = localStorage["getItem"](_0x20d7ae(251));
                _0x5540df["textContent"] = _0x5540df["textContent"][_0x20d7ae(263)](new RegExp("\\b" + _0xd914fb + "\\b", "g"), _0x5618f6);
              } else
                localStorage[_0x20d7ae(215)](_0x20d7ae(251), _0x5618f6), _0x5540df[_0x20d7ae(266)] = _0x5540df[_0x20d7ae(266)][_0x20d7ae(263)](new RegExp("\\b" + _0x349bf5 + "\\b", "g"), _0x5618f6);
            } else
              (_0x5540df == null ? void 0 : _0x5540df[_0x20d7ae(269)]) === (Node == null ? void 0 : Node[_0x20d7ae(256)]) && Array[_0x20d7ae(255)](_0x5540df[_0x20d7ae(206)])[_0x20d7ae(250)](_0x509ca7);
          }
          _0x1f7618["forEach"]((_0x45a97d) => {
            _0x509ca7(_0x45a97d);
          });
        });
      };
      setTimeout(() => {
        const _0x2aae44 = _0x2f8a63, _0x35744c = this[_0x2aae44(231)](), _0x1810d1 = localStorage[_0x2aae44(241)]("package-protection-enabled");
        let _0x158edd = "";
        _0x1810d1 === _0x2aae44(264) ? (_0x158edd = this[_0x2aae44(268)], _0x21d3f2(_0x35744c), _0x21d3f2(_0x35744c)) : (_0x158edd = this[_0x2aae44(218)], _0x21d3f2(), _0x21d3f2());
        const _0x318e87 = document[_0x2aae44(238)](_0x2aae44(214));
        Array[_0x2aae44(255)](_0x318e87)[_0x2aae44(250)]((_0x47c1e8) => _0x47c1e8[_0x2aae44(234)] = _0x158edd + " ");
      }, 500);
    }
    [_0xb3383b(253)]() {
      const _0x81b707 = _0xb3383b;
      window[_0x81b707(222)][_0x81b707(217)]();
    }
  }
  const _0x1a52e6 = _0xbcaf;
  (function(_0x27b61c, _0x4ff845) {
    const _0x485780 = _0xbcaf, _0xa7a104 = _0x27b61c();
    while (!![]) {
      try {
        const _0x5c0c1c = -parseInt(_0x485780(320)) / 1 + -parseInt(_0x485780(305)) / 2 * (-parseInt(_0x485780(355)) / 3) + -parseInt(_0x485780(373)) / 4 * (-parseInt(_0x485780(413)) / 5) + -parseInt(_0x485780(417)) / 6 * (parseInt(_0x485780(353)) / 7) + parseInt(_0x485780(313)) / 8 + parseInt(_0x485780(324)) / 9 + -parseInt(_0x485780(375)) / 10;
        if (_0x5c0c1c === _0x4ff845)
          break;
        else
          _0xa7a104["push"](_0xa7a104["shift"]());
      } catch (_0x178f7a) {
        _0xa7a104["push"](_0xa7a104["shift"]());
      }
    }
  })(_0x1e0b, 948231);
  function _0x1e0b() {
    const _0x502b36 = ["refreshWidget", "setItem", "switchColor", "complete", "reduce", "toLowerCase", "setVariants", "remove", "weNexusCartApi", "href", "enabled", "performance", "disabled", "click", "some", "sku", "items", "PERCENTAGE", "318820BKmgjS", ".wenexus-package-protection", "disabledDescription", "forEach", "2856KJstlb", "title", "key", "wenexus-shipping-protection", "boundaryParents", "false", "cartMaxPrice", "interactive", "productVariants", "keydown", "protectionFees", "css", "none", "excludedPackageProtectionVariants", "34vZdoPl", "#52c939", "readystatechange", "BASED_ON_CART_VALUE", "packageProtectionProductAndVariants", "addListener", 'button[name="checkout"]', "every", "7857792bpUXmW", "checked", "beforebegin", "/checkout", "FIXED_PRICE", "cartUpdate", "package-protection-enabled", "643772AswfAG", "filter", "afterbegin", "refreshPriceUI", "12517821ksGojq", "insertPosition", "selector", "push", "replaceWith", "Enter", "location", "from", "percentage", "beforeend", "head", "disabledCheckoutButton", "variant_id", "theme_store_id", "FIXED_MULTIPLE", "find", "shouldUse", "pageshow", "flat", "enabledDescription", "toString", "cartMinPrice", "price", "replace", "undefined", "querySelectorAll", "Debutify", "display", "getInsertionPointSelectors", "749rvNyoc", "theme", "208254tkmFSS", "function", "fixedMultiplePlan", "insurancePriceType", "WeNexusQuerySelectorLive", "gid://shopify/ProductVariant/", "inside", "submit", "addEventListener", "cssSelector", "length", "change", "afterend", "map", "reload", "insertAdjacentElement", "preventDefault", "add", "32kGYUQh", "WeNexusShipGuardPackageProtectionSettings", "24203760UbVAoH", "navigation", "position", "true", "persisted", "before", "FIXED", "includes", "style", "enabledCheckoutButton", "Powerhouse-theme", "schema_name", "Shopify", "defaultSetting", "readyState", "No package protection client found", "getItem", "error", "insuranceDisplayButton", "pop"];
    _0x1e0b = function() {
      return _0x502b36;
    };
    return _0x1e0b();
  }
  function _0xbcaf(_0xdf9eb2, _0x33eecb) {
    const _0x1e0b7c = _0x1e0b();
    return _0xbcaf = function(_0xbcaf84, _0x43fadd) {
      _0xbcaf84 = _0xbcaf84 - 292;
      let _0x271d27 = _0x1e0b7c[_0xbcaf84];
      return _0x271d27;
    }, _0xbcaf(_0xdf9eb2, _0x33eecb);
  }
  async function packageProtection() {
    var _a2, _b2, _c2, _d2;
    const _0xc6408f = _0xbcaf, _0x1ce545 = window[_0xc6408f(374)], _0x2f5073 = [PackageProtectionClientShopifyFreeTheme, PackageProtectionClientEnterpriseTheme, PackageProtectionClientUniversalTheme, PackageProtectionClientUniversalForSubTotalTheme, PackageProtectionClientSwitchTheme, PackageProtectionClientUniversalExponentSubtotalTheme, PackageProtectionClientKingdomTheme, PackageProtectionClientToyoTheme, PackageProtectionClientBrickSpaceTheme, PackageProtectionClientBasic], _0x1e798c = _0x2f5073[_0xc6408f(339)]((_0x36d549) => {
      const _0x5472ff = _0xc6408f;
      if (_0x36d549["shouldUse"])
        return _0x36d549[_0x5472ff(340)]();
      return !![];
    });
    if (!_0x1e798c)
      return console[_0xc6408f(392)](_0xc6408f(390));
    const _0x260d3b = async () => (await window[_0xc6408f(403)]["get"]())[_0xc6408f(411)];
    let _0x40687a = await _0x260d3b();
    const _0x49d01c = (_b2 = (_a2 = window[_0xc6408f(374)]) == null ? void 0 : _a2[_0xc6408f(309)]) == null ? void 0 : _b2["map"]((_0x4e8d06) => {
      const _0x5b8d68 = _0xc6408f;
      return _0x4e8d06[_0x5b8d68(304)][_0x5b8d68(368)]((_0x50dff6) => Number(_0x50dff6["id"][_0x5b8d68(347)](_0x5b8d68(360), "")));
    })[_0xc6408f(342)](), _0x3d9ec5 = async () => {
      const _0x491c36 = _0xc6408f, _0xce8bce = await _0x260d3b(), _0x1daba0 = [];
      for (let _0x3f89ef = 0; _0x3f89ef < _0xce8bce[_0x491c36(365)]; _0x3f89ef++) {
        const _0x159a6b = _0xce8bce[_0x3f89ef][_0x491c36(336)];
        !(_0x49d01c == null ? void 0 : _0x49d01c["includes"](_0x159a6b)) && (_0xce8bce[_0x3f89ef][_0x491c36(410)] !== "wenexus-shipping-protection" && _0x1daba0[_0x491c36(327)](_0xce8bce[_0x3f89ef]));
      }
      return _0x1daba0;
    }, _0x50d10f = (_0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(393)]) ?? ![], _0x24fc9d = () => {
      const _0x23aa01 = _0xc6408f, _0x1dc7f6 = localStorage[_0x23aa01(391)](_0x23aa01(319));
      if (_0x1dc7f6 === _0x23aa01(296))
        return ![];
      if (_0x1dc7f6 === _0x23aa01(378))
        return !![];
      if (_0x1dc7f6 === null)
        return localStorage[_0x23aa01(396)]("package-protection-enabled", _0x50d10f[_0x23aa01(344)]()), _0x50d10f;
      return _0x1dc7f6 === _0x23aa01(378);
    }, _0x517ecb = new PackageProtectionApi(Number(_0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(332)]), _0x24fc9d()), _0x1a3c9d = new _0x1e798c(_0x517ecb);
    let _0x591d3d = [];
    !(_0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(388)]) ? _0x591d3d = ((_c2 = _0x1a3c9d[_0xc6408f(352)]) == null ? void 0 : _c2.call(_0x1a3c9d, (_0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(377)][_0xc6408f(400)]()) ?? "before", _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(364)])) || [] : _0x591d3d = ((_d2 = _0x1a3c9d[_0xc6408f(352)]) == null ? void 0 : _d2.call(_0x1a3c9d, _0xc6408f(380))) || [];
    const _0x8e6a3a = _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(357)], _0x30014a = _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(299)], _0x237d77 = _0x8e6a3a == null ? void 0 : _0x8e6a3a["map"]((_0x121ec8) => {
      const _0x5707c4 = _0xc6408f, _0xf17652 = _0x30014a == null ? void 0 : _0x30014a[_0x5707c4(339)]((_0x3e5c2e) => Number(_0x3e5c2e[_0x5707c4(346)]) === Number(_0x121ec8[_0x5707c4(301)]));
      if (_0xf17652)
        return { "max": Number(_0x121ec8[_0x5707c4(297)]), "min": Number(_0x121ec8[_0x5707c4(345)]), "variantId": Number(_0xf17652["id"]), "price": Number(_0xf17652[_0x5707c4(346)]) };
      return null;
    })[_0xc6408f(321)]((_0x329d85) => _0x329d85 !== null);
    if ((_0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(358)]) === _0xc6408f(338))
      _0x517ecb[_0xc6408f(401)](PackageProtectionType[_0xc6408f(308)], _0x237d77);
    else {
      if ((_0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(358)]) === _0xc6408f(317)) {
        const _0x751e00 = _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(299)][0];
        _0x517ecb[_0xc6408f(401)](PackageProtectionType[_0xc6408f(381)], { "price": Number(_0x751e00[_0xc6408f(346)]), "variantId": Number(_0x751e00["id"]) });
      } else
        (_0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(358)]) === _0xc6408f(412) && _0x517ecb["setVariants"](PackageProtectionType[_0xc6408f(412)], _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(299)][_0xc6408f(399)]((_0x49b2fe, _0x55c8ba) => {
          const _0x42ffdc = _0xc6408f;
          return _0x49b2fe[_0x55c8ba[_0x42ffdc(346)]] = Number(_0x55c8ba["id"]), _0x49b2fe;
        }, {}));
    }
    _0x1a3c9d["thumbnail"] = _0x1ce545 == null ? void 0 : _0x1ce545["iconUrl"], _0x1a3c9d[_0xc6408f(292)] = _0x1ce545 == null ? void 0 : _0x1ce545["title"], _0x1a3c9d[_0xc6408f(343)] = _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(343)], _0x1a3c9d["disabledDescription"] = _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(415)], _0x1a3c9d["buttonColor"] = _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(397)], _0x1a3c9d[_0xc6408f(302)] = _0x1ce545 == null ? void 0 : _0x1ce545[_0xc6408f(302)], _0x1a3c9d["infoPageLink"] = _0x1ce545 == null ? void 0 : _0x1ce545["policyUrl"], _0x1a3c9d["checked"] = _0x24fc9d();
    typeof _0x1a3c9d["getStyleMarkup"] === _0xc6408f(356) && document[_0xc6408f(334)]["insertAdjacentHTML"](_0xc6408f(333), await _0x1a3c9d["getStyleMarkup"]({ "accentColor": _0xc6408f(306), "imageWidth": 48 }));
    const _0x28acf2 = () => {
      const _0x44ae52 = _0xc6408f;
      window[_0x44ae52(363)](_0x44ae52(341), function(_0x4b677d) {
        const _0x58a01f = _0x44ae52;
        var _0x4c40ea = _0x4b677d[_0x58a01f(379)] || typeof window[_0x58a01f(406)] != _0x58a01f(348) && window[_0x58a01f(406)][_0x58a01f(376)]["type"] === 2;
        _0x4c40ea && window["location"][_0x58a01f(369)]();
      });
    }, _0x3ef218 = new window[_0xc6408f(359)]("form[action$='/cart']");
    _0x3ef218[_0xc6408f(310)](async (_0x20f08a) => {
      const _0x44cf12 = _0xc6408f;
      _0x1a3c9d["cartBubble"](), _0x1a3c9d[_0x44cf12(395)]();
      const _0x2192ec = await _0x3d9ec5();
      let _0x1a861b = ![];
      Array["from"](_0x20f08a)[_0x44cf12(416)]((_0x352bd2) => {
        const _0xf039a0 = _0x44cf12;
        _0x352bd2[_0xf039a0(363)](_0xf039a0(300), (_0x520f07) => {
          const _0x528b1e = _0xf039a0;
          _0x520f07[_0x528b1e(293)] === _0x528b1e(329) && _0x520f07[_0x528b1e(371)]();
        });
        const _0x541338 = document[_0xf039a0(349)]('button[name="checkout"][type="submit"]'), _0x42dbbe = window[_0xf039a0(387)][_0xf039a0(354)][_0xf039a0(386)];
        (_0x42dbbe === _0xf039a0(350) || _0x42dbbe === _0xf039a0(385)) && _0x541338[_0xf039a0(416)]((_0x1f6e85) => {
          const _0x3b1b15 = _0xf039a0;
          _0x1f6e85[_0x3b1b15(363)](_0x3b1b15(408), async (_0x1ea725) => {
            const _0x59ca87 = _0x3b1b15;
            if (_0x1a861b)
              return;
            _0x1ea725[_0x59ca87(371)](), _0x1a3c9d["disabledCheckoutButton"](), _0x1a861b = !![], _0x24fc9d() && _0x2192ec["length"] > 0 ? await _0x517ecb[_0x59ca87(372)]() : await _0x517ecb["remove"](), setTimeout(() => {
              const _0x145bcf = _0x59ca87;
              _0x28acf2(), window[_0x145bcf(330)]["href"] = "/checkout";
            }, 1e3);
          });
        }), _0x352bd2[_0xf039a0(363)](_0xf039a0(362), async (_0x5188e2) => {
          const _0x51f32a = _0xf039a0;
          if (_0x1a861b)
            return;
          _0x5188e2[_0x51f32a(371)](), _0x1a3c9d[_0x51f32a(335)](), _0x1a861b = !![], _0x24fc9d() && _0x2192ec[_0x51f32a(365)] > 0 ? await _0x517ecb["add"]() : await _0x517ecb[_0x51f32a(402)](), _0x28acf2(), window[_0x51f32a(330)][_0x51f32a(404)] = _0x51f32a(316);
        });
      });
    }), window["weNexusCartApi"][_0xc6408f(310)](async (_0x59d8b4, _0x5d80f6, _0x413ae4) => {
      const _0x547af3 = _0xc6408f;
      _0x1a3c9d["disabledCheckoutButton"](), await _0x413ae4(), await _0x1a3c9d[_0x547af3(323)](), await _0x1a3c9d[_0x547af3(395)](), _0x1a3c9d[_0x547af3(384)]();
      const _0x58cfe2 = await _0x260d3b();
      setTimeout(() => {
        const _0x49d9ef = _0x547af3;
        if (_0x58cfe2[_0x49d9ef(365)] > 0 && (_0x1ce545 == null ? void 0 : _0x1ce545[_0x49d9ef(309)][_0x49d9ef(365)]) > 0 && window["Shopify"][_0x49d9ef(354)][_0x49d9ef(337)] === 887) {
          const _0x5a9627 = _0x1ce545 == null ? void 0 : _0x1ce545[_0x49d9ef(309)][_0x49d9ef(368)]((_0x1a4df2) => _0x1a4df2[_0x49d9ef(304)][_0x49d9ef(368)]((_0x206bed) => Number(_0x206bed["id"]["split"]("/")[_0x49d9ef(394)]()))), _0x4166ba = _0x58cfe2[_0x49d9ef(312)]((_0x22a8fc) => _0x5a9627[_0x49d9ef(409)]((_0x51f370) => _0x51f370[_0x49d9ef(382)](_0x22a8fc["id"])));
          _0x4166ba && Array[_0x49d9ef(331)](document[_0x49d9ef(349)](_0x49d9ef(414)))["forEach"]((_0x1bb7f0) => _0x1bb7f0[_0x49d9ef(383)][_0x49d9ef(351)] = _0x49d9ef(303));
        }
      }, 100);
    }, !![]);
    for (const _0x1c5646 of _0x591d3d) {
      if (_0x1c5646[_0xc6408f(340)] && !_0x1c5646["shouldUse"]())
        continue;
      const _0x43dda2 = new window[_0xc6408f(359)](_0x1c5646[_0xc6408f(326)], _0x1c5646[_0xc6408f(295)]);
      _0x43dda2[_0xc6408f(310)](async (_0x484d52) => {
        const _0x334da9 = _0xc6408f;
        _0x40687a = await _0x260d3b(), _0x1a3c9d[_0x334da9(395)]();
        const _0x297096 = await _0x40687a[_0x334da9(339)]((_0x523827) => _0x523827[_0x334da9(410)] === _0x334da9(294));
        (_0x297096 == null ? void 0 : _0x297096[_0x334da9(410)]) && (await _0x517ecb["remove"](), _0x1a3c9d[_0x334da9(318)]());
        _0x28acf2();
        const _0x4f9174 = await _0x3d9ec5();
        for (const _0x41cdb2 of _0x484d52) {
          let _0x5ecb6e = ![];
          const { container: _0x11b729, checkbox: _0x183737 } = await _0x1a3c9d["getCheckboxContainer"](_0x1c5646, _0x4f9174[_0x334da9(365)] > 0 ? _0x24fc9d() : ![]);
          if (_0x4f9174[_0x334da9(365)] == 0 && _0x5ecb6e && window["Shopify"][_0x334da9(354)][_0x334da9(337)] === 887)
            ;
          else {
            _0x5ecb6e = !![];
            switch (_0x1c5646[_0x334da9(325)]) {
              case _0x334da9(380):
                _0x41cdb2[_0x334da9(370)](_0x334da9(315), _0x11b729);
                break;
              case "after":
                _0x41cdb2[_0x334da9(370)](_0x334da9(367), _0x11b729);
                break;
              case _0x334da9(361):
                _0x41cdb2["insertAdjacentElement"](_0x334da9(322), _0x11b729);
                break;
              case "replace":
                _0x41cdb2[_0x334da9(328)](_0x11b729);
                break;
            }
            _0x183737[_0x334da9(363)](_0x334da9(366), async () => {
              const _0x2955f3 = _0x334da9;
              localStorage[_0x2955f3(396)](_0x2955f3(319), _0x183737[_0x2955f3(314)][_0x2955f3(344)]()), _0x517ecb[_0x2955f3(405)] = _0x24fc9d(), _0x183737[_0x2955f3(407)] = !![];
              const _0x56c10e = document[_0x2955f3(349)](_0x2955f3(311));
              _0x56c10e[_0x2955f3(416)]((_0x4ab598) => _0x4ab598["disabled"] = !![]), _0x1a3c9d[_0x2955f3(395)](), _0x183737[_0x2955f3(407)] = ![], _0x56c10e[_0x2955f3(416)]((_0x170ac2) => _0x170ac2["disabled"] = ![]);
            });
          }
        }
      });
    }
  }
  document["readyState"] !== _0x1a52e6(398) ? document[_0x1a52e6(363)](_0x1a52e6(307), () => {
    const _0x5788df = _0x1a52e6;
    (document[_0x5788df(389)] === _0x5788df(298) || document[_0x5788df(389)] === "complete") && packageProtection();
  }) : packageProtection();
})();
 })();