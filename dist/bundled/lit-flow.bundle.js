var Gn = { value: () => {
} };
function ri() {
  for (var t = 0, e = arguments.length, i = {}, n; t < e; ++t) {
    if (!(n = arguments[t] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new fe(i);
}
function fe(t) {
  this._ = t;
}
function Kn(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !e.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
fe.prototype = ri.prototype = {
  constructor: fe,
  on: function(t, e) {
    var i = this._, n = Kn(t + "", i), s, r = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++r < o; ) if ((s = (t = n[r]).type) && (s = Qn(i[s], t.name))) return s;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < o; )
      if (s = (t = n[r]).type) i[s] = xi(i[s], t.name, e);
      else if (e == null) for (s in i) i[s] = xi(i[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e) t[i] = e[i].slice();
    return new fe(t);
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
function Qn(t, e) {
  for (var i = 0, n = t.length, s; i < n; ++i)
    if ((s = t[i]).name === e)
      return s.value;
}
function xi(t, e, i) {
  for (var n = 0, s = t.length; n < s; ++n)
    if (t[n].name === e) {
      t[n] = Gn, t = t.slice(0, n).concat(t.slice(n + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var We = "http://www.w3.org/1999/xhtml";
const $i = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: We,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function He(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), $i.hasOwnProperty(e) ? { space: $i[e], local: t } : t;
}
function Jn(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === We && e.documentElement.namespaceURI === We ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function ts(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function on(t) {
  var e = He(t);
  return (e.local ? ts : Jn)(e);
}
function es() {
}
function oi(t) {
  return t == null ? es : function() {
    return this.querySelector(t);
  };
}
function is(t) {
  typeof t != "function" && (t = oi(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = new Array(o), h, l, c = 0; c < o; ++c)
      (h = r[c]) && (l = t.call(h, h.__data__, c, r)) && ("__data__" in h && (l.__data__ = h.__data__), a[c] = l);
  return new K(n, this._parents);
}
function ns(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ss() {
  return [];
}
function an(t) {
  return t == null ? ss : function() {
    return this.querySelectorAll(t);
  };
}
function rs(t) {
  return function() {
    return ns(t.apply(this, arguments));
  };
}
function os(t) {
  typeof t == "function" ? t = rs(t) : t = an(t);
  for (var e = this._groups, i = e.length, n = [], s = [], r = 0; r < i; ++r)
    for (var o = e[r], a = o.length, h, l = 0; l < a; ++l)
      (h = o[l]) && (n.push(t.call(h, h.__data__, l, o)), s.push(h));
  return new K(n, s);
}
function hn(t) {
  return function() {
    return this.matches(t);
  };
}
function ln(t) {
  return function(e) {
    return e.matches(t);
  };
}
var as = Array.prototype.find;
function hs(t) {
  return function() {
    return as.call(this.children, t);
  };
}
function ls() {
  return this.firstElementChild;
}
function cs(t) {
  return this.select(t == null ? ls : hs(typeof t == "function" ? t : ln(t)));
}
var ds = Array.prototype.filter;
function us() {
  return Array.from(this.children);
}
function fs(t) {
  return function() {
    return ds.call(this.children, t);
  };
}
function ps(t) {
  return this.selectAll(t == null ? us : fs(typeof t == "function" ? t : ln(t)));
}
function gs(t) {
  typeof t != "function" && (t = hn(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = [], h, l = 0; l < o; ++l)
      (h = r[l]) && t.call(h, h.__data__, l, r) && a.push(h);
  return new K(n, this._parents);
}
function cn(t) {
  return new Array(t.length);
}
function ms() {
  return new K(this._enter || this._groups.map(cn), this._parents);
}
function we(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
we.prototype = {
  constructor: we,
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
function ys(t) {
  return function() {
    return t;
  };
}
function vs(t, e, i, n, s, r) {
  for (var o = 0, a, h = e.length, l = r.length; o < l; ++o)
    (a = e[o]) ? (a.__data__ = r[o], n[o] = a) : i[o] = new we(t, r[o]);
  for (; o < h; ++o)
    (a = e[o]) && (s[o] = a);
}
function ws(t, e, i, n, s, r, o) {
  var a, h, l = /* @__PURE__ */ new Map(), c = e.length, d = r.length, f = new Array(c), p;
  for (a = 0; a < c; ++a)
    (h = e[a]) && (f[a] = p = o.call(h, h.__data__, a, e) + "", l.has(p) ? s[a] = h : l.set(p, h));
  for (a = 0; a < d; ++a)
    p = o.call(t, r[a], a, r) + "", (h = l.get(p)) ? (n[a] = h, h.__data__ = r[a], l.delete(p)) : i[a] = new we(t, r[a]);
  for (a = 0; a < c; ++a)
    (h = e[a]) && l.get(f[a]) === h && (s[a] = h);
}
function bs(t) {
  return t.__data__;
}
function xs(t, e) {
  if (!arguments.length) return Array.from(this, bs);
  var i = e ? ws : vs, n = this._parents, s = this._groups;
  typeof t != "function" && (t = ys(t));
  for (var r = s.length, o = new Array(r), a = new Array(r), h = new Array(r), l = 0; l < r; ++l) {
    var c = n[l], d = s[l], f = d.length, p = $s(t.call(c, c && c.__data__, l, n)), m = p.length, x = a[l] = new Array(m), E = o[l] = new Array(m), w = h[l] = new Array(f);
    i(c, d, x, E, w, p, e);
    for (var H = 0, N = 0, T, W; H < m; ++H)
      if (T = x[H]) {
        for (H >= N && (N = H + 1); !(W = E[N]) && ++N < m; ) ;
        T._next = W || null;
      }
  }
  return o = new K(o, n), o._enter = a, o._exit = h, o;
}
function $s(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function _s() {
  return new K(this._exit || this._groups.map(cn), this._parents);
}
function zs(t, e, i) {
  var n = this.enter(), s = this, r = this.exit();
  return typeof t == "function" ? (n = t(n), n && (n = n.selection())) : n = n.append(t + ""), e != null && (s = e(s), s && (s = s.selection())), i == null ? r.remove() : i(r), n && s ? n.merge(s).order() : s;
}
function Ss(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, n = e._groups, s = i.length, r = n.length, o = Math.min(s, r), a = new Array(s), h = 0; h < o; ++h)
    for (var l = i[h], c = n[h], d = l.length, f = a[h] = new Array(d), p, m = 0; m < d; ++m)
      (p = l[m] || c[m]) && (f[m] = p);
  for (; h < s; ++h)
    a[h] = i[h];
  return new K(a, this._parents);
}
function Es() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var n = t[e], s = n.length - 1, r = n[s], o; --s >= 0; )
      (o = n[s]) && (r && o.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(o, r), r = o);
  return this;
}
function ks(t) {
  t || (t = Cs);
  function e(d, f) {
    return d && f ? t(d.__data__, f.__data__) : !d - !f;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), r = 0; r < n; ++r) {
    for (var o = i[r], a = o.length, h = s[r] = new Array(a), l, c = 0; c < a; ++c)
      (l = o[c]) && (h[c] = l);
    h.sort(e);
  }
  return new K(s, this._parents).order();
}
function Cs(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ms() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Hs() {
  return Array.from(this);
}
function As() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var n = t[e], s = 0, r = n.length; s < r; ++s) {
      var o = n[s];
      if (o) return o;
    }
  return null;
}
function Ns() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Ls() {
  return !this.node();
}
function Rs(t) {
  for (var e = this._groups, i = 0, n = e.length; i < n; ++i)
    for (var s = e[i], r = 0, o = s.length, a; r < o; ++r)
      (a = s[r]) && t.call(a, a.__data__, r, s);
  return this;
}
function Ps(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ts(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ds(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Os(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Is(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function Bs(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function Us(t, e) {
  var i = He(t);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((e == null ? i.local ? Ts : Ps : typeof e == "function" ? i.local ? Bs : Is : i.local ? Os : Ds)(i, e));
}
function dn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Xs(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ys(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function Ws(t, e, i) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.style.removeProperty(t) : this.style.setProperty(t, n, i);
  };
}
function Zs(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? Xs : typeof e == "function" ? Ws : Ys)(t, e, i ?? "")) : Tt(this.node(), t);
}
function Tt(t, e) {
  return t.style.getPropertyValue(e) || dn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Fs(t) {
  return function() {
    delete this[t];
  };
}
function qs(t, e) {
  return function() {
    this[t] = e;
  };
}
function Vs(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function js(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Fs : typeof e == "function" ? Vs : qs)(t, e)) : this.node()[t];
}
function un(t) {
  return t.trim().split(/^|\s+/);
}
function ai(t) {
  return t.classList || new fn(t);
}
function fn(t) {
  this._node = t, this._names = un(t.getAttribute("class") || "");
}
fn.prototype = {
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
function pn(t, e) {
  for (var i = ai(t), n = -1, s = e.length; ++n < s; ) i.add(e[n]);
}
function gn(t, e) {
  for (var i = ai(t), n = -1, s = e.length; ++n < s; ) i.remove(e[n]);
}
function Gs(t) {
  return function() {
    pn(this, t);
  };
}
function Ks(t) {
  return function() {
    gn(this, t);
  };
}
function Qs(t, e) {
  return function() {
    (e.apply(this, arguments) ? pn : gn)(this, t);
  };
}
function Js(t, e) {
  var i = un(t + "");
  if (arguments.length < 2) {
    for (var n = ai(this.node()), s = -1, r = i.length; ++s < r; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Qs : e ? Gs : Ks)(i, e));
}
function tr() {
  this.textContent = "";
}
function er(t) {
  return function() {
    this.textContent = t;
  };
}
function ir(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function nr(t) {
  return arguments.length ? this.each(t == null ? tr : (typeof t == "function" ? ir : er)(t)) : this.node().textContent;
}
function sr() {
  this.innerHTML = "";
}
function rr(t) {
  return function() {
    this.innerHTML = t;
  };
}
function or(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function ar(t) {
  return arguments.length ? this.each(t == null ? sr : (typeof t == "function" ? or : rr)(t)) : this.node().innerHTML;
}
function hr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function lr() {
  return this.each(hr);
}
function cr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function dr() {
  return this.each(cr);
}
function ur(t) {
  var e = typeof t == "function" ? t : on(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function fr() {
  return null;
}
function pr(t, e) {
  var i = typeof t == "function" ? t : on(t), n = e == null ? fr : typeof e == "function" ? e : oi(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function gr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function mr() {
  return this.each(gr);
}
function yr() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function vr() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function wr(t) {
  return this.select(t ? vr : yr);
}
function br(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function xr(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function $r(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", n = e.indexOf(".");
    return n >= 0 && (i = e.slice(n + 1), e = e.slice(0, n)), { type: e, name: i };
  });
}
function _r(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, n = -1, s = e.length, r; i < s; ++i)
        r = e[i], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++n] = r;
      ++n ? e.length = n : delete this.__on;
    }
  };
}
function zr(t, e, i) {
  return function() {
    var n = this.__on, s, r = xr(e);
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
function Sr(t, e, i) {
  var n = $r(t + ""), s, r = n.length, o;
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
  for (a = e ? zr : _r, s = 0; s < r; ++s) this.each(a(n[s], e, i));
  return this;
}
function mn(t, e, i) {
  var n = dn(t), s = n.CustomEvent;
  typeof s == "function" ? s = new s(e, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(e, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(e, !1, !1)), t.dispatchEvent(s);
}
function Er(t, e) {
  return function() {
    return mn(this, t, e);
  };
}
function kr(t, e) {
  return function() {
    return mn(this, t, e.apply(this, arguments));
  };
}
function Cr(t, e) {
  return this.each((typeof e == "function" ? kr : Er)(t, e));
}
function* Mr() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var n = t[e], s = 0, r = n.length, o; s < r; ++s)
      (o = n[s]) && (yield o);
}
var yn = [null];
function K(t, e) {
  this._groups = t, this._parents = e;
}
function ie() {
  return new K([[document.documentElement]], yn);
}
function Hr() {
  return this;
}
K.prototype = ie.prototype = {
  constructor: K,
  select: is,
  selectAll: os,
  selectChild: cs,
  selectChildren: ps,
  filter: gs,
  data: xs,
  enter: ms,
  exit: _s,
  join: zs,
  merge: Ss,
  selection: Hr,
  order: Es,
  sort: ks,
  call: Ms,
  nodes: Hs,
  node: As,
  size: Ns,
  empty: Ls,
  each: Rs,
  attr: Us,
  style: Zs,
  property: js,
  classed: Js,
  text: nr,
  html: ar,
  raise: lr,
  lower: dr,
  append: ur,
  insert: pr,
  remove: mr,
  clone: wr,
  datum: br,
  on: Sr,
  dispatch: Cr,
  [Symbol.iterator]: Mr
};
function bt(t) {
  return typeof t == "string" ? new K([[document.querySelector(t)]], [document.documentElement]) : new K([[t]], yn);
}
function Ar(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function wt(t, e) {
  if (t = Ar(t), e === void 0 && (e = t.currentTarget), e) {
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
const Ze = { capture: !0, passive: !1 };
function Fe(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Nr(t) {
  var e = t.document.documentElement, i = bt(t).on("dragstart.drag", Fe, Ze);
  "onselectstart" in e ? i.on("selectstart.drag", Fe, Ze) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Lr(t, e) {
  var i = t.document.documentElement, n = bt(t).on("dragstart.drag", null);
  e && (n.on("click.drag", Fe, Ze), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function hi(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function vn(t, e) {
  var i = Object.create(t.prototype);
  for (var n in e) i[n] = e[n];
  return i;
}
function ne() {
}
var jt = 0.7, be = 1 / jt, Pt = "\\s*([+-]?\\d+)\\s*", Gt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ht = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Rr = /^#([0-9a-f]{3,8})$/, Pr = new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`), Tr = new RegExp(`^rgb\\(${ht},${ht},${ht}\\)$`), Dr = new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${Gt}\\)$`), Or = new RegExp(`^rgba\\(${ht},${ht},${ht},${Gt}\\)$`), Ir = new RegExp(`^hsl\\(${Gt},${ht},${ht}\\)$`), Br = new RegExp(`^hsla\\(${Gt},${ht},${ht},${Gt}\\)$`), _i = {
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
hi(ne, Et, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: zi,
  // Deprecated! Use color.formatHex.
  formatHex: zi,
  formatHex8: Ur,
  formatHsl: Xr,
  formatRgb: Si,
  toString: Si
});
function zi() {
  return this.rgb().formatHex();
}
function Ur() {
  return this.rgb().formatHex8();
}
function Xr() {
  return wn(this).formatHsl();
}
function Si() {
  return this.rgb().formatRgb();
}
function Et(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = Rr.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? Ei(e) : i === 3 ? new F(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? ae(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? ae(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Pr.exec(t)) ? new F(e[1], e[2], e[3], 1) : (e = Tr.exec(t)) ? new F(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Dr.exec(t)) ? ae(e[1], e[2], e[3], e[4]) : (e = Or.exec(t)) ? ae(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ir.exec(t)) ? Mi(e[1], e[2] / 100, e[3] / 100, 1) : (e = Br.exec(t)) ? Mi(e[1], e[2] / 100, e[3] / 100, e[4]) : _i.hasOwnProperty(t) ? Ei(_i[t]) : t === "transparent" ? new F(NaN, NaN, NaN, 0) : null;
}
function Ei(t) {
  return new F(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ae(t, e, i, n) {
  return n <= 0 && (t = e = i = NaN), new F(t, e, i, n);
}
function Yr(t) {
  return t instanceof ne || (t = Et(t)), t ? (t = t.rgb(), new F(t.r, t.g, t.b, t.opacity)) : new F();
}
function qe(t, e, i, n) {
  return arguments.length === 1 ? Yr(t) : new F(t, e, i, n ?? 1);
}
function F(t, e, i, n) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +n;
}
hi(F, qe, vn(ne, {
  brighter(t) {
    return t = t == null ? be : Math.pow(be, t), new F(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? jt : Math.pow(jt, t), new F(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new F(St(this.r), St(this.g), St(this.b), xe(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ki,
  // Deprecated! Use color.formatHex.
  formatHex: ki,
  formatHex8: Wr,
  formatRgb: Ci,
  toString: Ci
}));
function ki() {
  return `#${_t(this.r)}${_t(this.g)}${_t(this.b)}`;
}
function Wr() {
  return `#${_t(this.r)}${_t(this.g)}${_t(this.b)}${_t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ci() {
  const t = xe(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${St(this.r)}, ${St(this.g)}, ${St(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function xe(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function St(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function _t(t) {
  return t = St(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Mi(t, e, i, n) {
  return n <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new st(t, e, i, n);
}
function wn(t) {
  if (t instanceof st) return new st(t.h, t.s, t.l, t.opacity);
  if (t instanceof ne || (t = Et(t)), !t) return new st();
  if (t instanceof st) return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, n = t.b / 255, s = Math.min(e, i, n), r = Math.max(e, i, n), o = NaN, a = r - s, h = (r + s) / 2;
  return a ? (e === r ? o = (i - n) / a + (i < n) * 6 : i === r ? o = (n - e) / a + 2 : o = (e - i) / a + 4, a /= h < 0.5 ? r + s : 2 - r - s, o *= 60) : a = h > 0 && h < 1 ? 0 : o, new st(o, a, h, t.opacity);
}
function Zr(t, e, i, n) {
  return arguments.length === 1 ? wn(t) : new st(t, e, i, n ?? 1);
}
function st(t, e, i, n) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +n;
}
hi(st, Zr, vn(ne, {
  brighter(t) {
    return t = t == null ? be : Math.pow(be, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? jt : Math.pow(jt, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * e, s = 2 * i - n;
    return new F(
      De(t >= 240 ? t - 240 : t + 120, s, n),
      De(t, s, n),
      De(t < 120 ? t + 240 : t - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new st(Hi(this.h), he(this.s), he(this.l), xe(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = xe(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Hi(this.h)}, ${he(this.s) * 100}%, ${he(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Hi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function he(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function De(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const li = (t) => () => t;
function Fr(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function qr(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(n) {
    return Math.pow(t + n * e, i);
  };
}
function Vr(t) {
  return (t = +t) == 1 ? bn : function(e, i) {
    return i - e ? qr(e, i, t) : li(isNaN(e) ? i : e);
  };
}
function bn(t, e) {
  var i = e - t;
  return i ? Fr(t, i) : li(isNaN(t) ? e : t);
}
const $e = (function t(e) {
  var i = Vr(e);
  function n(s, r) {
    var o = i((s = qe(s)).r, (r = qe(r)).r), a = i(s.g, r.g), h = i(s.b, r.b), l = bn(s.opacity, r.opacity);
    return function(c) {
      return s.r = o(c), s.g = a(c), s.b = h(c), s.opacity = l(c), s + "";
    };
  }
  return n.gamma = t, n;
})(1);
function jr(t, e) {
  e || (e = []);
  var i = t ? Math.min(e.length, t.length) : 0, n = e.slice(), s;
  return function(r) {
    for (s = 0; s < i; ++s) n[s] = t[s] * (1 - r) + e[s] * r;
    return n;
  };
}
function Gr(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Kr(t, e) {
  var i = e ? e.length : 0, n = t ? Math.min(i, t.length) : 0, s = new Array(n), r = new Array(i), o;
  for (o = 0; o < n; ++o) s[o] = Ft(t[o], e[o]);
  for (; o < i; ++o) r[o] = e[o];
  return function(a) {
    for (o = 0; o < n; ++o) r[o] = s[o](a);
    return r;
  };
}
function Qr(t, e) {
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
function Jr(t, e) {
  var i = {}, n = {}, s;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (s in e)
    s in t ? i[s] = Ft(t[s], e[s]) : n[s] = e[s];
  return function(r) {
    for (s in i) n[s] = i[s](r);
    return n;
  };
}
var Ve = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Oe = new RegExp(Ve.source, "g");
function to(t) {
  return function() {
    return t;
  };
}
function eo(t) {
  return function(e) {
    return t(e) + "";
  };
}
function xn(t, e) {
  var i = Ve.lastIndex = Oe.lastIndex = 0, n, s, r, o = -1, a = [], h = [];
  for (t = t + "", e = e + ""; (n = Ve.exec(t)) && (s = Oe.exec(e)); )
    (r = s.index) > i && (r = e.slice(i, r), a[o] ? a[o] += r : a[++o] = r), (n = n[0]) === (s = s[0]) ? a[o] ? a[o] += s : a[++o] = s : (a[++o] = null, h.push({ i: o, x: at(n, s) })), i = Oe.lastIndex;
  return i < e.length && (r = e.slice(i), a[o] ? a[o] += r : a[++o] = r), a.length < 2 ? h[0] ? eo(h[0].x) : to(e) : (e = h.length, function(l) {
    for (var c = 0, d; c < e; ++c) a[(d = h[c]).i] = d.x(l);
    return a.join("");
  });
}
function Ft(t, e) {
  var i = typeof e, n;
  return e == null || i === "boolean" ? li(e) : (i === "number" ? at : i === "string" ? (n = Et(e)) ? (e = n, $e) : xn : e instanceof Et ? $e : e instanceof Date ? Qr : Gr(e) ? jr : Array.isArray(e) ? Kr : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Jr : at)(t, e);
}
var Ai = 180 / Math.PI, je = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function $n(t, e, i, n, s, r) {
  var o, a, h;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (h = t * i + e * n) && (i -= t * h, n -= e * h), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, h /= a), t * n < e * i && (t = -t, e = -e, h = -h, o = -o), {
    translateX: s,
    translateY: r,
    rotate: Math.atan2(e, t) * Ai,
    skewX: Math.atan(h) * Ai,
    scaleX: o,
    scaleY: a
  };
}
var le;
function io(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? je : $n(e.a, e.b, e.c, e.d, e.e, e.f);
}
function no(t) {
  return t == null || (le || (le = document.createElementNS("http://www.w3.org/2000/svg", "g")), le.setAttribute("transform", t), !(t = le.transform.baseVal.consolidate())) ? je : (t = t.matrix, $n(t.a, t.b, t.c, t.d, t.e, t.f));
}
function _n(t, e, i, n) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function r(l, c, d, f, p, m) {
    if (l !== d || c !== f) {
      var x = p.push("translate(", null, e, null, i);
      m.push({ i: x - 4, x: at(l, d) }, { i: x - 2, x: at(c, f) });
    } else (d || f) && p.push("translate(" + d + e + f + i);
  }
  function o(l, c, d, f) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), f.push({ i: d.push(s(d) + "rotate(", null, n) - 2, x: at(l, c) })) : c && d.push(s(d) + "rotate(" + c + n);
  }
  function a(l, c, d, f) {
    l !== c ? f.push({ i: d.push(s(d) + "skewX(", null, n) - 2, x: at(l, c) }) : c && d.push(s(d) + "skewX(" + c + n);
  }
  function h(l, c, d, f, p, m) {
    if (l !== d || c !== f) {
      var x = p.push(s(p) + "scale(", null, ",", null, ")");
      m.push({ i: x - 4, x: at(l, d) }, { i: x - 2, x: at(c, f) });
    } else (d !== 1 || f !== 1) && p.push(s(p) + "scale(" + d + "," + f + ")");
  }
  return function(l, c) {
    var d = [], f = [];
    return l = t(l), c = t(c), r(l.translateX, l.translateY, c.translateX, c.translateY, d, f), o(l.rotate, c.rotate, d, f), a(l.skewX, c.skewX, d, f), h(l.scaleX, l.scaleY, c.scaleX, c.scaleY, d, f), l = c = null, function(p) {
      for (var m = -1, x = f.length, E; ++m < x; ) d[(E = f[m]).i] = E.x(p);
      return d.join("");
    };
  };
}
var so = _n(io, "px, ", "px)", "deg)"), ro = _n(no, ", ", ")", ")"), oo = 1e-12;
function Ni(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function ao(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function ho(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const pe = (function t(e, i, n) {
  function s(r, o) {
    var a = r[0], h = r[1], l = r[2], c = o[0], d = o[1], f = o[2], p = c - a, m = d - h, x = p * p + m * m, E, w;
    if (x < oo)
      w = Math.log(f / l) / e, E = function(B) {
        return [
          a + B * p,
          h + B * m,
          l * Math.exp(e * B * w)
        ];
      };
    else {
      var H = Math.sqrt(x), N = (f * f - l * l + n * x) / (2 * l * i * H), T = (f * f - l * l - n * x) / (2 * f * i * H), W = Math.log(Math.sqrt(N * N + 1) - N), R = Math.log(Math.sqrt(T * T + 1) - T);
      w = (R - W) / e, E = function(B) {
        var et = B * w, it = Ni(W), vt = l / (i * H) * (it * ho(e * et + W) - ao(W));
        return [
          a + vt * p,
          h + vt * m,
          l * it / Ni(e * et + W)
        ];
      };
    }
    return E.duration = w * 1e3 * e / Math.SQRT2, E;
  }
  return s.rho = function(r) {
    var o = Math.max(1e-3, +r), a = o * o, h = a * a;
    return t(o, a, h);
  }, s;
})(Math.SQRT2, 2, 4);
var Dt = 0, Wt = 0, Ut = 0, zn = 1e3, _e, Zt, ze = 0, kt = 0, Ae = 0, Kt = typeof performance == "object" && performance.now ? performance : Date, Sn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function ci() {
  return kt || (Sn(lo), kt = Kt.now() + Ae);
}
function lo() {
  kt = 0;
}
function Se() {
  this._call = this._time = this._next = null;
}
Se.prototype = En.prototype = {
  constructor: Se,
  restart: function(t, e, i) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    i = (i == null ? ci() : +i) + (e == null ? 0 : +e), !this._next && Zt !== this && (Zt ? Zt._next = this : _e = this, Zt = this), this._call = t, this._time = i, Ge();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ge());
  }
};
function En(t, e, i) {
  var n = new Se();
  return n.restart(t, e, i), n;
}
function co() {
  ci(), ++Dt;
  for (var t = _e, e; t; )
    (e = kt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Dt;
}
function Li() {
  kt = (ze = Kt.now()) + Ae, Dt = Wt = 0;
  try {
    co();
  } finally {
    Dt = 0, fo(), kt = 0;
  }
}
function uo() {
  var t = Kt.now(), e = t - ze;
  e > zn && (Ae -= e, ze = t);
}
function fo() {
  for (var t, e = _e, i, n = 1 / 0; e; )
    e._call ? (n > e._time && (n = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : _e = i);
  Zt = t, Ge(n);
}
function Ge(t) {
  if (!Dt) {
    Wt && (Wt = clearTimeout(Wt));
    var e = t - kt;
    e > 24 ? (t < 1 / 0 && (Wt = setTimeout(Li, t - Kt.now() - Ae)), Ut && (Ut = clearInterval(Ut))) : (Ut || (ze = Kt.now(), Ut = setInterval(uo, zn)), Dt = 1, Sn(Li));
  }
}
function Ri(t, e, i) {
  var n = new Se();
  return e = e == null ? 0 : +e, n.restart((s) => {
    n.stop(), t(s + e);
  }, e, i), n;
}
var po = ri("start", "end", "cancel", "interrupt"), go = [], kn = 0, Pi = 1, Ke = 2, ge = 3, Ti = 4, Qe = 5, me = 6;
function Ne(t, e, i, n, s, r) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (i in o) return;
  mo(t, i, {
    name: e,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: po,
    tween: go,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: kn
  });
}
function di(t, e) {
  var i = rt(t, e);
  if (i.state > kn) throw new Error("too late; already scheduled");
  return i;
}
function lt(t, e) {
  var i = rt(t, e);
  if (i.state > ge) throw new Error("too late; already running");
  return i;
}
function rt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e])) throw new Error("transition not found");
  return i;
}
function mo(t, e, i) {
  var n = t.__transition, s;
  n[e] = i, i.timer = En(r, 0, i.time);
  function r(l) {
    i.state = Pi, i.timer.restart(o, i.delay, i.time), i.delay <= l && o(l - i.delay);
  }
  function o(l) {
    var c, d, f, p;
    if (i.state !== Pi) return h();
    for (c in n)
      if (p = n[c], p.name === i.name) {
        if (p.state === ge) return Ri(o);
        p.state === Ti ? (p.state = me, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete n[c]) : +c < e && (p.state = me, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete n[c]);
      }
    if (Ri(function() {
      i.state === ge && (i.state = Ti, i.timer.restart(a, i.delay, i.time), a(l));
    }), i.state = Ke, i.on.call("start", t, t.__data__, i.index, i.group), i.state === Ke) {
      for (i.state = ge, s = new Array(f = i.tween.length), c = 0, d = -1; c < f; ++c)
        (p = i.tween[c].value.call(t, t.__data__, i.index, i.group)) && (s[++d] = p);
      s.length = d + 1;
    }
  }
  function a(l) {
    for (var c = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(h), i.state = Qe, 1), d = -1, f = s.length; ++d < f; )
      s[d].call(t, c);
    i.state === Qe && (i.on.call("end", t, t.__data__, i.index, i.group), h());
  }
  function h() {
    i.state = me, i.timer.stop(), delete n[e];
    for (var l in n) return;
    delete t.__transition;
  }
}
function ye(t, e) {
  var i = t.__transition, n, s, r = !0, o;
  if (i) {
    e = e == null ? null : e + "";
    for (o in i) {
      if ((n = i[o]).name !== e) {
        r = !1;
        continue;
      }
      s = n.state > Ke && n.state < Qe, n.state = me, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", t, t.__data__, n.index, n.group), delete i[o];
    }
    r && delete t.__transition;
  }
}
function yo(t) {
  return this.each(function() {
    ye(this, t);
  });
}
function vo(t, e) {
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
function wo(t, e, i) {
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
function bo(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var n = rt(this.node(), i).tween, s = 0, r = n.length, o; s < r; ++s)
      if ((o = n[s]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? vo : wo)(i, t, e));
}
function ui(t, e, i) {
  var n = t._id;
  return t.each(function() {
    var s = lt(this, n);
    (s.value || (s.value = {}))[e] = i.apply(this, arguments);
  }), function(s) {
    return rt(s, n).value[e];
  };
}
function Cn(t, e) {
  var i;
  return (typeof e == "number" ? at : e instanceof Et ? $e : (i = Et(e)) ? (e = i, $e) : xn)(t, e);
}
function xo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function $o(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function _o(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = this.getAttribute(t);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function zo(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function So(t, e, i) {
  var n, s, r;
  return function() {
    var o, a = i(this), h;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), h = a + "", o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a)));
  };
}
function Eo(t, e, i) {
  var n, s, r;
  return function() {
    var o, a = i(this), h;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), h = a + "", o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a)));
  };
}
function ko(t, e) {
  var i = He(t), n = i === "transform" ? ro : Cn;
  return this.attrTween(t, typeof e == "function" ? (i.local ? Eo : So)(i, n, ui(this, "attr." + t, e)) : e == null ? (i.local ? $o : xo)(i) : (i.local ? zo : _o)(i, n, e));
}
function Co(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function Mo(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function Ho(t, e) {
  var i, n;
  function s() {
    var r = e.apply(this, arguments);
    return r !== n && (i = (n = r) && Mo(t, r)), i;
  }
  return s._value = e, s;
}
function Ao(t, e) {
  var i, n;
  function s() {
    var r = e.apply(this, arguments);
    return r !== n && (i = (n = r) && Co(t, r)), i;
  }
  return s._value = e, s;
}
function No(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  var n = He(t);
  return this.tween(i, (n.local ? Ho : Ao)(n, e));
}
function Lo(t, e) {
  return function() {
    di(this, t).delay = +e.apply(this, arguments);
  };
}
function Ro(t, e) {
  return e = +e, function() {
    di(this, t).delay = e;
  };
}
function Po(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Lo : Ro)(e, t)) : rt(this.node(), e).delay;
}
function To(t, e) {
  return function() {
    lt(this, t).duration = +e.apply(this, arguments);
  };
}
function Do(t, e) {
  return e = +e, function() {
    lt(this, t).duration = e;
  };
}
function Oo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? To : Do)(e, t)) : rt(this.node(), e).duration;
}
function Io(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    lt(this, t).ease = e;
  };
}
function Bo(t) {
  var e = this._id;
  return arguments.length ? this.each(Io(e, t)) : rt(this.node(), e).ease;
}
function Uo(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    lt(this, t).ease = i;
  };
}
function Xo(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Uo(this._id, t));
}
function Yo(t) {
  typeof t != "function" && (t = hn(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = [], h, l = 0; l < o; ++l)
      (h = r[l]) && t.call(h, h.__data__, l, r) && a.push(h);
  return new pt(n, this._parents, this._name, this._id);
}
function Wo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, i = t._groups, n = e.length, s = i.length, r = Math.min(n, s), o = new Array(n), a = 0; a < r; ++a)
    for (var h = e[a], l = i[a], c = h.length, d = o[a] = new Array(c), f, p = 0; p < c; ++p)
      (f = h[p] || l[p]) && (d[p] = f);
  for (; a < n; ++a)
    o[a] = e[a];
  return new pt(o, this._parents, this._name, this._id);
}
function Zo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function Fo(t, e, i) {
  var n, s, r = Zo(e) ? di : lt;
  return function() {
    var o = r(this, t), a = o.on;
    a !== n && (s = (n = a).copy()).on(e, i), o.on = s;
  };
}
function qo(t, e) {
  var i = this._id;
  return arguments.length < 2 ? rt(this.node(), i).on.on(t) : this.each(Fo(i, t, e));
}
function Vo(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition) if (+i !== t) return;
    e && e.removeChild(this);
  };
}
function jo() {
  return this.on("end.remove", Vo(this._id));
}
function Go(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = oi(t));
  for (var n = this._groups, s = n.length, r = new Array(s), o = 0; o < s; ++o)
    for (var a = n[o], h = a.length, l = r[o] = new Array(h), c, d, f = 0; f < h; ++f)
      (c = a[f]) && (d = t.call(c, c.__data__, f, a)) && ("__data__" in c && (d.__data__ = c.__data__), l[f] = d, Ne(l[f], e, i, f, l, rt(c, i)));
  return new pt(r, this._parents, e, i);
}
function Ko(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = an(t));
  for (var n = this._groups, s = n.length, r = [], o = [], a = 0; a < s; ++a)
    for (var h = n[a], l = h.length, c, d = 0; d < l; ++d)
      if (c = h[d]) {
        for (var f = t.call(c, c.__data__, d, h), p, m = rt(c, i), x = 0, E = f.length; x < E; ++x)
          (p = f[x]) && Ne(p, e, i, x, f, m);
        r.push(f), o.push(c);
      }
  return new pt(r, o, e, i);
}
var Qo = ie.prototype.constructor;
function Jo() {
  return new Qo(this._groups, this._parents);
}
function ta(t, e) {
  var i, n, s;
  return function() {
    var r = Tt(this, t), o = (this.style.removeProperty(t), Tt(this, t));
    return r === o ? null : r === i && o === n ? s : s = e(i = r, n = o);
  };
}
function Mn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ea(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = Tt(this, t);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function ia(t, e, i) {
  var n, s, r;
  return function() {
    var o = Tt(this, t), a = i(this), h = a + "";
    return a == null && (h = a = (this.style.removeProperty(t), Tt(this, t))), o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a));
  };
}
function na(t, e) {
  var i, n, s, r = "style." + e, o = "end." + r, a;
  return function() {
    var h = lt(this, t), l = h.on, c = h.value[r] == null ? a || (a = Mn(e)) : void 0;
    (l !== i || s !== c) && (n = (i = l).copy()).on(o, s = c), h.on = n;
  };
}
function sa(t, e, i) {
  var n = (t += "") == "transform" ? so : Cn;
  return e == null ? this.styleTween(t, ta(t, n)).on("end.style." + t, Mn(t)) : typeof e == "function" ? this.styleTween(t, ia(t, n, ui(this, "style." + t, e))).each(na(this._id, t)) : this.styleTween(t, ea(t, n, e), i).on("end.style." + t, null);
}
function ra(t, e, i) {
  return function(n) {
    this.style.setProperty(t, e.call(this, n), i);
  };
}
function oa(t, e, i) {
  var n, s;
  function r() {
    var o = e.apply(this, arguments);
    return o !== s && (n = (s = o) && ra(t, o, i)), n;
  }
  return r._value = e, r;
}
function aa(t, e, i) {
  var n = "style." + (t += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  return this.tween(n, oa(t, e, i ?? ""));
}
function ha(t) {
  return function() {
    this.textContent = t;
  };
}
function la(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function ca(t) {
  return this.tween("text", typeof t == "function" ? la(ui(this, "text", t)) : ha(t == null ? "" : t + ""));
}
function da(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ua(t) {
  var e, i;
  function n() {
    var s = t.apply(this, arguments);
    return s !== i && (e = (i = s) && da(s)), e;
  }
  return n._value = t, n;
}
function fa(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ua(t));
}
function pa() {
  for (var t = this._name, e = this._id, i = Hn(), n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var o = n[r], a = o.length, h, l = 0; l < a; ++l)
      if (h = o[l]) {
        var c = rt(h, e);
        Ne(h, t, i, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new pt(n, this._parents, t, i);
}
function ga() {
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
var ma = 0;
function pt(t, e, i, n) {
  this._groups = t, this._parents = e, this._name = i, this._id = n;
}
function Hn() {
  return ++ma;
}
var dt = ie.prototype;
pt.prototype = {
  constructor: pt,
  select: Go,
  selectAll: Ko,
  selectChild: dt.selectChild,
  selectChildren: dt.selectChildren,
  filter: Yo,
  merge: Wo,
  selection: Jo,
  transition: pa,
  call: dt.call,
  nodes: dt.nodes,
  node: dt.node,
  size: dt.size,
  empty: dt.empty,
  each: dt.each,
  on: qo,
  attr: ko,
  attrTween: No,
  style: sa,
  styleTween: aa,
  text: ca,
  textTween: fa,
  remove: jo,
  tween: bo,
  delay: Po,
  duration: Oo,
  ease: Bo,
  easeVarying: Xo,
  end: ga,
  [Symbol.iterator]: dt[Symbol.iterator]
};
function ya(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var va = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ya
};
function wa(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function ba(t) {
  var e, i;
  t instanceof pt ? (e = t._id, t = t._name) : (e = Hn(), (i = va).time = ci(), t = t == null ? null : t + "");
  for (var n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var o = n[r], a = o.length, h, l = 0; l < a; ++l)
      (h = o[l]) && Ne(h, t, e, l, o, i || wa(h, e));
  return new pt(n, this._parents, t, e);
}
ie.prototype.interrupt = yo;
ie.prototype.transition = ba;
const ce = (t) => () => t;
function xa(t, {
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
An.prototype = ft.prototype;
function An(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Le;
  return t.__zoom;
}
function Ie(t) {
  t.stopImmediatePropagation();
}
function Xt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function $a(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function _a() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Di() {
  return this.__zoom || Le;
}
function za(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Sa() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ea(t, e, i) {
  var n = t.invertX(e[0][0]) - i[0][0], s = t.invertX(e[1][0]) - i[1][0], r = t.invertY(e[0][1]) - i[0][1], o = t.invertY(e[1][1]) - i[1][1];
  return t.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o)
  );
}
function ka() {
  var t = $a, e = _a, i = Ea, n = za, s = Sa, r = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, h = pe, l = ri("start", "zoom", "end"), c, d, f, p = 500, m = 150, x = 0, E = 10;
  function w(u) {
    u.property("__zoom", Di).on("wheel.zoom", et, { passive: !1 }).on("mousedown.zoom", it).on("dblclick.zoom", vt).filter(s).on("touchstart.zoom", It).on("touchmove.zoom", _).on("touchend.zoom touchcancel.zoom", C).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(u, v, g, b) {
    var $ = u.selection ? u.selection() : u;
    $.property("__zoom", Di), u !== $ ? W(u, v, g, b) : $.interrupt().each(function() {
      R(this, arguments).event(b).start().zoom(null, typeof v == "function" ? v.apply(this, arguments) : v).end();
    });
  }, w.scaleBy = function(u, v, g, b) {
    w.scaleTo(u, function() {
      var $ = this.__zoom.k, z = typeof v == "function" ? v.apply(this, arguments) : v;
      return $ * z;
    }, g, b);
  }, w.scaleTo = function(u, v, g, b) {
    w.transform(u, function() {
      var $ = e.apply(this, arguments), z = this.__zoom, S = g == null ? T($) : typeof g == "function" ? g.apply(this, arguments) : g, A = z.invert(S), L = typeof v == "function" ? v.apply(this, arguments) : v;
      return i(N(H(z, L), S, A), $, o);
    }, g, b);
  }, w.translateBy = function(u, v, g, b) {
    w.transform(u, function() {
      return i(this.__zoom.translate(
        typeof v == "function" ? v.apply(this, arguments) : v,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), o);
    }, null, b);
  }, w.translateTo = function(u, v, g, b, $) {
    w.transform(u, function() {
      var z = e.apply(this, arguments), S = this.__zoom, A = b == null ? T(z) : typeof b == "function" ? b.apply(this, arguments) : b;
      return i(Le.translate(A[0], A[1]).scale(S.k).translate(
        typeof v == "function" ? -v.apply(this, arguments) : -v,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), z, o);
    }, b, $);
  };
  function H(u, v) {
    return v = Math.max(r[0], Math.min(r[1], v)), v === u.k ? u : new ft(v, u.x, u.y);
  }
  function N(u, v, g) {
    var b = v[0] - g[0] * u.k, $ = v[1] - g[1] * u.k;
    return b === u.x && $ === u.y ? u : new ft(u.k, b, $);
  }
  function T(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function W(u, v, g, b) {
    u.on("start.zoom", function() {
      R(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var $ = this, z = arguments, S = R($, z).event(b), A = e.apply($, z), L = g == null ? T(A) : typeof g == "function" ? g.apply($, z) : g, V = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), P = $.__zoom, j = typeof v == "function" ? v.apply($, z) : v, nt = h(P.invert(L).concat(V / P.k), j.invert(L).concat(V / j.k));
      return function(G) {
        if (G === 1) G = j;
        else {
          var ot = nt(G), Bt = V / ot[2];
          G = new ft(Bt, L[0] - ot[0] * Bt, L[1] - ot[1] * Bt);
        }
        S.zoom(null, G);
      };
    });
  }
  function R(u, v, g) {
    return !g && u.__zooming || new B(u, v);
  }
  function B(u, v) {
    this.that = u, this.args = v, this.active = 0, this.sourceEvent = null, this.extent = e.apply(u, v), this.taps = 0;
  }
  B.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, v) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = v.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = v.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = v.invert(this.touch1[0])), this.that.__zoom = v, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var v = bt(this.that).datum();
      l.call(
        u,
        this.that,
        new xa(u, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: l
        }),
        v
      );
    }
  };
  function et(u, ...v) {
    if (!t.apply(this, arguments)) return;
    var g = R(this, v).event(u), b = this.__zoom, $ = Math.max(r[0], Math.min(r[1], b.k * Math.pow(2, n.apply(this, arguments)))), z = wt(u);
    if (g.wheel)
      (g.mouse[0][0] !== z[0] || g.mouse[0][1] !== z[1]) && (g.mouse[1] = b.invert(g.mouse[0] = z)), clearTimeout(g.wheel);
    else {
      if (b.k === $) return;
      g.mouse = [z, b.invert(z)], ye(this), g.start();
    }
    Xt(u), g.wheel = setTimeout(S, m), g.zoom("mouse", i(N(H(b, $), g.mouse[0], g.mouse[1]), g.extent, o));
    function S() {
      g.wheel = null, g.end();
    }
  }
  function it(u, ...v) {
    if (f || !t.apply(this, arguments)) return;
    var g = u.currentTarget, b = R(this, v, !0).event(u), $ = bt(u.view).on("mousemove.zoom", L, !0).on("mouseup.zoom", V, !0), z = wt(u, g), S = u.clientX, A = u.clientY;
    Nr(u.view), Ie(u), b.mouse = [z, this.__zoom.invert(z)], ye(this), b.start();
    function L(P) {
      if (Xt(P), !b.moved) {
        var j = P.clientX - S, nt = P.clientY - A;
        b.moved = j * j + nt * nt > x;
      }
      b.event(P).zoom("mouse", i(N(b.that.__zoom, b.mouse[0] = wt(P, g), b.mouse[1]), b.extent, o));
    }
    function V(P) {
      $.on("mousemove.zoom mouseup.zoom", null), Lr(P.view, b.moved), Xt(P), b.event(P).end();
    }
  }
  function vt(u, ...v) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, b = wt(u.changedTouches ? u.changedTouches[0] : u, this), $ = g.invert(b), z = g.k * (u.shiftKey ? 0.5 : 2), S = i(N(H(g, z), b, $), e.apply(this, v), o);
      Xt(u), a > 0 ? bt(this).transition().duration(a).call(W, S, b, u) : bt(this).call(w.transform, S, b, u);
    }
  }
  function It(u, ...v) {
    if (t.apply(this, arguments)) {
      var g = u.touches, b = g.length, $ = R(this, v, u.changedTouches.length === b).event(u), z, S, A, L;
      for (Ie(u), S = 0; S < b; ++S)
        A = g[S], L = wt(A, this), L = [L, this.__zoom.invert(L), A.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== L[2] && ($.touch1 = L, $.taps = 0) : ($.touch0 = L, z = !0, $.taps = 1 + !!c);
      c && (c = clearTimeout(c)), z && ($.taps < 2 && (d = L[0], c = setTimeout(function() {
        c = null;
      }, p)), ye(this), $.start());
    }
  }
  function _(u, ...v) {
    if (this.__zooming) {
      var g = R(this, v).event(u), b = u.changedTouches, $ = b.length, z, S, A, L;
      for (Xt(u), z = 0; z < $; ++z)
        S = b[z], A = wt(S, this), g.touch0 && g.touch0[2] === S.identifier ? g.touch0[0] = A : g.touch1 && g.touch1[2] === S.identifier && (g.touch1[0] = A);
      if (S = g.that.__zoom, g.touch1) {
        var V = g.touch0[0], P = g.touch0[1], j = g.touch1[0], nt = g.touch1[1], G = (G = j[0] - V[0]) * G + (G = j[1] - V[1]) * G, ot = (ot = nt[0] - P[0]) * ot + (ot = nt[1] - P[1]) * ot;
        S = H(S, Math.sqrt(G / ot)), A = [(V[0] + j[0]) / 2, (V[1] + j[1]) / 2], L = [(P[0] + nt[0]) / 2, (P[1] + nt[1]) / 2];
      } else if (g.touch0) A = g.touch0[0], L = g.touch0[1];
      else return;
      g.zoom("touch", i(N(S, A, L), g.extent, o));
    }
  }
  function C(u, ...v) {
    if (this.__zooming) {
      var g = R(this, v).event(u), b = u.changedTouches, $ = b.length, z, S;
      for (Ie(u), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, p), z = 0; z < $; ++z)
        S = b[z], g.touch0 && g.touch0[2] === S.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === S.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (S = wt(S, this), Math.hypot(d[0] - S[0], d[1] - S[1]) < E)) {
        var A = bt(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : ce(+u), w) : n;
  }, w.filter = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : ce(!!u), w) : t;
  }, w.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : ce(!!u), w) : s;
  }, w.extent = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : ce([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), w) : e;
  }, w.scaleExtent = function(u) {
    return arguments.length ? (r[0] = +u[0], r[1] = +u[1], w) : [r[0], r[1]];
  }, w.translateExtent = function(u) {
    return arguments.length ? (o[0][0] = +u[0][0], o[1][0] = +u[1][0], o[0][1] = +u[0][1], o[1][1] = +u[1][1], w) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, w.constrain = function(u) {
    return arguments.length ? (i = u, w) : i;
  }, w.duration = function(u) {
    return arguments.length ? (a = +u, w) : a;
  }, w.interpolate = function(u) {
    return arguments.length ? (h = u, w) : h;
  }, w.on = function() {
    var u = l.on.apply(l, arguments);
    return u === l ? w : u;
  }, w.clickDistance = function(u) {
    return arguments.length ? (x = (u = +u) * u, w) : Math.sqrt(x);
  }, w.tapDistance = function(u) {
    return arguments.length ? (E = +u, w) : E;
  }, w;
}
var Oi;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(Oi || (Oi = {}));
var qt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(qt || (qt = {}));
var Ii;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Ii || (Ii = {}));
var Bi;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Bi || (Bi = {}));
var Ui;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Ui || (Ui = {}));
var k;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(k || (k = {}));
k.Left + "", k.Right, k.Right + "", k.Left, k.Top + "", k.Bottom, k.Bottom + "", k.Top;
const Ca = (t, e = 0, i = 1) => Math.min(Math.max(t, e), i), Xi = (t) => !isNaN(t) && isFinite(t), Nn = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Ma({ sourceX: t, sourceY: e, targetX: i, targetY: n, sourceControlX: s, sourceControlY: r, targetControlX: o, targetControlY: a }) {
  const h = t * 0.125 + s * 0.375 + o * 0.375 + i * 0.125, l = e * 0.125 + r * 0.375 + a * 0.375 + n * 0.125, c = Math.abs(h - t), d = Math.abs(l - e);
  return [h, l, c, d];
}
function de(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function Yi({ pos: t, x1: e, y1: i, x2: n, y2: s, c: r }) {
  switch (t) {
    case k.Left:
      return [e - de(e - n, r), i];
    case k.Right:
      return [e + de(n - e, r), i];
    case k.Top:
      return [e, i - de(i - s, r)];
    case k.Bottom:
      return [e, i + de(s - i, r)];
  }
}
function Ha({ sourceX: t, sourceY: e, sourcePosition: i = k.Bottom, targetX: n, targetY: s, targetPosition: r = k.Top, curvature: o = 0.25 }) {
  const [a, h] = Yi({
    pos: i,
    x1: t,
    y1: e,
    x2: n,
    y2: s,
    c: o
  }), [l, c] = Yi({
    pos: r,
    x1: n,
    y1: s,
    x2: t,
    y2: e,
    c: o
  }), [d, f, p, m] = Ma({
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
    f,
    p,
    m
  ];
}
function Ln({ sourceX: t, sourceY: e, targetX: i, targetY: n }) {
  const s = Math.abs(i - t) / 2, r = i < t ? i + s : i - s, o = Math.abs(n - e) / 2, a = n < e ? n + o : n - o;
  return [r, a, s, o];
}
function Aa({ sourceX: t, sourceY: e, targetX: i, targetY: n }) {
  const [s, r, o, a] = Ln({
    sourceX: t,
    sourceY: e,
    targetX: i,
    targetY: n
  });
  return [`M ${t},${e}L ${i},${n}`, s, r, o, a];
}
const Wi = {
  [k.Left]: { x: -1, y: 0 },
  [k.Right]: { x: 1, y: 0 },
  [k.Top]: { x: 0, y: -1 },
  [k.Bottom]: { x: 0, y: 1 }
}, Na = ({ source: t, sourcePosition: e = k.Bottom, target: i }) => e === k.Left || e === k.Right ? t.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Zi = (t, e) => Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
function La({ source: t, sourcePosition: e = k.Bottom, target: i, targetPosition: n = k.Top, center: s, offset: r, stepPosition: o }) {
  const a = Wi[e], h = Wi[n], l = { x: t.x + a.x * r, y: t.y + a.y * r }, c = { x: i.x + h.x * r, y: i.y + h.y * r }, d = Na({
    source: l,
    sourcePosition: e,
    target: c
  }), f = d.x !== 0 ? "x" : "y", p = d[f];
  let m = [], x, E;
  const w = { x: 0, y: 0 }, H = { x: 0, y: 0 }, [, , N, T] = Ln({
    sourceX: t.x,
    sourceY: t.y,
    targetX: i.x,
    targetY: i.y
  });
  if (a[f] * h[f] === -1) {
    f === "x" ? (x = s.x ?? l.x + (c.x - l.x) * o, E = s.y ?? (l.y + c.y) / 2) : (x = s.x ?? (l.x + c.x) / 2, E = s.y ?? l.y + (c.y - l.y) * o);
    const R = [
      { x, y: l.y },
      { x, y: c.y }
    ], B = [
      { x: l.x, y: E },
      { x: c.x, y: E }
    ];
    a[f] === p ? m = f === "x" ? R : B : m = f === "x" ? B : R;
  } else {
    const R = [{ x: l.x, y: c.y }], B = [{ x: c.x, y: l.y }];
    if (f === "x" ? m = a.x === p ? B : R : m = a.y === p ? R : B, e === n) {
      const _ = Math.abs(t[f] - i[f]);
      if (_ <= r) {
        const C = Math.min(r - 1, r - _);
        a[f] === p ? w[f] = (l[f] > t[f] ? -1 : 1) * C : H[f] = (c[f] > i[f] ? -1 : 1) * C;
      }
    }
    if (e !== n) {
      const _ = f === "x" ? "y" : "x", C = a[f] === h[_], u = l[_] > c[_], v = l[_] < c[_];
      (a[f] === 1 && (!C && u || C && v) || a[f] !== 1 && (!C && v || C && u)) && (m = f === "x" ? R : B);
    }
    const et = { x: l.x + w.x, y: l.y + w.y }, it = { x: c.x + H.x, y: c.y + H.y }, vt = Math.max(Math.abs(et.x - m[0].x), Math.abs(it.x - m[0].x)), It = Math.max(Math.abs(et.y - m[0].y), Math.abs(it.y - m[0].y));
    vt >= It ? (x = (et.x + it.x) / 2, E = m[0].y) : (x = m[0].x, E = (et.y + it.y) / 2);
  }
  return [[
    t,
    { x: l.x + w.x, y: l.y + w.y },
    ...m,
    { x: c.x + H.x, y: c.y + H.y },
    i
  ], x, E, N, T];
}
function Ra(t, e, i, n) {
  const s = Math.min(Zi(t, e) / 2, Zi(e, i) / 2, n), { x: r, y: o } = e;
  if (t.x === r && r === i.x || t.y === o && o === i.y)
    return `L${r} ${o}`;
  if (t.y === o) {
    const l = t.x < i.x ? -1 : 1, c = t.y < i.y ? 1 : -1;
    return `L ${r + s * l},${o}Q ${r},${o} ${r},${o + s * c}`;
  }
  const a = t.x < i.x ? 1 : -1, h = t.y < i.y ? -1 : 1;
  return `L ${r},${o + s * h}Q ${r},${o} ${r + s * a},${o}`;
}
function Pa({ sourceX: t, sourceY: e, sourcePosition: i = k.Bottom, targetX: n, targetY: s, targetPosition: r = k.Top, borderRadius: o = 5, centerX: a, centerY: h, offset: l = 20, stepPosition: c = 0.5 }) {
  const [d, f, p, m, x] = La({
    source: { x: t, y: e },
    sourcePosition: i,
    target: { x: n, y: s },
    targetPosition: r,
    center: { x: a, y: h },
    offset: l,
    stepPosition: c
  });
  return [d.reduce((w, H, N) => {
    let T = "";
    return N > 0 && N < d.length - 1 ? T = Ra(d[N - 1], H, d[N + 1], o) : T = `${N === 0 ? "M" : "L"}${H.x} ${H.y}`, w += T, w;
  }, ""), f, p, m, x];
}
const Ta = (t, e) => t.x !== e.x || t.y !== e.y || t.zoom !== e.k, Re = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Be = ({ x: t, y: e, zoom: i }) => Le.translate(t, e).scale(i), Rt = (t, e) => t.target.closest(`.${e}`), Rn = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), Da = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Ue = (t, e = 0, i = Da, n = () => {
}) => {
  const s = typeof e == "number" && e > 0;
  return s || n(), s ? t.transition().duration(e).ease(i).on("end", n) : t;
}, Pn = (t) => {
  const e = t.ctrlKey && Nn() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function Oa({ zoomPanValues: t, noWheelClassName: e, d3Selection: i, d3Zoom: n, panOnScrollMode: s, panOnScrollSpeed: r, zoomOnPinch: o, onPanZoomStart: a, onPanZoom: h, onPanZoomEnd: l }) {
  return (c) => {
    if (Rt(c, e))
      return c.ctrlKey && c.preventDefault(), !1;
    c.preventDefault(), c.stopImmediatePropagation();
    const d = i.property("__zoom").k || 1;
    if (c.ctrlKey && o) {
      const E = wt(c), w = Pn(c), H = d * Math.pow(2, w);
      n.scaleTo(i, H, E, c);
      return;
    }
    const f = c.deltaMode === 1 ? 20 : 1;
    let p = s === qt.Vertical ? 0 : c.deltaX * f, m = s === qt.Horizontal ? 0 : c.deltaY * f;
    !Nn() && c.shiftKey && s !== qt.Vertical && (p = c.deltaY * f, m = 0), n.translateBy(
      i,
      -(p / d) * r,
      -(m / d) * r,
      // @ts-ignore
      { internal: !0 }
    );
    const x = Re(i.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling || (t.isPanScrolling = !0), t.isPanScrolling && (h?.(c, x), t.panScrollTimeout = setTimeout(() => {
      t.isPanScrolling = !1;
    }, 150));
  };
}
function Ia({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: i }) {
  return function(n, s) {
    const r = n.type === "wheel", o = !e && r && !n.ctrlKey, a = Rt(n, t);
    if (n.ctrlKey && r && a && n.preventDefault(), o || a)
      return null;
    n.preventDefault(), i.call(this, n, s);
  };
}
function Ba({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: i }) {
  return (n) => {
    if (n.sourceEvent?.internal)
      return;
    const s = Re(n.transform);
    t.mouseButton = n.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, n.sourceEvent?.type === "mousedown" && e(!0), i && i?.(n.sourceEvent, s);
  };
}
function Ua({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: i, onTransformChange: n, onPanZoom: s }) {
  return (r) => {
    t.usedRightMouseButton = !!(i && Rn(e, t.mouseButton ?? 0)), r.sourceEvent?.sync || n([r.transform.x, r.transform.y, r.transform.k]), s && !r.sourceEvent?.internal && s?.(r.sourceEvent, Re(r.transform));
  };
}
function Xa({ zoomPanValues: t, panOnDrag: e, panOnScroll: i, onDraggingChange: n, onPanZoomEnd: s, onPaneContextMenu: r }) {
  return (o) => {
    if (!o.sourceEvent?.internal && (t.isZoomingOrPanning = !1, r && Rn(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && o.sourceEvent && r(o.sourceEvent), t.usedRightMouseButton = !1, n(!1), s && Ta(t.prevViewport, o.transform))) {
      const a = Re(o.transform);
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
function Ya({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: i, panOnDrag: n, panOnScroll: s, zoomOnDoubleClick: r, userSelectionActive: o, noWheelClassName: a, noPanClassName: h, lib: l, connectionInProgress: c }) {
  return (d) => {
    const f = t || e, p = i && d.ctrlKey, m = d.type === "wheel";
    if (d.button === 1 && d.type === "mousedown" && (Rt(d, `${l}-flow__node`) || Rt(d, `${l}-flow__edge`)))
      return !0;
    if (!n && !f && !s && !r && !i || o || c && !m || Rt(d, a) && m || Rt(d, h) && (!m || s && m && !t) || !i && d.ctrlKey && m)
      return !1;
    if (!i && d.type === "touchstart" && d.touches?.length > 1)
      return d.preventDefault(), !1;
    if (!f && !s && !p && m || !n && (d.type === "mousedown" || d.type === "touchstart") || Array.isArray(n) && !n.includes(d.button) && d.type === "mousedown")
      return !1;
    const x = Array.isArray(n) && n.includes(d.button) || !d.button || d.button <= 1;
    return (!d.ctrlKey || m) && x;
  };
}
function Wa({ domNode: t, minZoom: e, maxZoom: i, paneClickDistance: n, translateExtent: s, viewport: r, onPanZoom: o, onPanZoomStart: a, onPanZoomEnd: h, onDraggingChange: l }) {
  const c = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: { x: 0, y: 0, zoom: 0 },
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, d = t.getBoundingClientRect(), f = ka().clickDistance(!Xi(n) || n < 0 ? 0 : n).scaleExtent([e, i]).translateExtent(s), p = bt(t).call(f);
  N({
    x: r.x,
    y: r.y,
    zoom: Ca(r.zoom, e, i)
  }, [
    [0, 0],
    [d.width, d.height]
  ], s);
  const m = p.on("wheel.zoom"), x = p.on("dblclick.zoom");
  f.wheelDelta(Pn);
  function E(_, C) {
    return p ? new Promise((u) => {
      f?.interpolate(C?.interpolate === "linear" ? Ft : pe).transform(Ue(p, C?.duration, C?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function w({ noWheelClassName: _, noPanClassName: C, onPaneContextMenu: u, userSelectionActive: v, panOnScroll: g, panOnDrag: b, panOnScrollMode: $, panOnScrollSpeed: z, preventScrolling: S, zoomOnPinch: A, zoomOnScroll: L, zoomOnDoubleClick: V, zoomActivationKeyPressed: P, lib: j, onTransformChange: nt, connectionInProgress: G }) {
    v && !c.isZoomingOrPanning && H();
    const Bt = g && !P && !v ? Oa({
      zoomPanValues: c,
      noWheelClassName: _,
      d3Selection: p,
      d3Zoom: f,
      panOnScrollMode: $,
      panOnScrollSpeed: z,
      zoomOnPinch: A,
      onPanZoomStart: a,
      onPanZoom: o,
      onPanZoomEnd: h
    }) : Ia({
      noWheelClassName: _,
      preventScrolling: S,
      d3ZoomHandler: m
    });
    if (p.on("wheel.zoom", Bt, { passive: !1 }), !v) {
      const qn = Ba({
        zoomPanValues: c,
        onDraggingChange: l,
        onPanZoomStart: a
      });
      f.on("start", qn);
      const Vn = Ua({
        zoomPanValues: c,
        panOnDrag: b,
        onPaneContextMenu: !!u,
        onPanZoom: o,
        onTransformChange: nt
      });
      f.on("zoom", Vn);
      const jn = Xa({
        zoomPanValues: c,
        panOnDrag: b,
        panOnScroll: g,
        onPaneContextMenu: u,
        onPanZoomEnd: h,
        onDraggingChange: l
      });
      f.on("end", jn);
    }
    const Fn = Ya({
      zoomActivationKeyPressed: P,
      panOnDrag: b,
      zoomOnScroll: L,
      panOnScroll: g,
      zoomOnDoubleClick: V,
      zoomOnPinch: A,
      userSelectionActive: v,
      noPanClassName: C,
      noWheelClassName: _,
      lib: j,
      connectionInProgress: G
    });
    f.filter(Fn), V ? p.on("dblclick.zoom", x) : p.on("dblclick.zoom", null);
  }
  function H() {
    f.on("zoom", null);
  }
  async function N(_, C, u) {
    const v = Be(_), g = f?.constrain()(v, C, u);
    return g && await E(g), new Promise((b) => b(g));
  }
  async function T(_, C) {
    const u = Be(_);
    return await E(u, C), new Promise((v) => v(u));
  }
  function W(_) {
    if (p) {
      const C = Be(_), u = p.property("__zoom");
      (u.k !== _.zoom || u.x !== _.x || u.y !== _.y) && f?.transform(p, C, null, { sync: !0 });
    }
  }
  function R() {
    const _ = p ? An(p.node()) : { x: 0, y: 0, k: 1 };
    return { x: _.x, y: _.y, zoom: _.k };
  }
  function B(_, C) {
    return p ? new Promise((u) => {
      f?.interpolate(C?.interpolate === "linear" ? Ft : pe).scaleTo(Ue(p, C?.duration, C?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function et(_, C) {
    return p ? new Promise((u) => {
      f?.interpolate(C?.interpolate === "linear" ? Ft : pe).scaleBy(Ue(p, C?.duration, C?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function it(_) {
    f?.scaleExtent(_);
  }
  function vt(_) {
    f?.translateExtent(_);
  }
  function It(_) {
    const C = !Xi(_) || _ < 0 ? 0 : _;
    f?.clickDistance(C);
  }
  return {
    update: w,
    destroy: H,
    setViewport: T,
    setViewportConstrained: N,
    getViewport: R,
    scaleTo: B,
    scaleBy: et,
    setScaleExtent: it,
    setTranslateExtent: vt,
    syncViewport: W,
    setClickDistance: It
  };
}
var Fi;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(Fi || (Fi = {}));
class Za {
  constructor(e = {}) {
    this.container = null, this.state = {
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
      nodeLookup: /* @__PURE__ */ new Map(),
      edgeLookup: /* @__PURE__ */ new Map()
    }, this.subscribers = /* @__PURE__ */ new Set(), this.panZoomInstance = null, this.pendingNodes = [], this.panZoomUpdateOptions = null, this.options = {
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
    this.container = e, this.panZoomInstance = Wa({
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
      zoomOnDoubleClick: !0,
      zoomActivationKeyPressed: !1,
      lib: "lit-flow",
      onTransformChange: (i) => {
      },
      connectionInProgress: !1
    }, this.panZoomInstance.update(this.panZoomUpdateOptions), this.notifySubscribers();
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
    this.pendingNodes.push(...e.map((i) => i.id)), this.state.nodes = e, this.updateLookups(), this.notifySubscribers();
  }
  setEdges(e) {
    this.retryEdgeRendering(e);
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
  addNode(e) {
    this.state.nodes = [...this.state.nodes, e], this.updateLookups(), this.notifySubscribers();
  }
  removeNode(e) {
    this.state.nodes = this.state.nodes.filter((i) => i.id !== e), this.state.edges = this.state.edges.filter(
      (i) => i.source !== e && i.target !== e
    ), this.updateLookups(), this.notifySubscribers();
  }
  addEdge(e) {
    this.state.edges = [...this.state.edges, e], this.updateLookups(), this.notifySubscribers();
  }
  removeEdge(e) {
    this.state.edges = this.state.edges.filter((i) => i.id !== e), this.updateLookups(), this.notifySubscribers();
  }
  subscribe(e) {
    return this.subscribers.add(e), () => this.subscribers.delete(e);
  }
  zoomIn() {
    const e = this.state.viewport.zoom, i = Math.min(e * 1.2, this.options.maxZoom || 2);
    this.setViewport({ ...this.state.viewport, zoom: i });
  }
  zoomOut() {
    const e = this.state.viewport.zoom, i = Math.max(e / 1.2, this.options.minZoom || 0.5);
    this.setViewport({ ...this.state.viewport, zoom: i });
  }
  fitView() {
    if (this.state.nodes.length === 0 || !this.container) return;
    let e = 1 / 0, i = 1 / 0, n = -1 / 0, s = -1 / 0;
    this.state.nodes.forEach((m) => {
      const x = m.measured?.width || m.width || 150, E = m.measured?.height || m.height || 50;
      e = Math.min(e, m.position.x), i = Math.min(i, m.position.y), n = Math.max(n, m.position.x + x), s = Math.max(s, m.position.y + E);
    });
    const r = {
      x: e,
      y: i,
      width: n - e,
      height: s - i
    }, o = this.container.clientWidth, a = this.container.clientHeight, h = 50, l = (o - h * 2) / r.width, c = (a - h * 2) / r.height, d = Math.min(l, c, this.options.maxZoom || 2), f = (o - r.width * d) / 2 - r.x * d, p = (a - r.height * d) / 2 - r.y * d;
    this.setViewport({ x: f, y: p, zoom: d });
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
  /**
   * Check if a node is fully rendered
   */
  isNodeRendered(e) {
    if (!this.container) return !1;
    const i = this.container.querySelector(`[id="${CSS.escape(e)}"]`);
    if (!i) return !1;
    const n = i.getBoundingClientRect();
    return n.width > 0 && n.height > 0;
  }
  /**
   * Check if any of the required nodes are still pending
   */
  hasPendingNodes(e) {
    return e.some((i) => this.pendingNodes.includes(i) || !this.isNodeRendered(i));
  }
  /**
   * Remove node from pending list when it's rendered
   */
  markNodeAsRendered(e) {
    const i = this.pendingNodes.indexOf(e);
    i > -1 && this.pendingNodes.splice(i, 1);
  }
  /**
   * Retry edge rendering with delay if nodes are still pending
   */
  retryEdgeRendering(e, i = 0, n = 10) {
    const s = e.flatMap((o) => [o.source, o.target]), r = [...new Set(s)];
    this.hasPendingNodes(r) && i < n ? setTimeout(() => {
      this.retryEdgeRendering(e, i + 1, n);
    }, 100) : (this.state.edges = e, this.updateLookups(), this.notifySubscribers(), r.forEach((o) => this.markNodeAsRendered(o)));
  }
  notifySubscribers() {
    this.subscribers.forEach((e) => e(this.state));
  }
}
function qh(t = {}) {
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
const ve = globalThis, fi = ve.ShadowRoot && (ve.ShadyCSS === void 0 || ve.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pi = Symbol(), qi = /* @__PURE__ */ new WeakMap();
let Tn = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== pi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (fi && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = qi.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && qi.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Fa = (t) => new Tn(typeof t == "string" ? t : t + "", void 0, pi), Y = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1]), t[0]);
  return new Tn(i, t, pi);
}, qa = (t, e) => {
  if (fi) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const n = document.createElement("style"), s = ve.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, t.appendChild(n);
  }
}, Vi = fi ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return Fa(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Va, defineProperty: ja, getOwnPropertyDescriptor: Ga, getOwnPropertyNames: Ka, getOwnPropertySymbols: Qa, getPrototypeOf: Ja } = Object, Pe = globalThis, ji = Pe.trustedTypes, th = ji ? ji.emptyScript : "", eh = Pe.reactiveElementPolyfillSupport, Vt = (t, e) => t, Ee = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? th : null;
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
} }, gi = (t, e) => !Va(t, e), Gi = { attribute: !0, type: String, converter: Ee, reflect: !1, useDefault: !1, hasChanged: gi };
Symbol.metadata ??= Symbol("metadata"), Pe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Lt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Gi) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, i);
      s !== void 0 && ja(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: s, set: r } = Ga(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Gi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Vt("elementProperties"))) return;
    const e = Ja(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Vt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Vt("properties"))) {
      const i = this.properties, n = [...Ka(i), ...Qa(i)];
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
      for (const s of n) i.unshift(Vi(s));
    } else e !== void 0 && i.push(Vi(e));
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
    return qa(e, this.constructor.elementStyles), e;
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
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : Ee).toAttribute(i, n.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Ee;
      this._$Em = s;
      const a = o.fromAttribute(i, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, n) {
    if (e !== void 0) {
      const s = this.constructor, r = this[e];
      if (n ??= s.getPropertyOptions(e), !((n.hasChanged ?? gi)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, n)))) return;
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
Lt.elementStyles = [], Lt.shadowRootOptions = { mode: "open" }, Lt[Vt("elementProperties")] = /* @__PURE__ */ new Map(), Lt[Vt("finalized")] = /* @__PURE__ */ new Map(), eh?.({ ReactiveElement: Lt }), (Pe.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = globalThis, ke = mi.trustedTypes, Ki = ke ? ke.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Dn = "$lit$", xt = `lit$${Math.random().toFixed(9).slice(2)}$`, On = "?" + xt, ih = `<${On}>`, Ct = document, Qt = () => Ct.createComment(""), Jt = (t) => t === null || typeof t != "object" && typeof t != "function", yi = Array.isArray, nh = (t) => yi(t) || typeof t?.[Symbol.iterator] == "function", Xe = `[ 	
\f\r]`, Yt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qi = /-->/g, Ji = />/g, $t = RegExp(`>|${Xe}(?:([^\\s"'>=/]+)(${Xe}*=${Xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tn = /'/g, en = /"/g, In = /^(?:script|style|textarea|title)$/i, Bn = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), M = Bn(1), Q = Bn(2), Mt = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), nn = /* @__PURE__ */ new WeakMap(), zt = Ct.createTreeWalker(Ct, 129);
function Un(t, e) {
  if (!yi(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ki !== void 0 ? Ki.createHTML(e) : e;
}
const sh = (t, e) => {
  const i = t.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Yt;
  for (let a = 0; a < i; a++) {
    const h = t[a];
    let l, c, d = -1, f = 0;
    for (; f < h.length && (o.lastIndex = f, c = o.exec(h), c !== null); ) f = o.lastIndex, o === Yt ? c[1] === "!--" ? o = Qi : c[1] !== void 0 ? o = Ji : c[2] !== void 0 ? (In.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = $t) : c[3] !== void 0 && (o = $t) : o === $t ? c[0] === ">" ? (o = s ?? Yt, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? $t : c[3] === '"' ? en : tn) : o === en || o === tn ? o = $t : o === Qi || o === Ji ? o = Yt : (o = $t, s = void 0);
    const p = o === $t && t[a + 1].startsWith("/>") ? " " : "";
    r += o === Yt ? h + ih : d >= 0 ? (n.push(l), h.slice(0, d) + Dn + h.slice(d) + xt + p) : h + xt + (d === -2 ? a : p);
  }
  return [Un(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class te {
  constructor({ strings: e, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, h = this.parts, [l, c] = sh(e, i);
    if (this.el = te.createElement(l, n), zt.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = zt.nextNode()) !== null && h.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Dn)) {
          const f = c[o++], p = s.getAttribute(d).split(xt), m = /([.?@])?(.*)/.exec(f);
          h.push({ type: 1, index: r, name: m[2], strings: p, ctor: m[1] === "." ? oh : m[1] === "?" ? ah : m[1] === "@" ? hh : Te }), s.removeAttribute(d);
        } else d.startsWith(xt) && (h.push({ type: 6, index: r }), s.removeAttribute(d));
        if (In.test(s.tagName)) {
          const d = s.textContent.split(xt), f = d.length - 1;
          if (f > 0) {
            s.textContent = ke ? ke.emptyScript : "";
            for (let p = 0; p < f; p++) s.append(d[p], Qt()), zt.nextNode(), h.push({ type: 2, index: ++r });
            s.append(d[f], Qt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === On) h.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(xt, d + 1)) !== -1; ) h.push({ type: 7, index: r }), d += xt.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = Ct.createElement("template");
    return n.innerHTML = e, n;
  }
}
function Ot(t, e, i = t, n) {
  if (e === Mt) return e;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = Jt(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = s : i._$Cl = s), s !== void 0 && (e = Ot(t, s._$AS(t, e.values), s, n)), e;
}
class rh {
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
    const { el: { content: i }, parts: n } = this._$AD, s = (e?.creationScope ?? Ct).importNode(i, !0);
    zt.currentNode = s;
    let r = zt.nextNode(), o = 0, a = 0, h = n[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new se(r, r.nextSibling, this, e) : h.type === 1 ? l = new h.ctor(r, h.name, h.strings, this, e) : h.type === 6 && (l = new lh(r, this, e)), this._$AV.push(l), h = n[++a];
      }
      o !== h?.index && (r = zt.nextNode(), o++);
    }
    return zt.currentNode = Ct, s;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class se {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, s) {
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = Ot(this, e, i), Jt(e) ? e === O || e == null || e === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : e !== this._$AH && e !== Mt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : nh(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== O && Jt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ct.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = te.createElement(Un(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new rh(s, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = nn.get(e.strings);
    return i === void 0 && nn.set(e.strings, i = new te(e)), i;
  }
  k(e) {
    yi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of e) s === i.length ? i.push(n = new se(this.O(Qt()), this.O(Qt()), this, this.options)) : n = i[s], n._$AI(r), s++;
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
class Te {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, s, r) {
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = O;
  }
  _$AI(e, i = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = Ot(this, e, i, 0), o = !Jt(e) || e !== this._$AH && e !== Mt, o && (this._$AH = e);
    else {
      const a = e;
      let h, l;
      for (e = r[0], h = 0; h < r.length - 1; h++) l = Ot(this, a[n + h], i, h), l === Mt && (l = this._$AH[h]), o ||= !Jt(l) || l !== this._$AH[h], l === O ? e = O : e !== O && (e += (l ?? "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class oh extends Te {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === O ? void 0 : e;
  }
}
class ah extends Te {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== O);
  }
}
class hh extends Te {
  constructor(e, i, n, s, r) {
    super(e, i, n, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Ot(this, e, i, 0) ?? O) === Mt) return;
    const n = this._$AH, s = e === O && n !== O || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== O && (n === O || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class lh {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ot(this, e);
  }
}
const ch = mi.litHtmlPolyfillSupport;
ch?.(te, se), (mi.litHtmlVersions ??= []).push("3.3.1");
const Xn = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new se(e.insertBefore(Qt(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vi = globalThis;
let U = class extends Lt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Xn(i, this.renderRoot, this.renderOptions);
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
U._$litElement$ = !0, U.finalized = !0, vi.litElementHydrateSupport?.({ LitElement: U });
const dh = vi.litElementPolyfillSupport;
dh?.({ LitElement: U });
(vi.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yn = Symbol.for(""), uh = (t) => {
  if (t?.r === Yn) return t?._$litStatic$;
}, ue = (t) => ({ _$litStatic$: t, r: Yn }), sn = /* @__PURE__ */ new Map(), fh = (t) => (e, ...i) => {
  const n = i.length;
  let s, r;
  const o = [], a = [];
  let h, l = 0, c = !1;
  for (; l < n; ) {
    for (h = e[l]; l < n && (r = i[l], (s = uh(r)) !== void 0); ) h += s + e[++l], c = !0;
    l !== n && a.push(r), o.push(h), l++;
  }
  if (l === n && o.push(e[n]), c) {
    const d = o.join("$$lit$$");
    (e = sn.get(d)) === void 0 && (o.raw = o, sn.set(d, e = o)), i = a;
  }
  return t(e, ...i);
}, Z = fh(M);
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
const ph = { attribute: !0, type: String, converter: Ee, reflect: !1, hasChanged: gi }, gh = (t = ph, e, i) => {
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
function y(t) {
  return (e, i) => typeof i == "object" ? gh(t, e, i) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
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
const Wn = "important", wh = " !" + Wn, bh = yh(class extends vh {
  constructor(t) {
    if (super(t), t.type !== mh.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const r = typeof s == "string" && s.endsWith(wh);
        n.includes("-") || r ? i.setProperty(n, r ? s.slice(0, -11) : s, r ? Wn : "") : i[n] = s;
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
function Je(t) {
  return Ha(t);
}
function rn(t) {
  return Pa(t);
}
function xh(t) {
  return Aa(t);
}
function tl(t, e) {
  return t.x >= e.x && t.x <= e.x + e.width && t.y >= e.y && t.y <= e.y + e.height;
}
var $h = Object.defineProperty, _h = Object.getOwnPropertyDescriptor, At = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? _h(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && $h(e, i, s), s;
};
let gt = class extends U {
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
          const f = d.tagName.toLowerCase();
          if (f === "flow-node" || Object.values(this.nodeTypes).some((p) => p === f)) {
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
          const f = this.nodes.find((p) => p.id === s);
          f && f.type === "shape" && (l = this.determineBestTargetHandle(o, s));
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
    }, this.instance = new Za({ nodes: this.nodes, edges: this.edges });
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
    const s = i.position.x, r = i.position.y, o = n.position.x, a = n.position.y, h = n.data, l = h?.size?.width || 200, c = h?.size?.height || 200, d = s + (i.width || 150) / 2, f = r + (i.height || 50) / 2, p = o + l / 2, m = a + c / 2, x = p - d, E = m - f;
    return Math.abs(x) > Math.abs(E) ? x > 0 ? `${e}-target-left` : `${e}-target-right` : E > 0 ? `${e}-target-top` : `${e}-target-bottom`;
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
    const [, a, h] = Je({
      sourceX: n,
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
    super.disconnectedCallback(), this.unsubscribe?.(), this.instance.destroy();
    const t = this.renderRoot.querySelector(".flow-container");
    t?.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("mouseup", this.onMouseUp), t?.removeEventListener("node-select", this.onNodeSelect), document.removeEventListener("edge-select", this.onEdgeSelect), t?.removeEventListener("mouseenter", this.onNodeMouseEnter, !0), t?.removeEventListener("mouseleave", this.onNodeMouseLeave, !0);
  }
  /**
   * Renders a node with dynamic tag name based on node type
   * Falls back to 'flow-node' if type is not registered
   */
  renderNode(t) {
    const e = t.type || "default", i = this.nodeTypes[e] || "flow-node", n = ue(i);
    return Z`
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
    return Z`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${bh({ transform: t })}
        >
          <div class="flow-edges-layer">
            ${this.edges.map((e) => {
      const i = this.nodes.find((s) => s.id === e.source), n = this.nodes.find((s) => s.id === e.target);
      return !i || !n ? null : Z`
                <flow-edge 
                  .id=${e.id}
                  .source=${e.source}
                  .target=${e.target}
                  .sourceHandle=${e.sourceHandle}
                  .targetHandle=${e.targetHandle}
                  .sourceNode=${i}
                  .targetNode=${n}
                  .animated=${e.animated || !1}
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
          <div class="flow-nodes-layer">
            ${this.nodes.map((e) => this.renderNode(e))}
          </div>
          <div class="flow-labels-overlay">
            ${this.edges.map((e) => {
      const i = e.data && e.data.labelWidget, n = e.data && e.data.labelData, s = e.data && e.data.labelHtml, r = e.data && e.data.label;
      if (!(!!i || !!s || !!r)) return null;
      const a = this.computeLabelCanvasPosition(e);
      if (!a) return null;
      const h = `transform: translate(-50%, -50%) translate(${a.x}px, ${a.y}px);`;
      if (i) {
        const l = ue(i);
        return Z`<div class="edge-label" style="${h}"><${l} .data=${n}></${l}></div>`;
      }
      return s ? Z`<div class="edge-label" style="${h}" .innerHTML=${s}></div>` : Z`<div class="edge-label" style="${h}">${r}</div>`;
    })}
            ${this.edges.map((e) => {
      const i = e.data && e.data.startLabelWidget, n = e.data && e.data.startLabelData, s = e.data && e.data.startLabelHtml, r = e.data && e.data.startLabel;
      if (!i && !s && !r) return null;
      const o = this.computeStartLabelCanvasPosition(e);
      if (!o) return null;
      const a = `transform: translate(-50%, -50%) translate(${o.x}px, ${o.y}px);`;
      if (i) {
        const h = ue(i);
        return Z`<div class="edge-label" style="${a}"><${h} .data=${n}></${h}></div>`;
      }
      return s ? Z`<div class="edge-label" style="${a}" .innerHTML=${s}></div>` : Z`<div class="edge-label" style="${a}">${r}</div>`;
    })}
            ${this.edges.map((e) => {
      const i = e.data && e.data.endLabelWidget, n = e.data && e.data.endLabelData, s = e.data && e.data.endLabelHtml, r = e.data && e.data.endLabel;
      if (!i && !s && !r) return null;
      const o = this.computeEndLabelCanvasPosition(e);
      if (!o) return null;
      const a = `transform: translate(-50%, -50%) translate(${o.x}px, ${o.y}px);`;
      if (i) {
        const h = ue(i);
        return Z`<div class="edge-label" style="${a}"><${h} .data=${n}></${h}></div>`;
      }
      return s ? Z`<div class="edge-label" style="${a}" .innerHTML=${s}></div>` : Z`<div class="edge-label" style="${a}">${r}</div>`;
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
    return e ? Z`
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
      ` : i ? Z`
        <flow-edge
          .id=${"preview"}
          .source=${"__preview__"}
          .target=${i.id}
          .sourceNode=${{ id: "__preview__", position: { x: t.x, y: t.y }, width: 1, height: 1, data: {} }}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{ ...i, position: i.position }}
          .animated=${!0}
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

    .edge-label:has(*) {
      /* Remove default styling when custom widget is used */
      background: transparent;
      border: none;
      padding: 0;
    }
  `;
At([
  y({ type: Array })
], gt.prototype, "nodes", 2);
At([
  y({ type: Array })
], gt.prototype, "edges", 2);
At([
  y({ type: Object })
], gt.prototype, "viewport", 2);
At([
  y({ type: Object })
], gt.prototype, "onConnectStart", 2);
At([
  y({ type: Object })
], gt.prototype, "onConnectEnd", 2);
At([
  y({ type: Object })
], gt.prototype, "nodeTypes", 2);
gt = At([
  q("flow-canvas")
], gt);
var zh = Object.defineProperty, Sh = Object.getOwnPropertyDescriptor, Nt = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Sh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && zh(e, i, s), s;
};
let mt = class extends U {
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
    return this.visible ? M`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    ` : M``;
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
Nt([
  y({ type: Boolean, reflect: !0 })
], mt.prototype, "visible", 2);
Nt([
  y({ type: Number })
], mt.prototype, "minWidth", 2);
Nt([
  y({ type: Number })
], mt.prototype, "minHeight", 2);
Nt([
  y({ type: Number })
], mt.prototype, "maxWidth", 2);
Nt([
  y({ type: Number })
], mt.prototype, "maxHeight", 2);
Nt([
  y({ type: Boolean })
], mt.prototype, "keepAspectRatio", 2);
mt = Nt([
  q("node-resizer")
], mt);
var Eh = Object.defineProperty, kh = Object.getOwnPropertyDescriptor, yt = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? kh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Eh(e, i, s), s;
};
let J = class extends U {
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
    this.draggable && this.addEventListener("mousedown", this.handleMouseDown), this.addEventListener("click", this.handleClick), this.addEventListener("wheel", this.handleWheel, { passive: !1 }), this.resizable && (this.addEventListener("resize", this.handleResize), this.addEventListener("resize-end", this.handleResizeEnd)), this.updateMeasuredSize();
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
    return M`
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
      ${this.resizable ? M`
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
J.styles = Y`
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
yt([
  y({ type: String, reflect: !0 })
], J.prototype, "id", 2);
yt([
  y({ type: Object })
], J.prototype, "data", 2);
yt([
  y({ type: Object })
], J.prototype, "position", 2);
yt([
  y({ type: Boolean, reflect: !0 })
], J.prototype, "selected", 2);
yt([
  y({ type: Boolean, reflect: !0 })
], J.prototype, "dragging", 2);
yt([
  y({ type: Boolean })
], J.prototype, "draggable", 2);
yt([
  y({ type: Object })
], J.prototype, "instance", 2);
yt([
  y({ type: Boolean })
], J.prototype, "resizable", 2);
J = yt([
  q("flow-node")
], J);
var Ch = Object.defineProperty, Mh = Object.getOwnPropertyDescriptor, X = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Mh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Ch(e, i, s), s;
};
let I = class extends U {
  constructor() {
    super(...arguments), this.id = "", this.source = "", this.target = "", this.animated = !1, this.selected = !1, this.label = "", this.type = "default", this.markerHandleHalf = 5;
  }
  // half of node handle diameter (10px)
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
      const l = e.width ?? 10, c = e.height ?? 10, d = (e.refX ?? l) + this.markerHandleHalf, f = e.refY ?? c / 2, p = e.color ?? "currentColor", m = e.orient ?? "auto";
      return `<marker id="${t}" markerWidth="${l}" markerHeight="${c}" refX="${d}" refY="${f}" orient="${m}" markerUnits="userSpaceOnUse"><path d="${e.path}" fill="${p}" stroke="${p}"/></marker>`;
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
        return xh({
          sourceX: i,
          sourceY: n,
          targetX: s,
          targetY: r
        });
      case "smoothstep":
        return rn({
          sourceX: i,
          sourceY: n,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a
        });
      case "step":
        return rn({
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
        return Je({
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
        return Je({
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
      const i = this.getHandlePosition(this.sourceNode.id, this.sourceHandle);
      if (i)
        return { ...i, position: k.Right };
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
      return M``;
    const t = this.getSourcePosition(), e = this.getTargetPosition(), [i, n, s, r, o] = this.getPathForType(t, e), a = [
      "edge-path",
      this.animated && "animated",
      this.selected && "selected"
    ].filter(Boolean).join(" "), h = this.getMarkerId(this.markerStart), l = this.getMarkerId(this.markerEnd), c = h ? `url(#${h})` : void 0, d = l ? `url(#${l})` : void 0, f = this.animated ? "5" : "", p = this.pathStyle ? typeof this.pathStyle == "string" ? this.pathStyle : this.convertStyleObjToString(this.pathStyle) : "";
    return M`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${h && typeof this.markerStart == "object" ? Q`<marker id="${h}" markerWidth="${this.markerStart.width || 10}" markerHeight="${this.markerStart.height || 10}" refX="${((this.markerStart.type === "custom" ? this.markerStart.refX : void 0) || this.markerStart.width || 10) + this.markerHandleHalf}" refY="${(this.markerStart.type === "custom" ? this.markerStart.refY : void 0) || (this.markerStart.height || 10) / 2}" orient="${this.markerStart.orient || "auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type === "custom" ? Q`<path d="${this.markerStart.path}" fill="${this.markerStart.color || "currentColor"}" stroke="${this.markerStart.color || "currentColor"}"/>` : this.markerStart.type === "ArrowClosed" ? Q`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10} Z" fill="${this.markerStart.color || "currentColor"}"/>` : Q`<path d="M0,0 L${this.markerStart.width || 10},${(this.markerStart.height || 10) / 2} L0,${this.markerStart.height || 10}" fill="none" stroke="${this.markerStart.color || "currentColor"}" stroke-width="2"/>`}
            </marker>` : ""}
          ${l && typeof this.markerEnd == "object" ? Q`<marker id="${l}" markerWidth="${this.markerEnd.width || 10}" markerHeight="${this.markerEnd.height || 10}" refX="${((this.markerEnd.type === "custom" ? this.markerEnd.refX : void 0) || this.markerEnd.width || 10) + this.markerHandleHalf}" refY="${(this.markerEnd.type === "custom" ? this.markerEnd.refY : void 0) || (this.markerEnd.height || 10) / 2}" orient="${this.markerEnd.orient || "auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type === "custom" ? Q`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color || "currentColor"}" stroke="${this.markerEnd.color || "currentColor"}"/>` : this.markerEnd.type === "ArrowClosed" ? Q`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10} Z" fill="${this.markerEnd.color || "currentColor"}"/>` : Q`<path d="M0,0 L${this.markerEnd.width || 10},${(this.markerEnd.height || 10) / 2} L0,${this.markerEnd.height || 10}" fill="none" stroke="${this.markerEnd.color || "currentColor"}" stroke-width="2"/>`}
            </marker>` : ""}
        </defs>
        ${Q`
          <path 
            class="${a}"
            d="${i}"
            style="${p}"
            stroke-dasharray="${f}"
            marker-start="${c ?? ""}"
            marker-end="${d ?? ""}"
            @click=${this.handleClick}
          />
          ${this.label ? Q`
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
    t.stopPropagation();
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
I.styles = Y`
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
X([
  y({ type: String })
], I.prototype, "id", 2);
X([
  y({ type: String })
], I.prototype, "source", 2);
X([
  y({ type: String })
], I.prototype, "target", 2);
X([
  y({ type: String })
], I.prototype, "sourceHandle", 2);
X([
  y({ type: String })
], I.prototype, "targetHandle", 2);
X([
  y({ type: Object })
], I.prototype, "sourceNode", 2);
X([
  y({ type: Object })
], I.prototype, "targetNode", 2);
X([
  y({ type: Boolean })
], I.prototype, "animated", 2);
X([
  y({ type: Boolean })
], I.prototype, "selected", 2);
X([
  y({ type: String })
], I.prototype, "label", 2);
X([
  y({ type: String })
], I.prototype, "type", 2);
X([
  y({ type: Object })
], I.prototype, "markerStart", 2);
X([
  y({ type: Object })
], I.prototype, "markerEnd", 2);
X([
  y({ type: Number })
], I.prototype, "offset", 2);
X([
  y({ type: Object })
], I.prototype, "pathStyle", 2);
I = X([
  q("flow-edge")
], I);
var Hh = Object.defineProperty, Ah = Object.getOwnPropertyDescriptor, re = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ah(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Hh(e, i, s), s;
};
let Ht = class extends U {
  constructor() {
    super(...arguments), this.variant = "dots", this.gap = 20, this.color = "#ddd", this.size = 1;
  }
  render() {
    const t = `flow-bg-pattern-${Math.random().toString(36).substr(2, 9)}`;
    return M`
      <svg>
        <defs>
          ${this.variant === "dots" ? this.renderDotsPattern(t) : this.renderLinesPattern(t)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${t})" />
      </svg>
    `;
  }
  renderDotsPattern(t) {
    return Q`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `;
  }
  renderLinesPattern(t) {
    return Q`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `;
  }
};
Ht.styles = Y`
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
  y({ type: String })
], Ht.prototype, "variant", 2);
re([
  y({ type: Number })
], Ht.prototype, "gap", 2);
re([
  y({ type: String })
], Ht.prototype, "color", 2);
re([
  y({ type: Number })
], Ht.prototype, "size", 2);
Ht = re([
  q("flow-background")
], Ht);
var Nh = Object.defineProperty, Lh = Object.getOwnPropertyDescriptor, wi = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Lh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Nh(e, i, s), s;
};
let ee = class extends U {
  constructor() {
    super(...arguments), this.width = 200, this.height = 150;
  }
  render() {
    return M`
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `;
  }
};
ee.styles = Y`
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
wi([
  y({ type: Number })
], ee.prototype, "width", 2);
wi([
  y({ type: Number })
], ee.prototype, "height", 2);
ee = wi([
  q("flow-minimap")
], ee);
var Rh = Object.defineProperty, Ph = Object.getOwnPropertyDescriptor, Zn = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ph(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Rh(e, i, s), s;
};
let Ce = class extends U {
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
    return M`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `;
  }
};
Ce.styles = Y`
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
Zn([
  y({ type: Object })
], Ce.prototype, "instance", 2);
Ce = Zn([
  q("flow-controls")
], Ce);
var Th = Object.getOwnPropertyDescriptor, Dh = Object.getPrototypeOf, Oh = Reflect.get, Ih = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Th(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(s) || s);
  return s;
}, Ye = (t, e, i) => Oh(Dh(t), i, e);
let ut = class extends J {
  constructor() {
    super(...arguments), this.appliedInitialSize = !1;
  }
  firstUpdated() {
    const t = this.data, e = t?.size?.width, i = t?.size?.height;
    (typeof e == "number" && e > 0 || typeof i == "number" && i > 0) && (typeof e == "number" && e > 0 && (this.style.width = `${e}px`), typeof i == "number" && i > 0 && (this.style.height = `${i}px`), this.instance && this.instance.updateNode(this.id, {
      width: typeof e == "number" && e > 0 ? e : this.width,
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
    return M`
      <div class="table-header" style="${t.color ? `background: ${t.color}` : ""}">
        <span class="table-icon">📊</span>
        <span>${e}</span>
      </div>
      
      <div class="table-body nowheel">
        ${i.map((n) => M`
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
      ${this.resizable ? M`
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
  ...Array.isArray(Ye(ut, ut, "styles")) ? Ye(ut, ut, "styles") : [Ye(ut, ut, "styles")],
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
ut = Ih([
  q("erd-table-node")
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
], bi = class bi {
  /**
   * Initialize the registry with default shapes
   */
  static initialize() {
    [...Bh, ...Uh, ...Xh].forEach((i) => {
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
bi.shapes = /* @__PURE__ */ new Map();
let Me = bi;
Me.initialize();
var Yh = Object.defineProperty, Wh = Object.getOwnPropertyDescriptor, ct = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Wh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Yh(e, i, s), s;
};
let tt = class extends U {
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
      return Me.get(this.data.type);
  }
  /**
   * Render the SVG shape
   */
  renderShape() {
    const t = this.getShapeDefinition();
    if (!t)
      return M`
        <div class="unknown-shape">
          Unknown shape: ${this.data?.type || "undefined"}
        </div>
      `;
    const e = this.data, i = e.size || t.defaultSize, n = e.backgroundColor || e.color || "#ffffff", s = e.strokeColor || "#000000", r = e.strokeWidth || 2, o = e.rotation || 0;
    return M`
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
        return M`
          <defs>
            <linearGradient id="${e}" x1="0%" y1="0%" x2="100%" y2="100%">
              ${i.colors.map(
          (n, s) => M`<stop offset="${s / (i.colors.length - 1) * 100}%" stop-color="${n}"/>`
        )}
            </linearGradient>
          </defs>
        `;
      if (i.type === "radial")
        return M`
          <defs>
            <radialGradient id="${e}" cx="50%" cy="50%" r="50%">
              ${i.colors.map(
          (n, s) => M`<stop offset="${s / (i.colors.length - 1) * 100}%" stop-color="${n}"/>`
        )}
            </radialGradient>
          </defs>
        `;
    }
    return M``;
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
    const t = this.getShapeDefinition(), i = this.data?.size || t?.defaultSize || { width: 200, height: 200 };
    return this.style.setProperty("--shape-width", `${i.width}px`), this.style.setProperty("--shape-height", `${i.height}px`), M`
      <div class="shape-node ${this.selected ? "selected" : ""}">
        ${this.renderGradients()}
        ${this.renderShape()}
        <div class="shape-content">
          <slot></slot>
        </div>
        ${this.connectable ? this.renderHandles() : ""}
        ${this.renderLabel()}
      </div>
      ${this.resizable ? M`
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
    return M`
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
    return M`
      <div class="shape-label">
        ${e}
      </div>
    `;
  }
};
tt.styles = Y`
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
  y({ type: String, reflect: !0 })
], tt.prototype, "id", 2);
ct([
  y({ type: Object })
], tt.prototype, "data", 2);
ct([
  y({
    type: Object,
    hasChanged: (t, e) => !e || t.x !== e.x || t.y !== e.y
  })
], tt.prototype, "position", 2);
ct([
  y({ type: Boolean, reflect: !0 })
], tt.prototype, "selected", 2);
ct([
  y({ type: Boolean, reflect: !0 })
], tt.prototype, "dragging", 2);
ct([
  y({ type: Boolean })
], tt.prototype, "draggable", 2);
ct([
  y({ type: Boolean })
], tt.prototype, "connectable", 2);
ct([
  y({ type: Object })
], tt.prototype, "instance", 2);
ct([
  y({ type: Boolean })
], tt.prototype, "resizable", 2);
tt = ct([
  q("shape-node")
], tt);
var Zh = Object.getOwnPropertyDescriptor, oe = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Zh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(s) || s);
  return s;
};
let ti = class extends U {
  render() {
    return M`<slot></slot>`;
  }
};
ti.styles = Y`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;
ti = oe([
  q("base-node")
], ti);
let ei = class extends U {
  render() {
    return M`<slot></slot>`;
  }
};
ei.styles = Y`
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
ei = oe([
  q("base-node-header")
], ei);
let ii = class extends U {
  render() {
    return M`<span class="title"><slot></slot></span>`;
  }
};
ii.styles = Y`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;
ii = oe([
  q("base-node-header-title")
], ii);
let ni = class extends U {
  render() {
    return M`<slot></slot>`;
  }
};
ni.styles = Y`
    :host {
      display: block;
      padding: 12px;
    }
  `;
ni = oe([
  q("base-node-content")
], ni);
let si = class extends U {
  render() {
    return M`<slot></slot>`;
  }
};
si.styles = Y`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;
si = oe([
  q("base-node-footer")
], si);
var Fh = Object.defineProperty, D = (t, e, i, n) => {
  for (var s = void 0, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(e, i, s) || s);
  return s && Fh(e, i, s), s;
};
const el = (t) => {
  class e extends t {
    constructor() {
      super(...arguments), this.id = "", this.position = { x: 0, y: 0 }, this.data = {}, this.selected = !1, this.dragging = !1, this.instance = null, this.resizable = !1, this.draggable = !0, this.drag_handle_selector = null, this.connectable = !0, this.minWidth = 10, this.maxWidth = Number.MAX_VALUE, this.minHeight = 10, this.maxHeight = Number.MAX_VALUE, this.keepAspectRatio = !1, this.maxInitialHeight = 0, this.width = void 0, this.height = void 0, this.isDragging = !1, this.dragStart = { x: 0, y: 0 }, this.nodeStart = { x: 0, y: 0 }, this.isResizing = !1, this.resizeStart = { x: 0, y: 0, width: 0, height: 0 }, this.resizeHandle = "", this.dragHandleElement = null, this.handleClick = (n) => {
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
      super.connectedCallback(), this.draggable && !this.drag_handle_selector && this.addEventListener("mousedown", this.handleMouseDown), this.addEventListener("click", this.handleClick), this.addEventListener("wheel", this.handleWheel, { passive: !1 }), document.addEventListener("click", this.handleGlobalClick);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this.removeEventListener("mousedown", this.handleMouseDown), this.removeEventListener("click", this.handleClick), this.removeEventListener("wheel", this.handleWheel), document.removeEventListener("click", this.handleGlobalClick), this.removeDragHandleListener(), this.cleanup();
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
      return !this.resizable || !this.selected ? M`` : M`
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
        this.attachDragHandleListener(), this.adjustHeightToContent();
      });
    }
    updated(n) {
      super.updated(n), this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`, n.has("width") && (typeof this.width == "number" && this.width > 0 ? this.style.width = `${this.width}px` : this.style.width = ""), n.has("height") && (typeof this.height == "number" && this.height > 0 ? this.style.height = `${this.height}px` : this.style.height = ""), n.has("maxInitialHeight") && !this.isResizing && Promise.resolve().then(() => {
        this.adjustHeightToContent();
      }), (n.has("resizable") || n.has("selected")) && this.appendResizerToDOM(), (n.has("drag_handle_selector") || n.has("draggable")) && Promise.resolve().then(() => {
        this.attachDragHandleListener();
      }), n.has("drag_handle_selector") && (this.drag_handle_selector ? this.setAttribute("data-drag-handle-selector", "") : this.removeAttribute("data-drag-handle-selector"));
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
          `, this.shadowRoot?.appendChild(s), Xn(n, s);
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
      if (await this.updateComplete, await new Promise((o) => setTimeout(o, 0)), this.instance && this.id) {
        if (r) {
          const o = this.getBoundingClientRect(), a = o.width, h = o.height;
          this.instance.updateNode(this.id, {
            width: a,
            height: h,
            measured: { width: a, height: h }
          });
        }
        this.dispatchEvent(new CustomEvent("node-handles-updated", {
          detail: {
            nodeId: this.id,
            handleIds: s || [],
            timestamp: Date.now()
          },
          bubbles: !0,
          composed: !0
        }));
      }
    }
  }
  return D([
    y({ type: String, reflect: !0 })
  ], e.prototype, "id"), D([
    y({ type: Object })
  ], e.prototype, "position"), D([
    y({ type: Object })
  ], e.prototype, "data"), D([
    y({ type: Boolean, reflect: !0 })
  ], e.prototype, "selected"), D([
    y({ type: Boolean, reflect: !0 })
  ], e.prototype, "dragging"), D([
    y({ type: Object })
  ], e.prototype, "instance"), D([
    y({ type: Boolean })
  ], e.prototype, "resizable"), D([
    y({ type: Boolean })
  ], e.prototype, "draggable"), D([
    y({ type: String })
  ], e.prototype, "drag_handle_selector"), D([
    y({ type: Boolean })
  ], e.prototype, "connectable"), D([
    y({ type: Number })
  ], e.prototype, "minWidth"), D([
    y({ type: Number })
  ], e.prototype, "maxWidth"), D([
    y({ type: Number })
  ], e.prototype, "minHeight"), D([
    y({ type: Number })
  ], e.prototype, "maxHeight"), D([
    y({ type: Boolean })
  ], e.prototype, "keepAspectRatio"), D([
    y({ type: Number })
  ], e.prototype, "maxInitialHeight"), D([
    y({ type: Number })
  ], e.prototype, "width"), D([
    y({ type: Number })
  ], e.prototype, "height"), e;
};
export {
  ti as BaseNode,
  ni as BaseNodeContent,
  si as BaseNodeFooter,
  ei as BaseNodeHeader,
  ii as BaseNodeHeaderTitle,
  ut as ERDTableNode,
  Ht as FlowBackground,
  gt as FlowCanvas,
  Ce as FlowControls,
  I as FlowEdge,
  Za as FlowInstance,
  ee as FlowMinimap,
  J as FlowNode,
  el as NodeMixin,
  mt as NodeResizer,
  k as Position,
  tt as ShapeNode,
  Me as ShapeRegistry,
  qh as createStore,
  Je as getBezierPath,
  Jh as getCenter,
  Qh as getDistance,
  rn as getSmoothStepPath,
  xh as getStraightPath,
  tl as isPointInRect
};
//# sourceMappingURL=lit-flow.bundle.js.map
