(function(u,Ht){typeof exports=="object"&&typeof module<"u"?Ht(exports):typeof define=="function"&&define.amd?define(["exports"],Ht):(u=typeof globalThis<"u"?globalThis:u||self,Ht(u.LitFlow={}))})(this,(function(u){"use strict";var Ht={value:()=>{}};function Ce(){for(var e=0,t=arguments.length,i={},n;e<t;++e){if(!(n=arguments[e]+"")||n in i||/[\s.]/.test(n))throw new Error("illegal type: "+n);i[n]=[]}return new ee(i)}function ee(e){this._=e}function Pn(e,t){return e.trim().split(/^|\s+/).map(function(i){var n="",s=i.indexOf(".");if(s>=0&&(n=i.slice(s+1),i=i.slice(0,s)),i&&!t.hasOwnProperty(i))throw new Error("unknown type: "+i);return{type:i,name:n}})}ee.prototype=Ce.prototype={constructor:ee,on:function(e,t){var i=this._,n=Pn(e+"",i),s,r=-1,o=n.length;if(arguments.length<2){for(;++r<o;)if((s=(e=n[r]).type)&&(s=Ln(i[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<o;)if(s=(e=n[r]).type)i[s]=hi(i[s],e.name,t);else if(t==null)for(s in i)i[s]=hi(i[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var i in t)e[i]=t[i].slice();return new ee(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var i=new Array(s),n=0,s,r;n<s;++n)i[n]=arguments[n+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(r=this._[e],n=0,s=r.length;n<s;++n)r[n].value.apply(t,i)},apply:function(e,t,i){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var n=this._[e],s=0,r=n.length;s<r;++s)n[s].value.apply(t,i)}};function Ln(e,t){for(var i=0,n=e.length,s;i<n;++i)if((s=e[i]).name===t)return s.value}function hi(e,t,i){for(var n=0,s=e.length;n<s;++n)if(e[n].name===t){e[n]=Ht,e=e.slice(0,n).concat(e.slice(n+1));break}return i!=null&&e.push({name:t,value:i}),e}var Me="http://www.w3.org/1999/xhtml";const li={svg:"http://www.w3.org/2000/svg",xhtml:Me,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ie(e){var t=e+="",i=t.indexOf(":");return i>=0&&(t=e.slice(0,i))!=="xmlns"&&(e=e.slice(i+1)),li.hasOwnProperty(t)?{space:li[t],local:e}:e}function Tn(e){return function(){var t=this.ownerDocument,i=this.namespaceURI;return i===Me&&t.documentElement.namespaceURI===Me?t.createElement(e):t.createElementNS(i,e)}}function Dn(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function di(e){var t=ie(e);return(t.local?Dn:Tn)(t)}function On(){}function He(e){return e==null?On:function(){return this.querySelector(e)}}function Bn(e){typeof e!="function"&&(e=He(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=new Array(o),h,d,l=0;l<o;++l)(h=r[l])&&(d=e.call(h,h.__data__,l,r))&&("__data__"in h&&(d.__data__=h.__data__),a[l]=d);return new Z(n,this._parents)}function In(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Fn(){return[]}function ci(e){return e==null?Fn:function(){return this.querySelectorAll(e)}}function Un(e){return function(){return In(e.apply(this,arguments))}}function Xn(e){typeof e=="function"?e=Un(e):e=ci(e);for(var t=this._groups,i=t.length,n=[],s=[],r=0;r<i;++r)for(var o=t[r],a=o.length,h,d=0;d<a;++d)(h=o[d])&&(n.push(e.call(h,h.__data__,d,o)),s.push(h));return new Z(n,s)}function ui(e){return function(){return this.matches(e)}}function fi(e){return function(t){return t.matches(e)}}var Yn=Array.prototype.find;function qn(e){return function(){return Yn.call(this.children,e)}}function Zn(){return this.firstElementChild}function Wn(e){return this.select(e==null?Zn:qn(typeof e=="function"?e:fi(e)))}var Vn=Array.prototype.filter;function jn(){return Array.from(this.children)}function Gn(e){return function(){return Vn.call(this.children,e)}}function Kn(e){return this.selectAll(e==null?jn:Gn(typeof e=="function"?e:fi(e)))}function Qn(e){typeof e!="function"&&(e=ui(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],h,d=0;d<o;++d)(h=r[d])&&e.call(h,h.__data__,d,r)&&a.push(h);return new Z(n,this._parents)}function pi(e){return new Array(e.length)}function Jn(){return new Z(this._enter||this._groups.map(pi),this._parents)}function ne(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}ne.prototype={constructor:ne,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function ts(e){return function(){return e}}function es(e,t,i,n,s,r){for(var o=0,a,h=t.length,d=r.length;o<d;++o)(a=t[o])?(a.__data__=r[o],n[o]=a):i[o]=new ne(e,r[o]);for(;o<h;++o)(a=t[o])&&(s[o]=a)}function is(e,t,i,n,s,r,o){var a,h,d=new Map,l=t.length,c=r.length,p=new Array(l),g;for(a=0;a<l;++a)(h=t[a])&&(p[a]=g=o.call(h,h.__data__,a,t)+"",d.has(g)?s[a]=h:d.set(g,h));for(a=0;a<c;++a)g=o.call(e,r[a],a,r)+"",(h=d.get(g))?(n[a]=h,h.__data__=r[a],d.delete(g)):i[a]=new ne(e,r[a]);for(a=0;a<l;++a)(h=t[a])&&d.get(p[a])===h&&(s[a]=h)}function ns(e){return e.__data__}function ss(e,t){if(!arguments.length)return Array.from(this,ns);var i=t?is:es,n=this._parents,s=this._groups;typeof e!="function"&&(e=ts(e));for(var r=s.length,o=new Array(r),a=new Array(r),h=new Array(r),d=0;d<r;++d){var l=n[d],c=s[d],p=c.length,g=rs(e.call(l,l&&l.__data__,d,n)),y=g.length,_=a[d]=new Array(y),k=o[d]=new Array(y),b=h[d]=new Array(p);i(l,c,_,k,b,g,t);for(var N=0,A=0,D,q;N<y;++N)if(D=_[N]){for(N>=A&&(A=N+1);!(q=k[A])&&++A<y;);D._next=q||null}}return o=new Z(o,n),o._enter=a,o._exit=h,o}function rs(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function os(){return new Z(this._exit||this._groups.map(pi),this._parents)}function as(e,t,i){var n=this.enter(),s=this,r=this.exit();return typeof e=="function"?(n=e(n),n&&(n=n.selection())):n=n.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),i==null?r.remove():i(r),n&&s?n.merge(s).order():s}function hs(e){for(var t=e.selection?e.selection():e,i=this._groups,n=t._groups,s=i.length,r=n.length,o=Math.min(s,r),a=new Array(s),h=0;h<o;++h)for(var d=i[h],l=n[h],c=d.length,p=a[h]=new Array(c),g,y=0;y<c;++y)(g=d[y]||l[y])&&(p[y]=g);for(;h<s;++h)a[h]=i[h];return new Z(a,this._parents)}function ls(){for(var e=this._groups,t=-1,i=e.length;++t<i;)for(var n=e[t],s=n.length-1,r=n[s],o;--s>=0;)(o=n[s])&&(r&&o.compareDocumentPosition(r)^4&&r.parentNode.insertBefore(o,r),r=o);return this}function ds(e){e||(e=cs);function t(c,p){return c&&p?e(c.__data__,p.__data__):!c-!p}for(var i=this._groups,n=i.length,s=new Array(n),r=0;r<n;++r){for(var o=i[r],a=o.length,h=s[r]=new Array(a),d,l=0;l<a;++l)(d=o[l])&&(h[l]=d);h.sort(t)}return new Z(s,this._parents).order()}function cs(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function us(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function fs(){return Array.from(this)}function ps(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length;s<r;++s){var o=n[s];if(o)return o}return null}function gs(){let e=0;for(const t of this)++e;return e}function ms(){return!this.node()}function ys(e){for(var t=this._groups,i=0,n=t.length;i<n;++i)for(var s=t[i],r=0,o=s.length,a;r<o;++r)(a=s[r])&&e.call(a,a.__data__,r,s);return this}function ws(e){return function(){this.removeAttribute(e)}}function vs(e){return function(){this.removeAttributeNS(e.space,e.local)}}function bs(e,t){return function(){this.setAttribute(e,t)}}function xs(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function _s(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttribute(e):this.setAttribute(e,i)}}function $s(e,t){return function(){var i=t.apply(this,arguments);i==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,i)}}function zs(e,t){var i=ie(e);if(arguments.length<2){var n=this.node();return i.local?n.getAttributeNS(i.space,i.local):n.getAttribute(i)}return this.each((t==null?i.local?vs:ws:typeof t=="function"?i.local?$s:_s:i.local?xs:bs)(i,t))}function gi(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Ss(e){return function(){this.style.removeProperty(e)}}function Es(e,t,i){return function(){this.style.setProperty(e,t,i)}}function ks(e,t,i){return function(){var n=t.apply(this,arguments);n==null?this.style.removeProperty(e):this.style.setProperty(e,n,i)}}function Ns(e,t,i){return arguments.length>1?this.each((t==null?Ss:typeof t=="function"?ks:Es)(e,t,i??"")):St(this.node(),e)}function St(e,t){return e.style.getPropertyValue(t)||gi(e).getComputedStyle(e,null).getPropertyValue(t)}function Cs(e){return function(){delete this[e]}}function Ms(e,t){return function(){this[e]=t}}function Hs(e,t){return function(){var i=t.apply(this,arguments);i==null?delete this[e]:this[e]=i}}function As(e,t){return arguments.length>1?this.each((t==null?Cs:typeof t=="function"?Hs:Ms)(e,t)):this.node()[e]}function mi(e){return e.trim().split(/^|\s+/)}function Ae(e){return e.classList||new yi(e)}function yi(e){this._node=e,this._names=mi(e.getAttribute("class")||"")}yi.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function wi(e,t){for(var i=Ae(e),n=-1,s=t.length;++n<s;)i.add(t[n])}function vi(e,t){for(var i=Ae(e),n=-1,s=t.length;++n<s;)i.remove(t[n])}function Rs(e){return function(){wi(this,e)}}function Ps(e){return function(){vi(this,e)}}function Ls(e,t){return function(){(t.apply(this,arguments)?wi:vi)(this,e)}}function Ts(e,t){var i=mi(e+"");if(arguments.length<2){for(var n=Ae(this.node()),s=-1,r=i.length;++s<r;)if(!n.contains(i[s]))return!1;return!0}return this.each((typeof t=="function"?Ls:t?Rs:Ps)(i,t))}function Ds(){this.textContent=""}function Os(e){return function(){this.textContent=e}}function Bs(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Is(e){return arguments.length?this.each(e==null?Ds:(typeof e=="function"?Bs:Os)(e)):this.node().textContent}function Fs(){this.innerHTML=""}function Us(e){return function(){this.innerHTML=e}}function Xs(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Ys(e){return arguments.length?this.each(e==null?Fs:(typeof e=="function"?Xs:Us)(e)):this.node().innerHTML}function qs(){this.nextSibling&&this.parentNode.appendChild(this)}function Zs(){return this.each(qs)}function Ws(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Vs(){return this.each(Ws)}function js(e){var t=typeof e=="function"?e:di(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Gs(){return null}function Ks(e,t){var i=typeof e=="function"?e:di(e),n=t==null?Gs:typeof t=="function"?t:He(t);return this.select(function(){return this.insertBefore(i.apply(this,arguments),n.apply(this,arguments)||null)})}function Qs(){var e=this.parentNode;e&&e.removeChild(this)}function Js(){return this.each(Qs)}function tr(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function er(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function ir(e){return this.select(e?er:tr)}function nr(e){return arguments.length?this.property("__data__",e):this.node().__data__}function sr(e){return function(t){e.call(this,t,this.__data__)}}function rr(e){return e.trim().split(/^|\s+/).map(function(t){var i="",n=t.indexOf(".");return n>=0&&(i=t.slice(n+1),t=t.slice(0,n)),{type:t,name:i}})}function or(e){return function(){var t=this.__on;if(t){for(var i=0,n=-1,s=t.length,r;i<s;++i)r=t[i],(!e.type||r.type===e.type)&&r.name===e.name?this.removeEventListener(r.type,r.listener,r.options):t[++n]=r;++n?t.length=n:delete this.__on}}}function ar(e,t,i){return function(){var n=this.__on,s,r=sr(t);if(n){for(var o=0,a=n.length;o<a;++o)if((s=n[o]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=r,s.options=i),s.value=t;return}}this.addEventListener(e.type,r,i),s={type:e.type,name:e.name,value:t,listener:r,options:i},n?n.push(s):this.__on=[s]}}function hr(e,t,i){var n=rr(e+""),s,r=n.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var h=0,d=a.length,l;h<d;++h)for(s=0,l=a[h];s<r;++s)if((o=n[s]).type===l.type&&o.name===l.name)return l.value}return}for(a=t?ar:or,s=0;s<r;++s)this.each(a(n[s],t,i));return this}function bi(e,t,i){var n=gi(e),s=n.CustomEvent;typeof s=="function"?s=new s(t,i):(s=n.document.createEvent("Event"),i?(s.initEvent(t,i.bubbles,i.cancelable),s.detail=i.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function lr(e,t){return function(){return bi(this,e,t)}}function dr(e,t){return function(){return bi(this,e,t.apply(this,arguments))}}function cr(e,t){return this.each((typeof t=="function"?dr:lr)(e,t))}function*ur(){for(var e=this._groups,t=0,i=e.length;t<i;++t)for(var n=e[t],s=0,r=n.length,o;s<r;++s)(o=n[s])&&(yield o)}var xi=[null];function Z(e,t){this._groups=e,this._parents=t}function At(){return new Z([[document.documentElement]],xi)}function fr(){return this}Z.prototype=At.prototype={constructor:Z,select:Bn,selectAll:Xn,selectChild:Wn,selectChildren:Kn,filter:Qn,data:ss,enter:Jn,exit:os,join:as,merge:hs,selection:fr,order:ls,sort:ds,call:us,nodes:fs,node:ps,size:gs,empty:ms,each:ys,attr:zs,style:Ns,property:As,classed:Ts,text:Is,html:Ys,raise:Zs,lower:Vs,append:js,insert:Ks,remove:Js,clone:ir,datum:nr,on:hr,dispatch:cr,[Symbol.iterator]:ur};function ut(e){return typeof e=="string"?new Z([[document.querySelector(e)]],[document.documentElement]):new Z([[e]],xi)}function pr(e){let t;for(;t=e.sourceEvent;)e=t;return e}function ft(e,t){if(e=pr(e),t===void 0&&(t=e.currentTarget),t){var i=t.ownerSVGElement||t;if(i.createSVGPoint){var n=i.createSVGPoint();return n.x=e.clientX,n.y=e.clientY,n=n.matrixTransform(t.getScreenCTM().inverse()),[n.x,n.y]}if(t.getBoundingClientRect){var s=t.getBoundingClientRect();return[e.clientX-s.left-t.clientLeft,e.clientY-s.top-t.clientTop]}}return[e.pageX,e.pageY]}const Re={capture:!0,passive:!1};function Pe(e){e.preventDefault(),e.stopImmediatePropagation()}function gr(e){var t=e.document.documentElement,i=ut(e).on("dragstart.drag",Pe,Re);"onselectstart"in t?i.on("selectstart.drag",Pe,Re):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function mr(e,t){var i=e.document.documentElement,n=ut(e).on("dragstart.drag",null);t&&(n.on("click.drag",Pe,Re),setTimeout(function(){n.on("click.drag",null)},0)),"onselectstart"in i?n.on("selectstart.drag",null):(i.style.MozUserSelect=i.__noselect,delete i.__noselect)}function Le(e,t,i){e.prototype=t.prototype=i,i.constructor=e}function _i(e,t){var i=Object.create(e.prototype);for(var n in t)i[n]=t[n];return i}function Rt(){}var Pt=.7,se=1/Pt,Et="\\s*([+-]?\\d+)\\s*",Lt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",nt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",yr=/^#([0-9a-f]{3,8})$/,wr=new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`),vr=new RegExp(`^rgb\\(${nt},${nt},${nt}\\)$`),br=new RegExp(`^rgba\\(${Et},${Et},${Et},${Lt}\\)$`),xr=new RegExp(`^rgba\\(${nt},${nt},${nt},${Lt}\\)$`),_r=new RegExp(`^hsl\\(${Lt},${nt},${nt}\\)$`),$r=new RegExp(`^hsla\\(${Lt},${nt},${nt},${Lt}\\)$`),$i={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Le(Rt,mt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:zi,formatHex:zi,formatHex8:zr,formatHsl:Sr,formatRgb:Si,toString:Si});function zi(){return this.rgb().formatHex()}function zr(){return this.rgb().formatHex8()}function Sr(){return Mi(this).formatHsl()}function Si(){return this.rgb().formatRgb()}function mt(e){var t,i;return e=(e+"").trim().toLowerCase(),(t=yr.exec(e))?(i=t[1].length,t=parseInt(t[1],16),i===6?Ei(t):i===3?new U(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):i===8?re(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):i===4?re(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=wr.exec(e))?new U(t[1],t[2],t[3],1):(t=vr.exec(e))?new U(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=br.exec(e))?re(t[1],t[2],t[3],t[4]):(t=xr.exec(e))?re(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=_r.exec(e))?Ci(t[1],t[2]/100,t[3]/100,1):(t=$r.exec(e))?Ci(t[1],t[2]/100,t[3]/100,t[4]):$i.hasOwnProperty(e)?Ei($i[e]):e==="transparent"?new U(NaN,NaN,NaN,0):null}function Ei(e){return new U(e>>16&255,e>>8&255,e&255,1)}function re(e,t,i,n){return n<=0&&(e=t=i=NaN),new U(e,t,i,n)}function Er(e){return e instanceof Rt||(e=mt(e)),e?(e=e.rgb(),new U(e.r,e.g,e.b,e.opacity)):new U}function Te(e,t,i,n){return arguments.length===1?Er(e):new U(e,t,i,n??1)}function U(e,t,i,n){this.r=+e,this.g=+t,this.b=+i,this.opacity=+n}Le(U,Te,_i(Rt,{brighter(e){return e=e==null?se:Math.pow(se,e),new U(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Pt:Math.pow(Pt,e),new U(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new U(yt(this.r),yt(this.g),yt(this.b),oe(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:ki,formatHex:ki,formatHex8:kr,formatRgb:Ni,toString:Ni}));function ki(){return`#${wt(this.r)}${wt(this.g)}${wt(this.b)}`}function kr(){return`#${wt(this.r)}${wt(this.g)}${wt(this.b)}${wt((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ni(){const e=oe(this.opacity);return`${e===1?"rgb(":"rgba("}${yt(this.r)}, ${yt(this.g)}, ${yt(this.b)}${e===1?")":`, ${e})`}`}function oe(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function yt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function wt(e){return e=yt(e),(e<16?"0":"")+e.toString(16)}function Ci(e,t,i,n){return n<=0?e=t=i=NaN:i<=0||i>=1?e=t=NaN:t<=0&&(e=NaN),new K(e,t,i,n)}function Mi(e){if(e instanceof K)return new K(e.h,e.s,e.l,e.opacity);if(e instanceof Rt||(e=mt(e)),!e)return new K;if(e instanceof K)return e;e=e.rgb();var t=e.r/255,i=e.g/255,n=e.b/255,s=Math.min(t,i,n),r=Math.max(t,i,n),o=NaN,a=r-s,h=(r+s)/2;return a?(t===r?o=(i-n)/a+(i<n)*6:i===r?o=(n-t)/a+2:o=(t-i)/a+4,a/=h<.5?r+s:2-r-s,o*=60):a=h>0&&h<1?0:o,new K(o,a,h,e.opacity)}function Nr(e,t,i,n){return arguments.length===1?Mi(e):new K(e,t,i,n??1)}function K(e,t,i,n){this.h=+e,this.s=+t,this.l=+i,this.opacity=+n}Le(K,Nr,_i(Rt,{brighter(e){return e=e==null?se:Math.pow(se,e),new K(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Pt:Math.pow(Pt,e),new K(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,i=this.l,n=i+(i<.5?i:1-i)*t,s=2*i-n;return new U(De(e>=240?e-240:e+120,s,n),De(e,s,n),De(e<120?e+240:e-120,s,n),this.opacity)},clamp(){return new K(Hi(this.h),ae(this.s),ae(this.l),oe(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=oe(this.opacity);return`${e===1?"hsl(":"hsla("}${Hi(this.h)}, ${ae(this.s)*100}%, ${ae(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Hi(e){return e=(e||0)%360,e<0?e+360:e}function ae(e){return Math.max(0,Math.min(1,e||0))}function De(e,t,i){return(e<60?t+(i-t)*e/60:e<180?i:e<240?t+(i-t)*(240-e)/60:t)*255}const Oe=e=>()=>e;function Cr(e,t){return function(i){return e+i*t}}function Mr(e,t,i){return e=Math.pow(e,i),t=Math.pow(t,i)-e,i=1/i,function(n){return Math.pow(e+n*t,i)}}function Hr(e){return(e=+e)==1?Ai:function(t,i){return i-t?Mr(t,i,e):Oe(isNaN(t)?i:t)}}function Ai(e,t){var i=t-e;return i?Cr(e,i):Oe(isNaN(e)?t:e)}const he=(function e(t){var i=Hr(t);function n(s,r){var o=i((s=Te(s)).r,(r=Te(r)).r),a=i(s.g,r.g),h=i(s.b,r.b),d=Ai(s.opacity,r.opacity);return function(l){return s.r=o(l),s.g=a(l),s.b=h(l),s.opacity=d(l),s+""}}return n.gamma=e,n})(1);function Ar(e,t){t||(t=[]);var i=e?Math.min(t.length,e.length):0,n=t.slice(),s;return function(r){for(s=0;s<i;++s)n[s]=e[s]*(1-r)+t[s]*r;return n}}function Rr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Pr(e,t){var i=t?t.length:0,n=e?Math.min(i,e.length):0,s=new Array(n),r=new Array(i),o;for(o=0;o<n;++o)s[o]=Tt(e[o],t[o]);for(;o<i;++o)r[o]=t[o];return function(a){for(o=0;o<n;++o)r[o]=s[o](a);return r}}function Lr(e,t){var i=new Date;return e=+e,t=+t,function(n){return i.setTime(e*(1-n)+t*n),i}}function st(e,t){return e=+e,t=+t,function(i){return e*(1-i)+t*i}}function Tr(e,t){var i={},n={},s;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(s in t)s in e?i[s]=Tt(e[s],t[s]):n[s]=t[s];return function(r){for(s in i)n[s]=i[s](r);return n}}var Be=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ie=new RegExp(Be.source,"g");function Dr(e){return function(){return e}}function Or(e){return function(t){return e(t)+""}}function Ri(e,t){var i=Be.lastIndex=Ie.lastIndex=0,n,s,r,o=-1,a=[],h=[];for(e=e+"",t=t+"";(n=Be.exec(e))&&(s=Ie.exec(t));)(r=s.index)>i&&(r=t.slice(i,r),a[o]?a[o]+=r:a[++o]=r),(n=n[0])===(s=s[0])?a[o]?a[o]+=s:a[++o]=s:(a[++o]=null,h.push({i:o,x:st(n,s)})),i=Ie.lastIndex;return i<t.length&&(r=t.slice(i),a[o]?a[o]+=r:a[++o]=r),a.length<2?h[0]?Or(h[0].x):Dr(t):(t=h.length,function(d){for(var l=0,c;l<t;++l)a[(c=h[l]).i]=c.x(d);return a.join("")})}function Tt(e,t){var i=typeof t,n;return t==null||i==="boolean"?Oe(t):(i==="number"?st:i==="string"?(n=mt(t))?(t=n,he):Ri:t instanceof mt?he:t instanceof Date?Lr:Rr(t)?Ar:Array.isArray(t)?Pr:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Tr:st)(e,t)}var Pi=180/Math.PI,Fe={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Li(e,t,i,n,s,r){var o,a,h;return(o=Math.sqrt(e*e+t*t))&&(e/=o,t/=o),(h=e*i+t*n)&&(i-=e*h,n-=t*h),(a=Math.sqrt(i*i+n*n))&&(i/=a,n/=a,h/=a),e*n<t*i&&(e=-e,t=-t,h=-h,o=-o),{translateX:s,translateY:r,rotate:Math.atan2(t,e)*Pi,skewX:Math.atan(h)*Pi,scaleX:o,scaleY:a}}var le;function Br(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Fe:Li(t.a,t.b,t.c,t.d,t.e,t.f)}function Ir(e){return e==null||(le||(le=document.createElementNS("http://www.w3.org/2000/svg","g")),le.setAttribute("transform",e),!(e=le.transform.baseVal.consolidate()))?Fe:(e=e.matrix,Li(e.a,e.b,e.c,e.d,e.e,e.f))}function Ti(e,t,i,n){function s(d){return d.length?d.pop()+" ":""}function r(d,l,c,p,g,y){if(d!==c||l!==p){var _=g.push("translate(",null,t,null,i);y.push({i:_-4,x:st(d,c)},{i:_-2,x:st(l,p)})}else(c||p)&&g.push("translate("+c+t+p+i)}function o(d,l,c,p){d!==l?(d-l>180?l+=360:l-d>180&&(d+=360),p.push({i:c.push(s(c)+"rotate(",null,n)-2,x:st(d,l)})):l&&c.push(s(c)+"rotate("+l+n)}function a(d,l,c,p){d!==l?p.push({i:c.push(s(c)+"skewX(",null,n)-2,x:st(d,l)}):l&&c.push(s(c)+"skewX("+l+n)}function h(d,l,c,p,g,y){if(d!==c||l!==p){var _=g.push(s(g)+"scale(",null,",",null,")");y.push({i:_-4,x:st(d,c)},{i:_-2,x:st(l,p)})}else(c!==1||p!==1)&&g.push(s(g)+"scale("+c+","+p+")")}return function(d,l){var c=[],p=[];return d=e(d),l=e(l),r(d.translateX,d.translateY,l.translateX,l.translateY,c,p),o(d.rotate,l.rotate,c,p),a(d.skewX,l.skewX,c,p),h(d.scaleX,d.scaleY,l.scaleX,l.scaleY,c,p),d=l=null,function(g){for(var y=-1,_=p.length,k;++y<_;)c[(k=p[y]).i]=k.x(g);return c.join("")}}}var Fr=Ti(Br,"px, ","px)","deg)"),Ur=Ti(Ir,", ",")",")"),Xr=1e-12;function Di(e){return((e=Math.exp(e))+1/e)/2}function Yr(e){return((e=Math.exp(e))-1/e)/2}function qr(e){return((e=Math.exp(2*e))-1)/(e+1)}const de=(function e(t,i,n){function s(r,o){var a=r[0],h=r[1],d=r[2],l=o[0],c=o[1],p=o[2],g=l-a,y=c-h,_=g*g+y*y,k,b;if(_<Xr)b=Math.log(p/d)/t,k=function(B){return[a+B*g,h+B*y,d*Math.exp(t*B*b)]};else{var N=Math.sqrt(_),A=(p*p-d*d+n*_)/(2*d*i*N),D=(p*p-d*d-n*_)/(2*p*i*N),q=Math.log(Math.sqrt(A*A+1)-A),P=Math.log(Math.sqrt(D*D+1)-D);b=(P-q)/t,k=function(B){var tt=B*b,et=Di(q),gt=d/(i*N)*(et*qr(t*tt+q)-Yr(q));return[a+gt*g,h+gt*y,d*et/Di(t*tt+q)]}}return k.duration=b*1e3*t/Math.SQRT2,k}return s.rho=function(r){var o=Math.max(.001,+r),a=o*o,h=a*a;return e(o,a,h)},s})(Math.SQRT2,2,4);var kt=0,Dt=0,Ot=0,Oi=1e3,ce,Bt,ue=0,vt=0,fe=0,It=typeof performance=="object"&&performance.now?performance:Date,Bi=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Ue(){return vt||(Bi(Zr),vt=It.now()+fe)}function Zr(){vt=0}function pe(){this._call=this._time=this._next=null}pe.prototype=Ii.prototype={constructor:pe,restart:function(e,t,i){if(typeof e!="function")throw new TypeError("callback is not a function");i=(i==null?Ue():+i)+(t==null?0:+t),!this._next&&Bt!==this&&(Bt?Bt._next=this:ce=this,Bt=this),this._call=e,this._time=i,Xe()},stop:function(){this._call&&(this._call=null,this._time=1/0,Xe())}};function Ii(e,t,i){var n=new pe;return n.restart(e,t,i),n}function Wr(){Ue(),++kt;for(var e=ce,t;e;)(t=vt-e._time)>=0&&e._call.call(void 0,t),e=e._next;--kt}function Fi(){vt=(ue=It.now())+fe,kt=Dt=0;try{Wr()}finally{kt=0,jr(),vt=0}}function Vr(){var e=It.now(),t=e-ue;t>Oi&&(fe-=t,ue=e)}function jr(){for(var e,t=ce,i,n=1/0;t;)t._call?(n>t._time&&(n=t._time),e=t,t=t._next):(i=t._next,t._next=null,t=e?e._next=i:ce=i);Bt=e,Xe(n)}function Xe(e){if(!kt){Dt&&(Dt=clearTimeout(Dt));var t=e-vt;t>24?(e<1/0&&(Dt=setTimeout(Fi,e-It.now()-fe)),Ot&&(Ot=clearInterval(Ot))):(Ot||(ue=It.now(),Ot=setInterval(Vr,Oi)),kt=1,Bi(Fi))}}function Ui(e,t,i){var n=new pe;return t=t==null?0:+t,n.restart(s=>{n.stop(),e(s+t)},t,i),n}var Gr=Ce("start","end","cancel","interrupt"),Kr=[],Xi=0,Yi=1,Ye=2,ge=3,qi=4,qe=5,me=6;function ye(e,t,i,n,s,r){var o=e.__transition;if(!o)e.__transition={};else if(i in o)return;Qr(e,i,{name:t,index:n,group:s,on:Gr,tween:Kr,time:r.time,delay:r.delay,duration:r.duration,ease:r.ease,timer:null,state:Xi})}function Ze(e,t){var i=Q(e,t);if(i.state>Xi)throw new Error("too late; already scheduled");return i}function rt(e,t){var i=Q(e,t);if(i.state>ge)throw new Error("too late; already running");return i}function Q(e,t){var i=e.__transition;if(!i||!(i=i[t]))throw new Error("transition not found");return i}function Qr(e,t,i){var n=e.__transition,s;n[t]=i,i.timer=Ii(r,0,i.time);function r(d){i.state=Yi,i.timer.restart(o,i.delay,i.time),i.delay<=d&&o(d-i.delay)}function o(d){var l,c,p,g;if(i.state!==Yi)return h();for(l in n)if(g=n[l],g.name===i.name){if(g.state===ge)return Ui(o);g.state===qi?(g.state=me,g.timer.stop(),g.on.call("interrupt",e,e.__data__,g.index,g.group),delete n[l]):+l<t&&(g.state=me,g.timer.stop(),g.on.call("cancel",e,e.__data__,g.index,g.group),delete n[l])}if(Ui(function(){i.state===ge&&(i.state=qi,i.timer.restart(a,i.delay,i.time),a(d))}),i.state=Ye,i.on.call("start",e,e.__data__,i.index,i.group),i.state===Ye){for(i.state=ge,s=new Array(p=i.tween.length),l=0,c=-1;l<p;++l)(g=i.tween[l].value.call(e,e.__data__,i.index,i.group))&&(s[++c]=g);s.length=c+1}}function a(d){for(var l=d<i.duration?i.ease.call(null,d/i.duration):(i.timer.restart(h),i.state=qe,1),c=-1,p=s.length;++c<p;)s[c].call(e,l);i.state===qe&&(i.on.call("end",e,e.__data__,i.index,i.group),h())}function h(){i.state=me,i.timer.stop(),delete n[t];for(var d in n)return;delete e.__transition}}function we(e,t){var i=e.__transition,n,s,r=!0,o;if(i){t=t==null?null:t+"";for(o in i){if((n=i[o]).name!==t){r=!1;continue}s=n.state>Ye&&n.state<qe,n.state=me,n.timer.stop(),n.on.call(s?"interrupt":"cancel",e,e.__data__,n.index,n.group),delete i[o]}r&&delete e.__transition}}function Jr(e){return this.each(function(){we(this,e)})}function to(e,t){var i,n;return function(){var s=rt(this,e),r=s.tween;if(r!==i){n=i=r;for(var o=0,a=n.length;o<a;++o)if(n[o].name===t){n=n.slice(),n.splice(o,1);break}}s.tween=n}}function eo(e,t,i){var n,s;if(typeof i!="function")throw new Error;return function(){var r=rt(this,e),o=r.tween;if(o!==n){s=(n=o).slice();for(var a={name:t,value:i},h=0,d=s.length;h<d;++h)if(s[h].name===t){s[h]=a;break}h===d&&s.push(a)}r.tween=s}}function io(e,t){var i=this._id;if(e+="",arguments.length<2){for(var n=Q(this.node(),i).tween,s=0,r=n.length,o;s<r;++s)if((o=n[s]).name===e)return o.value;return null}return this.each((t==null?to:eo)(i,e,t))}function We(e,t,i){var n=e._id;return e.each(function(){var s=rt(this,n);(s.value||(s.value={}))[t]=i.apply(this,arguments)}),function(s){return Q(s,n).value[t]}}function Zi(e,t){var i;return(typeof t=="number"?st:t instanceof mt?he:(i=mt(t))?(t=i,he):Ri)(e,t)}function no(e){return function(){this.removeAttribute(e)}}function so(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ro(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttribute(e);return o===s?null:o===n?r:r=t(n=o,i)}}function oo(e,t,i){var n,s=i+"",r;return function(){var o=this.getAttributeNS(e.space,e.local);return o===s?null:o===n?r:r=t(n=o,i)}}function ao(e,t,i){var n,s,r;return function(){var o,a=i(this),h;return a==null?void this.removeAttribute(e):(o=this.getAttribute(e),h=a+"",o===h?null:o===n&&h===s?r:(s=h,r=t(n=o,a)))}}function ho(e,t,i){var n,s,r;return function(){var o,a=i(this),h;return a==null?void this.removeAttributeNS(e.space,e.local):(o=this.getAttributeNS(e.space,e.local),h=a+"",o===h?null:o===n&&h===s?r:(s=h,r=t(n=o,a)))}}function lo(e,t){var i=ie(e),n=i==="transform"?Ur:Zi;return this.attrTween(e,typeof t=="function"?(i.local?ho:ao)(i,n,We(this,"attr."+e,t)):t==null?(i.local?so:no)(i):(i.local?oo:ro)(i,n,t))}function co(e,t){return function(i){this.setAttribute(e,t.call(this,i))}}function uo(e,t){return function(i){this.setAttributeNS(e.space,e.local,t.call(this,i))}}function fo(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&uo(e,r)),i}return s._value=t,s}function po(e,t){var i,n;function s(){var r=t.apply(this,arguments);return r!==n&&(i=(n=r)&&co(e,r)),i}return s._value=t,s}function go(e,t){var i="attr."+e;if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;var n=ie(e);return this.tween(i,(n.local?fo:po)(n,t))}function mo(e,t){return function(){Ze(this,e).delay=+t.apply(this,arguments)}}function yo(e,t){return t=+t,function(){Ze(this,e).delay=t}}function wo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?mo:yo)(t,e)):Q(this.node(),t).delay}function vo(e,t){return function(){rt(this,e).duration=+t.apply(this,arguments)}}function bo(e,t){return t=+t,function(){rt(this,e).duration=t}}function xo(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?vo:bo)(t,e)):Q(this.node(),t).duration}function _o(e,t){if(typeof t!="function")throw new Error;return function(){rt(this,e).ease=t}}function $o(e){var t=this._id;return arguments.length?this.each(_o(t,e)):Q(this.node(),t).ease}function zo(e,t){return function(){var i=t.apply(this,arguments);if(typeof i!="function")throw new Error;rt(this,e).ease=i}}function So(e){if(typeof e!="function")throw new Error;return this.each(zo(this._id,e))}function Eo(e){typeof e!="function"&&(e=ui(e));for(var t=this._groups,i=t.length,n=new Array(i),s=0;s<i;++s)for(var r=t[s],o=r.length,a=n[s]=[],h,d=0;d<o;++d)(h=r[d])&&e.call(h,h.__data__,d,r)&&a.push(h);return new ht(n,this._parents,this._name,this._id)}function ko(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,i=e._groups,n=t.length,s=i.length,r=Math.min(n,s),o=new Array(n),a=0;a<r;++a)for(var h=t[a],d=i[a],l=h.length,c=o[a]=new Array(l),p,g=0;g<l;++g)(p=h[g]||d[g])&&(c[g]=p);for(;a<n;++a)o[a]=t[a];return new ht(o,this._parents,this._name,this._id)}function No(e){return(e+"").trim().split(/^|\s+/).every(function(t){var i=t.indexOf(".");return i>=0&&(t=t.slice(0,i)),!t||t==="start"})}function Co(e,t,i){var n,s,r=No(t)?Ze:rt;return function(){var o=r(this,e),a=o.on;a!==n&&(s=(n=a).copy()).on(t,i),o.on=s}}function Mo(e,t){var i=this._id;return arguments.length<2?Q(this.node(),i).on.on(e):this.each(Co(i,e,t))}function Ho(e){return function(){var t=this.parentNode;for(var i in this.__transition)if(+i!==e)return;t&&t.removeChild(this)}}function Ao(){return this.on("end.remove",Ho(this._id))}function Ro(e){var t=this._name,i=this._id;typeof e!="function"&&(e=He(e));for(var n=this._groups,s=n.length,r=new Array(s),o=0;o<s;++o)for(var a=n[o],h=a.length,d=r[o]=new Array(h),l,c,p=0;p<h;++p)(l=a[p])&&(c=e.call(l,l.__data__,p,a))&&("__data__"in l&&(c.__data__=l.__data__),d[p]=c,ye(d[p],t,i,p,d,Q(l,i)));return new ht(r,this._parents,t,i)}function Po(e){var t=this._name,i=this._id;typeof e!="function"&&(e=ci(e));for(var n=this._groups,s=n.length,r=[],o=[],a=0;a<s;++a)for(var h=n[a],d=h.length,l,c=0;c<d;++c)if(l=h[c]){for(var p=e.call(l,l.__data__,c,h),g,y=Q(l,i),_=0,k=p.length;_<k;++_)(g=p[_])&&ye(g,t,i,_,p,y);r.push(p),o.push(l)}return new ht(r,o,t,i)}var Lo=At.prototype.constructor;function To(){return new Lo(this._groups,this._parents)}function Do(e,t){var i,n,s;return function(){var r=St(this,e),o=(this.style.removeProperty(e),St(this,e));return r===o?null:r===i&&o===n?s:s=t(i=r,n=o)}}function Wi(e){return function(){this.style.removeProperty(e)}}function Oo(e,t,i){var n,s=i+"",r;return function(){var o=St(this,e);return o===s?null:o===n?r:r=t(n=o,i)}}function Bo(e,t,i){var n,s,r;return function(){var o=St(this,e),a=i(this),h=a+"";return a==null&&(h=a=(this.style.removeProperty(e),St(this,e))),o===h?null:o===n&&h===s?r:(s=h,r=t(n=o,a))}}function Io(e,t){var i,n,s,r="style."+t,o="end."+r,a;return function(){var h=rt(this,e),d=h.on,l=h.value[r]==null?a||(a=Wi(t)):void 0;(d!==i||s!==l)&&(n=(i=d).copy()).on(o,s=l),h.on=n}}function Fo(e,t,i){var n=(e+="")=="transform"?Fr:Zi;return t==null?this.styleTween(e,Do(e,n)).on("end.style."+e,Wi(e)):typeof t=="function"?this.styleTween(e,Bo(e,n,We(this,"style."+e,t))).each(Io(this._id,e)):this.styleTween(e,Oo(e,n,t),i).on("end.style."+e,null)}function Uo(e,t,i){return function(n){this.style.setProperty(e,t.call(this,n),i)}}function Xo(e,t,i){var n,s;function r(){var o=t.apply(this,arguments);return o!==s&&(n=(s=o)&&Uo(e,o,i)),n}return r._value=t,r}function Yo(e,t,i){var n="style."+(e+="");if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;return this.tween(n,Xo(e,t,i??""))}function qo(e){return function(){this.textContent=e}}function Zo(e){return function(){var t=e(this);this.textContent=t??""}}function Wo(e){return this.tween("text",typeof e=="function"?Zo(We(this,"text",e)):qo(e==null?"":e+""))}function Vo(e){return function(t){this.textContent=e.call(this,t)}}function jo(e){var t,i;function n(){var s=e.apply(this,arguments);return s!==i&&(t=(i=s)&&Vo(s)),t}return n._value=e,n}function Go(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,jo(e))}function Ko(){for(var e=this._name,t=this._id,i=Vi(),n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,h,d=0;d<a;++d)if(h=o[d]){var l=Q(h,t);ye(h,e,i,d,o,{time:l.time+l.delay+l.duration,delay:0,duration:l.duration,ease:l.ease})}return new ht(n,this._parents,e,i)}function Qo(){var e,t,i=this,n=i._id,s=i.size();return new Promise(function(r,o){var a={value:o},h={value:function(){--s===0&&r()}};i.each(function(){var d=rt(this,n),l=d.on;l!==e&&(t=(e=l).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(h)),d.on=t}),s===0&&r()})}var Jo=0;function ht(e,t,i,n){this._groups=e,this._parents=t,this._name=i,this._id=n}function Vi(){return++Jo}var lt=At.prototype;ht.prototype={constructor:ht,select:Ro,selectAll:Po,selectChild:lt.selectChild,selectChildren:lt.selectChildren,filter:Eo,merge:ko,selection:To,transition:Ko,call:lt.call,nodes:lt.nodes,node:lt.node,size:lt.size,empty:lt.empty,each:lt.each,on:Mo,attr:lo,attrTween:go,style:Fo,styleTween:Yo,text:Wo,textTween:Go,remove:Ao,tween:io,delay:wo,duration:xo,ease:$o,easeVarying:So,end:Qo,[Symbol.iterator]:lt[Symbol.iterator]};function ta(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var ea={time:null,delay:0,duration:250,ease:ta};function ia(e,t){for(var i;!(i=e.__transition)||!(i=i[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return i}function na(e){var t,i;e instanceof ht?(t=e._id,e=e._name):(t=Vi(),(i=ea).time=Ue(),e=e==null?null:e+"");for(var n=this._groups,s=n.length,r=0;r<s;++r)for(var o=n[r],a=o.length,h,d=0;d<a;++d)(h=o[d])&&ye(h,e,t,d,o,i||ia(h,t));return new ht(n,this._parents,e,t)}At.prototype.interrupt=Jr,At.prototype.transition=na;const ve=e=>()=>e;function sa(e,{sourceEvent:t,target:i,transform:n,dispatch:s}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},transform:{value:n,enumerable:!0,configurable:!0},_:{value:s}})}function dt(e,t,i){this.k=e,this.x=t,this.y=i}dt.prototype={constructor:dt,scale:function(e){return e===1?this:new dt(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new dt(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var be=new dt(1,0,0);ji.prototype=dt.prototype;function ji(e){for(;!e.__zoom;)if(!(e=e.parentNode))return be;return e.__zoom}function Ve(e){e.stopImmediatePropagation()}function Ft(e){e.preventDefault(),e.stopImmediatePropagation()}function ra(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function oa(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function Gi(){return this.__zoom||be}function aa(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function ha(){return navigator.maxTouchPoints||"ontouchstart"in this}function la(e,t,i){var n=e.invertX(t[0][0])-i[0][0],s=e.invertX(t[1][0])-i[1][0],r=e.invertY(t[0][1])-i[0][1],o=e.invertY(t[1][1])-i[1][1];return e.translate(s>n?(n+s)/2:Math.min(0,n)||Math.max(0,s),o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o))}function da(){var e=ra,t=oa,i=la,n=aa,s=ha,r=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],a=250,h=de,d=Ce("start","zoom","end"),l,c,p,g=500,y=150,_=0,k=10;function b(f){f.property("__zoom",Gi).on("wheel.zoom",tt,{passive:!1}).on("mousedown.zoom",et).on("dblclick.zoom",gt).filter(s).on("touchstart.zoom",Jt).on("touchmove.zoom",z).on("touchend.zoom touchcancel.zoom",M).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}b.transform=function(f,w,m,x){var $=f.selection?f.selection():f;$.property("__zoom",Gi),f!==$?q(f,w,m,x):$.interrupt().each(function(){P(this,arguments).event(x).start().zoom(null,typeof w=="function"?w.apply(this,arguments):w).end()})},b.scaleBy=function(f,w,m,x){b.scaleTo(f,function(){var $=this.__zoom.k,S=typeof w=="function"?w.apply(this,arguments):w;return $*S},m,x)},b.scaleTo=function(f,w,m,x){b.transform(f,function(){var $=t.apply(this,arguments),S=this.__zoom,E=m==null?D($):typeof m=="function"?m.apply(this,arguments):m,H=S.invert(E),R=typeof w=="function"?w.apply(this,arguments):w;return i(A(N(S,R),E,H),$,o)},m,x)},b.translateBy=function(f,w,m,x){b.transform(f,function(){return i(this.__zoom.translate(typeof w=="function"?w.apply(this,arguments):w,typeof m=="function"?m.apply(this,arguments):m),t.apply(this,arguments),o)},null,x)},b.translateTo=function(f,w,m,x,$){b.transform(f,function(){var S=t.apply(this,arguments),E=this.__zoom,H=x==null?D(S):typeof x=="function"?x.apply(this,arguments):x;return i(be.translate(H[0],H[1]).scale(E.k).translate(typeof w=="function"?-w.apply(this,arguments):-w,typeof m=="function"?-m.apply(this,arguments):-m),S,o)},x,$)};function N(f,w){return w=Math.max(r[0],Math.min(r[1],w)),w===f.k?f:new dt(w,f.x,f.y)}function A(f,w,m){var x=w[0]-m[0]*f.k,$=w[1]-m[1]*f.k;return x===f.x&&$===f.y?f:new dt(f.k,x,$)}function D(f){return[(+f[0][0]+ +f[1][0])/2,(+f[0][1]+ +f[1][1])/2]}function q(f,w,m,x){f.on("start.zoom",function(){P(this,arguments).event(x).start()}).on("interrupt.zoom end.zoom",function(){P(this,arguments).event(x).end()}).tween("zoom",function(){var $=this,S=arguments,E=P($,S).event(x),H=t.apply($,S),R=m==null?D(H):typeof m=="function"?m.apply($,S):m,W=Math.max(H[1][0]-H[0][0],H[1][1]-H[0][1]),L=$.__zoom,V=typeof w=="function"?w.apply($,S):w,it=h(L.invert(R).concat(W/L.k),V.invert(R).concat(W/V.k));return function(j){if(j===1)j=V;else{var at=it(j),te=W/at[2];j=new dt(te,R[0]-at[0]*te,R[1]-at[1]*te)}E.zoom(null,j)}})}function P(f,w,m){return!m&&f.__zooming||new B(f,w)}function B(f,w){this.that=f,this.args=w,this.active=0,this.sourceEvent=null,this.extent=t.apply(f,w),this.taps=0}B.prototype={event:function(f){return f&&(this.sourceEvent=f),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(f,w){return this.mouse&&f!=="mouse"&&(this.mouse[1]=w.invert(this.mouse[0])),this.touch0&&f!=="touch"&&(this.touch0[1]=w.invert(this.touch0[0])),this.touch1&&f!=="touch"&&(this.touch1[1]=w.invert(this.touch1[0])),this.that.__zoom=w,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(f){var w=ut(this.that).datum();d.call(f,this.that,new sa(f,{sourceEvent:this.sourceEvent,target:b,transform:this.that.__zoom,dispatch:d}),w)}};function tt(f,...w){if(!e.apply(this,arguments))return;var m=P(this,w).event(f),x=this.__zoom,$=Math.max(r[0],Math.min(r[1],x.k*Math.pow(2,n.apply(this,arguments)))),S=ft(f);if(m.wheel)(m.mouse[0][0]!==S[0]||m.mouse[0][1]!==S[1])&&(m.mouse[1]=x.invert(m.mouse[0]=S)),clearTimeout(m.wheel);else{if(x.k===$)return;m.mouse=[S,x.invert(S)],we(this),m.start()}Ft(f),m.wheel=setTimeout(E,y),m.zoom("mouse",i(A(N(x,$),m.mouse[0],m.mouse[1]),m.extent,o));function E(){m.wheel=null,m.end()}}function et(f,...w){if(p||!e.apply(this,arguments))return;var m=f.currentTarget,x=P(this,w,!0).event(f),$=ut(f.view).on("mousemove.zoom",R,!0).on("mouseup.zoom",W,!0),S=ft(f,m),E=f.clientX,H=f.clientY;gr(f.view),Ve(f),x.mouse=[S,this.__zoom.invert(S)],we(this),x.start();function R(L){if(Ft(L),!x.moved){var V=L.clientX-E,it=L.clientY-H;x.moved=V*V+it*it>_}x.event(L).zoom("mouse",i(A(x.that.__zoom,x.mouse[0]=ft(L,m),x.mouse[1]),x.extent,o))}function W(L){$.on("mousemove.zoom mouseup.zoom",null),mr(L.view,x.moved),Ft(L),x.event(L).end()}}function gt(f,...w){if(e.apply(this,arguments)){var m=this.__zoom,x=ft(f.changedTouches?f.changedTouches[0]:f,this),$=m.invert(x),S=m.k*(f.shiftKey?.5:2),E=i(A(N(m,S),x,$),t.apply(this,w),o);Ft(f),a>0?ut(this).transition().duration(a).call(q,E,x,f):ut(this).call(b.transform,E,x,f)}}function Jt(f,...w){if(e.apply(this,arguments)){var m=f.touches,x=m.length,$=P(this,w,f.changedTouches.length===x).event(f),S,E,H,R;for(Ve(f),E=0;E<x;++E)H=m[E],R=ft(H,this),R=[R,this.__zoom.invert(R),H.identifier],$.touch0?!$.touch1&&$.touch0[2]!==R[2]&&($.touch1=R,$.taps=0):($.touch0=R,S=!0,$.taps=1+!!l);l&&(l=clearTimeout(l)),S&&($.taps<2&&(c=R[0],l=setTimeout(function(){l=null},g)),we(this),$.start())}}function z(f,...w){if(this.__zooming){var m=P(this,w).event(f),x=f.changedTouches,$=x.length,S,E,H,R;for(Ft(f),S=0;S<$;++S)E=x[S],H=ft(E,this),m.touch0&&m.touch0[2]===E.identifier?m.touch0[0]=H:m.touch1&&m.touch1[2]===E.identifier&&(m.touch1[0]=H);if(E=m.that.__zoom,m.touch1){var W=m.touch0[0],L=m.touch0[1],V=m.touch1[0],it=m.touch1[1],j=(j=V[0]-W[0])*j+(j=V[1]-W[1])*j,at=(at=it[0]-L[0])*at+(at=it[1]-L[1])*at;E=N(E,Math.sqrt(j/at)),H=[(W[0]+V[0])/2,(W[1]+V[1])/2],R=[(L[0]+it[0])/2,(L[1]+it[1])/2]}else if(m.touch0)H=m.touch0[0],R=m.touch0[1];else return;m.zoom("touch",i(A(E,H,R),m.extent,o))}}function M(f,...w){if(this.__zooming){var m=P(this,w).event(f),x=f.changedTouches,$=x.length,S,E;for(Ve(f),p&&clearTimeout(p),p=setTimeout(function(){p=null},g),S=0;S<$;++S)E=x[S],m.touch0&&m.touch0[2]===E.identifier?delete m.touch0:m.touch1&&m.touch1[2]===E.identifier&&delete m.touch1;if(m.touch1&&!m.touch0&&(m.touch0=m.touch1,delete m.touch1),m.touch0)m.touch0[1]=this.__zoom.invert(m.touch0[0]);else if(m.end(),m.taps===2&&(E=ft(E,this),Math.hypot(c[0]-E[0],c[1]-E[1])<k)){var H=ut(this).on("dblclick.zoom");H&&H.apply(this,arguments)}}}return b.wheelDelta=function(f){return arguments.length?(n=typeof f=="function"?f:ve(+f),b):n},b.filter=function(f){return arguments.length?(e=typeof f=="function"?f:ve(!!f),b):e},b.touchable=function(f){return arguments.length?(s=typeof f=="function"?f:ve(!!f),b):s},b.extent=function(f){return arguments.length?(t=typeof f=="function"?f:ve([[+f[0][0],+f[0][1]],[+f[1][0],+f[1][1]]]),b):t},b.scaleExtent=function(f){return arguments.length?(r[0]=+f[0],r[1]=+f[1],b):[r[0],r[1]]},b.translateExtent=function(f){return arguments.length?(o[0][0]=+f[0][0],o[1][0]=+f[1][0],o[0][1]=+f[0][1],o[1][1]=+f[1][1],b):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},b.constrain=function(f){return arguments.length?(i=f,b):i},b.duration=function(f){return arguments.length?(a=+f,b):a},b.interpolate=function(f){return arguments.length?(h=f,b):h},b.on=function(){var f=d.on.apply(d,arguments);return f===d?b:f},b.clickDistance=function(f){return arguments.length?(_=(f=+f)*f,b):Math.sqrt(_)},b.tapDistance=function(f){return arguments.length?(k=+f,b):k},b}var Ki;(function(e){e.Strict="strict",e.Loose="loose"})(Ki||(Ki={}));var Ut;(function(e){e.Free="free",e.Vertical="vertical",e.Horizontal="horizontal"})(Ut||(Ut={}));var Qi;(function(e){e.Partial="partial",e.Full="full"})(Qi||(Qi={}));var Ji;(function(e){e.Bezier="default",e.Straight="straight",e.Step="step",e.SmoothStep="smoothstep",e.SimpleBezier="simplebezier"})(Ji||(Ji={}));var tn;(function(e){e.Arrow="arrow",e.ArrowClosed="arrowclosed"})(tn||(tn={})),u.Position=void 0,(function(e){e.Left="left",e.Top="top",e.Right="right",e.Bottom="bottom"})(u.Position||(u.Position={})),u.Position.Left+"",u.Position.Right,u.Position.Right+"",u.Position.Left,u.Position.Top+"",u.Position.Bottom,u.Position.Bottom+"",u.Position.Top;const ca=(e,t=0,i=1)=>Math.min(Math.max(e,t),i),en=e=>!isNaN(e)&&isFinite(e),nn=()=>typeof navigator<"u"&&navigator?.userAgent?.indexOf("Mac")>=0;function ua({sourceX:e,sourceY:t,targetX:i,targetY:n,sourceControlX:s,sourceControlY:r,targetControlX:o,targetControlY:a}){const h=e*.125+s*.375+o*.375+i*.125,d=t*.125+r*.375+a*.375+n*.125,l=Math.abs(h-e),c=Math.abs(d-t);return[h,d,l,c]}function xe(e,t){return e>=0?.5*e:t*25*Math.sqrt(-e)}function sn({pos:e,x1:t,y1:i,x2:n,y2:s,c:r}){switch(e){case u.Position.Left:return[t-xe(t-n,r),i];case u.Position.Right:return[t+xe(n-t,r),i];case u.Position.Top:return[t,i-xe(i-s,r)];case u.Position.Bottom:return[t,i+xe(s-i,r)]}}function fa({sourceX:e,sourceY:t,sourcePosition:i=u.Position.Bottom,targetX:n,targetY:s,targetPosition:r=u.Position.Top,curvature:o=.25}){const[a,h]=sn({pos:i,x1:e,y1:t,x2:n,y2:s,c:o}),[d,l]=sn({pos:r,x1:n,y1:s,x2:e,y2:t,c:o}),[c,p,g,y]=ua({sourceX:e,sourceY:t,targetX:n,targetY:s,sourceControlX:a,sourceControlY:h,targetControlX:d,targetControlY:l});return[`M${e},${t} C${a},${h} ${d},${l} ${n},${s}`,c,p,g,y]}function rn({sourceX:e,sourceY:t,targetX:i,targetY:n}){const s=Math.abs(i-e)/2,r=i<e?i+s:i-s,o=Math.abs(n-t)/2,a=n<t?n+o:n-o;return[r,a,s,o]}function pa({sourceX:e,sourceY:t,targetX:i,targetY:n}){const[s,r,o,a]=rn({sourceX:e,sourceY:t,targetX:i,targetY:n});return[`M ${e},${t}L ${i},${n}`,s,r,o,a]}const on={[u.Position.Left]:{x:-1,y:0},[u.Position.Right]:{x:1,y:0},[u.Position.Top]:{x:0,y:-1},[u.Position.Bottom]:{x:0,y:1}},ga=({source:e,sourcePosition:t=u.Position.Bottom,target:i})=>t===u.Position.Left||t===u.Position.Right?e.x<i.x?{x:1,y:0}:{x:-1,y:0}:e.y<i.y?{x:0,y:1}:{x:0,y:-1},an=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function ma({source:e,sourcePosition:t=u.Position.Bottom,target:i,targetPosition:n=u.Position.Top,center:s,offset:r,stepPosition:o}){const a=on[t],h=on[n],d={x:e.x+a.x*r,y:e.y+a.y*r},l={x:i.x+h.x*r,y:i.y+h.y*r},c=ga({source:d,sourcePosition:t,target:l}),p=c.x!==0?"x":"y",g=c[p];let y=[],_,k;const b={x:0,y:0},N={x:0,y:0},[,,A,D]=rn({sourceX:e.x,sourceY:e.y,targetX:i.x,targetY:i.y});if(a[p]*h[p]===-1){p==="x"?(_=s.x??d.x+(l.x-d.x)*o,k=s.y??(d.y+l.y)/2):(_=s.x??(d.x+l.x)/2,k=s.y??d.y+(l.y-d.y)*o);const P=[{x:_,y:d.y},{x:_,y:l.y}],B=[{x:d.x,y:k},{x:l.x,y:k}];a[p]===g?y=p==="x"?P:B:y=p==="x"?B:P}else{const P=[{x:d.x,y:l.y}],B=[{x:l.x,y:d.y}];if(p==="x"?y=a.x===g?B:P:y=a.y===g?P:B,t===n){const z=Math.abs(e[p]-i[p]);if(z<=r){const M=Math.min(r-1,r-z);a[p]===g?b[p]=(d[p]>e[p]?-1:1)*M:N[p]=(l[p]>i[p]?-1:1)*M}}if(t!==n){const z=p==="x"?"y":"x",M=a[p]===h[z],f=d[z]>l[z],w=d[z]<l[z];(a[p]===1&&(!M&&f||M&&w)||a[p]!==1&&(!M&&w||M&&f))&&(y=p==="x"?P:B)}const tt={x:d.x+b.x,y:d.y+b.y},et={x:l.x+N.x,y:l.y+N.y},gt=Math.max(Math.abs(tt.x-y[0].x),Math.abs(et.x-y[0].x)),Jt=Math.max(Math.abs(tt.y-y[0].y),Math.abs(et.y-y[0].y));gt>=Jt?(_=(tt.x+et.x)/2,k=y[0].y):(_=y[0].x,k=(tt.y+et.y)/2)}return[[e,{x:d.x+b.x,y:d.y+b.y},...y,{x:l.x+N.x,y:l.y+N.y},i],_,k,A,D]}function ya(e,t,i,n){const s=Math.min(an(e,t)/2,an(t,i)/2,n),{x:r,y:o}=t;if(e.x===r&&r===i.x||e.y===o&&o===i.y)return`L${r} ${o}`;if(e.y===o){const d=e.x<i.x?-1:1,l=e.y<i.y?1:-1;return`L ${r+s*d},${o}Q ${r},${o} ${r},${o+s*l}`}const a=e.x<i.x?1:-1,h=e.y<i.y?-1:1;return`L ${r},${o+s*h}Q ${r},${o} ${r+s*a},${o}`}function wa({sourceX:e,sourceY:t,sourcePosition:i=u.Position.Bottom,targetX:n,targetY:s,targetPosition:r=u.Position.Top,borderRadius:o=5,centerX:a,centerY:h,offset:d=20,stepPosition:l=.5}){const[c,p,g,y,_]=ma({source:{x:e,y:t},sourcePosition:i,target:{x:n,y:s},targetPosition:r,center:{x:a,y:h},offset:d,stepPosition:l});return[c.reduce((b,N,A)=>{let D="";return A>0&&A<c.length-1?D=ya(c[A-1],N,c[A+1],o):D=`${A===0?"M":"L"}${N.x} ${N.y}`,b+=D,b},""),p,g,y,_]}const va=(e,t)=>e.x!==t.x||e.y!==t.y||e.zoom!==t.k,_e=e=>({x:e.x,y:e.y,zoom:e.k}),je=({x:e,y:t,zoom:i})=>be.translate(e,t).scale(i),Nt=(e,t)=>e.target.closest(`.${t}`),hn=(e,t)=>t===2&&Array.isArray(e)&&e.includes(2),ba=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,Ge=(e,t=0,i=ba,n=()=>{})=>{const s=typeof t=="number"&&t>0;return s||n(),s?e.transition().duration(t).ease(i).on("end",n):e},ln=e=>{const t=e.ctrlKey&&nn()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*t};function xa({zoomPanValues:e,noWheelClassName:t,d3Selection:i,d3Zoom:n,panOnScrollMode:s,panOnScrollSpeed:r,zoomOnPinch:o,onPanZoomStart:a,onPanZoom:h,onPanZoomEnd:d}){return l=>{if(Nt(l,t))return l.ctrlKey&&l.preventDefault(),!1;l.preventDefault(),l.stopImmediatePropagation();const c=i.property("__zoom").k||1;if(l.ctrlKey&&o){const k=ft(l),b=ln(l),N=c*Math.pow(2,b);n.scaleTo(i,N,k,l);return}const p=l.deltaMode===1?20:1;let g=s===Ut.Vertical?0:l.deltaX*p,y=s===Ut.Horizontal?0:l.deltaY*p;!nn()&&l.shiftKey&&s!==Ut.Vertical&&(g=l.deltaY*p,y=0),n.translateBy(i,-(g/c)*r,-(y/c)*r,{internal:!0});const _=_e(i.property("__zoom"));clearTimeout(e.panScrollTimeout),e.isPanScrolling||(e.isPanScrolling=!0),e.isPanScrolling&&(h?.(l,_),e.panScrollTimeout=setTimeout(()=>{e.isPanScrolling=!1},150))}}function _a({noWheelClassName:e,preventScrolling:t,d3ZoomHandler:i}){return function(n,s){const r=n.type==="wheel",o=!t&&r&&!n.ctrlKey,a=Nt(n,e);if(n.ctrlKey&&r&&a&&n.preventDefault(),o||a)return null;n.preventDefault(),i.call(this,n,s)}}function $a({zoomPanValues:e,onDraggingChange:t,onPanZoomStart:i}){return n=>{if(n.sourceEvent?.internal)return;const s=_e(n.transform);e.mouseButton=n.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=s,n.sourceEvent?.type==="mousedown"&&t(!0),i&&i?.(n.sourceEvent,s)}}function za({zoomPanValues:e,panOnDrag:t,onPaneContextMenu:i,onTransformChange:n,onPanZoom:s}){return r=>{e.usedRightMouseButton=!!(i&&hn(t,e.mouseButton??0)),r.sourceEvent?.sync||n([r.transform.x,r.transform.y,r.transform.k]),s&&!r.sourceEvent?.internal&&s?.(r.sourceEvent,_e(r.transform))}}function Sa({zoomPanValues:e,panOnDrag:t,panOnScroll:i,onDraggingChange:n,onPanZoomEnd:s,onPaneContextMenu:r}){return o=>{if(!o.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,r&&hn(t,e.mouseButton??0)&&!e.usedRightMouseButton&&o.sourceEvent&&r(o.sourceEvent),e.usedRightMouseButton=!1,n(!1),s&&va(e.prevViewport,o.transform))){const a=_e(o.transform);e.prevViewport=a,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{s?.(o.sourceEvent,a)},i?150:0)}}}function Ea({zoomActivationKeyPressed:e,zoomOnScroll:t,zoomOnPinch:i,panOnDrag:n,panOnScroll:s,zoomOnDoubleClick:r,userSelectionActive:o,noWheelClassName:a,noPanClassName:h,lib:d,connectionInProgress:l}){return c=>{const p=e||t,g=i&&c.ctrlKey,y=c.type==="wheel";if(c.button===1&&c.type==="mousedown"&&(Nt(c,`${d}-flow__node`)||Nt(c,`${d}-flow__edge`)))return!0;if(!n&&!p&&!s&&!r&&!i||o||l&&!y||Nt(c,a)&&y||Nt(c,h)&&(!y||s&&y&&!e)||!i&&c.ctrlKey&&y)return!1;if(!i&&c.type==="touchstart"&&c.touches?.length>1)return c.preventDefault(),!1;if(!p&&!s&&!g&&y||!n&&(c.type==="mousedown"||c.type==="touchstart")||Array.isArray(n)&&!n.includes(c.button)&&c.type==="mousedown")return!1;const _=Array.isArray(n)&&n.includes(c.button)||!c.button||c.button<=1;return(!c.ctrlKey||y)&&_}}function ka({domNode:e,minZoom:t,maxZoom:i,paneClickDistance:n,translateExtent:s,viewport:r,onPanZoom:o,onPanZoomStart:a,onPanZoomEnd:h,onDraggingChange:d}){const l={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{x:0,y:0,zoom:0},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},c=e.getBoundingClientRect(),p=da().clickDistance(!en(n)||n<0?0:n).scaleExtent([t,i]).translateExtent(s),g=ut(e).call(p);A({x:r.x,y:r.y,zoom:ca(r.zoom,t,i)},[[0,0],[c.width,c.height]],s);const y=g.on("wheel.zoom"),_=g.on("dblclick.zoom");p.wheelDelta(ln);function k(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:de).transform(Ge(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function b({noWheelClassName:z,noPanClassName:M,onPaneContextMenu:f,userSelectionActive:w,panOnScroll:m,panOnDrag:x,panOnScrollMode:$,panOnScrollSpeed:S,preventScrolling:E,zoomOnPinch:H,zoomOnScroll:R,zoomOnDoubleClick:W,zoomActivationKeyPressed:L,lib:V,onTransformChange:it,connectionInProgress:j}){w&&!l.isZoomingOrPanning&&N();const te=m&&!L&&!w?xa({zoomPanValues:l,noWheelClassName:z,d3Selection:g,d3Zoom:p,panOnScrollMode:$,panOnScrollSpeed:S,zoomOnPinch:H,onPanZoomStart:a,onPanZoom:o,onPanZoomEnd:h}):_a({noWheelClassName:z,preventScrolling:E,d3ZoomHandler:y});if(g.on("wheel.zoom",te,{passive:!1}),!w){const Lh=$a({zoomPanValues:l,onDraggingChange:d,onPanZoomStart:a});p.on("start",Lh);const Th=za({zoomPanValues:l,panOnDrag:x,onPaneContextMenu:!!f,onPanZoom:o,onTransformChange:it});p.on("zoom",Th);const Dh=Sa({zoomPanValues:l,panOnDrag:x,panOnScroll:m,onPaneContextMenu:f,onPanZoomEnd:h,onDraggingChange:d});p.on("end",Dh)}const Ph=Ea({zoomActivationKeyPressed:L,panOnDrag:x,zoomOnScroll:R,panOnScroll:m,zoomOnDoubleClick:W,zoomOnPinch:H,userSelectionActive:w,noPanClassName:M,noWheelClassName:z,lib:V,connectionInProgress:j});p.filter(Ph),W?g.on("dblclick.zoom",_):g.on("dblclick.zoom",null)}function N(){p.on("zoom",null)}async function A(z,M,f){const w=je(z),m=p?.constrain()(w,M,f);return m&&await k(m),new Promise(x=>x(m))}async function D(z,M){const f=je(z);return await k(f,M),new Promise(w=>w(f))}function q(z){if(g){const M=je(z),f=g.property("__zoom");(f.k!==z.zoom||f.x!==z.x||f.y!==z.y)&&p?.transform(g,M,null,{sync:!0})}}function P(){const z=g?ji(g.node()):{x:0,y:0,k:1};return{x:z.x,y:z.y,zoom:z.k}}function B(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:de).scaleTo(Ge(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function tt(z,M){return g?new Promise(f=>{p?.interpolate(M?.interpolate==="linear"?Tt:de).scaleBy(Ge(g,M?.duration,M?.ease,()=>f(!0)),z)}):Promise.resolve(!1)}function et(z){p?.scaleExtent(z)}function gt(z){p?.translateExtent(z)}function Jt(z){const M=!en(z)||z<0?0:z;p?.clickDistance(M)}return{update:b,destroy:N,setViewport:D,setViewportConstrained:A,getViewport:P,scaleTo:B,scaleBy:tt,setScaleExtent:et,setTranslateExtent:gt,syncViewport:q,setClickDistance:Jt}}var dn;(function(e){e.Line="line",e.Handle="handle"})(dn||(dn={}));class cn{constructor(t={}){this.container=null,this.state={nodes:[],edges:[],viewport:{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},this.subscribers=new Set,this.panZoomInstance=null,this.pendingNodes=[],this.options={minZoom:.5,maxZoom:2,defaultZoom:1,nodesDraggable:!0,nodesConnectable:!0,elementsSelectable:!0,...t},this.state.nodes=t.nodes||[],this.state.edges=t.edges||[],this.updateLookups()}mount(t){this.container=t,this.panZoomInstance=ka({domNode:t,minZoom:this.options.minZoom||.5,maxZoom:this.options.maxZoom||2,paneClickDistance:0,translateExtent:[[-1/0,-1/0],[1/0,1/0]],viewport:this.state.viewport,onDraggingChange:i=>{this.container?.classList.toggle("panning",i)},onPanZoom:(i,n)=>{this.state.viewport=n,this.notifySubscribers()},onPanZoomStart:(i,n)=>{},onPanZoomEnd:(i,n)=>{}}),this.panZoomInstance.update({noWheelClassName:"nowheel",noPanClassName:"nopan",onPaneContextMenu:void 0,preventScrolling:!0,panOnScroll:!0,panOnDrag:!0,panOnScrollMode:"free",panOnScrollSpeed:.8,userSelectionActive:!1,zoomOnPinch:!0,zoomOnScroll:!0,zoomOnDoubleClick:!0,zoomActivationKeyPressed:!1,lib:"lit-flow",onTransformChange:i=>{},connectionInProgress:!1}),this.notifySubscribers()}destroy(){this.panZoomInstance?.destroy(),this.panZoomInstance=null,this.container=null,this.subscribers.clear()}getState(){return this.state}get nodes(){return this.state.nodes}get edges(){return this.state.edges}getViewport(){return this.state.viewport}setViewport(t){this.state.viewport=t,this.panZoomInstance?.setViewport?.(t),this.notifySubscribers()}setNodes(t){this.pendingNodes.push(...t.map(i=>i.id)),this.state.nodes=t,this.updateLookups(),this.notifySubscribers()}setEdges(t){this.retryEdgeRendering(t)}updateNode(t,i){this.state.nodes=this.state.nodes.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}updateEdge(t,i){this.state.edges=this.state.edges.map(n=>n.id===t?{...n,...i}:n),this.updateLookups(),this.notifySubscribers()}addNode(t){this.state.nodes=[...this.state.nodes,t],this.updateLookups(),this.notifySubscribers()}removeNode(t){this.state.nodes=this.state.nodes.filter(i=>i.id!==t),this.state.edges=this.state.edges.filter(i=>i.source!==t&&i.target!==t),this.updateLookups(),this.notifySubscribers()}addEdge(t){this.state.edges=[...this.state.edges,t],this.updateLookups(),this.notifySubscribers()}removeEdge(t){this.state.edges=this.state.edges.filter(i=>i.id!==t),this.updateLookups(),this.notifySubscribers()}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}zoomIn(){const t=this.state.viewport.zoom,i=Math.min(t*1.2,this.options.maxZoom||2);this.setViewport({...this.state.viewport,zoom:i})}zoomOut(){const t=this.state.viewport.zoom,i=Math.max(t/1.2,this.options.minZoom||.5);this.setViewport({...this.state.viewport,zoom:i})}fitView(){if(this.state.nodes.length===0||!this.container)return;let t=1/0,i=1/0,n=-1/0,s=-1/0;this.state.nodes.forEach(y=>{const _=y.measured?.width||y.width||150,k=y.measured?.height||y.height||50;t=Math.min(t,y.position.x),i=Math.min(i,y.position.y),n=Math.max(n,y.position.x+_),s=Math.max(s,y.position.y+k)});const r={x:t,y:i,width:n-t,height:s-i},o=this.container.clientWidth,a=this.container.clientHeight,h=50,d=(o-h*2)/r.width,l=(a-h*2)/r.height,c=Math.min(d,l,this.options.maxZoom||2),p=(o-r.width*c)/2-r.x*c,g=(a-r.height*c)/2-r.y*c;this.setViewport({x:p,y:g,zoom:c})}updateLookups(){this.state.nodeLookup.clear(),this.state.nodes.forEach(t=>{const i={...t,measured:t.measured||{width:t.width,height:t.height},internals:{positionAbsolute:t.position,z:t.zIndex||0,userNode:t}};this.state.nodeLookup.set(t.id,i)}),this.state.edgeLookup.clear(),this.state.edges.forEach(t=>{this.state.edgeLookup.set(t.id,t)})}isNodeRendered(t){if(!this.container)return!1;const i=this.container.querySelector(`[id="${CSS.escape(t)}"]`);if(!i)return!1;const n=i.getBoundingClientRect();return n.width>0&&n.height>0}hasPendingNodes(t){return t.some(i=>this.pendingNodes.includes(i)||!this.isNodeRendered(i))}markNodeAsRendered(t){const i=this.pendingNodes.indexOf(t);i>-1&&this.pendingNodes.splice(i,1)}retryEdgeRendering(t,i=0,n=10){const s=t.flatMap(o=>[o.source,o.target]),r=[...new Set(s)];this.hasPendingNodes(r)&&i<n?setTimeout(()=>{this.retryEdgeRendering(t,i+1,n)},100):(this.state.edges=t,this.updateLookups(),this.notifySubscribers(),r.forEach(o=>this.markNodeAsRendered(o)))}notifySubscribers(){this.subscribers.forEach(t=>t(this.state))}}function Na(e={}){const t={nodes:e.nodes||[],edges:e.edges||[],viewport:e.viewport||{x:0,y:0,zoom:1},nodeLookup:new Map,edgeLookup:new Map},i=new Set,n=()=>{t.nodeLookup.clear(),t.nodes.forEach(s=>{const r={...s,measured:s.measured||{width:s.width,height:s.height},internals:{positionAbsolute:s.position,z:s.zIndex||0,userNode:s}};t.nodeLookup.set(s.id,r)}),t.edgeLookup.clear(),t.edges.forEach(s=>{t.edgeLookup.set(s.id,s)})};return n(),{getState:()=>t,setState:s=>{Object.assign(t,s),n(),i.forEach(r=>r(t))},subscribe:s=>(i.add(s),()=>i.delete(s))}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $e=globalThis,Ke=$e.ShadowRoot&&($e.ShadyCSS===void 0||$e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qe=Symbol(),un=new WeakMap;let fn=class{constructor(t,i,n){if(this._$cssResult$=!0,n!==Qe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Ke&&t===void 0){const n=i!==void 0&&i.length===1;n&&(t=un.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&un.set(i,t))}return t}toString(){return this.cssText}};const Ca=e=>new fn(typeof e=="string"?e:e+"",void 0,Qe),F=(e,...t)=>{const i=e.length===1?e[0]:t.reduce(((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1]),e[0]);return new fn(i,e,Qe)},Ma=(e,t)=>{if(Ke)e.adoptedStyleSheets=t.map((i=>i instanceof CSSStyleSheet?i:i.styleSheet));else for(const i of t){const n=document.createElement("style"),s=$e.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=i.cssText,e.appendChild(n)}},pn=Ke?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const n of t.cssRules)i+=n.cssText;return Ca(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ha,defineProperty:Aa,getOwnPropertyDescriptor:Ra,getOwnPropertyNames:Pa,getOwnPropertySymbols:La,getPrototypeOf:Ta}=Object,ze=globalThis,gn=ze.trustedTypes,Da=gn?gn.emptyScript:"",Oa=ze.reactiveElementPolyfillSupport,Xt=(e,t)=>e,Se={toAttribute(e,t){switch(t){case Boolean:e=e?Da:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},Je=(e,t)=>!Ha(e,t),mn={attribute:!0,type:String,converter:Se,reflect:!1,useDefault:!1,hasChanged:Je};Symbol.metadata??=Symbol("metadata"),ze.litPropertyMetadata??=new WeakMap;let Ct=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=mn){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(t,n,i);s!==void 0&&Aa(this.prototype,t,s)}}static getPropertyDescriptor(t,i,n){const{get:s,set:r}=Ra(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:s,set(o){const a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??mn}static _$Ei(){if(this.hasOwnProperty(Xt("elementProperties")))return;const t=Ta(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Xt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Xt("properties"))){const i=this.properties,n=[...Pa(i),...La(i)];for(const s of n)this.createProperty(s,i[s])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[n,s]of i)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[i,n]of this.elementProperties){const s=this._$Eu(i,n);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const s of n)i.unshift(pn(s))}else t!==void 0&&i.push(pn(t));return i}static _$Eu(t,i){const n=i.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const n of i.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ma(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,n){this._$AK(t,n)}_$ET(t,i){const n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:Se).toAttribute(i,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,i){const n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Se;this._$Em=s;const a=o.fromAttribute(i,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,i,n){if(t!==void 0){const s=this.constructor,r=this[t];if(n??=s.getPropertyOptions(t),!((n.hasChanged??Je)(r,i)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,i,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??i??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(i=void 0),this._$AL.set(t,i)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[s,r]of n){const{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach((n=>n.hostUpdate?.())),this.update(i)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach((i=>i.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};Ct.elementStyles=[],Ct.shadowRootOptions={mode:"open"},Ct[Xt("elementProperties")]=new Map,Ct[Xt("finalized")]=new Map,Oa?.({ReactiveElement:Ct}),(ze.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ti=globalThis,Ee=ti.trustedTypes,yn=Ee?Ee.createPolicy("lit-html",{createHTML:e=>e}):void 0,wn="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,vn="?"+pt,Ba=`<${vn}>`,bt=document,Yt=()=>bt.createComment(""),qt=e=>e===null||typeof e!="object"&&typeof e!="function",ei=Array.isArray,Ia=e=>ei(e)||typeof e?.[Symbol.iterator]=="function",ii=`[ 	
\f\r]`,Zt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bn=/-->/g,xn=/>/g,xt=RegExp(`>|${ii}(?:([^\\s"'>=/]+)(${ii}*=${ii}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_n=/'/g,$n=/"/g,zn=/^(?:script|style|textarea|title)$/i,Sn=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),C=Sn(1),G=Sn(2),_t=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),En=new WeakMap,$t=bt.createTreeWalker(bt,129);function kn(e,t){if(!ei(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return yn!==void 0?yn.createHTML(t):t}const Fa=(e,t)=>{const i=e.length-1,n=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=Zt;for(let a=0;a<i;a++){const h=e[a];let d,l,c=-1,p=0;for(;p<h.length&&(o.lastIndex=p,l=o.exec(h),l!==null);)p=o.lastIndex,o===Zt?l[1]==="!--"?o=bn:l[1]!==void 0?o=xn:l[2]!==void 0?(zn.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=xt):l[3]!==void 0&&(o=xt):o===xt?l[0]===">"?(o=s??Zt,c=-1):l[1]===void 0?c=-2:(c=o.lastIndex-l[2].length,d=l[1],o=l[3]===void 0?xt:l[3]==='"'?$n:_n):o===$n||o===_n?o=xt:o===bn||o===xn?o=Zt:(o=xt,s=void 0);const g=o===xt&&e[a+1].startsWith("/>")?" ":"";r+=o===Zt?h+Ba:c>=0?(n.push(d),h.slice(0,c)+wn+h.slice(c)+pt+g):h+pt+(c===-2?a:g)}return[kn(e,r+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]};class Wt{constructor({strings:t,_$litType$:i},n){let s;this.parts=[];let r=0,o=0;const a=t.length-1,h=this.parts,[d,l]=Fa(t,i);if(this.el=Wt.createElement(d,n),$t.currentNode=this.el.content,i===2||i===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=$t.nextNode())!==null&&h.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(wn)){const p=l[o++],g=s.getAttribute(c).split(pt),y=/([.?@])?(.*)/.exec(p);h.push({type:1,index:r,name:y[2],strings:g,ctor:y[1]==="."?Xa:y[1]==="?"?Ya:y[1]==="@"?qa:ke}),s.removeAttribute(c)}else c.startsWith(pt)&&(h.push({type:6,index:r}),s.removeAttribute(c));if(zn.test(s.tagName)){const c=s.textContent.split(pt),p=c.length-1;if(p>0){s.textContent=Ee?Ee.emptyScript:"";for(let g=0;g<p;g++)s.append(c[g],Yt()),$t.nextNode(),h.push({type:2,index:++r});s.append(c[p],Yt())}}}else if(s.nodeType===8)if(s.data===vn)h.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(pt,c+1))!==-1;)h.push({type:7,index:r}),c+=pt.length-1}r++}}static createElement(t,i){const n=bt.createElement("template");return n.innerHTML=t,n}}function Mt(e,t,i=e,n){if(t===_t)return t;let s=n!==void 0?i._$Co?.[n]:i._$Cl;const r=qt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,i,n)),n!==void 0?(i._$Co??=[])[n]=s:i._$Cl=s),s!==void 0&&(t=Mt(e,s._$AS(e,t.values),s,n)),t}class Ua{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:n}=this._$AD,s=(t?.creationScope??bt).importNode(i,!0);$t.currentNode=s;let r=$t.nextNode(),o=0,a=0,h=n[0];for(;h!==void 0;){if(o===h.index){let d;h.type===2?d=new Vt(r,r.nextSibling,this,t):h.type===1?d=new h.ctor(r,h.name,h.strings,this,t):h.type===6&&(d=new Za(r,this,t)),this._$AV.push(d),h=n[++a]}o!==h?.index&&(r=$t.nextNode(),o++)}return $t.currentNode=bt,s}p(t){let i=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,i),i+=n.strings.length-2):n._$AI(t[i])),i++}}class Vt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,n,s){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Mt(this,t,i),qt(t)?t===T||t==null||t===""?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==_t&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ia(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==T&&qt(this._$AH)?this._$AA.nextSibling.data=t:this.T(bt.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Wt.createElement(kn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(i);else{const r=new Ua(s,this),o=r.u(this.options);r.p(i),this.T(o),this._$AH=r}}_$AC(t){let i=En.get(t.strings);return i===void 0&&En.set(t.strings,i=new Wt(t)),i}k(t){ei(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const r of t)s===i.length?i.push(n=new Vt(this.O(Yt()),this.O(Yt()),this,this.options)):n=i[s],n._$AI(r),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ke{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,n,s,r){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=T}_$AI(t,i=this,n,s){const r=this.strings;let o=!1;if(r===void 0)t=Mt(this,t,i,0),o=!qt(t)||t!==this._$AH&&t!==_t,o&&(this._$AH=t);else{const a=t;let h,d;for(t=r[0],h=0;h<r.length-1;h++)d=Mt(this,a[n+h],i,h),d===_t&&(d=this._$AH[h]),o||=!qt(d)||d!==this._$AH[h],d===T?t=T:t!==T&&(t+=(d??"")+r[h+1]),this._$AH[h]=d}o&&!s&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Xa extends ke{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}class Ya extends ke{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}}class qa extends ke{constructor(t,i,n,s,r){super(t,i,n,s,r),this.type=5}_$AI(t,i=this){if((t=Mt(this,t,i,0)??T)===_t)return;const n=this._$AH,s=t===T&&n!==T||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==T&&(n===T||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Za{constructor(t,i,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Mt(this,t)}}const Wa=ti.litHtmlPolyfillSupport;Wa?.(Wt,Vt),(ti.litHtmlVersions??=[]).push("3.3.1");const Nn=(e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(s===void 0){const r=i?.renderBefore??null;n._$litPart$=s=new Vt(t.insertBefore(Yt(),r),r,void 0,i??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ni=globalThis;let O=class extends Ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nn(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _t}};O._$litElement$=!0,O.finalized=!0,ni.litElementHydrateSupport?.({LitElement:O});const Va=ni.litElementPolyfillSupport;Va?.({LitElement:O}),(ni.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cn=Symbol.for(""),ja=e=>{if(e?.r===Cn)return e?._$litStatic$},Ga=e=>({_$litStatic$:e,r:Cn}),Mn=new Map,Ka=e=>(t,...i)=>{const n=i.length;let s,r;const o=[],a=[];let h,d=0,l=!1;for(;d<n;){for(h=t[d];d<n&&(r=i[d],(s=ja(r))!==void 0);)h+=s+t[++d],l=!0;d!==n&&a.push(r),o.push(h),d++}if(d===n&&o.push(t[n]),l){const c=o.join("$$lit$$");(t=Mn.get(c))===void 0&&(o.raw=o,Mn.set(c,t=o)),i=a}return e(t,...i)},J=Ka(C);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=e=>(t,i)=>{i!==void 0?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qa={attribute:!0,type:String,converter:Se,reflect:!1,hasChanged:Je},Ja=(e=Qa,t,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),n==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),n==="accessor"){const{name:o}=i;return{set(a){const h=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,h,e)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(n==="setter"){const{name:o}=i;return function(a){const h=this[o];t.call(this,a),this.requestUpdate(o,h,e)}}throw Error("Unsupported decorator location: "+n)};function v(e){return(t,i)=>typeof i=="object"?Ja(e,t,i):((n,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,n),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const th={ATTRIBUTE:1},eh=e=>(...t)=>({_$litDirective$:e,values:t});let ih=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,n){this._$Ct=t,this._$AM=i,this._$Ci=n}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hn="important",nh=" !"+Hn,sh=eh(class extends ih{constructor(e){if(super(e),e.type!==th.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const n=e[i];return n==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`}),"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const n of this.ft)t[n]==null&&(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in t){const s=t[n];if(s!=null){this.ft.add(n);const r=typeof s=="string"&&s.endsWith(nh);n.includes("-")||r?i.setProperty(n,r?s.slice(0,-11):s,r?Hn:""):i[n]=s}}return _t}});function rh(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function oh(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function Ne(e){return fa(e)}function si(e){return wa(e)}function An(e){return pa(e)}function ah(e,t){return e.x>=t.x&&e.x<=t.x+t.width&&e.y>=t.y&&e.y<=t.y+t.height}var hh=Object.defineProperty,lh=Object.getOwnPropertyDescriptor,jt=(e,t,i,n)=>{for(var s=n>1?void 0:n?lh(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&hh(t,i,s),s};u.FlowCanvas=class extends O{constructor(){super(),this.nodes=[],this.edges=[],this.viewport={x:0,y:0,zoom:1},this.nodeTypes={default:"flow-node",shape:"shape-node","erd-table":"erd-table-node"},this.connection=null,this.onHandleStart=t=>{const{nodeId:i,type:n,handleId:s}=t.detail;this.connection={from:{nodeId:i,handleId:s}}},this.onMouseMove=t=>{if(!this.connection)return;const i=this.screenToCanvas(t.clientX,t.clientY);this.connection.preview=i,this.requestUpdate()},this.onMouseUp=t=>{if(!this.connection)return;const i=t.composedPath();let n=null,s;for(const o of i)if(o instanceof HTMLElement){const a=o.tagName.toLowerCase();if(a==="flow-node"||Object.values(this.nodeTypes).some(h=>h===a)){n=o;break}o.dataset.handleId&&(s=o.dataset.handleId)}const r=n?.getAttribute("id")||void 0;if(this.connection.from&&r&&r!==this.connection.from.nodeId){const o=`e-${this.connection.from.nodeId}-${r}-${Date.now()}`,a=this.connection.from.nodeId,h=this.connection.from.handleId;let d=s;if(!d){const l=this.nodes.find(c=>c.id===r);l&&l.type==="shape"&&(d=this.determineBestTargetHandle(a,r),console.log("Auto-determined target handle:",{sourceNodeId:a,targetId:r,finalTargetHandleId:d}))}this.instance.addEdge({id:o,source:a,target:r,sourceHandle:h,targetHandle:d,data:{}})}this.connection=null,this.requestUpdate()},this.onNodeSelect=t=>{const{nodeId:i,selected:n,node:s}=t.detail;this.instance.updateNode(i,{selected:n}),this.dispatchEvent(new CustomEvent("node-selected",{detail:{nodeId:i,selected:n,node:s,allSelectedNodes:this.nodes.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.onEdgeSelect=t=>{const{edgeId:i,selected:n,edge:s}=t.detail;this.instance.updateEdge(i,{selected:n}),this.dispatchEvent(new CustomEvent("edge-selected",{detail:{edgeId:i,selected:n,edge:s,allSelectedEdges:this.edges.filter(r=>r.selected)},bubbles:!0,composed:!0}))},this.instance=new cn({nodes:this.nodes,edges:this.edges})}createRenderRoot(){return super.createRenderRoot()}getNodeGeom(t){const i=this.renderRoot.querySelector(`flow-node[id="${CSS.escape(t)}"]`),n=this.renderRoot.querySelector(".flow-viewport");if(!i||!n)return null;const s=i.getBoundingClientRect(),r=n.getBoundingClientRect(),o=this.viewport.zoom||1,a=(s.left-r.left-this.viewport.x)/o,h=(s.top-r.top-this.viewport.y)/o,d=s.width/o,l=s.height/o,c=h+l/2;return{left:{x:a,y:c},right:{x:a+d,y:c}}}getHandleCanvasPosition(t,i){const n=this.renderRoot.querySelector(`[id="${CSS.escape(t)}"]`);if(!n)return null;let s=null;const r=n.shadowRoot;if(r&&(s=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),s||(s=n.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),!s)return null;const o=this.nodes.find(p=>p.id===t);if(!o)return null;if(o.type==="shape")return console.log("getHandleCanvasPosition for shape node:",{nodeId:t,handleId:i,node:o}),this.getShapeHandlePosition(o,i);const a=n.getBoundingClientRect(),h=s.getBoundingClientRect(),d=this.viewport.zoom||1,l=(h.left+h.width/2-a.left)/d,c=(h.top+h.height/2-a.top)/d;return{x:o.position.x+l,y:o.position.y+c}}getShapeHandlePosition(t,i){const n=t.data;if(!n)return null;const s=n.size||{width:200,height:200},r=s.width,o=s.height,a=i.split("-"),h=a[a.length-1];console.log("getShapeHandlePosition:",{handleId:i,parts:a,handleType:h,node:t.id,size:s});let d=0,l=0;switch(h){case"right":d=r,l=o/2;break;case"left":d=0,l=o/2;break;case"top":d=r/2,l=0;break;case"bottom":d=r/2,l=o;break;default:d=r/2,l=o/2}const c={x:t.position.x+d,y:t.position.y+l};return console.log("getShapeHandlePosition result:",{nodeId:t.id,position:t.position,offsetX:d,offsetY:l,result:c}),c}setNodes(t){this.instance.setNodes(t)}setEdges(t){this.instance.setEdges(t)}determineBestTargetHandle(t,i){const n=this.nodes.find(N=>N.id===t),s=this.nodes.find(N=>N.id===i);if(!n||!s)return`${i}-target-left`;const r=n.position.x,o=n.position.y,a=s.position.x,h=s.position.y,d=s.data,l=d?.size?.width||200,c=d?.size?.height||200,p=r+(n.width||150)/2,g=o+(n.height||50)/2,y=a+l/2,_=h+c/2,k=y-p,b=_-g;return Math.abs(k)>Math.abs(b)?k>0?`${i}-target-left`:`${i}-target-right`:b>0?`${i}-target-top`:`${i}-target-bottom`}computeLabelCanvasPosition(t){const i=this.nodes.find(l=>l.id===t.source),n=this.nodes.find(l=>l.id===t.target);if(!i||!n)return null;let s,r,o,a;if(t.sourceHandle){const l=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(l)s=l.x,r=l.y;else{const c=i.measured?.width||i.width||150,p=i.measured?.height||i.height||50;s=i.position.x+c,r=i.position.y+p/2}}else{const l=i.measured?.width||i.width||150,c=i.measured?.height||i.height||50;s=i.position.x+l,r=i.position.y+c/2}if(t.targetHandle){const l=this.getHandleCanvasPosition(t.target,t.targetHandle);if(l)o=l.x,a=l.y;else{o=n.position.x;const c=n.measured?.height||n.height||50;a=n.position.y+c/2}}else{o=n.position.x;const l=n.measured?.height||n.height||50;a=n.position.y+l/2}const[,h,d]=Ne({sourceX:s,sourceY:r,sourcePosition:u.Position.Right,targetX:o,targetY:a,targetPosition:u.Position.Left});return{x:h,y:d}}computeStartLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.source);if(!i)return null;let n,s;if(t.sourceHandle){const r=this.getHandleCanvasPosition(t.source,t.sourceHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.width||i.width||150,a=i.measured?.height||i.height||50;n=i.position.x+o,s=i.position.y+a/2}}else{const r=i.measured?.width||i.width||150,o=i.measured?.height||i.height||50;n=i.position.x+r,s=i.position.y+o/2}return{x:n+12,y:s-10}}computeEndLabelCanvasPosition(t){const i=this.nodes.find(r=>r.id===t.target);if(!i)return null;let n,s;if(t.targetHandle){const r=this.getHandleCanvasPosition(t.target,t.targetHandle);if(r)n=r.x,s=r.y;else{const o=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+o/2}}else{const r=i.measured?.height||i.height||50;n=i.position.x,s=i.position.y+r/2}return{x:n-12,y:s-10}}firstUpdated(){const t=this.renderRoot.querySelector(".flow-container");t&&(this.instance.mount(t),this.unsubscribe=this.instance.subscribe(i=>{this.nodes=i.nodes,this.edges=i.edges,this.viewport=i.viewport,this.requestUpdate()}),t.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("node-select",this.onNodeSelect),document.addEventListener("edge-select",this.onEdgeSelect))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.(),this.instance.destroy();const t=this.renderRoot.querySelector(".flow-container");t?.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),t?.removeEventListener("node-select",this.onNodeSelect),document.removeEventListener("edge-select",this.onEdgeSelect)}renderNode(t){const i=t.type||"default",n=this.nodeTypes[i]||"flow-node",s=Ga(n);return J`
      <${s}
        .id=${t.id}
        .data=${t.data}
        .position=${t.position}
        .selected=${t.selected||!1}
        .draggable=${t.draggable!==!1}
        .connectable=${t.connectable!==!1}
        .resizable=${t.resizable||!1}
        .drag_handle_selector=${t.drag_handle_selector||null}
        .instance=${this.instance}
        @handle-start=${this.onHandleStart}
      ></${s}>
    `}render(){const t=`translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;return J`
      <div class="flow-container">
        <slot name="background"></slot>
        <div 
          class="flow-viewport" 
          style=${sh({transform:t})}
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
  `,jt([v({type:Array})],u.FlowCanvas.prototype,"nodes",2),jt([v({type:Array})],u.FlowCanvas.prototype,"edges",2),jt([v({type:Object})],u.FlowCanvas.prototype,"viewport",2),jt([v({type:Object})],u.FlowCanvas.prototype,"nodeTypes",2),u.FlowCanvas=jt([X("flow-canvas")],u.FlowCanvas);var dh=Object.defineProperty,ch=Object.getOwnPropertyDescriptor,zt=(e,t,i,n)=>{for(var s=n>1?void 0:n?ch(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&dh(t,i,s),s};u.NodeResizer=class extends O{constructor(){super(...arguments),this.visible=!1,this.minWidth=10,this.minHeight=10,this.maxWidth=Number.MAX_VALUE,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.handleMouseDown=t=>{const i=t.target;console.log("NodeResizer handleMouseDown:",i,i.classList);let n=i.classList.contains("resize-handle");if(!n&&i===this&&(n=t.composedPath().some(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))),console.log("Is resize handle:",n),!n)return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.isResizing=!0;const s=this.getRootNode().host;this.resizeStart={x:t.clientX,y:t.clientY,width:s?.offsetWidth||0,height:s?.offsetHeight||0};let r=null;if(i.classList.contains("resize-handle")?r=i:i===this&&(r=t.composedPath().find(a=>a instanceof HTMLElement&&a.classList.contains("resize-handle"))||null),r){const o=Array.from(r.classList);this.resizeHandle=o.find(a=>a!=="resize-handle")||"",console.log("Resize handle direction:",this.resizeHandle)}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),console.log({width:this.resizeStart.width,height:this.resizeStart.height}),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleMouseMove=t=>{if(!this.isResizing)return;const i=this.getRootNode().host;if(!i)return;console.log("NodeResizer handleMouseMove:",t);const n=t.clientX-this.resizeStart.x,s=t.clientY-this.resizeStart.y;let r=this.resizeStart.width,o=this.resizeStart.height;switch(this.resizeHandle){case"nw":r=this.resizeStart.width-n,o=this.resizeStart.height-s;break;case"ne":r=this.resizeStart.width+n,o=this.resizeStart.height-s;break;case"sw":r=this.resizeStart.width-n,o=this.resizeStart.height+s;break;case"se":r=this.resizeStart.width+n,o=this.resizeStart.height+s;break;case"n":o=this.resizeStart.height-s;break;case"s":o=this.resizeStart.height+s;break;case"w":r=this.resizeStart.width-n;break;case"e":r=this.resizeStart.width+n;break}if(r=Math.max(this.minWidth,Math.min(this.maxWidth,r)),o=Math.max(this.minHeight,Math.min(this.maxHeight,o)),this.keepAspectRatio){const a=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?o=r/a:r=o*a}i.style.width=`${r}px`,i.style.height=`${o}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:r,height:o,handle:this.resizeHandle},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{if(!this.isResizing)return;this.isResizing=!1,this.cleanup();const t=this.getRootNode().host;this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:t?.offsetWidth||0,height:t?.offsetHeight||0},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return this.visible?C`
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
  `,zt([v({type:Boolean,reflect:!0})],u.NodeResizer.prototype,"visible",2),zt([v({type:Number})],u.NodeResizer.prototype,"minWidth",2),zt([v({type:Number})],u.NodeResizer.prototype,"minHeight",2),zt([v({type:Number})],u.NodeResizer.prototype,"maxWidth",2),zt([v({type:Number})],u.NodeResizer.prototype,"maxHeight",2),zt([v({type:Boolean})],u.NodeResizer.prototype,"keepAspectRatio",2),u.NodeResizer=zt([X("node-resizer")],u.NodeResizer);var uh=Object.defineProperty,fh=Object.getOwnPropertyDescriptor,ct=(e,t,i,n)=>{for(var s=n>1?void 0:n?fh(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&uh(t,i,s),s};u.FlowNode=class extends O{constructor(){super(...arguments),this.id="",this.data={},this.position={x:0,y:0},this.selected=!1,this.dragging=!1,this.draggable=!0,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.lastMeasured=null,this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}})},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;this.instance&&this.instance.updateNode(this.id,{width:i,height:n,measured:{width:i,height:n}}),this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.dragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1},50)}}firstUpdated(){this.draggable&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),this.resizable&&(this.addEventListener("resize",this.handleResize),this.addEventListener("resize-end",this.handleResizeEnd)),this.updateMeasuredSize()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),this.resizable&&(this.removeEventListener("resize",this.handleResize),this.removeEventListener("resize-end",this.handleResizeEnd)),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}render(){return C`
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
  `,ct([v({type:String,reflect:!0})],u.FlowNode.prototype,"id",2),ct([v({type:Object})],u.FlowNode.prototype,"data",2),ct([v({type:Object})],u.FlowNode.prototype,"position",2),ct([v({type:Boolean,reflect:!0})],u.FlowNode.prototype,"selected",2),ct([v({type:Boolean,reflect:!0})],u.FlowNode.prototype,"dragging",2),ct([v({type:Boolean})],u.FlowNode.prototype,"draggable",2),ct([v({type:Object})],u.FlowNode.prototype,"instance",2),ct([v({type:Boolean})],u.FlowNode.prototype,"resizable",2),u.FlowNode=ct([X("flow-node")],u.FlowNode);var ph=Object.defineProperty,gh=Object.getOwnPropertyDescriptor,Y=(e,t,i,n)=>{for(var s=n>1?void 0:n?gh(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&ph(t,i,s),s};u.FlowEdge=class extends O{constructor(){super(...arguments),this.id="",this.source="",this.target="",this.animated=!1,this.selected=!1,this.label="",this.type="default",this.markerHandleHalf=5}getMarkerId(t){if(!t)return;if(typeof t=="string")return t;const i=this.normalizeMarkerSpec(t);return`marker-${this.hashString(i)}`}createMarkerSVG(t,i){if(i.type==="custom"){const l=i.width??10,c=i.height??10,p=(i.refX??l)+this.markerHandleHalf,g=i.refY??c/2,y=i.color??"currentColor",_=i.orient??"auto";return`<marker id="${t}" markerWidth="${l}" markerHeight="${c}" refX="${p}" refY="${g}" orient="${_}" markerUnits="userSpaceOnUse"><path d="${i.path}" fill="${y}" stroke="${y}"/></marker>`}const n=i.width??10,s=i.height??10,r=i.orient??"auto",o=i.color??"currentColor",a=(i.type==="ArrowClosed",n+this.markerHandleHalf),h=s/2;if(i.type==="ArrowClosed"){const l=`M0,0 L${n},${h} L0,${s} Z`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${h}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${l}" fill="${o}"/></marker>`}const d=`M0,0 L${n},${h} L0,${s}`;return`<marker id="${t}" markerWidth="${n}" markerHeight="${s}" refX="${a}" refY="${h}" orient="${r}" markerUnits="userSpaceOnUse"><path d="${d}" fill="none" stroke="${o}" stroke-width="2"/></marker>`}normalizeMarkerSpec(t){if(t.type==="custom"){const{path:o,width:a=20,height:h=20,refX:d=20,refY:l=10,orient:c="auto",color:p="currentColor"}=t;return`custom|p=${o}|w=${a}|h=${h}|rx=${d}|ry=${l}|o=${c}|c=${p}`}const{width:i=20,height:n=20,orient:s="auto",color:r="currentColor"}=t;return`builtin|${t.type}|w=${i}|h=${n}|o=${s}|c=${r}`}hashString(t){let i=0;for(let n=0;n<t.length;n++)i=(i<<5)-i+t.charCodeAt(n),i|=0;return Math.abs(i).toString(36)}getPathForType(t,i){const n=t.x,s=t.y,r=i.x,o=i.y,a=t.position,h=i.position;switch(this.type){case"straight":return An({sourceX:n,sourceY:s,targetX:r,targetY:o});case"smoothstep":return si({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:h});case"step":return si({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:h,borderRadius:0});case"simplebezier":return Ne({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:h,curvature:.5});case"default":default:return Ne({sourceX:n,sourceY:s,sourcePosition:a,targetX:r,targetY:o,targetPosition:h})}}getFlowCanvasRoot(){const t=this.getRootNode();return t instanceof ShadowRoot?t:null}getFlowCanvasHost(){const t=this.getFlowCanvasRoot();return t&&t.host||null}findHandleElement(t,i){const n=this.getFlowCanvasRoot();if(!n)return null;const s=n.querySelector(`[id="${CSS.escape(t)}"]`);if(!s)return null;const r=s.shadowRoot;let o=null;return r&&(o=r.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o||(o=s.querySelector(`[data-handle-id="${CSS.escape(i)}"]`)),o}getHandlePosition(t,i){const n=this.findHandleElement(t,i);if(!n)return null;const s=this.getFlowCanvasRoot();if(!s)return null;const r=s.querySelector(`[id="${CSS.escape(t)}"]`);if(!r)return null;const o=r.getBoundingClientRect(),a=n.getBoundingClientRect(),h=this.sourceNode?.id===t?this.sourceNode:this.targetNode;if(!h)return null;h.measured?.width||h.width,h.measured?.height||h.height;const c=(this.getFlowCanvasHost()?.viewport||{zoom:1}).zoom||1,p=(a.left+a.width/2-o.left)/c,g=(a.top+a.height/2-o.top)/c;return{x:h.position.x+p,y:h.position.y+g}}getSourcePosition(){if(this.sourceHandle&&this.sourceNode){const n=this.getHandlePosition(this.sourceNode.id,this.sourceHandle);if(n)return{...n,position:u.Position.Right}}const t=this.sourceNode.measured?.width||this.sourceNode.width||150,i=this.sourceNode.measured?.height||this.sourceNode.height||50;return{x:this.sourceNode.position.x+t,y:this.sourceNode.position.y+i/2,position:u.Position.Right}}getTargetPosition(){if(this.targetHandle&&this.targetNode){const i=this.getHandlePosition(this.targetNode.id,this.targetHandle);if(i)return{...i,position:u.Position.Left}}const t=this.targetNode.measured?.height||this.targetNode.height||50;return{x:this.targetNode.position.x,y:this.targetNode.position.y+t/2,position:u.Position.Left}}render(){if(!this.sourceNode||!this.targetNode)return C``;const t=this.getSourcePosition(),i=this.getTargetPosition(),[n,s,r,o,a]=this.getPathForType(t,i),h=["edge-path",this.animated&&"animated",this.selected&&"selected"].filter(Boolean).join(" "),d=this.getMarkerId(this.markerStart),l=this.getMarkerId(this.markerEnd),c=d?`url(#${d})`:void 0,p=l?`url(#${l})`:void 0,g=this.animated?"5":"";return C`
      <svg style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible">
        <defs>
          ${d&&typeof this.markerStart=="object"?G`<marker id="${d}" markerWidth="${this.markerStart.width||10}" markerHeight="${this.markerStart.height||10}" refX="${((this.markerStart.type==="custom"?this.markerStart.refX:void 0)||this.markerStart.width||10)+this.markerHandleHalf}" refY="${(this.markerStart.type==="custom"?this.markerStart.refY:void 0)||(this.markerStart.height||10)/2}" orient="${this.markerStart.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerStart.type==="custom"?G`<path d="${this.markerStart.path}" fill="${this.markerStart.color||"currentColor"}" stroke="${this.markerStart.color||"currentColor"}"/>`:this.markerStart.type==="ArrowClosed"?G`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10} Z" fill="${this.markerStart.color||"currentColor"}"/>`:G`<path d="M0,0 L${this.markerStart.width||10},${(this.markerStart.height||10)/2} L0,${this.markerStart.height||10}" fill="none" stroke="${this.markerStart.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
          ${l&&typeof this.markerEnd=="object"?G`<marker id="${l}" markerWidth="${this.markerEnd.width||10}" markerHeight="${this.markerEnd.height||10}" refX="${((this.markerEnd.type==="custom"?this.markerEnd.refX:void 0)||this.markerEnd.width||10)+this.markerHandleHalf}" refY="${(this.markerEnd.type==="custom"?this.markerEnd.refY:void 0)||(this.markerEnd.height||10)/2}" orient="${this.markerEnd.orient||"auto"}" markerUnits="userSpaceOnUse">
              ${this.markerEnd.type==="custom"?G`<path d="${this.markerEnd.path}" fill="${this.markerEnd.color||"currentColor"}" stroke="${this.markerEnd.color||"currentColor"}"/>`:this.markerEnd.type==="ArrowClosed"?G`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10} Z" fill="${this.markerEnd.color||"currentColor"}"/>`:G`<path d="M0,0 L${this.markerEnd.width||10},${(this.markerEnd.height||10)/2} L0,${this.markerEnd.height||10}" fill="none" stroke="${this.markerEnd.color||"currentColor"}" stroke-width="2"/>`}
            </marker>`:""}
        </defs>
        ${G`
          <path 
            class="${h}"
            d="${n}"
            stroke-dasharray="${g}"
            marker-start="${c??""}"
            marker-end="${p??""}"
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
  `,Y([v({type:String})],u.FlowEdge.prototype,"id",2),Y([v({type:String})],u.FlowEdge.prototype,"source",2),Y([v({type:String})],u.FlowEdge.prototype,"target",2),Y([v({type:String})],u.FlowEdge.prototype,"sourceHandle",2),Y([v({type:String})],u.FlowEdge.prototype,"targetHandle",2),Y([v({type:Object})],u.FlowEdge.prototype,"sourceNode",2),Y([v({type:Object})],u.FlowEdge.prototype,"targetNode",2),Y([v({type:Boolean})],u.FlowEdge.prototype,"animated",2),Y([v({type:Boolean})],u.FlowEdge.prototype,"selected",2),Y([v({type:String})],u.FlowEdge.prototype,"label",2),Y([v({type:String})],u.FlowEdge.prototype,"type",2),Y([v({type:Object})],u.FlowEdge.prototype,"markerStart",2),Y([v({type:Object})],u.FlowEdge.prototype,"markerEnd",2),u.FlowEdge=Y([X("flow-edge")],u.FlowEdge);var mh=Object.defineProperty,yh=Object.getOwnPropertyDescriptor,Gt=(e,t,i,n)=>{for(var s=n>1?void 0:n?yh(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&mh(t,i,s),s};u.FlowBackground=class extends O{constructor(){super(...arguments),this.variant="dots",this.gap=20,this.color="#ddd",this.size=1}render(){const t=`flow-bg-pattern-${Math.random().toString(36).substr(2,9)}`;return C`
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
  `,Gt([v({type:String})],u.FlowBackground.prototype,"variant",2),Gt([v({type:Number})],u.FlowBackground.prototype,"gap",2),Gt([v({type:String})],u.FlowBackground.prototype,"color",2),Gt([v({type:Number})],u.FlowBackground.prototype,"size",2),u.FlowBackground=Gt([X("flow-background")],u.FlowBackground);var wh=Object.defineProperty,vh=Object.getOwnPropertyDescriptor,ri=(e,t,i,n)=>{for(var s=n>1?void 0:n?vh(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&wh(t,i,s),s};u.FlowMinimap=class extends O{constructor(){super(...arguments),this.width=200,this.height=150}render(){return C`
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
  `,ri([v({type:Number})],u.FlowMinimap.prototype,"width",2),ri([v({type:Number})],u.FlowMinimap.prototype,"height",2),u.FlowMinimap=ri([X("flow-minimap")],u.FlowMinimap);var bh=Object.defineProperty,xh=Object.getOwnPropertyDescriptor,Rn=(e,t,i,n)=>{for(var s=n>1?void 0:n?xh(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&bh(t,i,s),s};u.FlowControls=class extends O{constructor(){super(...arguments),this.handleZoomIn=()=>{this.instance?.zoomIn()},this.handleZoomOut=()=>{this.instance?.zoomOut()},this.handleFitView=()=>{this.instance?.fitView()}}render(){return C`
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
  `,Rn([v({type:Object})],u.FlowControls.prototype,"instance",2),u.FlowControls=Rn([X("flow-controls")],u.FlowControls);var _h=Object.getOwnPropertyDescriptor,$h=Object.getPrototypeOf,zh=Reflect.get,Sh=(e,t,i,n)=>{for(var s=n>1?void 0:n?_h(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s},oi=(e,t,i)=>zh($h(e),i,t);u.ERDTableNode=class extends u.FlowNode{constructor(){super(...arguments),this.appliedInitialSize=!1}firstUpdated(){const t=this.data,i=t?.size?.width,n=t?.size?.height;(typeof i=="number"&&i>0||typeof n=="number"&&n>0)&&(typeof i=="number"&&i>0&&(this.style.width=`${i}px`),typeof n=="number"&&n>0&&(this.style.height=`${n}px`),this.instance&&this.instance.updateNode(this.id,{width:typeof i=="number"&&i>0?i:this.width,height:typeof n=="number"&&n>0?n:this.height}),this.appliedInitialSize=!0),super.firstUpdated()}updated(t){super.updated(t)}onFieldHandleMouseDown(t,i){return n=>{n.stopPropagation(),n.preventDefault();const s=`${this.id}-${t}-${i}`;this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,type:i==="left"?"target":"source",handleId:s,fieldName:t},bubbles:!0,composed:!0}))}}render(){const t=this.data,i=t?.tableName||"Table",n=t?.fields||[];return C`
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
    `],u.ERDTableNode=Sh([X("erd-table-node")],u.ERDTableNode);const Eh=[{type:"circle",name:"Circle",category:"basic",path:"M 100 100 m -95 0 a 95 95 0 1 1 190 0 a 95 95 0 1 1 -190 0",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"rectangle",name:"Rectangle",category:"basic",path:"M 5 5 L 195 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"diamond",name:"Diamond",category:"basic",path:"M 100 5 L 195 100 L 100 195 L 5 100 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"triangle",name:"Triangle",category:"basic",path:"M 100 5 L 195 195 L 5 195 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],kh=[{type:"hexagon",name:"Hexagon",category:"geometric",path:"M 100 5 L 175 52 L 175 148 L 100 195 L 25 148 L 25 52 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}},{type:"octagon",name:"Octagon",category:"geometric",path:"M 100 5 L 175 25 L 195 100 L 175 175 L 100 195 L 25 175 L 5 100 L 25 25 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],Nh=[{type:"heart",name:"Heart",category:"symbolic",path:"M 100 185 C 100 185, 10 95, 10 50 C 10 25, 35 5, 60 5 C 80 5, 100 25, 100 50 C 100 25, 120 5, 140 5 C 165 5, 190 25, 190 50 C 190 95, 100 185, 100 185 Z",viewBox:"0 0 200 200",defaultSize:{width:200,height:200},centerPoint:{x:100,y:100}}],ai=class ai{static initialize(){[...Eh,...kh,...Nh].forEach(i=>{this.shapes.set(i.type,i)})}static register(t){this.shapes.set(t.type,t)}static get(t){return this.shapes.get(t)}static getAll(){return Array.from(this.shapes.values())}static getByCategory(t){return Array.from(this.shapes.values()).filter(i=>i.category===t)}static has(t){return this.shapes.has(t)}static getShapeTypes(){return Array.from(this.shapes.keys())}static clear(){this.shapes.clear()}static getCount(){return this.shapes.size}};ai.shapes=new Map;let Kt=ai;Kt.initialize();var Ch=Object.defineProperty,Mh=Object.getOwnPropertyDescriptor,ot=(e,t,i,n)=>{for(var s=n>1?void 0:n?Mh(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(n?o(t,i,s):o(s))||s);return n&&s&&Ch(t,i,s),s};u.ShapeNode=class extends O{constructor(){super(...arguments),this.id="",this.selected=!1,this.dragging=!1,this.draggable=!0,this.connectable=!0,this.instance=null,this.resizable=!1,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.handleClick=t=>{if(t.stopPropagation(),!this.isDragging&&this.instance){const i=!this.selected;this.instance.updateNode(this.id,{selected:i}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:i,node:{id:this.id,data:this.data,position:this.position,selected:i}},bubbles:!0,composed:!0}))}},this.handleResize=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}},this.handleResizeEnd=t=>{const{width:i,height:n}=t.detail;if(this.data&&this.instance){const s={...this.data,size:{width:i,height:n}};this.instance.updateNode(this.id,{data:s,width:i,height:n,measured:{width:i,height:n}})}this.dispatchEvent(new CustomEvent("node-resize-end",{detail:{nodeId:this.id,width:i,height:n},bubbles:!0,composed:!0}))},this.handleMouseDown=t=>{if(!this.draggable||t.button!==0)return;const i=t.target;i.classList.contains("resize-handle")||i.tagName==="NODE-RESIZER"||i.closest("node-resizer")!==null||(t.preventDefault(),t.stopPropagation(),this.isDragging=!1,this.dragStart={x:t.clientX,y:t.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=t=>{const i=t.clientX-this.dragStart.x,n=t.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(i)>3||Math.abs(n)>3)&&(this.isDragging=!0,this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const s=this.instance.getViewport(),r={x:this.nodeStart.x+i/s.zoom,y:this.nodeStart.y+n/s.zoom};this.instance.updateNode(this.id,{position:r})}},this.handleMouseUp=()=>{console.log("handleMouseUp"),this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.isDragging=!1,this.cleanup()},this.handleHandleStart=t=>{console.log("handleHandleStart",t),t.stopPropagation(),this.isDragging=!1;const i=t.target,n=i.dataset.handleId,s=i.dataset.handleType;s&&n&&this.dispatchEvent(new CustomEvent("handle-start",{detail:{nodeId:this.id,handleId:n,handleType:s,position:this.position},bubbles:!0,composed:!0}))}}updated(t){super.updated(t),t.has("position")&&this.isDragging,t.has("resizable")&&console.log("ShapeNode resizable changed:",this.resizable)}getShapeDefinition(){if(this.data?.type)return Kt.get(this.data.type)}renderShape(){const t=this.getShapeDefinition();if(!t)return C`
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
  `,ot([v({type:String,reflect:!0})],u.ShapeNode.prototype,"id",2),ot([v({type:Object})],u.ShapeNode.prototype,"data",2),ot([v({type:Object,hasChanged:(e,t)=>!t||e.x!==t.x||e.y!==t.y})],u.ShapeNode.prototype,"position",2),ot([v({type:Boolean,reflect:!0})],u.ShapeNode.prototype,"selected",2),ot([v({type:Boolean,reflect:!0})],u.ShapeNode.prototype,"dragging",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"draggable",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"connectable",2),ot([v({type:Object})],u.ShapeNode.prototype,"instance",2),ot([v({type:Boolean})],u.ShapeNode.prototype,"resizable",2),u.ShapeNode=ot([X("shape-node")],u.ShapeNode);var Hh=Object.getOwnPropertyDescriptor,Qt=(e,t,i,n)=>{for(var s=n>1?void 0:n?Hh(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(s)||s);return s};u.BaseNode=class extends O{render(){return C`<slot></slot>`}},u.BaseNode.styles=F`
    :host {
      display: block;
      border: 1px solid var(--flow-node-border, #e5e7eb);
      border-radius: 8px;
      background: var(--flow-node-background, #ffffff);
      color: var(--flow-node-foreground, #111827);
      overflow: hidden;
    }
  `,u.BaseNode=Qt([X("base-node")],u.BaseNode),u.BaseNodeHeader=class extends O{render(){return C`<slot></slot>`}},u.BaseNodeHeader.styles=F`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-header-bg, #f9fafb);
      border-bottom: 1px solid var(--flow-node-border, #e5e7eb);
      font-weight: 600;
    }
  `,u.BaseNodeHeader=Qt([X("base-node-header")],u.BaseNodeHeader),u.BaseNodeHeaderTitle=class extends O{render(){return C`<span class="title"><slot></slot></span>`}},u.BaseNodeHeaderTitle.styles=F`
    :host { display: contents; }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--base-node-title, #111827);
    }
  `,u.BaseNodeHeaderTitle=Qt([X("base-node-header-title")],u.BaseNodeHeaderTitle),u.BaseNodeContent=class extends O{render(){return C`<slot></slot>`}},u.BaseNodeContent.styles=F`
    :host {
      display: block;
      padding: 12px;
    }
  `,u.BaseNodeContent=Qt([X("base-node-content")],u.BaseNodeContent),u.BaseNodeFooter=class extends O{render(){return C`<slot></slot>`}},u.BaseNodeFooter.styles=F`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: var(--base-node-footer-bg, #fafafa);
      border-top: 1px solid var(--flow-node-border, #e5e7eb);
    }
  `,u.BaseNodeFooter=Qt([X("base-node-footer")],u.BaseNodeFooter);var Ah=Object.defineProperty,I=(e,t,i,n)=>{for(var s=void 0,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=o(t,i,s)||s);return s&&Ah(t,i,s),s};const Rh=e=>{class t extends e{constructor(){super(...arguments),this.id="",this.position={x:0,y:0},this.data={},this.selected=!1,this.dragging=!1,this.instance=null,this.resizable=!1,this.draggable=!0,this.drag_handle_selector=null,this.connectable=!0,this.minWidth=10,this.maxWidth=Number.MAX_VALUE,this.minHeight=10,this.maxHeight=Number.MAX_VALUE,this.keepAspectRatio=!1,this.maxInitialHeight=0,this.isDragging=!1,this.dragStart={x:0,y:0},this.nodeStart={x:0,y:0},this.isResizing=!1,this.resizeStart={x:0,y:0,width:0,height:0},this.resizeHandle="",this.dragHandleElement=null,this.handleClick=n=>{if(n.stopPropagation(),!this.isDragging){const s=!this.selected;this.selected=s,this.instance&&this.instance.updateNode(this.id,{selected:s}),this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:this.id,selected:s,node:{id:this.id,data:this.data,position:this.position,selected:s}},bubbles:!0,composed:!0}))}},this.handleMouseDown=n=>{if(n.button!==0)return;const s=n.target;if(s.classList.contains("resize-handle")||s.closest(".resize-handle")!==null){this.handleResizeStart(n);return}this.draggable&&(n.preventDefault(),n.stopPropagation(),this.isDragging=!1,this.dragStart={x:n.clientX,y:n.clientY},this.nodeStart={...this.position},document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))},this.handleMouseMove=n=>{if(this.isResizing){this.handleResizeMove(n);return}const s=n.clientX-this.dragStart.x,r=n.clientY-this.dragStart.y;if(!this.isDragging&&(Math.abs(s)>3||Math.abs(r)>3)&&(this.isDragging=!0,this.dragging=!0,this.dragHandleElement&&(this.dragHandleElement.style.cursor="grabbing"),this.instance&&this.instance.updateNode(this.id,{dragging:!0})),this.isDragging&&this.instance){const o=this.instance.getViewport(),a={x:this.nodeStart.x+s/o.zoom,y:this.nodeStart.y+r/o.zoom};this.instance.updateNode(this.id,{position:a})}},this.handleMouseUp=()=>{this.isDragging&&this.instance&&this.instance.updateNode(this.id,{dragging:!1}),this.dragHandleElement&&this.isDragging&&(this.dragHandleElement.style.cursor="grab"),this.isResizing&&this.handleResizeEnd(),this.cleanup(),setTimeout(()=>{this.isDragging=!1,this.dragging=!1,this.isResizing=!1},50)},this.handleResizeStart=(n,s)=>{n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),this.isResizing=!0;const r=this.getBoundingClientRect(),o=getComputedStyle(this);let a=parseFloat(o.width),h=parseFloat(o.height);if((!a||a===0)&&(a=r.width),(!h||h===0)&&(h=r.height),this.resizeStart={x:n.clientX,y:n.clientY,width:a,height:h},s)this.resizeHandle=s;else{let d=n.target;if(!d.classList.contains("resize-handle")){const c=d.closest(".resize-handle");c&&(d=c)}const l=Array.from(d.classList);this.resizeHandle=l.find(c=>c!=="resize-handle")||""}document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:this.resizeStart.width,height:this.resizeStart.height},bubbles:!0,composed:!0}))},this.handleResizeMove=n=>{if(!this.isResizing)return;const s=n.clientX-this.resizeStart.x,r=n.clientY-this.resizeStart.y;let o=this.resizeStart.width,a=this.resizeStart.height;switch(this.resizeHandle){case"nw":o=this.resizeStart.width-s,a=this.resizeStart.height-r;break;case"ne":o=this.resizeStart.width+s,a=this.resizeStart.height-r;break;case"sw":o=this.resizeStart.width-s,a=this.resizeStart.height+r;break;case"se":o=this.resizeStart.width+s,a=this.resizeStart.height+r;break;case"n":a=this.resizeStart.height-r;break;case"s":a=this.resizeStart.height+r;break;case"w":o=this.resizeStart.width-s;break;case"e":o=this.resizeStart.width+s;break}if(o=Math.max(this.minWidth,Math.min(this.maxWidth,o)),a=Math.max(this.minHeight,Math.min(this.maxHeight,a)),this.keepAspectRatio){const h=this.resizeStart.width/this.resizeStart.height;this.resizeHandle.includes("w")||this.resizeHandle.includes("e")?a=o/h:o=a*h}this.style.width=`${o}px`,this.style.height=`${a}px`,this.dispatchEvent(new CustomEvent("resize",{detail:{width:o,height:a,handle:this.resizeHandle},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:o,height:a,measured:{width:o,height:a}})},this.handleResizeEnd=()=>{this.isResizing&&(this.isResizing=!1,this.dispatchEvent(new CustomEvent("resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight},bubbles:!0,composed:!0})),this.instance&&this.instance.updateNode(this.id,{width:this.offsetWidth,height:this.offsetHeight,measured:{width:this.offsetWidth,height:this.offsetHeight}}))},this.handleGlobalClick=n=>{n.target.closest(this.tagName.toLowerCase())!==null||this.selected&&(this.selected=!1,this.instance&&this.instance.updateNode(this.id,{selected:!1}),this.dispatchEvent(new CustomEvent("node-deselect",{detail:{nodeId:this.id,selected:!1,node:{id:this.id,data:this.data,position:this.position,selected:!1}},bubbles:!0,composed:!0})))},this.handleResizeHandleClick=n=>s=>{s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.handleResizeStart(s,n)}}static get styles(){return[F`
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
      `]}connectedCallback(){super.connectedCallback(),this.draggable&&!this.drag_handle_selector&&this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("click",this.handleClick),document.addEventListener("click",this.handleGlobalClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("click",this.handleClick),document.removeEventListener("click",this.handleGlobalClick),this.removeDragHandleListener(),this.cleanup()}cleanup(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}renderResizer(){return!this.resizable||!this.selected?C``:C`
        <div class="resize-border"></div>
        <div class="resize-handle nw" @mousedown=${this.handleResizeHandleClick("nw")}></div>
        <div class="resize-handle ne" @mousedown=${this.handleResizeHandleClick("ne")}></div>
        <div class="resize-handle sw" @mousedown=${this.handleResizeHandleClick("sw")}></div>
        <div class="resize-handle se" @mousedown=${this.handleResizeHandleClick("se")}></div>
        <div class="resize-handle n" @mousedown=${this.handleResizeHandleClick("n")}></div>
        <div class="resize-handle s" @mousedown=${this.handleResizeHandleClick("s")}></div>
        <div class="resize-handle w" @mousedown=${this.handleResizeHandleClick("w")}></div>
        <div class="resize-handle e" @mousedown=${this.handleResizeHandleClick("e")}></div>
      `}getResizer(){return this.renderResizer()}firstUpdated(){this.appendResizerToDOM(),this.drag_handle_selector&&this.setAttribute("data-drag-handle-selector",""),Promise.resolve().then(()=>{this.attachDragHandleListener(),this.adjustHeightToContent()})}updated(n){super.updated(n),this.style.transform=`translate(${this.position.x}px, ${this.position.y}px)`,n.has("maxInitialHeight")&&!this.isResizing&&Promise.resolve().then(()=>{this.adjustHeightToContent()}),(n.has("resizable")||n.has("selected"))&&this.appendResizerToDOM(),(n.has("drag_handle_selector")||n.has("draggable"))&&Promise.resolve().then(()=>{this.attachDragHandleListener()}),n.has("drag_handle_selector")&&(this.drag_handle_selector?this.setAttribute("data-drag-handle-selector",""):this.removeAttribute("data-drag-handle-selector"))}appendResizerToDOM(){if(this.removeExistingResizer(),this.resizable&&this.selected){const n=this.renderResizer();if(n){const s=document.createElement("div");s.className="mixin-resizer-container",s.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10;
          `,this.shadowRoot?.appendChild(s),Nn(n,s)}}}removeExistingResizer(){const n=this.shadowRoot?.querySelector(".mixin-resizer-container");n&&n.remove()}attachDragHandleListener(){if(this.removeDragHandleListener(),!this.draggable||!this.drag_handle_selector)return;const n=this.shadowRoot;if(!n){setTimeout(()=>this.attachDragHandleListener(),0);return}const s=n.querySelector(this.drag_handle_selector);s&&(this.dragHandleElement=s,s.addEventListener("mousedown",this.handleMouseDown),s.style.cursor="grab")}removeDragHandleListener(){this.dragHandleElement&&(this.dragHandleElement.removeEventListener("mousedown",this.handleMouseDown),this.dragHandleElement.style.cursor="",this.dragHandleElement=null)}adjustHeightToContent(){if(this.maxInitialHeight<=0||!this.instance||!this.id||this.isResizing)return;const n=this.style.height;this.style.height="auto",this.offsetHeight;const s=this.scrollHeight||this.getBoundingClientRect().height;s>this.maxInitialHeight?(this.style.height=`${this.maxInitialHeight}px`,this.instance.updateNode(this.id,{height:this.maxInitialHeight,measured:{width:this.offsetWidth||this.getBoundingClientRect().width,height:this.maxInitialHeight}})):(n?this.style.height=n:this.style.height="",s>0&&this.instance.updateNode(this.id,{height:s,measured:{width:this.offsetWidth||this.getBoundingClientRect().width,height:s}}))}async notifyHandlesUpdated(n){const{handleIds:s,updateDimensions:r=!0}=n||{};if(await this.updateComplete,await new Promise(o=>setTimeout(o,0)),this.instance&&this.id){if(r){const o=this.getBoundingClientRect(),a=o.width,h=o.height;this.instance.updateNode(this.id,{width:a,height:h,measured:{width:a,height:h}})}this.dispatchEvent(new CustomEvent("node-handles-updated",{detail:{nodeId:this.id,handleIds:s||[],timestamp:Date.now()},bubbles:!0,composed:!0}))}}}return I([v({type:String,reflect:!0})],t.prototype,"id"),I([v({type:Object})],t.prototype,"position"),I([v({type:Object})],t.prototype,"data"),I([v({type:Boolean,reflect:!0})],t.prototype,"selected"),I([v({type:Boolean,reflect:!0})],t.prototype,"dragging"),I([v({type:Object})],t.prototype,"instance"),I([v({type:Boolean})],t.prototype,"resizable"),I([v({type:Boolean})],t.prototype,"draggable"),I([v({type:String})],t.prototype,"drag_handle_selector"),I([v({type:Boolean})],t.prototype,"connectable"),I([v({type:Number})],t.prototype,"minWidth"),I([v({type:Number})],t.prototype,"maxWidth"),I([v({type:Number})],t.prototype,"minHeight"),I([v({type:Number})],t.prototype,"maxHeight"),I([v({type:Boolean})],t.prototype,"keepAspectRatio"),I([v({type:Number})],t.prototype,"maxInitialHeight"),t};u.FlowInstance=cn,u.NodeMixin=Rh,u.ShapeRegistry=Kt,u.createStore=Na,u.getBezierPath=Ne,u.getCenter=oh,u.getDistance=rh,u.getSmoothStepPath=si,u.getStraightPath=An,u.isPointInRect=ah,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=lit-flow.bundle.umd.cjs.map
