(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver((o) => {
    for (const l of o)
      if (l.type === 'childList')
        for (const i of l.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(o) {
    const l = {};
    return (
      o.integrity && (l.integrity = o.integrity),
      o.referrerPolicy && (l.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (l.credentials = 'include')
        : o.crossOrigin === 'anonymous'
        ? (l.credentials = 'omit')
        : (l.credentials = 'same-origin'),
      l
    );
  }
  function n(o) {
    if (o.ep) return;
    o.ep = !0;
    const l = r(o);
    fetch(o.href, l);
  }
})();
function Y0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var pu = { exports: {} },
  zo = {},
  bu = { exports: {} },
  z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vn = Symbol.for('react.element'),
  J0 = Symbol.for('react.portal'),
  Z0 = Symbol.for('react.fragment'),
  X0 = Symbol.for('react.strict_mode'),
  q0 = Symbol.for('react.profiler'),
  ed = Symbol.for('react.provider'),
  td = Symbol.for('react.context'),
  rd = Symbol.for('react.forward_ref'),
  nd = Symbol.for('react.suspense'),
  od = Symbol.for('react.memo'),
  ld = Symbol.for('react.lazy'),
  Ia = Symbol.iterator;
function id(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Ia && e[Ia]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var yu = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  vu = Object.assign,
  xu = {};
function Ar(e, t, r) {
  (this.props = e),
    (this.context = t),
    (this.refs = xu),
    (this.updater = r || yu);
}
Ar.prototype.isReactComponent = {};
Ar.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
Ar.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function Au() {}
Au.prototype = Ar.prototype;
function Bi(e, t, r) {
  (this.props = e),
    (this.context = t),
    (this.refs = xu),
    (this.updater = r || yu);
}
var Mi = (Bi.prototype = new Au());
Mi.constructor = Bi;
vu(Mi, Ar.prototype);
Mi.isPureReactComponent = !0;
var Ta = Array.isArray,
  wu = Object.prototype.hasOwnProperty,
  zi = { current: null },
  Su = { key: !0, ref: !0, __self: !0, __source: !0 };
function Du(e, t, r) {
  var n,
    o = {},
    l = null,
    i = null;
  if (t != null)
    for (n in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (l = '' + t.key),
    t))
      wu.call(t, n) && !Su.hasOwnProperty(n) && (o[n] = t[n]);
  var a = arguments.length - 2;
  if (a === 1) o.children = r;
  else if (1 < a) {
    for (var s = Array(a), u = 0; u < a; u++) s[u] = arguments[u + 2];
    o.children = s;
  }
  if (e && e.defaultProps)
    for (n in ((a = e.defaultProps), a)) o[n] === void 0 && (o[n] = a[n]);
  return {
    $$typeof: vn,
    type: e,
    key: l,
    ref: i,
    props: o,
    _owner: zi.current,
  };
}
function ad(e, t) {
  return {
    $$typeof: vn,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Pi(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === vn;
}
function sd(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (r) {
      return t[r];
    })
  );
}
var Ba = /\/+/g;
function tl(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? sd('' + e.key)
    : t.toString(36);
}
function Kn(e, t, r, n, o) {
  var l = typeof e;
  (l === 'undefined' || l === 'boolean') && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (l) {
      case 'string':
      case 'number':
        i = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case vn:
          case J0:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (o = o(i)),
      (e = n === '' ? '.' + tl(i, 0) : n),
      Ta(o)
        ? ((r = ''),
          e != null && (r = e.replace(Ba, '$&/') + '/'),
          Kn(o, t, r, '', function (u) {
            return u;
          }))
        : o != null &&
          (Pi(o) &&
            (o = ad(
              o,
              r +
                (!o.key || (i && i.key === o.key)
                  ? ''
                  : ('' + o.key).replace(Ba, '$&/') + '/') +
                e
            )),
          t.push(o)),
      1
    );
  if (((i = 0), (n = n === '' ? '.' : n + ':'), Ta(e)))
    for (var a = 0; a < e.length; a++) {
      l = e[a];
      var s = n + tl(l, a);
      i += Kn(l, t, r, s, o);
    }
  else if (((s = id(e)), typeof s == 'function'))
    for (e = s.call(e), a = 0; !(l = e.next()).done; )
      (l = l.value), (s = n + tl(l, a++)), (i += Kn(l, t, r, s, o));
  else if (l === 'object')
    throw (
      ((t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.'
      ))
    );
  return i;
}
function En(e, t, r) {
  if (e == null) return e;
  var n = [],
    o = 0;
  return (
    Kn(e, n, '', '', function (l) {
      return t.call(r, l, o++);
    }),
    n
  );
}
function ud(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = r));
        },
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = r));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ge = { current: null },
  Vn = { transition: null },
  cd = {
    ReactCurrentDispatcher: ge,
    ReactCurrentBatchConfig: Vn,
    ReactCurrentOwner: zi,
  };
function Fu() {
  throw Error('act(...) is not supported in production builds of React.');
}
z.Children = {
  map: En,
  forEach: function (e, t, r) {
    En(
      e,
      function () {
        t.apply(this, arguments);
      },
      r
    );
  },
  count: function (e) {
    var t = 0;
    return (
      En(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      En(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Pi(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.'
      );
    return e;
  },
};
z.Component = Ar;
z.Fragment = Z0;
z.Profiler = q0;
z.PureComponent = Bi;
z.StrictMode = X0;
z.Suspense = nd;
z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = cd;
z.act = Fu;
z.cloneElement = function (e, t, r) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.'
    );
  var n = vu({}, e.props),
    o = e.key,
    l = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((l = t.ref), (i = zi.current)),
      t.key !== void 0 && (o = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (s in t)
      wu.call(t, s) &&
        !Su.hasOwnProperty(s) &&
        (n[s] = t[s] === void 0 && a !== void 0 ? a[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) n.children = r;
  else if (1 < s) {
    a = Array(s);
    for (var u = 0; u < s; u++) a[u] = arguments[u + 2];
    n.children = a;
  }
  return { $$typeof: vn, type: e.type, key: o, ref: l, props: n, _owner: i };
};
z.createContext = function (e) {
  return (
    (e = {
      $$typeof: td,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: ed, _context: e }),
    (e.Consumer = e)
  );
};
z.createElement = Du;
z.createFactory = function (e) {
  var t = Du.bind(null, e);
  return (t.type = e), t;
};
z.createRef = function () {
  return { current: null };
};
z.forwardRef = function (e) {
  return { $$typeof: rd, render: e };
};
z.isValidElement = Pi;
z.lazy = function (e) {
  return { $$typeof: ld, _payload: { _status: -1, _result: e }, _init: ud };
};
z.memo = function (e, t) {
  return { $$typeof: od, type: e, compare: t === void 0 ? null : t };
};
z.startTransition = function (e) {
  var t = Vn.transition;
  Vn.transition = {};
  try {
    e();
  } finally {
    Vn.transition = t;
  }
};
z.unstable_act = Fu;
z.useCallback = function (e, t) {
  return ge.current.useCallback(e, t);
};
z.useContext = function (e) {
  return ge.current.useContext(e);
};
z.useDebugValue = function () {};
z.useDeferredValue = function (e) {
  return ge.current.useDeferredValue(e);
};
z.useEffect = function (e, t) {
  return ge.current.useEffect(e, t);
};
z.useId = function () {
  return ge.current.useId();
};
z.useImperativeHandle = function (e, t, r) {
  return ge.current.useImperativeHandle(e, t, r);
};
z.useInsertionEffect = function (e, t) {
  return ge.current.useInsertionEffect(e, t);
};
z.useLayoutEffect = function (e, t) {
  return ge.current.useLayoutEffect(e, t);
};
z.useMemo = function (e, t) {
  return ge.current.useMemo(e, t);
};
z.useReducer = function (e, t, r) {
  return ge.current.useReducer(e, t, r);
};
z.useRef = function (e) {
  return ge.current.useRef(e);
};
z.useState = function (e) {
  return ge.current.useState(e);
};
z.useSyncExternalStore = function (e, t, r) {
  return ge.current.useSyncExternalStore(e, t, r);
};
z.useTransition = function () {
  return ge.current.useTransition();
};
z.version = '18.3.1';
bu.exports = z;
var I = bu.exports;
const j = Y0(I);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dd = I,
  fd = Symbol.for('react.element'),
  md = Symbol.for('react.fragment'),
  gd = Object.prototype.hasOwnProperty,
  hd = dd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  pd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Eu(e, t, r) {
  var n,
    o = {},
    l = null,
    i = null;
  r !== void 0 && (l = '' + r),
    t.key !== void 0 && (l = '' + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (n in t) gd.call(t, n) && !pd.hasOwnProperty(n) && (o[n] = t[n]);
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) o[n] === void 0 && (o[n] = t[n]);
  return {
    $$typeof: fd,
    type: e,
    key: l,
    ref: i,
    props: o,
    _owner: hd.current,
  };
}
zo.Fragment = md;
zo.jsx = Eu;
zo.jsxs = Eu;
pu.exports = zo;
var c = pu.exports,
  Pl = {},
  Cu = { exports: {} },
  Ce = {},
  ku = { exports: {} },
  Nu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(E, B) {
    var M = E.length;
    E.push(B);
    e: for (; 0 < M; ) {
      var Y = (M - 1) >>> 1,
        te = E[Y];
      if (0 < o(te, B)) (E[Y] = B), (E[M] = te), (M = Y);
      else break e;
    }
  }
  function r(E) {
    return E.length === 0 ? null : E[0];
  }
  function n(E) {
    if (E.length === 0) return null;
    var B = E[0],
      M = E.pop();
    if (M !== B) {
      E[0] = M;
      e: for (var Y = 0, te = E.length, Dn = te >>> 1; Y < Dn; ) {
        var Nt = 2 * (Y + 1) - 1,
          el = E[Nt],
          It = Nt + 1,
          Fn = E[It];
        if (0 > o(el, M))
          It < te && 0 > o(Fn, el)
            ? ((E[Y] = Fn), (E[It] = M), (Y = It))
            : ((E[Y] = el), (E[Nt] = M), (Y = Nt));
        else if (It < te && 0 > o(Fn, M)) (E[Y] = Fn), (E[It] = M), (Y = It);
        else break e;
      }
    }
    return B;
  }
  function o(E, B) {
    var M = E.sortIndex - B.sortIndex;
    return M !== 0 ? M : E.id - B.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var i = Date,
      a = i.now();
    e.unstable_now = function () {
      return i.now() - a;
    };
  }
  var s = [],
    u = [],
    m = 1,
    p = null,
    h = 3,
    y = !1,
    x = !1,
    w = !1,
    P = typeof setTimeout == 'function' ? setTimeout : null,
    f = typeof clearTimeout == 'function' ? clearTimeout : null,
    d = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(E) {
    for (var B = r(u); B !== null; ) {
      if (B.callback === null) n(u);
      else if (B.startTime <= E)
        n(u), (B.sortIndex = B.expirationTime), t(s, B);
      else break;
      B = r(u);
    }
  }
  function v(E) {
    if (((w = !1), g(E), !x))
      if (r(s) !== null) (x = !0), Xo(S);
      else {
        var B = r(u);
        B !== null && qo(v, B.startTime - E);
      }
  }
  function S(E, B) {
    (x = !1), w && ((w = !1), f(N), (N = -1)), (y = !0);
    var M = h;
    try {
      for (
        g(B), p = r(s);
        p !== null && (!(p.expirationTime > B) || (E && !T()));

      ) {
        var Y = p.callback;
        if (typeof Y == 'function') {
          (p.callback = null), (h = p.priorityLevel);
          var te = Y(p.expirationTime <= B);
          (B = e.unstable_now()),
            typeof te == 'function' ? (p.callback = te) : p === r(s) && n(s),
            g(B);
        } else n(s);
        p = r(s);
      }
      if (p !== null) var Dn = !0;
      else {
        var Nt = r(u);
        Nt !== null && qo(v, Nt.startTime - B), (Dn = !1);
      }
      return Dn;
    } finally {
      (p = null), (h = M), (y = !1);
    }
  }
  var C = !1,
    k = null,
    N = -1,
    O = 5,
    D = -1;
  function T() {
    return !(e.unstable_now() - D < O);
  }
  function $() {
    if (k !== null) {
      var E = e.unstable_now();
      D = E;
      var B = !0;
      try {
        B = k(!0, E);
      } finally {
        B ? Ae() : ((C = !1), (k = null));
      }
    } else C = !1;
  }
  var Ae;
  if (typeof d == 'function')
    Ae = function () {
      d($);
    };
  else if (typeof MessageChannel < 'u') {
    var Dr = new MessageChannel(),
      G0 = Dr.port2;
    (Dr.port1.onmessage = $),
      (Ae = function () {
        G0.postMessage(null);
      });
  } else
    Ae = function () {
      P($, 0);
    };
  function Xo(E) {
    (k = E), C || ((C = !0), Ae());
  }
  function qo(E, B) {
    N = P(function () {
      E(e.unstable_now());
    }, B);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (E) {
      E.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      x || y || ((x = !0), Xo(S));
    }),
    (e.unstable_forceFrameRate = function (E) {
      0 > E || 125 < E
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (O = 0 < E ? Math.floor(1e3 / E) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return r(s);
    }),
    (e.unstable_next = function (E) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = h;
      }
      var M = h;
      h = B;
      try {
        return E();
      } finally {
        h = M;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (E, B) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var M = h;
      h = E;
      try {
        return B();
      } finally {
        h = M;
      }
    }),
    (e.unstable_scheduleCallback = function (E, B, M) {
      var Y = e.unstable_now();
      switch (
        (typeof M == 'object' && M !== null
          ? ((M = M.delay), (M = typeof M == 'number' && 0 < M ? Y + M : Y))
          : (M = Y),
        E)
      ) {
        case 1:
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return (
        (te = M + te),
        (E = {
          id: m++,
          callback: B,
          priorityLevel: E,
          startTime: M,
          expirationTime: te,
          sortIndex: -1,
        }),
        M > Y
          ? ((E.sortIndex = M),
            t(u, E),
            r(s) === null &&
              E === r(u) &&
              (w ? (f(N), (N = -1)) : (w = !0), qo(v, M - Y)))
          : ((E.sortIndex = te), t(s, E), x || y || ((x = !0), Xo(S))),
        E
      );
    }),
    (e.unstable_shouldYield = T),
    (e.unstable_wrapCallback = function (E) {
      var B = h;
      return function () {
        var M = h;
        h = B;
        try {
          return E.apply(this, arguments);
        } finally {
          h = M;
        }
      };
    });
})(Nu);
ku.exports = Nu;
var bd = ku.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yd = I,
  Ee = bd;
function A(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, r = 1;
    r < arguments.length;
    r++
  )
    t += '&args[]=' + encodeURIComponent(arguments[r]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var Iu = new Set(),
  Xr = {};
function $t(e, t) {
  mr(e, t), mr(e + 'Capture', t);
}
function mr(e, t) {
  for (Xr[e] = t, e = 0; e < t.length; e++) Iu.add(t[e]);
}
var et = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  Ll = Object.prototype.hasOwnProperty,
  vd =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ma = {},
  za = {};
function xd(e) {
  return Ll.call(za, e)
    ? !0
    : Ll.call(Ma, e)
    ? !1
    : vd.test(e)
    ? (za[e] = !0)
    : ((Ma[e] = !0), !1);
}
function Ad(e, t, r, n) {
  if (r !== null && r.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return n
        ? !1
        : r !== null
        ? !r.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function wd(e, t, r, n) {
  if (t === null || typeof t > 'u' || Ad(e, t, r, n)) return !0;
  if (n) return !1;
  if (r !== null)
    switch (r.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function he(e, t, r, n, o, l, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = n),
    (this.attributeNamespace = o),
    (this.mustUseProperty = r),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = l),
    (this.removeEmptyString = i);
}
var ae = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    ae[e] = new he(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  ae[t] = new he(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  ae[e] = new he(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  ae[e] = new he(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    ae[e] = new he(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  ae[e] = new he(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  ae[e] = new he(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  ae[e] = new he(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  ae[e] = new he(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Li = /[\-:]([a-z])/g;
function Ri(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Li, Ri);
    ae[t] = new he(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Li, Ri);
    ae[t] = new he(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(Li, Ri);
  ae[t] = new he(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  ae[e] = new he(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ae.xlinkHref = new he(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  ae[e] = new he(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ji(e, t, r, n) {
  var o = ae.hasOwnProperty(t) ? ae[t] : null;
  (o !== null
    ? o.type !== 0
    : n ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (wd(t, r, o, n) && (r = null),
    n || o === null
      ? xd(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, '' + r))
      : o.mustUseProperty
      ? (e[o.propertyName] = r === null ? (o.type === 3 ? !1 : '') : r)
      : ((t = o.attributeName),
        (n = o.attributeNamespace),
        r === null
          ? e.removeAttribute(t)
          : ((o = o.type),
            (r = o === 3 || (o === 4 && r === !0) ? '' : '' + r),
            n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
}
var lt = yd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Cn = Symbol.for('react.element'),
  Gt = Symbol.for('react.portal'),
  Yt = Symbol.for('react.fragment'),
  _i = Symbol.for('react.strict_mode'),
  Rl = Symbol.for('react.profiler'),
  Tu = Symbol.for('react.provider'),
  Bu = Symbol.for('react.context'),
  Oi = Symbol.for('react.forward_ref'),
  jl = Symbol.for('react.suspense'),
  _l = Symbol.for('react.suspense_list'),
  Ui = Symbol.for('react.memo'),
  st = Symbol.for('react.lazy'),
  Mu = Symbol.for('react.offscreen'),
  Pa = Symbol.iterator;
function Fr(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Pa && e[Pa]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var V = Object.assign,
  rl;
function zr(e) {
  if (rl === void 0)
    try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      rl = (t && t[1]) || '';
    }
  return (
    `
` +
    rl +
    e
  );
}
var nl = !1;
function ol(e, t) {
  if (!e || nl) return '';
  nl = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var n = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          n = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        n = u;
      }
      e();
    }
  } catch (u) {
    if (u && n && typeof u.stack == 'string') {
      for (
        var o = u.stack.split(`
`),
          l = n.stack.split(`
`),
          i = o.length - 1,
          a = l.length - 1;
        1 <= i && 0 <= a && o[i] !== l[a];

      )
        a--;
      for (; 1 <= i && 0 <= a; i--, a--)
        if (o[i] !== l[a]) {
          if (i !== 1 || a !== 1)
            do
              if ((i--, a--, 0 > a || o[i] !== l[a])) {
                var s =
                  `
` + o[i].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    s.includes('<anonymous>') &&
                    (s = s.replace('<anonymous>', e.displayName)),
                  s
                );
              }
            while (1 <= i && 0 <= a);
          break;
        }
    }
  } finally {
    (nl = !1), (Error.prepareStackTrace = r);
  }
  return (e = e ? e.displayName || e.name : '') ? zr(e) : '';
}
function Sd(e) {
  switch (e.tag) {
    case 5:
      return zr(e.type);
    case 16:
      return zr('Lazy');
    case 13:
      return zr('Suspense');
    case 19:
      return zr('SuspenseList');
    case 0:
    case 2:
    case 15:
      return (e = ol(e.type, !1)), e;
    case 11:
      return (e = ol(e.type.render, !1)), e;
    case 1:
      return (e = ol(e.type, !0)), e;
    default:
      return '';
  }
}
function Ol(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case Yt:
      return 'Fragment';
    case Gt:
      return 'Portal';
    case Rl:
      return 'Profiler';
    case _i:
      return 'StrictMode';
    case jl:
      return 'Suspense';
    case _l:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case Bu:
        return (e.displayName || 'Context') + '.Consumer';
      case Tu:
        return (e._context.displayName || 'Context') + '.Provider';
      case Oi:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case Ui:
        return (
          (t = e.displayName || null), t !== null ? t : Ol(e.type) || 'Memo'
        );
      case st:
        (t = e._payload), (e = e._init);
        try {
          return Ol(e(t));
        } catch {}
    }
  return null;
}
function Dd(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return Ol(t);
    case 8:
      return t === _i ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function St(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function zu(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  );
}
function Fd(e) {
  var t = zu(e) ? 'checked' : 'value',
    r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    n = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof r < 'u' &&
    typeof r.get == 'function' &&
    typeof r.set == 'function'
  ) {
    var o = r.get,
      l = r.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (i) {
          (n = '' + i), l.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: r.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (i) {
          n = '' + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function kn(e) {
  e._valueTracker || (e._valueTracker = Fd(e));
}
function Pu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(),
    n = '';
  return (
    e && (n = zu(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = n),
    e !== r ? (t.setValue(e), !0) : !1
  );
}
function lo(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ul(e, t) {
  var r = t.checked;
  return V({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: r ?? e._wrapperState.initialChecked,
  });
}
function La(e, t) {
  var r = t.defaultValue == null ? '' : t.defaultValue,
    n = t.checked != null ? t.checked : t.defaultChecked;
  (r = St(t.value != null ? t.value : r)),
    (e._wrapperState = {
      initialChecked: n,
      initialValue: r,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    });
}
function Lu(e, t) {
  (t = t.checked), t != null && ji(e, 'checked', t, !1);
}
function Hl(e, t) {
  Lu(e, t);
  var r = St(t.value),
    n = t.type;
  if (r != null)
    n === 'number'
      ? ((r === 0 && e.value === '') || e.value != r) && (e.value = '' + r)
      : e.value !== '' + r && (e.value = '' + r);
  else if (n === 'submit' || n === 'reset') {
    e.removeAttribute('value');
    return;
  }
  t.hasOwnProperty('value')
    ? Ql(e, t.type, r)
    : t.hasOwnProperty('defaultValue') && Ql(e, t.type, St(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Ra(e, t, r) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var n = t.type;
    if (
      !(
        (n !== 'submit' && n !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = '' + e._wrapperState.initialValue),
      r || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (r = e.name),
    r !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    r !== '' && (e.name = r);
}
function Ql(e, t, r) {
  (t !== 'number' || lo(e.ownerDocument) !== e) &&
    (r == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + r && (e.defaultValue = '' + r));
}
var Pr = Array.isArray;
function ar(e, t, r, n) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < r.length; o++) t['$' + r[o]] = !0;
    for (r = 0; r < e.length; r++)
      (o = t.hasOwnProperty('$' + e[r].value)),
        e[r].selected !== o && (e[r].selected = o),
        o && n && (e[r].defaultSelected = !0);
  } else {
    for (r = '' + St(r), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === r) {
        (e[o].selected = !0), n && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function $l(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(A(91));
  return V({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function ja(e, t) {
  var r = t.value;
  if (r == null) {
    if (((r = t.children), (t = t.defaultValue), r != null)) {
      if (t != null) throw Error(A(92));
      if (Pr(r)) {
        if (1 < r.length) throw Error(A(93));
        r = r[0];
      }
      t = r;
    }
    t == null && (t = ''), (r = t);
  }
  e._wrapperState = { initialValue: St(r) };
}
function Ru(e, t) {
  var r = St(t.value),
    n = St(t.defaultValue);
  r != null &&
    ((r = '' + r),
    r !== e.value && (e.value = r),
    t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
    n != null && (e.defaultValue = '' + n);
}
function _a(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function ju(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function Wl(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? ju(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
    ? 'http://www.w3.org/1999/xhtml'
    : e;
}
var Nn,
  _u = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, r, n, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, r, n, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t;
    else {
      for (
        Nn = Nn || document.createElement('div'),
          Nn.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Nn.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function qr(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var jr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Ed = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(jr).forEach(function (e) {
  Ed.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (jr[t] = jr[e]);
  });
});
function Ou(e, t, r) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : r || typeof t != 'number' || t === 0 || (jr.hasOwnProperty(e) && jr[e])
    ? ('' + t).trim()
    : t + 'px';
}
function Uu(e, t) {
  e = e.style;
  for (var r in t)
    if (t.hasOwnProperty(r)) {
      var n = r.indexOf('--') === 0,
        o = Ou(r, t[r], n);
      r === 'float' && (r = 'cssFloat'), n ? e.setProperty(r, o) : (e[r] = o);
    }
}
var Cd = V(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Kl(e, t) {
  if (t) {
    if (Cd[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(A(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(A(60));
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(A(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(A(62));
  }
}
function Vl(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var Gl = null;
function Hi(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Yl = null,
  sr = null,
  ur = null;
function Oa(e) {
  if ((e = wn(e))) {
    if (typeof Yl != 'function') throw Error(A(280));
    var t = e.stateNode;
    t && ((t = _o(t)), Yl(e.stateNode, e.type, t));
  }
}
function Hu(e) {
  sr ? (ur ? ur.push(e) : (ur = [e])) : (sr = e);
}
function Qu() {
  if (sr) {
    var e = sr,
      t = ur;
    if (((ur = sr = null), Oa(e), t)) for (e = 0; e < t.length; e++) Oa(t[e]);
  }
}
function $u(e, t) {
  return e(t);
}
function Wu() {}
var ll = !1;
function Ku(e, t, r) {
  if (ll) return e(t, r);
  ll = !0;
  try {
    return $u(e, t, r);
  } finally {
    (ll = !1), (sr !== null || ur !== null) && (Wu(), Qu());
  }
}
function en(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var n = _o(r);
  if (n === null) return null;
  r = n[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      (n = !n.disabled) ||
        ((e = e.type),
        (n = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !n);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != 'function') throw Error(A(231, t, typeof r));
  return r;
}
var Jl = !1;
if (et)
  try {
    var Er = {};
    Object.defineProperty(Er, 'passive', {
      get: function () {
        Jl = !0;
      },
    }),
      window.addEventListener('test', Er, Er),
      window.removeEventListener('test', Er, Er);
  } catch {
    Jl = !1;
  }
function kd(e, t, r, n, o, l, i, a, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, u);
  } catch (m) {
    this.onError(m);
  }
}
var _r = !1,
  io = null,
  ao = !1,
  Zl = null,
  Nd = {
    onError: function (e) {
      (_r = !0), (io = e);
    },
  };
function Id(e, t, r, n, o, l, i, a, s) {
  (_r = !1), (io = null), kd.apply(Nd, arguments);
}
function Td(e, t, r, n, o, l, i, a, s) {
  if ((Id.apply(this, arguments), _r)) {
    if (_r) {
      var u = io;
      (_r = !1), (io = null);
    } else throw Error(A(198));
    ao || ((ao = !0), (Zl = u));
  }
}
function Wt(e) {
  var t = e,
    r = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (r = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function Vu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Ua(e) {
  if (Wt(e) !== e) throw Error(A(188));
}
function Bd(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Wt(e)), t === null)) throw Error(A(188));
    return t !== e ? null : e;
  }
  for (var r = e, n = t; ; ) {
    var o = r.return;
    if (o === null) break;
    var l = o.alternate;
    if (l === null) {
      if (((n = o.return), n !== null)) {
        r = n;
        continue;
      }
      break;
    }
    if (o.child === l.child) {
      for (l = o.child; l; ) {
        if (l === r) return Ua(o), e;
        if (l === n) return Ua(o), t;
        l = l.sibling;
      }
      throw Error(A(188));
    }
    if (r.return !== n.return) (r = o), (n = l);
    else {
      for (var i = !1, a = o.child; a; ) {
        if (a === r) {
          (i = !0), (r = o), (n = l);
          break;
        }
        if (a === n) {
          (i = !0), (n = o), (r = l);
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = l.child; a; ) {
          if (a === r) {
            (i = !0), (r = l), (n = o);
            break;
          }
          if (a === n) {
            (i = !0), (n = l), (r = o);
            break;
          }
          a = a.sibling;
        }
        if (!i) throw Error(A(189));
      }
    }
    if (r.alternate !== n) throw Error(A(190));
  }
  if (r.tag !== 3) throw Error(A(188));
  return r.stateNode.current === r ? e : t;
}
function Gu(e) {
  return (e = Bd(e)), e !== null ? Yu(e) : null;
}
function Yu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Yu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ju = Ee.unstable_scheduleCallback,
  Ha = Ee.unstable_cancelCallback,
  Md = Ee.unstable_shouldYield,
  zd = Ee.unstable_requestPaint,
  Z = Ee.unstable_now,
  Pd = Ee.unstable_getCurrentPriorityLevel,
  Qi = Ee.unstable_ImmediatePriority,
  Zu = Ee.unstable_UserBlockingPriority,
  so = Ee.unstable_NormalPriority,
  Ld = Ee.unstable_LowPriority,
  Xu = Ee.unstable_IdlePriority,
  Po = null,
  Ke = null;
function Rd(e) {
  if (Ke && typeof Ke.onCommitFiberRoot == 'function')
    try {
      Ke.onCommitFiberRoot(Po, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Oe = Math.clz32 ? Math.clz32 : Od,
  jd = Math.log,
  _d = Math.LN2;
function Od(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((jd(e) / _d) | 0)) | 0;
}
var In = 64,
  Tn = 4194304;
function Lr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function uo(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var n = 0,
    o = e.suspendedLanes,
    l = e.pingedLanes,
    i = r & 268435455;
  if (i !== 0) {
    var a = i & ~o;
    a !== 0 ? (n = Lr(a)) : ((l &= i), l !== 0 && (n = Lr(l)));
  } else (i = r & ~o), i !== 0 ? (n = Lr(i)) : l !== 0 && (n = Lr(l));
  if (n === 0) return 0;
  if (
    t !== 0 &&
    t !== n &&
    !(t & o) &&
    ((o = n & -n), (l = t & -t), o >= l || (o === 16 && (l & 4194240) !== 0))
  )
    return t;
  if ((n & 4 && (n |= r & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= n; 0 < t; )
      (r = 31 - Oe(t)), (o = 1 << r), (n |= e[r]), (t &= ~o);
  return n;
}
function Ud(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Hd(e, t) {
  for (
    var r = e.suspendedLanes,
      n = e.pingedLanes,
      o = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;

  ) {
    var i = 31 - Oe(l),
      a = 1 << i,
      s = o[i];
    s === -1
      ? (!(a & r) || a & n) && (o[i] = Ud(a, t))
      : s <= t && (e.expiredLanes |= a),
      (l &= ~a);
  }
}
function Xl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function qu() {
  var e = In;
  return (In <<= 1), !(In & 4194240) && (In = 64), e;
}
function il(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function xn(e, t, r) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Oe(t)),
    (e[t] = r);
}
function Qd(e, t) {
  var r = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var n = e.eventTimes;
  for (e = e.expirationTimes; 0 < r; ) {
    var o = 31 - Oe(r),
      l = 1 << o;
    (t[o] = 0), (n[o] = -1), (e[o] = -1), (r &= ~l);
  }
}
function $i(e, t) {
  var r = (e.entangledLanes |= t);
  for (e = e.entanglements; r; ) {
    var n = 31 - Oe(r),
      o = 1 << n;
    (o & t) | (e[n] & t) && (e[n] |= t), (r &= ~o);
  }
}
var R = 0;
function ec(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var tc,
  Wi,
  rc,
  nc,
  oc,
  ql = !1,
  Bn = [],
  gt = null,
  ht = null,
  pt = null,
  tn = new Map(),
  rn = new Map(),
  ct = [],
  $d =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function Qa(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      gt = null;
      break;
    case 'dragenter':
    case 'dragleave':
      ht = null;
      break;
    case 'mouseover':
    case 'mouseout':
      pt = null;
      break;
    case 'pointerover':
    case 'pointerout':
      tn.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      rn.delete(t.pointerId);
  }
}
function Cr(e, t, r, n, o, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: n,
        nativeEvent: l,
        targetContainers: [o],
      }),
      t !== null && ((t = wn(t)), t !== null && Wi(t)),
      e)
    : ((e.eventSystemFlags |= n),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function Wd(e, t, r, n, o) {
  switch (t) {
    case 'focusin':
      return (gt = Cr(gt, e, t, r, n, o)), !0;
    case 'dragenter':
      return (ht = Cr(ht, e, t, r, n, o)), !0;
    case 'mouseover':
      return (pt = Cr(pt, e, t, r, n, o)), !0;
    case 'pointerover':
      var l = o.pointerId;
      return tn.set(l, Cr(tn.get(l) || null, e, t, r, n, o)), !0;
    case 'gotpointercapture':
      return (
        (l = o.pointerId), rn.set(l, Cr(rn.get(l) || null, e, t, r, n, o)), !0
      );
  }
  return !1;
}
function lc(e) {
  var t = Mt(e.target);
  if (t !== null) {
    var r = Wt(t);
    if (r !== null) {
      if (((t = r.tag), t === 13)) {
        if (((t = Vu(r)), t !== null)) {
          (e.blockedOn = t),
            oc(e.priority, function () {
              rc(r);
            });
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Gn(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = ei(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var n = new r.constructor(r.type, r);
      (Gl = n), r.target.dispatchEvent(n), (Gl = null);
    } else return (t = wn(r)), t !== null && Wi(t), (e.blockedOn = r), !1;
    t.shift();
  }
  return !0;
}
function $a(e, t, r) {
  Gn(e) && r.delete(t);
}
function Kd() {
  (ql = !1),
    gt !== null && Gn(gt) && (gt = null),
    ht !== null && Gn(ht) && (ht = null),
    pt !== null && Gn(pt) && (pt = null),
    tn.forEach($a),
    rn.forEach($a);
}
function kr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    ql ||
      ((ql = !0),
      Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, Kd)));
}
function nn(e) {
  function t(o) {
    return kr(o, e);
  }
  if (0 < Bn.length) {
    kr(Bn[0], e);
    for (var r = 1; r < Bn.length; r++) {
      var n = Bn[r];
      n.blockedOn === e && (n.blockedOn = null);
    }
  }
  for (
    gt !== null && kr(gt, e),
      ht !== null && kr(ht, e),
      pt !== null && kr(pt, e),
      tn.forEach(t),
      rn.forEach(t),
      r = 0;
    r < ct.length;
    r++
  )
    (n = ct[r]), n.blockedOn === e && (n.blockedOn = null);
  for (; 0 < ct.length && ((r = ct[0]), r.blockedOn === null); )
    lc(r), r.blockedOn === null && ct.shift();
}
var cr = lt.ReactCurrentBatchConfig,
  co = !0;
function Vd(e, t, r, n) {
  var o = R,
    l = cr.transition;
  cr.transition = null;
  try {
    (R = 1), Ki(e, t, r, n);
  } finally {
    (R = o), (cr.transition = l);
  }
}
function Gd(e, t, r, n) {
  var o = R,
    l = cr.transition;
  cr.transition = null;
  try {
    (R = 4), Ki(e, t, r, n);
  } finally {
    (R = o), (cr.transition = l);
  }
}
function Ki(e, t, r, n) {
  if (co) {
    var o = ei(e, t, r, n);
    if (o === null) pl(e, t, n, fo, r), Qa(e, n);
    else if (Wd(o, e, t, r, n)) n.stopPropagation();
    else if ((Qa(e, n), t & 4 && -1 < $d.indexOf(e))) {
      for (; o !== null; ) {
        var l = wn(o);
        if (
          (l !== null && tc(l),
          (l = ei(e, t, r, n)),
          l === null && pl(e, t, n, fo, r),
          l === o)
        )
          break;
        o = l;
      }
      o !== null && n.stopPropagation();
    } else pl(e, t, n, null, r);
  }
}
var fo = null;
function ei(e, t, r, n) {
  if (((fo = null), (e = Hi(n)), (e = Mt(e)), e !== null))
    if (((t = Wt(e)), t === null)) e = null;
    else if (((r = t.tag), r === 13)) {
      if (((e = Vu(t)), e !== null)) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (fo = e), null;
}
function ic(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (Pd()) {
        case Qi:
          return 1;
        case Zu:
          return 4;
        case so:
        case Ld:
          return 16;
        case Xu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ft = null,
  Vi = null,
  Yn = null;
function ac() {
  if (Yn) return Yn;
  var e,
    t = Vi,
    r = t.length,
    n,
    o = 'value' in ft ? ft.value : ft.textContent,
    l = o.length;
  for (e = 0; e < r && t[e] === o[e]; e++);
  var i = r - e;
  for (n = 1; n <= i && t[r - n] === o[l - n]; n++);
  return (Yn = o.slice(e, 1 < n ? 1 - n : void 0));
}
function Jn(e) {
  var t = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Mn() {
  return !0;
}
function Wa() {
  return !1;
}
function ke(e) {
  function t(r, n, o, l, i) {
    (this._reactName = r),
      (this._targetInst = o),
      (this.type = n),
      (this.nativeEvent = l),
      (this.target = i),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((r = e[a]), (this[a] = r ? r(l) : l[a]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? Mn
        : Wa),
      (this.isPropagationStopped = Wa),
      this
    );
  }
  return (
    V(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r &&
          (r.preventDefault
            ? r.preventDefault()
            : typeof r.returnValue != 'unknown' && (r.returnValue = !1),
          (this.isDefaultPrevented = Mn));
      },
      stopPropagation: function () {
        var r = this.nativeEvent;
        r &&
          (r.stopPropagation
            ? r.stopPropagation()
            : typeof r.cancelBubble != 'unknown' && (r.cancelBubble = !0),
          (this.isPropagationStopped = Mn));
      },
      persist: function () {},
      isPersistent: Mn,
    }),
    t
  );
}
var wr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Gi = ke(wr),
  An = V({}, wr, { view: 0, detail: 0 }),
  Yd = ke(An),
  al,
  sl,
  Nr,
  Lo = V({}, An, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Yi,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== Nr &&
            (Nr && e.type === 'mousemove'
              ? ((al = e.screenX - Nr.screenX), (sl = e.screenY - Nr.screenY))
              : (sl = al = 0),
            (Nr = e)),
          al);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : sl;
    },
  }),
  Ka = ke(Lo),
  Jd = V({}, Lo, { dataTransfer: 0 }),
  Zd = ke(Jd),
  Xd = V({}, An, { relatedTarget: 0 }),
  ul = ke(Xd),
  qd = V({}, wr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  ef = ke(qd),
  tf = V({}, wr, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  rf = ke(tf),
  nf = V({}, wr, { data: 0 }),
  Va = ke(nf),
  of = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  lf = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  af = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  };
function sf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = af[e]) ? !!t[e] : !1;
}
function Yi() {
  return sf;
}
var uf = V({}, An, {
    key: function (e) {
      if (e.key) {
        var t = of[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = Jn(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
        ? lf[e.keyCode] || 'Unidentified'
        : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Yi,
    charCode: function (e) {
      return e.type === 'keypress' ? Jn(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? Jn(e)
        : e.type === 'keydown' || e.type === 'keyup'
        ? e.keyCode
        : 0;
    },
  }),
  cf = ke(uf),
  df = V({}, Lo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ga = ke(df),
  ff = V({}, An, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Yi,
  }),
  mf = ke(ff),
  gf = V({}, wr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  hf = ke(gf),
  pf = V({}, Lo, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
        ? -e.wheelDeltaY
        : 'wheelDelta' in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  bf = ke(pf),
  yf = [9, 13, 27, 32],
  Ji = et && 'CompositionEvent' in window,
  Or = null;
et && 'documentMode' in document && (Or = document.documentMode);
var vf = et && 'TextEvent' in window && !Or,
  sc = et && (!Ji || (Or && 8 < Or && 11 >= Or)),
  Ya = ' ',
  Ja = !1;
function uc(e, t) {
  switch (e) {
    case 'keyup':
      return yf.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function cc(e) {
  return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
}
var Jt = !1;
function xf(e, t) {
  switch (e) {
    case 'compositionend':
      return cc(t);
    case 'keypress':
      return t.which !== 32 ? null : ((Ja = !0), Ya);
    case 'textInput':
      return (e = t.data), e === Ya && Ja ? null : e;
    default:
      return null;
  }
}
function Af(e, t) {
  if (Jt)
    return e === 'compositionend' || (!Ji && uc(e, t))
      ? ((e = ac()), (Yn = Vi = ft = null), (Jt = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return sc && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var wf = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Za(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!wf[e.type] : t === 'textarea';
}
function dc(e, t, r, n) {
  Hu(n),
    (t = mo(t, 'onChange')),
    0 < t.length &&
      ((r = new Gi('onChange', 'change', null, r, n)),
      e.push({ event: r, listeners: t }));
}
var Ur = null,
  on = null;
function Sf(e) {
  wc(e, 0);
}
function Ro(e) {
  var t = qt(e);
  if (Pu(t)) return e;
}
function Df(e, t) {
  if (e === 'change') return t;
}
var fc = !1;
if (et) {
  var cl;
  if (et) {
    var dl = 'oninput' in document;
    if (!dl) {
      var Xa = document.createElement('div');
      Xa.setAttribute('oninput', 'return;'),
        (dl = typeof Xa.oninput == 'function');
    }
    cl = dl;
  } else cl = !1;
  fc = cl && (!document.documentMode || 9 < document.documentMode);
}
function qa() {
  Ur && (Ur.detachEvent('onpropertychange', mc), (on = Ur = null));
}
function mc(e) {
  if (e.propertyName === 'value' && Ro(on)) {
    var t = [];
    dc(t, on, e, Hi(e)), Ku(Sf, t);
  }
}
function Ff(e, t, r) {
  e === 'focusin'
    ? (qa(), (Ur = t), (on = r), Ur.attachEvent('onpropertychange', mc))
    : e === 'focusout' && qa();
}
function Ef(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return Ro(on);
}
function Cf(e, t) {
  if (e === 'click') return Ro(t);
}
function kf(e, t) {
  if (e === 'input' || e === 'change') return Ro(t);
}
function Nf(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var He = typeof Object.is == 'function' ? Object.is : Nf;
function ln(e, t) {
  if (He(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1;
  var r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (n = 0; n < r.length; n++) {
    var o = r[n];
    if (!Ll.call(t, o) || !He(e[o], t[o])) return !1;
  }
  return !0;
}
function es(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ts(e, t) {
  var r = es(e);
  e = 0;
  for (var n; r; ) {
    if (r.nodeType === 3) {
      if (((n = e + r.textContent.length), e <= t && n >= t))
        return { node: r, offset: t - e };
      e = n;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = es(r);
  }
}
function gc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? gc(e, t.parentNode)
      : 'contains' in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function hc() {
  for (var e = window, t = lo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == 'string';
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = lo(e.document);
  }
  return t;
}
function Zi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function If(e) {
  var t = hc(),
    r = e.focusedElem,
    n = e.selectionRange;
  if (
    t !== r &&
    r &&
    r.ownerDocument &&
    gc(r.ownerDocument.documentElement, r)
  ) {
    if (n !== null && Zi(r)) {
      if (
        ((t = n.start),
        (e = n.end),
        e === void 0 && (e = t),
        'selectionStart' in r)
      )
        (r.selectionStart = t), (r.selectionEnd = Math.min(e, r.value.length));
      else if (
        ((e = ((t = r.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = r.textContent.length,
          l = Math.min(n.start, o);
        (n = n.end === void 0 ? l : Math.min(n.end, o)),
          !e.extend && l > n && ((o = n), (n = l), (l = o)),
          (o = ts(r, l));
        var i = ts(r, n);
        o &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          l > n
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == 'function' && r.focus(), r = 0; r < t.length; r++)
      (e = t[r]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Tf = et && 'documentMode' in document && 11 >= document.documentMode,
  Zt = null,
  ti = null,
  Hr = null,
  ri = !1;
function rs(e, t, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  ri ||
    Zt == null ||
    Zt !== lo(n) ||
    ((n = Zt),
    'selectionStart' in n && Zi(n)
      ? (n = { start: n.selectionStart, end: n.selectionEnd })
      : ((n = (
          (n.ownerDocument && n.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (n = {
          anchorNode: n.anchorNode,
          anchorOffset: n.anchorOffset,
          focusNode: n.focusNode,
          focusOffset: n.focusOffset,
        })),
    (Hr && ln(Hr, n)) ||
      ((Hr = n),
      (n = mo(ti, 'onSelect')),
      0 < n.length &&
        ((t = new Gi('onSelect', 'select', null, t, r)),
        e.push({ event: t, listeners: n }),
        (t.target = Zt))));
}
function zn(e, t) {
  var r = {};
  return (
    (r[e.toLowerCase()] = t.toLowerCase()),
    (r['Webkit' + e] = 'webkit' + t),
    (r['Moz' + e] = 'moz' + t),
    r
  );
}
var Xt = {
    animationend: zn('Animation', 'AnimationEnd'),
    animationiteration: zn('Animation', 'AnimationIteration'),
    animationstart: zn('Animation', 'AnimationStart'),
    transitionend: zn('Transition', 'TransitionEnd'),
  },
  fl = {},
  pc = {};
et &&
  ((pc = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete Xt.animationend.animation,
    delete Xt.animationiteration.animation,
    delete Xt.animationstart.animation),
  'TransitionEvent' in window || delete Xt.transitionend.transition);
function jo(e) {
  if (fl[e]) return fl[e];
  if (!Xt[e]) return e;
  var t = Xt[e],
    r;
  for (r in t) if (t.hasOwnProperty(r) && r in pc) return (fl[e] = t[r]);
  return e;
}
var bc = jo('animationend'),
  yc = jo('animationiteration'),
  vc = jo('animationstart'),
  xc = jo('transitionend'),
  Ac = new Map(),
  ns =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function Ft(e, t) {
  Ac.set(e, t), $t(t, [e]);
}
for (var ml = 0; ml < ns.length; ml++) {
  var gl = ns[ml],
    Bf = gl.toLowerCase(),
    Mf = gl[0].toUpperCase() + gl.slice(1);
  Ft(Bf, 'on' + Mf);
}
Ft(bc, 'onAnimationEnd');
Ft(yc, 'onAnimationIteration');
Ft(vc, 'onAnimationStart');
Ft('dblclick', 'onDoubleClick');
Ft('focusin', 'onFocus');
Ft('focusout', 'onBlur');
Ft(xc, 'onTransitionEnd');
mr('onMouseEnter', ['mouseout', 'mouseover']);
mr('onMouseLeave', ['mouseout', 'mouseover']);
mr('onPointerEnter', ['pointerout', 'pointerover']);
mr('onPointerLeave', ['pointerout', 'pointerover']);
$t(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(' ')
);
$t(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' '
  )
);
$t('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
$t(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
$t(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
$t(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
var Rr =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  zf = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Rr));
function os(e, t, r) {
  var n = e.type || 'unknown-event';
  (e.currentTarget = r), Td(n, t, void 0, e), (e.currentTarget = null);
}
function wc(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var n = e[r],
      o = n.event;
    n = n.listeners;
    e: {
      var l = void 0;
      if (t)
        for (var i = n.length - 1; 0 <= i; i--) {
          var a = n[i],
            s = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), s !== l && o.isPropagationStopped())) break e;
          os(o, a, u), (l = s);
        }
      else
        for (i = 0; i < n.length; i++) {
          if (
            ((a = n[i]),
            (s = a.instance),
            (u = a.currentTarget),
            (a = a.listener),
            s !== l && o.isPropagationStopped())
          )
            break e;
          os(o, a, u), (l = s);
        }
    }
  }
  if (ao) throw ((e = Zl), (ao = !1), (Zl = null), e);
}
function U(e, t) {
  var r = t[ai];
  r === void 0 && (r = t[ai] = new Set());
  var n = e + '__bubble';
  r.has(n) || (Sc(t, e, 2, !1), r.add(n));
}
function hl(e, t, r) {
  var n = 0;
  t && (n |= 4), Sc(r, e, n, t);
}
var Pn = '_reactListening' + Math.random().toString(36).slice(2);
function an(e) {
  if (!e[Pn]) {
    (e[Pn] = !0),
      Iu.forEach(function (r) {
        r !== 'selectionchange' && (zf.has(r) || hl(r, !1, e), hl(r, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Pn] || ((t[Pn] = !0), hl('selectionchange', !1, t));
  }
}
function Sc(e, t, r, n) {
  switch (ic(t)) {
    case 1:
      var o = Vd;
      break;
    case 4:
      o = Gd;
      break;
    default:
      o = Ki;
  }
  (r = o.bind(null, t, r, e)),
    (o = void 0),
    !Jl ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (o = !0),
    n
      ? o !== void 0
        ? e.addEventListener(t, r, { capture: !0, passive: o })
        : e.addEventListener(t, r, !0)
      : o !== void 0
      ? e.addEventListener(t, r, { passive: o })
      : e.addEventListener(t, r, !1);
}
function pl(e, t, r, n, o) {
  var l = n;
  if (!(t & 1) && !(t & 2) && n !== null)
    e: for (;;) {
      if (n === null) return;
      var i = n.tag;
      if (i === 3 || i === 4) {
        var a = n.stateNode.containerInfo;
        if (a === o || (a.nodeType === 8 && a.parentNode === o)) break;
        if (i === 4)
          for (i = n.return; i !== null; ) {
            var s = i.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = i.stateNode.containerInfo),
              s === o || (s.nodeType === 8 && s.parentNode === o))
            )
              return;
            i = i.return;
          }
        for (; a !== null; ) {
          if (((i = Mt(a)), i === null)) return;
          if (((s = i.tag), s === 5 || s === 6)) {
            n = l = i;
            continue e;
          }
          a = a.parentNode;
        }
      }
      n = n.return;
    }
  Ku(function () {
    var u = l,
      m = Hi(r),
      p = [];
    e: {
      var h = Ac.get(e);
      if (h !== void 0) {
        var y = Gi,
          x = e;
        switch (e) {
          case 'keypress':
            if (Jn(r) === 0) break e;
          case 'keydown':
          case 'keyup':
            y = cf;
            break;
          case 'focusin':
            (x = 'focus'), (y = ul);
            break;
          case 'focusout':
            (x = 'blur'), (y = ul);
            break;
          case 'beforeblur':
          case 'afterblur':
            y = ul;
            break;
          case 'click':
            if (r.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            y = Ka;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            y = Zd;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            y = mf;
            break;
          case bc:
          case yc:
          case vc:
            y = ef;
            break;
          case xc:
            y = hf;
            break;
          case 'scroll':
            y = Yd;
            break;
          case 'wheel':
            y = bf;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            y = rf;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            y = Ga;
        }
        var w = (t & 4) !== 0,
          P = !w && e === 'scroll',
          f = w ? (h !== null ? h + 'Capture' : null) : h;
        w = [];
        for (var d = u, g; d !== null; ) {
          g = d;
          var v = g.stateNode;
          if (
            (g.tag === 5 &&
              v !== null &&
              ((g = v),
              f !== null && ((v = en(d, f)), v != null && w.push(sn(d, v, g)))),
            P)
          )
            break;
          d = d.return;
        }
        0 < w.length &&
          ((h = new y(h, x, null, r, m)), p.push({ event: h, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === 'mouseover' || e === 'pointerover'),
          (y = e === 'mouseout' || e === 'pointerout'),
          h &&
            r !== Gl &&
            (x = r.relatedTarget || r.fromElement) &&
            (Mt(x) || x[tt]))
        )
          break e;
        if (
          (y || h) &&
          ((h =
            m.window === m
              ? m
              : (h = m.ownerDocument)
              ? h.defaultView || h.parentWindow
              : window),
          y
            ? ((x = r.relatedTarget || r.toElement),
              (y = u),
              (x = x ? Mt(x) : null),
              x !== null &&
                ((P = Wt(x)), x !== P || (x.tag !== 5 && x.tag !== 6)) &&
                (x = null))
            : ((y = null), (x = u)),
          y !== x)
        ) {
          if (
            ((w = Ka),
            (v = 'onMouseLeave'),
            (f = 'onMouseEnter'),
            (d = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((w = Ga),
              (v = 'onPointerLeave'),
              (f = 'onPointerEnter'),
              (d = 'pointer')),
            (P = y == null ? h : qt(y)),
            (g = x == null ? h : qt(x)),
            (h = new w(v, d + 'leave', y, r, m)),
            (h.target = P),
            (h.relatedTarget = g),
            (v = null),
            Mt(m) === u &&
              ((w = new w(f, d + 'enter', x, r, m)),
              (w.target = g),
              (w.relatedTarget = P),
              (v = w)),
            (P = v),
            y && x)
          )
            t: {
              for (w = y, f = x, d = 0, g = w; g; g = Vt(g)) d++;
              for (g = 0, v = f; v; v = Vt(v)) g++;
              for (; 0 < d - g; ) (w = Vt(w)), d--;
              for (; 0 < g - d; ) (f = Vt(f)), g--;
              for (; d--; ) {
                if (w === f || (f !== null && w === f.alternate)) break t;
                (w = Vt(w)), (f = Vt(f));
              }
              w = null;
            }
          else w = null;
          y !== null && ls(p, h, y, w, !1),
            x !== null && P !== null && ls(p, P, x, w, !0);
        }
      }
      e: {
        if (
          ((h = u ? qt(u) : window),
          (y = h.nodeName && h.nodeName.toLowerCase()),
          y === 'select' || (y === 'input' && h.type === 'file'))
        )
          var S = Df;
        else if (Za(h))
          if (fc) S = kf;
          else {
            S = Ef;
            var C = Ff;
          }
        else
          (y = h.nodeName) &&
            y.toLowerCase() === 'input' &&
            (h.type === 'checkbox' || h.type === 'radio') &&
            (S = Cf);
        if (S && (S = S(e, u))) {
          dc(p, S, r, m);
          break e;
        }
        C && C(e, h, u),
          e === 'focusout' &&
            (C = h._wrapperState) &&
            C.controlled &&
            h.type === 'number' &&
            Ql(h, 'number', h.value);
      }
      switch (((C = u ? qt(u) : window), e)) {
        case 'focusin':
          (Za(C) || C.contentEditable === 'true') &&
            ((Zt = C), (ti = u), (Hr = null));
          break;
        case 'focusout':
          Hr = ti = Zt = null;
          break;
        case 'mousedown':
          ri = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          (ri = !1), rs(p, r, m);
          break;
        case 'selectionchange':
          if (Tf) break;
        case 'keydown':
        case 'keyup':
          rs(p, r, m);
      }
      var k;
      if (Ji)
        e: {
          switch (e) {
            case 'compositionstart':
              var N = 'onCompositionStart';
              break e;
            case 'compositionend':
              N = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              N = 'onCompositionUpdate';
              break e;
          }
          N = void 0;
        }
      else
        Jt
          ? uc(e, r) && (N = 'onCompositionEnd')
          : e === 'keydown' && r.keyCode === 229 && (N = 'onCompositionStart');
      N &&
        (sc &&
          r.locale !== 'ko' &&
          (Jt || N !== 'onCompositionStart'
            ? N === 'onCompositionEnd' && Jt && (k = ac())
            : ((ft = m),
              (Vi = 'value' in ft ? ft.value : ft.textContent),
              (Jt = !0))),
        (C = mo(u, N)),
        0 < C.length &&
          ((N = new Va(N, e, null, r, m)),
          p.push({ event: N, listeners: C }),
          k ? (N.data = k) : ((k = cc(r)), k !== null && (N.data = k)))),
        (k = vf ? xf(e, r) : Af(e, r)) &&
          ((u = mo(u, 'onBeforeInput')),
          0 < u.length &&
            ((m = new Va('onBeforeInput', 'beforeinput', null, r, m)),
            p.push({ event: m, listeners: u }),
            (m.data = k)));
    }
    wc(p, t);
  });
}
function sn(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function mo(e, t) {
  for (var r = t + 'Capture', n = []; e !== null; ) {
    var o = e,
      l = o.stateNode;
    o.tag === 5 &&
      l !== null &&
      ((o = l),
      (l = en(e, r)),
      l != null && n.unshift(sn(e, l, o)),
      (l = en(e, t)),
      l != null && n.push(sn(e, l, o))),
      (e = e.return);
  }
  return n;
}
function Vt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ls(e, t, r, n, o) {
  for (var l = t._reactName, i = []; r !== null && r !== n; ) {
    var a = r,
      s = a.alternate,
      u = a.stateNode;
    if (s !== null && s === n) break;
    a.tag === 5 &&
      u !== null &&
      ((a = u),
      o
        ? ((s = en(r, l)), s != null && i.unshift(sn(r, s, a)))
        : o || ((s = en(r, l)), s != null && i.push(sn(r, s, a)))),
      (r = r.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Pf = /\r\n?/g,
  Lf = /\u0000|\uFFFD/g;
function is(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      Pf,
      `
`
    )
    .replace(Lf, '');
}
function Ln(e, t, r) {
  if (((t = is(t)), is(e) !== t && r)) throw Error(A(425));
}
function go() {}
var ni = null,
  oi = null;
function li(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ii = typeof setTimeout == 'function' ? setTimeout : void 0,
  Rf = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  as = typeof Promise == 'function' ? Promise : void 0,
  jf =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof as < 'u'
      ? function (e) {
          return as.resolve(null).then(e).catch(_f);
        }
      : ii;
function _f(e) {
  setTimeout(function () {
    throw e;
  });
}
function bl(e, t) {
  var r = t,
    n = 0;
  do {
    var o = r.nextSibling;
    if ((e.removeChild(r), o && o.nodeType === 8))
      if (((r = o.data), r === '/$')) {
        if (n === 0) {
          e.removeChild(o), nn(t);
          return;
        }
        n--;
      } else (r !== '$' && r !== '$?' && r !== '$!') || n++;
    r = o;
  } while (r);
  nn(t);
}
function bt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function ss(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === '$' || r === '$!' || r === '$?') {
        if (t === 0) return e;
        t--;
      } else r === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Sr = Math.random().toString(36).slice(2),
  We = '__reactFiber$' + Sr,
  un = '__reactProps$' + Sr,
  tt = '__reactContainer$' + Sr,
  ai = '__reactEvents$' + Sr,
  Of = '__reactListeners$' + Sr,
  Uf = '__reactHandles$' + Sr;
function Mt(e) {
  var t = e[We];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if ((t = r[tt] || r[We])) {
      if (
        ((r = t.alternate),
        t.child !== null || (r !== null && r.child !== null))
      )
        for (e = ss(e); e !== null; ) {
          if ((r = e[We])) return r;
          e = ss(e);
        }
      return t;
    }
    (e = r), (r = e.parentNode);
  }
  return null;
}
function wn(e) {
  return (
    (e = e[We] || e[tt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function qt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(A(33));
}
function _o(e) {
  return e[un] || null;
}
var si = [],
  er = -1;
function Et(e) {
  return { current: e };
}
function H(e) {
  0 > er || ((e.current = si[er]), (si[er] = null), er--);
}
function _(e, t) {
  er++, (si[er] = e.current), (e.current = t);
}
var Dt = {},
  de = Et(Dt),
  ye = Et(!1),
  jt = Dt;
function gr(e, t) {
  var r = e.type.contextTypes;
  if (!r) return Dt;
  var n = e.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
    return n.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    l;
  for (l in r) o[l] = t[l];
  return (
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function ve(e) {
  return (e = e.childContextTypes), e != null;
}
function ho() {
  H(ye), H(de);
}
function us(e, t, r) {
  if (de.current !== Dt) throw Error(A(168));
  _(de, t), _(ye, r);
}
function Dc(e, t, r) {
  var n = e.stateNode;
  if (((t = t.childContextTypes), typeof n.getChildContext != 'function'))
    return r;
  n = n.getChildContext();
  for (var o in n) if (!(o in t)) throw Error(A(108, Dd(e) || 'Unknown', o));
  return V({}, r, n);
}
function po(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Dt),
    (jt = de.current),
    _(de, e),
    _(ye, ye.current),
    !0
  );
}
function cs(e, t, r) {
  var n = e.stateNode;
  if (!n) throw Error(A(169));
  r
    ? ((e = Dc(e, t, jt)),
      (n.__reactInternalMemoizedMergedChildContext = e),
      H(ye),
      H(de),
      _(de, e))
    : H(ye),
    _(ye, r);
}
var Je = null,
  Oo = !1,
  yl = !1;
function Fc(e) {
  Je === null ? (Je = [e]) : Je.push(e);
}
function Hf(e) {
  (Oo = !0), Fc(e);
}
function Ct() {
  if (!yl && Je !== null) {
    yl = !0;
    var e = 0,
      t = R;
    try {
      var r = Je;
      for (R = 1; e < r.length; e++) {
        var n = r[e];
        do n = n(!0);
        while (n !== null);
      }
      (Je = null), (Oo = !1);
    } catch (o) {
      throw (Je !== null && (Je = Je.slice(e + 1)), Ju(Qi, Ct), o);
    } finally {
      (R = t), (yl = !1);
    }
  }
  return null;
}
var tr = [],
  rr = 0,
  bo = null,
  yo = 0,
  Ne = [],
  Ie = 0,
  _t = null,
  Ze = 1,
  Xe = '';
function Tt(e, t) {
  (tr[rr++] = yo), (tr[rr++] = bo), (bo = e), (yo = t);
}
function Ec(e, t, r) {
  (Ne[Ie++] = Ze), (Ne[Ie++] = Xe), (Ne[Ie++] = _t), (_t = e);
  var n = Ze;
  e = Xe;
  var o = 32 - Oe(n) - 1;
  (n &= ~(1 << o)), (r += 1);
  var l = 32 - Oe(t) + o;
  if (30 < l) {
    var i = o - (o % 5);
    (l = (n & ((1 << i) - 1)).toString(32)),
      (n >>= i),
      (o -= i),
      (Ze = (1 << (32 - Oe(t) + o)) | (r << o) | n),
      (Xe = l + e);
  } else (Ze = (1 << l) | (r << o) | n), (Xe = e);
}
function Xi(e) {
  e.return !== null && (Tt(e, 1), Ec(e, 1, 0));
}
function qi(e) {
  for (; e === bo; )
    (bo = tr[--rr]), (tr[rr] = null), (yo = tr[--rr]), (tr[rr] = null);
  for (; e === _t; )
    (_t = Ne[--Ie]),
      (Ne[Ie] = null),
      (Xe = Ne[--Ie]),
      (Ne[Ie] = null),
      (Ze = Ne[--Ie]),
      (Ne[Ie] = null);
}
var Fe = null,
  De = null,
  Q = !1,
  je = null;
function Cc(e, t) {
  var r = Te(5, null, null, 0);
  (r.elementType = 'DELETED'),
    (r.stateNode = t),
    (r.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r);
}
function ds(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return (
        (t =
          t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Fe = e), (De = bt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Fe = e), (De = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((r = _t !== null ? { id: Ze, overflow: Xe } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: r,
              retryLane: 1073741824,
            }),
            (r = Te(18, null, null, 0)),
            (r.stateNode = t),
            (r.return = e),
            (e.child = r),
            (Fe = e),
            (De = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ui(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ci(e) {
  if (Q) {
    var t = De;
    if (t) {
      var r = t;
      if (!ds(e, t)) {
        if (ui(e)) throw Error(A(418));
        t = bt(r.nextSibling);
        var n = Fe;
        t && ds(e, t)
          ? Cc(n, r)
          : ((e.flags = (e.flags & -4097) | 2), (Q = !1), (Fe = e));
      }
    } else {
      if (ui(e)) throw Error(A(418));
      (e.flags = (e.flags & -4097) | 2), (Q = !1), (Fe = e);
    }
  }
}
function fs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Fe = e;
}
function Rn(e) {
  if (e !== Fe) return !1;
  if (!Q) return fs(e), (Q = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !li(e.type, e.memoizedProps))),
    t && (t = De))
  ) {
    if (ui(e)) throw (kc(), Error(A(418)));
    for (; t; ) Cc(e, t), (t = bt(t.nextSibling));
  }
  if ((fs(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(A(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === '/$') {
            if (t === 0) {
              De = bt(e.nextSibling);
              break e;
            }
            t--;
          } else (r !== '$' && r !== '$!' && r !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      De = null;
    }
  } else De = Fe ? bt(e.stateNode.nextSibling) : null;
  return !0;
}
function kc() {
  for (var e = De; e; ) e = bt(e.nextSibling);
}
function hr() {
  (De = Fe = null), (Q = !1);
}
function ea(e) {
  je === null ? (je = [e]) : je.push(e);
}
var Qf = lt.ReactCurrentBatchConfig;
function Ir(e, t, r) {
  if (
    ((e = r.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (r._owner) {
      if (((r = r._owner), r)) {
        if (r.tag !== 1) throw Error(A(309));
        var n = r.stateNode;
      }
      if (!n) throw Error(A(147, e));
      var o = n,
        l = '' + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === l
        ? t.ref
        : ((t = function (i) {
            var a = o.refs;
            i === null ? delete a[l] : (a[l] = i);
          }),
          (t._stringRef = l),
          t);
    }
    if (typeof e != 'string') throw Error(A(284));
    if (!r._owner) throw Error(A(290, e));
  }
  return e;
}
function jn(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      A(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e
      )
    ))
  );
}
function ms(e) {
  var t = e._init;
  return t(e._payload);
}
function Nc(e) {
  function t(f, d) {
    if (e) {
      var g = f.deletions;
      g === null ? ((f.deletions = [d]), (f.flags |= 16)) : g.push(d);
    }
  }
  function r(f, d) {
    if (!e) return null;
    for (; d !== null; ) t(f, d), (d = d.sibling);
    return null;
  }
  function n(f, d) {
    for (f = new Map(); d !== null; )
      d.key !== null ? f.set(d.key, d) : f.set(d.index, d), (d = d.sibling);
    return f;
  }
  function o(f, d) {
    return (f = At(f, d)), (f.index = 0), (f.sibling = null), f;
  }
  function l(f, d, g) {
    return (
      (f.index = g),
      e
        ? ((g = f.alternate),
          g !== null
            ? ((g = g.index), g < d ? ((f.flags |= 2), d) : g)
            : ((f.flags |= 2), d))
        : ((f.flags |= 1048576), d)
    );
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function a(f, d, g, v) {
    return d === null || d.tag !== 6
      ? ((d = Fl(g, f.mode, v)), (d.return = f), d)
      : ((d = o(d, g)), (d.return = f), d);
  }
  function s(f, d, g, v) {
    var S = g.type;
    return S === Yt
      ? m(f, d, g.props.children, v, g.key)
      : d !== null &&
        (d.elementType === S ||
          (typeof S == 'object' &&
            S !== null &&
            S.$$typeof === st &&
            ms(S) === d.type))
      ? ((v = o(d, g.props)), (v.ref = Ir(f, d, g)), (v.return = f), v)
      : ((v = no(g.type, g.key, g.props, null, f.mode, v)),
        (v.ref = Ir(f, d, g)),
        (v.return = f),
        v);
  }
  function u(f, d, g, v) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== g.containerInfo ||
      d.stateNode.implementation !== g.implementation
      ? ((d = El(g, f.mode, v)), (d.return = f), d)
      : ((d = o(d, g.children || [])), (d.return = f), d);
  }
  function m(f, d, g, v, S) {
    return d === null || d.tag !== 7
      ? ((d = Rt(g, f.mode, v, S)), (d.return = f), d)
      : ((d = o(d, g)), (d.return = f), d);
  }
  function p(f, d, g) {
    if ((typeof d == 'string' && d !== '') || typeof d == 'number')
      return (d = Fl('' + d, f.mode, g)), (d.return = f), d;
    if (typeof d == 'object' && d !== null) {
      switch (d.$$typeof) {
        case Cn:
          return (
            (g = no(d.type, d.key, d.props, null, f.mode, g)),
            (g.ref = Ir(f, null, d)),
            (g.return = f),
            g
          );
        case Gt:
          return (d = El(d, f.mode, g)), (d.return = f), d;
        case st:
          var v = d._init;
          return p(f, v(d._payload), g);
      }
      if (Pr(d) || Fr(d))
        return (d = Rt(d, f.mode, g, null)), (d.return = f), d;
      jn(f, d);
    }
    return null;
  }
  function h(f, d, g, v) {
    var S = d !== null ? d.key : null;
    if ((typeof g == 'string' && g !== '') || typeof g == 'number')
      return S !== null ? null : a(f, d, '' + g, v);
    if (typeof g == 'object' && g !== null) {
      switch (g.$$typeof) {
        case Cn:
          return g.key === S ? s(f, d, g, v) : null;
        case Gt:
          return g.key === S ? u(f, d, g, v) : null;
        case st:
          return (S = g._init), h(f, d, S(g._payload), v);
      }
      if (Pr(g) || Fr(g)) return S !== null ? null : m(f, d, g, v, null);
      jn(f, g);
    }
    return null;
  }
  function y(f, d, g, v, S) {
    if ((typeof v == 'string' && v !== '') || typeof v == 'number')
      return (f = f.get(g) || null), a(d, f, '' + v, S);
    if (typeof v == 'object' && v !== null) {
      switch (v.$$typeof) {
        case Cn:
          return (f = f.get(v.key === null ? g : v.key) || null), s(d, f, v, S);
        case Gt:
          return (f = f.get(v.key === null ? g : v.key) || null), u(d, f, v, S);
        case st:
          var C = v._init;
          return y(f, d, g, C(v._payload), S);
      }
      if (Pr(v) || Fr(v)) return (f = f.get(g) || null), m(d, f, v, S, null);
      jn(d, v);
    }
    return null;
  }
  function x(f, d, g, v) {
    for (
      var S = null, C = null, k = d, N = (d = 0), O = null;
      k !== null && N < g.length;
      N++
    ) {
      k.index > N ? ((O = k), (k = null)) : (O = k.sibling);
      var D = h(f, k, g[N], v);
      if (D === null) {
        k === null && (k = O);
        break;
      }
      e && k && D.alternate === null && t(f, k),
        (d = l(D, d, N)),
        C === null ? (S = D) : (C.sibling = D),
        (C = D),
        (k = O);
    }
    if (N === g.length) return r(f, k), Q && Tt(f, N), S;
    if (k === null) {
      for (; N < g.length; N++)
        (k = p(f, g[N], v)),
          k !== null &&
            ((d = l(k, d, N)), C === null ? (S = k) : (C.sibling = k), (C = k));
      return Q && Tt(f, N), S;
    }
    for (k = n(f, k); N < g.length; N++)
      (O = y(k, f, N, g[N], v)),
        O !== null &&
          (e && O.alternate !== null && k.delete(O.key === null ? N : O.key),
          (d = l(O, d, N)),
          C === null ? (S = O) : (C.sibling = O),
          (C = O));
    return (
      e &&
        k.forEach(function (T) {
          return t(f, T);
        }),
      Q && Tt(f, N),
      S
    );
  }
  function w(f, d, g, v) {
    var S = Fr(g);
    if (typeof S != 'function') throw Error(A(150));
    if (((g = S.call(g)), g == null)) throw Error(A(151));
    for (
      var C = (S = null), k = d, N = (d = 0), O = null, D = g.next();
      k !== null && !D.done;
      N++, D = g.next()
    ) {
      k.index > N ? ((O = k), (k = null)) : (O = k.sibling);
      var T = h(f, k, D.value, v);
      if (T === null) {
        k === null && (k = O);
        break;
      }
      e && k && T.alternate === null && t(f, k),
        (d = l(T, d, N)),
        C === null ? (S = T) : (C.sibling = T),
        (C = T),
        (k = O);
    }
    if (D.done) return r(f, k), Q && Tt(f, N), S;
    if (k === null) {
      for (; !D.done; N++, D = g.next())
        (D = p(f, D.value, v)),
          D !== null &&
            ((d = l(D, d, N)), C === null ? (S = D) : (C.sibling = D), (C = D));
      return Q && Tt(f, N), S;
    }
    for (k = n(f, k); !D.done; N++, D = g.next())
      (D = y(k, f, N, D.value, v)),
        D !== null &&
          (e && D.alternate !== null && k.delete(D.key === null ? N : D.key),
          (d = l(D, d, N)),
          C === null ? (S = D) : (C.sibling = D),
          (C = D));
    return (
      e &&
        k.forEach(function ($) {
          return t(f, $);
        }),
      Q && Tt(f, N),
      S
    );
  }
  function P(f, d, g, v) {
    if (
      (typeof g == 'object' &&
        g !== null &&
        g.type === Yt &&
        g.key === null &&
        (g = g.props.children),
      typeof g == 'object' && g !== null)
    ) {
      switch (g.$$typeof) {
        case Cn:
          e: {
            for (var S = g.key, C = d; C !== null; ) {
              if (C.key === S) {
                if (((S = g.type), S === Yt)) {
                  if (C.tag === 7) {
                    r(f, C.sibling),
                      (d = o(C, g.props.children)),
                      (d.return = f),
                      (f = d);
                    break e;
                  }
                } else if (
                  C.elementType === S ||
                  (typeof S == 'object' &&
                    S !== null &&
                    S.$$typeof === st &&
                    ms(S) === C.type)
                ) {
                  r(f, C.sibling),
                    (d = o(C, g.props)),
                    (d.ref = Ir(f, C, g)),
                    (d.return = f),
                    (f = d);
                  break e;
                }
                r(f, C);
                break;
              } else t(f, C);
              C = C.sibling;
            }
            g.type === Yt
              ? ((d = Rt(g.props.children, f.mode, v, g.key)),
                (d.return = f),
                (f = d))
              : ((v = no(g.type, g.key, g.props, null, f.mode, v)),
                (v.ref = Ir(f, d, g)),
                (v.return = f),
                (f = v));
          }
          return i(f);
        case Gt:
          e: {
            for (C = g.key; d !== null; ) {
              if (d.key === C)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === g.containerInfo &&
                  d.stateNode.implementation === g.implementation
                ) {
                  r(f, d.sibling),
                    (d = o(d, g.children || [])),
                    (d.return = f),
                    (f = d);
                  break e;
                } else {
                  r(f, d);
                  break;
                }
              else t(f, d);
              d = d.sibling;
            }
            (d = El(g, f.mode, v)), (d.return = f), (f = d);
          }
          return i(f);
        case st:
          return (C = g._init), P(f, d, C(g._payload), v);
      }
      if (Pr(g)) return x(f, d, g, v);
      if (Fr(g)) return w(f, d, g, v);
      jn(f, g);
    }
    return (typeof g == 'string' && g !== '') || typeof g == 'number'
      ? ((g = '' + g),
        d !== null && d.tag === 6
          ? (r(f, d.sibling), (d = o(d, g)), (d.return = f), (f = d))
          : (r(f, d), (d = Fl(g, f.mode, v)), (d.return = f), (f = d)),
        i(f))
      : r(f, d);
  }
  return P;
}
var pr = Nc(!0),
  Ic = Nc(!1),
  vo = Et(null),
  xo = null,
  nr = null,
  ta = null;
function ra() {
  ta = nr = xo = null;
}
function na(e) {
  var t = vo.current;
  H(vo), (e._currentValue = t);
}
function di(e, t, r) {
  for (; e !== null; ) {
    var n = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
        : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
      e === r)
    )
      break;
    e = e.return;
  }
}
function dr(e, t) {
  (xo = e),
    (ta = nr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (be = !0), (e.firstContext = null));
}
function Me(e) {
  var t = e._currentValue;
  if (ta !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), nr === null)) {
      if (xo === null) throw Error(A(308));
      (nr = e), (xo.dependencies = { lanes: 0, firstContext: e });
    } else nr = nr.next = e;
  return t;
}
var zt = null;
function oa(e) {
  zt === null ? (zt = [e]) : zt.push(e);
}
function Tc(e, t, r, n) {
  var o = t.interleaved;
  return (
    o === null ? ((r.next = r), oa(t)) : ((r.next = o.next), (o.next = r)),
    (t.interleaved = r),
    rt(e, n)
  );
}
function rt(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (r = e.alternate),
      r !== null && (r.childLanes |= t),
      (r = e),
      (e = e.return);
  return r.tag === 3 ? r.stateNode : null;
}
var ut = !1;
function la(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Bc(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function qe(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function yt(e, t, r) {
  var n = e.updateQueue;
  if (n === null) return null;
  if (((n = n.shared), L & 2)) {
    var o = n.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (n.pending = t),
      rt(e, r)
    );
  }
  return (
    (o = n.interleaved),
    o === null ? ((t.next = t), oa(n)) : ((t.next = o.next), (o.next = t)),
    (n.interleaved = t),
    rt(e, r)
  );
}
function Zn(e, t, r) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
  ) {
    var n = t.lanes;
    (n &= e.pendingLanes), (r |= n), (t.lanes = r), $i(e, r);
  }
}
function gs(e, t) {
  var r = e.updateQueue,
    n = e.alternate;
  if (n !== null && ((n = n.updateQueue), r === n)) {
    var o = null,
      l = null;
    if (((r = r.firstBaseUpdate), r !== null)) {
      do {
        var i = {
          eventTime: r.eventTime,
          lane: r.lane,
          tag: r.tag,
          payload: r.payload,
          callback: r.callback,
          next: null,
        };
        l === null ? (o = l = i) : (l = l.next = i), (r = r.next);
      } while (r !== null);
      l === null ? (o = l = t) : (l = l.next = t);
    } else o = l = t;
    (r = {
      baseState: n.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: l,
      shared: n.shared,
      effects: n.effects,
    }),
      (e.updateQueue = r);
    return;
  }
  (e = r.lastBaseUpdate),
    e === null ? (r.firstBaseUpdate = t) : (e.next = t),
    (r.lastBaseUpdate = t);
}
function Ao(e, t, r, n) {
  var o = e.updateQueue;
  ut = !1;
  var l = o.firstBaseUpdate,
    i = o.lastBaseUpdate,
    a = o.shared.pending;
  if (a !== null) {
    o.shared.pending = null;
    var s = a,
      u = s.next;
    (s.next = null), i === null ? (l = u) : (i.next = u), (i = s);
    var m = e.alternate;
    m !== null &&
      ((m = m.updateQueue),
      (a = m.lastBaseUpdate),
      a !== i &&
        (a === null ? (m.firstBaseUpdate = u) : (a.next = u),
        (m.lastBaseUpdate = s)));
  }
  if (l !== null) {
    var p = o.baseState;
    (i = 0), (m = u = s = null), (a = l);
    do {
      var h = a.lane,
        y = a.eventTime;
      if ((n & h) === h) {
        m !== null &&
          (m = m.next =
            {
              eventTime: y,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var x = e,
            w = a;
          switch (((h = t), (y = r), w.tag)) {
            case 1:
              if (((x = w.payload), typeof x == 'function')) {
                p = x.call(y, p, h);
                break e;
              }
              p = x;
              break e;
            case 3:
              x.flags = (x.flags & -65537) | 128;
            case 0:
              if (
                ((x = w.payload),
                (h = typeof x == 'function' ? x.call(y, p, h) : x),
                h == null)
              )
                break e;
              p = V({}, p, h);
              break e;
            case 2:
              ut = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (h = o.effects),
          h === null ? (o.effects = [a]) : h.push(a));
      } else
        (y = {
          eventTime: y,
          lane: h,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          m === null ? ((u = m = y), (s = p)) : (m = m.next = y),
          (i |= h);
      if (((a = a.next), a === null)) {
        if (((a = o.shared.pending), a === null)) break;
        (h = a),
          (a = h.next),
          (h.next = null),
          (o.lastBaseUpdate = h),
          (o.shared.pending = null);
      }
    } while (!0);
    if (
      (m === null && (s = p),
      (o.baseState = s),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = m),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (i |= o.lane), (o = o.next);
      while (o !== t);
    } else l === null && (o.shared.lanes = 0);
    (Ut |= i), (e.lanes = i), (e.memoizedState = p);
  }
}
function hs(e, t, r) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var n = e[t],
        o = n.callback;
      if (o !== null) {
        if (((n.callback = null), (n = r), typeof o != 'function'))
          throw Error(A(191, o));
        o.call(n);
      }
    }
}
var Sn = {},
  Ve = Et(Sn),
  cn = Et(Sn),
  dn = Et(Sn);
function Pt(e) {
  if (e === Sn) throw Error(A(174));
  return e;
}
function ia(e, t) {
  switch ((_(dn, t), _(cn, e), _(Ve, Sn), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Wl(null, '');
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Wl(t, e));
  }
  H(Ve), _(Ve, t);
}
function br() {
  H(Ve), H(cn), H(dn);
}
function Mc(e) {
  Pt(dn.current);
  var t = Pt(Ve.current),
    r = Wl(t, e.type);
  t !== r && (_(cn, e), _(Ve, r));
}
function aa(e) {
  cn.current === e && (H(Ve), H(cn));
}
var W = Et(0);
function wo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (
        r !== null &&
        ((r = r.dehydrated), r === null || r.data === '$?' || r.data === '$!')
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var vl = [];
function sa() {
  for (var e = 0; e < vl.length; e++)
    vl[e]._workInProgressVersionPrimary = null;
  vl.length = 0;
}
var Xn = lt.ReactCurrentDispatcher,
  xl = lt.ReactCurrentBatchConfig,
  Ot = 0,
  K = null,
  q = null,
  re = null,
  So = !1,
  Qr = !1,
  fn = 0,
  $f = 0;
function se() {
  throw Error(A(321));
}
function ua(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++)
    if (!He(e[r], t[r])) return !1;
  return !0;
}
function ca(e, t, r, n, o, l) {
  if (
    ((Ot = l),
    (K = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Xn.current = e === null || e.memoizedState === null ? Gf : Yf),
    (e = r(n, o)),
    Qr)
  ) {
    l = 0;
    do {
      if (((Qr = !1), (fn = 0), 25 <= l)) throw Error(A(301));
      (l += 1),
        (re = q = null),
        (t.updateQueue = null),
        (Xn.current = Jf),
        (e = r(n, o));
    } while (Qr);
  }
  if (
    ((Xn.current = Do),
    (t = q !== null && q.next !== null),
    (Ot = 0),
    (re = q = K = null),
    (So = !1),
    t)
  )
    throw Error(A(300));
  return e;
}
function da() {
  var e = fn !== 0;
  return (fn = 0), e;
}
function $e() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return re === null ? (K.memoizedState = re = e) : (re = re.next = e), re;
}
function ze() {
  if (q === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = q.next;
  var t = re === null ? K.memoizedState : re.next;
  if (t !== null) (re = t), (q = e);
  else {
    if (e === null) throw Error(A(310));
    (q = e),
      (e = {
        memoizedState: q.memoizedState,
        baseState: q.baseState,
        baseQueue: q.baseQueue,
        queue: q.queue,
        next: null,
      }),
      re === null ? (K.memoizedState = re = e) : (re = re.next = e);
  }
  return re;
}
function mn(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function Al(e) {
  var t = ze(),
    r = t.queue;
  if (r === null) throw Error(A(311));
  r.lastRenderedReducer = e;
  var n = q,
    o = n.baseQueue,
    l = r.pending;
  if (l !== null) {
    if (o !== null) {
      var i = o.next;
      (o.next = l.next), (l.next = i);
    }
    (n.baseQueue = o = l), (r.pending = null);
  }
  if (o !== null) {
    (l = o.next), (n = n.baseState);
    var a = (i = null),
      s = null,
      u = l;
    do {
      var m = u.lane;
      if ((Ot & m) === m)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (n = u.hasEagerState ? u.eagerState : e(n, u.action));
      else {
        var p = {
          lane: m,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        s === null ? ((a = s = p), (i = n)) : (s = s.next = p),
          (K.lanes |= m),
          (Ut |= m);
      }
      u = u.next;
    } while (u !== null && u !== l);
    s === null ? (i = n) : (s.next = a),
      He(n, t.memoizedState) || (be = !0),
      (t.memoizedState = n),
      (t.baseState = i),
      (t.baseQueue = s),
      (r.lastRenderedState = n);
  }
  if (((e = r.interleaved), e !== null)) {
    o = e;
    do (l = o.lane), (K.lanes |= l), (Ut |= l), (o = o.next);
    while (o !== e);
  } else o === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function wl(e) {
  var t = ze(),
    r = t.queue;
  if (r === null) throw Error(A(311));
  r.lastRenderedReducer = e;
  var n = r.dispatch,
    o = r.pending,
    l = t.memoizedState;
  if (o !== null) {
    r.pending = null;
    var i = (o = o.next);
    do (l = e(l, i.action)), (i = i.next);
    while (i !== o);
    He(l, t.memoizedState) || (be = !0),
      (t.memoizedState = l),
      t.baseQueue === null && (t.baseState = l),
      (r.lastRenderedState = l);
  }
  return [l, n];
}
function zc() {}
function Pc(e, t) {
  var r = K,
    n = ze(),
    o = t(),
    l = !He(n.memoizedState, o);
  if (
    (l && ((n.memoizedState = o), (be = !0)),
    (n = n.queue),
    fa(jc.bind(null, r, n, e), [e]),
    n.getSnapshot !== t || l || (re !== null && re.memoizedState.tag & 1))
  ) {
    if (
      ((r.flags |= 2048),
      gn(9, Rc.bind(null, r, n, o, t), void 0, null),
      oe === null)
    )
      throw Error(A(349));
    Ot & 30 || Lc(r, t, o);
  }
  return o;
}
function Lc(e, t, r) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: r }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.stores = [e]))
      : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e));
}
function Rc(e, t, r, n) {
  (t.value = r), (t.getSnapshot = n), _c(t) && Oc(e);
}
function jc(e, t, r) {
  return r(function () {
    _c(t) && Oc(e);
  });
}
function _c(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !He(e, r);
  } catch {
    return !0;
  }
}
function Oc(e) {
  var t = rt(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function ps(e) {
  var t = $e();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: mn,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Vf.bind(null, K, e)),
    [t.memoizedState, e]
  );
}
function gn(e, t, r, n) {
  return (
    (e = { tag: e, create: t, destroy: r, deps: n, next: null }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((r = t.lastEffect),
        r === null
          ? (t.lastEffect = e.next = e)
          : ((n = r.next), (r.next = e), (e.next = n), (t.lastEffect = e))),
    e
  );
}
function Uc() {
  return ze().memoizedState;
}
function qn(e, t, r, n) {
  var o = $e();
  (K.flags |= e),
    (o.memoizedState = gn(1 | t, r, void 0, n === void 0 ? null : n));
}
function Uo(e, t, r, n) {
  var o = ze();
  n = n === void 0 ? null : n;
  var l = void 0;
  if (q !== null) {
    var i = q.memoizedState;
    if (((l = i.destroy), n !== null && ua(n, i.deps))) {
      o.memoizedState = gn(t, r, l, n);
      return;
    }
  }
  (K.flags |= e), (o.memoizedState = gn(1 | t, r, l, n));
}
function bs(e, t) {
  return qn(8390656, 8, e, t);
}
function fa(e, t) {
  return Uo(2048, 8, e, t);
}
function Hc(e, t) {
  return Uo(4, 2, e, t);
}
function Qc(e, t) {
  return Uo(4, 4, e, t);
}
function $c(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Wc(e, t, r) {
  return (
    (r = r != null ? r.concat([e]) : null), Uo(4, 4, $c.bind(null, t, e), r)
  );
}
function ma() {}
function Kc(e, t) {
  var r = ze();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && ua(t, n[1])
    ? n[0]
    : ((r.memoizedState = [e, t]), e);
}
function Vc(e, t) {
  var r = ze();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && ua(t, n[1])
    ? n[0]
    : ((e = e()), (r.memoizedState = [e, t]), e);
}
function Gc(e, t, r) {
  return Ot & 21
    ? (He(r, t) || ((r = qu()), (K.lanes |= r), (Ut |= r), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (be = !0)), (e.memoizedState = r));
}
function Wf(e, t) {
  var r = R;
  (R = r !== 0 && 4 > r ? r : 4), e(!0);
  var n = xl.transition;
  xl.transition = {};
  try {
    e(!1), t();
  } finally {
    (R = r), (xl.transition = n);
  }
}
function Yc() {
  return ze().memoizedState;
}
function Kf(e, t, r) {
  var n = xt(e);
  if (
    ((r = {
      lane: n,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Jc(e))
  )
    Zc(t, r);
  else if (((r = Tc(e, t, r, n)), r !== null)) {
    var o = me();
    Ue(r, e, n, o), Xc(r, t, n);
  }
}
function Vf(e, t, r) {
  var n = xt(e),
    o = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (Jc(e)) Zc(t, o);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = t.lastRenderedReducer), l !== null)
    )
      try {
        var i = t.lastRenderedState,
          a = l(i, r);
        if (((o.hasEagerState = !0), (o.eagerState = a), He(a, i))) {
          var s = t.interleaved;
          s === null
            ? ((o.next = o), oa(t))
            : ((o.next = s.next), (s.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (r = Tc(e, t, o, n)),
      r !== null && ((o = me()), Ue(r, e, n, o), Xc(r, t, n));
  }
}
function Jc(e) {
  var t = e.alternate;
  return e === K || (t !== null && t === K);
}
function Zc(e, t) {
  Qr = So = !0;
  var r = e.pending;
  r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
    (e.pending = t);
}
function Xc(e, t, r) {
  if (r & 4194240) {
    var n = t.lanes;
    (n &= e.pendingLanes), (r |= n), (t.lanes = r), $i(e, r);
  }
}
var Do = {
    readContext: Me,
    useCallback: se,
    useContext: se,
    useEffect: se,
    useImperativeHandle: se,
    useInsertionEffect: se,
    useLayoutEffect: se,
    useMemo: se,
    useReducer: se,
    useRef: se,
    useState: se,
    useDebugValue: se,
    useDeferredValue: se,
    useTransition: se,
    useMutableSource: se,
    useSyncExternalStore: se,
    useId: se,
    unstable_isNewReconciler: !1,
  },
  Gf = {
    readContext: Me,
    useCallback: function (e, t) {
      return ($e().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Me,
    useEffect: bs,
    useImperativeHandle: function (e, t, r) {
      return (
        (r = r != null ? r.concat([e]) : null),
        qn(4194308, 4, $c.bind(null, t, e), r)
      );
    },
    useLayoutEffect: function (e, t) {
      return qn(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return qn(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var r = $e();
      return (
        (t = t === void 0 ? null : t), (e = e()), (r.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, r) {
      var n = $e();
      return (
        (t = r !== void 0 ? r(t) : t),
        (n.memoizedState = n.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (n.queue = e),
        (e = e.dispatch = Kf.bind(null, K, e)),
        [n.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = $e();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ps,
    useDebugValue: ma,
    useDeferredValue: function (e) {
      return ($e().memoizedState = e);
    },
    useTransition: function () {
      var e = ps(!1),
        t = e[0];
      return (e = Wf.bind(null, e[1])), ($e().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, r) {
      var n = K,
        o = $e();
      if (Q) {
        if (r === void 0) throw Error(A(407));
        r = r();
      } else {
        if (((r = t()), oe === null)) throw Error(A(349));
        Ot & 30 || Lc(n, t, r);
      }
      o.memoizedState = r;
      var l = { value: r, getSnapshot: t };
      return (
        (o.queue = l),
        bs(jc.bind(null, n, l, e), [e]),
        (n.flags |= 2048),
        gn(9, Rc.bind(null, n, l, r, t), void 0, null),
        r
      );
    },
    useId: function () {
      var e = $e(),
        t = oe.identifierPrefix;
      if (Q) {
        var r = Xe,
          n = Ze;
        (r = (n & ~(1 << (32 - Oe(n) - 1))).toString(32) + r),
          (t = ':' + t + 'R' + r),
          (r = fn++),
          0 < r && (t += 'H' + r.toString(32)),
          (t += ':');
      } else (r = $f++), (t = ':' + t + 'r' + r.toString(32) + ':');
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Yf = {
    readContext: Me,
    useCallback: Kc,
    useContext: Me,
    useEffect: fa,
    useImperativeHandle: Wc,
    useInsertionEffect: Hc,
    useLayoutEffect: Qc,
    useMemo: Vc,
    useReducer: Al,
    useRef: Uc,
    useState: function () {
      return Al(mn);
    },
    useDebugValue: ma,
    useDeferredValue: function (e) {
      var t = ze();
      return Gc(t, q.memoizedState, e);
    },
    useTransition: function () {
      var e = Al(mn)[0],
        t = ze().memoizedState;
      return [e, t];
    },
    useMutableSource: zc,
    useSyncExternalStore: Pc,
    useId: Yc,
    unstable_isNewReconciler: !1,
  },
  Jf = {
    readContext: Me,
    useCallback: Kc,
    useContext: Me,
    useEffect: fa,
    useImperativeHandle: Wc,
    useInsertionEffect: Hc,
    useLayoutEffect: Qc,
    useMemo: Vc,
    useReducer: wl,
    useRef: Uc,
    useState: function () {
      return wl(mn);
    },
    useDebugValue: ma,
    useDeferredValue: function (e) {
      var t = ze();
      return q === null ? (t.memoizedState = e) : Gc(t, q.memoizedState, e);
    },
    useTransition: function () {
      var e = wl(mn)[0],
        t = ze().memoizedState;
      return [e, t];
    },
    useMutableSource: zc,
    useSyncExternalStore: Pc,
    useId: Yc,
    unstable_isNewReconciler: !1,
  };
function Le(e, t) {
  if (e && e.defaultProps) {
    (t = V({}, t)), (e = e.defaultProps);
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function fi(e, t, r, n) {
  (t = e.memoizedState),
    (r = r(n, t)),
    (r = r == null ? t : V({}, t, r)),
    (e.memoizedState = r),
    e.lanes === 0 && (e.updateQueue.baseState = r);
}
var Ho = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Wt(e) === e : !1;
  },
  enqueueSetState: function (e, t, r) {
    e = e._reactInternals;
    var n = me(),
      o = xt(e),
      l = qe(n, o);
    (l.payload = t),
      r != null && (l.callback = r),
      (t = yt(e, l, o)),
      t !== null && (Ue(t, e, o, n), Zn(t, e, o));
  },
  enqueueReplaceState: function (e, t, r) {
    e = e._reactInternals;
    var n = me(),
      o = xt(e),
      l = qe(n, o);
    (l.tag = 1),
      (l.payload = t),
      r != null && (l.callback = r),
      (t = yt(e, l, o)),
      t !== null && (Ue(t, e, o, n), Zn(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var r = me(),
      n = xt(e),
      o = qe(r, n);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = yt(e, o, n)),
      t !== null && (Ue(t, e, n, r), Zn(t, e, n));
  },
};
function ys(e, t, r, n, o, l, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(n, l, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !ln(r, n) || !ln(o, l)
      : !0
  );
}
function qc(e, t, r) {
  var n = !1,
    o = Dt,
    l = t.contextType;
  return (
    typeof l == 'object' && l !== null
      ? (l = Me(l))
      : ((o = ve(t) ? jt : de.current),
        (n = t.contextTypes),
        (l = (n = n != null) ? gr(e, o) : Dt)),
    (t = new t(r, l)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ho),
    (e.stateNode = t),
    (t._reactInternals = e),
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    t
  );
}
function vs(e, t, r, n) {
  (e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(r, n),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(r, n),
    t.state !== e && Ho.enqueueReplaceState(t, t.state, null);
}
function mi(e, t, r, n) {
  var o = e.stateNode;
  (o.props = r), (o.state = e.memoizedState), (o.refs = {}), la(e);
  var l = t.contextType;
  typeof l == 'object' && l !== null
    ? (o.context = Me(l))
    : ((l = ve(t) ? jt : de.current), (o.context = gr(e, l))),
    (o.state = e.memoizedState),
    (l = t.getDerivedStateFromProps),
    typeof l == 'function' && (fi(e, t, l, r), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof o.getSnapshotBeforeUpdate == 'function' ||
      (typeof o.UNSAFE_componentWillMount != 'function' &&
        typeof o.componentWillMount != 'function') ||
      ((t = o.state),
      typeof o.componentWillMount == 'function' && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == 'function' &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Ho.enqueueReplaceState(o, o.state, null),
      Ao(e, r, o, n),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == 'function' && (e.flags |= 4194308);
}
function yr(e, t) {
  try {
    var r = '',
      n = t;
    do (r += Sd(n)), (n = n.return);
    while (n);
    var o = r;
  } catch (l) {
    o =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Sl(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function gi(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function () {
      throw r;
    });
  }
}
var Zf = typeof WeakMap == 'function' ? WeakMap : Map;
function e0(e, t, r) {
  (r = qe(-1, r)), (r.tag = 3), (r.payload = { element: null });
  var n = t.value;
  return (
    (r.callback = function () {
      Eo || ((Eo = !0), (Di = n)), gi(e, t);
    }),
    r
  );
}
function t0(e, t, r) {
  (r = qe(-1, r)), (r.tag = 3);
  var n = e.type.getDerivedStateFromError;
  if (typeof n == 'function') {
    var o = t.value;
    (r.payload = function () {
      return n(o);
    }),
      (r.callback = function () {
        gi(e, t);
      });
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == 'function' &&
      (r.callback = function () {
        gi(e, t),
          typeof n != 'function' &&
            (vt === null ? (vt = new Set([this])) : vt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : '',
        });
      }),
    r
  );
}
function xs(e, t, r) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new Zf();
    var o = new Set();
    n.set(t, o);
  } else (o = n.get(t)), o === void 0 && ((o = new Set()), n.set(t, o));
  o.has(r) || (o.add(r), (e = dm.bind(null, e, t, r)), t.then(e, e));
}
function As(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ws(e, t, r, n, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (r.flags |= 131072),
          (r.flags &= -52805),
          r.tag === 1 &&
            (r.alternate === null
              ? (r.tag = 17)
              : ((t = qe(-1, 1)), (t.tag = 2), yt(r, t, 1))),
          (r.lanes |= 1)),
      e);
}
var Xf = lt.ReactCurrentOwner,
  be = !1;
function fe(e, t, r, n) {
  t.child = e === null ? Ic(t, null, r, n) : pr(t, e.child, r, n);
}
function Ss(e, t, r, n, o) {
  r = r.render;
  var l = t.ref;
  return (
    dr(t, o),
    (n = ca(e, t, r, n, l, o)),
    (r = da()),
    e !== null && !be
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        nt(e, t, o))
      : (Q && r && Xi(t), (t.flags |= 1), fe(e, t, n, o), t.child)
  );
}
function Ds(e, t, r, n, o) {
  if (e === null) {
    var l = r.type;
    return typeof l == 'function' &&
      !Aa(l) &&
      l.defaultProps === void 0 &&
      r.compare === null &&
      r.defaultProps === void 0
      ? ((t.tag = 15), (t.type = l), r0(e, t, l, n, o))
      : ((e = no(r.type, null, n, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((l = e.child), !(e.lanes & o))) {
    var i = l.memoizedProps;
    if (
      ((r = r.compare), (r = r !== null ? r : ln), r(i, n) && e.ref === t.ref)
    )
      return nt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = At(l, n)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function r0(e, t, r, n, o) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (ln(l, n) && e.ref === t.ref)
      if (((be = !1), (t.pendingProps = n = l), (e.lanes & o) !== 0))
        e.flags & 131072 && (be = !0);
      else return (t.lanes = e.lanes), nt(e, t, o);
  }
  return hi(e, t, r, n, o);
}
function n0(e, t, r) {
  var n = t.pendingProps,
    o = n.children,
    l = e !== null ? e.memoizedState : null;
  if (n.mode === 'hidden')
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        _(lr, we),
        (we |= r);
    else {
      if (!(r & 1073741824))
        return (
          (e = l !== null ? l.baseLanes | r : r),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          _(lr, we),
          (we |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (n = l !== null ? l.baseLanes : r),
        _(lr, we),
        (we |= n);
    }
  else
    l !== null ? ((n = l.baseLanes | r), (t.memoizedState = null)) : (n = r),
      _(lr, we),
      (we |= n);
  return fe(e, t, o, r), t.child;
}
function o0(e, t) {
  var r = t.ref;
  ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function hi(e, t, r, n, o) {
  var l = ve(r) ? jt : de.current;
  return (
    (l = gr(t, l)),
    dr(t, o),
    (r = ca(e, t, r, n, l, o)),
    (n = da()),
    e !== null && !be
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        nt(e, t, o))
      : (Q && n && Xi(t), (t.flags |= 1), fe(e, t, r, o), t.child)
  );
}
function Fs(e, t, r, n, o) {
  if (ve(r)) {
    var l = !0;
    po(t);
  } else l = !1;
  if ((dr(t, o), t.stateNode === null))
    eo(e, t), qc(t, r, n), mi(t, r, n, o), (n = !0);
  else if (e === null) {
    var i = t.stateNode,
      a = t.memoizedProps;
    i.props = a;
    var s = i.context,
      u = r.contextType;
    typeof u == 'object' && u !== null
      ? (u = Me(u))
      : ((u = ve(r) ? jt : de.current), (u = gr(t, u)));
    var m = r.getDerivedStateFromProps,
      p =
        typeof m == 'function' ||
        typeof i.getSnapshotBeforeUpdate == 'function';
    p ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((a !== n || s !== u) && vs(t, i, n, u)),
      (ut = !1);
    var h = t.memoizedState;
    (i.state = h),
      Ao(t, n, i, o),
      (s = t.memoizedState),
      a !== n || h !== s || ye.current || ut
        ? (typeof m == 'function' && (fi(t, r, m, n), (s = t.memoizedState)),
          (a = ut || ys(t, r, a, n, h, s, u))
            ? (p ||
                (typeof i.UNSAFE_componentWillMount != 'function' &&
                  typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = n),
              (t.memoizedState = s)),
          (i.props = n),
          (i.state = s),
          (i.context = u),
          (n = a))
        : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
          (n = !1));
  } else {
    (i = t.stateNode),
      Bc(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : Le(t.type, a)),
      (i.props = u),
      (p = t.pendingProps),
      (h = i.context),
      (s = r.contextType),
      typeof s == 'object' && s !== null
        ? (s = Me(s))
        : ((s = ve(r) ? jt : de.current), (s = gr(t, s)));
    var y = r.getDerivedStateFromProps;
    (m =
      typeof y == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((a !== p || h !== s) && vs(t, i, n, s)),
      (ut = !1),
      (h = t.memoizedState),
      (i.state = h),
      Ao(t, n, i, o);
    var x = t.memoizedState;
    a !== p || h !== x || ye.current || ut
      ? (typeof y == 'function' && (fi(t, r, y, n), (x = t.memoizedState)),
        (u = ut || ys(t, r, u, n, h, x, s) || !1)
          ? (m ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' &&
                i.componentWillUpdate(n, x, s),
              typeof i.UNSAFE_componentWillUpdate == 'function' &&
                i.UNSAFE_componentWillUpdate(n, x, s)),
            typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = n),
            (t.memoizedState = x)),
        (i.props = n),
        (i.state = x),
        (i.context = s),
        (n = u))
      : (typeof i.componentDidUpdate != 'function' ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (n = !1));
  }
  return pi(e, t, r, n, l, o);
}
function pi(e, t, r, n, o, l) {
  o0(e, t);
  var i = (t.flags & 128) !== 0;
  if (!n && !i) return o && cs(t, r, !1), nt(e, t, l);
  (n = t.stateNode), (Xf.current = t);
  var a =
    i && typeof r.getDerivedStateFromError != 'function' ? null : n.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = pr(t, e.child, null, l)), (t.child = pr(t, null, a, l)))
      : fe(e, t, a, l),
    (t.memoizedState = n.state),
    o && cs(t, r, !0),
    t.child
  );
}
function l0(e) {
  var t = e.stateNode;
  t.pendingContext
    ? us(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && us(e, t.context, !1),
    ia(e, t.containerInfo);
}
function Es(e, t, r, n, o) {
  return hr(), ea(o), (t.flags |= 256), fe(e, t, r, n), t.child;
}
var bi = { dehydrated: null, treeContext: null, retryLane: 0 };
function yi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function i0(e, t, r) {
  var n = t.pendingProps,
    o = W.current,
    l = !1,
    i = (t.flags & 128) !== 0,
    a;
  if (
    ((a = i) ||
      (a = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    a
      ? ((l = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    _(W, o & 1),
    e === null)
  )
    return (
      ci(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = n.children),
          (e = n.fallback),
          l
            ? ((n = t.mode),
              (l = t.child),
              (i = { mode: 'hidden', children: i }),
              !(n & 1) && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = i))
                : (l = Wo(i, n, 0, null)),
              (e = Rt(e, n, r, null)),
              (l.return = t),
              (e.return = t),
              (l.sibling = e),
              (t.child = l),
              (t.child.memoizedState = yi(r)),
              (t.memoizedState = bi),
              e)
            : ga(t, i))
    );
  if (((o = e.memoizedState), o !== null && ((a = o.dehydrated), a !== null)))
    return qf(e, t, i, n, a, o, r);
  if (l) {
    (l = n.fallback), (i = t.mode), (o = e.child), (a = o.sibling);
    var s = { mode: 'hidden', children: n.children };
    return (
      !(i & 1) && t.child !== o
        ? ((n = t.child),
          (n.childLanes = 0),
          (n.pendingProps = s),
          (t.deletions = null))
        : ((n = At(o, s)), (n.subtreeFlags = o.subtreeFlags & 14680064)),
      a !== null ? (l = At(a, l)) : ((l = Rt(l, i, r, null)), (l.flags |= 2)),
      (l.return = t),
      (n.return = t),
      (n.sibling = l),
      (t.child = n),
      (n = l),
      (l = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? yi(r)
          : {
              baseLanes: i.baseLanes | r,
              cachePool: null,
              transitions: i.transitions,
            }),
      (l.memoizedState = i),
      (l.childLanes = e.childLanes & ~r),
      (t.memoizedState = bi),
      n
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (n = At(l, { mode: 'visible', children: n.children })),
    !(t.mode & 1) && (n.lanes = r),
    (n.return = t),
    (n.sibling = null),
    e !== null &&
      ((r = t.deletions),
      r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
    (t.child = n),
    (t.memoizedState = null),
    n
  );
}
function ga(e, t) {
  return (
    (t = Wo({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function _n(e, t, r, n) {
  return (
    n !== null && ea(n),
    pr(t, e.child, null, r),
    (e = ga(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function qf(e, t, r, n, o, l, i) {
  if (r)
    return t.flags & 256
      ? ((t.flags &= -257), (n = Sl(Error(A(422)))), _n(e, t, i, n))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((l = n.fallback),
        (o = t.mode),
        (n = Wo({ mode: 'visible', children: n.children }, o, 0, null)),
        (l = Rt(l, o, i, null)),
        (l.flags |= 2),
        (n.return = t),
        (l.return = t),
        (n.sibling = l),
        (t.child = n),
        t.mode & 1 && pr(t, e.child, null, i),
        (t.child.memoizedState = yi(i)),
        (t.memoizedState = bi),
        l);
  if (!(t.mode & 1)) return _n(e, t, i, null);
  if (o.data === '$!') {
    if (((n = o.nextSibling && o.nextSibling.dataset), n)) var a = n.dgst;
    return (n = a), (l = Error(A(419))), (n = Sl(l, n, void 0)), _n(e, t, i, n);
  }
  if (((a = (i & e.childLanes) !== 0), be || a)) {
    if (((n = oe), n !== null)) {
      switch (i & -i) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      (o = o & (n.suspendedLanes | i) ? 0 : o),
        o !== 0 &&
          o !== l.retryLane &&
          ((l.retryLane = o), rt(e, o), Ue(n, e, o, -1));
    }
    return xa(), (n = Sl(Error(A(421)))), _n(e, t, i, n);
  }
  return o.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = fm.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = l.treeContext),
      (De = bt(o.nextSibling)),
      (Fe = t),
      (Q = !0),
      (je = null),
      e !== null &&
        ((Ne[Ie++] = Ze),
        (Ne[Ie++] = Xe),
        (Ne[Ie++] = _t),
        (Ze = e.id),
        (Xe = e.overflow),
        (_t = t)),
      (t = ga(t, n.children)),
      (t.flags |= 4096),
      t);
}
function Cs(e, t, r) {
  e.lanes |= t;
  var n = e.alternate;
  n !== null && (n.lanes |= t), di(e.return, t, r);
}
function Dl(e, t, r, n, o) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: r,
        tailMode: o,
      })
    : ((l.isBackwards = t),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = n),
      (l.tail = r),
      (l.tailMode = o));
}
function a0(e, t, r) {
  var n = t.pendingProps,
    o = n.revealOrder,
    l = n.tail;
  if ((fe(e, t, n.children, r), (n = W.current), n & 2))
    (n = (n & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Cs(e, r, t);
        else if (e.tag === 19) Cs(e, r, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    n &= 1;
  }
  if ((_(W, n), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case 'forwards':
        for (r = t.child, o = null; r !== null; )
          (e = r.alternate),
            e !== null && wo(e) === null && (o = r),
            (r = r.sibling);
        (r = o),
          r === null
            ? ((o = t.child), (t.child = null))
            : ((o = r.sibling), (r.sibling = null)),
          Dl(t, !1, o, r, l);
        break;
      case 'backwards':
        for (r = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && wo(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = r), (r = o), (o = e);
        }
        Dl(t, !0, r, null, l);
        break;
      case 'together':
        Dl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function eo(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function nt(e, t, r) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Ut |= t.lanes),
    !(r & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(A(153));
  if (t.child !== null) {
    for (
      e = t.child, r = At(e, e.pendingProps), t.child = r, r.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (r = r.sibling = At(e, e.pendingProps)), (r.return = t);
    r.sibling = null;
  }
  return t.child;
}
function em(e, t, r) {
  switch (t.tag) {
    case 3:
      l0(t), hr();
      break;
    case 5:
      Mc(t);
      break;
    case 1:
      ve(t.type) && po(t);
      break;
    case 4:
      ia(t, t.stateNode.containerInfo);
      break;
    case 10:
      var n = t.type._context,
        o = t.memoizedProps.value;
      _(vo, n._currentValue), (n._currentValue = o);
      break;
    case 13:
      if (((n = t.memoizedState), n !== null))
        return n.dehydrated !== null
          ? (_(W, W.current & 1), (t.flags |= 128), null)
          : r & t.child.childLanes
          ? i0(e, t, r)
          : (_(W, W.current & 1),
            (e = nt(e, t, r)),
            e !== null ? e.sibling : null);
      _(W, W.current & 1);
      break;
    case 19:
      if (((n = (r & t.childLanes) !== 0), e.flags & 128)) {
        if (n) return a0(e, t, r);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        _(W, W.current),
        n)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), n0(e, t, r);
  }
  return nt(e, t, r);
}
var s0, vi, u0, c0;
s0 = function (e, t) {
  for (var r = t.child; r !== null; ) {
    if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      (r.child.return = r), (r = r.child);
      continue;
    }
    if (r === t) break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === t) return;
      r = r.return;
    }
    (r.sibling.return = r.return), (r = r.sibling);
  }
};
vi = function () {};
u0 = function (e, t, r, n) {
  var o = e.memoizedProps;
  if (o !== n) {
    (e = t.stateNode), Pt(Ve.current);
    var l = null;
    switch (r) {
      case 'input':
        (o = Ul(e, o)), (n = Ul(e, n)), (l = []);
        break;
      case 'select':
        (o = V({}, o, { value: void 0 })),
          (n = V({}, n, { value: void 0 })),
          (l = []);
        break;
      case 'textarea':
        (o = $l(e, o)), (n = $l(e, n)), (l = []);
        break;
      default:
        typeof o.onClick != 'function' &&
          typeof n.onClick == 'function' &&
          (e.onclick = go);
    }
    Kl(r, n);
    var i;
    r = null;
    for (u in o)
      if (!n.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === 'style') {
          var a = o[u];
          for (i in a) a.hasOwnProperty(i) && (r || (r = {}), (r[i] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (Xr.hasOwnProperty(u)
              ? l || (l = [])
              : (l = l || []).push(u, null));
    for (u in n) {
      var s = n[u];
      if (
        ((a = o != null ? o[u] : void 0),
        n.hasOwnProperty(u) && s !== a && (s != null || a != null))
      )
        if (u === 'style')
          if (a) {
            for (i in a)
              !a.hasOwnProperty(i) ||
                (s && s.hasOwnProperty(i)) ||
                (r || (r = {}), (r[i] = ''));
            for (i in s)
              s.hasOwnProperty(i) &&
                a[i] !== s[i] &&
                (r || (r = {}), (r[i] = s[i]));
          } else r || (l || (l = []), l.push(u, r)), (r = s);
        else
          u === 'dangerouslySetInnerHTML'
            ? ((s = s ? s.__html : void 0),
              (a = a ? a.__html : void 0),
              s != null && a !== s && (l = l || []).push(u, s))
            : u === 'children'
            ? (typeof s != 'string' && typeof s != 'number') ||
              (l = l || []).push(u, '' + s)
            : u !== 'suppressContentEditableWarning' &&
              u !== 'suppressHydrationWarning' &&
              (Xr.hasOwnProperty(u)
                ? (s != null && u === 'onScroll' && U('scroll', e),
                  l || a === s || (l = []))
                : (l = l || []).push(u, s));
    }
    r && (l = l || []).push('style', r);
    var u = l;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
c0 = function (e, t, r, n) {
  r !== n && (t.flags |= 4);
};
function Tr(e, t) {
  if (!Q)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var r = null; t !== null; )
          t.alternate !== null && (r = t), (t = t.sibling);
        r === null ? (e.tail = null) : (r.sibling = null);
        break;
      case 'collapsed':
        r = e.tail;
        for (var n = null; r !== null; )
          r.alternate !== null && (n = r), (r = r.sibling);
        n === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (n.sibling = null);
    }
}
function ue(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    r = 0,
    n = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (r |= o.lanes | o.childLanes),
        (n |= o.subtreeFlags & 14680064),
        (n |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (r |= o.lanes | o.childLanes),
        (n |= o.subtreeFlags),
        (n |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= n), (e.childLanes = r), t;
}
function tm(e, t, r) {
  var n = t.pendingProps;
  switch ((qi(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ue(t), null;
    case 1:
      return ve(t.type) && ho(), ue(t), null;
    case 3:
      return (
        (n = t.stateNode),
        br(),
        H(ye),
        H(de),
        sa(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (e === null || e.child === null) &&
          (Rn(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), je !== null && (Ci(je), (je = null)))),
        vi(e, t),
        ue(t),
        null
      );
    case 5:
      aa(t);
      var o = Pt(dn.current);
      if (((r = t.type), e !== null && t.stateNode != null))
        u0(e, t, r, n, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!n) {
          if (t.stateNode === null) throw Error(A(166));
          return ue(t), null;
        }
        if (((e = Pt(Ve.current)), Rn(t))) {
          (n = t.stateNode), (r = t.type);
          var l = t.memoizedProps;
          switch (((n[We] = t), (n[un] = l), (e = (t.mode & 1) !== 0), r)) {
            case 'dialog':
              U('cancel', n), U('close', n);
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              U('load', n);
              break;
            case 'video':
            case 'audio':
              for (o = 0; o < Rr.length; o++) U(Rr[o], n);
              break;
            case 'source':
              U('error', n);
              break;
            case 'img':
            case 'image':
            case 'link':
              U('error', n), U('load', n);
              break;
            case 'details':
              U('toggle', n);
              break;
            case 'input':
              La(n, l), U('invalid', n);
              break;
            case 'select':
              (n._wrapperState = { wasMultiple: !!l.multiple }),
                U('invalid', n);
              break;
            case 'textarea':
              ja(n, l), U('invalid', n);
          }
          Kl(r, l), (o = null);
          for (var i in l)
            if (l.hasOwnProperty(i)) {
              var a = l[i];
              i === 'children'
                ? typeof a == 'string'
                  ? n.textContent !== a &&
                    (l.suppressHydrationWarning !== !0 &&
                      Ln(n.textContent, a, e),
                    (o = ['children', a]))
                  : typeof a == 'number' &&
                    n.textContent !== '' + a &&
                    (l.suppressHydrationWarning !== !0 &&
                      Ln(n.textContent, a, e),
                    (o = ['children', '' + a]))
                : Xr.hasOwnProperty(i) &&
                  a != null &&
                  i === 'onScroll' &&
                  U('scroll', n);
            }
          switch (r) {
            case 'input':
              kn(n), Ra(n, l, !0);
              break;
            case 'textarea':
              kn(n), _a(n);
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof l.onClick == 'function' && (n.onclick = go);
          }
          (n = o), (t.updateQueue = n), n !== null && (t.flags |= 4);
        } else {
          (i = o.nodeType === 9 ? o : o.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = ju(r)),
            e === 'http://www.w3.org/1999/xhtml'
              ? r === 'script'
                ? ((e = i.createElement('div')),
                  (e.innerHTML = '<script></script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof n.is == 'string'
                ? (e = i.createElement(r, { is: n.is }))
                : ((e = i.createElement(r)),
                  r === 'select' &&
                    ((i = e),
                    n.multiple
                      ? (i.multiple = !0)
                      : n.size && (i.size = n.size)))
              : (e = i.createElementNS(e, r)),
            (e[We] = t),
            (e[un] = n),
            s0(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = Vl(r, n)), r)) {
              case 'dialog':
                U('cancel', e), U('close', e), (o = n);
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                U('load', e), (o = n);
                break;
              case 'video':
              case 'audio':
                for (o = 0; o < Rr.length; o++) U(Rr[o], e);
                o = n;
                break;
              case 'source':
                U('error', e), (o = n);
                break;
              case 'img':
              case 'image':
              case 'link':
                U('error', e), U('load', e), (o = n);
                break;
              case 'details':
                U('toggle', e), (o = n);
                break;
              case 'input':
                La(e, n), (o = Ul(e, n)), U('invalid', e);
                break;
              case 'option':
                o = n;
                break;
              case 'select':
                (e._wrapperState = { wasMultiple: !!n.multiple }),
                  (o = V({}, n, { value: void 0 })),
                  U('invalid', e);
                break;
              case 'textarea':
                ja(e, n), (o = $l(e, n)), U('invalid', e);
                break;
              default:
                o = n;
            }
            Kl(r, o), (a = o);
            for (l in a)
              if (a.hasOwnProperty(l)) {
                var s = a[l];
                l === 'style'
                  ? Uu(e, s)
                  : l === 'dangerouslySetInnerHTML'
                  ? ((s = s ? s.__html : void 0), s != null && _u(e, s))
                  : l === 'children'
                  ? typeof s == 'string'
                    ? (r !== 'textarea' || s !== '') && qr(e, s)
                    : typeof s == 'number' && qr(e, '' + s)
                  : l !== 'suppressContentEditableWarning' &&
                    l !== 'suppressHydrationWarning' &&
                    l !== 'autoFocus' &&
                    (Xr.hasOwnProperty(l)
                      ? s != null && l === 'onScroll' && U('scroll', e)
                      : s != null && ji(e, l, s, i));
              }
            switch (r) {
              case 'input':
                kn(e), Ra(e, n, !1);
                break;
              case 'textarea':
                kn(e), _a(e);
                break;
              case 'option':
                n.value != null && e.setAttribute('value', '' + St(n.value));
                break;
              case 'select':
                (e.multiple = !!n.multiple),
                  (l = n.value),
                  l != null
                    ? ar(e, !!n.multiple, l, !1)
                    : n.defaultValue != null &&
                      ar(e, !!n.multiple, n.defaultValue, !0);
                break;
              default:
                typeof o.onClick == 'function' && (e.onclick = go);
            }
            switch (r) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                n = !!n.autoFocus;
                break e;
              case 'img':
                n = !0;
                break e;
              default:
                n = !1;
            }
          }
          n && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ue(t), null;
    case 6:
      if (e && t.stateNode != null) c0(e, t, e.memoizedProps, n);
      else {
        if (typeof n != 'string' && t.stateNode === null) throw Error(A(166));
        if (((r = Pt(dn.current)), Pt(Ve.current), Rn(t))) {
          if (
            ((n = t.stateNode),
            (r = t.memoizedProps),
            (n[We] = t),
            (l = n.nodeValue !== r) && ((e = Fe), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ln(n.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ln(n.nodeValue, r, (e.mode & 1) !== 0);
            }
          l && (t.flags |= 4);
        } else
          (n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n)),
            (n[We] = t),
            (t.stateNode = n);
      }
      return ue(t), null;
    case 13:
      if (
        (H(W),
        (n = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Q && De !== null && t.mode & 1 && !(t.flags & 128))
          kc(), hr(), (t.flags |= 98560), (l = !1);
        else if (((l = Rn(t)), n !== null && n.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(A(318));
            if (
              ((l = t.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(A(317));
            l[We] = t;
          } else
            hr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ue(t), (l = !1);
        } else je !== null && (Ci(je), (je = null)), (l = !0);
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = r), t)
        : ((n = n !== null),
          n !== (e !== null && e.memoizedState !== null) &&
            n &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || W.current & 1 ? ee === 0 && (ee = 3) : xa())),
          t.updateQueue !== null && (t.flags |= 4),
          ue(t),
          null);
    case 4:
      return (
        br(), vi(e, t), e === null && an(t.stateNode.containerInfo), ue(t), null
      );
    case 10:
      return na(t.type._context), ue(t), null;
    case 17:
      return ve(t.type) && ho(), ue(t), null;
    case 19:
      if ((H(W), (l = t.memoizedState), l === null)) return ue(t), null;
      if (((n = (t.flags & 128) !== 0), (i = l.rendering), i === null))
        if (n) Tr(l, !1);
        else {
          if (ee !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = wo(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    Tr(l, !1),
                    n = i.updateQueue,
                    n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    n = r,
                    r = t.child;
                  r !== null;

                )
                  (l = r),
                    (e = n),
                    (l.flags &= 14680066),
                    (i = l.alternate),
                    i === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = i.childLanes),
                        (l.lanes = i.lanes),
                        (l.child = i.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = i.memoizedProps),
                        (l.memoizedState = i.memoizedState),
                        (l.updateQueue = i.updateQueue),
                        (l.type = i.type),
                        (e = i.dependencies),
                        (l.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (r = r.sibling);
                return _(W, (W.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          l.tail !== null &&
            Z() > vr &&
            ((t.flags |= 128), (n = !0), Tr(l, !1), (t.lanes = 4194304));
        }
      else {
        if (!n)
          if (((e = wo(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (n = !0),
              (r = e.updateQueue),
              r !== null && ((t.updateQueue = r), (t.flags |= 4)),
              Tr(l, !0),
              l.tail === null && l.tailMode === 'hidden' && !i.alternate && !Q)
            )
              return ue(t), null;
          } else
            2 * Z() - l.renderingStartTime > vr &&
              r !== 1073741824 &&
              ((t.flags |= 128), (n = !0), Tr(l, !1), (t.lanes = 4194304));
        l.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((r = l.last),
            r !== null ? (r.sibling = i) : (t.child = i),
            (l.last = i));
      }
      return l.tail !== null
        ? ((t = l.tail),
          (l.rendering = t),
          (l.tail = t.sibling),
          (l.renderingStartTime = Z()),
          (t.sibling = null),
          (r = W.current),
          _(W, n ? (r & 1) | 2 : r & 1),
          t)
        : (ue(t), null);
    case 22:
    case 23:
      return (
        va(),
        (n = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== n && (t.flags |= 8192),
        n && t.mode & 1
          ? we & 1073741824 && (ue(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ue(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(A(156, t.tag));
}
function rm(e, t) {
  switch ((qi(t), t.tag)) {
    case 1:
      return (
        ve(t.type) && ho(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        br(),
        H(ye),
        H(de),
        sa(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return aa(t), null;
    case 13:
      if ((H(W), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(A(340));
        hr();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return H(W), null;
    case 4:
      return br(), null;
    case 10:
      return na(t.type._context), null;
    case 22:
    case 23:
      return va(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var On = !1,
  ce = !1,
  nm = typeof WeakSet == 'function' ? WeakSet : Set,
  F = null;
function or(e, t) {
  var r = e.ref;
  if (r !== null)
    if (typeof r == 'function')
      try {
        r(null);
      } catch (n) {
        G(e, t, n);
      }
    else r.current = null;
}
function xi(e, t, r) {
  try {
    r();
  } catch (n) {
    G(e, t, n);
  }
}
var ks = !1;
function om(e, t) {
  if (((ni = co), (e = hc()), Zi(e))) {
    if ('selectionStart' in e)
      var r = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        r = ((r = e.ownerDocument) && r.defaultView) || window;
        var n = r.getSelection && r.getSelection();
        if (n && n.rangeCount !== 0) {
          r = n.anchorNode;
          var o = n.anchorOffset,
            l = n.focusNode;
          n = n.focusOffset;
          try {
            r.nodeType, l.nodeType;
          } catch {
            r = null;
            break e;
          }
          var i = 0,
            a = -1,
            s = -1,
            u = 0,
            m = 0,
            p = e,
            h = null;
          t: for (;;) {
            for (
              var y;
              p !== r || (o !== 0 && p.nodeType !== 3) || (a = i + o),
                p !== l || (n !== 0 && p.nodeType !== 3) || (s = i + n),
                p.nodeType === 3 && (i += p.nodeValue.length),
                (y = p.firstChild) !== null;

            )
              (h = p), (p = y);
            for (;;) {
              if (p === e) break t;
              if (
                (h === r && ++u === o && (a = i),
                h === l && ++m === n && (s = i),
                (y = p.nextSibling) !== null)
              )
                break;
              (p = h), (h = p.parentNode);
            }
            p = y;
          }
          r = a === -1 || s === -1 ? null : { start: a, end: s };
        } else r = null;
      }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (oi = { focusedElem: e, selectionRange: r }, co = !1, F = t; F !== null; )
    if (((t = F), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (F = e);
    else
      for (; F !== null; ) {
        t = F;
        try {
          var x = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var w = x.memoizedProps,
                    P = x.memoizedState,
                    f = t.stateNode,
                    d = f.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? w : Le(t.type, w),
                      P
                    );
                  f.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = '')
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(A(163));
            }
        } catch (v) {
          G(t, t.return, v);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (F = e);
          break;
        }
        F = t.return;
      }
  return (x = ks), (ks = !1), x;
}
function $r(e, t, r) {
  var n = t.updateQueue;
  if (((n = n !== null ? n.lastEffect : null), n !== null)) {
    var o = (n = n.next);
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy;
        (o.destroy = void 0), l !== void 0 && xi(t, r, l);
      }
      o = o.next;
    } while (o !== n);
  }
}
function Qo(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var r = (t = t.next);
    do {
      if ((r.tag & e) === e) {
        var n = r.create;
        r.destroy = n();
      }
      r = r.next;
    } while (r !== t);
  }
}
function Ai(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function d0(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), d0(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[We], delete t[un], delete t[ai], delete t[Of], delete t[Uf])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function f0(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ns(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || f0(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function wi(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    (e = e.stateNode),
      t
        ? r.nodeType === 8
          ? r.parentNode.insertBefore(e, t)
          : r.insertBefore(e, t)
        : (r.nodeType === 8
            ? ((t = r.parentNode), t.insertBefore(e, r))
            : ((t = r), t.appendChild(e)),
          (r = r._reactRootContainer),
          r != null || t.onclick !== null || (t.onclick = go));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (wi(e, t, r), e = e.sibling; e !== null; ) wi(e, t, r), (e = e.sibling);
}
function Si(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    (e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e);
  else if (n !== 4 && ((e = e.child), e !== null))
    for (Si(e, t, r), e = e.sibling; e !== null; ) Si(e, t, r), (e = e.sibling);
}
var le = null,
  Re = !1;
function at(e, t, r) {
  for (r = r.child; r !== null; ) m0(e, t, r), (r = r.sibling);
}
function m0(e, t, r) {
  if (Ke && typeof Ke.onCommitFiberUnmount == 'function')
    try {
      Ke.onCommitFiberUnmount(Po, r);
    } catch {}
  switch (r.tag) {
    case 5:
      ce || or(r, t);
    case 6:
      var n = le,
        o = Re;
      (le = null),
        at(e, t, r),
        (le = n),
        (Re = o),
        le !== null &&
          (Re
            ? ((e = le),
              (r = r.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r))
            : le.removeChild(r.stateNode));
      break;
    case 18:
      le !== null &&
        (Re
          ? ((e = le),
            (r = r.stateNode),
            e.nodeType === 8
              ? bl(e.parentNode, r)
              : e.nodeType === 1 && bl(e, r),
            nn(e))
          : bl(le, r.stateNode));
      break;
    case 4:
      (n = le),
        (o = Re),
        (le = r.stateNode.containerInfo),
        (Re = !0),
        at(e, t, r),
        (le = n),
        (Re = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ce &&
        ((n = r.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
      ) {
        o = n = n.next;
        do {
          var l = o,
            i = l.destroy;
          (l = l.tag),
            i !== void 0 && (l & 2 || l & 4) && xi(r, t, i),
            (o = o.next);
        } while (o !== n);
      }
      at(e, t, r);
      break;
    case 1:
      if (
        !ce &&
        (or(r, t),
        (n = r.stateNode),
        typeof n.componentWillUnmount == 'function')
      )
        try {
          (n.props = r.memoizedProps),
            (n.state = r.memoizedState),
            n.componentWillUnmount();
        } catch (a) {
          G(r, t, a);
        }
      at(e, t, r);
      break;
    case 21:
      at(e, t, r);
      break;
    case 22:
      r.mode & 1
        ? ((ce = (n = ce) || r.memoizedState !== null), at(e, t, r), (ce = n))
        : at(e, t, r);
      break;
    default:
      at(e, t, r);
  }
}
function Is(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    r === null && (r = e.stateNode = new nm()),
      t.forEach(function (n) {
        var o = mm.bind(null, e, n);
        r.has(n) || (r.add(n), n.then(o, o));
      });
  }
}
function Pe(e, t) {
  var r = t.deletions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var o = r[n];
      try {
        var l = e,
          i = t,
          a = i;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (le = a.stateNode), (Re = !1);
              break e;
            case 3:
              (le = a.stateNode.containerInfo), (Re = !0);
              break e;
            case 4:
              (le = a.stateNode.containerInfo), (Re = !0);
              break e;
          }
          a = a.return;
        }
        if (le === null) throw Error(A(160));
        m0(l, i, o), (le = null), (Re = !1);
        var s = o.alternate;
        s !== null && (s.return = null), (o.return = null);
      } catch (u) {
        G(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) g0(t, e), (t = t.sibling);
}
function g0(e, t) {
  var r = e.alternate,
    n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Pe(t, e), Qe(e), n & 4)) {
        try {
          $r(3, e, e.return), Qo(3, e);
        } catch (w) {
          G(e, e.return, w);
        }
        try {
          $r(5, e, e.return);
        } catch (w) {
          G(e, e.return, w);
        }
      }
      break;
    case 1:
      Pe(t, e), Qe(e), n & 512 && r !== null && or(r, r.return);
      break;
    case 5:
      if (
        (Pe(t, e),
        Qe(e),
        n & 512 && r !== null && or(r, r.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          qr(o, '');
        } catch (w) {
          G(e, e.return, w);
        }
      }
      if (n & 4 && ((o = e.stateNode), o != null)) {
        var l = e.memoizedProps,
          i = r !== null ? r.memoizedProps : l,
          a = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            a === 'input' && l.type === 'radio' && l.name != null && Lu(o, l),
              Vl(a, i);
            var u = Vl(a, l);
            for (i = 0; i < s.length; i += 2) {
              var m = s[i],
                p = s[i + 1];
              m === 'style'
                ? Uu(o, p)
                : m === 'dangerouslySetInnerHTML'
                ? _u(o, p)
                : m === 'children'
                ? qr(o, p)
                : ji(o, m, p, u);
            }
            switch (a) {
              case 'input':
                Hl(o, l);
                break;
              case 'textarea':
                Ru(o, l);
                break;
              case 'select':
                var h = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!l.multiple;
                var y = l.value;
                y != null
                  ? ar(o, !!l.multiple, y, !1)
                  : h !== !!l.multiple &&
                    (l.defaultValue != null
                      ? ar(o, !!l.multiple, l.defaultValue, !0)
                      : ar(o, !!l.multiple, l.multiple ? [] : '', !1));
            }
            o[un] = l;
          } catch (w) {
            G(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((Pe(t, e), Qe(e), n & 4)) {
        if (e.stateNode === null) throw Error(A(162));
        (o = e.stateNode), (l = e.memoizedProps);
        try {
          o.nodeValue = l;
        } catch (w) {
          G(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        (Pe(t, e), Qe(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
      )
        try {
          nn(t.containerInfo);
        } catch (w) {
          G(e, e.return, w);
        }
      break;
    case 4:
      Pe(t, e), Qe(e);
      break;
    case 13:
      Pe(t, e),
        Qe(e),
        (o = e.child),
        o.flags & 8192 &&
          ((l = o.memoizedState !== null),
          (o.stateNode.isHidden = l),
          !l ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (ba = Z())),
        n & 4 && Is(e);
      break;
    case 22:
      if (
        ((m = r !== null && r.memoizedState !== null),
        e.mode & 1 ? ((ce = (u = ce) || m), Pe(t, e), (ce = u)) : Pe(t, e),
        Qe(e),
        n & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !m && e.mode & 1)
        )
          for (F = e, m = e.child; m !== null; ) {
            for (p = F = m; F !== null; ) {
              switch (((h = F), (y = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  $r(4, h, h.return);
                  break;
                case 1:
                  or(h, h.return);
                  var x = h.stateNode;
                  if (typeof x.componentWillUnmount == 'function') {
                    (n = h), (r = h.return);
                    try {
                      (t = n),
                        (x.props = t.memoizedProps),
                        (x.state = t.memoizedState),
                        x.componentWillUnmount();
                    } catch (w) {
                      G(n, r, w);
                    }
                  }
                  break;
                case 5:
                  or(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    Bs(p);
                    continue;
                  }
              }
              y !== null ? ((y.return = h), (F = y)) : Bs(p);
            }
            m = m.sibling;
          }
        e: for (m = null, p = e; ; ) {
          if (p.tag === 5) {
            if (m === null) {
              m = p;
              try {
                (o = p.stateNode),
                  u
                    ? ((l = o.style),
                      typeof l.setProperty == 'function'
                        ? l.setProperty('display', 'none', 'important')
                        : (l.display = 'none'))
                    : ((a = p.stateNode),
                      (s = p.memoizedProps.style),
                      (i =
                        s != null && s.hasOwnProperty('display')
                          ? s.display
                          : null),
                      (a.style.display = Ou('display', i)));
              } catch (w) {
                G(e, e.return, w);
              }
            }
          } else if (p.tag === 6) {
            if (m === null)
              try {
                p.stateNode.nodeValue = u ? '' : p.memoizedProps;
              } catch (w) {
                G(e, e.return, w);
              }
          } else if (
            ((p.tag !== 22 && p.tag !== 23) ||
              p.memoizedState === null ||
              p === e) &&
            p.child !== null
          ) {
            (p.child.return = p), (p = p.child);
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            m === p && (m = null), (p = p.return);
          }
          m === p && (m = null), (p.sibling.return = p.return), (p = p.sibling);
        }
      }
      break;
    case 19:
      Pe(t, e), Qe(e), n & 4 && Is(e);
      break;
    case 21:
      break;
    default:
      Pe(t, e), Qe(e);
  }
}
function Qe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (f0(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error(A(160));
      }
      switch (n.tag) {
        case 5:
          var o = n.stateNode;
          n.flags & 32 && (qr(o, ''), (n.flags &= -33));
          var l = Ns(e);
          Si(e, l, o);
          break;
        case 3:
        case 4:
          var i = n.stateNode.containerInfo,
            a = Ns(e);
          wi(e, a, i);
          break;
        default:
          throw Error(A(161));
      }
    } catch (s) {
      G(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function lm(e, t, r) {
  (F = e), h0(e);
}
function h0(e, t, r) {
  for (var n = (e.mode & 1) !== 0; F !== null; ) {
    var o = F,
      l = o.child;
    if (o.tag === 22 && n) {
      var i = o.memoizedState !== null || On;
      if (!i) {
        var a = o.alternate,
          s = (a !== null && a.memoizedState !== null) || ce;
        a = On;
        var u = ce;
        if (((On = i), (ce = s) && !u))
          for (F = o; F !== null; )
            (i = F),
              (s = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Ms(o)
                : s !== null
                ? ((s.return = i), (F = s))
                : Ms(o);
        for (; l !== null; ) (F = l), h0(l), (l = l.sibling);
        (F = o), (On = a), (ce = u);
      }
      Ts(e);
    } else
      o.subtreeFlags & 8772 && l !== null ? ((l.return = o), (F = l)) : Ts(e);
  }
}
function Ts(e) {
  for (; F !== null; ) {
    var t = F;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ce || Qo(5, t);
              break;
            case 1:
              var n = t.stateNode;
              if (t.flags & 4 && !ce)
                if (r === null) n.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? r.memoizedProps
                      : Le(t.type, r.memoizedProps);
                  n.componentDidUpdate(
                    o,
                    r.memoizedState,
                    n.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var l = t.updateQueue;
              l !== null && hs(t, l, n);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((r = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                hs(t, i, r);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (r === null && t.flags & 4) {
                r = a;
                var s = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    s.autoFocus && r.focus();
                    break;
                  case 'img':
                    s.src && (r.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var m = u.memoizedState;
                  if (m !== null) {
                    var p = m.dehydrated;
                    p !== null && nn(p);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(A(163));
          }
        ce || (t.flags & 512 && Ai(t));
      } catch (h) {
        G(t, t.return, h);
      }
    }
    if (t === e) {
      F = null;
      break;
    }
    if (((r = t.sibling), r !== null)) {
      (r.return = t.return), (F = r);
      break;
    }
    F = t.return;
  }
}
function Bs(e) {
  for (; F !== null; ) {
    var t = F;
    if (t === e) {
      F = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      (r.return = t.return), (F = r);
      break;
    }
    F = t.return;
  }
}
function Ms(e) {
  for (; F !== null; ) {
    var t = F;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            Qo(4, t);
          } catch (s) {
            G(t, r, s);
          }
          break;
        case 1:
          var n = t.stateNode;
          if (typeof n.componentDidMount == 'function') {
            var o = t.return;
            try {
              n.componentDidMount();
            } catch (s) {
              G(t, o, s);
            }
          }
          var l = t.return;
          try {
            Ai(t);
          } catch (s) {
            G(t, l, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Ai(t);
          } catch (s) {
            G(t, i, s);
          }
      }
    } catch (s) {
      G(t, t.return, s);
    }
    if (t === e) {
      F = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (F = a);
      break;
    }
    F = t.return;
  }
}
var im = Math.ceil,
  Fo = lt.ReactCurrentDispatcher,
  ha = lt.ReactCurrentOwner,
  Be = lt.ReactCurrentBatchConfig,
  L = 0,
  oe = null,
  X = null,
  ie = 0,
  we = 0,
  lr = Et(0),
  ee = 0,
  hn = null,
  Ut = 0,
  $o = 0,
  pa = 0,
  Wr = null,
  pe = null,
  ba = 0,
  vr = 1 / 0,
  Ye = null,
  Eo = !1,
  Di = null,
  vt = null,
  Un = !1,
  mt = null,
  Co = 0,
  Kr = 0,
  Fi = null,
  to = -1,
  ro = 0;
function me() {
  return L & 6 ? Z() : to !== -1 ? to : (to = Z());
}
function xt(e) {
  return e.mode & 1
    ? L & 2 && ie !== 0
      ? ie & -ie
      : Qf.transition !== null
      ? (ro === 0 && (ro = qu()), ro)
      : ((e = R),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : ic(e.type))),
        e)
    : 1;
}
function Ue(e, t, r, n) {
  if (50 < Kr) throw ((Kr = 0), (Fi = null), Error(A(185)));
  xn(e, r, n),
    (!(L & 2) || e !== oe) &&
      (e === oe && (!(L & 2) && ($o |= r), ee === 4 && dt(e, ie)),
      xe(e, n),
      r === 1 && L === 0 && !(t.mode & 1) && ((vr = Z() + 500), Oo && Ct()));
}
function xe(e, t) {
  var r = e.callbackNode;
  Hd(e, t);
  var n = uo(e, e === oe ? ie : 0);
  if (n === 0)
    r !== null && Ha(r), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = n & -n), e.callbackPriority !== t)) {
    if ((r != null && Ha(r), t === 1))
      e.tag === 0 ? Hf(zs.bind(null, e)) : Fc(zs.bind(null, e)),
        jf(function () {
          !(L & 6) && Ct();
        }),
        (r = null);
    else {
      switch (ec(n)) {
        case 1:
          r = Qi;
          break;
        case 4:
          r = Zu;
          break;
        case 16:
          r = so;
          break;
        case 536870912:
          r = Xu;
          break;
        default:
          r = so;
      }
      r = S0(r, p0.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = r);
  }
}
function p0(e, t) {
  if (((to = -1), (ro = 0), L & 6)) throw Error(A(327));
  var r = e.callbackNode;
  if (fr() && e.callbackNode !== r) return null;
  var n = uo(e, e === oe ? ie : 0);
  if (n === 0) return null;
  if (n & 30 || n & e.expiredLanes || t) t = ko(e, n);
  else {
    t = n;
    var o = L;
    L |= 2;
    var l = y0();
    (oe !== e || ie !== t) && ((Ye = null), (vr = Z() + 500), Lt(e, t));
    do
      try {
        um();
        break;
      } catch (a) {
        b0(e, a);
      }
    while (!0);
    ra(),
      (Fo.current = l),
      (L = o),
      X !== null ? (t = 0) : ((oe = null), (ie = 0), (t = ee));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Xl(e)), o !== 0 && ((n = o), (t = Ei(e, o)))), t === 1)
    )
      throw ((r = hn), Lt(e, 0), dt(e, n), xe(e, Z()), r);
    if (t === 6) dt(e, n);
    else {
      if (
        ((o = e.current.alternate),
        !(n & 30) &&
          !am(o) &&
          ((t = ko(e, n)),
          t === 2 && ((l = Xl(e)), l !== 0 && ((n = l), (t = Ei(e, l)))),
          t === 1))
      )
        throw ((r = hn), Lt(e, 0), dt(e, n), xe(e, Z()), r);
      switch (((e.finishedWork = o), (e.finishedLanes = n), t)) {
        case 0:
        case 1:
          throw Error(A(345));
        case 2:
          Bt(e, pe, Ye);
          break;
        case 3:
          if (
            (dt(e, n), (n & 130023424) === n && ((t = ba + 500 - Z()), 10 < t))
          ) {
            if (uo(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & n) !== n)) {
              me(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = ii(Bt.bind(null, e, pe, Ye), t);
            break;
          }
          Bt(e, pe, Ye);
          break;
        case 4:
          if ((dt(e, n), (n & 4194240) === n)) break;
          for (t = e.eventTimes, o = -1; 0 < n; ) {
            var i = 31 - Oe(n);
            (l = 1 << i), (i = t[i]), i > o && (o = i), (n &= ~l);
          }
          if (
            ((n = o),
            (n = Z() - n),
            (n =
              (120 > n
                ? 120
                : 480 > n
                ? 480
                : 1080 > n
                ? 1080
                : 1920 > n
                ? 1920
                : 3e3 > n
                ? 3e3
                : 4320 > n
                ? 4320
                : 1960 * im(n / 1960)) - n),
            10 < n)
          ) {
            e.timeoutHandle = ii(Bt.bind(null, e, pe, Ye), n);
            break;
          }
          Bt(e, pe, Ye);
          break;
        case 5:
          Bt(e, pe, Ye);
          break;
        default:
          throw Error(A(329));
      }
    }
  }
  return xe(e, Z()), e.callbackNode === r ? p0.bind(null, e) : null;
}
function Ei(e, t) {
  var r = Wr;
  return (
    e.current.memoizedState.isDehydrated && (Lt(e, t).flags |= 256),
    (e = ko(e, t)),
    e !== 2 && ((t = pe), (pe = r), t !== null && Ci(t)),
    e
  );
}
function Ci(e) {
  pe === null ? (pe = e) : pe.push.apply(pe, e);
}
function am(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && ((r = r.stores), r !== null))
        for (var n = 0; n < r.length; n++) {
          var o = r[n],
            l = o.getSnapshot;
          o = o.value;
          try {
            if (!He(l(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((r = t.child), t.subtreeFlags & 16384 && r !== null))
      (r.return = t), (t = r);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function dt(e, t) {
  for (
    t &= ~pa,
      t &= ~$o,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var r = 31 - Oe(t),
      n = 1 << r;
    (e[r] = -1), (t &= ~n);
  }
}
function zs(e) {
  if (L & 6) throw Error(A(327));
  fr();
  var t = uo(e, 0);
  if (!(t & 1)) return xe(e, Z()), null;
  var r = ko(e, t);
  if (e.tag !== 0 && r === 2) {
    var n = Xl(e);
    n !== 0 && ((t = n), (r = Ei(e, n)));
  }
  if (r === 1) throw ((r = hn), Lt(e, 0), dt(e, t), xe(e, Z()), r);
  if (r === 6) throw Error(A(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Bt(e, pe, Ye),
    xe(e, Z()),
    null
  );
}
function ya(e, t) {
  var r = L;
  L |= 1;
  try {
    return e(t);
  } finally {
    (L = r), L === 0 && ((vr = Z() + 500), Oo && Ct());
  }
}
function Ht(e) {
  mt !== null && mt.tag === 0 && !(L & 6) && fr();
  var t = L;
  L |= 1;
  var r = Be.transition,
    n = R;
  try {
    if (((Be.transition = null), (R = 1), e)) return e();
  } finally {
    (R = n), (Be.transition = r), (L = t), !(L & 6) && Ct();
  }
}
function va() {
  (we = lr.current), H(lr);
}
function Lt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var r = e.timeoutHandle;
  if ((r !== -1 && ((e.timeoutHandle = -1), Rf(r)), X !== null))
    for (r = X.return; r !== null; ) {
      var n = r;
      switch ((qi(n), n.tag)) {
        case 1:
          (n = n.type.childContextTypes), n != null && ho();
          break;
        case 3:
          br(), H(ye), H(de), sa();
          break;
        case 5:
          aa(n);
          break;
        case 4:
          br();
          break;
        case 13:
          H(W);
          break;
        case 19:
          H(W);
          break;
        case 10:
          na(n.type._context);
          break;
        case 22:
        case 23:
          va();
      }
      r = r.return;
    }
  if (
    ((oe = e),
    (X = e = At(e.current, null)),
    (ie = we = t),
    (ee = 0),
    (hn = null),
    (pa = $o = Ut = 0),
    (pe = Wr = null),
    zt !== null)
  ) {
    for (t = 0; t < zt.length; t++)
      if (((r = zt[t]), (n = r.interleaved), n !== null)) {
        r.interleaved = null;
        var o = n.next,
          l = r.pending;
        if (l !== null) {
          var i = l.next;
          (l.next = o), (n.next = i);
        }
        r.pending = n;
      }
    zt = null;
  }
  return e;
}
function b0(e, t) {
  do {
    var r = X;
    try {
      if ((ra(), (Xn.current = Do), So)) {
        for (var n = K.memoizedState; n !== null; ) {
          var o = n.queue;
          o !== null && (o.pending = null), (n = n.next);
        }
        So = !1;
      }
      if (
        ((Ot = 0),
        (re = q = K = null),
        (Qr = !1),
        (fn = 0),
        (ha.current = null),
        r === null || r.return === null)
      ) {
        (ee = 1), (hn = t), (X = null);
        break;
      }
      e: {
        var l = e,
          i = r.return,
          a = r,
          s = t;
        if (
          ((t = ie),
          (a.flags |= 32768),
          s !== null && typeof s == 'object' && typeof s.then == 'function')
        ) {
          var u = s,
            m = a,
            p = m.tag;
          if (!(m.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = m.alternate;
            h
              ? ((m.updateQueue = h.updateQueue),
                (m.memoizedState = h.memoizedState),
                (m.lanes = h.lanes))
              : ((m.updateQueue = null), (m.memoizedState = null));
          }
          var y = As(i);
          if (y !== null) {
            (y.flags &= -257),
              ws(y, i, a, l, t),
              y.mode & 1 && xs(l, u, t),
              (t = y),
              (s = u);
            var x = t.updateQueue;
            if (x === null) {
              var w = new Set();
              w.add(s), (t.updateQueue = w);
            } else x.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              xs(l, u, t), xa();
              break e;
            }
            s = Error(A(426));
          }
        } else if (Q && a.mode & 1) {
          var P = As(i);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256),
              ws(P, i, a, l, t),
              ea(yr(s, a));
            break e;
          }
        }
        (l = s = yr(s, a)),
          ee !== 4 && (ee = 2),
          Wr === null ? (Wr = [l]) : Wr.push(l),
          (l = i);
        do {
          switch (l.tag) {
            case 3:
              (l.flags |= 65536), (t &= -t), (l.lanes |= t);
              var f = e0(l, s, t);
              gs(l, f);
              break e;
            case 1:
              a = s;
              var d = l.type,
                g = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof d.getDerivedStateFromError == 'function' ||
                  (g !== null &&
                    typeof g.componentDidCatch == 'function' &&
                    (vt === null || !vt.has(g))))
              ) {
                (l.flags |= 65536), (t &= -t), (l.lanes |= t);
                var v = t0(l, a, t);
                gs(l, v);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      x0(r);
    } catch (S) {
      (t = S), X === r && r !== null && (X = r = r.return);
      continue;
    }
    break;
  } while (!0);
}
function y0() {
  var e = Fo.current;
  return (Fo.current = Do), e === null ? Do : e;
}
function xa() {
  (ee === 0 || ee === 3 || ee === 2) && (ee = 4),
    oe === null || (!(Ut & 268435455) && !($o & 268435455)) || dt(oe, ie);
}
function ko(e, t) {
  var r = L;
  L |= 2;
  var n = y0();
  (oe !== e || ie !== t) && ((Ye = null), Lt(e, t));
  do
    try {
      sm();
      break;
    } catch (o) {
      b0(e, o);
    }
  while (!0);
  if ((ra(), (L = r), (Fo.current = n), X !== null)) throw Error(A(261));
  return (oe = null), (ie = 0), ee;
}
function sm() {
  for (; X !== null; ) v0(X);
}
function um() {
  for (; X !== null && !Md(); ) v0(X);
}
function v0(e) {
  var t = w0(e.alternate, e, we);
  (e.memoizedProps = e.pendingProps),
    t === null ? x0(e) : (X = t),
    (ha.current = null);
}
function x0(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((r = rm(r, t)), r !== null)) {
        (r.flags &= 32767), (X = r);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ee = 6), (X = null);
        return;
      }
    } else if (((r = tm(r, t, we)), r !== null)) {
      X = r;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      X = t;
      return;
    }
    X = t = e;
  } while (t !== null);
  ee === 0 && (ee = 5);
}
function Bt(e, t, r) {
  var n = R,
    o = Be.transition;
  try {
    (Be.transition = null), (R = 1), cm(e, t, r, n);
  } finally {
    (Be.transition = o), (R = n);
  }
  return null;
}
function cm(e, t, r, n) {
  do fr();
  while (mt !== null);
  if (L & 6) throw Error(A(327));
  r = e.finishedWork;
  var o = e.finishedLanes;
  if (r === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
    throw Error(A(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var l = r.lanes | r.childLanes;
  if (
    (Qd(e, l),
    e === oe && ((X = oe = null), (ie = 0)),
    (!(r.subtreeFlags & 2064) && !(r.flags & 2064)) ||
      Un ||
      ((Un = !0),
      S0(so, function () {
        return fr(), null;
      })),
    (l = (r.flags & 15990) !== 0),
    r.subtreeFlags & 15990 || l)
  ) {
    (l = Be.transition), (Be.transition = null);
    var i = R;
    R = 1;
    var a = L;
    (L |= 4),
      (ha.current = null),
      om(e, r),
      g0(r, e),
      If(oi),
      (co = !!ni),
      (oi = ni = null),
      (e.current = r),
      lm(r),
      zd(),
      (L = a),
      (R = i),
      (Be.transition = l);
  } else e.current = r;
  if (
    (Un && ((Un = !1), (mt = e), (Co = o)),
    (l = e.pendingLanes),
    l === 0 && (vt = null),
    Rd(r.stateNode),
    xe(e, Z()),
    t !== null)
  )
    for (n = e.onRecoverableError, r = 0; r < t.length; r++)
      (o = t[r]), n(o.value, { componentStack: o.stack, digest: o.digest });
  if (Eo) throw ((Eo = !1), (e = Di), (Di = null), e);
  return (
    Co & 1 && e.tag !== 0 && fr(),
    (l = e.pendingLanes),
    l & 1 ? (e === Fi ? Kr++ : ((Kr = 0), (Fi = e))) : (Kr = 0),
    Ct(),
    null
  );
}
function fr() {
  if (mt !== null) {
    var e = ec(Co),
      t = Be.transition,
      r = R;
    try {
      if (((Be.transition = null), (R = 16 > e ? 16 : e), mt === null))
        var n = !1;
      else {
        if (((e = mt), (mt = null), (Co = 0), L & 6)) throw Error(A(331));
        var o = L;
        for (L |= 4, F = e.current; F !== null; ) {
          var l = F,
            i = l.child;
          if (F.flags & 16) {
            var a = l.deletions;
            if (a !== null) {
              for (var s = 0; s < a.length; s++) {
                var u = a[s];
                for (F = u; F !== null; ) {
                  var m = F;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $r(8, m, l);
                  }
                  var p = m.child;
                  if (p !== null) (p.return = m), (F = p);
                  else
                    for (; F !== null; ) {
                      m = F;
                      var h = m.sibling,
                        y = m.return;
                      if ((d0(m), m === u)) {
                        F = null;
                        break;
                      }
                      if (h !== null) {
                        (h.return = y), (F = h);
                        break;
                      }
                      F = y;
                    }
                }
              }
              var x = l.alternate;
              if (x !== null) {
                var w = x.child;
                if (w !== null) {
                  x.child = null;
                  do {
                    var P = w.sibling;
                    (w.sibling = null), (w = P);
                  } while (w !== null);
                }
              }
              F = l;
            }
          }
          if (l.subtreeFlags & 2064 && i !== null) (i.return = l), (F = i);
          else
            e: for (; F !== null; ) {
              if (((l = F), l.flags & 2048))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    $r(9, l, l.return);
                }
              var f = l.sibling;
              if (f !== null) {
                (f.return = l.return), (F = f);
                break e;
              }
              F = l.return;
            }
        }
        var d = e.current;
        for (F = d; F !== null; ) {
          i = F;
          var g = i.child;
          if (i.subtreeFlags & 2064 && g !== null) (g.return = i), (F = g);
          else
            e: for (i = d; F !== null; ) {
              if (((a = F), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qo(9, a);
                  }
                } catch (S) {
                  G(a, a.return, S);
                }
              if (a === i) {
                F = null;
                break e;
              }
              var v = a.sibling;
              if (v !== null) {
                (v.return = a.return), (F = v);
                break e;
              }
              F = a.return;
            }
        }
        if (
          ((L = o), Ct(), Ke && typeof Ke.onPostCommitFiberRoot == 'function')
        )
          try {
            Ke.onPostCommitFiberRoot(Po, e);
          } catch {}
        n = !0;
      }
      return n;
    } finally {
      (R = r), (Be.transition = t);
    }
  }
  return !1;
}
function Ps(e, t, r) {
  (t = yr(r, t)),
    (t = e0(e, t, 1)),
    (e = yt(e, t, 1)),
    (t = me()),
    e !== null && (xn(e, 1, t), xe(e, t));
}
function G(e, t, r) {
  if (e.tag === 3) Ps(e, e, r);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Ps(t, e, r);
        break;
      } else if (t.tag === 1) {
        var n = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof n.componentDidCatch == 'function' &&
            (vt === null || !vt.has(n)))
        ) {
          (e = yr(r, e)),
            (e = t0(t, e, 1)),
            (t = yt(t, e, 1)),
            (e = me()),
            t !== null && (xn(t, 1, e), xe(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function dm(e, t, r) {
  var n = e.pingCache;
  n !== null && n.delete(t),
    (t = me()),
    (e.pingedLanes |= e.suspendedLanes & r),
    oe === e &&
      (ie & r) === r &&
      (ee === 4 || (ee === 3 && (ie & 130023424) === ie && 500 > Z() - ba)
        ? Lt(e, 0)
        : (pa |= r)),
    xe(e, t);
}
function A0(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Tn), (Tn <<= 1), !(Tn & 130023424) && (Tn = 4194304))
      : (t = 1));
  var r = me();
  (e = rt(e, t)), e !== null && (xn(e, t, r), xe(e, r));
}
function fm(e) {
  var t = e.memoizedState,
    r = 0;
  t !== null && (r = t.retryLane), A0(e, r);
}
function mm(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var n = e.stateNode,
        o = e.memoizedState;
      o !== null && (r = o.retryLane);
      break;
    case 19:
      n = e.stateNode;
      break;
    default:
      throw Error(A(314));
  }
  n !== null && n.delete(t), A0(e, r);
}
var w0;
w0 = function (e, t, r) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ye.current) be = !0;
    else {
      if (!(e.lanes & r) && !(t.flags & 128)) return (be = !1), em(e, t, r);
      be = !!(e.flags & 131072);
    }
  else (be = !1), Q && t.flags & 1048576 && Ec(t, yo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var n = t.type;
      eo(e, t), (e = t.pendingProps);
      var o = gr(t, de.current);
      dr(t, r), (o = ca(null, t, n, e, o, r));
      var l = da();
      return (
        (t.flags |= 1),
        typeof o == 'object' &&
        o !== null &&
        typeof o.render == 'function' &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ve(n) ? ((l = !0), po(t)) : (l = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            la(t),
            (o.updater = Ho),
            (t.stateNode = o),
            (o._reactInternals = t),
            mi(t, n, e, r),
            (t = pi(null, t, n, !0, l, r)))
          : ((t.tag = 0), Q && l && Xi(t), fe(null, t, o, r), (t = t.child)),
        t
      );
    case 16:
      n = t.elementType;
      e: {
        switch (
          (eo(e, t),
          (e = t.pendingProps),
          (o = n._init),
          (n = o(n._payload)),
          (t.type = n),
          (o = t.tag = hm(n)),
          (e = Le(n, e)),
          o)
        ) {
          case 0:
            t = hi(null, t, n, e, r);
            break e;
          case 1:
            t = Fs(null, t, n, e, r);
            break e;
          case 11:
            t = Ss(null, t, n, e, r);
            break e;
          case 14:
            t = Ds(null, t, n, Le(n.type, e), r);
            break e;
        }
        throw Error(A(306, n, ''));
      }
      return t;
    case 0:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : Le(n, o)),
        hi(e, t, n, o, r)
      );
    case 1:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : Le(n, o)),
        Fs(e, t, n, o, r)
      );
    case 3:
      e: {
        if ((l0(t), e === null)) throw Error(A(387));
        (n = t.pendingProps),
          (l = t.memoizedState),
          (o = l.element),
          Bc(e, t),
          Ao(t, n, null, r);
        var i = t.memoizedState;
        if (((n = i.element), l.isDehydrated))
          if (
            ((l = {
              element: n,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = l),
            (t.memoizedState = l),
            t.flags & 256)
          ) {
            (o = yr(Error(A(423)), t)), (t = Es(e, t, n, r, o));
            break e;
          } else if (n !== o) {
            (o = yr(Error(A(424)), t)), (t = Es(e, t, n, r, o));
            break e;
          } else
            for (
              De = bt(t.stateNode.containerInfo.firstChild),
                Fe = t,
                Q = !0,
                je = null,
                r = Ic(t, null, n, r),
                t.child = r;
              r;

            )
              (r.flags = (r.flags & -3) | 4096), (r = r.sibling);
        else {
          if ((hr(), n === o)) {
            t = nt(e, t, r);
            break e;
          }
          fe(e, t, n, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Mc(t),
        e === null && ci(t),
        (n = t.type),
        (o = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (i = o.children),
        li(n, o) ? (i = null) : l !== null && li(n, l) && (t.flags |= 32),
        o0(e, t),
        fe(e, t, i, r),
        t.child
      );
    case 6:
      return e === null && ci(t), null;
    case 13:
      return i0(e, t, r);
    case 4:
      return (
        ia(t, t.stateNode.containerInfo),
        (n = t.pendingProps),
        e === null ? (t.child = pr(t, null, n, r)) : fe(e, t, n, r),
        t.child
      );
    case 11:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : Le(n, o)),
        Ss(e, t, n, o, r)
      );
    case 7:
      return fe(e, t, t.pendingProps, r), t.child;
    case 8:
      return fe(e, t, t.pendingProps.children, r), t.child;
    case 12:
      return fe(e, t, t.pendingProps.children, r), t.child;
    case 10:
      e: {
        if (
          ((n = t.type._context),
          (o = t.pendingProps),
          (l = t.memoizedProps),
          (i = o.value),
          _(vo, n._currentValue),
          (n._currentValue = i),
          l !== null)
        )
          if (He(l.value, i)) {
            if (l.children === o.children && !ye.current) {
              t = nt(e, t, r);
              break e;
            }
          } else
            for (l = t.child, l !== null && (l.return = t); l !== null; ) {
              var a = l.dependencies;
              if (a !== null) {
                i = l.child;
                for (var s = a.firstContext; s !== null; ) {
                  if (s.context === n) {
                    if (l.tag === 1) {
                      (s = qe(-1, r & -r)), (s.tag = 2);
                      var u = l.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var m = u.pending;
                        m === null
                          ? (s.next = s)
                          : ((s.next = m.next), (m.next = s)),
                          (u.pending = s);
                      }
                    }
                    (l.lanes |= r),
                      (s = l.alternate),
                      s !== null && (s.lanes |= r),
                      di(l.return, r, t),
                      (a.lanes |= r);
                    break;
                  }
                  s = s.next;
                }
              } else if (l.tag === 10) i = l.type === t.type ? null : l.child;
              else if (l.tag === 18) {
                if (((i = l.return), i === null)) throw Error(A(341));
                (i.lanes |= r),
                  (a = i.alternate),
                  a !== null && (a.lanes |= r),
                  di(i, r, t),
                  (i = l.sibling);
              } else i = l.child;
              if (i !== null) i.return = l;
              else
                for (i = l; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((l = i.sibling), l !== null)) {
                    (l.return = i.return), (i = l);
                    break;
                  }
                  i = i.return;
                }
              l = i;
            }
        fe(e, t, o.children, r), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (n = t.pendingProps.children),
        dr(t, r),
        (o = Me(o)),
        (n = n(o)),
        (t.flags |= 1),
        fe(e, t, n, r),
        t.child
      );
    case 14:
      return (
        (n = t.type),
        (o = Le(n, t.pendingProps)),
        (o = Le(n.type, o)),
        Ds(e, t, n, o, r)
      );
    case 15:
      return r0(e, t, t.type, t.pendingProps, r);
    case 17:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : Le(n, o)),
        eo(e, t),
        (t.tag = 1),
        ve(n) ? ((e = !0), po(t)) : (e = !1),
        dr(t, r),
        qc(t, n, o),
        mi(t, n, o, r),
        pi(null, t, n, !0, e, r)
      );
    case 19:
      return a0(e, t, r);
    case 22:
      return n0(e, t, r);
  }
  throw Error(A(156, t.tag));
};
function S0(e, t) {
  return Ju(e, t);
}
function gm(e, t, r, n) {
  (this.tag = e),
    (this.key = r),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = n),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Te(e, t, r, n) {
  return new gm(e, t, r, n);
}
function Aa(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function hm(e) {
  if (typeof e == 'function') return Aa(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Oi)) return 11;
    if (e === Ui) return 14;
  }
  return 2;
}
function At(e, t) {
  var r = e.alternate;
  return (
    r === null
      ? ((r = Te(e.tag, t, e.key, e.mode)),
        (r.elementType = e.elementType),
        (r.type = e.type),
        (r.stateNode = e.stateNode),
        (r.alternate = e),
        (e.alternate = r))
      : ((r.pendingProps = t),
        (r.type = e.type),
        (r.flags = 0),
        (r.subtreeFlags = 0),
        (r.deletions = null)),
    (r.flags = e.flags & 14680064),
    (r.childLanes = e.childLanes),
    (r.lanes = e.lanes),
    (r.child = e.child),
    (r.memoizedProps = e.memoizedProps),
    (r.memoizedState = e.memoizedState),
    (r.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (r.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (r.sibling = e.sibling),
    (r.index = e.index),
    (r.ref = e.ref),
    r
  );
}
function no(e, t, r, n, o, l) {
  var i = 2;
  if (((n = e), typeof e == 'function')) Aa(e) && (i = 1);
  else if (typeof e == 'string') i = 5;
  else
    e: switch (e) {
      case Yt:
        return Rt(r.children, o, l, t);
      case _i:
        (i = 8), (o |= 8);
        break;
      case Rl:
        return (
          (e = Te(12, r, t, o | 2)), (e.elementType = Rl), (e.lanes = l), e
        );
      case jl:
        return (e = Te(13, r, t, o)), (e.elementType = jl), (e.lanes = l), e;
      case _l:
        return (e = Te(19, r, t, o)), (e.elementType = _l), (e.lanes = l), e;
      case Mu:
        return Wo(r, o, l, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case Tu:
              i = 10;
              break e;
            case Bu:
              i = 9;
              break e;
            case Oi:
              i = 11;
              break e;
            case Ui:
              i = 14;
              break e;
            case st:
              (i = 16), (n = null);
              break e;
          }
        throw Error(A(130, e == null ? e : typeof e, ''));
    }
  return (
    (t = Te(i, r, t, o)), (t.elementType = e), (t.type = n), (t.lanes = l), t
  );
}
function Rt(e, t, r, n) {
  return (e = Te(7, e, n, t)), (e.lanes = r), e;
}
function Wo(e, t, r, n) {
  return (
    (e = Te(22, e, n, t)),
    (e.elementType = Mu),
    (e.lanes = r),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Fl(e, t, r) {
  return (e = Te(6, e, null, t)), (e.lanes = r), e;
}
function El(e, t, r) {
  return (
    (t = Te(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = r),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function pm(e, t, r, n, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = il(0)),
    (this.expirationTimes = il(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = il(0)),
    (this.identifierPrefix = n),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function wa(e, t, r, n, o, l, i, a, s) {
  return (
    (e = new pm(e, t, r, a, s)),
    t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
    (l = Te(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: n,
      isDehydrated: r,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    la(l),
    e
  );
}
function bm(e, t, r) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Gt,
    key: n == null ? null : '' + n,
    children: e,
    containerInfo: t,
    implementation: r,
  };
}
function D0(e) {
  if (!e) return Dt;
  e = e._reactInternals;
  e: {
    if (Wt(e) !== e || e.tag !== 1) throw Error(A(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(A(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (ve(r)) return Dc(e, r, t);
  }
  return t;
}
function F0(e, t, r, n, o, l, i, a, s) {
  return (
    (e = wa(r, n, !0, e, o, l, i, a, s)),
    (e.context = D0(null)),
    (r = e.current),
    (n = me()),
    (o = xt(r)),
    (l = qe(n, o)),
    (l.callback = t ?? null),
    yt(r, l, o),
    (e.current.lanes = o),
    xn(e, o, n),
    xe(e, n),
    e
  );
}
function Ko(e, t, r, n) {
  var o = t.current,
    l = me(),
    i = xt(o);
  return (
    (r = D0(r)),
    t.context === null ? (t.context = r) : (t.pendingContext = r),
    (t = qe(l, i)),
    (t.payload = { element: e }),
    (n = n === void 0 ? null : n),
    n !== null && (t.callback = n),
    (e = yt(o, t, i)),
    e !== null && (Ue(e, o, i, l), Zn(e, o, i)),
    i
  );
}
function No(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ls(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function Sa(e, t) {
  Ls(e, t), (e = e.alternate) && Ls(e, t);
}
function ym() {
  return null;
}
var E0 =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function Da(e) {
  this._internalRoot = e;
}
Vo.prototype.render = Da.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(A(409));
  Ko(e, t, null, null);
};
Vo.prototype.unmount = Da.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ht(function () {
      Ko(null, e, null, null);
    }),
      (t[tt] = null);
  }
};
function Vo(e) {
  this._internalRoot = e;
}
Vo.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = nc();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < ct.length && t !== 0 && t < ct[r].priority; r++);
    ct.splice(r, 0, e), r === 0 && lc(e);
  }
};
function Fa(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Go(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function Rs() {}
function vm(e, t, r, n, o) {
  if (o) {
    if (typeof n == 'function') {
      var l = n;
      n = function () {
        var u = No(i);
        l.call(u);
      };
    }
    var i = F0(t, n, e, 0, null, !1, !1, '', Rs);
    return (
      (e._reactRootContainer = i),
      (e[tt] = i.current),
      an(e.nodeType === 8 ? e.parentNode : e),
      Ht(),
      i
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof n == 'function') {
    var a = n;
    n = function () {
      var u = No(s);
      a.call(u);
    };
  }
  var s = wa(e, 0, !1, null, null, !1, !1, '', Rs);
  return (
    (e._reactRootContainer = s),
    (e[tt] = s.current),
    an(e.nodeType === 8 ? e.parentNode : e),
    Ht(function () {
      Ko(t, s, r, n);
    }),
    s
  );
}
function Yo(e, t, r, n, o) {
  var l = r._reactRootContainer;
  if (l) {
    var i = l;
    if (typeof o == 'function') {
      var a = o;
      o = function () {
        var s = No(i);
        a.call(s);
      };
    }
    Ko(t, i, e, o);
  } else i = vm(r, t, e, o, n);
  return No(i);
}
tc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = Lr(t.pendingLanes);
        r !== 0 &&
          ($i(t, r | 1), xe(t, Z()), !(L & 6) && ((vr = Z() + 500), Ct()));
      }
      break;
    case 13:
      Ht(function () {
        var n = rt(e, 1);
        if (n !== null) {
          var o = me();
          Ue(n, e, 1, o);
        }
      }),
        Sa(e, 1);
  }
};
Wi = function (e) {
  if (e.tag === 13) {
    var t = rt(e, 134217728);
    if (t !== null) {
      var r = me();
      Ue(t, e, 134217728, r);
    }
    Sa(e, 134217728);
  }
};
rc = function (e) {
  if (e.tag === 13) {
    var t = xt(e),
      r = rt(e, t);
    if (r !== null) {
      var n = me();
      Ue(r, e, t, n);
    }
    Sa(e, t);
  }
};
nc = function () {
  return R;
};
oc = function (e, t) {
  var r = R;
  try {
    return (R = e), t();
  } finally {
    R = r;
  }
};
Yl = function (e, t, r) {
  switch (t) {
    case 'input':
      if ((Hl(e, r), (t = r.name), r.type === 'radio' && t != null)) {
        for (r = e; r.parentNode; ) r = r.parentNode;
        for (
          r = r.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
          ),
            t = 0;
          t < r.length;
          t++
        ) {
          var n = r[t];
          if (n !== e && n.form === e.form) {
            var o = _o(n);
            if (!o) throw Error(A(90));
            Pu(n), Hl(n, o);
          }
        }
      }
      break;
    case 'textarea':
      Ru(e, r);
      break;
    case 'select':
      (t = r.value), t != null && ar(e, !!r.multiple, t, !1);
  }
};
$u = ya;
Wu = Ht;
var xm = { usingClientEntryPoint: !1, Events: [wn, qt, _o, Hu, Qu, ya] },
  Br = {
    findFiberByHostInstance: Mt,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  Am = {
    bundleType: Br.bundleType,
    version: Br.version,
    rendererPackageName: Br.rendererPackageName,
    rendererConfig: Br.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: lt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Gu(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Br.findFiberByHostInstance || ym,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var Hn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Hn.isDisabled && Hn.supportsFiber)
    try {
      (Po = Hn.inject(Am)), (Ke = Hn);
    } catch {}
}
Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xm;
Ce.createPortal = function (e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Fa(t)) throw Error(A(200));
  return bm(e, t, null, r);
};
Ce.createRoot = function (e, t) {
  if (!Fa(e)) throw Error(A(299));
  var r = !1,
    n = '',
    o = E0;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (r = !0),
      t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = wa(e, 1, !1, null, null, r, !1, n, o)),
    (e[tt] = t.current),
    an(e.nodeType === 8 ? e.parentNode : e),
    new Da(t)
  );
};
Ce.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(A(188))
      : ((e = Object.keys(e).join(',')), Error(A(268, e)));
  return (e = Gu(t)), (e = e === null ? null : e.stateNode), e;
};
Ce.flushSync = function (e) {
  return Ht(e);
};
Ce.hydrate = function (e, t, r) {
  if (!Go(t)) throw Error(A(200));
  return Yo(null, e, t, !0, r);
};
Ce.hydrateRoot = function (e, t, r) {
  if (!Fa(e)) throw Error(A(405));
  var n = (r != null && r.hydratedSources) || null,
    o = !1,
    l = '',
    i = E0;
  if (
    (r != null &&
      (r.unstable_strictMode === !0 && (o = !0),
      r.identifierPrefix !== void 0 && (l = r.identifierPrefix),
      r.onRecoverableError !== void 0 && (i = r.onRecoverableError)),
    (t = F0(t, null, e, 1, r ?? null, o, !1, l, i)),
    (e[tt] = t.current),
    an(e),
    n)
  )
    for (e = 0; e < n.length; e++)
      (r = n[e]),
        (o = r._getVersion),
        (o = o(r._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [r, o])
          : t.mutableSourceEagerHydrationData.push(r, o);
  return new Vo(t);
};
Ce.render = function (e, t, r) {
  if (!Go(t)) throw Error(A(200));
  return Yo(null, e, t, !1, r);
};
Ce.unmountComponentAtNode = function (e) {
  if (!Go(e)) throw Error(A(40));
  return e._reactRootContainer
    ? (Ht(function () {
        Yo(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[tt] = null);
        });
      }),
      !0)
    : !1;
};
Ce.unstable_batchedUpdates = ya;
Ce.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
  if (!Go(r)) throw Error(A(200));
  if (e == null || e._reactInternals === void 0) throw Error(A(38));
  return Yo(e, t, r, !1, n);
};
Ce.version = '18.3.1-next-f1338f8080-20240426';
function C0() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(C0);
    } catch (e) {
      console.error(e);
    }
}
C0(), (Cu.exports = Ce);
var wm = Cu.exports,
  js = wm;
(Pl.createRoot = js.createRoot), (Pl.hydrateRoot = js.hydrateRoot);
const Sm = ({
    label: e,
    placeholder: t,
    value: r,
    onChange: n,
    rows: o,
    required: l,
  }) =>
    c.jsxs('div', {
      class: '',
      children: [
        c.jsx('label', {
          for: 'message',
          class: 'block mb-1 font-medium text-gray-700 ',
          children: e,
        }),
        c.jsx('textarea', {
          required: l,
          rows: o,
          id: 'message',
          class:
            'block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 ',
          placeholder: t,
          value: r,
          onChange: n,
        }),
      ],
    }),
  Io = ({
    setError: e = () => {},
    message: t = 'couldn’t be uploaded more than 5 files',
  }) =>
    c.jsxs(c.Fragment, {
      children: [
        c.jsxs('div', {
          className:
            'flex justify-between items-center border rounded-lg p-1 px-3 bg-yellow-400',
          children: [
            ' ',
            c.jsxs('div', {
              className: 'flex items-center gap-2',
              children: [
                ' ',
                c.jsx('div', {
                  className: 'w-[16px]',
                  children: c.jsx('img', {
                    width: '100%',
                    src: 'https://cdn.shopify.com/extensions/c0e94e61-dbf1-4a69-a5a3-a24c5c3fc3e7/0.0.0/assets/warning-C97LYCia.png',
                    alt: 'warning',
                  }),
                }),
                ' ',
                c.jsxs('p', { className: 'font-bold', children: [' ', t] }),
              ],
            }),
            c.jsx('div', {
              children: c.jsx('p', {
                className: 'w-[12px] mt-1 cursor-pointer ',
                onClick: () => e(!1),
                children: c.jsx('img', {
                  width: '100%',
                  src: 'https://cdn.shopify.com/extensions/c0e94e61-dbf1-4a69-a5a3-a24c5c3fc3e7/0.0.0/assets/close-DvLCsTrv.png?v=1728810461?v=1728810461',
                  alt: 'close',
                }),
              }),
            }),
          ],
        }),
        ' ',
      ],
    }),
  Dm = ({ label: e = 'label', color: t = '#gray', onClick: r = () => {} }) =>
    c.jsx('button', {
      style: { backgroundColor: t, borderColor: t },
      className: 'submit',
      onClick: r,
      children: e,
    }),
  _s = ({
    label: e = '',
    options: t = [],
    value: r = '',
    onChange: n = () => {},
    required: o = !1,
  }) =>
    c.jsxs(c.Fragment, {
      children: [
        c.jsxs('label', {
          for: 'countries',
          class: 'block mb-1 font-medium text-gray-700',
          children: [
            e,
            ' ',
            o && c.jsx('span', { className: 'text-red-700', children: '*' }),
          ],
        }),
        c.jsx('select', {
          required: o,
          onChange: n,
          value: r,
          id: 'countries',
          class:
            'bg-gray-50 border border-gray-400 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1',
          children: t.map((l, i) =>
            c.jsx('option', { value: l.value, children: l.label }, i)
          ),
        }),
      ],
    }),
  ki = ({ children: e }) =>
    c.jsx('div', {
      className: 'p-4 border shadow-sm rounded-xl bg-white',
      children: e,
    }),
  Fm = ({ label: e = '', actionTitle: t, actionHint: r, onChange: n }) =>
    c.jsxs(c.Fragment, {
      children: [
        c.jsx('p', { className: 'mb-1 text-gray-700', children: 'Attachment' }),
        c.jsx('div', {
          class: 'flex items-center justify-center w-full',
          children: c.jsxs('label', {
            for: 'dropzone-file',
            class:
              'flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50',
            children: [
              c.jsxs('div', {
                class: 'flex flex-col items-center justify-center pt-5 pb-6',
                children: [
                  c.jsx('svg', {
                    class: 'w-8 h-8 mb-4 text-gray-500 ',
                    'aria-hidden': 'true',
                    xmlns: 'http://www.w3.org/2000/svg',
                    fill: 'none',
                    viewBox: '0 0 20 16',
                    children: c.jsx('path', {
                      stroke: 'currentColor',
                      'stroke-linecap': 'round',
                      'stroke-linejoin': 'round',
                      'stroke-width': '2',
                      d: 'M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2',
                    }),
                  }),
                  c.jsxs('p', {
                    class: 'mb-2  text-gray-500 ',
                    children: [
                      c.jsx('span', {
                        class: 'font-semibold',
                        children: 'Click to upload',
                      }),
                      ' or drag and drop',
                    ],
                  }),
                  c.jsx('p', {
                    className: 'border rounded-lg px-2 py-1 shadow-md mb-2 ',
                    children: t,
                  }),
                  c.jsx('p', { class: ' text-gray-500 ', children: r }),
                ],
              }),
              c.jsx('input', {
                id: 'dropzone-file',
                type: 'file',
                class: 'hidden',
                onChange: n,
              }),
            ],
          }),
        }),
      ],
    }),
  Em = ({ selectedData: e, setStep: t }) => {
    const [r, n] = I.useState([]),
      [o, l] = I.useState(''),
      [i, a] = I.useState(''),
      [s, u] = I.useState(!1),
      [m, p] = I.useState(''),
      [h, y] = I.useState(''),
      [x, w] = I.useState(!1),
      [P, f] = I.useState(0),
      d = 2e7,
      g = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
      v = window.location.hostname,
      S = (D) => {
        n((T) => T.filter(($) => $.name !== D));
      };
    I.useEffect(() => {
      const D = r.reduce((T, $) => $.size + T, 0);
      f(D);
    }, [r]);
    const C = async () => {
        if (!s)
          if (r.length > 0) {
            u(!0), a(''), console.log('uploading file...');
            const D = new FormData();
            if (
              (D.append('comment', o),
              D.append('selectedIssue', m),
              D.append('selectedRequest', h),
              D.append('selectedData', JSON.stringify(e)),
              m.length === 0 || !m)
            ) {
              a('Please select an issue'), u(!1);
              return;
            }
            if (h.length === 0 || !h) {
              a('Please select an Request'), u(!1);
              return;
            }
            if (!o) {
              a('Please Write What happened with your package.'), u(!1);
              return;
            }
            for (let T of r) D.append('files', T);
            try {
              await fetch(
                `https://${v}/apps/Shipping-Protection/get-order-fulfilment-data?url=${v}`,
                { method: 'POST', body: D }
              ),
                t((T) => T + 1);
            } catch (T) {
              u(!1), console.error(T);
            } finally {
              u(!1);
            }
          } else u(!1), a('Please select a file to upload');
      },
      k = (D) => {
        D || a('');
      };
    let N = null;
    i &&
      (N = c.jsx('div', {
        style: { marginTop: '10px' },
        children: c.jsx(Io, { setError: k, message: i }),
      })),
      console.log(m);
    const O = (D) => {
      console.log(D.target.files);
      const T = D.target.files;
      if (T.length + r.length > 5 || P > d) {
        w(!0);
        return;
      } else
        g.includes(T[0].type)
          ? (w(!1), n(($) => [...$, ...T]))
          : alert('Please select a valid image or pdf type');
    };
    return c.jsxs(ki, {
      children: [
        c.jsx(_s, {
          required: !0,
          label: 'Issue',
          options: [
            { value: '', label: 'Select' },
            { value: 'DAMAGED', label: 'Damaged' },
            { value: 'STOLLEN', label: 'Stollen' },
            { value: 'LOST', label: 'Lost' },
          ],
          value: m,
          onChange: (D) => p(D.target.value),
        }),
        c.jsx('br', {}),
        c.jsx(_s, {
          label: 'Requested Regulation',
          required: !0,
          options: [
            { value: '', label: 'Select' },
            { value: 'RESHIP', label: 'Reship' },
            { value: 'REFUND', label: 'Refund' },
          ],
          value: h,
          onChange: (D) => y(D.target.value),
        }),
        c.jsx('br', {}),
        c.jsx(Sm, {
          label: 'Tell us what happened',
          placeholder:
            'Please describe what happened with this package below. You can include image/video links if necessary.',
          value: o,
          onChange: (D) => l(D.target.value),
          rows: 4,
          required: !0,
          autoComplete: 'off',
        }),
        c.jsx('br', {}),
        c.jsx(Fm, {
          actionHint: 'Accepts .jpg, .png and .pdf',
          actionTitle: 'Add Files Maximum file limit 5 files & size 20MB',
          onChange: O,
        }),
        x &&
          c.jsx('div', {
            style: { marginTop: '10px' },
            children: c.jsx(Io, { setError: w }),
          }),
        N,
        c.jsx('br', {}),
        c.jsx('div', {
          className: 'w-full relative',
          children: c.jsx('div', {
            class: 'flex flex-wrap  gap-4',
            children: r.map((D, T) =>
              c.jsxs(
                'div',
                {
                  className:
                    'flex justify-between items-center gap-3 border px-3 py-1 rounded-md bg-gray-200',
                  children: [
                    c.jsxs('div', {
                      className: 'flex items-center justify-center gap-3',
                      children: [
                        c.jsx('div', {
                          className: 'w-[35px]',
                          children: c.jsx('img', {
                            width: '100%',
                            src: g.includes(D.type)
                              ? window.URL.createObjectURL(D)
                              : 'https://cdn.shopify.com/extensions/c0e94e61-dbf1-4a69-a5a3-a24c5c3fc3e7/0.0.0/assets/image-gallery-ibzsj_mu.png?v=1728810295?v=1728810295',
                            alt: D.name,
                          }),
                        }),
                        c.jsxs('div', {
                          children: [
                            c.jsx('p', {
                              style: {
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              },
                              children: D.name,
                            }),
                            c.jsxs('span', {
                              children: [' ', D.size, ' bytes'],
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsx('div', {
                      className:
                        'text-[15px] text-gray-400 border px-0.5 cursor-pointer rounded-full hover:bg-gray-300',
                      onClick: () => S(D.name),
                      children: 'x',
                    }),
                  ],
                },
                T
              )
            ),
          }),
        }),
        c.jsx('br', {}),
        c.jsxs('div', {
          children: [
            c.jsx('button', {
              type: 'button',
              className: 'cancel',
              onClick: () => t((D) => D - 1),
              style: { marginRight: '10px' },
              children: 'Back',
            }),
            c.jsx(Dm, {
              label: s
                ? c.jsx('div', { className: 'loader-element' })
                : 'Submit Claim Request',
              onClick: C,
            }),
          ],
        }),
      ],
    });
  },
  Cm = ({ setStep: e, setData: t }) => {
    const [r, n] = I.useState(!1),
      [o, l] = I.useState(''),
      [i, a] = I.useState(''),
      [s, u] = I.useState(''),
      m = window.location.hostname,
      p = (h) => {
        h.preventDefault(),
          n(!0),
          fetch(
            `https://${m}/apps/Shipping-Protection/get-order-fulfilment-data?email=${o}&orderId=${i.replace(
              '#',
              ''
            )}&url=${m}`
          )
            .then((y) => y.json())
            .then((y) => {
              y.status === 404 ? (u(y.error), e(0)) : (u(''), e(1), t(y.data)),
                n(!1);
            })
            .catch((y) => {
              u('something went wrong!'), n(!1), e(0);
            });
      };
    return (
      I.useEffect(() => {
        u('');
      }, [o, i]),
      c.jsx(c.Fragment, {
        children: c.jsxs('div', {
          className: 'container',
          children: [
            c.jsxs('div', {
              style: { padding: '20px 0px' },
              children: [
                c.jsx('h4', {
                  className: 'heading',
                  children: 'Claims Resolution',
                }),
                c.jsx('p', {
                  children:
                    "We're sorry to hear that you're having an issue with your order. File your claim here in less than a minute.",
                }),
              ],
            }),
            c.jsx('br', {}),
            c.jsxs('form', {
              className: 'form',
              onSubmit: p,
              children: [
                c.jsxs('div', {
                  className: 'form-group',
                  children: [
                    c.jsx('label', {
                      htmlFor: 'emailPhone',
                      children: 'Enter your Email ID/Phone Number',
                    }),
                    c.jsx('input', {
                      type: 'text',
                      id: 'emailPhone',
                      placeholder: 'Enter your Email Id',
                      onChange: (h) => l(h.target.value),
                    }),
                  ],
                }),
                c.jsxs('div', {
                  className: 'form-group',
                  children: [
                    c.jsx('label', {
                      htmlFor: 'orderNumber',
                      children: 'Order Number',
                    }),
                    c.jsx('input', {
                      type: 'text',
                      required: !0,
                      id: 'orderNumber',
                      placeholder: '#Order Number',
                      onChange: (h) => a(h.target.value),
                    }),
                  ],
                }),
                s &&
                  c.jsxs(c.Fragment, {
                    children: [
                      c.jsx(Io, { setError: u, message: s }),
                      ' ',
                      c.jsx('br', {}),
                    ],
                  }),
                c.jsx('div', {
                  className: 'form-actions',
                  children: c.jsx('button', {
                    type: 'submit',
                    className: 'submit',
                    disabled: r,
                    children: r
                      ? c.jsx('div', { className: 'loader-element' })
                      : 'Next',
                  }),
                }),
              ],
            }),
          ],
        }),
      })
    );
  },
  km =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA0wSURBVHic7d1NzGZnQQbgezoDFsKI0k74S/pNQawJYExAXVgFGkKboAF/Fph0YUzYKMFAdKsuWJBAdAPu2BBJIA0bLSmlKQytG2EDqVQsHSntpj/S1mlJLZ0yLt756MdA+Trt+5zznnNfV3K2z3nOs7nv85zznjcBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfsKRuScAE9lLck2Styb5tSSvTXI8yYuTnEnyaJK7k3wryW1J/j3JE7PMFAB4QS5P8uEk30xy7iKPM0k+nU1pAAAW4PIkH0/yWC4++H/W8fUk7570CgCAi/JnSR7KdoL/wuPGJFdMdiUAwKGOJ/lcxgT/weP7Sd4z0TUBAD/Hq5PckfHhv3/8KJt3CwCAmexl8/b+VOF/8Pj78ZcHAFxoL8l3M0/47x9/MfwqAYAfuyLJ6cwb/ueSPJXk6sHXCgBkN+78Dx73Jnn50CsGgHK7cud/4fGPIy8aAJrt2p3/hY8Crhp36QDQaVfv/A8enxp29QBQaJfv/A8eTyY5MWgNAKDKEu78Dx5/OWYZAKDHUu78Dx63DlkJACixtDv//eOJJJcOWA8AWL0l3vkfPH57+0sCsF2XzD0BuMAVSb6c5OTM83ghfnXuCQAc5tjcE4AD9pKcyrLDP0munHsCAIexA8CuWMOd/77jc08A4DB2ANgFa7nz3/eSuScAcBg7AMxtTXf++x6fewIAh7EDwJzWdue/73/nngDAYewAMJc13vnvOz33BABgFy39d/6HHb++vaUCgHVY6hf+nuvxSJKjW1stgEG8A8CU1vrM/6CvJHl67kkAwK5Y+53//vG+bS0YACzdXtb9zH//eDS+AQAshF8BMNqa3/a/0D9l82+AAFCt5c7/XJIzSU5sZ9kAYLlanvnvHx/ezrIBwHI13fmfS/L1+EUNAOXa7vwfTvK6rawcACxU253//yV551ZWDgAWqi38zyb5462sHAAsVNu2/9kk129l5QBgoYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDQBnhDwBlhD8AlBH+AFBG+ANAGeEPAGWEPwCUEf4AUEb4A0AZ4Q8AZYQ/AJQR/gBQRvgDwESOzD2B8/aSnEpyct5pTOqG8wcA6/JIkseTfCfJ92eey7PahQLQGP4AdHgoye1Jbk3y+SQPzDudZ8xdAIQ/AC3OJvliko8luW3mucxaAIQ/AK2+kuSDSf5jrgkcnem8wh+AZlcmeX+SY9k8Ijg39QTm2AEQ/gDwjFNJ/iQTvzA4dQEQ/gDw076d5Nok9051wikLwIlstjmumvCcALAUp5NcneT+KU52yRQnSfKSJDdF+APAs3l9kn9NcukUJ5vqJcBPJPmDic4FAEv1miSXJfnC6BNN8Qjg3UlunOA8ALAW1yW5eeQJRheAS7P5jePrB58HANbkO0nenOTJUScY/Q7A+yP8AeBivSHJn488wcgdgGPZNJiTA88BAGt1TzZF4OyIwUfuAFwX4Q8Az9fJJO8cNfjIAvC+gWMDQIPrRw086hHAkWz+AvGyQeMDQIOHkrwyA/4rYNQOwJsi/AHghTqRTaZu3agC8BuDxgWANm8eMeioAvArg8YFgDZDPqM/qgC8ctC4ANDmxIhBRxWAlw0aFwDaHB8x6FT/BggA7JBRBeDxQeMCQJvHRgw6qgDcP2hcAGjz4IhBRxWAuweNCwBt/mvEoKMKwDcGjQsAbe4YMejITwE/mOTyQeMDQIMHk7wqC/oU8LkkNw0aGwBafCkDwj8Z+zPAzw4cGwAa/POogUc9AkiSY0nuSnLlwHMAwFrdk82n9Z8eMfjIHYCzSf5h4PgAsGYfzaDwT8buACTJL2Tz9uIbBp8HANbkrmz+BfCHo04w+lPATyb5q8HnAIC1+UAGhn+SHB05+Hl3Z/PvgL85wbkAYOk+meQTo08y+hHAvkuT3J7krROdDwCW6GtJfi+bHfShpioAyeajQP+W5KoJzwkAS3E6ye8keWCKk035d8D/k+TabH7WAAA8484k78hE4Z9MWwCS5HtJ3h4lAAD23Zrkd5PcN+VJpy4AiRIAAEnyVJK/y2Z3/OGpTz7lOwAX2ktyKsnJGecAAHO4JZufyf/nXBOYYwdgn50AAJo8leRfklyd5F2ZMfyTeXcA9tkJAGCt7s/mF3C3Jvl8kofmnc4zdqEAJJ0l4IbzBwDrcS7Jo+eP00kemXc6y3BFNot1ruQ4m+T6rawcACycEgAApZQAACilBABAKSUAAEopAQBQSgkAgFJKAACUUgIAoJQSAACllAAAKKUEAEApJQAASikBAFBKCQCAUkoAAJRSAgCglBIAAKWUAAAopQQAQCklAABKKQEAUEoJAIBSSgAAlFICAKCUEgAApZQAACilBABAKSUAAEopAQBQSgkAgFJKAACUUgIAoJQSAACllAAAKKUEAEApJQAASikBAFBKCQCAUkoAAJRSAgCglBIAAKWUAAAopQQAQCklAABKKQEAUEoJAIBSSgAAlFICAKCUEgAApZQAACilBABAKSUAAEopAQBQSgkAgFJKAACUUgIAoJQSAACllAAAKKUEAEApJQAASikBAFBKCQCAUkoAAJRSAgCglBIAAKWUAAAopQQAQCklAABKKQEAUEoJAIBSSgAAlFICAKCUEgAApZQAACilBABAKSUAAEopAQBQSgkAgFJKAACUUgIAoJQSAACllAAAKKUEAEApJQAASikBAFBKCQCAUkoAAJRSAgCglBIAAKWUAAAopQQAQCklAABKKQEAUEoJAIBSSgAAlFICAKCUEgAApZQAACilBABAKSUAAEopAQBQSgkAgFJKAACUUgIAoJQSAACllAAAKKUEAEApJQAASikBAFBKCQCAUkoAAJTaS/LdzB/OU5aA92xl5QBg4dpKwA+S/NZWVg4AFq7tccB9SV6xlZUDgIVr2wn4zHaWDQCWr20n4G3bWTYAWL6mnYCvbWnNAGAVmnYC3r6dJQOAdWjZCbhhWwsGAGvRsBPwRJJf3NaCAcBaNOwEvHdrqwUw0CVzT4Aq38vmbfn/nnsiA1099wQAYFeteSfgq1tcJwBYnbW+E3DfNhcJANZojTsBTyc5ss1FAoA1WuNOwEu3ukIAsFJr2wk4vt3lAYD1WstOgEcAAHCR1rAT8MDWVwVgAN8BYJes4TsBd809AYDnQgFg19yb5Jok98w8j+frjrknAPBcKADsoiXvBJyaewIAsHRLeyfgh0kuH7ISAFBmSb8OuHHQGgBApaXsBPzhqAUAgFa7vhPw7XinBgCG2OWdgD8aeN0AUG8XS8DNQ68YAEiyW48DHs6mlAAAE9iFnYCzSX5/9IUCAD9p7p2AD46/RADgZ9nL5g38KYP/R0k+NMXFAQDP7rIkt2ea8P9Bkj+d5rIAgMMcS/KRbJ7Ljwr/O5K8caoLAgCeu7ckuS3bDf4zSf4myYsmvA4A4Hm4Lskt2Tyvf77Bf3+Sv03yionnDgC8QHtJ/jqbj/WcyeGhf2eSTya5NsnRGeYLMIkjc08AJnQ0m0LwuiS/nOSXkjyZTTG4L8ldSR6bbXYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwHz+H+0STwE1URm+AAAAAElFTkSuQmCC',
  Nm = ({ data: e }) => {
    const t = [e];
    function r(l) {
      return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date(l));
    }
    const n = c.jsx('div', {
        class: 'overflow-x-auto large-device',
        children: c.jsxs('table', {
          class: 'min-w-full bg-white border',
          children: [
            c.jsx('thead', {
              children: c.jsxs('tr', {
                class: 'w-full bg-gray-100',
                children: [
                  c.jsx('th', {
                    class: 'py-2 px-4 border-b text-left text-gray-600',
                    children: 'Order Placed At',
                  }),
                  c.jsx('th', {
                    class: 'py-2 px-4 border-b text-left text-gray-600',
                    children: 'Order Status',
                  }),
                  c.jsx('th', {
                    class: 'py-2 px-4 border-b text-left text-gray-600',
                    children: 'Name',
                  }),
                  c.jsx('th', {
                    class: 'py-2 px-4 border-b text-left text-gray-600',
                    children: 'Email',
                  }),
                ],
              }),
            }),
            c.jsx('tbody', {
              children: t.map(
                (
                  {
                    id: l,
                    createdAt: i,
                    displayStatus: a,
                    customerName: s,
                    email: u,
                  },
                  m
                ) =>
                  c.jsxs(
                    'tr',
                    {
                      class: 'border-b',
                      children: [
                        c.jsx('td', {
                          class: 'py-2 px-4',
                          children: c.jsx('span', {
                            class:
                              'inline-flex items-center justify-center bg-blue-200 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                            children: r(i),
                          }),
                        }),
                        c.jsx('td', {
                          class: 'py-2 px-4',
                          children:
                            a === 'FULFILLED'
                              ? c.jsxs('span', {
                                  class:
                                    'inline-flex items-center bg-green-200 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                                  children: [
                                    c.jsx('span', {
                                      class:
                                        'h-2 w-2 bg-green-500 rounded-full mr-2',
                                    }),
                                    'Fulfilled',
                                  ],
                                })
                              : a === 'Partially fulfilled'
                              ? c.jsxs('span', {
                                  class:
                                    'inline-flex items-center bg-orange-200 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                                  children: [
                                    c.jsx('span', {
                                      class:
                                        'h-2 w-2 bg-orange-400 rounded-full mr-2',
                                    }),
                                    'Fulfilled',
                                  ],
                                })
                              : c.jsxs('span', {
                                  class:
                                    'inline-flex items-center bg-red-300 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                                  children: [
                                    c.jsx('span', {
                                      class:
                                        'h-2 w-2 bg-red-500 rounded-full mr-2',
                                    }),
                                    'Fulfilled',
                                  ],
                                }),
                        }),
                        c.jsx('td', { class: 'py-2 px-4', children: s }),
                        c.jsx('td', { class: 'py-2 px-4', children: u }),
                      ],
                    },
                    m
                  )
              ),
            }),
          ],
        }),
      }),
      o = c.jsx('div', {
        class: ' space-y-4 small-device',
        children: t.map(
          (
            {
              id: l,
              createdAt: i,
              displayStatus: a,
              customerName: s,
              email: u,
            },
            m
          ) =>
            c.jsxs('div', {
              class: 'bg-white border p-4 rounded-lg',
              children: [
                c.jsxs('div', {
                  class: 'flex items-center justify-between',
                  children: [
                    c.jsx('span', {
                      class: 'text-lg font-semibold text-gray-600',
                      children: 'Order Placed At :',
                    }),
                    c.jsx('span', {
                      class:
                        'inline-flex items-center justify-center bg-blue-200 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                      children: r(i),
                    }),
                  ],
                }),
                c.jsxs('div', {
                  class: 'flex items-center justify-between mt-2',
                  children: [
                    c.jsx('span', {
                      class: 'text-lg font-semibold text-gray-600',
                      children: 'Order Status :',
                    }),
                    a === 'FULFILLED'
                      ? c.jsxs('span', {
                          class:
                            'inline-flex items-center bg-green-200 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                          children: [
                            c.jsx('span', {
                              class: 'h-2 w-2 bg-green-500 rounded-full mr-2',
                            }),
                            'Fulfilled',
                          ],
                        })
                      : a === 'Partially fulfilled'
                      ? c.jsxs('span', {
                          class:
                            'inline-flex items-center bg-orange-200 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                          children: [
                            c.jsx('span', {
                              class: 'h-2 w-2 bg-orange-400 rounded-full mr-2',
                            }),
                            'Fulfilled',
                          ],
                        })
                      : c.jsxs('span', {
                          class:
                            'inline-flex items-center bg-red-300 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                          children: [
                            c.jsx('span', {
                              class: 'h-2 w-2 bg-red-500 rounded-full mr-2',
                            }),
                            'Fulfilled',
                          ],
                        }),
                  ],
                }),
                c.jsxs('div', {
                  class: 'flex items-center justify-between mt-2',
                  children: [
                    c.jsx('span', {
                      class: 'text-lg font-semibold text-gray-600',
                      children: 'Name :',
                    }),
                    c.jsx('span', { children: s }),
                  ],
                }),
                c.jsxs('div', {
                  class: 'flex items-center justify-between mt-2',
                  children: [
                    c.jsx('span', {
                      class: 'text-lg font-semibold text-gray-600',
                      children: 'Email :',
                    }),
                    c.jsx('span', { children: u }),
                  ],
                }),
              ],
            })
        ),
      });
    return c.jsxs('div', {
      style: { fontSize: '', marginTop: '15px' },
      children: [n, o],
    });
  },
  Im = ({ tone: e = 'init', logo: t = null, children: r }) => {
    let n = null;
    return (
      t &&
        (n = c.jsx('img', {
          src: t,
          alt: '',
          width: '15px',
          className: 'me-1',
        })),
      c.jsx(c.Fragment, {
        children:
          e === 'success'
            ? c.jsxs('span', {
                class:
                  'inline-flex items-center bg-green-300 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-green-500 rounded-full mr-2',
                  }),
                  r,
                ],
              })
            : e === 'info'
            ? c.jsxs('span', {
                class:
                  'inline-flex items-center bg-blue-300 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-blue-500 rounded-full mr-2',
                  }),
                  r,
                ],
              })
            : e === 'warning'
            ? c.jsxs('span', {
                class:
                  'inline-flex items-center bg-orange-300 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-orange-500 rounded-full mr-2',
                  }),
                  r,
                ],
              })
            : e === 'error'
            ? c.jsxs('span', {
                class:
                  'inline-flex items-center bg-red-300 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-red-500 rounded-full mr-2',
                  }),
                  r,
                ],
              })
            : c.jsxs('span', {
                class:
                  'inline-flex items-center bg-gray-300 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-gray-500 rounded-full mr-2',
                  }),
                  r,
                ],
              }),
      })
    );
  },
  k0 = j.createContext(null),
  Tm = j.createContext(null);
class Bm {
  get loading() {
    return this.translationPromises.size > 0;
  }
  constructor(t, r = {}) {
    (this.translationGetters = new Map()),
      (this.fallbacks = new Map()),
      (this.translations = new Map()),
      (this.asyncTranslationIds = new Set()),
      (this.subscriptions = new Map()),
      (this.translationPromises = new Map()),
      (this.idsToUpdate = new Set()),
      (this.details = t);
    for (const [n, o] of Object.entries(r))
      this.translations.set(n, o), this.asyncTranslationIds.add(n);
  }
  async resolve() {
    await Promise.all([...this.translationPromises.values()]);
  }
  extract() {
    return [...this.asyncTranslationIds].reduce(
      (t, r) => ({ ...t, [r]: this.translations.get(r) }),
      {}
    );
  }
  register({ id: t, translations: r, fallback: n }) {
    if (
      (this.fallbacks.has(t) || this.fallbacks.set(t, n),
      this.details.fallbackLocale != null && n != null)
    ) {
      const l = Cl(t, this.details.fallbackLocale);
      this.translations.has(l) || this.translations.set(l, n);
    }
    if (this.translationGetters.has(t)) return;
    const o = r ? Pm(r) : zm;
    this.setTranslations(t, o);
  }
  state(t) {
    const { locale: r, fallbackLocale: n } = this.details,
      o = Os(r),
      l = n != null && o.includes(n);
    let i = !1,
      a = !1;
    const s = t.reduce((u, m) => {
      const p = [];
      for (const h of o) {
        const y = Cl(m, h),
          x = this.translations.get(y);
        x == null ? this.translationPromises.has(y) && (a = !0) : p.push(x);
      }
      if ((p.length === 0 && a && (i = !0), !l)) {
        const h = this.fallbacks.get(m);
        h != null && p.push(h);
      }
      return [...u, ...p];
    }, []);
    return { loading: i, translations: s };
  }
  subscribe(t, r) {
    return (
      this.subscriptions.set(r, t),
      () => {
        this.subscriptions.delete(r);
      }
    );
  }
  update(t) {
    this.details = t;
    for (const [r, n] of this.translationGetters) this.setTranslations(r, n);
    for (const [r, n] of this.subscriptions) r(this.state(n), this.details);
  }
  setTranslations(t, r) {
    this.translationGetters.set(t, r);
    for (const n of Os(this.details.locale)) {
      const o = Cl(t, n);
      if (this.translations.has(o)) continue;
      const l = r(n);
      if (Mm(l)) {
        const i = l
          .then((a) => {
            this.translationPromises.delete(o),
              this.translations.set(o, a),
              this.asyncTranslationIds.add(o),
              a != null && this.updateSubscribersForId(t);
          })
          .catch(() => {
            this.translationPromises.delete(o),
              this.translations.set(o, void 0),
              this.asyncTranslationIds.add(o);
          });
        this.translationPromises.set(o, i);
      } else this.translations.set(o, l);
    }
  }
  updateSubscribersForId(t) {
    if ((this.idsToUpdate.add(t), this.enqueuedUpdate != null)) return;
    const n = typeof window < 'u' ? window.requestAnimationFrame : setImmediate;
    this.enqueuedUpdate = n(() => {
      delete this.enqueuedUpdate;
      const o = [...this.idsToUpdate];
      this.idsToUpdate.clear();
      for (const [l, i] of this.subscriptions)
        i.some((a) => o.includes(a)) && l(this.state(i), this.details);
    });
  }
}
function Os(e) {
  const t = e.split('-');
  return t.length > 1 ? [`${t[0]}-${t[1].toUpperCase()}`, t[0]] : [e];
}
function Mm(e) {
  return e != null && e.then != null;
}
function Cl(e, t) {
  return `${e}__${t}`;
}
function zm() {}
function Pm(e) {
  return typeof e == 'function' ? e : (t) => e[t];
}
const Lm = 50;
function Ge(e, t) {
  const r = new WeakMap(),
    n = new Map(),
    o = [];
  return function (...i) {
    if (typeof window > 'u') return e.apply(this, i);
    const a = i.length === 1 && typeof i[0] == 'object' && !t;
    let s;
    a ? (s = i[0]) : t && t instanceof Function ? (s = t(...i)) : (s = i[0]);
    const u = a ? r : n;
    if (u.has(s)) return u.get(s);
    const m = e.apply(this, i);
    if (a) r.set(s, m);
    else if ((n.set(s, m), o.push(s), n.size > Lm)) {
      const p = o[0];
      n.delete(p), o.shift();
    }
    return m;
  };
}
function Jo(e) {
  return e.replace('‎', '');
}
const kl = new Map();
function Us(e, t) {
  const r = Rm(e, t);
  if (kl.has(r)) return kl.get(r);
  const n = new Intl.DateTimeFormat(e, t);
  return kl.set(r, n), n;
}
const Hs = Intl.DateTimeFormat('en', { hour: 'numeric' }),
  Qs = typeof Hs.resolvedOptions > 'u' ? void 0 : Hs.resolvedOptions();
function it(e, t, r = {}) {
  if (
    (Qs != null &&
      r.hour12 === !1 &&
      Qs.hourCycle != null &&
      ((r.hour12 = void 0), (r.hourCycle = 'h23')),
    r.timeZone != null && r.timeZone === 'Etc/GMT+12')
  ) {
    const o = new Date(e.valueOf() - 432e5);
    return Us(t, { ...r, timeZone: 'UTC' }).format(o);
  }
  return Us(t, r).format(e);
}
function Rm(e, t = {}) {
  return `${Array.isArray(e) ? e.sort().join('-') : e}-${JSON.stringify(t)}`;
}
const Nl = /(\d{2})/;
function xr(e, t) {
  return {
    year: () => ne.getYear(e, t),
    month: () => ne.getMonth(e, t),
    day: () => ne.getDay(e, t),
    weekday: () => ne.getWeekday(e, t),
    hour: () => ne.getHour(e, t),
    minute: () => ne.getMinute(e, t),
    second: () => ne.getSecond(e, t),
  };
}
function kt(e) {
  return (t, r) => `${e}-${t.toString()}-${r}`;
}
var $s;
(function (e) {
  (e.Monday = 'Monday'),
    (e.Tuesday = 'Tuesday'),
    (e.Wednesday = 'Wednesday'),
    (e.Thursday = 'Thursday'),
    (e.Friday = 'Friday'),
    (e.Saturday = 'Saturday'),
    (e.Sunday = 'Sunday');
})($s || ($s = {}));
const N0 = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};
function jm(e) {
  return Object.keys(N0).some((t) => t === e);
}
function _m(e) {
  throw new Error(e);
}
function Om(e) {
  return jm(e) ? N0[e] : _m(`Unexpected weekday: ${e}`);
}
class ne {}
ne.getYear = Ge((e, t) => {
  if (isNaN(e.valueOf()))
    throw new Error(`Unable to parse date: ${e} for timezone: ${t}`);
  const r = it(e, 'en', { timeZone: t, year: 'numeric' }),
    n = Jo(r),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse year: '${r}'`);
  return o;
}, kt('year'));
ne.getMonth = Ge((e, t) => {
  const r = it(e, 'en', { timeZone: t, month: 'numeric' }),
    n = Jo(r),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse month: '${r}'`);
  return o;
}, kt('month'));
ne.getDay = Ge((e, t) => {
  const r = it(e, 'en', { timeZone: t, day: 'numeric' }),
    n = Jo(r),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse day: '${r}'`);
  return o;
}, kt('day'));
ne.getWeekday = Ge((e, t) => {
  const r = it(e, 'en', { timeZone: t, weekday: 'long' }),
    n = Jo(r);
  return Om(n);
}, kt('weekday'));
ne.getHour = Ge((e, t) => {
  const r = it(e, 'en', { timeZone: t, hour12: !1, hour: 'numeric' });
  let n = parseInt(r, 10);
  return isNaN(n) && (n = ne.getTimePartsFallback(e, t).hour), n;
}, kt('hour'));
ne.getMinute = Ge((e, t) => {
  const r = it(e, 'en', { timeZone: t, minute: 'numeric' });
  let n = parseInt(r, 10);
  return isNaN(n) && (n = ne.getTimePartsFallback(e, t).minute), n;
}, kt('minute'));
ne.getSecond = Ge((e, t) => {
  const r = it(e, 'en', { timeZone: t, second: 'numeric' });
  let n = parseInt(r, 10);
  return isNaN(n) && (n = ne.getTimePartsFallback(e, t).second), n;
}, kt('second'));
ne.getTimePartsFallback = Ge((e, t) => {
  const r = it(e, 'en', {
      timeZone: t,
      hour12: !1,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    [n, o, l] = r.split(':'),
    i = new RegExp(Nl).exec(n),
    a = new RegExp(Nl).exec(o),
    s = new RegExp(Nl).exec(l);
  if (i != null && a != null && s != null) {
    const u = parseInt(i[1], 10),
      m = parseInt(a[1], 10),
      p = parseInt(s[1], 10);
    return { hour: u, minute: m, second: p };
  }
  throw new Error(`Unable to parse timeString: '${r}'`);
}, kt('timePartsFallback'));
let ot;
(function (e) {
  (e[(e.Second = 1e3)] = 'Second'),
    (e[(e.Minute = 6e4)] = 'Minute'),
    (e[(e.Hour = 36e5)] = 'Hour'),
    (e[(e.Day = 864e5)] = 'Day'),
    (e[(e.Week = 6048e5)] = 'Week'),
    (e[(e.Year = 31536e6)] = 'Year');
})(ot || (ot = {}));
function Kt(e, t = new Date()) {
  return t < e;
}
function Um(e, t = new Date()) {
  return !Kt(e, t) && t.getTime() - e.getTime() < ot.Hour;
}
function Hm(e, t = new Date()) {
  return !Kt(e, t) && t.getTime() - e.getTime() < ot.Minute;
}
function Qm(e, t = new Date()) {
  return !Kt(e, t) && t.getTime() - e.getTime() < ot.Week;
}
function $m(e, t = new Date()) {
  return Kt(e, t) && e.getTime() - t.getTime() < ot.Week;
}
function Wm(e, t = new Date()) {
  return !Kt(e, t) && t.getTime() - e.getTime() < ot.Year;
}
function Km(e, t = new Date()) {
  return Kt(e, t) && e.getTime() - t.getTime() < ot.Year;
}
function Vm(e, t, r) {
  const { year: n } = xr(e, r),
    { year: o } = xr(t, r);
  return n() === o();
}
function Gm(e, t, r) {
  const { month: n } = xr(e, r),
    { month: o } = xr(t, r);
  return Vm(e, t, r) && n() === o();
}
function Ea(e, t, r) {
  const { day: n } = xr(e, r),
    { day: o } = xr(t, r);
  return Gm(e, t, r) && n() === o();
}
function Ws(e, t) {
  return Ea(e, new Date(), t);
}
function Ym(e, t) {
  const r = new Date(),
    n = new Date(r.valueOf() - 24 * 60 * 60 * 1e3);
  return Ea(e, n, t);
}
function Jm(e, t) {
  const r = new Date(),
    n = new Date(r.valueOf() + 24 * 60 * 60 * 1e3);
  return Ea(e, n, t);
}
let J;
(function (e) {
  (e.Punctuation =
    '[!-#%-\\*,-\\/:;\\?@\\[-\\]_\\{\\}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؝-؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰৽੶૰౷಄෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᭽᭾᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎⌈-⌋〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⹏⹒-⹝、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꣼꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･\uD800]|[\uDD00-\uDD02\uDF9F\uDFD0]|𐕯|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|𛲟|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]'),
    (e.Latin =
      '[A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꟿꬰ-ꭚꭜ-ꭤꭦ-ꭩﬀ-ﬆＡ-Ｚａ-ｚ]|\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD837[\uDF00-\uDF1E]'),
    (e.Han =
      '[⺀-⺙⺛-⻳⼀-⿕々〇〡-〩〸-〻㐀-䶿一-鿿豈-舘並-龎]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]'),
    (e.Hangul = '[ᄀ-ᇿ〮〯ㄱ-ㆎ㈀-㈞㉠-㉾ꥠ-ꥼ가-힣ힰ-ퟆퟋ-ퟻﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]'),
    (e.Katakana =
      '[ァ-ヺヽ-ヿㇰ-ㇿ㋐-㋾㌀-㍗ｦ-ｯｱ-ﾝ\uD82B]|[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00\uDD20-\uDD22\uDD64-\uDD67]'),
    (e.Hiragana = '[ぁ-ゖゝ-ゟ]|\uD82C[\uDC01-\uDD1F\uDD50-\uDD52]|🈀'),
    (e.Thai = '[ก-ฺเ-๛]');
})(J || (J = {}));
const I0 = new Map([
  ['ko', Ks],
  ['ja', (e, t, r) => (r ? `${t}${e}` : `${t}様`)],
  ['zh', Ks],
]);
function Ks(e, t, r) {
  return r ? `${t}${e}` : t;
}
function T0(e) {
  return e.split('-')[0].toLowerCase();
}
function B0({ name: e, locale: t, options: r }) {
  if (!e.givenName) return e.familyName || '';
  if (!e.familyName) return e.givenName;
  const n = !!(r && r.full),
    o = I0.get(T0(t));
  return o
    ? o(e.givenName, e.familyName, n)
    : n
    ? `${e.givenName} ${e.familyName}`
    : e.givenName;
}
const Zm = [J.Latin, J.Han, J.Hiragana, J.Katakana, J.Hangul, J.Thai];
function M0(e) {
  return Zm.filter((t) => new RegExp(`${t}`).test(e));
}
function Vr({ text: e, locale: t }) {
  if (!e || !Intl.Segmenter) return;
  const r = new Intl.Segmenter(t, { granularity: 'grapheme' });
  return Array.from(r.segment(e)).map((n) => n.segment);
}
function Xm({ name: e, locale: t, options: r }) {
  var n;
  return (n = qm({
    givenName: e.givenName,
    familyName: e.familyName,
    idealMaxLength: r == null ? void 0 : r.idealMaxLength,
  })) !== null && n !== void 0
    ? n
    : B0({ name: e, locale: t });
}
function qm({ givenName: e, familyName: t, idealMaxLength: r = 3 }) {
  if (!e && !t) return;
  const n = e == null ? void 0 : e.trim(),
    o = t == null ? void 0 : t.trim(),
    l = [n, o].join('');
  if (new RegExp(`${J.Punctuation}|\\s`).test(l)) return;
  const i = M0(l);
  if (i.length !== 1) return;
  switch (i[0]) {
    case J.Latin:
      return [n == null ? void 0 : n[0], o == null ? void 0 : o[0]].join('');
    case J.Han:
    case J.Katakana:
    case J.Hiragana:
      return o;
    case J.Hangul:
      if (n)
        if (n.length > r) {
          var s;
          return (s = Vr({ text: n, locale: 'ko' })) === null || s === void 0
            ? void 0
            : s[0];
        } else return n;
      else return o;
    case J.Thai:
      if (n) {
        var u;
        return (u = Vr({ text: n, locale: 'th' })) === null || u === void 0
          ? void 0
          : u[0];
      } else {
        var m;
        return (m = Vr({ text: o, locale: 'th' })) === null || m === void 0
          ? void 0
          : m[0];
      }
    default:
      return;
  }
}
function eg({ name: e, idealMaxLength: t }) {
  var r;
  return (r = tg({ name: e, idealMaxLength: t })) !== null && r !== void 0
    ? r
    : e;
}
function tg({ name: e, idealMaxLength: t = 3 }) {
  const r = e.trim(),
    n = M0(r);
  if (n.length !== 1) return;
  const o = n[0],
    l = r.split(' ');
  switch (o) {
    case J.Latin:
      return l.length === 1
        ? l[0].slice(0, t)
        : l.length <= t
        ? l.map((s) => s[0]).join('')
        : l.slice(0)[0][0] + l.slice(-1)[0][0];
    case J.Han:
    case J.Katakana:
    case J.Hiragana:
      return r.includes(' ') ? void 0 : r;
    case J.Hangul: {
      var i;
      const s = r.split(' ')[0];
      return (i = Vr({ text: s, locale: 'ko' })) === null || i === void 0
        ? void 0
        : i.slice(0, t).join('');
    }
    case J.Thai: {
      if (r.includes(' ')) return;
      var a;
      return (a = Vr({ text: r, locale: 'th' })) === null || a === void 0
        ? void 0
        : a[0];
    }
    default:
      return;
  }
}
function rg(e) {
  return !!I0.get(T0(e));
}
function Vs(e) {
  const t = e.split('-')[1];
  return t && t.toUpperCase();
}
function z0(e) {
  return e.split('-')[0].toLowerCase();
}
const P0 = new Map([
    ['a', 'α'],
    ['b', 'ḅ'],
    ['c', 'ͼ'],
    ['d', 'ḍ'],
    ['e', 'ḛ'],
    ['f', 'ϝ'],
    ['g', 'ḡ'],
    ['h', 'ḥ'],
    ['i', 'ḭ'],
    ['j', 'ĵ'],
    ['k', 'ḳ'],
    ['l', 'ḽ'],
    ['m', 'ṃ'],
    ['n', 'ṇ'],
    ['o', 'ṓ'],
    ['p', 'ṗ'],
    ['q', 'ʠ'],
    ['r', 'ṛ'],
    ['s', 'ṡ'],
    ['t', 'ṭ'],
    ['u', 'ṵ'],
    ['v', 'ṽ'],
    ['w', 'ẁ'],
    ['x', 'ẋ'],
    ['y', 'ẏ'],
    ['z', 'ẓ'],
    ['A', 'Ḁ'],
    ['B', 'Ḃ'],
    ['C', 'Ḉ'],
    ['D', 'Ḍ'],
    ['E', 'Ḛ'],
    ['F', 'Ḟ'],
    ['G', 'Ḡ'],
    ['H', 'Ḥ'],
    ['I', 'Ḭ'],
    ['J', 'Ĵ'],
    ['K', 'Ḱ'],
    ['L', 'Ḻ'],
    ['M', 'Ṁ'],
    ['N', 'Ṅ'],
    ['O', 'Ṏ'],
    ['P', 'Ṕ'],
    ['Q', 'Ǫ'],
    ['R', 'Ṛ'],
    ['S', 'Ṣ'],
    ['T', 'Ṫ'],
    ['U', 'Ṳ'],
    ['V', 'Ṿ'],
    ['W', 'Ŵ'],
    ['X', 'Ẋ'],
    ['Y', 'Ŷ'],
    ['Z', 'Ż'],
  ]),
  Gs = 1.15,
  Ys = new Map([
    ['zh', 0.5],
    ['ja', 0.5],
    ['ko', 0.8],
    ['fr', 1.3],
    ['it', 1.3],
    ['de', 1.5],
    ['nl', 1.5],
  ]);
function ng({ to: e }) {
  return e == null ? Gs : Ys.get(e) || Ys.get(z0(e)) || Gs;
}
function og(
  e,
  {
    delimiter: t,
    startDelimiter: r = t,
    endDelimiter: n = t,
    prepend: o,
    append: l,
    toLocale: i,
  } = {}
) {
  const a = ig(e, { startDelimiter: r, endDelimiter: n }),
    s = a.reduce((x, w) => (typeof w == 'string' ? x + lg(w) : x), 0),
    u = Math.ceil(s * ng({ to: i })) - s,
    m = s / Math.abs(u);
  let p = m,
    h = -1;
  const y = a.reduce((x, w) => {
    const P =
      typeof w == 'string'
        ? [...w]
            .map((f) => {
              const d = L0(f);
              d && h++;
              const g = P0.get(f) || f;
              return d && h + 1 === Math.floor(p)
                ? ((p += m), u < 0 ? '' : g.repeat(2))
                : g;
            })
            .join('')
        : w[0];
    return x + P;
  }, '');
  return `${o || ''}${y}${l || ''}`;
}
function L0(e) {
  return P0.has(e);
}
function lg(e) {
  return [...e].filter(L0).length;
}
function ig(e, { startDelimiter: t, endDelimiter: r }) {
  const n = t && r ? ag(t, r) : void 0;
  let o = 0;
  const l = [];
  if (n) {
    let i = n.exec(e);
    for (; i; )
      l.push(e.substring(o, i.index)),
        l.push(i),
        (o = i.index + i[0].length),
        (i = n.exec(e));
    l.push(e.substring(o, e.length));
  } else l.push(e);
  return l;
}
function ag(e, t) {
  if (e.length === 1 && t.length === 1)
    return new RegExp(`\\${e}[^\\${t}]*\\${t}`, 'g');
  const r = [...e].map((o) => `\\${o}`).join(''),
    n = [...t].map((o) => `\\${o}`).join('');
  return new RegExp(`${r}.*?${n}`, 'g');
}
let ir;
(function (e) {
  (e[(e.Rtl = 0)] = 'Rtl'), (e[(e.Ltr = 1)] = 'Ltr');
})(ir || (ir = {}));
let _e;
(function (e) {
  (e.Long = 'Long'),
    (e.Short = 'Short'),
    (e.Humanize = 'Humanize'),
    (e.Time = 'Time'),
    (e.DateTime = 'DateTime');
})(_e || (_e = {}));
const Js = {
  [_e.Long]: {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  },
  [_e.Short]: { month: 'short', day: 'numeric', year: 'numeric' },
  [_e.Humanize]: { month: 'long', day: 'numeric', year: 'numeric' },
  [_e.Time]: { hour: '2-digit', minute: '2-digit' },
  [_e.DateTime]: {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
};
let b;
(function (e) {
  (e.Sunday = 'sunday'),
    (e.Monday = 'monday'),
    (e.Tuesday = 'tuesday'),
    (e.Wednesday = 'wednesday'),
    (e.Thursday = 'thursday'),
    (e.Friday = 'friday'),
    (e.Saturday = 'saturday');
})(b || (b = {}));
const sg = b.Sunday,
  ug = new Map([
    ['AE', b.Saturday],
    ['AF', b.Saturday],
    ['BH', b.Saturday],
    ['DZ', b.Saturday],
    ['EG', b.Saturday],
    ['IQ', b.Saturday],
    ['IR', b.Saturday],
    ['JO', b.Saturday],
    ['KW', b.Saturday],
    ['LY', b.Saturday],
    ['OM', b.Saturday],
    ['QA', b.Saturday],
    ['SA', b.Saturday],
    ['SY', b.Saturday],
    ['YE', b.Saturday],
    ['AR', b.Sunday],
    ['BO', b.Sunday],
    ['BR', b.Sunday],
    ['BZ', b.Sunday],
    ['CA', b.Sunday],
    ['CL', b.Sunday],
    ['CO', b.Sunday],
    ['CR', b.Sunday],
    ['DO', b.Sunday],
    ['EC', b.Sunday],
    ['GT', b.Sunday],
    ['HK', b.Sunday],
    ['HN', b.Sunday],
    ['IL', b.Sunday],
    ['JM', b.Sunday],
    ['JP', b.Sunday],
    ['KE', b.Sunday],
    ['KR', b.Sunday],
    ['MO', b.Sunday],
    ['MX', b.Sunday],
    ['NI', b.Sunday],
    ['PA', b.Sunday],
    ['PE', b.Sunday],
    ['PH', b.Sunday],
    ['SG', b.Sunday],
    ['SV', b.Sunday],
    ['TW', b.Sunday],
    ['US', b.Sunday],
    ['VE', b.Sunday],
    ['ZA', b.Sunday],
    ['ZW', b.Sunday],
    ['AD', b.Monday],
    ['AL', b.Monday],
    ['AM', b.Monday],
    ['AU', b.Monday],
    ['AZ', b.Monday],
    ['BE', b.Monday],
    ['BG', b.Monday],
    ['BN', b.Monday],
    ['BY', b.Monday],
    ['CH', b.Monday],
    ['CN', b.Monday],
    ['CZ', b.Monday],
    ['DE', b.Monday],
    ['DK', b.Monday],
    ['EE', b.Monday],
    ['ES', b.Monday],
    ['FI', b.Monday],
    ['FR', b.Monday],
    ['GB', b.Monday],
    ['GE', b.Monday],
    ['GF', b.Monday],
    ['GR', b.Monday],
    ['HR', b.Monday],
    ['HU', b.Monday],
    ['ID', b.Monday],
    ['IE', b.Monday],
    ['IN', b.Monday],
    ['IS', b.Monday],
    ['IT', b.Monday],
    ['KG', b.Monday],
    ['KZ', b.Monday],
    ['LB', b.Monday],
    ['LT', b.Monday],
    ['LU', b.Monday],
    ['LV', b.Monday],
    ['MA', b.Monday],
    ['MC', b.Monday],
    ['MK', b.Monday],
    ['MN', b.Monday],
    ['MY', b.Monday],
    ['NL', b.Monday],
    ['NO', b.Monday],
    ['NZ', b.Monday],
    ['PK', b.Monday],
    ['PL', b.Monday],
    ['PT', b.Monday],
    ['PY', b.Monday],
    ['RO', b.Monday],
    ['RS', b.Monday],
    ['RU', b.Monday],
    ['SE', b.Monday],
    ['SK', b.Monday],
    ['TH', b.Monday],
    ['TN', b.Monday],
    ['TR', b.Monday],
    ['UA', b.Monday],
    ['UY', b.Monday],
    ['UZ', b.Monday],
    ['VN', b.Monday],
    ['XK', b.Monday],
  ]),
  cg = [
    'ae',
    'ar',
    'arc',
    'bcc',
    'bqi',
    'ckb',
    'dv',
    'fa',
    'glk',
    'he',
    'ku',
    'mzn',
    'nqo',
    'pnb',
    'ps',
    'sd',
    'ug',
    'ur',
    'yi',
  ],
  Zs = { BRL: 'R$', HKD: 'HK$' };
let Se;
(function (e) {
  (e.DirectionControl = '[‎‏‪-‮]'),
    (e.Negative = '[-֊־᠆‐-―−➖⸺⸻﹘﹣－]'),
    (e.Punctuation =
      '[!-#%-\\*,-\\/:;\\?@\\[-\\]_\\{\\}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؝-؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰৽੶૰౷಄෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᭽᭾᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎⌈-⌋〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⹏⹒-⹝、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꣼꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･\uD800]|[\uDD00-\uDD02\uDF9F\uDFD0]|𐕯|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|𛲟|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]'),
    (e.Latin =
      '[A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꟿꬰ-ꭚꭜ-ꭤꭦ-ꭩﬀ-ﬆＡ-Ｚａ-ｚ]|\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD837[\uDF00-\uDF1E]'),
    (e.Han =
      '[⺀-⺙⺛-⻳⼀-⿕々〇〡-〩〸-〻㐀-䶿一-鿿豈-舘並-龎]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]'),
    (e.Hangul = '[ᄀ-ᇿ〮〯ㄱ-ㆎ㈀-㈞㉠-㉾ꥠ-ꥼ가-힣ힰ-ퟆퟋ-ퟻﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]'),
    (e.Katakana =
      '[ァ-ヺヽ-ヿㇰ-ㇿ㋐-㋾㌀-㍗ｦ-ｯｱ-ﾝ\uD82B]|[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00\uDD20-\uDD22\uDD64-\uDD67]'),
    (e.Hiragana = '[ぁ-ゖゝ-ゟ]|\uD82C[\uDC01-\uDD1F\uDD50-\uDD52]|🈀'),
    (e.Thai = '[ก-ฺเ-๛]');
})(Se || (Se = {}));
class R0 extends Error {
  constructor(t, r) {
    super(`Missing translation for key: ${t} in locale: ${r}`);
  }
}
class dg extends Error {
  constructor(t, r = {}) {
    let n = '';
    const o = Object.keys(r);
    o.length < 1
      ? (n = `No replacement found for key '${t}' (and no replacements were passed in).`)
      : (n = `No replacement found for key '${t}'. The following replacements were passed: ${o
          .map((l) => `'${l}'`)
          .join(', ')}`),
      super(n);
  }
}
class Xs extends Error {
  constructor(t = '') {
    const r = 'No currency code provided.';
    super(t === '' ? r : `${r} ${t}`);
  }
}
class fg extends Error {
  constructor(t = '') {
    const r = 'No country code provided.';
    super(t === '' ? r : `${r} ${t}`);
  }
}
const mg = /{\s*(\w+)\s*}/g,
  Ni = Symbol('Missing translation'),
  Gr = 'count',
  Yr = 'ordinal',
  To = '.',
  qs = '-u-nu-',
  eu = 'latn',
  wt = (e) => typeof e == 'string',
  Il = new Map();
function Qt(e, t) {
  const r = gg(e),
    n = pg(r, t);
  if (Il.has(n)) return Il.get(n);
  const o = new Intl.NumberFormat(r, t);
  return Il.set(n, o), o;
}
function gg(e) {
  return Array.isArray(e) ? e.map((t) => tu(t)) : tu(e);
}
function tu(e) {
  if (!e) return e;
  try {
    return new Intl.Locale(e, { numberingSystem: eu }).toString();
  } catch {
    const t = new RegExp(`(?:-x|${qs}).*`, 'g'),
      r = `${qs}${eu}`;
    return e.replace(t, '').concat(r);
  }
}
const hg = {
  startDelimiter: '{',
  endDelimiter: '}',
  prepend: '[!!',
  append: '!!]',
};
function pg(e, t = {}) {
  return `${Array.isArray(e) ? e.sort().join('-') : e}-${JSON.stringify(t)}`;
}
function bg(e, t = {}) {
  return new Intl.PluralRules(e, t);
}
const pn = Ge(bg, (e, t = {}) => `${e}${JSON.stringify(t)}`);
function Tl(e, t, r, n) {
  const o = Array.isArray(t) ? t : [t];
  let l;
  for (const i of o) {
    l = i;
    for (const a of e.split(To)) if (((l = l[a]), !l)) break;
    if (l) return n ? (wt(l) ? Jr(l, n) : j0(l, r, n)) : l;
  }
  throw new R0(e, r);
}
function yg(e, t, r, n) {
  const { scope: o, replacements: l, pseudotranslate: i, interpolate: a } = t,
    s = Array.isArray(r) ? r : [r],
    u = xg(e, o);
  for (const m of s) {
    const p = vg(u, m, n, l, { pseudotranslate: i, interpolate: a });
    if (p !== Ni) return p;
  }
  throw new R0(u, n);
}
function vg(e, t, r, n, { pseudotranslate: o = !1, interpolate: l } = {}) {
  let i = t;
  for (const u of e.split(To)) {
    if (i == null || typeof i != 'object') return Ni;
    i = i[u];
  }
  const a = {};
  if (
    typeof i == 'object' &&
    n != null &&
    Object.prototype.hasOwnProperty.call(n, Gr)
  ) {
    const u = n[Gr];
    if (typeof u == 'number') {
      if (u === 0 && i[0] !== void 0) i = i[0];
      else if (u === 1 && i[1] !== void 0) i = i[1];
      else {
        const m = pn(r).select(u);
        i = i[m] || i.other;
      }
      a[Gr] = Qt(r).format(u);
    }
  } else if (
    typeof i == 'object' &&
    n != null &&
    Object.prototype.hasOwnProperty.call(n, Yr)
  ) {
    const u = n[Yr];
    if (typeof u == 'number') {
      const m = pn(r, { type: 'ordinal' }).select(u);
      (i = i.ordinal[m] || i.ordinal.other), (a[Yr] = Qt(r).format(u));
    }
  }
  const s =
    wt(i) && o
      ? og(i, { ...hg, toLocale: typeof o == 'boolean' ? void 0 : o })
      : i;
  return wt(s) ? Jr(s, { ...n, ...a }, { interpolate: l }) : Ni;
}
function Jr(e, t = {}, { interpolate: r } = {}) {
  const n = [],
    o = new RegExp(r || mg, 'g');
  let l = 0,
    i = 0;
  e.replace(o, (s, u, m) => {
    if (!u)
      throw new Error(
        'Invalid replacement key. The interpolatation format RegExp is possibly too permissive.'
      );
    if (!Object.prototype.hasOwnProperty.call(t, u)) throw new dg(u, t);
    l += 1;
    const p = e.substring(i, m);
    p && n.push(p), (i = m + s.length);
    const h = t[u];
    return (
      j.isValidElement(h)
        ? n.push(j.cloneElement(h, { key: l }))
        : typeof h == 'object'
        ? n.push(h)
        : n.push(String(h)),
      ''
    );
  });
  const a = e.substring(i);
  return a && n.push(a), n.every(wt) ? n.join('') : n;
}
function xg(e, t) {
  return t == null ? e : `${wt(t) ? t : t.join(To)}${To}${e}`;
}
function j0(e, t, r) {
  if (Object.prototype.hasOwnProperty.call(r, Gr)) {
    const n = r[Gr];
    if (typeof n == 'number') {
      const o = pn(t).select(n);
      if (wt(e[o]))
        return Jr(e[o], {
          ...r,
          CARDINAL_PLURALIZATION_KEY_NAME: Qt(t).format(n),
        });
    }
  } else if (Object.prototype.hasOwnProperty.call(r, Yr)) {
    const n = r[Yr];
    if (typeof n == 'number') {
      const o = pn(t, { type: 'ordinal' }).select(n);
      if (wt(e[o]))
        return Jr(e[o], {
          ...r,
          ORDINAL_PLURALIZATION_KEY_NAME: Qt(t).format(n),
        });
    }
  }
  return Object.keys(e).reduce(
    (n, o) => ({ ...n, [o]: wt(e[o]) ? Jr(e[o], r) : j0(e[o], t, r) }),
    {}
  );
}
const Bl = 2,
  ru = new Map([
    ['AED', 2],
    ['AFN', 2],
    ['ALL', 2],
    ['AMD', 2],
    ['ANG', 2],
    ['AOA', 2],
    ['ARS', 2],
    ['AUD', 2],
    ['AWG', 2],
    ['AZN', 2],
    ['BAM', 2],
    ['BBD', 2],
    ['BDT', 2],
    ['BGN', 2],
    ['BHD', 3],
    ['BIF', 0],
    ['BMD', 2],
    ['BND', 2],
    ['BOB', 2],
    ['BOV', 2],
    ['BRL', 2],
    ['BSD', 2],
    ['BTN', 2],
    ['BWP', 2],
    ['BYN', 2],
    ['BYR', 0],
    ['BZD', 2],
    ['CAD', 2],
    ['CDF', 2],
    ['CHE', 2],
    ['CHF', 2],
    ['CHW', 2],
    ['CLF', 4],
    ['CLP', 0],
    ['CNY', 2],
    ['COP', 2],
    ['COU', 2],
    ['CRC', 2],
    ['CUC', 2],
    ['CUP', 2],
    ['CVE', 2],
    ['CZK', 2],
    ['DJF', 0],
    ['DKK', 2],
    ['DOP', 2],
    ['DZD', 2],
    ['EGP', 2],
    ['ERN', 2],
    ['ETB', 2],
    ['EUR', 2],
    ['FJD', 2],
    ['FKP', 2],
    ['GBP', 2],
    ['GEL', 2],
    ['GHS', 2],
    ['GIP', 2],
    ['GMD', 2],
    ['GNF', 0],
    ['GTQ', 2],
    ['GYD', 2],
    ['HKD', 2],
    ['HNL', 2],
    ['HRK', 2],
    ['HTG', 2],
    ['HUF', 2],
    ['IDR', 2],
    ['ILS', 2],
    ['INR', 2],
    ['IQD', 3],
    ['IRR', 2],
    ['ISK', 0],
    ['JEP', 2],
    ['JMD', 2],
    ['JOD', 3],
    ['JPY', 0],
    ['KES', 2],
    ['KGS', 2],
    ['KHR', 2],
    ['KMF', 0],
    ['KPW', 2],
    ['KRW', 0],
    ['KWD', 3],
    ['KYD', 2],
    ['KZT', 2],
    ['LAK', 2],
    ['LBP', 2],
    ['LKR', 2],
    ['LRD', 2],
    ['LSL', 2],
    ['LYD', 3],
    ['MAD', 2],
    ['MDL', 2],
    ['MGA', 2],
    ['MKD', 2],
    ['MMK', 2],
    ['MNT', 2],
    ['MOP', 2],
    ['MRO', 5],
    ['MUR', 2],
    ['MVR', 2],
    ['MWK', 2],
    ['MXN', 2],
    ['MXV', 2],
    ['MYR', 2],
    ['MZN', 2],
    ['NAD', 2],
    ['NGN', 2],
    ['NIO', 2],
    ['NOK', 2],
    ['NPR', 2],
    ['NZD', 2],
    ['OMR', 3],
    ['PAB', 2],
    ['PEN', 2],
    ['PGK', 2],
    ['PHP', 2],
    ['PKR', 2],
    ['PLN', 2],
    ['PYG', 0],
    ['QAR', 2],
    ['RON', 2],
    ['RSD', 2],
    ['RUB', 2],
    ['RWF', 0],
    ['SAR', 2],
    ['SBD', 2],
    ['SCR', 2],
    ['SDG', 2],
    ['SEK', 2],
    ['SGD', 2],
    ['SHP', 2],
    ['SLL', 2],
    ['SOS', 2],
    ['SRD', 2],
    ['SSP', 2],
    ['STD', 2],
    ['STN', 2],
    ['SVC', 2],
    ['SYP', 2],
    ['SZL', 2],
    ['THB', 2],
    ['TJS', 2],
    ['TMT', 2],
    ['TND', 3],
    ['TOP', 2],
    ['TRY', 2],
    ['TTD', 2],
    ['TWD', 2],
    ['TZS', 2],
    ['UAH', 2],
    ['UGX', 0],
    ['USD', 2],
    ['USN', 2],
    ['UYI', 0],
    ['UYU', 2],
    ['UYW', 4],
    ['UZS', 2],
    ['VED', 2],
    ['VEF', 2],
    ['VES', 2],
    ['VND', 0],
    ['VUV', 0],
    ['WST', 2],
    ['XAF', 0],
    ['XAG', 0],
    ['XAU', 0],
    ['XBA', 0],
    ['XBB', 0],
    ['XBC', 0],
    ['XBD', 0],
    ['XCD', 2],
    ['XDR', 0],
    ['XOF', 0],
    ['XPD', 0],
    ['XPF', 0],
    ['XPT', 0],
    ['XSU', 0],
    ['XTS', 0],
    ['XUA', 0],
    ['YER', 2],
    ['ZAR', 2],
    ['ZMW', 2],
    ['ZWL', 2],
  ]),
  Ag = [Se.Latin, Se.Han, Se.Hiragana, Se.Katakana, Se.Hangul, Se.Thai];
function wg(e) {
  return Ag.filter((t) => new RegExp(`${t}`).test(e));
}
function nu(e, t) {
  const r = Sg(0, e, t),
    n = new RegExp(`${Se.DirectionControl}*`, 'gu'),
    o = r.replace(n, ''),
    l = new RegExp('\\p{Nd}\\p{Po}*\\p{Nd}*', 'gu').exec(o);
  if (!l)
    throw new Error(`Number input in locale ${e} is currently not supported.`);
  const i = l[0],
    [a, s] = o.split(i);
  return { symbol: a || s, prefixed: a !== '' };
}
function Sg(e, t, r) {
  return Qt(t, { style: 'currency', ...r }).format(e);
}
function Dg(e) {
  return e.replace(' ', ' ');
}
const Ml = '.',
  Fg = '-',
  Eg = /\d/g,
  ou = /\D/g,
  Cg = /\./g;
let kg = class {
  get language() {
    return z0(this.locale);
  }
  get region() {
    return Vs(this.locale);
  }
  get countryCode() {
    return Vs(this.locale);
  }
  get languageDirection() {
    return cg.includes(this.language) ? ir.Rtl : ir.Ltr;
  }
  get isRtlLanguage() {
    return this.languageDirection === ir.Rtl;
  }
  get isLtrLanguage() {
    return this.languageDirection === ir.Ltr;
  }
  constructor(
    t,
    {
      locale: r,
      currency: n,
      timezone: o,
      country: l,
      pseudolocalize: i = !1,
      onError: a,
      loading: s,
      interpolate: u,
    }
  ) {
    (this.getCurrencySymbol = (m, p = this.locale) => {
      const h = m || this.defaultCurrency;
      if (h == null)
        throw new Xs(
          'formatCurrency cannot be called without a currency code.'
        );
      return this.getShortCurrencySymbol(h, p);
    }),
      (this.numberSymbols = Ge(() => {
        const m = this.formatNumber(123456.7, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        });
        let p, h;
        for (const y of m) isNaN(parseInt(y, 10)) && (p ? (h = y) : (p = y));
        return { thousandSymbol: p, decimalSymbol: h };
      })),
      (this.translations = t),
      (this.locale = r),
      (this.defaultCountry = l),
      (this.defaultCurrency = n),
      (this.defaultTimezone = o),
      (this.pseudolocalize = i),
      (this.defaultInterpolate = u),
      (this.onError = a || this.defaultOnError),
      (this.loading = s || !1);
  }
  translate(t, r, n) {
    const { pseudolocalize: o, defaultInterpolate: l } = this;
    let i;
    const a = { pseudotranslate: o, interpolate: l };
    r == null
      ? (i = a)
      : this.isTranslateOptions(r)
      ? (i = { ...a, ...r, replacements: n })
      : (i = { ...a, replacements: r });
    try {
      return yg(t, i, this.translations, this.locale);
    } catch (s) {
      return this.onError(s), '';
    }
  }
  getTranslationTree(t, r) {
    try {
      return r
        ? Tl(t, this.translations, this.locale, r)
        : Tl(t, this.translations, this.locale);
    } catch (n) {
      return this.onError(n), '';
    }
  }
  translationKeyExists(t, r = !1) {
    try {
      const n = Tl(t, this.translations, this.locale);
      return r ? typeof n == 'string' : !0;
    } catch {
      return !1;
    }
  }
  formatNumber(t, { as: r, precision: n, ...o } = {}) {
    const { locale: l, defaultCurrency: i } = this;
    return r === 'currency' && i == null && o.currency == null
      ? (this.onError(
          new Xs(
            "formatNumber(amount, {as: 'currency'}) cannot be called without a currency code."
          )
        ),
        '')
      : Qt(l, { style: r, maximumFractionDigits: n, currency: i, ...o }).format(
          t
        );
  }
  unformatNumber(t) {
    const { decimalSymbol: r } = this.numberSymbols(),
      n = this.normalizedNumber(t, r);
    return n === '' ? '' : parseFloat(n).toString();
  }
  formatCurrency(t, { form: r, ...n } = {}) {
    switch (r) {
      case 'auto':
        return this.formatCurrencyAuto(t, n);
      case 'explicit':
        return this.formatCurrencyExplicit(t, n);
      case 'short':
        return this.formatCurrencyShort(t, n);
      case 'none':
        return this.formatCurrencyNone(t, n);
      default:
        return this.formatCurrencyAuto(t, n);
    }
  }
  unformatCurrency(t, r) {
    const { decimalSymbol: n } = this.numberSymbols(),
      o = ru.get(r.toUpperCase()),
      l = this.normalizedNumber(t, n, o);
    return l === ''
      ? ''
      : o === 0
      ? `${parseFloat(l).toFixed(0)}.${'0'.repeat(Bl)}`
      : parseFloat(l).toFixed(o);
  }
  formatPercentage(t, r = {}) {
    return this.formatNumber(t, { as: 'percent', ...r });
  }
  formatDate(t, r = {}) {
    const { locale: n, defaultTimezone: o } = this,
      { timeZone: l = o } = r,
      { style: i = void 0, ...a } = r || {};
    if (i)
      switch (i) {
        case _e.Humanize:
          return this.humanizeDate(t, { ...a, timeZone: l });
        case _e.DateTime:
          return this.formatDateTime(t, { ...a, timeZone: l, ...Js[i] });
        default:
          return this.formatDate(t, { ...a, ...Js[i] });
      }
    return it(t, n, { ...a, timeZone: l });
  }
  ordinal(t) {
    const { locale: r } = this,
      n = pn(r, { type: 'ordinal' }).select(t);
    return this.translate(n, { scope: 'ordinal' }, { amount: t });
  }
  weekStartDay(t) {
    const r = t || this.defaultCountry;
    if (!r)
      throw new fg('weekStartDay() cannot be called without a country code.');
    return ug.get(r) || sg;
  }
  getCurrencySymbolLocalized(t, r) {
    return this.getShortCurrencySymbol(r, t);
  }
  formatName(t, r, n) {
    return B0({
      name: { givenName: t, familyName: r },
      locale: this.locale,
      options: n,
    });
  }
  abbreviateName({ firstName: t, lastName: r, idealMaxLength: n = 3 }) {
    return Xm({
      name: { givenName: t, familyName: r },
      locale: this.locale,
      options: { idealMaxLength: n },
    });
  }
  abbreviateBusinessName({ name: t, idealMaxLength: r = 3 }) {
    return eg({ name: t, idealMaxLength: r });
  }
  identifyScript(t) {
    return wg(t);
  }
  hasEasternNameOrderFormatter() {
    return rg(this.locale);
  }
  formatCurrencyAuto(t, r = {}) {
    return r.currency == null ||
      this.defaultCurrency == null ||
      r.currency === this.defaultCurrency
      ? this.formatCurrencyShort(t, r)
      : this.formatCurrencyExplicit(t, r);
  }
  formatCurrencyExplicit(t, r = {}) {
    const n = this.formatCurrencyShort(t, r),
      o = r.currency || this.defaultCurrency || '';
    return n.includes(o) ? n : `${n} ${o}`;
  }
  formatCurrencyShort(t, r = {}) {
    var n;
    const o = this.formatCurrencyNone(t, r),
      i =
        ((n = new RegExp(`${Se.DirectionControl}*${Se.Negative}`, 'g').exec(
          o
        )) === null || n === void 0
          ? void 0
          : n.shift()) || '',
      a = this.getShortCurrencySymbol(r.currency),
      s = a.prefixed ? `${a.symbol}${o}` : `${o}${a.symbol}`;
    return `${i}${s.replace(i, '')}`;
  }
  formatCurrencyNone(t, r = {}) {
    const { locale: n } = this;
    let o = r.precision;
    if (o === void 0) {
      const l = r.currency || this.defaultCurrency || '';
      o = ru.get(l.toUpperCase());
    }
    return Qt(n, {
      style: 'decimal',
      minimumFractionDigits: o,
      maximumFractionDigits: o,
      ...r,
    }).format(t);
  }
  getShortCurrencySymbol(t = this.defaultCurrency || '', r = this.locale) {
    const n = t.substring(0, 2);
    let o;
    try {
      o = nu(r, { currency: t, currencyDisplay: 'narrowSymbol' });
    } catch {
      o = nu(r, { currency: t });
    }
    if (t in Zs) return { symbol: Zs[t], prefixed: o.prefixed };
    const l = o.symbol.replace(n, '');
    return /[A-Za-zÀ-ÖØ-öø-ÿĀ-ɏḂ-ỳ]/.exec(l)
      ? o
      : { symbol: l, prefixed: o.prefixed };
  }
  humanizeDate(t, r) {
    return Kt(t) ? this.humanizeFutureDate(t, r) : this.humanizePastDate(t, r);
  }
  formatDateTime(t, r) {
    const { defaultTimezone: n } = this,
      { timeZone: o = n } = r;
    return this.translate('date.humanize.lessThanOneYearAway', {
      date: this.getDateFromDate(t, { ...r, timeZone: o }),
      time: this.getTimeFromDate(t, { ...r, timeZone: o }),
    });
  }
  humanizePastDate(t, r) {
    if (Hm(t)) return this.translate('date.humanize.lessThanOneMinuteAgo');
    if (Um(t)) {
      const i = Math.floor((new Date().getTime() - t.getTime()) / ot.Minute);
      return this.translate('date.humanize.lessThanOneHourAgo', { count: i });
    }
    const n = r == null ? void 0 : r.timeZone,
      o = this.getTimeFromDate(t, r);
    if (Ws(t, n)) return o;
    if (Ym(t, n)) return this.translate('date.humanize.yesterday', { time: o });
    if (Qm(t)) {
      const l = this.getWeekdayFromDate(t, r);
      return this.translate('date.humanize.lessThanOneWeekAgo', {
        weekday: l,
        time: o,
      });
    }
    if (Wm(t)) {
      const l = this.getMonthDayFromDate(t, r);
      return this.translate('date.humanize.lessThanOneYearAgo', {
        date: l,
        time: o,
      });
    }
    return this.formatDate(t, { ...r, style: _e.Short });
  }
  humanizeFutureDate(t, r) {
    const n = r == null ? void 0 : r.timeZone,
      o = this.getTimeFromDate(t, r);
    if (Ws(t, n)) return this.translate('date.humanize.today', { time: o });
    if (Jm(t, n)) return this.translate('date.humanize.tomorrow', { time: o });
    if ($m(t)) {
      const l = this.getWeekdayFromDate(t, r);
      return this.translate('date.humanize.lessThanOneWeekAway', {
        weekday: l,
        time: o,
      });
    }
    if (Km(t)) {
      const l = this.getMonthDayFromDate(t, r);
      return this.translate('date.humanize.lessThanOneYearAway', {
        date: l,
        time: o,
      });
    }
    return this.formatDate(t, { ...r, style: _e.Short });
  }
  getTimeZone(t, r) {
    const { localeMatcher: n, formatMatcher: o, timeZone: l } = r || {},
      i = this.formatDate(t, {
        localeMatcher: n,
        formatMatcher: o,
        timeZone: l,
        hour12: !1,
        timeZoneName: 'short',
        hour: 'numeric',
      }),
      a = /\s([\w()+\-:.]+$)/.exec(i);
    return a ? a[1] : '';
  }
  getDateFromDate(t, r) {
    const {
      localeMatcher: n,
      formatMatcher: o,
      weekday: l,
      day: i,
      month: a,
      year: s,
      era: u,
      timeZone: m,
      timeZoneName: p,
    } = r || {};
    return this.formatDate(t, {
      localeMatcher: n,
      formatMatcher: o,
      weekday: l,
      day: i,
      month: a,
      year: s,
      era: u,
      timeZone: m,
      timeZoneName: p === 'short' ? void 0 : p,
    });
  }
  getTimeFromDate(t, r) {
    const {
        localeMatcher: n,
        formatMatcher: o,
        hour12: l,
        timeZone: i,
        timeZoneName: a,
      } = r || {},
      s = this.formatDate(t, {
        localeMatcher: n,
        formatMatcher: o,
        hour12: l,
        timeZone: i,
        timeZoneName: a === 'short' ? void 0 : a,
        hour: 'numeric',
        minute: '2-digit',
      }).toLocaleLowerCase(),
      u = a === 'short' ? `${s} ${this.getTimeZone(t, r)}` : s;
    return Dg(u);
  }
  getWeekdayFromDate(t, r) {
    const {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: i,
    } = r || {};
    return this.formatDate(t, {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: i,
      weekday: 'long',
    });
  }
  getMonthDayFromDate(t, r) {
    const {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: i,
    } = r || {};
    return this.formatDate(t, {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: i,
      month: 'short',
      day: 'numeric',
    });
  }
  normalizedNumber(t, r, n = Bl) {
    const o = Math.max(n, Bl),
      l = t.lastIndexOf(Ml);
    let i = t.lastIndexOf(r);
    r !== Ml &&
      (t.match(Cg) || []).length === 1 &&
      this.decimalValue(t, l).length <= o &&
      (i = l);
    const a = this.integerValue(t, i),
      s = this.decimalValue(t, i),
      u = new RegExp(`^(${Se.DirectionControl}|\\s)*${Se.Negative}`, 'u'),
      h = `${t.match(u) ? Fg : ''}${a}${i === -1 ? '' : Ml}${s}`;
    return h.match(Eg) ? h : '';
  }
  integerValue(t, r) {
    return t.substring(0, r).replace(ou, '');
  }
  decimalValue(t, r) {
    return t.substring(r + 1).replace(ou, '');
  }
  isTranslateOptions(t) {
    return 'scope' in t;
  }
  defaultOnError(t) {
    throw t;
  }
};
function Ng(e) {
  const t = j.useContext(k0);
  if (t == null)
    throw new Error(
      'Missing i18n manager. Make sure to use an <I18nContext.Provider /> somewhere in your React tree.'
    );
  const r = j.useRef(e);
  if (lu(r.current) !== lu(e))
    throw new Error(
      'You switched between providing registration options and not providing them, which is not supported.'
    );
  return Ig(t);
}
function Ig(e) {
  return [j.useContext(Tm) || new kg([], e.details), Tg];
}
function Tg({ children: e }) {
  return j.createElement(j.Fragment, null, e);
}
function lu({ fallback: e, translations: t } = {}) {
  return e != null || t != null;
}
const Bg = ({ data: e, setSelectedData: t, alreadyClaimed: r }) => {
    const [n] = Ng(),
      [o, l] = I.useState([]),
      i = (a, s = null) => {
        a === 'all'
          ? o.length === e.length
            ? l([])
            : l(e.map((u) => u.id))
          : a === 'single' &&
            s !== null &&
            (o.includes(s) ? l(o.filter((u) => u !== s)) : l([...o, s]));
      };
    return (
      I.useEffect(() => {
        t(e.filter((a) => o.includes(a.id)));
      }, [o]),
      c.jsx('div', {
        class: 'relative overflow-x-auto shadow-md sm:rounded-lg',
        children: c.jsxs('table', {
          class: 'w-full text-left rtl:text-right text-gray-500 ',
          children: [
            c.jsx('thead', {
              class:
                'text-gray-700 uppercase bg-gray-100 border-b-gray-400 border',
              children: c.jsxs('tr', {
                children: [
                  r &&
                    c.jsx('th', {
                      scope: 'col',
                      class: 'p-4',
                      children: c.jsxs('div', {
                        class: 'flex items-center',
                        children: [
                          c.jsx('input', {
                            checked: o.length === e.length,
                            onClick: () => i('all'),
                            id: 'checkbox-all-search',
                            type: 'checkbox',
                            class:
                              ' text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer',
                          }),
                          c.jsx('label', {
                            for: 'checkbox-all-search',
                            class: 'sr-only',
                            children: 'checkbox',
                          }),
                        ],
                      }),
                    }),
                  c.jsx('th', {
                    scope: 'col',
                    class: 'px-6 py-3',
                    children: 'Item',
                  }),
                  c.jsx('th', {
                    scope: 'col',
                    class: 'px-6 py-3',
                    children: 'Price',
                  }),
                  c.jsx('th', {
                    scope: 'col',
                    class: 'px-6 py-3',
                    children: 'Total',
                  }),
                ],
              }),
            }),
            c.jsx('tbody', {
              children: e.map(
                ({
                  id: a,
                  title: s,
                  originalPrice: u,
                  discountPrice: m,
                  quantity: p,
                  image: h,
                  name: y,
                  sku: x,
                  OrderId: w,
                }) =>
                  c.jsxs(
                    'tr',
                    {
                      class: 'bg-white border-b  hover:bg-gray-50 ',
                      onClick: () => r && i('single', a),
                      children: [
                        r &&
                          c.jsx('td', {
                            class: 'w-4 p-4',
                            children: c.jsxs('div', {
                              class: 'flex items-center',
                              children: [
                                c.jsx('input', {
                                  checked: o.includes(a),
                                  id: 'checkbox-table-search-1',
                                  type: 'checkbox',
                                  class:
                                    ' text-gray-600 bg-gray-100 border-gray-300 rounded cursor-pointer',
                                }),
                                c.jsx('label', {
                                  for: 'checkbox-table-search-1',
                                  class: 'sr-only',
                                  children: 'checkbox',
                                }),
                              ],
                            }),
                          }),
                        c.jsx('th', {
                          scope: 'row',
                          class:
                            'px-6 py-4 font-medium text-gray-900 whitespace-nowrap ',
                          children: c.jsxs('div', {
                            className: 'flex items-center gap-2 mr-1',
                            children: [
                              c.jsx('p', {
                                className:
                                  'w-[3.5rem] h-[3.5rem] border rounded-md flex gap-2',
                                children: c.jsx('img', {
                                  width: '100%',
                                  height: 'auto',
                                  src: h,
                                  alt: y,
                                }),
                              }),
                              c.jsxs('span', {
                                children: [
                                  y,
                                  c.jsx('p', {
                                    className: 'font-normal text-gray-600',
                                    children: x,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        c.jsxs('td', {
                          class: 'px-6 py-4',
                          children: [
                            c.jsx('span', {
                              className: 'line-through',
                              children: n.formatCurrency(Number(u)),
                            }),
                            ' ',
                            m ? n.formatCurrency(u - m) : n.formatCurrency(u),
                            ' ',
                            'x ',
                            p,
                          ],
                        }),
                        c.jsx('td', {
                          class: 'px-6 py-4',
                          children: m
                            ? n.formatCurrency((u - m) * p)
                            : n.formatCurrency(u * p),
                        }),
                      ],
                    },
                    a
                  )
              ),
            }),
          ],
        }),
      })
    );
  },
  Mg = ({ setSelectedData: e, selectedData: t, setStep: r, item: n }) => {
    var p, h, y;
    const [o, l] = I.useState('');
    console.log(n);
    const i = () => {
        if (!t.length) {
          l('Please select at least one item to generate claim request.');
          return;
        }
        l(''), r((x) => x + 1);
      },
      a = n.fulfillmentLineItems.map((x, w) => ({ ...x, id: w + 1 })),
      s =
        (p = n == null ? void 0 : n.fulfillmentLineItems[0]) == null
          ? void 0
          : p.claimStatus,
      u =
        t.length > 0
          ? `${t.length === 1 ? `- ${t.length} Item` : ` - ${t.length} items`}`
          : '',
      m =
        (h = n == null ? void 0 : n.fulfillmentLineItems) == null
          ? void 0
          : h.find((x) => !x.hasClaim);
    return c.jsx('div', {
      style: { margin: '10px 0px' },
      children: c.jsxs(ki, {
        children: [
          c.jsxs('div', {
            className: '',
            style: { fontSize: '15px' },
            children: [
              c.jsxs('div', {
                style: { display: 'flex', justifyContent: 'space-between' },
                children: [
                  c.jsxs('div', {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '5px',
                    },
                    children: [
                      c.jsxs('span', {
                        class:
                          'inline-flex items-center bg-green-300 text-black px-2 py-0.5 rounded-lg text-[12px] font-normal',
                        children: [
                          c.jsx('img', {
                            src: 'https://cdn.shopify.com/extensions/c0e94e61-dbf1-4a69-a5a3-a24c5c3fc3e7/0.0.0/assets/delivery-nfpI0fWE.png?v=1728809994?v=1728809994',
                            alt: '',
                            width: '15px',
                            className: 'me-1',
                          }),
                          'Fulfilled (',
                          (y = n == null ? void 0 : n.fulfillmentLineItems) ==
                          null
                            ? void 0
                            : y.length,
                          ')',
                          ' ',
                        ],
                      }),
                      c.jsx('span', {
                        className: 'text-[12px] text-gray-600',
                        children: n == null ? void 0 : n.name,
                      }),
                    ],
                  }),
                  c.jsxs('div', {
                    style: { marginBottom: '-15px' },
                    children: [
                      'Claim Status',
                      ' ',
                      c.jsx(Im, {
                        tone:
                          s === 'INPROGRESS'
                            ? 'warning'
                            : s === 'APPROVE'
                            ? 'success'
                            : s === 'CANCEL'
                            ? 'critical'
                            : s === 'REQUESTED'
                            ? 'info'
                            : 'new',
                        children: c.jsxs('span', {
                          style: { textTransform: 'capitalize' },
                          children: [
                            ' ',
                            s === 'INPROGRESS'
                              ? 'In Progress'
                              : (s == null ? void 0 : s.toLowerCase()) ??
                                'Not Requested',
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              c.jsx('br', {}),
            ],
          }),
          c.jsx('p', { className: 'border border-gray-200 w-full' }),
          c.jsx('br', {}),
          c.jsxs('div', {
            style: { fontSize: '15px' },
            children: [
              c.jsx('h3', {
                className: 'text-md font-bold',
                children: 'Select the items and describe the situation.',
              }),
              c.jsx('br', {}),
              c.jsx(ki, {
                children: c.jsx(Bg, {
                  data: a,
                  alreadyClaimed: m,
                  setSelectedData: e,
                }),
              }),
            ],
          }),
          c.jsx('br', {}),
          o &&
            c.jsxs(c.Fragment, {
              children: [
                c.jsx(Io, { message: o, setError: () => l('') }),
                ' ',
                c.jsx('br', {}),
              ],
            }),
          c.jsx('div', {
            className: 'form-actions',
            children: m
              ? c.jsx('button', {
                  type: 'submit',
                  className: 'submit',
                  onClick: i,
                  children: `Generate Claim Request ${u}`,
                })
              : c.jsx('button', {
                  style: {
                    backgroundColor: '#ccc',
                    color: '#666',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'not-allowed',
                    borderRadius: '3px',
                  },
                  disabled: !0,
                  children: 'Already Claimed',
                }),
          }),
        ],
      }),
    });
  },
  zg = ({ setSelectedData: e, selectedData: t, setStep: r, data: n }) =>
    c.jsxs('div', {
      children: [
        c.jsxs('div', {
          style: { display: 'flex', alignItems: 'center' },
          children: [
            c.jsx('button', {
              className: 'claim-button',
              type: 'button',
              style: { padding: '6px' },
              onClick: () => r((o) => o - 1),
              children: c.jsx('span', {
                children: c.jsx('img', { src: km, width: '20px', alt: 'back' }),
              }),
            }),
            c.jsxs('span', {
              style: { fontSize: '18px', marginLeft: '10px' },
              children: ['Order ', n == null ? void 0 : n.name],
            }),
          ],
        }),
        c.jsx(Nm, { data: n }),
        c.jsx('br', {}),
        n.fulfillments.map((o) =>
          c.jsx(
            Mg,
            { setStep: r, setSelectedData: e, selectedData: t, item: o },
            o.name
          )
        ),
        c.jsx('br', {}),
      ],
    }),
  Pg = ({ onclose: e = () => {} }) =>
    c.jsxs('div', {
      class: 'modal-container',
      children: [
        c.jsx('div', {
          style: { width: 'fit-content', margin: 'auto' },
          children: c.jsx('svg', {
            fill: 'green',
            version: '1.1',
            id: 'Capa_1',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            width: '100px',
            height: '100px',
            viewBox: '0 0 305.002 305.002',
            'xml:space': 'preserve',
            children: c.jsx('g', {
              children: c.jsxs('g', {
                children: [
                  c.jsx('path', {
                    d: `M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
              S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
              c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z`,
                  }),
                  c.jsx('path', {
                    d: `M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
              l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
              c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z`,
                  }),
                ],
              }),
            }),
          }),
        }),
        c.jsx('br', {}),
        c.jsx('h2', {
          className: 'modal-heading',
          children: 'Thank you for submitting your claim!',
        }),
        c.jsx('br', {}),
        c.jsxs('p', {
          children: [
            'Your claim has been received and is being reviewed by one of our team. You can expect a response within ',
            c.jsx('b', { children: '24 hours.' }),
          ],
        }),
        c.jsx('br', {}),
        c.jsx('button', { className: 'submit', onClick: e, children: 'ok' }),
      ],
    }),
  Lg = () => {
    const [e, t] = I.useState(!1),
      [r, n] = I.useState(0),
      [o, l] = I.useState([]),
      [i, a] = I.useState([]),
      [s, u] = I.useState(25);
    I.useEffect(() => {
      r === 0 ? u(25) : r === 1 ? u(50) : r === 2 ? u(75) : r === 3 && u(100);
    }, [r]);
    let m = null;
    switch (r) {
      case 0:
        m = c.jsx(Cm, { setStep: n, setData: l });
        break;
      case 1:
        m = c.jsx(zg, {
          setIsSubmit: t,
          setSelectedData: a,
          selectedData: i,
          setStep: n,
          data: o,
        });
        break;
      case 2:
        m = c.jsx(Em, { selectedData: i, setStep: n });
        break;
      case 3:
        m = c.jsx(Pg, { onclose: () => n(0) });
        break;
      default:
        m = null;
        break;
    }
    return c.jsxs(c.Fragment, {
      children: [
        c.jsx('progress', {
          value: s,
          max: '100',
          style: { '--value': s, '--max': 100 },
        }),
        c.jsx('br', {}),
        m,
      ],
    });
  };
function Rg() {
  var r, n;
  const e =
      ((n =
        (r = window == null ? void 0 : window.Shopify) == null
          ? void 0
          : r.currency) == null
        ? void 0
        : n.active) || 'USD',
    t = I.useMemo(
      () =>
        new Bm({
          locale: 'en',
          currency: e,
          onError(o) {
            console.error(o);
          },
        }),
      []
    );
  return c.jsx(k0.Provider, {
    value: t,
    children: c.jsx('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      children: c.jsx('div', {
        className: 'responsive ',
        style: { margin: '20px' },
        children: c.jsx(Lg, {}),
      }),
    }),
  });
}
const jg = {
    ActionMenu: {
      Actions: { moreActions: 'More actions' },
      RollupActions: { rollupButton: 'View actions' },
    },
    ActionList: {
      SearchField: {
        clearButtonLabel: 'Clear',
        search: 'Search',
        placeholder: 'Search actions',
      },
    },
    Avatar: {
      label: 'Avatar',
      labelWithInitials: 'Avatar with initials {initials}',
    },
    Autocomplete: {
      spinnerAccessibilityLabel: 'Loading',
      ellipsis: '{content}…',
    },
    Badge: {
      PROGRESS_LABELS: {
        incomplete: 'Incomplete',
        partiallyComplete: 'Partially complete',
        complete: 'Complete',
      },
      TONE_LABELS: {
        info: 'Info',
        success: 'Success',
        warning: 'Warning',
        critical: 'Critical',
        attention: 'Attention',
        new: 'New',
        readOnly: 'Read-only',
        enabled: 'Enabled',
      },
      progressAndTone: '{toneLabel} {progressLabel}',
    },
    Banner: { dismissButton: 'Dismiss notification' },
    Button: { spinnerAccessibilityLabel: 'Loading' },
    Common: {
      checkbox: 'checkbox',
      undo: 'Undo',
      cancel: 'Cancel',
      clear: 'Clear',
      close: 'Close',
      submit: 'Submit',
      more: 'More',
    },
    ContextualSaveBar: { save: 'Save', discard: 'Discard' },
    DataTable: {
      sortAccessibilityLabel: 'sort {direction} by',
      navAccessibilityLabel: 'Scroll table {direction} one column',
      totalsRowHeading: 'Totals',
      totalRowHeading: 'Total',
    },
    DatePicker: {
      previousMonth:
        'Show previous month, {previousMonthName} {showPreviousYear}',
      nextMonth: 'Show next month, {nextMonth} {nextYear}',
      today: 'Today ',
      start: 'Start of range',
      end: 'End of range',
      months: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
      },
      days: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
      },
      daysAbbreviated: {
        monday: 'Mo',
        tuesday: 'Tu',
        wednesday: 'We',
        thursday: 'Th',
        friday: 'Fr',
        saturday: 'Sa',
        sunday: 'Su',
      },
    },
    DiscardConfirmationModal: {
      title: 'Discard all unsaved changes',
      message:
        'If you discard changes, you’ll delete any edits you made since you last saved.',
      primaryAction: 'Discard changes',
      secondaryAction: 'Continue editing',
    },
    DropZone: {
      single: {
        overlayTextFile: 'Drop file to upload',
        overlayTextImage: 'Drop image to upload',
        overlayTextVideo: 'Drop video to upload',
        actionTitleFile: 'Add file',
        actionTitleImage: 'Add image',
        actionTitleVideo: 'Add video',
        actionHintFile: 'or drop file to upload',
        actionHintImage: 'or drop image to upload',
        actionHintVideo: 'or drop video to upload',
        labelFile: 'Upload file',
        labelImage: 'Upload image',
        labelVideo: 'Upload video',
      },
      allowMultiple: {
        overlayTextFile: 'Drop files to upload',
        overlayTextImage: 'Drop images to upload',
        overlayTextVideo: 'Drop videos to upload',
        actionTitleFile: 'Add files',
        actionTitleImage: 'Add images',
        actionTitleVideo: 'Add videos',
        actionHintFile: 'or drop files to upload',
        actionHintImage: 'or drop images to upload',
        actionHintVideo: 'or drop videos to upload',
        labelFile: 'Upload files',
        labelImage: 'Upload images',
        labelVideo: 'Upload videos',
      },
      errorOverlayTextFile: 'File type is not valid',
      errorOverlayTextImage: 'Image type is not valid',
      errorOverlayTextVideo: 'Video type is not valid',
    },
    EmptySearchResult: { altText: 'Empty search results' },
    Frame: {
      skipToContent: 'Skip to content',
      navigationLabel: 'Navigation',
      Navigation: { closeMobileNavigationLabel: 'Close navigation' },
    },
    FullscreenBar: { back: 'Back', accessibilityLabel: 'Exit fullscreen mode' },
    Filters: {
      moreFilters: 'More filters',
      moreFiltersWithCount: 'More filters ({count})',
      filter: 'Filter {resourceName}',
      noFiltersApplied: 'No filters applied',
      cancel: 'Cancel',
      done: 'Done',
      clearAllFilters: 'Clear all filters',
      clear: 'Clear',
      clearLabel: 'Clear {filterName}',
      addFilter: 'Add filter',
      clearFilters: 'Clear all',
      searchInView: 'in:{viewName}',
    },
    FilterPill: { clear: 'Clear', unsavedChanges: 'Unsaved changes - {label}' },
    IndexFilters: {
      searchFilterTooltip: 'Search and filter',
      searchFilterTooltipWithShortcut: 'Search and filter (F)',
      searchFilterAccessibilityLabel: 'Search and filter results',
      sort: 'Sort your results',
      addView: 'Add a new view',
      newView: 'Custom search',
      SortButton: {
        ariaLabel: 'Sort the results',
        tooltip: 'Sort',
        title: 'Sort by',
        sorting: { asc: 'Ascending', desc: 'Descending', az: 'A-Z', za: 'Z-A' },
      },
      EditColumnsButton: {
        tooltip: 'Edit columns',
        accessibilityLabel: 'Customize table column order and visibility',
      },
      UpdateButtons: {
        cancel: 'Cancel',
        update: 'Update',
        save: 'Save',
        saveAs: 'Save as',
        modal: {
          title: 'Save view as',
          label: 'Name',
          sameName:
            'A view with this name already exists. Please choose a different name.',
          save: 'Save',
          cancel: 'Cancel',
        },
      },
    },
    IndexProvider: {
      defaultItemSingular: 'Item',
      defaultItemPlural: 'Items',
      allItemsSelected: 'All {itemsLength}+ {resourceNamePlural} are selected',
      selected: '{selectedItemsCount} selected',
      a11yCheckboxDeselectAllSingle: 'Deselect {resourceNameSingular}',
      a11yCheckboxSelectAllSingle: 'Select {resourceNameSingular}',
      a11yCheckboxDeselectAllMultiple:
        'Deselect all {itemsLength} {resourceNamePlural}',
      a11yCheckboxSelectAllMultiple:
        'Select all {itemsLength} {resourceNamePlural}',
    },
    IndexTable: {
      emptySearchTitle: 'No {resourceNamePlural} found',
      emptySearchDescription: 'Try changing the filters or search term',
      onboardingBadgeText: 'New',
      resourceLoadingAccessibilityLabel: 'Loading {resourceNamePlural}…',
      selectAllLabel: 'Select all {resourceNamePlural}',
      selected: '{selectedItemsCount} selected',
      undo: 'Undo',
      selectAllItems: 'Select all {itemsLength}+ {resourceNamePlural}',
      selectItem: 'Select {resourceName}',
      selectButtonText: 'Select',
      sortAccessibilityLabel: 'sort {direction} by',
    },
    Loading: { label: 'Page loading bar' },
    Modal: {
      iFrameTitle: 'body markup',
      modalWarning:
        'These required properties are missing from Modal: {missingProps}',
    },
    Page: {
      Header: {
        rollupActionsLabel: 'View actions for {title}',
        pageReadyAccessibilityLabel: '{title}. This page is ready',
      },
    },
    Pagination: {
      previous: 'Previous',
      next: 'Next',
      pagination: 'Pagination',
    },
    ProgressBar: {
      negativeWarningMessage:
        'Values passed to the progress prop shouldn’t be negative. Resetting {progress} to 0.',
      exceedWarningMessage:
        'Values passed to the progress prop shouldn’t exceed 100. Setting {progress} to 100.',
    },
    ResourceList: {
      sortingLabel: 'Sort by',
      defaultItemSingular: 'item',
      defaultItemPlural: 'items',
      showing: 'Showing {itemsCount} {resource}',
      showingTotalCount: 'Showing {itemsCount} of {totalItemsCount} {resource}',
      loading: 'Loading {resource}',
      selected: '{selectedItemsCount} selected',
      allItemsSelected:
        'All {itemsLength}+ {resourceNamePlural} in your store are selected',
      allFilteredItemsSelected:
        'All {itemsLength}+ {resourceNamePlural} in this filter are selected',
      selectAllItems:
        'Select all {itemsLength}+ {resourceNamePlural} in your store',
      selectAllFilteredItems:
        'Select all {itemsLength}+ {resourceNamePlural} in this filter',
      emptySearchResultTitle: 'No {resourceNamePlural} found',
      emptySearchResultDescription: 'Try changing the filters or search term',
      selectButtonText: 'Select',
      a11yCheckboxDeselectAllSingle: 'Deselect {resourceNameSingular}',
      a11yCheckboxSelectAllSingle: 'Select {resourceNameSingular}',
      a11yCheckboxDeselectAllMultiple:
        'Deselect all {itemsLength} {resourceNamePlural}',
      a11yCheckboxSelectAllMultiple:
        'Select all {itemsLength} {resourceNamePlural}',
      Item: {
        actionsDropdownLabel: 'Actions for {accessibilityLabel}',
        actionsDropdown: 'Actions dropdown',
        viewItem: 'View details for {itemName}',
      },
      BulkActions: {
        actionsActivatorLabel: 'Actions',
        moreActionsActivatorLabel: 'More actions',
      },
    },
    SkeletonPage: { loadingLabel: 'Page loading' },
    Tabs: {
      newViewAccessibilityLabel: 'Create new view',
      newViewTooltip: 'Create view',
      toggleTabsLabel: 'More views',
      Tab: {
        rename: 'Rename view',
        duplicate: 'Duplicate view',
        edit: 'Edit view',
        editColumns: 'Edit columns',
        delete: 'Delete view',
        copy: 'Copy of {name}',
        deleteModal: {
          title: 'Delete view?',
          description:
            'This can’t be undone. {viewName} view will no longer be available in your admin.',
          cancel: 'Cancel',
          delete: 'Delete view',
        },
      },
      RenameModal: {
        title: 'Rename view',
        label: 'Name',
        cancel: 'Cancel',
        create: 'Save',
        errors: {
          sameName:
            'A view with this name already exists. Please choose a different name.',
        },
      },
      DuplicateModal: {
        title: 'Duplicate view',
        label: 'Name',
        cancel: 'Cancel',
        create: 'Create view',
        errors: {
          sameName:
            'A view with this name already exists. Please choose a different name.',
        },
      },
      CreateViewModal: {
        title: 'Create new view',
        label: 'Name',
        cancel: 'Cancel',
        create: 'Create view',
        errors: {
          sameName:
            'A view with this name already exists. Please choose a different name.',
        },
      },
    },
    Tag: { ariaLabel: 'Remove {children}' },
    TextField: {
      characterCount: '{count} characters',
      characterCountWithMaxLength: '{count} of {limit} characters used',
    },
    TooltipOverlay: { accessibilityLabel: 'Tooltip: {label}' },
    TopBar: {
      toggleMenuLabel: 'Toggle menu',
      SearchField: { clearButtonLabel: 'Clear', search: 'Search' },
    },
    MediaCard: { dismissButton: 'Dismiss', popoverButton: 'Actions' },
    VideoThumbnail: {
      playButtonA11yLabel: {
        default: 'Play video',
        defaultWithDuration: 'Play video of length {duration}',
        duration: {
          hours: {
            other: {
              only: '{hourCount} hours',
              andMinutes: '{hourCount} hours and {minuteCount} minutes',
              andMinute: '{hourCount} hours and {minuteCount} minute',
              minutesAndSeconds:
                '{hourCount} hours, {minuteCount} minutes, and {secondCount} seconds',
              minutesAndSecond:
                '{hourCount} hours, {minuteCount} minutes, and {secondCount} second',
              minuteAndSeconds:
                '{hourCount} hours, {minuteCount} minute, and {secondCount} seconds',
              minuteAndSecond:
                '{hourCount} hours, {minuteCount} minute, and {secondCount} second',
              andSeconds: '{hourCount} hours and {secondCount} seconds',
              andSecond: '{hourCount} hours and {secondCount} second',
            },
            one: {
              only: '{hourCount} hour',
              andMinutes: '{hourCount} hour and {minuteCount} minutes',
              andMinute: '{hourCount} hour and {minuteCount} minute',
              minutesAndSeconds:
                '{hourCount} hour, {minuteCount} minutes, and {secondCount} seconds',
              minutesAndSecond:
                '{hourCount} hour, {minuteCount} minutes, and {secondCount} second',
              minuteAndSeconds:
                '{hourCount} hour, {minuteCount} minute, and {secondCount} seconds',
              minuteAndSecond:
                '{hourCount} hour, {minuteCount} minute, and {secondCount} second',
              andSeconds: '{hourCount} hour and {secondCount} seconds',
              andSecond: '{hourCount} hour and {secondCount} second',
            },
          },
          minutes: {
            other: {
              only: '{minuteCount} minutes',
              andSeconds: '{minuteCount} minutes and {secondCount} seconds',
              andSecond: '{minuteCount} minutes and {secondCount} second',
            },
            one: {
              only: '{minuteCount} minute',
              andSeconds: '{minuteCount} minute and {secondCount} seconds',
              andSecond: '{minuteCount} minute and {secondCount} second',
            },
          },
          seconds: {
            other: '{secondCount} seconds',
            one: '{secondCount} second',
          },
        },
      },
    },
  },
  _g = { Polaris: jg },
  Og = {
    props: { 'data-polaris-scrollable': !0 },
    selector: '[data-polaris-scrollable]',
  },
  Ug = {
    props: { 'data-polaris-top-bar': !0 },
    selector: '[data-polaris-top-bar]',
  };
function Hg(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
  if (r != null) {
    var n,
      o,
      l,
      i,
      a = [],
      s = !0,
      u = !1;
    try {
      if (((l = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = l.call(r)).done) && (a.push(n.value), a.length !== t);
          s = !0
        );
    } catch (m) {
      (u = !0), (o = m);
    } finally {
      try {
        if (!s && r.return != null && ((i = r.return()), Object(i) !== i))
          return;
      } finally {
        if (u) throw o;
      }
    }
    return a;
  }
}
function Qg(e, t) {
  return t || (t = e.slice(0)), (e.raw = t), e;
}
function $g(e, t) {
  return Wg(e) || Hg(e, t) || Kg(e, t) || Vg();
}
function Wg(e) {
  if (Array.isArray(e)) return e;
}
function Kg(e, t) {
  if (e) {
    if (typeof e == 'string') return iu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e);
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return iu(e, t);
  }
}
function iu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Vg() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Gg = function (t) {
  return Yg(t) && !Jg(t);
};
function Yg(e) {
  return !!e && typeof e == 'object';
}
function Jg(e) {
  var t = Object.prototype.toString.call(e);
  return t === '[object RegExp]' || t === '[object Date]' || qg(e);
}
var Zg = typeof Symbol == 'function' && Symbol.for,
  Xg = Zg ? Symbol.for('react.element') : 60103;
function qg(e) {
  return e.$$typeof === Xg;
}
function e1(e) {
  return Array.isArray(e) ? [] : {};
}
function bn(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? yn(e1(e), e, t) : e;
}
function t1(e, t, r) {
  return e.concat(t).map(function (n) {
    return bn(n, r);
  });
}
function r1(e, t) {
  if (!t.customMerge) return yn;
  var r = t.customMerge(e);
  return typeof r == 'function' ? r : yn;
}
function n1(e) {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(e).filter(function (t) {
        return Object.propertyIsEnumerable.call(e, t);
      })
    : [];
}
function au(e) {
  return Object.keys(e).concat(n1(e));
}
function _0(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function o1(e, t) {
  return (
    _0(e, t) &&
    !(
      Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t)
    )
  );
}
function l1(e, t, r) {
  var n = {};
  return (
    r.isMergeableObject(e) &&
      au(e).forEach(function (o) {
        n[o] = bn(e[o], r);
      }),
    au(t).forEach(function (o) {
      o1(e, o) ||
        (_0(e, o) && r.isMergeableObject(t[o])
          ? (n[o] = r1(o, r)(e[o], t[o], r))
          : (n[o] = bn(t[o], r)));
    }),
    n
  );
}
function yn(e, t, r) {
  (r = r || {}),
    (r.arrayMerge = r.arrayMerge || t1),
    (r.isMergeableObject = r.isMergeableObject || Gg),
    (r.cloneUnlessOtherwiseSpecified = bn);
  var n = Array.isArray(t),
    o = Array.isArray(e),
    l = n === o;
  return l ? (n ? r.arrayMerge(e, t, r) : l1(e, t, r)) : bn(t, r);
}
yn.all = function (t, r) {
  if (!Array.isArray(t)) throw new Error('first argument should be an array');
  return t.reduce(function (n, o) {
    return yn(n, o, r);
  }, {});
};
var su,
  Ii = 16,
  Bo = 'px',
  Zr = 'em',
  Ca = 'rem',
  i1 = new RegExp(
    String.raw(su || (su = Qg(['-?d+(?:.d+|d*)'], ['-?\\d+(?:\\.\\d+|\\d*)'])))
  ),
  a1 = new RegExp(Bo + '|' + Zr + '|' + Ca);
function O0(e) {
  e === void 0 && (e = '');
  var t = e.match(new RegExp(i1.source + '(' + a1.source + ')'));
  return t && t[1];
}
function s1(e) {
  e === void 0 && (e = '');
  var t = O0(e);
  if (!t || t === Bo) return e;
  if (t === Zr || t === Ca) return '' + parseFloat(e) * Ii + Bo;
}
function U0(e, t) {
  e === void 0 && (e = ''), t === void 0 && (t = Ii);
  var r = O0(e);
  if (!r || r === Zr) return e;
  if (r === Bo) return '' + parseFloat(e) / t + Zr;
  if (r === Ca) return '' + (parseFloat(e) * Ii) / t + Zr;
}
function u1(e) {
  return Object.values(e).flatMap(function (t) {
    return Object.keys(t);
  });
}
function c1(e) {
  var t = Object.entries(e),
    r = t.length - 1;
  return Object.fromEntries(
    t.map(function (n, o) {
      var l = n,
        i = $g(l, 2),
        a = i[0],
        s = i[1],
        u = d1(s),
        m = uu(s),
        p = o === r ? u : u + ' and ' + uu(t[o + 1][1]);
      return [a, { up: u, down: m, only: p }];
    })
  );
}
function d1(e) {
  return '(min-width: ' + U0(e) + ')';
}
function uu(e) {
  var t,
    r = parseFloat((t = s1(e)) != null ? t : '') - 0.04;
  return '(max-width: ' + U0(r + 'px') + ')';
}
function f1(e) {
  return 'p-theme-' + e;
}
function m1(e) {
  var t = new Set(u1(e));
  return function (r) {
    return t.has(r);
  };
}
var H0 = 'light',
  ka = H0,
  g1 = [
    H0,
    'light-mobile',
    'light-high-contrast-experimental',
    'dark-experimental',
  ],
  Na = {
    light: {
      border: {
        'border-radius-0': '0rem',
        'border-radius-050': '0.125rem',
        'border-radius-100': '0.25rem',
        'border-radius-150': '0.375rem',
        'border-radius-200': '0.5rem',
        'border-radius-300': '0.75rem',
        'border-radius-400': '1rem',
        'border-radius-500': '1.25rem',
        'border-radius-750': '1.875rem',
        'border-radius-full': '624.9375rem',
        'border-width-0': '0rem',
        'border-width-0165': '0.04125rem',
        'border-width-025': '0.0625rem',
        'border-width-050': '0.125rem',
        'border-width-100': '0.25rem',
      },
      breakpoints: {
        'breakpoints-xs': '0rem',
        'breakpoints-sm': '30.625rem',
        'breakpoints-md': '48rem',
        'breakpoints-lg': '65rem',
        'breakpoints-xl': '90rem',
      },
      color: {
        'color-scheme': 'light',
        'color-bg': 'rgba(241, 241, 241, 1)',
        'color-bg-inverse': 'rgba(26, 26, 26, 1)',
        'color-bg-surface': 'rgba(255, 255, 255, 1)',
        'color-bg-surface-hover': 'rgba(247, 247, 247, 1)',
        'color-bg-surface-active': 'rgba(243, 243, 243, 1)',
        'color-bg-surface-selected': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-disabled': 'rgba(0, 0, 0, 0.05)',
        'color-bg-surface-secondary': 'rgba(247, 247, 247, 1)',
        'color-bg-surface-secondary-hover': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-secondary-active': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-secondary-selected': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-tertiary': 'rgba(243, 243, 243, 1)',
        'color-bg-surface-tertiary-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-tertiary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-surface-brand': 'rgba(227, 227, 227, 1)',
        'color-bg-surface-brand-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-brand-active': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-brand-selected': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-info': 'rgba(234, 244, 255, 1)',
        'color-bg-surface-info-hover': 'rgba(224, 240, 255, 1)',
        'color-bg-surface-info-active': 'rgba(202, 230, 255, 1)',
        'color-bg-surface-success': 'rgba(205, 254, 212, 1)',
        'color-bg-surface-success-hover': 'rgba(175, 254, 191, 1)',
        'color-bg-surface-success-active': 'rgba(146, 252, 172, 1)',
        'color-bg-surface-caution': 'rgba(255, 248, 219, 1)',
        'color-bg-surface-caution-hover': 'rgba(255, 244, 191, 1)',
        'color-bg-surface-caution-active': 'rgba(255, 239, 157, 1)',
        'color-bg-surface-warning': 'rgba(255, 241, 227, 1)',
        'color-bg-surface-warning-hover': 'rgba(255, 235, 213, 1)',
        'color-bg-surface-warning-active': 'rgba(255, 228, 198, 1)',
        'color-bg-surface-critical': 'rgba(254, 232, 235, 1)',
        'color-bg-surface-critical-hover': 'rgba(254, 225, 230, 1)',
        'color-bg-surface-critical-active': 'rgba(254, 217, 223, 1)',
        'color-bg-surface-emphasis': 'rgba(240, 242, 255, 1)',
        'color-bg-surface-emphasis-hover': 'rgba(234, 237, 255, 1)',
        'color-bg-surface-emphasis-active': 'rgba(226, 231, 255, 1)',
        'color-bg-surface-magic': 'rgba(248, 247, 255, 1)',
        'color-bg-surface-magic-hover': 'rgba(243, 241, 255, 1)',
        'color-bg-surface-magic-active': 'rgba(233, 229, 255, 1)',
        'color-bg-surface-inverse': 'rgba(48, 48, 48, 1)',
        'color-bg-surface-transparent': 'rgba(0, 0, 0, 0)',
        'color-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-bg-fill-hover': 'rgba(250, 250, 250, 1)',
        'color-bg-fill-active': 'rgba(247, 247, 247, 1)',
        'color-bg-fill-selected': 'rgba(204, 204, 204, 1)',
        'color-bg-fill-disabled': 'rgba(0, 0, 0, 0.05)',
        'color-bg-fill-secondary': 'rgba(241, 241, 241, 1)',
        'color-bg-fill-secondary-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-fill-secondary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-secondary-selected': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-tertiary': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-tertiary-hover': 'rgba(212, 212, 212, 1)',
        'color-bg-fill-tertiary-active': 'rgba(204, 204, 204, 1)',
        'color-bg-fill-brand': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-brand-hover': 'rgba(26, 26, 26, 1)',
        'color-bg-fill-brand-active': 'rgba(26, 26, 26, 1)',
        'color-bg-fill-brand-selected': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-brand-disabled': 'rgba(0, 0, 0, 0.17)',
        'color-bg-fill-info': 'rgba(145, 208, 255, 1)',
        'color-bg-fill-info-hover': 'rgba(81, 192, 255, 1)',
        'color-bg-fill-info-active': 'rgba(0, 148, 213, 1)',
        'color-bg-fill-info-secondary': 'rgba(213, 235, 255, 1)',
        'color-bg-fill-success': 'rgba(4, 123, 93, 1)',
        'color-bg-fill-success-hover': 'rgba(3, 94, 76, 1)',
        'color-bg-fill-success-active': 'rgba(1, 75, 64, 1)',
        'color-bg-fill-success-secondary': 'rgba(175, 254, 191, 1)',
        'color-bg-fill-warning': 'rgba(255, 184, 0, 1)',
        'color-bg-fill-warning-hover': 'rgba(229, 165, 0, 1)',
        'color-bg-fill-warning-active': 'rgba(178, 132, 0, 1)',
        'color-bg-fill-warning-secondary': 'rgba(255, 214, 164, 1)',
        'color-bg-fill-caution': 'rgba(255, 230, 0, 1)',
        'color-bg-fill-caution-hover': 'rgba(234, 211, 0, 1)',
        'color-bg-fill-caution-active': 'rgba(225, 203, 0, 1)',
        'color-bg-fill-caution-secondary': 'rgba(255, 235, 120, 1)',
        'color-bg-fill-critical': 'rgba(199, 10, 36, 1)',
        'color-bg-fill-critical-hover': 'rgba(163, 10, 36, 1)',
        'color-bg-fill-critical-active': 'rgba(142, 11, 33, 1)',
        'color-bg-fill-critical-selected': 'rgba(142, 11, 33, 1)',
        'color-bg-fill-critical-secondary': 'rgba(254, 209, 215, 1)',
        'color-bg-fill-emphasis': 'rgba(0, 91, 211, 1)',
        'color-bg-fill-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-bg-fill-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-bg-fill-magic': 'rgba(128, 81, 255, 1)',
        'color-bg-fill-magic-secondary': 'rgba(233, 229, 255, 1)',
        'color-bg-fill-magic-secondary-hover': 'rgba(228, 222, 255, 1)',
        'color-bg-fill-magic-secondary-active': 'rgba(223, 217, 255, 1)',
        'color-bg-fill-inverse': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-inverse-hover': 'rgba(74, 74, 74, 1)',
        'color-bg-fill-inverse-active': 'rgba(97, 97, 97, 1)',
        'color-bg-fill-transparent': 'rgba(0, 0, 0, 0.02)',
        'color-bg-fill-transparent-hover': 'rgba(0, 0, 0, 0.05)',
        'color-bg-fill-transparent-active': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-selected': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-secondary': 'rgba(0, 0, 0, 0.06)',
        'color-bg-fill-transparent-secondary-hover': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-secondary-active': 'rgba(0, 0, 0, 0.11)',
        'color-text': 'rgba(48, 48, 48, 1)',
        'color-text-secondary': 'rgba(97, 97, 97, 1)',
        'color-text-disabled': 'rgba(181, 181, 181, 1)',
        'color-text-link': 'rgba(0, 91, 211, 1)',
        'color-text-link-hover': 'rgba(0, 66, 153, 1)',
        'color-text-link-active': 'rgba(0, 46, 106, 1)',
        'color-text-brand': 'rgba(74, 74, 74, 1)',
        'color-text-brand-hover': 'rgba(48, 48, 48, 1)',
        'color-text-brand-on-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-text-brand-on-bg-fill-hover': 'rgba(227, 227, 227, 1)',
        'color-text-brand-on-bg-fill-active': 'rgba(204, 204, 204, 1)',
        'color-text-brand-on-bg-fill-disabled': 'rgba(255, 255, 255, 1)',
        'color-text-info': 'rgba(0, 58, 90, 1)',
        'color-text-info-hover': 'rgba(0, 58, 90, 1)',
        'color-text-info-active': 'rgba(0, 33, 51, 1)',
        'color-text-info-secondary': 'rgba(0, 124, 180, 1)',
        'color-text-info-on-bg-fill': 'rgba(0, 33, 51, 1)',
        'color-text-success': 'rgba(1, 75, 64, 1)',
        'color-text-success-hover': 'rgba(7, 54, 48, 1)',
        'color-text-success-active': 'rgba(2, 38, 34, 1)',
        'color-text-success-secondary': 'rgba(4, 123, 93, 1)',
        'color-text-success-on-bg-fill': 'rgba(250, 255, 251, 1)',
        'color-text-caution': 'rgba(79, 71, 0, 1)',
        'color-text-caution-hover': 'rgba(51, 46, 0, 1)',
        'color-text-caution-active': 'rgba(31, 28, 0, 1)',
        'color-text-caution-secondary': 'rgba(130, 117, 0, 1)',
        'color-text-caution-on-bg-fill': 'rgba(51, 46, 0, 1)',
        'color-text-warning': 'rgba(94, 66, 0, 1)',
        'color-text-warning-hover': 'rgba(65, 45, 0, 1)',
        'color-text-warning-active': 'rgba(37, 26, 0, 1)',
        'color-text-warning-secondary': 'rgba(149, 111, 0, 1)',
        'color-text-warning-on-bg-fill': 'rgba(37, 26, 0, 1)',
        'color-text-critical': 'rgba(142, 11, 33, 1)',
        'color-text-critical-hover': 'rgba(95, 7, 22, 1)',
        'color-text-critical-active': 'rgba(47, 4, 11, 1)',
        'color-text-critical-secondary': 'rgba(199, 10, 36, 1)',
        'color-text-critical-on-bg-fill': 'rgba(255, 250, 251, 1)',
        'color-text-emphasis': 'rgba(0, 91, 211, 1)',
        'color-text-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-text-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-text-emphasis-on-bg-fill': 'rgba(252, 253, 255, 1)',
        'color-text-emphasis-on-bg-fill-hover': 'rgba(226, 231, 255, 1)',
        'color-text-emphasis-on-bg-fill-active': 'rgba(213, 220, 255, 1)',
        'color-text-magic': 'rgba(87, 0, 209, 1)',
        'color-text-magic-secondary': 'rgba(113, 38, 255, 1)',
        'color-text-magic-on-bg-fill': 'rgba(253, 253, 255, 1)',
        'color-text-inverse': 'rgba(227, 227, 227, 1)',
        'color-text-inverse-secondary': 'rgba(181, 181, 181, 1)',
        'color-text-link-inverse': 'rgba(197, 208, 255, 1)',
        'color-border': 'rgba(227, 227, 227, 1)',
        'color-border-hover': 'rgba(204, 204, 204, 1)',
        'color-border-disabled': 'rgba(235, 235, 235, 1)',
        'color-border-secondary': 'rgba(235, 235, 235, 1)',
        'color-border-tertiary': 'rgba(204, 204, 204, 1)',
        'color-border-focus': 'rgba(0, 91, 211, 1)',
        'color-border-brand': 'rgba(227, 227, 227, 1)',
        'color-border-info': 'rgba(168, 216, 255, 1)',
        'color-border-success': 'rgba(146, 252, 172, 1)',
        'color-border-caution': 'rgba(255, 235, 120, 1)',
        'color-border-warning': 'rgba(255, 200, 121, 1)',
        'color-border-critical': 'rgba(254, 193, 199, 1)',
        'color-border-critical-secondary': 'rgba(142, 11, 33, 1)',
        'color-border-emphasis': 'rgba(0, 91, 211, 1)',
        'color-border-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-border-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-border-magic': 'rgba(228, 222, 255, 1)',
        'color-border-magic-secondary': 'rgba(148, 116, 255, 1)',
        'color-border-magic-secondary-hover': 'rgba(128, 81, 255, 1)',
        'color-border-inverse': 'rgba(97, 97, 97, 1)',
        'color-border-inverse-hover': 'rgba(204, 204, 204, 1)',
        'color-border-inverse-active': 'rgba(227, 227, 227, 1)',
        'color-tooltip-tail-down-border': 'rgba(212, 212, 212, 1)',
        'color-tooltip-tail-up-border': 'rgba(227, 227, 227, 1)',
        'color-icon': 'rgba(74, 74, 74, 1)',
        'color-icon-hover': 'rgba(48, 48, 48, 1)',
        'color-icon-active': 'rgba(26, 26, 26, 1)',
        'color-icon-disabled': 'rgba(204, 204, 204, 1)',
        'color-icon-secondary': 'rgba(138, 138, 138, 1)',
        'color-icon-secondary-hover': 'rgba(97, 97, 97, 1)',
        'color-icon-secondary-active': 'rgba(74, 74, 74, 1)',
        'color-icon-brand': 'rgba(26, 26, 26, 1)',
        'color-icon-info': 'rgba(0, 148, 213, 1)',
        'color-icon-success': 'rgba(4, 123, 93, 1)',
        'color-icon-caution': 'rgba(153, 138, 0, 1)',
        'color-icon-warning': 'rgba(178, 132, 0, 1)',
        'color-icon-critical': 'rgba(226, 44, 56, 1)',
        'color-icon-emphasis': 'rgba(0, 91, 211, 1)',
        'color-icon-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-icon-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-icon-magic': 'rgba(128, 81, 255, 1)',
        'color-icon-inverse': 'rgba(227, 227, 227, 1)',
        'color-avatar-bg-fill': 'rgba(181, 181, 181, 1)',
        'color-avatar-five-bg-fill': 'rgba(253, 75, 146, 1)',
        'color-avatar-five-text-on-bg-fill': 'rgba(255, 246, 248, 1)',
        'color-avatar-four-bg-fill': 'rgba(81, 192, 255, 1)',
        'color-avatar-four-text-on-bg-fill': 'rgba(0, 33, 51, 1)',
        'color-avatar-one-bg-fill': 'rgba(197, 48, 197, 1)',
        'color-avatar-one-text-on-bg-fill': 'rgba(253, 239, 253, 1)',
        'color-avatar-seven-bg-fill': 'rgba(148, 116, 255, 1)',
        'color-avatar-seven-text-on-bg-fill': 'rgba(248, 247, 255, 1)',
        'color-avatar-six-bg-fill': 'rgba(37, 232, 43, 1)',
        'color-avatar-six-text-on-bg-fill': 'rgba(3, 61, 5, 1)',
        'color-avatar-text-on-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-avatar-three-bg-fill': 'rgba(44, 224, 212, 1)',
        'color-avatar-three-text-on-bg-fill': 'rgba(3, 60, 57, 1)',
        'color-avatar-two-bg-fill': 'rgba(82, 244, 144, 1)',
        'color-avatar-two-text-on-bg-fill': 'rgba(1, 75, 64, 1)',
        'color-backdrop-bg': 'rgba(0, 0, 0, 0.71)',
        'color-button-gradient-bg-fill':
          'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)',
        'color-checkbox-bg-surface-disabled': 'rgba(0, 0, 0, 0.08)',
        'color-checkbox-icon-disabled': 'rgba(255, 255, 255, 1)',
        'color-input-bg-surface': 'rgba(253, 253, 253, 1)',
        'color-input-bg-surface-hover': 'rgba(250, 250, 250, 1)',
        'color-input-bg-surface-active': 'rgba(247, 247, 247, 1)',
        'color-input-border': 'rgba(138, 138, 138, 1)',
        'color-input-border-hover': 'rgba(97, 97, 97, 1)',
        'color-input-border-active': 'rgba(26, 26, 26, 1)',
        'color-nav-bg': 'rgba(235, 235, 235, 1)',
        'color-nav-bg-surface': 'rgba(0, 0, 0, 0.02)',
        'color-nav-bg-surface-hover': 'rgba(241, 241, 241, 1)',
        'color-nav-bg-surface-active': 'rgba(250, 250, 250, 1)',
        'color-nav-bg-surface-selected': 'rgba(250, 250, 250, 1)',
        'color-radio-button-bg-surface-disabled': 'rgba(0, 0, 0, 0.08)',
        'color-radio-button-icon-disabled': 'rgba(255, 255, 255, 1)',
        'color-video-thumbnail-play-button-bg-fill-hover':
          'rgba(0, 0, 0, 0.81)',
        'color-video-thumbnail-play-button-bg-fill': 'rgba(0, 0, 0, 0.71)',
        'color-video-thumbnail-play-button-text-on-bg-fill':
          'rgba(255, 255, 255, 1)',
        'color-scrollbar-thumb-bg-hover': 'rgba(138, 138, 138, 1)',
        'color-scrollbar-thumb-bg': 'rgba(181, 181, 181, 1)',
      },
      font: {
        'font-family-sans':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'font-family-mono':
          "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
        'font-size-275': '0.6875rem',
        'font-size-300': '0.75rem',
        'font-size-325': '0.8125rem',
        'font-size-350': '0.875rem',
        'font-size-400': '1rem',
        'font-size-450': '1.125rem',
        'font-size-500': '1.25rem',
        'font-size-550': '1.375rem',
        'font-size-600': '1.5rem',
        'font-size-750': '1.875rem',
        'font-size-800': '2rem',
        'font-size-900': '2.25rem',
        'font-size-1000': '2.5rem',
        'font-weight-regular': '450',
        'font-weight-medium': '550',
        'font-weight-semibold': '650',
        'font-weight-bold': '700',
        'font-letter-spacing-densest': '-0.03375rem',
        'font-letter-spacing-denser': '-0.01875rem',
        'font-letter-spacing-dense': '-0.0125rem',
        'font-letter-spacing-normal': '0rem',
        'font-line-height-300': '0.75rem',
        'font-line-height-400': '1rem',
        'font-line-height-500': '1.25rem',
        'font-line-height-600': '1.5rem',
        'font-line-height-700': '1.75rem',
        'font-line-height-800': '2rem',
        'font-line-height-1000': '2.5rem',
        'font-line-height-1200': '3rem',
      },
      height: {
        'height-0': '0rem',
        'height-025': '0.0625rem',
        'height-050': '0.125rem',
        'height-100': '0.25rem',
        'height-150': '0.375rem',
        'height-200': '0.5rem',
        'height-300': '0.75rem',
        'height-400': '1rem',
        'height-500': '1.25rem',
        'height-600': '1.5rem',
        'height-700': '1.75rem',
        'height-800': '2rem',
        'height-900': '2.25rem',
        'height-1000': '2.5rem',
        'height-1200': '3rem',
        'height-1600': '4rem',
        'height-2000': '5rem',
        'height-2400': '6rem',
        'height-2800': '7rem',
        'height-3200': '8rem',
      },
      motion: {
        'motion-duration-0': '0ms',
        'motion-duration-50': '50ms',
        'motion-duration-100': '100ms',
        'motion-duration-150': '150ms',
        'motion-duration-200': '200ms',
        'motion-duration-250': '250ms',
        'motion-duration-300': '300ms',
        'motion-duration-350': '350ms',
        'motion-duration-400': '400ms',
        'motion-duration-450': '450ms',
        'motion-duration-500': '500ms',
        'motion-duration-5000': '5000ms',
        'motion-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'motion-ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
        'motion-ease-out': 'cubic-bezier(0.19, 0.91, 0.38, 1)',
        'motion-ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
        'motion-linear': 'cubic-bezier(0, 0, 1, 1)',
        'motion-keyframes-bounce':
          '{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }',
        'motion-keyframes-fade-in': '{ to { opacity: 1 } }',
        'motion-keyframes-pulse':
          '{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }',
        'motion-keyframes-spin': '{ to { transform: rotate(1turn) } }',
        'motion-keyframes-appear-above':
          '{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }',
        'motion-keyframes-appear-below':
          '{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }',
      },
      shadow: {
        'shadow-0': 'none',
        'shadow-100': '0rem 0.0625rem 0rem 0rem rgba(26, 26, 26, 0.07)',
        'shadow-200':
          '0rem 0.1875rem 0.0625rem -0.0625rem rgba(26, 26, 26, 0.07)',
        'shadow-300': '0rem 0.25rem 0.375rem -0.125rem rgba(26, 26, 26, 0.20)',
        'shadow-400': '0rem 0.5rem 1rem -0.25rem rgba(26, 26, 26, 0.22)',
        'shadow-500': '0rem 0.75rem 1.25rem -0.5rem rgba(26, 26, 26, 0.24)',
        'shadow-600': '0rem 1.25rem 1.25rem -0.5rem rgba(26, 26, 26, 0.28)',
        'shadow-bevel-100':
          '0.0625rem 0rem 0rem 0rem rgba(0, 0, 0, 0.13) inset, -0.0625rem 0rem 0rem 0rem rgba(0, 0, 0, 0.13) inset, 0rem -0.0625rem 0rem 0rem rgba(0, 0, 0, 0.17) inset, 0rem 0.0625rem 0rem 0rem rgba(204, 204, 204, 0.5) inset',
        'shadow-inset-100':
          '0rem 0.0625rem 0.125rem 0rem rgba(26, 26, 26, 0.15) inset, 0rem 0.0625rem 0.0625rem 0rem rgba(26, 26, 26, 0.15) inset',
        'shadow-inset-200':
          '0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.20) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset, -0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset',
        'shadow-button':
          '0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset',
        'shadow-button-hover':
          '0rem 0.0625rem 0rem 0rem #EBEBEB inset, -0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0rem -0.0625rem 0rem 0rem #CCC inset',
        'shadow-button-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.2) inset',
        'shadow-button-primary':
          '0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset;',
        'shadow-button-primary-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.24) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.0625rem 0rem 0rem #000 inset, 0rem -0.0625rem 0rem 0.0625rem #1A1A1A',
        'shadow-button-primary-inset':
          '0rem 0.1875rem 0rem 0rem rgb(0, 0, 0) inset',
        'shadow-button-primary-critical':
          '0rem -0.0625rem 0rem 0.0625rem rgba(142, 31, 11, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(181, 38, 11, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.349) inset',
        'shadow-button-primary-critical-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset',
        'shadow-button-primary-critical-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset',
        'shadow-button-primary-success':
          '0rem -0.0625rem 0rem 0.0625rem rgba(12, 81, 50, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(19, 111, 69, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.251) inset',
        'shadow-button-primary-success-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset',
        'shadow-button-primary-success-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset',
        'shadow-border-inset':
          '0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.08) inset',
      },
      space: {
        'space-0': '0rem',
        'space-025': '0.0625rem',
        'space-050': '0.125rem',
        'space-100': '0.25rem',
        'space-150': '0.375rem',
        'space-200': '0.5rem',
        'space-300': '0.75rem',
        'space-400': '1rem',
        'space-500': '1.25rem',
        'space-600': '1.5rem',
        'space-800': '2rem',
        'space-1000': '2.5rem',
        'space-1200': '3rem',
        'space-1600': '4rem',
        'space-2000': '5rem',
        'space-2400': '6rem',
        'space-2800': '7rem',
        'space-3200': '8rem',
        'space-button-group-gap': '0.5rem',
        'space-card-gap': '1rem',
        'space-card-padding': '1rem',
        'space-table-cell-padding': '0.375rem',
      },
      text: {
        'text-heading-3xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-3xl-font-size': '2.25rem',
        'text-heading-3xl-font-weight': '700',
        'text-heading-3xl-font-letter-spacing': '-0.03375rem',
        'text-heading-3xl-font-line-height': '3rem',
        'text-heading-2xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-2xl-font-size': '1.875rem',
        'text-heading-2xl-font-weight': '700',
        'text-heading-2xl-font-letter-spacing': '-0.01875rem',
        'text-heading-2xl-font-line-height': '2.5rem',
        'text-heading-xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-xl-font-size': '1.5rem',
        'text-heading-xl-font-weight': '700',
        'text-heading-xl-font-letter-spacing': '-0.0125rem',
        'text-heading-xl-font-line-height': '2rem',
        'text-heading-lg-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-lg-font-size': '1.25rem',
        'text-heading-lg-font-weight': '650',
        'text-heading-lg-font-letter-spacing': '-0.0125rem',
        'text-heading-lg-font-line-height': '1.5rem',
        'text-heading-md-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-md-font-size': '0.875rem',
        'text-heading-md-font-weight': '650',
        'text-heading-md-font-letter-spacing': '0rem',
        'text-heading-md-font-line-height': '1.25rem',
        'text-heading-sm-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-sm-font-size': '0.8125rem',
        'text-heading-sm-font-weight': '650',
        'text-heading-sm-font-letter-spacing': '0rem',
        'text-heading-sm-font-line-height': '1.25rem',
        'text-heading-xs-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-xs-font-size': '0.75rem',
        'text-heading-xs-font-weight': '650',
        'text-heading-xs-font-letter-spacing': '0rem',
        'text-heading-xs-font-line-height': '1rem',
        'text-body-lg-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-lg-font-size': '0.875rem',
        'text-body-lg-font-weight': '450',
        'text-body-lg-font-letter-spacing': '0rem',
        'text-body-lg-font-line-height': '1.25rem',
        'text-body-md-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-md-font-size': '0.8125rem',
        'text-body-md-font-weight': '450',
        'text-body-md-font-letter-spacing': '0rem',
        'text-body-md-font-line-height': '1.25rem',
        'text-body-sm-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-sm-font-size': '0.75rem',
        'text-body-sm-font-weight': '450',
        'text-body-sm-font-letter-spacing': '0rem',
        'text-body-sm-font-line-height': '1rem',
        'text-body-xs-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-xs-font-size': '0.6875rem',
        'text-body-xs-font-weight': '450',
        'text-body-xs-font-letter-spacing': '0rem',
        'text-body-xs-font-line-height': '0.75rem',
      },
      width: {
        'width-0': '0rem',
        'width-025': '0.0625rem',
        'width-050': '0.125rem',
        'width-100': '0.25rem',
        'width-150': '0.375rem',
        'width-200': '0.5rem',
        'width-300': '0.75rem',
        'width-400': '1rem',
        'width-500': '1.25rem',
        'width-600': '1.5rem',
        'width-700': '1.75rem',
        'width-800': '2rem',
        'width-900': '2.25rem',
        'width-1000': '2.5rem',
        'width-1200': '3rem',
        'width-1600': '4rem',
        'width-2000': '5rem',
        'width-2400': '6rem',
        'width-2800': '7rem',
        'width-3200': '8rem',
      },
      zIndex: {
        'z-index-0': 'auto',
        'z-index-1': '100',
        'z-index-2': '400',
        'z-index-3': '510',
        'z-index-4': '512',
        'z-index-5': '513',
        'z-index-6': '514',
        'z-index-7': '515',
        'z-index-8': '516',
        'z-index-9': '517',
        'z-index-10': '518',
        'z-index-11': '519',
        'z-index-12': '520',
      },
    },
    'light-mobile': {
      border: {
        'border-radius-0': '0rem',
        'border-radius-050': '0.125rem',
        'border-radius-100': '0.25rem',
        'border-radius-150': '0.375rem',
        'border-radius-200': '0.5rem',
        'border-radius-300': '0.75rem',
        'border-radius-400': '1rem',
        'border-radius-500': '1.25rem',
        'border-radius-750': '1.875rem',
        'border-radius-full': '624.9375rem',
        'border-width-0': '0rem',
        'border-width-0165': '0.04125rem',
        'border-width-025': '0.0625rem',
        'border-width-050': '0.125rem',
        'border-width-100': '0.25rem',
      },
      breakpoints: {
        'breakpoints-xs': '0rem',
        'breakpoints-sm': '30.625rem',
        'breakpoints-md': '48rem',
        'breakpoints-lg': '65rem',
        'breakpoints-xl': '90rem',
      },
      color: {
        'color-scheme': 'light',
        'color-bg': 'rgba(241, 241, 241, 1)',
        'color-bg-inverse': 'rgba(26, 26, 26, 1)',
        'color-bg-surface': 'rgba(255, 255, 255, 1)',
        'color-bg-surface-hover': 'rgba(247, 247, 247, 1)',
        'color-bg-surface-active': 'rgba(243, 243, 243, 1)',
        'color-bg-surface-selected': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-disabled': 'rgba(0, 0, 0, 0.05)',
        'color-bg-surface-secondary': 'rgba(247, 247, 247, 1)',
        'color-bg-surface-secondary-hover': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-secondary-active': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-secondary-selected': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-tertiary': 'rgba(243, 243, 243, 1)',
        'color-bg-surface-tertiary-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-tertiary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-surface-brand': 'rgba(227, 227, 227, 1)',
        'color-bg-surface-brand-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-brand-active': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-brand-selected': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-info': 'rgba(234, 244, 255, 1)',
        'color-bg-surface-info-hover': 'rgba(224, 240, 255, 1)',
        'color-bg-surface-info-active': 'rgba(202, 230, 255, 1)',
        'color-bg-surface-success': 'rgba(205, 254, 212, 1)',
        'color-bg-surface-success-hover': 'rgba(175, 254, 191, 1)',
        'color-bg-surface-success-active': 'rgba(146, 252, 172, 1)',
        'color-bg-surface-caution': 'rgba(255, 248, 219, 1)',
        'color-bg-surface-caution-hover': 'rgba(255, 244, 191, 1)',
        'color-bg-surface-caution-active': 'rgba(255, 239, 157, 1)',
        'color-bg-surface-warning': 'rgba(255, 241, 227, 1)',
        'color-bg-surface-warning-hover': 'rgba(255, 235, 213, 1)',
        'color-bg-surface-warning-active': 'rgba(255, 228, 198, 1)',
        'color-bg-surface-critical': 'rgba(254, 232, 235, 1)',
        'color-bg-surface-critical-hover': 'rgba(254, 225, 230, 1)',
        'color-bg-surface-critical-active': 'rgba(254, 217, 223, 1)',
        'color-bg-surface-emphasis': 'rgba(240, 242, 255, 1)',
        'color-bg-surface-emphasis-hover': 'rgba(234, 237, 255, 1)',
        'color-bg-surface-emphasis-active': 'rgba(226, 231, 255, 1)',
        'color-bg-surface-magic': 'rgba(248, 247, 255, 1)',
        'color-bg-surface-magic-hover': 'rgba(243, 241, 255, 1)',
        'color-bg-surface-magic-active': 'rgba(233, 229, 255, 1)',
        'color-bg-surface-inverse': 'rgba(48, 48, 48, 1)',
        'color-bg-surface-transparent': 'rgba(0, 0, 0, 0)',
        'color-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-bg-fill-hover': 'rgba(250, 250, 250, 1)',
        'color-bg-fill-active': 'rgba(247, 247, 247, 1)',
        'color-bg-fill-selected': 'rgba(204, 204, 204, 1)',
        'color-bg-fill-disabled': 'rgba(0, 0, 0, 0.05)',
        'color-bg-fill-secondary': 'rgba(241, 241, 241, 1)',
        'color-bg-fill-secondary-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-fill-secondary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-secondary-selected': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-tertiary': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-tertiary-hover': 'rgba(212, 212, 212, 1)',
        'color-bg-fill-tertiary-active': 'rgba(204, 204, 204, 1)',
        'color-bg-fill-brand': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-brand-hover': 'rgba(26, 26, 26, 1)',
        'color-bg-fill-brand-active': 'rgba(26, 26, 26, 1)',
        'color-bg-fill-brand-selected': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-brand-disabled': 'rgba(0, 0, 0, 0.17)',
        'color-bg-fill-info': 'rgba(145, 208, 255, 1)',
        'color-bg-fill-info-hover': 'rgba(81, 192, 255, 1)',
        'color-bg-fill-info-active': 'rgba(0, 148, 213, 1)',
        'color-bg-fill-info-secondary': 'rgba(213, 235, 255, 1)',
        'color-bg-fill-success': 'rgba(4, 123, 93, 1)',
        'color-bg-fill-success-hover': 'rgba(3, 94, 76, 1)',
        'color-bg-fill-success-active': 'rgba(1, 75, 64, 1)',
        'color-bg-fill-success-secondary': 'rgba(175, 254, 191, 1)',
        'color-bg-fill-warning': 'rgba(255, 184, 0, 1)',
        'color-bg-fill-warning-hover': 'rgba(229, 165, 0, 1)',
        'color-bg-fill-warning-active': 'rgba(178, 132, 0, 1)',
        'color-bg-fill-warning-secondary': 'rgba(255, 214, 164, 1)',
        'color-bg-fill-caution': 'rgba(255, 230, 0, 1)',
        'color-bg-fill-caution-hover': 'rgba(234, 211, 0, 1)',
        'color-bg-fill-caution-active': 'rgba(225, 203, 0, 1)',
        'color-bg-fill-caution-secondary': 'rgba(255, 235, 120, 1)',
        'color-bg-fill-critical': 'rgba(199, 10, 36, 1)',
        'color-bg-fill-critical-hover': 'rgba(163, 10, 36, 1)',
        'color-bg-fill-critical-active': 'rgba(142, 11, 33, 1)',
        'color-bg-fill-critical-selected': 'rgba(142, 11, 33, 1)',
        'color-bg-fill-critical-secondary': 'rgba(254, 209, 215, 1)',
        'color-bg-fill-emphasis': 'rgba(0, 91, 211, 1)',
        'color-bg-fill-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-bg-fill-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-bg-fill-magic': 'rgba(128, 81, 255, 1)',
        'color-bg-fill-magic-secondary': 'rgba(233, 229, 255, 1)',
        'color-bg-fill-magic-secondary-hover': 'rgba(228, 222, 255, 1)',
        'color-bg-fill-magic-secondary-active': 'rgba(223, 217, 255, 1)',
        'color-bg-fill-inverse': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-inverse-hover': 'rgba(74, 74, 74, 1)',
        'color-bg-fill-inverse-active': 'rgba(97, 97, 97, 1)',
        'color-bg-fill-transparent': 'rgba(0, 0, 0, 0.02)',
        'color-bg-fill-transparent-hover': 'rgba(0, 0, 0, 0.05)',
        'color-bg-fill-transparent-active': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-selected': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-secondary': 'rgba(0, 0, 0, 0.06)',
        'color-bg-fill-transparent-secondary-hover': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-secondary-active': 'rgba(0, 0, 0, 0.11)',
        'color-text': 'rgba(48, 48, 48, 1)',
        'color-text-secondary': 'rgba(97, 97, 97, 1)',
        'color-text-disabled': 'rgba(181, 181, 181, 1)',
        'color-text-link': 'rgba(0, 91, 211, 1)',
        'color-text-link-hover': 'rgba(0, 66, 153, 1)',
        'color-text-link-active': 'rgba(0, 46, 106, 1)',
        'color-text-brand': 'rgba(74, 74, 74, 1)',
        'color-text-brand-hover': 'rgba(48, 48, 48, 1)',
        'color-text-brand-on-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-text-brand-on-bg-fill-hover': 'rgba(227, 227, 227, 1)',
        'color-text-brand-on-bg-fill-active': 'rgba(204, 204, 204, 1)',
        'color-text-brand-on-bg-fill-disabled': 'rgba(255, 255, 255, 1)',
        'color-text-info': 'rgba(0, 58, 90, 1)',
        'color-text-info-hover': 'rgba(0, 58, 90, 1)',
        'color-text-info-active': 'rgba(0, 33, 51, 1)',
        'color-text-info-secondary': 'rgba(0, 124, 180, 1)',
        'color-text-info-on-bg-fill': 'rgba(0, 33, 51, 1)',
        'color-text-success': 'rgba(1, 75, 64, 1)',
        'color-text-success-hover': 'rgba(7, 54, 48, 1)',
        'color-text-success-active': 'rgba(2, 38, 34, 1)',
        'color-text-success-secondary': 'rgba(4, 123, 93, 1)',
        'color-text-success-on-bg-fill': 'rgba(250, 255, 251, 1)',
        'color-text-caution': 'rgba(79, 71, 0, 1)',
        'color-text-caution-hover': 'rgba(51, 46, 0, 1)',
        'color-text-caution-active': 'rgba(31, 28, 0, 1)',
        'color-text-caution-secondary': 'rgba(130, 117, 0, 1)',
        'color-text-caution-on-bg-fill': 'rgba(51, 46, 0, 1)',
        'color-text-warning': 'rgba(94, 66, 0, 1)',
        'color-text-warning-hover': 'rgba(65, 45, 0, 1)',
        'color-text-warning-active': 'rgba(37, 26, 0, 1)',
        'color-text-warning-secondary': 'rgba(149, 111, 0, 1)',
        'color-text-warning-on-bg-fill': 'rgba(37, 26, 0, 1)',
        'color-text-critical': 'rgba(142, 11, 33, 1)',
        'color-text-critical-hover': 'rgba(95, 7, 22, 1)',
        'color-text-critical-active': 'rgba(47, 4, 11, 1)',
        'color-text-critical-secondary': 'rgba(199, 10, 36, 1)',
        'color-text-critical-on-bg-fill': 'rgba(255, 250, 251, 1)',
        'color-text-emphasis': 'rgba(0, 91, 211, 1)',
        'color-text-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-text-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-text-emphasis-on-bg-fill': 'rgba(252, 253, 255, 1)',
        'color-text-emphasis-on-bg-fill-hover': 'rgba(226, 231, 255, 1)',
        'color-text-emphasis-on-bg-fill-active': 'rgba(213, 220, 255, 1)',
        'color-text-magic': 'rgba(87, 0, 209, 1)',
        'color-text-magic-secondary': 'rgba(113, 38, 255, 1)',
        'color-text-magic-on-bg-fill': 'rgba(253, 253, 255, 1)',
        'color-text-inverse': 'rgba(227, 227, 227, 1)',
        'color-text-inverse-secondary': 'rgba(181, 181, 181, 1)',
        'color-text-link-inverse': 'rgba(197, 208, 255, 1)',
        'color-border': 'rgba(227, 227, 227, 1)',
        'color-border-hover': 'rgba(204, 204, 204, 1)',
        'color-border-disabled': 'rgba(235, 235, 235, 1)',
        'color-border-secondary': 'rgba(235, 235, 235, 1)',
        'color-border-tertiary': 'rgba(204, 204, 204, 1)',
        'color-border-focus': 'rgba(0, 91, 211, 1)',
        'color-border-brand': 'rgba(227, 227, 227, 1)',
        'color-border-info': 'rgba(168, 216, 255, 1)',
        'color-border-success': 'rgba(146, 252, 172, 1)',
        'color-border-caution': 'rgba(255, 235, 120, 1)',
        'color-border-warning': 'rgba(255, 200, 121, 1)',
        'color-border-critical': 'rgba(254, 193, 199, 1)',
        'color-border-critical-secondary': 'rgba(142, 11, 33, 1)',
        'color-border-emphasis': 'rgba(0, 91, 211, 1)',
        'color-border-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-border-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-border-magic': 'rgba(228, 222, 255, 1)',
        'color-border-magic-secondary': 'rgba(148, 116, 255, 1)',
        'color-border-magic-secondary-hover': 'rgba(128, 81, 255, 1)',
        'color-border-inverse': 'rgba(97, 97, 97, 1)',
        'color-border-inverse-hover': 'rgba(204, 204, 204, 1)',
        'color-border-inverse-active': 'rgba(227, 227, 227, 1)',
        'color-tooltip-tail-down-border': 'rgba(212, 212, 212, 1)',
        'color-tooltip-tail-up-border': 'rgba(227, 227, 227, 1)',
        'color-icon': 'rgba(74, 74, 74, 1)',
        'color-icon-hover': 'rgba(48, 48, 48, 1)',
        'color-icon-active': 'rgba(26, 26, 26, 1)',
        'color-icon-disabled': 'rgba(204, 204, 204, 1)',
        'color-icon-secondary': 'rgba(138, 138, 138, 1)',
        'color-icon-secondary-hover': 'rgba(97, 97, 97, 1)',
        'color-icon-secondary-active': 'rgba(74, 74, 74, 1)',
        'color-icon-brand': 'rgba(26, 26, 26, 1)',
        'color-icon-info': 'rgba(0, 148, 213, 1)',
        'color-icon-success': 'rgba(4, 123, 93, 1)',
        'color-icon-caution': 'rgba(153, 138, 0, 1)',
        'color-icon-warning': 'rgba(178, 132, 0, 1)',
        'color-icon-critical': 'rgba(226, 44, 56, 1)',
        'color-icon-emphasis': 'rgba(0, 91, 211, 1)',
        'color-icon-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-icon-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-icon-magic': 'rgba(128, 81, 255, 1)',
        'color-icon-inverse': 'rgba(227, 227, 227, 1)',
        'color-avatar-bg-fill': 'rgba(181, 181, 181, 1)',
        'color-avatar-five-bg-fill': 'rgba(253, 75, 146, 1)',
        'color-avatar-five-text-on-bg-fill': 'rgba(255, 246, 248, 1)',
        'color-avatar-four-bg-fill': 'rgba(81, 192, 255, 1)',
        'color-avatar-four-text-on-bg-fill': 'rgba(0, 33, 51, 1)',
        'color-avatar-one-bg-fill': 'rgba(197, 48, 197, 1)',
        'color-avatar-one-text-on-bg-fill': 'rgba(253, 239, 253, 1)',
        'color-avatar-seven-bg-fill': 'rgba(148, 116, 255, 1)',
        'color-avatar-seven-text-on-bg-fill': 'rgba(248, 247, 255, 1)',
        'color-avatar-six-bg-fill': 'rgba(37, 232, 43, 1)',
        'color-avatar-six-text-on-bg-fill': 'rgba(3, 61, 5, 1)',
        'color-avatar-text-on-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-avatar-three-bg-fill': 'rgba(44, 224, 212, 1)',
        'color-avatar-three-text-on-bg-fill': 'rgba(3, 60, 57, 1)',
        'color-avatar-two-bg-fill': 'rgba(82, 244, 144, 1)',
        'color-avatar-two-text-on-bg-fill': 'rgba(1, 75, 64, 1)',
        'color-backdrop-bg': 'rgba(0, 0, 0, 0.71)',
        'color-button-gradient-bg-fill': 'none',
        'color-checkbox-bg-surface-disabled': 'rgba(0, 0, 0, 0.08)',
        'color-checkbox-icon-disabled': 'rgba(255, 255, 255, 1)',
        'color-input-bg-surface': 'rgba(253, 253, 253, 1)',
        'color-input-bg-surface-hover': 'rgba(250, 250, 250, 1)',
        'color-input-bg-surface-active': 'rgba(247, 247, 247, 1)',
        'color-input-border': 'rgba(138, 138, 138, 1)',
        'color-input-border-hover': 'rgba(97, 97, 97, 1)',
        'color-input-border-active': 'rgba(26, 26, 26, 1)',
        'color-nav-bg': 'rgba(235, 235, 235, 1)',
        'color-nav-bg-surface': 'rgba(0, 0, 0, 0.02)',
        'color-nav-bg-surface-hover': 'rgba(241, 241, 241, 1)',
        'color-nav-bg-surface-active': 'rgba(250, 250, 250, 1)',
        'color-nav-bg-surface-selected': 'rgba(250, 250, 250, 1)',
        'color-radio-button-bg-surface-disabled': 'rgba(0, 0, 0, 0.08)',
        'color-radio-button-icon-disabled': 'rgba(255, 255, 255, 1)',
        'color-video-thumbnail-play-button-bg-fill-hover':
          'rgba(0, 0, 0, 0.81)',
        'color-video-thumbnail-play-button-bg-fill': 'rgba(0, 0, 0, 0.71)',
        'color-video-thumbnail-play-button-text-on-bg-fill':
          'rgba(255, 255, 255, 1)',
        'color-scrollbar-thumb-bg-hover': 'rgba(138, 138, 138, 1)',
        'color-scrollbar-thumb-bg': 'rgba(181, 181, 181, 1)',
      },
      font: {
        'font-family-sans':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'font-family-mono':
          "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
        'font-size-275': '0.6875rem',
        'font-size-300': '0.75rem',
        'font-size-325': '0.8125rem',
        'font-size-350': '0.875rem',
        'font-size-400': '1rem',
        'font-size-450': '1.125rem',
        'font-size-500': '1.25rem',
        'font-size-550': '1.375rem',
        'font-size-600': '1.5rem',
        'font-size-750': '1.875rem',
        'font-size-800': '2rem',
        'font-size-900': '2.25rem',
        'font-size-1000': '2.5rem',
        'font-weight-regular': '450',
        'font-weight-medium': '550',
        'font-weight-semibold': '650',
        'font-weight-bold': '700',
        'font-letter-spacing-densest': '-0.03375rem',
        'font-letter-spacing-denser': '-0.01875rem',
        'font-letter-spacing-dense': '-0.0125rem',
        'font-letter-spacing-normal': '0rem',
        'font-line-height-300': '0.75rem',
        'font-line-height-400': '1rem',
        'font-line-height-500': '1.25rem',
        'font-line-height-600': '1.5rem',
        'font-line-height-700': '1.75rem',
        'font-line-height-800': '2rem',
        'font-line-height-1000': '2.5rem',
        'font-line-height-1200': '3rem',
      },
      height: {
        'height-0': '0rem',
        'height-025': '0.0625rem',
        'height-050': '0.125rem',
        'height-100': '0.25rem',
        'height-150': '0.375rem',
        'height-200': '0.5rem',
        'height-300': '0.75rem',
        'height-400': '1rem',
        'height-500': '1.25rem',
        'height-600': '1.5rem',
        'height-700': '1.75rem',
        'height-800': '2rem',
        'height-900': '2.25rem',
        'height-1000': '2.5rem',
        'height-1200': '3rem',
        'height-1600': '4rem',
        'height-2000': '5rem',
        'height-2400': '6rem',
        'height-2800': '7rem',
        'height-3200': '8rem',
      },
      motion: {
        'motion-duration-0': '0ms',
        'motion-duration-50': '50ms',
        'motion-duration-100': '100ms',
        'motion-duration-150': '150ms',
        'motion-duration-200': '200ms',
        'motion-duration-250': '250ms',
        'motion-duration-300': '300ms',
        'motion-duration-350': '350ms',
        'motion-duration-400': '400ms',
        'motion-duration-450': '450ms',
        'motion-duration-500': '500ms',
        'motion-duration-5000': '5000ms',
        'motion-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'motion-ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
        'motion-ease-out': 'cubic-bezier(0.19, 0.91, 0.38, 1)',
        'motion-ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
        'motion-linear': 'cubic-bezier(0, 0, 1, 1)',
        'motion-keyframes-bounce':
          '{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }',
        'motion-keyframes-fade-in': '{ to { opacity: 1 } }',
        'motion-keyframes-pulse':
          '{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }',
        'motion-keyframes-spin': '{ to { transform: rotate(1turn) } }',
        'motion-keyframes-appear-above':
          '{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }',
        'motion-keyframes-appear-below':
          '{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }',
      },
      shadow: {
        'shadow-0': 'none',
        'shadow-100': 'none',
        'shadow-200':
          '0rem 0.1875rem 0.0625rem -0.0625rem rgba(26, 26, 26, 0.07)',
        'shadow-300': '0rem 0.25rem 0.375rem -0.125rem rgba(26, 26, 26, 0.20)',
        'shadow-400': '0rem 0.5rem 1rem -0.25rem rgba(26, 26, 26, 0.22)',
        'shadow-500': '0rem 0.75rem 1.25rem -0.5rem rgba(26, 26, 26, 0.24)',
        'shadow-600': '0rem 1.25rem 1.25rem -0.5rem rgba(26, 26, 26, 0.28)',
        'shadow-bevel-100': 'none',
        'shadow-inset-100':
          '0rem 0.0625rem 0.125rem 0rem rgba(26, 26, 26, 0.15) inset, 0rem 0.0625rem 0.0625rem 0rem rgba(26, 26, 26, 0.15) inset',
        'shadow-inset-200':
          '0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.20) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset, -0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset',
        'shadow-button':
          '0 0 0 var(--p-border-width-025) var(--p-color-border) inset',
        'shadow-button-hover':
          '0 0 0 var(--p-border-width-025) var(--p-color-border) inset',
        'shadow-button-inset':
          '0 0 0 var(--p-border-width-025) var(--p-color-border) inset',
        'shadow-button-primary': 'none',
        'shadow-button-primary-hover': 'none',
        'shadow-button-primary-inset': 'none',
        'shadow-button-primary-critical': 'none',
        'shadow-button-primary-critical-hover': 'none',
        'shadow-button-primary-critical-inset': 'none',
        'shadow-button-primary-success': 'none',
        'shadow-button-primary-success-hover': 'none',
        'shadow-button-primary-success-inset': 'none',
        'shadow-border-inset':
          '0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.08) inset',
      },
      space: {
        'space-0': '0rem',
        'space-025': '0.0625rem',
        'space-050': '0.125rem',
        'space-100': '0.25rem',
        'space-150': '0.375rem',
        'space-200': '0.5rem',
        'space-300': '0.75rem',
        'space-400': '1rem',
        'space-500': '1.25rem',
        'space-600': '1.5rem',
        'space-800': '2rem',
        'space-1000': '2.5rem',
        'space-1200': '3rem',
        'space-1600': '4rem',
        'space-2000': '5rem',
        'space-2400': '6rem',
        'space-2800': '7rem',
        'space-3200': '8rem',
        'space-button-group-gap': '0.5rem',
        'space-card-gap': '0.5rem',
        'space-card-padding': '1rem',
        'space-table-cell-padding': '0.375rem',
      },
      text: {
        'text-heading-3xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-3xl-font-size': '2.25rem',
        'text-heading-3xl-font-weight': '700',
        'text-heading-3xl-font-letter-spacing': '-0.03375rem',
        'text-heading-3xl-font-line-height': '3rem',
        'text-heading-2xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-2xl-font-size': '2rem',
        'text-heading-2xl-font-weight': '700',
        'text-heading-2xl-font-letter-spacing': '-0.01875rem',
        'text-heading-2xl-font-line-height': '2.5rem',
        'text-heading-xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-xl-font-size': '1.375rem',
        'text-heading-xl-font-weight': '700',
        'text-heading-xl-font-letter-spacing': '-0.0125rem',
        'text-heading-xl-font-line-height': '1.75rem',
        'text-heading-lg-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-lg-font-size': '1.125rem',
        'text-heading-lg-font-weight': '650',
        'text-heading-lg-font-letter-spacing': '-0.0125rem',
        'text-heading-lg-font-line-height': '1.5rem',
        'text-heading-md-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-md-font-size': '1rem',
        'text-heading-md-font-weight': '650',
        'text-heading-md-font-letter-spacing': '0rem',
        'text-heading-md-font-line-height': '1.25rem',
        'text-heading-sm-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-sm-font-size': '0.875rem',
        'text-heading-sm-font-weight': '650',
        'text-heading-sm-font-letter-spacing': '0rem',
        'text-heading-sm-font-line-height': '1.25rem',
        'text-heading-xs-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-xs-font-size': '0.75rem',
        'text-heading-xs-font-weight': '650',
        'text-heading-xs-font-letter-spacing': '0rem',
        'text-heading-xs-font-line-height': '1rem',
        'text-body-lg-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-lg-font-size': '1.125rem',
        'text-body-lg-font-weight': '450',
        'text-body-lg-font-letter-spacing': '0rem',
        'text-body-lg-font-line-height': '1.75rem',
        'text-body-md-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-md-font-size': '1rem',
        'text-body-md-font-weight': '450',
        'text-body-md-font-letter-spacing': '0rem',
        'text-body-md-font-line-height': '1.5rem',
        'text-body-sm-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-sm-font-size': '0.875rem',
        'text-body-sm-font-weight': '450',
        'text-body-sm-font-letter-spacing': '0rem',
        'text-body-sm-font-line-height': '1.25rem',
        'text-body-xs-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-xs-font-size': '0.75rem',
        'text-body-xs-font-weight': '450',
        'text-body-xs-font-letter-spacing': '0rem',
        'text-body-xs-font-line-height': '1rem',
      },
      width: {
        'width-0': '0rem',
        'width-025': '0.0625rem',
        'width-050': '0.125rem',
        'width-100': '0.25rem',
        'width-150': '0.375rem',
        'width-200': '0.5rem',
        'width-300': '0.75rem',
        'width-400': '1rem',
        'width-500': '1.25rem',
        'width-600': '1.5rem',
        'width-700': '1.75rem',
        'width-800': '2rem',
        'width-900': '2.25rem',
        'width-1000': '2.5rem',
        'width-1200': '3rem',
        'width-1600': '4rem',
        'width-2000': '5rem',
        'width-2400': '6rem',
        'width-2800': '7rem',
        'width-3200': '8rem',
      },
      zIndex: {
        'z-index-0': 'auto',
        'z-index-1': '100',
        'z-index-2': '400',
        'z-index-3': '510',
        'z-index-4': '512',
        'z-index-5': '513',
        'z-index-6': '514',
        'z-index-7': '515',
        'z-index-8': '516',
        'z-index-9': '517',
        'z-index-10': '518',
        'z-index-11': '519',
        'z-index-12': '520',
      },
    },
    'light-high-contrast-experimental': {
      border: {
        'border-radius-0': '0rem',
        'border-radius-050': '0.125rem',
        'border-radius-100': '0.25rem',
        'border-radius-150': '0.375rem',
        'border-radius-200': '0.5rem',
        'border-radius-300': '0.75rem',
        'border-radius-400': '1rem',
        'border-radius-500': '1.25rem',
        'border-radius-750': '1.875rem',
        'border-radius-full': '624.9375rem',
        'border-width-0': '0rem',
        'border-width-0165': '0.04125rem',
        'border-width-025': '0.0625rem',
        'border-width-050': '0.125rem',
        'border-width-100': '0.25rem',
      },
      breakpoints: {
        'breakpoints-xs': '0rem',
        'breakpoints-sm': '30.625rem',
        'breakpoints-md': '48rem',
        'breakpoints-lg': '65rem',
        'breakpoints-xl': '90rem',
      },
      color: {
        'color-scheme': 'light',
        'color-bg': 'rgba(241, 241, 241, 1)',
        'color-bg-inverse': 'rgba(26, 26, 26, 1)',
        'color-bg-surface': 'rgba(255, 255, 255, 1)',
        'color-bg-surface-hover': 'rgba(247, 247, 247, 1)',
        'color-bg-surface-active': 'rgba(243, 243, 243, 1)',
        'color-bg-surface-selected': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-disabled': 'rgba(0, 0, 0, 0.05)',
        'color-bg-surface-secondary': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-secondary-hover': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-secondary-active': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-secondary-selected': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-tertiary': 'rgba(243, 243, 243, 1)',
        'color-bg-surface-tertiary-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-tertiary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-surface-brand': 'rgba(227, 227, 227, 1)',
        'color-bg-surface-brand-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-brand-active': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-brand-selected': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-info': 'rgba(234, 244, 255, 1)',
        'color-bg-surface-info-hover': 'rgba(224, 240, 255, 1)',
        'color-bg-surface-info-active': 'rgba(202, 230, 255, 1)',
        'color-bg-surface-success': 'rgba(205, 254, 212, 1)',
        'color-bg-surface-success-hover': 'rgba(175, 254, 191, 1)',
        'color-bg-surface-success-active': 'rgba(146, 252, 172, 1)',
        'color-bg-surface-caution': 'rgba(255, 248, 219, 1)',
        'color-bg-surface-caution-hover': 'rgba(255, 244, 191, 1)',
        'color-bg-surface-caution-active': 'rgba(255, 239, 157, 1)',
        'color-bg-surface-warning': 'rgba(255, 241, 227, 1)',
        'color-bg-surface-warning-hover': 'rgba(255, 235, 213, 1)',
        'color-bg-surface-warning-active': 'rgba(255, 228, 198, 1)',
        'color-bg-surface-critical': 'rgba(254, 232, 235, 1)',
        'color-bg-surface-critical-hover': 'rgba(254, 225, 230, 1)',
        'color-bg-surface-critical-active': 'rgba(254, 217, 223, 1)',
        'color-bg-surface-emphasis': 'rgba(240, 242, 255, 1)',
        'color-bg-surface-emphasis-hover': 'rgba(234, 237, 255, 1)',
        'color-bg-surface-emphasis-active': 'rgba(226, 231, 255, 1)',
        'color-bg-surface-magic': 'rgba(248, 247, 255, 1)',
        'color-bg-surface-magic-hover': 'rgba(243, 241, 255, 1)',
        'color-bg-surface-magic-active': 'rgba(233, 229, 255, 1)',
        'color-bg-surface-inverse': 'rgba(48, 48, 48, 1)',
        'color-bg-surface-transparent': 'rgba(0, 0, 0, 0)',
        'color-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-bg-fill-hover': 'rgba(250, 250, 250, 1)',
        'color-bg-fill-active': 'rgba(247, 247, 247, 1)',
        'color-bg-fill-selected': 'rgba(204, 204, 204, 1)',
        'color-bg-fill-disabled': 'rgba(0, 0, 0, 0.05)',
        'color-bg-fill-secondary': 'rgba(241, 241, 241, 1)',
        'color-bg-fill-secondary-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-fill-secondary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-secondary-selected': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-tertiary': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-tertiary-hover': 'rgba(212, 212, 212, 1)',
        'color-bg-fill-tertiary-active': 'rgba(204, 204, 204, 1)',
        'color-bg-fill-brand': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-brand-hover': 'rgba(26, 26, 26, 1)',
        'color-bg-fill-brand-active': 'rgba(26, 26, 26, 1)',
        'color-bg-fill-brand-selected': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-brand-disabled': 'rgba(0, 0, 0, 0.17)',
        'color-bg-fill-info': 'rgba(145, 208, 255, 1)',
        'color-bg-fill-info-hover': 'rgba(81, 192, 255, 1)',
        'color-bg-fill-info-active': 'rgba(0, 148, 213, 1)',
        'color-bg-fill-info-secondary': 'rgba(213, 235, 255, 1)',
        'color-bg-fill-success': 'rgba(4, 123, 93, 1)',
        'color-bg-fill-success-hover': 'rgba(3, 94, 76, 1)',
        'color-bg-fill-success-active': 'rgba(1, 75, 64, 1)',
        'color-bg-fill-success-secondary': 'rgba(175, 254, 191, 1)',
        'color-bg-fill-warning': 'rgba(255, 184, 0, 1)',
        'color-bg-fill-warning-hover': 'rgba(229, 165, 0, 1)',
        'color-bg-fill-warning-active': 'rgba(178, 132, 0, 1)',
        'color-bg-fill-warning-secondary': 'rgba(255, 214, 164, 1)',
        'color-bg-fill-caution': 'rgba(255, 230, 0, 1)',
        'color-bg-fill-caution-hover': 'rgba(234, 211, 0, 1)',
        'color-bg-fill-caution-active': 'rgba(225, 203, 0, 1)',
        'color-bg-fill-caution-secondary': 'rgba(255, 235, 120, 1)',
        'color-bg-fill-critical': 'rgba(199, 10, 36, 1)',
        'color-bg-fill-critical-hover': 'rgba(163, 10, 36, 1)',
        'color-bg-fill-critical-active': 'rgba(142, 11, 33, 1)',
        'color-bg-fill-critical-selected': 'rgba(142, 11, 33, 1)',
        'color-bg-fill-critical-secondary': 'rgba(254, 209, 215, 1)',
        'color-bg-fill-emphasis': 'rgba(0, 91, 211, 1)',
        'color-bg-fill-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-bg-fill-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-bg-fill-magic': 'rgba(128, 81, 255, 1)',
        'color-bg-fill-magic-secondary': 'rgba(233, 229, 255, 1)',
        'color-bg-fill-magic-secondary-hover': 'rgba(228, 222, 255, 1)',
        'color-bg-fill-magic-secondary-active': 'rgba(223, 217, 255, 1)',
        'color-bg-fill-inverse': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-inverse-hover': 'rgba(74, 74, 74, 1)',
        'color-bg-fill-inverse-active': 'rgba(97, 97, 97, 1)',
        'color-bg-fill-transparent': 'rgba(0, 0, 0, 0.02)',
        'color-bg-fill-transparent-hover': 'rgba(0, 0, 0, 0.05)',
        'color-bg-fill-transparent-active': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-selected': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-secondary': 'rgba(0, 0, 0, 0.06)',
        'color-bg-fill-transparent-secondary-hover': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-secondary-active': 'rgba(0, 0, 0, 0.11)',
        'color-text': 'rgba(26, 26, 26, 1)',
        'color-text-secondary': 'rgba(26, 26, 26, 1)',
        'color-text-disabled': 'rgba(181, 181, 181, 1)',
        'color-text-link': 'rgba(0, 91, 211, 1)',
        'color-text-link-hover': 'rgba(0, 66, 153, 1)',
        'color-text-link-active': 'rgba(0, 46, 106, 1)',
        'color-text-brand': 'rgba(26, 26, 26, 1)',
        'color-text-brand-hover': 'rgba(48, 48, 48, 1)',
        'color-text-brand-on-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-text-brand-on-bg-fill-hover': 'rgba(227, 227, 227, 1)',
        'color-text-brand-on-bg-fill-active': 'rgba(204, 204, 204, 1)',
        'color-text-brand-on-bg-fill-disabled': 'rgba(255, 255, 255, 1)',
        'color-text-info': 'rgba(0, 58, 90, 1)',
        'color-text-info-hover': 'rgba(0, 58, 90, 1)',
        'color-text-info-active': 'rgba(0, 33, 51, 1)',
        'color-text-info-secondary': 'rgba(0, 124, 180, 1)',
        'color-text-info-on-bg-fill': 'rgba(0, 33, 51, 1)',
        'color-text-success': 'rgba(1, 75, 64, 1)',
        'color-text-success-hover': 'rgba(7, 54, 48, 1)',
        'color-text-success-active': 'rgba(2, 38, 34, 1)',
        'color-text-success-secondary': 'rgba(4, 123, 93, 1)',
        'color-text-success-on-bg-fill': 'rgba(250, 255, 251, 1)',
        'color-text-caution': 'rgba(79, 71, 0, 1)',
        'color-text-caution-hover': 'rgba(51, 46, 0, 1)',
        'color-text-caution-active': 'rgba(31, 28, 0, 1)',
        'color-text-caution-secondary': 'rgba(130, 117, 0, 1)',
        'color-text-caution-on-bg-fill': 'rgba(51, 46, 0, 1)',
        'color-text-warning': 'rgba(94, 66, 0, 1)',
        'color-text-warning-hover': 'rgba(65, 45, 0, 1)',
        'color-text-warning-active': 'rgba(37, 26, 0, 1)',
        'color-text-warning-secondary': 'rgba(149, 111, 0, 1)',
        'color-text-warning-on-bg-fill': 'rgba(37, 26, 0, 1)',
        'color-text-critical': 'rgba(142, 11, 33, 1)',
        'color-text-critical-hover': 'rgba(95, 7, 22, 1)',
        'color-text-critical-active': 'rgba(47, 4, 11, 1)',
        'color-text-critical-secondary': 'rgba(199, 10, 36, 1)',
        'color-text-critical-on-bg-fill': 'rgba(255, 250, 251, 1)',
        'color-text-emphasis': 'rgba(0, 91, 211, 1)',
        'color-text-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-text-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-text-emphasis-on-bg-fill': 'rgba(252, 253, 255, 1)',
        'color-text-emphasis-on-bg-fill-hover': 'rgba(226, 231, 255, 1)',
        'color-text-emphasis-on-bg-fill-active': 'rgba(213, 220, 255, 1)',
        'color-text-magic': 'rgba(87, 0, 209, 1)',
        'color-text-magic-secondary': 'rgba(113, 38, 255, 1)',
        'color-text-magic-on-bg-fill': 'rgba(253, 253, 255, 1)',
        'color-text-inverse': 'rgba(227, 227, 227, 1)',
        'color-text-inverse-secondary': 'rgba(181, 181, 181, 1)',
        'color-text-link-inverse': 'rgba(197, 208, 255, 1)',
        'color-border': 'rgba(138, 138, 138, 1)',
        'color-border-hover': 'rgba(204, 204, 204, 1)',
        'color-border-disabled': 'rgba(235, 235, 235, 1)',
        'color-border-secondary': 'rgba(138, 138, 138, 1)',
        'color-border-tertiary': 'rgba(204, 204, 204, 1)',
        'color-border-focus': 'rgba(0, 91, 211, 1)',
        'color-border-brand': 'rgba(227, 227, 227, 1)',
        'color-border-info': 'rgba(168, 216, 255, 1)',
        'color-border-success': 'rgba(146, 252, 172, 1)',
        'color-border-caution': 'rgba(255, 235, 120, 1)',
        'color-border-warning': 'rgba(255, 200, 121, 1)',
        'color-border-critical': 'rgba(254, 193, 199, 1)',
        'color-border-critical-secondary': 'rgba(142, 11, 33, 1)',
        'color-border-emphasis': 'rgba(0, 91, 211, 1)',
        'color-border-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-border-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-border-magic': 'rgba(228, 222, 255, 1)',
        'color-border-magic-secondary': 'rgba(148, 116, 255, 1)',
        'color-border-magic-secondary-hover': 'rgba(128, 81, 255, 1)',
        'color-border-inverse': 'rgba(97, 97, 97, 1)',
        'color-border-inverse-hover': 'rgba(204, 204, 204, 1)',
        'color-border-inverse-active': 'rgba(227, 227, 227, 1)',
        'color-tooltip-tail-down-border': 'rgba(212, 212, 212, 1)',
        'color-tooltip-tail-up-border': 'rgba(227, 227, 227, 1)',
        'color-icon': 'rgba(74, 74, 74, 1)',
        'color-icon-hover': 'rgba(48, 48, 48, 1)',
        'color-icon-active': 'rgba(26, 26, 26, 1)',
        'color-icon-disabled': 'rgba(204, 204, 204, 1)',
        'color-icon-secondary': 'rgba(74, 74, 74, 1)',
        'color-icon-secondary-hover': 'rgba(97, 97, 97, 1)',
        'color-icon-secondary-active': 'rgba(74, 74, 74, 1)',
        'color-icon-brand': 'rgba(26, 26, 26, 1)',
        'color-icon-info': 'rgba(0, 148, 213, 1)',
        'color-icon-success': 'rgba(4, 123, 93, 1)',
        'color-icon-caution': 'rgba(153, 138, 0, 1)',
        'color-icon-warning': 'rgba(178, 132, 0, 1)',
        'color-icon-critical': 'rgba(226, 44, 56, 1)',
        'color-icon-emphasis': 'rgba(0, 91, 211, 1)',
        'color-icon-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-icon-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-icon-magic': 'rgba(128, 81, 255, 1)',
        'color-icon-inverse': 'rgba(227, 227, 227, 1)',
        'color-avatar-bg-fill': 'rgba(181, 181, 181, 1)',
        'color-avatar-five-bg-fill': 'rgba(253, 75, 146, 1)',
        'color-avatar-five-text-on-bg-fill': 'rgba(255, 246, 248, 1)',
        'color-avatar-four-bg-fill': 'rgba(81, 192, 255, 1)',
        'color-avatar-four-text-on-bg-fill': 'rgba(0, 33, 51, 1)',
        'color-avatar-one-bg-fill': 'rgba(197, 48, 197, 1)',
        'color-avatar-one-text-on-bg-fill': 'rgba(253, 239, 253, 1)',
        'color-avatar-seven-bg-fill': 'rgba(148, 116, 255, 1)',
        'color-avatar-seven-text-on-bg-fill': 'rgba(248, 247, 255, 1)',
        'color-avatar-six-bg-fill': 'rgba(37, 232, 43, 1)',
        'color-avatar-six-text-on-bg-fill': 'rgba(3, 61, 5, 1)',
        'color-avatar-text-on-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-avatar-three-bg-fill': 'rgba(44, 224, 212, 1)',
        'color-avatar-three-text-on-bg-fill': 'rgba(3, 60, 57, 1)',
        'color-avatar-two-bg-fill': 'rgba(82, 244, 144, 1)',
        'color-avatar-two-text-on-bg-fill': 'rgba(1, 75, 64, 1)',
        'color-backdrop-bg': 'rgba(0, 0, 0, 0.71)',
        'color-button-gradient-bg-fill':
          'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)',
        'color-checkbox-bg-surface-disabled': 'rgba(0, 0, 0, 0.08)',
        'color-checkbox-icon-disabled': 'rgba(255, 255, 255, 1)',
        'color-input-bg-surface': 'rgba(253, 253, 253, 1)',
        'color-input-bg-surface-hover': 'rgba(250, 250, 250, 1)',
        'color-input-bg-surface-active': 'rgba(247, 247, 247, 1)',
        'color-input-border': 'rgba(74, 74, 74, 1)',
        'color-input-border-hover': 'rgba(97, 97, 97, 1)',
        'color-input-border-active': 'rgba(26, 26, 26, 1)',
        'color-nav-bg': 'rgba(235, 235, 235, 1)',
        'color-nav-bg-surface': 'rgba(0, 0, 0, 0.02)',
        'color-nav-bg-surface-hover': 'rgba(241, 241, 241, 1)',
        'color-nav-bg-surface-active': 'rgba(250, 250, 250, 1)',
        'color-nav-bg-surface-selected': 'rgba(250, 250, 250, 1)',
        'color-radio-button-bg-surface-disabled': 'rgba(0, 0, 0, 0.08)',
        'color-radio-button-icon-disabled': 'rgba(255, 255, 255, 1)',
        'color-video-thumbnail-play-button-bg-fill-hover':
          'rgba(0, 0, 0, 0.81)',
        'color-video-thumbnail-play-button-bg-fill': 'rgba(0, 0, 0, 0.71)',
        'color-video-thumbnail-play-button-text-on-bg-fill':
          'rgba(255, 255, 255, 1)',
        'color-scrollbar-thumb-bg-hover': 'rgba(138, 138, 138, 1)',
        'color-scrollbar-thumb-bg': 'rgba(181, 181, 181, 1)',
      },
      font: {
        'font-family-sans':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'font-family-mono':
          "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
        'font-size-275': '0.6875rem',
        'font-size-300': '0.75rem',
        'font-size-325': '0.8125rem',
        'font-size-350': '0.875rem',
        'font-size-400': '1rem',
        'font-size-450': '1.125rem',
        'font-size-500': '1.25rem',
        'font-size-550': '1.375rem',
        'font-size-600': '1.5rem',
        'font-size-750': '1.875rem',
        'font-size-800': '2rem',
        'font-size-900': '2.25rem',
        'font-size-1000': '2.5rem',
        'font-weight-regular': '450',
        'font-weight-medium': '550',
        'font-weight-semibold': '650',
        'font-weight-bold': '700',
        'font-letter-spacing-densest': '-0.03375rem',
        'font-letter-spacing-denser': '-0.01875rem',
        'font-letter-spacing-dense': '-0.0125rem',
        'font-letter-spacing-normal': '0rem',
        'font-line-height-300': '0.75rem',
        'font-line-height-400': '1rem',
        'font-line-height-500': '1.25rem',
        'font-line-height-600': '1.5rem',
        'font-line-height-700': '1.75rem',
        'font-line-height-800': '2rem',
        'font-line-height-1000': '2.5rem',
        'font-line-height-1200': '3rem',
      },
      height: {
        'height-0': '0rem',
        'height-025': '0.0625rem',
        'height-050': '0.125rem',
        'height-100': '0.25rem',
        'height-150': '0.375rem',
        'height-200': '0.5rem',
        'height-300': '0.75rem',
        'height-400': '1rem',
        'height-500': '1.25rem',
        'height-600': '1.5rem',
        'height-700': '1.75rem',
        'height-800': '2rem',
        'height-900': '2.25rem',
        'height-1000': '2.5rem',
        'height-1200': '3rem',
        'height-1600': '4rem',
        'height-2000': '5rem',
        'height-2400': '6rem',
        'height-2800': '7rem',
        'height-3200': '8rem',
      },
      motion: {
        'motion-duration-0': '0ms',
        'motion-duration-50': '50ms',
        'motion-duration-100': '100ms',
        'motion-duration-150': '150ms',
        'motion-duration-200': '200ms',
        'motion-duration-250': '250ms',
        'motion-duration-300': '300ms',
        'motion-duration-350': '350ms',
        'motion-duration-400': '400ms',
        'motion-duration-450': '450ms',
        'motion-duration-500': '500ms',
        'motion-duration-5000': '5000ms',
        'motion-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'motion-ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
        'motion-ease-out': 'cubic-bezier(0.19, 0.91, 0.38, 1)',
        'motion-ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
        'motion-linear': 'cubic-bezier(0, 0, 1, 1)',
        'motion-keyframes-bounce':
          '{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }',
        'motion-keyframes-fade-in': '{ to { opacity: 1 } }',
        'motion-keyframes-pulse':
          '{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }',
        'motion-keyframes-spin': '{ to { transform: rotate(1turn) } }',
        'motion-keyframes-appear-above':
          '{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }',
        'motion-keyframes-appear-below':
          '{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }',
      },
      shadow: {
        'shadow-0': 'none',
        'shadow-100': '0rem 0.0625rem 0rem 0rem rgba(26, 26, 26, 0.07)',
        'shadow-200':
          '0rem 0.1875rem 0.0625rem -0.0625rem rgba(26, 26, 26, 0.07)',
        'shadow-300': '0rem 0.25rem 0.375rem -0.125rem rgba(26, 26, 26, 0.20)',
        'shadow-400': '0rem 0.5rem 1rem -0.25rem rgba(26, 26, 26, 0.22)',
        'shadow-500': '0rem 0.75rem 1.25rem -0.5rem rgba(26, 26, 26, 0.24)',
        'shadow-600': '0rem 1.25rem 1.25rem -0.5rem rgba(26, 26, 26, 0.28)',
        'shadow-bevel-100':
          '0rem 0.0625rem 0rem 0rem rgba(26, 26, 26, 0.07), 0rem 0.0625rem 0rem 0rem rgba(208, 208, 208, 0.40) inset, 0.0625rem 0rem 0rem 0rem #CCC inset, -0.0625rem 0rem 0rem 0rem #CCC inset, 0rem -0.0625rem 0rem 0rem #999 inset',
        'shadow-inset-100':
          '0rem 0.0625rem 0.125rem 0rem rgba(26, 26, 26, 0.15) inset, 0rem 0.0625rem 0.0625rem 0rem rgba(26, 26, 26, 0.15) inset',
        'shadow-inset-200':
          '0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.20) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset, -0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset',
        'shadow-button':
          '0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset',
        'shadow-button-hover':
          '0rem 0.0625rem 0rem 0rem #EBEBEB inset, -0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0rem -0.0625rem 0rem 0rem #CCC inset',
        'shadow-button-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.2) inset',
        'shadow-button-primary':
          '0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset;',
        'shadow-button-primary-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.24) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.0625rem 0rem 0rem #000 inset, 0rem -0.0625rem 0rem 0.0625rem #1A1A1A',
        'shadow-button-primary-inset':
          '0rem 0.1875rem 0rem 0rem rgb(0, 0, 0) inset',
        'shadow-button-primary-critical':
          '0rem -0.0625rem 0rem 0.0625rem rgba(142, 31, 11, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(181, 38, 11, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.349) inset',
        'shadow-button-primary-critical-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset',
        'shadow-button-primary-critical-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset',
        'shadow-button-primary-success':
          '0rem -0.0625rem 0rem 0.0625rem rgba(12, 81, 50, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(19, 111, 69, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.251) inset',
        'shadow-button-primary-success-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset',
        'shadow-button-primary-success-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset',
        'shadow-border-inset':
          '0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.08) inset',
      },
      space: {
        'space-0': '0rem',
        'space-025': '0.0625rem',
        'space-050': '0.125rem',
        'space-100': '0.25rem',
        'space-150': '0.375rem',
        'space-200': '0.5rem',
        'space-300': '0.75rem',
        'space-400': '1rem',
        'space-500': '1.25rem',
        'space-600': '1.5rem',
        'space-800': '2rem',
        'space-1000': '2.5rem',
        'space-1200': '3rem',
        'space-1600': '4rem',
        'space-2000': '5rem',
        'space-2400': '6rem',
        'space-2800': '7rem',
        'space-3200': '8rem',
        'space-button-group-gap': '0.5rem',
        'space-card-gap': '1rem',
        'space-card-padding': '1rem',
        'space-table-cell-padding': '0.375rem',
      },
      text: {
        'text-heading-3xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-3xl-font-size': '2.25rem',
        'text-heading-3xl-font-weight': '700',
        'text-heading-3xl-font-letter-spacing': '-0.03375rem',
        'text-heading-3xl-font-line-height': '3rem',
        'text-heading-2xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-2xl-font-size': '1.875rem',
        'text-heading-2xl-font-weight': '700',
        'text-heading-2xl-font-letter-spacing': '-0.01875rem',
        'text-heading-2xl-font-line-height': '2.5rem',
        'text-heading-xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-xl-font-size': '1.5rem',
        'text-heading-xl-font-weight': '700',
        'text-heading-xl-font-letter-spacing': '-0.0125rem',
        'text-heading-xl-font-line-height': '2rem',
        'text-heading-lg-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-lg-font-size': '1.25rem',
        'text-heading-lg-font-weight': '650',
        'text-heading-lg-font-letter-spacing': '-0.0125rem',
        'text-heading-lg-font-line-height': '1.5rem',
        'text-heading-md-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-md-font-size': '0.875rem',
        'text-heading-md-font-weight': '650',
        'text-heading-md-font-letter-spacing': '0rem',
        'text-heading-md-font-line-height': '1.25rem',
        'text-heading-sm-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-sm-font-size': '0.8125rem',
        'text-heading-sm-font-weight': '650',
        'text-heading-sm-font-letter-spacing': '0rem',
        'text-heading-sm-font-line-height': '1.25rem',
        'text-heading-xs-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-xs-font-size': '0.75rem',
        'text-heading-xs-font-weight': '650',
        'text-heading-xs-font-letter-spacing': '0rem',
        'text-heading-xs-font-line-height': '1rem',
        'text-body-lg-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-lg-font-size': '0.875rem',
        'text-body-lg-font-weight': '450',
        'text-body-lg-font-letter-spacing': '0rem',
        'text-body-lg-font-line-height': '1.25rem',
        'text-body-md-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-md-font-size': '0.8125rem',
        'text-body-md-font-weight': '450',
        'text-body-md-font-letter-spacing': '0rem',
        'text-body-md-font-line-height': '1.25rem',
        'text-body-sm-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-sm-font-size': '0.75rem',
        'text-body-sm-font-weight': '450',
        'text-body-sm-font-letter-spacing': '0rem',
        'text-body-sm-font-line-height': '1rem',
        'text-body-xs-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-xs-font-size': '0.6875rem',
        'text-body-xs-font-weight': '450',
        'text-body-xs-font-letter-spacing': '0rem',
        'text-body-xs-font-line-height': '0.75rem',
      },
      width: {
        'width-0': '0rem',
        'width-025': '0.0625rem',
        'width-050': '0.125rem',
        'width-100': '0.25rem',
        'width-150': '0.375rem',
        'width-200': '0.5rem',
        'width-300': '0.75rem',
        'width-400': '1rem',
        'width-500': '1.25rem',
        'width-600': '1.5rem',
        'width-700': '1.75rem',
        'width-800': '2rem',
        'width-900': '2.25rem',
        'width-1000': '2.5rem',
        'width-1200': '3rem',
        'width-1600': '4rem',
        'width-2000': '5rem',
        'width-2400': '6rem',
        'width-2800': '7rem',
        'width-3200': '8rem',
      },
      zIndex: {
        'z-index-0': 'auto',
        'z-index-1': '100',
        'z-index-2': '400',
        'z-index-3': '510',
        'z-index-4': '512',
        'z-index-5': '513',
        'z-index-6': '514',
        'z-index-7': '515',
        'z-index-8': '516',
        'z-index-9': '517',
        'z-index-10': '518',
        'z-index-11': '519',
        'z-index-12': '520',
      },
    },
    'dark-experimental': {
      border: {
        'border-radius-0': '0rem',
        'border-radius-050': '0.125rem',
        'border-radius-100': '0.25rem',
        'border-radius-150': '0.375rem',
        'border-radius-200': '0.5rem',
        'border-radius-300': '0.75rem',
        'border-radius-400': '1rem',
        'border-radius-500': '1.25rem',
        'border-radius-750': '1.875rem',
        'border-radius-full': '624.9375rem',
        'border-width-0': '0rem',
        'border-width-0165': '0.04125rem',
        'border-width-025': '0.0625rem',
        'border-width-050': '0.125rem',
        'border-width-100': '0.25rem',
      },
      breakpoints: {
        'breakpoints-xs': '0rem',
        'breakpoints-sm': '30.625rem',
        'breakpoints-md': '48rem',
        'breakpoints-lg': '65rem',
        'breakpoints-xl': '90rem',
      },
      color: {
        'color-scheme': 'dark',
        'color-bg': 'rgba(26, 26, 26, 1)',
        'color-bg-inverse': 'rgba(26, 26, 26, 1)',
        'color-bg-surface': 'rgba(48, 48, 48, 1)',
        'color-bg-surface-hover': 'rgba(74, 74, 74, 1)',
        'color-bg-surface-active': 'rgba(97, 97, 97, 1)',
        'color-bg-surface-selected': 'rgba(97, 97, 97, 1)',
        'color-bg-surface-disabled': 'rgba(0, 0, 0, 0.05)',
        'color-bg-surface-secondary': 'rgba(247, 247, 247, 1)',
        'color-bg-surface-secondary-hover': 'rgba(255, 255, 255, 0.06)',
        'color-bg-surface-secondary-active': 'rgba(255, 255, 255, 0.14)',
        'color-bg-surface-secondary-selected': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-tertiary': 'rgba(255, 255, 255, 0.08)',
        'color-bg-surface-tertiary-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-tertiary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-surface-brand': 'rgba(227, 227, 227, 1)',
        'color-bg-surface-brand-hover': 'rgba(235, 235, 235, 1)',
        'color-bg-surface-brand-active': 'rgba(241, 241, 241, 1)',
        'color-bg-surface-brand-selected': 'rgba(74, 74, 74, 1)',
        'color-bg-surface-info': 'rgba(234, 244, 255, 1)',
        'color-bg-surface-info-hover': 'rgba(224, 240, 255, 1)',
        'color-bg-surface-info-active': 'rgba(202, 230, 255, 1)',
        'color-bg-surface-success': 'rgba(205, 254, 212, 1)',
        'color-bg-surface-success-hover': 'rgba(175, 254, 191, 1)',
        'color-bg-surface-success-active': 'rgba(146, 252, 172, 1)',
        'color-bg-surface-caution': 'rgba(255, 248, 219, 1)',
        'color-bg-surface-caution-hover': 'rgba(255, 244, 191, 1)',
        'color-bg-surface-caution-active': 'rgba(255, 239, 157, 1)',
        'color-bg-surface-warning': 'rgba(255, 241, 227, 1)',
        'color-bg-surface-warning-hover': 'rgba(255, 235, 213, 1)',
        'color-bg-surface-warning-active': 'rgba(255, 228, 198, 1)',
        'color-bg-surface-critical': 'rgba(254, 232, 235, 1)',
        'color-bg-surface-critical-hover': 'rgba(254, 225, 230, 1)',
        'color-bg-surface-critical-active': 'rgba(254, 217, 223, 1)',
        'color-bg-surface-emphasis': 'rgba(240, 242, 255, 1)',
        'color-bg-surface-emphasis-hover': 'rgba(234, 237, 255, 1)',
        'color-bg-surface-emphasis-active': 'rgba(226, 231, 255, 1)',
        'color-bg-surface-magic': 'rgba(248, 247, 255, 1)',
        'color-bg-surface-magic-hover': 'rgba(243, 241, 255, 1)',
        'color-bg-surface-magic-active': 'rgba(233, 229, 255, 1)',
        'color-bg-surface-inverse': 'rgba(48, 48, 48, 1)',
        'color-bg-surface-transparent': 'rgba(0, 0, 0, 0)',
        'color-bg-fill': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-hover': 'rgba(255, 255, 255, 0.05)',
        'color-bg-fill-active': 'rgba(97, 97, 97, 1)',
        'color-bg-fill-selected': 'rgba(97, 97, 97, 1)',
        'color-bg-fill-disabled': 'rgba(255, 255, 255, 0.05)',
        'color-bg-fill-secondary': 'rgba(255, 255, 255, 0.08)',
        'color-bg-fill-secondary-hover': 'rgba(255, 255, 255, 0.11)',
        'color-bg-fill-secondary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-secondary-selected': 'rgba(255, 255, 255, 0.17)',
        'color-bg-fill-tertiary': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-tertiary-hover': 'rgba(212, 212, 212, 1)',
        'color-bg-fill-tertiary-active': 'rgba(204, 204, 204, 1)',
        'color-bg-fill-brand': 'rgba(255, 255, 255, 1)',
        'color-bg-fill-brand-hover': 'rgba(243, 243, 243, 1)',
        'color-bg-fill-brand-active': 'rgba(247, 247, 247, 1)',
        'color-bg-fill-brand-selected': 'rgba(212, 212, 212, 1)',
        'color-bg-fill-brand-disabled': 'rgba(255, 255, 255, 0.22)',
        'color-bg-fill-info': 'rgba(145, 208, 255, 1)',
        'color-bg-fill-info-hover': 'rgba(81, 192, 255, 1)',
        'color-bg-fill-info-active': 'rgba(0, 148, 213, 1)',
        'color-bg-fill-info-secondary': 'rgba(213, 235, 255, 1)',
        'color-bg-fill-success': 'rgba(4, 123, 93, 1)',
        'color-bg-fill-success-hover': 'rgba(3, 94, 76, 1)',
        'color-bg-fill-success-active': 'rgba(1, 75, 64, 1)',
        'color-bg-fill-success-secondary': 'rgba(175, 254, 191, 1)',
        'color-bg-fill-warning': 'rgba(255, 184, 0, 1)',
        'color-bg-fill-warning-hover': 'rgba(229, 165, 0, 1)',
        'color-bg-fill-warning-active': 'rgba(178, 132, 0, 1)',
        'color-bg-fill-warning-secondary': 'rgba(255, 214, 164, 1)',
        'color-bg-fill-caution': 'rgba(255, 230, 0, 1)',
        'color-bg-fill-caution-hover': 'rgba(234, 211, 0, 1)',
        'color-bg-fill-caution-active': 'rgba(225, 203, 0, 1)',
        'color-bg-fill-caution-secondary': 'rgba(255, 235, 120, 1)',
        'color-bg-fill-critical': 'rgba(199, 10, 36, 1)',
        'color-bg-fill-critical-hover': 'rgba(163, 10, 36, 1)',
        'color-bg-fill-critical-active': 'rgba(142, 11, 33, 1)',
        'color-bg-fill-critical-selected': 'rgba(142, 11, 33, 1)',
        'color-bg-fill-critical-secondary': 'rgba(254, 209, 215, 1)',
        'color-bg-fill-emphasis': 'rgba(0, 91, 211, 1)',
        'color-bg-fill-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-bg-fill-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-bg-fill-magic': 'rgba(128, 81, 255, 1)',
        'color-bg-fill-magic-secondary': 'rgba(233, 229, 255, 1)',
        'color-bg-fill-magic-secondary-hover': 'rgba(228, 222, 255, 1)',
        'color-bg-fill-magic-secondary-active': 'rgba(223, 217, 255, 1)',
        'color-bg-fill-inverse': 'rgba(48, 48, 48, 1)',
        'color-bg-fill-inverse-hover': 'rgba(74, 74, 74, 1)',
        'color-bg-fill-inverse-active': 'rgba(97, 97, 97, 1)',
        'color-bg-fill-transparent': 'rgba(255, 255, 255, 0.11)',
        'color-bg-fill-transparent-hover': 'rgba(255, 255, 255, 0.14)',
        'color-bg-fill-transparent-active': 'rgba(255, 255, 255, 0.17)',
        'color-bg-fill-transparent-selected': 'rgba(255, 255, 255, 0.22)',
        'color-bg-fill-transparent-secondary': 'rgba(0, 0, 0, 0.06)',
        'color-bg-fill-transparent-secondary-hover': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-secondary-active': 'rgba(0, 0, 0, 0.11)',
        'color-text': 'rgba(227, 227, 227, 1)',
        'color-text-secondary': 'rgba(181, 181, 181, 1)',
        'color-text-disabled': 'rgba(74, 74, 74, 1)',
        'color-text-link': 'rgba(0, 91, 211, 1)',
        'color-text-link-hover': 'rgba(0, 66, 153, 1)',
        'color-text-link-active': 'rgba(0, 46, 106, 1)',
        'color-text-brand': 'rgba(74, 74, 74, 1)',
        'color-text-brand-hover': 'rgba(48, 48, 48, 1)',
        'color-text-brand-on-bg-fill': 'rgba(48, 48, 48, 1)',
        'color-text-brand-on-bg-fill-hover': 'rgba(227, 227, 227, 1)',
        'color-text-brand-on-bg-fill-active': 'rgba(204, 204, 204, 1)',
        'color-text-brand-on-bg-fill-disabled': 'rgba(138, 138, 138, 1)',
        'color-text-info': 'rgba(0, 58, 90, 1)',
        'color-text-info-hover': 'rgba(0, 58, 90, 1)',
        'color-text-info-active': 'rgba(0, 33, 51, 1)',
        'color-text-info-secondary': 'rgba(0, 124, 180, 1)',
        'color-text-info-on-bg-fill': 'rgba(0, 33, 51, 1)',
        'color-text-success': 'rgba(1, 75, 64, 1)',
        'color-text-success-hover': 'rgba(7, 54, 48, 1)',
        'color-text-success-active': 'rgba(2, 38, 34, 1)',
        'color-text-success-secondary': 'rgba(4, 123, 93, 1)',
        'color-text-success-on-bg-fill': 'rgba(250, 255, 251, 1)',
        'color-text-caution': 'rgba(79, 71, 0, 1)',
        'color-text-caution-hover': 'rgba(51, 46, 0, 1)',
        'color-text-caution-active': 'rgba(31, 28, 0, 1)',
        'color-text-caution-secondary': 'rgba(130, 117, 0, 1)',
        'color-text-caution-on-bg-fill': 'rgba(51, 46, 0, 1)',
        'color-text-warning': 'rgba(94, 66, 0, 1)',
        'color-text-warning-hover': 'rgba(65, 45, 0, 1)',
        'color-text-warning-active': 'rgba(37, 26, 0, 1)',
        'color-text-warning-secondary': 'rgba(149, 111, 0, 1)',
        'color-text-warning-on-bg-fill': 'rgba(37, 26, 0, 1)',
        'color-text-critical': 'rgba(142, 11, 33, 1)',
        'color-text-critical-hover': 'rgba(95, 7, 22, 1)',
        'color-text-critical-active': 'rgba(47, 4, 11, 1)',
        'color-text-critical-secondary': 'rgba(199, 10, 36, 1)',
        'color-text-critical-on-bg-fill': 'rgba(255, 250, 251, 1)',
        'color-text-emphasis': 'rgba(0, 91, 211, 1)',
        'color-text-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-text-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-text-emphasis-on-bg-fill': 'rgba(252, 253, 255, 1)',
        'color-text-emphasis-on-bg-fill-hover': 'rgba(226, 231, 255, 1)',
        'color-text-emphasis-on-bg-fill-active': 'rgba(213, 220, 255, 1)',
        'color-text-magic': 'rgba(87, 0, 209, 1)',
        'color-text-magic-secondary': 'rgba(113, 38, 255, 1)',
        'color-text-magic-on-bg-fill': 'rgba(253, 253, 255, 1)',
        'color-text-inverse': 'rgba(227, 227, 227, 1)',
        'color-text-inverse-secondary': 'rgba(181, 181, 181, 1)',
        'color-text-link-inverse': 'rgba(197, 208, 255, 1)',
        'color-border': 'rgba(227, 227, 227, 1)',
        'color-border-hover': 'rgba(204, 204, 204, 1)',
        'color-border-disabled': 'rgba(235, 235, 235, 1)',
        'color-border-secondary': 'rgba(74, 74, 74, 1)',
        'color-border-tertiary': 'rgba(204, 204, 204, 1)',
        'color-border-focus': 'rgba(0, 91, 211, 1)',
        'color-border-brand': 'rgba(227, 227, 227, 1)',
        'color-border-info': 'rgba(168, 216, 255, 1)',
        'color-border-success': 'rgba(146, 252, 172, 1)',
        'color-border-caution': 'rgba(255, 235, 120, 1)',
        'color-border-warning': 'rgba(255, 200, 121, 1)',
        'color-border-critical': 'rgba(254, 193, 199, 1)',
        'color-border-critical-secondary': 'rgba(142, 11, 33, 1)',
        'color-border-emphasis': 'rgba(0, 91, 211, 1)',
        'color-border-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-border-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-border-magic': 'rgba(228, 222, 255, 1)',
        'color-border-magic-secondary': 'rgba(148, 116, 255, 1)',
        'color-border-magic-secondary-hover': 'rgba(128, 81, 255, 1)',
        'color-border-inverse': 'rgba(97, 97, 97, 1)',
        'color-border-inverse-hover': 'rgba(204, 204, 204, 1)',
        'color-border-inverse-active': 'rgba(227, 227, 227, 1)',
        'color-tooltip-tail-down-border': 'rgba(60, 60, 60, 1)',
        'color-tooltip-tail-up-border': 'rgba(71, 71, 71, 1)',
        'color-icon': 'rgba(227, 227, 227, 1)',
        'color-icon-hover': 'rgba(48, 48, 48, 1)',
        'color-icon-active': 'rgba(26, 26, 26, 1)',
        'color-icon-disabled': 'rgba(74, 74, 74, 1)',
        'color-icon-secondary': 'rgba(181, 181, 181, 1)',
        'color-icon-secondary-hover': 'rgba(97, 97, 97, 1)',
        'color-icon-secondary-active': 'rgba(74, 74, 74, 1)',
        'color-icon-brand': 'rgba(74, 74, 74, 1)',
        'color-icon-info': 'rgba(0, 148, 213, 1)',
        'color-icon-success': 'rgba(4, 123, 93, 1)',
        'color-icon-caution': 'rgba(153, 138, 0, 1)',
        'color-icon-warning': 'rgba(178, 132, 0, 1)',
        'color-icon-critical': 'rgba(226, 44, 56, 1)',
        'color-icon-emphasis': 'rgba(0, 91, 211, 1)',
        'color-icon-emphasis-hover': 'rgba(0, 66, 153, 1)',
        'color-icon-emphasis-active': 'rgba(0, 46, 106, 1)',
        'color-icon-magic': 'rgba(128, 81, 255, 1)',
        'color-icon-inverse': 'rgba(227, 227, 227, 1)',
        'color-avatar-bg-fill': 'rgba(181, 181, 181, 1)',
        'color-avatar-five-bg-fill': 'rgba(253, 75, 146, 1)',
        'color-avatar-five-text-on-bg-fill': 'rgba(255, 246, 248, 1)',
        'color-avatar-four-bg-fill': 'rgba(81, 192, 255, 1)',
        'color-avatar-four-text-on-bg-fill': 'rgba(0, 33, 51, 1)',
        'color-avatar-one-bg-fill': 'rgba(197, 48, 197, 1)',
        'color-avatar-one-text-on-bg-fill': 'rgba(253, 239, 253, 1)',
        'color-avatar-seven-bg-fill': 'rgba(148, 116, 255, 1)',
        'color-avatar-seven-text-on-bg-fill': 'rgba(248, 247, 255, 1)',
        'color-avatar-six-bg-fill': 'rgba(37, 232, 43, 1)',
        'color-avatar-six-text-on-bg-fill': 'rgba(3, 61, 5, 1)',
        'color-avatar-text-on-bg-fill': 'rgba(255, 255, 255, 1)',
        'color-avatar-three-bg-fill': 'rgba(44, 224, 212, 1)',
        'color-avatar-three-text-on-bg-fill': 'rgba(3, 60, 57, 1)',
        'color-avatar-two-bg-fill': 'rgba(82, 244, 144, 1)',
        'color-avatar-two-text-on-bg-fill': 'rgba(1, 75, 64, 1)',
        'color-backdrop-bg': 'rgba(0, 0, 0, 0.71)',
        'color-button-gradient-bg-fill':
          'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)',
        'color-checkbox-bg-surface-disabled': 'rgba(0, 0, 0, 0.08)',
        'color-checkbox-icon-disabled': 'rgba(255, 255, 255, 1)',
        'color-input-bg-surface': 'rgba(253, 253, 253, 1)',
        'color-input-bg-surface-hover': 'rgba(250, 250, 250, 1)',
        'color-input-bg-surface-active': 'rgba(247, 247, 247, 1)',
        'color-input-border': 'rgba(138, 138, 138, 1)',
        'color-input-border-hover': 'rgba(97, 97, 97, 1)',
        'color-input-border-active': 'rgba(26, 26, 26, 1)',
        'color-nav-bg': 'rgba(235, 235, 235, 1)',
        'color-nav-bg-surface': 'rgba(0, 0, 0, 0.02)',
        'color-nav-bg-surface-hover': 'rgba(241, 241, 241, 1)',
        'color-nav-bg-surface-active': 'rgba(250, 250, 250, 1)',
        'color-nav-bg-surface-selected': 'rgba(250, 250, 250, 1)',
        'color-radio-button-bg-surface-disabled': 'rgba(0, 0, 0, 0.08)',
        'color-radio-button-icon-disabled': 'rgba(255, 255, 255, 1)',
        'color-video-thumbnail-play-button-bg-fill-hover':
          'rgba(0, 0, 0, 0.81)',
        'color-video-thumbnail-play-button-bg-fill': 'rgba(0, 0, 0, 0.71)',
        'color-video-thumbnail-play-button-text-on-bg-fill':
          'rgba(255, 255, 255, 1)',
        'color-scrollbar-thumb-bg-hover': 'rgba(138, 138, 138, 1)',
        'color-scrollbar-thumb-bg': 'rgba(181, 181, 181, 1)',
      },
      font: {
        'font-family-sans':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'font-family-mono':
          "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
        'font-size-275': '0.6875rem',
        'font-size-300': '0.75rem',
        'font-size-325': '0.8125rem',
        'font-size-350': '0.875rem',
        'font-size-400': '1rem',
        'font-size-450': '1.125rem',
        'font-size-500': '1.25rem',
        'font-size-550': '1.375rem',
        'font-size-600': '1.5rem',
        'font-size-750': '1.875rem',
        'font-size-800': '2rem',
        'font-size-900': '2.25rem',
        'font-size-1000': '2.5rem',
        'font-weight-regular': '450',
        'font-weight-medium': '550',
        'font-weight-semibold': '650',
        'font-weight-bold': '700',
        'font-letter-spacing-densest': '-0.03375rem',
        'font-letter-spacing-denser': '-0.01875rem',
        'font-letter-spacing-dense': '-0.0125rem',
        'font-letter-spacing-normal': '0rem',
        'font-line-height-300': '0.75rem',
        'font-line-height-400': '1rem',
        'font-line-height-500': '1.25rem',
        'font-line-height-600': '1.5rem',
        'font-line-height-700': '1.75rem',
        'font-line-height-800': '2rem',
        'font-line-height-1000': '2.5rem',
        'font-line-height-1200': '3rem',
      },
      height: {
        'height-0': '0rem',
        'height-025': '0.0625rem',
        'height-050': '0.125rem',
        'height-100': '0.25rem',
        'height-150': '0.375rem',
        'height-200': '0.5rem',
        'height-300': '0.75rem',
        'height-400': '1rem',
        'height-500': '1.25rem',
        'height-600': '1.5rem',
        'height-700': '1.75rem',
        'height-800': '2rem',
        'height-900': '2.25rem',
        'height-1000': '2.5rem',
        'height-1200': '3rem',
        'height-1600': '4rem',
        'height-2000': '5rem',
        'height-2400': '6rem',
        'height-2800': '7rem',
        'height-3200': '8rem',
      },
      motion: {
        'motion-duration-0': '0ms',
        'motion-duration-50': '50ms',
        'motion-duration-100': '100ms',
        'motion-duration-150': '150ms',
        'motion-duration-200': '200ms',
        'motion-duration-250': '250ms',
        'motion-duration-300': '300ms',
        'motion-duration-350': '350ms',
        'motion-duration-400': '400ms',
        'motion-duration-450': '450ms',
        'motion-duration-500': '500ms',
        'motion-duration-5000': '5000ms',
        'motion-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'motion-ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
        'motion-ease-out': 'cubic-bezier(0.19, 0.91, 0.38, 1)',
        'motion-ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
        'motion-linear': 'cubic-bezier(0, 0, 1, 1)',
        'motion-keyframes-bounce':
          '{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }',
        'motion-keyframes-fade-in': '{ to { opacity: 1 } }',
        'motion-keyframes-pulse':
          '{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }',
        'motion-keyframes-spin': '{ to { transform: rotate(1turn) } }',
        'motion-keyframes-appear-above':
          '{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }',
        'motion-keyframes-appear-below':
          '{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }',
      },
      shadow: {
        'shadow-0': 'none',
        'shadow-100': '0rem 0.0625rem 0rem 0rem rgba(26, 26, 26, 0.07)',
        'shadow-200':
          '0rem 0.1875rem 0.0625rem -0.0625rem rgba(26, 26, 26, 0.07)',
        'shadow-300': '0rem 0.25rem 0.375rem -0.125rem rgba(26, 26, 26, 0.20)',
        'shadow-400': '0rem 0.5rem 1rem -0.25rem rgba(26, 26, 26, 0.22)',
        'shadow-500': '0rem 0.75rem 1.25rem -0.5rem rgba(26, 26, 26, 0.24)',
        'shadow-600': '0rem 1.25rem 1.25rem -0.5rem rgba(26, 26, 26, 0.28)',
        'shadow-bevel-100':
          '0.0625rem 0rem 0rem 0rem rgba(204, 204, 204, 0.08) inset, -0.0625rem 0rem 0rem 0rem rgba(204, 204, 204, 0.08) inset, 0rem -0.0625rem 0rem 0rem rgba(204, 204, 204, 0.08) inset, 0rem 0.0625rem 0rem 0rem rgba(204, 204, 204, 0.16) inset',
        'shadow-inset-100':
          '0rem 0.0625rem 0.125rem 0rem rgba(26, 26, 26, 0.15) inset, 0rem 0.0625rem 0.0625rem 0rem rgba(26, 26, 26, 0.15) inset',
        'shadow-inset-200':
          '0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.20) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset, -0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset',
        'shadow-button':
          '0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset',
        'shadow-button-hover':
          '0rem 0.0625rem 0rem 0rem #EBEBEB inset, -0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0rem -0.0625rem 0rem 0rem #CCC inset',
        'shadow-button-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.2) inset',
        'shadow-button-primary':
          '0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset;',
        'shadow-button-primary-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.24) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.0625rem 0rem 0rem #000 inset, 0rem -0.0625rem 0rem 0.0625rem #1A1A1A',
        'shadow-button-primary-inset':
          '0rem 0.1875rem 0rem 0rem rgb(0, 0, 0) inset',
        'shadow-button-primary-critical':
          '0rem -0.0625rem 0rem 0.0625rem rgba(142, 31, 11, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(181, 38, 11, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.349) inset',
        'shadow-button-primary-critical-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset',
        'shadow-button-primary-critical-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset',
        'shadow-button-primary-success':
          '0rem -0.0625rem 0rem 0.0625rem rgba(12, 81, 50, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(19, 111, 69, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.251) inset',
        'shadow-button-primary-success-hover':
          '0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset',
        'shadow-button-primary-success-inset':
          '-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset',
        'shadow-border-inset':
          '0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.08) inset',
      },
      space: {
        'space-0': '0rem',
        'space-025': '0.0625rem',
        'space-050': '0.125rem',
        'space-100': '0.25rem',
        'space-150': '0.375rem',
        'space-200': '0.5rem',
        'space-300': '0.75rem',
        'space-400': '1rem',
        'space-500': '1.25rem',
        'space-600': '1.5rem',
        'space-800': '2rem',
        'space-1000': '2.5rem',
        'space-1200': '3rem',
        'space-1600': '4rem',
        'space-2000': '5rem',
        'space-2400': '6rem',
        'space-2800': '7rem',
        'space-3200': '8rem',
        'space-button-group-gap': '0.5rem',
        'space-card-gap': '1rem',
        'space-card-padding': '1rem',
        'space-table-cell-padding': '0.375rem',
      },
      text: {
        'text-heading-3xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-3xl-font-size': '2.25rem',
        'text-heading-3xl-font-weight': '700',
        'text-heading-3xl-font-letter-spacing': '-0.03375rem',
        'text-heading-3xl-font-line-height': '3rem',
        'text-heading-2xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-2xl-font-size': '1.875rem',
        'text-heading-2xl-font-weight': '700',
        'text-heading-2xl-font-letter-spacing': '-0.01875rem',
        'text-heading-2xl-font-line-height': '2.5rem',
        'text-heading-xl-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-xl-font-size': '1.5rem',
        'text-heading-xl-font-weight': '700',
        'text-heading-xl-font-letter-spacing': '-0.0125rem',
        'text-heading-xl-font-line-height': '2rem',
        'text-heading-lg-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-lg-font-size': '1.25rem',
        'text-heading-lg-font-weight': '650',
        'text-heading-lg-font-letter-spacing': '-0.0125rem',
        'text-heading-lg-font-line-height': '1.5rem',
        'text-heading-md-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-md-font-size': '0.875rem',
        'text-heading-md-font-weight': '650',
        'text-heading-md-font-letter-spacing': '0rem',
        'text-heading-md-font-line-height': '1.25rem',
        'text-heading-sm-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-sm-font-size': '0.8125rem',
        'text-heading-sm-font-weight': '650',
        'text-heading-sm-font-letter-spacing': '0rem',
        'text-heading-sm-font-line-height': '1.25rem',
        'text-heading-xs-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-heading-xs-font-size': '0.75rem',
        'text-heading-xs-font-weight': '650',
        'text-heading-xs-font-letter-spacing': '0rem',
        'text-heading-xs-font-line-height': '1rem',
        'text-body-lg-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-lg-font-size': '0.875rem',
        'text-body-lg-font-weight': '450',
        'text-body-lg-font-letter-spacing': '0rem',
        'text-body-lg-font-line-height': '1.25rem',
        'text-body-md-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-md-font-size': '0.8125rem',
        'text-body-md-font-weight': '450',
        'text-body-md-font-letter-spacing': '0rem',
        'text-body-md-font-line-height': '1.25rem',
        'text-body-sm-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-sm-font-size': '0.75rem',
        'text-body-sm-font-weight': '450',
        'text-body-sm-font-letter-spacing': '0rem',
        'text-body-sm-font-line-height': '1rem',
        'text-body-xs-font-family':
          "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        'text-body-xs-font-size': '0.6875rem',
        'text-body-xs-font-weight': '450',
        'text-body-xs-font-letter-spacing': '0rem',
        'text-body-xs-font-line-height': '0.75rem',
      },
      width: {
        'width-0': '0rem',
        'width-025': '0.0625rem',
        'width-050': '0.125rem',
        'width-100': '0.25rem',
        'width-150': '0.375rem',
        'width-200': '0.5rem',
        'width-300': '0.75rem',
        'width-400': '1rem',
        'width-500': '1.25rem',
        'width-600': '1.5rem',
        'width-700': '1.75rem',
        'width-800': '2rem',
        'width-900': '2.25rem',
        'width-1000': '2.5rem',
        'width-1200': '3rem',
        'width-1600': '4rem',
        'width-2000': '5rem',
        'width-2400': '6rem',
        'width-2800': '7rem',
        'width-3200': '8rem',
      },
      zIndex: {
        'z-index-0': 'auto',
        'z-index-1': '100',
        'z-index-2': '400',
        'z-index-3': '510',
        'z-index-4': '512',
        'z-index-5': '513',
        'z-index-6': '514',
        'z-index-7': '515',
        'z-index-8': '516',
        'z-index-9': '517',
        'z-index-10': '518',
        'z-index-11': '519',
        'z-index-12': '520',
      },
    },
  },
  Q0 = Na[ka];
m1(Na[ka]);
const h1 = I.createContext(null),
  p1 = I.createContext(null);
function b1(e) {
  return Na[e];
}
const Zo = typeof window > 'u' || typeof document > 'u',
  $0 = { navigationBarCollapsed: '767.95px', stackedContent: '1039.95px' },
  W0 = {
    media: '',
    addListener: Mr,
    removeListener: Mr,
    matches: !1,
    onchange: Mr,
    addEventListener: Mr,
    removeEventListener: Mr,
    dispatchEvent: (e) => !0,
  };
function Mr() {}
function zl() {
  return Zo
    ? W0
    : window.matchMedia(`(max-width: ${$0.navigationBarCollapsed})`);
}
function y1() {
  return Zo ? W0 : window.matchMedia(`(max-width: ${$0.stackedContent})`);
}
const v1 = new Set(),
  x1 = A1(Q0.breakpoints);
Zo ||
  x1.forEach(([e, t]) => {
    const r = (o) => {
        for (const l of v1) l(e, o.matches);
      },
      n = window.matchMedia(t);
    n.addListener ? n.addListener(r) : n.addEventListener('change', r);
  });
function A1(e) {
  return Object.entries(c1(e))
    .map(([r, n]) =>
      Object.entries(n).map(([o, l]) => [`${r.split('-')[1]}${w1(o)}`, l])
    )
    .flat();
}
function w1(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ti(e, t, r) {
  let n,
    o,
    l,
    i,
    a,
    s,
    u = 0,
    m = !1,
    p = !1,
    h = !0;
  const y = !t && t !== 0;
  if (typeof e != 'function') throw new TypeError('Expected a function');
  const x = t || 0;
  typeof r == 'object' &&
    ((m = !!r.leading),
    (p = 'maxWait' in r),
    (l = p ? Math.max(Number(r.maxWait) || 0, x) : void 0),
    (h = 'trailing' in r ? !!r.trailing : h));
  function w(T) {
    const $ = n,
      Ae = o;
    return (n = void 0), (o = void 0), (u = T), (i = e.apply(Ae, $)), i;
  }
  function P(T, $) {
    return y
      ? (cancelAnimationFrame(a), requestAnimationFrame(T))
      : setTimeout(T, $);
  }
  function f(T) {
    if (y) return cancelAnimationFrame(T);
    clearTimeout(T);
  }
  function d(T) {
    return (u = T), (a = P(S, x)), m ? w(T) : i;
  }
  function g(T) {
    const $ = T - s,
      Ae = T - u,
      Dr = x - $;
    return p && l ? Math.min(Dr, l - Ae) : Dr;
  }
  function v(T) {
    const $ = T - s,
      Ae = T - u;
    return s === void 0 || $ >= x || $ < 0 || (p && l && Ae >= l);
  }
  function S() {
    const T = Date.now();
    if (v(T)) return C(T);
    a = P(S, g(T));
  }
  function C(T) {
    return (a = void 0), h && n ? w(T) : ((n = o = void 0), i);
  }
  function k() {
    a !== void 0 && f(a), (u = 0), (n = s = o = a = void 0);
  }
  function N() {
    return a === void 0 ? i : C(Date.now());
  }
  function O() {
    return a !== void 0;
  }
  function D(...T) {
    const $ = Date.now(),
      Ae = v($);
    if (((n = T), (o = this), (s = $), Ae)) {
      if (a === void 0) return d(s);
      if (p) return (a = P(S, x)), w(s);
    }
    return a === void 0 && (a = P(S, x)), i;
  }
  return (D.cancelExecution = k), (D.flush = N), (D.pending = O), D;
}
class Mo {
  static get zero() {
    return new Mo();
  }
  constructor({ top: t = 0, left: r = 0, width: n = 0, height: o = 0 } = {}) {
    (this.top = t), (this.left = r), (this.width = n), (this.height = o);
  }
  get center() {
    return { x: this.left + this.width / 2, y: this.top + this.height / 2 };
  }
}
function Qn(e) {
  try {
    const t = e.getBoundingClientRect();
    return new Mo({
      top: t.top,
      left: t.left,
      width: t.width,
      height: t.height,
    });
  } catch {
    return new Mo({ width: window.innerWidth, height: window.innerHeight });
  }
}
const $n = 1e3 / 60;
class S1 {
  constructor(t) {
    (this.stickyItems = []),
      (this.stuckItems = []),
      (this.container = null),
      (this.topBarOffset = 0),
      (this.handleResize = Ti(
        () => {
          this.manageStickyItems();
        },
        $n,
        { leading: !0, trailing: !0, maxWait: $n }
      )),
      (this.handleScroll = Ti(
        () => {
          this.manageStickyItems();
        },
        $n,
        { leading: !0, trailing: !0, maxWait: $n }
      )),
      t && this.setContainer(t);
  }
  registerStickyItem(t) {
    this.stickyItems.push(t);
  }
  unregisterStickyItem(t) {
    const r = this.stickyItems.findIndex(({ stickyNode: n }) => t === n);
    this.stickyItems.splice(r, 1);
  }
  getStickyItem(t) {
    return this.stickyItems.find(({ stickyNode: r }) => t === r);
  }
  setContainer(t) {
    (this.container = t),
      K0(t) && this.setTopBarOffset(t),
      this.container.addEventListener('scroll', this.handleScroll),
      window.addEventListener('resize', this.handleResize),
      this.manageStickyItems();
  }
  removeScrollListener() {
    this.container &&
      (this.container.removeEventListener('scroll', this.handleScroll),
      window.removeEventListener('resize', this.handleResize));
  }
  manageStickyItems() {
    if (this.stickyItems.length <= 0) return;
    const t = this.container ? D1(this.container) : 0,
      r = Qn(this.container).top + this.topBarOffset;
    this.stickyItems.forEach((n) => {
      const { handlePositioning: o } = n,
        {
          sticky: l,
          top: i,
          left: a,
          width: s,
        } = this.evaluateStickyItem(n, t, r);
      this.updateStuckItems(n, l), o(l, i, a, s);
    });
  }
  evaluateStickyItem(t, r, n) {
    var P;
    const {
      stickyNode: o,
      placeHolderNode: l,
      boundingElement: i,
      offset: a,
      disableWhenStacked: s,
    } = t;
    if (s && y1().matches)
      return { sticky: !1, top: 0, left: 0, width: 'auto' };
    const u = a
        ? this.getOffset(o) + parseInt(Q0.space['space-500'], 10)
        : this.getOffset(o),
      m = r + u,
      p = l.getBoundingClientRect().top - n + r,
      h = n + u,
      y = l.getBoundingClientRect().width,
      x = l.getBoundingClientRect().left;
    let w;
    if (i == null) w = m >= p;
    else {
      const f =
          o.getBoundingClientRect().height ||
          ((P = o.firstElementChild) == null
            ? void 0
            : P.getBoundingClientRect().height) ||
          0,
        d = i.getBoundingClientRect().bottom - f + r - n;
      w = m >= p && m < d;
    }
    return { sticky: w, top: h, left: x, width: y };
  }
  updateStuckItems(t, r) {
    const { stickyNode: n } = t;
    r && !this.isNodeStuck(n)
      ? this.addStuckItem(t)
      : !r && this.isNodeStuck(n) && this.removeStuckItem(t);
  }
  addStuckItem(t) {
    this.stuckItems.push(t);
  }
  removeStuckItem(t) {
    const { stickyNode: r } = t,
      n = this.stuckItems.findIndex(({ stickyNode: o }) => r === o);
    this.stuckItems.splice(n, 1);
  }
  getOffset(t) {
    if (this.stuckItems.length === 0) return 0;
    let r = 0,
      n = 0;
    const o = this.stuckItems.length,
      l = Qn(t);
    for (; n < o; ) {
      const i = this.stuckItems[n].stickyNode;
      if (i !== t) {
        const a = Qn(i);
        F1(l, a) || (r += Qn(i).height);
      } else break;
      n++;
    }
    return r;
  }
  isNodeStuck(t) {
    return this.stuckItems.findIndex(({ stickyNode: n }) => t === n) >= 0;
  }
  setTopBarOffset(t) {
    const r = t.querySelector(`:not(${Og.selector}) ${Ug.selector}`);
    this.topBarOffset = r ? r.clientHeight : 0;
  }
}
function K0(e) {
  return e === document;
}
function D1(e) {
  return K0(e)
    ? document.body.scrollTop || document.documentElement.scrollTop
    : e.scrollTop;
}
function F1(e, t) {
  const r = e.left,
    n = e.left + e.width,
    o = t.left;
  return t.left + t.width < r || n < o;
}
const cu = 'data-lock-scrolling',
  du = 'data-lock-scrolling-hidden',
  fu = 'data-lock-scrolling-wrapper';
let Wn = 0;
function E1() {
  const { body: e } = document;
  return e.scrollHeight > e.clientHeight;
}
class C1 {
  constructor() {
    (this.scrollLocks = 0), (this.locked = !1);
  }
  registerScrollLock() {
    (this.scrollLocks += 1), this.handleScrollLocking();
  }
  unregisterScrollLock() {
    (this.scrollLocks -= 1), this.handleScrollLocking();
  }
  handleScrollLocking() {
    if (Zo) return;
    const { scrollLocks: t } = this,
      { body: r } = document,
      n = r.firstElementChild;
    t === 0
      ? (r.removeAttribute(cu),
        r.removeAttribute(du),
        n && n.removeAttribute(fu),
        window.scroll(0, Wn),
        (this.locked = !1))
      : t > 0 &&
        !this.locked &&
        ((Wn = window.pageYOffset),
        r.setAttribute(cu, ''),
        E1() || r.setAttribute(du, ''),
        n && (n.setAttribute(fu, ''), (n.scrollTop = Wn)),
        (this.locked = !0));
  }
  resetScrollPosition() {
    Wn = 0;
  }
}
const k1 = /\[(.*?)\]|(\w+)/g;
function mu(e, t, r) {
  if (e == null) return;
  const n = Array.isArray(t) ? t : N1(t);
  let o = e;
  for (let l = 0; l < n.length; l++) {
    const i = o[n[l]];
    if (i === void 0) return r;
    o = i;
  }
  return o;
}
function N1(e) {
  const t = [];
  let r;
  for (; (r = k1.exec(e)); ) {
    const [, n, o] = r;
    t.push(n || o);
  }
  return t;
}
function I1(...e) {
  let t = {};
  for (const r of e) t = V0(t, r);
  return t;
}
function V0(e, t) {
  const r = Array.isArray(e) ? [...e] : { ...e };
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n))
      gu(t[n]) && gu(r[n]) ? (r[n] = V0(r[n], t[n])) : (r[n] = t[n]);
    else continue;
  return r;
}
function gu(e) {
  return e !== null && typeof e == 'object';
}
const T1 = /{([^}]*)}/g;
class hu {
  constructor(t) {
    (this.translation = {}),
      (this.translation = Array.isArray(t) ? I1(...t.slice().reverse()) : t);
  }
  translate(t, r) {
    const n = mu(this.translation, t, '');
    return n
      ? r
        ? n.replace(T1, (o) => {
            const l = o.substring(1, o.length - 1);
            if (r[l] === void 0) {
              const i = JSON.stringify(r);
              throw new Error(
                `Error in translation for key '${t}'. No replacement found for key '${l}'. The following replacements were passed: '${i}'`
              );
            }
            return r[l];
          })
        : n
      : '';
  }
  translationKeyExists(t) {
    return !!mu(this.translation, t);
  }
}
const B1 = I.createContext(void 0),
  M1 = I.createContext(void 0),
  z1 = I.createContext(void 0),
  P1 = I.createContext(void 0),
  L1 = I.createContext(void 0),
  R1 = I.createContext(void 0);
class j1 extends I.PureComponent {
  componentDidMount() {
    this.attachListener();
  }
  componentDidUpdate({ passive: t, ...r }) {
    this.detachListener(r), this.attachListener();
  }
  componentWillUnmount() {
    this.detachListener();
  }
  render() {
    return null;
  }
  attachListener() {
    const {
      event: t,
      handler: r,
      capture: n,
      passive: o,
      window: l,
    } = this.props;
    (l || globalThis.window).addEventListener(t, r, { capture: n, passive: o });
  }
  detachListener(t) {
    const { event: r, handler: n, capture: o, window: l } = t || this.props;
    (l || globalThis.window).removeEventListener(r, n, o);
  }
}
const _1 = function ({ children: t }) {
  const [r, n] = I.useState(zl().matches),
    o = I.useCallback(
      Ti(
        () => {
          r !== zl().matches && n(!r);
        },
        40,
        { trailing: !0, leading: !0, maxWait: 40 }
      ),
      [r]
    );
  I.useEffect(() => {
    n(zl().matches);
  }, []);
  const l = I.useMemo(() => ({ isNavigationCollapsed: r }), [r]);
  return j.createElement(
    R1.Provider,
    { value: l },
    j.createElement(j1, { event: 'resize', handler: o }),
    t
  );
};
function O1() {
  const [e, t] = I.useState(!1);
  return (
    I.useEffect(() => {
      t(!0);
    }, []),
    e
  );
}
const U1 = I.createContext(void 0);
function H1(e, t) {
  return j.createElement('div', { id: 'PolarisPortalsContainer', ref: t });
}
const Q1 = I.forwardRef(H1);
function $1({ children: e, container: t }) {
  const r = O1(),
    n = I.useRef(null),
    o = I.useMemo(
      () =>
        t
          ? { container: t }
          : r
          ? { container: n.current }
          : { container: null },
      [t, r]
    );
  return j.createElement(
    U1.Provider,
    { value: o },
    e,
    t ? null : j.createElement(Q1, { ref: n })
  );
}
const W1 = I.createContext(void 0);
function K1({ children: e }) {
  const [t, r] = I.useState([]),
    n = I.useCallback((i) => {
      r((a) => [...a, i]);
    }, []),
    o = I.useCallback((i) => {
      let a = !0;
      return (
        r((s) => {
          const u = [...s],
            m = u.indexOf(i);
          return m === -1 ? (a = !1) : u.splice(m, 1), u;
        }),
        a
      );
    }, []),
    l = I.useMemo(() => ({ trapFocusList: t, add: n, remove: o }), [n, t, o]);
  return j.createElement(W1.Provider, { value: l }, e);
}
const V1 = I.createContext(void 0),
  G1 = { tooltip: 0, hovercard: 0 };
function Y1({ children: e }) {
  const [t, r] = I.useState(G1),
    n = I.useCallback((i) => {
      r((a) => ({ ...a, [i]: a[i] + 1 }));
    }, []),
    o = I.useCallback((i) => {
      r((a) => ({ ...a, [i]: a[i] - 1 }));
    }, []),
    l = I.useMemo(
      () => ({
        presenceList: Object.entries(t).reduce((i, a) => {
          const [s, u] = a;
          return { ...i, [s]: u >= 1 };
        }, {}),
        presenceCounter: t,
        addPresence: n,
        removePresence: o,
      }),
      [n, o, t]
    );
  return j.createElement(V1.Provider, { value: l }, e);
}
const J1 = 20,
  oo = 30,
  Z1 = oo + 10;
function X1() {
  var o;
  const e = document.createElement('div');
  e.setAttribute(
    'style',
    `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${oo}px; height:${oo}px;`
  );
  const t = document.createElement('div');
  t.setAttribute(
    'style',
    `width:100%; height: ${Z1}; overflow:scroll; scrollbar-width: thin;`
  ),
    e.appendChild(t),
    document.body.appendChild(e);
  const r =
      oo - (((o = e.firstElementChild) == null ? void 0 : o.clientWidth) ?? 0),
    n = Math.min(r, J1);
  document.documentElement.style.setProperty(
    '--pc-app-provider-scrollbar-width',
    `${n}px`
  ),
    document.body.removeChild(e);
}
class q1 extends I.Component {
  constructor(t) {
    super(t),
      (this.setBodyStyles = () => {
        (document.body.style.backgroundColor = 'var(--p-color-bg)'),
          (document.body.style.color = 'var(--p-color-text)');
      }),
      (this.setRootAttributes = () => {
        const o = this.getThemeName();
        g1.forEach((l) => {
          document.documentElement.classList.toggle(f1(l), l === o);
        });
      }),
      (this.getThemeName = () => this.props.theme ?? ka),
      (this.stickyManager = new S1()),
      (this.scrollLockManager = new C1());
    const { i18n: r, linkComponent: n } = this.props;
    this.state = { link: n, intl: new hu(r) };
  }
  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document),
        this.setBodyStyles(),
        this.setRootAttributes();
      const t =
          navigator.userAgent.includes('Safari') &&
          !navigator.userAgent.includes('Chrome') &&
          (navigator.userAgent.includes('Version/16.1') ||
            navigator.userAgent.includes('Version/16.2') ||
            navigator.userAgent.includes('Version/16.3')),
        r =
          navigator.userAgent.includes('Shopify Mobile/iOS') &&
          (navigator.userAgent.includes('OS 16_1') ||
            navigator.userAgent.includes('OS 16_2') ||
            navigator.userAgent.includes('OS 16_3'));
      (t || r) &&
        document.documentElement.classList.add(
          'Polaris-Safari-16-Font-Optical-Sizing-Patch'
        );
    }
    X1();
  }
  componentDidUpdate({ i18n: t, linkComponent: r }) {
    const { i18n: n, linkComponent: o } = this.props;
    this.setRootAttributes(),
      !(n === t && o === r) && this.setState({ link: o, intl: new hu(n) });
  }
  render() {
    const { children: t, features: r = {} } = this.props,
      n = this.getThemeName(),
      { intl: o, link: l } = this.state;
    return j.createElement(
      p1.Provider,
      { value: n },
      j.createElement(
        h1.Provider,
        { value: b1(n) },
        j.createElement(
          B1.Provider,
          { value: r },
          j.createElement(
            M1.Provider,
            { value: o },
            j.createElement(
              z1.Provider,
              { value: this.scrollLockManager },
              j.createElement(
                P1.Provider,
                { value: this.stickyManager },
                j.createElement(
                  L1.Provider,
                  { value: l },
                  j.createElement(
                    _1,
                    null,
                    j.createElement(
                      $1,
                      null,
                      j.createElement(K1, null, j.createElement(Y1, null, t))
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }
}
Pl.createRoot(document.getElementById('claim-liquid')).render(
  c.jsx(j.StrictMode, {
    children: c.jsx(q1, { i18n: _g, children: c.jsx(Rg, {}) }),
  })
);
