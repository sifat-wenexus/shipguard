(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver((o) => {
    for (const l of o)
      if (l.type === 'childList')
        for (const a of l.addedNodes)
          a.tagName === 'LINK' && a.rel === 'modulepreload' && n(a);
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
function Q1(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var df = { exports: {} },
  oi = {},
  ff = { exports: {} },
  K = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tl = Symbol.for('react.element'),
  q1 = Symbol.for('react.portal'),
  J1 = Symbol.for('react.fragment'),
  K1 = Symbol.for('react.strict_mode'),
  ep = Symbol.for('react.profiler'),
  tp = Symbol.for('react.provider'),
  rp = Symbol.for('react.context'),
  np = Symbol.for('react.forward_ref'),
  op = Symbol.for('react.suspense'),
  lp = Symbol.for('react.memo'),
  ap = Symbol.for('react.lazy'),
  Ju = Symbol.iterator;
function ip(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Ju && e[Ju]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var mf = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  gf = Object.assign,
  pf = {};
function Co(e, t, r) {
  (this.props = e),
    (this.context = t),
    (this.refs = pf),
    (this.updater = r || mf);
}
Co.prototype.isReactComponent = {};
Co.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
Co.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function hf() {}
hf.prototype = Co.prototype;
function Pc(e, t, r) {
  (this.props = e),
    (this.context = t),
    (this.refs = pf),
    (this.updater = r || mf);
}
var Fc = (Pc.prototype = new hf());
Fc.constructor = Pc;
gf(Fc, Co.prototype);
Fc.isPureReactComponent = !0;
var Ku = Array.isArray,
  bf = Object.prototype.hasOwnProperty,
  Dc = { current: null },
  vf = { key: !0, ref: !0, __self: !0, __source: !0 };
function yf(e, t, r) {
  var n,
    o = {},
    l = null,
    a = null;
  if (t != null)
    for (n in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (l = '' + t.key),
    t))
      bf.call(t, n) && !vf.hasOwnProperty(n) && (o[n] = t[n]);
  var i = arguments.length - 2;
  if (i === 1) o.children = r;
  else if (1 < i) {
    for (var s = Array(i), u = 0; u < i; u++) s[u] = arguments[u + 2];
    o.children = s;
  }
  if (e && e.defaultProps)
    for (n in ((i = e.defaultProps), i)) o[n] === void 0 && (o[n] = i[n]);
  return {
    $$typeof: Tl,
    type: e,
    key: l,
    ref: a,
    props: o,
    _owner: Dc.current,
  };
}
function sp(e, t) {
  return {
    $$typeof: Tl,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Tc(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Tl;
}
function cp(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (r) {
      return t[r];
    })
  );
}
var ed = /\/+/g;
function _i(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? cp('' + e.key)
    : t.toString(36);
}
function ba(e, t, r, n, o) {
  var l = typeof e;
  (l === 'undefined' || l === 'boolean') && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (l) {
      case 'string':
      case 'number':
        a = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case Tl:
          case q1:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (o = o(a)),
      (e = n === '' ? '.' + _i(a, 0) : n),
      Ku(o)
        ? ((r = ''),
          e != null && (r = e.replace(ed, '$&/') + '/'),
          ba(o, t, r, '', function (u) {
            return u;
          }))
        : o != null &&
          (Tc(o) &&
            (o = sp(
              o,
              r +
                (!o.key || (a && a.key === o.key)
                  ? ''
                  : ('' + o.key).replace(ed, '$&/') + '/') +
                e
            )),
          t.push(o)),
      1
    );
  if (((a = 0), (n = n === '' ? '.' : n + ':'), Ku(e)))
    for (var i = 0; i < e.length; i++) {
      l = e[i];
      var s = n + _i(l, i);
      a += ba(l, t, r, s, o);
    }
  else if (((s = ip(e)), typeof s == 'function'))
    for (e = s.call(e), i = 0; !(l = e.next()).done; )
      (l = l.value), (s = n + _i(l, i++)), (a += ba(l, t, r, s, o));
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
  return a;
}
function Zl(e, t, r) {
  if (e == null) return e;
  var n = [],
    o = 0;
  return (
    ba(e, n, '', '', function (l) {
      return t.call(r, l, o++);
    }),
    n
  );
}
function up(e) {
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
var et = { current: null },
  va = { transition: null },
  dp = {
    ReactCurrentDispatcher: et,
    ReactCurrentBatchConfig: va,
    ReactCurrentOwner: Dc,
  };
function xf() {
  throw Error('act(...) is not supported in production builds of React.');
}
K.Children = {
  map: Zl,
  forEach: function (e, t, r) {
    Zl(
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
      Zl(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Zl(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Tc(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.'
      );
    return e;
  },
};
K.Component = Co;
K.Fragment = J1;
K.Profiler = ep;
K.PureComponent = Pc;
K.StrictMode = K1;
K.Suspense = op;
K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = dp;
K.act = xf;
K.cloneElement = function (e, t, r) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.'
    );
  var n = gf({}, e.props),
    o = e.key,
    l = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((l = t.ref), (a = Dc.current)),
      t.key !== void 0 && (o = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var i = e.type.defaultProps;
    for (s in t)
      bf.call(t, s) &&
        !vf.hasOwnProperty(s) &&
        (n[s] = t[s] === void 0 && i !== void 0 ? i[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) n.children = r;
  else if (1 < s) {
    i = Array(s);
    for (var u = 0; u < s; u++) i[u] = arguments[u + 2];
    n.children = i;
  }
  return { $$typeof: Tl, type: e.type, key: o, ref: l, props: n, _owner: a };
};
K.createContext = function (e) {
  return (
    (e = {
      $$typeof: rp,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: tp, _context: e }),
    (e.Consumer = e)
  );
};
K.createElement = yf;
K.createFactory = function (e) {
  var t = yf.bind(null, e);
  return (t.type = e), t;
};
K.createRef = function () {
  return { current: null };
};
K.forwardRef = function (e) {
  return { $$typeof: np, render: e };
};
K.isValidElement = Tc;
K.lazy = function (e) {
  return { $$typeof: ap, _payload: { _status: -1, _result: e }, _init: up };
};
K.memo = function (e, t) {
  return { $$typeof: lp, type: e, compare: t === void 0 ? null : t };
};
K.startTransition = function (e) {
  var t = va.transition;
  va.transition = {};
  try {
    e();
  } finally {
    va.transition = t;
  }
};
K.unstable_act = xf;
K.useCallback = function (e, t) {
  return et.current.useCallback(e, t);
};
K.useContext = function (e) {
  return et.current.useContext(e);
};
K.useDebugValue = function () {};
K.useDeferredValue = function (e) {
  return et.current.useDeferredValue(e);
};
K.useEffect = function (e, t) {
  return et.current.useEffect(e, t);
};
K.useId = function () {
  return et.current.useId();
};
K.useImperativeHandle = function (e, t, r) {
  return et.current.useImperativeHandle(e, t, r);
};
K.useInsertionEffect = function (e, t) {
  return et.current.useInsertionEffect(e, t);
};
K.useLayoutEffect = function (e, t) {
  return et.current.useLayoutEffect(e, t);
};
K.useMemo = function (e, t) {
  return et.current.useMemo(e, t);
};
K.useReducer = function (e, t, r) {
  return et.current.useReducer(e, t, r);
};
K.useRef = function (e) {
  return et.current.useRef(e);
};
K.useState = function (e) {
  return et.current.useState(e);
};
K.useSyncExternalStore = function (e, t, r) {
  return et.current.useSyncExternalStore(e, t, r);
};
K.useTransition = function () {
  return et.current.useTransition();
};
K.version = '18.3.1';
ff.exports = K;
var d = ff.exports;
const c = Q1(d);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fp = d,
  mp = Symbol.for('react.element'),
  gp = Symbol.for('react.fragment'),
  pp = Object.prototype.hasOwnProperty,
  hp = fp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  bp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sf(e, t, r) {
  var n,
    o = {},
    l = null,
    a = null;
  r !== void 0 && (l = '' + r),
    t.key !== void 0 && (l = '' + t.key),
    t.ref !== void 0 && (a = t.ref);
  for (n in t) pp.call(t, n) && !bp.hasOwnProperty(n) && (o[n] = t[n]);
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) o[n] === void 0 && (o[n] = t[n]);
  return {
    $$typeof: mp,
    type: e,
    key: l,
    ref: a,
    props: o,
    _owner: hp.current,
  };
}
oi.Fragment = gp;
oi.jsx = Sf;
oi.jsxs = Sf;
df.exports = oi;
var C = df.exports,
  Es = {},
  Ef = { exports: {} },
  bt = {},
  Cf = { exports: {} },
  wf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(I, z) {
    var $ = I.length;
    I.push(z);
    e: for (; 0 < $; ) {
      var V = ($ - 1) >>> 1,
        Y = I[V];
      if (0 < o(Y, z)) (I[V] = z), (I[$] = Y), ($ = V);
      else break e;
    }
  }
  function r(I) {
    return I.length === 0 ? null : I[0];
  }
  function n(I) {
    if (I.length === 0) return null;
    var z = I[0],
      $ = I.pop();
    if ($ !== z) {
      I[0] = $;
      e: for (var V = 0, Y = I.length, ce = Y >>> 1; V < ce; ) {
        var he = 2 * (V + 1) - 1,
          xe = I[he],
          G = he + 1,
          U = I[G];
        if (0 > o(xe, $))
          G < Y && 0 > o(U, xe)
            ? ((I[V] = U), (I[G] = $), (V = G))
            : ((I[V] = xe), (I[he] = $), (V = he));
        else if (G < Y && 0 > o(U, $)) (I[V] = U), (I[G] = $), (V = G);
        else break e;
      }
    }
    return z;
  }
  function o(I, z) {
    var $ = I.sortIndex - z.sortIndex;
    return $ !== 0 ? $ : I.id - z.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var a = Date,
      i = a.now();
    e.unstable_now = function () {
      return a.now() - i;
    };
  }
  var s = [],
    u = [],
    m = 1,
    g = null,
    p = 3,
    v = !1,
    y = !1,
    x = !1,
    k = typeof setTimeout == 'function' ? setTimeout : null,
    h = typeof clearTimeout == 'function' ? clearTimeout : null,
    f = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function b(I) {
    for (var z = r(u); z !== null; ) {
      if (z.callback === null) n(u);
      else if (z.startTime <= I)
        n(u), (z.sortIndex = z.expirationTime), t(s, z);
      else break;
      z = r(u);
    }
  }
  function S(I) {
    if (((x = !1), b(I), !y))
      if (r(s) !== null) (y = !0), ee(F);
      else {
        var z = r(u);
        z !== null && W(S, z.startTime - I);
      }
  }
  function F(I, z) {
    (y = !1), x && ((x = !1), h(E), (E = -1)), (v = !0);
    var $ = p;
    try {
      for (
        b(z), g = r(s);
        g !== null && (!(g.expirationTime > z) || (I && !N()));

      ) {
        var V = g.callback;
        if (typeof V == 'function') {
          (g.callback = null), (p = g.priorityLevel);
          var Y = V(g.expirationTime <= z);
          (z = e.unstable_now()),
            typeof Y == 'function' ? (g.callback = Y) : g === r(s) && n(s),
            b(z);
        } else n(s);
        g = r(s);
      }
      if (g !== null) var ce = !0;
      else {
        var he = r(u);
        he !== null && W(S, he.startTime - z), (ce = !1);
      }
      return ce;
    } finally {
      (g = null), (p = $), (v = !1);
    }
  }
  var w = !1,
    P = null,
    E = -1,
    A = 5,
    D = -1;
  function N() {
    return !(e.unstable_now() - D < A);
  }
  function B() {
    if (P !== null) {
      var I = e.unstable_now();
      D = I;
      var z = !0;
      try {
        z = P(!0, I);
      } finally {
        z ? j() : ((w = !1), (P = null));
      }
    } else w = !1;
  }
  var j;
  if (typeof f == 'function')
    j = function () {
      f(B);
    };
  else if (typeof MessageChannel < 'u') {
    var Z = new MessageChannel(),
      q = Z.port2;
    (Z.port1.onmessage = B),
      (j = function () {
        q.postMessage(null);
      });
  } else
    j = function () {
      k(B, 0);
    };
  function ee(I) {
    (P = I), w || ((w = !0), j());
  }
  function W(I, z) {
    E = k(function () {
      I(e.unstable_now());
    }, z);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (I) {
      I.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      y || v || ((y = !0), ee(F));
    }),
    (e.unstable_forceFrameRate = function (I) {
      0 > I || 125 < I
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (A = 0 < I ? Math.floor(1e3 / I) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return r(s);
    }),
    (e.unstable_next = function (I) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = p;
      }
      var $ = p;
      p = z;
      try {
        return I();
      } finally {
        p = $;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (I, z) {
      switch (I) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          I = 3;
      }
      var $ = p;
      p = I;
      try {
        return z();
      } finally {
        p = $;
      }
    }),
    (e.unstable_scheduleCallback = function (I, z, $) {
      var V = e.unstable_now();
      switch (
        (typeof $ == 'object' && $ !== null
          ? (($ = $.delay), ($ = typeof $ == 'number' && 0 < $ ? V + $ : V))
          : ($ = V),
        I)
      ) {
        case 1:
          var Y = -1;
          break;
        case 2:
          Y = 250;
          break;
        case 5:
          Y = 1073741823;
          break;
        case 4:
          Y = 1e4;
          break;
        default:
          Y = 5e3;
      }
      return (
        (Y = $ + Y),
        (I = {
          id: m++,
          callback: z,
          priorityLevel: I,
          startTime: $,
          expirationTime: Y,
          sortIndex: -1,
        }),
        $ > V
          ? ((I.sortIndex = $),
            t(u, I),
            r(s) === null &&
              I === r(u) &&
              (x ? (h(E), (E = -1)) : (x = !0), W(S, $ - V)))
          : ((I.sortIndex = Y), t(s, I), y || v || ((y = !0), ee(F))),
        I
      );
    }),
    (e.unstable_shouldYield = N),
    (e.unstable_wrapCallback = function (I) {
      var z = p;
      return function () {
        var $ = p;
        p = z;
        try {
          return I.apply(this, arguments);
        } finally {
          p = $;
        }
      };
    });
})(wf);
Cf.exports = wf;
var vp = Cf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yp = d,
  ht = vp;
function _(e) {
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
var kf = new Set(),
  sl = {};
function Ln(e, t) {
  mo(e, t), mo(e + 'Capture', t);
}
function mo(e, t) {
  for (sl[e] = t, e = 0; e < t.length; e++) kf.add(t[e]);
}
var br = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  Cs = Object.prototype.hasOwnProperty,
  xp =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  td = {},
  rd = {};
function Sp(e) {
  return Cs.call(rd, e)
    ? !0
    : Cs.call(td, e)
    ? !1
    : xp.test(e)
    ? (rd[e] = !0)
    : ((td[e] = !0), !1);
}
function Ep(e, t, r, n) {
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
function Cp(e, t, r, n) {
  if (t === null || typeof t > 'u' || Ep(e, t, r, n)) return !0;
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
function tt(e, t, r, n, o, l, a) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = n),
    (this.attributeNamespace = o),
    (this.mustUseProperty = r),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = l),
    (this.removeEmptyString = a);
}
var Ve = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    Ve[e] = new tt(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  Ve[t] = new tt(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  Ve[e] = new tt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  Ve[e] = new tt(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    Ve[e] = new tt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  Ve[e] = new tt(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  Ve[e] = new tt(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  Ve[e] = new tt(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  Ve[e] = new tt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ic = /[\-:]([a-z])/g;
function Ac(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ic, Ac);
    Ve[t] = new tt(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ic, Ac);
    Ve[t] = new tt(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(Ic, Ac);
  Ve[t] = new tt(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  Ve[e] = new tt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ve.xlinkHref = new tt(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  Ve[e] = new tt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Nc(e, t, r, n) {
  var o = Ve.hasOwnProperty(t) ? Ve[t] : null;
  (o !== null
    ? o.type !== 0
    : n ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (Cp(t, r, o, n) && (r = null),
    n || o === null
      ? Sp(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, '' + r))
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
var Cr = yp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Yl = Symbol.for('react.element'),
  Gn = Symbol.for('react.portal'),
  Zn = Symbol.for('react.fragment'),
  _c = Symbol.for('react.strict_mode'),
  ws = Symbol.for('react.profiler'),
  Pf = Symbol.for('react.provider'),
  Ff = Symbol.for('react.context'),
  Mc = Symbol.for('react.forward_ref'),
  ks = Symbol.for('react.suspense'),
  Ps = Symbol.for('react.suspense_list'),
  Bc = Symbol.for('react.memo'),
  Mr = Symbol.for('react.lazy'),
  Df = Symbol.for('react.offscreen'),
  nd = Symbol.iterator;
function To(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (nd && e[nd]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var ye = Object.assign,
  Mi;
function jo(e) {
  if (Mi === void 0)
    try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      Mi = (t && t[1]) || '';
    }
  return (
    `
` +
    Mi +
    e
  );
}
var Bi = !1;
function Li(e, t) {
  if (!e || Bi) return '';
  Bi = !0;
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
          a = o.length - 1,
          i = l.length - 1;
        1 <= a && 0 <= i && o[a] !== l[i];

      )
        i--;
      for (; 1 <= a && 0 <= i; a--, i--)
        if (o[a] !== l[i]) {
          if (a !== 1 || i !== 1)
            do
              if ((a--, i--, 0 > i || o[a] !== l[i])) {
                var s =
                  `
` + o[a].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    s.includes('<anonymous>') &&
                    (s = s.replace('<anonymous>', e.displayName)),
                  s
                );
              }
            while (1 <= a && 0 <= i);
          break;
        }
    }
  } finally {
    (Bi = !1), (Error.prepareStackTrace = r);
  }
  return (e = e ? e.displayName || e.name : '') ? jo(e) : '';
}
function wp(e) {
  switch (e.tag) {
    case 5:
      return jo(e.type);
    case 16:
      return jo('Lazy');
    case 13:
      return jo('Suspense');
    case 19:
      return jo('SuspenseList');
    case 0:
    case 2:
    case 15:
      return (e = Li(e.type, !1)), e;
    case 11:
      return (e = Li(e.type.render, !1)), e;
    case 1:
      return (e = Li(e.type, !0)), e;
    default:
      return '';
  }
}
function Fs(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case Zn:
      return 'Fragment';
    case Gn:
      return 'Portal';
    case ws:
      return 'Profiler';
    case _c:
      return 'StrictMode';
    case ks:
      return 'Suspense';
    case Ps:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case Ff:
        return (e.displayName || 'Context') + '.Consumer';
      case Pf:
        return (e._context.displayName || 'Context') + '.Provider';
      case Mc:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case Bc:
        return (
          (t = e.displayName || null), t !== null ? t : Fs(e.type) || 'Memo'
        );
      case Mr:
        (t = e._payload), (e = e._init);
        try {
          return Fs(e(t));
        } catch {}
    }
  return null;
}
function kp(e) {
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
      return Fs(t);
    case 8:
      return t === _c ? 'StrictMode' : 'Mode';
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
function rn(e) {
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
function Tf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  );
}
function Pp(e) {
  var t = Tf(e) ? 'checked' : 'value',
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
        set: function (a) {
          (n = '' + a), l.call(this, a);
        },
      }),
      Object.defineProperty(e, t, { enumerable: r.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (a) {
          n = '' + a;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Xl(e) {
  e._valueTracker || (e._valueTracker = Pp(e));
}
function If(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(),
    n = '';
  return (
    e && (n = Tf(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = n),
    e !== r ? (t.setValue(e), !0) : !1
  );
}
function Ia(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ds(e, t) {
  var r = t.checked;
  return ye({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: r ?? e._wrapperState.initialChecked,
  });
}
function od(e, t) {
  var r = t.defaultValue == null ? '' : t.defaultValue,
    n = t.checked != null ? t.checked : t.defaultChecked;
  (r = rn(t.value != null ? t.value : r)),
    (e._wrapperState = {
      initialChecked: n,
      initialValue: r,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    });
}
function Af(e, t) {
  (t = t.checked), t != null && Nc(e, 'checked', t, !1);
}
function Ts(e, t) {
  Af(e, t);
  var r = rn(t.value),
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
    ? Is(e, t.type, r)
    : t.hasOwnProperty('defaultValue') && Is(e, t.type, rn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function ld(e, t, r) {
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
function Is(e, t, r) {
  (t !== 'number' || Ia(e.ownerDocument) !== e) &&
    (r == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + r && (e.defaultValue = '' + r));
}
var $o = Array.isArray;
function lo(e, t, r, n) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < r.length; o++) t['$' + r[o]] = !0;
    for (r = 0; r < e.length; r++)
      (o = t.hasOwnProperty('$' + e[r].value)),
        e[r].selected !== o && (e[r].selected = o),
        o && n && (e[r].defaultSelected = !0);
  } else {
    for (r = '' + rn(r), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === r) {
        (e[o].selected = !0), n && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function As(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
  return ye({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function ad(e, t) {
  var r = t.value;
  if (r == null) {
    if (((r = t.children), (t = t.defaultValue), r != null)) {
      if (t != null) throw Error(_(92));
      if ($o(r)) {
        if (1 < r.length) throw Error(_(93));
        r = r[0];
      }
      t = r;
    }
    t == null && (t = ''), (r = t);
  }
  e._wrapperState = { initialValue: rn(r) };
}
function Nf(e, t) {
  var r = rn(t.value),
    n = rn(t.defaultValue);
  r != null &&
    ((r = '' + r),
    r !== e.value && (e.value = r),
    t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
    n != null && (e.defaultValue = '' + n);
}
function id(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function _f(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function Ns(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? _f(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
    ? 'http://www.w3.org/1999/xhtml'
    : e;
}
var Ql,
  Mf = (function (e) {
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
        Ql = Ql || document.createElement('div'),
          Ql.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Ql.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function cl(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Zo = {
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
  Fp = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Zo).forEach(function (e) {
  Fp.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Zo[t] = Zo[e]);
  });
});
function Bf(e, t, r) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : r || typeof t != 'number' || t === 0 || (Zo.hasOwnProperty(e) && Zo[e])
    ? ('' + t).trim()
    : t + 'px';
}
function Lf(e, t) {
  e = e.style;
  for (var r in t)
    if (t.hasOwnProperty(r)) {
      var n = r.indexOf('--') === 0,
        o = Bf(r, t[r], n);
      r === 'float' && (r = 'cssFloat'), n ? e.setProperty(r, o) : (e[r] = o);
    }
}
var Dp = ye(
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
function _s(e, t) {
  if (t) {
    if (Dp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(_(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(_(60));
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(_(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(_(62));
  }
}
function Ms(e, t) {
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
var Bs = null;
function Lc(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Ls = null,
  ao = null,
  io = null;
function sd(e) {
  if ((e = Nl(e))) {
    if (typeof Ls != 'function') throw Error(_(280));
    var t = e.stateNode;
    t && ((t = ci(t)), Ls(e.stateNode, e.type, t));
  }
}
function Rf(e) {
  ao ? (io ? io.push(e) : (io = [e])) : (ao = e);
}
function zf() {
  if (ao) {
    var e = ao,
      t = io;
    if (((io = ao = null), sd(e), t)) for (e = 0; e < t.length; e++) sd(t[e]);
  }
}
function Of(e, t) {
  return e(t);
}
function Hf() {}
var Ri = !1;
function jf(e, t, r) {
  if (Ri) return e(t, r);
  Ri = !0;
  try {
    return Of(e, t, r);
  } finally {
    (Ri = !1), (ao !== null || io !== null) && (Hf(), zf());
  }
}
function ul(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var n = ci(r);
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
  if (r && typeof r != 'function') throw Error(_(231, t, typeof r));
  return r;
}
var Rs = !1;
if (br)
  try {
    var Io = {};
    Object.defineProperty(Io, 'passive', {
      get: function () {
        Rs = !0;
      },
    }),
      window.addEventListener('test', Io, Io),
      window.removeEventListener('test', Io, Io);
  } catch {
    Rs = !1;
  }
function Tp(e, t, r, n, o, l, a, i, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, u);
  } catch (m) {
    this.onError(m);
  }
}
var Yo = !1,
  Aa = null,
  Na = !1,
  zs = null,
  Ip = {
    onError: function (e) {
      (Yo = !0), (Aa = e);
    },
  };
function Ap(e, t, r, n, o, l, a, i, s) {
  (Yo = !1), (Aa = null), Tp.apply(Ip, arguments);
}
function Np(e, t, r, n, o, l, a, i, s) {
  if ((Ap.apply(this, arguments), Yo)) {
    if (Yo) {
      var u = Aa;
      (Yo = !1), (Aa = null);
    } else throw Error(_(198));
    Na || ((Na = !0), (zs = u));
  }
}
function Rn(e) {
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
function $f(e) {
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
function cd(e) {
  if (Rn(e) !== e) throw Error(_(188));
}
function _p(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Rn(e)), t === null)) throw Error(_(188));
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
        if (l === r) return cd(o), e;
        if (l === n) return cd(o), t;
        l = l.sibling;
      }
      throw Error(_(188));
    }
    if (r.return !== n.return) (r = o), (n = l);
    else {
      for (var a = !1, i = o.child; i; ) {
        if (i === r) {
          (a = !0), (r = o), (n = l);
          break;
        }
        if (i === n) {
          (a = !0), (n = o), (r = l);
          break;
        }
        i = i.sibling;
      }
      if (!a) {
        for (i = l.child; i; ) {
          if (i === r) {
            (a = !0), (r = l), (n = o);
            break;
          }
          if (i === n) {
            (a = !0), (n = l), (r = o);
            break;
          }
          i = i.sibling;
        }
        if (!a) throw Error(_(189));
      }
    }
    if (r.alternate !== n) throw Error(_(190));
  }
  if (r.tag !== 3) throw Error(_(188));
  return r.stateNode.current === r ? e : t;
}
function Uf(e) {
  return (e = _p(e)), e !== null ? Wf(e) : null;
}
function Wf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Wf(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Vf = ht.unstable_scheduleCallback,
  ud = ht.unstable_cancelCallback,
  Mp = ht.unstable_shouldYield,
  Bp = ht.unstable_requestPaint,
  Pe = ht.unstable_now,
  Lp = ht.unstable_getCurrentPriorityLevel,
  Rc = ht.unstable_ImmediatePriority,
  Gf = ht.unstable_UserBlockingPriority,
  _a = ht.unstable_NormalPriority,
  Rp = ht.unstable_LowPriority,
  Zf = ht.unstable_IdlePriority,
  li = null,
  Kt = null;
function zp(e) {
  if (Kt && typeof Kt.onCommitFiberRoot == 'function')
    try {
      Kt.onCommitFiberRoot(li, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var zt = Math.clz32 ? Math.clz32 : jp,
  Op = Math.log,
  Hp = Math.LN2;
function jp(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Op(e) / Hp) | 0)) | 0;
}
var ql = 64,
  Jl = 4194304;
function Uo(e) {
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
function Ma(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var n = 0,
    o = e.suspendedLanes,
    l = e.pingedLanes,
    a = r & 268435455;
  if (a !== 0) {
    var i = a & ~o;
    i !== 0 ? (n = Uo(i)) : ((l &= a), l !== 0 && (n = Uo(l)));
  } else (a = r & ~o), a !== 0 ? (n = Uo(a)) : l !== 0 && (n = Uo(l));
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
      (r = 31 - zt(t)), (o = 1 << r), (n |= e[r]), (t &= ~o);
  return n;
}
function $p(e, t) {
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
function Up(e, t) {
  for (
    var r = e.suspendedLanes,
      n = e.pingedLanes,
      o = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;

  ) {
    var a = 31 - zt(l),
      i = 1 << a,
      s = o[a];
    s === -1
      ? (!(i & r) || i & n) && (o[a] = $p(i, t))
      : s <= t && (e.expiredLanes |= i),
      (l &= ~i);
  }
}
function Os(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Yf() {
  var e = ql;
  return (ql <<= 1), !(ql & 4194240) && (ql = 64), e;
}
function zi(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function Il(e, t, r) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - zt(t)),
    (e[t] = r);
}
function Wp(e, t) {
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
    var o = 31 - zt(r),
      l = 1 << o;
    (t[o] = 0), (n[o] = -1), (e[o] = -1), (r &= ~l);
  }
}
function zc(e, t) {
  var r = (e.entangledLanes |= t);
  for (e = e.entanglements; r; ) {
    var n = 31 - zt(r),
      o = 1 << n;
    (o & t) | (e[n] & t) && (e[n] |= t), (r &= ~o);
  }
}
var le = 0;
function Xf(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Qf,
  Oc,
  qf,
  Jf,
  Kf,
  Hs = !1,
  Kl = [],
  Vr = null,
  Gr = null,
  Zr = null,
  dl = new Map(),
  fl = new Map(),
  Rr = [],
  Vp =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function dd(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Vr = null;
      break;
    case 'dragenter':
    case 'dragleave':
      Gr = null;
      break;
    case 'mouseover':
    case 'mouseout':
      Zr = null;
      break;
    case 'pointerover':
    case 'pointerout':
      dl.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      fl.delete(t.pointerId);
  }
}
function Ao(e, t, r, n, o, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: n,
        nativeEvent: l,
        targetContainers: [o],
      }),
      t !== null && ((t = Nl(t)), t !== null && Oc(t)),
      e)
    : ((e.eventSystemFlags |= n),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function Gp(e, t, r, n, o) {
  switch (t) {
    case 'focusin':
      return (Vr = Ao(Vr, e, t, r, n, o)), !0;
    case 'dragenter':
      return (Gr = Ao(Gr, e, t, r, n, o)), !0;
    case 'mouseover':
      return (Zr = Ao(Zr, e, t, r, n, o)), !0;
    case 'pointerover':
      var l = o.pointerId;
      return dl.set(l, Ao(dl.get(l) || null, e, t, r, n, o)), !0;
    case 'gotpointercapture':
      return (
        (l = o.pointerId), fl.set(l, Ao(fl.get(l) || null, e, t, r, n, o)), !0
      );
  }
  return !1;
}
function em(e) {
  var t = Sn(e.target);
  if (t !== null) {
    var r = Rn(t);
    if (r !== null) {
      if (((t = r.tag), t === 13)) {
        if (((t = $f(r)), t !== null)) {
          (e.blockedOn = t),
            Kf(e.priority, function () {
              qf(r);
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
function ya(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = js(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var n = new r.constructor(r.type, r);
      (Bs = n), r.target.dispatchEvent(n), (Bs = null);
    } else return (t = Nl(r)), t !== null && Oc(t), (e.blockedOn = r), !1;
    t.shift();
  }
  return !0;
}
function fd(e, t, r) {
  ya(e) && r.delete(t);
}
function Zp() {
  (Hs = !1),
    Vr !== null && ya(Vr) && (Vr = null),
    Gr !== null && ya(Gr) && (Gr = null),
    Zr !== null && ya(Zr) && (Zr = null),
    dl.forEach(fd),
    fl.forEach(fd);
}
function No(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Hs ||
      ((Hs = !0),
      ht.unstable_scheduleCallback(ht.unstable_NormalPriority, Zp)));
}
function ml(e) {
  function t(o) {
    return No(o, e);
  }
  if (0 < Kl.length) {
    No(Kl[0], e);
    for (var r = 1; r < Kl.length; r++) {
      var n = Kl[r];
      n.blockedOn === e && (n.blockedOn = null);
    }
  }
  for (
    Vr !== null && No(Vr, e),
      Gr !== null && No(Gr, e),
      Zr !== null && No(Zr, e),
      dl.forEach(t),
      fl.forEach(t),
      r = 0;
    r < Rr.length;
    r++
  )
    (n = Rr[r]), n.blockedOn === e && (n.blockedOn = null);
  for (; 0 < Rr.length && ((r = Rr[0]), r.blockedOn === null); )
    em(r), r.blockedOn === null && Rr.shift();
}
var so = Cr.ReactCurrentBatchConfig,
  Ba = !0;
function Yp(e, t, r, n) {
  var o = le,
    l = so.transition;
  so.transition = null;
  try {
    (le = 1), Hc(e, t, r, n);
  } finally {
    (le = o), (so.transition = l);
  }
}
function Xp(e, t, r, n) {
  var o = le,
    l = so.transition;
  so.transition = null;
  try {
    (le = 4), Hc(e, t, r, n);
  } finally {
    (le = o), (so.transition = l);
  }
}
function Hc(e, t, r, n) {
  if (Ba) {
    var o = js(e, t, r, n);
    if (o === null) Yi(e, t, n, La, r), dd(e, n);
    else if (Gp(o, e, t, r, n)) n.stopPropagation();
    else if ((dd(e, n), t & 4 && -1 < Vp.indexOf(e))) {
      for (; o !== null; ) {
        var l = Nl(o);
        if (
          (l !== null && Qf(l),
          (l = js(e, t, r, n)),
          l === null && Yi(e, t, n, La, r),
          l === o)
        )
          break;
        o = l;
      }
      o !== null && n.stopPropagation();
    } else Yi(e, t, n, null, r);
  }
}
var La = null;
function js(e, t, r, n) {
  if (((La = null), (e = Lc(n)), (e = Sn(e)), e !== null))
    if (((t = Rn(e)), t === null)) e = null;
    else if (((r = t.tag), r === 13)) {
      if (((e = $f(t)), e !== null)) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (La = e), null;
}
function tm(e) {
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
      switch (Lp()) {
        case Rc:
          return 1;
        case Gf:
          return 4;
        case _a:
        case Rp:
          return 16;
        case Zf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var $r = null,
  jc = null,
  xa = null;
function rm() {
  if (xa) return xa;
  var e,
    t = jc,
    r = t.length,
    n,
    o = 'value' in $r ? $r.value : $r.textContent,
    l = o.length;
  for (e = 0; e < r && t[e] === o[e]; e++);
  var a = r - e;
  for (n = 1; n <= a && t[r - n] === o[l - n]; n++);
  return (xa = o.slice(e, 1 < n ? 1 - n : void 0));
}
function Sa(e) {
  var t = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ea() {
  return !0;
}
function md() {
  return !1;
}
function vt(e) {
  function t(r, n, o, l, a) {
    (this._reactName = r),
      (this._targetInst = o),
      (this.type = n),
      (this.nativeEvent = l),
      (this.target = a),
      (this.currentTarget = null);
    for (var i in e)
      e.hasOwnProperty(i) && ((r = e[i]), (this[i] = r ? r(l) : l[i]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? ea
        : md),
      (this.isPropagationStopped = md),
      this
    );
  }
  return (
    ye(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r &&
          (r.preventDefault
            ? r.preventDefault()
            : typeof r.returnValue != 'unknown' && (r.returnValue = !1),
          (this.isDefaultPrevented = ea));
      },
      stopPropagation: function () {
        var r = this.nativeEvent;
        r &&
          (r.stopPropagation
            ? r.stopPropagation()
            : typeof r.cancelBubble != 'unknown' && (r.cancelBubble = !0),
          (this.isPropagationStopped = ea));
      },
      persist: function () {},
      isPersistent: ea,
    }),
    t
  );
}
var wo = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  $c = vt(wo),
  Al = ye({}, wo, { view: 0, detail: 0 }),
  Qp = vt(Al),
  Oi,
  Hi,
  _o,
  ai = ye({}, Al, {
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
    getModifierState: Uc,
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
        : (e !== _o &&
            (_o && e.type === 'mousemove'
              ? ((Oi = e.screenX - _o.screenX), (Hi = e.screenY - _o.screenY))
              : (Hi = Oi = 0),
            (_o = e)),
          Oi);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : Hi;
    },
  }),
  gd = vt(ai),
  qp = ye({}, ai, { dataTransfer: 0 }),
  Jp = vt(qp),
  Kp = ye({}, Al, { relatedTarget: 0 }),
  ji = vt(Kp),
  e2 = ye({}, wo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  t2 = vt(e2),
  r2 = ye({}, wo, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  n2 = vt(r2),
  o2 = ye({}, wo, { data: 0 }),
  pd = vt(o2),
  l2 = {
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
  a2 = {
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
  i2 = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  };
function s2(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = i2[e]) ? !!t[e] : !1;
}
function Uc() {
  return s2;
}
var c2 = ye({}, Al, {
    key: function (e) {
      if (e.key) {
        var t = l2[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = Sa(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
        ? a2[e.keyCode] || 'Unidentified'
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
    getModifierState: Uc,
    charCode: function (e) {
      return e.type === 'keypress' ? Sa(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? Sa(e)
        : e.type === 'keydown' || e.type === 'keyup'
        ? e.keyCode
        : 0;
    },
  }),
  u2 = vt(c2),
  d2 = ye({}, ai, {
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
  hd = vt(d2),
  f2 = ye({}, Al, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Uc,
  }),
  m2 = vt(f2),
  g2 = ye({}, wo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  p2 = vt(g2),
  h2 = ye({}, ai, {
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
  b2 = vt(h2),
  v2 = [9, 13, 27, 32],
  Wc = br && 'CompositionEvent' in window,
  Xo = null;
br && 'documentMode' in document && (Xo = document.documentMode);
var y2 = br && 'TextEvent' in window && !Xo,
  nm = br && (!Wc || (Xo && 8 < Xo && 11 >= Xo)),
  bd = ' ',
  vd = !1;
function om(e, t) {
  switch (e) {
    case 'keyup':
      return v2.indexOf(t.keyCode) !== -1;
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
function lm(e) {
  return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
}
var Yn = !1;
function x2(e, t) {
  switch (e) {
    case 'compositionend':
      return lm(t);
    case 'keypress':
      return t.which !== 32 ? null : ((vd = !0), bd);
    case 'textInput':
      return (e = t.data), e === bd && vd ? null : e;
    default:
      return null;
  }
}
function S2(e, t) {
  if (Yn)
    return e === 'compositionend' || (!Wc && om(e, t))
      ? ((e = rm()), (xa = jc = $r = null), (Yn = !1), e)
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
      return nm && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var E2 = {
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
function yd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!E2[e.type] : t === 'textarea';
}
function am(e, t, r, n) {
  Rf(n),
    (t = Ra(t, 'onChange')),
    0 < t.length &&
      ((r = new $c('onChange', 'change', null, r, n)),
      e.push({ event: r, listeners: t }));
}
var Qo = null,
  gl = null;
function C2(e) {
  bm(e, 0);
}
function ii(e) {
  var t = qn(e);
  if (If(t)) return e;
}
function w2(e, t) {
  if (e === 'change') return t;
}
var im = !1;
if (br) {
  var $i;
  if (br) {
    var Ui = 'oninput' in document;
    if (!Ui) {
      var xd = document.createElement('div');
      xd.setAttribute('oninput', 'return;'),
        (Ui = typeof xd.oninput == 'function');
    }
    $i = Ui;
  } else $i = !1;
  im = $i && (!document.documentMode || 9 < document.documentMode);
}
function Sd() {
  Qo && (Qo.detachEvent('onpropertychange', sm), (gl = Qo = null));
}
function sm(e) {
  if (e.propertyName === 'value' && ii(gl)) {
    var t = [];
    am(t, gl, e, Lc(e)), jf(C2, t);
  }
}
function k2(e, t, r) {
  e === 'focusin'
    ? (Sd(), (Qo = t), (gl = r), Qo.attachEvent('onpropertychange', sm))
    : e === 'focusout' && Sd();
}
function P2(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return ii(gl);
}
function F2(e, t) {
  if (e === 'click') return ii(t);
}
function D2(e, t) {
  if (e === 'input' || e === 'change') return ii(t);
}
function T2(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ht = typeof Object.is == 'function' ? Object.is : T2;
function pl(e, t) {
  if (Ht(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1;
  var r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (n = 0; n < r.length; n++) {
    var o = r[n];
    if (!Cs.call(t, o) || !Ht(e[o], t[o])) return !1;
  }
  return !0;
}
function Ed(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Cd(e, t) {
  var r = Ed(e);
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
    r = Ed(r);
  }
}
function cm(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? cm(e, t.parentNode)
      : 'contains' in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function um() {
  for (var e = window, t = Ia(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == 'string';
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = Ia(e.document);
  }
  return t;
}
function Vc(e) {
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
function I2(e) {
  var t = um(),
    r = e.focusedElem,
    n = e.selectionRange;
  if (
    t !== r &&
    r &&
    r.ownerDocument &&
    cm(r.ownerDocument.documentElement, r)
  ) {
    if (n !== null && Vc(r)) {
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
          (o = Cd(r, l));
        var a = Cd(r, n);
        o &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          l > n
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
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
var A2 = br && 'documentMode' in document && 11 >= document.documentMode,
  Xn = null,
  $s = null,
  qo = null,
  Us = !1;
function wd(e, t, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  Us ||
    Xn == null ||
    Xn !== Ia(n) ||
    ((n = Xn),
    'selectionStart' in n && Vc(n)
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
    (qo && pl(qo, n)) ||
      ((qo = n),
      (n = Ra($s, 'onSelect')),
      0 < n.length &&
        ((t = new $c('onSelect', 'select', null, t, r)),
        e.push({ event: t, listeners: n }),
        (t.target = Xn))));
}
function ta(e, t) {
  var r = {};
  return (
    (r[e.toLowerCase()] = t.toLowerCase()),
    (r['Webkit' + e] = 'webkit' + t),
    (r['Moz' + e] = 'moz' + t),
    r
  );
}
var Qn = {
    animationend: ta('Animation', 'AnimationEnd'),
    animationiteration: ta('Animation', 'AnimationIteration'),
    animationstart: ta('Animation', 'AnimationStart'),
    transitionend: ta('Transition', 'TransitionEnd'),
  },
  Wi = {},
  dm = {};
br &&
  ((dm = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete Qn.animationend.animation,
    delete Qn.animationiteration.animation,
    delete Qn.animationstart.animation),
  'TransitionEvent' in window || delete Qn.transitionend.transition);
function si(e) {
  if (Wi[e]) return Wi[e];
  if (!Qn[e]) return e;
  var t = Qn[e],
    r;
  for (r in t) if (t.hasOwnProperty(r) && r in dm) return (Wi[e] = t[r]);
  return e;
}
var fm = si('animationend'),
  mm = si('animationiteration'),
  gm = si('animationstart'),
  pm = si('transitionend'),
  hm = new Map(),
  kd =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function ln(e, t) {
  hm.set(e, t), Ln(t, [e]);
}
for (var Vi = 0; Vi < kd.length; Vi++) {
  var Gi = kd[Vi],
    N2 = Gi.toLowerCase(),
    _2 = Gi[0].toUpperCase() + Gi.slice(1);
  ln(N2, 'on' + _2);
}
ln(fm, 'onAnimationEnd');
ln(mm, 'onAnimationIteration');
ln(gm, 'onAnimationStart');
ln('dblclick', 'onDoubleClick');
ln('focusin', 'onFocus');
ln('focusout', 'onBlur');
ln(pm, 'onTransitionEnd');
mo('onMouseEnter', ['mouseout', 'mouseover']);
mo('onMouseLeave', ['mouseout', 'mouseover']);
mo('onPointerEnter', ['pointerout', 'pointerover']);
mo('onPointerLeave', ['pointerout', 'pointerover']);
Ln(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(' ')
);
Ln(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' '
  )
);
Ln('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
Ln(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
Ln(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
Ln(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
var Wo =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  M2 = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Wo));
function Pd(e, t, r) {
  var n = e.type || 'unknown-event';
  (e.currentTarget = r), Np(n, t, void 0, e), (e.currentTarget = null);
}
function bm(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var n = e[r],
      o = n.event;
    n = n.listeners;
    e: {
      var l = void 0;
      if (t)
        for (var a = n.length - 1; 0 <= a; a--) {
          var i = n[a],
            s = i.instance,
            u = i.currentTarget;
          if (((i = i.listener), s !== l && o.isPropagationStopped())) break e;
          Pd(o, i, u), (l = s);
        }
      else
        for (a = 0; a < n.length; a++) {
          if (
            ((i = n[a]),
            (s = i.instance),
            (u = i.currentTarget),
            (i = i.listener),
            s !== l && o.isPropagationStopped())
          )
            break e;
          Pd(o, i, u), (l = s);
        }
    }
  }
  if (Na) throw ((e = zs), (Na = !1), (zs = null), e);
}
function fe(e, t) {
  var r = t[Ys];
  r === void 0 && (r = t[Ys] = new Set());
  var n = e + '__bubble';
  r.has(n) || (vm(t, e, 2, !1), r.add(n));
}
function Zi(e, t, r) {
  var n = 0;
  t && (n |= 4), vm(r, e, n, t);
}
var ra = '_reactListening' + Math.random().toString(36).slice(2);
function hl(e) {
  if (!e[ra]) {
    (e[ra] = !0),
      kf.forEach(function (r) {
        r !== 'selectionchange' && (M2.has(r) || Zi(r, !1, e), Zi(r, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ra] || ((t[ra] = !0), Zi('selectionchange', !1, t));
  }
}
function vm(e, t, r, n) {
  switch (tm(t)) {
    case 1:
      var o = Yp;
      break;
    case 4:
      o = Xp;
      break;
    default:
      o = Hc;
  }
  (r = o.bind(null, t, r, e)),
    (o = void 0),
    !Rs ||
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
function Yi(e, t, r, n, o) {
  var l = n;
  if (!(t & 1) && !(t & 2) && n !== null)
    e: for (;;) {
      if (n === null) return;
      var a = n.tag;
      if (a === 3 || a === 4) {
        var i = n.stateNode.containerInfo;
        if (i === o || (i.nodeType === 8 && i.parentNode === o)) break;
        if (a === 4)
          for (a = n.return; a !== null; ) {
            var s = a.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = a.stateNode.containerInfo),
              s === o || (s.nodeType === 8 && s.parentNode === o))
            )
              return;
            a = a.return;
          }
        for (; i !== null; ) {
          if (((a = Sn(i)), a === null)) return;
          if (((s = a.tag), s === 5 || s === 6)) {
            n = l = a;
            continue e;
          }
          i = i.parentNode;
        }
      }
      n = n.return;
    }
  jf(function () {
    var u = l,
      m = Lc(r),
      g = [];
    e: {
      var p = hm.get(e);
      if (p !== void 0) {
        var v = $c,
          y = e;
        switch (e) {
          case 'keypress':
            if (Sa(r) === 0) break e;
          case 'keydown':
          case 'keyup':
            v = u2;
            break;
          case 'focusin':
            (y = 'focus'), (v = ji);
            break;
          case 'focusout':
            (y = 'blur'), (v = ji);
            break;
          case 'beforeblur':
          case 'afterblur':
            v = ji;
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
            v = gd;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            v = Jp;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            v = m2;
            break;
          case fm:
          case mm:
          case gm:
            v = t2;
            break;
          case pm:
            v = p2;
            break;
          case 'scroll':
            v = Qp;
            break;
          case 'wheel':
            v = b2;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            v = n2;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            v = hd;
        }
        var x = (t & 4) !== 0,
          k = !x && e === 'scroll',
          h = x ? (p !== null ? p + 'Capture' : null) : p;
        x = [];
        for (var f = u, b; f !== null; ) {
          b = f;
          var S = b.stateNode;
          if (
            (b.tag === 5 &&
              S !== null &&
              ((b = S),
              h !== null && ((S = ul(f, h)), S != null && x.push(bl(f, S, b)))),
            k)
          )
            break;
          f = f.return;
        }
        0 < x.length &&
          ((p = new v(p, y, null, r, m)), g.push({ event: p, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === 'mouseover' || e === 'pointerover'),
          (v = e === 'mouseout' || e === 'pointerout'),
          p &&
            r !== Bs &&
            (y = r.relatedTarget || r.fromElement) &&
            (Sn(y) || y[vr]))
        )
          break e;
        if (
          (v || p) &&
          ((p =
            m.window === m
              ? m
              : (p = m.ownerDocument)
              ? p.defaultView || p.parentWindow
              : window),
          v
            ? ((y = r.relatedTarget || r.toElement),
              (v = u),
              (y = y ? Sn(y) : null),
              y !== null &&
                ((k = Rn(y)), y !== k || (y.tag !== 5 && y.tag !== 6)) &&
                (y = null))
            : ((v = null), (y = u)),
          v !== y)
        ) {
          if (
            ((x = gd),
            (S = 'onMouseLeave'),
            (h = 'onMouseEnter'),
            (f = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((x = hd),
              (S = 'onPointerLeave'),
              (h = 'onPointerEnter'),
              (f = 'pointer')),
            (k = v == null ? p : qn(v)),
            (b = y == null ? p : qn(y)),
            (p = new x(S, f + 'leave', v, r, m)),
            (p.target = k),
            (p.relatedTarget = b),
            (S = null),
            Sn(m) === u &&
              ((x = new x(h, f + 'enter', y, r, m)),
              (x.target = b),
              (x.relatedTarget = k),
              (S = x)),
            (k = S),
            v && y)
          )
            t: {
              for (x = v, h = y, f = 0, b = x; b; b = jn(b)) f++;
              for (b = 0, S = h; S; S = jn(S)) b++;
              for (; 0 < f - b; ) (x = jn(x)), f--;
              for (; 0 < b - f; ) (h = jn(h)), b--;
              for (; f--; ) {
                if (x === h || (h !== null && x === h.alternate)) break t;
                (x = jn(x)), (h = jn(h));
              }
              x = null;
            }
          else x = null;
          v !== null && Fd(g, p, v, x, !1),
            y !== null && k !== null && Fd(g, k, y, x, !0);
        }
      }
      e: {
        if (
          ((p = u ? qn(u) : window),
          (v = p.nodeName && p.nodeName.toLowerCase()),
          v === 'select' || (v === 'input' && p.type === 'file'))
        )
          var F = w2;
        else if (yd(p))
          if (im) F = D2;
          else {
            F = P2;
            var w = k2;
          }
        else
          (v = p.nodeName) &&
            v.toLowerCase() === 'input' &&
            (p.type === 'checkbox' || p.type === 'radio') &&
            (F = F2);
        if (F && (F = F(e, u))) {
          am(g, F, r, m);
          break e;
        }
        w && w(e, p, u),
          e === 'focusout' &&
            (w = p._wrapperState) &&
            w.controlled &&
            p.type === 'number' &&
            Is(p, 'number', p.value);
      }
      switch (((w = u ? qn(u) : window), e)) {
        case 'focusin':
          (yd(w) || w.contentEditable === 'true') &&
            ((Xn = w), ($s = u), (qo = null));
          break;
        case 'focusout':
          qo = $s = Xn = null;
          break;
        case 'mousedown':
          Us = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          (Us = !1), wd(g, r, m);
          break;
        case 'selectionchange':
          if (A2) break;
        case 'keydown':
        case 'keyup':
          wd(g, r, m);
      }
      var P;
      if (Wc)
        e: {
          switch (e) {
            case 'compositionstart':
              var E = 'onCompositionStart';
              break e;
            case 'compositionend':
              E = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              E = 'onCompositionUpdate';
              break e;
          }
          E = void 0;
        }
      else
        Yn
          ? om(e, r) && (E = 'onCompositionEnd')
          : e === 'keydown' && r.keyCode === 229 && (E = 'onCompositionStart');
      E &&
        (nm &&
          r.locale !== 'ko' &&
          (Yn || E !== 'onCompositionStart'
            ? E === 'onCompositionEnd' && Yn && (P = rm())
            : (($r = m),
              (jc = 'value' in $r ? $r.value : $r.textContent),
              (Yn = !0))),
        (w = Ra(u, E)),
        0 < w.length &&
          ((E = new pd(E, e, null, r, m)),
          g.push({ event: E, listeners: w }),
          P ? (E.data = P) : ((P = lm(r)), P !== null && (E.data = P)))),
        (P = y2 ? x2(e, r) : S2(e, r)) &&
          ((u = Ra(u, 'onBeforeInput')),
          0 < u.length &&
            ((m = new pd('onBeforeInput', 'beforeinput', null, r, m)),
            g.push({ event: m, listeners: u }),
            (m.data = P)));
    }
    bm(g, t);
  });
}
function bl(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function Ra(e, t) {
  for (var r = t + 'Capture', n = []; e !== null; ) {
    var o = e,
      l = o.stateNode;
    o.tag === 5 &&
      l !== null &&
      ((o = l),
      (l = ul(e, r)),
      l != null && n.unshift(bl(e, l, o)),
      (l = ul(e, t)),
      l != null && n.push(bl(e, l, o))),
      (e = e.return);
  }
  return n;
}
function jn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Fd(e, t, r, n, o) {
  for (var l = t._reactName, a = []; r !== null && r !== n; ) {
    var i = r,
      s = i.alternate,
      u = i.stateNode;
    if (s !== null && s === n) break;
    i.tag === 5 &&
      u !== null &&
      ((i = u),
      o
        ? ((s = ul(r, l)), s != null && a.unshift(bl(r, s, i)))
        : o || ((s = ul(r, l)), s != null && a.push(bl(r, s, i)))),
      (r = r.return);
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var B2 = /\r\n?/g,
  L2 = /\u0000|\uFFFD/g;
function Dd(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      B2,
      `
`
    )
    .replace(L2, '');
}
function na(e, t, r) {
  if (((t = Dd(t)), Dd(e) !== t && r)) throw Error(_(425));
}
function za() {}
var Ws = null,
  Vs = null;
function Gs(e, t) {
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
var Zs = typeof setTimeout == 'function' ? setTimeout : void 0,
  R2 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  Td = typeof Promise == 'function' ? Promise : void 0,
  z2 =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof Td < 'u'
      ? function (e) {
          return Td.resolve(null).then(e).catch(O2);
        }
      : Zs;
function O2(e) {
  setTimeout(function () {
    throw e;
  });
}
function Xi(e, t) {
  var r = t,
    n = 0;
  do {
    var o = r.nextSibling;
    if ((e.removeChild(r), o && o.nodeType === 8))
      if (((r = o.data), r === '/$')) {
        if (n === 0) {
          e.removeChild(o), ml(t);
          return;
        }
        n--;
      } else (r !== '$' && r !== '$?' && r !== '$!') || n++;
    r = o;
  } while (r);
  ml(t);
}
function Yr(e) {
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
function Id(e) {
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
var ko = Math.random().toString(36).slice(2),
  Qt = '__reactFiber$' + ko,
  vl = '__reactProps$' + ko,
  vr = '__reactContainer$' + ko,
  Ys = '__reactEvents$' + ko,
  H2 = '__reactListeners$' + ko,
  j2 = '__reactHandles$' + ko;
function Sn(e) {
  var t = e[Qt];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if ((t = r[vr] || r[Qt])) {
      if (
        ((r = t.alternate),
        t.child !== null || (r !== null && r.child !== null))
      )
        for (e = Id(e); e !== null; ) {
          if ((r = e[Qt])) return r;
          e = Id(e);
        }
      return t;
    }
    (e = r), (r = e.parentNode);
  }
  return null;
}
function Nl(e) {
  return (
    (e = e[Qt] || e[vr]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function qn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function ci(e) {
  return e[vl] || null;
}
var Xs = [],
  Jn = -1;
function an(e) {
  return { current: e };
}
function me(e) {
  0 > Jn || ((e.current = Xs[Jn]), (Xs[Jn] = null), Jn--);
}
function de(e, t) {
  Jn++, (Xs[Jn] = e.current), (e.current = t);
}
var nn = {},
  Xe = an(nn),
  lt = an(!1),
  Fn = nn;
function go(e, t) {
  var r = e.type.contextTypes;
  if (!r) return nn;
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
function at(e) {
  return (e = e.childContextTypes), e != null;
}
function Oa() {
  me(lt), me(Xe);
}
function Ad(e, t, r) {
  if (Xe.current !== nn) throw Error(_(168));
  de(Xe, t), de(lt, r);
}
function ym(e, t, r) {
  var n = e.stateNode;
  if (((t = t.childContextTypes), typeof n.getChildContext != 'function'))
    return r;
  n = n.getChildContext();
  for (var o in n) if (!(o in t)) throw Error(_(108, kp(e) || 'Unknown', o));
  return ye({}, r, n);
}
function Ha(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || nn),
    (Fn = Xe.current),
    de(Xe, e),
    de(lt, lt.current),
    !0
  );
}
function Nd(e, t, r) {
  var n = e.stateNode;
  if (!n) throw Error(_(169));
  r
    ? ((e = ym(e, t, Fn)),
      (n.__reactInternalMemoizedMergedChildContext = e),
      me(lt),
      me(Xe),
      de(Xe, e))
    : me(lt),
    de(lt, r);
}
var fr = null,
  ui = !1,
  Qi = !1;
function xm(e) {
  fr === null ? (fr = [e]) : fr.push(e);
}
function $2(e) {
  (ui = !0), xm(e);
}
function sn() {
  if (!Qi && fr !== null) {
    Qi = !0;
    var e = 0,
      t = le;
    try {
      var r = fr;
      for (le = 1; e < r.length; e++) {
        var n = r[e];
        do n = n(!0);
        while (n !== null);
      }
      (fr = null), (ui = !1);
    } catch (o) {
      throw (fr !== null && (fr = fr.slice(e + 1)), Vf(Rc, sn), o);
    } finally {
      (le = t), (Qi = !1);
    }
  }
  return null;
}
var Kn = [],
  eo = 0,
  ja = null,
  $a = 0,
  Ct = [],
  wt = 0,
  Dn = null,
  gr = 1,
  pr = '';
function yn(e, t) {
  (Kn[eo++] = $a), (Kn[eo++] = ja), (ja = e), ($a = t);
}
function Sm(e, t, r) {
  (Ct[wt++] = gr), (Ct[wt++] = pr), (Ct[wt++] = Dn), (Dn = e);
  var n = gr;
  e = pr;
  var o = 32 - zt(n) - 1;
  (n &= ~(1 << o)), (r += 1);
  var l = 32 - zt(t) + o;
  if (30 < l) {
    var a = o - (o % 5);
    (l = (n & ((1 << a) - 1)).toString(32)),
      (n >>= a),
      (o -= a),
      (gr = (1 << (32 - zt(t) + o)) | (r << o) | n),
      (pr = l + e);
  } else (gr = (1 << l) | (r << o) | n), (pr = e);
}
function Gc(e) {
  e.return !== null && (yn(e, 1), Sm(e, 1, 0));
}
function Zc(e) {
  for (; e === ja; )
    (ja = Kn[--eo]), (Kn[eo] = null), ($a = Kn[--eo]), (Kn[eo] = null);
  for (; e === Dn; )
    (Dn = Ct[--wt]),
      (Ct[wt] = null),
      (pr = Ct[--wt]),
      (Ct[wt] = null),
      (gr = Ct[--wt]),
      (Ct[wt] = null);
}
var pt = null,
  gt = null,
  pe = !1,
  Lt = null;
function Em(e, t) {
  var r = kt(5, null, null, 0);
  (r.elementType = 'DELETED'),
    (r.stateNode = t),
    (r.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r);
}
function _d(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return (
        (t =
          t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (pt = e), (gt = Yr(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (pt = e), (gt = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((r = Dn !== null ? { id: gr, overflow: pr } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: r,
              retryLane: 1073741824,
            }),
            (r = kt(18, null, null, 0)),
            (r.stateNode = t),
            (r.return = e),
            (e.child = r),
            (pt = e),
            (gt = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Qs(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function qs(e) {
  if (pe) {
    var t = gt;
    if (t) {
      var r = t;
      if (!_d(e, t)) {
        if (Qs(e)) throw Error(_(418));
        t = Yr(r.nextSibling);
        var n = pt;
        t && _d(e, t)
          ? Em(n, r)
          : ((e.flags = (e.flags & -4097) | 2), (pe = !1), (pt = e));
      }
    } else {
      if (Qs(e)) throw Error(_(418));
      (e.flags = (e.flags & -4097) | 2), (pe = !1), (pt = e);
    }
  }
}
function Md(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  pt = e;
}
function oa(e) {
  if (e !== pt) return !1;
  if (!pe) return Md(e), (pe = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !Gs(e.type, e.memoizedProps))),
    t && (t = gt))
  ) {
    if (Qs(e)) throw (Cm(), Error(_(418)));
    for (; t; ) Em(e, t), (t = Yr(t.nextSibling));
  }
  if ((Md(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(_(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === '/$') {
            if (t === 0) {
              gt = Yr(e.nextSibling);
              break e;
            }
            t--;
          } else (r !== '$' && r !== '$!' && r !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      gt = null;
    }
  } else gt = pt ? Yr(e.stateNode.nextSibling) : null;
  return !0;
}
function Cm() {
  for (var e = gt; e; ) e = Yr(e.nextSibling);
}
function po() {
  (gt = pt = null), (pe = !1);
}
function Yc(e) {
  Lt === null ? (Lt = [e]) : Lt.push(e);
}
var U2 = Cr.ReactCurrentBatchConfig;
function Mo(e, t, r) {
  if (
    ((e = r.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (r._owner) {
      if (((r = r._owner), r)) {
        if (r.tag !== 1) throw Error(_(309));
        var n = r.stateNode;
      }
      if (!n) throw Error(_(147, e));
      var o = n,
        l = '' + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === l
        ? t.ref
        : ((t = function (a) {
            var i = o.refs;
            a === null ? delete i[l] : (i[l] = a);
          }),
          (t._stringRef = l),
          t);
    }
    if (typeof e != 'string') throw Error(_(284));
    if (!r._owner) throw Error(_(290, e));
  }
  return e;
}
function la(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      _(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e
      )
    ))
  );
}
function Bd(e) {
  var t = e._init;
  return t(e._payload);
}
function wm(e) {
  function t(h, f) {
    if (e) {
      var b = h.deletions;
      b === null ? ((h.deletions = [f]), (h.flags |= 16)) : b.push(f);
    }
  }
  function r(h, f) {
    if (!e) return null;
    for (; f !== null; ) t(h, f), (f = f.sibling);
    return null;
  }
  function n(h, f) {
    for (h = new Map(); f !== null; )
      f.key !== null ? h.set(f.key, f) : h.set(f.index, f), (f = f.sibling);
    return h;
  }
  function o(h, f) {
    return (h = Jr(h, f)), (h.index = 0), (h.sibling = null), h;
  }
  function l(h, f, b) {
    return (
      (h.index = b),
      e
        ? ((b = h.alternate),
          b !== null
            ? ((b = b.index), b < f ? ((h.flags |= 2), f) : b)
            : ((h.flags |= 2), f))
        : ((h.flags |= 1048576), f)
    );
  }
  function a(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function i(h, f, b, S) {
    return f === null || f.tag !== 6
      ? ((f = ns(b, h.mode, S)), (f.return = h), f)
      : ((f = o(f, b)), (f.return = h), f);
  }
  function s(h, f, b, S) {
    var F = b.type;
    return F === Zn
      ? m(h, f, b.props.children, S, b.key)
      : f !== null &&
        (f.elementType === F ||
          (typeof F == 'object' &&
            F !== null &&
            F.$$typeof === Mr &&
            Bd(F) === f.type))
      ? ((S = o(f, b.props)), (S.ref = Mo(h, f, b)), (S.return = h), S)
      : ((S = Da(b.type, b.key, b.props, null, h.mode, S)),
        (S.ref = Mo(h, f, b)),
        (S.return = h),
        S);
  }
  function u(h, f, b, S) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== b.containerInfo ||
      f.stateNode.implementation !== b.implementation
      ? ((f = os(b, h.mode, S)), (f.return = h), f)
      : ((f = o(f, b.children || [])), (f.return = h), f);
  }
  function m(h, f, b, S, F) {
    return f === null || f.tag !== 7
      ? ((f = Pn(b, h.mode, S, F)), (f.return = h), f)
      : ((f = o(f, b)), (f.return = h), f);
  }
  function g(h, f, b) {
    if ((typeof f == 'string' && f !== '') || typeof f == 'number')
      return (f = ns('' + f, h.mode, b)), (f.return = h), f;
    if (typeof f == 'object' && f !== null) {
      switch (f.$$typeof) {
        case Yl:
          return (
            (b = Da(f.type, f.key, f.props, null, h.mode, b)),
            (b.ref = Mo(h, null, f)),
            (b.return = h),
            b
          );
        case Gn:
          return (f = os(f, h.mode, b)), (f.return = h), f;
        case Mr:
          var S = f._init;
          return g(h, S(f._payload), b);
      }
      if ($o(f) || To(f))
        return (f = Pn(f, h.mode, b, null)), (f.return = h), f;
      la(h, f);
    }
    return null;
  }
  function p(h, f, b, S) {
    var F = f !== null ? f.key : null;
    if ((typeof b == 'string' && b !== '') || typeof b == 'number')
      return F !== null ? null : i(h, f, '' + b, S);
    if (typeof b == 'object' && b !== null) {
      switch (b.$$typeof) {
        case Yl:
          return b.key === F ? s(h, f, b, S) : null;
        case Gn:
          return b.key === F ? u(h, f, b, S) : null;
        case Mr:
          return (F = b._init), p(h, f, F(b._payload), S);
      }
      if ($o(b) || To(b)) return F !== null ? null : m(h, f, b, S, null);
      la(h, b);
    }
    return null;
  }
  function v(h, f, b, S, F) {
    if ((typeof S == 'string' && S !== '') || typeof S == 'number')
      return (h = h.get(b) || null), i(f, h, '' + S, F);
    if (typeof S == 'object' && S !== null) {
      switch (S.$$typeof) {
        case Yl:
          return (h = h.get(S.key === null ? b : S.key) || null), s(f, h, S, F);
        case Gn:
          return (h = h.get(S.key === null ? b : S.key) || null), u(f, h, S, F);
        case Mr:
          var w = S._init;
          return v(h, f, b, w(S._payload), F);
      }
      if ($o(S) || To(S)) return (h = h.get(b) || null), m(f, h, S, F, null);
      la(f, S);
    }
    return null;
  }
  function y(h, f, b, S) {
    for (
      var F = null, w = null, P = f, E = (f = 0), A = null;
      P !== null && E < b.length;
      E++
    ) {
      P.index > E ? ((A = P), (P = null)) : (A = P.sibling);
      var D = p(h, P, b[E], S);
      if (D === null) {
        P === null && (P = A);
        break;
      }
      e && P && D.alternate === null && t(h, P),
        (f = l(D, f, E)),
        w === null ? (F = D) : (w.sibling = D),
        (w = D),
        (P = A);
    }
    if (E === b.length) return r(h, P), pe && yn(h, E), F;
    if (P === null) {
      for (; E < b.length; E++)
        (P = g(h, b[E], S)),
          P !== null &&
            ((f = l(P, f, E)), w === null ? (F = P) : (w.sibling = P), (w = P));
      return pe && yn(h, E), F;
    }
    for (P = n(h, P); E < b.length; E++)
      (A = v(P, h, E, b[E], S)),
        A !== null &&
          (e && A.alternate !== null && P.delete(A.key === null ? E : A.key),
          (f = l(A, f, E)),
          w === null ? (F = A) : (w.sibling = A),
          (w = A));
    return (
      e &&
        P.forEach(function (N) {
          return t(h, N);
        }),
      pe && yn(h, E),
      F
    );
  }
  function x(h, f, b, S) {
    var F = To(b);
    if (typeof F != 'function') throw Error(_(150));
    if (((b = F.call(b)), b == null)) throw Error(_(151));
    for (
      var w = (F = null), P = f, E = (f = 0), A = null, D = b.next();
      P !== null && !D.done;
      E++, D = b.next()
    ) {
      P.index > E ? ((A = P), (P = null)) : (A = P.sibling);
      var N = p(h, P, D.value, S);
      if (N === null) {
        P === null && (P = A);
        break;
      }
      e && P && N.alternate === null && t(h, P),
        (f = l(N, f, E)),
        w === null ? (F = N) : (w.sibling = N),
        (w = N),
        (P = A);
    }
    if (D.done) return r(h, P), pe && yn(h, E), F;
    if (P === null) {
      for (; !D.done; E++, D = b.next())
        (D = g(h, D.value, S)),
          D !== null &&
            ((f = l(D, f, E)), w === null ? (F = D) : (w.sibling = D), (w = D));
      return pe && yn(h, E), F;
    }
    for (P = n(h, P); !D.done; E++, D = b.next())
      (D = v(P, h, E, D.value, S)),
        D !== null &&
          (e && D.alternate !== null && P.delete(D.key === null ? E : D.key),
          (f = l(D, f, E)),
          w === null ? (F = D) : (w.sibling = D),
          (w = D));
    return (
      e &&
        P.forEach(function (B) {
          return t(h, B);
        }),
      pe && yn(h, E),
      F
    );
  }
  function k(h, f, b, S) {
    if (
      (typeof b == 'object' &&
        b !== null &&
        b.type === Zn &&
        b.key === null &&
        (b = b.props.children),
      typeof b == 'object' && b !== null)
    ) {
      switch (b.$$typeof) {
        case Yl:
          e: {
            for (var F = b.key, w = f; w !== null; ) {
              if (w.key === F) {
                if (((F = b.type), F === Zn)) {
                  if (w.tag === 7) {
                    r(h, w.sibling),
                      (f = o(w, b.props.children)),
                      (f.return = h),
                      (h = f);
                    break e;
                  }
                } else if (
                  w.elementType === F ||
                  (typeof F == 'object' &&
                    F !== null &&
                    F.$$typeof === Mr &&
                    Bd(F) === w.type)
                ) {
                  r(h, w.sibling),
                    (f = o(w, b.props)),
                    (f.ref = Mo(h, w, b)),
                    (f.return = h),
                    (h = f);
                  break e;
                }
                r(h, w);
                break;
              } else t(h, w);
              w = w.sibling;
            }
            b.type === Zn
              ? ((f = Pn(b.props.children, h.mode, S, b.key)),
                (f.return = h),
                (h = f))
              : ((S = Da(b.type, b.key, b.props, null, h.mode, S)),
                (S.ref = Mo(h, f, b)),
                (S.return = h),
                (h = S));
          }
          return a(h);
        case Gn:
          e: {
            for (w = b.key; f !== null; ) {
              if (f.key === w)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === b.containerInfo &&
                  f.stateNode.implementation === b.implementation
                ) {
                  r(h, f.sibling),
                    (f = o(f, b.children || [])),
                    (f.return = h),
                    (h = f);
                  break e;
                } else {
                  r(h, f);
                  break;
                }
              else t(h, f);
              f = f.sibling;
            }
            (f = os(b, h.mode, S)), (f.return = h), (h = f);
          }
          return a(h);
        case Mr:
          return (w = b._init), k(h, f, w(b._payload), S);
      }
      if ($o(b)) return y(h, f, b, S);
      if (To(b)) return x(h, f, b, S);
      la(h, b);
    }
    return (typeof b == 'string' && b !== '') || typeof b == 'number'
      ? ((b = '' + b),
        f !== null && f.tag === 6
          ? (r(h, f.sibling), (f = o(f, b)), (f.return = h), (h = f))
          : (r(h, f), (f = ns(b, h.mode, S)), (f.return = h), (h = f)),
        a(h))
      : r(h, f);
  }
  return k;
}
var ho = wm(!0),
  km = wm(!1),
  Ua = an(null),
  Wa = null,
  to = null,
  Xc = null;
function Qc() {
  Xc = to = Wa = null;
}
function qc(e) {
  var t = Ua.current;
  me(Ua), (e._currentValue = t);
}
function Js(e, t, r) {
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
function co(e, t) {
  (Wa = e),
    (Xc = to = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ot = !0), (e.firstContext = null));
}
function Ft(e) {
  var t = e._currentValue;
  if (Xc !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), to === null)) {
      if (Wa === null) throw Error(_(308));
      (to = e), (Wa.dependencies = { lanes: 0, firstContext: e });
    } else to = to.next = e;
  return t;
}
var En = null;
function Jc(e) {
  En === null ? (En = [e]) : En.push(e);
}
function Pm(e, t, r, n) {
  var o = t.interleaved;
  return (
    o === null ? ((r.next = r), Jc(t)) : ((r.next = o.next), (o.next = r)),
    (t.interleaved = r),
    yr(e, n)
  );
}
function yr(e, t) {
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
var Br = !1;
function Kc(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Fm(e, t) {
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
function hr(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Xr(e, t, r) {
  var n = e.updateQueue;
  if (n === null) return null;
  if (((n = n.shared), oe & 2)) {
    var o = n.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (n.pending = t),
      yr(e, r)
    );
  }
  return (
    (o = n.interleaved),
    o === null ? ((t.next = t), Jc(n)) : ((t.next = o.next), (o.next = t)),
    (n.interleaved = t),
    yr(e, r)
  );
}
function Ea(e, t, r) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
  ) {
    var n = t.lanes;
    (n &= e.pendingLanes), (r |= n), (t.lanes = r), zc(e, r);
  }
}
function Ld(e, t) {
  var r = e.updateQueue,
    n = e.alternate;
  if (n !== null && ((n = n.updateQueue), r === n)) {
    var o = null,
      l = null;
    if (((r = r.firstBaseUpdate), r !== null)) {
      do {
        var a = {
          eventTime: r.eventTime,
          lane: r.lane,
          tag: r.tag,
          payload: r.payload,
          callback: r.callback,
          next: null,
        };
        l === null ? (o = l = a) : (l = l.next = a), (r = r.next);
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
function Va(e, t, r, n) {
  var o = e.updateQueue;
  Br = !1;
  var l = o.firstBaseUpdate,
    a = o.lastBaseUpdate,
    i = o.shared.pending;
  if (i !== null) {
    o.shared.pending = null;
    var s = i,
      u = s.next;
    (s.next = null), a === null ? (l = u) : (a.next = u), (a = s);
    var m = e.alternate;
    m !== null &&
      ((m = m.updateQueue),
      (i = m.lastBaseUpdate),
      i !== a &&
        (i === null ? (m.firstBaseUpdate = u) : (i.next = u),
        (m.lastBaseUpdate = s)));
  }
  if (l !== null) {
    var g = o.baseState;
    (a = 0), (m = u = s = null), (i = l);
    do {
      var p = i.lane,
        v = i.eventTime;
      if ((n & p) === p) {
        m !== null &&
          (m = m.next =
            {
              eventTime: v,
              lane: 0,
              tag: i.tag,
              payload: i.payload,
              callback: i.callback,
              next: null,
            });
        e: {
          var y = e,
            x = i;
          switch (((p = t), (v = r), x.tag)) {
            case 1:
              if (((y = x.payload), typeof y == 'function')) {
                g = y.call(v, g, p);
                break e;
              }
              g = y;
              break e;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (
                ((y = x.payload),
                (p = typeof y == 'function' ? y.call(v, g, p) : y),
                p == null)
              )
                break e;
              g = ye({}, g, p);
              break e;
            case 2:
              Br = !0;
          }
        }
        i.callback !== null &&
          i.lane !== 0 &&
          ((e.flags |= 64),
          (p = o.effects),
          p === null ? (o.effects = [i]) : p.push(i));
      } else
        (v = {
          eventTime: v,
          lane: p,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null,
        }),
          m === null ? ((u = m = v), (s = g)) : (m = m.next = v),
          (a |= p);
      if (((i = i.next), i === null)) {
        if (((i = o.shared.pending), i === null)) break;
        (p = i),
          (i = p.next),
          (p.next = null),
          (o.lastBaseUpdate = p),
          (o.shared.pending = null);
      }
    } while (!0);
    if (
      (m === null && (s = g),
      (o.baseState = s),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = m),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (a |= o.lane), (o = o.next);
      while (o !== t);
    } else l === null && (o.shared.lanes = 0);
    (In |= a), (e.lanes = a), (e.memoizedState = g);
  }
}
function Rd(e, t, r) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var n = e[t],
        o = n.callback;
      if (o !== null) {
        if (((n.callback = null), (n = r), typeof o != 'function'))
          throw Error(_(191, o));
        o.call(n);
      }
    }
}
var _l = {},
  er = an(_l),
  yl = an(_l),
  xl = an(_l);
function Cn(e) {
  if (e === _l) throw Error(_(174));
  return e;
}
function eu(e, t) {
  switch ((de(xl, t), de(yl, e), de(er, _l), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ns(null, '');
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ns(t, e));
  }
  me(er), de(er, t);
}
function bo() {
  me(er), me(yl), me(xl);
}
function Dm(e) {
  Cn(xl.current);
  var t = Cn(er.current),
    r = Ns(t, e.type);
  t !== r && (de(yl, e), de(er, r));
}
function tu(e) {
  yl.current === e && (me(er), me(yl));
}
var be = an(0);
function Ga(e) {
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
var qi = [];
function ru() {
  for (var e = 0; e < qi.length; e++)
    qi[e]._workInProgressVersionPrimary = null;
  qi.length = 0;
}
var Ca = Cr.ReactCurrentDispatcher,
  Ji = Cr.ReactCurrentBatchConfig,
  Tn = 0,
  ve = null,
  Me = null,
  ze = null,
  Za = !1,
  Jo = !1,
  Sl = 0,
  W2 = 0;
function Ge() {
  throw Error(_(321));
}
function nu(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++)
    if (!Ht(e[r], t[r])) return !1;
  return !0;
}
function ou(e, t, r, n, o, l) {
  if (
    ((Tn = l),
    (ve = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ca.current = e === null || e.memoizedState === null ? Y2 : X2),
    (e = r(n, o)),
    Jo)
  ) {
    l = 0;
    do {
      if (((Jo = !1), (Sl = 0), 25 <= l)) throw Error(_(301));
      (l += 1),
        (ze = Me = null),
        (t.updateQueue = null),
        (Ca.current = Q2),
        (e = r(n, o));
    } while (Jo);
  }
  if (
    ((Ca.current = Ya),
    (t = Me !== null && Me.next !== null),
    (Tn = 0),
    (ze = Me = ve = null),
    (Za = !1),
    t)
  )
    throw Error(_(300));
  return e;
}
function lu() {
  var e = Sl !== 0;
  return (Sl = 0), e;
}
function Yt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return ze === null ? (ve.memoizedState = ze = e) : (ze = ze.next = e), ze;
}
function Dt() {
  if (Me === null) {
    var e = ve.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Me.next;
  var t = ze === null ? ve.memoizedState : ze.next;
  if (t !== null) (ze = t), (Me = e);
  else {
    if (e === null) throw Error(_(310));
    (Me = e),
      (e = {
        memoizedState: Me.memoizedState,
        baseState: Me.baseState,
        baseQueue: Me.baseQueue,
        queue: Me.queue,
        next: null,
      }),
      ze === null ? (ve.memoizedState = ze = e) : (ze = ze.next = e);
  }
  return ze;
}
function El(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function Ki(e) {
  var t = Dt(),
    r = t.queue;
  if (r === null) throw Error(_(311));
  r.lastRenderedReducer = e;
  var n = Me,
    o = n.baseQueue,
    l = r.pending;
  if (l !== null) {
    if (o !== null) {
      var a = o.next;
      (o.next = l.next), (l.next = a);
    }
    (n.baseQueue = o = l), (r.pending = null);
  }
  if (o !== null) {
    (l = o.next), (n = n.baseState);
    var i = (a = null),
      s = null,
      u = l;
    do {
      var m = u.lane;
      if ((Tn & m) === m)
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
        var g = {
          lane: m,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        s === null ? ((i = s = g), (a = n)) : (s = s.next = g),
          (ve.lanes |= m),
          (In |= m);
      }
      u = u.next;
    } while (u !== null && u !== l);
    s === null ? (a = n) : (s.next = i),
      Ht(n, t.memoizedState) || (ot = !0),
      (t.memoizedState = n),
      (t.baseState = a),
      (t.baseQueue = s),
      (r.lastRenderedState = n);
  }
  if (((e = r.interleaved), e !== null)) {
    o = e;
    do (l = o.lane), (ve.lanes |= l), (In |= l), (o = o.next);
    while (o !== e);
  } else o === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function es(e) {
  var t = Dt(),
    r = t.queue;
  if (r === null) throw Error(_(311));
  r.lastRenderedReducer = e;
  var n = r.dispatch,
    o = r.pending,
    l = t.memoizedState;
  if (o !== null) {
    r.pending = null;
    var a = (o = o.next);
    do (l = e(l, a.action)), (a = a.next);
    while (a !== o);
    Ht(l, t.memoizedState) || (ot = !0),
      (t.memoizedState = l),
      t.baseQueue === null && (t.baseState = l),
      (r.lastRenderedState = l);
  }
  return [l, n];
}
function Tm() {}
function Im(e, t) {
  var r = ve,
    n = Dt(),
    o = t(),
    l = !Ht(n.memoizedState, o);
  if (
    (l && ((n.memoizedState = o), (ot = !0)),
    (n = n.queue),
    au(_m.bind(null, r, n, e), [e]),
    n.getSnapshot !== t || l || (ze !== null && ze.memoizedState.tag & 1))
  ) {
    if (
      ((r.flags |= 2048),
      Cl(9, Nm.bind(null, r, n, o, t), void 0, null),
      He === null)
    )
      throw Error(_(349));
    Tn & 30 || Am(r, t, o);
  }
  return o;
}
function Am(e, t, r) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: r }),
    (t = ve.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ve.updateQueue = t),
        (t.stores = [e]))
      : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e));
}
function Nm(e, t, r, n) {
  (t.value = r), (t.getSnapshot = n), Mm(t) && Bm(e);
}
function _m(e, t, r) {
  return r(function () {
    Mm(t) && Bm(e);
  });
}
function Mm(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !Ht(e, r);
  } catch {
    return !0;
  }
}
function Bm(e) {
  var t = yr(e, 1);
  t !== null && Ot(t, e, 1, -1);
}
function zd(e) {
  var t = Yt();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: El,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Z2.bind(null, ve, e)),
    [t.memoizedState, e]
  );
}
function Cl(e, t, r, n) {
  return (
    (e = { tag: e, create: t, destroy: r, deps: n, next: null }),
    (t = ve.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ve.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((r = t.lastEffect),
        r === null
          ? (t.lastEffect = e.next = e)
          : ((n = r.next), (r.next = e), (e.next = n), (t.lastEffect = e))),
    e
  );
}
function Lm() {
  return Dt().memoizedState;
}
function wa(e, t, r, n) {
  var o = Yt();
  (ve.flags |= e),
    (o.memoizedState = Cl(1 | t, r, void 0, n === void 0 ? null : n));
}
function di(e, t, r, n) {
  var o = Dt();
  n = n === void 0 ? null : n;
  var l = void 0;
  if (Me !== null) {
    var a = Me.memoizedState;
    if (((l = a.destroy), n !== null && nu(n, a.deps))) {
      o.memoizedState = Cl(t, r, l, n);
      return;
    }
  }
  (ve.flags |= e), (o.memoizedState = Cl(1 | t, r, l, n));
}
function Od(e, t) {
  return wa(8390656, 8, e, t);
}
function au(e, t) {
  return di(2048, 8, e, t);
}
function Rm(e, t) {
  return di(4, 2, e, t);
}
function zm(e, t) {
  return di(4, 4, e, t);
}
function Om(e, t) {
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
function Hm(e, t, r) {
  return (
    (r = r != null ? r.concat([e]) : null), di(4, 4, Om.bind(null, t, e), r)
  );
}
function iu() {}
function jm(e, t) {
  var r = Dt();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && nu(t, n[1])
    ? n[0]
    : ((r.memoizedState = [e, t]), e);
}
function $m(e, t) {
  var r = Dt();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && nu(t, n[1])
    ? n[0]
    : ((e = e()), (r.memoizedState = [e, t]), e);
}
function Um(e, t, r) {
  return Tn & 21
    ? (Ht(r, t) || ((r = Yf()), (ve.lanes |= r), (In |= r), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ot = !0)), (e.memoizedState = r));
}
function V2(e, t) {
  var r = le;
  (le = r !== 0 && 4 > r ? r : 4), e(!0);
  var n = Ji.transition;
  Ji.transition = {};
  try {
    e(!1), t();
  } finally {
    (le = r), (Ji.transition = n);
  }
}
function Wm() {
  return Dt().memoizedState;
}
function G2(e, t, r) {
  var n = qr(e);
  if (
    ((r = {
      lane: n,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Vm(e))
  )
    Gm(t, r);
  else if (((r = Pm(e, t, r, n)), r !== null)) {
    var o = Ke();
    Ot(r, e, n, o), Zm(r, t, n);
  }
}
function Z2(e, t, r) {
  var n = qr(e),
    o = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (Vm(e)) Gm(t, o);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = t.lastRenderedReducer), l !== null)
    )
      try {
        var a = t.lastRenderedState,
          i = l(a, r);
        if (((o.hasEagerState = !0), (o.eagerState = i), Ht(i, a))) {
          var s = t.interleaved;
          s === null
            ? ((o.next = o), Jc(t))
            : ((o.next = s.next), (s.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (r = Pm(e, t, o, n)),
      r !== null && ((o = Ke()), Ot(r, e, n, o), Zm(r, t, n));
  }
}
function Vm(e) {
  var t = e.alternate;
  return e === ve || (t !== null && t === ve);
}
function Gm(e, t) {
  Jo = Za = !0;
  var r = e.pending;
  r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
    (e.pending = t);
}
function Zm(e, t, r) {
  if (r & 4194240) {
    var n = t.lanes;
    (n &= e.pendingLanes), (r |= n), (t.lanes = r), zc(e, r);
  }
}
var Ya = {
    readContext: Ft,
    useCallback: Ge,
    useContext: Ge,
    useEffect: Ge,
    useImperativeHandle: Ge,
    useInsertionEffect: Ge,
    useLayoutEffect: Ge,
    useMemo: Ge,
    useReducer: Ge,
    useRef: Ge,
    useState: Ge,
    useDebugValue: Ge,
    useDeferredValue: Ge,
    useTransition: Ge,
    useMutableSource: Ge,
    useSyncExternalStore: Ge,
    useId: Ge,
    unstable_isNewReconciler: !1,
  },
  Y2 = {
    readContext: Ft,
    useCallback: function (e, t) {
      return (Yt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Ft,
    useEffect: Od,
    useImperativeHandle: function (e, t, r) {
      return (
        (r = r != null ? r.concat([e]) : null),
        wa(4194308, 4, Om.bind(null, t, e), r)
      );
    },
    useLayoutEffect: function (e, t) {
      return wa(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return wa(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var r = Yt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (r.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, r) {
      var n = Yt();
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
        (e = e.dispatch = G2.bind(null, ve, e)),
        [n.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Yt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: zd,
    useDebugValue: iu,
    useDeferredValue: function (e) {
      return (Yt().memoizedState = e);
    },
    useTransition: function () {
      var e = zd(!1),
        t = e[0];
      return (e = V2.bind(null, e[1])), (Yt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, r) {
      var n = ve,
        o = Yt();
      if (pe) {
        if (r === void 0) throw Error(_(407));
        r = r();
      } else {
        if (((r = t()), He === null)) throw Error(_(349));
        Tn & 30 || Am(n, t, r);
      }
      o.memoizedState = r;
      var l = { value: r, getSnapshot: t };
      return (
        (o.queue = l),
        Od(_m.bind(null, n, l, e), [e]),
        (n.flags |= 2048),
        Cl(9, Nm.bind(null, n, l, r, t), void 0, null),
        r
      );
    },
    useId: function () {
      var e = Yt(),
        t = He.identifierPrefix;
      if (pe) {
        var r = pr,
          n = gr;
        (r = (n & ~(1 << (32 - zt(n) - 1))).toString(32) + r),
          (t = ':' + t + 'R' + r),
          (r = Sl++),
          0 < r && (t += 'H' + r.toString(32)),
          (t += ':');
      } else (r = W2++), (t = ':' + t + 'r' + r.toString(32) + ':');
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  X2 = {
    readContext: Ft,
    useCallback: jm,
    useContext: Ft,
    useEffect: au,
    useImperativeHandle: Hm,
    useInsertionEffect: Rm,
    useLayoutEffect: zm,
    useMemo: $m,
    useReducer: Ki,
    useRef: Lm,
    useState: function () {
      return Ki(El);
    },
    useDebugValue: iu,
    useDeferredValue: function (e) {
      var t = Dt();
      return Um(t, Me.memoizedState, e);
    },
    useTransition: function () {
      var e = Ki(El)[0],
        t = Dt().memoizedState;
      return [e, t];
    },
    useMutableSource: Tm,
    useSyncExternalStore: Im,
    useId: Wm,
    unstable_isNewReconciler: !1,
  },
  Q2 = {
    readContext: Ft,
    useCallback: jm,
    useContext: Ft,
    useEffect: au,
    useImperativeHandle: Hm,
    useInsertionEffect: Rm,
    useLayoutEffect: zm,
    useMemo: $m,
    useReducer: es,
    useRef: Lm,
    useState: function () {
      return es(El);
    },
    useDebugValue: iu,
    useDeferredValue: function (e) {
      var t = Dt();
      return Me === null ? (t.memoizedState = e) : Um(t, Me.memoizedState, e);
    },
    useTransition: function () {
      var e = es(El)[0],
        t = Dt().memoizedState;
      return [e, t];
    },
    useMutableSource: Tm,
    useSyncExternalStore: Im,
    useId: Wm,
    unstable_isNewReconciler: !1,
  };
function Mt(e, t) {
  if (e && e.defaultProps) {
    (t = ye({}, t)), (e = e.defaultProps);
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function Ks(e, t, r, n) {
  (t = e.memoizedState),
    (r = r(n, t)),
    (r = r == null ? t : ye({}, t, r)),
    (e.memoizedState = r),
    e.lanes === 0 && (e.updateQueue.baseState = r);
}
var fi = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Rn(e) === e : !1;
  },
  enqueueSetState: function (e, t, r) {
    e = e._reactInternals;
    var n = Ke(),
      o = qr(e),
      l = hr(n, o);
    (l.payload = t),
      r != null && (l.callback = r),
      (t = Xr(e, l, o)),
      t !== null && (Ot(t, e, o, n), Ea(t, e, o));
  },
  enqueueReplaceState: function (e, t, r) {
    e = e._reactInternals;
    var n = Ke(),
      o = qr(e),
      l = hr(n, o);
    (l.tag = 1),
      (l.payload = t),
      r != null && (l.callback = r),
      (t = Xr(e, l, o)),
      t !== null && (Ot(t, e, o, n), Ea(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var r = Ke(),
      n = qr(e),
      o = hr(r, n);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = Xr(e, o, n)),
      t !== null && (Ot(t, e, n, r), Ea(t, e, n));
  },
};
function Hd(e, t, r, n, o, l, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(n, l, a)
      : t.prototype && t.prototype.isPureReactComponent
      ? !pl(r, n) || !pl(o, l)
      : !0
  );
}
function Ym(e, t, r) {
  var n = !1,
    o = nn,
    l = t.contextType;
  return (
    typeof l == 'object' && l !== null
      ? (l = Ft(l))
      : ((o = at(t) ? Fn : Xe.current),
        (n = t.contextTypes),
        (l = (n = n != null) ? go(e, o) : nn)),
    (t = new t(r, l)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = fi),
    (e.stateNode = t),
    (t._reactInternals = e),
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    t
  );
}
function jd(e, t, r, n) {
  (e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(r, n),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(r, n),
    t.state !== e && fi.enqueueReplaceState(t, t.state, null);
}
function ec(e, t, r, n) {
  var o = e.stateNode;
  (o.props = r), (o.state = e.memoizedState), (o.refs = {}), Kc(e);
  var l = t.contextType;
  typeof l == 'object' && l !== null
    ? (o.context = Ft(l))
    : ((l = at(t) ? Fn : Xe.current), (o.context = go(e, l))),
    (o.state = e.memoizedState),
    (l = t.getDerivedStateFromProps),
    typeof l == 'function' && (Ks(e, t, l, r), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof o.getSnapshotBeforeUpdate == 'function' ||
      (typeof o.UNSAFE_componentWillMount != 'function' &&
        typeof o.componentWillMount != 'function') ||
      ((t = o.state),
      typeof o.componentWillMount == 'function' && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == 'function' &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && fi.enqueueReplaceState(o, o.state, null),
      Va(e, r, o, n),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == 'function' && (e.flags |= 4194308);
}
function vo(e, t) {
  try {
    var r = '',
      n = t;
    do (r += wp(n)), (n = n.return);
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
function ts(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function tc(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function () {
      throw r;
    });
  }
}
var q2 = typeof WeakMap == 'function' ? WeakMap : Map;
function Xm(e, t, r) {
  (r = hr(-1, r)), (r.tag = 3), (r.payload = { element: null });
  var n = t.value;
  return (
    (r.callback = function () {
      Qa || ((Qa = !0), (dc = n)), tc(e, t);
    }),
    r
  );
}
function Qm(e, t, r) {
  (r = hr(-1, r)), (r.tag = 3);
  var n = e.type.getDerivedStateFromError;
  if (typeof n == 'function') {
    var o = t.value;
    (r.payload = function () {
      return n(o);
    }),
      (r.callback = function () {
        tc(e, t);
      });
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == 'function' &&
      (r.callback = function () {
        tc(e, t),
          typeof n != 'function' &&
            (Qr === null ? (Qr = new Set([this])) : Qr.add(this));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : '',
        });
      }),
    r
  );
}
function $d(e, t, r) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new q2();
    var o = new Set();
    n.set(t, o);
  } else (o = n.get(t)), o === void 0 && ((o = new Set()), n.set(t, o));
  o.has(r) || (o.add(r), (e = dh.bind(null, e, t, r)), t.then(e, e));
}
function Ud(e) {
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
function Wd(e, t, r, n, o) {
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
              : ((t = hr(-1, 1)), (t.tag = 2), Xr(r, t, 1))),
          (r.lanes |= 1)),
      e);
}
var J2 = Cr.ReactCurrentOwner,
  ot = !1;
function Je(e, t, r, n) {
  t.child = e === null ? km(t, null, r, n) : ho(t, e.child, r, n);
}
function Vd(e, t, r, n, o) {
  r = r.render;
  var l = t.ref;
  return (
    co(t, o),
    (n = ou(e, t, r, n, l, o)),
    (r = lu()),
    e !== null && !ot
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        xr(e, t, o))
      : (pe && r && Gc(t), (t.flags |= 1), Je(e, t, n, o), t.child)
  );
}
function Gd(e, t, r, n, o) {
  if (e === null) {
    var l = r.type;
    return typeof l == 'function' &&
      !pu(l) &&
      l.defaultProps === void 0 &&
      r.compare === null &&
      r.defaultProps === void 0
      ? ((t.tag = 15), (t.type = l), qm(e, t, l, n, o))
      : ((e = Da(r.type, null, n, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((l = e.child), !(e.lanes & o))) {
    var a = l.memoizedProps;
    if (
      ((r = r.compare), (r = r !== null ? r : pl), r(a, n) && e.ref === t.ref)
    )
      return xr(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = Jr(l, n)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function qm(e, t, r, n, o) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (pl(l, n) && e.ref === t.ref)
      if (((ot = !1), (t.pendingProps = n = l), (e.lanes & o) !== 0))
        e.flags & 131072 && (ot = !0);
      else return (t.lanes = e.lanes), xr(e, t, o);
  }
  return rc(e, t, r, n, o);
}
function Jm(e, t, r) {
  var n = t.pendingProps,
    o = n.children,
    l = e !== null ? e.memoizedState : null;
  if (n.mode === 'hidden')
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        de(no, dt),
        (dt |= r);
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
          de(no, dt),
          (dt |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (n = l !== null ? l.baseLanes : r),
        de(no, dt),
        (dt |= n);
    }
  else
    l !== null ? ((n = l.baseLanes | r), (t.memoizedState = null)) : (n = r),
      de(no, dt),
      (dt |= n);
  return Je(e, t, o, r), t.child;
}
function Km(e, t) {
  var r = t.ref;
  ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function rc(e, t, r, n, o) {
  var l = at(r) ? Fn : Xe.current;
  return (
    (l = go(t, l)),
    co(t, o),
    (r = ou(e, t, r, n, l, o)),
    (n = lu()),
    e !== null && !ot
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        xr(e, t, o))
      : (pe && n && Gc(t), (t.flags |= 1), Je(e, t, r, o), t.child)
  );
}
function Zd(e, t, r, n, o) {
  if (at(r)) {
    var l = !0;
    Ha(t);
  } else l = !1;
  if ((co(t, o), t.stateNode === null))
    ka(e, t), Ym(t, r, n), ec(t, r, n, o), (n = !0);
  else if (e === null) {
    var a = t.stateNode,
      i = t.memoizedProps;
    a.props = i;
    var s = a.context,
      u = r.contextType;
    typeof u == 'object' && u !== null
      ? (u = Ft(u))
      : ((u = at(r) ? Fn : Xe.current), (u = go(t, u)));
    var m = r.getDerivedStateFromProps,
      g =
        typeof m == 'function' ||
        typeof a.getSnapshotBeforeUpdate == 'function';
    g ||
      (typeof a.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof a.componentWillReceiveProps != 'function') ||
      ((i !== n || s !== u) && jd(t, a, n, u)),
      (Br = !1);
    var p = t.memoizedState;
    (a.state = p),
      Va(t, n, a, o),
      (s = t.memoizedState),
      i !== n || p !== s || lt.current || Br
        ? (typeof m == 'function' && (Ks(t, r, m, n), (s = t.memoizedState)),
          (i = Br || Hd(t, r, i, n, p, s, u))
            ? (g ||
                (typeof a.UNSAFE_componentWillMount != 'function' &&
                  typeof a.componentWillMount != 'function') ||
                (typeof a.componentWillMount == 'function' &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == 'function' &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof a.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = n),
              (t.memoizedState = s)),
          (a.props = n),
          (a.state = s),
          (a.context = u),
          (n = i))
        : (typeof a.componentDidMount == 'function' && (t.flags |= 4194308),
          (n = !1));
  } else {
    (a = t.stateNode),
      Fm(e, t),
      (i = t.memoizedProps),
      (u = t.type === t.elementType ? i : Mt(t.type, i)),
      (a.props = u),
      (g = t.pendingProps),
      (p = a.context),
      (s = r.contextType),
      typeof s == 'object' && s !== null
        ? (s = Ft(s))
        : ((s = at(r) ? Fn : Xe.current), (s = go(t, s)));
    var v = r.getDerivedStateFromProps;
    (m =
      typeof v == 'function' ||
      typeof a.getSnapshotBeforeUpdate == 'function') ||
      (typeof a.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof a.componentWillReceiveProps != 'function') ||
      ((i !== g || p !== s) && jd(t, a, n, s)),
      (Br = !1),
      (p = t.memoizedState),
      (a.state = p),
      Va(t, n, a, o);
    var y = t.memoizedState;
    i !== g || p !== y || lt.current || Br
      ? (typeof v == 'function' && (Ks(t, r, v, n), (y = t.memoizedState)),
        (u = Br || Hd(t, r, u, n, p, y, s) || !1)
          ? (m ||
              (typeof a.UNSAFE_componentWillUpdate != 'function' &&
                typeof a.componentWillUpdate != 'function') ||
              (typeof a.componentWillUpdate == 'function' &&
                a.componentWillUpdate(n, y, s),
              typeof a.UNSAFE_componentWillUpdate == 'function' &&
                a.UNSAFE_componentWillUpdate(n, y, s)),
            typeof a.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != 'function' ||
              (i === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != 'function' ||
              (i === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = n),
            (t.memoizedState = y)),
        (a.props = n),
        (a.state = y),
        (a.context = s),
        (n = u))
      : (typeof a.componentDidUpdate != 'function' ||
          (i === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != 'function' ||
          (i === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (n = !1));
  }
  return nc(e, t, r, n, l, o);
}
function nc(e, t, r, n, o, l) {
  Km(e, t);
  var a = (t.flags & 128) !== 0;
  if (!n && !a) return o && Nd(t, r, !1), xr(e, t, l);
  (n = t.stateNode), (J2.current = t);
  var i =
    a && typeof r.getDerivedStateFromError != 'function' ? null : n.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = ho(t, e.child, null, l)), (t.child = ho(t, null, i, l)))
      : Je(e, t, i, l),
    (t.memoizedState = n.state),
    o && Nd(t, r, !0),
    t.child
  );
}
function eg(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Ad(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Ad(e, t.context, !1),
    eu(e, t.containerInfo);
}
function Yd(e, t, r, n, o) {
  return po(), Yc(o), (t.flags |= 256), Je(e, t, r, n), t.child;
}
var oc = { dehydrated: null, treeContext: null, retryLane: 0 };
function lc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function tg(e, t, r) {
  var n = t.pendingProps,
    o = be.current,
    l = !1,
    a = (t.flags & 128) !== 0,
    i;
  if (
    ((i = a) ||
      (i = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    i
      ? ((l = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    de(be, o & 1),
    e === null)
  )
    return (
      qs(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = n.children),
          (e = n.fallback),
          l
            ? ((n = t.mode),
              (l = t.child),
              (a = { mode: 'hidden', children: a }),
              !(n & 1) && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = a))
                : (l = pi(a, n, 0, null)),
              (e = Pn(e, n, r, null)),
              (l.return = t),
              (e.return = t),
              (l.sibling = e),
              (t.child = l),
              (t.child.memoizedState = lc(r)),
              (t.memoizedState = oc),
              e)
            : su(t, a))
    );
  if (((o = e.memoizedState), o !== null && ((i = o.dehydrated), i !== null)))
    return K2(e, t, a, n, i, o, r);
  if (l) {
    (l = n.fallback), (a = t.mode), (o = e.child), (i = o.sibling);
    var s = { mode: 'hidden', children: n.children };
    return (
      !(a & 1) && t.child !== o
        ? ((n = t.child),
          (n.childLanes = 0),
          (n.pendingProps = s),
          (t.deletions = null))
        : ((n = Jr(o, s)), (n.subtreeFlags = o.subtreeFlags & 14680064)),
      i !== null ? (l = Jr(i, l)) : ((l = Pn(l, a, r, null)), (l.flags |= 2)),
      (l.return = t),
      (n.return = t),
      (n.sibling = l),
      (t.child = n),
      (n = l),
      (l = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? lc(r)
          : {
              baseLanes: a.baseLanes | r,
              cachePool: null,
              transitions: a.transitions,
            }),
      (l.memoizedState = a),
      (l.childLanes = e.childLanes & ~r),
      (t.memoizedState = oc),
      n
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (n = Jr(l, { mode: 'visible', children: n.children })),
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
function su(e, t) {
  return (
    (t = pi({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function aa(e, t, r, n) {
  return (
    n !== null && Yc(n),
    ho(t, e.child, null, r),
    (e = su(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function K2(e, t, r, n, o, l, a) {
  if (r)
    return t.flags & 256
      ? ((t.flags &= -257), (n = ts(Error(_(422)))), aa(e, t, a, n))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((l = n.fallback),
        (o = t.mode),
        (n = pi({ mode: 'visible', children: n.children }, o, 0, null)),
        (l = Pn(l, o, a, null)),
        (l.flags |= 2),
        (n.return = t),
        (l.return = t),
        (n.sibling = l),
        (t.child = n),
        t.mode & 1 && ho(t, e.child, null, a),
        (t.child.memoizedState = lc(a)),
        (t.memoizedState = oc),
        l);
  if (!(t.mode & 1)) return aa(e, t, a, null);
  if (o.data === '$!') {
    if (((n = o.nextSibling && o.nextSibling.dataset), n)) var i = n.dgst;
    return (n = i), (l = Error(_(419))), (n = ts(l, n, void 0)), aa(e, t, a, n);
  }
  if (((i = (a & e.childLanes) !== 0), ot || i)) {
    if (((n = He), n !== null)) {
      switch (a & -a) {
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
      (o = o & (n.suspendedLanes | a) ? 0 : o),
        o !== 0 &&
          o !== l.retryLane &&
          ((l.retryLane = o), yr(e, o), Ot(n, e, o, -1));
    }
    return gu(), (n = ts(Error(_(421)))), aa(e, t, a, n);
  }
  return o.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = fh.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = l.treeContext),
      (gt = Yr(o.nextSibling)),
      (pt = t),
      (pe = !0),
      (Lt = null),
      e !== null &&
        ((Ct[wt++] = gr),
        (Ct[wt++] = pr),
        (Ct[wt++] = Dn),
        (gr = e.id),
        (pr = e.overflow),
        (Dn = t)),
      (t = su(t, n.children)),
      (t.flags |= 4096),
      t);
}
function Xd(e, t, r) {
  e.lanes |= t;
  var n = e.alternate;
  n !== null && (n.lanes |= t), Js(e.return, t, r);
}
function rs(e, t, r, n, o) {
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
function rg(e, t, r) {
  var n = t.pendingProps,
    o = n.revealOrder,
    l = n.tail;
  if ((Je(e, t, n.children, r), (n = be.current), n & 2))
    (n = (n & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Xd(e, r, t);
        else if (e.tag === 19) Xd(e, r, t);
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
  if ((de(be, n), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case 'forwards':
        for (r = t.child, o = null; r !== null; )
          (e = r.alternate),
            e !== null && Ga(e) === null && (o = r),
            (r = r.sibling);
        (r = o),
          r === null
            ? ((o = t.child), (t.child = null))
            : ((o = r.sibling), (r.sibling = null)),
          rs(t, !1, o, r, l);
        break;
      case 'backwards':
        for (r = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && Ga(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = r), (r = o), (o = e);
        }
        rs(t, !0, r, null, l);
        break;
      case 'together':
        rs(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ka(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function xr(e, t, r) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (In |= t.lanes),
    !(r & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(_(153));
  if (t.child !== null) {
    for (
      e = t.child, r = Jr(e, e.pendingProps), t.child = r, r.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (r = r.sibling = Jr(e, e.pendingProps)), (r.return = t);
    r.sibling = null;
  }
  return t.child;
}
function eh(e, t, r) {
  switch (t.tag) {
    case 3:
      eg(t), po();
      break;
    case 5:
      Dm(t);
      break;
    case 1:
      at(t.type) && Ha(t);
      break;
    case 4:
      eu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var n = t.type._context,
        o = t.memoizedProps.value;
      de(Ua, n._currentValue), (n._currentValue = o);
      break;
    case 13:
      if (((n = t.memoizedState), n !== null))
        return n.dehydrated !== null
          ? (de(be, be.current & 1), (t.flags |= 128), null)
          : r & t.child.childLanes
          ? tg(e, t, r)
          : (de(be, be.current & 1),
            (e = xr(e, t, r)),
            e !== null ? e.sibling : null);
      de(be, be.current & 1);
      break;
    case 19:
      if (((n = (r & t.childLanes) !== 0), e.flags & 128)) {
        if (n) return rg(e, t, r);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        de(be, be.current),
        n)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Jm(e, t, r);
  }
  return xr(e, t, r);
}
var ng, ac, og, lg;
ng = function (e, t) {
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
ac = function () {};
og = function (e, t, r, n) {
  var o = e.memoizedProps;
  if (o !== n) {
    (e = t.stateNode), Cn(er.current);
    var l = null;
    switch (r) {
      case 'input':
        (o = Ds(e, o)), (n = Ds(e, n)), (l = []);
        break;
      case 'select':
        (o = ye({}, o, { value: void 0 })),
          (n = ye({}, n, { value: void 0 })),
          (l = []);
        break;
      case 'textarea':
        (o = As(e, o)), (n = As(e, n)), (l = []);
        break;
      default:
        typeof o.onClick != 'function' &&
          typeof n.onClick == 'function' &&
          (e.onclick = za);
    }
    _s(r, n);
    var a;
    r = null;
    for (u in o)
      if (!n.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === 'style') {
          var i = o[u];
          for (a in i) i.hasOwnProperty(a) && (r || (r = {}), (r[a] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (sl.hasOwnProperty(u)
              ? l || (l = [])
              : (l = l || []).push(u, null));
    for (u in n) {
      var s = n[u];
      if (
        ((i = o != null ? o[u] : void 0),
        n.hasOwnProperty(u) && s !== i && (s != null || i != null))
      )
        if (u === 'style')
          if (i) {
            for (a in i)
              !i.hasOwnProperty(a) ||
                (s && s.hasOwnProperty(a)) ||
                (r || (r = {}), (r[a] = ''));
            for (a in s)
              s.hasOwnProperty(a) &&
                i[a] !== s[a] &&
                (r || (r = {}), (r[a] = s[a]));
          } else r || (l || (l = []), l.push(u, r)), (r = s);
        else
          u === 'dangerouslySetInnerHTML'
            ? ((s = s ? s.__html : void 0),
              (i = i ? i.__html : void 0),
              s != null && i !== s && (l = l || []).push(u, s))
            : u === 'children'
            ? (typeof s != 'string' && typeof s != 'number') ||
              (l = l || []).push(u, '' + s)
            : u !== 'suppressContentEditableWarning' &&
              u !== 'suppressHydrationWarning' &&
              (sl.hasOwnProperty(u)
                ? (s != null && u === 'onScroll' && fe('scroll', e),
                  l || i === s || (l = []))
                : (l = l || []).push(u, s));
    }
    r && (l = l || []).push('style', r);
    var u = l;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
lg = function (e, t, r, n) {
  r !== n && (t.flags |= 4);
};
function Bo(e, t) {
  if (!pe)
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
function Ze(e) {
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
function th(e, t, r) {
  var n = t.pendingProps;
  switch ((Zc(t), t.tag)) {
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
      return Ze(t), null;
    case 1:
      return at(t.type) && Oa(), Ze(t), null;
    case 3:
      return (
        (n = t.stateNode),
        bo(),
        me(lt),
        me(Xe),
        ru(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (e === null || e.child === null) &&
          (oa(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Lt !== null && (gc(Lt), (Lt = null)))),
        ac(e, t),
        Ze(t),
        null
      );
    case 5:
      tu(t);
      var o = Cn(xl.current);
      if (((r = t.type), e !== null && t.stateNode != null))
        og(e, t, r, n, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!n) {
          if (t.stateNode === null) throw Error(_(166));
          return Ze(t), null;
        }
        if (((e = Cn(er.current)), oa(t))) {
          (n = t.stateNode), (r = t.type);
          var l = t.memoizedProps;
          switch (((n[Qt] = t), (n[vl] = l), (e = (t.mode & 1) !== 0), r)) {
            case 'dialog':
              fe('cancel', n), fe('close', n);
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              fe('load', n);
              break;
            case 'video':
            case 'audio':
              for (o = 0; o < Wo.length; o++) fe(Wo[o], n);
              break;
            case 'source':
              fe('error', n);
              break;
            case 'img':
            case 'image':
            case 'link':
              fe('error', n), fe('load', n);
              break;
            case 'details':
              fe('toggle', n);
              break;
            case 'input':
              od(n, l), fe('invalid', n);
              break;
            case 'select':
              (n._wrapperState = { wasMultiple: !!l.multiple }),
                fe('invalid', n);
              break;
            case 'textarea':
              ad(n, l), fe('invalid', n);
          }
          _s(r, l), (o = null);
          for (var a in l)
            if (l.hasOwnProperty(a)) {
              var i = l[a];
              a === 'children'
                ? typeof i == 'string'
                  ? n.textContent !== i &&
                    (l.suppressHydrationWarning !== !0 &&
                      na(n.textContent, i, e),
                    (o = ['children', i]))
                  : typeof i == 'number' &&
                    n.textContent !== '' + i &&
                    (l.suppressHydrationWarning !== !0 &&
                      na(n.textContent, i, e),
                    (o = ['children', '' + i]))
                : sl.hasOwnProperty(a) &&
                  i != null &&
                  a === 'onScroll' &&
                  fe('scroll', n);
            }
          switch (r) {
            case 'input':
              Xl(n), ld(n, l, !0);
              break;
            case 'textarea':
              Xl(n), id(n);
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof l.onClick == 'function' && (n.onclick = za);
          }
          (n = o), (t.updateQueue = n), n !== null && (t.flags |= 4);
        } else {
          (a = o.nodeType === 9 ? o : o.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = _f(r)),
            e === 'http://www.w3.org/1999/xhtml'
              ? r === 'script'
                ? ((e = a.createElement('div')),
                  (e.innerHTML = '<script></script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof n.is == 'string'
                ? (e = a.createElement(r, { is: n.is }))
                : ((e = a.createElement(r)),
                  r === 'select' &&
                    ((a = e),
                    n.multiple
                      ? (a.multiple = !0)
                      : n.size && (a.size = n.size)))
              : (e = a.createElementNS(e, r)),
            (e[Qt] = t),
            (e[vl] = n),
            ng(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((a = Ms(r, n)), r)) {
              case 'dialog':
                fe('cancel', e), fe('close', e), (o = n);
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                fe('load', e), (o = n);
                break;
              case 'video':
              case 'audio':
                for (o = 0; o < Wo.length; o++) fe(Wo[o], e);
                o = n;
                break;
              case 'source':
                fe('error', e), (o = n);
                break;
              case 'img':
              case 'image':
              case 'link':
                fe('error', e), fe('load', e), (o = n);
                break;
              case 'details':
                fe('toggle', e), (o = n);
                break;
              case 'input':
                od(e, n), (o = Ds(e, n)), fe('invalid', e);
                break;
              case 'option':
                o = n;
                break;
              case 'select':
                (e._wrapperState = { wasMultiple: !!n.multiple }),
                  (o = ye({}, n, { value: void 0 })),
                  fe('invalid', e);
                break;
              case 'textarea':
                ad(e, n), (o = As(e, n)), fe('invalid', e);
                break;
              default:
                o = n;
            }
            _s(r, o), (i = o);
            for (l in i)
              if (i.hasOwnProperty(l)) {
                var s = i[l];
                l === 'style'
                  ? Lf(e, s)
                  : l === 'dangerouslySetInnerHTML'
                  ? ((s = s ? s.__html : void 0), s != null && Mf(e, s))
                  : l === 'children'
                  ? typeof s == 'string'
                    ? (r !== 'textarea' || s !== '') && cl(e, s)
                    : typeof s == 'number' && cl(e, '' + s)
                  : l !== 'suppressContentEditableWarning' &&
                    l !== 'suppressHydrationWarning' &&
                    l !== 'autoFocus' &&
                    (sl.hasOwnProperty(l)
                      ? s != null && l === 'onScroll' && fe('scroll', e)
                      : s != null && Nc(e, l, s, a));
              }
            switch (r) {
              case 'input':
                Xl(e), ld(e, n, !1);
                break;
              case 'textarea':
                Xl(e), id(e);
                break;
              case 'option':
                n.value != null && e.setAttribute('value', '' + rn(n.value));
                break;
              case 'select':
                (e.multiple = !!n.multiple),
                  (l = n.value),
                  l != null
                    ? lo(e, !!n.multiple, l, !1)
                    : n.defaultValue != null &&
                      lo(e, !!n.multiple, n.defaultValue, !0);
                break;
              default:
                typeof o.onClick == 'function' && (e.onclick = za);
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
      return Ze(t), null;
    case 6:
      if (e && t.stateNode != null) lg(e, t, e.memoizedProps, n);
      else {
        if (typeof n != 'string' && t.stateNode === null) throw Error(_(166));
        if (((r = Cn(xl.current)), Cn(er.current), oa(t))) {
          if (
            ((n = t.stateNode),
            (r = t.memoizedProps),
            (n[Qt] = t),
            (l = n.nodeValue !== r) && ((e = pt), e !== null))
          )
            switch (e.tag) {
              case 3:
                na(n.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  na(n.nodeValue, r, (e.mode & 1) !== 0);
            }
          l && (t.flags |= 4);
        } else
          (n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n)),
            (n[Qt] = t),
            (t.stateNode = n);
      }
      return Ze(t), null;
    case 13:
      if (
        (me(be),
        (n = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (pe && gt !== null && t.mode & 1 && !(t.flags & 128))
          Cm(), po(), (t.flags |= 98560), (l = !1);
        else if (((l = oa(t)), n !== null && n.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(_(318));
            if (
              ((l = t.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(_(317));
            l[Qt] = t;
          } else
            po(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Ze(t), (l = !1);
        } else Lt !== null && (gc(Lt), (Lt = null)), (l = !0);
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = r), t)
        : ((n = n !== null),
          n !== (e !== null && e.memoizedState !== null) &&
            n &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || be.current & 1 ? Be === 0 && (Be = 3) : gu())),
          t.updateQueue !== null && (t.flags |= 4),
          Ze(t),
          null);
    case 4:
      return (
        bo(), ac(e, t), e === null && hl(t.stateNode.containerInfo), Ze(t), null
      );
    case 10:
      return qc(t.type._context), Ze(t), null;
    case 17:
      return at(t.type) && Oa(), Ze(t), null;
    case 19:
      if ((me(be), (l = t.memoizedState), l === null)) return Ze(t), null;
      if (((n = (t.flags & 128) !== 0), (a = l.rendering), a === null))
        if (n) Bo(l, !1);
        else {
          if (Be !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = Ga(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    Bo(l, !1),
                    n = a.updateQueue,
                    n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    n = r,
                    r = t.child;
                  r !== null;

                )
                  (l = r),
                    (e = n),
                    (l.flags &= 14680066),
                    (a = l.alternate),
                    a === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = a.childLanes),
                        (l.lanes = a.lanes),
                        (l.child = a.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = a.memoizedProps),
                        (l.memoizedState = a.memoizedState),
                        (l.updateQueue = a.updateQueue),
                        (l.type = a.type),
                        (e = a.dependencies),
                        (l.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (r = r.sibling);
                return de(be, (be.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          l.tail !== null &&
            Pe() > yo &&
            ((t.flags |= 128), (n = !0), Bo(l, !1), (t.lanes = 4194304));
        }
      else {
        if (!n)
          if (((e = Ga(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (n = !0),
              (r = e.updateQueue),
              r !== null && ((t.updateQueue = r), (t.flags |= 4)),
              Bo(l, !0),
              l.tail === null && l.tailMode === 'hidden' && !a.alternate && !pe)
            )
              return Ze(t), null;
          } else
            2 * Pe() - l.renderingStartTime > yo &&
              r !== 1073741824 &&
              ((t.flags |= 128), (n = !0), Bo(l, !1), (t.lanes = 4194304));
        l.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((r = l.last),
            r !== null ? (r.sibling = a) : (t.child = a),
            (l.last = a));
      }
      return l.tail !== null
        ? ((t = l.tail),
          (l.rendering = t),
          (l.tail = t.sibling),
          (l.renderingStartTime = Pe()),
          (t.sibling = null),
          (r = be.current),
          de(be, n ? (r & 1) | 2 : r & 1),
          t)
        : (Ze(t), null);
    case 22:
    case 23:
      return (
        mu(),
        (n = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== n && (t.flags |= 8192),
        n && t.mode & 1
          ? dt & 1073741824 && (Ze(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Ze(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, t.tag));
}
function rh(e, t) {
  switch ((Zc(t), t.tag)) {
    case 1:
      return (
        at(t.type) && Oa(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        bo(),
        me(lt),
        me(Xe),
        ru(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return tu(t), null;
    case 13:
      if (
        (me(be), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(_(340));
        po();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return me(be), null;
    case 4:
      return bo(), null;
    case 10:
      return qc(t.type._context), null;
    case 22:
    case 23:
      return mu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ia = !1,
  Ye = !1,
  nh = typeof WeakSet == 'function' ? WeakSet : Set,
  H = null;
function ro(e, t) {
  var r = e.ref;
  if (r !== null)
    if (typeof r == 'function')
      try {
        r(null);
      } catch (n) {
        Se(e, t, n);
      }
    else r.current = null;
}
function ic(e, t, r) {
  try {
    r();
  } catch (n) {
    Se(e, t, n);
  }
}
var Qd = !1;
function oh(e, t) {
  if (((Ws = Ba), (e = um()), Vc(e))) {
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
          var a = 0,
            i = -1,
            s = -1,
            u = 0,
            m = 0,
            g = e,
            p = null;
          t: for (;;) {
            for (
              var v;
              g !== r || (o !== 0 && g.nodeType !== 3) || (i = a + o),
                g !== l || (n !== 0 && g.nodeType !== 3) || (s = a + n),
                g.nodeType === 3 && (a += g.nodeValue.length),
                (v = g.firstChild) !== null;

            )
              (p = g), (g = v);
            for (;;) {
              if (g === e) break t;
              if (
                (p === r && ++u === o && (i = a),
                p === l && ++m === n && (s = a),
                (v = g.nextSibling) !== null)
              )
                break;
              (g = p), (p = g.parentNode);
            }
            g = v;
          }
          r = i === -1 || s === -1 ? null : { start: i, end: s };
        } else r = null;
      }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (Vs = { focusedElem: e, selectionRange: r }, Ba = !1, H = t; H !== null; )
    if (((t = H), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (H = e);
    else
      for (; H !== null; ) {
        t = H;
        try {
          var y = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var x = y.memoizedProps,
                    k = y.memoizedState,
                    h = t.stateNode,
                    f = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : Mt(t.type, x),
                      k
                    );
                  h.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var b = t.stateNode.containerInfo;
                b.nodeType === 1
                  ? (b.textContent = '')
                  : b.nodeType === 9 &&
                    b.documentElement &&
                    b.removeChild(b.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(_(163));
            }
        } catch (S) {
          Se(t, t.return, S);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (H = e);
          break;
        }
        H = t.return;
      }
  return (y = Qd), (Qd = !1), y;
}
function Ko(e, t, r) {
  var n = t.updateQueue;
  if (((n = n !== null ? n.lastEffect : null), n !== null)) {
    var o = (n = n.next);
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy;
        (o.destroy = void 0), l !== void 0 && ic(t, r, l);
      }
      o = o.next;
    } while (o !== n);
  }
}
function mi(e, t) {
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
function sc(e) {
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
function ag(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), ag(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Qt], delete t[vl], delete t[Ys], delete t[H2], delete t[j2])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function ig(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function qd(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || ig(e.return)) return null;
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
function cc(e, t, r) {
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
          r != null || t.onclick !== null || (t.onclick = za));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (cc(e, t, r), e = e.sibling; e !== null; ) cc(e, t, r), (e = e.sibling);
}
function uc(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    (e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e);
  else if (n !== 4 && ((e = e.child), e !== null))
    for (uc(e, t, r), e = e.sibling; e !== null; ) uc(e, t, r), (e = e.sibling);
}
var $e = null,
  Bt = !1;
function Nr(e, t, r) {
  for (r = r.child; r !== null; ) sg(e, t, r), (r = r.sibling);
}
function sg(e, t, r) {
  if (Kt && typeof Kt.onCommitFiberUnmount == 'function')
    try {
      Kt.onCommitFiberUnmount(li, r);
    } catch {}
  switch (r.tag) {
    case 5:
      Ye || ro(r, t);
    case 6:
      var n = $e,
        o = Bt;
      ($e = null),
        Nr(e, t, r),
        ($e = n),
        (Bt = o),
        $e !== null &&
          (Bt
            ? ((e = $e),
              (r = r.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r))
            : $e.removeChild(r.stateNode));
      break;
    case 18:
      $e !== null &&
        (Bt
          ? ((e = $e),
            (r = r.stateNode),
            e.nodeType === 8
              ? Xi(e.parentNode, r)
              : e.nodeType === 1 && Xi(e, r),
            ml(e))
          : Xi($e, r.stateNode));
      break;
    case 4:
      (n = $e),
        (o = Bt),
        ($e = r.stateNode.containerInfo),
        (Bt = !0),
        Nr(e, t, r),
        ($e = n),
        (Bt = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ye &&
        ((n = r.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
      ) {
        o = n = n.next;
        do {
          var l = o,
            a = l.destroy;
          (l = l.tag),
            a !== void 0 && (l & 2 || l & 4) && ic(r, t, a),
            (o = o.next);
        } while (o !== n);
      }
      Nr(e, t, r);
      break;
    case 1:
      if (
        !Ye &&
        (ro(r, t),
        (n = r.stateNode),
        typeof n.componentWillUnmount == 'function')
      )
        try {
          (n.props = r.memoizedProps),
            (n.state = r.memoizedState),
            n.componentWillUnmount();
        } catch (i) {
          Se(r, t, i);
        }
      Nr(e, t, r);
      break;
    case 21:
      Nr(e, t, r);
      break;
    case 22:
      r.mode & 1
        ? ((Ye = (n = Ye) || r.memoizedState !== null), Nr(e, t, r), (Ye = n))
        : Nr(e, t, r);
      break;
    default:
      Nr(e, t, r);
  }
}
function Jd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    r === null && (r = e.stateNode = new nh()),
      t.forEach(function (n) {
        var o = mh.bind(null, e, n);
        r.has(n) || (r.add(n), n.then(o, o));
      });
  }
}
function At(e, t) {
  var r = t.deletions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var o = r[n];
      try {
        var l = e,
          a = t,
          i = a;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case 5:
              ($e = i.stateNode), (Bt = !1);
              break e;
            case 3:
              ($e = i.stateNode.containerInfo), (Bt = !0);
              break e;
            case 4:
              ($e = i.stateNode.containerInfo), (Bt = !0);
              break e;
          }
          i = i.return;
        }
        if ($e === null) throw Error(_(160));
        sg(l, a, o), ($e = null), (Bt = !1);
        var s = o.alternate;
        s !== null && (s.return = null), (o.return = null);
      } catch (u) {
        Se(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) cg(t, e), (t = t.sibling);
}
function cg(e, t) {
  var r = e.alternate,
    n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((At(t, e), Vt(e), n & 4)) {
        try {
          Ko(3, e, e.return), mi(3, e);
        } catch (x) {
          Se(e, e.return, x);
        }
        try {
          Ko(5, e, e.return);
        } catch (x) {
          Se(e, e.return, x);
        }
      }
      break;
    case 1:
      At(t, e), Vt(e), n & 512 && r !== null && ro(r, r.return);
      break;
    case 5:
      if (
        (At(t, e),
        Vt(e),
        n & 512 && r !== null && ro(r, r.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          cl(o, '');
        } catch (x) {
          Se(e, e.return, x);
        }
      }
      if (n & 4 && ((o = e.stateNode), o != null)) {
        var l = e.memoizedProps,
          a = r !== null ? r.memoizedProps : l,
          i = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            i === 'input' && l.type === 'radio' && l.name != null && Af(o, l),
              Ms(i, a);
            var u = Ms(i, l);
            for (a = 0; a < s.length; a += 2) {
              var m = s[a],
                g = s[a + 1];
              m === 'style'
                ? Lf(o, g)
                : m === 'dangerouslySetInnerHTML'
                ? Mf(o, g)
                : m === 'children'
                ? cl(o, g)
                : Nc(o, m, g, u);
            }
            switch (i) {
              case 'input':
                Ts(o, l);
                break;
              case 'textarea':
                Nf(o, l);
                break;
              case 'select':
                var p = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!l.multiple;
                var v = l.value;
                v != null
                  ? lo(o, !!l.multiple, v, !1)
                  : p !== !!l.multiple &&
                    (l.defaultValue != null
                      ? lo(o, !!l.multiple, l.defaultValue, !0)
                      : lo(o, !!l.multiple, l.multiple ? [] : '', !1));
            }
            o[vl] = l;
          } catch (x) {
            Se(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((At(t, e), Vt(e), n & 4)) {
        if (e.stateNode === null) throw Error(_(162));
        (o = e.stateNode), (l = e.memoizedProps);
        try {
          o.nodeValue = l;
        } catch (x) {
          Se(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (At(t, e), Vt(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
      )
        try {
          ml(t.containerInfo);
        } catch (x) {
          Se(e, e.return, x);
        }
      break;
    case 4:
      At(t, e), Vt(e);
      break;
    case 13:
      At(t, e),
        Vt(e),
        (o = e.child),
        o.flags & 8192 &&
          ((l = o.memoizedState !== null),
          (o.stateNode.isHidden = l),
          !l ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (du = Pe())),
        n & 4 && Jd(e);
      break;
    case 22:
      if (
        ((m = r !== null && r.memoizedState !== null),
        e.mode & 1 ? ((Ye = (u = Ye) || m), At(t, e), (Ye = u)) : At(t, e),
        Vt(e),
        n & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !m && e.mode & 1)
        )
          for (H = e, m = e.child; m !== null; ) {
            for (g = H = m; H !== null; ) {
              switch (((p = H), (v = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ko(4, p, p.return);
                  break;
                case 1:
                  ro(p, p.return);
                  var y = p.stateNode;
                  if (typeof y.componentWillUnmount == 'function') {
                    (n = p), (r = p.return);
                    try {
                      (t = n),
                        (y.props = t.memoizedProps),
                        (y.state = t.memoizedState),
                        y.componentWillUnmount();
                    } catch (x) {
                      Se(n, r, x);
                    }
                  }
                  break;
                case 5:
                  ro(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    e0(g);
                    continue;
                  }
              }
              v !== null ? ((v.return = p), (H = v)) : e0(g);
            }
            m = m.sibling;
          }
        e: for (m = null, g = e; ; ) {
          if (g.tag === 5) {
            if (m === null) {
              m = g;
              try {
                (o = g.stateNode),
                  u
                    ? ((l = o.style),
                      typeof l.setProperty == 'function'
                        ? l.setProperty('display', 'none', 'important')
                        : (l.display = 'none'))
                    : ((i = g.stateNode),
                      (s = g.memoizedProps.style),
                      (a =
                        s != null && s.hasOwnProperty('display')
                          ? s.display
                          : null),
                      (i.style.display = Bf('display', a)));
              } catch (x) {
                Se(e, e.return, x);
              }
            }
          } else if (g.tag === 6) {
            if (m === null)
              try {
                g.stateNode.nodeValue = u ? '' : g.memoizedProps;
              } catch (x) {
                Se(e, e.return, x);
              }
          } else if (
            ((g.tag !== 22 && g.tag !== 23) ||
              g.memoizedState === null ||
              g === e) &&
            g.child !== null
          ) {
            (g.child.return = g), (g = g.child);
            continue;
          }
          if (g === e) break e;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break e;
            m === g && (m = null), (g = g.return);
          }
          m === g && (m = null), (g.sibling.return = g.return), (g = g.sibling);
        }
      }
      break;
    case 19:
      At(t, e), Vt(e), n & 4 && Jd(e);
      break;
    case 21:
      break;
    default:
      At(t, e), Vt(e);
  }
}
function Vt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (ig(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error(_(160));
      }
      switch (n.tag) {
        case 5:
          var o = n.stateNode;
          n.flags & 32 && (cl(o, ''), (n.flags &= -33));
          var l = qd(e);
          uc(e, l, o);
          break;
        case 3:
        case 4:
          var a = n.stateNode.containerInfo,
            i = qd(e);
          cc(e, i, a);
          break;
        default:
          throw Error(_(161));
      }
    } catch (s) {
      Se(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function lh(e, t, r) {
  (H = e), ug(e);
}
function ug(e, t, r) {
  for (var n = (e.mode & 1) !== 0; H !== null; ) {
    var o = H,
      l = o.child;
    if (o.tag === 22 && n) {
      var a = o.memoizedState !== null || ia;
      if (!a) {
        var i = o.alternate,
          s = (i !== null && i.memoizedState !== null) || Ye;
        i = ia;
        var u = Ye;
        if (((ia = a), (Ye = s) && !u))
          for (H = o; H !== null; )
            (a = H),
              (s = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? t0(o)
                : s !== null
                ? ((s.return = a), (H = s))
                : t0(o);
        for (; l !== null; ) (H = l), ug(l), (l = l.sibling);
        (H = o), (ia = i), (Ye = u);
      }
      Kd(e);
    } else
      o.subtreeFlags & 8772 && l !== null ? ((l.return = o), (H = l)) : Kd(e);
  }
}
function Kd(e) {
  for (; H !== null; ) {
    var t = H;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ye || mi(5, t);
              break;
            case 1:
              var n = t.stateNode;
              if (t.flags & 4 && !Ye)
                if (r === null) n.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? r.memoizedProps
                      : Mt(t.type, r.memoizedProps);
                  n.componentDidUpdate(
                    o,
                    r.memoizedState,
                    n.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var l = t.updateQueue;
              l !== null && Rd(t, l, n);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((r = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                Rd(t, a, r);
              }
              break;
            case 5:
              var i = t.stateNode;
              if (r === null && t.flags & 4) {
                r = i;
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
                    var g = m.dehydrated;
                    g !== null && ml(g);
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
              throw Error(_(163));
          }
        Ye || (t.flags & 512 && sc(t));
      } catch (p) {
        Se(t, t.return, p);
      }
    }
    if (t === e) {
      H = null;
      break;
    }
    if (((r = t.sibling), r !== null)) {
      (r.return = t.return), (H = r);
      break;
    }
    H = t.return;
  }
}
function e0(e) {
  for (; H !== null; ) {
    var t = H;
    if (t === e) {
      H = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      (r.return = t.return), (H = r);
      break;
    }
    H = t.return;
  }
}
function t0(e) {
  for (; H !== null; ) {
    var t = H;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            mi(4, t);
          } catch (s) {
            Se(t, r, s);
          }
          break;
        case 1:
          var n = t.stateNode;
          if (typeof n.componentDidMount == 'function') {
            var o = t.return;
            try {
              n.componentDidMount();
            } catch (s) {
              Se(t, o, s);
            }
          }
          var l = t.return;
          try {
            sc(t);
          } catch (s) {
            Se(t, l, s);
          }
          break;
        case 5:
          var a = t.return;
          try {
            sc(t);
          } catch (s) {
            Se(t, a, s);
          }
      }
    } catch (s) {
      Se(t, t.return, s);
    }
    if (t === e) {
      H = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      (i.return = t.return), (H = i);
      break;
    }
    H = t.return;
  }
}
var ah = Math.ceil,
  Xa = Cr.ReactCurrentDispatcher,
  cu = Cr.ReactCurrentOwner,
  Pt = Cr.ReactCurrentBatchConfig,
  oe = 0,
  He = null,
  Te = null,
  We = 0,
  dt = 0,
  no = an(0),
  Be = 0,
  wl = null,
  In = 0,
  gi = 0,
  uu = 0,
  el = null,
  nt = null,
  du = 0,
  yo = 1 / 0,
  ur = null,
  Qa = !1,
  dc = null,
  Qr = null,
  sa = !1,
  Ur = null,
  qa = 0,
  tl = 0,
  fc = null,
  Pa = -1,
  Fa = 0;
function Ke() {
  return oe & 6 ? Pe() : Pa !== -1 ? Pa : (Pa = Pe());
}
function qr(e) {
  return e.mode & 1
    ? oe & 2 && We !== 0
      ? We & -We
      : U2.transition !== null
      ? (Fa === 0 && (Fa = Yf()), Fa)
      : ((e = le),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : tm(e.type))),
        e)
    : 1;
}
function Ot(e, t, r, n) {
  if (50 < tl) throw ((tl = 0), (fc = null), Error(_(185)));
  Il(e, r, n),
    (!(oe & 2) || e !== He) &&
      (e === He && (!(oe & 2) && (gi |= r), Be === 4 && zr(e, We)),
      it(e, n),
      r === 1 && oe === 0 && !(t.mode & 1) && ((yo = Pe() + 500), ui && sn()));
}
function it(e, t) {
  var r = e.callbackNode;
  Up(e, t);
  var n = Ma(e, e === He ? We : 0);
  if (n === 0)
    r !== null && ud(r), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = n & -n), e.callbackPriority !== t)) {
    if ((r != null && ud(r), t === 1))
      e.tag === 0 ? $2(r0.bind(null, e)) : xm(r0.bind(null, e)),
        z2(function () {
          !(oe & 6) && sn();
        }),
        (r = null);
    else {
      switch (Xf(n)) {
        case 1:
          r = Rc;
          break;
        case 4:
          r = Gf;
          break;
        case 16:
          r = _a;
          break;
        case 536870912:
          r = Zf;
          break;
        default:
          r = _a;
      }
      r = vg(r, dg.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = r);
  }
}
function dg(e, t) {
  if (((Pa = -1), (Fa = 0), oe & 6)) throw Error(_(327));
  var r = e.callbackNode;
  if (uo() && e.callbackNode !== r) return null;
  var n = Ma(e, e === He ? We : 0);
  if (n === 0) return null;
  if (n & 30 || n & e.expiredLanes || t) t = Ja(e, n);
  else {
    t = n;
    var o = oe;
    oe |= 2;
    var l = mg();
    (He !== e || We !== t) && ((ur = null), (yo = Pe() + 500), kn(e, t));
    do
      try {
        ch();
        break;
      } catch (i) {
        fg(e, i);
      }
    while (!0);
    Qc(),
      (Xa.current = l),
      (oe = o),
      Te !== null ? (t = 0) : ((He = null), (We = 0), (t = Be));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Os(e)), o !== 0 && ((n = o), (t = mc(e, o)))), t === 1)
    )
      throw ((r = wl), kn(e, 0), zr(e, n), it(e, Pe()), r);
    if (t === 6) zr(e, n);
    else {
      if (
        ((o = e.current.alternate),
        !(n & 30) &&
          !ih(o) &&
          ((t = Ja(e, n)),
          t === 2 && ((l = Os(e)), l !== 0 && ((n = l), (t = mc(e, l)))),
          t === 1))
      )
        throw ((r = wl), kn(e, 0), zr(e, n), it(e, Pe()), r);
      switch (((e.finishedWork = o), (e.finishedLanes = n), t)) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          xn(e, nt, ur);
          break;
        case 3:
          if (
            (zr(e, n), (n & 130023424) === n && ((t = du + 500 - Pe()), 10 < t))
          ) {
            if (Ma(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & n) !== n)) {
              Ke(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = Zs(xn.bind(null, e, nt, ur), t);
            break;
          }
          xn(e, nt, ur);
          break;
        case 4:
          if ((zr(e, n), (n & 4194240) === n)) break;
          for (t = e.eventTimes, o = -1; 0 < n; ) {
            var a = 31 - zt(n);
            (l = 1 << a), (a = t[a]), a > o && (o = a), (n &= ~l);
          }
          if (
            ((n = o),
            (n = Pe() - n),
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
                : 1960 * ah(n / 1960)) - n),
            10 < n)
          ) {
            e.timeoutHandle = Zs(xn.bind(null, e, nt, ur), n);
            break;
          }
          xn(e, nt, ur);
          break;
        case 5:
          xn(e, nt, ur);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return it(e, Pe()), e.callbackNode === r ? dg.bind(null, e) : null;
}
function mc(e, t) {
  var r = el;
  return (
    e.current.memoizedState.isDehydrated && (kn(e, t).flags |= 256),
    (e = Ja(e, t)),
    e !== 2 && ((t = nt), (nt = r), t !== null && gc(t)),
    e
  );
}
function gc(e) {
  nt === null ? (nt = e) : nt.push.apply(nt, e);
}
function ih(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && ((r = r.stores), r !== null))
        for (var n = 0; n < r.length; n++) {
          var o = r[n],
            l = o.getSnapshot;
          o = o.value;
          try {
            if (!Ht(l(), o)) return !1;
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
function zr(e, t) {
  for (
    t &= ~uu,
      t &= ~gi,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var r = 31 - zt(t),
      n = 1 << r;
    (e[r] = -1), (t &= ~n);
  }
}
function r0(e) {
  if (oe & 6) throw Error(_(327));
  uo();
  var t = Ma(e, 0);
  if (!(t & 1)) return it(e, Pe()), null;
  var r = Ja(e, t);
  if (e.tag !== 0 && r === 2) {
    var n = Os(e);
    n !== 0 && ((t = n), (r = mc(e, n)));
  }
  if (r === 1) throw ((r = wl), kn(e, 0), zr(e, t), it(e, Pe()), r);
  if (r === 6) throw Error(_(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    xn(e, nt, ur),
    it(e, Pe()),
    null
  );
}
function fu(e, t) {
  var r = oe;
  oe |= 1;
  try {
    return e(t);
  } finally {
    (oe = r), oe === 0 && ((yo = Pe() + 500), ui && sn());
  }
}
function An(e) {
  Ur !== null && Ur.tag === 0 && !(oe & 6) && uo();
  var t = oe;
  oe |= 1;
  var r = Pt.transition,
    n = le;
  try {
    if (((Pt.transition = null), (le = 1), e)) return e();
  } finally {
    (le = n), (Pt.transition = r), (oe = t), !(oe & 6) && sn();
  }
}
function mu() {
  (dt = no.current), me(no);
}
function kn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var r = e.timeoutHandle;
  if ((r !== -1 && ((e.timeoutHandle = -1), R2(r)), Te !== null))
    for (r = Te.return; r !== null; ) {
      var n = r;
      switch ((Zc(n), n.tag)) {
        case 1:
          (n = n.type.childContextTypes), n != null && Oa();
          break;
        case 3:
          bo(), me(lt), me(Xe), ru();
          break;
        case 5:
          tu(n);
          break;
        case 4:
          bo();
          break;
        case 13:
          me(be);
          break;
        case 19:
          me(be);
          break;
        case 10:
          qc(n.type._context);
          break;
        case 22:
        case 23:
          mu();
      }
      r = r.return;
    }
  if (
    ((He = e),
    (Te = e = Jr(e.current, null)),
    (We = dt = t),
    (Be = 0),
    (wl = null),
    (uu = gi = In = 0),
    (nt = el = null),
    En !== null)
  ) {
    for (t = 0; t < En.length; t++)
      if (((r = En[t]), (n = r.interleaved), n !== null)) {
        r.interleaved = null;
        var o = n.next,
          l = r.pending;
        if (l !== null) {
          var a = l.next;
          (l.next = o), (n.next = a);
        }
        r.pending = n;
      }
    En = null;
  }
  return e;
}
function fg(e, t) {
  do {
    var r = Te;
    try {
      if ((Qc(), (Ca.current = Ya), Za)) {
        for (var n = ve.memoizedState; n !== null; ) {
          var o = n.queue;
          o !== null && (o.pending = null), (n = n.next);
        }
        Za = !1;
      }
      if (
        ((Tn = 0),
        (ze = Me = ve = null),
        (Jo = !1),
        (Sl = 0),
        (cu.current = null),
        r === null || r.return === null)
      ) {
        (Be = 1), (wl = t), (Te = null);
        break;
      }
      e: {
        var l = e,
          a = r.return,
          i = r,
          s = t;
        if (
          ((t = We),
          (i.flags |= 32768),
          s !== null && typeof s == 'object' && typeof s.then == 'function')
        ) {
          var u = s,
            m = i,
            g = m.tag;
          if (!(m.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var p = m.alternate;
            p
              ? ((m.updateQueue = p.updateQueue),
                (m.memoizedState = p.memoizedState),
                (m.lanes = p.lanes))
              : ((m.updateQueue = null), (m.memoizedState = null));
          }
          var v = Ud(a);
          if (v !== null) {
            (v.flags &= -257),
              Wd(v, a, i, l, t),
              v.mode & 1 && $d(l, u, t),
              (t = v),
              (s = u);
            var y = t.updateQueue;
            if (y === null) {
              var x = new Set();
              x.add(s), (t.updateQueue = x);
            } else y.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              $d(l, u, t), gu();
              break e;
            }
            s = Error(_(426));
          }
        } else if (pe && i.mode & 1) {
          var k = Ud(a);
          if (k !== null) {
            !(k.flags & 65536) && (k.flags |= 256),
              Wd(k, a, i, l, t),
              Yc(vo(s, i));
            break e;
          }
        }
        (l = s = vo(s, i)),
          Be !== 4 && (Be = 2),
          el === null ? (el = [l]) : el.push(l),
          (l = a);
        do {
          switch (l.tag) {
            case 3:
              (l.flags |= 65536), (t &= -t), (l.lanes |= t);
              var h = Xm(l, s, t);
              Ld(l, h);
              break e;
            case 1:
              i = s;
              var f = l.type,
                b = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof f.getDerivedStateFromError == 'function' ||
                  (b !== null &&
                    typeof b.componentDidCatch == 'function' &&
                    (Qr === null || !Qr.has(b))))
              ) {
                (l.flags |= 65536), (t &= -t), (l.lanes |= t);
                var S = Qm(l, i, t);
                Ld(l, S);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      pg(r);
    } catch (F) {
      (t = F), Te === r && r !== null && (Te = r = r.return);
      continue;
    }
    break;
  } while (!0);
}
function mg() {
  var e = Xa.current;
  return (Xa.current = Ya), e === null ? Ya : e;
}
function gu() {
  (Be === 0 || Be === 3 || Be === 2) && (Be = 4),
    He === null || (!(In & 268435455) && !(gi & 268435455)) || zr(He, We);
}
function Ja(e, t) {
  var r = oe;
  oe |= 2;
  var n = mg();
  (He !== e || We !== t) && ((ur = null), kn(e, t));
  do
    try {
      sh();
      break;
    } catch (o) {
      fg(e, o);
    }
  while (!0);
  if ((Qc(), (oe = r), (Xa.current = n), Te !== null)) throw Error(_(261));
  return (He = null), (We = 0), Be;
}
function sh() {
  for (; Te !== null; ) gg(Te);
}
function ch() {
  for (; Te !== null && !Mp(); ) gg(Te);
}
function gg(e) {
  var t = bg(e.alternate, e, dt);
  (e.memoizedProps = e.pendingProps),
    t === null ? pg(e) : (Te = t),
    (cu.current = null);
}
function pg(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((r = rh(r, t)), r !== null)) {
        (r.flags &= 32767), (Te = r);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Be = 6), (Te = null);
        return;
      }
    } else if (((r = th(r, t, dt)), r !== null)) {
      Te = r;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Te = t;
      return;
    }
    Te = t = e;
  } while (t !== null);
  Be === 0 && (Be = 5);
}
function xn(e, t, r) {
  var n = le,
    o = Pt.transition;
  try {
    (Pt.transition = null), (le = 1), uh(e, t, r, n);
  } finally {
    (Pt.transition = o), (le = n);
  }
  return null;
}
function uh(e, t, r, n) {
  do uo();
  while (Ur !== null);
  if (oe & 6) throw Error(_(327));
  r = e.finishedWork;
  var o = e.finishedLanes;
  if (r === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
    throw Error(_(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var l = r.lanes | r.childLanes;
  if (
    (Wp(e, l),
    e === He && ((Te = He = null), (We = 0)),
    (!(r.subtreeFlags & 2064) && !(r.flags & 2064)) ||
      sa ||
      ((sa = !0),
      vg(_a, function () {
        return uo(), null;
      })),
    (l = (r.flags & 15990) !== 0),
    r.subtreeFlags & 15990 || l)
  ) {
    (l = Pt.transition), (Pt.transition = null);
    var a = le;
    le = 1;
    var i = oe;
    (oe |= 4),
      (cu.current = null),
      oh(e, r),
      cg(r, e),
      I2(Vs),
      (Ba = !!Ws),
      (Vs = Ws = null),
      (e.current = r),
      lh(r),
      Bp(),
      (oe = i),
      (le = a),
      (Pt.transition = l);
  } else e.current = r;
  if (
    (sa && ((sa = !1), (Ur = e), (qa = o)),
    (l = e.pendingLanes),
    l === 0 && (Qr = null),
    zp(r.stateNode),
    it(e, Pe()),
    t !== null)
  )
    for (n = e.onRecoverableError, r = 0; r < t.length; r++)
      (o = t[r]), n(o.value, { componentStack: o.stack, digest: o.digest });
  if (Qa) throw ((Qa = !1), (e = dc), (dc = null), e);
  return (
    qa & 1 && e.tag !== 0 && uo(),
    (l = e.pendingLanes),
    l & 1 ? (e === fc ? tl++ : ((tl = 0), (fc = e))) : (tl = 0),
    sn(),
    null
  );
}
function uo() {
  if (Ur !== null) {
    var e = Xf(qa),
      t = Pt.transition,
      r = le;
    try {
      if (((Pt.transition = null), (le = 16 > e ? 16 : e), Ur === null))
        var n = !1;
      else {
        if (((e = Ur), (Ur = null), (qa = 0), oe & 6)) throw Error(_(331));
        var o = oe;
        for (oe |= 4, H = e.current; H !== null; ) {
          var l = H,
            a = l.child;
          if (H.flags & 16) {
            var i = l.deletions;
            if (i !== null) {
              for (var s = 0; s < i.length; s++) {
                var u = i[s];
                for (H = u; H !== null; ) {
                  var m = H;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ko(8, m, l);
                  }
                  var g = m.child;
                  if (g !== null) (g.return = m), (H = g);
                  else
                    for (; H !== null; ) {
                      m = H;
                      var p = m.sibling,
                        v = m.return;
                      if ((ag(m), m === u)) {
                        H = null;
                        break;
                      }
                      if (p !== null) {
                        (p.return = v), (H = p);
                        break;
                      }
                      H = v;
                    }
                }
              }
              var y = l.alternate;
              if (y !== null) {
                var x = y.child;
                if (x !== null) {
                  y.child = null;
                  do {
                    var k = x.sibling;
                    (x.sibling = null), (x = k);
                  } while (x !== null);
                }
              }
              H = l;
            }
          }
          if (l.subtreeFlags & 2064 && a !== null) (a.return = l), (H = a);
          else
            e: for (; H !== null; ) {
              if (((l = H), l.flags & 2048))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ko(9, l, l.return);
                }
              var h = l.sibling;
              if (h !== null) {
                (h.return = l.return), (H = h);
                break e;
              }
              H = l.return;
            }
        }
        var f = e.current;
        for (H = f; H !== null; ) {
          a = H;
          var b = a.child;
          if (a.subtreeFlags & 2064 && b !== null) (b.return = a), (H = b);
          else
            e: for (a = f; H !== null; ) {
              if (((i = H), i.flags & 2048))
                try {
                  switch (i.tag) {
                    case 0:
                    case 11:
                    case 15:
                      mi(9, i);
                  }
                } catch (F) {
                  Se(i, i.return, F);
                }
              if (i === a) {
                H = null;
                break e;
              }
              var S = i.sibling;
              if (S !== null) {
                (S.return = i.return), (H = S);
                break e;
              }
              H = i.return;
            }
        }
        if (
          ((oe = o), sn(), Kt && typeof Kt.onPostCommitFiberRoot == 'function')
        )
          try {
            Kt.onPostCommitFiberRoot(li, e);
          } catch {}
        n = !0;
      }
      return n;
    } finally {
      (le = r), (Pt.transition = t);
    }
  }
  return !1;
}
function n0(e, t, r) {
  (t = vo(r, t)),
    (t = Xm(e, t, 1)),
    (e = Xr(e, t, 1)),
    (t = Ke()),
    e !== null && (Il(e, 1, t), it(e, t));
}
function Se(e, t, r) {
  if (e.tag === 3) n0(e, e, r);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        n0(t, e, r);
        break;
      } else if (t.tag === 1) {
        var n = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof n.componentDidCatch == 'function' &&
            (Qr === null || !Qr.has(n)))
        ) {
          (e = vo(r, e)),
            (e = Qm(t, e, 1)),
            (t = Xr(t, e, 1)),
            (e = Ke()),
            t !== null && (Il(t, 1, e), it(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function dh(e, t, r) {
  var n = e.pingCache;
  n !== null && n.delete(t),
    (t = Ke()),
    (e.pingedLanes |= e.suspendedLanes & r),
    He === e &&
      (We & r) === r &&
      (Be === 4 || (Be === 3 && (We & 130023424) === We && 500 > Pe() - du)
        ? kn(e, 0)
        : (uu |= r)),
    it(e, t);
}
function hg(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Jl), (Jl <<= 1), !(Jl & 130023424) && (Jl = 4194304))
      : (t = 1));
  var r = Ke();
  (e = yr(e, t)), e !== null && (Il(e, t, r), it(e, r));
}
function fh(e) {
  var t = e.memoizedState,
    r = 0;
  t !== null && (r = t.retryLane), hg(e, r);
}
function mh(e, t) {
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
      throw Error(_(314));
  }
  n !== null && n.delete(t), hg(e, r);
}
var bg;
bg = function (e, t, r) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || lt.current) ot = !0;
    else {
      if (!(e.lanes & r) && !(t.flags & 128)) return (ot = !1), eh(e, t, r);
      ot = !!(e.flags & 131072);
    }
  else (ot = !1), pe && t.flags & 1048576 && Sm(t, $a, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var n = t.type;
      ka(e, t), (e = t.pendingProps);
      var o = go(t, Xe.current);
      co(t, r), (o = ou(null, t, n, e, o, r));
      var l = lu();
      return (
        (t.flags |= 1),
        typeof o == 'object' &&
        o !== null &&
        typeof o.render == 'function' &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            at(n) ? ((l = !0), Ha(t)) : (l = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            Kc(t),
            (o.updater = fi),
            (t.stateNode = o),
            (o._reactInternals = t),
            ec(t, n, e, r),
            (t = nc(null, t, n, !0, l, r)))
          : ((t.tag = 0), pe && l && Gc(t), Je(null, t, o, r), (t = t.child)),
        t
      );
    case 16:
      n = t.elementType;
      e: {
        switch (
          (ka(e, t),
          (e = t.pendingProps),
          (o = n._init),
          (n = o(n._payload)),
          (t.type = n),
          (o = t.tag = ph(n)),
          (e = Mt(n, e)),
          o)
        ) {
          case 0:
            t = rc(null, t, n, e, r);
            break e;
          case 1:
            t = Zd(null, t, n, e, r);
            break e;
          case 11:
            t = Vd(null, t, n, e, r);
            break e;
          case 14:
            t = Gd(null, t, n, Mt(n.type, e), r);
            break e;
        }
        throw Error(_(306, n, ''));
      }
      return t;
    case 0:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : Mt(n, o)),
        rc(e, t, n, o, r)
      );
    case 1:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : Mt(n, o)),
        Zd(e, t, n, o, r)
      );
    case 3:
      e: {
        if ((eg(t), e === null)) throw Error(_(387));
        (n = t.pendingProps),
          (l = t.memoizedState),
          (o = l.element),
          Fm(e, t),
          Va(t, n, null, r);
        var a = t.memoizedState;
        if (((n = a.element), l.isDehydrated))
          if (
            ((l = {
              element: n,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = l),
            (t.memoizedState = l),
            t.flags & 256)
          ) {
            (o = vo(Error(_(423)), t)), (t = Yd(e, t, n, r, o));
            break e;
          } else if (n !== o) {
            (o = vo(Error(_(424)), t)), (t = Yd(e, t, n, r, o));
            break e;
          } else
            for (
              gt = Yr(t.stateNode.containerInfo.firstChild),
                pt = t,
                pe = !0,
                Lt = null,
                r = km(t, null, n, r),
                t.child = r;
              r;

            )
              (r.flags = (r.flags & -3) | 4096), (r = r.sibling);
        else {
          if ((po(), n === o)) {
            t = xr(e, t, r);
            break e;
          }
          Je(e, t, n, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Dm(t),
        e === null && qs(t),
        (n = t.type),
        (o = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (a = o.children),
        Gs(n, o) ? (a = null) : l !== null && Gs(n, l) && (t.flags |= 32),
        Km(e, t),
        Je(e, t, a, r),
        t.child
      );
    case 6:
      return e === null && qs(t), null;
    case 13:
      return tg(e, t, r);
    case 4:
      return (
        eu(t, t.stateNode.containerInfo),
        (n = t.pendingProps),
        e === null ? (t.child = ho(t, null, n, r)) : Je(e, t, n, r),
        t.child
      );
    case 11:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : Mt(n, o)),
        Vd(e, t, n, o, r)
      );
    case 7:
      return Je(e, t, t.pendingProps, r), t.child;
    case 8:
      return Je(e, t, t.pendingProps.children, r), t.child;
    case 12:
      return Je(e, t, t.pendingProps.children, r), t.child;
    case 10:
      e: {
        if (
          ((n = t.type._context),
          (o = t.pendingProps),
          (l = t.memoizedProps),
          (a = o.value),
          de(Ua, n._currentValue),
          (n._currentValue = a),
          l !== null)
        )
          if (Ht(l.value, a)) {
            if (l.children === o.children && !lt.current) {
              t = xr(e, t, r);
              break e;
            }
          } else
            for (l = t.child, l !== null && (l.return = t); l !== null; ) {
              var i = l.dependencies;
              if (i !== null) {
                a = l.child;
                for (var s = i.firstContext; s !== null; ) {
                  if (s.context === n) {
                    if (l.tag === 1) {
                      (s = hr(-1, r & -r)), (s.tag = 2);
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
                      Js(l.return, r, t),
                      (i.lanes |= r);
                    break;
                  }
                  s = s.next;
                }
              } else if (l.tag === 10) a = l.type === t.type ? null : l.child;
              else if (l.tag === 18) {
                if (((a = l.return), a === null)) throw Error(_(341));
                (a.lanes |= r),
                  (i = a.alternate),
                  i !== null && (i.lanes |= r),
                  Js(a, r, t),
                  (a = l.sibling);
              } else a = l.child;
              if (a !== null) a.return = l;
              else
                for (a = l; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((l = a.sibling), l !== null)) {
                    (l.return = a.return), (a = l);
                    break;
                  }
                  a = a.return;
                }
              l = a;
            }
        Je(e, t, o.children, r), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (n = t.pendingProps.children),
        co(t, r),
        (o = Ft(o)),
        (n = n(o)),
        (t.flags |= 1),
        Je(e, t, n, r),
        t.child
      );
    case 14:
      return (
        (n = t.type),
        (o = Mt(n, t.pendingProps)),
        (o = Mt(n.type, o)),
        Gd(e, t, n, o, r)
      );
    case 15:
      return qm(e, t, t.type, t.pendingProps, r);
    case 17:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : Mt(n, o)),
        ka(e, t),
        (t.tag = 1),
        at(n) ? ((e = !0), Ha(t)) : (e = !1),
        co(t, r),
        Ym(t, n, o),
        ec(t, n, o, r),
        nc(null, t, n, !0, e, r)
      );
    case 19:
      return rg(e, t, r);
    case 22:
      return Jm(e, t, r);
  }
  throw Error(_(156, t.tag));
};
function vg(e, t) {
  return Vf(e, t);
}
function gh(e, t, r, n) {
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
function kt(e, t, r, n) {
  return new gh(e, t, r, n);
}
function pu(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function ph(e) {
  if (typeof e == 'function') return pu(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Mc)) return 11;
    if (e === Bc) return 14;
  }
  return 2;
}
function Jr(e, t) {
  var r = e.alternate;
  return (
    r === null
      ? ((r = kt(e.tag, t, e.key, e.mode)),
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
function Da(e, t, r, n, o, l) {
  var a = 2;
  if (((n = e), typeof e == 'function')) pu(e) && (a = 1);
  else if (typeof e == 'string') a = 5;
  else
    e: switch (e) {
      case Zn:
        return Pn(r.children, o, l, t);
      case _c:
        (a = 8), (o |= 8);
        break;
      case ws:
        return (
          (e = kt(12, r, t, o | 2)), (e.elementType = ws), (e.lanes = l), e
        );
      case ks:
        return (e = kt(13, r, t, o)), (e.elementType = ks), (e.lanes = l), e;
      case Ps:
        return (e = kt(19, r, t, o)), (e.elementType = Ps), (e.lanes = l), e;
      case Df:
        return pi(r, o, l, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case Pf:
              a = 10;
              break e;
            case Ff:
              a = 9;
              break e;
            case Mc:
              a = 11;
              break e;
            case Bc:
              a = 14;
              break e;
            case Mr:
              (a = 16), (n = null);
              break e;
          }
        throw Error(_(130, e == null ? e : typeof e, ''));
    }
  return (
    (t = kt(a, r, t, o)), (t.elementType = e), (t.type = n), (t.lanes = l), t
  );
}
function Pn(e, t, r, n) {
  return (e = kt(7, e, n, t)), (e.lanes = r), e;
}
function pi(e, t, r, n) {
  return (
    (e = kt(22, e, n, t)),
    (e.elementType = Df),
    (e.lanes = r),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ns(e, t, r) {
  return (e = kt(6, e, null, t)), (e.lanes = r), e;
}
function os(e, t, r) {
  return (
    (t = kt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = r),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function hh(e, t, r, n, o) {
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
    (this.eventTimes = zi(0)),
    (this.expirationTimes = zi(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = zi(0)),
    (this.identifierPrefix = n),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function hu(e, t, r, n, o, l, a, i, s) {
  return (
    (e = new hh(e, t, r, i, s)),
    t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
    (l = kt(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: n,
      isDehydrated: r,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Kc(l),
    e
  );
}
function bh(e, t, r) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Gn,
    key: n == null ? null : '' + n,
    children: e,
    containerInfo: t,
    implementation: r,
  };
}
function yg(e) {
  if (!e) return nn;
  e = e._reactInternals;
  e: {
    if (Rn(e) !== e || e.tag !== 1) throw Error(_(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (at(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (at(r)) return ym(e, r, t);
  }
  return t;
}
function xg(e, t, r, n, o, l, a, i, s) {
  return (
    (e = hu(r, n, !0, e, o, l, a, i, s)),
    (e.context = yg(null)),
    (r = e.current),
    (n = Ke()),
    (o = qr(r)),
    (l = hr(n, o)),
    (l.callback = t ?? null),
    Xr(r, l, o),
    (e.current.lanes = o),
    Il(e, o, n),
    it(e, n),
    e
  );
}
function hi(e, t, r, n) {
  var o = t.current,
    l = Ke(),
    a = qr(o);
  return (
    (r = yg(r)),
    t.context === null ? (t.context = r) : (t.pendingContext = r),
    (t = hr(l, a)),
    (t.payload = { element: e }),
    (n = n === void 0 ? null : n),
    n !== null && (t.callback = n),
    (e = Xr(o, t, a)),
    e !== null && (Ot(e, o, a, l), Ea(e, o, a)),
    a
  );
}
function Ka(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function o0(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function bu(e, t) {
  o0(e, t), (e = e.alternate) && o0(e, t);
}
function vh() {
  return null;
}
var Sg =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function vu(e) {
  this._internalRoot = e;
}
bi.prototype.render = vu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(_(409));
  hi(e, t, null, null);
};
bi.prototype.unmount = vu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    An(function () {
      hi(null, e, null, null);
    }),
      (t[vr] = null);
  }
};
function bi(e) {
  this._internalRoot = e;
}
bi.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Jf();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < Rr.length && t !== 0 && t < Rr[r].priority; r++);
    Rr.splice(r, 0, e), r === 0 && em(e);
  }
};
function yu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function vi(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function l0() {}
function yh(e, t, r, n, o) {
  if (o) {
    if (typeof n == 'function') {
      var l = n;
      n = function () {
        var u = Ka(a);
        l.call(u);
      };
    }
    var a = xg(t, n, e, 0, null, !1, !1, '', l0);
    return (
      (e._reactRootContainer = a),
      (e[vr] = a.current),
      hl(e.nodeType === 8 ? e.parentNode : e),
      An(),
      a
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof n == 'function') {
    var i = n;
    n = function () {
      var u = Ka(s);
      i.call(u);
    };
  }
  var s = hu(e, 0, !1, null, null, !1, !1, '', l0);
  return (
    (e._reactRootContainer = s),
    (e[vr] = s.current),
    hl(e.nodeType === 8 ? e.parentNode : e),
    An(function () {
      hi(t, s, r, n);
    }),
    s
  );
}
function yi(e, t, r, n, o) {
  var l = r._reactRootContainer;
  if (l) {
    var a = l;
    if (typeof o == 'function') {
      var i = o;
      o = function () {
        var s = Ka(a);
        i.call(s);
      };
    }
    hi(t, a, e, o);
  } else a = yh(r, t, e, o, n);
  return Ka(a);
}
Qf = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = Uo(t.pendingLanes);
        r !== 0 &&
          (zc(t, r | 1), it(t, Pe()), !(oe & 6) && ((yo = Pe() + 500), sn()));
      }
      break;
    case 13:
      An(function () {
        var n = yr(e, 1);
        if (n !== null) {
          var o = Ke();
          Ot(n, e, 1, o);
        }
      }),
        bu(e, 1);
  }
};
Oc = function (e) {
  if (e.tag === 13) {
    var t = yr(e, 134217728);
    if (t !== null) {
      var r = Ke();
      Ot(t, e, 134217728, r);
    }
    bu(e, 134217728);
  }
};
qf = function (e) {
  if (e.tag === 13) {
    var t = qr(e),
      r = yr(e, t);
    if (r !== null) {
      var n = Ke();
      Ot(r, e, t, n);
    }
    bu(e, t);
  }
};
Jf = function () {
  return le;
};
Kf = function (e, t) {
  var r = le;
  try {
    return (le = e), t();
  } finally {
    le = r;
  }
};
Ls = function (e, t, r) {
  switch (t) {
    case 'input':
      if ((Ts(e, r), (t = r.name), r.type === 'radio' && t != null)) {
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
            var o = ci(n);
            if (!o) throw Error(_(90));
            If(n), Ts(n, o);
          }
        }
      }
      break;
    case 'textarea':
      Nf(e, r);
      break;
    case 'select':
      (t = r.value), t != null && lo(e, !!r.multiple, t, !1);
  }
};
Of = fu;
Hf = An;
var xh = { usingClientEntryPoint: !1, Events: [Nl, qn, ci, Rf, zf, fu] },
  Lo = {
    findFiberByHostInstance: Sn,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  Sh = {
    bundleType: Lo.bundleType,
    version: Lo.version,
    rendererPackageName: Lo.rendererPackageName,
    rendererConfig: Lo.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Cr.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Uf(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Lo.findFiberByHostInstance || vh,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var ca = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ca.isDisabled && ca.supportsFiber)
    try {
      (li = ca.inject(Sh)), (Kt = ca);
    } catch {}
}
bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xh;
bt.createPortal = function (e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!yu(t)) throw Error(_(200));
  return bh(e, t, null, r);
};
bt.createRoot = function (e, t) {
  if (!yu(e)) throw Error(_(299));
  var r = !1,
    n = '',
    o = Sg;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (r = !0),
      t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = hu(e, 1, !1, null, null, r, !1, n, o)),
    (e[vr] = t.current),
    hl(e.nodeType === 8 ? e.parentNode : e),
    new vu(t)
  );
};
bt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(_(188))
      : ((e = Object.keys(e).join(',')), Error(_(268, e)));
  return (e = Uf(t)), (e = e === null ? null : e.stateNode), e;
};
bt.flushSync = function (e) {
  return An(e);
};
bt.hydrate = function (e, t, r) {
  if (!vi(t)) throw Error(_(200));
  return yi(null, e, t, !0, r);
};
bt.hydrateRoot = function (e, t, r) {
  if (!yu(e)) throw Error(_(405));
  var n = (r != null && r.hydratedSources) || null,
    o = !1,
    l = '',
    a = Sg;
  if (
    (r != null &&
      (r.unstable_strictMode === !0 && (o = !0),
      r.identifierPrefix !== void 0 && (l = r.identifierPrefix),
      r.onRecoverableError !== void 0 && (a = r.onRecoverableError)),
    (t = xg(t, null, e, 1, r ?? null, o, !1, l, a)),
    (e[vr] = t.current),
    hl(e),
    n)
  )
    for (e = 0; e < n.length; e++)
      (r = n[e]),
        (o = r._getVersion),
        (o = o(r._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [r, o])
          : t.mutableSourceEagerHydrationData.push(r, o);
  return new bi(t);
};
bt.render = function (e, t, r) {
  if (!vi(t)) throw Error(_(200));
  return yi(null, e, t, !1, r);
};
bt.unmountComponentAtNode = function (e) {
  if (!vi(e)) throw Error(_(40));
  return e._reactRootContainer
    ? (An(function () {
        yi(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[vr] = null);
        });
      }),
      !0)
    : !1;
};
bt.unstable_batchedUpdates = fu;
bt.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
  if (!vi(r)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return yi(e, t, r, !1, n);
};
bt.version = '18.3.1-next-f1338f8080-20240426';
function Eg() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Eg);
    } catch (e) {
      console.error(e);
    }
}
Eg(), (Ef.exports = bt);
var Cg = Ef.exports,
  a0 = Cg;
(Es.createRoot = a0.createRoot), (Es.hydrateRoot = a0.hydrateRoot);
let Xt = (function (e) {
  return (
    (e[(e.Backspace = 8)] = 'Backspace'),
    (e[(e.Tab = 9)] = 'Tab'),
    (e[(e.Enter = 13)] = 'Enter'),
    (e[(e.Shift = 16)] = 'Shift'),
    (e[(e.Ctrl = 17)] = 'Ctrl'),
    (e[(e.Alt = 18)] = 'Alt'),
    (e[(e.Pause = 19)] = 'Pause'),
    (e[(e.CapsLock = 20)] = 'CapsLock'),
    (e[(e.Escape = 27)] = 'Escape'),
    (e[(e.Space = 32)] = 'Space'),
    (e[(e.PageUp = 33)] = 'PageUp'),
    (e[(e.PageDown = 34)] = 'PageDown'),
    (e[(e.End = 35)] = 'End'),
    (e[(e.Home = 36)] = 'Home'),
    (e[(e.LeftArrow = 37)] = 'LeftArrow'),
    (e[(e.UpArrow = 38)] = 'UpArrow'),
    (e[(e.RightArrow = 39)] = 'RightArrow'),
    (e[(e.DownArrow = 40)] = 'DownArrow'),
    (e[(e.Insert = 45)] = 'Insert'),
    (e[(e.Delete = 46)] = 'Delete'),
    (e[(e.Key0 = 48)] = 'Key0'),
    (e[(e.Key1 = 49)] = 'Key1'),
    (e[(e.Key2 = 50)] = 'Key2'),
    (e[(e.Key3 = 51)] = 'Key3'),
    (e[(e.Key4 = 52)] = 'Key4'),
    (e[(e.Key5 = 53)] = 'Key5'),
    (e[(e.Key6 = 54)] = 'Key6'),
    (e[(e.Key7 = 55)] = 'Key7'),
    (e[(e.Key8 = 56)] = 'Key8'),
    (e[(e.Key9 = 57)] = 'Key9'),
    (e[(e.KeyA = 65)] = 'KeyA'),
    (e[(e.KeyB = 66)] = 'KeyB'),
    (e[(e.KeyC = 67)] = 'KeyC'),
    (e[(e.KeyD = 68)] = 'KeyD'),
    (e[(e.KeyE = 69)] = 'KeyE'),
    (e[(e.KeyF = 70)] = 'KeyF'),
    (e[(e.KeyG = 71)] = 'KeyG'),
    (e[(e.KeyH = 72)] = 'KeyH'),
    (e[(e.KeyI = 73)] = 'KeyI'),
    (e[(e.KeyJ = 74)] = 'KeyJ'),
    (e[(e.KeyK = 75)] = 'KeyK'),
    (e[(e.KeyL = 76)] = 'KeyL'),
    (e[(e.KeyM = 77)] = 'KeyM'),
    (e[(e.KeyN = 78)] = 'KeyN'),
    (e[(e.KeyO = 79)] = 'KeyO'),
    (e[(e.KeyP = 80)] = 'KeyP'),
    (e[(e.KeyQ = 81)] = 'KeyQ'),
    (e[(e.KeyR = 82)] = 'KeyR'),
    (e[(e.KeyS = 83)] = 'KeyS'),
    (e[(e.KeyT = 84)] = 'KeyT'),
    (e[(e.KeyU = 85)] = 'KeyU'),
    (e[(e.KeyV = 86)] = 'KeyV'),
    (e[(e.KeyW = 87)] = 'KeyW'),
    (e[(e.KeyX = 88)] = 'KeyX'),
    (e[(e.KeyY = 89)] = 'KeyY'),
    (e[(e.KeyZ = 90)] = 'KeyZ'),
    (e[(e.LeftMeta = 91)] = 'LeftMeta'),
    (e[(e.RightMeta = 92)] = 'RightMeta'),
    (e[(e.Select = 93)] = 'Select'),
    (e[(e.Numpad0 = 96)] = 'Numpad0'),
    (e[(e.Numpad1 = 97)] = 'Numpad1'),
    (e[(e.Numpad2 = 98)] = 'Numpad2'),
    (e[(e.Numpad3 = 99)] = 'Numpad3'),
    (e[(e.Numpad4 = 100)] = 'Numpad4'),
    (e[(e.Numpad5 = 101)] = 'Numpad5'),
    (e[(e.Numpad6 = 102)] = 'Numpad6'),
    (e[(e.Numpad7 = 103)] = 'Numpad7'),
    (e[(e.Numpad8 = 104)] = 'Numpad8'),
    (e[(e.Numpad9 = 105)] = 'Numpad9'),
    (e[(e.Multiply = 106)] = 'Multiply'),
    (e[(e.Add = 107)] = 'Add'),
    (e[(e.Subtract = 109)] = 'Subtract'),
    (e[(e.Decimal = 110)] = 'Decimal'),
    (e[(e.Divide = 111)] = 'Divide'),
    (e[(e.F1 = 112)] = 'F1'),
    (e[(e.F2 = 113)] = 'F2'),
    (e[(e.F3 = 114)] = 'F3'),
    (e[(e.F4 = 115)] = 'F4'),
    (e[(e.F5 = 116)] = 'F5'),
    (e[(e.F6 = 117)] = 'F6'),
    (e[(e.F7 = 118)] = 'F7'),
    (e[(e.F8 = 119)] = 'F8'),
    (e[(e.F9 = 120)] = 'F9'),
    (e[(e.F10 = 121)] = 'F10'),
    (e[(e.F11 = 122)] = 'F11'),
    (e[(e.F12 = 123)] = 'F12'),
    (e[(e.NumLock = 144)] = 'NumLock'),
    (e[(e.ScrollLock = 145)] = 'ScrollLock'),
    (e[(e.Semicolon = 186)] = 'Semicolon'),
    (e[(e.Equals = 187)] = 'Equals'),
    (e[(e.Comma = 188)] = 'Comma'),
    (e[(e.Dash = 189)] = 'Dash'),
    (e[(e.Period = 190)] = 'Period'),
    (e[(e.ForwardSlash = 191)] = 'ForwardSlash'),
    (e[(e.GraveAccent = 192)] = 'GraveAccent'),
    (e[(e.OpenBracket = 219)] = 'OpenBracket'),
    (e[(e.BackSlash = 220)] = 'BackSlash'),
    (e[(e.CloseBracket = 221)] = 'CloseBracket'),
    (e[(e.SingleQuote = 222)] = 'SingleQuote'),
    e
  );
})({});
const xu = {
    props: { 'data-polaris-scrollable': !0 },
    selector: '[data-polaris-scrollable]',
  },
  Eh = {
    props: { 'data-polaris-overlay': !0 },
    selector: '[data-polaris-overlay]',
  },
  wg = {
    props: { 'data-polaris-layer': !0 },
    selector: '[data-polaris-layer]',
  },
  i0 = {
    props: { 'data-polaris-unstyled': !0 },
    selector: '[data-polaris-unstyled]',
  },
  kg = {
    props: { 'data-polaris-top-bar': !0 },
    selector: '[data-polaris-top-bar]',
  },
  Ch = { props: ['data-portal-id'], selector: '[data-portal-id]' };
function wh(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
  if (r != null) {
    var n,
      o,
      l,
      a,
      i = [],
      s = !0,
      u = !1;
    try {
      if (((l = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(s = (n = l.call(r)).done) && (i.push(n.value), i.length !== t);
          s = !0
        );
    } catch (m) {
      (u = !0), (o = m);
    } finally {
      try {
        if (!s && r.return != null && ((a = r.return()), Object(a) !== a))
          return;
      } finally {
        if (u) throw o;
      }
    }
    return i;
  }
}
function kh(e, t) {
  return t || (t = e.slice(0)), (e.raw = t), e;
}
function Ph(e, t) {
  return Fh(e) || wh(e, t) || Dh(e, t) || Th();
}
function Fh(e) {
  if (Array.isArray(e)) return e;
}
function Dh(e, t) {
  if (e) {
    if (typeof e == 'string') return s0(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e);
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return s0(e, t);
  }
}
function s0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Th() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Ih = function (t) {
  return Ah(t) && !Nh(t);
};
function Ah(e) {
  return !!e && typeof e == 'object';
}
function Nh(e) {
  var t = Object.prototype.toString.call(e);
  return t === '[object RegExp]' || t === '[object Date]' || Bh(e);
}
var _h = typeof Symbol == 'function' && Symbol.for,
  Mh = _h ? Symbol.for('react.element') : 60103;
function Bh(e) {
  return e.$$typeof === Mh;
}
function Lh(e) {
  return Array.isArray(e) ? [] : {};
}
function kl(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Pl(Lh(e), e, t) : e;
}
function Rh(e, t, r) {
  return e.concat(t).map(function (n) {
    return kl(n, r);
  });
}
function zh(e, t) {
  if (!t.customMerge) return Pl;
  var r = t.customMerge(e);
  return typeof r == 'function' ? r : Pl;
}
function Oh(e) {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(e).filter(function (t) {
        return Object.propertyIsEnumerable.call(e, t);
      })
    : [];
}
function c0(e) {
  return Object.keys(e).concat(Oh(e));
}
function Pg(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Hh(e, t) {
  return (
    Pg(e, t) &&
    !(
      Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t)
    )
  );
}
function jh(e, t, r) {
  var n = {};
  return (
    r.isMergeableObject(e) &&
      c0(e).forEach(function (o) {
        n[o] = kl(e[o], r);
      }),
    c0(t).forEach(function (o) {
      Hh(e, o) ||
        (Pg(e, o) && r.isMergeableObject(t[o])
          ? (n[o] = zh(o, r)(e[o], t[o], r))
          : (n[o] = kl(t[o], r)));
    }),
    n
  );
}
function Pl(e, t, r) {
  (r = r || {}),
    (r.arrayMerge = r.arrayMerge || Rh),
    (r.isMergeableObject = r.isMergeableObject || Ih),
    (r.cloneUnlessOtherwiseSpecified = kl);
  var n = Array.isArray(t),
    o = Array.isArray(e),
    l = n === o;
  return l ? (n ? r.arrayMerge(e, t, r) : jh(e, t, r)) : kl(t, r);
}
Pl.all = function (t, r) {
  if (!Array.isArray(t)) throw new Error('first argument should be an array');
  return t.reduce(function (n, o) {
    return Pl(n, o, r);
  }, {});
};
var u0,
  pc = 16,
  ei = 'px',
  rl = 'em',
  Su = 'rem',
  $h = new RegExp(
    String.raw(u0 || (u0 = kh(['-?d+(?:.d+|d*)'], ['-?\\d+(?:\\.\\d+|\\d*)'])))
  ),
  Uh = new RegExp(ei + '|' + rl + '|' + Su);
function Fg(e) {
  e === void 0 && (e = '');
  var t = e.match(new RegExp($h.source + '(' + Uh.source + ')'));
  return t && t[1];
}
function Wh(e) {
  e === void 0 && (e = '');
  var t = Fg(e);
  if (!t || t === ei) return e;
  if (t === rl || t === Su) return '' + parseFloat(e) * pc + ei;
}
function Dg(e, t) {
  e === void 0 && (e = ''), t === void 0 && (t = pc);
  var r = Fg(e);
  if (!r || r === rl) return e;
  if (r === ei) return '' + parseFloat(e) / t + rl;
  if (r === Su) return '' + (parseFloat(e) * pc) / t + rl;
}
function Vh(e) {
  return Object.values(e).flatMap(function (t) {
    return Object.keys(t);
  });
}
function Gh(e) {
  var t = Object.entries(e),
    r = t.length - 1;
  return Object.fromEntries(
    t.map(function (n, o) {
      var l = n,
        a = Ph(l, 2),
        i = a[0],
        s = a[1],
        u = Zh(s),
        m = d0(s),
        g = o === r ? u : u + ' and ' + d0(t[o + 1][1]);
      return [i, { up: u, down: m, only: g }];
    })
  );
}
function Zh(e) {
  return '(min-width: ' + Dg(e) + ')';
}
function d0(e) {
  var t,
    r = parseFloat((t = Wh(e)) != null ? t : '') - 0.04;
  return '(max-width: ' + Dg(r + 'px') + ')';
}
var Tg = ['xs', 'sm', 'md', 'lg', 'xl'];
function Ig(e) {
  return 'p-theme-' + e;
}
function Yh(e) {
  var t = new Set(Vh(e));
  return function (r) {
    return t.has(r);
  };
}
var Ag = 'light',
  Ml = Ag,
  Xh = [
    Ag,
    'light-mobile',
    'light-high-contrast-experimental',
    'dark-experimental',
  ],
  Eu = {
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
        'color-tooltip-tail-down-border-experimental': 'rgba(212, 212, 212, 1)',
        'color-tooltip-tail-up-border-experimental': 'rgba(227, 227, 227, 1)',
        'color-border-gradient-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-hover-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-selected-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-active-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
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
        'color-button-gradient-bg-fill-selected-experimental':
          'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)',
        'color-button-gradient-bg-fill-active-experimental':
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
        'color-tooltip-tail-down-border-experimental': 'rgba(212, 212, 212, 1)',
        'color-tooltip-tail-up-border-experimental': 'rgba(227, 227, 227, 1)',
        'color-border-gradient-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-hover-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-selected-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-active-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
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
        'color-button-gradient-bg-fill-selected-experimental':
          'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)',
        'color-button-gradient-bg-fill-active-experimental':
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
        'color-tooltip-tail-down-border-experimental': 'rgba(212, 212, 212, 1)',
        'color-tooltip-tail-up-border-experimental': 'rgba(227, 227, 227, 1)',
        'color-border-gradient-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-hover-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-selected-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
        'color-border-gradient-active-experimental':
          'linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))',
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
        'color-button-gradient-bg-fill-selected-experimental':
          'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)',
        'color-button-gradient-bg-fill-active-experimental':
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
        'color-bg-surface-tertiary': 'rgba(243, 243, 243, 1)',
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
        'color-bg-fill-hover': 'rgba(37, 37, 37, 1)',
        'color-bg-fill-active': 'rgba(97, 97, 97, 1)',
        'color-bg-fill-selected': 'rgba(97, 97, 97, 1)',
        'color-bg-fill-disabled': 'rgba(0, 0, 0, 0.05)',
        'color-bg-fill-secondary': 'rgba(241, 241, 241, 1)',
        'color-bg-fill-secondary-hover': 'rgba(255, 255, 255, 0.11)',
        'color-bg-fill-secondary-active': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-tertiary': 'rgba(227, 227, 227, 1)',
        'color-bg-fill-tertiary-hover': 'rgba(212, 212, 212, 1)',
        'color-bg-fill-tertiary-active': 'rgba(204, 204, 204, 1)',
        'color-bg-fill-brand': 'rgba(255, 255, 255, 1)',
        'color-bg-fill-brand-hover': 'rgba(243, 243, 243, 1)',
        'color-bg-fill-brand-active': 'rgba(247, 247, 247, 1)',
        'color-bg-fill-brand-selected': 'rgba(212, 212, 212, 1)',
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
        'color-bg-fill-transparent': 'rgba(255, 255, 255, 0.11)',
        'color-bg-fill-transparent-hover': 'rgba(255, 255, 255, 0.14)',
        'color-bg-fill-transparent-active': 'rgba(255, 255, 255, 0.17)',
        'color-bg-fill-transparent-selected': 'rgba(255, 255, 255, 0.22)',
        'color-bg-fill-transparent-secondary': 'rgba(0, 0, 0, 0.06)',
        'color-bg-fill-transparent-secondary-hover': 'rgba(0, 0, 0, 0.08)',
        'color-bg-fill-transparent-secondary-active': 'rgba(0, 0, 0, 0.11)',
        'color-text': 'rgba(227, 227, 227, 1)',
        'color-text-secondary': 'rgba(181, 181, 181, 1)',
        'color-text-disabled': 'rgba(181, 181, 181, 1)',
        'color-text-link': 'rgba(0, 91, 211, 1)',
        'color-text-link-hover': 'rgba(0, 66, 153, 1)',
        'color-text-link-active': 'rgba(0, 46, 106, 1)',
        'color-text-brand': 'rgba(74, 74, 74, 1)',
        'color-text-brand-hover': 'rgba(48, 48, 48, 1)',
        'color-text-brand-on-bg-fill': 'rgba(48, 48, 48, 1)',
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
        'color-tooltip-tail-down-border-experimental': 'rgba(60, 60, 60, 1)',
        'color-tooltip-tail-up-border-experimental': 'rgba(71, 71, 71, 1)',
        'color-border-gradient-experimental':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.04))',
        'color-border-gradient-hover-experimental':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.04))',
        'color-border-gradient-selected-experimental':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.29) 10%, rgba(255, 255, 255, 0.22))',
        'color-border-gradient-active-experimental':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.29) 10%, rgba(255, 255, 255, 0.22))',
        'color-icon': 'rgba(227, 227, 227, 1)',
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
        'color-button-gradient-bg-fill-selected-experimental':
          'linear-gradient(to bottom, rgba(25, 25, 25, 1), rgba(19, 19, 19, 1) 50%, rgba(10, 10, 10, 1))',
        'color-button-gradient-bg-fill-active-experimental':
          'linear-gradient(to bottom, rgba(33, 33, 33, 1), rgba(30, 30, 30, 1) 50%, rgba(18, 18, 18, 1))',
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
  Cu = Eu[Ml];
Yh(Eu[Ml]);
const wu = d.createContext(null),
  ku = d.createContext(null);
function Ng(e) {
  return Eu[e];
}
function Qh() {
  const e = d.useContext(wu);
  if (!e)
    throw new Error(
      'No theme was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.'
    );
  return e;
}
function qh() {
  const e = d.useContext(ku);
  if (!e)
    throw new Error(
      'No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.'
    );
  return e;
}
function _g(e) {
  const t = typeof e;
  return e != null && (t === 'object' || t === 'function');
}
function R(...e) {
  return e.filter(Boolean).join(' ');
}
function ge(e, t) {
  return `${e}${t.charAt(0).toUpperCase()}${t.slice(1)}`;
}
function Pu(e) {
  const t = Object.entries(e).filter(([r, n]) => n != null);
  return t.length ? Object.fromEntries(t) : void 0;
}
function Jt(e, t, r, n) {
  if (!n) return {};
  let o;
  return (
    _g(n)
      ? (o = Object.fromEntries(
          Object.entries(n).map(([l, a]) => [l, `var(--p-${r}-${a})`])
        ))
      : (o = { [Tg[0]]: `var(--p-${r}-${n})` }),
    Object.fromEntries(
      Object.entries(o).map(([l, a]) => [`--pc-${e}-${t}-${l}`, a])
    )
  );
}
function nl(e, t, r) {
  return r
    ? _g(r)
      ? Object.fromEntries(
          Object.entries(r).map(([n, o]) => [`--pc-${e}-${t}-${n}`, o])
        )
      : { [`--pc-${e}-${t}-${Tg[0]}`]: r }
    : {};
}
var Jh = { themeContainer: 'Polaris-ThemeProvider--themeContainer' };
const Kh = ['light', 'dark-experimental'],
  eb = (e) => Kh.includes(e);
function tb(e) {
  const { as: t = 'div', children: r, className: n, theme: o = Ml } = e;
  return c.createElement(
    ku.Provider,
    { value: o },
    c.createElement(
      wu.Provider,
      { value: Ng(o) },
      c.createElement(
        t,
        {
          'data-portal-id': e['data-portal-id'],
          className: R(Ig(o), Jh.themeContainer, n),
        },
        r
      )
    )
  );
}
const Fu = d.createContext(!1),
  Kr = typeof window > 'u' || typeof document > 'u',
  Nn = Kr ? d.useEffect : d.useLayoutEffect;
function Or(e, t, r, n) {
  const o = d.useRef(t),
    l = d.useRef(n);
  Nn(() => {
    o.current = t;
  }, [t]),
    Nn(() => {
      l.current = n;
    }, [n]),
    d.useEffect(() => {
      if (!(typeof e == 'string' && r !== null)) return;
      let a;
      if (typeof r > 'u') a = window;
      else if ('current' in r) {
        if (r.current === null) return;
        a = r.current;
      } else a = r;
      const i = l.current,
        s = (u) => o.current(u);
      return (
        a.addEventListener(e, s, i),
        () => {
          a.removeEventListener(e, s, i);
        }
      );
    }, [e, r]);
}
let $n = (function (e) {
  return (
    (e.All = 'all'),
    (e.Page = 'page'),
    (e.Multi = 'multi'),
    (e.Single = 'single'),
    (e.Range = 'range'),
    e
  );
})({});
function f0(e) {
  if ('id' in e) return e.id;
  throw new Error(
    'Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useIndexResourceState`'
  );
}
function rb(
  e,
  {
    selectedResources: t = [],
    allResourcesSelected: r = !1,
    resourceIDResolver: n = f0,
    resourceFilter: o = void 0,
  } = {
    selectedResources: [],
    allResourcesSelected: !1,
    resourceIDResolver: f0,
    resourceFilter: void 0,
  }
) {
  const [l, a] = d.useState(t),
    [i, s] = d.useState(r),
    u = d.useCallback(
      (p, v, y, x) => {
        switch ((p === $n.All ? s(v) : i && s(!1), p)) {
          case $n.Single:
            a((k) => (v ? [...k, y] : k.filter((h) => h !== y)));
            break;
          case $n.All:
          case $n.Page:
            if (o) {
              const k = e.filter(o);
              a(v && l.length < k.length ? k.map(n) : []);
            } else a(v ? e.map(n) : []);
            break;
          case $n.Multi:
            if (!y) break;
            a((k) => {
              const h = [],
                f = o ? e.filter(o) : e;
              for (let b = y[0]; b <= y[1]; b++)
                if (f.includes(e[b])) {
                  const S = n(e[b]);
                  ((v && !k.includes(S)) || (!v && k.includes(S))) && h.push(S);
                }
              return v ? [...k, ...h] : k.filter((b) => !h.includes(b));
            });
            break;
          case $n.Range:
            if (!y) break;
            a((k) => {
              const b = (o ? e.filter(o) : e)
                  .map(n)
                  .slice(Number(y[0]), Number(y[1]) + 1),
                S = b.some((E) => l.includes(E));
              return !b.every((E) => l.includes(E)) && (v || S)
                ? [...new Set([...k, ...b]).values()]
                : k.filter((E) => !b.includes(E));
            });
            break;
        }
      },
      [i, o, l, e, n]
    ),
    m = d.useCallback(() => {
      a([]), s(!1);
    }, []),
    g = d.useCallback(
      (p) => {
        const y = [...l].filter((x) => !p.includes(x));
        a(y), y.length === 0 && s(!1);
      },
      [l]
    );
  return {
    selectedResources: l,
    allResourcesSelected: i,
    handleSelectionChange: u,
    clearSelection: m,
    removeSelectedResources: g,
  };
}
const Mg = { navigationBarCollapsed: '767.95px', stackedContent: '1039.95px' },
  Bg = {
    media: '',
    addListener: Ro,
    removeListener: Ro,
    matches: !1,
    onchange: Ro,
    addEventListener: Ro,
    removeEventListener: Ro,
    dispatchEvent: (e) => !0,
  };
function Ro() {}
function ls() {
  return Kr
    ? Bg
    : window.matchMedia(`(max-width: ${Mg.navigationBarCollapsed})`);
}
function nb() {
  return Kr ? Bg : window.matchMedia(`(max-width: ${Mg.stackedContent})`);
}
const hc = new Set(),
  Du = ab(Cu.breakpoints);
Kr ||
  Du.forEach(([e, t]) => {
    const r = (o) => {
        for (const l of hc) l(e, o.matches);
      },
      n = window.matchMedia(t);
    n.addListener ? n.addListener(r) : n.addEventListener('change', r);
  });
function ob(e) {
  return Object.fromEntries(Du.map(([t]) => [t, !1]));
}
function lb() {
  return Object.fromEntries(
    Du.map(([e, t]) => [e, window.matchMedia(t).matches])
  );
}
function Bl(e) {
  const [t, r] = d.useState(ob());
  return (
    Nn(() => {
      r(lb());
      const n = (o, l) => {
        r((a) => ({ ...a, [o]: l }));
      };
      return (
        hc.add(n),
        () => {
          hc.delete(n);
        }
      );
    }, []),
    t
  );
}
function ab(e) {
  return Object.entries(Gh(e))
    .map(([r, n]) =>
      Object.entries(n).map(([o, l]) => [`${r.split('-')[1]}${ib(o)}`, l])
    )
    .flat();
}
function ib(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function tr(e, t, r) {
  let n,
    o,
    l,
    a,
    i,
    s,
    u = 0,
    m = !1,
    g = !1,
    p = !0;
  const v = !t && t !== 0;
  if (typeof e != 'function') throw new TypeError('Expected a function');
  const y = t || 0;
  typeof r == 'object' &&
    ((m = !!r.leading),
    (g = 'maxWait' in r),
    (l = g ? Math.max(Number(r.maxWait) || 0, y) : void 0),
    (p = 'trailing' in r ? !!r.trailing : p));
  function x(N) {
    const B = n,
      j = o;
    return (n = void 0), (o = void 0), (u = N), (a = e.apply(j, B)), a;
  }
  function k(N, B) {
    return v
      ? (cancelAnimationFrame(i), requestAnimationFrame(N))
      : setTimeout(N, B);
  }
  function h(N) {
    if (v) return cancelAnimationFrame(N);
    clearTimeout(N);
  }
  function f(N) {
    return (u = N), (i = k(F, y)), m ? x(N) : a;
  }
  function b(N) {
    const B = N - s,
      j = N - u,
      Z = y - B;
    return g && l ? Math.min(Z, l - j) : Z;
  }
  function S(N) {
    const B = N - s,
      j = N - u;
    return s === void 0 || B >= y || B < 0 || (g && l && j >= l);
  }
  function F() {
    const N = Date.now();
    if (S(N)) return w(N);
    i = k(F, b(N));
  }
  function w(N) {
    return (i = void 0), p && n ? x(N) : ((n = o = void 0), a);
  }
  function P() {
    i !== void 0 && h(i), (u = 0), (n = s = o = i = void 0);
  }
  function E() {
    return i === void 0 ? a : w(Date.now());
  }
  function A() {
    return i !== void 0;
  }
  function D(...N) {
    const B = Date.now(),
      j = S(B);
    if (((n = N), (o = this), (s = B), j)) {
      if (i === void 0) return f(s);
      if (g) return (i = k(F, y)), x(s);
    }
    return i === void 0 && (i = k(F, y)), a;
  }
  return (D.cancel = P), (D.flush = E), (D.pending = A), D;
}
class _n {
  static get zero() {
    return new _n();
  }
  constructor({ top: t = 0, left: r = 0, width: n = 0, height: o = 0 } = {}) {
    (this.top = t), (this.left = r), (this.width = n), (this.height = o);
  }
  get center() {
    return { x: this.left + this.width / 2, y: this.top + this.height / 2 };
  }
}
function qt(e) {
  if (!(e instanceof Element))
    return new _n({ width: window.innerWidth, height: window.innerHeight });
  const t = e.getBoundingClientRect();
  return new _n({ top: t.top, left: t.left, width: t.width, height: t.height });
}
const ua = 1e3 / 60;
class Lg {
  constructor(t) {
    (this.stickyItems = []),
      (this.stuckItems = []),
      (this.container = null),
      (this.topBarOffset = 0),
      (this.handleResize = tr(
        () => {
          this.manageStickyItems();
        },
        ua,
        { leading: !0, trailing: !0, maxWait: ua }
      )),
      (this.handleScroll = tr(
        () => {
          this.manageStickyItems();
        },
        ua,
        { leading: !0, trailing: !0, maxWait: ua }
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
      Rg(t) && this.setTopBarOffset(t),
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
    const t = this.container ? sb(this.container) : 0,
      r = qt(this.container).top + this.topBarOffset;
    this.stickyItems.forEach((n) => {
      const { handlePositioning: o } = n,
        {
          sticky: l,
          top: a,
          left: i,
          width: s,
        } = this.evaluateStickyItem(n, t, r);
      this.updateStuckItems(n, l), o(l, a, i, s);
    });
  }
  evaluateStickyItem(t, r, n) {
    var k;
    const {
      stickyNode: o,
      placeHolderNode: l,
      boundingElement: a,
      offset: i,
      disableWhenStacked: s,
    } = t;
    if (s && nb().matches)
      return { sticky: !1, top: 0, left: 0, width: 'auto' };
    const u = i
        ? this.getOffset(o) + parseInt(Cu.space['space-500'], 10)
        : this.getOffset(o),
      m = r + u,
      g = l.getBoundingClientRect().top - n + r,
      p = n + u,
      v = l.getBoundingClientRect().width,
      y = l.getBoundingClientRect().left;
    let x;
    if (a == null) x = m >= g;
    else {
      const h =
          o.getBoundingClientRect().height ||
          ((k = o.firstElementChild) == null
            ? void 0
            : k.getBoundingClientRect().height) ||
          0,
        f = a.getBoundingClientRect().bottom - h + r - n;
      x = m >= g && m < f;
    }
    return { sticky: x, top: p, left: y, width: v };
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
      l = qt(t);
    for (; n < o; ) {
      const a = this.stuckItems[n].stickyNode;
      if (a !== t) {
        const i = qt(a);
        cb(l, i) || (r += qt(a).height);
      } else break;
      n++;
    }
    return r;
  }
  isNodeStuck(t) {
    return this.stuckItems.findIndex(({ stickyNode: n }) => t === n) >= 0;
  }
  setTopBarOffset(t) {
    const r = t.querySelector(`:not(${xu.selector}) ${kg.selector}`);
    this.topBarOffset = r ? r.clientHeight : 0;
  }
}
function Rg(e) {
  return e === document;
}
function sb(e) {
  return Rg(e)
    ? document.body.scrollTop || document.documentElement.scrollTop
    : e.scrollTop;
}
function cb(e, t) {
  const r = e.left,
    n = e.left + e.width,
    o = t.left;
  return t.left + t.width < r || n < o;
}
const m0 = 'data-lock-scrolling',
  g0 = 'data-lock-scrolling-hidden',
  p0 = 'data-lock-scrolling-wrapper';
let da = 0;
function ub() {
  const { body: e } = document;
  return e.scrollHeight > e.clientHeight;
}
class db {
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
    if (Kr) return;
    const { scrollLocks: t } = this,
      { body: r } = document,
      n = r.firstElementChild;
    t === 0
      ? (r.removeAttribute(m0),
        r.removeAttribute(g0),
        n && n.removeAttribute(p0),
        window.scroll(0, da),
        (this.locked = !1))
      : t > 0 &&
        !this.locked &&
        ((da = window.pageYOffset),
        r.setAttribute(m0, ''),
        ub() || r.setAttribute(g0, ''),
        n && (n.setAttribute(p0, ''), (n.scrollTop = da)),
        (this.locked = !0));
  }
  resetScrollPosition() {
    da = 0;
  }
}
const fb = /\[(.*?)\]|(\w+)/g;
function h0(e, t, r) {
  if (e == null) return;
  const n = Array.isArray(t) ? t : mb(t);
  let o = e;
  for (let l = 0; l < n.length; l++) {
    const a = o[n[l]];
    if (a === void 0) return r;
    o = a;
  }
  return o;
}
function mb(e) {
  const t = [];
  let r;
  for (; (r = fb.exec(e)); ) {
    const [, n, o] = r;
    t.push(n || o);
  }
  return t;
}
function gb(...e) {
  let t = {};
  for (const r of e) t = zg(t, r);
  return t;
}
function zg(e, t) {
  const r = Array.isArray(e) ? [...e] : { ...e };
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n))
      b0(t[n]) && b0(r[n]) ? (r[n] = zg(r[n], t[n])) : (r[n] = t[n]);
    else continue;
  return r;
}
function b0(e) {
  return e !== null && typeof e == 'object';
}
const pb = /{([^}]*)}/g;
let v0 = class {
  constructor(t) {
    (this.translation = {}),
      (this.translation = Array.isArray(t) ? gb(...t.slice().reverse()) : t);
  }
  translate(t, r) {
    const n = h0(this.translation, t, '');
    return n
      ? r
        ? n.replace(pb, (o) => {
            const l = o.substring(1, o.length - 1);
            if (r[l] === void 0) {
              const a = JSON.stringify(r);
              throw new Error(
                `Error in translation for key '${t}'. No replacement found for key '${l}'. The following replacements were passed: '${a}'`
              );
            }
            return r[l];
          })
        : n
      : '';
  }
  translationKeyExists(t) {
    return !!h0(this.translation, t);
  }
};
const hb = d.createContext(void 0),
  Og = d.createContext(void 0),
  bb = d.createContext(void 0),
  Tu = d.createContext(void 0),
  Hg = d.createContext(void 0),
  vb = d.createContext(void 0);
class xo extends d.PureComponent {
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
    const { event: t, handler: r, capture: n, passive: o } = this.props;
    window.addEventListener(t, r, { capture: n, passive: o });
  }
  detachListener(t) {
    const { event: r, handler: n, capture: o } = t || this.props;
    window.removeEventListener(r, n, o);
  }
}
const yb = function ({ children: t }) {
  const [r, n] = d.useState(ls().matches),
    o = d.useCallback(
      tr(
        () => {
          r !== ls().matches && n(!r);
        },
        40,
        { trailing: !0, leading: !0, maxWait: 40 }
      ),
      [r]
    );
  d.useEffect(() => {
    n(ls().matches);
  }, []);
  const l = d.useMemo(() => ({ isNavigationCollapsed: r }), [r]);
  return c.createElement(
    vb.Provider,
    { value: l },
    c.createElement(xo, { event: 'resize', handler: o }),
    t
  );
};
function Ll() {
  const [e, t] = d.useState(!1);
  return (
    d.useEffect(() => {
      t(!0);
    }, []),
    e
  );
}
const Iu = d.createContext(void 0);
function xb(e, t) {
  return c.createElement('div', { id: 'PolarisPortalsContainer', ref: t });
}
const Sb = d.forwardRef(xb);
function Eb({ children: e, container: t }) {
  const r = Ll(),
    n = d.useRef(null),
    o = d.useMemo(
      () =>
        t
          ? { container: t }
          : r
          ? { container: n.current }
          : { container: null },
      [t, r]
    );
  return c.createElement(
    Iu.Provider,
    { value: o },
    e,
    t ? null : c.createElement(Sb, { ref: n })
  );
}
const Cb = d.createContext(void 0);
function wb({ children: e }) {
  const [t, r] = d.useState([]),
    n = d.useCallback((a) => {
      r((i) => [...i, a]);
    }, []),
    o = d.useCallback((a) => {
      let i = !0;
      return (
        r((s) => {
          const u = [...s],
            m = u.indexOf(a);
          return m === -1 ? (i = !1) : u.splice(m, 1), u;
        }),
        i
      );
    }, []),
    l = d.useMemo(() => ({ trapFocusList: t, add: n, remove: o }), [n, t, o]);
  return c.createElement(Cb.Provider, { value: l }, e);
}
const jg = d.createContext(void 0),
  kb = { tooltip: 0, hovercard: 0 };
function Pb({ children: e }) {
  const [t, r] = d.useState(kb),
    n = d.useCallback((a) => {
      r((i) => ({ ...i, [a]: i[a] + 1 }));
    }, []),
    o = d.useCallback((a) => {
      r((i) => ({ ...i, [a]: i[a] - 1 }));
    }, []),
    l = d.useMemo(
      () => ({
        presenceList: Object.entries(t).reduce((a, i) => {
          const [s, u] = i;
          return { ...a, [s]: u >= 1 };
        }, {}),
        presenceCounter: t,
        addPresence: n,
        removePresence: o,
      }),
      [n, o, t]
    );
  return c.createElement(jg.Provider, { value: l }, e);
}
const Fb = 20,
  Ta = 30,
  Db = Ta + 10;
function Tb() {
  var o;
  const e = document.createElement('div');
  e.setAttribute(
    'style',
    `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${Ta}px; height:${Ta}px;`
  );
  const t = document.createElement('div');
  t.setAttribute(
    'style',
    `width:100%; height: ${Db}; overflow:scroll; scrollbar-width: thin;`
  ),
    e.appendChild(t),
    document.body.appendChild(e);
  const r =
      Ta - (((o = e.firstElementChild) == null ? void 0 : o.clientWidth) ?? 0),
    n = Math.min(r, Fb);
  document.documentElement.style.setProperty(
    '--pc-app-provider-scrollbar-width',
    `${n}px`
  ),
    document.body.removeChild(e);
}
class Ib extends d.Component {
  constructor(t) {
    super(t),
      (this.setBodyStyles = () => {
        (document.body.style.backgroundColor = 'var(--p-color-bg)'),
          (document.body.style.color = 'var(--p-color-text)');
      }),
      (this.setRootAttributes = () => {
        const o = this.getThemeName();
        Xh.forEach((l) => {
          document.documentElement.classList.toggle(Ig(l), l === o);
        });
      }),
      (this.getThemeName = () => this.props.theme ?? Ml),
      (this.stickyManager = new Lg()),
      (this.scrollLockManager = new db());
    const { i18n: r, linkComponent: n } = this.props;
    this.state = { link: n, intl: new v0(r) };
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
    Tb();
  }
  componentDidUpdate({ i18n: t, linkComponent: r }) {
    const { i18n: n, linkComponent: o } = this.props;
    this.setRootAttributes(),
      !(n === t && o === r) && this.setState({ link: o, intl: new v0(n) });
  }
  render() {
    const { children: t, features: r = {} } = this.props,
      n = this.getThemeName(),
      { intl: o, link: l } = this.state;
    return c.createElement(
      ku.Provider,
      { value: n },
      c.createElement(
        wu.Provider,
        { value: Ng(n) },
        c.createElement(
          hb.Provider,
          { value: r },
          c.createElement(
            Og.Provider,
            { value: o },
            c.createElement(
              bb.Provider,
              { value: this.scrollLockManager },
              c.createElement(
                Tu.Provider,
                { value: this.stickyManager },
                c.createElement(
                  Hg.Provider,
                  { value: l },
                  c.createElement(
                    yb,
                    null,
                    c.createElement(
                      Eb,
                      null,
                      c.createElement(wb, null, c.createElement(Pb, null, t))
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
var Au = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z',
    }),
    c.createElement('path', { d: 'M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' }),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z',
    })
  );
};
Au.displayName = 'AlertCircleIcon';
var $g = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z',
    }),
    c.createElement('path', { d: 'M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' }),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z',
    })
  );
};
$g.displayName = 'AlertDiamondIcon';
var Ug = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M10 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z',
    }),
    c.createElement('path', { d: 'M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' }),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M10 3.5c-1.045 0-1.784.702-2.152 1.447a449.26 449.26 0 0 1-2.005 3.847l-.028.052a403.426 403.426 0 0 0-2.008 3.856c-.372.752-.478 1.75.093 2.614.57.863 1.542 1.184 2.464 1.184h7.272c.922 0 1.895-.32 2.464-1.184.57-.864.465-1.862.093-2.614-.21-.424-1.113-2.147-2.004-3.847l-.032-.061a429.497 429.497 0 0 1-2.005-3.847c-.368-.745-1.107-1.447-2.152-1.447Zm-.808 2.112c.404-.816 1.212-.816 1.616 0 .202.409 1.112 2.145 2.022 3.88a418.904 418.904 0 0 1 2.018 3.875c.404.817 0 1.633-1.212 1.633h-7.272c-1.212 0-1.617-.816-1.212-1.633.202-.408 1.113-2.147 2.023-3.883a421.932 421.932 0 0 0 2.017-3.872Z',
    })
  );
};
Ug.displayName = 'AlertTriangleIcon';
var Wg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M16.5 10a.75.75 0 0 1-.75.75h-9.69l2.72 2.72a.75.75 0 0 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-2.72 2.72h9.69a.75.75 0 0 1 .75.75Z',
    })
  );
};
Wg.displayName = 'ArrowLeftIcon';
var Vg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M15.78 5.97a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 5.97-5.97a.75.75 0 0 1 1.06 0Z',
    })
  );
};
Vg.displayName = 'CheckIcon';
var Nu = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M5.72 8.47a.75.75 0 0 1 1.06 0l3.47 3.47 3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06Z',
    })
  );
};
Nu.displayName = 'ChevronDownIcon';
var Gg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M11.764 5.204a.75.75 0 0 1 .032 1.06l-3.516 3.736 3.516 3.736a.75.75 0 1 1-1.092 1.028l-4-4.25a.75.75 0 0 1 0-1.028l4-4.25a.75.75 0 0 1 1.06-.032Z',
    })
  );
};
Gg.displayName = 'ChevronLeftIcon';
var Zg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M7.72 14.53a.75.75 0 0 1 0-1.06l3.47-3.47-3.47-3.47a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0Z',
    })
  );
};
Zg.displayName = 'ChevronRightIcon';
var _u = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M14.53 12.28a.75.75 0 0 1-1.06 0l-3.47-3.47-3.47 3.47a.75.75 0 0 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06Z',
    })
  );
};
_u.displayName = 'ChevronUpIcon';
var Yg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M4 5.25a.75.75 0 0 1 .75-.75h6.991a2.75 2.75 0 0 1 2.645 1.995l.427 1.494a.25.25 0 0 0 .18.173l1.681.421a1.75 1.75 0 0 1 1.326 1.698v1.219a1.75 1.75 0 0 1-1.032 1.597 2.5 2.5 0 1 1-4.955.153h-3.025a2.5 2.5 0 1 1-4.78-.75h-.458a.75.75 0 0 1 0-1.5h2.5c.03 0 .06.002.088.005a2.493 2.493 0 0 1 1.947.745h4.43a2.493 2.493 0 0 1 1.785-.75c.698 0 1.33.286 1.783.748a.25.25 0 0 0 .217-.248v-1.22a.25.25 0 0 0-.19-.242l-1.682-.42a1.75 1.75 0 0 1-1.258-1.217l-.427-1.494a1.25 1.25 0 0 0-1.202-.907h-6.991a.75.75 0 0 1-.75-.75Zm2.5 9.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    }),
    c.createElement('path', {
      d: 'M3.25 8a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Z',
    })
  );
};
Yg.displayName = 'DeliveryIcon';
var Xg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z',
    }),
    c.createElement('path', { d: 'M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z' }),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z',
    })
  );
};
Xg.displayName = 'InfoIcon';
var Qg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M6 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
    }),
    c.createElement('path', {
      d: 'M11.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
    }),
    c.createElement('path', {
      d: 'M17 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
    })
  );
};
Qg.displayName = 'MenuHorizontalIcon';
var qg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M5 10c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75s-.336.75-.75.75h-8.5c-.414 0-.75-.336-.75-.75Z',
    })
  );
};
qg.displayName = 'MinusIcon';
var Jg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M6.55 7.25a.7.7 0 0 1 .7-.7h5.5a.7.7 0 0 1 0 1.4h-5.5a.7.7 0 0 1-.7-.7Z',
    }),
    c.createElement('path', {
      d: 'M7 9.05a.7.7 0 0 0 0 1.4h2.25a.7.7 0 1 0 0-1.4h-2.25Z',
    }),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M3.5 6.25a2.75 2.75 0 0 1 2.75-2.75h7.5a2.75 2.75 0 0 1 2.75 2.75v5.5a.75.75 0 0 1-.22.53l-4 4a.75.75 0 0 1-.53.22h-5.5a2.75 2.75 0 0 1-2.75-2.75v-7.5Zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25h4.75v-2.25c0-.966.784-1.75 1.75-1.75h2.25v-4.75c0-.69-.56-1.25-1.25-1.25h-7.5Zm7.69 7.5h-1.19a.25.25 0 0 0-.25.25v1.19l1.44-1.44Z',
    })
  );
};
Jg.displayName = 'NoteIcon';
var Kg = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M12.323 13.383a5.5 5.5 0 1 1 1.06-1.06l2.897 2.897a.75.75 0 1 1-1.06 1.06l-2.897-2.897Zm.677-4.383a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
    })
  );
};
Kg.displayName = 'SearchIcon';
var Mu = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M10.884 4.323a1.25 1.25 0 0 0-1.768 0l-2.646 2.647a.75.75 0 0 0 1.06 1.06l2.47-2.47 2.47 2.47a.75.75 0 1 0 1.06-1.06l-2.646-2.647Z',
    }),
    c.createElement('path', {
      d: 'm13.53 13.03-2.646 2.647a1.25 1.25 0 0 1-1.768 0l-2.646-2.647a.75.75 0 0 1 1.06-1.06l2.47 2.47 2.47-2.47a.75.75 0 0 1 1.06 1.06Z',
    })
  );
};
Mu.displayName = 'SelectIcon';
var bc = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M9.116 4.323a1.25 1.25 0 0 1 1.768 0l2.646 2.647a.75.75 0 0 1-1.06 1.06l-2.47-2.47-2.47 2.47a.75.75 0 1 1-1.06-1.06l2.646-2.647Z',
    }),
    c.createElement('path', {
      fillOpacity: 0.33,
      fillRule: 'evenodd',
      d: 'M9.116 15.677a1.25 1.25 0 0 0 1.768 0l2.646-2.647a.75.75 0 0 0-1.06-1.06l-2.47 2.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647Z',
    })
  );
};
bc.displayName = 'SortAscendingIcon';
var vc = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      fillOpacity: 0.33,
      fillRule: 'evenodd',
      d: 'M9.116 4.823a1.25 1.25 0 0 1 1.768 0l2.646 2.647a.75.75 0 0 1-1.06 1.06l-2.47-2.47-2.47 2.47a.75.75 0 1 1-1.06-1.06l2.646-2.647Z',
    }),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M9.116 15.177a1.25 1.25 0 0 0 1.768 0l2.646-2.647a.75.75 0 0 0-1.06-1.06l-2.47 2.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647Z',
    })
  );
};
vc.displayName = 'SortDescendingIcon';
var Bu = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M16.5 6.26a.75.75 0 0 1-1.5 0v-.51a.75.75 0 0 0-.75-.75h-8.5a.75.75 0 0 0-.75.75v.51a.75.75 0 0 1-1.5 0v-.51a2.25 2.25 0 0 1 2.25-2.25h8.5a2.25 2.25 0 0 1 2.25 2.25v.51Z',
    }),
    c.createElement('path', {
      d: 'M10.75 16.01a.75.75 0 0 1-1.5 0v-6.69l-1.72 1.72a.75.75 0 1 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0l3 3a.75.75 0 1 1-1.06 1.06l-1.72-1.72v6.69Z',
    })
  );
};
Bu.displayName = 'UploadIcon';
var e1 = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M13.03 6.97a.75.75 0 0 1 0 1.06l-1.97 1.97 1.97 1.97a.75.75 0 1 1-1.06 1.06l-1.97-1.97-1.97 1.97a.75.75 0 0 1-1.06-1.06l1.97-1.97-1.97-1.97a.75.75 0 0 1 1.06-1.06l1.97 1.97 1.97-1.97a.75.75 0 0 1 1.06 0Z',
    }),
    c.createElement('path', {
      fillRule: 'evenodd',
      d: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z',
    })
  );
};
e1.displayName = 'XCircleIcon';
var Lu = function (t) {
  return c.createElement(
    'svg',
    Object.assign({ viewBox: '0 0 20 20' }, t),
    c.createElement('path', {
      d: 'M13.97 15.03a.75.75 0 1 0 1.06-1.06l-3.97-3.97 3.97-3.97a.75.75 0 0 0-1.06-1.06l-3.97 3.97-3.97-3.97a.75.75 0 0 0-1.06 1.06l3.97 3.97-3.97 3.97a.75.75 0 1 0 1.06 1.06l3.97-3.97 3.97 3.97Z',
    })
  );
};
Lu.displayName = 'XIcon';
function Ab(e) {
  const { top: t, left: r, bottom: n, right: o } = e.getBoundingClientRect();
  return t >= 0 && o <= window.innerWidth && n <= window.innerHeight && r >= 0;
}
const yc =
    'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]',
  y0 =
    'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]:not([tabindex="-1"])',
  Nb =
    'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])',
  Ru = ({ currentTarget: e }) => e.blur();
function _b(e, t) {
  const r = [...document.querySelectorAll(yc)],
    n = r.indexOf(e) + 1,
    o = r.slice(n);
  for (const l of o) if (Ab(l) && (!t || (t && t(l)))) return l;
  return null;
}
function Mb(e, t = !0) {
  return !t && zu(e, yc) ? e : e.querySelector(yc);
}
function zo(e) {
  const t =
    'a,button,frame,iframe,input:not([type=hidden]),select,textarea,*[tabindex]';
  return zu(e, t) ? e : e.querySelector(t);
}
function x0(e, t) {
  const r = _b(e, t);
  return r && r instanceof HTMLElement ? (r.focus(), !0) : !1;
}
function Bb(e, t = !0) {
  return !t && zu(e, y0) ? e : e.querySelector(y0);
}
function Lb(e, t) {
  const r = t1(e),
    n = r1(r, t);
  n === -1 ? r[0].focus() : r[(n - 1 + r.length) % r.length].focus();
}
function Rb(e, t) {
  const r = t1(e),
    n = r1(r, t);
  n === -1 ? r[0].focus() : r[(n + 1) % r.length].focus();
}
function t1(e) {
  return e.querySelectorAll(Nb);
}
function r1(e, t) {
  let r = 0;
  for (const n of e) {
    if (n === t) break;
    r++;
  }
  return r === e.length ? -1 : r;
}
function zu(e, t) {
  if (e.matches) return e.matches(t);
  const r = (e.ownerDocument || document).querySelectorAll(t);
  let n = r.length;
  for (; --n >= 0 && r.item(n) !== e; ) return n > -1;
}
var _e = {
    Button: 'Polaris-Button',
    disabled: 'Polaris-Button--disabled',
    pressed: 'Polaris-Button--pressed',
    variantPrimary: 'Polaris-Button--variantPrimary',
    variantSecondary: 'Polaris-Button--variantSecondary',
    variantTertiary: 'Polaris-Button--variantTertiary',
    variantPlain: 'Polaris-Button--variantPlain',
    removeUnderline: 'Polaris-Button--removeUnderline',
    variantMonochromePlain: 'Polaris-Button--variantMonochromePlain',
    toneSuccess: 'Polaris-Button--toneSuccess',
    toneCritical: 'Polaris-Button--toneCritical',
    sizeMicro: 'Polaris-Button--sizeMicro',
    sizeSlim: 'Polaris-Button--sizeSlim',
    sizeMedium: 'Polaris-Button--sizeMedium',
    sizeLarge: 'Polaris-Button--sizeLarge',
    textAlignCenter: 'Polaris-Button--textAlignCenter',
    textAlignStart: 'Polaris-Button--textAlignStart',
    textAlignLeft: 'Polaris-Button--textAlignLeft',
    textAlignEnd: 'Polaris-Button--textAlignEnd',
    textAlignRight: 'Polaris-Button--textAlignRight',
    fullWidth: 'Polaris-Button--fullWidth',
    iconOnly: 'Polaris-Button--iconOnly',
    iconWithText: 'Polaris-Button--iconWithText',
    disclosure: 'Polaris-Button--disclosure',
    loading: 'Polaris-Button--loading',
    pressable: 'Polaris-Button--pressable',
    hidden: 'Polaris-Button--hidden',
    Icon: 'Polaris-Button__Icon',
    Spinner: 'Polaris-Button__Spinner',
  },
  Oo = {
    Icon: 'Polaris-Icon',
    toneInherit: 'Polaris-Icon--toneInherit',
    toneBase: 'Polaris-Icon--toneBase',
    toneSubdued: 'Polaris-Icon--toneSubdued',
    toneCaution: 'Polaris-Icon--toneCaution',
    toneWarning: 'Polaris-Icon--toneWarning',
    toneCritical: 'Polaris-Icon--toneCritical',
    toneInteractive: 'Polaris-Icon--toneInteractive',
    toneInfo: 'Polaris-Icon--toneInfo',
    toneSuccess: 'Polaris-Icon--toneSuccess',
    tonePrimary: 'Polaris-Icon--tonePrimary',
    toneEmphasis: 'Polaris-Icon--toneEmphasis',
    toneMagic: 'Polaris-Icon--toneMagic',
    toneTextCaution: 'Polaris-Icon--toneTextCaution',
    toneTextWarning: 'Polaris-Icon--toneTextWarning',
    toneTextCritical: 'Polaris-Icon--toneTextCritical',
    toneTextInfo: 'Polaris-Icon--toneTextInfo',
    toneTextPrimary: 'Polaris-Icon--toneTextPrimary',
    toneTextSuccess: 'Polaris-Icon--toneTextSuccess',
    toneTextMagic: 'Polaris-Icon--toneTextMagic',
    Svg: 'Polaris-Icon__Svg',
    Img: 'Polaris-Icon__Img',
    Placeholder: 'Polaris-Icon__Placeholder',
  },
  Nt = {
    root: 'Polaris-Text--root',
    block: 'Polaris-Text--block',
    truncate: 'Polaris-Text--truncate',
    visuallyHidden: 'Polaris-Text--visuallyHidden',
    start: 'Polaris-Text--start',
    center: 'Polaris-Text--center',
    end: 'Polaris-Text--end',
    justify: 'Polaris-Text--justify',
    base: 'Polaris-Text--base',
    inherit: 'Polaris-Text--inherit',
    disabled: 'Polaris-Text--disabled',
    success: 'Polaris-Text--success',
    critical: 'Polaris-Text--critical',
    caution: 'Polaris-Text--caution',
    subdued: 'Polaris-Text--subdued',
    magic: 'Polaris-Text--magic',
    'magic-subdued': 'Polaris-Text__magic--subdued',
    'text-inverse': 'Polaris-Text__text--inverse',
    'text-inverse-secondary': 'Polaris-Text--textInverseSecondary',
    headingXs: 'Polaris-Text--headingXs',
    headingSm: 'Polaris-Text--headingSm',
    headingMd: 'Polaris-Text--headingMd',
    headingLg: 'Polaris-Text--headingLg',
    headingXl: 'Polaris-Text--headingXl',
    heading2xl: 'Polaris-Text--heading2xl',
    heading3xl: 'Polaris-Text--heading3xl',
    bodyXs: 'Polaris-Text--bodyXs',
    bodySm: 'Polaris-Text--bodySm',
    bodyMd: 'Polaris-Text--bodyMd',
    bodyLg: 'Polaris-Text--bodyLg',
    regular: 'Polaris-Text--regular',
    medium: 'Polaris-Text--medium',
    semibold: 'Polaris-Text--semibold',
    bold: 'Polaris-Text--bold',
    break: 'Polaris-Text--break',
    numeric: 'Polaris-Text--numeric',
    'line-through': 'Polaris-Text__line--through',
  };
const X = ({
  alignment: e,
  as: t,
  breakWord: r,
  children: n,
  tone: o,
  fontWeight: l,
  id: a,
  numeric: i = !1,
  truncate: s = !1,
  variant: u,
  visuallyHidden: m = !1,
  textDecorationLine: g,
}) => {
  const p = t || (m ? 'span' : 'p'),
    v = R(
      Nt.root,
      u && Nt[u],
      l && Nt[l],
      (e || s) && Nt.block,
      e && Nt[e],
      r && Nt.break,
      o && Nt[o],
      i && Nt.numeric,
      s && Nt.truncate,
      m && Nt.visuallyHidden,
      g && Nt[g]
    );
  return c.createElement(p, Object.assign({ className: v }, a && { id: a }), n);
};
function Ee({ source: e, tone: t, accessibilityLabel: r }) {
  let n;
  typeof e == 'function'
    ? (n = 'function')
    : e === 'placeholder'
    ? (n = 'placeholder')
    : (n = 'external');
  const o = R(Oo.Icon, t && Oo[ge('tone', t)]),
    { mdDown: l } = Bl(),
    a = e,
    i = {
      function: c.createElement(
        a,
        Object.assign(
          { className: Oo.Svg, focusable: 'false', 'aria-hidden': 'true' },
          l ? { viewBox: '1 1 18 18' } : {}
        )
      ),
      placeholder: c.createElement('div', { className: Oo.Placeholder }),
      external: c.createElement('img', {
        className: Oo.Img,
        src: `data:image/svg+xml;utf8,${e}`,
        alt: '',
        'aria-hidden': 'true',
      }),
    };
  return c.createElement(
    'span',
    { className: o },
    r && c.createElement(X, { as: 'span', visuallyHidden: !0 }, r),
    i[n]
  );
}
var S0 = {
  Spinner: 'Polaris-Spinner',
  sizeSmall: 'Polaris-Spinner--sizeSmall',
  sizeLarge: 'Polaris-Spinner--sizeLarge',
};
function Ou({
  size: e = 'large',
  accessibilityLabel: t,
  hasFocusableParent: r,
}) {
  const n = Ll(),
    o = R(S0.Spinner, e && S0[ge('size', e)]),
    l =
      e === 'large'
        ? c.createElement(
            'svg',
            { viewBox: '0 0 44 44', xmlns: 'http://www.w3.org/2000/svg' },
            c.createElement('path', {
              d: 'M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z',
            })
          )
        : c.createElement(
            'svg',
            { viewBox: '0 0 20 20', xmlns: 'http://www.w3.org/2000/svg' },
            c.createElement('path', {
              d: 'M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z',
            })
          ),
    a = { ...(!r && { role: 'status' }) },
    i = (n || !r) && c.createElement(X, { as: 'span', visuallyHidden: !0 }, t);
  return c.createElement(
    c.Fragment,
    null,
    c.createElement('span', { className: o }, l),
    c.createElement('span', a, i)
  );
}
function zb(e, t) {
  const r = d.useCallback(
    (n) => {
      e && (n.preventDefault(), n.stopPropagation());
    },
    [e]
  );
  return e ? r : t;
}
function Ob() {
  return d.useContext(Hg);
}
const n1 = d.memo(
  d.forwardRef(function (t, r) {
    const n = Ob();
    if (n)
      return c.createElement(n, Object.assign({}, i0.props, t, { ref: r }));
    const { external: o, url: l, target: a, ...i } = t;
    let s;
    o ? (s = '_blank') : (s = a ?? void 0);
    const u = s === '_blank' ? 'noopener noreferrer' : void 0;
    return c.createElement(
      'a',
      Object.assign({ target: s }, i, { href: l, rel: u }, i0.props, { ref: r })
    );
  })
);
function ti({
  id: e,
  children: t,
  className: r,
  url: n,
  external: o,
  target: l,
  download: a,
  submit: i,
  disabled: s,
  loading: u,
  pressed: m,
  accessibilityLabel: g,
  role: p,
  ariaControls: v,
  ariaExpanded: y,
  ariaDescribedBy: x,
  ariaChecked: k,
  onClick: h,
  onFocus: f,
  onBlur: b,
  onKeyDown: S,
  onKeyPress: F,
  onKeyUp: w,
  onMouseEnter: P,
  onTouchStart: E,
  ...A
}) {
  let D;
  const N = { id: e, className: r, 'aria-label': g },
    B = {
      ...N,
      role: p,
      onClick: h,
      onFocus: f,
      onBlur: b,
      onMouseUp: Ru,
      onMouseEnter: P,
      onTouchStart: E,
    },
    j = zb(s, h);
  return (
    n
      ? (D = s
          ? c.createElement('a', N, t)
          : c.createElement(
              n1,
              Object.assign(
                {},
                B,
                { url: n, external: o, target: l, download: a },
                A
              ),
              t
            ))
      : (D = c.createElement(
          'button',
          Object.assign(
            {},
            B,
            {
              'aria-disabled': s,
              type: i ? 'submit' : 'button',
              'aria-busy': u ? !0 : void 0,
              'aria-controls': v,
              'aria-expanded': y,
              'aria-describedby': x,
              'aria-checked': k,
              'aria-pressed': m,
              onKeyDown: S,
              onKeyUp: w,
              onKeyPress: F,
              onClick: j,
              tabIndex: s ? -1 : void 0,
            },
            A
          ),
          t
        )),
    D
  );
}
class o1 extends Error {
  constructor(t = '') {
    super(
      `${
        t && `${t} `
      }Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.`
    ),
      (this.name = 'MissingAppProviderError');
  }
}
function Qe() {
  const e = d.useContext(Og);
  if (!e) throw new o1('No i18n was provided.');
  return e;
}
function en({
  id: e,
  children: t,
  url: r,
  disabled: n,
  external: o,
  download: l,
  target: a,
  submit: i,
  loading: s,
  pressed: u,
  accessibilityLabel: m,
  role: g,
  ariaControls: p,
  ariaExpanded: v,
  ariaDescribedBy: y,
  ariaChecked: x,
  onClick: k,
  onFocus: h,
  onBlur: f,
  onKeyDown: b,
  onKeyPress: S,
  onKeyUp: F,
  onMouseEnter: w,
  onTouchStart: P,
  onPointerDown: E,
  icon: A,
  disclosure: D,
  removeUnderline: N,
  size: B = 'medium',
  textAlign: j = 'center',
  fullWidth: Z,
  dataPrimaryLink: q,
  tone: ee,
  variant: W = 'secondary',
}) {
  const I = Qe(),
    z = n || s,
    { mdUp: $ } = Bl(),
    V = R(
      _e.Button,
      _e.pressable,
      _e[ge('variant', W)],
      _e[ge('size', B)],
      _e[ge('textAlign', j)],
      Z && _e.fullWidth,
      D && _e.disclosure,
      A && t && _e.iconWithText,
      A && t == null && _e.iconOnly,
      z && _e.disabled,
      s && _e.loading,
      u && !n && !r && _e.pressed,
      N && _e.removeUnderline,
      ee && _e[ge('tone', ee)]
    ),
    Y = D
      ? c.createElement(
          'span',
          { className: s ? _e.hidden : _e.Icon },
          c.createElement(Ee, { source: s ? 'placeholder' : jb(D, _u, Nu) })
        )
      : null,
    ce = Hb(A) ? c.createElement(Ee, { source: s ? 'placeholder' : A }) : A,
    he = ce
      ? c.createElement('span', { className: s ? _e.hidden : _e.Icon }, ce)
      : null,
    xe = ['plain', 'monochromePlain'].includes(W);
  let G = 'medium';
  xe ? (G = 'regular') : W === 'primary' && (G = $ ? 'medium' : 'semibold');
  let U = 'bodySm';
  (B === 'large' || (xe && B !== 'micro')) && (U = 'bodyMd');
  const re = t
      ? c.createElement(
          X,
          {
            as: 'span',
            variant: U,
            fontWeight: G,
            key: n ? 'text-disabled' : 'text',
          },
          t
        )
      : null,
    ie = s
      ? c.createElement(
          'span',
          { className: _e.Spinner },
          c.createElement(Ou, {
            size: 'small',
            accessibilityLabel: I.translate(
              'Polaris.Button.spinnerAccessibilityLabel'
            ),
          })
        )
      : null,
    Ce = {
      id: e,
      className: V,
      accessibilityLabel: m,
      ariaDescribedBy: y,
      role: g,
      onClick: k,
      onFocus: h,
      onBlur: f,
      onMouseUp: Ru,
      onMouseEnter: w,
      onTouchStart: P,
      'data-primary-link': q,
    },
    Fe = { url: r, external: o, download: l, target: a },
    Le = {
      submit: i,
      disabled: z,
      loading: s,
      ariaControls: p,
      ariaExpanded: v,
      ariaChecked: x,
      pressed: u,
      onKeyDown: b,
      onKeyUp: F,
      onKeyPress: S,
      onPointerDown: E,
    };
  return c.createElement(ti, Object.assign({}, Ce, Fe, Le), ie, he, re, Y);
}
function Hb(e) {
  return (
    typeof e == 'string' ||
    (typeof e == 'object' && e.body) ||
    typeof e == 'function'
  );
}
function jb(e, t, r) {
  return e === 'select' ? Mu : e === 'up' ? t : r;
}
function $b({ content: e, onAction: t, plain: r, destructive: n, ...o }, l, a) {
  const i = r ? 'plain' : void 0,
    s = n ? 'primary' : void 0,
    u = !(l != null && l.tone) && n ? 'critical' : l == null ? void 0 : l.tone;
  return c.createElement(
    en,
    Object.assign({ key: a, onClick: t, tone: u, variant: i || s }, o, l),
    e
  );
}
var Ub = { ShadowBevel: 'Polaris-ShadowBevel' };
function Wb(e) {
  const {
      as: t = 'div',
      bevel: r = !0,
      borderRadius: n,
      boxShadow: o,
      children: l,
      zIndex: a = '0',
    } = e,
    i = t;
  return c.createElement(
    i,
    {
      className: Ub.ShadowBevel,
      style: {
        '--pc-shadow-bevel-z-index': a,
        ...nl(
          'shadow-bevel',
          'content',
          as(r, (s) => (s ? '""' : 'none'))
        ),
        ...nl(
          'shadow-bevel',
          'box-shadow',
          as(r, (s) => (s ? `var(--p-shadow-${o})` : 'none'))
        ),
        ...nl(
          'shadow-bevel',
          'border-radius',
          as(r, (s) =>
            s ? `var(--p-border-radius-${n})` : 'var(--p-border-radius-0)'
          )
        ),
      },
    },
    l
  );
}
function as(e, t) {
  return typeof e == 'boolean'
    ? t(e)
    : Object.fromEntries(Object.entries(e).map(([r, n]) => [r, t(n)]));
}
var fa = {
  listReset: 'Polaris-Box--listReset',
  Box: 'Polaris-Box',
  visuallyHidden: 'Polaris-Box--visuallyHidden',
  printHidden: 'Polaris-Box--printHidden',
};
const se = d.forwardRef(
  (
    {
      as: e = 'div',
      background: t,
      borderColor: r,
      borderStyle: n,
      borderWidth: o,
      borderBlockStartWidth: l,
      borderBlockEndWidth: a,
      borderInlineStartWidth: i,
      borderInlineEndWidth: s,
      borderRadius: u,
      borderEndStartRadius: m,
      borderEndEndRadius: g,
      borderStartStartRadius: p,
      borderStartEndRadius: v,
      children: y,
      color: x,
      id: k,
      minHeight: h,
      minWidth: f,
      maxWidth: b,
      overflowX: S,
      overflowY: F,
      outlineColor: w,
      outlineStyle: P,
      outlineWidth: E,
      padding: A,
      paddingBlock: D,
      paddingBlockStart: N,
      paddingBlockEnd: B,
      paddingInline: j,
      paddingInlineStart: Z,
      paddingInlineEnd: q,
      role: ee,
      shadow: W,
      tabIndex: I,
      width: z,
      printHidden: $,
      visuallyHidden: V,
      position: Y,
      insetBlockStart: ce,
      insetBlockEnd: he,
      insetInlineStart: xe,
      insetInlineEnd: G,
      zIndex: U,
      opacity: re,
      ...ie
    },
    Ce
  ) => {
    const Fe = n || (r || o || l || a || i || s ? 'solid' : void 0),
      Le = P || (w || E ? 'solid' : void 0),
      Ie = {
        '--pc-box-color': x ? `var(--p-color-${x})` : void 0,
        '--pc-box-background': t ? `var(--p-color-${t})` : void 0,
        '--pc-box-border-color': r
          ? r === 'transparent'
            ? 'transparent'
            : `var(--p-color-${r})`
          : void 0,
        '--pc-box-border-style': Fe,
        '--pc-box-border-radius': u ? `var(--p-border-radius-${u})` : void 0,
        '--pc-box-border-end-start-radius': m
          ? `var(--p-border-radius-${m})`
          : void 0,
        '--pc-box-border-end-end-radius': g
          ? `var(--p-border-radius-${g})`
          : void 0,
        '--pc-box-border-start-start-radius': p
          ? `var(--p-border-radius-${p})`
          : void 0,
        '--pc-box-border-start-end-radius': v
          ? `var(--p-border-radius-${v})`
          : void 0,
        '--pc-box-border-width': o ? `var(--p-border-width-${o})` : void 0,
        '--pc-box-border-block-start-width': l
          ? `var(--p-border-width-${l})`
          : void 0,
        '--pc-box-border-block-end-width': a
          ? `var(--p-border-width-${a})`
          : void 0,
        '--pc-box-border-inline-start-width': i
          ? `var(--p-border-width-${i})`
          : void 0,
        '--pc-box-border-inline-end-width': s
          ? `var(--p-border-width-${s})`
          : void 0,
        '--pc-box-min-height': h,
        '--pc-box-min-width': f,
        '--pc-box-max-width': b,
        '--pc-box-outline-color': w ? `var(--p-color-${w})` : void 0,
        '--pc-box-outline-style': Le,
        '--pc-box-outline-width': E ? `var(--p-border-width-${E})` : void 0,
        '--pc-box-overflow-x': S,
        '--pc-box-overflow-y': F,
        ...Jt('box', 'padding-block-start', 'space', N || D || A),
        ...Jt('box', 'padding-block-end', 'space', B || D || A),
        ...Jt('box', 'padding-inline-start', 'space', Z || j || A),
        ...Jt('box', 'padding-inline-end', 'space', q || j || A),
        '--pc-box-shadow': W ? `var(--p-shadow-${W})` : void 0,
        '--pc-box-width': z,
        position: Y,
        '--pc-box-inset-block-start': ce ? `var(--p-space-${ce})` : void 0,
        '--pc-box-inset-block-end': he ? `var(--p-space-${he})` : void 0,
        '--pc-box-inset-inline-start': xe ? `var(--p-space-${xe})` : void 0,
        '--pc-box-inset-inline-end': G ? `var(--p-space-${G})` : void 0,
        zIndex: U,
        opacity: re,
      },
      nr = R(
        fa.Box,
        V && fa.visuallyHidden,
        $ && fa.printHidden,
        e === 'ul' && fa.listReset
      );
    return c.createElement(
      e,
      {
        className: nr,
        id: k,
        ref: Ce,
        style: Pu(Ie),
        role: ee,
        tabIndex: I,
        ...ie,
      },
      y
    );
  }
);
se.displayName = 'Box';
const xc = ({
  children: e,
  background: t = 'bg-surface',
  padding: r = { xs: '400' },
  roundedAbove: n = 'sm',
}) => {
  const o = Bl(),
    l = '300',
    a = !!o[`${n}Up`];
  return c.createElement(
    Fu.Provider,
    { value: !0 },
    c.createElement(
      Wb,
      { boxShadow: '100', borderRadius: a ? l : '0', zIndex: '32' },
      c.createElement(
        se,
        {
          background: t,
          padding: r,
          overflowX: 'clip',
          overflowY: 'clip',
          minHeight: '100%',
        },
        e
      )
    )
  );
};
var Vb = { InlineStack: 'Polaris-InlineStack' };
const jt = function ({
  as: t = 'div',
  align: r,
  direction: n = 'row',
  blockAlign: o,
  gap: l,
  wrap: a = !0,
  children: i,
}) {
  const s = {
    '--pc-inline-stack-align': r,
    '--pc-inline-stack-block-align': o,
    '--pc-inline-stack-wrap': a ? 'wrap' : 'nowrap',
    ...Jt('inline-stack', 'gap', 'space', l),
    ...nl('inline-stack', 'flex-direction', n),
  };
  return c.createElement(t, { className: Vb.InlineStack, style: s }, i);
};
var is = {
  BlockStack: 'Polaris-BlockStack',
  listReset: 'Polaris-BlockStack--listReset',
  fieldsetReset: 'Polaris-BlockStack--fieldsetReset',
};
const on = ({
    as: e = 'div',
    children: t,
    align: r,
    inlineAlign: n,
    gap: o,
    id: l,
    reverseOrder: a = !1,
    ...i
  }) => {
    const s = R(
        is.BlockStack,
        (e === 'ul' || e === 'ol') && is.listReset,
        e === 'fieldset' && is.fieldsetReset
      ),
      u = {
        '--pc-block-stack-align': r ? `${r}` : null,
        '--pc-block-stack-inline-align': n ? `${n}` : null,
        '--pc-block-stack-order': a ? 'column-reverse' : 'column',
        ...Jt('block-stack', 'gap', 'space', o),
      };
    return c.createElement(e, { className: s, id: l, style: Pu(u), ...i }, t);
  },
  Hu = d.forwardRef(
    (
      {
        alt: e,
        sourceSet: t,
        source: r,
        crossOrigin: n,
        onLoad: o,
        className: l,
        ...a
      },
      i
    ) => {
      const s = t
          ? t.map(({ source: m, descriptor: g }) => `${m} ${g}`).join(',')
          : null,
        u = d.useCallback(() => {
          o && o();
        }, [o]);
      return c.createElement(
        'img',
        Object.assign(
          { ref: i, alt: e, src: r, crossOrigin: n, className: l, onLoad: u },
          s ? { srcSet: s } : {},
          a
        )
      );
    }
  );
Hu.displayName = 'Image';
const Gb = d.createContext(!1);
var ct = {
  Item: 'Polaris-ActionList__Item',
  default: 'Polaris-ActionList--default',
  active: 'Polaris-ActionList--active',
  destructive: 'Polaris-ActionList--destructive',
  disabled: 'Polaris-ActionList--disabled',
  Prefix: 'Polaris-ActionList__Prefix',
  Suffix: 'Polaris-ActionList__Suffix',
  indented: 'Polaris-ActionList--indented',
  menu: 'Polaris-ActionList--menu',
  Text: 'Polaris-ActionList__Text',
};
const Zb = d.createContext(!1);
var Un = {
  Badge: 'Polaris-Badge',
  toneSuccess: 'Polaris-Badge--toneSuccess',
  'toneSuccess-strong': 'Polaris-Badge__toneSuccess--strong',
  toneInfo: 'Polaris-Badge--toneInfo',
  'toneInfo-strong': 'Polaris-Badge__toneInfo--strong',
  toneAttention: 'Polaris-Badge--toneAttention',
  'toneAttention-strong': 'Polaris-Badge__toneAttention--strong',
  toneWarning: 'Polaris-Badge--toneWarning',
  'toneWarning-strong': 'Polaris-Badge__toneWarning--strong',
  toneCritical: 'Polaris-Badge--toneCritical',
  'toneCritical-strong': 'Polaris-Badge__toneCritical--strong',
  toneNew: 'Polaris-Badge--toneNew',
  toneMagic: 'Polaris-Badge--toneMagic',
  'toneRead-only': 'Polaris-Badge__toneRead--only',
  toneEnabled: 'Polaris-Badge--toneEnabled',
  sizeLarge: 'Polaris-Badge--sizeLarge',
  withinFilter: 'Polaris-Badge--withinFilter',
  Icon: 'Polaris-Badge__Icon',
  PipContainer: 'Polaris-Badge__PipContainer',
};
let ut = (function (e) {
    return (
      (e.Info = 'info'),
      (e.Success = 'success'),
      (e.Warning = 'warning'),
      (e.Critical = 'critical'),
      (e.Attention = 'attention'),
      (e.New = 'new'),
      (e.Magic = 'magic'),
      (e.InfoStrong = 'info-strong'),
      (e.SuccessStrong = 'success-strong'),
      (e.WarningStrong = 'warning-strong'),
      (e.CriticalStrong = 'critical-strong'),
      (e.AttentionStrong = 'attention-strong'),
      (e.ReadOnly = 'read-only'),
      (e.Enabled = 'enabled'),
      e
    );
  })({}),
  ss = (function (e) {
    return (
      (e.Incomplete = 'incomplete'),
      (e.PartiallyComplete = 'partiallyComplete'),
      (e.Complete = 'complete'),
      e
    );
  })({});
function l1(e, t, r) {
  let n = '',
    o = '';
  if (!t && !r) return '';
  switch (t) {
    case ss.Incomplete:
      n = e.translate('Polaris.Badge.PROGRESS_LABELS.incomplete');
      break;
    case ss.PartiallyComplete:
      n = e.translate('Polaris.Badge.PROGRESS_LABELS.partiallyComplete');
      break;
    case ss.Complete:
      n = e.translate('Polaris.Badge.PROGRESS_LABELS.complete');
      break;
  }
  switch (r) {
    case ut.Info:
    case ut.InfoStrong:
      o = e.translate('Polaris.Badge.TONE_LABELS.info');
      break;
    case ut.Success:
    case ut.SuccessStrong:
      o = e.translate('Polaris.Badge.TONE_LABELS.success');
      break;
    case ut.Warning:
    case ut.WarningStrong:
      o = e.translate('Polaris.Badge.TONE_LABELS.warning');
      break;
    case ut.Critical:
    case ut.CriticalStrong:
      o = e.translate('Polaris.Badge.TONE_LABELS.critical');
      break;
    case ut.Attention:
    case ut.AttentionStrong:
      o = e.translate('Polaris.Badge.TONE_LABELS.attention');
      break;
    case ut.New:
      o = e.translate('Polaris.Badge.TONE_LABELS.new');
      break;
    case ut.ReadOnly:
      o = e.translate('Polaris.Badge.TONE_LABELS.readOnly');
      break;
    case ut.Enabled:
      o = e.translate('Polaris.Badge.TONE_LABELS.enabled');
      break;
  }
  return !r && t
    ? n
    : r && !t
    ? o
    : e.translate('Polaris.Badge.progressAndTone', {
        progressLabel: n,
        toneLabel: o,
      });
}
var cs = {
  Pip: 'Polaris-Badge-Pip',
  toneInfo: 'Polaris-Badge-Pip--toneInfo',
  toneSuccess: 'Polaris-Badge-Pip--toneSuccess',
  toneNew: 'Polaris-Badge-Pip--toneNew',
  toneAttention: 'Polaris-Badge-Pip--toneAttention',
  toneWarning: 'Polaris-Badge-Pip--toneWarning',
  toneCritical: 'Polaris-Badge-Pip--toneCritical',
  progressIncomplete: 'Polaris-Badge-Pip--progressIncomplete',
  progressPartiallyComplete: 'Polaris-Badge-Pip--progressPartiallyComplete',
  progressComplete: 'Polaris-Badge-Pip--progressComplete',
};
function Yb({
  tone: e,
  progress: t = 'complete',
  accessibilityLabelOverride: r,
}) {
  const n = Qe(),
    o = R(cs.Pip, e && cs[ge('tone', e)], t && cs[ge('progress', t)]),
    l = r || l1(n, t, e);
  return c.createElement(
    'span',
    { className: o },
    c.createElement(X, { as: 'span', visuallyHidden: !0 }, l)
  );
}
const E0 = 'medium',
  Xb = {
    complete: () =>
      c.createElement(
        'svg',
        { viewBox: '0 0 20 20' },
        c.createElement('path', {
          d: 'M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z',
        })
      ),
    partiallyComplete: () =>
      c.createElement(
        'svg',
        { viewBox: '0 0 20 20' },
        c.createElement('path', {
          fillRule: 'evenodd',
          d: 'm8.888 6.014-.017-.018-.02.02c-.253.013-.45.038-.628.086a3 3 0 0 0-2.12 2.122C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.121 2.12C8.605 14 9.07 14 10 14c.93 0 1.395 0 1.776-.102a3 3 0 0 0 2.122-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.122-2.122C11.395 6 10.93 6 10 6c-.475 0-.829 0-1.112.014ZM8.446 7.34a1.75 1.75 0 0 0-1.041.94l4.314 4.315c.443-.2.786-.576.941-1.042L8.446 7.34Zm4.304 2.536L10.124 7.25c.908.001 1.154.013 1.329.06a1.75 1.75 0 0 1 1.237 1.237c.047.175.059.42.06 1.329ZM8.547 12.69c.182.05.442.06 1.453.06h.106L7.25 9.894V10c0 1.01.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237Z',
        })
      ),
    incomplete: () =>
      c.createElement(
        'svg',
        { viewBox: '0 0 20 20' },
        c.createElement('path', {
          fillRule: 'evenodd',
          d: 'M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z',
        })
      ),
  };
function Mn({
  children: e,
  tone: t,
  progress: r,
  icon: n,
  size: o = E0,
  toneAndProgressLabelOverride: l,
}) {
  const a = Qe(),
    i = d.useContext(Zb),
    s = R(
      Un.Badge,
      t && Un[ge('tone', t)],
      o && o !== E0 && Un[ge('size', o)],
      i && Un.withinFilter
    ),
    u = l || l1(a, r, t);
  let m = !!u && c.createElement(X, { as: 'span', visuallyHidden: !0 }, u);
  return (
    r &&
      !n &&
      (m = c.createElement(
        'span',
        { className: Un.Icon },
        c.createElement(Ee, { accessibilityLabel: u, source: Xb[r] })
      )),
    c.createElement(
      'span',
      { className: s },
      m,
      n &&
        c.createElement(
          'span',
          { className: Un.Icon },
          c.createElement(Ee, { source: n })
        ),
      e &&
        c.createElement(
          X,
          {
            as: 'span',
            variant: 'bodySm',
            fontWeight: t === 'new' ? 'medium' : void 0,
          },
          e
        )
    )
  );
}
Mn.Pip = Yb;
function Sr(e) {
  const [t, r] = d.useState(e);
  return {
    value: t,
    toggle: d.useCallback(() => r((n) => !n), []),
    setTrue: d.useCallback(() => r(!0), []),
    setFalse: d.useCallback(() => r(!1), []),
  };
}
var C0 = {
  TooltipContainer: 'Polaris-Tooltip__TooltipContainer',
  HasUnderline: 'Polaris-Tooltip__HasUnderline',
};
function Qb() {
  const e = d.useContext(jg);
  if (!e)
    throw new Error(
      'No ephemeral presence manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.'
    );
  return e;
}
function qb() {
  const e = d.useContext(Iu);
  if (!e)
    throw new Error(
      'No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.'
    );
  return e;
}
function a1({ children: e, idPrefix: t = '', onPortalCreated: r = Jb }) {
  const n = qh(),
    { container: o } = qb(),
    l = d.useId(),
    a = t !== '' ? `${t}-${l}` : l;
  return (
    d.useEffect(() => {
      r();
    }, [r]),
    o
      ? Cg.createPortal(
          c.createElement(
            tb,
            { theme: eb(n) ? n : Ml, 'data-portal-id': a },
            e
          ),
          o
        )
      : null
  );
}
function Jb() {}
var _r = {
  TooltipOverlay: 'Polaris-Tooltip-TooltipOverlay',
  Tail: 'Polaris-Tooltip-TooltipOverlay__Tail',
  positionedAbove: 'Polaris-Tooltip-TooltipOverlay--positionedAbove',
  measuring: 'Polaris-Tooltip-TooltipOverlay--measuring',
  measured: 'Polaris-Tooltip-TooltipOverlay--measured',
  instant: 'Polaris-Tooltip-TooltipOverlay--instant',
  Content: 'Polaris-Tooltip-TooltipOverlay__Content',
  default: 'Polaris-Tooltip-TooltipOverlay--default',
  wide: 'Polaris-Tooltip-TooltipOverlay--wide',
};
function Kb(e, t, r, n, o, l, a, i = 0) {
  const s = e.top,
    u = s + e.height,
    m = e.top - i,
    g = o.height - e.top - e.height,
    p = t.height,
    v = r.activator + r.container,
    y = r.container,
    x = e.top - Math.max(n.top, 0),
    k = o.top + Math.min(o.height, n.top + n.height) - (e.top + e.height),
    h = x >= y,
    f = k >= y,
    b = Math.min(m, p),
    S = Math.min(g, p),
    F = Math.min(m + e.height, p),
    w = Math.min(g + e.height, p),
    P = a ? 0 : o.top,
    E = { height: b - v, top: s + P - b, positioning: 'above' },
    A = { height: S - v, top: u + P, positioning: 'below' },
    D = { height: w - v, top: s + P, positioning: 'cover' },
    N = { height: F - v, top: s + P - b + e.height + v, positioning: 'cover' };
  return l === 'above'
    ? (h || (x >= k && !f)) && (m > p || m > g)
      ? E
      : A
    : l === 'below'
    ? (f || (k >= x && !h)) && (g > p || g > m)
      ? A
      : E
    : l === 'cover'
    ? (f || (k >= x && !h)) && (g + e.height > p || g > m)
      ? D
      : N
    : h && f
    ? m > g
      ? E
      : A
    : x > y
    ? E
    : A;
}
function e5(e, t, r, n, o) {
  const l = r.width - t.width;
  if (o === 'left') return Math.min(l, Math.max(0, e.left - n.horizontal));
  if (o === 'right') {
    const a = r.width - (e.left + e.width);
    return Math.min(l, Math.max(0, a - n.horizontal));
  }
  return Math.min(l, Math.max(0, e.center.x - t.width / 2));
}
function t5(e, t) {
  const { center: r } = e;
  return r.y < t.top || r.y > t.top + t.height;
}
function r5(e, t = i1()) {
  const r = Math.max(e.top, 0),
    n = Math.max(e.left, 0),
    o = Math.min(e.top + e.height, t.height),
    l = Math.min(e.left + e.width, t.width);
  return new _n({ top: r, left: n, height: o - r, width: l - n });
}
function i1() {
  return new _n({
    top: window.scrollY,
    left: window.scrollX,
    height: window.innerHeight,
    width: document.body.clientWidth,
  });
}
var us = {
  PositionedOverlay: 'Polaris-PositionedOverlay',
  fixed: 'Polaris-PositionedOverlay--fixed',
  calculating: 'Polaris-PositionedOverlay--calculating',
  preventInteraction: 'Polaris-PositionedOverlay--preventInteraction',
};
const w0 = Symbol('unique_identifier');
function n5(e) {
  const t = d.useRef(w0);
  return t.current === w0 && (t.current = e()), t;
}
function ju(e) {
  const t = Ll(),
    r = d.useRef(!1);
  if (t && !r.current) return (r.current = !0), e();
}
const s1 = d.createContext(void 0);
var bn = {
  Scrollable: 'Polaris-Scrollable',
  hasTopShadow: 'Polaris-Scrollable--hasTopShadow',
  hasBottomShadow: 'Polaris-Scrollable--hasBottomShadow',
  horizontal: 'Polaris-Scrollable--horizontal',
  vertical: 'Polaris-Scrollable--vertical',
  scrollbarWidthThin: 'Polaris-Scrollable--scrollbarWidthThin',
  scrollbarWidthNone: 'Polaris-Scrollable--scrollbarWidthNone',
  scrollbarWidthAuto: 'Polaris-Scrollable--scrollbarWidthAuto',
  scrollbarGutterStable: 'Polaris-Scrollable--scrollbarGutterStable',
  'scrollbarGutterStableboth-edges':
    'Polaris-Scrollable__scrollbarGutterStableboth--edges',
};
function o5() {
  const e = d.useRef(null),
    t = d.useContext(s1);
  d.useEffect(() => {
    !t || !e.current || t(e.current.offsetTop);
  }, [t]);
  const r = d.useId();
  return c.createElement('a', { id: r, ref: e });
}
const k0 = 100,
  c1 = 2,
  u1 = d.forwardRef(
    (
      {
        children: e,
        className: t,
        horizontal: r = !0,
        vertical: n = !0,
        shadow: o,
        hint: l,
        focusable: a,
        scrollbarWidth: i = 'thin',
        scrollbarGutter: s,
        onScrolledToBottom: u,
        ...m
      },
      g
    ) => {
      const [p, v] = d.useState(!1),
        [y, x] = d.useState(!1),
        k = n5(() => new Lg()),
        h = d.useRef(null),
        f = d.useCallback((w, P = {}) => {
          var D;
          const E = P.behavior || 'smooth',
            A = d1() ? 'auto' : E;
          (D = h.current) == null || D.scrollTo({ top: w, behavior: A });
        }, []),
        b = d.useRef();
      d.useImperativeHandle(g || b, () => ({ scrollTo: f }));
      const S = d.useCallback(() => {
        const w = h.current;
        w &&
          requestAnimationFrame(() => {
            const { scrollTop: P, clientHeight: E, scrollHeight: A } = w,
              D = A > E,
              N = P > 0,
              B = P + E >= A - c1;
            v(N), x(!B), D && B && u && u();
          });
      }, [u]);
      ju(() => {
        S(), l && requestAnimationFrame(() => l5(h.current));
      }),
        d.useEffect(() => {
          var E;
          const w = h.current;
          if (!w) return;
          const P = tr(S, 50, { trailing: !0 });
          return (
            (E = k.current) == null || E.setContainer(w),
            w.addEventListener('scroll', S),
            globalThis.addEventListener('resize', P),
            () => {
              w.removeEventListener('scroll', S),
                globalThis.removeEventListener('resize', P);
            }
          );
        }, [k, S]);
      const F = R(
        t,
        bn.Scrollable,
        n && bn.vertical,
        r && bn.horizontal,
        o && p && bn.hasTopShadow,
        o && y && bn.hasBottomShadow,
        i && bn[ge('scrollbarWidth', i)],
        s && bn[ge('scrollbarGutter', s.replace(' ', ''))]
      );
      return c.createElement(
        s1.Provider,
        { value: f },
        c.createElement(
          Tu.Provider,
          { value: k.current },
          c.createElement(
            'div',
            Object.assign({ className: F }, xu.props, m, {
              ref: h,
              tabIndex: a ? 0 : void 0,
            }),
            e
          )
        )
      );
    }
  );
u1.displayName = 'Scrollable';
function d1() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return !1;
  }
}
function l5(e) {
  if (!e || d1()) return;
  const t = e.scrollHeight - e.clientHeight,
    r = Math.min(k0, t) - c1,
    n = () => {
      requestAnimationFrame(() => {
        e.scrollTop >= r &&
          (e.removeEventListener('scroll', n),
          e.scrollTo({ top: 0, behavior: 'smooth' }));
      });
    };
  e.addEventListener('scroll', n), e.scrollTo({ top: k0, behavior: 'smooth' });
}
const a5 = (e) => {
    const t = e.closest(xu.selector);
    return t instanceof HTMLElement ? t : document;
  },
  So = u1;
So.ScrollTo = o5;
So.forNode = a5;
const P0 = {
  childList: !0,
  subtree: !0,
  characterData: !0,
  attributeFilter: ['style'],
};
class f1 extends d.PureComponent {
  constructor(t) {
    super(t),
      (this.state = {
        measuring: !0,
        activatorRect: qt(this.props.activator),
        right: void 0,
        left: void 0,
        top: 0,
        height: 0,
        width: null,
        positioning: 'below',
        zIndex: null,
        outsideScrollableContainer: !1,
        lockPosition: !1,
        chevronOffset: 0,
      }),
      (this.overlay = null),
      (this.scrollableContainers = []),
      (this.overlayDetails = () => {
        const {
          measuring: r,
          left: n,
          right: o,
          positioning: l,
          height: a,
          activatorRect: i,
          chevronOffset: s,
        } = this.state;
        return {
          measuring: r,
          left: n,
          right: o,
          desiredHeight: a,
          positioning: l,
          activatorRect: i,
          chevronOffset: s,
        };
      }),
      (this.setOverlay = (r) => {
        this.overlay = r;
      }),
      (this.setScrollableContainers = () => {
        const r = [];
        let n = So.forNode(this.props.activator);
        if (n)
          for (r.push(n); n != null && n.parentElement; )
            (n = So.forNode(n.parentElement)), r.push(n);
        this.scrollableContainers = r;
      }),
      (this.registerScrollHandlers = () => {
        this.scrollableContainers.forEach((r) => {
          r.addEventListener('scroll', this.handleMeasurement);
        });
      }),
      (this.unregisterScrollHandlers = () => {
        this.scrollableContainers.forEach((r) => {
          r.removeEventListener('scroll', this.handleMeasurement);
        });
      }),
      (this.handleMeasurement = () => {
        const { lockPosition: r, top: n } = this.state;
        this.observer.disconnect(),
          this.setState(
            ({ left: o, top: l, right: a }) => ({
              left: o,
              right: a,
              top: l,
              height: 0,
              positioning: 'below',
              measuring: !0,
            }),
            () => {
              if (this.overlay == null || this.firstScrollableContainer == null)
                return;
              const {
                  activator: o,
                  preferredPosition: l = 'below',
                  preferredAlignment: a = 'center',
                  onScrollOut: i,
                  fullWidth: s,
                  fixed: u,
                  preferInputActivator: m = !0,
                } = this.props,
                g = (m && o.querySelector('input')) || o,
                p = qt(g),
                v = qt(this.overlay),
                y = c5(this.firstScrollableContainer)
                  ? document.body
                  : this.firstScrollableContainer,
                x = qt(y),
                k = s || l === 'cover' ? new _n({ ...v, width: p.width }) : v;
              y === document.body && (x.height = document.body.scrollHeight);
              let h = 0;
              const f = y.querySelector(`${kg.selector}`);
              f && (h = f.clientHeight);
              const b =
                  this.overlay.firstElementChild &&
                  this.overlay.firstChild instanceof HTMLElement
                    ? i5(this.overlay.firstElementChild)
                    : { activator: 0, container: 0, horizontal: 0 },
                S = i1(),
                F = s5(o),
                w = F == null ? F : F + 1,
                P = Kb(p, k, b, x, S, l, u, h),
                E = e5(p, k, S, b, a),
                A = p.center.x - E + b.horizontal * 2;
              this.setState(
                {
                  measuring: !1,
                  activatorRect: qt(o),
                  left: a !== 'right' ? E : void 0,
                  right: a === 'right' ? E : void 0,
                  top: r ? n : P.top,
                  lockPosition: !!u,
                  height: P.height || 0,
                  width: s || l === 'cover' ? k.width : null,
                  positioning: P.positioning,
                  outsideScrollableContainer: i != null && t5(p, r5(x)),
                  zIndex: w,
                  chevronOffset: A,
                },
                () => {
                  this.overlay &&
                    (this.observer.observe(this.overlay, P0),
                    this.observer.observe(o, P0));
                }
              );
            }
          );
      }),
      (this.observer = new MutationObserver(this.handleMeasurement));
  }
  componentDidMount() {
    this.setScrollableContainers(),
      this.scrollableContainers.length &&
        !this.props.fixed &&
        this.registerScrollHandlers(),
      this.handleMeasurement();
  }
  componentWillUnmount() {
    this.observer.disconnect(),
      this.scrollableContainers.length &&
        !this.props.fixed &&
        this.unregisterScrollHandlers();
  }
  componentDidUpdate() {
    const { outsideScrollableContainer: t, top: r } = this.state,
      { onScrollOut: n, active: o } = this.props;
    o && n != null && r !== 0 && t && n();
  }
  render() {
    const { left: t, right: r, top: n, zIndex: o, width: l } = this.state,
      {
        render: a,
        fixed: i,
        preventInteraction: s,
        classNames: u,
        zIndexOverride: m,
      } = this.props,
      g = {
        top: n == null || isNaN(n) ? void 0 : n,
        left: t == null || isNaN(t) ? void 0 : t,
        right: r == null || isNaN(r) ? void 0 : r,
        width: l == null || isNaN(l) ? void 0 : l,
        zIndex: m || o || void 0,
      },
      p = R(us.PositionedOverlay, i && us.fixed, s && us.preventInteraction, u);
    return c.createElement(
      'div',
      { className: p, style: g, ref: this.setOverlay },
      c.createElement(xo, { event: 'resize', handler: this.handleMeasurement }),
      a(this.overlayDetails())
    );
  }
  get firstScrollableContainer() {
    return this.scrollableContainers[0] ?? null;
  }
  forceUpdatePosition() {
    requestAnimationFrame(this.handleMeasurement);
  }
}
function i5(e) {
  const t = window.getComputedStyle(e);
  return {
    activator: parseFloat(t.marginTop || '0'),
    container: parseFloat(t.marginBottom || '0'),
    horizontal: parseFloat(t.marginLeft || '0'),
  };
}
function s5(e) {
  const t = e.closest(wg.selector) || document.body,
    r =
      t === document.body
        ? 'auto'
        : parseInt(window.getComputedStyle(t).zIndex || '0', 10);
  return r === 'auto' || isNaN(r) ? null : r;
}
function c5(e) {
  return e === document;
}
const u5 = c.createElement(
    c.Fragment,
    null,
    c.createElement('path', {
      d: 'M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z',
      fill: 'var(--p-color-tooltip-tail-up-border-experimental)',
    }),
    c.createElement('path', {
      d: 'M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z',
      fill: 'var(--p-color-bg-surface)',
    })
  ),
  d5 = c.createElement(
    c.Fragment,
    null,
    c.createElement('path', {
      d: 'm0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z',
      fill: 'var(--p-color-tooltip-tail-down-border-experimental)',
    }),
    c.createElement('path', {
      d: 'M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z',
      fill: 'var(--p-color-bg-surface)',
    })
  );
function f5({
  active: e,
  activator: t,
  preferredPosition: r = 'above',
  preventInteraction: n,
  id: o,
  children: l,
  accessibilityLabel: a,
  width: i,
  padding: s,
  borderRadius: u,
  zIndexOverride: m,
  instant: g,
}) {
  const p = Qe();
  return e
    ? c.createElement(f1, {
        active: e,
        activator: t,
        preferredPosition: r,
        preventInteraction: n,
        render: y,
        zIndexOverride: m,
      })
    : null;
  function y(x) {
    const {
        measuring: k,
        desiredHeight: h,
        positioning: f,
        chevronOffset: b,
      } = x,
      S = R(
        _r.TooltipOverlay,
        k && _r.measuring,
        !k && _r.measured,
        g && _r.instant,
        f === 'above' && _r.positionedAbove
      ),
      F = R(_r.Content, i && _r[i]),
      w = k ? void 0 : { minHeight: h },
      P = {
        '--pc-tooltip-chevron-x-pos': `${b}px`,
        '--pc-tooltip-border-radius': u
          ? `var(--p-border-radius-${u})`
          : void 0,
        '--pc-tooltip-padding':
          s && s === 'default'
            ? 'var(--p-space-100) var(--p-space-200)'
            : `var(--p-space-${s})`,
      };
    return c.createElement(
      'div',
      Object.assign({ style: P, className: S }, wg.props),
      c.createElement(
        'svg',
        { className: _r.Tail, width: '19', height: '11', fill: 'none' },
        f === 'above' ? d5 : u5
      ),
      c.createElement(
        'div',
        {
          id: o,
          role: 'tooltip',
          className: F,
          style: { ...w, ...P },
          'aria-label': a
            ? p.translate('Polaris.TooltipOverlay.accessibilityLabel', {
                label: a,
              })
            : void 0,
        },
        l
      )
    );
  }
}
const m5 = 150;
function Wr({
  children: e,
  content: t,
  dismissOnMouseOut: r,
  active: n,
  hoverDelay: o,
  preferredPosition: l = 'above',
  activatorWrapper: a = 'span',
  accessibilityLabel: i,
  width: s = 'default',
  padding: u = 'default',
  borderRadius: m,
  zIndexOverride: g,
  hasUnderline: p,
  persistOnClick: v,
  onOpen: y,
  onClose: x,
}) {
  const k = m || '200',
    h = a,
    { value: f, setTrue: b, setFalse: S } = Sr(!!n),
    { value: F, toggle: w } = Sr(!!n && !!v),
    [P, E] = d.useState(null),
    { presenceList: A, addPresence: D, removePresence: N } = Qb(),
    B = d.useId(),
    j = d.useRef(null),
    Z = d.useRef(!1),
    [q, ee] = d.useState(!n),
    W = d.useRef(null),
    I = d.useRef(null),
    z = d.useCallback(() => {
      n !== !1 && b();
    }, [n, b]);
  d.useEffect(() => {
    const Ce = (j.current ? Mb(j.current) : null) || j.current;
    Ce &&
      ((Ce.tabIndex = 0),
      Ce.setAttribute('aria-describedby', B),
      Ce.setAttribute('data-polaris-tooltip-activator', 'true'));
  }, [B, e]),
    d.useEffect(
      () => () => {
        W.current && clearTimeout(W.current),
          I.current && clearTimeout(I.current);
      },
      []
    );
  const $ = d.useCallback(() => {
      ee(!A.tooltip && !f), y == null || y(), D('tooltip');
    }, [D, A.tooltip, y, f]),
    V = d.useCallback(() => {
      x == null || x(),
        ee(!1),
        (I.current = setTimeout(() => {
          N('tooltip');
        }, m5));
    }, [N, x]),
    Y = d.useCallback(
      (ie) => {
        ie.key === 'Escape' && (V == null || V(), S(), v && w());
      },
      [S, V, v, w]
    );
  d.useEffect(() => {
    n === !1 && f && (V(), S());
  }, [n, f, V, S]);
  const ce = P
      ? c.createElement(
          a1,
          { idPrefix: 'tooltip' },
          c.createElement(
            f5,
            {
              id: B,
              preferredPosition: l,
              activator: P,
              active: f,
              accessibilityLabel: i,
              onClose: g5,
              preventInteraction: r,
              width: s,
              padding: u,
              borderRadius: k,
              zIndexOverride: g,
              instant: !q,
            },
            c.createElement(X, { as: 'span', variant: 'bodyMd' }, t)
          )
        )
      : null,
    he = R(a === 'div' && C0.TooltipContainer, p && C0.HasUnderline);
  return c.createElement(
    h,
    {
      onFocus: () => {
        $(), z();
      },
      onBlur: () => {
        V(), S(), v && w();
      },
      onMouseLeave: U,
      onMouseOver: re,
      onMouseDown: v ? w : void 0,
      ref: xe,
      onKeyUp: Y,
      className: he,
    },
    e,
    ce
  );
  function xe(ie) {
    const Ce = j;
    if (ie == null) {
      (Ce.current = null), E(null);
      return;
    }
    ie.firstElementChild instanceof HTMLElement && E(ie.firstElementChild),
      (Ce.current = ie);
  }
  function G() {
    (Z.current = !0),
      o && !A.tooltip
        ? (W.current = setTimeout(() => {
            $(), z();
          }, o))
        : ($(), z());
  }
  function U() {
    W.current && (clearTimeout(W.current), (W.current = null)),
      (Z.current = !1),
      V(),
      F || S();
  }
  function re() {
    !Z.current && G();
  }
}
function g5() {}
function m1({
  id: e,
  badge: t,
  content: r,
  accessibilityLabel: n,
  helpText: o,
  url: l,
  onAction: a,
  onMouseEnter: i,
  icon: s,
  image: u,
  prefix: m,
  suffix: g,
  disabled: p,
  external: v,
  destructive: y,
  ellipsis: x,
  truncate: k,
  active: h,
  role: f,
  variant: b = 'default',
}) {
  const S = R(
    ct.Item,
    p && ct.disabled,
    y && ct.destructive,
    h && ct.active,
    b === 'default' && ct.default,
    b === 'indented' && ct.indented,
    b === 'menu' && ct.menu
  );
  let F = null;
  m
    ? (F = c.createElement('span', { className: ct.Prefix }, m))
    : s
    ? (F = c.createElement(
        'span',
        { className: ct.Prefix },
        c.createElement(Ee, { source: s })
      ))
    : u &&
      (F = c.createElement('span', {
        role: 'presentation',
        className: ct.Prefix,
        style: { backgroundImage: `url(${u}` },
      }));
  let w = r || '';
  k && r ? (w = c.createElement(p5, null, r)) : x && (w = `${r}…`);
  const P = o
      ? c.createElement(
          c.Fragment,
          null,
          c.createElement(se, null, w),
          c.createElement(
            X,
            {
              as: 'span',
              variant: 'bodySm',
              tone: h || p ? void 0 : 'subdued',
            },
            o
          )
        )
      : c.createElement(
          X,
          {
            as: 'span',
            variant: 'bodyMd',
            fontWeight: h ? 'semibold' : 'regular',
          },
          w
        ),
    E =
      t &&
      c.createElement(
        'span',
        { className: ct.Suffix },
        c.createElement(Mn, { tone: t.tone }, t.content)
      ),
    A =
      g &&
      c.createElement(
        se,
        null,
        c.createElement('span', { className: ct.Suffix }, g)
      ),
    D = c.createElement(
      'span',
      { className: ct.Text },
      c.createElement(
        X,
        {
          as: 'span',
          variant: 'bodyMd',
          fontWeight: h ? 'semibold' : 'regular',
        },
        P
      )
    ),
    N = c.createElement(
      jt,
      { blockAlign: 'center', gap: '150', wrap: !1 },
      F,
      D,
      E,
      A
    ),
    B = c.createElement(se, { width: '100%' }, N),
    j = h ? c.createElement(So.ScrollTo, null) : null,
    Z = l
      ? c.createElement(
          n1,
          {
            id: e,
            url: p ? null : l,
            className: S,
            external: v,
            'aria-label': n,
            onClick: p ? null : a,
            role: f,
          },
          B
        )
      : c.createElement(
          'button',
          {
            id: e,
            type: 'button',
            className: S,
            disabled: p,
            'aria-label': n,
            onClick: a,
            onMouseUp: Ru,
            role: f,
            onMouseEnter: i,
          },
          B
        );
  return c.createElement(c.Fragment, null, j, Z);
}
const p5 = ({ children: e }) => {
  const t = Qh(),
    r = d.useRef(null),
    [n, o] = d.useState(!1);
  return (
    Nn(() => {
      r.current && o(r.current.scrollWidth > r.current.offsetWidth);
    }, [e]),
    n
      ? c.createElement(
          Wr,
          {
            zIndexOverride: Number(t.zIndex['z-index-11']),
            preferredPosition: 'above',
            hoverDelay: 1e3,
            content: e,
            dismissOnMouseOut: !0,
          },
          c.createElement(X, { as: 'span', truncate: !0 }, e)
        )
      : c.createElement(
          X,
          { as: 'span', truncate: !0 },
          c.createElement(se, { width: '100%', ref: r }, e)
        )
  );
};
function h5({
  section: e,
  hasMultipleSections: t,
  isFirst: r,
  actionRole: n,
  onActionAnyItem: o,
}) {
  const l = (m) => () => {
      m && m(), o && o();
    },
    a = e.items.map(({ content: m, helpText: g, onAction: p, ...v }, y) => {
      const x = c.createElement(
        m1,
        Object.assign({ content: m, helpText: g, role: n, onAction: l(p) }, v)
      );
      return c.createElement(
        se,
        {
          as: 'li',
          key: `${m}-${y}`,
          role: n === 'menuitem' ? 'presentation' : void 0,
        },
        c.createElement(jt, { wrap: !1 }, x)
      );
    });
  let i = null;
  e.title &&
    (i =
      typeof e.title == 'string'
        ? c.createElement(
            se,
            {
              paddingBlockStart: '300',
              paddingBlockEnd: '100',
              paddingInlineStart: '300',
              paddingInlineEnd: '300',
            },
            c.createElement(X, { as: 'p', variant: 'headingSm' }, e.title)
          )
        : c.createElement(
            se,
            { padding: '200', paddingInlineEnd: '150' },
            e.title
          ));
  let s;
  switch (n) {
    case 'option':
      s = 'presentation';
      break;
    case 'menuitem':
      s = t ? 'presentation' : 'menu';
      break;
    default:
      s = void 0;
      break;
  }
  const u = c.createElement(
    c.Fragment,
    null,
    i,
    c.createElement(
      se,
      Object.assign(
        { as: 'div', padding: '150' },
        t && { paddingBlockStart: '0' },
        { tabIndex: t ? void 0 : -1 }
      ),
      c.createElement(
        on,
        Object.assign({ gap: '050', as: 'ul' }, s && { role: s }),
        a
      )
    )
  );
  return t
    ? c.createElement(
        se,
        Object.assign(
          { as: 'li', role: 'presentation', borderColor: 'border-secondary' },
          !r && { borderBlockStartWidth: '025' },
          !e.title && { paddingBlockStart: '150' }
        ),
        u
      )
    : u;
}
function Fl({
  keyCode: e,
  handler: t,
  keyEvent: r = 'keyup',
  options: n,
  useCapture: o,
}) {
  const l = d.useRef({ handler: t, keyCode: e });
  Nn(() => {
    l.current = { handler: t, keyCode: e };
  }, [t, e]);
  const a = d.useCallback((i) => {
    const { handler: s, keyCode: u } = l.current;
    i.keyCode === u && s(i);
  }, []);
  return (
    d.useEffect(
      () => (
        document.addEventListener(r, a, o || n),
        () => {
          document.removeEventListener(r, a, o || n);
        }
      ),
      [r, a, o, n]
    ),
    null
  );
}
var J = {
    TextField: 'Polaris-TextField',
    ClearButton: 'Polaris-TextField__ClearButton',
    Loading: 'Polaris-TextField__Loading',
    disabled: 'Polaris-TextField--disabled',
    error: 'Polaris-TextField--error',
    readOnly: 'Polaris-TextField--readOnly',
    Input: 'Polaris-TextField__Input',
    Backdrop: 'Polaris-TextField__Backdrop',
    multiline: 'Polaris-TextField--multiline',
    hasValue: 'Polaris-TextField--hasValue',
    focus: 'Polaris-TextField--focus',
    VerticalContent: 'Polaris-TextField__VerticalContent',
    InputAndSuffixWrapper: 'Polaris-TextField__InputAndSuffixWrapper',
    toneMagic: 'Polaris-TextField--toneMagic',
    Prefix: 'Polaris-TextField__Prefix',
    Suffix: 'Polaris-TextField__Suffix',
    AutoSizeWrapper: 'Polaris-TextField__AutoSizeWrapper',
    AutoSizeWrapperWithSuffix: 'Polaris-TextField__AutoSizeWrapperWithSuffix',
    suggestion: 'Polaris-TextField--suggestion',
    borderless: 'Polaris-TextField--borderless',
    slim: 'Polaris-TextField--slim',
    'Input-hasClearButton': 'Polaris-TextField__Input--hasClearButton',
    'Input-suffixed': 'Polaris-TextField__Input--suffixed',
    'Input-alignRight': 'Polaris-TextField__Input--alignRight',
    'Input-alignLeft': 'Polaris-TextField__Input--alignLeft',
    'Input-alignCenter': 'Polaris-TextField__Input--alignCenter',
    'Input-autoSize': 'Polaris-TextField__Input--autoSize',
    PrefixIcon: 'Polaris-TextField__PrefixIcon',
    CharacterCount: 'Polaris-TextField__CharacterCount',
    AlignFieldBottom: 'Polaris-TextField__AlignFieldBottom',
    Spinner: 'Polaris-TextField__Spinner',
    SpinnerIcon: 'Polaris-TextField__SpinnerIcon',
    Resizer: 'Polaris-TextField__Resizer',
    DummyInput: 'Polaris-TextField__DummyInput',
    Segment: 'Polaris-TextField__Segment',
    monospaced: 'Polaris-TextField--monospaced',
  },
  vn = {
    hidden: 'Polaris-Labelled--hidden',
    LabelWrapper: 'Polaris-Labelled__LabelWrapper',
    disabled: 'Polaris-Labelled--disabled',
    HelpText: 'Polaris-Labelled__HelpText',
    readOnly: 'Polaris-Labelled--readOnly',
    Error: 'Polaris-Labelled__Error',
    Action: 'Polaris-Labelled__Action',
  },
  F0 = {
    InlineError: 'Polaris-InlineError',
    Icon: 'Polaris-InlineError__Icon',
  };
function g1({ message: e, fieldID: t }) {
  return e
    ? c.createElement(
        'div',
        { id: p1(t), className: F0.InlineError },
        c.createElement(
          'div',
          { className: F0.Icon },
          c.createElement(Ee, { source: Au })
        ),
        c.createElement(X, { as: 'span', variant: 'bodyMd' }, e)
      )
    : null;
}
function p1(e) {
  return `${e}Error`;
}
var ma = {
  Label: 'Polaris-Label',
  hidden: 'Polaris-Label--hidden',
  Text: 'Polaris-Label__Text',
  RequiredIndicator: 'Polaris-Label__RequiredIndicator',
};
function h1(e) {
  return `${e}Label`;
}
function b5({ children: e, id: t, hidden: r, requiredIndicator: n }) {
  const o = R(ma.Label, r && ma.hidden);
  return c.createElement(
    'div',
    { className: o },
    c.createElement(
      'label',
      {
        id: h1(t),
        htmlFor: t,
        className: R(ma.Text, n && ma.RequiredIndicator),
      },
      c.createElement(X, { as: 'span', variant: 'bodyMd' }, e)
    )
  );
}
function $u({
  id: e,
  label: t,
  error: r,
  action: n,
  helpText: o,
  children: l,
  labelHidden: a,
  requiredIndicator: i,
  disabled: s,
  readOnly: u,
  ...m
}) {
  const g = R(a && vn.hidden, s && vn.disabled, u && vn.readOnly),
    p = n
      ? c.createElement(
          'div',
          { className: vn.Action },
          $b(n, { variant: 'plain' })
        )
      : null,
    v = o
      ? c.createElement(
          'div',
          { className: vn.HelpText, id: Uu(e), 'aria-disabled': s },
          c.createElement(
            X,
            { as: 'span', tone: 'subdued', variant: 'bodyMd', breakWord: !0 },
            o
          )
        )
      : null,
    y =
      r &&
      typeof r != 'boolean' &&
      c.createElement(
        'div',
        { className: vn.Error },
        c.createElement(g1, { message: r, fieldID: e })
      ),
    x = t
      ? c.createElement(
          'div',
          { className: vn.LabelWrapper },
          c.createElement(
            b5,
            Object.assign({ id: e, requiredIndicator: i }, m, { hidden: !1 }),
            t
          ),
          p
        )
      : null;
  return c.createElement('div', { className: g }, x, l, y, v);
}
function Uu(e) {
  return `${e}HelpText`;
}
var Vo = {
  Connected: 'Polaris-Connected',
  Item: 'Polaris-Connected__Item',
  'Item-primary': 'Polaris-Connected__Item--primary',
  'Item-focused': 'Polaris-Connected__Item--focused',
};
function ds({ children: e, position: t }) {
  const { value: r, setTrue: n, setFalse: o } = Sr(!1),
    l = R(
      Vo.Item,
      r && Vo['Item-focused'],
      t === 'primary' ? Vo['Item-primary'] : Vo['Item-connection']
    );
  return c.createElement('div', { onBlur: o, onFocus: n, className: l }, e);
}
function v5({ children: e, left: t, right: r }) {
  const n = t ? c.createElement(ds, { position: 'left' }, t) : null,
    o = r ? c.createElement(ds, { position: 'right' }, r) : null;
  return c.createElement(
    'div',
    { className: Vo.Connected },
    n,
    c.createElement(ds, { position: 'primary' }, e),
    o
  );
}
const y5 = c.forwardRef(function (
  { onChange: t, onClick: r, onMouseDown: n, onMouseUp: o, onBlur: l },
  a
) {
  function i(u) {
    return () => t(u);
  }
  function s(u) {
    return (m) => {
      m.button === 0 && (n == null || n(u));
    };
  }
  return c.createElement(
    'div',
    { className: J.Spinner, onClick: r, 'aria-hidden': !0, ref: a },
    c.createElement(
      'div',
      {
        role: 'button',
        className: J.Segment,
        tabIndex: -1,
        onClick: i(1),
        onMouseDown: s(i(1)),
        onMouseUp: o,
        onBlur: l,
      },
      c.createElement(
        'div',
        { className: J.SpinnerIcon },
        c.createElement(Ee, { source: _u })
      )
    ),
    c.createElement(
      'div',
      {
        role: 'button',
        className: J.Segment,
        tabIndex: -1,
        onClick: i(-1),
        onMouseDown: s(i(-1)),
        onMouseUp: o,
        onBlur: l,
      },
      c.createElement(
        'div',
        { className: J.SpinnerIcon },
        c.createElement(Ee, { source: Nu })
      )
    )
  );
});
function x5({
  contents: e,
  currentHeight: t = null,
  minimumLines: r,
  onHeightChange: n,
}) {
  const o = d.useRef(null),
    l = d.useRef(null),
    a = d.useRef(),
    i = d.useRef(t);
  t !== i.current && (i.current = t),
    d.useEffect(
      () => () => {
        a.current && cancelAnimationFrame(a.current);
      },
      []
    );
  const s = r
      ? c.createElement('div', {
          ref: l,
          className: J.DummyInput,
          dangerouslySetInnerHTML: { __html: C5(r) },
        })
      : null,
    u = d.useCallback(() => {
      a.current && cancelAnimationFrame(a.current),
        (a.current = requestAnimationFrame(() => {
          if (!o.current || !l.current) return;
          const m = Math.max(o.current.offsetHeight, l.current.offsetHeight);
          m !== i.current && n(m);
        }));
    }, [n]);
  return (
    Nn(() => {
      u();
    }),
    c.createElement(
      'div',
      { 'aria-hidden': !0, className: J.Resizer },
      c.createElement(xo, { event: 'resize', handler: u }),
      c.createElement('div', {
        ref: o,
        className: J.DummyInput,
        dangerouslySetInnerHTML: { __html: w5(e) },
      }),
      s
    )
  );
}
const b1 = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\n': '<br>', '\r': '' },
  S5 = new RegExp(`[${Object.keys(b1).join()}]`, 'g');
function E5(e) {
  return b1[e];
}
function C5(e) {
  let t = '';
  for (let r = 0; r < e; r++) t += '<br>';
  return t;
}
function w5(e) {
  return e ? `${e.replace(S5, E5)}<br>` : '<br>';
}
function k5({
  prefix: e,
  suffix: t,
  verticalContent: r,
  placeholder: n,
  value: o = '',
  helpText: l,
  label: a,
  labelAction: i,
  labelHidden: s,
  disabled: u,
  clearButton: m,
  readOnly: g,
  autoFocus: p,
  focused: v,
  multiline: y,
  error: x,
  connectedRight: k,
  connectedLeft: h,
  type: f = 'text',
  name: b,
  id: S,
  role: F,
  step: w,
  largeStep: P,
  autoComplete: E,
  max: A,
  maxLength: D,
  maxHeight: N,
  min: B,
  minLength: j,
  pattern: Z,
  inputMode: q,
  spellCheck: ee,
  ariaOwns: W,
  ariaControls: I,
  ariaExpanded: z,
  ariaActiveDescendant: $,
  ariaAutocomplete: V,
  showCharacterCount: Y,
  align: ce,
  requiredIndicator: he,
  monospaced: xe,
  selectTextOnFocus: G,
  suggestion: U,
  variant: re = 'inherit',
  size: ie = 'medium',
  onClearButtonClick: Ce,
  onChange: Fe,
  onSpinnerChange: Le,
  onFocus: Ie,
  onBlur: nr,
  tone: or,
  autoSize: Tt,
  loading: un,
}) {
  const lr = Qe(),
    [kr, Pr] = d.useState(null),
    [ar, dn] = d.useState(!!v),
    Fr = Ll(),
    ir = d.useId(),
    ae = S ?? ir,
    sr = d.useRef(null),
    qe = d.useRef(null),
    $t = d.useRef(null),
    yt = d.useRef(null),
    ne = d.useRef(null),
    ue = d.useRef(null),
    Ae = d.useRef(null),
    rt = d.useRef(),
    Ut = d.useRef(null),
    Dr = d.useCallback(() => (y ? $t.current : qe.current), [y]);
  d.useEffect(() => {
    const O = Dr();
    !O || v === void 0 || (v ? O.focus() : O.blur());
  }, [v, r, Dr]),
    d.useEffect(() => {
      const O = qe.current;
      !O ||
        !(
          f === 'text' ||
          f === 'tel' ||
          f === 'search' ||
          f === 'url' ||
          f === 'password'
        ) ||
        !U ||
        O.setSelectionRange(o.length, U.length);
    }, [ar, o, f, U]);
  const fn = U || o,
    Rl = w ?? 1,
    zl = A ?? 1 / 0,
    Ol = B ?? -1 / 0,
    Si = R(
      J.TextField,
      !!fn && J.hasValue,
      u && J.disabled,
      g && J.readOnly,
      x && J.error,
      or && J[ge('tone', or)],
      y && J.multiline,
      ar && !u && J.focus,
      re !== 'inherit' && J[re],
      ie === 'slim' && J.slim
    ),
    Ei = f === 'currency' ? 'text' : f,
    Tr = f === 'number' || f === 'integer',
    Ci = c.isValidElement(e) && e.type === Ee,
    Po = e
      ? c.createElement(
          'div',
          {
            className: R(J.Prefix, Ci && J.PrefixIcon),
            id: `${ae}-Prefix`,
            ref: yt,
          },
          c.createElement(X, { as: 'span', variant: 'bodyMd' }, e)
        )
      : null,
    Hl = t
      ? c.createElement(
          'div',
          { className: J.Suffix, id: `${ae}-Suffix`, ref: ne },
          c.createElement(X, { as: 'span', variant: 'bodyMd' }, t)
        )
      : null,
    wi = un
      ? c.createElement(
          'div',
          { className: J.Loading, id: `${ae}-Loading`, ref: ue },
          c.createElement(Ou, { size: 'small' })
        )
      : null;
  let jl = null;
  if (Y) {
    const O = fn.length,
      Q = D
        ? lr.translate('Polaris.TextField.characterCountWithMaxLength', {
            count: O,
            limit: D,
          })
        : lr.translate('Polaris.TextField.characterCount', { count: O }),
      Ne = R(J.CharacterCount, y && J.AlignFieldBottom),
      je = D ? `${O}/${D}` : O;
    jl = c.createElement(
      'div',
      {
        id: `${ae}-CharacterCounter`,
        className: Ne,
        'aria-label': Q,
        'aria-live': ar ? 'polite' : 'off',
        'aria-atomic': 'true',
        onClick: De,
      },
      c.createElement(X, { as: 'span', variant: 'bodyMd' }, je)
    );
  }
  const ki =
      m && fn !== ''
        ? c.createElement(
            'button',
            {
              type: 'button',
              className: J.ClearButton,
              onClick: xt,
              disabled: u,
            },
            c.createElement(
              X,
              { as: 'span', visuallyHidden: !0 },
              lr.translate('Polaris.Common.clear')
            ),
            c.createElement(Ee, { source: e1, tone: 'base' })
          )
        : null,
    mn = d.useCallback(
      (O, Q = Rl) => {
        if (Fe == null && Le == null) return;
        const Ne = (X1) => (X1.toString().split('.')[1] || []).length,
          je = o ? parseFloat(o) : 0;
        if (isNaN(je)) return;
        const st = f === 'integer' ? 0 : Math.max(Ne(je), Ne(Q)),
          Do = Math.min(Number(zl), Math.max(je + O * Q, Number(Ol)));
        Le != null
          ? Le(String(Do.toFixed(st)), ae)
          : Fe != null && Fe(String(Do.toFixed(st)), ae);
      },
      [ae, zl, Ol, Fe, Le, Rl, f, o]
    ),
    Fo = d.useCallback(() => {
      clearTimeout(rt.current);
    }, []),
    Pi = d.useCallback(
      (O) => {
        let je = 200;
        const st = () => {
          je > 50 && (je -= 10), O(0), (rt.current = window.setTimeout(st, je));
        };
        (rt.current = window.setTimeout(st, je)),
          document.addEventListener('mouseup', Fo, { once: !0 });
      },
      [Fo]
    ),
    Fi =
      Tr && w !== 0 && !u && !g
        ? c.createElement(y5, {
            onClick: De,
            onChange: mn,
            onMouseDown: Pi,
            onMouseUp: Fo,
            ref: Ut,
            onBlur: St,
          })
        : null,
    $l = y && kr ? { height: kr, maxHeight: N } : null,
    Di = d.useCallback((O) => {
      Pr(O);
    }, []),
    Ti =
      y && Fr
        ? c.createElement(x5, {
            contents: fn || n,
            currentHeight: kr,
            minimumLines: typeof y == 'number' ? y : 1,
            onHeightChange: Di,
          })
        : null,
    gn = [];
  x && gn.push(`${ae}Error`),
    l && gn.push(Uu(ae)),
    Y && gn.push(`${ae}-CharacterCounter`);
  const pn = [];
  e && pn.push(`${ae}-Prefix`),
    t && pn.push(`${ae}-Suffix`),
    r && pn.push(`${ae}-VerticalContent`),
    pn.unshift(h1(ae));
  const Ul = R(
      J.Input,
      ce && J[ge('Input-align', ce)],
      t && J['Input-suffixed'],
      m && J['Input-hasClearButton'],
      xe && J.monospaced,
      U && J.suggestion,
      Tt && J['Input-autoSize']
    ),
    Wl = (O) => {
      if ((dn(!0), G && !U)) {
        const Q = Dr();
        Q == null || Q.select();
      }
      Ie && Ie(O);
    };
  Or('wheel', Ii, qe);
  function Ii(O) {
    document.activeElement === O.target && Tr && O.stopPropagation();
  }
  const Vl = d.createElement(y ? 'textarea' : 'input', {
      name: b,
      id: ae,
      disabled: u,
      readOnly: g,
      role: F,
      autoFocus: p,
      value: fn,
      placeholder: n,
      style: $l,
      autoComplete: E,
      className: Ul,
      ref: y ? $t : qe,
      min: B,
      max: A,
      step: w,
      minLength: j,
      maxLength: D,
      spellCheck: ee,
      pattern: Z,
      inputMode: q,
      type: Ei,
      rows: P5(y),
      size: Tt ? 1 : void 0,
      'aria-describedby': gn.length ? gn.join(' ') : void 0,
      'aria-labelledby': pn.join(' '),
      'aria-invalid': !!x,
      'aria-owns': W,
      'aria-activedescendant': $,
      'aria-autocomplete': V,
      'aria-controls': I,
      'aria-expanded': z,
      'aria-required': he,
      ...F5(y),
      onFocus: Wl,
      onBlur: St,
      onClick: De,
      onKeyPress: It,
      onKeyDown: Ir,
      onChange: U ? void 0 : te,
      onInput: U ? te : void 0,
      'data-1p-ignore': E === 'off' || void 0,
      'data-lpignore': E === 'off' || void 0,
      'data-form-type': E === 'off' ? 'other' : void 0,
    }),
    Ai = r
      ? c.createElement(
          'div',
          {
            className: J.VerticalContent,
            id: `${ae}-VerticalContent`,
            ref: Ae,
            onClick: De,
          },
          r,
          Vl
        )
      : null,
    Gl = r ? Ai : Vl,
    Ni = c.createElement('div', {
      className: R(
        J.Backdrop,
        h && J['Backdrop-connectedLeft'],
        k && J['Backdrop-connectedRight']
      ),
    }),
    L = Tt
      ? c.createElement(
          'div',
          { className: J.InputAndSuffixWrapper },
          c.createElement(
            'div',
            {
              className: R(J.AutoSizeWrapper, t && J.AutoSizeWrapperWithSuffix),
              'data-auto-size-value': o || n,
            },
            Gl
          ),
          Hl
        )
      : c.createElement(c.Fragment, null, Gl, Hl);
  return c.createElement(
    $u,
    {
      label: a,
      id: ae,
      error: x,
      action: i,
      labelHidden: s,
      helpText: l,
      requiredIndicator: he,
      disabled: u,
      readOnly: g,
    },
    c.createElement(
      v5,
      { left: h, right: k },
      c.createElement(
        'div',
        { className: Si, onClick: Re, ref: sr },
        Po,
        L,
        jl,
        wi,
        ki,
        Fi,
        Ni,
        Ti
      )
    )
  );
  function te(O) {
    Fe && Fe(O.currentTarget.value, ae);
  }
  function Re(O) {
    var je, st, Do;
    const { target: Q } = O,
      Ne =
        (je = qe == null ? void 0 : qe.current) == null
          ? void 0
          : je.getAttribute('role');
    if (Q === qe.current && Ne === 'combobox') {
      (st = qe.current) == null || st.focus(), Wl(O);
      return;
    }
    On(Q) ||
      hn(Q) ||
      Ar(Q) ||
      Hn(Q) ||
      Wt(Q) ||
      ar ||
      (Do = Dr()) == null ||
      Do.focus();
  }
  function De(O) {
    var Q;
    !Hn(O.target) && !Ar(O.target) && O.stopPropagation(),
      !(On(O.target) || hn(O.target) || Ar(O.target) || Wt(O.target) || ar) &&
        (dn(!0), (Q = Dr()) == null || Q.focus());
  }
  function xt() {
    Ce && Ce(ae);
  }
  function It(O) {
    const { key: Q, which: Ne } = O,
      je = /[\d.,eE+-]$/,
      st = /[\deE+-]$/;
    !Tr ||
      Ne === Xt.Enter ||
      (f === 'number' && je.test(Q)) ||
      (f === 'integer' && st.test(Q)) ||
      O.preventDefault();
  }
  function Ir(O) {
    if (!Tr) return;
    const { key: Q, which: Ne } = O;
    f === 'integer' &&
      (Q === 'ArrowUp' || Ne === Xt.UpArrow) &&
      (mn(1), O.preventDefault()),
      f === 'integer' &&
        (Q === 'ArrowDown' || Ne === Xt.DownArrow) &&
        (mn(-1), O.preventDefault()),
      (Ne === Xt.Home || Q === 'Home') &&
        B !== void 0 &&
        (Le != null ? Le(String(B), ae) : Fe != null && Fe(String(B), ae)),
      (Ne === Xt.End || Q === 'End') &&
        A !== void 0 &&
        (Le != null ? Le(String(A), ae) : Fe != null && Fe(String(A), ae)),
      (Ne === Xt.PageUp || Q === 'PageUp') && P !== void 0 && mn(1, P),
      (Ne === Xt.PageDown || Q === 'PageDown') && P !== void 0 && mn(-1, P);
  }
  function St(O) {
    var Q;
    dn(!1),
      !(
        (Q = sr.current) != null &&
        Q.contains(O == null ? void 0 : O.relatedTarget)
      ) &&
        nr &&
        nr(O);
  }
  function Ar(O) {
    const Q = Dr();
    return (
      O instanceof HTMLElement &&
      Q &&
      (Q.contains(O) || Q.contains(document.activeElement))
    );
  }
  function On(O) {
    return (
      O instanceof Element &&
      ((yt.current && yt.current.contains(O)) ||
        (ne.current && ne.current.contains(O)))
    );
  }
  function Hn(O) {
    return O instanceof Element && Ut.current && Ut.current.contains(O);
  }
  function Wt(O) {
    return O instanceof Element && ue.current && ue.current.contains(O);
  }
  function hn(O) {
    return (
      O instanceof Element &&
      Ae.current &&
      (Ae.current.contains(O) || Ae.current.contains(document.activeElement))
    );
  }
}
function P5(e) {
  if (e) return typeof e == 'number' ? e : 1;
}
function F5(e) {
  if (e)
    return e || (typeof e == 'number' && e > 0)
      ? { 'aria-multiline': !0 }
      : void 0;
}
const D5 = 8;
function Wu({
  items: e,
  sections: t = [],
  actionRole: r,
  allowFiltering: n,
  onActionAnyItem: o,
  filterLabel: l,
}) {
  const a = Qe(),
    i = d.useContext(Gb);
  let s = [];
  const u = d.useRef(null),
    [m, g] = d.useState('');
  e ? (s = [{ items: e }, ...t]) : t && (s = t);
  const p =
      s == null
        ? void 0
        : s.some((E) => E.items.some((A) => typeof A.content == 'string')),
    v = s.length > 1,
    y = v && r === 'menuitem' ? 'menu' : void 0,
    x = v && r === 'menuitem' ? -1 : void 0,
    k =
      s == null
        ? void 0
        : s.map((E) => ({
            ...E,
            items: E.items.filter(({ content: A }) =>
              typeof A == 'string'
                ? A == null
                  ? void 0
                  : A.toLowerCase().includes(m.toLowerCase())
                : A
            ),
          })),
    h = k.map((E, A) =>
      E.items.length > 0
        ? c.createElement(h5, {
            key: typeof E.title == 'string' ? E.title : A,
            section: E,
            hasMultipleSections: v,
            actionRole: r,
            onActionAnyItem: o,
            isFirst: A === 0,
          })
        : null
    ),
    f = (E) => {
      E.preventDefault(),
        u.current &&
          E.target &&
          u.current.contains(E.target) &&
          Lb(u.current, E.target);
    },
    b = (E) => {
      E.preventDefault(),
        u.current &&
          E.target &&
          u.current.contains(E.target) &&
          Rb(u.current, E.target);
    },
    S =
      r === 'menuitem'
        ? c.createElement(
            c.Fragment,
            null,
            c.createElement(Fl, {
              keyEvent: 'keydown',
              keyCode: Xt.DownArrow,
              handler: b,
            }),
            c.createElement(Fl, {
              keyEvent: 'keydown',
              keyCode: Xt.UpArrow,
              handler: f,
            })
          )
        : null,
    F = d.useMemo(
      () =>
        (k == null ? void 0 : k.reduce((A, D) => A + D.items.length, 0)) || 0,
      [k]
    ),
    P =
      ((s == null ? void 0 : s.reduce((E, A) => E + A.items.length, 0)) || 0) >=
      D5;
  return c.createElement(
    c.Fragment,
    null,
    (n || i) &&
      P &&
      p &&
      c.createElement(
        se,
        { padding: '200', paddingBlockEnd: F > 0 ? '0' : '200' },
        c.createElement(k5, {
          clearButton: !0,
          labelHidden: !0,
          label: l || a.translate('Polaris.ActionList.SearchField.placeholder'),
          placeholder:
            l || a.translate('Polaris.ActionList.SearchField.placeholder'),
          autoComplete: 'off',
          value: m,
          onChange: (E) => g(E),
          prefix: c.createElement(Ee, { source: Kg }),
          onClearButtonClick: () => g(''),
        })
      ),
    c.createElement(
      se,
      { as: v ? 'ul' : 'div', ref: u, role: y, tabIndex: x },
      S,
      h
    )
  );
}
Wu.Item = m1;
function T5(
  e,
  { id: t, active: r = !1, ariaHaspopup: n, activatorDisabled: o = !1 }
) {
  o || (e.tabIndex = e.tabIndex || 0),
    e.setAttribute('aria-controls', t),
    e.setAttribute('aria-owns', t),
    e.setAttribute('aria-expanded', String(r)),
    e.setAttribute('data-state', r ? 'open' : 'closed'),
    n != null && e.setAttribute('aria-haspopup', String(n));
}
function Vu(e, t, r) {
  return e == null ? null : v1(e, t) ? e : c.createElement(t, r, e);
}
const I5 = (e, t) => e === t;
function v1(e, t) {
  var a;
  if (e == null || !d.isValidElement(e) || typeof e.type == 'string') return !1;
  const { type: r } = e,
    o = ((a = e.props) == null ? void 0 : a.__type__) || r;
  return (Array.isArray(t) ? t : [t]).some(
    (i) => typeof o != 'string' && I5(i, o)
  );
}
function y1(e, t = () => !0) {
  return d.Children.toArray(e).filter((r) => d.isValidElement(r) && t(r));
}
var we = {
  Popover: 'Polaris-Popover',
  PopoverOverlay: 'Polaris-Popover__PopoverOverlay',
  'PopoverOverlay-noAnimation': 'Polaris-Popover__PopoverOverlay--noAnimation',
  'PopoverOverlay-entering': 'Polaris-Popover__PopoverOverlay--entering',
  'PopoverOverlay-open': 'Polaris-Popover__PopoverOverlay--open',
  measuring: 'Polaris-Popover--measuring',
  'PopoverOverlay-exiting': 'Polaris-Popover__PopoverOverlay--exiting',
  fullWidth: 'Polaris-Popover--fullWidth',
  Content: 'Polaris-Popover__Content',
  positionedAbove: 'Polaris-Popover--positionedAbove',
  positionedCover: 'Polaris-Popover--positionedCover',
  ContentContainer: 'Polaris-Popover__ContentContainer',
  'Content-fullHeight': 'Polaris-Popover__Content--fullHeight',
  'Content-fluidContent': 'Polaris-Popover__Content--fluidContent',
  Pane: 'Polaris-Popover__Pane',
  'Pane-fixed': 'Polaris-Popover__Pane--fixed',
  'Pane-subdued': 'Polaris-Popover__Pane--subdued',
  'Pane-captureOverscroll': 'Polaris-Popover__Pane--captureOverscroll',
  Section: 'Polaris-Popover__Section',
  FocusTracker: 'Polaris-Popover__FocusTracker',
  'PopoverOverlay-hideOnPrint': 'Polaris-Popover__PopoverOverlay--hideOnPrint',
};
function x1({ children: e }) {
  return c.createElement(
    'div',
    { className: we.Section },
    c.createElement(
      se,
      {
        paddingInlineStart: '300',
        paddingInlineEnd: '300',
        paddingBlockStart: '200',
        paddingBlockEnd: '150',
      },
      e
    )
  );
}
function Sc({
  captureOverscroll: e = !1,
  fixed: t,
  sectioned: r,
  children: n,
  height: o,
  maxHeight: l,
  minHeight: a,
  subdued: i,
  onScrolledToBottom: s,
}) {
  const u = R(
      we.Pane,
      t && we['Pane-fixed'],
      i && we['Pane-subdued'],
      e && we['Pane-captureOverscroll']
    ),
    m = r ? Vu(n, x1, {}) : n,
    g = { height: o, maxHeight: l, minHeight: a };
  return t
    ? c.createElement('div', { style: g, className: u }, m)
    : c.createElement(
        So,
        {
          shadow: !0,
          className: u,
          style: g,
          onScrolledToBottom: s,
          scrollbarWidth: 'thin',
        },
        m
      );
}
let mr = (function (e) {
  return (
    (e[(e.Click = 0)] = 'Click'),
    (e[(e.EscapeKeypress = 1)] = 'EscapeKeypress'),
    (e[(e.FocusOut = 2)] = 'FocusOut'),
    (e[(e.ScrollOut = 3)] = 'ScrollOut'),
    e
  );
})({});
var Et = (function (e) {
  return (
    (e.Entering = 'entering'),
    (e.Entered = 'entered'),
    (e.Exiting = 'exiting'),
    (e.Exited = 'exited'),
    e
  );
})(Et || {});
class S1 extends d.PureComponent {
  constructor(t) {
    super(t),
      (this.state = {
        transitionStatus: this.props.active ? Et.Entering : Et.Exited,
      }),
      (this.contentNode = d.createRef()),
      (this.renderPopover = (r) => {
        const { measuring: n, desiredHeight: o, positioning: l } = r,
          {
            id: a,
            children: i,
            sectioned: s,
            fullWidth: u,
            fullHeight: m,
            fluidContent: g,
            hideOnPrint: p,
            autofocusTarget: v,
            captureOverscroll: y,
          } = this.props,
          x = l === 'cover',
          k = R(
            we.Popover,
            n && we.measuring,
            (u || x) && we.fullWidth,
            p && we['PopoverOverlay-hideOnPrint'],
            l && we[ge('positioned', l)]
          ),
          h = n ? void 0 : { height: o },
          f = R(
            we.Content,
            m && we['Content-fullHeight'],
            g && we['Content-fluidContent']
          );
        return c.createElement(
          'div',
          Object.assign({ className: k }, Eh.props),
          c.createElement(xo, { event: 'click', handler: this.handleClick }),
          c.createElement(xo, {
            event: 'touchstart',
            handler: this.handleClick,
          }),
          c.createElement(Fl, {
            keyCode: Xt.Escape,
            handler: this.handleEscape,
          }),
          c.createElement('div', {
            className: we.FocusTracker,
            tabIndex: 0,
            onFocus: this.handleFocusFirstItem,
          }),
          c.createElement(
            'div',
            { className: we.ContentContainer },
            c.createElement(
              'div',
              {
                id: a,
                tabIndex: v === 'none' ? void 0 : -1,
                className: f,
                style: h,
                ref: this.contentNode,
              },
              A5(i, { captureOverscroll: y, sectioned: s })
            )
          ),
          c.createElement('div', {
            className: we.FocusTracker,
            tabIndex: 0,
            onFocus: this.handleFocusLastItem,
          })
        );
      }),
      (this.handleClick = (r) => {
        const n = r.target,
          {
            contentNode: o,
            props: {
              activator: l,
              onClose: a,
              preventCloseOnChildOverlayClick: i,
            },
          } = this,
          s = r.composedPath(),
          u = i ? N5(s, this.context.container) : T0(s, o),
          m = D0(l, n);
        u || m || this.state.transitionStatus !== Et.Entered || a(mr.Click);
      }),
      (this.handleScrollOut = () => {
        this.props.onClose(mr.ScrollOut);
      }),
      (this.handleEscape = (r) => {
        const n = r.target,
          {
            contentNode: o,
            props: { activator: l },
          } = this,
          a = r.composedPath(),
          i = T0(a, o),
          s = D0(l, n);
        (i || s) && this.props.onClose(mr.EscapeKeypress);
      }),
      (this.handleFocusFirstItem = () => {
        this.props.onClose(mr.FocusOut);
      }),
      (this.handleFocusLastItem = () => {
        this.props.onClose(mr.FocusOut);
      }),
      (this.overlayRef = d.createRef());
  }
  forceUpdatePosition() {
    var t;
    (t = this.overlayRef.current) == null || t.forceUpdatePosition();
  }
  changeTransitionStatus(t, r) {
    this.setState({ transitionStatus: t }, r),
      this.contentNode.current &&
        this.contentNode.current.getBoundingClientRect();
  }
  componentDidMount() {
    this.props.active &&
      (this.focusContent(), this.changeTransitionStatus(Et.Entered));
  }
  componentDidUpdate(t) {
    this.props.active &&
      !t.active &&
      (this.focusContent(),
      this.changeTransitionStatus(Et.Entering, () => {
        this.clearTransitionTimeout(),
          (this.enteringTimer = window.setTimeout(() => {
            this.setState({ transitionStatus: Et.Entered });
          }, parseInt(Cu.motion['motion-duration-100'], 10)));
      })),
      !this.props.active &&
        t.active &&
        (this.clearTransitionTimeout(),
        this.setState({ transitionStatus: Et.Exited }));
  }
  componentWillUnmount() {
    this.clearTransitionTimeout();
  }
  render() {
    const {
        active: t,
        activator: r,
        fullWidth: n,
        preferredPosition: o = 'below',
        preferredAlignment: l = 'center',
        preferInputActivator: a = !0,
        fixed: i,
        zIndexOverride: s,
      } = this.props,
      { transitionStatus: u } = this.state;
    if (u === Et.Exited && !t) return null;
    const m = R(
      we.PopoverOverlay,
      u === Et.Entering && we['PopoverOverlay-entering'],
      u === Et.Entered && we['PopoverOverlay-open'],
      u === Et.Exiting && we['PopoverOverlay-exiting'],
      o === 'cover' && we['PopoverOverlay-noAnimation']
    );
    return c.createElement(f1, {
      ref: this.overlayRef,
      fullWidth: n,
      active: t,
      activator: r,
      preferInputActivator: a,
      preferredPosition: o,
      preferredAlignment: l,
      render: this.renderPopover.bind(this),
      fixed: i,
      onScrollOut: this.handleScrollOut,
      classNames: m,
      zIndexOverride: s,
    });
  }
  clearTransitionTimeout() {
    this.enteringTimer && window.clearTimeout(this.enteringTimer);
  }
  focusContent() {
    const { autofocusTarget: t = 'container' } = this.props;
    t === 'none' ||
      this.contentNode == null ||
      requestAnimationFrame(() => {
        if (this.contentNode.current == null) return;
        const r = Bb(this.contentNode.current);
        r && t === 'first-node'
          ? r.focus({ preventScroll: !1 })
          : this.contentNode.current.focus({ preventScroll: !1 });
      });
  }
}
S1.contextType = Iu;
function A5(e, t) {
  const r = d.Children.toArray(e);
  return v1(r[0], Sc) ? r : Vu(r, Sc, t);
}
function D0(e, t) {
  if (e === t) return !0;
  let r = t.parentNode;
  for (; r != null; ) {
    if (r === e) return !0;
    r = r.parentNode;
  }
  return !1;
}
function T0(e, t) {
  return t.current != null && e.includes(t.current);
}
function N5(e, t) {
  return e.some(
    (r) => r instanceof Node && (t == null ? void 0 : t.contains(r))
  );
}
const _5 = d.forwardRef(function (
  {
    activatorWrapper: t = 'div',
    children: r,
    onClose: n,
    activator: o,
    preventFocusOnClose: l,
    active: a,
    fixed: i,
    ariaHaspopup: s,
    preferInputActivator: u = !0,
    zIndexOverride: m,
    ...g
  },
  p
) {
  const [v, y] = d.useState(),
    x = d.useRef(null),
    k = d.useRef(null),
    h = t,
    f = d.useId();
  function b() {
    var P;
    (P = x.current) == null || P.forceUpdatePosition();
  }
  const S = (P) => {
    if ((n(P), !(k.current == null || l))) {
      if (P === mr.FocusOut && v) {
        const E = zo(v) || zo(k.current) || k.current;
        x0(E, I0) || E.focus();
      } else if (P === mr.EscapeKeypress && v) {
        const E = zo(v) || zo(k.current) || k.current;
        E ? E.focus() : x0(E, I0);
      }
    }
  };
  d.useImperativeHandle(p, () => ({
    forceUpdatePosition: b,
    close: (P = 'activator') => {
      const E = P === 'activator' ? mr.EscapeKeypress : mr.FocusOut;
      S(E);
    },
  }));
  const F = d.useCallback(() => {
    if (k.current == null) return;
    const E = zo(k.current) || k.current,
      A = 'disabled' in E && !!E.disabled;
    T5(E, { id: f, active: a, ariaHaspopup: s, activatorDisabled: A });
  }, [f, a, s]);
  d.useEffect(() => {
    ((!v && k.current) || (v && k.current && !k.current.contains(v))) &&
      y(k.current.firstElementChild),
      F();
  }, [v, F]),
    d.useEffect(() => {
      v && k.current && y(k.current.firstElementChild), F();
    }, [v, F]);
  const w = v
    ? c.createElement(
        a1,
        { idPrefix: 'popover' },
        c.createElement(
          S1,
          Object.assign(
            {
              ref: x,
              id: f,
              activator: v,
              preferInputActivator: u,
              onClose: S,
              active: a,
              fixed: i,
              zIndexOverride: m,
            },
            g
          ),
          r
        )
      )
    : null;
  return c.createElement(h, { ref: k }, d.Children.only(o), w);
});
function I0(e) {
  let t = e.parentElement;
  for (; t; ) {
    if (t.matches(Ch.selector)) return !1;
    t = t.parentElement;
  }
  return !0;
}
const E1 = Object.assign(_5, { Pane: Sc, Section: x1 }),
  M5 = d.createContext(!1);
var Gt = {
    Checkbox: 'Polaris-Checkbox',
    ChoiceLabel: 'Polaris-Checkbox__ChoiceLabel',
    Backdrop: 'Polaris-Checkbox__Backdrop',
    Input: 'Polaris-Checkbox__Input',
    'Input-indeterminate': 'Polaris-Checkbox__Input--indeterminate',
    Icon: 'Polaris-Checkbox__Icon',
    animated: 'Polaris-Checkbox--animated',
    toneMagic: 'Polaris-Checkbox--toneMagic',
    hover: 'Polaris-Checkbox--hover',
    error: 'Polaris-Checkbox--error',
    checked: 'Polaris-Checkbox--checked',
    pathAnimation: 'Polaris-Checkbox--pathAnimation',
  },
  cr = {
    Choice: 'Polaris-Choice',
    labelHidden: 'Polaris-Choice--labelHidden',
    Label: 'Polaris-Choice__Label',
    Control: 'Polaris-Choice__Control',
    disabled: 'Polaris-Choice--disabled',
    toneMagic: 'Polaris-Choice--toneMagic',
    Descriptions: 'Polaris-Choice__Descriptions',
    HelpText: 'Polaris-Choice__HelpText',
  };
function B5({
  id: e,
  label: t,
  disabled: r,
  error: n,
  children: o,
  labelHidden: l,
  helpText: a,
  onClick: i,
  labelClassName: s,
  fill: u,
  bleed: m,
  bleedBlockStart: g,
  bleedBlockEnd: p,
  bleedInlineStart: v,
  bleedInlineEnd: y,
  tone: x,
}) {
  const k = R(
      cr.Choice,
      l && cr.labelHidden,
      r && cr.disabled,
      x && cr[ge('tone', x)],
      s
    ),
    h = {
      ...Jt('choice', 'bleed-block-end', 'space', p || m),
      ...Jt('choice', 'bleed-block-start', 'space', g || m),
      ...Jt('choice', 'bleed-inline-start', 'space', v || m),
      ...Jt('choice', 'bleed-inline-end', 'space', y || m),
      ...Object.fromEntries(
        Object.entries(nl('choice', 'fill', u)).map(([w, P]) => [
          w,
          P ? '100%' : 'auto',
        ])
      ),
    },
    f = c.createElement(
      'label',
      { className: k, htmlFor: e, onClick: i, style: Pu(h) },
      c.createElement('span', { className: cr.Control }, o),
      c.createElement(
        'span',
        { className: cr.Label },
        c.createElement(X, { as: 'span', variant: 'bodyMd' }, t)
      )
    ),
    b = a
      ? c.createElement(
          'div',
          { className: cr.HelpText, id: C1(e) },
          c.createElement(X, { as: 'span', tone: r ? void 0 : 'subdued' }, a)
        )
      : null,
    S =
      n &&
      typeof n != 'boolean' &&
      c.createElement(
        'div',
        { className: cr.Error },
        c.createElement(g1, { message: n, fieldID: e })
      ),
    F =
      b || S
        ? c.createElement('div', { className: cr.Descriptions }, S, b)
        : null;
  return F ? c.createElement('div', null, f, F) : f;
}
function C1(e) {
  return `${e}HelpText`;
}
const Gu = d.forwardRef(function (
  {
    ariaControls: t,
    ariaDescribedBy: r,
    label: n,
    labelHidden: o,
    checked: l = !1,
    helpText: a,
    disabled: i,
    id: s,
    name: u,
    value: m,
    error: g,
    onChange: p,
    onFocus: v,
    onBlur: y,
    labelClassName: x,
    fill: k,
    bleed: h,
    bleedBlockStart: f,
    bleedBlockEnd: b,
    bleedInlineStart: S,
    bleedInlineEnd: F,
    tone: w,
  },
  P
) {
  const E = d.useRef(null),
    A = d.useId(),
    D = s ?? A,
    N = d.useContext(M5);
  d.useImperativeHandle(P, () => ({
    focus: () => {
      E.current && E.current.focus();
    },
  }));
  const B = () => {
      y && y();
    },
    j = () => {
      p == null ||
        E.current == null ||
        i ||
        (p(E.current.checked, D), E.current.focus());
    },
    Z = [];
  g && typeof g != 'boolean' && Z.push(p1(D)),
    a && Z.push(C1(D)),
    r && Z.push(r);
  const q = Z.length ? Z.join(' ') : void 0,
    ee = R(Gt.Checkbox, g && Gt.error),
    W = l === 'indeterminate',
    I = !W && !!l,
    z = W
      ? { indeterminate: 'true', 'aria-checked': 'mixed' }
      : { 'aria-checked': I },
    $ = c.createElement(
      'svg',
      {
        viewBox: '0 0 16 16',
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
      },
      c.createElement('path', {
        className: R(l && Gt.checked),
        d: 'M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5',
        transform: 'translate(2 2.980376)',
        opacity: '0',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        pathLength: '1',
      })
    ),
    V = R(Gt.Input, W && Gt['Input-indeterminate'], w && Gt[ge('tone', w)]),
    Y = {
      helpText: a,
      error: g,
      bleed: h,
      bleedBlockStart: f,
      bleedBlockEnd: b,
      bleedInlineStart: S,
      bleedInlineEnd: F,
    };
  return c.createElement(
    B5,
    Object.assign(
      {
        id: D,
        label: n,
        labelHidden: o,
        disabled: i,
        labelClassName: R(Gt.ChoiceLabel, x),
        fill: k,
        tone: w,
      },
      Y
    ),
    c.createElement(
      'span',
      { className: ee },
      c.createElement(
        'input',
        Object.assign(
          {
            ref: E,
            id: D,
            name: u,
            value: m,
            type: 'checkbox',
            checked: I,
            disabled: i,
            className: V,
            onBlur: B,
            onChange: L5,
            onClick: j,
            onFocus: v,
            'aria-invalid': g != null,
            'aria-controls': t,
            'aria-describedby': q,
            role: N ? 'presentation' : 'checkbox',
          },
          z
        )
      ),
      c.createElement('span', {
        className: Gt.Backdrop,
        onClick: A0,
        onKeyUp: A0,
      }),
      c.createElement(
        'span',
        { className: R(Gt.Icon, !W && Gt.animated) },
        W ? c.createElement(Ee, { source: qg }) : $
      )
    )
  );
});
function L5() {}
function A0(e) {
  e.stopPropagation();
}
const R5 = d.createContext(!1);
var wn = {
  Banner: 'Polaris-Banner',
  keyFocused: 'Polaris-Banner--keyFocused',
  withinContentContainer: 'Polaris-Banner--withinContentContainer',
  withinPage: 'Polaris-Banner--withinPage',
  DismissIcon: 'Polaris-Banner__DismissIcon',
  'text-success-on-bg-fill': 'Polaris-Banner--textSuccessOnBgFill',
  'text-success': 'Polaris-Banner__text--success',
  'text-warning-on-bg-fill': 'Polaris-Banner--textWarningOnBgFill',
  'text-warning': 'Polaris-Banner__text--warning',
  'text-critical-on-bg-fill': 'Polaris-Banner--textCriticalOnBgFill',
  'text-critical': 'Polaris-Banner__text--critical',
  'text-info-on-bg-fill': 'Polaris-Banner--textInfoOnBgFill',
  'text-info': 'Polaris-Banner__text--info',
  'icon-secondary': 'Polaris-Banner__icon--secondary',
};
const fs = {
  success: {
    withinPage: {
      background: 'bg-fill-success',
      text: 'text-success-on-bg-fill',
      icon: 'text-success-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-success',
      text: 'text-success',
      icon: 'text-success',
    },
    icon: Vg,
  },
  warning: {
    withinPage: {
      background: 'bg-fill-warning',
      text: 'text-warning-on-bg-fill',
      icon: 'text-warning-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-warning',
      text: 'text-warning',
      icon: 'text-warning',
    },
    icon: Ug,
  },
  critical: {
    withinPage: {
      background: 'bg-fill-critical',
      text: 'text-critical-on-bg-fill',
      icon: 'text-critical-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-critical',
      text: 'text-critical',
      icon: 'text-critical',
    },
    icon: $g,
  },
  info: {
    withinPage: {
      background: 'bg-fill-info',
      text: 'text-info-on-bg-fill',
      icon: 'text-info-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-info',
      text: 'text-info',
      icon: 'text-info',
    },
    icon: Xg,
  },
};
function z5(e) {
  const t = d.useRef(null),
    [r, n] = d.useState(!1);
  return (
    d.useImperativeHandle(
      e,
      () => ({
        focus: () => {
          var i;
          (i = t.current) == null || i.focus(), n(!0);
        },
      }),
      []
    ),
    {
      wrapperRef: t,
      handleKeyUp: (i) => {
        i.target === t.current && n(!0);
      },
      handleBlur: () => n(!1),
      handleMouseUp: (i) => {
        i.currentTarget.blur(), n(!1);
      },
      shouldShowFocus: r,
    }
  );
}
var Hr = {
  ButtonGroup: 'Polaris-ButtonGroup',
  Item: 'Polaris-ButtonGroup__Item',
  'Item-plain': 'Polaris-ButtonGroup__Item--plain',
  variantSegmented: 'Polaris-ButtonGroup--variantSegmented',
  'Item-focused': 'Polaris-ButtonGroup__Item--focused',
  fullWidth: 'Polaris-ButtonGroup--fullWidth',
  extraTight: 'Polaris-ButtonGroup--extraTight',
  tight: 'Polaris-ButtonGroup--tight',
  loose: 'Polaris-ButtonGroup--loose',
  noWrap: 'Polaris-ButtonGroup--noWrap',
};
function O5({ button: e }) {
  const { value: t, setTrue: r, setFalse: n } = Sr(!1),
    o = R(
      Hr.Item,
      t && Hr['Item-focused'],
      e.props.variant === 'plain' && Hr['Item-plain']
    );
  return c.createElement('div', { className: o, onFocus: r, onBlur: n }, e);
}
function w1({
  children: e,
  gap: t,
  variant: r,
  fullWidth: n,
  connectedTop: o,
  noWrap: l,
}) {
  const a = R(
      Hr.ButtonGroup,
      t && Hr[t],
      r && Hr[ge('variant', r)],
      n && Hr.fullWidth,
      l && Hr.noWrap
    ),
    i = y1(e).map((s, u) => c.createElement(O5, { button: s, key: u }));
  return c.createElement(
    'div',
    {
      className: a,
      'data-buttongroup-variant': r,
      'data-buttongroup-connected-top': o,
      'data-buttongroup-full-width': n,
      'data-buttongroup-no-wrap': l,
    },
    i
  );
}
const H5 = d.forwardRef(function (t, r) {
  const { tone: n, stopAnnouncements: o } = t,
    l = d.useContext(Fu),
    {
      wrapperRef: a,
      handleKeyUp: i,
      handleBlur: s,
      handleMouseUp: u,
      shouldShowFocus: m,
    } = z5(r),
    g = R(
      wn.Banner,
      m && wn.keyFocused,
      l ? wn.withinContentContainer : wn.withinPage
    );
  return c.createElement(
    R5.Provider,
    { value: !0 },
    c.createElement(
      'div',
      {
        className: g,
        tabIndex: 0,
        ref: a,
        role: n === 'warning' || n === 'critical' ? 'alert' : 'status',
        'aria-live': o ? 'off' : 'polite',
        onMouseUp: u,
        onKeyUp: i,
        onBlur: s,
      },
      c.createElement(j5, t)
    )
  );
});
function j5({
  tone: e = 'info',
  icon: t,
  hideIcon: r,
  onDismiss: n,
  action: o,
  secondaryAction: l,
  title: a,
  children: i,
}) {
  const s = Qe(),
    u = d.useContext(Fu),
    m = !a && !u,
    g = Object.keys(fs).includes(e) ? e : 'info',
    p = fs[g][u ? 'withinContentContainer' : 'withinPage'],
    v = {
      backgroundColor: p.background,
      textColor: p.text,
      bannerTitle: a
        ? c.createElement(
            X,
            { as: 'h2', variant: 'headingSm', breakWord: !0 },
            a
          )
        : null,
      bannerIcon: r
        ? null
        : c.createElement(
            'span',
            { className: wn[p.icon] },
            c.createElement(Ee, { source: t ?? fs[g].icon })
          ),
      actionButtons:
        o || l
          ? c.createElement(
              w1,
              null,
              o &&
                c.createElement(
                  en,
                  Object.assign({ onClick: o.onAction }, o),
                  o.content
                ),
              l &&
                c.createElement(
                  en,
                  Object.assign({ onClick: l.onAction }, l),
                  l.content
                )
            )
          : null,
      dismissButton: n
        ? c.createElement(en, {
            variant: 'tertiary',
            icon: c.createElement(
              'span',
              { className: wn[m ? 'icon-secondary' : p.icon] },
              c.createElement(Ee, { source: Lu })
            ),
            onClick: n,
            accessibilityLabel: s.translate('Polaris.Banner.dismissButton'),
          })
        : null,
    },
    y = i ? c.createElement(X, { as: 'span', variant: 'bodyMd' }, i) : null;
  return u
    ? c.createElement(W5, v, y)
    : m
    ? c.createElement(U5, v, y)
    : c.createElement($5, v, y);
}
function $5({
  backgroundColor: e,
  textColor: t,
  bannerTitle: r,
  bannerIcon: n,
  actionButtons: o,
  dismissButton: l,
  children: a,
}) {
  const { smUp: i } = Bl(),
    s = a || o;
  return c.createElement(
    se,
    { width: '100%' },
    c.createElement(
      on,
      { align: 'space-between' },
      c.createElement(
        se,
        {
          background: e,
          color: t,
          borderStartStartRadius: i ? '300' : void 0,
          borderStartEndRadius: i ? '300' : void 0,
          borderEndStartRadius: !s && i ? '300' : void 0,
          borderEndEndRadius: !s && i ? '300' : void 0,
          padding: '300',
        },
        c.createElement(
          jt,
          {
            align: 'space-between',
            blockAlign: 'center',
            gap: '200',
            wrap: !1,
          },
          c.createElement(jt, { gap: '100', wrap: !1 }, n, r),
          l
        )
      ),
      s &&
        c.createElement(
          se,
          { padding: { xs: '300', md: '400' }, paddingBlockStart: '300' },
          c.createElement(
            on,
            { gap: '200' },
            c.createElement('div', null, a),
            o
          )
        )
    )
  );
}
function U5({
  backgroundColor: e,
  bannerIcon: t,
  actionButtons: r,
  dismissButton: n,
  children: o,
}) {
  const [l, a] = d.useState('center'),
    i = d.useRef(null),
    s = d.useRef(null),
    u = d.useRef(null),
    m = d.useCallback(() => {
      var v, y, x;
      const g = (v = i.current) == null ? void 0 : v.offsetHeight,
        p =
          ((y = s.current) == null ? void 0 : y.offsetHeight) ||
          ((x = u.current) == null ? void 0 : x.offsetHeight);
      !g || !p || (g > p ? a('start') : a('center'));
    }, []);
  return (
    d.useEffect(() => m(), [m]),
    Or('resize', m),
    c.createElement(
      se,
      { width: '100%', padding: '300', borderRadius: '300' },
      c.createElement(
        jt,
        { align: 'space-between', blockAlign: l, wrap: !1 },
        c.createElement(
          se,
          { width: '100%' },
          c.createElement(
            jt,
            { gap: '200', wrap: !1, blockAlign: l },
            t
              ? c.createElement(
                  'div',
                  { ref: s },
                  c.createElement(
                    se,
                    { background: e, borderRadius: '200', padding: '100' },
                    t
                  )
                )
              : null,
            c.createElement(
              se,
              { ref: i, width: '100%' },
              c.createElement(
                on,
                { gap: '200' },
                c.createElement('div', null, o),
                r
              )
            )
          )
        ),
        c.createElement('div', { ref: u, className: wn.DismissIcon }, n)
      )
    )
  );
}
function W5({
  backgroundColor: e,
  textColor: t,
  bannerTitle: r,
  bannerIcon: n,
  actionButtons: o,
  dismissButton: l,
  children: a,
}) {
  return c.createElement(
    se,
    {
      width: '100%',
      background: e,
      padding: '200',
      borderRadius: '200',
      color: t,
    },
    c.createElement(
      jt,
      { align: 'space-between', blockAlign: 'start', wrap: !1, gap: '200' },
      c.createElement(
        jt,
        { gap: '150', wrap: !1 },
        n,
        c.createElement(
          se,
          { width: '100%' },
          c.createElement(
            on,
            { gap: '200' },
            c.createElement(
              on,
              { gap: '050' },
              r,
              c.createElement('div', null, a)
            ),
            o
          )
        )
      ),
      l
    )
  );
}
function N0(e = [], t, r, n) {
  const o = r.reduce((s, u) => s + u, 0),
    l = e.map((s, u) => u),
    a = [],
    i = [];
  if (n > o) a.push(...l);
  else {
    let s = 0,
      u = !1;
    l.forEach((m) => {
      const g = r[m];
      if (s + g >= n - t || u) {
        i.push(m), (u = !0);
        return;
      }
      a.push(m), (s += g);
    });
  }
  return { visiblePromotedActions: a, hiddenPromotedActions: i };
}
function V5(e) {
  const t = e.filter((r) => r.items);
  return e.length === t.length;
}
function G5(e) {
  const t = e.filter((r) => !r.items);
  return e.length === t.length;
}
function Ec(e) {
  return 'title' in e && 'actions' in e;
}
function Z5(e) {
  return 'items' in e;
}
function Y5(e) {
  if (!(!e || e.length === 0)) {
    if (V5(e)) return e;
    if (G5(e)) return [{ items: e }];
  }
}
function _0(e) {
  var t;
  if (!e) return !1;
  for (const r of e)
    for (const n of r.items)
      if (((t = n.badge) == null ? void 0 : t.tone) === 'new') return !0;
  return !1;
}
var dr = {
    BulkActionsOuterLayout: 'Polaris-BulkActions__BulkActionsOuterLayout',
    BulkActionsSelectAllWrapper:
      'Polaris-BulkActions__BulkActionsSelectAllWrapper',
    BulkActionsPromotedActionsWrapper:
      'Polaris-BulkActions__BulkActionsPromotedActionsWrapper',
    BulkActionsLayout: 'Polaris-BulkActions__BulkActionsLayout',
    'BulkActionsLayout--measuring':
      'Polaris-BulkActions--bulkActionsLayoutMeasuring',
    BulkActionsMeasurerLayout: 'Polaris-BulkActions__BulkActionsMeasurerLayout',
    BulkActionButton: 'Polaris-BulkActions__BulkActionButton',
    disabled: 'Polaris-BulkActions--disabled',
    AllAction: 'Polaris-BulkActions__AllAction',
  },
  M0 = {
    Indicator: 'Polaris-Indicator',
    pulseIndicator: 'Polaris-Indicator--pulseIndicator',
  };
function X5({ pulse: e = !0 }) {
  const t = R(M0.Indicator, e && M0.pulseIndicator);
  return c.createElement('span', { className: t });
}
function fo({
  handleMeasurement: e,
  url: t,
  external: r,
  onAction: n,
  content: o,
  disclosure: l,
  accessibilityLabel: a,
  disabled: i,
  destructive: s,
  indicator: u,
  showContentInButton: m,
  size: g,
}) {
  const p = d.useRef(null);
  ju(() => {
    if (e && p.current) {
      const k = p.current.getBoundingClientRect().width;
      e(k);
    }
  });
  const v = l && !m,
    y = v ? void 0 : o,
    x = c.createElement(
      en,
      {
        external: r,
        url: t,
        accessibilityLabel: v ? o : a,
        tone: s ? 'critical' : void 0,
        disclosure: l && m,
        onClick: n,
        disabled: i,
        size: g,
        icon: v ? c.createElement(Ee, { source: Qg, tone: 'base' }) : void 0,
      },
      y
    );
  return c.createElement(
    'div',
    { className: dr.BulkActionButton, ref: p },
    v ? c.createElement(Wr, { content: o, preferredPosition: 'below' }, x) : x,
    u && c.createElement(X5, null)
  );
}
function Q5({ title: e, actions: t, isNewBadgeInBadgeActions: r, size: n }) {
  const { value: o, toggle: l } = Sr(!1);
  return c.createElement(
    c.Fragment,
    null,
    c.createElement(
      E1,
      {
        active: o,
        activator: c.createElement(fo, {
          disclosure: !0,
          showContentInButton: !0,
          onAction: l,
          content: e,
          indicator: r,
          size: n,
        }),
        onClose: l,
        preferInputActivator: !0,
      },
      c.createElement(Wu, { items: t, onActionAnyItem: l })
    )
  );
}
var ms = {
  CheckableButton: 'Polaris-CheckableButton',
  Checkbox: 'Polaris-CheckableButton__Checkbox',
  Label: 'Polaris-CheckableButton__Label',
};
const q5 = d.forwardRef(function (
    {
      accessibilityLabel: t,
      label: r = '',
      onToggleAll: n,
      selected: o,
      disabled: l,
      ariaLive: a,
    },
    i
  ) {
    const s = d.useRef(null);
    function u() {
      var m;
      (m = s == null ? void 0 : s.current) == null || m.focus();
    }
    return (
      d.useImperativeHandle(i, () => ({ focus: u })),
      c.createElement(
        'div',
        { className: ms.CheckableButton, onClick: n },
        c.createElement(
          'div',
          { className: ms.Checkbox },
          c.createElement(Gu, {
            label: t,
            labelHidden: !0,
            checked: o,
            disabled: l,
            onChange: n,
            ref: s,
          })
        ),
        r
          ? c.createElement(
              'span',
              { className: ms.Label, 'aria-live': a },
              c.createElement(
                X,
                { as: 'span', variant: 'bodySm', fontWeight: 'medium' },
                r
              )
            )
          : null
      )
    );
  }),
  J5 = 4;
function K5({
  promotedActions: e = [],
  disabled: t,
  buttonSize: r,
  handleMeasurement: n,
}) {
  const o = Qe(),
    l = d.useRef(null),
    a = o.translate(
      'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel'
    ),
    i = c.createElement(fo, { disclosure: !0, content: a }),
    s = d.useCallback(() => {
      if (!l.current) return;
      const m = l.current.offsetWidth,
        g = l.current.children,
        v = Array.from(g).map(
          (x) => Math.ceil(x.getBoundingClientRect().width) + J5
        ),
        y = v.pop() || 0;
      n({ containerWidth: m, disclosureWidth: y, hiddenActionsWidths: v });
    }, [n]);
  d.useEffect(() => {
    s();
  }, [s, e]);
  const u = e.map((m, g) =>
    Ec(m)
      ? c.createElement(fo, {
          key: g,
          disclosure: !0,
          showContentInButton: !0,
          content: m.title,
          size: r,
        })
      : c.createElement(
          fo,
          Object.assign({ key: g, disabled: t }, m, { size: r })
        )
  );
  return (
    Or('resize', s),
    c.createElement(
      'div',
      { className: dr.BulkActionsMeasurerLayout, ref: l },
      u,
      i
    )
  );
}
const ev = d.forwardRef(function (
  {
    promotedActions: t,
    actions: r,
    disabled: n,
    buttonSize: o,
    paginatedSelectAllAction: l,
    paginatedSelectAllText: a,
    label: i,
    accessibilityLabel: s,
    selected: u,
    onToggleAll: m,
    onMoreActionPopoverToggle: g,
    width: p,
    selectMode: v,
  },
  y
) {
  const x = Qe(),
    [k, h] = d.useState(!1),
    [f, b] = d.useReducer((G, U) => ({ ...G, ...U }), {
      disclosureWidth: 0,
      containerWidth: 1 / 0,
      actionsWidths: [],
      visiblePromotedActions: [],
      hiddenPromotedActions: [],
      hasMeasured: !1,
    }),
    {
      visiblePromotedActions: S,
      hiddenPromotedActions: F,
      containerWidth: w,
      disclosureWidth: P,
      actionsWidths: E,
      hasMeasured: A,
    } = f;
  d.useEffect(() => {
    if (w === 0 || !t || t.length === 0) return;
    const { visiblePromotedActions: G, hiddenPromotedActions: U } = N0(
      t,
      P,
      E,
      w
    );
    b({
      visiblePromotedActions: G,
      hiddenPromotedActions: U,
      hasMeasured: w !== 1 / 0,
    });
  }, [w, P, t, E]);
  const D =
      !t || (t && S.length === 0)
        ? x.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
        : x.translate(
            'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel'
          ),
    N = l
      ? c.createElement(
          ti,
          {
            className: dr.AllAction,
            onClick: l.onAction,
            size: 'slim',
            disabled: n,
          },
          c.createElement(
            X,
            { as: 'span', variant: 'bodySm', fontWeight: 'medium' },
            l.content
          )
        )
      : null,
    B = a && l,
    Z = {
      accessibilityLabel: s,
      label: B ? a : i,
      selected: u,
      onToggleAll: m,
      disabled: n,
      ariaLive: B ? 'polite' : void 0,
      ref: y,
    },
    q = d.useCallback(() => {
      g == null || g(k), h((G) => !G);
    }, [g, k]),
    ee = d.useCallback(
      (G) => {
        const {
          hiddenActionsWidths: U,
          containerWidth: re,
          disclosureWidth: ie,
        } = G;
        if (!t || t.length === 0) return;
        const { visiblePromotedActions: Ce, hiddenPromotedActions: Fe } = N0(
          t,
          ie,
          U,
          re
        );
        b({
          visiblePromotedActions: Ce,
          hiddenPromotedActions: Fe,
          actionsWidths: U,
          containerWidth: re,
          disclosureWidth: ie,
          hasMeasured: !0,
        });
      },
      [t]
    ),
    W = Y5(r),
    I = t
      ? t
          .filter((G, U) => !!S.includes(U))
          .map((G, U) =>
            Ec(G)
              ? c.createElement(
                  Q5,
                  Object.assign({ key: U }, G, {
                    isNewBadgeInBadgeActions: _0(W),
                    size: o,
                  })
                )
              : c.createElement(
                  fo,
                  Object.assign({ key: U, disabled: n }, G, { size: o })
                )
          )
      : null,
    V = {
      items: F.map((G) => (t == null ? void 0 : t[G])).reduce(
        (G, U) => (U ? (Ec(U) ? G.concat(U.actions) : G.concat(U)) : G),
        []
      ),
    },
    Y = d.useMemo(() => {
      if (W) return W;
      if (!r) return [];
      let G = !0;
      return r
        .filter((U) => U)
        .reduce((U, re) => {
          if (Z5(re)) return (G = !1), U.concat(re);
          if (G) {
            if (U.length === 0) return [{ items: [re] }];
            const ie = U[U.length - 1];
            return U.splice(U.length - 1, 1, { items: [...ie.items, re] }), U;
          }
          return (G = !0), U.concat({ items: [re] });
        }, []);
    }, [r, W]),
    ce = c.createElement(fo, {
      disclosure: !0,
      showContentInButton: !I,
      onAction: q,
      content: D,
      disabled: n,
      indicator: _0(W),
      size: o,
    }),
    he =
      Y.length > 0
        ? c.createElement(
            E1,
            {
              active: k,
              activator: ce,
              preferredAlignment: 'right',
              onClose: q,
            },
            c.createElement(Wu, {
              sections: V.items.length > 0 ? [V, ...Y] : Y,
              onActionAnyItem: q,
            })
          )
        : null,
    xe = c.createElement(K5, {
      promotedActions: t,
      disabled: n,
      buttonSize: o,
      handleMeasurement: ee,
    });
  return c.createElement(
    'div',
    { className: dr.BulkActions, style: p ? { width: p } : void 0 },
    c.createElement(
      jt,
      { gap: '400', blockAlign: 'center' },
      c.createElement(
        'div',
        { className: dr.BulkActionsSelectAllWrapper },
        c.createElement(q5, Z),
        N
      ),
      v
        ? c.createElement(
            'div',
            { className: dr.BulkActionsPromotedActionsWrapper },
            c.createElement(
              jt,
              { gap: '100', blockAlign: 'center' },
              c.createElement(
                'div',
                { className: dr.BulkActionsOuterLayout },
                xe,
                c.createElement(
                  'div',
                  {
                    className: R(
                      dr.BulkActionsLayout,
                      !A && dr['BulkActionsLayout--measuring']
                    ),
                  },
                  I
                )
              ),
              he
            )
          )
        : null
    )
  );
});
var Lr = {
  LegacyStack: 'Polaris-LegacyStack',
  Item: 'Polaris-LegacyStack__Item',
  noWrap: 'Polaris-LegacyStack--noWrap',
  spacingNone: 'Polaris-LegacyStack--spacingNone',
  spacingExtraTight: 'Polaris-LegacyStack--spacingExtraTight',
  spacingTight: 'Polaris-LegacyStack--spacingTight',
  spacingBaseTight: 'Polaris-LegacyStack--spacingBaseTight',
  spacingLoose: 'Polaris-LegacyStack--spacingLoose',
  spacingExtraLoose: 'Polaris-LegacyStack--spacingExtraLoose',
  distributionLeading: 'Polaris-LegacyStack--distributionLeading',
  distributionTrailing: 'Polaris-LegacyStack--distributionTrailing',
  distributionCenter: 'Polaris-LegacyStack--distributionCenter',
  distributionEqualSpacing: 'Polaris-LegacyStack--distributionEqualSpacing',
  distributionFill: 'Polaris-LegacyStack--distributionFill',
  distributionFillEvenly: 'Polaris-LegacyStack--distributionFillEvenly',
  alignmentLeading: 'Polaris-LegacyStack--alignmentLeading',
  alignmentTrailing: 'Polaris-LegacyStack--alignmentTrailing',
  alignmentCenter: 'Polaris-LegacyStack--alignmentCenter',
  alignmentFill: 'Polaris-LegacyStack--alignmentFill',
  alignmentBaseline: 'Polaris-LegacyStack--alignmentBaseline',
  vertical: 'Polaris-LegacyStack--vertical',
  'Item-fill': 'Polaris-LegacyStack__Item--fill',
};
function k1({ children: e, fill: t }) {
  const r = R(Lr.Item, t && Lr['Item-fill']);
  return c.createElement('div', { className: r }, e);
}
const Zu = d.memo(function ({
  children: t,
  vertical: r,
  spacing: n,
  distribution: o,
  alignment: l,
  wrap: a,
}) {
  const i = R(
      Lr.LegacyStack,
      r && Lr.vertical,
      n && Lr[ge('spacing', n)],
      o && Lr[ge('distribution', o)],
      l && Lr[ge('alignment', l)],
      a === !1 && Lr.noWrap
    ),
    s = y1(t).map((u, m) => Vu(u, k1, { key: m }));
  return c.createElement('div', { className: i }, s);
});
Zu.Item = k1;
var Go = (function (e) {
  return (
    (e.Input = 'INPUT'),
    (e.Textarea = 'TEXTAREA'),
    (e.Select = 'SELECT'),
    (e.ContentEditable = 'contenteditable'),
    e
  );
})(Go || {});
function tv() {
  if (document == null || document.activeElement == null) return !1;
  const { tagName: e } = document.activeElement;
  return (
    e === Go.Input ||
    e === Go.Textarea ||
    e === Go.Select ||
    document.activeElement.hasAttribute(Go.ContentEditable)
  );
}
var ga = {
  Pagination: 'Polaris-Pagination',
  table: 'Polaris-Pagination--table',
  TablePaginationActions: 'Polaris-Pagination__TablePaginationActions',
};
function rv({
  hasNext: e,
  hasPrevious: t,
  nextURL: r,
  previousURL: n,
  onNext: o,
  onPrevious: l,
  nextTooltip: a,
  previousTooltip: i,
  nextKeys: s,
  previousKeys: u,
  accessibilityLabel: m,
  accessibilityLabels: g,
  label: p,
  type: v = 'page',
}) {
  const y = Qe(),
    x = d.createRef(),
    k = m || y.translate('Polaris.Pagination.pagination'),
    h =
      (g == null ? void 0 : g.previous) ||
      y.translate('Polaris.Pagination.previous'),
    f = (g == null ? void 0 : g.next) || y.translate('Polaris.Pagination.next'),
    b = c.createElement(en, {
      icon: Gg,
      accessibilityLabel: h,
      url: n,
      onClick: l,
      disabled: !t,
      id: 'previousURL',
    }),
    S =
      i && t
        ? c.createElement(
            Wr,
            {
              activatorWrapper: 'span',
              content: i,
              preferredPosition: 'below',
            },
            b
          )
        : b,
    F = c.createElement(en, {
      icon: Zg,
      accessibilityLabel: f,
      url: r,
      onClick: o,
      disabled: !e,
      id: 'nextURL',
    }),
    w =
      a && e
        ? c.createElement(
            Wr,
            {
              activatorWrapper: 'span',
              content: a,
              preferredPosition: 'below',
            },
            F
          )
        : F,
    P = l || L0,
    E =
      u &&
      (n || l) &&
      t &&
      u.map((j) =>
        c.createElement(Fl, {
          key: j,
          keyCode: j,
          handler: pa(n ? B0('previousURL', x) : P),
        })
      ),
    A = o || L0,
    D =
      s &&
      (r || o) &&
      e &&
      s.map((j) =>
        c.createElement(Fl, {
          key: j,
          keyCode: j,
          handler: pa(r ? B0('nextURL', x) : A),
        })
      );
  if (v === 'table') {
    const j = p
      ? c.createElement(
          se,
          { padding: '300', paddingBlockStart: '0', paddingBlockEnd: '0' },
          c.createElement(
            X,
            { as: 'span', variant: 'bodySm', fontWeight: 'medium' },
            p
          )
        )
      : null;
    return c.createElement(
      'nav',
      { 'aria-label': k, ref: x, className: R(ga.Pagination, ga.table) },
      E,
      D,
      c.createElement(
        se,
        {
          background: 'bg-surface-secondary',
          paddingBlockStart: '150',
          paddingBlockEnd: '150',
          paddingInlineStart: '300',
          paddingInlineEnd: '200',
        },
        c.createElement(
          jt,
          { align: 'center', blockAlign: 'center' },
          c.createElement(
            'div',
            {
              className: ga.TablePaginationActions,
              'data-buttongroup-variant': 'segmented',
            },
            c.createElement('div', null, S),
            j,
            c.createElement('div', null, w)
          )
        )
      )
    );
  }
  const N =
      e && t
        ? c.createElement('span', null, p)
        : c.createElement(X, { tone: 'subdued', as: 'span' }, p),
    B = p
      ? c.createElement(
          se,
          { padding: '300', paddingBlockStart: '0', paddingBlockEnd: '0' },
          c.createElement('div', { 'aria-live': 'polite' }, N)
        )
      : null;
  return c.createElement(
    'nav',
    { 'aria-label': k, ref: x, className: ga.Pagination },
    E,
    D,
    c.createElement(w1, { variant: 'segmented' }, S, B, w)
  );
}
function B0(e, t) {
  return () => {
    if (t.current == null) return;
    const r = t.current.querySelector(`#${e}`);
    r && r.click();
  };
}
function pa(e) {
  return () => {
    tv() || e();
  };
}
function L0() {}
function nv({ children: e, onMount: t, fallback: r = null }) {
  const n = Ll(),
    o = n ? e : r;
  return (
    d.useEffect(() => {
      n && t && t();
    }, [n, t]),
    c.createElement(c.Fragment, null, o)
  );
}
function ov() {
  const e = d.useContext(Tu);
  if (!e) throw new o1('No StickyManager was provided.');
  return e;
}
class lv extends d.Component {
  constructor(...t) {
    super(...t),
      (this.state = { isSticky: !1, style: {} }),
      (this.placeHolderNode = null),
      (this.stickyNode = null),
      (this.setPlaceHolderNode = (r) => {
        this.placeHolderNode = r;
      }),
      (this.setStickyNode = (r) => {
        this.stickyNode = r;
      }),
      (this.handlePositioning = (r, n = 0, o = 0, l = 0) => {
        const { isSticky: a } = this.state;
        ((r && !a) || (!r && a)) &&
          (this.adjustPlaceHolderNode(r),
          this.setState({ isSticky: !a }, () => {
            if (
              this.props.onStickyChange == null ||
              (this.props.onStickyChange(!a),
              this.props.boundingElement == null)
            )
              return null;
            this.props.boundingElement.toggleAttribute('data-sticky-active');
          }));
        const i = r ? { position: 'fixed', top: n, left: o, width: l } : {};
        this.setState({ style: i });
      }),
      (this.adjustPlaceHolderNode = (r) => {
        this.placeHolderNode &&
          this.stickyNode &&
          (this.placeHolderNode.style.paddingBottom = r
            ? `${qt(this.stickyNode).height}px`
            : '0px');
      });
  }
  componentDidMount() {
    const {
      boundingElement: t,
      offset: r = !1,
      disableWhenStacked: n = !1,
      stickyManager: o,
    } = this.props;
    !this.stickyNode ||
      !this.placeHolderNode ||
      o.registerStickyItem({
        stickyNode: this.stickyNode,
        placeHolderNode: this.placeHolderNode,
        handlePositioning: this.handlePositioning,
        offset: r,
        boundingElement: t,
        disableWhenStacked: n,
      });
  }
  componentDidUpdate() {
    const {
      boundingElement: t,
      offset: r = !1,
      disableWhenStacked: n = !1,
      stickyManager: o,
    } = this.props;
    if (!this.stickyNode || !this.placeHolderNode) return;
    const l = o.getStickyItem(this.stickyNode);
    (!l ||
      t !== l.boundingElement ||
      r !== l.offset ||
      n !== l.disableWhenStacked) &&
      (o.unregisterStickyItem(this.stickyNode),
      o.registerStickyItem({
        stickyNode: this.stickyNode,
        placeHolderNode: this.placeHolderNode,
        handlePositioning: this.handlePositioning,
        offset: r,
        boundingElement: t,
        disableWhenStacked: n,
      }));
  }
  componentWillUnmount() {
    const { stickyManager: t } = this.props;
    this.stickyNode && t.unregisterStickyItem(this.stickyNode);
  }
  render() {
    const { style: t, isSticky: r } = this.state,
      { children: n } = this.props,
      o = av(n) ? n(r) : n;
    return c.createElement(
      'div',
      null,
      c.createElement('div', { ref: this.setPlaceHolderNode }),
      c.createElement('div', { ref: this.setStickyNode, style: t }, o)
    );
  }
}
function av(e) {
  return typeof e == 'function';
}
function iv(e) {
  const t = ov();
  return c.createElement(lv, Object.assign({}, e, { stickyManager: t }));
}
var sv = { Divider: 'Polaris-Divider' };
const cv = ({
  borderColor: e = 'border-secondary',
  borderWidth: t = '025',
}) => {
  const r = e === 'transparent' ? e : `var(--p-color-${e})`;
  return c.createElement('hr', {
    className: sv.Divider,
    style: { borderBlockStart: `var(--p-border-width-${t}) solid ${r}` },
  });
};
function P1(e = '') {
  const t = e.toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const uv = ['dragover', 'dragenter', 'drop'];
function dv(e, t) {
  return e.type === 'application/x-moz-file' || fv(e, t);
}
function R0(e) {
  if (mv(e) && e.dataTransfer) {
    const t = e.dataTransfer;
    if (t.files && t.files.length) return Array.from(t.files);
    if (t.items && t.items.length) return Array.from(t.items);
  } else if (gv(e) && e.target.files) return Array.from(e.target.files);
  return [];
}
function fv(e, t) {
  if (e && t) {
    const r = e.name || '',
      n = e.type || '',
      o = n.replace(/\/.*$/, '');
    return (Array.isArray(t) ? t : t.split(',')).some((a) => {
      const i = a.trim();
      return i.startsWith('.')
        ? r.toLowerCase().endsWith(i.toLowerCase())
        : i.endsWith('/*')
        ? o === i.replace(/\/.*$/, '')
        : n === i;
    });
  }
  return !0;
}
function mv(e) {
  return uv.indexOf(e.type) > 0;
}
function gv(e) {
  return Object.prototype.hasOwnProperty.call(e, 'target');
}
const F1 = !0;
function D1(e) {
  return e ? 'allowMultiple' : 'single';
}
const T1 = d.createContext({
  disabled: !1,
  focused: !1,
  size: 'extraLarge',
  type: 'file',
  measuring: !1,
  allowMultiple: F1,
});
var _t = {
    DropZone: 'Polaris-DropZone',
    focused: 'Polaris-DropZone--focused',
    noOutline: 'Polaris-DropZone--noOutline',
    hasOutline: 'Polaris-DropZone--hasOutline',
    isDisabled: 'Polaris-DropZone--isDisabled',
    isDragging: 'Polaris-DropZone--isDragging',
    sizeLarge: 'Polaris-DropZone--sizeLarge',
    sizeMedium: 'Polaris-DropZone--sizeMedium',
    sizeSmall: 'Polaris-DropZone--sizeSmall',
    measuring: 'Polaris-DropZone--measuring',
    Container: 'Polaris-DropZone__Container',
    Overlay: 'Polaris-DropZone__Overlay',
    hasError: 'Polaris-DropZone--hasError',
  },
  Wn = {
    FileUpload: 'Polaris-DropZone-FileUpload',
    large: 'Polaris-DropZone-FileUpload--large',
    small: 'Polaris-DropZone-FileUpload--small',
    ActionTitle: 'Polaris-DropZone-FileUpload__ActionTitle',
    'ActionTitle-disabled':
      'Polaris-DropZone-FileUpload__ActionTitle--disabled',
    'ActionTitle-focused': 'Polaris-DropZone-FileUpload__ActionTitle--focused',
    UploadIcon: 'Polaris-DropZone-FileUpload__UploadIcon',
    disabled: 'Polaris-DropZone-FileUpload--disabled',
  };
function pv(e) {
  const t = Qe(),
    {
      size: r,
      measuring: n,
      type: o,
      disabled: l,
      allowMultiple: a,
    } = d.useContext(T1),
    i = P1(o),
    s = D1(a),
    {
      actionTitle: u = t.translate(`Polaris.DropZone.${s}.actionTitle${i}`),
      actionHint: m,
    } = e,
    g = c.createElement(en, { disabled: l }, u),
    p = R(
      Wn.FileUpload,
      n && Wn.measuring,
      r === 'large' && Wn.large,
      r === 'small' && Wn.small
    ),
    v =
      m &&
      c.createElement(X, { variant: 'bodySm', as: 'p', tone: 'subdued' }, m);
  let y;
  switch (r) {
    case 'large':
    case 'medium':
      y = c.createElement(on, { inlineAlign: 'center', gap: '200' }, g, v);
      break;
    case 'small':
      y = c.createElement(
        'div',
        { className: R(Wn.UploadIcon, l && Wn.disabled) },
        c.createElement(Ee, { source: Bu })
      );
      break;
  }
  return c.createElement('div', { className: p }, y);
}
const Cc = function ({
  dropOnPage: t,
  label: r,
  labelAction: n,
  labelHidden: o,
  children: l,
  disabled: a = !1,
  outline: i = !0,
  accept: s,
  active: u,
  overlay: m = !0,
  allowMultiple: g = F1,
  overlayText: p,
  errorOverlayText: v,
  id: y,
  type: x = 'file',
  onClick: k,
  error: h,
  openFileDialog: f,
  variableHeight: b,
  onFileDialogClose: S,
  customValidator: F,
  onDrop: w,
  onDropAccepted: P,
  onDropRejected: E,
  onDragEnter: A,
  onDragOver: D,
  onDragLeave: N,
}) {
  const B = d.useRef(null),
    j = d.useRef(null),
    Z = d.useRef([]),
    q = d.useCallback(
      tr(
        () => {
          if (!B.current) return;
          if (b) {
            G(!1);
            return;
          }
          let ne = 'large';
          const ue = B.current.getBoundingClientRect().width;
          ue < 100 ? (ne = 'small') : ue < 160 && (ne = 'medium'),
            he(ne),
            xe && G(!1);
        },
        50,
        { trailing: !0 }
      ),
      []
    ),
    [ee, W] = d.useState(!1),
    [I, z] = d.useState(!1),
    { value: $, setTrue: V, setFalse: Y } = Sr(!1),
    [ce, he] = d.useState('large'),
    [xe, G] = d.useState(!0),
    U = Qe(),
    re = d.useCallback(
      (ne) => {
        const ue = [],
          Ae = [];
        return (
          Array.from(ne).forEach((rt) => {
            !dv(rt, s) || (F && !F(rt)) ? Ae.push(rt) : ue.push(rt);
          }),
          g || (ue.splice(1, ue.length), Ae.push(...ue.slice(1))),
          { files: ne, acceptedFiles: ue, rejectedFiles: Ae }
        );
      },
      [s, g, F]
    ),
    ie = d.useCallback(
      (ne) => {
        if ((ha(ne), a)) return;
        const ue = R0(ne),
          { files: Ae, acceptedFiles: rt, rejectedFiles: Ut } = re(ue);
        (Z.current = []),
          W(!1),
          z(Ut.length > 0),
          w && w(Ae, rt, Ut),
          P && rt.length && P(rt),
          E && Ut.length && E(Ut),
          ne.target && 'value' in ne.target && (ne.target.value = '');
      },
      [a, re, w, P, E]
    ),
    Ce = d.useCallback(
      (ne) => {
        if ((ha(ne), a)) return;
        const ue = R0(ne);
        if (
          (ne.target &&
            !Z.current.includes(ne.target) &&
            Z.current.push(ne.target),
          ee)
        )
          return;
        const { rejectedFiles: Ae } = re(ue);
        W(!0), z(Ae.length > 0), A && A();
      },
      [a, ee, re, A]
    ),
    Fe = d.useCallback(
      (ne) => {
        ha(ne), !a && D && D();
      },
      [a, D]
    ),
    Le = d.useCallback(
      (ne) => {
        ne.preventDefault(),
          !a &&
            ((Z.current = Z.current.filter((ue) => {
              const Ae = t && !Kr ? document : B.current;
              return ue !== ne.target && Ae && Ae.contains(ue);
            })),
            !(Z.current.length > 0) && (W(!1), z(!1), N && N()));
      },
      [t, a, N]
    ),
    Ie = t && !Kr ? document : B.current;
  Or('drop', ie, Ie),
    Or('dragover', Fe, Ie),
    Or('dragenter', Ce, Ie),
    Or('dragleave', Le, Ie),
    Or('resize', q, Kr ? null : window),
    ju(() => {
      q();
    });
  const nr = d.useId(),
    or = y ?? nr,
    Tt = P1(x),
    un = D1(g),
    lr =
      p === void 0 ? U.translate(`Polaris.DropZone.${un}.overlayText${Tt}`) : p,
    kr =
      v === void 0 ? U.translate(`Polaris.DropZone.errorOverlayText${Tt}`) : v,
    Pr = r || U.translate(`Polaris.DropZone.${un}.label${Tt}`),
    ar = r ? o : !0,
    dn = R(
      _t.DropZone,
      i && _t.hasOutline,
      !i && _t.noOutline,
      $ && _t.focused,
      (u || ee) && _t.isDragging,
      a && _t.isDisabled,
      (I || h) && _t.hasError,
      !b && _t[ge('size', ce)],
      xe && _t.measuring
    ),
    Fr = (u || ee) && !I && !h && m && $t(Bu, lr),
    ir = ee && (I || h) && $t(Au, kr, 'critical'),
    ae = d.useMemo(
      () => ({
        disabled: a,
        focused: $,
        size: ce,
        type: x || 'file',
        measuring: xe,
        allowMultiple: g,
      }),
      [a, $, xe, ce, x, g]
    ),
    sr = d.useCallback(() => {
      j.current && j.current.click();
    }, [j]),
    qe = d.useCallback(() => {
      sr(), S == null || S();
    }, [sr, S]);
  function $t(ne, ue, Ae) {
    return c.createElement(
      'div',
      { className: _t.Overlay },
      c.createElement(
        on,
        { gap: '200', inlineAlign: 'center' },
        ce === 'small' && c.createElement(Ee, { source: ne, tone: Ae }),
        (ce === 'medium' || ce === 'large') &&
          c.createElement(
            X,
            { variant: 'bodySm', as: 'p', fontWeight: 'bold' },
            ue
          )
      )
    );
  }
  function yt(ne) {
    if (!a) return k ? k(ne) : sr();
  }
  return (
    d.useEffect(() => {
      f && qe();
    }, [f, qe]),
    c.createElement(
      T1.Provider,
      { value: ae },
      c.createElement(
        $u,
        { id: or, label: Pr, action: n, labelHidden: ar },
        c.createElement(
          'div',
          {
            ref: B,
            className: dn,
            'aria-disabled': a,
            onClick: yt,
            onDragStart: ha,
          },
          Fr,
          ir,
          c.createElement(
            X,
            { variant: 'bodySm', as: 'span', visuallyHidden: !0 },
            c.createElement('input', {
              id: or,
              accept: s,
              disabled: a,
              multiple: g,
              onChange: ie,
              onFocus: V,
              onBlur: Y,
              type: 'file',
              ref: j,
              autoComplete: 'off',
            })
          ),
          c.createElement('div', { className: _t.Container }, l)
        )
      )
    )
  );
};
function ha(e) {
  e.preventDefault(), e.stopPropagation();
}
Cc.FileUpload = pv;
var hv =
    "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' d='M41.87 24a17.87 17.87 0 11-35.74 0 17.87 17.87 0 0135.74 0zm-3.15 18.96a24 24 0 114.24-4.24L59.04 54.8a3 3 0 11-4.24 4.24L38.72 42.96z' fill='%238C9196'/%3e%3c/svg%3e",
  bv = hv;
function vv({ title: e, description: t, withIllustration: r }) {
  const o = Qe().translate('Polaris.EmptySearchResult.altText'),
    l = t ? c.createElement('p', null, t) : null,
    a = r ? c.createElement(Hu, { alt: o, source: bv, draggable: !1 }) : null;
  return c.createElement(
    Zu,
    { alignment: 'center', vertical: !0 },
    a,
    c.createElement(X, { variant: 'headingLg', as: 'p' }, e),
    c.createElement(X, { tone: 'subdued', as: 'span' }, l)
  );
}
function yv(e, t, r) {
  if (!document) return;
  document.documentElement.style.setProperty(e, t);
}
var xv = { Grid: 'Polaris-Grid' },
  Vn = {
    Cell: 'Polaris-Grid-Cell',
    'Cell-1-column-xs': 'Polaris-Grid-Cell--cell_1ColumnXs',
    'Cell-2-column-xs': 'Polaris-Grid-Cell--cell_2ColumnXs',
    'Cell-3-column-xs': 'Polaris-Grid-Cell--cell_3ColumnXs',
    'Cell-4-column-xs': 'Polaris-Grid-Cell--cell_4ColumnXs',
    'Cell-5-column-xs': 'Polaris-Grid-Cell--cell_5ColumnXs',
    'Cell-6-column-xs': 'Polaris-Grid-Cell--cell_6ColumnXs',
    'Cell-1-column-sm': 'Polaris-Grid-Cell--cell_1ColumnSm',
    'Cell-2-column-sm': 'Polaris-Grid-Cell--cell_2ColumnSm',
    'Cell-3-column-sm': 'Polaris-Grid-Cell--cell_3ColumnSm',
    'Cell-4-column-sm': 'Polaris-Grid-Cell--cell_4ColumnSm',
    'Cell-5-column-sm': 'Polaris-Grid-Cell--cell_5ColumnSm',
    'Cell-6-column-sm': 'Polaris-Grid-Cell--cell_6ColumnSm',
    'Cell-1-column-md': 'Polaris-Grid-Cell--cell_1ColumnMd',
    'Cell-2-column-md': 'Polaris-Grid-Cell--cell_2ColumnMd',
    'Cell-3-column-md': 'Polaris-Grid-Cell--cell_3ColumnMd',
    'Cell-4-column-md': 'Polaris-Grid-Cell--cell_4ColumnMd',
    'Cell-5-column-md': 'Polaris-Grid-Cell--cell_5ColumnMd',
    'Cell-6-column-md': 'Polaris-Grid-Cell--cell_6ColumnMd',
    'Cell-1-column-lg': 'Polaris-Grid-Cell--cell_1ColumnLg',
    'Cell-2-column-lg': 'Polaris-Grid-Cell--cell_2ColumnLg',
    'Cell-3-column-lg': 'Polaris-Grid-Cell--cell_3ColumnLg',
    'Cell-4-column-lg': 'Polaris-Grid-Cell--cell_4ColumnLg',
    'Cell-5-column-lg': 'Polaris-Grid-Cell--cell_5ColumnLg',
    'Cell-6-column-lg': 'Polaris-Grid-Cell--cell_6ColumnLg',
    'Cell-7-column-lg': 'Polaris-Grid-Cell--cell_7ColumnLg',
    'Cell-8-column-lg': 'Polaris-Grid-Cell--cell_8ColumnLg',
    'Cell-9-column-lg': 'Polaris-Grid-Cell--cell_9ColumnLg',
    'Cell-10-column-lg': 'Polaris-Grid-Cell--cell_10ColumnLg',
    'Cell-11-column-lg': 'Polaris-Grid-Cell--cell_11ColumnLg',
    'Cell-12-column-lg': 'Polaris-Grid-Cell--cell_12ColumnLg',
    'Cell-1-column-xl': 'Polaris-Grid-Cell--cell_1ColumnXl',
    'Cell-2-column-xl': 'Polaris-Grid-Cell--cell_2ColumnXl',
    'Cell-3-column-xl': 'Polaris-Grid-Cell--cell_3ColumnXl',
    'Cell-4-column-xl': 'Polaris-Grid-Cell--cell_4ColumnXl',
    'Cell-5-column-xl': 'Polaris-Grid-Cell--cell_5ColumnXl',
    'Cell-6-column-xl': 'Polaris-Grid-Cell--cell_6ColumnXl',
    'Cell-7-column-xl': 'Polaris-Grid-Cell--cell_7ColumnXl',
    'Cell-8-column-xl': 'Polaris-Grid-Cell--cell_8ColumnXl',
    'Cell-9-column-xl': 'Polaris-Grid-Cell--cell_9ColumnXl',
    'Cell-10-column-xl': 'Polaris-Grid-Cell--cell_10ColumnXl',
    'Cell-11-column-xl': 'Polaris-Grid-Cell--cell_11ColumnXl',
    'Cell-12-column-xl': 'Polaris-Grid-Cell--cell_12ColumnXl',
  };
function Sv({ area: e, column: t, columnSpan: r, row: n, children: o }) {
  const l = R(
      Vn.Cell,
      (r == null ? void 0 : r.xs) && Vn[`Cell-${r.xs}-column-xs`],
      (r == null ? void 0 : r.sm) && Vn[`Cell-${r.sm}-column-sm`],
      (r == null ? void 0 : r.md) && Vn[`Cell-${r.md}-column-md`],
      (r == null ? void 0 : r.lg) && Vn[`Cell-${r.lg}-column-lg`],
      (r == null ? void 0 : r.xl) && Vn[`Cell-${r.xl}-column-xl`]
    ),
    a = {
      gridArea: e,
      '--pc-column-xs': t == null ? void 0 : t.xs,
      '--pc-column-sm': t == null ? void 0 : t.sm,
      '--pc-column-md': t == null ? void 0 : t.md,
      '--pc-column-lg': t == null ? void 0 : t.lg,
      '--pc-column-xl': t == null ? void 0 : t.xl,
      '--pc-row-xs': n == null ? void 0 : n.xs,
      '--pc-row-sm': n == null ? void 0 : n.sm,
      '--pc-row-md': n == null ? void 0 : n.md,
      '--pc-row-lg': n == null ? void 0 : n.lg,
      '--pc-row-xl': n == null ? void 0 : n.xl,
    };
  return c.createElement('div', { className: l, style: a }, o);
}
const wc = function ({ gap: t, areas: r, children: n, columns: o }) {
  const l = {
    '--pc-grid-gap-xs': t == null ? void 0 : t.xs,
    '--pc-grid-gap-sm': t == null ? void 0 : t.sm,
    '--pc-grid-gap-md': t == null ? void 0 : t.md,
    '--pc-grid-gap-lg': t == null ? void 0 : t.lg,
    '--pc-grid-gap-xl': t == null ? void 0 : t.xl,
    '--pc-grid-columns-xs': o == null ? void 0 : o.xs,
    '--pc-grid-columns-sm': o == null ? void 0 : o.sm,
    '--pc-grid-columns-md': o == null ? void 0 : o.md,
    '--pc-grid-columns-lg': o == null ? void 0 : o.lg,
    '--pc-grid-columns-xl': o == null ? void 0 : o.xl,
    '--pc-grid-areas-xs': Ho(r == null ? void 0 : r.xs),
    '--pc-grid-areas-sm': Ho(r == null ? void 0 : r.sm),
    '--pc-grid-areas-md': Ho(r == null ? void 0 : r.md),
    '--pc-grid-areas-lg': Ho(r == null ? void 0 : r.lg),
    '--pc-grid-areas-xl': Ho(r == null ? void 0 : r.xl),
  };
  return c.createElement('div', { className: xv.Grid, style: l }, n);
};
function Ho(e) {
  if (e) return `'${e == null ? void 0 : e.join("' '")}'`;
}
wc.Cell = Sv;
var M = {
  IndexTable: 'Polaris-IndexTable',
  IndexTableWrapper: 'Polaris-IndexTable__IndexTableWrapper',
  'IndexTableWrapper-scrollBarHidden':
    'Polaris-IndexTable__IndexTableWrapper--scrollBarHidden',
  IndexTableWrapperWithSelectAllActions:
    'Polaris-IndexTable__IndexTableWrapperWithSelectAllActions',
  LoadingPanel: 'Polaris-IndexTable__LoadingPanel',
  LoadingPanelEntered: 'Polaris-IndexTable__LoadingPanelEntered',
  LoadingPanelRow: 'Polaris-IndexTable__LoadingPanelRow',
  LoadingPanelText: 'Polaris-IndexTable__LoadingPanelText',
  Table: 'Polaris-IndexTable__Table',
  'Table-scrolling': 'Polaris-IndexTable__Table--scrolling',
  'TableCell-first': 'Polaris-IndexTable__TableCell--first',
  'StickyTable-scrolling': 'Polaris-IndexTable__StickyTable--scrolling',
  TableCell: 'Polaris-IndexTable__TableCell',
  'TableHeading-first': 'Polaris-IndexTable__TableHeading--first',
  'TableHeading-second': 'Polaris-IndexTable__TableHeading--second',
  'Table-sticky': 'Polaris-IndexTable__Table--sticky',
  StickyTable: 'Polaris-IndexTable__StickyTable',
  'Table-unselectable': 'Polaris-IndexTable__Table--unselectable',
  TableRow: 'Polaris-IndexTable__TableRow',
  'TableRow-unclickable': 'Polaris-IndexTable__TableRow--unclickable',
  toneSuccess: 'Polaris-IndexTable--toneSuccess',
  'TableRow-child': 'Polaris-IndexTable__TableRow--child',
  toneWarning: 'Polaris-IndexTable--toneWarning',
  toneCritical: 'Polaris-IndexTable--toneCritical',
  toneSubdued: 'Polaris-IndexTable--toneSubdued',
  'TableRow-subheader': 'Polaris-IndexTable__TableRow--subheader',
  'TableRow-selected': 'Polaris-IndexTable__TableRow--selected',
  'TableRow-hovered': 'Polaris-IndexTable__TableRow--hovered',
  'TableRow-disabled': 'Polaris-IndexTable__TableRow--disabled',
  ZebraStriping: 'Polaris-IndexTable__ZebraStriping',
  TableHeading: 'Polaris-IndexTable__TableHeading',
  'TableHeading-flush': 'Polaris-IndexTable__TableHeading--flush',
  'TableHeading-align-center': 'Polaris-IndexTable--tableHeadingAlignCenter',
  'TableHeading-align-end': 'Polaris-IndexTable--tableHeadingAlignEnd',
  'TableHeading-extra-padding-right':
    'Polaris-IndexTable--tableHeadingExtraPaddingRight',
  'TableHeading-sortable': 'Polaris-IndexTable__TableHeading--sortable',
  TableHeadingSortButton: 'Polaris-IndexTable__TableHeadingSortButton',
  TableHeadingSortIcon: 'Polaris-IndexTable__TableHeadingSortIcon',
  'TableHeadingSortButton-heading-align-end':
    'Polaris-IndexTable--tableHeadingSortButtonHeadingAlignEnd',
  'TableHeadingSortButton-heading-align-end-currently-sorted':
    'Polaris-IndexTable--tableHeadingSortButtonHeadingAlignEndCurrentlySorted',
  'TableHeadingSortIcon-heading-align-end':
    'Polaris-IndexTable--tableHeadingSortIconHeadingAlignEnd',
  'TableHeadingSortButton-heading-align-end-previously-sorted':
    'Polaris-IndexTable--tableHeadingSortButtonHeadingAlignEndPreviouslySorted',
  'right-aligned-sort-button-slide-out':
    'Polaris-IndexTable--rightAlignedSortButtonSlideOut',
  'reveal-right-aligned-sort-button-icon':
    'Polaris-IndexTable--revealRightAlignedSortButtonIcon',
  TableHeadingUnderline: 'Polaris-IndexTable__TableHeadingUnderline',
  TableHeadingTooltipUnderlinePlaceholder:
    'Polaris-IndexTable__TableHeadingTooltipUnderlinePlaceholder',
  'TableHeadingSortIcon-visible':
    'Polaris-IndexTable__TableHeadingSortIcon--visible',
  TableHeadingSortSvg: 'Polaris-IndexTable__TableHeadingSortSvg',
  SortableTableHeadingWithCustomMarkup:
    'Polaris-IndexTable__SortableTableHeadingWithCustomMarkup',
  SortableTableHeaderWrapper: 'Polaris-IndexTable__SortableTableHeaderWrapper',
  ColumnHeaderCheckboxWrapper:
    'Polaris-IndexTable__ColumnHeaderCheckboxWrapper',
  FirstStickyHeaderElement: 'Polaris-IndexTable__FirstStickyHeaderElement',
  'TableHeading-unselectable': 'Polaris-IndexTable__TableHeading--unselectable',
  'TableCell-flush': 'Polaris-IndexTable__TableCell--flush',
  'Table-sticky-scrolling': 'Polaris-IndexTable--tableStickyScrolling',
  'StickyTableHeader-sticky-scrolling':
    'Polaris-IndexTable--stickyTableHeaderStickyScrolling',
  'TableHeading-last': 'Polaris-IndexTable__TableHeading--last',
  'Table-sticky-last': 'Polaris-IndexTable--tableStickyLast',
  'StickyTableHeader-sticky-last':
    'Polaris-IndexTable--stickyTableHeaderStickyLast',
  'Table-sortable': 'Polaris-IndexTable__Table--sortable',
  StickyTableHeader: 'Polaris-IndexTable__StickyTableHeader',
  'StickyTableHeader-isSticky':
    'Polaris-IndexTable__StickyTableHeader--isSticky',
  StickyTableHeadings: 'Polaris-IndexTable__StickyTableHeadings',
  'StickyTableHeading-second': 'Polaris-IndexTable__StickyTableHeading--second',
  unselectable: 'Polaris-IndexTable--unselectable',
  'StickyTableHeading-second-scrolling':
    'Polaris-IndexTable--stickyTableHeadingSecondScrolling',
  ScrollLeft: 'Polaris-IndexTable__ScrollLeft',
  ScrollRight: 'Polaris-IndexTable__ScrollRight',
  'ScrollRight-onboarding': 'Polaris-IndexTable__ScrollRight--onboarding',
  SelectAllActionsWrapper: 'Polaris-IndexTable__SelectAllActionsWrapper',
  SelectAllActionsWrapperWithPagination:
    'Polaris-IndexTable__SelectAllActionsWrapperWithPagination',
  SelectAllActionsWrapperSticky:
    'Polaris-IndexTable__SelectAllActionsWrapperSticky',
  SelectAllActionsWrapperAtEnd:
    'Polaris-IndexTable__SelectAllActionsWrapperAtEnd',
  SelectAllActionsWrapperAtEndAppear:
    'Polaris-IndexTable__SelectAllActionsWrapperAtEndAppear',
  BulkActionsWrapper: 'Polaris-IndexTable__BulkActionsWrapper',
  BulkActionsWrapperVisible: 'Polaris-IndexTable__BulkActionsWrapperVisible',
  PaginationWrapper: 'Polaris-IndexTable__PaginationWrapper',
  PaginationWrapperScrolledPastTop:
    'Polaris-IndexTable__PaginationWrapperScrolledPastTop',
  ScrollBarContainer: 'Polaris-IndexTable__ScrollBarContainer',
  ScrollBarContainerWithPagination:
    'Polaris-IndexTable__ScrollBarContainerWithPagination',
  ScrollBarContainerScrolledPastTop:
    'Polaris-IndexTable__ScrollBarContainerScrolledPastTop',
  ScrollBarContainerWithSelectAllActions:
    'Polaris-IndexTable__ScrollBarContainerWithSelectAllActions',
  ScrollBarContainerSelectAllActionsSticky:
    'Polaris-IndexTable__ScrollBarContainerSelectAllActionsSticky',
  scrollBarContainerCondensed:
    'Polaris-IndexTable--scrollBarContainerCondensed',
  scrollBarContainerHidden: 'Polaris-IndexTable--scrollBarContainerHidden',
  ScrollBar: 'Polaris-IndexTable__ScrollBar',
  disableTextSelection: 'Polaris-IndexTable--disableTextSelection',
  EmptySearchResultWrapper: 'Polaris-IndexTable__EmptySearchResultWrapper',
  condensedRow: 'Polaris-IndexTable--condensedRow',
  CondensedList: 'Polaris-IndexTable__CondensedList',
  HeaderWrapper: 'Polaris-IndexTable__HeaderWrapper',
  'StickyTable-condensed': 'Polaris-IndexTable__StickyTable--condensed',
  'StickyTableHeader-condensed':
    'Polaris-IndexTable__StickyTableHeader--condensed',
  ScrollBarContent: 'Polaris-IndexTable__ScrollBarContent',
};
const jr = 'All';
let Ue = (function (e) {
  return (
    (e.All = 'all'),
    (e.Page = 'page'),
    (e.Multi = 'multi'),
    (e.Single = 'single'),
    (e.Range = 'range'),
    e
  );
})({});
const I1 = d.createContext(void 0),
  A1 = d.createContext(void 0),
  N1 = d.createContext(void 0);
function _1() {
  const e = d.useContext(A1);
  if (!e) throw new Error('Missing IndexProvider context');
  return e;
}
function Ev() {
  const e = d.useContext(N1);
  if (!e) throw new Error('Missing IndexProvider context');
  return e;
}
function M1() {
  const e = d.useContext(I1);
  if (!e) throw new Error('Missing IndexProvider context');
  return e;
}
function Cv({
  selectedItemsCount: e,
  itemCount: t,
  hasMoreItems: r,
  resourceName: n,
  defaultPaginatedSelectAllText: o,
}) {
  const l = Qe(),
    a = !!e,
    i = e === 'All' || e > 0,
    s = {
      singular: l.translate('Polaris.IndexProvider.defaultItemSingular'),
      plural: l.translate('Polaris.IndexProvider.defaultItemPlural'),
    },
    u = n || s,
    m = y(),
    g = x(),
    p = k();
  let v = 'indeterminate';
  return (
    !e || e === 0 ? (v = void 0) : (e === jr || e === t) && (v = !0),
    {
      paginatedSelectAllText: m,
      bulkActionsLabel: g,
      bulkActionsAccessibilityLabel: p,
      resourceName: u,
      selectMode: i,
      bulkSelectState: v,
      selectable: a,
    }
  );
  function y() {
    if (!(!a || !r) && e === jr)
      return (
        o ||
        l.translate('Polaris.IndexProvider.allItemsSelected', {
          itemsLength: t,
          resourceNamePlural: u.plural.toLocaleLowerCase(),
        })
      );
  }
  function x() {
    const h = e === jr ? `${t}+` : e;
    return l.translate('Polaris.IndexProvider.selected', {
      selectedItemsCount: h,
    });
  }
  function k() {
    const h = t,
      f = e === h;
    return h === 1 && f
      ? l.translate('Polaris.IndexProvider.a11yCheckboxDeselectAllSingle', {
          resourceNameSingular: u.singular,
        })
      : h === 1
      ? l.translate('Polaris.IndexProvider.a11yCheckboxSelectAllSingle', {
          resourceNameSingular: u.singular,
        })
      : f
      ? l.translate('Polaris.IndexProvider.a11yCheckboxDeselectAllMultiple', {
          itemsLength: t,
          resourceNamePlural: u.plural,
        })
      : l.translate('Polaris.IndexProvider.a11yCheckboxSelectAllMultiple', {
          itemsLength: t,
          resourceNamePlural: u.plural,
        });
  }
}
function wv({ onSelectionChange: e = () => {} }) {
  const t = d.useRef(null);
  return d.useCallback(
    (n, o, l, a) => {
      const i = t.current;
      if (
        (Ue.Multi && typeof a == 'number' && (t.current = a),
        n === Ue.Single ||
          (n === Ue.Multi && (typeof i != 'number' || typeof a != 'number')))
      )
        e(Ue.Single, o, l);
      else if (n === Ue.Multi) {
        const s = Math.min(i, a),
          u = Math.max(i, a);
        e(n, o, [s, u]);
      } else
        n === Ue.Page || n === Ue.All
          ? e(n, o)
          : n === Ue.Range && e(Ue.Range, o, l);
    },
    [e]
  );
}
function kv({
  children: e,
  resourceName: t,
  loading: r,
  onSelectionChange: n,
  selectedItemsCount: o = 0,
  itemCount: l,
  hasMoreItems: a,
  condensed: i,
  selectable: s = !0,
  paginatedSelectAllText: u,
}) {
  const {
      paginatedSelectAllText: m,
      bulkActionsLabel: g,
      bulkActionsAccessibilityLabel: p,
      resourceName: v,
      selectMode: y,
      bulkSelectState: x,
    } = Cv({
      selectedItemsCount: o,
      itemCount: l,
      hasMoreItems: a,
      resourceName: t,
      defaultPaginatedSelectAllText: u,
    }),
    k = wv({ onSelectionChange: n }),
    h = d.useMemo(
      () => ({
        itemCount: l,
        selectMode: y && s,
        selectable: s,
        resourceName: v,
        loading: r,
        paginatedSelectAllText: m,
        hasMoreItems: a,
        bulkActionsLabel: g,
        bulkActionsAccessibilityLabel: p,
        bulkSelectState: x,
        selectedItemsCount: o,
        condensed: i,
      }),
      [l, y, s, v, r, m, a, g, p, x, o, i]
    ),
    f = d.useMemo(
      () => ({ selectable: s, selectMode: y && s, condensed: i }),
      [i, y, s]
    );
  return c.createElement(
    I1.Provider,
    { value: h },
    c.createElement(
      N1.Provider,
      { value: f },
      c.createElement(A1.Provider, { value: k }, e)
    )
  );
}
const Yu = d.createContext({}),
  Pv = d.createContext(void 0),
  B1 = { scrollableContainer: null, canScrollLeft: !1, canScrollRight: !1 },
  Fv = d.createContext(B1),
  L1 = d.memo(function ({
    children: t,
    className: r,
    flush: n,
    colSpan: o,
    headers: l,
    scope: a,
    as: i = 'td',
    id: s,
  }) {
    const u = R(r, M.TableCell, n && M['TableCell-flush']);
    return c.createElement(
      i,
      { id: s, colSpan: o, headers: l, scope: a, className: u },
      t
    );
  });
var Dv = { Wrapper: 'Polaris-IndexTable-Checkbox__Wrapper' };
const Tv = d.memo(function ({ accessibilityLabel: t }) {
  const r = Qe(),
    { resourceName: n } = M1(),
    {
      itemId: o,
      selected: l,
      disabled: a,
      onInteraction: i,
    } = d.useContext(Yu),
    s =
      t ||
      r.translate('Polaris.IndexTable.selectItem', {
        resourceName: n.singular,
      });
  return c.createElement(
    Iv,
    null,
    c.createElement(
      'div',
      { className: Dv.Wrapper, onClick: i, onKeyUp: Av },
      c.createElement(Gu, {
        id: `Select-${o}`,
        label: s,
        labelHidden: !0,
        checked: l,
        disabled: a,
      })
    )
  );
});
function Iv({ children: e }) {
  const { position: t } = d.useContext(Yu),
    r = d.useRef(null),
    n = d.useCallback(
      tr(() => {
        if (t !== 0 || !r.current) return;
        const { width: l } = r.current.getBoundingClientRect();
        yv('--pc-checkbox-offset', `${l}px`);
      }),
      [t]
    );
  d.useEffect(() => {
    n();
  }, [n]),
    d.useEffect(() => {
      if (r.current)
        return (
          window.addEventListener('resize', n),
          () => {
            window.removeEventListener('resize', n);
          }
        );
    }, [n]);
  const o = R(M.TableCell, M['TableCell-first']);
  return c.createElement('td', { className: o, ref: r }, e);
}
function Av() {}
const Nv = d.memo(function ({
  children: t,
  hideSelectable: r,
  selected: n,
  id: o,
  position: l,
  tone: a,
  disabled: i,
  selectionRange: s,
  rowType: u = 'data',
  accessibilityLabel: m,
  onNavigation: g,
  onClick: p,
}) {
  const { selectable: v, selectMode: y, condensed: x } = Ev(),
    k = v && !r,
    h = _1(),
    { value: f, setTrue: b, setFalse: S } = Sr(!1),
    F = d.useCallback(
      (q) => {
        q.stopPropagation();
        let ee = Ue.Single;
        if (i || !k || ('key' in q && q.key !== ' ') || !h) return;
        q.nativeEvent.shiftKey ? (ee = Ue.Multi) : s && (ee = Ue.Range),
          h(ee, !n, s ?? o, l);
      },
      [o, h, n, s, l, i, k]
    ),
    w = d.useMemo(
      () => ({
        itemId: o,
        selected: n,
        position: l,
        onInteraction: F,
        disabled: i,
      }),
      [o, n, i, l, F]
    ),
    P = d.useRef(null),
    E = d.useRef(!1),
    A = d.useRef(null),
    D = d.useCallback((q) => {
      A.current = q;
      const ee = q == null ? void 0 : q.querySelector('[data-primary-link]');
      ee && (P.current = ee);
    }, []),
    N = R(
      M.TableRow,
      u === 'subheader' && M['TableRow-subheader'],
      u === 'child' && M['TableRow-child'],
      k && x && M.condensedRow,
      n && M['TableRow-selected'],
      f && !x && M['TableRow-hovered'],
      i && M['TableRow-disabled'],
      a && M[ge('tone', a)],
      !k && !p && !P.current && M['TableRow-unclickable']
    );
  let B;
  ((!i && k) || p || P.current) &&
    (B = (q) => {
      if (u !== 'subheader' && !(!A.current || E.current)) {
        if ((q.stopPropagation(), q.preventDefault(), p)) {
          p();
          return;
        }
        if (P.current && !y) {
          E.current = !0;
          const { ctrlKey: ee, metaKey: W } = q.nativeEvent;
          if (
            (g && g(o), (ee || W) && P.current instanceof HTMLAnchorElement)
          ) {
            (E.current = !1), window.open(P.current.href, '_blank');
            return;
          }
          P.current.dispatchEvent(new MouseEvent(q.type, q.nativeEvent));
        } else (E.current = !1), F(q);
      }
    });
  const j = x ? 'li' : 'tr',
    Z = r
      ? c.createElement(L1, null)
      : c.createElement(Tv, { accessibilityLabel: m });
  return c.createElement(
    Yu.Provider,
    { value: w },
    c.createElement(
      Pv.Provider,
      { value: f },
      c.createElement(
        j,
        {
          key: o,
          id: o,
          className: N,
          onMouseEnter: b,
          onMouseLeave: S,
          onClick: B,
          ref: D,
        },
        v ? Z : null,
        t
      )
    )
  );
});
function z0(e, t) {
  return e ? Array.from(e.querySelectorAll(t)) : [];
}
var _v = { ScrollContainer: 'Polaris-IndexTable-ScrollContainer' };
function Mv({ children: e, scrollableContainerRef: t, onScroll: r }) {
  d.useEffect(() => {
    t.current && t.current.dispatchEvent(new Event('scroll'));
  }, [t]);
  const [n, o] = d.useState(B1),
    l = d.useCallback(
      tr(
        () => {
          if (!t.current) return;
          const a = t.current.scrollWidth - t.current.offsetWidth,
            i = t.current.scrollLeft > 0,
            s = t.current.scrollLeft < a;
          r(i, s),
            o({
              scrollableContainer: t.current,
              canScrollLeft: i,
              canScrollRight: s,
            });
        },
        40,
        { trailing: !0, leading: !0, maxWait: 40 }
      ),
      [r, t]
    );
  return c.createElement(
    Fv.Provider,
    { value: n },
    c.createElement(
      'div',
      { className: _v.ScrollContainer, ref: t, onScroll: l },
      e
    )
  );
}
const Bv = 16,
  Lv = 300;
function Rv({
  headings: e,
  bulkActions: t = [],
  promotedBulkActions: r = [],
  children: n,
  emptyState: o,
  sort: l,
  paginatedSelectAllActionText: a,
  lastColumnSticky: i = !1,
  sortable: s,
  sortDirection: u,
  defaultSortDirection: m = 'descending',
  sortColumnIndex: g,
  onSort: p,
  sortToggleLabels: v,
  hasZebraStriping: y,
  pagination: x,
  ...k
}) {
  const {
      loading: h,
      bulkSelectState: f,
      resourceName: b,
      bulkActionsAccessibilityLabel: S,
      selectMode: F,
      selectable: w = k.selectable,
      paginatedSelectAllText: P,
      itemCount: E,
      hasMoreItems: A,
      selectedItemsCount: D,
      condensed: N,
    } = M1(),
    B = _1(),
    j = Qe(),
    { value: Z, toggle: q } = Sr(!1),
    ee = d.useRef({ top: 0, left: 0 }),
    W = d.useRef([]),
    I = d.useRef(null),
    z = d.useRef(null),
    $ = d.useRef(null),
    V = d.useRef(null),
    [Y, ce] = d.useState(!1),
    [he, xe] = d.useState(null),
    [G, U] = d.useState(!0),
    re = d.useRef([]),
    ie = d.useRef([]),
    Ce = d.useRef(null),
    Fe = d.useRef(null),
    Le = d.useRef(null),
    Ie = d.useRef(null),
    nr = d.useRef(null),
    or = d.useRef(!1),
    Tt = d.useRef(!1),
    un = d.useRef(g),
    lr = d.useRef(!1),
    kr = d.useRef(0),
    Pr = d.useRef(!1);
  D !== kr.current && ((lr.current = !0), (kr.current = D)),
    !Pr.current && D !== 0 && (Pr.current = !0);
  const ar = d.useCallback(
      (L) => {
        L !== null && !Y && ce(!0), ($.current = L);
      },
      [Y]
    ),
    dn = d.useCallback(() => {
      B(D === jr ? Ue.Page : Ue.All, !0);
    }, [B, D]),
    Fr = d.useMemo(
      () =>
        tr(() => {
          var te, Re;
          if (!z.current || !I.current) return;
          const L = I.current.getBoundingClientRect();
          (ee.current = { top: L.top, left: L.left }),
            (W.current = re.current.map((De) => ({
              offsetWidth: De.offsetWidth || 0,
              offsetLeft: De.offsetLeft || 0,
            }))),
            re.current.length !== 0 &&
              (w &&
                re.current.length > 1 &&
                ((re.current[1].style.left = `${W.current[0].offsetWidth}px`),
                (te = ie.current) != null &&
                  te.length &&
                  (ie.current[1].style.left = `${W.current[0].offsetWidth}px`)),
              (Re = ie.current) != null &&
                Re.length &&
                ie.current.forEach((De, xt) => {
                  var It;
                  De.style.minWidth = `${
                    ((It = W.current[xt]) == null ? void 0 : It.offsetWidth) ||
                    0
                  }px`;
                }));
        }),
      [w]
    ),
    ir = d.useCallback(() => {
      var L, te;
      Ie.current &&
        z.current &&
        Y &&
        (Ie.current.style.setProperty(
          '--pc-index-table-scroll-bar-content-width',
          `${z.current.offsetWidth - Bv}px`
        ),
        U(
          ((L = nr.current) == null ? void 0 : L.offsetWidth) ===
            ((te = z.current) == null ? void 0 : te.offsetWidth)
        ));
    }, [Y]),
    ae = d.useCallback(tr(ir, Lv, { trailing: !0 }), [ir]),
    [sr, qe] = d.useState(!0),
    $t = d.useCallback(
      tr(() => {
        if (!i || !z.current || !I.current) return;
        const L = z.current.getBoundingClientRect(),
          te = I.current.getBoundingClientRect();
        qe(L.width > te.width);
      }),
      [i]
    );
  d.useEffect(() => {
    $t();
  }, [$t]);
  const [yt, ne] = d.useState(!0),
    ue = d.useCallback(() => {
      if (!I.current || !re.current.length) return;
      const L = I.current.getBoundingClientRect(),
        te = w ? re.current[0].getBoundingClientRect().width : 0,
        Re = re.current[w ? 1 : 0].getBoundingClientRect().width,
        De = w ? re.current.length > 2 : 1,
        xt =
          i && De
            ? re.current[re.current.length - 1].getBoundingClientRect().width
            : 0;
      ne(L.width > Re + te + xt + 100);
    }, [i, w]);
  d.useEffect(() => {
    Y && ue();
  }, [ue, Y]);
  const Ae = d.useCallback(() => {
      var L;
      (L = Ie.current) == null ||
        L.style.setProperty('--pc-index-table-scroll-bar-content-width', '0px'),
        Fr(),
        ae(),
        $t(),
        ue();
    }, [Fr, ae, $t, ue]),
    rt = d.useCallback(
      (L, te) => {
        !I.current ||
          !Ie.current ||
          (or.current ||
            ((Tt.current = !0), (Ie.current.scrollLeft = I.current.scrollLeft)),
          (or.current = !1),
          Le.current && (Le.current.scrollLeft = I.current.scrollLeft),
          ((L && !Z) || (!L && Z)) && q(),
          qe(te));
      },
      [Z, q]
    ),
    Ut = d.useCallback(() => {
      !I.current ||
        !Ie.current ||
        (Tt.current ||
          ((or.current = !0), (I.current.scrollLeft = Ie.current.scrollLeft)),
        (Tt.current = !1));
    }, []);
  Nn(() => {
    (re.current = z0(z.current, '[data-index-table-heading]')),
      (ie.current = z0(Ce.current, '[data-index-table-sticky-heading]')),
      Fr();
  }, [e, Fr, Fe, Y]),
    d.useEffect(() => {
      ir(), xe(N ? V.current : z.current);
    }, [Y, ir, N]);
  const Dr = e.map((L, te) =>
      Ul(L, te, 'th', { 'data-index-table-heading': !0 }, L.id)
    ),
    fn = e.map((L, te) =>
      Ul(L, te, 'div', { 'data-index-table-sticky-heading': !0 })
    ),
    [Rl, zl] = d.useState(D === jr ? `${E}+` : D);
  d.useEffect(() => {
    (D === jr || D > 0) && zl(D === jr ? `${E}+` : D);
  }, [D, E]);
  const Ol = j.translate('Polaris.IndexTable.selected', {
      selectedItemsCount: Rl,
    }),
    Si = d.useCallback(() => {
      B(Ue.Page, !f || f === 'indeterminate');
    }, [f, B]),
    Ei = Gl(),
    Tr = c.createElement(
      'div',
      { className: R(M.LoadingPanel, h && M.LoadingPanelEntered) },
      c.createElement(
        'div',
        { className: M.LoadingPanelRow },
        c.createElement(Ou, { size: 'small' }),
        c.createElement(
          'span',
          { className: M.LoadingPanelText },
          j.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', {
            resourceNamePlural: b.plural.toLocaleLowerCase(),
          })
        )
      )
    ),
    Ci = R(
      M.StickyTable,
      Z && M['StickyTable-scrolling'],
      N && M['StickyTable-condensed']
    ),
    Po = !N || D,
    Hl = Po ? r : [],
    wi = Po ? t : [],
    jl = c.createElement(
      'div',
      { className: Ci, role: 'presentation' },
      c.createElement(iv, { boundingElement: he }, (L) => {
        const te = R(
            M.StickyTableHeader,
            L && M['StickyTableHeader-isSticky'],
            yt && M['StickyTableHeader-sticky'],
            Z && M['StickyTableHeader-scrolling'],
            yt && i && M['StickyTableHeader-sticky-last'],
            yt && i && sr && M['StickyTableHeader-sticky-scrolling']
          ),
          Re = R(
            M.BulkActionsWrapper,
            F && M.BulkActionsWrapperVisible,
            N && M['StickyTableHeader-condensed'],
            L && M['StickyTableHeader-isSticky']
          ),
          De =
            Po && !N
              ? c.createElement(
                  'div',
                  { className: Re },
                  c.createElement(ev, {
                    selectMode: F,
                    onToggleAll: Si,
                    paginatedSelectAllText: P,
                    paginatedSelectAllAction: Ei,
                    accessibilityLabel: S,
                    selected: f,
                    promotedActions: Hl,
                    actions: wi,
                    onSelectModeToggle: N ? Ni : void 0,
                    label: Ol,
                    buttonSize: 'micro',
                  })
                )
              : null,
          xt = N
            ? c.createElement(
                'div',
                { className: R(M.HeaderWrapper, (!w || N) && M.unselectable) },
                Tr,
                l
              )
            : c.createElement(
                'div',
                { className: te, ref: Ce },
                Tr,
                c.createElement(
                  'div',
                  { className: M.StickyTableHeadings, ref: Le },
                  fn
                )
              );
        return c.createElement(c.Fragment, null, xt, De);
      })
    ),
    qu = R(
      M.ScrollBarContainer,
      x && M.ScrollBarContainerWithPagination,
      N && M.scrollBarContainerCondensed,
      G && M.scrollBarContainerHidden
    ),
    ki = R(z.current && Y && M.ScrollBarContent),
    mn =
      E > 0
        ? c.createElement(
            nv,
            { onMount: ir },
            c.createElement(
              'div',
              { className: qu, ref: nr },
              c.createElement(
                'div',
                { onScroll: Ut, className: M.ScrollBar, ref: Ie },
                c.createElement('div', { className: ki })
              )
            )
          )
        : null,
    Fo = s == null ? void 0 : s.some((L) => L),
    Pi = R(
      M.Table,
      Z && M['Table-scrolling'],
      F && M.disableTextSelection,
      !w && M['Table-unselectable'],
      yt && M['Table-sticky'],
      Fo && M['Table-sortable'],
      yt && i && M['Table-sticky-last'],
      yt && i && sr && M['Table-sticky-scrolling'],
      y && M.ZebraStriping
    ),
    Fi =
      o ||
      c.createElement(vv, {
        title: j.translate('Polaris.IndexTable.emptySearchTitle', {
          resourceNamePlural: b.plural,
        }),
        description: j.translate('Polaris.IndexTable.emptySearchDescription'),
        withIllustration: !0,
      }),
    $l = c.createElement(
      c.Fragment,
      null,
      c.createElement(xo, { event: 'resize', handler: Ae }),
      jl
    ),
    Di = R(M.CondensedList, y && M.ZebraStriping),
    Ti = N
      ? c.createElement(
          c.Fragment,
          null,
          $l,
          c.createElement(
            'ul',
            { 'data-selectmode': !!F, className: Di, ref: V },
            n
          )
        )
      : c.createElement(
          c.Fragment,
          null,
          $l,
          c.createElement(
            Mv,
            { scrollableContainerRef: I, onScroll: rt },
            c.createElement(
              'table',
              { ref: z, className: Pi },
              c.createElement(
                'thead',
                null,
                c.createElement('tr', { className: M.HeadingRow }, Dr)
              ),
              c.createElement('tbody', { ref: ar }, n)
            )
          )
        ),
    gn =
      E > 0
        ? Ti
        : c.createElement('div', { className: M.EmptySearchResultWrapper }, Fi),
    pn = x
      ? c.createElement(
          'div',
          { className: M.PaginationWrapper },
          c.createElement(rv, Object.assign({ type: 'table' }, x))
        )
      : null;
  return c.createElement(
    c.Fragment,
    null,
    c.createElement(
      'div',
      { className: M.IndexTable },
      c.createElement(
        'div',
        { className: M.IndexTableWrapper },
        !N && Tr,
        gn,
        mn,
        pn
      )
    )
  );
  function Ul(L, te, Re, De, xt) {
    const It = te === 0,
      Ir = te === e.length - 1,
      St = s == null ? void 0 : s.some((Q) => Q === !0),
      Ar = L.alignment || 'start',
      On = R(
        M.TableHeading,
        Ar === 'center' && M['TableHeading-align-center'],
        Ar === 'end' && M['TableHeading-align-end'],
        St && M['TableHeading-sortable'],
        It && M['TableHeading-second'],
        Ir && !L.hidden && M['TableHeading-last'],
        !w && M['TableHeading-unselectable'],
        L.flush && M['TableHeading-flush']
      ),
      Hn =
        w !== !1 && It && W.current && W.current.length > 0
          ? { left: W.current[0].offsetWidth }
          : void 0,
      Wt = c.createElement(
        Re,
        Object.assign({ id: xt, className: On, key: zv(L), style: Hn }, De),
        Vl(L, te)
      );
    if (te !== 0 || !w) return Wt;
    const hn = R(
      M.TableHeading,
      St && M['TableHeading-sortable'],
      te === 0 && M['TableHeading-first']
    );
    return [
      c.createElement(
        Re,
        Object.assign({ className: hn, key: `${L}-${te}` }, De),
        Wl()
      ),
      Wt,
    ];
  }
  function Wl() {
    return c.createElement(
      'div',
      { className: M.ColumnHeaderCheckboxWrapper },
      c.createElement(Gu, {
        label: j.translate('Polaris.IndexTable.selectAllLabel', {
          resourceNamePlural: b.plural,
        }),
        labelHidden: !0,
        onChange: Ai,
        checked: f,
      })
    );
  }
  function Ii(L, te) {
    (lr.current = !1),
      (Pr.current = !1),
      (un.current = g),
      p == null || p(L, te);
  }
  function Vl(L, te) {
    let Re;
    const De = {
        width: L.tooltipWidth ?? 'default',
        activatorWrapper: 'div',
        dismissOnMouseOut: !0,
        persistOnClick: L.tooltipPersistsOnClick,
      },
      xt = {
        ...De,
        padding: '400',
        borderRadius: '200',
        content: L.tooltipContent,
        preferredPosition: 'above',
      },
      It = c.createElement(
        X,
        {
          as: 'span',
          variant: 'bodySm',
          fontWeight: 'medium',
          visuallyHidden: L.hidden,
        },
        L.title
      );
    L.new
      ? (Re = c.createElement(
          Zu,
          { wrap: !1, alignment: 'center' },
          It,
          c.createElement(
            Mn,
            { tone: 'new' },
            j.translate('Polaris.IndexTable.onboardingBadgeText')
          )
        ))
      : (Re = It);
    const Ir = {
      '--pc-index-table-heading-extra-padding-right': L.paddingBlockEnd
        ? `var(--p-space-${L.paddingBlockEnd})`
        : '0',
    };
    if (s != null && s[te]) {
      const St = te === g,
        Ar = !St && te === un.current,
        On = lr.current || (!Pr.current && D !== 0),
        Hn = u === 'ascending';
      let Wt = L.defaultSortDirection ?? m,
        hn = Wt === 'ascending' ? bc : vc;
      St &&
        ((Wt = Hn ? 'descending' : 'ascending'),
        (hn = u === 'ascending' ? bc : vc));
      const O = c.createElement(
          'span',
          {
            className: R(
              M.TableHeadingSortIcon,
              (L == null ? void 0 : L.alignment) === 'end' &&
                M['TableHeadingSortIcon-heading-align-end'],
              St && M['TableHeadingSortIcon-visible']
            ),
          },
          c.createElement(hn, {
            focusable: 'false',
            'aria-hidden': 'true',
            className: M.TableHeadingSortSvg,
          })
        ),
        Q = {
          onClick: () => Ii(te, Wt),
          className: R(
            M.TableHeadingSortButton,
            !St &&
              (L == null ? void 0 : L.alignment) === 'end' &&
              M['TableHeadingSortButton-heading-align-end'],
            St &&
              (L == null ? void 0 : L.alignment) === 'end' &&
              M['TableHeadingSortButton-heading-align-end-currently-sorted'],
            Ar &&
              !On &&
              (L == null ? void 0 : L.alignment) === 'end' &&
              M['TableHeadingSortButton-heading-align-end-previously-sorted']
          ),
          tabIndex: F ? -1 : 0,
        },
        Ne = c.createElement(
          ti,
          Q,
          O,
          c.createElement(
            'span',
            {
              className: R(
                v &&
                  F &&
                  L.tooltipContent &&
                  M.TableHeadingTooltipUnderlinePlaceholder
              ),
            },
            Re
          )
        );
      if (!v || F)
        return c.createElement(
          'div',
          { className: M.SortableTableHeadingWithCustomMarkup },
          Ne
        );
      const je = St ? u : Wt,
        st = v[te][je];
      if (!L.tooltipContent)
        return c.createElement(
          'div',
          {
            style: Ir,
            className: R(
              L.paddingBlockEnd && M['TableHeading-extra-padding-right']
            ),
          },
          c.createElement(
            Wr,
            Object.assign({}, De, { content: st, preferredPosition: 'above' }),
            Ne
          )
        );
      if (L.tooltipContent)
        return c.createElement(
          'div',
          {
            className: R(
              M.SortableTableHeadingWithCustomMarkup,
              L.paddingBlockEnd && M['TableHeading-extra-padding-right']
            ),
            style: Ir,
          },
          c.createElement(
            ti,
            Q,
            c.createElement(
              Wr,
              xt,
              c.createElement(
                'span',
                { className: M.TableHeadingUnderline },
                Re
              )
            ),
            c.createElement(
              Wr,
              Object.assign({}, De, {
                content: st,
                preferredPosition: 'above',
              }),
              O
            )
          )
        );
    }
    return L.tooltipContent
      ? c.createElement(
          'div',
          {
            style: Ir,
            className: R(
              L.paddingBlockEnd && M['TableHeading-extra-padding-right']
            ),
          },
          c.createElement(
            Wr,
            Object.assign({}, xt, { activatorWrapper: 'span' }),
            c.createElement(
              'span',
              {
                className: R(
                  M.TableHeadingUnderline,
                  M.SortableTableHeaderWrapper
                ),
              },
              Re
            )
          )
        )
      : c.createElement(
          'div',
          {
            style: Ir,
            className: R(
              L.paddingBlockEnd && M['TableHeading-extra-padding-right']
            ),
          },
          Re
        );
  }
  function Ai(L) {
    B(Ue.Page, L);
  }
  function Gl() {
    if (!w || !A) return;
    const L =
      a ??
      j.translate('Polaris.IndexTable.selectAllItems', {
        itemsLength: E,
        resourceNamePlural: b.plural.toLocaleLowerCase(),
      });
    return {
      content: D === jr ? j.translate('Polaris.IndexTable.undo') : L,
      onAction: dn,
    };
  }
  function Ni() {
    B(Ue.All, !1);
  }
}
function zv(e) {
  return e.id ? e.id : typeof e.title == 'string' ? e.title : '';
}
function ft({
  children: e,
  selectable: t = !0,
  itemCount: r,
  selectedItemsCount: n = 0,
  resourceName: o,
  loading: l,
  hasMoreItems: a,
  condensed: i,
  onSelectionChange: s,
  paginatedSelectAllText: u,
  ...m
}) {
  return c.createElement(
    c.Fragment,
    null,
    c.createElement(
      kv,
      {
        selectable: t && !i,
        itemCount: r,
        selectedItemsCount: n,
        resourceName: o,
        loading: l,
        hasMoreItems: a,
        condensed: i,
        onSelectionChange: s,
        paginatedSelectAllText: u,
      },
      c.createElement(Rv, m, e)
    )
  );
}
ft.Cell = L1;
ft.Row = Nv;
var Zt = {
  Select: 'Polaris-Select',
  disabled: 'Polaris-Select--disabled',
  error: 'Polaris-Select--error',
  Backdrop: 'Polaris-Select__Backdrop',
  Input: 'Polaris-Select__Input',
  Content: 'Polaris-Select__Content',
  InlineLabel: 'Polaris-Select__InlineLabel',
  Icon: 'Polaris-Select__Icon',
  SelectedOption: 'Polaris-Select__SelectedOption',
  Prefix: 'Polaris-Select__Prefix',
  hover: 'Polaris-Select--hover',
  toneMagic: 'Polaris-Select--toneMagic',
};
const O0 = '';
function H0({
  options: e,
  label: t,
  labelAction: r,
  labelHidden: n,
  labelInline: o,
  disabled: l,
  helpText: a,
  placeholder: i,
  id: s,
  name: u,
  value: m = O0,
  error: g,
  onChange: p,
  onFocus: v,
  onBlur: y,
  requiredIndicator: x,
  tone: k,
}) {
  const { value: h, toggle: f } = Sr(!1),
    b = d.useId(),
    S = s ?? b,
    F = o ? !0 : n,
    w = R(Zt.Select, g && Zt.error, k && Zt[ge('tone', k)], l && Zt.disabled),
    P = d.useCallback(
      (I) => {
        f(), v == null || v(I);
      },
      [v, f]
    ),
    E = d.useCallback(
      (I) => {
        f(), y == null || y(I);
      },
      [y, f]
    ),
    A = p ? (I) => p(I.currentTarget.value, S) : void 0,
    D = [];
  a && D.push(Uu(S)), g && D.push(`${S}Error`);
  let B = (e || []).map(Ov);
  i && (B = [{ label: i, value: O0, disabled: !0 }, ...B]);
  const j =
      o &&
      c.createElement(
        se,
        { paddingInlineEnd: '100' },
        c.createElement(
          X,
          {
            as: 'span',
            variant: 'bodyMd',
            tone: k && k === 'magic' && !h ? 'magic-subdued' : 'subdued',
            truncate: !0,
          },
          t
        )
      ),
    Z = Hv(B, m),
    q = Z.prefix && c.createElement('div', { className: Zt.Prefix }, Z.prefix),
    ee = c.createElement(
      'div',
      { className: Zt.Content, 'aria-hidden': !0, 'aria-disabled': l },
      j,
      q,
      c.createElement('span', { className: Zt.SelectedOption }, Z.label),
      c.createElement(
        'span',
        { className: Zt.Icon },
        c.createElement(Ee, { source: Mu })
      )
    ),
    W = B.map($v);
  return c.createElement(
    $u,
    {
      id: S,
      label: t,
      error: g,
      action: r,
      labelHidden: F,
      helpText: a,
      requiredIndicator: x,
      disabled: l,
    },
    c.createElement(
      'div',
      { className: w },
      c.createElement(
        'select',
        {
          id: S,
          name: u,
          value: m,
          className: Zt.Input,
          disabled: l,
          onFocus: P,
          onBlur: E,
          onChange: A,
          'aria-invalid': !!g,
          'aria-describedby': D.length ? D.join(' ') : void 0,
          'aria-required': x,
        },
        W
      ),
      ee,
      c.createElement('div', { className: Zt.Backdrop })
    )
  );
}
function j0(e) {
  return typeof e == 'string';
}
function Xu(e) {
  return typeof e == 'object' && 'options' in e && e.options != null;
}
function $0(e) {
  return { label: e, value: e };
}
function Ov(e) {
  if (j0(e)) return $0(e);
  if (Xu(e)) {
    const { title: t, options: r } = e;
    return { title: t, options: r.map((n) => (j0(n) ? $0(n) : n)) };
  }
  return e;
}
function Hv(e, t) {
  const r = jv(e);
  let n = r.find((o) => t === o.value);
  return (
    n === void 0 && (n = r.find((o) => !o.hidden)),
    n || { value: '', label: '' }
  );
}
function jv(e) {
  let t = [];
  return (
    e.forEach((r) => {
      Xu(r) ? (t = t.concat(r.options)) : t.push(r);
    }),
    t
  );
}
function U0(e) {
  const { value: t, label: r, prefix: n, key: o, ...l } = e;
  return c.createElement(
    'option',
    Object.assign({ key: o ?? t, value: t }, l),
    r
  );
}
function $v(e) {
  if (Xu(e)) {
    const { title: t, options: r } = e;
    return c.createElement('optgroup', { label: t, key: t }, r.map(U0));
  }
  return U0(e);
}
var gs = {
  Thumbnail: 'Polaris-Thumbnail',
  sizeExtraSmall: 'Polaris-Thumbnail--sizeExtraSmall',
  sizeSmall: 'Polaris-Thumbnail--sizeSmall',
  sizeMedium: 'Polaris-Thumbnail--sizeMedium',
  sizeLarge: 'Polaris-Thumbnail--sizeLarge',
  transparent: 'Polaris-Thumbnail--transparent',
};
function R1({ source: e, alt: t, size: r = 'medium', transparent: n }) {
  const o = R(gs.Thumbnail, r && gs[ge('size', r)], n && gs.transparent),
    l =
      typeof e == 'string'
        ? c.createElement(Hu, { alt: t, source: e })
        : c.createElement(Ee, { accessibilityLabel: t, source: e });
  return c.createElement('span', { className: o }, l);
}
const ri = ({
    setError: e = () => {},
    message: t = 'couldn’t be uploaded more than 5 files',
  }) => C.jsx(H5, { title: t, tone: 'warning', onDismiss: () => e(!1) }),
  Uv = ({ setStep: e, setData: t }) => {
    const [r, n] = d.useState(!1),
      [o, l] = d.useState(''),
      [a, i] = d.useState(''),
      [s, u] = d.useState(''),
      m = window.location.hostname,
      g = (p) => {
        p.preventDefault(),
          n(!0),
          fetch(
            `https://${m}/apps/Shipping-Protection/get-order-fulfilment-data?email=${o}&orderId=${a.replace(
              '#',
              ''
            )}&url=${m}`
          )
            .then((v) => v.json())
            .then((v) => {
              v.status === 404 ? (u(v.error), e(0)) : (u(''), e(1), t(v.data)),
                n(!1);
            })
            .catch((v) => {
              u('something went wrong!'), n(!1), e(0);
            });
      };
    return (
      d.useEffect(() => {
        u('');
      }, [o, a]),
      C.jsx(C.Fragment, {
        children: C.jsxs('div', {
          className: 'container',
          children: [
            C.jsxs('div', {
              style: { padding: '20px 0px' },
              children: [
                C.jsx('h4', {
                  className: 'heading',
                  children: 'Claims Resolution',
                }),
                C.jsx('p', {
                  children:
                    "We're sorry to hear that you're having an issue with your order. File your claim here in less than a minute.",
                }),
              ],
            }),
            C.jsx('br', {}),
            C.jsxs('form', {
              className: 'form',
              onSubmit: g,
              children: [
                C.jsxs('div', {
                  className: 'form-group',
                  children: [
                    C.jsx('label', {
                      htmlFor: 'emailPhone',
                      children: 'Enter your Email ID/Phone Number',
                    }),
                    C.jsx('input', {
                      type: 'text',
                      id: 'emailPhone',
                      placeholder: 'Enter your Email Id',
                      onChange: (p) => l(p.target.value),
                    }),
                  ],
                }),
                C.jsxs('div', {
                  className: 'form-group',
                  children: [
                    C.jsx('label', {
                      htmlFor: 'orderNumber',
                      children: 'Order Number',
                    }),
                    C.jsx('input', {
                      type: 'text',
                      required: !0,
                      id: 'orderNumber',
                      placeholder: '#Order Number',
                      onChange: (p) => i(p.target.value),
                    }),
                  ],
                }),
                s &&
                  C.jsxs(C.Fragment, {
                    children: [
                      C.jsx(ri, { setError: u, message: s }),
                      ' ',
                      C.jsx('br', {}),
                    ],
                  }),
                C.jsx('div', {
                  className: 'form-actions',
                  children: C.jsx('button', {
                    type: 'submit',
                    className: 'submit',
                    disabled: r,
                    children: r
                      ? C.jsx('div', { className: 'loader-element' })
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
  Wv = ({ label: e = 'label', color: t = '#gray', onClick: r = () => {} }) =>
    C.jsx('button', {
      style: { backgroundColor: t, borderColor: t },
      className: 'submit',
      onClick: r,
      children: e,
    }),
  Vv = ({
    label: e,
    placeholder: t,
    value: r,
    onChange: n,
    multiline: o,
    requiredIndicator: l,
  }) =>
    C.jsxs('div', {
      class: '',
      children: [
        C.jsx('div', {
          class: 'Polaris-Labelled__LabelWrapper',
          children: C.jsx('div', {
            class: 'Polaris-Label',
            children: C.jsx('label', {
              id: ':Rq6:Label',
              for: ':Rq6:',
              class: 'Polaris-Label__Text',
              children: C.jsx('span', {
                class: 'Polaris-Text--root Polaris-Text--bodyMd',
                children: e,
              }),
            }),
          }),
        }),
        C.jsx('div', {
          class: 'Polaris-Connected',
          children: C.jsx('div', {
            class: 'Polaris-Connected__Item Polaris-Connected__Item--primary',
            children: C.jsxs('div', {
              class:
                'Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline',
              children: [
                C.jsx('textarea', {
                  id: ':Rq6:',
                  autocomplete: 'off',
                  class: 'Polaris-TextField__Input',
                  type: 'text',
                  rows: o,
                  'aria-labelledby': ':Rq6:Label',
                  'aria-invalid': 'false',
                  'aria-multiline': 'true',
                  'data-1p-ignore': 'true',
                  'data-lpignore': 'true',
                  'data-form-type': 'other',
                  style: { height: '90px' },
                  required: l,
                  value: r,
                  placeholder: t,
                  onChange: n,
                }),
                C.jsx('div', { class: 'Polaris-TextField__Backdrop' }),
              ],
            }),
          }),
        }),
      ],
    }),
  Gv = ({ selectedData: e, setStep: t }) => {
    const [r, n] = d.useState([]),
      [o, l] = d.useState(''),
      [a, i] = d.useState(''),
      [s, u] = d.useState(!1),
      [m, g] = d.useState(''),
      [p, v] = d.useState(''),
      [y, x] = d.useState(!1),
      [k, h] = d.useState(0),
      f = 2e7,
      b = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
      S = window.location.hostname,
      F = d.useCallback(
        (D, N, B) => {
          if ((console.log(N), N.length + r.length > 5 || k > f)) {
            x(!0);
            return;
          } else
            b.includes(N[0].type)
              ? (x(!1), n((j) => [...j, ...N]))
              : alert('Please select a valid image or pdf type');
        },
        [r]
      ),
      w = (D) => {
        n((N) => N.filter((B) => B.name !== D));
      };
    d.useEffect(() => {
      const D = r.reduce((N, B) => B.size + N, 0);
      h(D);
    }, [r]);
    const P = async () => {
        if (!s)
          if (r.length > 0) {
            u(!0), i(''), console.log('uploading file...');
            const D = new FormData();
            if (
              (D.append('comment', o),
              D.append('selectedIssue', m),
              D.append('selectedRequest', p),
              D.append('selectedData', JSON.stringify(e)),
              m.length === 0 || !m)
            ) {
              i('Please select an issue'), u(!1);
              return;
            }
            if (p.length === 0 || !p) {
              i('Please select an Request'), u(!1);
              return;
            }
            if (!o) {
              i('Please Write What happened with your package.'), u(!1);
              return;
            }
            for (let N of r) D.append('files', N);
            try {
              await fetch(
                `https://${S}/apps/Shipping-Protection/get-order-fulfilment-data?url=${S}`,
                { method: 'POST', body: D }
              ),
                t((N) => N + 1);
            } catch (N) {
              u(!1), console.error(N);
            } finally {
              u(!1);
            }
          } else u(!1), i('Please select a file to upload');
      },
      E = (D) => {
        D || i('');
      };
    let A = null;
    return (
      a &&
        (A = C.jsx('div', {
          style: { marginTop: '10px' },
          children: C.jsx(ri, { setError: E, message: a }),
        })),
      console.log(m),
      C.jsxs(xc, {
        children: [
          C.jsx(H0, {
            requiredIndicator: !0,
            label: 'Issue',
            options: [
              { value: '', label: 'Select' },
              { value: 'DAMAGED', label: 'Damaged' },
              { value: 'STOLLEN', label: 'Stollen' },
              { value: 'LOST', label: 'Lost' },
            ],
            value: m,
            onChange: g,
          }),
          C.jsx('br', {}),
          C.jsx(H0, {
            label: 'Requested Regulation',
            requiredIndicator: !0,
            options: [
              { value: '', label: 'Select' },
              { value: 'RESHIP', label: 'Reship' },
              { value: 'REFUND', label: 'Refund' },
            ],
            value: p,
            onChange: v,
          }),
          C.jsx('br', {}),
          C.jsx(Vv, {
            label: 'Tell us what happened',
            placeholder:
              'Please describe what happened with this package below. You can include image/video links if necessary.',
            value: o,
            onChange: (D) => l(D.target.value),
            multiline: 5,
            requiredIndicator: !0,
            autoComplete: 'off',
          }),
          C.jsx('br', {}),
          C.jsx(Cc, {
            label: 'Attachment',
            onDrop: F,
            variableHeight: !0,
            children: C.jsx(Cc.FileUpload, {
              actionHint: 'Accepts .jpg, .png and .pdf',
              actionTitle: 'Add Files Maximum file limit 5 files & size 20MB',
            }),
          }),
          y &&
            C.jsx('div', {
              style: { marginTop: '10px' },
              children: C.jsx(ri, { setError: x }),
            }),
          A,
          C.jsx(wc, {
            columns: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
            children: r.map((D, N) =>
              C.jsx(
                wc.Cell,
                {
                  columnSpan: { xs: 2, sm: 2, md: 1, lg: 1, xl: 1 },
                  children: C.jsxs('div', {
                    className: 'file-preview',
                    children: [
                      C.jsx(R1, {
                        size: 'small',
                        alt: D.name,
                        source: b.includes(D.type)
                          ? window.URL.createObjectURL(D)
                          : Jg,
                      }),
                      C.jsxs('div', {
                        style: { margin: '5px', width: '95%' },
                        children: [
                          D.name,
                          ' ',
                          C.jsxs(X, {
                            variant: 'bodySm',
                            as: 'p',
                            children: [D.size, ' bytes'],
                          }),
                        ],
                      }),
                      C.jsx('div', {
                        style: {
                          width: '5%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        },
                        children: C.jsx('span', {
                          className: 'file-close-icon',
                          onClick: () => w(D.name),
                          children: C.jsx(Ee, { source: Lu }),
                        }),
                      }),
                    ],
                  }),
                },
                N
              )
            ),
          }),
          C.jsx('br', {}),
          C.jsxs('div', {
            children: [
              C.jsx('button', {
                type: 'button',
                className: 'cancel',
                onClick: () => t((D) => D - 1),
                style: { marginRight: '10px' },
                children: 'Back',
              }),
              C.jsx(Wv, {
                label: s
                  ? C.jsx('div', { className: 'loader-element' })
                  : 'Submit Claim Request',
                onClick: P,
              }),
            ],
          }),
        ],
      })
    );
  },
  Zv = ({ data: e }) => {
    const t = [e];
    function r(o) {
      return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date(o));
    }
    const n = t.map(
      (
        { id: o, createdAt: l, displayStatus: a, customerName: i, email: s },
        u
      ) =>
        C.jsxs(
          ft.Row,
          {
            id: o,
            position: u,
            children: [
              C.jsx(ft.Cell, {
                children: C.jsx(Mn, { tone: 'info', children: r(l) }),
              }),
              C.jsx(ft.Cell, {
                children: C.jsx(X, {
                  as: 'span',
                  children: C.jsx(Mn, {
                    size: 'medium',
                    progress: 'complete',
                    tone:
                      a === 'FULFILLED'
                        ? 'success'
                        : a === 'Partially fulfilled'
                        ? 'warning'
                        : a === 'Partially fulfilled'
                        ? 'attention'
                        : 'critical',
                    children: C.jsxs('span', {
                      style: { textTransform: 'capitalize' },
                      children: [' ', a.toLowerCase()],
                    }),
                  }),
                }),
              }),
              C.jsx(ft.Cell, { children: i }),
              C.jsx(ft.Cell, { children: s }),
            ],
          },
          o
        )
    );
    return C.jsx('div', {
      style: { fontSize: '', marginTop: '15px' },
      children: C.jsx(ft, {
        condensed: Bl().smDown,
        resourceName: { plural: 'Orders', singular: 'Order' },
        itemCount: t.length,
        headings: [
          { title: 'Order Placed At' },
          { title: 'Order Status' },
          { title: 'Name' },
          { title: 'Email' },
        ],
        selectable: !1,
        children: n,
      }),
    });
  },
  z1 = c.createContext(null),
  Yv = c.createContext(null);
class Xv {
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
      const l = ps(t, this.details.fallbackLocale);
      this.translations.has(l) || this.translations.set(l, n);
    }
    if (this.translationGetters.has(t)) return;
    const o = r ? Jv(r) : qv;
    this.setTranslations(t, o);
  }
  state(t) {
    const { locale: r, fallbackLocale: n } = this.details,
      o = W0(r),
      l = n != null && o.includes(n);
    let a = !1,
      i = !1;
    const s = t.reduce((u, m) => {
      const g = [];
      for (const p of o) {
        const v = ps(m, p),
          y = this.translations.get(v);
        y == null ? this.translationPromises.has(v) && (i = !0) : g.push(y);
      }
      if ((g.length === 0 && i && (a = !0), !l)) {
        const p = this.fallbacks.get(m);
        p != null && g.push(p);
      }
      return [...u, ...g];
    }, []);
    return { loading: a, translations: s };
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
    for (const n of W0(this.details.locale)) {
      const o = ps(t, n);
      if (this.translations.has(o)) continue;
      const l = r(n);
      if (Qv(l)) {
        const a = l
          .then((i) => {
            this.translationPromises.delete(o),
              this.translations.set(o, i),
              this.asyncTranslationIds.add(o),
              i != null && this.updateSubscribersForId(t);
          })
          .catch(() => {
            this.translationPromises.delete(o),
              this.translations.set(o, void 0),
              this.asyncTranslationIds.add(o);
          });
        this.translationPromises.set(o, a);
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
      for (const [l, a] of this.subscriptions)
        a.some((i) => o.includes(i)) && l(this.state(a), this.details);
    });
  }
}
function W0(e) {
  const t = e.split('-');
  return t.length > 1 ? [`${t[0]}-${t[1].toUpperCase()}`, t[0]] : [e];
}
function Qv(e) {
  return e != null && e.then != null;
}
function ps(e, t) {
  return `${e}__${t}`;
}
function qv() {}
function Jv(e) {
  return typeof e == 'function' ? e : (t) => e[t];
}
const Kv = 50;
function rr(e, t) {
  const r = new WeakMap(),
    n = new Map(),
    o = [];
  return function (...a) {
    if (typeof window > 'u') return e.apply(this, a);
    const i = a.length === 1 && typeof a[0] == 'object' && !t;
    let s;
    i ? (s = a[0]) : t && t instanceof Function ? (s = t(...a)) : (s = a[0]);
    const u = i ? r : n;
    if (u.has(s)) return u.get(s);
    const m = e.apply(this, a);
    if (i) r.set(s, m);
    else if ((n.set(s, m), o.push(s), n.size > Kv)) {
      const g = o[0];
      n.delete(g), o.shift();
    }
    return m;
  };
}
function xi(e) {
  return e.replace('‎', '');
}
const hs = new Map();
function V0(e, t) {
  const r = ey(e, t);
  if (hs.has(r)) return hs.get(r);
  const n = new Intl.DateTimeFormat(e, t);
  return hs.set(r, n), n;
}
const G0 = Intl.DateTimeFormat('en', { hour: 'numeric' }),
  Z0 = typeof G0.resolvedOptions > 'u' ? void 0 : G0.resolvedOptions();
function wr(e, t, r = {}) {
  if (
    (Z0 != null &&
      r.hour12 === !1 &&
      Z0.hourCycle != null &&
      ((r.hour12 = void 0), (r.hourCycle = 'h23')),
    r.timeZone != null && r.timeZone === 'Etc/GMT+12')
  ) {
    const o = new Date(e.valueOf() - 432e5);
    return V0(t, { ...r, timeZone: 'UTC' }).format(o);
  }
  return V0(t, r).format(e);
}
function ey(e, t = {}) {
  return `${Array.isArray(e) ? e.sort().join('-') : e}-${JSON.stringify(t)}`;
}
const bs = /(\d{2})/;
function Eo(e, t) {
  return {
    year: () => Oe.getYear(e, t),
    month: () => Oe.getMonth(e, t),
    day: () => Oe.getDay(e, t),
    weekday: () => Oe.getWeekday(e, t),
    hour: () => Oe.getHour(e, t),
    minute: () => Oe.getMinute(e, t),
    second: () => Oe.getSecond(e, t),
  };
}
function cn(e) {
  return (t, r) => `${e}-${t.toString()}-${r}`;
}
var Y0;
(function (e) {
  (e.Monday = 'Monday'),
    (e.Tuesday = 'Tuesday'),
    (e.Wednesday = 'Wednesday'),
    (e.Thursday = 'Thursday'),
    (e.Friday = 'Friday'),
    (e.Saturday = 'Saturday'),
    (e.Sunday = 'Sunday');
})(Y0 || (Y0 = {}));
const O1 = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};
function ty(e) {
  return Object.keys(O1).some((t) => t === e);
}
function ry(e) {
  throw new Error(e);
}
function ny(e) {
  return ty(e) ? O1[e] : ry(`Unexpected weekday: ${e}`);
}
class Oe {}
Oe.getYear = rr((e, t) => {
  if (isNaN(e.valueOf()))
    throw new Error(`Unable to parse date: ${e} for timezone: ${t}`);
  const r = wr(e, 'en', { timeZone: t, year: 'numeric' }),
    n = xi(r),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse year: '${r}'`);
  return o;
}, cn('year'));
Oe.getMonth = rr((e, t) => {
  const r = wr(e, 'en', { timeZone: t, month: 'numeric' }),
    n = xi(r),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse month: '${r}'`);
  return o;
}, cn('month'));
Oe.getDay = rr((e, t) => {
  const r = wr(e, 'en', { timeZone: t, day: 'numeric' }),
    n = xi(r),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse day: '${r}'`);
  return o;
}, cn('day'));
Oe.getWeekday = rr((e, t) => {
  const r = wr(e, 'en', { timeZone: t, weekday: 'long' }),
    n = xi(r);
  return ny(n);
}, cn('weekday'));
Oe.getHour = rr((e, t) => {
  const r = wr(e, 'en', { timeZone: t, hour12: !1, hour: 'numeric' });
  let n = parseInt(r, 10);
  return isNaN(n) && (n = Oe.getTimePartsFallback(e, t).hour), n;
}, cn('hour'));
Oe.getMinute = rr((e, t) => {
  const r = wr(e, 'en', { timeZone: t, minute: 'numeric' });
  let n = parseInt(r, 10);
  return isNaN(n) && (n = Oe.getTimePartsFallback(e, t).minute), n;
}, cn('minute'));
Oe.getSecond = rr((e, t) => {
  const r = wr(e, 'en', { timeZone: t, second: 'numeric' });
  let n = parseInt(r, 10);
  return isNaN(n) && (n = Oe.getTimePartsFallback(e, t).second), n;
}, cn('second'));
Oe.getTimePartsFallback = rr((e, t) => {
  const r = wr(e, 'en', {
      timeZone: t,
      hour12: !1,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    [n, o, l] = r.split(':'),
    a = new RegExp(bs).exec(n),
    i = new RegExp(bs).exec(o),
    s = new RegExp(bs).exec(l);
  if (a != null && i != null && s != null) {
    const u = parseInt(a[1], 10),
      m = parseInt(i[1], 10),
      g = parseInt(s[1], 10);
    return { hour: u, minute: m, second: g };
  }
  throw new Error(`Unable to parse timeString: '${r}'`);
}, cn('timePartsFallback'));
let Er;
(function (e) {
  (e[(e.Second = 1e3)] = 'Second'),
    (e[(e.Minute = 6e4)] = 'Minute'),
    (e[(e.Hour = 36e5)] = 'Hour'),
    (e[(e.Day = 864e5)] = 'Day'),
    (e[(e.Week = 6048e5)] = 'Week'),
    (e[(e.Year = 31536e6)] = 'Year');
})(Er || (Er = {}));
function zn(e, t = new Date()) {
  return t < e;
}
function oy(e, t = new Date()) {
  return !zn(e, t) && t.getTime() - e.getTime() < Er.Hour;
}
function ly(e, t = new Date()) {
  return !zn(e, t) && t.getTime() - e.getTime() < Er.Minute;
}
function ay(e, t = new Date()) {
  return !zn(e, t) && t.getTime() - e.getTime() < Er.Week;
}
function iy(e, t = new Date()) {
  return zn(e, t) && e.getTime() - t.getTime() < Er.Week;
}
function sy(e, t = new Date()) {
  return !zn(e, t) && t.getTime() - e.getTime() < Er.Year;
}
function cy(e, t = new Date()) {
  return zn(e, t) && e.getTime() - t.getTime() < Er.Year;
}
function uy(e, t, r) {
  const { year: n } = Eo(e, r),
    { year: o } = Eo(t, r);
  return n() === o();
}
function dy(e, t, r) {
  const { month: n } = Eo(e, r),
    { month: o } = Eo(t, r);
  return uy(e, t, r) && n() === o();
}
function Qu(e, t, r) {
  const { day: n } = Eo(e, r),
    { day: o } = Eo(t, r);
  return dy(e, t, r) && n() === o();
}
function X0(e, t) {
  return Qu(e, new Date(), t);
}
function fy(e, t) {
  const r = new Date(),
    n = new Date(r.valueOf() - 24 * 60 * 60 * 1e3);
  return Qu(e, n, t);
}
function my(e, t) {
  const r = new Date(),
    n = new Date(r.valueOf() + 24 * 60 * 60 * 1e3);
  return Qu(e, n, t);
}
let ke;
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
})(ke || (ke = {}));
const H1 = new Map([
  ['ko', Q0],
  ['ja', (e, t, r) => (r ? `${t}${e}` : `${t}様`)],
  ['zh', Q0],
]);
function Q0(e, t, r) {
  return r ? `${t}${e}` : t;
}
function j1(e) {
  return e.split('-')[0].toLowerCase();
}
function $1({ name: e, locale: t, options: r }) {
  if (!e.givenName) return e.familyName || '';
  if (!e.familyName) return e.givenName;
  const n = !!(r && r.full),
    o = H1.get(j1(t));
  return o
    ? o(e.givenName, e.familyName, n)
    : n
    ? `${e.givenName} ${e.familyName}`
    : e.givenName;
}
const gy = [ke.Latin, ke.Han, ke.Hiragana, ke.Katakana, ke.Hangul, ke.Thai];
function U1(e) {
  return gy.filter((t) => new RegExp(`${t}`).test(e));
}
function ol({ text: e, locale: t }) {
  if (!e || !Intl.Segmenter) return;
  const r = new Intl.Segmenter(t, { granularity: 'grapheme' });
  return Array.from(r.segment(e)).map((n) => n.segment);
}
function py({ name: e, locale: t, options: r }) {
  var n;
  return (n = hy({
    givenName: e.givenName,
    familyName: e.familyName,
    idealMaxLength: r == null ? void 0 : r.idealMaxLength,
  })) !== null && n !== void 0
    ? n
    : $1({ name: e, locale: t });
}
function hy({ givenName: e, familyName: t, idealMaxLength: r = 3 }) {
  if (!e && !t) return;
  const n = e == null ? void 0 : e.trim(),
    o = t == null ? void 0 : t.trim(),
    l = [n, o].join('');
  if (new RegExp(`${ke.Punctuation}|\\s`).test(l)) return;
  const a = U1(l);
  if (a.length !== 1) return;
  switch (a[0]) {
    case ke.Latin:
      return [n == null ? void 0 : n[0], o == null ? void 0 : o[0]].join('');
    case ke.Han:
    case ke.Katakana:
    case ke.Hiragana:
      return o;
    case ke.Hangul:
      if (n)
        if (n.length > r) {
          var s;
          return (s = ol({ text: n, locale: 'ko' })) === null || s === void 0
            ? void 0
            : s[0];
        } else return n;
      else return o;
    case ke.Thai:
      if (n) {
        var u;
        return (u = ol({ text: n, locale: 'th' })) === null || u === void 0
          ? void 0
          : u[0];
      } else {
        var m;
        return (m = ol({ text: o, locale: 'th' })) === null || m === void 0
          ? void 0
          : m[0];
      }
    default:
      return;
  }
}
function by({ name: e, idealMaxLength: t }) {
  var r;
  return (r = vy({ name: e, idealMaxLength: t })) !== null && r !== void 0
    ? r
    : e;
}
function vy({ name: e, idealMaxLength: t = 3 }) {
  const r = e.trim(),
    n = U1(r);
  if (n.length !== 1) return;
  const o = n[0],
    l = r.split(' ');
  switch (o) {
    case ke.Latin:
      return l.length === 1
        ? l[0].slice(0, t)
        : l.length <= t
        ? l.map((s) => s[0]).join('')
        : l.slice(0)[0][0] + l.slice(-1)[0][0];
    case ke.Han:
    case ke.Katakana:
    case ke.Hiragana:
      return r.includes(' ') ? void 0 : r;
    case ke.Hangul: {
      var a;
      const s = r.split(' ')[0];
      return (a = ol({ text: s, locale: 'ko' })) === null || a === void 0
        ? void 0
        : a.slice(0, t).join('');
    }
    case ke.Thai: {
      if (r.includes(' ')) return;
      var i;
      return (i = ol({ text: r, locale: 'th' })) === null || i === void 0
        ? void 0
        : i[0];
    }
    default:
      return;
  }
}
function yy(e) {
  return !!H1.get(j1(e));
}
function q0(e) {
  const t = e.split('-')[1];
  return t && t.toUpperCase();
}
function W1(e) {
  return e.split('-')[0].toLowerCase();
}
const V1 = new Map([
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
  J0 = 1.15,
  K0 = new Map([
    ['zh', 0.5],
    ['ja', 0.5],
    ['ko', 0.8],
    ['fr', 1.3],
    ['it', 1.3],
    ['de', 1.5],
    ['nl', 1.5],
  ]);
function xy({ to: e }) {
  return e == null ? J0 : K0.get(e) || K0.get(W1(e)) || J0;
}
function Sy(
  e,
  {
    delimiter: t,
    startDelimiter: r = t,
    endDelimiter: n = t,
    prepend: o,
    append: l,
    toLocale: a,
  } = {}
) {
  const i = Cy(e, { startDelimiter: r, endDelimiter: n }),
    s = i.reduce((y, x) => (typeof x == 'string' ? y + Ey(x) : y), 0),
    u = Math.ceil(s * xy({ to: a })) - s,
    m = s / Math.abs(u);
  let g = m,
    p = -1;
  const v = i.reduce((y, x) => {
    const k =
      typeof x == 'string'
        ? [...x]
            .map((h) => {
              const f = G1(h);
              f && p++;
              const b = V1.get(h) || h;
              return f && p + 1 === Math.floor(g)
                ? ((g += m), u < 0 ? '' : b.repeat(2))
                : b;
            })
            .join('')
        : x[0];
    return y + k;
  }, '');
  return `${o || ''}${v}${l || ''}`;
}
function G1(e) {
  return V1.has(e);
}
function Ey(e) {
  return [...e].filter(G1).length;
}
function Cy(e, { startDelimiter: t, endDelimiter: r }) {
  const n = t && r ? wy(t, r) : void 0;
  let o = 0;
  const l = [];
  if (n) {
    let a = n.exec(e);
    for (; a; )
      l.push(e.substring(o, a.index)),
        l.push(a),
        (o = a.index + a[0].length),
        (a = n.exec(e));
    l.push(e.substring(o, e.length));
  } else l.push(e);
  return l;
}
function wy(e, t) {
  if (e.length === 1 && t.length === 1)
    return new RegExp(`\\${e}[^\\${t}]*\\${t}`, 'g');
  const r = [...e].map((o) => `\\${o}`).join(''),
    n = [...t].map((o) => `\\${o}`).join('');
  return new RegExp(`${r}.*?${n}`, 'g');
}
let oo;
(function (e) {
  (e[(e.Rtl = 0)] = 'Rtl'), (e[(e.Ltr = 1)] = 'Ltr');
})(oo || (oo = {}));
let Rt;
(function (e) {
  (e.Long = 'Long'),
    (e.Short = 'Short'),
    (e.Humanize = 'Humanize'),
    (e.Time = 'Time'),
    (e.DateTime = 'DateTime');
})(Rt || (Rt = {}));
const ef = {
  [Rt.Long]: {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  },
  [Rt.Short]: { month: 'short', day: 'numeric', year: 'numeric' },
  [Rt.Humanize]: { month: 'long', day: 'numeric', year: 'numeric' },
  [Rt.Time]: { hour: '2-digit', minute: '2-digit' },
  [Rt.DateTime]: {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
};
let T;
(function (e) {
  (e.Sunday = 'sunday'),
    (e.Monday = 'monday'),
    (e.Tuesday = 'tuesday'),
    (e.Wednesday = 'wednesday'),
    (e.Thursday = 'thursday'),
    (e.Friday = 'friday'),
    (e.Saturday = 'saturday');
})(T || (T = {}));
const ky = T.Sunday,
  Py = new Map([
    ['AE', T.Saturday],
    ['AF', T.Saturday],
    ['BH', T.Saturday],
    ['DZ', T.Saturday],
    ['EG', T.Saturday],
    ['IQ', T.Saturday],
    ['IR', T.Saturday],
    ['JO', T.Saturday],
    ['KW', T.Saturday],
    ['LY', T.Saturday],
    ['OM', T.Saturday],
    ['QA', T.Saturday],
    ['SA', T.Saturday],
    ['SY', T.Saturday],
    ['YE', T.Saturday],
    ['AR', T.Sunday],
    ['BO', T.Sunday],
    ['BR', T.Sunday],
    ['BZ', T.Sunday],
    ['CA', T.Sunday],
    ['CL', T.Sunday],
    ['CO', T.Sunday],
    ['CR', T.Sunday],
    ['DO', T.Sunday],
    ['EC', T.Sunday],
    ['GT', T.Sunday],
    ['HK', T.Sunday],
    ['HN', T.Sunday],
    ['IL', T.Sunday],
    ['JM', T.Sunday],
    ['JP', T.Sunday],
    ['KE', T.Sunday],
    ['KR', T.Sunday],
    ['MO', T.Sunday],
    ['MX', T.Sunday],
    ['NI', T.Sunday],
    ['PA', T.Sunday],
    ['PE', T.Sunday],
    ['PH', T.Sunday],
    ['SG', T.Sunday],
    ['SV', T.Sunday],
    ['TW', T.Sunday],
    ['US', T.Sunday],
    ['VE', T.Sunday],
    ['ZA', T.Sunday],
    ['ZW', T.Sunday],
    ['AD', T.Monday],
    ['AL', T.Monday],
    ['AM', T.Monday],
    ['AU', T.Monday],
    ['AZ', T.Monday],
    ['BE', T.Monday],
    ['BG', T.Monday],
    ['BN', T.Monday],
    ['BY', T.Monday],
    ['CH', T.Monday],
    ['CN', T.Monday],
    ['CZ', T.Monday],
    ['DE', T.Monday],
    ['DK', T.Monday],
    ['EE', T.Monday],
    ['ES', T.Monday],
    ['FI', T.Monday],
    ['FR', T.Monday],
    ['GB', T.Monday],
    ['GE', T.Monday],
    ['GF', T.Monday],
    ['GR', T.Monday],
    ['HR', T.Monday],
    ['HU', T.Monday],
    ['ID', T.Monday],
    ['IE', T.Monday],
    ['IN', T.Monday],
    ['IS', T.Monday],
    ['IT', T.Monday],
    ['KG', T.Monday],
    ['KZ', T.Monday],
    ['LB', T.Monday],
    ['LT', T.Monday],
    ['LU', T.Monday],
    ['LV', T.Monday],
    ['MA', T.Monday],
    ['MC', T.Monday],
    ['MK', T.Monday],
    ['MN', T.Monday],
    ['MY', T.Monday],
    ['NL', T.Monday],
    ['NO', T.Monday],
    ['NZ', T.Monday],
    ['PK', T.Monday],
    ['PL', T.Monday],
    ['PT', T.Monday],
    ['PY', T.Monday],
    ['RO', T.Monday],
    ['RS', T.Monday],
    ['RU', T.Monday],
    ['SE', T.Monday],
    ['SK', T.Monday],
    ['TH', T.Monday],
    ['TN', T.Monday],
    ['TR', T.Monday],
    ['UA', T.Monday],
    ['UY', T.Monday],
    ['UZ', T.Monday],
    ['VN', T.Monday],
    ['XK', T.Monday],
  ]),
  Fy = [
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
  tf = { BRL: 'R$', HKD: 'HK$' };
let mt;
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
})(mt || (mt = {}));
class Z1 extends Error {
  constructor(t, r) {
    super(`Missing translation for key: ${t} in locale: ${r}`);
  }
}
class Dy extends Error {
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
class rf extends Error {
  constructor(t = '') {
    const r = 'No currency code provided.';
    super(t === '' ? r : `${r} ${t}`);
  }
}
class Ty extends Error {
  constructor(t = '') {
    const r = 'No country code provided.';
    super(t === '' ? r : `${r} ${t}`);
  }
}
const Iy = /{\s*(\w+)\s*}/g,
  kc = Symbol('Missing translation'),
  ll = 'count',
  al = 'ordinal',
  ni = '.',
  nf = '-u-nu-',
  of = 'latn',
  tn = (e) => typeof e == 'string',
  vs = new Map();
function Bn(e, t) {
  const r = Ay(e),
    n = _y(r, t);
  if (vs.has(n)) return vs.get(n);
  const o = new Intl.NumberFormat(r, t);
  return vs.set(n, o), o;
}
function Ay(e) {
  return Array.isArray(e) ? e.map((t) => lf(t)) : lf(e);
}
function lf(e) {
  if (!e) return e;
  try {
    return new Intl.Locale(e, { numberingSystem: of }).toString();
  } catch {
    const t = new RegExp(`(?:-x|${nf}).*`, 'g'),
      r = `${nf}${of}`;
    return e.replace(t, '').concat(r);
  }
}
const Ny = {
  startDelimiter: '{',
  endDelimiter: '}',
  prepend: '[!!',
  append: '!!]',
};
function _y(e, t = {}) {
  return `${Array.isArray(e) ? e.sort().join('-') : e}-${JSON.stringify(t)}`;
}
function My(e, t = {}) {
  return new Intl.PluralRules(e, t);
}
const Dl = rr(My, (e, t = {}) => `${e}${JSON.stringify(t)}`);
function ys(e, t, r, n) {
  const o = Array.isArray(t) ? t : [t];
  let l;
  for (const a of o) {
    l = a;
    for (const i of e.split(ni)) if (((l = l[i]), !l)) break;
    if (l) return n ? (tn(l) ? il(l, n) : Y1(l, r, n)) : l;
  }
  throw new Z1(e, r);
}
function By(e, t, r, n) {
  const { scope: o, replacements: l, pseudotranslate: a, interpolate: i } = t,
    s = Array.isArray(r) ? r : [r],
    u = Ry(e, o);
  for (const m of s) {
    const g = Ly(u, m, n, l, { pseudotranslate: a, interpolate: i });
    if (g !== kc) return g;
  }
  throw new Z1(u, n);
}
function Ly(e, t, r, n, { pseudotranslate: o = !1, interpolate: l } = {}) {
  let a = t;
  for (const u of e.split(ni)) {
    if (a == null || typeof a != 'object') return kc;
    a = a[u];
  }
  const i = {};
  if (
    typeof a == 'object' &&
    n != null &&
    Object.prototype.hasOwnProperty.call(n, ll)
  ) {
    const u = n[ll];
    if (typeof u == 'number') {
      if (u === 0 && a[0] !== void 0) a = a[0];
      else if (u === 1 && a[1] !== void 0) a = a[1];
      else {
        const m = Dl(r).select(u);
        a = a[m] || a.other;
      }
      i[ll] = Bn(r).format(u);
    }
  } else if (
    typeof a == 'object' &&
    n != null &&
    Object.prototype.hasOwnProperty.call(n, al)
  ) {
    const u = n[al];
    if (typeof u == 'number') {
      const m = Dl(r, { type: 'ordinal' }).select(u);
      (a = a.ordinal[m] || a.ordinal.other), (i[al] = Bn(r).format(u));
    }
  }
  const s =
    tn(a) && o
      ? Sy(a, { ...Ny, toLocale: typeof o == 'boolean' ? void 0 : o })
      : a;
  return tn(s) ? il(s, { ...n, ...i }, { interpolate: l }) : kc;
}
function il(e, t = {}, { interpolate: r } = {}) {
  const n = [],
    o = new RegExp(r || Iy, 'g');
  let l = 0,
    a = 0;
  e.replace(o, (s, u, m) => {
    if (!u)
      throw new Error(
        'Invalid replacement key. The interpolatation format RegExp is possibly too permissive.'
      );
    if (!Object.prototype.hasOwnProperty.call(t, u)) throw new Dy(u, t);
    l += 1;
    const g = e.substring(a, m);
    g && n.push(g), (a = m + s.length);
    const p = t[u];
    return (
      c.isValidElement(p)
        ? n.push(c.cloneElement(p, { key: l }))
        : typeof p == 'object'
        ? n.push(p)
        : n.push(String(p)),
      ''
    );
  });
  const i = e.substring(a);
  return i && n.push(i), n.every(tn) ? n.join('') : n;
}
function Ry(e, t) {
  return t == null ? e : `${tn(t) ? t : t.join(ni)}${ni}${e}`;
}
function Y1(e, t, r) {
  if (Object.prototype.hasOwnProperty.call(r, ll)) {
    const n = r[ll];
    if (typeof n == 'number') {
      const o = Dl(t).select(n);
      if (tn(e[o]))
        return il(e[o], {
          ...r,
          CARDINAL_PLURALIZATION_KEY_NAME: Bn(t).format(n),
        });
    }
  } else if (Object.prototype.hasOwnProperty.call(r, al)) {
    const n = r[al];
    if (typeof n == 'number') {
      const o = Dl(t, { type: 'ordinal' }).select(n);
      if (tn(e[o]))
        return il(e[o], {
          ...r,
          ORDINAL_PLURALIZATION_KEY_NAME: Bn(t).format(n),
        });
    }
  }
  return Object.keys(e).reduce(
    (n, o) => ({ ...n, [o]: tn(e[o]) ? il(e[o], r) : Y1(e[o], t, r) }),
    {}
  );
}
const xs = 2,
  af = new Map([
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
  zy = [mt.Latin, mt.Han, mt.Hiragana, mt.Katakana, mt.Hangul, mt.Thai];
function Oy(e) {
  return zy.filter((t) => new RegExp(`${t}`).test(e));
}
function sf(e, t) {
  const r = Hy(0, e, t),
    n = new RegExp(`${mt.DirectionControl}*`, 'gu'),
    o = r.replace(n, ''),
    l = new RegExp('\\p{Nd}\\p{Po}*\\p{Nd}*', 'gu').exec(o);
  if (!l)
    throw new Error(`Number input in locale ${e} is currently not supported.`);
  const a = l[0],
    [i, s] = o.split(a);
  return { symbol: i || s, prefixed: i !== '' };
}
function Hy(e, t, r) {
  return Bn(t, { style: 'currency', ...r }).format(e);
}
function jy(e) {
  return e.replace(' ', ' ');
}
const Ss = '.',
  $y = '-',
  Uy = /\d/g,
  cf = /\D/g,
  Wy = /\./g;
class Vy {
  get language() {
    return W1(this.locale);
  }
  get region() {
    return q0(this.locale);
  }
  get countryCode() {
    return q0(this.locale);
  }
  get languageDirection() {
    return Fy.includes(this.language) ? oo.Rtl : oo.Ltr;
  }
  get isRtlLanguage() {
    return this.languageDirection === oo.Rtl;
  }
  get isLtrLanguage() {
    return this.languageDirection === oo.Ltr;
  }
  constructor(
    t,
    {
      locale: r,
      currency: n,
      timezone: o,
      country: l,
      pseudolocalize: a = !1,
      onError: i,
      loading: s,
      interpolate: u,
    }
  ) {
    (this.getCurrencySymbol = (m, g = this.locale) => {
      const p = m || this.defaultCurrency;
      if (p == null)
        throw new rf(
          'formatCurrency cannot be called without a currency code.'
        );
      return this.getShortCurrencySymbol(p, g);
    }),
      (this.numberSymbols = rr(() => {
        const m = this.formatNumber(123456.7, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        });
        let g, p;
        for (const v of m) isNaN(parseInt(v, 10)) && (g ? (p = v) : (g = v));
        return { thousandSymbol: g, decimalSymbol: p };
      })),
      (this.translations = t),
      (this.locale = r),
      (this.defaultCountry = l),
      (this.defaultCurrency = n),
      (this.defaultTimezone = o),
      (this.pseudolocalize = a),
      (this.defaultInterpolate = u),
      (this.onError = i || this.defaultOnError),
      (this.loading = s || !1);
  }
  translate(t, r, n) {
    const { pseudolocalize: o, defaultInterpolate: l } = this;
    let a;
    const i = { pseudotranslate: o, interpolate: l };
    r == null
      ? (a = i)
      : this.isTranslateOptions(r)
      ? (a = { ...i, ...r, replacements: n })
      : (a = { ...i, replacements: r });
    try {
      return By(t, a, this.translations, this.locale);
    } catch (s) {
      return this.onError(s), '';
    }
  }
  getTranslationTree(t, r) {
    try {
      return r
        ? ys(t, this.translations, this.locale, r)
        : ys(t, this.translations, this.locale);
    } catch (n) {
      return this.onError(n), '';
    }
  }
  translationKeyExists(t, r = !1) {
    try {
      const n = ys(t, this.translations, this.locale);
      return r ? typeof n == 'string' : !0;
    } catch {
      return !1;
    }
  }
  formatNumber(t, { as: r, precision: n, ...o } = {}) {
    const { locale: l, defaultCurrency: a } = this;
    return r === 'currency' && a == null && o.currency == null
      ? (this.onError(
          new rf(
            "formatNumber(amount, {as: 'currency'}) cannot be called without a currency code."
          )
        ),
        '')
      : Bn(l, { style: r, maximumFractionDigits: n, currency: a, ...o }).format(
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
      o = af.get(r.toUpperCase()),
      l = this.normalizedNumber(t, n, o);
    return l === ''
      ? ''
      : o === 0
      ? `${parseFloat(l).toFixed(0)}.${'0'.repeat(xs)}`
      : parseFloat(l).toFixed(o);
  }
  formatPercentage(t, r = {}) {
    return this.formatNumber(t, { as: 'percent', ...r });
  }
  formatDate(t, r = {}) {
    const { locale: n, defaultTimezone: o } = this,
      { timeZone: l = o } = r,
      { style: a = void 0, ...i } = r || {};
    if (a)
      switch (a) {
        case Rt.Humanize:
          return this.humanizeDate(t, { ...i, timeZone: l });
        case Rt.DateTime:
          return this.formatDateTime(t, { ...i, timeZone: l, ...ef[a] });
        default:
          return this.formatDate(t, { ...i, ...ef[a] });
      }
    return wr(t, n, { ...i, timeZone: l });
  }
  ordinal(t) {
    const { locale: r } = this,
      n = Dl(r, { type: 'ordinal' }).select(t);
    return this.translate(n, { scope: 'ordinal' }, { amount: t });
  }
  weekStartDay(t) {
    const r = t || this.defaultCountry;
    if (!r)
      throw new Ty('weekStartDay() cannot be called without a country code.');
    return Py.get(r) || ky;
  }
  getCurrencySymbolLocalized(t, r) {
    return this.getShortCurrencySymbol(r, t);
  }
  formatName(t, r, n) {
    return $1({
      name: { givenName: t, familyName: r },
      locale: this.locale,
      options: n,
    });
  }
  abbreviateName({ firstName: t, lastName: r, idealMaxLength: n = 3 }) {
    return py({
      name: { givenName: t, familyName: r },
      locale: this.locale,
      options: { idealMaxLength: n },
    });
  }
  abbreviateBusinessName({ name: t, idealMaxLength: r = 3 }) {
    return by({ name: t, idealMaxLength: r });
  }
  identifyScript(t) {
    return Oy(t);
  }
  hasEasternNameOrderFormatter() {
    return yy(this.locale);
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
      a =
        ((n = new RegExp(`${mt.DirectionControl}*${mt.Negative}`, 'g').exec(
          o
        )) === null || n === void 0
          ? void 0
          : n.shift()) || '',
      i = this.getShortCurrencySymbol(r.currency),
      s = i.prefixed ? `${i.symbol}${o}` : `${o}${i.symbol}`;
    return `${a}${s.replace(a, '')}`;
  }
  formatCurrencyNone(t, r = {}) {
    const { locale: n } = this;
    let o = r.precision;
    if (o === void 0) {
      const l = r.currency || this.defaultCurrency || '';
      o = af.get(l.toUpperCase());
    }
    return Bn(n, {
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
      o = sf(r, { currency: t, currencyDisplay: 'narrowSymbol' });
    } catch {
      o = sf(r, { currency: t });
    }
    if (t in tf) return { symbol: tf[t], prefixed: o.prefixed };
    const l = o.symbol.replace(n, '');
    return /[A-Za-zÀ-ÖØ-öø-ÿĀ-ɏḂ-ỳ]/.exec(l)
      ? o
      : { symbol: l, prefixed: o.prefixed };
  }
  humanizeDate(t, r) {
    return zn(t) ? this.humanizeFutureDate(t, r) : this.humanizePastDate(t, r);
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
    if (ly(t)) return this.translate('date.humanize.lessThanOneMinuteAgo');
    if (oy(t)) {
      const a = Math.floor((new Date().getTime() - t.getTime()) / Er.Minute);
      return this.translate('date.humanize.lessThanOneHourAgo', { count: a });
    }
    const n = r == null ? void 0 : r.timeZone,
      o = this.getTimeFromDate(t, r);
    if (X0(t, n)) return o;
    if (fy(t, n)) return this.translate('date.humanize.yesterday', { time: o });
    if (ay(t)) {
      const l = this.getWeekdayFromDate(t, r);
      return this.translate('date.humanize.lessThanOneWeekAgo', {
        weekday: l,
        time: o,
      });
    }
    if (sy(t)) {
      const l = this.getMonthDayFromDate(t, r);
      return this.translate('date.humanize.lessThanOneYearAgo', {
        date: l,
        time: o,
      });
    }
    return this.formatDate(t, { ...r, style: Rt.Short });
  }
  humanizeFutureDate(t, r) {
    const n = r == null ? void 0 : r.timeZone,
      o = this.getTimeFromDate(t, r);
    if (X0(t, n)) return this.translate('date.humanize.today', { time: o });
    if (my(t, n)) return this.translate('date.humanize.tomorrow', { time: o });
    if (iy(t)) {
      const l = this.getWeekdayFromDate(t, r);
      return this.translate('date.humanize.lessThanOneWeekAway', {
        weekday: l,
        time: o,
      });
    }
    if (cy(t)) {
      const l = this.getMonthDayFromDate(t, r);
      return this.translate('date.humanize.lessThanOneYearAway', {
        date: l,
        time: o,
      });
    }
    return this.formatDate(t, { ...r, style: Rt.Short });
  }
  getTimeZone(t, r) {
    const { localeMatcher: n, formatMatcher: o, timeZone: l } = r || {},
      a = this.formatDate(t, {
        localeMatcher: n,
        formatMatcher: o,
        timeZone: l,
        hour12: !1,
        timeZoneName: 'short',
        hour: 'numeric',
      }),
      i = /\s([\w()+\-:.]+$)/.exec(a);
    return i ? i[1] : '';
  }
  getDateFromDate(t, r) {
    const {
      localeMatcher: n,
      formatMatcher: o,
      weekday: l,
      day: a,
      month: i,
      year: s,
      era: u,
      timeZone: m,
      timeZoneName: g,
    } = r || {};
    return this.formatDate(t, {
      localeMatcher: n,
      formatMatcher: o,
      weekday: l,
      day: a,
      month: i,
      year: s,
      era: u,
      timeZone: m,
      timeZoneName: g === 'short' ? void 0 : g,
    });
  }
  getTimeFromDate(t, r) {
    const {
        localeMatcher: n,
        formatMatcher: o,
        hour12: l,
        timeZone: a,
        timeZoneName: i,
      } = r || {},
      s = this.formatDate(t, {
        localeMatcher: n,
        formatMatcher: o,
        hour12: l,
        timeZone: a,
        timeZoneName: i === 'short' ? void 0 : i,
        hour: 'numeric',
        minute: '2-digit',
      }).toLocaleLowerCase(),
      u = i === 'short' ? `${s} ${this.getTimeZone(t, r)}` : s;
    return jy(u);
  }
  getWeekdayFromDate(t, r) {
    const {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: a,
    } = r || {};
    return this.formatDate(t, {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: a,
      weekday: 'long',
    });
  }
  getMonthDayFromDate(t, r) {
    const {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: a,
    } = r || {};
    return this.formatDate(t, {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: a,
      month: 'short',
      day: 'numeric',
    });
  }
  normalizedNumber(t, r, n = xs) {
    const o = Math.max(n, xs),
      l = t.lastIndexOf(Ss);
    let a = t.lastIndexOf(r);
    r !== Ss &&
      (t.match(Wy) || []).length === 1 &&
      this.decimalValue(t, l).length <= o &&
      (a = l);
    const i = this.integerValue(t, a),
      s = this.decimalValue(t, a),
      u = new RegExp(`^(${mt.DirectionControl}|\\s)*${mt.Negative}`, 'u'),
      p = `${t.match(u) ? $y : ''}${i}${a === -1 ? '' : Ss}${s}`;
    return p.match(Uy) ? p : '';
  }
  integerValue(t, r) {
    return t.substring(0, r).replace(cf, '');
  }
  decimalValue(t, r) {
    return t.substring(r + 1).replace(cf, '');
  }
  isTranslateOptions(t) {
    return 'scope' in t;
  }
  defaultOnError(t) {
    throw t;
  }
}
function Gy(e) {
  const t = c.useContext(z1);
  if (t == null)
    throw new Error(
      'Missing i18n manager. Make sure to use an <I18nContext.Provider /> somewhere in your React tree.'
    );
  const r = c.useRef(e);
  if (uf(r.current) !== uf(e))
    throw new Error(
      'You switched between providing registration options and not providing them, which is not supported.'
    );
  return Zy(t);
}
function Zy(e) {
  return [c.useContext(Yv) || new Vy([], e.details), Yy];
}
function Yy({ children: e }) {
  return c.createElement(c.Fragment, null, e);
}
function uf({ fallback: e, translations: t } = {}) {
  return e != null || t != null;
}
const Xy = ({ setSelectedData: e, setStep: t, item: r }) => {
    var k, h, f;
    const [n] = Gy(),
      [o, l] = d.useState('');
    console.log(r);
    const a = () => {
        if (!g.length) {
          l('Please select at least one item to generate claim request.');
          return;
        }
        l(''), t((b) => b + 1);
      },
      i = r.fulfillmentLineItems.map((b, S) => ({ ...b, id: S + 1 })),
      {
        selectedResources: s,
        allResourcesSelected: u,
        handleSelectionChange: m,
      } = rb(i),
      g = i.filter((b) => s.includes(b.id));
    d.useEffect(() => {
      e(g);
    }, [s]);
    const p =
        (k = r == null ? void 0 : r.fulfillmentLineItems[0]) == null
          ? void 0
          : k.claimStatus,
      v = i.map(
        (
          {
            id: b,
            title: S,
            originalPrice: F,
            discountPrice: w,
            quantity: P,
            image: E,
            name: A,
            sku: D,
            OrderId: N,
          },
          B
        ) =>
          C.jsxs(
            ft.Row,
            {
              id: b,
              selected: s == null ? void 0 : s.includes(b),
              position: B,
              children: [
                C.jsx(ft.Cell, {
                  children: C.jsxs('div', {
                    style: {
                      display: 'flex',
                      gap: '5px',
                      alignItems: 'center',
                    },
                    children: [
                      C.jsx(R1, { source: E, size: 'small', alt: A }),
                      C.jsxs('div', {
                        children: [
                          C.jsx(X, {
                            variant: 'bodyMd',
                            fontWeight: 'bold',
                            as: 'span',
                            children: S,
                          }),
                          C.jsx(X, {
                            as: 'span',
                            variant: 'bodySm',
                            tone: 'subdued',
                            truncate: !0,
                            children: D,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                C.jsxs(ft.Cell, {
                  children: [
                    w &&
                      C.jsx(X, {
                        textDecorationLine: 'line-through',
                        as: 'span',
                        tone: 'subdued',
                        children: n.formatCurrency(Number(F)),
                      }),
                    ' ',
                    ' ',
                    w ? n.formatCurrency(F - w) : n.formatCurrency(F),
                    ' ',
                    'x ',
                    P,
                  ],
                }),
                C.jsx(ft.Cell, {
                  children: w
                    ? n.formatCurrency((F - w) * P)
                    : n.formatCurrency(F * P),
                }),
              ],
            },
            b
          )
      ),
      y =
        g.length > 0
          ? `${g.length === 1 ? `- ${g.length} Item` : ` - ${g.length} items`}`
          : '',
      x =
        (h = r == null ? void 0 : r.fulfillmentLineItems) == null
          ? void 0
          : h.find((b) => !b.hasClaim);
    return C.jsx('div', {
      style: { margin: '10px 0px' },
      children: C.jsxs(xc, {
        children: [
          C.jsxs('div', {
            className: 'Polaris-Card__Section',
            style: { fontSize: '15px' },
            children: [
              C.jsxs('div', {
                style: { display: 'flex', justifyContent: 'space-between' },
                children: [
                  C.jsxs('div', {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '5px',
                    },
                    children: [
                      C.jsx(Mn, {
                        tone: 'success',
                        size: 'large',
                        children: C.jsxs('div', {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          },
                          children: [
                            C.jsx(Ee, { source: Yg }),
                            ' ',
                            C.jsxs(X, {
                              as: 'span',
                              variant: 'bodySm',
                              children: [
                                'Fulfilled (',
                                (f =
                                  r == null
                                    ? void 0
                                    : r.fulfillmentLineItems) == null
                                  ? void 0
                                  : f.length,
                                ')',
                                ' ',
                              ],
                            }),
                          ],
                        }),
                      }),
                      C.jsx(X, {
                        as: 'span',
                        variant: 'bodySm',
                        tone: 'subdued',
                        children: r == null ? void 0 : r.name,
                      }),
                    ],
                  }),
                  C.jsxs('div', {
                    style: { marginBottom: '-15px' },
                    children: [
                      'Claim Status',
                      ' ',
                      C.jsx(Mn, {
                        tone:
                          p === 'INPROGRESS'
                            ? 'warning'
                            : p === 'APPROVE'
                            ? 'success'
                            : p === 'CANCEL'
                            ? 'critical'
                            : p === 'REQUESTED'
                            ? 'info'
                            : 'new',
                        children: C.jsxs('span', {
                          style: { textTransform: 'capitalize' },
                          children: [
                            ' ',
                            p === 'INPROGRESS'
                              ? 'In Progress'
                              : (p == null ? void 0 : p.toLowerCase()) ??
                                'Not Requested',
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              C.jsx('br', {}),
            ],
          }),
          C.jsx(cv, { borderWidth: '050', borderColor: 'border-brand' }),
          C.jsx('br', {}),
          C.jsxs('div', {
            style: { fontSize: '15px' },
            children: [
              C.jsx(X, {
                as: 'h5',
                variant: 'headingMd',
                children: 'Select the items and describe the situation.',
              }),
              C.jsx('br', {}),
              C.jsx(xc, {
                children: C.jsx(ft, {
                  resourceName: { singular: 'order', plural: 'orders' },
                  itemCount: i == null ? void 0 : i.length,
                  selectedItemsCount: u ? 'All' : s == null ? void 0 : s.length,
                  onSelectionChange: m,
                  selectable: !!x,
                  headings: [
                    { title: 'Item' },
                    { title: 'Price' },
                    { title: 'Total' },
                  ],
                  children: v,
                }),
              }),
            ],
          }),
          C.jsx('br', {}),
          o &&
            C.jsxs(C.Fragment, {
              children: [
                C.jsx(ri, { message: o, setError: () => l('') }),
                ' ',
                C.jsx('br', {}),
              ],
            }),
          C.jsx('div', {
            className: 'form-actions',
            children: x
              ? C.jsx('button', {
                  type: 'submit',
                  className: 'submit',
                  onClick: a,
                  children: `Generate Claim Request ${y}`,
                })
              : C.jsx('button', {
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
  Qy = ({ setSelectedData: e, setStep: t, data: r }) =>
    C.jsxs('div', {
      children: [
        C.jsxs('div', {
          style: { display: 'flex', alignItems: 'center' },
          children: [
            C.jsx('button', {
              className: 'claim-button',
              type: 'button',
              style: { padding: '6px' },
              onClick: () => t((n) => n - 1),
              children: C.jsx(Ee, { source: Wg }),
            }),
            C.jsxs('span', {
              style: { fontSize: '18px', marginLeft: '10px' },
              children: ['Order ', r == null ? void 0 : r.name],
            }),
          ],
        }),
        C.jsx(Zv, { data: r }),
        C.jsx('br', {}),
        r.fulfillments.map((n) =>
          C.jsx(Xy, { setStep: t, setSelectedData: e, item: n }, n.name)
        ),
        C.jsx('br', {}),
      ],
    }),
  qy = ({ onclose: e = () => {} }) =>
    C.jsxs('div', {
      class: 'modal-container',
      children: [
        C.jsx('div', {
          style: {},
          children: C.jsx('svg', {
            fill: 'green',
            version: '1.1',
            id: 'Capa_1',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            width: '100px',
            height: '100px',
            viewBox: '0 0 305.002 305.002',
            'xml:space': 'preserve',
            children: C.jsx('g', {
              children: C.jsxs('g', {
                children: [
                  C.jsx('path', {
                    d: `M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
			S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
			c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z`,
                  }),
                  C.jsx('path', {
                    d: `M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
			l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
			c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z`,
                  }),
                ],
              }),
            }),
          }),
        }),
        C.jsx('br', {}),
        C.jsx('h2', {
          className: 'modal-heading',
          children: 'Thank you for submitting your claim!',
        }),
        C.jsx('br', {}),
        C.jsxs('p', {
          children: [
            'Your claim has been received and is being reviewed by one of our team. You can expect a response within ',
            C.jsx('b', { children: '24 hours.' }),
          ],
        }),
        C.jsx('br', {}),
        C.jsx('button', { className: 'submit', onClick: e, children: 'ok' }),
      ],
    }),
  Jy = () => {
    const [e, t] = d.useState(!1),
      [r, n] = d.useState(0),
      [o, l] = d.useState([]),
      [a, i] = d.useState([]),
      [s, u] = d.useState(25);
    d.useEffect(() => {
      r === 0 ? u(25) : r === 1 ? u(50) : r === 2 ? u(75) : r === 3 && u(100);
    }, [r]);
    const m = {
      createdAt: '2024-07-29T09:56:06Z',
      customerName: 'name',
      email: 'sifatfahimul@gmail.com',
      displayStatus: 'FULFILLED',
      name: '#1076',
      totalPrice: '83.3',
      id: 'gid://shopify/Order/5506086305839',
      claimStatus: 'REQUESTED',
      fulfillments: [
        {
          name: '#1076-F4',
          status: 'SUCCESS',
          displayStatus: 'FULFILLED',
          createdAt: '2024-08-07T05:07:07Z',
          fulfillmentLineItems: [
            {
              discountPrice: '5.0',
              currencyCode: 'USD',
              image:
                'https://cdn.shopify.com/s/files/1/0550/7982/9551/files/habib-success_1500x_8f92a3e2-6508-46ce-baed-92a1ad83d4ac.png?v=1696414584',
              name: 'Three',
              originalPrice: '50.0',
              sku: 'QB21',
              title: 'Three',
              quantity: 1,
              orderId: 'gid://shopify/Order/5506086305839',
              hasClaim: !0,
              claimStatus: 'REQUESTED',
            },
          ],
        },
        {
          name: '#1076-F3',
          status: 'SUCCESS',
          displayStatus: 'FULFILLED',
          createdAt: '2024-08-07T04:46:08Z',
          fulfillmentLineItems: [
            {
              discountPrice: '3.0',
              currencyCode: 'USD',
              image:
                'https://cdn.shopify.com/s/files/1/0550/7982/9551/products/habib-success_fbd18096-0f29-4e37-ba12-bcbb13b76804.png?v=1635846815',
              name: 'Two',
              originalPrice: '30.0',
              sku: null,
              title: 'Two',
              quantity: 1,
              orderId: 'gid://shopify/Order/5506086305839',
              hasClaim: !1,
              claimStatus: null,
            },
          ],
        },
      ],
    };
    let g = null;
    switch (r) {
      case 0:
        g = C.jsx(Uv, { setStep: n, setData: l });
        break;
      case 1:
        g = C.jsx(Qy, {
          setIsSubmit: t,
          setSelectedData: i,
          setStep: n,
          data: m,
        });
        break;
      case 2:
        g = C.jsx(Gv, { selectedData: a, setStep: n });
        break;
      case 3:
        g = C.jsx(qy, { onclose: () => n(0) });
        break;
      default:
        g = null;
        break;
    }
    return C.jsxs(C.Fragment, {
      children: [
        C.jsx('span', {
          onClick: () => n((p) => (p < 3 ? p + 1 : 0)),
          children: 'dd',
        }),
        C.jsx('progress', {
          value: s,
          max: '100',
          style: { '--value': s, '--max': 100 },
        }),
        C.jsx('br', {}),
        g,
      ],
    });
  };
function Ky() {
  var r, n;
  const e =
      ((n =
        (r = window == null ? void 0 : window.Shopify) == null
          ? void 0
          : r.currency) == null
        ? void 0
        : n.active) || 'USD',
    t = d.useMemo(
      () =>
        new Xv({
          locale: 'en',
          currency: e,
          onError(o) {
            console.error(o);
          },
        }),
      []
    );
  return C.jsx(z1.Provider, {
    value: t,
    children: C.jsx('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      children: C.jsx('div', {
        className: 'responsive',
        style: { margin: '20px' },
        children: C.jsx(Jy, {}),
      }),
    }),
  });
}
const ex = {
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
  tx = { Polaris: ex };
Es.createRoot(document.getElementById('claim-liquid')).render(
  C.jsx(c.StrictMode, {
    children: C.jsx(Ib, { i18n: tx, children: C.jsx(Ky, {}) }),
  })
);
