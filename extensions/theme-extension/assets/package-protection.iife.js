var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function() {
  "use strict";
  var PackageProtectionType = /* @__PURE__ */ ((PackageProtectionType2) => {
    PackageProtectionType2["BASED_ON_CART_VALUE"] = "BASED_ON_CART_VALUE";
    PackageProtectionType2["PERCENTAGE"] = "PERCENTAGE";
    PackageProtectionType2["FIXED"] = "FIXED";
    return PackageProtectionType2;
  })(PackageProtectionType || {});
  const _PackageProtectionApi = class _PackageProtectionApi {
    constructor(percentage, enabled) {
      __publicField(this, "basedOnCartValueVariants", []);
      __publicField(this, "percentageVariants", {});
      __publicField(this, "fixedVariantOption", null);
      __publicField(this, "_type", "PERCENTAGE");
      __publicField(this, "variantIds", /* @__PURE__ */ new Set());
      __publicField(this, "prices", []);
      this.percentage = percentage;
      this.enabled = enabled;
      if (_PackageProtectionApi.instance) {
        _PackageProtectionApi.instance = this;
      }
      return _PackageProtectionApi.instance;
    }
    get highestPrice() {
      return this.prices[this.prices.length - 1];
    }
    get lowestPrice() {
      return this.prices[0];
    }
    setVariants(_type, variants) {
      this._type = _type;
      this.prices.length = 0;
      this.variantIds.clear();
      if (_type === "PERCENTAGE") {
        for (const key of Object.keys(this.percentageVariants)) {
          delete this.percentageVariants[key];
        }
        this.prices.push(
          ...Object.keys(variants).map(Number).sort((a, b) => a - b)
        );
        for (const key of Object.keys(variants)) {
          this.percentageVariants[key] = variants[key];
          this.variantIds.add(variants[key]);
        }
      } else if (_type === "FIXED") {
        this.variantIds.add(variants.variantId);
        this.fixedVariantOption = variants;
        this.prices.push(variants.price);
      } else {
        this.basedOnCartValueVariants.push(
          ...variants
        );
        this.basedOnCartValueVariants.forEach(
          (variant) => this.variantIds.add(variant.variantId)
        );
        this.prices.push(
          ...this.basedOnCartValueVariants.map((variant) => variant.price).sort((a, b) => a - b)
        );
      }
    }
    async getNonPackageProtectionItems() {
      const cart = await window.weNexusCartApi.get();
      return cart.items.filter((item) => !this.variantIds.has(item.variant_id));
    }
    async getPackageProtectionItems() {
      const cart = await window.weNexusCartApi.get();
      return cart.items.filter((item) => this.variantIds.has(item.variant_id));
    }
    async calculate() {
      const allVariants = await this.getNonPackageProtectionItems();
      const excludeVariants = window.WeNexusShipGuardPackageProtectionSettings.packageProtectionProductAndVariants.map((product) => {
        return product.excludedPackageProtectionVariants.map(
          (variant2) => Number(variant2.id.replace("gid://shopify/ProductVariant/", ""))
        );
      }).flat();
      const checkExcludeVariants = () => {
        const result = [];
        for (let i = 0; i < allVariants.length; i++) {
          const variantId = allVariants[i].variant_id;
          if (!excludeVariants.includes(variantId)) {
            result.push(allVariants[i]);
          }
        }
        return result;
      };
      const variants = checkExcludeVariants();
      const forPrice = variants.reduce((acc, item) => acc + item.final_line_price, 0) / 100;
      if (this._type === "FIXED") {
        if (this.fixedVariantOption === null) {
          throw new Error("No variant has been set");
        }
        return {
          actualPrice: this.fixedVariantOption.price,
          variantId: this.fixedVariantOption.variantId,
          coercedPrice: this.fixedVariantOption.price.toFixed(2),
          forPrice
        };
      }
      if (this._type === "PERCENTAGE") {
        if (this.prices.length === 0) {
          throw new Error("No variants have been set");
        }
        let coercedPrice = this.lowestPrice.toFixed(2);
        let actualPrice = forPrice / 100 * this.percentage;
        if (actualPrice <= this.highestPrice && actualPrice >= this.lowestPrice) {
          for (const price of this.prices) {
            if (price > actualPrice) {
              coercedPrice = price.toFixed(2);
              break;
            }
          }
        } else if (actualPrice > this.highestPrice) {
          coercedPrice = this.highestPrice.toFixed(2);
        } else if (actualPrice < this.lowestPrice) {
          coercedPrice = this.lowestPrice.toFixed(2);
        }
        return {
          actualPrice: Number(actualPrice.toFixed(2)),
          variantId: this.percentageVariants[coercedPrice],
          coercedPrice,
          forPrice
        };
      }
      if (this.basedOnCartValueVariants.length === 0) {
        throw new Error("No variants have been set");
      }
      const cartValue = forPrice;
      const variant = this.basedOnCartValueVariants.find(
        (variant2) => cartValue >= variant2.min && cartValue <= variant2.max
      );
      if (!variant) {
        throw new Error("No variant found");
      }
      return {
        actualPrice: variant.price,
        variantId: variant.variantId,
        coercedPrice: variant.price.toFixed(2),
        forPrice
      };
    }
    async add() {
      const items = await this.getPackageProtectionItems();
      if (items.length > 0) {
        return;
      }
      const { variantId } = await this.calculate();
      const cart = await window.weNexusCartApi.append(
        [
          {
            id: variantId,
            quantity: 1
          }
        ],
        false
      );
      return cart.items.find((item) => item.variant_id === variantId);
    }
    async remove() {
      if (this.prices.length === 0) {
        throw new Error("No variants have been set");
      }
      const items = await this.getPackageProtectionItems();
      if (items.length === 0) {
        return;
      }
      await window.weNexusCartApi.remove(
        items.map((i) => i.variant_id),
        false
      );
      return items[0];
    }
  };
  __publicField(_PackageProtectionApi, "instance");
  let PackageProtectionApi = _PackageProtectionApi;
  const freeThemes = [
    {
      name: "Dawn",
      attributes: {
        theme_store_id: 887,
        schema_name: "Dawn"
      }
    },
    {
      name: "Trade",
      attributes: {
        theme_store_id: 2699,
        schema_name: "Trade"
      }
    },
    {
      name: "Colorblock",
      attributes: {
        theme_store_id: 1499,
        schema_name: "Colorblock"
      }
    },
    {
      name: "Crave",
      attributes: {
        theme_store_id: 1363,
        schema_name: "Crave"
      }
    },
    {
      name: "Taste",
      attributes: {
        theme_store_id: 1434,
        schema_name: "Taste"
      }
    },
    {
      name: "Publisher",
      attributes: {
        theme_store_id: 1864,
        schema_name: "Publisher"
      }
    },
    {
      name: "Ride",
      attributes: {
        theme_store_id: 1500,
        schema_name: "Ride"
      }
    },
    {
      name: "Studio",
      attributes: {
        theme_store_id: 1431,
        schema_name: "Studio"
      }
    },
    {
      name: "Origin",
      attributes: {
        theme_store_id: 1841,
        schema_name: "Origin"
      }
    },
    {
      name: "Sense",
      attributes: {
        theme_store_id: 1356,
        schema_name: "Sense"
      }
    },
    {
      name: "Refresh",
      attributes: {
        theme_store_id: 1567,
        schema_name: "Refresh"
      }
    },
    {
      name: "Craft",
      attributes: {
        theme_store_id: 1368,
        schema_name: "Craft"
      }
    },
    {
      name: "Spotlight",
      attributes: {
        theme_store_id: 1891,
        schema_name: "Spotlight"
      }
    },
    {
      // maybe, NEED CUSTOM SUPPORT
      name: "Be Yours",
      attributes: {
        theme_store_id: 1399,
        schema_name: "Be Yours"
      }
    },
    {
      name: "Murmel",
      attributes: {
        theme_store_id: 2512,
        schema_name: "Murmel"
      }
    },
    {
      name: "Sydney",
      attributes: {
        theme_store_id: 2117,
        schema_name: "Sydney"
      }
    }
  ];
  const enterpriseTheme = [
    {
      name: "Enterprise",
      attributes: {
        theme_store_id: 1657,
        schema_name: "Enterprise"
      }
    }
  ];
  const kingdomTheme = [
    {
      name: "Kingdom",
      attributes: {
        theme_store_id: 725,
        schema_name: "Kingdom"
      }
    },
    {
      name: "Andaman",
      attributes: {
        theme_store_id: 1390,
        schema_name: "Andaman"
      }
    }
  ];
  const toyoTheme = [
    {
      name: "Focal",
      attributes: {
        theme_store_id: 714,
        schema_name: "Focal"
      }
    },
    {
      name: "Grid",
      attributes: {
        theme_store_id: 718,
        schema_name: "Grid"
      }
    },
    {
      name: "Atom",
      attributes: {
        theme_store_id: 1974,
        schema_name: "Atom"
      }
    },
    {
      name: "Avenue",
      attributes: {
        theme_store_id: 865,
        schema_name: "Avenue"
      }
    }
  ];
  const universalTheme = [
    {
      name: "Ascent",
      attributes: {
        theme_store_id: 2989,
        schema_name: "Ascent"
      }
    },
    {
      name: "Aurora",
      attributes: {
        theme_store_id: 1770,
        schema_name: "Aurora"
      }
    },
    {
      name: "Alchemy",
      attributes: {
        theme_store_id: 657,
        schema_name: "Alchemy"
      }
    },
    {
      name: "Boost",
      attributes: {
        theme_store_id: 863,
        schema_name: "Boost"
      }
    },
    {
      name: "Masonry",
      attributes: {
        theme_store_id: 450,
        schema_name: "Masonry"
      }
    },
    {
      name: "Expression",
      attributes: {
        theme_store_id: 230,
        schema_name: "Expression"
      }
    },
    {
      name: "Frame",
      attributes: {
        theme_store_id: 1716,
        schema_name: "Frame"
      }
    },
    {
      name: "Lorenza",
      attributes: {
        theme_store_id: 798,
        schema_name: "Lorenza"
      }
    },
    {
      name: "Spark",
      attributes: {
        theme_store_id: 911,
        schema_name: "Spark"
      }
    },
    {
      name: "Momentum",
      attributes: {
        theme_store_id: 1600,
        schema_name: "Momentum"
      }
    },
    {
      name: "Influence",
      attributes: {
        theme_store_id: 1536,
        schema_name: "Influence"
      }
    },
    {
      name: "Fresh",
      attributes: {
        theme_store_id: 908,
        schema_name: "Fresh"
      }
    },
    {
      name: "Capital",
      attributes: {
        theme_store_id: 812,
        schema_name: "Capital"
      }
    },
    {
      name: "Envy",
      attributes: {
        theme_store_id: 411,
        schema_name: "Envy"
      }
    },
    {
      name: "Xclusive",
      attributes: {
        theme_store_id: 2221,
        schema_name: "Xclusive"
      }
    },
    {
      name: "Next",
      attributes: {
        theme_store_id: 2240,
        schema_name: "Next"
      }
    },
    {
      name: "Forge",
      attributes: {
        theme_store_id: 1492,
        schema_name: "Forge"
      }
    },
    {
      name: "Habitat",
      attributes: {
        theme_store_id: 1581,
        schema_name: "Habitat"
      }
    },
    {
      name: "Pinnacle",
      attributes: {
        theme_store_id: 2852,
        schema_name: "Pinnacle"
      }
    },
    {
      name: "Vantage",
      attributes: {
        theme_store_id: 459,
        schema_name: "Vantage"
      }
    },
    {
      name: "Drop",
      attributes: {
        theme_store_id: 1197,
        schema_name: "Drop"
      }
    },
    {
      name: "Foodie",
      attributes: {
        theme_store_id: 918,
        schema_name: "Foodie"
      }
    },
    {
      name: "Distinctive",
      attributes: {
        theme_store_id: 2431,
        schema_name: "Distinctive"
      }
    },
    {
      name: "Icon",
      attributes: {
        theme_store_id: 686,
        schema_name: "Icon"
      }
    },
    {
      name: "Testament",
      attributes: {
        theme_store_id: 623,
        schema_name: "Testament"
      }
    },
    {
      name: "Vision",
      attributes: {
        theme_store_id: 2053,
        schema_name: "Vision"
      }
    },
    {
      name: "Mr Parker",
      attributes: {
        theme_store_id: 567,
        schema_name: "Mr Parker"
      }
    },
    {
      name: "Fashionopolism",
      attributes: {
        theme_store_id: 141,
        schema_name: "Fashionopolism"
      }
    },
    {
      name: "North",
      attributes: {
        theme_store_id: 1460,
        schema_name: "North"
      }
    },
    {
      name: "Athens",
      attributes: {
        theme_store_id: 1608,
        schema_name: "Athens"
      }
    },
    {
      name: "Maranello",
      attributes: {
        theme_store_id: 2186,
        schema_name: "Maranello"
      }
    },
    {
      name: "Retina",
      attributes: {
        theme_store_id: 601,
        schema_name: "Retina"
      }
    },
    {
      name: "Responsive",
      attributes: {
        theme_store_id: 304,
        schema_name: "Responsive"
      }
    },
    // done below
    {
      name: "Madrid",
      attributes: {
        theme_store_id: 2870,
        schema_name: "Madrid"
      }
    },
    {
      name: "Charge",
      attributes: {
        theme_store_id: 2063,
        schema_name: "Charge"
      }
    },
    {
      name: "Relax",
      attributes: {
        theme_store_id: 2477,
        schema_name: "Relax"
      }
    },
    {
      name: "Starlite",
      attributes: {
        theme_store_id: 2455,
        schema_name: "Starlite"
      }
    },
    {
      name: "Essence",
      attributes: {
        theme_store_id: 2366,
        schema_name: "Essence"
      }
    },
    {
      name: "Abode",
      attributes: {
        theme_store_id: 1918,
        schema_name: "Abode"
      }
    },
    {
      name: "Loft",
      attributes: {
        theme_store_id: 846,
        schema_name: "Loft"
      }
    },
    {
      name: "Praise",
      attributes: {
        theme_store_id: 2144,
        schema_name: "Praise"
      }
    },
    {
      name: "Roam",
      attributes: {
        theme_store_id: 1777,
        schema_name: "Roam"
      }
    },
    {
      name: "Align",
      attributes: {
        theme_store_id: 1966,
        schema_name: "Align"
      }
    },
    {
      name: "Release",
      attributes: {
        theme_store_id: 2698,
        schema_name: "Release"
      }
    },
    {
      name: "Atlantic",
      attributes: {
        theme_store_id: 566,
        schema_name: "Atlantic"
      }
    },
    {
      name: "Empire",
      attributes: {
        theme_store_id: 838,
        schema_name: "Empire"
      }
    },
    {
      name: "Mode",
      attributes: {
        theme_store_id: 1578,
        schema_name: "Mode"
      }
    },
    {
      name: "Warehouse",
      attributes: {
        theme_store_id: 871,
        schema_name: "Warehouse"
      }
    },
    {
      name: "Yuva",
      attributes: {
        theme_store_id: 1615,
        schema_name: "Yuva"
      }
    },
    {
      name: "Tokyo",
      attributes: {
        theme_store_id: 2629,
        schema_name: "Tokyo"
      }
    },
    {
      name: "Redefine",
      attributes: {
        theme_store_id: 3007,
        schema_name: "Redefine"
      }
    },
    {
      name: "Impact",
      attributes: {
        theme_store_id: 1190,
        schema_name: "Impact"
      }
    }
  ];
  const universalForSubTotalTheme = [
    {
      name: "Modular",
      attributes: {
        theme_store_id: 849,
        schema_name: "Modular"
      }
    },
    {
      name: "Wonder",
      attributes: {
        theme_store_id: 2684,
        schema_name: "Wonder"
      }
    },
    {
      name: "Honey",
      attributes: {
        theme_store_id: 2160,
        schema_name: "Honey"
      }
    },
    {
      name: "Cornerstone",
      attributes: {
        theme_store_id: 2348,
        schema_name: "Cornerstone"
      }
    },
    {
      name: "Stiletto",
      attributes: {
        theme_store_id: 1621,
        schema_name: "Stiletto"
      }
    },
    {
      name: "Bullet",
      attributes: {
        theme_store_id: 1114,
        schema_name: "Bullet"
      }
    },
    {
      name: "Reformation",
      attributes: {
        theme_store_id: 1762,
        schema_name: "Reformation"
      }
    },
    {
      name: "Streamline",
      attributes: {
        theme_store_id: 872,
        schema_name: "Streamline"
      }
    },
    {
      name: "Gem",
      attributes: {
        theme_store_id: 2222,
        schema_name: "Gem"
      }
    },
    {
      name: "Impulse",
      attributes: {
        theme_store_id: 857,
        schema_name: "Impulse"
      }
    },
    {
      name: "Motion",
      attributes: {
        theme_store_id: 847,
        schema_name: "Motion"
      }
    },
    {
      name: "Essentials",
      attributes: {
        theme_store_id: 2482,
        schema_name: "Essentials"
      }
    },
    {
      name: "Aesthetic",
      attributes: {
        theme_store_id: 2514,
        schema_name: "Aesthetic"
      }
    },
    {
      name: "Whisk",
      attributes: {
        theme_store_id: 1819,
        schema_name: "Whisk"
      }
    },
    {
      name: "Flawless",
      attributes: {
        theme_store_id: 2847,
        schema_name: "Flawless"
      }
    },
    {
      name: "Copenhagen",
      attributes: {
        theme_store_id: 2564,
        schema_name: "Copenhagen"
      }
    },
    {
      name: "Barcelona",
      attributes: {
        theme_store_id: 2324,
        schema_name: "Barcelona"
      }
    },
    {
      name: "Monaco",
      attributes: {
        theme_store_id: 2125,
        schema_name: "Monaco"
      }
    },
    {
      name: "Berlin",
      attributes: {
        theme_store_id: 2138,
        schema_name: "Berlin"
      }
    },
    {
      name: "Pursuit",
      attributes: {
        theme_store_id: 1654,
        schema_name: "Pursuit"
      }
    },
    {
      name: "Multi",
      attributes: {
        theme_store_id: 2337,
        schema_name: "Multi"
      }
    },
    {
      name: "ShowTime",
      attributes: {
        theme_store_id: 687,
        schema_name: "ShowTime"
      }
    },
    {
      name: "Galleria",
      attributes: {
        theme_store_id: 851,
        schema_name: "Galleria"
      }
    },
    {
      name: "Digital",
      attributes: {
        theme_store_id: 2539,
        schema_name: "Digital"
      }
    },
    {
      name: "Outsiders",
      attributes: {
        theme_store_id: 2896,
        schema_name: "Outsiders"
      }
    },
    {
      name: "Swipe",
      attributes: {
        theme_store_id: 2737,
        schema_name: "Swipe"
      }
    },
    {
      name: "Select",
      attributes: {
        theme_store_id: 2372,
        schema_name: "Select"
      }
    },
    {
      name: "Minimalista",
      attributes: {
        theme_store_id: 2316,
        schema_name: "Minimalista"
      }
    },
    {
      name: "Stockmart",
      attributes: {
        theme_store_id: 2105,
        schema_name: "Stockmart"
      }
    },
    {
      name: "Fame",
      attributes: {
        theme_store_id: 2101,
        schema_name: "Fame"
      }
    },
    {
      name: "Gain",
      attributes: {
        theme_store_id: 2077,
        schema_name: "Gain"
      }
    },
    {
      name: "Boutique",
      attributes: {
        theme_store_id: 3051,
        schema_name: "Boutique"
      }
    },
    {
      name: "Ultra",
      attributes: {
        theme_store_id: 2967,
        schema_name: "Ultra"
      }
    },
    {
      name: "Infinity",
      attributes: {
        theme_store_id: 2061,
        schema_name: "Infinity"
      }
    },
    {
      name: "Colors",
      attributes: {
        theme_store_id: 757,
        schema_name: "Colors"
      }
    },
    {
      name: "California",
      attributes: {
        theme_store_id: 691,
        schema_name: "California"
      }
    },
    {
      name: "Stockholm",
      attributes: {
        theme_store_id: 1405,
        schema_name: "Stockholm"
      }
    },
    {
      name: "Portland",
      attributes: {
        theme_store_id: 1924,
        schema_name: "Portland"
      }
    },
    {
      name: "Handmade",
      attributes: {
        theme_store_id: 1791,
        schema_name: "Handmade"
      }
    },
    {
      name: "Kidu",
      attributes: {
        theme_store_id: 2268,
        schema_name: "Kidu"
      }
    },
    {
      name: "Nexa",
      attributes: {
        theme_store_id: 2820,
        schema_name: "Nexa"
      }
    },
    {
      name: "Urban",
      attributes: {
        theme_store_id: 2405,
        schema_name: "Urban"
      }
    },
    {
      name: "Agile",
      attributes: {
        theme_store_id: 2346,
        schema_name: "Agile"
      }
    },
    {
      name: "Nostalgia",
      attributes: {
        theme_store_id: 2175,
        schema_name: "Nostalgia"
      }
    },
    {
      name: "Refine",
      attributes: {
        theme_store_id: 2782,
        schema_name: "Refine"
      }
    },
    {
      name: "Mandolin",
      attributes: {
        theme_store_id: 1696,
        schema_name: "Mandolin"
      }
    },
    {
      name: "Lute",
      attributes: {
        theme_store_id: 2171,
        schema_name: "Lute"
      }
    },
    {
      name: "Banjo",
      attributes: {
        theme_store_id: 1778,
        schema_name: "Banjo"
      }
    },
    {
      name: "Chord",
      attributes: {
        theme_store_id: 1584,
        schema_name: "Chord"
      }
    },
    {
      name: "Effortless",
      attributes: {
        theme_store_id: 1743,
        schema_name: "Effortless"
      }
    },
    {
      name: "Urge",
      attributes: {
        theme_store_id: 2213,
        schema_name: "Urge"
      }
    },
    {
      name: "Huge",
      attributes: {
        theme_store_id: 2158,
        schema_name: "Huge"
      }
    },
    {
      name: "Vincent",
      attributes: {
        theme_store_id: 2913,
        schema_name: "Vincent"
      }
    },
    {
      name: "Minion",
      attributes: {
        theme_store_id: 1571,
        schema_name: "Minion"
      }
    },
    {
      name: "Area",
      attributes: {
        theme_store_id: 2073,
        schema_name: "Area"
      }
    },
    {
      name: "Elysian",
      attributes: {
        theme_store_id: 2578,
        schema_name: "Elysian"
      }
    },
    {
      name: "Brava",
      attributes: {
        theme_store_id: 2148,
        schema_name: "Brava"
      }
    },
    {
      name: "Erickson",
      attributes: {
        theme_store_id: 1790,
        schema_name: "Erickson"
      }
    },
    {
      name: "StyleScape",
      attributes: {
        theme_store_id: 2238,
        schema_name: "StyleScape"
      }
    },
    {
      name: "Soul",
      attributes: {
        theme_store_id: 2825,
        schema_name: "Soul"
      }
    },
    {
      name: "Emporium",
      attributes: {
        theme_store_id: 1854,
        schema_name: "Emporium"
      }
    },
    {
      name: "Creator",
      attributes: {
        theme_store_id: 1922,
        schema_name: "Creator"
      }
    },
    {
      name: "Palo Alto",
      attributes: {
        theme_store_id: 777,
        schema_name: "Palo Alto"
      }
    },
    {
      name: "Zora",
      attributes: {
        theme_store_id: 2505,
        schema_name: "Zora"
      }
    },
    {
      name: "Pipeline",
      attributes: {
        theme_store_id: 739,
        schema_name: "Pipeline"
      }
    },
    {
      name: "Story",
      attributes: {
        theme_store_id: 864,
        schema_name: "Story"
      }
    },
    {
      name: "Broadcast",
      attributes: {
        theme_store_id: 868,
        schema_name: "Broadcast"
      }
    },
    {
      name: "Blockshop",
      attributes: {
        theme_store_id: 606,
        schema_name: "Blockshop"
      }
    },
    {
      name: "Beyond",
      attributes: {
        theme_store_id: 939,
        schema_name: "Beyond"
      }
    },
    {
      name: "Maker",
      attributes: {
        theme_store_id: 765,
        schema_name: "Maker"
      }
    },
    {
      name: "Emerge",
      attributes: {
        theme_store_id: 833,
        schema_name: "Emerge"
      }
    },
    {
      name: "Sahara",
      attributes: {
        theme_store_id: 1926,
        schema_name: "Sahara"
      }
    },
    {
      name: "Mojave",
      attributes: {
        theme_store_id: 1497,
        schema_name: "Mojave"
      }
    },
    {
      name: "Tailor",
      attributes: {
        theme_store_id: 1457,
        schema_name: "Tailor"
      }
    },
    {
      name: "Startup",
      attributes: {
        theme_store_id: 652,
        schema_name: "Startup"
      }
    },
    {
      name: "Editions",
      attributes: {
        theme_store_id: 457,
        schema_name: "Editions"
      }
    },
    {
      name: "Taiga",
      attributes: {
        theme_store_id: 1751,
        schema_name: "Taiga"
      }
    },
    {
      name: "Prestige",
      attributes: {
        theme_store_id: 855,
        schema_name: "Prestige"
      }
    },
    {
      name: "Mono",
      attributes: {
        theme_store_id: 1818,
        schema_name: "Mono"
      }
    },
    {
      name: "Monk",
      attributes: {
        theme_store_id: 2515,
        schema_name: "Monk"
      }
    },
    //--------------------
    {
      name: "Debutify",
      attributes: {
        theme_store_id: 0,
        schema_name: "Debutify"
      }
    }
  ];
  const universalForExponentSubtotal = [
    {
      // completed by [Abid]
      name: "Canopy",
      attributes: {
        theme_store_id: 732,
        schema_name: "Canopy"
      }
    },
    {
      // completed by [Abid]
      name: "Fetch",
      attributes: {
        theme_store_id: 1949,
        schema_name: "Fetch"
      }
    },
    {
      // completed by [Abid]
      name: "Expanse",
      attributes: {
        theme_store_id: 902,
        schema_name: "Expanse"
      }
    }
  ];
  const switchTheme = [
    {
      name: "Avante",
      attributes: {
        theme_store_id: 1667,
        schema_name: "Avante"
      }
    },
    {
      name: "Xtra",
      attributes: {
        theme_store_id: 1609,
        schema_name: "Xtra"
      }
    },
    {
      name: "Paris",
      attributes: {
        theme_store_id: 2702,
        schema_name: "Paris"
      }
    },
    {
      name: "Eclipse",
      attributes: {
        theme_store_id: 3070,
        schema_name: "Eclipse"
      }
    },
    {
      name: "Luxe",
      attributes: {
        theme_store_id: 2779,
        schema_name: "Luxe"
      }
    },
    {
      name: "Ignite",
      attributes: {
        theme_store_id: 3027,
        schema_name: "Ignite"
      }
    },
    {
      name: "Zest",
      attributes: {
        theme_store_id: 1611,
        schema_name: "Zest"
      }
    },
    {
      name: "Woodstock",
      attributes: {
        theme_store_id: 2239,
        schema_name: "Woodstock"
      }
    },
    {
      name: "Symmetry",
      attributes: {
        theme_store_id: 568,
        schema_name: "Symmetry"
      }
    },
    {
      name: "Sleek",
      attributes: {
        theme_store_id: 2821,
        schema_name: "Sleek"
      }
    },
    {
      name: "District",
      attributes: {
        theme_store_id: 735,
        schema_name: "District"
      }
    },
    {
      name: "Sitar",
      attributes: {
        theme_store_id: 2599,
        schema_name: "Sitar"
      }
    },
    {
      name: "Concept",
      attributes: {
        theme_store_id: 2412,
        schema_name: "Concept"
      }
    },
    {
      name: "Kairo",
      attributes: {
        theme_store_id: 1843,
        schema_name: "Kairo"
      }
    },
    {
      name: "Exhibit",
      attributes: {
        theme_store_id: 1828,
        schema_name: "Exhibit"
      }
    },
    {
      name: "Shapes",
      attributes: {
        theme_store_id: 1535,
        schema_name: "Shapes"
      }
    },
    {
      name: "Cascade",
      attributes: {
        theme_store_id: 859,
        schema_name: "Cascade"
      }
    },
    {
      name: "Label",
      attributes: {
        theme_store_id: 773,
        schema_name: "Label"
      }
    },
    {
      name: "Venue",
      attributes: {
        theme_store_id: 836,
        schema_name: "Venue"
      }
    },
    {
      name: "Creative",
      attributes: {
        theme_store_id: 1829,
        schema_name: "Creative"
      }
    },
    {
      name: "Electro",
      attributes: {
        theme_store_id: 2164,
        schema_name: "Electro"
      }
    },
    {
      name: "Shine",
      attributes: {
        theme_store_id: 2576,
        schema_name: "Shine"
      }
    },
    {
      name: "Blum",
      attributes: {
        theme_store_id: 1839,
        schema_name: "Blum"
      }
    },
    {
      name: "Parallax",
      attributes: {
        theme_store_id: 688,
        schema_name: "Parallax"
      }
    },
    {
      name: "Veena",
      attributes: {
        theme_store_id: 2566,
        schema_name: "Veena"
      }
    },
    {
      name: "Koto",
      attributes: {
        theme_store_id: 3001,
        schema_name: "Koto"
      }
    },
    {
      name: "Piano",
      attributes: {
        theme_store_id: 2812,
        schema_name: "Piano"
      }
    },
    {
      name: "Cello",
      attributes: {
        theme_store_id: 2328,
        schema_name: "Cello"
      }
    },
    {
      name: "Viola",
      attributes: {
        theme_store_id: 1701,
        schema_name: "Viola"
      }
    },
    {
      name: "King",
      attributes: {
        theme_store_id: 2948,
        schema_name: "King"
      }
    },
    {
      name: "Shark",
      attributes: {
        theme_store_id: 2619,
        schema_name: "Shark"
      }
    },
    {
      name: "Energy",
      attributes: {
        theme_store_id: 2717,
        schema_name: "Energy"
      }
    },
    {
      name: "Igloo",
      attributes: {
        theme_store_id: 2315,
        schema_name: "Igloo"
      }
    },
    {
      name: "Meka",
      attributes: {
        theme_store_id: 2845,
        schema_name: "Meka"
      }
    },
    {
      name: "Providence",
      attributes: {
        theme_store_id: 587,
        schema_name: "Providence"
      }
    },
    {
      name: "Amber",
      attributes: {
        theme_store_id: 2217,
        schema_name: "Amber"
      }
    },
    {
      name: "Marble",
      attributes: {
        theme_store_id: 1907,
        schema_name: "Marble"
      }
    },
    {
      name: "Sunrise",
      attributes: {
        theme_store_id: 57,
        schema_name: "Sunrise"
      }
    },
    {
      name: "Unicorn",
      attributes: {
        theme_store_id: 2264,
        schema_name: "Unicorn"
      }
    },
    {
      name: "Iris",
      attributes: {
        theme_store_id: 2489,
        schema_name: "Iris"
      }
    },
    {
      name: "Divide",
      attributes: {
        theme_store_id: 2273,
        schema_name: "Divide"
      }
    },
    {
      name: "Takeout",
      attributes: {
        theme_store_id: 2534,
        schema_name: "Takeout"
      }
    },
    {
      name: "Aisle",
      attributes: {
        theme_store_id: 2378,
        schema_name: "Aisle Theme"
      }
    },
    {
      name: "Noblesse",
      attributes: {
        theme_store_id: 2546,
        schema_name: "Noblesse"
      }
    },
    {
      name: "Pesto",
      attributes: {
        theme_store_id: 2275,
        schema_name: "Pesto"
      }
    },
    {
      name: "Satoshi",
      attributes: {
        theme_store_id: 2881,
        schema_name: "Satoshi"
      }
    },
    {
      name: "Modules",
      attributes: {
        theme_store_id: 1795,
        schema_name: "Modules"
      }
    },
    {
      name: "Bazaar",
      attributes: {
        theme_store_id: 1448,
        schema_name: "Bazaar"
      }
    },
    {
      name: "Nimbus",
      attributes: {
        theme_store_id: 3094,
        schema_name: "Nimbus"
      }
    },
    {
      name: "Eurus",
      attributes: {
        theme_store_id: 2048,
        schema_name: "Eurus"
      }
    },
    {
      name: "Showcase",
      attributes: {
        theme_store_id: 677,
        schema_name: "Showcase"
      }
    },
    {
      name: "Cama",
      attributes: {
        theme_store_id: 2204,
        schema_name: "Cama"
      }
    },
    {
      name: "Vivid",
      attributes: {
        theme_store_id: 2285,
        schema_name: "Vivid"
      }
    },
    {
      name: "Retro",
      attributes: {
        theme_store_id: 2630,
        schema_name: "Retro"
      }
    },
    {
      name: "Local",
      attributes: {
        theme_store_id: 1651,
        schema_name: "Local"
      }
    },
    {
      name: "Highlight",
      attributes: {
        theme_store_id: 903,
        schema_name: "Highlight"
      }
    },
    {
      name: "Split",
      attributes: {
        theme_store_id: 842,
        schema_name: "Split"
      }
    },
    {
      name: "Borders",
      attributes: {
        theme_store_id: 2491,
        schema_name: "Borders"
      }
    },
    {
      name: "Combine",
      attributes: {
        theme_store_id: 1826,
        schema_name: "Combine"
      }
    },
    {
      name: "Polyform",
      attributes: {
        theme_store_id: 2493,
        schema_name: "Polyform"
      }
    },
    {
      name: "Noire",
      attributes: {
        theme_store_id: 2926,
        schema_name: "Noire"
      }
    },
    {
      name: "Neat",
      attributes: {
        theme_store_id: 1878,
        schema_name: "Neat"
      }
    },
    {
      name: "Nordic",
      attributes: {
        theme_store_id: 2801,
        schema_name: "Nordic"
      }
    },
    {
      name: "Toyo",
      attributes: {
        theme_store_id: 2358,
        schema_name: "Toyo"
      }
    },
    {
      name: "Mavon",
      attributes: {
        theme_store_id: 1979,
        schema_name: "Mavon"
      }
    },
    {
      name: "Baseline",
      attributes: {
        theme_store_id: 910,
        schema_name: "Baseline"
      }
    },
    {
      name: "Flow",
      attributes: {
        theme_store_id: 801,
        schema_name: "Flow"
      }
    }
  ];
  const brickSpaceLabTheme = [
    {
      name: "Space",
      attributes: {
        theme_store_id: 2659,
        schema_name: "Space"
      }
    },
    {
      name: "Keystone",
      attributes: {
        theme_store_id: 2943,
        schema_name: "Keystone"
      }
    },
    {
      name: "Paper",
      attributes: {
        theme_store_id: 1662,
        schema_name: "Paper"
      }
    },
    {
      name: "Machina",
      attributes: {
        theme_store_id: 2883,
        schema_name: "Machina"
      }
    }
  ];
  const checkTheme = (themes) => {
    const currentTheme = window.Shopify.theme || {};
    return themes == null ? void 0 : themes.some(
      (theme) => Object.values(theme.attributes).some(
        (value) => Object.values(currentTheme).includes(value)
      )
    );
  };
  class PackageProtectionClientBasic {
    constructor(api) {
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/1652/8827/files/g4990.png?v=1708754054");
      __publicField(this, "infoPageLink", "/pages/package-protection");
      __publicField(this, "containers", /* @__PURE__ */ new Map());
      __publicField(this, "title", "package title");
      __publicField(this, "enabledDescription", "enabled description");
      __publicField(this, "disabledDescription", "disabled description");
      __publicField(this, "buttonColor", "#22c55e");
      __publicField(this, "checked", false);
      __publicField(this, "css", "");
      __publicField(this, "textAlign", "left");
      this.api = api;
    }
    formatPrice(price, currency) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        currency
      }).format(price);
    }
    async getPrice() {
      const { coercedPrice } = await this.api.calculate();
      const cart = await window.weNexusCartApi.get();
      return this.formatPrice(Number(coercedPrice), cart.currency);
    }
    getWidgetPrice() {
      let getPrice = "";
      Array.from(document.querySelectorAll(".protection-price")).forEach(
        (e) => {
          getPrice = e == null ? void 0 : e.innerHTML;
        }
      );
      return Number(getPrice.replace(/[^0-9.]/g, ""));
    }
    async getDescription() {
      return `${this.checked ? this.enabledDescription : this.disabledDescription}`;
    }
    async getChecked() {
      return this.checked;
    }
    async getCheckboxContainer(key, checked) {
      const container = document.createElement("div");
      const price = await this.getPrice();
      const description = await this.getDescription();
      container.insertAdjacentHTML(
        "afterbegin",
        `
      <style>${this.css}</style>
        <div class="wenexus-package-protection__content">
            <div class="wenexus-package-protection__image">
                <img src="${this.thumbnail}" alt="logo" />
            </div>
            <div class="wenexus-package-protection__desc">
                <h5>${this.title} 
                ${this.infoPageLink ? `<a href="https://${this.infoPageLink}" target="_blank" style="color:blue;">ⓘ</a> ` : ``}
                </h5>
                <p> <span class="wenexus-package-protection-description">${description} </span></p>
            </div>
        </div>
        <div class="wenexus-package-protection__toggle" >
        
        <div style="position:relative;">
            <input type="checkbox" ${checked ? "checked" : ""} style="position:absolute; width:100%; height:100%; left:0; z-index:99; opacity:0; margin:0px; cursor:pointer; display: block; clip:unset;">

            <div class="toggle-container" style="display: flex;  width: 35px; height: 13px; background-color: ${checked ? this.buttonColor : "#7b7b7b"}; position: relative; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border-radius: 9999px; cursor: pointer; transition: background-color 0.5s ease-out;">
                <span class="toggle-switch" style="height: 11px; width: 11px; position: absolute; top: 1.3px; left: 2px; background-color: white; border-radius: 9999px; ${checked ? "transform: translateX(20px);" : ""} transition: all 0.3s ease-out; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); display: flex; align-items: center; justify-content: center;"></span>
            </div>
          <p style="margin:0px; font-size:10px; text-align:center;"><strong class="protection-price">${price}</strong></p>
            </div>
        </div>
      `
      );
      const checkbox = container.querySelector(
        ".wenexus-package-protection__toggle input"
      );
      const toggleContainer = container.querySelector(
        ".toggle-container"
      );
      const toggleSwitch = container.querySelector(
        ".toggle-switch"
      );
      container.className = "wenexus-package-protection";
      checkbox.addEventListener("click", () => {
        updateToggleStyles();
        this.checked = checkbox.checked;
      });
      const updateToggleStyles = () => {
        toggleContainer.style.backgroundColor = checkbox.checked ? this.buttonColor : "#7b7b7b";
        toggleSwitch.style.transform = checkbox.checked ? "translateX(20px)" : "translateX(0)";
      };
      updateToggleStyles();
      this.containers.set(key, container);
      return {
        container,
        checkbox
      };
    }
    async getStyleMarkup({
      accentColor,
      imageWidth = 56,
      containerGap = [0, 10],
      contentGap = [0, 10],
      descriptionFontWeight = "normal",
      // descriptionFontSize = 0.8,
      descriptionMargin = [0, 0, 0, 0],
      // titleFontSize = 1.4,
      hideDescriptionPage = true,
      containerMargin = [0, 0, 8, 0],
      containerJustify = "space-between",
      extraStyles = "",
      textAlign = "left",
      containerMaxWidth = "100%"
    }) {
      return `
      <style>
         .wenexus-package-protection {
            display: flex;
            width: 100%;
            max-width: 500px; 
            min-height: 70px;           
            justify-content: ${containerJustify};
            align-items: center;
            margin: ${containerMargin == null ? void 0 : containerMargin.join("px ")};
            gap: ${containerGap[0]} ${containerGap[1]}px;   
                   
         }
         
         .wenexus-package-protection__content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: ${contentGap[0]} ${contentGap[1]}px;
           
         }
         
         .wenexus-package-protection__image {            
            max-width: ${imageWidth ?? 65}px;
            max-height: ${imageWidth ?? 65}px;
         }
         
         .wenexus-package-protection__image img {
            width: 50px;
            height: 50px;
         }
         .wenexus-package-protection__desc{
            text-align: ${textAlign};
            max-width: ${containerMaxWidth};
         }

         .wenexus-package-protection__desc h5 {
            font-size:16px;
            margin: 0;
            font-weight: bold;            
         }
         
         .wenexus-package-protection__desc p {           
            font-size: 13px;
            font-weight: ${descriptionFontWeight};
            margin: ${descriptionMargin == null ? void 0 : descriptionMargin.join("px ")}px;
         }
         
         .wenexus-package-protection__desc a {
            text-decoration: none;
            font-size:inherit;
            outline: 0;
            color: #222;
            transition: .3s;
            ${hideDescriptionPage ? "display: none;" : ""}
         }
         
         .wenexus-package-protection__toggle {
            accent-color: ${accentColor} !important;
            zoom: 1.55;
         }
         
         ${extraStyles}
      </style>`;
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: 'button[type="submit"][name="checkout"]',
          insertPosition: "before"
        }
      ];
    }
    async refreshPriceUI() {
      this.containers.forEach(async (container) => {
        container.querySelector(".protection-price").textContent = await this.getPrice();
      });
    }
    async refreshWidget() {
      const subtotalSelector = [
        ".wt-cart__footer",
        ".wt-cart__footer__body",
        "#main-cart-footer",
        ".drawer__footer",
        ".cart__footer-inner",
        ".quick-cart__footer",
        "cart-footer",
        'button[type="submit"][name="checkout"]',
        ".cart__footer",
        // [Abid] theme = Streamline
        "form.sticky-cart__inner",
        // [Abid] theme = Streamline
        "form#CartPageForm",
        // [Abid] theme = Gem
        ".cart-total-box",
        // [Abid] theme = Fame
        ".cart-drawer__container",
        // [Abid] theme = Gain
        ".cart-template__summary",
        // [Abid] theme = Gain
        ".cart-footer__summary",
        // [Abid] theme = Bootique
        ".cart-drawer__bottom",
        // [Abid] theme = Stockholm
        ".total-holder",
        // [Abid] theme = Kidu
        ".main-cart_cart-totals-wrap",
        // [Abid] theme = Kidu
        ".cart-drawer_foot-wrap",
        // [Abid] theme = Nexa
        ".main-cart_widget--totals",
        // [Abid] theme = Nexa
        ".accordion-wrap",
        // [Abid] theme = Effortless
        ".shopping-cart",
        // [Abid] theme = Effortless
        ".template__cart__footer",
        ".cart-table__checkoutWrp",
        ".cart-subtotal",
        'div[data-element="subtotal-block"]',
        "#cart-drawer-live-region-subtotal",
        "div[data-cart-subtotal-block]",
        "subtotal-price",
        ".cart-footer__subtotal",
        ".cart-totals",
        ".order-summary-card",
        ".more",
        ".subtotal",
        ".subtotal .money ",
        ".cart-drawer-footer-total",
        ".CartDrawer__Total",
        ".Cart__Total",
        ".cart-header-details",
        ".sub--total-cart",
        ".items-baseline",
        ".cart-drawer__totals",
        "#cart-subtotal",
        ".cart__total",
        ".cart--total-price",
        ".cart__summary-total",
        ".cart-drawer__summary-total",
        ".cart-items__total",
        ".cart-drawer__total",
        ".cart__subtotal",
        ".totals__subtotal-value",
        "#CartDetails",
        ".cart__footer ",
        ".cart-summary-line",
        ".cart__details",
        ".cart-recap",
        ".cart-count",
        ".cart-total-price",
        ".cart__subtotal",
        ".totals",
        ".ajaxcart__price",
        ".cart__row--table"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotals = document.querySelectorAll(selector);
          function replaceTextInDocument(node) {
            const oldText = Number(items.items_subtotal_price / 100).toFixed(2);
            const newText = Number(items.items_subtotal_price / 100 + price).toFixed(2);
            if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.TEXT_NODE)) {
              if (price === 0) {
                const priceWithSubtotal = localStorage.getItem("items_subtotal_price");
                node.textContent = node.textContent.replace(new RegExp(`\\b${priceWithSubtotal}\\b`, "g"), newText);
              } else {
                localStorage.setItem("items_subtotal_price", newText);
                node.textContent = node.textContent.replace(new RegExp(`\\b${oldText}\\b`, "g"), newText);
              }
            } else if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.ELEMENT_NODE)) {
              Array.from(node.childNodes).forEach(replaceTextInDocument);
            }
          }
          subTotals.forEach((subTotal) => {
            replaceTextInDocument(subTotal);
          });
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    disabledCheckoutButton() {
      const checkoutButtons = document.querySelectorAll("[name='checkout']");
      checkoutButtons.forEach((button) => {
        button.disabled = true;
      });
    }
    enabledCheckoutButton() {
      const checkoutButtons = document.querySelectorAll("[name='checkout']");
      checkoutButtons.forEach((button) => {
        button.disabled = false;
      });
    }
    cartUpdate() {
      window.location.reload();
    }
    cartBubble() {
    }
  }
  class PackageProtectionClientShopifyFreeTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(freeThemes);
    }
    getInsertionPointSelectors(position, selector) {
      return [
        {
          selector: selector ?? ".cart__ctas",
          insertPosition: position ?? "before"
        },
        {
          selector: ".cart-notification__links",
          insertPosition: "before",
          boundaryParents: new Set(
            Array.from(document.querySelectorAll("cart-notification"))
          )
        },
        {
          selector: ".button-container",
          insertPosition: "before"
        },
        {
          selector: ".cart-preview__btns-wrap",
          insertPosition: "before"
        }
        // {
        //   selector: '.cart-checkout-button-wrapper button[type="submit"][name="checkout"]:last-of-type',
        //   insertPosition: 'before'
        // },
      ];
    }
    async getStyleMarkup(options) {
      return super.getStyleMarkup({
        imageWidth: 66,
        containerMargin: [10, 0, 12, 0],
        containerJustify: "space-between",
        titleFontSize: 1.8,
        descriptionFontSize: 1.1,
        hideDescriptionPage: false,
        descriptionMargin: [2, 0, 0, 0],
        ...options,
        accentColor: "#2c7e3f"
      });
    }
    // theme support
    async refreshWidget() {
      const subTotalSelectors = [".totals__total-value, .totals, .cart-preview__total-price-value"];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subTotalSelectors.forEach((selector) => {
          let subTotals = document.querySelectorAll(selector);
          function replaceTextInDocument(node) {
            const oldText = Number(items.items_subtotal_price / 100).toFixed(2);
            const newText = Number(items.items_subtotal_price / 100 + price).toFixed(2);
            if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.TEXT_NODE)) {
              if (price === 0) {
                const priceWithSubtotal = localStorage.getItem("items_subtotal_price");
                node.textContent = node.textContent.replace(new RegExp(`\\b${priceWithSubtotal}\\b`, "g"), newText);
              } else {
                localStorage.setItem("items_subtotal_price", newText);
                node.textContent = node.textContent.replace(new RegExp(`\\b${oldText}\\b`, "g"), newText);
              }
            } else if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.ELEMENT_NODE)) {
              Array.from(node.childNodes).forEach(replaceTextInDocument);
            }
          }
          subTotals.forEach((subTotal) => {
            replaceTextInDocument(subTotal);
          });
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      console.log("free theme");
      Array.from(document.getElementsByTagName("cart-items")).forEach(
        (i) => i.onCartUpdate()
      );
      Array.from(document.getElementsByTagName("cart-drawer-items")).forEach(
        (i) => i.onCartUpdate()
      );
    }
    async cartBubble() {
      const item_count = (await window.weNexusCartApi.get()).item_count;
      let cartIcon = document.getElementsByClassName("cart-count-bubble");
      Array.from(cartIcon).forEach((el) => {
        el.childNodes.forEach((e) => {
          if (e.innerHTML) {
            e.innerHTML = item_count.toString();
          }
        });
      });
    }
  }
  class PackageProtectionClientEnterpriseTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(enterpriseTheme);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: "button[name='checkout']",
          insertPosition: "before"
        }
      ];
    }
    async getStyleMarkup(options) {
      return super.getStyleMarkup({
        imageWidth: 66,
        containerMargin: [10, 0, 12, 0],
        containerJustify: "end",
        titleFontSize: 1,
        descriptionFontSize: 0.8,
        hideDescriptionPage: false,
        descriptionMargin: [2, 0, 0, 0],
        containerMaxWidth: "250px",
        ...options,
        accentColor: "#2c7e3f"
      });
    }
    doesCheckoutContainSubtotal(textContent) {
      if (!textContent)
        return false;
      const regex = /checkout/i;
      const numberRegex = /\b\d+(\.\d{2})?\b/;
      return regex.test(textContent) && numberRegex.test(textContent);
    }
    // theme support
    async refreshWidget() {
      console.log("enterpriseTheme");
      const subtotalSelector = [
        ".cart__summary div p",
        'button[name="checkout"]'
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && this.doesCheckoutContainSubtotal(subTotal.textContent)) {
            subTotal.textContent = "Checkout - " + this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            );
            return;
          }
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = "Checkout - " + this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            );
          } else if (subTotal) {
            subTotal.innerHTML = this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            );
          }
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
  }
  class PackageProtectionClientUniversalTheme extends PackageProtectionClientBasic {
    static shouldUse() {
      return checkTheme(universalTheme);
    }
    getInsertionPointSelectors() {
      return [
        { selector: ".footer-ctas", insertPosition: "before" },
        { selector: "cart-drawer-buttons-block", insertPosition: "before" },
        { selector: ".cart-buttons", insertPosition: "before" },
        { selector: ".cart__ctas", insertPosition: "before" },
        { selector: ".cart-summary__button", insertPosition: "before" },
        // Abid
        { selector: ".cart-submit", insertPosition: "before" },
        // Abid
        { selector: ".cart-drawer__checkout-buttons", insertPosition: "before" },
        // Abid
        { selector: ".cart-drawer__footer  p.rte", insertPosition: "before" },
        // Abid
        { selector: ".drawer__footer details", insertPosition: "before" },
        // Abid theme=Alchemy
        { selector: '.cart__summary button[name="checkout"]', insertPosition: "before" },
        // Abid theme=Alchemy
        { selector: ".checkout-buttons", insertPosition: "before" },
        // Abid theme=Symmetry
        { selector: ".f-cart-drawer__buttons", insertPosition: "before" },
        // Abid theme=Zest
        { selector: ".drawer__footer-buttons", insertPosition: "before" },
        // Abid theme=sleek
        { selector: ".cart__footer--buttons", insertPosition: "before" },
        // Abid theme=sleek
        { selector: "#CartDetails", insertPosition: "before" },
        // Abid theme=kingdom
        { selector: "main.drawer__inner.min-h-0.h-full small.text-caption", insertPosition: "after" },
        // Abid theme=polyform
        {
          selector: "div.py-24.flex div.md\\:ml-auto.max-sm\\:w-full div.flex.flex-col.items-end.gap-8 button",
          insertPosition: "before"
        },
        // Abid theme=polyform
        // { selector: 'form.sticky-in-panel .link-btn', insertPosition: 'before' }, // Abid theme=Xtra
        // { selector: 'aside:not([class]) .overlay-dynamic_buy_button', insertPosition: 'before' }, // Abid theme=Xtra
        { selector: "form.f8vl.f8vl-initialized p.link-btn.text-justify", insertPosition: "before" },
        // Abid theme=NExt
        { selector: "fieldset aside p.link-btn.wide", insertPosition: "before" },
        // Abid theme=NExt
        { selector: ".cart-checkout-container", insertPosition: "before" },
        // Abid theme=Starlite
        { selector: "div.cart-purchase__checkout-section div.bottom-cart-wrapper", insertPosition: "before" },
        // Abid theme=loft
        { selector: "div.mini-cart__footer div.cart-summary__meta a.button", insertPosition: "before" },
        // Abid theme=align
        {
          selector: 'form.cart__wrapper div.cart-summary .cart-summary__buttons button[name="checkout"]',
          insertPosition: "before"
        },
        // Abid theme=align
        { selector: "form#cart button#cart-notification-checkout", insertPosition: "before" },
        // Abid theme=Abode
        {
          selector: "form.ajax-cart__cart-form.grid__wrapper.narrow.mb4.js-cart-form div.ajax-cart__buttons",
          insertPosition: "before"
        },
        // Abid theme=forge
        {
          selector: "form.ajax-cart__cart-form.grid__wrapper.edge.js-cart-form div.ajax-cart__buttons",
          insertPosition: "before"
        },
        // Abid theme=NExt
        { selector: ".theme-button--secondary", insertPosition: "before" },
        { selector: ".ajaxcart__footer", insertPosition: "before" },
        { selector: ".cart__buttons-container", insertPosition: "before" },
        { selector: ".cart-template__footer-actions", insertPosition: "before" },
        { selector: ".cart__footer-actions", insertPosition: "before" },
        { selector: ".quick-cart__total", insertPosition: "after" },
        // { selector: '.btn-wrapper-default', insertPosition: 'before' },
        { selector: ".cart-drawer__footer--buttons", insertPosition: "before" },
        { selector: ".checkout-btns", insertPosition: "before" },
        { selector: ".cart-drawer-buttons", insertPosition: "before" },
        { selector: ".proceed-to-checkout", insertPosition: "before" },
        { selector: ".cart-drawer--buttons-container", insertPosition: "before" },
        { selector: ".thb-cart-form--proceed", insertPosition: "before" },
        { selector: ".mini-cart__buttons", insertPosition: "before" },
        { selector: ".cart-ctas", insertPosition: "before" },
        { selector: ".mini-cart-footer-actions", insertPosition: "before" },
        { selector: ".cart-template__checkout-buttons", insertPosition: "before" },
        { selector: ".add-to-cart-wrap", insertPosition: "before" },
        { selector: ".drawer__footer-actions", insertPosition: "before" },
        { selector: ".cart__checkout", insertPosition: "before" },
        { selector: ".cart-sidebar__footer-actions", insertPosition: "before" },
        { selector: ".cart-modal-buttons", insertPosition: "before" },
        // { selector: 'div[js-cart-text]', insertPosition: 'after' },
        { selector: "add-order-note", insertPosition: "after" },
        // { selector: '.tax-note', insertPosition: 'after' },
        { selector: ".main-cart__footer__fine-print", insertPosition: "after" },
        { selector: ".header-minicart-footer-wrapper", insertPosition: "before" },
        { selector: ".sticky-menu-buttons-slideout-closed", insertPosition: "before" },
        { selector: 'button[aria-label="Agree to Terms"]', insertPosition: "before" },
        { selector: ".cart-drawer__action-buttons", insertPosition: "before" },
        {
          selector: ".cart-mini-actions",
          insertPosition: "before"
        },
        {
          selector: ".cart-checkout",
          insertPosition: "before"
        },
        // { selector: '.mini-cart-footer', insertPosition: 'before' },
        { selector: ".mini-cart__button-container", insertPosition: "before" },
        { selector: ".cart-recap__notices", insertPosition: "after" },
        { selector: ".buy-buttons--compact", insertPosition: "before" },
        // { selector: 'cart-note', insertPosition: 'after' },
        { selector: 'button[form="mini-cart-form"]', insertPosition: "before" },
        // { selector: '.cart__checkout-button', insertPosition: 'before' },
        { selector: ".cart-btn", insertPosition: "before" },
        { selector: ".cart-btn-container", insertPosition: "before" },
        { selector: ".xo-cart-mini-footer__group", insertPosition: "before" },
        { selector: 'xo-cart-will-change button[type="submit"][name="checkout"]', insertPosition: "before" },
        { selector: '.checkout-row input[type="submit"][name="checkout"]', insertPosition: "before" },
        { selector: ".overlay-buy_button", insertPosition: "before" },
        // Xclusive
        { selector: 'safe-sticky button[name="checkout"]', insertPosition: "before" }
        // Impact
        // { selector: 'input[name="checkout"]', insertPosition: 'before' }, // Abid theme=Masonry
        // { selector: 'button[name="checkout"]', insertPosition: 'before' }, // Abid
        // { selector:   'div.ml-auto', insertPosition: 'before' },
      ];
    }
    // theme support
    async refreshWidget() {
      console.log("universal-1");
      const subtotalSelector = [
        ".cart-details-footer",
        ".cart-drawer-subtotal__main-content",
        ".cart-subtotal",
        ".drawer__footer__inner",
        ".cart__footer",
        ".cart-summary__total-price-row",
        ".drawer__footer",
        ".subtotal-row",
        ".cart-drawer__summary",
        "div[data-cart-footer]",
        ".cart__summary",
        // Abid - theme = Alchemy
        ".cart-drawer__footer",
        // [Abid] - theme = Symmetry
        ".checkout-subtotal-container__right",
        // [Abid] - theme = Symmetry
        ".f-cart-drawer__subtotal-value",
        // [Abid] - theme = Zest
        ".drawer__footer-body",
        // [Abid] - theme = Sleek
        ".cart__details--row",
        // [Abid] - theme = Combine
        ".cart__details",
        // [Abid] - theme = Local
        "#CartTotal",
        // [Abid] - theme = Split
        "form.sticky-in-panel ",
        // [Abid] - theme = Xtra
        "ul.l4tt.m15.form-group ",
        // [Abid] - theme = Xtra
        "fieldset aside ul.l4tt.form-group",
        // [Abid] - theme = Next
        "form.f8vl.f8vl-initialized ul.l4tt.form-group",
        // [Abid] - theme = Next
        "div.cart-notification__links",
        // [Abid] - theme = Abode
        "div.ajax-cart__final-details",
        // [Abid] - theme = forge
        "div.cart-purchase__buttons",
        // [Abid] - theme = loft
        "div#CartDrawer",
        // [Abid] - theme = polyform
        "div#main-cart-footer",
        // [Abid] - theme = polyform
        ".cart-sidebar__footer",
        ".mini-cart__footer",
        ".cart-summary",
        ".ajaxcart__footer",
        ".cart__blocks",
        ".cart-template__footer",
        ".quick-cart__footer",
        ".cart__subtotal",
        ".cart-drawer__subtotal",
        ".cart-total-box",
        ".mini-cart__total",
        ".cart-drawer--footer",
        ".thb-cart-form--cart-collaterals",
        ".side-panel-footer",
        ".cart-total",
        ".cart-footer",
        ".mini-cart-footer",
        ".cart-drawer__cart-total",
        ".cart-template__cart-total",
        ".cart-page__block-container",
        ".cart-sidebar__footer",
        ".cart-totals",
        ".sub-total",
        ".main-cart__footer__total",
        ".header-minicart-footer-wrapper",
        ".sticky-menu container",
        "#total-bottom",
        ".money[data-cart-total]",
        ".cart-mini-subtotal",
        ".checkout-subtotal-container",
        ".cart-total-item",
        ".totle-price",
        "#mini-cart-toggle",
        'div[slot="footer"]',
        "safe-sticky",
        ".mini-cart__recap",
        ".card__section",
        'button[form="mini-cart-form"]',
        ".cart__recap",
        ".xo-cart-totals",
        ".xo-cart-mini-footer__price",
        ".cart-total-price",
        ".cart-form__totals",
        'button[type="submit"][name="checkout"]',
        'div[slot="footer"]'
        // 'section[class="pb-section"]'
      ];
      const items = await window.weNexusCartApi.get();
      const checkboxInput = document.querySelector('.wenexus-package-protection__toggle input[type="checkbox"]');
      if (checkboxInput)
        checkboxInput.classList.add("product-variant__input");
      const removeGridFromForgeTheme = () => {
        const dom = document.querySelector("div.ajax-cart__summary-wrapper.js-cart-summary");
        if (dom)
          dom.style.display = "unset";
      };
      removeGridFromForgeTheme();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotals = document.querySelectorAll(selector);
          function replaceTextInDocument(node) {
            const oldText = Number(items.items_subtotal_price / 100).toFixed(2);
            const newText = Number(items.items_subtotal_price / 100 + price).toFixed(2);
            if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.TEXT_NODE)) {
              if (price === 0) {
                const priceWithSubtotal = localStorage.getItem("items_subtotal_price");
                node.textContent = node.textContent.replace(new RegExp(`\\b${priceWithSubtotal}\\b`, "g"), newText);
              } else {
                localStorage.setItem("items_subtotal_price", newText);
                node.textContent = node.textContent.replace(new RegExp(`\\b${oldText}\\b`, "g"), newText);
              }
            } else if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.ELEMENT_NODE)) {
              Array.from(node.childNodes).forEach(replaceTextInDocument);
            }
          }
          subTotals.forEach((subTotal) => {
            replaceTextInDocument(subTotal);
          });
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
  }
  class PackageProtectionClientUniversalForSubTotalTheme extends PackageProtectionClientBasic {
    static shouldUse() {
      return checkTheme(universalForSubTotalTheme);
    }
    // theme support
    async refreshWidget() {
      console.log("universal-for-sub-1");
      const subtotalSelector = [
        ".wt-cart__footer",
        ".wt-cart__footer__body",
        "#main-cart-footer",
        ".drawer__footer",
        ".cart__footer-inner",
        ".quick-cart__footer",
        "cart-footer",
        'button[type="submit"][name="checkout"]',
        ".cart__footer",
        // [Abid] theme = Streamline
        "form.sticky-cart__inner",
        // [Abid] theme = Streamline
        "form#CartPageForm",
        // [Abid] theme = Gem
        ".cart-total-box",
        // [Abid] theme = Fame
        ".cart-drawer__container",
        // [Abid] theme = Gain
        ".cart-template__summary",
        // [Abid] theme = Gain
        ".cart-footer__summary",
        // [Abid] theme = Bootique
        ".cart-drawer__bottom",
        // [Abid] theme = Stockholm
        ".total-holder",
        // [Abid] theme = Kidu
        ".main-cart_cart-totals-wrap",
        // [Abid] theme = Kidu
        ".cart-drawer_foot-wrap",
        // [Abid] theme = Nexa
        ".main-cart_widget--totals",
        // [Abid] theme = Nexa
        ".accordion-wrap",
        // [Abid] theme = Effortless
        ".shopping-cart",
        // [Abid] theme = Effortless
        ".template__cart__footer",
        ".cart-table__checkoutWrp",
        ".cart-subtotal",
        'div[data-element="subtotal-block"]',
        "#cart-drawer-live-region-subtotal",
        "div[data-cart-subtotal-block]",
        "subtotal-price",
        ".cart-footer__subtotal",
        ".cart-totals",
        ".order-summary-card",
        ".more",
        ".subtotal",
        ".subtotal .money ",
        ".cart-drawer-footer-total",
        ".CartDrawer__Total",
        ".Cart__Total",
        ".cart-header-details",
        ".sub--total-cart",
        ".items-baseline",
        ".cart-drawer__totals",
        "#cart-subtotal",
        ".cart__total",
        ".cart--total-price",
        ".cart__summary-total",
        ".cart-drawer__summary-total",
        ".cart-items__total",
        ".cart-drawer__total",
        ".cart__subtotal",
        ".totals__subtotal-value",
        "#CartDetails",
        ".cart__footer ",
        ".cart-summary-line",
        ".cart__details",
        ".cart-recap",
        ".cart-count",
        ".cart-total-price",
        ".cart__subtotal",
        ".ajaxcart__price",
        ".cart__row--table"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotals = document.querySelectorAll(selector);
          function replaceTextInDocument(node) {
            const oldText = Number(items.items_subtotal_price / 100).toFixed(2);
            const newText = Number(items.items_subtotal_price / 100 + price).toFixed(2);
            if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.TEXT_NODE)) {
              if (price === 0) {
                const priceWithSubtotal = localStorage.getItem("items_subtotal_price");
                node.textContent = node.textContent.replace(new RegExp(`\\b${priceWithSubtotal}\\b`, "g"), newText);
              } else {
                localStorage.setItem("items_subtotal_price", newText);
                node.textContent = node.textContent.replace(new RegExp(`\\b${oldText}\\b`, "g"), newText);
              }
            } else if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.ELEMENT_NODE)) {
              Array.from(node.childNodes).forEach(replaceTextInDocument);
            }
          }
          subTotals.forEach((subTotal) => {
            replaceTextInDocument(subTotal);
          });
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
  }
  class PackageProtectionClientSwitchTheme extends PackageProtectionClientBasic {
    static shouldUse() {
      return checkTheme(switchTheme);
    }
    getInsertionPointSelectors() {
      const elements = document.querySelectorAll('button[name="checkout"][type="submit"], input[name="checkout"][type="submit"],button[name="checkout"], a[href="/checkout"], input[type="submit"][value="Checkout"]');
      elements.forEach((element) => {
        if (element.parentElement) {
          element.parentElement.classList.add("wenexus-theme-support");
        }
      });
      return [
        { selector: ".wenexus-theme-support", insertPosition: "before" }
      ];
    }
    // theme support
    async refreshWidget() {
      console.log("switch-1");
      const subtotalSelector = [
        "div[data-cart-footer]",
        'span[x-html="formatMoney(state.total_price)"]',
        "#main-cart-footer",
        ".cart__controls",
        ".cart__footer-inner",
        ".cart-drawer__text",
        ".cart-amount",
        ".cart-drawer__footer",
        ".subtotal_amount",
        ".cart__item-subtotal",
        ".cart-drawer-price-total",
        ".cart-summary-price",
        // [Abid] theme = king
        "div.total.row",
        // [Abid] theme = providence
        "cart-dynamic.flex.gap-4.flex-col",
        // [Abid] theme = Aisle
        'div[x-show="cart.total_price > 0"]',
        // [Abid] theme = space
        ".drawer-inner__footer",
        // [Abid] theme = Noblese
        ".cart-form__footer",
        // [Abid] theme = Noblese
        ".minicart-top__wrapper",
        // [Abid] theme = Baazar
        ".cart-footer_wrapper",
        // [Abid] theme = Baazar
        // 'strong[x-html="Shopify.formatMoney(cart.total_price, true)"]:not(.text-right)',
        // 'span[x-html="Shopify.formatMoney(cart.original_total_price, true)"]:nth-of-type(2)',
        ".cart-popup__footer",
        ".f-drawer__footer",
        ".totals",
        ".cart-summary ",
        ".cart-tot2",
        ".cart-drawer-footer",
        "p[data-cart-subtotal]",
        ".liveCartFooter",
        ".table-container",
        ".product-price",
        ".vendors",
        ".subtotal .theme-money",
        ".cart-total",
        'data-island[x-data="CartFooter"]',
        ".cart__total",
        ".cart__footer ",
        "#CartTotal",
        "cart-dynamic",
        ".sub-total",
        ".cart-totals",
        ".total-amount",
        ".wbcarthtotal",
        ".totals__subtotal-value",
        ".cart-drawer__subtotal"
      ];
      const items = await window.weNexusCartApi.get();
      const subtotal = Array.from(document.querySelectorAll(".cart-drawer__text"));
      subtotal.forEach((item) => {
        item.style.marginBottom = "70px";
      });
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotals = document.querySelectorAll(selector);
          function replaceTextInDocument(node) {
            const oldText = Number(items.items_subtotal_price / 100).toFixed(2);
            const newText = Number(items.items_subtotal_price / 100 + price).toFixed(2);
            if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.TEXT_NODE)) {
              if (price === 0) {
                const priceWithSubtotal = localStorage.getItem("items_subtotal_price");
                node.textContent = node.textContent.replace(new RegExp(`\\b${priceWithSubtotal}\\b`, "g"), newText);
              } else {
                localStorage.setItem("items_subtotal_price", newText);
                node.textContent = node.textContent.replace(new RegExp(`\\b${oldText}\\b`, "g"), newText);
              }
            } else if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.ELEMENT_NODE)) {
              Array.from(node.childNodes).forEach(replaceTextInDocument);
            }
          }
          subTotals.forEach((subTotal) => {
            replaceTextInDocument(subTotal);
          });
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
  }
  class PackageProtectionClientUniversalExponentSubtotalTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(universalForExponentSubtotal);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: 'button[name="checkout"]',
          insertPosition: "before"
        }
      ];
    }
    async getStyleMarkup(options) {
      return super.getStyleMarkup({
        imageWidth: 66,
        containerMargin: [10, 0, 12, 0],
        containerJustify: "end",
        titleFontSize: 1,
        descriptionFontSize: 0.8,
        hideDescriptionPage: false,
        descriptionMargin: [2, 0, 0, 0],
        containerMaxWidth: "250px",
        ...options,
        accentColor: "#2c7e3f"
      });
    }
    // theme support
    async refreshWidget() {
      console.log("exponent subtotal theme");
      const subtotalSelector = [
        // '.cart-drawer__summary div.font-bold',
        "div.cart-drawer__summary.relative.cart-drawer__summary--top.cart-drawer--checkout--sticky-true.cart-drawer--checkout--sticky-desktop-true.cart-drawer--checkout--sticky-mobile-true div.flex.flex-wrap.justify-between.items-center.mb-4 div.font-bold",
        ".cart__summary div.flex.justify-between.items-center p.mb-0.font-bold",
        ".cart__summary div.flex.justify-between.items-center.mt-6 p.font-bold",
        "div.cart__item-sub.cart__item-row.cart__item--subtotal span[aria-hidden='true']"
        // [Abid] theme= fetch
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal) {
            const formattedPrice = this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            );
            const splitPrice = formattedPrice.split(".");
            subTotal.innerHTML = `${splitPrice[0]}<sup>${splitPrice[1]}</sup> ${items.currency}`;
          }
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
  }
  class PackageProtectionClientKingdomTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(kingdomTheme);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: "button[name='checkout']",
          insertPosition: "before"
        },
        {
          selector: ".cart-buttons",
          insertPosition: "before"
        }
      ];
    }
    async getStyleMarkup(options) {
      return super.getStyleMarkup({
        imageWidth: 66,
        containerMargin: [10, 0, 12, 0],
        containerJustify: "end",
        titleFontSize: 1,
        descriptionFontSize: 0.8,
        hideDescriptionPage: false,
        descriptionMargin: [2, 0, 0, 0],
        containerMaxWidth: "250px",
        ...options,
        accentColor: "#2c7e3f"
      });
    }
    // theme support
    async refreshWidget() {
      console.log("kingdomTheme");
      const subtotalSelector = [
        "#CartTotal strong",
        ".cart-summary-line"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = "SUBTOTAL " + this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            );
          } else if (subTotal) {
            subTotal.innerHTML = this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            );
          }
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
  }
  class PackageProtectionClientToyoTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(toyoTheme);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: ".cart-buttons",
          insertPosition: "before"
        },
        {
          selector: ".cart-buttons-container",
          insertPosition: "before"
        },
        {
          selector: "div.shipping_msg.bottompad-half.clearfix shipping-message",
          insertPosition: "after"
        },
        {
          selector: ".cart__aside-inner button[type='submit'].cart__checkout-button",
          insertPosition: "before"
        },
        {
          selector: 'button[form="mini-cart-form"][type="submit"]',
          insertPosition: "before"
        }
      ];
    }
    async getStyleMarkup(options) {
      return super.getStyleMarkup({
        imageWidth: 66,
        containerMargin: [10, 0, 12, 0],
        containerJustify: "end",
        titleFontSize: 1,
        descriptionFontSize: 0.8,
        hideDescriptionPage: false,
        descriptionMargin: [2, 0, 0, 0],
        containerMaxWidth: "250px",
        ...options,
        accentColor: "#2c7e3f"
      });
    }
    doesSelectorContainSubtotal(textContent) {
      if (!textContent)
        return false;
      const numberRegex = /\b\d+(\.\d{2})?\b/;
      return numberRegex.test(textContent);
    }
    doesSelectorContainCheckoutWord(textContent) {
      const checkoutTextRegex = /(\d{4})\b/;
      return checkoutTextRegex.test(textContent);
    }
    // theme support
    async refreshWidget() {
      console.log("Toyo theme");
      const toggleSwitchButtons = document.querySelectorAll(".wenexus-package-protection span.toggle-switch");
      toggleSwitchButtons.forEach((toggleSwitchButton) => {
        toggleSwitchButton.style.padding = "0";
      });
      const subtotalSelector = [
        ".cart-total-price",
        ".cart-price",
        ".cartTotalSelector",
        "#total-cart-top",
        ".cart__total-container span:nth-of-type(2)",
        'button[form="mini-cart-form"][type="submit"]'
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          const executeChange = (selector2) => {
            console.log(this.doesSelectorContainCheckoutWord(selector2.textContent));
            if (selector2 && this.doesSelectorContainSubtotal(selector2.textContent)) {
              if (selector2.tagName === "BUTTON" && window.Shopify.theme.schema_name === "Focal") {
                const formattedPrice = this.formatPrice(
                  Number(items.total_price / 100 + price),
                  items.currency
                );
                selector2.innerHTML = `
               <span class="checkout-button__lock"><svg focusable="false" width="17" height="17" class="icon icon--lock   " viewBox="0 0 17 17">
                <path d="M2.5 7V15H14.5V7H2.5Z" stroke="currentColor" stroke-width="1.5" fill="none"></path>
                <path d="M5.5 4C5.5 2.34315 6.84315 1 8.5 1V1C10.1569 1 11.5 2.34315 11.5 4V7H5.5V4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                <circle cx="8.5" cy="11" r="0.5" stroke="currentColor"></circle>
              </svg></span>Checkout<span class="square-separator"></span>${formattedPrice}</button>
              `;
                return;
              }
              const selectorTextContent = selector2.textContent;
              if (this.doesSelectorContainCheckoutWord(selectorTextContent)) {
                console.log(selectorTextContent);
                selector2.textContent = "Checkout -" + this.formatPrice(
                  Number(items.total_price / 100 + price),
                  items.currency
                ) + " " + items.currency;
                return;
              }
              selector2.textContent = this.formatPrice(
                Number(items.total_price / 100 + price),
                items.currency
              ) + " " + items.currency;
              return;
            }
          };
          let subTotalArr = document.querySelectorAll(selector);
          subTotalArr.forEach((subTotal) => {
            executeChange(subTotal);
          });
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
  }
  class PackageProtectionClientBrickSpaceTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(brickSpaceLabTheme);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: "[name='checkout']",
          insertPosition: "before"
        },
        {
          selector: "div.cart__blocks cart-note",
          insertPosition: "after"
        },
        {
          selector: ".cart-buttons",
          insertPosition: "before"
        }
      ];
    }
    async getStyleMarkup(options) {
      return super.getStyleMarkup({
        imageWidth: 66,
        containerMargin: [10, 0, 12, 0],
        containerJustify: "end",
        titleFontSize: 1,
        descriptionFontSize: 0.8,
        hideDescriptionPage: false,
        descriptionMargin: [2, 0, 0, 0],
        containerMaxWidth: "250px",
        ...options,
        accentColor: "#2c7e3f"
      });
    }
    // theme support
    async refreshWidget() {
      console.log("Space theme");
      const subtotalSelector = [
        ".cart-details-footer",
        ".cart-drawer-subtotal__main-content",
        "div.border--b-width.w-full.p-4.color__bg-tertiary.color__tertiary.color__border-divider-1",
        'button[name="checkout"]',
        "aside",
        'input[name="checkout"]',
        ".cart-total-price",
        ".cart__footer",
        ".cart_notification_links_inner"
        // 'section[class="pb-section"]'
      ];
      const items = await window.weNexusCartApi.get();
      const checkboxInput = document.querySelector('.wenexus-package-protection__toggle input[type="checkbox"]');
      if (checkboxInput)
        checkboxInput.classList.add("product-variant__input");
      const removeGridFromForgeTheme = () => {
        const dom = document.querySelector("div.ajax-cart__summary-wrapper.js-cart-summary");
        if (dom)
          dom.style.display = "unset";
      };
      removeGridFromForgeTheme();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotalArr = document.querySelectorAll(selector);
          function replaceTextInDocument(node) {
            const oldText = Number(items.items_subtotal_price / 100).toFixed(2);
            const newText = Number(items.items_subtotal_price / 100 + price).toFixed(2);
            const performReplaceIfNodeIsInput = () => {
              console.log("node element is input");
              if (price === 0) {
                const priceWithSubtotal = localStorage.getItem("items_subtotal_price");
                const currentValue = node.getAttribute("value");
                if (!currentValue)
                  return;
                const updatedValue = currentValue.replace(new RegExp(`\\b${priceWithSubtotal}\\b`, "g"), newText);
                node.setAttribute("value", updatedValue);
              } else {
                localStorage.setItem("items_subtotal_price", newText);
                const currentValue = node.getAttribute("value");
                if (!currentValue)
                  return;
                const updatedValue = currentValue.replace(new RegExp(`\\b${oldText}\\b`, "g"), newText);
                node.setAttribute("value", updatedValue);
              }
            };
            if (node.tagName === "INPUT") {
              performReplaceIfNodeIsInput();
              return;
            }
            if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.TEXT_NODE)) {
              if (price === 0) {
                const priceWithSubtotal = localStorage.getItem("items_subtotal_price");
                node.textContent = node.textContent.replace(new RegExp(`\\b${priceWithSubtotal}\\b`, "g"), newText);
              } else {
                localStorage.setItem("items_subtotal_price", newText);
                node.textContent = node.textContent.replace(new RegExp(`\\b${oldText}\\b`, "g"), newText);
              }
            } else if ((node == null ? void 0 : node.nodeType) === (Node == null ? void 0 : Node.ELEMENT_NODE)) {
              Array.from(node.childNodes).forEach(replaceTextInDocument);
            }
          }
          subTotalArr.forEach((subTotal) => {
            replaceTextInDocument(subTotal);
          });
        });
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(price);
          updateSubtotal(price);
        } else {
          des = this.disabledDescription;
          updateSubtotal();
          updateSubtotal();
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML = `${des} `
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
  }
  async function packageProtection() {
    var _a, _b, _c, _d;
    const settings = window.WeNexusShipGuardPackageProtectionSettings;
    const clients = [
      PackageProtectionClientShopifyFreeTheme,
      PackageProtectionClientEnterpriseTheme,
      PackageProtectionClientUniversalTheme,
      PackageProtectionClientUniversalForSubTotalTheme,
      PackageProtectionClientSwitchTheme,
      PackageProtectionClientUniversalExponentSubtotalTheme,
      PackageProtectionClientKingdomTheme,
      PackageProtectionClientToyoTheme,
      PackageProtectionClientBrickSpaceTheme,
      PackageProtectionClientBasic
    ];
    const ClientClass = clients.find((Client) => {
      if (Client.shouldUse) {
        return Client.shouldUse();
      }
      return true;
    });
    if (!ClientClass) {
      return console.error("No package protection client found");
    }
    const getItems = async () => (await window.weNexusCartApi.get()).items;
    let items = await getItems();
    const excludeVariants = (_b = (_a = window.WeNexusShipGuardPackageProtectionSettings) == null ? void 0 : _a.packageProtectionProductAndVariants) == null ? void 0 : _b.map((product) => {
      return product.excludedPackageProtectionVariants.map(
        (variant) => Number(variant.id.replace("gid://shopify/ProductVariant/", ""))
      );
    }).flat();
    const checkExcludeVariants = async () => {
      const items2 = await getItems();
      const result2 = [];
      for (let i = 0; i < items2.length; i++) {
        const variantId = items2[i].variant_id;
        if (!(excludeVariants == null ? void 0 : excludeVariants.includes(variantId))) {
          items2[i].sku !== "wenexus-shipping-protection" && result2.push(items2[i]);
        }
      }
      return result2;
    };
    const enabledByDefault = (settings == null ? void 0 : settings.insuranceDisplayButton) ?? false;
    const enabled = () => {
      const value = localStorage.getItem("package-protection-enabled");
      if (value === "false") {
        return false;
      }
      if (value === "true") {
        return true;
      }
      if (value === null) {
        localStorage.setItem(
          "package-protection-enabled",
          enabledByDefault.toString()
        );
        return enabledByDefault;
      }
      return value === "true";
    };
    const packageProtectionApi = new PackageProtectionApi(
      Number(settings == null ? void 0 : settings.percentage),
      enabled()
    );
    const client = new ClientClass(packageProtectionApi);
    let selectors = [];
    if (!(settings == null ? void 0 : settings.defaultSetting)) {
      selectors = ((_c = client.getInsertionPointSelectors) == null ? void 0 : _c.call(
        client,
        (settings == null ? void 0 : settings.position.toLowerCase()) ?? "before",
        settings == null ? void 0 : settings.cssSelector
      )) || [];
    } else {
      selectors = ((_d = client.getInsertionPointSelectors) == null ? void 0 : _d.call(client, "before")) || [];
    }
    const fixedMultiplePlan = settings == null ? void 0 : settings.fixedMultiplePlan;
    const fixedMultipleVariants = settings == null ? void 0 : settings.productVariants;
    const result = fixedMultiplePlan == null ? void 0 : fixedMultiplePlan.map((plan) => {
      const match = fixedMultipleVariants == null ? void 0 : fixedMultipleVariants.find(
        (v) => Number(v.price) === Number(plan.protectionFees)
      );
      if (match) {
        return {
          max: Number(plan.cartMaxPrice),
          min: Number(plan.cartMinPrice),
          variantId: Number(match.id),
          price: Number(match.price)
        };
      }
      return null;
    }).filter((item) => item !== null);
    if ((settings == null ? void 0 : settings.insurancePriceType) === "FIXED_MULTIPLE") {
      packageProtectionApi.setVariants(
        PackageProtectionType.BASED_ON_CART_VALUE,
        result
      );
    } else if ((settings == null ? void 0 : settings.insurancePriceType) === "FIXED_PRICE") {
      const fixedVariant = settings == null ? void 0 : settings.productVariants[0];
      packageProtectionApi.setVariants(PackageProtectionType.FIXED, {
        price: Number(fixedVariant.price),
        variantId: Number(fixedVariant.id)
      });
    } else if ((settings == null ? void 0 : settings.insurancePriceType) === "PERCENTAGE") {
      packageProtectionApi.setVariants(
        PackageProtectionType.PERCENTAGE,
        settings == null ? void 0 : settings.productVariants.reduce(
          (a, b) => {
            a[b.price] = Number(b.id);
            return a;
          },
          {}
        )
      );
    }
    client.thumbnail = settings == null ? void 0 : settings.iconUrl;
    client.title = settings == null ? void 0 : settings.title;
    client.enabledDescription = settings == null ? void 0 : settings.enabledDescription;
    client.disabledDescription = settings == null ? void 0 : settings.disabledDescription;
    client.buttonColor = settings == null ? void 0 : settings.switchColor;
    client.css = settings == null ? void 0 : settings.css;
    client.infoPageLink = settings == null ? void 0 : settings.policyUrl;
    client.checked = enabled();
    if (typeof client.getStyleMarkup === "function") {
      document.head.insertAdjacentHTML(
        "beforeend",
        await client.getStyleMarkup({
          accentColor: "#52c939",
          imageWidth: 48
        })
      );
    }
    const removeHistory = () => {
      window.addEventListener("pageshow", function(event) {
        var historyTraversal = event.persisted || typeof window.performance != "undefined" && window.performance.navigation.type === 2;
        if (historyTraversal) {
          window.location.reload();
        }
      });
    };
    const cartLiveQuery = new window.WeNexusQuerySelectorLive(
      "form[action$='/cart']"
      // button[name='checkout'][type='submit']
    );
    cartLiveQuery.addListener(async (element) => {
      client.cartBubble();
      client.refreshWidget();
      const v = await checkExcludeVariants();
      let submitting = false;
      Array.from(element).forEach((form) => {
        form.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        });
        const button = document.querySelectorAll('button[name="checkout"][type="submit"]');
        const storeTheme = window.Shopify.theme.schema_name;
        if (storeTheme === "Debutify" || storeTheme === "Powerhouse-theme") {
          button.forEach((b) => {
            b.addEventListener("click", async (e) => {
              if (submitting)
                return;
              e.preventDefault();
              client.disabledCheckoutButton();
              submitting = true;
              if (enabled() && v.length > 0) {
                await packageProtectionApi.add();
              } else {
                await packageProtectionApi.remove();
              }
              setTimeout(() => {
                removeHistory();
                window.location.href = "/checkout";
              }, 1e3);
            });
          });
        }
        form.addEventListener("submit", async (e) => {
          if (submitting)
            return;
          e.preventDefault();
          client.disabledCheckoutButton();
          submitting = true;
          if (enabled() && v.length > 0) {
            await packageProtectionApi.add();
          } else {
            await packageProtectionApi.remove();
          }
          removeHistory();
          window.location.href = "/checkout";
        });
      });
    });
    window.weNexusCartApi.addListener(async (_oldCart, _, wait) => {
      client.disabledCheckoutButton();
      await wait();
      await client.refreshPriceUI();
      await client.refreshWidget();
      client.enabledCheckoutButton();
      const items2 = await getItems();
      setTimeout(() => {
        if (items2.length > 0 && (settings == null ? void 0 : settings.packageProtectionProductAndVariants.length) > 0 && window.Shopify.theme.theme_store_id === 887) {
          const itemIds = settings == null ? void 0 : settings.packageProtectionProductAndVariants.map(
            (p) => p.excludedPackageProtectionVariants.map(
              (v) => Number(v.id.split("/").pop())
            )
          );
          const allMatch = items2.every(
            (item) => itemIds.some((id) => id.includes(item.id))
          );
          if (allMatch) {
            Array.from(
              document.querySelectorAll(".wenexus-package-protection")
            ).forEach((el) => el.style.display = "none");
          }
        }
      }, 100);
    }, true);
    for (const selector of selectors) {
      if (selector.shouldUse && !selector.shouldUse()) {
        continue;
      }
      const liveQuery = new window.WeNexusQuerySelectorLive(
        selector.selector,
        selector.boundaryParents
      );
      liveQuery.addListener(async (elements) => {
        items = await getItems();
        client.refreshWidget();
        const PPItem = await items.find(
          (item) => item.sku === "wenexus-shipping-protection"
        );
        if (PPItem == null ? void 0 : PPItem.sku) {
          await packageProtectionApi.remove();
          client.cartUpdate();
        }
        removeHistory();
        const variants = await checkExcludeVariants();
        for (const element of elements) {
          let render = false;
          const { container, checkbox } = await client.getCheckboxContainer(
            selector,
            variants.length > 0 ? enabled() : false
          );
          if (variants.length == 0 && !render) {
            console.log("not render");
          } else {
            render = true;
            switch (selector.insertPosition) {
              case "before":
                element.insertAdjacentElement("beforebegin", container);
                break;
              case "after":
                element.insertAdjacentElement("afterend", container);
                break;
              case "inside":
                element.insertAdjacentElement("afterbegin", container);
                break;
              case "replace":
                element.replaceWith(container);
                break;
            }
            checkbox.addEventListener("change", async () => {
              localStorage.setItem(
                "package-protection-enabled",
                checkbox.checked.toString()
              );
              packageProtectionApi.enabled = enabled();
              checkbox.disabled = true;
              const checkoutButton = document.querySelectorAll(
                'button[name="checkout"]'
              );
              checkoutButton.forEach((e) => e.disabled = true);
              client.refreshWidget();
              checkbox.disabled = false;
              checkoutButton.forEach((e) => e.disabled = false);
            });
          }
        }
      });
    }
  }
  if (document.readyState !== "complete") {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        packageProtection();
      }
    });
  } else {
    packageProtection();
  }
})();
