(function () {
  const r = document.createElement('link').relList;
  if (r && r.supports && r.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver((o) => {
    for (const l of o)
      if (l.type === 'childList')
        for (const i of l.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(o) {
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
    const l = t(o);
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
  rd = Symbol.for('react.context'),
  td = Symbol.for('react.forward_ref'),
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
function At(e, r, t) {
  (this.props = e),
    (this.context = r),
    (this.refs = xu),
    (this.updater = t || yu);
}
At.prototype.isReactComponent = {};
At.prototype.setState = function (e, r) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, e, r, 'setState');
};
At.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function Au() {}
Au.prototype = At.prototype;
function Bi(e, r, t) {
  (this.props = e),
    (this.context = r),
    (this.refs = xu),
    (this.updater = t || yu);
}
var Mi = (Bi.prototype = new Au());
Mi.constructor = Bi;
vu(Mi, At.prototype);
Mi.isPureReactComponent = !0;
var Ta = Array.isArray,
  wu = Object.prototype.hasOwnProperty,
  zi = { current: null },
  Su = { key: !0, ref: !0, __self: !0, __source: !0 };
function Du(e, r, t) {
  var n,
    o = {},
    l = null,
    i = null;
  if (r != null)
    for (n in (r.ref !== void 0 && (i = r.ref),
    r.key !== void 0 && (l = '' + r.key),
    r))
      wu.call(r, n) && !Su.hasOwnProperty(n) && (o[n] = r[n]);
  var a = arguments.length - 2;
  if (a === 1) o.children = t;
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
function ad(e, r) {
  return {
    $$typeof: vn,
    type: e.type,
    key: r,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Pi(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === vn;
}
function sd(e) {
  var r = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (t) {
      return r[t];
    })
  );
}
var Ba = /\/+/g;
function rl(e, r) {
  return typeof e == 'object' && e !== null && e.key != null
    ? sd('' + e.key)
    : r.toString(36);
}
function Kn(e, r, t, n, o) {
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
      (e = n === '' ? '.' + rl(i, 0) : n),
      Ta(o)
        ? ((t = ''),
          e != null && (t = e.replace(Ba, '$&/') + '/'),
          Kn(o, r, t, '', function (u) {
            return u;
          }))
        : o != null &&
          (Pi(o) &&
            (o = ad(
              o,
              t +
                (!o.key || (i && i.key === o.key)
                  ? ''
                  : ('' + o.key).replace(Ba, '$&/') + '/') +
                e
            )),
          r.push(o)),
      1
    );
  if (((i = 0), (n = n === '' ? '.' : n + ':'), Ta(e)))
    for (var a = 0; a < e.length; a++) {
      l = e[a];
      var s = n + rl(l, a);
      i += Kn(l, r, t, s, o);
    }
  else if (((s = id(e)), typeof s == 'function'))
    for (e = s.call(e), a = 0; !(l = e.next()).done; )
      (l = l.value), (s = n + rl(l, a++)), (i += Kn(l, r, t, s, o));
  else if (l === 'object')
    throw (
      ((r = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (r === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : r) +
          '). If you meant to render a collection of children, use an array instead.'
      ))
    );
  return i;
}
function En(e, r, t) {
  if (e == null) return e;
  var n = [],
    o = 0;
  return (
    Kn(e, n, '', '', function (l) {
      return r.call(t, l, o++);
    }),
    n
  );
}
function ud(e) {
  if (e._status === -1) {
    var r = e._result;
    (r = r()),
      r.then(
        function (t) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = t));
        },
        function (t) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = t));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = r));
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
  forEach: function (e, r, t) {
    En(
      e,
      function () {
        r.apply(this, arguments);
      },
      t
    );
  },
  count: function (e) {
    var r = 0;
    return (
      En(e, function () {
        r++;
      }),
      r
    );
  },
  toArray: function (e) {
    return (
      En(e, function (r) {
        return r;
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
z.Component = At;
z.Fragment = Z0;
z.Profiler = q0;
z.PureComponent = Bi;
z.StrictMode = X0;
z.Suspense = nd;
z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = cd;
z.act = Fu;
z.cloneElement = function (e, r, t) {
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
  if (r != null) {
    if (
      (r.ref !== void 0 && ((l = r.ref), (i = zi.current)),
      r.key !== void 0 && (o = '' + r.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (s in r)
      wu.call(r, s) &&
        !Su.hasOwnProperty(s) &&
        (n[s] = r[s] === void 0 && a !== void 0 ? a[s] : r[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) n.children = t;
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
      $$typeof: rd,
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
  var r = Du.bind(null, e);
  return (r.type = e), r;
};
z.createRef = function () {
  return { current: null };
};
z.forwardRef = function (e) {
  return { $$typeof: td, render: e };
};
z.isValidElement = Pi;
z.lazy = function (e) {
  return { $$typeof: ld, _payload: { _status: -1, _result: e }, _init: ud };
};
z.memo = function (e, r) {
  return { $$typeof: od, type: e, compare: r === void 0 ? null : r };
};
z.startTransition = function (e) {
  var r = Vn.transition;
  Vn.transition = {};
  try {
    e();
  } finally {
    Vn.transition = r;
  }
};
z.unstable_act = Fu;
z.useCallback = function (e, r) {
  return ge.current.useCallback(e, r);
};
z.useContext = function (e) {
  return ge.current.useContext(e);
};
z.useDebugValue = function () {};
z.useDeferredValue = function (e) {
  return ge.current.useDeferredValue(e);
};
z.useEffect = function (e, r) {
  return ge.current.useEffect(e, r);
};
z.useId = function () {
  return ge.current.useId();
};
z.useImperativeHandle = function (e, r, t) {
  return ge.current.useImperativeHandle(e, r, t);
};
z.useInsertionEffect = function (e, r) {
  return ge.current.useInsertionEffect(e, r);
};
z.useLayoutEffect = function (e, r) {
  return ge.current.useLayoutEffect(e, r);
};
z.useMemo = function (e, r) {
  return ge.current.useMemo(e, r);
};
z.useReducer = function (e, r, t) {
  return ge.current.useReducer(e, r, t);
};
z.useRef = function (e) {
  return ge.current.useRef(e);
};
z.useState = function (e) {
  return ge.current.useState(e);
};
z.useSyncExternalStore = function (e, r, t) {
  return ge.current.useSyncExternalStore(e, r, t);
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
function Eu(e, r, t) {
  var n,
    o = {},
    l = null,
    i = null;
  t !== void 0 && (l = '' + t),
    r.key !== void 0 && (l = '' + r.key),
    r.ref !== void 0 && (i = r.ref);
  for (n in r) gd.call(r, n) && !pd.hasOwnProperty(n) && (o[n] = r[n]);
  if (e && e.defaultProps)
    for (n in ((r = e.defaultProps), r)) o[n] === void 0 && (o[n] = r[n]);
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
  function r(E, B) {
    var M = E.length;
    E.push(B);
    e: for (; 0 < M; ) {
      var Y = (M - 1) >>> 1,
        re = E[Y];
      if (0 < o(re, B)) (E[Y] = B), (E[M] = re), (M = Y);
      else break e;
    }
  }
  function t(E) {
    return E.length === 0 ? null : E[0];
  }
  function n(E) {
    if (E.length === 0) return null;
    var B = E[0],
      M = E.pop();
    if (M !== B) {
      E[0] = M;
      e: for (var Y = 0, re = E.length, Dn = re >>> 1; Y < Dn; ) {
        var Nr = 2 * (Y + 1) - 1,
          el = E[Nr],
          Ir = Nr + 1,
          Fn = E[Ir];
        if (0 > o(el, M))
          Ir < re && 0 > o(Fn, el)
            ? ((E[Y] = Fn), (E[Ir] = M), (Y = Ir))
            : ((E[Y] = el), (E[Nr] = M), (Y = Nr));
        else if (Ir < re && 0 > o(Fn, M)) (E[Y] = Fn), (E[Ir] = M), (Y = Ir);
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
    for (var B = t(u); B !== null; ) {
      if (B.callback === null) n(u);
      else if (B.startTime <= E)
        n(u), (B.sortIndex = B.expirationTime), r(s, B);
      else break;
      B = t(u);
    }
  }
  function v(E) {
    if (((w = !1), g(E), !x))
      if (t(s) !== null) (x = !0), Xo(S);
      else {
        var B = t(u);
        B !== null && qo(v, B.startTime - E);
      }
  }
  function S(E, B) {
    (x = !1), w && ((w = !1), f(N), (N = -1)), (y = !0);
    var M = h;
    try {
      for (
        g(B), p = t(s);
        p !== null && (!(p.expirationTime > B) || (E && !T()));

      ) {
        var Y = p.callback;
        if (typeof Y == 'function') {
          (p.callback = null), (h = p.priorityLevel);
          var re = Y(p.expirationTime <= B);
          (B = e.unstable_now()),
            typeof re == 'function' ? (p.callback = re) : p === t(s) && n(s),
            g(B);
        } else n(s);
        p = t(s);
      }
      if (p !== null) var Dn = !0;
      else {
        var Nr = t(u);
        Nr !== null && qo(v, Nr.startTime - B), (Dn = !1);
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
    var Dt = new MessageChannel(),
      G0 = Dt.port2;
    (Dt.port1.onmessage = $),
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
      return t(s);
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
          var re = -1;
          break;
        case 2:
          re = 250;
          break;
        case 5:
          re = 1073741823;
          break;
        case 4:
          re = 1e4;
          break;
        default:
          re = 5e3;
      }
      return (
        (re = M + re),
        (E = {
          id: m++,
          callback: B,
          priorityLevel: E,
          startTime: M,
          expirationTime: re,
          sortIndex: -1,
        }),
        M > Y
          ? ((E.sortIndex = M),
            r(u, E),
            t(s) === null &&
              E === t(u) &&
              (w ? (f(N), (N = -1)) : (w = !0), qo(v, M - Y)))
          : ((E.sortIndex = re), r(s, E), x || y || ((x = !0), Xo(S))),
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
    var r = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, t = 1;
    t < arguments.length;
    t++
  )
    r += '&args[]=' + encodeURIComponent(arguments[t]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    r +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var Iu = new Set(),
  Xt = {};
function $r(e, r) {
  mt(e, r), mt(e + 'Capture', r);
}
function mt(e, r) {
  for (Xt[e] = r, e = 0; e < r.length; e++) Iu.add(r[e]);
}
var er = !(
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
function Ad(e, r, t, n) {
  if (t !== null && t.type === 0) return !1;
  switch (typeof r) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return n
        ? !1
        : t !== null
        ? !t.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function wd(e, r, t, n) {
  if (r === null || typeof r > 'u' || Ad(e, r, t, n)) return !0;
  if (n) return !1;
  if (t !== null)
    switch (t.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
  return !1;
}
function he(e, r, t, n, o, l, i) {
  (this.acceptsBooleans = r === 2 || r === 3 || r === 4),
    (this.attributeName = n),
    (this.attributeNamespace = o),
    (this.mustUseProperty = t),
    (this.propertyName = e),
    (this.type = r),
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
  var r = e[0];
  ae[r] = new he(r, 1, !1, e[1], null, !1, !1);
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
    var r = e.replace(Li, Ri);
    ae[r] = new he(r, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var r = e.replace(Li, Ri);
    ae[r] = new he(r, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var r = e.replace(Li, Ri);
  ae[r] = new he(r, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
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
function ji(e, r, t, n) {
  var o = ae.hasOwnProperty(r) ? ae[r] : null;
  (o !== null
    ? o.type !== 0
    : n ||
      !(2 < r.length) ||
      (r[0] !== 'o' && r[0] !== 'O') ||
      (r[1] !== 'n' && r[1] !== 'N')) &&
    (wd(r, t, o, n) && (t = null),
    n || o === null
      ? xd(r) && (t === null ? e.removeAttribute(r) : e.setAttribute(r, '' + t))
      : o.mustUseProperty
      ? (e[o.propertyName] = t === null ? (o.type === 3 ? !1 : '') : t)
      : ((r = o.attributeName),
        (n = o.attributeNamespace),
        t === null
          ? e.removeAttribute(r)
          : ((o = o.type),
            (t = o === 3 || (o === 4 && t === !0) ? '' : '' + t),
            n ? e.setAttributeNS(n, r, t) : e.setAttribute(r, t))));
}
var lr = yd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Cn = Symbol.for('react.element'),
  Gr = Symbol.for('react.portal'),
  Yr = Symbol.for('react.fragment'),
  _i = Symbol.for('react.strict_mode'),
  Rl = Symbol.for('react.profiler'),
  Tu = Symbol.for('react.provider'),
  Bu = Symbol.for('react.context'),
  Oi = Symbol.for('react.forward_ref'),
  jl = Symbol.for('react.suspense'),
  _l = Symbol.for('react.suspense_list'),
  Ui = Symbol.for('react.memo'),
  sr = Symbol.for('react.lazy'),
  Mu = Symbol.for('react.offscreen'),
  Pa = Symbol.iterator;
function Ft(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Pa && e[Pa]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var V = Object.assign,
  tl;
function zt(e) {
  if (tl === void 0)
    try {
      throw Error();
    } catch (t) {
      var r = t.stack.trim().match(/\n( *(at )?)/);
      tl = (r && r[1]) || '';
    }
  return (
    `
` +
    tl +
    e
  );
}
var nl = !1;
function ol(e, r) {
  if (!e || nl) return '';
  nl = !0;
  var t = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (r)
      if (
        ((r = function () {
          throw Error();
        }),
        Object.defineProperty(r.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(r, []);
        } catch (u) {
          var n = u;
        }
        Reflect.construct(e, [], r);
      } else {
        try {
          r.call();
        } catch (u) {
          n = u;
        }
        e.call(r.prototype);
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
    (nl = !1), (Error.prepareStackTrace = t);
  }
  return (e = e ? e.displayName || e.name : '') ? zt(e) : '';
}
function Sd(e) {
  switch (e.tag) {
    case 5:
      return zt(e.type);
    case 16:
      return zt('Lazy');
    case 13:
      return zt('Suspense');
    case 19:
      return zt('SuspenseList');
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
    case Yr:
      return 'Fragment';
    case Gr:
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
        var r = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = r.displayName || r.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case Ui:
        return (
          (r = e.displayName || null), r !== null ? r : Ol(e.type) || 'Memo'
        );
      case sr:
        (r = e._payload), (e = e._init);
        try {
          return Ol(e(r));
        } catch {}
    }
  return null;
}
function Dd(e) {
  var r = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (r.displayName || 'Context') + '.Consumer';
    case 10:
      return (r._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = r.render),
        (e = e.displayName || e.name || ''),
        r.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return r;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return Ol(r);
    case 8:
      return r === _i ? 'StrictMode' : 'Mode';
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
      if (typeof r == 'function') return r.displayName || r.name || null;
      if (typeof r == 'string') return r;
  }
  return null;
}
function Sr(e) {
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
  var r = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (r === 'checkbox' || r === 'radio')
  );
}
function Fd(e) {
  var r = zu(e) ? 'checked' : 'value',
    t = Object.getOwnPropertyDescriptor(e.constructor.prototype, r),
    n = '' + e[r];
  if (
    !e.hasOwnProperty(r) &&
    typeof t < 'u' &&
    typeof t.get == 'function' &&
    typeof t.set == 'function'
  ) {
    var o = t.get,
      l = t.set;
    return (
      Object.defineProperty(e, r, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (i) {
          (n = '' + i), l.call(this, i);
        },
      }),
      Object.defineProperty(e, r, { enumerable: t.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (i) {
          n = '' + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[r];
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
  var r = e._valueTracker;
  if (!r) return !0;
  var t = r.getValue(),
    n = '';
  return (
    e && (n = zu(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = n),
    e !== t ? (r.setValue(e), !0) : !1
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
function Ul(e, r) {
  var t = r.checked;
  return V({}, r, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: t ?? e._wrapperState.initialChecked,
  });
}
function La(e, r) {
  var t = r.defaultValue == null ? '' : r.defaultValue,
    n = r.checked != null ? r.checked : r.defaultChecked;
  (t = Sr(r.value != null ? r.value : t)),
    (e._wrapperState = {
      initialChecked: n,
      initialValue: t,
      controlled:
        r.type === 'checkbox' || r.type === 'radio'
          ? r.checked != null
          : r.value != null,
    });
}
function Lu(e, r) {
  (r = r.checked), r != null && ji(e, 'checked', r, !1);
}
function Hl(e, r) {
  Lu(e, r);
  var t = Sr(r.value),
    n = r.type;
  if (t != null)
    n === 'number'
      ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + t)
      : e.value !== '' + t && (e.value = '' + t);
  else if (n === 'submit' || n === 'reset') {
    e.removeAttribute('value');
    return;
  }
  r.hasOwnProperty('value')
    ? Ql(e, r.type, t)
    : r.hasOwnProperty('defaultValue') && Ql(e, r.type, Sr(r.defaultValue)),
    r.checked == null &&
      r.defaultChecked != null &&
      (e.defaultChecked = !!r.defaultChecked);
}
function Ra(e, r, t) {
  if (r.hasOwnProperty('value') || r.hasOwnProperty('defaultValue')) {
    var n = r.type;
    if (
      !(
        (n !== 'submit' && n !== 'reset') ||
        (r.value !== void 0 && r.value !== null)
      )
    )
      return;
    (r = '' + e._wrapperState.initialValue),
      t || r === e.value || (e.value = r),
      (e.defaultValue = r);
  }
  (t = e.name),
    t !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    t !== '' && (e.name = t);
}
function Ql(e, r, t) {
  (r !== 'number' || lo(e.ownerDocument) !== e) &&
    (t == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + t && (e.defaultValue = '' + t));
}
var Pt = Array.isArray;
function at(e, r, t, n) {
  if (((e = e.options), r)) {
    r = {};
    for (var o = 0; o < t.length; o++) r['$' + t[o]] = !0;
    for (t = 0; t < e.length; t++)
      (o = r.hasOwnProperty('$' + e[t].value)),
        e[t].selected !== o && (e[t].selected = o),
        o && n && (e[t].defaultSelected = !0);
  } else {
    for (t = '' + Sr(t), r = null, o = 0; o < e.length; o++) {
      if (e[o].value === t) {
        (e[o].selected = !0), n && (e[o].defaultSelected = !0);
        return;
      }
      r !== null || e[o].disabled || (r = e[o]);
    }
    r !== null && (r.selected = !0);
  }
}
function $l(e, r) {
  if (r.dangerouslySetInnerHTML != null) throw Error(A(91));
  return V({}, r, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function ja(e, r) {
  var t = r.value;
  if (t == null) {
    if (((t = r.children), (r = r.defaultValue), t != null)) {
      if (r != null) throw Error(A(92));
      if (Pt(t)) {
        if (1 < t.length) throw Error(A(93));
        t = t[0];
      }
      r = t;
    }
    r == null && (r = ''), (t = r);
  }
  e._wrapperState = { initialValue: Sr(t) };
}
function Ru(e, r) {
  var t = Sr(r.value),
    n = Sr(r.defaultValue);
  t != null &&
    ((t = '' + t),
    t !== e.value && (e.value = t),
    r.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)),
    n != null && (e.defaultValue = '' + n);
}
function _a(e) {
  var r = e.textContent;
  r === e._wrapperState.initialValue && r !== '' && r !== null && (e.value = r);
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
function Wl(e, r) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? ju(r)
    : e === 'http://www.w3.org/2000/svg' && r === 'foreignObject'
    ? 'http://www.w3.org/1999/xhtml'
    : e;
}
var Nn,
  _u = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (r, t, n, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(r, t, n, o);
          });
        }
      : e;
  })(function (e, r) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = r;
    else {
      for (
        Nn = Nn || document.createElement('div'),
          Nn.innerHTML = '<svg>' + r.valueOf().toString() + '</svg>',
          r = Nn.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; r.firstChild; ) e.appendChild(r.firstChild);
    }
  });
function qt(e, r) {
  if (r) {
    var t = e.firstChild;
    if (t && t === e.lastChild && t.nodeType === 3) {
      t.nodeValue = r;
      return;
    }
  }
  e.textContent = r;
}
var jt = {
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
Object.keys(jt).forEach(function (e) {
  Ed.forEach(function (r) {
    (r = r + e.charAt(0).toUpperCase() + e.substring(1)), (jt[r] = jt[e]);
  });
});
function Ou(e, r, t) {
  return r == null || typeof r == 'boolean' || r === ''
    ? ''
    : t || typeof r != 'number' || r === 0 || (jt.hasOwnProperty(e) && jt[e])
    ? ('' + r).trim()
    : r + 'px';
}
function Uu(e, r) {
  e = e.style;
  for (var t in r)
    if (r.hasOwnProperty(t)) {
      var n = t.indexOf('--') === 0,
        o = Ou(t, r[t], n);
      t === 'float' && (t = 'cssFloat'), n ? e.setProperty(t, o) : (e[t] = o);
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
function Kl(e, r) {
  if (r) {
    if (Cd[e] && (r.children != null || r.dangerouslySetInnerHTML != null))
      throw Error(A(137, e));
    if (r.dangerouslySetInnerHTML != null) {
      if (r.children != null) throw Error(A(60));
      if (
        typeof r.dangerouslySetInnerHTML != 'object' ||
        !('__html' in r.dangerouslySetInnerHTML)
      )
        throw Error(A(61));
    }
    if (r.style != null && typeof r.style != 'object') throw Error(A(62));
  }
}
function Vl(e, r) {
  if (e.indexOf('-') === -1) return typeof r.is == 'string';
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
  st = null,
  ut = null;
function Oa(e) {
  if ((e = wn(e))) {
    if (typeof Yl != 'function') throw Error(A(280));
    var r = e.stateNode;
    r && ((r = _o(r)), Yl(e.stateNode, e.type, r));
  }
}
function Hu(e) {
  st ? (ut ? ut.push(e) : (ut = [e])) : (st = e);
}
function Qu() {
  if (st) {
    var e = st,
      r = ut;
    if (((ut = st = null), Oa(e), r)) for (e = 0; e < r.length; e++) Oa(r[e]);
  }
}
function $u(e, r) {
  return e(r);
}
function Wu() {}
var ll = !1;
function Ku(e, r, t) {
  if (ll) return e(r, t);
  ll = !0;
  try {
    return $u(e, r, t);
  } finally {
    (ll = !1), (st !== null || ut !== null) && (Wu(), Qu());
  }
}
function en(e, r) {
  var t = e.stateNode;
  if (t === null) return null;
  var n = _o(t);
  if (n === null) return null;
  t = n[r];
  e: switch (r) {
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
  if (t && typeof t != 'function') throw Error(A(231, r, typeof t));
  return t;
}
var Jl = !1;
if (er)
  try {
    var Et = {};
    Object.defineProperty(Et, 'passive', {
      get: function () {
        Jl = !0;
      },
    }),
      window.addEventListener('test', Et, Et),
      window.removeEventListener('test', Et, Et);
  } catch {
    Jl = !1;
  }
function kd(e, r, t, n, o, l, i, a, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    r.apply(t, u);
  } catch (m) {
    this.onError(m);
  }
}
var _t = !1,
  io = null,
  ao = !1,
  Zl = null,
  Nd = {
    onError: function (e) {
      (_t = !0), (io = e);
    },
  };
function Id(e, r, t, n, o, l, i, a, s) {
  (_t = !1), (io = null), kd.apply(Nd, arguments);
}
function Td(e, r, t, n, o, l, i, a, s) {
  if ((Id.apply(this, arguments), _t)) {
    if (_t) {
      var u = io;
      (_t = !1), (io = null);
    } else throw Error(A(198));
    ao || ((ao = !0), (Zl = u));
  }
}
function Wr(e) {
  var r = e,
    t = e;
  if (e.alternate) for (; r.return; ) r = r.return;
  else {
    e = r;
    do (r = e), r.flags & 4098 && (t = r.return), (e = r.return);
    while (e);
  }
  return r.tag === 3 ? t : null;
}
function Vu(e) {
  if (e.tag === 13) {
    var r = e.memoizedState;
    if (
      (r === null && ((e = e.alternate), e !== null && (r = e.memoizedState)),
      r !== null)
    )
      return r.dehydrated;
  }
  return null;
}
function Ua(e) {
  if (Wr(e) !== e) throw Error(A(188));
}
function Bd(e) {
  var r = e.alternate;
  if (!r) {
    if (((r = Wr(e)), r === null)) throw Error(A(188));
    return r !== e ? null : e;
  }
  for (var t = e, n = r; ; ) {
    var o = t.return;
    if (o === null) break;
    var l = o.alternate;
    if (l === null) {
      if (((n = o.return), n !== null)) {
        t = n;
        continue;
      }
      break;
    }
    if (o.child === l.child) {
      for (l = o.child; l; ) {
        if (l === t) return Ua(o), e;
        if (l === n) return Ua(o), r;
        l = l.sibling;
      }
      throw Error(A(188));
    }
    if (t.return !== n.return) (t = o), (n = l);
    else {
      for (var i = !1, a = o.child; a; ) {
        if (a === t) {
          (i = !0), (t = o), (n = l);
          break;
        }
        if (a === n) {
          (i = !0), (n = o), (t = l);
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = l.child; a; ) {
          if (a === t) {
            (i = !0), (t = l), (n = o);
            break;
          }
          if (a === n) {
            (i = !0), (n = l), (t = o);
            break;
          }
          a = a.sibling;
        }
        if (!i) throw Error(A(189));
      }
    }
    if (t.alternate !== n) throw Error(A(190));
  }
  if (t.tag !== 3) throw Error(A(188));
  return t.stateNode.current === t ? e : r;
}
function Gu(e) {
  return (e = Bd(e)), e !== null ? Yu(e) : null;
}
function Yu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var r = Yu(e);
    if (r !== null) return r;
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
function Lt(e) {
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
function uo(e, r) {
  var t = e.pendingLanes;
  if (t === 0) return 0;
  var n = 0,
    o = e.suspendedLanes,
    l = e.pingedLanes,
    i = t & 268435455;
  if (i !== 0) {
    var a = i & ~o;
    a !== 0 ? (n = Lt(a)) : ((l &= i), l !== 0 && (n = Lt(l)));
  } else (i = t & ~o), i !== 0 ? (n = Lt(i)) : l !== 0 && (n = Lt(l));
  if (n === 0) return 0;
  if (
    r !== 0 &&
    r !== n &&
    !(r & o) &&
    ((o = n & -n), (l = r & -r), o >= l || (o === 16 && (l & 4194240) !== 0))
  )
    return r;
  if ((n & 4 && (n |= t & 16), (r = e.entangledLanes), r !== 0))
    for (e = e.entanglements, r &= n; 0 < r; )
      (t = 31 - Oe(r)), (o = 1 << t), (n |= e[t]), (r &= ~o);
  return n;
}
function Ud(e, r) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return r + 250;
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
      return r + 5e3;
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
function Hd(e, r) {
  for (
    var t = e.suspendedLanes,
      n = e.pingedLanes,
      o = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;

  ) {
    var i = 31 - Oe(l),
      a = 1 << i,
      s = o[i];
    s === -1
      ? (!(a & t) || a & n) && (o[i] = Ud(a, r))
      : s <= r && (e.expiredLanes |= a),
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
  for (var r = [], t = 0; 31 > t; t++) r.push(e);
  return r;
}
function xn(e, r, t) {
  (e.pendingLanes |= r),
    r !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (r = 31 - Oe(r)),
    (e[r] = t);
}
function Qd(e, r) {
  var t = e.pendingLanes & ~r;
  (e.pendingLanes = r),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= r),
    (e.mutableReadLanes &= r),
    (e.entangledLanes &= r),
    (r = e.entanglements);
  var n = e.eventTimes;
  for (e = e.expirationTimes; 0 < t; ) {
    var o = 31 - Oe(t),
      l = 1 << o;
    (r[o] = 0), (n[o] = -1), (e[o] = -1), (t &= ~l);
  }
}
function $i(e, r) {
  var t = (e.entangledLanes |= r);
  for (e = e.entanglements; t; ) {
    var n = 31 - Oe(t),
      o = 1 << n;
    (o & r) | (e[n] & r) && (e[n] |= r), (t &= ~o);
  }
}
var R = 0;
function ec(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var rc,
  Wi,
  tc,
  nc,
  oc,
  ql = !1,
  Bn = [],
  gr = null,
  hr = null,
  pr = null,
  rn = new Map(),
  tn = new Map(),
  cr = [],
  $d =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function Qa(e, r) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      gr = null;
      break;
    case 'dragenter':
    case 'dragleave':
      hr = null;
      break;
    case 'mouseover':
    case 'mouseout':
      pr = null;
      break;
    case 'pointerover':
    case 'pointerout':
      rn.delete(r.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      tn.delete(r.pointerId);
  }
}
function Ct(e, r, t, n, o, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: r,
        domEventName: t,
        eventSystemFlags: n,
        nativeEvent: l,
        targetContainers: [o],
      }),
      r !== null && ((r = wn(r)), r !== null && Wi(r)),
      e)
    : ((e.eventSystemFlags |= n),
      (r = e.targetContainers),
      o !== null && r.indexOf(o) === -1 && r.push(o),
      e);
}
function Wd(e, r, t, n, o) {
  switch (r) {
    case 'focusin':
      return (gr = Ct(gr, e, r, t, n, o)), !0;
    case 'dragenter':
      return (hr = Ct(hr, e, r, t, n, o)), !0;
    case 'mouseover':
      return (pr = Ct(pr, e, r, t, n, o)), !0;
    case 'pointerover':
      var l = o.pointerId;
      return rn.set(l, Ct(rn.get(l) || null, e, r, t, n, o)), !0;
    case 'gotpointercapture':
      return (
        (l = o.pointerId), tn.set(l, Ct(tn.get(l) || null, e, r, t, n, o)), !0
      );
  }
  return !1;
}
function lc(e) {
  var r = Mr(e.target);
  if (r !== null) {
    var t = Wr(r);
    if (t !== null) {
      if (((r = t.tag), r === 13)) {
        if (((r = Vu(t)), r !== null)) {
          (e.blockedOn = r),
            oc(e.priority, function () {
              tc(t);
            });
          return;
        }
      } else if (r === 3 && t.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Gn(e) {
  if (e.blockedOn !== null) return !1;
  for (var r = e.targetContainers; 0 < r.length; ) {
    var t = ei(e.domEventName, e.eventSystemFlags, r[0], e.nativeEvent);
    if (t === null) {
      t = e.nativeEvent;
      var n = new t.constructor(t.type, t);
      (Gl = n), t.target.dispatchEvent(n), (Gl = null);
    } else return (r = wn(t)), r !== null && Wi(r), (e.blockedOn = t), !1;
    r.shift();
  }
  return !0;
}
function $a(e, r, t) {
  Gn(e) && t.delete(r);
}
function Kd() {
  (ql = !1),
    gr !== null && Gn(gr) && (gr = null),
    hr !== null && Gn(hr) && (hr = null),
    pr !== null && Gn(pr) && (pr = null),
    rn.forEach($a),
    tn.forEach($a);
}
function kt(e, r) {
  e.blockedOn === r &&
    ((e.blockedOn = null),
    ql ||
      ((ql = !0),
      Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, Kd)));
}
function nn(e) {
  function r(o) {
    return kt(o, e);
  }
  if (0 < Bn.length) {
    kt(Bn[0], e);
    for (var t = 1; t < Bn.length; t++) {
      var n = Bn[t];
      n.blockedOn === e && (n.blockedOn = null);
    }
  }
  for (
    gr !== null && kt(gr, e),
      hr !== null && kt(hr, e),
      pr !== null && kt(pr, e),
      rn.forEach(r),
      tn.forEach(r),
      t = 0;
    t < cr.length;
    t++
  )
    (n = cr[t]), n.blockedOn === e && (n.blockedOn = null);
  for (; 0 < cr.length && ((t = cr[0]), t.blockedOn === null); )
    lc(t), t.blockedOn === null && cr.shift();
}
var ct = lr.ReactCurrentBatchConfig,
  co = !0;
function Vd(e, r, t, n) {
  var o = R,
    l = ct.transition;
  ct.transition = null;
  try {
    (R = 1), Ki(e, r, t, n);
  } finally {
    (R = o), (ct.transition = l);
  }
}
function Gd(e, r, t, n) {
  var o = R,
    l = ct.transition;
  ct.transition = null;
  try {
    (R = 4), Ki(e, r, t, n);
  } finally {
    (R = o), (ct.transition = l);
  }
}
function Ki(e, r, t, n) {
  if (co) {
    var o = ei(e, r, t, n);
    if (o === null) pl(e, r, n, fo, t), Qa(e, n);
    else if (Wd(o, e, r, t, n)) n.stopPropagation();
    else if ((Qa(e, n), r & 4 && -1 < $d.indexOf(e))) {
      for (; o !== null; ) {
        var l = wn(o);
        if (
          (l !== null && rc(l),
          (l = ei(e, r, t, n)),
          l === null && pl(e, r, n, fo, t),
          l === o)
        )
          break;
        o = l;
      }
      o !== null && n.stopPropagation();
    } else pl(e, r, n, null, t);
  }
}
var fo = null;
function ei(e, r, t, n) {
  if (((fo = null), (e = Hi(n)), (e = Mr(e)), e !== null))
    if (((r = Wr(e)), r === null)) e = null;
    else if (((t = r.tag), t === 13)) {
      if (((e = Vu(r)), e !== null)) return e;
      e = null;
    } else if (t === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated)
        return r.tag === 3 ? r.stateNode.containerInfo : null;
      e = null;
    } else r !== e && (e = null);
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
var fr = null,
  Vi = null,
  Yn = null;
function ac() {
  if (Yn) return Yn;
  var e,
    r = Vi,
    t = r.length,
    n,
    o = 'value' in fr ? fr.value : fr.textContent,
    l = o.length;
  for (e = 0; e < t && r[e] === o[e]; e++);
  var i = t - e;
  for (n = 1; n <= i && r[t - n] === o[l - n]; n++);
  return (Yn = o.slice(e, 1 < n ? 1 - n : void 0));
}
function Jn(e) {
  var r = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && r === 13 && (e = 13))
      : (e = r),
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
  function r(t, n, o, l, i) {
    (this._reactName = t),
      (this._targetInst = o),
      (this.type = n),
      (this.nativeEvent = l),
      (this.target = i),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((t = e[a]), (this[a] = t ? t(l) : l[a]));
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
    V(r.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var t = this.nativeEvent;
        t &&
          (t.preventDefault
            ? t.preventDefault()
            : typeof t.returnValue != 'unknown' && (t.returnValue = !1),
          (this.isDefaultPrevented = Mn));
      },
      stopPropagation: function () {
        var t = this.nativeEvent;
        t &&
          (t.stopPropagation
            ? t.stopPropagation()
            : typeof t.cancelBubble != 'unknown' && (t.cancelBubble = !0),
          (this.isPropagationStopped = Mn));
      },
      persist: function () {},
      isPersistent: Mn,
    }),
    r
  );
}
var wt = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Gi = ke(wt),
  An = V({}, wt, { view: 0, detail: 0 }),
  Yd = ke(An),
  al,
  sl,
  Nt,
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
        : (e !== Nt &&
            (Nt && e.type === 'mousemove'
              ? ((al = e.screenX - Nt.screenX), (sl = e.screenY - Nt.screenY))
              : (sl = al = 0),
            (Nt = e)),
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
  qd = V({}, wt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  ef = ke(qd),
  rf = V({}, wt, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  tf = ke(rf),
  nf = V({}, wt, { data: 0 }),
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
  var r = this.nativeEvent;
  return r.getModifierState ? r.getModifierState(e) : (e = af[e]) ? !!r[e] : !1;
}
function Yi() {
  return sf;
}
var uf = V({}, An, {
    key: function (e) {
      if (e.key) {
        var r = of[e.key] || e.key;
        if (r !== 'Unidentified') return r;
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
  gf = V({}, wt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
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
  Ji = er && 'CompositionEvent' in window,
  Ot = null;
er && 'documentMode' in document && (Ot = document.documentMode);
var vf = er && 'TextEvent' in window && !Ot,
  sc = er && (!Ji || (Ot && 8 < Ot && 11 >= Ot)),
  Ya = ' ',
  Ja = !1;
function uc(e, r) {
  switch (e) {
    case 'keyup':
      return yf.indexOf(r.keyCode) !== -1;
    case 'keydown':
      return r.keyCode !== 229;
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
var Jr = !1;
function xf(e, r) {
  switch (e) {
    case 'compositionend':
      return cc(r);
    case 'keypress':
      return r.which !== 32 ? null : ((Ja = !0), Ya);
    case 'textInput':
      return (e = r.data), e === Ya && Ja ? null : e;
    default:
      return null;
  }
}
function Af(e, r) {
  if (Jr)
    return e === 'compositionend' || (!Ji && uc(e, r))
      ? ((e = ac()), (Yn = Vi = fr = null), (Jr = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(r.ctrlKey || r.altKey || r.metaKey) || (r.ctrlKey && r.altKey)) {
        if (r.char && 1 < r.char.length) return r.char;
        if (r.which) return String.fromCharCode(r.which);
      }
      return null;
    case 'compositionend':
      return sc && r.locale !== 'ko' ? null : r.data;
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
  var r = e && e.nodeName && e.nodeName.toLowerCase();
  return r === 'input' ? !!wf[e.type] : r === 'textarea';
}
function dc(e, r, t, n) {
  Hu(n),
    (r = mo(r, 'onChange')),
    0 < r.length &&
      ((t = new Gi('onChange', 'change', null, t, n)),
      e.push({ event: t, listeners: r }));
}
var Ut = null,
  on = null;
function Sf(e) {
  wc(e, 0);
}
function Ro(e) {
  var r = qr(e);
  if (Pu(r)) return e;
}
function Df(e, r) {
  if (e === 'change') return r;
}
var fc = !1;
if (er) {
  var cl;
  if (er) {
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
  Ut && (Ut.detachEvent('onpropertychange', mc), (on = Ut = null));
}
function mc(e) {
  if (e.propertyName === 'value' && Ro(on)) {
    var r = [];
    dc(r, on, e, Hi(e)), Ku(Sf, r);
  }
}
function Ff(e, r, t) {
  e === 'focusin'
    ? (qa(), (Ut = r), (on = t), Ut.attachEvent('onpropertychange', mc))
    : e === 'focusout' && qa();
}
function Ef(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return Ro(on);
}
function Cf(e, r) {
  if (e === 'click') return Ro(r);
}
function kf(e, r) {
  if (e === 'input' || e === 'change') return Ro(r);
}
function Nf(e, r) {
  return (e === r && (e !== 0 || 1 / e === 1 / r)) || (e !== e && r !== r);
}
var He = typeof Object.is == 'function' ? Object.is : Nf;
function ln(e, r) {
  if (He(e, r)) return !0;
  if (typeof e != 'object' || e === null || typeof r != 'object' || r === null)
    return !1;
  var t = Object.keys(e),
    n = Object.keys(r);
  if (t.length !== n.length) return !1;
  for (n = 0; n < t.length; n++) {
    var o = t[n];
    if (!Ll.call(r, o) || !He(e[o], r[o])) return !1;
  }
  return !0;
}
function es(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function rs(e, r) {
  var t = es(e);
  e = 0;
  for (var n; t; ) {
    if (t.nodeType === 3) {
      if (((n = e + t.textContent.length), e <= r && n >= r))
        return { node: t, offset: r - e };
      e = n;
    }
    e: {
      for (; t; ) {
        if (t.nextSibling) {
          t = t.nextSibling;
          break e;
        }
        t = t.parentNode;
      }
      t = void 0;
    }
    t = es(t);
  }
}
function gc(e, r) {
  return e && r
    ? e === r
      ? !0
      : e && e.nodeType === 3
      ? !1
      : r && r.nodeType === 3
      ? gc(e, r.parentNode)
      : 'contains' in e
      ? e.contains(r)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(r) & 16)
      : !1
    : !1;
}
function hc() {
  for (var e = window, r = lo(); r instanceof e.HTMLIFrameElement; ) {
    try {
      var t = typeof r.contentWindow.location.href == 'string';
    } catch {
      t = !1;
    }
    if (t) e = r.contentWindow;
    else break;
    r = lo(e.document);
  }
  return r;
}
function Zi(e) {
  var r = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    r &&
    ((r === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      r === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function If(e) {
  var r = hc(),
    t = e.focusedElem,
    n = e.selectionRange;
  if (
    r !== t &&
    t &&
    t.ownerDocument &&
    gc(t.ownerDocument.documentElement, t)
  ) {
    if (n !== null && Zi(t)) {
      if (
        ((r = n.start),
        (e = n.end),
        e === void 0 && (e = r),
        'selectionStart' in t)
      )
        (t.selectionStart = r), (t.selectionEnd = Math.min(e, t.value.length));
      else if (
        ((e = ((r = t.ownerDocument || document) && r.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = t.textContent.length,
          l = Math.min(n.start, o);
        (n = n.end === void 0 ? l : Math.min(n.end, o)),
          !e.extend && l > n && ((o = n), (n = l), (l = o)),
          (o = rs(t, l));
        var i = rs(t, n);
        o &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((r = r.createRange()),
          r.setStart(o.node, o.offset),
          e.removeAllRanges(),
          l > n
            ? (e.addRange(r), e.extend(i.node, i.offset))
            : (r.setEnd(i.node, i.offset), e.addRange(r)));
      }
    }
    for (r = [], e = t; (e = e.parentNode); )
      e.nodeType === 1 &&
        r.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof t.focus == 'function' && t.focus(), t = 0; t < r.length; t++)
      (e = r[t]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Tf = er && 'documentMode' in document && 11 >= document.documentMode,
  Zr = null,
  ri = null,
  Ht = null,
  ti = !1;
function ts(e, r, t) {
  var n = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
  ti ||
    Zr == null ||
    Zr !== lo(n) ||
    ((n = Zr),
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
    (Ht && ln(Ht, n)) ||
      ((Ht = n),
      (n = mo(ri, 'onSelect')),
      0 < n.length &&
        ((r = new Gi('onSelect', 'select', null, r, t)),
        e.push({ event: r, listeners: n }),
        (r.target = Zr))));
}
function zn(e, r) {
  var t = {};
  return (
    (t[e.toLowerCase()] = r.toLowerCase()),
    (t['Webkit' + e] = 'webkit' + r),
    (t['Moz' + e] = 'moz' + r),
    t
  );
}
var Xr = {
    animationend: zn('Animation', 'AnimationEnd'),
    animationiteration: zn('Animation', 'AnimationIteration'),
    animationstart: zn('Animation', 'AnimationStart'),
    transitionend: zn('Transition', 'TransitionEnd'),
  },
  fl = {},
  pc = {};
er &&
  ((pc = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete Xr.animationend.animation,
    delete Xr.animationiteration.animation,
    delete Xr.animationstart.animation),
  'TransitionEvent' in window || delete Xr.transitionend.transition);
function jo(e) {
  if (fl[e]) return fl[e];
  if (!Xr[e]) return e;
  var r = Xr[e],
    t;
  for (t in r) if (r.hasOwnProperty(t) && t in pc) return (fl[e] = r[t]);
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
function Fr(e, r) {
  Ac.set(e, r), $r(r, [e]);
}
for (var ml = 0; ml < ns.length; ml++) {
  var gl = ns[ml],
    Bf = gl.toLowerCase(),
    Mf = gl[0].toUpperCase() + gl.slice(1);
  Fr(Bf, 'on' + Mf);
}
Fr(bc, 'onAnimationEnd');
Fr(yc, 'onAnimationIteration');
Fr(vc, 'onAnimationStart');
Fr('dblclick', 'onDoubleClick');
Fr('focusin', 'onFocus');
Fr('focusout', 'onBlur');
Fr(xc, 'onTransitionEnd');
mt('onMouseEnter', ['mouseout', 'mouseover']);
mt('onMouseLeave', ['mouseout', 'mouseover']);
mt('onPointerEnter', ['pointerout', 'pointerover']);
mt('onPointerLeave', ['pointerout', 'pointerover']);
$r(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(' ')
);
$r(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' '
  )
);
$r('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
$r(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
$r(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
$r(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
var Rt =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  zf = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Rt));
function os(e, r, t) {
  var n = e.type || 'unknown-event';
  (e.currentTarget = t), Td(n, r, void 0, e), (e.currentTarget = null);
}
function wc(e, r) {
  r = (r & 4) !== 0;
  for (var t = 0; t < e.length; t++) {
    var n = e[t],
      o = n.event;
    n = n.listeners;
    e: {
      var l = void 0;
      if (r)
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
function U(e, r) {
  var t = r[ai];
  t === void 0 && (t = r[ai] = new Set());
  var n = e + '__bubble';
  t.has(n) || (Sc(r, e, 2, !1), t.add(n));
}
function hl(e, r, t) {
  var n = 0;
  r && (n |= 4), Sc(t, e, n, r);
}
var Pn = '_reactListening' + Math.random().toString(36).slice(2);
function an(e) {
  if (!e[Pn]) {
    (e[Pn] = !0),
      Iu.forEach(function (t) {
        t !== 'selectionchange' && (zf.has(t) || hl(t, !1, e), hl(t, !0, e));
      });
    var r = e.nodeType === 9 ? e : e.ownerDocument;
    r === null || r[Pn] || ((r[Pn] = !0), hl('selectionchange', !1, r));
  }
}
function Sc(e, r, t, n) {
  switch (ic(r)) {
    case 1:
      var o = Vd;
      break;
    case 4:
      o = Gd;
      break;
    default:
      o = Ki;
  }
  (t = o.bind(null, r, t, e)),
    (o = void 0),
    !Jl ||
      (r !== 'touchstart' && r !== 'touchmove' && r !== 'wheel') ||
      (o = !0),
    n
      ? o !== void 0
        ? e.addEventListener(r, t, { capture: !0, passive: o })
        : e.addEventListener(r, t, !0)
      : o !== void 0
      ? e.addEventListener(r, t, { passive: o })
      : e.addEventListener(r, t, !1);
}
function pl(e, r, t, n, o) {
  var l = n;
  if (!(r & 1) && !(r & 2) && n !== null)
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
          if (((i = Mr(a)), i === null)) return;
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
      m = Hi(t),
      p = [];
    e: {
      var h = Ac.get(e);
      if (h !== void 0) {
        var y = Gi,
          x = e;
        switch (e) {
          case 'keypress':
            if (Jn(t) === 0) break e;
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
            if (t.button === 2) break e;
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
            y = tf;
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
        var w = (r & 4) !== 0,
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
          ((h = new y(h, x, null, t, m)), p.push({ event: h, listeners: w }));
      }
    }
    if (!(r & 7)) {
      e: {
        if (
          ((h = e === 'mouseover' || e === 'pointerover'),
          (y = e === 'mouseout' || e === 'pointerout'),
          h &&
            t !== Gl &&
            (x = t.relatedTarget || t.fromElement) &&
            (Mr(x) || x[rr]))
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
            ? ((x = t.relatedTarget || t.toElement),
              (y = u),
              (x = x ? Mr(x) : null),
              x !== null &&
                ((P = Wr(x)), x !== P || (x.tag !== 5 && x.tag !== 6)) &&
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
            (P = y == null ? h : qr(y)),
            (g = x == null ? h : qr(x)),
            (h = new w(v, d + 'leave', y, t, m)),
            (h.target = P),
            (h.relatedTarget = g),
            (v = null),
            Mr(m) === u &&
              ((w = new w(f, d + 'enter', x, t, m)),
              (w.target = g),
              (w.relatedTarget = P),
              (v = w)),
            (P = v),
            y && x)
          )
            r: {
              for (w = y, f = x, d = 0, g = w; g; g = Vr(g)) d++;
              for (g = 0, v = f; v; v = Vr(v)) g++;
              for (; 0 < d - g; ) (w = Vr(w)), d--;
              for (; 0 < g - d; ) (f = Vr(f)), g--;
              for (; d--; ) {
                if (w === f || (f !== null && w === f.alternate)) break r;
                (w = Vr(w)), (f = Vr(f));
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
          ((h = u ? qr(u) : window),
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
          dc(p, S, t, m);
          break e;
        }
        C && C(e, h, u),
          e === 'focusout' &&
            (C = h._wrapperState) &&
            C.controlled &&
            h.type === 'number' &&
            Ql(h, 'number', h.value);
      }
      switch (((C = u ? qr(u) : window), e)) {
        case 'focusin':
          (Za(C) || C.contentEditable === 'true') &&
            ((Zr = C), (ri = u), (Ht = null));
          break;
        case 'focusout':
          Ht = ri = Zr = null;
          break;
        case 'mousedown':
          ti = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          (ti = !1), ts(p, t, m);
          break;
        case 'selectionchange':
          if (Tf) break;
        case 'keydown':
        case 'keyup':
          ts(p, t, m);
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
        Jr
          ? uc(e, t) && (N = 'onCompositionEnd')
          : e === 'keydown' && t.keyCode === 229 && (N = 'onCompositionStart');
      N &&
        (sc &&
          t.locale !== 'ko' &&
          (Jr || N !== 'onCompositionStart'
            ? N === 'onCompositionEnd' && Jr && (k = ac())
            : ((fr = m),
              (Vi = 'value' in fr ? fr.value : fr.textContent),
              (Jr = !0))),
        (C = mo(u, N)),
        0 < C.length &&
          ((N = new Va(N, e, null, t, m)),
          p.push({ event: N, listeners: C }),
          k ? (N.data = k) : ((k = cc(t)), k !== null && (N.data = k)))),
        (k = vf ? xf(e, t) : Af(e, t)) &&
          ((u = mo(u, 'onBeforeInput')),
          0 < u.length &&
            ((m = new Va('onBeforeInput', 'beforeinput', null, t, m)),
            p.push({ event: m, listeners: u }),
            (m.data = k)));
    }
    wc(p, r);
  });
}
function sn(e, r, t) {
  return { instance: e, listener: r, currentTarget: t };
}
function mo(e, r) {
  for (var t = r + 'Capture', n = []; e !== null; ) {
    var o = e,
      l = o.stateNode;
    o.tag === 5 &&
      l !== null &&
      ((o = l),
      (l = en(e, t)),
      l != null && n.unshift(sn(e, l, o)),
      (l = en(e, r)),
      l != null && n.push(sn(e, l, o))),
      (e = e.return);
  }
  return n;
}
function Vr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ls(e, r, t, n, o) {
  for (var l = r._reactName, i = []; t !== null && t !== n; ) {
    var a = t,
      s = a.alternate,
      u = a.stateNode;
    if (s !== null && s === n) break;
    a.tag === 5 &&
      u !== null &&
      ((a = u),
      o
        ? ((s = en(t, l)), s != null && i.unshift(sn(t, s, a)))
        : o || ((s = en(t, l)), s != null && i.push(sn(t, s, a)))),
      (t = t.return);
  }
  i.length !== 0 && e.push({ event: r, listeners: i });
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
function Ln(e, r, t) {
  if (((r = is(r)), is(e) !== r && t)) throw Error(A(425));
}
function go() {}
var ni = null,
  oi = null;
function li(e, r) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof r.children == 'string' ||
    typeof r.children == 'number' ||
    (typeof r.dangerouslySetInnerHTML == 'object' &&
      r.dangerouslySetInnerHTML !== null &&
      r.dangerouslySetInnerHTML.__html != null)
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
function bl(e, r) {
  var t = r,
    n = 0;
  do {
    var o = t.nextSibling;
    if ((e.removeChild(t), o && o.nodeType === 8))
      if (((t = o.data), t === '/$')) {
        if (n === 0) {
          e.removeChild(o), nn(r);
          return;
        }
        n--;
      } else (t !== '$' && t !== '$?' && t !== '$!') || n++;
    t = o;
  } while (t);
  nn(r);
}
function br(e) {
  for (; e != null; e = e.nextSibling) {
    var r = e.nodeType;
    if (r === 1 || r === 3) break;
    if (r === 8) {
      if (((r = e.data), r === '$' || r === '$!' || r === '$?')) break;
      if (r === '/$') return null;
    }
  }
  return e;
}
function ss(e) {
  e = e.previousSibling;
  for (var r = 0; e; ) {
    if (e.nodeType === 8) {
      var t = e.data;
      if (t === '$' || t === '$!' || t === '$?') {
        if (r === 0) return e;
        r--;
      } else t === '/$' && r++;
    }
    e = e.previousSibling;
  }
  return null;
}
var St = Math.random().toString(36).slice(2),
  We = '__reactFiber$' + St,
  un = '__reactProps$' + St,
  rr = '__reactContainer$' + St,
  ai = '__reactEvents$' + St,
  Of = '__reactListeners$' + St,
  Uf = '__reactHandles$' + St;
function Mr(e) {
  var r = e[We];
  if (r) return r;
  for (var t = e.parentNode; t; ) {
    if ((r = t[rr] || t[We])) {
      if (
        ((t = r.alternate),
        r.child !== null || (t !== null && t.child !== null))
      )
        for (e = ss(e); e !== null; ) {
          if ((t = e[We])) return t;
          e = ss(e);
        }
      return r;
    }
    (e = t), (t = e.parentNode);
  }
  return null;
}
function wn(e) {
  return (
    (e = e[We] || e[rr]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function qr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(A(33));
}
function _o(e) {
  return e[un] || null;
}
var si = [],
  et = -1;
function Er(e) {
  return { current: e };
}
function H(e) {
  0 > et || ((e.current = si[et]), (si[et] = null), et--);
}
function _(e, r) {
  et++, (si[et] = e.current), (e.current = r);
}
var Dr = {},
  de = Er(Dr),
  ye = Er(!1),
  jr = Dr;
function gt(e, r) {
  var t = e.type.contextTypes;
  if (!t) return Dr;
  var n = e.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === r)
    return n.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    l;
  for (l in t) o[l] = r[l];
  return (
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = r),
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
function us(e, r, t) {
  if (de.current !== Dr) throw Error(A(168));
  _(de, r), _(ye, t);
}
function Dc(e, r, t) {
  var n = e.stateNode;
  if (((r = r.childContextTypes), typeof n.getChildContext != 'function'))
    return t;
  n = n.getChildContext();
  for (var o in n) if (!(o in r)) throw Error(A(108, Dd(e) || 'Unknown', o));
  return V({}, t, n);
}
function po(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Dr),
    (jr = de.current),
    _(de, e),
    _(ye, ye.current),
    !0
  );
}
function cs(e, r, t) {
  var n = e.stateNode;
  if (!n) throw Error(A(169));
  t
    ? ((e = Dc(e, r, jr)),
      (n.__reactInternalMemoizedMergedChildContext = e),
      H(ye),
      H(de),
      _(de, e))
    : H(ye),
    _(ye, t);
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
function Cr() {
  if (!yl && Je !== null) {
    yl = !0;
    var e = 0,
      r = R;
    try {
      var t = Je;
      for (R = 1; e < t.length; e++) {
        var n = t[e];
        do n = n(!0);
        while (n !== null);
      }
      (Je = null), (Oo = !1);
    } catch (o) {
      throw (Je !== null && (Je = Je.slice(e + 1)), Ju(Qi, Cr), o);
    } finally {
      (R = r), (yl = !1);
    }
  }
  return null;
}
var rt = [],
  tt = 0,
  bo = null,
  yo = 0,
  Ne = [],
  Ie = 0,
  _r = null,
  Ze = 1,
  Xe = '';
function Tr(e, r) {
  (rt[tt++] = yo), (rt[tt++] = bo), (bo = e), (yo = r);
}
function Ec(e, r, t) {
  (Ne[Ie++] = Ze), (Ne[Ie++] = Xe), (Ne[Ie++] = _r), (_r = e);
  var n = Ze;
  e = Xe;
  var o = 32 - Oe(n) - 1;
  (n &= ~(1 << o)), (t += 1);
  var l = 32 - Oe(r) + o;
  if (30 < l) {
    var i = o - (o % 5);
    (l = (n & ((1 << i) - 1)).toString(32)),
      (n >>= i),
      (o -= i),
      (Ze = (1 << (32 - Oe(r) + o)) | (t << o) | n),
      (Xe = l + e);
  } else (Ze = (1 << l) | (t << o) | n), (Xe = e);
}
function Xi(e) {
  e.return !== null && (Tr(e, 1), Ec(e, 1, 0));
}
function qi(e) {
  for (; e === bo; )
    (bo = rt[--tt]), (rt[tt] = null), (yo = rt[--tt]), (rt[tt] = null);
  for (; e === _r; )
    (_r = Ne[--Ie]),
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
function Cc(e, r) {
  var t = Te(5, null, null, 0);
  (t.elementType = 'DELETED'),
    (t.stateNode = r),
    (t.return = e),
    (r = e.deletions),
    r === null ? ((e.deletions = [t]), (e.flags |= 16)) : r.push(t);
}
function ds(e, r) {
  switch (e.tag) {
    case 5:
      var t = e.type;
      return (
        (r =
          r.nodeType !== 1 || t.toLowerCase() !== r.nodeName.toLowerCase()
            ? null
            : r),
        r !== null
          ? ((e.stateNode = r), (Fe = e), (De = br(r.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (r = e.pendingProps === '' || r.nodeType !== 3 ? null : r),
        r !== null ? ((e.stateNode = r), (Fe = e), (De = null), !0) : !1
      );
    case 13:
      return (
        (r = r.nodeType !== 8 ? null : r),
        r !== null
          ? ((t = _r !== null ? { id: Ze, overflow: Xe } : null),
            (e.memoizedState = {
              dehydrated: r,
              treeContext: t,
              retryLane: 1073741824,
            }),
            (t = Te(18, null, null, 0)),
            (t.stateNode = r),
            (t.return = e),
            (e.child = t),
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
    var r = De;
    if (r) {
      var t = r;
      if (!ds(e, r)) {
        if (ui(e)) throw Error(A(418));
        r = br(t.nextSibling);
        var n = Fe;
        r && ds(e, r)
          ? Cc(n, t)
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
  var r;
  if (
    ((r = e.tag !== 3) &&
      !(r = e.tag !== 5) &&
      ((r = e.type),
      (r = r !== 'head' && r !== 'body' && !li(e.type, e.memoizedProps))),
    r && (r = De))
  ) {
    if (ui(e)) throw (kc(), Error(A(418)));
    for (; r; ) Cc(e, r), (r = br(r.nextSibling));
  }
  if ((fs(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(A(317));
    e: {
      for (e = e.nextSibling, r = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (t === '/$') {
            if (r === 0) {
              De = br(e.nextSibling);
              break e;
            }
            r--;
          } else (t !== '$' && t !== '$!' && t !== '$?') || r++;
        }
        e = e.nextSibling;
      }
      De = null;
    }
  } else De = Fe ? br(e.stateNode.nextSibling) : null;
  return !0;
}
function kc() {
  for (var e = De; e; ) e = br(e.nextSibling);
}
function ht() {
  (De = Fe = null), (Q = !1);
}
function ea(e) {
  je === null ? (je = [e]) : je.push(e);
}
var Qf = lr.ReactCurrentBatchConfig;
function It(e, r, t) {
  if (
    ((e = t.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (t._owner) {
      if (((t = t._owner), t)) {
        if (t.tag !== 1) throw Error(A(309));
        var n = t.stateNode;
      }
      if (!n) throw Error(A(147, e));
      var o = n,
        l = '' + e;
      return r !== null &&
        r.ref !== null &&
        typeof r.ref == 'function' &&
        r.ref._stringRef === l
        ? r.ref
        : ((r = function (i) {
            var a = o.refs;
            i === null ? delete a[l] : (a[l] = i);
          }),
          (r._stringRef = l),
          r);
    }
    if (typeof e != 'string') throw Error(A(284));
    if (!t._owner) throw Error(A(290, e));
  }
  return e;
}
function jn(e, r) {
  throw (
    ((e = Object.prototype.toString.call(r)),
    Error(
      A(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(r).join(', ') + '}'
          : e
      )
    ))
  );
}
function ms(e) {
  var r = e._init;
  return r(e._payload);
}
function Nc(e) {
  function r(f, d) {
    if (e) {
      var g = f.deletions;
      g === null ? ((f.deletions = [d]), (f.flags |= 16)) : g.push(d);
    }
  }
  function t(f, d) {
    if (!e) return null;
    for (; d !== null; ) r(f, d), (d = d.sibling);
    return null;
  }
  function n(f, d) {
    for (f = new Map(); d !== null; )
      d.key !== null ? f.set(d.key, d) : f.set(d.index, d), (d = d.sibling);
    return f;
  }
  function o(f, d) {
    return (f = Ar(f, d)), (f.index = 0), (f.sibling = null), f;
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
    return S === Yr
      ? m(f, d, g.props.children, v, g.key)
      : d !== null &&
        (d.elementType === S ||
          (typeof S == 'object' &&
            S !== null &&
            S.$$typeof === sr &&
            ms(S) === d.type))
      ? ((v = o(d, g.props)), (v.ref = It(f, d, g)), (v.return = f), v)
      : ((v = no(g.type, g.key, g.props, null, f.mode, v)),
        (v.ref = It(f, d, g)),
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
      ? ((d = Rr(g, f.mode, v, S)), (d.return = f), d)
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
            (g.ref = It(f, null, d)),
            (g.return = f),
            g
          );
        case Gr:
          return (d = El(d, f.mode, g)), (d.return = f), d;
        case sr:
          var v = d._init;
          return p(f, v(d._payload), g);
      }
      if (Pt(d) || Ft(d))
        return (d = Rr(d, f.mode, g, null)), (d.return = f), d;
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
        case Gr:
          return g.key === S ? u(f, d, g, v) : null;
        case sr:
          return (S = g._init), h(f, d, S(g._payload), v);
      }
      if (Pt(g) || Ft(g)) return S !== null ? null : m(f, d, g, v, null);
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
        case Gr:
          return (f = f.get(v.key === null ? g : v.key) || null), u(d, f, v, S);
        case sr:
          var C = v._init;
          return y(f, d, g, C(v._payload), S);
      }
      if (Pt(v) || Ft(v)) return (f = f.get(g) || null), m(d, f, v, S, null);
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
      e && k && D.alternate === null && r(f, k),
        (d = l(D, d, N)),
        C === null ? (S = D) : (C.sibling = D),
        (C = D),
        (k = O);
    }
    if (N === g.length) return t(f, k), Q && Tr(f, N), S;
    if (k === null) {
      for (; N < g.length; N++)
        (k = p(f, g[N], v)),
          k !== null &&
            ((d = l(k, d, N)), C === null ? (S = k) : (C.sibling = k), (C = k));
      return Q && Tr(f, N), S;
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
          return r(f, T);
        }),
      Q && Tr(f, N),
      S
    );
  }
  function w(f, d, g, v) {
    var S = Ft(g);
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
      e && k && T.alternate === null && r(f, k),
        (d = l(T, d, N)),
        C === null ? (S = T) : (C.sibling = T),
        (C = T),
        (k = O);
    }
    if (D.done) return t(f, k), Q && Tr(f, N), S;
    if (k === null) {
      for (; !D.done; N++, D = g.next())
        (D = p(f, D.value, v)),
          D !== null &&
            ((d = l(D, d, N)), C === null ? (S = D) : (C.sibling = D), (C = D));
      return Q && Tr(f, N), S;
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
          return r(f, $);
        }),
      Q && Tr(f, N),
      S
    );
  }
  function P(f, d, g, v) {
    if (
      (typeof g == 'object' &&
        g !== null &&
        g.type === Yr &&
        g.key === null &&
        (g = g.props.children),
      typeof g == 'object' && g !== null)
    ) {
      switch (g.$$typeof) {
        case Cn:
          e: {
            for (var S = g.key, C = d; C !== null; ) {
              if (C.key === S) {
                if (((S = g.type), S === Yr)) {
                  if (C.tag === 7) {
                    t(f, C.sibling),
                      (d = o(C, g.props.children)),
                      (d.return = f),
                      (f = d);
                    break e;
                  }
                } else if (
                  C.elementType === S ||
                  (typeof S == 'object' &&
                    S !== null &&
                    S.$$typeof === sr &&
                    ms(S) === C.type)
                ) {
                  t(f, C.sibling),
                    (d = o(C, g.props)),
                    (d.ref = It(f, C, g)),
                    (d.return = f),
                    (f = d);
                  break e;
                }
                t(f, C);
                break;
              } else r(f, C);
              C = C.sibling;
            }
            g.type === Yr
              ? ((d = Rr(g.props.children, f.mode, v, g.key)),
                (d.return = f),
                (f = d))
              : ((v = no(g.type, g.key, g.props, null, f.mode, v)),
                (v.ref = It(f, d, g)),
                (v.return = f),
                (f = v));
          }
          return i(f);
        case Gr:
          e: {
            for (C = g.key; d !== null; ) {
              if (d.key === C)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === g.containerInfo &&
                  d.stateNode.implementation === g.implementation
                ) {
                  t(f, d.sibling),
                    (d = o(d, g.children || [])),
                    (d.return = f),
                    (f = d);
                  break e;
                } else {
                  t(f, d);
                  break;
                }
              else r(f, d);
              d = d.sibling;
            }
            (d = El(g, f.mode, v)), (d.return = f), (f = d);
          }
          return i(f);
        case sr:
          return (C = g._init), P(f, d, C(g._payload), v);
      }
      if (Pt(g)) return x(f, d, g, v);
      if (Ft(g)) return w(f, d, g, v);
      jn(f, g);
    }
    return (typeof g == 'string' && g !== '') || typeof g == 'number'
      ? ((g = '' + g),
        d !== null && d.tag === 6
          ? (t(f, d.sibling), (d = o(d, g)), (d.return = f), (f = d))
          : (t(f, d), (d = Fl(g, f.mode, v)), (d.return = f), (f = d)),
        i(f))
      : t(f, d);
  }
  return P;
}
var pt = Nc(!0),
  Ic = Nc(!1),
  vo = Er(null),
  xo = null,
  nt = null,
  ra = null;
function ta() {
  ra = nt = xo = null;
}
function na(e) {
  var r = vo.current;
  H(vo), (e._currentValue = r);
}
function di(e, r, t) {
  for (; e !== null; ) {
    var n = e.alternate;
    if (
      ((e.childLanes & r) !== r
        ? ((e.childLanes |= r), n !== null && (n.childLanes |= r))
        : n !== null && (n.childLanes & r) !== r && (n.childLanes |= r),
      e === t)
    )
      break;
    e = e.return;
  }
}
function dt(e, r) {
  (xo = e),
    (ra = nt = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & r && (be = !0), (e.firstContext = null));
}
function Me(e) {
  var r = e._currentValue;
  if (ra !== e)
    if (((e = { context: e, memoizedValue: r, next: null }), nt === null)) {
      if (xo === null) throw Error(A(308));
      (nt = e), (xo.dependencies = { lanes: 0, firstContext: e });
    } else nt = nt.next = e;
  return r;
}
var zr = null;
function oa(e) {
  zr === null ? (zr = [e]) : zr.push(e);
}
function Tc(e, r, t, n) {
  var o = r.interleaved;
  return (
    o === null ? ((t.next = t), oa(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    tr(e, n)
  );
}
function tr(e, r) {
  e.lanes |= r;
  var t = e.alternate;
  for (t !== null && (t.lanes |= r), t = e, e = e.return; e !== null; )
    (e.childLanes |= r),
      (t = e.alternate),
      t !== null && (t.childLanes |= r),
      (t = e),
      (e = e.return);
  return t.tag === 3 ? t.stateNode : null;
}
var ur = !1;
function la(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Bc(e, r) {
  (e = e.updateQueue),
    r.updateQueue === e &&
      (r.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function qe(e, r) {
  return {
    eventTime: e,
    lane: r,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function yr(e, r, t) {
  var n = e.updateQueue;
  if (n === null) return null;
  if (((n = n.shared), L & 2)) {
    var o = n.pending;
    return (
      o === null ? (r.next = r) : ((r.next = o.next), (o.next = r)),
      (n.pending = r),
      tr(e, t)
    );
  }
  return (
    (o = n.interleaved),
    o === null ? ((r.next = r), oa(n)) : ((r.next = o.next), (o.next = r)),
    (n.interleaved = r),
    tr(e, t)
  );
}
function Zn(e, r, t) {
  if (
    ((r = r.updateQueue), r !== null && ((r = r.shared), (t & 4194240) !== 0))
  ) {
    var n = r.lanes;
    (n &= e.pendingLanes), (t |= n), (r.lanes = t), $i(e, t);
  }
}
function gs(e, r) {
  var t = e.updateQueue,
    n = e.alternate;
  if (n !== null && ((n = n.updateQueue), t === n)) {
    var o = null,
      l = null;
    if (((t = t.firstBaseUpdate), t !== null)) {
      do {
        var i = {
          eventTime: t.eventTime,
          lane: t.lane,
          tag: t.tag,
          payload: t.payload,
          callback: t.callback,
          next: null,
        };
        l === null ? (o = l = i) : (l = l.next = i), (t = t.next);
      } while (t !== null);
      l === null ? (o = l = r) : (l = l.next = r);
    } else o = l = r;
    (t = {
      baseState: n.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: l,
      shared: n.shared,
      effects: n.effects,
    }),
      (e.updateQueue = t);
    return;
  }
  (e = t.lastBaseUpdate),
    e === null ? (t.firstBaseUpdate = r) : (e.next = r),
    (t.lastBaseUpdate = r);
}
function Ao(e, r, t, n) {
  var o = e.updateQueue;
  ur = !1;
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
          switch (((h = r), (y = t), w.tag)) {
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
              ur = !0;
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
      (r = o.shared.interleaved),
      r !== null)
    ) {
      o = r;
      do (i |= o.lane), (o = o.next);
      while (o !== r);
    } else l === null && (o.shared.lanes = 0);
    (Ur |= i), (e.lanes = i), (e.memoizedState = p);
  }
}
function hs(e, r, t) {
  if (((e = r.effects), (r.effects = null), e !== null))
    for (r = 0; r < e.length; r++) {
      var n = e[r],
        o = n.callback;
      if (o !== null) {
        if (((n.callback = null), (n = t), typeof o != 'function'))
          throw Error(A(191, o));
        o.call(n);
      }
    }
}
var Sn = {},
  Ve = Er(Sn),
  cn = Er(Sn),
  dn = Er(Sn);
function Pr(e) {
  if (e === Sn) throw Error(A(174));
  return e;
}
function ia(e, r) {
  switch ((_(dn, r), _(cn, e), _(Ve, Sn), (e = r.nodeType), e)) {
    case 9:
    case 11:
      r = (r = r.documentElement) ? r.namespaceURI : Wl(null, '');
      break;
    default:
      (e = e === 8 ? r.parentNode : r),
        (r = e.namespaceURI || null),
        (e = e.tagName),
        (r = Wl(r, e));
  }
  H(Ve), _(Ve, r);
}
function bt() {
  H(Ve), H(cn), H(dn);
}
function Mc(e) {
  Pr(dn.current);
  var r = Pr(Ve.current),
    t = Wl(r, e.type);
  r !== t && (_(cn, e), _(Ve, t));
}
function aa(e) {
  cn.current === e && (H(Ve), H(cn));
}
var W = Er(0);
function wo(e) {
  for (var r = e; r !== null; ) {
    if (r.tag === 13) {
      var t = r.memoizedState;
      if (
        t !== null &&
        ((t = t.dehydrated), t === null || t.data === '$?' || t.data === '$!')
      )
        return r;
    } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
      if (r.flags & 128) return r;
    } else if (r.child !== null) {
      (r.child.return = r), (r = r.child);
      continue;
    }
    if (r === e) break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === e) return null;
      r = r.return;
    }
    (r.sibling.return = r.return), (r = r.sibling);
  }
  return null;
}
var vl = [];
function sa() {
  for (var e = 0; e < vl.length; e++)
    vl[e]._workInProgressVersionPrimary = null;
  vl.length = 0;
}
var Xn = lr.ReactCurrentDispatcher,
  xl = lr.ReactCurrentBatchConfig,
  Or = 0,
  K = null,
  q = null,
  te = null,
  So = !1,
  Qt = !1,
  fn = 0,
  $f = 0;
function se() {
  throw Error(A(321));
}
function ua(e, r) {
  if (r === null) return !1;
  for (var t = 0; t < r.length && t < e.length; t++)
    if (!He(e[t], r[t])) return !1;
  return !0;
}
function ca(e, r, t, n, o, l) {
  if (
    ((Or = l),
    (K = r),
    (r.memoizedState = null),
    (r.updateQueue = null),
    (r.lanes = 0),
    (Xn.current = e === null || e.memoizedState === null ? Gf : Yf),
    (e = t(n, o)),
    Qt)
  ) {
    l = 0;
    do {
      if (((Qt = !1), (fn = 0), 25 <= l)) throw Error(A(301));
      (l += 1),
        (te = q = null),
        (r.updateQueue = null),
        (Xn.current = Jf),
        (e = t(n, o));
    } while (Qt);
  }
  if (
    ((Xn.current = Do),
    (r = q !== null && q.next !== null),
    (Or = 0),
    (te = q = K = null),
    (So = !1),
    r)
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
  return te === null ? (K.memoizedState = te = e) : (te = te.next = e), te;
}
function ze() {
  if (q === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = q.next;
  var r = te === null ? K.memoizedState : te.next;
  if (r !== null) (te = r), (q = e);
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
      te === null ? (K.memoizedState = te = e) : (te = te.next = e);
  }
  return te;
}
function mn(e, r) {
  return typeof r == 'function' ? r(e) : r;
}
function Al(e) {
  var r = ze(),
    t = r.queue;
  if (t === null) throw Error(A(311));
  t.lastRenderedReducer = e;
  var n = q,
    o = n.baseQueue,
    l = t.pending;
  if (l !== null) {
    if (o !== null) {
      var i = o.next;
      (o.next = l.next), (l.next = i);
    }
    (n.baseQueue = o = l), (t.pending = null);
  }
  if (o !== null) {
    (l = o.next), (n = n.baseState);
    var a = (i = null),
      s = null,
      u = l;
    do {
      var m = u.lane;
      if ((Or & m) === m)
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
          (Ur |= m);
      }
      u = u.next;
    } while (u !== null && u !== l);
    s === null ? (i = n) : (s.next = a),
      He(n, r.memoizedState) || (be = !0),
      (r.memoizedState = n),
      (r.baseState = i),
      (r.baseQueue = s),
      (t.lastRenderedState = n);
  }
  if (((e = t.interleaved), e !== null)) {
    o = e;
    do (l = o.lane), (K.lanes |= l), (Ur |= l), (o = o.next);
    while (o !== e);
  } else o === null && (t.lanes = 0);
  return [r.memoizedState, t.dispatch];
}
function wl(e) {
  var r = ze(),
    t = r.queue;
  if (t === null) throw Error(A(311));
  t.lastRenderedReducer = e;
  var n = t.dispatch,
    o = t.pending,
    l = r.memoizedState;
  if (o !== null) {
    t.pending = null;
    var i = (o = o.next);
    do (l = e(l, i.action)), (i = i.next);
    while (i !== o);
    He(l, r.memoizedState) || (be = !0),
      (r.memoizedState = l),
      r.baseQueue === null && (r.baseState = l),
      (t.lastRenderedState = l);
  }
  return [l, n];
}
function zc() {}
function Pc(e, r) {
  var t = K,
    n = ze(),
    o = r(),
    l = !He(n.memoizedState, o);
  if (
    (l && ((n.memoizedState = o), (be = !0)),
    (n = n.queue),
    fa(jc.bind(null, t, n, e), [e]),
    n.getSnapshot !== r || l || (te !== null && te.memoizedState.tag & 1))
  ) {
    if (
      ((t.flags |= 2048),
      gn(9, Rc.bind(null, t, n, o, r), void 0, null),
      oe === null)
    )
      throw Error(A(349));
    Or & 30 || Lc(t, r, o);
  }
  return o;
}
function Lc(e, r, t) {
  (e.flags |= 16384),
    (e = { getSnapshot: r, value: t }),
    (r = K.updateQueue),
    r === null
      ? ((r = { lastEffect: null, stores: null }),
        (K.updateQueue = r),
        (r.stores = [e]))
      : ((t = r.stores), t === null ? (r.stores = [e]) : t.push(e));
}
function Rc(e, r, t, n) {
  (r.value = t), (r.getSnapshot = n), _c(r) && Oc(e);
}
function jc(e, r, t) {
  return t(function () {
    _c(r) && Oc(e);
  });
}
function _c(e) {
  var r = e.getSnapshot;
  e = e.value;
  try {
    var t = r();
    return !He(e, t);
  } catch {
    return !0;
  }
}
function Oc(e) {
  var r = tr(e, 1);
  r !== null && Ue(r, e, 1, -1);
}
function ps(e) {
  var r = $e();
  return (
    typeof e == 'function' && (e = e()),
    (r.memoizedState = r.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: mn,
      lastRenderedState: e,
    }),
    (r.queue = e),
    (e = e.dispatch = Vf.bind(null, K, e)),
    [r.memoizedState, e]
  );
}
function gn(e, r, t, n) {
  return (
    (e = { tag: e, create: r, destroy: t, deps: n, next: null }),
    (r = K.updateQueue),
    r === null
      ? ((r = { lastEffect: null, stores: null }),
        (K.updateQueue = r),
        (r.lastEffect = e.next = e))
      : ((t = r.lastEffect),
        t === null
          ? (r.lastEffect = e.next = e)
          : ((n = t.next), (t.next = e), (e.next = n), (r.lastEffect = e))),
    e
  );
}
function Uc() {
  return ze().memoizedState;
}
function qn(e, r, t, n) {
  var o = $e();
  (K.flags |= e),
    (o.memoizedState = gn(1 | r, t, void 0, n === void 0 ? null : n));
}
function Uo(e, r, t, n) {
  var o = ze();
  n = n === void 0 ? null : n;
  var l = void 0;
  if (q !== null) {
    var i = q.memoizedState;
    if (((l = i.destroy), n !== null && ua(n, i.deps))) {
      o.memoizedState = gn(r, t, l, n);
      return;
    }
  }
  (K.flags |= e), (o.memoizedState = gn(1 | r, t, l, n));
}
function bs(e, r) {
  return qn(8390656, 8, e, r);
}
function fa(e, r) {
  return Uo(2048, 8, e, r);
}
function Hc(e, r) {
  return Uo(4, 2, e, r);
}
function Qc(e, r) {
  return Uo(4, 4, e, r);
}
function $c(e, r) {
  if (typeof r == 'function')
    return (
      (e = e()),
      r(e),
      function () {
        r(null);
      }
    );
  if (r != null)
    return (
      (e = e()),
      (r.current = e),
      function () {
        r.current = null;
      }
    );
}
function Wc(e, r, t) {
  return (
    (t = t != null ? t.concat([e]) : null), Uo(4, 4, $c.bind(null, r, e), t)
  );
}
function ma() {}
function Kc(e, r) {
  var t = ze();
  r = r === void 0 ? null : r;
  var n = t.memoizedState;
  return n !== null && r !== null && ua(r, n[1])
    ? n[0]
    : ((t.memoizedState = [e, r]), e);
}
function Vc(e, r) {
  var t = ze();
  r = r === void 0 ? null : r;
  var n = t.memoizedState;
  return n !== null && r !== null && ua(r, n[1])
    ? n[0]
    : ((e = e()), (t.memoizedState = [e, r]), e);
}
function Gc(e, r, t) {
  return Or & 21
    ? (He(t, r) || ((t = qu()), (K.lanes |= t), (Ur |= t), (e.baseState = !0)),
      r)
    : (e.baseState && ((e.baseState = !1), (be = !0)), (e.memoizedState = t));
}
function Wf(e, r) {
  var t = R;
  (R = t !== 0 && 4 > t ? t : 4), e(!0);
  var n = xl.transition;
  xl.transition = {};
  try {
    e(!1), r();
  } finally {
    (R = t), (xl.transition = n);
  }
}
function Yc() {
  return ze().memoizedState;
}
function Kf(e, r, t) {
  var n = xr(e);
  if (
    ((t = {
      lane: n,
      action: t,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Jc(e))
  )
    Zc(r, t);
  else if (((t = Tc(e, r, t, n)), t !== null)) {
    var o = me();
    Ue(t, e, n, o), Xc(t, r, n);
  }
}
function Vf(e, r, t) {
  var n = xr(e),
    o = { lane: n, action: t, hasEagerState: !1, eagerState: null, next: null };
  if (Jc(e)) Zc(r, o);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = r.lastRenderedReducer), l !== null)
    )
      try {
        var i = r.lastRenderedState,
          a = l(i, t);
        if (((o.hasEagerState = !0), (o.eagerState = a), He(a, i))) {
          var s = r.interleaved;
          s === null
            ? ((o.next = o), oa(r))
            : ((o.next = s.next), (s.next = o)),
            (r.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (t = Tc(e, r, o, n)),
      t !== null && ((o = me()), Ue(t, e, n, o), Xc(t, r, n));
  }
}
function Jc(e) {
  var r = e.alternate;
  return e === K || (r !== null && r === K);
}
function Zc(e, r) {
  Qt = So = !0;
  var t = e.pending;
  t === null ? (r.next = r) : ((r.next = t.next), (t.next = r)),
    (e.pending = r);
}
function Xc(e, r, t) {
  if (t & 4194240) {
    var n = r.lanes;
    (n &= e.pendingLanes), (t |= n), (r.lanes = t), $i(e, t);
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
    useCallback: function (e, r) {
      return ($e().memoizedState = [e, r === void 0 ? null : r]), e;
    },
    useContext: Me,
    useEffect: bs,
    useImperativeHandle: function (e, r, t) {
      return (
        (t = t != null ? t.concat([e]) : null),
        qn(4194308, 4, $c.bind(null, r, e), t)
      );
    },
    useLayoutEffect: function (e, r) {
      return qn(4194308, 4, e, r);
    },
    useInsertionEffect: function (e, r) {
      return qn(4, 2, e, r);
    },
    useMemo: function (e, r) {
      var t = $e();
      return (
        (r = r === void 0 ? null : r), (e = e()), (t.memoizedState = [e, r]), e
      );
    },
    useReducer: function (e, r, t) {
      var n = $e();
      return (
        (r = t !== void 0 ? t(r) : r),
        (n.memoizedState = n.baseState = r),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: r,
        }),
        (n.queue = e),
        (e = e.dispatch = Kf.bind(null, K, e)),
        [n.memoizedState, e]
      );
    },
    useRef: function (e) {
      var r = $e();
      return (e = { current: e }), (r.memoizedState = e);
    },
    useState: ps,
    useDebugValue: ma,
    useDeferredValue: function (e) {
      return ($e().memoizedState = e);
    },
    useTransition: function () {
      var e = ps(!1),
        r = e[0];
      return (e = Wf.bind(null, e[1])), ($e().memoizedState = e), [r, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, r, t) {
      var n = K,
        o = $e();
      if (Q) {
        if (t === void 0) throw Error(A(407));
        t = t();
      } else {
        if (((t = r()), oe === null)) throw Error(A(349));
        Or & 30 || Lc(n, r, t);
      }
      o.memoizedState = t;
      var l = { value: t, getSnapshot: r };
      return (
        (o.queue = l),
        bs(jc.bind(null, n, l, e), [e]),
        (n.flags |= 2048),
        gn(9, Rc.bind(null, n, l, t, r), void 0, null),
        t
      );
    },
    useId: function () {
      var e = $e(),
        r = oe.identifierPrefix;
      if (Q) {
        var t = Xe,
          n = Ze;
        (t = (n & ~(1 << (32 - Oe(n) - 1))).toString(32) + t),
          (r = ':' + r + 'R' + t),
          (t = fn++),
          0 < t && (r += 'H' + t.toString(32)),
          (r += ':');
      } else (t = $f++), (r = ':' + r + 'r' + t.toString(32) + ':');
      return (e.memoizedState = r);
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
      var r = ze();
      return Gc(r, q.memoizedState, e);
    },
    useTransition: function () {
      var e = Al(mn)[0],
        r = ze().memoizedState;
      return [e, r];
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
      var r = ze();
      return q === null ? (r.memoizedState = e) : Gc(r, q.memoizedState, e);
    },
    useTransition: function () {
      var e = wl(mn)[0],
        r = ze().memoizedState;
      return [e, r];
    },
    useMutableSource: zc,
    useSyncExternalStore: Pc,
    useId: Yc,
    unstable_isNewReconciler: !1,
  };
function Le(e, r) {
  if (e && e.defaultProps) {
    (r = V({}, r)), (e = e.defaultProps);
    for (var t in e) r[t] === void 0 && (r[t] = e[t]);
    return r;
  }
  return r;
}
function fi(e, r, t, n) {
  (r = e.memoizedState),
    (t = t(n, r)),
    (t = t == null ? r : V({}, r, t)),
    (e.memoizedState = t),
    e.lanes === 0 && (e.updateQueue.baseState = t);
}
var Ho = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Wr(e) === e : !1;
  },
  enqueueSetState: function (e, r, t) {
    e = e._reactInternals;
    var n = me(),
      o = xr(e),
      l = qe(n, o);
    (l.payload = r),
      t != null && (l.callback = t),
      (r = yr(e, l, o)),
      r !== null && (Ue(r, e, o, n), Zn(r, e, o));
  },
  enqueueReplaceState: function (e, r, t) {
    e = e._reactInternals;
    var n = me(),
      o = xr(e),
      l = qe(n, o);
    (l.tag = 1),
      (l.payload = r),
      t != null && (l.callback = t),
      (r = yr(e, l, o)),
      r !== null && (Ue(r, e, o, n), Zn(r, e, o));
  },
  enqueueForceUpdate: function (e, r) {
    e = e._reactInternals;
    var t = me(),
      n = xr(e),
      o = qe(t, n);
    (o.tag = 2),
      r != null && (o.callback = r),
      (r = yr(e, o, n)),
      r !== null && (Ue(r, e, n, t), Zn(r, e, n));
  },
};
function ys(e, r, t, n, o, l, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(n, l, i)
      : r.prototype && r.prototype.isPureReactComponent
      ? !ln(t, n) || !ln(o, l)
      : !0
  );
}
function qc(e, r, t) {
  var n = !1,
    o = Dr,
    l = r.contextType;
  return (
    typeof l == 'object' && l !== null
      ? (l = Me(l))
      : ((o = ve(r) ? jr : de.current),
        (n = r.contextTypes),
        (l = (n = n != null) ? gt(e, o) : Dr)),
    (r = new r(t, l)),
    (e.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null),
    (r.updater = Ho),
    (e.stateNode = r),
    (r._reactInternals = e),
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    r
  );
}
function vs(e, r, t, n) {
  (e = r.state),
    typeof r.componentWillReceiveProps == 'function' &&
      r.componentWillReceiveProps(t, n),
    typeof r.UNSAFE_componentWillReceiveProps == 'function' &&
      r.UNSAFE_componentWillReceiveProps(t, n),
    r.state !== e && Ho.enqueueReplaceState(r, r.state, null);
}
function mi(e, r, t, n) {
  var o = e.stateNode;
  (o.props = t), (o.state = e.memoizedState), (o.refs = {}), la(e);
  var l = r.contextType;
  typeof l == 'object' && l !== null
    ? (o.context = Me(l))
    : ((l = ve(r) ? jr : de.current), (o.context = gt(e, l))),
    (o.state = e.memoizedState),
    (l = r.getDerivedStateFromProps),
    typeof l == 'function' && (fi(e, r, l, t), (o.state = e.memoizedState)),
    typeof r.getDerivedStateFromProps == 'function' ||
      typeof o.getSnapshotBeforeUpdate == 'function' ||
      (typeof o.UNSAFE_componentWillMount != 'function' &&
        typeof o.componentWillMount != 'function') ||
      ((r = o.state),
      typeof o.componentWillMount == 'function' && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == 'function' &&
        o.UNSAFE_componentWillMount(),
      r !== o.state && Ho.enqueueReplaceState(o, o.state, null),
      Ao(e, t, o, n),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == 'function' && (e.flags |= 4194308);
}
function yt(e, r) {
  try {
    var t = '',
      n = r;
    do (t += Sd(n)), (n = n.return);
    while (n);
    var o = t;
  } catch (l) {
    o =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack;
  }
  return { value: e, source: r, stack: o, digest: null };
}
function Sl(e, r, t) {
  return { value: e, source: null, stack: t ?? null, digest: r ?? null };
}
function gi(e, r) {
  try {
    console.error(r.value);
  } catch (t) {
    setTimeout(function () {
      throw t;
    });
  }
}
var Zf = typeof WeakMap == 'function' ? WeakMap : Map;
function e0(e, r, t) {
  (t = qe(-1, t)), (t.tag = 3), (t.payload = { element: null });
  var n = r.value;
  return (
    (t.callback = function () {
      Eo || ((Eo = !0), (Di = n)), gi(e, r);
    }),
    t
  );
}
function r0(e, r, t) {
  (t = qe(-1, t)), (t.tag = 3);
  var n = e.type.getDerivedStateFromError;
  if (typeof n == 'function') {
    var o = r.value;
    (t.payload = function () {
      return n(o);
    }),
      (t.callback = function () {
        gi(e, r);
      });
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == 'function' &&
      (t.callback = function () {
        gi(e, r),
          typeof n != 'function' &&
            (vr === null ? (vr = new Set([this])) : vr.add(this));
        var i = r.stack;
        this.componentDidCatch(r.value, {
          componentStack: i !== null ? i : '',
        });
      }),
    t
  );
}
function xs(e, r, t) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new Zf();
    var o = new Set();
    n.set(r, o);
  } else (o = n.get(r)), o === void 0 && ((o = new Set()), n.set(r, o));
  o.has(t) || (o.add(t), (e = dm.bind(null, e, r, t)), r.then(e, e));
}
function As(e) {
  do {
    var r;
    if (
      ((r = e.tag === 13) &&
        ((r = e.memoizedState), (r = r !== null ? r.dehydrated !== null : !0)),
      r)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ws(e, r, t, n, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === r
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (t.flags |= 131072),
          (t.flags &= -52805),
          t.tag === 1 &&
            (t.alternate === null
              ? (t.tag = 17)
              : ((r = qe(-1, 1)), (r.tag = 2), yr(t, r, 1))),
          (t.lanes |= 1)),
      e);
}
var Xf = lr.ReactCurrentOwner,
  be = !1;
function fe(e, r, t, n) {
  r.child = e === null ? Ic(r, null, t, n) : pt(r, e.child, t, n);
}
function Ss(e, r, t, n, o) {
  t = t.render;
  var l = r.ref;
  return (
    dt(r, o),
    (n = ca(e, r, t, n, l, o)),
    (t = da()),
    e !== null && !be
      ? ((r.updateQueue = e.updateQueue),
        (r.flags &= -2053),
        (e.lanes &= ~o),
        nr(e, r, o))
      : (Q && t && Xi(r), (r.flags |= 1), fe(e, r, n, o), r.child)
  );
}
function Ds(e, r, t, n, o) {
  if (e === null) {
    var l = t.type;
    return typeof l == 'function' &&
      !Aa(l) &&
      l.defaultProps === void 0 &&
      t.compare === null &&
      t.defaultProps === void 0
      ? ((r.tag = 15), (r.type = l), t0(e, r, l, n, o))
      : ((e = no(t.type, null, n, r, r.mode, o)),
        (e.ref = r.ref),
        (e.return = r),
        (r.child = e));
  }
  if (((l = e.child), !(e.lanes & o))) {
    var i = l.memoizedProps;
    if (
      ((t = t.compare), (t = t !== null ? t : ln), t(i, n) && e.ref === r.ref)
    )
      return nr(e, r, o);
  }
  return (
    (r.flags |= 1),
    (e = Ar(l, n)),
    (e.ref = r.ref),
    (e.return = r),
    (r.child = e)
  );
}
function t0(e, r, t, n, o) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (ln(l, n) && e.ref === r.ref)
      if (((be = !1), (r.pendingProps = n = l), (e.lanes & o) !== 0))
        e.flags & 131072 && (be = !0);
      else return (r.lanes = e.lanes), nr(e, r, o);
  }
  return hi(e, r, t, n, o);
}
function n0(e, r, t) {
  var n = r.pendingProps,
    o = n.children,
    l = e !== null ? e.memoizedState : null;
  if (n.mode === 'hidden')
    if (!(r.mode & 1))
      (r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        _(lt, we),
        (we |= t);
    else {
      if (!(t & 1073741824))
        return (
          (e = l !== null ? l.baseLanes | t : t),
          (r.lanes = r.childLanes = 1073741824),
          (r.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (r.updateQueue = null),
          _(lt, we),
          (we |= e),
          null
        );
      (r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (n = l !== null ? l.baseLanes : t),
        _(lt, we),
        (we |= n);
    }
  else
    l !== null ? ((n = l.baseLanes | t), (r.memoizedState = null)) : (n = t),
      _(lt, we),
      (we |= n);
  return fe(e, r, o, t), r.child;
}
function o0(e, r) {
  var t = r.ref;
  ((e === null && t !== null) || (e !== null && e.ref !== t)) &&
    ((r.flags |= 512), (r.flags |= 2097152));
}
function hi(e, r, t, n, o) {
  var l = ve(t) ? jr : de.current;
  return (
    (l = gt(r, l)),
    dt(r, o),
    (t = ca(e, r, t, n, l, o)),
    (n = da()),
    e !== null && !be
      ? ((r.updateQueue = e.updateQueue),
        (r.flags &= -2053),
        (e.lanes &= ~o),
        nr(e, r, o))
      : (Q && n && Xi(r), (r.flags |= 1), fe(e, r, t, o), r.child)
  );
}
function Fs(e, r, t, n, o) {
  if (ve(t)) {
    var l = !0;
    po(r);
  } else l = !1;
  if ((dt(r, o), r.stateNode === null))
    eo(e, r), qc(r, t, n), mi(r, t, n, o), (n = !0);
  else if (e === null) {
    var i = r.stateNode,
      a = r.memoizedProps;
    i.props = a;
    var s = i.context,
      u = t.contextType;
    typeof u == 'object' && u !== null
      ? (u = Me(u))
      : ((u = ve(t) ? jr : de.current), (u = gt(r, u)));
    var m = t.getDerivedStateFromProps,
      p =
        typeof m == 'function' ||
        typeof i.getSnapshotBeforeUpdate == 'function';
    p ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((a !== n || s !== u) && vs(r, i, n, u)),
      (ur = !1);
    var h = r.memoizedState;
    (i.state = h),
      Ao(r, n, i, o),
      (s = r.memoizedState),
      a !== n || h !== s || ye.current || ur
        ? (typeof m == 'function' && (fi(r, t, m, n), (s = r.memoizedState)),
          (a = ur || ys(r, t, a, n, h, s, u))
            ? (p ||
                (typeof i.UNSAFE_componentWillMount != 'function' &&
                  typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (r.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (r.flags |= 4194308),
              (r.memoizedProps = n),
              (r.memoizedState = s)),
          (i.props = n),
          (i.state = s),
          (i.context = u),
          (n = a))
        : (typeof i.componentDidMount == 'function' && (r.flags |= 4194308),
          (n = !1));
  } else {
    (i = r.stateNode),
      Bc(e, r),
      (a = r.memoizedProps),
      (u = r.type === r.elementType ? a : Le(r.type, a)),
      (i.props = u),
      (p = r.pendingProps),
      (h = i.context),
      (s = t.contextType),
      typeof s == 'object' && s !== null
        ? (s = Me(s))
        : ((s = ve(t) ? jr : de.current), (s = gt(r, s)));
    var y = t.getDerivedStateFromProps;
    (m =
      typeof y == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((a !== p || h !== s) && vs(r, i, n, s)),
      (ur = !1),
      (h = r.memoizedState),
      (i.state = h),
      Ao(r, n, i, o);
    var x = r.memoizedState;
    a !== p || h !== x || ye.current || ur
      ? (typeof y == 'function' && (fi(r, t, y, n), (x = r.memoizedState)),
        (u = ur || ys(r, t, u, n, h, x, s) || !1)
          ? (m ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' &&
                i.componentWillUpdate(n, x, s),
              typeof i.UNSAFE_componentWillUpdate == 'function' &&
                i.UNSAFE_componentWillUpdate(n, x, s)),
            typeof i.componentDidUpdate == 'function' && (r.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (r.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (r.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (r.flags |= 1024),
            (r.memoizedProps = n),
            (r.memoizedState = x)),
        (i.props = n),
        (i.state = x),
        (i.context = s),
        (n = u))
      : (typeof i.componentDidUpdate != 'function' ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (r.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (r.flags |= 1024),
        (n = !1));
  }
  return pi(e, r, t, n, l, o);
}
function pi(e, r, t, n, o, l) {
  o0(e, r);
  var i = (r.flags & 128) !== 0;
  if (!n && !i) return o && cs(r, t, !1), nr(e, r, l);
  (n = r.stateNode), (Xf.current = r);
  var a =
    i && typeof t.getDerivedStateFromError != 'function' ? null : n.render();
  return (
    (r.flags |= 1),
    e !== null && i
      ? ((r.child = pt(r, e.child, null, l)), (r.child = pt(r, null, a, l)))
      : fe(e, r, a, l),
    (r.memoizedState = n.state),
    o && cs(r, t, !0),
    r.child
  );
}
function l0(e) {
  var r = e.stateNode;
  r.pendingContext
    ? us(e, r.pendingContext, r.pendingContext !== r.context)
    : r.context && us(e, r.context, !1),
    ia(e, r.containerInfo);
}
function Es(e, r, t, n, o) {
  return ht(), ea(o), (r.flags |= 256), fe(e, r, t, n), r.child;
}
var bi = { dehydrated: null, treeContext: null, retryLane: 0 };
function yi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function i0(e, r, t) {
  var n = r.pendingProps,
    o = W.current,
    l = !1,
    i = (r.flags & 128) !== 0,
    a;
  if (
    ((a = i) ||
      (a = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    a
      ? ((l = !0), (r.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    _(W, o & 1),
    e === null)
  )
    return (
      ci(r),
      (e = r.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (r.mode & 1
            ? e.data === '$!'
              ? (r.lanes = 8)
              : (r.lanes = 1073741824)
            : (r.lanes = 1),
          null)
        : ((i = n.children),
          (e = n.fallback),
          l
            ? ((n = r.mode),
              (l = r.child),
              (i = { mode: 'hidden', children: i }),
              !(n & 1) && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = i))
                : (l = Wo(i, n, 0, null)),
              (e = Rr(e, n, t, null)),
              (l.return = r),
              (e.return = r),
              (l.sibling = e),
              (r.child = l),
              (r.child.memoizedState = yi(t)),
              (r.memoizedState = bi),
              e)
            : ga(r, i))
    );
  if (((o = e.memoizedState), o !== null && ((a = o.dehydrated), a !== null)))
    return qf(e, r, i, n, a, o, t);
  if (l) {
    (l = n.fallback), (i = r.mode), (o = e.child), (a = o.sibling);
    var s = { mode: 'hidden', children: n.children };
    return (
      !(i & 1) && r.child !== o
        ? ((n = r.child),
          (n.childLanes = 0),
          (n.pendingProps = s),
          (r.deletions = null))
        : ((n = Ar(o, s)), (n.subtreeFlags = o.subtreeFlags & 14680064)),
      a !== null ? (l = Ar(a, l)) : ((l = Rr(l, i, t, null)), (l.flags |= 2)),
      (l.return = r),
      (n.return = r),
      (n.sibling = l),
      (r.child = n),
      (n = l),
      (l = r.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? yi(t)
          : {
              baseLanes: i.baseLanes | t,
              cachePool: null,
              transitions: i.transitions,
            }),
      (l.memoizedState = i),
      (l.childLanes = e.childLanes & ~t),
      (r.memoizedState = bi),
      n
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (n = Ar(l, { mode: 'visible', children: n.children })),
    !(r.mode & 1) && (n.lanes = t),
    (n.return = r),
    (n.sibling = null),
    e !== null &&
      ((t = r.deletions),
      t === null ? ((r.deletions = [e]), (r.flags |= 16)) : t.push(e)),
    (r.child = n),
    (r.memoizedState = null),
    n
  );
}
function ga(e, r) {
  return (
    (r = Wo({ mode: 'visible', children: r }, e.mode, 0, null)),
    (r.return = e),
    (e.child = r)
  );
}
function _n(e, r, t, n) {
  return (
    n !== null && ea(n),
    pt(r, e.child, null, t),
    (e = ga(r, r.pendingProps.children)),
    (e.flags |= 2),
    (r.memoizedState = null),
    e
  );
}
function qf(e, r, t, n, o, l, i) {
  if (t)
    return r.flags & 256
      ? ((r.flags &= -257), (n = Sl(Error(A(422)))), _n(e, r, i, n))
      : r.memoizedState !== null
      ? ((r.child = e.child), (r.flags |= 128), null)
      : ((l = n.fallback),
        (o = r.mode),
        (n = Wo({ mode: 'visible', children: n.children }, o, 0, null)),
        (l = Rr(l, o, i, null)),
        (l.flags |= 2),
        (n.return = r),
        (l.return = r),
        (n.sibling = l),
        (r.child = n),
        r.mode & 1 && pt(r, e.child, null, i),
        (r.child.memoizedState = yi(i)),
        (r.memoizedState = bi),
        l);
  if (!(r.mode & 1)) return _n(e, r, i, null);
  if (o.data === '$!') {
    if (((n = o.nextSibling && o.nextSibling.dataset), n)) var a = n.dgst;
    return (n = a), (l = Error(A(419))), (n = Sl(l, n, void 0)), _n(e, r, i, n);
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
          ((l.retryLane = o), tr(e, o), Ue(n, e, o, -1));
    }
    return xa(), (n = Sl(Error(A(421)))), _n(e, r, i, n);
  }
  return o.data === '$?'
    ? ((r.flags |= 128),
      (r.child = e.child),
      (r = fm.bind(null, e)),
      (o._reactRetry = r),
      null)
    : ((e = l.treeContext),
      (De = br(o.nextSibling)),
      (Fe = r),
      (Q = !0),
      (je = null),
      e !== null &&
        ((Ne[Ie++] = Ze),
        (Ne[Ie++] = Xe),
        (Ne[Ie++] = _r),
        (Ze = e.id),
        (Xe = e.overflow),
        (_r = r)),
      (r = ga(r, n.children)),
      (r.flags |= 4096),
      r);
}
function Cs(e, r, t) {
  e.lanes |= r;
  var n = e.alternate;
  n !== null && (n.lanes |= r), di(e.return, r, t);
}
function Dl(e, r, t, n, o) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: r,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: t,
        tailMode: o,
      })
    : ((l.isBackwards = r),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = n),
      (l.tail = t),
      (l.tailMode = o));
}
function a0(e, r, t) {
  var n = r.pendingProps,
    o = n.revealOrder,
    l = n.tail;
  if ((fe(e, r, n.children, t), (n = W.current), n & 2))
    (n = (n & 1) | 2), (r.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = r.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Cs(e, t, r);
        else if (e.tag === 19) Cs(e, t, r);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === r) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === r) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    n &= 1;
  }
  if ((_(W, n), !(r.mode & 1))) r.memoizedState = null;
  else
    switch (o) {
      case 'forwards':
        for (t = r.child, o = null; t !== null; )
          (e = t.alternate),
            e !== null && wo(e) === null && (o = t),
            (t = t.sibling);
        (t = o),
          t === null
            ? ((o = r.child), (r.child = null))
            : ((o = t.sibling), (t.sibling = null)),
          Dl(r, !1, o, t, l);
        break;
      case 'backwards':
        for (t = null, o = r.child, r.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && wo(e) === null)) {
            r.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = t), (t = o), (o = e);
        }
        Dl(r, !0, t, null, l);
        break;
      case 'together':
        Dl(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
  return r.child;
}
function eo(e, r) {
  !(r.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (r.alternate = null), (r.flags |= 2));
}
function nr(e, r, t) {
  if (
    (e !== null && (r.dependencies = e.dependencies),
    (Ur |= r.lanes),
    !(t & r.childLanes))
  )
    return null;
  if (e !== null && r.child !== e.child) throw Error(A(153));
  if (r.child !== null) {
    for (
      e = r.child, t = Ar(e, e.pendingProps), r.child = t, t.return = r;
      e.sibling !== null;

    )
      (e = e.sibling), (t = t.sibling = Ar(e, e.pendingProps)), (t.return = r);
    t.sibling = null;
  }
  return r.child;
}
function em(e, r, t) {
  switch (r.tag) {
    case 3:
      l0(r), ht();
      break;
    case 5:
      Mc(r);
      break;
    case 1:
      ve(r.type) && po(r);
      break;
    case 4:
      ia(r, r.stateNode.containerInfo);
      break;
    case 10:
      var n = r.type._context,
        o = r.memoizedProps.value;
      _(vo, n._currentValue), (n._currentValue = o);
      break;
    case 13:
      if (((n = r.memoizedState), n !== null))
        return n.dehydrated !== null
          ? (_(W, W.current & 1), (r.flags |= 128), null)
          : t & r.child.childLanes
          ? i0(e, r, t)
          : (_(W, W.current & 1),
            (e = nr(e, r, t)),
            e !== null ? e.sibling : null);
      _(W, W.current & 1);
      break;
    case 19:
      if (((n = (t & r.childLanes) !== 0), e.flags & 128)) {
        if (n) return a0(e, r, t);
        r.flags |= 128;
      }
      if (
        ((o = r.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        _(W, W.current),
        n)
      )
        break;
      return null;
    case 22:
    case 23:
      return (r.lanes = 0), n0(e, r, t);
  }
  return nr(e, r, t);
}
var s0, vi, u0, c0;
s0 = function (e, r) {
  for (var t = r.child; t !== null; ) {
    if (t.tag === 5 || t.tag === 6) e.appendChild(t.stateNode);
    else if (t.tag !== 4 && t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === r) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === r) return;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
};
vi = function () {};
u0 = function (e, r, t, n) {
  var o = e.memoizedProps;
  if (o !== n) {
    (e = r.stateNode), Pr(Ve.current);
    var l = null;
    switch (t) {
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
    Kl(t, n);
    var i;
    t = null;
    for (u in o)
      if (!n.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === 'style') {
          var a = o[u];
          for (i in a) a.hasOwnProperty(i) && (t || (t = {}), (t[i] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (Xt.hasOwnProperty(u)
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
                (t || (t = {}), (t[i] = ''));
            for (i in s)
              s.hasOwnProperty(i) &&
                a[i] !== s[i] &&
                (t || (t = {}), (t[i] = s[i]));
          } else t || (l || (l = []), l.push(u, t)), (t = s);
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
              (Xt.hasOwnProperty(u)
                ? (s != null && u === 'onScroll' && U('scroll', e),
                  l || a === s || (l = []))
                : (l = l || []).push(u, s));
    }
    t && (l = l || []).push('style', t);
    var u = l;
    (r.updateQueue = u) && (r.flags |= 4);
  }
};
c0 = function (e, r, t, n) {
  t !== n && (r.flags |= 4);
};
function Tt(e, r) {
  if (!Q)
    switch (e.tailMode) {
      case 'hidden':
        r = e.tail;
        for (var t = null; r !== null; )
          r.alternate !== null && (t = r), (r = r.sibling);
        t === null ? (e.tail = null) : (t.sibling = null);
        break;
      case 'collapsed':
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null
          ? r || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (n.sibling = null);
    }
}
function ue(e) {
  var r = e.alternate !== null && e.alternate.child === e.child,
    t = 0,
    n = 0;
  if (r)
    for (var o = e.child; o !== null; )
      (t |= o.lanes | o.childLanes),
        (n |= o.subtreeFlags & 14680064),
        (n |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (t |= o.lanes | o.childLanes),
        (n |= o.subtreeFlags),
        (n |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= n), (e.childLanes = t), r;
}
function rm(e, r, t) {
  var n = r.pendingProps;
  switch ((qi(r), r.tag)) {
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
      return ue(r), null;
    case 1:
      return ve(r.type) && ho(), ue(r), null;
    case 3:
      return (
        (n = r.stateNode),
        bt(),
        H(ye),
        H(de),
        sa(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (e === null || e.child === null) &&
          (Rn(r)
            ? (r.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(r.flags & 256)) ||
              ((r.flags |= 1024), je !== null && (Ci(je), (je = null)))),
        vi(e, r),
        ue(r),
        null
      );
    case 5:
      aa(r);
      var o = Pr(dn.current);
      if (((t = r.type), e !== null && r.stateNode != null))
        u0(e, r, t, n, o),
          e.ref !== r.ref && ((r.flags |= 512), (r.flags |= 2097152));
      else {
        if (!n) {
          if (r.stateNode === null) throw Error(A(166));
          return ue(r), null;
        }
        if (((e = Pr(Ve.current)), Rn(r))) {
          (n = r.stateNode), (t = r.type);
          var l = r.memoizedProps;
          switch (((n[We] = r), (n[un] = l), (e = (r.mode & 1) !== 0), t)) {
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
              for (o = 0; o < Rt.length; o++) U(Rt[o], n);
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
          Kl(t, l), (o = null);
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
                : Xt.hasOwnProperty(i) &&
                  a != null &&
                  i === 'onScroll' &&
                  U('scroll', n);
            }
          switch (t) {
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
          (n = o), (r.updateQueue = n), n !== null && (r.flags |= 4);
        } else {
          (i = o.nodeType === 9 ? o : o.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = ju(t)),
            e === 'http://www.w3.org/1999/xhtml'
              ? t === 'script'
                ? ((e = i.createElement('div')),
                  (e.innerHTML = '<script></script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof n.is == 'string'
                ? (e = i.createElement(t, { is: n.is }))
                : ((e = i.createElement(t)),
                  t === 'select' &&
                    ((i = e),
                    n.multiple
                      ? (i.multiple = !0)
                      : n.size && (i.size = n.size)))
              : (e = i.createElementNS(e, t)),
            (e[We] = r),
            (e[un] = n),
            s0(e, r, !1, !1),
            (r.stateNode = e);
          e: {
            switch (((i = Vl(t, n)), t)) {
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
                for (o = 0; o < Rt.length; o++) U(Rt[o], e);
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
            Kl(t, o), (a = o);
            for (l in a)
              if (a.hasOwnProperty(l)) {
                var s = a[l];
                l === 'style'
                  ? Uu(e, s)
                  : l === 'dangerouslySetInnerHTML'
                  ? ((s = s ? s.__html : void 0), s != null && _u(e, s))
                  : l === 'children'
                  ? typeof s == 'string'
                    ? (t !== 'textarea' || s !== '') && qt(e, s)
                    : typeof s == 'number' && qt(e, '' + s)
                  : l !== 'suppressContentEditableWarning' &&
                    l !== 'suppressHydrationWarning' &&
                    l !== 'autoFocus' &&
                    (Xt.hasOwnProperty(l)
                      ? s != null && l === 'onScroll' && U('scroll', e)
                      : s != null && ji(e, l, s, i));
              }
            switch (t) {
              case 'input':
                kn(e), Ra(e, n, !1);
                break;
              case 'textarea':
                kn(e), _a(e);
                break;
              case 'option':
                n.value != null && e.setAttribute('value', '' + Sr(n.value));
                break;
              case 'select':
                (e.multiple = !!n.multiple),
                  (l = n.value),
                  l != null
                    ? at(e, !!n.multiple, l, !1)
                    : n.defaultValue != null &&
                      at(e, !!n.multiple, n.defaultValue, !0);
                break;
              default:
                typeof o.onClick == 'function' && (e.onclick = go);
            }
            switch (t) {
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
          n && (r.flags |= 4);
        }
        r.ref !== null && ((r.flags |= 512), (r.flags |= 2097152));
      }
      return ue(r), null;
    case 6:
      if (e && r.stateNode != null) c0(e, r, e.memoizedProps, n);
      else {
        if (typeof n != 'string' && r.stateNode === null) throw Error(A(166));
        if (((t = Pr(dn.current)), Pr(Ve.current), Rn(r))) {
          if (
            ((n = r.stateNode),
            (t = r.memoizedProps),
            (n[We] = r),
            (l = n.nodeValue !== t) && ((e = Fe), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ln(n.nodeValue, t, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ln(n.nodeValue, t, (e.mode & 1) !== 0);
            }
          l && (r.flags |= 4);
        } else
          (n = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(n)),
            (n[We] = r),
            (r.stateNode = n);
      }
      return ue(r), null;
    case 13:
      if (
        (H(W),
        (n = r.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Q && De !== null && r.mode & 1 && !(r.flags & 128))
          kc(), ht(), (r.flags |= 98560), (l = !1);
        else if (((l = Rn(r)), n !== null && n.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(A(318));
            if (
              ((l = r.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(A(317));
            l[We] = r;
          } else
            ht(), !(r.flags & 128) && (r.memoizedState = null), (r.flags |= 4);
          ue(r), (l = !1);
        } else je !== null && (Ci(je), (je = null)), (l = !0);
        if (!l) return r.flags & 65536 ? r : null;
      }
      return r.flags & 128
        ? ((r.lanes = t), r)
        : ((n = n !== null),
          n !== (e !== null && e.memoizedState !== null) &&
            n &&
            ((r.child.flags |= 8192),
            r.mode & 1 &&
              (e === null || W.current & 1 ? ee === 0 && (ee = 3) : xa())),
          r.updateQueue !== null && (r.flags |= 4),
          ue(r),
          null);
    case 4:
      return (
        bt(), vi(e, r), e === null && an(r.stateNode.containerInfo), ue(r), null
      );
    case 10:
      return na(r.type._context), ue(r), null;
    case 17:
      return ve(r.type) && ho(), ue(r), null;
    case 19:
      if ((H(W), (l = r.memoizedState), l === null)) return ue(r), null;
      if (((n = (r.flags & 128) !== 0), (i = l.rendering), i === null))
        if (n) Tt(l, !1);
        else {
          if (ee !== 0 || (e !== null && e.flags & 128))
            for (e = r.child; e !== null; ) {
              if (((i = wo(e)), i !== null)) {
                for (
                  r.flags |= 128,
                    Tt(l, !1),
                    n = i.updateQueue,
                    n !== null && ((r.updateQueue = n), (r.flags |= 4)),
                    r.subtreeFlags = 0,
                    n = t,
                    t = r.child;
                  t !== null;

                )
                  (l = t),
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
                    (t = t.sibling);
                return _(W, (W.current & 1) | 2), r.child;
              }
              e = e.sibling;
            }
          l.tail !== null &&
            Z() > vt &&
            ((r.flags |= 128), (n = !0), Tt(l, !1), (r.lanes = 4194304));
        }
      else {
        if (!n)
          if (((e = wo(i)), e !== null)) {
            if (
              ((r.flags |= 128),
              (n = !0),
              (t = e.updateQueue),
              t !== null && ((r.updateQueue = t), (r.flags |= 4)),
              Tt(l, !0),
              l.tail === null && l.tailMode === 'hidden' && !i.alternate && !Q)
            )
              return ue(r), null;
          } else
            2 * Z() - l.renderingStartTime > vt &&
              t !== 1073741824 &&
              ((r.flags |= 128), (n = !0), Tt(l, !1), (r.lanes = 4194304));
        l.isBackwards
          ? ((i.sibling = r.child), (r.child = i))
          : ((t = l.last),
            t !== null ? (t.sibling = i) : (r.child = i),
            (l.last = i));
      }
      return l.tail !== null
        ? ((r = l.tail),
          (l.rendering = r),
          (l.tail = r.sibling),
          (l.renderingStartTime = Z()),
          (r.sibling = null),
          (t = W.current),
          _(W, n ? (t & 1) | 2 : t & 1),
          r)
        : (ue(r), null);
    case 22:
    case 23:
      return (
        va(),
        (n = r.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== n && (r.flags |= 8192),
        n && r.mode & 1
          ? we & 1073741824 && (ue(r), r.subtreeFlags & 6 && (r.flags |= 8192))
          : ue(r),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(A(156, r.tag));
}
function tm(e, r) {
  switch ((qi(r), r.tag)) {
    case 1:
      return (
        ve(r.type) && ho(),
        (e = r.flags),
        e & 65536 ? ((r.flags = (e & -65537) | 128), r) : null
      );
    case 3:
      return (
        bt(),
        H(ye),
        H(de),
        sa(),
        (e = r.flags),
        e & 65536 && !(e & 128) ? ((r.flags = (e & -65537) | 128), r) : null
      );
    case 5:
      return aa(r), null;
    case 13:
      if ((H(W), (e = r.memoizedState), e !== null && e.dehydrated !== null)) {
        if (r.alternate === null) throw Error(A(340));
        ht();
      }
      return (
        (e = r.flags), e & 65536 ? ((r.flags = (e & -65537) | 128), r) : null
      );
    case 19:
      return H(W), null;
    case 4:
      return bt(), null;
    case 10:
      return na(r.type._context), null;
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
function ot(e, r) {
  var t = e.ref;
  if (t !== null)
    if (typeof t == 'function')
      try {
        t(null);
      } catch (n) {
        G(e, r, n);
      }
    else t.current = null;
}
function xi(e, r, t) {
  try {
    t();
  } catch (n) {
    G(e, r, n);
  }
}
var ks = !1;
function om(e, r) {
  if (((ni = co), (e = hc()), Zi(e))) {
    if ('selectionStart' in e)
      var t = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        t = ((t = e.ownerDocument) && t.defaultView) || window;
        var n = t.getSelection && t.getSelection();
        if (n && n.rangeCount !== 0) {
          t = n.anchorNode;
          var o = n.anchorOffset,
            l = n.focusNode;
          n = n.focusOffset;
          try {
            t.nodeType, l.nodeType;
          } catch {
            t = null;
            break e;
          }
          var i = 0,
            a = -1,
            s = -1,
            u = 0,
            m = 0,
            p = e,
            h = null;
          r: for (;;) {
            for (
              var y;
              p !== t || (o !== 0 && p.nodeType !== 3) || (a = i + o),
                p !== l || (n !== 0 && p.nodeType !== 3) || (s = i + n),
                p.nodeType === 3 && (i += p.nodeValue.length),
                (y = p.firstChild) !== null;

            )
              (h = p), (p = y);
            for (;;) {
              if (p === e) break r;
              if (
                (h === t && ++u === o && (a = i),
                h === l && ++m === n && (s = i),
                (y = p.nextSibling) !== null)
              )
                break;
              (p = h), (h = p.parentNode);
            }
            p = y;
          }
          t = a === -1 || s === -1 ? null : { start: a, end: s };
        } else t = null;
      }
    t = t || { start: 0, end: 0 };
  } else t = null;
  for (oi = { focusedElem: e, selectionRange: t }, co = !1, F = r; F !== null; )
    if (((r = F), (e = r.child), (r.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = r), (F = e);
    else
      for (; F !== null; ) {
        r = F;
        try {
          var x = r.alternate;
          if (r.flags & 1024)
            switch (r.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var w = x.memoizedProps,
                    P = x.memoizedState,
                    f = r.stateNode,
                    d = f.getSnapshotBeforeUpdate(
                      r.elementType === r.type ? w : Le(r.type, w),
                      P
                    );
                  f.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var g = r.stateNode.containerInfo;
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
          G(r, r.return, v);
        }
        if (((e = r.sibling), e !== null)) {
          (e.return = r.return), (F = e);
          break;
        }
        F = r.return;
      }
  return (x = ks), (ks = !1), x;
}
function $t(e, r, t) {
  var n = r.updateQueue;
  if (((n = n !== null ? n.lastEffect : null), n !== null)) {
    var o = (n = n.next);
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy;
        (o.destroy = void 0), l !== void 0 && xi(r, t, l);
      }
      o = o.next;
    } while (o !== n);
  }
}
function Qo(e, r) {
  if (
    ((r = r.updateQueue), (r = r !== null ? r.lastEffect : null), r !== null)
  ) {
    var t = (r = r.next);
    do {
      if ((t.tag & e) === e) {
        var n = t.create;
        t.destroy = n();
      }
      t = t.next;
    } while (t !== r);
  }
}
function Ai(e) {
  var r = e.ref;
  if (r !== null) {
    var t = e.stateNode;
    switch (e.tag) {
      case 5:
        e = t;
        break;
      default:
        e = t;
    }
    typeof r == 'function' ? r(e) : (r.current = e);
  }
}
function d0(e) {
  var r = e.alternate;
  r !== null && ((e.alternate = null), d0(r)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((r = e.stateNode),
      r !== null &&
        (delete r[We], delete r[un], delete r[ai], delete r[Of], delete r[Uf])),
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
function wi(e, r, t) {
  var n = e.tag;
  if (n === 5 || n === 6)
    (e = e.stateNode),
      r
        ? t.nodeType === 8
          ? t.parentNode.insertBefore(e, r)
          : t.insertBefore(e, r)
        : (t.nodeType === 8
            ? ((r = t.parentNode), r.insertBefore(e, t))
            : ((r = t), r.appendChild(e)),
          (t = t._reactRootContainer),
          t != null || r.onclick !== null || (r.onclick = go));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (wi(e, r, t), e = e.sibling; e !== null; ) wi(e, r, t), (e = e.sibling);
}
function Si(e, r, t) {
  var n = e.tag;
  if (n === 5 || n === 6)
    (e = e.stateNode), r ? t.insertBefore(e, r) : t.appendChild(e);
  else if (n !== 4 && ((e = e.child), e !== null))
    for (Si(e, r, t), e = e.sibling; e !== null; ) Si(e, r, t), (e = e.sibling);
}
var le = null,
  Re = !1;
function ar(e, r, t) {
  for (t = t.child; t !== null; ) m0(e, r, t), (t = t.sibling);
}
function m0(e, r, t) {
  if (Ke && typeof Ke.onCommitFiberUnmount == 'function')
    try {
      Ke.onCommitFiberUnmount(Po, t);
    } catch {}
  switch (t.tag) {
    case 5:
      ce || ot(t, r);
    case 6:
      var n = le,
        o = Re;
      (le = null),
        ar(e, r, t),
        (le = n),
        (Re = o),
        le !== null &&
          (Re
            ? ((e = le),
              (t = t.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t))
            : le.removeChild(t.stateNode));
      break;
    case 18:
      le !== null &&
        (Re
          ? ((e = le),
            (t = t.stateNode),
            e.nodeType === 8
              ? bl(e.parentNode, t)
              : e.nodeType === 1 && bl(e, t),
            nn(e))
          : bl(le, t.stateNode));
      break;
    case 4:
      (n = le),
        (o = Re),
        (le = t.stateNode.containerInfo),
        (Re = !0),
        ar(e, r, t),
        (le = n),
        (Re = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ce &&
        ((n = t.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
      ) {
        o = n = n.next;
        do {
          var l = o,
            i = l.destroy;
          (l = l.tag),
            i !== void 0 && (l & 2 || l & 4) && xi(t, r, i),
            (o = o.next);
        } while (o !== n);
      }
      ar(e, r, t);
      break;
    case 1:
      if (
        !ce &&
        (ot(t, r),
        (n = t.stateNode),
        typeof n.componentWillUnmount == 'function')
      )
        try {
          (n.props = t.memoizedProps),
            (n.state = t.memoizedState),
            n.componentWillUnmount();
        } catch (a) {
          G(t, r, a);
        }
      ar(e, r, t);
      break;
    case 21:
      ar(e, r, t);
      break;
    case 22:
      t.mode & 1
        ? ((ce = (n = ce) || t.memoizedState !== null), ar(e, r, t), (ce = n))
        : ar(e, r, t);
      break;
    default:
      ar(e, r, t);
  }
}
function Is(e) {
  var r = e.updateQueue;
  if (r !== null) {
    e.updateQueue = null;
    var t = e.stateNode;
    t === null && (t = e.stateNode = new nm()),
      r.forEach(function (n) {
        var o = mm.bind(null, e, n);
        t.has(n) || (t.add(n), n.then(o, o));
      });
  }
}
function Pe(e, r) {
  var t = r.deletions;
  if (t !== null)
    for (var n = 0; n < t.length; n++) {
      var o = t[n];
      try {
        var l = e,
          i = r,
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
        G(o, r, u);
      }
    }
  if (r.subtreeFlags & 12854)
    for (r = r.child; r !== null; ) g0(r, e), (r = r.sibling);
}
function g0(e, r) {
  var t = e.alternate,
    n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Pe(r, e), Qe(e), n & 4)) {
        try {
          $t(3, e, e.return), Qo(3, e);
        } catch (w) {
          G(e, e.return, w);
        }
        try {
          $t(5, e, e.return);
        } catch (w) {
          G(e, e.return, w);
        }
      }
      break;
    case 1:
      Pe(r, e), Qe(e), n & 512 && t !== null && ot(t, t.return);
      break;
    case 5:
      if (
        (Pe(r, e),
        Qe(e),
        n & 512 && t !== null && ot(t, t.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          qt(o, '');
        } catch (w) {
          G(e, e.return, w);
        }
      }
      if (n & 4 && ((o = e.stateNode), o != null)) {
        var l = e.memoizedProps,
          i = t !== null ? t.memoizedProps : l,
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
                ? qt(o, p)
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
                  ? at(o, !!l.multiple, y, !1)
                  : h !== !!l.multiple &&
                    (l.defaultValue != null
                      ? at(o, !!l.multiple, l.defaultValue, !0)
                      : at(o, !!l.multiple, l.multiple ? [] : '', !1));
            }
            o[un] = l;
          } catch (w) {
            G(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((Pe(r, e), Qe(e), n & 4)) {
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
        (Pe(r, e), Qe(e), n & 4 && t !== null && t.memoizedState.isDehydrated)
      )
        try {
          nn(r.containerInfo);
        } catch (w) {
          G(e, e.return, w);
        }
      break;
    case 4:
      Pe(r, e), Qe(e);
      break;
    case 13:
      Pe(r, e),
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
        ((m = t !== null && t.memoizedState !== null),
        e.mode & 1 ? ((ce = (u = ce) || m), Pe(r, e), (ce = u)) : Pe(r, e),
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
                  $t(4, h, h.return);
                  break;
                case 1:
                  ot(h, h.return);
                  var x = h.stateNode;
                  if (typeof x.componentWillUnmount == 'function') {
                    (n = h), (t = h.return);
                    try {
                      (r = n),
                        (x.props = r.memoizedProps),
                        (x.state = r.memoizedState),
                        x.componentWillUnmount();
                    } catch (w) {
                      G(n, t, w);
                    }
                  }
                  break;
                case 5:
                  ot(h, h.return);
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
      Pe(r, e), Qe(e), n & 4 && Is(e);
      break;
    case 21:
      break;
    default:
      Pe(r, e), Qe(e);
  }
}
function Qe(e) {
  var r = e.flags;
  if (r & 2) {
    try {
      e: {
        for (var t = e.return; t !== null; ) {
          if (f0(t)) {
            var n = t;
            break e;
          }
          t = t.return;
        }
        throw Error(A(160));
      }
      switch (n.tag) {
        case 5:
          var o = n.stateNode;
          n.flags & 32 && (qt(o, ''), (n.flags &= -33));
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
  r & 4096 && (e.flags &= -4097);
}
function lm(e, r, t) {
  (F = e), h0(e);
}
function h0(e, r, t) {
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
    var r = F;
    if (r.flags & 8772) {
      var t = r.alternate;
      try {
        if (r.flags & 8772)
          switch (r.tag) {
            case 0:
            case 11:
            case 15:
              ce || Qo(5, r);
              break;
            case 1:
              var n = r.stateNode;
              if (r.flags & 4 && !ce)
                if (t === null) n.componentDidMount();
                else {
                  var o =
                    r.elementType === r.type
                      ? t.memoizedProps
                      : Le(r.type, t.memoizedProps);
                  n.componentDidUpdate(
                    o,
                    t.memoizedState,
                    n.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var l = r.updateQueue;
              l !== null && hs(r, l, n);
              break;
            case 3:
              var i = r.updateQueue;
              if (i !== null) {
                if (((t = null), r.child !== null))
                  switch (r.child.tag) {
                    case 5:
                      t = r.child.stateNode;
                      break;
                    case 1:
                      t = r.child.stateNode;
                  }
                hs(r, i, t);
              }
              break;
            case 5:
              var a = r.stateNode;
              if (t === null && r.flags & 4) {
                t = a;
                var s = r.memoizedProps;
                switch (r.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    s.autoFocus && t.focus();
                    break;
                  case 'img':
                    s.src && (t.src = s.src);
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
              if (r.memoizedState === null) {
                var u = r.alternate;
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
        ce || (r.flags & 512 && Ai(r));
      } catch (h) {
        G(r, r.return, h);
      }
    }
    if (r === e) {
      F = null;
      break;
    }
    if (((t = r.sibling), t !== null)) {
      (t.return = r.return), (F = t);
      break;
    }
    F = r.return;
  }
}
function Bs(e) {
  for (; F !== null; ) {
    var r = F;
    if (r === e) {
      F = null;
      break;
    }
    var t = r.sibling;
    if (t !== null) {
      (t.return = r.return), (F = t);
      break;
    }
    F = r.return;
  }
}
function Ms(e) {
  for (; F !== null; ) {
    var r = F;
    try {
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          var t = r.return;
          try {
            Qo(4, r);
          } catch (s) {
            G(r, t, s);
          }
          break;
        case 1:
          var n = r.stateNode;
          if (typeof n.componentDidMount == 'function') {
            var o = r.return;
            try {
              n.componentDidMount();
            } catch (s) {
              G(r, o, s);
            }
          }
          var l = r.return;
          try {
            Ai(r);
          } catch (s) {
            G(r, l, s);
          }
          break;
        case 5:
          var i = r.return;
          try {
            Ai(r);
          } catch (s) {
            G(r, i, s);
          }
      }
    } catch (s) {
      G(r, r.return, s);
    }
    if (r === e) {
      F = null;
      break;
    }
    var a = r.sibling;
    if (a !== null) {
      (a.return = r.return), (F = a);
      break;
    }
    F = r.return;
  }
}
var im = Math.ceil,
  Fo = lr.ReactCurrentDispatcher,
  ha = lr.ReactCurrentOwner,
  Be = lr.ReactCurrentBatchConfig,
  L = 0,
  oe = null,
  X = null,
  ie = 0,
  we = 0,
  lt = Er(0),
  ee = 0,
  hn = null,
  Ur = 0,
  $o = 0,
  pa = 0,
  Wt = null,
  pe = null,
  ba = 0,
  vt = 1 / 0,
  Ye = null,
  Eo = !1,
  Di = null,
  vr = null,
  Un = !1,
  mr = null,
  Co = 0,
  Kt = 0,
  Fi = null,
  ro = -1,
  to = 0;
function me() {
  return L & 6 ? Z() : ro !== -1 ? ro : (ro = Z());
}
function xr(e) {
  return e.mode & 1
    ? L & 2 && ie !== 0
      ? ie & -ie
      : Qf.transition !== null
      ? (to === 0 && (to = qu()), to)
      : ((e = R),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : ic(e.type))),
        e)
    : 1;
}
function Ue(e, r, t, n) {
  if (50 < Kt) throw ((Kt = 0), (Fi = null), Error(A(185)));
  xn(e, t, n),
    (!(L & 2) || e !== oe) &&
      (e === oe && (!(L & 2) && ($o |= t), ee === 4 && dr(e, ie)),
      xe(e, n),
      t === 1 && L === 0 && !(r.mode & 1) && ((vt = Z() + 500), Oo && Cr()));
}
function xe(e, r) {
  var t = e.callbackNode;
  Hd(e, r);
  var n = uo(e, e === oe ? ie : 0);
  if (n === 0)
    t !== null && Ha(t), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((r = n & -n), e.callbackPriority !== r)) {
    if ((t != null && Ha(t), r === 1))
      e.tag === 0 ? Hf(zs.bind(null, e)) : Fc(zs.bind(null, e)),
        jf(function () {
          !(L & 6) && Cr();
        }),
        (t = null);
    else {
      switch (ec(n)) {
        case 1:
          t = Qi;
          break;
        case 4:
          t = Zu;
          break;
        case 16:
          t = so;
          break;
        case 536870912:
          t = Xu;
          break;
        default:
          t = so;
      }
      t = S0(t, p0.bind(null, e));
    }
    (e.callbackPriority = r), (e.callbackNode = t);
  }
}
function p0(e, r) {
  if (((ro = -1), (to = 0), L & 6)) throw Error(A(327));
  var t = e.callbackNode;
  if (ft() && e.callbackNode !== t) return null;
  var n = uo(e, e === oe ? ie : 0);
  if (n === 0) return null;
  if (n & 30 || n & e.expiredLanes || r) r = ko(e, n);
  else {
    r = n;
    var o = L;
    L |= 2;
    var l = y0();
    (oe !== e || ie !== r) && ((Ye = null), (vt = Z() + 500), Lr(e, r));
    do
      try {
        um();
        break;
      } catch (a) {
        b0(e, a);
      }
    while (!0);
    ta(),
      (Fo.current = l),
      (L = o),
      X !== null ? (r = 0) : ((oe = null), (ie = 0), (r = ee));
  }
  if (r !== 0) {
    if (
      (r === 2 && ((o = Xl(e)), o !== 0 && ((n = o), (r = Ei(e, o)))), r === 1)
    )
      throw ((t = hn), Lr(e, 0), dr(e, n), xe(e, Z()), t);
    if (r === 6) dr(e, n);
    else {
      if (
        ((o = e.current.alternate),
        !(n & 30) &&
          !am(o) &&
          ((r = ko(e, n)),
          r === 2 && ((l = Xl(e)), l !== 0 && ((n = l), (r = Ei(e, l)))),
          r === 1))
      )
        throw ((t = hn), Lr(e, 0), dr(e, n), xe(e, Z()), t);
      switch (((e.finishedWork = o), (e.finishedLanes = n), r)) {
        case 0:
        case 1:
          throw Error(A(345));
        case 2:
          Br(e, pe, Ye);
          break;
        case 3:
          if (
            (dr(e, n), (n & 130023424) === n && ((r = ba + 500 - Z()), 10 < r))
          ) {
            if (uo(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & n) !== n)) {
              me(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = ii(Br.bind(null, e, pe, Ye), r);
            break;
          }
          Br(e, pe, Ye);
          break;
        case 4:
          if ((dr(e, n), (n & 4194240) === n)) break;
          for (r = e.eventTimes, o = -1; 0 < n; ) {
            var i = 31 - Oe(n);
            (l = 1 << i), (i = r[i]), i > o && (o = i), (n &= ~l);
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
            e.timeoutHandle = ii(Br.bind(null, e, pe, Ye), n);
            break;
          }
          Br(e, pe, Ye);
          break;
        case 5:
          Br(e, pe, Ye);
          break;
        default:
          throw Error(A(329));
      }
    }
  }
  return xe(e, Z()), e.callbackNode === t ? p0.bind(null, e) : null;
}
function Ei(e, r) {
  var t = Wt;
  return (
    e.current.memoizedState.isDehydrated && (Lr(e, r).flags |= 256),
    (e = ko(e, r)),
    e !== 2 && ((r = pe), (pe = t), r !== null && Ci(r)),
    e
  );
}
function Ci(e) {
  pe === null ? (pe = e) : pe.push.apply(pe, e);
}
function am(e) {
  for (var r = e; ; ) {
    if (r.flags & 16384) {
      var t = r.updateQueue;
      if (t !== null && ((t = t.stores), t !== null))
        for (var n = 0; n < t.length; n++) {
          var o = t[n],
            l = o.getSnapshot;
          o = o.value;
          try {
            if (!He(l(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((t = r.child), r.subtreeFlags & 16384 && t !== null))
      (t.return = r), (r = t);
    else {
      if (r === e) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === e) return !0;
        r = r.return;
      }
      (r.sibling.return = r.return), (r = r.sibling);
    }
  }
  return !0;
}
function dr(e, r) {
  for (
    r &= ~pa,
      r &= ~$o,
      e.suspendedLanes |= r,
      e.pingedLanes &= ~r,
      e = e.expirationTimes;
    0 < r;

  ) {
    var t = 31 - Oe(r),
      n = 1 << t;
    (e[t] = -1), (r &= ~n);
  }
}
function zs(e) {
  if (L & 6) throw Error(A(327));
  ft();
  var r = uo(e, 0);
  if (!(r & 1)) return xe(e, Z()), null;
  var t = ko(e, r);
  if (e.tag !== 0 && t === 2) {
    var n = Xl(e);
    n !== 0 && ((r = n), (t = Ei(e, n)));
  }
  if (t === 1) throw ((t = hn), Lr(e, 0), dr(e, r), xe(e, Z()), t);
  if (t === 6) throw Error(A(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = r),
    Br(e, pe, Ye),
    xe(e, Z()),
    null
  );
}
function ya(e, r) {
  var t = L;
  L |= 1;
  try {
    return e(r);
  } finally {
    (L = t), L === 0 && ((vt = Z() + 500), Oo && Cr());
  }
}
function Hr(e) {
  mr !== null && mr.tag === 0 && !(L & 6) && ft();
  var r = L;
  L |= 1;
  var t = Be.transition,
    n = R;
  try {
    if (((Be.transition = null), (R = 1), e)) return e();
  } finally {
    (R = n), (Be.transition = t), (L = r), !(L & 6) && Cr();
  }
}
function va() {
  (we = lt.current), H(lt);
}
function Lr(e, r) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var t = e.timeoutHandle;
  if ((t !== -1 && ((e.timeoutHandle = -1), Rf(t)), X !== null))
    for (t = X.return; t !== null; ) {
      var n = t;
      switch ((qi(n), n.tag)) {
        case 1:
          (n = n.type.childContextTypes), n != null && ho();
          break;
        case 3:
          bt(), H(ye), H(de), sa();
          break;
        case 5:
          aa(n);
          break;
        case 4:
          bt();
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
      t = t.return;
    }
  if (
    ((oe = e),
    (X = e = Ar(e.current, null)),
    (ie = we = r),
    (ee = 0),
    (hn = null),
    (pa = $o = Ur = 0),
    (pe = Wt = null),
    zr !== null)
  ) {
    for (r = 0; r < zr.length; r++)
      if (((t = zr[r]), (n = t.interleaved), n !== null)) {
        t.interleaved = null;
        var o = n.next,
          l = t.pending;
        if (l !== null) {
          var i = l.next;
          (l.next = o), (n.next = i);
        }
        t.pending = n;
      }
    zr = null;
  }
  return e;
}
function b0(e, r) {
  do {
    var t = X;
    try {
      if ((ta(), (Xn.current = Do), So)) {
        for (var n = K.memoizedState; n !== null; ) {
          var o = n.queue;
          o !== null && (o.pending = null), (n = n.next);
        }
        So = !1;
      }
      if (
        ((Or = 0),
        (te = q = K = null),
        (Qt = !1),
        (fn = 0),
        (ha.current = null),
        t === null || t.return === null)
      ) {
        (ee = 1), (hn = r), (X = null);
        break;
      }
      e: {
        var l = e,
          i = t.return,
          a = t,
          s = r;
        if (
          ((r = ie),
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
              ws(y, i, a, l, r),
              y.mode & 1 && xs(l, u, r),
              (r = y),
              (s = u);
            var x = r.updateQueue;
            if (x === null) {
              var w = new Set();
              w.add(s), (r.updateQueue = w);
            } else x.add(s);
            break e;
          } else {
            if (!(r & 1)) {
              xs(l, u, r), xa();
              break e;
            }
            s = Error(A(426));
          }
        } else if (Q && a.mode & 1) {
          var P = As(i);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256),
              ws(P, i, a, l, r),
              ea(yt(s, a));
            break e;
          }
        }
        (l = s = yt(s, a)),
          ee !== 4 && (ee = 2),
          Wt === null ? (Wt = [l]) : Wt.push(l),
          (l = i);
        do {
          switch (l.tag) {
            case 3:
              (l.flags |= 65536), (r &= -r), (l.lanes |= r);
              var f = e0(l, s, r);
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
                    (vr === null || !vr.has(g))))
              ) {
                (l.flags |= 65536), (r &= -r), (l.lanes |= r);
                var v = r0(l, a, r);
                gs(l, v);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      x0(t);
    } catch (S) {
      (r = S), X === t && t !== null && (X = t = t.return);
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
    oe === null || (!(Ur & 268435455) && !($o & 268435455)) || dr(oe, ie);
}
function ko(e, r) {
  var t = L;
  L |= 2;
  var n = y0();
  (oe !== e || ie !== r) && ((Ye = null), Lr(e, r));
  do
    try {
      sm();
      break;
    } catch (o) {
      b0(e, o);
    }
  while (!0);
  if ((ta(), (L = t), (Fo.current = n), X !== null)) throw Error(A(261));
  return (oe = null), (ie = 0), ee;
}
function sm() {
  for (; X !== null; ) v0(X);
}
function um() {
  for (; X !== null && !Md(); ) v0(X);
}
function v0(e) {
  var r = w0(e.alternate, e, we);
  (e.memoizedProps = e.pendingProps),
    r === null ? x0(e) : (X = r),
    (ha.current = null);
}
function x0(e) {
  var r = e;
  do {
    var t = r.alternate;
    if (((e = r.return), r.flags & 32768)) {
      if (((t = tm(t, r)), t !== null)) {
        (t.flags &= 32767), (X = t);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ee = 6), (X = null);
        return;
      }
    } else if (((t = rm(t, r, we)), t !== null)) {
      X = t;
      return;
    }
    if (((r = r.sibling), r !== null)) {
      X = r;
      return;
    }
    X = r = e;
  } while (r !== null);
  ee === 0 && (ee = 5);
}
function Br(e, r, t) {
  var n = R,
    o = Be.transition;
  try {
    (Be.transition = null), (R = 1), cm(e, r, t, n);
  } finally {
    (Be.transition = o), (R = n);
  }
  return null;
}
function cm(e, r, t, n) {
  do ft();
  while (mr !== null);
  if (L & 6) throw Error(A(327));
  t = e.finishedWork;
  var o = e.finishedLanes;
  if (t === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), t === e.current))
    throw Error(A(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var l = t.lanes | t.childLanes;
  if (
    (Qd(e, l),
    e === oe && ((X = oe = null), (ie = 0)),
    (!(t.subtreeFlags & 2064) && !(t.flags & 2064)) ||
      Un ||
      ((Un = !0),
      S0(so, function () {
        return ft(), null;
      })),
    (l = (t.flags & 15990) !== 0),
    t.subtreeFlags & 15990 || l)
  ) {
    (l = Be.transition), (Be.transition = null);
    var i = R;
    R = 1;
    var a = L;
    (L |= 4),
      (ha.current = null),
      om(e, t),
      g0(t, e),
      If(oi),
      (co = !!ni),
      (oi = ni = null),
      (e.current = t),
      lm(t),
      zd(),
      (L = a),
      (R = i),
      (Be.transition = l);
  } else e.current = t;
  if (
    (Un && ((Un = !1), (mr = e), (Co = o)),
    (l = e.pendingLanes),
    l === 0 && (vr = null),
    Rd(t.stateNode),
    xe(e, Z()),
    r !== null)
  )
    for (n = e.onRecoverableError, t = 0; t < r.length; t++)
      (o = r[t]), n(o.value, { componentStack: o.stack, digest: o.digest });
  if (Eo) throw ((Eo = !1), (e = Di), (Di = null), e);
  return (
    Co & 1 && e.tag !== 0 && ft(),
    (l = e.pendingLanes),
    l & 1 ? (e === Fi ? Kt++ : ((Kt = 0), (Fi = e))) : (Kt = 0),
    Cr(),
    null
  );
}
function ft() {
  if (mr !== null) {
    var e = ec(Co),
      r = Be.transition,
      t = R;
    try {
      if (((Be.transition = null), (R = 16 > e ? 16 : e), mr === null))
        var n = !1;
      else {
        if (((e = mr), (mr = null), (Co = 0), L & 6)) throw Error(A(331));
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
                      $t(8, m, l);
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
                    $t(9, l, l.return);
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
          ((L = o), Cr(), Ke && typeof Ke.onPostCommitFiberRoot == 'function')
        )
          try {
            Ke.onPostCommitFiberRoot(Po, e);
          } catch {}
        n = !0;
      }
      return n;
    } finally {
      (R = t), (Be.transition = r);
    }
  }
  return !1;
}
function Ps(e, r, t) {
  (r = yt(t, r)),
    (r = e0(e, r, 1)),
    (e = yr(e, r, 1)),
    (r = me()),
    e !== null && (xn(e, 1, r), xe(e, r));
}
function G(e, r, t) {
  if (e.tag === 3) Ps(e, e, t);
  else
    for (; r !== null; ) {
      if (r.tag === 3) {
        Ps(r, e, t);
        break;
      } else if (r.tag === 1) {
        var n = r.stateNode;
        if (
          typeof r.type.getDerivedStateFromError == 'function' ||
          (typeof n.componentDidCatch == 'function' &&
            (vr === null || !vr.has(n)))
        ) {
          (e = yt(t, e)),
            (e = r0(r, e, 1)),
            (r = yr(r, e, 1)),
            (e = me()),
            r !== null && (xn(r, 1, e), xe(r, e));
          break;
        }
      }
      r = r.return;
    }
}
function dm(e, r, t) {
  var n = e.pingCache;
  n !== null && n.delete(r),
    (r = me()),
    (e.pingedLanes |= e.suspendedLanes & t),
    oe === e &&
      (ie & t) === t &&
      (ee === 4 || (ee === 3 && (ie & 130023424) === ie && 500 > Z() - ba)
        ? Lr(e, 0)
        : (pa |= t)),
    xe(e, r);
}
function A0(e, r) {
  r === 0 &&
    (e.mode & 1
      ? ((r = Tn), (Tn <<= 1), !(Tn & 130023424) && (Tn = 4194304))
      : (r = 1));
  var t = me();
  (e = tr(e, r)), e !== null && (xn(e, r, t), xe(e, t));
}
function fm(e) {
  var r = e.memoizedState,
    t = 0;
  r !== null && (t = r.retryLane), A0(e, t);
}
function mm(e, r) {
  var t = 0;
  switch (e.tag) {
    case 13:
      var n = e.stateNode,
        o = e.memoizedState;
      o !== null && (t = o.retryLane);
      break;
    case 19:
      n = e.stateNode;
      break;
    default:
      throw Error(A(314));
  }
  n !== null && n.delete(r), A0(e, t);
}
var w0;
w0 = function (e, r, t) {
  if (e !== null)
    if (e.memoizedProps !== r.pendingProps || ye.current) be = !0;
    else {
      if (!(e.lanes & t) && !(r.flags & 128)) return (be = !1), em(e, r, t);
      be = !!(e.flags & 131072);
    }
  else (be = !1), Q && r.flags & 1048576 && Ec(r, yo, r.index);
  switch (((r.lanes = 0), r.tag)) {
    case 2:
      var n = r.type;
      eo(e, r), (e = r.pendingProps);
      var o = gt(r, de.current);
      dt(r, t), (o = ca(null, r, n, e, o, t));
      var l = da();
      return (
        (r.flags |= 1),
        typeof o == 'object' &&
        o !== null &&
        typeof o.render == 'function' &&
        o.$$typeof === void 0
          ? ((r.tag = 1),
            (r.memoizedState = null),
            (r.updateQueue = null),
            ve(n) ? ((l = !0), po(r)) : (l = !1),
            (r.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            la(r),
            (o.updater = Ho),
            (r.stateNode = o),
            (o._reactInternals = r),
            mi(r, n, e, t),
            (r = pi(null, r, n, !0, l, t)))
          : ((r.tag = 0), Q && l && Xi(r), fe(null, r, o, t), (r = r.child)),
        r
      );
    case 16:
      n = r.elementType;
      e: {
        switch (
          (eo(e, r),
          (e = r.pendingProps),
          (o = n._init),
          (n = o(n._payload)),
          (r.type = n),
          (o = r.tag = hm(n)),
          (e = Le(n, e)),
          o)
        ) {
          case 0:
            r = hi(null, r, n, e, t);
            break e;
          case 1:
            r = Fs(null, r, n, e, t);
            break e;
          case 11:
            r = Ss(null, r, n, e, t);
            break e;
          case 14:
            r = Ds(null, r, n, Le(n.type, e), t);
            break e;
        }
        throw Error(A(306, n, ''));
      }
      return r;
    case 0:
      return (
        (n = r.type),
        (o = r.pendingProps),
        (o = r.elementType === n ? o : Le(n, o)),
        hi(e, r, n, o, t)
      );
    case 1:
      return (
        (n = r.type),
        (o = r.pendingProps),
        (o = r.elementType === n ? o : Le(n, o)),
        Fs(e, r, n, o, t)
      );
    case 3:
      e: {
        if ((l0(r), e === null)) throw Error(A(387));
        (n = r.pendingProps),
          (l = r.memoizedState),
          (o = l.element),
          Bc(e, r),
          Ao(r, n, null, t);
        var i = r.memoizedState;
        if (((n = i.element), l.isDehydrated))
          if (
            ((l = {
              element: n,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (r.updateQueue.baseState = l),
            (r.memoizedState = l),
            r.flags & 256)
          ) {
            (o = yt(Error(A(423)), r)), (r = Es(e, r, n, t, o));
            break e;
          } else if (n !== o) {
            (o = yt(Error(A(424)), r)), (r = Es(e, r, n, t, o));
            break e;
          } else
            for (
              De = br(r.stateNode.containerInfo.firstChild),
                Fe = r,
                Q = !0,
                je = null,
                t = Ic(r, null, n, t),
                r.child = t;
              t;

            )
              (t.flags = (t.flags & -3) | 4096), (t = t.sibling);
        else {
          if ((ht(), n === o)) {
            r = nr(e, r, t);
            break e;
          }
          fe(e, r, n, t);
        }
        r = r.child;
      }
      return r;
    case 5:
      return (
        Mc(r),
        e === null && ci(r),
        (n = r.type),
        (o = r.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (i = o.children),
        li(n, o) ? (i = null) : l !== null && li(n, l) && (r.flags |= 32),
        o0(e, r),
        fe(e, r, i, t),
        r.child
      );
    case 6:
      return e === null && ci(r), null;
    case 13:
      return i0(e, r, t);
    case 4:
      return (
        ia(r, r.stateNode.containerInfo),
        (n = r.pendingProps),
        e === null ? (r.child = pt(r, null, n, t)) : fe(e, r, n, t),
        r.child
      );
    case 11:
      return (
        (n = r.type),
        (o = r.pendingProps),
        (o = r.elementType === n ? o : Le(n, o)),
        Ss(e, r, n, o, t)
      );
    case 7:
      return fe(e, r, r.pendingProps, t), r.child;
    case 8:
      return fe(e, r, r.pendingProps.children, t), r.child;
    case 12:
      return fe(e, r, r.pendingProps.children, t), r.child;
    case 10:
      e: {
        if (
          ((n = r.type._context),
          (o = r.pendingProps),
          (l = r.memoizedProps),
          (i = o.value),
          _(vo, n._currentValue),
          (n._currentValue = i),
          l !== null)
        )
          if (He(l.value, i)) {
            if (l.children === o.children && !ye.current) {
              r = nr(e, r, t);
              break e;
            }
          } else
            for (l = r.child, l !== null && (l.return = r); l !== null; ) {
              var a = l.dependencies;
              if (a !== null) {
                i = l.child;
                for (var s = a.firstContext; s !== null; ) {
                  if (s.context === n) {
                    if (l.tag === 1) {
                      (s = qe(-1, t & -t)), (s.tag = 2);
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
                    (l.lanes |= t),
                      (s = l.alternate),
                      s !== null && (s.lanes |= t),
                      di(l.return, t, r),
                      (a.lanes |= t);
                    break;
                  }
                  s = s.next;
                }
              } else if (l.tag === 10) i = l.type === r.type ? null : l.child;
              else if (l.tag === 18) {
                if (((i = l.return), i === null)) throw Error(A(341));
                (i.lanes |= t),
                  (a = i.alternate),
                  a !== null && (a.lanes |= t),
                  di(i, t, r),
                  (i = l.sibling);
              } else i = l.child;
              if (i !== null) i.return = l;
              else
                for (i = l; i !== null; ) {
                  if (i === r) {
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
        fe(e, r, o.children, t), (r = r.child);
      }
      return r;
    case 9:
      return (
        (o = r.type),
        (n = r.pendingProps.children),
        dt(r, t),
        (o = Me(o)),
        (n = n(o)),
        (r.flags |= 1),
        fe(e, r, n, t),
        r.child
      );
    case 14:
      return (
        (n = r.type),
        (o = Le(n, r.pendingProps)),
        (o = Le(n.type, o)),
        Ds(e, r, n, o, t)
      );
    case 15:
      return t0(e, r, r.type, r.pendingProps, t);
    case 17:
      return (
        (n = r.type),
        (o = r.pendingProps),
        (o = r.elementType === n ? o : Le(n, o)),
        eo(e, r),
        (r.tag = 1),
        ve(n) ? ((e = !0), po(r)) : (e = !1),
        dt(r, t),
        qc(r, n, o),
        mi(r, n, o, t),
        pi(null, r, n, !0, e, t)
      );
    case 19:
      return a0(e, r, t);
    case 22:
      return n0(e, r, t);
  }
  throw Error(A(156, r.tag));
};
function S0(e, r) {
  return Ju(e, r);
}
function gm(e, r, t, n) {
  (this.tag = e),
    (this.key = t),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = r),
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
function Te(e, r, t, n) {
  return new gm(e, r, t, n);
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
function Ar(e, r) {
  var t = e.alternate;
  return (
    t === null
      ? ((t = Te(e.tag, r, e.key, e.mode)),
        (t.elementType = e.elementType),
        (t.type = e.type),
        (t.stateNode = e.stateNode),
        (t.alternate = e),
        (e.alternate = t))
      : ((t.pendingProps = r),
        (t.type = e.type),
        (t.flags = 0),
        (t.subtreeFlags = 0),
        (t.deletions = null)),
    (t.flags = e.flags & 14680064),
    (t.childLanes = e.childLanes),
    (t.lanes = e.lanes),
    (t.child = e.child),
    (t.memoizedProps = e.memoizedProps),
    (t.memoizedState = e.memoizedState),
    (t.updateQueue = e.updateQueue),
    (r = e.dependencies),
    (t.dependencies =
      r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }),
    (t.sibling = e.sibling),
    (t.index = e.index),
    (t.ref = e.ref),
    t
  );
}
function no(e, r, t, n, o, l) {
  var i = 2;
  if (((n = e), typeof e == 'function')) Aa(e) && (i = 1);
  else if (typeof e == 'string') i = 5;
  else
    e: switch (e) {
      case Yr:
        return Rr(t.children, o, l, r);
      case _i:
        (i = 8), (o |= 8);
        break;
      case Rl:
        return (
          (e = Te(12, t, r, o | 2)), (e.elementType = Rl), (e.lanes = l), e
        );
      case jl:
        return (e = Te(13, t, r, o)), (e.elementType = jl), (e.lanes = l), e;
      case _l:
        return (e = Te(19, t, r, o)), (e.elementType = _l), (e.lanes = l), e;
      case Mu:
        return Wo(t, o, l, r);
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
            case sr:
              (i = 16), (n = null);
              break e;
          }
        throw Error(A(130, e == null ? e : typeof e, ''));
    }
  return (
    (r = Te(i, t, r, o)), (r.elementType = e), (r.type = n), (r.lanes = l), r
  );
}
function Rr(e, r, t, n) {
  return (e = Te(7, e, n, r)), (e.lanes = t), e;
}
function Wo(e, r, t, n) {
  return (
    (e = Te(22, e, n, r)),
    (e.elementType = Mu),
    (e.lanes = t),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Fl(e, r, t) {
  return (e = Te(6, e, null, r)), (e.lanes = t), e;
}
function El(e, r, t) {
  return (
    (r = Te(4, e.children !== null ? e.children : [], e.key, r)),
    (r.lanes = t),
    (r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    r
  );
}
function pm(e, r, t, n, o) {
  (this.tag = r),
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
function wa(e, r, t, n, o, l, i, a, s) {
  return (
    (e = new pm(e, r, t, a, s)),
    r === 1 ? ((r = 1), l === !0 && (r |= 8)) : (r = 0),
    (l = Te(3, null, null, r)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: n,
      isDehydrated: t,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    la(l),
    e
  );
}
function bm(e, r, t) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Gr,
    key: n == null ? null : '' + n,
    children: e,
    containerInfo: r,
    implementation: t,
  };
}
function D0(e) {
  if (!e) return Dr;
  e = e._reactInternals;
  e: {
    if (Wr(e) !== e || e.tag !== 1) throw Error(A(170));
    var r = e;
    do {
      switch (r.tag) {
        case 3:
          r = r.stateNode.context;
          break e;
        case 1:
          if (ve(r.type)) {
            r = r.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      r = r.return;
    } while (r !== null);
    throw Error(A(171));
  }
  if (e.tag === 1) {
    var t = e.type;
    if (ve(t)) return Dc(e, t, r);
  }
  return r;
}
function F0(e, r, t, n, o, l, i, a, s) {
  return (
    (e = wa(t, n, !0, e, o, l, i, a, s)),
    (e.context = D0(null)),
    (t = e.current),
    (n = me()),
    (o = xr(t)),
    (l = qe(n, o)),
    (l.callback = r ?? null),
    yr(t, l, o),
    (e.current.lanes = o),
    xn(e, o, n),
    xe(e, n),
    e
  );
}
function Ko(e, r, t, n) {
  var o = r.current,
    l = me(),
    i = xr(o);
  return (
    (t = D0(t)),
    r.context === null ? (r.context = t) : (r.pendingContext = t),
    (r = qe(l, i)),
    (r.payload = { element: e }),
    (n = n === void 0 ? null : n),
    n !== null && (r.callback = n),
    (e = yr(o, r, i)),
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
function Ls(e, r) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var t = e.retryLane;
    e.retryLane = t !== 0 && t < r ? t : r;
  }
}
function Sa(e, r) {
  Ls(e, r), (e = e.alternate) && Ls(e, r);
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
  var r = this._internalRoot;
  if (r === null) throw Error(A(409));
  Ko(e, r, null, null);
};
Vo.prototype.unmount = Da.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var r = e.containerInfo;
    Hr(function () {
      Ko(null, e, null, null);
    }),
      (r[rr] = null);
  }
};
function Vo(e) {
  this._internalRoot = e;
}
Vo.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var r = nc();
    e = { blockedOn: null, target: e, priority: r };
    for (var t = 0; t < cr.length && r !== 0 && r < cr[t].priority; t++);
    cr.splice(t, 0, e), t === 0 && lc(e);
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
function vm(e, r, t, n, o) {
  if (o) {
    if (typeof n == 'function') {
      var l = n;
      n = function () {
        var u = No(i);
        l.call(u);
      };
    }
    var i = F0(r, n, e, 0, null, !1, !1, '', Rs);
    return (
      (e._reactRootContainer = i),
      (e[rr] = i.current),
      an(e.nodeType === 8 ? e.parentNode : e),
      Hr(),
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
    (e[rr] = s.current),
    an(e.nodeType === 8 ? e.parentNode : e),
    Hr(function () {
      Ko(r, s, t, n);
    }),
    s
  );
}
function Yo(e, r, t, n, o) {
  var l = t._reactRootContainer;
  if (l) {
    var i = l;
    if (typeof o == 'function') {
      var a = o;
      o = function () {
        var s = No(i);
        a.call(s);
      };
    }
    Ko(r, i, e, o);
  } else i = vm(t, r, e, o, n);
  return No(i);
}
rc = function (e) {
  switch (e.tag) {
    case 3:
      var r = e.stateNode;
      if (r.current.memoizedState.isDehydrated) {
        var t = Lt(r.pendingLanes);
        t !== 0 &&
          ($i(r, t | 1), xe(r, Z()), !(L & 6) && ((vt = Z() + 500), Cr()));
      }
      break;
    case 13:
      Hr(function () {
        var n = tr(e, 1);
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
    var r = tr(e, 134217728);
    if (r !== null) {
      var t = me();
      Ue(r, e, 134217728, t);
    }
    Sa(e, 134217728);
  }
};
tc = function (e) {
  if (e.tag === 13) {
    var r = xr(e),
      t = tr(e, r);
    if (t !== null) {
      var n = me();
      Ue(t, e, r, n);
    }
    Sa(e, r);
  }
};
nc = function () {
  return R;
};
oc = function (e, r) {
  var t = R;
  try {
    return (R = e), r();
  } finally {
    R = t;
  }
};
Yl = function (e, r, t) {
  switch (r) {
    case 'input':
      if ((Hl(e, t), (r = t.name), t.type === 'radio' && r != null)) {
        for (t = e; t.parentNode; ) t = t.parentNode;
        for (
          t = t.querySelectorAll(
            'input[name=' + JSON.stringify('' + r) + '][type="radio"]'
          ),
            r = 0;
          r < t.length;
          r++
        ) {
          var n = t[r];
          if (n !== e && n.form === e.form) {
            var o = _o(n);
            if (!o) throw Error(A(90));
            Pu(n), Hl(n, o);
          }
        }
      }
      break;
    case 'textarea':
      Ru(e, t);
      break;
    case 'select':
      (r = t.value), r != null && at(e, !!t.multiple, r, !1);
  }
};
$u = ya;
Wu = Hr;
var xm = { usingClientEntryPoint: !1, Events: [wn, qr, _o, Hu, Qu, ya] },
  Bt = {
    findFiberByHostInstance: Mr,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  Am = {
    bundleType: Bt.bundleType,
    version: Bt.version,
    rendererPackageName: Bt.rendererPackageName,
    rendererConfig: Bt.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: lr.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Gu(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Bt.findFiberByHostInstance || ym,
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
Ce.createPortal = function (e, r) {
  var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Fa(r)) throw Error(A(200));
  return bm(e, r, null, t);
};
Ce.createRoot = function (e, r) {
  if (!Fa(e)) throw Error(A(299));
  var t = !1,
    n = '',
    o = E0;
  return (
    r != null &&
      (r.unstable_strictMode === !0 && (t = !0),
      r.identifierPrefix !== void 0 && (n = r.identifierPrefix),
      r.onRecoverableError !== void 0 && (o = r.onRecoverableError)),
    (r = wa(e, 1, !1, null, null, t, !1, n, o)),
    (e[rr] = r.current),
    an(e.nodeType === 8 ? e.parentNode : e),
    new Da(r)
  );
};
Ce.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var r = e._reactInternals;
  if (r === void 0)
    throw typeof e.render == 'function'
      ? Error(A(188))
      : ((e = Object.keys(e).join(',')), Error(A(268, e)));
  return (e = Gu(r)), (e = e === null ? null : e.stateNode), e;
};
Ce.flushSync = function (e) {
  return Hr(e);
};
Ce.hydrate = function (e, r, t) {
  if (!Go(r)) throw Error(A(200));
  return Yo(null, e, r, !0, t);
};
Ce.hydrateRoot = function (e, r, t) {
  if (!Fa(e)) throw Error(A(405));
  var n = (t != null && t.hydratedSources) || null,
    o = !1,
    l = '',
    i = E0;
  if (
    (t != null &&
      (t.unstable_strictMode === !0 && (o = !0),
      t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (r = F0(r, null, e, 1, t ?? null, o, !1, l, i)),
    (e[rr] = r.current),
    an(e),
    n)
  )
    for (e = 0; e < n.length; e++)
      (t = n[e]),
        (o = t._getVersion),
        (o = o(t._source)),
        r.mutableSourceEagerHydrationData == null
          ? (r.mutableSourceEagerHydrationData = [t, o])
          : r.mutableSourceEagerHydrationData.push(t, o);
  return new Vo(r);
};
Ce.render = function (e, r, t) {
  if (!Go(r)) throw Error(A(200));
  return Yo(null, e, r, !1, t);
};
Ce.unmountComponentAtNode = function (e) {
  if (!Go(e)) throw Error(A(40));
  return e._reactRootContainer
    ? (Hr(function () {
        Yo(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[rr] = null);
        });
      }),
      !0)
    : !1;
};
Ce.unstable_batchedUpdates = ya;
Ce.unstable_renderSubtreeIntoContainer = function (e, r, t, n) {
  if (!Go(t)) throw Error(A(200));
  if (e == null || e._reactInternals === void 0) throw Error(A(38));
  return Yo(e, r, t, !1, n);
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
    placeholder: r,
    value: t,
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
          placeholder: r,
          value: t,
          onChange: n,
        }),
      ],
    }),
  Io = ({
    setError: e = () => {},
    message: r = 'couldn’t be uploaded more than 5 files',
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
                c.jsxs('p', { className: 'font-bold', children: [' ', r] }),
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
  Dm = ({ label: e = 'label', color: r = '#gray', onClick: t = () => {} }) =>
    c.jsx('button', {
      style: { backgroundColor: r, borderColor: r },
      className: 'submit',
      onClick: t,
      children: e,
    }),
  _s = ({
    label: e = '',
    options: r = [],
    value: t = '',
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
          value: t,
          id: 'countries',
          class:
            'bg-gray-50 border border-gray-400 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1',
          children: r.map((l, i) =>
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
  Fm = ({ label: e = '', actionTitle: r, actionHint: t, onChange: n }) =>
    c.jsxs(c.Fragment, {
      children: [
        c.jsx('p', { className: 'mb-1 text-gray-700', children: 'Attachment' }),
        c.jsx('div', {
          class: 'flex items-center justify-center w-full',
          children: c.jsxs('label', {
            for: 'dropzone-file',
            class:
              'flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50',
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
                    children: r,
                  }),
                  c.jsx('p', { class: ' text-gray-500 ', children: t }),
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
  Em = ({ selectedData: e, setStep: r }) => {
    const [t, n] = I.useState([]),
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
      const D = t.reduce((T, $) => $.size + T, 0);
      f(D);
    }, [t]);
    const C = async () => {
        if (!s)
          if (t.length > 0) {
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
            for (let T of t) D.append('files', T);
            try {
              await fetch(
                `https://${v}/apps/Shipping-Protection/get-order-fulfilment-data?url=${v}`,
                { method: 'POST', body: D }
              ),
                r((T) => T + 1);
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
      if (T.length + t.length > 5 || P > d) {
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
            children: t.map((D, T) =>
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
              onClick: () => r((D) => D - 1),
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
  Cm = ({ setStep: e, setData: r }) => {
    const [t, n] = I.useState(!1),
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
              y.status === 404 ? (u(y.error), e(0)) : (u(''), e(1), r(y.data)),
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
                    disabled: t,
                    children: t
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
    const r = [e];
    function t(l) {
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
              children: r.map(
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
                              'inline-flex items-center justify-center bg-blue-200 text-black px-2 py-0.5 rounded-lg   font-normal',
                            children: t(i),
                          }),
                        }),
                        c.jsx('td', {
                          class: 'py-2 px-4',
                          children:
                            a === 'FULFILLED'
                              ? c.jsxs('span', {
                                  class:
                                    'inline-flex items-center bg-green-200 text-black px-2 py-0.5 rounded-lg   font-normal',
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
                                    'inline-flex items-center bg-orange-200 text-black px-2 py-0.5 rounded-lg   font-normal',
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
                                    'inline-flex items-center bg-red-300 text-black px-2 py-0.5 rounded-lg   font-normal',
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
        children: r.map(
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
                        'inline-flex items-center justify-center bg-blue-200 text-black px-2 py-0.5 rounded-lg   font-normal',
                      children: t(i),
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
                            'inline-flex items-center bg-green-200 text-black px-2 py-0.5 rounded-lg   font-normal',
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
                            'inline-flex items-center bg-orange-200 text-black px-2 py-0.5 rounded-lg   font-normal',
                          children: [
                            c.jsx('span', {
                              class: 'h-2 w-2 bg-orange-400 rounded-full mr-2',
                            }),
                            'Fulfilled',
                          ],
                        })
                      : c.jsxs('span', {
                          class:
                            'inline-flex items-center bg-red-300 text-black px-2 py-0.5 rounded-lg   font-normal',
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
  Im = ({ tone: e = 'init', logo: r = null, children: t }) => {
    let n = null;
    return (
      r &&
        (n = c.jsx('img', {
          src: r,
          alt: '',
          width: '15px',
          className: 'me-1',
        })),
      c.jsx(c.Fragment, {
        children:
          e === 'success'
            ? c.jsxs('span', {
                class:
                  'inline-flex items-center bg-green-300 text-black px-2 py-0.5 rounded-lg   font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-green-500 rounded-full mr-2',
                  }),
                  t,
                ],
              })
            : e === 'info'
            ? c.jsxs('span', {
                class:
                  'inline-flex items-center bg-blue-300 text-black px-2 py-0.5 rounded-lg   font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-blue-500 rounded-full mr-2',
                  }),
                  t,
                ],
              })
            : e === 'warning'
            ? c.jsxs('span', {
                class:
                  'inline-flex items-center bg-orange-300 text-black px-2 py-0.5 rounded-lg   font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-orange-500 rounded-full mr-2',
                  }),
                  t,
                ],
              })
            : e === 'error'
            ? c.jsxs('span', {
                class:
                  'inline-flex items-center bg-red-300 text-black px-2 py-0.5 rounded-lg   font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-red-500 rounded-full mr-2',
                  }),
                  t,
                ],
              })
            : c.jsxs('span', {
                class:
                  'inline-flex items-center bg-gray-300 text-black px-2 py-0.5 rounded-lg   font-normal',
                children: [
                  n,
                  c.jsx('span', {
                    class: 'h-2 w-2 bg-gray-500 rounded-full mr-2',
                  }),
                  t,
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
  constructor(r, t = {}) {
    (this.translationGetters = new Map()),
      (this.fallbacks = new Map()),
      (this.translations = new Map()),
      (this.asyncTranslationIds = new Set()),
      (this.subscriptions = new Map()),
      (this.translationPromises = new Map()),
      (this.idsToUpdate = new Set()),
      (this.details = r);
    for (const [n, o] of Object.entries(t))
      this.translations.set(n, o), this.asyncTranslationIds.add(n);
  }
  async resolve() {
    await Promise.all([...this.translationPromises.values()]);
  }
  extract() {
    return [...this.asyncTranslationIds].reduce(
      (r, t) => ({ ...r, [t]: this.translations.get(t) }),
      {}
    );
  }
  register({ id: r, translations: t, fallback: n }) {
    if (
      (this.fallbacks.has(r) || this.fallbacks.set(r, n),
      this.details.fallbackLocale != null && n != null)
    ) {
      const l = Cl(r, this.details.fallbackLocale);
      this.translations.has(l) || this.translations.set(l, n);
    }
    if (this.translationGetters.has(r)) return;
    const o = t ? Pm(t) : zm;
    this.setTranslations(r, o);
  }
  state(r) {
    const { locale: t, fallbackLocale: n } = this.details,
      o = Os(t),
      l = n != null && o.includes(n);
    let i = !1,
      a = !1;
    const s = r.reduce((u, m) => {
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
  subscribe(r, t) {
    return (
      this.subscriptions.set(t, r),
      () => {
        this.subscriptions.delete(t);
      }
    );
  }
  update(r) {
    this.details = r;
    for (const [t, n] of this.translationGetters) this.setTranslations(t, n);
    for (const [t, n] of this.subscriptions) t(this.state(n), this.details);
  }
  setTranslations(r, t) {
    this.translationGetters.set(r, t);
    for (const n of Os(this.details.locale)) {
      const o = Cl(r, n);
      if (this.translations.has(o)) continue;
      const l = t(n);
      if (Mm(l)) {
        const i = l
          .then((a) => {
            this.translationPromises.delete(o),
              this.translations.set(o, a),
              this.asyncTranslationIds.add(o),
              a != null && this.updateSubscribersForId(r);
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
  updateSubscribersForId(r) {
    if ((this.idsToUpdate.add(r), this.enqueuedUpdate != null)) return;
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
  const r = e.split('-');
  return r.length > 1 ? [`${r[0]}-${r[1].toUpperCase()}`, r[0]] : [e];
}
function Mm(e) {
  return e != null && e.then != null;
}
function Cl(e, r) {
  return `${e}__${r}`;
}
function zm() {}
function Pm(e) {
  return typeof e == 'function' ? e : (r) => e[r];
}
const Lm = 50;
function Ge(e, r) {
  const t = new WeakMap(),
    n = new Map(),
    o = [];
  return function (...i) {
    if (typeof window > 'u') return e.apply(this, i);
    const a = i.length === 1 && typeof i[0] == 'object' && !r;
    let s;
    a ? (s = i[0]) : r && r instanceof Function ? (s = r(...i)) : (s = i[0]);
    const u = a ? t : n;
    if (u.has(s)) return u.get(s);
    const m = e.apply(this, i);
    if (a) t.set(s, m);
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
function Us(e, r) {
  const t = Rm(e, r);
  if (kl.has(t)) return kl.get(t);
  const n = new Intl.DateTimeFormat(e, r);
  return kl.set(t, n), n;
}
const Hs = Intl.DateTimeFormat('en', { hour: 'numeric' }),
  Qs = typeof Hs.resolvedOptions > 'u' ? void 0 : Hs.resolvedOptions();
function ir(e, r, t = {}) {
  if (
    (Qs != null &&
      t.hour12 === !1 &&
      Qs.hourCycle != null &&
      ((t.hour12 = void 0), (t.hourCycle = 'h23')),
    t.timeZone != null && t.timeZone === 'Etc/GMT+12')
  ) {
    const o = new Date(e.valueOf() - 432e5);
    return Us(r, { ...t, timeZone: 'UTC' }).format(o);
  }
  return Us(r, t).format(e);
}
function Rm(e, r = {}) {
  return `${Array.isArray(e) ? e.sort().join('-') : e}-${JSON.stringify(r)}`;
}
const Nl = /(\d{2})/;
function xt(e, r) {
  return {
    year: () => ne.getYear(e, r),
    month: () => ne.getMonth(e, r),
    day: () => ne.getDay(e, r),
    weekday: () => ne.getWeekday(e, r),
    hour: () => ne.getHour(e, r),
    minute: () => ne.getMinute(e, r),
    second: () => ne.getSecond(e, r),
  };
}
function kr(e) {
  return (r, t) => `${e}-${r.toString()}-${t}`;
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
  return Object.keys(N0).some((r) => r === e);
}
function _m(e) {
  throw new Error(e);
}
function Om(e) {
  return jm(e) ? N0[e] : _m(`Unexpected weekday: ${e}`);
}
class ne {}
ne.getYear = Ge((e, r) => {
  if (isNaN(e.valueOf()))
    throw new Error(`Unable to parse date: ${e} for timezone: ${r}`);
  const t = ir(e, 'en', { timeZone: r, year: 'numeric' }),
    n = Jo(t),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse year: '${t}'`);
  return o;
}, kr('year'));
ne.getMonth = Ge((e, r) => {
  const t = ir(e, 'en', { timeZone: r, month: 'numeric' }),
    n = Jo(t),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse month: '${t}'`);
  return o;
}, kr('month'));
ne.getDay = Ge((e, r) => {
  const t = ir(e, 'en', { timeZone: r, day: 'numeric' }),
    n = Jo(t),
    o = parseInt(n, 10);
  if (isNaN(o)) throw new Error(`Unable to parse day: '${t}'`);
  return o;
}, kr('day'));
ne.getWeekday = Ge((e, r) => {
  const t = ir(e, 'en', { timeZone: r, weekday: 'long' }),
    n = Jo(t);
  return Om(n);
}, kr('weekday'));
ne.getHour = Ge((e, r) => {
  const t = ir(e, 'en', { timeZone: r, hour12: !1, hour: 'numeric' });
  let n = parseInt(t, 10);
  return isNaN(n) && (n = ne.getTimePartsFallback(e, r).hour), n;
}, kr('hour'));
ne.getMinute = Ge((e, r) => {
  const t = ir(e, 'en', { timeZone: r, minute: 'numeric' });
  let n = parseInt(t, 10);
  return isNaN(n) && (n = ne.getTimePartsFallback(e, r).minute), n;
}, kr('minute'));
ne.getSecond = Ge((e, r) => {
  const t = ir(e, 'en', { timeZone: r, second: 'numeric' });
  let n = parseInt(t, 10);
  return isNaN(n) && (n = ne.getTimePartsFallback(e, r).second), n;
}, kr('second'));
ne.getTimePartsFallback = Ge((e, r) => {
  const t = ir(e, 'en', {
      timeZone: r,
      hour12: !1,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    [n, o, l] = t.split(':'),
    i = new RegExp(Nl).exec(n),
    a = new RegExp(Nl).exec(o),
    s = new RegExp(Nl).exec(l);
  if (i != null && a != null && s != null) {
    const u = parseInt(i[1], 10),
      m = parseInt(a[1], 10),
      p = parseInt(s[1], 10);
    return { hour: u, minute: m, second: p };
  }
  throw new Error(`Unable to parse timeString: '${t}'`);
}, kr('timePartsFallback'));
let or;
(function (e) {
  (e[(e.Second = 1e3)] = 'Second'),
    (e[(e.Minute = 6e4)] = 'Minute'),
    (e[(e.Hour = 36e5)] = 'Hour'),
    (e[(e.Day = 864e5)] = 'Day'),
    (e[(e.Week = 6048e5)] = 'Week'),
    (e[(e.Year = 31536e6)] = 'Year');
})(or || (or = {}));
function Kr(e, r = new Date()) {
  return r < e;
}
function Um(e, r = new Date()) {
  return !Kr(e, r) && r.getTime() - e.getTime() < or.Hour;
}
function Hm(e, r = new Date()) {
  return !Kr(e, r) && r.getTime() - e.getTime() < or.Minute;
}
function Qm(e, r = new Date()) {
  return !Kr(e, r) && r.getTime() - e.getTime() < or.Week;
}
function $m(e, r = new Date()) {
  return Kr(e, r) && e.getTime() - r.getTime() < or.Week;
}
function Wm(e, r = new Date()) {
  return !Kr(e, r) && r.getTime() - e.getTime() < or.Year;
}
function Km(e, r = new Date()) {
  return Kr(e, r) && e.getTime() - r.getTime() < or.Year;
}
function Vm(e, r, t) {
  const { year: n } = xt(e, t),
    { year: o } = xt(r, t);
  return n() === o();
}
function Gm(e, r, t) {
  const { month: n } = xt(e, t),
    { month: o } = xt(r, t);
  return Vm(e, r, t) && n() === o();
}
function Ea(e, r, t) {
  const { day: n } = xt(e, t),
    { day: o } = xt(r, t);
  return Gm(e, r, t) && n() === o();
}
function Ws(e, r) {
  return Ea(e, new Date(), r);
}
function Ym(e, r) {
  const t = new Date(),
    n = new Date(t.valueOf() - 24 * 60 * 60 * 1e3);
  return Ea(e, n, r);
}
function Jm(e, r) {
  const t = new Date(),
    n = new Date(t.valueOf() + 24 * 60 * 60 * 1e3);
  return Ea(e, n, r);
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
  ['ja', (e, r, t) => (t ? `${r}${e}` : `${r}様`)],
  ['zh', Ks],
]);
function Ks(e, r, t) {
  return t ? `${r}${e}` : r;
}
function T0(e) {
  return e.split('-')[0].toLowerCase();
}
function B0({ name: e, locale: r, options: t }) {
  if (!e.givenName) return e.familyName || '';
  if (!e.familyName) return e.givenName;
  const n = !!(t && t.full),
    o = I0.get(T0(r));
  return o
    ? o(e.givenName, e.familyName, n)
    : n
    ? `${e.givenName} ${e.familyName}`
    : e.givenName;
}
const Zm = [J.Latin, J.Han, J.Hiragana, J.Katakana, J.Hangul, J.Thai];
function M0(e) {
  return Zm.filter((r) => new RegExp(`${r}`).test(e));
}
function Vt({ text: e, locale: r }) {
  if (!e || !Intl.Segmenter) return;
  const t = new Intl.Segmenter(r, { granularity: 'grapheme' });
  return Array.from(t.segment(e)).map((n) => n.segment);
}
function Xm({ name: e, locale: r, options: t }) {
  var n;
  return (n = qm({
    givenName: e.givenName,
    familyName: e.familyName,
    idealMaxLength: t == null ? void 0 : t.idealMaxLength,
  })) !== null && n !== void 0
    ? n
    : B0({ name: e, locale: r });
}
function qm({ givenName: e, familyName: r, idealMaxLength: t = 3 }) {
  if (!e && !r) return;
  const n = e == null ? void 0 : e.trim(),
    o = r == null ? void 0 : r.trim(),
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
        if (n.length > t) {
          var s;
          return (s = Vt({ text: n, locale: 'ko' })) === null || s === void 0
            ? void 0
            : s[0];
        } else return n;
      else return o;
    case J.Thai:
      if (n) {
        var u;
        return (u = Vt({ text: n, locale: 'th' })) === null || u === void 0
          ? void 0
          : u[0];
      } else {
        var m;
        return (m = Vt({ text: o, locale: 'th' })) === null || m === void 0
          ? void 0
          : m[0];
      }
    default:
      return;
  }
}
function eg({ name: e, idealMaxLength: r }) {
  var t;
  return (t = rg({ name: e, idealMaxLength: r })) !== null && t !== void 0
    ? t
    : e;
}
function rg({ name: e, idealMaxLength: r = 3 }) {
  const t = e.trim(),
    n = M0(t);
  if (n.length !== 1) return;
  const o = n[0],
    l = t.split(' ');
  switch (o) {
    case J.Latin:
      return l.length === 1
        ? l[0].slice(0, r)
        : l.length <= r
        ? l.map((s) => s[0]).join('')
        : l.slice(0)[0][0] + l.slice(-1)[0][0];
    case J.Han:
    case J.Katakana:
    case J.Hiragana:
      return t.includes(' ') ? void 0 : t;
    case J.Hangul: {
      var i;
      const s = t.split(' ')[0];
      return (i = Vt({ text: s, locale: 'ko' })) === null || i === void 0
        ? void 0
        : i.slice(0, r).join('');
    }
    case J.Thai: {
      if (t.includes(' ')) return;
      var a;
      return (a = Vt({ text: t, locale: 'th' })) === null || a === void 0
        ? void 0
        : a[0];
    }
    default:
      return;
  }
}
function tg(e) {
  return !!I0.get(T0(e));
}
function Vs(e) {
  const r = e.split('-')[1];
  return r && r.toUpperCase();
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
    delimiter: r,
    startDelimiter: t = r,
    endDelimiter: n = r,
    prepend: o,
    append: l,
    toLocale: i,
  } = {}
) {
  const a = ig(e, { startDelimiter: t, endDelimiter: n }),
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
function ig(e, { startDelimiter: r, endDelimiter: t }) {
  const n = r && t ? ag(r, t) : void 0;
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
function ag(e, r) {
  if (e.length === 1 && r.length === 1)
    return new RegExp(`\\${e}[^\\${r}]*\\${r}`, 'g');
  const t = [...e].map((o) => `\\${o}`).join(''),
    n = [...r].map((o) => `\\${o}`).join('');
  return new RegExp(`${t}.*?${n}`, 'g');
}
let it;
(function (e) {
  (e[(e.Rtl = 0)] = 'Rtl'), (e[(e.Ltr = 1)] = 'Ltr');
})(it || (it = {}));
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
  constructor(r, t) {
    super(`Missing translation for key: ${r} in locale: ${t}`);
  }
}
class dg extends Error {
  constructor(r, t = {}) {
    let n = '';
    const o = Object.keys(t);
    o.length < 1
      ? (n = `No replacement found for key '${r}' (and no replacements were passed in).`)
      : (n = `No replacement found for key '${r}'. The following replacements were passed: ${o
          .map((l) => `'${l}'`)
          .join(', ')}`),
      super(n);
  }
}
class Xs extends Error {
  constructor(r = '') {
    const t = 'No currency code provided.';
    super(r === '' ? t : `${t} ${r}`);
  }
}
class fg extends Error {
  constructor(r = '') {
    const t = 'No country code provided.';
    super(r === '' ? t : `${t} ${r}`);
  }
}
const mg = /{\s*(\w+)\s*}/g,
  Ni = Symbol('Missing translation'),
  Gt = 'count',
  Yt = 'ordinal',
  To = '.',
  qs = '-u-nu-',
  eu = 'latn',
  wr = (e) => typeof e == 'string',
  Il = new Map();
function Qr(e, r) {
  const t = gg(e),
    n = pg(t, r);
  if (Il.has(n)) return Il.get(n);
  const o = new Intl.NumberFormat(t, r);
  return Il.set(n, o), o;
}
function gg(e) {
  return Array.isArray(e) ? e.map((r) => ru(r)) : ru(e);
}
function ru(e) {
  if (!e) return e;
  try {
    return new Intl.Locale(e, { numberingSystem: eu }).toString();
  } catch {
    const r = new RegExp(`(?:-x|${qs}).*`, 'g'),
      t = `${qs}${eu}`;
    return e.replace(r, '').concat(t);
  }
}
const hg = {
  startDelimiter: '{',
  endDelimiter: '}',
  prepend: '[!!',
  append: '!!]',
};
function pg(e, r = {}) {
  return `${Array.isArray(e) ? e.sort().join('-') : e}-${JSON.stringify(r)}`;
}
function bg(e, r = {}) {
  return new Intl.PluralRules(e, r);
}
const pn = Ge(bg, (e, r = {}) => `${e}${JSON.stringify(r)}`);
function Tl(e, r, t, n) {
  const o = Array.isArray(r) ? r : [r];
  let l;
  for (const i of o) {
    l = i;
    for (const a of e.split(To)) if (((l = l[a]), !l)) break;
    if (l) return n ? (wr(l) ? Jt(l, n) : j0(l, t, n)) : l;
  }
  throw new R0(e, t);
}
function yg(e, r, t, n) {
  const { scope: o, replacements: l, pseudotranslate: i, interpolate: a } = r,
    s = Array.isArray(t) ? t : [t],
    u = xg(e, o);
  for (const m of s) {
    const p = vg(u, m, n, l, { pseudotranslate: i, interpolate: a });
    if (p !== Ni) return p;
  }
  throw new R0(u, n);
}
function vg(e, r, t, n, { pseudotranslate: o = !1, interpolate: l } = {}) {
  let i = r;
  for (const u of e.split(To)) {
    if (i == null || typeof i != 'object') return Ni;
    i = i[u];
  }
  const a = {};
  if (
    typeof i == 'object' &&
    n != null &&
    Object.prototype.hasOwnProperty.call(n, Gt)
  ) {
    const u = n[Gt];
    if (typeof u == 'number') {
      if (u === 0 && i[0] !== void 0) i = i[0];
      else if (u === 1 && i[1] !== void 0) i = i[1];
      else {
        const m = pn(t).select(u);
        i = i[m] || i.other;
      }
      a[Gt] = Qr(t).format(u);
    }
  } else if (
    typeof i == 'object' &&
    n != null &&
    Object.prototype.hasOwnProperty.call(n, Yt)
  ) {
    const u = n[Yt];
    if (typeof u == 'number') {
      const m = pn(t, { type: 'ordinal' }).select(u);
      (i = i.ordinal[m] || i.ordinal.other), (a[Yt] = Qr(t).format(u));
    }
  }
  const s =
    wr(i) && o
      ? og(i, { ...hg, toLocale: typeof o == 'boolean' ? void 0 : o })
      : i;
  return wr(s) ? Jt(s, { ...n, ...a }, { interpolate: l }) : Ni;
}
function Jt(e, r = {}, { interpolate: t } = {}) {
  const n = [],
    o = new RegExp(t || mg, 'g');
  let l = 0,
    i = 0;
  e.replace(o, (s, u, m) => {
    if (!u)
      throw new Error(
        'Invalid replacement key. The interpolatation format RegExp is possibly too permissive.'
      );
    if (!Object.prototype.hasOwnProperty.call(r, u)) throw new dg(u, r);
    l += 1;
    const p = e.substring(i, m);
    p && n.push(p), (i = m + s.length);
    const h = r[u];
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
  return a && n.push(a), n.every(wr) ? n.join('') : n;
}
function xg(e, r) {
  return r == null ? e : `${wr(r) ? r : r.join(To)}${To}${e}`;
}
function j0(e, r, t) {
  if (Object.prototype.hasOwnProperty.call(t, Gt)) {
    const n = t[Gt];
    if (typeof n == 'number') {
      const o = pn(r).select(n);
      if (wr(e[o]))
        return Jt(e[o], {
          ...t,
          CARDINAL_PLURALIZATION_KEY_NAME: Qr(r).format(n),
        });
    }
  } else if (Object.prototype.hasOwnProperty.call(t, Yt)) {
    const n = t[Yt];
    if (typeof n == 'number') {
      const o = pn(r, { type: 'ordinal' }).select(n);
      if (wr(e[o]))
        return Jt(e[o], {
          ...t,
          ORDINAL_PLURALIZATION_KEY_NAME: Qr(r).format(n),
        });
    }
  }
  return Object.keys(e).reduce(
    (n, o) => ({ ...n, [o]: wr(e[o]) ? Jt(e[o], t) : j0(e[o], r, t) }),
    {}
  );
}
const Bl = 2,
  tu = new Map([
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
  return Ag.filter((r) => new RegExp(`${r}`).test(e));
}
function nu(e, r) {
  const t = Sg(0, e, r),
    n = new RegExp(`${Se.DirectionControl}*`, 'gu'),
    o = t.replace(n, ''),
    l = new RegExp('\\p{Nd}\\p{Po}*\\p{Nd}*', 'gu').exec(o);
  if (!l)
    throw new Error(`Number input in locale ${e} is currently not supported.`);
  const i = l[0],
    [a, s] = o.split(i);
  return { symbol: a || s, prefixed: a !== '' };
}
function Sg(e, r, t) {
  return Qr(r, { style: 'currency', ...t }).format(e);
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
    return cg.includes(this.language) ? it.Rtl : it.Ltr;
  }
  get isRtlLanguage() {
    return this.languageDirection === it.Rtl;
  }
  get isLtrLanguage() {
    return this.languageDirection === it.Ltr;
  }
  constructor(
    r,
    {
      locale: t,
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
      (this.translations = r),
      (this.locale = t),
      (this.defaultCountry = l),
      (this.defaultCurrency = n),
      (this.defaultTimezone = o),
      (this.pseudolocalize = i),
      (this.defaultInterpolate = u),
      (this.onError = a || this.defaultOnError),
      (this.loading = s || !1);
  }
  translate(r, t, n) {
    const { pseudolocalize: o, defaultInterpolate: l } = this;
    let i;
    const a = { pseudotranslate: o, interpolate: l };
    t == null
      ? (i = a)
      : this.isTranslateOptions(t)
      ? (i = { ...a, ...t, replacements: n })
      : (i = { ...a, replacements: t });
    try {
      return yg(r, i, this.translations, this.locale);
    } catch (s) {
      return this.onError(s), '';
    }
  }
  getTranslationTree(r, t) {
    try {
      return t
        ? Tl(r, this.translations, this.locale, t)
        : Tl(r, this.translations, this.locale);
    } catch (n) {
      return this.onError(n), '';
    }
  }
  translationKeyExists(r, t = !1) {
    try {
      const n = Tl(r, this.translations, this.locale);
      return t ? typeof n == 'string' : !0;
    } catch {
      return !1;
    }
  }
  formatNumber(r, { as: t, precision: n, ...o } = {}) {
    const { locale: l, defaultCurrency: i } = this;
    return t === 'currency' && i == null && o.currency == null
      ? (this.onError(
          new Xs(
            "formatNumber(amount, {as: 'currency'}) cannot be called without a currency code."
          )
        ),
        '')
      : Qr(l, { style: t, maximumFractionDigits: n, currency: i, ...o }).format(
          r
        );
  }
  unformatNumber(r) {
    const { decimalSymbol: t } = this.numberSymbols(),
      n = this.normalizedNumber(r, t);
    return n === '' ? '' : parseFloat(n).toString();
  }
  formatCurrency(r, { form: t, ...n } = {}) {
    switch (t) {
      case 'auto':
        return this.formatCurrencyAuto(r, n);
      case 'explicit':
        return this.formatCurrencyExplicit(r, n);
      case 'short':
        return this.formatCurrencyShort(r, n);
      case 'none':
        return this.formatCurrencyNone(r, n);
      default:
        return this.formatCurrencyAuto(r, n);
    }
  }
  unformatCurrency(r, t) {
    const { decimalSymbol: n } = this.numberSymbols(),
      o = tu.get(t.toUpperCase()),
      l = this.normalizedNumber(r, n, o);
    return l === ''
      ? ''
      : o === 0
      ? `${parseFloat(l).toFixed(0)}.${'0'.repeat(Bl)}`
      : parseFloat(l).toFixed(o);
  }
  formatPercentage(r, t = {}) {
    return this.formatNumber(r, { as: 'percent', ...t });
  }
  formatDate(r, t = {}) {
    const { locale: n, defaultTimezone: o } = this,
      { timeZone: l = o } = t,
      { style: i = void 0, ...a } = t || {};
    if (i)
      switch (i) {
        case _e.Humanize:
          return this.humanizeDate(r, { ...a, timeZone: l });
        case _e.DateTime:
          return this.formatDateTime(r, { ...a, timeZone: l, ...Js[i] });
        default:
          return this.formatDate(r, { ...a, ...Js[i] });
      }
    return ir(r, n, { ...a, timeZone: l });
  }
  ordinal(r) {
    const { locale: t } = this,
      n = pn(t, { type: 'ordinal' }).select(r);
    return this.translate(n, { scope: 'ordinal' }, { amount: r });
  }
  weekStartDay(r) {
    const t = r || this.defaultCountry;
    if (!t)
      throw new fg('weekStartDay() cannot be called without a country code.');
    return ug.get(t) || sg;
  }
  getCurrencySymbolLocalized(r, t) {
    return this.getShortCurrencySymbol(t, r);
  }
  formatName(r, t, n) {
    return B0({
      name: { givenName: r, familyName: t },
      locale: this.locale,
      options: n,
    });
  }
  abbreviateName({ firstName: r, lastName: t, idealMaxLength: n = 3 }) {
    return Xm({
      name: { givenName: r, familyName: t },
      locale: this.locale,
      options: { idealMaxLength: n },
    });
  }
  abbreviateBusinessName({ name: r, idealMaxLength: t = 3 }) {
    return eg({ name: r, idealMaxLength: t });
  }
  identifyScript(r) {
    return wg(r);
  }
  hasEasternNameOrderFormatter() {
    return tg(this.locale);
  }
  formatCurrencyAuto(r, t = {}) {
    return t.currency == null ||
      this.defaultCurrency == null ||
      t.currency === this.defaultCurrency
      ? this.formatCurrencyShort(r, t)
      : this.formatCurrencyExplicit(r, t);
  }
  formatCurrencyExplicit(r, t = {}) {
    const n = this.formatCurrencyShort(r, t),
      o = t.currency || this.defaultCurrency || '';
    return n.includes(o) ? n : `${n} ${o}`;
  }
  formatCurrencyShort(r, t = {}) {
    var n;
    const o = this.formatCurrencyNone(r, t),
      i =
        ((n = new RegExp(`${Se.DirectionControl}*${Se.Negative}`, 'g').exec(
          o
        )) === null || n === void 0
          ? void 0
          : n.shift()) || '',
      a = this.getShortCurrencySymbol(t.currency),
      s = a.prefixed ? `${a.symbol}${o}` : `${o}${a.symbol}`;
    return `${i}${s.replace(i, '')}`;
  }
  formatCurrencyNone(r, t = {}) {
    const { locale: n } = this;
    let o = t.precision;
    if (o === void 0) {
      const l = t.currency || this.defaultCurrency || '';
      o = tu.get(l.toUpperCase());
    }
    return Qr(n, {
      style: 'decimal',
      minimumFractionDigits: o,
      maximumFractionDigits: o,
      ...t,
    }).format(r);
  }
  getShortCurrencySymbol(r = this.defaultCurrency || '', t = this.locale) {
    const n = r.substring(0, 2);
    let o;
    try {
      o = nu(t, { currency: r, currencyDisplay: 'narrowSymbol' });
    } catch {
      o = nu(t, { currency: r });
    }
    if (r in Zs) return { symbol: Zs[r], prefixed: o.prefixed };
    const l = o.symbol.replace(n, '');
    return /[A-Za-zÀ-ÖØ-öø-ÿĀ-ɏḂ-ỳ]/.exec(l)
      ? o
      : { symbol: l, prefixed: o.prefixed };
  }
  humanizeDate(r, t) {
    return Kr(r) ? this.humanizeFutureDate(r, t) : this.humanizePastDate(r, t);
  }
  formatDateTime(r, t) {
    const { defaultTimezone: n } = this,
      { timeZone: o = n } = t;
    return this.translate('date.humanize.lessThanOneYearAway', {
      date: this.getDateFromDate(r, { ...t, timeZone: o }),
      time: this.getTimeFromDate(r, { ...t, timeZone: o }),
    });
  }
  humanizePastDate(r, t) {
    if (Hm(r)) return this.translate('date.humanize.lessThanOneMinuteAgo');
    if (Um(r)) {
      const i = Math.floor((new Date().getTime() - r.getTime()) / or.Minute);
      return this.translate('date.humanize.lessThanOneHourAgo', { count: i });
    }
    const n = t == null ? void 0 : t.timeZone,
      o = this.getTimeFromDate(r, t);
    if (Ws(r, n)) return o;
    if (Ym(r, n)) return this.translate('date.humanize.yesterday', { time: o });
    if (Qm(r)) {
      const l = this.getWeekdayFromDate(r, t);
      return this.translate('date.humanize.lessThanOneWeekAgo', {
        weekday: l,
        time: o,
      });
    }
    if (Wm(r)) {
      const l = this.getMonthDayFromDate(r, t);
      return this.translate('date.humanize.lessThanOneYearAgo', {
        date: l,
        time: o,
      });
    }
    return this.formatDate(r, { ...t, style: _e.Short });
  }
  humanizeFutureDate(r, t) {
    const n = t == null ? void 0 : t.timeZone,
      o = this.getTimeFromDate(r, t);
    if (Ws(r, n)) return this.translate('date.humanize.today', { time: o });
    if (Jm(r, n)) return this.translate('date.humanize.tomorrow', { time: o });
    if ($m(r)) {
      const l = this.getWeekdayFromDate(r, t);
      return this.translate('date.humanize.lessThanOneWeekAway', {
        weekday: l,
        time: o,
      });
    }
    if (Km(r)) {
      const l = this.getMonthDayFromDate(r, t);
      return this.translate('date.humanize.lessThanOneYearAway', {
        date: l,
        time: o,
      });
    }
    return this.formatDate(r, { ...t, style: _e.Short });
  }
  getTimeZone(r, t) {
    const { localeMatcher: n, formatMatcher: o, timeZone: l } = t || {},
      i = this.formatDate(r, {
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
  getDateFromDate(r, t) {
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
    } = t || {};
    return this.formatDate(r, {
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
  getTimeFromDate(r, t) {
    const {
        localeMatcher: n,
        formatMatcher: o,
        hour12: l,
        timeZone: i,
        timeZoneName: a,
      } = t || {},
      s = this.formatDate(r, {
        localeMatcher: n,
        formatMatcher: o,
        hour12: l,
        timeZone: i,
        timeZoneName: a === 'short' ? void 0 : a,
        hour: 'numeric',
        minute: '2-digit',
      }).toLocaleLowerCase(),
      u = a === 'short' ? `${s} ${this.getTimeZone(r, t)}` : s;
    return Dg(u);
  }
  getWeekdayFromDate(r, t) {
    const {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: i,
    } = t || {};
    return this.formatDate(r, {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: i,
      weekday: 'long',
    });
  }
  getMonthDayFromDate(r, t) {
    const {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: i,
    } = t || {};
    return this.formatDate(r, {
      localeMatcher: n,
      formatMatcher: o,
      hour12: l,
      timeZone: i,
      month: 'short',
      day: 'numeric',
    });
  }
  normalizedNumber(r, t, n = Bl) {
    const o = Math.max(n, Bl),
      l = r.lastIndexOf(Ml);
    let i = r.lastIndexOf(t);
    t !== Ml &&
      (r.match(Cg) || []).length === 1 &&
      this.decimalValue(r, l).length <= o &&
      (i = l);
    const a = this.integerValue(r, i),
      s = this.decimalValue(r, i),
      u = new RegExp(`^(${Se.DirectionControl}|\\s)*${Se.Negative}`, 'u'),
      h = `${r.match(u) ? Fg : ''}${a}${i === -1 ? '' : Ml}${s}`;
    return h.match(Eg) ? h : '';
  }
  integerValue(r, t) {
    return r.substring(0, t).replace(ou, '');
  }
  decimalValue(r, t) {
    return r.substring(t + 1).replace(ou, '');
  }
  isTranslateOptions(r) {
    return 'scope' in r;
  }
  defaultOnError(r) {
    throw r;
  }
};
function Ng(e) {
  const r = j.useContext(k0);
  if (r == null)
    throw new Error(
      'Missing i18n manager. Make sure to use an <I18nContext.Provider /> somewhere in your React tree.'
    );
  const t = j.useRef(e);
  if (lu(t.current) !== lu(e))
    throw new Error(
      'You switched between providing registration options and not providing them, which is not supported.'
    );
  return Ig(r);
}
function Ig(e) {
  return [j.useContext(Tm) || new kg([], e.details), Tg];
}
function Tg({ children: e }) {
  return j.createElement(j.Fragment, null, e);
}
function lu({ fallback: e, translations: r } = {}) {
  return e != null || r != null;
}
const Bg = ({ data: e, setSelectedData: r, alreadyClaimed: t }) => {
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
        r(e.filter((a) => o.includes(a.id)));
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
                  t &&
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
                      onClick: () => t && i('single', a),
                      children: [
                        t &&
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
  Mg = ({ setSelectedData: e, selectedData: r, setStep: t, item: n }) => {
    var p, h, y;
    const [o, l] = I.useState('');
    console.log(n);
    const i = () => {
        if (!r.length) {
          l('Please select at least one item to generate claim request.');
          return;
        }
        l(''), t((x) => x + 1);
      },
      a = n.fulfillmentLineItems.map((x, w) => ({ ...x, id: w + 1 })),
      s =
        (p = n == null ? void 0 : n.fulfillmentLineItems[0]) == null
          ? void 0
          : p.claimStatus,
      u =
        r.length > 0
          ? `${r.length === 1 ? `- ${r.length} Item` : ` - ${r.length} items`}`
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
                          'inline-flex items-center bg-green-300 text-black px-2 py-0.5 rounded-lg   font-normal',
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
                        className: '  text-gray-600',
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
  zg = ({ setSelectedData: e, selectedData: r, setStep: t, data: n }) =>
    c.jsxs('div', {
      children: [
        c.jsxs('div', {
          style: { display: 'flex', alignItems: 'center' },
          children: [
            c.jsx('button', {
              className: 'claim-button',
              type: 'button',
              style: { padding: '6px' },
              onClick: () => t((o) => o - 1),
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
            { setStep: t, setSelectedData: e, selectedData: r, item: o },
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
    const [e, r] = I.useState(!1),
      [t, n] = I.useState(0),
      [o, l] = I.useState([]),
      [i, a] = I.useState([]),
      [s, u] = I.useState(25);
    I.useEffect(() => {
      t === 0 ? u(25) : t === 1 ? u(50) : t === 2 ? u(75) : t === 3 && u(100);
    }, [t]);
    let m = null;
    switch (t) {
      case 0:
        m = c.jsx(Cm, { setStep: n, setData: l });
        break;
      case 1:
        m = c.jsx(zg, {
          setIsSubmit: r,
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
  var t, n;
  const e =
      ((n =
        (t = window == null ? void 0 : window.Shopify) == null
          ? void 0
          : t.currency) == null
        ? void 0
        : n.active) || 'USD',
    r = I.useMemo(
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
    value: r,
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
function Hg(e, r) {
  var t =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
  if (t != null) {
    var n,
      o,
      l,
      i,
      a = [],
      s = !0,
      u = !1;
    try {
      if (((l = (t = t.call(e)).next), r !== 0))
        for (
          ;
          !(s = (n = l.call(t)).done) && (a.push(n.value), a.length !== r);
          s = !0
        );
    } catch (m) {
      (u = !0), (o = m);
    } finally {
      try {
        if (!s && t.return != null && ((i = t.return()), Object(i) !== i))
          return;
      } finally {
        if (u) throw o;
      }
    }
    return a;
  }
}
function Qg(e, r) {
  return r || (r = e.slice(0)), (e.raw = r), e;
}
function $g(e, r) {
  return Wg(e) || Hg(e, r) || Kg(e, r) || Vg();
}
function Wg(e) {
  if (Array.isArray(e)) return e;
}
function Kg(e, r) {
  if (e) {
    if (typeof e == 'string') return iu(e, r);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (t === 'Object' && e.constructor && (t = e.constructor.name),
      t === 'Map' || t === 'Set')
    )
      return Array.from(e);
    if (t === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return iu(e, r);
  }
}
function iu(e, r) {
  (r == null || r > e.length) && (r = e.length);
  for (var t = 0, n = new Array(r); t < r; t++) n[t] = e[t];
  return n;
}
function Vg() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Gg = function (r) {
  return Yg(r) && !Jg(r);
};
function Yg(e) {
  return !!e && typeof e == 'object';
}
function Jg(e) {
  var r = Object.prototype.toString.call(e);
  return r === '[object RegExp]' || r === '[object Date]' || qg(e);
}
var Zg = typeof Symbol == 'function' && Symbol.for,
  Xg = Zg ? Symbol.for('react.element') : 60103;
function qg(e) {
  return e.$$typeof === Xg;
}
function e1(e) {
  return Array.isArray(e) ? [] : {};
}
function bn(e, r) {
  return r.clone !== !1 && r.isMergeableObject(e) ? yn(e1(e), e, r) : e;
}
function r1(e, r, t) {
  return e.concat(r).map(function (n) {
    return bn(n, t);
  });
}
function t1(e, r) {
  if (!r.customMerge) return yn;
  var t = r.customMerge(e);
  return typeof t == 'function' ? t : yn;
}
function n1(e) {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(e).filter(function (r) {
        return Object.propertyIsEnumerable.call(e, r);
      })
    : [];
}
function au(e) {
  return Object.keys(e).concat(n1(e));
}
function _0(e, r) {
  try {
    return r in e;
  } catch {
    return !1;
  }
}
function o1(e, r) {
  return (
    _0(e, r) &&
    !(
      Object.hasOwnProperty.call(e, r) && Object.propertyIsEnumerable.call(e, r)
    )
  );
}
function l1(e, r, t) {
  var n = {};
  return (
    t.isMergeableObject(e) &&
      au(e).forEach(function (o) {
        n[o] = bn(e[o], t);
      }),
    au(r).forEach(function (o) {
      o1(e, o) ||
        (_0(e, o) && t.isMergeableObject(r[o])
          ? (n[o] = t1(o, t)(e[o], r[o], t))
          : (n[o] = bn(r[o], t)));
    }),
    n
  );
}
function yn(e, r, t) {
  (t = t || {}),
    (t.arrayMerge = t.arrayMerge || r1),
    (t.isMergeableObject = t.isMergeableObject || Gg),
    (t.cloneUnlessOtherwiseSpecified = bn);
  var n = Array.isArray(r),
    o = Array.isArray(e),
    l = n === o;
  return l ? (n ? t.arrayMerge(e, r, t) : l1(e, r, t)) : bn(r, t);
}
yn.all = function (r, t) {
  if (!Array.isArray(r)) throw new Error('first argument should be an array');
  return r.reduce(function (n, o) {
    return yn(n, o, t);
  }, {});
};
var su,
  Ii = 16,
  Bo = 'px',
  Zt = 'em',
  Ca = 'rem',
  i1 = new RegExp(
    String.raw(su || (su = Qg(['-?d+(?:.d+|d*)'], ['-?\\d+(?:\\.\\d+|\\d*)'])))
  ),
  a1 = new RegExp(Bo + '|' + Zt + '|' + Ca);
function O0(e) {
  e === void 0 && (e = '');
  var r = e.match(new RegExp(i1.source + '(' + a1.source + ')'));
  return r && r[1];
}
function s1(e) {
  e === void 0 && (e = '');
  var r = O0(e);
  if (!r || r === Bo) return e;
  if (r === Zt || r === Ca) return '' + parseFloat(e) * Ii + Bo;
}
function U0(e, r) {
  e === void 0 && (e = ''), r === void 0 && (r = Ii);
  var t = O0(e);
  if (!t || t === Zt) return e;
  if (t === Bo) return '' + parseFloat(e) / r + Zt;
  if (t === Ca) return '' + (parseFloat(e) * Ii) / r + Zt;
}
function u1(e) {
  return Object.values(e).flatMap(function (r) {
    return Object.keys(r);
  });
}
function c1(e) {
  var r = Object.entries(e),
    t = r.length - 1;
  return Object.fromEntries(
    r.map(function (n, o) {
      var l = n,
        i = $g(l, 2),
        a = i[0],
        s = i[1],
        u = d1(s),
        m = uu(s),
        p = o === t ? u : u + ' and ' + uu(r[o + 1][1]);
      return [a, { up: u, down: m, only: p }];
    })
  );
}
function d1(e) {
  return '(min-width: ' + U0(e) + ')';
}
function uu(e) {
  var r,
    t = parseFloat((r = s1(e)) != null ? r : '') - 0.04;
  return '(max-width: ' + U0(t + 'px') + ')';
}
function f1(e) {
  return 'p-theme-' + e;
}
function m1(e) {
  var r = new Set(u1(e));
  return function (t) {
    return r.has(t);
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
    addListener: Mt,
    removeListener: Mt,
    matches: !1,
    onchange: Mt,
    addEventListener: Mt,
    removeEventListener: Mt,
    dispatchEvent: (e) => !0,
  };
function Mt() {}
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
  x1.forEach(([e, r]) => {
    const t = (o) => {
        for (const l of v1) l(e, o.matches);
      },
      n = window.matchMedia(r);
    n.addListener ? n.addListener(t) : n.addEventListener('change', t);
  });
function A1(e) {
  return Object.entries(c1(e))
    .map(([t, n]) =>
      Object.entries(n).map(([o, l]) => [`${t.split('-')[1]}${w1(o)}`, l])
    )
    .flat();
}
function w1(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ti(e, r, t) {
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
  const y = !r && r !== 0;
  if (typeof e != 'function') throw new TypeError('Expected a function');
  const x = r || 0;
  typeof t == 'object' &&
    ((m = !!t.leading),
    (p = 'maxWait' in t),
    (l = p ? Math.max(Number(t.maxWait) || 0, x) : void 0),
    (h = 'trailing' in t ? !!t.trailing : h));
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
      Dt = x - $;
    return p && l ? Math.min(Dt, l - Ae) : Dt;
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
  return (D.cancel = k), (D.flush = N), (D.pending = O), D;
}
class Mo {
  static get zero() {
    return new Mo();
  }
  constructor({ top: r = 0, left: t = 0, width: n = 0, height: o = 0 } = {}) {
    (this.top = r), (this.left = t), (this.width = n), (this.height = o);
  }
  get center() {
    return { x: this.left + this.width / 2, y: this.top + this.height / 2 };
  }
}
function Qn(e) {
  try {
    const r = e.getBoundingClientRect();
    return new Mo({
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
    });
  } catch {
    return new Mo({ width: window.innerWidth, height: window.innerHeight });
  }
}
const $n = 1e3 / 60;
class S1 {
  constructor(r) {
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
      r && this.setContainer(r);
  }
  registerStickyItem(r) {
    this.stickyItems.push(r);
  }
  unregisterStickyItem(r) {
    const t = this.stickyItems.findIndex(({ stickyNode: n }) => r === n);
    this.stickyItems.splice(t, 1);
  }
  getStickyItem(r) {
    return this.stickyItems.find(({ stickyNode: t }) => r === t);
  }
  setContainer(r) {
    (this.container = r),
      K0(r) && this.setTopBarOffset(r),
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
    const r = this.container ? D1(this.container) : 0,
      t = Qn(this.container).top + this.topBarOffset;
    this.stickyItems.forEach((n) => {
      const { handlePositioning: o } = n,
        {
          sticky: l,
          top: i,
          left: a,
          width: s,
        } = this.evaluateStickyItem(n, r, t);
      this.updateStuckItems(n, l), o(l, i, a, s);
    });
  }
  evaluateStickyItem(r, t, n) {
    var P;
    const {
      stickyNode: o,
      placeHolderNode: l,
      boundingElement: i,
      offset: a,
      disableWhenStacked: s,
    } = r;
    if (s && y1().matches)
      return { sticky: !1, top: 0, left: 0, width: 'auto' };
    const u = a
        ? this.getOffset(o) + parseInt(Q0.space['space-500'], 10)
        : this.getOffset(o),
      m = t + u,
      p = l.getBoundingClientRect().top - n + t,
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
        d = i.getBoundingClientRect().bottom - f + t - n;
      w = m >= p && m < d;
    }
    return { sticky: w, top: h, left: x, width: y };
  }
  updateStuckItems(r, t) {
    const { stickyNode: n } = r;
    t && !this.isNodeStuck(n)
      ? this.addStuckItem(r)
      : !t && this.isNodeStuck(n) && this.removeStuckItem(r);
  }
  addStuckItem(r) {
    this.stuckItems.push(r);
  }
  removeStuckItem(r) {
    const { stickyNode: t } = r,
      n = this.stuckItems.findIndex(({ stickyNode: o }) => t === o);
    this.stuckItems.splice(n, 1);
  }
  getOffset(r) {
    if (this.stuckItems.length === 0) return 0;
    let t = 0,
      n = 0;
    const o = this.stuckItems.length,
      l = Qn(r);
    for (; n < o; ) {
      const i = this.stuckItems[n].stickyNode;
      if (i !== r) {
        const a = Qn(i);
        F1(l, a) || (t += Qn(i).height);
      } else break;
      n++;
    }
    return t;
  }
  isNodeStuck(r) {
    return this.stuckItems.findIndex(({ stickyNode: n }) => r === n) >= 0;
  }
  setTopBarOffset(r) {
    const t = r.querySelector(`:not(${Og.selector}) ${Ug.selector}`);
    this.topBarOffset = t ? t.clientHeight : 0;
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
function F1(e, r) {
  const t = e.left,
    n = e.left + e.width,
    o = r.left;
  return r.left + r.width < t || n < o;
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
    const { scrollLocks: r } = this,
      { body: t } = document,
      n = t.firstElementChild;
    r === 0
      ? (t.removeAttribute(cu),
        t.removeAttribute(du),
        n && n.removeAttribute(fu),
        window.scroll(0, Wn),
        (this.locked = !1))
      : r > 0 &&
        !this.locked &&
        ((Wn = window.pageYOffset),
        t.setAttribute(cu, ''),
        E1() || t.setAttribute(du, ''),
        n && (n.setAttribute(fu, ''), (n.scrollTop = Wn)),
        (this.locked = !0));
  }
  resetScrollPosition() {
    Wn = 0;
  }
}
const k1 = /\[(.*?)\]|(\w+)/g;
function mu(e, r, t) {
  if (e == null) return;
  const n = Array.isArray(r) ? r : N1(r);
  let o = e;
  for (let l = 0; l < n.length; l++) {
    const i = o[n[l]];
    if (i === void 0) return t;
    o = i;
  }
  return o;
}
function N1(e) {
  const r = [];
  let t;
  for (; (t = k1.exec(e)); ) {
    const [, n, o] = t;
    r.push(n || o);
  }
  return r;
}
function I1(...e) {
  let r = {};
  for (const t of e) r = V0(r, t);
  return r;
}
function V0(e, r) {
  const t = Array.isArray(e) ? [...e] : { ...e };
  for (const n in r)
    if (Object.prototype.hasOwnProperty.call(r, n))
      gu(r[n]) && gu(t[n]) ? (t[n] = V0(t[n], r[n])) : (t[n] = r[n]);
    else continue;
  return t;
}
function gu(e) {
  return e !== null && typeof e == 'object';
}
const T1 = /{([^}]*)}/g;
class hu {
  constructor(r) {
    (this.translation = {}),
      (this.translation = Array.isArray(r) ? I1(...r.slice().reverse()) : r);
  }
  translate(r, t) {
    const n = mu(this.translation, r, '');
    return n
      ? t
        ? n.replace(T1, (o) => {
            const l = o.substring(1, o.length - 1);
            if (t[l] === void 0) {
              const i = JSON.stringify(t);
              throw new Error(
                `Error in translation for key '${r}'. No replacement found for key '${l}'. The following replacements were passed: '${i}'`
              );
            }
            return t[l];
          })
        : n
      : '';
  }
  translationKeyExists(r) {
    return !!mu(this.translation, r);
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
  componentDidUpdate({ passive: r, ...t }) {
    this.detachListener(t), this.attachListener();
  }
  componentWillUnmount() {
    this.detachListener();
  }
  render() {
    return null;
  }
  attachListener() {
    const {
      event: r,
      handler: t,
      capture: n,
      passive: o,
      window: l,
    } = this.props;
    (l || globalThis.window).addEventListener(r, t, { capture: n, passive: o });
  }
  detachListener(r) {
    const { event: t, handler: n, capture: o, window: l } = r || this.props;
    (l || globalThis.window).removeEventListener(t, n, o);
  }
}
const _1 = function ({ children: r }) {
  const [t, n] = I.useState(zl().matches),
    o = I.useCallback(
      Ti(
        () => {
          t !== zl().matches && n(!t);
        },
        40,
        { trailing: !0, leading: !0, maxWait: 40 }
      ),
      [t]
    );
  I.useEffect(() => {
    n(zl().matches);
  }, []);
  const l = I.useMemo(() => ({ isNavigationCollapsed: t }), [t]);
  return j.createElement(
    R1.Provider,
    { value: l },
    j.createElement(j1, { event: 'resize', handler: o }),
    r
  );
};
function O1() {
  const [e, r] = I.useState(!1);
  return (
    I.useEffect(() => {
      r(!0);
    }, []),
    e
  );
}
const U1 = I.createContext(void 0);
function H1(e, r) {
  return j.createElement('div', { id: 'PolarisPortalsContainer', ref: r });
}
const Q1 = I.forwardRef(H1);
function $1({ children: e, container: r }) {
  const t = O1(),
    n = I.useRef(null),
    o = I.useMemo(
      () =>
        r
          ? { container: r }
          : t
          ? { container: n.current }
          : { container: null },
      [r, t]
    );
  return j.createElement(
    U1.Provider,
    { value: o },
    e,
    r ? null : j.createElement(Q1, { ref: n })
  );
}
const W1 = I.createContext(void 0);
function K1({ children: e }) {
  const [r, t] = I.useState([]),
    n = I.useCallback((i) => {
      t((a) => [...a, i]);
    }, []),
    o = I.useCallback((i) => {
      let a = !0;
      return (
        t((s) => {
          const u = [...s],
            m = u.indexOf(i);
          return m === -1 ? (a = !1) : u.splice(m, 1), u;
        }),
        a
      );
    }, []),
    l = I.useMemo(() => ({ trapFocusList: r, add: n, remove: o }), [n, r, o]);
  return j.createElement(W1.Provider, { value: l }, e);
}
const V1 = I.createContext(void 0),
  G1 = { tooltip: 0, hovercard: 0 };
function Y1({ children: e }) {
  const [r, t] = I.useState(G1),
    n = I.useCallback((i) => {
      t((a) => ({ ...a, [i]: a[i] + 1 }));
    }, []),
    o = I.useCallback((i) => {
      t((a) => ({ ...a, [i]: a[i] - 1 }));
    }, []),
    l = I.useMemo(
      () => ({
        presenceList: Object.entries(r).reduce((i, a) => {
          const [s, u] = a;
          return { ...i, [s]: u >= 1 };
        }, {}),
        presenceCounter: r,
        addPresence: n,
        removePresence: o,
      }),
      [n, o, r]
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
  const r = document.createElement('div');
  r.setAttribute(
    'style',
    `width:100%; height: ${Z1}; overflow:scroll; scrollbar-width: thin;`
  ),
    e.appendChild(r),
    document.body.appendChild(e);
  const t =
      oo - (((o = e.firstElementChild) == null ? void 0 : o.clientWidth) ?? 0),
    n = Math.min(t, J1);
  document.documentElement.style.setProperty(
    '--pc-app-provider-scrollbar-width',
    `${n}px`
  ),
    document.body.removeChild(e);
}
class q1 extends I.Component {
  constructor(r) {
    super(r),
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
    const { i18n: t, linkComponent: n } = this.props;
    this.state = { link: n, intl: new hu(t) };
  }
  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document),
        this.setBodyStyles(),
        this.setRootAttributes();
      const r =
          navigator.userAgent.includes('Safari') &&
          !navigator.userAgent.includes('Chrome') &&
          (navigator.userAgent.includes('Version/16.1') ||
            navigator.userAgent.includes('Version/16.2') ||
            navigator.userAgent.includes('Version/16.3')),
        t =
          navigator.userAgent.includes('Shopify Mobile/iOS') &&
          (navigator.userAgent.includes('OS 16_1') ||
            navigator.userAgent.includes('OS 16_2') ||
            navigator.userAgent.includes('OS 16_3'));
      (r || t) &&
        document.documentElement.classList.add(
          'Polaris-Safari-16-Font-Optical-Sizing-Patch'
        );
    }
    X1();
  }
  componentDidUpdate({ i18n: r, linkComponent: t }) {
    const { i18n: n, linkComponent: o } = this.props;
    this.setRootAttributes(),
      !(n === r && o === t) && this.setState({ link: o, intl: new hu(n) });
  }
  render() {
    const { children: r, features: t = {} } = this.props,
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
          { value: t },
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
                      j.createElement(K1, null, j.createElement(Y1, null, r))
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
