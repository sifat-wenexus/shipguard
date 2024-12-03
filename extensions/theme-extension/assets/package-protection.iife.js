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
      const excludeVariants = window.WeNexusOverallPackageProtectionSettings.packageProtectionProductAndVariants.map((product) => {
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
  class PackageProtectionClientBasic {
    constructor(api) {
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/1652/8827/files/g4990.png?v=1708754054");
      __publicField(this, "infoPageLink", "/pages/package-protection");
      __publicField(this, "container", null);
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
    async getCheckboxContainer(checked) {
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
            <input type="checkbox" ${checked ? "checked" : ""} style="position:absolute; width:100%; height:100%; left:0; z-index:99; opacity:0">

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
      this.container = container;
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
      if (this.container) {
        this.container.querySelector(".protection-price").textContent = await this.getPrice();
      }
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
  class PackageProtectionClientMulti extends PackageProtectionClientBasic {
    static shouldUse() {
      var _a;
      return ((_a = window.Shopify.theme) == null ? void 0 : _a.schema_name) === "Multi" || document.documentElement.dataset.theme === "multi";
    }
    getBoundaryParent(selector) {
      if (selector.boundaryParents) {
        return selector;
      }
      const elements = document.querySelectorAll(selector.selector);
      const boundaryParents = /* @__PURE__ */ new Set();
      for (const element of elements) {
        let boundaryParent = element.parentElement;
        while (true) {
          if (!boundaryParent) {
            break;
          }
          if (boundaryParent.tagName === "CART-LIVE-REGION") {
            break;
          }
          boundaryParent = boundaryParent.parentElement;
        }
        boundaryParents.add(boundaryParent ?? document.body);
      }
      if (boundaryParents.size === 0) {
        boundaryParents.add(document.body);
      }
      selector.boundaryParents = boundaryParents;
      return selector;
    }
    getInsertionPointSelectors() {
      const selectors = [
        {
          selector: 'button[name="checkout"]',
          insertPosition: "before"
        }
      ];
      return selectors.map((selector) => this.getBoundaryParent(selector));
    }
    // theme support
    async refreshWidget() {
      const subTotals = [];
      let subTotal = document.getElementsByClassName("#cart-subtotal-item-price");
      let subTotalDrawer = document.getElementsByClassName(
        "#cart-drawer-subtotal-item-price"
      );
      subTotals.push(Array.from(subTotal));
      subTotals.push(Array.from(subTotalDrawer));
      const items = await window.weNexusCartApi.get();
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          subTotals.flat().forEach(
            (el) => el.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            )} ${items.currency}`
          );
        } else {
          des = this.disabledDescription;
          subTotals.flat().forEach(
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
      window.location.reload();
    }
    async cartBubble() {
      const item_count = (await window.weNexusCartApi.get()).item_count;
      let cartIcon = document.getElementsByClassName(
        "#header-toolbar-cart-counter"
      );
      Array.from(cartIcon).forEach((el) => {
        el.childNodes.forEach((e) => {
          if (e.innerHTML) {
            e.innerHTML = item_count.toString();
          }
        });
      });
    }
  }
  class PackageProtectionClientEnterprise extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      var _a;
      return ((_a = window.Shopify.theme) == null ? void 0 : _a.name) === "Enterprise";
    }
    getBoundaryParent(selector) {
      if (selector.boundaryParents) {
        return selector;
      }
      const elements = document.querySelectorAll(selector.selector);
      const boundaryParents = /* @__PURE__ */ new Set();
      for (const element of elements) {
        let boundaryParent = element.parentElement;
        while (true) {
          if (!boundaryParent) {
            break;
          }
          if (boundaryParent.tagName === "CART-DRAWER") {
            break;
          }
          boundaryParent = boundaryParent.parentElement;
        }
        boundaryParents.add(boundaryParent ?? document.body);
      }
      if (boundaryParents.size === 0) {
        boundaryParents.add(document.body);
      }
      selector.boundaryParents = boundaryParents;
      return selector;
    }
    getInsertionPointSelectors() {
      const selectors = [
        {
          selector: 'button[name="checkout"]',
          insertPosition: "before"
        }
      ];
      return selectors.map((selector) => this.getBoundaryParent(selector));
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
      let subTotal = document.getElementsByClassName("subtotal-cartPage");
      const checkoutButtonPrice = Array.from(
        document.querySelectorAll(".subtotal-cartDrawer")
      );
      const items = await window.weNexusCartApi.get();
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          Array.from(subTotal).forEach(
            (el) => el.innerHTML && (el.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            )} ${items.currency}`)
          );
          checkoutButtonPrice.forEach((e) => {
            e.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            )} ${items.currency}`;
          });
        } else {
          des = this.disabledDescription;
          Array.from(subTotal).forEach(
            (el) => el.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100),
              items.currency
            )} ${items.currency}`
          );
          checkoutButtonPrice.forEach(
            (e) => e.innerHTML = `${this.formatPrice(
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
      window.location.reload();
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
  class PackageProtectionClientShopifyFreeTheme extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      return ((_a = window.Shopify.theme) == null ? void 0 : _a.theme_store_id) === 887 || // Dawn
      ((_b = window.Shopify.theme) == null ? void 0 : _b.theme_store_id) === 1891 || // Spotlight
      ((_c = window.Shopify.theme) == null ? void 0 : _c.theme_store_id) === 1567 || // Refresh
      ((_d = window.Shopify.theme) == null ? void 0 : _d.theme_store_id) === 1368 || // Craft
      ((_e = window.Shopify.theme) == null ? void 0 : _e.theme_store_id) === 1356 || // Sense
      ((_f = window.Shopify.theme) == null ? void 0 : _f.theme_store_id) === 1864 || // Publisher
      ((_g = window.Shopify.theme) == null ? void 0 : _g.theme_store_id) === 1841 || // Origin
      ((_h = window.Shopify.theme) == null ? void 0 : _h.theme_store_id) === 1499 || // Colorblock
      ((_i = window.Shopify.theme) == null ? void 0 : _i.theme_store_id) === 1500 || // Ride
      ((_j = window.Shopify.theme) == null ? void 0 : _j.theme_store_id) === 1431 || // Studio
      ((_k = window.Shopify.theme) == null ? void 0 : _k.theme_store_id) === 1434 || // Taste
      ((_l = window.Shopify.theme) == null ? void 0 : _l.theme_store_id) === 1363 || // Crave
      ((_m = window.Shopify.theme) == null ? void 0 : _m.theme_store_id) === 2699;
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
          insertPosition: position ?? "before"
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
      const c = this.container;
      if (c) {
        const protectionPrice = document.getElementsByClassName("protection-price");
        let latestPrice = "";
        Array.from(c == null ? void 0 : c.getElementsByClassName("protection-price")).forEach(
          (widget) => latestPrice = widget.innerHTML
        );
        Array.from(protectionPrice).forEach((el) => el.innerHTML = latestPrice);
      }
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
  class PackageProtectionClientFocal extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      var _a;
      return ((_a = window.Shopify.theme) == null ? void 0 : _a.schema_name) === "Focal";
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
        containerJustify: "space-between",
        titleFontSize: 1.2,
        descriptionFontSize: 0.9,
        hideDescriptionPage: false,
        descriptionMargin: [2, 0, 0, 0],
        ...options,
        accentColor: "#2c7e3f"
      });
    }
    // theme support
    async refreshWidget() {
      let subTotal = document.getElementsByClassName("cart__total-container");
      const checkoutButtonPrice = Array.from(
        document.querySelectorAll("button[form='mini-cart-form']")
      );
      const items = await window.weNexusCartApi.get();
      setTimeout(() => {
        const price = this.getWidgetPrice();
        const checkoutSwitch = localStorage.getItem("package-protection-enabled");
        let des = "";
        if (checkoutSwitch === "true") {
          des = this.enabledDescription;
          Array.from(subTotal).forEach(
            (el) => el.lastElementChild && (el.lastElementChild.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            )} ${items.currency}`)
          );
          checkoutButtonPrice.forEach((e) => {
            e.lastChild.textContent = `${this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            )} ${items.currency}`;
          });
        } else {
          des = this.disabledDescription;
          Array.from(subTotal).forEach(
            (el) => el.lastElementChild && (el.lastElementChild.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100),
              items.currency
            )} ${items.currency}`)
          );
          checkoutButtonPrice.forEach(
            (e) => e.lastChild.textContent = `${this.formatPrice(
              Number(items.total_price / 100),
              items.currency
            )} ${items.currency}`
          );
        }
        const descriptionElements = document.getElementsByClassName(
          "wenexus-package-protection-description"
        );
        Array.from(descriptionElements).forEach(
          (el) => el.innerHTML && (el.innerHTML = `${des} `)
        );
      }, 500);
    }
    cartUpdate() {
      window.location.reload();
    }
    async cartBubble() {
      const item_count = (await window.weNexusCartApi.get()).item_count;
      let cartIcon = document.getElementsByClassName("header__cart-count");
      Array.from(cartIcon).forEach((el) => {
        el.childNodes.forEach((e) => {
          if (e.innerHTML) {
            e.innerHTML = item_count.toString();
          }
        });
      });
    }
  }
  class PackageProtectionClientMandolin extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      var _a;
      return ((_a = window.Shopify.theme) == null ? void 0 : _a.schema_name) === "Mandolin";
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
        containerJustify: "space-between",
        titleFontSize: 1.2,
        descriptionFontSize: 0.8,
        hideDescriptionPage: false,
        descriptionMargin: [2, 0, 0, 0],
        ...options,
        accentColor: "#2c7e3f"
      });
    }
    // theme support
    async refreshWidget() {
      let subTotal = document.getElementsByClassName("cart__total-count");
      const checkoutButtonPrice = Array.from(
        document.querySelectorAll(".Cart__Total")
      );
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
          checkoutButtonPrice.forEach((e) => {
            e.lastChild.textContent = `${this.formatPrice(
              Number(items.total_price / 100 + price),
              items.currency
            )} ${items.currency}`;
          });
        } else {
          des = this.disabledDescription;
          Array.from(subTotal).forEach(
            (el) => el.innerHTML = `${this.formatPrice(
              Number(items.total_price / 100),
              items.currency
            )} ${items.currency}`
          );
          checkoutButtonPrice.forEach(
            (e) => e.lastChild.textContent = `${this.formatPrice(
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
      window.location.reload();
    }
    async cartBubble() {
      const item_count = (await window.weNexusCartApi.get()).item_count;
      let cartIcon = document.getElementsByClassName("header__cart-count");
      Array.from(cartIcon).forEach((el) => {
        el.childNodes.forEach((e) => {
          if (e.innerHTML) {
            e.innerHTML = item_count.toString();
          }
        });
      });
    }
  }
  class PackageProtectionClientVenue extends PackageProtectionClientBasic {
    constructor() {
      super(...arguments);
      __publicField(this, "thumbnail", "https://cdn.shopify.com/s/files/1/0010/3134/0085/files/pp-caliconnected.png?v=1716625753");
    }
    static shouldUse() {
      var _a;
      return ((_a = window.Shopify.theme) == null ? void 0 : _a.schema_name) === "Venue";
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
      let subTotal = document.getElementsByClassName("cart__footer-total");
      let subtotalInPopup = document.getElementsByClassName(
        "ajaxcart__footer-total"
      );
      const items = await window.weNexusCartApi.get();
      const updateSubtotal = (selector, price = 0) => {
        Array.from(selector).forEach(
          (el) => el.lastChild.innerHTML = `${this.formatPrice(
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
          updateSubtotal(subtotalInPopup, price);
        } else {
          des = this.disabledDescription;
          updateSubtotal(subTotal);
          updateSubtotal(subtotalInPopup);
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
    async cartBubble() {
      const item_count = (await window.weNexusCartApi.get()).item_count;
      let cartIcon = document.getElementById("CartCount");
      cartIcon.innerHTML = item_count.toString();
    }
  }
  async function packageProtection() {
    var _a, _b, _c, _d;
    const settings = window.WeNexusOverallPackageProtectionSettings;
    const clients = [
      PackageProtectionClientShopifyFreeTheme,
      PackageProtectionClientMulti,
      PackageProtectionClientEnterprise,
      PackageProtectionClientFocal,
      PackageProtectionClientMandolin,
      PackageProtectionClientVenue,
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
    const excludeVariants = (_b = (_a = window.WeNexusOverallPackageProtectionSettings) == null ? void 0 : _a.packageProtectionProductAndVariants) == null ? void 0 : _b.map((product) => {
      return product.excludedPackageProtectionVariants.map(
        (variant) => Number(variant.id.replace("gid://shopify/ProductVariant/", ""))
      );
    }).flat();
    const checkExcludeVariants = () => {
      const result2 = [];
      for (let i = 0; i < items.length; i++) {
        const variantId = items[i].variant_id;
        if (!excludeVariants.includes(variantId)) {
          items[i].sku !== "wenexus-shipping-protection" && result2.push(items[i]);
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
      Number(settings.percentage),
      enabled()
    );
    const client = new ClientClass(packageProtectionApi);
    let selectors = [];
    if (!settings.defaultSetting) {
      selectors = ((_c = client.getInsertionPointSelectors) == null ? void 0 : _c.call(
        client,
        settings.position.toLowerCase() ?? "before",
        settings.cssSelector
      )) || [];
    } else {
      selectors = ((_d = client.getInsertionPointSelectors) == null ? void 0 : _d.call(client, "before")) || [];
    }
    const fixedMultiplePlan = settings.fixedMultiplePlan;
    const fixedMultipleVariants = settings.productVariants;
    const result = fixedMultiplePlan.map((plan) => {
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
    if (settings.insurancePriceType === "FIXED_MULTIPLE") {
      packageProtectionApi.setVariants(
        PackageProtectionType.BASED_ON_CART_VALUE,
        result
      );
    } else if (settings.insurancePriceType === "FIXED_PRICE") {
      const fixedVariant = settings.productVariants[0];
      packageProtectionApi.setVariants(PackageProtectionType.FIXED, {
        price: Number(fixedVariant.price),
        variantId: Number(fixedVariant.id)
      });
    } else if (settings.insurancePriceType === "PERCENTAGE") {
      packageProtectionApi.setVariants(
        PackageProtectionType.PERCENTAGE,
        settings.productVariants.reduce(
          (a, b) => {
            a[b.price] = Number(b.id);
            return a;
          },
          {}
        )
      );
    }
    client.thumbnail = settings.iconUrl;
    client.title = settings.title;
    client.enabledDescription = settings.enabledDescription;
    client.disabledDescription = settings.disabledDescription;
    client.buttonColor = settings.switchColor;
    client.css = settings.css;
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
      const v = checkExcludeVariants();
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
    window.weNexusCartApi.addListener(async (oldCart, _, wait) => {
      client.disabledCheckoutButton();
      await wait();
      await client.refreshPriceUI();
      await client.refreshWidget();
      client.enabledCheckoutButton();
      items = await getItems();
      const excludeVariantIds = settings.packageProtectionProductAndVariants.map(
        (e) => e.excludedPackageProtectionVariants.map(
          (j) => Number(j.id.split("/").pop())
        )
      ).flat();
      const excludeVariants2 = checkExcludeVariants();
      const haveExcludedVariants = items.filter(
        (item) => excludeVariantIds.every((id) => id === item.variant_id)
      );
      setTimeout(() => {
        if ((excludeVariants2.length === 0 || haveExcludedVariants.length === items.length) && window.Shopify.theme.theme_store_id === 887) {
          const widget = document.getElementsByClassName(
            "wenexus-package-protection"
          );
          Array.from(widget).forEach((item) => {
            const element = item;
            element.style.display = "none";
          });
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
        const variants = checkExcludeVariants();
        for (const element of elements) {
          const { container, checkbox } = await client.getCheckboxContainer(
            // enabled()
            variants.length > 0 ? enabled() : false
          );
          if (variants.length == 0 && window.Shopify.theme.theme_store_id !== 887)
            ;
          else {
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
