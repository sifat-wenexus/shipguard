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
        id: 130095644719,
        schema_name: "Dawn",
        name: "Dawn"
      }
    },
    {
      name: "Trade",
      attributes: {
        theme_store_id: 2699,
        id: 133739348054,
        schema_name: "Trade",
        name: "Trade"
      }
    },
    {
      name: "Colorblock",
      attributes: {
        theme_store_id: 1499,
        id: 133739118678,
        schema_name: "Colorblock",
        name: "Colorblock"
      }
    },
    {
      name: "Crave",
      attributes: {
        theme_store_id: 1363,
        id: 133739085910,
        schema_name: "Crave",
        name: "Crave"
      }
    },
    {
      name: "Taste",
      attributes: {
        theme_store_id: 1434,
        id: 133739053142,
        schema_name: "Taste",
        name: "Taste"
      }
    },
    {
      name: "Publisher",
      attributes: {
        theme_store_id: 1864,
        id: 133738987606,
        schema_name: "Publisher",
        name: "Publisher"
      }
    },
    {
      name: "Ride",
      attributes: {
        theme_store_id: 1500,
        id: 133738954838,
        schema_name: "Ride",
        name: "Ride"
      }
    },
    {
      name: "Studio",
      attributes: {
        theme_store_id: 1431,
        id: 133738922070,
        schema_name: "Studio",
        name: "Studio"
      }
    },
    {
      name: "Origin",
      attributes: {
        theme_store_id: 1841,
        id: 133738856534,
        schema_name: "Origin",
        name: "Origin"
      }
    },
    {
      name: "Sense",
      attributes: {
        theme_store_id: 1356,
        id: 133738790998,
        schema_name: "Sense",
        name: "Sense"
      }
    },
    {
      name: "Refresh",
      attributes: {
        theme_store_id: 1567,
        id: 133738758230,
        schema_name: "Refresh",
        name: "Refresh"
      }
    },
    {
      name: "Craft",
      attributes: {
        theme_store_id: 1368,
        id: 133738725462,
        schema_name: "Craft",
        name: "Craft"
      }
    },
    {
      name: "Spotlight",
      attributes: {
        theme_store_id: 1891,
        id: 133738692694,
        schema_name: "Spotlight",
        name: "Spotlight"
      }
    }
  ];
  const troopsTheme = [
    {
      name: "Blockshop",
      attributes: {
        theme_store_id: 606,
        id: 133740167254,
        schema_name: "Blockshop",
        name: "Blockshop"
      }
    },
    {
      name: "Beyond",
      attributes: {
        theme_store_id: 939,
        id: 133741609046,
        schema_name: "Beyond",
        name: "Beyond"
      }
    },
    {
      name: "Maker",
      attributes: {
        theme_store_id: 765,
        id: 133741641814,
        schema_name: "Maker",
        name: "Maker"
      }
    },
    {
      name: "Emerge",
      attributes: {
        theme_store_id: 833,
        id: 138430251101,
        schema_name: "Emerge",
        name: "Emerge"
      }
    }
  ];
  const ReleaseTheme = [
    {
      name: "Release",
      attributes: {
        theme_store_id: 2698,
        id: 133740068950,
        schema_name: "Release",
        name: "Release"
      }
    }
  ];
  const saharaTheme = [
    {
      name: "Sahara",
      attributes: {
        theme_store_id: 1926,
        id: 133740134486,
        schema_name: "Sahara",
        name: "Sahara"
      }
    }
  ];
  const MojabeTheme = [
    {
      name: "Mojave",
      attributes: {
        theme_store_id: 1497,
        id: 138430644317,
        schema_name: "Mojave",
        name: "Mojave"
      }
    }
  ];
  const AtlanticTheme = [
    {
      name: "Atlantic",
      attributes: {
        theme_store_id: 566,
        id: 138429956189,
        schema_name: "Atlantic",
        name: "Atlantic"
      }
    }
  ];
  const empireTheme = [
    {
      name: "Empire",
      attributes: {
        theme_store_id: 838,
        id: 133740036182,
        schema_name: "Empire",
        name: "Empire"
      }
    }
  ];
  const tailorTheme = [
    {
      name: "Tailor",
      attributes: {
        theme_store_id: 1457,
        id: 133744230486,
        schema_name: "Tailor",
        name: "Tailor"
      }
    }
  ];
  const gridTheme = [
    {
      name: "Grid",
      attributes: {
        theme_store_id: 718,
        id: 133742526550,
        schema_name: "Grid",
        name: "Grid"
      }
    }
  ];
  const pixelUnionTheme = [
    {
      name: "Startup",
      attributes: {
        theme_store_id: 652,
        id: 133742821462,
        schema_name: "Startup",
        name: "Startup"
      }
    },
    {
      name: "Editions",
      attributes: {
        theme_store_id: 457,
        id: 138430152797,
        schema_name: "Editions",
        name: "Editions"
      }
    }
  ];
  const woolmanTheme = [
    {
      name: "Taiga",
      attributes: {
        theme_store_id: 1751,
        id: 133740003414,
        schema_name: "Taiga",
        name: "Taiga"
      }
    }
  ];
  const enterpriseTheme = [{
    name: "Enterprise",
    attributes: {
      theme_store_id: 1657,
      id: 138428940381,
      schema_name: "Enterprise",
      name: "Enterprise"
    }
  }];
  const modeTheme = [{
    name: "Mode",
    attributes: {
      theme_store_id: 1578,
      id: 133742919766,
      schema_name: "Mode",
      name: "Mode"
    }
  }];
  const showCase = [{
    name: "Showcase",
    attributes: {
      theme_store_id: 677,
      id: 133739970646,
      schema_name: "Showcase",
      name: "Showcase"
    }
  }];
  const kingdomTheme = [
    {
      name: "Kingdom",
      attributes: {
        theme_store_id: 725,
        id: 138430054493,
        schema_name: "Kingdom",
        name: "Kingdom"
      }
    }
  ];
  const prestigeTheme = [{
    name: "Prestige",
    attributes: {
      theme_store_id: 855,
      id: 138428776541,
      schema_name: "Prestige",
      name: "Prestige"
    }
  }];
  const maestroooTheme = [
    {
      name: "Warehouse",
      attributes: {
        theme_store_id: 871,
        id: 133739905110,
        schema_name: "Warehouse",
        name: "Warehouse"
      }
    },
    {
      name: "Impact",
      attributes: {
        theme_store_id: 1190,
        id: 138429661277,
        schema_name: "Impact",
        name: "Impact"
      }
    },
    {
      name: "Focal",
      attributes: {
        theme_store_id: 714,
        id: 138429071453,
        schema_name: "Focal",
        name: "Focal"
      }
    }
  ];
  const universalTheme = [
    {
      name: "Ascent",
      attributes: {
        theme_store_id: 2989,
        id: 133739872342,
        schema_name: "Ascent",
        name: "Ascent"
      }
    },
    {
      name: "Aurora",
      attributes: {
        theme_store_id: 1770,
        id: 133739839574,
        schema_name: "Aurora",
        name: "Aurora"
      }
    },
    {
      name: "Woodstock",
      attributes: {
        theme_store_id: 2239,
        id: 133739774038,
        schema_name: "Woodstock",
        name: "Woodstock"
      }
    },
    {
      // done by [Abid]
      name: "Alchemy",
      attributes: {
        theme_store_id: 657,
        id: 133741805654,
        schema_name: "Alchemy",
        name: "Alchemy"
      }
    },
    {
      // done by [Abid]
      name: "Boost",
      attributes: {
        theme_store_id: 863,
        id: 133740986454,
        schema_name: "Boost",
        name: "Boost"
      }
    },
    {
      // done by [Abid]
      name: "Symmetry",
      attributes: {
        theme_store_id: 568,
        id: 138428874845,
        schema_name: "Symmetry",
        name: "Symmetry"
      }
    },
    {
      // done by [Abid]
      name: "Masonry",
      attributes: {
        theme_store_id: 450,
        id: 133743640662,
        schema_name: "Masonry",
        name: "Masonry"
      }
    },
    {
      // done by [Abid]
      name: "Expression",
      attributes: {
        theme_store_id: 230,
        id: 133742559318,
        schema_name: "Expression",
        name: "Expression"
      }
    },
    {
      name: "Ignite",
      attributes: {
        theme_store_id: 3027,
        id: 133739741270,
        schema_name: "Ignite",
        name: "Ignite"
      }
    },
    {
      name: "Baseline",
      attributes: {
        theme_store_id: 910,
        id: 133739708502,
        schema_name: "Baseline",
        name: "Baseline"
      }
    },
    {
      name: "Monk",
      attributes: {
        theme_store_id: 2515,
        id: 133739577430,
        schema_name: "Monk",
        name: "Monk"
      }
    },
    {
      name: "Retro",
      attributes: {
        theme_store_id: 2630,
        id: 133739544662,
        schema_name: "Retro",
        name: "Retro"
      }
    },
    {
      name: "Mono",
      attributes: {
        theme_store_id: 1818,
        id: 138429268061,
        schema_name: "Mono",
        name: "Mono"
      }
    },
    {
      // completed by [Abid]
      name: "Zest",
      attributes: {
        theme_store_id: 1611,
        id: 133740953686,
        schema_name: "Zest",
        name: "Zest"
      }
    },
    {
      name: "Vivid",
      attributes: {
        theme_store_id: 2285,
        id: 138429497437,
        schema_name: "Vivid",
        name: "Vivid"
      }
    },
    {
      name: "Frame",
      attributes: {
        theme_store_id: 1716,
        id: 133787877462,
        schema_name: "Frame",
        name: "Frame"
      }
    },
    {
      // completed by [Abid]
      name: "Sleek",
      attributes: {
        theme_store_id: 2821,
        id: 138429104221,
        schema_name: "Sleek",
        name: "Sleek"
      }
    },
    {
      // completed by [Abid]
      name: "Combine",
      attributes: {
        theme_store_id: 1826,
        id: 133740855382,
        schema_name: "Combine",
        name: "Combine"
      }
    },
    {
      // completed by [Abid]
      name: "Borders",
      attributes: {
        theme_store_id: 2491,
        id: 133742952534,
        schema_name: "Borders",
        name: "Borders"
      }
    },
    {
      // completed by [Abid]
      name: "Local",
      attributes: {
        theme_store_id: 1651,
        id: 138429595741,
        schema_name: "Local",
        name: "Local"
      }
    },
    {
      name: "Lorenza",
      attributes: {
        theme_store_id: 798,
        id: 138430578781,
        schema_name: "Lorenza",
        name: "Lorenza"
      }
    },
    {
      name: "Spark",
      attributes: {
        theme_store_id: 911,
        id: 138429825117,
        schema_name: "Spark",
        name: "Spark"
      }
    },
    {
      name: "Flow",
      attributes: {
        theme_store_id: 801,
        id: 133740822614,
        schema_name: "Flow",
        name: "Flow"
      }
    },
    {
      name: "Momentum",
      attributes: {
        theme_store_id: 1600,
        id: 133787811926,
        schema_name: "Momentum",
        name: "Momentum"
      }
    },
    {
      name: "Influence",
      attributes: {
        theme_store_id: 1536,
        id: 133787680854,
        schema_name: "Influence",
        name: "Influence"
      }
    },
    {
      // completed by [Abid]
      name: "Highlight",
      attributes: {
        theme_store_id: 903,
        id: 138430021725,
        schema_name: "Highlight",
        name: "Highlight"
      }
    },
    {
      name: "Fresh",
      attributes: {
        theme_store_id: 908,
        id: 133790662742,
        schema_name: "Fresh",
        name: "Fresh"
      }
    },
    {
      // completed by [Abid]
      name: "Split",
      attributes: {
        theme_store_id: 842,
        id: 138429792349,
        schema_name: "Split",
        name: "Split"
      }
    },
    {
      // completed by [Abid]
      name: "Xtra",
      attributes: {
        theme_store_id: 1609,
        id: 133740789846,
        schema_name: "Xtra",
        name: "Xtra"
      }
    },
    {
      name: "Capital",
      attributes: {
        theme_store_id: 812,
        id: 133742297174,
        schema_name: "Capital",
        name: "Capital"
      }
    },
    {
      name: "Envy",
      attributes: {
        theme_store_id: 411,
        id: 133742329942,
        schema_name: "Envy",
        name: "Envy"
      }
    },
    {
      // completed by [Abid]
      name: "Xclusive",
      attributes: {
        theme_store_id: 2221,
        id: 133741838422,
        schema_name: "Xclusive",
        name: "Xclusive"
      }
    },
    {
      // completed by [Abid]
      name: "Next",
      attributes: {
        theme_store_id: 2240,
        id: 133742657622,
        schema_name: "Next",
        name: "Next"
      }
    },
    {
      name: "Paris",
      attributes: {
        theme_store_id: 2702,
        id: 133740691542,
        schema_name: "Paris",
        name: "Paris"
      }
    },
    {
      // completed by [Abid]
      name: "Forge",
      attributes: {
        theme_store_id: 1492,
        id: 133743476822,
        schema_name: "Forge",
        name: "Forge"
      }
    },
    {
      name: "Habitat",
      attributes: {
        theme_store_id: 1581,
        id: 133740658774,
        schema_name: "Habitat",
        name: "Habitat"
      }
    },
    {
      name: "Pinnacle",
      attributes: {
        theme_store_id: 2852,
        id: 133741314134,
        schema_name: "Pinnacle",
        name: "Pinnacle"
      }
    },
    {
      // completed by [Abid]
      name: "Vantage",
      attributes: {
        theme_store_id: 459,
        id: 133740626006,
        schema_name: "Vantage",
        name: "Vantage"
      }
    },
    {
      // completed by [Abid]
      name: "Drop",
      attributes: {
        theme_store_id: 1197,
        id: 133743870038,
        schema_name: "Drop",
        name: "Drop"
      }
    },
    {
      // completed by [Abid]
      name: "Foodie",
      attributes: {
        theme_store_id: 918,
        id: 133741871190,
        schema_name: "Foodie",
        name: "Foodie"
      }
    },
    {
      name: "Distinctive",
      attributes: {
        theme_store_id: 2431,
        id: 133744361558,
        schema_name: "Distinctive",
        name: "Distinctive"
      }
    },
    {
      // completed by [Abid]
      name: "Icon",
      attributes: {
        theme_store_id: 686,
        id: 133741674582,
        schema_name: "Icon",
        name: "Icon"
      }
    },
    {
      // completed by [Abid]
      name: "Testament",
      attributes: {
        theme_store_id: 623,
        id: 138429726813,
        schema_name: "Testament",
        name: "Testament"
      }
    },
    {
      name: "Vision",
      attributes: {
        theme_store_id: 2053,
        id: 138429628509,
        schema_name: "Vision",
        name: "Vision"
      }
    },
    {
      // completed by [Abid]
      name: "Mr Parker",
      attributes: {
        theme_store_id: 567,
        id: 138429988957,
        schema_name: "Mr Parker",
        name: "Mr Parker"
      }
    },
    {
      // completed by [Abid]
      name: "Fashionopolism",
      attributes: {
        theme_store_id: 141,
        id: 133741117526,
        schema_name: "Fashionopolism",
        name: "Fashionopolism"
      }
    },
    {
      name: "North",
      attributes: {
        theme_store_id: 1460,
        id: 133743509590,
        schema_name: "North",
        name: "North"
      }
    },
    {
      name: "Athens",
      attributes: {
        theme_store_id: 1608,
        id: 133740560470,
        schema_name: "Athens",
        name: "Athens"
      }
    },
    {
      name: "Maranello",
      attributes: {
        theme_store_id: 2186,
        id: 133742985302,
        schema_name: "Maranello",
        name: "Maranello"
      }
    },
    {
      name: "Tokyo",
      attributes: {
        theme_store_id: 2629,
        id: 133789188182,
        schema_name: "Tokyo",
        name: "Tokyo"
      }
    },
    {
      name: "Retina",
      attributes: {
        theme_store_id: 601,
        id: 133740527702,
        schema_name: "Retina",
        name: "Retina"
      }
    },
    {
      name: "Responsive",
      attributes: {
        theme_store_id: 304,
        id: 138430611549,
        schema_name: "Responsive",
        name: "Responsive"
      }
    }
  ];
  const universalForSubTotalTheme = [
    {
      name: "Wonder",
      attributes: {
        theme_store_id: 2684,
        id: 133739675734,
        schema_name: "Wonder",
        name: "Wonder"
      }
    },
    {
      name: "Honey",
      attributes: {
        theme_store_id: 2160,
        id: 133740920918,
        schema_name: "Honey",
        name: "Honey"
      }
    },
    {
      name: "Cornerstone",
      attributes: {
        theme_store_id: 2348,
        id: 133741412438,
        schema_name: "Cornerstone",
        name: "Cornerstone"
      }
    },
    {
      name: "Stiletto",
      attributes: {
        theme_store_id: 1621,
        id: 138429202525,
        schema_name: "Stiletto",
        name: "Stiletto"
      }
    },
    {
      name: "Bullet",
      attributes: {
        theme_store_id: 1114,
        id: 133740757078,
        schema_name: "Bullet",
        name: "Bullet"
      }
    },
    {
      name: "Reformation",
      attributes: {
        theme_store_id: 1762,
        id: 138429235293,
        schema_name: "Reformation",
        name: "Reformation"
      }
    },
    {
      // completed by [Abid]
      name: "Streamline",
      attributes: {
        theme_store_id: 872,
        id: 133740593238,
        schema_name: "Streamline",
        name: "Streamline"
      }
    },
    {
      // completed by [Abid]
      name: "Gem",
      attributes: {
        theme_store_id: 2222,
        id: 133744427094,
        schema_name: "Gem",
        name: "Gem"
      }
    },
    {
      // completed by [Abid]
      name: "Impulse",
      attributes: {
        theme_store_id: 857,
        id: 138428809309,
        schema_name: "Impulse",
        name: "Impulse"
      }
    },
    {
      // completed by [Abid]
      name: "Motion",
      attributes: {
        theme_store_id: 847,
        id: 138429005917,
        schema_name: "Motion",
        name: "Motion"
      }
    },
    {
      // completed by [Abid]
      name: "Essentials",
      attributes: {
        theme_store_id: 2482,
        id: 133740494934,
        schema_name: "Essentials",
        name: "Essentials"
      }
    },
    {
      // completed by [Abid]
      name: "Nordic",
      attributes: {
        theme_store_id: 2801,
        id: 133742133334,
        schema_name: "Nordic",
        name: "Nordic"
      }
    },
    {
      // completed by [Abid]
      name: "Aesthetic",
      attributes: {
        theme_store_id: 2514,
        id: 133790859350,
        schema_name: "Aesthetic",
        name: "Aesthetic"
      }
    }
  ];
  const universalForExponentSubtotal = [
    {
      // completed by [Abid]
      name: "Canopy",
      attributes: {
        theme_store_id: 732,
        id: 133739937878,
        schema_name: "Canopy",
        name: "Canopy"
      }
    },
    {
      // completed by [Abid]
      name: "Fetch",
      attributes: {
        theme_store_id: 1949,
        id: 138430218333,
        schema_name: "Fetch",
        name: "Fetch"
      }
    },
    {
      // completed by [Abid]
      name: "Expanse",
      attributes: {
        theme_store_id: 902,
        id: 138429562973,
        schema_name: "Expanse",
        name: "Expanse"
      }
    }
  ];
  const switchTheme = [
    // {
    //   name: 'Baseline',
    //   attributes: {
    //     theme_store_id: 910,
    //     id: 133739708502,
    //     schema_name: 'Baseline',
    //     name: 'Baseline',
    //   },
    // },
    {
      name: "Exhibit",
      attributes: {
        theme_store_id: 1828,
        id: 133741543510,
        schema_name: "Exhibit",
        name: "Exhibit"
      }
    },
    {
      name: "Shapes",
      attributes: {
        theme_store_id: 1535,
        id: 138429169757,
        schema_name: "Shapes",
        name: "Shapes"
      }
    },
    {
      name: "Cascade",
      attributes: {
        theme_store_id: 859,
        id: 133741379670,
        schema_name: "Cascade",
        name: "Cascade"
      }
    },
    {
      name: "Label",
      attributes: {
        theme_store_id: 773,
        id: 138430709853,
        schema_name: "Label",
        name: "Label"
      }
    },
    {
      name: "Venue",
      attributes: {
        theme_store_id: 836,
        id: 133739642966,
        schema_name: "Venue",
        name: "Venue"
      }
    },
    {
      name: "Creative",
      attributes: {
        theme_store_id: 1829,
        id: 133743738966,
        schema_name: "Creative",
        name: "Creative"
      }
    },
    {
      name: "Eclipse",
      attributes: {
        theme_store_id: 3070,
        id: 133740888150,
        schema_name: "Eclipse",
        name: "Eclipse"
      }
    },
    {
      name: "Electro",
      attributes: {
        theme_store_id: 2164,
        id: 133740724310,
        schema_name: "Electro",
        name: "Electro"
      }
    },
    {
      name: "Shine",
      attributes: {
        theme_store_id: 2576,
        id: 133743607894,
        schema_name: "Shine",
        name: "Shine"
      }
    },
    {
      name: "Blum",
      attributes: {
        theme_store_id: 1839,
        id: 138429530205,
        schema_name: "Blum",
        name: "Blum"
      }
    },
    {
      name: "Parallax",
      attributes: {
        theme_store_id: 688,
        id: 133741477974,
        schema_name: "Parallax",
        name: "Parallax"
      }
    },
    {
      // to be completed by [Abid]
      name: "Veena",
      attributes: {
        theme_store_id: 2566,
        id: 133740462166,
        schema_name: "Veena",
        name: "Veena"
      }
    }
  ];
  const checkTheme = (themes) => {
    const currentTheme = window.Shopify.theme || {};
    const isSupportedTheme = themes == null ? void 0 : themes.some(
      (theme) => Object.values(theme.attributes).some(
        (value) => Object.values(currentTheme).includes(value)
      )
    );
    return isSupportedTheme;
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
      const price = Number(getPrice.replace(/[^0-9.]/g, ""));
      return price;
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
      descriptionFontWeight = "bold",
      descriptionFontSize = 0.8,
      descriptionMargin = [0, 0, 0, 0],
      titleFontSize = 1.4,
      hideDescriptionPage = true,
      containerMargin = [0, 0, 8, 0],
      containerJustify = "end",
      extraStyles = "",
      textAlign = "left",
      containerMaxWidth = "100%"
    }) {
      return `
      <style>
         .wenexus-package-protection {
            display: flex;
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
            max-width: ${imageWidth}px;
            max-height: ${imageWidth}px;

         }
         
         .wenexus-package-protection__image img {
            width: 100%;
         }
         .wenexus-package-protection__desc{
            text-align: ${textAlign};
            max-width: ${containerMaxWidth};
         }

         .wenexus-package-protection__desc h5 {
            font-size:16px;
            margin: 0;
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
          // boundaryParents: new Set([document.body]),
          // boundaryParents: new Set(
          //   Array.from(document.querySelectorAll('cart-drawer'))
          // ),
        },
        {
          selector: ".cart-notification__links",
          insertPosition: "before",
          boundaryParents: new Set(
            Array.from(document.querySelectorAll("cart-notification"))
          )
        }
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
      let subTotal = document.getElementsByClassName("totals__total-value");
      const items = await window.weNexusCartApi.get();
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          Array.from(subTotal).forEach(
            (el) => el.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            )} ${items.currency}`
          );
        } else {
          des = this.disabledDescription;
          Array.from(subTotal).forEach(
            (el) => el.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100),
              items.currency
            )} ${items.currency}`
          );
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
  class PackageProtectionClientMileHigh extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(troopsTheme);
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
      console.log("Mile High Themes-1");
      let subTotal = document.querySelectorAll(".cart--total-price");
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (selector, price = 0) => {
        Array.from(selector).forEach(
          (el) => el.innerHTML = `<strong>${this.formatPrice(
            Number(items.total_price / 100 + price),
            items.currency
          )} ${items.currency}</strong>`
        );
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(subTotal, price);
        } else {
          des = this.disabledDescription;
          updateSubtotal(subTotal);
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
    // async cartBubble() {
    //   const item_count = (await window.weNexusCartApi.get()).item_count;
    //   let cartIcon = document.getElementById('CartCount');
    //   cartIcon!.innerHTML = item_count.toString();
    // }
  }
  class PackageProtectionClientDigiFist extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(ReleaseTheme);
    }
    getInsertionPointSelectors() {
      return [
        { selector: ".cart-drawer__action-buttons", insertPosition: "before" },
        { selector: ".cart__terms", insertPosition: "before" }
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
      console.log("ReleaseTheme-3");
      let subTotal = document.getElementsByClassName("cart__summary-total");
      let drawerSubTotal = document.getElementsByClassName(
        "cart-drawer__summary-total"
      );
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (selector, price = 0) => {
        Array.from(selector).forEach(
          (el) => el.lastElementChild.innerHTML = `<strong>${this.formatPrice(
            Number(items.total_price / 100 + price),
            items.currency
          )} ${items.currency}</strong>`
        );
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(subTotal, price);
          updateSubtotal(drawerSubTotal, price);
        } else {
          des = this.disabledDescription;
          updateSubtotal(subTotal);
          updateSubtotal(drawerSubTotal);
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
    // async cartBubble() {
    //   const item_count = (await window.weNexusCartApi.get()).item_count;
    //   let cartIcon = document.getElementById('CartCount');
    //   cartIcon!.innerHTML = item_count.toString();
    // }
  }
  class PackageProtectionClientsSharaTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(saharaTheme);
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
      console.log("saharaTheme-1");
      let subTotal = document.getElementsByClassName(
        "cart-drawer__summary-total"
      );
      let cartSubTotal = document.getElementsByClassName("cart__summary-total");
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (selector, price = 0) => {
        Array.from(selector).forEach(
          (el) => el.lastElementChild.innerHTML = `${this.formatPrice(
            Number(items.total_price / 100 + price),
            items.currency
          )} ${items.currency}`
        );
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(subTotal, price);
          updateSubtotal(cartSubTotal, price);
        } else {
          des = this.disabledDescription;
          updateSubtotal(subTotal);
          updateSubtotal(cartSubTotal);
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
  class PackageProtectionClientsMojabeTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(MojabeTheme);
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
      console.log("saharaTheme-1");
      let subTotal = document.getElementsByClassName("cart-drawer__total");
      let cartSubTotal = document.getElementsByClassName("cart-items__total");
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (selector, price = 0) => {
        Array.from(selector).forEach(
          (el) => el.lastElementChild.innerHTML = `${this.formatPrice(
            Number(items.total_price / 100 + price),
            items.currency
          )} ${items.currency}`
        );
      };
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          updateSubtotal(subTotal, price);
          updateSubtotal(cartSubTotal, price);
        } else {
          des = this.disabledDescription;
          updateSubtotal(subTotal);
          updateSubtotal(cartSubTotal);
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
  class PackageProtectionClientspixelTaigaTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(woolmanTheme);
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
      console.log("taiga-1");
      const subtotalSelector = [
        ".cart__subtotal"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            ) + items.currency;
          } else if (subTotal) {
            subTotal.innerHTML = this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            ) + items.currency;
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
  class PackageProtectionClientAtlanticTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(AtlanticTheme);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: ".cart-mini-actions",
          insertPosition: "before"
        },
        { selector: ".cart-submit", insertPosition: "before" }
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
      console.log("atlanticTheme-1");
      const subtotalSelector = [".money[data-cart-total]", ".cart-mini-subtotal"];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = this.formatPrice(
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
  class PackageProtectionClientEmpireTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(empireTheme);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: ".cart-checkout",
          insertPosition: "before"
        }
        // { selector: '.cart-submit', insertPosition: 'before' },
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
      const subtotalSelector = [
        ".money[data-cart-total]",
        ".cart-mini-subtotal",
        ".cart-subtotal"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = this.formatPrice(
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
  class PackageProtectionClientTailorTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(tailorTheme);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: 'button[name="checkout"]',
          insertPosition: "before"
        }
        // { selector: '.cart-submit', insertPosition: 'before' },
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
      const subtotalSelector = ['button[name="checkout"]', ".cart__subtotal"];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild && subTotal.lastChild) {
            subTotal.lastElementChild.innerHTML = this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            ) + items.currency;
            subTotal.lastChild.textContent = "";
          }
          const sub = document.querySelector(".cart__subtotal");
          if (sub == null ? void 0 : sub.lastElementChild) {
            sub.lastElementChild.innerHTML = this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            ) + items.currency;
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
  class PackageProtectionClientGridTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(gridTheme);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: ".cart-buttons-container",
          insertPosition: "before"
        },
        { selector: ".mini-cart-footer", insertPosition: "before" }
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
      const subtotalSelector = [".money[data-total-price]", ".cart-price"];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = this.formatPrice(
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
  class PackageProtectionClientspixelUnionTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(pixelUnionTheme);
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
      console.log("pixel union-1");
      const subtotalSelector = [
        ".cart__subtotal",
        ".cart-title-total",
        ".cart-subtotal",
        ".cart-price"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = this.formatPrice(
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
  class PackageProtectionClientCleanShowCaseTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(showCase);
    }
    getInsertionPointSelectors() {
      return [
        {
          selector: 'input[name="checkout"]',
          insertPosition: "before"
        }
      ];
    }
    async getStyleMarkup(options) {
      return super.getStyleMarkup({
        imageWidth: 66,
        containerMargin: [15, 0, 15, 0],
        containerJustify: "center",
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
      console.log("showCase theme");
      const subtotalSelector = [
        // '.cart__subtotal',
        // '.cart-title-total',
        // '.cart-subtotal',
        // '.cart-price',
        ".subtotal .theme-money"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
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
  class PackageProtectionClientModeTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(modeTheme);
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
      console.log("mode theme-1");
      const subtotalSelector = [
        ".cart__subtotal",
        ".cart-title-total",
        ".cart-subtotal",
        ".cart-price"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = this.formatPrice(
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
      console.log("enterpriseTheme-2");
      window.location.reload();
    }
  }
  class PackageProtectionClientPrestigeTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(prestigeTheme);
    }
    // theme support
    async refreshWidget() {
      const subtotalSelector = ['div[part="footer"]', ".cart-recap", 'footer[part="footer"]', 'button[name="checkout"]'];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
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
          replaceTextInDocument(subTotal);
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
  class PackageProtectionClientMeastrooTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      return checkTheme(maestroooTheme);
    }
    getInsertionPointSelectors() {
      return [
        { selector: ".mini-cart__button-container", insertPosition: "before" },
        { selector: ".cart-recap__notices", insertPosition: "after" },
        { selector: ".buy-buttons--compact", insertPosition: "before" },
        { selector: "cart-note", insertPosition: "after" },
        { selector: 'button[form="mini-cart-form"]', insertPosition: "before" },
        { selector: ".cart__checkout-button", insertPosition: "before" }
        // {
        //   selector: 'button[name="checkout"]',
        //   insertPosition: 'before',
        // },
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
      console.log("mestroo-3");
      const subtotalSelector = ['div[slot="footer"]', "safe-sticky", ".mini-cart__recap", ".card__section", 'button[form="mini-cart-form"]', ".cart__recap"];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
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
          replaceTextInDocument(subTotal);
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
        { selector: ".cart__shipping", insertPosition: "after" },
        // Abid theme=combine
        // { selector: '.cart-details .flex-buttons', insertPosition: 'before' }, // Abid theme=kingdom
        { selector: "#CartDetails", insertPosition: "before" },
        // Abid theme=kingdom
        { selector: "form.sticky-in-panel .link-btn", insertPosition: "before" },
        // Abid theme=Xtra
        { selector: "aside:not([class]) .overlay-dynamic_buy_button", insertPosition: "before" },
        // Abid theme=Xtra
        { selector: "form.f8vl.f8vl-initialized p.link-btn.text-justify", insertPosition: "before" },
        // Abid theme=NExt
        { selector: "fieldset aside p.link-btn.wide", insertPosition: "before" },
        // Abid theme=NExt
        { selector: "form.ajax-cart__cart-form.grid__wrapper.narrow.mb4.js-cart-form div.ajax-cart__buttons", insertPosition: "before" },
        // Abid theme=forge
        { selector: "form.ajax-cart__cart-form.grid__wrapper.edge.js-cart-form div.ajax-cart__buttons", insertPosition: "before" },
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
        { selector: ".add-to-cart-wrap", insertPosition: "before" }
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
        "div.ajax-cart__final-details",
        // [Abid] - theme = forge
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
        ".cart-template__cart-total"
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
          let subTotal = document.querySelector(selector);
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
          replaceTextInDocument(subTotal);
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
        "form#CartPageForm"
        // [Abid] theme = Gem
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
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
          replaceTextInDocument(subTotal);
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
      const elements = document.querySelectorAll('button[name="checkout"][type="submit"], input[name="checkout"][type="submit"],input[type="submit"]');
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
        ".cart__item-subtotal"
      ];
      const items = await window.weNexusCartApi.get();
      const subtotal = Array.from(document.querySelectorAll(".cart-drawer__text"));
      subtotal.forEach((item) => {
        item.style.marginBottom = "70px";
      });
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
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
          replaceTextInDocument(subTotal);
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
        ".cart-drawer__summary div.font-bold",
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
        "#CartTotal strong"
      ];
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (price = 0) => {
        subtotalSelector.forEach((selector) => {
          let subTotal = document.querySelector(selector);
          if (subTotal && subTotal.lastElementChild) {
            subTotal.lastElementChild.innerHTML = this.formatPrice(
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
  async function packageProtection() {
    var _a, _b, _c, _d;
    const settings = window.WeNexusShipGuardPackageProtectionSettings;
    const clients = [
      PackageProtectionClientShopifyFreeTheme,
      // PackageProtectionClientMulti,
      // PackageProtectionClientFocal,
      // PackageProtectionClientMandolin,
      // PackageProtectionClientVenue,
      PackageProtectionClientMileHigh,
      PackageProtectionClientDigiFist,
      PackageProtectionClientsSharaTheme,
      PackageProtectionClientsMojabeTheme,
      PackageProtectionClientspixelUnionTheme,
      PackageProtectionClientAtlanticTheme,
      PackageProtectionClientEmpireTheme,
      PackageProtectionClientTailorTheme,
      PackageProtectionClientGridTheme,
      PackageProtectionClientspixelTaigaTheme,
      PackageProtectionClientMeastrooTheme,
      PackageProtectionClientEnterpriseTheme,
      PackageProtectionClientCleanShowCaseTheme,
      PackageProtectionClientModeTheme,
      PackageProtectionClientPrestigeTheme,
      PackageProtectionClientUniversalTheme,
      PackageProtectionClientUniversalForSubTotalTheme,
      PackageProtectionClientSwitchTheme,
      PackageProtectionClientUniversalExponentSubtotalTheme,
      PackageProtectionClientKingdomTheme,
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
      "form[action='/cart']"
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
          if (variants.length == 0 && render && window.Shopify.theme.theme_store_id === 887)
            ;
          else {
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
