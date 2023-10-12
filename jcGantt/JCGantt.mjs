var de = Object.defineProperty;
var Mt = Object.getOwnPropertySymbols;
var ue = Object.prototype.hasOwnProperty, pe = Object.prototype.propertyIsEnumerable;
var Ct = (n, t, e) => t in n ? de(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, d = (n, t) => {
  for (var e in t || (t = {}))
    ue.call(t, e) && Ct(n, e, t[e]);
  if (Mt)
    for (var e of Mt(t))
      pe.call(t, e) && Ct(n, e, t[e]);
  return n;
};
var zt = (n, t, e) => new Promise((i, s) => {
  var r = (h) => {
    try {
      a(e.next(h));
    } catch (l) {
      s(l);
    }
  }, o = (h) => {
    try {
      a(e.throw(h));
    } catch (l) {
      s(l);
    }
  }, a = (h) => h.done ? i(h.value) : Promise.resolve(h.value).then(r, o);
  a((e = e.apply(n, t)).next());
});
var ge = Xt([
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
}, {}), fe = Xt([
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
}, {}), Gt = Object.prototype.toString, me = Array.prototype, ye = me.slice, Dt = function() {
}.constructor, F = Dt ? Dt.prototype : null, we = "__proto__";
function S(n) {
  if (n == null || typeof n != "object")
    return n;
  var t = n, e = Gt.call(n);
  if (e === "[object Array]") {
    if (!et(n)) {
      t = [];
      for (var i = 0, s = n.length; i < s; i++)
        t[i] = S(n[i]);
    }
  } else if (fe[e]) {
    if (!et(n)) {
      var r = n.constructor;
      if (r.from)
        t = r.from(n);
      else {
        t = new r(n.length);
        for (var i = 0, s = n.length; i < s; i++)
          t[i] = n[i];
      }
    }
  } else if (!ge[e] && !et(n) && !Se(n)) {
    t = {};
    for (var o in n)
      n.hasOwnProperty(o) && o !== we && (t[o] = S(n[o]));
  }
  return t;
}
function Xt(n, t, e, i) {
  if (n && t) {
    for (var s = 0, r = n.length; s < r; s++)
      e = t.call(i, e, n[s], s, n);
    return e;
  }
}
function ve(n, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return n.apply(t, e.concat(ye.call(arguments)));
  };
}
F && w(F.bind) && F.call.bind(F.bind);
function ke(n) {
  return Array.isArray ? Array.isArray(n) : Gt.call(n) === "[object Array]";
}
function w(n) {
  return typeof n == "function";
}
function E(n) {
  return typeof n == "string";
}
function be(n) {
  var t = typeof n;
  return t === "function" || !!n && t === "object";
}
function Se(n) {
  return typeof n == "object" && typeof n.nodeType == "number" && typeof n.ownerDocument == "object";
}
var Te = "__ec_primitive__";
function et(n) {
  return n[Te];
}
class G {
  constructor(t, e) {
    this.originOption = S(t), this.fullOption = e;
  }
}
moment.suppressDeprecationWarnings = !0;
moment.locale("zh-cn", {
  week: {
    dow: 1
  }
});
const rt = {
  cellWidth: 75,
  cellHeight: 35
}, u = moment, Ot = {
  info: "#909399",
  error: "#F56C6C",
  warn: "#E6A23C",
  success: "#67C23A",
  冰川蓝: "#84A3BC",
  蜜橙: "#FFBE90",
  珊瑚粉: "#E2A9A1"
}, bt = class ot {
  constructor(t) {
    if (this.start = /* @__PURE__ */ new Date(), this.days = ot.defaultDays, this.accuracy = "second", this.baseWidth = rt.cellWidth, this.scales = [new Rt()], t) {
      let e = [];
      t.scales && t.scales.forEach((i) => {
        e.push(new Rt(i));
      });
      for (let i in t)
        this[i] = t[i];
      e.length > 0 && (this.scales = e);
    }
  }
  getAccuracy() {
    return ot.accuracyMap.get(this.accuracy);
  }
};
bt.defaultDays = -60;
bt.accuracyMap = (/* @__PURE__ */ new Map()).set("second", 1).set("minute", 60).set("hour", 60 * 60).set("day", 60 * 60 * 24).set("week", 60 * 60 * 24 * 7).set("month", 30 * 60 * 60 * 24 * 7).set("year", 365 * 30 * 60 * 60 * 24 * 7);
let it = bt;
class Rt {
  constructor(t) {
    if (this.symbol = "day", this.formatter = "YY/MM/DD", t)
      for (let e in t)
        this[e] = t[e];
  }
}
function Et(n, t, e) {
  if (E(n))
    return u(t).format(n);
  if (w(n))
    return n(t, e);
}
const Ft = class Wt extends G {
  constructor(t) {
    super(t, new it(t)), this.type = Wt.type, this.timeBase = 1, this._timeBase = 1, this.option = S(t);
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
    let s = this.fullOption.scales, r = this.getMinAccuracyScale(s);
    this.originMinUnit = r ? r.symbol : "day";
    let o = this.unitConversion(this._timeBase, this._timeUnit || this.originMinUnit);
    this.timeBase = Math.floor(o.timeBase), this.minUnit = o.timeUnit;
    let a = o.formatter;
    s.forEach((h) => {
      i.metaDataMap.get(h.symbol) || (h.symbol == i.originMinUnit ? i.metaDataMap.set(h.symbol, i.createMinTimeMetaData(h, this.timeBase, i.minUnit, a, t, e)) : i.metaDataMap.set(h.symbol, i.createTimeMetaData(h, this.timeBase, i.minUnit, t, e)));
    });
  }
  initMetaDataList() {
    let t = this;
    this.metaDataList = [], this.fullOption.scales.forEach((e) => {
      t.metaDataList.push(t.metaDataMap.get(e.symbol));
    });
  }
  getMinAccuracyScale(t) {
    return t && t.length > 0 ? t.reduce((e, i) => it.accuracyMap.get(e.symbol) - it.accuracyMap.get(i.symbol) <= 0 ? e : i) : null;
  }
  getStartAndEnd() {
    let t = this.fullOption.start, e = this.fullOption.end, i = this.fullOption.days;
    return e ? (e = u(e).toDate(), i > 0 ? t = u(e).subtract(Math.abs(i), "d").toDate() : t = u(t).toDate()) : (t = u(t).toDate(), e = u(t).add(Math.abs(i), "d").toDate()), t = u(t).startOf("d").toDate(), e = u(e).startOf("d").toDate(), { start: t, end: e };
  }
  createMinTimeMetaData(t, e, i, s, r, o) {
    let a = [];
    !s && t.symbol != i && (s = x.defaultFormatter[i]);
    let h = u(r), l = u(o), c = u(r), f = null, g = null, y = t.commonStyle || {};
    for (; c.isBetween(h, l, "second", "[)"); ) {
      g = c.clone(), f = u.min([c.add(e, i).startOf(i), l]);
      let _ = {
        symbol: i,
        start: g.toDate(),
        end: f.toDate(),
        counts: f.diff(g, i) / e || 1,
        baseWidth: this.fullOption.baseWidth,
        text: Et(s || t.formatter, g.toDate(), f.toDate())
      };
      _.style = d(d({}, y), w(t.style) ? t.style(_) : {}), this.initStyleProperties(_, i), a.push(_);
    }
    return a;
  }
  createTimeMetaData(t, e, i, s, r) {
    let o = [], a = u(s), h = u(r), l = u(s), c = null, f = null, g = t.commonStyle || {};
    for (; l.isBetween(a, h, "second", "[)"); ) {
      f = l.clone(), c = u.min([l.add(1, t.symbol).startOf(t.symbol), h]);
      let y = {
        symbol: t.symbol,
        start: f.toDate(),
        end: c.toDate(),
        counts: c.diff(f, i) / e || 1,
        baseWidth: this.fullOption.baseWidth,
        text: Et(t.formatter, f.toDate(), c.toDate())
      };
      y.style = d(d({}, g), w(t.style) ? t.style(y) : {}), o.push(y);
    }
    return o;
  }
  initStyleProperties(t, e) {
    if (!this.styleProperties && t.symbol == e) {
      let i = 0;
      ke(t.style.padding) ? t.style.padding.length > 2 ? i = t.style.padding[1] + t.style.padding[3] : i = t.style.padding[1] : i = t.style.padding || 0, this.styleProperties = {
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
Ft.type = "timeScale";
let xe = Ft;
const jt = class qt {
  constructor(t) {
    this.type = qt.type, this.source = t;
  }
};
jt.type = "resize";
let j = jt;
class at extends zrender.Group {
  constructor() {
    super(...arguments), this.eventType = j.type;
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
const Vt = class $t extends at {
  constructor() {
    super(...arguments), this.type = $t.type;
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
      i instanceof at && i.hv === t && (e = i);
    }), e;
  }
  refresh() {
  }
};
Vt.type = "StackContainer";
let I = Vt;
const ht = class lt {
  constructor() {
    this.animateMap = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return lt.instance;
  }
  addAnimate(t, e, i) {
    let s = null;
    return (s = this.animateMap.get(t)) || (s = /* @__PURE__ */ new Map(), this.animateMap.set(t, s)), s.set(e, i), i;
  }
  getAnimate(t, e) {
    let i = null, s = this.animateMap.get(t);
    if (s && (i = s.get(e)), i) {
      i._started = 0;
      for (let r in i._tracks)
        i._tracks[r]._finished = !1;
    }
    return i;
  }
  createAnimate(t, e, i, s, r, o, a) {
    let h = t[e], l = d(d({}, h), i), c = t.animate(e, o, !0).when(s, l).done(() => {
      r && (t[e] = l);
    });
    return lt.getInstance().addAnimate(t, a, c), c;
  }
};
ht.instance = new ht();
let J = ht;
function Nt(n, t, e) {
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
function z(n, t, e) {
  if (!(!n || !t))
    for (let i in n)
      t[i] ? w(n[i]) ? e && (t[i] = n[i]) : be(n[i]) ? z(n[i], t[i], e) : e && (t[i] = n[i]) : t[i] = n[i];
}
var Kt = function() {
  function n(t) {
    this.value = t;
  }
  return n;
}(), _e = function() {
  function n() {
    this._len = 0;
  }
  return n.prototype.insert = function(t) {
    var e = new Kt(t);
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
}(), Me = function() {
  function n(t) {
    this._list = new _e(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return n.prototype.put = function(t, e) {
    var i = this._list, s = this._map, r = null;
    if (s[t] == null) {
      var o = i.len(), a = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var h = i.head;
        i.remove(h), delete s[h.key], r = h.value, this._lastRemovedEntry = h;
      }
      a ? a.value = e : a = new Kt(e), a.key = t, i.insertEntry(a), s[t] = a;
    }
    return r;
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
const Ce = Me;
var It = {
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
function A(n) {
  return n = Math.round(n), n < 0 ? 0 : n > 255 ? 255 : n;
}
function Lt(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function nt(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? A(parseFloat(t) / 100 * 255) : A(parseInt(t, 10));
}
function H(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? Lt(parseFloat(t) / 100) : Lt(parseFloat(t));
}
function st(n, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? n + (t - n) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? n + (t - n) * (2 / 3 - e) * 6 : n;
}
function k(n, t, e, i, s) {
  return n[0] = t, n[1] = e, n[2] = i, n[3] = s, n;
}
function ct(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n;
}
var Jt = new Ce(20), W = null;
function O(n, t) {
  W && ct(W, t), W = Jt.put(n, W || t.slice());
}
function ze(n, t) {
  if (n) {
    t = t || [];
    var e = Jt.get(n);
    if (e)
      return ct(t, e);
    n = n + "";
    var i = n.replace(/ /g, "").toLowerCase();
    if (i in It)
      return ct(t, It[i]), O(n, t), t;
    var s = i.length;
    if (i.charAt(0) === "#") {
      if (s === 4 || s === 5) {
        var r = parseInt(i.slice(1, 4), 16);
        if (!(r >= 0 && r <= 4095)) {
          k(t, 0, 0, 0, 1);
          return;
        }
        return k(t, (r & 3840) >> 4 | (r & 3840) >> 8, r & 240 | (r & 240) >> 4, r & 15 | (r & 15) << 4, s === 5 ? parseInt(i.slice(4), 16) / 15 : 1), O(n, t), t;
      } else if (s === 7 || s === 9) {
        var r = parseInt(i.slice(1, 7), 16);
        if (!(r >= 0 && r <= 16777215)) {
          k(t, 0, 0, 0, 1);
          return;
        }
        return k(t, (r & 16711680) >> 16, (r & 65280) >> 8, r & 255, s === 9 ? parseInt(i.slice(7), 16) / 255 : 1), O(n, t), t;
      }
      return;
    }
    var o = i.indexOf("("), a = i.indexOf(")");
    if (o !== -1 && a + 1 === s) {
      var h = i.substr(0, o), l = i.substr(o + 1, a - (o + 1)).split(","), c = 1;
      switch (h) {
        case "rgba":
          if (l.length !== 4)
            return l.length === 3 ? k(t, +l[0], +l[1], +l[2], 1) : k(t, 0, 0, 0, 1);
          c = H(l.pop());
        case "rgb":
          if (l.length >= 3)
            return k(t, nt(l[0]), nt(l[1]), nt(l[2]), l.length === 3 ? c : H(l[3])), O(n, t), t;
          k(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (l.length !== 4) {
            k(t, 0, 0, 0, 1);
            return;
          }
          return l[3] = H(l[3]), Pt(l, t), O(n, t), t;
        case "hsl":
          if (l.length !== 3) {
            k(t, 0, 0, 0, 1);
            return;
          }
          return Pt(l, t), O(n, t), t;
        default:
          return;
      }
    }
    k(t, 0, 0, 0, 1);
  }
}
function Pt(n, t) {
  var e = (parseFloat(n[0]) % 360 + 360) % 360 / 360, i = H(n[1]), s = H(n[2]), r = s <= 0.5 ? s * (i + 1) : s + i - s * i, o = s * 2 - r;
  return t = t || [], k(t, A(st(o, r, e + 1 / 3) * 255), A(st(o, r, e) * 255), A(st(o, r, e - 1 / 3) * 255), 1), n.length === 4 && (t[3] = n[3]), t;
}
function De(n, t) {
  var e = ze(n);
  if (e) {
    for (var i = 0; i < 3; i++)
      t < 0 ? e[i] = e[i] * (1 - t) | 0 : e[i] = (255 - e[i]) * t + e[i] | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return Oe(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function Oe(n, t) {
  if (!(!n || !n.length)) {
    var e = n[0] + "," + n[1] + "," + n[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + n[3]), t + "(" + e + ")";
  }
}
const U = class T {
  constructor() {
    this.type = T.type, this.dom = this.createTooltip();
  }
  static getInstance() {
    return T.instance;
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
    T.forbidden = !0;
  }
  static allow() {
    T.forbidden = !1;
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
      e && e(s), !T.forbidden && T.getInstance().show(s.event.clientX, s.event.clientY, t.getTooltip());
    }, t.onmouseout = (s) => {
      i && i(s), T.getInstance().hide();
    };
  }
  static initElement(t, e) {
    let i = t.onmouseover, s = t.onmouseout;
    t.onmouseover = (r) => {
      i && i(r), !T.forbidden && T.getInstance().show(r.event.clientX, r.event.clientY, e);
    }, t.onmouseout = (r) => {
      s && s(r), T.getInstance().hide();
    };
  }
  setTheme(t, e) {
  }
};
U.type = "Tooltip";
U.instance = new U();
let q = U;
class Re {
  render(t, e) {
    if (!t)
      return [];
    let i = this, s = new I();
    return t.metaDataList.forEach((r, o) => {
      let a = new I();
      r.forEach((h, l) => {
        a.addHorizon(i.paint(h, t.styleProperties));
      }), s.addVertical(a);
    }), [s];
  }
  paint(t, e) {
    let i = new zrender.Group();
    i.dirty();
    let s = d({}, t.style), r = t.baseWidth || rt.cellWidth, o = s.height || rt.cellHeight, a = r * t.counts + (t.counts * (e.border + e.padding) - ((s.padding || 0) + (s.borderWidth || 0.5) * 2)), h = null;
    return i.add(
      h = new zrender.Text({
        style: d({
          text: t.text,
          width: a,
          x: 0.5 * a,
          height: o,
          align: "center",
          lineHeight: o,
          fontSize: 12,
          backgroundColor: "#1ba78480",
          borderColor: "#1ba784",
          overflow: "truncate",
          borderWidth: 0.5,
          borderRadius: 3
        }, t.style)
      })
    ), Nt(h, "style", {
      backgroundColor: De(h.style.backgroundColor, 0.2)
    }), q.initElement(i, t.text), i;
  }
}
class Ee extends G {
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
    let e = [], r = this.timeScale.tierContainer.getContainerByName(this.timeScale.type).childAt(0).children().reduce(
      (a, h) => a.childCount() >= h.childCount() ? a : h
    ), o = d(d({}, this.originOption.style || {}), this.originOption.colStyle || {});
    return r.eachChild((a) => {
      e.push({
        x1: a.x,
        x2: a.x,
        y1: 0,
        y2: t
      });
    }), {
      value: e,
      style: o
    };
  }
  initRow() {
    let t = this.timeScale.getTimeLineWidth(), e = [], i, s, r = d(d({}, this.originOption.style || {}), this.originOption.rowStyle || {}), o = this.table.rowGroup, a = o.y + o.parent.y;
    return o.eachChild((h) => {
      i = h.getBoundingRect(), s = a + h.y + i.height, e.push({
        x1: 0,
        x2: t || 1e3,
        y1: s,
        y2: s
      });
    }), {
      value: e,
      style: r
    };
  }
}
class Ie {
  render(t, e) {
    let i = new zrender.Group({
      silent: !1
    }), s = t.metaData;
    s.row && i.add(this.paintRow(s.row)), s.col && i.add(this.paintCol(s.col));
    let r = i.getBoundingRect();
    return i.add(new zrender.Rect({
      shape: {
        width: r.width,
        height: r.height
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
class Le {
  constructor(t, e) {
    this.timeScale = e, this.model = new Ee(t, e), this.view = new Ie();
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
class Q extends at {
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
      this.tierList.push(t = new I()), this.tierNameMap.set(e + 1, e + 1), this.add(t);
  }
  reAddChild() {
    this.removeAll();
    let t = this;
    this.tierList.forEach((e) => {
      t.add(e);
    });
  }
}
const Ut = class dt extends G {
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
      height: this.originOption.thickness || dt.scrollLength
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
      width: this.originOption.thickness || dt.scrollLength
    };
  }
};
Ut.scrollLength = 8;
let Pe = Ut;
class Bt extends zrender.Rect {
  constructor(t, e) {
    super(t), this.type = e, this.draggable = !1, this.initEvent();
  }
  initEvent() {
    let t = this, e, i;
    t.onmousedown = (s) => {
      s.event.preventDefault();
      let r = t.parent.parent;
      e = r.realWidth / r.__width, i = r.realHeight / r.__height, t.isMouseDown = !0, document.onmousemove = (o) => {
        if (o.preventDefault(), t.isMouseDown) {
          t.dirty();
          let a = 0;
          if (t.type === "horizon") {
            let l = t.scroll.horizonTarget || r.childAt(0);
            if (t.x + o.movementX + t.getBoundingRect().width > r.__width || t.x + o.movementX < 0)
              return;
            a = o.movementX, t.setPosition([t.x + o.movementX, t.y]), l.setPosition([l.x - o.movementX * e, l.y]);
          }
          if (t.type === "vertical") {
            let l = t.scroll.verticalTarget || r.childAt(0);
            if (t.y + o.movementY + t.getBoundingRect().height > r.__height || t.y + o.movementY < 0)
              return;
            a = o.movementY, t.setPosition([t.x, t.y + o.movementY]), l.setPosition([l.x, l.y - o.movementY * i]);
          }
          let h = t.scroll.items;
          h && h.forEach((l) => {
            t.type == l.type && l.scroll.moveTo(l.type, a, !0);
          });
        }
      }, document.onmouseup = (o) => {
        o.preventDefault(), t.isMouseDown = !1, document.onmousemove = null, document.onmouseup = null;
      };
    };
  }
  scrollTo(t, e) {
    let i = this, s, r, o = i.parent.parent;
    if (!o)
      return;
    s = o.realWidth / o.__width, r = o.realHeight / o.__height;
    let a = 0;
    if (i.dirty(), i.type === "horizon") {
      let h = i.scroll.horizonTarget || o.childAt(0);
      if (i.x + t + i.getBoundingRect().width > o.__width || i.x + t < 0)
        return;
      a = t * s, i.setPosition([i.x + t, i.y]), h.setPosition([h.x - a, h.y]);
    }
    if (i.type === "vertical") {
      let h = i.scroll.verticalTarget || o.childAt(0);
      if (i.y + t + i.getBoundingRect().height > o.__height || i.y + t < 0)
        return;
      a = t * r, i.setPosition([i.x, i.y + t]), h.setPosition([h.x, h.y - a]);
    }
    if (!e) {
      let h = i.scroll.items;
      h && h.forEach((l) => {
        i.type == l.type && l.scroll.moveTo(l.type, t, !0);
      });
    }
    return a;
  }
}
const b = class ut extends zrender.Group {
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
      e.hovered || (i.event.preventDefault(), ut.mouseoverHandler[this.type](e, t), this.hovered = !0);
    }, this.onmouseout = (i) => {
      this.thumb.contain(i.event.zrX, i.event.zrY) || this.track.contain(i.event.zrX, i.event.zrY) || (i.event.preventDefault(), ut.mouseoutHandler[this.type](e, t), this.hovered = !1);
    };
  }
};
b.duration = 120;
b.mouseoverHandler = {
  horizon: (n, t) => {
    let e = J.getInstance(), i = null;
    i = e.getAnimate(n.track, "mouseover"), i || (i = e.addAnimate(n.track, "mouseover", n.track.animate("shape", !1).when(b.duration, {
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
    s = e.getAnimate(n.thumb, "mouseover"), s || (s = e.addAnimate(n.thumb, "mouseover", n.thumb.animate("shape", !1).when(b.duration, {
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
    let e = J.getInstance(), i = null;
    i = e.getAnimate(n.track, "mouseover"), i || (i = e.addAnimate(n.track, "mouseover", n.track.animate("shape", !1).when(b.duration, {
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
    s = e.getAnimate(n.thumb, "mouseover"), s || (s = e.addAnimate(n.thumb, "mouseover", n.thumb.animate("shape", !1).when(b.duration, {
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
b.mouseoutHandler = {
  horizon: (n, t) => {
    let e = J.getInstance(), i = null;
    i = e.getAnimate(n.track, "mouseout"), i || (i = e.addAnimate(n.track, "mouseout", n.track.animate("shape", !1).when(b.duration, {
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
    s = e.getAnimate(n.thumb, "mouseout"), s || (s = e.addAnimate(n.thumb, "mouseout", n.thumb.animate("shape", !1).when(b.duration, {
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
    let e = J.getInstance(), i = null;
    i = e.getAnimate(n.track, "mouseout"), i || (i = e.addAnimate(n.track, "mouseout", n.track.animate("shape", !1).when(b.duration, {
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
    s = e.getAnimate(n.thumb, "mouseout"), s || (s = e.addAnimate(n.thumb, "mouseout", n.thumb.animate("shape", !1).when(b.duration, {
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
let At = b;
class Be {
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
    }), i = new Bt({
      shape: {
        y: 2,
        x: 2,
        width: t.horizon.thumbLength,
        height: t.horizon.height - 4
      },
      style: d({
        fill: "#acacac"
      }, t.horizon.thumbStyle)
    }, "horizon"), s = new At(e, i, "horizon", t.scroll);
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
    }), i = new Bt({
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
    }, "vertical"), s = new At(e, i, "vertical", t.scroll);
    return s.setHoverOffset(t.originOption.hoverOffset), t.scroll.setVerticalScroll(s), t.container.addRight(s), s;
  }
}
class Ae {
  constructor(t, e) {
    this.items = /* @__PURE__ */ new Set(), this.model = new Pe(t, t), this.model.setScroll(this), this.view = new Be(), this.model.setContainer(e);
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
const pt = class Qt {
  static getInstance() {
    return Qt.instance;
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
      let r = i.get(s);
      r && r.forEach((o) => {
        o.action(s, o.target);
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
pt.instance = new pt();
let R = pt;
const Zt = class te extends I {
  constructor(t, e, i, s) {
    super(), this.type = te.type, this.__origin_width = t, this.__origin_height = e, this.__overflow = i, this.__scrollOption = s || {}, this.calcWeightAndHeight(), this.initContentGroup(), this.refreshClipPath(), this.initEvent(), R.getInstance().registerListener(this);
  }
  setScrollerOption(t) {
    this.__scrollOption = t, this.__scroll.setOption(t);
  }
  initContentGroup() {
    this.__content = new P(this), this.add(this.__content);
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
    let e = new P(this);
    e.add(t);
    let i = this.__content.add(e);
    return this.realWidth = super.getBoundingRect().width, this.realHeight = super.getBoundingRect().height, this.refreshScroll(), i;
  }
  addContentHorizon(t) {
    let e = new P(this);
    e.add(t);
    let i = this.__content.addHorizon(e);
    return this.realWidth = super.getBoundingRect().width, this.realHeight = super.getBoundingRect().height, this.refreshScroll(), i;
  }
  addContentVertical(t) {
    let e = new P(this);
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
    if (this.__width = parseFloat(this.__origin_width), this.__height = parseFloat(this.__origin_height), this.parent && this.parent instanceof P) {
      let t = this.parent.container;
      E(this.__origin_width) && (this.__width = t.__width * (parseFloat(this.__origin_width.split("%")[0]) / 100)), E(this.__origin_height) && (this.__height = t.__height * (parseFloat(this.__origin_height.split("%")[0]) / 100));
    }
  }
  refreshScroll() {
    this.__overflow != "hidden" && (!this.__scroll && (this.__scroll = new Ae(this.__scrollOption || {}, this)), this.__scroll.model.setOption(this.__scrollOption), this.__scroll.refresh());
  }
  initEvent() {
    let t = this;
    this.onmousewheel = (e) => {
      e.stop(), e.event.preventDefault(), t.__scroll && (e.event.shiftKey ? t.__scroll.moveTo("horizon", -5 * e.wheelDelta) : t.__scroll.moveTo("vertical", -5 * e.wheelDelta));
    };
  }
};
Zt.type = "FixedContainer";
let St = Zt;
class P extends I {
  constructor(t) {
    super(), this.container = t;
  }
}
class He {
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
    return u(this.timeScale.model.start).add(e, this.accuracyUnit).toDate();
  }
  dateToX(t) {
    return t ? Math.ceil(u(t).diff(u(this.startDate), this.accuracyUnit)) * this.accuracy : void 0;
  }
  initStartPosition() {
    this.startDate = this.timeScale.model.start, this.startPosition = this.timeScale.container.x;
  }
  initAccuracy() {
    this.accuracyUnit = this.timeScale.model.fullOption.accuracy;
    let t = 1e13, e = this.timeScale.getTimeLineWidth(), i = u(this.timeScale.model.end).diff(u(this.timeScale.model.start), this.accuracyUnit);
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
const ee = class V {
  constructor() {
    this.componentMap = /* @__PURE__ */ new Map();
  }
  static registerInstance(t) {
    V.instanceMap.set(t, new V());
  }
  static getInstance(t) {
    return V.instanceMap.get(t);
  }
  componentRegister(t, e) {
    this.componentMap.set(t, e);
  }
  getComponent(t) {
    return this.componentMap.get(t);
  }
};
ee.instanceMap = /* @__PURE__ */ new Map();
let m = ee;
class Ye {
}
const ie = class ne extends Ye {
  constructor(t) {
    super(), this.type = ne.type, this.date = u(t.date).toDate(), this.lineStyle = t.lineStyle, this.textStyle = t.textStyle, this.length = t.length, this.content = t.text;
  }
  paint() {
    let t = this, e = m.getInstance(this.jcGantt).getComponent(x.type), i = e.getTimeLineHeight(), r = e.coord.dateToX(this.date);
    return this.group = new zrender.Group({ silent: !0 }), this.line = new zrender.Line({
      shape: {
        x1: r,
        y1: i,
        x2: r,
        y2: t.length
      },
      style: d({
        lineWidth: 1.2,
        lineDash: "dashed",
        stroke: "#000"
      }, t.lineStyle)
    }), this.text = new zrender.Text({
      style: d({
        x: r,
        y: t.length,
        text: t.content,
        padding: 5,
        backgroundColor: "#acacac",
        align: "center"
      }, t.textStyle)
    }), this.group.add(this.line), this.group.add(this.text), this.group;
  }
};
ie.type = "DateMark";
let Ht = ie;
const se = class gt {
  constructor() {
  }
  static registerMarkType(t, e) {
    gt.typeMap.set(t, e);
  }
  static getMarkItem(t, e) {
    let i = null, s = gt.typeMap.get(t);
    return w(s) && (i = s(e)), i;
  }
};
se.typeMap = (/* @__PURE__ */ new Map()).set(Ht.type, (n) => new Ht(n));
let Ge = se;
class Xe extends G {
  constructor(t) {
    super(t, t), this.items = [];
  }
  init() {
    let t = this;
    if (this.items = [], this.originOption.marks) {
      let e = null;
      this.originOption.marks.forEach((i) => {
        e = Ge.getMarkItem(i.type, i.arg), e && (e.jcGantt = t.jcGantt, t.items.push(e));
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
class Fe {
  render(t, e) {
    let i = new zrender.Group();
    return t.items.forEach((s) => {
      i.add(s.paint());
    }), [i];
  }
}
const re = class oe {
  constructor(t, e) {
    this.type = oe.type, this.jcGantt = t, this.option = S(e), this.model = new Xe(e), this.model.jcGantt = this.jcGantt, this.view = new Fe(), this.container = m.getInstance(this.jcGantt).getComponent(x.type).getMarkContainer();
  }
  refresh() {
    this.container || (this.container = m.getInstance(this.jcGantt).getComponent(x.type).getMarkContainer()), this.container.removeAll(), this.model.refresh(), this._uiInstance = this.view.render(this.model, null), this._uiInstance.forEach((t) => {
      this.container.add(t);
    });
  }
  setOption(t) {
  }
  setTheme(t, e) {
  }
};
re.type = "Mark";
let ft = re;
const mt = class yt {
  static getInstance() {
    return yt.instance;
  }
  constructor() {
    this.dom = this.createContextMenu();
  }
  show(t, e, i) {
    this.dom.remove(), this.dom = null, this.dom || (this.dom = this.createContextMenu());
    let s = this;
    i && i.length && i.forEach((a) => {
      s.addItem(a);
    }), this.dom.classList.remove("hide_real");
    let r = window.innerWidth;
    window.innerHeight >= e + this.dom.clientHeight ? this.dom.style.top = e + "px" : this.dom.style.top = e - this.dom.clientHeight + "px", t + this.dom.clientWidth <= r ? this.dom.style.left = t + "px" : this.dom.style.left = t - this.dom.clientWidth + "px";
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
    for (let a in i)
      e.style[a] = i[a];
    t.disabled && t.disabled() && e.classList.add("content-menu-item-forbid"), e.onclick = function() {
      t.handler && t.handler(), yt.getInstance().hide();
    };
    let s = document.createElement("i");
    s.classList.add("content-menu-item-icon");
    let r = document.createElement("img");
    t.icon && (r.src = t.icon), s.append(r), e.append(s);
    let o = document.createElement("span");
    o.classList.add("content-menu-item-text"), o.innerHTML = t.text || "", e.append(o), this.dom.append(e);
  }
};
mt.instance = new mt();
let C = mt;
const X = class $ {
  constructor(t, e) {
    this.type = $.type, this.zrInstance = t;
    let i = d(d({}, $.defaultOption), e);
    this.model = new xe(i), this.view = new Re(), this.container = new St(i.width, i.height), this.container.setScrollerOption(i.scroll), this.tierContainer = new Q(3), this.tierContainer.setTierName(1, $.background), this.tierContainer.setTierContainer(1, new Q(2)), this.tierContainer.setTierName(2, this.type), this.backGround = new Le(this.model.fullOption.grid, this), this.container.setComponent(this.backGround), this.coord = new He(this), this.container.__scroll.setTarget("vertical", this.tierContainer.getContainer(1)), this.initEvent(), R.getInstance().registerAction(this.container, {
      target: this.coord,
      action: (s, r) => {
        r.refresh();
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
    let i = this.getStartX(), s = this.getTimeLineHeight(), r = this.container.__width - 10, o = this.container.__height - s - 10;
    return t - i <= 0 ? "left" : t - i >= r ? "right" : e - s <= 0 ? "top" : e - s >= o ? "bottom" : null;
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
    let e = m.getInstance(this.jcGantt).getComponent(ft.type);
    e && e.refresh(), this.taskBuilder && this.taskBuilder.refresh();
  }
  setTheme(t, e) {
    if (this.model.fullOption = S(this.model.option), t) {
      let i = S(t), s = i.timeLine.scales;
      delete i.timeLine.scales;
      let r = this.model.fullOption;
      z(i.timeLine, r, e), r.scales && r.scales.forEach((o) => {
        z(s, o, e);
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
      e.stop(), e.event.preventDefault(), t.model.originOption.contextmenu ? C.getInstance().show(e.event.clientX, e.event.clientY, t.model.originOption.contextmenu) : C.getInstance().hide();
    };
  }
};
X.type = "timeScale";
X.background = "background";
X.defaultFormatter = {
  second: "YY/MM/DD HH:mm:ss",
  minute: "YY/MM/DD HH:mm",
  hour: "YY/MM/DD HH时",
  day: "YY/MM/DD",
  week: "YY年W周",
  month: "YY年MM月",
  year: "YYYY年"
};
X.defaultOption = {
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
        let t = u(n.start);
        if (u().isBetween(t, u(n.end), "minute", "[]"))
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
let x = X;
class We {
  constructor(t, e, i, s) {
    this.tasks = [], this.keyId = i, this.container = new Q(2), this.data = t, this.rowBuilder = e, this.render(s);
    let r = this, o = m.getInstance(this.rowBuilder.table.jcGantt).getComponent(Y.type);
    this.container.onclick = (a) => {
      a.stop(), a.event.preventDefault(), a.event.ctrlKey ? o.ctrlSelect(r) : a.event.shiftKey ? o.shiftSelect(r) : o.selectRow(r);
    };
  }
  /* public */
  render(t) {
    let e = this.rowBuilder.colOpt, i = this, s = i.rowBuilder.rowOpt.height;
    e.forEach((r) => {
      i.container.addHorizonTo(
        new zrender.Text({
          silent: !0,
          style: d(d(d({
            text: i.data[r.prop],
            backgroundColor: "#ffffff00",
            width: r.width || 100,
            x: r.width / 2 || 50,
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
    }), 1), !t && Nt(i.rect, "style", this.rowBuilder.rowOpt.hoverStyle.rowStyle);
  }
  getY() {
    return this.rowBuilder.table.rowGroup.parent.y + this.container.y;
  }
  restoreStyle() {
    let t = this.rowBuilder.rowOpt, e = t.commonStyle || {}, i = t.style, s;
    w(i) && (s = i(this.data));
    let r = d(d({
      stroke: "#acacac",
      fill: "#fff"
    }, e.rowStyle), s ? s.rowStyle : {});
    this.rect.dirty(), this.rect.attr("style", r);
  }
  getTasks() {
    return this.tasks;
  }
  getTaskByDate(t) {
    let e = null, i, s, r, o = u(t);
    for (let a = 0, h = this.tasks.length; a < h; a++)
      if (r = this.tasks[a], i = u(r.task.start), s = u(r.task.end), o.isBetween(i, s, "second", "[]")) {
        e = r;
        break;
      }
    return e;
  }
  /* private */
}
class je {
  constructor(t) {
    this.table = t;
  }
  createRow(t, e, i) {
    return new We(t, this, e, i);
  }
  createHead() {
  }
  init(t, e, i) {
    this.colOpt = t, this.rowOpt = e, this.background = i;
  }
}
class qe {
  constructor(t) {
    this.rows = [], this.table = t, this.container = new Q(2), this.tableRect = new zrender.Rect({
      shape: {
        width: t.container.__width,
        height: t.container.__height
      },
      style: d({
        fill: "none"
      }, t.option.style)
    }), this.container.addTo(this.tableRect, 1), this.rowBuilder = new je(this.table), this.rowBuilder.init(t.option.column, t.option.row, this.tableRect), this.rows = [];
  }
  render() {
    return zt(this, null, function* () {
      let t = this, e = this.rowBuilder, i = {};
      this.table.option.column.forEach((a) => {
        i[a.prop] = a.name;
      });
      let r, o = this.table.option.headStyle;
      this.table.timescale && (r = this.table.timescale.tierContainer.getContainer(2).realHeight, o.textStyle.height = r, o.textStyle.lineHeight = r), this.addRow(new zrender.Group({ silent: !0 }).add(e.createRow(i, 0, o).container)), yield this.table.getData().then((a) => {
        let h = new zrender.Group(), l = new I(), c, f = 1;
        a.forEach((g) => {
          c = e.createRow(g, f++), t.rows.push(c), l.addVertical(c.container);
        }), h.add(l), h.setClipPath(new zrender.Rect({
          shape: {
            x: 0,
            y: 0,
            width: h.getBoundingRect().width,
            height: h.getBoundingRect().height
          }
        })), t.addRow(h);
      });
    });
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
const Tt = class wt {
  constructor(t, e) {
    this.type = wt.type, this.rows = [], this.selections = [], this.timescale = e;
    let i = d(d({}, wt.defaultOption), t || {});
    this.option = i, this.originOption = S(i), this.container = new St(i.width, i.height, "auto", i.scroll), this.container.setComponent(this), this.initContentMenu();
  }
  setTheme(t, e) {
    this.option = S(this.originOption), t && z(t.table, this.option, e), this.container.setScrollerOption(this.option.scroll), this.container.__scroll.refresh(), this.taskBuilder.setTheme(t, e), this.refresh();
  }
  getCurrentData() {
    let t = [], e;
    return this.getRows().forEach((s) => {
      e = s.data, e.tasks = [], s.tasks.forEach((r) => {
        r.task.start = u(r.task.start).format("yyyy/MM/DD HH:mm:ss"), r.task.end = u(r.task.end).format("yyyy/MM/DD HH:mm:ss"), e.tasks.push(r.task);
      }), t.push(e);
    }), t;
  }
  setTimeScale(t) {
    this.timescale = t, this.timescale.setTable(this), this.container.bindScroll("vertical", t.container);
  }
  refresh() {
    console.log("table refresh");
    let t = this, e = new qe(this);
    e.render().then(() => {
      t.container.__content.removeAll();
      let i = e.container;
      t.rows = e.rows, t.rowGroup = e.getRowGroup(), t.headGroup = e.getHeadGroup(), t.container.addContent(i), t.container.__scroll.setTarget("vertical", e.getRowGroup());
      let s = m.getInstance(t.jcGantt).getComponent(x.type);
      s.backGround.setTable(t), s.refresh(), t.selections = [];
    });
  }
  getData() {
    if (this.option.loadData) {
      let t = this, e = this.timescale;
      return new Promise((i, s) => {
        t.option.loadData(e ? e.model.start : null, e ? e.model.end : null, i);
      });
    } else
      return new Promise((t, e) => {
        t(
          this.option.data ? S(this.option.data) : []
        );
      });
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
  getRowByPos(t) {
    let e = null;
    if (this.rows && this.rows.length > 0) {
      let i, s, r;
      for (let o = 0; o < this.rows.length; o++)
        if (i = this.rows[o], s = i.getY(), r = i.container.getBoundingRect().height, s <= t && t <= s + r) {
          e = i;
          break;
        }
    }
    return e;
  }
  clearSelections() {
    this.selections.length && (this.selections.forEach((t) => {
      t.restoreStyle(), t.rect.hoverForbid = !1;
    }), this.selections = []);
  }
  removeSelection(t) {
    t.restoreStyle(), t.rect.hoverForbid = !1, this.selections.splice(this.selections.indexOf(t), 1);
  }
  selectRow(t) {
    t && (t.rect.hoverForbid = !0, !(this.selections.length == 1 && this.selections.indexOf(t) >= 0) && (this.clearSelections(), this.addRowToSelection(t)));
  }
  ctrlSelect(t) {
    if (this.selections.length == 0)
      return this.selectRow(t);
    if (this.selections.indexOf(t) >= 0) {
      this.removeSelection(t);
      return;
    }
    this.addRowToSelection(t);
  }
  shiftSelect(t) {
    if (this.selections.length == 0)
      return this.selectRow(t);
    let e = this, i = this.selections[0].keyId, s = t.keyId, r = Math.max(i, s), o = Math.min(i, s);
    this.clearSelections(), this.rows.forEach((a) => {
      a.keyId >= o && a.keyId <= r && e.addRowToSelection(a);
    });
  }
  selectAll() {
    this.rows.forEach((t) => {
      this.addRowToSelection(t);
    });
  }
  getSelection() {
    return this.selections;
  }
  updateData(t) {
    this.option.data = t, this.refresh();
  }
  setOption(t) {
  }
  getRows() {
    return this.rows;
  }
  addRowToSelection(t) {
    t.rect.hoverForbid = !0;
    let e = this.option.row.selectStyle, i;
    w(e) && (i = e(t.data)), t.rect.dirty(), t.rect.attr("style", i && i.rowStyle ? i.rowStyle : { fill: "#f59600" }), this.selections.push(t);
  }
  initContentMenu() {
    let t = this;
    this.container.oncontextmenu = (e) => {
      e.stop(), e.event.preventDefault(), t.originOption.contextmenu ? C.getInstance().show(e.event.clientX, e.event.clientY, t.originOption.contextmenu) : C.getInstance().hide();
    };
  }
};
Tt.type = "table";
Tt.defaultOption = {
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
let Y = Tt;
class Ve extends zrender.Rect {
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
const ae = class he {
  constructor(t) {
    this.type = he.type, this.container = t, this.group = new zrender.Group(), this.lineX = new zrender.Line({
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
  show(t, e, i, s, r) {
    let o = m.getInstance(this.jcGantt).getComponent(x.type), a = o.getOffsetX(), h = o.getOffsetY();
    this.group.show(), this.startX = t, this.startY = e, this.lineX.attr("shape", {
      x1: this.startX,
      y1: this.startY,
      x2: this.startX,
      y2: this.endY - h
    }), this.lineY.attr("shape", {
      x1: this.startX,
      y1: this.startY,
      x2: this.endX - a,
      y2: this.startY
    }), this.tipX.attr("style", {
      x: this.startX,
      y: this.endY - h,
      text: i,
      backgroundColor: Ot[r]
    }), this.tipY.attr("style", {
      x: this.endX - a,
      y: this.startY,
      text: s,
      backgroundColor: Ot[r]
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
ae.type = "AxisPoint";
let N = ae;
class $e extends zrender.Group {
  constructor(t, e, i, s, r, o, a, h, l) {
    super(), this.jcGantt = t, this.container = e, this.option = i, this.row = s, this.task = r, this.x = o, this.y = a, this.width = h, this.height = l, this.init(), q.init(this);
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
      style: d({}, w(e.taskStyle) ? e.taskStyle(t.task, t.row.data) : {})
    }), this.text = new zrender.Text({
      style: d({
        text: w(e.text) ? e.text(t.task, t.row.data) : t.task.text,
        x: t.width / 2,
        width: t.width,
        height: t.height,
        align: "center",
        lineHeight: t.height,
        overflow: "truncate"
      }, w(e.textStyle) ? e.textStyle(t.task, t.row.data) : {})
    }), this.add(this.rect), this.add(this.text), this.setPosition([t.x, t.y]), this.initEvent();
  }
  initMove() {
    let t = this;
    this.virtualItem || (t.virtualItem = new Ve(t.rect), t.add(t.virtualItem)), this.dragLine || (t.dragLine = new zrender.Line({
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
      e.stop(), e.event.preventDefault(), q.forbid(), t.mousedown = !0;
      let i = t.width, s = t.height / 2, r = e.offsetX, o = e.offsetY, a = !1, h, l, c;
      document.onmousemove = (f) => {
        f.preventDefault(), this.initMove();
        let g = t.mouseMove(f, r, o, i, s);
        g && (h = g.row, l = g.date, r = g.x, o = g.y, a = g.success, c = g.task);
      }, document.onmouseup = (f) => {
        if (f.preventDefault(), !t.mousedown)
          return;
        m.getInstance(t.jcGantt).getComponent(N.type).hide(), t.virtualItem && t.remove(t.virtualItem), t.dragLine && t.remove(t.dragLine), t.timer && clearInterval(t.timer), t.mousedown = !1, document.onmousemove = null, document.onmouseup = null, a && t.drop(t.task, t.row, c, h, l), q.allow();
      };
    }, this.onclick = (e) => {
      e.stop(), e.event.preventDefault(), t.dirty();
      let i = m.getInstance(t.jcGantt).getComponent(kt.type);
      e.event.ctrlKey ? i.ctrlSelect(t) : i.selectTask(t);
    };
  }
  drop(t, e, i, s, r) {
    let o = this, a = this.option.onDrag;
    new Promise(function(h, l) {
      w(a) ? a(t, e.data, i ? i.task : null, s ? s.data : {}, r, h) : h();
    }).then(function() {
      m.getInstance(o.jcGantt).getComponent(Y.type).refresh();
    }).catch(function(h) {
      console.log(h);
    });
  }
  rePosition(t, e, i) {
    let s = m.getInstance(this.jcGantt).getComponent(x.type).coord, r = u(this.task.end).diff(this.task.start, "second");
    this.task.start = i, this.task.end = u(i).add(r, "second").toDate();
    let o = s.dateToX(i), a = s.dateToX(this.task.end), h = e.container.getBoundingRect().height - 8, l = e.getY() + 4;
    this.x = o, this.y = l, this.width = a - o, this.height = h, this.init(), t.tasks.splice(t.tasks.indexOf(this), 1), e.tasks.push(this), this.row = e;
  }
  mouseMove(t, e, i, s, r) {
    let o = this, a, h, l;
    if (t.preventDefault(), !t.zrX && t.zrX != 0 || !t.zrY && t.zrY != 0)
      return;
    let c = o.virtualItem, f = o.dragLine, g = m.getInstance(o.jcGantt), y = g.getComponent(Y.type), _ = g.getComponent(N.type), v = g.getComponent(x.type), ce = v.coord, Z = "", tt;
    h = ce.xToDate(c.x + c.parent.x), y && y.option.row && w(y.option.row.quickTip) && (a = y.getRowByPos(c.y + c.parent.y), a && (Z = y.option.row.quickTip(a.data), l = a.getTaskByDate(h))), tt = h.toLocaleString();
    let _t = "error", M;
    w(o.option.allowDrag) && (M = o.option.allowDrag(o.task, o.row.data, l ? l.task : null, a ? a.data : null, h), M.allow && (_t = "success"), M.messageX && (tt = M.messageX), M.messageY && (Z = M.messageY)), c.dirty(), c.setPosition([c.x + t.offsetX - e, c.y + t.offsetY - i]), f.attr("shape", {
      x1: s,
      y1: r,
      x2: c.x,
      y2: c.y
    }), _.show(c.x + c.parent.x, c.y + c.parent.y, tt, Z, _t), e = t.offsetX, i = t.offsetY;
    let D = v.isEdge(t.zrX, t.zrY);
    return D ? !o.timer && (o.timer = setInterval(function() {
      let L = 0;
      D == "right" ? L = v.container.__scroll.moveTo("horizon", 2) : D == "left" ? L = v.container.__scroll.moveTo("horizon", -2) : D == "top" ? L = v.container.__scroll.moveTo("vertical", -2) : D == "bottom" && (L = v.container.__scroll.moveTo("vertical", 2)), o.rePosVirtualRect(D, L);
    }, 20)) : (clearInterval(o.timer), o.timer = null), {
      row: a,
      date: h,
      x: e,
      y: i,
      success: M.allow,
      task: l
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
    let r = m.getInstance(this.jcGantt), o = r.getComponent(Y.type), a = r.getComponent(N.type), l = r.getComponent(x.type).coord, c = "", f, g, y;
    o && o.option.row && w(o.option.row.quickTip) && (g = o.getRowByPos(i.y + i.parent.y), g && (c = o.option.row.quickTip(g.data))), y = l.xToDate(i.x + i.parent.x), f = y.toLocaleString();
    let _ = "error", v;
    w(this.option.allowDrag) && (v = this.option.allowDrag(this.task, this.row.data, g ? g.getTaskByDate(y).task : null, g ? g.data : null, y), v.allow && (_ = "success"), v.messageX && (f = v.messageX), v.messageY && (c = v.messageY)), a.show(i.x + i.parent.x, i.y + i.parent.y, f, c, _);
  }
  getTooltip() {
    return w(this.option.tooltip) ? this.option.tooltip(this.task, this.row.data) : this.task.text;
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
class Ne extends G {
  constructor(t) {
    super(t, t), this.items = [], this.option = t;
  }
  refresh() {
    if (!this.taskBuilder)
      return;
    let t = this;
    this.items = [];
    let e = this.taskBuilder.timeScale.coord, i = this.taskBuilder.table.rows, s = this.taskBuilder.timeScale.model.end, r = u(s), o;
    i.forEach((a) => {
      a.data.tasks && a.data.tasks.forEach((l) => {
        if (s && u(l.start).isAfter(r))
          return;
        let c = e.dateToX(u(l.start).toDate()), f = e.dateToX(u(l.end).toDate()), g = a.container.getBoundingRect().height - 8, y = a.getY() + 4;
        o = new $e(this.taskBuilder.jcGantt, t.taskBuilder.timeScale.getTaskContainer(), t.originOption, a, l, c, y, f - c, g), a.tasks.push(o), t.items.push(o);
      });
    });
  }
  setBuilder(t) {
    this.taskBuilder = t;
  }
}
class Ke {
  render(t, e) {
    return t.items;
  }
}
const xt = class vt {
  constructor(t, e, i, s) {
    this.type = vt.type, this.selections = [];
    let r = d(d({}, vt.defaultOption), s);
    this.jcGantt = t, this.timeScale = e, this.timeScale.taskBuilder = this, this.table = i, this.table.taskBuilder = this, this.container = e.getTaskContainer(), this.model = new Ne(r), this.model.setBuilder(this), this.view = new Ke(), this.aXisPoint = new N(this.container), this.aXisPoint.jcGantt = this.jcGantt, m.getInstance(this.jcGantt).componentRegister(this.aXisPoint.type, this.aXisPoint);
  }
  setTheme(t, e) {
    this.model.originOption = S(this.model.option), t && z(t.task, this.model.originOption, e), this.model.fullOption = this.model.originOption, this.refresh();
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
xt.type = "TaskBuilder";
xt.defaultOption = {
  textStyle: (n, t) => ({
    fontSize: 12,
    fontWeight: "bold"
  }),
  taskStyle: (n, t) => ({
    fill: "#5cb3cc80",
    stroke: "#5cb3cc"
  })
};
let kt = xt;
const p = class B {
  /**
   * 注册一个主题
   * @param name 主题名称
   * @param option 主题配置
   * @param force 如果主题名称重复，是否覆盖
   */
  static registerTheme(t, e, i) {
    B.themeMap.has(t) && !i || B.themeMap.set(t, e);
  }
  static getTheme(t) {
    return B.themeMap.get(t);
  }
  static applyTheme(t, e, i) {
    if (E(e) && (e = B.getTheme(e)), !e)
      return;
    let s = S(e), r = s.timeLine.scales;
    delete s.timeLine.scales, z(s, t, i), t.timeLine.scales && t.timeLine.scales.forEach((o) => {
      z(r, o, i);
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
        taskStyle: (s, r) => ({
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
p.冰川蜜橙 = "冰川蜜橙";
p.青行未启 = "青行未启";
p.稚艾霓粉 = "稚艾霓粉";
p.西子退红 = "西子退红";
p.秋波虎牙 = "秋波虎牙";
p.冰河时代 = "冰河时代";
p.紫罗兰 = "紫罗兰";
p.橘绿之泉 = "橘绿之泉";
p.橘子糖 = "橘子糖";
p.玫瑰之后 = "玫瑰之后";
p.墨尔本晴 = "墨尔本晴";
p.themeMap = (/* @__PURE__ */ new Map()).set(p.冰川蜜橙, p.quickTheme("#84A3BC", "#FFBE90", "#E2A9A1")).set(p.稚艾霓粉, p.quickTheme("#CF929E", "#E3EB98", "#c5dc4a")).set(p.青行未启, p.quickTheme("#55bb8a", "#9eccab", "#84C08E")).set(p.西子退红, p.quickTheme("#87C0CA", "#F0CFE3", "#efb3e4")).set(p.秋波虎牙, p.quickTheme("#8ABCD1", "#E9D1B5", "#d7ad7b")).set(p.冰河时代, p.quickTheme("#2971BF", "#6EE5E3", "#CCE6D9")).set(p.紫罗兰, p.quickTheme("#9A2BD5", "#DDCDE8", "#5916AF")).set(p.橘绿之泉, p.quickTheme("#63D999", "#17bf70", "#266c56")).set(p.橘子糖, p.quickTheme("#85C8DF", "#FFE6B2", "#d7ad7b")).set(p.玫瑰之后, p.quickTheme("#F88C48", "#A7CCFF", "#E9BDBF")).set(p.墨尔本晴, p.quickTheme("#FF9F27", "#6CD1E4", "#E8DF88"));
let Yt = p;
const le = class K {
  /* public */
  constructor(t, e, i, s) {
    let r = K.initMap.get(t);
    r && (zrender.dispose(r.zrInstance), K.initMap.delete(t), window.removeEventListener("resize", r.resize), r = null), m.registerInstance(this), this._init(t, e, i, s), K.initMap.set(t, this);
  }
  /**
   * 设置主题
   * @param theme 主题名称
   * @param forceTheme 是否强制使用主题样式，
   *                      否:不会覆盖配置中的样式 是:覆盖配置中的样式
   */
  setTheme(t, e) {
    E(t) && (t = Yt.getTheme(t)), this.table.setTheme(t, e), this.timeScale.setTheme(t, e);
  }
  _init(t, e, i, s) {
    if (!t)
      throw new Error("The dom is required.(传入的dom不能为空)");
    let r = e || {};
    return this.originOption = r, Yt.applyTheme(r, i, s), t = this.resolveDom(t), this.dom = t, this.zrInstance = zrender.init(t), this.container = new St(this.zrInstance.getWidth(), this.zrInstance.getHeight(), "hidden"), this.initTimeScale(r), this.initTable(r), this.initTask(r), this.initMark(r), this.zrInstance.add(this.container), this.initResize(t), this.initApi(), this.onceRendered(), this;
  }
  /* private */
  resolveDom(t) {
    if (E(t) && (t = document.getElementById(t)), !t)
      throw new Error(`The element named '${t}' is not exit.(id为'${t}'的元素不存在)`);
    return t;
  }
  initTimeScale(t) {
    this.timeScale = new x(this.zrInstance, t.timeLine), this.timeScale.jcGantt = this, this.timeScale.refresh(), this.container.addContentHorizon(this.timeScale.container), m.getInstance(this).componentRegister(this.timeScale.type, this.timeScale);
  }
  initTable(t) {
    t.table && t.table.show === !1 || (this.table = new Y(t.table, this.timeScale), this.table.jcGantt = this, this.table && this.table.setTimeScale(this.timeScale), this.table.refresh(), this.container.addContentHorizon(this.table.container), m.getInstance(this).componentRegister(this.table.type, this.table));
  }
  initTask(t) {
    this.taskBuilder = new kt(this, this.timeScale, this.table, t.task || {}), m.getInstance(this).componentRegister(kt.type, this.taskBuilder), this.taskBuilder.refresh();
  }
  initMark(t) {
    t.mark && (this.mark = new ft(this, t.mark), this.mark.refresh(), m.getInstance(this).componentRegister(ft.type, this.mark));
  }
  initResize(t) {
    let e = this;
    window.addEventListener("resize", (i) => {
      e.resize();
    });
  }
  resize() {
    let t = this.dom, e = this.zrInstance, i = this.container, s = t.clientWidth, r = t.clientHeight;
    if (e.resize({ width: s, height: r }), i.resize(s, r), R.getInstance().publishedEvent(new j()), this.table) {
      let o = this.table.container.getBoundingRect();
      this.timeScale.container.setPosition([o.width, this.timeScale.container.y]);
    }
    R.getInstance().publishedEvent(new j());
  }
  initListener() {
    R.getInstance().removeListener(this.container), this.publishDefaultEvent();
  }
  publishDefaultEvent() {
    R.getInstance().publishedEvent(new j());
  }
  onceRendered() {
    if (this.initListener(), this.container.__content.eachChild((t) => {
      t.setPosition([0, 0]);
    }), this.table) {
      let t = this.table.container.getBoundingRect();
      this.timeScale.container.setPosition([t.width, this.timeScale.container.y]);
    }
    this.zrInstance.on("click", (t) => {
      C.getInstance().hide();
    }), this.zrInstance.on("contextmenu", (t) => {
      t.target || C.getInstance().hide();
    }), this.zrInstance.on("mousedown", (t) => {
      C.getInstance().hide();
    });
  }
  initApi() {
    this.tableApi = new Je(this.table), this.timeScaleApi = new Ue(this.timeScale), this.taskApi = new Qe(this.taskBuilder);
  }
};
le.initMap = /* @__PURE__ */ new Map();
let ti = le;
class Je {
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
}
class Ue {
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
class Qe {
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
  ti as default
};
