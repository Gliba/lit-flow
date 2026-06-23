"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});var Vn={value:()=>{}};function je(){for(var e=0,t=arguments.length,i={},n;e<t;++e){if(!(n=arguments[e]+"")||n in i||/[\s.]/.test(n))throw new Error("illegal type: "+n);i[n]=[]}return new le(i)}function le(e){this._=e}function jn(e,t){return e.trim().split(/^|\s+/).map(function(i){var n="",s=i.indexOf(".");if(s>=0&&(n=i.slice(s+1),i=i.slice(0,s)),i&&!t.hasOwnProperty(i))throw new Error("unknown type: "+i);return{type:i,name:n}})}le.prototype=je.prototype={constructor:le,on:function(e,t){var i=this._,n=jn(e+"",i),s,r=-1,o=n.length;if(arguments.length<2){for(;++r<o;)if((s=(e=n[r]).type)&&(s=Gn(i[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<o;)if(s=(e=n[r]).type)i[s]=ci(i[s],e.name,t);else if(t==null)for(s in i)i[s]=ci(i[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var i in t)e[i]=t[i].slice();return new le(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var i=new Array(s),n=0,s,r;n<s;++n)i[n]=arguments[n+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(r=this._[e],n=0,s=r.length;n<s;++n)r[n].value.apply(t,i)},apply:function(e,t,i){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var n=this._[e],s=0,r=n.length;s<r;++s)n[s].value.apply(t,i)}};function Gn(e,t){for(var i=0,n=e.length,s;i<n;++i)if((s=e[i]).name===t)return s.value}function ci(e,t,i){for(var n=0,s=e.length;n<s;++n)if(e[n].name===t){e[n]=Vn,e=e.slice(0,n).concat(e.slice(n+1));break}return i!=null&&e.push({name:t,value:i}),e}var Fe="http://www.w3.org/1999/xhtml";const ui={svg:"http://www.w3.org/2000/svg",xhtml:Fe,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ze(e){var t=e+="",i=t.indexOf(":");return i>=0&&(t=e.slice(0,i))!=="xmlns"&&(e=e.slice(i+1)),ui.hasOwnProperty(t)?{space:ui[t],local:e}:e}function Kn(e){return function(){var t=this.ownerDocument,i=this.namespaceURI;return i===Fe&&t.documentElement.namespaceURI===Fe?t.createElement(e):t.createElementNS(i,e)}}function Qn(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Gi(e){var t=ze(e);return(t.local?Qn:Kn)(t)}function Jn(){}function Ge(e){return e==null?Jn:function(){return this.querySelector(e)}}function ts(e){typeof e!="function"&&(e=Ge(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=new Array(o),l,h,d=0;d<o;++d)(l=r[d])&&(h=e.call(l,l.__data__,d,r))&&("__data__"in l&&(h.__data__=l.__data__),a[d]=h);return new j(n,this._parents)}function es(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function is(){return[]}function Ki(e){return e==null?is:function(){return this.querySelectorAll(e)}}function ns(e){return function(){return es(e.apply(this,arguments))}}function ss(e){typeof e=="function"?e=ns(e):e=Ki(e);for(var t=this._groups,i=t.length,n=[],s=[],r=0;r<i;++r)for(var o=t[r],a=o.length,l,h=0;h<a;++h)(l=o[h])&&(n.push(e.call(l,l.__data__,h,o)),s.push(l));return new j(n,s)}function Qi(e){return function(){return this.matches(e)}}function Ji(e){return function(t){return t.matches(e)}}var rs=Array.prototype.find;function os(e){return function(){return rs.call(this.children,e)}}function as(){return this.firstElementChild}function ls(e){return this.select(e==null?as:os(typeof e=="function"?e:Ji(e)))}var hs=Array.prototype.filter;function ds(){return Array.from(this.children)}function cs(e){return function(){return hs.call(this.children,e)}}function us(e){return this.selectAll(e==null?ds:cs(typeof e=="function"?e:Ji(e)))}function fs(e){typeof e!="function"&&(e=Qi(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],l,h=0;h<o;++h)(l=r[h])&&e.call(l,l.__data__,h,r)&&a.push(l);return new j(n,this._parents)}function tn(e){return new Array(e.length)}function ps(){return new j(this._enter||this._groups.map(tn),this._parents)}function pe(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}pe.prototype={constructor:pe,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function gs(e){return function(){return e}}function ms(e,t,i,n,s,r){for(var o=0,a,l=t.length,h=r.length;o<h;++o)(a=t[o])?(a.__data__=r[o],n[o]=a):i[o]=new pe(e,r[o]);for(;o<l;++o)(a=t[o])&&(s[o]=a)}function ys(e,t,i,n,s,r,o){var a,l,h=new Map,d=t.length,c=r.length,u=new Array(d),p;for(a=0;a<d;++a)(l=t[a])&&(u[a]=p=o.call(l,l.__data__,a,t)+"",h.has(p)?s[a]=l:h.set(p,l));for(a=0;a<c;++a)p=o.call(e,r[a],a,r)+"",(l=h.get(p))?(n[a]=l,l.__data__=r[a],h.delete(p)):i[a]=new pe(e,r[a]);for(a=0;a<d;++a)(l=t[a])&&h.get(u[a])===l&&(s[a]=l)}function ws(e){return e.__data__}function vs(e,t){if(!arguments.length)return Array.from(this,ws);var i=t?ys:ms,n=this._parents,s=this._groups;typeof e!="function"&&(e=gs(e));for(var r=s.length,o=new Array(r),a=new Array(r),l=new Array(r),h=0;h<r;++h){var d=n[h],c=s[h],u=c.length,p=bs(e.call(d,d&&d.__data__,h,n)),m=p.length,y=a[h]=new Array(m),$=o[h]=new Array(m),w=l[h]=new Array(u);i(d,c,y,$,w,p,t);for(var _=0,E=0,H,B;_<m;++_)if(H=y[_]){for(_>=E&&(E=_+1);!(B=$[E])&&++E<m;);H._next=B||null}}return o=new j(o,n),o._enter=a,o._exit=l,o}function bs(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function xs(){return new j(this._exit||this._groups.map(tn),this._parents)}function _s(e,t,i){var n=this.enter(),s=this,r=this.exit();return typeof e=="function"?(n=e(n),n&&(n=n.selection())):n=n.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),i==null?r.remove():i(r),n&&s?n.merge(s).order():s}function $s(e){for(var t=e.selection?e.selection():e,i=this._groups,n=t._groups,s=i.length,r=n.length,o=Math.min(s,r),a=new Array(s),l=0;l<o;++l)for(var h=i[l],d=n[l],c=h.length,u=a[l]=new Array(c),p,m=0;m<c;++m)(p=h[m]||d[m])&&(u[m]=p);for(;l<s;++l)a[l]=i[l];return new j(a,this._parents)}function zs(){for(var e=this._groups,t=-1,i=e.length;++t<i;)for(var n=e[t],s=n.length-1,r=n[s],o;--s>=0;)(o=n[s])&&(r&&o.compareDocumentPosition(r)^4&&r.parentNode.insertBefore(o,r),r=o);return this}function Ss(e){e||(e=Es);function t(c,u){return c&&u?e(c.__data__,u.__data__):!c-!u}for(var i=this._groups,n=i.length,s=new Array(n),r=0;r<n;++r){for(var o=i[r],a=o.length,l=s[r]=new Array(a),h,d=0;d<a;++d)(h=o[d])&&(l[d]=h);l.sort(t)}return new j(s,this._parents).order()}function Es(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function ks(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Ns(){return Array.from(this)}function Cs(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length;s<r;++s){var o=n[s];if(o)return o}return null}function Ms(){let e=0;for(const t of this)++e;return e}function Hs(){return!this.node()}function As(e){for(var t=this._groups,i=0,n=t.length;i<n;++i)for(var s=t[i],r=0,o=s.length,a;r<o;++r)(a=s[r])&&e.call(a,a.__data__,r,s);return this}function Ps(e){return function(){this.removeAttribute(e)}}function Rs(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Ts(e,t){return function(){this.setAttribute(e,t)}}function Ls(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Ds(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttribute(e):this.setAttribute(e,i)}}function Os(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,i)}}function Fs(e,t){var i=ze(e);if(arguments.length<2){var n=this.node();return i.local?n.getAttributeNS(i.space,i.local):n.getAttribute(i)}return this.each((t==null?i.local?Rs:Ps:typeof t=="function"?i.local?Os:Ds:i.local?Ls:Ts)(i,t))}function en(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Is(e){return function(){this.style.removeProperty(e)}}function Bs(e,t,i){return function(){this.style.setProperty(e,t,i)}}function Us(e,t,i){return function(){var n=t.apply(this,arguments);n==null?this.style.removeProperty(e):this.style.setProperty(e,n,i)}}function Xs(e,t,i){return arguments.length>1?this.each((t==null?Is:typeof t=="function"?Us:Bs)(e,t,i??"")):Ct(this.node(),e)}function Ct(e,t){return e.style.getPropertyValue(t)||en(e).getComputedStyle(e,null).getPropertyValue(t)}function Ys(e){return function(){delete this[e]}}function Ws(e,t){return function(){this[e]=t}}function Zs(e,t){return function(){var i=t.apply(this,arguments);i==null?delete this[e]:this[e]=i}}function qs(e,t){return arguments.length>1?this.each((t==null?Ys:typeof t=="function"?Zs:Ws)(e,t)):this.node()[e]}function nn(e){return e.trim().split(/^|\s+/)}function Ke(e){return e.classList||new sn(e)}function sn(e){this._node=e,this._names=nn(e.getAttribute("class")||"")}sn.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function rn(e,t){for(var i=Ke(e),n=-1,s=t.length;++n<s;)i.add(t[n])}function on(e,t){for(var i=Ke(e),n=-1,s=t.length;++n<s;)i.remove(t[n])}function Vs(e){return function(){rn(this,e)}}function js(e){return function(){on(this,e)}}function Gs(e,t){return function(){(t.apply(this,arguments)?rn:on)(this,e)}}function Ks(e,t){var i=nn(e+"");if(arguments.length<2){for(var n=Ke(this.node()),s=-1,r=i.length;++s<r;)if(!n.contains(i[s]))return!1;return!0}return this.each((typeof t=="function"?Gs:t?Vs:js)(i,t))}function Qs(){this.textContent=""}function Js(e){return function(){this.textContent=e}}function tr(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function er(e){return arguments.length?this.each(e==null?Qs:(typeof e=="function"?tr:Js)(e)):this.node().textContent}function ir(){this.innerHTML=""}function nr(e){return function(){this.innerHTML=e}}function sr(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function rr(e){return arguments.length?this.each(e==null?ir:(typeof e=="function"?sr:nr)(e)):this.node().innerHTML}function or(){this.nextSibling&&this.parentNode.appendChild(this)}function ar(){return this.each(or)}function lr(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function hr(){return this.each(lr)}function dr(e){var t=typeof e=="function"?e:Gi(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function cr(){return null}function ur(e,t){var i=typeof e=="function"?e:Gi(e),n=t==null?cr:typeof t=="function"?t:Ge(t);return this.select(function(){return this.insertBefore(i.apply(this,arguments),n.apply(this,arguments)||null)})}function fr(){var e=this.parentNode;e&&e.removeChild(this)}function pr(){return this.each(fr)}function gr(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function mr(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function yr(e){return this.select(e?mr:gr)}function wr(e){return arguments.length?this.property("__data__",e):this.node().__data__}function vr(e){return function(t){e.call(this,t,this.__data__)}}function br(e){return e.trim().split(/^|\s+/).map(function(t){var i="",n=t.indexOf(".");return n>=0&&(i=t.slice(n+1),t=t.slice(0,n)),{type:t,name:i}})}function xr(e){return function(){var t=this.__on;if(t){for(var i=0,n=-1,s=t.length,r;i<s;++i)r=t[i],(!e.type||r.type===e.type)&&r.name===e.name?this.removeEventListener(r.type,r.listener,r.options):t[++n]=r;++n?t.length=n:delete this.__on}}}function _r(e,t,i){return function(){var n=this.__on,s,r=vr(t);if(n){for(var o=0,a=n.length;o<a;++o)if((s=n[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=r,s.options=i),s.value=t;return}}this.addEventListener(e.type,r,i),s={type:e.type,name:e.name,value:t,listener:r,options:i},n?n.push(s):this.__on=[s]}}function $r(e,t,i){var n=br(e+""),s,r=n.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,h=a.length,d;l<h;++l)for(s=0,d=a[l];s<r;++s)if((o=n[s]).type===d.type&&o.name===d.name)return d.value}return}for(a=t?_r:xr,s=0;s<r;++s)this.each(a(n[s],t,i));return this}function an(e,t,i){var n=en(e),s=n.CustomEvent;typeof s=="function"?s=new s(t,i):(s=n.document.createEvent("Event"),i?(s.initEvent(t,i.bubbles,i.cancelable),s.detail=i.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function zr(e,t){return function(){return an(this,e,t)}}function Sr(e,t){return function(){return an(this,e,t.apply(this,arguments))}}function Er(e,t){return this.each((typeof t=="function"?Sr:zr)(e,t))}function*kr(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length,o;s<r;++s)(o=n[s])&&(yield o)}var ln=[null];function j(e,t){this._groups=e,this._parents=t}function Qt(){return new j([[document.documentElement]],ln)}function Nr(){return this}j.prototype=Qt.prototype={constructor:j,select:ts,selectAll:ss,selectChild:ls,selectChildren:us,filter:fs,data:vs,enter:ps,exit:xs,join:_s,merge:$s,selection:Nr,order:zs,sort:Ss,call:ks,nodes:Ns,node:Cs,size:Ms,empty:Hs,each:As,attr:Fs,style:Xs,property:qs,classed:Ks,text:er,html:rr,raise:ar,lower:hr,append:dr,insert:ur,remove:pr,clone:yr,datum:wr,on:$r,dispatch:Er,[Symbol.iterator]:kr};function ft(e){return typeof e=="string"?new j([[document.querySelector(e)]],[document.documentElement]):new j([[e]],ln)}function Cr(e){let t;for(;t=e.sourceEvent;)e=t;return e}function ut(e,t){if(e=Cr(e),t===void 0&&(t=e.currentTarget),t){var i=t.ownerSVGElement||t;if(i.createSVGPoint){var n=i.createSVGPoint();return n.x=e.clientX,n.y=e.clientY,n=n.matrixTransform(t.getScreenCTM().inverse()),[n.x,n.y]}if(t.getBoundingClientRect){var s=t.getBoundingClientRect();return[e.clientX-s.left-t.clientLeft,e.clientY-s.top-t.clientTop]}}return[e.pageX,e.pageY]}const Ie={capture:!0,passive:!1};function Be(e){e.preventDefault(),e.stopImmediatePropagation()}function Mr(e){var t=e.document.documentElement,i=ft(e).on("dragstart.drag",Be,Ie);"onselectstart"in t?i.on("selectstart.drag",Be,Ie):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function Hr(e,t){var i=e.document.documentElement,n=ft(e).on("dragstart.drag",null);t&&(n.on("click.drag",Be,Ie),setTimeout(function(){n.on("click.drag",null)},0)),"onselectstart"in i?n.on("selectstart.drag",null):(i.style.MozUserSelect=i.__noselect,delete i.__noselect)}function Qe(e,t,i){e.prototype=t.prototype=i,i.constructor=e}function hn(e,t){var i=Object.create(e.prototype);for(var n in t)i[n]=t[n];return i}function Jt(){}var Wt=.7,ge=1/Wt,Nt="\\s*([+-]?\\d+)\\s*",Zt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",st="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ar=/^#([0-9a-f]{3,8})$/,Pr=new RegExp(`^rgb\\(${Nt},${Nt},${Nt}\\)$`),Rr=new RegExp(`^rgb\\(${st},${st},${st}\\)$`),Tr=new RegExp(`^rgba\\(${Nt},${Nt},${Nt},${Zt}\\)$`),Lr=new RegExp(`^rgba\\(${st},${st},${st},${Zt}\\)$`),Dr=new RegExp(`^hsl\\(${Zt},${st},${st}\\)$`),Or=new RegExp(`^hsla\\(${Zt},${st},${st},${Zt}\\)$`),fi={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Qe(Jt,xt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:pi,formatHex:pi,formatHex8:Fr,formatHsl:Ir,formatRgb:gi,toString:gi});function pi(){return this.rgb().formatHex()}function Fr(){return this.rgb().formatHex8()}function Ir(){return dn(this).formatHsl()}function gi(){return this.rgb().formatRgb()}function xt(e){var t,i;return e=(e+"").trim().toLowerCase(),(t=Ar.exec(e))?(i=t[1].length,t=parseInt(t[1],16),i===6?mi(t):i===3?new Y(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):i===8?ie(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):i===4?ie(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Pr.exec(e))?new Y(t[1],t[2],t[3],1):(t=Rr.exec(e))?new Y(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Tr.exec(e))?ie(t[1],t[2],t[3],t[4]):(t=Lr.exec(e))?ie(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Dr.exec(e))?vi(t[1],t[2]/100,t[3]/100,1):(t=Or.exec(e))?vi(t[1],t[2]/100,t[3]/100,t[4]):fi.hasOwnProperty(e)?mi(fi[e]):e==="transparent"?new Y(NaN,NaN,NaN,0):null}function mi(e){return new Y(e>>16&255,e>>8&255,e&255,1)}function ie(e,t,i,n){return n<=0&&(e=t=i=NaN),new Y(e,t,i,n)}function Br(e){return e instanceof Jt||(e=xt(e)),e?(e=e.rgb(),new Y(e.r,e.g,e.b,e.opacity)):new Y}function Ue(e,t,i,n){return arguments.length===1?Br(e):new Y(e,t,i,n??1)}function Y(e,t,i,n){this.r=+e,this.g=+t,this.b=+i,this.opacity=+n}Qe(Y,Ue,hn(Jt,{brighter(e){return e=e==null?ge:Math.pow(ge,e),new Y(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Wt:Math.pow(Wt,e),new Y(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Y(bt(this.r),bt(this.g),bt(this.b),me(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:yi,formatHex:yi,formatHex8:Ur,formatRgb:wi,toString:wi}));function yi(){return`#${wt(this.r)}${wt(this.g)}${wt(this.b)}`}function Ur(){return`#${wt(this.r)}${wt(this.g)}${wt(this.b)}${wt((isNaN(this.opacity)?1:this.opacity)*255)}`}function wi(){const e=me(this.opacity);return`${e===1?"rgb(":"rgba("}${bt(this.r)}, ${bt(this.g)}, ${bt(this.b)}${e===1?")":`, ${e})`}`}function me(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function bt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function wt(e){return e=bt(e),(e<16?"0":"")+e.toString(16)}function vi(e,t,i,n){return n<=0?e=t=i=NaN:i<=0||i>=1?e=t=NaN:t<=0&&(e=NaN),new tt(e,t,i,n)}function dn(e){if(e instanceof tt)return new tt(e.h,e.s,e.l,e.opacity);if(e instanceof Jt||(e=xt(e)),!e)return new tt;if(e instanceof tt)return e;e=e.rgb();var t=e.r/255,i=e.g/255,n=e.b/255,s=Math.min(t,i,n),r=Math.max(t,i,n),o=NaN,a=r-s,l=(r+s)/2;return a?(t===r?o=(i-n)/a+(i<n)*6:i===r?o=(n-t)/a+2:o=(t-i)/a+4,a/=l<.5?r+s:2-r-s,o*=60):a=l>0&&l<1?0:o,new tt(o,a,l,e.opacity)}function Xr(e,t,i,n){return arguments.length===1?dn(e):new tt(e,t,i,n??1)}function tt(e,t,i,n){this.h=+e,this.s=+t,this.l=+i,this.opacity=+n}Qe(tt,Xr,hn(Jt,{brighter(e){return e=e==null?ge:Math.pow(ge,e),new tt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Wt:Math.pow(Wt,e),new tt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,i=this.l,n=i+(i<.5?i:1-i)*t,s=2*i-n;return new Y(He(e>=240?e-240:e+120,s,n),He(e,s,n),He(e<120?e+240:e-120,s,n),this.opacity)},clamp(){return new tt(bi(this.h),ne(this.s),ne(this.l),me(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=me(this.opacity);return`${e===1?"hsl(":"hsla("}${bi(this.h)}, ${ne(this.s)*100}%, ${ne(this.l)*100}%${e===1?")":`, ${e})`}`}}));function bi(e){return e=(e||0)%360,e<0?e+360:e}function ne(e){return Math.max(0,Math.min(1,e||0))}function He(e,t,i){return(e<60?t+(i-t)*e/60:e<180?i:e<240?t+(i-t)*(240-e)/60:t)*255}const Je=e=>()=>e;function Yr(e,t){return function(i){return e+i*t}}function Wr(e,t,i){return e=Math.pow(e,i),t=Math.pow(t,i)-e,i=1/i,function(n){return Math.pow(e+n*t,i)}}function Zr(e){return(e=+e)==1?cn:function(t,i){return i-t?Wr(t,i,e):Je(isNaN(t)?i:t)}}function cn(e,t){var i=t-e;return i?Yr(e,i):Je(isNaN(e)?t:e)}const ye=(function e(t){var i=Zr(t);function n(s,r){var o=i((s=Ue(s)).r,(r=Ue(r)).r),a=i(s.g,r.g),l=i(s.b,r.b),h=cn(s.opacity,r.opacity);return function(d){return s.r=o(d),s.g=a(d),s.b=l(d),s.opacity=h(d),s+""}}return n.gamma=e,n})(1);function qr(e,t){t||(t=[]);var i=e?Math.min(t.length,e.length):0,n=t.slice(),s;return function(r){for(s=0;s<i;++s)n[s]=e[s]*(1-r)+t[s]*r;return n}}function Vr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function jr(e,t){var i=t?t.length:0,n=e?Math.min(i,e.length):0,s=new Array(n),r=new Array(i),o;for(o=0;o<n;++o)s[o]=Ut(e[o],t[o]);for(;o<i;++o)r[o]=t[o];return function(a){for(o=0;o<n;++o)r[o]=s[o](a);return r}}function Gr(e,t){var i=new Date;return e=+e,t=+t,function(n){return i.setTime(e*(1-n)+t*n),i}}function nt(e,t){return e=+e,t=+t,function(i){return e*(1-i)+t*i}}function Kr(e,t){var i={},n={},s;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(s in t)s in e?i[s]=Ut(e[s],t[s]):n[s]=t[s];return function(r){for(s in i)n[s]=i[s](r);return n}}var Xe=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ae=new RegExp(Xe.source,"g");function Qr(e){return function(){return e}}function Jr(e){return function(t){return e(t)+""}}function un(e,t){var i=Xe.lastIndex=Ae.lastIndex=0,n,s,r,o=-1,a=[],l=[];for(e=e+"",t=t+"";(n=Xe.exec(e))&&(s=Ae.exec(t));)(r=s.index)>i&&(r=t.slice(i,r),a[o]?a[o]+=r:a[++o]=r),(n=n[0])===(s=s[0])?a[o]?a[o]+=s:a[++o]=s:(a[++o]=null,l.push({i:o,x:nt(n,s)})),i=Ae.lastIndex;return i<t.length&&(r=t.slice(i),a[o]?a[o]+=r:a[++o]=r),a.length<2?l[0]?Jr(l[0].x):Qr(t):(t=l.length,function(h){for(var d=0,c;d<t;++d)a[(c=l[d]).i]=c.x(h);return a.join("")})}function Ut(e,t){var i=typeof t,n;return t==null||i==="boolean"?Je(t):(i==="number"?nt:i==="string"?(n=xt(t))?(t=n,ye):un:t instanceof xt?ye:t instanceof Date?Gr:Vr(t)?qr:Array.isArray(t)?jr:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Kr:nt)(e,t)}var xi=180/Math.PI,Ye={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function fn(e,t,i,n,s,r){var o,a,l;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(l=e*i+t*n)&&(i-=e*l,n-=t*l),(a=Math.sqrt(i*i+n*n))&&(i/=a,n/=a,l/=a),e*n<t*i&&(e=-e,t=-t,l=-l,o=-o),{translateX:s,translateY:r,rotate:Math.atan2(t,e)*xi,skewX:Math.atan(l)*xi,scaleX:o,scaleY:a}}var se;function to(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Ye:fn(t.a,t.b,t.c,t.d,t.e,t.f)}function eo(e){return e==null||(se||(se=document.createElementNS("http://www.w3.org/2000/svg","g")),se.setAttribute("transform",e),!(e=se.transform.baseVal.consolidate()))?Ye:(e=e.matrix,fn(e.a,e.b,e.c,e.d,e.e,e.f))}function pn(e,t,i,n){function s(h){return h.length?h.pop()+" ":""}function r(h,d,c,u,p,m){if(h!==c||d!==u){var y=p.push("translate(",null,t,null,i);m.push({i:y-4,x:nt(h,c)},{i:y-2,x:nt(d,u)})}else(c||u)&&p.push("translate("+c+t+u+i)}function o(h,d,c,u){h!==d?(h-d>180?d+=360:d-h>180&&(h+=360),u.push({i:c.push(s(c)+"rotate(",null,n)-2,x:nt(h,d)})):d&&c.push(s(c)+"rotate("+d+n)}function a(h,d,c,u){h!==d?u.push({i:c.push(s(c)+"skewX(",null,n)-2,x:nt(h,d)}):d&&c.push(s(c)+"skewX("+d+n)}function l(h,d,c,u,p,m){if(h!==c||d!==u){var y=p.push(s(p)+"scale(",null,",",null,")");m.push({i:y-4,x:nt(h,c)},{i:y-2,x:nt(d,u)})}else(c!==1||u!==1)&&p.push(s(p)+"scale("+c+","+u+")")}return function(h,d){var c=[],u=[];return h=e(h),d=e(d),r(h.translateX,h.translateY,d.translateX,d.translateY,c,u),o(h.rotate,d.rotate,c,u),a(h.skewX,d.skewX,c,u),l(h.scaleX,h.scaleY,d.scaleX,d.scaleY,c,u),h=d=null,function(p){for(var m=-1,y=u.length,$;++m<y;)c[($=u[m]).i]=$.x(p);return c.join("")}}}var io=pn(to,"px, ","px)","deg)"),no=pn(eo,", ",")",")"),so=1e-12;function _i(e){return((e=Math.exp(e))+1/e)/2}function ro(e){return((e=Math.exp(e))-1/e)/2}function oo(e){return((e=Math.exp(2*e))-1)/(e+1)}const he=(function e(t,i,n){function s(r,o){var a=r[0],l=r[1],h=r[2],d=o[0],c=o[1],u=o[2],p=d-a,m=c-l,y=p*p+m*m,$,w;if(y<so)w=Math.log(u/h)/t,$=function(P){return[a+P*p,l+P*m,h*Math.exp(t*P*w)]};else{var _=Math.sqrt(y),E=(u*u-h*h+n*y)/(2*h*i*_),H=(u*u-h*h-n*y)/(2*u*i*_),B=Math.log(Math.sqrt(E*E+1)-E),T=Math.log(Math.sqrt(H*H+1)-H);w=(T-B)/t,$=function(P){var G=P*w,Q=_i(B),ct=h/(i*_)*(Q*oo(t*G+B)-ro(B));return[a+ct*p,l+ct*m,h*Q/_i(t*G+B)]}}return $.duration=w*1e3*t/Math.SQRT2,$}return s.rho=function(r){var o=Math.max(.001,+r),a=o*o,l=a*a;return e(o,a,l)},s})(Math.SQRT2,2,4);var Mt=0,It=0,Tt=0,gn=1e3,we,Bt,ve=0,_t=0,Se=0,qt=typeof performance=="object"&&performance.now?performance:Date,mn=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function ti(){return _t||(mn(ao),_t=qt.now()+Se)}function ao(){_t=0}function be(){this._call=this._time=this._next=null}be.prototype=yn.prototype={constructor:be,restart:function(e,t,i){if(typeof e!="function")throw new TypeError("callback is not a function");i=(i==null?ti():+i)+(t==null?0:+t),!this._next&&Bt!==this&&(Bt?Bt._next=this:we=this,Bt=this),this._call=e,this._time=i,We()},stop:function(){this._call&&(this._call=null,this._time=1/0,We())}};function yn(e,t,i){var n=new be;return n.restart(e,t,i),n}function lo(){ti(),++Mt;for(var e=we,t;e;)(t=_t-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Mt}function $i(){_t=(ve=qt.now())+Se,Mt=It=0;try{lo()}finally{Mt=0,co(),_t=0}}function ho(){var e=qt.now(),t=e-ve;t>gn&&(Se-=t,ve=e)}function co(){for(var e,t=we,i,n=1/0;t;)t._call?(n>t._time&&(n=t._time),e=t,t=t._next):(i=t._next,t._next=null,t=e?e._next=i:we=i);Bt=e,We(n)}function We(e){if(!Mt){It&&(It=clearTimeout(It));var t=e-_t;t>24?(e<1/0&&(It=setTimeout($i,e-qt.now()-Se)),Tt&&(Tt=clearInterval(Tt))):(Tt||(ve=qt.now(),Tt=setInterval(ho,gn)),Mt=1,mn($i))}}function zi(e,t,i){var n=new be;return t=t==null?0:+t,n.restart(s=>{n.stop(),e(s+t)},t,i),n}var uo=je("start","end","cancel","interrupt"),fo=[],wn=0,Si=1,Ze=2,de=3,Ei=4,qe=5,ce=6;function Ee(e,t,i,n,s,r){var o=e.__transition;if(!o)e.__transition={};else if(i in o)return;po(e,i,{name:t,index:n,group:s,on:uo,tween:fo,time:r.time,delay:r.delay,duration:r.duration,ease:r.ease,timer:null,state:wn})}function ei(e,t){var i=et(e,t);if(i.state>wn)throw new Error("too late; already scheduled");return i}function rt(e,t){var i=et(e,t);if(i.state>de)throw new Error("too late; already running");return i}function et(e,t){var i=e.__transition;if(!i||!(i=i[t]))throw new Error("transition not found");return i}function po(e,t,i){var n=e.__transition,s;n[t]=i,i.timer=yn(r,0,i.time);function r(h){i.state=Si,i.timer.restart(o,i.delay,i.time),i.delay<=h&&o(h-i.delay)}function o(h){var d,c,u,p;if(i.state!==Si)return l();for(d in n)if(p=n[d],p.name===i.name){if(p.state===de)return zi(o);p.state===Ei?(p.state=ce,p.timer.stop(),p.on.call("interrupt",e,e.__data__,p.index,p.group),delete n[d]):+d<t&&(p.state=ce,p.timer.stop(),p.on.call("cancel",e,e.__data__,p.index,p.group),delete n[d])}if(zi(function(){i.state===de&&(i.state=Ei,i.timer.restart(a,i.delay,i.time),a(h))}),i.state=Ze,i.on.call("start",e,e.__data__,i.index,i.group),i.state===Ze){for(i.state=de,s=new Array(u=i.tween.length),d=0,c=-1;d<u;++d)(p=i.tween[d].value.call(e,e.__data__,i.index,i.group))&&(s[++c]=p);s.length=c+1}}function a(h){for(var d=h<i.duration?i.ease.call(null,h/i.duration):(i.timer.restart(l),i.state=qe,1),c=-1,u=s.length;++c<u;)s[c].call(e,d);i.state===qe&&(i.on.call("end",e,e.__data__,i.index,i.group),l())}function l(){i.state=ce,i.timer.stop(),delete n[t];for(var h in n)return;delete e.__transition}}function ue(e,t){var i=e.__transition,n,s,r=!0,o;if(i){t=t==null?null:t+"";for(o in i){if((n=i[o]).name!==t){r=!1;continue}s=n.state>Ze&&n.state<qe,n.state=ce,n.timer.stop(),n.on.call(s?"interrupt":"cancel",e,e.__data__,n.index,n.group),delete i[o]}r&&delete e.__transition}}function go(e){return this.each(function(){ue(this,e)})}function mo(e,t){var i,n;return function(){var s=rt(this,e),r=s.tween;if(r!==i){n=i=r;for(var o=0,a=n.length;o<a;++o)if(n[o].name===t){n=n.slice(),n.splice(o,1);break}}s.tween=n}}function yo(e,t,i){var n,s;if(typeof i!="function")throw new Error;return function(){var r=rt(this,e),o=r.tween;if(o!==n){s=(n=o).slice();for(var a={name:t,value:i},l=0,h=s.length;l<h;++l)if(s[l].name===t){s[l]=a;break}l===h&&s.push(a)}r.tween=s}}function wo(e,t){var i=this._id;if(e+="",arguments.length<2){for(var n=et(this.node(),i).tween,s=0,r=n.length,o;s<r;++s)if((o=n[s]).name===e)return o.value;return null}return this.each((t==null?mo:yo)(i,e,t))}function ii(e,t,i){var n=e._id;return e.each(function(){var s=rt(this,n);(s.value||(s.value={}))[t]=i.apply(this,arguments)}),function(s){return et(s,n).value[t]}}function vn(e,t){var i;return(typeof t=="number"?nt:t instanceof xt?ye:(i=xt(t))?(t=i,ye):un)(e,t)}function vo(e){return function(){this.removeAttribute(e)}}function bo(e){return function(){this.removeAttributeNS(e.space,e.local)}}function xo(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttribute(e);return o===s?null:o===n?r:r=t(n=o,i)}}function _o(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===n?r:r=t(n=o,i)}}function $o(e,t,i){var n,s,r;return function(){var o,a=i(this),l;return a==null?void this.removeAttribute(e):(o=this.getAttribute(e),l=a+"",o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a)))}}function zo(e,t,i){var n,s,r;return function(){var o,a=i(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),l=a+"",o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a)))}}function So(e,t){var i=ze(e),n=i==="transform"?no:vn;return this.attrTween(e,typeof t=="function"?(i.local?zo:$o)(i,n,ii(this,"attr."+e,t)):t==null?(i.local?bo:vo)(i):(i.local?_o:xo)(i,n,t))}function Eo(e,t){return function(i){this.setAttribute(e,t.call(this,i))}}function ko(e,t){return function(i){this.setAttributeNS(e.space,e.local,t.call(this,i))}}function No(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&ko(e,r)),i}return s._value=t,s}function Co(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&Eo(e,r)),i}return s._value=t,s}function Mo(e,t){var i="attr."+e;if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;var n=ze(e);return this.tween(i,(n.local?No:Co)(n,t))}function Ho(e,t){return function(){ei(this,e).delay=+t.apply(this,arguments)}}function Ao(e,t){return t=+t,function(){ei(this,e).delay=t}}function Po(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Ho:Ao)(t,e)):et(this.node(),t).delay}function Ro(e,t){return function(){rt(this,e).duration=+t.apply(this,arguments)}}function To(e,t){return t=+t,function(){rt(this,e).duration=t}}function Lo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Ro:To)(t,e)):et(this.node(),t).duration}function Do(e,t){if(typeof t!="function")throw new Error;return function(){rt(this,e).ease=t}}function Oo(e){var t=this._id;return arguments.length?this.each(Do(t,e)):et(this.node(),t).ease}function Fo(e,t){return function(){var i=t.apply(this,arguments);if(typeof i!="function")throw new Error;rt(this,e).ease=i}}function Io(e){if(typeof e!="function")throw new Error;return this.each(Fo(this._id,e))}function Bo(e){typeof e!="function"&&(e=Qi(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],l,h=0;h<o;++h)(l=r[h])&&e.call(l,l.__data__,h,r)&&a.push(l);return new ht(n,this._parents,this._name,this._id)}function Uo(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,i=e._groups,n=t.length,s=i.length,r=Math.min(n,s),o=new Array(n),a=0;a<r;++a)for(var l=t[a],h=i[a],d=l.length,c=o[a]=new Array(d),u,p=0;p<d;++p)(u=l[p]||h[p])&&(c[p]=u);for(;a<n;++a)o[a]=t[a];return new ht(o,this._parents,this._name,this._id)}function Xo(e){return(e+"").trim().split(/^|\s+/).every(function(t){var i=t.indexOf(".");return i>=0&&(t=t.slice(0,i)),!t||t==="start"})}function Yo(e,t,i){var n,s,r=Xo(t)?ei:rt;return function(){var o=r(this,e),a=o.on;a!==n&&(s=(n=a).copy()).on(t,i),o.on=s}}function Wo(e,t){var i=this._id;return arguments.length<2?et(this.node(),i).on.on(e):this.each(Yo(i,e,t))}function Zo(e){return function(){var t=this.parentNode;for(var i in this.__transition)if(+i!==e)return;t&&t.removeChild(this)}}function qo(){return this.on("end.remove",Zo(this._id))}function Vo(e){var t=this._name,i=this._id;typeof e!="function"&&(e=Ge(e));for(var n=this._groups,s=n.length,r=new Array(s),o=0;o<s;++o)for(var a=n[o],l=a.length,h=r[o]=new Array(l),d,c,u=0;u<l;++u)(d=a[u])&&(c=e.call(d,d.__data__,u,a))&&("__data__"in d&&(c.__data__=d.__data__),h[u]=c,Ee(h[u],t,i,u,h,et(d,i)));return new ht(r,this._parents,t,i)}function jo(e){var t=this._name,i=this._id;typeof e!="function"&&(e=Ki(e));for(var n=this._groups,s=n.length,r=[],o=[],a=0;a<s;++a)for(var l=n[a],h=l.length,d,c=0;c<h;++c)if(d=l[c]){for(var u=e.call(d,d.__data__,c,l),p,m=et(d,i),y=0,$=u.length;y<$;++y)(p=u[y])&&Ee(p,t,i,y,u,m);r.push(u),o.push(d)}return new ht(r,o,t,i)}var Go=Qt.prototype.constructor;function Ko(){return new Go(this._groups,this._parents)}function Qo(e,t){var i,n,s;return function(){var r=Ct(this,e),o=(this.style.removeProperty(e),Ct(this,e));return r===o?null:r===i&&o===n?s:s=t(i=r,n=o)}}function bn(e){return function(){this.style.removeProperty(e)}}function Jo(e,t,i){var n,s=i+"",r;return function(){var o=Ct(this,e);return o===s?null:o===n?r:r=t(n=o,i)}}function ta(e,t,i){var n,s,r;return function(){var o=Ct(this,e),a=i(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),Ct(this,e))),o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a))}}function ea(e,t){var i,n,s,r="style."+t,o="end."+r,a;return function(){var l=rt(this,e),h=l.on,d=l.value[r]==null?a||(a=bn(t)):void 0;(h!==i||s!==d)&&(n=(i=h).copy()).on(o,s=d),l.on=n}}function ia(e,t,i){var n=(e+="")=="transform"?io:vn;return t==null?this.styleTween(e,Qo(e,n)).on("end.style."+e,bn(e)):typeof t=="function"?this.styleTween(e,ta(e,n,ii(this,"style."+e,t))).each(ea(this._id,e)):this.styleTween(e,Jo(e,n,t),i).on("end.style."+e,null)}function na(e,t,i){return function(n){this.style.setProperty(e,t.call(this,n),i)}}function sa(e,t,i){var n,s;function r(){var o=t.apply(this,arguments);return o!==s&&(n=(s=o)&&na(e,o,i)),n}return r._value=t,r}function ra(e,t,i){var n="style."+(e+="");if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;return this.tween(n,sa(e,t,i??""))}function oa(e){return function(){this.textContent=e}}function aa(e){return function(){var t=e(this);this.textContent=t??""}}function la(e){return this.tween("text",typeof e=="function"?aa(ii(this,"text",e)):oa(e==null?"":e+""))}function ha(e){return function(t){this.textContent=e.call(this,t)}}function da(e){var t,i;function n(){var s=e.apply(this,arguments);return s!==i&&(t=(i=s)&&ha(s)),t}return n._value=e,n}function ca(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,da(e))}function ua(){for(var e=this._name,t=this._id,i=xn(),n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,l,h=0;h<a;++h)if(l=o[h]){var d=et(l,t);Ee(l,e,i,h,o,{time:d.time+d.delay+d.duration,delay:0,duration:d.duration,ease:d.ease})}return new ht(n,this._parents,e,i)}function fa(){var e,t,i=this,n=i._id,s=i.size();return new Promise(function(r,o){var a={value:o},l={value:function(){--s===0&&r()}};i.each(function(){var h=rt(this,n),d=h.on;d!==e&&(t=(e=d).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),h.on=t}),s===0&&r()})}var pa=0;function ht(e,t,i,n){this._groups=e,this._parents=t,this._name=i,this._id=n}function xn(){return++pa}var at=Qt.prototype;ht.prototype={constructor:ht,select:Vo,selectAll:jo,selectChild:at.selectChild,selectChildren:at.selectChildren,filter:Bo,merge:Uo,selection:Ko,transition:ua,call:at.call,nodes:at.nodes,node:at.node,size:at.size,empty:at.empty,each:at.each,on:Wo,attr:So,attrTween:Mo,style:ia,styleTween:ra,text:la,textTween:ca,remove:qo,tween:wo,delay:Po,duration:Lo,ease:Oo,easeVarying:Io,end:fa,[Symbol.iterator]:at[Symbol.iterator]};function ga(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var ma={time:null,delay:0,duration:250,ease:ga};function ya(e,t){for(var i;!(i=e.__transition)||!(i=i[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return i}function wa(e){var t,i;e instanceof ht?(t=e._id,e=e._name):(t=xn(),(i=ma).time=ti(),e=e==null?null:e+"");for(var n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,l,h=0;h<a;++h)(l=o[h])&&Ee(l,e,t,h,o,i||ya(l,t));return new ht(n,this._parents,e,t)}Qt.prototype.interrupt=go;Qt.prototype.transition=wa;const re=e=>()=>e;function va(e,{sourceEvent:t,target:i,transform:n,dispatch:s}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},transform:{value:n,enumerable:!0,configurable:!0},_:{value:s}})}function lt(e,t,i){this.k=e,this.x=t,this.y=i}lt.prototype={constructor:lt,scale:function(e){return e===1?this:new lt(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new lt(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var ke=new lt(1,0,0);_n.prototype=lt.prototype;function _n(e){for(;!e.__zoom;)if(!(e=e.parentNode))return ke;return e.__zoom}function Pe(e){e.stopImmediatePropagation()}function Lt(e){e.preventDefault(),e.stopImmediatePropagation()}function ba(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function xa(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function ki(){return this.__zoom||ke}function _a(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function $a(){return navigator.maxTouchPoints||"ontouchstart"in this}function za(e,t,i){var n=e.invertX(t[0][0])-i[0][0],s=e.invertX(t[1][0])-i[1][0],r=e.invertY(t[0][1])-i[0][1],o=e.invertY(t[1][1])-i[1][1];return e.translate(s>n?(n+s)/2:Math.min(0,n)||Math.max(0,s),o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o))}function Sa(){var e=ba,t=xa,i=za,n=_a,s=$a,r=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],a=250,l=he,h=je("start","zoom","end"),d,c,u,p=500,m=150,y=0,$=10;function w(f){f.property("__zoom",ki).on("wheel.zoom",G,{passive:!1}).on("mousedown.zoom",Q).on("dblclick.zoom",ct).filter(s).on("touchstart.zoom",Pt).on("touchmove.zoom",S).on("touchend.zoom touchcancel.zoom",M).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}w.transform=function(f,b,g,x){var z=f.selection?f.selection():f;z.property("__zoom",ki),f!==z?B(f,b,g,x):z.interrupt().each(function(){T(this,arguments).event(x).start().zoom(null,typeof b=="function"?b.apply(this,arguments):b).end()})},w.scaleBy=function(f,b,g,x){w.scaleTo(f,function(){var z=this.__zoom.k,k=typeof b=="function"?b.apply(this,arguments):b;return z*k},g,x)},w.scaleTo=function(f,b,g,x){w.transform(f,function(){var z=t.apply(this,arguments),k=this.__zoom,N=g==null?H(z):typeof g=="function"?g.apply(this,arguments):g,A=k.invert(N),R=typeof b=="function"?b.apply(this,arguments):b;return i(E(_(k,R),N,A),z,o)},g,x)},w.translateBy=function(f,b,g,x){w.transform(f,function(){return i(this.__zoom.translate(typeof b=="function"?b.apply(this,arguments):b,typeof g=="function"?g.apply(this,arguments):g),t.apply(this,arguments),o)},null,x)},w.translateTo=function(f,b,g,x,z){w.transform(f,function(){var k=t.apply(this,arguments),N=this.__zoom,A=x==null?H(k):typeof x=="function"?x.apply(this,arguments):x;return i(ke.translate(A[0],A[1]).scale(N.k).translate(typeof b=="function"?-b.apply(this,arguments):-b,typeof g=="function"?-g.apply(this,arguments):-g),k,o)},x,z)};function _(f,b){return b=Math.max(r[0],Math.min(r[1],b)),b===f.k?f:new lt(b,f.x,f.y)}function E(f,b,g){var x=b[0]-g[0]*f.k,z=b[1]-g[1]*f.k;return x===f.x&&z===f.y?f:new lt(f.k,x,z)}function H(f){return[(+f[0][0]+ +f[1][0])/2,(+f[0][1]+ +f[1][1])/2]}function B(f,b,g,x){f.on("start.zoom",function(){T(this,arguments).event(x).start()}).on("interrupt.zoom end.zoom",function(){T(this,arguments).event(x).end()}).tween("zoom",function(){var z=this,k=arguments,N=T(z,k).event(x),A=t.apply(z,k),R=g==null?H(A):typeof g=="function"?g.apply(z,k):g,Z=Math.max(A[1][0]-A[0][0],A[1][1]-A[0][1]),L=z.__zoom,q=typeof b=="function"?b.apply(z,k):b,J=l(L.invert(R).concat(Z/L.k),q.invert(R).concat(Z/q.k));return function(V){if(V===1)V=q;else{var it=J(V),Rt=Z/it[2];V=new lt(Rt,R[0]-it[0]*Rt,R[1]-it[1]*Rt)}N.zoom(null,V)}})}function T(f,b,g){return!g&&f.__zooming||new P(f,b)}function P(f,b){this.that=f,this.args=b,this.active=0,this.sourceEvent=null,this.extent=t.apply(f,b),this.taps=0}P.prototype={event:function(f){return f&&(this.sourceEvent=f),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(f,b){return this.mouse&&f!=="mouse"&&(this.mouse[1]=b.invert(this.mouse[0])),this.touch0&&f!=="touch"&&(this.touch0[1]=b.invert(this.touch0[0])),this.touch1&&f!=="touch"&&(this.touch1[1]=b.invert(this.touch1[0])),this.that.__zoom=b,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(f){var b=ft(this.that).datum();h.call(f,this.that,new va(f,{sourceEvent:this.sourceEvent,target:w,transform:this.that.__zoom,dispatch:h}),b)}};function G(f,...b){if(!e.apply(this,arguments))return;var g=T(this,b).event(f),x=this.__zoom,z=Math.max(r[0],Math.min(r[1],x.k*Math.pow(2,n.apply(this,arguments)))),k=ut(f);if(g.wheel)(g.mouse[0][0]!==k[0]||g.mouse[0][1]!==k[1])&&(g.mouse[1]=x.invert(g.mouse[0]=k)),clearTimeout(g.wheel);else{if(x.k===z)return;g.mouse=[k,x.invert(k)],ue(this),g.start()}Lt(f),g.wheel=setTimeout(N,m),g.zoom("mouse",i(E(_(x,z),g.mouse[0],g.mouse[1]),g.extent,o));function N(){g.wheel=null,g.end()}}function Q(f,...b){if(u||!e.apply(this,arguments))return;var g=f.currentTarget,x=T(this,b,!0).event(f),z=ft(f.view).on("mousemove.zoom",R,!0).on("mouseup.zoom",Z,!0),k=ut(f,g),N=f.clientX,A=f.clientY;Mr(f.view),Pe(f),x.mouse=[k,this.__zoom.invert(k)],ue(this),x.start();function R(L){if(Lt(L),!x.moved){var q=L.clientX-N,J=L.clientY-A;x.moved=q*q+J*J>y}x.event(L).zoom("mouse",i(E(x.that.__zoom,x.mouse[0]=ut(L,g),x.mouse[1]),x.extent,o))}function Z(L){z.on("mousemove.zoom mouseup.zoom",null),Hr(L.view,x.moved),Lt(L),x.event(L).end()}}function ct(f,...b){if(e.apply(this,arguments)){var g=this.__zoom,x=ut(f.changedTouches?f.changedTouches[0]:f,this),z=g.invert(x),k=g.k*(f.shiftKey?.5:2),N=i(E(_(g,k),x,z),t.apply(this,b),o);Lt(f),a>0?ft(this).transition().duration(a).call(B,N,x,f):ft(this).call(w.transform,N,x,f)}}function Pt(f,...b){if(e.apply(this,arguments)){var g=f.touches,x=g.length,z=T(this,b,f.changedTouches.length===x).event(f),k,N,A,R;for(Pe(f),N=0;N<x;++N)A=g[N],R=ut(A,this),R=[R,this.__zoom.invert(R),A.identifier],z.touch0?!z.touch1&&z.touch0[2]!==R[2]&&(z.touch1=R,z.taps=0):(z.touch0=R,k=!0,z.taps=1+!!d);d&&(d=clearTimeout(d)),k&&(z.taps<2&&(c=R[0],d=setTimeout(function(){d=null},p)),ue(this),z.start())}}function S(f,...b){if(this.__zooming){var g=T(this,b).event(f),x=f.changedTouches,z=x.length,k,N,A,R;for(Lt(f),k=0;k<z;++k)N=x[k],A=ut(N,this),g.touch0&&g.touch0[2]===N.identifier?g.touch0[0]=A:g.touch1&&g.touch1[2]===N.identifier&&(g.touch1[0]=A);if(N=g.that.__zoom,g.touch1){var Z=g.touch0[0],L=g.touch0[1],q=g.touch1[0],J=g.touch1[1],V=(V=q[0]-Z[0])*V+(V=q[1]-Z[1])*V,it=(it=J[0]-L[0])*it+(it=J[1]-L[1])*it;N=_(N,Math.sqrt(V/it)),A=[(Z[0]+q[0])/2,(Z[1]+q[1])/2],R=[(L[0]+J[0])/2,(L[1]+J[1])/2]}else if(g.touch0)A=g.touch0[0],R=g.touch0[1];else return;g.zoom("touch",i(E(N,A,R),g.extent,o))}}function M(f,...b){if(this.__zooming){var g=T(this,b).event(f),x=f.changedTouches,z=x.length,k,N;for(Pe(f),u&&clearTimeout(u),u=setTimeout(function(){u=null},p),k=0;k<z;++k)N=x[k],g.touch0&&g.touch0[2]===N.identifier?delete g.touch0:g.touch1&&g.touch1[2]===N.identifier&&delete g.touch1;if(g.touch1&&!g.touch0&&(g.touch0=g.touch1,delete g.touch1),g.touch0)g.touch0[1]=this.__zoom.invert(g.touch0[0]);else if(g.end(),g.taps===2&&(N=ut(N,this),Math.hypot(c[0]-N[0],c[1]-N[1])<$)){var A=ft(this).on("dblclick.zoom");A&&A.apply(this,arguments)}}}return w.wheelDelta=function(f){return arguments.length?(n=typeof f=="function"?f:re(+f),w):n},w.filter=function(f){return arguments.length?(e=typeof f=="function"?f:re(!!f),w):e},w.touchable=function(f){return arguments.length?(s=typeof f=="function"?f:re(!!f),w):s},w.extent=function(f){return arguments.length?(t=typeof f=="function"?f:re([[+f[0][0],+f[0][1]],[+f[1][0],+f[1][1]]]),w):t},w.scaleExtent=function(f){return arguments.length?(r[0]=+f[0],r[1]=+f[1],w):[r[0],r[1]]},w.translateExtent=function(f){return arguments.length?(o[0][0]=+f[0][0],o[1][0]=+f[1][0],o[0][1]=+f[0][1],o[1][1]=+f[1][1],w):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},w.constrain=function(f){return arguments.length?(i=f,w):i},w.duration=function(f){return arguments.length?(a=+f,w):a},w.interpolate=function(f){return arguments.length?(l=f,w):l},w.on=function(){var f=h.on.apply(h,arguments);return f===h?w:f},w.clickDistance=function(f){return arguments.length?(y=(f=+f)*f,w):Math.sqrt(y)},w.tapDistance=function(f){return arguments.length?($=+f,w):$},w}var Ni;(function(e){e.Strict="strict",e.Loose="loose"})(Ni||(Ni={}));var Xt;(function(e){e.Free="free",e.Vertical="vertical",e.Horizontal="horizontal"})(Xt||(Xt={}));var Ci;(function(e){e.Partial="partial",e.Full="full"})(Ci||(Ci={}));var Mi;(function(e){e.Bezier="default",e.Straight="straight",e.Step="step",e.SmoothStep="smoothstep",e.SimpleBezier="simplebezier"})(Mi||(Mi={}));var Hi;(function(e){e.Arrow="arrow",e.ArrowClosed="arrowclosed"})(Hi||(Hi={}));exports.Position=void 0;(function(e){e.Left="left",e.Top="top",e.Right="right",e.Bottom="bottom"})(exports.Position||(exports.Position={}));exports.Position.Left+"",exports.Position.Right,exports.Position.Right+"",exports.Position.Left,exports.Position.Top+"",exports.Position.Bottom,exports.Position.Bottom+"",exports.Position.Top;const Ea=(e,t=0,i=1)=>Math.min(Math.max(e,t),i),Ai=e=>!isNaN(e)&&isFinite(e),$n=()=>typeof navigator<"u"&&navigator?.userAgent?.indexOf("Mac")>=0;function ka({sourceX:e,sourceY:t,targetX:i,targetY:n,sourceControlX:s,sourceControlY:r,targetControlX:o,targetControlY:a}){const l=e*.125+s*.375+o*.375+i*.125,h=t*.125+r*.375+a*.375+n*.125,d=Math.abs(l-e),c=Math.abs(h-t);return[l,h,d,c]}function oe(e,t){return e>=0?.5*e:t*25*Math.sqrt(-e)}function Pi({pos:e,x1:t,y1:i,x2:n,y2:s,c:r}){switch(e){case exports.Position.Left:return[t-oe(t-n,r),i];case exports.Position.Right:return[t+oe(n-t,r),i];case exports.Position.Top:return[t,i-oe(i-s,r)];case exports.Position.Bottom:return[t,i+oe(s-i,r)]}}function Na({sourceX:e,sourceY:t,sourcePosition:i=exports.Position.Bottom,targetX:n,targetY:s,targetPosition:r=exports.Position.Top,curvature:o=.25}){const[a,l]=Pi({pos:i,x1:e,y1:t,x2:n,y2:s,c:o}),[h,d]=Pi({pos:r,x1:n,y1:s,x2:e,y2:t,c:o}),[c,u,p,m]=ka({sourceX:e,sourceY:t,targetX:n,targetY:s,sourceControlX:a,sourceControlY:l,targetControlX:h,targetControlY:d});return[`M${e},${t} C${a},${l} ${h},${d} ${n},${s}`,c,u,p,m]}function zn({sourceX:e,sourceY:t,targetX:i,targetY:n}){const s=Math.abs(i-e)/2,r=i<e?i+s:i-s,o=Math.abs(n-t)/2,a=n<t?n+o:n-o;return[r,a,s,o]}function Ca({sourceX:e,sourceY:t,targetX:i,targetY:n}){const[s,r,o,a]=zn({sourceX:e,sourceY:t,targetX:i,targetY:n});return[`M ${e},${t}L ${i},${n}`,s,r,o,a]}const Ri={[exports.Position.Left]:{x:-1,y:0},[exports.Position.Right]:{x:1,y:0},[exports.Position.Top]:{x:0,y:-1},[exports.Position.Bottom]:{x:0,y:1}},Ma=({source:e,sourcePosition:t=exports.Position.Bottom,target:i})=>t===exports.Position.Left||t===exports.Position.Right?e.x<i.x?{x:1,y:0}:{x:-1,y:0}:e.y<i.y?{x:0,y:1}:{x:0,y:-1},Ti=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function Ha({source:e,sourcePosition:t=exports.Position.Bottom,target:i,targetPosition:n=exports.Position.Top,center:s,offset:r,stepPosition:o}){const a=Ri[t],l=Ri[n],h={x:e.x+a.x*r,y:e.y+a.y*r},d={x:i.x+l.x*r,y:i.y+l.y*r},c=Ma({source:h,sourcePosition:t,target:d}),u=c.x!==0?"x":"y",p=c[u];let m=[],y,$;const w={x:0,y:0},_={x:0,y:0},[,,E,H]=zn({sourceX:e.x,sourceY:e.y,targetX:i.x,targetY:i.y});if(a[u]*l[u]===-1){u==="x"?(y=s.x??h.x+(d.x-h.x)*o,$=s.y??(h.y+d.y)/2):(y=s.x??(h.x+d.x)/2,$=s.y??h.y+(d.y-h.y)*o);const T=[{x:y,y:h.y},{x:y,y:d.y}],P=[{x:h.x,y:$},{x:d.x,y:$}];a[u]===p?m=u==="x"?T:P:m=u==="x"?P:T}else{const T=[{x:h.x,y:d.y}],P=[{x:d.x,y:h.y}];if(u==="x"?m=a.x===p?P:T:m=a.y===p?T:P,t===n){const S=Math.abs(e[u]-i[u]);if(S<=r){const M=Math.min(r-1,r-S);a[u]===p?w[u]=(h[u]>e[u]?-1:1)*M:_[u]=(d[u]>i[u]?-1:1)*M}}if(t!==n){const S=u==="x"?"y":"x",M=a[u]===l[S],f=h[S]>d[S],b=h[S]<d[S];(a[u]===1&&(!M&&f||M&&b)||a[u]!==1&&(!M&&b||M&&f))&&(m=u==="x"?T:P)}const G={x:h.x+w.x,y:h.y+w.y},Q={x:d.x+_.x,y:d.y+_.y},ct=Math.max(Math.abs(G.x-m[0].x),Math.abs(Q.x-m[0].x)),Pt=Math.max(Math.abs(G.y-m[0].y),Math.abs(Q.y-m[0].y));ct>=Pt?(y=(G.x+Q.x)/2,$=m[0].y):(y=m[0].x,$=(G.y+Q.y)/2)}return[[e,{x:h.x+w.x,y:h.y+w.y},...m,{x:d.x+_.x,y:d.y+_.y},i],y,$,E,H]}function Aa(e,t,i,n){const s=Math.min(Ti(e,t)/2,Ti(t,i)/2,n),{x:r,y:o}=t;if(e.x===r&&r===i.x||e.y===o&&o===i.y)return`L${r} ${o}`;if(e.y===o){const h=e.x<i.x?-1:1,d=e.y<i.y?1:-1;return`L ${r+s*h},${o}Q ${r},${o} ${r},${o+s*d}`}const a=e.x<i.x?1:-1,l=e.y<i.y?-1:1;return`L ${r},${o+s*l}Q ${r},${o} ${r+s*a},${o}`}function Pa({sourceX:e,sourceY:t,sourcePosition:i=exports.Position.Bottom,targetX:n,targetY:s,targetPosition:r=exports.Position.Top,borderRadius:o=5,centerX:a,centerY:l,offset:h=20,stepPosition:d=.5}){const[c,u,p,m,y]=Ha({source:{x:e,y:t},sourcePosition:i,target:{x:n,y:s},targetPosition:r,center:{x:a,y:l},offset:h,stepPosition:d});return[c.reduce((w,_,E)=>{let H="";return E>0&&E<c.length-1?H=Aa(c[E-1],_,c[E+1],o):H=`${E===0?"M":"L"}${_.x} ${_.y}`,w+=H,w},""),u,p,m,y]}const Ra=(e,t)=>e.x!==t.x||e.y!==t.y||e.zoom!==t.k,Ne=e=>({x:e.x,y:e.y,zoom:e.k}),Re=({x:e,y:t,zoom:i})=>ke.translate(e,t).scale(i),kt=(e,t)=>e.target.closest(`.${t}`),Sn=(e,t)=>t===2&&Array.isArray(e)&&e.includes(2),Ta=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,Te=(e,t=0,i=Ta,n=()=>{})=>{const s=typeof t=="number"&&t>0;return s||n(),s?e.transition().duration(t).ease(i).on("end",n):e},En=e=>{const t=e.ctrlKey&&$n()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*t};function La({zoomPanValues:e,noWheelClassName:t,d3Selection:i,d3Zoom:n,panOnScrollMode:s,panOnScrollSpeed:r,zoomOnPinch:o,onPanZoomStart:a,onPanZoom:l,onPanZoomEnd:h}){return d=>{if(kt(d,t))return d.ctrlKey&&d.preventDefault(),!1;d.preventDefault(),d.stopImmediatePropagation();const c=i.property("__zoom").k||1;if(d.ctrlKey&&o){const $=ut(d),w=En(d),_=c*Math.pow(2,w);n.scaleTo(i,_,$,d);return}const u=d.deltaMode===1?20:1;let p=s===Xt.Vertical?0:d.deltaX*u,m=s===Xt.Horizontal?0:d.deltaY*u;!$n()&&d.shiftKey&&s!==Xt.Vertical&&(p=d.deltaY*u,m=0),n.translateBy(i,-(p/c)*r,-(m/c)*r,{internal:!0});const y=Ne(i.property("__zoom"));clearTimeout(e.panScrollTimeout),e.isPanScrolling||(e.isPanScrolling=!0),e.isPanScrolling&&(l?.(d,y),e.panScrollTimeout=setTimeout(()=>{e.isPanScrolling=!1},150))}}function Da({noWheelClassName:e,preventScrolling:t,d3ZoomHandler:i}){return function(n,s){const r=n.type==="wheel",o=!t&&r&&!n.ctrlKey,a=kt(n,e);if(n.ctrlKey&&r&&a&&n.preventDefault(),o||a)return null;n.preventDefault(),i.call(this,n,s)}}function Oa({zoomPanValues:e,onDraggingChange:t,onPanZoomStart:i}){return n=>{if(n.sourceEvent?.internal)return;const s=Ne(n.transform);e.mouseButton=n.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=s,n.sourceEvent?.type==="mousedown"&&t(!0),i&&i?.(n.sourceEvent,s)}}function Fa({zoomPanValues:e,panOnDrag:t,onPaneContextMenu:i,onTransformChange:n,onPanZoom:s}){return r=>{e.usedRightMouseButton=!!(i&&Sn(t,e.mouseButton??0)),r.sourceEvent?.sync||n([r.transform.x,r.transform.y,r.transform.k]),s&&!r.sourceEvent?.internal&&s?.(r.sourceEvent,Ne(r.transform))}}function Ia({zoomPanValues:e,panOnDrag:t,panOnScroll:i,onDraggingChange:n,onPanZoomEnd:s,onPaneContextMenu:r}){return o=>{if(!o.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,r&&Sn(t,e.mouseButton??0)&&!e.usedRightMouseButton&&o.sourceEvent&&r(o.sourceEvent),e.usedRightMouseButton=!1,n(!1),s&&Ra(e.prevViewport,o.transform))){const a=Ne(o.transform);e.prevViewport=a,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{s?.(o.sourceEvent,a)},i?150:0)}}}function Ba({zoomActivationKeyPressed:e,zoomOnScroll:t,zoomOnPinch:i,panOnDrag:n,panOnScroll:s,zoomOnDoubleClick:r,userSelectionActive:o,noWheelClassName:a,noPanClassName:l,lib:h,connectionInProgress:d}){return c=>{const u=e||t,p=i&&c.ctrlKey,m=c.type==="wheel";if(c.button===1&&c.type==="mousedown"&&(kt(c,`${h}-flow__node`)||kt(c,`${h}-flow__edge`)))return!0;if(!n&&!u&&!s&&!r&&!i||o||d&&!m||kt(c,a)&&m||kt(c,l)&&(!m||s&&m&&!e)||!i&&c.ctrlKey&&m)return!1;if(!i&&c.type==="touchstart"&&c.touches?.length>1)return c.preventDefault(),!1;if(!u&&!s&&!p&&m||!n&&(c.type==="mousedown"||c.type==="touchstart")||Array.isArray(n)&&!n.includes(c.button)&&c.type==="mousedown")return!1;const y=Array.isArray(n)&&n.includes(c.button)||!c.button||c.button<=1;return(!c.ctrlKey||m)&&y}}function Ua({domNode:e,minZoom:t,maxZoom:i,paneClickDistance:n,translateExtent:s,viewport:r,onPanZoom:o,onPanZoomStart:a,onPanZoomEnd:l,onDraggingChange:h}){const d={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{x:0,y:0,zoom:0},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},c=e.getBoundingClientRect(),u=Sa().clickDistance(!Ai(n)||n<0?0:n).scaleExtent([t,i]).translateExtent(s),p=ft(e).call(u);E({x:r.x,y:r.y,zoom:Ea(r.zoom,t,i)},[[0,0],[c.width,c.height]],s);const m=p.on("wheel.zoom"),y=p.on("dblclick.zoom");u.wheelDelta(En);function $(S,M){return p?new Promise(f=>{u?.interpolate(M?.interpolate==="linear"?Ut:he).transform(Te(p,M?.duration,M?.ease,()=>f(!0)),S)}):Promise.resolve(!1)}function w({noWheelClassName:S,noPanClassName:M,onPaneContextMenu:f,userSelectionActive:b,panOnScroll:g,panOnDrag:x,panOnScrollMode:z,panOnScrollSpeed:k,preventScrolling:N,zoomOnPinch:A,zoomOnScroll:R,zoomOnDoubleClick:Z,zoomActivationKeyPressed:L,lib:q,onTransformChange:J,connectionInProgress:V}){b&&!d.isZoomingOrPanning&&_();const Rt=g&&!L&&!b?La({zoomPanValues:d,noWheelClassName:S,d3Selection:p,d3Zoom:u,panOnScrollMode:z,panOnScrollSpeed:k,zoomOnPinch:A,onPanZoomStart:a,onPanZoom:o,onPanZoomEnd:l}):Da({noWheelClassName:S,preventScrolling:N,d3ZoomHandler:m});if(p.on("wheel.zoom",Rt,{passive:!1}),!b){const Wn=Oa({zoomPanValues:d,onDraggingChange:h,onPanZoomStart:a});u.on("start",Wn);const Zn=Fa({zoomPanValues:d,panOnDrag:x,onPaneContextMenu:!!f,onPanZoom:o,onTransformChange:J});u.on("zoom",Zn);const qn=Ia({zoomPanValues:d,panOnDrag:x,panOnScroll:g,onPaneContextMenu:f,onPanZoomEnd:l,onDraggingChange:h});u.on("end",qn)}const Yn=Ba({zoomActivationKeyPressed:L,panOnDrag:x,zoomOnScroll:R,panOnScroll:g,zoomOnDoubleClick:Z,zoomOnPinch:A,userSelectionActive:b,noPanClassName:M,noWheelClassName:S,lib:q,connectionInProgress:V});u.filter(Yn),Z?p.on("dblclick.zoom",y):p.on("dblclick.zoom",null)}function _(){u.on("zoom",null)}async function E(S,M,f){const b=Re(S),g=u?.constrain()(b,M,f);return g&&await $(g),new Promise(x=>x(g))}async function H(S,M){const f=Re(S);return await $(f,M),new Promise(b=>b(f))}function B(S){if(p){const M=Re(S),f=p.property("__zoom");(f.k!==S.zoom||f.x!==S.x||f.y!==S.y)&&u?.transform(p,M,null,{sync:!0})}}function T(){const S=p?_n(p.node()):{x:0,y:0,k:1};return{x:S.x,y:S.y,zoom:S.k}}function P(S,M){return p?new Promise(f=>{u?.interpolate(M?.interpolate==="linear"?Ut:he).scaleTo(Te(p,M?.duration,M?.ease,()=>f(!0)),S)}):Promise.resolve(!1)}function G(S,M){return p?new Promise(f=>{u?.interpolate(M?.interpolate==="linear"?Ut:he).scaleBy(Te(p,M?.duration,M?.ease,()=>f(!0)),S)}):Promise.resolve(!1)}function Q(S){u?.scaleExtent(S)}function ct(S){u?.translateExtent(S)}function Pt(S){const M=!Ai(S)||S<0?0:S;u?.clickDistance(M)}return{update:w,destroy:_,setViewport:H,setViewportConstrained:E,getViewport:T,scaleTo:P,scaleBy:G,setScaleExtent:Q,setTranslateExtent:ct,syncViewport:B,setClickDistance:Pt}}var Li;(function(e){e.Line="line",e.Handle="handle"})(Li||(Li={}));class kn{constructor(t={}){this.container=null,this.state={nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},this.subscribers=new Set,this.panZoomInstance=null,this.notifyScheduled=!1,this.pendingFit=null,this.fitFallbackTimer=null,this.didInitFit=!1,this.renderToken=0,this.settledToken=-1,this.renderCompleteCallbacks=new Set,this.panZoomUpdateOptions=null,this.options={minZoom:.5,maxZoom:2,defaultZoom:1,nodesDraggable:!0,nodesConnectable:!0,elementsSelectable:!0,...t},this.state.nodes=t.nodes||[],this.state.edges=t.edges||[],this.updateLookups()}mount(t){this.container=t,this.panZoomInstance=Ua({domNode:t,minZoom:this.options.minZoom||.5,maxZoom:this.options.maxZoom||2,paneClickDistance:0,translateExtent:[[-1/0,-1/0],[1/0,1/0]],viewport:this.state.viewport,onDraggingChange:i=>{this.container?.classList.toggle("panning",i)},onPanZoom:(i,n)=>{this.state.viewport=n,this.notifySubscribers()},onPanZoomStart:(i,n)=>{},onPanZoomEnd:(i,n)=>{}}),this.panZoomUpdateOptions={noWheelClassName:"nowheel",noPanClassName:"nopan",onPaneContextMenu:void 0,preventScrolling:!0,panOnScroll:!0,panOnDrag:!0,panOnScrollMode:"free",panOnScrollSpeed:.8,userSelectionActive:!1,zoomOnPinch:!0,zoomOnScroll:!0,zoomOnDoubleClick:this.options.zoomOnDoubleClick??!1,zoomActivationKeyPressed:!1,lib:"lit-flow",onTransformChange:i=>{},connectionInProgress:!1},this.panZoomInstance.update(this.panZoomUpdateOptions),this.maybeInitFit(),this.notifySubscribers()}setPanOnDrag(t){this.panZoomInstance&&this.panZoomUpdateOptions&&(this.panZoomUpdateOptions={...this.panZoomUpdateOptions,panOnDrag:t},this.panZoomInstance.update(this.panZoomUpdateOptions))}destroy(){this.clearFitFallback(),this.pendingFit=null,this.panZoomInstance?.destroy(),this.panZoomInstance=null,this.container=null,this.subscribers.clear(),this.renderCompleteCallbacks.clear()}getState(){return this.state}get nodes(){return this.state.nodes}get edges(){return this.state.edges}getViewport(){return this.state.viewport}setViewport(t){this.state.viewport=t,this.panZoomInstance?.setViewport?.(t),this.notifySubscribers()}setNodes(t){this.state.nodes=t,this.updateLookups(),this.armRender(),this.maybeInitFit(),this.notifySubscribers()}setEdges(t){this.state.edges=t,this.updateLookups(),this.armRender(),this.notifySubscribers()}updateNode(t,i){this.state.nodes=this.state.nodes.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}updateEdge(t,i){this.state.edges=this.state.edges.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}addNode(t){const i=t.position?t:{...t,position:this.getAutoNodePosition(t)};this.state.nodes=[...this.state.nodes,i],this.updateLookups(),this.armRender(),this.notifySubscribers()}removeNode(t){this.state.nodes=this.state.nodes.filter(i=>i.id!==t),this.state.edges=this.state.edges.filter(i=>i.source!==t&&i.target!==t),this.updateLookups(),this.armRender(),this.notifySubscribers()}addEdge(t){this.state.edges=[...this.state.edges,t],this.updateLookups(),this.armRender(),this.notifySubscribers()}removeEdge(t){this.state.edges=this.state.edges.filter(i=>i.id!==t),this.updateLookups(),this.armRender(),this.notifySubscribers()}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}onRenderComplete(t){return this.renderCompleteCallbacks.add(t),()=>this.renderCompleteCallbacks.delete(t)}zoomIn(){const t=this.state.viewport.zoom,i=Math.min(t*1.2,this.options.maxZoom||2);this.setViewport({...this.state.viewport,zoom:i})}zoomOut(){const t=this.state.viewport.zoom,i=Math.max(t/1.2,this.options.minZoom||.5);this.setViewport({...this.state.viewport,zoom:i})}fitView(t){const i=t?.padding??50;if(this.state.nodes.length===0||!this.container)return;if(t?.awaitMeasure&&!this.canFitAccurately()){this.pendingFit={padding:i},this.scheduleFitFallback();return}const n=this.container.clientWidth,s=this.container.clientHeight;if(n<=0||s<=0){this.pendingFit={padding:i},this.scheduleFitFallback();return}let r=1/0,o=1/0,a=-1/0,l=-1/0;this.state.nodes.forEach(_=>{const{width:E,height:H}=this.getNodeSize(_);r=Math.min(r,_.position.x),o=Math.min(o,_.position.y),a=Math.max(a,_.position.x+E),l=Math.max(l,_.position.y+H)});const h=Math.max(a-r,1),d=Math.max(l-o,1),c=this.options.minZoom??.5,u=this.options.maxZoom??2,p=(n-i*2)/h,m=(s-i*2)/d;let y=Math.min(p,m,u);y=Math.max(y,c),(!isFinite(y)||y<=0)&&(y=1);const $=(n-h*y)/2-r*y,w=(s-d*y)/2-o*y;this.clearFitFallback(),this.pendingFit=null,this.setViewport({x:$,y:w,zoom:y})}getNodeSize(t){const i=t.data,n=t.measured?.width??t.width??i?.size?.width??150,s=t.measured?.height??t.height??i?.size?.height??50;return{width:n,height:s}}canFitAccurately(){return!this.container||this.container.clientWidth<=0||this.container.clientHeight<=0?!1:this.areNodesMeasured()}areNodesMeasured(){return this.state.nodes.every(t=>t.measured?.width!=null||typeof t.width=="number"||t.type==="shape"||t.data?.size)}armRender(){this.renderToken++}maybeEmitRenderComplete(){if(this.renderCompleteCallbacks.size===0||this.settledToken===this.renderToken||this.state.nodes.length>0&&!this.areNodesMeasured())return;this.settledToken=this.renderToken;const t=typeof requestAnimationFrame<"u"?i=>requestAnimationFrame(i):i=>{setTimeout(i,16)};t(()=>t(()=>{this.settledToken===this.renderToken&&this.renderCompleteCallbacks.forEach(i=>i(this.state))}))}maybeRunPendingFit(){if(!this.pendingFit||!this.canFitAccurately())return;const{padding:t}=this.pendingFit;this.pendingFit=null,this.clearFitFallback(),this.fitView({padding:t})}scheduleFitFallback(){this.fitFallbackTimer==null&&(this.fitFallbackTimer=setTimeout(()=>{if(this.fitFallbackTimer=null,!this.pendingFit)return;const{padding:t}=this.pendingFit;this.pendingFit=null,this.container&&this.container.clientWidth>0&&this.container.clientHeight>0&&this.fitView({padding:t})},400))}clearFitFallback(){this.fitFallbackTimer!=null&&(clearTimeout(this.fitFallbackTimer),this.fitFallbackTimer=null)}maybeInitFit(){this.didInitFit||(this.options.fitViewOnInit||this.options.fitView)&&(!this.container||this.state.nodes.length===0||(this.didInitFit=!0,this.fitView({awaitMeasure:!0})))}updateLookups(){this.state.nodeLookup.clear(),this.state.nodes.forEach(t=>{const i={...t,measured:t.measured||{width:t.width,height:t.height},internals:{positionAbsolute:t.position,z:t.zIndex||0,userNode:t}};this.state.nodeLookup.set(t.id,i)}),this.state.edgeLookup.clear(),this.state.edges.forEach(t=>{this.state.edgeLookup.set(t.id,t)})}getAutoNodePosition(t){const i=this.state.viewport,n=i.zoom||1,s=t?.measured?.width||t?.width||150,r=t?.measured?.height||t?.height||50;if(!this.container){const _=this.state.nodes[this.state.nodes.length-1];if(!_)return{x:0,y:0};const E=_.measured?.width||_.width||150;return{x:_.position.x+E+40,y:_.position.y}}const o=(this.container.clientWidth/2-i.x)/n,a=(this.container.clientHeight/2-i.y)/n,l=o-s/2,h=a-r/2,d=this.options.snapToGrid?this.options.snapGrid?.[0]??20:20,c=900,u=_=>{const E={x:_.x,y:_.y,w:s,h:r};return this.state.nodes.some(H=>{const B=H.measured?.width||H.width||150,T=H.measured?.height||H.height||50,P={x:H.position.x,y:H.position.y,w:B,h:T};return!(E.x+E.w<=P.x||P.x+P.w<=E.x||E.y+E.h<=P.y||P.y+P.h<=E.y)})};let p=0,m=0,y=0,$=-1;for(let _=0;_<c;_++){const E={x:l+p*d,y:h+m*d};if(!u(E))return this.options.snapToGrid?this.snapPositionToGrid(E):E;if(p===m||p<0&&p===-m||p>0&&p===1-m){const H=y;y=-$,$=H}p+=y,m+=$}const w={x:l,y:h};return this.options.snapToGrid?this.snapPositionToGrid(w):w}snapPositionToGrid(t){const[i,n]=this.options.snapGrid??[20,20];return{x:Math.round(t.x/i)*i,y:Math.round(t.y/n)*n}}notifySubscribers(){this.notifyScheduled||(this.notifyScheduled=!0,queueMicrotask(()=>{this.notifyScheduled=!1,this.maybeRunPendingFit(),this.subscribers.forEach(t=>t(this.state)),this.maybeEmitRenderComplete()}))}}function Xa(e={}){const t={nodes:e.nodes||[],edges:e.edges||[],viewport:e.viewport||{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},i=new Set,n=()=>{t.nodeLookup.clear(),t.nodes.forEach(s=>{const r={...s,measured:s.measured||{width:s.width,height:s.height},internals:{positionAbsolute:s.position,z:s.zIndex||0,userNode:s}};t.nodeLookup.set(s.id,r)}),t.edgeLookup.clear(),t.edges.forEach(s=>{t.edgeLookup.set(s.id,s)})};return n(),{getState:()=>t,setState:s=>{Object.assign(t,s),n(),i.forEach(r=>r(t))},subscribe:s=>(i.add(s),()=>i.delete(s))}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fe=globalThis,ni=fe.ShadowRoot&&(fe.ShadyCSS===void 0||fe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,si=Symbol(),Di=new WeakMap;let Nn=class{constructor(t,i,n){if(this._$cssResult$=!0,n!==si)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(ni&&t===void 0){const n=i!==void 0&&i.length===1;n&&(t=Di.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Di.set(i,t))}return t}toString(){return this.cssText}};const Ya=e=>new Nn(typeof e=="string"?e:e+"",void 0,si),U=(e,...t)=>{const i=e.length===1?e[0]:t.reduce(((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1]),e[0]);return new Nn(i,e,si)},Wa=(e,t)=>{if(ni)e.adoptedStyleSheets=t.map((i=>i instanceof CSSStyleSheet?i:i.styleSheet));else for(const i of t){const n=document.createElement("style"),s=fe.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=i.cssText,e.appendChild(n)}},Oi=ni?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const n of t.cssRules)i+=n.cssText;return Ya(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Za,defineProperty:qa,getOwnPropertyDescriptor:Va,getOwnPropertyNames:ja,getOwnPropertySymbols:Ga,getPrototypeOf:Ka}=Object,Ce=globalThis,Fi=Ce.trustedTypes,Qa=Fi?Fi.emptyScript:"",Ja=Ce.reactiveElementPolyfillSupport,Yt=(e,t)=>e,xe={toAttribute(e,t){switch(t){case Boolean:e=e?Qa:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},ri=(e,t)=>!Za(e,t),Ii={attribute:!0,type:String,converter:xe,reflect:!1,useDefault:!1,hasChanged:ri};Symbol.metadata??=Symbol("metadata"),Ce.litPropertyMetadata??=new WeakMap;let Et=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Ii){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(t,n,i);s!==void 0&&qa(this.prototype,t,s)}}static getPropertyDescriptor(t,i,n){const{get:s,set:r}=Va(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:s,set(o){const a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ii}static _$Ei(){if(this.hasOwnProperty(Yt("elementProperties")))return;const t=Ka(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Yt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Yt("properties"))){const i=this.properties,n=[...ja(i),...Ga(i)];for(const s of n)this.createProperty(s,i[s])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[n,s]of i)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[i,n]of this.elementProperties){const s=this._$Eu(i,n);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const s of n)i.unshift(Oi(s))}else t!==void 0&&i.push(Oi(t));return i}static _$Eu(t,i){const n=i.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const n of i.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Wa(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,n){this._$AK(t,n)}_$ET(t,i){const n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:xe).toAttribute(i,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,i){const n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:xe;this._$Em=s;const a=o.fromAttribute(i,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,i,n){if(t!==void 0){const s=this.constructor,r=this[t];if(n??=s.getPropertyOptions(t),!((n.hasChanged??ri)(r,i)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,i,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??i??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(i=void 0),this._$AL.set(t,i)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach((n=>n.hostUpdate?.())),this.update(i)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach((i=>i.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};Et.elementStyles=[],Et.shadowRootOptions={mode:"open"},Et[Yt("elementProperties")]=new Map,Et[Yt("finalized")]=new Map,Ja?.({ReactiveElement:Et}),(Ce.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oi=globalThis,_e=oi.trustedTypes,Bi=_e?_e.createPolicy("lit-html",{createHTML:e=>e}):void 0,Cn="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,Mn="?"+pt,tl=`<${Mn}>`,$t=document,Vt=()=>$t.createComment(""),jt=e=>e===null||typeof e!="object"&&typeof e!="function",ai=Array.isArray,el=e=>ai(e)||typeof e?.[Symbol.iterator]=="function",Le=`[ 	
\f\r]`,Dt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ui=/-->/g,Xi=/>/g,mt=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yi=/'/g,Wi=/"/g,Hn=/^(?:script|style|textarea|title)$/i,An=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),C=An(1),K=An(2),gt=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),Zi=new WeakMap,vt=$t.createTreeWalker($t,129);function Pn(e,t){if(!ai(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Bi!==void 0?Bi.createHTML(t):t}const il=(e,t)=>{const i=e.length-1,n=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=Dt;for(let a=0;a<i;a++){const l=e[a];let h,d,c=-1,u=0;for(;u<l.length&&(o.lastIndex=u,d=o.exec(l),d!==null);)u=o.lastIndex,o===Dt?d[1]==="!--"?o=Ui:d[1]!==void 0?o=Xi:d[2]!==void 0?(Hn.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=mt):d[3]!==void 0&&(o=mt):o===mt?d[0]===">"?(o=s??Dt,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,h=d[1],o=d[3]===void 0?mt:d[3]==='"'?Wi:Yi):o===Wi||o===Yi?o=mt:o===Ui||o===Xi?o=Dt:(o=mt,s=void 0);const p=o===mt&&e[a+1].startsWith("/>")?" ":"";r+=o===Dt?l+tl:c>=0?(n.push(h),l.slice(0,c)+Cn+l.slice(c)+pt+p):l+pt+(c===-2?a:p)}return[Pn(e,r+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]};class Gt{constructor({strings:t,_$litType$:i},n){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[h,d]=il(t,i);if(this.el=Gt.createElement(h,n),vt.currentNode=this.el.content,i===2||i===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=vt.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(Cn)){const u=d[o++],p=s.getAttribute(c).split(pt),m=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:m[2],strings:p,ctor:m[1]==="."?sl:m[1]==="?"?rl:m[1]==="@"?ol:Me}),s.removeAttribute(c)}else c.startsWith(pt)&&(l.push({type:6,index:r}),s.removeAttribute(c));if(Hn.test(s.tagName)){const c=s.textContent.split(pt),u=c.length-1;if(u>0){s.textContent=_e?_e.emptyScript:"";for(let p=0;p<u;p++)s.append(c[p],Vt()),vt.nextNode(),l.push({type:2,index:++r});s.append(c[u],Vt())}}}else if(s.nodeType===8)if(s.data===Mn)l.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(pt,c+1))!==-1;)l.push({type:7,index:r}),c+=pt.length-1}r++}}static createElement(t,i){const n=$t.createElement("template");return n.innerHTML=t,n}}function Ht(e,t,i=e,n){if(t===gt)return t;let s=n!==void 0?i._$Co?.[n]:i._$Cl;const r=jt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,i,n)),n!==void 0?(i._$Co??=[])[n]=s:i._$Cl=s),s!==void 0&&(t=Ht(e,s._$AS(e,t.values),s,n)),t}let nl=class{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:n}=this._$AD,s=(t?.creationScope??$t).importNode(i,!0);vt.currentNode=s;let r=vt.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new At(r,r.nextSibling,this,t):l.type===1?h=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(h=new al(r,this,t)),this._$AV.push(h),l=n[++a]}o!==l?.index&&(r=vt.nextNode(),o++)}return vt.currentNode=$t,s}p(t){let i=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,i),i+=n.strings.length-2):n._$AI(t[i])),i++}};class At{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,n,s){this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Ht(this,t,i),jt(t)?t===O||t==null||t===""?(this._$AH!==O&&this._$AR(),this._$AH=O):t!==this._$AH&&t!==gt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):el(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==O&&jt(this._$AH)?this._$AA.nextSibling.data=t:this.T($t.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Gt.createElement(Pn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(i);else{const r=new nl(s,this),o=r.u(this.options);r.p(i),this.T(o),this._$AH=r}}_$AC(t){let i=Zi.get(t.strings);return i===void 0&&Zi.set(t.strings,i=new Gt(t)),i}k(t){ai(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const r of t)s===i.length?i.push(n=new At(this.O(Vt()),this.O(Vt()),this,this.options)):n=i[s],n._$AI(r),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Me{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,n,s,r){this.type=1,this._$AH=O,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=O}_$AI(t,i=this,n,s){const r=this.strings;let o=!1;if(r===void 0)t=Ht(this,t,i,0),o=!jt(t)||t!==this._$AH&&t!==gt,o&&(this._$AH=t);else{const a=t;let l,h;for(t=r[0],l=0;l<r.length-1;l++)h=Ht(this,a[n+l],i,l),h===gt&&(h=this._$AH[l]),o||=!jt(h)||h!==this._$AH[l],h===O?t=O:t!==O&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}o&&!s&&this.j(t)}j(t){t===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class sl extends Me{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===O?void 0:t}}class rl extends Me{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==O)}}class ol extends Me{constructor(t,i,n,s,r){super(t,i,n,s,r),this.type=5}_$AI(t,i=this){if((t=Ht(this,t,i,0)??O)===gt)return;const n=this._$AH,s=t===O&&n!==O||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==O&&(n===O||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class al{constructor(t,i,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ht(this,t)}}const ll={I:At},hl=oi.litHtmlPolyfillSupport;hl?.(Gt,At),(oi.litHtmlVersions??=[]).push("3.3.1");const Rn=(e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(s===void 0){const r=i?.renderBefore??null;n._$litPart$=s=new At(t.insertBefore(Vt(),r),r,void 0,i??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const li=globalThis;let F=class extends Et{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rn(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return gt}};F._$litElement$=!0,F.finalized=!0,li.litElementHydrateSupport?.({LitElement:F});const dl=li.litElementPolyfillSupport;dl?.({LitElement:F});(li.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tn=Symbol.for(""),cl=e=>{if(e?.r===Tn)return e?._$litStatic$},ae=e=>({_$litStatic$:e,r:Tn}),qi=new Map,ul=e=>(t,...i)=>{const n=i.length;let s,r;const o=[],a=[];let l,h=0,d=!1;for(;h<n;){for(l=t[h];h<n&&(r=i[h],(s=cl(r))!==void 0);)l+=s+t[++h],d=!0;h!==n&&a.push(r),o.push(l),h++}if(h===n&&o.push(t[n]),d){const c=o.join("$$lit$$");(t=qi.get(c))===void 0&&(o.raw=o,qi.set(c,t=o)),i=a}return e(t,...i)},X=ul(C);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=e=>(t,i)=>{i!==void 0?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fl={attribute:!0,type:String,converter:xe,reflect:!1,hasChanged:ri},pl=(e=fl,t,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),n==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),n==="accessor"){const{name:o}=i;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,e)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(n==="setter"){const{name:o}=i;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,e)}}throw Error("Unsupported decorator location: "+n)};function v(e){return(t,i)=>typeof i=="object"?pl(e,t,i):((n,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ln={ATTRIBUTE:1,CHILD:2},Dn=e=>(...t)=>({_$litDirective$:e,values:t});let On=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,n){this._$Ct=t,this._$AM=i,this._$Ci=n}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fn="important",gl=" !"+Fn,ml=Dn(class extends On{constructor(e){if(super(e),e.type!==Ln.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const n=e[i];return n==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`}),"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in t){const s=t[n];if(s!=null){this.ft.add(n);const r=typeof s=="string"&&s.endsWith(gl);n.includes("-")||r?i.setProperty(n,r?s.slice(0,-11):s,r?Fn:""):i[n]=s}}return gt}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:yl}=ll,Vi=()=>document.createComment(""),Ot=(e,t,i)=>{const n=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(i===void 0){const r=n.insertBefore(Vi(),s),o=n.insertBefore(Vi(),s);i=new yl(r,o,e,e.options)}else{const r=i._$AB.nextSibling,o=i._$AM,a=o!==e;if(a){let l;i._$AQ?.(e),i._$AM=e,i._$AP!==void 0&&(l=e._$AU)!==o._$AU&&i._$AP(l)}if(r!==s||a){let l=i._$AA;for(;l!==r;){const h=l.nextSibling;n.insertBefore(l,s),l=h}}}return i},yt=(e,t,i=e)=>(e._$AI(t,i),e),wl={},vl=(e,t=wl)=>e._$AH=t,bl=e=>e._$AH,De=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ji=(e,t,i)=>{const n=new Map;for(let s=t;s<=i;s++)n.set(e[s],s);return n},Ft=Dn(class extends On{constructor(e){if(super(e),e.type!==Ln.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let n;i===void 0?i=t:t!==void 0&&(n=t);const s=[],r=[];let o=0;for(const a of e)s[o]=n?n(a,o):o,r[o]=i(a,o),o++;return{values:r,keys:s}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,n]){const s=bl(e),{values:r,keys:o}=this.dt(t,i,n);if(!Array.isArray(s))return this.ut=o,r;const a=this.ut??=[],l=[];let h,d,c=0,u=s.length-1,p=0,m=r.length-1;for(;c<=u&&p<=m;)if(s[c]===null)c++;else if(s[u]===null)u--;else if(a[c]===o[p])l[p]=yt(s[c],r[p]),c++,p++;else if(a[u]===o[m])l[m]=yt(s[u],r[m]),u--,m--;else if(a[c]===o[m])l[m]=yt(s[c],r[m]),Ot(e,l[m+1],s[c]),c++,m--;else if(a[u]===o[p])l[p]=yt(s[u],r[p]),Ot(e,s[c],s[u]),u--,p++;else if(h===void 0&&(h=ji(o,p,m),d=ji(a,c,u)),h.has(a[c]))if(h.has(a[u])){const y=d.get(o[p]),$=y!==void 0?s[y]:null;if($===null){const w=Ot(e,s[c]);yt(w,r[p]),l[p]=w}else l[p]=yt($,r[p]),Ot(e,s[c],$),s[y]=null;p++}else De(s[u]),u--;else De(s[c]),c++;for(;p<=m;){const y=Ot(e,l[m+1]);yt(y,r[p]),l[p++]=y}for(;c<=u;){const y=s[c++];y!==null&&De(y)}return this.ut=o,vl(e,l),gt}});function xl(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function _l(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function $e(e){return Na(e)}function Ve(e){return Pa(e)}function In(e){return Ca(e)}function $l(e,t){return e.x>=t.x&&e.x<=t.x+t.width&&e.y>=t.y&&e.y<=t.y+t.height}var zl=Object.defineProperty,Sl=Object.getOwnPropertyDescriptor,zt=(e,t,i,n)=>{for(var s=n>1?void 0:n?Sl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&zl(t,i,s),s};exports.FlowCanvas=class extends F{constructor(){super(),this.nodes=[],this.edges=[],this.viewport={x:0,y:0,zoom:1},this.nodeTypes={default:"flow-node",shape:"shape-node","erd-table":"erd-table-node"},this.connection=null,this.isHoveringNode=!1,this.onHandleStart=t=>{const{nodeId:i,type:n,handleId:s}=t.detail;this.connection={from:{nodeId:i,handleId:s}},this.onConnectStart&&this.onConnectStart({nodeId:i,handleId:s,handleType:n})},this.onMouseMove=t=>{if(!this.connection)return;const i=this.screenToCanvas(t.clientX,t.clientY);this.connection.preview=i,this.requestUpdate()},this.onMouseUp=t=>{if(!this.connection)return;const i=t.composedPath();let n=null,s;for(const u of i)if(u instanceof HTMLElement){const p=u.tagName.toLowerCase();if(p==="flow-node"||Object.values(this.nodeTypes).some(m=>m===p)){n=u;break}u.dataset.handleId&&(s=u.dataset.handleId)}const r=n?.getAttribute("id")||void 0,o=!!this.connection?.from;let a,l,h,d,c;if(this.connection.from&&r&&r!==this.connection.from.nodeId){const u=`e-${this.connection.from.nodeId}-${r}-${Date.now()}`;if(a=this.connection.from.nodeId,l=this.connection.from.handleId,d=s,!d){const p=this.nodes.find(m=>m.id===r);p&&p.type==="shape"&&(d=this.determineBestTargetHandle(a,r))}h=r,this.instance.addEdge({id:u,source:a,target:r,sourceHandle:l,targetHandle:d,data:{}})}else this.connection?.from&&(a=this.connection.from.nodeId,l=this.connection.from.handleId,this.connection.preview&&(c=this.connection.preview));this.onConnectEnd&&this.onConnectEnd({connectionStarted:o,sourceNodeId:a,sourceHandleId:l,targetNodeId:h,targetHandleId:d,position:c}),this.connection=null,this.requestUpdate()},this.onNodeMouseEnter=t=>{const i=t.target,n=["flow-node",...Object.values(this.nodeTypes)];let s=null;for(const r of n){const o=i.closest(r);if(o&&o.id&&this.nodes.some(a=>a.id===o.id)){s=o;break}}s&&!this.isHoveringNode&&(this.isHoveringNode=!0,this.instance.setPanOnDrag(!1))},this.onNodeMouseLeave=t=>{const i=t.target,n=["flow-node",...Object.values(this.nodeTypes)];let s=null;for(const r of n){const o=i.closest(r);if(o&&o.id&&this.nodes.some(a=>a.id===o.id)){s=o;break}}s&&this.isHoveringNode&&setTimeout(()=>{const r=document.elementFromPoint(t.clientX,t.clientY);(!r||!(r instanceof HTMLElement)||!this.isElementNode(r))&&(this.isHoveringNode=!1,this.instance.setPanOnDrag(!0))},10)},this.onNodeSelect=t=>{const{nodeId:i,selected:n,node:s}=t.detail;this.instance.updateNode(i,{selected:n}),this.dispatchEvent(new CustomEvent("node-selected",{detail:{nodeId:i,selected:n,node:s,allSelectedNodes:this.nodes.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.onEdgeSelect=t=>{const{edgeId:i,selected:n,edge:s}=t.detail;this.instance.updateEdge(i,{selected:n}),this.dispatchEvent(new CustomEvent("edge-selected",{detail:{edgeId:i,selected:n,edge:s,allSelectedEdges:this.edges.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.instance=new kn({nodes:this.nodes,edges:this.edges})}createRenderRoot(){return super.createRenderRoot()}getNodeGeom(t){const i=this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`),n=this.renderRoot.querySelector(".flow-viewport");if(!i||!n)return null;const s=i.getBoundingClientRect(),r=n.getBoundingClientRect(),o=this.viewport.zoom||1,a=(s.left-r.left-this.viewport.x)/o,l=(s.top-r.top-this.viewport.y)/o,h=s.width/o,d=s.height/o,c=l+d/2;return{left:{x:a,y:c},right:{x:a+h,y:c}}}getHandleCanvasPosition(t,i){const n=this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);if(!n)return null;let s=null;const r=n.shadowRoot;if(r&&(s=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),s||(s=n.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),!s)return null;const o=this.nodes.find(u=>u.id===t);if(!o)return null;if(o.type==="shape")return this.getShapeHandlePosition(o,i);const a=n.getBoundingClientRect(),l=s.getBoundingClientRect(),h=this.viewport.zoom||1,d=(l.left+l.width/2-a.left)/h,c=(l.top+l.height/2-a.top)/h;return{x:o.position.x+d,y:o.position.y+c}}getShapeHandlePosition(t,i){const n=t.data;if(!n)return null;const s=n.size||{width:200,height:200},r=s.width,o=s.height,a=i.split("-"),l=a[a.length-1];let h=0,d=0;switch(l){case"right":h=r,d=o/2;break;case"left":h=0,d=o/2;break;case"top":h=r/2,d=0;break;case"bottom":h=r/2,d=o;break;default:h=r/2,d=o/2}return{x:t.position.x+h,y:t.position.y+d}}setNodes(t){this.instance.setNodes(t)}setEdges(t){this.instance.setEdges(t)}determineBestTargetHandle(t,i){const n=this.nodes.find(_=>_.id===t),s=this.nodes.find(_=>_.id===i);if(!n||!s)return`${i}-target-left`;const r=n.position.x,o=n.position.y,a=s.position.x,l=s.position.y,h=s.data,d=h?.size?.width||200,c=h?.size?.height||200,u=r+(n.width||150)/2,p=o+(n.height||50)/2,m=a+d/2,y=l+c/2,$=m-u,w=y-p;return Math.abs($)>Math.abs(w)?$>0?`${i}-target-left`:`${i}-target-right`:w>0?`${i}-target-top`:`${i}-target-bottom`}computeLabelCanvasPosition(t){const i=this.nodes.find(d=>d.id===t.source),n=this.nodes.find(d=>d.id===t.target);if(!i||!n)return null;let s,r,o,a;if(t.sourceHandle){const d=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(d)s=d.x,r=d.y;else{const c=i.measured?.width||i.width||150,u=i.measured?.height||i.height||50;s=i.position.x+c,r=i.position.y+u/2}}else{const d=i.measured?.width||i.width||150,c=i.measured?.height||i.height||50;s=i.position.x+d,r=i.position.y+c/2}if(t.targetHandle){const d=this.getHandleCanvasPosition(t.target,t.targetHandle);if(d)o=d.x,a=d.y;else{o=n.position.x;const c=n.measured?.height||n.height||50;a=n.position.y+c/2}}else{o=n.position.x;const d=n.measured?.height||n.height||50;a=n.position.y+d/2}const[,l,h]=$e({sourceX:s,sourceY:r,sourcePosition:exports.Position.Right,targetX:o,targetY:a,targetPosition:exports.Position.Left});return{x:l,y:h}}computeStartLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.source);if(!i)return null;let n,s;if(t.sourceHandle){const r=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.width||i.width||150,a=i.measured?.height||i.height||50;n=i.position.x+o,s=i.position.y+a/2}}else{const r=i.measured?.width||i.width||150,o=i.measured?.height||i.height||50;n=i.position.x+r,s=i.position.y+o/2}return{x:n+12,y:s-10}}computeEndLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.target);if(!i)return null;let n,s;if(t.targetHandle){const r=this.getHandleCanvasPosition(t.target,t.targetHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+o/2}}else{const r=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+r/2}return{x:n-12,y:s-10}}firstUpdated(){const t=this.renderRoot.querySelector(".flow-container");t&&(this.instance.mount(t),this.unsubscribe=this.instance.subscribe(i=>{this.nodes=i.nodes,this.edges=i.edges,this.viewport=i.viewport,this.requestUpdate()}),this.unsubscribeRenderComplete=this.instance.onRenderComplete(i=>{this.dispatchEvent(new CustomEvent("flow-render-complete",{bubbles:!0,composed:!0,cancelable:!1,detail:{instance:this.instance,nodes:i.nodes,edges:i.edges,nodeCount:i.nodes.length,edgeCount:i.edges.length}}))}),t.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("node-select",this.onNodeSelect),document.addEventListener("edge-select",this.onEdgeSelect),t.addEventListener("mouseenter",this.onNodeMouseEnter,!0),t.addEventListener("mouseleave",this.onNodeMouseLeave,!0),requestAnimationFrame(()=>{const i=new CustomEvent("flow-ready",{bubbles:!0,composed:!0,cancelable:!1,detail:{instance:this.instance}});this.dispatchEvent(i)}))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.unsubscribeRenderComplete?.(),this.instance.destroy();const t=this.renderRoot.querySelector(".flow-container");t?.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),t?.removeEventListener("node-select",this.onNodeSelect),document.removeEventListener("edge-select",this.onEdgeSelect),t?.removeEventListener("mouseenter",this.onNodeMouseEnter,!0),t?.removeEventListener("mouseleave",this.onNodeMouseLeave,!0)}renderNode(t){const i=t.type||"default",n=this.nodeTypes[i]||"flow-node",s=ae(n);return X`
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
    `}render(){const t=`translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;return X`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${ml({transform:t})}
        >
          <div class="flow-nodes-layer">
            ${Ft(this.nodes,i=>i.id,i=>this.renderNode(i))}
          </div>
          <div class="flow-edges-layer">
            ${Ft(this.edges,i=>i.id,i=>{const n=this.nodes.find(r=>r.id===i.source),s=this.nodes.find(r=>r.id===i.target);return!n||!s?null:X`
                <flow-edge 
                  .id=${i.id}
                  .source=${i.source}
                  .target=${i.target}
                  .sourceHandle=${i.sourceHandle}
                  .targetHandle=${i.targetHandle}
                  .sourceNode=${n}
                  .targetNode=${s}
                  .animated=${i.animated||!1}
                  .selectable=${i.selectable!==void 0?i.selectable:!0}
                  .label=${i.label||""}
                  .type=${i.type||"default"}
                  .markerStart=${i.markerStart}
                  .markerEnd=${i.markerEnd}
                  .offset=${i.offset}
                  .pathStyle=${i.pathStyle}
                ></flow-edge>
              `})}
            ${this.renderPreviewEdge()}
          </div>
          <div class="flow-labels-overlay">
            ${Ft(this.edges,i=>i.id,i=>{const n=i.data&&i.data.labelWidget,s=i.data&&i.data.labelData,r=i.data&&i.data.labelHtml,o=i.data&&i.data.label;if(!(!!n||!!r||!!o))return null;const l=this.computeLabelCanvasPosition(i);if(!l)return null;const h=`transform: translate(-50%, -50%) translate(${l.x}px, ${l.y}px);`;if(n){const d=ae(n);return X`<div class="edge-label" style="${h}"><${d} .data=${s}></${d}></div>`}return r?X`<div class="edge-label" style="${h}" .innerHTML=${r}></div>`:X`<div class="edge-label" style="${h}">${o}</div>`})}
            ${Ft(this.edges,i=>i.id,i=>{const n=i.data&&i.data.startLabelWidget,s=i.data&&i.data.startLabelData,r=i.data&&i.data.startLabelHtml,o=i.data&&i.data.startLabel;if(!n&&!r&&!o)return null;const a=this.computeStartLabelCanvasPosition(i);if(!a)return null;const l=`transform: translate(-50%, -50%) translate(${a.x}px, ${a.y}px);`;if(n){const h=ae(n);return X`<div class="edge-label" style="${l}"><${h} .data=${s}></${h}></div>`}return r?X`<div class="edge-label" style="${l}" .innerHTML=${r}></div>`:X`<div class="edge-label" style="${l}">${o}</div>`})}
            ${Ft(this.edges,i=>i.id,i=>{const n=i.data&&i.data.endLabelWidget,s=i.data&&i.data.endLabelData,r=i.data&&i.data.endLabelHtml,o=i.data&&i.data.endLabel;if(!n&&!r&&!o)return null;const a=this.computeEndLabelCanvasPosition(i);if(!a)return null;const l=`transform: translate(-50%, -50%) translate(${a.x}px, ${a.y}px);`;if(n){const h=ae(n);return X`<div class="edge-label" style="${l}"><${h} .data=${s}></${h}></div>`}return r?X`<div class="edge-label" style="${l}" .innerHTML=${r}></div>`:X`<div class="edge-label" style="${l}">${o}</div>`})}
          </div>
        </div>
        <slot></slot>
      </div>
    `}screenToCanvas(t,i){const n=this.renderRoot.querySelector(".flow-container");if(!n)return{x:t,y:i};const s=n.getBoundingClientRect(),r=this.viewport.x,o=this.viewport.y,a=this.viewport.zoom||1;return{x:(t-s.left-r)/a,y:(i-s.top-o)/a}}isElementNode(t){if(!t)return!1;const i=["flow-node",...Object.values(this.nodeTypes)];for(const n of i){const s=t.closest(n);if(s&&s.id)return this.nodes.some(r=>r.id===s.id)}return!1}renderPreviewEdge(){if(!this.connection||!this.connection.preview)return null;const t=this.connection.preview,i=this.connection.from?this.nodes.find(s=>s.id===this.connection.from.nodeId):null,n=this.connection.to?this.nodes.find(s=>s.id===this.connection.to.nodeId):null;return i?X`
        <flow-edge
          .id=${"preview"}
          .source=${i.id}
          .target=${"__preview__"}
          .sourceHandle=${this.connection.from?.handleId}
          .sourceNode=${{...i,position:i.position}}
          .targetNode=${{id:"__preview__",position:{x:t.x,y:t.y},width:1,height:1,data:{}}}
          .animated=${!0}
          .selectable=${!1}
          .label=${""}
        ></flow-edge>
      `:n?X`
        <flow-edge
          .id=${"preview"}
          .source=${"__preview__"}
          .target=${n.id}
          .sourceNode=${{id:"__preview__",position:{x:t.x,y:t.y},width:1,height:1,data:{}}}
          .targetHandle=${this.connection.to?.handleId}
          .targetNode=${{...n,position:n.position}}
          .animated=${!0}
          .selectable=${!1}
          .label=${""}
        ></flow-edge>
      `:null}};exports.FlowCanvas.styles=U`
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
  `;zt([v({type:Array})],exports.FlowCanvas.prototype,"nodes",2);zt([v({type:Array})],exports.FlowCanvas.prototype,"edges",2);zt([v({type:Object})],exports.FlowCanvas.prototype,"viewport",2);zt([v({type:Object})],exports.FlowCanvas.prototype,"onConnectStart",2);zt([v({type:Object})],exports.FlowCanvas.prototype,"onConnectEnd",2);zt([v({type:Object})],exports.FlowCanvas.prototype,"nodeTypes",2);exports.FlowCanvas=zt([W("flow-canvas")],exports.FlowCanvas);var El=Object.defineProperty,kl=Object.getOwnPropertyDescriptor,St=(e,t,i,n)=>{for(var s=n>1?void 0:n?kl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&El(t,i,s),s};exports.NodeResizer=class extends F{constructor(){super(...arguments),this.visible=!1,this.minWidth=10,this.minHeight=10,this.maxWidth=Number.MAX_VALUE,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleMouseDown=t=>{const i=t.target;let n=i.classList.contains("resize-handle");if(!n&&i===this&&(n=t.composedPath().some(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))),!n)return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.isResizing=!0;const s=this.getRootNode().host;this.resizeStart={x:t.clientX,y:t.clientY,width:s?.offsetWidth||0,height:s?.offsetHeight||0};let r=null;if(i.classList.contains("resize-handle")?r=i:i===this&&(r=t.composedPath().find(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))||null),r){const o=Array.from(r.classList);this.resizeHandle=o.find(a=>a!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleMouseMove=t=>{if(!this.isResizing)return;const i=this.getRootNode().host;if(!i)return;const n=t.clientX-this.resizeStart.x,s=t.clientY-this.resizeStart.y;let r=this.resizeStart.width,o=this.resizeStart.height;switch(this.resizeHandle){case"nw":r=this.resizeStart.width-n,o=this.resizeStart.height-s;break;case"ne":r=this.resizeStart.width+n,o=this.resizeStart.height-s;break;case"sw":r=this.resizeStart.width-n,o=this.resizeStart.height+s;break;case"se":r=this.resizeStart.width+n,o=this.resizeStart.height+s;break;case"n":o=this.resizeStart.height-s;break;case"s":o=this.resizeStart.height+s;break;case"w":r=this.resizeStart.width-n;break;case"e":r=this.resizeStart.width+n;break}if(r=Math.max(this.minWidth,Math.min(this.maxWidth,r)),o=Math.max(this.minHeight,Math.min(this.maxHeight,o)),this.keepAspectRatio){const a=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?o=r/a:r=o*a}i.style.width=`${r}px`,i.style.height=`${o}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:r,height:o,handle:this.resizeHandle},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{if(!this.isResizing)return;this.isResizing=!1,this.cleanup();const t=this.getRootNode().host;this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:t?.offsetWidth||0,height:t?.offsetHeight||0},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return this.visible?C`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    `:C``}};exports.NodeResizer.styles=U`
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
  `;St([v({type:Boolean,reflect:!0})],exports.NodeResizer.prototype,"visible",2);St([v({type:Number})],exports.NodeResizer.prototype,"minWidth",2);St([v({type:Number})],exports.NodeResizer.prototype,"minHeight",2);St([v({type:Number})],exports.NodeResizer.prototype,"maxWidth",2);St([v({type:Number})],exports.NodeResizer.prototype,"maxHeight",2);St([v({type:Boolean})],exports.NodeResizer.prototype,"keepAspectRatio",2);exports.NodeResizer=St([W("node-resizer")],exports.NodeResizer);var Nl=Object.defineProperty,Cl=Object.getOwnPropertyDescriptor,dt=(e,t,i,n)=>{for(var s=n>1?void 0:n?Cl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Nl(t,i,s),s};exports.FlowNode=class extends F{constructor(){super(...arguments),this.id="",this.data={},this.position={x:0,y:0},this.selected=!1,this.dragging=!1,this.draggable=!0,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.lastMeasured=null,this.handleWheel=t=>{const i=t.composedPath();let n=null;for(const s of i)if(s instanceof Element&&(n=this.findScrollableElement(s),n))break;if(n){const s=t.deltaY<0&&n.scrollTop>0||t.deltaY>0&&n.scrollTop<n.scrollHeight-n.clientHeight,r=t.deltaX<0&&n.scrollLeft>0||t.deltaX>0&&n.scrollLeft<n.scrollWidth-n.clientWidth;(s||r)&&t.stopPropagation()}},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}})},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}}),this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1},50)}}firstUpdated(){this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.addEventListener("wheel",this.handleWheel,{passive:!1}),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd)),this.updateMeasuredSize(),this.hasAttribute("data-measured")||this.setAttribute("data-measured","")}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.removeEventListener("wheel",this.handleWheel),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}findScrollableElement(t){if(!t||!(t instanceof HTMLElement))return null;if(t.classList.contains("nowheel"))return t;const i=window.getComputedStyle(t),n=i.overflow+i.overflowX+i.overflowY;if((n.includes("auto")||n.includes("scroll"))&&(t.scrollHeight>t.clientHeight||t.scrollWidth>t.clientWidth))return t;const s=t.parentElement;return s&&(s===this||s.closest("flow-node")===this||this.shadowRoot?.contains(s))?this.findScrollableElement(s):null}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return C`
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
    `}updated(t){super.updated(t),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,this.updateMeasuredSize(),t.has("resizable")}updateMeasuredSize(){if(!this.instance)return;const t=this.getBoundingClientRect(),i=this.instance.getViewport().zoom||1,n=t.width/i,s=t.height/i;(!this.lastMeasured||Math.abs(this.lastMeasured.width-n)>.5||Math.abs(this.lastMeasured.height-s)>.5)&&(this.lastMeasured={width:n,height:s},this.instance.updateNode(this.id,{measured:{width:n,height:s},width:n,height:s}))}onHandleMouseDown(t){return i=>{i.stopPropagation(),i.preventDefault(),this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:t},bubbles:!0,composed:!0}))}}};exports.FlowNode.styles=U`
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
  `;dt([v({type:String,reflect:!0})],exports.FlowNode.prototype,"id",2);dt([v({type:Object})],exports.FlowNode.prototype,"data",2);dt([v({type:Object})],exports.FlowNode.prototype,"position",2);dt([v({type:Boolean,reflect:!0})],exports.FlowNode.prototype,"selected",2);dt([v({type:Boolean,reflect:!0})],exports.FlowNode.prototype,"dragging",2);dt([v({type:Boolean})],exports.FlowNode.prototype,"draggable",2);dt([v({type:Object})],exports.FlowNode.prototype,"instance",2);dt([v({type:Boolean})],exports.FlowNode.prototype,"resizable",2);exports.FlowNode=dt([W("flow-node")],exports.FlowNode);var Ml=Object.defineProperty,Hl=Object.getOwnPropertyDescriptor,I=(e,t,i,n)=>{for(var s=n>1?void 0:n?Hl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Ml(t,i,s),s};exports.FlowEdge=class extends F{constructor(){super(...arguments),this.id="",this.source="",this.target="",this.animated=!1,this.selected=!1,this.selectable=!0,this.label="",this.type="default",this.markerHandleHalf=5,this.hovering=!1,this._cachedSource=null,this._cachedTarget=null,this._handleRafId=null,this._lastPositionKey="",this.handlePointerEnter=t=>{t.stopPropagation(),this.emitHover(!0)},this.handlePointerLeave=t=>{t.stopPropagation(),this.emitHover(!1)}}convertStyleObjToString(t){return Object.entries(t).filter(([i,n])=>n!=null).map(([i,n])=>`${i.replace(/[A-Z]/g,r=>`-${r.toLowerCase()}`)}:${n}`).join(";")}getMarkerId(t){if(!t)return;if(typeof t=="string")return t;const i=this.normalizeMarkerSpec(t);return`marker-${this.hashString(i)}`}createMarkerSVG(t,i){if(i.type==="custom"){const d=i.width??10,c=i.height??10,u=(i.refX??d)+this.markerHandleHalf,p=i.refY??c/2,m=i.color??"currentColor",y=i.orient??"auto";return`<marker id="${t}" markerWidth="${d}" markerHeight="${c}" refX="${u}" refY="${p}" orient="${y}" markerUnits="userSpaceOnUse"><path d="${i.path}" fill="${m}" stroke="${m}"/></marker>`}const n=i.width??10,s=i.height??10,r=i.orient??"auto",o=i.color??"currentColor",a=(i.type==="ArrowClosed",n+this.markerHandleHalf),l=s/2;if(i.type==="ArrowClosed"){const d=`M0,0 L${n},${l} L0,${s} Z`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${d}" fill="${o}"/></marker>`}const h=`M0,0 L${n},${l} L0,${s}`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${h}" fill="none" stroke="${o}" stroke-width="2"/></marker>`}normalizeMarkerSpec(t){if(t.type==="custom"){const{path:o,width:a=20,height:l=20,refX:h=20,refY:d=10,orient:c="auto",color:u="currentColor"}=t;return`custom|p=${o}|w=${a}|h=${l}|rx=${h}|ry=${d}|o=${c}|c=${u}`}const{width:i=20,height:n=20,orient:s="auto",color:r="currentColor"}=t;return`builtin|${t.type}|w=${i}|h=${n}|o=${s}|c=${r}`}hashString(t){let i=0;for(let n=0;n<t.length;n++)i=(i<<5)-i+t.charCodeAt(n),i|=0;return Math.abs(i).toString(36)}getPathForType(t,i){let n=t.x,s=t.y,r=i.x,o=i.y;const a=t.position,l=i.position;switch(this.offset!==void 0&&(this.type==="smoothstep"||this.type==="step")&&(Math.abs(r-n)>Math.abs(o-s)?(s+=this.offset,o+=this.offset):(n+=this.offset,r+=this.offset)),this.type){case"straight":return In({sourceX:n,sourceY:s,targetX:r,targetY:o});case"smoothstep":return Ve({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l});case"step":return Ve({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,borderRadius:0});case"simplebezier":return $e({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,curvature:.5});case"default":default:return $e({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l})}}getFlowCanvasRoot(){const t=this.getRootNode();return t instanceof ShadowRoot?t:null}getFlowCanvasHost(){const t=this.getFlowCanvasRoot();return t&&t.host||null}findHandleElement(t,i){const n=this.getFlowCanvasRoot();if(!n)return null;const s=n.querySelector(`[id="${CSS.escape(t)}"]`);if(!s)return null;const r=s.shadowRoot;let o=null;return r&&(o=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o||(o=s.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o}getHandlePosition(t,i){const n=this.findHandleElement(t,i);if(!n)return null;const s=this.getFlowCanvasRoot();if(!s)return null;const r=s.querySelector(`[id="${CSS.escape(t)}"]`);if(!r)return null;const o=r.getBoundingClientRect(),a=n.getBoundingClientRect(),l=this.sourceNode?.id===t?this.sourceNode:this.targetNode;if(!l)return null;l.measured?.width||l.width,l.measured?.height||l.height;const c=(this.getFlowCanvasHost()?.viewport||{zoom:1}).zoom||1,u=(a.left+a.width/2-o.left)/c,p=(a.top+a.height/2-o.top)/c;return{x:l.position.x+u,y:l.position.y+p}}getSourcePosition(){if(this.sourceHandle&&this.sourceNode){const n=this.getHandlePosition(this.sourceNode.id,this.sourceHandle);if(n)return{...n,position:exports.Position.Right}}const t=this.sourceNode.measured?.width||this.sourceNode.width||150,i=this.sourceNode.measured?.height||this.sourceNode.height||50;return{x:this.sourceNode.position.x+t,y:this.sourceNode.position.y+i/2,position:exports.Position.Right}}getTargetPosition(){if(this.targetHandle&&this.targetNode){const i=this.getHandlePosition(this.targetNode.id,this.targetHandle);if(i)return{...i,position:exports.Position.Left}}const t=this.targetNode.measured?.height||this.targetNode.height||50;return{x:this.targetNode.position.x,y:this.targetNode.position.y+t/2,position:exports.Position.Left}}getSourcePositionNodeOnly(){const t=this.sourceNode.measured?.width||this.sourceNode.width||150,i=this.sourceNode.measured?.height||this.sourceNode.height||50;return{x:this.sourceNode.position.x+t,y:this.sourceNode.position.y+i/2,position:exports.Position.Right}}getTargetPositionNodeOnly(){const t=this.targetNode.measured?.height||this.targetNode.height||50;return{x:this.targetNode.position.x,y:this.targetNode.position.y+t/2,position:exports.Position.Left}}getPositionsForRender(){if(!!(this.sourceHandle||this.targetHandle)){const i=this._cachedSource??this.getSourcePositionNodeOnly(),n=this._cachedTarget??this.getTargetPositionNodeOnly();return{source:i,target:n}}return{source:this.getSourcePosition(),target:this.getTargetPosition()}}getPositionCacheKey(){const t=this.sourceNode,i=this.targetNode;return!t||!i?"":[this.id,this.sourceHandle,this.targetHandle,t.position.x,t.position.y,i.position.x,i.position.y,t.measured?.width,t.measured?.height,i.measured?.width,i.measured?.height].join("|")}get isPreview(){return this.id==="preview"}endpointKnown(t){return t?t.type==="shape"||t.data?.size?!0:t.measured?.width!=null||typeof t.width=="number":!1}updated(t){if(super.updated?.(t),!this.sourceNode||!this.targetNode||!!!(this.sourceHandle||this.targetHandle))return;const n=this.getPositionCacheKey();n!==this._lastPositionKey&&(this._lastPositionKey=n,this._cachedSource=null,this._cachedTarget=null),!(this._cachedSource!=null&&this._cachedTarget!=null)&&this._handleRafId==null&&(this._handleRafId=requestAnimationFrame(()=>{this._handleRafId=null,this._cachedSource=this.getSourcePosition(),this._cachedTarget=this.getTargetPosition(),this.requestUpdate()}))}disconnectedCallback(){this._handleRafId!=null&&(cancelAnimationFrame(this._handleRafId),this._handleRafId=null),super.disconnectedCallback?.()}render(){if(!this.sourceNode||!this.targetNode)return C``;if(!this.isPreview){const y=!!(this.sourceHandle||this.targetHandle),$=this.endpointKnown(this.sourceNode)&&this.endpointKnown(this.targetNode),w=!y||this._cachedSource!=null&&this._cachedTarget!=null;if(!$||!w)return C``}const{source:t,target:i}=this.getPositionsForRender(),[n,s,r,o,a]=this.getPathForType(t,i),l=["edge-path",this.selectable&&"selectable",this.animated&&"animated",this.selected&&"selected"].filter(Boolean).join(" "),h=this.getMarkerId(this.markerStart),d=this.getMarkerId(this.markerEnd),c=h?`url(#${h})`:void 0,u=d?`url(#${d})`:void 0,p=this.animated?"5":"",m=this.pathStyle?typeof this.pathStyle=="string"?this.pathStyle:this.convertStyleObjToString(this.pathStyle):"";return C`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${h&&typeof this.markerStart=="object"?K`<marker id="${h}" markerWidth="${this.markerStart.width||10}" markerHeight="${this.markerStart.height||10}" refX="${((this.markerStart.type==="custom"?this.markerStart.refX:void 0)||this.markerStart.width||10)+this.markerHandleHalf}" refY="${(this.markerStart.type==="custom"?this.markerStart.refY:void 0)||(this.markerStart.height||10)/2}" orient="${this.markerStart.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type==="custom"?K`<path d="${this.markerStart.path}" fill="${this.markerStart.color||"currentColor"}" stroke="${this.markerStart.color||"currentColor"}"/>`:this.markerStart.type==="ArrowClosed"?K`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10} Z" fill="${this.markerStart.color||"currentColor"}"/>`:K`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10}" fill="none" stroke="${this.markerStart.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
          ${d&&typeof this.markerEnd=="object"?K`<marker id="${d}" markerWidth="${this.markerEnd.width||10}" markerHeight="${this.markerEnd.height||10}" refX="${((this.markerEnd.type==="custom"?this.markerEnd.refX:void 0)||this.markerEnd.width||10)+this.markerHandleHalf}" refY="${(this.markerEnd.type==="custom"?this.markerEnd.refY:void 0)||(this.markerEnd.height||10)/2}" orient="${this.markerEnd.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type==="custom"?K`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color||"currentColor"}" stroke="${this.markerEnd.color||"currentColor"}"/>`:this.markerEnd.type==="ArrowClosed"?K`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10} Z" fill="${this.markerEnd.color||"currentColor"}"/>`:K`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10}" fill="none" stroke="${this.markerEnd.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
        </defs>
        ${K`
          <path 
            class="${l}"
            d="${n}"
            style="${m}"
            stroke-dasharray="${p}"
            marker-start="${c??""}"
            marker-end="${u??""}"
            @click=${this.selectable?this.handleClick:void 0}
            @pointerenter=${this.handlePointerEnter}
            @pointerleave=${this.handlePointerLeave}
          />
          ${this.label?K`
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
    `}handleClick(t){if(t.stopPropagation(),!this.selectable)return;const i=!this.selected;this.selected=i,this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:this.id,selected:i,edge:{id:this.id,source:this.source,target:this.target,sourceHandle:this.sourceHandle,targetHandle:this.targetHandle,label:this.label,animated:this.animated,selected:i}},bubbles:!0,composed:!0}))}emitHover(t){this.hovering!==t&&(this.hovering=t,this.dispatchEvent(new CustomEvent("edge-hover",{detail:{edgeId:this.id,hovered:t,edge:{id:this.id,source:this.source,target:this.target,sourceHandle:this.sourceHandle,targetHandle:this.targetHandle,label:this.label,animated:this.animated,selected:this.selected,type:this.type,markerStart:this.markerStart,markerEnd:this.markerEnd,offset:this.offset,pathStyle:this.pathStyle}},bubbles:!0,composed:!0})))}};exports.FlowEdge.styles=U`
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
  `;I([v({type:String})],exports.FlowEdge.prototype,"id",2);I([v({type:String})],exports.FlowEdge.prototype,"source",2);I([v({type:String})],exports.FlowEdge.prototype,"target",2);I([v({type:String})],exports.FlowEdge.prototype,"sourceHandle",2);I([v({type:String})],exports.FlowEdge.prototype,"targetHandle",2);I([v({type:Object})],exports.FlowEdge.prototype,"sourceNode",2);I([v({type:Object})],exports.FlowEdge.prototype,"targetNode",2);I([v({type:Boolean})],exports.FlowEdge.prototype,"animated",2);I([v({type:Boolean})],exports.FlowEdge.prototype,"selected",2);I([v({type:Boolean})],exports.FlowEdge.prototype,"selectable",2);I([v({type:String})],exports.FlowEdge.prototype,"label",2);I([v({type:String})],exports.FlowEdge.prototype,"type",2);I([v({type:Object})],exports.FlowEdge.prototype,"markerStart",2);I([v({type:Object})],exports.FlowEdge.prototype,"markerEnd",2);I([v({type:Number})],exports.FlowEdge.prototype,"offset",2);I([v({type:Object})],exports.FlowEdge.prototype,"pathStyle",2);exports.FlowEdge=I([W("flow-edge")],exports.FlowEdge);var Al=Object.defineProperty,Pl=Object.getOwnPropertyDescriptor,te=(e,t,i,n)=>{for(var s=n>1?void 0:n?Pl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Al(t,i,s),s};exports.FlowBackground=class extends F{constructor(){super(...arguments),this.variant="dots",this.gap=20,this.color="#ddd",this.size=1}render(){const t=`flow-bg-pattern-${Math.random().toString(36).substr(2,9)}`;return C`
      <svg>
        <defs>
          ${this.variant==="dots"?this.renderDotsPattern(t):this.renderLinesPattern(t)}
        </defs>
        <rect width="100%" height="100%" fill="url(#${t})" />
      </svg>
    `}renderDotsPattern(t){return K`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <circle cx="${this.size}" cy="${this.size}" r="${this.size}" fill="${this.color}" />
      </pattern>
    `}renderLinesPattern(t){return K`
      <pattern id="${t}" x="0" y="0" width="${this.gap}" height="${this.gap}" patternUnits="userSpaceOnUse">
        <path d="M ${this.gap} 0 L 0 0 0 ${this.gap}" fill="none" stroke="${this.color}" stroke-width="${this.size}" />
      </pattern>
    `}};exports.FlowBackground.styles=U`
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
  `;te([v({type:String})],exports.FlowBackground.prototype,"variant",2);te([v({type:Number})],exports.FlowBackground.prototype,"gap",2);te([v({type:String})],exports.FlowBackground.prototype,"color",2);te([v({type:Number})],exports.FlowBackground.prototype,"size",2);exports.FlowBackground=te([W("flow-background")],exports.FlowBackground);var Rl=Object.defineProperty,Tl=Object.getOwnPropertyDescriptor,hi=(e,t,i,n)=>{for(var s=n>1?void 0:n?Tl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Rl(t,i,s),s};exports.FlowMinimap=class extends F{constructor(){super(...arguments),this.width=200,this.height=150}render(){return C`
      <div class="minimap-container">
        <div class="viewport-indicator"></div>
        <slot></slot>
      </div>
    `}};exports.FlowMinimap.styles=U`
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
  `;hi([v({type:Number})],exports.FlowMinimap.prototype,"width",2);hi([v({type:Number})],exports.FlowMinimap.prototype,"height",2);exports.FlowMinimap=hi([W("flow-minimap")],exports.FlowMinimap);var Ll=Object.defineProperty,Dl=Object.getOwnPropertyDescriptor,Bn=(e,t,i,n)=>{for(var s=n>1?void 0:n?Dl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Ll(t,i,s),s};exports.FlowControls=class extends F{constructor(){super(...arguments),this.handleZoomIn=()=>{this.instance?.zoomIn()},this.handleZoomOut=()=>{this.instance?.zoomOut()},this.handleFitView=()=>{this.instance?.fitView()}}render(){return C`
      <button @click=${this.handleZoomIn} title="Zoom In">+</button>
      <button @click=${this.handleZoomOut} title="Zoom Out">−</button>
      <div class="divider"></div>
      <button @click=${this.handleFitView} title="Fit View">⛶</button>
    `}};exports.FlowControls.styles=U`
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
  `;Bn([v({type:Object})],exports.FlowControls.prototype,"instance",2);exports.FlowControls=Bn([W("flow-controls")],exports.FlowControls);var Ol=Object.getOwnPropertyDescriptor,Fl=Object.getPrototypeOf,Il=Reflect.get,Bl=(e,t,i,n)=>{for(var s=n>1?void 0:n?Ol(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s},Oe=(e,t,i)=>Il(Fl(e),i,t);exports.ERDTableNode=class extends exports.FlowNode{constructor(){super(...arguments),this.appliedInitialSize=!1}firstUpdated(){const t=this.data,i=t?.size?.width,n=t?.size?.height;(typeof i=="number"&&i>0||typeof n=="number"&&n>0)&&(typeof i=="number"&&i>0&&(this.style.width=`${i}px`),typeof n=="number"&&n>0&&(this.style.minHeight=`${n}px`),this.instance&&this.instance.updateNode(this.id,{width:typeof i=="number"&&i>0?i:this.width,height:typeof n=="number"&&n>0?n:this.height}),this.appliedInitialSize=!0),super.firstUpdated()}updated(t){super.updated(t)}onFieldHandleMouseDown(t,i){return n=>{n.stopPropagation(),n.preventDefault();const s=`${this.id}-${t}-${i}`;this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:i==="left"?"target":"source",handleId:s,fieldName:t},bubbles:!0,composed:!0}))}}render(){const t=this.data,i=t?.tableName||"Table",n=t?.fields||[];return C`
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
    `}};exports.ERDTableNode.styles=[...Array.isArray(Oe(exports.ERDTableNode,exports.ERDTableNode,"styles"))?Oe(exports.ERDTableNode,exports.ERDTableNode,"styles"):[Oe(exports.ERDTableNode,exports.ERDTableNode,"styles")],U`
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
    `];exports.ERDTableNode=Bl([W("erd-table-node")],exports.ERDTableNode);const Ul=[{type:"circle",name:"Circle",category:"basic",path:"M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"rectangle",name:"Rectangle",category:"basic",path:"M 5 5 L 195 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"diamond",name:"Diamond",category:"basic",path:"M 100 5 L 195 100 L 100 195 L 5 100 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"triangle",name:"Triangle",category:"basic",path:"M 100 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Xl=[{type:"hexagon",name:"Hexagon",category:"geometric",path:"M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"octagon",name:"Octagon",category:"geometric",path:"M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Yl=[{type:"heart",name:"Heart",category:"symbolic",path:"M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],di=class di{static initialize(){[...Ul,...Xl,...Yl].forEach(i=>{this.shapes.set(i.type,i)})}static register(t){this.shapes.set(t.type,t)}static get(t){return this.shapes.get(t)}static getAll(){return Array.from(this.shapes.values())}static getByCategory(t){return Array.from(this.shapes.values()).filter(i=>i.category===t)}static has(t){return this.shapes.has(t)}static getShapeTypes(){return Array.from(this.shapes.keys())}static clear(){this.shapes.clear()}static getCount(){return this.shapes.size}};di.shapes=new Map;let Kt=di;Kt.initialize();var Wl=Object.defineProperty,Zl=Object.getOwnPropertyDescriptor,ot=(e,t,i,n)=>{for(var s=n>1?void 0:n?Zl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Wl(t,i,s),s};exports.ShapeNode=class extends F{constructor(){super(...arguments),this.id="",this.selected=!1,this.dragging=!1,this.draggable=!0,this.connectable=!0,this.instance=null,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isDragging=!1,this.cleanup()},this.handleHandleStart=t=>{t.stopPropagation(),this.isDragging=!1;const i=t.target,n=i.dataset.handleId,s=i.dataset.handleType;s&&n&&this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,handleId:n,handleType:s,position:this.position},bubbles:!0,composed:!0}))}}updated(t){super.updated(t),t.has("position")&&this.isDragging,t.has("resizable")}getShapeDefinition(){if(this.data?.type)return Kt.get(this.data.type)}renderShape(){const t=this.getShapeDefinition();if(!t)return C`
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
        `}return C``}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleClick),this.addEventListener("mousedown",this.handleMouseDown),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleClick),this.removeEventListener("mousedown",this.handleMouseDown),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}firstUpdated(){this.hasAttribute("data-measured")||this.setAttribute("data-measured","")}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){this.style.setProperty("--position-x",`${this.position.x}px`),this.style.setProperty("--position-y",`${this.position.y}px`);const t=this.getShapeDefinition(),n=this.data?.size||t?.defaultSize||{width:200,height:200};return this.style.setProperty("--shape-width",`${n.width}px`),this.style.setProperty("--shape-height",`${n.height}px`),C`
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
    `}};exports.ShapeNode.styles=U`
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
  `;ot([v({type:String,reflect:!0})],exports.ShapeNode.prototype,"id",2);ot([v({type:Object})],exports.ShapeNode.prototype,"data",2);ot([v({type:Object,hasChanged:(e,t)=>!t||e.x!==t.x||e.y!==t.y})],exports.ShapeNode.prototype,"position",2);ot([v({type:Boolean,reflect:!0})],exports.ShapeNode.prototype,"selected",2);ot([v({type:Boolean,reflect:!0})],exports.ShapeNode.prototype,"dragging",2);ot([v({type:Boolean})],exports.ShapeNode.prototype,"draggable",2);ot([v({type:Boolean})],exports.ShapeNode.prototype,"connectable",2);ot([v({type:Object})],exports.ShapeNode.prototype,"instance",2);ot([v({type:Boolean})],exports.ShapeNode.prototype,"resizable",2);exports.ShapeNode=ot([W("shape-node")],exports.ShapeNode);var ql=Object.getOwnPropertyDescriptor,ee=(e,t,i,n)=>{for(var s=n>1?void 0:n?ql(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s};exports.BaseNode=class extends F{render(){return C`<slot></slot>`}};exports.BaseNode.styles=U`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `;exports.BaseNode=ee([W("base-node")],exports.BaseNode);exports.BaseNodeHeader=class extends F{render(){return C`<slot></slot>`}};exports.BaseNodeHeader.styles=U`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `;exports.BaseNodeHeader=ee([W("base-node-header")],exports.BaseNodeHeader);exports.BaseNodeHeaderTitle=class extends F{render(){return C`<span class="title"><slot></slot></span>`}};exports.BaseNodeHeaderTitle.styles=U`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `;exports.BaseNodeHeaderTitle=ee([W("base-node-header-title")],exports.BaseNodeHeaderTitle);exports.BaseNodeContent=class extends F{render(){return C`<slot></slot>`}};exports.BaseNodeContent.styles=U`
    :host {
      display: block;
      padding: 12px;
    }
  `;exports.BaseNodeContent=ee([W("base-node-content")],exports.BaseNodeContent);exports.BaseNodeFooter=class extends F{render(){return C`<slot></slot>`}};exports.BaseNodeFooter.styles=U`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `;exports.BaseNodeFooter=ee([W("base-node-footer")],exports.BaseNodeFooter);var Vl=Object.defineProperty,D=(e,t,i,n)=>{for(var s=void 0,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(t,i,s)||s);return s&&Vl(t,i,s),s};const jl=e=>{class t extends e{constructor(){super(...arguments),this.id="",this.position={x:0,y:0},this.data={},this.selected=!1,this.dragging=!1,this.instance=null,this.resizable=!1,this.draggable=!0,this.drag_handle_selector=null,this.connectable=!0,this.minWidth=10,this.maxWidth=Number.MAX_VALUE,this.minHeight=10,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.maxInitialHeight=0,this.width=void 0,this.height=void 0,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.lastMeasured=null,this.resizeObserver=null,this.dragHandleElement=null,this.handleClick=n=>{if(n.stopPropagation(),!this.isDragging){const s=!this.selected;this.selected=s,this.instance&&this.instance.updateNode(this.id,{selected:s}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:s,node:{id:this.id,data:this.data,position:this.position,selected:s}},bubbles:!0,composed:!0}))}},this.handleWheel=n=>{const s=n.composedPath();let r=null;for(const o of s)if(o instanceof Element&&(r=this.findScrollableElement(o),r))break;if(r){const o=n.deltaY<0&&r.scrollTop>0||n.deltaY>0&&r.scrollTop<r.scrollHeight-r.clientHeight,a=n.deltaX<0&&r.scrollLeft>0||n.deltaX>0&&r.scrollLeft<r.scrollWidth-r.clientWidth;(o||a)&&n.stopPropagation()}},this.handleMouseDown=n=>{if(n.button!==0)return;const s=n.target;if(s.classList.contains("resize-handle")||s.closest(".resize-handle")!==null){this.handleResizeStart(n);return}this.draggable&&(n.preventDefault(),n.stopPropagation(),this.isDragging=!1,this.dragStart={x:n.clientX,y:n.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=n=>{if(this.isResizing){this.handleResizeMove(n);return}const s=n.clientX-this.dragStart.x,r=n.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(s)>3||Math.abs(r)>3)&&(this.isDragging=!0,this.dragging=!0,this.dragHandleElement&&(this.dragHandleElement.style.cursor="grabbing"),this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const o=this.instance.getViewport(),a={x:this.nodeStart.x+s/o.zoom,y:this.nodeStart.y+r/o.zoom};this.instance.updateNode(this.id,{position:a})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.dragHandleElement&&this.isDragging&&(this.dragHandleElement.style.cursor="grab"),this.isResizing&&this.handleResizeEnd(),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1,this.isResizing=!1},50)},this.handleResizeStart=(n,s)=>{n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),this.isResizing=!0;const r=this.getBoundingClientRect(),o=getComputedStyle(this);let a=parseFloat(o.width),l=parseFloat(o.height);if((!a||a===0)&&(a=r.width),(!l||l===0)&&(l=r.height),this.resizeStart={x:n.clientX,y:n.clientY,width:a,height:l},s)this.resizeHandle=s;else{let h=n.target;if(!h.classList.contains("resize-handle")){const c=h.closest(".resize-handle");c&&(h=c)}const d=Array.from(h.classList);this.resizeHandle=d.find(c=>c!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleResizeMove=n=>{if(!this.isResizing)return;const s=n.clientX-this.resizeStart.x,r=n.clientY-this.resizeStart.y;let o=this.resizeStart.width,a=this.resizeStart.height;switch(this.resizeHandle){case"nw":o=this.resizeStart.width-s,a=this.resizeStart.height-r;break;case"ne":o=this.resizeStart.width+s,a=this.resizeStart.height-r;break;case"sw":o=this.resizeStart.width-s,a=this.resizeStart.height+r;break;case"se":o=this.resizeStart.width+s,a=this.resizeStart.height+r;break;case"n":a=this.resizeStart.height-r;break;case"s":a=this.resizeStart.height+r;break;case"w":o=this.resizeStart.width-s;break;case"e":o=this.resizeStart.width+s;break}if(o=Math.max(this.minWidth,Math.min(this.maxWidth,o)),a=Math.max(this.minHeight,Math.min(this.maxHeight,a)),this.keepAspectRatio){const l=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?a=o/l:o=a*l}this.style.width=`${o}px`,this.style.height=`${a}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:o,height:a,handle:this.resizeHandle},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:o,height:a,measured:{width:o,height:a}})},this.handleResizeEnd=()=>{this.isResizing&&(this.isResizing=!1,this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:this.offsetWidth,height:this.offsetHeight,measured:{width:this.offsetWidth,height:this.offsetHeight}}))},this.handleGlobalClick=n=>{n.target.closest(this.tagName.toLowerCase())!==null||this.selected&&(this.selected=!1,this.instance&&this.instance.updateNode(this.id,{selected:!1}),this.dispatchEvent(new CustomEvent("node-deselect",{detail:{nodeId:this.id,selected:!1,node:{id:this.id,data:this.data,position:this.position,selected:!1}},bubbles:!0,composed:!0})))},this.handleResizeHandleClick=n=>s=>{s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.handleResizeStart(s,n)}}static get styles(){return[U`
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
      `]}connectedCallback(){super.connectedCallback(),this.draggable&&!this.drag_handle_selector&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.addEventListener("wheel",this.handleWheel,{passive:!1}),document.addEventListener("click",this.handleGlobalClick),!this.resizeObserver&&typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>{this.isResizing||this.updateMeasuredSize()}),this.resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.removeEventListener("wheel",this.handleWheel),document.removeEventListener("click",this.handleGlobalClick),this.removeDragHandleListener(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.cleanup()}findScrollableElement(n){if(!n||!(n instanceof HTMLElement))return null;if(n.classList.contains("nowheel"))return n;const s=window.getComputedStyle(n),r=s.overflow+s.overflowX+s.overflowY;if((r.includes("auto")||r.includes("scroll"))&&(n.scrollHeight>n.clientHeight||n.scrollWidth>n.clientWidth))return n;const o=n.parentElement;return o&&(o===this||this.shadowRoot?.contains(o))?this.findScrollableElement(o):null}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}renderResizer(){return!this.resizable||!this.selected?C``:C`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick("nw")}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick("ne")}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick("sw")}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick("se")}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick("n")}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick("s")}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick("w")}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick("e")}></div>
      `}getResizer(){return this.renderResizer()}firstUpdated(){this.appendResizerToDOM(),this.drag_handle_selector&&this.setAttribute("data-drag-handle-selector",""),typeof this.width=="number"&&this.width>0&&(this.style.width=`${this.width}px`),typeof this.height=="number"&&this.height>0&&(this.style.height=`${this.height}px`),Promise.resolve().then(()=>{this.attachDragHandleListener(),this.adjustHeightToContent(),this.updateMeasuredSize(),this.reveal()})}reveal(){this.hasAttribute("data-measured")||this.setAttribute("data-measured","")}updated(n){super.updated(n),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,n.has("width")&&(typeof this.width=="number"&&this.width>0?this.style.width=`${this.width}px`:this.style.width=""),n.has("height")&&(typeof this.height=="number"&&this.height>0?this.style.height=`${this.height}px`:this.style.height=""),n.has("maxInitialHeight")&&!this.isResizing&&Promise.resolve().then(()=>{this.adjustHeightToContent()}),(n.has("resizable")||n.has("selected"))&&this.appendResizerToDOM(),(n.has("drag_handle_selector")||n.has("draggable"))&&Promise.resolve().then(()=>{this.attachDragHandleListener()}),n.has("drag_handle_selector")&&(this.drag_handle_selector?this.setAttribute("data-drag-handle-selector",""):this.removeAttribute("data-drag-handle-selector")),n.has("data")&&!this.isResizing&&Promise.resolve().then(()=>this.updateMeasuredSize())}updateMeasuredSize(n=!1){if(!this.instance||!this.id)return;const s=this.getBoundingClientRect(),r=this.instance.getViewport?.().zoom||1,o=s.width/r,a=s.height/r,l=!this.lastMeasured||Math.abs(this.lastMeasured.width-o)>.5||Math.abs(this.lastMeasured.height-a)>.5;!n&&!l||(this.lastMeasured={width:o,height:a},this.instance.updateNode(this.id,{measured:{width:o,height:a}}))}appendResizerToDOM(){if(this.removeExistingResizer(),this.resizable&&this.selected){const n=this.renderResizer();if(n){const s=document.createElement("div");s.className="mixin-resizer-container",s.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10;
          `,this.shadowRoot?.appendChild(s),Rn(n,s)}}}removeExistingResizer(){const n=this.shadowRoot?.querySelector(".mixin-resizer-container");n&&n.remove()}attachDragHandleListener(){if(this.removeDragHandleListener(),!this.draggable||!this.drag_handle_selector)return;const n=this.shadowRoot;if(!n){setTimeout(()=>this.attachDragHandleListener(),0);return}const s=n.querySelector(this.drag_handle_selector);s&&(this.dragHandleElement=s,s.addEventListener("mousedown",this.handleMouseDown),s.style.cursor="grab")}removeDragHandleListener(){this.dragHandleElement&&(this.dragHandleElement.removeEventListener("mousedown",this.handleMouseDown),this.dragHandleElement.style.cursor="",this.dragHandleElement=null)}adjustHeightToContent(){if(this.maxInitialHeight<=0||!this.instance||!this.id||this.isResizing)return;const n=this.style.height;this.style.height="auto",this.offsetHeight;const s=this.scrollHeight||this.getBoundingClientRect().height;s>this.maxInitialHeight?(this.style.height=`${this.maxInitialHeight}px`,this.instance.updateNode(this.id,{height:this.maxInitialHeight,measured:{width:this.offsetWidth||this.getBoundingClientRect().width,height:this.maxInitialHeight}})):(n?this.style.height=n:this.style.height="",s>0&&this.instance.updateNode(this.id,{height:s,measured:{width:this.offsetWidth||this.getBoundingClientRect().width,height:s}}))}async waitForNestedUpdates(){const n=[];this.shadowRoot&&n.push(this.shadowRoot),n.push(this);const s=[];for(const r of n)r.querySelectorAll("*").forEach(o=>{const a=o.updateComplete;a&&typeof a.then=="function"&&s.push(a)});if(s.length)try{await Promise.all(s)}catch{}}async notifyHandlesUpdated(n){const{handleIds:s,updateDimensions:r=!0}=n||{};await this.updateComplete,await this.waitForNestedUpdates(),await new Promise(o=>requestAnimationFrame(()=>o())),await new Promise(o=>requestAnimationFrame(()=>o())),await new Promise(o=>setTimeout(o,0)),this.instance&&this.id&&(r&&this.updateMeasuredSize(!0),this.dispatchEvent(new CustomEvent("node-handles-updated",{detail:{nodeId:this.id,handleIds:s||[],timestamp:Date.now()},bubbles:!0,composed:!0})))}}return D([v({type:String,reflect:!0})],t.prototype,"id"),D([v({type:Object})],t.prototype,"position"),D([v({type:Object})],t.prototype,"data"),D([v({type:Boolean,reflect:!0})],t.prototype,"selected"),D([v({type:Boolean,reflect:!0})],t.prototype,"dragging"),D([v({type:Object})],t.prototype,"instance"),D([v({type:Boolean})],t.prototype,"resizable"),D([v({type:Boolean})],t.prototype,"draggable"),D([v({type:String})],t.prototype,"drag_handle_selector"),D([v({type:Boolean})],t.prototype,"connectable"),D([v({type:Number})],t.prototype,"minWidth"),D([v({type:Number})],t.prototype,"maxWidth"),D([v({type:Number})],t.prototype,"minHeight"),D([v({type:Number})],t.prototype,"maxHeight"),D([v({type:Boolean})],t.prototype,"keepAspectRatio"),D([v({type:Number})],t.prototype,"maxInitialHeight"),D([v({type:Number})],t.prototype,"width"),D([v({type:Number})],t.prototype,"height"),t},Un="0.4.16",Xn="smooth-load+fitview+render-complete";try{console.info(`%c lit-flow %c v${Un} %c ${Xn} `,"background:#1a73e8;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px;font-weight:600","background:#111;color:#fff;padding:2px 4px","background:#e8f0fe;color:#1a73e8;border-radius:0 3px 3px 0;padding:2px 4px",`
features: measurement gate · batched notify · keyed repeat · robust fitView · fitViewOnInit · flow-render-complete · nested-aware notifyHandlesUpdated`)}catch{}exports.FlowInstance=kn;exports.LIT_FLOW_BUILD=Xn;exports.LIT_FLOW_VERSION=Un;exports.NodeMixin=jl;exports.ShapeRegistry=Kt;exports.createStore=Xa;exports.getBezierPath=$e;exports.getCenter=_l;exports.getDistance=xl;exports.getSmoothStepPath=Ve;exports.getStraightPath=In;exports.isPointInRect=$l;
//# sourceMappingURL=lit-flow.bundle.cjs.map
