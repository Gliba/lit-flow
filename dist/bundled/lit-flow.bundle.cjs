"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var Dn={value:()=>{}};function We(){for(var e=0,t=arguments.length,i={},n;e<t;++e){if(!(n=arguments[e]+"")||n in i||/[\s.]/.test(n))throw new Error("illegal type: "+n);i[n]=[]}return new re(i)}function re(e){this._=e}function On(e,t){return e.trim().split(/^|\s+/).map(function(i){var n="",s=i.indexOf(".");if(s>=0&&(n=i.slice(s+1),i=i.slice(0,s)),i&&!t.hasOwnProperty(i))throw new Error("unknown type: "+i);return{type:i,name:n}})}re.prototype=We.prototype={constructor:re,on:function(e,t){var i=this._,n=On(e+"",i),s,r=-1,o=n.length;if(arguments.length<2){for(;++r<o;)if((s=(e=n[r]).type)&&(s=Bn(i[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<o;)if(s=(e=n[r]).type)i[s]=ai(i[s],e.name,t);else if(t==null)for(s in i)i[s]=ai(i[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var i in t)e[i]=t[i].slice();return new re(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var i=new Array(s),n=0,s,r;n<s;++n)i[n]=arguments[n+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(r=this._[e],n=0,s=r.length;n<s;++n)r[n].value.apply(t,i)},apply:function(e,t,i){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var n=this._[e],s=0,r=n.length;s<r;++s)n[s].value.apply(t,i)}};function Bn(e,t){for(var i=0,n=e.length,s;i<n;++i)if((s=e[i]).name===t)return s.value}function ai(e,t,i){for(var n=0,s=e.length;n<s;++n)if(e[n].name===t){e[n]=Dn,e=e.slice(0,n).concat(e.slice(n+1));break}return i!=null&&e.push({name:t,value:i}),e}var Le="http://www.w3.org/1999/xhtml";const li={svg:"http://www.w3.org/2000/svg",xhtml:Le,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function xe(e){var t=e+="",i=t.indexOf(":");return i>=0&&(t=e.slice(0,i))!=="xmlns"&&(e=e.slice(i+1)),li.hasOwnProperty(t)?{space:li[t],local:e}:e}function In(e){return function(){var t=this.ownerDocument,i=this.namespaceURI;return i===Le&&t.documentElement.namespaceURI===Le?t.createElement(e):t.createElementNS(i,e)}}function Fn(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Yi(e){var t=xe(e);return(t.local?Fn:In)(t)}function Un(){}function Ze(e){return e==null?Un:function(){return this.querySelector(e)}}function Xn(e){typeof e!="function"&&(e=Ze(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=new Array(o),l,h,d=0;d<o;++d)(l=r[d])&&(h=e.call(l,l.__data__,d,r))&&("__data__"in l&&(h.__data__=l.__data__),a[d]=h);return new j(n,this._parents)}function Yn(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Wn(){return[]}function Wi(e){return e==null?Wn:function(){return this.querySelectorAll(e)}}function Zn(e){return function(){return Yn(e.apply(this,arguments))}}function qn(e){typeof e=="function"?e=Zn(e):e=Wi(e);for(var t=this._groups,i=t.length,n=[],s=[],r=0;r<i;++r)for(var o=t[r],a=o.length,l,h=0;h<a;++h)(l=o[h])&&(n.push(e.call(l,l.__data__,h,o)),s.push(l));return new j(n,s)}function Zi(e){return function(){return this.matches(e)}}function qi(e){return function(t){return t.matches(e)}}var Vn=Array.prototype.find;function jn(e){return function(){return Vn.call(this.children,e)}}function Gn(){return this.firstElementChild}function Kn(e){return this.select(e==null?Gn:jn(typeof e=="function"?e:qi(e)))}var Qn=Array.prototype.filter;function Jn(){return Array.from(this.children)}function ts(e){return function(){return Qn.call(this.children,e)}}function es(e){return this.selectAll(e==null?Jn:ts(typeof e=="function"?e:qi(e)))}function is(e){typeof e!="function"&&(e=Zi(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],l,h=0;h<o;++h)(l=r[h])&&e.call(l,l.__data__,h,r)&&a.push(l);return new j(n,this._parents)}function Vi(e){return new Array(e.length)}function ns(){return new j(this._enter||this._groups.map(Vi),this._parents)}function ce(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}ce.prototype={constructor:ce,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function ss(e){return function(){return e}}function rs(e,t,i,n,s,r){for(var o=0,a,l=t.length,h=r.length;o<h;++o)(a=t[o])?(a.__data__=r[o],n[o]=a):i[o]=new ce(e,r[o]);for(;o<l;++o)(a=t[o])&&(s[o]=a)}function os(e,t,i,n,s,r,o){var a,l,h=new Map,d=t.length,c=r.length,u=new Array(d),p;for(a=0;a<d;++a)(l=t[a])&&(u[a]=p=o.call(l,l.__data__,a,t)+"",h.has(p)?s[a]=l:h.set(p,l));for(a=0;a<c;++a)p=o.call(e,r[a],a,r)+"",(l=h.get(p))?(n[a]=l,l.__data__=r[a],h.delete(p)):i[a]=new ce(e,r[a]);for(a=0;a<d;++a)(l=t[a])&&h.get(u[a])===l&&(s[a]=l)}function as(e){return e.__data__}function ls(e,t){if(!arguments.length)return Array.from(this,as);var i=t?os:rs,n=this._parents,s=this._groups;typeof e!="function"&&(e=ss(e));for(var r=s.length,o=new Array(r),a=new Array(r),l=new Array(r),h=0;h<r;++h){var d=n[h],c=s[h],u=c.length,p=hs(e.call(d,d&&d.__data__,h,n)),m=p.length,x=a[h]=new Array(m),S=o[h]=new Array(m),v=l[h]=new Array(u);i(d,c,x,S,v,p,t);for(var k=0,H=0,L,F;k<m;++k)if(L=x[k]){for(k>=H&&(H=k+1);!(F=S[H])&&++H<m;);L._next=F||null}}return o=new j(o,n),o._enter=a,o._exit=l,o}function hs(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function ds(){return new j(this._exit||this._groups.map(Vi),this._parents)}function cs(e,t,i){var n=this.enter(),s=this,r=this.exit();return typeof e=="function"?(n=e(n),n&&(n=n.selection())):n=n.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),i==null?r.remove():i(r),n&&s?n.merge(s).order():s}function us(e){for(var t=e.selection?e.selection():e,i=this._groups,n=t._groups,s=i.length,r=n.length,o=Math.min(s,r),a=new Array(s),l=0;l<o;++l)for(var h=i[l],d=n[l],c=h.length,u=a[l]=new Array(c),p,m=0;m<c;++m)(p=h[m]||d[m])&&(u[m]=p);for(;l<s;++l)a[l]=i[l];return new j(a,this._parents)}function fs(){for(var e=this._groups,t=-1,i=e.length;++t<i;)for(var n=e[t],s=n.length-1,r=n[s],o;--s>=0;)(o=n[s])&&(r&&o.compareDocumentPosition(r)^4&&r.parentNode.insertBefore(o,r),r=o);return this}function ps(e){e||(e=gs);function t(c,u){return c&&u?e(c.__data__,u.__data__):!c-!u}for(var i=this._groups,n=i.length,s=new Array(n),r=0;r<n;++r){for(var o=i[r],a=o.length,l=s[r]=new Array(a),h,d=0;d<a;++d)(h=o[d])&&(l[d]=h);l.sort(t)}return new j(s,this._parents).order()}function gs(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function ms(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function ys(){return Array.from(this)}function ws(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length;s<r;++s){var o=n[s];if(o)return o}return null}function vs(){let e=0;for(const t of this)++e;return e}function bs(){return!this.node()}function xs(e){for(var t=this._groups,i=0,n=t.length;i<n;++i)for(var s=t[i],r=0,o=s.length,a;r<o;++r)(a=s[r])&&e.call(a,a.__data__,r,s);return this}function $s(e){return function(){this.removeAttribute(e)}}function _s(e){return function(){this.removeAttributeNS(e.space,e.local)}}function zs(e,t){return function(){this.setAttribute(e,t)}}function Es(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Ss(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttribute(e):this.setAttribute(e,i)}}function ks(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,i)}}function Ns(e,t){var i=xe(e);if(arguments.length<2){var n=this.node();return i.local?n.getAttributeNS(i.space,i.local):n.getAttribute(i)}return this.each((t==null?i.local?_s:$s:typeof t=="function"?i.local?ks:Ss:i.local?Es:zs)(i,t))}function ji(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Cs(e){return function(){this.style.removeProperty(e)}}function Ms(e,t,i){return function(){this.style.setProperty(e,t,i)}}function Hs(e,t,i){return function(){var n=t.apply(this,arguments);n==null?this.style.removeProperty(e):this.style.setProperty(e,n,i)}}function As(e,t,i){return arguments.length>1?this.each((t==null?Cs:typeof t=="function"?Hs:Ms)(e,t,i??"")):Nt(this.node(),e)}function Nt(e,t){return e.style.getPropertyValue(t)||ji(e).getComputedStyle(e,null).getPropertyValue(t)}function Ps(e){return function(){delete this[e]}}function Rs(e,t){return function(){this[e]=t}}function Ls(e,t){return function(){var i=t.apply(this,arguments);i==null?delete this[e]:this[e]=i}}function Ts(e,t){return arguments.length>1?this.each((t==null?Ps:typeof t=="function"?Ls:Rs)(e,t)):this.node()[e]}function Gi(e){return e.trim().split(/^|\s+/)}function qe(e){return e.classList||new Ki(e)}function Ki(e){this._node=e,this._names=Gi(e.getAttribute("class")||"")}Ki.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Qi(e,t){for(var i=qe(e),n=-1,s=t.length;++n<s;)i.add(t[n])}function Ji(e,t){for(var i=qe(e),n=-1,s=t.length;++n<s;)i.remove(t[n])}function Ds(e){return function(){Qi(this,e)}}function Os(e){return function(){Ji(this,e)}}function Bs(e,t){return function(){(t.apply(this,arguments)?Qi:Ji)(this,e)}}function Is(e,t){var i=Gi(e+"");if(arguments.length<2){for(var n=qe(this.node()),s=-1,r=i.length;++s<r;)if(!n.contains(i[s]))return!1;return!0}return this.each((typeof t=="function"?Bs:t?Ds:Os)(i,t))}function Fs(){this.textContent=""}function Us(e){return function(){this.textContent=e}}function Xs(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Ys(e){return arguments.length?this.each(e==null?Fs:(typeof e=="function"?Xs:Us)(e)):this.node().textContent}function Ws(){this.innerHTML=""}function Zs(e){return function(){this.innerHTML=e}}function qs(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Vs(e){return arguments.length?this.each(e==null?Ws:(typeof e=="function"?qs:Zs)(e)):this.node().innerHTML}function js(){this.nextSibling&&this.parentNode.appendChild(this)}function Gs(){return this.each(js)}function Ks(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Qs(){return this.each(Ks)}function Js(e){var t=typeof e=="function"?e:Yi(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function tr(){return null}function er(e,t){var i=typeof e=="function"?e:Yi(e),n=t==null?tr:typeof t=="function"?t:Ze(t);return this.select(function(){return this.insertBefore(i.apply(this,arguments),n.apply(this,arguments)||null)})}function ir(){var e=this.parentNode;e&&e.removeChild(this)}function nr(){return this.each(ir)}function sr(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function rr(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function or(e){return this.select(e?rr:sr)}function ar(e){return arguments.length?this.property("__data__",e):this.node().__data__}function lr(e){return function(t){e.call(this,t,this.__data__)}}function hr(e){return e.trim().split(/^|\s+/).map(function(t){var i="",n=t.indexOf(".");return n>=0&&(i=t.slice(n+1),t=t.slice(0,n)),{type:t,name:i}})}function dr(e){return function(){var t=this.__on;if(t){for(var i=0,n=-1,s=t.length,r;i<s;++i)r=t[i],(!e.type||r.type===e.type)&&r.name===e.name?this.removeEventListener(r.type,r.listener,r.options):t[++n]=r;++n?t.length=n:delete this.__on}}}function cr(e,t,i){return function(){var n=this.__on,s,r=lr(t);if(n){for(var o=0,a=n.length;o<a;++o)if((s=n[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=r,s.options=i),s.value=t;return}}this.addEventListener(e.type,r,i),s={type:e.type,name:e.name,value:t,listener:r,options:i},n?n.push(s):this.__on=[s]}}function ur(e,t,i){var n=hr(e+""),s,r=n.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,h=a.length,d;l<h;++l)for(s=0,d=a[l];s<r;++s)if((o=n[s]).type===d.type&&o.name===d.name)return d.value}return}for(a=t?cr:dr,s=0;s<r;++s)this.each(a(n[s],t,i));return this}function tn(e,t,i){var n=ji(e),s=n.CustomEvent;typeof s=="function"?s=new s(t,i):(s=n.document.createEvent("Event"),i?(s.initEvent(t,i.bubbles,i.cancelable),s.detail=i.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function fr(e,t){return function(){return tn(this,e,t)}}function pr(e,t){return function(){return tn(this,e,t.apply(this,arguments))}}function gr(e,t){return this.each((typeof t=="function"?pr:fr)(e,t))}function*mr(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length,o;s<r;++s)(o=n[s])&&(yield o)}var en=[null];function j(e,t){this._groups=e,this._parents=t}function Vt(){return new j([[document.documentElement]],en)}function yr(){return this}j.prototype=Vt.prototype={constructor:j,select:Xn,selectAll:qn,selectChild:Kn,selectChildren:es,filter:is,data:ls,enter:ns,exit:ds,join:cs,merge:us,selection:yr,order:fs,sort:ps,call:ms,nodes:ys,node:ws,size:vs,empty:bs,each:xs,attr:Ns,style:As,property:Ts,classed:Is,text:Ys,html:Vs,raise:Gs,lower:Qs,append:Js,insert:er,remove:nr,clone:or,datum:ar,on:ur,dispatch:gr,[Symbol.iterator]:mr};function ft(e){return typeof e=="string"?new j([[document.querySelector(e)]],[document.documentElement]):new j([[e]],en)}function wr(e){let t;for(;t=e.sourceEvent;)e=t;return e}function ut(e,t){if(e=wr(e),t===void 0&&(t=e.currentTarget),t){var i=t.ownerSVGElement||t;if(i.createSVGPoint){var n=i.createSVGPoint();return n.x=e.clientX,n.y=e.clientY,n=n.matrixTransform(t.getScreenCTM().inverse()),[n.x,n.y]}if(t.getBoundingClientRect){var s=t.getBoundingClientRect();return[e.clientX-s.left-t.clientLeft,e.clientY-s.top-t.clientTop]}}return[e.pageX,e.pageY]}const Te={capture:!0,passive:!1};function De(e){e.preventDefault(),e.stopImmediatePropagation()}function vr(e){var t=e.document.documentElement,i=ft(e).on("dragstart.drag",De,Te);"onselectstart"in t?i.on("selectstart.drag",De,Te):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function br(e,t){var i=e.document.documentElement,n=ft(e).on("dragstart.drag",null);t&&(n.on("click.drag",De,Te),setTimeout(function(){n.on("click.drag",null)},0)),"onselectstart"in i?n.on("selectstart.drag",null):(i.style.MozUserSelect=i.__noselect,delete i.__noselect)}function Ve(e,t,i){e.prototype=t.prototype=i,i.constructor=e}function nn(e,t){var i=Object.create(e.prototype);for(var n in t)i[n]=t[n];return i}function jt(){}var Ft=.7,ue=1/Ft,kt="\\s*([+-]?\\d+)\\s*",Ut="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",st="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",xr=/^#([0-9a-f]{3,8})$/,$r=new RegExp(`^rgb\\(${kt},${kt},${kt}\\)$`),_r=new RegExp(`^rgb\\(${st},${st},${st}\\)$`),zr=new RegExp(`^rgba\\(${kt},${kt},${kt},${Ut}\\)$`),Er=new RegExp(`^rgba\\(${st},${st},${st},${Ut}\\)$`),Sr=new RegExp(`^hsl\\(${Ut},${st},${st}\\)$`),kr=new RegExp(`^hsla\\(${Ut},${st},${st},${Ut}\\)$`),hi={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Ve(jt,vt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:di,formatHex:di,formatHex8:Nr,formatHsl:Cr,formatRgb:ci,toString:ci});function di(){return this.rgb().formatHex()}function Nr(){return this.rgb().formatHex8()}function Cr(){return sn(this).formatHsl()}function ci(){return this.rgb().formatRgb()}function vt(e){var t,i;return e=(e+"").trim().toLowerCase(),(t=xr.exec(e))?(i=t[1].length,t=parseInt(t[1],16),i===6?ui(t):i===3?new X(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):i===8?Jt(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):i===4?Jt(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=$r.exec(e))?new X(t[1],t[2],t[3],1):(t=_r.exec(e))?new X(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=zr.exec(e))?Jt(t[1],t[2],t[3],t[4]):(t=Er.exec(e))?Jt(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Sr.exec(e))?gi(t[1],t[2]/100,t[3]/100,1):(t=kr.exec(e))?gi(t[1],t[2]/100,t[3]/100,t[4]):hi.hasOwnProperty(e)?ui(hi[e]):e==="transparent"?new X(NaN,NaN,NaN,0):null}function ui(e){return new X(e>>16&255,e>>8&255,e&255,1)}function Jt(e,t,i,n){return n<=0&&(e=t=i=NaN),new X(e,t,i,n)}function Mr(e){return e instanceof jt||(e=vt(e)),e?(e=e.rgb(),new X(e.r,e.g,e.b,e.opacity)):new X}function Oe(e,t,i,n){return arguments.length===1?Mr(e):new X(e,t,i,n??1)}function X(e,t,i,n){this.r=+e,this.g=+t,this.b=+i,this.opacity=+n}Ve(X,Oe,nn(jt,{brighter(e){return e=e==null?ue:Math.pow(ue,e),new X(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Ft:Math.pow(Ft,e),new X(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new X(wt(this.r),wt(this.g),wt(this.b),fe(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:fi,formatHex:fi,formatHex8:Hr,formatRgb:pi,toString:pi}));function fi(){return`#${mt(this.r)}${mt(this.g)}${mt(this.b)}`}function Hr(){return`#${mt(this.r)}${mt(this.g)}${mt(this.b)}${mt((isNaN(this.opacity)?1:this.opacity)*255)}`}function pi(){const e=fe(this.opacity);return`${e===1?"rgb(":"rgba("}${wt(this.r)}, ${wt(this.g)}, ${wt(this.b)}${e===1?")":`, ${e})`}`}function fe(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function wt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function mt(e){return e=wt(e),(e<16?"0":"")+e.toString(16)}function gi(e,t,i,n){return n<=0?e=t=i=NaN:i<=0||i>=1?e=t=NaN:t<=0&&(e=NaN),new tt(e,t,i,n)}function sn(e){if(e instanceof tt)return new tt(e.h,e.s,e.l,e.opacity);if(e instanceof jt||(e=vt(e)),!e)return new tt;if(e instanceof tt)return e;e=e.rgb();var t=e.r/255,i=e.g/255,n=e.b/255,s=Math.min(t,i,n),r=Math.max(t,i,n),o=NaN,a=r-s,l=(r+s)/2;return a?(t===r?o=(i-n)/a+(i<n)*6:i===r?o=(n-t)/a+2:o=(t-i)/a+4,a/=l<.5?r+s:2-r-s,o*=60):a=l>0&&l<1?0:o,new tt(o,a,l,e.opacity)}function Ar(e,t,i,n){return arguments.length===1?sn(e):new tt(e,t,i,n??1)}function tt(e,t,i,n){this.h=+e,this.s=+t,this.l=+i,this.opacity=+n}Ve(tt,Ar,nn(jt,{brighter(e){return e=e==null?ue:Math.pow(ue,e),new tt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Ft:Math.pow(Ft,e),new tt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,i=this.l,n=i+(i<.5?i:1-i)*t,s=2*i-n;return new X(Ne(e>=240?e-240:e+120,s,n),Ne(e,s,n),Ne(e<120?e+240:e-120,s,n),this.opacity)},clamp(){return new tt(mi(this.h),te(this.s),te(this.l),fe(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=fe(this.opacity);return`${e===1?"hsl(":"hsla("}${mi(this.h)}, ${te(this.s)*100}%, ${te(this.l)*100}%${e===1?")":`, ${e})`}`}}));function mi(e){return e=(e||0)%360,e<0?e+360:e}function te(e){return Math.max(0,Math.min(1,e||0))}function Ne(e,t,i){return(e<60?t+(i-t)*e/60:e<180?i:e<240?t+(i-t)*(240-e)/60:t)*255}const je=e=>()=>e;function Pr(e,t){return function(i){return e+i*t}}function Rr(e,t,i){return e=Math.pow(e,i),t=Math.pow(t,i)-e,i=1/i,function(n){return Math.pow(e+n*t,i)}}function Lr(e){return(e=+e)==1?rn:function(t,i){return i-t?Rr(t,i,e):je(isNaN(t)?i:t)}}function rn(e,t){var i=t-e;return i?Pr(e,i):je(isNaN(e)?t:e)}const pe=(function e(t){var i=Lr(t);function n(s,r){var o=i((s=Oe(s)).r,(r=Oe(r)).r),a=i(s.g,r.g),l=i(s.b,r.b),h=rn(s.opacity,r.opacity);return function(d){return s.r=o(d),s.g=a(d),s.b=l(d),s.opacity=h(d),s+""}}return n.gamma=e,n})(1);function Tr(e,t){t||(t=[]);var i=e?Math.min(t.length,e.length):0,n=t.slice(),s;return function(r){for(s=0;s<i;++s)n[s]=e[s]*(1-r)+t[s]*r;return n}}function Dr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Or(e,t){var i=t?t.length:0,n=e?Math.min(i,e.length):0,s=new Array(n),r=new Array(i),o;for(o=0;o<n;++o)s[o]=Ot(e[o],t[o]);for(;o<i;++o)r[o]=t[o];return function(a){for(o=0;o<n;++o)r[o]=s[o](a);return r}}function Br(e,t){var i=new Date;return e=+e,t=+t,function(n){return i.setTime(e*(1-n)+t*n),i}}function nt(e,t){return e=+e,t=+t,function(i){return e*(1-i)+t*i}}function Ir(e,t){var i={},n={},s;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(s in t)s in e?i[s]=Ot(e[s],t[s]):n[s]=t[s];return function(r){for(s in i)n[s]=i[s](r);return n}}var Be=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ce=new RegExp(Be.source,"g");function Fr(e){return function(){return e}}function Ur(e){return function(t){return e(t)+""}}function on(e,t){var i=Be.lastIndex=Ce.lastIndex=0,n,s,r,o=-1,a=[],l=[];for(e=e+"",t=t+"";(n=Be.exec(e))&&(s=Ce.exec(t));)(r=s.index)>i&&(r=t.slice(i,r),a[o]?a[o]+=r:a[++o]=r),(n=n[0])===(s=s[0])?a[o]?a[o]+=s:a[++o]=s:(a[++o]=null,l.push({i:o,x:nt(n,s)})),i=Ce.lastIndex;return i<t.length&&(r=t.slice(i),a[o]?a[o]+=r:a[++o]=r),a.length<2?l[0]?Ur(l[0].x):Fr(t):(t=l.length,function(h){for(var d=0,c;d<t;++d)a[(c=l[d]).i]=c.x(h);return a.join("")})}function Ot(e,t){var i=typeof t,n;return t==null||i==="boolean"?je(t):(i==="number"?nt:i==="string"?(n=vt(t))?(t=n,pe):on:t instanceof vt?pe:t instanceof Date?Br:Dr(t)?Tr:Array.isArray(t)?Or:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Ir:nt)(e,t)}var yi=180/Math.PI,Ie={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function an(e,t,i,n,s,r){var o,a,l;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(l=e*i+t*n)&&(i-=e*l,n-=t*l),(a=Math.sqrt(i*i+n*n))&&(i/=a,n/=a,l/=a),e*n<t*i&&(e=-e,t=-t,l=-l,o=-o),{translateX:s,translateY:r,rotate:Math.atan2(t,e)*yi,skewX:Math.atan(l)*yi,scaleX:o,scaleY:a}}var ee;function Xr(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Ie:an(t.a,t.b,t.c,t.d,t.e,t.f)}function Yr(e){return e==null||(ee||(ee=document.createElementNS("http://www.w3.org/2000/svg","g")),ee.setAttribute("transform",e),!(e=ee.transform.baseVal.consolidate()))?Ie:(e=e.matrix,an(e.a,e.b,e.c,e.d,e.e,e.f))}function ln(e,t,i,n){function s(h){return h.length?h.pop()+" ":""}function r(h,d,c,u,p,m){if(h!==c||d!==u){var x=p.push("translate(",null,t,null,i);m.push({i:x-4,x:nt(h,c)},{i:x-2,x:nt(d,u)})}else(c||u)&&p.push("translate("+c+t+u+i)}function o(h,d,c,u){h!==d?(h-d>180?d+=360:d-h>180&&(h+=360),u.push({i:c.push(s(c)+"rotate(",null,n)-2,x:nt(h,d)})):d&&c.push(s(c)+"rotate("+d+n)}function a(h,d,c,u){h!==d?u.push({i:c.push(s(c)+"skewX(",null,n)-2,x:nt(h,d)}):d&&c.push(s(c)+"skewX("+d+n)}function l(h,d,c,u,p,m){if(h!==c||d!==u){var x=p.push(s(p)+"scale(",null,",",null,")");m.push({i:x-4,x:nt(h,c)},{i:x-2,x:nt(d,u)})}else(c!==1||u!==1)&&p.push(s(p)+"scale("+c+","+u+")")}return function(h,d){var c=[],u=[];return h=e(h),d=e(d),r(h.translateX,h.translateY,d.translateX,d.translateY,c,u),o(h.rotate,d.rotate,c,u),a(h.skewX,d.skewX,c,u),l(h.scaleX,h.scaleY,d.scaleX,d.scaleY,c,u),h=d=null,function(p){for(var m=-1,x=u.length,S;++m<x;)c[(S=u[m]).i]=S.x(p);return c.join("")}}}var Wr=ln(Xr,"px, ","px)","deg)"),Zr=ln(Yr,", ",")",")"),qr=1e-12;function wi(e){return((e=Math.exp(e))+1/e)/2}function Vr(e){return((e=Math.exp(e))-1/e)/2}function jr(e){return((e=Math.exp(2*e))-1)/(e+1)}const oe=(function e(t,i,n){function s(r,o){var a=r[0],l=r[1],h=r[2],d=o[0],c=o[1],u=o[2],p=d-a,m=c-l,x=p*p+m*m,S,v;if(x<qr)v=Math.log(u/h)/t,S=function(O){return[a+O*p,l+O*m,h*Math.exp(t*O*v)]};else{var k=Math.sqrt(x),H=(u*u-h*h+n*x)/(2*h*i*k),L=(u*u-h*h-n*x)/(2*u*i*k),F=Math.log(Math.sqrt(H*H+1)-H),P=Math.log(Math.sqrt(L*L+1)-L);v=(P-F)/t,S=function(O){var K=O*v,Q=wi(F),ct=h/(i*k)*(Q*jr(t*K+F)-Vr(F));return[a+ct*p,l+ct*m,h*Q/wi(t*K+F)]}}return S.duration=v*1e3*t/Math.SQRT2,S}return s.rho=function(r){var o=Math.max(.001,+r),a=o*o,l=a*a;return e(o,a,l)},s})(Math.SQRT2,2,4);var Ct=0,Tt=0,Pt=0,hn=1e3,ge,Dt,me=0,bt=0,$e=0,Xt=typeof performance=="object"&&performance.now?performance:Date,dn=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Ge(){return bt||(dn(Gr),bt=Xt.now()+$e)}function Gr(){bt=0}function ye(){this._call=this._time=this._next=null}ye.prototype=cn.prototype={constructor:ye,restart:function(e,t,i){if(typeof e!="function")throw new TypeError("callback is not a function");i=(i==null?Ge():+i)+(t==null?0:+t),!this._next&&Dt!==this&&(Dt?Dt._next=this:ge=this,Dt=this),this._call=e,this._time=i,Fe()},stop:function(){this._call&&(this._call=null,this._time=1/0,Fe())}};function cn(e,t,i){var n=new ye;return n.restart(e,t,i),n}function Kr(){Ge(),++Ct;for(var e=ge,t;e;)(t=bt-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Ct}function vi(){bt=(me=Xt.now())+$e,Ct=Tt=0;try{Kr()}finally{Ct=0,Jr(),bt=0}}function Qr(){var e=Xt.now(),t=e-me;t>hn&&($e-=t,me=e)}function Jr(){for(var e,t=ge,i,n=1/0;t;)t._call?(n>t._time&&(n=t._time),e=t,t=t._next):(i=t._next,t._next=null,t=e?e._next=i:ge=i);Dt=e,Fe(n)}function Fe(e){if(!Ct){Tt&&(Tt=clearTimeout(Tt));var t=e-bt;t>24?(e<1/0&&(Tt=setTimeout(vi,e-Xt.now()-$e)),Pt&&(Pt=clearInterval(Pt))):(Pt||(me=Xt.now(),Pt=setInterval(Qr,hn)),Ct=1,dn(vi))}}function bi(e,t,i){var n=new ye;return t=t==null?0:+t,n.restart(s=>{n.stop(),e(s+t)},t,i),n}var to=We("start","end","cancel","interrupt"),eo=[],un=0,xi=1,Ue=2,ae=3,$i=4,Xe=5,le=6;function _e(e,t,i,n,s,r){var o=e.__transition;if(!o)e.__transition={};else if(i in o)return;io(e,i,{name:t,index:n,group:s,on:to,tween:eo,time:r.time,delay:r.delay,duration:r.duration,ease:r.ease,timer:null,state:un})}function Ke(e,t){var i=et(e,t);if(i.state>un)throw new Error("too late; already scheduled");return i}function rt(e,t){var i=et(e,t);if(i.state>ae)throw new Error("too late; already running");return i}function et(e,t){var i=e.__transition;if(!i||!(i=i[t]))throw new Error("transition not found");return i}function io(e,t,i){var n=e.__transition,s;n[t]=i,i.timer=cn(r,0,i.time);function r(h){i.state=xi,i.timer.restart(o,i.delay,i.time),i.delay<=h&&o(h-i.delay)}function o(h){var d,c,u,p;if(i.state!==xi)return l();for(d in n)if(p=n[d],p.name===i.name){if(p.state===ae)return bi(o);p.state===$i?(p.state=le,p.timer.stop(),p.on.call("interrupt",e,e.__data__,p.index,p.group),delete n[d]):+d<t&&(p.state=le,p.timer.stop(),p.on.call("cancel",e,e.__data__,p.index,p.group),delete n[d])}if(bi(function(){i.state===ae&&(i.state=$i,i.timer.restart(a,i.delay,i.time),a(h))}),i.state=Ue,i.on.call("start",e,e.__data__,i.index,i.group),i.state===Ue){for(i.state=ae,s=new Array(u=i.tween.length),d=0,c=-1;d<u;++d)(p=i.tween[d].value.call(e,e.__data__,i.index,i.group))&&(s[++c]=p);s.length=c+1}}function a(h){for(var d=h<i.duration?i.ease.call(null,h/i.duration):(i.timer.restart(l),i.state=Xe,1),c=-1,u=s.length;++c<u;)s[c].call(e,d);i.state===Xe&&(i.on.call("end",e,e.__data__,i.index,i.group),l())}function l(){i.state=le,i.timer.stop(),delete n[t];for(var h in n)return;delete e.__transition}}function he(e,t){var i=e.__transition,n,s,r=!0,o;if(i){t=t==null?null:t+"";for(o in i){if((n=i[o]).name!==t){r=!1;continue}s=n.state>Ue&&n.state<Xe,n.state=le,n.timer.stop(),n.on.call(s?"interrupt":"cancel",e,e.__data__,n.index,n.group),delete i[o]}r&&delete e.__transition}}function no(e){return this.each(function(){he(this,e)})}function so(e,t){var i,n;return function(){var s=rt(this,e),r=s.tween;if(r!==i){n=i=r;for(var o=0,a=n.length;o<a;++o)if(n[o].name===t){n=n.slice(),n.splice(o,1);break}}s.tween=n}}function ro(e,t,i){var n,s;if(typeof i!="function")throw new Error;return function(){var r=rt(this,e),o=r.tween;if(o!==n){s=(n=o).slice();for(var a={name:t,value:i},l=0,h=s.length;l<h;++l)if(s[l].name===t){s[l]=a;break}l===h&&s.push(a)}r.tween=s}}function oo(e,t){var i=this._id;if(e+="",arguments.length<2){for(var n=et(this.node(),i).tween,s=0,r=n.length,o;s<r;++s)if((o=n[s]).name===e)return o.value;return null}return this.each((t==null?so:ro)(i,e,t))}function Qe(e,t,i){var n=e._id;return e.each(function(){var s=rt(this,n);(s.value||(s.value={}))[t]=i.apply(this,arguments)}),function(s){return et(s,n).value[t]}}function fn(e,t){var i;return(typeof t=="number"?nt:t instanceof vt?pe:(i=vt(t))?(t=i,pe):on)(e,t)}function ao(e){return function(){this.removeAttribute(e)}}function lo(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ho(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttribute(e);return o===s?null:o===n?r:r=t(n=o,i)}}function co(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===n?r:r=t(n=o,i)}}function uo(e,t,i){var n,s,r;return function(){var o,a=i(this),l;return a==null?void this.removeAttribute(e):(o=this.getAttribute(e),l=a+"",o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a)))}}function fo(e,t,i){var n,s,r;return function(){var o,a=i(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),l=a+"",o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a)))}}function po(e,t){var i=xe(e),n=i==="transform"?Zr:fn;return this.attrTween(e,typeof t=="function"?(i.local?fo:uo)(i,n,Qe(this,"attr."+e,t)):t==null?(i.local?lo:ao)(i):(i.local?co:ho)(i,n,t))}function go(e,t){return function(i){this.setAttribute(e,t.call(this,i))}}function mo(e,t){return function(i){this.setAttributeNS(e.space,e.local,t.call(this,i))}}function yo(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&mo(e,r)),i}return s._value=t,s}function wo(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&go(e,r)),i}return s._value=t,s}function vo(e,t){var i="attr."+e;if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;var n=xe(e);return this.tween(i,(n.local?yo:wo)(n,t))}function bo(e,t){return function(){Ke(this,e).delay=+t.apply(this,arguments)}}function xo(e,t){return t=+t,function(){Ke(this,e).delay=t}}function $o(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?bo:xo)(t,e)):et(this.node(),t).delay}function _o(e,t){return function(){rt(this,e).duration=+t.apply(this,arguments)}}function zo(e,t){return t=+t,function(){rt(this,e).duration=t}}function Eo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?_o:zo)(t,e)):et(this.node(),t).duration}function So(e,t){if(typeof t!="function")throw new Error;return function(){rt(this,e).ease=t}}function ko(e){var t=this._id;return arguments.length?this.each(So(t,e)):et(this.node(),t).ease}function No(e,t){return function(){var i=t.apply(this,arguments);if(typeof i!="function")throw new Error;rt(this,e).ease=i}}function Co(e){if(typeof e!="function")throw new Error;return this.each(No(this._id,e))}function Mo(e){typeof e!="function"&&(e=Zi(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],l,h=0;h<o;++h)(l=r[h])&&e.call(l,l.__data__,h,r)&&a.push(l);return new ht(n,this._parents,this._name,this._id)}function Ho(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,i=e._groups,n=t.length,s=i.length,r=Math.min(n,s),o=new Array(n),a=0;a<r;++a)for(var l=t[a],h=i[a],d=l.length,c=o[a]=new Array(d),u,p=0;p<d;++p)(u=l[p]||h[p])&&(c[p]=u);for(;a<n;++a)o[a]=t[a];return new ht(o,this._parents,this._name,this._id)}function Ao(e){return(e+"").trim().split(/^|\s+/).every(function(t){var i=t.indexOf(".");return i>=0&&(t=t.slice(0,i)),!t||t==="start"})}function Po(e,t,i){var n,s,r=Ao(t)?Ke:rt;return function(){var o=r(this,e),a=o.on;a!==n&&(s=(n=a).copy()).on(t,i),o.on=s}}function Ro(e,t){var i=this._id;return arguments.length<2?et(this.node(),i).on.on(e):this.each(Po(i,e,t))}function Lo(e){return function(){var t=this.parentNode;for(var i in this.__transition)if(+i!==e)return;t&&t.removeChild(this)}}function To(){return this.on("end.remove",Lo(this._id))}function Do(e){var t=this._name,i=this._id;typeof e!="function"&&(e=Ze(e));for(var n=this._groups,s=n.length,r=new Array(s),o=0;o<s;++o)for(var a=n[o],l=a.length,h=r[o]=new Array(l),d,c,u=0;u<l;++u)(d=a[u])&&(c=e.call(d,d.__data__,u,a))&&("__data__"in d&&(c.__data__=d.__data__),h[u]=c,_e(h[u],t,i,u,h,et(d,i)));return new ht(r,this._parents,t,i)}function Oo(e){var t=this._name,i=this._id;typeof e!="function"&&(e=Wi(e));for(var n=this._groups,s=n.length,r=[],o=[],a=0;a<s;++a)for(var l=n[a],h=l.length,d,c=0;c<h;++c)if(d=l[c]){for(var u=e.call(d,d.__data__,c,l),p,m=et(d,i),x=0,S=u.length;x<S;++x)(p=u[x])&&_e(p,t,i,x,u,m);r.push(u),o.push(d)}return new ht(r,o,t,i)}var Bo=Vt.prototype.constructor;function Io(){return new Bo(this._groups,this._parents)}function Fo(e,t){var i,n,s;return function(){var r=Nt(this,e),o=(this.style.removeProperty(e),Nt(this,e));return r===o?null:r===i&&o===n?s:s=t(i=r,n=o)}}function pn(e){return function(){this.style.removeProperty(e)}}function Uo(e,t,i){var n,s=i+"",r;return function(){var o=Nt(this,e);return o===s?null:o===n?r:r=t(n=o,i)}}function Xo(e,t,i){var n,s,r;return function(){var o=Nt(this,e),a=i(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),Nt(this,e))),o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a))}}function Yo(e,t){var i,n,s,r="style."+t,o="end."+r,a;return function(){var l=rt(this,e),h=l.on,d=l.value[r]==null?a||(a=pn(t)):void 0;(h!==i||s!==d)&&(n=(i=h).copy()).on(o,s=d),l.on=n}}function Wo(e,t,i){var n=(e+="")=="transform"?Wr:fn;return t==null?this.styleTween(e,Fo(e,n)).on("end.style."+e,pn(e)):typeof t=="function"?this.styleTween(e,Xo(e,n,Qe(this,"style."+e,t))).each(Yo(this._id,e)):this.styleTween(e,Uo(e,n,t),i).on("end.style."+e,null)}function Zo(e,t,i){return function(n){this.style.setProperty(e,t.call(this,n),i)}}function qo(e,t,i){var n,s;function r(){var o=t.apply(this,arguments);return o!==s&&(n=(s=o)&&Zo(e,o,i)),n}return r._value=t,r}function Vo(e,t,i){var n="style."+(e+="");if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;return this.tween(n,qo(e,t,i??""))}function jo(e){return function(){this.textContent=e}}function Go(e){return function(){var t=e(this);this.textContent=t??""}}function Ko(e){return this.tween("text",typeof e=="function"?Go(Qe(this,"text",e)):jo(e==null?"":e+""))}function Qo(e){return function(t){this.textContent=e.call(this,t)}}function Jo(e){var t,i;function n(){var s=e.apply(this,arguments);return s!==i&&(t=(i=s)&&Qo(s)),t}return n._value=e,n}function ta(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,Jo(e))}function ea(){for(var e=this._name,t=this._id,i=gn(),n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,l,h=0;h<a;++h)if(l=o[h]){var d=et(l,t);_e(l,e,i,h,o,{time:d.time+d.delay+d.duration,delay:0,duration:d.duration,ease:d.ease})}return new ht(n,this._parents,e,i)}function ia(){var e,t,i=this,n=i._id,s=i.size();return new Promise(function(r,o){var a={value:o},l={value:function(){--s===0&&r()}};i.each(function(){var h=rt(this,n),d=h.on;d!==e&&(t=(e=d).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),h.on=t}),s===0&&r()})}var na=0;function ht(e,t,i,n){this._groups=e,this._parents=t,this._name=i,this._id=n}function gn(){return++na}var at=Vt.prototype;ht.prototype={constructor:ht,select:Do,selectAll:Oo,selectChild:at.selectChild,selectChildren:at.selectChildren,filter:Mo,merge:Ho,selection:Io,transition:ea,call:at.call,nodes:at.nodes,node:at.node,size:at.size,empty:at.empty,each:at.each,on:Ro,attr:po,attrTween:vo,style:Wo,styleTween:Vo,text:Ko,textTween:ta,remove:To,tween:oo,delay:$o,duration:Eo,ease:ko,easeVarying:Co,end:ia,[Symbol.iterator]:at[Symbol.iterator]};function sa(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var ra={time:null,delay:0,duration:250,ease:sa};function oa(e,t){for(var i;!(i=e.__transition)||!(i=i[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return i}function aa(e){var t,i;e instanceof ht?(t=e._id,e=e._name):(t=gn(),(i=ra).time=Ge(),e=e==null?null:e+"");for(var n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,l,h=0;h<a;++h)(l=o[h])&&_e(l,e,t,h,o,i||oa(l,t));return new ht(n,this._parents,e,t)}Vt.prototype.interrupt=no;Vt.prototype.transition=aa;const ie=e=>()=>e;function la(e,{sourceEvent:t,target:i,transform:n,dispatch:s}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},transform:{value:n,enumerable:!0,configurable:!0},_:{value:s}})}function lt(e,t,i){this.k=e,this.x=t,this.y=i}lt.prototype={constructor:lt,scale:function(e){return e===1?this:new lt(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new lt(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var ze=new lt(1,0,0);mn.prototype=lt.prototype;function mn(e){for(;!e.__zoom;)if(!(e=e.parentNode))return ze;return e.__zoom}function Me(e){e.stopImmediatePropagation()}function Rt(e){e.preventDefault(),e.stopImmediatePropagation()}function ha(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function da(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function _i(){return this.__zoom||ze}function ca(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function ua(){return navigator.maxTouchPoints||"ontouchstart"in this}function fa(e,t,i){var n=e.invertX(t[0][0])-i[0][0],s=e.invertX(t[1][0])-i[1][0],r=e.invertY(t[0][1])-i[0][1],o=e.invertY(t[1][1])-i[1][1];return e.translate(s>n?(n+s)/2:Math.min(0,n)||Math.max(0,s),o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o))}function pa(){var e=ha,t=da,i=fa,n=ca,s=ua,r=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],a=250,l=oe,h=We("start","zoom","end"),d,c,u,p=500,m=150,x=0,S=10;function v(f){f.property("__zoom",_i).on("wheel.zoom",K,{passive:!1}).on("mousedown.zoom",Q).on("dblclick.zoom",ct).filter(s).on("touchstart.zoom",Ht).on("touchmove.zoom",_).on("touchend.zoom touchcancel.zoom",N).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}v.transform=function(f,y,g,b){var $=f.selection?f.selection():f;$.property("__zoom",_i),f!==$?F(f,y,g,b):$.interrupt().each(function(){P(this,arguments).event(b).start().zoom(null,typeof y=="function"?y.apply(this,arguments):y).end()})},v.scaleBy=function(f,y,g,b){v.scaleTo(f,function(){var $=this.__zoom.k,z=typeof y=="function"?y.apply(this,arguments):y;return $*z},g,b)},v.scaleTo=function(f,y,g,b){v.transform(f,function(){var $=t.apply(this,arguments),z=this.__zoom,E=g==null?L($):typeof g=="function"?g.apply(this,arguments):g,M=z.invert(E),A=typeof y=="function"?y.apply(this,arguments):y;return i(H(k(z,A),E,M),$,o)},g,b)},v.translateBy=function(f,y,g,b){v.transform(f,function(){return i(this.__zoom.translate(typeof y=="function"?y.apply(this,arguments):y,typeof g=="function"?g.apply(this,arguments):g),t.apply(this,arguments),o)},null,b)},v.translateTo=function(f,y,g,b,$){v.transform(f,function(){var z=t.apply(this,arguments),E=this.__zoom,M=b==null?L(z):typeof b=="function"?b.apply(this,arguments):b;return i(ze.translate(M[0],M[1]).scale(E.k).translate(typeof y=="function"?-y.apply(this,arguments):-y,typeof g=="function"?-g.apply(this,arguments):-g),z,o)},b,$)};function k(f,y){return y=Math.max(r[0],Math.min(r[1],y)),y===f.k?f:new lt(y,f.x,f.y)}function H(f,y,g){var b=y[0]-g[0]*f.k,$=y[1]-g[1]*f.k;return b===f.x&&$===f.y?f:new lt(f.k,b,$)}function L(f){return[(+f[0][0]+ +f[1][0])/2,(+f[0][1]+ +f[1][1])/2]}function F(f,y,g,b){f.on("start.zoom",function(){P(this,arguments).event(b).start()}).on("interrupt.zoom end.zoom",function(){P(this,arguments).event(b).end()}).tween("zoom",function(){var $=this,z=arguments,E=P($,z).event(b),M=t.apply($,z),A=g==null?L(M):typeof g=="function"?g.apply($,z):g,Z=Math.max(M[1][0]-M[0][0],M[1][1]-M[0][1]),R=$.__zoom,q=typeof y=="function"?y.apply($,z):y,J=l(R.invert(A).concat(Z/R.k),q.invert(A).concat(Z/q.k));return function(V){if(V===1)V=q;else{var it=J(V),At=Z/it[2];V=new lt(At,A[0]-it[0]*At,A[1]-it[1]*At)}E.zoom(null,V)}})}function P(f,y,g){return!g&&f.__zooming||new O(f,y)}function O(f,y){this.that=f,this.args=y,this.active=0,this.sourceEvent=null,this.extent=t.apply(f,y),this.taps=0}O.prototype={event:function(f){return f&&(this.sourceEvent=f),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(f,y){return this.mouse&&f!=="mouse"&&(this.mouse[1]=y.invert(this.mouse[0])),this.touch0&&f!=="touch"&&(this.touch0[1]=y.invert(this.touch0[0])),this.touch1&&f!=="touch"&&(this.touch1[1]=y.invert(this.touch1[0])),this.that.__zoom=y,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(f){var y=ft(this.that).datum();h.call(f,this.that,new la(f,{sourceEvent:this.sourceEvent,target:v,transform:this.that.__zoom,dispatch:h}),y)}};function K(f,...y){if(!e.apply(this,arguments))return;var g=P(this,y).event(f),b=this.__zoom,$=Math.max(r[0],Math.min(r[1],b.k*Math.pow(2,n.apply(this,arguments)))),z=ut(f);if(g.wheel)(g.mouse[0][0]!==z[0]||g.mouse[0][1]!==z[1])&&(g.mouse[1]=b.invert(g.mouse[0]=z)),clearTimeout(g.wheel);else{if(b.k===$)return;g.mouse=[z,b.invert(z)],he(this),g.start()}Rt(f),g.wheel=setTimeout(E,m),g.zoom("mouse",i(H(k(b,$),g.mouse[0],g.mouse[1]),g.extent,o));function E(){g.wheel=null,g.end()}}function Q(f,...y){if(u||!e.apply(this,arguments))return;var g=f.currentTarget,b=P(this,y,!0).event(f),$=ft(f.view).on("mousemove.zoom",A,!0).on("mouseup.zoom",Z,!0),z=ut(f,g),E=f.clientX,M=f.clientY;vr(f.view),Me(f),b.mouse=[z,this.__zoom.invert(z)],he(this),b.start();function A(R){if(Rt(R),!b.moved){var q=R.clientX-E,J=R.clientY-M;b.moved=q*q+J*J>x}b.event(R).zoom("mouse",i(H(b.that.__zoom,b.mouse[0]=ut(R,g),b.mouse[1]),b.extent,o))}function Z(R){$.on("mousemove.zoom mouseup.zoom",null),br(R.view,b.moved),Rt(R),b.event(R).end()}}function ct(f,...y){if(e.apply(this,arguments)){var g=this.__zoom,b=ut(f.changedTouches?f.changedTouches[0]:f,this),$=g.invert(b),z=g.k*(f.shiftKey?.5:2),E=i(H(k(g,z),b,$),t.apply(this,y),o);Rt(f),a>0?ft(this).transition().duration(a).call(F,E,b,f):ft(this).call(v.transform,E,b,f)}}function Ht(f,...y){if(e.apply(this,arguments)){var g=f.touches,b=g.length,$=P(this,y,f.changedTouches.length===b).event(f),z,E,M,A;for(Me(f),E=0;E<b;++E)M=g[E],A=ut(M,this),A=[A,this.__zoom.invert(A),M.identifier],$.touch0?!$.touch1&&$.touch0[2]!==A[2]&&($.touch1=A,$.taps=0):($.touch0=A,z=!0,$.taps=1+!!d);d&&(d=clearTimeout(d)),z&&($.taps<2&&(c=A[0],d=setTimeout(function(){d=null},p)),he(this),$.start())}}function _(f,...y){if(this.__zooming){var g=P(this,y).event(f),b=f.changedTouches,$=b.length,z,E,M,A;for(Rt(f),z=0;z<$;++z)E=b[z],M=ut(E,this),g.touch0&&g.touch0[2]===E.identifier?g.touch0[0]=M:g.touch1&&g.touch1[2]===E.identifier&&(g.touch1[0]=M);if(E=g.that.__zoom,g.touch1){var Z=g.touch0[0],R=g.touch0[1],q=g.touch1[0],J=g.touch1[1],V=(V=q[0]-Z[0])*V+(V=q[1]-Z[1])*V,it=(it=J[0]-R[0])*it+(it=J[1]-R[1])*it;E=k(E,Math.sqrt(V/it)),M=[(Z[0]+q[0])/2,(Z[1]+q[1])/2],A=[(R[0]+J[0])/2,(R[1]+J[1])/2]}else if(g.touch0)M=g.touch0[0],A=g.touch0[1];else return;g.zoom("touch",i(H(E,M,A),g.extent,o))}}function N(f,...y){if(this.__zooming){var g=P(this,y).event(f),b=f.changedTouches,$=b.length,z,E;for(Me(f),u&&clearTimeout(u),u=setTimeout(function(){u=null},p),z=0;z<$;++z)E=b[z],g.touch0&&g.touch0[2]===E.identifier?delete g.touch0:g.touch1&&g.touch1[2]===E.identifier&&delete g.touch1;if(g.touch1&&!g.touch0&&(g.touch0=g.touch1,delete g.touch1),g.touch0)g.touch0[1]=this.__zoom.invert(g.touch0[0]);else if(g.end(),g.taps===2&&(E=ut(E,this),Math.hypot(c[0]-E[0],c[1]-E[1])<S)){var M=ft(this).on("dblclick.zoom");M&&M.apply(this,arguments)}}}return v.wheelDelta=function(f){return arguments.length?(n=typeof f=="function"?f:ie(+f),v):n},v.filter=function(f){return arguments.length?(e=typeof f=="function"?f:ie(!!f),v):e},v.touchable=function(f){return arguments.length?(s=typeof f=="function"?f:ie(!!f),v):s},v.extent=function(f){return arguments.length?(t=typeof f=="function"?f:ie([[+f[0][0],+f[0][1]],[+f[1][0],+f[1][1]]]),v):t},v.scaleExtent=function(f){return arguments.length?(r[0]=+f[0],r[1]=+f[1],v):[r[0],r[1]]},v.translateExtent=function(f){return arguments.length?(o[0][0]=+f[0][0],o[1][0]=+f[1][0],o[0][1]=+f[0][1],o[1][1]=+f[1][1],v):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},v.constrain=function(f){return arguments.length?(i=f,v):i},v.duration=function(f){return arguments.length?(a=+f,v):a},v.interpolate=function(f){return arguments.length?(l=f,v):l},v.on=function(){var f=h.on.apply(h,arguments);return f===h?v:f},v.clickDistance=function(f){return arguments.length?(x=(f=+f)*f,v):Math.sqrt(x)},v.tapDistance=function(f){return arguments.length?(S=+f,v):S},v}var zi;(function(e){e.Strict="strict",e.Loose="loose"})(zi||(zi={}));var Bt;(function(e){e.Free="free",e.Vertical="vertical",e.Horizontal="horizontal"})(Bt||(Bt={}));var Ei;(function(e){e.Partial="partial",e.Full="full"})(Ei||(Ei={}));var Si;(function(e){e.Bezier="default",e.Straight="straight",e.Step="step",e.SmoothStep="smoothstep",e.SimpleBezier="simplebezier"})(Si||(Si={}));var ki;(function(e){e.Arrow="arrow",e.ArrowClosed="arrowclosed"})(ki||(ki={}));exports.Position=void 0;(function(e){e.Left="left",e.Top="top",e.Right="right",e.Bottom="bottom"})(exports.Position||(exports.Position={}));exports.Position.Left+"",exports.Position.Right,exports.Position.Right+"",exports.Position.Left,exports.Position.Top+"",exports.Position.Bottom,exports.Position.Bottom+"",exports.Position.Top;const ga=(e,t=0,i=1)=>Math.min(Math.max(e,t),i),Ni=e=>!isNaN(e)&&isFinite(e),yn=()=>typeof navigator<"u"&&navigator?.userAgent?.indexOf("Mac")>=0;function ma({sourceX:e,sourceY:t,targetX:i,targetY:n,sourceControlX:s,sourceControlY:r,targetControlX:o,targetControlY:a}){const l=e*.125+s*.375+o*.375+i*.125,h=t*.125+r*.375+a*.375+n*.125,d=Math.abs(l-e),c=Math.abs(h-t);return[l,h,d,c]}function ne(e,t){return e>=0?.5*e:t*25*Math.sqrt(-e)}function Ci({pos:e,x1:t,y1:i,x2:n,y2:s,c:r}){switch(e){case exports.Position.Left:return[t-ne(t-n,r),i];case exports.Position.Right:return[t+ne(n-t,r),i];case exports.Position.Top:return[t,i-ne(i-s,r)];case exports.Position.Bottom:return[t,i+ne(s-i,r)]}}function ya({sourceX:e,sourceY:t,sourcePosition:i=exports.Position.Bottom,targetX:n,targetY:s,targetPosition:r=exports.Position.Top,curvature:o=.25}){const[a,l]=Ci({pos:i,x1:e,y1:t,x2:n,y2:s,c:o}),[h,d]=Ci({pos:r,x1:n,y1:s,x2:e,y2:t,c:o}),[c,u,p,m]=ma({sourceX:e,sourceY:t,targetX:n,targetY:s,sourceControlX:a,sourceControlY:l,targetControlX:h,targetControlY:d});return[`M${e},${t} C${a},${l} ${h},${d} ${n},${s}`,c,u,p,m]}function wn({sourceX:e,sourceY:t,targetX:i,targetY:n}){const s=Math.abs(i-e)/2,r=i<e?i+s:i-s,o=Math.abs(n-t)/2,a=n<t?n+o:n-o;return[r,a,s,o]}function wa({sourceX:e,sourceY:t,targetX:i,targetY:n}){const[s,r,o,a]=wn({sourceX:e,sourceY:t,targetX:i,targetY:n});return[`M ${e},${t}L ${i},${n}`,s,r,o,a]}const Mi={[exports.Position.Left]:{x:-1,y:0},[exports.Position.Right]:{x:1,y:0},[exports.Position.Top]:{x:0,y:-1},[exports.Position.Bottom]:{x:0,y:1}},va=({source:e,sourcePosition:t=exports.Position.Bottom,target:i})=>t===exports.Position.Left||t===exports.Position.Right?e.x<i.x?{x:1,y:0}:{x:-1,y:0}:e.y<i.y?{x:0,y:1}:{x:0,y:-1},Hi=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function ba({source:e,sourcePosition:t=exports.Position.Bottom,target:i,targetPosition:n=exports.Position.Top,center:s,offset:r,stepPosition:o}){const a=Mi[t],l=Mi[n],h={x:e.x+a.x*r,y:e.y+a.y*r},d={x:i.x+l.x*r,y:i.y+l.y*r},c=va({source:h,sourcePosition:t,target:d}),u=c.x!==0?"x":"y",p=c[u];let m=[],x,S;const v={x:0,y:0},k={x:0,y:0},[,,H,L]=wn({sourceX:e.x,sourceY:e.y,targetX:i.x,targetY:i.y});if(a[u]*l[u]===-1){u==="x"?(x=s.x??h.x+(d.x-h.x)*o,S=s.y??(h.y+d.y)/2):(x=s.x??(h.x+d.x)/2,S=s.y??h.y+(d.y-h.y)*o);const P=[{x,y:h.y},{x,y:d.y}],O=[{x:h.x,y:S},{x:d.x,y:S}];a[u]===p?m=u==="x"?P:O:m=u==="x"?O:P}else{const P=[{x:h.x,y:d.y}],O=[{x:d.x,y:h.y}];if(u==="x"?m=a.x===p?O:P:m=a.y===p?P:O,t===n){const _=Math.abs(e[u]-i[u]);if(_<=r){const N=Math.min(r-1,r-_);a[u]===p?v[u]=(h[u]>e[u]?-1:1)*N:k[u]=(d[u]>i[u]?-1:1)*N}}if(t!==n){const _=u==="x"?"y":"x",N=a[u]===l[_],f=h[_]>d[_],y=h[_]<d[_];(a[u]===1&&(!N&&f||N&&y)||a[u]!==1&&(!N&&y||N&&f))&&(m=u==="x"?P:O)}const K={x:h.x+v.x,y:h.y+v.y},Q={x:d.x+k.x,y:d.y+k.y},ct=Math.max(Math.abs(K.x-m[0].x),Math.abs(Q.x-m[0].x)),Ht=Math.max(Math.abs(K.y-m[0].y),Math.abs(Q.y-m[0].y));ct>=Ht?(x=(K.x+Q.x)/2,S=m[0].y):(x=m[0].x,S=(K.y+Q.y)/2)}return[[e,{x:h.x+v.x,y:h.y+v.y},...m,{x:d.x+k.x,y:d.y+k.y},i],x,S,H,L]}function xa(e,t,i,n){const s=Math.min(Hi(e,t)/2,Hi(t,i)/2,n),{x:r,y:o}=t;if(e.x===r&&r===i.x||e.y===o&&o===i.y)return`L${r} ${o}`;if(e.y===o){const h=e.x<i.x?-1:1,d=e.y<i.y?1:-1;return`L ${r+s*h},${o}Q ${r},${o} ${r},${o+s*d}`}const a=e.x<i.x?1:-1,l=e.y<i.y?-1:1;return`L ${r},${o+s*l}Q ${r},${o} ${r+s*a},${o}`}function $a({sourceX:e,sourceY:t,sourcePosition:i=exports.Position.Bottom,targetX:n,targetY:s,targetPosition:r=exports.Position.Top,borderRadius:o=5,centerX:a,centerY:l,offset:h=20,stepPosition:d=.5}){const[c,u,p,m,x]=ba({source:{x:e,y:t},sourcePosition:i,target:{x:n,y:s},targetPosition:r,center:{x:a,y:l},offset:h,stepPosition:d});return[c.reduce((v,k,H)=>{let L="";return H>0&&H<c.length-1?L=xa(c[H-1],k,c[H+1],o):L=`${H===0?"M":"L"}${k.x} ${k.y}`,v+=L,v},""),u,p,m,x]}const _a=(e,t)=>e.x!==t.x||e.y!==t.y||e.zoom!==t.k,Ee=e=>({x:e.x,y:e.y,zoom:e.k}),He=({x:e,y:t,zoom:i})=>ze.translate(e,t).scale(i),St=(e,t)=>e.target.closest(`.${t}`),vn=(e,t)=>t===2&&Array.isArray(e)&&e.includes(2),za=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,Ae=(e,t=0,i=za,n=()=>{})=>{const s=typeof t=="number"&&t>0;return s||n(),s?e.transition().duration(t).ease(i).on("end",n):e},bn=e=>{const t=e.ctrlKey&&yn()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*t};function Ea({zoomPanValues:e,noWheelClassName:t,d3Selection:i,d3Zoom:n,panOnScrollMode:s,panOnScrollSpeed:r,zoomOnPinch:o,onPanZoomStart:a,onPanZoom:l,onPanZoomEnd:h}){return d=>{if(St(d,t))return d.ctrlKey&&d.preventDefault(),!1;d.preventDefault(),d.stopImmediatePropagation();const c=i.property("__zoom").k||1;if(d.ctrlKey&&o){const S=ut(d),v=bn(d),k=c*Math.pow(2,v);n.scaleTo(i,k,S,d);return}const u=d.deltaMode===1?20:1;let p=s===Bt.Vertical?0:d.deltaX*u,m=s===Bt.Horizontal?0:d.deltaY*u;!yn()&&d.shiftKey&&s!==Bt.Vertical&&(p=d.deltaY*u,m=0),n.translateBy(i,-(p/c)*r,-(m/c)*r,{internal:!0});const x=Ee(i.property("__zoom"));clearTimeout(e.panScrollTimeout),e.isPanScrolling||(e.isPanScrolling=!0),e.isPanScrolling&&(l?.(d,x),e.panScrollTimeout=setTimeout(()=>{e.isPanScrolling=!1},150))}}function Sa({noWheelClassName:e,preventScrolling:t,d3ZoomHandler:i}){return function(n,s){const r=n.type==="wheel",o=!t&&r&&!n.ctrlKey,a=St(n,e);if(n.ctrlKey&&r&&a&&n.preventDefault(),o||a)return null;n.preventDefault(),i.call(this,n,s)}}function ka({zoomPanValues:e,onDraggingChange:t,onPanZoomStart:i}){return n=>{if(n.sourceEvent?.internal)return;const s=Ee(n.transform);e.mouseButton=n.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=s,n.sourceEvent?.type==="mousedown"&&t(!0),i&&i?.(n.sourceEvent,s)}}function Na({zoomPanValues:e,panOnDrag:t,onPaneContextMenu:i,onTransformChange:n,onPanZoom:s}){return r=>{e.usedRightMouseButton=!!(i&&vn(t,e.mouseButton??0)),r.sourceEvent?.sync||n([r.transform.x,r.transform.y,r.transform.k]),s&&!r.sourceEvent?.internal&&s?.(r.sourceEvent,Ee(r.transform))}}function Ca({zoomPanValues:e,panOnDrag:t,panOnScroll:i,onDraggingChange:n,onPanZoomEnd:s,onPaneContextMenu:r}){return o=>{if(!o.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,r&&vn(t,e.mouseButton??0)&&!e.usedRightMouseButton&&o.sourceEvent&&r(o.sourceEvent),e.usedRightMouseButton=!1,n(!1),s&&_a(e.prevViewport,o.transform))){const a=Ee(o.transform);e.prevViewport=a,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{s?.(o.sourceEvent,a)},i?150:0)}}}function Ma({zoomActivationKeyPressed:e,zoomOnScroll:t,zoomOnPinch:i,panOnDrag:n,panOnScroll:s,zoomOnDoubleClick:r,userSelectionActive:o,noWheelClassName:a,noPanClassName:l,lib:h,connectionInProgress:d}){return c=>{const u=e||t,p=i&&c.ctrlKey,m=c.type==="wheel";if(c.button===1&&c.type==="mousedown"&&(St(c,`${h}-flow__node`)||St(c,`${h}-flow__edge`)))return!0;if(!n&&!u&&!s&&!r&&!i||o||d&&!m||St(c,a)&&m||St(c,l)&&(!m||s&&m&&!e)||!i&&c.ctrlKey&&m)return!1;if(!i&&c.type==="touchstart"&&c.touches?.length>1)return c.preventDefault(),!1;if(!u&&!s&&!p&&m||!n&&(c.type==="mousedown"||c.type==="touchstart")||Array.isArray(n)&&!n.includes(c.button)&&c.type==="mousedown")return!1;const x=Array.isArray(n)&&n.includes(c.button)||!c.button||c.button<=1;return(!c.ctrlKey||m)&&x}}function Ha({domNode:e,minZoom:t,maxZoom:i,paneClickDistance:n,translateExtent:s,viewport:r,onPanZoom:o,onPanZoomStart:a,onPanZoomEnd:l,onDraggingChange:h}){const d={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{x:0,y:0,zoom:0},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},c=e.getBoundingClientRect(),u=pa().clickDistance(!Ni(n)||n<0?0:n).scaleExtent([t,i]).translateExtent(s),p=ft(e).call(u);H({x:r.x,y:r.y,zoom:ga(r.zoom,t,i)},[[0,0],[c.width,c.height]],s);const m=p.on("wheel.zoom"),x=p.on("dblclick.zoom");u.wheelDelta(bn);function S(_,N){return p?new Promise(f=>{u?.interpolate(N?.interpolate==="linear"?Ot:oe).transform(Ae(p,N?.duration,N?.ease,()=>f(!0)),_)}):Promise.resolve(!1)}function v({noWheelClassName:_,noPanClassName:N,onPaneContextMenu:f,userSelectionActive:y,panOnScroll:g,panOnDrag:b,panOnScrollMode:$,panOnScrollSpeed:z,preventScrolling:E,zoomOnPinch:M,zoomOnScroll:A,zoomOnDoubleClick:Z,zoomActivationKeyPressed:R,lib:q,onTransformChange:J,connectionInProgress:V}){y&&!d.isZoomingOrPanning&&k();const At=g&&!R&&!y?Ea({zoomPanValues:d,noWheelClassName:_,d3Selection:p,d3Zoom:u,panOnScrollMode:$,panOnScrollSpeed:z,zoomOnPinch:M,onPanZoomStart:a,onPanZoom:o,onPanZoomEnd:l}):Sa({noWheelClassName:_,preventScrolling:E,d3ZoomHandler:m});if(p.on("wheel.zoom",At,{passive:!1}),!y){const Rn=ka({zoomPanValues:d,onDraggingChange:h,onPanZoomStart:a});u.on("start",Rn);const Ln=Na({zoomPanValues:d,panOnDrag:b,onPaneContextMenu:!!f,onPanZoom:o,onTransformChange:J});u.on("zoom",Ln);const Tn=Ca({zoomPanValues:d,panOnDrag:b,panOnScroll:g,onPaneContextMenu:f,onPanZoomEnd:l,onDraggingChange:h});u.on("end",Tn)}const Pn=Ma({zoomActivationKeyPressed:R,panOnDrag:b,zoomOnScroll:A,panOnScroll:g,zoomOnDoubleClick:Z,zoomOnPinch:M,userSelectionActive:y,noPanClassName:N,noWheelClassName:_,lib:q,connectionInProgress:V});u.filter(Pn),Z?p.on("dblclick.zoom",x):p.on("dblclick.zoom",null)}function k(){u.on("zoom",null)}async function H(_,N,f){const y=He(_),g=u?.constrain()(y,N,f);return g&&await S(g),new Promise(b=>b(g))}async function L(_,N){const f=He(_);return await S(f,N),new Promise(y=>y(f))}function F(_){if(p){const N=He(_),f=p.property("__zoom");(f.k!==_.zoom||f.x!==_.x||f.y!==_.y)&&u?.transform(p,N,null,{sync:!0})}}function P(){const _=p?mn(p.node()):{x:0,y:0,k:1};return{x:_.x,y:_.y,zoom:_.k}}function O(_,N){return p?new Promise(f=>{u?.interpolate(N?.interpolate==="linear"?Ot:oe).scaleTo(Ae(p,N?.duration,N?.ease,()=>f(!0)),_)}):Promise.resolve(!1)}function K(_,N){return p?new Promise(f=>{u?.interpolate(N?.interpolate==="linear"?Ot:oe).scaleBy(Ae(p,N?.duration,N?.ease,()=>f(!0)),_)}):Promise.resolve(!1)}function Q(_){u?.scaleExtent(_)}function ct(_){u?.translateExtent(_)}function Ht(_){const N=!Ni(_)||_<0?0:_;u?.clickDistance(N)}return{update:v,destroy:k,setViewport:L,setViewportConstrained:H,getViewport:P,scaleTo:O,scaleBy:K,setScaleExtent:Q,setTranslateExtent:ct,syncViewport:F,setClickDistance:Ht}}var Ai;(function(e){e.Line="line",e.Handle="handle"})(Ai||(Ai={}));class xn{constructor(t={}){this.container=null,this.state={nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},this.subscribers=new Set,this.panZoomInstance=null,this.pendingNodes=[],this.panZoomUpdateOptions=null,this.options={minZoom:.5,maxZoom:2,defaultZoom:1,nodesDraggable:!0,nodesConnectable:!0,elementsSelectable:!0,...t},this.state.nodes=t.nodes||[],this.state.edges=t.edges||[],this.updateLookups()}mount(t){this.container=t,this.panZoomInstance=Ha({domNode:t,minZoom:this.options.minZoom||.5,maxZoom:this.options.maxZoom||2,paneClickDistance:0,translateExtent:[[-1/0,-1/0],[1/0,1/0]],viewport:this.state.viewport,onDraggingChange:i=>{this.container?.classList.toggle("panning",i)},onPanZoom:(i,n)=>{this.state.viewport=n,this.notifySubscribers()},onPanZoomStart:(i,n)=>{},onPanZoomEnd:(i,n)=>{}}),this.panZoomUpdateOptions={noWheelClassName:"nowheel",noPanClassName:"nopan",onPaneContextMenu:void 0,preventScrolling:!0,panOnScroll:!0,panOnDrag:!0,panOnScrollMode:"free",panOnScrollSpeed:.8,userSelectionActive:!1,zoomOnPinch:!0,zoomOnScroll:!0,zoomOnDoubleClick:!0,zoomActivationKeyPressed:!1,lib:"lit-flow",onTransformChange:i=>{},connectionInProgress:!1},this.panZoomInstance.update(this.panZoomUpdateOptions),this.notifySubscribers()}setPanOnDrag(t){this.panZoomInstance&&this.panZoomUpdateOptions&&(this.panZoomUpdateOptions={...this.panZoomUpdateOptions,panOnDrag:t},this.panZoomInstance.update(this.panZoomUpdateOptions))}destroy(){this.panZoomInstance?.destroy(),this.panZoomInstance=null,this.container=null,this.subscribers.clear()}getState(){return this.state}get nodes(){return this.state.nodes}get edges(){return this.state.edges}getViewport(){return this.state.viewport}setViewport(t){this.state.viewport=t,this.panZoomInstance?.setViewport?.(t),this.notifySubscribers()}setNodes(t){this.pendingNodes.push(...t.map(i=>i.id)),this.state.nodes=t,this.updateLookups(),this.notifySubscribers()}setEdges(t){this.retryEdgeRendering(t)}updateNode(t,i){this.state.nodes=this.state.nodes.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}updateEdge(t,i){this.state.edges=this.state.edges.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}addNode(t){this.state.nodes=[...this.state.nodes,t],this.updateLookups(),this.notifySubscribers()}removeNode(t){this.state.nodes=this.state.nodes.filter(i=>i.id!==t),this.state.edges=this.state.edges.filter(i=>i.source!==t&&i.target!==t),this.updateLookups(),this.notifySubscribers()}addEdge(t){this.state.edges=[...this.state.edges,t],this.updateLookups(),this.notifySubscribers()}removeEdge(t){this.state.edges=this.state.edges.filter(i=>i.id!==t),this.updateLookups(),this.notifySubscribers()}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}zoomIn(){const t=this.state.viewport.zoom,i=Math.min(t*1.2,this.options.maxZoom||2);this.setViewport({...this.state.viewport,zoom:i})}zoomOut(){const t=this.state.viewport.zoom,i=Math.max(t/1.2,this.options.minZoom||.5);this.setViewport({...this.state.viewport,zoom:i})}fitView(){if(this.state.nodes.length===0||!this.container)return;let t=1/0,i=1/0,n=-1/0,s=-1/0;this.state.nodes.forEach(m=>{const x=m.measured?.width||m.width||150,S=m.measured?.height||m.height||50;t=Math.min(t,m.position.x),i=Math.min(i,m.position.y),n=Math.max(n,m.position.x+x),s=Math.max(s,m.position.y+S)});const r={x:t,y:i,width:n-t,height:s-i},o=this.container.clientWidth,a=this.container.clientHeight,l=50,h=(o-l*2)/r.width,d=(a-l*2)/r.height,c=Math.min(h,d,this.options.maxZoom||2),u=(o-r.width*c)/2-r.x*c,p=(a-r.height*c)/2-r.y*c;this.setViewport({x:u,y:p,zoom:c})}updateLookups(){this.state.nodeLookup.clear(),this.state.nodes.forEach(t=>{const i={...t,measured:t.measured||{width:t.width,height:t.height},internals:{positionAbsolute:t.position,z:t.zIndex||0,userNode:t}};this.state.nodeLookup.set(t.id,i)}),this.state.edgeLookup.clear(),this.state.edges.forEach(t=>{this.state.edgeLookup.set(t.id,t)})}isNodeRendered(t){if(!this.container)return!1;const i=this.container.querySelector(`[id="${CSS.escape(t)}"]`);if(!i)return!1;const n=i.getBoundingClientRect();return n.width>0&&n.height>0}hasPendingNodes(t){return t.some(i=>this.pendingNodes.includes(i)||!this.isNodeRendered(i))}markNodeAsRendered(t){const i=this.pendingNodes.indexOf(t);i>-1&&this.pendingNodes.splice(i,1)}retryEdgeRendering(t,i=0,n=10){const s=t.flatMap(o=>[o.source,o.target]),r=[...new Set(s)];this.hasPendingNodes(r)&&i<n?setTimeout(()=>{this.retryEdgeRendering(t,i+1,n)},100):(this.state.edges=t,this.updateLookups(),this.notifySubscribers(),r.forEach(o=>this.markNodeAsRendered(o)))}notifySubscribers(){this.subscribers.forEach(t=>t(this.state))}}function Aa(e={}){const t={nodes:e.nodes||[],edges:e.edges||[],viewport:e.viewport||{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},i=new Set,n=()=>{t.nodeLookup.clear(),t.nodes.forEach(s=>{const r={...s,measured:s.measured||{width:s.width,height:s.height},internals:{positionAbsolute:s.position,z:s.zIndex||0,userNode:s}};t.nodeLookup.set(s.id,r)}),t.edgeLookup.clear(),t.edges.forEach(s=>{t.edgeLookup.set(s.id,s)})};return n(),{getState:()=>t,setState:s=>{Object.assign(t,s),n(),i.forEach(r=>r(t))},subscribe:s=>(i.add(s),()=>i.delete(s))}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=globalThis,Je=de.ShadowRoot&&(de.ShadyCSS===void 0||de.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ti=Symbol(),Pi=new WeakMap;let $n=class{constructor(t,i,n){if(this._$cssResult$=!0,n!==ti)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Je&&t===void 0){const n=i!==void 0&&i.length===1;n&&(t=Pi.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Pi.set(i,t))}return t}toString(){return this.cssText}};const Pa=e=>new $n(typeof e=="string"?e:e+"",void 0,ti),I=(e,...t)=>{const i=e.length===1?e[0]:t.reduce(((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1]),e[0]);return new $n(i,e,ti)},Ra=(e,t)=>{if(Je)e.adoptedStyleSheets=t.map((i=>i instanceof CSSStyleSheet?i:i.styleSheet));else for(const i of t){const n=document.createElement("style"),s=de.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=i.cssText,e.appendChild(n)}},Ri=Je?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const n of t.cssRules)i+=n.cssText;return Pa(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:La,defineProperty:Ta,getOwnPropertyDescriptor:Da,getOwnPropertyNames:Oa,getOwnPropertySymbols:Ba,getPrototypeOf:Ia}=Object,Se=globalThis,Li=Se.trustedTypes,Fa=Li?Li.emptyScript:"",Ua=Se.reactiveElementPolyfillSupport,It=(e,t)=>e,we={toAttribute(e,t){switch(t){case Boolean:e=e?Fa:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},ei=(e,t)=>!La(e,t),Ti={attribute:!0,type:String,converter:we,reflect:!1,useDefault:!1,hasChanged:ei};Symbol.metadata??=Symbol("metadata"),Se.litPropertyMetadata??=new WeakMap;let Et=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Ti){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(t,n,i);s!==void 0&&Ta(this.prototype,t,s)}}static getPropertyDescriptor(t,i,n){const{get:s,set:r}=Da(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:s,set(o){const a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ti}static _$Ei(){if(this.hasOwnProperty(It("elementProperties")))return;const t=Ia(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(It("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(It("properties"))){const i=this.properties,n=[...Oa(i),...Ba(i)];for(const s of n)this.createProperty(s,i[s])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[n,s]of i)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[i,n]of this.elementProperties){const s=this._$Eu(i,n);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const s of n)i.unshift(Ri(s))}else t!==void 0&&i.push(Ri(t));return i}static _$Eu(t,i){const n=i.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const n of i.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ra(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,n){this._$AK(t,n)}_$ET(t,i){const n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:we).toAttribute(i,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,i){const n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:we;this._$Em=s;const a=o.fromAttribute(i,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,i,n){if(t!==void 0){const s=this.constructor,r=this[t];if(n??=s.getPropertyOptions(t),!((n.hasChanged??ei)(r,i)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,i,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??i??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(i=void 0),this._$AL.set(t,i)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach((n=>n.hostUpdate?.())),this.update(i)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach((i=>i.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};Et.elementStyles=[],Et.shadowRootOptions={mode:"open"},Et[It("elementProperties")]=new Map,Et[It("finalized")]=new Map,Ua?.({ReactiveElement:Et}),(Se.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ii=globalThis,ve=ii.trustedTypes,Di=ve?ve.createPolicy("lit-html",{createHTML:e=>e}):void 0,_n="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,zn="?"+pt,Xa=`<${zn}>`,xt=document,Yt=()=>xt.createComment(""),Wt=e=>e===null||typeof e!="object"&&typeof e!="function",ni=Array.isArray,Ya=e=>ni(e)||typeof e?.[Symbol.iterator]=="function",Pe=`[ 	
\f\r]`,Lt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Oi=/-->/g,Bi=/>/g,gt=RegExp(`>|${Pe}(?:([^\\s"'>=/]+)(${Pe}*=${Pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ii=/'/g,Fi=/"/g,En=/^(?:script|style|textarea|title)$/i,Sn=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),C=Sn(1),G=Sn(2),$t=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),Ui=new WeakMap,yt=xt.createTreeWalker(xt,129);function kn(e,t){if(!ni(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Di!==void 0?Di.createHTML(t):t}const Wa=(e,t)=>{const i=e.length-1,n=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=Lt;for(let a=0;a<i;a++){const l=e[a];let h,d,c=-1,u=0;for(;u<l.length&&(o.lastIndex=u,d=o.exec(l),d!==null);)u=o.lastIndex,o===Lt?d[1]==="!--"?o=Oi:d[1]!==void 0?o=Bi:d[2]!==void 0?(En.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=gt):d[3]!==void 0&&(o=gt):o===gt?d[0]===">"?(o=s??Lt,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,h=d[1],o=d[3]===void 0?gt:d[3]==='"'?Fi:Ii):o===Fi||o===Ii?o=gt:o===Oi||o===Bi?o=Lt:(o=gt,s=void 0);const p=o===gt&&e[a+1].startsWith("/>")?" ":"";r+=o===Lt?l+Xa:c>=0?(n.push(h),l.slice(0,c)+_n+l.slice(c)+pt+p):l+pt+(c===-2?a:p)}return[kn(e,r+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]};class Zt{constructor({strings:t,_$litType$:i},n){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[h,d]=Wa(t,i);if(this.el=Zt.createElement(h,n),yt.currentNode=this.el.content,i===2||i===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=yt.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(_n)){const u=d[o++],p=s.getAttribute(c).split(pt),m=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:m[2],strings:p,ctor:m[1]==="."?qa:m[1]==="?"?Va:m[1]==="@"?ja:ke}),s.removeAttribute(c)}else c.startsWith(pt)&&(l.push({type:6,index:r}),s.removeAttribute(c));if(En.test(s.tagName)){const c=s.textContent.split(pt),u=c.length-1;if(u>0){s.textContent=ve?ve.emptyScript:"";for(let p=0;p<u;p++)s.append(c[p],Yt()),yt.nextNode(),l.push({type:2,index:++r});s.append(c[u],Yt())}}}else if(s.nodeType===8)if(s.data===zn)l.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(pt,c+1))!==-1;)l.push({type:7,index:r}),c+=pt.length-1}r++}}static createElement(t,i){const n=xt.createElement("template");return n.innerHTML=t,n}}function Mt(e,t,i=e,n){if(t===$t)return t;let s=n!==void 0?i._$Co?.[n]:i._$Cl;const r=Wt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,i,n)),n!==void 0?(i._$Co??=[])[n]=s:i._$Cl=s),s!==void 0&&(t=Mt(e,s._$AS(e,t.values),s,n)),t}class Za{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:n}=this._$AD,s=(t?.creationScope??xt).importNode(i,!0);yt.currentNode=s;let r=yt.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new Gt(r,r.nextSibling,this,t):l.type===1?h=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(h=new Ga(r,this,t)),this._$AV.push(h),l=n[++a]}o!==l?.index&&(r=yt.nextNode(),o++)}return yt.currentNode=xt,s}p(t){let i=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,i),i+=n.strings.length-2):n._$AI(t[i])),i++}}class Gt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,n,s){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Mt(this,t,i),Wt(t)?t===D||t==null||t===""?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==$t&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ya(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==D&&Wt(this._$AH)?this._$AA.nextSibling.data=t:this.T(xt.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Zt.createElement(kn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(i);else{const r=new Za(s,this),o=r.u(this.options);r.p(i),this.T(o),this._$AH=r}}_$AC(t){let i=Ui.get(t.strings);return i===void 0&&Ui.set(t.strings,i=new Zt(t)),i}k(t){ni(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const r of t)s===i.length?i.push(n=new Gt(this.O(Yt()),this.O(Yt()),this,this.options)):n=i[s],n._$AI(r),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ke{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,n,s,r){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=D}_$AI(t,i=this,n,s){const r=this.strings;let o=!1;if(r===void 0)t=Mt(this,t,i,0),o=!Wt(t)||t!==this._$AH&&t!==$t,o&&(this._$AH=t);else{const a=t;let l,h;for(t=r[0],l=0;l<r.length-1;l++)h=Mt(this,a[n+l],i,l),h===$t&&(h=this._$AH[l]),o||=!Wt(h)||h!==this._$AH[l],h===D?t=D:t!==D&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}o&&!s&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class qa extends ke{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}class Va extends ke{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==D)}}class ja extends ke{constructor(t,i,n,s,r){super(t,i,n,s,r),this.type=5}_$AI(t,i=this){if((t=Mt(this,t,i,0)??D)===$t)return;const n=this._$AH,s=t===D&&n!==D||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==D&&(n===D||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ga{constructor(t,i,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Mt(this,t)}}const Ka=ii.litHtmlPolyfillSupport;Ka?.(Zt,Gt),(ii.litHtmlVersions??=[]).push("3.3.1");const Nn=(e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(s===void 0){const r=i?.renderBefore??null;n._$litPart$=s=new Gt(t.insertBefore(Yt(),r),r,void 0,i??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const si=globalThis;let B=class extends Et{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nn(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}};B._$litElement$=!0,B.finalized=!0,si.litElementHydrateSupport?.({LitElement:B});const Qa=si.litElementPolyfillSupport;Qa?.({LitElement:B});(si.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cn=Symbol.for(""),Ja=e=>{if(e?.r===Cn)return e?._$litStatic$},se=e=>({_$litStatic$:e,r:Cn}),Xi=new Map,tl=e=>(t,...i)=>{const n=i.length;let s,r;const o=[],a=[];let l,h=0,d=!1;for(;h<n;){for(l=t[h];h<n&&(r=i[h],(s=Ja(r))!==void 0);)l+=s+t[++h],d=!0;h!==n&&a.push(r),o.push(l),h++}if(h===n&&o.push(t[n]),d){const c=o.join("$$lit$$");(t=Xi.get(c))===void 0&&(o.raw=o,Xi.set(c,t=o)),i=a}return e(t,...i)},U=tl(C);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=e=>(t,i)=>{i!==void 0?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const el={attribute:!0,type:String,converter:we,reflect:!1,hasChanged:ei},il=(e=el,t,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),n==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),n==="accessor"){const{name:o}=i;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,e)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(n==="setter"){const{name:o}=i;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,e)}}throw Error("Unsupported decorator location: "+n)};function w(e){return(t,i)=>typeof i=="object"?il(e,t,i):((n,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nl={ATTRIBUTE:1},sl=e=>(...t)=>({_$litDirective$:e,values:t});let rl=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,n){this._$Ct=t,this._$AM=i,this._$Ci=n}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mn="important",ol=" !"+Mn,al=sl(class extends rl{constructor(e){if(super(e),e.type!==nl.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const n=e[i];return n==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`}),"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in t){const s=t[n];if(s!=null){this.ft.add(n);const r=typeof s=="string"&&s.endsWith(ol);n.includes("-")||r?i.setProperty(n,r?s.slice(0,-11):s,r?Mn:""):i[n]=s}}return $t}});function ll(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function hl(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function be(e){return ya(e)}function Ye(e){return $a(e)}function Hn(e){return wa(e)}function dl(e,t){return e.x>=t.x&&e.x<=t.x+t.width&&e.y>=t.y&&e.y<=t.y+t.height}var cl=Object.defineProperty,ul=Object.getOwnPropertyDescriptor,_t=(e,t,i,n)=>{for(var s=n>1?void 0:n?ul(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&cl(t,i,s),s};exports.FlowCanvas=class extends B{constructor(){super(),this.nodes=[],this.edges=[],this.viewport={x:0,y:0,zoom:1},this.nodeTypes={default:"flow-node",shape:"shape-node","erd-table":"erd-table-node"},this.connection=null,this.isHoveringNode=!1,this.onHandleStart=t=>{const{nodeId:i,type:n,handleId:s}=t.detail;this.connection={from:{nodeId:i,handleId:s}},this.onConnectStart&&this.onConnectStart({nodeId:i,handleId:s,handleType:n})},this.onMouseMove=t=>{if(!this.connection)return;const i=this.screenToCanvas(t.clientX,t.clientY);this.connection.preview=i,this.requestUpdate()},this.onMouseUp=t=>{if(!this.connection)return;const i=t.composedPath();let n=null,s;for(const u of i)if(u instanceof HTMLElement){const p=u.tagName.toLowerCase();if(p==="flow-node"||Object.values(this.nodeTypes).some(m=>m===p)){n=u;break}u.dataset.handleId&&(s=u.dataset.handleId)}const r=n?.getAttribute("id")||void 0,o=!!this.connection?.from;let a,l,h,d,c;if(this.connection.from&&r&&r!==this.connection.from.nodeId){const u=`e-${this.connection.from.nodeId}-${r}-${Date.now()}`;if(a=this.connection.from.nodeId,l=this.connection.from.handleId,d=s,!d){const p=this.nodes.find(m=>m.id===r);p&&p.type==="shape"&&(d=this.determineBestTargetHandle(a,r))}h=r,this.instance.addEdge({id:u,source:a,target:r,sourceHandle:l,targetHandle:d,data:{}})}else this.connection?.from&&(a=this.connection.from.nodeId,l=this.connection.from.handleId,this.connection.preview&&(c=this.connection.preview));this.onConnectEnd&&this.onConnectEnd({connectionStarted:o,sourceNodeId:a,sourceHandleId:l,targetNodeId:h,targetHandleId:d,position:c}),this.connection=null,this.requestUpdate()},this.onNodeMouseEnter=t=>{const i=t.target,n=["flow-node",...Object.values(this.nodeTypes)];let s=null;for(const r of n){const o=i.closest(r);if(o&&o.id&&this.nodes.some(a=>a.id===o.id)){s=o;break}}s&&!this.isHoveringNode&&(this.isHoveringNode=!0,this.instance.setPanOnDrag(!1))},this.onNodeMouseLeave=t=>{const i=t.target,n=["flow-node",...Object.values(this.nodeTypes)];let s=null;for(const r of n){const o=i.closest(r);if(o&&o.id&&this.nodes.some(a=>a.id===o.id)){s=o;break}}s&&this.isHoveringNode&&setTimeout(()=>{const r=document.elementFromPoint(t.clientX,t.clientY);(!r||!(r instanceof HTMLElement)||!this.isElementNode(r))&&(this.isHoveringNode=!1,this.instance.setPanOnDrag(!0))},10)},this.onNodeSelect=t=>{const{nodeId:i,selected:n,node:s}=t.detail;this.instance.updateNode(i,{selected:n}),this.dispatchEvent(new CustomEvent("node-selected",{detail:{nodeId:i,selected:n,node:s,allSelectedNodes:this.nodes.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.onEdgeSelect=t=>{const{edgeId:i,selected:n,edge:s}=t.detail;this.instance.updateEdge(i,{selected:n}),this.dispatchEvent(new CustomEvent("edge-selected",{detail:{edgeId:i,selected:n,edge:s,allSelectedEdges:this.edges.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.instance=new xn({nodes:this.nodes,edges:this.edges})}createRenderRoot(){return super.createRenderRoot()}getNodeGeom(t){const i=this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`),n=this.renderRoot.querySelector(".flow-viewport");if(!i||!n)return null;const s=i.getBoundingClientRect(),r=n.getBoundingClientRect(),o=this.viewport.zoom||1,a=(s.left-r.left-this.viewport.x)/o,l=(s.top-r.top-this.viewport.y)/o,h=s.width/o,d=s.height/o,c=l+d/2;return{left:{x:a,y:c},right:{x:a+h,y:c}}}getHandleCanvasPosition(t,i){const n=this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);if(!n)return null;let s=null;const r=n.shadowRoot;if(r&&(s=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),s||(s=n.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),!s)return null;const o=this.nodes.find(u=>u.id===t);if(!o)return null;if(o.type==="shape")return this.getShapeHandlePosition(o,i);const a=n.getBoundingClientRect(),l=s.getBoundingClientRect(),h=this.viewport.zoom||1,d=(l.left+l.width/2-a.left)/h,c=(l.top+l.height/2-a.top)/h;return{x:o.position.x+d,y:o.position.y+c}}getShapeHandlePosition(t,i){const n=t.data;if(!n)return null;const s=n.size||{width:200,height:200},r=s.width,o=s.height,a=i.split("-"),l=a[a.length-1];let h=0,d=0;switch(l){case"right":h=r,d=o/2;break;case"left":h=0,d=o/2;break;case"top":h=r/2,d=0;break;case"bottom":h=r/2,d=o;break;default:h=r/2,d=o/2}return{x:t.position.x+h,y:t.position.y+d}}setNodes(t){this.instance.setNodes(t)}setEdges(t){this.instance.setEdges(t)}determineBestTargetHandle(t,i){const n=this.nodes.find(k=>k.id===t),s=this.nodes.find(k=>k.id===i);if(!n||!s)return`${i}-target-left`;const r=n.position.x,o=n.position.y,a=s.position.x,l=s.position.y,h=s.data,d=h?.size?.width||200,c=h?.size?.height||200,u=r+(n.width||150)/2,p=o+(n.height||50)/2,m=a+d/2,x=l+c/2,S=m-u,v=x-p;return Math.abs(S)>Math.abs(v)?S>0?`${i}-target-left`:`${i}-target-right`:v>0?`${i}-target-top`:`${i}-target-bottom`}computeLabelCanvasPosition(t){const i=this.nodes.find(d=>d.id===t.source),n=this.nodes.find(d=>d.id===t.target);if(!i||!n)return null;let s,r,o,a;if(t.sourceHandle){const d=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(d)s=d.x,r=d.y;else{const c=i.measured?.width||i.width||150,u=i.measured?.height||i.height||50;s=i.position.x+c,r=i.position.y+u/2}}else{const d=i.measured?.width||i.width||150,c=i.measured?.height||i.height||50;s=i.position.x+d,r=i.position.y+c/2}if(t.targetHandle){const d=this.getHandleCanvasPosition(t.target,t.targetHandle);if(d)o=d.x,a=d.y;else{o=n.position.x;const c=n.measured?.height||n.height||50;a=n.position.y+c/2}}else{o=n.position.x;const d=n.measured?.height||n.height||50;a=n.position.y+d/2}const[,l,h]=be({sourceX:s,sourceY:r,sourcePosition:exports.Position.Right,targetX:o,targetY:a,targetPosition:exports.Position.Left});return{x:l,y:h}}computeStartLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.source);if(!i)return null;let n,s;if(t.sourceHandle){const r=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.width||i.width||150,a=i.measured?.height||i.height||50;n=i.position.x+o,s=i.position.y+a/2}}else{const r=i.measured?.width||i.width||150,o=i.measured?.height||i.height||50;n=i.position.x+r,s=i.position.y+o/2}return{x:n+12,y:s-10}}computeEndLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.target);if(!i)return null;let n,s;if(t.targetHandle){const r=this.getHandleCanvasPosition(t.target,t.targetHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+o/2}}else{const r=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+r/2}return{x:n-12,y:s-10}}firstUpdated(){const t=this.renderRoot.querySelector(".flow-container");t&&(this.instance.mount(t),this.unsubscribe=this.instance.subscribe(i=>{this.nodes=i.nodes,this.edges=i.edges,this.viewport=i.viewport,this.requestUpdate()}),t.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("node-select",this.onNodeSelect),document.addEventListener("edge-select",this.onEdgeSelect),t.addEventListener("mouseenter",this.onNodeMouseEnter,!0),t.addEventListener("mouseleave",this.onNodeMouseLeave,!0),requestAnimationFrame(()=>{const i=new CustomEvent("flow-ready",{bubbles:!0,composed:!0,cancelable:!1,detail:{instance:this.instance}});this.dispatchEvent(i)}))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.instance.destroy();const t=this.renderRoot.querySelector(".flow-container");t?.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),t?.removeEventListener("node-select",this.onNodeSelect),document.removeEventListener("edge-select",this.onEdgeSelect),t?.removeEventListener("mouseenter",this.onNodeMouseEnter,!0),t?.removeEventListener("mouseleave",this.onNodeMouseLeave,!0)}renderNode(t){const i=t.type||"default",n=this.nodeTypes[i]||"flow-node",s=se(n);return U`
      <${s}
        .id=${t.id}
        .data=${t.data}
        .position=${t.position}
        .selected=${t.selected||!1}
        .draggable=${t.draggable!==!1}
        .connectable=${t.connectable!==!1}
        .resizable=${t.resizable||!1}
        .drag_handle_selector=${t.drag_handle_selector||null}
        .width=${t.width}
        .height=${t.height}
        .instance=${this.instance}
        @handle-start=${this.onHandleStart}
      ></${s}>
    `}render(){const t=`translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;return U`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${al({transform:t})}
        >
          <div class="flow-edges-layer">
            ${this.edges.map(i=>{const n=this.nodes.find(r=>r.id===i.source),s=this.nodes.find(r=>r.id===i.target);return!n||!s?null:U`
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
            ${this.edges.map(i=>{const n=i.data&&i.data.labelWidget,s=i.data&&i.data.labelData,r=i.data&&i.data.labelHtml,o=i.data&&i.data.label;if(!(!!n||!!r||!!o))return null;const l=this.computeLabelCanvasPosition(i);if(!l)return null;const h=`transform: translate(-50%, -50%) translate(${l.x}px, ${l.y}px);`;if(n){const d=se(n);return U`<div class="edge-label" style="${h}"><${d} .data=${s}></${d}></div>`}return r?U`<div class="edge-label" style="${h}" .innerHTML=${r}></div>`:U`<div class="edge-label" style="${h}">${o}</div>`})}
            ${this.edges.map(i=>{const n=i.data&&i.data.startLabelWidget,s=i.data&&i.data.startLabelData,r=i.data&&i.data.startLabelHtml,o=i.data&&i.data.startLabel;if(!n&&!r&&!o)return null;const a=this.computeStartLabelCanvasPosition(i);if(!a)return null;const l=`transform: translate(-50%, -50%) translate(${a.x}px, ${a.y}px);`;if(n){const h=se(n);return U`<div class="edge-label" style="${l}"><${h} .data=${s}></${h}></div>`}return r?U`<div class="edge-label" style="${l}" .innerHTML=${r}></div>`:U`<div class="edge-label" style="${l}">${o}</div>`})}
            ${this.edges.map(i=>{const n=i.data&&i.data.endLabelWidget,s=i.data&&i.data.endLabelData,r=i.data&&i.data.endLabelHtml,o=i.data&&i.data.endLabel;if(!n&&!r&&!o)return null;const a=this.computeEndLabelCanvasPosition(i);if(!a)return null;const l=`transform: translate(-50%, -50%) translate(${a.x}px, ${a.y}px);`;if(n){const h=se(n);return U`<div class="edge-label" style="${l}"><${h} .data=${s}></${h}></div>`}return r?U`<div class="edge-label" style="${l}" .innerHTML=${r}></div>`:U`<div class="edge-label" style="${l}">${o}</div>`})}
          </div>
        </div>
        <slot></slot>
      </div>
    `}screenToCanvas(t,i){const n=this.renderRoot.querySelector(".flow-container");if(!n)return{x:t,y:i};const s=n.getBoundingClientRect(),r=this.viewport.x,o=this.viewport.y,a=this.viewport.zoom||1;return{x:(t-s.left-r)/a,y:(i-s.top-o)/a}}isElementNode(t){if(!t)return!1;const i=["flow-node",...Object.values(this.nodeTypes)];for(const n of i){const s=t.closest(n);if(s&&s.id)return this.nodes.some(r=>r.id===s.id)}return!1}renderPreviewEdge(){if(!this.connection||!this.connection.preview)return null;const t=this.connection.preview,i=this.connection.from?this.nodes.find(s=>s.id===this.connection.from.nodeId):null,n=this.connection.to?this.nodes.find(s=>s.id===this.connection.to.nodeId):null;return i?U`
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
      `:n?U`
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
      `:null}};exports.FlowCanvas.styles=I`
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
  `;_t([w({type:Array})],exports.FlowCanvas.prototype,"nodes",2);_t([w({type:Array})],exports.FlowCanvas.prototype,"edges",2);_t([w({type:Object})],exports.FlowCanvas.prototype,"viewport",2);_t([w({type:Object})],exports.FlowCanvas.prototype,"onConnectStart",2);_t([w({type:Object})],exports.FlowCanvas.prototype,"onConnectEnd",2);_t([w({type:Object})],exports.FlowCanvas.prototype,"nodeTypes",2);exports.FlowCanvas=_t([Y("flow-canvas")],exports.FlowCanvas);var fl=Object.defineProperty,pl=Object.getOwnPropertyDescriptor,zt=(e,t,i,n)=>{for(var s=n>1?void 0:n?pl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&fl(t,i,s),s};exports.NodeResizer=class extends B{constructor(){super(...arguments),this.visible=!1,this.minWidth=10,this.minHeight=10,this.maxWidth=Number.MAX_VALUE,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleMouseDown=t=>{const i=t.target;let n=i.classList.contains("resize-handle");if(!n&&i===this&&(n=t.composedPath().some(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))),!n)return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.isResizing=!0;const s=this.getRootNode().host;this.resizeStart={x:t.clientX,y:t.clientY,width:s?.offsetWidth||0,height:s?.offsetHeight||0};let r=null;if(i.classList.contains("resize-handle")?r=i:i===this&&(r=t.composedPath().find(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))||null),r){const o=Array.from(r.classList);this.resizeHandle=o.find(a=>a!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleMouseMove=t=>{if(!this.isResizing)return;const i=this.getRootNode().host;if(!i)return;const n=t.clientX-this.resizeStart.x,s=t.clientY-this.resizeStart.y;let r=this.resizeStart.width,o=this.resizeStart.height;switch(this.resizeHandle){case"nw":r=this.resizeStart.width-n,o=this.resizeStart.height-s;break;case"ne":r=this.resizeStart.width+n,o=this.resizeStart.height-s;break;case"sw":r=this.resizeStart.width-n,o=this.resizeStart.height+s;break;case"se":r=this.resizeStart.width+n,o=this.resizeStart.height+s;break;case"n":o=this.resizeStart.height-s;break;case"s":o=this.resizeStart.height+s;break;case"w":r=this.resizeStart.width-n;break;case"e":r=this.resizeStart.width+n;break}if(r=Math.max(this.minWidth,Math.min(this.maxWidth,r)),o=Math.max(this.minHeight,Math.min(this.maxHeight,o)),this.keepAspectRatio){const a=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?o=r/a:r=o*a}i.style.width=`${r}px`,i.style.height=`${o}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:r,height:o,handle:this.resizeHandle},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{if(!this.isResizing)return;this.isResizing=!1,this.cleanup();const t=this.getRootNode().host;this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:t?.offsetWidth||0,height:t?.offsetHeight||0},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return this.visible?C`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    `:C``}};exports.NodeResizer.styles=I`
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
  `;zt([w({type:Boolean,reflect:!0})],exports.NodeResizer.prototype,"visible",2);zt([w({type:Number})],exports.NodeResizer.prototype,"minWidth",2);zt([w({type:Number})],exports.NodeResizer.prototype,"minHeight",2);zt([w({type:Number})],exports.NodeResizer.prototype,"maxWidth",2);zt([w({type:Number})],exports.NodeResizer.prototype,"maxHeight",2);zt([w({type:Boolean})],exports.NodeResizer.prototype,"keepAspectRatio",2);exports.NodeResizer=zt([Y("node-resizer")],exports.NodeResizer);var gl=Object.defineProperty,ml=Object.getOwnPropertyDescriptor,dt=(e,t,i,n)=>{for(var s=n>1?void 0:n?ml(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&gl(t,i,s),s};exports.FlowNode=class extends B{constructor(){super(...arguments),this.id="",this.data={},this.position={x:0,y:0},this.selected=!1,this.dragging=!1,this.draggable=!0,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.lastMeasured=null,this.handleWheel=t=>{const i=t.composedPath();let n=null;for(const s of i)if(s instanceof Element&&(n=this.findScrollableElement(s),n))break;if(n){const s=t.deltaY<0&&n.scrollTop>0||t.deltaY>0&&n.scrollTop<n.scrollHeight-n.clientHeight,r=t.deltaX<0&&n.scrollLeft>0||t.deltaX>0&&n.scrollLeft<n.scrollWidth-n.clientWidth;(s||r)&&t.stopPropagation()}},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}})},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}}),this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1},50)}}firstUpdated(){this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.addEventListener("wheel",this.handleWheel,{passive:!1}),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd)),this.updateMeasuredSize()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.removeEventListener("wheel",this.handleWheel),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}findScrollableElement(t){if(!t||!(t instanceof HTMLElement))return null;if(t.classList.contains("nowheel"))return t;const i=window.getComputedStyle(t),n=i.overflow+i.overflowX+i.overflowY;if((n.includes("auto")||n.includes("scroll"))&&(t.scrollHeight>t.clientHeight||t.scrollWidth>t.clientWidth))return t;const s=t.parentElement;return s&&(s===this||s.closest("flow-node")===this||this.shadowRoot?.contains(s))?this.findScrollableElement(s):null}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return C`
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
    `}updated(t){super.updated(t),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,this.updateMeasuredSize(),t.has("resizable")}updateMeasuredSize(){if(!this.instance)return;const t=this.getBoundingClientRect(),i=this.instance.getViewport().zoom||1,n=t.width/i,s=t.height/i;(!this.lastMeasured||Math.abs(this.lastMeasured.width-n)>.5||Math.abs(this.lastMeasured.height-s)>.5)&&(this.lastMeasured={width:n,height:s},this.instance.updateNode(this.id,{measured:{width:n,height:s},width:n,height:s}))}onHandleMouseDown(t){return i=>{i.stopPropagation(),i.preventDefault(),this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:t},bubbles:!0,composed:!0}))}}};exports.FlowNode.styles=I`
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
  `;dt([w({type:String,reflect:!0})],exports.FlowNode.prototype,"id",2);dt([w({type:Object})],exports.FlowNode.prototype,"data",2);dt([w({type:Object})],exports.FlowNode.prototype,"position",2);dt([w({type:Boolean,reflect:!0})],exports.FlowNode.prototype,"selected",2);dt([w({type:Boolean,reflect:!0})],exports.FlowNode.prototype,"dragging",2);dt([w({type:Boolean})],exports.FlowNode.prototype,"draggable",2);dt([w({type:Object})],exports.FlowNode.prototype,"instance",2);dt([w({type:Boolean})],exports.FlowNode.prototype,"resizable",2);exports.FlowNode=dt([Y("flow-node")],exports.FlowNode);var yl=Object.defineProperty,wl=Object.getOwnPropertyDescriptor,W=(e,t,i,n)=>{for(var s=n>1?void 0:n?wl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&yl(t,i,s),s};exports.FlowEdge=class extends B{constructor(){super(...arguments),this.id="",this.source="",this.target="",this.animated=!1,this.selected=!1,this.label="",this.type="default",this.markerHandleHalf=5}getMarkerId(t){if(!t)return;if(typeof t=="string")return t;const i=this.normalizeMarkerSpec(t);return`marker-${this.hashString(i)}`}createMarkerSVG(t,i){if(i.type==="custom"){const d=i.width??10,c=i.height??10,u=(i.refX??d)+this.markerHandleHalf,p=i.refY??c/2,m=i.color??"currentColor",x=i.orient??"auto";return`<marker id="${t}" markerWidth="${d}" markerHeight="${c}" refX="${u}" refY="${p}" orient="${x}" markerUnits="userSpaceOnUse"><path d="${i.path}" fill="${m}" stroke="${m}"/></marker>`}const n=i.width??10,s=i.height??10,r=i.orient??"auto",o=i.color??"currentColor",a=(i.type==="ArrowClosed",n+this.markerHandleHalf),l=s/2;if(i.type==="ArrowClosed"){const d=`M0,0 L${n},${l} L0,${s} Z`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${d}" fill="${o}"/></marker>`}const h=`M0,0 L${n},${l} L0,${s}`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${h}" fill="none" stroke="${o}" stroke-width="2"/></marker>`}normalizeMarkerSpec(t){if(t.type==="custom"){const{path:o,width:a=20,height:l=20,refX:h=20,refY:d=10,orient:c="auto",color:u="currentColor"}=t;return`custom|p=${o}|w=${a}|h=${l}|rx=${h}|ry=${d}|o=${c}|c=${u}`}const{width:i=20,height:n=20,orient:s="auto",color:r="currentColor"}=t;return`builtin|${t.type}|w=${i}|h=${n}|o=${s}|c=${r}`}hashString(t){let i=0;for(let n=0;n<t.length;n++)i=(i<<5)-i+t.charCodeAt(n),i|=0;return Math.abs(i).toString(36)}getPathForType(t,i){const n=t.x,s=t.y,r=i.x,o=i.y,a=t.position,l=i.position;switch(this.type){case"straight":return Hn({sourceX:n,sourceY:s,targetX:r,targetY:o});case"smoothstep":return Ye({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l});case"step":return Ye({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,borderRadius:0});case"simplebezier":return be({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,curvature:.5});case"default":default:return be({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l})}}getFlowCanvasRoot(){const t=this.getRootNode();return t instanceof ShadowRoot?t:null}getFlowCanvasHost(){const t=this.getFlowCanvasRoot();return t&&t.host||null}findHandleElement(t,i){const n=this.getFlowCanvasRoot();if(!n)return null;const s=n.querySelector(`[id="${CSS.escape(t)}"]`);if(!s)return null;const r=s.shadowRoot;let o=null;return r&&(o=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o||(o=s.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o}getHandlePosition(t,i){const n=this.findHandleElement(t,i);if(!n)return null;const s=this.getFlowCanvasRoot();if(!s)return null;const r=s.querySelector(`[id="${CSS.escape(t)}"]`);if(!r)return null;const o=r.getBoundingClientRect(),a=n.getBoundingClientRect(),l=this.sourceNode?.id===t?this.sourceNode:this.targetNode;if(!l)return null;l.measured?.width||l.width,l.measured?.height||l.height;const c=(this.getFlowCanvasHost()?.viewport||{zoom:1}).zoom||1,u=(a.left+a.width/2-o.left)/c,p=(a.top+a.height/2-o.top)/c;return{x:l.position.x+u,y:l.position.y+p}}getSourcePosition(){if(this.sourceHandle&&this.sourceNode){const n=this.getHandlePosition(this.sourceNode.id,this.sourceHandle);if(n)return{...n,position:exports.Position.Right}}const t=this.sourceNode.measured?.width||this.sourceNode.width||150,i=this.sourceNode.measured?.height||this.sourceNode.height||50;return{x:this.sourceNode.position.x+t,y:this.sourceNode.position.y+i/2,position:exports.Position.Right}}getTargetPosition(){if(this.targetHandle&&this.targetNode){const i=this.getHandlePosition(this.targetNode.id,this.targetHandle);if(i)return{...i,position:exports.Position.Left}}const t=this.targetNode.measured?.height||this.targetNode.height||50;return{x:this.targetNode.position.x,y:this.targetNode.position.y+t/2,position:exports.Position.Left}}render(){if(!this.sourceNode||!this.targetNode)return C``;const t=this.getSourcePosition(),i=this.getTargetPosition(),[n,s,r,o,a]=this.getPathForType(t,i),l=["edge-path",this.animated&&"animated",this.selected&&"selected"].filter(Boolean).join(" "),h=this.getMarkerId(this.markerStart),d=this.getMarkerId(this.markerEnd),c=h?`url(#${h})`:void 0,u=d?`url(#${d})`:void 0,p=this.animated?"5":"";return C`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${h&&typeof this.markerStart=="object"?G`<marker id="${h}" markerWidth="${this.markerStart.width||10}" markerHeight="${this.markerStart.height||10}" refX="${((this.markerStart.type==="custom"?this.markerStart.refX:void 0)||this.markerStart.width||10)+this.markerHandleHalf}" refY="${(this.markerStart.type==="custom"?this.markerStart.refY:void 0)||(this.markerStart.height||10)/2}" orient="${this.markerStart.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type==="custom"?G`<path d="${this.markerStart.path}" fill="${this.markerStart.color||"currentColor"}" stroke="${this.markerStart.color||"currentColor"}"/>`:this.markerStart.type==="ArrowClosed"?G`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10} Z" fill="${this.markerStart.color||"currentColor"}"/>`:G`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10}" fill="none" stroke="${this.markerStart.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
          ${d&&typeof this.markerEnd=="object"?G`<marker id="${d}" markerWidth="${this.markerEnd.width||10}" markerHeight="${this.markerEnd.height||10}" refX="${((this.markerEnd.type==="custom"?this.markerEnd.refX:void 0)||this.markerEnd.width||10)+this.markerHandleHalf}" refY="${(this.markerEnd.type==="custom"?this.markerEnd.refY:void 0)||(this.markerEnd.height||10)/2}" orient="${this.markerEnd.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type==="custom"?G`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color||"currentColor"}" stroke="${this.markerEnd.color||"currentColor"}"/>`:this.markerEnd.type==="ArrowClosed"?G`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10} Z" fill="${this.markerEnd.color||"currentColor"}"/>`:G`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10}" fill="none" stroke="${this.markerEnd.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
        </defs>
        ${G`
          <path 
            class="${l}"
            d="${n}"
            stroke-dasharray="${p}"
            marker-start="${c??""}"
            marker-end="${u??""}"
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
    `}handleClick(t){t.stopPropagation();const i=!this.selected;this.selected=i,this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:this.id,selected:i,edge:{id:this.id,source:this.source,target:this.target,sourceHandle:this.sourceHandle,targetHandle:this.targetHandle,label:this.label,animated:this.animated,selected:i}},bubbles:!0,composed:!0}))}};exports.FlowEdge.styles=I`
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
  `;W([w({type:String})],exports.FlowEdge.prototype,"id",2);W([w({type:String})],exports.FlowEdge.prototype,"source",2);W([w({type:String})],exports.FlowEdge.prototype,"target",2);W([w({type:String})],exports.FlowEdge.prototype,"sourceHandle",2);W([w({type:String})],exports.FlowEdge.prototype,"targetHandle",2);W([w({type:Object})],exports.FlowEdge.prototype,"sourceNode",2);W([w({type:Object})],exports.FlowEdge.prototype,"targetNode",2);W([w({type:Boolean})],exports.FlowEdge.prototype,"animated",2);W([w({type:Boolean})],exports.FlowEdge.prototype,"selected",2);W([w({type:String})],exports.FlowEdge.prototype,"label",2);W([w({type:String})],exports.FlowEdge.prototype,"type",2);W([w({type:Object})],exports.FlowEdge.prototype,"markerStart",2);W([w({type:Object})],exports.FlowEdge.prototype,"markerEnd",2);exports.FlowEdge=W([Y("flow-edge")],exports.FlowEdge);var vl=Object.defineProperty,bl=Object.getOwnPropertyDescriptor,Kt=(e,t,i,n)=>{for(var s=n>1?void 0:n?bl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&vl(t,i,s),s};exports.FlowBackground=class extends B{constructor(){super(...arguments),this.variant="dots",this.gap=20,this.color="#ddd",this.size=1}render(){const t=`flow-bg-pattern-${Math.random().toString(36).substr(2,9)}`;return C`
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
    `}};exports.FlowBackground.styles=I`
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
  `;Kt([w({type:String})],exports.FlowBackground.prototype,"variant",2);Kt([w({type:Number})],exports.FlowBackground.prototype,"gap",2);Kt([w({type:String})],exports.FlowBackground.prototype,"color",2);Kt([w({type:Number})],exports.FlowBackground.prototype,"size",2);exports.FlowBackground=Kt([Y("flow-background")],exports.FlowBackground);var xl=Object.defineProperty,$l=Object.getOwnPropertyDescriptor,ri=(e,t,i,n)=>{for(var s=n>1?void 0:n?$l(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&xl(t,i,s),s};exports.FlowMinimap=class extends B{constructor(){super(...arguments),this.width=200,this.height=150}render(){return C`
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `}};exports.FlowMinimap.styles=I`
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
  `;ri([w({type:Number})],exports.FlowMinimap.prototype,"width",2);ri([w({type:Number})],exports.FlowMinimap.prototype,"height",2);exports.FlowMinimap=ri([Y("flow-minimap")],exports.FlowMinimap);var _l=Object.defineProperty,zl=Object.getOwnPropertyDescriptor,An=(e,t,i,n)=>{for(var s=n>1?void 0:n?zl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&_l(t,i,s),s};exports.FlowControls=class extends B{constructor(){super(...arguments),this.handleZoomIn=()=>{this.instance?.zoomIn()},this.handleZoomOut=()=>{this.instance?.zoomOut()},this.handleFitView=()=>{this.instance?.fitView()}}render(){return C`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `}};exports.FlowControls.styles=I`
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
  `;An([w({type:Object})],exports.FlowControls.prototype,"instance",2);exports.FlowControls=An([Y("flow-controls")],exports.FlowControls);var El=Object.getOwnPropertyDescriptor,Sl=Object.getPrototypeOf,kl=Reflect.get,Nl=(e,t,i,n)=>{for(var s=n>1?void 0:n?El(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s},Re=(e,t,i)=>kl(Sl(e),i,t);exports.ERDTableNode=class extends exports.FlowNode{constructor(){super(...arguments),this.appliedInitialSize=!1}firstUpdated(){const t=this.data,i=t?.size?.width,n=t?.size?.height;(typeof i=="number"&&i>0||typeof n=="number"&&n>0)&&(typeof i=="number"&&i>0&&(this.style.width=`${i}px`),typeof n=="number"&&n>0&&(this.style.height=`${n}px`),this.instance&&this.instance.updateNode(this.id,{width:typeof i=="number"&&i>0?i:this.width,height:typeof n=="number"&&n>0?n:this.height}),this.appliedInitialSize=!0),super.firstUpdated()}updated(t){super.updated(t)}onFieldHandleMouseDown(t,i){return n=>{n.stopPropagation(),n.preventDefault();const s=`${this.id}-${t}-${i}`;this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:i==="left"?"target":"source",handleId:s,fieldName:t},bubbles:!0,composed:!0}))}}render(){const t=this.data,i=t?.tableName||"Table",n=t?.fields||[];return C`
      <div class="table-header" style="${t.color?`background: ${t.color}`:""}">
        <span class="table-icon">📊</span>
        <span>${i}</span>
      </div>
      
      <div class="table-body nowheel">
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
    `}};exports.ERDTableNode.styles=[...Array.isArray(Re(exports.ERDTableNode,exports.ERDTableNode,"styles"))?Re(exports.ERDTableNode,exports.ERDTableNode,"styles"):[Re(exports.ERDTableNode,exports.ERDTableNode,"styles")],I`
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
    `];exports.ERDTableNode=Nl([Y("erd-table-node")],exports.ERDTableNode);const Cl=[{type:"circle",name:"Circle",category:"basic",path:"M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"rectangle",name:"Rectangle",category:"basic",path:"M 5 5 L 195 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"diamond",name:"Diamond",category:"basic",path:"M 100 5 L 195 100 L 100 195 L 5 100 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"triangle",name:"Triangle",category:"basic",path:"M 100 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Ml=[{type:"hexagon",name:"Hexagon",category:"geometric",path:"M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"octagon",name:"Octagon",category:"geometric",path:"M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Hl=[{type:"heart",name:"Heart",category:"symbolic",path:"M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],oi=class oi{static initialize(){[...Cl,...Ml,...Hl].forEach(i=>{this.shapes.set(i.type,i)})}static register(t){this.shapes.set(t.type,t)}static get(t){return this.shapes.get(t)}static getAll(){return Array.from(this.shapes.values())}static getByCategory(t){return Array.from(this.shapes.values()).filter(i=>i.category===t)}static has(t){return this.shapes.has(t)}static getShapeTypes(){return Array.from(this.shapes.keys())}static clear(){this.shapes.clear()}static getCount(){return this.shapes.size}};oi.shapes=new Map;let qt=oi;qt.initialize();var Al=Object.defineProperty,Pl=Object.getOwnPropertyDescriptor,ot=(e,t,i,n)=>{for(var s=n>1?void 0:n?Pl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Al(t,i,s),s};exports.ShapeNode=class extends B{constructor(){super(...arguments),this.id="",this.selected=!1,this.dragging=!1,this.draggable=!0,this.connectable=!0,this.instance=null,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isDragging=!1,this.cleanup()},this.handleHandleStart=t=>{t.stopPropagation(),this.isDragging=!1;const i=t.target,n=i.dataset.handleId,s=i.dataset.handleType;s&&n&&this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,handleId:n,handleType:s,position:this.position},bubbles:!0,composed:!0}))}}updated(t){super.updated(t),t.has("position")&&this.isDragging,t.has("resizable")}getShapeDefinition(){if(this.data?.type)return qt.get(this.data.type)}renderShape(){const t=this.getShapeDefinition();if(!t)return C`
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
    `}};exports.ShapeNode.styles=I`
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
  `;ot([w({type:String,reflect:!0})],exports.ShapeNode.prototype,"id",2);ot([w({type:Object})],exports.ShapeNode.prototype,"data",2);ot([w({type:Object,hasChanged:(e,t)=>!t||e.x!==t.x||e.y!==t.y})],exports.ShapeNode.prototype,"position",2);ot([w({type:Boolean,reflect:!0})],exports.ShapeNode.prototype,"selected",2);ot([w({type:Boolean,reflect:!0})],exports.ShapeNode.prototype,"dragging",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"draggable",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"connectable",2);ot([w({type:Object})],exports.ShapeNode.prototype,"instance",2);ot([w({type:Boolean})],exports.ShapeNode.prototype,"resizable",2);exports.ShapeNode=ot([Y("shape-node")],exports.ShapeNode);var Rl=Object.getOwnPropertyDescriptor,Qt=(e,t,i,n)=>{for(var s=n>1?void 0:n?Rl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s};exports.BaseNode=class extends B{render(){return C`<slot></slot>`}};exports.BaseNode.styles=I`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;exports.BaseNode=Qt([Y("base-node")],exports.BaseNode);exports.BaseNodeHeader=class extends B{render(){return C`<slot></slot>`}};exports.BaseNodeHeader.styles=I`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `;exports.BaseNodeHeader=Qt([Y("base-node-header")],exports.BaseNodeHeader);exports.BaseNodeHeaderTitle=class extends B{render(){return C`<span class="title"><slot></slot></span>`}};exports.BaseNodeHeaderTitle.styles=I`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;exports.BaseNodeHeaderTitle=Qt([Y("base-node-header-title")],exports.BaseNodeHeaderTitle);exports.BaseNodeContent=class extends B{render(){return C`<slot></slot>`}};exports.BaseNodeContent.styles=I`
    :host {
      display: block;
      padding: 12px;
    }
  `;exports.BaseNodeContent=Qt([Y("base-node-content")],exports.BaseNodeContent);exports.BaseNodeFooter=class extends B{render(){return C`<slot></slot>`}};exports.BaseNodeFooter.styles=I`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;exports.BaseNodeFooter=Qt([Y("base-node-footer")],exports.BaseNodeFooter);var Ll=Object.defineProperty,T=(e,t,i,n)=>{for(var s=void 0,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(t,i,s)||s);return s&&Ll(t,i,s),s};const Tl=e=>{class t extends e{constructor(){super(...arguments),this.id="",this.position={x:0,y:0},this.data={},this.selected=!1,this.dragging=!1,this.instance=null,this.resizable=!1,this.draggable=!0,this.drag_handle_selector=null,this.connectable=!0,this.minWidth=10,this.maxWidth=Number.MAX_VALUE,this.minHeight=10,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.maxInitialHeight=0,this.width=void 0,this.height=void 0,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.dragHandleElement=null,this.handleClick=n=>{if(n.stopPropagation(),!this.isDragging){const s=!this.selected;this.selected=s,this.instance&&this.instance.updateNode(this.id,{selected:s}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:s,node:{id:this.id,data:this.data,position:this.position,selected:s}},bubbles:!0,composed:!0}))}},this.handleWheel=n=>{const s=n.composedPath();let r=null;for(const o of s)if(o instanceof Element&&(r=this.findScrollableElement(o),r))break;if(r){const o=n.deltaY<0&&r.scrollTop>0||n.deltaY>0&&r.scrollTop<r.scrollHeight-r.clientHeight,a=n.deltaX<0&&r.scrollLeft>0||n.deltaX>0&&r.scrollLeft<r.scrollWidth-r.clientWidth;(o||a)&&n.stopPropagation()}},this.handleMouseDown=n=>{if(n.button!==0)return;const s=n.target;if(s.classList.contains("resize-handle")||s.closest(".resize-handle")!==null){this.handleResizeStart(n);return}this.draggable&&(n.preventDefault(),n.stopPropagation(),this.isDragging=!1,this.dragStart={x:n.clientX,y:n.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=n=>{if(this.isResizing){this.handleResizeMove(n);return}const s=n.clientX-this.dragStart.x,r=n.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(s)>3||Math.abs(r)>3)&&(this.isDragging=!0,this.dragging=!0,this.dragHandleElement&&(this.dragHandleElement.style.cursor="grabbing"),this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const o=this.instance.getViewport(),a={x:this.nodeStart.x+s/o.zoom,y:this.nodeStart.y+r/o.zoom};this.instance.updateNode(this.id,{position:a})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.dragHandleElement&&this.isDragging&&(this.dragHandleElement.style.cursor="grab"),this.isResizing&&this.handleResizeEnd(),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1,this.isResizing=!1},50)},this.handleResizeStart=(n,s)=>{n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),this.isResizing=!0;const r=this.getBoundingClientRect(),o=getComputedStyle(this);let a=parseFloat(o.width),l=parseFloat(o.height);if((!a||a===0)&&(a=r.width),(!l||l===0)&&(l=r.height),this.resizeStart={x:n.clientX,y:n.clientY,width:a,height:l},s)this.resizeHandle=s;else{let h=n.target;if(!h.classList.contains("resize-handle")){const c=h.closest(".resize-handle");c&&(h=c)}const d=Array.from(h.classList);this.resizeHandle=d.find(c=>c!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleResizeMove=n=>{if(!this.isResizing)return;const s=n.clientX-this.resizeStart.x,r=n.clientY-this.resizeStart.y;let o=this.resizeStart.width,a=this.resizeStart.height;switch(this.resizeHandle){case"nw":o=this.resizeStart.width-s,a=this.resizeStart.height-r;break;case"ne":o=this.resizeStart.width+s,a=this.resizeStart.height-r;break;case"sw":o=this.resizeStart.width-s,a=this.resizeStart.height+r;break;case"se":o=this.resizeStart.width+s,a=this.resizeStart.height+r;break;case"n":a=this.resizeStart.height-r;break;case"s":a=this.resizeStart.height+r;break;case"w":o=this.resizeStart.width-s;break;case"e":o=this.resizeStart.width+s;break}if(o=Math.max(this.minWidth,Math.min(this.maxWidth,o)),a=Math.max(this.minHeight,Math.min(this.maxHeight,a)),this.keepAspectRatio){const l=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?a=o/l:o=a*l}this.style.width=`${o}px`,this.style.height=`${a}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:o,height:a,handle:this.resizeHandle},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:o,height:a,measured:{width:o,height:a}})},this.handleResizeEnd=()=>{this.isResizing&&(this.isResizing=!1,this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:this.offsetWidth,height:this.offsetHeight,measured:{width:this.offsetWidth,height:this.offsetHeight}}))},this.handleGlobalClick=n=>{n.target.closest(this.tagName.toLowerCase())!==null||this.selected&&(this.selected=!1,this.instance&&this.instance.updateNode(this.id,{selected:!1}),this.dispatchEvent(new CustomEvent("node-deselect",{detail:{nodeId:this.id,selected:!1,node:{id:this.id,data:this.data,position:this.position,selected:!1}},bubbles:!0,composed:!0})))},this.handleResizeHandleClick=n=>s=>{s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.handleResizeStart(s,n)}}static get styles(){return[I`
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
      `]}connectedCallback(){super.connectedCallback(),this.draggable&&!this.drag_handle_selector&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.addEventListener("wheel",this.handleWheel,{passive:!1}),document.addEventListener("click",this.handleGlobalClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.removeEventListener("wheel",this.handleWheel),document.removeEventListener("click",this.handleGlobalClick),this.removeDragHandleListener(),this.cleanup()}findScrollableElement(n){if(!n||!(n instanceof HTMLElement))return null;if(n.classList.contains("nowheel"))return n;const s=window.getComputedStyle(n),r=s.overflow+s.overflowX+s.overflowY;if((r.includes("auto")||r.includes("scroll"))&&(n.scrollHeight>n.clientHeight||n.scrollWidth>n.clientWidth))return n;const o=n.parentElement;return o&&(o===this||this.shadowRoot?.contains(o))?this.findScrollableElement(o):null}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}renderResizer(){return!this.resizable||!this.selected?C``:C`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick("nw")}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick("ne")}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick("sw")}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick("se")}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick("n")}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick("s")}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick("w")}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick("e")}></div>
      `}getResizer(){return this.renderResizer()}firstUpdated(){this.appendResizerToDOM(),this.drag_handle_selector&&this.setAttribute("data-drag-handle-selector",""),typeof this.width=="number"&&this.width>0&&(this.style.width=`${this.width}px`),typeof this.height=="number"&&this.height>0&&(this.style.height=`${this.height}px`),Promise.resolve().then(()=>{this.attachDragHandleListener(),this.adjustHeightToContent()})}updated(n){super.updated(n),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,n.has("width")&&(typeof this.width=="number"&&this.width>0?this.style.width=`${this.width}px`:this.style.width=""),n.has("height")&&(typeof this.height=="number"&&this.height>0?this.style.height=`${this.height}px`:this.style.height=""),n.has("maxInitialHeight")&&!this.isResizing&&Promise.resolve().then(()=>{this.adjustHeightToContent()}),(n.has("resizable")||n.has("selected"))&&this.appendResizerToDOM(),(n.has("drag_handle_selector")||n.has("draggable"))&&Promise.resolve().then(()=>{this.attachDragHandleListener()}),n.has("drag_handle_selector")&&(this.drag_handle_selector?this.setAttribute("data-drag-handle-selector",""):this.removeAttribute("data-drag-handle-selector"))}appendResizerToDOM(){if(this.removeExistingResizer(),this.resizable&&this.selected){const n=this.renderResizer();if(n){const s=document.createElement("div");s.className="mixin-resizer-container",s.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10;
          `,this.shadowRoot?.appendChild(s),Nn(n,s)}}}removeExistingResizer(){const n=this.shadowRoot?.querySelector(".mixin-resizer-container");n&&n.remove()}attachDragHandleListener(){if(this.removeDragHandleListener(),!this.draggable||!this.drag_handle_selector)return;const n=this.shadowRoot;if(!n){setTimeout(()=>this.attachDragHandleListener(),0);return}const s=n.querySelector(this.drag_handle_selector);s&&(this.dragHandleElement=s,s.addEventListener("mousedown",this.handleMouseDown),s.style.cursor="grab")}removeDragHandleListener(){this.dragHandleElement&&(this.dragHandleElement.removeEventListener("mousedown",this.handleMouseDown),this.dragHandleElement.style.cursor="",this.dragHandleElement=null)}adjustHeightToContent(){if(this.maxInitialHeight<=0||!this.instance||!this.id||this.isResizing)return;const n=this.style.height;this.style.height="auto",this.offsetHeight;const s=this.scrollHeight||this.getBoundingClientRect().height;s>this.maxInitialHeight?(this.style.height=`${this.maxInitialHeight}px`,this.instance.updateNode(this.id,{height:this.maxInitialHeight,measured:{width:this.offsetWidth||this.getBoundingClientRect().width,height:this.maxInitialHeight}})):(n?this.style.height=n:this.style.height="",s>0&&this.instance.updateNode(this.id,{height:s,measured:{width:this.offsetWidth||this.getBoundingClientRect().width,height:s}}))}async notifyHandlesUpdated(n){const{handleIds:s,updateDimensions:r=!0}=n||{};if(await this.updateComplete,await new Promise(o=>setTimeout(o,0)),this.instance&&this.id){if(r){const o=this.getBoundingClientRect(),a=o.width,l=o.height;this.instance.updateNode(this.id,{width:a,height:l,measured:{width:a,height:l}})}this.dispatchEvent(new CustomEvent("node-handles-updated",{detail:{nodeId:this.id,handleIds:s||[],timestamp:Date.now()},bubbles:!0,composed:!0}))}}}return T([w({type:String,reflect:!0})],t.prototype,"id"),T([w({type:Object})],t.prototype,"position"),T([w({type:Object})],t.prototype,"data"),T([w({type:Boolean,reflect:!0})],t.prototype,"selected"),T([w({type:Boolean,reflect:!0})],t.prototype,"dragging"),T([w({type:Object})],t.prototype,"instance"),T([w({type:Boolean})],t.prototype,"resizable"),T([w({type:Boolean})],t.prototype,"draggable"),T([w({type:String})],t.prototype,"drag_handle_selector"),T([w({type:Boolean})],t.prototype,"connectable"),T([w({type:Number})],t.prototype,"minWidth"),T([w({type:Number})],t.prototype,"maxWidth"),T([w({type:Number})],t.prototype,"minHeight"),T([w({type:Number})],t.prototype,"maxHeight"),T([w({type:Boolean})],t.prototype,"keepAspectRatio"),T([w({type:Number})],t.prototype,"maxInitialHeight"),T([w({type:Number})],t.prototype,"width"),T([w({type:Number})],t.prototype,"height"),t};exports.FlowInstance=xn;exports.NodeMixin=Tl;exports.ShapeRegistry=qt;exports.createStore=Aa;exports.getBezierPath=be;exports.getCenter=hl;exports.getDistance=ll;exports.getSmoothStepPath=Ye;exports.getStraightPath=Hn;exports.isPointInRect=dl;
//# sourceMappingURL=lit-flow.bundle.cjs.map
