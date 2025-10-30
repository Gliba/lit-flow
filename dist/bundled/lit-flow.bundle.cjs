"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var Ln={value:()=>{}};function Ye(){for(var e=0,t=arguments.length,i={},n;e<t;++e){if(!(n=arguments[e]+"")||n in i||/[\s.]/.test(n))throw new Error("illegal type: "+n);i[n]=[]}return new se(i)}function se(e){this._=e}function Dn(e,t){return e.trim().split(/^|\s+/).map(function(i){var n="",s=i.indexOf(".");if(s>=0&&(n=i.slice(s+1),i=i.slice(0,s)),i&&!t.hasOwnProperty(i))throw new Error("unknown type: "+i);return{type:i,name:n}})}se.prototype=Ye.prototype={constructor:se,on:function(e,t){var i=this._,n=Dn(e+"",i),s,r=-1,o=n.length;if(arguments.length<2){for(;++r<o;)if((s=(e=n[r]).type)&&(s=On(i[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<o;)if(s=(e=n[r]).type)i[s]=oi(i[s],e.name,t);else if(t==null)for(s in i)i[s]=oi(i[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var i in t)e[i]=t[i].slice();return new se(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var i=new Array(s),n=0,s,r;n<s;++n)i[n]=arguments[n+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(r=this._[e],n=0,s=r.length;n<s;++n)r[n].value.apply(t,i)},apply:function(e,t,i){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var n=this._[e],s=0,r=n.length;s<r;++s)n[s].value.apply(t,i)}};function On(e,t){for(var i=0,n=e.length,s;i<n;++i)if((s=e[i]).name===t)return s.value}function oi(e,t,i){for(var n=0,s=e.length;n<s;++n)if(e[n].name===t){e[n]=Ln,e=e.slice(0,n).concat(e.slice(n+1));break}return i!=null&&e.push({name:t,value:i}),e}var Re="http://www.w3.org/1999/xhtml";const ai={svg:"http://www.w3.org/2000/svg",xhtml:Re,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function xe(e){var t=e+="",i=t.indexOf(":");return i>=0&&(t=e.slice(0,i))!=="xmlns"&&(e=e.slice(i+1)),ai.hasOwnProperty(t)?{space:ai[t],local:e}:e}function Bn(e){return function(){var t=this.ownerDocument,i=this.namespaceURI;return i===Re&&t.documentElement.namespaceURI===Re?t.createElement(e):t.createElementNS(i,e)}}function Fn(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Xi(e){var t=xe(e);return(t.local?Fn:Bn)(t)}function In(){}function qe(e){return e==null?In:function(){return this.querySelector(e)}}function Un(e){typeof e!="function"&&(e=qe(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=new Array(o),l,c,h=0;h<o;++h)(l=r[h])&&(c=e.call(l,l.__data__,h,r))&&("__data__"in l&&(c.__data__=l.__data__),a[h]=c);return new V(n,this._parents)}function Xn(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Yn(){return[]}function Yi(e){return e==null?Yn:function(){return this.querySelectorAll(e)}}function qn(e){return function(){return Xn(e.apply(this,arguments))}}function Zn(e){typeof e=="function"?e=qn(e):e=Yi(e);for(var t=this._groups,i=t.length,n=[],s=[],r=0;r<i;++r)for(var o=t[r],a=o.length,l,c=0;c<a;++c)(l=o[c])&&(n.push(e.call(l,l.__data__,c,o)),s.push(l));return new V(n,s)}function qi(e){return function(){return this.matches(e)}}function Zi(e){return function(t){return t.matches(e)}}var Wn=Array.prototype.find;function Vn(e){return function(){return Wn.call(this.children,e)}}function Gn(){return this.firstElementChild}function jn(e){return this.select(e==null?Gn:Vn(typeof e=="function"?e:Zi(e)))}var Kn=Array.prototype.filter;function Qn(){return Array.from(this.children)}function Jn(e){return function(){return Kn.call(this.children,e)}}function ts(e){return this.selectAll(e==null?Qn:Jn(typeof e=="function"?e:Zi(e)))}function es(e){typeof e!="function"&&(e=qi(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],l,c=0;c<o;++c)(l=r[c])&&e.call(l,l.__data__,c,r)&&a.push(l);return new V(n,this._parents)}function Wi(e){return new Array(e.length)}function is(){return new V(this._enter||this._groups.map(Wi),this._parents)}function ce(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}ce.prototype={constructor:ce,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function ns(e){return function(){return e}}function ss(e,t,i,n,s,r){for(var o=0,a,l=t.length,c=r.length;o<c;++o)(a=t[o])?(a.__data__=r[o],n[o]=a):i[o]=new ce(e,r[o]);for(;o<l;++o)(a=t[o])&&(s[o]=a)}function rs(e,t,i,n,s,r,o){var a,l,c=new Map,h=t.length,d=r.length,f=new Array(h),p;for(a=0;a<h;++a)(l=t[a])&&(f[a]=p=o.call(l,l.__data__,a,t)+"",c.has(p)?s[a]=l:c.set(p,l));for(a=0;a<d;++a)p=o.call(e,r[a],a,r)+"",(l=c.get(p))?(n[a]=l,l.__data__=r[a],c.delete(p)):i[a]=new ce(e,r[a]);for(a=0;a<h;++a)(l=t[a])&&c.get(f[a])===l&&(s[a]=l)}function os(e){return e.__data__}function as(e,t){if(!arguments.length)return Array.from(this,os);var i=t?rs:ss,n=this._parents,s=this._groups;typeof e!="function"&&(e=ns(e));for(var r=s.length,o=new Array(r),a=new Array(r),l=new Array(r),c=0;c<r;++c){var h=n[c],d=s[c],f=d.length,p=ls(e.call(h,h&&h.__data__,c,n)),m=p.length,b=a[c]=new Array(m),E=o[c]=new Array(m),v=l[c]=new Array(f);i(h,d,b,E,v,p,t);for(var k=0,A=0,T,F;k<m;++k)if(T=b[k]){for(k>=A&&(A=k+1);!(F=E[A])&&++A<m;);T._next=F||null}}return o=new V(o,n),o._enter=a,o._exit=l,o}function ls(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function hs(){return new V(this._exit||this._groups.map(Wi),this._parents)}function cs(e,t,i){var n=this.enter(),s=this,r=this.exit();return typeof e=="function"?(n=e(n),n&&(n=n.selection())):n=n.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),i==null?r.remove():i(r),n&&s?n.merge(s).order():s}function ds(e){for(var t=e.selection?e.selection():e,i=this._groups,n=t._groups,s=i.length,r=n.length,o=Math.min(s,r),a=new Array(s),l=0;l<o;++l)for(var c=i[l],h=n[l],d=c.length,f=a[l]=new Array(d),p,m=0;m<d;++m)(p=c[m]||h[m])&&(f[m]=p);for(;l<s;++l)a[l]=i[l];return new V(a,this._parents)}function us(){for(var e=this._groups,t=-1,i=e.length;++t<i;)for(var n=e[t],s=n.length-1,r=n[s],o;--s>=0;)(o=n[s])&&(r&&o.compareDocumentPosition(r)^4&&r.parentNode.insertBefore(o,r),r=o);return this}function fs(e){e||(e=ps);function t(d,f){return d&&f?e(d.__data__,f.__data__):!d-!f}for(var i=this._groups,n=i.length,s=new Array(n),r=0;r<n;++r){for(var o=i[r],a=o.length,l=s[r]=new Array(a),c,h=0;h<a;++h)(c=o[h])&&(l[h]=c);l.sort(t)}return new V(s,this._parents).order()}function ps(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function gs(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function ms(){return Array.from(this)}function ys(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length;s<r;++s){var o=n[s];if(o)return o}return null}function ws(){let e=0;for(const t of this)++e;return e}function vs(){return!this.node()}function xs(e){for(var t=this._groups,i=0,n=t.length;i<n;++i)for(var s=t[i],r=0,o=s.length,a;r<o;++r)(a=s[r])&&e.call(a,a.__data__,r,s);return this}function bs(e){return function(){this.removeAttribute(e)}}function $s(e){return function(){this.removeAttributeNS(e.space,e.local)}}function _s(e,t){return function(){this.setAttribute(e,t)}}function zs(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Ss(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttribute(e):this.setAttribute(e,i)}}function Es(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,i)}}function ks(e,t){var i=xe(e);if(arguments.length<2){var n=this.node();return i.local?n.getAttributeNS(i.space,i.local):n.getAttribute(i)}return this.each((t==null?i.local?$s:bs:typeof t=="function"?i.local?Es:Ss:i.local?zs:_s)(i,t))}function Vi(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Ns(e){return function(){this.style.removeProperty(e)}}function Cs(e,t,i){return function(){this.style.setProperty(e,t,i)}}function Ms(e,t,i){return function(){var n=t.apply(this,arguments);n==null?this.style.removeProperty(e):this.style.setProperty(e,n,i)}}function As(e,t,i){return arguments.length>1?this.each((t==null?Ns:typeof t=="function"?Ms:Cs)(e,t,i??"")):kt(this.node(),e)}function kt(e,t){return e.style.getPropertyValue(t)||Vi(e).getComputedStyle(e,null).getPropertyValue(t)}function Hs(e){return function(){delete this[e]}}function Ps(e,t){return function(){this[e]=t}}function Rs(e,t){return function(){var i=t.apply(this,arguments);i==null?delete this[e]:this[e]=i}}function Ts(e,t){return arguments.length>1?this.each((t==null?Hs:typeof t=="function"?Rs:Ps)(e,t)):this.node()[e]}function Gi(e){return e.trim().split(/^|\s+/)}function Ze(e){return e.classList||new ji(e)}function ji(e){this._node=e,this._names=Gi(e.getAttribute("class")||"")}ji.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Ki(e,t){for(var i=Ze(e),n=-1,s=t.length;++n<s;)i.add(t[n])}function Qi(e,t){for(var i=Ze(e),n=-1,s=t.length;++n<s;)i.remove(t[n])}function Ls(e){return function(){Ki(this,e)}}function Ds(e){return function(){Qi(this,e)}}function Os(e,t){return function(){(t.apply(this,arguments)?Ki:Qi)(this,e)}}function Bs(e,t){var i=Gi(e+"");if(arguments.length<2){for(var n=Ze(this.node()),s=-1,r=i.length;++s<r;)if(!n.contains(i[s]))return!1;return!0}return this.each((typeof t=="function"?Os:t?Ls:Ds)(i,t))}function Fs(){this.textContent=""}function Is(e){return function(){this.textContent=e}}function Us(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Xs(e){return arguments.length?this.each(e==null?Fs:(typeof e=="function"?Us:Is)(e)):this.node().textContent}function Ys(){this.innerHTML=""}function qs(e){return function(){this.innerHTML=e}}function Zs(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Ws(e){return arguments.length?this.each(e==null?Ys:(typeof e=="function"?Zs:qs)(e)):this.node().innerHTML}function Vs(){this.nextSibling&&this.parentNode.appendChild(this)}function Gs(){return this.each(Vs)}function js(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Ks(){return this.each(js)}function Qs(e){var t=typeof e=="function"?e:Xi(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Js(){return null}function tr(e,t){var i=typeof e=="function"?e:Xi(e),n=t==null?Js:typeof t=="function"?t:qe(t);return this.select(function(){return this.insertBefore(i.apply(this,arguments),n.apply(this,arguments)||null)})}function er(){var e=this.parentNode;e&&e.removeChild(this)}function ir(){return this.each(er)}function nr(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function sr(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function rr(e){return this.select(e?sr:nr)}function or(e){return arguments.length?this.property("__data__",e):this.node().__data__}function ar(e){return function(t){e.call(this,t,this.__data__)}}function lr(e){return e.trim().split(/^|\s+/).map(function(t){var i="",n=t.indexOf(".");return n>=0&&(i=t.slice(n+1),t=t.slice(0,n)),{type:t,name:i}})}function hr(e){return function(){var t=this.__on;if(t){for(var i=0,n=-1,s=t.length,r;i<s;++i)r=t[i],(!e.type||r.type===e.type)&&r.name===e.name?this.removeEventListener(r.type,r.listener,r.options):t[++n]=r;++n?t.length=n:delete this.__on}}}function cr(e,t,i){return function(){var n=this.__on,s,r=ar(t);if(n){for(var o=0,a=n.length;o<a;++o)if((s=n[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=r,s.options=i),s.value=t;return}}this.addEventListener(e.type,r,i),s={type:e.type,name:e.name,value:t,listener:r,options:i},n?n.push(s):this.__on=[s]}}function dr(e,t,i){var n=lr(e+""),s,r=n.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,h;l<c;++l)for(s=0,h=a[l];s<r;++s)if((o=n[s]).type===h.type&&o.name===h.name)return h.value}return}for(a=t?cr:hr,s=0;s<r;++s)this.each(a(n[s],t,i));return this}function Ji(e,t,i){var n=Vi(e),s=n.CustomEvent;typeof s=="function"?s=new s(t,i):(s=n.document.createEvent("Event"),i?(s.initEvent(t,i.bubbles,i.cancelable),s.detail=i.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function ur(e,t){return function(){return Ji(this,e,t)}}function fr(e,t){return function(){return Ji(this,e,t.apply(this,arguments))}}function pr(e,t){return this.each((typeof t=="function"?fr:ur)(e,t))}function*gr(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length,o;s<r;++s)(o=n[s])&&(yield o)}var tn=[null];function V(e,t){this._groups=e,this._parents=t}function Wt(){return new V([[document.documentElement]],tn)}function mr(){return this}V.prototype=Wt.prototype={constructor:V,select:Un,selectAll:Zn,selectChild:jn,selectChildren:ts,filter:es,data:as,enter:is,exit:hs,join:cs,merge:ds,selection:mr,order:us,sort:fs,call:gs,nodes:ms,node:ys,size:ws,empty:vs,each:xs,attr:ks,style:As,property:Ts,classed:Bs,text:Xs,html:Ws,raise:Gs,lower:Ks,append:Qs,insert:tr,remove:ir,clone:rr,datum:or,on:dr,dispatch:pr,[Symbol.iterator]:gr};function ft(e){return typeof e=="string"?new V([[document.querySelector(e)]],[document.documentElement]):new V([[e]],tn)}function yr(e){let t;for(;t=e.sourceEvent;)e=t;return e}function ut(e,t){if(e=yr(e),t===void 0&&(t=e.currentTarget),t){var i=t.ownerSVGElement||t;if(i.createSVGPoint){var n=i.createSVGPoint();return n.x=e.clientX,n.y=e.clientY,n=n.matrixTransform(t.getScreenCTM().inverse()),[n.x,n.y]}if(t.getBoundingClientRect){var s=t.getBoundingClientRect();return[e.clientX-s.left-t.clientLeft,e.clientY-s.top-t.clientTop]}}return[e.pageX,e.pageY]}const Te={capture:!0,passive:!1};function Le(e){e.preventDefault(),e.stopImmediatePropagation()}function wr(e){var t=e.document.documentElement,i=ft(e).on("dragstart.drag",Le,Te);"onselectstart"in t?i.on("selectstart.drag",Le,Te):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function vr(e,t){var i=e.document.documentElement,n=ft(e).on("dragstart.drag",null);t&&(n.on("click.drag",Le,Te),setTimeout(function(){n.on("click.drag",null)},0)),"onselectstart"in i?n.on("selectstart.drag",null):(i.style.MozUserSelect=i.__noselect,delete i.__noselect)}function We(e,t,i){e.prototype=t.prototype=i,i.constructor=e}function en(e,t){var i=Object.create(e.prototype);for(var n in t)i[n]=t[n];return i}function Vt(){}var Ft=.7,de=1/Ft,Et="\\s*([+-]?\\d+)\\s*",It="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",st="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",xr=/^#([0-9a-f]{3,8})$/,br=new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`),$r=new RegExp(`^rgb\\(${st},${st},${st}\\)$`),_r=new RegExp(`^rgba\\(${Et},${Et},${Et},${It}\\)$`),zr=new RegExp(`^rgba\\(${st},${st},${st},${It}\\)$`),Sr=new RegExp(`^hsl\\(${It},${st},${st}\\)$`),Er=new RegExp(`^hsla\\(${It},${st},${st},${It}\\)$`),li={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};We(Vt,vt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:hi,formatHex:hi,formatHex8:kr,formatHsl:Nr,formatRgb:ci,toString:ci});function hi(){return this.rgb().formatHex()}function kr(){return this.rgb().formatHex8()}function Nr(){return nn(this).formatHsl()}function ci(){return this.rgb().formatRgb()}function vt(e){var t,i;return e=(e+"").trim().toLowerCase(),(t=xr.exec(e))?(i=t[1].length,t=parseInt(t[1],16),i===6?di(t):i===3?new U(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):i===8?Jt(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):i===4?Jt(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=br.exec(e))?new U(t[1],t[2],t[3],1):(t=$r.exec(e))?new U(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=_r.exec(e))?Jt(t[1],t[2],t[3],t[4]):(t=zr.exec(e))?Jt(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Sr.exec(e))?pi(t[1],t[2]/100,t[3]/100,1):(t=Er.exec(e))?pi(t[1],t[2]/100,t[3]/100,t[4]):li.hasOwnProperty(e)?di(li[e]):e==="transparent"?new U(NaN,NaN,NaN,0):null}function di(e){return new U(e>>16&255,e>>8&255,e&255,1)}function Jt(e,t,i,n){return n<=0&&(e=t=i=NaN),new U(e,t,i,n)}function Cr(e){return e instanceof Vt||(e=vt(e)),e?(e=e.rgb(),new U(e.r,e.g,e.b,e.opacity)):new U}function De(e,t,i,n){return arguments.length===1?Cr(e):new U(e,t,i,n??1)}function U(e,t,i,n){this.r=+e,this.g=+t,this.b=+i,this.opacity=+n}We(U,De,en(Vt,{brighter(e){return e=e==null?de:Math.pow(de,e),new U(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Ft:Math.pow(Ft,e),new U(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new U(wt(this.r),wt(this.g),wt(this.b),ue(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:ui,formatHex:ui,formatHex8:Mr,formatRgb:fi,toString:fi}));function ui(){return`#${mt(this.r)}${mt(this.g)}${mt(this.b)}`}function Mr(){return`#${mt(this.r)}${mt(this.g)}${mt(this.b)}${mt((isNaN(this.opacity)?1:this.opacity)*255)}`}function fi(){const e=ue(this.opacity);return`${e===1?"rgb(":"rgba("}${wt(this.r)}, ${wt(this.g)}, ${wt(this.b)}${e===1?")":`, ${e})`}`}function ue(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function wt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function mt(e){return e=wt(e),(e<16?"0":"")+e.toString(16)}function pi(e,t,i,n){return n<=0?e=t=i=NaN:i<=0||i>=1?e=t=NaN:t<=0&&(e=NaN),new tt(e,t,i,n)}function nn(e){if(e instanceof tt)return new tt(e.h,e.s,e.l,e.opacity);if(e instanceof Vt||(e=vt(e)),!e)return new tt;if(e instanceof tt)return e;e=e.rgb();var t=e.r/255,i=e.g/255,n=e.b/255,s=Math.min(t,i,n),r=Math.max(t,i,n),o=NaN,a=r-s,l=(r+s)/2;return a?(t===r?o=(i-n)/a+(i<n)*6:i===r?o=(n-t)/a+2:o=(t-i)/a+4,a/=l<.5?r+s:2-r-s,o*=60):a=l>0&&l<1?0:o,new tt(o,a,l,e.opacity)}function Ar(e,t,i,n){return arguments.length===1?nn(e):new tt(e,t,i,n??1)}function tt(e,t,i,n){this.h=+e,this.s=+t,this.l=+i,this.opacity=+n}We(tt,Ar,en(Vt,{brighter(e){return e=e==null?de:Math.pow(de,e),new tt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Ft:Math.pow(Ft,e),new tt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,i=this.l,n=i+(i<.5?i:1-i)*t,s=2*i-n;return new U(ke(e>=240?e-240:e+120,s,n),ke(e,s,n),ke(e<120?e+240:e-120,s,n),this.opacity)},clamp(){return new tt(gi(this.h),te(this.s),te(this.l),ue(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=ue(this.opacity);return`${e===1?"hsl(":"hsla("}${gi(this.h)}, ${te(this.s)*100}%, ${te(this.l)*100}%${e===1?")":`, ${e})`}`}}));function gi(e){return e=(e||0)%360,e<0?e+360:e}function te(e){return Math.max(0,Math.min(1,e||0))}function ke(e,t,i){return(e<60?t+(i-t)*e/60:e<180?i:e<240?t+(i-t)*(240-e)/60:t)*255}const Ve=e=>()=>e;function Hr(e,t){return function(i){return e+i*t}}function Pr(e,t,i){return e=Math.pow(e,i),t=Math.pow(t,i)-e,i=1/i,function(n){return Math.pow(e+n*t,i)}}function Rr(e){return(e=+e)==1?sn:function(t,i){return i-t?Pr(t,i,e):Ve(isNaN(t)?i:t)}}function sn(e,t){var i=t-e;return i?Hr(e,i):Ve(isNaN(e)?t:e)}const fe=(function e(t){var i=Rr(t);function n(s,r){var o=i((s=De(s)).r,(r=De(r)).r),a=i(s.g,r.g),l=i(s.b,r.b),c=sn(s.opacity,r.opacity);return function(h){return s.r=o(h),s.g=a(h),s.b=l(h),s.opacity=c(h),s+""}}return n.gamma=e,n})(1);function Tr(e,t){t||(t=[]);var i=e?Math.min(t.length,e.length):0,n=t.slice(),s;return function(r){for(s=0;s<i;++s)n[s]=e[s]*(1-r)+t[s]*r;return n}}function Lr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Dr(e,t){var i=t?t.length:0,n=e?Math.min(i,e.length):0,s=new Array(n),r=new Array(i),o;for(o=0;o<n;++o)s[o]=Dt(e[o],t[o]);for(;o<i;++o)r[o]=t[o];return function(a){for(o=0;o<n;++o)r[o]=s[o](a);return r}}function Or(e,t){var i=new Date;return e=+e,t=+t,function(n){return i.setTime(e*(1-n)+t*n),i}}function nt(e,t){return e=+e,t=+t,function(i){return e*(1-i)+t*i}}function Br(e,t){var i={},n={},s;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(s in t)s in e?i[s]=Dt(e[s],t[s]):n[s]=t[s];return function(r){for(s in i)n[s]=i[s](r);return n}}var Oe=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ne=new RegExp(Oe.source,"g");function Fr(e){return function(){return e}}function Ir(e){return function(t){return e(t)+""}}function rn(e,t){var i=Oe.lastIndex=Ne.lastIndex=0,n,s,r,o=-1,a=[],l=[];for(e=e+"",t=t+"";(n=Oe.exec(e))&&(s=Ne.exec(t));)(r=s.index)>i&&(r=t.slice(i,r),a[o]?a[o]+=r:a[++o]=r),(n=n[0])===(s=s[0])?a[o]?a[o]+=s:a[++o]=s:(a[++o]=null,l.push({i:o,x:nt(n,s)})),i=Ne.lastIndex;return i<t.length&&(r=t.slice(i),a[o]?a[o]+=r:a[++o]=r),a.length<2?l[0]?Ir(l[0].x):Fr(t):(t=l.length,function(c){for(var h=0,d;h<t;++h)a[(d=l[h]).i]=d.x(c);return a.join("")})}function Dt(e,t){var i=typeof t,n;return t==null||i==="boolean"?Ve(t):(i==="number"?nt:i==="string"?(n=vt(t))?(t=n,fe):rn:t instanceof vt?fe:t instanceof Date?Or:Lr(t)?Tr:Array.isArray(t)?Dr:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Br:nt)(e,t)}var mi=180/Math.PI,Be={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function on(e,t,i,n,s,r){var o,a,l;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(l=e*i+t*n)&&(i-=e*l,n-=t*l),(a=Math.sqrt(i*i+n*n))&&(i/=a,n/=a,l/=a),e*n<t*i&&(e=-e,t=-t,l=-l,o=-o),{translateX:s,translateY:r,rotate:Math.atan2(t,e)*mi,skewX:Math.atan(l)*mi,scaleX:o,scaleY:a}}var ee;function Ur(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Be:on(t.a,t.b,t.c,t.d,t.e,t.f)}function Xr(e){return e==null||(ee||(ee=document.createElementNS("http://www.w3.org/2000/svg","g")),ee.setAttribute("transform",e),!(e=ee.transform.baseVal.consolidate()))?Be:(e=e.matrix,on(e.a,e.b,e.c,e.d,e.e,e.f))}function an(e,t,i,n){function s(c){return c.length?c.pop()+" ":""}function r(c,h,d,f,p,m){if(c!==d||h!==f){var b=p.push("translate(",null,t,null,i);m.push({i:b-4,x:nt(c,d)},{i:b-2,x:nt(h,f)})}else(d||f)&&p.push("translate("+d+t+f+i)}function o(c,h,d,f){c!==h?(c-h>180?h+=360:h-c>180&&(c+=360),f.push({i:d.push(s(d)+"rotate(",null,n)-2,x:nt(c,h)})):h&&d.push(s(d)+"rotate("+h+n)}function a(c,h,d,f){c!==h?f.push({i:d.push(s(d)+"skewX(",null,n)-2,x:nt(c,h)}):h&&d.push(s(d)+"skewX("+h+n)}function l(c,h,d,f,p,m){if(c!==d||h!==f){var b=p.push(s(p)+"scale(",null,",",null,")");m.push({i:b-4,x:nt(c,d)},{i:b-2,x:nt(h,f)})}else(d!==1||f!==1)&&p.push(s(p)+"scale("+d+","+f+")")}return function(c,h){var d=[],f=[];return c=e(c),h=e(h),r(c.translateX,c.translateY,h.translateX,h.translateY,d,f),o(c.rotate,h.rotate,d,f),a(c.skewX,h.skewX,d,f),l(c.scaleX,c.scaleY,h.scaleX,h.scaleY,d,f),c=h=null,function(p){for(var m=-1,b=f.length,E;++m<b;)d[(E=f[m]).i]=E.x(p);return d.join("")}}}var Yr=an(Ur,"px, ","px)","deg)"),qr=an(Xr,", ",")",")"),Zr=1e-12;function yi(e){return((e=Math.exp(e))+1/e)/2}function Wr(e){return((e=Math.exp(e))-1/e)/2}function Vr(e){return((e=Math.exp(2*e))-1)/(e+1)}const re=(function e(t,i,n){function s(r,o){var a=r[0],l=r[1],c=r[2],h=o[0],d=o[1],f=o[2],p=h-a,m=d-l,b=p*p+m*m,E,v;if(b<Zr)v=Math.log(f/c)/t,E=function(D){return[a+D*p,l+D*m,c*Math.exp(t*D*v)]};else{var k=Math.sqrt(b),A=(f*f-c*c+n*b)/(2*c*i*k),T=(f*f-c*c-n*b)/(2*f*i*k),F=Math.log(Math.sqrt(A*A+1)-A),P=Math.log(Math.sqrt(T*T+1)-T);v=(P-F)/t,E=function(D){var j=D*v,K=yi(F),dt=c/(i*k)*(K*Vr(t*j+F)-Wr(F));return[a+dt*p,l+dt*m,c*K/yi(t*j+F)]}}return E.duration=v*1e3*t/Math.SQRT2,E}return s.rho=function(r){var o=Math.max(.001,+r),a=o*o,l=a*a;return e(o,a,l)},s})(Math.SQRT2,2,4);var Nt=0,Tt=0,Ht=0,ln=1e3,pe,Lt,ge=0,xt=0,be=0,Ut=typeof performance=="object"&&performance.now?performance:Date,hn=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Ge(){return xt||(hn(Gr),xt=Ut.now()+be)}function Gr(){xt=0}function me(){this._call=this._time=this._next=null}me.prototype=cn.prototype={constructor:me,restart:function(e,t,i){if(typeof e!="function")throw new TypeError("callback is not a function");i=(i==null?Ge():+i)+(t==null?0:+t),!this._next&&Lt!==this&&(Lt?Lt._next=this:pe=this,Lt=this),this._call=e,this._time=i,Fe()},stop:function(){this._call&&(this._call=null,this._time=1/0,Fe())}};function cn(e,t,i){var n=new me;return n.restart(e,t,i),n}function jr(){Ge(),++Nt;for(var e=pe,t;e;)(t=xt-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Nt}function wi(){xt=(ge=Ut.now())+be,Nt=Tt=0;try{jr()}finally{Nt=0,Qr(),xt=0}}function Kr(){var e=Ut.now(),t=e-ge;t>ln&&(be-=t,ge=e)}function Qr(){for(var e,t=pe,i,n=1/0;t;)t._call?(n>t._time&&(n=t._time),e=t,t=t._next):(i=t._next,t._next=null,t=e?e._next=i:pe=i);Lt=e,Fe(n)}function Fe(e){if(!Nt){Tt&&(Tt=clearTimeout(Tt));var t=e-xt;t>24?(e<1/0&&(Tt=setTimeout(wi,e-Ut.now()-be)),Ht&&(Ht=clearInterval(Ht))):(Ht||(ge=Ut.now(),Ht=setInterval(Kr,ln)),Nt=1,hn(wi))}}function vi(e,t,i){var n=new me;return t=t==null?0:+t,n.restart(s=>{n.stop(),e(s+t)},t,i),n}var Jr=Ye("start","end","cancel","interrupt"),to=[],dn=0,xi=1,Ie=2,oe=3,bi=4,Ue=5,ae=6;function $e(e,t,i,n,s,r){var o=e.__transition;if(!o)e.__transition={};else if(i in o)return;eo(e,i,{name:t,index:n,group:s,on:Jr,tween:to,time:r.time,delay:r.delay,duration:r.duration,ease:r.ease,timer:null,state:dn})}function je(e,t){var i=et(e,t);if(i.state>dn)throw new Error("too late; already scheduled");return i}function rt(e,t){var i=et(e,t);if(i.state>oe)throw new Error("too late; already running");return i}function et(e,t){var i=e.__transition;if(!i||!(i=i[t]))throw new Error("transition not found");return i}function eo(e,t,i){var n=e.__transition,s;n[t]=i,i.timer=cn(r,0,i.time);function r(c){i.state=xi,i.timer.restart(o,i.delay,i.time),i.delay<=c&&o(c-i.delay)}function o(c){var h,d,f,p;if(i.state!==xi)return l();for(h in n)if(p=n[h],p.name===i.name){if(p.state===oe)return vi(o);p.state===bi?(p.state=ae,p.timer.stop(),p.on.call("interrupt",e,e.__data__,p.index,p.group),delete n[h]):+h<t&&(p.state=ae,p.timer.stop(),p.on.call("cancel",e,e.__data__,p.index,p.group),delete n[h])}if(vi(function(){i.state===oe&&(i.state=bi,i.timer.restart(a,i.delay,i.time),a(c))}),i.state=Ie,i.on.call("start",e,e.__data__,i.index,i.group),i.state===Ie){for(i.state=oe,s=new Array(f=i.tween.length),h=0,d=-1;h<f;++h)(p=i.tween[h].value.call(e,e.__data__,i.index,i.group))&&(s[++d]=p);s.length=d+1}}function a(c){for(var h=c<i.duration?i.ease.call(null,c/i.duration):(i.timer.restart(l),i.state=Ue,1),d=-1,f=s.length;++d<f;)s[d].call(e,h);i.state===Ue&&(i.on.call("end",e,e.__data__,i.index,i.group),l())}function l(){i.state=ae,i.timer.stop(),delete n[t];for(var c in n)return;delete e.__transition}}function le(e,t){var i=e.__transition,n,s,r=!0,o;if(i){t=t==null?null:t+"";for(o in i){if((n=i[o]).name!==t){r=!1;continue}s=n.state>Ie&&n.state<Ue,n.state=ae,n.timer.stop(),n.on.call(s?"interrupt":"cancel",e,e.__data__,n.index,n.group),delete i[o]}r&&delete e.__transition}}function io(e){return this.each(function(){le(this,e)})}function no(e,t){var i,n;return function(){var s=rt(this,e),r=s.tween;if(r!==i){n=i=r;for(var o=0,a=n.length;o<a;++o)if(n[o].name===t){n=n.slice(),n.splice(o,1);break}}s.tween=n}}function so(e,t,i){var n,s;if(typeof i!="function")throw new Error;return function(){var r=rt(this,e),o=r.tween;if(o!==n){s=(n=o).slice();for(var a={name:t,value:i},l=0,c=s.length;l<c;++l)if(s[l].name===t){s[l]=a;break}l===c&&s.push(a)}r.tween=s}}function ro(e,t){var i=this._id;if(e+="",arguments.length<2){for(var n=et(this.node(),i).tween,s=0,r=n.length,o;s<r;++s)if((o=n[s]).name===e)return o.value;return null}return this.each((t==null?no:so)(i,e,t))}function Ke(e,t,i){var n=e._id;return e.each(function(){var s=rt(this,n);(s.value||(s.value={}))[t]=i.apply(this,arguments)}),function(s){return et(s,n).value[t]}}function un(e,t){var i;return(typeof t=="number"?nt:t instanceof vt?fe:(i=vt(t))?(t=i,fe):rn)(e,t)}function oo(e){return function(){this.removeAttribute(e)}}function ao(e){return function(){this.removeAttributeNS(e.space,e.local)}}function lo(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttribute(e);return o===s?null:o===n?r:r=t(n=o,i)}}function ho(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===n?r:r=t(n=o,i)}}function co(e,t,i){var n,s,r;return function(){var o,a=i(this),l;return a==null?void this.removeAttribute(e):(o=this.getAttribute(e),l=a+"",o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a)))}}function uo(e,t,i){var n,s,r;return function(){var o,a=i(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),l=a+"",o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a)))}}function fo(e,t){var i=xe(e),n=i==="transform"?qr:un;return this.attrTween(e,typeof t=="function"?(i.local?uo:co)(i,n,Ke(this,"attr."+e,t)):t==null?(i.local?ao:oo)(i):(i.local?ho:lo)(i,n,t))}function po(e,t){return function(i){this.setAttribute(e,t.call(this,i))}}function go(e,t){return function(i){this.setAttributeNS(e.space,e.local,t.call(this,i))}}function mo(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&go(e,r)),i}return s._value=t,s}function yo(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&po(e,r)),i}return s._value=t,s}function wo(e,t){var i="attr."+e;if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;var n=xe(e);return this.tween(i,(n.local?mo:yo)(n,t))}function vo(e,t){return function(){je(this,e).delay=+t.apply(this,arguments)}}function xo(e,t){return t=+t,function(){je(this,e).delay=t}}function bo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?vo:xo)(t,e)):et(this.node(),t).delay}function $o(e,t){return function(){rt(this,e).duration=+t.apply(this,arguments)}}function _o(e,t){return t=+t,function(){rt(this,e).duration=t}}function zo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?$o:_o)(t,e)):et(this.node(),t).duration}function So(e,t){if(typeof t!="function")throw new Error;return function(){rt(this,e).ease=t}}function Eo(e){var t=this._id;return arguments.length?this.each(So(t,e)):et(this.node(),t).ease}function ko(e,t){return function(){var i=t.apply(this,arguments);if(typeof i!="function")throw new Error;rt(this,e).ease=i}}function No(e){if(typeof e!="function")throw new Error;return this.each(ko(this._id,e))}function Co(e){typeof e!="function"&&(e=qi(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],l,c=0;c<o;++c)(l=r[c])&&e.call(l,l.__data__,c,r)&&a.push(l);return new ht(n,this._parents,this._name,this._id)}function Mo(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,i=e._groups,n=t.length,s=i.length,r=Math.min(n,s),o=new Array(n),a=0;a<r;++a)for(var l=t[a],c=i[a],h=l.length,d=o[a]=new Array(h),f,p=0;p<h;++p)(f=l[p]||c[p])&&(d[p]=f);for(;a<n;++a)o[a]=t[a];return new ht(o,this._parents,this._name,this._id)}function Ao(e){return(e+"").trim().split(/^|\s+/).every(function(t){var i=t.indexOf(".");return i>=0&&(t=t.slice(0,i)),!t||t==="start"})}function Ho(e,t,i){var n,s,r=Ao(t)?je:rt;return function(){var o=r(this,e),a=o.on;a!==n&&(s=(n=a).copy()).on(t,i),o.on=s}}function Po(e,t){var i=this._id;return arguments.length<2?et(this.node(),i).on.on(e):this.each(Ho(i,e,t))}function Ro(e){return function(){var t=this.parentNode;for(var i in this.__transition)if(+i!==e)return;t&&t.removeChild(this)}}function To(){return this.on("end.remove",Ro(this._id))}function Lo(e){var t=this._name,i=this._id;typeof e!="function"&&(e=qe(e));for(var n=this._groups,s=n.length,r=new Array(s),o=0;o<s;++o)for(var a=n[o],l=a.length,c=r[o]=new Array(l),h,d,f=0;f<l;++f)(h=a[f])&&(d=e.call(h,h.__data__,f,a))&&("__data__"in h&&(d.__data__=h.__data__),c[f]=d,$e(c[f],t,i,f,c,et(h,i)));return new ht(r,this._parents,t,i)}function Do(e){var t=this._name,i=this._id;typeof e!="function"&&(e=Yi(e));for(var n=this._groups,s=n.length,r=[],o=[],a=0;a<s;++a)for(var l=n[a],c=l.length,h,d=0;d<c;++d)if(h=l[d]){for(var f=e.call(h,h.__data__,d,l),p,m=et(h,i),b=0,E=f.length;b<E;++b)(p=f[b])&&$e(p,t,i,b,f,m);r.push(f),o.push(h)}return new ht(r,o,t,i)}var Oo=Wt.prototype.constructor;function Bo(){return new Oo(this._groups,this._parents)}function Fo(e,t){var i,n,s;return function(){var r=kt(this,e),o=(this.style.removeProperty(e),kt(this,e));return r===o?null:r===i&&o===n?s:s=t(i=r,n=o)}}function fn(e){return function(){this.style.removeProperty(e)}}function Io(e,t,i){var n,s=i+"",r;return function(){var o=kt(this,e);return o===s?null:o===n?r:r=t(n=o,i)}}function Uo(e,t,i){var n,s,r;return function(){var o=kt(this,e),a=i(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),kt(this,e))),o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a))}}function Xo(e,t){var i,n,s,r="style."+t,o="end."+r,a;return function(){var l=rt(this,e),c=l.on,h=l.value[r]==null?a||(a=fn(t)):void 0;(c!==i||s!==h)&&(n=(i=c).copy()).on(o,s=h),l.on=n}}function Yo(e,t,i){var n=(e+="")=="transform"?Yr:un;return t==null?this.styleTween(e,Fo(e,n)).on("end.style."+e,fn(e)):typeof t=="function"?this.styleTween(e,Uo(e,n,Ke(this,"style."+e,t))).each(Xo(this._id,e)):this.styleTween(e,Io(e,n,t),i).on("end.style."+e,null)}function qo(e,t,i){return function(n){this.style.setProperty(e,t.call(this,n),i)}}function Zo(e,t,i){var n,s;function r(){var o=t.apply(this,arguments);return o!==s&&(n=(s=o)&&qo(e,o,i)),n}return r._value=t,r}function Wo(e,t,i){var n="style."+(e+="");if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;return this.tween(n,Zo(e,t,i??""))}function Vo(e){return function(){this.textContent=e}}function Go(e){return function(){var t=e(this);this.textContent=t??""}}function jo(e){return this.tween("text",typeof e=="function"?Go(Ke(this,"text",e)):Vo(e==null?"":e+""))}function Ko(e){return function(t){this.textContent=e.call(this,t)}}function Qo(e){var t,i;function n(){var s=e.apply(this,arguments);return s!==i&&(t=(i=s)&&Ko(s)),t}return n._value=e,n}function Jo(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,Qo(e))}function ta(){for(var e=this._name,t=this._id,i=pn(),n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,l,c=0;c<a;++c)if(l=o[c]){var h=et(l,t);$e(l,e,i,c,o,{time:h.time+h.delay+h.duration,delay:0,duration:h.duration,ease:h.ease})}return new ht(n,this._parents,e,i)}function ea(){var e,t,i=this,n=i._id,s=i.size();return new Promise(function(r,o){var a={value:o},l={value:function(){--s===0&&r()}};i.each(function(){var c=rt(this,n),h=c.on;h!==e&&(t=(e=h).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),c.on=t}),s===0&&r()})}var ia=0;function ht(e,t,i,n){this._groups=e,this._parents=t,this._name=i,this._id=n}function pn(){return++ia}var at=Wt.prototype;ht.prototype={constructor:ht,select:Lo,selectAll:Do,selectChild:at.selectChild,selectChildren:at.selectChildren,filter:Co,merge:Mo,selection:Bo,transition:ta,call:at.call,nodes:at.nodes,node:at.node,size:at.size,empty:at.empty,each:at.each,on:Po,attr:fo,attrTween:wo,style:Yo,styleTween:Wo,text:jo,textTween:Jo,remove:To,tween:ro,delay:bo,duration:zo,ease:Eo,easeVarying:No,end:ea,[Symbol.iterator]:at[Symbol.iterator]};function na(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var sa={time:null,delay:0,duration:250,ease:na};function ra(e,t){for(var i;!(i=e.__transition)||!(i=i[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return i}function oa(e){var t,i;e instanceof ht?(t=e._id,e=e._name):(t=pn(),(i=sa).time=Ge(),e=e==null?null:e+"");for(var n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,l,c=0;c<a;++c)(l=o[c])&&$e(l,e,t,c,o,i||ra(l,t));return new ht(n,this._parents,e,t)}Wt.prototype.interrupt=io;Wt.prototype.transition=oa;const ie=e=>()=>e;function aa(e,{sourceEvent:t,target:i,transform:n,dispatch:s}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},transform:{value:n,enumerable:!0,configurable:!0},_:{value:s}})}function lt(e,t,i){this.k=e,this.x=t,this.y=i}lt.prototype={constructor:lt,scale:function(e){return e===1?this:new lt(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new lt(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var _e=new lt(1,0,0);gn.prototype=lt.prototype;function gn(e){for(;!e.__zoom;)if(!(e=e.parentNode))return _e;return e.__zoom}function Ce(e){e.stopImmediatePropagation()}function Pt(e){e.preventDefault(),e.stopImmediatePropagation()}function la(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function ha(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function $i(){return this.__zoom||_e}function ca(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function da(){return navigator.maxTouchPoints||"ontouchstart"in this}function ua(e,t,i){var n=e.invertX(t[0][0])-i[0][0],s=e.invertX(t[1][0])-i[1][0],r=e.invertY(t[0][1])-i[0][1],o=e.invertY(t[1][1])-i[1][1];return e.translate(s>n?(n+s)/2:Math.min(0,n)||Math.max(0,s),o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o))}function fa(){var e=la,t=ha,i=ua,n=ca,s=da,r=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],a=250,l=re,c=Ye("start","zoom","end"),h,d,f,p=500,m=150,b=0,E=10;function v(u){u.property("__zoom",$i).on("wheel.zoom",j,{passive:!1}).on("mousedown.zoom",K).on("dblclick.zoom",dt).filter(s).on("touchstart.zoom",Mt).on("touchmove.zoom",_).on("touchend.zoom touchcancel.zoom",N).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}v.transform=function(u,y,g,x){var $=u.selection?u.selection():u;$.property("__zoom",$i),u!==$?F(u,y,g,x):$.interrupt().each(function(){P(this,arguments).event(x).start().zoom(null,typeof y=="function"?y.apply(this,arguments):y).end()})},v.scaleBy=function(u,y,g,x){v.scaleTo(u,function(){var $=this.__zoom.k,z=typeof y=="function"?y.apply(this,arguments):y;return $*z},g,x)},v.scaleTo=function(u,y,g,x){v.transform(u,function(){var $=t.apply(this,arguments),z=this.__zoom,S=g==null?T($):typeof g=="function"?g.apply(this,arguments):g,M=z.invert(S),H=typeof y=="function"?y.apply(this,arguments):y;return i(A(k(z,H),S,M),$,o)},g,x)},v.translateBy=function(u,y,g,x){v.transform(u,function(){return i(this.__zoom.translate(typeof y=="function"?y.apply(this,arguments):y,typeof g=="function"?g.apply(this,arguments):g),t.apply(this,arguments),o)},null,x)},v.translateTo=function(u,y,g,x,$){v.transform(u,function(){var z=t.apply(this,arguments),S=this.__zoom,M=x==null?T(z):typeof x=="function"?x.apply(this,arguments):x;return i(_e.translate(M[0],M[1]).scale(S.k).translate(typeof y=="function"?-y.apply(this,arguments):-y,typeof g=="function"?-g.apply(this,arguments):-g),z,o)},x,$)};function k(u,y){return y=Math.max(r[0],Math.min(r[1],y)),y===u.k?u:new lt(y,u.x,u.y)}function A(u,y,g){var x=y[0]-g[0]*u.k,$=y[1]-g[1]*u.k;return x===u.x&&$===u.y?u:new lt(u.k,x,$)}function T(u){return[(+u[0][0]+ +u[1][0])/2,(+u[0][1]+ +u[1][1])/2]}function F(u,y,g,x){u.on("start.zoom",function(){P(this,arguments).event(x).start()}).on("interrupt.zoom end.zoom",function(){P(this,arguments).event(x).end()}).tween("zoom",function(){var $=this,z=arguments,S=P($,z).event(x),M=t.apply($,z),H=g==null?T(M):typeof g=="function"?g.apply($,z):g,q=Math.max(M[1][0]-M[0][0],M[1][1]-M[0][1]),R=$.__zoom,Z=typeof y=="function"?y.apply($,z):y,Q=l(R.invert(H).concat(q/R.k),Z.invert(H).concat(q/Z.k));return function(W){if(W===1)W=Z;else{var it=Q(W),At=q/it[2];W=new lt(At,H[0]-it[0]*At,H[1]-it[1]*At)}S.zoom(null,W)}})}function P(u,y,g){return!g&&u.__zooming||new D(u,y)}function D(u,y){this.that=u,this.args=y,this.active=0,this.sourceEvent=null,this.extent=t.apply(u,y),this.taps=0}D.prototype={event:function(u){return u&&(this.sourceEvent=u),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(u,y){return this.mouse&&u!=="mouse"&&(this.mouse[1]=y.invert(this.mouse[0])),this.touch0&&u!=="touch"&&(this.touch0[1]=y.invert(this.touch0[0])),this.touch1&&u!=="touch"&&(this.touch1[1]=y.invert(this.touch1[0])),this.that.__zoom=y,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(u){var y=ft(this.that).datum();c.call(u,this.that,new aa(u,{sourceEvent:this.sourceEvent,target:v,transform:this.that.__zoom,dispatch:c}),y)}};function j(u,...y){if(!e.apply(this,arguments))return;var g=P(this,y).event(u),x=this.__zoom,$=Math.max(r[0],Math.min(r[1],x.k*Math.pow(2,n.apply(this,arguments)))),z=ut(u);if(g.wheel)(g.mouse[0][0]!==z[0]||g.mouse[0][1]!==z[1])&&(g.mouse[1]=x.invert(g.mouse[0]=z)),clearTimeout(g.wheel);else{if(x.k===$)return;g.mouse=[z,x.invert(z)],le(this),g.start()}Pt(u),g.wheel=setTimeout(S,m),g.zoom("mouse",i(A(k(x,$),g.mouse[0],g.mouse[1]),g.extent,o));function S(){g.wheel=null,g.end()}}function K(u,...y){if(f||!e.apply(this,arguments))return;var g=u.currentTarget,x=P(this,y,!0).event(u),$=ft(u.view).on("mousemove.zoom",H,!0).on("mouseup.zoom",q,!0),z=ut(u,g),S=u.clientX,M=u.clientY;wr(u.view),Ce(u),x.mouse=[z,this.__zoom.invert(z)],le(this),x.start();function H(R){if(Pt(R),!x.moved){var Z=R.clientX-S,Q=R.clientY-M;x.moved=Z*Z+Q*Q>b}x.event(R).zoom("mouse",i(A(x.that.__zoom,x.mouse[0]=ut(R,g),x.mouse[1]),x.extent,o))}function q(R){$.on("mousemove.zoom mouseup.zoom",null),vr(R.view,x.moved),Pt(R),x.event(R).end()}}function dt(u,...y){if(e.apply(this,arguments)){var g=this.__zoom,x=ut(u.changedTouches?u.changedTouches[0]:u,this),$=g.invert(x),z=g.k*(u.shiftKey?.5:2),S=i(A(k(g,z),x,$),t.apply(this,y),o);Pt(u),a>0?ft(this).transition().duration(a).call(F,S,x,u):ft(this).call(v.transform,S,x,u)}}function Mt(u,...y){if(e.apply(this,arguments)){var g=u.touches,x=g.length,$=P(this,y,u.changedTouches.length===x).event(u),z,S,M,H;for(Ce(u),S=0;S<x;++S)M=g[S],H=ut(M,this),H=[H,this.__zoom.invert(H),M.identifier],$.touch0?!$.touch1&&$.touch0[2]!==H[2]&&($.touch1=H,$.taps=0):($.touch0=H,z=!0,$.taps=1+!!h);h&&(h=clearTimeout(h)),z&&($.taps<2&&(d=H[0],h=setTimeout(function(){h=null},p)),le(this),$.start())}}function _(u,...y){if(this.__zooming){var g=P(this,y).event(u),x=u.changedTouches,$=x.length,z,S,M,H;for(Pt(u),z=0;z<$;++z)S=x[z],M=ut(S,this),g.touch0&&g.touch0[2]===S.identifier?g.touch0[0]=M:g.touch1&&g.touch1[2]===S.identifier&&(g.touch1[0]=M);if(S=g.that.__zoom,g.touch1){var q=g.touch0[0],R=g.touch0[1],Z=g.touch1[0],Q=g.touch1[1],W=(W=Z[0]-q[0])*W+(W=Z[1]-q[1])*W,it=(it=Q[0]-R[0])*it+(it=Q[1]-R[1])*it;S=k(S,Math.sqrt(W/it)),M=[(q[0]+Z[0])/2,(q[1]+Z[1])/2],H=[(R[0]+Q[0])/2,(R[1]+Q[1])/2]}else if(g.touch0)M=g.touch0[0],H=g.touch0[1];else return;g.zoom("touch",i(A(S,M,H),g.extent,o))}}function N(u,...y){if(this.__zooming){var g=P(this,y).event(u),x=u.changedTouches,$=x.length,z,S;for(Ce(u),f&&clearTimeout(f),f=setTimeout(function(){f=null},p),z=0;z<$;++z)S=x[z],g.touch0&&g.touch0[2]===S.identifier?delete g.touch0:g.touch1&&g.touch1[2]===S.identifier&&delete g.touch1;if(g.touch1&&!g.touch0&&(g.touch0=g.touch1,delete g.touch1),g.touch0)g.touch0[1]=this.__zoom.invert(g.touch0[0]);else if(g.end(),g.taps===2&&(S=ut(S,this),Math.hypot(d[0]-S[0],d[1]-S[1])<E)){var M=ft(this).on("dblclick.zoom");M&&M.apply(this,arguments)}}}return v.wheelDelta=function(u){return arguments.length?(n=typeof u=="function"?u:ie(+u),v):n},v.filter=function(u){return arguments.length?(e=typeof u=="function"?u:ie(!!u),v):e},v.touchable=function(u){return arguments.length?(s=typeof u=="function"?u:ie(!!u),v):s},v.extent=function(u){return arguments.length?(t=typeof u=="function"?u:ie([[+u[0][0],+u[0][1]],[+u[1][0],+u[1][1]]]),v):t},v.scaleExtent=function(u){return arguments.length?(r[0]=+u[0],r[1]=+u[1],v):[r[0],r[1]]},v.translateExtent=function(u){return arguments.length?(o[0][0]=+u[0][0],o[1][0]=+u[1][0],o[0][1]=+u[0][1],o[1][1]=+u[1][1],v):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},v.constrain=function(u){return arguments.length?(i=u,v):i},v.duration=function(u){return arguments.length?(a=+u,v):a},v.interpolate=function(u){return arguments.length?(l=u,v):l},v.on=function(){var u=c.on.apply(c,arguments);return u===c?v:u},v.clickDistance=function(u){return arguments.length?(b=(u=+u)*u,v):Math.sqrt(b)},v.tapDistance=function(u){return arguments.length?(E=+u,v):E},v}var _i;(function(e){e.Strict="strict",e.Loose="loose"})(_i||(_i={}));var Ot;(function(e){e.Free="free",e.Vertical="vertical",e.Horizontal="horizontal"})(Ot||(Ot={}));var zi;(function(e){e.Partial="partial",e.Full="full"})(zi||(zi={}));var Si;(function(e){e.Bezier="default",e.Straight="straight",e.Step="step",e.SmoothStep="smoothstep",e.SimpleBezier="simplebezier"})(Si||(Si={}));var Ei;(function(e){e.Arrow="arrow",e.ArrowClosed="arrowclosed"})(Ei||(Ei={}));exports.Position=void 0;(function(e){e.Left="left",e.Top="top",e.Right="right",e.Bottom="bottom"})(exports.Position||(exports.Position={}));exports.Position.Left+"",exports.Position.Right,exports.Position.Right+"",exports.Position.Left,exports.Position.Top+"",exports.Position.Bottom,exports.Position.Bottom+"",exports.Position.Top;const pa=(e,t=0,i=1)=>Math.min(Math.max(e,t),i),ki=e=>!isNaN(e)&&isFinite(e),mn=()=>typeof navigator<"u"&&navigator?.userAgent?.indexOf("Mac")>=0;function ga({sourceX:e,sourceY:t,targetX:i,targetY:n,sourceControlX:s,sourceControlY:r,targetControlX:o,targetControlY:a}){const l=e*.125+s*.375+o*.375+i*.125,c=t*.125+r*.375+a*.375+n*.125,h=Math.abs(l-e),d=Math.abs(c-t);return[l,c,h,d]}function ne(e,t){return e>=0?.5*e:t*25*Math.sqrt(-e)}function Ni({pos:e,x1:t,y1:i,x2:n,y2:s,c:r}){switch(e){case exports.Position.Left:return[t-ne(t-n,r),i];case exports.Position.Right:return[t+ne(n-t,r),i];case exports.Position.Top:return[t,i-ne(i-s,r)];case exports.Position.Bottom:return[t,i+ne(s-i,r)]}}function ma({sourceX:e,sourceY:t,sourcePosition:i=exports.Position.Bottom,targetX:n,targetY:s,targetPosition:r=exports.Position.Top,curvature:o=.25}){const[a,l]=Ni({pos:i,x1:e,y1:t,x2:n,y2:s,c:o}),[c,h]=Ni({pos:r,x1:n,y1:s,x2:e,y2:t,c:o}),[d,f,p,m]=ga({sourceX:e,sourceY:t,targetX:n,targetY:s,sourceControlX:a,sourceControlY:l,targetControlX:c,targetControlY:h});return[`M${e},${t} C${a},${l} ${c},${h} ${n},${s}`,d,f,p,m]}function yn({sourceX:e,sourceY:t,targetX:i,targetY:n}){const s=Math.abs(i-e)/2,r=i<e?i+s:i-s,o=Math.abs(n-t)/2,a=n<t?n+o:n-o;return[r,a,s,o]}function ya({sourceX:e,sourceY:t,targetX:i,targetY:n}){const[s,r,o,a]=yn({sourceX:e,sourceY:t,targetX:i,targetY:n});return[`M ${e},${t}L ${i},${n}`,s,r,o,a]}const Ci={[exports.Position.Left]:{x:-1,y:0},[exports.Position.Right]:{x:1,y:0},[exports.Position.Top]:{x:0,y:-1},[exports.Position.Bottom]:{x:0,y:1}},wa=({source:e,sourcePosition:t=exports.Position.Bottom,target:i})=>t===exports.Position.Left||t===exports.Position.Right?e.x<i.x?{x:1,y:0}:{x:-1,y:0}:e.y<i.y?{x:0,y:1}:{x:0,y:-1},Mi=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function va({source:e,sourcePosition:t=exports.Position.Bottom,target:i,targetPosition:n=exports.Position.Top,center:s,offset:r,stepPosition:o}){const a=Ci[t],l=Ci[n],c={x:e.x+a.x*r,y:e.y+a.y*r},h={x:i.x+l.x*r,y:i.y+l.y*r},d=wa({source:c,sourcePosition:t,target:h}),f=d.x!==0?"x":"y",p=d[f];let m=[],b,E;const v={x:0,y:0},k={x:0,y:0},[,,A,T]=yn({sourceX:e.x,sourceY:e.y,targetX:i.x,targetY:i.y});if(a[f]*l[f]===-1){f==="x"?(b=s.x??c.x+(h.x-c.x)*o,E=s.y??(c.y+h.y)/2):(b=s.x??(c.x+h.x)/2,E=s.y??c.y+(h.y-c.y)*o);const P=[{x:b,y:c.y},{x:b,y:h.y}],D=[{x:c.x,y:E},{x:h.x,y:E}];a[f]===p?m=f==="x"?P:D:m=f==="x"?D:P}else{const P=[{x:c.x,y:h.y}],D=[{x:h.x,y:c.y}];if(f==="x"?m=a.x===p?D:P:m=a.y===p?P:D,t===n){const _=Math.abs(e[f]-i[f]);if(_<=r){const N=Math.min(r-1,r-_);a[f]===p?v[f]=(c[f]>e[f]?-1:1)*N:k[f]=(h[f]>i[f]?-1:1)*N}}if(t!==n){const _=f==="x"?"y":"x",N=a[f]===l[_],u=c[_]>h[_],y=c[_]<h[_];(a[f]===1&&(!N&&u||N&&y)||a[f]!==1&&(!N&&y||N&&u))&&(m=f==="x"?P:D)}const j={x:c.x+v.x,y:c.y+v.y},K={x:h.x+k.x,y:h.y+k.y},dt=Math.max(Math.abs(j.x-m[0].x),Math.abs(K.x-m[0].x)),Mt=Math.max(Math.abs(j.y-m[0].y),Math.abs(K.y-m[0].y));dt>=Mt?(b=(j.x+K.x)/2,E=m[0].y):(b=m[0].x,E=(j.y+K.y)/2)}return[[e,{x:c.x+v.x,y:c.y+v.y},...m,{x:h.x+k.x,y:h.y+k.y},i],b,E,A,T]}function xa(e,t,i,n){const s=Math.min(Mi(e,t)/2,Mi(t,i)/2,n),{x:r,y:o}=t;if(e.x===r&&r===i.x||e.y===o&&o===i.y)return`L${r} ${o}`;if(e.y===o){const c=e.x<i.x?-1:1,h=e.y<i.y?1:-1;return`L ${r+s*c},${o}Q ${r},${o} ${r},${o+s*h}`}const a=e.x<i.x?1:-1,l=e.y<i.y?-1:1;return`L ${r},${o+s*l}Q ${r},${o} ${r+s*a},${o}`}function ba({sourceX:e,sourceY:t,sourcePosition:i=exports.Position.Bottom,targetX:n,targetY:s,targetPosition:r=exports.Position.Top,borderRadius:o=5,centerX:a,centerY:l,offset:c=20,stepPosition:h=.5}){const[d,f,p,m,b]=va({source:{x:e,y:t},sourcePosition:i,target:{x:n,y:s},targetPosition:r,center:{x:a,y:l},offset:c,stepPosition:h});return[d.reduce((v,k,A)=>{let T="";return A>0&&A<d.length-1?T=xa(d[A-1],k,d[A+1],o):T=`${A===0?"M":"L"}${k.x} ${k.y}`,v+=T,v},""),f,p,m,b]}const $a=(e,t)=>e.x!==t.x||e.y!==t.y||e.zoom!==t.k,ze=e=>({x:e.x,y:e.y,zoom:e.k}),Me=({x:e,y:t,zoom:i})=>_e.translate(e,t).scale(i),St=(e,t)=>e.target.closest(`.${t}`),wn=(e,t)=>t===2&&Array.isArray(e)&&e.includes(2),_a=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,Ae=(e,t=0,i=_a,n=()=>{})=>{const s=typeof t=="number"&&t>0;return s||n(),s?e.transition().duration(t).ease(i).on("end",n):e},vn=e=>{const t=e.ctrlKey&&mn()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*t};function za({zoomPanValues:e,noWheelClassName:t,d3Selection:i,d3Zoom:n,panOnScrollMode:s,panOnScrollSpeed:r,zoomOnPinch:o,onPanZoomStart:a,onPanZoom:l,onPanZoomEnd:c}){return h=>{if(St(h,t))return h.ctrlKey&&h.preventDefault(),!1;h.preventDefault(),h.stopImmediatePropagation();const d=i.property("__zoom").k||1;if(h.ctrlKey&&o){const E=ut(h),v=vn(h),k=d*Math.pow(2,v);n.scaleTo(i,k,E,h);return}const f=h.deltaMode===1?20:1;let p=s===Ot.Vertical?0:h.deltaX*f,m=s===Ot.Horizontal?0:h.deltaY*f;!mn()&&h.shiftKey&&s!==Ot.Vertical&&(p=h.deltaY*f,m=0),n.translateBy(i,-(p/d)*r,-(m/d)*r,{internal:!0});const b=ze(i.property("__zoom"));clearTimeout(e.panScrollTimeout),e.isPanScrolling||(e.isPanScrolling=!0),e.isPanScrolling&&(l?.(h,b),e.panScrollTimeout=setTimeout(()=>{e.isPanScrolling=!1},150))}}function Sa({noWheelClassName:e,preventScrolling:t,d3ZoomHandler:i}){return function(n,s){const r=n.type==="wheel",o=!t&&r&&!n.ctrlKey,a=St(n,e);if(n.ctrlKey&&r&&a&&n.preventDefault(),o||a)return null;n.preventDefault(),i.call(this,n,s)}}function Ea({zoomPanValues:e,onDraggingChange:t,onPanZoomStart:i}){return n=>{if(n.sourceEvent?.internal)return;const s=ze(n.transform);e.mouseButton=n.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=s,n.sourceEvent?.type==="mousedown"&&t(!0),i&&i?.(n.sourceEvent,s)}}function ka({zoomPanValues:e,panOnDrag:t,onPaneContextMenu:i,onTransformChange:n,onPanZoom:s}){return r=>{e.usedRightMouseButton=!!(i&&wn(t,e.mouseButton??0)),r.sourceEvent?.sync||n([r.transform.x,r.transform.y,r.transform.k]),s&&!r.sourceEvent?.internal&&s?.(r.sourceEvent,ze(r.transform))}}function Na({zoomPanValues:e,panOnDrag:t,panOnScroll:i,onDraggingChange:n,onPanZoomEnd:s,onPaneContextMenu:r}){return o=>{if(!o.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,r&&wn(t,e.mouseButton??0)&&!e.usedRightMouseButton&&o.sourceEvent&&r(o.sourceEvent),e.usedRightMouseButton=!1,n(!1),s&&$a(e.prevViewport,o.transform))){const a=ze(o.transform);e.prevViewport=a,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{s?.(o.sourceEvent,a)},i?150:0)}}}function Ca({zoomActivationKeyPressed:e,zoomOnScroll:t,zoomOnPinch:i,panOnDrag:n,panOnScroll:s,zoomOnDoubleClick:r,userSelectionActive:o,noWheelClassName:a,noPanClassName:l,lib:c,connectionInProgress:h}){return d=>{const f=e||t,p=i&&d.ctrlKey,m=d.type==="wheel";if(d.button===1&&d.type==="mousedown"&&(St(d,`${c}-flow__node`)||St(d,`${c}-flow__edge`)))return!0;if(!n&&!f&&!s&&!r&&!i||o||h&&!m||St(d,a)&&m||St(d,l)&&(!m||s&&m&&!e)||!i&&d.ctrlKey&&m)return!1;if(!i&&d.type==="touchstart"&&d.touches?.length>1)return d.preventDefault(),!1;if(!f&&!s&&!p&&m||!n&&(d.type==="mousedown"||d.type==="touchstart")||Array.isArray(n)&&!n.includes(d.button)&&d.type==="mousedown")return!1;const b=Array.isArray(n)&&n.includes(d.button)||!d.button||d.button<=1;return(!d.ctrlKey||m)&&b}}function Ma({domNode:e,minZoom:t,maxZoom:i,paneClickDistance:n,translateExtent:s,viewport:r,onPanZoom:o,onPanZoomStart:a,onPanZoomEnd:l,onDraggingChange:c}){const h={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{x:0,y:0,zoom:0},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},d=e.getBoundingClientRect(),f=fa().clickDistance(!ki(n)||n<0?0:n).scaleExtent([t,i]).translateExtent(s),p=ft(e).call(f);A({x:r.x,y:r.y,zoom:pa(r.zoom,t,i)},[[0,0],[d.width,d.height]],s);const m=p.on("wheel.zoom"),b=p.on("dblclick.zoom");f.wheelDelta(vn);function E(_,N){return p?new Promise(u=>{f?.interpolate(N?.interpolate==="linear"?Dt:re).transform(Ae(p,N?.duration,N?.ease,()=>u(!0)),_)}):Promise.resolve(!1)}function v({noWheelClassName:_,noPanClassName:N,onPaneContextMenu:u,userSelectionActive:y,panOnScroll:g,panOnDrag:x,panOnScrollMode:$,panOnScrollSpeed:z,preventScrolling:S,zoomOnPinch:M,zoomOnScroll:H,zoomOnDoubleClick:q,zoomActivationKeyPressed:R,lib:Z,onTransformChange:Q,connectionInProgress:W}){y&&!h.isZoomingOrPanning&&k();const At=g&&!R&&!y?za({zoomPanValues:h,noWheelClassName:_,d3Selection:p,d3Zoom:f,panOnScrollMode:$,panOnScrollSpeed:z,zoomOnPinch:M,onPanZoomStart:a,onPanZoom:o,onPanZoomEnd:l}):Sa({noWheelClassName:_,preventScrolling:S,d3ZoomHandler:m});if(p.on("wheel.zoom",At,{passive:!1}),!y){const Pn=Ea({zoomPanValues:h,onDraggingChange:c,onPanZoomStart:a});f.on("start",Pn);const Rn=ka({zoomPanValues:h,panOnDrag:x,onPaneContextMenu:!!u,onPanZoom:o,onTransformChange:Q});f.on("zoom",Rn);const Tn=Na({zoomPanValues:h,panOnDrag:x,panOnScroll:g,onPaneContextMenu:u,onPanZoomEnd:l,onDraggingChange:c});f.on("end",Tn)}const Hn=Ca({zoomActivationKeyPressed:R,panOnDrag:x,zoomOnScroll:H,panOnScroll:g,zoomOnDoubleClick:q,zoomOnPinch:M,userSelectionActive:y,noPanClassName:N,noWheelClassName:_,lib:Z,connectionInProgress:W});f.filter(Hn),q?p.on("dblclick.zoom",b):p.on("dblclick.zoom",null)}function k(){f.on("zoom",null)}async function A(_,N,u){const y=Me(_),g=f?.constrain()(y,N,u);return g&&await E(g),new Promise(x=>x(g))}async function T(_,N){const u=Me(_);return await E(u,N),new Promise(y=>y(u))}function F(_){if(p){const N=Me(_),u=p.property("__zoom");(u.k!==_.zoom||u.x!==_.x||u.y!==_.y)&&f?.transform(p,N,null,{sync:!0})}}function P(){const _=p?gn(p.node()):{x:0,y:0,k:1};return{x:_.x,y:_.y,zoom:_.k}}function D(_,N){return p?new Promise(u=>{f?.interpolate(N?.interpolate==="linear"?Dt:re).scaleTo(Ae(p,N?.duration,N?.ease,()=>u(!0)),_)}):Promise.resolve(!1)}function j(_,N){return p?new Promise(u=>{f?.interpolate(N?.interpolate==="linear"?Dt:re).scaleBy(Ae(p,N?.duration,N?.ease,()=>u(!0)),_)}):Promise.resolve(!1)}function K(_){f?.scaleExtent(_)}function dt(_){f?.translateExtent(_)}function Mt(_){const N=!ki(_)||_<0?0:_;f?.clickDistance(N)}return{update:v,destroy:k,setViewport:T,setViewportConstrained:A,getViewport:P,scaleTo:D,scaleBy:j,setScaleExtent:K,setTranslateExtent:dt,syncViewport:F,setClickDistance:Mt}}var Ai;(function(e){e.Line="line",e.Handle="handle"})(Ai||(Ai={}));class xn{constructor(t={}){this.container=null,this.state={nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},this.subscribers=new Set,this.panZoomInstance=null,this.pendingNodes=[],this.options={minZoom:.5,maxZoom:2,defaultZoom:1,nodesDraggable:!0,nodesConnectable:!0,elementsSelectable:!0,...t},this.state.nodes=t.nodes||[],this.state.edges=t.edges||[],this.updateLookups()}mount(t){this.container=t,this.panZoomInstance=Ma({domNode:t,minZoom:this.options.minZoom||.5,maxZoom:this.options.maxZoom||2,paneClickDistance:0,translateExtent:[[-1/0,-1/0],[1/0,1/0]],viewport:this.state.viewport,onDraggingChange:i=>{this.container?.classList.toggle("panning",i)},onPanZoom:(i,n)=>{this.state.viewport=n,this.notifySubscribers()},onPanZoomStart:(i,n)=>{},onPanZoomEnd:(i,n)=>{}}),this.panZoomInstance.update({noWheelClassName:"nowheel",noPanClassName:"nopan",onPaneContextMenu:void 0,preventScrolling:!0,panOnScroll:!0,panOnDrag:!0,panOnScrollMode:"free",panOnScrollSpeed:.8,userSelectionActive:!1,zoomOnPinch:!0,zoomOnScroll:!0,zoomOnDoubleClick:!0,zoomActivationKeyPressed:!1,lib:"lit-flow",onTransformChange:i=>{},connectionInProgress:!1}),this.notifySubscribers()}destroy(){this.panZoomInstance?.destroy(),this.panZoomInstance=null,this.container=null,this.subscribers.clear()}getState(){return this.state}get nodes(){return this.state.nodes}get edges(){return this.state.edges}getViewport(){return this.state.viewport}setViewport(t){this.state.viewport=t,this.panZoomInstance?.setViewport?.(t),this.notifySubscribers()}setNodes(t){this.pendingNodes.push(...t.map(i=>i.id)),this.state.nodes=t,this.updateLookups(),this.notifySubscribers()}setEdges(t){this.retryEdgeRendering(t)}updateNode(t,i){this.state.nodes=this.state.nodes.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}updateEdge(t,i){this.state.edges=this.state.edges.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}addNode(t){this.state.nodes=[...this.state.nodes,t],this.updateLookups(),this.notifySubscribers()}removeNode(t){this.state.nodes=this.state.nodes.filter(i=>i.id!==t),this.state.edges=this.state.edges.filter(i=>i.source!==t&&i.target!==t),this.updateLookups(),this.notifySubscribers()}addEdge(t){this.state.edges=[...this.state.edges,t],this.updateLookups(),this.notifySubscribers()}removeEdge(t){this.state.edges=this.state.edges.filter(i=>i.id!==t),this.updateLookups(),this.notifySubscribers()}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}zoomIn(){const t=this.state.viewport.zoom,i=Math.min(t*1.2,this.options.maxZoom||2);this.setViewport({...this.state.viewport,zoom:i})}zoomOut(){const t=this.state.viewport.zoom,i=Math.max(t/1.2,this.options.minZoom||.5);this.setViewport({...this.state.viewport,zoom:i})}fitView(){if(this.state.nodes.length===0||!this.container)return;let t=1/0,i=1/0,n=-1/0,s=-1/0;this.state.nodes.forEach(m=>{const b=m.measured?.width||m.width||150,E=m.measured?.height||m.height||50;t=Math.min(t,m.position.x),i=Math.min(i,m.position.y),n=Math.max(n,m.position.x+b),s=Math.max(s,m.position.y+E)});const r={x:t,y:i,width:n-t,height:s-i},o=this.container.clientWidth,a=this.container.clientHeight,l=50,c=(o-l*2)/r.width,h=(a-l*2)/r.height,d=Math.min(c,h,this.options.maxZoom||2),f=(o-r.width*d)/2-r.x*d,p=(a-r.height*d)/2-r.y*d;this.setViewport({x:f,y:p,zoom:d})}updateLookups(){this.state.nodeLookup.clear(),this.state.nodes.forEach(t=>{const i={...t,measured:t.measured||{width:t.width,height:t.height},internals:{positionAbsolute:t.position,z:t.zIndex||0,userNode:t}};this.state.nodeLookup.set(t.id,i)}),this.state.edgeLookup.clear(),this.state.edges.forEach(t=>{this.state.edgeLookup.set(t.id,t)})}isNodeRendered(t){if(!this.container)return!1;const i=this.container.querySelector(`[id="${CSS.escape(t)}"]`);if(!i)return!1;const n=i.getBoundingClientRect();return n.width>0&&n.height>0}hasPendingNodes(t){return t.some(i=>this.pendingNodes.includes(i)||!this.isNodeRendered(i))}markNodeAsRendered(t){const i=this.pendingNodes.indexOf(t);i>-1&&this.pendingNodes.splice(i,1)}retryEdgeRendering(t,i=0,n=10){const s=t.flatMap(o=>[o.source,o.target]),r=[...new Set(s)];this.hasPendingNodes(r)&&i<n?setTimeout(()=>{this.retryEdgeRendering(t,i+1,n)},100):(this.state.edges=t,this.updateLookups(),this.notifySubscribers(),r.forEach(o=>this.markNodeAsRendered(o)))}notifySubscribers(){this.subscribers.forEach(t=>t(this.state))}}function Aa(e={}){const t={nodes:e.nodes||[],edges:e.edges||[],viewport:e.viewport||{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},i=new Set,n=()=>{t.nodeLookup.clear(),t.nodes.forEach(s=>{const r={...s,measured:s.measured||{width:s.width,height:s.height},internals:{positionAbsolute:s.position,z:s.zIndex||0,userNode:s}};t.nodeLookup.set(s.id,r)}),t.edgeLookup.clear(),t.edges.forEach(s=>{t.edgeLookup.set(s.id,s)})};return n(),{getState:()=>t,setState:s=>{Object.assign(t,s),n(),i.forEach(r=>r(t))},subscribe:s=>(i.add(s),()=>i.delete(s))}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=globalThis,Qe=he.ShadowRoot&&(he.ShadyCSS===void 0||he.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Je=Symbol(),Hi=new WeakMap;let bn=class{constructor(t,i,n){if(this._$cssResult$=!0,n!==Je)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Qe&&t===void 0){const n=i!==void 0&&i.length===1;n&&(t=Hi.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Hi.set(i,t))}return t}toString(){return this.cssText}};const Ha=e=>new bn(typeof e=="string"?e:e+"",void 0,Je),B=(e,...t)=>{const i=e.length===1?e[0]:t.reduce(((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1]),e[0]);return new bn(i,e,Je)},Pa=(e,t)=>{if(Qe)e.adoptedStyleSheets=t.map((i=>i instanceof CSSStyleSheet?i:i.styleSheet));else for(const i of t){const n=document.createElement("style"),s=he.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=i.cssText,e.appendChild(n)}},Pi=Qe?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const n of t.cssRules)i+=n.cssText;return Ha(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ra,defineProperty:Ta,getOwnPropertyDescriptor:La,getOwnPropertyNames:Da,getOwnPropertySymbols:Oa,getPrototypeOf:Ba}=Object,Se=globalThis,Ri=Se.trustedTypes,Fa=Ri?Ri.emptyScript:"",Ia=Se.reactiveElementPolyfillSupport,Bt=(e,t)=>e,ye={toAttribute(e,t){switch(t){case Boolean:e=e?Fa:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},ti=(e,t)=>!Ra(e,t),Ti={attribute:!0,type:String,converter:ye,reflect:!1,useDefault:!1,hasChanged:ti};Symbol.metadata??=Symbol("metadata"),Se.litPropertyMetadata??=new WeakMap;let zt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Ti){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(t,n,i);s!==void 0&&Ta(this.prototype,t,s)}}static getPropertyDescriptor(t,i,n){const{get:s,set:r}=La(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:s,set(o){const a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ti}static _$Ei(){if(this.hasOwnProperty(Bt("elementProperties")))return;const t=Ba(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Bt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Bt("properties"))){const i=this.properties,n=[...Da(i),...Oa(i)];for(const s of n)this.createProperty(s,i[s])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[n,s]of i)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[i,n]of this.elementProperties){const s=this._$Eu(i,n);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const s of n)i.unshift(Pi(s))}else t!==void 0&&i.push(Pi(t));return i}static _$Eu(t,i){const n=i.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const n of i.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pa(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,n){this._$AK(t,n)}_$ET(t,i){const n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:ye).toAttribute(i,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,i){const n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ye;this._$Em=s;const a=o.fromAttribute(i,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,i,n){if(t!==void 0){const s=this.constructor,r=this[t];if(n??=s.getPropertyOptions(t),!((n.hasChanged??ti)(r,i)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,i,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??i??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(i=void 0),this._$AL.set(t,i)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach((n=>n.hostUpdate?.())),this.update(i)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach((i=>i.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};zt.elementStyles=[],zt.shadowRootOptions={mode:"open"},zt[Bt("elementProperties")]=new Map,zt[Bt("finalized")]=new Map,Ia?.({ReactiveElement:zt}),(Se.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ei=globalThis,we=ei.trustedTypes,Li=we?we.createPolicy("lit-html",{createHTML:e=>e}):void 0,$n="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,_n="?"+pt,Ua=`<${_n}>`,bt=document,Xt=()=>bt.createComment(""),Yt=e=>e===null||typeof e!="object"&&typeof e!="function",ii=Array.isArray,Xa=e=>ii(e)||typeof e?.[Symbol.iterator]=="function",He=`[ 	
\f\r]`,Rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Di=/-->/g,Oi=/>/g,gt=RegExp(`>|${He}(?:([^\\s"'>=/]+)(${He}*=${He}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bi=/'/g,Fi=/"/g,zn=/^(?:script|style|textarea|title)$/i,Sn=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),C=Sn(1),G=Sn(2),$t=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),Ii=new WeakMap,yt=bt.createTreeWalker(bt,129);function En(e,t){if(!ii(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Li!==void 0?Li.createHTML(t):t}const Ya=(e,t)=>{const i=e.length-1,n=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=Rt;for(let a=0;a<i;a++){const l=e[a];let c,h,d=-1,f=0;for(;f<l.length&&(o.lastIndex=f,h=o.exec(l),h!==null);)f=o.lastIndex,o===Rt?h[1]==="!--"?o=Di:h[1]!==void 0?o=Oi:h[2]!==void 0?(zn.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=gt):h[3]!==void 0&&(o=gt):o===gt?h[0]===">"?(o=s??Rt,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?gt:h[3]==='"'?Fi:Bi):o===Fi||o===Bi?o=gt:o===Di||o===Oi?o=Rt:(o=gt,s=void 0);const p=o===gt&&e[a+1].startsWith("/>")?" ":"";r+=o===Rt?l+Ua:d>=0?(n.push(c),l.slice(0,d)+$n+l.slice(d)+pt+p):l+pt+(d===-2?a:p)}return[En(e,r+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]};class qt{constructor({strings:t,_$litType$:i},n){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[c,h]=Ya(t,i);if(this.el=qt.createElement(c,n),yt.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=yt.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith($n)){const f=h[o++],p=s.getAttribute(d).split(pt),m=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:m[2],strings:p,ctor:m[1]==="."?Za:m[1]==="?"?Wa:m[1]==="@"?Va:Ee}),s.removeAttribute(d)}else d.startsWith(pt)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(zn.test(s.tagName)){const d=s.textContent.split(pt),f=d.length-1;if(f>0){s.textContent=we?we.emptyScript:"";for(let p=0;p<f;p++)s.append(d[p],Xt()),yt.nextNode(),l.push({type:2,index:++r});s.append(d[f],Xt())}}}else if(s.nodeType===8)if(s.data===_n)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(pt,d+1))!==-1;)l.push({type:7,index:r}),d+=pt.length-1}r++}}static createElement(t,i){const n=bt.createElement("template");return n.innerHTML=t,n}}function Ct(e,t,i=e,n){if(t===$t)return t;let s=n!==void 0?i._$Co?.[n]:i._$Cl;const r=Yt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,i,n)),n!==void 0?(i._$Co??=[])[n]=s:i._$Cl=s),s!==void 0&&(t=Ct(e,s._$AS(e,t.values),s,n)),t}class qa{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:n}=this._$AD,s=(t?.creationScope??bt).importNode(i,!0);yt.currentNode=s;let r=yt.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Gt(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Ga(r,this,t)),this._$AV.push(c),l=n[++a]}o!==l?.index&&(r=yt.nextNode(),o++)}return yt.currentNode=bt,s}p(t){let i=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,i),i+=n.strings.length-2):n._$AI(t[i])),i++}}class Gt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,n,s){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Ct(this,t,i),Yt(t)?t===L||t==null||t===""?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==$t&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Xa(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==L&&Yt(this._$AH)?this._$AA.nextSibling.data=t:this.T(bt.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=qt.createElement(En(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(i);else{const r=new qa(s,this),o=r.u(this.options);r.p(i),this.T(o),this._$AH=r}}_$AC(t){let i=Ii.get(t.strings);return i===void 0&&Ii.set(t.strings,i=new qt(t)),i}k(t){ii(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const r of t)s===i.length?i.push(n=new Gt(this.O(Xt()),this.O(Xt()),this,this.options)):n=i[s],n._$AI(r),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,n,s,r){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=L}_$AI(t,i=this,n,s){const r=this.strings;let o=!1;if(r===void 0)t=Ct(this,t,i,0),o=!Yt(t)||t!==this._$AH&&t!==$t,o&&(this._$AH=t);else{const a=t;let l,c;for(t=r[0],l=0;l<r.length-1;l++)c=Ct(this,a[n+l],i,l),c===$t&&(c=this._$AH[l]),o||=!Yt(c)||c!==this._$AH[l],c===L?t=L:t!==L&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Za extends Ee{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}class Wa extends Ee{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==L)}}class Va extends Ee{constructor(t,i,n,s,r){super(t,i,n,s,r),this.type=5}_$AI(t,i=this){if((t=Ct(this,t,i,0)??L)===$t)return;const n=this._$AH,s=t===L&&n!==L||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==L&&(n===L||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ga{constructor(t,i,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ct(this,t)}}const ja=ei.litHtmlPolyfillSupport;ja?.(qt,Gt),(ei.litHtmlVersions??=[]).push("3.3.1");const kn=(e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(s===void 0){const r=i?.renderBefore??null;n._$litPart$=s=new Gt(t.insertBefore(Xt(),r),r,void 0,i??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ni=globalThis;let O=class extends zt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=kn(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}};O._$litElement$=!0,O.finalized=!0,ni.litElementHydrateSupport?.({LitElement:O});const Ka=ni.litElementPolyfillSupport;Ka?.({LitElement:O});(ni.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nn=Symbol.for(""),Qa=e=>{if(e?.r===Nn)return e?._$litStatic$},Ja=e=>({_$litStatic$:e,r:Nn}),Ui=new Map,tl=e=>(t,...i)=>{const n=i.length;let s,r;const o=[],a=[];let l,c=0,h=!1;for(;c<n;){for(l=t[c];c<n&&(r=i[c],(s=Qa(r))!==void 0);)l+=s+t[++c],h=!0;c!==n&&a.push(r),o.push(l),c++}if(c===n&&o.push(t[n]),h){const d=o.join("$$lit$$");(t=Ui.get(d))===void 0&&(o.raw=o,Ui.set(d,t=o)),i=a}return e(t,...i)},J=tl(C);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=e=>(t,i)=>{i!==void 0?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const el={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:ti},il=(e=el,t,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),n==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),n==="accessor"){const{name:o}=i;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,e)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(n==="setter"){const{name:o}=i;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,e)}}throw Error("Unsupported decorator location: "+n)};function w(e){return(t,i)=>typeof i=="object"?il(e,t,i):((n,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nl={ATTRIBUTE:1},sl=e=>(...t)=>({_$litDirective$:e,values:t});let rl=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,n){this._$Ct=t,this._$AM=i,this._$Ci=n}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cn="important",ol=" !"+Cn,al=sl(class extends rl{constructor(e){if(super(e),e.type!==nl.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const n=e[i];return n==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`}),"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in t){const s=t[n];if(s!=null){this.ft.add(n);const r=typeof s=="string"&&s.endsWith(ol);n.includes("-")||r?i.setProperty(n,r?s.slice(0,-11):s,r?Cn:""):i[n]=s}}return $t}});function ll(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function hl(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function ve(e){return ma(e)}function Xe(e){return ba(e)}function Mn(e){return ya(e)}function cl(e,t){return e.x>=t.x&&e.x<=t.x+t.width&&e.y>=t.y&&e.y<=t.y+t.height}var dl=Object.defineProperty,ul=Object.getOwnPropertyDescriptor,jt=(e,t,i,n)=>{for(var s=n>1?void 0:n?ul(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&dl(t,i,s),s};exports.FlowCanvas=class extends O{constructor(){super(),this.nodes=[],this.edges=[],this.viewport={x:0,y:0,zoom:1},this.nodeTypes={default:"flow-node",shape:"shape-node","erd-table":"erd-table-node"},this.connection=null,this.onHandleStart=t=>{const{nodeId:i,type:n,handleId:s}=t.detail;this.connection={from:{nodeId:i,handleId:s}}},this.onMouseMove=t=>{if(!this.connection)return;const i=this.screenToCanvas(t.clientX,t.clientY);this.connection.preview=i,this.requestUpdate()},this.onMouseUp=t=>{if(!this.connection)return;const i=t.composedPath();let n=null,s;for(const o of i)if(o instanceof HTMLElement){const a=o.tagName.toLowerCase();if(a==="flow-node"||Object.values(this.nodeTypes).some(l=>l===a)){n=o;break}o.dataset.handleId&&(s=o.dataset.handleId)}const r=n?.getAttribute("id")||void 0;if(this.connection.from&&r&&r!==this.connection.from.nodeId){const o=`e-${this.connection.from.nodeId}-${r}-${Date.now()}`,a=this.connection.from.nodeId,l=this.connection.from.handleId;let c=s;if(!c){const h=this.nodes.find(d=>d.id===r);h&&h.type==="shape"&&(c=this.determineBestTargetHandle(a,r),console.log("Auto-determined target handle:",{sourceNodeId:a,targetId:r,finalTargetHandleId:c}))}this.instance.addEdge({id:o,source:a,target:r,sourceHandle:l,targetHandle:c,data:{}})}this.connection=null,this.requestUpdate()},this.onNodeSelect=t=>{const{nodeId:i,selected:n,node:s}=t.detail;this.instance.updateNode(i,{selected:n}),this.dispatchEvent(new CustomEvent("node-selected",{detail:{nodeId:i,selected:n,node:s,allSelectedNodes:this.nodes.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.onEdgeSelect=t=>{const{edgeId:i,selected:n,edge:s}=t.detail;this.instance.updateEdge(i,{selected:n}),this.dispatchEvent(new CustomEvent("edge-selected",{detail:{edgeId:i,selected:n,edge:s,allSelectedEdges:this.edges.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.instance=new xn({nodes:this.nodes,edges:this.edges})}createRenderRoot(){return super.createRenderRoot()}getNodeGeom(t){const i=this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`),n=this.renderRoot.querySelector(".flow-viewport");if(!i||!n)return null;const s=i.getBoundingClientRect(),r=n.getBoundingClientRect(),o=this.viewport.zoom||1,a=(s.left-r.left-this.viewport.x)/o,l=(s.top-r.top-this.viewport.y)/o,c=s.width/o,h=s.height/o,d=l+h/2;return{left:{x:a,y:d},right:{x:a+c,y:d}}}getHandleCanvasPosition(t,i){const n=this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);if(!n)return null;let s=null;const r=n.shadowRoot;if(r&&(s=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),s||(s=n.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),!s)return null;const o=this.nodes.find(f=>f.id===t);if(!o)return null;if(o.type==="shape")return console.log("getHandleCanvasPosition for shape node:",{nodeId:t,handleId:i,node:o}),this.getShapeHandlePosition(o,i);const a=n.getBoundingClientRect(),l=s.getBoundingClientRect(),c=this.viewport.zoom||1,h=(l.left+l.width/2-a.left)/c,d=(l.top+l.height/2-a.top)/c;return{x:o.position.x+h,y:o.position.y+d}}getShapeHandlePosition(t,i){const n=t.data;if(!n)return null;const s=n.size||{width:200,height:200},r=s.width,o=s.height,a=i.split("-"),l=a[a.length-1];console.log("getShapeHandlePosition:",{handleId:i,parts:a,handleType:l,node:t.id,size:s});let c=0,h=0;switch(l){case"right":c=r,h=o/2;break;case"left":c=0,h=o/2;break;case"top":c=r/2,h=0;break;case"bottom":c=r/2,h=o;break;default:c=r/2,h=o/2}const d={x:t.position.x+c,y:t.position.y+h};return console.log("getShapeHandlePosition result:",{nodeId:t.id,position:t.position,offsetX:c,offsetY:h,result:d}),d}setNodes(t){this.instance.setNodes(t)}setEdges(t){this.instance.setEdges(t)}determineBestTargetHandle(t,i){const n=this.nodes.find(k=>k.id===t),s=this.nodes.find(k=>k.id===i);if(!n||!s)return`${i}-target-left`;const r=n.position.x,o=n.position.y,a=s.position.x,l=s.position.y,c=s.data,h=c?.size?.width||200,d=c?.size?.height||200,f=r+(n.width||150)/2,p=o+(n.height||50)/2,m=a+h/2,b=l+d/2,E=m-f,v=b-p;return Math.abs(E)>Math.abs(v)?E>0?`${i}-target-left`:`${i}-target-right`:v>0?`${i}-target-top`:`${i}-target-bottom`}computeLabelCanvasPosition(t){const i=this.nodes.find(h=>h.id===t.source),n=this.nodes.find(h=>h.id===t.target);if(!i||!n)return null;let s,r,o,a;if(t.sourceHandle){const h=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(h)s=h.x,r=h.y;else{const d=i.measured?.width||i.width||150,f=i.measured?.height||i.height||50;s=i.position.x+d,r=i.position.y+f/2}}else{const h=i.measured?.width||i.width||150,d=i.measured?.height||i.height||50;s=i.position.x+h,r=i.position.y+d/2}if(t.targetHandle){const h=this.getHandleCanvasPosition(t.target,t.targetHandle);if(h)o=h.x,a=h.y;else{o=n.position.x;const d=n.measured?.height||n.height||50;a=n.position.y+d/2}}else{o=n.position.x;const h=n.measured?.height||n.height||50;a=n.position.y+h/2}const[,l,c]=ve({sourceX:s,sourceY:r,sourcePosition:exports.Position.Right,targetX:o,targetY:a,targetPosition:exports.Position.Left});return{x:l,y:c}}computeStartLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.source);if(!i)return null;let n,s;if(t.sourceHandle){const r=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.width||i.width||150,a=i.measured?.height||i.height||50;n=i.position.x+o,s=i.position.y+a/2}}else{const r=i.measured?.width||i.width||150,o=i.measured?.height||i.height||50;n=i.position.x+r,s=i.position.y+o/2}return{x:n+12,y:s-10}}computeEndLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.target);if(!i)return null;let n,s;if(t.targetHandle){const r=this.getHandleCanvasPosition(t.target,t.targetHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+o/2}}else{const r=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+r/2}return{x:n-12,y:s-10}}firstUpdated(){const t=this.renderRoot.querySelector(".flow-container");t&&(this.instance.mount(t),this.unsubscribe=this.instance.subscribe(i=>{this.nodes=i.nodes,this.edges=i.edges,this.viewport=i.viewport,this.requestUpdate()}),t.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("node-select",this.onNodeSelect),document.addEventListener("edge-select",this.onEdgeSelect))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.instance.destroy();const t=this.renderRoot.querySelector(".flow-container");t?.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),t?.removeEventListener("node-select",this.onNodeSelect),document.removeEventListener("edge-select",this.onEdgeSelect)}renderNode(t){const i=t.type||"default",n=this.nodeTypes[i]||"flow-node",s=Ja(n);return J`
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
            ${this.edges.map(i=>{const n=this.nodes.find(r=>r.id===i.source),s=this.nodes.find(r=>r.id===i.target);return!n||!s?null:J`
                <flow-edge 
                  .id=${i.id}
                  .source=${i.source}
                  .target=${i.target}
                  .sourceHandle=${i.sourceHandle}
                  .targetHandle=${i.targetHandle}
                  .sourceNode=${n}
                  .targetNode=${s}
                  .animated=${i.animated||!1}
                  .label=${i.label||""}
                  .type=${i.type||"default"}
                  .markerStart=${i.markerStart}
                  .markerEnd=${i.markerEnd}
                ></flow-edge>
              `})}
            ${this.renderPreviewEdge()}
          </div>
          <div class="flow-nodes-layer">
            ${this.nodes.map(i=>this.renderNode(i))}
          </div>
          <div class="flow-labels-overlay">
            ${this.edges.map(i=>{const n=i.data&&i.data.labelHtml,s=i.data&&i.data.label;if(!(!!n||!!s))return null;const o=this.computeLabelCanvasPosition(i);if(!o)return null;const a=`transform: translate(-50%, -50%) translate(${o.x}px, ${o.y}px);`;return n?J`<div class="edge-label" style="${a}" .innerHTML=${n}></div>`:J`<div class="edge-label" style="${a}">${s}</div>`})}
            ${this.edges.map(i=>{const n=i.data&&i.data.startLabelHtml,s=i.data&&i.data.startLabel;if(!n&&!s)return null;const r=this.computeStartLabelCanvasPosition(i);if(!r)return null;const o=`transform: translate(-50%, -50%) translate(${r.x}px, ${r.y}px);`;return n?J`<div class="edge-label" style="${o}" .innerHTML=${n}></div>`:J`<div class="edge-label" style="${o}">${s}</div>`})}
            ${this.edges.map(i=>{const n=i.data&&i.data.endLabelHtml,s=i.data&&i.data.endLabel;if(!n&&!s)return null;const r=this.computeEndLabelCanvasPosition(i);if(!r)return null;const o=`transform: translate(-50%, -50%) translate(${r.x}px, ${r.y}px);`;return n?J`<div class="edge-label" style="${o}" .innerHTML=${n}></div>`:J`<div class="edge-label" style="${o}">${s}</div>`})}
          </div>
        </div>
        <slot></slot>
      </div>
    `}screenToCanvas(t,i){const n=this.renderRoot.querySelector(".flow-container");if(!n)return{x:t,y:i};const s=n.getBoundingClientRect(),r=this.viewport.x,o=this.viewport.y,a=this.viewport.zoom||1;return{x:(t-s.left-r)/a,y:(i-s.top-o)/a}}renderPreviewEdge(){if(!this.connection||!this.connection.preview)return null;const t=this.connection.preview,i=this.connection.from?this.nodes.find(s=>s.id===this.connection.from.nodeId):null,n=this.connection.to?this.nodes.find(s=>s.id===this.connection.to.nodeId):null;return i?J`
        <flow-edge
          .id=${"preview"}
          .source=${i.id}
          .target=${"__preview__"}
          .sourceHandle=${this.connection.from?.handleId}
          .sourceNode=${{...i,position:i.position}}
          .targetNode=${{id:"__preview__",position:{x:t.x,y:t.y},width:1,height:1,data:{}}}
          .animated=${!0}
          .label=${""}
        ></flow-edge>
      `:n?J`
        <flow-edge
          .id=${"preview"}
          .source=${"__preview__"}
          .target=${n.id}
          .sourceNode=${{id:"__preview__",position:{x:t.x,y:t.y},width:1,height:1,data:{}}}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{...n,position:n.position}}
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
  `;jt([w({type:Array})],exports.FlowCanvas.prototype,"nodes",2);jt([w({type:Array})],exports.FlowCanvas.prototype,"edges",2);jt([w({type:Object})],exports.FlowCanvas.prototype,"viewport",2);jt([w({type:Object})],exports.FlowCanvas.prototype,"nodeTypes",2);exports.FlowCanvas=jt([X("flow-canvas")],exports.FlowCanvas);var fl=Object.defineProperty,pl=Object.getOwnPropertyDescriptor,_t=(e,t,i,n)=>{for(var s=n>1?void 0:n?pl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&fl(t,i,s),s};exports.NodeResizer=class extends O{constructor(){super(...arguments),this.visible=!1,this.minWidth=10,this.minHeight=10,this.maxWidth=Number.MAX_VALUE,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleMouseDown=t=>{const i=t.target;console.log("NodeResizer handleMouseDown:",i,i.classList);let n=i.classList.contains("resize-handle");if(!n&&i===this&&(n=t.composedPath().some(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))),console.log("Is resize handle:",n),!n)return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.isResizing=!0;const s=this.getRootNode().host;this.resizeStart={x:t.clientX,y:t.clientY,width:s?.offsetWidth||0,height:s?.offsetHeight||0};let r=null;if(i.classList.contains("resize-handle")?r=i:i===this&&(r=t.composedPath().find(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))||null),r){const o=Array.from(r.classList);this.resizeHandle=o.find(a=>a!=="resize-handle")||"",console.log("Resize handle direction:",this.resizeHandle)}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),console.log({width:this.resizeStart.width,height:this.resizeStart.height}),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleMouseMove=t=>{if(!this.isResizing)return;const i=this.getRootNode().host;if(!i)return;console.log("NodeResizer handleMouseMove:",t);const n=t.clientX-this.resizeStart.x,s=t.clientY-this.resizeStart.y;let r=this.resizeStart.width,o=this.resizeStart.height;switch(this.resizeHandle){case"nw":r=this.resizeStart.width-n,o=this.resizeStart.height-s;break;case"ne":r=this.resizeStart.width+n,o=this.resizeStart.height-s;break;case"sw":r=this.resizeStart.width-n,o=this.resizeStart.height+s;break;case"se":r=this.resizeStart.width+n,o=this.resizeStart.height+s;break;case"n":o=this.resizeStart.height-s;break;case"s":o=this.resizeStart.height+s;break;case"w":r=this.resizeStart.width-n;break;case"e":r=this.resizeStart.width+n;break}if(r=Math.max(this.minWidth,Math.min(this.maxWidth,r)),o=Math.max(this.minHeight,Math.min(this.maxHeight,o)),this.keepAspectRatio){const a=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?o=r/a:r=o*a}i.style.width=`${r}px`,i.style.height=`${o}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:r,height:o,handle:this.resizeHandle},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{if(!this.isResizing)return;this.isResizing=!1,this.cleanup();const t=this.getRootNode().host;this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:t?.offsetWidth||0,height:t?.offsetHeight||0},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return this.visible?C`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    `:C``}};exports.NodeResizer.styles=B`
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
  `;_t([w({type:Boolean,reflect:!0})],exports.NodeResizer.prototype,"visible",2);_t([w({type:Number})],exports.NodeResizer.prototype,"minWidth",2);_t([w({type:Number})],exports.NodeResizer.prototype,"minHeight",2);_t([w({type:Number})],exports.NodeResizer.prototype,"maxWidth",2);_t([w({type:Number})],exports.NodeResizer.prototype,"maxHeight",2);_t([w({type:Boolean})],exports.NodeResizer.prototype,"keepAspectRatio",2);exports.NodeResizer=_t([X("node-resizer")],exports.NodeResizer);var gl=Object.defineProperty,ml=Object.getOwnPropertyDescriptor,ct=(e,t,i,n)=>{for(var s=n>1?void 0:n?ml(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&gl(t,i,s),s};exports.FlowNode=class extends O{constructor(){super(...arguments),this.id="",this.data={},this.position={x:0,y:0},this.selected=!1,this.dragging=!1,this.draggable=!0,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.lastMeasured=null,this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}})},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}}),this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1},50)}}firstUpdated(){this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd)),this.updateMeasuredSize()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return C`
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
      ${this.resizable?C`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="30"
          max-width="500"
          max-height="300"
        ></node-resizer>
      `:""}
    `}updated(t){super.updated(t),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,this.updateMeasuredSize(),t.has("resizable")&&console.log("FlowNode resizable changed:",this.resizable)}updateMeasuredSize(){if(!this.instance)return;const t=this.getBoundingClientRect(),i=this.instance.getViewport().zoom||1,n=t.width/i,s=t.height/i;(!this.lastMeasured||Math.abs(this.lastMeasured.width-n)>.5||Math.abs(this.lastMeasured.height-s)>.5)&&(this.lastMeasured={width:n,height:s},this.instance.updateNode(this.id,{measured:{width:n,height:s},width:n,height:s}))}onHandleMouseDown(t){return i=>{i.stopPropagation(),i.preventDefault(),this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:t},bubbles:!0,composed:!0}))}}};exports.FlowNode.styles=B`
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
  `;ct([w({type:String,reflect:!0})],exports.FlowNode.prototype,"id",2);ct([w({type:Object})],exports.FlowNode.prototype,"data",2);ct([w({type:Object})],exports.FlowNode.prototype,"position",2);ct([w({type:Boolean,reflect:!0})],exports.FlowNode.prototype,"selected",2);ct([w({type:Boolean,reflect:!0})],exports.FlowNode.prototype,"dragging",2);ct([w({type:Boolean})],exports.FlowNode.prototype,"draggable",2);ct([w({type:Object})],exports.FlowNode.prototype,"instance",2);ct([w({type:Boolean})],exports.FlowNode.prototype,"resizable",2);exports.FlowNode=ct([X("flow-node")],exports.FlowNode);var yl=Object.defineProperty,wl=Object.getOwnPropertyDescriptor,Y=(e,t,i,n)=>{for(var s=n>1?void 0:n?wl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&yl(t,i,s),s};exports.FlowEdge=class extends O{constructor(){super(...arguments),this.id="",this.source="",this.target="",this.animated=!1,this.selected=!1,this.label="",this.type="default",this.markerHandleHalf=5}getMarkerId(t){if(!t)return;if(typeof t=="string")return t;const i=this.normalizeMarkerSpec(t);return`marker-${this.hashString(i)}`}createMarkerSVG(t,i){if(i.type==="custom"){const h=i.width??10,d=i.height??10,f=(i.refX??h)+this.markerHandleHalf,p=i.refY??d/2,m=i.color??"currentColor",b=i.orient??"auto";return`<marker id="${t}" markerWidth="${h}" markerHeight="${d}" refX="${f}" refY="${p}" orient="${b}" markerUnits="userSpaceOnUse"><path d="${i.path}" fill="${m}" stroke="${m}"/></marker>`}const n=i.width??10,s=i.height??10,r=i.orient??"auto",o=i.color??"currentColor",a=(i.type==="ArrowClosed",n+this.markerHandleHalf),l=s/2;if(i.type==="ArrowClosed"){const h=`M0,0 L${n},${l} L0,${s} Z`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${h}" fill="${o}"/></marker>`}const c=`M0,0 L${n},${l} L0,${s}`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${c}" fill="none" stroke="${o}" stroke-width="2"/></marker>`}normalizeMarkerSpec(t){if(t.type==="custom"){const{path:o,width:a=20,height:l=20,refX:c=20,refY:h=10,orient:d="auto",color:f="currentColor"}=t;return`custom|p=${o}|w=${a}|h=${l}|rx=${c}|ry=${h}|o=${d}|c=${f}`}const{width:i=20,height:n=20,orient:s="auto",color:r="currentColor"}=t;return`builtin|${t.type}|w=${i}|h=${n}|o=${s}|c=${r}`}hashString(t){let i=0;for(let n=0;n<t.length;n++)i=(i<<5)-i+t.charCodeAt(n),i|=0;return Math.abs(i).toString(36)}getPathForType(t,i){const n=t.x,s=t.y,r=i.x,o=i.y,a=t.position,l=i.position;switch(this.type){case"straight":return Mn({sourceX:n,sourceY:s,targetX:r,targetY:o});case"smoothstep":return Xe({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l});case"step":return Xe({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,borderRadius:0});case"simplebezier":return ve({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,curvature:.5});case"default":default:return ve({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l})}}getFlowCanvasRoot(){const t=this.getRootNode();return t instanceof ShadowRoot?t:null}getFlowCanvasHost(){const t=this.getFlowCanvasRoot();return t&&t.host||null}findHandleElement(t,i){const n=this.getFlowCanvasRoot();if(!n)return null;const s=n.querySelector(`[id="${CSS.escape(t)}"]`);if(!s)return null;const r=s.shadowRoot;let o=null;return r&&(o=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o||(o=s.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o}getHandlePosition(t,i){const n=this.findHandleElement(t,i);if(!n)return null;const s=this.getFlowCanvasRoot();if(!s)return null;const r=s.querySelector(`[id="${CSS.escape(t)}"]`);if(!r)return null;const o=r.getBoundingClientRect(),a=n.getBoundingClientRect(),l=this.sourceNode?.id===t?this.sourceNode:this.targetNode;if(!l)return null;l.measured?.width||l.width,l.measured?.height||l.height;const d=(this.getFlowCanvasHost()?.viewport||{zoom:1}).zoom||1,f=(a.left+a.width/2-o.left)/d,p=(a.top+a.height/2-o.top)/d;return{x:l.position.x+f,y:l.position.y+p}}getSourcePosition(){if(this.sourceHandle&&this.sourceNode){const n=this.getHandlePosition(this.sourceNode.id,this.sourceHandle);if(n)return{...n,position:exports.Position.Right}}const t=this.sourceNode.measured?.width||this.sourceNode.width||150,i=this.sourceNode.measured?.height||this.sourceNode.height||50;return{x:this.sourceNode.position.x+t,y:this.sourceNode.position.y+i/2,position:exports.Position.Right}}getTargetPosition(){if(this.targetHandle&&this.targetNode){const i=this.getHandlePosition(this.targetNode.id,this.targetHandle);if(i)return{...i,position:exports.Position.Left}}const t=this.targetNode.measured?.height||this.targetNode.height||50;return{x:this.targetNode.position.x,y:this.targetNode.position.y+t/2,position:exports.Position.Left}}render(){if(!this.sourceNode||!this.targetNode)return C``;const t=this.getSourcePosition(),i=this.getTargetPosition(),[n,s,r,o,a]=this.getPathForType(t,i),l=["edge-path",this.animated&&"animated",this.selected&&"selected"].filter(Boolean).join(" "),c=this.getMarkerId(this.markerStart),h=this.getMarkerId(this.markerEnd),d=c?`url(#${c})`:void 0,f=h?`url(#${h})`:void 0,p=this.animated?"5":"";return C`
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
            d="${n}"
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
    `}handleClick(t){console.log("handleClick",t),t.stopPropagation();const i=!this.selected;this.selected=i,this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:this.id,selected:i,edge:{id:this.id,source:this.source,target:this.target,sourceHandle:this.sourceHandle,targetHandle:this.targetHandle,label:this.label,animated:this.animated,selected:i}},bubbles:!0,composed:!0}))}};exports.FlowEdge.styles=B`
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
  `;Y([w({type:String})],exports.FlowEdge.prototype,"id",2);Y([w({type:String})],exports.FlowEdge.prototype,"source",2);Y([w({type:String})],exports.FlowEdge.prototype,"target",2);Y([w({type:String})],exports.FlowEdge.prototype,"sourceHandle",2);Y([w({type:String})],exports.FlowEdge.prototype,"targetHandle",2);Y([w({type:Object})],exports.FlowEdge.prototype,"sourceNode",2);Y([w({type:Object})],exports.FlowEdge.prototype,"targetNode",2);Y([w({type:Boolean})],exports.FlowEdge.prototype,"animated",2);Y([w({type:Boolean})],exports.FlowEdge.prototype,"selected",2);Y([w({type:String})],exports.FlowEdge.prototype,"label",2);Y([w({type:String})],exports.FlowEdge.prototype,"type",2);Y([w({type:Object})],exports.FlowEdge.prototype,"markerStart",2);Y([w({type:Object})],exports.FlowEdge.prototype,"markerEnd",2);exports.FlowEdge=Y([X("flow-edge")],exports.FlowEdge);var vl=Object.defineProperty,xl=Object.getOwnPropertyDescriptor,Kt=(e,t,i,n)=>{for(var s=n>1?void 0:n?xl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&vl(t,i,s),s};exports.FlowBackground=class extends O{constructor(){super(...arguments),this.variant="dots",this.gap=20,this.color="#ddd",this.size=1}render(){const t=`flow-bg-pattern-${Math.random().toString(36).substr(2,9)}`;return C`
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
  `;Kt([w({type:String})],exports.FlowBackground.prototype,"variant",2);Kt([w({type:Number})],exports.FlowBackground.prototype,"gap",2);Kt([w({type:String})],exports.FlowBackground.prototype,"color",2);Kt([w({type:Number})],exports.FlowBackground.prototype,"size",2);exports.FlowBackground=Kt([X("flow-background")],exports.FlowBackground);var bl=Object.defineProperty,$l=Object.getOwnPropertyDescriptor,si=(e,t,i,n)=>{for(var s=n>1?void 0:n?$l(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&bl(t,i,s),s};exports.FlowMinimap=class extends O{constructor(){super(...arguments),this.width=200,this.height=150}render(){return C`
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
  `;si([w({type:Number})],exports.FlowMinimap.prototype,"width",2);si([w({type:Number})],exports.FlowMinimap.prototype,"height",2);exports.FlowMinimap=si([X("flow-minimap")],exports.FlowMinimap);var _l=Object.defineProperty,zl=Object.getOwnPropertyDescriptor,An=(e,t,i,n)=>{for(var s=n>1?void 0:n?zl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&_l(t,i,s),s};exports.FlowControls=class extends O{constructor(){super(...arguments),this.handleZoomIn=()=>{this.instance?.zoomIn()},this.handleZoomOut=()=>{this.instance?.zoomOut()},this.handleFitView=()=>{this.instance?.fitView()}}render(){return C`
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
  `;An([w({type:Object})],exports.FlowControls.prototype,"instance",2);exports.FlowControls=An([X("flow-controls")],exports.FlowControls);var Sl=Object.getOwnPropertyDescriptor,El=Object.getPrototypeOf,kl=Reflect.get,Nl=(e,t,i,n)=>{for(var s=n>1?void 0:n?Sl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s},Pe=(e,t,i)=>kl(El(e),i,t);exports.ERDTableNode=class extends exports.FlowNode{constructor(){super(...arguments),this.appliedInitialSize=!1}firstUpdated(){const t=this.data,i=t?.size?.width,n=t?.size?.height;(typeof i=="number"&&i>0||typeof n=="number"&&n>0)&&(typeof i=="number"&&i>0&&(this.style.width=`${i}px`),typeof n=="number"&&n>0&&(this.style.height=`${n}px`),this.instance&&this.instance.updateNode(this.id,{width:typeof i=="number"&&i>0?i:this.width,height:typeof n=="number"&&n>0?n:this.height}),this.appliedInitialSize=!0),super.firstUpdated()}updated(t){super.updated(t)}onFieldHandleMouseDown(t,i){return n=>{n.stopPropagation(),n.preventDefault();const s=`${this.id}-${t}-${i}`;this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:i==="left"?"target":"source",handleId:s,fieldName:t},bubbles:!0,composed:!0}))}}render(){const t=this.data,i=t?.tableName||"Table",n=t?.fields||[];return C`
      <div class="table-header" style="${t.color?`background: ${t.color}`:""}">
        <span class="table-icon">📊</span>
        <span>${i}</span>
      </div>
      
      <div class="table-body">
        ${n.map(s=>C`
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
      ${this.resizable?C`
        <node-resizer
          .visible=${this.selected}
          min-width="150"
          min-height="80"
          max-width="500"
          max-height="400"
        ></node-resizer>
      `:""}
    `}};exports.ERDTableNode.styles=[...Array.isArray(Pe(exports.ERDTableNode,exports.ERDTableNode,"styles"))?Pe(exports.ERDTableNode,exports.ERDTableNode,"styles"):[Pe(exports.ERDTableNode,exports.ERDTableNode,"styles")],B`
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
    `];exports.ERDTableNode=Nl([X("erd-table-node")],exports.ERDTableNode);const Cl=[{type:"circle",name:"Circle",category:"basic",path:"M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"rectangle",name:"Rectangle",category:"basic",path:"M 5 5 L 195 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"diamond",name:"Diamond",category:"basic",path:"M 100 5 L 195 100 L 100 195 L 5 100 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"triangle",name:"Triangle",category:"basic",path:"M 100 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Ml=[{type:"hexagon",name:"Hexagon",category:"geometric",path:"M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"octagon",name:"Octagon",category:"geometric",path:"M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Al=[{type:"heart",name:"Heart",category:"symbolic",path:"M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],ri=class ri{static initialize(){[...Cl,...Ml,...Al].forEach(i=>{this.shapes.set(i.type,i)})}static register(t){this.shapes.set(t.type,t)}static get(t){return this.shapes.get(t)}static getAll(){return Array.from(this.shapes.values())}static getByCategory(t){return Array.from(this.shapes.values()).filter(i=>i.category===t)}static has(t){return this.shapes.has(t)}static getShapeTypes(){return Array.from(this.shapes.keys())}static clear(){this.shapes.clear()}static getCount(){return this.shapes.size}};ri.shapes=new Map;let Zt=ri;Zt.initialize();var Hl=Object.defineProperty,Pl=Object.getOwnPropertyDescriptor,ot=(e,t,i,n)=>{for(var s=n>1?void 0:n?Pl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Hl(t,i,s),s};exports.ShapeNode=class extends O{constructor(){super(...arguments),this.id="",this.selected=!1,this.dragging=!1,this.draggable=!0,this.connectable=!0,this.instance=null,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{console.log("handleMouseUp"),this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isDragging=!1,this.cleanup()},this.handleHandleStart=t=>{console.log("handleHandleStart",t),t.stopPropagation(),this.isDragging=!1;const i=t.target,n=i.dataset.handleId,s=i.dataset.handleType;s&&n&&this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,handleId:n,handleType:s,position:this.position},bubbles:!0,composed:!0}))}}updated(t){super.updated(t),t.has("position")&&this.isDragging,t.has("resizable")&&console.log("ShapeNode resizable changed:",this.resizable)}getShapeDefinition(){if(this.data?.type)return Zt.get(this.data.type)}renderShape(){const t=this.getShapeDefinition();if(!t)return C`
        <div class="unknown-shape">
          Unknown shape: ${this.data?.type||"undefined"}
        </div>
      `;const i=this.data,n=i.size||t.defaultSize,s=i.backgroundColor||i.color||"#ffffff",r=i.strokeColor||"#000000",o=i.strokeWidth||2,a=i.rotation||0;return C`
      <svg 
        class="shape-svg"
        width="${n.width}" 
        height="${n.height}" 
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
    `}renderGradients(){const t=this.data;if(t&&"gradient"in t&&t.gradient){const i=`gradient-${this.data.type}-${Math.random().toString(36).substr(2,9)}`,n=t.gradient;if(n.type==="linear")return C`
          <defs>
            <linearGradient id="${i}" x1="0%" y1="0%" x2="100%" y2="100%">
              ${n.colors.map((s,r)=>C`<stop offset="${r/(n.colors.length-1)*100}%" stop-color="${s}"/>`)}
            </linearGradient>
          </defs>
        `;if(n.type==="radial")return C`
          <defs>
            <radialGradient id="${i}" cx="50%" cy="50%" r="50%">
              ${n.colors.map((s,r)=>C`<stop offset="${r/(n.colors.length-1)*100}%" stop-color="${s}"/>`)}
            </radialGradient>
          </defs>
        `}return C``}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleClick),this.addEventListener("mousedown",this.handleMouseDown),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleClick),this.removeEventListener("mousedown",this.handleMouseDown),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){this.style.setProperty("--position-x",`${this.position.x}px`),this.style.setProperty("--position-y",`${this.position.y}px`);const t=this.getShapeDefinition(),n=this.data?.size||t?.defaultSize||{width:200,height:200};return this.style.setProperty("--shape-width",`${n.width}px`),this.style.setProperty("--shape-height",`${n.height}px`),C`
      <div class="shape-node ${this.selected?"selected":""}">
        ${this.renderGradients()}
        ${this.renderShape()}
        <div class="shape-content">
          <slot></slot>
        </div>
        ${this.connectable?this.renderHandles():""}
        ${this.renderLabel()}
      </div>
      ${this.resizable?C`
        <node-resizer
          .visible=${this.selected}
          min-width="50"
          min-height="50"
          max-width="500"
          max-height="500"
        ></node-resizer>
      `:""}
    `}renderHandles(){const t=this.id;return C`
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
    `}renderLabel(){const t=this.data;if(!t)return"";const i=t.label||t.type;return C`
      <div class="shape-label">
        ${i}
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
  `;ot([w({type:String,reflect:!0})],exports.ShapeNode.prototype,"id",2);ot([w({type:Object})],exports.ShapeNode.prototype,"data",2);ot([w({type:Object,hasChanged:(e,t)=>!t||e.x!==t.x||e.y!==t.y})],exports.ShapeNode.prototype,"position",2);ot([w({type:Boolean,reflect:!0})],exports.ShapeNode.prototype,"selected",2);ot([w({type:Boolean,reflect:!0})],exports.ShapeNode.prototype,"dragging",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"draggable",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"connectable",2);ot([w({type:Object})],exports.ShapeNode.prototype,"instance",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"resizable",2);exports.ShapeNode=ot([X("shape-node")],exports.ShapeNode);var Rl=Object.getOwnPropertyDescriptor,Qt=(e,t,i,n)=>{for(var s=n>1?void 0:n?Rl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s};exports.BaseNode=class extends O{render(){return C`<slot></slot>`}};exports.BaseNode.styles=B`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;exports.BaseNode=Qt([X("base-node")],exports.BaseNode);exports.BaseNodeHeader=class extends O{render(){return C`<slot></slot>`}};exports.BaseNodeHeader.styles=B`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `;exports.BaseNodeHeader=Qt([X("base-node-header")],exports.BaseNodeHeader);exports.BaseNodeHeaderTitle=class extends O{render(){return C`<span class="title"><slot></slot></span>`}};exports.BaseNodeHeaderTitle.styles=B`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;exports.BaseNodeHeaderTitle=Qt([X("base-node-header-title")],exports.BaseNodeHeaderTitle);exports.BaseNodeContent=class extends O{render(){return C`<slot></slot>`}};exports.BaseNodeContent.styles=B`
    :host {
      display: block;
      padding: 12px;
    }
  `;exports.BaseNodeContent=Qt([X("base-node-content")],exports.BaseNodeContent);exports.BaseNodeFooter=class extends O{render(){return C`<slot></slot>`}};exports.BaseNodeFooter.styles=B`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;exports.BaseNodeFooter=Qt([X("base-node-footer")],exports.BaseNodeFooter);var Tl=Object.defineProperty,I=(e,t,i,n)=>{for(var s=void 0,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(t,i,s)||s);return s&&Tl(t,i,s),s};const Ll=e=>{class t extends e{constructor(){super(...arguments),this.id="",this.position={x:0,y:0},this.data={},this.selected=!1,this.dragging=!1,this.instance=null,this.resizable=!1,this.draggable=!0,this.connectable=!0,this.minWidth=10,this.maxWidth=Number.MAX_VALUE,this.minHeight=10,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleClick=n=>{if(n.stopPropagation(),!this.isDragging){const s=!this.selected;this.selected=s,this.instance&&this.instance.updateNode(this.id,{selected:s}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:s,node:{id:this.id,data:this.data,position:this.position,selected:s}},bubbles:!0,composed:!0}))}},this.handleMouseDown=n=>{if(n.button!==0)return;const s=n.target;if(s.classList.contains("resize-handle")||s.closest(".resize-handle")!==null){this.handleResizeStart(n);return}this.draggable&&(n.preventDefault(),n.stopPropagation(),this.isDragging=!1,this.dragStart={x:n.clientX,y:n.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=n=>{if(this.isResizing){this.handleResizeMove(n);return}const s=n.clientX-this.dragStart.x,r=n.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(s)>3||Math.abs(r)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const o=this.instance.getViewport(),a={x:this.nodeStart.x+s/o.zoom,y:this.nodeStart.y+r/o.zoom};this.instance.updateNode(this.id,{position:a})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isResizing&&this.handleResizeEnd(),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1,this.isResizing=!1},50)},this.handleResizeStart=(n,s)=>{n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),this.isResizing=!0;const r=this.getBoundingClientRect(),o=getComputedStyle(this);let a=parseFloat(o.width),l=parseFloat(o.height);if((!a||a===0)&&(a=r.width),(!l||l===0)&&(l=r.height),this.resizeStart={x:n.clientX,y:n.clientY,width:a,height:l},s)this.resizeHandle=s;else{let c=n.target;if(!c.classList.contains("resize-handle")){const d=c.closest(".resize-handle");d&&(c=d)}const h=Array.from(c.classList);this.resizeHandle=h.find(d=>d!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleResizeMove=n=>{if(!this.isResizing)return;const s=n.clientX-this.resizeStart.x,r=n.clientY-this.resizeStart.y;let o=this.resizeStart.width,a=this.resizeStart.height;switch(this.resizeHandle){case"nw":o=this.resizeStart.width-s,a=this.resizeStart.height-r;break;case"ne":o=this.resizeStart.width+s,a=this.resizeStart.height-r;break;case"sw":o=this.resizeStart.width-s,a=this.resizeStart.height+r;break;case"se":o=this.resizeStart.width+s,a=this.resizeStart.height+r;break;case"n":a=this.resizeStart.height-r;break;case"s":a=this.resizeStart.height+r;break;case"w":o=this.resizeStart.width-s;break;case"e":o=this.resizeStart.width+s;break}if(o=Math.max(this.minWidth,Math.min(this.maxWidth,o)),a=Math.max(this.minHeight,Math.min(this.maxHeight,a)),this.keepAspectRatio){const l=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?a=o/l:o=a*l}this.style.width=`${o}px`,this.style.height=`${a}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:o,height:a,handle:this.resizeHandle},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:o,height:a,measured:{width:o,height:a}})},this.handleResizeEnd=()=>{this.isResizing&&(this.isResizing=!1,this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:this.offsetWidth,height:this.offsetHeight,measured:{width:this.offsetWidth,height:this.offsetHeight}}))},this.handleGlobalClick=n=>{n.target.closest(this.tagName.toLowerCase())!==null||this.selected&&(this.selected=!1,this.instance&&this.instance.updateNode(this.id,{selected:!1}),this.dispatchEvent(new CustomEvent("node-deselect",{detail:{nodeId:this.id,selected:!1,node:{id:this.id,data:this.data,position:this.position,selected:!1}},bubbles:!0,composed:!0})))},this.handleResizeHandleClick=n=>s=>{s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.handleResizeStart(s,n)}}static get styles(){return[B`
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
      `]}connectedCallback(){super.connectedCallback(),this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),document.addEventListener("click",this.handleGlobalClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),document.removeEventListener("click",this.handleGlobalClick),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}renderResizer(){return!this.resizable||!this.selected?C``:C`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick("nw")}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick("ne")}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick("sw")}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick("se")}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick("n")}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick("s")}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick("w")}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick("e")}></div>
      `}getResizer(){return this.renderResizer()}firstUpdated(){this.appendResizerToDOM()}updated(n){super.updated(n),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,(n.has("resizable")||n.has("selected"))&&this.appendResizerToDOM()}appendResizerToDOM(){if(this.removeExistingResizer(),this.resizable&&this.selected){const n=this.renderResizer();if(n){const s=document.createElement("div");s.className="mixin-resizer-container",s.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10;
          `,this.shadowRoot?.appendChild(s),kn(n,s)}}}removeExistingResizer(){const n=this.shadowRoot?.querySelector(".mixin-resizer-container");n&&n.remove()}async notifyHandlesUpdated(n){const{handleIds:s,updateDimensions:r=!0}=n||{};if(await this.updateComplete,await new Promise(o=>setTimeout(o,0)),this.instance&&this.id){if(r){const o=this.getBoundingClientRect(),a=o.width,l=o.height;this.instance.updateNode(this.id,{width:a,height:l,measured:{width:a,height:l}})}this.dispatchEvent(new CustomEvent("node-handles-updated",{detail:{nodeId:this.id,handleIds:s||[],timestamp:Date.now()},bubbles:!0,composed:!0}))}}}return I([w({type:String,reflect:!0})],t.prototype,"id"),I([w({type:Object})],t.prototype,"position"),I([w({type:Object})],t.prototype,"data"),I([w({type:Boolean,reflect:!0})],t.prototype,"selected"),I([w({type:Boolean,reflect:!0})],t.prototype,"dragging"),I([w({type:Object})],t.prototype,"instance"),I([w({type:Boolean})],t.prototype,"resizable"),I([w({type:Boolean})],t.prototype,"draggable"),I([w({type:Boolean})],t.prototype,"connectable"),I([w({type:Number})],t.prototype,"minWidth"),I([w({type:Number})],t.prototype,"maxWidth"),I([w({type:Number})],t.prototype,"minHeight"),I([w({type:Number})],t.prototype,"maxHeight"),I([w({type:Boolean})],t.prototype,"keepAspectRatio"),t};exports.FlowInstance=xn;exports.NodeMixin=Ll;exports.ShapeRegistry=Zt;exports.createStore=Aa;exports.getBezierPath=ve;exports.getCenter=hl;exports.getDistance=ll;exports.getSmoothStepPath=Xe;exports.getStraightPath=Mn;exports.isPointInRect=cl;
//# sourceMappingURL=lit-flow.bundle.cjs.map
