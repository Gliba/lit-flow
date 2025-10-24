(function(u,At){typeof exports=="object"&&typeof module<"u"?At(exports):typeof define=="function"&&define.amd?define(["exports"],At):(u=typeof globalThis<"u"?globalThis:u||self,At(u.LitFlow={}))})(this,(function(u){"use strict";var At={value:()=>{}};function Ce(){for(var e=0,t=arguments.length,n={},i;e<t;++e){if(!(i=arguments[e]+"")||i in n||/[\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new ee(n)}function ee(e){this._=e}function Hi(e,t){return e.trim().split(/^|\s+/).map(function(n){var i="",s=n.indexOf(".");if(s>=0&&(i=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}ee.prototype=Ce.prototype={constructor:ee,on:function(e,t){var n=this._,i=Hi(e+"",n),s,r=-1,o=i.length;if(arguments.length<2){for(;++r<o;)if((s=(e=i[r]).type)&&(s=Ri(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<o;)if(s=(e=i[r]).type)n[s]=hn(n[s],e.name,t);else if(t==null)for(s in n)n[s]=hn(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new ee(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),i=0,s,r;i<s;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(r=this._[e],i=0,s=r.length;i<s;++i)r[i].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var i=this._[e],s=0,r=i.length;s<r;++s)i[s].value.apply(t,n)}};function Ri(e,t){for(var n=0,i=e.length,s;n<i;++n)if((s=e[n]).name===t)return s.value}function hn(e,t,n){for(var i=0,s=e.length;i<s;++i)if(e[i].name===t){e[i]=At,e=e.slice(0,i).concat(e.slice(i+1));break}return n!=null&&e.push({name:t,value:n}),e}var Me="http://www.w3.org/1999/xhtml";const cn={svg:"http://www.w3.org/2000/svg",xhtml:Me,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ne(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),cn.hasOwnProperty(t)?{space:cn[t],local:e}:e}function Li(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Me&&t.documentElement.namespaceURI===Me?t.createElement(e):t.createElementNS(n,e)}}function Ti(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function dn(e){var t=ne(e);return(t.local?Ti:Li)(t)}function Di(){}function Ae(e){return e==null?Di:function(){return this.querySelector(e)}}function Oi(e){typeof e!="function"&&(e=Ae(e));for(var t=this._groups,n=t.length,i=new Array(n),s=0;s<n;++s)for(var r=t[s],o=r.length,a=i[s]=new Array(o),l,c,h=0;h<o;++h)(l=r[h])&&(c=e.call(l,l.__data__,h,r))&&("__data__"in l&&(c.__data__=l.__data__),a[h]=c);return new q(i,this._parents)}function Bi(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Fi(){return[]}function un(e){return e==null?Fi:function(){return this.querySelectorAll(e)}}function Ii(e){return function(){return Bi(e.apply(this,arguments))}}function Ui(e){typeof e=="function"?e=Ii(e):e=un(e);for(var t=this._groups,n=t.length,i=[],s=[],r=0;r<n;++r)for(var o=t[r],a=o.length,l,c=0;c<a;++c)(l=o[c])&&(i.push(e.call(l,l.__data__,c,o)),s.push(l));return new q(i,s)}function fn(e){return function(){return this.matches(e)}}function pn(e){return function(t){return t.matches(e)}}var Xi=Array.prototype.find;function Yi(e){return function(){return Xi.call(this.children,e)}}function Zi(){return this.firstElementChild}function qi(e){return this.select(e==null?Zi:Yi(typeof e=="function"?e:pn(e)))}var Wi=Array.prototype.filter;function Vi(){return Array.from(this.children)}function Gi(e){return function(){return Wi.call(this.children,e)}}function ji(e){return this.selectAll(e==null?Vi:Gi(typeof e=="function"?e:pn(e)))}function Ki(e){typeof e!="function"&&(e=fn(e));for(var t=this._groups,n=t.length,i=new Array(n),s=0;s<n;++s)for(var r=t[s],o=r.length,a=i[s]=[],l,c=0;c<o;++c)(l=r[c])&&e.call(l,l.__data__,c,r)&&a.push(l);return new q(i,this._parents)}function gn(e){return new Array(e.length)}function Qi(){return new q(this._enter||this._groups.map(gn),this._parents)}function ie(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}ie.prototype={constructor:ie,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Ji(e){return function(){return e}}function ts(e,t,n,i,s,r){for(var o=0,a,l=t.length,c=r.length;o<c;++o)(a=t[o])?(a.__data__=r[o],i[o]=a):n[o]=new ie(e,r[o]);for(;o<l;++o)(a=t[o])&&(s[o]=a)}function es(e,t,n,i,s,r,o){var a,l,c=new Map,h=t.length,d=r.length,p=new Array(h),g;for(a=0;a<h;++a)(l=t[a])&&(p[a]=g=o.call(l,l.__data__,a,t)+"",c.has(g)?s[a]=l:c.set(g,l));for(a=0;a<d;++a)g=o.call(e,r[a],a,r)+"",(l=c.get(g))?(i[a]=l,l.__data__=r[a],c.delete(g)):n[a]=new ie(e,r[a]);for(a=0;a<h;++a)(l=t[a])&&c.get(p[a])===l&&(s[a]=l)}function ns(e){return e.__data__}function is(e,t){if(!arguments.length)return Array.from(this,ns);var n=t?es:ts,i=this._parents,s=this._groups;typeof e!="function"&&(e=Ji(e));for(var r=s.length,o=new Array(r),a=new Array(r),l=new Array(r),c=0;c<r;++c){var h=i[c],d=s[c],p=d.length,g=ss(e.call(h,h&&h.__data__,c,i)),y=g.length,$=a[c]=new Array(y),k=o[c]=new Array(y),b=l[c]=new Array(p);n(h,d,$,k,b,g,t);for(var C=0,P=0,D,Z;C<y;++C)if(D=$[C]){for(C>=P&&(P=C+1);!(Z=k[P])&&++P<y;);D._next=Z||null}}return o=new q(o,i),o._enter=a,o._exit=l,o}function ss(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function rs(){return new q(this._exit||this._groups.map(gn),this._parents)}function os(e,t,n){var i=this.enter(),s=this,r=this.exit();return typeof e=="function"?(i=e(i),i&&(i=i.selection())):i=i.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?r.remove():n(r),i&&s?i.merge(s).order():s}function as(e){for(var t=e.selection?e.selection():e,n=this._groups,i=t._groups,s=n.length,r=i.length,o=Math.min(s,r),a=new Array(s),l=0;l<o;++l)for(var c=n[l],h=i[l],d=c.length,p=a[l]=new Array(d),g,y=0;y<d;++y)(g=c[y]||h[y])&&(p[y]=g);for(;l<s;++l)a[l]=n[l];return new q(a,this._parents)}function ls(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var i=e[t],s=i.length-1,r=i[s],o;--s>=0;)(o=i[s])&&(r&&o.compareDocumentPosition(r)^4&&r.parentNode.insertBefore(o,r),r=o);return this}function hs(e){e||(e=cs);function t(d,p){return d&&p?e(d.__data__,p.__data__):!d-!p}for(var n=this._groups,i=n.length,s=new Array(i),r=0;r<i;++r){for(var o=n[r],a=o.length,l=s[r]=new Array(a),c,h=0;h<a;++h)(c=o[h])&&(l[h]=c);l.sort(t)}return new q(s,this._parents).order()}function cs(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function ds(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function us(){return Array.from(this)}function fs(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],s=0,r=i.length;s<r;++s){var o=i[s];if(o)return o}return null}function ps(){let e=0;for(const t of this)++e;return e}function gs(){return!this.node()}function ms(e){for(var t=this._groups,n=0,i=t.length;n<i;++n)for(var s=t[n],r=0,o=s.length,a;r<o;++r)(a=s[r])&&e.call(a,a.__data__,r,s);return this}function ys(e){return function(){this.removeAttribute(e)}}function ws(e){return function(){this.removeAttributeNS(e.space,e.local)}}function vs(e,t){return function(){this.setAttribute(e,t)}}function bs(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function xs(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function $s(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function _s(e,t){var n=ne(e);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((t==null?n.local?ws:ys:typeof t=="function"?n.local?$s:xs:n.local?bs:vs)(n,t))}function mn(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function zs(e){return function(){this.style.removeProperty(e)}}function Ss(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Es(e,t,n){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function ks(e,t,n){return arguments.length>1?this.each((t==null?zs:typeof t=="function"?Es:Ss)(e,t,n??"")):St(this.node(),e)}function St(e,t){return e.style.getPropertyValue(t)||mn(e).getComputedStyle(e,null).getPropertyValue(t)}function Ns(e){return function(){delete this[e]}}function Cs(e,t){return function(){this[e]=t}}function Ms(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function As(e,t){return arguments.length>1?this.each((t==null?Ns:typeof t=="function"?Ms:Cs)(e,t)):this.node()[e]}function yn(e){return e.trim().split(/^|\s+/)}function Pe(e){return e.classList||new wn(e)}function wn(e){this._node=e,this._names=yn(e.getAttribute("class")||"")}wn.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function vn(e,t){for(var n=Pe(e),i=-1,s=t.length;++i<s;)n.add(t[i])}function bn(e,t){for(var n=Pe(e),i=-1,s=t.length;++i<s;)n.remove(t[i])}function Ps(e){return function(){vn(this,e)}}function Hs(e){return function(){bn(this,e)}}function Rs(e,t){return function(){(t.apply(this,arguments)?vn:bn)(this,e)}}function Ls(e,t){var n=yn(e+"");if(arguments.length<2){for(var i=Pe(this.node()),s=-1,r=n.length;++s<r;)if(!i.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?Rs:t?Ps:Hs)(n,t))}function Ts(){this.textContent=""}function Ds(e){return function(){this.textContent=e}}function Os(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Bs(e){return arguments.length?this.each(e==null?Ts:(typeof e=="function"?Os:Ds)(e)):this.node().textContent}function Fs(){this.innerHTML=""}function Is(e){return function(){this.innerHTML=e}}function Us(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Xs(e){return arguments.length?this.each(e==null?Fs:(typeof e=="function"?Us:Is)(e)):this.node().innerHTML}function Ys(){this.nextSibling&&this.parentNode.appendChild(this)}function Zs(){return this.each(Ys)}function qs(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Ws(){return this.each(qs)}function Vs(e){var t=typeof e=="function"?e:dn(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Gs(){return null}function js(e,t){var n=typeof e=="function"?e:dn(e),i=t==null?Gs:typeof t=="function"?t:Ae(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function Ks(){var e=this.parentNode;e&&e.removeChild(this)}function Qs(){return this.each(Ks)}function Js(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function tr(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function er(e){return this.select(e?tr:Js)}function nr(e){return arguments.length?this.property("__data__",e):this.node().__data__}function ir(e){return function(t){e.call(this,t,this.__data__)}}function sr(e){return e.trim().split(/^|\s+/).map(function(t){var n="",i=t.indexOf(".");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{type:t,name:n}})}function rr(e){return function(){var t=this.__on;if(t){for(var n=0,i=-1,s=t.length,r;n<s;++n)r=t[n],(!e.type||r.type===e.type)&&r.name===e.name?this.removeEventListener(r.type,r.listener,r.options):t[++i]=r;++i?t.length=i:delete this.__on}}}function or(e,t,n){return function(){var i=this.__on,s,r=ir(t);if(i){for(var o=0,a=i.length;o<a;++o)if((s=i[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=r,s.options=n),s.value=t;return}}this.addEventListener(e.type,r,n),s={type:e.type,name:e.name,value:t,listener:r,options:n},i?i.push(s):this.__on=[s]}}function ar(e,t,n){var i=sr(e+""),s,r=i.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,h;l<c;++l)for(s=0,h=a[l];s<r;++s)if((o=i[s]).type===h.type&&o.name===h.name)return h.value}return}for(a=t?or:rr,s=0;s<r;++s)this.each(a(i[s],t,n));return this}function xn(e,t,n){var i=mn(e),s=i.CustomEvent;typeof s=="function"?s=new s(t,n):(s=i.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function lr(e,t){return function(){return xn(this,e,t)}}function hr(e,t){return function(){return xn(this,e,t.apply(this,arguments))}}function cr(e,t){return this.each((typeof t=="function"?hr:lr)(e,t))}function*dr(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],s=0,r=i.length,o;s<r;++s)(o=i[s])&&(yield o)}var $n=[null];function q(e,t){this._groups=e,this._parents=t}function Pt(){return new q([[document.documentElement]],$n)}function ur(){return this}q.prototype=Pt.prototype={constructor:q,select:Oi,selectAll:Ui,selectChild:qi,selectChildren:ji,filter:Ki,data:is,enter:Qi,exit:rs,join:os,merge:as,selection:ur,order:ls,sort:hs,call:ds,nodes:us,node:fs,size:ps,empty:gs,each:ms,attr:_s,style:ks,property:As,classed:Ls,text:Bs,html:Xs,raise:Zs,lower:Ws,append:Vs,insert:js,remove:Qs,clone:er,datum:nr,on:ar,dispatch:cr,[Symbol.iterator]:dr};function ut(e){return typeof e=="string"?new q([[document.querySelector(e)]],[document.documentElement]):new q([[e]],$n)}function fr(e){let t;for(;t=e.sourceEvent;)e=t;return e}function ft(e,t){if(e=fr(e),t===void 0&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=e.clientX,i.y=e.clientY,i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}if(t.getBoundingClientRect){var s=t.getBoundingClientRect();return[e.clientX-s.left-t.clientLeft,e.clientY-s.top-t.clientTop]}}return[e.pageX,e.pageY]}const He={capture:!0,passive:!1};function Re(e){e.preventDefault(),e.stopImmediatePropagation()}function pr(e){var t=e.document.documentElement,n=ut(e).on("dragstart.drag",Re,He);"onselectstart"in t?n.on("selectstart.drag",Re,He):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function gr(e,t){var n=e.document.documentElement,i=ut(e).on("dragstart.drag",null);t&&(i.on("click.drag",Re,He),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in n?i.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}function Le(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function _n(e,t){var n=Object.create(e.prototype);for(var i in t)n[i]=t[i];return n}function Ht(){}var Rt=.7,se=1/Rt,Et="\\s*([+-]?\\d+)\\s*",Lt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",it="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",mr=/^#([0-9a-f]{3,8})$/,yr=new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`),wr=new RegExp(`^rgb\\(${it},${it},${it}\\)$`),vr=new RegExp(`^rgba\\(${Et},${Et},${Et},${Lt}\\)$`),br=new RegExp(`^rgba\\(${it},${it},${it},${Lt}\\)$`),xr=new RegExp(`^hsl\\(${Lt},${it},${it}\\)$`),$r=new RegExp(`^hsla\\(${Lt},${it},${it},${Lt}\\)$`),zn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Le(Ht,mt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Sn,formatHex:Sn,formatHex8:_r,formatHsl:zr,formatRgb:En,toString:En});function Sn(){return this.rgb().formatHex()}function _r(){return this.rgb().formatHex8()}function zr(){return An(this).formatHsl()}function En(){return this.rgb().formatRgb()}function mt(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=mr.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?kn(t):n===3?new I(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?re(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?re(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=yr.exec(e))?new I(t[1],t[2],t[3],1):(t=wr.exec(e))?new I(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=vr.exec(e))?re(t[1],t[2],t[3],t[4]):(t=br.exec(e))?re(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=xr.exec(e))?Mn(t[1],t[2]/100,t[3]/100,1):(t=$r.exec(e))?Mn(t[1],t[2]/100,t[3]/100,t[4]):zn.hasOwnProperty(e)?kn(zn[e]):e==="transparent"?new I(NaN,NaN,NaN,0):null}function kn(e){return new I(e>>16&255,e>>8&255,e&255,1)}function re(e,t,n,i){return i<=0&&(e=t=n=NaN),new I(e,t,n,i)}function Sr(e){return e instanceof Ht||(e=mt(e)),e?(e=e.rgb(),new I(e.r,e.g,e.b,e.opacity)):new I}function Te(e,t,n,i){return arguments.length===1?Sr(e):new I(e,t,n,i??1)}function I(e,t,n,i){this.r=+e,this.g=+t,this.b=+n,this.opacity=+i}Le(I,Te,_n(Ht,{brighter(e){return e=e==null?se:Math.pow(se,e),new I(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Rt:Math.pow(Rt,e),new I(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new I(yt(this.r),yt(this.g),yt(this.b),oe(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Nn,formatHex:Nn,formatHex8:Er,formatRgb:Cn,toString:Cn}));function Nn(){return`#${wt(this.r)}${wt(this.g)}${wt(this.b)}`}function Er(){return`#${wt(this.r)}${wt(this.g)}${wt(this.b)}${wt((isNaN(this.opacity)?1:this.opacity)*255)}`}function Cn(){const e=oe(this.opacity);return`${e===1?"rgb(":"rgba("}${yt(this.r)}, ${yt(this.g)}, ${yt(this.b)}${e===1?")":`, ${e})`}`}function oe(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function yt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function wt(e){return e=yt(e),(e<16?"0":"")+e.toString(16)}function Mn(e,t,n,i){return i<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new K(e,t,n,i)}function An(e){if(e instanceof K)return new K(e.h,e.s,e.l,e.opacity);if(e instanceof Ht||(e=mt(e)),!e)return new K;if(e instanceof K)return e;e=e.rgb();var t=e.r/255,n=e.g/255,i=e.b/255,s=Math.min(t,n,i),r=Math.max(t,n,i),o=NaN,a=r-s,l=(r+s)/2;return a?(t===r?o=(n-i)/a+(n<i)*6:n===r?o=(i-t)/a+2:o=(t-n)/a+4,a/=l<.5?r+s:2-r-s,o*=60):a=l>0&&l<1?0:o,new K(o,a,l,e.opacity)}function kr(e,t,n,i){return arguments.length===1?An(e):new K(e,t,n,i??1)}function K(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}Le(K,kr,_n(Ht,{brighter(e){return e=e==null?se:Math.pow(se,e),new K(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Rt:Math.pow(Rt,e),new K(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*t,s=2*n-i;return new I(De(e>=240?e-240:e+120,s,i),De(e,s,i),De(e<120?e+240:e-120,s,i),this.opacity)},clamp(){return new K(Pn(this.h),ae(this.s),ae(this.l),oe(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=oe(this.opacity);return`${e===1?"hsl(":"hsla("}${Pn(this.h)}, ${ae(this.s)*100}%, ${ae(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Pn(e){return e=(e||0)%360,e<0?e+360:e}function ae(e){return Math.max(0,Math.min(1,e||0))}function De(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const Oe=e=>()=>e;function Nr(e,t){return function(n){return e+n*t}}function Cr(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(i){return Math.pow(e+i*t,n)}}function Mr(e){return(e=+e)==1?Hn:function(t,n){return n-t?Cr(t,n,e):Oe(isNaN(t)?n:t)}}function Hn(e,t){var n=t-e;return n?Nr(e,n):Oe(isNaN(e)?t:e)}const le=(function e(t){var n=Mr(t);function i(s,r){var o=n((s=Te(s)).r,(r=Te(r)).r),a=n(s.g,r.g),l=n(s.b,r.b),c=Hn(s.opacity,r.opacity);return function(h){return s.r=o(h),s.g=a(h),s.b=l(h),s.opacity=c(h),s+""}}return i.gamma=e,i})(1);function Ar(e,t){t||(t=[]);var n=e?Math.min(t.length,e.length):0,i=t.slice(),s;return function(r){for(s=0;s<n;++s)i[s]=e[s]*(1-r)+t[s]*r;return i}}function Pr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Hr(e,t){var n=t?t.length:0,i=e?Math.min(n,e.length):0,s=new Array(i),r=new Array(n),o;for(o=0;o<i;++o)s[o]=Tt(e[o],t[o]);for(;o<n;++o)r[o]=t[o];return function(a){for(o=0;o<i;++o)r[o]=s[o](a);return r}}function Rr(e,t){var n=new Date;return e=+e,t=+t,function(i){return n.setTime(e*(1-i)+t*i),n}}function st(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function Lr(e,t){var n={},i={},s;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(s in t)s in e?n[s]=Tt(e[s],t[s]):i[s]=t[s];return function(r){for(s in n)i[s]=n[s](r);return i}}var Be=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Fe=new RegExp(Be.source,"g");function Tr(e){return function(){return e}}function Dr(e){return function(t){return e(t)+""}}function Rn(e,t){var n=Be.lastIndex=Fe.lastIndex=0,i,s,r,o=-1,a=[],l=[];for(e=e+"",t=t+"";(i=Be.exec(e))&&(s=Fe.exec(t));)(r=s.index)>n&&(r=t.slice(n,r),a[o]?a[o]+=r:a[++o]=r),(i=i[0])===(s=s[0])?a[o]?a[o]+=s:a[++o]=s:(a[++o]=null,l.push({i:o,x:st(i,s)})),n=Fe.lastIndex;return n<t.length&&(r=t.slice(n),a[o]?a[o]+=r:a[++o]=r),a.length<2?l[0]?Dr(l[0].x):Tr(t):(t=l.length,function(c){for(var h=0,d;h<t;++h)a[(d=l[h]).i]=d.x(c);return a.join("")})}function Tt(e,t){var n=typeof t,i;return t==null||n==="boolean"?Oe(t):(n==="number"?st:n==="string"?(i=mt(t))?(t=i,le):Rn:t instanceof mt?le:t instanceof Date?Rr:Pr(t)?Ar:Array.isArray(t)?Hr:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Lr:st)(e,t)}var Ln=180/Math.PI,Ie={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Tn(e,t,n,i,s,r){var o,a,l;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(l=e*n+t*i)&&(n-=e*l,i-=t*l),(a=Math.sqrt(n*n+i*i))&&(n/=a,i/=a,l/=a),e*i<t*n&&(e=-e,t=-t,l=-l,o=-o),{translateX:s,translateY:r,rotate:Math.atan2(t,e)*Ln,skewX:Math.atan(l)*Ln,scaleX:o,scaleY:a}}var he;function Or(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Ie:Tn(t.a,t.b,t.c,t.d,t.e,t.f)}function Br(e){return e==null||(he||(he=document.createElementNS("http://www.w3.org/2000/svg","g")),he.setAttribute("transform",e),!(e=he.transform.baseVal.consolidate()))?Ie:(e=e.matrix,Tn(e.a,e.b,e.c,e.d,e.e,e.f))}function Dn(e,t,n,i){function s(c){return c.length?c.pop()+" ":""}function r(c,h,d,p,g,y){if(c!==d||h!==p){var $=g.push("translate(",null,t,null,n);y.push({i:$-4,x:st(c,d)},{i:$-2,x:st(h,p)})}else(d||p)&&g.push("translate("+d+t+p+n)}function o(c,h,d,p){c!==h?(c-h>180?h+=360:h-c>180&&(c+=360),p.push({i:d.push(s(d)+"rotate(",null,i)-2,x:st(c,h)})):h&&d.push(s(d)+"rotate("+h+i)}function a(c,h,d,p){c!==h?p.push({i:d.push(s(d)+"skewX(",null,i)-2,x:st(c,h)}):h&&d.push(s(d)+"skewX("+h+i)}function l(c,h,d,p,g,y){if(c!==d||h!==p){var $=g.push(s(g)+"scale(",null,",",null,")");y.push({i:$-4,x:st(c,d)},{i:$-2,x:st(h,p)})}else(d!==1||p!==1)&&g.push(s(g)+"scale("+d+","+p+")")}return function(c,h){var d=[],p=[];return c=e(c),h=e(h),r(c.translateX,c.translateY,h.translateX,h.translateY,d,p),o(c.rotate,h.rotate,d,p),a(c.skewX,h.skewX,d,p),l(c.scaleX,c.scaleY,h.scaleX,h.scaleY,d,p),c=h=null,function(g){for(var y=-1,$=p.length,k;++y<$;)d[(k=p[y]).i]=k.x(g);return d.join("")}}}var Fr=Dn(Or,"px, ","px)","deg)"),Ir=Dn(Br,", ",")",")"),Ur=1e-12;function On(e){return((e=Math.exp(e))+1/e)/2}function Xr(e){return((e=Math.exp(e))-1/e)/2}function Yr(e){return((e=Math.exp(2*e))-1)/(e+1)}const ce=(function e(t,n,i){function s(r,o){var a=r[0],l=r[1],c=r[2],h=o[0],d=o[1],p=o[2],g=h-a,y=d-l,$=g*g+y*y,k,b;if($<Ur)b=Math.log(p/c)/t,k=function(B){return[a+B*g,l+B*y,c*Math.exp(t*B*b)]};else{var C=Math.sqrt($),P=(p*p-c*c+i*$)/(2*c*n*C),D=(p*p-c*c-i*$)/(2*p*n*C),Z=Math.log(Math.sqrt(P*P+1)-P),R=Math.log(Math.sqrt(D*D+1)-D);b=(R-Z)/t,k=function(B){var tt=B*b,et=On(Z),gt=c/(n*C)*(et*Yr(t*tt+Z)-Xr(Z));return[a+gt*g,l+gt*y,c*et/On(t*tt+Z)]}}return k.duration=b*1e3*t/Math.SQRT2,k}return s.rho=function(r){var o=Math.max(.001,+r),a=o*o,l=a*a;return e(o,a,l)},s})(Math.SQRT2,2,4);var kt=0,Dt=0,Ot=0,Bn=1e3,de,Bt,ue=0,vt=0,fe=0,Ft=typeof performance=="object"&&performance.now?performance:Date,Fn=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Ue(){return vt||(Fn(Zr),vt=Ft.now()+fe)}function Zr(){vt=0}function pe(){this._call=this._time=this._next=null}pe.prototype=In.prototype={constructor:pe,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?Ue():+n)+(t==null?0:+t),!this._next&&Bt!==this&&(Bt?Bt._next=this:de=this,Bt=this),this._call=e,this._time=n,Xe()},stop:function(){this._call&&(this._call=null,this._time=1/0,Xe())}};function In(e,t,n){var i=new pe;return i.restart(e,t,n),i}function qr(){Ue(),++kt;for(var e=de,t;e;)(t=vt-e._time)>=0&&e._call.call(void 0,t),e=e._next;--kt}function Un(){vt=(ue=Ft.now())+fe,kt=Dt=0;try{qr()}finally{kt=0,Vr(),vt=0}}function Wr(){var e=Ft.now(),t=e-ue;t>Bn&&(fe-=t,ue=e)}function Vr(){for(var e,t=de,n,i=1/0;t;)t._call?(i>t._time&&(i=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:de=n);Bt=e,Xe(i)}function Xe(e){if(!kt){Dt&&(Dt=clearTimeout(Dt));var t=e-vt;t>24?(e<1/0&&(Dt=setTimeout(Un,e-Ft.now()-fe)),Ot&&(Ot=clearInterval(Ot))):(Ot||(ue=Ft.now(),Ot=setInterval(Wr,Bn)),kt=1,Fn(Un))}}function Xn(e,t,n){var i=new pe;return t=t==null?0:+t,i.restart(s=>{i.stop(),e(s+t)},t,n),i}var Gr=Ce("start","end","cancel","interrupt"),jr=[],Yn=0,Zn=1,Ye=2,ge=3,qn=4,Ze=5,me=6;function ye(e,t,n,i,s,r){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;Kr(e,n,{name:t,index:i,group:s,on:Gr,tween:jr,time:r.time,delay:r.delay,duration:r.duration,ease:r.ease,timer:null,state:Yn})}function qe(e,t){var n=Q(e,t);if(n.state>Yn)throw new Error("too late; already scheduled");return n}function rt(e,t){var n=Q(e,t);if(n.state>ge)throw new Error("too late; already running");return n}function Q(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function Kr(e,t,n){var i=e.__transition,s;i[t]=n,n.timer=In(r,0,n.time);function r(c){n.state=Zn,n.timer.restart(o,n.delay,n.time),n.delay<=c&&o(c-n.delay)}function o(c){var h,d,p,g;if(n.state!==Zn)return l();for(h in i)if(g=i[h],g.name===n.name){if(g.state===ge)return Xn(o);g.state===qn?(g.state=me,g.timer.stop(),g.on.call("interrupt",e,e.__data__,g.index,g.group),delete i[h]):+h<t&&(g.state=me,g.timer.stop(),g.on.call("cancel",e,e.__data__,g.index,g.group),delete i[h])}if(Xn(function(){n.state===ge&&(n.state=qn,n.timer.restart(a,n.delay,n.time),a(c))}),n.state=Ye,n.on.call("start",e,e.__data__,n.index,n.group),n.state===Ye){for(n.state=ge,s=new Array(p=n.tween.length),h=0,d=-1;h<p;++h)(g=n.tween[h].value.call(e,e.__data__,n.index,n.group))&&(s[++d]=g);s.length=d+1}}function a(c){for(var h=c<n.duration?n.ease.call(null,c/n.duration):(n.timer.restart(l),n.state=Ze,1),d=-1,p=s.length;++d<p;)s[d].call(e,h);n.state===Ze&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=me,n.timer.stop(),delete i[t];for(var c in i)return;delete e.__transition}}function we(e,t){var n=e.__transition,i,s,r=!0,o;if(n){t=t==null?null:t+"";for(o in n){if((i=n[o]).name!==t){r=!1;continue}s=i.state>Ye&&i.state<Ze,i.state=me,i.timer.stop(),i.on.call(s?"interrupt":"cancel",e,e.__data__,i.index,i.group),delete n[o]}r&&delete e.__transition}}function Qr(e){return this.each(function(){we(this,e)})}function Jr(e,t){var n,i;return function(){var s=rt(this,e),r=s.tween;if(r!==n){i=n=r;for(var o=0,a=i.length;o<a;++o)if(i[o].name===t){i=i.slice(),i.splice(o,1);break}}s.tween=i}}function to(e,t,n){var i,s;if(typeof n!="function")throw new Error;return function(){var r=rt(this,e),o=r.tween;if(o!==i){s=(i=o).slice();for(var a={name:t,value:n},l=0,c=s.length;l<c;++l)if(s[l].name===t){s[l]=a;break}l===c&&s.push(a)}r.tween=s}}function eo(e,t){var n=this._id;if(e+="",arguments.length<2){for(var i=Q(this.node(),n).tween,s=0,r=i.length,o;s<r;++s)if((o=i[s]).name===e)return o.value;return null}return this.each((t==null?Jr:to)(n,e,t))}function We(e,t,n){var i=e._id;return e.each(function(){var s=rt(this,i);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return Q(s,i).value[t]}}function Wn(e,t){var n;return(typeof t=="number"?st:t instanceof mt?le:(n=mt(t))?(t=n,le):Rn)(e,t)}function no(e){return function(){this.removeAttribute(e)}}function io(e){return function(){this.removeAttributeNS(e.space,e.local)}}function so(e,t,n){var i,s=n+"",r;return function(){var o=this.getAttribute(e);return o===s?null:o===i?r:r=t(i=o,n)}}function ro(e,t,n){var i,s=n+"",r;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===i?r:r=t(i=o,n)}}function oo(e,t,n){var i,s,r;return function(){var o,a=n(this),l;return a==null?void this.removeAttribute(e):(o=this.getAttribute(e),l=a+"",o===l?null:o===i&&l===s?r:(s=l,r=t(i=o,a)))}}function ao(e,t,n){var i,s,r;return function(){var o,a=n(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),l=a+"",o===l?null:o===i&&l===s?r:(s=l,r=t(i=o,a)))}}function lo(e,t){var n=ne(e),i=n==="transform"?Ir:Wn;return this.attrTween(e,typeof t=="function"?(n.local?ao:oo)(n,i,We(this,"attr."+e,t)):t==null?(n.local?io:no)(n):(n.local?ro:so)(n,i,t))}function ho(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function co(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function uo(e,t){var n,i;function s(){var r=t.apply(this,arguments);return r!==i&&(n=(i=r)&&co(e,r)),n}return s._value=t,s}function fo(e,t){var n,i;function s(){var r=t.apply(this,arguments);return r!==i&&(n=(i=r)&&ho(e,r)),n}return s._value=t,s}function po(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var i=ne(e);return this.tween(n,(i.local?uo:fo)(i,t))}function go(e,t){return function(){qe(this,e).delay=+t.apply(this,arguments)}}function mo(e,t){return t=+t,function(){qe(this,e).delay=t}}function yo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?go:mo)(t,e)):Q(this.node(),t).delay}function wo(e,t){return function(){rt(this,e).duration=+t.apply(this,arguments)}}function vo(e,t){return t=+t,function(){rt(this,e).duration=t}}function bo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?wo:vo)(t,e)):Q(this.node(),t).duration}function xo(e,t){if(typeof t!="function")throw new Error;return function(){rt(this,e).ease=t}}function $o(e){var t=this._id;return arguments.length?this.each(xo(t,e)):Q(this.node(),t).ease}function _o(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;rt(this,e).ease=n}}function zo(e){if(typeof e!="function")throw new Error;return this.each(_o(this._id,e))}function So(e){typeof e!="function"&&(e=fn(e));for(var t=this._groups,n=t.length,i=new Array(n),s=0;s<n;++s)for(var r=t[s],o=r.length,a=i[s]=[],l,c=0;c<o;++c)(l=r[c])&&e.call(l,l.__data__,c,r)&&a.push(l);return new lt(i,this._parents,this._name,this._id)}function Eo(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,i=t.length,s=n.length,r=Math.min(i,s),o=new Array(i),a=0;a<r;++a)for(var l=t[a],c=n[a],h=l.length,d=o[a]=new Array(h),p,g=0;g<h;++g)(p=l[g]||c[g])&&(d[g]=p);for(;a<i;++a)o[a]=t[a];return new lt(o,this._parents,this._name,this._id)}function ko(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function No(e,t,n){var i,s,r=ko(t)?qe:rt;return function(){var o=r(this,e),a=o.on;a!==i&&(s=(i=a).copy()).on(t,n),o.on=s}}function Co(e,t){var n=this._id;return arguments.length<2?Q(this.node(),n).on.on(e):this.each(No(n,e,t))}function Mo(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Ao(){return this.on("end.remove",Mo(this._id))}function Po(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Ae(e));for(var i=this._groups,s=i.length,r=new Array(s),o=0;o<s;++o)for(var a=i[o],l=a.length,c=r[o]=new Array(l),h,d,p=0;p<l;++p)(h=a[p])&&(d=e.call(h,h.__data__,p,a))&&("__data__"in h&&(d.__data__=h.__data__),c[p]=d,ye(c[p],t,n,p,c,Q(h,n)));return new lt(r,this._parents,t,n)}function Ho(e){var t=this._name,n=this._id;typeof e!="function"&&(e=un(e));for(var i=this._groups,s=i.length,r=[],o=[],a=0;a<s;++a)for(var l=i[a],c=l.length,h,d=0;d<c;++d)if(h=l[d]){for(var p=e.call(h,h.__data__,d,l),g,y=Q(h,n),$=0,k=p.length;$<k;++$)(g=p[$])&&ye(g,t,n,$,p,y);r.push(p),o.push(h)}return new lt(r,o,t,n)}var Ro=Pt.prototype.constructor;function Lo(){return new Ro(this._groups,this._parents)}function To(e,t){var n,i,s;return function(){var r=St(this,e),o=(this.style.removeProperty(e),St(this,e));return r===o?null:r===n&&o===i?s:s=t(n=r,i=o)}}function Vn(e){return function(){this.style.removeProperty(e)}}function Do(e,t,n){var i,s=n+"",r;return function(){var o=St(this,e);return o===s?null:o===i?r:r=t(i=o,n)}}function Oo(e,t,n){var i,s,r;return function(){var o=St(this,e),a=n(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),St(this,e))),o===l?null:o===i&&l===s?r:(s=l,r=t(i=o,a))}}function Bo(e,t){var n,i,s,r="style."+t,o="end."+r,a;return function(){var l=rt(this,e),c=l.on,h=l.value[r]==null?a||(a=Vn(t)):void 0;(c!==n||s!==h)&&(i=(n=c).copy()).on(o,s=h),l.on=i}}function Fo(e,t,n){var i=(e+="")=="transform"?Fr:Wn;return t==null?this.styleTween(e,To(e,i)).on("end.style."+e,Vn(e)):typeof t=="function"?this.styleTween(e,Oo(e,i,We(this,"style."+e,t))).each(Bo(this._id,e)):this.styleTween(e,Do(e,i,t),n).on("end.style."+e,null)}function Io(e,t,n){return function(i){this.style.setProperty(e,t.call(this,i),n)}}function Uo(e,t,n){var i,s;function r(){var o=t.apply(this,arguments);return o!==s&&(i=(s=o)&&Io(e,o,n)),i}return r._value=t,r}function Xo(e,t,n){var i="style."+(e+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,Uo(e,t,n??""))}function Yo(e){return function(){this.textContent=e}}function Zo(e){return function(){var t=e(this);this.textContent=t??""}}function qo(e){return this.tween("text",typeof e=="function"?Zo(We(this,"text",e)):Yo(e==null?"":e+""))}function Wo(e){return function(t){this.textContent=e.call(this,t)}}function Vo(e){var t,n;function i(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&Wo(s)),t}return i._value=e,i}function Go(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,Vo(e))}function jo(){for(var e=this._name,t=this._id,n=Gn(),i=this._groups,s=i.length,r=0;r<s;++r)for(var o=i[r],a=o.length,l,c=0;c<a;++c)if(l=o[c]){var h=Q(l,t);ye(l,e,n,c,o,{time:h.time+h.delay+h.duration,delay:0,duration:h.duration,ease:h.ease})}return new lt(i,this._parents,e,n)}function Ko(){var e,t,n=this,i=n._id,s=n.size();return new Promise(function(r,o){var a={value:o},l={value:function(){--s===0&&r()}};n.each(function(){var c=rt(this,i),h=c.on;h!==e&&(t=(e=h).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),c.on=t}),s===0&&r()})}var Qo=0;function lt(e,t,n,i){this._groups=e,this._parents=t,this._name=n,this._id=i}function Gn(){return++Qo}var ht=Pt.prototype;lt.prototype={constructor:lt,select:Po,selectAll:Ho,selectChild:ht.selectChild,selectChildren:ht.selectChildren,filter:So,merge:Eo,selection:Lo,transition:jo,call:ht.call,nodes:ht.nodes,node:ht.node,size:ht.size,empty:ht.empty,each:ht.each,on:Co,attr:lo,attrTween:po,style:Fo,styleTween:Xo,text:qo,textTween:Go,remove:Ao,tween:eo,delay:yo,duration:bo,ease:$o,easeVarying:zo,end:Ko,[Symbol.iterator]:ht[Symbol.iterator]};function Jo(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var ta={time:null,delay:0,duration:250,ease:Jo};function ea(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function na(e){var t,n;e instanceof lt?(t=e._id,e=e._name):(t=Gn(),(n=ta).time=Ue(),e=e==null?null:e+"");for(var i=this._groups,s=i.length,r=0;r<s;++r)for(var o=i[r],a=o.length,l,c=0;c<a;++c)(l=o[c])&&ye(l,e,t,c,o,n||ea(l,t));return new lt(i,this._parents,e,t)}Pt.prototype.interrupt=Qr,Pt.prototype.transition=na;const ve=e=>()=>e;function ia(e,{sourceEvent:t,target:n,transform:i,dispatch:s}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:i,enumerable:!0,configurable:!0},_:{value:s}})}function ct(e,t,n){this.k=e,this.x=t,this.y=n}ct.prototype={constructor:ct,scale:function(e){return e===1?this:new ct(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new ct(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var be=new ct(1,0,0);jn.prototype=ct.prototype;function jn(e){for(;!e.__zoom;)if(!(e=e.parentNode))return be;return e.__zoom}function Ve(e){e.stopImmediatePropagation()}function It(e){e.preventDefault(),e.stopImmediatePropagation()}function sa(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function ra(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function Kn(){return this.__zoom||be}function oa(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function aa(){return navigator.maxTouchPoints||"ontouchstart"in this}function la(e,t,n){var i=e.invertX(t[0][0])-n[0][0],s=e.invertX(t[1][0])-n[1][0],r=e.invertY(t[0][1])-n[0][1],o=e.invertY(t[1][1])-n[1][1];return e.translate(s>i?(i+s)/2:Math.min(0,i)||Math.max(0,s),o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o))}function ha(){var e=sa,t=ra,n=la,i=oa,s=aa,r=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],a=250,l=ce,c=Ce("start","zoom","end"),h,d,p,g=500,y=150,$=0,k=10;function b(f){f.property("__zoom",Kn).on("wheel.zoom",tt,{passive:!1}).on("mousedown.zoom",et).on("dblclick.zoom",gt).filter(s).on("touchstart.zoom",Jt).on("touchmove.zoom",z).on("touchend.zoom touchcancel.zoom",M).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}b.transform=function(f,w,m,x){var _=f.selection?f.selection():f;_.property("__zoom",Kn),f!==_?Z(f,w,m,x):_.interrupt().each(function(){R(this,arguments).event(x).start().zoom(null,typeof w=="function"?w.apply(this,arguments):w).end()})},b.scaleBy=function(f,w,m,x){b.scaleTo(f,function(){var _=this.__zoom.k,S=typeof w=="function"?w.apply(this,arguments):w;return _*S},m,x)},b.scaleTo=function(f,w,m,x){b.transform(f,function(){var _=t.apply(this,arguments),S=this.__zoom,E=m==null?D(_):typeof m=="function"?m.apply(this,arguments):m,A=S.invert(E),H=typeof w=="function"?w.apply(this,arguments):w;return n(P(C(S,H),E,A),_,o)},m,x)},b.translateBy=function(f,w,m,x){b.transform(f,function(){return n(this.__zoom.translate(typeof w=="function"?w.apply(this,arguments):w,typeof m=="function"?m.apply(this,arguments):m),t.apply(this,arguments),o)},null,x)},b.translateTo=function(f,w,m,x,_){b.transform(f,function(){var S=t.apply(this,arguments),E=this.__zoom,A=x==null?D(S):typeof x=="function"?x.apply(this,arguments):x;return n(be.translate(A[0],A[1]).scale(E.k).translate(typeof w=="function"?-w.apply(this,arguments):-w,typeof m=="function"?-m.apply(this,arguments):-m),S,o)},x,_)};function C(f,w){return w=Math.max(r[0],Math.min(r[1],w)),w===f.k?f:new ct(w,f.x,f.y)}function P(f,w,m){var x=w[0]-m[0]*f.k,_=w[1]-m[1]*f.k;return x===f.x&&_===f.y?f:new ct(f.k,x,_)}function D(f){return[(+f[0][0]+ +f[1][0])/2,(+f[0][1]+ +f[1][1])/2]}function Z(f,w,m,x){f.on("start.zoom",function(){R(this,arguments).event(x).start()}).on("interrupt.zoom end.zoom",function(){R(this,arguments).event(x).end()}).tween("zoom",function(){var _=this,S=arguments,E=R(_,S).event(x),A=t.apply(_,S),H=m==null?D(A):typeof m=="function"?m.apply(_,S):m,W=Math.max(A[1][0]-A[0][0],A[1][1]-A[0][1]),L=_.__zoom,V=typeof w=="function"?w.apply(_,S):w,nt=l(L.invert(H).concat(W/L.k),V.invert(H).concat(W/V.k));return function(G){if(G===1)G=V;else{var at=nt(G),te=W/at[2];G=new ct(te,H[0]-at[0]*te,H[1]-at[1]*te)}E.zoom(null,G)}})}function R(f,w,m){return!m&&f.__zooming||new B(f,w)}function B(f,w){this.that=f,this.args=w,this.active=0,this.sourceEvent=null,this.extent=t.apply(f,w),this.taps=0}B.prototype={event:function(f){return f&&(this.sourceEvent=f),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(f,w){return this.mouse&&f!=="mouse"&&(this.mouse[1]=w.invert(this.mouse[0])),this.touch0&&f!=="touch"&&(this.touch0[1]=w.invert(this.touch0[0])),this.touch1&&f!=="touch"&&(this.touch1[1]=w.invert(this.touch1[0])),this.that.__zoom=w,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(f){var w=ut(this.that).datum();c.call(f,this.that,new ia(f,{sourceEvent:this.sourceEvent,target:b,transform:this.that.__zoom,dispatch:c}),w)}};function tt(f,...w){if(!e.apply(this,arguments))return;var m=R(this,w).event(f),x=this.__zoom,_=Math.max(r[0],Math.min(r[1],x.k*Math.pow(2,i.apply(this,arguments)))),S=ft(f);if(m.wheel)(m.mouse[0][0]!==S[0]||m.mouse[0][1]!==S[1])&&(m.mouse[1]=x.invert(m.mouse[0]=S)),clearTimeout(m.wheel);else{if(x.k===_)return;m.mouse=[S,x.invert(S)],we(this),m.start()}It(f),m.wheel=setTimeout(E,y),m.zoom("mouse",n(P(C(x,_),m.mouse[0],m.mouse[1]),m.extent,o));function E(){m.wheel=null,m.end()}}function et(f,...w){if(p||!e.apply(this,arguments))return;var m=f.currentTarget,x=R(this,w,!0).event(f),_=ut(f.view).on("mousemove.zoom",H,!0).on("mouseup.zoom",W,!0),S=ft(f,m),E=f.clientX,A=f.clientY;pr(f.view),Ve(f),x.mouse=[S,this.__zoom.invert(S)],we(this),x.start();function H(L){if(It(L),!x.moved){var V=L.clientX-E,nt=L.clientY-A;x.moved=V*V+nt*nt>$}x.event(L).zoom("mouse",n(P(x.that.__zoom,x.mouse[0]=ft(L,m),x.mouse[1]),x.extent,o))}function W(L){_.on("mousemove.zoom mouseup.zoom",null),gr(L.view,x.moved),It(L),x.event(L).end()}}function gt(f,...w){if(e.apply(this,arguments)){var m=this.__zoom,x=ft(f.changedTouches?f.changedTouches[0]:f,this),_=m.invert(x),S=m.k*(f.shiftKey?.5:2),E=n(P(C(m,S),x,_),t.apply(this,w),o);It(f),a>0?ut(this).transition().duration(a).call(Z,E,x,f):ut(this).call(b.transform,E,x,f)}}function Jt(f,...w){if(e.apply(this,arguments)){var m=f.touches,x=m.length,_=R(this,w,f.changedTouches.length===x).event(f),S,E,A,H;for(Ve(f),E=0;E<x;++E)A=m[E],H=ft(A,this),H=[H,this.__zoom.invert(H),A.identifier],_.touch0?!_.touch1&&_.touch0[2]!==H[2]&&(_.touch1=H,_.taps=0):(_.touch0=H,S=!0,_.taps=1+!!h);h&&(h=clearTimeout(h)),S&&(_.taps<2&&(d=H[0],h=setTimeout(function(){h=null},g)),we(this),_.start())}}function z(f,...w){if(this.__zooming){var m=R(this,w).event(f),x=f.changedTouches,_=x.length,S,E,A,H;for(It(f),S=0;S<_;++S)E=x[S],A=ft(E,this),m.touch0&&m.touch0[2]===E.identifier?m.touch0[0]=A:m.touch1&&m.touch1[2]===E.identifier&&(m.touch1[0]=A);if(E=m.that.__zoom,m.touch1){var W=m.touch0[0],L=m.touch0[1],V=m.touch1[0],nt=m.touch1[1],G=(G=V[0]-W[0])*G+(G=V[1]-W[1])*G,at=(at=nt[0]-L[0])*at+(at=nt[1]-L[1])*at;E=C(E,Math.sqrt(G/at)),A=[(W[0]+V[0])/2,(W[1]+V[1])/2],H=[(L[0]+nt[0])/2,(L[1]+nt[1])/2]}else if(m.touch0)A=m.touch0[0],H=m.touch0[1];else return;m.zoom("touch",n(P(E,A,H),m.extent,o))}}function M(f,...w){if(this.__zooming){var m=R(this,w).event(f),x=f.changedTouches,_=x.length,S,E;for(Ve(f),p&&clearTimeout(p),p=setTimeout(function(){p=null},g),S=0;S<_;++S)E=x[S],m.touch0&&m.touch0[2]===E.identifier?delete m.touch0:m.touch1&&m.touch1[2]===E.identifier&&delete m.touch1;if(m.touch1&&!m.touch0&&(m.touch0=m.touch1,delete m.touch1),m.touch0)m.touch0[1]=this.__zoom.invert(m.touch0[0]);else if(m.end(),m.taps===2&&(E=ft(E,this),Math.hypot(d[0]-E[0],d[1]-E[1])<k)){var A=ut(this).on("dblclick.zoom");A&&A.apply(this,arguments)}}}return b.wheelDelta=function(f){return arguments.length?(i=typeof f=="function"?f:ve(+f),b):i},b.filter=function(f){return arguments.length?(e=typeof f=="function"?f:ve(!!f),b):e},b.touchable=function(f){return arguments.length?(s=typeof f=="function"?f:ve(!!f),b):s},b.extent=function(f){return arguments.length?(t=typeof f=="function"?f:ve([[+f[0][0],+f[0][1]],[+f[1][0],+f[1][1]]]),b):t},b.scaleExtent=function(f){return arguments.length?(r[0]=+f[0],r[1]=+f[1],b):[r[0],r[1]]},b.translateExtent=function(f){return arguments.length?(o[0][0]=+f[0][0],o[1][0]=+f[1][0],o[0][1]=+f[0][1],o[1][1]=+f[1][1],b):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},b.constrain=function(f){return arguments.length?(n=f,b):n},b.duration=function(f){return arguments.length?(a=+f,b):a},b.interpolate=function(f){return arguments.length?(l=f,b):l},b.on=function(){var f=c.on.apply(c,arguments);return f===c?b:f},b.clickDistance=function(f){return arguments.length?($=(f=+f)*f,b):Math.sqrt($)},b.tapDistance=function(f){return arguments.length?(k=+f,b):k},b}var Qn;(function(e){e.Strict="strict",e.Loose="loose"})(Qn||(Qn={}));var Ut;(function(e){e.Free="free",e.Vertical="vertical",e.Horizontal="horizontal"})(Ut||(Ut={}));var Jn;(function(e){e.Partial="partial",e.Full="full"})(Jn||(Jn={}));var ti;(function(e){e.Bezier="default",e.Straight="straight",e.Step="step",e.SmoothStep="smoothstep",e.SimpleBezier="simplebezier"})(ti||(ti={}));var ei;(function(e){e.Arrow="arrow",e.ArrowClosed="arrowclosed"})(ei||(ei={})),u.Position=void 0,(function(e){e.Left="left",e.Top="top",e.Right="right",e.Bottom="bottom"})(u.Position||(u.Position={})),u.Position.Left+"",u.Position.Right,u.Position.Right+"",u.Position.Left,u.Position.Top+"",u.Position.Bottom,u.Position.Bottom+"",u.Position.Top;const ca=(e,t=0,n=1)=>Math.min(Math.max(e,t),n),ni=e=>!isNaN(e)&&isFinite(e),ii=()=>typeof navigator<"u"&&navigator?.userAgent?.indexOf("Mac")>=0;function da({sourceX:e,sourceY:t,targetX:n,targetY:i,sourceControlX:s,sourceControlY:r,targetControlX:o,targetControlY:a}){const l=e*.125+s*.375+o*.375+n*.125,c=t*.125+r*.375+a*.375+i*.125,h=Math.abs(l-e),d=Math.abs(c-t);return[l,c,h,d]}function xe(e,t){return e>=0?.5*e:t*25*Math.sqrt(-e)}function si({pos:e,x1:t,y1:n,x2:i,y2:s,c:r}){switch(e){case u.Position.Left:return[t-xe(t-i,r),n];case u.Position.Right:return[t+xe(i-t,r),n];case u.Position.Top:return[t,n-xe(n-s,r)];case u.Position.Bottom:return[t,n+xe(s-n,r)]}}function ua({sourceX:e,sourceY:t,sourcePosition:n=u.Position.Bottom,targetX:i,targetY:s,targetPosition:r=u.Position.Top,curvature:o=.25}){const[a,l]=si({pos:n,x1:e,y1:t,x2:i,y2:s,c:o}),[c,h]=si({pos:r,x1:i,y1:s,x2:e,y2:t,c:o}),[d,p,g,y]=da({sourceX:e,sourceY:t,targetX:i,targetY:s,sourceControlX:a,sourceControlY:l,targetControlX:c,targetControlY:h});return[`M${e},${t} C${a},${l} ${c},${h} ${i},${s}`,d,p,g,y]}function ri({sourceX:e,sourceY:t,targetX:n,targetY:i}){const s=Math.abs(n-e)/2,r=n<e?n+s:n-s,o=Math.abs(i-t)/2,a=i<t?i+o:i-o;return[r,a,s,o]}function fa({sourceX:e,sourceY:t,targetX:n,targetY:i}){const[s,r,o,a]=ri({sourceX:e,sourceY:t,targetX:n,targetY:i});return[`M ${e},${t}L ${n},${i}`,s,r,o,a]}const oi={[u.Position.Left]:{x:-1,y:0},[u.Position.Right]:{x:1,y:0},[u.Position.Top]:{x:0,y:-1},[u.Position.Bottom]:{x:0,y:1}},pa=({source:e,sourcePosition:t=u.Position.Bottom,target:n})=>t===u.Position.Left||t===u.Position.Right?e.x<n.x?{x:1,y:0}:{x:-1,y:0}:e.y<n.y?{x:0,y:1}:{x:0,y:-1},ai=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function ga({source:e,sourcePosition:t=u.Position.Bottom,target:n,targetPosition:i=u.Position.Top,center:s,offset:r,stepPosition:o}){const a=oi[t],l=oi[i],c={x:e.x+a.x*r,y:e.y+a.y*r},h={x:n.x+l.x*r,y:n.y+l.y*r},d=pa({source:c,sourcePosition:t,target:h}),p=d.x!==0?"x":"y",g=d[p];let y=[],$,k;const b={x:0,y:0},C={x:0,y:0},[,,P,D]=ri({sourceX:e.x,sourceY:e.y,targetX:n.x,targetY:n.y});if(a[p]*l[p]===-1){p==="x"?($=s.x??c.x+(h.x-c.x)*o,k=s.y??(c.y+h.y)/2):($=s.x??(c.x+h.x)/2,k=s.y??c.y+(h.y-c.y)*o);const R=[{x:$,y:c.y},{x:$,y:h.y}],B=[{x:c.x,y:k},{x:h.x,y:k}];a[p]===g?y=p==="x"?R:B:y=p==="x"?B:R}else{const R=[{x:c.x,y:h.y}],B=[{x:h.x,y:c.y}];if(p==="x"?y=a.x===g?B:R:y=a.y===g?R:B,t===i){const z=Math.abs(e[p]-n[p]);if(z<=r){const M=Math.min(r-1,r-z);a[p]===g?b[p]=(c[p]>e[p]?-1:1)*M:C[p]=(h[p]>n[p]?-1:1)*M}}if(t!==i){const z=p==="x"?"y":"x",M=a[p]===l[z],f=c[z]>h[z],w=c[z]<h[z];(a[p]===1&&(!M&&f||M&&w)||a[p]!==1&&(!M&&w||M&&f))&&(y=p==="x"?R:B)}const tt={x:c.x+b.x,y:c.y+b.y},et={x:h.x+C.x,y:h.y+C.y},gt=Math.max(Math.abs(tt.x-y[0].x),Math.abs(et.x-y[0].x)),Jt=Math.max(Math.abs(tt.y-y[0].y),Math.abs(et.y-y[0].y));gt>=Jt?($=(tt.x+et.x)/2,k=y[0].y):($=y[0].x,k=(tt.y+et.y)/2)}return[[e,{x:c.x+b.x,y:c.y+b.y},...y,{x:h.x+C.x,y:h.y+C.y},n],$,k,P,D]}function ma(e,t,n,i){const s=Math.min(ai(e,t)/2,ai(t,n)/2,i),{x:r,y:o}=t;if(e.x===r&&r===n.x||e.y===o&&o===n.y)return`L${r} ${o}`;if(e.y===o){const c=e.x<n.x?-1:1,h=e.y<n.y?1:-1;return`L ${r+s*c},${o}Q ${r},${o} ${r},${o+s*h}`}const a=e.x<n.x?1:-1,l=e.y<n.y?-1:1;return`L ${r},${o+s*l}Q ${r},${o} ${r+s*a},${o}`}function ya({sourceX:e,sourceY:t,sourcePosition:n=u.Position.Bottom,targetX:i,targetY:s,targetPosition:r=u.Position.Top,borderRadius:o=5,centerX:a,centerY:l,offset:c=20,stepPosition:h=.5}){const[d,p,g,y,$]=ga({source:{x:e,y:t},sourcePosition:n,target:{x:i,y:s},targetPosition:r,center:{x:a,y:l},offset:c,stepPosition:h});return[d.reduce((b,C,P)=>{let D="";return P>0&&P<d.length-1?D=ma(d[P-1],C,d[P+1],o):D=`${P===0?"M":"L"}${C.x} ${C.y}`,b+=D,b},""),p,g,y,$]}const wa=(e,t)=>e.x!==t.x||e.y!==t.y||e.zoom!==t.k,$e=e=>({x:e.x,y:e.y,zoom:e.k}),Ge=({x:e,y:t,zoom:n})=>be.translate(e,t).scale(n),Nt=(e,t)=>e.target.closest(`.${t}`),li=(e,t)=>t===2&&Array.isArray(e)&&e.includes(2),va=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,je=(e,t=0,n=va,i=()=>{})=>{const s=typeof t=="number"&&t>0;return s||i(),s?e.transition().duration(t).ease(n).on("end",i):e},hi=e=>{const t=e.ctrlKey&&ii()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*t};function ba({zoomPanValues:e,noWheelClassName:t,d3Selection:n,d3Zoom:i,panOnScrollMode:s,panOnScrollSpeed:r,zoomOnPinch:o,onPanZoomStart:a,onPanZoom:l,onPanZoomEnd:c}){return h=>{if(Nt(h,t))return h.ctrlKey&&h.preventDefault(),!1;h.preventDefault(),h.stopImmediatePropagation();const d=n.property("__zoom").k||1;if(h.ctrlKey&&o){const k=ft(h),b=hi(h),C=d*Math.pow(2,b);i.scaleTo(n,C,k,h);return}const p=h.deltaMode===1?20:1;let g=s===Ut.Vertical?0:h.deltaX*p,y=s===Ut.Horizontal?0:h.deltaY*p;!ii()&&h.shiftKey&&s!==Ut.Vertical&&(g=h.deltaY*p,y=0),i.translateBy(n,-(g/d)*r,-(y/d)*r,{internal:!0});const $=$e(n.property("__zoom"));clearTimeout(e.panScrollTimeout),e.isPanScrolling||(e.isPanScrolling=!0),e.isPanScrolling&&(l?.(h,$),e.panScrollTimeout=setTimeout(()=>{e.isPanScrolling=!1},150))}}function xa({noWheelClassName:e,preventScrolling:t,d3ZoomHandler:n}){return function(i,s){const r=i.type==="wheel",o=!t&&r&&!i.ctrlKey,a=Nt(i,e);if(i.ctrlKey&&r&&a&&i.preventDefault(),o||a)return null;i.preventDefault(),n.call(this,i,s)}}function $a({zoomPanValues:e,onDraggingChange:t,onPanZoomStart:n}){return i=>{if(i.sourceEvent?.internal)return;const s=$e(i.transform);e.mouseButton=i.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=s,i.sourceEvent?.type==="mousedown"&&t(!0),n&&n?.(i.sourceEvent,s)}}function _a({zoomPanValues:e,panOnDrag:t,onPaneContextMenu:n,onTransformChange:i,onPanZoom:s}){return r=>{e.usedRightMouseButton=!!(n&&li(t,e.mouseButton??0)),r.sourceEvent?.sync||i([r.transform.x,r.transform.y,r.transform.k]),s&&!r.sourceEvent?.internal&&s?.(r.sourceEvent,$e(r.transform))}}function za({zoomPanValues:e,panOnDrag:t,panOnScroll:n,onDraggingChange:i,onPanZoomEnd:s,onPaneContextMenu:r}){return o=>{if(!o.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,r&&li(t,e.mouseButton??0)&&!e.usedRightMouseButton&&o.sourceEvent&&r(o.sourceEvent),e.usedRightMouseButton=!1,i(!1),s&&wa(e.prevViewport,o.transform))){const a=$e(o.transform);e.prevViewport=a,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{s?.(o.sourceEvent,a)},n?150:0)}}}function Sa({zoomActivationKeyPressed:e,zoomOnScroll:t,zoomOnPinch:n,panOnDrag:i,panOnScroll:s,zoomOnDoubleClick:r,userSelectionActive:o,noWheelClassName:a,noPanClassName:l,lib:c,connectionInProgress:h}){return d=>{const p=e||t,g=n&&d.ctrlKey,y=d.type==="wheel";if(d.button===1&&d.type==="mousedown"&&(Nt(d,`${c}-flow__node`)||Nt(d,`${c}-flow__edge`)))return!0;if(!i&&!p&&!s&&!r&&!n||o||h&&!y||Nt(d,a)&&y||Nt(d,l)&&(!y||s&&y&&!e)||!n&&d.ctrlKey&&y)return!1;if(!n&&d.type==="touchstart"&&d.touches?.length>1)return d.preventDefault(),!1;if(!p&&!s&&!g&&y||!i&&(d.type==="mousedown"||d.type==="touchstart")||Array.isArray(i)&&!i.includes(d.button)&&d.type==="mousedown")return!1;const $=Array.isArray(i)&&i.includes(d.button)||!d.button||d.button<=1;return(!d.ctrlKey||y)&&$}}function Ea({domNode:e,minZoom:t,maxZoom:n,paneClickDistance:i,translateExtent:s,viewport:r,onPanZoom:o,onPanZoomStart:a,onPanZoomEnd:l,onDraggingChange:c}){const h={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{x:0,y:0,zoom:0},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},d=e.getBoundingClientRect(),p=ha().clickDistance(!ni(i)||i<0?0:i).scaleExtent([t,n]).translateExtent(s),g=ut(e).call(p);P({x:r.x,y:r.y,zoom:ca(r.zoom,t,n)},[[0,0],[d.width,d.height]],s);const y=g.on("wheel.zoom"),$=g.on("dblclick.zoom");p.wheelDelta(hi);function k(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:ce).transform(je(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function b({noWheelClassName:z,noPanClassName:M,onPaneContextMenu:f,userSelectionActive:w,panOnScroll:m,panOnDrag:x,panOnScrollMode:_,panOnScrollSpeed:S,preventScrolling:E,zoomOnPinch:A,zoomOnScroll:H,zoomOnDoubleClick:W,zoomActivationKeyPressed:L,lib:V,onTransformChange:nt,connectionInProgress:G}){w&&!h.isZoomingOrPanning&&C();const te=m&&!L&&!w?ba({zoomPanValues:h,noWheelClassName:z,d3Selection:g,d3Zoom:p,panOnScrollMode:_,panOnScrollSpeed:S,zoomOnPinch:A,onPanZoomStart:a,onPanZoom:o,onPanZoomEnd:l}):xa({noWheelClassName:z,preventScrolling:E,d3ZoomHandler:y});if(g.on("wheel.zoom",te,{passive:!1}),!w){const Ll=$a({zoomPanValues:h,onDraggingChange:c,onPanZoomStart:a});p.on("start",Ll);const Tl=_a({zoomPanValues:h,panOnDrag:x,onPaneContextMenu:!!f,onPanZoom:o,onTransformChange:nt});p.on("zoom",Tl);const Dl=za({zoomPanValues:h,panOnDrag:x,panOnScroll:m,onPaneContextMenu:f,onPanZoomEnd:l,onDraggingChange:c});p.on("end",Dl)}const Rl=Sa({zoomActivationKeyPressed:L,panOnDrag:x,zoomOnScroll:H,panOnScroll:m,zoomOnDoubleClick:W,zoomOnPinch:A,userSelectionActive:w,noPanClassName:M,noWheelClassName:z,lib:V,connectionInProgress:G});p.filter(Rl),W?g.on("dblclick.zoom",$):g.on("dblclick.zoom",null)}function C(){p.on("zoom",null)}async function P(z,M,f){const w=Ge(z),m=p?.constrain()(w,M,f);return m&&await k(m),new Promise(x=>x(m))}async function D(z,M){const f=Ge(z);return await k(f,M),new Promise(w=>w(f))}function Z(z){if(g){const M=Ge(z),f=g.property("__zoom");(f.k!==z.zoom||f.x!==z.x||f.y!==z.y)&&p?.transform(g,M,null,{sync:!0})}}function R(){const z=g?jn(g.node()):{x:0,y:0,k:1};return{x:z.x,y:z.y,zoom:z.k}}function B(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:ce).scaleTo(je(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function tt(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:ce).scaleBy(je(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function et(z){p?.scaleExtent(z)}function gt(z){p?.translateExtent(z)}function Jt(z){const M=!ni(z)||z<0?0:z;p?.clickDistance(M)}return{update:b,destroy:C,setViewport:D,setViewportConstrained:P,getViewport:R,scaleTo:B,scaleBy:tt,setScaleExtent:et,setTranslateExtent:gt,syncViewport:Z,setClickDistance:Jt}}var ci;(function(e){e.Line="line",e.Handle="handle"})(ci||(ci={}));class di{constructor(t={}){this.container=null,this.state={nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},this.subscribers=new Set,this.panZoomInstance=null,this.pendingNodes=[],this.options={minZoom:.5,maxZoom:2,defaultZoom:1,nodesDraggable:!0,nodesConnectable:!0,elementsSelectable:!0,...t},this.state.nodes=t.nodes||[],this.state.edges=t.edges||[],this.updateLookups()}mount(t){this.container=t,this.panZoomInstance=Ea({domNode:t,minZoom:this.options.minZoom||.5,maxZoom:this.options.maxZoom||2,paneClickDistance:0,translateExtent:[[-1/0,-1/0],[1/0,1/0]],viewport:this.state.viewport,onDraggingChange:n=>{this.container?.classList.toggle("panning",n)},onPanZoom:(n,i)=>{this.state.viewport=i,this.notifySubscribers()},onPanZoomStart:(n,i)=>{},onPanZoomEnd:(n,i)=>{}}),this.panZoomInstance.update({noWheelClassName:"nowheel",noPanClassName:"nopan",onPaneContextMenu:void 0,preventScrolling:!0,panOnScroll:!0,panOnDrag:!0,panOnScrollMode:"free",panOnScrollSpeed:.8,userSelectionActive:!1,zoomOnPinch:!0,zoomOnScroll:!0,zoomOnDoubleClick:!0,zoomActivationKeyPressed:!1,lib:"lit-flow",onTransformChange:n=>{},connectionInProgress:!1}),this.notifySubscribers()}destroy(){this.panZoomInstance?.destroy(),this.panZoomInstance=null,this.container=null,this.subscribers.clear()}getState(){return this.state}get nodes(){return this.state.nodes}get edges(){return this.state.edges}getViewport(){return this.state.viewport}setViewport(t){this.state.viewport=t,this.panZoomInstance?.setViewport?.(t),this.notifySubscribers()}setNodes(t){this.pendingNodes.push(...t.map(n=>n.id)),this.state.nodes=t,this.updateLookups(),this.notifySubscribers()}setEdges(t){this.retryEdgeRendering(t)}updateNode(t,n){this.state.nodes=this.state.nodes.map(i=>i.id===t?{...i,...n}:i),this.updateLookups(),this.notifySubscribers()}updateEdge(t,n){this.state.edges=this.state.edges.map(i=>i.id===t?{...i,...n}:i),this.updateLookups(),this.notifySubscribers()}addNode(t){this.state.nodes=[...this.state.nodes,t],this.updateLookups(),this.notifySubscribers()}removeNode(t){this.state.nodes=this.state.nodes.filter(n=>n.id!==t),this.state.edges=this.state.edges.filter(n=>n.source!==t&&n.target!==t),this.updateLookups(),this.notifySubscribers()}addEdge(t){this.state.edges=[...this.state.edges,t],this.updateLookups(),this.notifySubscribers()}removeEdge(t){this.state.edges=this.state.edges.filter(n=>n.id!==t),this.updateLookups(),this.notifySubscribers()}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}zoomIn(){const t=this.state.viewport.zoom,n=Math.min(t*1.2,this.options.maxZoom||2);this.setViewport({...this.state.viewport,zoom:n})}zoomOut(){const t=this.state.viewport.zoom,n=Math.max(t/1.2,this.options.minZoom||.5);this.setViewport({...this.state.viewport,zoom:n})}fitView(){if(this.state.nodes.length===0||!this.container)return;let t=1/0,n=1/0,i=-1/0,s=-1/0;this.state.nodes.forEach(y=>{const $=y.measured?.width||y.width||150,k=y.measured?.height||y.height||50;t=Math.min(t,y.position.x),n=Math.min(n,y.position.y),i=Math.max(i,y.position.x+$),s=Math.max(s,y.position.y+k)});const r={x:t,y:n,width:i-t,height:s-n},o=this.container.clientWidth,a=this.container.clientHeight,l=50,c=(o-l*2)/r.width,h=(a-l*2)/r.height,d=Math.min(c,h,this.options.maxZoom||2),p=(o-r.width*d)/2-r.x*d,g=(a-r.height*d)/2-r.y*d;this.setViewport({x:p,y:g,zoom:d})}updateLookups(){this.state.nodeLookup.clear(),this.state.nodes.forEach(t=>{const n={...t,measured:t.measured||{width:t.width,height:t.height},internals:{positionAbsolute:t.position,z:t.zIndex||0,userNode:t}};this.state.nodeLookup.set(t.id,n)}),this.state.edgeLookup.clear(),this.state.edges.forEach(t=>{this.state.edgeLookup.set(t.id,t)})}isNodeRendered(t){if(!this.container)return!1;const n=this.container.querySelector(`[id="${CSS.escape(t)}"]`);if(!n)return!1;const i=n.getBoundingClientRect();return i.width>0&&i.height>0}hasPendingNodes(t){return t.some(n=>this.pendingNodes.includes(n)||!this.isNodeRendered(n))}markNodeAsRendered(t){const n=this.pendingNodes.indexOf(t);n>-1&&this.pendingNodes.splice(n,1)}retryEdgeRendering(t,n=0,i=10){const s=t.flatMap(o=>[o.source,o.target]),r=[...new Set(s)];this.hasPendingNodes(r)&&n<i?setTimeout(()=>{this.retryEdgeRendering(t,n+1,i)},100):(this.state.edges=t,this.updateLookups(),this.notifySubscribers(),r.forEach(o=>this.markNodeAsRendered(o)))}notifySubscribers(){this.subscribers.forEach(t=>t(this.state))}}function ka(e={}){const t={nodes:e.nodes||[],edges:e.edges||[],viewport:e.viewport||{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},n=new Set,i=()=>{t.nodeLookup.clear(),t.nodes.forEach(s=>{const r={...s,measured:s.measured||{width:s.width,height:s.height},internals:{positionAbsolute:s.position,z:s.zIndex||0,userNode:s}};t.nodeLookup.set(s.id,r)}),t.edgeLookup.clear(),t.edges.forEach(s=>{t.edgeLookup.set(s.id,s)})};return i(),{getState:()=>t,setState:s=>{Object.assign(t,s),i(),n.forEach(r=>r(t))},subscribe:s=>(n.add(s),()=>n.delete(s))}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=globalThis,Ke=_e.ShadowRoot&&(_e.ShadyCSS===void 0||_e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qe=Symbol(),ui=new WeakMap;let fi=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Qe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Ke&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=ui.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ui.set(n,t))}return t}toString(){return this.cssText}};const Na=e=>new fi(typeof e=="string"?e:e+"",void 0,Qe),F=(e,...t)=>{const n=e.length===1?e[0]:t.reduce(((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1]),e[0]);return new fi(n,e,Qe)},Ca=(e,t)=>{if(Ke)e.adoptedStyleSheets=t.map((n=>n instanceof CSSStyleSheet?n:n.styleSheet));else for(const n of t){const i=document.createElement("style"),s=_e.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},pi=Ke?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Na(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ma,defineProperty:Aa,getOwnPropertyDescriptor:Pa,getOwnPropertyNames:Ha,getOwnPropertySymbols:Ra,getPrototypeOf:La}=Object,ze=globalThis,gi=ze.trustedTypes,Ta=gi?gi.emptyScript:"",Da=ze.reactiveElementPolyfillSupport,Xt=(e,t)=>e,Se={toAttribute(e,t){switch(t){case Boolean:e=e?Ta:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Je=(e,t)=>!Ma(e,t),mi={attribute:!0,type:String,converter:Se,reflect:!1,useDefault:!1,hasChanged:Je};Symbol.metadata??=Symbol("metadata"),ze.litPropertyMetadata??=new WeakMap;let Ct=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=mi){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Aa(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:r}=Pa(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:s,set(o){const a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??mi}static _$Ei(){if(this.hasOwnProperty(Xt("elementProperties")))return;const t=La(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Xt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Xt("properties"))){const n=this.properties,i=[...Ha(n),...Ra(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(pi(s))}else t!==void 0&&n.push(pi(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ca(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:Se).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Se;this._$Em=s;const a=o.fromAttribute(n,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,n,i){if(t!==void 0){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??Je)(r,n)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(n)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach((n=>n.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};Ct.elementStyles=[],Ct.shadowRootOptions={mode:"open"},Ct[Xt("elementProperties")]=new Map,Ct[Xt("finalized")]=new Map,Da?.({ReactiveElement:Ct}),(ze.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tn=globalThis,Ee=tn.trustedTypes,yi=Ee?Ee.createPolicy("lit-html",{createHTML:e=>e}):void 0,wi="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,vi="?"+pt,Oa=`<${vi}>`,bt=document,Yt=()=>bt.createComment(""),Zt=e=>e===null||typeof e!="object"&&typeof e!="function",en=Array.isArray,Ba=e=>en(e)||typeof e?.[Symbol.iterator]=="function",nn=`[ 	
\f\r]`,qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bi=/-->/g,xi=/>/g,xt=RegExp(`>|${nn}(?:([^\\s"'>=/]+)(${nn}*=${nn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$i=/'/g,_i=/"/g,zi=/^(?:script|style|textarea|title)$/i,Si=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),N=Si(1),j=Si(2),$t=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),Ei=new WeakMap,_t=bt.createTreeWalker(bt,129);function ki(e,t){if(!en(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return yi!==void 0?yi.createHTML(t):t}const Fa=(e,t)=>{const n=e.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=qt;for(let a=0;a<n;a++){const l=e[a];let c,h,d=-1,p=0;for(;p<l.length&&(o.lastIndex=p,h=o.exec(l),h!==null);)p=o.lastIndex,o===qt?h[1]==="!--"?o=bi:h[1]!==void 0?o=xi:h[2]!==void 0?(zi.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=xt):h[3]!==void 0&&(o=xt):o===xt?h[0]===">"?(o=s??qt,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?xt:h[3]==='"'?_i:$i):o===_i||o===$i?o=xt:o===bi||o===xi?o=qt:(o=xt,s=void 0);const g=o===xt&&e[a+1].startsWith("/>")?" ":"";r+=o===qt?l+Oa:d>=0?(i.push(c),l.slice(0,d)+wi+l.slice(d)+pt+g):l+pt+(d===-2?a:g)}return[ki(e,r+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Wt{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[c,h]=Fa(t,n);if(this.el=Wt.createElement(c,i),_t.currentNode=this.el.content,n===2||n===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=_t.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(wi)){const p=h[o++],g=s.getAttribute(d).split(pt),y=/([.?@])?(.*)/.exec(p);l.push({type:1,index:r,name:y[2],strings:g,ctor:y[1]==="."?Ua:y[1]==="?"?Xa:y[1]==="@"?Ya:ke}),s.removeAttribute(d)}else d.startsWith(pt)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(zi.test(s.tagName)){const d=s.textContent.split(pt),p=d.length-1;if(p>0){s.textContent=Ee?Ee.emptyScript:"";for(let g=0;g<p;g++)s.append(d[g],Yt()),_t.nextNode(),l.push({type:2,index:++r});s.append(d[p],Yt())}}}else if(s.nodeType===8)if(s.data===vi)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(pt,d+1))!==-1;)l.push({type:7,index:r}),d+=pt.length-1}r++}}static createElement(t,n){const i=bt.createElement("template");return i.innerHTML=t,i}}function Mt(e,t,n=e,i){if(t===$t)return t;let s=i!==void 0?n._$Co?.[i]:n._$Cl;const r=Zt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=s:n._$Cl=s),s!==void 0&&(t=Mt(e,s._$AS(e,t.values),s,i)),t}class Ia{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=(t?.creationScope??bt).importNode(n,!0);_t.currentNode=s;let r=_t.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Vt(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Za(r,this,t)),this._$AV.push(c),l=i[++a]}o!==l?.index&&(r=_t.nextNode(),o++)}return _t.currentNode=bt,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}class Vt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Mt(this,t,n),Zt(t)?t===T||t==null||t===""?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==$t&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ba(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==T&&Zt(this._$AH)?this._$AA.nextSibling.data=t:this.T(bt.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Wt.createElement(ki(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(n);else{const r=new Ia(s,this),o=r.u(this.options);r.p(n),this.T(o),this._$AH=r}}_$AC(t){let n=Ei.get(t.strings);return n===void 0&&Ei.set(t.strings,n=new Wt(t)),n}k(t){en(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const r of t)s===n.length?n.push(i=new Vt(this.O(Yt()),this.O(Yt()),this,this.options)):i=n[s],i._$AI(r),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ke{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,r){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=T}_$AI(t,n=this,i,s){const r=this.strings;let o=!1;if(r===void 0)t=Mt(this,t,n,0),o=!Zt(t)||t!==this._$AH&&t!==$t,o&&(this._$AH=t);else{const a=t;let l,c;for(t=r[0],l=0;l<r.length-1;l++)c=Mt(this,a[i+l],n,l),c===$t&&(c=this._$AH[l]),o||=!Zt(c)||c!==this._$AH[l],c===T?t=T:t!==T&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ua extends ke{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}class Xa extends ke{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}}class Ya extends ke{constructor(t,n,i,s,r){super(t,n,i,s,r),this.type=5}_$AI(t,n=this){if((t=Mt(this,t,n,0)??T)===$t)return;const i=this._$AH,s=t===T&&i!==T||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==T&&(i===T||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Za{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Mt(this,t)}}const qa=tn.litHtmlPolyfillSupport;qa?.(Wt,Vt),(tn.litHtmlVersions??=[]).push("3.3.1");const Wa=(e,t,n)=>{const i=n?.renderBefore??t;let s=i._$litPart$;if(s===void 0){const r=n?.renderBefore??null;i._$litPart$=s=new Vt(t.insertBefore(Yt(),r),r,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const sn=globalThis;let O=class extends Ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Wa(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}};O._$litElement$=!0,O.finalized=!0,sn.litElementHydrateSupport?.({LitElement:O});const Va=sn.litElementPolyfillSupport;Va?.({LitElement:O}),(sn.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ni=Symbol.for(""),Ga=e=>{if(e?.r===Ni)return e?._$litStatic$},ja=e=>({_$litStatic$:e,r:Ni}),Ci=new Map,Ka=e=>(t,...n)=>{const i=n.length;let s,r;const o=[],a=[];let l,c=0,h=!1;for(;c<i;){for(l=t[c];c<i&&(r=n[c],(s=Ga(r))!==void 0);)l+=s+t[++c],h=!0;c!==i&&a.push(r),o.push(l),c++}if(c===i&&o.push(t[i]),h){const d=o.join("$$lit$$");(t=Ci.get(d))===void 0&&(o.raw=o,Ci.set(d,t=o)),n=a}return e(t,...n)},J=Ka(N);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=e=>(t,n)=>{n!==void 0?n.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qa={attribute:!0,type:String,converter:Se,reflect:!1,hasChanged:Je},Ja=(e=Qa,t,n)=>{const{kind:i,metadata:s}=n;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(n.name,e),i==="accessor"){const{name:o}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,e)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(i==="setter"){const{name:o}=n;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,e)}}throw Error("Unsupported decorator location: "+i)};function v(e){return(t,n)=>typeof n=="object"?Ja(e,t,n):((i,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tl={ATTRIBUTE:1},el=e=>(...t)=>({_$litDirective$:e,values:t});let nl=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mi="important",il=" !"+Mi,sl=el(class extends nl{constructor(e){if(super(e),e.type!==tl.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,n)=>{const i=e[n];return i==null?t:t+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`}),"")}update(e,[t]){const{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?n.removeProperty(i):n[i]=null);for(const i in t){const s=t[i];if(s!=null){this.ft.add(i);const r=typeof s=="string"&&s.endsWith(il);i.includes("-")||r?n.setProperty(i,r?s.slice(0,-11):s,r?Mi:""):n[i]=s}}return $t}});function rl(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function ol(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function Ne(e){return ua(e)}function rn(e){return ya(e)}function Ai(e){return fa(e)}function al(e,t){return e.x>=t.x&&e.x<=t.x+t.width&&e.y>=t.y&&e.y<=t.y+t.height}var ll=Object.defineProperty,hl=Object.getOwnPropertyDescriptor,Gt=(e,t,n,i)=>{for(var s=i>1?void 0:i?hl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&ll(t,n,s),s};u.FlowCanvas=class extends O{constructor(){super(),this.nodes=[],this.edges=[],this.viewport={x:0,y:0,zoom:1},this.nodeTypes={default:"flow-node",shape:"shape-node","erd-table":"erd-table-node"},this.connection=null,this.onHandleStart=t=>{const{nodeId:n,type:i,handleId:s}=t.detail;this.connection={from:{nodeId:n,handleId:s}}},this.onMouseMove=t=>{if(!this.connection)return;const n=this.screenToCanvas(t.clientX,t.clientY);this.connection.preview=n,this.requestUpdate()},this.onMouseUp=t=>{if(!this.connection)return;const n=t.composedPath();let i=null,s;for(const o of n)if(o instanceof HTMLElement){const a=o.tagName.toLowerCase();if(a==="flow-node"||Object.values(this.nodeTypes).some(l=>l===a)){i=o;break}o.dataset.handleId&&(s=o.dataset.handleId)}const r=i?.getAttribute("id")||void 0;if(this.connection.from&&r&&r!==this.connection.from.nodeId){const o=`e-${this.connection.from.nodeId}-${r}-${Date.now()}`,a=this.connection.from.nodeId,l=this.connection.from.handleId;let c=s;if(!c){const h=this.nodes.find(d=>d.id===r);h&&h.type==="shape"&&(c=this.determineBestTargetHandle(a,r),console.log("Auto-determined target handle:",{sourceNodeId:a,targetId:r,finalTargetHandleId:c}))}this.instance.addEdge({id:o,source:a,target:r,sourceHandle:l,targetHandle:c,data:{}})}this.connection=null,this.requestUpdate()},this.onNodeSelect=t=>{const{nodeId:n,selected:i,node:s}=t.detail;this.instance.updateNode(n,{selected:i}),this.dispatchEvent(new CustomEvent("node-selected",{detail:{nodeId:n,selected:i,node:s,allSelectedNodes:this.nodes.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.onEdgeSelect=t=>{const{edgeId:n,selected:i,edge:s}=t.detail;this.instance.updateEdge(n,{selected:i}),this.dispatchEvent(new CustomEvent("edge-selected",{detail:{edgeId:n,selected:i,edge:s,allSelectedEdges:this.edges.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.instance=new di({nodes:this.nodes,edges:this.edges})}createRenderRoot(){return super.createRenderRoot()}getNodeGeom(t){const n=this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`),i=this.renderRoot.querySelector(".flow-viewport");if(!n||!i)return null;const s=n.getBoundingClientRect(),r=i.getBoundingClientRect(),o=this.viewport.zoom||1,a=(s.left-r.left-this.viewport.x)/o,l=(s.top-r.top-this.viewport.y)/o,c=s.width/o,h=s.height/o,d=l+h/2;return{left:{x:a,y:d},right:{x:a+c,y:d}}}getHandleCanvasPosition(t,n){const i=this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);if(!i)return null;let s=null;const r=i.shadowRoot;if(r&&(s=r.querySelector(`[data-handle-id="${CSS.escape(n)}"]`)),s||(s=i.querySelector(`[data-handle-id="${CSS.escape(n)}"]`)),!s)return null;const o=this.nodes.find(p=>p.id===t);if(!o)return null;if(o.type==="shape")return console.log("getHandleCanvasPosition for shape node:",{nodeId:t,handleId:n,node:o}),this.getShapeHandlePosition(o,n);const a=i.getBoundingClientRect(),l=s.getBoundingClientRect(),c=this.viewport.zoom||1,h=(l.left+l.width/2-a.left)/c,d=(l.top+l.height/2-a.top)/c;return{x:o.position.x+h,y:o.position.y+d}}getShapeHandlePosition(t,n){const i=t.data;if(!i)return null;const s=i.size||{width:200,height:200},r=s.width,o=s.height,a=n.split("-"),l=a[a.length-1];console.log("getShapeHandlePosition:",{handleId:n,parts:a,handleType:l,node:t.id,size:s});let c=0,h=0;switch(l){case"right":c=r,h=o/2;break;case"left":c=0,h=o/2;break;case"top":c=r/2,h=0;break;case"bottom":c=r/2,h=o;break;default:c=r/2,h=o/2}const d={x:t.position.x+c,y:t.position.y+h};return console.log("getShapeHandlePosition result:",{nodeId:t.id,position:t.position,offsetX:c,offsetY:h,result:d}),d}setNodes(t){this.instance.setNodes(t)}setEdges(t){this.instance.setEdges(t)}determineBestTargetHandle(t,n){const i=this.nodes.find(C=>C.id===t),s=this.nodes.find(C=>C.id===n);if(!i||!s)return`${n}-target-left`;const r=i.position.x,o=i.position.y,a=s.position.x,l=s.position.y,c=s.data,h=c?.size?.width||200,d=c?.size?.height||200,p=r+(i.width||150)/2,g=o+(i.height||50)/2,y=a+h/2,$=l+d/2,k=y-p,b=$-g;return Math.abs(k)>Math.abs(b)?k>0?`${n}-target-left`:`${n}-target-right`:b>0?`${n}-target-top`:`${n}-target-bottom`}computeLabelCanvasPosition(t){const n=this.nodes.find(h=>h.id===t.source),i=this.nodes.find(h=>h.id===t.target);if(!n||!i)return null;let s,r,o,a;if(t.sourceHandle){const h=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(h)s=h.x,r=h.y;else{const d=n.measured?.width||n.width||150,p=n.measured?.height||n.height||50;s=n.position.x+d,r=n.position.y+p/2}}else{const h=n.measured?.width||n.width||150,d=n.measured?.height||n.height||50;s=n.position.x+h,r=n.position.y+d/2}if(t.targetHandle){const h=this.getHandleCanvasPosition(t.target,t.targetHandle);if(h)o=h.x,a=h.y;else{o=i.position.x;const d=i.measured?.height||i.height||50;a=i.position.y+d/2}}else{o=i.position.x;const h=i.measured?.height||i.height||50;a=i.position.y+h/2}const[,l,c]=Ne({sourceX:s,sourceY:r,sourcePosition:u.Position.Right,targetX:o,targetY:a,targetPosition:u.Position.Left});return{x:l,y:c}}computeStartLabelCanvasPosition(t){const n=this.nodes.find(r=>r.id===t.source);if(!n)return null;let i,s;if(t.sourceHandle){const r=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(r)i=r.x,s=r.y;else{const o=n.measured?.width||n.width||150,a=n.measured?.height||n.height||50;i=n.position.x+o,s=n.position.y+a/2}}else{const r=n.measured?.width||n.width||150,o=n.measured?.height||n.height||50;i=n.position.x+r,s=n.position.y+o/2}return{x:i+12,y:s-10}}computeEndLabelCanvasPosition(t){const n=this.nodes.find(r=>r.id===t.target);if(!n)return null;let i,s;if(t.targetHandle){const r=this.getHandleCanvasPosition(t.target,t.targetHandle);if(r)i=r.x,s=r.y;else{const o=n.measured?.height||n.height||50;i=n.position.x,s=n.position.y+o/2}}else{const r=n.measured?.height||n.height||50;i=n.position.x,s=n.position.y+r/2}return{x:i-12,y:s-10}}firstUpdated(){const t=this.renderRoot.querySelector(".flow-container");t&&(this.instance.mount(t),this.unsubscribe=this.instance.subscribe(n=>{this.nodes=n.nodes,this.edges=n.edges,this.viewport=n.viewport,this.requestUpdate()}),t.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("node-select",this.onNodeSelect),document.addEventListener("edge-select",this.onEdgeSelect))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.instance.destroy();const t=this.renderRoot.querySelector(".flow-container");t?.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),t?.removeEventListener("node-select",this.onNodeSelect),document.removeEventListener("edge-select",this.onEdgeSelect)}renderNode(t){const n=t.type||"default",i=this.nodeTypes[n]||"flow-node",s=ja(i);return J`
      <${s}
        .id=${t.id}
        .data=${t.data}
        .position=${t.position}
        .selected=${t.selected||!1}
        .draggable=${t.draggable!==!1}
        .connectable=${t.connectable!==!1}
        .resizable=${t.resizable||!1}
        .instance=${this.instance}
        @handle-start=${this.onHandleStart}
      ></${s}>
    `}render(){const t=`translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;return J`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${sl({transform:t})}
        >
          <div class="flow-edges-layer">
            ${this.edges.map(n=>{const i=this.nodes.find(r=>r.id===n.source),s=this.nodes.find(r=>r.id===n.target);return!i||!s?null:J`
                <flow-edge 
                  .id=${n.id}
                  .source=${n.source}
                  .target=${n.target}
                  .sourceHandle=${n.sourceHandle}
                  .targetHandle=${n.targetHandle}
                  .sourceNode=${i}
                  .targetNode=${s}
                  .animated=${n.animated||!1}
                  .label=${n.label||""}
                  .type=${n.type||"default"}
                  .markerStart=${n.markerStart}
                  .markerEnd=${n.markerEnd}
                ></flow-edge>
              `})}
            ${this.renderPreviewEdge()}
          </div>
          <div class="flow-nodes-layer">
            ${this.nodes.map(n=>this.renderNode(n))}
          </div>
          <div class="flow-labels-overlay">
            ${this.edges.map(n=>{const i=n.data&&n.data.labelHtml,s=n.data&&n.data.label;if(!(!!i||!!s))return null;const o=this.computeLabelCanvasPosition(n);if(!o)return null;const a=`transform: translate(-50%, -50%) translate(${o.x}px, ${o.y}px);`;return i?J`<div class="edge-label" style="${a}" .innerHTML=${i}></div>`:J`<div class="edge-label" style="${a}">${s}</div>`})}
            ${this.edges.map(n=>{const i=n.data&&n.data.startLabelHtml,s=n.data&&n.data.startLabel;if(!i&&!s)return null;const r=this.computeStartLabelCanvasPosition(n);if(!r)return null;const o=`transform: translate(-50%, -50%) translate(${r.x}px, ${r.y}px);`;return i?J`<div class="edge-label" style="${o}" .innerHTML=${i}></div>`:J`<div class="edge-label" style="${o}">${s}</div>`})}
            ${this.edges.map(n=>{const i=n.data&&n.data.endLabelHtml,s=n.data&&n.data.endLabel;if(!i&&!s)return null;const r=this.computeEndLabelCanvasPosition(n);if(!r)return null;const o=`transform: translate(-50%, -50%) translate(${r.x}px, ${r.y}px);`;return i?J`<div class="edge-label" style="${o}" .innerHTML=${i}></div>`:J`<div class="edge-label" style="${o}">${s}</div>`})}
          </div>
        </div>
        <slot></slot>
      </div>
    `}screenToCanvas(t,n){const i=this.renderRoot.querySelector(".flow-container");if(!i)return{x:t,y:n};const s=i.getBoundingClientRect(),r=this.viewport.x,o=this.viewport.y,a=this.viewport.zoom||1;return{x:(t-s.left-r)/a,y:(n-s.top-o)/a}}renderPreviewEdge(){if(!this.connection||!this.connection.preview)return null;const t=this.connection.preview,n=this.connection.from?this.nodes.find(s=>s.id===this.connection.from.nodeId):null,i=this.connection.to?this.nodes.find(s=>s.id===this.connection.to.nodeId):null;return n?J`
        <flow-edge
          .id=${"preview"}
          .source=${n.id}
          .target=${"__preview__"}
          .sourceHandle=${this.connection.from?.handleId}
          .sourceNode=${{...n,position:n.position}}
          .targetNode=${{id:"__preview__",position:{x:t.x,y:t.y},width:1,height:1,data:{}}}
          .animated=${!0}
          .label=${""}
        ></flow-edge>
      `:i?J`
        <flow-edge
          .id=${"preview"}
          .source=${"__preview__"}
          .target=${i.id}
          .sourceNode=${{id:"__preview__",position:{x:t.x,y:t.y},width:1,height:1,data:{}}}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{...i,position:i.position}}
          .animated=${!0}
          .label=${""}
        ></flow-edge>
      `:null}},u.FlowCanvas.styles=F`
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
  `,Gt([v({type:Array})],u.FlowCanvas.prototype,"nodes",2),Gt([v({type:Array})],u.FlowCanvas.prototype,"edges",2),Gt([v({type:Object})],u.FlowCanvas.prototype,"viewport",2),Gt([v({type:Object})],u.FlowCanvas.prototype,"nodeTypes",2),u.FlowCanvas=Gt([U("flow-canvas")],u.FlowCanvas);var cl=Object.defineProperty,dl=Object.getOwnPropertyDescriptor,zt=(e,t,n,i)=>{for(var s=i>1?void 0:i?dl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&cl(t,n,s),s};u.NodeResizer=class extends O{constructor(){super(...arguments),this.visible=!1,this.minWidth=10,this.minHeight=10,this.maxWidth=Number.MAX_VALUE,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleMouseDown=t=>{const n=t.target;console.log("NodeResizer handleMouseDown:",n,n.classList);let i=n.classList.contains("resize-handle");if(!i&&n===this&&(i=t.composedPath().some(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))),console.log("Is resize handle:",i),!i)return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.isResizing=!0;const s=this.getRootNode().host;this.resizeStart={x:t.clientX,y:t.clientY,width:s?.offsetWidth||0,height:s?.offsetHeight||0};let r=null;if(n.classList.contains("resize-handle")?r=n:n===this&&(r=t.composedPath().find(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))||null),r){const o=Array.from(r.classList);this.resizeHandle=o.find(a=>a!=="resize-handle")||"",console.log("Resize handle direction:",this.resizeHandle)}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),console.log({width:this.resizeStart.width,height:this.resizeStart.height}),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleMouseMove=t=>{if(!this.isResizing)return;const n=this.getRootNode().host;if(!n)return;console.log("NodeResizer handleMouseMove:",t);const i=t.clientX-this.resizeStart.x,s=t.clientY-this.resizeStart.y;let r=this.resizeStart.width,o=this.resizeStart.height;switch(this.resizeHandle){case"nw":r=this.resizeStart.width-i,o=this.resizeStart.height-s;break;case"ne":r=this.resizeStart.width+i,o=this.resizeStart.height-s;break;case"sw":r=this.resizeStart.width-i,o=this.resizeStart.height+s;break;case"se":r=this.resizeStart.width+i,o=this.resizeStart.height+s;break;case"n":o=this.resizeStart.height-s;break;case"s":o=this.resizeStart.height+s;break;case"w":r=this.resizeStart.width-i;break;case"e":r=this.resizeStart.width+i;break}if(r=Math.max(this.minWidth,Math.min(this.maxWidth,r)),o=Math.max(this.minHeight,Math.min(this.maxHeight,o)),this.keepAspectRatio){const a=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?o=r/a:r=o*a}n.style.width=`${r}px`,n.style.height=`${o}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:r,height:o,handle:this.resizeHandle},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{if(!this.isResizing)return;this.isResizing=!1,this.cleanup();const t=this.getRootNode().host;this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:t?.offsetWidth||0,height:t?.offsetHeight||0},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return this.visible?N`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    `:N``}},u.NodeResizer.styles=F`
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
  `,zt([v({type:Boolean,reflect:!0})],u.NodeResizer.prototype,"visible",2),zt([v({type:Number})],u.NodeResizer.prototype,"minWidth",2),zt([v({type:Number})],u.NodeResizer.prototype,"minHeight",2),zt([v({type:Number})],u.NodeResizer.prototype,"maxWidth",2),zt([v({type:Number})],u.NodeResizer.prototype,"maxHeight",2),zt([v({type:Boolean})],u.NodeResizer.prototype,"keepAspectRatio",2),u.NodeResizer=zt([U("node-resizer")],u.NodeResizer);var ul=Object.defineProperty,fl=Object.getOwnPropertyDescriptor,dt=(e,t,n,i)=>{for(var s=i>1?void 0:i?fl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&ul(t,n,s),s};u.FlowNode=class extends O{constructor(){super(...arguments),this.id="",this.data={},this.position={x:0,y:0},this.selected=!1,this.dragging=!1,this.draggable=!0,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.lastMeasured=null,this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const n=!this.selected;this.instance.updateNode(this.id,{selected:n}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:n,node:{id:this.id,data:this.data,position:this.position,selected:n}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:n,height:i}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:n,height:i,measured:{width:n,height:i}})},this.handleResizeEnd=t=>{const{width:n,height:i}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:n,height:i,measured:{width:n,height:i}}),this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:n,height:i},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const n=t.target;n.classList.contains("resize-handle")||n.tagName==="NODE-RESIZER"||n.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const n=t.clientX-this.dragStart.x,i=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(n)>3||Math.abs(i)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+n/s.zoom,y:this.nodeStart.y+i/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1},50)}}firstUpdated(){this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd)),this.updateMeasuredSize()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return N`
      <div class="node-container">
        <div class="node-content">
          ${this.data?.label||"Node"}
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
      ${this.resizable?N`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="30"
          max-width="500"
          max-height="300"
        ></node-resizer>
      `:""}
    `}updated(t){super.updated(t),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,this.updateMeasuredSize(),t.has("resizable")&&console.log("FlowNode resizable changed:",this.resizable)}updateMeasuredSize(){if(!this.instance)return;const t=this.getBoundingClientRect(),n=this.instance.getViewport().zoom||1,i=t.width/n,s=t.height/n;(!this.lastMeasured||Math.abs(this.lastMeasured.width-i)>.5||Math.abs(this.lastMeasured.height-s)>.5)&&(this.lastMeasured={width:i,height:s},this.instance.updateNode(this.id,{measured:{width:i,height:s},width:i,height:s}))}onHandleMouseDown(t){return n=>{n.stopPropagation(),n.preventDefault(),this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:t},bubbles:!0,composed:!0}))}}},u.FlowNode.styles=F`
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
  `,dt([v({type:String,reflect:!0})],u.FlowNode.prototype,"id",2),dt([v({type:Object})],u.FlowNode.prototype,"data",2),dt([v({type:Object})],u.FlowNode.prototype,"position",2),dt([v({type:Boolean,reflect:!0})],u.FlowNode.prototype,"selected",2),dt([v({type:Boolean,reflect:!0})],u.FlowNode.prototype,"dragging",2),dt([v({type:Boolean})],u.FlowNode.prototype,"draggable",2),dt([v({type:Object})],u.FlowNode.prototype,"instance",2),dt([v({type:Boolean})],u.FlowNode.prototype,"resizable",2),u.FlowNode=dt([U("flow-node")],u.FlowNode);var pl=Object.defineProperty,gl=Object.getOwnPropertyDescriptor,X=(e,t,n,i)=>{for(var s=i>1?void 0:i?gl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&pl(t,n,s),s};u.FlowEdge=class extends O{constructor(){super(...arguments),this.id="",this.source="",this.target="",this.animated=!1,this.selected=!1,this.label="",this.type="default",this.markerHandleHalf=5}getMarkerId(t){if(!t)return;if(typeof t=="string")return t;const n=this.normalizeMarkerSpec(t);return`marker-${this.hashString(n)}`}createMarkerSVG(t,n){if(n.type==="custom"){const h=n.width??10,d=n.height??10,p=(n.refX??h)+this.markerHandleHalf,g=n.refY??d/2,y=n.color??"currentColor",$=n.orient??"auto";return`<marker id="${t}" markerWidth="${h}" markerHeight="${d}" refX="${p}" refY="${g}" orient="${$}" markerUnits="userSpaceOnUse"><path d="${n.path}" fill="${y}" stroke="${y}"/></marker>`}const i=n.width??10,s=n.height??10,r=n.orient??"auto",o=n.color??"currentColor",a=(n.type==="ArrowClosed",i+this.markerHandleHalf),l=s/2;if(n.type==="ArrowClosed"){const h=`M0,0 L${i},${l} L0,${s} Z`;return`<marker id="${t}" markerWidth="${i}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${h}" fill="${o}"/></marker>`}const c=`M0,0 L${i},${l} L0,${s}`;return`<marker id="${t}" markerWidth="${i}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${c}" fill="none" stroke="${o}" stroke-width="2"/></marker>`}normalizeMarkerSpec(t){if(t.type==="custom"){const{path:o,width:a=20,height:l=20,refX:c=20,refY:h=10,orient:d="auto",color:p="currentColor"}=t;return`custom|p=${o}|w=${a}|h=${l}|rx=${c}|ry=${h}|o=${d}|c=${p}`}const{width:n=20,height:i=20,orient:s="auto",color:r="currentColor"}=t;return`builtin|${t.type}|w=${n}|h=${i}|o=${s}|c=${r}`}hashString(t){let n=0;for(let i=0;i<t.length;i++)n=(n<<5)-n+t.charCodeAt(i),n|=0;return Math.abs(n).toString(36)}getPathForType(t,n){const i=t.x,s=t.y,r=n.x,o=n.y,a=t.position,l=n.position;switch(this.type){case"straight":return Ai({sourceX:i,sourceY:s,targetX:r,targetY:o});case"smoothstep":return rn({sourceX:i,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l});case"step":return rn({sourceX:i,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,borderRadius:0});case"simplebezier":return Ne({sourceX:i,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,curvature:.5});case"default":default:return Ne({sourceX:i,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l})}}getFlowCanvasRoot(){const t=this.getRootNode();return t instanceof ShadowRoot?t:null}getFlowCanvasHost(){const t=this.getFlowCanvasRoot();return t&&t.host||null}findHandleElement(t,n){const i=this.getFlowCanvasRoot();if(!i)return null;const s=i.querySelector(`[id="${CSS.escape(t)}"]`);if(!s)return null;const r=s.shadowRoot;let o=null;return r&&(o=r.querySelector(`[data-handle-id="${CSS.escape(n)}"]`)),o||(o=s.querySelector(`[data-handle-id="${CSS.escape(n)}"]`)),o}getHandlePosition(t,n){const i=this.findHandleElement(t,n);if(!i)return null;const s=this.getFlowCanvasRoot();if(!s)return null;const r=s.querySelector(`[id="${CSS.escape(t)}"]`);if(!r)return null;const o=r.getBoundingClientRect(),a=i.getBoundingClientRect(),l=this.sourceNode?.id===t?this.sourceNode:this.targetNode;if(!l)return null;l.measured?.width||l.width,l.measured?.height||l.height;const d=(this.getFlowCanvasHost()?.viewport||{zoom:1}).zoom||1,p=(a.left+a.width/2-o.left)/d,g=(a.top+a.height/2-o.top)/d;return{x:l.position.x+p,y:l.position.y+g}}getSourcePosition(){if(this.sourceHandle&&this.sourceNode){const i=this.getHandlePosition(this.sourceNode.id,this.sourceHandle);if(i)return{...i,position:u.Position.Right}}const t=this.sourceNode.measured?.width||this.sourceNode.width||150,n=this.sourceNode.measured?.height||this.sourceNode.height||50;return{x:this.sourceNode.position.x+t,y:this.sourceNode.position.y+n/2,position:u.Position.Right}}getTargetPosition(){if(this.targetHandle&&this.targetNode){const n=this.getHandlePosition(this.targetNode.id,this.targetHandle);if(n)return{...n,position:u.Position.Left}}const t=this.targetNode.measured?.height||this.targetNode.height||50;return{x:this.targetNode.position.x,y:this.targetNode.position.y+t/2,position:u.Position.Left}}render(){if(!this.sourceNode||!this.targetNode)return N``;const t=this.getSourcePosition(),n=this.getTargetPosition(),[i,s,r,o,a]=this.getPathForType(t,n),l=["edge-path",this.animated&&"animated",this.selected&&"selected"].filter(Boolean).join(" "),c=this.getMarkerId(this.markerStart),h=this.getMarkerId(this.markerEnd),d=c?`url(#${c})`:void 0,p=h?`url(#${h})`:void 0,g=this.animated?"5":"";return N`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${c&&typeof this.markerStart=="object"?j`<marker id="${c}" markerWidth="${this.markerStart.width||10}" markerHeight="${this.markerStart.height||10}" refX="${((this.markerStart.type==="custom"?this.markerStart.refX:void 0)||this.markerStart.width||10)+this.markerHandleHalf}" refY="${(this.markerStart.type==="custom"?this.markerStart.refY:void 0)||(this.markerStart.height||10)/2}" orient="${this.markerStart.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type==="custom"?j`<path d="${this.markerStart.path}" fill="${this.markerStart.color||"currentColor"}" stroke="${this.markerStart.color||"currentColor"}"/>`:this.markerStart.type==="ArrowClosed"?j`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10} Z" fill="${this.markerStart.color||"currentColor"}"/>`:j`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10}" fill="none" stroke="${this.markerStart.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
          ${h&&typeof this.markerEnd=="object"?j`<marker id="${h}" markerWidth="${this.markerEnd.width||10}" markerHeight="${this.markerEnd.height||10}" refX="${((this.markerEnd.type==="custom"?this.markerEnd.refX:void 0)||this.markerEnd.width||10)+this.markerHandleHalf}" refY="${(this.markerEnd.type==="custom"?this.markerEnd.refY:void 0)||(this.markerEnd.height||10)/2}" orient="${this.markerEnd.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type==="custom"?j`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color||"currentColor"}" stroke="${this.markerEnd.color||"currentColor"}"/>`:this.markerEnd.type==="ArrowClosed"?j`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10} Z" fill="${this.markerEnd.color||"currentColor"}"/>`:j`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10}" fill="none" stroke="${this.markerEnd.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
        </defs>
        ${j`
          <path 
            class="${l}"
            d="${i}"
            stroke-dasharray="${g}"
            marker-start="${d??""}"
            marker-end="${p??""}"
            @click=${this.handleClick}
          />
          ${this.label?j`
            <text 
              x="${s}" 
              y="${r}" 
              text-anchor="middle"
              dy="-5"
              fill="#333"
              style="user-select:none; pointer-events:none; font-size:12px;"
            >
              ${this.label}
            </text>
          `:""}
        `}
      </svg>
    `}handleClick(t){console.log("handleClick",t),t.stopPropagation();const n=!this.selected;this.selected=n,this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:this.id,selected:n,edge:{id:this.id,source:this.source,target:this.target,sourceHandle:this.sourceHandle,targetHandle:this.targetHandle,label:this.label,animated:this.animated,selected:n}},bubbles:!0,composed:!0}))}},u.FlowEdge.styles=F`
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
  `,X([v({type:String})],u.FlowEdge.prototype,"id",2),X([v({type:String})],u.FlowEdge.prototype,"source",2),X([v({type:String})],u.FlowEdge.prototype,"target",2),X([v({type:String})],u.FlowEdge.prototype,"sourceHandle",2),X([v({type:String})],u.FlowEdge.prototype,"targetHandle",2),X([v({type:Object})],u.FlowEdge.prototype,"sourceNode",2),X([v({type:Object})],u.FlowEdge.prototype,"targetNode",2),X([v({type:Boolean})],u.FlowEdge.prototype,"animated",2),X([v({type:Boolean})],u.FlowEdge.prototype,"selected",2),X([v({type:String})],u.FlowEdge.prototype,"label",2),X([v({type:String})],u.FlowEdge.prototype,"type",2),X([v({type:Object})],u.FlowEdge.prototype,"markerStart",2),X([v({type:Object})],u.FlowEdge.prototype,"markerEnd",2),u.FlowEdge=X([U("flow-edge")],u.FlowEdge);var ml=Object.defineProperty,yl=Object.getOwnPropertyDescriptor,jt=(e,t,n,i)=>{for(var s=i>1?void 0:i?yl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&ml(t,n,s),s};u.FlowBackground=class extends O{constructor(){super(...arguments),this.variant="dots",this.gap=20,this.color="#ddd",this.size=1}render(){const t=`flow-bg-pattern-${Math.random().toString(36).substr(2,9)}`;return N`
      <svg>
        <defs>
          ${this.variant==="dots"?this.renderDotsPattern(t):this.renderLinesPattern(t)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${t})" />
      </svg>
    `}renderDotsPattern(t){return j`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `}renderLinesPattern(t){return j`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `}},u.FlowBackground.styles=F`
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
  `,jt([v({type:String})],u.FlowBackground.prototype,"variant",2),jt([v({type:Number})],u.FlowBackground.prototype,"gap",2),jt([v({type:String})],u.FlowBackground.prototype,"color",2),jt([v({type:Number})],u.FlowBackground.prototype,"size",2),u.FlowBackground=jt([U("flow-background")],u.FlowBackground);var wl=Object.defineProperty,vl=Object.getOwnPropertyDescriptor,on=(e,t,n,i)=>{for(var s=i>1?void 0:i?vl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&wl(t,n,s),s};u.FlowMinimap=class extends O{constructor(){super(...arguments),this.width=200,this.height=150}render(){return N`
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `}},u.FlowMinimap.styles=F`
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
  `,on([v({type:Number})],u.FlowMinimap.prototype,"width",2),on([v({type:Number})],u.FlowMinimap.prototype,"height",2),u.FlowMinimap=on([U("flow-minimap")],u.FlowMinimap);var bl=Object.defineProperty,xl=Object.getOwnPropertyDescriptor,Pi=(e,t,n,i)=>{for(var s=i>1?void 0:i?xl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&bl(t,n,s),s};u.FlowControls=class extends O{constructor(){super(...arguments),this.handleZoomIn=()=>{this.instance?.zoomIn()},this.handleZoomOut=()=>{this.instance?.zoomOut()},this.handleFitView=()=>{this.instance?.fitView()}}render(){return N`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `}},u.FlowControls.styles=F`
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
  `,Pi([v({type:Object})],u.FlowControls.prototype,"instance",2),u.FlowControls=Pi([U("flow-controls")],u.FlowControls);var $l=Object.getOwnPropertyDescriptor,_l=Object.getPrototypeOf,zl=Reflect.get,Sl=(e,t,n,i)=>{for(var s=i>1?void 0:i?$l(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s},an=(e,t,n)=>zl(_l(e),n,t);u.ERDTableNode=class extends u.FlowNode{constructor(){super(...arguments),this.appliedInitialSize=!1}firstUpdated(){const t=this.data,n=t?.size?.width,i=t?.size?.height;(typeof n=="number"&&n>0||typeof i=="number"&&i>0)&&(typeof n=="number"&&n>0&&(this.style.width=`${n}px`),typeof i=="number"&&i>0&&(this.style.height=`${i}px`),this.instance&&this.instance.updateNode(this.id,{width:typeof n=="number"&&n>0?n:this.width,height:typeof i=="number"&&i>0?i:this.height}),this.appliedInitialSize=!0),super.firstUpdated()}updated(t){super.updated(t)}onFieldHandleMouseDown(t,n){return i=>{i.stopPropagation(),i.preventDefault();const s=`${this.id}-${t}-${n}`;this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:n==="left"?"target":"source",handleId:s,fieldName:t},bubbles:!0,composed:!0}))}}render(){const t=this.data,n=t?.tableName||"Table",i=t?.fields||[];return N`
      <div class="table-header" style="${t.color?`background: ${t.color}`:""}">
        <span class="table-icon">📊</span>
        <span>${n}</span>
      </div>
      
      <div class="table-body">
        ${i.map(s=>N`
          <div class="field-row" data-field="${s.name}">
            <div class="field-key">
              ${s.key||""}
            </div>
            <div class="field-name">${s.name}</div>
            <div class="field-type">${s.type}</div>
            <div class="field-nullable">
              ${s.nullable?"NULL":""}
            </div>
            
            <!-- Left handle (input) for this field -->
            <div 
              class="field-handle left"
              data-handle="target"
              data-field="${s.name}"
              data-handle-id="${this.id}-${s.name}-left"
              @mousedown=${this.onFieldHandleMouseDown(s.name,"left")}
            ></div>
            
            <!-- Right handle (output) for this field -->
            <div 
              class="field-handle right"
              data-handle="source"
              data-field="${s.name}"
              data-handle-id="${this.id}-${s.name}-right"
              @mousedown=${this.onFieldHandleMouseDown(s.name,"right")}
            ></div>
          </div>
        `)}
      </div>
      ${this.resizable?N`
        <node-resizer
          .visible=${this.selected}
          min-width="150"
          min-height="80"
          max-width="500"
          max-height="400"
        ></node-resizer>
      `:""}
    `}},u.ERDTableNode.styles=[...Array.isArray(an(u.ERDTableNode,u.ERDTableNode,"styles"))?an(u.ERDTableNode,u.ERDTableNode,"styles"):[an(u.ERDTableNode,u.ERDTableNode,"styles")],F`
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
    `],u.ERDTableNode=Sl([U("erd-table-node")],u.ERDTableNode);const El=[{type:"circle",name:"Circle",category:"basic",path:"M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"rectangle",name:"Rectangle",category:"basic",path:"M 5 5 L 195 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"diamond",name:"Diamond",category:"basic",path:"M 100 5 L 195 100 L 100 195 L 5 100 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"triangle",name:"Triangle",category:"basic",path:"M 100 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],kl=[{type:"hexagon",name:"Hexagon",category:"geometric",path:"M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"octagon",name:"Octagon",category:"geometric",path:"M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Nl=[{type:"heart",name:"Heart",category:"symbolic",path:"M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],ln=class ln{static initialize(){[...El,...kl,...Nl].forEach(n=>{this.shapes.set(n.type,n)})}static register(t){this.shapes.set(t.type,t)}static get(t){return this.shapes.get(t)}static getAll(){return Array.from(this.shapes.values())}static getByCategory(t){return Array.from(this.shapes.values()).filter(n=>n.category===t)}static has(t){return this.shapes.has(t)}static getShapeTypes(){return Array.from(this.shapes.keys())}static clear(){this.shapes.clear()}static getCount(){return this.shapes.size}};ln.shapes=new Map;let Kt=ln;Kt.initialize();var Cl=Object.defineProperty,Ml=Object.getOwnPropertyDescriptor,ot=(e,t,n,i)=>{for(var s=i>1?void 0:i?Ml(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&Cl(t,n,s),s};u.ShapeNode=class extends O{constructor(){super(...arguments),this.id="",this.selected=!1,this.dragging=!1,this.draggable=!0,this.connectable=!0,this.instance=null,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const n=!this.selected;this.instance.updateNode(this.id,{selected:n}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:n,node:{id:this.id,data:this.data,position:this.position,selected:n}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:n,height:i}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:n,height:i}};this.instance.updateNode(this.id,{data:s,width:n,height:i,measured:{width:n,height:i}})}},this.handleResizeEnd=t=>{const{width:n,height:i}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:n,height:i}};this.instance.updateNode(this.id,{data:s,width:n,height:i,measured:{width:n,height:i}})}this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:n,height:i},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const n=t.target;n.classList.contains("resize-handle")||n.tagName==="NODE-RESIZER"||n.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const n=t.clientX-this.dragStart.x,i=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(n)>3||Math.abs(i)>3)&&(this.isDragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+n/s.zoom,y:this.nodeStart.y+i/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{console.log("handleMouseUp"),this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isDragging=!1,this.cleanup()},this.handleHandleStart=t=>{console.log("handleHandleStart",t),t.stopPropagation(),this.isDragging=!1;const n=t.target,i=n.dataset.handleId,s=n.dataset.handleType;s&&i&&this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,handleId:i,handleType:s,position:this.position},bubbles:!0,composed:!0}))}}updated(t){super.updated(t),t.has("position")&&this.isDragging,t.has("resizable")&&console.log("ShapeNode resizable changed:",this.resizable)}getShapeDefinition(){if(this.data?.type)return Kt.get(this.data.type)}renderShape(){const t=this.getShapeDefinition();if(!t)return N`
        <div class="unknown-shape">
          Unknown shape: ${this.data?.type||"undefined"}
        </div>
      `;const n=this.data,i=n.size||t.defaultSize,s=n.backgroundColor||n.color||"#ffffff",r=n.strokeColor||"#000000",o=n.strokeWidth||2,a=n.rotation||0;return N`
      <svg 
        class="shape-svg"
        width="${i.width}" 
        height="${i.height}" 
        viewBox="${t.viewBox}"
        style="transform: rotate(${a}deg)"
      >
        <path 
          d="${t.path}" 
          fill="${s}"
          stroke="${r}"
          stroke-width="${o}"
        />
      </svg>
    `}renderGradients(){const t=this.data;if(t&&"gradient"in t&&t.gradient){const n=`gradient-${this.data.type}-${Math.random().toString(36).substr(2,9)}`,i=t.gradient;if(i.type==="linear")return N`
          <defs>
            <linearGradient id="${n}" x1="0%" y1="0%" x2="100%" y2="100%">
              ${i.colors.map((s,r)=>N`<stop offset="${r/(i.colors.length-1)*100}%" stop-color="${s}"/>`)}
            </linearGradient>
          </defs>
        `;if(i.type==="radial")return N`
          <defs>
            <radialGradient id="${n}" cx="50%" cy="50%" r="50%">
              ${i.colors.map((s,r)=>N`<stop offset="${r/(i.colors.length-1)*100}%" stop-color="${s}"/>`)}
            </radialGradient>
          </defs>
        `}return N``}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleClick),this.addEventListener("mousedown",this.handleMouseDown),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleClick),this.removeEventListener("mousedown",this.handleMouseDown),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){this.style.setProperty("--position-x",`${this.position.x}px`),this.style.setProperty("--position-y",`${this.position.y}px`);const t=this.getShapeDefinition(),i=this.data?.size||t?.defaultSize||{width:200,height:200};return this.style.setProperty("--shape-width",`${i.width}px`),this.style.setProperty("--shape-height",`${i.height}px`),N`
      <div class="shape-node ${this.selected?"selected":""}">
        ${this.renderGradients()}
        ${this.renderShape()}
        <div class="shape-content">
          <slot></slot>
        </div>
        ${this.connectable?this.renderHandles():""}
        ${this.renderLabel()}
      </div>
      ${this.resizable?N`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="50"
          max-width="500"
          max-height="500"
        ></node-resizer>
      `:""}
    `}renderHandles(){const t=this.id;return N`
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
    `}renderLabel(){const t=this.data;if(!t)return"";const n=t.label||t.type;return N`
      <div class="shape-label">
        ${n}
      </div>
    `}},u.ShapeNode.styles=F`
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
  `,ot([v({type:String,reflect:!0})],u.ShapeNode.prototype,"id",2),ot([v({type:Object})],u.ShapeNode.prototype,"data",2),ot([v({type:Object,hasChanged:(e,t)=>!t||e.x!==t.x||e.y!==t.y})],u.ShapeNode.prototype,"position",2),ot([v({type:Boolean,reflect:!0})],u.ShapeNode.prototype,"selected",2),ot([v({type:Boolean,reflect:!0})],u.ShapeNode.prototype,"dragging",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"draggable",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"connectable",2),ot([v({type:Object})],u.ShapeNode.prototype,"instance",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"resizable",2),u.ShapeNode=ot([U("shape-node")],u.ShapeNode);var Al=Object.getOwnPropertyDescriptor,Qt=(e,t,n,i)=>{for(var s=i>1?void 0:i?Al(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s};u.BaseNode=class extends O{render(){return N`<slot></slot>`}},u.BaseNode.styles=F`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `,u.BaseNode=Qt([U("base-node")],u.BaseNode),u.BaseNodeHeader=class extends O{render(){return N`<slot></slot>`}},u.BaseNodeHeader.styles=F`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `,u.BaseNodeHeader=Qt([U("base-node-header")],u.BaseNodeHeader),u.BaseNodeHeaderTitle=class extends O{render(){return N`<span class="title"><slot></slot></span>`}},u.BaseNodeHeaderTitle.styles=F`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `,u.BaseNodeHeaderTitle=Qt([U("base-node-header-title")],u.BaseNodeHeaderTitle),u.BaseNodeContent=class extends O{render(){return N`<slot></slot>`}},u.BaseNodeContent.styles=F`
    :host {
      display: block;
      padding: 12px;
    }
  `,u.BaseNodeContent=Qt([U("base-node-content")],u.BaseNodeContent),u.BaseNodeFooter=class extends O{render(){return N`<slot></slot>`}},u.BaseNodeFooter.styles=F`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `,u.BaseNodeFooter=Qt([U("base-node-footer")],u.BaseNodeFooter);var Pl=Object.defineProperty,Y=(e,t,n,i)=>{for(var s=void 0,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(t,n,s)||s);return s&&Pl(t,n,s),s};const Hl=e=>{class t extends e{constructor(){super(...arguments),this.id="",this.position={x:0,y:0},this.data={},this.selected=!1,this.dragging=!1,this.instance=null,this.resizable=!1,this.draggable=!0,this.connectable=!0,this.minWidth=10,this.maxWidth=Number.MAX_VALUE,this.minHeight=10,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleClick=i=>{if(i.stopPropagation(),!this.isDragging){const s=!this.selected;this.selected=s,this.instance&&this.instance.updateNode(this.id,{selected:s}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:s,node:{id:this.id,data:this.data,position:this.position,selected:s}},bubbles:!0,composed:!0}))}},this.handleMouseDown=i=>{if(i.button!==0)return;const s=i.target;if(s.classList.contains("resize-handle")||s.closest(".resize-handle")!==null){this.handleResizeStart(i);return}this.draggable&&(i.preventDefault(),i.stopPropagation(),this.isDragging=!1,this.dragStart={x:i.clientX,y:i.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=i=>{if(this.isResizing){this.handleResizeMove(i);return}const s=i.clientX-this.dragStart.x,r=i.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(s)>3||Math.abs(r)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const o=this.instance.getViewport(),a={x:this.nodeStart.x+s/o.zoom,y:this.nodeStart.y+r/o.zoom};this.instance.updateNode(this.id,{position:a})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isResizing&&this.handleResizeEnd(),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1,this.isResizing=!1},50)},this.handleResizeStart=(i,s)=>{i.preventDefault(),i.stopPropagation(),i.stopImmediatePropagation(),this.isResizing=!0;const r=this.getBoundingClientRect(),o=getComputedStyle(this);let a=parseFloat(o.width),l=parseFloat(o.height);if((!a||a===0)&&(a=r.width),(!l||l===0)&&(l=r.height),this.resizeStart={x:i.clientX,y:i.clientY,width:a,height:l},s)this.resizeHandle=s;else{let c=i.target;if(!c.classList.contains("resize-handle")){const d=c.closest(".resize-handle");d&&(c=d)}const h=Array.from(c.classList);this.resizeHandle=h.find(d=>d!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleResizeMove=i=>{if(!this.isResizing)return;const s=i.clientX-this.resizeStart.x,r=i.clientY-this.resizeStart.y;let o=this.resizeStart.width,a=this.resizeStart.height;switch(this.resizeHandle){case"nw":o=this.resizeStart.width-s,a=this.resizeStart.height-r;break;case"ne":o=this.resizeStart.width+s,a=this.resizeStart.height-r;break;case"sw":o=this.resizeStart.width-s,a=this.resizeStart.height+r;break;case"se":o=this.resizeStart.width+s,a=this.resizeStart.height+r;break;case"n":a=this.resizeStart.height-r;break;case"s":a=this.resizeStart.height+r;break;case"w":o=this.resizeStart.width-s;break;case"e":o=this.resizeStart.width+s;break}if(o=Math.max(this.minWidth,Math.min(this.maxWidth,o)),a=Math.max(this.minHeight,Math.min(this.maxHeight,a)),this.keepAspectRatio){const l=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?a=o/l:o=a*l}this.style.width=`${o}px`,this.style.height=`${a}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:o,height:a,handle:this.resizeHandle},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:o,height:a,measured:{width:o,height:a}})},this.handleResizeEnd=()=>{this.isResizing&&(this.isResizing=!1,this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:this.offsetWidth,height:this.offsetHeight,measured:{width:this.offsetWidth,height:this.offsetHeight}}))},this.handleGlobalClick=i=>{i.target.closest(this.tagName.toLowerCase())!==null||this.selected&&(this.selected=!1,this.instance&&this.instance.updateNode(this.id,{selected:!1}),this.dispatchEvent(new CustomEvent("node-deselect",{detail:{nodeId:this.id,selected:!1,node:{id:this.id,data:this.data,position:this.position,selected:!1}},bubbles:!0,composed:!0})))},this.handleResizeHandleClick=i=>s=>{s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.handleResizeStart(s,i)}}static get styles(){return[F`
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
      `]}connectedCallback(){super.connectedCallback(),this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),document.addEventListener("click",this.handleGlobalClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),document.removeEventListener("click",this.handleGlobalClick),this.cleanup()}updated(i){super.updated(i),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}renderResizer(){return!this.resizable||!this.selected?N``:N`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick("nw")}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick("ne")}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick("sw")}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick("se")}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick("n")}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick("s")}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick("w")}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick("e")}></div>
      `}render(){const i=this.renderComponent();return Array.isArray(i)?[...i,this.renderResizer()]:N`
        ${i}
        ${this.renderResizer()}
      `}renderComponent(){return N``}}return Y([v({type:String,reflect:!0})],t.prototype,"id"),Y([v({type:Object})],t.prototype,"position"),Y([v({type:Object})],t.prototype,"data"),Y([v({type:Boolean,reflect:!0})],t.prototype,"selected"),Y([v({type:Boolean,reflect:!0})],t.prototype,"dragging"),Y([v({type:Object})],t.prototype,"instance"),Y([v({type:Boolean})],t.prototype,"resizable"),Y([v({type:Boolean})],t.prototype,"draggable"),Y([v({type:Boolean})],t.prototype,"connectable"),Y([v({type:Number})],t.prototype,"minWidth"),Y([v({type:Number})],t.prototype,"maxWidth"),Y([v({type:Number})],t.prototype,"minHeight"),Y([v({type:Number})],t.prototype,"maxHeight"),Y([v({type:Boolean})],t.prototype,"keepAspectRatio"),t};u.FlowInstance=di,u.NodeMixin=Hl,u.ShapeRegistry=Kt,u.createStore=ka,u.getBezierPath=Ne,u.getCenter=ol,u.getDistance=rl,u.getSmoothStepPath=rn,u.getStraightPath=Ai,u.isPointInRect=al,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=lit-flow.bundle.umd.cjs.map
