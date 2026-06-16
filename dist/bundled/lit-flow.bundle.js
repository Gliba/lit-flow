var rs = { value: () => {
} };
function li() {
  for (var t = 0, e = arguments.length, i = {}, n; t < e; ++t) {
    if (!(n = arguments[t] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new me(i);
}
function me(t) {
  this._ = t;
}
function os(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !e.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
me.prototype = li.prototype = {
  constructor: me,
  on: function(t, e) {
    var i = this._, n = os(t + "", i), s, r = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++r < o; ) if ((s = (t = n[r]).type) && (s = as(i[s], t.name))) return s;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < o; )
      if (s = (t = n[r]).type) i[s] = Si(i[s], t.name, e);
      else if (e == null) for (s in i) i[s] = Si(i[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e) t[i] = e[i].slice();
    return new me(t);
  },
  call: function(t, e) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), n = 0, s, r; n < s; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (r = this._[t], n = 0, s = r.length; n < s; ++n) r[n].value.apply(e, i);
  },
  apply: function(t, e, i) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var n = this._[t], s = 0, r = n.length; s < r; ++s) n[s].value.apply(e, i);
  }
};
function as(t, e) {
  for (var i = 0, n = t.length, s; i < n; ++i)
    if ((s = t[i]).name === e)
      return s.value;
}
function Si(t, e, i) {
  for (var n = 0, s = t.length; n < s; ++n)
    if (t[n].name === e) {
      t[n] = rs, t = t.slice(0, n).concat(t.slice(n + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var Ve = "http://www.w3.org/1999/xhtml";
const Ei = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ve,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Re(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), Ei.hasOwnProperty(e) ? { space: Ei[e], local: t } : t;
}
function hs(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === Ve && e.documentElement.namespaceURI === Ve ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function ls(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function un(t) {
  var e = Re(t);
  return (e.local ? ls : hs)(e);
}
function cs() {
}
function ci(t) {
  return t == null ? cs : function() {
    return this.querySelector(t);
  };
}
function ds(t) {
  typeof t != "function" && (t = ci(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = new Array(o), h, l, c = 0; c < o; ++c)
      (h = r[c]) && (l = t.call(h, h.__data__, c, r)) && ("__data__" in h && (l.__data__ = h.__data__), a[c] = l);
  return new K(n, this._parents);
}
function us(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function fs() {
  return [];
}
function fn(t) {
  return t == null ? fs : function() {
    return this.querySelectorAll(t);
  };
}
function ps(t) {
  return function() {
    return us(t.apply(this, arguments));
  };
}
function gs(t) {
  typeof t == "function" ? t = ps(t) : t = fn(t);
  for (var e = this._groups, i = e.length, n = [], s = [], r = 0; r < i; ++r)
    for (var o = e[r], a = o.length, h, l = 0; l < a; ++l)
      (h = o[l]) && (n.push(t.call(h, h.__data__, l, o)), s.push(h));
  return new K(n, s);
}
function pn(t) {
  return function() {
    return this.matches(t);
  };
}
function gn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var ms = Array.prototype.find;
function ys(t) {
  return function() {
    return ms.call(this.children, t);
  };
}
function vs() {
  return this.firstElementChild;
}
function ws(t) {
  return this.select(t == null ? vs : ys(typeof t == "function" ? t : gn(t)));
}
var bs = Array.prototype.filter;
function xs() {
  return Array.from(this.children);
}
function $s(t) {
  return function() {
    return bs.call(this.children, t);
  };
}
function _s(t) {
  return this.selectAll(t == null ? xs : $s(typeof t == "function" ? t : gn(t)));
}
function zs(t) {
  typeof t != "function" && (t = pn(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = [], h, l = 0; l < o; ++l)
      (h = r[l]) && t.call(h, h.__data__, l, r) && a.push(h);
  return new K(n, this._parents);
}
function mn(t) {
  return new Array(t.length);
}
function Ss() {
  return new K(this._enter || this._groups.map(mn), this._parents);
}
function $e(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
$e.prototype = {
  constructor: $e,
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
function Es(t) {
  return function() {
    return t;
  };
}
function ks(t, e, i, n, s, r) {
  for (var o = 0, a, h = e.length, l = r.length; o < l; ++o)
    (a = e[o]) ? (a.__data__ = r[o], n[o] = a) : i[o] = new $e(t, r[o]);
  for (; o < h; ++o)
    (a = e[o]) && (s[o] = a);
}
function Cs(t, e, i, n, s, r, o) {
  var a, h, l = /* @__PURE__ */ new Map(), c = e.length, d = r.length, u = new Array(c), p;
  for (a = 0; a < c; ++a)
    (h = e[a]) && (u[a] = p = o.call(h, h.__data__, a, e) + "", l.has(p) ? s[a] = h : l.set(p, h));
  for (a = 0; a < d; ++a)
    p = o.call(t, r[a], a, r) + "", (h = l.get(p)) ? (n[a] = h, h.__data__ = r[a], l.delete(p)) : i[a] = new $e(t, r[a]);
  for (a = 0; a < c; ++a)
    (h = e[a]) && l.get(u[a]) === h && (s[a] = h);
}
function Ms(t) {
  return t.__data__;
}
function Hs(t, e) {
  if (!arguments.length) return Array.from(this, Ms);
  var i = e ? Cs : ks, n = this._parents, s = this._groups;
  typeof t != "function" && (t = Es(t));
  for (var r = s.length, o = new Array(r), a = new Array(r), h = new Array(r), l = 0; l < r; ++l) {
    var c = n[l], d = s[l], u = d.length, p = As(t.call(c, c && c.__data__, l, n)), m = p.length, y = a[l] = new Array(m), _ = o[l] = new Array(m), w = h[l] = new Array(u);
    i(c, d, y, _, w, p, e);
    for (var $ = 0, E = 0, N, X; $ < m; ++$)
      if (N = y[$]) {
        for ($ >= E && (E = $ + 1); !(X = _[E]) && ++E < m; ) ;
        N._next = X || null;
      }
  }
  return o = new K(o, n), o._enter = a, o._exit = h, o;
}
function As(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ns() {
  return new K(this._exit || this._groups.map(mn), this._parents);
}
function Rs(t, e, i) {
  var n = this.enter(), s = this, r = this.exit();
  return typeof t == "function" ? (n = t(n), n && (n = n.selection())) : n = n.append(t + ""), e != null && (s = e(s), s && (s = s.selection())), i == null ? r.remove() : i(r), n && s ? n.merge(s).order() : s;
}
function Ps(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, n = e._groups, s = i.length, r = n.length, o = Math.min(s, r), a = new Array(s), h = 0; h < o; ++h)
    for (var l = i[h], c = n[h], d = l.length, u = a[h] = new Array(d), p, m = 0; m < d; ++m)
      (p = l[m] || c[m]) && (u[m] = p);
  for (; h < s; ++h)
    a[h] = i[h];
  return new K(a, this._parents);
}
function Ts() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var n = t[e], s = n.length - 1, r = n[s], o; --s >= 0; )
      (o = n[s]) && (r && o.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(o, r), r = o);
  return this;
}
function Ls(t) {
  t || (t = Ds);
  function e(d, u) {
    return d && u ? t(d.__data__, u.__data__) : !d - !u;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), r = 0; r < n; ++r) {
    for (var o = i[r], a = o.length, h = s[r] = new Array(a), l, c = 0; c < a; ++c)
      (l = o[c]) && (h[c] = l);
    h.sort(e);
  }
  return new K(s, this._parents).order();
}
function Ds(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Os() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Is() {
  return Array.from(this);
}
function Bs() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var n = t[e], s = 0, r = n.length; s < r; ++s) {
      var o = n[s];
      if (o) return o;
    }
  return null;
}
function Fs() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Us() {
  return !this.node();
}
function Xs(t) {
  for (var e = this._groups, i = 0, n = e.length; i < n; ++i)
    for (var s = e[i], r = 0, o = s.length, a; r < o; ++r)
      (a = s[r]) && t.call(a, a.__data__, r, s);
  return this;
}
function Ys(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ws(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Zs(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function qs(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Vs(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function js(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function Gs(t, e) {
  var i = Re(t);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((e == null ? i.local ? Ws : Ys : typeof e == "function" ? i.local ? js : Vs : i.local ? qs : Zs)(i, e));
}
function yn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ks(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Qs(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function Js(t, e, i) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.style.removeProperty(t) : this.style.setProperty(t, n, i);
  };
}
function tr(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? Ks : typeof e == "function" ? Js : Qs)(t, e, i ?? "")) : Dt(this.node(), t);
}
function Dt(t, e) {
  return t.style.getPropertyValue(e) || yn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function er(t) {
  return function() {
    delete this[t];
  };
}
function ir(t, e) {
  return function() {
    this[t] = e;
  };
}
function nr(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function sr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? er : typeof e == "function" ? nr : ir)(t, e)) : this.node()[t];
}
function vn(t) {
  return t.trim().split(/^|\s+/);
}
function di(t) {
  return t.classList || new wn(t);
}
function wn(t) {
  this._node = t, this._names = vn(t.getAttribute("class") || "");
}
wn.prototype = {
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
function bn(t, e) {
  for (var i = di(t), n = -1, s = e.length; ++n < s; ) i.add(e[n]);
}
function xn(t, e) {
  for (var i = di(t), n = -1, s = e.length; ++n < s; ) i.remove(e[n]);
}
function rr(t) {
  return function() {
    bn(this, t);
  };
}
function or(t) {
  return function() {
    xn(this, t);
  };
}
function ar(t, e) {
  return function() {
    (e.apply(this, arguments) ? bn : xn)(this, t);
  };
}
function hr(t, e) {
  var i = vn(t + "");
  if (arguments.length < 2) {
    for (var n = di(this.node()), s = -1, r = i.length; ++s < r; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ar : e ? rr : or)(i, e));
}
function lr() {
  this.textContent = "";
}
function cr(t) {
  return function() {
    this.textContent = t;
  };
}
function dr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ur(t) {
  return arguments.length ? this.each(t == null ? lr : (typeof t == "function" ? dr : cr)(t)) : this.node().textContent;
}
function fr() {
  this.innerHTML = "";
}
function pr(t) {
  return function() {
    this.innerHTML = t;
  };
}
function gr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function mr(t) {
  return arguments.length ? this.each(t == null ? fr : (typeof t == "function" ? gr : pr)(t)) : this.node().innerHTML;
}
function yr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function vr() {
  return this.each(yr);
}
function wr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function br() {
  return this.each(wr);
}
function xr(t) {
  var e = typeof t == "function" ? t : un(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function $r() {
  return null;
}
function _r(t, e) {
  var i = typeof t == "function" ? t : un(t), n = e == null ? $r : typeof e == "function" ? e : ci(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function zr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Sr() {
  return this.each(zr);
}
function Er() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function kr() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Cr(t) {
  return this.select(t ? kr : Er);
}
function Mr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Hr(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ar(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", n = e.indexOf(".");
    return n >= 0 && (i = e.slice(n + 1), e = e.slice(0, n)), { type: e, name: i };
  });
}
function Nr(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, n = -1, s = e.length, r; i < s; ++i)
        r = e[i], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++n] = r;
      ++n ? e.length = n : delete this.__on;
    }
  };
}
function Rr(t, e, i) {
  return function() {
    var n = this.__on, s, r = Hr(e);
    if (n) {
      for (var o = 0, a = n.length; o < a; ++o)
        if ((s = n[o]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = r, s.options = i), s.value = e;
          return;
        }
    }
    this.addEventListener(t.type, r, i), s = { type: t.type, name: t.name, value: e, listener: r, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function Pr(t, e, i) {
  var n = Ar(t + ""), s, r = n.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var h = 0, l = a.length, c; h < l; ++h)
        for (s = 0, c = a[h]; s < r; ++s)
          if ((o = n[s]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = e ? Rr : Nr, s = 0; s < r; ++s) this.each(a(n[s], e, i));
  return this;
}
function $n(t, e, i) {
  var n = yn(t), s = n.CustomEvent;
  typeof s == "function" ? s = new s(e, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(e, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(e, !1, !1)), t.dispatchEvent(s);
}
function Tr(t, e) {
  return function() {
    return $n(this, t, e);
  };
}
function Lr(t, e) {
  return function() {
    return $n(this, t, e.apply(this, arguments));
  };
}
function Dr(t, e) {
  return this.each((typeof e == "function" ? Lr : Tr)(t, e));
}
function* Or() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var n = t[e], s = 0, r = n.length, o; s < r; ++s)
      (o = n[s]) && (yield o);
}
var _n = [null];
function K(t, e) {
  this._groups = t, this._parents = e;
}
function oe() {
  return new K([[document.documentElement]], _n);
}
function Ir() {
  return this;
}
K.prototype = oe.prototype = {
  constructor: K,
  select: ds,
  selectAll: gs,
  selectChild: ws,
  selectChildren: _s,
  filter: zs,
  data: Hs,
  enter: Ss,
  exit: Ns,
  join: Rs,
  merge: Ps,
  selection: Ir,
  order: Ts,
  sort: Ls,
  call: Os,
  nodes: Is,
  node: Bs,
  size: Fs,
  empty: Us,
  each: Xs,
  attr: Gs,
  style: tr,
  property: sr,
  classed: hr,
  text: ur,
  html: mr,
  raise: vr,
  lower: br,
  append: xr,
  insert: _r,
  remove: Sr,
  clone: Cr,
  datum: Mr,
  on: Pr,
  dispatch: Dr,
  [Symbol.iterator]: Or
};
function bt(t) {
  return typeof t == "string" ? new K([[document.querySelector(t)]], [document.documentElement]) : new K([[t]], _n);
}
function Br(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function wt(t, e) {
  if (t = Br(t), e === void 0 && (e = t.currentTarget), e) {
    var i = e.ownerSVGElement || e;
    if (i.createSVGPoint) {
      var n = i.createSVGPoint();
      return n.x = t.clientX, n.y = t.clientY, n = n.matrixTransform(e.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (e.getBoundingClientRect) {
      var s = e.getBoundingClientRect();
      return [t.clientX - s.left - e.clientLeft, t.clientY - s.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const je = { capture: !0, passive: !1 };
function Ge(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Fr(t) {
  var e = t.document.documentElement, i = bt(t).on("dragstart.drag", Ge, je);
  "onselectstart" in e ? i.on("selectstart.drag", Ge, je) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Ur(t, e) {
  var i = t.document.documentElement, n = bt(t).on("dragstart.drag", null);
  e && (n.on("click.drag", Ge, je), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function ui(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function zn(t, e) {
  var i = Object.create(t.prototype);
  for (var n in e) i[n] = e[n];
  return i;
}
function ae() {
}
var Jt = 0.7, _e = 1 / Jt, Lt = "\\s*([+-]?\\d+)\\s*", te = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ht = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Xr = /^#([0-9a-f]{3,8})$/, Yr = new RegExp(`^rgb\\(${Lt},${Lt},${Lt}\\)$`), Wr = new RegExp(`^rgb\\(${ht},${ht},${ht}\\)$`), Zr = new RegExp(`^rgba\\(${Lt},${Lt},${Lt},${te}\\)$`), qr = new RegExp(`^rgba\\(${ht},${ht},${ht},${te}\\)$`), Vr = new RegExp(`^hsl\\(${te},${ht},${ht}\\)$`), jr = new RegExp(`^hsla\\(${te},${ht},${ht},${te}\\)$`), ki = {
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
ui(ae, Ct, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ci,
  // Deprecated! Use color.formatHex.
  formatHex: Ci,
  formatHex8: Gr,
  formatHsl: Kr,
  formatRgb: Mi,
  toString: Mi
});
function Ci() {
  return this.rgb().formatHex();
}
function Gr() {
  return this.rgb().formatHex8();
}
function Kr() {
  return Sn(this).formatHsl();
}
function Mi() {
  return this.rgb().formatRgb();
}
function Ct(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = Xr.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? Hi(e) : i === 3 ? new Z(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? ce(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? ce(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Yr.exec(t)) ? new Z(e[1], e[2], e[3], 1) : (e = Wr.exec(t)) ? new Z(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Zr.exec(t)) ? ce(e[1], e[2], e[3], e[4]) : (e = qr.exec(t)) ? ce(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Vr.exec(t)) ? Ri(e[1], e[2] / 100, e[3] / 100, 1) : (e = jr.exec(t)) ? Ri(e[1], e[2] / 100, e[3] / 100, e[4]) : ki.hasOwnProperty(t) ? Hi(ki[t]) : t === "transparent" ? new Z(NaN, NaN, NaN, 0) : null;
}
function Hi(t) {
  return new Z(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ce(t, e, i, n) {
  return n <= 0 && (t = e = i = NaN), new Z(t, e, i, n);
}
function Qr(t) {
  return t instanceof ae || (t = Ct(t)), t ? (t = t.rgb(), new Z(t.r, t.g, t.b, t.opacity)) : new Z();
}
function Ke(t, e, i, n) {
  return arguments.length === 1 ? Qr(t) : new Z(t, e, i, n ?? 1);
}
function Z(t, e, i, n) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +n;
}
ui(Z, Ke, zn(ae, {
  brighter(t) {
    return t = t == null ? _e : Math.pow(_e, t), new Z(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Jt : Math.pow(Jt, t), new Z(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Z(kt(this.r), kt(this.g), kt(this.b), ze(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ai,
  // Deprecated! Use color.formatHex.
  formatHex: Ai,
  formatHex8: Jr,
  formatRgb: Ni,
  toString: Ni
}));
function Ai() {
  return `#${St(this.r)}${St(this.g)}${St(this.b)}`;
}
function Jr() {
  return `#${St(this.r)}${St(this.g)}${St(this.b)}${St((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ni() {
  const t = ze(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${kt(this.r)}, ${kt(this.g)}, ${kt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ze(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function kt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function St(t) {
  return t = kt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Ri(t, e, i, n) {
  return n <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new st(t, e, i, n);
}
function Sn(t) {
  if (t instanceof st) return new st(t.h, t.s, t.l, t.opacity);
  if (t instanceof ae || (t = Ct(t)), !t) return new st();
  if (t instanceof st) return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, n = t.b / 255, s = Math.min(e, i, n), r = Math.max(e, i, n), o = NaN, a = r - s, h = (r + s) / 2;
  return a ? (e === r ? o = (i - n) / a + (i < n) * 6 : i === r ? o = (n - e) / a + 2 : o = (e - i) / a + 4, a /= h < 0.5 ? r + s : 2 - r - s, o *= 60) : a = h > 0 && h < 1 ? 0 : o, new st(o, a, h, t.opacity);
}
function to(t, e, i, n) {
  return arguments.length === 1 ? Sn(t) : new st(t, e, i, n ?? 1);
}
function st(t, e, i, n) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +n;
}
ui(st, to, zn(ae, {
  brighter(t) {
    return t = t == null ? _e : Math.pow(_e, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Jt : Math.pow(Jt, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * e, s = 2 * i - n;
    return new Z(
      Be(t >= 240 ? t - 240 : t + 120, s, n),
      Be(t, s, n),
      Be(t < 120 ? t + 240 : t - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new st(Pi(this.h), de(this.s), de(this.l), ze(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ze(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Pi(this.h)}, ${de(this.s) * 100}%, ${de(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Pi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function de(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Be(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const fi = (t) => () => t;
function eo(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function io(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(n) {
    return Math.pow(t + n * e, i);
  };
}
function no(t) {
  return (t = +t) == 1 ? En : function(e, i) {
    return i - e ? io(e, i, t) : fi(isNaN(e) ? i : e);
  };
}
function En(t, e) {
  var i = e - t;
  return i ? eo(t, i) : fi(isNaN(t) ? e : t);
}
const Se = (function t(e) {
  var i = no(e);
  function n(s, r) {
    var o = i((s = Ke(s)).r, (r = Ke(r)).r), a = i(s.g, r.g), h = i(s.b, r.b), l = En(s.opacity, r.opacity);
    return function(c) {
      return s.r = o(c), s.g = a(c), s.b = h(c), s.opacity = l(c), s + "";
    };
  }
  return n.gamma = t, n;
})(1);
function so(t, e) {
  e || (e = []);
  var i = t ? Math.min(e.length, t.length) : 0, n = e.slice(), s;
  return function(r) {
    for (s = 0; s < i; ++s) n[s] = t[s] * (1 - r) + e[s] * r;
    return n;
  };
}
function ro(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function oo(t, e) {
  var i = e ? e.length : 0, n = t ? Math.min(i, t.length) : 0, s = new Array(n), r = new Array(i), o;
  for (o = 0; o < n; ++o) s[o] = Gt(t[o], e[o]);
  for (; o < i; ++o) r[o] = e[o];
  return function(a) {
    for (o = 0; o < n; ++o) r[o] = s[o](a);
    return r;
  };
}
function ao(t, e) {
  var i = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(n) {
    return i.setTime(t * (1 - n) + e * n), i;
  };
}
function at(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
function ho(t, e) {
  var i = {}, n = {}, s;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (s in e)
    s in t ? i[s] = Gt(t[s], e[s]) : n[s] = e[s];
  return function(r) {
    for (s in i) n[s] = i[s](r);
    return n;
  };
}
var Qe = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Fe = new RegExp(Qe.source, "g");
function lo(t) {
  return function() {
    return t;
  };
}
function co(t) {
  return function(e) {
    return t(e) + "";
  };
}
function kn(t, e) {
  var i = Qe.lastIndex = Fe.lastIndex = 0, n, s, r, o = -1, a = [], h = [];
  for (t = t + "", e = e + ""; (n = Qe.exec(t)) && (s = Fe.exec(e)); )
    (r = s.index) > i && (r = e.slice(i, r), a[o] ? a[o] += r : a[++o] = r), (n = n[0]) === (s = s[0]) ? a[o] ? a[o] += s : a[++o] = s : (a[++o] = null, h.push({ i: o, x: at(n, s) })), i = Fe.lastIndex;
  return i < e.length && (r = e.slice(i), a[o] ? a[o] += r : a[++o] = r), a.length < 2 ? h[0] ? co(h[0].x) : lo(e) : (e = h.length, function(l) {
    for (var c = 0, d; c < e; ++c) a[(d = h[c]).i] = d.x(l);
    return a.join("");
  });
}
function Gt(t, e) {
  var i = typeof e, n;
  return e == null || i === "boolean" ? fi(e) : (i === "number" ? at : i === "string" ? (n = Ct(e)) ? (e = n, Se) : kn : e instanceof Ct ? Se : e instanceof Date ? ao : ro(e) ? so : Array.isArray(e) ? oo : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? ho : at)(t, e);
}
var Ti = 180 / Math.PI, Je = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Cn(t, e, i, n, s, r) {
  var o, a, h;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (h = t * i + e * n) && (i -= t * h, n -= e * h), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, h /= a), t * n < e * i && (t = -t, e = -e, h = -h, o = -o), {
    translateX: s,
    translateY: r,
    rotate: Math.atan2(e, t) * Ti,
    skewX: Math.atan(h) * Ti,
    scaleX: o,
    scaleY: a
  };
}
var ue;
function uo(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Je : Cn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function fo(t) {
  return t == null || (ue || (ue = document.createElementNS("http://www.w3.org/2000/svg", "g")), ue.setAttribute("transform", t), !(t = ue.transform.baseVal.consolidate())) ? Je : (t = t.matrix, Cn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Mn(t, e, i, n) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function r(l, c, d, u, p, m) {
    if (l !== d || c !== u) {
      var y = p.push("translate(", null, e, null, i);
      m.push({ i: y - 4, x: at(l, d) }, { i: y - 2, x: at(c, u) });
    } else (d || u) && p.push("translate(" + d + e + u + i);
  }
  function o(l, c, d, u) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), u.push({ i: d.push(s(d) + "rotate(", null, n) - 2, x: at(l, c) })) : c && d.push(s(d) + "rotate(" + c + n);
  }
  function a(l, c, d, u) {
    l !== c ? u.push({ i: d.push(s(d) + "skewX(", null, n) - 2, x: at(l, c) }) : c && d.push(s(d) + "skewX(" + c + n);
  }
  function h(l, c, d, u, p, m) {
    if (l !== d || c !== u) {
      var y = p.push(s(p) + "scale(", null, ",", null, ")");
      m.push({ i: y - 4, x: at(l, d) }, { i: y - 2, x: at(c, u) });
    } else (d !== 1 || u !== 1) && p.push(s(p) + "scale(" + d + "," + u + ")");
  }
  return function(l, c) {
    var d = [], u = [];
    return l = t(l), c = t(c), r(l.translateX, l.translateY, c.translateX, c.translateY, d, u), o(l.rotate, c.rotate, d, u), a(l.skewX, c.skewX, d, u), h(l.scaleX, l.scaleY, c.scaleX, c.scaleY, d, u), l = c = null, function(p) {
      for (var m = -1, y = u.length, _; ++m < y; ) d[(_ = u[m]).i] = _.x(p);
      return d.join("");
    };
  };
}
var po = Mn(uo, "px, ", "px)", "deg)"), go = Mn(fo, ", ", ")", ")"), mo = 1e-12;
function Li(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function yo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function vo(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const ye = (function t(e, i, n) {
  function s(r, o) {
    var a = r[0], h = r[1], l = r[2], c = o[0], d = o[1], u = o[2], p = c - a, m = d - h, y = p * p + m * m, _, w;
    if (y < mo)
      w = Math.log(u / l) / e, _ = function(P) {
        return [
          a + P * p,
          h + P * m,
          l * Math.exp(e * P * w)
        ];
      };
    else {
      var $ = Math.sqrt(y), E = (u * u - l * l + n * y) / (2 * l * i * $), N = (u * u - l * l - n * y) / (2 * u * i * $), X = Math.log(Math.sqrt(E * E + 1) - E), L = Math.log(Math.sqrt(N * N + 1) - N);
      w = (L - X) / e, _ = function(P) {
        var Q = P * w, it = Li(X), vt = l / (i * $) * (it * vo(e * Q + X) - yo(X));
        return [
          a + vt * p,
          h + vt * m,
          l * it / Li(e * Q + X)
        ];
      };
    }
    return _.duration = w * 1e3 * e / Math.SQRT2, _;
  }
  return s.rho = function(r) {
    var o = Math.max(1e-3, +r), a = o * o, h = a * a;
    return t(o, a, h);
  }, s;
})(Math.SQRT2, 2, 4);
var Ot = 0, Vt = 0, Xt = 0, Hn = 1e3, Ee, jt, ke = 0, Mt = 0, Pe = 0, ee = typeof performance == "object" && performance.now ? performance : Date, An = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function pi() {
  return Mt || (An(wo), Mt = ee.now() + Pe);
}
function wo() {
  Mt = 0;
}
function Ce() {
  this._call = this._time = this._next = null;
}
Ce.prototype = Nn.prototype = {
  constructor: Ce,
  restart: function(t, e, i) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    i = (i == null ? pi() : +i) + (e == null ? 0 : +e), !this._next && jt !== this && (jt ? jt._next = this : Ee = this, jt = this), this._call = t, this._time = i, ti();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ti());
  }
};
function Nn(t, e, i) {
  var n = new Ce();
  return n.restart(t, e, i), n;
}
function bo() {
  pi(), ++Ot;
  for (var t = Ee, e; t; )
    (e = Mt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ot;
}
function Di() {
  Mt = (ke = ee.now()) + Pe, Ot = Vt = 0;
  try {
    bo();
  } finally {
    Ot = 0, $o(), Mt = 0;
  }
}
function xo() {
  var t = ee.now(), e = t - ke;
  e > Hn && (Pe -= e, ke = t);
}
function $o() {
  for (var t, e = Ee, i, n = 1 / 0; e; )
    e._call ? (n > e._time && (n = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : Ee = i);
  jt = t, ti(n);
}
function ti(t) {
  if (!Ot) {
    Vt && (Vt = clearTimeout(Vt));
    var e = t - Mt;
    e > 24 ? (t < 1 / 0 && (Vt = setTimeout(Di, t - ee.now() - Pe)), Xt && (Xt = clearInterval(Xt))) : (Xt || (ke = ee.now(), Xt = setInterval(xo, Hn)), Ot = 1, An(Di));
  }
}
function Oi(t, e, i) {
  var n = new Ce();
  return e = e == null ? 0 : +e, n.restart((s) => {
    n.stop(), t(s + e);
  }, e, i), n;
}
var _o = li("start", "end", "cancel", "interrupt"), zo = [], Rn = 0, Ii = 1, ei = 2, ve = 3, Bi = 4, ii = 5, we = 6;
function Te(t, e, i, n, s, r) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (i in o) return;
  So(t, i, {
    name: e,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: _o,
    tween: zo,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: Rn
  });
}
function gi(t, e) {
  var i = rt(t, e);
  if (i.state > Rn) throw new Error("too late; already scheduled");
  return i;
}
function lt(t, e) {
  var i = rt(t, e);
  if (i.state > ve) throw new Error("too late; already running");
  return i;
}
function rt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e])) throw new Error("transition not found");
  return i;
}
function So(t, e, i) {
  var n = t.__transition, s;
  n[e] = i, i.timer = Nn(r, 0, i.time);
  function r(l) {
    i.state = Ii, i.timer.restart(o, i.delay, i.time), i.delay <= l && o(l - i.delay);
  }
  function o(l) {
    var c, d, u, p;
    if (i.state !== Ii) return h();
    for (c in n)
      if (p = n[c], p.name === i.name) {
        if (p.state === ve) return Oi(o);
        p.state === Bi ? (p.state = we, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete n[c]) : +c < e && (p.state = we, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete n[c]);
      }
    if (Oi(function() {
      i.state === ve && (i.state = Bi, i.timer.restart(a, i.delay, i.time), a(l));
    }), i.state = ei, i.on.call("start", t, t.__data__, i.index, i.group), i.state === ei) {
      for (i.state = ve, s = new Array(u = i.tween.length), c = 0, d = -1; c < u; ++c)
        (p = i.tween[c].value.call(t, t.__data__, i.index, i.group)) && (s[++d] = p);
      s.length = d + 1;
    }
  }
  function a(l) {
    for (var c = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(h), i.state = ii, 1), d = -1, u = s.length; ++d < u; )
      s[d].call(t, c);
    i.state === ii && (i.on.call("end", t, t.__data__, i.index, i.group), h());
  }
  function h() {
    i.state = we, i.timer.stop(), delete n[e];
    for (var l in n) return;
    delete t.__transition;
  }
}
function be(t, e) {
  var i = t.__transition, n, s, r = !0, o;
  if (i) {
    e = e == null ? null : e + "";
    for (o in i) {
      if ((n = i[o]).name !== e) {
        r = !1;
        continue;
      }
      s = n.state > ei && n.state < ii, n.state = we, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", t, t.__data__, n.index, n.group), delete i[o];
    }
    r && delete t.__transition;
  }
}
function Eo(t) {
  return this.each(function() {
    be(this, t);
  });
}
function ko(t, e) {
  var i, n;
  return function() {
    var s = lt(this, t), r = s.tween;
    if (r !== i) {
      n = i = r;
      for (var o = 0, a = n.length; o < a; ++o)
        if (n[o].name === e) {
          n = n.slice(), n.splice(o, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function Co(t, e, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var r = lt(this, t), o = r.tween;
    if (o !== n) {
      s = (n = o).slice();
      for (var a = { name: e, value: i }, h = 0, l = s.length; h < l; ++h)
        if (s[h].name === e) {
          s[h] = a;
          break;
        }
      h === l && s.push(a);
    }
    r.tween = s;
  };
}
function Mo(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var n = rt(this.node(), i).tween, s = 0, r = n.length, o; s < r; ++s)
      if ((o = n[s]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? ko : Co)(i, t, e));
}
function mi(t, e, i) {
  var n = t._id;
  return t.each(function() {
    var s = lt(this, n);
    (s.value || (s.value = {}))[e] = i.apply(this, arguments);
  }), function(s) {
    return rt(s, n).value[e];
  };
}
function Pn(t, e) {
  var i;
  return (typeof e == "number" ? at : e instanceof Ct ? Se : (i = Ct(e)) ? (e = i, Se) : kn)(t, e);
}
function Ho(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ao(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function No(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = this.getAttribute(t);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function Ro(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function Po(t, e, i) {
  var n, s, r;
  return function() {
    var o, a = i(this), h;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), h = a + "", o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a)));
  };
}
function To(t, e, i) {
  var n, s, r;
  return function() {
    var o, a = i(this), h;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), h = a + "", o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a)));
  };
}
function Lo(t, e) {
  var i = Re(t), n = i === "transform" ? go : Pn;
  return this.attrTween(t, typeof e == "function" ? (i.local ? To : Po)(i, n, mi(this, "attr." + t, e)) : e == null ? (i.local ? Ao : Ho)(i) : (i.local ? Ro : No)(i, n, e));
}
function Do(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function Oo(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function Io(t, e) {
  var i, n;
  function s() {
    var r = e.apply(this, arguments);
    return r !== n && (i = (n = r) && Oo(t, r)), i;
  }
  return s._value = e, s;
}
function Bo(t, e) {
  var i, n;
  function s() {
    var r = e.apply(this, arguments);
    return r !== n && (i = (n = r) && Do(t, r)), i;
  }
  return s._value = e, s;
}
function Fo(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  var n = Re(t);
  return this.tween(i, (n.local ? Io : Bo)(n, e));
}
function Uo(t, e) {
  return function() {
    gi(this, t).delay = +e.apply(this, arguments);
  };
}
function Xo(t, e) {
  return e = +e, function() {
    gi(this, t).delay = e;
  };
}
function Yo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Uo : Xo)(e, t)) : rt(this.node(), e).delay;
}
function Wo(t, e) {
  return function() {
    lt(this, t).duration = +e.apply(this, arguments);
  };
}
function Zo(t, e) {
  return e = +e, function() {
    lt(this, t).duration = e;
  };
}
function qo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Wo : Zo)(e, t)) : rt(this.node(), e).duration;
}
function Vo(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    lt(this, t).ease = e;
  };
}
function jo(t) {
  var e = this._id;
  return arguments.length ? this.each(Vo(e, t)) : rt(this.node(), e).ease;
}
function Go(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    lt(this, t).ease = i;
  };
}
function Ko(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Go(this._id, t));
}
function Qo(t) {
  typeof t != "function" && (t = pn(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = [], h, l = 0; l < o; ++l)
      (h = r[l]) && t.call(h, h.__data__, l, r) && a.push(h);
  return new pt(n, this._parents, this._name, this._id);
}
function Jo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, i = t._groups, n = e.length, s = i.length, r = Math.min(n, s), o = new Array(n), a = 0; a < r; ++a)
    for (var h = e[a], l = i[a], c = h.length, d = o[a] = new Array(c), u, p = 0; p < c; ++p)
      (u = h[p] || l[p]) && (d[p] = u);
  for (; a < n; ++a)
    o[a] = e[a];
  return new pt(o, this._parents, this._name, this._id);
}
function ta(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function ea(t, e, i) {
  var n, s, r = ta(e) ? gi : lt;
  return function() {
    var o = r(this, t), a = o.on;
    a !== n && (s = (n = a).copy()).on(e, i), o.on = s;
  };
}
function ia(t, e) {
  var i = this._id;
  return arguments.length < 2 ? rt(this.node(), i).on.on(t) : this.each(ea(i, t, e));
}
function na(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition) if (+i !== t) return;
    e && e.removeChild(this);
  };
}
function sa() {
  return this.on("end.remove", na(this._id));
}
function ra(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = ci(t));
  for (var n = this._groups, s = n.length, r = new Array(s), o = 0; o < s; ++o)
    for (var a = n[o], h = a.length, l = r[o] = new Array(h), c, d, u = 0; u < h; ++u)
      (c = a[u]) && (d = t.call(c, c.__data__, u, a)) && ("__data__" in c && (d.__data__ = c.__data__), l[u] = d, Te(l[u], e, i, u, l, rt(c, i)));
  return new pt(r, this._parents, e, i);
}
function oa(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = fn(t));
  for (var n = this._groups, s = n.length, r = [], o = [], a = 0; a < s; ++a)
    for (var h = n[a], l = h.length, c, d = 0; d < l; ++d)
      if (c = h[d]) {
        for (var u = t.call(c, c.__data__, d, h), p, m = rt(c, i), y = 0, _ = u.length; y < _; ++y)
          (p = u[y]) && Te(p, e, i, y, u, m);
        r.push(u), o.push(c);
      }
  return new pt(r, o, e, i);
}
var aa = oe.prototype.constructor;
function ha() {
  return new aa(this._groups, this._parents);
}
function la(t, e) {
  var i, n, s;
  return function() {
    var r = Dt(this, t), o = (this.style.removeProperty(t), Dt(this, t));
    return r === o ? null : r === i && o === n ? s : s = e(i = r, n = o);
  };
}
function Tn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ca(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = Dt(this, t);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function da(t, e, i) {
  var n, s, r;
  return function() {
    var o = Dt(this, t), a = i(this), h = a + "";
    return a == null && (h = a = (this.style.removeProperty(t), Dt(this, t))), o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a));
  };
}
function ua(t, e) {
  var i, n, s, r = "style." + e, o = "end." + r, a;
  return function() {
    var h = lt(this, t), l = h.on, c = h.value[r] == null ? a || (a = Tn(e)) : void 0;
    (l !== i || s !== c) && (n = (i = l).copy()).on(o, s = c), h.on = n;
  };
}
function fa(t, e, i) {
  var n = (t += "") == "transform" ? po : Pn;
  return e == null ? this.styleTween(t, la(t, n)).on("end.style." + t, Tn(t)) : typeof e == "function" ? this.styleTween(t, da(t, n, mi(this, "style." + t, e))).each(ua(this._id, t)) : this.styleTween(t, ca(t, n, e), i).on("end.style." + t, null);
}
function pa(t, e, i) {
  return function(n) {
    this.style.setProperty(t, e.call(this, n), i);
  };
}
function ga(t, e, i) {
  var n, s;
  function r() {
    var o = e.apply(this, arguments);
    return o !== s && (n = (s = o) && pa(t, o, i)), n;
  }
  return r._value = e, r;
}
function ma(t, e, i) {
  var n = "style." + (t += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  return this.tween(n, ga(t, e, i ?? ""));
}
function ya(t) {
  return function() {
    this.textContent = t;
  };
}
function va(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function wa(t) {
  return this.tween("text", typeof t == "function" ? va(mi(this, "text", t)) : ya(t == null ? "" : t + ""));
}
function ba(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function xa(t) {
  var e, i;
  function n() {
    var s = t.apply(this, arguments);
    return s !== i && (e = (i = s) && ba(s)), e;
  }
  return n._value = t, n;
}
function $a(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, xa(t));
}
function _a() {
  for (var t = this._name, e = this._id, i = Ln(), n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var o = n[r], a = o.length, h, l = 0; l < a; ++l)
      if (h = o[l]) {
        var c = rt(h, e);
        Te(h, t, i, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new pt(n, this._parents, t, i);
}
function za() {
  var t, e, i = this, n = i._id, s = i.size();
  return new Promise(function(r, o) {
    var a = { value: o }, h = { value: function() {
      --s === 0 && r();
    } };
    i.each(function() {
      var l = lt(this, n), c = l.on;
      c !== t && (e = (t = c).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(h)), l.on = e;
    }), s === 0 && r();
  });
}
var Sa = 0;
function pt(t, e, i, n) {
  this._groups = t, this._parents = e, this._name = i, this._id = n;
}
function Ln() {
  return ++Sa;
}
var dt = oe.prototype;
pt.prototype = {
  constructor: pt,
  select: ra,
  selectAll: oa,
  selectChild: dt.selectChild,
  selectChildren: dt.selectChildren,
  filter: Qo,
  merge: Jo,
  selection: ha,
  transition: _a,
  call: dt.call,
  nodes: dt.nodes,
  node: dt.node,
  size: dt.size,
  empty: dt.empty,
  each: dt.each,
  on: ia,
  attr: Lo,
  attrTween: Fo,
  style: fa,
  styleTween: ma,
  text: wa,
  textTween: $a,
  remove: sa,
  tween: Mo,
  delay: Yo,
  duration: qo,
  ease: jo,
  easeVarying: Ko,
  end: za,
  [Symbol.iterator]: dt[Symbol.iterator]
};
function Ea(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ka = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ea
};
function Ca(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function Ma(t) {
  var e, i;
  t instanceof pt ? (e = t._id, t = t._name) : (e = Ln(), (i = ka).time = pi(), t = t == null ? null : t + "");
  for (var n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var o = n[r], a = o.length, h, l = 0; l < a; ++l)
      (h = o[l]) && Te(h, t, e, l, o, i || Ca(h, e));
  return new pt(n, this._parents, t, e);
}
oe.prototype.interrupt = Eo;
oe.prototype.transition = Ma;
const fe = (t) => () => t;
function Ha(t, {
  sourceEvent: e,
  target: i,
  transform: n,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function ft(t, e, i) {
  this.k = t, this.x = e, this.y = i;
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
var Le = new ft(1, 0, 0);
Dn.prototype = ft.prototype;
function Dn(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Le;
  return t.__zoom;
}
function Ue(t) {
  t.stopImmediatePropagation();
}
function Yt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Aa(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Na() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Fi() {
  return this.__zoom || Le;
}
function Ra(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Pa() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ta(t, e, i) {
  var n = t.invertX(e[0][0]) - i[0][0], s = t.invertX(e[1][0]) - i[1][0], r = t.invertY(e[0][1]) - i[0][1], o = t.invertY(e[1][1]) - i[1][1];
  return t.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o)
  );
}
function La() {
  var t = Aa, e = Na, i = Ta, n = Ra, s = Pa, r = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, h = ye, l = li("start", "zoom", "end"), c, d, u, p = 500, m = 150, y = 0, _ = 10;
  function w(f) {
    f.property("__zoom", Fi).on("wheel.zoom", Q, { passive: !1 }).on("mousedown.zoom", it).on("dblclick.zoom", vt).filter(s).on("touchstart.zoom", Ft).on("touchmove.zoom", S).on("touchend.zoom touchcancel.zoom", A).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(f, b, g, x) {
    var z = f.selection ? f.selection() : f;
    z.property("__zoom", Fi), f !== z ? X(f, b, g, x) : z.interrupt().each(function() {
      L(this, arguments).event(x).start().zoom(null, typeof b == "function" ? b.apply(this, arguments) : b).end();
    });
  }, w.scaleBy = function(f, b, g, x) {
    w.scaleTo(f, function() {
      var z = this.__zoom.k, k = typeof b == "function" ? b.apply(this, arguments) : b;
      return z * k;
    }, g, x);
  }, w.scaleTo = function(f, b, g, x) {
    w.transform(f, function() {
      var z = e.apply(this, arguments), k = this.__zoom, C = g == null ? N(z) : typeof g == "function" ? g.apply(this, arguments) : g, R = k.invert(C), T = typeof b == "function" ? b.apply(this, arguments) : b;
      return i(E($(k, T), C, R), z, o);
    }, g, x);
  }, w.translateBy = function(f, b, g, x) {
    w.transform(f, function() {
      return i(this.__zoom.translate(
        typeof b == "function" ? b.apply(this, arguments) : b,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), o);
    }, null, x);
  }, w.translateTo = function(f, b, g, x, z) {
    w.transform(f, function() {
      var k = e.apply(this, arguments), C = this.__zoom, R = x == null ? N(k) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(Le.translate(R[0], R[1]).scale(C.k).translate(
        typeof b == "function" ? -b.apply(this, arguments) : -b,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), k, o);
    }, x, z);
  };
  function $(f, b) {
    return b = Math.max(r[0], Math.min(r[1], b)), b === f.k ? f : new ft(b, f.x, f.y);
  }
  function E(f, b, g) {
    var x = b[0] - g[0] * f.k, z = b[1] - g[1] * f.k;
    return x === f.x && z === f.y ? f : new ft(f.k, x, z);
  }
  function N(f) {
    return [(+f[0][0] + +f[1][0]) / 2, (+f[0][1] + +f[1][1]) / 2];
  }
  function X(f, b, g, x) {
    f.on("start.zoom", function() {
      L(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      L(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var z = this, k = arguments, C = L(z, k).event(x), R = e.apply(z, k), T = g == null ? N(R) : typeof g == "function" ? g.apply(z, k) : g, V = Math.max(R[1][0] - R[0][0], R[1][1] - R[0][1]), D = z.__zoom, j = typeof b == "function" ? b.apply(z, k) : b, nt = h(D.invert(T).concat(V / D.k), j.invert(T).concat(V / j.k));
      return function(G) {
        if (G === 1) G = j;
        else {
          var ot = nt(G), Ut = V / ot[2];
          G = new ft(Ut, T[0] - ot[0] * Ut, T[1] - ot[1] * Ut);
        }
        C.zoom(null, G);
      };
    });
  }
  function L(f, b, g) {
    return !g && f.__zooming || new P(f, b);
  }
  function P(f, b) {
    this.that = f, this.args = b, this.active = 0, this.sourceEvent = null, this.extent = e.apply(f, b), this.taps = 0;
  }
  P.prototype = {
    event: function(f) {
      return f && (this.sourceEvent = f), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(f, b) {
      return this.mouse && f !== "mouse" && (this.mouse[1] = b.invert(this.mouse[0])), this.touch0 && f !== "touch" && (this.touch0[1] = b.invert(this.touch0[0])), this.touch1 && f !== "touch" && (this.touch1[1] = b.invert(this.touch1[0])), this.that.__zoom = b, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(f) {
      var b = bt(this.that).datum();
      l.call(
        f,
        this.that,
        new Ha(f, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: l
        }),
        b
      );
    }
  };
  function Q(f, ...b) {
    if (!t.apply(this, arguments)) return;
    var g = L(this, b).event(f), x = this.__zoom, z = Math.max(r[0], Math.min(r[1], x.k * Math.pow(2, n.apply(this, arguments)))), k = wt(f);
    if (g.wheel)
      (g.mouse[0][0] !== k[0] || g.mouse[0][1] !== k[1]) && (g.mouse[1] = x.invert(g.mouse[0] = k)), clearTimeout(g.wheel);
    else {
      if (x.k === z) return;
      g.mouse = [k, x.invert(k)], be(this), g.start();
    }
    Yt(f), g.wheel = setTimeout(C, m), g.zoom("mouse", i(E($(x, z), g.mouse[0], g.mouse[1]), g.extent, o));
    function C() {
      g.wheel = null, g.end();
    }
  }
  function it(f, ...b) {
    if (u || !t.apply(this, arguments)) return;
    var g = f.currentTarget, x = L(this, b, !0).event(f), z = bt(f.view).on("mousemove.zoom", T, !0).on("mouseup.zoom", V, !0), k = wt(f, g), C = f.clientX, R = f.clientY;
    Fr(f.view), Ue(f), x.mouse = [k, this.__zoom.invert(k)], be(this), x.start();
    function T(D) {
      if (Yt(D), !x.moved) {
        var j = D.clientX - C, nt = D.clientY - R;
        x.moved = j * j + nt * nt > y;
      }
      x.event(D).zoom("mouse", i(E(x.that.__zoom, x.mouse[0] = wt(D, g), x.mouse[1]), x.extent, o));
    }
    function V(D) {
      z.on("mousemove.zoom mouseup.zoom", null), Ur(D.view, x.moved), Yt(D), x.event(D).end();
    }
  }
  function vt(f, ...b) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, x = wt(f.changedTouches ? f.changedTouches[0] : f, this), z = g.invert(x), k = g.k * (f.shiftKey ? 0.5 : 2), C = i(E($(g, k), x, z), e.apply(this, b), o);
      Yt(f), a > 0 ? bt(this).transition().duration(a).call(X, C, x, f) : bt(this).call(w.transform, C, x, f);
    }
  }
  function Ft(f, ...b) {
    if (t.apply(this, arguments)) {
      var g = f.touches, x = g.length, z = L(this, b, f.changedTouches.length === x).event(f), k, C, R, T;
      for (Ue(f), C = 0; C < x; ++C)
        R = g[C], T = wt(R, this), T = [T, this.__zoom.invert(T), R.identifier], z.touch0 ? !z.touch1 && z.touch0[2] !== T[2] && (z.touch1 = T, z.taps = 0) : (z.touch0 = T, k = !0, z.taps = 1 + !!c);
      c && (c = clearTimeout(c)), k && (z.taps < 2 && (d = T[0], c = setTimeout(function() {
        c = null;
      }, p)), be(this), z.start());
    }
  }
  function S(f, ...b) {
    if (this.__zooming) {
      var g = L(this, b).event(f), x = f.changedTouches, z = x.length, k, C, R, T;
      for (Yt(f), k = 0; k < z; ++k)
        C = x[k], R = wt(C, this), g.touch0 && g.touch0[2] === C.identifier ? g.touch0[0] = R : g.touch1 && g.touch1[2] === C.identifier && (g.touch1[0] = R);
      if (C = g.that.__zoom, g.touch1) {
        var V = g.touch0[0], D = g.touch0[1], j = g.touch1[0], nt = g.touch1[1], G = (G = j[0] - V[0]) * G + (G = j[1] - V[1]) * G, ot = (ot = nt[0] - D[0]) * ot + (ot = nt[1] - D[1]) * ot;
        C = $(C, Math.sqrt(G / ot)), R = [(V[0] + j[0]) / 2, (V[1] + j[1]) / 2], T = [(D[0] + nt[0]) / 2, (D[1] + nt[1]) / 2];
      } else if (g.touch0) R = g.touch0[0], T = g.touch0[1];
      else return;
      g.zoom("touch", i(E(C, R, T), g.extent, o));
    }
  }
  function A(f, ...b) {
    if (this.__zooming) {
      var g = L(this, b).event(f), x = f.changedTouches, z = x.length, k, C;
      for (Ue(f), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, p), k = 0; k < z; ++k)
        C = x[k], g.touch0 && g.touch0[2] === C.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === C.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (C = wt(C, this), Math.hypot(d[0] - C[0], d[1] - C[1]) < _)) {
        var R = bt(this).on("dblclick.zoom");
        R && R.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(f) {
    return arguments.length ? (n = typeof f == "function" ? f : fe(+f), w) : n;
  }, w.filter = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : fe(!!f), w) : t;
  }, w.touchable = function(f) {
    return arguments.length ? (s = typeof f == "function" ? f : fe(!!f), w) : s;
  }, w.extent = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : fe([[+f[0][0], +f[0][1]], [+f[1][0], +f[1][1]]]), w) : e;
  }, w.scaleExtent = function(f) {
    return arguments.length ? (r[0] = +f[0], r[1] = +f[1], w) : [r[0], r[1]];
  }, w.translateExtent = function(f) {
    return arguments.length ? (o[0][0] = +f[0][0], o[1][0] = +f[1][0], o[0][1] = +f[0][1], o[1][1] = +f[1][1], w) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, w.constrain = function(f) {
    return arguments.length ? (i = f, w) : i;
  }, w.duration = function(f) {
    return arguments.length ? (a = +f, w) : a;
  }, w.interpolate = function(f) {
    return arguments.length ? (h = f, w) : h;
  }, w.on = function() {
    var f = l.on.apply(l, arguments);
    return f === l ? w : f;
  }, w.clickDistance = function(f) {
    return arguments.length ? (y = (f = +f) * f, w) : Math.sqrt(y);
  }, w.tapDistance = function(f) {
    return arguments.length ? (_ = +f, w) : _;
  }, w;
}
var Ui;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(Ui || (Ui = {}));
var Kt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(Kt || (Kt = {}));
var Xi;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Xi || (Xi = {}));
var Yi;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Yi || (Yi = {}));
var Wi;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Wi || (Wi = {}));
var M;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(M || (M = {}));
M.Left + "", M.Right, M.Right + "", M.Left, M.Top + "", M.Bottom, M.Bottom + "", M.Top;
const Da = (t, e = 0, i = 1) => Math.min(Math.max(t, e), i), Zi = (t) => !isNaN(t) && isFinite(t), On = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Oa({ sourceX: t, sourceY: e, targetX: i, targetY: n, sourceControlX: s, sourceControlY: r, targetControlX: o, targetControlY: a }) {
  const h = t * 0.125 + s * 0.375 + o * 0.375 + i * 0.125, l = e * 0.125 + r * 0.375 + a * 0.375 + n * 0.125, c = Math.abs(h - t), d = Math.abs(l - e);
  return [h, l, c, d];
}
function pe(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function qi({ pos: t, x1: e, y1: i, x2: n, y2: s, c: r }) {
  switch (t) {
    case M.Left:
      return [e - pe(e - n, r), i];
    case M.Right:
      return [e + pe(n - e, r), i];
    case M.Top:
      return [e, i - pe(i - s, r)];
    case M.Bottom:
      return [e, i + pe(s - i, r)];
  }
}
function Ia({ sourceX: t, sourceY: e, sourcePosition: i = M.Bottom, targetX: n, targetY: s, targetPosition: r = M.Top, curvature: o = 0.25 }) {
  const [a, h] = qi({
    pos: i,
    x1: t,
    y1: e,
    x2: n,
    y2: s,
    c: o
  }), [l, c] = qi({
    pos: r,
    x1: n,
    y1: s,
    x2: t,
    y2: e,
    c: o
  }), [d, u, p, m] = Oa({
    sourceX: t,
    sourceY: e,
    targetX: n,
    targetY: s,
    sourceControlX: a,
    sourceControlY: h,
    targetControlX: l,
    targetControlY: c
  });
  return [
    `M${t},${e} C${a},${h} ${l},${c} ${n},${s}`,
    d,
    u,
    p,
    m
  ];
}
function In({ sourceX: t, sourceY: e, targetX: i, targetY: n }) {
  const s = Math.abs(i - t) / 2, r = i < t ? i + s : i - s, o = Math.abs(n - e) / 2, a = n < e ? n + o : n - o;
  return [r, a, s, o];
}
function Ba({ sourceX: t, sourceY: e, targetX: i, targetY: n }) {
  const [s, r, o, a] = In({
    sourceX: t,
    sourceY: e,
    targetX: i,
    targetY: n
  });
  return [`M ${t},${e}L ${i},${n}`, s, r, o, a];
}
const Vi = {
  [M.Left]: { x: -1, y: 0 },
  [M.Right]: { x: 1, y: 0 },
  [M.Top]: { x: 0, y: -1 },
  [M.Bottom]: { x: 0, y: 1 }
}, Fa = ({ source: t, sourcePosition: e = M.Bottom, target: i }) => e === M.Left || e === M.Right ? t.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, ji = (t, e) => Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
function Ua({ source: t, sourcePosition: e = M.Bottom, target: i, targetPosition: n = M.Top, center: s, offset: r, stepPosition: o }) {
  const a = Vi[e], h = Vi[n], l = { x: t.x + a.x * r, y: t.y + a.y * r }, c = { x: i.x + h.x * r, y: i.y + h.y * r }, d = Fa({
    source: l,
    sourcePosition: e,
    target: c
  }), u = d.x !== 0 ? "x" : "y", p = d[u];
  let m = [], y, _;
  const w = { x: 0, y: 0 }, $ = { x: 0, y: 0 }, [, , E, N] = In({
    sourceX: t.x,
    sourceY: t.y,
    targetX: i.x,
    targetY: i.y
  });
  if (a[u] * h[u] === -1) {
    u === "x" ? (y = s.x ?? l.x + (c.x - l.x) * o, _ = s.y ?? (l.y + c.y) / 2) : (y = s.x ?? (l.x + c.x) / 2, _ = s.y ?? l.y + (c.y - l.y) * o);
    const L = [
      { x: y, y: l.y },
      { x: y, y: c.y }
    ], P = [
      { x: l.x, y: _ },
      { x: c.x, y: _ }
    ];
    a[u] === p ? m = u === "x" ? L : P : m = u === "x" ? P : L;
  } else {
    const L = [{ x: l.x, y: c.y }], P = [{ x: c.x, y: l.y }];
    if (u === "x" ? m = a.x === p ? P : L : m = a.y === p ? L : P, e === n) {
      const S = Math.abs(t[u] - i[u]);
      if (S <= r) {
        const A = Math.min(r - 1, r - S);
        a[u] === p ? w[u] = (l[u] > t[u] ? -1 : 1) * A : $[u] = (c[u] > i[u] ? -1 : 1) * A;
      }
    }
    if (e !== n) {
      const S = u === "x" ? "y" : "x", A = a[u] === h[S], f = l[S] > c[S], b = l[S] < c[S];
      (a[u] === 1 && (!A && f || A && b) || a[u] !== 1 && (!A && b || A && f)) && (m = u === "x" ? L : P);
    }
    const Q = { x: l.x + w.x, y: l.y + w.y }, it = { x: c.x + $.x, y: c.y + $.y }, vt = Math.max(Math.abs(Q.x - m[0].x), Math.abs(it.x - m[0].x)), Ft = Math.max(Math.abs(Q.y - m[0].y), Math.abs(it.y - m[0].y));
    vt >= Ft ? (y = (Q.x + it.x) / 2, _ = m[0].y) : (y = m[0].x, _ = (Q.y + it.y) / 2);
  }
  return [[
    t,
    { x: l.x + w.x, y: l.y + w.y },
    ...m,
    { x: c.x + $.x, y: c.y + $.y },
    i
  ], y, _, E, N];
}
function Xa(t, e, i, n) {
  const s = Math.min(ji(t, e) / 2, ji(e, i) / 2, n), { x: r, y: o } = e;
  if (t.x === r && r === i.x || t.y === o && o === i.y)
    return `L${r} ${o}`;
  if (t.y === o) {
    const l = t.x < i.x ? -1 : 1, c = t.y < i.y ? 1 : -1;
    return `L ${r + s * l},${o}Q ${r},${o} ${r},${o + s * c}`;
  }
  const a = t.x < i.x ? 1 : -1, h = t.y < i.y ? -1 : 1;
  return `L ${r},${o + s * h}Q ${r},${o} ${r + s * a},${o}`;
}
function Ya({ sourceX: t, sourceY: e, sourcePosition: i = M.Bottom, targetX: n, targetY: s, targetPosition: r = M.Top, borderRadius: o = 5, centerX: a, centerY: h, offset: l = 20, stepPosition: c = 0.5 }) {
  const [d, u, p, m, y] = Ua({
    source: { x: t, y: e },
    sourcePosition: i,
    target: { x: n, y: s },
    targetPosition: r,
    center: { x: a, y: h },
    offset: l,
    stepPosition: c
  });
  return [d.reduce((w, $, E) => {
    let N = "";
    return E > 0 && E < d.length - 1 ? N = Xa(d[E - 1], $, d[E + 1], o) : N = `${E === 0 ? "M" : "L"}${$.x} ${$.y}`, w += N, w;
  }, ""), u, p, m, y];
}
const Wa = (t, e) => t.x !== e.x || t.y !== e.y || t.zoom !== e.k, De = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Xe = ({ x: t, y: e, zoom: i }) => Le.translate(t, e).scale(i), Tt = (t, e) => t.target.closest(`.${e}`), Bn = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), Za = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Ye = (t, e = 0, i = Za, n = () => {
}) => {
  const s = typeof e == "number" && e > 0;
  return s || n(), s ? t.transition().duration(e).ease(i).on("end", n) : t;
}, Fn = (t) => {
  const e = t.ctrlKey && On() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function qa({ zoomPanValues: t, noWheelClassName: e, d3Selection: i, d3Zoom: n, panOnScrollMode: s, panOnScrollSpeed: r, zoomOnPinch: o, onPanZoomStart: a, onPanZoom: h, onPanZoomEnd: l }) {
  return (c) => {
    if (Tt(c, e))
      return c.ctrlKey && c.preventDefault(), !1;
    c.preventDefault(), c.stopImmediatePropagation();
    const d = i.property("__zoom").k || 1;
    if (c.ctrlKey && o) {
      const _ = wt(c), w = Fn(c), $ = d * Math.pow(2, w);
      n.scaleTo(i, $, _, c);
      return;
    }
    const u = c.deltaMode === 1 ? 20 : 1;
    let p = s === Kt.Vertical ? 0 : c.deltaX * u, m = s === Kt.Horizontal ? 0 : c.deltaY * u;
    !On() && c.shiftKey && s !== Kt.Vertical && (p = c.deltaY * u, m = 0), n.translateBy(
      i,
      -(p / d) * r,
      -(m / d) * r,
      // @ts-ignore
      { internal: !0 }
    );
    const y = De(i.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling || (t.isPanScrolling = !0), t.isPanScrolling && (h?.(c, y), t.panScrollTimeout = setTimeout(() => {
      t.isPanScrolling = !1;
    }, 150));
  };
}
function Va({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: i }) {
  return function(n, s) {
    const r = n.type === "wheel", o = !e && r && !n.ctrlKey, a = Tt(n, t);
    if (n.ctrlKey && r && a && n.preventDefault(), o || a)
      return null;
    n.preventDefault(), i.call(this, n, s);
  };
}
function ja({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: i }) {
  return (n) => {
    if (n.sourceEvent?.internal)
      return;
    const s = De(n.transform);
    t.mouseButton = n.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, n.sourceEvent?.type === "mousedown" && e(!0), i && i?.(n.sourceEvent, s);
  };
}
function Ga({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: i, onTransformChange: n, onPanZoom: s }) {
  return (r) => {
    t.usedRightMouseButton = !!(i && Bn(e, t.mouseButton ?? 0)), r.sourceEvent?.sync || n([r.transform.x, r.transform.y, r.transform.k]), s && !r.sourceEvent?.internal && s?.(r.sourceEvent, De(r.transform));
  };
}
function Ka({ zoomPanValues: t, panOnDrag: e, panOnScroll: i, onDraggingChange: n, onPanZoomEnd: s, onPaneContextMenu: r }) {
  return (o) => {
    if (!o.sourceEvent?.internal && (t.isZoomingOrPanning = !1, r && Bn(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && o.sourceEvent && r(o.sourceEvent), t.usedRightMouseButton = !1, n(!1), s && Wa(t.prevViewport, o.transform))) {
      const a = De(o.transform);
      t.prevViewport = a, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          s?.(o.sourceEvent, a);
        },
        // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
        i ? 150 : 0
      );
    }
  };
}
function Qa({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: i, panOnDrag: n, panOnScroll: s, zoomOnDoubleClick: r, userSelectionActive: o, noWheelClassName: a, noPanClassName: h, lib: l, connectionInProgress: c }) {
  return (d) => {
    const u = t || e, p = i && d.ctrlKey, m = d.type === "wheel";
    if (d.button === 1 && d.type === "mousedown" && (Tt(d, `${l}-flow__node`) || Tt(d, `${l}-flow__edge`)))
      return !0;
    if (!n && !u && !s && !r && !i || o || c && !m || Tt(d, a) && m || Tt(d, h) && (!m || s && m && !t) || !i && d.ctrlKey && m)
      return !1;
    if (!i && d.type === "touchstart" && d.touches?.length > 1)
      return d.preventDefault(), !1;
    if (!u && !s && !p && m || !n && (d.type === "mousedown" || d.type === "touchstart") || Array.isArray(n) && !n.includes(d.button) && d.type === "mousedown")
      return !1;
    const y = Array.isArray(n) && n.includes(d.button) || !d.button || d.button <= 1;
    return (!d.ctrlKey || m) && y;
  };
}
function Ja({ domNode: t, minZoom: e, maxZoom: i, paneClickDistance: n, translateExtent: s, viewport: r, onPanZoom: o, onPanZoomStart: a, onPanZoomEnd: h, onDraggingChange: l }) {
  const c = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: { x: 0, y: 0, zoom: 0 },
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, d = t.getBoundingClientRect(), u = La().clickDistance(!Zi(n) || n < 0 ? 0 : n).scaleExtent([e, i]).translateExtent(s), p = bt(t).call(u);
  E({
    x: r.x,
    y: r.y,
    zoom: Da(r.zoom, e, i)
  }, [
    [0, 0],
    [d.width, d.height]
  ], s);
  const m = p.on("wheel.zoom"), y = p.on("dblclick.zoom");
  u.wheelDelta(Fn);
  function _(S, A) {
    return p ? new Promise((f) => {
      u?.interpolate(A?.interpolate === "linear" ? Gt : ye).transform(Ye(p, A?.duration, A?.ease, () => f(!0)), S);
    }) : Promise.resolve(!1);
  }
  function w({ noWheelClassName: S, noPanClassName: A, onPaneContextMenu: f, userSelectionActive: b, panOnScroll: g, panOnDrag: x, panOnScrollMode: z, panOnScrollSpeed: k, preventScrolling: C, zoomOnPinch: R, zoomOnScroll: T, zoomOnDoubleClick: V, zoomActivationKeyPressed: D, lib: j, onTransformChange: nt, connectionInProgress: G }) {
    b && !c.isZoomingOrPanning && $();
    const Ut = g && !D && !b ? qa({
      zoomPanValues: c,
      noWheelClassName: S,
      d3Selection: p,
      d3Zoom: u,
      panOnScrollMode: z,
      panOnScrollSpeed: k,
      zoomOnPinch: R,
      onPanZoomStart: a,
      onPanZoom: o,
      onPanZoomEnd: h
    }) : Va({
      noWheelClassName: S,
      preventScrolling: C,
      d3ZoomHandler: m
    });
    if (p.on("wheel.zoom", Ut, { passive: !1 }), !b) {
      const is = ja({
        zoomPanValues: c,
        onDraggingChange: l,
        onPanZoomStart: a
      });
      u.on("start", is);
      const ns = Ga({
        zoomPanValues: c,
        panOnDrag: x,
        onPaneContextMenu: !!f,
        onPanZoom: o,
        onTransformChange: nt
      });
      u.on("zoom", ns);
      const ss = Ka({
        zoomPanValues: c,
        panOnDrag: x,
        panOnScroll: g,
        onPaneContextMenu: f,
        onPanZoomEnd: h,
        onDraggingChange: l
      });
      u.on("end", ss);
    }
    const es = Qa({
      zoomActivationKeyPressed: D,
      panOnDrag: x,
      zoomOnScroll: T,
      panOnScroll: g,
      zoomOnDoubleClick: V,
      zoomOnPinch: R,
      userSelectionActive: b,
      noPanClassName: A,
      noWheelClassName: S,
      lib: j,
      connectionInProgress: G
    });
    u.filter(es), V ? p.on("dblclick.zoom", y) : p.on("dblclick.zoom", null);
  }
  function $() {
    u.on("zoom", null);
  }
  async function E(S, A, f) {
    const b = Xe(S), g = u?.constrain()(b, A, f);
    return g && await _(g), new Promise((x) => x(g));
  }
  async function N(S, A) {
    const f = Xe(S);
    return await _(f, A), new Promise((b) => b(f));
  }
  function X(S) {
    if (p) {
      const A = Xe(S), f = p.property("__zoom");
      (f.k !== S.zoom || f.x !== S.x || f.y !== S.y) && u?.transform(p, A, null, { sync: !0 });
    }
  }
  function L() {
    const S = p ? Dn(p.node()) : { x: 0, y: 0, k: 1 };
    return { x: S.x, y: S.y, zoom: S.k };
  }
  function P(S, A) {
    return p ? new Promise((f) => {
      u?.interpolate(A?.interpolate === "linear" ? Gt : ye).scaleTo(Ye(p, A?.duration, A?.ease, () => f(!0)), S);
    }) : Promise.resolve(!1);
  }
  function Q(S, A) {
    return p ? new Promise((f) => {
      u?.interpolate(A?.interpolate === "linear" ? Gt : ye).scaleBy(Ye(p, A?.duration, A?.ease, () => f(!0)), S);
    }) : Promise.resolve(!1);
  }
  function it(S) {
    u?.scaleExtent(S);
  }
  function vt(S) {
    u?.translateExtent(S);
  }
  function Ft(S) {
    const A = !Zi(S) || S < 0 ? 0 : S;
    u?.clickDistance(A);
  }
  return {
    update: w,
    destroy: $,
    setViewport: N,
    setViewportConstrained: E,
    getViewport: L,
    scaleTo: P,
    scaleBy: Q,
    setScaleExtent: it,
    setTranslateExtent: vt,
    syncViewport: X,
    setClickDistance: Ft
  };
}
var Gi;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(Gi || (Gi = {}));
class th {
  constructor(e = {}) {
    this.container = null, this.state = {
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
      nodeLookup: /* @__PURE__ */ new Map(),
      edgeLookup: /* @__PURE__ */ new Map()
    }, this.subscribers = /* @__PURE__ */ new Set(), this.panZoomInstance = null, this.notifyScheduled = !1, this.pendingFit = null, this.fitFallbackTimer = null, this.didInitFit = !1, this.renderToken = 0, this.settledToken = -1, this.renderCompleteCallbacks = /* @__PURE__ */ new Set(), this.panZoomUpdateOptions = null, this.options = {
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
    this.container = e, this.panZoomInstance = Ja({
      domNode: e,
      minZoom: this.options.minZoom || 0.5,
      maxZoom: this.options.maxZoom || 2,
      paneClickDistance: 0,
      translateExtent: [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]],
      viewport: this.state.viewport,
      onDraggingChange: (i) => {
        this.container?.classList.toggle("panning", i);
      },
      onPanZoom: (i, n) => {
        this.state.viewport = n, this.notifySubscribers();
      },
      onPanZoomStart: (i, n) => {
      },
      onPanZoomEnd: (i, n) => {
      }
    }), this.panZoomUpdateOptions = {
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
      zoomOnDoubleClick: this.options.zoomOnDoubleClick ?? !1,
      zoomActivationKeyPressed: !1,
      lib: "lit-flow",
      onTransformChange: (i) => {
      },
      connectionInProgress: !1
    }, this.panZoomInstance.update(this.panZoomUpdateOptions), this.maybeInitFit(), this.notifySubscribers();
  }
  /**
   * Enable or disable panning on drag
   */
  setPanOnDrag(e) {
    this.panZoomInstance && this.panZoomUpdateOptions && (this.panZoomUpdateOptions = {
      ...this.panZoomUpdateOptions,
      panOnDrag: e
    }, this.panZoomInstance.update(this.panZoomUpdateOptions));
  }
  destroy() {
    this.clearFitFallback(), this.pendingFit = null, this.panZoomInstance?.destroy(), this.panZoomInstance = null, this.container = null, this.subscribers.clear(), this.renderCompleteCallbacks.clear();
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
    this.state.nodes = e, this.updateLookups(), this.armRender(), this.maybeInitFit(), this.notifySubscribers();
  }
  setEdges(e) {
    this.state.edges = e, this.updateLookups(), this.armRender(), this.notifySubscribers();
  }
  updateNode(e, i) {
    this.state.nodes = this.state.nodes.map(
      (n) => n.id === e ? { ...n, ...i } : n
    ), this.updateLookups(), this.notifySubscribers();
  }
  updateEdge(e, i) {
    this.state.edges = this.state.edges.map(
      (n) => n.id === e ? { ...n, ...i } : n
    ), this.updateLookups(), this.notifySubscribers();
  }
  /**
   * Add a node to the flow.
   *
   * If `position` is omitted, it will be auto-calculated based on the current
   * viewport and container size, trying to avoid overlapping existing nodes.
   */
  addNode(e) {
    const i = e.position ? e : { ...e, position: this.getAutoNodePosition(e) };
    this.state.nodes = [...this.state.nodes, i], this.updateLookups(), this.armRender(), this.notifySubscribers();
  }
  removeNode(e) {
    this.state.nodes = this.state.nodes.filter((i) => i.id !== e), this.state.edges = this.state.edges.filter(
      (i) => i.source !== e && i.target !== e
    ), this.updateLookups(), this.armRender(), this.notifySubscribers();
  }
  addEdge(e) {
    this.state.edges = [...this.state.edges, e], this.updateLookups(), this.armRender(), this.notifySubscribers();
  }
  removeEdge(e) {
    this.state.edges = this.state.edges.filter((i) => i.id !== e), this.updateLookups(), this.armRender(), this.notifySubscribers();
  }
  subscribe(e) {
    return this.subscribers.add(e), () => this.subscribers.delete(e);
  }
  /**
   * Register a callback that fires once after a batch of data (set/add/remove of
   * nodes or edges) has finished rendering — i.e. every node has been measured
   * and edges have been laid out at their final positions. Fires once per
   * structural revision. Returns an unsubscribe function.
   */
  onRenderComplete(e) {
    return this.renderCompleteCallbacks.add(e), () => this.renderCompleteCallbacks.delete(e);
  }
  zoomIn() {
    const e = this.state.viewport.zoom, i = Math.min(e * 1.2, this.options.maxZoom || 2);
    this.setViewport({ ...this.state.viewport, zoom: i });
  }
  zoomOut() {
    const e = this.state.viewport.zoom, i = Math.max(e / 1.2, this.options.minZoom || 0.5);
    this.setViewport({ ...this.state.viewport, zoom: i });
  }
  /**
   * Center and zoom the viewport so every node is visible.
   *
   * @param options.padding     Gap (px) to leave around the content (default 50).
   * @param options.awaitMeasure When true, if the nodes aren't measured yet or
   *   the container has no size, the fit is deferred and retried automatically
   *   once measurements land — use this for fit-on-load.
   */
  fitView(e) {
    const i = e?.padding ?? 50;
    if (this.state.nodes.length === 0 || !this.container) return;
    if (e?.awaitMeasure && !this.canFitAccurately()) {
      this.pendingFit = { padding: i }, this.scheduleFitFallback();
      return;
    }
    const n = this.container.clientWidth, s = this.container.clientHeight;
    if (n <= 0 || s <= 0) {
      this.pendingFit = { padding: i }, this.scheduleFitFallback();
      return;
    }
    let r = 1 / 0, o = 1 / 0, a = -1 / 0, h = -1 / 0;
    this.state.nodes.forEach(($) => {
      const { width: E, height: N } = this.getNodeSize($);
      r = Math.min(r, $.position.x), o = Math.min(o, $.position.y), a = Math.max(a, $.position.x + E), h = Math.max(h, $.position.y + N);
    });
    const l = Math.max(a - r, 1), c = Math.max(h - o, 1), d = this.options.minZoom ?? 0.5, u = this.options.maxZoom ?? 2, p = (n - i * 2) / l, m = (s - i * 2) / c;
    let y = Math.min(p, m, u);
    y = Math.max(y, d), (!isFinite(y) || y <= 0) && (y = 1);
    const _ = (n - l * y) / 2 - r * y, w = (s - c * y) / 2 - o * y;
    this.clearFitFallback(), this.pendingFit = null, this.setViewport({ x: _, y: w, zoom: y });
  }
  /** Effective rendered size of a node, falling back through measured → explicit → shape data → default. */
  getNodeSize(e) {
    const i = e.data, n = e.measured?.width ?? e.width ?? i?.size?.width ?? 150, s = e.measured?.height ?? e.height ?? i?.size?.height ?? 50;
    return { width: n, height: s };
  }
  /** True once every node has a real size and the container has been laid out. */
  canFitAccurately() {
    return !this.container || this.container.clientWidth <= 0 || this.container.clientHeight <= 0 ? !1 : this.areNodesMeasured();
  }
  /** True once every node has a real (non-fallback) size. */
  areNodesMeasured() {
    return this.state.nodes.every(
      (e) => e.measured?.width != null || typeof e.width == "number" || e.type === "shape" || e.data?.size
    );
  }
  /** Mark a new structural revision whose render we should wait to settle. */
  armRender() {
    this.renderToken++;
  }
  /**
   * Emit render-complete once the current revision's nodes are all measured.
   * Called from the batched notify, so it sees the measurements that just
   * landed. Defers two frames so edges resolve their handle positions and
   * paint before we report "done".
   */
  maybeEmitRenderComplete() {
    if (this.renderCompleteCallbacks.size === 0 || this.settledToken === this.renderToken || this.state.nodes.length > 0 && !this.areNodesMeasured()) return;
    this.settledToken = this.renderToken;
    const e = typeof requestAnimationFrame < "u" ? (i) => requestAnimationFrame(i) : (i) => {
      setTimeout(i, 16);
    };
    e(() => e(() => {
      this.settledToken === this.renderToken && this.renderCompleteCallbacks.forEach((i) => i(this.state));
    }));
  }
  /** Run a deferred fit once nodes are measured. Called from the batched notify. */
  maybeRunPendingFit() {
    if (!this.pendingFit || !this.canFitAccurately()) return;
    const { padding: e } = this.pendingFit;
    this.pendingFit = null, this.clearFitFallback(), this.fitView({ padding: e });
  }
  /**
   * Safety net: if measurements never complete (e.g. a node errors), force the
   * deferred fit with whatever sizes are available rather than leaving the
   * viewport unfit.
   */
  scheduleFitFallback() {
    this.fitFallbackTimer == null && (this.fitFallbackTimer = setTimeout(() => {
      if (this.fitFallbackTimer = null, !this.pendingFit) return;
      const { padding: e } = this.pendingFit;
      this.pendingFit = null, this.container && this.container.clientWidth > 0 && this.container.clientHeight > 0 && this.fitView({ padding: e });
    }, 400));
  }
  clearFitFallback() {
    this.fitFallbackTimer != null && (clearTimeout(this.fitFallbackTimer), this.fitFallbackTimer = null);
  }
  /** Trigger the one-time fit-on-load when `fitViewOnInit` (or legacy `fitView`) is set. */
  maybeInitFit() {
    this.didInitFit || (this.options.fitViewOnInit || this.options.fitView) && (!this.container || this.state.nodes.length === 0 || (this.didInitFit = !0, this.fitView({ awaitMeasure: !0 })));
  }
  updateLookups() {
    this.state.nodeLookup.clear(), this.state.nodes.forEach((e) => {
      const i = {
        ...e,
        measured: e.measured || { width: e.width, height: e.height },
        internals: {
          positionAbsolute: e.position,
          z: e.zIndex || 0,
          userNode: e
        }
      };
      this.state.nodeLookup.set(e.id, i);
    }), this.state.edgeLookup.clear(), this.state.edges.forEach((e) => {
      this.state.edgeLookup.set(e.id, e);
    });
  }
  getAutoNodePosition(e) {
    const i = this.state.viewport, n = i.zoom || 1, s = e?.measured?.width || e?.width || 150, r = e?.measured?.height || e?.height || 50;
    if (!this.container) {
      const $ = this.state.nodes[this.state.nodes.length - 1];
      if (!$) return { x: 0, y: 0 };
      const E = $.measured?.width || $.width || 150;
      return { x: $.position.x + E + 40, y: $.position.y };
    }
    const o = (this.container.clientWidth / 2 - i.x) / n, a = (this.container.clientHeight / 2 - i.y) / n, h = o - s / 2, l = a - r / 2, c = this.options.snapToGrid ? this.options.snapGrid?.[0] ?? 20 : 20, d = 900, u = ($) => {
      const E = { x: $.x, y: $.y, w: s, h: r };
      return this.state.nodes.some((N) => {
        const X = N.measured?.width || N.width || 150, L = N.measured?.height || N.height || 50, P = { x: N.position.x, y: N.position.y, w: X, h: L };
        return !(E.x + E.w <= P.x || P.x + P.w <= E.x || E.y + E.h <= P.y || P.y + P.h <= E.y);
      });
    };
    let p = 0, m = 0, y = 0, _ = -1;
    for (let $ = 0; $ < d; $++) {
      const E = { x: h + p * c, y: l + m * c };
      if (!u(E))
        return this.options.snapToGrid ? this.snapPositionToGrid(E) : E;
      if (p === m || p < 0 && p === -m || p > 0 && p === 1 - m) {
        const N = y;
        y = -_, _ = N;
      }
      p += y, m += _;
    }
    const w = { x: h, y: l };
    return this.options.snapToGrid ? this.snapPositionToGrid(w) : w;
  }
  snapPositionToGrid(e) {
    const [i, n] = this.options.snapGrid ?? [20, 20];
    return {
      x: Math.round(e.x / i) * i,
      y: Math.round(e.y / n) * n
    };
  }
  notifySubscribers() {
    this.notifyScheduled || (this.notifyScheduled = !0, queueMicrotask(() => {
      this.notifyScheduled = !1, this.maybeRunPendingFit(), this.subscribers.forEach((e) => e(this.state)), this.maybeEmitRenderComplete();
    }));
  }
}
function sl(t = {}) {
  const e = {
    nodes: t.nodes || [],
    edges: t.edges || [],
    viewport: t.viewport || { x: 0, y: 0, zoom: 1 },
    nodeLookup: /* @__PURE__ */ new Map(),
    edgeLookup: /* @__PURE__ */ new Map()
  }, i = /* @__PURE__ */ new Set(), n = () => {
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
  return n(), {
    getState: () => e,
    setState: (s) => {
      Object.assign(e, s), n(), i.forEach((r) => r(e));
    },
    subscribe: (s) => (i.add(s), () => i.delete(s))
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = globalThis, yi = xe.ShadowRoot && (xe.ShadyCSS === void 0 || xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vi = Symbol(), Ki = /* @__PURE__ */ new WeakMap();
let Un = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== vi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (yi && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = Ki.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ki.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const eh = (t) => new Un(typeof t == "string" ? t : t + "", void 0, vi), Y = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1]), t[0]);
  return new Un(i, t, vi);
}, ih = (t, e) => {
  if (yi) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const n = document.createElement("style"), s = xe.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, t.appendChild(n);
  }
}, Qi = yi ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return eh(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: nh, defineProperty: sh, getOwnPropertyDescriptor: rh, getOwnPropertyNames: oh, getOwnPropertySymbols: ah, getPrototypeOf: hh } = Object, Oe = globalThis, Ji = Oe.trustedTypes, lh = Ji ? Ji.emptyScript : "", ch = Oe.reactiveElementPolyfillSupport, Qt = (t, e) => t, Me = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? lh : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, wi = (t, e) => !nh(t, e), tn = { attribute: !0, type: String, converter: Me, reflect: !1, useDefault: !1, hasChanged: wi };
Symbol.metadata ??= Symbol("metadata"), Oe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Pt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = tn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, i);
      s !== void 0 && sh(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: s, set: r } = rh(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: s, set(o) {
      const a = s?.call(this);
      r?.call(this, o), this.requestUpdate(e, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? tn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Qt("elementProperties"))) return;
    const e = hh(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Qt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Qt("properties"))) {
      const i = this.properties, n = [...oh(i), ...ah(i)];
      for (const s of n) this.createProperty(s, i[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [n, s] of i) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const s = this._$Eu(i, n);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const s of n) i.unshift(Qi(s));
    } else e !== void 0 && i.push(Qi(e));
    return i;
  }
  static _$Eu(e, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
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
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ih(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((e) => e.hostDisconnected?.()));
  }
  attributeChangedCallback(e, i, n) {
    this._$AK(e, n);
  }
  _$ET(e, i) {
    const n = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, n);
    if (s !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : Me).toAttribute(i, n.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Me;
      this._$Em = s;
      const a = o.fromAttribute(i, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, n) {
    if (e !== void 0) {
      const s = this.constructor, r = this[e];
      if (n ??= s.getPropertyOptions(e), !((n.hasChanged ?? wi)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, n)))) return;
      this.C(e, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: n, reflect: s, wrapped: r }, o) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, r] of n) {
        const { wrapped: o } = r, a = this[s];
        o !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, r, a);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach(((n) => n.hostUpdate?.())), this.update(i)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach(((i) => i.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach(((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Pt.elementStyles = [], Pt.shadowRootOptions = { mode: "open" }, Pt[Qt("elementProperties")] = /* @__PURE__ */ new Map(), Pt[Qt("finalized")] = /* @__PURE__ */ new Map(), ch?.({ ReactiveElement: Pt }), (Oe.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bi = globalThis, He = bi.trustedTypes, en = He ? He.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Xn = "$lit$", xt = `lit$${Math.random().toFixed(9).slice(2)}$`, Yn = "?" + xt, dh = `<${Yn}>`, Ht = document, ie = () => Ht.createComment(""), ne = (t) => t === null || typeof t != "object" && typeof t != "function", xi = Array.isArray, uh = (t) => xi(t) || typeof t?.[Symbol.iterator] == "function", We = `[ 	
\f\r]`, Wt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nn = /-->/g, sn = />/g, _t = RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rn = /'/g, on = /"/g, Wn = /^(?:script|style|textarea|title)$/i, Zn = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), H = Zn(1), J = Zn(2), $t = Symbol.for("lit-noChange"), B = Symbol.for("lit-nothing"), an = /* @__PURE__ */ new WeakMap(), Et = Ht.createTreeWalker(Ht, 129);
function qn(t, e) {
  if (!xi(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return en !== void 0 ? en.createHTML(e) : e;
}
const fh = (t, e) => {
  const i = t.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Wt;
  for (let a = 0; a < i; a++) {
    const h = t[a];
    let l, c, d = -1, u = 0;
    for (; u < h.length && (o.lastIndex = u, c = o.exec(h), c !== null); ) u = o.lastIndex, o === Wt ? c[1] === "!--" ? o = nn : c[1] !== void 0 ? o = sn : c[2] !== void 0 ? (Wn.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = _t) : c[3] !== void 0 && (o = _t) : o === _t ? c[0] === ">" ? (o = s ?? Wt, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? _t : c[3] === '"' ? on : rn) : o === on || o === rn ? o = _t : o === nn || o === sn ? o = Wt : (o = _t, s = void 0);
    const p = o === _t && t[a + 1].startsWith("/>") ? " " : "";
    r += o === Wt ? h + dh : d >= 0 ? (n.push(l), h.slice(0, d) + Xn + h.slice(d) + xt + p) : h + xt + (d === -2 ? a : p);
  }
  return [qn(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class se {
  constructor({ strings: e, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, h = this.parts, [l, c] = fh(e, i);
    if (this.el = se.createElement(l, n), Et.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = Et.nextNode()) !== null && h.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Xn)) {
          const u = c[o++], p = s.getAttribute(d).split(xt), m = /([.?@])?(.*)/.exec(u);
          h.push({ type: 1, index: r, name: m[2], strings: p, ctor: m[1] === "." ? gh : m[1] === "?" ? mh : m[1] === "@" ? yh : Ie }), s.removeAttribute(d);
        } else d.startsWith(xt) && (h.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Wn.test(s.tagName)) {
          const d = s.textContent.split(xt), u = d.length - 1;
          if (u > 0) {
            s.textContent = He ? He.emptyScript : "";
            for (let p = 0; p < u; p++) s.append(d[p], ie()), Et.nextNode(), h.push({ type: 2, index: ++r });
            s.append(d[u], ie());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Yn) h.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(xt, d + 1)) !== -1; ) h.push({ type: 7, index: r }), d += xt.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = Ht.createElement("template");
    return n.innerHTML = e, n;
  }
}
function It(t, e, i = t, n) {
  if (e === $t) return e;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = ne(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = s : i._$Cl = s), s !== void 0 && (e = It(t, s._$AS(t, e.values), s, n)), e;
}
let ph = class {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: n } = this._$AD, s = (e?.creationScope ?? Ht).importNode(i, !0);
    Et.currentNode = s;
    let r = Et.nextNode(), o = 0, a = 0, h = n[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new Bt(r, r.nextSibling, this, e) : h.type === 1 ? l = new h.ctor(r, h.name, h.strings, this, e) : h.type === 6 && (l = new vh(r, this, e)), this._$AV.push(l), h = n[++a];
      }
      o !== h?.index && (r = Et.nextNode(), o++);
    }
    return Et.currentNode = Ht, s;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
};
class Bt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, s) {
    this.type = 2, this._$AH = B, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = It(this, e, i), ne(e) ? e === B || e == null || e === "" ? (this._$AH !== B && this._$AR(), this._$AH = B) : e !== this._$AH && e !== $t && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : uh(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== B && ne(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ht.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = se.createElement(qn(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new ph(s, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = an.get(e.strings);
    return i === void 0 && an.set(e.strings, i = new se(e)), i;
  }
  k(e) {
    xi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of e) s === i.length ? i.push(n = new Bt(this.O(ie()), this.O(ie()), this, this.options)) : n = i[s], n._$AI(r), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ie {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, s, r) {
    this.type = 1, this._$AH = B, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = B;
  }
  _$AI(e, i = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = It(this, e, i, 0), o = !ne(e) || e !== this._$AH && e !== $t, o && (this._$AH = e);
    else {
      const a = e;
      let h, l;
      for (e = r[0], h = 0; h < r.length - 1; h++) l = It(this, a[n + h], i, h), l === $t && (l = this._$AH[h]), o ||= !ne(l) || l !== this._$AH[h], l === B ? e = B : e !== B && (e += (l ?? "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === B ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class gh extends Ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === B ? void 0 : e;
  }
}
class mh extends Ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== B);
  }
}
class yh extends Ie {
  constructor(e, i, n, s, r) {
    super(e, i, n, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = It(this, e, i, 0) ?? B) === $t) return;
    const n = this._$AH, s = e === B && n !== B || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== B && (n === B || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class vh {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    It(this, e);
  }
}
const wh = { I: Bt }, bh = bi.litHtmlPolyfillSupport;
bh?.(se, Bt), (bi.litHtmlVersions ??= []).push("3.3.1");
const Vn = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new Bt(e.insertBefore(ie(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $i = globalThis;
let F = class extends Pt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Vn(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return $t;
  }
};
F._$litElement$ = !0, F.finalized = !0, $i.litElementHydrateSupport?.({ LitElement: F });
const xh = $i.litElementPolyfillSupport;
xh?.({ LitElement: F });
($i.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jn = Symbol.for(""), $h = (t) => {
  if (t?.r === jn) return t?._$litStatic$;
}, ge = (t) => ({ _$litStatic$: t, r: jn }), hn = /* @__PURE__ */ new Map(), _h = (t) => (e, ...i) => {
  const n = i.length;
  let s, r;
  const o = [], a = [];
  let h, l = 0, c = !1;
  for (; l < n; ) {
    for (h = e[l]; l < n && (r = i[l], (s = $h(r)) !== void 0); ) h += s + e[++l], c = !0;
    l !== n && a.push(r), o.push(h), l++;
  }
  if (l === n && o.push(e[n]), c) {
    const d = o.join("$$lit$$");
    (e = hn.get(d)) === void 0 && (o.raw = o, hn.set(d, e = o)), i = a;
  }
  return t(e, ...i);
}, W = _h(H);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zh = { attribute: !0, type: String, converter: Me, reflect: !1, hasChanged: wi }, Sh = (t = zh, e, i) => {
  const { kind: n, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), n === "accessor") {
    const { name: o } = i;
    return { set(a) {
      const h = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, h, t);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, t, a), a;
    } };
  }
  if (n === "setter") {
    const { name: o } = i;
    return function(a) {
      const h = this[o];
      e.call(this, a), this.requestUpdate(o, h, t);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function v(t) {
  return (e, i) => typeof i == "object" ? Sh(t, e, i) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gn = { ATTRIBUTE: 1, CHILD: 2 }, Kn = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Qn = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, n) {
    this._$Ct = e, this._$AM = i, this._$Ci = n;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jn = "important", Eh = " !" + Jn, kh = Kn(class extends Qn {
  constructor(t) {
    if (super(t), t.type !== Gn.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce(((e, i) => {
      const n = t[i];
      return n == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${n};`;
    }), "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const n of this.ft) e[n] == null && (this.ft.delete(n), n.includes("-") ? i.removeProperty(n) : i[n] = null);
    for (const n in e) {
      const s = e[n];
      if (s != null) {
        this.ft.add(n);
        const r = typeof s == "string" && s.endsWith(Eh);
        n.includes("-") || r ? i.setProperty(n, r ? s.slice(0, -11) : s, r ? Jn : "") : i[n] = s;
      }
    }
    return $t;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Ch } = wh, ln = () => document.createComment(""), Zt = (t, e, i) => {
  const n = t._$AA.parentNode, s = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const r = n.insertBefore(ln(), s), o = n.insertBefore(ln(), s);
    i = new Ch(r, o, t, t.options);
  } else {
    const r = i._$AB.nextSibling, o = i._$AM, a = o !== t;
    if (a) {
      let h;
      i._$AQ?.(t), i._$AM = t, i._$AP !== void 0 && (h = t._$AU) !== o._$AU && i._$AP(h);
    }
    if (r !== s || a) {
      let h = i._$AA;
      for (; h !== r; ) {
        const l = h.nextSibling;
        n.insertBefore(h, s), h = l;
      }
    }
  }
  return i;
}, zt = (t, e, i = t) => (t._$AI(e, i), t), Mh = {}, Hh = (t, e = Mh) => t._$AH = e, Ah = (t) => t._$AH, Ze = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const cn = (t, e, i) => {
  const n = /* @__PURE__ */ new Map();
  for (let s = e; s <= i; s++) n.set(t[s], s);
  return n;
}, qt = Kn(class extends Qn {
  constructor(t) {
    if (super(t), t.type !== Gn.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let n;
    i === void 0 ? i = e : e !== void 0 && (n = e);
    const s = [], r = [];
    let o = 0;
    for (const a of t) s[o] = n ? n(a, o) : o, r[o] = i(a, o), o++;
    return { values: r, keys: s };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, n]) {
    const s = Ah(t), { values: r, keys: o } = this.dt(e, i, n);
    if (!Array.isArray(s)) return this.ut = o, r;
    const a = this.ut ??= [], h = [];
    let l, c, d = 0, u = s.length - 1, p = 0, m = r.length - 1;
    for (; d <= u && p <= m; ) if (s[d] === null) d++;
    else if (s[u] === null) u--;
    else if (a[d] === o[p]) h[p] = zt(s[d], r[p]), d++, p++;
    else if (a[u] === o[m]) h[m] = zt(s[u], r[m]), u--, m--;
    else if (a[d] === o[m]) h[m] = zt(s[d], r[m]), Zt(t, h[m + 1], s[d]), d++, m--;
    else if (a[u] === o[p]) h[p] = zt(s[u], r[p]), Zt(t, s[d], s[u]), u--, p++;
    else if (l === void 0 && (l = cn(o, p, m), c = cn(a, d, u)), l.has(a[d])) if (l.has(a[u])) {
      const y = c.get(o[p]), _ = y !== void 0 ? s[y] : null;
      if (_ === null) {
        const w = Zt(t, s[d]);
        zt(w, r[p]), h[p] = w;
      } else h[p] = zt(_, r[p]), Zt(t, s[d], _), s[y] = null;
      p++;
    } else Ze(s[u]), u--;
    else Ze(s[d]), d++;
    for (; p <= m; ) {
      const y = Zt(t, h[m + 1]);
      zt(y, r[p]), h[p++] = y;
    }
    for (; d <= u; ) {
      const y = s[d++];
      y !== null && Ze(y);
    }
    return this.ut = o, Hh(t, h), $t;
  }
});
function cl(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function dl(t, e) {
  return {
    x: (t.x + e.x) / 2,
    y: (t.y + e.y) / 2
  };
}
function ni(t) {
  return Ia(t);
}
function dn(t) {
  return Ya(t);
}
function Nh(t) {
  return Ba(t);
}
function ul(t, e) {
  return t.x >= e.x && t.x <= e.x + e.width && t.y >= e.y && t.y <= e.y + e.height;
}
var Rh = Object.defineProperty, Ph = Object.getOwnPropertyDescriptor, Nt = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ph(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Rh(e, i, s), s;
};
let gt = class extends F {
  constructor() {
    super(), this.nodes = [], this.edges = [], this.viewport = { x: 0, y: 0, zoom: 1 }, this.nodeTypes = {
      default: "flow-node",
      shape: "shape-node",
      "erd-table": "erd-table-node"
    }, this.connection = null, this.isHoveringNode = !1, this.onHandleStart = (t) => {
      const { nodeId: e, type: i, handleId: n } = t.detail;
      this.connection = { from: { nodeId: e, handleId: n } }, this.onConnectStart && this.onConnectStart({
        nodeId: e,
        handleId: n,
        handleType: i
      });
    }, this.onMouseMove = (t) => {
      if (!this.connection) return;
      const e = this.screenToCanvas(t.clientX, t.clientY);
      this.connection.preview = e, this.requestUpdate();
    }, this.onMouseUp = (t) => {
      if (!this.connection) return;
      const e = t.composedPath();
      let i = null, n;
      for (const d of e)
        if (d instanceof HTMLElement) {
          const u = d.tagName.toLowerCase();
          if (u === "flow-node" || Object.values(this.nodeTypes).some((p) => p === u)) {
            i = d;
            break;
          }
          d.dataset.handleId && (n = d.dataset.handleId);
        }
      const s = i?.getAttribute("id") || void 0, r = !!this.connection?.from;
      let o, a, h, l, c;
      if (this.connection.from && s && s !== this.connection.from.nodeId) {
        const d = `e-${this.connection.from.nodeId}-${s}-${Date.now()}`;
        if (o = this.connection.from.nodeId, a = this.connection.from.handleId, l = n, !l) {
          const u = this.nodes.find((p) => p.id === s);
          u && u.type === "shape" && (l = this.determineBestTargetHandle(o, s));
        }
        h = s, this.instance.addEdge({
          id: d,
          source: o,
          target: s,
          sourceHandle: a,
          targetHandle: l,
          data: {}
        });
      } else this.connection?.from && (o = this.connection.from.nodeId, a = this.connection.from.handleId, this.connection.preview && (c = this.connection.preview));
      this.onConnectEnd && this.onConnectEnd({
        connectionStarted: r,
        sourceNodeId: o,
        sourceHandleId: a,
        targetNodeId: h,
        targetHandleId: l,
        position: c
      }), this.connection = null, this.requestUpdate();
    }, this.onNodeMouseEnter = (t) => {
      const e = t.target, i = ["flow-node", ...Object.values(this.nodeTypes)];
      let n = null;
      for (const s of i) {
        const r = e.closest(s);
        if (r && r.id && this.nodes.some((o) => o.id === r.id)) {
          n = r;
          break;
        }
      }
      n && !this.isHoveringNode && (this.isHoveringNode = !0, this.instance.setPanOnDrag(!1));
    }, this.onNodeMouseLeave = (t) => {
      const e = t.target, i = ["flow-node", ...Object.values(this.nodeTypes)];
      let n = null;
      for (const s of i) {
        const r = e.closest(s);
        if (r && r.id && this.nodes.some((o) => o.id === r.id)) {
          n = r;
          break;
        }
      }
      n && this.isHoveringNode && setTimeout(() => {
        const s = document.elementFromPoint(t.clientX, t.clientY);
        (!s || !(s instanceof HTMLElement) || !this.isElementNode(s)) && (this.isHoveringNode = !1, this.instance.setPanOnDrag(!0));
      }, 10);
    }, this.onNodeSelect = (t) => {
      const { nodeId: e, selected: i, node: n } = t.detail;
      this.instance.updateNode(e, { selected: i }), this.dispatchEvent(new CustomEvent("node-selected", {
        detail: {
          nodeId: e,
          selected: i,
          node: n,
          allSelectedNodes: this.nodes.filter((s) => s.selected)
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.onEdgeSelect = (t) => {
      const { edgeId: e, selected: i, edge: n } = t.detail;
      this.instance.updateEdge(e, { selected: i }), this.dispatchEvent(new CustomEvent("edge-selected", {
        detail: {
          edgeId: e,
          selected: i,
          edge: n,
          allSelectedEdges: this.edges.filter((s) => s.selected)
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.instance = new th({ nodes: this.nodes, edges: this.edges });
  }
  createRenderRoot() {
    return super.createRenderRoot();
  }
  getNodeGeom(t) {
    const e = this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`), i = this.renderRoot.querySelector(".flow-viewport");
    if (!e || !i) return null;
    const n = e.getBoundingClientRect(), s = i.getBoundingClientRect(), r = this.viewport.zoom || 1, o = (n.left - s.left - this.viewport.x) / r, a = (n.top - s.top - this.viewport.y) / r, h = n.width / r, l = n.height / r, c = a + l / 2;
    return { left: { x: o, y: c }, right: { x: o + h, y: c } };
  }
  /**
   * Get handle position in canvas coordinates
   */
  getHandleCanvasPosition(t, e) {
    const i = this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);
    if (!i) return null;
    let n = null;
    const s = i.shadowRoot;
    if (s && (n = s.querySelector(`[data-handle-id="${CSS.escape(e)}"]`)), n || (n = i.querySelector(`[data-handle-id="${CSS.escape(e)}"]`)), !n) return null;
    const r = this.nodes.find((d) => d.id === t);
    if (!r) return null;
    if (r.type === "shape")
      return this.getShapeHandlePosition(r, e);
    const o = i.getBoundingClientRect(), a = n.getBoundingClientRect(), h = this.viewport.zoom || 1, l = (a.left + a.width / 2 - o.left) / h, c = (a.top + a.height / 2 - o.top) / h;
    return {
      x: r.position.x + l,
      y: r.position.y + c
    };
  }
  /**
   * Get handle position for shape nodes based on shape size and handle type
   */
  getShapeHandlePosition(t, e) {
    const i = t.data;
    if (!i) return null;
    const n = i.size || { width: 200, height: 200 }, s = n.width, r = n.height, o = e.split("-"), a = o[o.length - 1];
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
    return {
      x: t.position.x + h,
      y: t.position.y + l
    };
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
    const i = this.nodes.find((w) => w.id === t), n = this.nodes.find((w) => w.id === e);
    if (!i || !n) return `${e}-target-left`;
    const s = i.position.x, r = i.position.y, o = n.position.x, a = n.position.y, h = n.data, l = h?.size?.width || 200, c = h?.size?.height || 200, d = s + (i.width || 150) / 2, u = r + (i.height || 50) / 2, p = o + l / 2, m = a + c / 2, y = p - d, _ = m - u;
    return Math.abs(y) > Math.abs(_) ? y > 0 ? `${e}-target-left` : `${e}-target-right` : _ > 0 ? `${e}-target-top` : `${e}-target-bottom`;
  }
  computeLabelCanvasPosition(t) {
    const e = this.nodes.find((l) => l.id === t.source), i = this.nodes.find((l) => l.id === t.target);
    if (!e || !i) return null;
    let n, s, r, o;
    if (t.sourceHandle) {
      const l = this.getHandleCanvasPosition(t.source, t.sourceHandle);
      if (l)
        n = l.x, s = l.y;
      else {
        const c = e.measured?.width || e.width || 150, d = e.measured?.height || e.height || 50;
        n = e.position.x + c, s = e.position.y + d / 2;
      }
    } else {
      const l = e.measured?.width || e.width || 150, c = e.measured?.height || e.height || 50;
      n = e.position.x + l, s = e.position.y + c / 2;
    }
    if (t.targetHandle) {
      const l = this.getHandleCanvasPosition(t.target, t.targetHandle);
      if (l)
        r = l.x, o = l.y;
      else {
        r = i.position.x;
        const c = i.measured?.height || i.height || 50;
        o = i.position.y + c / 2;
      }
    } else {
      r = i.position.x;
      const l = i.measured?.height || i.height || 50;
      o = i.position.y + l / 2;
    }
    const [, a, h] = ni({
      sourceX: n,
      sourceY: s,
      sourcePosition: M.Right,
      targetX: r,
      targetY: o,
      targetPosition: M.Left
    });
    return { x: a, y: h };
  }
  computeStartLabelCanvasPosition(t) {
    const e = this.nodes.find((s) => s.id === t.source);
    if (!e) return null;
    let i, n;
    if (t.sourceHandle) {
      const s = this.getHandleCanvasPosition(t.source, t.sourceHandle);
      if (s)
        i = s.x, n = s.y;
      else {
        const r = e.measured?.width || e.width || 150, o = e.measured?.height || e.height || 50;
        i = e.position.x + r, n = e.position.y + o / 2;
      }
    } else {
      const s = e.measured?.width || e.width || 150, r = e.measured?.height || e.height || 50;
      i = e.position.x + s, n = e.position.y + r / 2;
    }
    return { x: i + 12, y: n - 10 };
  }
  computeEndLabelCanvasPosition(t) {
    const e = this.nodes.find((s) => s.id === t.target);
    if (!e) return null;
    let i, n;
    if (t.targetHandle) {
      const s = this.getHandleCanvasPosition(t.target, t.targetHandle);
      if (s)
        i = s.x, n = s.y;
      else {
        const r = e.measured?.height || e.height || 50;
        i = e.position.x, n = e.position.y + r / 2;
      }
    } else {
      const s = e.measured?.height || e.height || 50;
      i = e.position.x, n = e.position.y + s / 2;
    }
    return { x: i - 12, y: n - 10 };
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector(".flow-container");
    t && (this.instance.mount(t), this.unsubscribe = this.instance.subscribe((e) => {
      this.nodes = e.nodes, this.edges = e.edges, this.viewport = e.viewport, this.requestUpdate();
    }), this.unsubscribeRenderComplete = this.instance.onRenderComplete((e) => {
      this.dispatchEvent(new CustomEvent("flow-render-complete", {
        bubbles: !0,
        composed: !0,
        cancelable: !1,
        detail: {
          instance: this.instance,
          nodes: e.nodes,
          edges: e.edges,
          nodeCount: e.nodes.length,
          edgeCount: e.edges.length
        }
      }));
    }), t.addEventListener("mousemove", this.onMouseMove), window.addEventListener("mouseup", this.onMouseUp), t.addEventListener("node-select", this.onNodeSelect), document.addEventListener("edge-select", this.onEdgeSelect), t.addEventListener("mouseenter", this.onNodeMouseEnter, !0), t.addEventListener("mouseleave", this.onNodeMouseLeave, !0), requestAnimationFrame(() => {
      const e = new CustomEvent("flow-ready", {
        bubbles: !0,
        composed: !0,
        cancelable: !1,
        detail: { instance: this.instance }
      });
      this.dispatchEvent(e);
    }));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribe?.(), this.unsubscribeRenderComplete?.(), this.instance.destroy();
    const t = this.renderRoot.querySelector(".flow-container");
    t?.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("mouseup", this.onMouseUp), t?.removeEventListener("node-select", this.onNodeSelect), document.removeEventListener("edge-select", this.onEdgeSelect), t?.removeEventListener("mouseenter", this.onNodeMouseEnter, !0), t?.removeEventListener("mouseleave", this.onNodeMouseLeave, !0);
  }
  /**
   * Renders a node with dynamic tag name based on node type
   * Falls back to 'flow-node' if type is not registered
   */
  renderNode(t) {
    const e = t.type || "default", i = this.nodeTypes[e] || "flow-node", n = ge(i);
    return W`
      <${n}
        .id=${t.id}
        .data=${t.data}
        .position=${t.position}
        .selected=${t.selected || !1}
        .draggable=${t.draggable !== !1}
        .connectable=${t.connectable !== !1}
        .resizable=${t.resizable || !1}
        .drag_handle_selector=${t.drag_handle_selector || null}
        .width=${t.width}
        .height=${t.height}
        .instance=${this.instance}
        @handle-start=${this.onHandleStart}
      ></${n}>
    `;
  }
  render() {
    const t = `translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;
    return W`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${kh({ transform: t })}
        >
          <div class="flow-nodes-layer">
            ${qt(this.nodes, (e) => e.id, (e) => this.renderNode(e))}
          </div>
          <div class="flow-edges-layer">
            ${qt(this.edges, (e) => e.id, (e) => {
      const i = this.nodes.find((s) => s.id === e.source), n = this.nodes.find((s) => s.id === e.target);
      return !i || !n ? null : W`
                <flow-edge 
                  .id=${e.id}
                  .source=${e.source}
                  .target=${e.target}
                  .sourceHandle=${e.sourceHandle}
                  .targetHandle=${e.targetHandle}
                  .sourceNode=${i}
                  .targetNode=${n}
                  .animated=${e.animated || !1}
                  .selectable=${e.selectable !== void 0 ? e.selectable : !0}
                  .label=${e.label || ""}
                  .type=${e.type || "default"}
                  .markerStart=${e.markerStart}
                  .markerEnd=${e.markerEnd}
                  .offset=${e.offset}
                  .pathStyle=${e.pathStyle}
                ></flow-edge>
              `;
    })}
            ${this.renderPreviewEdge()}
          </div>
          <div class="flow-labels-overlay">
            ${qt(this.edges, (e) => e.id, (e) => {
      const i = e.data && e.data.labelWidget, n = e.data && e.data.labelData, s = e.data && e.data.labelHtml, r = e.data && e.data.label;
      if (!(!!i || !!s || !!r)) return null;
      const a = this.computeLabelCanvasPosition(e);
      if (!a) return null;
      const h = `transform: translate(-50%, -50%) translate(${a.x}px, ${a.y}px);`;
      if (i) {
        const l = ge(i);
        return W`<div class="edge-label" style="${h}"><${l} .data=${n}></${l}></div>`;
      }
      return s ? W`<div class="edge-label" style="${h}" .innerHTML=${s}></div>` : W`<div class="edge-label" style="${h}">${r}</div>`;
    })}
            ${qt(this.edges, (e) => e.id, (e) => {
      const i = e.data && e.data.startLabelWidget, n = e.data && e.data.startLabelData, s = e.data && e.data.startLabelHtml, r = e.data && e.data.startLabel;
      if (!i && !s && !r) return null;
      const o = this.computeStartLabelCanvasPosition(e);
      if (!o) return null;
      const a = `transform: translate(-50%, -50%) translate(${o.x}px, ${o.y}px);`;
      if (i) {
        const h = ge(i);
        return W`<div class="edge-label" style="${a}"><${h} .data=${n}></${h}></div>`;
      }
      return s ? W`<div class="edge-label" style="${a}" .innerHTML=${s}></div>` : W`<div class="edge-label" style="${a}">${r}</div>`;
    })}
            ${qt(this.edges, (e) => e.id, (e) => {
      const i = e.data && e.data.endLabelWidget, n = e.data && e.data.endLabelData, s = e.data && e.data.endLabelHtml, r = e.data && e.data.endLabel;
      if (!i && !s && !r) return null;
      const o = this.computeEndLabelCanvasPosition(e);
      if (!o) return null;
      const a = `transform: translate(-50%, -50%) translate(${o.x}px, ${o.y}px);`;
      if (i) {
        const h = ge(i);
        return W`<div class="edge-label" style="${a}"><${h} .data=${n}></${h}></div>`;
      }
      return s ? W`<div class="edge-label" style="${a}" .innerHTML=${s}></div>` : W`<div class="edge-label" style="${a}">${r}</div>`;
    })}
          </div>
        </div>
        <slot></slot>
      </div>
    `;
  }
  screenToCanvas(t, e) {
    const i = this.renderRoot.querySelector(".flow-container");
    if (!i) return { x: t, y: e };
    const n = i.getBoundingClientRect(), s = this.viewport.x, r = this.viewport.y, o = this.viewport.zoom || 1;
    return { x: (t - n.left - s) / o, y: (e - n.top - r) / o };
  }
  isElementNode(t) {
    if (!t) return !1;
    const e = ["flow-node", ...Object.values(this.nodeTypes)];
    for (const i of e) {
      const n = t.closest(i);
      if (n && n.id)
        return this.nodes.some((s) => s.id === n.id);
    }
    return !1;
  }
  renderPreviewEdge() {
    if (!this.connection || !this.connection.preview) return null;
    const t = this.connection.preview, e = this.connection.from ? this.nodes.find((n) => n.id === this.connection.from.nodeId) : null, i = this.connection.to ? this.nodes.find((n) => n.id === this.connection.to.nodeId) : null;
    return e ? W`
        <flow-edge
          .id=${"preview"}
          .source=${e.id}
          .target=${"__preview__"}
          .sourceHandle=${this.connection.from?.handleId}
          .sourceNode=${{ ...e, position: e.position }}
          .targetNode=${{ id: "__preview__", position: { x: t.x, y: t.y }, width: 1, height: 1, data: {} }}
          .animated=${!0}
          .selectable=${!1}
          .label=${""}
        ></flow-edge>
      ` : i ? W`
        <flow-edge
          .id=${"preview"}
          .source=${"__preview__"}
          .target=${i.id}
          .sourceNode=${{ id: "__preview__", position: { x: t.x, y: t.y }, width: 1, height: 1, data: {} }}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{ ...i, position: i.position }}
          .animated=${!0}
          .selectable=${!1}
          .label=${""}
        ></flow-edge>
      ` : null;
  }
};
gt.styles = Y`
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
      z-index: 1;
    }

    .flow-edges-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
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

    .edge-label:has(*) {
      /* Remove default styling when custom widget is used */
      background: transparent;
      border: none;
      padding: 0;
    }
  `;
Nt([
  v({ type: Array })
], gt.prototype, "nodes", 2);
Nt([
  v({ type: Array })
], gt.prototype, "edges", 2);
Nt([
  v({ type: Object })
], gt.prototype, "viewport", 2);
Nt([
  v({ type: Object })
], gt.prototype, "onConnectStart", 2);
Nt([
  v({ type: Object })
], gt.prototype, "onConnectEnd", 2);
Nt([
  v({ type: Object })
], gt.prototype, "nodeTypes", 2);
gt = Nt([
  q("flow-canvas")
], gt);
var Th = Object.defineProperty, Lh = Object.getOwnPropertyDescriptor, Rt = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Lh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Th(e, i, s), s;
};
let mt = class extends F {
  constructor() {
    super(...arguments), this.visible = !1, this.minWidth = 10, this.minHeight = 10, this.maxWidth = Number.MAX_VALUE, this.maxHeight = Number.MAX_VALUE, this.keepAspectRatio = !1, this.isResizing = !1, this.resizeStart = { x: 0, y: 0, width: 0, height: 0 }, this.resizeHandle = "", this.handleMouseDown = (t) => {
      const e = t.target;
      let i = e.classList.contains("resize-handle");
      if (!i && e === this && (i = t.composedPath().some(
        (o) => o instanceof HTMLElement && o.classList.contains("resize-handle")
      )), !i) return;
      t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), this.isResizing = !0;
      const n = this.getRootNode().host;
      this.resizeStart = {
        x: t.clientX,
        y: t.clientY,
        width: n?.offsetWidth || 0,
        height: n?.offsetHeight || 0
      };
      let s = null;
      if (e.classList.contains("resize-handle") ? s = e : e === this && (s = t.composedPath().find(
        (o) => o instanceof HTMLElement && o.classList.contains("resize-handle")
      ) || null), s) {
        const r = Array.from(s.classList);
        this.resizeHandle = r.find((o) => o !== "resize-handle") || "";
      }
      document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp), this.dispatchEvent(new CustomEvent("resize-start", {
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
      const i = t.clientX - this.resizeStart.x, n = t.clientY - this.resizeStart.y;
      let s = this.resizeStart.width, r = this.resizeStart.height;
      switch (this.resizeHandle) {
        case "nw":
          s = this.resizeStart.width - i, r = this.resizeStart.height - n;
          break;
        case "ne":
          s = this.resizeStart.width + i, r = this.resizeStart.height - n;
          break;
        case "sw":
          s = this.resizeStart.width - i, r = this.resizeStart.height + n;
          break;
        case "se":
          s = this.resizeStart.width + i, r = this.resizeStart.height + n;
          break;
        case "n":
          r = this.resizeStart.height - n;
          break;
        case "s":
          r = this.resizeStart.height + n;
          break;
        case "w":
          s = this.resizeStart.width - i;
          break;
        case "e":
          s = this.resizeStart.width + i;
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
    return this.visible ? H`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    ` : H``;
  }
};
mt.styles = Y`
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
Rt([
  v({ type: Boolean, reflect: !0 })
], mt.prototype, "visible", 2);
Rt([
  v({ type: Number })
], mt.prototype, "minWidth", 2);
Rt([
  v({ type: Number })
], mt.prototype, "minHeight", 2);
Rt([
  v({ type: Number })
], mt.prototype, "maxWidth", 2);
Rt([
  v({ type: Number })
], mt.prototype, "maxHeight", 2);
Rt([
  v({ type: Boolean })
], mt.prototype, "keepAspectRatio", 2);
mt = Rt([
  q("node-resizer")
], mt);
var Dh = Object.defineProperty, Oh = Object.getOwnPropertyDescriptor, yt = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Oh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Dh(e, i, s), s;
};
let tt = class extends F {
  constructor() {
    super(...arguments), this.id = "", this.data = {}, this.position = { x: 0, y: 0 }, this.selected = !1, this.dragging = !1, this.draggable = !0, this.resizable = !1, this.isDragging = !1, this.dragStart = { x: 0, y: 0 }, this.nodeStart = { x: 0, y: 0 }, this.lastMeasured = null, this.handleWheel = (t) => {
      const e = t.composedPath();
      let i = null;
      for (const n of e)
        if (n instanceof Element && (i = this.findScrollableElement(n), i))
          break;
      if (i) {
        const n = t.deltaY < 0 && i.scrollTop > 0 || t.deltaY > 0 && i.scrollTop < i.scrollHeight - i.clientHeight, s = t.deltaX < 0 && i.scrollLeft > 0 || t.deltaX > 0 && i.scrollLeft < i.scrollWidth - i.clientWidth;
        (n || s) && t.stopPropagation();
      }
    }, this.handleClick = (t) => {
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
      const { width: e, height: i } = t.detail;
      this.instance && this.instance.updateNode(this.id, {
        width: e,
        height: i,
        measured: { width: e, height: i }
      });
    }, this.handleResizeEnd = (t) => {
      const { width: e, height: i } = t.detail;
      this.instance && this.instance.updateNode(this.id, {
        width: e,
        height: i,
        measured: { width: e, height: i }
      }), this.dispatchEvent(new CustomEvent("node-resize-end", {
        detail: {
          nodeId: this.id,
          width: e,
          height: i
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.handleMouseDown = (t) => {
      if (!this.draggable || t.button !== 0) return;
      const e = t.target;
      e.classList.contains("resize-handle") || e.tagName === "NODE-RESIZER" || e.closest("node-resizer") !== null || (t.preventDefault(), t.stopPropagation(), this.isDragging = !1, this.dragStart = { x: t.clientX, y: t.clientY }, this.nodeStart = { ...this.position }, document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp));
    }, this.handleMouseMove = (t) => {
      const e = t.clientX - this.dragStart.x, i = t.clientY - this.dragStart.y;
      if (!this.isDragging && (Math.abs(e) > 3 || Math.abs(i) > 3) && (this.isDragging = !0, this.dragging = !0, this.instance && this.instance.updateNode(this.id, { dragging: !0 })), this.isDragging && this.instance) {
        const n = this.instance.getViewport(), s = {
          x: this.nodeStart.x + e / n.zoom,
          y: this.nodeStart.y + i / n.zoom
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
    this.draggable && this.addEventListener("mousedown", this.handleMouseDown), this.addEventListener("click", this.handleClick), this.addEventListener("wheel", this.handleWheel, { passive: !1 }), this.resizable && (this.addEventListener("resize", this.handleResize), this.addEventListener("resize-end", this.handleResizeEnd)), this.updateMeasuredSize(), this.hasAttribute("data-measured") || this.setAttribute("data-measured", "");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mousedown", this.handleMouseDown), this.removeEventListener("click", this.handleClick), this.removeEventListener("wheel", this.handleWheel), this.resizable && (this.removeEventListener("resize", this.handleResize), this.removeEventListener("resize-end", this.handleResizeEnd)), this.cleanup();
  }
  /**
   * Find the nearest scrollable parent element
   */
  findScrollableElement(t) {
    if (!t || !(t instanceof HTMLElement)) return null;
    if (t.classList.contains("nowheel"))
      return t;
    const e = window.getComputedStyle(t), i = e.overflow + e.overflowX + e.overflowY;
    if ((i.includes("auto") || i.includes("scroll")) && (t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth))
      return t;
    const n = t.parentElement;
    return n && (n === this || n.closest("flow-node") === this || this.shadowRoot?.contains(n)) ? this.findScrollableElement(n) : null;
  }
  cleanup() {
    document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp);
  }
  render() {
    return H`
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
      ${this.resizable ? H`
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
    super.updated(t), this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`, this.updateMeasuredSize(), t.has("resizable");
  }
  updateMeasuredSize() {
    if (!this.instance) return;
    const t = this.getBoundingClientRect(), e = this.instance.getViewport().zoom || 1, i = t.width / e, n = t.height / e;
    (!this.lastMeasured || Math.abs(this.lastMeasured.width - i) > 0.5 || Math.abs(this.lastMeasured.height - n) > 0.5) && (this.lastMeasured = { width: i, height: n }, this.instance.updateNode(this.id, { measured: { width: i, height: n }, width: i, height: n }));
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
tt.styles = Y`
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
      /* Hidden until first measured + positioned, so the node never paints
         at its fallback size/origin before snapping into place. */
      visibility: hidden;
    }

    :host([data-measured]) {
      visibility: visible;
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
yt([
  v({ type: String, reflect: !0 })
], tt.prototype, "id", 2);
yt([
  v({ type: Object })
], tt.prototype, "data", 2);
yt([
  v({ type: Object })
], tt.prototype, "position", 2);
yt([
  v({ type: Boolean, reflect: !0 })
], tt.prototype, "selected", 2);
yt([
  v({ type: Boolean, reflect: !0 })
], tt.prototype, "dragging", 2);
yt([
  v({ type: Boolean })
], tt.prototype, "draggable", 2);
yt([
  v({ type: Object })
], tt.prototype, "instance", 2);
yt([
  v({ type: Boolean })
], tt.prototype, "resizable", 2);
tt = yt([
  q("flow-node")
], tt);
var Ih = Object.defineProperty, Bh = Object.getOwnPropertyDescriptor, U = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Bh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Ih(e, i, s), s;
};
let O = class extends F {
  constructor() {
    super(...arguments), this.id = "", this.source = "", this.target = "", this.animated = !1, this.selected = !1, this.selectable = !0, this.label = "", this.type = "default", this.markerHandleHalf = 5, this.hovering = !1, this._cachedSource = null, this._cachedTarget = null, this._handleRafId = null, this._lastPositionKey = "", this.handlePointerEnter = (t) => {
      t.stopPropagation(), this.emitHover(!0);
    }, this.handlePointerLeave = (t) => {
      t.stopPropagation(), this.emitHover(!1);
    };
  }
  /**
   * Convert style object to CSS string
   */
  convertStyleObjToString(t) {
    return Object.entries(t).filter(([e, i]) => i != null).map(([e, i]) => `${e.replace(/[A-Z]/g, (s) => `-${s.toLowerCase()}`)}:${i}`).join(";");
  }
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
      const l = e.width ?? 10, c = e.height ?? 10, d = (e.refX ?? l) + this.markerHandleHalf, u = e.refY ?? c / 2, p = e.color ?? "currentColor", m = e.orient ?? "auto";
      return `<marker id="${t}" markerWidth="${l}" markerHeight="${c}" refX="${d}" refY="${u}" orient="${m}" markerUnits="userSpaceOnUse"><path d="${e.path}" fill="${p}" stroke="${p}"/></marker>`;
    }
    const i = e.width ?? 10, n = e.height ?? 10, s = e.orient ?? "auto", r = e.color ?? "currentColor", o = (e.type === "ArrowClosed", i + this.markerHandleHalf), a = n / 2;
    if (e.type === "ArrowClosed") {
      const l = `M0,0 L${i},${a} L0,${n} Z`;
      return `<marker id="${t}" markerWidth="${i}" markerHeight="${n}" refX="${o}" refY="${a}" orient="${s}" markerUnits="userSpaceOnUse"><path d="${l}" fill="${r}"/></marker>`;
    }
    const h = `M0,0 L${i},${a} L0,${n}`;
    return `<marker id="${t}" markerWidth="${i}" markerHeight="${n}" refX="${o}" refY="${a}" orient="${s}" markerUnits="userSpaceOnUse"><path d="${h}" fill="none" stroke="${r}" stroke-width="2"/></marker>`;
  }
  /**
   * Normalize marker spec to a string key for caching
   */
  normalizeMarkerSpec(t) {
    if (t.type === "custom") {
      const { path: r, width: o = 20, height: a = 20, refX: h = 20, refY: l = 10, orient: c = "auto", color: d = "currentColor" } = t;
      return `custom|p=${r}|w=${o}|h=${a}|rx=${h}|ry=${l}|o=${c}|c=${d}`;
    }
    const { width: e = 20, height: i = 20, orient: n = "auto", color: s = "currentColor" } = t;
    return `builtin|${t.type}|w=${e}|h=${i}|o=${n}|c=${s}`;
  }
  /**
   * Simple hash function for generating unique IDs
   */
  hashString(t) {
    let e = 0;
    for (let i = 0; i < t.length; i++)
      e = (e << 5) - e + t.charCodeAt(i), e |= 0;
    return Math.abs(e).toString(36);
  }
  /**
   * Get path based on edge type
   */
  getPathForType(t, e) {
    let i = t.x, n = t.y, s = e.x, r = e.y;
    const o = t.position, a = e.position;
    switch (this.offset !== void 0 && (this.type === "smoothstep" || this.type === "step") && (Math.abs(s - i) > Math.abs(r - n) ? (n += this.offset, r += this.offset) : (i += this.offset, s += this.offset)), this.type) {
      case "straight":
        return Nh({
          sourceX: i,
          sourceY: n,
          targetX: s,
          targetY: r
        });
      case "smoothstep":
        return dn({
          sourceX: i,
          sourceY: n,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a
        });
      case "step":
        return dn({
          sourceX: i,
          sourceY: n,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a,
          borderRadius: 0
          // Step edges have no border radius
        });
      case "simplebezier":
        return ni({
          sourceX: i,
          sourceY: n,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a,
          curvature: 0.5
          // Simple bezier with fixed curvature
        });
      case "default":
      default:
        return ni({
          sourceX: i,
          sourceY: n,
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
    const i = this.getFlowCanvasRoot();
    if (!i) return null;
    const n = i.querySelector(`[id="${CSS.escape(t)}"]`);
    if (!n) return null;
    const s = n.shadowRoot;
    let r = null;
    return s && (r = s.querySelector(`[data-handle-id="${CSS.escape(e)}"]`)), r || (r = n.querySelector(`[data-handle-id="${CSS.escape(e)}"]`)), r;
  }
  /**
   * Get the canvas coordinates of a specific handle
   */
  getHandlePosition(t, e) {
    const i = this.findHandleElement(t, e);
    if (!i) return null;
    const n = this.getFlowCanvasRoot();
    if (!n) return null;
    const s = n.querySelector(`[id="${CSS.escape(t)}"]`);
    if (!s) return null;
    const r = s.getBoundingClientRect(), o = i.getBoundingClientRect(), a = this.sourceNode?.id === t ? this.sourceNode : this.targetNode;
    if (!a) return null;
    a.measured?.width || a.width, a.measured?.height || a.height;
    const c = (this.getFlowCanvasHost()?.viewport || { zoom: 1 }).zoom || 1, d = (o.left + o.width / 2 - r.left) / c, u = (o.top + o.height / 2 - r.top) / c;
    return {
      x: a.position.x + d,
      y: a.position.y + u
    };
  }
  /**
   * Get the source position (handle or node edge)
   */
  getSourcePosition() {
    if (this.sourceHandle && this.sourceNode) {
      const i = this.getHandlePosition(this.sourceNode.id, this.sourceHandle);
      if (i)
        return { ...i, position: M.Right };
    }
    const t = this.sourceNode.measured?.width || this.sourceNode.width || 150, e = this.sourceNode.measured?.height || this.sourceNode.height || 50;
    return {
      x: this.sourceNode.position.x + t,
      y: this.sourceNode.position.y + e / 2,
      position: M.Right
    };
  }
  /**
   * Get the target position (handle or node edge)
   */
  getTargetPosition() {
    if (this.targetHandle && this.targetNode) {
      const e = this.getHandlePosition(this.targetNode.id, this.targetHandle);
      if (e)
        return { ...e, position: M.Left };
    }
    const t = this.targetNode.measured?.height || this.targetNode.height || 50;
    return {
      x: this.targetNode.position.x,
      y: this.targetNode.position.y + t / 2,
      position: M.Left
    };
  }
  /**
   * Node-only source position (no DOM reads). Use during render when using handles.
   */
  getSourcePositionNodeOnly() {
    const t = this.sourceNode.measured?.width || this.sourceNode.width || 150, e = this.sourceNode.measured?.height || this.sourceNode.height || 50;
    return {
      x: this.sourceNode.position.x + t,
      y: this.sourceNode.position.y + e / 2,
      position: M.Right
    };
  }
  /**
   * Node-only target position (no DOM reads). Use during render when using handles.
   */
  getTargetPositionNodeOnly() {
    const t = this.targetNode.measured?.height || this.targetNode.height || 50;
    return {
      x: this.targetNode.position.x,
      y: this.targetNode.position.y + t / 2,
      position: M.Left
    };
  }
  /**
   * Resolve source/target for render. Uses node-only positions when handles are
   * used (avoids getBoundingClientRect during render). Cached handle positions
   * are applied after rAF in updated().
   */
  getPositionsForRender() {
    if (!!(this.sourceHandle || this.targetHandle)) {
      const e = this._cachedSource ?? this.getSourcePositionNodeOnly(), i = this._cachedTarget ?? this.getTargetPositionNodeOnly();
      return { source: e, target: i };
    }
    return {
      source: this.getSourcePosition(),
      target: this.getTargetPosition()
    };
  }
  getPositionCacheKey() {
    const t = this.sourceNode, e = this.targetNode;
    return !t || !e ? "" : [
      this.id,
      this.sourceHandle,
      this.targetHandle,
      t.position.x,
      t.position.y,
      e.position.x,
      e.position.y,
      // Include measured size so cached handle positions refresh when a node
      // is (re)measured (e.g. content grows), not just when it moves.
      t.measured?.width,
      t.measured?.height,
      e.measured?.width,
      e.measured?.height
    ].join("|");
  }
  /** True for the live connection-preview edge, which must always render. */
  get isPreview() {
    return this.id === "preview";
  }
  /**
   * An endpoint is "known" once we have a real size for it — either a measured
   * size or an explicit width. Until then the edge would have to guess (150x50)
   * and visibly snap when the real size arrives, so we hold off rendering.
   */
  endpointKnown(t) {
    return t ? t.type === "shape" || t.data?.size ? !0 : t.measured?.width != null || typeof t.width == "number" : !1;
  }
  updated(t) {
    if (super.updated?.(t), !this.sourceNode || !this.targetNode || !!!(this.sourceHandle || this.targetHandle)) return;
    const i = this.getPositionCacheKey();
    i !== this._lastPositionKey && (this._lastPositionKey = i, this._cachedSource = null, this._cachedTarget = null), !(this._cachedSource != null && this._cachedTarget != null) && this._handleRafId == null && (this._handleRafId = requestAnimationFrame(() => {
      this._handleRafId = null, this._cachedSource = this.getSourcePosition(), this._cachedTarget = this.getTargetPosition(), this.requestUpdate();
    }));
  }
  disconnectedCallback() {
    this._handleRafId != null && (cancelAnimationFrame(this._handleRafId), this._handleRafId = null), super.disconnectedCallback?.();
  }
  render() {
    if (!this.sourceNode || !this.targetNode)
      return H``;
    if (!this.isPreview) {
      const m = !!(this.sourceHandle || this.targetHandle), y = this.endpointKnown(this.sourceNode) && this.endpointKnown(this.targetNode), _ = !m || this._cachedSource != null && this._cachedTarget != null;
      if (!y || !_)
        return H``;
    }
    const { source: t, target: e } = this.getPositionsForRender(), [i, n, s, r, o] = this.getPathForType(t, e), a = [
      "edge-path",
      this.selectable && "selectable",
      this.animated && "animated",
      this.selected && "selected"
    ].filter(Boolean).join(" "), h = this.getMarkerId(this.markerStart), l = this.getMarkerId(this.markerEnd), c = h ? `url(#${h})` : void 0, d = l ? `url(#${l})` : void 0, u = this.animated ? "5" : "", p = this.pathStyle ? typeof this.pathStyle == "string" ? this.pathStyle : this.convertStyleObjToString(this.pathStyle) : "";
    return H`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${h && typeof this.markerStart == "object" ? J`<marker id="${h}" markerWidth="${this.markerStart.width || 10}" markerHeight="${this.markerStart.height || 10}" refX="${((this.markerStart.type === "custom" ? this.markerStart.refX : void 0) || this.markerStart.width || 10) + this.markerHandleHalf}" refY="${(this.markerStart.type === "custom" ? this.markerStart.refY : void 0) || (this.markerStart.height || 10) / 2}" orient="${this.markerStart.orient || "auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type === "custom" ? J`<path d="${this.markerStart.path}" fill="${this.markerStart.color || "currentColor"}" stroke="${this.markerStart.color || "currentColor"}"/>` : this.markerStart.type === "ArrowClosed" ? J`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10} Z" fill="${this.markerStart.color || "currentColor"}"/>` : J`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10}" fill="none" stroke="${this.markerStart.color || "currentColor"}" stroke-width="2"/>`}
            </marker>` : ""}
          ${l && typeof this.markerEnd == "object" ? J`<marker id="${l}" markerWidth="${this.markerEnd.width || 10}" markerHeight="${this.markerEnd.height || 10}" refX="${((this.markerEnd.type === "custom" ? this.markerEnd.refX : void 0) || this.markerEnd.width || 10) + this.markerHandleHalf}" refY="${(this.markerEnd.type === "custom" ? this.markerEnd.refY : void 0) || (this.markerEnd.height || 10) / 2}" orient="${this.markerEnd.orient || "auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type === "custom" ? J`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color || "currentColor"}" stroke="${this.markerEnd.color || "currentColor"}"/>` : this.markerEnd.type === "ArrowClosed" ? J`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10} Z" fill="${this.markerEnd.color || "currentColor"}"/>` : J`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10}" fill="none" stroke="${this.markerEnd.color || "currentColor"}" stroke-width="2"/>`}
            </marker>` : ""}
        </defs>
        ${J`
          <path 
            class="${a}"
            d="${i}"
            style="${p}"
            stroke-dasharray="${u}"
            marker-start="${c ?? ""}"
            marker-end="${d ?? ""}"
            @click=${this.selectable ? this.handleClick : void 0}
            @pointerenter=${this.handlePointerEnter}
            @pointerleave=${this.handlePointerLeave}
          />
          ${this.label ? J`
            <text 
              x="${n}" 
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
    if (t.stopPropagation(), !this.selectable)
      return;
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
  emitHover(t) {
    this.hovering !== t && (this.hovering = t, this.dispatchEvent(new CustomEvent("edge-hover", {
      detail: {
        edgeId: this.id,
        hovered: t,
        edge: {
          id: this.id,
          source: this.source,
          target: this.target,
          sourceHandle: this.sourceHandle,
          targetHandle: this.targetHandle,
          label: this.label,
          animated: this.animated,
          selected: this.selected,
          type: this.type,
          markerStart: this.markerStart,
          markerEnd: this.markerEnd,
          offset: this.offset,
          pathStyle: this.pathStyle
        }
      },
      bubbles: !0,
      composed: !0
    })));
  }
};
O.styles = Y`
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
      pointer-events: stroke;
    }

    .edge-path.selectable {
      cursor: pointer;
    }

    .edge-path:not(.selectable) {
      cursor: default;
    }

    .edge-path.selectable:hover {
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
U([
  v({ type: String })
], O.prototype, "id", 2);
U([
  v({ type: String })
], O.prototype, "source", 2);
U([
  v({ type: String })
], O.prototype, "target", 2);
U([
  v({ type: String })
], O.prototype, "sourceHandle", 2);
U([
  v({ type: String })
], O.prototype, "targetHandle", 2);
U([
  v({ type: Object })
], O.prototype, "sourceNode", 2);
U([
  v({ type: Object })
], O.prototype, "targetNode", 2);
U([
  v({ type: Boolean })
], O.prototype, "animated", 2);
U([
  v({ type: Boolean })
], O.prototype, "selected", 2);
U([
  v({ type: Boolean })
], O.prototype, "selectable", 2);
U([
  v({ type: String })
], O.prototype, "label", 2);
U([
  v({ type: String })
], O.prototype, "type", 2);
U([
  v({ type: Object })
], O.prototype, "markerStart", 2);
U([
  v({ type: Object })
], O.prototype, "markerEnd", 2);
U([
  v({ type: Number })
], O.prototype, "offset", 2);
U([
  v({ type: Object })
], O.prototype, "pathStyle", 2);
O = U([
  q("flow-edge")
], O);
var Fh = Object.defineProperty, Uh = Object.getOwnPropertyDescriptor, he = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Uh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Fh(e, i, s), s;
};
let At = class extends F {
  constructor() {
    super(...arguments), this.variant = "dots", this.gap = 20, this.color = "#ddd", this.size = 1;
  }
  render() {
    const t = `flow-bg-pattern-${Math.random().toString(36).substr(2, 9)}`;
    return H`
      <svg>
        <defs>
          ${this.variant === "dots" ? this.renderDotsPattern(t) : this.renderLinesPattern(t)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${t})" />
      </svg>
    `;
  }
  renderDotsPattern(t) {
    return J`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `;
  }
  renderLinesPattern(t) {
    return J`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `;
  }
};
At.styles = Y`
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
he([
  v({ type: String })
], At.prototype, "variant", 2);
he([
  v({ type: Number })
], At.prototype, "gap", 2);
he([
  v({ type: String })
], At.prototype, "color", 2);
he([
  v({ type: Number })
], At.prototype, "size", 2);
At = he([
  q("flow-background")
], At);
var Xh = Object.defineProperty, Yh = Object.getOwnPropertyDescriptor, _i = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Yh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Xh(e, i, s), s;
};
let re = class extends F {
  constructor() {
    super(...arguments), this.width = 200, this.height = 150;
  }
  render() {
    return H`
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `;
  }
};
re.styles = Y`
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
_i([
  v({ type: Number })
], re.prototype, "width", 2);
_i([
  v({ type: Number })
], re.prototype, "height", 2);
re = _i([
  q("flow-minimap")
], re);
var Wh = Object.defineProperty, Zh = Object.getOwnPropertyDescriptor, ts = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Zh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Wh(e, i, s), s;
};
let Ae = class extends F {
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
    return H`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `;
  }
};
Ae.styles = Y`
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
ts([
  v({ type: Object })
], Ae.prototype, "instance", 2);
Ae = ts([
  q("flow-controls")
], Ae);
var qh = Object.getOwnPropertyDescriptor, Vh = Object.getPrototypeOf, jh = Reflect.get, Gh = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? qh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(s) || s);
  return s;
}, qe = (t, e, i) => jh(Vh(t), i, e);
let ut = class extends tt {
  constructor() {
    super(...arguments), this.appliedInitialSize = !1;
  }
  firstUpdated() {
    const t = this.data, e = t?.size?.width, i = t?.size?.height;
    (typeof e == "number" && e > 0 || typeof i == "number" && i > 0) && (typeof e == "number" && e > 0 && (this.style.width = `${e}px`), typeof i == "number" && i > 0 && (this.style.minHeight = `${i}px`), this.instance && this.instance.updateNode(this.id, {
      width: typeof e == "number" && e > 0 ? e : this.width,
      // Store an initial height hint, but allow the DOM to grow beyond it.
      height: typeof i == "number" && i > 0 ? i : this.height
    }), this.appliedInitialSize = !0), super.firstUpdated();
  }
  updated(t) {
    super.updated(t);
  }
  onFieldHandleMouseDown(t, e) {
    return (i) => {
      i.stopPropagation(), i.preventDefault();
      const n = `${this.id}-${t}-${e}`;
      this.dispatchEvent(new CustomEvent("handle-start", {
        detail: {
          nodeId: this.id,
          type: e === "left" ? "target" : "source",
          handleId: n,
          fieldName: t
        },
        bubbles: !0,
        composed: !0
      }));
    };
  }
  render() {
    const t = this.data, e = t?.tableName || "Table", i = t?.fields || [];
    return H`
      <div class="table-header" style="${t.color ? `background: ${t.color}` : ""}">
        <span class="table-icon">📊</span>
        <span>${e}</span>
      </div>
      
      <div class="table-body nowheel">
        ${i.map((n) => H`
          <div class="field-row" data-field="${n.name}">
            <div class="field-key">
              ${n.key || ""}
            </div>
            <div class="field-name">${n.name}</div>
            <div class="field-type">${n.type}</div>
            <div class="field-nullable">
              ${n.nullable ? "NULL" : ""}
            </div>
            
            <!-- Left handle (input) for this field -->
            <div 
              class="field-handle left"
              data-handle="target"
              data-field="${n.name}"
              data-handle-id="${this.id}-${n.name}-left"
              @mousedown=${this.onFieldHandleMouseDown(n.name, "left")}
            ></div>
            
            <!-- Right handle (output) for this field -->
            <div 
              class="field-handle right"
              data-handle="source"
              data-field="${n.name}"
              data-handle-id="${this.id}-${n.name}-right"
              @mousedown=${this.onFieldHandleMouseDown(n.name, "right")}
            ></div>
          </div>
        `)}
      </div>
      ${this.resizable ? H`
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
  ...Array.isArray(qe(ut, ut, "styles")) ? qe(ut, ut, "styles") : [qe(ut, ut, "styles")],
  Y`
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
        /* Prevent panning when scrolling inside the table body */
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
ut = Gh([
  q("erd-table-node")
], ut);
const Kh = [
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
], Qh = [
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
], Jh = [
  {
    type: "heart",
    name: "Heart",
    category: "symbolic",
    path: "M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",
    viewBox: "0 0 200 200",
    defaultSize: { width: 200, height: 200 },
    centerPoint: { x: 100, y: 100 }
  }
], zi = class zi {
  /**
   * Initialize the registry with default shapes
   */
  static initialize() {
    [...Kh, ...Qh, ...Jh].forEach((i) => {
      this.shapes.set(i.type, i);
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
    return Array.from(this.shapes.values()).filter((i) => i.category === e);
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
zi.shapes = /* @__PURE__ */ new Map();
let Ne = zi;
Ne.initialize();
var tl = Object.defineProperty, el = Object.getOwnPropertyDescriptor, ct = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? el(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && tl(e, i, s), s;
};
let et = class extends F {
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
      const { width: e, height: i } = t.detail;
      if (this.data && this.instance) {
        const n = {
          ...this.data,
          size: { width: e, height: i }
        };
        this.instance.updateNode(this.id, {
          data: n,
          width: e,
          height: i,
          measured: { width: e, height: i }
        });
      }
    }, this.handleResizeEnd = (t) => {
      const { width: e, height: i } = t.detail;
      if (this.data && this.instance) {
        const n = {
          ...this.data,
          size: { width: e, height: i }
        };
        this.instance.updateNode(this.id, {
          data: n,
          width: e,
          height: i,
          measured: { width: e, height: i }
        });
      }
      this.dispatchEvent(new CustomEvent("node-resize-end", {
        detail: {
          nodeId: this.id,
          width: e,
          height: i
        },
        bubbles: !0,
        composed: !0
      }));
    }, this.handleMouseDown = (t) => {
      if (!this.draggable || t.button !== 0) return;
      const e = t.target;
      e.classList.contains("resize-handle") || e.tagName === "NODE-RESIZER" || e.closest("node-resizer") !== null || (t.preventDefault(), t.stopPropagation(), this.isDragging = !1, this.dragStart = { x: t.clientX, y: t.clientY }, this.nodeStart = { ...this.position }, document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp));
    }, this.handleMouseMove = (t) => {
      const e = t.clientX - this.dragStart.x, i = t.clientY - this.dragStart.y;
      if (!this.isDragging && (Math.abs(e) > 3 || Math.abs(i) > 3) && (this.isDragging = !0, this.instance && this.instance.updateNode(this.id, { dragging: !0 })), this.isDragging && this.instance) {
        const n = this.instance.getViewport(), s = {
          x: this.nodeStart.x + e / n.zoom,
          y: this.nodeStart.y + i / n.zoom
        };
        this.instance.updateNode(this.id, { position: s });
      }
    }, this.handleMouseUp = () => {
      this.isDragging && this.instance && this.instance.updateNode(this.id, { dragging: !1 }), this.isDragging = !1, this.cleanup();
    }, this.handleHandleStart = (t) => {
      t.stopPropagation(), this.isDragging = !1;
      const e = t.target, i = e.dataset.handleId, n = e.dataset.handleType;
      n && i && this.dispatchEvent(new CustomEvent("handle-start", {
        detail: {
          nodeId: this.id,
          handleId: i,
          handleType: n,
          position: this.position
        },
        bubbles: !0,
        composed: !0
      }));
    };
  }
  updated(t) {
    super.updated(t), t.has("position") && this.isDragging, t.has("resizable");
  }
  /**
   * Get the shape definition from the registry
   */
  getShapeDefinition() {
    if (this.data?.type)
      return Ne.get(this.data.type);
  }
  /**
   * Render the SVG shape
   */
  renderShape() {
    const t = this.getShapeDefinition();
    if (!t)
      return H`
        <div class="unknown-shape">
          Unknown shape: ${this.data?.type || "undefined"}
        </div>
      `;
    const e = this.data, i = e.size || t.defaultSize, n = e.backgroundColor || e.color || "#ffffff", s = e.strokeColor || "#000000", r = e.strokeWidth || 2, o = e.rotation || 0;
    return H`
      <svg 
        class="shape-svg"
        width="${i.width}" 
        height="${i.height}" 
        viewBox="${t.viewBox}"
        style="transform: rotate(${o}deg)"
      >
        <path 
          d="${t.path}" 
          fill="${n}"
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
      const e = `gradient-${this.data.type}-${Math.random().toString(36).substr(2, 9)}`, i = t.gradient;
      if (i.type === "linear")
        return H`
          <defs>
            <linearGradient id="${e}" x1="0%" y1="0%" x2="100%" y2="100%">
              ${i.colors.map(
          (n, s) => H`<stop offset="${s / (i.colors.length - 1) * 100}%" stop-color="${n}"/>`
        )}
            </linearGradient>
          </defs>
        `;
      if (i.type === "radial")
        return H`
          <defs>
            <radialGradient id="${e}" cx="50%" cy="50%" r="50%">
              ${i.colors.map(
          (n, s) => H`<stop offset="${s / (i.colors.length - 1) * 100}%" stop-color="${n}"/>`
        )}
            </radialGradient>
          </defs>
        `;
    }
    return H``;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this.handleClick), this.addEventListener("mousedown", this.handleMouseDown), this.resizable && (this.addEventListener("resize", this.handleResize), this.addEventListener("resize-end", this.handleResizeEnd));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this.handleClick), this.removeEventListener("mousedown", this.handleMouseDown), this.resizable && (this.removeEventListener("resize", this.handleResize), this.removeEventListener("resize-end", this.handleResizeEnd)), this.cleanup();
  }
  firstUpdated() {
    this.hasAttribute("data-measured") || this.setAttribute("data-measured", "");
  }
  cleanup() {
    document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp);
  }
  render() {
    this.style.setProperty("--position-x", `${this.position.x}px`), this.style.setProperty("--position-y", `${this.position.y}px`);
    const t = this.getShapeDefinition(), i = this.data?.size || t?.defaultSize || { width: 200, height: 200 };
    return this.style.setProperty("--shape-width", `${i.width}px`), this.style.setProperty("--shape-height", `${i.height}px`), H`
      <div class="shape-node ${this.selected ? "selected" : ""}">
        ${this.renderGradients()}
        ${this.renderShape()}
        <div class="shape-content">
          <slot></slot>
        </div>
        ${this.connectable ? this.renderHandles() : ""}
        ${this.renderLabel()}
      </div>
      ${this.resizable ? H`
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
    return H`
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
    return H`
      <div class="shape-label">
        ${e}
      </div>
    `;
  }
};
et.styles = Y`
    :host {
      position: absolute;
      display: block;
      pointer-events: auto;
      transform-origin: 0 0;
      will-change: transform;
      transform: translate(var(--position-x, 0px), var(--position-y, 0px));
      /* Hidden until the first render has applied position + size. */
      visibility: hidden;
    }

    :host([data-measured]) {
      visibility: visible;
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
  v({ type: String, reflect: !0 })
], et.prototype, "id", 2);
ct([
  v({ type: Object })
], et.prototype, "data", 2);
ct([
  v({
    type: Object,
    hasChanged: (t, e) => !e || t.x !== e.x || t.y !== e.y
  })
], et.prototype, "position", 2);
ct([
  v({ type: Boolean, reflect: !0 })
], et.prototype, "selected", 2);
ct([
  v({ type: Boolean, reflect: !0 })
], et.prototype, "dragging", 2);
ct([
  v({ type: Boolean })
], et.prototype, "draggable", 2);
ct([
  v({ type: Boolean })
], et.prototype, "connectable", 2);
ct([
  v({ type: Object })
], et.prototype, "instance", 2);
ct([
  v({ type: Boolean })
], et.prototype, "resizable", 2);
et = ct([
  q("shape-node")
], et);
var il = Object.getOwnPropertyDescriptor, le = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? il(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(s) || s);
  return s;
};
let si = class extends F {
  render() {
    return H`<slot></slot>`;
  }
};
si.styles = Y`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;
si = le([
  q("base-node")
], si);
let ri = class extends F {
  render() {
    return H`<slot></slot>`;
  }
};
ri.styles = Y`
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
ri = le([
  q("base-node-header")
], ri);
let oi = class extends F {
  render() {
    return H`<span class="title"><slot></slot></span>`;
  }
};
oi.styles = Y`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;
oi = le([
  q("base-node-header-title")
], oi);
let ai = class extends F {
  render() {
    return H`<slot></slot>`;
  }
};
ai.styles = Y`
    :host {
      display: block;
      padding: 12px;
    }
  `;
ai = le([
  q("base-node-content")
], ai);
let hi = class extends F {
  render() {
    return H`<slot></slot>`;
  }
};
hi.styles = Y`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;
hi = le([
  q("base-node-footer")
], hi);
var nl = Object.defineProperty, I = (t, e, i, n) => {
  for (var s = void 0, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(e, i, s) || s);
  return s && nl(e, i, s), s;
};
const fl = (t) => {
  class e extends t {
    constructor() {
      super(...arguments), this.id = "", this.position = { x: 0, y: 0 }, this.data = {}, this.selected = !1, this.dragging = !1, this.instance = null, this.resizable = !1, this.draggable = !0, this.drag_handle_selector = null, this.connectable = !0, this.minWidth = 10, this.maxWidth = Number.MAX_VALUE, this.minHeight = 10, this.maxHeight = Number.MAX_VALUE, this.keepAspectRatio = !1, this.maxInitialHeight = 0, this.width = void 0, this.height = void 0, this.isDragging = !1, this.dragStart = { x: 0, y: 0 }, this.nodeStart = { x: 0, y: 0 }, this.isResizing = !1, this.resizeStart = { x: 0, y: 0, width: 0, height: 0 }, this.resizeHandle = "", this.lastMeasured = null, this.resizeObserver = null, this.dragHandleElement = null, this.handleClick = (n) => {
        if (n.stopPropagation(), !this.isDragging) {
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
      }, this.handleWheel = (n) => {
        const s = n.composedPath();
        let r = null;
        for (const o of s)
          if (o instanceof Element && (r = this.findScrollableElement(o), r))
            break;
        if (r) {
          const o = n.deltaY < 0 && r.scrollTop > 0 || n.deltaY > 0 && r.scrollTop < r.scrollHeight - r.clientHeight, a = n.deltaX < 0 && r.scrollLeft > 0 || n.deltaX > 0 && r.scrollLeft < r.scrollWidth - r.clientWidth;
          (o || a) && n.stopPropagation();
        }
      }, this.handleMouseDown = (n) => {
        if (n.button !== 0) return;
        const s = n.target;
        if (s.classList.contains("resize-handle") || s.closest(".resize-handle") !== null) {
          this.handleResizeStart(n);
          return;
        }
        this.draggable && (n.preventDefault(), n.stopPropagation(), this.isDragging = !1, this.dragStart = { x: n.clientX, y: n.clientY }, this.nodeStart = { ...this.position }, document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp));
      }, this.handleMouseMove = (n) => {
        if (this.isResizing) {
          this.handleResizeMove(n);
          return;
        }
        const s = n.clientX - this.dragStart.x, r = n.clientY - this.dragStart.y;
        if (!this.isDragging && (Math.abs(s) > 3 || Math.abs(r) > 3) && (this.isDragging = !0, this.dragging = !0, this.dragHandleElement && (this.dragHandleElement.style.cursor = "grabbing"), this.instance && this.instance.updateNode(this.id, { dragging: !0 })), this.isDragging && this.instance) {
          const o = this.instance.getViewport(), a = {
            x: this.nodeStart.x + s / o.zoom,
            y: this.nodeStart.y + r / o.zoom
          };
          this.instance.updateNode(this.id, { position: a });
        }
      }, this.handleMouseUp = () => {
        this.isDragging && this.instance && this.instance.updateNode(this.id, { dragging: !1 }), this.dragHandleElement && this.isDragging && (this.dragHandleElement.style.cursor = "grab"), this.isResizing && this.handleResizeEnd(), this.cleanup(), setTimeout(() => {
          this.isDragging = !1, this.dragging = !1, this.isResizing = !1;
        }, 50);
      }, this.handleResizeStart = (n, s) => {
        n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation(), this.isResizing = !0;
        const r = this.getBoundingClientRect(), o = getComputedStyle(this);
        let a = parseFloat(o.width), h = parseFloat(o.height);
        if ((!a || a === 0) && (a = r.width), (!h || h === 0) && (h = r.height), this.resizeStart = {
          x: n.clientX,
          y: n.clientY,
          width: a,
          height: h
        }, s)
          this.resizeHandle = s;
        else {
          let l = n.target;
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
      }, this.handleResizeMove = (n) => {
        if (!this.isResizing) return;
        const s = n.clientX - this.resizeStart.x, r = n.clientY - this.resizeStart.y;
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
      }, this.handleGlobalClick = (n) => {
        n.target.closest(this.tagName.toLowerCase()) !== null || this.selected && (this.selected = !1, this.instance && this.instance.updateNode(this.id, { selected: !1 }), this.dispatchEvent(new CustomEvent("node-deselect", {
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
      }, this.handleResizeHandleClick = (n) => (s) => {
        s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), this.handleResizeStart(s, n);
      };
    }
    static get styles() {
      return [Y`
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
        /* Hidden until first measured + positioned, so the node never paints
           at its fallback size/origin before snapping into place. */
        visibility: hidden;
      }

      :host([data-measured]) {
        visibility: visible;
      }

      /* When drag_handle_selector is set, default cursor is normal (not grab) */
      :host([data-drag-handle-selector]) {
        cursor: default;
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
      super.connectedCallback(), this.draggable && !this.drag_handle_selector && this.addEventListener("mousedown", this.handleMouseDown), this.addEventListener("click", this.handleClick), this.addEventListener("wheel", this.handleWheel, { passive: !1 }), document.addEventListener("click", this.handleGlobalClick), !this.resizeObserver && typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => {
        this.isResizing || this.updateMeasuredSize();
      }), this.resizeObserver.observe(this));
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this.removeEventListener("mousedown", this.handleMouseDown), this.removeEventListener("click", this.handleClick), this.removeEventListener("wheel", this.handleWheel), document.removeEventListener("click", this.handleGlobalClick), this.removeDragHandleListener(), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.cleanup();
    }
    /**
     * Find the nearest scrollable parent element
     */
    findScrollableElement(n) {
      if (!n || !(n instanceof HTMLElement)) return null;
      if (n.classList.contains("nowheel"))
        return n;
      const s = window.getComputedStyle(n), r = s.overflow + s.overflowX + s.overflowY;
      if ((r.includes("auto") || r.includes("scroll")) && (n.scrollHeight > n.clientHeight || n.scrollWidth > n.clientWidth))
        return n;
      const o = n.parentElement;
      return o && (o === this || this.shadowRoot?.contains(o)) ? this.findScrollableElement(o) : null;
    }
    cleanup() {
      document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp);
    }
    /**
     * Renders the resizer handles and border when the node is resizable and selected
     * This is now called automatically by the mixin's render method
     */
    renderResizer() {
      return !this.resizable || !this.selected ? H`` : H`
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
    /**
     * Helper method to get just the resizer HTML
     * Use this in components that override render() method
     */
    getResizer() {
      return this.renderResizer();
    }
    /**
     * Automatically append resizer to DOM after rendering
     * This works even when components override render() method
     */
    firstUpdated() {
      this.appendResizerToDOM(), this.drag_handle_selector && this.setAttribute("data-drag-handle-selector", ""), typeof this.width == "number" && this.width > 0 && (this.style.width = `${this.width}px`), typeof this.height == "number" && this.height > 0 && (this.style.height = `${this.height}px`), Promise.resolve().then(() => {
        this.attachDragHandleListener(), this.adjustHeightToContent(), this.updateMeasuredSize(), this.reveal();
      });
    }
    /** Make the node visible once it has been measured and positioned. */
    reveal() {
      this.hasAttribute("data-measured") || this.setAttribute("data-measured", "");
    }
    updated(n) {
      super.updated(n), this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`, n.has("width") && (typeof this.width == "number" && this.width > 0 ? this.style.width = `${this.width}px` : this.style.width = ""), n.has("height") && (typeof this.height == "number" && this.height > 0 ? this.style.height = `${this.height}px` : this.style.height = ""), n.has("maxInitialHeight") && !this.isResizing && Promise.resolve().then(() => {
        this.adjustHeightToContent();
      }), (n.has("resizable") || n.has("selected")) && this.appendResizerToDOM(), (n.has("drag_handle_selector") || n.has("draggable")) && Promise.resolve().then(() => {
        this.attachDragHandleListener();
      }), n.has("drag_handle_selector") && (this.drag_handle_selector ? this.setAttribute("data-drag-handle-selector", "") : this.removeAttribute("data-drag-handle-selector")), n.has("data") && !this.isResizing && Promise.resolve().then(() => this.updateMeasuredSize());
    }
    updateMeasuredSize(n = !1) {
      if (!this.instance || !this.id) return;
      const s = this.getBoundingClientRect(), r = this.instance.getViewport?.().zoom || 1, o = s.width / r, a = s.height / r, h = !this.lastMeasured || Math.abs(this.lastMeasured.width - o) > 0.5 || Math.abs(this.lastMeasured.height - a) > 0.5;
      !n && !h || (this.lastMeasured = { width: o, height: a }, this.instance.updateNode(this.id, { measured: { width: o, height: a } }));
    }
    appendResizerToDOM() {
      if (this.removeExistingResizer(), this.resizable && this.selected) {
        const n = this.renderResizer();
        if (n) {
          const s = document.createElement("div");
          s.className = "mixin-resizer-container", s.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10;
          `, this.shadowRoot?.appendChild(s), Vn(n, s);
        }
      }
    }
    removeExistingResizer() {
      const n = this.shadowRoot?.querySelector(".mixin-resizer-container");
      n && n.remove();
    }
    /**
     * Attach mousedown listener to the drag handle element if drag_handle_selector is set
     */
    attachDragHandleListener() {
      if (this.removeDragHandleListener(), !this.draggable || !this.drag_handle_selector)
        return;
      const n = this.shadowRoot;
      if (!n) {
        setTimeout(() => this.attachDragHandleListener(), 0);
        return;
      }
      const s = n.querySelector(this.drag_handle_selector);
      s && (this.dragHandleElement = s, s.addEventListener("mousedown", this.handleMouseDown), s.style.cursor = "grab");
    }
    /**
     * Remove mousedown listener from the drag handle element
     */
    removeDragHandleListener() {
      this.dragHandleElement && (this.dragHandleElement.removeEventListener("mousedown", this.handleMouseDown), this.dragHandleElement.style.cursor = "", this.dragHandleElement = null);
    }
    /**
     * Adjusts node height to fit content up to maxInitialHeight
     * If maxInitialHeight is 0, this method does nothing
     * If content height > maxInitialHeight: sets height to maxInitialHeight (content will scroll)
     * If content height <= maxInitialHeight: doesn't set height (lets it fit to content)
     * Called automatically in firstUpdated, but can be called manually after content loads
     */
    adjustHeightToContent() {
      if (this.maxInitialHeight <= 0 || !this.instance || !this.id || this.isResizing) return;
      const n = this.style.height;
      this.style.height = "auto", this.offsetHeight;
      const s = this.scrollHeight || this.getBoundingClientRect().height;
      s > this.maxInitialHeight ? (this.style.height = `${this.maxInitialHeight}px`, this.instance.updateNode(this.id, {
        height: this.maxInitialHeight,
        measured: {
          width: this.offsetWidth || this.getBoundingClientRect().width,
          height: this.maxInitialHeight
        }
      })) : (n ? this.style.height = n : this.style.height = "", s > 0 && this.instance.updateNode(this.id, {
        height: s,
        measured: {
          width: this.offsetWidth || this.getBoundingClientRect().width,
          height: s
        }
      }));
    }
    /**
     * Notifies the flow instance that handles have been dynamically added/updated
     * Call this after using Lit's render() to add handles dynamically (e.g., after API data loads)
     * 
     * This method:
     * 1. Waits for DOM update to complete
     * 2. Updates node dimensions to trigger handle position recalculation
     * 3. Dispatches a custom event for flow canvas to listen to
     * 
     * @example
     * ```typescript
     * async loadFields() {
     *   const fields = await fetchFields();
     *   const container = this.shadowRoot.querySelector('.fields-container');
     *   render(fieldsTemplate, container);
     *   
     *   // Notify flow instance after handles are rendered
     *   this.notifyHandlesUpdated();
     * }
     * ```
     */
    async notifyHandlesUpdated(n) {
      const { handleIds: s, updateDimensions: r = !0 } = n || {};
      await this.updateComplete, await new Promise((o) => requestAnimationFrame(() => o())), await new Promise((o) => setTimeout(o, 0)), this.instance && this.id && (r && this.updateMeasuredSize(!0), this.dispatchEvent(new CustomEvent("node-handles-updated", {
        detail: {
          nodeId: this.id,
          handleIds: s || [],
          timestamp: Date.now()
        },
        bubbles: !0,
        composed: !0
      })));
    }
  }
  return I([
    v({ type: String, reflect: !0 })
  ], e.prototype, "id"), I([
    v({ type: Object })
  ], e.prototype, "position"), I([
    v({ type: Object })
  ], e.prototype, "data"), I([
    v({ type: Boolean, reflect: !0 })
  ], e.prototype, "selected"), I([
    v({ type: Boolean, reflect: !0 })
  ], e.prototype, "dragging"), I([
    v({ type: Object })
  ], e.prototype, "instance"), I([
    v({ type: Boolean })
  ], e.prototype, "resizable"), I([
    v({ type: Boolean })
  ], e.prototype, "draggable"), I([
    v({ type: String })
  ], e.prototype, "drag_handle_selector"), I([
    v({ type: Boolean })
  ], e.prototype, "connectable"), I([
    v({ type: Number })
  ], e.prototype, "minWidth"), I([
    v({ type: Number })
  ], e.prototype, "maxWidth"), I([
    v({ type: Number })
  ], e.prototype, "minHeight"), I([
    v({ type: Number })
  ], e.prototype, "maxHeight"), I([
    v({ type: Boolean })
  ], e.prototype, "keepAspectRatio"), I([
    v({ type: Number })
  ], e.prototype, "maxInitialHeight"), I([
    v({ type: Number })
  ], e.prototype, "width"), I([
    v({ type: Number })
  ], e.prototype, "height"), e;
};
export {
  si as BaseNode,
  ai as BaseNodeContent,
  hi as BaseNodeFooter,
  ri as BaseNodeHeader,
  oi as BaseNodeHeaderTitle,
  ut as ERDTableNode,
  At as FlowBackground,
  gt as FlowCanvas,
  Ae as FlowControls,
  O as FlowEdge,
  th as FlowInstance,
  re as FlowMinimap,
  tt as FlowNode,
  fl as NodeMixin,
  mt as NodeResizer,
  M as Position,
  et as ShapeNode,
  Ne as ShapeRegistry,
  sl as createStore,
  ni as getBezierPath,
  dl as getCenter,
  cl as getDistance,
  dn as getSmoothStepPath,
  Nh as getStraightPath,
  ul as isPointInRect
};
//# sourceMappingURL=lit-flow.bundle.js.map
