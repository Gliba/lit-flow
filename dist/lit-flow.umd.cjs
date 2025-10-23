(function(u,At){typeof exports=="object"&&typeof module<"u"?At(exports):typeof define=="function"&&define.amd?define(["exports"],At):(u=typeof globalThis<"u"?globalThis:u||self,At(u.LitFlow={}))})(this,(function(u){"use strict";var At={value:()=>{}};function Ce(){for(var e=0,t=arguments.length,i={},n;e<t;++e){if(!(n=arguments[e]+"")||n in i||/[\s.]/.test(n))throw new Error("illegal type: "+n);i[n]=[]}return new ee(i)}function ee(e){this._=e}function Hn(e,t){return e.trim().split(/^|\s+/).map(function(i){var n="",s=i.indexOf(".");if(s>=0&&(n=i.slice(s+1),i=i.slice(0,s)),i&&!t.hasOwnProperty(i))throw new Error("unknown type: "+i);return{type:i,name:n}})}ee.prototype=Ce.prototype={constructor:ee,on:function(e,t){var i=this._,n=Hn(e+"",i),s,r=-1,o=n.length;if(arguments.length<2){for(;++r<o;)if((s=(e=n[r]).type)&&(s=Rn(i[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<o;)if(s=(e=n[r]).type)i[s]=li(i[s],e.name,t);else if(t==null)for(s in i)i[s]=li(i[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var i in t)e[i]=t[i].slice();return new ee(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var i=new Array(s),n=0,s,r;n<s;++n)i[n]=arguments[n+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(r=this._[e],n=0,s=r.length;n<s;++n)r[n].value.apply(t,i)},apply:function(e,t,i){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var n=this._[e],s=0,r=n.length;s<r;++s)n[s].value.apply(t,i)}};function Rn(e,t){for(var i=0,n=e.length,s;i<n;++i)if((s=e[i]).name===t)return s.value}function li(e,t,i){for(var n=0,s=e.length;n<s;++n)if(e[n].name===t){e[n]=At,e=e.slice(0,n).concat(e.slice(n+1));break}return i!=null&&e.push({name:t,value:i}),e}var Me="http://www.w3.org/1999/xhtml";const hi={svg:"http://www.w3.org/2000/svg",xhtml:Me,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ie(e){var t=e+="",i=t.indexOf(":");return i>=0&&(t=e.slice(0,i))!=="xmlns"&&(e=e.slice(i+1)),hi.hasOwnProperty(t)?{space:hi[t],local:e}:e}function Ln(e){return function(){var t=this.ownerDocument,i=this.namespaceURI;return i===Me&&t.documentElement.namespaceURI===Me?t.createElement(e):t.createElementNS(i,e)}}function Tn(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function ci(e){var t=ie(e);return(t.local?Tn:Ln)(t)}function Dn(){}function Ae(e){return e==null?Dn:function(){return this.querySelector(e)}}function On(e){typeof e!="function"&&(e=Ae(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=new Array(o),l,c,h=0;h<o;++h)(l=r[h])&&(c=e.call(l,l.__data__,h,r))&&("__data__"in l&&(c.__data__=l.__data__),a[h]=c);return new q(n,this._parents)}function Bn(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Fn(){return[]}function di(e){return e==null?Fn:function(){return this.querySelectorAll(e)}}function In(e){return function(){return Bn(e.apply(this,arguments))}}function Un(e){typeof e=="function"?e=In(e):e=di(e);for(var t=this._groups,i=t.length,n=[],s=[],r=0;r<i;++r)for(var o=t[r],a=o.length,l,c=0;c<a;++c)(l=o[c])&&(n.push(e.call(l,l.__data__,c,o)),s.push(l));return new q(n,s)}function ui(e){return function(){return this.matches(e)}}function fi(e){return function(t){return t.matches(e)}}var Xn=Array.prototype.find;function Yn(e){return function(){return Xn.call(this.children,e)}}function Zn(){return this.firstElementChild}function qn(e){return this.select(e==null?Zn:Yn(typeof e=="function"?e:fi(e)))}var Wn=Array.prototype.filter;function Vn(){return Array.from(this.children)}function Gn(e){return function(){return Wn.call(this.children,e)}}function jn(e){return this.selectAll(e==null?Vn:Gn(typeof e=="function"?e:fi(e)))}function Kn(e){typeof e!="function"&&(e=ui(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],l,c=0;c<o;++c)(l=r[c])&&e.call(l,l.__data__,c,r)&&a.push(l);return new q(n,this._parents)}function pi(e){return new Array(e.length)}function Qn(){return new q(this._enter||this._groups.map(pi),this._parents)}function ne(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}ne.prototype={constructor:ne,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Jn(e){return function(){return e}}function ts(e,t,i,n,s,r){for(var o=0,a,l=t.length,c=r.length;o<c;++o)(a=t[o])?(a.__data__=r[o],n[o]=a):i[o]=new ne(e,r[o]);for(;o<l;++o)(a=t[o])&&(s[o]=a)}function es(e,t,i,n,s,r,o){var a,l,c=new Map,h=t.length,d=r.length,p=new Array(h),g;for(a=0;a<h;++a)(l=t[a])&&(p[a]=g=o.call(l,l.__data__,a,t)+"",c.has(g)?s[a]=l:c.set(g,l));for(a=0;a<d;++a)g=o.call(e,r[a],a,r)+"",(l=c.get(g))?(n[a]=l,l.__data__=r[a],c.delete(g)):i[a]=new ne(e,r[a]);for(a=0;a<h;++a)(l=t[a])&&c.get(p[a])===l&&(s[a]=l)}function is(e){return e.__data__}function ns(e,t){if(!arguments.length)return Array.from(this,is);var i=t?es:ts,n=this._parents,s=this._groups;typeof e!="function"&&(e=Jn(e));for(var r=s.length,o=new Array(r),a=new Array(r),l=new Array(r),c=0;c<r;++c){var h=n[c],d=s[c],p=d.length,g=ss(e.call(h,h&&h.__data__,c,n)),y=g.length,$=a[c]=new Array(y),k=o[c]=new Array(y),b=l[c]=new Array(p);i(h,d,$,k,b,g,t);for(var N=0,P=0,D,Z;N<y;++N)if(D=$[N]){for(N>=P&&(P=N+1);!(Z=k[P])&&++P<y;);D._next=Z||null}}return o=new q(o,n),o._enter=a,o._exit=l,o}function ss(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function rs(){return new q(this._exit||this._groups.map(pi),this._parents)}function os(e,t,i){var n=this.enter(),s=this,r=this.exit();return typeof e=="function"?(n=e(n),n&&(n=n.selection())):n=n.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),i==null?r.remove():i(r),n&&s?n.merge(s).order():s}function as(e){for(var t=e.selection?e.selection():e,i=this._groups,n=t._groups,s=i.length,r=n.length,o=Math.min(s,r),a=new Array(s),l=0;l<o;++l)for(var c=i[l],h=n[l],d=c.length,p=a[l]=new Array(d),g,y=0;y<d;++y)(g=c[y]||h[y])&&(p[y]=g);for(;l<s;++l)a[l]=i[l];return new q(a,this._parents)}function ls(){for(var e=this._groups,t=-1,i=e.length;++t<i;)for(var n=e[t],s=n.length-1,r=n[s],o;--s>=0;)(o=n[s])&&(r&&o.compareDocumentPosition(r)^4&&r.parentNode.insertBefore(o,r),r=o);return this}function hs(e){e||(e=cs);function t(d,p){return d&&p?e(d.__data__,p.__data__):!d-!p}for(var i=this._groups,n=i.length,s=new Array(n),r=0;r<n;++r){for(var o=i[r],a=o.length,l=s[r]=new Array(a),c,h=0;h<a;++h)(c=o[h])&&(l[h]=c);l.sort(t)}return new q(s,this._parents).order()}function cs(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function ds(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function us(){return Array.from(this)}function fs(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length;s<r;++s){var o=n[s];if(o)return o}return null}function ps(){let e=0;for(const t of this)++e;return e}function gs(){return!this.node()}function ms(e){for(var t=this._groups,i=0,n=t.length;i<n;++i)for(var s=t[i],r=0,o=s.length,a;r<o;++r)(a=s[r])&&e.call(a,a.__data__,r,s);return this}function ys(e){return function(){this.removeAttribute(e)}}function ws(e){return function(){this.removeAttributeNS(e.space,e.local)}}function vs(e,t){return function(){this.setAttribute(e,t)}}function bs(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function xs(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttribute(e):this.setAttribute(e,i)}}function $s(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,i)}}function _s(e,t){var i=ie(e);if(arguments.length<2){var n=this.node();return i.local?n.getAttributeNS(i.space,i.local):n.getAttribute(i)}return this.each((t==null?i.local?ws:ys:typeof t=="function"?i.local?$s:xs:i.local?bs:vs)(i,t))}function gi(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function zs(e){return function(){this.style.removeProperty(e)}}function Ss(e,t,i){return function(){this.style.setProperty(e,t,i)}}function Es(e,t,i){return function(){var n=t.apply(this,arguments);n==null?this.style.removeProperty(e):this.style.setProperty(e,n,i)}}function ks(e,t,i){return arguments.length>1?this.each((t==null?zs:typeof t=="function"?Es:Ss)(e,t,i??"")):St(this.node(),e)}function St(e,t){return e.style.getPropertyValue(t)||gi(e).getComputedStyle(e,null).getPropertyValue(t)}function Ns(e){return function(){delete this[e]}}function Cs(e,t){return function(){this[e]=t}}function Ms(e,t){return function(){var i=t.apply(this,arguments);i==null?delete this[e]:this[e]=i}}function As(e,t){return arguments.length>1?this.each((t==null?Ns:typeof t=="function"?Ms:Cs)(e,t)):this.node()[e]}function mi(e){return e.trim().split(/^|\s+/)}function Pe(e){return e.classList||new yi(e)}function yi(e){this._node=e,this._names=mi(e.getAttribute("class")||"")}yi.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function wi(e,t){for(var i=Pe(e),n=-1,s=t.length;++n<s;)i.add(t[n])}function vi(e,t){for(var i=Pe(e),n=-1,s=t.length;++n<s;)i.remove(t[n])}function Ps(e){return function(){wi(this,e)}}function Hs(e){return function(){vi(this,e)}}function Rs(e,t){return function(){(t.apply(this,arguments)?wi:vi)(this,e)}}function Ls(e,t){var i=mi(e+"");if(arguments.length<2){for(var n=Pe(this.node()),s=-1,r=i.length;++s<r;)if(!n.contains(i[s]))return!1;return!0}return this.each((typeof t=="function"?Rs:t?Ps:Hs)(i,t))}function Ts(){this.textContent=""}function Ds(e){return function(){this.textContent=e}}function Os(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Bs(e){return arguments.length?this.each(e==null?Ts:(typeof e=="function"?Os:Ds)(e)):this.node().textContent}function Fs(){this.innerHTML=""}function Is(e){return function(){this.innerHTML=e}}function Us(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Xs(e){return arguments.length?this.each(e==null?Fs:(typeof e=="function"?Us:Is)(e)):this.node().innerHTML}function Ys(){this.nextSibling&&this.parentNode.appendChild(this)}function Zs(){return this.each(Ys)}function qs(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Ws(){return this.each(qs)}function Vs(e){var t=typeof e=="function"?e:ci(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Gs(){return null}function js(e,t){var i=typeof e=="function"?e:ci(e),n=t==null?Gs:typeof t=="function"?t:Ae(t);return this.select(function(){return this.insertBefore(i.apply(this,arguments),n.apply(this,arguments)||null)})}function Ks(){var e=this.parentNode;e&&e.removeChild(this)}function Qs(){return this.each(Ks)}function Js(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function tr(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function er(e){return this.select(e?tr:Js)}function ir(e){return arguments.length?this.property("__data__",e):this.node().__data__}function nr(e){return function(t){e.call(this,t,this.__data__)}}function sr(e){return e.trim().split(/^|\s+/).map(function(t){var i="",n=t.indexOf(".");return n>=0&&(i=t.slice(n+1),t=t.slice(0,n)),{type:t,name:i}})}function rr(e){return function(){var t=this.__on;if(t){for(var i=0,n=-1,s=t.length,r;i<s;++i)r=t[i],(!e.type||r.type===e.type)&&r.name===e.name?this.removeEventListener(r.type,r.listener,r.options):t[++n]=r;++n?t.length=n:delete this.__on}}}function or(e,t,i){return function(){var n=this.__on,s,r=nr(t);if(n){for(var o=0,a=n.length;o<a;++o)if((s=n[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=r,s.options=i),s.value=t;return}}this.addEventListener(e.type,r,i),s={type:e.type,name:e.name,value:t,listener:r,options:i},n?n.push(s):this.__on=[s]}}function ar(e,t,i){var n=sr(e+""),s,r=n.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,h;l<c;++l)for(s=0,h=a[l];s<r;++s)if((o=n[s]).type===h.type&&o.name===h.name)return h.value}return}for(a=t?or:rr,s=0;s<r;++s)this.each(a(n[s],t,i));return this}function bi(e,t,i){var n=gi(e),s=n.CustomEvent;typeof s=="function"?s=new s(t,i):(s=n.document.createEvent("Event"),i?(s.initEvent(t,i.bubbles,i.cancelable),s.detail=i.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function lr(e,t){return function(){return bi(this,e,t)}}function hr(e,t){return function(){return bi(this,e,t.apply(this,arguments))}}function cr(e,t){return this.each((typeof t=="function"?hr:lr)(e,t))}function*dr(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length,o;s<r;++s)(o=n[s])&&(yield o)}var xi=[null];function q(e,t){this._groups=e,this._parents=t}function Pt(){return new q([[document.documentElement]],xi)}function ur(){return this}q.prototype=Pt.prototype={constructor:q,select:On,selectAll:Un,selectChild:qn,selectChildren:jn,filter:Kn,data:ns,enter:Qn,exit:rs,join:os,merge:as,selection:ur,order:ls,sort:hs,call:ds,nodes:us,node:fs,size:ps,empty:gs,each:ms,attr:_s,style:ks,property:As,classed:Ls,text:Bs,html:Xs,raise:Zs,lower:Ws,append:Vs,insert:js,remove:Qs,clone:er,datum:ir,on:ar,dispatch:cr,[Symbol.iterator]:dr};function ut(e){return typeof e=="string"?new q([[document.querySelector(e)]],[document.documentElement]):new q([[e]],xi)}function fr(e){let t;for(;t=e.sourceEvent;)e=t;return e}function ft(e,t){if(e=fr(e),t===void 0&&(t=e.currentTarget),t){var i=t.ownerSVGElement||t;if(i.createSVGPoint){var n=i.createSVGPoint();return n.x=e.clientX,n.y=e.clientY,n=n.matrixTransform(t.getScreenCTM().inverse()),[n.x,n.y]}if(t.getBoundingClientRect){var s=t.getBoundingClientRect();return[e.clientX-s.left-t.clientLeft,e.clientY-s.top-t.clientTop]}}return[e.pageX,e.pageY]}const He={capture:!0,passive:!1};function Re(e){e.preventDefault(),e.stopImmediatePropagation()}function pr(e){var t=e.document.documentElement,i=ut(e).on("dragstart.drag",Re,He);"onselectstart"in t?i.on("selectstart.drag",Re,He):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function gr(e,t){var i=e.document.documentElement,n=ut(e).on("dragstart.drag",null);t&&(n.on("click.drag",Re,He),setTimeout(function(){n.on("click.drag",null)},0)),"onselectstart"in i?n.on("selectstart.drag",null):(i.style.MozUserSelect=i.__noselect,delete i.__noselect)}function Le(e,t,i){e.prototype=t.prototype=i,i.constructor=e}function $i(e,t){var i=Object.create(e.prototype);for(var n in t)i[n]=t[n];return i}function Ht(){}var Rt=.7,se=1/Rt,Et="\\s*([+-]?\\d+)\\s*",Lt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",nt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",mr=/^#([0-9a-f]{3,8})$/,yr=new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`),wr=new RegExp(`^rgb\\(${nt},${nt},${nt}\\)$`),vr=new RegExp(`^rgba\\(${Et},${Et},${Et},${Lt}\\)$`),br=new RegExp(`^rgba\\(${nt},${nt},${nt},${Lt}\\)$`),xr=new RegExp(`^hsl\\(${Lt},${nt},${nt}\\)$`),$r=new RegExp(`^hsla\\(${Lt},${nt},${nt},${Lt}\\)$`),_i={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Le(Ht,mt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:zi,formatHex:zi,formatHex8:_r,formatHsl:zr,formatRgb:Si,toString:Si});function zi(){return this.rgb().formatHex()}function _r(){return this.rgb().formatHex8()}function zr(){return Mi(this).formatHsl()}function Si(){return this.rgb().formatRgb()}function mt(e){var t,i;return e=(e+"").trim().toLowerCase(),(t=mr.exec(e))?(i=t[1].length,t=parseInt(t[1],16),i===6?Ei(t):i===3?new I(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):i===8?re(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):i===4?re(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=yr.exec(e))?new I(t[1],t[2],t[3],1):(t=wr.exec(e))?new I(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=vr.exec(e))?re(t[1],t[2],t[3],t[4]):(t=br.exec(e))?re(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=xr.exec(e))?Ci(t[1],t[2]/100,t[3]/100,1):(t=$r.exec(e))?Ci(t[1],t[2]/100,t[3]/100,t[4]):_i.hasOwnProperty(e)?Ei(_i[e]):e==="transparent"?new I(NaN,NaN,NaN,0):null}function Ei(e){return new I(e>>16&255,e>>8&255,e&255,1)}function re(e,t,i,n){return n<=0&&(e=t=i=NaN),new I(e,t,i,n)}function Sr(e){return e instanceof Ht||(e=mt(e)),e?(e=e.rgb(),new I(e.r,e.g,e.b,e.opacity)):new I}function Te(e,t,i,n){return arguments.length===1?Sr(e):new I(e,t,i,n??1)}function I(e,t,i,n){this.r=+e,this.g=+t,this.b=+i,this.opacity=+n}Le(I,Te,$i(Ht,{brighter(e){return e=e==null?se:Math.pow(se,e),new I(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Rt:Math.pow(Rt,e),new I(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new I(yt(this.r),yt(this.g),yt(this.b),oe(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:ki,formatHex:ki,formatHex8:Er,formatRgb:Ni,toString:Ni}));function ki(){return`#${wt(this.r)}${wt(this.g)}${wt(this.b)}`}function Er(){return`#${wt(this.r)}${wt(this.g)}${wt(this.b)}${wt((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ni(){const e=oe(this.opacity);return`${e===1?"rgb(":"rgba("}${yt(this.r)}, ${yt(this.g)}, ${yt(this.b)}${e===1?")":`, ${e})`}`}function oe(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function yt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function wt(e){return e=yt(e),(e<16?"0":"")+e.toString(16)}function Ci(e,t,i,n){return n<=0?e=t=i=NaN:i<=0||i>=1?e=t=NaN:t<=0&&(e=NaN),new K(e,t,i,n)}function Mi(e){if(e instanceof K)return new K(e.h,e.s,e.l,e.opacity);if(e instanceof Ht||(e=mt(e)),!e)return new K;if(e instanceof K)return e;e=e.rgb();var t=e.r/255,i=e.g/255,n=e.b/255,s=Math.min(t,i,n),r=Math.max(t,i,n),o=NaN,a=r-s,l=(r+s)/2;return a?(t===r?o=(i-n)/a+(i<n)*6:i===r?o=(n-t)/a+2:o=(t-i)/a+4,a/=l<.5?r+s:2-r-s,o*=60):a=l>0&&l<1?0:o,new K(o,a,l,e.opacity)}function kr(e,t,i,n){return arguments.length===1?Mi(e):new K(e,t,i,n??1)}function K(e,t,i,n){this.h=+e,this.s=+t,this.l=+i,this.opacity=+n}Le(K,kr,$i(Ht,{brighter(e){return e=e==null?se:Math.pow(se,e),new K(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Rt:Math.pow(Rt,e),new K(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,i=this.l,n=i+(i<.5?i:1-i)*t,s=2*i-n;return new I(De(e>=240?e-240:e+120,s,n),De(e,s,n),De(e<120?e+240:e-120,s,n),this.opacity)},clamp(){return new K(Ai(this.h),ae(this.s),ae(this.l),oe(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=oe(this.opacity);return`${e===1?"hsl(":"hsla("}${Ai(this.h)}, ${ae(this.s)*100}%, ${ae(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Ai(e){return e=(e||0)%360,e<0?e+360:e}function ae(e){return Math.max(0,Math.min(1,e||0))}function De(e,t,i){return(e<60?t+(i-t)*e/60:e<180?i:e<240?t+(i-t)*(240-e)/60:t)*255}const Oe=e=>()=>e;function Nr(e,t){return function(i){return e+i*t}}function Cr(e,t,i){return e=Math.pow(e,i),t=Math.pow(t,i)-e,i=1/i,function(n){return Math.pow(e+n*t,i)}}function Mr(e){return(e=+e)==1?Pi:function(t,i){return i-t?Cr(t,i,e):Oe(isNaN(t)?i:t)}}function Pi(e,t){var i=t-e;return i?Nr(e,i):Oe(isNaN(e)?t:e)}const le=(function e(t){var i=Mr(t);function n(s,r){var o=i((s=Te(s)).r,(r=Te(r)).r),a=i(s.g,r.g),l=i(s.b,r.b),c=Pi(s.opacity,r.opacity);return function(h){return s.r=o(h),s.g=a(h),s.b=l(h),s.opacity=c(h),s+""}}return n.gamma=e,n})(1);function Ar(e,t){t||(t=[]);var i=e?Math.min(t.length,e.length):0,n=t.slice(),s;return function(r){for(s=0;s<i;++s)n[s]=e[s]*(1-r)+t[s]*r;return n}}function Pr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Hr(e,t){var i=t?t.length:0,n=e?Math.min(i,e.length):0,s=new Array(n),r=new Array(i),o;for(o=0;o<n;++o)s[o]=Tt(e[o],t[o]);for(;o<i;++o)r[o]=t[o];return function(a){for(o=0;o<n;++o)r[o]=s[o](a);return r}}function Rr(e,t){var i=new Date;return e=+e,t=+t,function(n){return i.setTime(e*(1-n)+t*n),i}}function st(e,t){return e=+e,t=+t,function(i){return e*(1-i)+t*i}}function Lr(e,t){var i={},n={},s;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(s in t)s in e?i[s]=Tt(e[s],t[s]):n[s]=t[s];return function(r){for(s in i)n[s]=i[s](r);return n}}var Be=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Fe=new RegExp(Be.source,"g");function Tr(e){return function(){return e}}function Dr(e){return function(t){return e(t)+""}}function Hi(e,t){var i=Be.lastIndex=Fe.lastIndex=0,n,s,r,o=-1,a=[],l=[];for(e=e+"",t=t+"";(n=Be.exec(e))&&(s=Fe.exec(t));)(r=s.index)>i&&(r=t.slice(i,r),a[o]?a[o]+=r:a[++o]=r),(n=n[0])===(s=s[0])?a[o]?a[o]+=s:a[++o]=s:(a[++o]=null,l.push({i:o,x:st(n,s)})),i=Fe.lastIndex;return i<t.length&&(r=t.slice(i),a[o]?a[o]+=r:a[++o]=r),a.length<2?l[0]?Dr(l[0].x):Tr(t):(t=l.length,function(c){for(var h=0,d;h<t;++h)a[(d=l[h]).i]=d.x(c);return a.join("")})}function Tt(e,t){var i=typeof t,n;return t==null||i==="boolean"?Oe(t):(i==="number"?st:i==="string"?(n=mt(t))?(t=n,le):Hi:t instanceof mt?le:t instanceof Date?Rr:Pr(t)?Ar:Array.isArray(t)?Hr:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Lr:st)(e,t)}var Ri=180/Math.PI,Ie={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Li(e,t,i,n,s,r){var o,a,l;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(l=e*i+t*n)&&(i-=e*l,n-=t*l),(a=Math.sqrt(i*i+n*n))&&(i/=a,n/=a,l/=a),e*n<t*i&&(e=-e,t=-t,l=-l,o=-o),{translateX:s,translateY:r,rotate:Math.atan2(t,e)*Ri,skewX:Math.atan(l)*Ri,scaleX:o,scaleY:a}}var he;function Or(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Ie:Li(t.a,t.b,t.c,t.d,t.e,t.f)}function Br(e){return e==null||(he||(he=document.createElementNS("http://www.w3.org/2000/svg","g")),he.setAttribute("transform",e),!(e=he.transform.baseVal.consolidate()))?Ie:(e=e.matrix,Li(e.a,e.b,e.c,e.d,e.e,e.f))}function Ti(e,t,i,n){function s(c){return c.length?c.pop()+" ":""}function r(c,h,d,p,g,y){if(c!==d||h!==p){var $=g.push("translate(",null,t,null,i);y.push({i:$-4,x:st(c,d)},{i:$-2,x:st(h,p)})}else(d||p)&&g.push("translate("+d+t+p+i)}function o(c,h,d,p){c!==h?(c-h>180?h+=360:h-c>180&&(c+=360),p.push({i:d.push(s(d)+"rotate(",null,n)-2,x:st(c,h)})):h&&d.push(s(d)+"rotate("+h+n)}function a(c,h,d,p){c!==h?p.push({i:d.push(s(d)+"skewX(",null,n)-2,x:st(c,h)}):h&&d.push(s(d)+"skewX("+h+n)}function l(c,h,d,p,g,y){if(c!==d||h!==p){var $=g.push(s(g)+"scale(",null,",",null,")");y.push({i:$-4,x:st(c,d)},{i:$-2,x:st(h,p)})}else(d!==1||p!==1)&&g.push(s(g)+"scale("+d+","+p+")")}return function(c,h){var d=[],p=[];return c=e(c),h=e(h),r(c.translateX,c.translateY,h.translateX,h.translateY,d,p),o(c.rotate,h.rotate,d,p),a(c.skewX,h.skewX,d,p),l(c.scaleX,c.scaleY,h.scaleX,h.scaleY,d,p),c=h=null,function(g){for(var y=-1,$=p.length,k;++y<$;)d[(k=p[y]).i]=k.x(g);return d.join("")}}}var Fr=Ti(Or,"px, ","px)","deg)"),Ir=Ti(Br,", ",")",")"),Ur=1e-12;function Di(e){return((e=Math.exp(e))+1/e)/2}function Xr(e){return((e=Math.exp(e))-1/e)/2}function Yr(e){return((e=Math.exp(2*e))-1)/(e+1)}const ce=(function e(t,i,n){function s(r,o){var a=r[0],l=r[1],c=r[2],h=o[0],d=o[1],p=o[2],g=h-a,y=d-l,$=g*g+y*y,k,b;if($<Ur)b=Math.log(p/c)/t,k=function(B){return[a+B*g,l+B*y,c*Math.exp(t*B*b)]};else{var N=Math.sqrt($),P=(p*p-c*c+n*$)/(2*c*i*N),D=(p*p-c*c-n*$)/(2*p*i*N),Z=Math.log(Math.sqrt(P*P+1)-P),R=Math.log(Math.sqrt(D*D+1)-D);b=(R-Z)/t,k=function(B){var tt=B*b,et=Di(Z),gt=c/(i*N)*(et*Yr(t*tt+Z)-Xr(Z));return[a+gt*g,l+gt*y,c*et/Di(t*tt+Z)]}}return k.duration=b*1e3*t/Math.SQRT2,k}return s.rho=function(r){var o=Math.max(.001,+r),a=o*o,l=a*a;return e(o,a,l)},s})(Math.SQRT2,2,4);var kt=0,Dt=0,Ot=0,Oi=1e3,de,Bt,ue=0,vt=0,fe=0,Ft=typeof performance=="object"&&performance.now?performance:Date,Bi=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Ue(){return vt||(Bi(Zr),vt=Ft.now()+fe)}function Zr(){vt=0}function pe(){this._call=this._time=this._next=null}pe.prototype=Fi.prototype={constructor:pe,restart:function(e,t,i){if(typeof e!="function")throw new TypeError("callback is not a function");i=(i==null?Ue():+i)+(t==null?0:+t),!this._next&&Bt!==this&&(Bt?Bt._next=this:de=this,Bt=this),this._call=e,this._time=i,Xe()},stop:function(){this._call&&(this._call=null,this._time=1/0,Xe())}};function Fi(e,t,i){var n=new pe;return n.restart(e,t,i),n}function qr(){Ue(),++kt;for(var e=de,t;e;)(t=vt-e._time)>=0&&e._call.call(void 0,t),e=e._next;--kt}function Ii(){vt=(ue=Ft.now())+fe,kt=Dt=0;try{qr()}finally{kt=0,Vr(),vt=0}}function Wr(){var e=Ft.now(),t=e-ue;t>Oi&&(fe-=t,ue=e)}function Vr(){for(var e,t=de,i,n=1/0;t;)t._call?(n>t._time&&(n=t._time),e=t,t=t._next):(i=t._next,t._next=null,t=e?e._next=i:de=i);Bt=e,Xe(n)}function Xe(e){if(!kt){Dt&&(Dt=clearTimeout(Dt));var t=e-vt;t>24?(e<1/0&&(Dt=setTimeout(Ii,e-Ft.now()-fe)),Ot&&(Ot=clearInterval(Ot))):(Ot||(ue=Ft.now(),Ot=setInterval(Wr,Oi)),kt=1,Bi(Ii))}}function Ui(e,t,i){var n=new pe;return t=t==null?0:+t,n.restart(s=>{n.stop(),e(s+t)},t,i),n}var Gr=Ce("start","end","cancel","interrupt"),jr=[],Xi=0,Yi=1,Ye=2,ge=3,Zi=4,Ze=5,me=6;function ye(e,t,i,n,s,r){var o=e.__transition;if(!o)e.__transition={};else if(i in o)return;Kr(e,i,{name:t,index:n,group:s,on:Gr,tween:jr,time:r.time,delay:r.delay,duration:r.duration,ease:r.ease,timer:null,state:Xi})}function qe(e,t){var i=Q(e,t);if(i.state>Xi)throw new Error("too late; already scheduled");return i}function rt(e,t){var i=Q(e,t);if(i.state>ge)throw new Error("too late; already running");return i}function Q(e,t){var i=e.__transition;if(!i||!(i=i[t]))throw new Error("transition not found");return i}function Kr(e,t,i){var n=e.__transition,s;n[t]=i,i.timer=Fi(r,0,i.time);function r(c){i.state=Yi,i.timer.restart(o,i.delay,i.time),i.delay<=c&&o(c-i.delay)}function o(c){var h,d,p,g;if(i.state!==Yi)return l();for(h in n)if(g=n[h],g.name===i.name){if(g.state===ge)return Ui(o);g.state===Zi?(g.state=me,g.timer.stop(),g.on.call("interrupt",e,e.__data__,g.index,g.group),delete n[h]):+h<t&&(g.state=me,g.timer.stop(),g.on.call("cancel",e,e.__data__,g.index,g.group),delete n[h])}if(Ui(function(){i.state===ge&&(i.state=Zi,i.timer.restart(a,i.delay,i.time),a(c))}),i.state=Ye,i.on.call("start",e,e.__data__,i.index,i.group),i.state===Ye){for(i.state=ge,s=new Array(p=i.tween.length),h=0,d=-1;h<p;++h)(g=i.tween[h].value.call(e,e.__data__,i.index,i.group))&&(s[++d]=g);s.length=d+1}}function a(c){for(var h=c<i.duration?i.ease.call(null,c/i.duration):(i.timer.restart(l),i.state=Ze,1),d=-1,p=s.length;++d<p;)s[d].call(e,h);i.state===Ze&&(i.on.call("end",e,e.__data__,i.index,i.group),l())}function l(){i.state=me,i.timer.stop(),delete n[t];for(var c in n)return;delete e.__transition}}function we(e,t){var i=e.__transition,n,s,r=!0,o;if(i){t=t==null?null:t+"";for(o in i){if((n=i[o]).name!==t){r=!1;continue}s=n.state>Ye&&n.state<Ze,n.state=me,n.timer.stop(),n.on.call(s?"interrupt":"cancel",e,e.__data__,n.index,n.group),delete i[o]}r&&delete e.__transition}}function Qr(e){return this.each(function(){we(this,e)})}function Jr(e,t){var i,n;return function(){var s=rt(this,e),r=s.tween;if(r!==i){n=i=r;for(var o=0,a=n.length;o<a;++o)if(n[o].name===t){n=n.slice(),n.splice(o,1);break}}s.tween=n}}function to(e,t,i){var n,s;if(typeof i!="function")throw new Error;return function(){var r=rt(this,e),o=r.tween;if(o!==n){s=(n=o).slice();for(var a={name:t,value:i},l=0,c=s.length;l<c;++l)if(s[l].name===t){s[l]=a;break}l===c&&s.push(a)}r.tween=s}}function eo(e,t){var i=this._id;if(e+="",arguments.length<2){for(var n=Q(this.node(),i).tween,s=0,r=n.length,o;s<r;++s)if((o=n[s]).name===e)return o.value;return null}return this.each((t==null?Jr:to)(i,e,t))}function We(e,t,i){var n=e._id;return e.each(function(){var s=rt(this,n);(s.value||(s.value={}))[t]=i.apply(this,arguments)}),function(s){return Q(s,n).value[t]}}function qi(e,t){var i;return(typeof t=="number"?st:t instanceof mt?le:(i=mt(t))?(t=i,le):Hi)(e,t)}function io(e){return function(){this.removeAttribute(e)}}function no(e){return function(){this.removeAttributeNS(e.space,e.local)}}function so(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttribute(e);return o===s?null:o===n?r:r=t(n=o,i)}}function ro(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===n?r:r=t(n=o,i)}}function oo(e,t,i){var n,s,r;return function(){var o,a=i(this),l;return a==null?void this.removeAttribute(e):(o=this.getAttribute(e),l=a+"",o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a)))}}function ao(e,t,i){var n,s,r;return function(){var o,a=i(this),l;return a==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),l=a+"",o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a)))}}function lo(e,t){var i=ie(e),n=i==="transform"?Ir:qi;return this.attrTween(e,typeof t=="function"?(i.local?ao:oo)(i,n,We(this,"attr."+e,t)):t==null?(i.local?no:io)(i):(i.local?ro:so)(i,n,t))}function ho(e,t){return function(i){this.setAttribute(e,t.call(this,i))}}function co(e,t){return function(i){this.setAttributeNS(e.space,e.local,t.call(this,i))}}function uo(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&co(e,r)),i}return s._value=t,s}function fo(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&ho(e,r)),i}return s._value=t,s}function po(e,t){var i="attr."+e;if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;var n=ie(e);return this.tween(i,(n.local?uo:fo)(n,t))}function go(e,t){return function(){qe(this,e).delay=+t.apply(this,arguments)}}function mo(e,t){return t=+t,function(){qe(this,e).delay=t}}function yo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?go:mo)(t,e)):Q(this.node(),t).delay}function wo(e,t){return function(){rt(this,e).duration=+t.apply(this,arguments)}}function vo(e,t){return t=+t,function(){rt(this,e).duration=t}}function bo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?wo:vo)(t,e)):Q(this.node(),t).duration}function xo(e,t){if(typeof t!="function")throw new Error;return function(){rt(this,e).ease=t}}function $o(e){var t=this._id;return arguments.length?this.each(xo(t,e)):Q(this.node(),t).ease}function _o(e,t){return function(){var i=t.apply(this,arguments);if(typeof i!="function")throw new Error;rt(this,e).ease=i}}function zo(e){if(typeof e!="function")throw new Error;return this.each(_o(this._id,e))}function So(e){typeof e!="function"&&(e=ui(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],l,c=0;c<o;++c)(l=r[c])&&e.call(l,l.__data__,c,r)&&a.push(l);return new lt(n,this._parents,this._name,this._id)}function Eo(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,i=e._groups,n=t.length,s=i.length,r=Math.min(n,s),o=new Array(n),a=0;a<r;++a)for(var l=t[a],c=i[a],h=l.length,d=o[a]=new Array(h),p,g=0;g<h;++g)(p=l[g]||c[g])&&(d[g]=p);for(;a<n;++a)o[a]=t[a];return new lt(o,this._parents,this._name,this._id)}function ko(e){return(e+"").trim().split(/^|\s+/).every(function(t){var i=t.indexOf(".");return i>=0&&(t=t.slice(0,i)),!t||t==="start"})}function No(e,t,i){var n,s,r=ko(t)?qe:rt;return function(){var o=r(this,e),a=o.on;a!==n&&(s=(n=a).copy()).on(t,i),o.on=s}}function Co(e,t){var i=this._id;return arguments.length<2?Q(this.node(),i).on.on(e):this.each(No(i,e,t))}function Mo(e){return function(){var t=this.parentNode;for(var i in this.__transition)if(+i!==e)return;t&&t.removeChild(this)}}function Ao(){return this.on("end.remove",Mo(this._id))}function Po(e){var t=this._name,i=this._id;typeof e!="function"&&(e=Ae(e));for(var n=this._groups,s=n.length,r=new Array(s),o=0;o<s;++o)for(var a=n[o],l=a.length,c=r[o]=new Array(l),h,d,p=0;p<l;++p)(h=a[p])&&(d=e.call(h,h.__data__,p,a))&&("__data__"in h&&(d.__data__=h.__data__),c[p]=d,ye(c[p],t,i,p,c,Q(h,i)));return new lt(r,this._parents,t,i)}function Ho(e){var t=this._name,i=this._id;typeof e!="function"&&(e=di(e));for(var n=this._groups,s=n.length,r=[],o=[],a=0;a<s;++a)for(var l=n[a],c=l.length,h,d=0;d<c;++d)if(h=l[d]){for(var p=e.call(h,h.__data__,d,l),g,y=Q(h,i),$=0,k=p.length;$<k;++$)(g=p[$])&&ye(g,t,i,$,p,y);r.push(p),o.push(h)}return new lt(r,o,t,i)}var Ro=Pt.prototype.constructor;function Lo(){return new Ro(this._groups,this._parents)}function To(e,t){var i,n,s;return function(){var r=St(this,e),o=(this.style.removeProperty(e),St(this,e));return r===o?null:r===i&&o===n?s:s=t(i=r,n=o)}}function Wi(e){return function(){this.style.removeProperty(e)}}function Do(e,t,i){var n,s=i+"",r;return function(){var o=St(this,e);return o===s?null:o===n?r:r=t(n=o,i)}}function Oo(e,t,i){var n,s,r;return function(){var o=St(this,e),a=i(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(e),St(this,e))),o===l?null:o===n&&l===s?r:(s=l,r=t(n=o,a))}}function Bo(e,t){var i,n,s,r="style."+t,o="end."+r,a;return function(){var l=rt(this,e),c=l.on,h=l.value[r]==null?a||(a=Wi(t)):void 0;(c!==i||s!==h)&&(n=(i=c).copy()).on(o,s=h),l.on=n}}function Fo(e,t,i){var n=(e+="")=="transform"?Fr:qi;return t==null?this.styleTween(e,To(e,n)).on("end.style."+e,Wi(e)):typeof t=="function"?this.styleTween(e,Oo(e,n,We(this,"style."+e,t))).each(Bo(this._id,e)):this.styleTween(e,Do(e,n,t),i).on("end.style."+e,null)}function Io(e,t,i){return function(n){this.style.setProperty(e,t.call(this,n),i)}}function Uo(e,t,i){var n,s;function r(){var o=t.apply(this,arguments);return o!==s&&(n=(s=o)&&Io(e,o,i)),n}return r._value=t,r}function Xo(e,t,i){var n="style."+(e+="");if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;return this.tween(n,Uo(e,t,i??""))}function Yo(e){return function(){this.textContent=e}}function Zo(e){return function(){var t=e(this);this.textContent=t??""}}function qo(e){return this.tween("text",typeof e=="function"?Zo(We(this,"text",e)):Yo(e==null?"":e+""))}function Wo(e){return function(t){this.textContent=e.call(this,t)}}function Vo(e){var t,i;function n(){var s=e.apply(this,arguments);return s!==i&&(t=(i=s)&&Wo(s)),t}return n._value=e,n}function Go(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,Vo(e))}function jo(){for(var e=this._name,t=this._id,i=Vi(),n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,l,c=0;c<a;++c)if(l=o[c]){var h=Q(l,t);ye(l,e,i,c,o,{time:h.time+h.delay+h.duration,delay:0,duration:h.duration,ease:h.ease})}return new lt(n,this._parents,e,i)}function Ko(){var e,t,i=this,n=i._id,s=i.size();return new Promise(function(r,o){var a={value:o},l={value:function(){--s===0&&r()}};i.each(function(){var c=rt(this,n),h=c.on;h!==e&&(t=(e=h).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),c.on=t}),s===0&&r()})}var Qo=0;function lt(e,t,i,n){this._groups=e,this._parents=t,this._name=i,this._id=n}function Vi(){return++Qo}var ht=Pt.prototype;lt.prototype={constructor:lt,select:Po,selectAll:Ho,selectChild:ht.selectChild,selectChildren:ht.selectChildren,filter:So,merge:Eo,selection:Lo,transition:jo,call:ht.call,nodes:ht.nodes,node:ht.node,size:ht.size,empty:ht.empty,each:ht.each,on:Co,attr:lo,attrTween:po,style:Fo,styleTween:Xo,text:qo,textTween:Go,remove:Ao,tween:eo,delay:yo,duration:bo,ease:$o,easeVarying:zo,end:Ko,[Symbol.iterator]:ht[Symbol.iterator]};function Jo(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var ta={time:null,delay:0,duration:250,ease:Jo};function ea(e,t){for(var i;!(i=e.__transition)||!(i=i[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return i}function ia(e){var t,i;e instanceof lt?(t=e._id,e=e._name):(t=Vi(),(i=ta).time=Ue(),e=e==null?null:e+"");for(var n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,l,c=0;c<a;++c)(l=o[c])&&ye(l,e,t,c,o,i||ea(l,t));return new lt(n,this._parents,e,t)}Pt.prototype.interrupt=Qr,Pt.prototype.transition=ia;const ve=e=>()=>e;function na(e,{sourceEvent:t,target:i,transform:n,dispatch:s}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},transform:{value:n,enumerable:!0,configurable:!0},_:{value:s}})}function ct(e,t,i){this.k=e,this.x=t,this.y=i}ct.prototype={constructor:ct,scale:function(e){return e===1?this:new ct(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new ct(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var be=new ct(1,0,0);Gi.prototype=ct.prototype;function Gi(e){for(;!e.__zoom;)if(!(e=e.parentNode))return be;return e.__zoom}function Ve(e){e.stopImmediatePropagation()}function It(e){e.preventDefault(),e.stopImmediatePropagation()}function sa(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function ra(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function ji(){return this.__zoom||be}function oa(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function aa(){return navigator.maxTouchPoints||"ontouchstart"in this}function la(e,t,i){var n=e.invertX(t[0][0])-i[0][0],s=e.invertX(t[1][0])-i[1][0],r=e.invertY(t[0][1])-i[0][1],o=e.invertY(t[1][1])-i[1][1];return e.translate(s>n?(n+s)/2:Math.min(0,n)||Math.max(0,s),o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o))}function ha(){var e=sa,t=ra,i=la,n=oa,s=aa,r=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],a=250,l=ce,c=Ce("start","zoom","end"),h,d,p,g=500,y=150,$=0,k=10;function b(f){f.property("__zoom",ji).on("wheel.zoom",tt,{passive:!1}).on("mousedown.zoom",et).on("dblclick.zoom",gt).filter(s).on("touchstart.zoom",Jt).on("touchmove.zoom",z).on("touchend.zoom touchcancel.zoom",M).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}b.transform=function(f,w,m,x){var _=f.selection?f.selection():f;_.property("__zoom",ji),f!==_?Z(f,w,m,x):_.interrupt().each(function(){R(this,arguments).event(x).start().zoom(null,typeof w=="function"?w.apply(this,arguments):w).end()})},b.scaleBy=function(f,w,m,x){b.scaleTo(f,function(){var _=this.__zoom.k,S=typeof w=="function"?w.apply(this,arguments):w;return _*S},m,x)},b.scaleTo=function(f,w,m,x){b.transform(f,function(){var _=t.apply(this,arguments),S=this.__zoom,E=m==null?D(_):typeof m=="function"?m.apply(this,arguments):m,A=S.invert(E),H=typeof w=="function"?w.apply(this,arguments):w;return i(P(N(S,H),E,A),_,o)},m,x)},b.translateBy=function(f,w,m,x){b.transform(f,function(){return i(this.__zoom.translate(typeof w=="function"?w.apply(this,arguments):w,typeof m=="function"?m.apply(this,arguments):m),t.apply(this,arguments),o)},null,x)},b.translateTo=function(f,w,m,x,_){b.transform(f,function(){var S=t.apply(this,arguments),E=this.__zoom,A=x==null?D(S):typeof x=="function"?x.apply(this,arguments):x;return i(be.translate(A[0],A[1]).scale(E.k).translate(typeof w=="function"?-w.apply(this,arguments):-w,typeof m=="function"?-m.apply(this,arguments):-m),S,o)},x,_)};function N(f,w){return w=Math.max(r[0],Math.min(r[1],w)),w===f.k?f:new ct(w,f.x,f.y)}function P(f,w,m){var x=w[0]-m[0]*f.k,_=w[1]-m[1]*f.k;return x===f.x&&_===f.y?f:new ct(f.k,x,_)}function D(f){return[(+f[0][0]+ +f[1][0])/2,(+f[0][1]+ +f[1][1])/2]}function Z(f,w,m,x){f.on("start.zoom",function(){R(this,arguments).event(x).start()}).on("interrupt.zoom end.zoom",function(){R(this,arguments).event(x).end()}).tween("zoom",function(){var _=this,S=arguments,E=R(_,S).event(x),A=t.apply(_,S),H=m==null?D(A):typeof m=="function"?m.apply(_,S):m,W=Math.max(A[1][0]-A[0][0],A[1][1]-A[0][1]),L=_.__zoom,V=typeof w=="function"?w.apply(_,S):w,it=l(L.invert(H).concat(W/L.k),V.invert(H).concat(W/V.k));return function(G){if(G===1)G=V;else{var at=it(G),te=W/at[2];G=new ct(te,H[0]-at[0]*te,H[1]-at[1]*te)}E.zoom(null,G)}})}function R(f,w,m){return!m&&f.__zooming||new B(f,w)}function B(f,w){this.that=f,this.args=w,this.active=0,this.sourceEvent=null,this.extent=t.apply(f,w),this.taps=0}B.prototype={event:function(f){return f&&(this.sourceEvent=f),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(f,w){return this.mouse&&f!=="mouse"&&(this.mouse[1]=w.invert(this.mouse[0])),this.touch0&&f!=="touch"&&(this.touch0[1]=w.invert(this.touch0[0])),this.touch1&&f!=="touch"&&(this.touch1[1]=w.invert(this.touch1[0])),this.that.__zoom=w,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(f){var w=ut(this.that).datum();c.call(f,this.that,new na(f,{sourceEvent:this.sourceEvent,target:b,transform:this.that.__zoom,dispatch:c}),w)}};function tt(f,...w){if(!e.apply(this,arguments))return;var m=R(this,w).event(f),x=this.__zoom,_=Math.max(r[0],Math.min(r[1],x.k*Math.pow(2,n.apply(this,arguments)))),S=ft(f);if(m.wheel)(m.mouse[0][0]!==S[0]||m.mouse[0][1]!==S[1])&&(m.mouse[1]=x.invert(m.mouse[0]=S)),clearTimeout(m.wheel);else{if(x.k===_)return;m.mouse=[S,x.invert(S)],we(this),m.start()}It(f),m.wheel=setTimeout(E,y),m.zoom("mouse",i(P(N(x,_),m.mouse[0],m.mouse[1]),m.extent,o));function E(){m.wheel=null,m.end()}}function et(f,...w){if(p||!e.apply(this,arguments))return;var m=f.currentTarget,x=R(this,w,!0).event(f),_=ut(f.view).on("mousemove.zoom",H,!0).on("mouseup.zoom",W,!0),S=ft(f,m),E=f.clientX,A=f.clientY;pr(f.view),Ve(f),x.mouse=[S,this.__zoom.invert(S)],we(this),x.start();function H(L){if(It(L),!x.moved){var V=L.clientX-E,it=L.clientY-A;x.moved=V*V+it*it>$}x.event(L).zoom("mouse",i(P(x.that.__zoom,x.mouse[0]=ft(L,m),x.mouse[1]),x.extent,o))}function W(L){_.on("mousemove.zoom mouseup.zoom",null),gr(L.view,x.moved),It(L),x.event(L).end()}}function gt(f,...w){if(e.apply(this,arguments)){var m=this.__zoom,x=ft(f.changedTouches?f.changedTouches[0]:f,this),_=m.invert(x),S=m.k*(f.shiftKey?.5:2),E=i(P(N(m,S),x,_),t.apply(this,w),o);It(f),a>0?ut(this).transition().duration(a).call(Z,E,x,f):ut(this).call(b.transform,E,x,f)}}function Jt(f,...w){if(e.apply(this,arguments)){var m=f.touches,x=m.length,_=R(this,w,f.changedTouches.length===x).event(f),S,E,A,H;for(Ve(f),E=0;E<x;++E)A=m[E],H=ft(A,this),H=[H,this.__zoom.invert(H),A.identifier],_.touch0?!_.touch1&&_.touch0[2]!==H[2]&&(_.touch1=H,_.taps=0):(_.touch0=H,S=!0,_.taps=1+!!h);h&&(h=clearTimeout(h)),S&&(_.taps<2&&(d=H[0],h=setTimeout(function(){h=null},g)),we(this),_.start())}}function z(f,...w){if(this.__zooming){var m=R(this,w).event(f),x=f.changedTouches,_=x.length,S,E,A,H;for(It(f),S=0;S<_;++S)E=x[S],A=ft(E,this),m.touch0&&m.touch0[2]===E.identifier?m.touch0[0]=A:m.touch1&&m.touch1[2]===E.identifier&&(m.touch1[0]=A);if(E=m.that.__zoom,m.touch1){var W=m.touch0[0],L=m.touch0[1],V=m.touch1[0],it=m.touch1[1],G=(G=V[0]-W[0])*G+(G=V[1]-W[1])*G,at=(at=it[0]-L[0])*at+(at=it[1]-L[1])*at;E=N(E,Math.sqrt(G/at)),A=[(W[0]+V[0])/2,(W[1]+V[1])/2],H=[(L[0]+it[0])/2,(L[1]+it[1])/2]}else if(m.touch0)A=m.touch0[0],H=m.touch0[1];else return;m.zoom("touch",i(P(E,A,H),m.extent,o))}}function M(f,...w){if(this.__zooming){var m=R(this,w).event(f),x=f.changedTouches,_=x.length,S,E;for(Ve(f),p&&clearTimeout(p),p=setTimeout(function(){p=null},g),S=0;S<_;++S)E=x[S],m.touch0&&m.touch0[2]===E.identifier?delete m.touch0:m.touch1&&m.touch1[2]===E.identifier&&delete m.touch1;if(m.touch1&&!m.touch0&&(m.touch0=m.touch1,delete m.touch1),m.touch0)m.touch0[1]=this.__zoom.invert(m.touch0[0]);else if(m.end(),m.taps===2&&(E=ft(E,this),Math.hypot(d[0]-E[0],d[1]-E[1])<k)){var A=ut(this).on("dblclick.zoom");A&&A.apply(this,arguments)}}}return b.wheelDelta=function(f){return arguments.length?(n=typeof f=="function"?f:ve(+f),b):n},b.filter=function(f){return arguments.length?(e=typeof f=="function"?f:ve(!!f),b):e},b.touchable=function(f){return arguments.length?(s=typeof f=="function"?f:ve(!!f),b):s},b.extent=function(f){return arguments.length?(t=typeof f=="function"?f:ve([[+f[0][0],+f[0][1]],[+f[1][0],+f[1][1]]]),b):t},b.scaleExtent=function(f){return arguments.length?(r[0]=+f[0],r[1]=+f[1],b):[r[0],r[1]]},b.translateExtent=function(f){return arguments.length?(o[0][0]=+f[0][0],o[1][0]=+f[1][0],o[0][1]=+f[0][1],o[1][1]=+f[1][1],b):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},b.constrain=function(f){return arguments.length?(i=f,b):i},b.duration=function(f){return arguments.length?(a=+f,b):a},b.interpolate=function(f){return arguments.length?(l=f,b):l},b.on=function(){var f=c.on.apply(c,arguments);return f===c?b:f},b.clickDistance=function(f){return arguments.length?($=(f=+f)*f,b):Math.sqrt($)},b.tapDistance=function(f){return arguments.length?(k=+f,b):k},b}var Ki;(function(e){e.Strict="strict",e.Loose="loose"})(Ki||(Ki={}));var Ut;(function(e){e.Free="free",e.Vertical="vertical",e.Horizontal="horizontal"})(Ut||(Ut={}));var Qi;(function(e){e.Partial="partial",e.Full="full"})(Qi||(Qi={}));var Ji;(function(e){e.Bezier="default",e.Straight="straight",e.Step="step",e.SmoothStep="smoothstep",e.SimpleBezier="simplebezier"})(Ji||(Ji={}));var tn;(function(e){e.Arrow="arrow",e.ArrowClosed="arrowclosed"})(tn||(tn={})),u.Position=void 0,(function(e){e.Left="left",e.Top="top",e.Right="right",e.Bottom="bottom"})(u.Position||(u.Position={})),u.Position.Left+"",u.Position.Right,u.Position.Right+"",u.Position.Left,u.Position.Top+"",u.Position.Bottom,u.Position.Bottom+"",u.Position.Top;const ca=(e,t=0,i=1)=>Math.min(Math.max(e,t),i),en=e=>!isNaN(e)&&isFinite(e),nn=()=>typeof navigator<"u"&&navigator?.userAgent?.indexOf("Mac")>=0;function da({sourceX:e,sourceY:t,targetX:i,targetY:n,sourceControlX:s,sourceControlY:r,targetControlX:o,targetControlY:a}){const l=e*.125+s*.375+o*.375+i*.125,c=t*.125+r*.375+a*.375+n*.125,h=Math.abs(l-e),d=Math.abs(c-t);return[l,c,h,d]}function xe(e,t){return e>=0?.5*e:t*25*Math.sqrt(-e)}function sn({pos:e,x1:t,y1:i,x2:n,y2:s,c:r}){switch(e){case u.Position.Left:return[t-xe(t-n,r),i];case u.Position.Right:return[t+xe(n-t,r),i];case u.Position.Top:return[t,i-xe(i-s,r)];case u.Position.Bottom:return[t,i+xe(s-i,r)]}}function ua({sourceX:e,sourceY:t,sourcePosition:i=u.Position.Bottom,targetX:n,targetY:s,targetPosition:r=u.Position.Top,curvature:o=.25}){const[a,l]=sn({pos:i,x1:e,y1:t,x2:n,y2:s,c:o}),[c,h]=sn({pos:r,x1:n,y1:s,x2:e,y2:t,c:o}),[d,p,g,y]=da({sourceX:e,sourceY:t,targetX:n,targetY:s,sourceControlX:a,sourceControlY:l,targetControlX:c,targetControlY:h});return[`M${e},${t} C${a},${l} ${c},${h} ${n},${s}`,d,p,g,y]}function rn({sourceX:e,sourceY:t,targetX:i,targetY:n}){const s=Math.abs(i-e)/2,r=i<e?i+s:i-s,o=Math.abs(n-t)/2,a=n<t?n+o:n-o;return[r,a,s,o]}function fa({sourceX:e,sourceY:t,targetX:i,targetY:n}){const[s,r,o,a]=rn({sourceX:e,sourceY:t,targetX:i,targetY:n});return[`M ${e},${t}L ${i},${n}`,s,r,o,a]}const on={[u.Position.Left]:{x:-1,y:0},[u.Position.Right]:{x:1,y:0},[u.Position.Top]:{x:0,y:-1},[u.Position.Bottom]:{x:0,y:1}},pa=({source:e,sourcePosition:t=u.Position.Bottom,target:i})=>t===u.Position.Left||t===u.Position.Right?e.x<i.x?{x:1,y:0}:{x:-1,y:0}:e.y<i.y?{x:0,y:1}:{x:0,y:-1},an=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function ga({source:e,sourcePosition:t=u.Position.Bottom,target:i,targetPosition:n=u.Position.Top,center:s,offset:r,stepPosition:o}){const a=on[t],l=on[n],c={x:e.x+a.x*r,y:e.y+a.y*r},h={x:i.x+l.x*r,y:i.y+l.y*r},d=pa({source:c,sourcePosition:t,target:h}),p=d.x!==0?"x":"y",g=d[p];let y=[],$,k;const b={x:0,y:0},N={x:0,y:0},[,,P,D]=rn({sourceX:e.x,sourceY:e.y,targetX:i.x,targetY:i.y});if(a[p]*l[p]===-1){p==="x"?($=s.x??c.x+(h.x-c.x)*o,k=s.y??(c.y+h.y)/2):($=s.x??(c.x+h.x)/2,k=s.y??c.y+(h.y-c.y)*o);const R=[{x:$,y:c.y},{x:$,y:h.y}],B=[{x:c.x,y:k},{x:h.x,y:k}];a[p]===g?y=p==="x"?R:B:y=p==="x"?B:R}else{const R=[{x:c.x,y:h.y}],B=[{x:h.x,y:c.y}];if(p==="x"?y=a.x===g?B:R:y=a.y===g?R:B,t===n){const z=Math.abs(e[p]-i[p]);if(z<=r){const M=Math.min(r-1,r-z);a[p]===g?b[p]=(c[p]>e[p]?-1:1)*M:N[p]=(h[p]>i[p]?-1:1)*M}}if(t!==n){const z=p==="x"?"y":"x",M=a[p]===l[z],f=c[z]>h[z],w=c[z]<h[z];(a[p]===1&&(!M&&f||M&&w)||a[p]!==1&&(!M&&w||M&&f))&&(y=p==="x"?R:B)}const tt={x:c.x+b.x,y:c.y+b.y},et={x:h.x+N.x,y:h.y+N.y},gt=Math.max(Math.abs(tt.x-y[0].x),Math.abs(et.x-y[0].x)),Jt=Math.max(Math.abs(tt.y-y[0].y),Math.abs(et.y-y[0].y));gt>=Jt?($=(tt.x+et.x)/2,k=y[0].y):($=y[0].x,k=(tt.y+et.y)/2)}return[[e,{x:c.x+b.x,y:c.y+b.y},...y,{x:h.x+N.x,y:h.y+N.y},i],$,k,P,D]}function ma(e,t,i,n){const s=Math.min(an(e,t)/2,an(t,i)/2,n),{x:r,y:o}=t;if(e.x===r&&r===i.x||e.y===o&&o===i.y)return`L${r} ${o}`;if(e.y===o){const c=e.x<i.x?-1:1,h=e.y<i.y?1:-1;return`L ${r+s*c},${o}Q ${r},${o} ${r},${o+s*h}`}const a=e.x<i.x?1:-1,l=e.y<i.y?-1:1;return`L ${r},${o+s*l}Q ${r},${o} ${r+s*a},${o}`}function ya({sourceX:e,sourceY:t,sourcePosition:i=u.Position.Bottom,targetX:n,targetY:s,targetPosition:r=u.Position.Top,borderRadius:o=5,centerX:a,centerY:l,offset:c=20,stepPosition:h=.5}){const[d,p,g,y,$]=ga({source:{x:e,y:t},sourcePosition:i,target:{x:n,y:s},targetPosition:r,center:{x:a,y:l},offset:c,stepPosition:h});return[d.reduce((b,N,P)=>{let D="";return P>0&&P<d.length-1?D=ma(d[P-1],N,d[P+1],o):D=`${P===0?"M":"L"}${N.x} ${N.y}`,b+=D,b},""),p,g,y,$]}const wa=(e,t)=>e.x!==t.x||e.y!==t.y||e.zoom!==t.k,$e=e=>({x:e.x,y:e.y,zoom:e.k}),Ge=({x:e,y:t,zoom:i})=>be.translate(e,t).scale(i),Nt=(e,t)=>e.target.closest(`.${t}`),ln=(e,t)=>t===2&&Array.isArray(e)&&e.includes(2),va=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,je=(e,t=0,i=va,n=()=>{})=>{const s=typeof t=="number"&&t>0;return s||n(),s?e.transition().duration(t).ease(i).on("end",n):e},hn=e=>{const t=e.ctrlKey&&nn()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*t};function ba({zoomPanValues:e,noWheelClassName:t,d3Selection:i,d3Zoom:n,panOnScrollMode:s,panOnScrollSpeed:r,zoomOnPinch:o,onPanZoomStart:a,onPanZoom:l,onPanZoomEnd:c}){return h=>{if(Nt(h,t))return h.ctrlKey&&h.preventDefault(),!1;h.preventDefault(),h.stopImmediatePropagation();const d=i.property("__zoom").k||1;if(h.ctrlKey&&o){const k=ft(h),b=hn(h),N=d*Math.pow(2,b);n.scaleTo(i,N,k,h);return}const p=h.deltaMode===1?20:1;let g=s===Ut.Vertical?0:h.deltaX*p,y=s===Ut.Horizontal?0:h.deltaY*p;!nn()&&h.shiftKey&&s!==Ut.Vertical&&(g=h.deltaY*p,y=0),n.translateBy(i,-(g/d)*r,-(y/d)*r,{internal:!0});const $=$e(i.property("__zoom"));clearTimeout(e.panScrollTimeout),e.isPanScrolling||(e.isPanScrolling=!0),e.isPanScrolling&&(l?.(h,$),e.panScrollTimeout=setTimeout(()=>{e.isPanScrolling=!1},150))}}function xa({noWheelClassName:e,preventScrolling:t,d3ZoomHandler:i}){return function(n,s){const r=n.type==="wheel",o=!t&&r&&!n.ctrlKey,a=Nt(n,e);if(n.ctrlKey&&r&&a&&n.preventDefault(),o||a)return null;n.preventDefault(),i.call(this,n,s)}}function $a({zoomPanValues:e,onDraggingChange:t,onPanZoomStart:i}){return n=>{if(n.sourceEvent?.internal)return;const s=$e(n.transform);e.mouseButton=n.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=s,n.sourceEvent?.type==="mousedown"&&t(!0),i&&i?.(n.sourceEvent,s)}}function _a({zoomPanValues:e,panOnDrag:t,onPaneContextMenu:i,onTransformChange:n,onPanZoom:s}){return r=>{e.usedRightMouseButton=!!(i&&ln(t,e.mouseButton??0)),r.sourceEvent?.sync||n([r.transform.x,r.transform.y,r.transform.k]),s&&!r.sourceEvent?.internal&&s?.(r.sourceEvent,$e(r.transform))}}function za({zoomPanValues:e,panOnDrag:t,panOnScroll:i,onDraggingChange:n,onPanZoomEnd:s,onPaneContextMenu:r}){return o=>{if(!o.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,r&&ln(t,e.mouseButton??0)&&!e.usedRightMouseButton&&o.sourceEvent&&r(o.sourceEvent),e.usedRightMouseButton=!1,n(!1),s&&wa(e.prevViewport,o.transform))){const a=$e(o.transform);e.prevViewport=a,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{s?.(o.sourceEvent,a)},i?150:0)}}}function Sa({zoomActivationKeyPressed:e,zoomOnScroll:t,zoomOnPinch:i,panOnDrag:n,panOnScroll:s,zoomOnDoubleClick:r,userSelectionActive:o,noWheelClassName:a,noPanClassName:l,lib:c,connectionInProgress:h}){return d=>{const p=e||t,g=i&&d.ctrlKey,y=d.type==="wheel";if(d.button===1&&d.type==="mousedown"&&(Nt(d,`${c}-flow__node`)||Nt(d,`${c}-flow__edge`)))return!0;if(!n&&!p&&!s&&!r&&!i||o||h&&!y||Nt(d,a)&&y||Nt(d,l)&&(!y||s&&y&&!e)||!i&&d.ctrlKey&&y)return!1;if(!i&&d.type==="touchstart"&&d.touches?.length>1)return d.preventDefault(),!1;if(!p&&!s&&!g&&y||!n&&(d.type==="mousedown"||d.type==="touchstart")||Array.isArray(n)&&!n.includes(d.button)&&d.type==="mousedown")return!1;const $=Array.isArray(n)&&n.includes(d.button)||!d.button||d.button<=1;return(!d.ctrlKey||y)&&$}}function Ea({domNode:e,minZoom:t,maxZoom:i,paneClickDistance:n,translateExtent:s,viewport:r,onPanZoom:o,onPanZoomStart:a,onPanZoomEnd:l,onDraggingChange:c}){const h={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{x:0,y:0,zoom:0},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},d=e.getBoundingClientRect(),p=ha().clickDistance(!en(n)||n<0?0:n).scaleExtent([t,i]).translateExtent(s),g=ut(e).call(p);P({x:r.x,y:r.y,zoom:ca(r.zoom,t,i)},[[0,0],[d.width,d.height]],s);const y=g.on("wheel.zoom"),$=g.on("dblclick.zoom");p.wheelDelta(hn);function k(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:ce).transform(je(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function b({noWheelClassName:z,noPanClassName:M,onPaneContextMenu:f,userSelectionActive:w,panOnScroll:m,panOnDrag:x,panOnScrollMode:_,panOnScrollSpeed:S,preventScrolling:E,zoomOnPinch:A,zoomOnScroll:H,zoomOnDoubleClick:W,zoomActivationKeyPressed:L,lib:V,onTransformChange:it,connectionInProgress:G}){w&&!h.isZoomingOrPanning&&N();const te=m&&!L&&!w?ba({zoomPanValues:h,noWheelClassName:z,d3Selection:g,d3Zoom:p,panOnScrollMode:_,panOnScrollSpeed:S,zoomOnPinch:A,onPanZoomStart:a,onPanZoom:o,onPanZoomEnd:l}):xa({noWheelClassName:z,preventScrolling:E,d3ZoomHandler:y});if(g.on("wheel.zoom",te,{passive:!1}),!w){const Ll=$a({zoomPanValues:h,onDraggingChange:c,onPanZoomStart:a});p.on("start",Ll);const Tl=_a({zoomPanValues:h,panOnDrag:x,onPaneContextMenu:!!f,onPanZoom:o,onTransformChange:it});p.on("zoom",Tl);const Dl=za({zoomPanValues:h,panOnDrag:x,panOnScroll:m,onPaneContextMenu:f,onPanZoomEnd:l,onDraggingChange:c});p.on("end",Dl)}const Rl=Sa({zoomActivationKeyPressed:L,panOnDrag:x,zoomOnScroll:H,panOnScroll:m,zoomOnDoubleClick:W,zoomOnPinch:A,userSelectionActive:w,noPanClassName:M,noWheelClassName:z,lib:V,connectionInProgress:G});p.filter(Rl),W?g.on("dblclick.zoom",$):g.on("dblclick.zoom",null)}function N(){p.on("zoom",null)}async function P(z,M,f){const w=Ge(z),m=p?.constrain()(w,M,f);return m&&await k(m),new Promise(x=>x(m))}async function D(z,M){const f=Ge(z);return await k(f,M),new Promise(w=>w(f))}function Z(z){if(g){const M=Ge(z),f=g.property("__zoom");(f.k!==z.zoom||f.x!==z.x||f.y!==z.y)&&p?.transform(g,M,null,{sync:!0})}}function R(){const z=g?Gi(g.node()):{x:0,y:0,k:1};return{x:z.x,y:z.y,zoom:z.k}}function B(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:ce).scaleTo(je(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function tt(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:ce).scaleBy(je(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function et(z){p?.scaleExtent(z)}function gt(z){p?.translateExtent(z)}function Jt(z){const M=!en(z)||z<0?0:z;p?.clickDistance(M)}return{update:b,destroy:N,setViewport:D,setViewportConstrained:P,getViewport:R,scaleTo:B,scaleBy:tt,setScaleExtent:et,setTranslateExtent:gt,syncViewport:Z,setClickDistance:Jt}}var cn;(function(e){e.Line="line",e.Handle="handle"})(cn||(cn={}));class dn{constructor(t={}){this.container=null,this.state={nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},this.subscribers=new Set,this.panZoomInstance=null,this.pendingNodes=[],this.options={minZoom:.5,maxZoom:2,defaultZoom:1,nodesDraggable:!0,nodesConnectable:!0,elementsSelectable:!0,...t},this.state.nodes=t.nodes||[],this.state.edges=t.edges||[],this.updateLookups()}mount(t){this.container=t,this.panZoomInstance=Ea({domNode:t,minZoom:this.options.minZoom||.5,maxZoom:this.options.maxZoom||2,paneClickDistance:0,translateExtent:[[-1/0,-1/0],[1/0,1/0]],viewport:this.state.viewport,onDraggingChange:i=>{this.container?.classList.toggle("panning",i)},onPanZoom:(i,n)=>{this.state.viewport=n,this.notifySubscribers()},onPanZoomStart:(i,n)=>{},onPanZoomEnd:(i,n)=>{}}),this.panZoomInstance.update({noWheelClassName:"nowheel",noPanClassName:"nopan",onPaneContextMenu:void 0,preventScrolling:!0,panOnScroll:!0,panOnDrag:!0,panOnScrollMode:"free",panOnScrollSpeed:.8,userSelectionActive:!1,zoomOnPinch:!0,zoomOnScroll:!0,zoomOnDoubleClick:!0,zoomActivationKeyPressed:!1,lib:"lit-flow",onTransformChange:i=>{},connectionInProgress:!1}),this.notifySubscribers()}destroy(){this.panZoomInstance?.destroy(),this.panZoomInstance=null,this.container=null,this.subscribers.clear()}getState(){return this.state}get nodes(){return this.state.nodes}get edges(){return this.state.edges}getViewport(){return this.state.viewport}setViewport(t){this.state.viewport=t,this.panZoomInstance?.setViewport?.(t),this.notifySubscribers()}setNodes(t){this.pendingNodes.push(...t.map(i=>i.id)),this.state.nodes=t,this.updateLookups(),this.notifySubscribers()}setEdges(t){this.retryEdgeRendering(t)}updateNode(t,i){this.state.nodes=this.state.nodes.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}updateEdge(t,i){this.state.edges=this.state.edges.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}addNode(t){this.state.nodes=[...this.state.nodes,t],this.updateLookups(),this.notifySubscribers()}removeNode(t){this.state.nodes=this.state.nodes.filter(i=>i.id!==t),this.state.edges=this.state.edges.filter(i=>i.source!==t&&i.target!==t),this.updateLookups(),this.notifySubscribers()}addEdge(t){this.state.edges=[...this.state.edges,t],this.updateLookups(),this.notifySubscribers()}removeEdge(t){this.state.edges=this.state.edges.filter(i=>i.id!==t),this.updateLookups(),this.notifySubscribers()}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}zoomIn(){const t=this.state.viewport.zoom,i=Math.min(t*1.2,this.options.maxZoom||2);this.setViewport({...this.state.viewport,zoom:i})}zoomOut(){const t=this.state.viewport.zoom,i=Math.max(t/1.2,this.options.minZoom||.5);this.setViewport({...this.state.viewport,zoom:i})}fitView(){if(this.state.nodes.length===0||!this.container)return;let t=1/0,i=1/0,n=-1/0,s=-1/0;this.state.nodes.forEach(y=>{const $=y.measured?.width||y.width||150,k=y.measured?.height||y.height||50;t=Math.min(t,y.position.x),i=Math.min(i,y.position.y),n=Math.max(n,y.position.x+$),s=Math.max(s,y.position.y+k)});const r={x:t,y:i,width:n-t,height:s-i},o=this.container.clientWidth,a=this.container.clientHeight,l=50,c=(o-l*2)/r.width,h=(a-l*2)/r.height,d=Math.min(c,h,this.options.maxZoom||2),p=(o-r.width*d)/2-r.x*d,g=(a-r.height*d)/2-r.y*d;this.setViewport({x:p,y:g,zoom:d})}updateLookups(){this.state.nodeLookup.clear(),this.state.nodes.forEach(t=>{const i={...t,measured:t.measured||{width:t.width,height:t.height},internals:{positionAbsolute:t.position,z:t.zIndex||0,userNode:t}};this.state.nodeLookup.set(t.id,i)}),this.state.edgeLookup.clear(),this.state.edges.forEach(t=>{this.state.edgeLookup.set(t.id,t)})}isNodeRendered(t){if(!this.container)return!1;const i=this.container.querySelector(`[id="${CSS.escape(t)}"]`);if(!i)return!1;const n=i.getBoundingClientRect();return n.width>0&&n.height>0}hasPendingNodes(t){return t.some(i=>this.pendingNodes.includes(i)||!this.isNodeRendered(i))}markNodeAsRendered(t){const i=this.pendingNodes.indexOf(t);i>-1&&this.pendingNodes.splice(i,1)}retryEdgeRendering(t,i=0,n=10){const s=t.flatMap(o=>[o.source,o.target]),r=[...new Set(s)];this.hasPendingNodes(r)&&i<n?setTimeout(()=>{this.retryEdgeRendering(t,i+1,n)},100):(this.state.edges=t,this.updateLookups(),this.notifySubscribers(),r.forEach(o=>this.markNodeAsRendered(o)))}notifySubscribers(){this.subscribers.forEach(t=>t(this.state))}}function ka(e={}){const t={nodes:e.nodes||[],edges:e.edges||[],viewport:e.viewport||{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},i=new Set,n=()=>{t.nodeLookup.clear(),t.nodes.forEach(s=>{const r={...s,measured:s.measured||{width:s.width,height:s.height},internals:{positionAbsolute:s.position,z:s.zIndex||0,userNode:s}};t.nodeLookup.set(s.id,r)}),t.edgeLookup.clear(),t.edges.forEach(s=>{t.edgeLookup.set(s.id,s)})};return n(),{getState:()=>t,setState:s=>{Object.assign(t,s),n(),i.forEach(r=>r(t))},subscribe:s=>(i.add(s),()=>i.delete(s))}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=globalThis,Ke=_e.ShadowRoot&&(_e.ShadyCSS===void 0||_e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qe=Symbol(),un=new WeakMap;let fn=class{constructor(t,i,n){if(this._$cssResult$=!0,n!==Qe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Ke&&t===void 0){const n=i!==void 0&&i.length===1;n&&(t=un.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&un.set(i,t))}return t}toString(){return this.cssText}};const Na=e=>new fn(typeof e=="string"?e:e+"",void 0,Qe),F=(e,...t)=>{const i=e.length===1?e[0]:t.reduce(((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1]),e[0]);return new fn(i,e,Qe)},Ca=(e,t)=>{if(Ke)e.adoptedStyleSheets=t.map((i=>i instanceof CSSStyleSheet?i:i.styleSheet));else for(const i of t){const n=document.createElement("style"),s=_e.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=i.cssText,e.appendChild(n)}},pn=Ke?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const n of t.cssRules)i+=n.cssText;return Na(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ma,defineProperty:Aa,getOwnPropertyDescriptor:Pa,getOwnPropertyNames:Ha,getOwnPropertySymbols:Ra,getPrototypeOf:La}=Object,ze=globalThis,gn=ze.trustedTypes,Ta=gn?gn.emptyScript:"",Da=ze.reactiveElementPolyfillSupport,Xt=(e,t)=>e,Se={toAttribute(e,t){switch(t){case Boolean:e=e?Ta:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},Je=(e,t)=>!Ma(e,t),mn={attribute:!0,type:String,converter:Se,reflect:!1,useDefault:!1,hasChanged:Je};Symbol.metadata??=Symbol("metadata"),ze.litPropertyMetadata??=new WeakMap;let Ct=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=mn){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(t,n,i);s!==void 0&&Aa(this.prototype,t,s)}}static getPropertyDescriptor(t,i,n){const{get:s,set:r}=Pa(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:s,set(o){const a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??mn}static _$Ei(){if(this.hasOwnProperty(Xt("elementProperties")))return;const t=La(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Xt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Xt("properties"))){const i=this.properties,n=[...Ha(i),...Ra(i)];for(const s of n)this.createProperty(s,i[s])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[n,s]of i)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[i,n]of this.elementProperties){const s=this._$Eu(i,n);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const s of n)i.unshift(pn(s))}else t!==void 0&&i.push(pn(t));return i}static _$Eu(t,i){const n=i.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const n of i.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ca(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,n){this._$AK(t,n)}_$ET(t,i){const n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:Se).toAttribute(i,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,i){const n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Se;this._$Em=s;const a=o.fromAttribute(i,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,i,n){if(t!==void 0){const s=this.constructor,r=this[t];if(n??=s.getPropertyOptions(t),!((n.hasChanged??Je)(r,i)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,i,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??i??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(i=void 0),this._$AL.set(t,i)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach((n=>n.hostUpdate?.())),this.update(i)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach((i=>i.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};Ct.elementStyles=[],Ct.shadowRootOptions={mode:"open"},Ct[Xt("elementProperties")]=new Map,Ct[Xt("finalized")]=new Map,Da?.({ReactiveElement:Ct}),(ze.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ti=globalThis,Ee=ti.trustedTypes,yn=Ee?Ee.createPolicy("lit-html",{createHTML:e=>e}):void 0,wn="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,vn="?"+pt,Oa=`<${vn}>`,bt=document,Yt=()=>bt.createComment(""),Zt=e=>e===null||typeof e!="object"&&typeof e!="function",ei=Array.isArray,Ba=e=>ei(e)||typeof e?.[Symbol.iterator]=="function",ii=`[ 	
\f\r]`,qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bn=/-->/g,xn=/>/g,xt=RegExp(`>|${ii}(?:([^\\s"'>=/]+)(${ii}*=${ii}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$n=/'/g,_n=/"/g,zn=/^(?:script|style|textarea|title)$/i,Sn=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),C=Sn(1),j=Sn(2),$t=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),En=new WeakMap,_t=bt.createTreeWalker(bt,129);function kn(e,t){if(!ei(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return yn!==void 0?yn.createHTML(t):t}const Fa=(e,t)=>{const i=e.length-1,n=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=qt;for(let a=0;a<i;a++){const l=e[a];let c,h,d=-1,p=0;for(;p<l.length&&(o.lastIndex=p,h=o.exec(l),h!==null);)p=o.lastIndex,o===qt?h[1]==="!--"?o=bn:h[1]!==void 0?o=xn:h[2]!==void 0?(zn.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=xt):h[3]!==void 0&&(o=xt):o===xt?h[0]===">"?(o=s??qt,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?xt:h[3]==='"'?_n:$n):o===_n||o===$n?o=xt:o===bn||o===xn?o=qt:(o=xt,s=void 0);const g=o===xt&&e[a+1].startsWith("/>")?" ":"";r+=o===qt?l+Oa:d>=0?(n.push(c),l.slice(0,d)+wn+l.slice(d)+pt+g):l+pt+(d===-2?a:g)}return[kn(e,r+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]};class Wt{constructor({strings:t,_$litType$:i},n){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[c,h]=Fa(t,i);if(this.el=Wt.createElement(c,n),_t.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=_t.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(wn)){const p=h[o++],g=s.getAttribute(d).split(pt),y=/([.?@])?(.*)/.exec(p);l.push({type:1,index:r,name:y[2],strings:g,ctor:y[1]==="."?Ua:y[1]==="?"?Xa:y[1]==="@"?Ya:ke}),s.removeAttribute(d)}else d.startsWith(pt)&&(l.push({type:6,index:r}),s.removeAttribute(d));if(zn.test(s.tagName)){const d=s.textContent.split(pt),p=d.length-1;if(p>0){s.textContent=Ee?Ee.emptyScript:"";for(let g=0;g<p;g++)s.append(d[g],Yt()),_t.nextNode(),l.push({type:2,index:++r});s.append(d[p],Yt())}}}else if(s.nodeType===8)if(s.data===vn)l.push({type:2,index:r});else{let d=-1;for(;(d=s.data.indexOf(pt,d+1))!==-1;)l.push({type:7,index:r}),d+=pt.length-1}r++}}static createElement(t,i){const n=bt.createElement("template");return n.innerHTML=t,n}}function Mt(e,t,i=e,n){if(t===$t)return t;let s=n!==void 0?i._$Co?.[n]:i._$Cl;const r=Zt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,i,n)),n!==void 0?(i._$Co??=[])[n]=s:i._$Cl=s),s!==void 0&&(t=Mt(e,s._$AS(e,t.values),s,n)),t}class Ia{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:n}=this._$AD,s=(t?.creationScope??bt).importNode(i,!0);_t.currentNode=s;let r=_t.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Vt(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Za(r,this,t)),this._$AV.push(c),l=n[++a]}o!==l?.index&&(r=_t.nextNode(),o++)}return _t.currentNode=bt,s}p(t){let i=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,i),i+=n.strings.length-2):n._$AI(t[i])),i++}}class Vt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,n,s){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Mt(this,t,i),Zt(t)?t===T||t==null||t===""?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==$t&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ba(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==T&&Zt(this._$AH)?this._$AA.nextSibling.data=t:this.T(bt.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Wt.createElement(kn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(i);else{const r=new Ia(s,this),o=r.u(this.options);r.p(i),this.T(o),this._$AH=r}}_$AC(t){let i=En.get(t.strings);return i===void 0&&En.set(t.strings,i=new Wt(t)),i}k(t){ei(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const r of t)s===i.length?i.push(n=new Vt(this.O(Yt()),this.O(Yt()),this,this.options)):n=i[s],n._$AI(r),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ke{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,n,s,r){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=T}_$AI(t,i=this,n,s){const r=this.strings;let o=!1;if(r===void 0)t=Mt(this,t,i,0),o=!Zt(t)||t!==this._$AH&&t!==$t,o&&(this._$AH=t);else{const a=t;let l,c;for(t=r[0],l=0;l<r.length-1;l++)c=Mt(this,a[n+l],i,l),c===$t&&(c=this._$AH[l]),o||=!Zt(c)||c!==this._$AH[l],c===T?t=T:t!==T&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ua extends ke{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}class Xa extends ke{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}}class Ya extends ke{constructor(t,i,n,s,r){super(t,i,n,s,r),this.type=5}_$AI(t,i=this){if((t=Mt(this,t,i,0)??T)===$t)return;const n=this._$AH,s=t===T&&n!==T||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==T&&(n===T||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Za{constructor(t,i,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Mt(this,t)}}const qa=ti.litHtmlPolyfillSupport;qa?.(Wt,Vt),(ti.litHtmlVersions??=[]).push("3.3.1");const Wa=(e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(s===void 0){const r=i?.renderBefore??null;n._$litPart$=s=new Vt(t.insertBefore(Yt(),r),r,void 0,i??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ni=globalThis;let O=class extends Ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Wa(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $t}};O._$litElement$=!0,O.finalized=!0,ni.litElementHydrateSupport?.({LitElement:O});const Va=ni.litElementPolyfillSupport;Va?.({LitElement:O}),(ni.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nn=Symbol.for(""),Ga=e=>{if(e?.r===Nn)return e?._$litStatic$},ja=e=>({_$litStatic$:e,r:Nn}),Cn=new Map,Ka=e=>(t,...i)=>{const n=i.length;let s,r;const o=[],a=[];let l,c=0,h=!1;for(;c<n;){for(l=t[c];c<n&&(r=i[c],(s=Ga(r))!==void 0);)l+=s+t[++c],h=!0;c!==n&&a.push(r),o.push(l),c++}if(c===n&&o.push(t[n]),h){const d=o.join("$$lit$$");(t=Cn.get(d))===void 0&&(o.raw=o,Cn.set(d,t=o)),i=a}return e(t,...i)},J=Ka(C);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=e=>(t,i)=>{i!==void 0?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qa={attribute:!0,type:String,converter:Se,reflect:!1,hasChanged:Je},Ja=(e=Qa,t,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),n==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),n==="accessor"){const{name:o}=i;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,e)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(n==="setter"){const{name:o}=i;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,e)}}throw Error("Unsupported decorator location: "+n)};function v(e){return(t,i)=>typeof i=="object"?Ja(e,t,i):((n,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tl={ATTRIBUTE:1},el=e=>(...t)=>({_$litDirective$:e,values:t});let il=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,n){this._$Ct=t,this._$AM=i,this._$Ci=n}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mn="important",nl=" !"+Mn,sl=el(class extends il{constructor(e){if(super(e),e.type!==tl.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const n=e[i];return n==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`}),"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in t){const s=t[n];if(s!=null){this.ft.add(n);const r=typeof s=="string"&&s.endsWith(nl);n.includes("-")||r?i.setProperty(n,r?s.slice(0,-11):s,r?Mn:""):i[n]=s}}return $t}});function rl(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function ol(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function Ne(e){return ua(e)}function si(e){return ya(e)}function An(e){return fa(e)}function al(e,t){return e.x>=t.x&&e.x<=t.x+t.width&&e.y>=t.y&&e.y<=t.y+t.height}var ll=Object.defineProperty,hl=Object.getOwnPropertyDescriptor,Gt=(e,t,i,n)=>{for(var s=n>1?void 0:n?hl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&ll(t,i,s),s};u.FlowCanvas=class extends O{constructor(){super(),this.nodes=[],this.edges=[],this.viewport={x:0,y:0,zoom:1},this.nodeTypes={default:"flow-node",shape:"shape-node","erd-table":"erd-table-node"},this.connection=null,this.onHandleStart=t=>{const{nodeId:i,type:n,handleId:s}=t.detail;this.connection={from:{nodeId:i,handleId:s}}},this.onMouseMove=t=>{if(!this.connection)return;const i=this.screenToCanvas(t.clientX,t.clientY);this.connection.preview=i,this.requestUpdate()},this.onMouseUp=t=>{if(!this.connection)return;const i=t.composedPath();let n=null,s;for(const o of i)if(o instanceof HTMLElement){const a=o.tagName.toLowerCase();if(a==="flow-node"||Object.values(this.nodeTypes).some(l=>l===a)){n=o;break}o.dataset.handleId&&(s=o.dataset.handleId)}const r=n?.getAttribute("id")||void 0;if(this.connection.from&&r&&r!==this.connection.from.nodeId){const o=`e-${this.connection.from.nodeId}-${r}-${Date.now()}`,a=this.connection.from.nodeId,l=this.connection.from.handleId;let c=s;if(!c){const h=this.nodes.find(d=>d.id===r);h&&h.type==="shape"&&(c=this.determineBestTargetHandle(a,r),console.log("Auto-determined target handle:",{sourceNodeId:a,targetId:r,finalTargetHandleId:c}))}this.instance.addEdge({id:o,source:a,target:r,sourceHandle:l,targetHandle:c,data:{}})}this.connection=null,this.requestUpdate()},this.onNodeSelect=t=>{const{nodeId:i,selected:n,node:s}=t.detail;this.instance.updateNode(i,{selected:n}),this.dispatchEvent(new CustomEvent("node-selected",{detail:{nodeId:i,selected:n,node:s,allSelectedNodes:this.nodes.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.onEdgeSelect=t=>{const{edgeId:i,selected:n,edge:s}=t.detail;this.instance.updateEdge(i,{selected:n}),this.dispatchEvent(new CustomEvent("edge-selected",{detail:{edgeId:i,selected:n,edge:s,allSelectedEdges:this.edges.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.instance=new dn({nodes:this.nodes,edges:this.edges})}createRenderRoot(){return super.createRenderRoot()}getNodeGeom(t){const i=this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`),n=this.renderRoot.querySelector(".flow-viewport");if(!i||!n)return null;const s=i.getBoundingClientRect(),r=n.getBoundingClientRect(),o=this.viewport.zoom||1,a=(s.left-r.left-this.viewport.x)/o,l=(s.top-r.top-this.viewport.y)/o,c=s.width/o,h=s.height/o,d=l+h/2;return{left:{x:a,y:d},right:{x:a+c,y:d}}}getHandleCanvasPosition(t,i){const n=this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);if(!n)return null;let s=null;const r=n.shadowRoot;if(r&&(s=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),s||(s=n.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),!s)return null;const o=this.nodes.find(p=>p.id===t);if(!o)return null;if(o.type==="shape")return console.log("getHandleCanvasPosition for shape node:",{nodeId:t,handleId:i,node:o}),this.getShapeHandlePosition(o,i);const a=n.getBoundingClientRect(),l=s.getBoundingClientRect(),c=this.viewport.zoom||1,h=(l.left+l.width/2-a.left)/c,d=(l.top+l.height/2-a.top)/c;return{x:o.position.x+h,y:o.position.y+d}}getShapeHandlePosition(t,i){const n=t.data;if(!n)return null;const s=n.size||{width:200,height:200},r=s.width,o=s.height,a=i.split("-"),l=a[a.length-1];console.log("getShapeHandlePosition:",{handleId:i,parts:a,handleType:l,node:t.id,size:s});let c=0,h=0;switch(l){case"right":c=r,h=o/2;break;case"left":c=0,h=o/2;break;case"top":c=r/2,h=0;break;case"bottom":c=r/2,h=o;break;default:c=r/2,h=o/2}const d={x:t.position.x+c,y:t.position.y+h};return console.log("getShapeHandlePosition result:",{nodeId:t.id,position:t.position,offsetX:c,offsetY:h,result:d}),d}setNodes(t){this.instance.setNodes(t)}setEdges(t){this.instance.setEdges(t)}determineBestTargetHandle(t,i){const n=this.nodes.find(N=>N.id===t),s=this.nodes.find(N=>N.id===i);if(!n||!s)return`${i}-target-left`;const r=n.position.x,o=n.position.y,a=s.position.x,l=s.position.y,c=s.data,h=c?.size?.width||200,d=c?.size?.height||200,p=r+(n.width||150)/2,g=o+(n.height||50)/2,y=a+h/2,$=l+d/2,k=y-p,b=$-g;return Math.abs(k)>Math.abs(b)?k>0?`${i}-target-left`:`${i}-target-right`:b>0?`${i}-target-top`:`${i}-target-bottom`}computeLabelCanvasPosition(t){const i=this.nodes.find(h=>h.id===t.source),n=this.nodes.find(h=>h.id===t.target);if(!i||!n)return null;let s,r,o,a;if(t.sourceHandle){const h=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(h)s=h.x,r=h.y;else{const d=i.measured?.width||i.width||150,p=i.measured?.height||i.height||50;s=i.position.x+d,r=i.position.y+p/2}}else{const h=i.measured?.width||i.width||150,d=i.measured?.height||i.height||50;s=i.position.x+h,r=i.position.y+d/2}if(t.targetHandle){const h=this.getHandleCanvasPosition(t.target,t.targetHandle);if(h)o=h.x,a=h.y;else{o=n.position.x;const d=n.measured?.height||n.height||50;a=n.position.y+d/2}}else{o=n.position.x;const h=n.measured?.height||n.height||50;a=n.position.y+h/2}const[,l,c]=Ne({sourceX:s,sourceY:r,sourcePosition:u.Position.Right,targetX:o,targetY:a,targetPosition:u.Position.Left});return{x:l,y:c}}computeStartLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.source);if(!i)return null;let n,s;if(t.sourceHandle){const r=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.width||i.width||150,a=i.measured?.height||i.height||50;n=i.position.x+o,s=i.position.y+a/2}}else{const r=i.measured?.width||i.width||150,o=i.measured?.height||i.height||50;n=i.position.x+r,s=i.position.y+o/2}return{x:n+12,y:s-10}}computeEndLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.target);if(!i)return null;let n,s;if(t.targetHandle){const r=this.getHandleCanvasPosition(t.target,t.targetHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+o/2}}else{const r=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+r/2}return{x:n-12,y:s-10}}firstUpdated(){const t=this.renderRoot.querySelector(".flow-container");t&&(this.instance.mount(t),this.unsubscribe=this.instance.subscribe(i=>{this.nodes=i.nodes,this.edges=i.edges,this.viewport=i.viewport,this.requestUpdate()}),t.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("node-select",this.onNodeSelect),document.addEventListener("edge-select",this.onEdgeSelect))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.instance.destroy();const t=this.renderRoot.querySelector(".flow-container");t?.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),t?.removeEventListener("node-select",this.onNodeSelect),document.removeEventListener("edge-select",this.onEdgeSelect)}renderNode(t){const i=t.type||"default",n=this.nodeTypes[i]||"flow-node",s=ja(n);return J`
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
  `,Gt([v({type:Array})],u.FlowCanvas.prototype,"nodes",2),Gt([v({type:Array})],u.FlowCanvas.prototype,"edges",2),Gt([v({type:Object})],u.FlowCanvas.prototype,"viewport",2),Gt([v({type:Object})],u.FlowCanvas.prototype,"nodeTypes",2),u.FlowCanvas=Gt([U("flow-canvas")],u.FlowCanvas);var cl=Object.defineProperty,dl=Object.getOwnPropertyDescriptor,zt=(e,t,i,n)=>{for(var s=n>1?void 0:n?dl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&cl(t,i,s),s};u.NodeResizer=class extends O{constructor(){super(...arguments),this.visible=!1,this.minWidth=10,this.minHeight=10,this.maxWidth=Number.MAX_VALUE,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleMouseDown=t=>{const i=t.target;console.log("NodeResizer handleMouseDown:",i,i.classList);let n=i.classList.contains("resize-handle");if(!n&&i===this&&(n=t.composedPath().some(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))),console.log("Is resize handle:",n),!n)return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.isResizing=!0;const s=this.getRootNode().host;this.resizeStart={x:t.clientX,y:t.clientY,width:s?.offsetWidth||0,height:s?.offsetHeight||0};let r=null;if(i.classList.contains("resize-handle")?r=i:i===this&&(r=t.composedPath().find(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))||null),r){const o=Array.from(r.classList);this.resizeHandle=o.find(a=>a!=="resize-handle")||"",console.log("Resize handle direction:",this.resizeHandle)}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),console.log({width:this.resizeStart.width,height:this.resizeStart.height}),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleMouseMove=t=>{if(!this.isResizing)return;const i=this.getRootNode().host;if(!i)return;console.log("NodeResizer handleMouseMove:",t);const n=t.clientX-this.resizeStart.x,s=t.clientY-this.resizeStart.y;let r=this.resizeStart.width,o=this.resizeStart.height;switch(this.resizeHandle){case"nw":r=this.resizeStart.width-n,o=this.resizeStart.height-s;break;case"ne":r=this.resizeStart.width+n,o=this.resizeStart.height-s;break;case"sw":r=this.resizeStart.width-n,o=this.resizeStart.height+s;break;case"se":r=this.resizeStart.width+n,o=this.resizeStart.height+s;break;case"n":o=this.resizeStart.height-s;break;case"s":o=this.resizeStart.height+s;break;case"w":r=this.resizeStart.width-n;break;case"e":r=this.resizeStart.width+n;break}if(r=Math.max(this.minWidth,Math.min(this.maxWidth,r)),o=Math.max(this.minHeight,Math.min(this.maxHeight,o)),this.keepAspectRatio){const a=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?o=r/a:r=o*a}i.style.width=`${r}px`,i.style.height=`${o}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:r,height:o,handle:this.resizeHandle},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{if(!this.isResizing)return;this.isResizing=!1,this.cleanup();const t=this.getRootNode().host;this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:t?.offsetWidth||0,height:t?.offsetHeight||0},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return this.visible?C`
      <div class="resize-border"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
    `:C``}},u.NodeResizer.styles=F`
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
  `,zt([v({type:Boolean,reflect:!0})],u.NodeResizer.prototype,"visible",2),zt([v({type:Number})],u.NodeResizer.prototype,"minWidth",2),zt([v({type:Number})],u.NodeResizer.prototype,"minHeight",2),zt([v({type:Number})],u.NodeResizer.prototype,"maxWidth",2),zt([v({type:Number})],u.NodeResizer.prototype,"maxHeight",2),zt([v({type:Boolean})],u.NodeResizer.prototype,"keepAspectRatio",2),u.NodeResizer=zt([U("node-resizer")],u.NodeResizer);var ul=Object.defineProperty,fl=Object.getOwnPropertyDescriptor,dt=(e,t,i,n)=>{for(var s=n>1?void 0:n?fl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&ul(t,i,s),s};u.FlowNode=class extends O{constructor(){super(...arguments),this.id="",this.data={},this.position={x:0,y:0},this.selected=!1,this.dragging=!1,this.draggable=!0,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.lastMeasured=null,this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}})},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}}),this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1},50)}}firstUpdated(){this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd)),this.updateMeasuredSize()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return C`
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
    `}updated(t){super.updated(t),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,this.updateMeasuredSize(),t.has("resizable")&&console.log("FlowNode resizable changed:",this.resizable)}updateMeasuredSize(){if(!this.instance)return;const t=this.getBoundingClientRect(),i=this.instance.getViewport().zoom||1,n=t.width/i,s=t.height/i;(!this.lastMeasured||Math.abs(this.lastMeasured.width-n)>.5||Math.abs(this.lastMeasured.height-s)>.5)&&(this.lastMeasured={width:n,height:s},this.instance.updateNode(this.id,{measured:{width:n,height:s},width:n,height:s}))}onHandleMouseDown(t){return i=>{i.stopPropagation(),i.preventDefault(),this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:t},bubbles:!0,composed:!0}))}}},u.FlowNode.styles=F`
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
  `,dt([v({type:String,reflect:!0})],u.FlowNode.prototype,"id",2),dt([v({type:Object})],u.FlowNode.prototype,"data",2),dt([v({type:Object})],u.FlowNode.prototype,"position",2),dt([v({type:Boolean,reflect:!0})],u.FlowNode.prototype,"selected",2),dt([v({type:Boolean,reflect:!0})],u.FlowNode.prototype,"dragging",2),dt([v({type:Boolean})],u.FlowNode.prototype,"draggable",2),dt([v({type:Object})],u.FlowNode.prototype,"instance",2),dt([v({type:Boolean})],u.FlowNode.prototype,"resizable",2),u.FlowNode=dt([U("flow-node")],u.FlowNode);var pl=Object.defineProperty,gl=Object.getOwnPropertyDescriptor,X=(e,t,i,n)=>{for(var s=n>1?void 0:n?gl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&pl(t,i,s),s};u.FlowEdge=class extends O{constructor(){super(...arguments),this.id="",this.source="",this.target="",this.animated=!1,this.selected=!1,this.label="",this.type="default",this.markerHandleHalf=5}getMarkerId(t){if(!t)return;if(typeof t=="string")return t;const i=this.normalizeMarkerSpec(t);return`marker-${this.hashString(i)}`}createMarkerSVG(t,i){if(i.type==="custom"){const h=i.width??10,d=i.height??10,p=(i.refX??h)+this.markerHandleHalf,g=i.refY??d/2,y=i.color??"currentColor",$=i.orient??"auto";return`<marker id="${t}" markerWidth="${h}" markerHeight="${d}" refX="${p}" refY="${g}" orient="${$}" markerUnits="userSpaceOnUse"><path d="${i.path}" fill="${y}" stroke="${y}"/></marker>`}const n=i.width??10,s=i.height??10,r=i.orient??"auto",o=i.color??"currentColor",a=(i.type==="ArrowClosed",n+this.markerHandleHalf),l=s/2;if(i.type==="ArrowClosed"){const h=`M0,0 L${n},${l} L0,${s} Z`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${h}" fill="${o}"/></marker>`}const c=`M0,0 L${n},${l} L0,${s}`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${l}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${c}" fill="none" stroke="${o}" stroke-width="2"/></marker>`}normalizeMarkerSpec(t){if(t.type==="custom"){const{path:o,width:a=20,height:l=20,refX:c=20,refY:h=10,orient:d="auto",color:p="currentColor"}=t;return`custom|p=${o}|w=${a}|h=${l}|rx=${c}|ry=${h}|o=${d}|c=${p}`}const{width:i=20,height:n=20,orient:s="auto",color:r="currentColor"}=t;return`builtin|${t.type}|w=${i}|h=${n}|o=${s}|c=${r}`}hashString(t){let i=0;for(let n=0;n<t.length;n++)i=(i<<5)-i+t.charCodeAt(n),i|=0;return Math.abs(i).toString(36)}getPathForType(t,i){const n=t.x,s=t.y,r=i.x,o=i.y,a=t.position,l=i.position;switch(this.type){case"straight":return An({sourceX:n,sourceY:s,targetX:r,targetY:o});case"smoothstep":return si({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l});case"step":return si({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,borderRadius:0});case"simplebezier":return Ne({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l,curvature:.5});case"default":default:return Ne({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:l})}}getFlowCanvasRoot(){const t=this.getRootNode();return t instanceof ShadowRoot?t:null}getFlowCanvasHost(){const t=this.getFlowCanvasRoot();return t&&t.host||null}findHandleElement(t,i){const n=this.getFlowCanvasRoot();if(!n)return null;const s=n.querySelector(`[id="${CSS.escape(t)}"]`);if(!s)return null;const r=s.shadowRoot;let o=null;return r&&(o=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o||(o=s.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o}getHandlePosition(t,i){const n=this.findHandleElement(t,i);if(!n)return null;const s=this.getFlowCanvasRoot();if(!s)return null;const r=s.querySelector(`[id="${CSS.escape(t)}"]`);if(!r)return null;const o=r.getBoundingClientRect(),a=n.getBoundingClientRect(),l=this.sourceNode?.id===t?this.sourceNode:this.targetNode;if(!l)return null;l.measured?.width||l.width,l.measured?.height||l.height;const d=(this.getFlowCanvasHost()?.viewport||{zoom:1}).zoom||1,p=(a.left+a.width/2-o.left)/d,g=(a.top+a.height/2-o.top)/d;return{x:l.position.x+p,y:l.position.y+g}}getSourcePosition(){if(this.sourceHandle&&this.sourceNode){const n=this.getHandlePosition(this.sourceNode.id,this.sourceHandle);if(n)return{...n,position:u.Position.Right}}const t=this.sourceNode.measured?.width||this.sourceNode.width||150,i=this.sourceNode.measured?.height||this.sourceNode.height||50;return{x:this.sourceNode.position.x+t,y:this.sourceNode.position.y+i/2,position:u.Position.Right}}getTargetPosition(){if(this.targetHandle&&this.targetNode){const i=this.getHandlePosition(this.targetNode.id,this.targetHandle);if(i)return{...i,position:u.Position.Left}}const t=this.targetNode.measured?.height||this.targetNode.height||50;return{x:this.targetNode.position.x,y:this.targetNode.position.y+t/2,position:u.Position.Left}}render(){if(!this.sourceNode||!this.targetNode)return C``;const t=this.getSourcePosition(),i=this.getTargetPosition(),[n,s,r,o,a]=this.getPathForType(t,i),l=["edge-path",this.animated&&"animated",this.selected&&"selected"].filter(Boolean).join(" "),c=this.getMarkerId(this.markerStart),h=this.getMarkerId(this.markerEnd),d=c?`url(#${c})`:void 0,p=h?`url(#${h})`:void 0,g=this.animated?"5":"";return C`
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
            d="${n}"
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
    `}handleClick(t){console.log("handleClick",t),t.stopPropagation();const i=!this.selected;this.selected=i,this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:this.id,selected:i,edge:{id:this.id,source:this.source,target:this.target,sourceHandle:this.sourceHandle,targetHandle:this.targetHandle,label:this.label,animated:this.animated,selected:i}},bubbles:!0,composed:!0}))}},u.FlowEdge.styles=F`
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
  `,X([v({type:String})],u.FlowEdge.prototype,"id",2),X([v({type:String})],u.FlowEdge.prototype,"source",2),X([v({type:String})],u.FlowEdge.prototype,"target",2),X([v({type:String})],u.FlowEdge.prototype,"sourceHandle",2),X([v({type:String})],u.FlowEdge.prototype,"targetHandle",2),X([v({type:Object})],u.FlowEdge.prototype,"sourceNode",2),X([v({type:Object})],u.FlowEdge.prototype,"targetNode",2),X([v({type:Boolean})],u.FlowEdge.prototype,"animated",2),X([v({type:Boolean})],u.FlowEdge.prototype,"selected",2),X([v({type:String})],u.FlowEdge.prototype,"label",2),X([v({type:String})],u.FlowEdge.prototype,"type",2),X([v({type:Object})],u.FlowEdge.prototype,"markerStart",2),X([v({type:Object})],u.FlowEdge.prototype,"markerEnd",2),u.FlowEdge=X([U("flow-edge")],u.FlowEdge);var ml=Object.defineProperty,yl=Object.getOwnPropertyDescriptor,jt=(e,t,i,n)=>{for(var s=n>1?void 0:n?yl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&ml(t,i,s),s};u.FlowBackground=class extends O{constructor(){super(...arguments),this.variant="dots",this.gap=20,this.color="#ddd",this.size=1}render(){const t=`flow-bg-pattern-${Math.random().toString(36).substr(2,9)}`;return C`
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
  `,jt([v({type:String})],u.FlowBackground.prototype,"variant",2),jt([v({type:Number})],u.FlowBackground.prototype,"gap",2),jt([v({type:String})],u.FlowBackground.prototype,"color",2),jt([v({type:Number})],u.FlowBackground.prototype,"size",2),u.FlowBackground=jt([U("flow-background")],u.FlowBackground);var wl=Object.defineProperty,vl=Object.getOwnPropertyDescriptor,ri=(e,t,i,n)=>{for(var s=n>1?void 0:n?vl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&wl(t,i,s),s};u.FlowMinimap=class extends O{constructor(){super(...arguments),this.width=200,this.height=150}render(){return C`
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
  `,ri([v({type:Number})],u.FlowMinimap.prototype,"width",2),ri([v({type:Number})],u.FlowMinimap.prototype,"height",2),u.FlowMinimap=ri([U("flow-minimap")],u.FlowMinimap);var bl=Object.defineProperty,xl=Object.getOwnPropertyDescriptor,Pn=(e,t,i,n)=>{for(var s=n>1?void 0:n?xl(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&bl(t,i,s),s};u.FlowControls=class extends O{constructor(){super(...arguments),this.handleZoomIn=()=>{this.instance?.zoomIn()},this.handleZoomOut=()=>{this.instance?.zoomOut()},this.handleFitView=()=>{this.instance?.fitView()}}render(){return C`
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
  `,Pn([v({type:Object})],u.FlowControls.prototype,"instance",2),u.FlowControls=Pn([U("flow-controls")],u.FlowControls);var $l=Object.getOwnPropertyDescriptor,_l=Object.getPrototypeOf,zl=Reflect.get,Sl=(e,t,i,n)=>{for(var s=n>1?void 0:n?$l(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s},oi=(e,t,i)=>zl(_l(e),i,t);u.ERDTableNode=class extends u.FlowNode{constructor(){super(...arguments),this.appliedInitialSize=!1}firstUpdated(){const t=this.data,i=t?.size?.width,n=t?.size?.height;(typeof i=="number"&&i>0||typeof n=="number"&&n>0)&&(typeof i=="number"&&i>0&&(this.style.width=`${i}px`),typeof n=="number"&&n>0&&(this.style.height=`${n}px`),this.instance&&this.instance.updateNode(this.id,{width:typeof i=="number"&&i>0?i:this.width,height:typeof n=="number"&&n>0?n:this.height}),this.appliedInitialSize=!0),super.firstUpdated()}updated(t){super.updated(t)}onFieldHandleMouseDown(t,i){return n=>{n.stopPropagation(),n.preventDefault();const s=`${this.id}-${t}-${i}`;this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:i==="left"?"target":"source",handleId:s,fieldName:t},bubbles:!0,composed:!0}))}}render(){const t=this.data,i=t?.tableName||"Table",n=t?.fields||[];return C`
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
    `}},u.ERDTableNode.styles=[...Array.isArray(oi(u.ERDTableNode,u.ERDTableNode,"styles"))?oi(u.ERDTableNode,u.ERDTableNode,"styles"):[oi(u.ERDTableNode,u.ERDTableNode,"styles")],F`
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
    `],u.ERDTableNode=Sl([U("erd-table-node")],u.ERDTableNode);const El=[{type:"circle",name:"Circle",category:"basic",path:"M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"rectangle",name:"Rectangle",category:"basic",path:"M 5 5 L 195 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"diamond",name:"Diamond",category:"basic",path:"M 100 5 L 195 100 L 100 195 L 5 100 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"triangle",name:"Triangle",category:"basic",path:"M 100 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],kl=[{type:"hexagon",name:"Hexagon",category:"geometric",path:"M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"octagon",name:"Octagon",category:"geometric",path:"M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Nl=[{type:"heart",name:"Heart",category:"symbolic",path:"M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],ai=class ai{static initialize(){[...El,...kl,...Nl].forEach(i=>{this.shapes.set(i.type,i)})}static register(t){this.shapes.set(t.type,t)}static get(t){return this.shapes.get(t)}static getAll(){return Array.from(this.shapes.values())}static getByCategory(t){return Array.from(this.shapes.values()).filter(i=>i.category===t)}static has(t){return this.shapes.has(t)}static getShapeTypes(){return Array.from(this.shapes.keys())}static clear(){this.shapes.clear()}static getCount(){return this.shapes.size}};ai.shapes=new Map;let Kt=ai;Kt.initialize();var Cl=Object.defineProperty,Ml=Object.getOwnPropertyDescriptor,ot=(e,t,i,n)=>{for(var s=n>1?void 0:n?Ml(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Cl(t,i,s),s};u.ShapeNode=class extends O{constructor(){super(...arguments),this.id="",this.selected=!1,this.dragging=!1,this.draggable=!0,this.connectable=!0,this.instance=null,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{console.log("handleMouseUp"),this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isDragging=!1,this.cleanup()},this.handleHandleStart=t=>{console.log("handleHandleStart",t),t.stopPropagation(),this.isDragging=!1;const i=t.target,n=i.dataset.handleId,s=i.dataset.handleType;s&&n&&this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,handleId:n,handleType:s,position:this.position},bubbles:!0,composed:!0}))}}updated(t){super.updated(t),t.has("position")&&this.isDragging,t.has("resizable")&&console.log("ShapeNode resizable changed:",this.resizable)}getShapeDefinition(){if(this.data?.type)return Kt.get(this.data.type)}renderShape(){const t=this.getShapeDefinition();if(!t)return C`
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
  `,ot([v({type:String,reflect:!0})],u.ShapeNode.prototype,"id",2),ot([v({type:Object})],u.ShapeNode.prototype,"data",2),ot([v({type:Object,hasChanged:(e,t)=>!t||e.x!==t.x||e.y!==t.y})],u.ShapeNode.prototype,"position",2),ot([v({type:Boolean,reflect:!0})],u.ShapeNode.prototype,"selected",2),ot([v({type:Boolean,reflect:!0})],u.ShapeNode.prototype,"dragging",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"draggable",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"connectable",2),ot([v({type:Object})],u.ShapeNode.prototype,"instance",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"resizable",2),u.ShapeNode=ot([U("shape-node")],u.ShapeNode);var Al=Object.getOwnPropertyDescriptor,Qt=(e,t,i,n)=>{for(var s=n>1?void 0:n?Al(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s};u.BaseNode=class extends O{render(){return C`<slot></slot>`}},u.BaseNode.styles=F`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `,u.BaseNode=Qt([U("base-node")],u.BaseNode),u.BaseNodeHeader=class extends O{render(){return C`<slot></slot>`}},u.BaseNodeHeader.styles=F`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `,u.BaseNodeHeader=Qt([U("base-node-header")],u.BaseNodeHeader),u.BaseNodeHeaderTitle=class extends O{render(){return C`<span class="title"><slot></slot></span>`}},u.BaseNodeHeaderTitle.styles=F`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `,u.BaseNodeHeaderTitle=Qt([U("base-node-header-title")],u.BaseNodeHeaderTitle),u.BaseNodeContent=class extends O{render(){return C`<slot></slot>`}},u.BaseNodeContent.styles=F`
    :host {
      display: block;
      padding: 12px;
    }
  `,u.BaseNodeContent=Qt([U("base-node-content")],u.BaseNodeContent),u.BaseNodeFooter=class extends O{render(){return C`<slot></slot>`}},u.BaseNodeFooter.styles=F`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `,u.BaseNodeFooter=Qt([U("base-node-footer")],u.BaseNodeFooter);var Pl=Object.defineProperty,Y=(e,t,i,n)=>{for(var s=void 0,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(t,i,s)||s);return s&&Pl(t,i,s),s};const Hl=e=>{class t extends e{constructor(){super(...arguments),this.id="",this.position={x:0,y:0},this.data={},this.selected=!1,this.dragging=!1,this.instance=null,this.resizable=!1,this.draggable=!0,this.connectable=!0,this.minWidth=10,this.maxWidth=Number.MAX_VALUE,this.minHeight=10,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleClick=n=>{if(n.stopPropagation(),!this.isDragging){const s=!this.selected;this.selected=s,this.instance&&this.instance.updateNode(this.id,{selected:s}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:s,node:{id:this.id,data:this.data,position:this.position,selected:s}},bubbles:!0,composed:!0}))}},this.handleMouseDown=n=>{if(n.button!==0)return;const s=n.target;if(s.classList.contains("resize-handle")||s.closest(".resize-handle")!==null){this.handleResizeStart(n);return}this.draggable&&(n.preventDefault(),n.stopPropagation(),this.isDragging=!1,this.dragStart={x:n.clientX,y:n.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=n=>{if(this.isResizing){this.handleResizeMove(n);return}const s=n.clientX-this.dragStart.x,r=n.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(s)>3||Math.abs(r)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const o=this.instance.getViewport(),a={x:this.nodeStart.x+s/o.zoom,y:this.nodeStart.y+r/o.zoom};this.instance.updateNode(this.id,{position:a})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isResizing&&this.handleResizeEnd(),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1,this.isResizing=!1},50)},this.handleResizeStart=(n,s)=>{n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),this.isResizing=!0;const r=this.getBoundingClientRect(),o=getComputedStyle(this);let a=parseFloat(o.width),l=parseFloat(o.height);if((!a||a===0)&&(a=r.width),(!l||l===0)&&(l=r.height),this.resizeStart={x:n.clientX,y:n.clientY,width:a,height:l},s)this.resizeHandle=s;else{let c=n.target;if(!c.classList.contains("resize-handle")){const d=c.closest(".resize-handle");d&&(c=d)}const h=Array.from(c.classList);this.resizeHandle=h.find(d=>d!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleResizeMove=n=>{if(!this.isResizing)return;const s=n.clientX-this.resizeStart.x,r=n.clientY-this.resizeStart.y;let o=this.resizeStart.width,a=this.resizeStart.height;switch(this.resizeHandle){case"nw":o=this.resizeStart.width-s,a=this.resizeStart.height-r;break;case"ne":o=this.resizeStart.width+s,a=this.resizeStart.height-r;break;case"sw":o=this.resizeStart.width-s,a=this.resizeStart.height+r;break;case"se":o=this.resizeStart.width+s,a=this.resizeStart.height+r;break;case"n":a=this.resizeStart.height-r;break;case"s":a=this.resizeStart.height+r;break;case"w":o=this.resizeStart.width-s;break;case"e":o=this.resizeStart.width+s;break}if(o=Math.max(this.minWidth,Math.min(this.maxWidth,o)),a=Math.max(this.minHeight,Math.min(this.maxHeight,a)),this.keepAspectRatio){const l=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?a=o/l:o=a*l}this.style.width=`${o}px`,this.style.height=`${a}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:o,height:a,handle:this.resizeHandle},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:o,height:a,measured:{width:o,height:a}})},this.handleResizeEnd=()=>{this.isResizing&&(this.isResizing=!1,this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:this.offsetWidth,height:this.offsetHeight,measured:{width:this.offsetWidth,height:this.offsetHeight}}))},this.handleGlobalClick=n=>{n.target.closest(this.tagName.toLowerCase())!==null||this.selected&&(this.selected=!1,this.instance&&this.instance.updateNode(this.id,{selected:!1}),this.dispatchEvent(new CustomEvent("node-deselect",{detail:{nodeId:this.id,selected:!1,node:{id:this.id,data:this.data,position:this.position,selected:!1}},bubbles:!0,composed:!0})))},this.handleResizeHandleClick=n=>s=>{s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.handleResizeStart(s,n)}}static get styles(){return[F`
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
      `]}connectedCallback(){super.connectedCallback(),this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),document.addEventListener("click",this.handleGlobalClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),document.removeEventListener("click",this.handleGlobalClick),this.cleanup()}updated(n){super.updated(n),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}renderResizer(){return!this.resizable||!this.selected?C``:C`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick("nw")}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick("ne")}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick("sw")}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick("se")}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick("n")}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick("s")}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick("w")}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick("e")}></div>
      `}}return Y([v({type:String,reflect:!0})],t.prototype,"id"),Y([v({type:Object})],t.prototype,"position"),Y([v({type:Object})],t.prototype,"data"),Y([v({type:Boolean,reflect:!0})],t.prototype,"selected"),Y([v({type:Boolean,reflect:!0})],t.prototype,"dragging"),Y([v({type:Object})],t.prototype,"instance"),Y([v({type:Boolean})],t.prototype,"resizable"),Y([v({type:Boolean})],t.prototype,"draggable"),Y([v({type:Boolean})],t.prototype,"connectable"),Y([v({type:Number})],t.prototype,"minWidth"),Y([v({type:Number})],t.prototype,"maxWidth"),Y([v({type:Number})],t.prototype,"minHeight"),Y([v({type:Number})],t.prototype,"maxHeight"),Y([v({type:Boolean})],t.prototype,"keepAspectRatio"),t};u.FlowInstance=dn,u.NodeMixin=Hl,u.ShapeRegistry=Kt,u.createStore=ka,u.getBezierPath=Ne,u.getCenter=ol,u.getDistance=rl,u.getSmoothStepPath=si,u.getStraightPath=An,u.isPointInRect=al,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})}));
