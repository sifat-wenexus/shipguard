// @ts-nocheck
// // @ts-nocheck
// function disableSubmit() {
//   document.getElementById('submit').disabled = true;
//   document.getElementsByClassName('#button')[0].disabled = true;
//   document.getElementById('submit').style.visibility = 'hidden';
// }

// function activateButton(element) {
//   if (element.checked) {
//     document.getElementById('submit').disabled = false;
//     document.getElementsByClassName('#button')[0].disabled = false;
//     document.getElementById('warning-text').style.display = 'none';
//   } else {
//     document.getElementById('submit').disabled = true;
//     document.getElementsByClassName('#button')[0].disabled = true;
//     document.getElementById('warning-text').style.display = 'block';
//   }
// }

//----------------------------------------------------------------

// @ts-ignore
// @ts-ignore
var WeNexusQuerySelectorLive = (function (r) {
  'use strict';
  var c = Object.defineProperty;
  var h = (r, s, i) =>
    s in r
      ? c(r, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (r[s] = i);
  var n = (r, s, i) => (h(r, typeof s != 'symbol' ? s + '' : s, i), i);
  class s {
    constructor(e, o = new Set([document.documentElement])) {
      n(this, 'listeners', new Set());
      n(this, 'elements', new Set());
      n(this, 'observer', null);
      (this.selector = e), (this.roots = o);
    }
    setup() {
      if (!this.observer) {
        this.observer = new MutationObserver(() => this.reconcile());
        for (const e of this.roots)
          this.observer.observe(e, { childList: !0, subtree: !0 });
        this.reconcile();
      }
    }
    reconcile() {
      const e = new Set(
          Array.from(this.roots)
            .map((t) => t.querySelectorAll(this.selector))
            .flatMap((t) => Array.from(t))
        ),
        o = new Set(),
        l = new Set();
      // @ts-ignore
      for (const t of e) this.elements.has(t) || l.add(t);
      // @ts-ignore
      for (const t of this.elements) e.has(t) || o.add(t);
      if (l.size > 0 || o.size > 0) {
        // @ts-ignore
        this.elements.clear();
        // @ts-ignore
        for (const t of e) this.elements.add(t);
        // @ts-ignore
        for (const t of this.listeners) t(this.elements);
      }
    }
    addListener(e) {
      // @ts-ignore
      this.listeners.add(e), this.listeners.size === 1 && this.setup();
    }
    removeListener(e) {
      // @ts-ignore
      this.listeners.delete(e), this.listeners.size === 0 && this.destroy();
    }
    destroy() {
      var e;
      // @ts-ignore
      this.listeners.clear(), (e = this.observer) == null || e.disconnect();
    }
  }
  return (
    // @ts-ignore
    (window.WeNexusQuerySelectorLive = s),
    // @ts-ignore
    (r.QuerySelectorLive = s),
    Object.defineProperty(r, Symbol.toStringTag, { value: 'Module' }),
    r
  );
})({});

function setupButton(checkboxId, warnginMessage) {
  const checkoutButton = document.getElementById('checkout');
  const checkbox = document.getElementById(checkboxId);
  const warningMessage = document.getElementById(warnginMessage);
  localStorage.setItem(checkboxId, checkbox.checked);
  const updateState = () => {
    const value = localStorage.getItem(checkboxId) || checkbox.checked;
    checkbox.checked = value === 'true';
    checkoutButton.classList.toggle(
      'wenexus_checkout-disabled',
      !checkbox.checked
    );
    checkoutButton.toggleAttribute('disabled', !checkbox.checked);
    warningMessage.classList.toggle('wenexus_active', !checkbox.checked);
  };

  const handleCheckboxChange = () => {
    localStorage.setItem(checkboxId, !checkbox.checked);
    updateState();
  };

  checkbox.addEventListener('change', handleCheckboxChange);

  // Initial setup
  updateState();
}

const lq = new WeNexusQuerySelectorLive.QuerySelectorLive('#checkout', [
  document.getElementById('MainContent'),
]);

lq.addListener((button) => {
  setupButton('wenexus_checkbox2', 'wenexus_warning2');
});

setupButton('wenexus_checkbox2', 'wenexus_warning2');

const linkColor = window.WeNexusOverallTermsSettings.text_link_color;
const fontSize = window.WeNexusOverallTermsSettings.font_size;

function makeMarkDown(inputString, elementId) {
  const startIndex = inputString.indexOf('[');
  const endIndex = inputString.indexOf(']');
  const linkText = inputString.substring(startIndex + 1, endIndex);
  const urlStartIndex = inputString.indexOf('(');
  const urlEndIndex = inputString.indexOf(')');
  const url = inputString.substring(urlStartIndex + 1, urlEndIndex);

  const formattedString = inputString.replace(
    `[${linkText}](${url})`,
    `<a href='${url}' target='_blank' style='color:${linkColor}; '>${linkText}</a>`
  );
  document.getElementById(elementId).innerHTML = formattedString;
  // return `<span>
  //   ${formattedString}
  //   </span>`;
  // return { url, formattedString, linkText };
}

const text = document.getElementById('append-text').attributes.text.value;

//document.onload
makeMarkDown(text, 'terms-text');
