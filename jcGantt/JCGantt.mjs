var K = Object.defineProperty;
var P = Object.getOwnPropertySymbols;
var N = Object.prototype.hasOwnProperty, J = Object.prototype.propertyIsEnumerable;
var B = (n, t, e) => t in n ? K(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, d = (n, t) => {
  for (var e in t || (t = {}))
    N.call(t, e) && B(n, e, t[e]);
  if (P)
    for (var e of P(t))
      J.call(t, e) && B(n, e, t[e]);
  return n;
};
var H = (n, t, e) => new Promise((i, s) => {
  var o = (h) => {
    try {
      l(e.next(h));
    } catch (c) {
      s(c);
    }
  }, a = (h) => {
    try {
      l(e.throw(h));
    } catch (c) {
      s(c);
    }
  }, l = (h) => h.done ? i(h.value) : Promise.resolve(h.value).then(o, a);
  l((e = e.apply(n, t)).next());
});
var BUILTIN_OBJECT = reduce([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(n, t) {
  return n["[object " + t + "]"] = !0, n;
}, {}), TYPED_ARRAY = reduce([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(n, t) {
  return n["[object " + t + "Array]"] = !0, n;
}, {}), objToString = Object.prototype.toString, arrayProto = Array.prototype, nativeSlice = arrayProto.slice, ctorFunction = function() {
}.constructor, protoFunction = ctorFunction ? ctorFunction.prototype : null, protoKey = "__proto__";
function clone(n) {
  if (n == null || typeof n != "object")
    return n;
  var t = n, e = objToString.call(n);
  if (e === "[object Array]") {
    if (!isPrimitive(n)) {
      t = [];
      for (var i = 0, s = n.length; i < s; i++)
        t[i] = clone(n[i]);
    }
  } else if (TYPED_ARRAY[e]) {
    if (!isPrimitive(n)) {
      var o = n.constructor;
      if (o.from)
        t = o.from(n);
      else {
        t = new o(n.length);
        for (var i = 0, s = n.length; i < s; i++)
          t[i] = n[i];
      }
    }
  } else if (!BUILTIN_OBJECT[e] && !isPrimitive(n) && !isDom(n)) {
    t = {};
    for (var a in n)
      n.hasOwnProperty(a) && a !== protoKey && (t[a] = clone(n[a]));
  }
  return t;
}
function reduce(n, t, e, i) {
  if (n && t) {
    for (var s = 0, o = n.length; s < o; s++)
      e = t.call(i, e, n[s], s, n);
    return e;
  }
}
function bindPolyfill(n, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return n.apply(t, e.concat(nativeSlice.call(arguments)));
  };
}
protoFunction && isFunction(protoFunction.bind) && protoFunction.call.bind(protoFunction.bind);
function isArray(n) {
  return Array.isArray ? Array.isArray(n) : objToString.call(n) === "[object Array]";
}
function isFunction(n) {
  return typeof n == "function";
}
function isString(n) {
  return typeof n == "string";
}
function isObject(n) {
  var t = typeof n;
  return t === "function" || !!n && t === "object";
}
function isDom(n) {
  return typeof n == "object" && typeof n.nodeType == "number" && typeof n.ownerDocument == "object";
}
var primitiveKey = "__ec_primitive__";
function isPrimitive(n) {
  return n[primitiveKey];
}
class Model {
  constructor(t, e) {
    this.originOption = clone(t), this.fullOption = e;
  }
}
moment.suppressDeprecationWarnings = !0;
moment.locale("zh-cn", {
  week: {
    dow: 1
  }
});
const constant = {
  cellWidth: 75,
  cellHeight: 35
}, _global_moment = moment, colors = {
  info: "#909399",
  error: "#F56C6C",
  warn: "#E6A23C",
  success: "#67C23A",
  冰川蓝: "#84A3BC",
  蜜橙: "#FFBE90",
  珊瑚粉: "#E2A9A1"
}, _TimeScaleOption = class z {
  constructor(t) {
    if (this.start = /* @__PURE__ */ new Date(), this.days = z.defaultDays, this.accuracy = "second", this.baseWidth = constant.cellWidth, this.scales = [new ScaleOption()], t) {
      let e = [];
      t.scales && t.scales.forEach((i) => {
        e.push(new ScaleOption(i));
      });
      for (let i in t)
        this[i] = t[i];
      e.length > 0 && (this.scales = e);
    }
  }
  getAccuracy() {
    return z.accuracyMap.get(this.accuracy);
  }
};
_TimeScaleOption.defaultDays = -60;
_TimeScaleOption.accuracyMap = (/* @__PURE__ */ new Map()).set("second", 1).set("minute", 60).set("hour", 60 * 60).set("day", 60 * 60 * 24).set("week", 60 * 60 * 24 * 7).set("month", 30 * 60 * 60 * 24 * 7).set("year", 365 * 30 * 60 * 60 * 24 * 7);
let TimeScaleOption = _TimeScaleOption;
class ScaleOption {
  constructor(t) {
    if (this.symbol = "day", this.formatter = "YY/MM/DD", t)
      for (let e in t)
        this[e] = t[e];
  }
}
function dateFormatHandle(n, t, e) {
  if (isString(n))
    return _global_moment(t).format(n);
  if (isFunction(n))
    return n(t, e);
}
const _TimeScaleModel = class F extends Model {
  constructor(t) {
    super(t, new TimeScaleOption(t)), this.type = F.type, this.timeBase = 1, this._timeBase = 1, this.option = clone(t);
  }
  refresh() {
    this.init();
  }
  init() {
    const { start: t, end: e } = this.getStartAndEnd();
    this.start = t, this.end = e, this.initMetaDataMap(t, e), this.initMetaDataList();
  }
  initMetaDataMap(t, e) {
    let i = this;
    this.metaDataMap = /* @__PURE__ */ new Map();
    let s = this.fullOption.scales, o = this.getMinAccuracyScale(s);
    this.originMinUnit = o ? o.symbol : "day";
    let a = this.unitConversion(this._timeBase, this._timeUnit || this.originMinUnit);
    this.timeBase = Math.floor(a.timeBase), this.minUnit = a.timeUnit;
    let l = a.formatter;
    s.forEach((h) => {
      i.metaDataMap.get(h.symbol) || (h.symbol == i.originMinUnit ? i.metaDataMap.set(h.symbol, i.createMinTimeMetaData(h, this.timeBase, i.minUnit, l, t, e)) : i.metaDataMap.set(h.symbol, i.createTimeMetaData(h, this.timeBase, i.minUnit, t, e)));
    });
  }
  initMetaDataList() {
    let t = this;
    this.metaDataList = [], this.fullOption.scales.forEach((e) => {
      t.metaDataList.push(t.metaDataMap.get(e.symbol));
    });
  }
  getMinAccuracyScale(t) {
    return t && t.length > 0 ? t.reduce((e, i) => TimeScaleOption.accuracyMap.get(e.symbol) - TimeScaleOption.accuracyMap.get(i.symbol) <= 0 ? e : i) : null;
  }
  getStartAndEnd() {
    let t = this.fullOption.start, e = this.fullOption.end, i = this.fullOption.days;
    return e ? (e = _global_moment(e).toDate(), i > 0 ? t = _global_moment(e).subtract(Math.abs(i), "d").toDate() : t = _global_moment(t).toDate()) : (t = _global_moment(t).toDate(), e = _global_moment(t).add(Math.abs(i), "d").toDate()), t = _global_moment(t).startOf("d").toDate(), e = _global_moment(e).startOf("d").toDate(), { start: t, end: e };
  }
  createMinTimeMetaData(t, e, i, s, o, a) {
    let l = [];
    !s && t.symbol != i && (s = TimeScale.defaultFormatter[i]);
    let h = _global_moment(o), c = _global_moment(a), u = _global_moment(o), g = null, p = null, m = t.commonStyle || {};
    for (; u.isBetween(h, c, "second", "[)"); ) {
      p = u.clone(), g = _global_moment.min([u.add(e, i).startOf(i), c]);
      let w = {
        symbol: i,
        start: p.toDate(),
        end: g.toDate(),
        counts: g.diff(p, i) / e || 1,
        baseWidth: this.fullOption.baseWidth,
        text: dateFormatHandle(s || t.formatter, p.toDate(), g.toDate())
      };
      w.style = d(d({}, m), isFunction(t.style) ? t.style(w) : {}), this.initStyleProperties(w, i), l.push(w);
    }
    return l;
  }
  createTimeMetaData(t, e, i, s, o) {
    let a = [], l = _global_moment(s), h = _global_moment(o), c = _global_moment(s), u = null, g = null, p = t.commonStyle || {};
    for (; c.isBetween(l, h, "second", "[)"); ) {
      g = c.clone(), u = _global_moment.min([c.add(1, t.symbol).startOf(t.symbol), h]);
      let m = {
        symbol: t.symbol,
        start: g.toDate(),
        end: u.toDate(),
        counts: u.diff(g, i) / e || 1,
        baseWidth: this.fullOption.baseWidth,
        text: dateFormatHandle(t.formatter, g.toDate(), u.toDate())
      };
      m.style = d(d({}, p), isFunction(t.style) ? t.style(m) : {}), a.push(m);
    }
    return a;
  }
  initStyleProperties(t, e) {
    if (!this.styleProperties && t.symbol == e) {
      let i = 0;
      isArray(t.style.padding) ? t.style.padding.length > 2 ? i = t.style.padding[1] + t.style.padding[3] : i = t.style.padding[1] : i = t.style.padding || 0, this.styleProperties = {
        border: (t.style.borderWidth || 0.5) * 2,
        padding: i
      };
    }
  }
  unitConversion(t, e, i) {
    switch (e) {
      case "year": {
        if (t < 1)
          t = 12 * t, e = "month", i = "YY年MM月";
        else
          return {
            timeBase: t,
            timeUnit: e,
            formatter: i
          };
        return this.unitConversion(t, e, i);
      }
      case "month": {
        if (t >= 12)
          t = Math.floor(t / 12), e = "year", i = "YY年";
        else if (t < 1)
          t = t * 30, e = "day", i = "MM月DD日";
        else
          return {
            timeBase: t,
            timeUnit: e,
            formatter: i
          };
        return this.unitConversion(t, e, i);
      }
      case "day": {
        if (t >= 30)
          t = Math.floor(t / 30), e = "month", i = "MM月";
        else if (t < 1)
          t = 24 * t, e = "hour", i = "DD日HH时";
        else
          return {
            timeBase: t,
            timeUnit: e,
            formatter: i
          };
        return this.unitConversion(t, e, i);
      }
      case "hour": {
        if (t >= 24)
          t = Math.floor(t / 24), e = "day", i = "DD日";
        else if (t < 1)
          t = 60 * t, e = "minute", i = "HH时mm分";
        else
          return {
            timeBase: t,
            timeUnit: e,
            formatter: i
          };
        return this.unitConversion(t, e, i);
      }
      case "minute": {
        if (t >= 60)
          t = Math.floor(t / 60), e = "hour", i = "HH时";
        else if (t < 1)
          t = t * 60, e = "second", i = "mm分ss秒";
        else
          return {
            timeBase: t,
            timeUnit: e,
            formatter: i
          };
        return this.unitConversion(t, e, i);
      }
      case "second": {
        if (t >= 60)
          t = Math.floor(t / 60), e = "minute", i = "mm分";
        else if (t < 1)
          t = 1;
        else
          return {
            timeUnit: e,
            timeBase: t,
            formatter: i
          };
        return this.unitConversion(t, e, i);
      }
    }
  }
};
_TimeScaleModel.type = "timeScale";
let TimeScaleModel = _TimeScaleModel;
const _ResizeEvent = class G {
  constructor(t) {
    this.type = G.type, this.source = t;
  }
};
_ResizeEvent.type = "resize";
let ResizeEvent = _ResizeEvent;
class Container extends zrender.Group {
  constructor() {
    super(...arguments), this.eventType = ResizeEvent.type;
  }
  /**
   * 在当前容器添加元素
   * @param child
   */
  add(t) {
    let e = super.add(t);
    return this.realWidth = super.getBoundingRect().width, this.realHeight = super.getBoundingRect().height, e;
  }
  addHorizon(t) {
    return this.add(t);
  }
  addVertical(t) {
    return this.add(t);
  }
  /**
   * 在当前容器的内容区域添加内容
   * @param child
   */
  addContent(t) {
    return this.add(t);
  }
  setComponent(t) {
    this.component = t;
  }
  resize(t, e) {
  }
  handleEvent(t) {
    this.resize(), this.component && this.component.refresh();
  }
}
const _StackContainer = class Y extends Container {
  constructor() {
    super(...arguments), this.type = Y.type;
  }
  addHorizon(t) {
    t.hv = "horizon";
    let e = this.getBoundingRect().width;
    return t && t.setPosition([e, 0]), this.add(t);
  }
  addVertical(t) {
    t.hv = "verity";
    let e = this.getBoundingRect().height;
    return t && t.setPosition([0, e]), this.add(t);
  }
  getLastChild(t) {
    let e;
    return this.eachChild((i) => {
      i instanceof Container && i.hv === t && (e = i);
    }), e;
  }
  refresh() {
  }
};
_StackContainer.type = "StackContainer";
let StackContainer = _StackContainer;
const _AnimateManager = class R {
  constructor() {
    this.animateMap = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return R.instance;
  }
  addAnimate(t, e, i) {
    let s = null;
    return (s = this.animateMap.get(t)) || (s = /* @__PURE__ */ new Map(), this.animateMap.set(t, s)), s.set(e, i), i;
  }
  getAnimate(t, e) {
    let i = null, s = this.animateMap.get(t);
    if (s && (i = s.get(e)), i) {
      i._started = 0;
      for (let o in i._tracks)
        i._tracks[o]._finished = !1;
    }
    return i;
  }
  createAnimate(t, e, i, s, o, a, l) {
    let h = t[e], c = d(d({}, h), i), u = t.animate(e, a, !0).when(s, c).done(() => {
      o && (t[e] = c);
    });
    return R.getInstance().addAnimate(t, l, u), u;
  }
};
_AnimateManager.instance = new _AnimateManager();
let AnimateManager = _AnimateManager;
function addHover(n, t, e) {
  n.originStyle || (n.originStyle = n[t]), n.onmouseover = (i) => {
    if (i.event.preventDefault(), n.hoverForbid)
      return;
    let s = d(d({}, n.originStyle), e);
    n.dirty(), n[t] = s;
  }, n.onmouseout = (i) => {
    i.event.preventDefault(), !n.hoverForbid && (n.dirty(), n[t] = n.originStyle);
  }, n.restoreStyle = () => {
    let i = n.originStyle;
    n.dirty(), n[t] = i;
  };
}
function applyTo(n, t, e) {
  if (!(!n || !t))
    for (let i in n)
      t[i] ? isFunction(n[i]) ? e && (t[i] = n[i]) : isObject(n[i]) ? applyTo(n[i], t[i], e) : e && (t[i] = n[i]) : t[i] = n[i];
}
var Entry = function() {
  function n(t) {
    this.value = t;
  }
  return n;
}(), LinkedList = function() {
  function n() {
    this._len = 0;
  }
  return n.prototype.insert = function(t) {
    var e = new Entry(t);
    return this.insertEntry(e), e;
  }, n.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, n.prototype.remove = function(t) {
    var e = t.prev, i = t.next;
    e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
  }, n.prototype.len = function() {
    return this._len;
  }, n.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, n;
}(), LRU = function() {
  function n(t) {
    this._list = new LinkedList(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return n.prototype.put = function(t, e) {
    var i = this._list, s = this._map, o = null;
    if (s[t] == null) {
      var a = i.len(), l = this._lastRemovedEntry;
      if (a >= this._maxSize && a > 0) {
        var h = i.head;
        i.remove(h), delete s[h.key], o = h.value, this._lastRemovedEntry = h;
      }
      l ? l.value = e : l = new Entry(e), l.key = t, i.insertEntry(l), s[t] = l;
    }
    return o;
  }, n.prototype.get = function(t) {
    var e = this._map[t], i = this._list;
    if (e != null)
      return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value;
  }, n.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, n.prototype.len = function() {
    return this._list.len();
  }, n;
}();
const LRU$1 = LRU;
var kCSSColorTable = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function clampCssByte(n) {
  return n = Math.round(n), n < 0 ? 0 : n > 255 ? 255 : n;
}
function clampCssFloat(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function parseCssInt(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? clampCssByte(parseFloat(t) / 100 * 255) : clampCssByte(parseInt(t, 10));
}
function parseCssFloat(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? clampCssFloat(parseFloat(t) / 100) : clampCssFloat(parseFloat(t));
}
function cssHueToRgb(n, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? n + (t - n) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? n + (t - n) * (2 / 3 - e) * 6 : n;
}
function setRgba(n, t, e, i, s) {
  return n[0] = t, n[1] = e, n[2] = i, n[3] = s, n;
}
function copyRgba(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n;
}
var colorCache = new LRU$1(20), lastRemovedArr = null;
function putToCache(n, t) {
  lastRemovedArr && copyRgba(lastRemovedArr, t), lastRemovedArr = colorCache.put(n, lastRemovedArr || t.slice());
}
function parse(n, t) {
  if (n) {
    t = t || [];
    var e = colorCache.get(n);
    if (e)
      return copyRgba(t, e);
    n = n + "";
    var i = n.replace(/ /g, "").toLowerCase();
    if (i in kCSSColorTable)
      return copyRgba(t, kCSSColorTable[i]), putToCache(n, t), t;
    var s = i.length;
    if (i.charAt(0) === "#") {
      if (s === 4 || s === 5) {
        var o = parseInt(i.slice(1, 4), 16);
        if (!(o >= 0 && o <= 4095)) {
          setRgba(t, 0, 0, 0, 1);
          return;
        }
        return setRgba(t, (o & 3840) >> 4 | (o & 3840) >> 8, o & 240 | (o & 240) >> 4, o & 15 | (o & 15) << 4, s === 5 ? parseInt(i.slice(4), 16) / 15 : 1), putToCache(n, t), t;
      } else if (s === 7 || s === 9) {
        var o = parseInt(i.slice(1, 7), 16);
        if (!(o >= 0 && o <= 16777215)) {
          setRgba(t, 0, 0, 0, 1);
          return;
        }
        return setRgba(t, (o & 16711680) >> 16, (o & 65280) >> 8, o & 255, s === 9 ? parseInt(i.slice(7), 16) / 255 : 1), putToCache(n, t), t;
      }
      return;
    }
    var a = i.indexOf("("), l = i.indexOf(")");
    if (a !== -1 && l + 1 === s) {
      var h = i.substr(0, a), c = i.substr(a + 1, l - (a + 1)).split(","), u = 1;
      switch (h) {
        case "rgba":
          if (c.length !== 4)
            return c.length === 3 ? setRgba(t, +c[0], +c[1], +c[2], 1) : setRgba(t, 0, 0, 0, 1);
          u = parseCssFloat(c.pop());
        case "rgb":
          if (c.length >= 3)
            return setRgba(t, parseCssInt(c[0]), parseCssInt(c[1]), parseCssInt(c[2]), c.length === 3 ? u : parseCssFloat(c[3])), putToCache(n, t), t;
          setRgba(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (c.length !== 4) {
            setRgba(t, 0, 0, 0, 1);
            return;
          }
          return c[3] = parseCssFloat(c[3]), hsla2rgba(c, t), putToCache(n, t), t;
        case "hsl":
          if (c.length !== 3) {
            setRgba(t, 0, 0, 0, 1);
            return;
          }
          return hsla2rgba(c, t), putToCache(n, t), t;
        default:
          return;
      }
    }
    setRgba(t, 0, 0, 0, 1);
  }
}
function hsla2rgba(n, t) {
  var e = (parseFloat(n[0]) % 360 + 360) % 360 / 360, i = parseCssFloat(n[1]), s = parseCssFloat(n[2]), o = s <= 0.5 ? s * (i + 1) : s + i - s * i, a = s * 2 - o;
  return t = t || [], setRgba(t, clampCssByte(cssHueToRgb(a, o, e + 1 / 3) * 255), clampCssByte(cssHueToRgb(a, o, e) * 255), clampCssByte(cssHueToRgb(a, o, e - 1 / 3) * 255), 1), n.length === 4 && (t[3] = n[3]), t;
}
function lift(n, t) {
  var e = parse(n);
  if (e) {
    for (var i = 0; i < 3; i++)
      t < 0 ? e[i] = e[i] * (1 - t) | 0 : e[i] = (255 - e[i]) * t + e[i] | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return stringify(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function stringify(n, t) {
  if (!(!n || !n.length)) {
    var e = n[0] + "," + n[1] + "," + n[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + n[3]), t + "(" + e + ")";
  }
}
const _Tooltip = class y {
  constructor() {
    this.type = y.type, this.dom = this.createTooltip();
  }
  static getInstance() {
    return y.instance;
  }
  hide() {
    this.dom || (this.dom = this.createTooltip()), this.dom.classList.add("hide");
  }
  show(t, e, i) {
    this.dom || (this.dom = this.createTooltip()), this.dom.classList.remove("hide"), this.dom.innerHTML = i;
    let s = window.innerWidth;
    e <= this.dom.clientHeight ? this.dom.style.top = e + "px" : this.dom.style.top = e - this.dom.clientHeight + "px", t + this.dom.clientWidth <= s ? this.dom.style.left = t + "px" : this.dom.style.left = t - this.dom.clientWidth + "px";
  }
  static forbid() {
    y.forbidden = !0;
  }
  static allow() {
    y.forbidden = !1;
  }
  refresh() {
  }
  setOption(t) {
  }
  createTooltip() {
    if (this.dom)
      return this.dom;
    let t = document.body;
    if (!t)
      return null;
    let e = document.createElement("div");
    return e.classList.add("tooltip", "hide"), t.append(e), e;
  }
  static init(t) {
    let e = t.onmouseover, i = t.onmouseout;
    t.onmouseover = (s) => {
      e && e(s), !y.forbidden && y.getInstance().show(s.event.clientX, s.event.clientY, t.getTooltip());
    }, t.onmouseout = (s) => {
      i && i(s), y.getInstance().hide();
    };
  }
  static initElement(t, e) {
    let i = t.onmouseover, s = t.onmouseout;
    t.onmouseover = (o) => {
      i && i(o), !y.forbidden && y.getInstance().show(o.event.clientX, o.event.clientY, e);
    }, t.onmouseout = (o) => {
      s && s(o), y.getInstance().hide();
    };
  }
  setTheme(t, e) {
  }
};
_Tooltip.type = "Tooltip";
_Tooltip.instance = new _Tooltip();
let Tooltip = _Tooltip;
class TimeScaleView {
  render(t, e) {
    if (!t)
      return [];
    let i = this, s = new StackContainer();
    return t.metaDataList.forEach((o, a) => {
      let l = new StackContainer();
      o.forEach((h, c) => {
        l.addHorizon(i.paint(h, t.styleProperties));
      }), s.addVertical(l);
    }), [s];
  }
  paint(t, e) {
    let i = new zrender.Group();
    i.dirty();
    let s = d({}, t.style), o = t.baseWidth || constant.cellWidth, a = s.height || constant.cellHeight, l = o * t.counts + (t.counts * (e.border + e.padding) - ((s.padding || 0) + (s.borderWidth || 0.5) * 2)), h = null;
    return i.add(
      h = new zrender.Text({
        style: d({
          text: t.text,
          width: l,
          x: 0.5 * l,
          height: a,
          align: "center",
          lineHeight: a,
          fontSize: 12,
          backgroundColor: "#1ba78480",
          borderColor: "#1ba784",
          overflow: "truncate",
          borderWidth: 0.5,
          borderRadius: 3
        }, t.style)
      })
    ), addHover(h, "style", {
      backgroundColor: lift(h.style.backgroundColor, 0.2)
    }), Tooltip.initElement(i, t.text), i;
  }
}
class GridModel extends Model {
  constructor(t, e) {
    super(t || {}, t || {}), this.timeScale = e;
  }
  setTimeScale(t) {
    this.timeScale = t;
  }
  setTable(t) {
    this.table = t;
  }
  refresh() {
    this.initMetaData();
  }
  initMetaData() {
    let t = this.initCol(), e = { value: [] };
    this.table && (e = this.initRow()), this.metaData = {
      col: t,
      row: e
    };
  }
  initCol() {
    let t = 100;
    this.table && (t = this.table.getHeight());
    let e = [], o = this.timeScale.tierContainer.getContainerByName(this.timeScale.type).childAt(0).children().reduce(
      (l, h) => l.childCount() >= h.childCount() ? l : h
    ), a = d(d({}, this.originOption.style || {}), this.originOption.colStyle || {});
    return o.eachChild((l) => {
      e.push({
        x1: l.x,
        x2: l.x,
        y1: 0,
        y2: t
      });
    }), {
      value: e,
      style: a
    };
  }
  initRow() {
    let t = this.timeScale.getTimeLineWidth(), e = [], i, s, o = d(d({}, this.originOption.style || {}), this.originOption.rowStyle || {}), a = this.table.rowGroup, l = a.y + a.parent.y;
    return a.eachChild((h) => {
      i = h.getBoundingRect(), s = l + h.y + i.height, e.push({
        x1: 0,
        x2: t || 1e3,
        y1: s,
        y2: s
      });
    }), {
      value: e,
      style: o
    };
  }
}
class GridView {
  render(t, e) {
    let i = new zrender.Group({
      silent: !1
    }), s = t.metaData;
    s.row && i.add(this.paintRow(s.row)), s.col && i.add(this.paintCol(s.col));
    let o = i.getBoundingRect();
    return i.add(new zrender.Rect({
      shape: {
        width: o.width,
        height: o.height
      },
      style: {
        fill: t.originOption.backGroundColor || "#ffffff00"
      },
      zlevel: -1
    })), [i];
  }
  paintRow(t) {
    let e = new zrender.Group();
    return t.value.forEach((i) => {
      e.add(
        new zrender.Line({
          shape: i,
          style: d({
            stroke: "#acacac",
            lineDash: "dashed",
            lineWidth: 1
          }, t.style)
        })
      );
    }), e;
  }
  paintCol(t) {
    let e = new zrender.Group();
    return t.value.forEach((i) => {
      e.add(
        new zrender.Line({
          shape: i,
          style: d({
            stroke: "#acacac",
            lineDash: "dashed",
            lineWidth: 1
          }, t.style)
        })
      );
    }), e;
  }
}
class Grid {
  constructor(t, e) {
    this.timeScale = e, this.model = new GridModel(t, e), this.view = new GridView();
  }
  setTimeScale(t) {
    this.timeScale = t, this.model.setTimeScale(t);
  }
  setTable(t) {
    this.table = t, this.model.setTable(t);
  }
  setContainer(t) {
    this.container = t;
  }
  refresh() {
    if (!this.container)
      return;
    let t = this;
    this.container.removeAll(), this.model.refresh(), this._uiInstance = this.view.render(this.model, this.zrInstance), this._uiInstance.forEach((e) => {
      t.container.addVertical(e);
    });
  }
  setOption(t) {
    this.model.originOption = t, this.model.fullOption = t;
  }
  setTheme(t) {
  }
}
class TierContainer extends Container {
  constructor(t) {
    super(), this.tierList = [], this.tierNameMap = /* @__PURE__ */ new Map(), this.tier = t || 1, this.initTiers();
  }
  /** public **/
  addTier(t, e) {
    if (t) {
      if (this.tierNameMap.has(e))
        throw new Error(`The container named ${e} is exited.(名为${e}的容器已存在)`);
      this.tier++, this.tierNameMap.set(e, this.tier), this.tierList.push(t), this.add(t);
    }
  }
  addTo(t, e) {
    let i = this.getContainer(e);
    if (!i)
      throw new Error(`The container of tier ${e} is not exit.(层级为${e}的容器不存在)`);
    i.add(t);
  }
  addToByName(t, e) {
    let i = this.getContainerByName(e);
    if (!i)
      throw new Error(`The container named ${e} is not exit.(名为为${e}的容器不存在)`);
    i.add(t);
  }
  addHorizonTo(t, e) {
    let i = this.getContainer(e);
    if (!i)
      throw new Error(`The container of tier ${e} is not exit.(层级为${e}的容器不存在)`);
    i.addHorizon(t);
  }
  addHorizonToByName(t, e) {
    let i = this.getContainerByName(e);
    if (!i)
      throw new Error(`The container named ${e} is not exit.(名为为${e}的容器不存在)`);
    i.addHorizon(t);
  }
  addVerticalTo(t, e) {
    let i = this.getContainer(e);
    if (!i)
      throw new Error(`The container of tier ${e} is not exit.(层级为${e}的容器不存在)`);
    i.addVertical(t);
  }
  addVerticalToByName(t, e) {
    let i = this.getContainerByName(e);
    if (!i)
      throw new Error(`The container named ${e} is not exit.(名为为${e}的容器不存在)`);
    i.addVertical(t);
  }
  getContainer(t) {
    return this.tierList[t - 1];
  }
  getContainerByName(t) {
    let e = this.tierNameMap.get(t);
    return e ? this.tierList[e - 1] : null;
  }
  refresh() {
    this.tierList.forEach((t) => {
      t.refresh();
    });
  }
  setTierName(t, e) {
    this.tierNameMap.set(e, t), this.tierNameMap.delete(t);
  }
  setTierContainer(t, e) {
    if (t <= 0)
      throw new Error("Value of tier required a number greater than zero.(tier需要是一个大于零的数)");
    this.tierList[t - 1] = e, this.reAddChild();
  }
  setTierContainerByName(t, e) {
    let i = this.tierNameMap.get(t);
    if (i)
      throw new Error(`The container named ${t} is not exit.(名为${t}的容器不存在)`);
    this.tierList[i - 1] = e;
  }
  /** private **/
  initTiers() {
    let t = null;
    for (let e = 0; e < this.tier; e++)
      this.tierList.push(t = new StackContainer()), this.tierNameMap.set(e + 1, e + 1), this.add(t);
  }
  reAddChild() {
    this.removeAll();
    let t = this;
    this.tierList.forEach((e) => {
      t.add(e);
    });
  }
}
const _ScrollModel = class D extends Model {
  constructor(t, e) {
    super(t || {}, e || {});
  }
  setScroll(t) {
    this.scroll = t;
  }
  setOption(t) {
    this.originOption = t, this.fullOption = t;
  }
  setContainer(t) {
    this.container = t;
  }
  refresh() {
    this.scrollForContainer();
  }
  scrollTo(t) {
    this.container = t, this.scrollForContainer();
  }
  scrollForContainer() {
    this.container && (this.createScrollHorizon(), this.createScrollVertical());
  }
  createScrollHorizon() {
    if (this.container.realWidth - this.container.__width <= 0) {
      this.horizon = null;
      return;
    }
    this.horizon = {
      type: "horizon",
      trackLength: this.container.__width,
      thumbLength: Math.round(this.container.__width / this.container.realWidth * this.container.__width),
      trackStyle: this.originOption.trackStyle || {},
      thumbStyle: this.originOption.thumbStyle || {},
      height: this.originOption.thickness || D.scrollLength
    };
  }
  createScrollVertical() {
    if (this.container.realHeight - this.container.__height <= 0) {
      this.vertical = null;
      return;
    }
    this.vertical = {
      type: "vertical",
      trackLength: this.container.__height,
      thumbLength: Math.round(this.container.__height / this.container.realHeight * this.container.__height),
      trackStyle: this.originOption.trackStyle || {},
      thumbStyle: this.originOption.thumbStyle || {},
      width: this.originOption.thickness || D.scrollLength
    };
  }
};
_ScrollModel.scrollLength = 8;
let ScrollModel = _ScrollModel;
class Thumb extends zrender.Rect {
  constructor(t, e) {
    super(t), this.type = e, this.draggable = !1, this.initEvent();
  }
  initEvent() {
    let t = this, e, i;
    t.onmousedown = (s) => {
      s.event.preventDefault();
      let o = t.parent.parent;
      e = o.realWidth / o.__width, i = o.realHeight / o.__height, t.isMouseDown = !0, document.onmousemove = (a) => {
        if (a.preventDefault(), t.isMouseDown) {
          t.dirty();
          let l = 0;
          if (t.type === "horizon") {
            let c = t.scroll.horizonTarget || o.childAt(0);
            if (t.x + a.movementX + t.getBoundingRect().width > o.__width || t.x + a.movementX < 0)
              return;
            l = a.movementX, t.setPosition([t.x + a.movementX, t.y]), c.setPosition([c.x - a.movementX * e, c.y]);
          }
          if (t.type === "vertical") {
            let c = t.scroll.verticalTarget || o.childAt(0);
            if (t.y + a.movementY + t.getBoundingRect().height > o.__height || t.y + a.movementY < 0)
              return;
            l = a.movementY, t.setPosition([t.x, t.y + a.movementY]), c.setPosition([c.x, c.y - a.movementY * i]);
          }
          let h = t.scroll.items;
          h && h.forEach((c) => {
            t.type == c.type && c.scroll.moveTo(c.type, l, !0);
          });
        }
      }, document.onmouseup = (a) => {
        a.preventDefault(), t.isMouseDown = !1, document.onmousemove = null, document.onmouseup = null;
      };
    };
  }
  scrollTo(t, e) {
    let i = this, s, o, a = i.parent.parent;
    if (!a)
      return;
    s = a.realWidth / a.__width, o = a.realHeight / a.__height;
    let l = 0;
    if (i.dirty(), i.type === "horizon") {
      let h = i.scroll.horizonTarget || a.childAt(0);
      if (i.x + t + i.getBoundingRect().width > a.__width || i.x + t < 0)
        return;
      l = t * s, i.setPosition([i.x + t, i.y]), h.setPosition([h.x - l, h.y]);
    }
    if (i.type === "vertical") {
      let h = i.scroll.verticalTarget || a.childAt(0);
      if (i.y + t + i.getBoundingRect().height > a.__height || i.y + t < 0)
        return;
      l = t * o, i.setPosition([i.x, i.y + t]), h.setPosition([h.x, h.y - l]);
    }
    if (!e) {
      let h = i.scroll.items;
      h && h.forEach((c) => {
        i.type == c.type && c.scroll.moveTo(c.type, t, !0);
      });
    }
    return l;
  }
}
const _ScrollItem = class O extends zrender.Group {
  constructor(t, e, i, s) {
    super(), this.scroll = s, this.track = t, this.thumb = e, this.type = i, this.thumb.scroll = this.scroll, this.init();
  }
  setHoverOffset(t) {
    this.offset = t, this.init();
  }
  init() {
    this.type == "horizon" ? this.trackLength = this.track.shape.height : this.trackLength = this.track.shape.width, this.type == "horizon" ? this.thumbLength = this.thumb.shape.height : this.thumbLength = this.thumb.shape.width, this.type == "horizon" ? this.trackPosition = this.track.shape.y : this.trackPosition = this.track.shape.x, this.type == "horizon" ? this.thumbPosition = this.thumb.shape.y : this.thumbPosition = this.thumb.shape.x, this.add(this.track), this.add(this.thumb), this.initHover();
  }
  initHover() {
    let t = this.offset || 8, e = this;
    this.onmouseover = (i) => {
      e.hovered || (i.event.preventDefault(), O.mouseoverHandler[this.type](e, t), this.hovered = !0);
    }, this.onmouseout = (i) => {
      this.thumb.contain(i.event.zrX, i.event.zrY) || this.track.contain(i.event.zrX, i.event.zrY) || (i.event.preventDefault(), O.mouseoutHandler[this.type](e, t), this.hovered = !1);
    };
  }
};
_ScrollItem.duration = 120;
_ScrollItem.mouseoverHandler = {
  horizon: (n, t) => {
    let e = AnimateManager.getInstance(), i = null;
    i = e.getAnimate(n.track, "mouseover"), i || (i = e.addAnimate(n.track, "mouseover", n.track.animate("shape", !1).when(_ScrollItem.duration, {
      y: n.trackPosition - t,
      height: n.trackLength + t
    }).done(() => {
      n.track.attr({
        shape: {
          y: n.trackPosition - t,
          height: n.trackLength + t
        }
      });
    })));
    let s = null;
    s = e.getAnimate(n.thumb, "mouseover"), s || (s = e.addAnimate(n.thumb, "mouseover", n.thumb.animate("shape", !1).when(_ScrollItem.duration, {
      y: n.thumbPosition - t,
      height: n.thumbLength + t
    }).done(() => {
      n.thumb.attr({
        shape: {
          y: n.thumbPosition - t,
          height: n.thumbLength + t
        }
      });
    }))), n.track.updateDuringAnimation("shape"), n.thumb.updateDuringAnimation("shape"), i.start(), s.start();
  },
  vertical: (n, t) => {
    let e = AnimateManager.getInstance(), i = null;
    i = e.getAnimate(n.track, "mouseover"), i || (i = e.addAnimate(n.track, "mouseover", n.track.animate("shape", !1).when(_ScrollItem.duration, {
      x: n.trackPosition - t,
      width: n.trackLength + t
    }).done(() => {
      n.track.attr({
        shape: {
          x: n.trackPosition - t,
          width: n.trackLength + t
        }
      });
    })));
    let s = null;
    s = e.getAnimate(n.thumb, "mouseover"), s || (s = e.addAnimate(n.thumb, "mouseover", n.thumb.animate("shape", !1).when(_ScrollItem.duration, {
      x: n.thumbPosition - t,
      width: n.thumbLength + t
    }).done(() => {
      n.thumb.attr({
        shape: {
          x: n.thumbPosition - t,
          width: n.thumbLength + t
        }
      });
    }))), n.track.updateDuringAnimation("shape"), n.thumb.updateDuringAnimation("shape"), i.start(), s.start();
  }
};
_ScrollItem.mouseoutHandler = {
  horizon: (n, t) => {
    let e = AnimateManager.getInstance(), i = null;
    i = e.getAnimate(n.track, "mouseout"), i || (i = e.addAnimate(n.track, "mouseout", n.track.animate("shape", !1).when(_ScrollItem.duration, {
      y: n.trackPosition,
      height: n.trackLength
    }).done(() => {
      n.track.attr({
        shape: {
          y: n.trackPosition,
          height: n.trackLength
        }
      });
    })));
    let s = null;
    s = e.getAnimate(n.thumb, "mouseout"), s || (s = e.addAnimate(n.thumb, "mouseout", n.thumb.animate("shape", !1).when(_ScrollItem.duration, {
      y: n.thumbPosition,
      height: n.thumbLength
    }).done(() => {
      n.thumb.attr({
        shape: {
          y: n.thumbPosition,
          height: n.thumbLength
        }
      });
    }))), n.track.updateDuringAnimation("shape"), n.thumb.updateDuringAnimation("shape"), i.start(), s.start();
  },
  vertical: (n, t) => {
    let e = AnimateManager.getInstance(), i = null;
    i = e.getAnimate(n.track, "mouseout"), i || (i = e.addAnimate(n.track, "mouseout", n.track.animate("shape", !1).when(_ScrollItem.duration, {
      x: n.trackPosition,
      width: n.trackLength
    }).done(() => {
      n.track.attr({
        shape: {
          x: n.trackPosition,
          width: n.trackLength
        }
      });
    })));
    let s = null;
    s = e.getAnimate(n.thumb, "mouseout"), s || (s = e.addAnimate(n.thumb, "mouseout", n.thumb.animate("shape", !1).when(_ScrollItem.duration, {
      x: n.thumbPosition,
      width: n.thumbLength
    }).done(() => {
      n.thumb.attr({
        shape: {
          x: n.thumbPosition,
          width: n.thumbLength
        }
      });
    }))), n.track.updateDuringAnimation("shape"), n.thumb.updateDuringAnimation("shape"), i.start(), s.start();
  }
};
let ScrollItem = _ScrollItem;
class ScrollView {
  render(t, e) {
    let i = [];
    return t.horizon && i.push(this.paintHorizon(t)), t.vertical && i.push(this.paintVertical(t)), i;
  }
  paintHorizon(t) {
    let e = new zrender.Rect({
      shape: {
        width: t.horizon.trackLength,
        height: t.horizon.height
      },
      style: d({
        fill: "#acacac60"
      }, t.horizon.trackStyle)
    }), i = new Thumb({
      shape: {
        y: 2,
        x: 2,
        width: t.horizon.thumbLength,
        height: t.horizon.height - 4
      },
      style: d({
        fill: "#acacac"
      }, t.horizon.thumbStyle)
    }, "horizon"), s = new ScrollItem(e, i, "horizon", t.scroll);
    return s.setHoverOffset(t.originOption.hoverOffset), t.scroll.setHorizonScroll(s), t.container.addBottom(s), s;
  }
  paintVertical(t) {
    let e = new zrender.Rect({
      shape: {
        height: t.vertical.trackLength,
        width: t.vertical.width
      },
      style: d({
        fill: "#acacac60"
      }, t.vertical.trackStyle)
    }), i = new Thumb({
      shape: {
        y: 2,
        x: 2,
        height: t.vertical.thumbLength,
        width: t.vertical.width - 4
      },
      style: d({
        fill: "#acacac"
      }, t.vertical.thumbStyle),
      draggable: !0
    }, "vertical"), s = new ScrollItem(e, i, "vertical", t.scroll);
    return s.setHoverOffset(t.originOption.hoverOffset), t.scroll.setVerticalScroll(s), t.container.addRight(s), s;
  }
}
class Scroll {
  constructor(t, e) {
    this.items = /* @__PURE__ */ new Set(), this.model = new ScrollModel(t, t), this.model.setScroll(this), this.view = new ScrollView(), this.model.setContainer(e);
  }
  setView(t) {
    this.view = t;
  }
  setModel(t) {
    this.model = t;
  }
  setTheme(t) {
  }
  setTarget(t, e) {
    t == "horizon" ? (this.horizonTarget = e, this.horizonPos = [e.x, e.y]) : (this.verticalTarget = e, this.verticalPos = [e.x, e.y]);
  }
  setVerticalScroll(t) {
    this.verticalScroll = t, t.scroll = this;
  }
  setHorizonScroll(t) {
    this.horizonScroll = t, t.scroll = this;
  }
  refresh() {
    this._uiInstance && this._uiInstance.forEach((t) => {
      t.parent.remove(t);
    }), this.model.refresh(), this._uiInstance = this.view.render(this.model, null), this.resetPosition();
  }
  horizonMove(t, e) {
    return this.horizonScroll.thumb.scrollTo(t, e);
  }
  verticalMove(t, e) {
    return this.verticalScroll.thumb.scrollTo(t, e);
  }
  moveTo(t, e, i) {
    return t == "horizon" ? this.horizonMove(e, i) : this.verticalMove(e, i);
  }
  resetPosition() {
    this.horizonTarget ? this.horizonTarget.setPosition(this.horizonPos || [0, 0]) : this._uiInstance[0] && this._uiInstance[0].parent.childAt(0).setPosition([0, 0]), this.verticalTarget ? this.verticalTarget.setPosition(this.verticalPos || [0, 0]) : this._uiInstance[1] && this._uiInstance[1].parent.childAt(0).setPosition([0, 0]);
  }
  setOption(t) {
    this.model.fullOption = t, this.model.originOption = t;
  }
}
const _EventManager = class X {
  static getInstance() {
    return X.instance;
  }
  constructor() {
  }
  /* public */
  publishedEvent(t) {
    if (!t || !this.listenerMap)
      return;
    let e = this.listenerMap.get(t.type), i = this.extraActionMap;
    e && e.forEach((s) => {
      s.handleEvent(t);
      let o = i.get(s);
      o && o.forEach((a) => {
        a.action(s, a.target);
      });
    });
  }
  registerListener(t) {
    if (!t)
      return;
    !this.listenerMap && this.initListenerMap();
    let e = this.listenerMap.get(t.eventType);
    e || (e = [], this.listenerMap.set(t.eventType, e)), e.push(t);
  }
  registerListenerByType(t, e) {
    if (!t)
      return;
    !this.listenerMap && this.initListenerMap();
    let i = this.listenerMap.get(e);
    t || (i = [], this.listenerMap.set(e, i)), i.push(t);
  }
  removeListener(t) {
    let e;
    if (this.listenerMap && (e = this.listenerMap.get(t.eventType))) {
      let i = e.indexOf(t);
      i >= 0 && e.splice(i, 1);
    }
  }
  removeListenerByType(t, e) {
    let i;
    if (this.listenerMap && (i = this.listenerMap.get(e))) {
      let s = i.indexOf(t);
      s >= 0 && i.splice(s, 1);
    }
  }
  registerAction(t, e) {
    let i = this.extraActionMap.get(t);
    i || (i = [], this.extraActionMap.set(t, i)), i.push(e);
  }
  /* private */
  initListenerMap() {
    this.listenerMap = /* @__PURE__ */ new Map(), this.extraActionMap = /* @__PURE__ */ new Map();
  }
};
_EventManager.instance = new _EventManager();
let EventManager = _EventManager;
const _FixedContainer = class W extends StackContainer {
  constructor(t, e, i, s) {
    super(), this.type = W.type, this.__origin_width = t, this.__origin_height = e, this.__overflow = i, this.__scrollOption = s || {}, this.calcWeightAndHeight(), this.initContentGroup(), this.refreshClipPath(), this.initEvent(), EventManager.getInstance().registerListener(this);
  }
  setScrollerOption(t) {
    this.__scrollOption = t, this.__scroll.setOption(t);
  }
  initContentGroup() {
    this.__content = new ContentContainer(this), this.add(this.__content);
  }
  refreshClipPath() {
    this.__clipPath = new zrender.Rect({
      shape: {
        width: this.__width,
        height: this.__height
      }
    }), this.setClipPath(this.__clipPath);
  }
  add(t) {
    let e = super.add(t);
    return this.refreshScroll(), e;
  }
  addContent(t) {
    let e = new ContentContainer(this);
    e.add(t);
    let i = this.__content.add(e);
    return this.realWidth = super.getBoundingRect().width, this.realHeight = super.getBoundingRect().height, this.refreshScroll(), i;
  }
  addContentHorizon(t) {
    let e = new ContentContainer(this);
    e.add(t);
    let i = this.__content.addHorizon(e);
    return this.realWidth = super.getBoundingRect().width, this.realHeight = super.getBoundingRect().height, this.refreshScroll(), i;
  }
  addContentVertical(t) {
    let e = new ContentContainer(this);
    e.add(t);
    let i = this.__content.addVertical(e);
    return this.realWidth = super.getBoundingRect().width, this.realHeight = super.getBoundingRect().height, this.refreshScroll(), i;
  }
  bindScroll(t, e) {
    !this.__scroll || !e.__scroll || (this.__scroll.items.add({
      type: t,
      scroll: e.__scroll
    }), e.__scroll.items.add({
      type: t,
      scroll: this.__scroll
    }));
  }
  addChild(t, e) {
    let i = super.add(t);
    return e && this.refreshScroll(), i;
  }
  addBottom(t) {
    let e = t.getBoundingRect().height;
    return t.setPosition([0, this.__height - e]), this.addChild(t, !1);
  }
  addRight(t) {
    let e = t.getBoundingRect().width;
    return t.setPosition([this.__width - e, 0]), this.addChild(t, !1);
  }
  refresh() {
    super.refresh();
  }
  resize(t, e) {
    super.resize(t, e), t && (this.__origin_width = t), e && (this.__origin_height = e), this.calcWeightAndHeight(), this.refreshClipPath(), this.refreshScroll(), this.__scroll && this.__scroll.resetPosition();
  }
  getBoundingRect(t) {
    return this.__clipPath ? this.__clipPath.getBoundingRect() : new zrender.BoundingRect(0, 0, this.__width, this.__height);
  }
  getOriginBoundingRect(t) {
    return super.getBoundingRect(t);
  }
  calcWeightAndHeight() {
    if (this.__width = parseFloat(this.__origin_width), this.__height = parseFloat(this.__origin_height), this.parent && this.parent instanceof ContentContainer) {
      let t = this.parent.container;
      isString(this.__origin_width) && (this.__width = t.__width * (parseFloat(this.__origin_width.split("%")[0]) / 100)), isString(this.__origin_height) && (this.__height = t.__height * (parseFloat(this.__origin_height.split("%")[0]) / 100));
    }
  }
  refreshScroll() {
    this.__overflow != "hidden" && (!this.__scroll && (this.__scroll = new Scroll(this.__scrollOption || {}, this)), this.__scroll.model.setOption(this.__scrollOption), this.__scroll.refresh());
  }
  initEvent() {
    let t = this;
    this.onmousewheel = (e) => {
      e.stop(), e.event.preventDefault(), t.__scroll && (e.event.shiftKey ? t.__scroll.moveTo("horizon", -5 * e.wheelDelta) : t.__scroll.moveTo("vertical", -5 * e.wheelDelta));
    };
  }
};
_FixedContainer.type = "FixedContainer";
let FixedContainer = _FixedContainer;
class ContentContainer extends StackContainer {
  constructor(t) {
    super(), this.container = t;
  }
}
class Coord {
  constructor(t) {
    this.timeScale = t;
  }
  refresh() {
    this.initStartPosition(), this.initAccuracy();
  }
  setTimeScale(t) {
    this.timeScale = t;
  }
  xToDate(t) {
    let e = Math.floor(t / this.accuracy);
    return _global_moment(this.timeScale.model.start).add(e, this.accuracyUnit).toDate();
  }
  dateToX(t) {
    return t ? Math.ceil(_global_moment(t).diff(_global_moment(this.startDate), this.accuracyUnit)) * this.accuracy : void 0;
  }
  initStartPosition() {
    this.startDate = this.timeScale.model.start, this.startPosition = this.timeScale.container.x;
  }
  initAccuracy() {
    this.accuracyUnit = this.timeScale.model.fullOption.accuracy;
    let t = 1e13, e = this.timeScale.getTimeLineWidth(), i = _global_moment(this.timeScale.model.end).diff(_global_moment(this.timeScale.model.start), this.accuracyUnit);
    this.accuracy = Math.round(e / i * t) / t;
  }
  initEvent() {
    let t = this;
    this.timeScale.container.onclick = (e) => {
      let i = t.timeScale.container.__content.x, s = e.event.zrX - t.startPosition - i;
      console.log(s, t.xToDate(s).toLocaleString());
    };
  }
}
const _ComponentManager = class k {
  constructor() {
    this.componentMap = /* @__PURE__ */ new Map();
  }
  static registerInstance(t) {
    k.instanceMap.set(t, new k());
  }
  static getInstance(t) {
    return k.instanceMap.get(t);
  }
  componentRegister(t, e) {
    this.componentMap.set(t, e);
  }
  getComponent(t) {
    return this.componentMap.get(t);
  }
};
_ComponentManager.instanceMap = /* @__PURE__ */ new Map();
let ComponentManager = _ComponentManager;
class MarkItem {
}
const _DateMark = class j extends MarkItem {
  constructor(t) {
    super(), this.type = j.type, this.date = _global_moment(t.date).toDate(), this.lineStyle = t.lineStyle, this.textStyle = t.textStyle, this.length = t.length, this.content = t.text;
  }
  paint() {
    let t = this, e = ComponentManager.getInstance(this.jcGantt).getComponent(TimeScale.type), i = e.getTimeLineHeight(), o = e.coord.dateToX(this.date);
    return this.group = new zrender.Group({ silent: !0 }), this.line = new zrender.Line({
      shape: {
        x1: o,
        y1: i,
        x2: o,
        y2: t.length
      },
      style: d({
        lineWidth: 1.2,
        lineDash: "dashed",
        stroke: "#000"
      }, t.lineStyle)
    }), this.text = new zrender.Text({
      style: d({
        x: o,
        y: t.length,
        text: t.content,
        padding: 5,
        backgroundColor: "#acacac",
        align: "center"
      }, t.textStyle)
    }), this.group.add(this.line), this.group.add(this.text), this.group;
  }
};
_DateMark.type = "DateMark";
let DateMark = _DateMark;
const _MarkTypeManager = class I {
  constructor() {
  }
  static registerMarkType(t, e) {
    I.typeMap.set(t, e);
  }
  static getMarkItem(t, e) {
    let i = null, s = I.typeMap.get(t);
    return isFunction(s) && (i = s(e)), i;
  }
};
_MarkTypeManager.typeMap = (/* @__PURE__ */ new Map()).set(DateMark.type, (n) => new DateMark(n));
let MarkTypeManager = _MarkTypeManager;
class MarkModel extends Model {
  constructor(t) {
    super(t, t), this.items = [];
  }
  init() {
    let t = this;
    if (this.items = [], this.originOption.marks) {
      let e = null;
      this.originOption.marks.forEach((i) => {
        e = MarkTypeManager.getMarkItem(i.type, i.arg), e && (e.jcGantt = t.jcGantt, t.items.push(e));
      });
    }
  }
  refresh() {
    this.init();
  }
  setOption(t) {
    this.originOption = t;
  }
}
class MarkView {
  render(t, e) {
    let i = new zrender.Group();
    return t.items.forEach((s) => {
      i.add(s.paint());
    }), [i];
  }
}
const _Mark = class V {
  constructor(t, e) {
    this.type = V.type, this.jcGantt = t, this.option = clone(e), this.model = new MarkModel(e), this.model.jcGantt = this.jcGantt, this.view = new MarkView(), this.container = ComponentManager.getInstance(this.jcGantt).getComponent(TimeScale.type).getMarkContainer();
  }
  refresh() {
    this.container || (this.container = ComponentManager.getInstance(this.jcGantt).getComponent(TimeScale.type).getMarkContainer()), this.container.removeAll(), this.model.refresh(), this._uiInstance = this.view.render(this.model, null), this._uiInstance.forEach((t) => {
      this.container.add(t);
    });
  }
  setOption(t) {
  }
  setTheme(t, e) {
  }
};
_Mark.type = "Mark";
let Mark = _Mark;
const _ContextMenu = class E {
  static getInstance() {
    return E.instance;
  }
  constructor() {
    this.dom = this.createContextMenu();
  }
  show(t, e, i) {
    this.dom.remove(), this.dom = null, this.dom || (this.dom = this.createContextMenu());
    let s = this;
    i && i.length && i.forEach((l) => {
      s.addItem(l);
    }), this.dom.classList.remove("hide_real");
    let o = window.innerWidth;
    window.innerHeight >= e + this.dom.clientHeight ? this.dom.style.top = e + "px" : this.dom.style.top = e - this.dom.clientHeight + "px", t + this.dom.clientWidth <= o ? this.dom.style.left = t + "px" : this.dom.style.left = t - this.dom.clientWidth + "px";
  }
  hide() {
    this.dom || (this.dom = this.createContextMenu()), this.dom.classList.add("hide_real");
  }
  refresh() {
  }
  setOption(t) {
  }
  setTheme(t, e) {
  }
  createContextMenu() {
    if (this.dom)
      return this.dom;
    let t = document.body;
    if (!t)
      return null;
    let e = document.createElement("div");
    return e.classList.add("content-menu", "hide_real"), t.append(e), e;
  }
  addItem(t) {
    let e = document.createElement("div");
    e.classList.add("content-menu-item"), t.cls && e.classList.add(t.cls);
    let i = t.style ? t.style() : {};
    for (let l in i)
      e.style[l] = i[l];
    t.disabled && t.disabled() && e.classList.add("content-menu-item-forbid"), e.onclick = function() {
      t.handler && t.handler(), E.getInstance().hide();
    };
    let s = document.createElement("i");
    s.classList.add("content-menu-item-icon");
    let o = document.createElement("img");
    t.icon && (o.src = t.icon), s.append(o), e.append(s);
    let a = document.createElement("span");
    a.classList.add("content-menu-item-text"), a.innerHTML = t.text || "", e.append(a), this.dom.append(e);
  }
};
_ContextMenu.instance = new _ContextMenu();
let ContextMenu = _ContextMenu;
const _TimeScale = class S {
  constructor(t, e) {
    this.type = S.type, this.zrInstance = t;
    let i = d(d({}, S.defaultOption), e);
    this.model = new TimeScaleModel(i), this.view = new TimeScaleView(), this.container = new FixedContainer(i.width, i.height), this.container.setScrollerOption(i.scroll), this.tierContainer = new TierContainer(3), this.tierContainer.setTierName(1, S.background), this.tierContainer.setTierContainer(1, new TierContainer(2)), this.tierContainer.setTierName(2, this.type), this.backGround = new Grid(this.model.fullOption.grid, this), this.container.setComponent(this.backGround), this.coord = new Coord(this), this.container.__scroll.setTarget("vertical", this.tierContainer.getContainer(1)), this.initEvent(), EventManager.getInstance().registerAction(this.container, {
      target: this.coord,
      action: (s, o) => {
        o.refresh();
      }
    });
  }
  getOffsetX() {
    return this.container.__content.x;
  }
  getOffsetY() {
    return this.tierContainer.getContainer(1).y;
  }
  getMarkContainer() {
    return this.tierContainer.getContainer(3);
  }
  getTimeLineContainer() {
    return this.tierContainer.getContainer(2);
  }
  getTimeLineHeight() {
    return this.getTimeLineContainer().getBoundingRect().height;
  }
  getTimeLineWidth() {
    return this.getTimeLineContainer().getBoundingRect().width;
  }
  getStartX() {
    return this.container.x;
  }
  getBackGroundContainer() {
    return this.tierContainer.getContainer(1).getContainer(1);
  }
  getTaskContainer() {
    return this.tierContainer.getContainer(1).getContainer(2);
  }
  setTable(t) {
    this.table = t;
  }
  isEdge(t, e) {
    let i = this.getStartX(), s = this.getTimeLineHeight(), o = this.container.__width - 10, a = this.container.__height - s - 10;
    return t - i <= 0 ? "left" : t - i >= o ? "right" : e - s <= 0 ? "top" : e - s >= a ? "bottom" : null;
  }
  zoom(t) {
    if (t <= 0)
      throw new Error("The value of multiple must be a number greater than zero.(放大倍速必须是一个大于零的整数)");
    this.model._timeBase = this.model._timeBase * t, this.refresh();
  }
  setDateRange(t, e) {
    this.model.fullOption.start = t, this.model.fullOption.end = e, this.model.fullOption.days = -60, this.refresh();
  }
  setTimeUnit(t, e) {
    this.model._timeBase = t, this.model._timeUnit = e, this.refresh();
  }
  refresh() {
    let t = this;
    this.model.refresh(), this.tierContainer.getContainerByName(this.type).removeAll(), this._uiInstance = this.view.render(this.model, this.zrInstance), this._uiInstance.forEach((i) => {
      t.tierContainer.addHorizonToByName(i, t.type);
    }), this.backGround && (this.backGround.setContainer(this.getBackGroundContainer()), this.backGround.refresh()), this.container.addContent(this.tierContainer), this.coord.refresh();
    let e = ComponentManager.getInstance(this.jcGantt).getComponent(Mark.type);
    e && e.refresh(), this.taskBuilder && this.taskBuilder.refresh();
  }
  setTheme(t, e) {
    if (this.model.fullOption = clone(this.model.option), t) {
      let i = clone(t), s = i.timeLine.scales;
      delete i.timeLine.scales;
      let o = this.model.fullOption;
      applyTo(i.timeLine, o, e), o.scales && o.scales.forEach((a) => {
        applyTo(s, a, e);
      });
    }
    this.model.originOption = this.model.fullOption, this.container.setScrollerOption(this.model.fullOption.scroll), this.container.__scroll.refresh(), this.backGround.setOption(this.model.fullOption.grid), this.taskBuilder.setTheme(t, e), this.refresh();
  }
  setOption(t) {
  }
  initEvent() {
    let t = this, e = this.container.onmousewheel;
    this.container.onmousewheel = (i) => {
      i.stop(), i.event.preventDefault(), i.event.ctrlKey ? i.wheelDelta < 0 ? t.zoom(1.1) : t.zoom(0.9) : e && e(i);
    }, this.initContentMenu();
  }
  initContentMenu() {
    let t = this;
    this.container.oncontextmenu = (e) => {
      e.stop(), e.event.preventDefault(), t.model.originOption.contextmenu ? ContextMenu.getInstance().show(e.event.clientX, e.event.clientY, t.model.originOption.contextmenu) : ContextMenu.getInstance().hide();
    };
  }
};
_TimeScale.type = "timeScale";
_TimeScale.background = "background";
_TimeScale.defaultFormatter = {
  second: "YY/MM/DD HH:mm:ss",
  minute: "YY/MM/DD HH:mm",
  hour: "YY/MM/DD HH时",
  day: "YY/MM/DD",
  week: "YY年W周",
  month: "YY年MM月",
  year: "YYYY年"
};
_TimeScale.defaultOption = {
  width: "80%",
  height: "100%",
  baseWidth: 65,
  accuracy: "second",
  days: 60,
  grid: {},
  scales: [
    {
      symbol: "day",
      formatter: "yy/MM/DD",
      commonStyle: {
        backgroundColor: "#1ba78480",
        borderColor: "#1ba784"
      },
      style: (n) => {
        let t = _global_moment(n.start);
        if (_global_moment().isBetween(t, _global_moment(n.end), "minute", "[]"))
          return {
            backgroundColor: "#bacf65"
          };
        if (t.day() != 6 && t.day() != 0)
          return {
            backgroundColor: "#f5960080"
          };
      }
    }
  ],
  scroll: {
    thickness: 6,
    hoverOffset: 10,
    trackStyle: {
      fill: "#1ba78450"
    },
    thumbStyle: {
      fill: "#1ba78490"
    }
  }
};
let TimeScale = _TimeScale;
class Row {
  constructor(t, e, i, s) {
    this.tasks = [], this.keyId = i, this.container = new TierContainer(2), this.data = t, this.rowBuilder = e, this.render(s);
    let o = this, a = ComponentManager.getInstance(this.rowBuilder.table.jcGantt).getComponent(Table.type);
    this.container.onclick = (l) => {
      l.stop(), l.event.preventDefault(), l.event.ctrlKey ? a.ctrlSelect(o) : l.event.shiftKey ? a.shiftSelect(o) : a.selectRow(o);
    };
  }
  /* public */
  render(t) {
    let e = this.rowBuilder.colOpt, i = this, s = i.rowBuilder.rowOpt.height;
    e.forEach((o) => {
      i.container.addHorizonTo(
        new zrender.Text({
          silent: !0,
          style: d(d(d({
            text: i.data[o.prop],
            backgroundColor: "#ffffff00",
            width: o.width || 100,
            x: o.width / 2 || 50,
            height: s,
            lineHeight: s,
            fontSize: 16,
            align: "center"
          }, i.rowBuilder.rowOpt.commonStyle ? i.rowBuilder.rowOpt.commonStyle.textStyle || {} : {}), i.rowBuilder.rowOpt.style ? i.rowBuilder.rowOpt.style(i.data).textStyle : {}), t ? t.textStyle : {})
        }),
        2
      );
    }), this.container.addTo(i.rect = new zrender.Rect({
      shape: {
        width: i.container.getBoundingRect().width,
        height: s
      },
      style: d(d(d({
        stroke: "#acacac",
        fill: "#fff"
      }, i.rowBuilder.rowOpt.commonStyle ? i.rowBuilder.rowOpt.commonStyle.rowStyle || {} : {}), i.rowBuilder.rowOpt.style ? i.rowBuilder.rowOpt.style(i.data).rowStyle : {}), t ? t.rowStyle : {})
    }), 1), !t && addHover(i.rect, "style", this.rowBuilder.rowOpt.hoverStyle.rowStyle);
  }
  getY() {
    return this.rowBuilder.table.rowGroup.parent.y + this.container.y;
  }
  restoreStyle() {
    let t = this.rowBuilder.rowOpt, e = t.commonStyle || {}, i = t.style, s;
    isFunction(i) && (s = i(this.data));
    let o = d(d({
      stroke: "#acacac",
      fill: "#fff"
    }, e.rowStyle), s ? s.rowStyle : {});
    this.rect.dirty(), this.rect.attr("style", o);
  }
  getTasks() {
    return this.tasks;
  }
  getTaskByDate(t) {
    let e = null, i, s, o, a = _global_moment(t);
    for (let l = 0, h = this.tasks.length; l < h; l++)
      if (o = this.tasks[l], i = _global_moment(o.task.start), s = _global_moment(o.task.end), a.isBetween(i, s, "second", "[]")) {
        e = o;
        break;
      }
    return e;
  }
  /* private */
}
class RowBuilder {
  constructor(t) {
    this.table = t;
  }
  createRow(t, e, i) {
    return new Row(t, this, e, i);
  }
  createHead() {
  }
  init(t, e, i) {
    this.colOpt = t, this.rowOpt = e, this.background = i;
  }
}
class TableItem {
  constructor(t) {
    this.rows = [], this.table = t, this.container = new TierContainer(2), this.tableRect = new zrender.Rect({
      shape: {
        width: t.container.__width,
        height: t.container.__height
      },
      style: d({
        fill: "none"
      }, t.option.style)
    }), this.container.addTo(this.tableRect, 1), this.rowBuilder = new RowBuilder(this.table), this.rowBuilder.init(t.option.column, t.option.row, this.tableRect), this.rows = [];
  }
  render(t) {
    return H(this, null, function* () {
      let e = this, i = this.rowBuilder, s = {};
      this.table.option.column.forEach((h) => {
        s[h.prop] = h.name;
      });
      let a, l = this.table.option.headStyle;
      if (this.table.timescale && (a = this.table.timescale.tierContainer.getContainer(2).realHeight, l.textStyle.height = a, l.textStyle.lineHeight = a), !t && this.addRow(new zrender.Group({ silent: !0 }).add(i.createRow(s, 0, l).container)), t) {
        let h = this.table.rows;
        this.renderRow(h);
      } else
        yield this.table.getData().then((h) => {
          e.renderRowData(h);
        });
    });
  }
  renderRowData(t) {
    let e = this, i = this.rowBuilder, s = new zrender.Group();
    this.rowWrapper = new StackContainer();
    let o = this.rowWrapper, a, l = 1;
    t.forEach((h) => {
      a = i.createRow(h, l++), e.rows.push(a), o.addVertical(a.container);
    }), s.add(o), s.setClipPath(new zrender.Rect({
      shape: {
        x: 0,
        y: 0,
        width: s.getBoundingRect().width,
        height: s.getBoundingRect().height
      }
    })), e.addRow(s);
  }
  renderRow(t) {
    let e = this.rowWrapper;
    e.removeAll(), t.forEach((i) => {
      i.ignore || e.addVertical(i.container);
    }), this.rows = t;
  }
  addRow(t) {
    this.container.addVerticalTo(t, 2), this.updateTableRect();
  }
  getRowGroup() {
    return this.container.getContainer(2).childAt(1).childAt(0);
  }
  getHeadGroup() {
    return this.container.getContainer(2).childAt(0);
  }
  updateTableRect() {
    let t = this.container.getContainer(2).getBoundingRect().height, e = this.container.getContainer(2).getBoundingRect().width, i = this.tableRect.shape;
    i.height = t, i.width = e, this.tableRect.attr("shape", i);
  }
}
const _Table = class __Table {
  constructor(n, t) {
    this.type = __Table.type, this.rows = [], this.selections = [], this.timescale = t;
    let e = d(d({}, __Table.defaultOption), n || {});
    this.option = e, this.originOption = clone(e), this.container = new FixedContainer(e.width, e.height, "auto", e.scroll), this.container.setComponent(this), this.initContentMenu();
  }
  setTheme(n, t) {
    this.option = clone(this.originOption), n && applyTo(n.table, this.option, t), this.container.setScrollerOption(this.option.scroll), this.container.__scroll.refresh(), this.taskBuilder.setTheme(n, t), this.refresh();
  }
  getCurrentData() {
    let n = [], t;
    return this.getRows().forEach((i) => {
      t = i.data, t.tasks = [], i.tasks.forEach((s) => {
        s.task.start = _global_moment(s.task.start).format("yyyy/MM/DD HH:mm:ss"), s.task.end = _global_moment(s.task.end).format("yyyy/MM/DD HH:mm:ss"), t.tasks.push(s.task);
      }), n.push(t);
    }), n;
  }
  setTimeScale(n) {
    this.timescale = n, this.timescale.setTable(this), this.container.bindScroll("vertical", n.container);
  }
  refresh(n) {
    let t = this;
    !n && (this.tableItem = new TableItem(this));
    let e = this.tableItem;
    e.render(n).then(() => {
      if (!n) {
        t.container.__content.removeAll();
        let s = e.container;
        t.rows = e.rows, t.rowGroup = e.getRowGroup(), t.headGroup = e.getHeadGroup(), t.container.addContent(s), t.container.__scroll.setTarget("vertical", e.getRowGroup());
      }
      e.updateTableRect();
      let i = ComponentManager.getInstance(t.jcGantt).getComponent(TimeScale.type);
      i.backGround.setTable(t), i.refresh(), t.selections = [];
    });
  }
  getData() {
    if (this.option.loadData) {
      let n = this, t = this.timescale;
      return new Promise((e, i) => {
        n.option.loadData(t ? t.model.start : null, t ? t.model.end : null, e);
      });
    } else
      return new Promise((n, t) => {
        n(
          this.option.data ? clone(this.option.data) : []
        );
      });
  }
  /**
   * @param filter 格式为'object.property == value'
   */
  filterData(filter) {
    this.rows.forEach((r) => {
      r.data, r.ignore = !eval(filter);
    }), this.refresh(!0);
  }
  getRowOffsetY() {
    return this.rowGroup.y;
  }
  getHeadHeight() {
    return this.headGroup.getBoundingRect().height;
  }
  getHeight() {
    return this.getHeadHeight() + this.rowGroup.getBoundingRect().height;
  }
  getRowByPos(n) {
    let t = null;
    if (this.rows && this.rows.length > 0) {
      let e, i, s;
      for (let o = 0; o < this.rows.length; o++)
        if (e = this.rows[o], i = e.getY(), s = e.container.getBoundingRect().height, i <= n && n <= i + s) {
          t = e;
          break;
        }
    }
    return t;
  }
  clearSelections() {
    this.selections.length && (this.selections.forEach((n) => {
      n.restoreStyle(), n.rect.hoverForbid = !1;
    }), this.selections = []);
  }
  removeSelection(n) {
    n.restoreStyle(), n.rect.hoverForbid = !1, this.selections.splice(this.selections.indexOf(n), 1);
  }
  selectRow(n) {
    n && (n.rect.hoverForbid = !0, !(this.selections.length == 1 && this.selections.indexOf(n) >= 0) && (this.clearSelections(), this.addRowToSelection(n)));
  }
  ctrlSelect(n) {
    if (this.selections.length == 0)
      return this.selectRow(n);
    if (this.selections.indexOf(n) >= 0) {
      this.removeSelection(n);
      return;
    }
    this.addRowToSelection(n);
  }
  shiftSelect(n) {
    if (this.selections.length == 0)
      return this.selectRow(n);
    let t = this, e = this.selections[0].keyId, i = n.keyId, s = Math.max(e, i), o = Math.min(e, i);
    this.clearSelections(), this.rows.forEach((a) => {
      a.keyId >= o && a.keyId <= s && t.addRowToSelection(a);
    });
  }
  selectAll() {
    this.rows.forEach((n) => {
      this.addRowToSelection(n);
    });
  }
  getSelection() {
    return this.selections;
  }
  updateData(n) {
    this.option.data = n, this.refresh();
  }
  setOption(n) {
  }
  getRows() {
    return this.rows;
  }
  addRowToSelection(n) {
    n.rect.hoverForbid = !0;
    let t = this.option.row.selectStyle, e;
    isFunction(t) && (e = t(n.data)), n.rect.dirty(), n.rect.attr("style", e && e.rowStyle ? e.rowStyle : { fill: "#f59600" }), this.selections.push(n);
  }
  initContentMenu() {
    let n = this;
    this.container.oncontextmenu = (t) => {
      t.stop(), t.event.preventDefault(), n.originOption.contextmenu ? ContextMenu.getInstance().show(t.event.clientX, t.event.clientY, n.originOption.contextmenu) : ContextMenu.getInstance().hide();
    };
  }
};
_Table.type = "table";
_Table.defaultOption = {
  show: !0,
  width: "20%",
  height: "100%",
  column: [
    {
      name: "姓名",
      prop: "name",
      width: 100
    },
    {
      name: "年龄",
      prop: "age",
      width: 50
    },
    {
      name: "家庭住址",
      prop: "addr",
      width: 200
    },
    {
      name: "联系电话",
      prop: "phone",
      width: 150
    }
  ],
  row: {
    height: 50,
    commonStyle: {
      textStyle: {
        fill: "#000",
        fontSize: 20,
        borderColor: "#acacac",
        borderWidth: 0.1
      }
    },
    hoverStyle: {
      rowStyle: {
        fill: "#1ba78460"
      },
      textStyle: {
        fill: "#fff"
      }
    },
    quickTip: (n) => {
      let t = "";
      for (let e in n)
        t += e + ":" + n[e] + `
`;
      return t;
    }
  },
  headStyle: {
    textStyle: {
      // height:200,
      fontWeight: "bold",
      borderColor: "#1ba784",
      borderWidth: 0.1,
      backgroundColor: "#f5960080"
      // lineHeight:200
    },
    rowStyle: {
      fill: "#f5960000",
      stroke: "none"
    }
  },
  style: {
    stroke: "#1ba784"
  },
  scroll: {
    thickness: 6,
    hoverOffset: 10,
    trackStyle: {
      fill: "#1ba78450"
    },
    thumbStyle: {
      fill: "#1ba78490"
    }
  }
};
let Table = _Table;
class VirtualRect extends zrender.Rect {
  constructor(t) {
    super(), this.source = t, this.init();
  }
  init() {
    if (!this.source)
      return;
    let t = this.source.getBoundingRect();
    this.shape = {
      x: 0,
      y: 0,
      width: t.width,
      height: t.height
    }, this.zlevel = 999, this.style = this.source.style;
  }
}
const _AxisPoint = class q {
  constructor(t) {
    this.type = q.type, this.container = t, this.group = new zrender.Group(), this.lineX = new zrender.Line({
      shape: {
        x1: this.startX,
        y1: this.startY,
        x2: this.startX,
        y2: this.endY
      },
      style: {
        stroke: "#00000090",
        lineWidth: 1,
        lineDash: "dashed"
      },
      zlevel: 1e3
    }), this.lineY = new zrender.Line({
      shape: {
        x1: this.startX,
        y1: this.startY,
        x2: this.endX,
        y2: this.startY
      },
      style: {
        stroke: "#00000090",
        lineWidth: 1,
        lineDash: "dashed"
      },
      zlevel: 1e3
    }), this.tipX = new zrender.Text({
      style: {
        x: this.endX,
        y: this.endY,
        text: "This is a tip for x axis",
        padding: 5,
        backgroundColor: "#acacac"
      },
      zlevel: 1e3
    }), this.tipY = new zrender.Text({
      style: {
        x: this.endX,
        y: this.endY,
        text: "This is a tip for y axis",
        padding: 5,
        backgroundColor: "#acacac"
      },
      zlevel: 1e3
    }), this.group.add(this.lineX), this.group.add(this.lineY), this.group.add(this.tipX), this.group.add(this.tipY), this.group.hide(), this.container.add(this.group);
  }
  setTheme(t) {
  }
  addToContainer() {
    this.container.add(this.group);
  }
  setEnd(t, e) {
    this.endX = t, this.endY = e;
  }
  show(t, e, i, s, o) {
    let a = ComponentManager.getInstance(this.jcGantt).getComponent(TimeScale.type), l = a.getOffsetX(), h = a.getOffsetY();
    this.group.show(), this.startX = t, this.startY = e, this.lineX.attr("shape", {
      x1: this.startX,
      y1: this.startY,
      x2: this.startX,
      y2: this.endY - h
    }), this.lineY.attr("shape", {
      x1: this.startX,
      y1: this.startY,
      x2: this.endX - l,
      y2: this.startY
    }), this.tipX.attr("style", {
      x: this.startX,
      y: this.endY - h,
      text: i,
      backgroundColor: colors[o]
    }), this.tipY.attr("style", {
      x: this.endX - l,
      y: this.startY,
      text: s,
      backgroundColor: colors[o]
    });
  }
  hide() {
    this.group.hide();
  }
  refresh() {
  }
  setOption(t) {
  }
};
_AxisPoint.type = "AxisPoint";
let AxisPoint = _AxisPoint;
class TaskItem extends zrender.Group {
  constructor(t, e, i, s, o, a, l, h, c) {
    super(), this.jcGantt = t, this.container = e, this.option = i, this.row = s, this.task = o, this.x = a, this.y = l, this.width = h, this.height = c, this.init(), Tooltip.init(this);
  }
  init() {
    let t = this;
    this.removeAll();
    let e = this.option;
    this.rect = new zrender.Rect({
      shape: {
        width: t.width,
        height: t.height
      },
      style: d({}, isFunction(e.taskStyle) ? e.taskStyle(t.task, t.row.data) : {})
    }), this.text = new zrender.Text({
      style: d({
        text: isFunction(e.text) ? e.text(t.task, t.row.data) : t.task.text,
        x: t.width / 2,
        width: t.width,
        height: t.height,
        align: "center",
        lineHeight: t.height,
        overflow: "truncate"
      }, isFunction(e.textStyle) ? e.textStyle(t.task, t.row.data) : {})
    }), this.add(this.rect), this.add(this.text), this.setPosition([t.x, t.y]), this.initEvent();
  }
  initMove() {
    let t = this;
    this.virtualItem || (t.virtualItem = new VirtualRect(t.rect), t.add(t.virtualItem)), this.dragLine || (t.dragLine = new zrender.Line({
      style: {
        lineWidth: 2,
        stroke: t.rect.style.fill,
        lineDash: "dashed"
      },
      zlevel: 999
    }), t.add(t.dragLine));
  }
  initEvent() {
    let t = this;
    this.onmousedown = (e) => {
      if (e.event.button || e.event.ctrlKey)
        return;
      e.stop(), e.event.preventDefault(), Tooltip.forbid(), t.mousedown = !0;
      let i = t.width, s = t.height / 2, o = e.offsetX, a = e.offsetY, l = !1, h, c, u;
      document.onmousemove = (g) => {
        g.preventDefault(), this.initMove();
        let p = t.mouseMove(g, o, a, i, s);
        p && (h = p.row, c = p.date, o = p.x, a = p.y, l = p.success, u = p.task);
      }, document.onmouseup = (g) => {
        if (g.preventDefault(), !t.mousedown)
          return;
        ComponentManager.getInstance(t.jcGantt).getComponent(AxisPoint.type).hide(), t.virtualItem && t.remove(t.virtualItem), t.dragLine && t.remove(t.dragLine), t.timer && clearInterval(t.timer), t.mousedown = !1, document.onmousemove = null, document.onmouseup = null, l && t.drop(t.task, t.row, u, h, c), Tooltip.allow();
      };
    }, this.onclick = (e) => {
      e.stop(), e.event.preventDefault(), t.dirty();
      let i = ComponentManager.getInstance(t.jcGantt).getComponent(TaskBuilder.type);
      e.event.ctrlKey ? i.ctrlSelect(t) : i.selectTask(t);
    };
  }
  drop(t, e, i, s, o) {
    let a = this, l = this.option.onDrag;
    new Promise(function(h, c) {
      isFunction(l) ? l(t, e.data, i ? i.task : null, s ? s.data : {}, o, h) : h();
    }).then(function() {
      ComponentManager.getInstance(a.jcGantt).getComponent(Table.type).refresh();
    }).catch(function(h) {
      console.log(h);
    });
  }
  rePosition(t, e, i) {
    let s = ComponentManager.getInstance(this.jcGantt).getComponent(TimeScale.type).coord, o = _global_moment(this.task.end).diff(this.task.start, "second");
    this.task.start = i, this.task.end = _global_moment(i).add(o, "second").toDate();
    let a = s.dateToX(i), l = s.dateToX(this.task.end), h = e.container.getBoundingRect().height - 8, c = e.getY() + 4;
    this.x = a, this.y = c, this.width = l - a, this.height = h, this.init(), t.tasks.splice(t.tasks.indexOf(this), 1), e.tasks.push(this), this.row = e;
  }
  mouseMove(t, e, i, s, o) {
    let a = this, l, h, c;
    if (t.preventDefault(), !t.zrX && t.zrX != 0 || !t.zrY && t.zrY != 0)
      return;
    let u = a.virtualItem, g = a.dragLine, p = ComponentManager.getInstance(a.jcGantt), m = p.getComponent(Table.type), w = p.getComponent(AxisPoint.type), f = p.getComponent(TimeScale.type), $ = f.coord, M = "", x;
    h = $.xToDate(u.x + u.parent.x), m && m.option.row && isFunction(m.option.row.quickTip) && (l = m.getRowByPos(u.y + u.parent.y), l && (M = m.option.row.quickTip(l.data), c = l.getTaskByDate(h))), x = h.toLocaleString();
    let L = "error", _;
    isFunction(a.option.allowDrag) && (_ = a.option.allowDrag(a.task, a.row.data, c ? c.task : null, l ? l.data : null, h), _.allow && (L = "success"), _.messageX && (x = _.messageX), _.messageY && (M = _.messageY)), u.dirty(), u.setPosition([u.x + t.offsetX - e, u.y + t.offsetY - i]), g.attr("shape", {
      x1: s,
      y1: o,
      x2: u.x,
      y2: u.y
    }), w.show(u.x + u.parent.x, u.y + u.parent.y, x, M, L), e = t.offsetX, i = t.offsetY;
    let b = f.isEdge(t.zrX, t.zrY);
    return b ? !a.timer && (a.timer = setInterval(function() {
      let T = 0;
      b == "right" ? T = f.container.__scroll.moveTo("horizon", 2) : b == "left" ? T = f.container.__scroll.moveTo("horizon", -2) : b == "top" ? T = f.container.__scroll.moveTo("vertical", -2) : b == "bottom" && (T = f.container.__scroll.moveTo("vertical", 2)), a.rePosVirtualRect(b, T);
    }, 20)) : (clearInterval(a.timer), a.timer = null), {
      row: l,
      date: h,
      x: e,
      y: i,
      success: _.allow,
      task: c
    };
  }
  rePosVirtualRect(t, e) {
    if (!e)
      return;
    let i = this.virtualItem, s = this.dragLine;
    switch (i.dirty(), t) {
      case "left":
        i.setPosition([i.x + e, i.y]);
        break;
      case "right":
        i.setPosition([i.x + e, i.y]);
        break;
      case "top":
        i.setPosition([i.x, i.y + e]);
        break;
      case "bottom":
        i.setPosition([i.x, i.y + e]);
        break;
    }
    s.attr("shape", {
      x1: s.shape.x1,
      y1: s.shape.y1,
      x2: i.x,
      y2: i.y
    });
    let o = ComponentManager.getInstance(this.jcGantt), a = o.getComponent(Table.type), l = o.getComponent(AxisPoint.type), c = o.getComponent(TimeScale.type).coord, u = "", g, p, m;
    a && a.option.row && isFunction(a.option.row.quickTip) && (p = a.getRowByPos(i.y + i.parent.y), p && (u = a.option.row.quickTip(p.data))), m = c.xToDate(i.x + i.parent.x), g = m.toLocaleString();
    let w = "error", f;
    isFunction(this.option.allowDrag) && (f = this.option.allowDrag(this.task, this.row.data, p ? p.getTaskByDate(m).task : null, p ? p.data : null, m), f.allow && (w = "success"), f.messageX && (g = f.messageX), f.messageY && (u = f.messageY)), l.show(i.x + i.parent.x, i.y + i.parent.y, g, u, w);
  }
  getTooltip() {
    return isFunction(this.option.tooltip) ? this.option.tooltip(this.task, this.row.data) : this.task.text;
  }
  select() {
    let t = this;
    !this.selectRect && (this.selectRect = new zrender.Rect({
      shape: {
        x: -2,
        y: -2,
        width: t.rect.shape.width + 4,
        height: t.rect.shape.height + 4
      },
      style: {
        stroke: "#000",
        lineDash: "dashed",
        fill: "none"
      }
    })), this.add(this.selectRect);
  }
  unSelect() {
    this.remove(this.selectRect);
  }
}
class TaskModel extends Model {
  constructor(t) {
    super(t, t), this.items = [], this.option = t;
  }
  refresh() {
    if (!this.taskBuilder)
      return;
    let t = this;
    this.items = [];
    let e = this.taskBuilder.timeScale.coord, i = this.taskBuilder.table.rows, s = this.taskBuilder.timeScale.model.end, o = _global_moment(s), a;
    i.forEach((l) => {
      l.ignore || l.data.tasks && l.data.tasks.forEach((c) => {
        if (s && _global_moment(c.start).isAfter(o))
          return;
        let u = e.dateToX(_global_moment(c.start).toDate()), g = e.dateToX(_global_moment(c.end).toDate()), p = l.container.getBoundingRect().height - 8, m = l.getY() + 4;
        a = new TaskItem(this.taskBuilder.jcGantt, t.taskBuilder.timeScale.getTaskContainer(), t.originOption, l, c, u, m, g - u, p), l.tasks.push(a), t.items.push(a);
      });
    });
  }
  setBuilder(t) {
    this.taskBuilder = t;
  }
}
class TaskView {
  render(t, e) {
    return t.items;
  }
}
const _TaskBuilder = class A {
  constructor(t, e, i, s) {
    this.type = A.type, this.selections = [];
    let o = d(d({}, A.defaultOption), s);
    this.jcGantt = t, this.timeScale = e, this.timeScale.taskBuilder = this, this.table = i, this.table.taskBuilder = this, this.container = e.getTaskContainer(), this.model = new TaskModel(o), this.model.setBuilder(this), this.view = new TaskView(), this.aXisPoint = new AxisPoint(this.container), this.aXisPoint.jcGantt = this.jcGantt, ComponentManager.getInstance(this.jcGantt).componentRegister(this.aXisPoint.type, this.aXisPoint);
  }
  setTheme(t, e) {
    this.model.originOption = clone(this.model.option), t && applyTo(t.task, this.model.originOption, e), this.model.fullOption = this.model.originOption, this.refresh();
  }
  refresh() {
    let t = this;
    this.selections = [], this.container.removeAll(), this.model.refresh(), this._uiInstance = this.view.render(this.model, null), this._uiInstance.forEach((e) => {
      t.container.add(e);
    }), this.aXisPoint.addToContainer(), this.aXisPoint.setEnd(0, this.timeScale.getTimeLineHeight());
  }
  setOption(t) {
  }
  clearSelections() {
    this.selections.length && (this.selections.forEach((t) => {
      t.unSelect();
    }), this.selections = []);
  }
  removeSelection(t) {
    t.unSelect(), this.selections.splice(this.selections.indexOf(t), 1);
  }
  selectTask(t) {
    t && (this.clearSelections(), this.addTaskToSelection(t));
  }
  ctrlSelect(t) {
    if (this.selections.length == 0)
      return this.selectTask(t);
    if (this.selections.indexOf(t) >= 0) {
      this.removeSelection(t);
      return;
    }
    this.addTaskToSelection(t);
  }
  getSelections() {
    return this.selections;
  }
  addTaskToSelection(t) {
    this.selections.indexOf(t) >= 0 || (t.select(), this.selections.push(t));
  }
};
_TaskBuilder.type = "TaskBuilder";
_TaskBuilder.defaultOption = {
  textStyle: (n, t) => ({
    fontSize: 12,
    fontWeight: "bold"
  }),
  taskStyle: (n, t) => ({
    fill: "#5cb3cc80",
    stroke: "#5cb3cc"
  })
};
let TaskBuilder = _TaskBuilder;
const main = "", _Theme = class v {
  /**
   * 注册一个主题
   * @param name 主题名称
   * @param option 主题配置
   * @param force 如果主题名称重复，是否覆盖
   */
  static registerTheme(t, e, i) {
    v.themeMap.has(t) && !i || v.themeMap.set(t, e);
  }
  static getTheme(t) {
    return v.themeMap.get(t);
  }
  static applyTheme(t, e, i) {
    if (isString(e) && (e = v.getTheme(e)), !e)
      return;
    let s = clone(e), o = s.timeLine.scales;
    delete s.timeLine.scales, applyTo(s, t, i), t.timeLine.scales && t.timeLine.scales.forEach((a) => {
      applyTo(o, a, i);
    });
  }
  static quickTheme(t, e, i) {
    return {
      timeLine: {
        grid: {
          backgroundColor: "#fff",
          style: {
            stroke: t
          }
        },
        scales: {
          commonStyle: {
            backgroundColor: t,
            borderColor: e
          },
          style: null
        },
        scroll: {
          trackStyle: {
            // fill:bgColor + "50"
            fill: "#acacac80"
          },
          thumbStyle: {
            fill: e
          }
        }
      },
      task: {
        taskStyle: (s, o) => ({
          fill: e,
          stroke: i,
          shadowBlur: 3,
          shadowOffsetX: 2,
          shadowOffsetY: 1,
          // shadowColor: minorColor
          shadowColor: "#acacac"
        })
      },
      table: {
        headStyle: {
          textStyle: {
            backgroundColor: t,
            borderColor: e
          }
        },
        row: {
          commonStyle: {
            rowStyle: {
              fill: e,
              stroke: i
            }
          },
          hoverStyle: {
            rowStyle: {
              fill: t + 90,
              stroke: i
            }
          },
          selectStyle: () => ({
            rowStyle: {
              fill: t,
              stroke: i
            }
          })
        },
        scroll: {
          trackStyle: {
            // fill:bgColor + "50"
            fill: "#acacac80"
          },
          thumbStyle: {
            fill: e
          }
        }
      }
    };
  }
};
_Theme.冰川蜜橙 = "冰川蜜橙";
_Theme.青行未启 = "青行未启";
_Theme.稚艾霓粉 = "稚艾霓粉";
_Theme.西子退红 = "西子退红";
_Theme.秋波虎牙 = "秋波虎牙";
_Theme.冰河时代 = "冰河时代";
_Theme.紫罗兰 = "紫罗兰";
_Theme.橘绿之泉 = "橘绿之泉";
_Theme.橘子糖 = "橘子糖";
_Theme.玫瑰之后 = "玫瑰之后";
_Theme.墨尔本晴 = "墨尔本晴";
_Theme.themeMap = (/* @__PURE__ */ new Map()).set(_Theme.冰川蜜橙, _Theme.quickTheme("#84A3BC", "#FFBE90", "#E2A9A1")).set(_Theme.稚艾霓粉, _Theme.quickTheme("#CF929E", "#E3EB98", "#c5dc4a")).set(_Theme.青行未启, _Theme.quickTheme("#55bb8a", "#9eccab", "#84C08E")).set(_Theme.西子退红, _Theme.quickTheme("#87C0CA", "#F0CFE3", "#efb3e4")).set(_Theme.秋波虎牙, _Theme.quickTheme("#8ABCD1", "#E9D1B5", "#d7ad7b")).set(_Theme.冰河时代, _Theme.quickTheme("#2971BF", "#6EE5E3", "#CCE6D9")).set(_Theme.紫罗兰, _Theme.quickTheme("#9A2BD5", "#DDCDE8", "#5916AF")).set(_Theme.橘绿之泉, _Theme.quickTheme("#63D999", "#17bf70", "#266c56")).set(_Theme.橘子糖, _Theme.quickTheme("#85C8DF", "#FFE6B2", "#d7ad7b")).set(_Theme.玫瑰之后, _Theme.quickTheme("#F88C48", "#A7CCFF", "#E9BDBF")).set(_Theme.墨尔本晴, _Theme.quickTheme("#FF9F27", "#6CD1E4", "#E8DF88"));
let Theme = _Theme;
const _JCGantt = class C {
  /* public */
  constructor(t, e, i, s) {
    let o = C.initMap.get(t);
    o && (zrender.dispose(o.zrInstance), C.initMap.delete(t), window.removeEventListener("resize", o.resize), o = null), ComponentManager.registerInstance(this), this._init(t, e, i, s), C.initMap.set(t, this);
  }
  /**
   * 设置主题
   * @param theme 主题名称
   * @param forceTheme 是否强制使用主题样式，
   *                      否:不会覆盖配置中的样式 是:覆盖配置中的样式
   */
  setTheme(t, e) {
    isString(t) && (t = Theme.getTheme(t)), this.table.setTheme(t, e), this.timeScale.setTheme(t, e);
  }
  _init(t, e, i, s) {
    if (!t)
      throw new Error("The dom is required.(传入的dom不能为空)");
    let o = e || {};
    return this.originOption = o, Theme.applyTheme(o, i, s), t = this.resolveDom(t), this.dom = t, this.zrInstance = zrender.init(t), this.container = new FixedContainer(this.zrInstance.getWidth(), this.zrInstance.getHeight(), "hidden"), this.initTimeScale(o), this.initTable(o), this.initTask(o), this.initMark(o), this.zrInstance.add(this.container), this.initResize(t), this.initApi(), this.onceRendered(), this;
  }
  /* private */
  resolveDom(t) {
    if (isString(t) && (t = document.getElementById(t)), !t)
      throw new Error(`The element named '${t}' is not exit.(id为'${t}'的元素不存在)`);
    return t;
  }
  initTimeScale(t) {
    this.timeScale = new TimeScale(this.zrInstance, t.timeLine), this.timeScale.jcGantt = this, this.timeScale.refresh(), this.container.addContentHorizon(this.timeScale.container), ComponentManager.getInstance(this).componentRegister(this.timeScale.type, this.timeScale);
  }
  initTable(t) {
    t.table && t.table.show === !1 || (this.table = new Table(t.table, this.timeScale), this.table.jcGantt = this, this.table && this.table.setTimeScale(this.timeScale), this.table.refresh(), this.container.addContentHorizon(this.table.container), ComponentManager.getInstance(this).componentRegister(this.table.type, this.table));
  }
  initTask(t) {
    this.taskBuilder = new TaskBuilder(this, this.timeScale, this.table, t.task || {}), ComponentManager.getInstance(this).componentRegister(TaskBuilder.type, this.taskBuilder), this.taskBuilder.refresh();
  }
  initMark(t) {
    t.mark && (this.mark = new Mark(this, t.mark), this.mark.refresh(), ComponentManager.getInstance(this).componentRegister(Mark.type, this.mark));
  }
  initResize(t) {
    let e = this;
    window.addEventListener("resize", (i) => {
      e.resize();
    });
  }
  resize() {
    let t = this.dom, e = this.zrInstance, i = this.container, s = t.clientWidth, o = t.clientHeight;
    if (e.resize({ width: s, height: o }), i.resize(s, o), EventManager.getInstance().publishedEvent(new ResizeEvent()), this.table) {
      let a = this.table.container.getBoundingRect();
      this.timeScale.container.setPosition([a.width, this.timeScale.container.y]);
    }
    EventManager.getInstance().publishedEvent(new ResizeEvent());
  }
  initListener() {
    EventManager.getInstance().removeListener(this.container), this.publishDefaultEvent();
  }
  publishDefaultEvent() {
    EventManager.getInstance().publishedEvent(new ResizeEvent());
  }
  onceRendered() {
    if (this.initListener(), this.container.__content.eachChild((t) => {
      t.setPosition([0, 0]);
    }), this.table) {
      let t = this.table.container.getBoundingRect();
      this.timeScale.container.setPosition([t.width, this.timeScale.container.y]);
    }
    this.zrInstance.on("click", (t) => {
      ContextMenu.getInstance().hide();
    }), this.zrInstance.on("contextmenu", (t) => {
      t.target || ContextMenu.getInstance().hide();
    }), this.zrInstance.on("mousedown", (t) => {
      ContextMenu.getInstance().hide();
    });
  }
  initApi() {
    this.tableApi = new TableApi(this.table), this.timeScaleApi = new TimeScaleApi(this.timeScale), this.taskApi = new TaskApi(this.taskBuilder);
  }
};
_JCGantt.initMap = /* @__PURE__ */ new Map();
let JCGantt = _JCGantt;
class TableApi {
  constructor(t) {
    this.table = t;
  }
  /**
   * 获取table组件选中的行
   */
  getSelections() {
    return this.table.getSelection();
  }
  /**
   * 刷新table组件，同时会刷新任务视图
   */
  refresh() {
    this.table.refresh();
  }
  /**
   * 更新table组件数据，同时更新任务视图
   * @param data
   */
  updateData(t) {
    this.table.updateData(t);
  }
  /**
   * 取消选中所有选中的行
   */
  clearSelections() {
    this.table.clearSelections();
  }
  /**
   * 全选所有行
   */
  selectAll() {
    this.table.selectAll();
  }
  /**
   * 导出当前table数据为json文件
   */
  exportRowsToJSON() {
    let t = this.table.getCurrentData(), e = document.createElement("a");
    e.download = "data.json", e.style.display = "none";
    let i = new Blob([JSON.stringify(t, void 0, 4)], { type: "text/json" });
    e.href = URL.createObjectURL(i), document.body.appendChild(e), e.click(), document.body.removeChild(e);
  }
  /**
   * 数据过滤，仅从缓存中过滤数据，不会重新加载数据
   * @param filter
   */
  filter(t) {
    this.table.filterData(t);
  }
}
class TimeScaleApi {
  constructor(t) {
    this.timeScale = t;
  }
  /**
   * 刷新时间刻度组件，同时刷新任务视图
   */
  refresh() {
    this.timeScale.refresh();
  }
  /**
   * 设置时间范围,设置完后会自动刷
   * @param start
   * @param end
   */
  setDateRange(t, e) {
    !t || !e || this.timeScale.setDateRange(t, e);
  }
  /**
   * 时间刻度缩放
   * @param multiple 大于1表示放大，小于1且大于零表示缩小
   */
  zoom(t) {
    this.timeScale.zoom(t);
  }
  /**
   * 计算日期所在的位置
   * @param date
   * @return 返回值为相对于时间组件的水平距离
   */
  dateToX(t) {
    return this.timeScale.coord.dateToX(t);
  }
  /**
   * 计算指定x所代表的日期
   * @param x x为相对于时间组件的水平距离
   */
  xToDate(t) {
    return this.timeScale.coord.xToDate(t);
  }
  /**
   * 设置时间单位，即多长时间占一格
   * @param timeBase 时间基数
   * @param timeUnit 时间单位 值为 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'
   */
  setTimeUnit(t, e) {
    this.timeScale.setTimeUnit(t, e);
  }
}
class TaskApi {
  constructor(t) {
    this.taskBuilder = t;
  }
  /**
   * 获取当前选中的任务
   */
  getSelections() {
    return this.taskBuilder.getSelections();
  }
  /**
   * 刷新任务/重新加载任务
   */
  refresh() {
    this.taskBuilder.table.refresh();
  }
}
export {
  JCGantt as default
};
