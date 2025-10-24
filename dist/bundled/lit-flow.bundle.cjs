"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var Li={value:()=>{}};function Ye(){for(var e=0,t=arguments.length,n={},i;e<t;++e){if(!(i=arguments[e]+"")||i in n||/[\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new se(n)}function se(e){this._=e}function Ti(e,t){return e.trim().split(/^|\s+/).map(function(n){var i="",s=n.indexOf(".");if(s>=0&&(i=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}se.prototype=Ye.prototype={constructor:se,on:function(e,t){var n=this._,i=Ti(e+"",n),s,r=-1,o=i.length;if(arguments.length<2){for(;++r<o;)if((s=(e=i[r]).type)&&(s=Di(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<o;)if(s=(e=i[r]).type)n[s]=an(n[s],e.name,t);else if(t==null)for(s in n)n[s]=an(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new se(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),i=0,s,r;i<s;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(r=this._[e],i=0,s=r.length;i<s;++i)r[i].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var i=this._[e],s=0,r=i.length;s<r;++s)i[s].value.apply(t,n)}};function Di(e,t){for(var n=0,i=e.length,s;n<i;++n)if((s=e[n]).name===t)return s.value}function an(e,t,n){for(var i=0,s=e.length;i<s;++i)if(e[i].name===t){e[i]=Li,e=e.slice(0,i).concat(e.slice(i+1));break}return n!=null&&e.push({name:t,value:n}),e}var Re="http://www.w3.org/1999/xhtml";const ln={svg:"http://www.w3.org/2000/svg",xhtml:Re,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function xe(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),ln.hasOwnProperty(t)?{space:ln[t],local:e}:e}function Oi(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Re&&t.documentElement.namespaceURI===Re?t.createElement(e):t.createElementNS(n,e)}}function Bi(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Yn(e){var t=xe(e);return(t.local?Bi:Oi)(t)}function Fi(){}function Ze(e){return e==null?Fi:function(){return this.querySelector(e)}}function Ii(e){typeof e!="function"&&(e=Ze(e));for(var t=this._groups,n=t.length,i=new Array(n),s=0;s<n;++s)for(var r=t[s],o=r.length,a=i[s]=new Array(o),l,c,h=0;h<o;++h)(l=r[h])&&(c=e.call(l,l.__data__,h,r))&&("__data__"in l&&(c.__data__=l.__data__),a[h]=c);return new V(i,this._parents)}function Ui(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Xi(){return[]}function Zn(e){return e==null?Xi:function(){return this.querySelectorAll(e)}}function Yi(e){return function(){return Ui(e.apply(this,arguments))}}function Zi(e){typeof e=="function"?e=Yi(e):e=Zn(e);for(var t=this._groups,n=t.length,i=[],s=[],r=0;r<n;++r)for(var o=t[r],a=o.length,l,c=0;c<a;++c)(l=o[c])&&(i.push(e.call(l,l.__data__,c,o)),s.push(l));return new V(i,s)}function qn(e){return function(){return this.matches(e)}}function Wn(e){return function(t){return t.matches(e)}}var qi=Array.prototype.find;function Wi(e){return function(){return qi.call(this.children,e)}}function Vi(){return this.firstElementChild}function Gi(e){return this.select(e==null?Vi:Wi(typeof e=="function"?e:Wn(e)))}var ji=Array.prototype.filter;function Ki(){return Array.from(this.children)}function Qi(e){return function(){return ji.call(this.children,e)}}function Ji(e){return this.selectAll(e==null?Ki:Qi(typeof e=="function"?e:Wn(e)))}function ts(e){typeof e!="function"&&(e=qn(e));for(var t=this._groups,n=t.length,i=new Array(n),s=0;s<n;++s)for(var r=t[s],o=r.length,a=i[s]=[],l,c=0;c<o;++c)(l=r[c])&&e.call(l,l.__data__,c,r)&&a.push(l);return new V(i,this._parents)}function Vn(e){return new Array(e.length)}function es(){return new V(this._enter||this._groups.map(Vn),this._parents)}function ce(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}ce.prototype={constructor:ce,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function ns(e){return function(){return e}}function is(e,t,n,i,s,r){for(var o=0,a,l=t.length,c=r.length;o<c;++o)(a=t[o])?(a.__data__=r[o],i[o]=a):n[o]=new ce(e,r[o]);for(;o<l;++o)(a=t[o])&&(s[o]=a)}function ss(e,t,n,i,s,r,o){var a,l,c=new Map,h=t.length,d=r.length,f=new Array(h),p;for(a=0;a<h;++a)(l=t[a])&&(f[a]=p=o.call(l,l.__data__,a,t)+"",c.has(p)?s[a]=l:c.set(p,l));for(a=0;a<d;++a)p=o.call(e,r[a],a,r)+"",(l=c.get(p))?(i[a]=l,l.__data__=r[a],c.delete(p)):n[a]=new ce(e,r[a]);for(a=0;a<h;++a)(l=t[a])&&c.get(f[a])===l&&(s[a]=l)}function rs(e){return e.__data__}function os(e,t){if(!arguments.length)return Array.from(this,rs);var n=t?ss:is,i=this._parents,s=this._groups;typeof e!="function"&&(e=ns(e));for(var r=s.length,o=new Array(r),a=new Array(r),l=new Array(r),c=0;c<r;++c){var h=i[c],d=s[c],f=d.length,p=as(e.call(h,h&&h.__data__,c,i)),m=p.length,b=a[c]=new Array(m),E=o[c]=new Array(m),v=l[c]=new Array(f);n(h,d,b,E,v,p,t);for(var k=0,A=0,L,F;k<m;++k)if(L=b[k]){for(k>=A&&(A=k+1);!(F=E[A])&&++A<m;);L._next=F||null}}return o=new V(o,i),o._enter=a,o._exit=l,o}function as(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function ls(){return new V(this._exit||this._groups.map(Vn),this._parents)}function hs(e,t,n){var i=this.enter(),s=this,r=this.exit();return typeof e=="function"?(i=e(i),i&&(i=i.selection())):i=i.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?r.remove():n(r),i&&s?i.merge(s).order():s}function cs(e){for(var t=e.selection?e.selection():e,n=this._groups,i=t._groups,s=n.length,r=i.length,o=Math.min(s,r),a=new Array(s),l=0;l<o;++l)for(var c=n[l],h=i[l],d=c.length,f=a[l]=new Array(d),p,m=0;m<d;++m)(p=c[m]||h[m])&&(f[m]=p);for(;l<s;++l)a[l]=n[l];return new V(a,this._parents)}function ds(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var i=e[t],s=i.length-1,r=i[s],o;--s>=0;)(o=i[s])&&(r&&o.compareDocumentPosition(r)^4&&r.parentNode.insertBefore(o,r),r=o);return this}function us(e){e||(e=fs);function t(d,f){return d&&f?e(d.__data__,f.__data__):!d-!f}for(var n=this._groups,i=n.length,s=new Array(i),r=0;r<i;++r){for(var o=n[r],a=o.length,l=s[r]=new Array(a),c,h=0;h<a;++h)(c=o[h])&&(l[h]=c);l.sort(t)}return new V(s,this._parents).order()}function fs(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function ps(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function gs(){return Array.from(this)}function ms(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],s=0,r=i.length;s<r;++s){var o=i[s];if(o)return o}return null}function ys(){let e=0;for(const t of this)++e;return e}function ws(){return!this.node()}function vs(e){for(var t=this._groups,n=0,i=t.length;n<i;++n)for(var s=t[n],r=0,o=s.length,a;r<o;++r)(a=s[r])&&e.call(a,a.__data__,r,s);return this}function xs(e){return function(){this.removeAttribute(e)}}function bs(e){return function(){this.removeAttributeNS(e.space,e.local)}}function $s(e,t){return function(){this.setAttribute(e,t)}}function _s(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function zs(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function Ss(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Es(e,t){var n=xe(e);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((t==null?n.local?bs:xs:typeof t=="function"?n.local?Ss:zs:n.local?_s:$s)(n,t))}function Gn(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function ks(e){return function(){this.style.removeProperty(e)}}function Ns(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Cs(e,t,n){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function Ms(e,t,n){return arguments.length>1?this.each((t==null?ks:typeof t=="function"?Cs:Ns)(e,t,n??"")):kt(this.node(),e)}function kt(e,t){return e.style.getPropertyValue(t)||Gn(e).getComputedStyle(e,null).getPropertyValue(t)}function As(e){return function(){delete this[e]}}function Ps(e,t){return function(){this[e]=t}}function Hs(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function Rs(e,t){return arguments.length>1?this.each((t==null?As:typeof t=="function"?Hs:Ps)(e,t)):this.node()[e]}function jn(e){return e.trim().split(/^|\s+/)}function qe(e){return e.classList||new Kn(e)}function Kn(e){this._node=e,this._names=jn(e.getAttribute("class")||"")}Kn.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Qn(e,t){for(var n=qe(e),i=-1,s=t.length;++i<s;)n.add(t[i])}function Jn(e,t){for(var n=qe(e),i=-1,s=t.length;++i<s;)n.remove(t[i])}function Ls(e){return function(){Qn(this,e)}}function Ts(e){return function(){Jn(this,e)}}function Ds(e,t){return function(){(t.apply(this,arguments)?Qn:Jn)(this,e)}}function Os(e,t){var n=jn(e+"");if(arguments.length<2){for(var i=qe(this.node()),s=-1,r=n.length;++s<r;)if(!i.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?Ds:t?Ls:Ts)(n,t))}function Bs(){this.textContent=""}function Fs(e){return function(){this.textContent=e}}function Is(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Us(e){return arguments.length?this.each(e==null?Bs:(typeof e=="function"?Is:Fs)(e)):this.node().textContent}function Xs(){this.innerHTML=""}function Ys(e){return function(){this.innerHTML=e}}function Zs(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function qs(e){return arguments.length?this.each(e==null?Xs:(typeof e=="function"?Zs:Ys)(e)):this.node().innerHTML}function Ws(){this.nextSibling&&this.parentNode.appendChild(this)}function Vs(){return this.each(Ws)}function Gs(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function js(){return this.each(Gs)}function Ks(e){var t=typeof e=="function"?e:Yn(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Qs(){return null}function Js(e,t){var n=typeof e=="function"?e:Yn(e),i=t==null?Qs:typeof t=="function"?t:Ze(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function tr(){var e=this.parentNode;e&&e.removeChild(this)}function er(){return this.each(tr)}function nr(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function ir(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function sr(e){return this.select(e?ir:nr)}function rr(e){return arguments.length?this.property("__data__",e):this.node().__data__}function or(e){return function(t){e.call(this,t,this.__data__)}}function ar(e){return e.trim().split(/^|\s+/).map(function(t){var n="",i=t.indexOf(".");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{type:t,name:n}})}function lr(e){return function(){var t=this.__on;if(t){for(var n=0,i=-1,s=t.length,r;n<s;++n)r=t[n],(!e.type||r.type===e.type)&&r.name===e.name?this.removeEventListener(r.type,r.listener,r.options):t[++i]=r;++i?t.length=i:delete this.__on}}}function hr(e,t,n){return function(){var i=this.__on,s,r=or(t);if(i){for(var o=0,a=i.length;o<a;++o)if((s=i[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=r,s.options=n),s.value=t;return}}this.addEventListener(e.type,r,n),s={type:e.type,name:e.name,value:t,listener:r,options:n},i?i.push(s):this.__on=[s]}}function cr(e,t,n){var i=ar(e+""),s,r=i.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,h;l<c;++l)for(s=0,h=a[l];s<r;++s)if((o=i[s]).type===h.type&&o.name===h.name)return h.value}return}for(a=t?hr:lr,s=0;s<r;++s)this.each(a(i[s],t,n));return this}function ti(e,t,n){var i=Gn(e),s=i.CustomEvent;typeof s=="function"?s=new s(t,n):(s=i.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function dr(e,t){return function(){return ti(this,e,t)}}function ur(e,t){return function(){return ti(this,e,t.apply(this,arguments))}}function fr(e,t){return this.each((typeof t=="function"?ur:dr)(e,t))}function*pr(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var i=e[t],s=0,r=i.length,o;s<r;++s)(o=i[s])&&(yield o)}var ei=[null];function V(e,t){this._groups=e,this._parents=t}function Wt(){return new V([[document.documentElement]],ei)}function gr(){return this}V.prototype=Wt.prototype={constructor:V,select:Ii,selectAll:Zi,selectChild:Gi,selectChildren:Ji,filter:ts,data:os,enter:es,exit:ls,join:hs,merge:cs,selection:gr,order:ds,sort:us,call:ps,nodes:gs,node:ms,size:ys,empty:ws,each:vs,attr:Es,style:Ms,property:Rs,classed:Os,text:Us,html:qs,raise:Vs,lower:js,append:Ks,insert:Js,remove:er,clone:sr,datum:rr,on:cr,dispatch:fr,[Symbol.iterator]:pr};function ft(e){return typeof e=="string"?new V([[document.querySelector(e)]],[document.documentElement]):new V([[e]],ei)}function mr(e){let t;for(;t=e.sourceEvent;)e=t;return e}function ut(e,t){if(e=mr(e),t===void 0&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=e.clientX,i.y=e.clientY,i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}if(t.getBoundingClientRect){var s=t.getBoundingClientRect();return[e.clientX-s.left-t.clientLeft,e.clientY-s.top-t.clientTop]}}return[e.pageX,e.pageY]}const Le={capture:!0,passive:!1};function Te(e){e.preventDefault(),e.stopImmediatePropagation()}function yr(e){var t=e.document.documentElement,n=ft(e).on("dragstart.drag",Te,Le);"onselectstart"in t?n.on("selectstart.drag",Te,Le):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function wr(e,t){var n=e.document.documentElement,i=ft(e).on("dragstart.drag",null);t&&(i.on("click.drag",Te,Le),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in n?i.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}function We(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function ni(e,t){var n=Object.create(e.prototype);for(var i in t)n[i]=t[i];return n}function Vt(){}var Ft=.7,de=1/Ft,Et="\\s*([+-]?\\d+)\\s*",It="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",st="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",vr=/^#([0-9a-f]{3,8})$/,xr=new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`),br=new RegExp(`^rgb\\(${st},${st},${st}\\)$`),$r=new RegExp(`^rgba\\(${Et},${Et},${Et},${It}\\)$`),_r=new RegExp(`^rgba\\(${st},${st},${st},${It}\\)$`),zr=new RegExp(`^hsl\\(${It},${st},${st}\\)$`),Sr=new RegExp(`^hsla\\(${It},${st},${st},${It}\\)$`),hn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};We(Vt,vt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:cn,formatHex:cn,formatHex8:Er,formatHsl:kr,formatRgb:dn,toString:dn});function cn(){return this.rgb().formatHex()}function Er(){return this.rgb().formatHex8()}function kr(){return ii(this).formatHsl()}function dn(){return this.rgb().formatRgb()}function vt(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=vr.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?un(t):n===3?new U(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Jt(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Jt(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=xr.exec(e))?new U(t[1],t[2],t[3],1):(t=br.exec(e))?new U(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=$r.exec(e))?Jt(t[1],t[2],t[3],t[4]):(t=_r.exec(e))?Jt(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=zr.exec(e))?gn(t[1],t[2]/100,t[3]/100,1):(t=Sr.exec(e))?gn(t[1],t[2]/100,t[3]/100,t[4]):hn.hasOwnProperty(e)?un(hn[e]):e==="transparent"?new U(NaN,NaN,NaN,0):null}function un(e){return new U(e>>16&255,e>>8&255,e&255,1)}function Jt(e,t,n,i){return i<=0&&(e=t=n=NaN),new U(e,t,n,i)}function Nr(e){return e instanceof Vt||(e=vt(e)),e?(e=e.rgb(),new U(e.r,e.g,e.b,e.opacity)):new U}function De(e,t,n,i){return arguments.length===1?Nr(e):new U(e,t,n,i??1)}function U(e,t,n,i){this.r=+e,this.g=+t,this.b=+n,this.opacity=+i}We(U,De,ni(Vt,{brighter(e){return e=e==null?de:Math.pow(de,e),new U(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Ft:Math.pow(Ft,e),new U(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new U(wt(this.r),wt(this.g),wt(this.b),ue(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:fn,formatHex:fn,formatHex8:Cr,formatRgb:pn,toString:pn}));function fn(){return`#${mt(this.r)}${mt(this.g)}${mt(this.b)}`}function Cr(){return`#${mt(this.r)}${mt(this.g)}${mt(this.b)}${mt((isNaN(this.opacity)?1:this.opacity)*255)}`}function pn(){const e=ue(this.opacity);return`${e===1?"rgb(":"rgba("}${wt(this.r)}, ${wt(this.g)}, ${wt(this.b)}${e===1?")":`, ${e})`}`}function ue(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function wt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function mt(e){return e=wt(e),(e<16?"0":"")+e.toString(16)}function gn(e,t,n,i){return i<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new tt(e,t,n,i)}function ii(e){if(e instanceof tt)return new tt(e.h,e.s,e.l,e.opacity);if(e instanceof Vt||(e=vt(e)),!e)return new tt;if(e instanceof tt)return e;e=e.rgb();var t=e.r/255,n=e.g/255,i=e.b/255,s=Math.min(t,n,i),r=Math.max(t,n,i),o=NaN,a=r-s,l=(r+s)/2;return a?(t===r?o=(n-i)/a+(n<i)*6:n===r?o=(i-t)/a+2:o=(t-n)/a+4,a/=l<.5?r+s:2-r-s,o*=60):a=l>0&&l<1?0:o,new tt(o,a,l,e.opacity)}function Mr(e,t,n,i){return arguments.length===1?ii(e):new tt(e,t,n,i??1)}function tt(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}We(tt,Mr,ni(Vt,{brighter(e){return e=e==null?de:Math.pow(de,e),new tt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Ft:Math.pow(Ft,e),new tt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*t,s=2*n-i;return new U(ke(e>=240?e-240:e+120,s,i),ke(e,s,i),ke(e<120?e+240:e-120,s,i),this.opacity)},clamp(){return new tt(mn(this.h),te(this.s),te(this.l),ue(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=ue(this.opacity);return`${e===1?"hsl(":"hsla("}${mn(this.h)}, ${te(this.s)*100}%, ${te(this.l)*100}%${e===1?")":`, ${e})`}`}}));function mn(e){return e=(e||0)%360,e<0?e+360:e}function te(e){return Math.max(0,Math.min(1,e||0))}function ke(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const Ve=e=>()=>e;function Ar(e,t){return function(n){return e+n*t}}function Pr(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(i){return Math.pow(e+i*t,n)}}function Hr(e){return(e=+e)==1?si:function(t,n){return n-t?Pr(t,n,e):Ve(isNaN(t)?n:t)}}function si(e,t){var n=t-e;return n?Ar(e,n):Ve(isNaN(e)?t:e)}const fe=(function e(t){var n=Hr(t);function i(s,r){var o=n((s=De(s)).r,(r=De(r)).r),a=n(s.g,r.g),l=n(s.b,r.b),c=si(s.opacity,r.opacity);return function(h){return s.r=o(h),s.g=a(h),s.b=l(h),s.opacity=c(h),s+""}}return i.gamma=e,i})(1);function Rr(e,t){t||(t=[]);var n=e?Math.min(t.length,e.length):0,i=t.slice(),s;return function(r){for(s=0;s<n;++s)i[s]=e[s]*(1-r)+t[s]*r;return i}}function Lr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Tr(e,t){var n=t?t.length:0,i=e?Math.min(n,e.length):0,s=new Array(i),r=new Array(n),o;for(o=0;o<i;++o)s[o]=Dt(e[o],t[o]);for(;o<n;++o)r[o]=t[o];return function(a){for(o=0;o<i;++o)r[o]=s[o](a);return r}}function Dr(e,t){var n=new Date;return e=+e,t=+t,function(i){return n.setTime(e*(1-i)+t*i),n}}function it(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function Or(e,t){var n={},i={},s;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(s in t)s in e?n[s]=Dt(e[s],t[s]):i[s]=t[s];return function(r){for(s in n)i[s]=n[s](r);return i}}var Oe=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ne=new RegExp(Oe.source,"g");function Br(e){return function(){return e}}function Fr(e){return function(t){return e(t)+""}}function ri(e,t){var n=Oe.lastIndex=Ne.lastIndex=0,i,s,r,o=-1,a=[],l=[];for(e=e+"",t=t+"";(i=Oe.exec(e))&&(s=Ne.exec(t));)(r=s.index)>n&&(r=t.slice(n,r),a[o]?a[o]+=r:a[++o]=r),(i=i[0])===(s=s[0])?a[o]?a[o]+=s:a[++o]=s:(a[++o]=null,l.push({i:o,x:it(i,s)})),n=Ne.lastIndex;return n<t.length&&(r=t.slice(n),a[o]?a[o]+=r:a[++o]=r),a.length<2?l[0]?Fr(l[0].x):Br(t):(t=l.length,function(c){for(var h=0,d;h<t;++h)a[(d=l[h]).i]=d.x(c);return a.join("")})}function Dt(e,t){var n=typeof t,i;return t==null||n==="boolean"?Ve(t):(n==="number"?it:n==="string"?(i=vt(t))?(t=i,fe):ri:t instanceof vt?fe:t instanceof Date?Dr:Lr(t)?Rr:Array.isArray(t)?Tr:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Or:it)(e,t)}var yn=180/Math.PI,Be={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function oi(e,t,n,i,s,r){var o,a,l;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(l=e*n+t*i)&&(n-=e*l,i-=t*l),(a=Math.sqrt(n*n+i*i))&&(n/=a,i/=a,l/=a),e*i<t*n&&(e=-e,t=-t,l=-l,o=-o),{translateX:s,translateY:r,rotate:Math.atan2(t,e)*yn,skewX:Math.atan(l)*yn,scaleX:o,scaleY:a}}var ee;function Ir(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Be:oi(t.a,t.b,t.c,t.d,t.e,t.f)}function Ur(e){return e==null||(ee||(ee=document.createElementNS("http://www.w3.org/2000/svg","g")),ee.setAttribute("transform",e),!(e=ee.transform.baseVal.consolidate()))?Be:(e=e.matrix,oi(e.a,e.b,e.c,e.d,e.e,e.f))}function ai(e,t,n,i){function s(c){return c.length?c.pop()+" ":""}function r(c,h,d,f,p,m){if(c!==d||h!==f){var b=p.push("translate(",null,t,null,n);m.push({i:b-4,x:it(c,d)},{i:b-2,x:it(h,f)})}else(d||f)&&p.push("translate("+d+t+f+n)}function o(c,h,d,f){c!==h?(c-h>180?h+=360:h-c>180&&(c+=360),f.push({i:d.push(s(d)+"rotate(",null,i)-2,x:it(c,h)})):h&&d.push(s(d)+"rotate("+h+i)}function a(c,h,d,f){c!==h?f.push({i:d.push(s(d)+"skewX(",null,i)-2,x:it(c,h)}):h&&d.push(s(d)+"skewX("+h+i)}function l(c,h,d,f,p,m){if(c!==d||h!==f){var b=p.push(s(p)+"scale(",null,",",null,")");m.push({i:b-4,x:it(c,d)},{i:b-2,x:it(h,f)})}else(d!==1||f!==1)&&p.push(s(p)+"scale("+d+","+f+")")}return function(c,h){var d=[],f=[];return c=e(c),h=e(h),r(c.translateX,c.translateY,h.translateX,h.translateY,d,f),o(c.rotate,h.rotate,d,f),a(c.skewX,h.skewX,d,f),l(c.scaleX,c.scaleY,h.scaleX,h.scaleY,d,f),c=h=null,function(p){for(var m=-1,b=f.length,E;++m<b;)d[(E=f[m]).i]=E.x(p);return d.join("")}}}var Xr=ai(Ir,"px, ","px)","deg)"),Yr=ai(Ur,", ",")",")"),Zr=1e-12;function wn(e){return((e=Math.exp(e))+1/e)/2}function qr(e){return((e=Math.exp(e))-1/e)/2}function Wr(e){return((e=Math.exp(2*e))-1)/(e+1)}const re=(function e(t,n,i){function s(r,o){var a=r[0],l=r[1],c=r[2],h=o[0],d=o[1],f=o[2],p=h-a,m=d-l,b=p*p+m*m,E,v;if(b<Zr)v=Math.log(f/c)/t,E=function(D){return[a+D*p,l+D*m,c*Math.exp(t*D*v)]};else{var k=Math.sqrt(b),A=(f*f-c*c+i*b)/(2*c*n*k),L=(f*f-c*c-i*b)/(2*f*n*k),F=Math.log(Math.sqrt(A*A+1)-A),H=Math.log(Math.sqrt(L*L+1)-L);v=(H-F)/t,E=function(D){var j=D*v,K=wn(F),dt=c/(n*k)*(K*Wr(t*j+F)-qr(F));return[a+dt*p,l+dt*m,c*K/wn(t*j+F)]}}return E.duration=v*1e3*t/Math.SQRT2,E}return s.rho=function(r){var o=Math.max(.001,+r),a=o*o,l=a*a;return e(o,a,l)},s})(Math.SQRT2,2,4);var Nt=0,Lt=0,Pt=0,li=1e3,pe,Tt,ge=0,xt=0,be=0,Ut=typeof performance=="object"&&performance.now?performance:Date,hi=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Ge(){return xt||(hi(Vr),xt=Ut.now()+be)}function Vr(){xt=0}function me(){this._call=this._time=this._next=null}me.prototype=ci.prototype={constructor:me,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?Ge():+n)+(t==null?0:+t),!this._next&&Tt!==this&&(Tt?Tt._next=this:pe=this,Tt=this),this._call=e,this._time=n,Fe()},stop:function(){this._call&&(this._call=null,this._time=1/0,Fe())}};function ci(e,t,n){var i=new me;return i.restart(e,t,n),i}function Gr(){Ge(),++Nt;for(var e=pe,t;e;)(t=xt-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Nt}function vn(){xt=(ge=Ut.now())+be,Nt=Lt=0;try{Gr()}finally{Nt=0,Kr(),xt=0}}function jr(){var e=Ut.now(),t=e-ge;t>li&&(be-=t,ge=e)}function Kr(){for(var e,t=pe,n,i=1/0;t;)t._call?(i>t._time&&(i=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:pe=n);Tt=e,Fe(i)}function Fe(e){if(!Nt){Lt&&(Lt=clearTimeout(Lt));var t=e-xt;t>24?(e<1/0&&(Lt=setTimeout(vn,e-Ut.now()-be)),Pt&&(Pt=clearInterval(Pt))):(Pt||(ge=Ut.now(),Pt=setInterval(jr,li)),Nt=1,hi(vn))}}function xn(e,t,n){var i=new me;return t=t==null?0:+t,i.restart(s=>{i.stop(),e(s+t)},t,n),i}var Qr=Ye("start","end","cancel","interrupt"),Jr=[],di=0,bn=1,Ie=2,oe=3,$n=4,Ue=5,ae=6;function $e(e,t,n,i,s,r){var o=e.__transition;if(!o)e.__transition={};else if(n in o)return;to(e,n,{name:t,index:i,group:s,on:Qr,tween:Jr,time:r.time,delay:r.delay,duration:r.duration,ease:r.ease,timer:null,state:di})}function je(e,t){var n=et(e,t);if(n.state>di)throw new Error("too late; already scheduled");return n}function rt(e,t){var n=et(e,t);if(n.state>oe)throw new Error("too late; already running");return n}function et(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function to(e,t,n){var i=e.__transition,s;i[t]=n,n.timer=ci(r,0,n.time);function r(c){n.state=bn,n.timer.restart(o,n.delay,n.time),n.delay<=c&&o(c-n.delay)}function o(c){var h,d,f,p;if(n.state!==bn)return l();for(h in i)if(p=i[h],p.name===n.name){if(p.state===oe)return xn(o);p.state===$n?(p.state=ae,p.timer.stop(),p.on.call("interrupt",e,e.__data__,p.index,p.group),delete i[h]):+h<t&&(p.state=ae,p.timer.stop(),p.on.call("cancel",e,e.__data__,p.index,p.group),delete i[h])}if(xn(function(){n.state===oe&&(n.state=$n,n.timer.restart(a,n.delay,n.time),a(c))}),n.state=Ie,n.on.call("start",e,e.__data__,n.index,n.group),n.state===Ie){for(n.state=oe,s=new Array(f=n.tween.length),h=0,d=-1;h<f;++h)(p=n.tween[h].value.call(e,e.__data__,n.index,n.group))&&(s[++d]=p);s.length=d+1}}function a(c){for(var h=c<n.duration?n.ease.call(null,c/n.duration):(n.timer.restart(l),n.state=Ue,1),d=-1,f=s.length;++d<f;)s[d].call(e,h);n.state===Ue&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=ae,n.timer.stop(),delete i[t];for(var c in i)return;delete e.__transition}}function le(e,t){var n=e.__transition,i,s,r=!0,o;if(n){t=t==null?null:t+"";for(o in n){if((i=n[o]).name!==t){r=!1;continue}s=i.state>Ie&&i.state<Ue,i.state=ae,i.timer.stop(),i.on.call(s?"interrupt":"cancel",e,e.__data__,i.index,i.group),delete n[o]}r&&delete e.__transition}}function eo(e){return this.each(function(){le(this,e)})}function no(e,t){var n,i;return function(){var s=rt(this,e),r=s.tween;if(r!==n){i=n=r;for(var o=0,a=i.length;o<a;++o)if(i[o].name===t){i=i.slice(),i.splice(o,1);break}}s.tween=i}}function io(e,t,n){var i,s;if(typeof n!="function")throw new Error;return function(){var r=rt(this,e),o=r.tween;if(o!==i){s=(i=o).slice();for(var a={name:t,value:n},l=0,c=s.length;l<c;++l)if(s[l].name===t){s[l]=a;break}l===c&&s.push(a)}r.tween=s}}function so(e,t){var n=this._id;if(e+="",arguments.length<2){for(var i=et(this.node(),n).tween,s=0,r=i.length,o;s<r;++s)if((o=i[s]).name===e)return o.value;return null}return this.each((t==null?no:io)(n,e,t))}function Ke(e,t,n){var i=e._id;return e.each(function(){var s=rt(this,i);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return et(s,i).value[t]}}function ui(e,t){var n;return(typeof t=="number"?it:t instanceof vt?fe:(n=vt(t))?(t=n,fe):ri)(e,t)}function ro(e){return function(){this.removeAttribute(e)}}function oo(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ao(e,t,n){var i,s=n+"",r;return function(){var o=this.getAttribute(e);return o===s?null:o===i?r:r=t(i=o,n)}}function lo(e,t,n){var i,s=n+"",r;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===i?r:r=t(i=o,n)}}function ho(e,t,n){var i,s,r;return function(){var o,a=n(this),l;return a==null?void this.removeAttribute(e):(o=this.getAttribute(e),l=a+"",o===l?null:o===i&&l===s?r:(s=l,r=t(i=o,a)))}}function co(e,t,n){var i,s,r;return function(){var o,a=n(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),l=a+"",o===l?null:o===i&&l===s?r:(s=l,r=t(i=o,a)))}}function uo(e,t){var n=xe(e),i=n==="transform"?Yr:ui;return this.attrTween(e,typeof t=="function"?(n.local?co:ho)(n,i,Ke(this,"attr."+e,t)):t==null?(n.local?oo:ro)(n):(n.local?lo:ao)(n,i,t))}function fo(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function po(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function go(e,t){var n,i;function s(){var r=t.apply(this,arguments);return r!==i&&(n=(i=r)&&po(e,r)),n}return s._value=t,s}function mo(e,t){var n,i;function s(){var r=t.apply(this,arguments);return r!==i&&(n=(i=r)&&fo(e,r)),n}return s._value=t,s}function yo(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var i=xe(e);return this.tween(n,(i.local?go:mo)(i,t))}function wo(e,t){return function(){je(this,e).delay=+t.apply(this,arguments)}}function vo(e,t){return t=+t,function(){je(this,e).delay=t}}function xo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?wo:vo)(t,e)):et(this.node(),t).delay}function bo(e,t){return function(){rt(this,e).duration=+t.apply(this,arguments)}}function $o(e,t){return t=+t,function(){rt(this,e).duration=t}}function _o(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?bo:$o)(t,e)):et(this.node(),t).duration}function zo(e,t){if(typeof t!="function")throw new Error;return function(){rt(this,e).ease=t}}function So(e){var t=this._id;return arguments.length?this.each(zo(t,e)):et(this.node(),t).ease}function Eo(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;rt(this,e).ease=n}}function ko(e){if(typeof e!="function")throw new Error;return this.each(Eo(this._id,e))}function No(e){typeof e!="function"&&(e=qn(e));for(var t=this._groups,n=t.length,i=new Array(n),s=0;s<n;++s)for(var r=t[s],o=r.length,a=i[s]=[],l,c=0;c<o;++c)(l=r[c])&&e.call(l,l.__data__,c,r)&&a.push(l);return new ht(i,this._parents,this._name,this._id)}function Co(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,i=t.length,s=n.length,r=Math.min(i,s),o=new Array(i),a=0;a<r;++a)for(var l=t[a],c=n[a],h=l.length,d=o[a]=new Array(h),f,p=0;p<h;++p)(f=l[p]||c[p])&&(d[p]=f);for(;a<i;++a)o[a]=t[a];return new ht(o,this._parents,this._name,this._id)}function Mo(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function Ao(e,t,n){var i,s,r=Mo(t)?je:rt;return function(){var o=r(this,e),a=o.on;a!==i&&(s=(i=a).copy()).on(t,n),o.on=s}}function Po(e,t){var n=this._id;return arguments.length<2?et(this.node(),n).on.on(e):this.each(Ao(n,e,t))}function Ho(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Ro(){return this.on("end.remove",Ho(this._id))}function Lo(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Ze(e));for(var i=this._groups,s=i.length,r=new Array(s),o=0;o<s;++o)for(var a=i[o],l=a.length,c=r[o]=new Array(l),h,d,f=0;f<l;++f)(h=a[f])&&(d=e.call(h,h.__data__,f,a))&&("__data__"in h&&(d.__data__=h.__data__),c[f]=d,$e(c[f],t,n,f,c,et(h,n)));return new ht(r,this._parents,t,n)}function To(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Zn(e));for(var i=this._groups,s=i.length,r=[],o=[],a=0;a<s;++a)for(var l=i[a],c=l.length,h,d=0;d<c;++d)if(h=l[d]){for(var f=e.call(h,h.__data__,d,l),p,m=et(h,n),b=0,E=f.length;b<E;++b)(p=f[b])&&$e(p,t,n,b,f,m);r.push(f),o.push(h)}return new ht(r,o,t,n)}var Do=Wt.prototype.constructor;function Oo(){return new Do(this._groups,this._parents)}function Bo(e,t){var n,i,s;return function(){var r=kt(this,e),o=(this.style.removeProperty(e),kt(this,e));return r===o?null:r===n&&o===i?s:s=t(n=r,i=o)}}function fi(e){return function(){this.style.removeProperty(e)}}function Fo(e,t,n){var i,s=n+"",r;return function(){var o=kt(this,e);return o===s?null:o===i?r:r=t(i=o,n)}}function Io(e,t,n){var i,s,r;return function(){var o=kt(this,e),a=n(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),kt(this,e))),o===l?null:o===i&&l===s?r:(s=l,r=t(i=o,a))}}function Uo(e,t){var n,i,s,r="style."+t,o="end."+r,a;return function(){var l=rt(this,e),c=l.on,h=l.value[r]==null?a||(a=fi(t)):void 0;(c!==n||s!==h)&&(i=(n=c).copy()).on(o,s=h),l.on=i}}function Xo(e,t,n){var i=(e+="")=="transform"?Xr:ui;return t==null?this.styleTween(e,Bo(e,i)).on("end.style."+e,fi(e)):typeof t=="function"?this.styleTween(e,Io(e,i,Ke(this,"style."+e,t))).each(Uo(this._id,e)):this.styleTween(e,Fo(e,i,t),n).on("end.style."+e,null)}function Yo(e,t,n){return function(i){this.style.setProperty(e,t.call(this,i),n)}}function Zo(e,t,n){var i,s;function r(){var o=t.apply(this,arguments);return o!==s&&(i=(s=o)&&Yo(e,o,n)),i}return r._value=t,r}function qo(e,t,n){var i="style."+(e+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,Zo(e,t,n??""))}function Wo(e){return function(){this.textContent=e}}function Vo(e){return function(){var t=e(this);this.textContent=t??""}}function Go(e){return this.tween("text",typeof e=="function"?Vo(Ke(this,"text",e)):Wo(e==null?"":e+""))}function jo(e){return function(t){this.textContent=e.call(this,t)}}function Ko(e){var t,n;function i(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&jo(s)),t}return i._value=e,i}function Qo(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,Ko(e))}function Jo(){for(var e=this._name,t=this._id,n=pi(),i=this._groups,s=i.length,r=0;r<s;++r)for(var o=i[r],a=o.length,l,c=0;c<a;++c)if(l=o[c]){var h=et(l,t);$e(l,e,n,c,o,{time:h.time+h.delay+h.duration,delay:0,duration:h.duration,ease:h.ease})}return new ht(i,this._parents,e,n)}function ta(){var e,t,n=this,i=n._id,s=n.size();return new Promise(function(r,o){var a={value:o},l={value:function(){--s===0&&r()}};n.each(function(){var c=rt(this,i),h=c.on;h!==e&&(t=(e=h).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),c.on=t}),s===0&&r()})}var ea=0;function ht(e,t,n,i){this._groups=e,this._parents=t,this._name=n,this._id=i}function pi(){return++ea}var at=Wt.prototype;ht.prototype={constructor:ht,select:Lo,selectAll:To,selectChild:at.selectChild,selectChildren:at.selectChildren,filter:No,merge:Co,selection:Oo,transition:Jo,call:at.call,nodes:at.nodes,node:at.node,size:at.size,empty:at.empty,each:at.each,on:Po,attr:uo,attrTween:yo,style:Xo,styleTween:qo,text:Go,textTween:Qo,remove:Ro,tween:so,delay:xo,duration:_o,ease:So,easeVarying:ko,end:ta,[Symbol.iterator]:at[Symbol.iterator]};function na(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var ia={time:null,delay:0,duration:250,ease:na};function sa(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function ra(e){var t,n;e instanceof ht?(t=e._id,e=e._name):(t=pi(),(n=ia).time=Ge(),e=e==null?null:e+"");for(var i=this._groups,s=i.length,r=0;r<s;++r)for(var o=i[r],a=o.length,l,c=0;c<a;++c)(l=o[c])&&$e(l,e,t,c,o,n||sa(l,t));return new ht(i,this._parents,e,t)}Wt.prototype.interrupt=eo;Wt.prototype.transition=ra;const ne=e=>()=>e;function oa(e,{sourceEvent:t,target:n,transform:i,dispatch:s}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:i,enumerable:!0,configurable:!0},_:{value:s}})}function lt(e,t,n){this.k=e,this.x=t,this.y=n}lt.prototype={constructor:lt,scale:function(e){return e===1?this:new lt(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new lt(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var _e=new lt(1,0,0);gi.prototype=lt.prototype;function gi(e){for(;!e.__zoom;)if(!(e=e.parentNode))return _e;return e.__zoom}function Ce(e){e.stopImmediatePropagation()}function Ht(e){e.preventDefault(),e.stopImmediatePropagation()}function aa(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function la(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function _n(){return this.__zoom||_e}function ha(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function ca(){return navigator.maxTouchPoints||"ontouchstart"in this}function da(e,t,n){var i=e.invertX(t[0][0])-n[0][0],s=e.invertX(t[1][0])-n[1][0],r=e.invertY(t[0][1])-n[0][1],o=e.invertY(t[1][1])-n[1][1];return e.translate(s>i?(i+s)/2:Math.min(0,i)||Math.max(0,s),o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o))}function ua(){var e=aa,t=la,n=da,i=ha,s=ca,r=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],a=250,l=re,c=Ye("start","zoom","end"),h,d,f,p=500,m=150,b=0,E=10;function v(u){u.property("__zoom",_n).on("wheel.zoom",j,{passive:!1}).on("mousedown.zoom",K).on("dblclick.zoom",dt).filter(s).on("touchstart.zoom",Mt).on("touchmove.zoom",_).on("touchend.zoom touchcancel.zoom",C).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}v.transform=function(u,y,g,x){var $=u.selection?u.selection():u;$.property("__zoom",_n),u!==$?F(u,y,g,x):$.interrupt().each(function(){H(this,arguments).event(x).start().zoom(null,typeof y=="function"?y.apply(this,arguments):y).end()})},v.scaleBy=function(u,y,g,x){v.scaleTo(u,function(){var $=this.__zoom.k,z=typeof y=="function"?y.apply(this,arguments):y;return $*z},g,x)},v.scaleTo=function(u,y,g,x){v.transform(u,function(){var $=t.apply(this,arguments),z=this.__zoom,S=g==null?L($):typeof g=="function"?g.apply(this,arguments):g,M=z.invert(S),P=typeof y=="function"?y.apply(this,arguments):y;return n(A(k(z,P),S,M),$,o)},g,x)},v.translateBy=function(u,y,g,x){v.transform(u,function(){return n(this.__zoom.translate(typeof y=="function"?y.apply(this,arguments):y,typeof g=="function"?g.apply(this,arguments):g),t.apply(this,arguments),o)},null,x)},v.translateTo=function(u,y,g,x,$){v.transform(u,function(){var z=t.apply(this,arguments),S=this.__zoom,M=x==null?L(z):typeof x=="function"?x.apply(this,arguments):x;return n(_e.translate(M[0],M[1]).scale(S.k).translate(typeof y=="function"?-y.apply(this,arguments):-y,typeof g=="function"?-g.apply(this,arguments):-g),z,o)},x,$)};function k(u,y){return y=Math.max(r[0],Math.min(r[1],y)),y===u.k?u:new lt(y,u.x,u.y)}function A(u,y,g){var x=y[0]-g[0]*u.k,$=y[1]-g[1]*u.k;return x===u.x&&$===u.y?u:new lt(u.k,x,$)}function L(u){return[(+u[0][0]+ +u[1][0])/2,(+u[0][1]+ +u[1][1])/2]}function F(u,y,g,x){u.on("start.zoom",function(){H(this,arguments).event(x).start()}).on("interrupt.zoom end.zoom",function(){H(this,arguments).event(x).end()}).tween("zoom",function(){var $=this,z=arguments,S=H($,z).event(x),M=t.apply($,z),P=g==null?L(M):typeof g=="function"?g.apply($,z):g,Z=Math.max(M[1][0]-M[0][0],M[1][1]-M[0][1]),R=$.__zoom,q=typeof y=="function"?y.apply($,z):y,Q=l(R.invert(P).concat(Z/R.k),q.invert(P).concat(Z/q.k));return function(W){if(W===1)W=q;else{var nt=Q(W),At=Z/nt[2];W=new lt(At,P[0]-nt[0]*At,P[1]-nt[1]*At)}S.zoom(null,W)}})}function H(u,y,g){return!g&&u.__zooming||new D(u,y)}function D(u,y){this.that=u,this.args=y,this.active=0,this.sourceEvent=null,this.extent=t.apply(u,y),this.taps=0}D.prototype={event:function(u){return u&&(this.sourceEvent=u),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(u,y){return this.mouse&&u!=="mouse"&&(this.mouse[1]=y.invert(this.mouse[0])),this.touch0&&u!=="touch"&&(this.touch0[1]=y.invert(this.touch0[0])),this.touch1&&u!=="touch"&&(this.touch1[1]=y.invert(this.touch1[0])),this.that.__zoom=y,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(u){var y=ft(this.that).datum();c.call(u,this.that,new oa(u,{sourceEvent:this.sourceEvent,target:v,transform:this.that.__zoom,dispatch:c}),y)}};function j(u,...y){if(!e.apply(this,arguments))return;var g=H(this,y).event(u),x=this.__zoom,$=Math.max(r[0],Math.min(r[1],x.k*Math.pow(2,i.apply(this,arguments)))),z=ut(u);if(g.wheel)(g.mouse[0][0]!==z[0]||g.mouse[0][1]!==z[1])&&(g.mouse[1]=x.invert(g.mouse[0]=z)),clearTimeout(g.wheel);else{if(x.k===$)return;g.mouse=[z,x.invert(z)],le(this),g.start()}Ht(u),g.wheel=setTimeout(S,m),g.zoom("mouse",n(A(k(x,$),g.mouse[0],g.mouse[1]),g.extent,o));function S(){g.wheel=null,g.end()}}function K(u,...y){if(f||!e.apply(this,arguments))return;var g=u.currentTarget,x=H(this,y,!0).event(u),$=ft(u.view).on("mousemove.zoom",P,!0).on("mouseup.zoom",Z,!0),z=ut(u,g),S=u.clientX,M=u.clientY;yr(u.view),Ce(u),x.mouse=[z,this.__zoom.invert(z)],le(this),x.start();function P(R){if(Ht(R),!x.moved){var q=R.clientX-S,Q=R.clientY-M;x.moved=q*q+Q*Q>b}x.event(R).zoom("mouse",n(A(x.that.__zoom,x.mouse[0]=ut(R,g),x.mouse[1]),x.extent,o))}function Z(R){$.on("mousemove.zoom mouseup.zoom",null),wr(R.view,x.moved),Ht(R),x.event(R).end()}}function dt(u,...y){if(e.apply(this,arguments)){var g=this.__zoom,x=ut(u.changedTouches?u.changedTouches[0]:u,this),$=g.invert(x),z=g.k*(u.shiftKey?.5:2),S=n(A(k(g,z),x,$),t.apply(this,y),o);Ht(u),a>0?ft(this).transition().duration(a).call(F,S,x,u):ft(this).call(v.transform,S,x,u)}}function Mt(u,...y){if(e.apply(this,arguments)){var g=u.touches,x=g.length,$=H(this,y,u.changedTouches.length===x).event(u),z,S,M,P;for(Ce(u),S=0;S<x;++S)M=g[S],P=ut(M,this),P=[P,this.__zoom.invert(P),M.identifier],$.touch0?!$.touch1&&$.touch0[2]!==P[2]&&($.touch1=P,$.taps=0):($.touch0=P,z=!0,$.taps=1+!!h);h&&(h=clearTimeout(h)),z&&($.taps<2&&(d=P[0],h=setTimeout(function(){h=null},p)),le(this),$.start())}}function _(u,...y){if(this.__zooming){var g=H(this,y).event(u),x=u.changedTouches,$=x.length,z,S,M,P;for(Ht(u),z=0;z<$;++z)S=x[z],M=ut(S,this),g.touch0&&g.touch0[2]===S.identifier?g.touch0[0]=M:g.touch1&&g.touch1[2]===S.identifier&&(g.touch1[0]=M);if(S=g.that.__zoom,g.touch1){var Z=g.touch0[0],R=g.touch0[1],q=g.touch1[0],Q=g.touch1[1],W=(W=q[0]-Z[0])*W+(W=q[1]-Z[1])*W,nt=(nt=Q[0]-R[0])*nt+(nt=Q[1]-R[1])*nt;S=k(S,Math.sqrt(W/nt)),M=[(Z[0]+q[0])/2,(Z[1]+q[1])/2],P=[(R[0]+Q[0])/2,(R[1]+Q[1])/2]}else if(g.touch0)M=g.touch0[0],P=g.touch0[1];else return;g.zoom("touch",n(A(S,M,P),g.extent,o))}}function C(u,...y){if(this.__zooming){var g=H(this,y).event(u),x=u.changedTouches,$=x.length,z,S;for(Ce(u),f&&clearTimeout(f),f=setTimeout(function(){f=null},p),z=0;z<$;++z)S=x[z],g.touch0&&g.touch0[2]===S.identifier?delete g.touch0:g.touch1&&g.touch1[2]===S.identifier&&delete g.touch1;if(g.touch1&&!g.touch0&&(g.touch0=g.touch1,delete g.touch1),g.touch0)g.touch0[1]=this.__zoom.invert(g.touch0[0]);else if(g.end(),g.taps===2&&(S=ut(S,this),Math.hypot(d[0]-S[0],d[1]-S[1])<E)){var M=ft(this).on("dblclick.zoom");M&&M.apply(this,arguments)}}}return v.wheelDelta=function(u){return arguments.length?(i=typeof u=="function"?u:ne(+u),v):i},v.filter=function(u){return arguments.length?(e=typeof u=="function"?u:ne(!!u),v):e},v.touchable=function(u){return arguments.length?(s=typeof u=="function"?u:ne(!!u),v):s},v.extent=function(u){return arguments.length?(t=typeof u=="function"?u:ne([[+u[0][0],+u[0][1]],[+u[1][0],+u[1][1]]]),v):t},v.scaleExtent=function(u){return arguments.length?(r[0]=+u[0],r[1]=+u[1],v):[r[0],r[1]]},v.translateExtent=function(u){return arguments.length?(o[0][0]=+u[0][0],o[1][0]=+u[1][0],o[0][1]=+u[0][1],o[1][1]=+u[1][1],v):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},v.constrain=function(u){return arguments.length?(n=u,v):n},v.duration=function(u){return arguments.length?(a=+u,v):a},v.interpolate=function(u){return arguments.length?(l=u,v):l},v.on=function(){var u=c.on.apply(c,arguments);return u===c?v:u},v.clickDistance=function(u){return arguments.length?(b=(u=+u)*u,v):Math.sqrt(b)},v.tapDistance=function(u){return arguments.length?(E=+u,v):E},v}var zn;(function(e){e.Strict="strict",e.Loose="loose"})(zn||(zn={}));var Ot;(function(e){e.Free="free",e.Vertical="vertical",e.Horizontal="horizontal"})(Ot||(Ot={}));var Sn;(function(e){e.Partial="partial",e.Full="full"})(Sn||(Sn={}));var En;(function(e){e.Bezier="default",e.Straight="straight",e.Step="step",e.SmoothStep="smoothstep",e.SimpleBezier="simplebezier"})(En||(En={}));var kn;(function(e){e.Arrow="arrow",e.ArrowClosed="arrowclosed"})(kn||(kn={}));exports.Position=void 0;(function(e){e.Left="left",e.Top="top",e.Right="right",e.Bottom="bottom"})(exports.Position||(exports.Position={}));exports.Position.Left+"",exports.Position.Right,exports.Position.Right+"",exports.Position.Left,exports.Position.Top+"",exports.Position.Bottom,exports.Position.Bottom+"",exports.Position.Top;const fa=(e,t=0,n=1)=>Math.min(Math.max(e,t),n),Nn=e=>!isNaN(e)&&isFinite(e),mi=()=>typeof navigator<"u"&&navigator?.userAgent?.indexOf("Mac")>=0;function pa({sourceX:e,sourceY:t,targetX:n,targetY:i,sourceControlX:s,sourceControlY:r,targetControlX:o,targetControlY:a}){const l=e*.125+s*.375+o*.375+n*.125,c=t*.125+r*.375+a*.375+i*.125,h=Math.abs(l-e),d=Math.abs(c-t);return[l,c,h,d]}function ie(e,t){return e>=0?.5*e:t*25*Math.sqrt(-e)}function Cn({pos:e,x1:t,y1:n,x2:i,y2:s,c:r}){switch(e){case exports.Position.Left:return[t-ie(t-i,r),n];case exports.Position.Right:return[t+ie(i-t,r),n];case exports.Position.Top:return[t,n-ie(n-s,r)];case exports.Position.Bottom:return[t,n+ie(s-n,r)]}}function ga({sourceX:e,sourceY:t,sourcePosition:n=exports.Position.Bottom,targetX:i,targetY:s,targetPosition:r=exports.Position.Top,curvature:o=.25}){const[a,l]=Cn({pos:n,x1:e,y1:t,x2:i,y2:s,c:o}),[c,h]=Cn({pos:r,x1:i,y1:s,x2:e,y2:t,c:o}),[d,f,p,m]=pa({sourceX:e,sourceY:t,targetX:i,targetY:s,sourceControlX:a,sourceControlY:l,targetControlX:c,targetControlY:h});return[`M${e},${t} C${a},${l} ${c},${h} ${i},${s}`,d,f,p,m]}function yi({sourceX:e,sourceY:t,targetX:n,targetY:i}){const s=Math.abs(n-e)/2,r=n<e?n+s:n-s,o=Math.abs(i-t)/2,a=i<t?i+o:i-o;return[r,a,s,o]}function ma({sourceX:e,sourceY:t,targetX:n,targetY:i}){const[s,r,o,a]=yi({sourceX:e,sourceY:t,targetX:n,targetY:i});return[`M ${e},${t}L ${n},${i}`,s,r,o,a]}const Mn={[exports.Position.Left]:{x:-1,y:0},[exports.Position.Right]:{x:1,y:0},[exports.Position.Top]:{x:0,y:-1},[exports.Position.Bottom]:{x:0,y:1}},ya=({source:e,sourcePosition:t=exports.Position.Bottom,target:n})=>t===exports.Position.Left||t===exports.Position.Right?e.x<n.x?{x:1,y:0}:{x:-1,y:0}:e.y<n.y?{x:0,y:1}:{x:0,y:-1},An=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function wa({source:e,sourcePosition:t=exports.Position.Bottom,target:n,targetPosition:i=exports.Position.Top,center:s,offset:r,stepPosition:o}){const a=Mn[t],l=Mn[i],c={x:e.x+a.x*r,y:e.y+a.y*r},h={x:n.x+l.x*r,y:n.y+l.y*r},d=ya({source:c,sourcePosition:t,target:h}),f=d.x!==0?"x":"y",p=d[f];let m=[],b,E;const v={x:0,y:0},k={x:0,y:0},[,,A,L]=yi({sourceX:e.x,sourceY:e.y,targetX:n.x,targetY:n.y});if(a[f]*l[f]===-1){f==="x"?(b=s.x??c.x+(h.x-c.x)*o,E=s.y??(c.y+h.y)/2):(b=s.x??(c.x+h.x)/2,E=s.y??c.y+(h.y-c.y)*o);const H=[{x:b,y:c.y},{x:b,y:h.y}],D=[{x:c.x,y:E},{x:h.x,y:E}];a[f]===p?m=f==="x"?H:D:m=f==="x"?D:H}else{const H=[{x:c.x,y:h.y}],D=[{x:h.x,y:c.y}];if(f==="x"?m=a.x===p?D:H:m=a.y===p?H:D,t===i){const _=Math.abs(e[f]-n[f]);if(_<=r){const C=Math.min(r-1,r-_);a[f]===p?v[f]=(c[f]>e[f]?-1:1)*C:k[f]=(h[f]>n[f]?-1:1)*C}}if(t!==i){const _=f==="x"?"y":"x",C=a[f]===l[_],u=c[_]>h[_],y=c[_]<h[_];(a[f]===1&&(!C&&u||C&&y)||a[f]!==1&&(!C&&y||C&&u))&&(m=f==="x"?H:D)}const j={x:c.x+v.x,y:c.y+v.y},K={x:h.x+k.x,y:h.y+k.y},dt=Math.max(Math.abs(j.x-m[0].x),Math.abs(K.x-m[0].x)),Mt=Math.max(Math.abs(j.y-m[0].y),Math.abs(K.y-m[0].y));dt>=Mt?(b=(j.x+K.x)/2,E=m[0].y):(b=m[0].x,E=(j.y+K.y)/2)}return[[e,{x:c.x+v.x,y:c.y+v.y},...m,{x:h.x+k.x,y:h.y+k.y},n],b,E,A,L]}function va(e,t,n,i){const s=Math.min(An(e,t)/2,An(t,n)/2,i),{x:r,y:o}=t;if(e.x===r&&r===n.x||e.y===o&&o===n.y)return`L${r} ${o}`;if(e.y===o){const c=e.x<n.x?-1:1,h=e.y<n.y?1:-1;return`L ${r+s*c},${o}Q ${r},${o} ${r},${o+s*h}`}const a=e.x<n.x?1:-1,l=e.y<n.y?-1:1;return`L ${r},${o+s*l}Q ${r},${o} ${r+s*a},${o}`}function xa({sourceX:e,sourceY:t,sourcePosition:n=exports.Position.Bottom,targetX:i,targetY:s,targetPosition:r=exports.Position.Top,borderRadius:o=5,centerX:a,centerY:l,offset:c=20,stepPosition:h=.5}){const[d,f,p,m,b]=wa({source:{x:e,y:t},sourcePosition:n,target:{x:i,y:s},targetPosition:r,center:{x:a,y:l},offset:c,stepPosition:h});return[d.reduce((v,k,A)=>{let L="";return A>0&&A<d.length-1?L=va(d[A-1],k,d[A+1],o):L=`${A===0?"M":"L"}${k.x} ${k.y}`,v+=L,v},""),f,p,m,b]}const ba=(e,t)=>e.x!==t.x||e.y!==t.y||e.zoom!==t.k,ze=e=>({x:e.x,y:e.y,zoom:e.k}),Me=({x:e,y:t,zoom:n})=>_e.translate(e,t).scale(n),St=(e,t)=>e.target.closest(`.${t}`),wi=(e,t)=>t===2&&Array.isArray(e)&&e.includes(2),$a=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,Ae=(e,t=0,n=$a,i=()=>{})=>{const s=typeof t=="number"&&t>0;return s||i(),s?e.transition().duration(t).ease(n).on("end",i):e},vi=e=>{const t=e.ctrlKey&&mi()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*t};function _a({zoomPanValues:e,noWheelClassName:t,d3Selection:n,d3Zoom:i,panOnScrollMode:s,panOnScrollSpeed:r,zoomOnPinch:o,onPanZoomStart:a,onPanZoom:l,onPanZoomEnd:c}){return h=>{if(St(h,t))return h.ctrlKey&&h.preventDefault(),!1;h.preventDefault(),h.stopImmediatePropagation();const d=n.property("__zoom").k||1;if(h.ctrlKey&&o){const E=ut(h),v=vi(h),k=d*Math.pow(2,v);i.scaleTo(n,k,E,h);return}const f=h.deltaMode===1?20:1;let p=s===Ot.Vertical?0:h.deltaX*f,m=s===Ot.Horizontal?0:h.deltaY*f;!mi()&&h.shiftKey&&s!==Ot.Vertical&&(p=h.deltaY*f,m=0),i.translateBy(n,-(p/d)*r,-(m/d)*r,{internal:!0});const b=ze(n.property("__zoom"));clearTimeout(e.panScrollTimeout),e.isPanScrolling||(e.isPanScrolling=!0),e.isPanScrolling&&(l?.(h,b),e.panScrollTimeout=setTimeout(()=>{e.isPanScrolling=!1},150))}}function za({noWheelClassName:e,preventScrolling:t,d3ZoomHandler:n}){return function(i,s){const r=i.type==="wheel",o=!t&&r&&!i.ctrlKey,a=St(i,e);if(i.ctrlKey&&r&&a&&i.preventDefault(),o||a)return null;i.preventDefault(),n.call(this,i,s)}}function Sa({zoomPanValues:e,onDraggingChange:t,onPanZoomStart:n}){return i=>{if(i.sourceEvent?.internal)return;const s=ze(i.transform);e.mouseButton=i.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=s,i.sourceEvent?.type==="mousedown"&&t(!0),n&&n?.(i.sourceEvent,s)}}function Ea({zoomPanValues:e,panOnDrag:t,onPaneContextMenu:n,onTransformChange:i,onPanZoom:s}){return r=>{e.usedRightMouseButton=!!(n&&wi(t,e.mouseButton??0)),r.sourceEvent?.sync||i([r.transform.x,r.transform.y,r.transform.k]),s&&!r.sourceEvent?.internal&&s?.(r.sourceEvent,ze(r.transform))}}function ka({zoomPanValues:e,panOnDrag:t,panOnScroll:n,onDraggingChange:i,onPanZoomEnd:s,onPaneContextMenu:r}){return o=>{if(!o.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,r&&wi(t,e.mouseButton??0)&&!e.usedRightMouseButton&&o.sourceEvent&&r(o.sourceEvent),e.usedRightMouseButton=!1,i(!1),s&&ba(e.prevViewport,o.transform))){const a=ze(o.transform);e.prevViewport=a,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{s?.(o.sourceEvent,a)},n?150:0)}}}function Na({zoomActivationKeyPressed:e,zoomOnScroll:t,zoomOnPinch:n,panOnDrag:i,panOnScroll:s,zoomOnDoubleClick:r,userSelectionActive:o,noWheelClassName:a,noPanClassName:l,lib:c,connectionInProgress:h}){return d=>{const f=e||t,p=n&&d.ctrlKey,m=d.type==="wheel";if(d.button===1&&d.type==="mousedown"&&(St(d,`${c}-flow__node`)||St(d,`${c}-flow__edge`)))return!0;if(!i&&!f&&!s&&!r&&!n||o||h&&!m||St(d,a)&&m||St(d,l)&&(!m||s&&m&&!e)||!n&&d.ctrlKey&&m)return!1;if(!n&&d.type==="touchstart"&&d.touches?.length>1)return d.preventDefault(),!1;if(!f&&!s&&!p&&m||!i&&(d.type==="mousedown"||d.type==="touchstart")||Array.isArray(i)&&!i.includes(d.button)&&d.type==="mousedown")return!1;const b=Array.isArray(i)&&i.includes(d.button)||!d.button||d.button<=1;return(!d.ctrlKey||m)&&b}}function Ca({domNode:e,minZoom:t,maxZoom:n,paneClickDistance:i,translateExtent:s,viewport:r,onPanZoom:o,onPanZoomStart:a,onPanZoomEnd:l,onDraggingChange:c}){const h={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{x:0,y:0,zoom:0},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},d=e.getBoundingClientRect(),f=ua().clickDistance(!Nn(i)||i<0?0:i).scaleExtent([t,n]).translateExtent(s),p=ft(e).call(f);A({x:r.x,y:r.y,zoom:fa(r.zoom,t,n)},[[0,0],[d.width,d.height]],s);const m=p.on("wheel.zoom"),b=p.on("dblclick.zoom");f.wheelDelta(vi);function E(_,C){return p?new Promise(u=>{f?.interpolate(C?.interpolate==="linear"?Dt:re).transform(Ae(p,C?.duration,C?.ease,()=>u(!0)),_)}):Promise.resolve(!1)}function v({noWheelClassName:_,noPanClassName:C,onPaneContextMenu:u,userSelectionActive:y,panOnScroll:g,panOnDrag:x,panOnScrollMode:$,panOnScrollSpeed:z,preventScrolling:S,zoomOnPinch:M,zoomOnScroll:P,zoomOnDoubleClick:Z,zoomActivationKeyPressed:R,lib:q,onTransformChange:Q,connectionInProgress:W}){y&&!h.isZoomingOrPanning&&k();const At=g&&!R&&!y?_a({zoomPanValues:h,noWheelClassName:_,d3Selection:p,d3Zoom:f,panOnScrollMode:$,panOnScrollSpeed:z,zoomOnPinch:M,onPanZoomStart:a,onPanZoom:o,onPanZoomEnd:l}):za({noWheelClassName:_,preventScrolling:S,d3ZoomHandler:m});if(p.on("wheel.zoom",At,{passive:!1}),!y){const Pi=Sa({zoomPanValues:h,onDraggingChange:c,onPanZoomStart:a});f.on("start",Pi);const Hi=Ea({zoomPanValues:h,panOnDrag:x,onPaneContextMenu:!!u,onPanZoom:o,onTransformChange:Q});f.on("zoom",Hi);const Ri=ka({zoomPanValues:h,panOnDrag:x,panOnScroll:g,onPaneContextMenu:u,onPanZoomEnd:l,onDraggingChange:c});f.on("end",Ri)}const Ai=Na({zoomActivationKeyPressed:R,panOnDrag:x,zoomOnScroll:P,panOnScroll:g,zoomOnDoubleClick:Z,zoomOnPinch:M,userSelectionActive:y,noPanClassName:C,noWheelClassName:_,lib:q,connectionInProgress:W});f.filter(Ai),Z?p.on("dblclick.zoom",b):p.on("dblclick.zoom",null)}function k(){f.on("zoom",null)}async function A(_,C,u){const y=Me(_),g=f?.constrain()(y,C,u);return g&&await E(g),new Promise(x=>x(g))}async function L(_,C){const u=Me(_);return await E(u,C),new Promise(y=>y(u))}function F(_){if(p){const C=Me(_),u=p.property("__zoom");(u.k!==_.zoom||u.x!==_.x||u.y!==_.y)&&f?.transform(p,C,null,{sync:!0})}}function H(){const _=p?gi(p.node()):{x:0,y:0,k:1};return{x:_.x,y:_.y,zoom:_.k}}function D(_,C){return p?new Promise(u=>{f?.interpolate(C?.interpolate==="linear"?Dt:re).scaleTo(Ae(p,C?.duration,C?.ease,()=>u(!0)),_)}):Promise.resolve(!1)}function j(_,C){return p?new Promise(u=>{f?.interpolate(C?.interpolate==="linear"?Dt:re).scaleBy(Ae(p,C?.duration,C?.ease,()=>u(!0)),_)}):Promise.resolve(!1)}function K(_){f?.scaleExtent(_)}function dt(_){f?.translateExtent(_)}function Mt(_){const C=!Nn(_)||_<0?0:_;f?.clickDistance(C)}return{update:v,destroy:k,setViewport:L,setViewportConstrained:A,getViewport:H,scaleTo:D,scaleBy:j,setScaleExtent:K,setTranslateExtent:dt,syncViewport:F,setClickDistance:Mt}}var Pn;(function(e){e.Line="line",e.Handle="handle"})(Pn||(Pn={}));class xi{constructor(t={}){this.container=null,this.state={nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},this.subscribers=new Set,this.panZoomInstance=null,this.pendingNodes=[],this.options={minZoom:.5,maxZoom:2,defaultZoom:1,nodesDraggable:!0,nodesConnectable:!0,elementsSelectable:!0,...t},this.state.nodes=t.nodes||[],this.state.edges=t.edges||[],this.updateLookups()}mount(t){this.container=t,this.panZoomInstance=Ca({domNode:t,minZoom:this.options.minZoom||.5,maxZoom:this.options.maxZoom||2,paneClickDistance:0,translateExtent:[[-1/0,-1/0],[1/0,1/0]],viewport:this.state.viewport,onDraggingChange:n=>{this.container?.classList.toggle("panning",n)},onPanZoom:(n,i)=>{this.state.viewport=i,this.notifySubscribers()},onPanZoomStart:(n,i)=>{},onPanZoomEnd:(n,i)=>{}}),this.panZoomInstance.update({noWheelClassName:"nowheel",noPanClassName:"nopan",onPaneContextMenu:void 0,preventScrolling:!0,panOnScroll:!0,panOnDrag:!0,panOnScrollMode:"free",panOnScrollSpeed:.8,userSelectionActive:!1,zoomOnPinch:!0,zoomOnScroll:!0,zoomOnDoubleClick:!0,zoomActivationKeyPressed:!1,lib:"lit-flow",onTransformChange:n=>{},connectionInProgress:!1}),this.notifySubscribers()}destroy(){this.panZoomInstance?.destroy(),this.panZoomInstance=null,this.container=null,this.subscribers.clear()}getState(){return this.state}get nodes(){return this.state.nodes}get edges(){return this.state.edges}getViewport(){return this.state.viewport}setViewport(t){this.state.viewport=t,this.panZoomInstance?.setViewport?.(t),this.notifySubscribers()}setNodes(t){this.pendingNodes.push(...t.map(n=>n.id)),this.state.nodes=t,this.updateLookups(),this.notifySubscribers()}setEdges(t){this.retryEdgeRendering(t)}updateNode(t,n){this.state.nodes=this.state.nodes.map(i=>i.id===t?{...i,...n}:i),this.updateLookups(),this.notifySubscribers()}updateEdge(t,n){this.state.edges=this.state.edges.map(i=>i.id===t?{...i,...n}:i),this.updateLookups(),this.notifySubscribers()}addNode(t){this.state.nodes=[...this.state.nodes,t],this.updateLookups(),this.notifySubscribers()}removeNode(t){this.state.nodes=this.state.nodes.filter(n=>n.id!==t),this.state.edges=this.state.edges.filter(n=>n.source!==t&&n.target!==t),this.updateLookups(),this.notifySubscribers()}addEdge(t){this.state.edges=[...this.state.edges,t],this.updateLookups(),this.notifySubscribers()}removeEdge(t){this.state.edges=this.state.edges.filter(n=>n.id!==t),this.updateLookups(),this.notifySubscribers()}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}zoomIn(){const t=this.state.viewport.zoom,n=Math.min(t*1.2,this.options.maxZoom||2);this.setViewport({...this.state.viewport,zoom:n})}zoomOut(){const t=this.state.viewport.zoom,n=Math.max(t/1.2,this.options.minZoom||.5);this.setViewport({...this.state.viewport,zoom:n})}fitView(){if(this.state.nodes.length===0||!this.container)return;let t=1/0,n=1/0,i=-1/0,s=-1/0;this.state.nodes.forEach(m=>{const b=m.measured?.width||m.width||150,E=m.measured?.height||m.height||50;t=Math.min(t,m.position.x),n=Math.min(n,m.position.y),i=Math.max(i,m.position.x+b),s=Math.max(s,m.position.y+E)});const r={x:t,y:n,width:i-t,height:s-n},o=this.container.clientWidth,a=this.container.clientHeight,l=50,c=(o-l*2)/r.width,h=(a-l*2)/r.height,d=Math.min(c,h,this.options.maxZoom||2),f=(o-r.width*d)/2-r.x*d,p=(a-r.height*d)/2-r.y*d;this.setViewport({x:f,y:p,zoom:d})}updateLookups(){this.state.nodeLookup.clear(),this.state.nodes.forEach(t=>{const n={...t,measured:t.measured||{width:t.width,height:t.height},internals:{positionAbsolute:t.position,z:t.zIndex||0,userNode:t}};this.state.nodeLookup.set(t.id,n)}),this.state.edgeLookup.clear(),this.state.edges.forEach(t=>{this.state.edgeLookup.set(t.id,t)})}isNodeRendered(t){if(!this.container)return!1;const n=this.container.querySelector(`[id="${CSS.escape(t)}"]`);if(!n)return!1;const i=n.getBoundingClientRect();return i.width>0&&i.height>0}hasPendingNodes(t){return t.some(n=>this.pendingNodes.includes(n)||!this.isNodeRendered(n))}markNodeAsRendered(t){const n=this.pendingNodes.indexOf(t);n>-1&&this.pendingNodes.splice(n,1)}retryEdgeRendering(t,n=0,i=10){const s=t.flatMap(o=>[o.source,o.target]),r=[...new Set(s)];this.hasPendingNodes(r)&&n<i?setTimeout(()=>{this.retryEdgeRendering(t,n+1,i)},100):(this.state.edges=t,this.updateLookups(),this.notifySubscribers(),r.forEach(o=>this.markNodeAsRendered(o)))}notifySubscribers(){this.subscribers.forEach(t=>t(this.state))}}function Ma(e={}){const t={nodes:e.nodes||[],edges:e.edges||[],viewport:e.viewport||{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},n=new Set,i=()=>{t.nodeLookup.clear(),t.nodes.forEach(s=>{const r={...s,measured:s.measured||{width:s.width,height:s.height},internals:{positionAbsolute:s.position,z:s.zIndex||0,userNode:s}};t.nodeLookup.set(s.id,r)}),t.edgeLookup.clear(),t.edges.forEach(s=>{t.edgeLookup.set(s.id,s)})};return i(),{getState:()=>t,setState:s=>{Object.assign(t,s),i(),n.forEach(r=>r(t))},subscribe:s=>(n.add(s),()=>n.delete(s))}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=globalThis,Qe=he.ShadowRoot&&(he.ShadyCSS===void 0||he.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Je=Symbol(),Hn=new WeakMap;let bi=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Je)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Qe&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=Hn.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Hn.set(n,t))}return t}toString(){return this.cssText}};const Aa=e=>new bi(typeof e=="string"?e:e+"",void 0,Je),B=(e,...t)=>{const n=e.length===1?e[0]:t.reduce(((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1]),e[0]);return new bi(n,e,Je)},Pa=(e,t)=>{if(Qe)e.adoptedStyleSheets=t.map((n=>n instanceof CSSStyleSheet?n:n.styleSheet));else for(const n of t){const i=document.createElement("style"),s=he.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},Rn=Qe?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Aa(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ha,defineProperty:Ra,getOwnPropertyDescriptor:La,getOwnPropertyNames:Ta,getOwnPropertySymbols:Da,getPrototypeOf:Oa}=Object,Se=globalThis,Ln=Se.trustedTypes,Ba=Ln?Ln.emptyScript:"",Fa=Se.reactiveElementPolyfillSupport,Bt=(e,t)=>e,ye={toAttribute(e,t){switch(t){case Boolean:e=e?Ba:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},tn=(e,t)=>!Ha(e,t),Tn={attribute:!0,type:String,converter:ye,reflect:!1,useDefault:!1,hasChanged:tn};Symbol.metadata??=Symbol("metadata"),Se.litPropertyMetadata??=new WeakMap;let zt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Tn){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Ra(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:r}=La(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:s,set(o){const a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Tn}static _$Ei(){if(this.hasOwnProperty(Bt("elementProperties")))return;const t=Oa(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Bt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Bt("properties"))){const n=this.properties,i=[...Ta(n),...Da(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(Rn(s))}else t!==void 0&&n.push(Rn(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pa(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:ye).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ye;this._$Em=s;const a=o.fromAttribute(n,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,n,i){if(t!==void 0){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??tn)(r,n)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(n)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach((n=>n.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};zt.elementStyles=[],zt.shadowRootOptions={mode:"open"},zt[Bt("elementProperties")]=new Map,zt[Bt("finalized")]=new Map,Fa?.({ReactiveElement:zt}),(Se.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const en=globalThis,we=en.trustedTypes,Dn=we?we.createPolicy("lit-html",{createHTML:e=>e}):void 0,$i="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,_i="?"+pt,Ia=`<${_i}>`,bt=document,Xt=()=>bt.createComment(""),Yt=e=>e===null||typeof e!="object"&&typeof e!="function",nn=Array.isArray,Ua=e=>nn(e)||typeof e?.[Symbol.iterator]=="function",Pe=`[ 	
\f\r]`,Rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,On=/-->/g,Bn=/>/g,gt=RegExp(`>|${Pe}(?:([^\\s"'>=/]+)(${Pe}*=${Pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fn=/'/g,In=/"/g,zi=/^(?:script|style|textarea|title)$/i,Si=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),N=Si(1),G=Si(2),$t=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),Un=new WeakMap,yt=bt.createTreeWalker(bt,129);function Ei(e,t){if(!nn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Dn!==void 0?Dn.createHTML(t):t}const Xa=(e,t)=>{const n=e.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=Rt;for(let a=0;a<n;a++){const l=e[a];let c,h,d=-1,f=0;for(;f<l.length&&(o.lastIndex=f,h=o.exec(l),h!==null);)f=o.lastIndex,o===Rt?h[1]==="!--"?o=On:h[1]!==void 0?o=Bn:h[2]!==void 0?(zi.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=gt):h[3]!==void 0&&(o=gt):o===gt?h[0]===">"?(o=s??Rt,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?gt:h[3]==='"'?In:Fn):o===In||o===Fn?o=gt:o===On||o===Bn?o=Rt:(o=gt,s=void 0);const p=o===gt&&e[a+1].startsWith("/>")?" ":"";r+=o===Rt?l+Ia:d>=0?(i.push(c),l.slice(0,d)+$i+l.slice(d)+pt+p):l+pt+(d===-2?a:p)}return[Ei(e,r+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Zt{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[c,h]=Xa(t,n);if(this.el=Zt.createElement(c,i),yt.currentNode=this.el.content,n===2||n===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=yt.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith($i)){const f=h[o++],p=s.getAttribute(d).split(pt),m=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:m[2],strings:p,ctor:m[1]==="."?Za:m[1]==="?"?qa:m[1]==="@"?Wa:Ee}),s.removeAttribute(d)}else d.startsWith(pt)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(zi.test(s.tagName)){const d=s.textContent.split(pt),f=d.length-1;if(f>0){s.textContent=we?we.emptyScript:"";for(let p=0;p<f;p++)s.append(d[p],Xt()),yt.nextNode(),l.push({type:2,index:++r});s.append(d[f],Xt())}}}else if(s.nodeType===8)if(s.data===_i)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(pt,d+1))!==-1;)l.push({type:7,index:r}),d+=pt.length-1}r++}}static createElement(t,n){const i=bt.createElement("template");return i.innerHTML=t,i}}function Ct(e,t,n=e,i){if(t===$t)return t;let s=i!==void 0?n._$Co?.[i]:n._$Cl;const r=Yt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??=[])[i]=s:n._$Cl=s),s!==void 0&&(t=Ct(e,s._$AS(e,t.values),s,i)),t}class Ya{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=(t?.creationScope??bt).importNode(n,!0);yt.currentNode=s;let r=yt.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Gt(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Va(r,this,t)),this._$AV.push(c),l=i[++a]}o!==l?.index&&(r=yt.nextNode(),o++)}return yt.currentNode=bt,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}class Gt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Ct(this,t,n),Yt(t)?t===T||t==null||t===""?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==$t&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ua(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==T&&Yt(this._$AH)?this._$AA.nextSibling.data=t:this.T(bt.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Zt.createElement(Ei(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(n);else{const r=new Ya(s,this),o=r.u(this.options);r.p(n),this.T(o),this._$AH=r}}_$AC(t){let n=Un.get(t.strings);return n===void 0&&Un.set(t.strings,n=new Zt(t)),n}k(t){nn(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const r of t)s===n.length?n.push(i=new Gt(this.O(Xt()),this.O(Xt()),this,this.options)):i=n[s],i._$AI(r),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,r){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=T}_$AI(t,n=this,i,s){const r=this.strings;let o=!1;if(r===void 0)t=Ct(this,t,n,0),o=!Yt(t)||t!==this._$AH&&t!==$t,o&&(this._$AH=t);else{const a=t;let l,c;for(t=r[0],l=0;l<r.length-1;l++)c=Ct(this,a[i+l],n,l),c===$t&&(c=this._$AH[l]),o||=!Yt(c)||c!==this._$AH[l],c===T?t=T:t!==T&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Za extends Ee{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}class qa extends Ee{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}}class Wa extends Ee{constructor(t,n,i,s,r){super(t,n,i,s,r),this.type=5}_$AI(t,n=this){if((t=Ct(this,t,n,0)??T)===$t)return;const i=this._$AH,s=t===T&&i!==T||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==T&&(i===T||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Va{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ct(this,t)}}const Ga=en.litHtmlPolyfillSupport;Ga?.(Zt,Gt),(en.litHtmlVersions??=[]).push("3.3.1");const ja=(e,t,n)=>{const i=n?.renderBefore??t;let s=i._$litPart$;if(s===void 0){const r=n?.renderBefore??null;i._$litPart$=s=new Gt(t.insertBefore(Xt(),r),r,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const sn=globalThis;let O=class extends zt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ja(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}};O._$litElement$=!0,O.finalized=!0,sn.litElementHydrateSupport?.({LitElement:O});const Ka=sn.litElementPolyfillSupport;Ka?.({LitElement:O});(sn.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ki=Symbol.for(""),Qa=e=>{if(e?.r===ki)return e?._$litStatic$},Ja=e=>({_$litStatic$:e,r:ki}),Xn=new Map,tl=e=>(t,...n)=>{const i=n.length;let s,r;const o=[],a=[];let l,c=0,h=!1;for(;c<i;){for(l=t[c];c<i&&(r=n[c],(s=Qa(r))!==void 0);)l+=s+t[++c],h=!0;c!==i&&a.push(r),o.push(l),c++}if(c===i&&o.push(t[i]),h){const d=o.join("$$lit$$");(t=Xn.get(d))===void 0&&(o.raw=o,Xn.set(d,t=o)),n=a}return e(t,...n)},J=tl(N);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=e=>(t,n)=>{n!==void 0?n.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const el={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:tn},nl=(e=el,t,n)=>{const{kind:i,metadata:s}=n;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(n.name,e),i==="accessor"){const{name:o}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,e)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(i==="setter"){const{name:o}=n;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,e)}}throw Error("Unsupported decorator location: "+i)};function w(e){return(t,n)=>typeof n=="object"?nl(e,t,n):((i,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const il={ATTRIBUTE:1},sl=e=>(...t)=>({_$litDirective$:e,values:t});let rl=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ni="important",ol=" !"+Ni,al=sl(class extends rl{constructor(e){if(super(e),e.type!==il.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,n)=>{const i=e[n];return i==null?t:t+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`}),"")}update(e,[t]){const{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?n.removeProperty(i):n[i]=null);for(const i in t){const s=t[i];if(s!=null){this.ft.add(i);const r=typeof s=="string"&&s.endsWith(ol);i.includes("-")||r?n.setProperty(i,r?s.slice(0,-11):s,r?Ni:""):n[i]=s}}return $t}});function ll(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function hl(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function ve(e){return ga(e)}function Xe(e){return xa(e)}function Ci(e){return ma(e)}function cl(e,t){return e.x>=t.x&&e.x<=t.x+t.width&&e.y>=t.y&&e.y<=t.y+t.height}var dl=Object.defineProperty,ul=Object.getOwnPropertyDescriptor,jt=(e,t,n,i)=>{for(var s=i>1?void 0:i?ul(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&dl(t,n,s),s};exports.FlowCanvas=class extends O{constructor(){super(),this.nodes=[],this.edges=[],this.viewport={x:0,y:0,zoom:1},this.nodeTypes={default:"flow-node",shape:"shape-node","erd-table":"erd-table-node"},this.connection=null,this.onHandleStart=t=>{const{nodeId:n,type:i,handleId:s}=t.detail;this.connection={from:{nodeId:n,handleId:s}}},this.onMouseMove=t=>{if(!this.connection)return;const n=this.screenToCanvas(t.clientX,t.clientY);this.connection.preview=n,this.requestUpdate()},this.onMouseUp=t=>{if(!this.connection)return;const n=t.composedPath();let i=null,s;for(const o of n)if(o instanceof HTMLElement){const a=o.tagName.toLowerCase();if(a==="flow-node"||Object.values(this.nodeTypes).some(l=>l===a)){i=o;break}o.dataset.handleId&&(s=o.dataset.handleId)}const r=i?.getAttribute("id")||void 0;if(this.connection.from&&r&&r!==this.connection.from.nodeId){const o=`e-${this.connection.from.nodeId}-${r}-${Date.now()}`,a=this.connection.from.nodeId,l=this.connection.from.handleId;let c=s;if(!c){const h=this.nodes.find(d=>d.id===r);h&&h.type==="shape"&&(c=this.determineBestTargetHandle(a,r),console.log("Auto-determined target handle:",{sourceNodeId:a,targetId:r,finalTargetHandleId:c}))}this.instance.addEdge({id:o,source:a,target:r,sourceHandle:l,targetHandle:c,data:{}})}this.connection=null,this.requestUpdate()},this.onNodeSelect=t=>{const{nodeId:n,selected:i,node:s}=t.detail;this.instance.updateNode(n,{selected:i}),this.dispatchEvent(new CustomEvent("node-selected",{detail:{nodeId:n,selected:i,node:s,allSelectedNodes:this.nodes.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.onEdgeSelect=t=>{const{edgeId:n,selected:i,edge:s}=t.detail;this.instance.updateEdge(n,{selected:i}),this.dispatchEvent(new CustomEvent("edge-selected",{detail:{edgeId:n,selected:i,edge:s,allSelectedEdges:this.edges.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.instance=new xi({nodes:this.nodes,edges:this.edges})}createRenderRoot(){return super.createRenderRoot()}getNodeGeom(t){const n=this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`),i=this.renderRoot.querySelector(".flow-viewport");if(!n||!i)return null;const s=n.getBoundingClientRect(),r=i.getBoundingClientRect(),o=this.viewport.zoom||1,a=(s.left-r.left-this.viewport.x)/o,l=(s.top-r.top-this.viewport.y)/o,c=s.width/o,h=s.height/o,d=l+h/2;return{left:{x:a,y:d},right:{x:a+c,y:d}}}getHandleCanvasPosition(t,n){const i=this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);if(!i)return null;let s=null;const r=i.shadowRoot;if(r&&(s=r.querySelector(`[data-handle-id="${CSS.escape(n)}"]`)),s||(s=i.querySelector(`[data-handle-id="${CSS.escape(n)}"]`)),!s)return null;const o=this.nodes.find(f=>f.id===t);if(!o)return null;if(o.type==="shape")return console.log("getHandleCanvasPosition for shape node:",{nodeId:t,handleId:n,node:o}),this.getShapeHandlePosition(o,n);const a=i.getBoundingClientRect(),l=s.getBoundingClientRect(),c=this.viewport.zoom||1,h=(l.left+l.width/2-a.left)/c,d=(l.top+l.height/2-a.top)/c;return{x:o.position.x+h,y:o.position.y+d}}getShapeHandlePosition(t,n){const i=t.data;if(!i)return null;const s=i.size||{width:200,height:200},r=s.width,o=s.height,a=n.split("-"),l=a[a.length-1];console.log("getShapeHandlePosition:",{handleId:n,parts:a,handleType:l,node:t.id,size:s});let c=0,h=0;switch(l){case"right":c=r,h=o/2;break;case"left":c=0,h=o/2;break;case"top":c=r/2,h=0;break;case"bottom":c=r/2,h=o;break;default:c=r/2,h=o/2}const d={x:t.position.x+c,y:t.position.y+h};return console.log("getShapeHandlePosition result:",{nodeId:t.id,position:t.position,offsetX:c,offsetY:h,result:d}),d}setNodes(t){this.instance.setNodes(t)}setEdges(t){this.instance.setEdges(t)}determineBestTargetHandle(t,n){const i=this.nodes.find(k=>k.id===t),s=this.nodes.find(k=>k.id===n);if(!i||!s)return`${n}-target-left`;const r=i.position.x,o=i.position.y,a=s.position.x,l=s.position.y,c=s.data,h=c?.size?.width||200,d=c?.size?.height||200,f=r+(i.width||150)/2,p=o+(i.height||50)/2,m=a+h/2,b=l+d/2,E=m-f,v=b-p;return Math.abs(E)>Math.abs(v)?E>0?`${n}-target-left`:`${n}-target-right`:v>0?`${n}-target-top`:`${n}-target-bottom`}computeLabelCanvasPosition(t){const n=this.nodes.find(h=>h.id===t.source),i=this.nodes.find(h=>h.id===t.target);if(!n||!i)return null;let s,r,o,a;if(t.sourceHandle){const h=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(h)s=h.x,r=h.y;else{const d=n.measured?.width||n.width||150,f=n.measured?.height||n.height||50;s=n.position.x+d,r=n.position.y+f/2}}else{const h=n.measured?.width||n.width||150,d=n.measured?.height||n.height||50;s=n.position.x+h,r=n.position.y+d/2}if(t.targetHandle){const h=this.getHandleCanvasPosition(t.target,t.targetHandle);if(h)o=h.x,a=h.y;else{o=i.position.x;const d=i.measured?.height||i.height||50;a=i.position.y+d/2}}else{o=i.position.x;const h=i.measured?.height||i.height||50;a=i.position.y+h/2}const[,l,c]=ve({sourceX:s,sourceY:r,sourcePosition:exports.Position.Right,targetX:o,targetY:a,targetPosition:exports.Position.Left});return{x:l,y:c}}computeStartLabelCanvasPosition(t){const n=this.nodes.find(r=>r.id===t.source);if(!n)return null;let i,s;if(t.sourceHandle){const r=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(r)i=r.x,s=r.y;else{const o=n.measured?.width||n.width||150,a=n.measured?.height||n.height||50;i=n.position.x+o,s=n.position.y+a/2}}else{const r=n.measured?.width||n.width||150,o=n.measured?.height||n.height||50;i=n.position.x+r,s=n.position.y+o/2}return{x:i+12,y:s-10}}computeEndLabelCanvasPosition(t){const n=this.nodes.find(r=>r.id===t.target);if(!n)return null;let i,s;if(t.targetHandle){const r=this.getHandleCanvasPosition(t.target,t.targetHandle);if(r)i=r.x,s=r.y;else{const o=n.measured?.height||n.height||50;i=n.position.x,s=n.position.y+o/2}}else{const r=n.measured?.height||n.height||50;i=n.position.x,s=n.position.y+r/2}return{x:i-12,y:s-10}}firstUpdated(){const t=this.renderRoot.querySelector(".flow-container");t&&(this.instance.mount(t),this.unsubscribe=this.instance.subscribe(n=>{this.nodes=n.nodes,this.edges=n.edges,this.viewport=n.viewport,this.requestUpdate()}),t.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("node-select",this.onNodeSelect),document.addEventListener("edge-select",this.onEdgeSelect))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.instance.destroy();const t=this.renderRoot.querySelector(".flow-container");t?.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),t?.removeEventListener("node-select",this.onNodeSelect),document.removeEventListener("edge-select",this.onEdgeSelect)}renderNode(t){const n=t.type||"default",i=this.nodeTypes[n]||"flow-node",s=Ja(i);return J`
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
          style=${al({transform:t})}
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
      `:null}};exports.FlowCanvas.styles=B`
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
  `;jt([w({type:Array})],exports.FlowCanvas.prototype,"nodes",2);jt([w({type:Array})],exports.FlowCanvas.prototype,"edges",2);jt([w({type:Object})],exports.FlowCanvas.prototype,"viewport",2);jt([w({type:Object})],exports.FlowCanvas.prototype,"nodeTypes",2);exports.FlowCanvas=jt([X("flow-canvas")],exports.FlowCanvas);var fl=Object.defineProperty,pl=Object.getOwnPropertyDescriptor,_t=(e,t,n,i)=>{for(var s=i>1?void 0:i?pl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&fl(t,n,s),s};exports.NodeResizer=class extends O{constructor(){super(...arguments),this.visible=!1,this.minWidth=10,this.minHeight=10,this.maxWidth=Number.MAX_VALUE,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleMouseDown=t=>{const n=t.target;console.log("NodeResizer handleMouseDown:",n,n.classList);let i=n.classList.contains("resize-handle");if(!i&&n===this&&(i=t.composedPath().some(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))),console.log("Is resize handle:",i),!i)return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.isResizing=!0;const s=this.getRootNode().host;this.resizeStart={x:t.clientX,y:t.clientY,width:s?.offsetWidth||0,height:s?.offsetHeight||0};let r=null;if(n.classList.contains("resize-handle")?r=n:n===this&&(r=t.composedPath().find(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))||null),r){const o=Array.from(r.classList);this.resizeHandle=o.find(a=>a!=="resize-handle")||"",console.log("Resize handle direction:",this.resizeHandle)}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),console.log({width:this.resizeStart.width,height:this.resizeStart.height}),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleMouseMove=t=>{if(!this.isResizing)return;const n=this.getRootNode().host;if(!n)return;console.log("NodeResizer handleMouseMove:",t);const i=t.clientX-this.resizeStart.x,s=t.clientY-this.resizeStart.y;let r=this.resizeStart.width,o=this.resizeStart.height;switch(this.resizeHandle){case"nw":r=this.resizeStart.width-i,o=this.resizeStart.height-s;break;case"ne":r=this.resizeStart.width+i,o=this.resizeStart.height-s;break;case"sw":r=this.resizeStart.width-i,o=this.resizeStart.height+s;break;case"se":r=this.resizeStart.width+i,o=this.resizeStart.height+s;break;case"n":o=this.resizeStart.height-s;break;case"s":o=this.resizeStart.height+s;break;case"w":r=this.resizeStart.width-i;break;case"e":r=this.resizeStart.width+i;break}if(r=Math.max(this.minWidth,Math.min(this.maxWidth,r)),o=Math.max(this.minHeight,Math.min(this.maxHeight,o)),this.keepAspectRatio){const a=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?o=r/a:r=o*a}n.style.width=`${r}px`,n.style.height=`${o}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:r,height:o,handle:this.resizeHandle},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{if(!this.isResizing)return;this.isResizing=!1,this.cleanup();const t=this.getRootNode().host;this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:t?.offsetWidth||0,height:t?.offsetHeight||0},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return this.visible?N`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    `:N``}};exports.NodeResizer.styles=B`
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
  `;_t([w({type:Boolean,reflect:!0})],exports.NodeResizer.prototype,"visible",2);_t([w({type:Number})],exports.NodeResizer.prototype,"minWidth",2);_t([w({type:Number})],exports.NodeResizer.prototype,"minHeight",2);_t([w({type:Number})],exports.NodeResizer.prototype,"maxWidth",2);_t([w({type:Number})],exports.NodeResizer.prototype,"maxHeight",2);_t([w({type:Boolean})],exports.NodeResizer.prototype,"keepAspectRatio",2);exports.NodeResizer=_t([X("node-resizer")],exports.NodeResizer);var gl=Object.defineProperty,ml=Object.getOwnPropertyDescriptor,ct=(e,t,n,i)=>{for(var s=i>1?void 0:i?ml(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&gl(t,n,s),s};exports.FlowNode=class extends O{constructor(){super(...arguments),this.id="",this.data={},this.position={x:0,y:0},this.selected=!1,this.dragging=!1,this.draggable=!0,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.lastMeasured=null,this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const n=!this.selected;this.instance.updateNode(this.id,{selected:n}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:n,node:{id:this.id,data:this.data,position:this.position,selected:n}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:n,height:i}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:n,height:i,measured:{width:n,height:i}})},this.handleResizeEnd=t=>{const{width:n,height:i}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:n,height:i,measured:{width:n,height:i}}),this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:n,height:i},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const n=t.target;n.classList.contains("resize-handle")||n.tagName==="NODE-RESIZER"||n.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const n=t.clientX-this.dragStart.x,i=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(n)>3||Math.abs(i)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+n/s.zoom,y:this.nodeStart.y+i/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1},50)}}firstUpdated(){this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd)),this.updateMeasuredSize()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return N`
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
    `}updated(t){super.updated(t),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,this.updateMeasuredSize(),t.has("resizable")&&console.log("FlowNode resizable changed:",this.resizable)}updateMeasuredSize(){if(!this.instance)return;const t=this.getBoundingClientRect(),n=this.instance.getViewport().zoom||1,i=t.width/n,s=t.height/n;(!this.lastMeasured||Math.abs(this.lastMeasured.width-i)>.5||Math.abs(this.lastMeasured.height-s)>.5)&&(this.lastMeasured={width:i,height:s},this.instance.updateNode(this.id,{measured:{width:i,height:s},width:i,height:s}))}onHandleMouseDown(t){return n=>{n.stopPropagation(),n.preventDefault(),this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:t},bubbles:!0,composed:!0}))}}};exports.FlowNode.styles=B`
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
  `;ct([w({type:String,reflect:!0})],exports.FlowNode.prototype,"id",2);ct([w({type:Object})],exports.FlowNode.prototype,"data",2);ct([w({type:Object})],exports.FlowNode.prototype,"position",2);ct([w({type:Boolean,reflect:!0})],exports.FlowNode.prototype,"selected",2);ct([w({type:Boolean,reflect:!0})],exports.FlowNode.prototype,"dragging",2);ct([w({type:Boolean})],exports.FlowNode.prototype,"draggable",2);ct([w({type:Object})],exports.FlowNode.prototype,"instance",2);ct([w({type:Boolean})],exports.FlowNode.prototype,"resizable",2);exports.FlowNode=ct([X("flow-node")],exports.FlowNode);var yl=Object.defineProperty,wl=Object.getOwnPropertyDescriptor,Y=(e,t,n,i)=>{for(var s=i>1?void 0:i?wl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&yl(t,n,s),s};exports.FlowEdge=class extends O{constructor(){super(...arguments),this.id="",this.source="",this.target="",this.animated=!1,this.selected=!1,this.label="",this.type="default",this.markerHandleHalf=5}getMarkerId(t){if(!t)return;if(typeof t=="string")return t;const n=this.normalizeMarkerSpec(t);return`marker-${this.hashString(n)}`}createMarkerSVG(t,n){if(n.type==="custom"){const h=n.width??10,d=n.height??10,f=(n.refX??h)+this.markerHandleHalf,p=n.refY??d/2,m=n.color??"currentColor",b=n.orient??"auto";return`<marker id="${t}" markerWidth="${h}" markerHeight="${d}" refX="${f}" refY="${p}" orient="${b}" markerUnits="userSpaceOnUse"><path d="${n.path}" fill="${m}" stroke="${m}"/></marker>`}const i=n.width??10,s=n.height??10,r=n.orient??"auto",o=n.color??"currentColor",a=(n.type==="ArrowClosed",i+this.markerHandleHalf),l=s/2;if(n.type==="ArrowClosed"){const h=`M0,0 L${i},${l} L0,${s} Z`;return`<marker id="${t}" markerWidth="${i}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${h}" fill="${o}"/></marker>`}const c=`M0,0 L${i},${l} L0,${s}`;return`<marker id="${t}" markerWidth="${i}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${c}" fill="none" stroke="${o}" stroke-width="2"/></marker>`}normalizeMarkerSpec(t){if(t.type==="custom"){const{path:o,width:a=20,height:l=20,refX:c=20,refY:h=10,orient:d="auto",color:f="currentColor"}=t;return`custom|p=${o}|w=${a}|h=${l}|rx=${c}|ry=${h}|o=${d}|c=${f}`}const{width:n=20,height:i=20,orient:s="auto",color:r="currentColor"}=t;return`builtin|${t.type}|w=${n}|h=${i}|o=${s}|c=${r}`}hashString(t){let n=0;for(let i=0;i<t.length;i++)n=(n<<5)-n+t.charCodeAt(i),n|=0;return Math.abs(n).toString(36)}getPathForType(t,n){const i=t.x,s=t.y,r=n.x,o=n.y,a=t.position,l=n.position;switch(this.type){case"straight":return Ci({sourceX:i,sourceY:s,targetX:r,targetY:o});case"smoothstep":return Xe({sourceX:i,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l});case"step":return Xe({sourceX:i,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,borderRadius:0});case"simplebezier":return ve({sourceX:i,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,curvature:.5});case"default":default:return ve({sourceX:i,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l})}}getFlowCanvasRoot(){const t=this.getRootNode();return t instanceof ShadowRoot?t:null}getFlowCanvasHost(){const t=this.getFlowCanvasRoot();return t&&t.host||null}findHandleElement(t,n){const i=this.getFlowCanvasRoot();if(!i)return null;const s=i.querySelector(`[id="${CSS.escape(t)}"]`);if(!s)return null;const r=s.shadowRoot;let o=null;return r&&(o=r.querySelector(`[data-handle-id="${CSS.escape(n)}"]`)),o||(o=s.querySelector(`[data-handle-id="${CSS.escape(n)}"]`)),o}getHandlePosition(t,n){const i=this.findHandleElement(t,n);if(!i)return null;const s=this.getFlowCanvasRoot();if(!s)return null;const r=s.querySelector(`[id="${CSS.escape(t)}"]`);if(!r)return null;const o=r.getBoundingClientRect(),a=i.getBoundingClientRect(),l=this.sourceNode?.id===t?this.sourceNode:this.targetNode;if(!l)return null;l.measured?.width||l.width,l.measured?.height||l.height;const d=(this.getFlowCanvasHost()?.viewport||{zoom:1}).zoom||1,f=(a.left+a.width/2-o.left)/d,p=(a.top+a.height/2-o.top)/d;return{x:l.position.x+f,y:l.position.y+p}}getSourcePosition(){if(this.sourceHandle&&this.sourceNode){const i=this.getHandlePosition(this.sourceNode.id,this.sourceHandle);if(i)return{...i,position:exports.Position.Right}}const t=this.sourceNode.measured?.width||this.sourceNode.width||150,n=this.sourceNode.measured?.height||this.sourceNode.height||50;return{x:this.sourceNode.position.x+t,y:this.sourceNode.position.y+n/2,position:exports.Position.Right}}getTargetPosition(){if(this.targetHandle&&this.targetNode){const n=this.getHandlePosition(this.targetNode.id,this.targetHandle);if(n)return{...n,position:exports.Position.Left}}const t=this.targetNode.measured?.height||this.targetNode.height||50;return{x:this.targetNode.position.x,y:this.targetNode.position.y+t/2,position:exports.Position.Left}}render(){if(!this.sourceNode||!this.targetNode)return N``;const t=this.getSourcePosition(),n=this.getTargetPosition(),[i,s,r,o,a]=this.getPathForType(t,n),l=["edge-path",this.animated&&"animated",this.selected&&"selected"].filter(Boolean).join(" "),c=this.getMarkerId(this.markerStart),h=this.getMarkerId(this.markerEnd),d=c?`url(#${c})`:void 0,f=h?`url(#${h})`:void 0,p=this.animated?"5":"";return N`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${c&&typeof this.markerStart=="object"?G`<marker id="${c}" markerWidth="${this.markerStart.width||10}" markerHeight="${this.markerStart.height||10}" refX="${((this.markerStart.type==="custom"?this.markerStart.refX:void 0)||this.markerStart.width||10)+this.markerHandleHalf}" refY="${(this.markerStart.type==="custom"?this.markerStart.refY:void 0)||(this.markerStart.height||10)/2}" orient="${this.markerStart.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type==="custom"?G`<path d="${this.markerStart.path}" fill="${this.markerStart.color||"currentColor"}" stroke="${this.markerStart.color||"currentColor"}"/>`:this.markerStart.type==="ArrowClosed"?G`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10} Z" fill="${this.markerStart.color||"currentColor"}"/>`:G`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10}" fill="none" stroke="${this.markerStart.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
          ${h&&typeof this.markerEnd=="object"?G`<marker id="${h}" markerWidth="${this.markerEnd.width||10}" markerHeight="${this.markerEnd.height||10}" refX="${((this.markerEnd.type==="custom"?this.markerEnd.refX:void 0)||this.markerEnd.width||10)+this.markerHandleHalf}" refY="${(this.markerEnd.type==="custom"?this.markerEnd.refY:void 0)||(this.markerEnd.height||10)/2}" orient="${this.markerEnd.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type==="custom"?G`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color||"currentColor"}" stroke="${this.markerEnd.color||"currentColor"}"/>`:this.markerEnd.type==="ArrowClosed"?G`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10} Z" fill="${this.markerEnd.color||"currentColor"}"/>`:G`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10}" fill="none" stroke="${this.markerEnd.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
        </defs>
        ${G`
          <path 
            class="${l}"
            d="${i}"
            stroke-dasharray="${p}"
            marker-start="${d??""}"
            marker-end="${f??""}"
            @click=${this.handleClick}
          />
          ${this.label?G`
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
    `}handleClick(t){console.log("handleClick",t),t.stopPropagation();const n=!this.selected;this.selected=n,this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:this.id,selected:n,edge:{id:this.id,source:this.source,target:this.target,sourceHandle:this.sourceHandle,targetHandle:this.targetHandle,label:this.label,animated:this.animated,selected:n}},bubbles:!0,composed:!0}))}};exports.FlowEdge.styles=B`
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
  `;Y([w({type:String})],exports.FlowEdge.prototype,"id",2);Y([w({type:String})],exports.FlowEdge.prototype,"source",2);Y([w({type:String})],exports.FlowEdge.prototype,"target",2);Y([w({type:String})],exports.FlowEdge.prototype,"sourceHandle",2);Y([w({type:String})],exports.FlowEdge.prototype,"targetHandle",2);Y([w({type:Object})],exports.FlowEdge.prototype,"sourceNode",2);Y([w({type:Object})],exports.FlowEdge.prototype,"targetNode",2);Y([w({type:Boolean})],exports.FlowEdge.prototype,"animated",2);Y([w({type:Boolean})],exports.FlowEdge.prototype,"selected",2);Y([w({type:String})],exports.FlowEdge.prototype,"label",2);Y([w({type:String})],exports.FlowEdge.prototype,"type",2);Y([w({type:Object})],exports.FlowEdge.prototype,"markerStart",2);Y([w({type:Object})],exports.FlowEdge.prototype,"markerEnd",2);exports.FlowEdge=Y([X("flow-edge")],exports.FlowEdge);var vl=Object.defineProperty,xl=Object.getOwnPropertyDescriptor,Kt=(e,t,n,i)=>{for(var s=i>1?void 0:i?xl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&vl(t,n,s),s};exports.FlowBackground=class extends O{constructor(){super(...arguments),this.variant="dots",this.gap=20,this.color="#ddd",this.size=1}render(){const t=`flow-bg-pattern-${Math.random().toString(36).substr(2,9)}`;return N`
      <svg>
        <defs>
          ${this.variant==="dots"?this.renderDotsPattern(t):this.renderLinesPattern(t)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${t})" />
      </svg>
    `}renderDotsPattern(t){return G`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `}renderLinesPattern(t){return G`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `}};exports.FlowBackground.styles=B`
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
  `;Kt([w({type:String})],exports.FlowBackground.prototype,"variant",2);Kt([w({type:Number})],exports.FlowBackground.prototype,"gap",2);Kt([w({type:String})],exports.FlowBackground.prototype,"color",2);Kt([w({type:Number})],exports.FlowBackground.prototype,"size",2);exports.FlowBackground=Kt([X("flow-background")],exports.FlowBackground);var bl=Object.defineProperty,$l=Object.getOwnPropertyDescriptor,rn=(e,t,n,i)=>{for(var s=i>1?void 0:i?$l(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&bl(t,n,s),s};exports.FlowMinimap=class extends O{constructor(){super(...arguments),this.width=200,this.height=150}render(){return N`
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `}};exports.FlowMinimap.styles=B`
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
  `;rn([w({type:Number})],exports.FlowMinimap.prototype,"width",2);rn([w({type:Number})],exports.FlowMinimap.prototype,"height",2);exports.FlowMinimap=rn([X("flow-minimap")],exports.FlowMinimap);var _l=Object.defineProperty,zl=Object.getOwnPropertyDescriptor,Mi=(e,t,n,i)=>{for(var s=i>1?void 0:i?zl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&_l(t,n,s),s};exports.FlowControls=class extends O{constructor(){super(...arguments),this.handleZoomIn=()=>{this.instance?.zoomIn()},this.handleZoomOut=()=>{this.instance?.zoomOut()},this.handleFitView=()=>{this.instance?.fitView()}}render(){return N`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `}};exports.FlowControls.styles=B`
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
  `;Mi([w({type:Object})],exports.FlowControls.prototype,"instance",2);exports.FlowControls=Mi([X("flow-controls")],exports.FlowControls);var Sl=Object.getOwnPropertyDescriptor,El=Object.getPrototypeOf,kl=Reflect.get,Nl=(e,t,n,i)=>{for(var s=i>1?void 0:i?Sl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s},He=(e,t,n)=>kl(El(e),n,t);exports.ERDTableNode=class extends exports.FlowNode{constructor(){super(...arguments),this.appliedInitialSize=!1}firstUpdated(){const t=this.data,n=t?.size?.width,i=t?.size?.height;(typeof n=="number"&&n>0||typeof i=="number"&&i>0)&&(typeof n=="number"&&n>0&&(this.style.width=`${n}px`),typeof i=="number"&&i>0&&(this.style.height=`${i}px`),this.instance&&this.instance.updateNode(this.id,{width:typeof n=="number"&&n>0?n:this.width,height:typeof i=="number"&&i>0?i:this.height}),this.appliedInitialSize=!0),super.firstUpdated()}updated(t){super.updated(t)}onFieldHandleMouseDown(t,n){return i=>{i.stopPropagation(),i.preventDefault();const s=`${this.id}-${t}-${n}`;this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:n==="left"?"target":"source",handleId:s,fieldName:t},bubbles:!0,composed:!0}))}}render(){const t=this.data,n=t?.tableName||"Table",i=t?.fields||[];return N`
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
    `}};exports.ERDTableNode.styles=[...Array.isArray(He(exports.ERDTableNode,exports.ERDTableNode,"styles"))?He(exports.ERDTableNode,exports.ERDTableNode,"styles"):[He(exports.ERDTableNode,exports.ERDTableNode,"styles")],B`
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
    `];exports.ERDTableNode=Nl([X("erd-table-node")],exports.ERDTableNode);const Cl=[{type:"circle",name:"Circle",category:"basic",path:"M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"rectangle",name:"Rectangle",category:"basic",path:"M 5 5 L 195 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"diamond",name:"Diamond",category:"basic",path:"M 100 5 L 195 100 L 100 195 L 5 100 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"triangle",name:"Triangle",category:"basic",path:"M 100 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Ml=[{type:"hexagon",name:"Hexagon",category:"geometric",path:"M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"octagon",name:"Octagon",category:"geometric",path:"M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Al=[{type:"heart",name:"Heart",category:"symbolic",path:"M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],on=class on{static initialize(){[...Cl,...Ml,...Al].forEach(n=>{this.shapes.set(n.type,n)})}static register(t){this.shapes.set(t.type,t)}static get(t){return this.shapes.get(t)}static getAll(){return Array.from(this.shapes.values())}static getByCategory(t){return Array.from(this.shapes.values()).filter(n=>n.category===t)}static has(t){return this.shapes.has(t)}static getShapeTypes(){return Array.from(this.shapes.keys())}static clear(){this.shapes.clear()}static getCount(){return this.shapes.size}};on.shapes=new Map;let qt=on;qt.initialize();var Pl=Object.defineProperty,Hl=Object.getOwnPropertyDescriptor,ot=(e,t,n,i)=>{for(var s=i>1?void 0:i?Hl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&Pl(t,n,s),s};exports.ShapeNode=class extends O{constructor(){super(...arguments),this.id="",this.selected=!1,this.dragging=!1,this.draggable=!0,this.connectable=!0,this.instance=null,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const n=!this.selected;this.instance.updateNode(this.id,{selected:n}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:n,node:{id:this.id,data:this.data,position:this.position,selected:n}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:n,height:i}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:n,height:i}};this.instance.updateNode(this.id,{data:s,width:n,height:i,measured:{width:n,height:i}})}},this.handleResizeEnd=t=>{const{width:n,height:i}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:n,height:i}};this.instance.updateNode(this.id,{data:s,width:n,height:i,measured:{width:n,height:i}})}this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:n,height:i},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const n=t.target;n.classList.contains("resize-handle")||n.tagName==="NODE-RESIZER"||n.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const n=t.clientX-this.dragStart.x,i=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(n)>3||Math.abs(i)>3)&&(this.isDragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+n/s.zoom,y:this.nodeStart.y+i/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{console.log("handleMouseUp"),this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isDragging=!1,this.cleanup()},this.handleHandleStart=t=>{console.log("handleHandleStart",t),t.stopPropagation(),this.isDragging=!1;const n=t.target,i=n.dataset.handleId,s=n.dataset.handleType;s&&i&&this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,handleId:i,handleType:s,position:this.position},bubbles:!0,composed:!0}))}}updated(t){super.updated(t),t.has("position")&&this.isDragging,t.has("resizable")&&console.log("ShapeNode resizable changed:",this.resizable)}getShapeDefinition(){if(this.data?.type)return qt.get(this.data.type)}renderShape(){const t=this.getShapeDefinition();if(!t)return N`
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
    `}};exports.ShapeNode.styles=B`
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
  `;ot([w({type:String,reflect:!0})],exports.ShapeNode.prototype,"id",2);ot([w({type:Object})],exports.ShapeNode.prototype,"data",2);ot([w({type:Object,hasChanged:(e,t)=>!t||e.x!==t.x||e.y!==t.y})],exports.ShapeNode.prototype,"position",2);ot([w({type:Boolean,reflect:!0})],exports.ShapeNode.prototype,"selected",2);ot([w({type:Boolean,reflect:!0})],exports.ShapeNode.prototype,"dragging",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"draggable",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"connectable",2);ot([w({type:Object})],exports.ShapeNode.prototype,"instance",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"resizable",2);exports.ShapeNode=ot([X("shape-node")],exports.ShapeNode);var Rl=Object.getOwnPropertyDescriptor,Qt=(e,t,n,i)=>{for(var s=i>1?void 0:i?Rl(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s};exports.BaseNode=class extends O{render(){return N`<slot></slot>`}};exports.BaseNode.styles=B`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;exports.BaseNode=Qt([X("base-node")],exports.BaseNode);exports.BaseNodeHeader=class extends O{render(){return N`<slot></slot>`}};exports.BaseNodeHeader.styles=B`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `;exports.BaseNodeHeader=Qt([X("base-node-header")],exports.BaseNodeHeader);exports.BaseNodeHeaderTitle=class extends O{render(){return N`<span class="title"><slot></slot></span>`}};exports.BaseNodeHeaderTitle.styles=B`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;exports.BaseNodeHeaderTitle=Qt([X("base-node-header-title")],exports.BaseNodeHeaderTitle);exports.BaseNodeContent=class extends O{render(){return N`<slot></slot>`}};exports.BaseNodeContent.styles=B`
    :host {
      display: block;
      padding: 12px;
    }
  `;exports.BaseNodeContent=Qt([X("base-node-content")],exports.BaseNodeContent);exports.BaseNodeFooter=class extends O{render(){return N`<slot></slot>`}};exports.BaseNodeFooter.styles=B`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;exports.BaseNodeFooter=Qt([X("base-node-footer")],exports.BaseNodeFooter);var Ll=Object.defineProperty,I=(e,t,n,i)=>{for(var s=void 0,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(t,n,s)||s);return s&&Ll(t,n,s),s};const Tl=e=>{class t extends e{constructor(){super(...arguments),this.id="",this.position={x:0,y:0},this.data={},this.selected=!1,this.dragging=!1,this.instance=null,this.resizable=!1,this.draggable=!0,this.connectable=!0,this.minWidth=10,this.maxWidth=Number.MAX_VALUE,this.minHeight=10,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleClick=i=>{if(i.stopPropagation(),!this.isDragging){const s=!this.selected;this.selected=s,this.instance&&this.instance.updateNode(this.id,{selected:s}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:s,node:{id:this.id,data:this.data,position:this.position,selected:s}},bubbles:!0,composed:!0}))}},this.handleMouseDown=i=>{if(i.button!==0)return;const s=i.target;if(s.classList.contains("resize-handle")||s.closest(".resize-handle")!==null){this.handleResizeStart(i);return}this.draggable&&(i.preventDefault(),i.stopPropagation(),this.isDragging=!1,this.dragStart={x:i.clientX,y:i.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=i=>{if(this.isResizing){this.handleResizeMove(i);return}const s=i.clientX-this.dragStart.x,r=i.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(s)>3||Math.abs(r)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const o=this.instance.getViewport(),a={x:this.nodeStart.x+s/o.zoom,y:this.nodeStart.y+r/o.zoom};this.instance.updateNode(this.id,{position:a})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isResizing&&this.handleResizeEnd(),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1,this.isResizing=!1},50)},this.handleResizeStart=(i,s)=>{i.preventDefault(),i.stopPropagation(),i.stopImmediatePropagation(),this.isResizing=!0;const r=this.getBoundingClientRect(),o=getComputedStyle(this);let a=parseFloat(o.width),l=parseFloat(o.height);if((!a||a===0)&&(a=r.width),(!l||l===0)&&(l=r.height),this.resizeStart={x:i.clientX,y:i.clientY,width:a,height:l},s)this.resizeHandle=s;else{let c=i.target;if(!c.classList.contains("resize-handle")){const d=c.closest(".resize-handle");d&&(c=d)}const h=Array.from(c.classList);this.resizeHandle=h.find(d=>d!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleResizeMove=i=>{if(!this.isResizing)return;const s=i.clientX-this.resizeStart.x,r=i.clientY-this.resizeStart.y;let o=this.resizeStart.width,a=this.resizeStart.height;switch(this.resizeHandle){case"nw":o=this.resizeStart.width-s,a=this.resizeStart.height-r;break;case"ne":o=this.resizeStart.width+s,a=this.resizeStart.height-r;break;case"sw":o=this.resizeStart.width-s,a=this.resizeStart.height+r;break;case"se":o=this.resizeStart.width+s,a=this.resizeStart.height+r;break;case"n":a=this.resizeStart.height-r;break;case"s":a=this.resizeStart.height+r;break;case"w":o=this.resizeStart.width-s;break;case"e":o=this.resizeStart.width+s;break}if(o=Math.max(this.minWidth,Math.min(this.maxWidth,o)),a=Math.max(this.minHeight,Math.min(this.maxHeight,a)),this.keepAspectRatio){const l=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?a=o/l:o=a*l}this.style.width=`${o}px`,this.style.height=`${a}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:o,height:a,handle:this.resizeHandle},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:o,height:a,measured:{width:o,height:a}})},this.handleResizeEnd=()=>{this.isResizing&&(this.isResizing=!1,this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:this.offsetWidth,height:this.offsetHeight,measured:{width:this.offsetWidth,height:this.offsetHeight}}))},this.handleGlobalClick=i=>{i.target.closest(this.tagName.toLowerCase())!==null||this.selected&&(this.selected=!1,this.instance&&this.instance.updateNode(this.id,{selected:!1}),this.dispatchEvent(new CustomEvent("node-deselect",{detail:{nodeId:this.id,selected:!1,node:{id:this.id,data:this.data,position:this.position,selected:!1}},bubbles:!0,composed:!0})))},this.handleResizeHandleClick=i=>s=>{s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.handleResizeStart(s,i)}}static get styles(){return[B`
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
      `}renderComponent(){return N``}}return I([w({type:String,reflect:!0})],t.prototype,"id"),I([w({type:Object})],t.prototype,"position"),I([w({type:Object})],t.prototype,"data"),I([w({type:Boolean,reflect:!0})],t.prototype,"selected"),I([w({type:Boolean,reflect:!0})],t.prototype,"dragging"),I([w({type:Object})],t.prototype,"instance"),I([w({type:Boolean})],t.prototype,"resizable"),I([w({type:Boolean})],t.prototype,"draggable"),I([w({type:Boolean})],t.prototype,"connectable"),I([w({type:Number})],t.prototype,"minWidth"),I([w({type:Number})],t.prototype,"maxWidth"),I([w({type:Number})],t.prototype,"minHeight"),I([w({type:Number})],t.prototype,"maxHeight"),I([w({type:Boolean})],t.prototype,"keepAspectRatio"),t};exports.FlowInstance=xi;exports.NodeMixin=Tl;exports.ShapeRegistry=qt;exports.createStore=Ma;exports.getBezierPath=ve;exports.getCenter=hl;exports.getDistance=ll;exports.getSmoothStepPath=Xe;exports.getStraightPath=Ci;exports.isPointInRect=cl;
//# sourceMappingURL=lit-flow.bundle.cjs.map
