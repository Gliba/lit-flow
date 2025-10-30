var Gn = { value: () => {
} };
function si() {
  for (var t = 0, e = arguments.length, i = {}, n; t < e; ++t) {
    if (!(n = arguments[t] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new ue(i);
}
function ue(t) {
  this._ = t;
}
function jn(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !e.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
ue.prototype = si.prototype = {
  constructor: ue,
  on: function(t, e) {
    var i = this._, n = jn(t + "", i), s, r = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++r < o; ) if ((s = (t = n[r]).type) && (s = Kn(i[s], t.name))) return s;
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
    return new ue(t);
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
function Kn(t, e) {
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
var Ye = "http://www.w3.org/1999/xhtml";
const bi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ye,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Me(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), bi.hasOwnProperty(e) ? { space: bi[e], local: t } : t;
}
function Qn(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === Ye && e.documentElement.namespaceURI === Ye ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function Jn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function rn(t) {
  var e = Me(t);
  return (e.local ? Jn : Qn)(e);
}
function ts() {
}
function ri(t) {
  return t == null ? ts : function() {
    return this.querySelector(t);
  };
}
function es(t) {
  typeof t != "function" && (t = ri(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = new Array(o), h, l, c = 0; c < o; ++c)
      (h = r[c]) && (l = t.call(h, h.__data__, c, r)) && ("__data__" in h && (l.__data__ = h.__data__), a[c] = l);
  return new j(n, this._parents);
}
function is(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ns() {
  return [];
}
function on(t) {
  return t == null ? ns : function() {
    return this.querySelectorAll(t);
  };
}
function ss(t) {
  return function() {
    return is(t.apply(this, arguments));
  };
}
function rs(t) {
  typeof t == "function" ? t = ss(t) : t = on(t);
  for (var e = this._groups, i = e.length, n = [], s = [], r = 0; r < i; ++r)
    for (var o = e[r], a = o.length, h, l = 0; l < a; ++l)
      (h = o[l]) && (n.push(t.call(h, h.__data__, l, o)), s.push(h));
  return new j(n, s);
}
function an(t) {
  return function() {
    return this.matches(t);
  };
}
function hn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var os = Array.prototype.find;
function as(t) {
  return function() {
    return os.call(this.children, t);
  };
}
function hs() {
  return this.firstElementChild;
}
function ls(t) {
  return this.select(t == null ? hs : as(typeof t == "function" ? t : hn(t)));
}
var cs = Array.prototype.filter;
function ds() {
  return Array.from(this.children);
}
function us(t) {
  return function() {
    return cs.call(this.children, t);
  };
}
function fs(t) {
  return this.selectAll(t == null ? ds : us(typeof t == "function" ? t : hn(t)));
}
function ps(t) {
  typeof t != "function" && (t = an(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = [], h, l = 0; l < o; ++l)
      (h = r[l]) && t.call(h, h.__data__, l, r) && a.push(h);
  return new j(n, this._parents);
}
function ln(t) {
  return new Array(t.length);
}
function gs() {
  return new j(this._enter || this._groups.map(ln), this._parents);
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
function ms(t) {
  return function() {
    return t;
  };
}
function ys(t, e, i, n, s, r) {
  for (var o = 0, a, h = e.length, l = r.length; o < l; ++o)
    (a = e[o]) ? (a.__data__ = r[o], n[o] = a) : i[o] = new ve(t, r[o]);
  for (; o < h; ++o)
    (a = e[o]) && (s[o] = a);
}
function vs(t, e, i, n, s, r, o) {
  var a, h, l = /* @__PURE__ */ new Map(), c = e.length, d = r.length, f = new Array(c), p;
  for (a = 0; a < c; ++a)
    (h = e[a]) && (f[a] = p = o.call(h, h.__data__, a, e) + "", l.has(p) ? s[a] = h : l.set(p, h));
  for (a = 0; a < d; ++a)
    p = o.call(t, r[a], a, r) + "", (h = l.get(p)) ? (n[a] = h, h.__data__ = r[a], l.delete(p)) : i[a] = new ve(t, r[a]);
  for (a = 0; a < c; ++a)
    (h = e[a]) && l.get(f[a]) === h && (s[a] = h);
}
function ws(t) {
  return t.__data__;
}
function xs(t, e) {
  if (!arguments.length) return Array.from(this, ws);
  var i = e ? vs : ys, n = this._parents, s = this._groups;
  typeof t != "function" && (t = ms(t));
  for (var r = s.length, o = new Array(r), a = new Array(r), h = new Array(r), l = 0; l < r; ++l) {
    var c = n[l], d = s[l], f = d.length, p = bs(t.call(c, c && c.__data__, l, n)), m = p.length, b = a[l] = new Array(m), E = o[l] = new Array(m), w = h[l] = new Array(f);
    i(c, d, b, E, w, p, e);
    for (var A = 0, H = 0, T, Y; A < m; ++A)
      if (T = b[A]) {
        for (A >= H && (H = A + 1); !(Y = E[H]) && ++H < m; ) ;
        T._next = Y || null;
      }
  }
  return o = new j(o, n), o._enter = a, o._exit = h, o;
}
function bs(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function $s() {
  return new j(this._exit || this._groups.map(ln), this._parents);
}
function _s(t, e, i) {
  var n = this.enter(), s = this, r = this.exit();
  return typeof t == "function" ? (n = t(n), n && (n = n.selection())) : n = n.append(t + ""), e != null && (s = e(s), s && (s = s.selection())), i == null ? r.remove() : i(r), n && s ? n.merge(s).order() : s;
}
function zs(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, n = e._groups, s = i.length, r = n.length, o = Math.min(s, r), a = new Array(s), h = 0; h < o; ++h)
    for (var l = i[h], c = n[h], d = l.length, f = a[h] = new Array(d), p, m = 0; m < d; ++m)
      (p = l[m] || c[m]) && (f[m] = p);
  for (; h < s; ++h)
    a[h] = i[h];
  return new j(a, this._parents);
}
function Ss() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var n = t[e], s = n.length - 1, r = n[s], o; --s >= 0; )
      (o = n[s]) && (r && o.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(o, r), r = o);
  return this;
}
function Es(t) {
  t || (t = ks);
  function e(d, f) {
    return d && f ? t(d.__data__, f.__data__) : !d - !f;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), r = 0; r < n; ++r) {
    for (var o = i[r], a = o.length, h = s[r] = new Array(a), l, c = 0; c < a; ++c)
      (l = o[c]) && (h[c] = l);
    h.sort(e);
  }
  return new j(s, this._parents).order();
}
function ks(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Cs() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ms() {
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
function Hs() {
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
function Ls(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ts(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ds(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Os(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function Is(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function Bs(t, e) {
  var i = Me(t);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((e == null ? i.local ? Ls : Ps : typeof e == "function" ? i.local ? Is : Os : i.local ? Ds : Ts)(i, e));
}
function cn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Us(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Xs(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function Ys(t, e, i) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.style.removeProperty(t) : this.style.setProperty(t, n, i);
  };
}
function Fs(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? Us : typeof e == "function" ? Ys : Xs)(t, e, i ?? "")) : Lt(this.node(), t);
}
function Lt(t, e) {
  return t.style.getPropertyValue(e) || cn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function qs(t) {
  return function() {
    delete this[t];
  };
}
function Zs(t, e) {
  return function() {
    this[t] = e;
  };
}
function Ws(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function Vs(t, e) {
  return arguments.length > 1 ? this.each((e == null ? qs : typeof e == "function" ? Ws : Zs)(t, e)) : this.node()[t];
}
function dn(t) {
  return t.trim().split(/^|\s+/);
}
function oi(t) {
  return t.classList || new un(t);
}
function un(t) {
  this._node = t, this._names = dn(t.getAttribute("class") || "");
}
un.prototype = {
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
function fn(t, e) {
  for (var i = oi(t), n = -1, s = e.length; ++n < s; ) i.add(e[n]);
}
function pn(t, e) {
  for (var i = oi(t), n = -1, s = e.length; ++n < s; ) i.remove(e[n]);
}
function Gs(t) {
  return function() {
    fn(this, t);
  };
}
function js(t) {
  return function() {
    pn(this, t);
  };
}
function Ks(t, e) {
  return function() {
    (e.apply(this, arguments) ? fn : pn)(this, t);
  };
}
function Qs(t, e) {
  var i = dn(t + "");
  if (arguments.length < 2) {
    for (var n = oi(this.node()), s = -1, r = i.length; ++s < r; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Ks : e ? Gs : js)(i, e));
}
function Js() {
  this.textContent = "";
}
function tr(t) {
  return function() {
    this.textContent = t;
  };
}
function er(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ir(t) {
  return arguments.length ? this.each(t == null ? Js : (typeof t == "function" ? er : tr)(t)) : this.node().textContent;
}
function nr() {
  this.innerHTML = "";
}
function sr(t) {
  return function() {
    this.innerHTML = t;
  };
}
function rr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function or(t) {
  return arguments.length ? this.each(t == null ? nr : (typeof t == "function" ? rr : sr)(t)) : this.node().innerHTML;
}
function ar() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function hr() {
  return this.each(ar);
}
function lr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function cr() {
  return this.each(lr);
}
function dr(t) {
  var e = typeof t == "function" ? t : rn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ur() {
  return null;
}
function fr(t, e) {
  var i = typeof t == "function" ? t : rn(t), n = e == null ? ur : typeof e == "function" ? e : ri(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function pr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function gr() {
  return this.each(pr);
}
function mr() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function yr() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function vr(t) {
  return this.select(t ? yr : mr);
}
function wr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function xr(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function br(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", n = e.indexOf(".");
    return n >= 0 && (i = e.slice(n + 1), e = e.slice(0, n)), { type: e, name: i };
  });
}
function $r(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, n = -1, s = e.length, r; i < s; ++i)
        r = e[i], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++n] = r;
      ++n ? e.length = n : delete this.__on;
    }
  };
}
function _r(t, e, i) {
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
function zr(t, e, i) {
  var n = br(t + ""), s, r = n.length, o;
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
  for (a = e ? _r : $r, s = 0; s < r; ++s) this.each(a(n[s], e, i));
  return this;
}
function gn(t, e, i) {
  var n = cn(t), s = n.CustomEvent;
  typeof s == "function" ? s = new s(e, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(e, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(e, !1, !1)), t.dispatchEvent(s);
}
function Sr(t, e) {
  return function() {
    return gn(this, t, e);
  };
}
function Er(t, e) {
  return function() {
    return gn(this, t, e.apply(this, arguments));
  };
}
function kr(t, e) {
  return this.each((typeof e == "function" ? Er : Sr)(t, e));
}
function* Cr() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var n = t[e], s = 0, r = n.length, o; s < r; ++s)
      (o = n[s]) && (yield o);
}
var mn = [null];
function j(t, e) {
  this._groups = t, this._parents = e;
}
function ee() {
  return new j([[document.documentElement]], mn);
}
function Mr() {
  return this;
}
j.prototype = ee.prototype = {
  constructor: j,
  select: es,
  selectAll: rs,
  selectChild: ls,
  selectChildren: fs,
  filter: ps,
  data: xs,
  enter: gs,
  exit: $s,
  join: _s,
  merge: zs,
  selection: Mr,
  order: Ss,
  sort: Es,
  call: Cs,
  nodes: Ms,
  node: As,
  size: Ns,
  empty: Hs,
  each: Rs,
  attr: Bs,
  style: Fs,
  property: Vs,
  classed: Qs,
  text: ir,
  html: or,
  raise: hr,
  lower: cr,
  append: dr,
  insert: fr,
  remove: gr,
  clone: vr,
  datum: wr,
  on: zr,
  dispatch: kr,
  [Symbol.iterator]: Cr
};
function wt(t) {
  return typeof t == "string" ? new j([[document.querySelector(t)]], [document.documentElement]) : new j([[t]], mn);
}
function Ar(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function vt(t, e) {
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
const Fe = { capture: !0, passive: !1 };
function qe(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Nr(t) {
  var e = t.document.documentElement, i = wt(t).on("dragstart.drag", qe, Fe);
  "onselectstart" in e ? i.on("selectstart.drag", qe, Fe) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Hr(t, e) {
  var i = t.document.documentElement, n = wt(t).on("dragstart.drag", null);
  e && (n.on("click.drag", qe, Fe), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function ai(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function yn(t, e) {
  var i = Object.create(t.prototype);
  for (var n in e) i[n] = e[n];
  return i;
}
function ie() {
}
var Vt = 0.7, we = 1 / Vt, Pt = "\\s*([+-]?\\d+)\\s*", Gt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ht = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Rr = /^#([0-9a-f]{3,8})$/, Pr = new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`), Lr = new RegExp(`^rgb\\(${ht},${ht},${ht}\\)$`), Tr = new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${Gt}\\)$`), Dr = new RegExp(`^rgba\\(${ht},${ht},${ht},${Gt}\\)$`), Or = new RegExp(`^hsl\\(${Gt},${ht},${ht}\\)$`), Ir = new RegExp(`^hsla\\(${Gt},${ht},${ht},${Gt}\\)$`), $i = {
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
ai(ie, St, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: _i,
  // Deprecated! Use color.formatHex.
  formatHex: _i,
  formatHex8: Br,
  formatHsl: Ur,
  formatRgb: zi,
  toString: zi
});
function _i() {
  return this.rgb().formatHex();
}
function Br() {
  return this.rgb().formatHex8();
}
function Ur() {
  return vn(this).formatHsl();
}
function zi() {
  return this.rgb().formatRgb();
}
function St(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = Rr.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? Si(e) : i === 3 ? new F(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? ae(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? ae(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Pr.exec(t)) ? new F(e[1], e[2], e[3], 1) : (e = Lr.exec(t)) ? new F(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Tr.exec(t)) ? ae(e[1], e[2], e[3], e[4]) : (e = Dr.exec(t)) ? ae(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Or.exec(t)) ? Ci(e[1], e[2] / 100, e[3] / 100, 1) : (e = Ir.exec(t)) ? Ci(e[1], e[2] / 100, e[3] / 100, e[4]) : $i.hasOwnProperty(t) ? Si($i[t]) : t === "transparent" ? new F(NaN, NaN, NaN, 0) : null;
}
function Si(t) {
  return new F(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ae(t, e, i, n) {
  return n <= 0 && (t = e = i = NaN), new F(t, e, i, n);
}
function Xr(t) {
  return t instanceof ie || (t = St(t)), t ? (t = t.rgb(), new F(t.r, t.g, t.b, t.opacity)) : new F();
}
function Ze(t, e, i, n) {
  return arguments.length === 1 ? Xr(t) : new F(t, e, i, n ?? 1);
}
function F(t, e, i, n) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +n;
}
ai(F, Ze, yn(ie, {
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
  hex: Ei,
  // Deprecated! Use color.formatHex.
  formatHex: Ei,
  formatHex8: Yr,
  formatRgb: ki,
  toString: ki
}));
function Ei() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}`;
}
function Yr() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}${$t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ki() {
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
function Ci(t, e, i, n) {
  return n <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new st(t, e, i, n);
}
function vn(t) {
  if (t instanceof st) return new st(t.h, t.s, t.l, t.opacity);
  if (t instanceof ie || (t = St(t)), !t) return new st();
  if (t instanceof st) return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, n = t.b / 255, s = Math.min(e, i, n), r = Math.max(e, i, n), o = NaN, a = r - s, h = (r + s) / 2;
  return a ? (e === r ? o = (i - n) / a + (i < n) * 6 : i === r ? o = (n - e) / a + 2 : o = (e - i) / a + 4, a /= h < 0.5 ? r + s : 2 - r - s, o *= 60) : a = h > 0 && h < 1 ? 0 : o, new st(o, a, h, t.opacity);
}
function Fr(t, e, i, n) {
  return arguments.length === 1 ? vn(t) : new st(t, e, i, n ?? 1);
}
function st(t, e, i, n) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +n;
}
ai(st, Fr, yn(ie, {
  brighter(t) {
    return t = t == null ? we : Math.pow(we, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Vt : Math.pow(Vt, t), new st(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * e, s = 2 * i - n;
    return new F(
      Te(t >= 240 ? t - 240 : t + 120, s, n),
      Te(t, s, n),
      Te(t < 120 ? t + 240 : t - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new st(Mi(this.h), he(this.s), he(this.l), xe(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = xe(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Mi(this.h)}, ${he(this.s) * 100}%, ${he(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Mi(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function he(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Te(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const hi = (t) => () => t;
function qr(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function Zr(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(n) {
    return Math.pow(t + n * e, i);
  };
}
function Wr(t) {
  return (t = +t) == 1 ? wn : function(e, i) {
    return i - e ? Zr(e, i, t) : hi(isNaN(e) ? i : e);
  };
}
function wn(t, e) {
  var i = e - t;
  return i ? qr(t, i) : hi(isNaN(t) ? e : t);
}
const be = (function t(e) {
  var i = Wr(e);
  function n(s, r) {
    var o = i((s = Ze(s)).r, (r = Ze(r)).r), a = i(s.g, r.g), h = i(s.b, r.b), l = wn(s.opacity, r.opacity);
    return function(c) {
      return s.r = o(c), s.g = a(c), s.b = h(c), s.opacity = l(c), s + "";
    };
  }
  return n.gamma = t, n;
})(1);
function Vr(t, e) {
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
function jr(t, e) {
  var i = e ? e.length : 0, n = t ? Math.min(i, t.length) : 0, s = new Array(n), r = new Array(i), o;
  for (o = 0; o < n; ++o) s[o] = qt(t[o], e[o]);
  for (; o < i; ++o) r[o] = e[o];
  return function(a) {
    for (o = 0; o < n; ++o) r[o] = s[o](a);
    return r;
  };
}
function Kr(t, e) {
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
function Qr(t, e) {
  var i = {}, n = {}, s;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (s in e)
    s in t ? i[s] = qt(t[s], e[s]) : n[s] = e[s];
  return function(r) {
    for (s in i) n[s] = i[s](r);
    return n;
  };
}
var We = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, De = new RegExp(We.source, "g");
function Jr(t) {
  return function() {
    return t;
  };
}
function to(t) {
  return function(e) {
    return t(e) + "";
  };
}
function xn(t, e) {
  var i = We.lastIndex = De.lastIndex = 0, n, s, r, o = -1, a = [], h = [];
  for (t = t + "", e = e + ""; (n = We.exec(t)) && (s = De.exec(e)); )
    (r = s.index) > i && (r = e.slice(i, r), a[o] ? a[o] += r : a[++o] = r), (n = n[0]) === (s = s[0]) ? a[o] ? a[o] += s : a[++o] = s : (a[++o] = null, h.push({ i: o, x: at(n, s) })), i = De.lastIndex;
  return i < e.length && (r = e.slice(i), a[o] ? a[o] += r : a[++o] = r), a.length < 2 ? h[0] ? to(h[0].x) : Jr(e) : (e = h.length, function(l) {
    for (var c = 0, d; c < e; ++c) a[(d = h[c]).i] = d.x(l);
    return a.join("");
  });
}
function qt(t, e) {
  var i = typeof e, n;
  return e == null || i === "boolean" ? hi(e) : (i === "number" ? at : i === "string" ? (n = St(e)) ? (e = n, be) : xn : e instanceof St ? be : e instanceof Date ? Kr : Gr(e) ? Vr : Array.isArray(e) ? jr : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Qr : at)(t, e);
}
var Ai = 180 / Math.PI, Ve = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function bn(t, e, i, n, s, r) {
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
function eo(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ve : bn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function io(t) {
  return t == null || (le || (le = document.createElementNS("http://www.w3.org/2000/svg", "g")), le.setAttribute("transform", t), !(t = le.transform.baseVal.consolidate())) ? Ve : (t = t.matrix, bn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function $n(t, e, i, n) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function r(l, c, d, f, p, m) {
    if (l !== d || c !== f) {
      var b = p.push("translate(", null, e, null, i);
      m.push({ i: b - 4, x: at(l, d) }, { i: b - 2, x: at(c, f) });
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
var no = $n(eo, "px, ", "px)", "deg)"), so = $n(io, ", ", ")", ")"), ro = 1e-12;
function Ni(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function oo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function ao(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const fe = (function t(e, i, n) {
  function s(r, o) {
    var a = r[0], h = r[1], l = r[2], c = o[0], d = o[1], f = o[2], p = c - a, m = d - h, b = p * p + m * m, E, w;
    if (b < ro)
      w = Math.log(f / l) / e, E = function(O) {
        return [
          a + O * p,
          h + O * m,
          l * Math.exp(e * O * w)
        ];
      };
    else {
      var A = Math.sqrt(b), H = (f * f - l * l + n * b) / (2 * l * i * A), T = (f * f - l * l - n * b) / (2 * f * i * A), Y = Math.log(Math.sqrt(H * H + 1) - H), P = Math.log(Math.sqrt(T * T + 1) - T);
      w = (P - Y) / e, E = function(O) {
        var tt = O * w, et = Ni(Y), yt = l / (i * A) * (et * ao(e * tt + Y) - oo(Y));
        return [
          a + yt * p,
          h + yt * m,
          l * et / Ni(e * tt + Y)
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
var Tt = 0, Yt = 0, Bt = 0, _n = 1e3, $e, Ft, _e = 0, Et = 0, Ae = 0, jt = typeof performance == "object" && performance.now ? performance : Date, zn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function li() {
  return Et || (zn(ho), Et = jt.now() + Ae);
}
function ho() {
  Et = 0;
}
function ze() {
  this._call = this._time = this._next = null;
}
ze.prototype = Sn.prototype = {
  constructor: ze,
  restart: function(t, e, i) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    i = (i == null ? li() : +i) + (e == null ? 0 : +e), !this._next && Ft !== this && (Ft ? Ft._next = this : $e = this, Ft = this), this._call = t, this._time = i, Ge();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ge());
  }
};
function Sn(t, e, i) {
  var n = new ze();
  return n.restart(t, e, i), n;
}
function lo() {
  li(), ++Tt;
  for (var t = $e, e; t; )
    (e = Et - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Tt;
}
function Hi() {
  Et = (_e = jt.now()) + Ae, Tt = Yt = 0;
  try {
    lo();
  } finally {
    Tt = 0, uo(), Et = 0;
  }
}
function co() {
  var t = jt.now(), e = t - _e;
  e > _n && (Ae -= e, _e = t);
}
function uo() {
  for (var t, e = $e, i, n = 1 / 0; e; )
    e._call ? (n > e._time && (n = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : $e = i);
  Ft = t, Ge(n);
}
function Ge(t) {
  if (!Tt) {
    Yt && (Yt = clearTimeout(Yt));
    var e = t - Et;
    e > 24 ? (t < 1 / 0 && (Yt = setTimeout(Hi, t - jt.now() - Ae)), Bt && (Bt = clearInterval(Bt))) : (Bt || (_e = jt.now(), Bt = setInterval(co, _n)), Tt = 1, zn(Hi));
  }
}
function Ri(t, e, i) {
  var n = new ze();
  return e = e == null ? 0 : +e, n.restart((s) => {
    n.stop(), t(s + e);
  }, e, i), n;
}
var fo = si("start", "end", "cancel", "interrupt"), po = [], En = 0, Pi = 1, je = 2, pe = 3, Li = 4, Ke = 5, ge = 6;
function Ne(t, e, i, n, s, r) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (i in o) return;
  go(t, i, {
    name: e,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: fo,
    tween: po,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: En
  });
}
function ci(t, e) {
  var i = rt(t, e);
  if (i.state > En) throw new Error("too late; already scheduled");
  return i;
}
function lt(t, e) {
  var i = rt(t, e);
  if (i.state > pe) throw new Error("too late; already running");
  return i;
}
function rt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e])) throw new Error("transition not found");
  return i;
}
function go(t, e, i) {
  var n = t.__transition, s;
  n[e] = i, i.timer = Sn(r, 0, i.time);
  function r(l) {
    i.state = Pi, i.timer.restart(o, i.delay, i.time), i.delay <= l && o(l - i.delay);
  }
  function o(l) {
    var c, d, f, p;
    if (i.state !== Pi) return h();
    for (c in n)
      if (p = n[c], p.name === i.name) {
        if (p.state === pe) return Ri(o);
        p.state === Li ? (p.state = ge, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete n[c]) : +c < e && (p.state = ge, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete n[c]);
      }
    if (Ri(function() {
      i.state === pe && (i.state = Li, i.timer.restart(a, i.delay, i.time), a(l));
    }), i.state = je, i.on.call("start", t, t.__data__, i.index, i.group), i.state === je) {
      for (i.state = pe, s = new Array(f = i.tween.length), c = 0, d = -1; c < f; ++c)
        (p = i.tween[c].value.call(t, t.__data__, i.index, i.group)) && (s[++d] = p);
      s.length = d + 1;
    }
  }
  function a(l) {
    for (var c = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(h), i.state = Ke, 1), d = -1, f = s.length; ++d < f; )
      s[d].call(t, c);
    i.state === Ke && (i.on.call("end", t, t.__data__, i.index, i.group), h());
  }
  function h() {
    i.state = ge, i.timer.stop(), delete n[e];
    for (var l in n) return;
    delete t.__transition;
  }
}
function me(t, e) {
  var i = t.__transition, n, s, r = !0, o;
  if (i) {
    e = e == null ? null : e + "";
    for (o in i) {
      if ((n = i[o]).name !== e) {
        r = !1;
        continue;
      }
      s = n.state > je && n.state < Ke, n.state = ge, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", t, t.__data__, n.index, n.group), delete i[o];
    }
    r && delete t.__transition;
  }
}
function mo(t) {
  return this.each(function() {
    me(this, t);
  });
}
function yo(t, e) {
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
function vo(t, e, i) {
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
function wo(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var n = rt(this.node(), i).tween, s = 0, r = n.length, o; s < r; ++s)
      if ((o = n[s]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? yo : vo)(i, t, e));
}
function di(t, e, i) {
  var n = t._id;
  return t.each(function() {
    var s = lt(this, n);
    (s.value || (s.value = {}))[e] = i.apply(this, arguments);
  }), function(s) {
    return rt(s, n).value[e];
  };
}
function kn(t, e) {
  var i;
  return (typeof e == "number" ? at : e instanceof St ? be : (i = St(e)) ? (e = i, be) : xn)(t, e);
}
function xo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function bo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function $o(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = this.getAttribute(t);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function _o(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function zo(t, e, i) {
  var n, s, r;
  return function() {
    var o, a = i(this), h;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), h = a + "", o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a)));
  };
}
function So(t, e, i) {
  var n, s, r;
  return function() {
    var o, a = i(this), h;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), h = a + "", o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a)));
  };
}
function Eo(t, e) {
  var i = Me(t), n = i === "transform" ? so : kn;
  return this.attrTween(t, typeof e == "function" ? (i.local ? So : zo)(i, n, di(this, "attr." + t, e)) : e == null ? (i.local ? bo : xo)(i) : (i.local ? _o : $o)(i, n, e));
}
function ko(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function Co(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function Mo(t, e) {
  var i, n;
  function s() {
    var r = e.apply(this, arguments);
    return r !== n && (i = (n = r) && Co(t, r)), i;
  }
  return s._value = e, s;
}
function Ao(t, e) {
  var i, n;
  function s() {
    var r = e.apply(this, arguments);
    return r !== n && (i = (n = r) && ko(t, r)), i;
  }
  return s._value = e, s;
}
function No(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  var n = Me(t);
  return this.tween(i, (n.local ? Mo : Ao)(n, e));
}
function Ho(t, e) {
  return function() {
    ci(this, t).delay = +e.apply(this, arguments);
  };
}
function Ro(t, e) {
  return e = +e, function() {
    ci(this, t).delay = e;
  };
}
function Po(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ho : Ro)(e, t)) : rt(this.node(), e).delay;
}
function Lo(t, e) {
  return function() {
    lt(this, t).duration = +e.apply(this, arguments);
  };
}
function To(t, e) {
  return e = +e, function() {
    lt(this, t).duration = e;
  };
}
function Do(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Lo : To)(e, t)) : rt(this.node(), e).duration;
}
function Oo(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    lt(this, t).ease = e;
  };
}
function Io(t) {
  var e = this._id;
  return arguments.length ? this.each(Oo(e, t)) : rt(this.node(), e).ease;
}
function Bo(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    lt(this, t).ease = i;
  };
}
function Uo(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Bo(this._id, t));
}
function Xo(t) {
  typeof t != "function" && (t = an(t));
  for (var e = this._groups, i = e.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = e[s], o = r.length, a = n[s] = [], h, l = 0; l < o; ++l)
      (h = r[l]) && t.call(h, h.__data__, l, r) && a.push(h);
  return new pt(n, this._parents, this._name, this._id);
}
function Yo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, i = t._groups, n = e.length, s = i.length, r = Math.min(n, s), o = new Array(n), a = 0; a < r; ++a)
    for (var h = e[a], l = i[a], c = h.length, d = o[a] = new Array(c), f, p = 0; p < c; ++p)
      (f = h[p] || l[p]) && (d[p] = f);
  for (; a < n; ++a)
    o[a] = e[a];
  return new pt(o, this._parents, this._name, this._id);
}
function Fo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function qo(t, e, i) {
  var n, s, r = Fo(e) ? ci : lt;
  return function() {
    var o = r(this, t), a = o.on;
    a !== n && (s = (n = a).copy()).on(e, i), o.on = s;
  };
}
function Zo(t, e) {
  var i = this._id;
  return arguments.length < 2 ? rt(this.node(), i).on.on(t) : this.each(qo(i, t, e));
}
function Wo(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition) if (+i !== t) return;
    e && e.removeChild(this);
  };
}
function Vo() {
  return this.on("end.remove", Wo(this._id));
}
function Go(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = ri(t));
  for (var n = this._groups, s = n.length, r = new Array(s), o = 0; o < s; ++o)
    for (var a = n[o], h = a.length, l = r[o] = new Array(h), c, d, f = 0; f < h; ++f)
      (c = a[f]) && (d = t.call(c, c.__data__, f, a)) && ("__data__" in c && (d.__data__ = c.__data__), l[f] = d, Ne(l[f], e, i, f, l, rt(c, i)));
  return new pt(r, this._parents, e, i);
}
function jo(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = on(t));
  for (var n = this._groups, s = n.length, r = [], o = [], a = 0; a < s; ++a)
    for (var h = n[a], l = h.length, c, d = 0; d < l; ++d)
      if (c = h[d]) {
        for (var f = t.call(c, c.__data__, d, h), p, m = rt(c, i), b = 0, E = f.length; b < E; ++b)
          (p = f[b]) && Ne(p, e, i, b, f, m);
        r.push(f), o.push(c);
      }
  return new pt(r, o, e, i);
}
var Ko = ee.prototype.constructor;
function Qo() {
  return new Ko(this._groups, this._parents);
}
function Jo(t, e) {
  var i, n, s;
  return function() {
    var r = Lt(this, t), o = (this.style.removeProperty(t), Lt(this, t));
    return r === o ? null : r === i && o === n ? s : s = e(i = r, n = o);
  };
}
function Cn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ta(t, e, i) {
  var n, s = i + "", r;
  return function() {
    var o = Lt(this, t);
    return o === s ? null : o === n ? r : r = e(n = o, i);
  };
}
function ea(t, e, i) {
  var n, s, r;
  return function() {
    var o = Lt(this, t), a = i(this), h = a + "";
    return a == null && (h = a = (this.style.removeProperty(t), Lt(this, t))), o === h ? null : o === n && h === s ? r : (s = h, r = e(n = o, a));
  };
}
function ia(t, e) {
  var i, n, s, r = "style." + e, o = "end." + r, a;
  return function() {
    var h = lt(this, t), l = h.on, c = h.value[r] == null ? a || (a = Cn(e)) : void 0;
    (l !== i || s !== c) && (n = (i = l).copy()).on(o, s = c), h.on = n;
  };
}
function na(t, e, i) {
  var n = (t += "") == "transform" ? no : kn;
  return e == null ? this.styleTween(t, Jo(t, n)).on("end.style." + t, Cn(t)) : typeof e == "function" ? this.styleTween(t, ea(t, n, di(this, "style." + t, e))).each(ia(this._id, t)) : this.styleTween(t, ta(t, n, e), i).on("end.style." + t, null);
}
function sa(t, e, i) {
  return function(n) {
    this.style.setProperty(t, e.call(this, n), i);
  };
}
function ra(t, e, i) {
  var n, s;
  function r() {
    var o = e.apply(this, arguments);
    return o !== s && (n = (s = o) && sa(t, o, i)), n;
  }
  return r._value = e, r;
}
function oa(t, e, i) {
  var n = "style." + (t += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  return this.tween(n, ra(t, e, i ?? ""));
}
function aa(t) {
  return function() {
    this.textContent = t;
  };
}
function ha(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function la(t) {
  return this.tween("text", typeof t == "function" ? ha(di(this, "text", t)) : aa(t == null ? "" : t + ""));
}
function ca(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function da(t) {
  var e, i;
  function n() {
    var s = t.apply(this, arguments);
    return s !== i && (e = (i = s) && ca(s)), e;
  }
  return n._value = t, n;
}
function ua(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, da(t));
}
function fa() {
  for (var t = this._name, e = this._id, i = Mn(), n = this._groups, s = n.length, r = 0; r < s; ++r)
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
function pa() {
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
var ga = 0;
function pt(t, e, i, n) {
  this._groups = t, this._parents = e, this._name = i, this._id = n;
}
function Mn() {
  return ++ga;
}
var dt = ee.prototype;
pt.prototype = {
  constructor: pt,
  select: Go,
  selectAll: jo,
  selectChild: dt.selectChild,
  selectChildren: dt.selectChildren,
  filter: Xo,
  merge: Yo,
  selection: Qo,
  transition: fa,
  call: dt.call,
  nodes: dt.nodes,
  node: dt.node,
  size: dt.size,
  empty: dt.empty,
  each: dt.each,
  on: Zo,
  attr: Eo,
  attrTween: No,
  style: na,
  styleTween: oa,
  text: la,
  textTween: ua,
  remove: Vo,
  tween: wo,
  delay: Po,
  duration: Do,
  ease: Io,
  easeVarying: Uo,
  end: pa,
  [Symbol.iterator]: dt[Symbol.iterator]
};
function ma(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ya = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ma
};
function va(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function wa(t) {
  var e, i;
  t instanceof pt ? (e = t._id, t = t._name) : (e = Mn(), (i = ya).time = li(), t = t == null ? null : t + "");
  for (var n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var o = n[r], a = o.length, h, l = 0; l < a; ++l)
      (h = o[l]) && Ne(h, t, e, l, o, i || va(h, e));
  return new pt(n, this._parents, t, e);
}
ee.prototype.interrupt = mo;
ee.prototype.transition = wa;
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
var He = new ft(1, 0, 0);
An.prototype = ft.prototype;
function An(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return He;
  return t.__zoom;
}
function Oe(t) {
  t.stopImmediatePropagation();
}
function Ut(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function ba(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function $a() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ti() {
  return this.__zoom || He;
}
function _a(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function za() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Sa(t, e, i) {
  var n = t.invertX(e[0][0]) - i[0][0], s = t.invertX(e[1][0]) - i[1][0], r = t.invertY(e[0][1]) - i[0][1], o = t.invertY(e[1][1]) - i[1][1];
  return t.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o)
  );
}
function Ea() {
  var t = ba, e = $a, i = Sa, n = _a, s = za, r = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, h = fe, l = si("start", "zoom", "end"), c, d, f, p = 500, m = 150, b = 0, E = 10;
  function w(u) {
    u.property("__zoom", Ti).on("wheel.zoom", tt, { passive: !1 }).on("mousedown.zoom", et).on("dblclick.zoom", yt).filter(s).on("touchstart.zoom", Ot).on("touchmove.zoom", _).on("touchend.zoom touchcancel.zoom", C).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(u, y, g, x) {
    var $ = u.selection ? u.selection() : u;
    $.property("__zoom", Ti), u !== $ ? Y(u, y, g, x) : $.interrupt().each(function() {
      P(this, arguments).event(x).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, w.scaleBy = function(u, y, g, x) {
    w.scaleTo(u, function() {
      var $ = this.__zoom.k, z = typeof y == "function" ? y.apply(this, arguments) : y;
      return $ * z;
    }, g, x);
  }, w.scaleTo = function(u, y, g, x) {
    w.transform(u, function() {
      var $ = e.apply(this, arguments), z = this.__zoom, S = g == null ? T($) : typeof g == "function" ? g.apply(this, arguments) : g, N = z.invert(S), R = typeof y == "function" ? y.apply(this, arguments) : y;
      return i(H(A(z, R), S, N), $, o);
    }, g, x);
  }, w.translateBy = function(u, y, g, x) {
    w.transform(u, function() {
      return i(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), o);
    }, null, x);
  }, w.translateTo = function(u, y, g, x, $) {
    w.transform(u, function() {
      var z = e.apply(this, arguments), S = this.__zoom, N = x == null ? T(z) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(He.translate(N[0], N[1]).scale(S.k).translate(
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
  function Y(u, y, g, x) {
    u.on("start.zoom", function() {
      P(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      P(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var $ = this, z = arguments, S = P($, z).event(x), N = e.apply($, z), R = g == null ? T(N) : typeof g == "function" ? g.apply($, z) : g, W = Math.max(N[1][0] - N[0][0], N[1][1] - N[0][1]), L = $.__zoom, V = typeof y == "function" ? y.apply($, z) : y, it = h(L.invert(R).concat(W / L.k), V.invert(R).concat(W / V.k));
      return function(G) {
        if (G === 1) G = V;
        else {
          var ot = it(G), It = W / ot[2];
          G = new ft(It, R[0] - ot[0] * It, R[1] - ot[1] * It);
        }
        S.zoom(null, G);
      };
    });
  }
  function P(u, y, g) {
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
        new xa(u, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: l
        }),
        y
      );
    }
  };
  function tt(u, ...y) {
    if (!t.apply(this, arguments)) return;
    var g = P(this, y).event(u), x = this.__zoom, $ = Math.max(r[0], Math.min(r[1], x.k * Math.pow(2, n.apply(this, arguments)))), z = vt(u);
    if (g.wheel)
      (g.mouse[0][0] !== z[0] || g.mouse[0][1] !== z[1]) && (g.mouse[1] = x.invert(g.mouse[0] = z)), clearTimeout(g.wheel);
    else {
      if (x.k === $) return;
      g.mouse = [z, x.invert(z)], me(this), g.start();
    }
    Ut(u), g.wheel = setTimeout(S, m), g.zoom("mouse", i(H(A(x, $), g.mouse[0], g.mouse[1]), g.extent, o));
    function S() {
      g.wheel = null, g.end();
    }
  }
  function et(u, ...y) {
    if (f || !t.apply(this, arguments)) return;
    var g = u.currentTarget, x = P(this, y, !0).event(u), $ = wt(u.view).on("mousemove.zoom", R, !0).on("mouseup.zoom", W, !0), z = vt(u, g), S = u.clientX, N = u.clientY;
    Nr(u.view), Oe(u), x.mouse = [z, this.__zoom.invert(z)], me(this), x.start();
    function R(L) {
      if (Ut(L), !x.moved) {
        var V = L.clientX - S, it = L.clientY - N;
        x.moved = V * V + it * it > b;
      }
      x.event(L).zoom("mouse", i(H(x.that.__zoom, x.mouse[0] = vt(L, g), x.mouse[1]), x.extent, o));
    }
    function W(L) {
      $.on("mousemove.zoom mouseup.zoom", null), Hr(L.view, x.moved), Ut(L), x.event(L).end();
    }
  }
  function yt(u, ...y) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, x = vt(u.changedTouches ? u.changedTouches[0] : u, this), $ = g.invert(x), z = g.k * (u.shiftKey ? 0.5 : 2), S = i(H(A(g, z), x, $), e.apply(this, y), o);
      Ut(u), a > 0 ? wt(this).transition().duration(a).call(Y, S, x, u) : wt(this).call(w.transform, S, x, u);
    }
  }
  function Ot(u, ...y) {
    if (t.apply(this, arguments)) {
      var g = u.touches, x = g.length, $ = P(this, y, u.changedTouches.length === x).event(u), z, S, N, R;
      for (Oe(u), S = 0; S < x; ++S)
        N = g[S], R = vt(N, this), R = [R, this.__zoom.invert(R), N.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== R[2] && ($.touch1 = R, $.taps = 0) : ($.touch0 = R, z = !0, $.taps = 1 + !!c);
      c && (c = clearTimeout(c)), z && ($.taps < 2 && (d = R[0], c = setTimeout(function() {
        c = null;
      }, p)), me(this), $.start());
    }
  }
  function _(u, ...y) {
    if (this.__zooming) {
      var g = P(this, y).event(u), x = u.changedTouches, $ = x.length, z, S, N, R;
      for (Ut(u), z = 0; z < $; ++z)
        S = x[z], N = vt(S, this), g.touch0 && g.touch0[2] === S.identifier ? g.touch0[0] = N : g.touch1 && g.touch1[2] === S.identifier && (g.touch1[0] = N);
      if (S = g.that.__zoom, g.touch1) {
        var W = g.touch0[0], L = g.touch0[1], V = g.touch1[0], it = g.touch1[1], G = (G = V[0] - W[0]) * G + (G = V[1] - W[1]) * G, ot = (ot = it[0] - L[0]) * ot + (ot = it[1] - L[1]) * ot;
        S = A(S, Math.sqrt(G / ot)), N = [(W[0] + V[0]) / 2, (W[1] + V[1]) / 2], R = [(L[0] + it[0]) / 2, (L[1] + it[1]) / 2];
      } else if (g.touch0) N = g.touch0[0], R = g.touch0[1];
      else return;
      g.zoom("touch", i(H(S, N, R), g.extent, o));
    }
  }
  function C(u, ...y) {
    if (this.__zooming) {
      var g = P(this, y).event(u), x = u.changedTouches, $ = x.length, z, S;
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
    return arguments.length ? (b = (u = +u) * u, w) : Math.sqrt(b);
  }, w.tapDistance = function(u) {
    return arguments.length ? (E = +u, w) : E;
  }, w;
}
var Di;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(Di || (Di = {}));
var Zt;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(Zt || (Zt = {}));
var Oi;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Oi || (Oi = {}));
var Ii;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Ii || (Ii = {}));
var Bi;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Bi || (Bi = {}));
var k;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(k || (k = {}));
k.Left + "", k.Right, k.Right + "", k.Left, k.Top + "", k.Bottom, k.Bottom + "", k.Top;
const ka = (t, e = 0, i = 1) => Math.min(Math.max(t, e), i), Ui = (t) => !isNaN(t) && isFinite(t), Nn = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Ca({ sourceX: t, sourceY: e, targetX: i, targetY: n, sourceControlX: s, sourceControlY: r, targetControlX: o, targetControlY: a }) {
  const h = t * 0.125 + s * 0.375 + o * 0.375 + i * 0.125, l = e * 0.125 + r * 0.375 + a * 0.375 + n * 0.125, c = Math.abs(h - t), d = Math.abs(l - e);
  return [h, l, c, d];
}
function de(t, e) {
  return t >= 0 ? 0.5 * t : e * 25 * Math.sqrt(-t);
}
function Xi({ pos: t, x1: e, y1: i, x2: n, y2: s, c: r }) {
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
function Ma({ sourceX: t, sourceY: e, sourcePosition: i = k.Bottom, targetX: n, targetY: s, targetPosition: r = k.Top, curvature: o = 0.25 }) {
  const [a, h] = Xi({
    pos: i,
    x1: t,
    y1: e,
    x2: n,
    y2: s,
    c: o
  }), [l, c] = Xi({
    pos: r,
    x1: n,
    y1: s,
    x2: t,
    y2: e,
    c: o
  }), [d, f, p, m] = Ca({
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
function Hn({ sourceX: t, sourceY: e, targetX: i, targetY: n }) {
  const s = Math.abs(i - t) / 2, r = i < t ? i + s : i - s, o = Math.abs(n - e) / 2, a = n < e ? n + o : n - o;
  return [r, a, s, o];
}
function Aa({ sourceX: t, sourceY: e, targetX: i, targetY: n }) {
  const [s, r, o, a] = Hn({
    sourceX: t,
    sourceY: e,
    targetX: i,
    targetY: n
  });
  return [`M ${t},${e}L ${i},${n}`, s, r, o, a];
}
const Yi = {
  [k.Left]: { x: -1, y: 0 },
  [k.Right]: { x: 1, y: 0 },
  [k.Top]: { x: 0, y: -1 },
  [k.Bottom]: { x: 0, y: 1 }
}, Na = ({ source: t, sourcePosition: e = k.Bottom, target: i }) => e === k.Left || e === k.Right ? t.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Fi = (t, e) => Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
function Ha({ source: t, sourcePosition: e = k.Bottom, target: i, targetPosition: n = k.Top, center: s, offset: r, stepPosition: o }) {
  const a = Yi[e], h = Yi[n], l = { x: t.x + a.x * r, y: t.y + a.y * r }, c = { x: i.x + h.x * r, y: i.y + h.y * r }, d = Na({
    source: l,
    sourcePosition: e,
    target: c
  }), f = d.x !== 0 ? "x" : "y", p = d[f];
  let m = [], b, E;
  const w = { x: 0, y: 0 }, A = { x: 0, y: 0 }, [, , H, T] = Hn({
    sourceX: t.x,
    sourceY: t.y,
    targetX: i.x,
    targetY: i.y
  });
  if (a[f] * h[f] === -1) {
    f === "x" ? (b = s.x ?? l.x + (c.x - l.x) * o, E = s.y ?? (l.y + c.y) / 2) : (b = s.x ?? (l.x + c.x) / 2, E = s.y ?? l.y + (c.y - l.y) * o);
    const P = [
      { x: b, y: l.y },
      { x: b, y: c.y }
    ], O = [
      { x: l.x, y: E },
      { x: c.x, y: E }
    ];
    a[f] === p ? m = f === "x" ? P : O : m = f === "x" ? O : P;
  } else {
    const P = [{ x: l.x, y: c.y }], O = [{ x: c.x, y: l.y }];
    if (f === "x" ? m = a.x === p ? O : P : m = a.y === p ? P : O, e === n) {
      const _ = Math.abs(t[f] - i[f]);
      if (_ <= r) {
        const C = Math.min(r - 1, r - _);
        a[f] === p ? w[f] = (l[f] > t[f] ? -1 : 1) * C : A[f] = (c[f] > i[f] ? -1 : 1) * C;
      }
    }
    if (e !== n) {
      const _ = f === "x" ? "y" : "x", C = a[f] === h[_], u = l[_] > c[_], y = l[_] < c[_];
      (a[f] === 1 && (!C && u || C && y) || a[f] !== 1 && (!C && y || C && u)) && (m = f === "x" ? P : O);
    }
    const tt = { x: l.x + w.x, y: l.y + w.y }, et = { x: c.x + A.x, y: c.y + A.y }, yt = Math.max(Math.abs(tt.x - m[0].x), Math.abs(et.x - m[0].x)), Ot = Math.max(Math.abs(tt.y - m[0].y), Math.abs(et.y - m[0].y));
    yt >= Ot ? (b = (tt.x + et.x) / 2, E = m[0].y) : (b = m[0].x, E = (tt.y + et.y) / 2);
  }
  return [[
    t,
    { x: l.x + w.x, y: l.y + w.y },
    ...m,
    { x: c.x + A.x, y: c.y + A.y },
    i
  ], b, E, H, T];
}
function Ra(t, e, i, n) {
  const s = Math.min(Fi(t, e) / 2, Fi(e, i) / 2, n), { x: r, y: o } = e;
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
  const [d, f, p, m, b] = Ha({
    source: { x: t, y: e },
    sourcePosition: i,
    target: { x: n, y: s },
    targetPosition: r,
    center: { x: a, y: h },
    offset: l,
    stepPosition: c
  });
  return [d.reduce((w, A, H) => {
    let T = "";
    return H > 0 && H < d.length - 1 ? T = Ra(d[H - 1], A, d[H + 1], o) : T = `${H === 0 ? "M" : "L"}${A.x} ${A.y}`, w += T, w;
  }, ""), f, p, m, b];
}
const La = (t, e) => t.x !== e.x || t.y !== e.y || t.zoom !== e.k, Re = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Ie = ({ x: t, y: e, zoom: i }) => He.translate(t, e).scale(i), Rt = (t, e) => t.target.closest(`.${e}`), Rn = (t, e) => e === 2 && Array.isArray(t) && t.includes(2), Ta = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Be = (t, e = 0, i = Ta, n = () => {
}) => {
  const s = typeof e == "number" && e > 0;
  return s || n(), s ? t.transition().duration(e).ease(i).on("end", n) : t;
}, Pn = (t) => {
  const e = t.ctrlKey && Nn() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * e;
};
function Da({ zoomPanValues: t, noWheelClassName: e, d3Selection: i, d3Zoom: n, panOnScrollMode: s, panOnScrollSpeed: r, zoomOnPinch: o, onPanZoomStart: a, onPanZoom: h, onPanZoomEnd: l }) {
  return (c) => {
    if (Rt(c, e))
      return c.ctrlKey && c.preventDefault(), !1;
    c.preventDefault(), c.stopImmediatePropagation();
    const d = i.property("__zoom").k || 1;
    if (c.ctrlKey && o) {
      const E = vt(c), w = Pn(c), A = d * Math.pow(2, w);
      n.scaleTo(i, A, E, c);
      return;
    }
    const f = c.deltaMode === 1 ? 20 : 1;
    let p = s === Zt.Vertical ? 0 : c.deltaX * f, m = s === Zt.Horizontal ? 0 : c.deltaY * f;
    !Nn() && c.shiftKey && s !== Zt.Vertical && (p = c.deltaY * f, m = 0), n.translateBy(
      i,
      -(p / d) * r,
      -(m / d) * r,
      // @ts-ignore
      { internal: !0 }
    );
    const b = Re(i.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling || (t.isPanScrolling = !0), t.isPanScrolling && (h?.(c, b), t.panScrollTimeout = setTimeout(() => {
      t.isPanScrolling = !1;
    }, 150));
  };
}
function Oa({ noWheelClassName: t, preventScrolling: e, d3ZoomHandler: i }) {
  return function(n, s) {
    const r = n.type === "wheel", o = !e && r && !n.ctrlKey, a = Rt(n, t);
    if (n.ctrlKey && r && a && n.preventDefault(), o || a)
      return null;
    n.preventDefault(), i.call(this, n, s);
  };
}
function Ia({ zoomPanValues: t, onDraggingChange: e, onPanZoomStart: i }) {
  return (n) => {
    if (n.sourceEvent?.internal)
      return;
    const s = Re(n.transform);
    t.mouseButton = n.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, n.sourceEvent?.type === "mousedown" && e(!0), i && i?.(n.sourceEvent, s);
  };
}
function Ba({ zoomPanValues: t, panOnDrag: e, onPaneContextMenu: i, onTransformChange: n, onPanZoom: s }) {
  return (r) => {
    t.usedRightMouseButton = !!(i && Rn(e, t.mouseButton ?? 0)), r.sourceEvent?.sync || n([r.transform.x, r.transform.y, r.transform.k]), s && !r.sourceEvent?.internal && s?.(r.sourceEvent, Re(r.transform));
  };
}
function Ua({ zoomPanValues: t, panOnDrag: e, panOnScroll: i, onDraggingChange: n, onPanZoomEnd: s, onPaneContextMenu: r }) {
  return (o) => {
    if (!o.sourceEvent?.internal && (t.isZoomingOrPanning = !1, r && Rn(e, t.mouseButton ?? 0) && !t.usedRightMouseButton && o.sourceEvent && r(o.sourceEvent), t.usedRightMouseButton = !1, n(!1), s && La(t.prevViewport, o.transform))) {
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
function Xa({ zoomActivationKeyPressed: t, zoomOnScroll: e, zoomOnPinch: i, panOnDrag: n, panOnScroll: s, zoomOnDoubleClick: r, userSelectionActive: o, noWheelClassName: a, noPanClassName: h, lib: l, connectionInProgress: c }) {
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
    const b = Array.isArray(n) && n.includes(d.button) || !d.button || d.button <= 1;
    return (!d.ctrlKey || m) && b;
  };
}
function Ya({ domNode: t, minZoom: e, maxZoom: i, paneClickDistance: n, translateExtent: s, viewport: r, onPanZoom: o, onPanZoomStart: a, onPanZoomEnd: h, onDraggingChange: l }) {
  const c = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: { x: 0, y: 0, zoom: 0 },
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, d = t.getBoundingClientRect(), f = Ea().clickDistance(!Ui(n) || n < 0 ? 0 : n).scaleExtent([e, i]).translateExtent(s), p = wt(t).call(f);
  H({
    x: r.x,
    y: r.y,
    zoom: ka(r.zoom, e, i)
  }, [
    [0, 0],
    [d.width, d.height]
  ], s);
  const m = p.on("wheel.zoom"), b = p.on("dblclick.zoom");
  f.wheelDelta(Pn);
  function E(_, C) {
    return p ? new Promise((u) => {
      f?.interpolate(C?.interpolate === "linear" ? qt : fe).transform(Be(p, C?.duration, C?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function w({ noWheelClassName: _, noPanClassName: C, onPaneContextMenu: u, userSelectionActive: y, panOnScroll: g, panOnDrag: x, panOnScrollMode: $, panOnScrollSpeed: z, preventScrolling: S, zoomOnPinch: N, zoomOnScroll: R, zoomOnDoubleClick: W, zoomActivationKeyPressed: L, lib: V, onTransformChange: it, connectionInProgress: G }) {
    y && !c.isZoomingOrPanning && A();
    const It = g && !L && !y ? Da({
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
    }) : Oa({
      noWheelClassName: _,
      preventScrolling: S,
      d3ZoomHandler: m
    });
    if (p.on("wheel.zoom", It, { passive: !1 }), !y) {
      const Zn = Ia({
        zoomPanValues: c,
        onDraggingChange: l,
        onPanZoomStart: a
      });
      f.on("start", Zn);
      const Wn = Ba({
        zoomPanValues: c,
        panOnDrag: x,
        onPaneContextMenu: !!u,
        onPanZoom: o,
        onTransformChange: it
      });
      f.on("zoom", Wn);
      const Vn = Ua({
        zoomPanValues: c,
        panOnDrag: x,
        panOnScroll: g,
        onPaneContextMenu: u,
        onPanZoomEnd: h,
        onDraggingChange: l
      });
      f.on("end", Vn);
    }
    const qn = Xa({
      zoomActivationKeyPressed: L,
      panOnDrag: x,
      zoomOnScroll: R,
      panOnScroll: g,
      zoomOnDoubleClick: W,
      zoomOnPinch: N,
      userSelectionActive: y,
      noPanClassName: C,
      noWheelClassName: _,
      lib: V,
      connectionInProgress: G
    });
    f.filter(qn), W ? p.on("dblclick.zoom", b) : p.on("dblclick.zoom", null);
  }
  function A() {
    f.on("zoom", null);
  }
  async function H(_, C, u) {
    const y = Ie(_), g = f?.constrain()(y, C, u);
    return g && await E(g), new Promise((x) => x(g));
  }
  async function T(_, C) {
    const u = Ie(_);
    return await E(u, C), new Promise((y) => y(u));
  }
  function Y(_) {
    if (p) {
      const C = Ie(_), u = p.property("__zoom");
      (u.k !== _.zoom || u.x !== _.x || u.y !== _.y) && f?.transform(p, C, null, { sync: !0 });
    }
  }
  function P() {
    const _ = p ? An(p.node()) : { x: 0, y: 0, k: 1 };
    return { x: _.x, y: _.y, zoom: _.k };
  }
  function O(_, C) {
    return p ? new Promise((u) => {
      f?.interpolate(C?.interpolate === "linear" ? qt : fe).scaleTo(Be(p, C?.duration, C?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function tt(_, C) {
    return p ? new Promise((u) => {
      f?.interpolate(C?.interpolate === "linear" ? qt : fe).scaleBy(Be(p, C?.duration, C?.ease, () => u(!0)), _);
    }) : Promise.resolve(!1);
  }
  function et(_) {
    f?.scaleExtent(_);
  }
  function yt(_) {
    f?.translateExtent(_);
  }
  function Ot(_) {
    const C = !Ui(_) || _ < 0 ? 0 : _;
    f?.clickDistance(C);
  }
  return {
    update: w,
    destroy: A,
    setViewport: T,
    setViewportConstrained: H,
    getViewport: P,
    scaleTo: O,
    scaleBy: tt,
    setScaleExtent: et,
    setTranslateExtent: yt,
    syncViewport: Y,
    setClickDistance: Ot
  };
}
var qi;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(qi || (qi = {}));
class Fa {
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
    this.container = e, this.panZoomInstance = Ya({
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
      onTransformChange: (i) => {
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
      const b = m.measured?.width || m.width || 150, E = m.measured?.height || m.height || 50;
      e = Math.min(e, m.position.x), i = Math.min(i, m.position.y), n = Math.max(n, m.position.x + b), s = Math.max(s, m.position.y + E);
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
function Wh(t = {}) {
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
const ye = globalThis, ui = ye.ShadowRoot && (ye.ShadyCSS === void 0 || ye.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, fi = Symbol(), Zi = /* @__PURE__ */ new WeakMap();
let Ln = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== fi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ui && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = Zi.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Zi.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const qa = (t) => new Ln(typeof t == "string" ? t : t + "", void 0, fi), X = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1]), t[0]);
  return new Ln(i, t, fi);
}, Za = (t, e) => {
  if (ui) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const n = document.createElement("style"), s = ye.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, t.appendChild(n);
  }
}, Wi = ui ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return qa(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wa, defineProperty: Va, getOwnPropertyDescriptor: Ga, getOwnPropertyNames: ja, getOwnPropertySymbols: Ka, getPrototypeOf: Qa } = Object, Pe = globalThis, Vi = Pe.trustedTypes, Ja = Vi ? Vi.emptyScript : "", th = Pe.reactiveElementPolyfillSupport, Wt = (t, e) => t, Se = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ja : null;
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
} }, pi = (t, e) => !Wa(t, e), Gi = { attribute: !0, type: String, converter: Se, reflect: !1, useDefault: !1, hasChanged: pi };
Symbol.metadata ??= Symbol("metadata"), Pe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ht = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Gi) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, i);
      s !== void 0 && Va(this.prototype, e, s);
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
    if (this.hasOwnProperty(Wt("elementProperties"))) return;
    const e = Qa(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Wt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Wt("properties"))) {
      const i = this.properties, n = [...ja(i), ...Ka(i)];
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
      for (const s of n) i.unshift(Wi(s));
    } else e !== void 0 && i.push(Wi(e));
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
  attributeChangedCallback(e, i, n) {
    this._$AK(e, n);
  }
  _$ET(e, i) {
    const n = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, n);
    if (s !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : Se).toAttribute(i, n.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Se;
      this._$Em = s;
      const a = o.fromAttribute(i, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, n) {
    if (e !== void 0) {
      const s = this.constructor, r = this[e];
      if (n ??= s.getPropertyOptions(e), !((n.hasChanged ?? pi)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, n)))) return;
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
Ht.elementStyles = [], Ht.shadowRootOptions = { mode: "open" }, Ht[Wt("elementProperties")] = /* @__PURE__ */ new Map(), Ht[Wt("finalized")] = /* @__PURE__ */ new Map(), th?.({ ReactiveElement: Ht }), (Pe.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gi = globalThis, Ee = gi.trustedTypes, ji = Ee ? Ee.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Tn = "$lit$", xt = `lit$${Math.random().toFixed(9).slice(2)}$`, Dn = "?" + xt, eh = `<${Dn}>`, kt = document, Kt = () => kt.createComment(""), Qt = (t) => t === null || typeof t != "object" && typeof t != "function", mi = Array.isArray, ih = (t) => mi(t) || typeof t?.[Symbol.iterator] == "function", Ue = `[ 	
\f\r]`, Xt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ki = /-->/g, Qi = />/g, bt = RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ji = /'/g, tn = /"/g, On = /^(?:script|style|textarea|title)$/i, In = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), M = In(1), K = In(2), Ct = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), en = /* @__PURE__ */ new WeakMap(), _t = kt.createTreeWalker(kt, 129);
function Bn(t, e) {
  if (!mi(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ji !== void 0 ? ji.createHTML(e) : e;
}
const nh = (t, e) => {
  const i = t.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Xt;
  for (let a = 0; a < i; a++) {
    const h = t[a];
    let l, c, d = -1, f = 0;
    for (; f < h.length && (o.lastIndex = f, c = o.exec(h), c !== null); ) f = o.lastIndex, o === Xt ? c[1] === "!--" ? o = Ki : c[1] !== void 0 ? o = Qi : c[2] !== void 0 ? (On.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = bt) : c[3] !== void 0 && (o = bt) : o === bt ? c[0] === ">" ? (o = s ?? Xt, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? bt : c[3] === '"' ? tn : Ji) : o === tn || o === Ji ? o = bt : o === Ki || o === Qi ? o = Xt : (o = bt, s = void 0);
    const p = o === bt && t[a + 1].startsWith("/>") ? " " : "";
    r += o === Xt ? h + eh : d >= 0 ? (n.push(l), h.slice(0, d) + Tn + h.slice(d) + xt + p) : h + xt + (d === -2 ? a : p);
  }
  return [Bn(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class Jt {
  constructor({ strings: e, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, h = this.parts, [l, c] = nh(e, i);
    if (this.el = Jt.createElement(l, n), _t.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = _t.nextNode()) !== null && h.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Tn)) {
          const f = c[o++], p = s.getAttribute(d).split(xt), m = /([.?@])?(.*)/.exec(f);
          h.push({ type: 1, index: r, name: m[2], strings: p, ctor: m[1] === "." ? rh : m[1] === "?" ? oh : m[1] === "@" ? ah : Le }), s.removeAttribute(d);
        } else d.startsWith(xt) && (h.push({ type: 6, index: r }), s.removeAttribute(d));
        if (On.test(s.tagName)) {
          const d = s.textContent.split(xt), f = d.length - 1;
          if (f > 0) {
            s.textContent = Ee ? Ee.emptyScript : "";
            for (let p = 0; p < f; p++) s.append(d[p], Kt()), _t.nextNode(), h.push({ type: 2, index: ++r });
            s.append(d[f], Kt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Dn) h.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(xt, d + 1)) !== -1; ) h.push({ type: 7, index: r }), d += xt.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = kt.createElement("template");
    return n.innerHTML = e, n;
  }
}
function Dt(t, e, i = t, n) {
  if (e === Ct) return e;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = Qt(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = s : i._$Cl = s), s !== void 0 && (e = Dt(t, s._$AS(t, e.values), s, n)), e;
}
class sh {
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
    const { el: { content: i }, parts: n } = this._$AD, s = (e?.creationScope ?? kt).importNode(i, !0);
    _t.currentNode = s;
    let r = _t.nextNode(), o = 0, a = 0, h = n[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new ne(r, r.nextSibling, this, e) : h.type === 1 ? l = new h.ctor(r, h.name, h.strings, this, e) : h.type === 6 && (l = new hh(r, this, e)), this._$AV.push(l), h = n[++a];
      }
      o !== h?.index && (r = _t.nextNode(), o++);
    }
    return _t.currentNode = kt, s;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class ne {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, s) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = Dt(this, e, i), Qt(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== Ct && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ih(e) ? this.k(e) : this._(e);
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
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Jt.createElement(Bn(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new sh(s, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = en.get(e.strings);
    return i === void 0 && en.set(e.strings, i = new Jt(e)), i;
  }
  k(e) {
    mi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of e) s === i.length ? i.push(n = new ne(this.O(Kt()), this.O(Kt()), this, this.options)) : n = i[s], n._$AI(r), s++;
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
class Le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, s, r) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = D;
  }
  _$AI(e, i = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = Dt(this, e, i, 0), o = !Qt(e) || e !== this._$AH && e !== Ct, o && (this._$AH = e);
    else {
      const a = e;
      let h, l;
      for (e = r[0], h = 0; h < r.length - 1; h++) l = Dt(this, a[n + h], i, h), l === Ct && (l = this._$AH[h]), o ||= !Qt(l) || l !== this._$AH[h], l === D ? e = D : e !== D && (e += (l ?? "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class rh extends Le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === D ? void 0 : e;
  }
}
class oh extends Le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== D);
  }
}
class ah extends Le {
  constructor(e, i, n, s, r) {
    super(e, i, n, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Dt(this, e, i, 0) ?? D) === Ct) return;
    const n = this._$AH, s = e === D && n !== D || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== D && (n === D || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class hh {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Dt(this, e);
  }
}
const lh = gi.litHtmlPolyfillSupport;
lh?.(Jt, ne), (gi.litHtmlVersions ??= []).push("3.3.1");
const Un = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new ne(e.insertBefore(Kt(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yi = globalThis;
let I = class extends Ht {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Un(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ct;
  }
};
I._$litElement$ = !0, I.finalized = !0, yi.litElementHydrateSupport?.({ LitElement: I });
const ch = yi.litElementPolyfillSupport;
ch?.({ LitElement: I });
(yi.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xn = Symbol.for(""), dh = (t) => {
  if (t?.r === Xn) return t?._$litStatic$;
}, uh = (t) => ({ _$litStatic$: t, r: Xn }), nn = /* @__PURE__ */ new Map(), fh = (t) => (e, ...i) => {
  const n = i.length;
  let s, r;
  const o = [], a = [];
  let h, l = 0, c = !1;
  for (; l < n; ) {
    for (h = e[l]; l < n && (r = i[l], (s = dh(r)) !== void 0); ) h += s + e[++l], c = !0;
    l !== n && a.push(r), o.push(h), l++;
  }
  if (l === n && o.push(e[n]), c) {
    const d = o.join("$$lit$$");
    (e = nn.get(d)) === void 0 && (o.raw = o, nn.set(d, e = o)), i = a;
  }
  return t(e, ...i);
}, nt = fh(M);
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
const ph = { attribute: !0, type: String, converter: Se, reflect: !1, hasChanged: pi }, gh = (t = ph, e, i) => {
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
const Yn = "important", wh = " !" + Yn, xh = yh(class extends vh {
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
        n.includes("-") || r ? i.setProperty(n, r ? s.slice(0, -11) : s, r ? Yn : "") : i[n] = s;
      }
    }
    return Ct;
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
function sn(t) {
  return Pa(t);
}
function bh(t) {
  return Aa(t);
}
function tl(t, e) {
  return t.x >= e.x && t.x <= e.x + e.width && t.y >= e.y && t.y <= e.y + e.height;
}
var $h = Object.defineProperty, _h = Object.getOwnPropertyDescriptor, se = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? _h(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && $h(e, i, s), s;
};
let Mt = class extends I {
  constructor() {
    super(), this.nodes = [], this.edges = [], this.viewport = { x: 0, y: 0, zoom: 1 }, this.nodeTypes = {
      default: "flow-node",
      shape: "shape-node",
      "erd-table": "erd-table-node"
    }, this.connection = null, this.onHandleStart = (t) => {
      const { nodeId: e, type: i, handleId: n } = t.detail;
      this.connection = { from: { nodeId: e, handleId: n } };
    }, this.onMouseMove = (t) => {
      if (!this.connection) return;
      const e = this.screenToCanvas(t.clientX, t.clientY);
      this.connection.preview = e, this.requestUpdate();
    }, this.onMouseUp = (t) => {
      if (!this.connection) return;
      const e = t.composedPath();
      let i = null, n;
      for (const r of e)
        if (r instanceof HTMLElement) {
          const o = r.tagName.toLowerCase();
          if (o === "flow-node" || Object.values(this.nodeTypes).some((a) => a === o)) {
            i = r;
            break;
          }
          r.dataset.handleId && (n = r.dataset.handleId);
        }
      const s = i?.getAttribute("id") || void 0;
      if (this.connection.from && s && s !== this.connection.from.nodeId) {
        const r = `e-${this.connection.from.nodeId}-${s}-${Date.now()}`, o = this.connection.from.nodeId, a = this.connection.from.handleId;
        let h = n;
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
    }, this.instance = new Fa({ nodes: this.nodes, edges: this.edges });
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
      return console.log("getHandleCanvasPosition for shape node:", { nodeId: t, handleId: e, node: r }), this.getShapeHandlePosition(r, e);
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
    console.log("getShapeHandlePosition:", { handleId: e, parts: o, handleType: a, node: t.id, size: n });
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
    const i = this.nodes.find((w) => w.id === t), n = this.nodes.find((w) => w.id === e);
    if (!i || !n) return `${e}-target-left`;
    const s = i.position.x, r = i.position.y, o = n.position.x, a = n.position.y, h = n.data, l = h?.size?.width || 200, c = h?.size?.height || 200, d = s + (i.width || 150) / 2, f = r + (i.height || 50) / 2, p = o + l / 2, m = a + c / 2, b = p - d, E = m - f;
    return Math.abs(b) > Math.abs(E) ? b > 0 ? `${e}-target-left` : `${e}-target-right` : E > 0 ? `${e}-target-top` : `${e}-target-bottom`;
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
    const [, a, h] = Qe({
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
    const e = t.type || "default", i = this.nodeTypes[e] || "flow-node", n = uh(i);
    return nt`
      <${n}
        .id=${t.id}
        .data=${t.data}
        .position=${t.position}
        .selected=${t.selected || !1}
        .draggable=${t.draggable !== !1}
        .connectable=${t.connectable !== !1}
        .resizable=${t.resizable || !1}
        .instance=${this.instance}
        @handle-start=${this.onHandleStart}
      ></${n}>
    `;
  }
  render() {
    const t = `translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;
    return nt`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${xh({ transform: t })}
        >
          <div class="flow-edges-layer">
            ${this.edges.map((e) => {
      const i = this.nodes.find((s) => s.id === e.source), n = this.nodes.find((s) => s.id === e.target);
      return !i || !n ? null : nt`
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
      const i = e.data && e.data.labelHtml, n = e.data && e.data.label;
      if (!(!!i || !!n)) return null;
      const r = this.computeLabelCanvasPosition(e);
      if (!r) return null;
      const o = `transform: translate(-50%, -50%) translate(${r.x}px, ${r.y}px);`;
      return i ? nt`<div class="edge-label" style="${o}" .innerHTML=${i}></div>` : nt`<div class="edge-label" style="${o}">${n}</div>`;
    })}
            ${this.edges.map((e) => {
      const i = e.data && e.data.startLabelHtml, n = e.data && e.data.startLabel;
      if (!i && !n) return null;
      const s = this.computeStartLabelCanvasPosition(e);
      if (!s) return null;
      const r = `transform: translate(-50%, -50%) translate(${s.x}px, ${s.y}px);`;
      return i ? nt`<div class="edge-label" style="${r}" .innerHTML=${i}></div>` : nt`<div class="edge-label" style="${r}">${n}</div>`;
    })}
            ${this.edges.map((e) => {
      const i = e.data && e.data.endLabelHtml, n = e.data && e.data.endLabel;
      if (!i && !n) return null;
      const s = this.computeEndLabelCanvasPosition(e);
      if (!s) return null;
      const r = `transform: translate(-50%, -50%) translate(${s.x}px, ${s.y}px);`;
      return i ? nt`<div class="edge-label" style="${r}" .innerHTML=${i}></div>` : nt`<div class="edge-label" style="${r}">${n}</div>`;
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
  renderPreviewEdge() {
    if (!this.connection || !this.connection.preview) return null;
    const t = this.connection.preview, e = this.connection.from ? this.nodes.find((n) => n.id === this.connection.from.nodeId) : null, i = this.connection.to ? this.nodes.find((n) => n.id === this.connection.to.nodeId) : null;
    return e ? nt`
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
      ` : i ? nt`
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
Mt.styles = X`
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
  v({ type: Array })
], Mt.prototype, "nodes", 2);
se([
  v({ type: Array })
], Mt.prototype, "edges", 2);
se([
  v({ type: Object })
], Mt.prototype, "viewport", 2);
se([
  v({ type: Object })
], Mt.prototype, "nodeTypes", 2);
Mt = se([
  q("flow-canvas")
], Mt);
var zh = Object.defineProperty, Sh = Object.getOwnPropertyDescriptor, Nt = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Sh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && zh(e, i, s), s;
};
let gt = class extends I {
  constructor() {
    super(...arguments), this.visible = !1, this.minWidth = 10, this.minHeight = 10, this.maxWidth = Number.MAX_VALUE, this.maxHeight = Number.MAX_VALUE, this.keepAspectRatio = !1, this.isResizing = !1, this.resizeStart = { x: 0, y: 0, width: 0, height: 0 }, this.resizeHandle = "", this.handleMouseDown = (t) => {
      const e = t.target;
      console.log("NodeResizer handleMouseDown:", e, e.classList);
      let i = e.classList.contains("resize-handle");
      if (!i && e === this && (i = t.composedPath().some(
        (o) => o instanceof HTMLElement && o.classList.contains("resize-handle")
      )), console.log("Is resize handle:", i), !i) return;
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
gt.styles = X`
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
  v({ type: Boolean, reflect: !0 })
], gt.prototype, "visible", 2);
Nt([
  v({ type: Number })
], gt.prototype, "minWidth", 2);
Nt([
  v({ type: Number })
], gt.prototype, "minHeight", 2);
Nt([
  v({ type: Number })
], gt.prototype, "maxWidth", 2);
Nt([
  v({ type: Number })
], gt.prototype, "maxHeight", 2);
Nt([
  v({ type: Boolean })
], gt.prototype, "keepAspectRatio", 2);
gt = Nt([
  q("node-resizer")
], gt);
var Eh = Object.defineProperty, kh = Object.getOwnPropertyDescriptor, mt = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? kh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Eh(e, i, s), s;
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
    this.draggable && this.addEventListener("mousedown", this.handleMouseDown), this.addEventListener("click", this.handleClick), this.resizable && (this.addEventListener("resize", this.handleResize), this.addEventListener("resize-end", this.handleResizeEnd)), this.updateMeasuredSize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mousedown", this.handleMouseDown), this.removeEventListener("click", this.handleClick), this.resizable && (this.removeEventListener("resize", this.handleResize), this.removeEventListener("resize-end", this.handleResizeEnd)), this.cleanup();
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
    super.updated(t), this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`, this.updateMeasuredSize(), t.has("resizable") && console.log("FlowNode resizable changed:", this.resizable);
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
Q.styles = X`
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
  v({ type: String, reflect: !0 })
], Q.prototype, "id", 2);
mt([
  v({ type: Object })
], Q.prototype, "data", 2);
mt([
  v({ type: Object })
], Q.prototype, "position", 2);
mt([
  v({ type: Boolean, reflect: !0 })
], Q.prototype, "selected", 2);
mt([
  v({ type: Boolean, reflect: !0 })
], Q.prototype, "dragging", 2);
mt([
  v({ type: Boolean })
], Q.prototype, "draggable", 2);
mt([
  v({ type: Object })
], Q.prototype, "instance", 2);
mt([
  v({ type: Boolean })
], Q.prototype, "resizable", 2);
Q = mt([
  q("flow-node")
], Q);
var Ch = Object.defineProperty, Mh = Object.getOwnPropertyDescriptor, Z = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Mh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Ch(e, i, s), s;
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
    const i = t.x, n = t.y, s = e.x, r = e.y, o = t.position, a = e.position;
    switch (this.type) {
      case "straight":
        return bh({
          sourceX: i,
          sourceY: n,
          targetX: s,
          targetY: r
        });
      case "smoothstep":
        return sn({
          sourceX: i,
          sourceY: n,
          sourcePosition: o,
          targetX: s,
          targetY: r,
          targetPosition: a
        });
      case "step":
        return sn({
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
        return Qe({
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
        return Qe({
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
    ].filter(Boolean).join(" "), h = this.getMarkerId(this.markerStart), l = this.getMarkerId(this.markerEnd), c = h ? `url(#${h})` : void 0, d = l ? `url(#${l})` : void 0, f = this.animated ? "5" : "";
    return M`
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
            d="${i}"
            stroke-dasharray="${f}"
            marker-start="${c ?? ""}"
            marker-end="${d ?? ""}"
            @click=${this.handleClick}
          />
          ${this.label ? K`
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
B.styles = X`
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
Z([
  v({ type: String })
], B.prototype, "id", 2);
Z([
  v({ type: String })
], B.prototype, "source", 2);
Z([
  v({ type: String })
], B.prototype, "target", 2);
Z([
  v({ type: String })
], B.prototype, "sourceHandle", 2);
Z([
  v({ type: String })
], B.prototype, "targetHandle", 2);
Z([
  v({ type: Object })
], B.prototype, "sourceNode", 2);
Z([
  v({ type: Object })
], B.prototype, "targetNode", 2);
Z([
  v({ type: Boolean })
], B.prototype, "animated", 2);
Z([
  v({ type: Boolean })
], B.prototype, "selected", 2);
Z([
  v({ type: String })
], B.prototype, "label", 2);
Z([
  v({ type: String })
], B.prototype, "type", 2);
Z([
  v({ type: Object })
], B.prototype, "markerStart", 2);
Z([
  v({ type: Object })
], B.prototype, "markerEnd", 2);
B = Z([
  q("flow-edge")
], B);
var Ah = Object.defineProperty, Nh = Object.getOwnPropertyDescriptor, re = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Nh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Ah(e, i, s), s;
};
let At = class extends I {
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
At.styles = X`
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
  v({ type: String })
], At.prototype, "variant", 2);
re([
  v({ type: Number })
], At.prototype, "gap", 2);
re([
  v({ type: String })
], At.prototype, "color", 2);
re([
  v({ type: Number })
], At.prototype, "size", 2);
At = re([
  q("flow-background")
], At);
var Hh = Object.defineProperty, Rh = Object.getOwnPropertyDescriptor, vi = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Rh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Hh(e, i, s), s;
};
let te = class extends I {
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
te.styles = X`
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
vi([
  v({ type: Number })
], te.prototype, "width", 2);
vi([
  v({ type: Number })
], te.prototype, "height", 2);
te = vi([
  q("flow-minimap")
], te);
var Ph = Object.defineProperty, Lh = Object.getOwnPropertyDescriptor, Fn = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Lh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Ph(e, i, s), s;
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
    return M`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `;
  }
};
ke.styles = X`
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
Fn([
  v({ type: Object })
], ke.prototype, "instance", 2);
ke = Fn([
  q("flow-controls")
], ke);
var Th = Object.getOwnPropertyDescriptor, Dh = Object.getPrototypeOf, Oh = Reflect.get, Ih = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Th(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(s) || s);
  return s;
}, Xe = (t, e, i) => Oh(Dh(t), i, e);
let ut = class extends Q {
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
      
      <div class="table-body">
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
  ...Array.isArray(Xe(ut, ut, "styles")) ? Xe(ut, ut, "styles") : [Xe(ut, ut, "styles")],
  X`
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
], wi = class wi {
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
wi.shapes = /* @__PURE__ */ new Map();
let Ce = wi;
Ce.initialize();
var Yh = Object.defineProperty, Fh = Object.getOwnPropertyDescriptor, ct = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Fh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Yh(e, i, s), s;
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
      console.log("handleMouseUp"), this.isDragging && this.instance && this.instance.updateNode(this.id, { dragging: !1 }), this.isDragging = !1, this.cleanup();
    }, this.handleHandleStart = (t) => {
      console.log("handleHandleStart", t), t.stopPropagation(), this.isDragging = !1;
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
    super.updated(t), t.has("position") && this.isDragging, t.has("resizable") && console.log("ShapeNode resizable changed:", this.resizable);
  }
  /**
   * Get the shape definition from the registry
   */
  getShapeDefinition() {
    if (this.data?.type)
      return Ce.get(this.data.type);
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
J.styles = X`
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
  v({ type: String, reflect: !0 })
], J.prototype, "id", 2);
ct([
  v({ type: Object })
], J.prototype, "data", 2);
ct([
  v({
    type: Object,
    hasChanged: (t, e) => !e || t.x !== e.x || t.y !== e.y
  })
], J.prototype, "position", 2);
ct([
  v({ type: Boolean, reflect: !0 })
], J.prototype, "selected", 2);
ct([
  v({ type: Boolean, reflect: !0 })
], J.prototype, "dragging", 2);
ct([
  v({ type: Boolean })
], J.prototype, "draggable", 2);
ct([
  v({ type: Boolean })
], J.prototype, "connectable", 2);
ct([
  v({ type: Object })
], J.prototype, "instance", 2);
ct([
  v({ type: Boolean })
], J.prototype, "resizable", 2);
J = ct([
  q("shape-node")
], J);
var qh = Object.getOwnPropertyDescriptor, oe = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? qh(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(s) || s);
  return s;
};
let Je = class extends I {
  render() {
    return M`<slot></slot>`;
  }
};
Je.styles = X`
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
  q("base-node")
], Je);
let ti = class extends I {
  render() {
    return M`<slot></slot>`;
  }
};
ti.styles = X`
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
ti = oe([
  q("base-node-header")
], ti);
let ei = class extends I {
  render() {
    return M`<span class="title"><slot></slot></span>`;
  }
};
ei.styles = X`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;
ei = oe([
  q("base-node-header-title")
], ei);
let ii = class extends I {
  render() {
    return M`<slot></slot>`;
  }
};
ii.styles = X`
    :host {
      display: block;
      padding: 12px;
    }
  `;
ii = oe([
  q("base-node-content")
], ii);
let ni = class extends I {
  render() {
    return M`<slot></slot>`;
  }
};
ni.styles = X`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;
ni = oe([
  q("base-node-footer")
], ni);
var Zh = Object.defineProperty, U = (t, e, i, n) => {
  for (var s = void 0, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = o(e, i, s) || s);
  return s && Zh(e, i, s), s;
};
const el = (t) => {
  class e extends t {
    constructor() {
      super(...arguments), this.id = "", this.position = { x: 0, y: 0 }, this.data = {}, this.selected = !1, this.dragging = !1, this.instance = null, this.resizable = !1, this.draggable = !0, this.connectable = !0, this.minWidth = 10, this.maxWidth = Number.MAX_VALUE, this.minHeight = 10, this.maxHeight = Number.MAX_VALUE, this.keepAspectRatio = !1, this.maxInitialHeight = 0, this.isDragging = !1, this.dragStart = { x: 0, y: 0 }, this.nodeStart = { x: 0, y: 0 }, this.isResizing = !1, this.resizeStart = { x: 0, y: 0, width: 0, height: 0 }, this.resizeHandle = "", this.handleClick = (n) => {
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
      return [X`
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
      this.appendResizerToDOM(), Promise.resolve().then(() => {
        this.adjustHeightToContent();
      });
    }
    updated(n) {
      super.updated(n), this.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`, n.has("maxInitialHeight") && !this.isResizing && Promise.resolve().then(() => {
        this.adjustHeightToContent();
      }), (n.has("resizable") || n.has("selected")) && this.appendResizerToDOM();
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
          `, this.shadowRoot?.appendChild(s), Un(n, s);
        }
      }
    }
    removeExistingResizer() {
      const n = this.shadowRoot?.querySelector(".mixin-resizer-container");
      n && n.remove();
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
  return U([
    v({ type: String, reflect: !0 })
  ], e.prototype, "id"), U([
    v({ type: Object })
  ], e.prototype, "position"), U([
    v({ type: Object })
  ], e.prototype, "data"), U([
    v({ type: Boolean, reflect: !0 })
  ], e.prototype, "selected"), U([
    v({ type: Boolean, reflect: !0 })
  ], e.prototype, "dragging"), U([
    v({ type: Object })
  ], e.prototype, "instance"), U([
    v({ type: Boolean })
  ], e.prototype, "resizable"), U([
    v({ type: Boolean })
  ], e.prototype, "draggable"), U([
    v({ type: Boolean })
  ], e.prototype, "connectable"), U([
    v({ type: Number })
  ], e.prototype, "minWidth"), U([
    v({ type: Number })
  ], e.prototype, "maxWidth"), U([
    v({ type: Number })
  ], e.prototype, "minHeight"), U([
    v({ type: Number })
  ], e.prototype, "maxHeight"), U([
    v({ type: Boolean })
  ], e.prototype, "keepAspectRatio"), U([
    v({ type: Number })
  ], e.prototype, "maxInitialHeight"), e;
};
export {
  Je as BaseNode,
  ii as BaseNodeContent,
  ni as BaseNodeFooter,
  ti as BaseNodeHeader,
  ei as BaseNodeHeaderTitle,
  ut as ERDTableNode,
  At as FlowBackground,
  Mt as FlowCanvas,
  ke as FlowControls,
  B as FlowEdge,
  Fa as FlowInstance,
  te as FlowMinimap,
  Q as FlowNode,
  el as NodeMixin,
  gt as NodeResizer,
  k as Position,
  J as ShapeNode,
  Ce as ShapeRegistry,
  Wh as createStore,
  Qe as getBezierPath,
  Jh as getCenter,
  Qh as getDistance,
  sn as getSmoothStepPath,
  bh as getStraightPath,
  tl as isPointInRect
};
//# sourceMappingURL=lit-flow.bundle.js.map
