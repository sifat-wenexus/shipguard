var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function() {
  "use strict";
  const _PackageProtectionApi = class _PackageProtectionApi {
    constructor(percentage, enabled) {
      __publicField(this, "variantIds", /* @__PURE__ */ new Set());
      __publicField(this, "variants", {});
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
    setVariants(variants) {
      this.prices.length = 0;
      this.variantIds.clear();
      for (const key of Object.keys(this.variants)) {
        delete this.variants[key];
      }
      this.prices.push(
        ...Object.keys(variants).map(Number).sort((a, b) => a - b)
      );
      for (const key of Object.keys(variants)) {
        this.variants[key] = variants[key];
        this.variantIds.add(variants[key]);
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
      if (this.prices.length === 0) {
        throw new Error("No variants have been set");
      }
      const allvariants = await this.getNonPackageProtectionItems();
      const excludeVariants = window.WeNexusOverallPackageProtectionSettings.packageProtectionProductAndVariants.map((product) => {
        return product.excludedPackageProtectionVariants.map(
          (variant) => Number(variant.id.replace("gid://shopify/ProductVariant/", ""))
        );
      }).flat();
      const checkExcludeVariants = () => {
        const result = [];
        for (let i = 0; i < allvariants.length; i++) {
          const variantId = allvariants[i].variant_id;
          if (!excludeVariants.includes(variantId)) {
            result.push(allvariants[i]);
          }
        }
        return result;
      };
      const variants = checkExcludeVariants();
      const forPrice = variants.reduce((acc, item) => acc + item.final_line_price, 0) / 100;
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
        variantId: this.variants[coercedPrice],
        coercedPrice,
        forPrice
      };
    }
    async add() {
      const items = await this.getPackageProtectionItems();
      if (items.length > 0) {
        return;
      }
      const { variantId } = await this.calculate();
      const cart = await window.weNexusCartApi.prepend(
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
    async change(variantId) {
      if (this.prices.length === 0) {
        throw new Error("No variants have been set");
      }
      const [item] = await this.getPackageProtectionItems();
      if (!item || variantId === item.variant_id) {
        return;
      }
      const items = await this.getNonPackageProtectionItems();
      const updates = items.map((item2) => {
        var _a;
        return {
          id: item2.variant_id,
          quantity: item2.quantity,
          selling_plan: (_a = item2.selling_plan) == null ? void 0 : _a.id,
          properties: item2.properties
        };
      }).reverse();
      updates.unshift({
        id: variantId,
        quantity: 1
      });
      const cart = await window.weNexusCartApi.replace(updates, false);
      return cart.items.find((item2) => item2.variant_id === variantId);
    }
    async refresh() {
      var _a;
      const nonPackageProtectionItems = await this.getNonPackageProtectionItems();
      if (!this.enabled || nonPackageProtectionItems.length === 0) {
        return this.remove();
      }
      const ppItems = await this.getPackageProtectionItems();
      const cardItems = (await window.weNexusCartApi.get()).items;
      if (((_a = ppItems[0]) == null ? void 0 : _a.quantity) === 0 || ppItems.length === 0) {
        return this.add();
      }
      const { variantId } = await this.calculate();
      if (ppItems.reduce((a, b) => a + b.quantity, 0) > 1) {
        const finalItem = cardItems.find((item) => item.id === variantId);
        if (finalItem) {
          await window.weNexusCartApi.update({
            [finalItem.id]: 1
          });
        }
        await location.reload();
      }
      if (ppItems.some((item) => item.variant_id === variantId)) {
        const { items } = await window.weNexusCartApi.get();
        const index = items.findIndex((item) => item.variant_id === variantId);
        if (index === items.length - 1) {
          return;
        }
        const cart = await window.weNexusCartApi.move(variantId, 0, false);
        return cart.items[items.length - 1];
      }
      return this.change(variantId);
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
    async getDescription() {
      return `${this.checked ? this.enabledDescription : this.disabledDescription}`;
    }
    async getCheckboxContainer(checked) {
      this.checked = checked;
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
                <h5>${this.title} <a href="${this.infoPageLink}" target="_blank" style="color:blue;">ⓘ</a></h5>
                <p> <span class="wenexus-package-protection-description">${description} </span></p>
            </div>
        </div>
        <div class="wenexus-package-protection__toggle" >
        <div style="position:relative;">
            <input type="checkbox" ${checked ? "checked" : ""} style="position:absolute; width:100%; height:100%; left:0; z-index:99; opacity:0">

            <div class="toggle-container" style="display: flex;  width: 4rem; height: 1.75rem; background-color: ${checked ? this.buttonColor : "#7b7b7b"}; position: relative; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border-radius: 9999px; cursor: pointer; transition: background-color 0.5s ease-out;">
                <span class="toggle-switch" style="height: 1.25rem; width: 1.25rem; position: absolute; top: 0.25rem; left: 0.25rem; background-color: white; border-radius: 9999px; ${checked ? "transform: translateX(2rem);" : ""} transition: transform 0.3s ease-out; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); display: flex; align-items: center; justify-content: center;"></span>
            </div>
          <p style="margin:0px; font-size:0.85rem; text-align:center;"><strong class="protection-price">${price}</strong></p>
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
        toggleSwitch.style.transform = checkbox.checked ? "translateX(2rem)" : "translateX(0)";
      };
      updateToggleStyles();
      this.container = container;
      return {
        container,
        checkbox
      };
    }
    // async getCheckboxContainer(checked: boolean) {
    //   const container = document.createElement('div');
    //   const price = await this.getPrice();
    //   container.insertAdjacentHTML(
    //     'afterbegin',
    //     `
    //       <div class="wenexus-package-protection__content">
    //           <div class="wenexus-package-protection__image">
    //               <img src="${this.thumbnail}" alt="logo" />
    //           </div>
    //           <div class="wenexus-package-protection__desc">
    //               <h5>Package Protection <a href="${this.infoPageLink}" target="_blank">ⓘ</a></h5>
    //               <p>Covers Damage, Loss & Theft for <strong class="protection-price">${price}</strong></p>
    //           </div>
    //       </div>
    //       <div class="wenexus-package-protection__toggle">
    //            <input type="checkbox">
    //       </div>
    // `
    //   );
    //   const checkbox = container.querySelector(
    //     '.wenexus-package-protection__toggle input'
    //   ) as HTMLInputElement;
    //   container.className = 'wenexus-package-protection';
    //   checkbox.checked = checked;
    //   this.container = container;
    //   return {
    //     container,
    //     checkbox,
    //   };
    // }
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
      extraStyles = ""
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
         
         .wenexus-package-protection__desc h5 {
            font-size: ${titleFontSize}rem;
            margin: 0;
         }
         
         .wenexus-package-protection__desc p {
            font-size: ${descriptionFontSize}rem;
            font-weight: ${descriptionFontWeight};
            margin: ${descriptionMargin == null ? void 0 : descriptionMargin.join("px ")}px;
         }
         
         .wenexus-package-protection__desc a {
            text-decoration: none;
            font-size: 1.5rem;
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
    refreshUI(_) {
      location.reload();
    }
    async refreshPriceUI() {
      if (this.container) {
        this.container.querySelector(".protection-price").textContent = await this.getPrice();
      }
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
    async refreshUI() {
      var _a;
      (_a = document.getElementById("cart-items")) == null ? void 0 : _a.refresh();
      await this.refreshPriceUI();
    }
  }
  class PackageProtectionClientDawn extends PackageProtectionClientBasic {
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
          insertPosition: position ?? "before",
          boundaryParents: /* @__PURE__ */ new Set([document.body])
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
    async refreshUI() {
      Array.from(document.getElementsByTagName("cart-items")).forEach(
        (i) => i.onCartUpdate()
      );
      await this.refreshPriceUI();
      let subTotal = document.getElementsByClassName("totals__total-value");
      const items = await window.weNexusCartApi.get();
      if (items.total_price === 0) {
        await location.reload();
        return;
      }
      Array.from(subTotal).forEach(
        (el) => el.innerHTML = `${this.formatPrice(
          Number(items.total_price / 100),
          items.currency
        )} USD`
      );
      let cartIcon = document.getElementsByClassName("cart-count-bubble");
      Array.from(cartIcon).forEach(
        (el) => el.innerHTML = items.item_count.toString()
      );
      const des = await this.getDescription();
      const descriptionElements = document.getElementsByClassName(
        "wenexus-package-protection-description"
      );
      Array.from(descriptionElements).forEach((el) => el.innerHTML = `${des} `);
      setTimeout(() => {
        const data = Array.from(document.getElementsByTagName("a")).filter(
          (el) => el.href.includes(
            items.items[items.items.length - 1].variant_id.toString()
          )
        );
        data.forEach((el) => el.setAttribute("href", "#"));
      }, 1e3);
    }
  }
  async function packageProtection() {
    var _a, _b;
    const clients = [
      PackageProtectionClientDawn,
      PackageProtectionClientEnterprise,
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
    const items = (await window.weNexusCartApi.get()).items;
    const settings = window.WeNexusOverallPackageProtectionSettings;
    const excludeVariants = window.WeNexusOverallPackageProtectionSettings.packageProtectionProductAndVariants.map((product) => {
      return product.excludedPackageProtectionVariants.map(
        (variant) => Number(variant.id.replace("gid://shopify/ProductVariant/", ""))
      );
    }).flat();
    const checkExcludeVariants = () => {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        const variantId = items[i].variant_id;
        if (!excludeVariants.includes(variantId)) {
          items[i].vendor !== "OverallInsurance" && result.push(items[i]);
        }
      }
      return result;
    };
    const variants = checkExcludeVariants();
    const enabledByDefault = settings.insuranceDisplayButton ?? true;
    const enabled = () => {
      const value = localStorage.getItem("package-protection-enabled");
      if (value === "false") {
        return false;
      }
      if (value === null) {
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
      selectors = ((_a = client.getInsertionPointSelectors) == null ? void 0 : _a.call(
        client,
        settings.position.toLowerCase() ?? "before",
        settings.cssSelector
      )) || [];
    } else {
      selectors = ((_b = client.getInsertionPointSelectors) == null ? void 0 : _b.call(client, "before")) || [];
    }
    async function refresh(force = false) {
      const item = await packageProtectionApi.refresh();
      const oldItemId = localStorage.getItem("package-protection-item") || null;
      const newItemId = (item == null ? void 0 : item.variant_id.toString()) || null;
      localStorage.setItem(
        "package-protection-item",
        (item == null ? void 0 : item.variant_id.toString()) ?? ""
      );
      if (oldItemId === newItemId && item) {
        client.refreshUI(item ?? null);
      }
      if (force || oldItemId !== newItemId) {
        client.refreshUI(item ?? null);
      }
    }
    const fixedMultiplePlan = JSON.parse(settings.fixedMultiplePlan);
    const cartValue = (await window.weNexusCartApi.get()).total_price / 100;
    console.log(
      "package-1",
      settings.productVariants.reduce(
        (a, b) => {
          a[b.price] = Number(b.id);
          return a;
        },
        {}
      ),
      fixedMultiplePlan,
      cartValue
    );
    if (settings.insurancePriceType === "FIXED_MULTIPLE") {
      const result = fixedMultiplePlan.find(
        (item) => cartValue >= Number(item.cartMinPrice) && cartValue <= Number(item.cartMaxPrice)
      );
      const multipleVariantToSet = settings.productVariants.find(
        (v) => Number(v.price) === Number(result == null ? void 0 : result.protectionFees)
      );
      console.log(
        { result },
        { [multipleVariantToSet.price]: Number(multipleVariantToSet.id) }
      );
    }
    packageProtectionApi.setVariants(
      settings.productVariants.reduce(
        (a, b) => {
          a[b.price] = Number(b.id);
          return a;
        },
        {}
      )
    );
    client.thumbnail = settings.iconUrl;
    client.title = settings.title;
    client.enabledDescription = settings.enabledDescription;
    client.disabledDescription = settings.disabledDescription;
    client.buttonColor = settings.switchColor;
    client.css = settings.css;
    window.weNexusCartApi.addListener(() => refresh());
    if (typeof client.getStyleMarkup === "function") {
      document.head.insertAdjacentHTML(
        "beforeend",
        await client.getStyleMarkup({
          accentColor: "#52c939",
          imageWidth: 48
        })
      );
    }
    for (const selector of selectors) {
      if (selector.shouldUse && !selector.shouldUse()) {
        continue;
      }
      const liveQuery = new window.WeNexusQuerySelectorLive(
        selector.selector,
        selector.boundaryParents
      );
      liveQuery.addListener(async (elements) => {
        var _a2;
        for (const element of elements) {
          const { container, checkbox } = await client.getCheckboxContainer(
            // enabled()
            variants.length > 0 ? enabled() : false
          );
          if (!checkbox.checked && variants.length == 0) {
            localStorage.setItem("package-protection-enabled", "false");
            await packageProtectionApi.remove();
            (_a2 = document.getElementsByTagName("cart-items")[0]) == null ? void 0 : _a2.onCartUpdate();
            continue;
          } else {
            console.log("Please", settings);
          }
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
            await refresh(true);
            checkbox.disabled = false;
            checkoutButton.forEach((e) => e.disabled = false);
          });
        }
      });
    }
    const data = Array.from(document.getElementsByTagName("a")).filter(
      (el) => el.href.includes(items[items.length - 1].variant_id.toString())
    );
    data.forEach((el) => el.setAttribute("href", "#"));
    await refresh();
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
