var Vi = { value: () => {
} };
function rn() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new ue(n);
}
function ue(t) {
  this._ = t;
}
function Gi(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", s = n.indexOf(".");
    if (s >= 0 && (i = n.slice(s + 1), n = n.slice(0, s)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
ue.prototype = rn.prototype = {
  constructor: ue,
  on: function(t, e) {
    var n = this._, i = Gi(t + "", n), s, r = -1, o = i.length;
    if (arguments.length < 2) {
      for (; ++r < o; ) if ((s = (t = i[r]).type) && (s = ji(n[s], t.name))) return s;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < o; )
      if (s = (t = i[r]).type) n[s] = bn(n[s], t.name, e);
      else if (e == null) for (s in n) n[s] = bn(n[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new ue(t);
  },
  call: function(t, e) {
    if ((s = arguments.length - 2) > 0) for (var n = new Array(s), i = 0, s, r; i < s; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (r = this._[t], i = 0, s = r.length; i < s; ++i) r[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], s = 0, r = i.length; s < r; ++s) i[s].value.apply(e, n);
  }
};
function ji(t, e) {
  for (var n = 0, i = t.length, s; n < i; ++n)
    if ((s = t[n]).name === e)
      return s.value;
}
function bn(t, e, n) {
  for (var i = 0, s = t.length; i < s; ++i)
    if (t[i].name === e) {
      t[i] = Vi, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ye = "http://www.w3.org/1999/xhtml";
const $n = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ye,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ce(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), $n.hasOwnProperty(e) ? { space: $n[e], local: t } : t;
}
function Ki(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ye && e.documentElement.namespaceURI === Ye ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Qi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function ri(t) {
  var e = Ce(t);
  return (e.local ? Qi : Ki)(e);
}
function Ji() {
}
function on(t) {
  return t == null ? Ji : function() {
    return this.querySelector(t);
  };
}
function ts(t) {
  typeof t != "function" && (t = on(t));
  for (var e = this._groups, n = e.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = e[s], o = r.length, a = i[s] = new Array(o), h, l, c = 0; c < o; ++c)
      (h = r[c]) && (l = t.call(h, h.__data__, c, r)) && ("__data__" in h && (l.__data__ = h.__data__), a[c] = l);
  return new j(i, this._parents);
}
function es(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ns() {
  return [];
}
function oi(t) {
  return t == null ? ns : function() {
    return this.querySelectorAll(t);
  };
}
function is(t) {
  return function() {
    return es(t.apply(this, arguments));
  };
}
function ss(t) {
  typeof t == "function" ? t = is(t) : t = oi(t);
  for (var e = this._groups, n = e.length, i = [], s = [], r = 0; r < n; ++r)
    for (var o = e[r], a = o.length, h, l = 0; l < a; ++l)
      (h = o[l]) && (i.push(t.call(h, h.__data__, l, o)), s.push(h));
  return new j(i, s);
}
function ai(t) {
  return function() {
    return this.matches(t);
  };
}
function hi(t) {
  return function(e) {
    return e.matches(t);
  };
}
var rs = Array.prototype.find;
function os(t) {
  return function() {
    return rs.call(this.children, t);
  };
}
function as() {
  return this.firstElementChild;
}
function hs(t) {
  return this.select(t == null ? as : os(typeof t == "function" ? t : hi(t)));
}
var ls = Array.prototype.filter;
function cs() {
  return Array.from(this.children);
}
function ds(t) {
  return function() {
    return ls.call(this.children, t);
  };
}
function us(t) {
  return this.selectAll(t == null ? cs : ds(typeof t == "function" ? t : hi(t)));
}
function fs(t) {
  typeof t != "function" && (t = ai(t));
  for (var e = this._groups, n = e.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = e[s], o = r.length, a = i[s] = [], h, l = 0; l < o; ++l)
      (h = r[l]) && t.call(h, h.__data__, l, r) && a.push(h);
  return new j(i, this._parents);
}
function li(t) {
  return new Array(t.length);
}
function ps() {
  return new j(this._enter || this._groups.map(li), this._parents);
}
function ve(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ve.prototype = {
  constructor: ve,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function gs(t) {
  return function() {
    return t;
  };
}
function ms(t, e, n, i, s, r) {
  for (var o = 0, a, h = e.length, l = r.length; o < l; ++o)
    (a = e[o]) ? (a.__data__ = r[o], i[o] = a) : n[o] = new ve(t, r[o]);
  for (; o < h; ++o)
    (a = e[o]) && (s[o] = a);
}
function ys(t, e, n, i, s, r, o) {
  var a, h, l = /* @__PURE__ */ new Map(), c = e.length, d = r.length, f = new Array(c), p;
  for (a = 0; a < c; ++a)
    (h = e[a]) && (f[a] = p = o.call(h, h.__data__, a, e) + "", l.has(p) ? s[a] = h : l.set(p, h));
  for (a = 0; a < d; ++a)
    p = o.call(t, r[a], a, r) + "", (h = l.get(p)) ? (i[a] = h, h.__data__ = r[a], l.delete(p)) : n[a] = new ve(t, r[a]);
  for (a = 0; a < c; ++a)
    (h = e[a]) && l.get(f[a]) === h && (s[a] = h);
}
function vs(t) {
  return t.__data__;
}
function ws(t, e) {
  if (!arguments.length) return Array.from(this, vs);
  var n = e ? ys : ms, i = this._parents, s = this._groups;
  typeof t != "function" && (t = gs(t));
  for (var r = s.length, o = new Array(r), a = new Array(r), h = new Array(r), l = 0; l < r; ++l) {
    var c = i[l], d = s[l], f = d.length, p = xs(t.call(c, c && c.__data__, l, i)), m = p.length, b = a[l] = new Array(m), E = o[l] = new Array(m), v = h[l] = new Array(f);
    n(c, d, b, E, v, p, e);
    for (var A = 0, H = 0, T, X; A < m; ++A)
      if (T = b[A]) {
        for (A >= H && (H = A + 1); !(X = E[H]) && ++H < m; ) ;
        T._next = X || null;
      }
  }
  return o = new j(o, i), o._enter = a, o._exit = h, o;
}
function xs(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function bs() {
  return new j(this._exit || this._groups.map(li), this._parents);
}
function $s(t, e, n) {
  var i = this.enter(), s = this, r = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (s = e(s), s && (s = s.selection())), n == null ? r.remove() : n(r), i && s ? i.merge(s).order() : s;
}
function _s(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, s = n.length, r = i.length, o = Math.min(s, r), a = new Array(s), h = 0; h < o; ++h)
    for (var l = n[h], c = i[h], d = l.length, f = a[h] = new Array(d), p, m = 0; m < d; ++m)
      (p = l[m] || c[m]) && (f[m] = p);
  for (; h < s; ++h)
    a[h] = n[h];
  return new j(a, this._parents);
}
function zs() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], s = i.length - 1, r = i[s], o; --s >= 0; )
      (o = i[s]) && (r && o.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(o, r), r = o);
  return this;
}
function Ss(t) {
  t || (t = Es);
  function e(d, f) {
    return d && f ? t(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), r = 0; r < i; ++r) {
    for (var o = n[r], a = o.length, h = s[r] = new Array(a), l, c = 0; c < a; ++c)
      (l = o[c]) && (h[c] = l);
    h.sort(e);
  }
  return new j(s, this._parents).order();
}
function Es(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ks() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ms() {
  return Array.from(this);
}
function Cs() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], s = 0, r = i.length; s < r; ++s) {
      var o = i[s];
      if (o) return o;
    }
  return null;
}
function As() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Ns() {
  return !this.node();
}
function Hs(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var s = e[n], r = 0, o = s.length, a; r < o; ++r)
      (a = s[r]) && t.call(a, a.__data__, r, s);
  return this;
}
function Ps(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Rs(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ls(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ts(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ds(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Os(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Is(t, e) {
  var n = Ce(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Rs : Ps : typeof e == "function" ? n.local ? Os : Ds : n.local ? Ts : Ls)(n, e));
}
function ci(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Bs(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Us(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Xs(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function Ys(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Bs : typeof e == "function" ? Xs : Us)(t, e, n ?? "")) : Lt(this.node(), t);
}
function Lt(t, e) {
  return t.style.getPropertyValue(e) || ci(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Fs(t) {
  return function() {
    delete this[t];
  };
}
function Zs(t, e) {
  return function() {
    this[t] = e;
  };
}
function qs(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Ws(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Fs : typeof e == "function" ? qs : Zs)(t, e)) : this.node()[t];
}
function di(t) {
  return t.trim().split(/^|\s+/);
}
function an(t) {
  return t.classList || new ui(t);
}
function ui(t) {
  this._node = t, this._names = di(t.getAttribute("class") || "");
}
ui.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function fi(t, e) {
  for (var n = an(t), i = -1, s = e.length; ++i < s; ) n.add(e[i]);
}
function pi(t, e) {
  for (var n = an(t), i = -1, s = e.length; ++i < s; ) n.remove(e[i]);
}
function Vs(t) {
  return function() {
    fi(this, t);
  };
}
function Gs(t) {
  return function() {
    pi(this, t);
  };
}
function js(t, e) {
  return function() {
    (e.apply(this, arguments) ? fi : pi)(this, t);
  };
}
function Ks(t, e) {
  var n = di(t + "");
  if (arguments.length < 2) {
    for (var i = an(this.node()), s = -1, r = n.length; ++s < r; ) if (!i.contains(n[s])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? js : e ? Vs : Gs)(n, e));
}
function Qs() {
  this.textContent = "";
}
function Js(t) {
  return function() {
    this.textContent = t;
  };
}
function tr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function er(t) {
  return arguments.length ? this.each(t == null ? Qs : (typeof t == "function" ? tr : Js)(t)) : this.node().textContent;
}
function nr() {
  this.innerHTML = "";
}
function ir(t) {
  return function() {
    this.innerHTML = t;
  };
}
function sr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function rr(t) {
  return arguments.length ? this.each(t == null ? nr : (typeof t == "function" ? sr : ir)(t)) : this.node().innerHTML;
}
function or() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ar() {
  return this.each(or);
}
function hr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lr() {
  return this.each(hr);
}
function cr(t) {
  var e = typeof t == "function" ? t : ri(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function dr() {
  return null;
}
function ur(t, e) {
  var n = typeof t == "function" ? t : ri(t), i = e == null ? dr : typeof e == "function" ? e : on(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function fr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function pr() {
  return this.each(fr);
}
function gr() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function mr() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function yr(t) {
  return this.select(t ? mr : gr);
}
function vr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function wr(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function xr(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function br(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, s = e.length, r; n < s; ++n)
        r = e[n], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++i] = r;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function $r(t, e, n) {
  return function() {
    var i = this.__on, s, r = wr(e);
    if (i) {
      for (var o = 0, a = i.length; o < a; ++o)
        if ((s = i[o]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = r, s.options = n), s.value = e;
          return;
        }
    }
    this.addEventListener(t.type, r, n), s = { type: t.type, name: t.name, value: e, listener: r, options: n }, i ? i.push(s) : this.__on = [s];
  };
}
function _r(t, e, n) {
  var i = xr(t + ""), s, r = i.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var h = 0, l = a.length, c; h < l; ++h)
        for (s = 0, c = a[h]; s < r; ++s)
          if ((o = i[s]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = e ? $r : br, s = 0; s < r; ++s) this.each(a(i[s], e, n));
  return this;
}
function gi(t, e, n) {
  var i = ci(t), s = i.CustomEvent;
  typeof s == "function" ? s = new s(e, n) : (s = i.document.createEvent("Event"), n ? (s.initEvent(e, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(e, !1, !1)), t.dispatchEvent(s);
}
function zr(t, e) {
  return function() {
    return gi(this, t, e);
  };
}
function Sr(t, e) {
  return function() {
    return gi(this, t, e.apply(this, arguments));
  };
}
function Er(t, e) {
  return this.each((typeof e == "function" ? Sr : zr)(t, e));
}
function* kr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], s = 0, r = i.length, o; s < r; ++s)
      (o = i[s]) && (yield o);
}
var mi = [null];
function j(t, e) {
  this._groups = t, this._parents = e;
}
function ee() {
  return new j([[document.documentElement]], mi);
}
function Mr() {
  return this;
}
j.prototype = ee.prototype = {
  constructor: j,
  select: ts,
  selectAll: ss,
  selectChild: hs,
  selectChildren: us,
  filter: fs,
  data: ws,
  enter: ps,
  exit: bs,
  join: $s,
  merge: _s,
  selection: Mr,
  order: zs,
  sort: Ss,
  call: ks,
  nodes: Ms,
  node: Cs,
  size: As,
  empty: Ns,
  each: Hs,
  attr: Is,
  style: Ys,
  property: Ws,
  classed: Ks,
  text: er,
  html: rr,
  raise: ar,
  lower: lr,
  append: cr,
  insert: ur,
  remove: pr,
  clone: yr,
  datum: vr,
  on: _r,
  dispatch: Er,
  [Symbol.iterator]: kr
};
function wt(t) {
  return typeof t == "string" ? new j([[document.querySelector(t)]], [document.documentElement]) : new j([[t]], mi);
}
function Cr(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function vt(t, e) {
  if (t = Cr(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var i = n.createSVGPoint();
      return i.x = t.clientX, i.y = t.clientY, i = i.matrixTransform(e.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (e.getBoundingClientRect) {
      var s = e.getBoundingClientRect();
      return [t.clientX - s.left - e.clientLeft, t.clientY - s.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const Fe = { capture: !0, passive: !1 };
function Ze(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ar(t) {
  var e = t.document.documentElement, n = wt(t).on("dragstart.drag", Ze, Fe);
  "onselectstart" in e ? n.on("selectstart.drag", Ze, Fe) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Nr(t, e) {
  var n = t.document.documentElement, i = wt(t).on("dragstart.drag", null);
  e && (i.on("click.drag", Ze, Fe), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function hn(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function yi(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function ne() {
}
var Vt = 0.7, we = 1 / Vt, Rt = "\\s*([+-]?\\d+)\\s*", Gt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ht = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Hr = /^#([0-9a-f]{3,8})$/, Pr = new RegExp(`^rgb\\(${Rt},${Rt},${Rt}\\)$`), Rr = new RegExp(`^rgb\\(${ht},${ht},${ht}\\)$`), Lr = new RegExp(`^rgba\\(${Rt},${Rt},${Rt},${Gt}\\)$`), Tr = new RegExp(`^rgba\\(${ht},${ht},${ht},${Gt}\\)$`), Dr = new RegExp(`^hsl\\(${Gt},${ht},${ht}\\)$`), Or = new RegExp(`^hsla\\(${Gt},${ht},${ht},${Gt}\\)$`), _n = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
hn(ne, St, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: zn,
  // Deprecated! Use color.formatHex.
  formatHex: zn,
  formatHex8: Ir,
  formatHsl: Br,
  formatRgb: Sn,
  toString: Sn
});
function zn() {
  return this.rgb().formatHex();
}
function Ir() {
  return this.rgb().formatHex8();
}
function Br() {
  return vi(this).formatHsl();
}
function Sn() {
  return this.rgb().formatRgb();
}
function St(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Hr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? En(e) : n === 3 ? new F(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? ae(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? ae(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Pr.exec(t)) ? new F(e[1], e[2], e[3], 1) : (e = Rr.exec(t)) ? new F(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Lr.exec(t)) ? ae(e[1], e[2], e[3], e[4]) : (e = Tr.exec(t)) ? ae(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Dr.exec(t)) ? Cn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Or.exec(t)) ? Cn(e[1], e[2] / 100, e[3] / 100, e[4]) : _n.hasOwnProperty(t) ? En(_n[t]) : t === "transparent" ? new F(NaN, NaN, NaN, 0) : null;
}
function En(t) {
  return new F(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ae(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new F(t, e, n, i);
}
function Ur(t) {
  return t instanceof ne || (t = St(t)), t ? (t = t.rgb(), new F(t.r, t.g, t.b, t.opacity)) : new F();
}
function qe(t, e, n, i) {
  return arguments.length === 1 ? Ur(t) : new F(t, e, n, i ?? 1);
}
function F(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
hn(F, qe, yi(ne, {
  brighter(t) {
    return t = t == null ? we : Math.pow(we, t), new F(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Vt : Math.pow(Vt, t), new F(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new F(zt(this.r), zt(this.g), zt(this.b), xe(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: kn,
  // Deprecated! Use color.formatHex.
  formatHex: kn,
  formatHex8: Xr,
  formatRgb: Mn,
  toString: Mn
}));
function kn() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}`;
}
function Xr() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}${$t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mn() {
  const t = xe(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${zt(this.r)}, ${zt(this.g)}, ${zt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function xe(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function zt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function $t(t) {
  return t = zt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Cn(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new st(t, e, n, i);
}
function vi(t) {
  if (t instanceof st) return new st(t.h, t.s, t.l, t.opacity);
  if (t instanceof ne || (t = St(t)), !t) return new st();
  if (t instanceof st) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, s = Math.min(e, n, i), r = Math.max(e, n, i), o = NaN, a = r - s, h = (r + s) / 2;
  return a ? (e === r ? o = (n - i) / a + (n < i) * 6 : n === r ? o = (i - e) / a + 2 : o = (e - n) / a + 4, a /= h < 0.5 ? r + s : 2 - r - s, o *= 60) : a = h > 0 && h < 1 ? 0 : o, new st(o, a, h, t.opacity);
}
function Yr(t, e, n, i) {
  return arguments.length === 1 ? vi(t) : new st(t, e, n, i ?? 1);
}
function st(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
hn(st, Yr, yi(ne, {
  brighter(t) {
    return t = t == null ? we : Math.pow(we, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Vt : Math.pow(Vt, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, s = 2 * n - i;
    return new F(
      Te(t >= 240 ? t - 240 : t + 120, s, i),
      Te(t, s, i),
      Te(t < 120 ? t + 240 : t - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new st(An(this.h), he(this.s), he(this.l), xe(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = xe(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${An(this.h)}, ${he(this.s) * 100}%, ${he(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function An(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function he(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Te(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const ln = (t) => () => t;
function Fr(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Zr(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function qr(t) {
  return (t = +t) == 1 ? wi : function(e, n) {
    return n - e ? Zr(e, n, t) : ln(isNaN(e) ? n : e);
  };
}
function wi(t, e) {
  var n = e - t;
  return n ? Fr(t, n) : ln(isNaN(t) ? e : t);
}
const be = (function t(e) {
  var n = qr(e);
  function i(s, r) {
    var o = n((s = qe(s)).r, (r = qe(r)).r), a = n(s.g, r.g), h = n(s.b, r.b), l = wi(s.opacity, r.opacity);
    return function(c) {
      return s.r = o(c), s.g = a(c), s.b = h(c), s.opacity = l(c), s + "";
    };
  }
  return i.gamma = t, i;
})(1);
function Wr(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, i = e.slice(), s;
  return function(r) {
    for (s = 0; s < n; ++s) i[s] = t[s] * (1 - r) + e[s] * r;
    return i;
  };
}
function Vr(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Gr(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, s = new Array(i), r = new Array(n), o;
  for (o = 0; o < i; ++o) s[o] = Zt(t[o], e[o]);
  for (; o < n; ++o) r[o] = e[o];
  return function(a) {
    for (o = 0; o < i; ++o) r[o] = s[o](a);
    return r;
  };
}
function jr(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function at(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Kr(t, e) {
  var n = {}, i = {}, s;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (s in e)
    s in t ? n[s] = Zt(t[s], e[s]) : i[s] = e[s];
  return function(r) {
    for (s in n) i[s] = n[s](r);
    return i;
  };
}
var We = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, De = new RegExp(We.source, "g");
function Qr(t) {
  return function() {
    return t;
  };
}
function Jr(t) {
  return function(e) {
    return t(e) + "";
  };
}
function xi(t, e) {
  var n = We.lastIndex = De.lastIndex = 0, i, s, r, o = -1, a = [], h = [];
  for (t = t + "", e = e + ""; (i = We.exec(t)) && (s = De.exec(e)); )
    (r = s.index) > n && (r = e.slice(n, r), a[o] ? a[o] += r : a[++o] = r), (i = i[0]) === (s = s[0]) ? a[o] ? a[o] += s : a[++o] = s : (a[++o] = null, h.push({ i: o, x: at(i, s) })), n = De.lastIndex;
  return n < e.length && (r = e.slice(n), a[o] ? a[o] += r : a[++o] = r), a.length < 2 ? h[0] ? Jr(h[0].x) : Qr(e) : (e = h.length, function(l) {
    for (var c = 0, d; c < e; ++c) a[(d = h[c]).i] = d.x(l);
    return a.join("");
  });
}
function Zt(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? ln(e) : (n === "number" ? at : n === "string" ? (i = St(e)) ? (e = i, be) : xi : e instanceof St ? be : e instanceof Date ? jr : Vr(e) ? Wr : Array.isArray(e) ? Gr : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Kr : at)(t, e);
}
var Nn = 180 / Math.PI, Ve = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function bi(t, e, n, i, s, r) {
  var o, a, h;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (h = t * n + e * i) && (n -= t * h, i -= e * h), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, h /= a), t * i < e * n && (t = -t, e = -e, h = -h, o = -o), {
    translateX: s,
    translateY: r,
    rotate: Math.atan2(e, t) * Nn,
    skewX: Math.atan(h) * Nn,
    scaleX: o,
    scaleY: a
  };
}
var le;
function to(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ve : bi(e.a, e.b, e.c, e.d, e.e, e.f);
}
function eo(t) {
  return t == null || (le || (le = document.createElementNS("http://www.w3.org/2000/svg", "g")), le.setAttribute("transform", t), !(t = le.transform.baseVal.consolidate())) ? Ve : (t = t.matrix, bi(t.a, t.b, t.c, t.d, t.e, t.f));
}
function $i(t, e, n, i) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function r(l, c, d, f, p, m) {
    if (l !== d || c !== f) {
      var b = p.push("translate(", null, e, null, n);
      m.push({ i: b - 4, x: at(l, d) }, { i: b - 2, x: at(c, f) });
    } else (d || f) && p.push("translate(" + d + e + f + n);
  }
  function o(l, c, d, f) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), f.push({ i: d.push(s(d) + "rotate(", null, i) - 2, x: at(l, c) })) : c && d.push(s(d) + "rotate(" + c + i);
  }
  function a(l, c, d, f) {
    l !== c ? f.push({ i: d.push(s(d) + "skewX(", null, i) - 2, x: at(l, c) }) : c && d.push(s(d) + "skewX(" + c + i);
  }
  function h(l, c, d, f, p, m) {
    if (l !== d || c !== f) {
      var b = p.push(s(p) + "scale(", null, ",", null, ")");
      m.push({ i: b - 4, x: at(l, d) }, { i: b - 2, x: at(c, f) });
    } else (d !== 1 || f !== 1) && p.push(s(p) + "scale(" + d + "," + f + ")");
  }
  return function(l, c) {
    var d = [], f = [];
    return l = t(l), c = t(c), r(l.translateX, l.translateY, c.translateX, c.translateY, d, f), o(l.rotate, c.rotate, d, f), a(l.skewX, c.skewX, d, f), h(l.scaleX, l.scaleY, c.scaleX, c.scaleY, d, f), l = c = null, function(p) {
      for (var m = -1, b = f.length, E; ++m < b; ) d[(E = f[m]).i] = E.x(p);
      return d.join("");
    };
  };
}
var no = $i(to, "px, ", "px)", "deg)"), io = $i(eo, ", ", ")", ")"), so = 1e-12;
function Hn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function ro(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function oo(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const fe = (function t(e, n, i) {
  function s(r, o) {
    var a = r[0], h = r[1], l = r[2], c = o[0], d = o[1], f = o[2], p = c - a, m = d - h, b = p * p + m * m, E, v;
    if (b < so)
      v = Math.log(f / l) / e, E = function(O) {
        return [
          a + O * p,
          h + O * m,
          l * Math.exp(e * O * v)
        ];
      };
    else {
      var A = Math.sqrt(b), H = (f * f - l * l + i * b) / (2 * l * n * A), T = (f * f - l * l - i * b) / (2 * f * n * A), X = Math.log(Math.sqrt(H * H + 1) - H), R = Math.log(Math.sqrt(T * T + 1) - T);
      v = (R - X) / e, E = function(O) {
        var tt = O * v, et = Hn(X), yt = l / (n * A) * (et * oo(e * tt + X) - ro(X));
        return [
          a + yt * p,
          h + yt * m,
          l * et / Hn(e * tt + X)
        ];
      };
    }
    return E.duration = v * 1e3 * e / Math.SQRT2, E;
  }
  return s.rho = function(r) {
    var o = Math.max(1e-3, +r), a = o * o, h = a * a;
    return t(o, a, h);
  }, s;
})(Math.SQRT2, 2, 4);
var Tt = 0, Yt = 0, Bt = 0, _i = 1e3, $e, Ft, _e = 0, Et = 0, Ae = 0, jt = typeof performance == "object" && performance.now ? performance : Date, zi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function cn() {
  return Et || (zi(ao), Et = jt.now() + Ae);
}
function ao() {
  Et = 0;
}
function ze() {
  this._call = this._time = this._next = null;
}
ze.prototype = Si.prototype = {
  constructor: ze,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? cn() : +n) + (e == null ? 0 : +e), !this._next && Ft !== this && (Ft ? Ft._next = this : $e = this, Ft = this), this._call = t, this._time = n, Ge();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ge());
  }
};
function Si(t, e, n) {
  var i = new ze();
  return i.restart(t, e, n), i;
}
function ho() {
  cn(), ++Tt;
  for (var t = $e, e; t; )
    (e = Et - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Tt;
}
function Pn() {
  Et = (_e = jt.now()) + Ae, Tt = Yt = 0;
  try {
    ho();
  } finally {
    Tt = 0, co(), Et = 0;
  }
}
function lo() {
  var t = jt.now(), e = t - _e;
  e > _i && (Ae -= e, _e = t);
}
function co() {
  for (var t, e = $e, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : $e = n);
  Ft = t, Ge(i);
}
function Ge(t) {
  if (!Tt) {
    Yt && (Yt = clearTimeout(Yt));
    var e = t - Et;
    e > 24 ? (t < 1 / 0 && (Yt = setTimeout(Pn, t - jt.now() - Ae)), Bt && (Bt = clearInterval(Bt))) : (Bt || (_e = jt.now(), Bt = setInterval(lo, _i)), Tt = 1, zi(Pn));
  }
}
function Rn(t, e, n) {
  var i = new ze();
  return e = e == null ? 0 : +e, i.restart((s) => {
    i.stop(), t(s + e);
  }, e, n), i;
}
var uo = rn("start", "end", "cancel", "interrupt"), fo = [], Ei = 0, Ln = 1, je = 2, pe = 3, Tn = 4, Ke = 5, ge = 6;
function Ne(t, e, n, i, s, r) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  po(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: uo,
    tween: fo,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: Ei
  });
}
function dn(t, e) {
  var n = rt(t, e);
  if (n.state > Ei) throw new Error("too late; already scheduled");
  return n;
}
function lt(t, e) {
  var n = rt(t, e);
  if (n.state > pe) throw new Error("too late; already running");
  return n;
}
function rt(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function po(t, e, n) {
  var i = t.__transition, s;
  i[e] = n, n.timer = Si(r, 0, n.time);
  function r(l) {
    n.state = Ln, n.timer.restart(o, n.delay, n.time), n.delay <= l && o(l - n.delay);
  }
  function o(l) {
    var c, d, f, p;
    if (n.state !== Ln) return h();
    for (c in i)
      if (p = i[c], p.name === n.name) {
        if (p.state === pe) return Rn(o);
        p.state === Tn ? (p.state = ge, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete i[c]) : +c < e && (p.state = ge, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete i[c]);
      }
    if (Rn(function() {
      n.state === pe && (n.state = Tn, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = je, n.on.call("start", t, t.__data__, n.index, n.group), n.state === je) {
      for (n.state = pe, s = new Array(f = n.tween.length), c = 0, d = -1; c < f; ++c)
        (p = n.tween[c].value.call(t, t.__data__, n.index, n.group)) && (s[++d] = p);
      s.length = d + 1;
    }
  }
  function a(l) {
    for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(h), n.state = Ke, 1), d = -1, f = s.length; ++d < f; )
      s[d].call(t, c);
    n.state === Ke && (n.on.call("end", t, t.__data__, n.index, n.group), h());
  }
  function h() {
    n.state = ge, n.timer.stop(), delete i[e];
    for (var l in i) return;
    delete t.__transition;
  }
}
function me(t, e) {
  var n = t.__transition, i, s, r = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((i = n[o]).name !== e) {
        r = !1;
        continue;
      }
      s = i.state > je && i.state < Ke, i.state = ge, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[o];
    }
    r && delete t.__transition;
  }
}
function go(t) {
  return this.each(function() {
    me(this, t);
  });
}
function mo(t, e) {
  var n, i;
  return function() {
    var s = lt(this, t), r = s.tween;
    if (r !== n) {
      i = n = r;
      for (var o = 0, a = i.length; o < a; ++o)
        if (i[o].name === e) {
          i = i.slice(), i.splice(o, 1);
          break;
        }
    }
    s.tween = i;
  };
}
function yo(t, e, n) {
  var i, s;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = lt(this, t), o = r.tween;
    if (o !== i) {
      s = (i = o).slice();
      for (var a = { name: e, value: n }, h = 0, l = s.length; h < l; ++h)
        if (s[h].name === e) {
          s[h] = a;
          break;
        }
      h === l && s.push(a);
    }
    r.tween = s;
  };
}
function vo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = rt(this.node(), n).tween, s = 0, r = i.length, o; s < r; ++s)
      if ((o = i[s]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? mo : yo)(n, t, e));
}
function un(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var s = lt(this, i);
    (s.value || (s.value = {}))[e] = n.apply(this, arguments);
  }), function(s) {
    return rt(s, i).value[e];
  };
}
function ki(t, e) {
  var n;
  return (typeof e == "number" ? at : e instanceof St ? be : (n = St(e)) ? (e = n, be) : xi)(t, e);
}
function wo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function xo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function bo(t, e, n) {
  var i, s = n + "", r;
  return function() {
    var o = this.getAttribute(t);
    return o === s ? null : o === i ? r : r = e(i = o, n);
  };
}
function $o(t, e, n) {
  var i, s = n + "", r;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === s ? null : o === i ? r : r = e(i = o, n);
  };
}
function _o(t, e, n) {
  var i, s, r;
  return function() {
    var o, a = n(this), h;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), h = a + "", o === h ? null : o === i && h === s ? r : (s = h, r = e(i = o, a)));
  };
}
function zo(t, e, n) {
  var i, s, r;
  return function() {
    var o, a = n(this), h;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), h = a + "", o === h ? null : o === i && h === s ? r : (s = h, r = e(i = o, a)));
  };
}
function So(t, e) {
  var n = Ce(t), i = n === "transform" ? io : ki;
  return this.attrTween(t, typeof e == "function" ? (n.local ? zo : _o)(n, i, un(this, "attr." + t, e)) : e == null ? (n.local ? xo : wo)(n) : (n.local ? $o : bo)(n, i, e));
}
function Eo(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function ko(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Mo(t, e) {
  var n, i;
  function s() {
    var r = e.apply(this, arguments);
    return r !== i && (n = (i = r) && ko(t, r)), n;
  }
  return s._value = e, s;
}
function Co(t, e) {
  var n, i;
  function s() {
    var r = e.apply(this, arguments);
    return r !== i && (n = (i = r) && Eo(t, r)), n;
  }
  return s._value = e, s;
}
function Ao(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = Ce(t);
  return this.tween(n, (i.local ? Mo : Co)(i, e));
}
function No(t, e) {
  return function() {
    dn(this, t).delay = +e.apply(this, arguments);
  };
}
function Ho(t, e) {
  return e = +e, function() {
    dn(this, t).delay = e;
  };
}
function Po(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? No : Ho)(e, t)) : rt(this.node(), e).delay;
}
function Ro(t, e) {
  return function() {
    lt(this, t).duration = +e.apply(this, arguments);
  };
}
function Lo(t, e) {
  return e = +e, function() {
    lt(this, t).duration = e;
  };
}
function To(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ro : Lo)(e, t)) : rt(this.node(), e).duration;
}
function Do(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    lt(this, t).ease = e;
  };
}
function Oo(t) {
  var e = this._id;
  return arguments.length ? this.each(Do(e, t)) : rt(this.node(), e).ease;
}
function Io(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    lt(this, t).ease = n;
  };
}
function Bo(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Io(this._id, t));
}
function Uo(t) {
  typeof t != "function" && (t = ai(t));
  for (var e = this._groups, n = e.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = e[s], o = r.length, a = i[s] = [], h, l = 0; l < o; ++l)
      (h = r[l]) && t.call(h, h.__data__, l, r) && a.push(h);
  return new pt(i, this._parents, this._name, this._id);
}
function Xo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, s = n.length, r = Math.min(i, s), o = new Array(i), a = 0; a < r; ++a)
    for (var h = e[a], l = n[a], c = h.length, d = o[a] = new Array(c), f, p = 0; p < c; ++p)
      (f = h[p] || l[p]) && (d[p] = f);
  for (; a < i; ++a)
    o[a] = e[a];
  return new pt(o, this._parents, this._name, this._id);
}
function Yo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Fo(t, e, n) {
  var i, s, r = Yo(e) ? dn : lt;
  return function() {
    var o = r(this, t), a = o.on;
    a !== i && (s = (i = a).copy()).on(e, n), o.on = s;
  };
}
function Zo(t, e) {
  var n = this._id;
  return arguments.length < 2 ? rt(this.node(), n).on.on(t) : this.each(Fo(n, t, e));
}
function qo(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Wo() {
  return this.on("end.remove", qo(this._id));
}
function Vo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = on(t));
  for (var i = this._groups, s = i.length, r = new Array(s), o = 0; o < s; ++o)
    for (var a = i[o], h = a.length, l = r[o] = new Array(h), c, d, f = 0; f < h; ++f)
      (c = a[f]) && (d = t.call(c, c.__data__, f, a)) && ("__data__" in c && (d.__data__ = c.__data__), l[f] = d, Ne(l[f], e, n, f, l, rt(c, n)));
  return new pt(r, this._parents, e, n);
}
function Go(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = oi(t));
  for (var i = this._groups, s = i.length, r = [], o = [], a = 0; a < s; ++a)
    for (var h = i[a], l = h.length, c, d = 0; d < l; ++d)
      if (c = h[d]) {
        for (var f = t.call(c, c.__data__, d, h), p, m = rt(c, n), b = 0, E = f.length; b < E; ++b)
          (p = f[b]) && Ne(p, e, n, b, f, m);
        r.push(f), o.push(c);
      }
  return new pt(r, o, e, n);
}
var jo = ee.prototype.constructor;
function Ko() {
  return new jo(this._groups, this._parents);
}
function Qo(t, e) {
  var n, i, s;
  return function() {
    var r = Lt(this, t), o = (this.style.removeProperty(t), Lt(this, t));
    return r === o ? null : r === n && o === i ? s : s = e(n = r, i = o);
  };
}
function Mi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Jo(t, e, n) {
  var i, s = n + "", r;
  return function() {
    var o = Lt(this, t);
    return o === s ? null : o === i ? r : r = e(i = o, n);
  };
}
function ta(t, e, n) {
  var i, s, r;
  return function() {
    var o = Lt(this, t), a = n(this), h = a + "";
    return a == null && (h = a = (this.style.removeProperty(t), Lt(this, t))), o === h ? null : o === i && h === s ? r : (s = h, r = e(i = o, a));
  };
}
function ea(t, e) {
  var n, i, s, r = "style." + e, o = "end." + r, a;
  return function() {
    var h = lt(this, t), l = h.on, c = h.value[r] == null ? a || (a = Mi(e)) : void 0;
    (l !== n || s !== c) && (i = (n = l).copy()).on(o, s = c), h.on = i;
  };
}
function na(t, e, n) {
  var i = (t += "") == "transform" ? no : ki;
  return e == null ? this.styleTween(t, Qo(t, i)).on("end.style." + t, Mi(t)) : typeof e == "function" ? this.styleTween(t, ta(t, i, un(this, "style." + t, e))).each(ea(this._id, t)) : this.styleTween(t, Jo(t, i, e), n).on("end.style." + t, null);
}
function ia(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function sa(t, e, n) {
  var i, s;
  function r() {
    var o = e.apply(this, arguments);
    return o !== s && (i = (s = o) && ia(t, o, n)), i;
  }
  return r._value = e, r;
}
function ra(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, sa(t, e, n ?? ""));
}
function oa(t) {
  return function() {
    this.textContent = t;
  };
}
function aa(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function ha(t) {
  return this.tween("text", typeof t == "function" ? aa(un(this, "text", t)) : oa(t == null ? "" : t + ""));
}
function la(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ca(t) {
  var e, n;
  function i() {
    var s = t.apply(this, arguments);
    return s !== n && (e = (n = s) && la(s)), e;
  }
  return i._value = t, i;
}
function da(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ca(t));
}
function ua() {
  for (var t = this._name, e = this._id, n = Ci(), i = this._groups, s = i.length, r = 0; r < s; ++r)
    for (var o = i[r], a = o.length, h, l = 0; l < a; ++l)
      if (h = o[l]) {
        var c = rt(h, e);
        Ne(h, t, n, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new pt(i, this._parents, t, n);
}
function fa() {
  var t, e, n = this, i = n._id, s = n.size();
  return new Promise(function(r, o) {
    var a = { value: o }, h = { value: function() {
      --s === 0 && r();
    } };
    n.each(function() {
      var l = lt(this, i), c = l.on;
      c !== t && (e = (t = c).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(h)), l.on = e;
    }), s === 0 && r();
  });
}
var pa = 0;
function pt(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function Ci() {
  return ++pa;
}
var dt = ee.prototype;
pt.prototype = {
  constructor: pt,
  select: Vo,
  selectAll: Go,
  selectChild: dt.selectChild,
  selectChildren: dt.selectChildren,
  filter: Uo,
  merge: Xo,
  selection: Ko,
  transition: ua,
  call: dt.call,
  nodes: dt.nodes,
  node: dt.node,
  size: dt.size,
  empty: dt.empty,
  each: dt.each,
  on: Zo,
  attr: So,
  attrTween: Ao,
  style: na,
  styleTween: ra,
  text: ha,
  textTween: da,
  remove: Wo,
  tween: vo,
  delay: Po,
  duration: To,
  ease: Oo,
  easeVarying: Bo,
  end: fa,
  [Symbol.iterator]: dt[Symbol.iterator]
};
function ga(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ma = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ga
};
function ya(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function va(t) {
  var e, n;
  t instanceof pt ? (e = t._id, t = t._name) : (e = Ci(), (n = ma).time = cn(), t = t == null ? null : t + "");
  for (var i = this._groups, s = i.length, r = 0; r < s; ++r)
    for (var o = i[r], a = o.length, h, l = 0; l < a; ++l)
      (h = o[l]) && Ne(h, t, e, l, o, n || ya(h, e));
  return new pt(i, this._parents, t, e);
}
ee.prototype.interrupt = go;
ee.prototype.transition = va;
const ce = (t) => () => t;
function wa(t, {
  sourceEvent: e,
  target: n,
  transform: i,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function ft(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
ft.prototype = {
  constructor: ft,
  scale: function(t) {
    return t === 1 ? this : new ft(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ft(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var He = new ft(1, 0, 0);
Ai.prototype = ft.prototype;
function Ai(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return He;
  return t.__zoom;
}
function Oe(t) {
  t.stopImmediatePropagation();
}
function Ut(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function xa(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function ba() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Dn() {
  return this.__zoom || He;
}
function $a(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function _a() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function za(t, e, n) {
  var i = t.invertX(e[0][0]) - n[0][0], s = t.invertX(e[1][0]) - n[1][0], r = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s),
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o)
  );
}
function Sa() {
  var t = xa, e = ba, n = za, i = $a, s = _a, r = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, h = fe, l = rn("start", "zoom", "end"), c, d, f, p = 500, m = 150, b = 0, E = 10;
  function v(u) {
    u.property("__zoom", Dn).on("wheel.zoom", tt, { passive: !1 }).on("mousedown.zoom", et).on("dblclick.zoom", yt).filter(s).on("touchstart.zoom", Ot).on("touchmove.zoom", _).on("touchend.zoom touchcancel.zoom", M).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(u, y, g, x) {
    var $ = u.selection ? u.selection() : u;
    $.property("__zoom", Dn), u !== $ ? X(u, y, g, x) : $.interrupt().each(function() {
      R(this, arguments).event(x).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, v.scaleBy = function(u, y, g, x) {
    v.scaleTo(u, function() {
      var $ = this.__zoom.k, z = typeof y == "function" ? y.apply(this, arguments) : y;
      return $ * z;
    }, g, x);
  }, v.scaleTo = function(u, y, g, x) {
    v.transform(u, function() {
      var $ = e.apply(this, arguments), z = this.__zoom, S = g == null ? T($) : typeof g == "function" ? g.apply(this, arguments) : g, N = z.invert(S), P = typeof y == "function" ? y.apply(this, arguments) : y;
      return n(H(A(z, P), S, N), $, o);
    }, g, x);
  }, v.translateBy = function(u, y, g, x) {
    v.transform(u, function() {
      return n(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), o);
    }, null, x);
  }, v.translateTo = function(u, y, g, x, $) {
    v.transform(u, function() {
      var z = e.apply(this, arguments), S = this.__zoom, N = x == null ? T(z) : typeof x == "function" ? x.apply(this, arguments) : x;
      return n(He.translate(N[0], N[1]).scale(S.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), z, o);
    }, x, $);
  };
  function A(u, y) {
    return y = Math.max(r[0], Math.min(r[1], y)), y === u.k ? u : new ft(y, u.x, u.y);
  }
  function H(u, y, g) {
    var x = y[0] - g[0] * u.k, $ = y[1] - g[1] * u.k;
    return x === u.x && $ === u.y ? u : new ft(u.k, x, $);
  }
  function T(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function X(u, y, g, x) {
    u.on("start.zoom", function() {
      R(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var $ = this, z = arguments, S = R($, z).event(x), N = e.apply($, z), P = g == null ? T(N) : typeof g == "function" ? g.apply($, z) : g, W = Math.max(N[1][0] - N[0][0], N[1][1] - N[0][1]), L = $.__zoom, V = typeof y == "function" ? y.apply($, z) : y, nt = h(L.invert(P).concat(W / L.k), V.invert(P).concat(W / V.k));
      return function(G) {
        if (G === 1) G = V;
        else {
          var ot = nt(G), It = W / ot[2];
          G = new ft(It, P[0] - ot[0] * It, P[1] - ot[1] * It);
        }
        S.zoom(null, G);
      };
    });
  }
  function R(u, y, g) {
    return !g && u.__zooming || new O(u, y);
  }
  function O(u, y) {
    this.that = u, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = e.apply(u, y), this.taps = 0;
  }
  O.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, y) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = y.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = y.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = y.invert(this.touch1[0])), this.that.__zoom = y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var y = wt(this.that).datum();
      l.call(
        u,
        this.that,
        new wa(u, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: l
        }),
        y
      );
    }
  };
  function tt(u, ...y) {
    if (!t.apply(this, arguments)) return;
    var g = R(this, y).event(u), x = this.__zoom, $ = Math.max(r[0], Math.min(r[1], x.k * Math.pow(2, i.apply(this, arguments)))), z = vt(u);
    if (g.wheel)
      (g.mouse[0][0] !== z[0] || g.mouse[0][1] !== z[1]) && (g.mouse[1] = x.invert(g.mouse[0] = z)), clearTimeout(g.wheel);
    else {
      if (x.k === $) return;
      g.mouse = [z, x.invert(z)], me(this), g.start();
    }
    Ut(u), g.wheel = setTimeout(S, m), g.zoom("mouse", n(H(A(x, $), g.mouse[0], g.mouse[1]), g.extent, o));
    function S() {
      g.wheel = null, g.end();
    }
  }
  function et(u, ...y) {
    if (f || !t.apply(this, arguments)) return;
    var g = u.currentTarget, x = R(this, y, !0).event(u), $ = wt(u.view).on("mousemove.zoom", P, !0).on("mouseup.zoom", W, !0), z = vt(u, g), S = u.clientX, N = u.clientY;
    Ar(u.view), Oe(u), x.mouse = [z, this.__zoom.invert(z)], me(this), x.start();
    function P(L) {
      if (Ut(L), !x.moved) {
        var V = L.clientX - S, nt = L.clientY - N;
        x.moved = V * V + nt * nt > b;
      }
      x.event(L).zoom("mouse", n(H(x.that.__zoom, x.mouse[0] = vt(L, g), x.mouse[1]), x.extent, o));
    }
    function W(L) {
      $.on("mousemove.zoom mouseup.zoom", null), Nr(L.view, x.moved), Ut(L), x.event(L).end();
    }
  }
  function yt(u, ...y) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, x = vt(u.changedTouches ? u.changedTouches[0] : u, this), $ = g.invert(x), z = g.k * (u.shiftKey ? 0.5 : 2), S = n(H(A(g, z), x, $), e.apply(this, y), o);
      Ut(u), a > 0 ? wt(this).transition().duration(a).call(X, S, x, u) : wt(this).call(v.transform, S, x, u);
    }
  }
  function Ot(u, ...y) {
    if (t.apply(this, arguments)) {
      var g = u.touches, x = g.length, $ = R(this, y, u.changedTouches.length === x).event(u), z, S, N, P;
      for (Oe(u), S = 0; S < x; ++S)
        N = g[S], P = vt(N, this), P = [P, this.__zoom.invert(P), N.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== P[2] && ($.touch1 = P, $.taps = 0) : ($.touch0 = P, z = !0, $.taps = 1 + !!c);
      c && (c = clearTimeout(c)), z && ($.taps < 2 && (d = P[0], c = setTimeout(function() {
        c = null;
      }, p)), me(this), $.start());
    }
  }
  function _(u, ...y) {
    if (this.__zooming) {
      var g = R(this, y).event(u), x = u.changedTouches, $ = x.length, z, S, N, P;
      for (Ut(u), z = 0; z < $; ++z)
        S = x[z], N = vt(S, this), g.touch0 && g.touch0[2] === S.identifier ? g.touch0[0] = N : g.touch1 && g.touch1[2] === S.identifier && (g.touch1[0] = N);
      if (S = g.that.__zoom, g.touch1) {
        var W = g.touch0[0], L = g.touch0[1], V = g.touch1[0], nt = g.touch1[1], G = (G = V[0] - W[0]) * G + (G = V[1] - W[1]) * G, ot = (ot = nt[0] - L[0]) * ot + (ot = nt[1] - L[1]) * ot;
        S = A(S, Math.sqrt(G / ot)), N = [(W[0] + V[0]) / 2, (W[1] + V[1]) / 2], P = [(L[0] + nt[0]) / 2, (L[1] + nt[1]) / 2];
      } else if (g.touch0) N = g.touch0[0], P = g.touch0[1];
      else return;
      g.zoom("touch", n(H(S, N, P), g.extent, o));
    }
  }
  function M(u, ...y) {
    if (this.__zooming) {
      var g = R(this, y).event(u), x = u.changedTouches, $ = x.length, z, S;
      for (Oe(u), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, p), z = 0; z < $; ++z)
        S = x[z], g.touch0 && g.touch0[2] === S.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === S.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (S = vt(S, this), Math.hypot(d[0] - S[0], d[1] - S[1]) < E)) {
        var N = wt(this).on("dblclick.zoom");
        N && N.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : ce(+u), v) : i;
  }, v.filter = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : ce(!!u), v) : t;
  }, v.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : ce(!!u), v) : s;
  }, v.extent = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : ce([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), v) : e;
  }, v.scaleExtent = function(u) {
    return arguments.length ? (r[0] = +u[0], r[1] = +u[1], v) : [r[0], r[1]];
  }, v.translateExtent = function(u) {
    return arguments.length ? (o[0][0] = +u[0][0], o[1][0] = +u[1][0], o[0][1] = +u[0][1], o[1][1] = +u[1][1], v) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, v.constrain = function(u) {
    return arguments.length ? (n = u, v) : n;
  }, v.duration = function(u) {
    return arguments.length ? (a = +u, v) : a;
  }, v.interpolate = function(u) {
    return arguments.length ? (h = u, v) : h;
  }, v.on = function() {
    var u = l.on.apply(l, arguments);
    return u === l ? v : u;
  }, v.clickDistance = function(u) {
    return arguments.length ? (b = (u = +u) * u, v) : Math.sqrt(b);
  }, v.tapDistance = function(u) {
    return arguments.length ? (E = +u, v) : E;
  }, v;
}
var On;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(On || (On = {}));
var qt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(qt || (qt = {}));
var In;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(In || (In = {}));
var Bn;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Bn || (Bn = {}));
var Un;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Un || (Un = {}));
var k;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(k || (k = {}));
k.Left + "", k.Right, k.Right + "", k.Left, k.Top + "", k.Bottom, k.Bottom + "", k.Top;
const Ea = (t, e = 0, n = 1) => Math.min(Math.max(t, e), n), Xn = (t) => !isNaN(t) && isFinite(t), Ni = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function ka({ sourceX: t, sourceY: e, targetX: n, targetY: i, sourceControlX: s, sourceControlY: r, targetControlX: o, targetControlY: a }) {
  const h = t * 0.125 + s * 0.375 + o * 0.375 + n * 0.125, l = e * 0.125 + r * 0.375 + a * 0.375 + i * 0.125, c = Math.abs(h - t), d = Math.abs(l - e);
  return [h, l, c, d];
}
function de(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function Yn({ pos: t, x1: e, y1: n, x2: i, y2: s, c: r }) {
  switch (t) {
    case k.Left:
      return [e - de(e - i, r), n];
    case k.Right:
      return [e + de(i - e, r), n];
    case k.Top:
      return [e, n - de(n - s, r)];
    case k.Bottom:
      return [e, n + de(s - n, r)];
  }
}
function Ma({ sourceX: t, sourceY: e, sourcePosition: n = k.Bottom, targetX: i, targetY: s, targetPosition: r = k.Top, curvature: o = 0.25 }) {
  const [a, h] = Yn({
    pos: n,
    x1: t,
    y1: e,
    x2: i,
    y2: s,
    c: o
  }), [l, c] = Yn({
    pos: r,
    x1: i,
    y1: s,
    x2: t,
    y2: e,
    c: o
  }), [d, f, p, m] = ka({
    sourceX: t,
    sourceY: e,
    targetX: i,
    targetY: s,
    sourceControlX: a,
    sourceControlY: h,
    targetControlX: l,
    targetControlY: c
  });
  return [
    `M${t},${e} C${a},${h} ${l},${c} ${i},${s}`,
    d,
    f,
    p,
    m
  ];
}
function Hi({ sourceX: t, sourceY: e, targetX: n, targetY: i }) {
  const s = Math.abs(n - t) / 2, r = n < t ? n + s : n - s, o = Math.abs(i - e) / 2, a = i < e ? i + o : i - o;
  return [r, a, s, o];
}
function Ca({ sourceX: t, sourceY: e, targetX: n, targetY: i }) {
  const [s, r, o, a] = Hi({
    sourceX: t,
    sourceY: e,
    targetX: n,
    targetY: i
  });
  return [`M ${t},${e}L ${n},${i}`, s, r, o, a];
}
const Fn = {
  [k.Left]: { x: -1, y: 0 },
  [k.Right]: { x: 1, y: 0 },
  [k.Top]: { x: 0, y: -1 },
  [k.Bottom]: { x: 0, y: 1 }
}, Aa = ({ source: t, sourcePosition: e = k.Bottom, target: n }) => e === k.Left || e === k.Right ? t.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Zn = (t, e) => Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
function Na({ source: t, sourcePosition: e = k.Bottom, target: n, targetPosition: i = k.Top, center: s, offset: r, stepPosition: o }) {
  const a = Fn[e], h = Fn[i], l = { x: t.x + a.x * r, y: t.y + a.y * r }, c = { x: n.x + h.x * r, y: n.y + h.y * r }, d = Aa({
    source: l,
    sourcePosition: e,
    target: c
  }), f = d.x !== 0 ? "x" : "y", p = d[f];
  let m = [], b, E;
  const v = { x: 0, y: 0 }, A = { x: 0, y: 0 }, [, , H, T] = Hi({
    sourceX: t.x,
    sourceY: t.y,
    targetX: n.x,
    targetY: n.y
  });
  if (a[f] * h[f] === -1) {
    f === "x" ? (b = s.x ?? l.x + (c.x - l.x) * o, E = s.y ?? (l.y + c.y) / 2) : (b = s.x ?? (l.x + c.x) / 2, E = s.y ?? l.y + (c.y - l.y) * o);
    const R = [
      { x: b, y: l.y },
      { x: b, y: c.y }
    ], O = [
      { x: l.x, y: E },
      { x: c.x, y: E }
    ];
    a[f] === p ? m = f === "x" ? R : O : m = f === "x" ? O : R;
  } else {
    const R = [{ x: l.x, y: c.y }], O = [{ x: c.x, y: l.y }];
    if (f === "x" ? m = a.x === p ? O : R : m = a.y === p ? R : O, e === i) {
      const _ = Math.abs(t[f] - n[f]);
      if (_ <= r) {
        const M = Math.min(r - 1, r - _);
        a[f] === p ? v[f] = (l[f] > t[f] ? -1 : 1) * M : A[f] = (c[f] > n[f] ? -1 : 1) * M;
      }
    }
    if (e !== i) {
      const _ = f === "x" ? "y" : "x", M = a[f] === h[_], u = l[_] > c[_], y = l[_] < c[_];
      (a[f] === 1 && (!M && u || M && y) || a[f] !== 1 && (!M && y || M && u)) && (m = f === "x" ? R : O);
    }
    const tt = { x: l.x + v.x, y: l.y + v.y }, et = { x: c.x + A.x, y: c.y + A.y }, yt = Math.max(Math.abs(tt.x - m[0].x), Math.abs(et.x - m[0].x)), Ot = Math.max(Math.abs(tt.y - m[0].y), Math.abs(et.y - m[0].y));
    yt >= Ot ? (b = (tt.x + et.x) / 2, E = m[0].y) : (b = m[0].x, E = (tt.y + et.y) / 2);
  }
  return [[
    t,
    { x: l.x + v.x, y: l.y + v.y },
    ...m,
    { x: c.x + A.x, y: c.y + A.y },
    n
  ], b, E, H, T];
}
function Ha(t, e, n, i) {
  const s = Math.min(Zn(t, e) / 2, Zn(e, n) / 2, i), { x: r, y: o } = e;
  if (t.x === r && r === n.x || t.y === o && o === n.y)
    return `L${r} ${o}`;
  if (t.y === o) {
    const l = t.x < n.x ? -1 : 1, c = t.y < n.y ? 1 : -1;
    return `L ${r + s * l},${o}Q ${r},${o} ${r},${o + s * c}`;
  }
  const a = t.x < n.x ? 1 : -1, h = t.y < n.y ? -1 : 1;
  return `L ${r},${o + s * h}Q ${r},${o} ${r + s * a},${o}`;
}
function Pa({ sourceX: t, sourceY: e, sourcePosition: n = k.Bottom, targetX: i, targetY: s, targetPosition: r = k.Top, borderRadius: o = 5, centerX: a, centerY: h, offset: l = 20, stepPosition: c = 0.5 }) {
  const [d, f, p, m, b] = Na({
    source: { x: t, y: e },
    sourcePosition: n,
    target: { x: i, y: s },
    targetPosition: r,
    center: { x: a, y: h },
    offset: l,
    stepPosition: c
  });
  return [d.reduce((v, A, H) => {
    let T = "";
    return H > 0 && H < d.length - 1 ? T = Ha(d[H - 1], A, d[H + 1], o) : T = `${H === 0 ? "M" : "L"}${A.x} ${A.y}`, v += T, v;
  }, ""), f, p, m, b];
}
const Ra = (t, e) => t.x !== e.x || t.y !== e.y || t.zoom !== e.k, Pe = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Ie = ({ x: t, y: e, zoom: n }) => He.translate(t, e).scale(n), Pt = (t, e) => t.target.closest(`.${e}`), Pi = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), La = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Be = (t, e = 0, n = La, i = () => {
}) => {
  const s = typeof e == "number" && e > 0;
  return s || i(), s ? t.transition().duration(e).ease(n).on("end", i) : t;
}, Ri = (t) => {
  const e = t.ctrlKey && Ni() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function Ta({ zoomPanValues: t, noWheelClassName: e, d3Selection: n, d3Zoom: i, panOnScrollMode: s, panOnScrollSpeed: r, zoomOnPinch: o, onPanZoomStart: a, onPanZoom: h, onPanZoomEnd: l }) {
  return (c) => {
    if (Pt(c, e))
      return c.ctrlKey && c.preventDefault(), !1;
    c.preventDefault(), c.stopImmediatePropagation();
    const d = n.property("__zoom").k || 1;
    if (c.ctrlKey && o) {
      const E = vt(c), v = Ri(c), A = d * Math.pow(2, v);
      i.scaleTo(n, A, E, c);
      return;
    }
    const f = c.deltaMode === 1 ? 20 : 1;
    let p = s === qt.Vertical ? 0 : c.deltaX * f, m = s === qt.Horizontal ? 0 : c.deltaY * f;
    !Ni() && c.shiftKey && s !== qt.Vertical && (p = c.deltaY * f, m = 0), i.translateBy(
      n,
      -(p / d) * r,
      -(m / d) * r,
      // @ts-ignore
      { internal: !0 }
    );
    const b = Pe(n.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling || (t.isPanScrolling = !0), t.isPanScrolling && (h?.(c, b), t.panScrollTimeout = setTimeout(() => {
      t.isPanScrolling = !1;
    }, 150));
  };
}
function Da({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: n }) {
  return function(i, s) {
    const r = i.type === "wheel", o = !e && r && !i.ctrlKey, a = Pt(i, t);
    if (i.ctrlKey && r && a && i.preventDefault(), o || a)
      return null;
    i.preventDefault(), n.call(this, i, s);
  };
}
function Oa({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: n }) {
  return (i) => {
    if (i.sourceEvent?.internal)
      return;
    const s = Pe(i.transform);
    t.mouseButton = i.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, i.sourceEvent?.type === "mousedown" && e(!0), n && n?.(i.sourceEvent, s);
  };
}
function Ia({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: n, onTransformChange: i, onPanZoom: s }) {
  return (r) => {
    t.usedRightMouseButton = !!(n && Pi(e, t.mouseButton ?? 0)), r.sourceEvent?.sync || i([r.transform.x, r.transform.y, r.transform.k]), s && !r.sourceEvent?.internal && s?.(r.sourceEvent, Pe(r.transform));
  };
}
function Ba({ zoomPanValues: t, panOnDrag: e, panOnScroll: n, onDraggingChange: i, onPanZoomEnd: s, onPaneContextMenu: r }) {
  return (o) => {
    if (!o.sourceEvent?.internal && (t.isZoomingOrPanning = !1, r && Pi(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && o.sourceEvent && r(o.sourceEvent), t.usedRightMouseButton = !1, i(!1), s && Ra(t.prevViewport, o.transform))) {
      const a = Pe(o.transform);
      t.prevViewport = a, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          s?.(o.sourceEvent, a);
        },
        // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
        n ? 150 : 0
      );
    }
  };
}
function Ua({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: n, panOnDrag: i, panOnScroll: s, zoomOnDoubleClick: r, userSelectionActive: o, noWheelClassName: a, noPanClassName: h, lib: l, connectionInProgress: c }) {
  return (d) => {
    const f = t || e, p = n && d.ctrlKey, m = d.type === "wheel";
    if (d.button === 1 && d.type === "mousedown" && (Pt(d, `${l}-flow__node`) || Pt(d, `${l}-flow__edge`)))
      return !0;
    if (!i && !f && !s && !r && !n || o || c && !m || Pt(d, a) && m || Pt(d, h) && (!m || s && m && !t) || !n && d.ctrlKey && m)
      return !1;
    if (!n && d.type === "touchstart" && d.touches?.length > 1)
      return d.preventDefault(), !1;
    if (!f && !s && !p && m || !i && (d.type === "mousedown" || d.type === "touchstart") || Array.isArray(i) && !i.includes(d.button) && d.type === "mousedown")
      return !1;
    const b = Array.isArray(i) && i.includes(d.button) || !d.button || d.button <= 1;
    return (!d.ctrlKey || m) && b;
  };
}
function Xa({ domNode: t, minZoom: e, maxZoom: n, paneClickDistance: i, translateExtent: s, viewport: r, onPanZoom: o, onPanZoomStart: a, onPanZoomEnd: h, onDraggingChange: l }) {
  const c = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: { x: 0, y: 0, zoom: 0 },
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, d = t.getBoundingClientRect(), f = Sa().clickDistance(!Xn(i) || i < 0 ? 0 : i).scaleExtent([e, n]).translateExtent(s), p = wt(t).call(f);
  H({
    x: r.x,
    y: r.y,
    zoom: Ea(r.zoom, e, n)
  }, [
    [0, 0],
    [d.width, d.height]
  ], s);
  const m = p.on("wheel.zoom"), b = p.on("dblclick.zoom");
  f.wheelDelta(Ri);
  function E(_, M) {
    return p ? new Promise((u) => {
      f?.interpolate(M?.interpolate === "linear" ? Zt : fe).transform(Be(p, M?.duration, M?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function v({ noWheelClassName: _, noPanClassName: M, onPaneContextMenu: u, userSelectionActive: y, panOnScroll: g, panOnDrag: x, panOnScrollMode: $, panOnScrollSpeed: z, preventScrolling: S, zoomOnPinch: N, zoomOnScroll: P, zoomOnDoubleClick: W, zoomActivationKeyPressed: L, lib: V, onTransformChange: nt, connectionInProgress: G }) {
    y && !c.isZoomingOrPanning && A();
    const It = g && !L && !y ? Ta({
      zoomPanValues: c,
      noWheelClassName: _,
      d3Selection: p,
      d3Zoom: f,
      panOnScrollMode: $,
      panOnScrollSpeed: z,
      zoomOnPinch: N,
      onPanZoomStart: a,
      onPanZoom: o,
      onPanZoomEnd: h
    }) : Da({
      noWheelClassName: _,
      preventScrolling: S,
      d3ZoomHandler: m
    });
    if (p.on("wheel.zoom", It, { passive: !1 }), !y) {
      const Zi = Oa({
        zoomPanValues: c,
        onDraggingChange: l,
        onPanZoomStart: a
      });
      f.on("start", Zi);
      const qi = Ia({
        zoomPanValues: c,
        panOnDrag: x,
        onPaneContextMenu: !!u,
        onPanZoom: o,
        onTransformChange: nt
      });
      f.on("zoom", qi);
      const Wi = Ba({
        zoomPanValues: c,
        panOnDrag: x,
        panOnScroll: g,
        onPaneContextMenu: u,
        onPanZoomEnd: h,
        onDraggingChange: l
      });
      f.on("end", Wi);
    }
    const Fi = Ua({
      zoomActivationKeyPressed: L,
      panOnDrag: x,
      zoomOnScroll: P,
      panOnScroll: g,
      zoomOnDoubleClick: W,
      zoomOnPinch: N,
      userSelectionActive: y,
      noPanClassName: M,
      noWheelClassName: _,
      lib: V,
      connectionInProgress: G
    });
    f.filter(Fi), W ? p.on("dblclick.zoom", b) : p.on("dblclick.zoom", null);
  }
  function A() {
    f.on("zoom", null);
  }
  async function H(_, M, u) {
    const y = Ie(_), g = f?.constrain()(y, M, u);
    return g && await E(g), new Promise((x) => x(g));
  }
  async function T(_, M) {
    const u = Ie(_);
    return await E(u, M), new Promise((y) => y(u));
  }
  function X(_) {
    if (p) {
      const M = Ie(_), u = p.property("__zoom");
      (u.k !== _.zoom || u.x !== _.x || u.y !== _.y) && f?.transform(p, M, null, { sync: !0 });
    }
  }
  function R() {
    const _ = p ? Ai(p.node()) : { x: 0, y: 0, k: 1 };
    return { x: _.x, y: _.y, zoom: _.k };
  }
  function O(_, M) {
    return p ? new Promise((u) => {
      f?.interpolate(M?.interpolate === "linear" ? Zt : fe).scaleTo(Be(p, M?.duration, M?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function tt(_, M) {
    return p ? new Promise((u) => {
      f?.interpolate(M?.interpolate === "linear" ? Zt : fe).scaleBy(Be(p, M?.duration, M?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function et(_) {
    f?.scaleExtent(_);
  }
  function yt(_) {
    f?.translateExtent(_);
  }
  function Ot(_) {
    const M = !Xn(_) || _ < 0 ? 0 : _;
    f?.clickDistance(M);
  }
  return {
    update: v,
    destroy: A,
    setViewport: T,
    setViewportConstrained: H,
    getViewport: R,
    scaleTo: O,
    scaleBy: tt,
    setScaleExtent: et,
    setTranslateExtent: yt,
    syncViewport: X,
    setClickDistance: Ot
  };
}
var qn;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(qn || (qn = {}));
class Ya {
  constructor(e = {}) {
    this.container = null, this.state = {
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
      nodeLookup: /* @__PURE__ */ new Map(),
      edgeLookup: /* @__PURE__ */ new Map()
    }, this.subscribers = /* @__PURE__ */ new Set(), this.panZoomInstance = null, this.pendingNodes = [], this.options = {
      minZoom: 0.5,
      maxZoom: 2,
      defaultZoom: 1,
      nodesDraggable: !0,
      nodesConnectable: !0,
      elementsSelectable: !0,
      ...e
    }, this.state.nodes = e.nodes || [], this.state.edges = e.edges || [], this.updateLookups();
  }
  mount(e) {
    this.container = e, this.panZoomInstance = Xa({
      domNode: e,
      minZoom: this.options.minZoom || 0.5,
      maxZoom: this.options.maxZoom || 2,
      paneClickDistance: 0,
      translateExtent: [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]],
      viewport: this.state.viewport,
      onDraggingChange: (n) => {
        this.container?.classList.toggle("panning", n);
      },
      onPanZoom: (n, i) => {
        this.state.viewport = i, this.notifySubscribers();
      },
      onPanZoomStart: (n, i) => {
      },
      onPanZoomEnd: (n, i) => {
      }
    }), this.panZoomInstance.update({
      noWheelClassName: "nowheel",
      noPanClassName: "nopan",
      onPaneContextMenu: void 0,
      preventScrolling: !0,
      panOnScroll: !0,
      panOnDrag: !0,
      panOnScrollMode: "free",
      panOnScrollSpeed: 0.8,
      userSelectionActive: !1,
      zoomOnPinch: !0,
      zoomOnScroll: !0,
      zoomOnDoubleClick: !0,
      zoomActivationKeyPressed: !1,
      lib: "lit-flow",
      onTransformChange: (n) => {
      },
      connectionInProgress: !1
    }), this.notifySubscribers();
  }
  destroy() {
    this.panZoomInstance?.destroy(), this.panZoomInstance = null, this.container = null, this.subscribers.clear();
  }
  getState() {
    return this.state;
  }
  get nodes() {
    return this.state.nodes;
  }
  get edges() {
    return this.state.edges;
  }
  getViewport() {
    return this.state.viewport;
  }
  setViewport(e) {
    this.state.viewport = e, this.panZoomInstance?.setViewport?.(e), this.notifySubscribers();
  }
  setNodes(e) {
    this.pendingNodes.push(...e.map((n) => n.id)), this.state.nodes = e, this.updateLookups(), this.notifySubscribers();
  }
  setEdges(e) {
    this.retryEdgeRendering(e);
  }
  updateNode(e, n) {
    this.state.nodes = this.state.nodes.map(
      (i) => i.id === e ? { ...i, ...n } : i
    ), this.updateLookups(), this.notifySubscribers();
  }
  updateEdge(e, n) {
    this.state.edges = this.state.edges.map(
      (i) => i.id === e ? { ...i, ...n } : i
    ), this.updateLookups(), this.notifySubscribers();
  }
  addNode(e) {
    this.state.nodes = [...this.state.nodes, e], this.updateLookups(), this.notifySubscribers();
  }
  removeNode(e) {
    this.state.nodes = this.state.nodes.filter((n) => n.id !== e), this.state.edges = this.state.edges.filter(
      (n) => n.source !== e && n.target !== e
    ), this.updateLookups(), this.notifySubscribers();
  }
  addEdge(e) {
    this.state.edges = [...this.state.edges, e], this.updateLookups(), this.notifySubscribers();
  }
  removeEdge(e) {
    this.state.edges = this.state.edges.filter((n) => n.id !== e), this.updateLookups(), this.notifySubscribers();
  }
  subscribe(e) {
    return this.subscribers.add(e), () => this.subscribers.delete(e);
  }
  zoomIn() {
    const e = this.state.viewport.zoom, n = Math.min(e * 1.2, this.options.maxZoom || 2);
    this.setViewport({ ...this.state.viewport, zoom: n });
  }
  zoomOut() {
    const e = this.state.viewport.zoom, n = Math.max(e / 1.2, this.options.minZoom || 0.5);
    this.setViewport({ ...this.state.viewport, zoom: n });
  }
  fitView() {
    if (this.state.nodes.length === 0 || !this.container) return;
    let e = 1 / 0, n = 1 / 0, i = -1 / 0, s = -1 / 0;
    this.state.nodes.forEach((m) => {
      const b = m.measured?.width || m.width || 150, E = m.measured?.height || m.height || 50;
      e = Math.min(e, m.position.x), n = Math.min(n, m.position.y), i = Math.max(i, m.position.x + b), s = Math.max(s, m.position.y + E);
    });
    const r = {
      x: e,
      y: n,
      width: i - e,
      height: s - n
    }, o = this.container.clientWidth, a = this.container.clientHeight, h = 50, l = (o - h * 2) / r.width, c = (a - h * 2) / r.height, d = Math.min(l, c, this.options.maxZoom || 2), f = (o - r.width * d) / 2 - r.x * d, p = (a - r.height * d) / 2 - r.y * d;
    this.setViewport({ x: f, y: p, zoom: d });
  }
  updateLookups() {
    this.state.nodeLookup.clear(), this.state.nodes.forEach((e) => {
      const n = {
        ...e,
        measured: e.measured || { width: e.width, height: e.height },
        internals: {
          positionAbsolute: e.position,
          z: e.zIndex || 0,
          userNode: e
        }
      };
      this.state.nodeLookup.set(e.id, n);
    }), this.state.edgeLookup.clear(), this.state.edges.forEach((e) => {
      this.state.edgeLookup.set(e.id, e);
    });
  }
  /**
   * Check if a node is fully rendered
   */
  isNodeRendered(e) {
    if (!this.container) return !1;
    const n = this.container.querySelector(`[id="${CSS.escape(e)}"]`);
    if (!n) return !1;
    const i = n.getBoundingClientRect();
    return i.width > 0 && i.height > 0;
  }
  /**
   * Check if any of the required nodes are still pending
   */
  hasPendingNodes(e) {
    return e.some((n) => this.pendingNodes.includes(n) || !this.isNodeRendered(n));
  }
  /**
   * Remove node from pending list when it's rendered
   */
  markNodeAsRendered(e) {
    const n = this.pendingNodes.indexOf(e);
    n > -1 && this.pendingNodes.splice(n, 1);
  }
  /**
   * Retry edge rendering with delay if nodes are still pending
   */
  retryEdgeRendering(e, n = 0, i = 10) {
    const s = e.flatMap((o) => [o.source, o.target]), r = [...new Set(s)];
    this.hasPendingNodes(r) && n < i ? setTimeout(() => {
      this.retryEdgeRendering(e, n + 1, i);
    }, 100) : (this.state.edges = e, this.updateLookups(), this.notifySubscribers(), r.forEach((o) => this.markNodeAsRendered(o)));
  }
  notifySubscribers() {
    this.subscribers.forEach((e) => e(this.state));
  }
}
function Wh(t = {}) {
  const e = {
    nodes: t.nodes || [],
    edges: t.edges || [],
    viewport: t.viewport || { x: 0, y: 0, zoom: 1 },
    nodeLookup: /* @__PURE__ */ new Map(),
    edgeLookup: /* @__PURE__ */ new Map()
  }, n = /* @__PURE__ */ new Set(), i = () => {
    e.nodeLookup.clear(), e.nodes.forEach((s) => {
      const r = {
        ...s,
        measured: s.measured || { width: s.width, height: s.height },
        internals: {
          positionAbsolute: s.position,
          z: s.zIndex || 0,
          userNode: s
        }
      };
      e.nodeLookup.set(s.id, r);
    }), e.edgeLookup.clear(), e.edges.forEach((s) => {
      e.edgeLookup.set(s.id, s);
    });
  };
  return i(), {
    getState: () => e,
    setState: (s) => {
      Object.assign(e, s), i(), n.forEach((r) => r(e));
    },
    subscribe: (s) => (n.add(s), () => n.delete(s))
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = globalThis, fn = ye.ShadowRoot && (ye.ShadyCSS === void 0 || ye.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pn = Symbol(), Wn = /* @__PURE__ */ new WeakMap();
let Li = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== pn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (fn && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Wn.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Wn.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Fa = (t) => new Li(typeof t == "string" ? t : t + "", void 0, pn), U = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce(((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1]), t[0]);
  return new Li(n, t, pn);
}, Za = (t, e) => {
  if (fn) t.adoptedStyleSheets = e.map(((n) => n instanceof CSSStyleSheet ? n : n.styleSheet));
  else for (const n of e) {
    const i = document.createElement("style"), s = ye.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, Vn = fn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return Fa(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qa, defineProperty: Wa, getOwnPropertyDescriptor: Va, getOwnPropertyNames: Ga, getOwnPropertySymbols: ja, getPrototypeOf: Ka } = Object, Re = globalThis, Gn = Re.trustedTypes, Qa = Gn ? Gn.emptyScript : "", Ja = Re.reactiveElementPolyfillSupport, Wt = (t, e) => t, Se = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Qa : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, gn = (t, e) => !qa(t, e), jn = { attribute: !0, type: String, converter: Se, reflect: !1, useDefault: !1, hasChanged: gn };
Symbol.metadata ??= Symbol("metadata"), Re.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ht = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = jn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && Wa(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: r } = Va(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: s, set(o) {
      const a = s?.call(this);
      r?.call(this, o), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? jn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Wt("elementProperties"))) return;
    const e = Ka(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Wt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Wt("properties"))) {
      const n = this.properties, i = [...Ga(n), ...ja(n)];
      for (const s of i) this.createProperty(s, n[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) n.unshift(Vn(s));
    } else e !== void 0 && n.push(Vn(e));
    return n;
  }
  static _$Eu(e, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((e) => e(this)));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Za(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((e) => e.hostDisconnected?.()));
  }
  attributeChangedCallback(e, n, i) {
    this._$AK(e, i);
  }
  _$ET(e, n) {
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Se).toAttribute(n, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Se;
      this._$Em = s;
      const a = o.fromAttribute(n, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, i) {
    if (e !== void 0) {
      const s = this.constructor, r = this[e];
      if (i ??= s.getPropertyOptions(e), !((i.hasChanged ?? gn)(r, n) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? n ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: o } = r, a = this[s];
        o !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, r, a);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach(((i) => i.hostUpdate?.())), this.update(n)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach(((n) => n.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach(((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ht.elementStyles = [], Ht.shadowRootOptions = { mode: "open" }, Ht[Wt("elementProperties")] = /* @__PURE__ */ new Map(), Ht[Wt("finalized")] = /* @__PURE__ */ new Map(), Ja?.({ ReactiveElement: Ht }), (Re.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mn = globalThis, Ee = mn.trustedTypes, Kn = Ee ? Ee.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ti = "$lit$", xt = `lit$${Math.random().toFixed(9).slice(2)}$`, Di = "?" + xt, th = `<${Di}>`, kt = document, Kt = () => kt.createComment(""), Qt = (t) => t === null || typeof t != "object" && typeof t != "function", yn = Array.isArray, eh = (t) => yn(t) || typeof t?.[Symbol.iterator] == "function", Ue = `[ 	
\f\r]`, Xt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qn = /-->/g, Jn = />/g, bt = RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ti = /'/g, ei = /"/g, Oi = /^(?:script|style|textarea|title)$/i, Ii = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), C = Ii(1), K = Ii(2), Mt = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), ni = /* @__PURE__ */ new WeakMap(), _t = kt.createTreeWalker(kt, 129);
function Bi(t, e) {
  if (!yn(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Kn !== void 0 ? Kn.createHTML(e) : e;
}
const nh = (t, e) => {
  const n = t.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Xt;
  for (let a = 0; a < n; a++) {
    const h = t[a];
    let l, c, d = -1, f = 0;
    for (; f < h.length && (o.lastIndex = f, c = o.exec(h), c !== null); ) f = o.lastIndex, o === Xt ? c[1] === "!--" ? o = Qn : c[1] !== void 0 ? o = Jn : c[2] !== void 0 ? (Oi.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = bt) : c[3] !== void 0 && (o = bt) : o === bt ? c[0] === ">" ? (o = s ?? Xt, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? bt : c[3] === '"' ? ei : ti) : o === ei || o === ti ? o = bt : o === Qn || o === Jn ? o = Xt : (o = bt, s = void 0);
    const p = o === bt && t[a + 1].startsWith("/>") ? " " : "";
    r += o === Xt ? h + th : d >= 0 ? (i.push(l), h.slice(0, d) + Ti + h.slice(d) + xt + p) : h + xt + (d === -2 ? a : p);
  }
  return [Bi(t, r + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Jt {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, h = this.parts, [l, c] = nh(e, n);
    if (this.el = Jt.createElement(l, i), _t.currentNode = this.el.content, n === 2 || n === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = _t.nextNode()) !== null && h.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Ti)) {
          const f = c[o++], p = s.getAttribute(d).split(xt), m = /([.?@])?(.*)/.exec(f);
          h.push({ type: 1, index: r, name: m[2], strings: p, ctor: m[1] === "." ? sh : m[1] === "?" ? rh : m[1] === "@" ? oh : Le }), s.removeAttribute(d);
        } else d.startsWith(xt) && (h.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Oi.test(s.tagName)) {
          const d = s.textContent.split(xt), f = d.length - 1;
          if (f > 0) {
            s.textContent = Ee ? Ee.emptyScript : "";
            for (let p = 0; p < f; p++) s.append(d[p], Kt()), _t.nextNode(), h.push({ type: 2, index: ++r });
            s.append(d[f], Kt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Di) h.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(xt, d + 1)) !== -1; ) h.push({ type: 7, index: r }), d += xt.length - 1;
      }
      r++;
    }
  }
  static createElement(e, n) {
    const i = kt.createElement("template");
    return i.innerHTML = e, i;
  }
}
function Dt(t, e, n = t, i) {
  if (e === Mt) return e;
  let s = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const r = Qt(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = s : n._$Cl = s), s !== void 0 && (e = Dt(t, s._$AS(t, e.values), s, i)), e;
}
class ih {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: i } = this._$AD, s = (e?.creationScope ?? kt).importNode(n, !0);
    _t.currentNode = s;
    let r = _t.nextNode(), o = 0, a = 0, h = i[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new ie(r, r.nextSibling, this, e) : h.type === 1 ? l = new h.ctor(r, h.name, h.strings, this, e) : h.type === 6 && (l = new ah(r, this, e)), this._$AV.push(l), h = i[++a];
      }
      o !== h?.index && (r = _t.nextNode(), o++);
    }
    return _t.currentNode = kt, s;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class ie {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, i, s) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && e?.nodeType === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = Dt(this, e, n), Qt(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== Mt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : eh(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== D && Qt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(kt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Jt.createElement(Bi(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(n);
    else {
      const r = new ih(s, this), o = r.u(this.options);
      r.p(n), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = ni.get(e.strings);
    return n === void 0 && ni.set(e.strings, n = new Jt(e)), n;
  }
  k(e) {
    yn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const r of e) s === n.length ? n.push(i = new ie(this.O(Kt()), this.O(Kt()), this, this.options)) : i = n[s], i._$AI(r), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, s, r) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = D;
  }
  _$AI(e, n = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = Dt(this, e, n, 0), o = !Qt(e) || e !== this._$AH && e !== Mt, o && (this._$AH = e);
    else {
      const a = e;
      let h, l;
      for (e = r[0], h = 0; h < r.length - 1; h++) l = Dt(this, a[i + h], n, h), l === Mt && (l = this._$AH[h]), o ||= !Qt(l) || l !== this._$AH[h], l === D ? e = D : e !== D && (e += (l ?? "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class sh extends Le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === D ? void 0 : e;
  }
}
class rh extends Le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== D);
  }
}
class oh extends Le {
  constructor(e, n, i, s, r) {
    super(e, n, i, s, r), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = Dt(this, e, n, 0) ?? D) === Mt) return;
    const i = this._$AH, s = e === D && i !== D || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== D && (i === D || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ah {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Dt(this, e);
  }
}
const hh = mn.litHtmlPolyfillSupport;
hh?.(Jt, ie), (mn.litHtmlVersions ??= []).push("3.3.1");
const lh = (t, e, n) => {
  const i = n?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = n?.renderBefore ?? null;
    i._$litPart$ = s = new ie(e.insertBefore(Kt(), r), r, void 0, n ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vn = globalThis;
let I = class extends Ht {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = lh(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Mt;
  }
};
I._$litElement$ = !0, I.finalized = !0, vn.litElementHydrateSupport?.({ LitElement: I });
const ch = vn.litElementPolyfillSupport;
ch?.({ LitElement: I });
(vn.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = Symbol.for(""), dh = (t) => {
  if (t?.r === Ui) return t?._$litStatic$;
}, uh = (t) => ({ _$litStatic$: t, r: Ui }), ii = /* @__PURE__ */ new Map(), fh = (t) => (e, ...n) => {
  const i = n.length;
  let s, r;
  const o = [], a = [];
  let h, l = 0, c = !1;
  for (; l < i; ) {
    for (h = e[l]; l < i && (r = n[l], (s = dh(r)) !== void 0); ) h += s + e[++l], c = !0;
    l !== i && a.push(r), o.push(h), l++;
  }
  if (l === i && o.push(e[i]), c) {
    const d = o.join("$$lit$$");
    (e = ii.get(d)) === void 0 && (o.raw = o, ii.set(d, e = o)), n = a;
  }
  return t(e, ...n);
}, it = fh(C);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ph = { attribute: !0, type: String, converter: Se, reflect: !1, hasChanged: gn }, gh = (t = ph, e, n) => {
  const { kind: i, metadata: s } = n;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(n.name, t), i === "accessor") {
    const { name: o } = n;
    return { set(a) {
      const h = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, h, t);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = n;
    return function(a) {
      const h = this[o];
      e.call(this, a), this.requestUpdate(o, h, t);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function w(t) {
  return (e, n) => typeof n == "object" ? gh(t, e, n) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mh = { ATTRIBUTE: 1 }, yh = (t) => (...e) => ({ _$litDirective$: t, values: e });
let vh = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, n, i) {
    this._$Ct = e, this._$AM = n, this._$Ci = i;
  }
  _$AS(e, n) {
    return this.update(e, n);
  }
  update(e, n) {
    return this.render(...n);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xi = "important", wh = " !" + Xi, xh = yh(class extends vh {
  constructor(t) {
    if (super(t), t.type !== mh.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce(((e, n) => {
      const i = t[n];
      return i == null ? e : e + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }), "");
  }
  update(t, [e]) {
    const { style: n } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const i of this.ft) e[i] == null && (this.ft.delete(i), i.includes("-") ? n.removeProperty(i) : n[i] = null);
    for (const i in e) {
      const s = e[i];
      if (s != null) {
        this.ft.add(i);
        const r = typeof s == "string" && s.endsWith(wh);
        i.includes("-") || r ? n.setProperty(i, r ? s.slice(0, -11) : s, r ? Xi : "") : n[i] = s;
      }
    }
    return Mt;
  }
});
function Qh(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function Jh(t, e) {
  return {
    x: (t.x + e.x) / 2,
    y: (t.y + e.y) / 2
  };
}
function Qe(t) {
  return Ma(t);
}
function si(t) {
  return Pa(t);
}
function bh(t) {
  return Ca(t);
}
function tl(t, e) {
  return t.x >= e.x && t.x <= e.x + e.width && t.y >= e.y && t.y <= e.y + e.height;
}
var $h = Object.defineProperty, _h = Object.getOwnPropertyDescriptor, se = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? _h(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && $h(e, n, s), s;
};
let Ct = class extends I {
  constructor() {
    super(), this.nodes = [], this.edges = [], this.viewport = { x: 0, y: 0, zoom: 1 }, this.nodeTypes = {
      default: "flow-node",
      shape: "shape-node",
      "erd-table": "erd-table-node"
    }, this.connection = null, this.onHandleStart = (t) => {
      const { nodeId: e, type: n, handleId: i } = t.detail;
      this.connection = { from: { nodeId: e, handleId: i } };
    }, this.onMouseMove = (t) => {
      if (!this.connection) return;
      const e = this.screenToCanvas(t.clientX, t.clientY);
      this.connection.preview = e, this.requestUpdate();
    }, this.onMouseUp = (t) => {
      if (!this.connection) return;
      const e = t.composedPath();
      let n = null, i;
      for (const r of e)
        if (r instanceof HTMLElement) {
          const o = r.tagName.toLowerCase();
          if (o === "flow-node" || Object.values(this.nodeTypes).some((a) => a === o)) {
            n = r;
            break;
          }
          r.dataset.handleId && (i = r.dataset.handleId);
        }
      const s = n?.getAttribute("id") || void 0;
      if (this.connection.from && s && s !== this.connection.from.nodeId) {
        const r = `e-${this.connection.from.nodeId}-${s}-${Date.now()}`, o = this.connection.from.nodeId, a = this.connection.from.handleId;
        let h = i;
        if (!h) {
          const l = this.nodes.find((c) => c.id === s);
          l && l.type === "shape" && (h = this.determineBestTargetHandle(o, s), console.log("Auto-determined target handle:", { sourceNodeId: o, targetId: s, finalTargetHandleId: h }));
        }
        this.instance.addEdge({
          id: r,
          source: o,
          target: s,
          sourceHandle: a,
          targetHandle: h,
          data: {}
        });
      }
      this.connection = null, this.requestUpdate();
    }, this.onNodeSelect = (t) => {
      const { nodeId: e, selected: n, node: i } = t.detail;
      this.instance.updateNode(e, { selected: n }), this.dispatchEvent(new CustomEvent("node-selected", {
        detail: {
          nodeId: e,
          selected: n,
          node: i,
          allSelectedNodes: this.nodes.filter((s) => s.selected)
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.onEdgeSelect = (t) => {
      const { edgeId: e, selected: n, edge: i } = t.detail;
      this.instance.updateEdge(e, { selected: n }), this.dispatchEvent(new CustomEvent("edge-selected", {
        detail: {
          edgeId: e,
          selected: n,
          edge: i,
          allSelectedEdges: this.edges.filter((s) => s.selected)
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.instance = new Ya({ nodes: this.nodes, edges: this.edges });
  }
  createRenderRoot() {
    return super.createRenderRoot();
  }
  getNodeGeom(t) {
    const e = this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`), n = this.renderRoot.querySelector(".flow-viewport");
    if (!e || !n) return null;
    const i = e.getBoundingClientRect(), s = n.getBoundingClientRect(), r = this.viewport.zoom || 1, o = (i.left - s.left - this.viewport.x) / r, a = (i.top - s.top - this.viewport.y) / r, h = i.width / r, l = i.height / r, c = a + l / 2;
    return { left: { x: o, y: c }, right: { x: o + h, y: c } };
  }
  /**
   * Get handle position in canvas coordinates
   */
  getHandleCanvasPosition(t, e) {
    const n = this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);
    if (!n) return null;
    let i = null;
    const s = n.shadowRoot;
    if (s && (i = s.querySelector(`[data-handle-id="${CSS.escape(e)}"]`)), i || (i = n.querySelector(`[data-handle-id="${CSS.escape(e)}"]`)), !i) return null;
    const r = this.nodes.find((d) => d.id === t);
    if (!r) return null;
    if (r.type === "shape")
      return console.log("getHandleCanvasPosition for shape node:", { nodeId: t, handleId: e, node: r }), this.getShapeHandlePosition(r, e);
    const o = n.getBoundingClientRect(), a = i.getBoundingClientRect(), h = this.viewport.zoom || 1, l = (a.left + a.width / 2 - o.left) / h, c = (a.top + a.height / 2 - o.top) / h;
    return {
      x: r.position.x + l,
      y: r.position.y + c
    };
  }
  /**
   * Get handle position for shape nodes based on shape size and handle type
   */
  getShapeHandlePosition(t, e) {
    const n = t.data;
    if (!n) return null;
    const i = n.size || { width: 200, height: 200 }, s = i.width, r = i.height, o = e.split("-"), a = o[o.length - 1];
    console.log("getShapeHandlePosition:", { handleId: e, parts: o, handleType: a, node: t.id, size: i });
    let h = 0, l = 0;
    switch (a) {
      case "right":
        h = s, l = r / 2;
        break;
      case "left":
        h = 0, l = r / 2;
        break;
      case "top":
        h = s / 2, l = 0;
        break;
      case "bottom":
        h = s / 2, l = r;
        break;
      default:
        h = s / 2, l = r / 2;
    }
    const c = {
      x: t.position.x + h,
      y: t.position.y + l
    };
    return console.log("getShapeHandlePosition result:", {
      nodeId: t.id,
      position: t.position,
      offsetX: h,
      offsetY: l,
      result: c
    }), c;
  }
  setNodes(t) {
    this.instance.setNodes(t);
  }
  setEdges(t) {
    this.instance.setEdges(t);
  }
  /**
   * Determine the best target handle for a shape node based on connection direction
   */
  determineBestTargetHandle(t, e) {
    const n = this.nodes.find((v) => v.id === t), i = this.nodes.find((v) => v.id === e);
    if (!n || !i) return `${e}-target-left`;
    const s = n.position.x, r = n.position.y, o = i.position.x, a = i.position.y, h = i.data, l = h?.size?.width || 200, c = h?.size?.height || 200, d = s + (n.width || 150) / 2, f = r + (n.height || 50) / 2, p = o + l / 2, m = a + c / 2, b = p - d, E = m - f;
    return Math.abs(b) > Math.abs(E) ? b > 0 ? `${e}-target-left` : `${e}-target-right` : E > 0 ? `${e}-target-top` : `${e}-target-bottom`;
  }
  computeLabelCanvasPosition(t) {
    const e = this.nodes.find((l) => l.id === t.source), n = this.nodes.find((l) => l.id === t.target);
    if (!e || !n) return null;
    let i, s, r, o;
    if (t.sourceHandle) {
      const l = this.getHandleCanvasPosition(t.source, t.sourceHandle);
      if (l)
        i = l.x, s = l.y;
      else {
        const c = e.measured?.width || e.width || 150, d = e.measured?.height || e.height || 50;
        i = e.position.x + c, s = e.position.y + d / 2;
      }
    } else {
      const l = e.measured?.width || e.width || 150, c = e.measured?.height || e.height || 50;
      i = e.position.x + l, s = e.position.y + c / 2;
    }
    if (t.targetHandle) {
      const l = this.getHandleCanvasPosition(t.target, t.targetHandle);
      if (l)
        r = l.x, o = l.y;
      else {
        r = n.position.x;
        const c = n.measured?.height || n.height || 50;
        o = n.position.y + c / 2;
      }
    } else {
      r = n.position.x;
      const l = n.measured?.height || n.height || 50;
      o = n.position.y + l / 2;
    }
    const [, a, h] = Qe({
      sourceX: i,
      sourceY: s,
      sourcePosition: k.Right,
      targetX: r,
      targetY: o,
      targetPosition: k.Left
    });
    return { x: a, y: h };
  }
  computeStartLabelCanvasPosition(t) {
    const e = this.nodes.find((s) => s.id === t.source);
    if (!e) return null;
    let n, i;
    if (t.sourceHandle) {
      const s = this.getHandleCanvasPosition(t.source, t.sourceHandle);
      if (s)
        n = s.x, i = s.y;
      else {
        const r = e.measured?.width || e.width || 150, o = e.measured?.height || e.height || 50;
        n = e.position.x + r, i = e.position.y + o / 2;
      }
    } else {
      const s = e.measured?.width || e.width || 150, r = e.measured?.height || e.height || 50;
      n = e.position.x + s, i = e.position.y + r / 2;
    }
    return { x: n + 12, y: i - 10 };
  }
  computeEndLabelCanvasPosition(t) {
    const e = this.nodes.find((s) => s.id === t.target);
    if (!e) return null;
    let n, i;
    if (t.targetHandle) {
      const s = this.getHandleCanvasPosition(t.target, t.targetHandle);
      if (s)
        n = s.x, i = s.y;
      else {
        const r = e.measured?.height || e.height || 50;
        n = e.position.x, i = e.position.y + r / 2;
      }
    } else {
      const s = e.measured?.height || e.height || 50;
      n = e.position.x, i = e.position.y + s / 2;
    }
    return { x: n - 12, y: i - 10 };
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector(".flow-container");
    t && (this.instance.mount(t), this.unsubscribe = this.instance.subscribe((e) => {
      this.nodes = e.nodes, this.edges = e.edges, this.viewport = e.viewport, this.requestUpdate();
    }), t.addEventListener("mousemove", this.onMouseMove), window.addEventListener("mouseup", this.onMouseUp), t.addEventListener("node-select", this.onNodeSelect), document.addEventListener("edge-select", this.onEdgeSelect));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribe?.(), this.instance.destroy();
    const t = this.renderRoot.querySelector(".flow-container");
    t?.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("mouseup", this.onMouseUp), t?.removeEventListener("node-select", this.onNodeSelect), document.removeEventListener("edge-select", this.onEdgeSelect);
  }
  /**
   * Renders a node with dynamic tag name based on node type
   * Falls back to 'flow-node' if type is not registered
   */
  renderNode(t) {
    const e = t.type || "default", n = this.nodeTypes[e] || "flow-node", i = uh(n);
    return it`
      <${i}
        .id=${t.id}
        .data=${t.data}
        .position=${t.position}
        .selected=${t.selected || !1}
        .draggable=${t.draggable !== !1}
        .connectable=${t.connectable !== !1}
        .resizable=${t.resizable || !1}
        .instance=${this.instance}
        @handle-start=${this.onHandleStart}
      ></${i}>
    `;
  }
  render() {
    const t = `translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;
    return it`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${xh({ transform: t })}
        >
          <div class="flow-edges-layer">
            ${this.edges.map((e) => {
      const n = this.nodes.find((s) => s.id === e.source), i = this.nodes.find((s) => s.id === e.target);
      return !n || !i ? null : it`
                <flow-edge 
                  .id=${e.id}
                  .source=${e.source}
                  .target=${e.target}
                  .sourceHandle=${e.sourceHandle}
                  .targetHandle=${e.targetHandle}
                  .sourceNode=${n}
                  .targetNode=${i}
                  .animated=${e.animated || !1}
                  .label=${e.label || ""}
                  .type=${e.type || "default"}
                  .markerStart=${e.markerStart}
                  .markerEnd=${e.markerEnd}
                ></flow-edge>
              `;
    })}
            ${this.renderPreviewEdge()}
          </div>
          <div class="flow-nodes-layer">
            ${this.nodes.map((e) => this.renderNode(e))}
          </div>
          <div class="flow-labels-overlay">
            ${this.edges.map((e) => {
      const n = e.data && e.data.labelHtml, i = e.data && e.data.label;
      if (!(!!n || !!i)) return null;
      const r = this.computeLabelCanvasPosition(e);
      if (!r) return null;
      const o = `transform: translate(-50%, -50%) translate(${r.x}px, ${r.y}px);`;
      return n ? it`<div class="edge-label" style="${o}" .innerHTML=${n}></div>` : it`<div class="edge-label" style="${o}">${i}</div>`;
    })}
            ${this.edges.map((e) => {
      const n = e.data && e.data.startLabelHtml, i = e.data && e.data.startLabel;
      if (!n && !i) return null;
      const s = this.computeStartLabelCanvasPosition(e);
      if (!s) return null;
      const r = `transform: translate(-50%, -50%) translate(${s.x}px, ${s.y}px);`;
      return n ? it`<div class="edge-label" style="${r}" .innerHTML=${n}></div>` : it`<div class="edge-label" style="${r}">${i}</div>`;
    })}
            ${this.edges.map((e) => {
      const n = e.data && e.data.endLabelHtml, i = e.data && e.data.endLabel;
      if (!n && !i) return null;
      const s = this.computeEndLabelCanvasPosition(e);
      if (!s) return null;
      const r = `transform: translate(-50%, -50%) translate(${s.x}px, ${s.y}px);`;
      return n ? it`<div class="edge-label" style="${r}" .innerHTML=${n}></div>` : it`<div class="edge-label" style="${r}">${i}</div>`;
    })}
          </div>
        </div>
        <slot></slot>
      </div>
    `;
  }
  screenToCanvas(t, e) {
    const n = this.renderRoot.querySelector(".flow-container");
    if (!n) return { x: t, y: e };
    const i = n.getBoundingClientRect(), s = this.viewport.x, r = this.viewport.y, o = this.viewport.zoom || 1;
    return { x: (t - i.left - s) / o, y: (e - i.top - r) / o };
  }
  renderPreviewEdge() {
    if (!this.connection || !this.connection.preview) return null;
    const t = this.connection.preview, e = this.connection.from ? this.nodes.find((i) => i.id === this.connection.from.nodeId) : null, n = this.connection.to ? this.nodes.find((i) => i.id === this.connection.to.nodeId) : null;
    return e ? it`
        <flow-edge
          .id=${"preview"}
          .source=${e.id}
          .target=${"__preview__"}
          .sourceHandle=${this.connection.from?.handleId}
          .sourceNode=${{ ...e, position: e.position }}
          .targetNode=${{ id: "__preview__", position: { x: t.x, y: t.y }, width: 1, height: 1, data: {} }}
          .animated=${!0}
          .label=${""}
        ></flow-edge>
      ` : n ? it`
        <flow-edge
          .id=${"preview"}
          .source=${"__preview__"}
          .target=${n.id}
          .sourceNode=${{ id: "__preview__", position: { x: t.x, y: t.y }, width: 1, height: 1, data: {} }}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{ ...n, position: n.position }}
          .animated=${!0}
          .label=${""}
        ></flow-edge>
      ` : null;
  }
};
Ct.styles = U`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      background: var(--flow-background-color, #fafafa);
    }

    .flow-container {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: grab;
    }

    .flow-container.panning {
      cursor: grabbing;
    }

    .flow-viewport {
      width: 100%;
      height: 100%;
      position: relative;
      transform-origin: 0 0;
      will-change: transform;
    }

    .flow-nodes-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .flow-edges-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
       pointer-events: none;
    }

    .flow-labels-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .edge-label {
      position: absolute;
      transform: translate(-50%, -50%);
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 12px;
      color: #333;
      pointer-events: all;
      white-space: nowrap;
      user-select: none;
    }
  `;
se([
  w({ type: Array })
], Ct.prototype, "nodes", 2);
se([
  w({ type: Array })
], Ct.prototype, "edges", 2);
se([
  w({ type: Object })
], Ct.prototype, "viewport", 2);
se([
  w({ type: Object })
], Ct.prototype, "nodeTypes", 2);
Ct = se([
  Z("flow-canvas")
], Ct);
var zh = Object.defineProperty, Sh = Object.getOwnPropertyDescriptor, Nt = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Sh(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && zh(e, n, s), s;
};
let gt = class extends I {
  constructor() {
    super(...arguments), this.visible = !1, this.minWidth = 10, this.minHeight = 10, this.maxWidth = Number.MAX_VALUE, this.maxHeight = Number.MAX_VALUE, this.keepAspectRatio = !1, this.isResizing = !1, this.resizeStart = { x: 0, y: 0, width: 0, height: 0 }, this.resizeHandle = "", this.handleMouseDown = (t) => {
      const e = t.target;
      console.log("NodeResizer handleMouseDown:", e, e.classList);
      let n = e.classList.contains("resize-handle");
      if (!n && e === this && (n = t.composedPath().some(
        (o) => o instanceof HTMLElement && o.classList.contains("resize-handle")
      )), console.log("Is resize handle:", n), !n) return;
      t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), this.isResizing = !0;
      const i = this.getRootNode().host;
      this.resizeStart = {
        x: t.clientX,
        y: t.clientY,
        width: i?.offsetWidth || 0,
        height: i?.offsetHeight || 0
      };
      let s = null;
      if (e.classList.contains("resize-handle") ? s = e : e === this && (s = t.composedPath().find(
        (o) => o instanceof HTMLElement && o.classList.contains("resize-handle")
      ) || null), s) {
        const r = Array.from(s.classList);
        this.resizeHandle = r.find((o) => o !== "resize-handle") || "", console.log("Resize handle direction:", this.resizeHandle);
      }
      document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp), console.log({
        width: this.resizeStart.width,
        height: this.resizeStart.height
      }), this.dispatchEvent(new CustomEvent("resize-start", {
        detail: {
          width: this.resizeStart.width,
          height: this.resizeStart.height
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.handleMouseMove = (t) => {
      if (!this.isResizing) return;
      const e = this.getRootNode().host;
      if (!e) return;
      console.log("NodeResizer handleMouseMove:", t);
      const n = t.clientX - this.resizeStart.x, i = t.clientY - this.resizeStart.y;
      let s = this.resizeStart.width, r = this.resizeStart.height;
      switch (this.resizeHandle) {
        case "nw":
          s = this.resizeStart.width - n, r = this.resizeStart.height - i;
          break;
        case "ne":
          s = this.resizeStart.width + n, r = this.resizeStart.height - i;
          break;
        case "sw":
          s = this.resizeStart.width - n, r = this.resizeStart.height + i;
          break;
        case "se":
          s = this.resizeStart.width + n, r = this.resizeStart.height + i;
          break;
        case "n":
          r = this.resizeStart.height - i;
          break;
        case "s":
          r = this.resizeStart.height + i;
          break;
        case "w":
          s = this.resizeStart.width - n;
          break;
        case "e":
          s = this.resizeStart.width + n;
          break;
      }
      if (s = Math.max(this.minWidth, Math.min(this.maxWidth, s)), r = Math.max(this.minHeight, Math.min(this.maxHeight, r)), this.keepAspectRatio) {
        const o = this.resizeStart.width / this.resizeStart.height;
        this.resizeHandle.includes("w") || this.resizeHandle.includes("e") ? r = s / o : s = r * o;
      }
      e.style.width = `${s}px`, e.style.height = `${r}px`, this.dispatchEvent(new CustomEvent("resize", {
        detail: {
          width: s,
          height: r,
          handle: this.resizeHandle
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.handleMouseUp = () => {
      if (!this.isResizing) return;
      this.isResizing = !1, this.cleanup();
      const t = this.getRootNode().host;
      this.dispatchEvent(new CustomEvent("resize-end", {
        detail: {
          width: t?.offsetWidth || 0,
          height: t?.offsetHeight || 0
        },
        bubbles: !0,
        composed: !0
      }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("mousedown", this.handleMouseDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mousedown", this.handleMouseDown), this.cleanup();
  }
  cleanup() {
    document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp);
  }
  render() {
    return this.visible ? C`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    ` : C``;
  }
};
gt.styles = U`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 10;
    }

    .resize-handle {
      position: absolute;
      background: var(--flow-node-selected-color, #1a73e8);
      border: 2px solid #fff;
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .resize-handle:hover {
      opacity: 1;
    }

    :host([visible]) .resize-handle {
      opacity: 1;
    }

    .resize-handle.nw {
      top: -8px;
      left: -8px;
      width: 12px;
      height: 12px;
      cursor: nw-resize;
    }

    .resize-handle.ne {
      top: -8px;
      right: -8px;
      width: 12px;
      height: 12px;
      cursor: ne-resize;
    }

    .resize-handle.sw {
      bottom: -8px;
      left: -8px;
      width: 12px;
      height: 12px;
      cursor: sw-resize;
    }

    .resize-handle.se {
      bottom: -8px;
      right: -8px;
      width: 12px;
      height: 12px;
      cursor: se-resize;
    }

    .resize-handle.n {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      cursor: n-resize;
    }

    .resize-handle.s {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      cursor: s-resize;
    }

    .resize-handle.w {
      top: 50%;
      left: -8px;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      cursor: w-resize;
    }

    .resize-handle.e {
      top: 50%;
      right: -8px;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      cursor: e-resize;
    }

    .resize-border {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px dashed var(--flow-node-selected-color, #1a73e8);
      opacity: 0;
      pointer-events: none;
    }

    :host([visible]) .resize-border {
      opacity: 1;
    }
  `;
Nt([
  w({ type: Boolean, reflect: !0 })
], gt.prototype, "visible", 2);
Nt([
  w({ type: Number })
], gt.prototype, "minWidth", 2);
Nt([
  w({ type: Number })
], gt.prototype, "minHeight", 2);
Nt([
  w({ type: Number })
], gt.prototype, "maxWidth", 2);
Nt([
  w({ type: Number })
], gt.prototype, "maxHeight", 2);
Nt([
  w({ type: Boolean })
], gt.prototype, "keepAspectRatio", 2);
gt = Nt([
  Z("node-resizer")
], gt);
var Eh = Object.defineProperty, kh = Object.getOwnPropertyDescriptor, mt = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? kh(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Eh(e, n, s), s;
};
let Q = class extends I {
  constructor() {
    super(...arguments), this.id = "", this.data = {}, this.position = { x: 0, y: 0 }, this.selected = !1, this.dragging = !1, this.draggable = !0, this.resizable = !1, this.isDragging = !1, this.dragStart = { x: 0, y: 0 }, this.nodeStart = { x: 0, y: 0 }, this.lastMeasured = null, this.handleClick = (t) => {
      if (t.stopPropagation(), !this.isDragging && this.instance) {
        const e = !this.selected;
        this.instance.updateNode(this.id, { selected: e }), this.dispatchEvent(new CustomEvent("node-select", {
          detail: {
            nodeId: this.id,
            selected: e,
            node: {
              id: this.id,
              data: this.data,
              position: this.position,
              selected: e
            }
          },
          bubbles: !0,
          composed: !0
        }));
      }
    }, this.handleResize = (t) => {
      const { width: e, height: n } = t.detail;
      this.instance && this.instance.updateNode(this.id, {
        width: e,
        height: n,
        measured: { width: e, height: n }
      });
    }, this.handleResizeEnd = (t) => {
      const { width: e, height: n } = t.detail;
      this.instance && this.instance.updateNode(this.id, {
        width: e,
        height: n,
        measured: { width: e, height: n }
      }), this.dispatchEvent(new CustomEvent("node-resize-end", {
        detail: {
          nodeId: this.id,
          width: e,
          height: n
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.handleMouseDown = (t) => {
      if (!this.draggable || t.button !== 0) return;
      const e = t.target;
      e.classList.contains("resize-handle") || e.tagName === "NODE-RESIZER" || e.closest("node-resizer") !== null || (t.preventDefault(), t.stopPropagation(), this.isDragging = !1, this.dragStart = { x: t.clientX, y: t.clientY }, this.nodeStart = { ...this.position }, document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp));
    }, this.handleMouseMove = (t) => {
      const e = t.clientX - this.dragStart.x, n = t.clientY - this.dragStart.y;
      if (!this.isDragging && (Math.abs(e) > 3 || Math.abs(n) > 3) && (this.isDragging = !0, this.dragging = !0, this.instance && this.instance.updateNode(this.id, { dragging: !0 })), this.isDragging && this.instance) {
        const i = this.instance.getViewport(), s = {
          x: this.nodeStart.x + e / i.zoom,
          y: this.nodeStart.y + n / i.zoom
        };
        this.instance.updateNode(this.id, { position: s });
      }
    }, this.handleMouseUp = () => {
      this.isDragging && this.instance && this.instance.updateNode(this.id, { dragging: !1 }), this.cleanup(), setTimeout(() => {
        this.isDragging = !1, this.dragging = !1;
      }, 50);
    };
  }
  firstUpdated() {
    this.draggable && this.addEventListener("mousedown", this.handleMouseDown), this.addEventListener("click", this.handleClick), this.resizable && (this.addEventListener("resize", this.handleResize), this.addEventListener("resize-end", this.handleResizeEnd)), this.updateMeasuredSize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mousedown", this.handleMouseDown), this.removeEventListener("click", this.handleClick), this.resizable && (this.removeEventListener("resize", this.handleResize), this.removeEventListener("resize-end", this.handleResizeEnd)), this.cleanup();
  }
  cleanup() {
    document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp);
  }
  render() {
    return C`
      <div class="node-container">
        <div class="node-content">
          ${this.data?.label || "Node"}
        </div>
        <div 
          class="handle target" 
          data-handle="target" 
          data-node-id=${this.id}
          @mousedown=${this.onHandleMouseDown("target")}
        ></div>
        <div 
          class="handle source" 
          data-handle="source" 
          data-node-id=${this.id}
          @mousedown=${this.onHandleMouseDown("source")}
        ></div>
      </div>
      ${this.resizable ? C`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="30"
          max-width="500"
          max-height="300"
        ></node-resizer>
      ` : ""}
    `;
  }
  updated(t) {
    super.updated(t), this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`, this.updateMeasuredSize(), t.has("resizable") && console.log("FlowNode resizable changed:", this.resizable);
  }
  updateMeasuredSize() {
    if (!this.instance) return;
    const t = this.getBoundingClientRect(), e = this.instance.getViewport().zoom || 1, n = t.width / e, i = t.height / e;
    (!this.lastMeasured || Math.abs(this.lastMeasured.width - n) > 0.5 || Math.abs(this.lastMeasured.height - i) > 0.5) && (this.lastMeasured = { width: n, height: i }, this.instance.updateNode(this.id, { measured: { width: n, height: i }, width: n, height: i }));
  }
  onHandleMouseDown(t) {
    return (e) => {
      e.stopPropagation(), e.preventDefault(), this.dispatchEvent(new CustomEvent("handle-start", {
        detail: { nodeId: this.id, type: t },
        bubbles: !0,
        composed: !0
      }));
    };
  }
};
Q.styles = U`
    :host {
      position: absolute;
      border: 1px solid var(--flow-node-border, #ddd);
      border-radius: 8px;
      background: var(--flow-node-background, white);
      padding: 10px 20px;
      cursor: grab;
      user-select: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
      transform-origin: 0 0;
      will-change: transform;
      pointer-events: auto;
    }

    :host([dragging]) {
      cursor: grabbing;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
    }

    :host(:hover) {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    :host([selected]) {
      border-color: var(--flow-node-selected-border, #1a73e8);
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.3);
    }

    .node-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .handle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--flow-handle-bg, #fff);
      border: 1px solid var(--flow-handle-border, #1a73e8);
      box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.15);
      cursor: crosshair;
      pointer-events: auto;
    }

    .handle.source {
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .handle.target {
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;
mt([
  w({ type: String, reflect: !0 })
], Q.prototype, "id", 2);
mt([
  w({ type: Object })
], Q.prototype, "data", 2);
mt([
  w({ type: Object })
], Q.prototype, "position", 2);
mt([
  w({ type: Boolean, reflect: !0 })
], Q.prototype, "selected", 2);
mt([
  w({ type: Boolean, reflect: !0 })
], Q.prototype, "dragging", 2);
mt([
  w({ type: Boolean })
], Q.prototype, "draggable", 2);
mt([
  w({ type: Object })
], Q.prototype, "instance", 2);
mt([
  w({ type: Boolean })
], Q.prototype, "resizable", 2);
Q = mt([
  Z("flow-node")
], Q);
var Mh = Object.defineProperty, Ch = Object.getOwnPropertyDescriptor, q = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ch(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Mh(e, n, s), s;
};
let B = class extends I {
  constructor() {
    super(...arguments), this.id = "", this.source = "", this.target = "", this.animated = !1, this.selected = !1, this.label = "", this.type = "default", this.markerHandleHalf = 5;
  }
  // half of node handle diameter (10px)
  /**
   * Create marker ID from marker spec
   */
  getMarkerId(t) {
    if (!t) return;
    if (typeof t == "string") return t;
    const e = this.normalizeMarkerSpec(t);
    return `marker-${this.hashString(e)}`;
  }
  /**
   * Create marker SVG from marker spec
   */
  createMarkerSVG(t, e) {
    if (e.type === "custom") {
      const l = e.width ?? 10, c = e.height ?? 10, d = (e.refX ?? l) + this.markerHandleHalf, f = e.refY ?? c / 2, p = e.color ?? "currentColor", m = e.orient ?? "auto";
      return `<marker id="${t}" markerWidth="${l}" markerHeight="${c}" refX="${d}" refY="${f}" orient="${m}" markerUnits="userSpaceOnUse"><path d="${e.path}" fill="${p}" stroke="${p}"/></marker>`;
    }
    const n = e.width ?? 10, i = e.height ?? 10, s = e.orient ?? "auto", r = e.color ?? "currentColor", o = (e.type === "ArrowClosed", n + this.markerHandleHalf), a = i / 2;
    if (e.type === "ArrowClosed") {
      const l = `M0,0 L${n},${a} L0,${i} Z`;
      return `<marker id="${t}" markerWidth="${n}" markerHeight="${i}" refX="${o}" refY="${a}" orient="${s}" markerUnits="userSpaceOnUse"><path d="${l}" fill="${r}"/></marker>`;
    }
    const h = `M0,0 L${n},${a} L0,${i}`;
    return `<marker id="${t}" markerWidth="${n}" markerHeight="${i}" refX="${o}" refY="${a}" orient="${s}" markerUnits="userSpaceOnUse"><path d="${h}" fill="none" stroke="${r}" stroke-width="2"/></marker>`;
  }
  /**
   * Normalize marker spec to a string key for caching
   */
  normalizeMarkerSpec(t) {
    if (t.type === "custom") {
      const { path: r, width: o = 20, height: a = 20, refX: h = 20, refY: l = 10, orient: c = "auto", color: d = "currentColor" } = t;
      return `custom|p=${r}|w=${o}|h=${a}|rx=${h}|ry=${l}|o=${c}|c=${d}`;
    }
    const { width: e = 20, height: n = 20, orient: i = "auto", color: s = "currentColor" } = t;
    return `builtin|${t.type}|w=${e}|h=${n}|o=${i}|c=${s}`;
  }
  /**
   * Simple hash function for generating unique IDs
   */
  hashString(t) {
    let e = 0;
    for (let n = 0; n < t.length; n++)
      e = (e << 5) - e + t.charCodeAt(n), e |= 0;
    return Math.abs(e).toString(36);
  }
  /**
   * Get path based on edge type
   */
  getPathForType(t, e) {
    const n = t.x, i = t.y, s = e.x, r = e.y, o = t.position, a = e.position;
    switch (this.type) {
      case "straight":
        return bh({
          sourceX: n,
          sourceY: i,
          targetX: s,
          targetY: r
        });
      case "smoothstep":
        return si({
          sourceX: n,
          sourceY: i,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a
        });
      case "step":
        return si({
          sourceX: n,
          sourceY: i,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a,
          borderRadius: 0
          // Step edges have no border radius
        });
      case "simplebezier":
        return Qe({
          sourceX: n,
          sourceY: i,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a,
          curvature: 0.5
          // Simple bezier with fixed curvature
        });
      case "default":
      default:
        return Qe({
          sourceX: n,
          sourceY: i,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a
        });
    }
  }
  /** Returns the ShadowRoot of the parent flow-canvas */
  getFlowCanvasRoot() {
    const t = this.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  /** Returns the flow-canvas host element (if available) */
  getFlowCanvasHost() {
    const t = this.getFlowCanvasRoot();
    return t && t.host || null;
  }
  /**
   * Find a specific handle element within a node
   */
  findHandleElement(t, e) {
    const n = this.getFlowCanvasRoot();
    if (!n) return null;
    const i = n.querySelector(`[id="${CSS.escape(t)}"]`);
    if (!i) return null;
    const s = i.shadowRoot;
    let r = null;
    return s && (r = s.querySelector(`[data-handle-id="${CSS.escape(e)}"]`)), r || (r = i.querySelector(`[data-handle-id="${CSS.escape(e)}"]`)), r;
  }
  /**
   * Get the canvas coordinates of a specific handle
   */
  getHandlePosition(t, e) {
    const n = this.findHandleElement(t, e);
    if (!n) return null;
    const i = this.getFlowCanvasRoot();
    if (!i) return null;
    const s = i.querySelector(`[id="${CSS.escape(t)}"]`);
    if (!s) return null;
    const r = s.getBoundingClientRect(), o = n.getBoundingClientRect(), a = this.sourceNode?.id === t ? this.sourceNode : this.targetNode;
    if (!a) return null;
    a.measured?.width || a.width, a.measured?.height || a.height;
    const c = (this.getFlowCanvasHost()?.viewport || { zoom: 1 }).zoom || 1, d = (o.left + o.width / 2 - r.left) / c, f = (o.top + o.height / 2 - r.top) / c;
    return {
      x: a.position.x + d,
      y: a.position.y + f
    };
  }
  /**
   * Get the source position (handle or node edge)
   */
  getSourcePosition() {
    if (this.sourceHandle && this.sourceNode) {
      const n = this.getHandlePosition(this.sourceNode.id, this.sourceHandle);
      if (n)
        return { ...n, position: k.Right };
    }
    const t = this.sourceNode.measured?.width || this.sourceNode.width || 150, e = this.sourceNode.measured?.height || this.sourceNode.height || 50;
    return {
      x: this.sourceNode.position.x + t,
      y: this.sourceNode.position.y + e / 2,
      position: k.Right
    };
  }
  /**
   * Get the target position (handle or node edge)
   */
  getTargetPosition() {
    if (this.targetHandle && this.targetNode) {
      const e = this.getHandlePosition(this.targetNode.id, this.targetHandle);
      if (e)
        return { ...e, position: k.Left };
    }
    const t = this.targetNode.measured?.height || this.targetNode.height || 50;
    return {
      x: this.targetNode.position.x,
      y: this.targetNode.position.y + t / 2,
      position: k.Left
    };
  }
  render() {
    if (!this.sourceNode || !this.targetNode)
      return C``;
    const t = this.getSourcePosition(), e = this.getTargetPosition(), [n, i, s, r, o] = this.getPathForType(t, e), a = [
      "edge-path",
      this.animated && "animated",
      this.selected && "selected"
    ].filter(Boolean).join(" "), h = this.getMarkerId(this.markerStart), l = this.getMarkerId(this.markerEnd), c = h ? `url(#${h})` : void 0, d = l ? `url(#${l})` : void 0, f = this.animated ? "5" : "";
    return C`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${h && typeof this.markerStart == "object" ? K`<marker id="${h}" markerWidth="${this.markerStart.width || 10}" markerHeight="${this.markerStart.height || 10}" refX="${((this.markerStart.type === "custom" ? this.markerStart.refX : void 0) || this.markerStart.width || 10) + this.markerHandleHalf}" refY="${(this.markerStart.type === "custom" ? this.markerStart.refY : void 0) || (this.markerStart.height || 10) / 2}" orient="${this.markerStart.orient || "auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type === "custom" ? K`<path d="${this.markerStart.path}" fill="${this.markerStart.color || "currentColor"}" stroke="${this.markerStart.color || "currentColor"}"/>` : this.markerStart.type === "ArrowClosed" ? K`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10} Z" fill="${this.markerStart.color || "currentColor"}"/>` : K`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10}" fill="none" stroke="${this.markerStart.color || "currentColor"}" stroke-width="2"/>`}
            </marker>` : ""}
          ${l && typeof this.markerEnd == "object" ? K`<marker id="${l}" markerWidth="${this.markerEnd.width || 10}" markerHeight="${this.markerEnd.height || 10}" refX="${((this.markerEnd.type === "custom" ? this.markerEnd.refX : void 0) || this.markerEnd.width || 10) + this.markerHandleHalf}" refY="${(this.markerEnd.type === "custom" ? this.markerEnd.refY : void 0) || (this.markerEnd.height || 10) / 2}" orient="${this.markerEnd.orient || "auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type === "custom" ? K`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color || "currentColor"}" stroke="${this.markerEnd.color || "currentColor"}"/>` : this.markerEnd.type === "ArrowClosed" ? K`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10} Z" fill="${this.markerEnd.color || "currentColor"}"/>` : K`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10}" fill="none" stroke="${this.markerEnd.color || "currentColor"}" stroke-width="2"/>`}
            </marker>` : ""}
        </defs>
        ${K`
          <path 
            class="${a}"
            d="${n}"
            stroke-dasharray="${f}"
            marker-start="${c ?? ""}"
            marker-end="${d ?? ""}"
            @click=${this.handleClick}
          />
          ${this.label ? K`
            <text 
              x="${i}" 
              y="${s}" 
              text-anchor="middle"
              dy="-5"
              fill="#333"
              style="user-select:none; pointer-events:none; font-size:12px;"
            >
              ${this.label}
            </text>
          ` : ""}
        `}
      </svg>
    `;
  }
  handleClick(t) {
    console.log("handleClick", t), t.stopPropagation();
    const e = !this.selected;
    this.selected = e, this.dispatchEvent(new CustomEvent("edge-select", {
      detail: {
        edgeId: this.id,
        selected: e,
        edge: {
          id: this.id,
          source: this.source,
          target: this.target,
          sourceHandle: this.sourceHandle,
          targetHandle: this.targetHandle,
          label: this.label,
          animated: this.animated,
          selected: e
        }
      },
      bubbles: !0,
      composed: !0
    }));
  }
};
B.styles = U`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .edge-path {
      fill: none;
      stroke: var(--flow-edge-color, #b1b1b7);
      stroke-width: 3;
      cursor: pointer;
      pointer-events: stroke;
    }

    .edge-path:hover {
      stroke: var(--flow-edge-selected-color, #1a73e8);
    }

    .edge-path.selected {
      stroke: var(--flow-edge-selected-color, #1a73e8);
    }

    .edge-path.animated {
      stroke-dasharray: 5;
      animation: dashdraw 0.5s linear infinite;
    }

    .edge-label {
      pointer-events: none;
      user-select: none;
      fill: #333;
      font-size: 12px;
    }

    @keyframes dashdraw {
      to {
        stroke-dashoffset: -10;
      }
    }
  `;
q([
  w({ type: String })
], B.prototype, "id", 2);
q([
  w({ type: String })
], B.prototype, "source", 2);
q([
  w({ type: String })
], B.prototype, "target", 2);
q([
  w({ type: String })
], B.prototype, "sourceHandle", 2);
q([
  w({ type: String })
], B.prototype, "targetHandle", 2);
q([
  w({ type: Object })
], B.prototype, "sourceNode", 2);
q([
  w({ type: Object })
], B.prototype, "targetNode", 2);
q([
  w({ type: Boolean })
], B.prototype, "animated", 2);
q([
  w({ type: Boolean })
], B.prototype, "selected", 2);
q([
  w({ type: String })
], B.prototype, "label", 2);
q([
  w({ type: String })
], B.prototype, "type", 2);
q([
  w({ type: Object })
], B.prototype, "markerStart", 2);
q([
  w({ type: Object })
], B.prototype, "markerEnd", 2);
B = q([
  Z("flow-edge")
], B);
var Ah = Object.defineProperty, Nh = Object.getOwnPropertyDescriptor, re = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Nh(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Ah(e, n, s), s;
};
let At = class extends I {
  constructor() {
    super(...arguments), this.variant = "dots", this.gap = 20, this.color = "#ddd", this.size = 1;
  }
  render() {
    const t = `flow-bg-pattern-${Math.random().toString(36).substr(2, 9)}`;
    return C`
      <svg>
        <defs>
          ${this.variant === "dots" ? this.renderDotsPattern(t) : this.renderLinesPattern(t)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${t})" />
      </svg>
    `;
  }
  renderDotsPattern(t) {
    return K`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `;
  }
  renderLinesPattern(t) {
    return K`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `;
  }
};
At.styles = U`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `;
re([
  w({ type: String })
], At.prototype, "variant", 2);
re([
  w({ type: Number })
], At.prototype, "gap", 2);
re([
  w({ type: String })
], At.prototype, "color", 2);
re([
  w({ type: Number })
], At.prototype, "size", 2);
At = re([
  Z("flow-background")
], At);
var Hh = Object.defineProperty, Ph = Object.getOwnPropertyDescriptor, wn = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ph(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Hh(e, n, s), s;
};
let te = class extends I {
  constructor() {
    super(...arguments), this.width = 200, this.height = 150;
  }
  render() {
    return C`
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `;
  }
};
te.styles = U`
    :host {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 200px;
      height: 150px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      z-index: 10;
    }

    .minimap-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .viewport-indicator {
      position: absolute;
      border: 2px solid #1a73e8;
      background: rgba(26, 115, 232, 0.1);
      pointer-events: none;
    }
  `;
wn([
  w({ type: Number })
], te.prototype, "width", 2);
wn([
  w({ type: Number })
], te.prototype, "height", 2);
te = wn([
  Z("flow-minimap")
], te);
var Rh = Object.defineProperty, Lh = Object.getOwnPropertyDescriptor, Yi = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Lh(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Rh(e, n, s), s;
};
let ke = class extends I {
  constructor() {
    super(...arguments), this.handleZoomIn = () => {
      this.instance?.zoomIn();
    }, this.handleZoomOut = () => {
      this.instance?.zoomOut();
    }, this.handleFitView = () => {
      this.instance?.fitView();
    };
  }
  render() {
    return C`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `;
  }
};
ke.styles = U`
    :host {
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 10;
    }

    button {
      width: 36px;
      height: 36px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: all 0.2s;
    }

    button:hover {
      background: #f5f5f5;
      border-color: #999;
    }

    button:active {
      background: #e0e0e0;
    }

    .divider {
      height: 1px;
      background: #ddd;
      margin: 4px 0;
    }
  `;
Yi([
  w({ type: Object })
], ke.prototype, "instance", 2);
ke = Yi([
  Z("flow-controls")
], ke);
var Th = Object.getOwnPropertyDescriptor, Dh = Object.getPrototypeOf, Oh = Reflect.get, Ih = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Th(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(s) || s);
  return s;
}, Xe = (t, e, n) => Oh(Dh(t), n, e);
let ut = class extends Q {
  constructor() {
    super(...arguments), this.appliedInitialSize = !1;
  }
  firstUpdated() {
    const t = this.data, e = t?.size?.width, n = t?.size?.height;
    (typeof e == "number" && e > 0 || typeof n == "number" && n > 0) && (typeof e == "number" && e > 0 && (this.style.width = `${e}px`), typeof n == "number" && n > 0 && (this.style.height = `${n}px`), this.instance && this.instance.updateNode(this.id, {
      width: typeof e == "number" && e > 0 ? e : this.width,
      height: typeof n == "number" && n > 0 ? n : this.height
    }), this.appliedInitialSize = !0), super.firstUpdated();
  }
  updated(t) {
    super.updated(t);
  }
  onFieldHandleMouseDown(t, e) {
    return (n) => {
      n.stopPropagation(), n.preventDefault();
      const i = `${this.id}-${t}-${e}`;
      this.dispatchEvent(new CustomEvent("handle-start", {
        detail: {
          nodeId: this.id,
          type: e === "left" ? "target" : "source",
          handleId: i,
          fieldName: t
        },
        bubbles: !0,
        composed: !0
      }));
    };
  }
  render() {
    const t = this.data, e = t?.tableName || "Table", n = t?.fields || [];
    return C`
      <div class="table-header" style="${t.color ? `background: ${t.color}` : ""}">
        <span class="table-icon">📊</span>
        <span>${e}</span>
      </div>
      
      <div class="table-body">
        ${n.map((i) => C`
          <div class="field-row" data-field="${i.name}">
            <div class="field-key">
              ${i.key || ""}
            </div>
            <div class="field-name">${i.name}</div>
            <div class="field-type">${i.type}</div>
            <div class="field-nullable">
              ${i.nullable ? "NULL" : ""}
            </div>
            
            <!-- Left handle (input) for this field -->
            <div 
              class="field-handle left"
              data-handle="target"
              data-field="${i.name}"
              data-handle-id="${this.id}-${i.name}-left"
              @mousedown=${this.onFieldHandleMouseDown(i.name, "left")}
            ></div>
            
            <!-- Right handle (output) for this field -->
            <div 
              class="field-handle right"
              data-handle="source"
              data-field="${i.name}"
              data-handle-id="${this.id}-${i.name}-right"
              @mousedown=${this.onFieldHandleMouseDown(i.name, "right")}
            ></div>
          </div>
        `)}
      </div>
      ${this.resizable ? C`
        <node-resizer
          .visible=${this.selected}
          min-width="150"
          min-height="80"
          max-width="500"
          max-height="400"
        ></node-resizer>
      ` : ""}
    `;
  }
};
ut.styles = [
  ...Array.isArray(Xe(ut, ut, "styles")) ? Xe(ut, ut, "styles") : [Xe(ut, ut, "styles")],
  U`
      :host {
        padding: 0;
        min-width: 200px;
        display: flex;
        flex-direction: column;
        background: var(--erd-table-bg, white);
      }

      .table-header {
        background: var(--erd-table-header-bg, #2563eb);
        color: white;
        padding: 12px 16px;
        font-weight: 600;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .table-icon {
        font-size: 18px;
      }

      .table-body {
        padding: 0;
        overflow: auto;
      }

      .field-row {
        display: grid;
        grid-template-columns: 30px 1fr auto auto;
        gap: 8px;
        padding: 10px 16px;
        border-bottom: 1px solid var(--erd-border, #e5e7eb);
        align-items: center;
        position: relative;
        background: white;
        transition: background 0.2s;
      }

      .field-row:hover {
        background: var(--erd-row-hover, #f3f4f6);
      }

      .field-row:last-child {
        border-bottom: none;
        border-radius: 0 0 8px 8px;
      }

      .field-key {
        font-size: 10px;
        font-weight: 700;
        color: var(--erd-key-color, #dc2626);
      }

      .field-name {
        font-weight: 500;
        color: var(--erd-text, #1f2937);
      }

      .field-type {
        font-size: 11px;
        color: var(--erd-type-color, #6b7280);
        text-transform: uppercase;
      }

      .field-nullable {
        font-size: 10px;
        color: #9ca3af;
      }

      /* Handles for each field */
      .field-handle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--flow-handle-bg, #f1f1f1);
        cursor: crosshair;
        pointer-events: auto;
        z-index: 10;
        transition: all 0.2s;
      }

      .field-handle.left {
        left: 3px;
        top: 50%;
        transform: translateY(-50%);
      }

      .field-handle.right {
        right: 3px;
        top: 50%;
        transform: translateY(-50%);
      }

      .field-handle:hover {
        background: var(--flow-handle-border, #2563eb);
        transform: translateY(-50%) scale(1.3);
      }
    `
];
ut = Ih([
  Z("erd-table-node")
], ut);
const Bh = [
  {
    type: "circle",
    name: "Circle",
    category: "basic",
    path: "M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  },
  {
    type: "rectangle",
    name: "Rectangle",
    category: "basic",
    path: "M 5 5 L 195 5 L 195 195 L 5 195 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  },
  {
    type: "diamond",
    name: "Diamond",
    category: "basic",
    path: "M 100 5 L 195 100 L 100 195 L 5 100 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  },
  {
    type: "triangle",
    name: "Triangle",
    category: "basic",
    path: "M 100 5 L 195 195 L 5 195 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  }
], Uh = [
  {
    type: "hexagon",
    name: "Hexagon",
    category: "geometric",
    path: "M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  },
  {
    type: "octagon",
    name: "Octagon",
    category: "geometric",
    path: "M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  }
], Xh = [
  {
    type: "heart",
    name: "Heart",
    category: "symbolic",
    path: "M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  }
], xn = class xn {
  /**
   * Initialize the registry with default shapes
   */
  static initialize() {
    [...Bh, ...Uh, ...Xh].forEach((n) => {
      this.shapes.set(n.type, n);
    });
  }
  /**
   * Register a new shape definition
   */
  static register(e) {
    this.shapes.set(e.type, e);
  }
  /**
   * Get a shape definition by type
   */
  static get(e) {
    return this.shapes.get(e);
  }
  /**
   * Get all registered shapes
   */
  static getAll() {
    return Array.from(this.shapes.values());
  }
  /**
   * Get shapes by category
   */
  static getByCategory(e) {
    return Array.from(this.shapes.values()).filter((n) => n.category === e);
  }
  /**
   * Check if a shape type is registered
   */
  static has(e) {
    return this.shapes.has(e);
  }
  /**
   * Get all available shape types
   */
  static getShapeTypes() {
    return Array.from(this.shapes.keys());
  }
  /**
   * Clear all registered shapes
   */
  static clear() {
    this.shapes.clear();
  }
  /**
   * Get shape count
   */
  static getCount() {
    return this.shapes.size;
  }
};
xn.shapes = /* @__PURE__ */ new Map();
let Me = xn;
Me.initialize();
var Yh = Object.defineProperty, Fh = Object.getOwnPropertyDescriptor, ct = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Fh(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Yh(e, n, s), s;
};
let J = class extends I {
  constructor() {
    super(...arguments), this.id = "", this.selected = !1, this.dragging = !1, this.draggable = !0, this.connectable = !0, this.instance = null, this.resizable = !1, this.isDragging = !1, this.dragStart = { x: 0, y: 0 }, this.nodeStart = { x: 0, y: 0 }, this.handleClick = (t) => {
      if (t.stopPropagation(), !this.isDragging && this.instance) {
        const e = !this.selected;
        this.instance.updateNode(this.id, { selected: e }), this.dispatchEvent(new CustomEvent("node-select", {
          detail: {
            nodeId: this.id,
            selected: e,
            node: {
              id: this.id,
              data: this.data,
              position: this.position,
              selected: e
            }
          },
          bubbles: !0,
          composed: !0
        }));
      }
    }, this.handleResize = (t) => {
      const { width: e, height: n } = t.detail;
      if (this.data && this.instance) {
        const i = {
          ...this.data,
          size: { width: e, height: n }
        };
        this.instance.updateNode(this.id, {
          data: i,
          width: e,
          height: n,
          measured: { width: e, height: n }
        });
      }
    }, this.handleResizeEnd = (t) => {
      const { width: e, height: n } = t.detail;
      if (this.data && this.instance) {
        const i = {
          ...this.data,
          size: { width: e, height: n }
        };
        this.instance.updateNode(this.id, {
          data: i,
          width: e,
          height: n,
          measured: { width: e, height: n }
        });
      }
      this.dispatchEvent(new CustomEvent("node-resize-end", {
        detail: {
          nodeId: this.id,
          width: e,
          height: n
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.handleMouseDown = (t) => {
      if (!this.draggable || t.button !== 0) return;
      const e = t.target;
      e.classList.contains("resize-handle") || e.tagName === "NODE-RESIZER" || e.closest("node-resizer") !== null || (t.preventDefault(), t.stopPropagation(), this.isDragging = !1, this.dragStart = { x: t.clientX, y: t.clientY }, this.nodeStart = { ...this.position }, document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp));
    }, this.handleMouseMove = (t) => {
      const e = t.clientX - this.dragStart.x, n = t.clientY - this.dragStart.y;
      if (!this.isDragging && (Math.abs(e) > 3 || Math.abs(n) > 3) && (this.isDragging = !0, this.instance && this.instance.updateNode(this.id, { dragging: !0 })), this.isDragging && this.instance) {
        const i = this.instance.getViewport(), s = {
          x: this.nodeStart.x + e / i.zoom,
          y: this.nodeStart.y + n / i.zoom
        };
        this.instance.updateNode(this.id, { position: s });
      }
    }, this.handleMouseUp = () => {
      console.log("handleMouseUp"), this.isDragging && this.instance && this.instance.updateNode(this.id, { dragging: !1 }), this.isDragging = !1, this.cleanup();
    }, this.handleHandleStart = (t) => {
      console.log("handleHandleStart", t), t.stopPropagation(), this.isDragging = !1;
      const e = t.target, n = e.dataset.handleId, i = e.dataset.handleType;
      i && n && this.dispatchEvent(new CustomEvent("handle-start", {
        detail: {
          nodeId: this.id,
          handleId: n,
          handleType: i,
          position: this.position
        },
        bubbles: !0,
        composed: !0
      }));
    };
  }
  updated(t) {
    super.updated(t), t.has("position") && this.isDragging, t.has("resizable") && console.log("ShapeNode resizable changed:", this.resizable);
  }
  /**
   * Get the shape definition from the registry
   */
  getShapeDefinition() {
    if (this.data?.type)
      return Me.get(this.data.type);
  }
  /**
   * Render the SVG shape
   */
  renderShape() {
    const t = this.getShapeDefinition();
    if (!t)
      return C`
        <div class="unknown-shape">
          Unknown shape: ${this.data?.type || "undefined"}
        </div>
      `;
    const e = this.data, n = e.size || t.defaultSize, i = e.backgroundColor || e.color || "#ffffff", s = e.strokeColor || "#000000", r = e.strokeWidth || 2, o = e.rotation || 0;
    return C`
      <svg 
        class="shape-svg"
        width="${n.width}" 
        height="${n.height}" 
        viewBox="${t.viewBox}"
        style="transform: rotate(${o}deg)"
      >
        <path 
          d="${t.path}" 
          fill="${i}"
          stroke="${s}"
          stroke-width="${r}"
        />
      </svg>
    `;
  }
  /**
   * Render gradient definitions if needed
   */
  renderGradients() {
    const t = this.data;
    if (t && "gradient" in t && t.gradient) {
      const e = `gradient-${this.data.type}-${Math.random().toString(36).substr(2, 9)}`, n = t.gradient;
      if (n.type === "linear")
        return C`
          <defs>
            <linearGradient id="${e}" x1="0%" y1="0%" x2="100%" y2="100%">
              ${n.colors.map(
          (i, s) => C`<stop offset="${s / (n.colors.length - 1) * 100}%" stop-color="${i}"/>`
        )}
            </linearGradient>
          </defs>
        `;
      if (n.type === "radial")
        return C`
          <defs>
            <radialGradient id="${e}" cx="50%" cy="50%" r="50%">
              ${n.colors.map(
          (i, s) => C`<stop offset="${s / (n.colors.length - 1) * 100}%" stop-color="${i}"/>`
        )}
            </radialGradient>
          </defs>
        `;
    }
    return C``;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this.handleClick), this.addEventListener("mousedown", this.handleMouseDown), this.resizable && (this.addEventListener("resize", this.handleResize), this.addEventListener("resize-end", this.handleResizeEnd));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this.handleClick), this.removeEventListener("mousedown", this.handleMouseDown), this.resizable && (this.removeEventListener("resize", this.handleResize), this.removeEventListener("resize-end", this.handleResizeEnd)), this.cleanup();
  }
  cleanup() {
    document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp);
  }
  render() {
    this.style.setProperty("--position-x", `${this.position.x}px`), this.style.setProperty("--position-y", `${this.position.y}px`);
    const t = this.getShapeDefinition(), n = this.data?.size || t?.defaultSize || { width: 200, height: 200 };
    return this.style.setProperty("--shape-width", `${n.width}px`), this.style.setProperty("--shape-height", `${n.height}px`), C`
      <div class="shape-node ${this.selected ? "selected" : ""}">
        ${this.renderGradients()}
        ${this.renderShape()}
        <div class="shape-content">
          <slot></slot>
        </div>
        ${this.connectable ? this.renderHandles() : ""}
        ${this.renderLabel()}
      </div>
      ${this.resizable ? C`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="50"
          max-width="500"
          max-height="500"
        ></node-resizer>
      ` : ""}
    `;
  }
  renderHandles() {
    const t = this.id;
    return C`
      <div 
        class="handle source" 
        data-handle="source" 
        data-node-id="${t}"
        data-handle-id="${t}-source-right"
        data-handle-type="source"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle target" 
        data-handle="target" 
        data-node-id="${t}"
        data-handle-id="${t}-target-left"
        data-handle-type="target"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle top" 
        data-handle="source" 
        data-node-id="${t}"
        data-handle-id="${t}-source-top"
        data-handle-type="source"
        @mousedown=${this.handleHandleStart}
      ></div>
      <div 
        class="handle bottom" 
        data-handle="target" 
        data-node-id="${t}"
        data-handle-id="${t}-target-bottom"
        data-handle-type="target"
        @mousedown=${this.handleHandleStart}
      ></div>
    `;
  }
  renderLabel() {
    const t = this.data;
    if (!t) return "";
    const e = t.label || t.type;
    return C`
      <div class="shape-label">
        ${e}
      </div>
    `;
  }
};
J.styles = U`
    :host {
      position: absolute;
      display: block;
      pointer-events: auto;
      transform-origin: 0 0;
      will-change: transform;
      transform: translate(var(--position-x, 0px), var(--position-y, 0px));
    }

    .shape-node {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      user-select: none;
      pointer-events: auto;
      width: var(--shape-width, 200px);
      height: var(--shape-height, 200px);
    }

    .shape-node:active {
      cursor: grabbing;
    }

    .shape-node.selected {
      outline: 2px solid var(--flow-node-selected-color, #1a73e8);
      outline-offset: 2px;
    }

    :host([dragging]) .shape-node {
      cursor: grabbing;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
    }

    .shape-svg {
      display: block;
      transition: transform 0.2s ease;
      pointer-events: none;
    }

    .shape-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1;
    }

    .shape-node:hover .shape-svg {
      transform: scale(1.05);
    }

    .unknown-shape {
      width: 100px;
      height: 100px;
      background: #f0f0f0;
      border: 2px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 12px;
      pointer-events: none;
    }

    .handle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--flow-handle-bg, #fff);
      border: 1px solid var(--flow-handle-border, #1a73e8);
      box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.15);
      cursor: crosshair;
      pointer-events: auto;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .handle:hover {
      opacity: 1;
      transform: scale(1.2);
    }

    .handle.source {
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .handle.target {
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .handle.top {
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .handle.bottom {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }

    .shape-node:hover .handle {
      opacity: 1;
    }

    .shape-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 12px;
      color: #333;
      white-space: nowrap;
      user-select: none;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      z-index: 5;
    }

    .shape-label.editable {
      pointer-events: auto;
      cursor: text;
    }

    .shape-label.editable:hover {
      background: rgba(255, 255, 255, 1);
      border-color: var(--flow-node-selected-color, #1a73e8);
    }

    .handle:active {
      opacity: 1;
      transform: scale(1.3);
    }
  `;
ct([
  w({ type: String, reflect: !0 })
], J.prototype, "id", 2);
ct([
  w({ type: Object })
], J.prototype, "data", 2);
ct([
  w({
    type: Object,
    hasChanged: (t, e) => !e || t.x !== e.x || t.y !== e.y
  })
], J.prototype, "position", 2);
ct([
  w({ type: Boolean, reflect: !0 })
], J.prototype, "selected", 2);
ct([
  w({ type: Boolean, reflect: !0 })
], J.prototype, "dragging", 2);
ct([
  w({ type: Boolean })
], J.prototype, "draggable", 2);
ct([
  w({ type: Boolean })
], J.prototype, "connectable", 2);
ct([
  w({ type: Object })
], J.prototype, "instance", 2);
ct([
  w({ type: Boolean })
], J.prototype, "resizable", 2);
J = ct([
  Z("shape-node")
], J);
var Zh = Object.getOwnPropertyDescriptor, oe = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Zh(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(s) || s);
  return s;
};
let Je = class extends I {
  render() {
    return C`<slot></slot>`;
  }
};
Je.styles = U`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;
Je = oe([
  Z("base-node")
], Je);
let tn = class extends I {
  render() {
    return C`<slot></slot>`;
  }
};
tn.styles = U`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `;
tn = oe([
  Z("base-node-header")
], tn);
let en = class extends I {
  render() {
    return C`<span class="title"><slot></slot></span>`;
  }
};
en.styles = U`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;
en = oe([
  Z("base-node-header-title")
], en);
let nn = class extends I {
  render() {
    return C`<slot></slot>`;
  }
};
nn.styles = U`
    :host {
      display: block;
      padding: 12px;
    }
  `;
nn = oe([
  Z("base-node-content")
], nn);
let sn = class extends I {
  render() {
    return C`<slot></slot>`;
  }
};
sn.styles = U`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;
sn = oe([
  Z("base-node-footer")
], sn);
var qh = Object.defineProperty, Y = (t, e, n, i) => {
  for (var s = void 0, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(e, n, s) || s);
  return s && qh(e, n, s), s;
};
const el = (t) => {
  class e extends t {
    constructor() {
      super(...arguments), this.id = "", this.position = { x: 0, y: 0 }, this.data = {}, this.selected = !1, this.dragging = !1, this.instance = null, this.resizable = !1, this.draggable = !0, this.connectable = !0, this.minWidth = 10, this.maxWidth = Number.MAX_VALUE, this.minHeight = 10, this.maxHeight = Number.MAX_VALUE, this.keepAspectRatio = !1, this.isDragging = !1, this.dragStart = { x: 0, y: 0 }, this.nodeStart = { x: 0, y: 0 }, this.isResizing = !1, this.resizeStart = { x: 0, y: 0, width: 0, height: 0 }, this.resizeHandle = "", this.handleClick = (i) => {
        if (i.stopPropagation(), !this.isDragging) {
          const s = !this.selected;
          this.selected = s, this.instance && this.instance.updateNode(this.id, { selected: s }), this.dispatchEvent(new CustomEvent("node-select", {
            detail: {
              nodeId: this.id,
              selected: s,
              node: {
                id: this.id,
                data: this.data,
                position: this.position,
                selected: s
              }
            },
            bubbles: !0,
            composed: !0
          }));
        }
      }, this.handleMouseDown = (i) => {
        if (i.button !== 0) return;
        const s = i.target;
        if (s.classList.contains("resize-handle") || s.closest(".resize-handle") !== null) {
          this.handleResizeStart(i);
          return;
        }
        this.draggable && (i.preventDefault(), i.stopPropagation(), this.isDragging = !1, this.dragStart = { x: i.clientX, y: i.clientY }, this.nodeStart = { ...this.position }, document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp));
      }, this.handleMouseMove = (i) => {
        if (this.isResizing) {
          this.handleResizeMove(i);
          return;
        }
        const s = i.clientX - this.dragStart.x, r = i.clientY - this.dragStart.y;
        if (!this.isDragging && (Math.abs(s) > 3 || Math.abs(r) > 3) && (this.isDragging = !0, this.dragging = !0, this.instance && this.instance.updateNode(this.id, { dragging: !0 })), this.isDragging && this.instance) {
          const o = this.instance.getViewport(), a = {
            x: this.nodeStart.x + s / o.zoom,
            y: this.nodeStart.y + r / o.zoom
          };
          this.instance.updateNode(this.id, { position: a });
        }
      }, this.handleMouseUp = () => {
        this.isDragging && this.instance && this.instance.updateNode(this.id, { dragging: !1 }), this.isResizing && this.handleResizeEnd(), this.cleanup(), setTimeout(() => {
          this.isDragging = !1, this.dragging = !1, this.isResizing = !1;
        }, 50);
      }, this.handleResizeStart = (i, s) => {
        i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation(), this.isResizing = !0;
        const r = this.getBoundingClientRect(), o = getComputedStyle(this);
        let a = parseFloat(o.width), h = parseFloat(o.height);
        if ((!a || a === 0) && (a = r.width), (!h || h === 0) && (h = r.height), this.resizeStart = {
          x: i.clientX,
          y: i.clientY,
          width: a,
          height: h
        }, s)
          this.resizeHandle = s;
        else {
          let l = i.target;
          if (!l.classList.contains("resize-handle")) {
            const d = l.closest(".resize-handle");
            d && (l = d);
          }
          const c = Array.from(l.classList);
          this.resizeHandle = c.find((d) => d !== "resize-handle") || "";
        }
        document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp), this.dispatchEvent(new CustomEvent("resize-start", {
          detail: {
            width: this.resizeStart.width,
            height: this.resizeStart.height
          },
          bubbles: !0,
          composed: !0
        }));
      }, this.handleResizeMove = (i) => {
        if (!this.isResizing) return;
        const s = i.clientX - this.resizeStart.x, r = i.clientY - this.resizeStart.y;
        let o = this.resizeStart.width, a = this.resizeStart.height;
        switch (this.resizeHandle) {
          case "nw":
            o = this.resizeStart.width - s, a = this.resizeStart.height - r;
            break;
          case "ne":
            o = this.resizeStart.width + s, a = this.resizeStart.height - r;
            break;
          case "sw":
            o = this.resizeStart.width - s, a = this.resizeStart.height + r;
            break;
          case "se":
            o = this.resizeStart.width + s, a = this.resizeStart.height + r;
            break;
          case "n":
            a = this.resizeStart.height - r;
            break;
          case "s":
            a = this.resizeStart.height + r;
            break;
          case "w":
            o = this.resizeStart.width - s;
            break;
          case "e":
            o = this.resizeStart.width + s;
            break;
        }
        if (o = Math.max(this.minWidth, Math.min(this.maxWidth, o)), a = Math.max(this.minHeight, Math.min(this.maxHeight, a)), this.keepAspectRatio) {
          const h = this.resizeStart.width / this.resizeStart.height;
          this.resizeHandle.includes("w") || this.resizeHandle.includes("e") ? a = o / h : o = a * h;
        }
        this.style.width = `${o}px`, this.style.height = `${a}px`, this.dispatchEvent(new CustomEvent("resize", {
          detail: {
            width: o,
            height: a,
            handle: this.resizeHandle
          },
          bubbles: !0,
          composed: !0
        })), this.instance && this.instance.updateNode(this.id, {
          width: o,
          height: a,
          measured: { width: o, height: a }
        });
      }, this.handleResizeEnd = () => {
        this.isResizing && (this.isResizing = !1, this.dispatchEvent(new CustomEvent("resize-end", {
          detail: {
            width: this.offsetWidth,
            height: this.offsetHeight
          },
          bubbles: !0,
          composed: !0
        })), this.instance && this.instance.updateNode(this.id, {
          width: this.offsetWidth,
          height: this.offsetHeight,
          measured: { width: this.offsetWidth, height: this.offsetHeight }
        }));
      }, this.handleGlobalClick = (i) => {
        i.target.closest(this.tagName.toLowerCase()) !== null || this.selected && (this.selected = !1, this.instance && this.instance.updateNode(this.id, { selected: !1 }), this.dispatchEvent(new CustomEvent("node-deselect", {
          detail: {
            nodeId: this.id,
            selected: !1,
            node: {
              id: this.id,
              data: this.data,
              position: this.position,
              selected: !1
            }
          },
          bubbles: !0,
          composed: !0
        })));
      }, this.handleResizeHandleClick = (i) => (s) => {
        s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), this.handleResizeStart(s, i);
      };
    }
    static get styles() {
      return [U`
      :host {
        position: absolute;
        cursor: var(--node-cursor, grab);
        user-select: none;
        transform-origin: 0 0;
        will-change: transform;
        pointer-events: auto;
        border: var(--node-border, 1px solid #ddd);
        border-radius: var(--node-border-radius, 8px);
        background: var(--node-background, white);
        box-shadow: var(--node-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
        transition: var(--node-transition, box-shadow 0.2s);
      }

      :host(:hover) {
        box-shadow: var(--node-hover-shadow, 0 4px 6px rgba(0, 0, 0, 0.15));
      }

      :host([dragging]) {
        cursor: var(--node-dragging-cursor, grabbing);
        box-shadow: var(--node-dragging-shadow, 0 8px 16px rgba(0, 0, 0, 0.25));
      }

      :host([selected]) {
        border-color: var(--node-selected-border, #1a73e8);
        box-shadow: var(--node-selected-shadow, 0 0 0 2px rgba(26, 115, 232, 0.3));
      }

      /* Resizer styles - matching existing components */
      .resize-border {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: var(--resize-border-style, 1px dashed var(--node-selected-border, #1a73e8));
        border-radius: var(--node-border-radius, 8px);
        opacity: var(--resize-border-opacity, 0);
        pointer-events: none;
        transition: var(--resize-transition, opacity 0.2s ease);
      }

      :host([selected]) .resize-border {
        opacity: var(--resize-border-opacity-selected, 1);
      }

      .resize-handle {
        position: absolute;
        background: var(--resize-handle-background, var(--node-selected-border, #1a73e8));
        border: var(--resize-handle-border, 2px solid #fff);
        border-radius: var(--resize-handle-border-radius, 2px);
        width: var(--resize-handle-size, 12px);
        height: var(--resize-handle-size, 12px);
        opacity: var(--resize-handle-opacity, 0);
        transition: var(--resize-transition, opacity 0.2s ease);
        pointer-events: auto;
        box-shadow: var(--resize-handle-shadow, 0 2px 4px rgba(0, 0, 0, 0.2));
        z-index: 10;
      }

      .resize-handle:hover {
        opacity: var(--resize-handle-opacity-hover, 1);
      }

      :host([selected]) .resize-handle {
        opacity: var(--resize-handle-opacity-selected, 1);
      }

      .resize-handle.nw {
        top: var(--resize-handle-offset, -8px);
        left: var(--resize-handle-offset, -8px);
        cursor: nw-resize;
      }

      .resize-handle.ne {
        top: var(--resize-handle-offset, -8px);
        right: var(--resize-handle-offset, -8px);
        cursor: ne-resize;
      }

      .resize-handle.sw {
        bottom: var(--resize-handle-offset, -8px);
        left: var(--resize-handle-offset, -8px);
        cursor: sw-resize;
      }

      .resize-handle.se {
        bottom: var(--resize-handle-offset, -8px);
        right: var(--resize-handle-offset, -8px);
        cursor: se-resize;
      }

      .resize-handle.n {
        top: var(--resize-handle-offset, -8px);
        left: 50%;
        transform: translateX(-50%);
        cursor: n-resize;
      }

      .resize-handle.s {
        bottom: var(--resize-handle-offset, -8px);
        left: 50%;
        transform: translateX(-50%);
        cursor: s-resize;
      }

      .resize-handle.w {
        top: 50%;
        left: var(--resize-handle-offset, -8px);
        transform: translateY(-50%);
        cursor: w-resize;
      }

      .resize-handle.e {
        top: 50%;
        right: var(--resize-handle-offset, -8px);
        transform: translateY(-50%);
        cursor: e-resize;
      }
      `];
    }
    connectedCallback() {
      super.connectedCallback(), this.draggable && this.addEventListener("mousedown", this.handleMouseDown), this.addEventListener("click", this.handleClick), document.addEventListener("click", this.handleGlobalClick);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this.removeEventListener("mousedown", this.handleMouseDown), this.removeEventListener("click", this.handleClick), document.removeEventListener("click", this.handleGlobalClick), this.cleanup();
    }
    updated(i) {
      super.updated(i), this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
    cleanup() {
      document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp);
    }
    /**
     * Renders the resizer handles and border when the node is resizable and selected
     * Components using this mixin should call this method in their render() method
     */
    renderResizer() {
      return !this.resizable || !this.selected ? C`` : C`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick("nw")}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick("ne")}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick("sw")}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick("se")}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick("n")}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick("s")}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick("w")}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick("e")}></div>
      `;
    }
  }
  return Y([
    w({ type: String, reflect: !0 })
  ], e.prototype, "id"), Y([
    w({ type: Object })
  ], e.prototype, "position"), Y([
    w({ type: Object })
  ], e.prototype, "data"), Y([
    w({ type: Boolean, reflect: !0 })
  ], e.prototype, "selected"), Y([
    w({ type: Boolean, reflect: !0 })
  ], e.prototype, "dragging"), Y([
    w({ type: Object })
  ], e.prototype, "instance"), Y([
    w({ type: Boolean })
  ], e.prototype, "resizable"), Y([
    w({ type: Boolean })
  ], e.prototype, "draggable"), Y([
    w({ type: Boolean })
  ], e.prototype, "connectable"), Y([
    w({ type: Number })
  ], e.prototype, "minWidth"), Y([
    w({ type: Number })
  ], e.prototype, "maxWidth"), Y([
    w({ type: Number })
  ], e.prototype, "minHeight"), Y([
    w({ type: Number })
  ], e.prototype, "maxHeight"), Y([
    w({ type: Boolean })
  ], e.prototype, "keepAspectRatio"), e;
};
export {
  Je as BaseNode,
  nn as BaseNodeContent,
  sn as BaseNodeFooter,
  tn as BaseNodeHeader,
  en as BaseNodeHeaderTitle,
  ut as ERDTableNode,
  At as FlowBackground,
  Ct as FlowCanvas,
  ke as FlowControls,
  B as FlowEdge,
  Ya as FlowInstance,
  te as FlowMinimap,
  Q as FlowNode,
  el as NodeMixin,
  gt as NodeResizer,
  k as Position,
  J as ShapeNode,
  Me as ShapeRegistry,
  Wh as createStore,
  Qe as getBezierPath,
  Jh as getCenter,
  Qh as getDistance,
  si as getSmoothStepPath,
  bh as getStraightPath,
  tl as isPointInRect
};
