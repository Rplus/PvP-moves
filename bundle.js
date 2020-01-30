var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function l(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function o(t,e,n){t.$$.on_destroy.push(function(t,e){const n=t.subscribe(e);return n.unsubscribe?()=>n.unsubscribe():n}(e,n))}function c(t,e,n,s){return t[1]&&s?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](s(e))):n.ctx}function i(t,e,n=e){return t.set(n),e}function a(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function p(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function h(){return m(" ")}function g(){return m("")}function $(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function v(t){return function(e){return e.preventDefault(),t.call(this,e)}}function y(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t,e){e=""+e,t.data!==e&&(t.data=e)}function w(t,e){(null!=e||t.value)&&(t.value=e)}function k(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}function x(t,e,n){t.classList[n?"add":"remove"](e)}let z;function M(t){z=t}const _=[],L=[],S=[],T=[],j=Promise.resolve();let P=!1;function H(t){S.push(t)}function I(){const t=new Set;do{for(;_.length;){const t=_.shift();M(t),O(t.$$)}for(;L.length;)L.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];t.has(n)||(n(),t.add(n))}S.length=0}while(_.length);for(;T.length;)T.pop()();P=!1}function O(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}const D=new Set;let F;function A(){F={r:0,c:[],p:F}}function B(){F.r||s(F.c),F=F.p}function E(t,e){t&&t.i&&(D.delete(t),t.i(e))}function G(t,e,n,s){if(t&&t.o){if(D.has(t))return;D.add(t),F.c.push(()=>{D.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}function N(t,e){t.d(1),e.delete(t.key)}function q(t,e,n,s,l,r,o,c,i,a,u,f){let d=t.length,p=r.length,m=d;const h={};for(;m--;)h[t[m].key]=m;const g=[],$=new Map,v=new Map;for(m=p;m--;){const t=f(l,r,m),c=n(t);let i=o.get(c);i?s&&i.p(t,e):(i=a(c,t),i.c()),$.set(c,g[m]=i),c in h&&v.set(c,Math.abs(m-h[c]))}const y=new Set,b=new Set;function w(t){E(t,1),t.m(c,u),o.set(t.key,t),u=t.first,p--}for(;d&&p;){const e=g[p-1],n=t[d-1],s=e.key,l=n.key;e===n?(u=e.first,d--,p--):$.has(l)?!o.has(s)||y.has(s)?w(e):b.has(l)?d--:v.get(s)>v.get(l)?(b.add(s),w(e)):(y.add(l),d--):(i(n,o),d--)}for(;d--;){const e=t[d];$.has(e.key)||i(e,o)}for(;p;)w(g[p-1]);return g}function C(t){t&&t.c()}function J(t,n,r){const{fragment:o,on_mount:c,on_destroy:i,after_update:a}=t.$$;o&&o.m(n,r),H(()=>{const n=c.map(e).filter(l);i?i.push(...n):s(n),t.$$.on_mount=[]}),a.forEach(H)}function R(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function U(t,e){-1===t.$$.dirty[0]&&(_.push(t),P||(P=!0,j.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function V(e,l,r,o,c,i,a=[-1]){const u=z;M(e);const f=l.props||{},d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:n(),dirty:a};let p=!1;d.ctx=r?r(e,f,(t,n,...s)=>{const l=s.length?s[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=l)&&(d.bound[t]&&d.bound[t](l),p&&U(e,t)),n}):[],d.update(),p=!0,s(d.before_update),d.fragment=!!o&&o(d.ctx),l.target&&(l.hydrate?d.fragment&&d.fragment.l(function(t){return Array.from(t.childNodes)}(l.target)):d.fragment&&d.fragment.c(),l.intro&&E(e.$$.fragment),J(e,l.target,l.anchor),I()),M(u)}class W{$destroy(){R(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const K=[];function Q(t,e){return{subscribe:X(t,e).subscribe}}function X(e,n=t){let s;const l=[];function o(t){if(r(e,t)&&(e=t,s)){const t=!K.length;for(let t=0;t<l.length;t+=1){const n=l[t];n[1](),K.push(n,e)}if(t){for(let t=0;t<K.length;t+=2)K[t][0](K[t+1]);K.length=0}}}return{set:o,update:function(t){o(t(e))},subscribe:function(r,c=t){const i=[r,c];return l.push(i),1===l.length&&(s=n(o)||t),r(e),()=>{const t=l.indexOf(i);-1!==t&&l.splice(t,1),0===l.length&&(s(),s=null)}}}}function Y(t=!1){let e=new URLSearchParams(location.search).getAll("dex");return t?e:e[0]}function Z(t){return JSON.parse(JSON.stringify(t))}function tt(t,e=2,n){let s=(+t).toFixed(e);return n?s:+s}const et=["攻","防"],nt={opponent:"敵",self:"己"};function st(t){let e=localStorage.getItem("PvP-Moves");return e?(e=JSON.parse(e),t?e[t]:e):null}const lt={8:.37523559,13:.48168495};function rt(t,e){let[n,s,l,r]=e,o=lt[r],c=(t.atk+n)*Math.pow((t.def+s)*(t.sta+l),.5)*Math.pow(o,2);return Math.max(10,Math.floor(c/10))}function ot(t,e){let n=[10,11,12,13,14,15],s=rt(t,[10,10,10,e]);for(let l of n)for(let r of n)for(let o of n){let n=rt(t,[l,r,o,e]);n<=s||(l<12||r<12||o<12)&&(s=n)}return s+1}var ct={data:"-5,=7,-8;+0,-2,-3,+5,-6,=7,+8,-13,+14,+16,-17;+1,-5,+6,-8,+11,-12;-3,-4,-5,-7,=8,+11,+17;=2,+3,+5,-6,+8,+9,-11,+12;-1,+2,-4,+6,-8,+9,+14;-1,-2,-3,-7,-8,-9,+11,+13,+16,-17;=0,+7,+13,-16;+5,-8,-9,-10,-12,+14,+17;-5,+6,+8,-9,-10,+11,+14,-15;+4,+5,+9,-10,-11,-15;-2,-3,+4,+5,-6,-8,-9,+10,-11,-15;+2,=4,+10,-11,-12,-15;+1,+3,-8,-13,=16;+2,+4,-8,-9,-10,+11,-14,+15;-8,+15,=17;-1,+7,+13,-16,-17;+1,-3,-8,-9,+15,+16",types:["normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy"],effMap:{1:"+",2:"#","-1":"-","-2":"="},spliter:{def:",",atk:";"}};let it=Object.keys(ct.effMap).reduce((t,e)=>(t[ct.effMap[e]]=+e,t),{}),at=ct.data.split(ct.spliter.atk).map(t=>t.split(ct.spliter.def));const ut=ct.types.map(t=>({type:t,effs:[[],[],[],[]]}));for(let t in at){let e=ct.types[t];for(let n in at[t]){let s=it[at[t][n].slice(0,1)],l=+at[t][n].slice(1),r=ct.types[l];ut[t].effs[s>0?0:1].push({type:r,factor:s}),ut[l].effs[s>0?2:3].push({type:e,factor:s})}}const ft=ut,dt=X(Y()||"371"),pt=X(Y(!0));dt.subscribe(t=>{pt.update(e=>[...new Set([t,...e])].slice(-10)),history.pushState(null,null,`?dex=${t}`)}),window.addEventListener("popstate",t=>{let e=Y();dt.set(e)});const mt=X([]),ht=X([]);fetch("gm.json").then((function(t){return t.json()})).then(t=>{console.log("gm done:",t),mt.set(function(t){let e=t.map(t=>t.dex);return e.forEach((n,s)=>{let l=e.indexOf(n),r="";if(s!==l){if(t[s].id===t[l].id)return void(t[s]=null);r=t[s].id.replace(/^.+_/,"_")}t[s].uid=`${n}${r}`}),t.filter(Boolean)}(t.pokemon)),ht.set(t.moves)});const gt=function(e,n,r){const o=!Array.isArray(e),c=o?[e]:e,i=n.length<2;return Q(r,e=>{let r=!1;const a=[];let u=0,f=t;const d=()=>{if(u)return;f();const s=n(o?a[0]:a,e);i?e(s):f=l(s)?s:t},p=c.map((t,e)=>t.subscribe(t=>{a[e]=t,u&=~(1<<e),r&&d()},()=>{u|=1<<e}));return r=!0,d(),function(){s(p),f()}})}(mt,t=>t.map(t=>function(t,e=t){return`<option value="${t}" label="${e}"></option>`}(t.uid,`${t.name}, ${t.id.slice(0,1).toUpperCase()}${t.id.slice(1)}`)).join("")),$t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,vt=st("settings")||{},yt=X({details:vt.details||{head:!1,types:!0,fmove:!0,cmove:!0,pairs:!0,history:!0},gridview:vt.gridview,darktheme:void 0===vt.darktheme?$t:vt.darktheme});yt.subscribe(t=>{!function(t){if(!t||!t.key)return!1;let e=st()||{};e[t.key]=t.value,localStorage.setItem("PvP-Moves",JSON.stringify(e))}({key:"settings",value:t})});const bt=Q(ft),wt=X(null);function kt(e){let n,l,r,o,c,i,d,g,k,x,z;return{c(){n=p("form"),l=p("label"),l.textContent="Dex: #",r=h(),o=p("div"),c=p("input"),i=h(),d=p("button"),g=m(e[2]),k=h(),x=p("datalist"),y(l,"class","mr-2"),y(l,"for","dex"),y(c,"list","pm-names"),y(c,"class","pm-dex-selector mr-2 svelte-1g3e2q2"),y(c,"id","dex"),y(c,"name","dex"),c.required=!0,y(c,"pattern","\\d+(_\\D+)?"),y(c,"title","GG"),y(o,"class","input-wrapper mr-1 svelte-1g3e2q2"),y(d,"class","submit svelte-1g3e2q2"),y(d,"type","submit"),y(x,"id","pm-names"),y(n,"class","selector card L1-box df ai-b whs-nw svelte-1g3e2q2")},m(t,s){u(t,n,s),a(n,l),a(n,r),a(n,o),a(o,c),w(c,e[0]),e[8](c),a(n,i),a(n,d),a(d,g),a(n,k),a(n,x),x.innerHTML=e[3],z=[$(c,"input",e[7]),$(n,"submit",v(e[4]))]},p(t,[e]){1&e&&c.value!==t[0]&&w(c,t[0]),4&e&&b(g,t[2]),8&e&&(x.innerHTML=t[3])},i:t,o:t,d(t){t&&f(n),e[8](null),s(z)}}}function xt(t,e,n){let s,l,r;o(t,dt,t=>n(5,s=t)),o(t,mt,t=>n(6,l=t)),o(t,gt,t=>n(3,r=t));let c,a=s,u="";return t.$$.update=()=>{if(65&t.$$.dirty){let t=l.length&&l.find(t=>t.uid===a);n(2,u=t?t.name:"")}},[a,c,u,r,function(t){if(!l.length)return;let e=t.target.dex.value;l.find(t=>t.uid===e)?(console.info("submit",e,s),i(dt,s=e)):console.error(`Wrong Dex: ${e}`)},s,l,function(){a=this.value,n(0,a)},function(t){L[t?"unshift":"push"](()=>{n(1,c=t)})}]}class zt extends W{constructor(t){super(),V(this,t,xt,kt,r,{})}}function Mt(e){let n,s,r;return{c(){n=p("div"),y(n,"class",s="type-icon "+(e[1]||"")),y(n,"data-type",e[0]),y(n,"title",e[0])},m(t,s){u(t,n,s),r=$(n,"click",v((function(){l(e[2](e[0]))&&e[2](e[0]).apply(this,arguments)})))},p(t,[l]){e=t,2&l&&s!==(s="type-icon "+(e[1]||""))&&y(n,"class",s),1&l&&y(n,"data-type",e[0]),1&l&&y(n,"title",e[0])},i:t,o:t,d(t){t&&f(n),r()}}}function _t(t,e,n){let s;o(t,wt,t=>n(3,s=t));let{type:l}=e,{klass:r}=e;return t.$set=t=>{"type"in t&&n(0,l=t.type),"klass"in t&&n(1,r=t.klass)},[l,r,t=>()=>{i(wt,s=t)}]}class Lt extends W{constructor(t){super(),V(this,t,_t,Mt,r,{type:0,klass:1})}}function St(t){let e,n,s,l,r,o,c,i,d,$,v,w=t[0].power+"",x=t[0].energy+"",z=t[0].dpe+"",M=t[0].buffs&&jt(t);return{c(){e=p("div"),n=m(w),s=h(),l=p("div"),r=m("-"),o=m(x),c=h(),i=p("div"),d=m(z),$=h(),M&&M.c(),v=g(),y(e,"class","m-power m-grid svelte-1zk4v2"),y(e,"title","power"),y(l,"class","m-energy m-energy_c m-grid svelte-1zk4v2"),y(l,"title","energy"),k(l,"--bgzx",t[0].energy+"%"),y(i,"class","m-dpe m-grid svelte-1zk4v2"),y(i,"title","dpe")},m(t,f){u(t,e,f),a(e,n),u(t,s,f),u(t,l,f),a(l,r),a(l,o),u(t,c,f),u(t,i,f),a(i,d),u(t,$,f),M&&M.m(t,f),u(t,v,f)},p(t,e){1&e&&w!==(w=t[0].power+"")&&b(n,w),1&e&&x!==(x=t[0].energy+"")&&b(o,x),1&e&&k(l,"--bgzx",t[0].energy+"%"),1&e&&z!==(z=t[0].dpe+"")&&b(d,z),t[0].buffs?M?M.p(t,e):(M=jt(t),M.c(),M.m(v.parentNode,v)):M&&(M.d(1),M=null)},d(t){t&&f(e),t&&f(s),t&&f(l),t&&f(c),t&&f(i),t&&f($),M&&M.d(t),t&&f(v)}}}function Tt(t){let e,n,s,l,r,o,c,i,d,g,$,v,w,k,x,z=t[0].power+"",M=t[0].energyGain+"",_=t[0].turn+"",L=t[0].dpt+"",S=t[0].ept+"";return{c(){e=p("div"),n=m(z),s=h(),l=p("div"),r=m(M),o=h(),c=p("div"),i=m(_),d=h(),g=p("div"),$=m(L),v=h(),w=p("div"),k=m(S),y(e,"class","m-power m-grid svelte-1zk4v2"),y(e,"title","power"),y(l,"class","m-energy m-grid svelte-1zk4v2"),y(l,"title","energy"),y(c,"class","m-turn m-grid svelte-1zk4v2"),y(c,"grid-size","full"),y(c,"title","turn"),y(g,"class","m-dpt m-grid svelte-1zk4v2"),y(g,"title","dpt"),y(w,"class","m-ept m-grid svelte-1zk4v2"),y(w,"title","ept"),y(w,"data-eptxdpt",x=t[0].eptxdpt)},m(t,f){u(t,e,f),a(e,n),u(t,s,f),u(t,l,f),a(l,r),u(t,o,f),u(t,c,f),a(c,i),u(t,d,f),u(t,g,f),a(g,$),u(t,v,f),u(t,w,f),a(w,k)},p(t,e){1&e&&z!==(z=t[0].power+"")&&b(n,z),1&e&&M!==(M=t[0].energyGain+"")&&b(r,M),1&e&&_!==(_=t[0].turn+"")&&b(i,_),1&e&&L!==(L=t[0].dpt+"")&&b($,L),1&e&&S!==(S=t[0].ept+"")&&b(k,S),1&e&&x!==(x=t[0].eptxdpt)&&y(w,"data-eptxdpt",x)},d(t){t&&f(e),t&&f(s),t&&f(l),t&&f(o),t&&f(c),t&&f(d),t&&f(g),t&&f(v),t&&f(w)}}}function jt(t){let e,n,s=t[0].buffsDes+"";return{c(){e=p("div"),n=m(s),y(e,"class","m-effect m-grid svelte-1zk4v2"),y(e,"grid-size","full"),y(e,"title","effect")},m(t,s){u(t,e,s),a(e,n)},p(t,e){1&e&&s!==(s=t[0].buffsDes+"")&&b(n,s)},d(t){t&&f(e)}}}function Pt(t){let e,n,s,l,r,o,c,i,d,g,$=t[0].name+"";const v=new Lt({props:{klass:"m-icon mr-1",type:t[0].type}});function w(t,e){return t[0].isFast?Tt:St}let k=w(t),z=k(t);return{c(){e=p("div"),n=p("div"),s=p("div"),l=p("div"),C(v.$$.fragment),r=h(),o=m($),d=h(),z.c(),y(l,"class","m-name svelte-1zk4v2"),y(s,"class","m-title df df-c ai-c"),y(n,"class","m-info m-grid svelte-1zk4v2"),y(n,"grid-size","full"),y(n,"title",c=t[0].moveId),y(n,"data-title",i=t[0].moveId),y(e,"class","move-item svelte-1zk4v2"),x(e,"is-fast",t[0].isFast),x(e,"is-charged",!t[0].isFast),x(e,"is-legacy",t[0].isLegacy),x(e,"is-stab",t[0].stab)},m(t,c){u(t,e,c),a(e,n),a(n,s),a(s,l),J(v,l,null),a(l,r),a(l,o),a(e,d),z.m(e,null),g=!0},p(t,[s]){const l={};1&s&&(l.type=t[0].type),v.$set(l),(!g||1&s)&&$!==($=t[0].name+"")&&b(o,$),(!g||1&s&&c!==(c=t[0].moveId))&&y(n,"title",c),(!g||1&s&&i!==(i=t[0].moveId))&&y(n,"data-title",i),k===(k=w(t))&&z?z.p(t,s):(z.d(1),z=k(t),z&&(z.c(),z.m(e,null))),1&s&&x(e,"is-fast",t[0].isFast),1&s&&x(e,"is-charged",!t[0].isFast),1&s&&x(e,"is-legacy",t[0].isLegacy),1&s&&x(e,"is-stab",t[0].stab)},i(t){g||(E(v.$$.fragment,t),g=!0)},o(t){G(v.$$.fragment,t),g=!1},d(t){t&&f(e),R(v),z.d()}}}function Ht(t,e,n){let{mdata:s}=e;return t.$set=t=>{"mdata"in t&&n(0,s=t.mdata)},[s]}class It extends W{constructor(t){super(),V(this,t,Ht,Pt,r,{mdata:0})}}function Ot(t){let e,n,s,l;const r=t[4].default,o=function(t,e,n,s){if(t){const l=c(t,e,n,s);return t[0](l)}}(r,t,t[3],null);return{c(){e=p("details"),o&&o.c(),e.open=n=t[1].details[t[0]]||null},m(n,r){u(n,e,r),o&&o.m(e,null),s=!0,l=$(e,"toggle",t[2])},p(t,[l]){o&&o.p&&8&l&&o.p(c(r,t,t[3],null),function(t,e,n,s){if(t[2]&&s){const l=t[2](s(n));if("object"==typeof e.dirty){const t=[],n=Math.max(e.dirty.length,l.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|l[s];return t}return e.dirty|l}return e.dirty}(r,t[3],l,null)),(!s||3&l&&n!==(n=t[1].details[t[0]]||null))&&(e.open=n)},i(t){s||(E(o,t),s=!0)},o(t){G(o,t),s=!1},d(t){t&&f(e),o&&o.d(t),l()}}}function Dt(t,e,n){let s;o(t,yt,t=>n(1,s=t));let{type:l}=e;let{$$slots:r={},$$scope:c}=e;return t.$set=t=>{"type"in t&&n(0,l=t.type),"$$scope"in t&&n(3,c=t.$$scope)},[l,s,function(t){i(yt,s.details[l]=t.target.open,s)},c,r]}class Ft extends W{constructor(t){super(),V(this,t,Dt,Ot,r,{type:0})}}function At(t,e,n){const s=t.slice();return s[9]=e[n],s[11]=n,s}function Bt(t,e,n){const s=t.slice();return s[12]=e[n],s}function Et(t,e,n){const s=t.slice();return s[9]=e[n],s[11]=n,s}function Gt(t,e){let n,s,r,o,c,i,d,g,v=e[9].title+"";return{key:t,first:null,c(){n=p("div"),s=p("span"),r=m(v),i=h(),y(s,"class","sort-ind svelte-1ki025t"),y(s,"data-order",o=e[9].order),y(s,"data-dir",c=e[9].dir?e[9].dir>0?"▲":"▼":null),y(n,"class","td th svelte-1ki025t"),y(n,"title",d=e[9].intro),x(n,"mname",!e[9].value),x(n,"sort-th",e[9].value),this.first=n},m(t,o){u(t,n,o),a(n,s),a(s,r),a(n,i),g=$(n,"click",(function(){l(e[2](e[9].value))&&e[2](e[9].value).apply(this,arguments)}))},p(t,l){e=t,2&l&&v!==(v=e[9].title+"")&&b(r,v),2&l&&o!==(o=e[9].order)&&y(s,"data-order",o),2&l&&c!==(c=e[9].dir?e[9].dir>0?"▲":"▼":null)&&y(s,"data-dir",c),2&l&&d!==(d=e[9].intro)&&y(n,"title",d),2&l&&x(n,"mname",!e[9].value),2&l&&x(n,"sort-th",e[9].value)},d(t){t&&f(n),g()}}}function Nt(t){let e,n,s,l,r,o,c,i,d,g,$,v,w,k,x,z,M,_=t[12].turns+"",L=t[12].hits+"",S=Rt(t[12].dmg_t)+"",T=Rt(t[12].dpt)+"",j=t[12].f.name+"",P=t[12].c.name+"";return{c(){e=p("div"),n=p("div"),s=m(_),l=h(),r=p("div"),o=m(L),c=h(),i=p("div"),d=h(),g=p("div"),$=h(),v=p("div"),w=m(j),x=h(),z=p("div"),M=m(P),y(n,"class","td svelte-1ki025t"),y(r,"class","td svelte-1ki025t"),y(i,"class","td svelte-1ki025t"),y(g,"class","td svelte-1ki025t"),y(v,"class","td mname svelte-1ki025t"),y(v,"title",k=t[12].f),y(z,"class","td mname svelte-1ki025t"),y(e,"class","tr svelte-1ki025t")},m(t,f){u(t,e,f),a(e,n),a(n,s),a(e,l),a(e,r),a(r,o),a(e,c),a(e,i),i.innerHTML=S,a(e,d),a(e,g),g.innerHTML=T,a(e,$),a(e,v),a(v,w),a(e,x),a(e,z),a(z,M)},p(t,e){1&e&&_!==(_=t[12].turns+"")&&b(s,_),1&e&&L!==(L=t[12].hits+"")&&b(o,L),1&e&&S!==(S=Rt(t[12].dmg_t)+"")&&(i.innerHTML=S),1&e&&T!==(T=Rt(t[12].dpt)+"")&&(g.innerHTML=T),1&e&&j!==(j=t[12].f.name+"")&&b(w,j),1&e&&k!==(k=t[12].f)&&y(v,"title",k),1&e&&P!==(P=t[12].c.name+"")&&b(M,P)},d(t){t&&f(e)}}}function qt(t,e){let n,s,l=(e[9].intro||"")+"";return{key:t,first:null,c(){n=p("div"),s=m(l),y(n,"class","td th svelte-1ki025t"),this.first=n},m(t,e){u(t,n,e),a(n,s)},p(t,e){2&e&&l!==(l=(t[9].intro||"")+"")&&b(s,l)},d(t){t&&f(n)}}}function Ct(t){let e,n,s,l,r,o,c,i=[],m=new Map,g=[],$=new Map,v=t[1];const b=t=>t[9].title;for(let e=0;e<v.length;e+=1){let n=Et(t,v,e),s=b(n);m.set(s,i[e]=Gt(s,n))}let w=t[0],k=[];for(let e=0;e<w.length;e+=1)k[e]=Nt(Bt(t,w,e));let x=t[1];const z=t=>t[9].title;for(let e=0;e<x.length;e+=1){let n=At(t,x,e),s=z(n);$.set(s,g[e]=qt(s,n))}return{c(){e=p("summary"),e.innerHTML='<h3 class="d-ib">Move Pairs</h3>',n=h(),s=p("div"),l=p("div");for(let t=0;t<i.length;t+=1)i[t].c();r=h();for(let t=0;t<k.length;t+=1)k[t].c();o=h(),c=p("div");for(let t=0;t<g.length;t+=1)g[t].c();y(l,"class","tr thead svelte-1ki025t"),y(c,"class","tr tfoot svelte-1ki025t"),y(s,"class","move-pairs whs-nw svelte-1ki025t")},m(t,f){u(t,e,f),u(t,n,f),u(t,s,f),a(s,l);for(let t=0;t<i.length;t+=1)i[t].m(l,null);a(s,r);for(let t=0;t<k.length;t+=1)k[t].m(s,null);a(s,o),a(s,c);for(let t=0;t<g.length;t+=1)g[t].m(c,null)},p(t,e){const n=t[1];if(i=q(i,e,b,1,t,n,m,l,N,Gt,null,Et),1&e){let n;for(w=t[0],n=0;n<w.length;n+=1){const l=Bt(t,w,n);k[n]?k[n].p(l,e):(k[n]=Nt(l),k[n].c(),k[n].m(s,o))}for(;n<k.length;n+=1)k[n].d(1);k.length=w.length}const r=t[1];g=q(g,e,z,1,t,r,$,c,N,qt,null,At)},d(t){t&&f(e),t&&f(n),t&&f(s);for(let t=0;t<i.length;t+=1)i[t].d();d(k,t);for(let t=0;t<g.length;t+=1)g[t].d()}}}function Jt(t){let e,n,s;const l=new Ft({props:{type:"pairs",$$slots:{default:[Ct]},$$scope:{ctx:t}}});return{c(){e=p("section"),n=p("div"),C(l.$$.fragment),y(n,"class","card"),y(e,"class","pairs-section")},m(t,r){u(t,e,r),a(e,n),J(l,n,null),s=!0},p(t,[e]){const n={};65539&e&&(n.$$scope={dirty:e,ctx:t}),l.$set(n)},i(t){s||(E(l.$$.fragment,t),s=!0)},o(t){G(l.$$.fragment,t),s=!1},d(t){t&&f(e),R(l)}}}function Rt(t,e=1){let n=tt(t,e,!0).split(".");return n[1]=`<small class="decimal">.${n[1]}</small>`,n.join("")}function Ut(t,e,n){let s,l,{mdata:r}=e,o=[["turns",1],["dmg_t",-1]],c=[{title:"t",value:"turns",intro:"回合"},{title:"H",value:"hits",intro:"小招攻擊次數"},{title:"ΣD",value:"dmg_t",intro:"循環傷害 (+STAB)"},{title:"DPT",value:"dpt",intro:"回合均傷 (+STAB)"},{title:"小招"},{title:"大招"}];function i(t,e){let[[n,s],[l,r]]=o;return t[n]>e[n]?s:t[n]<e[n]?-s:t[l]>e[l]?r:-r}return t.$set=t=>{"mdata"in t&&n(3,r=t.mdata)},t.$$.update=()=>{25&t.$$.dirty&&(!function(){n(0,s=[]);for(let t of r[0].data)for(let e of r[1].data){let l=Math.ceil(e.energy/t.energyGain),r=l*t.turn,o=t.power*l*t.stabFactor,c=o+e.power*e.stabFactor,i=c/r;n(0,s=s.concat({f:t,c:e,turns:r,hits:l,dmg_f:o,dmg_t:c,dpt:i}))}}(),n(0,s=s.sort(i)),n(1,l=Z(c).map(t=>{if(!t.value)return t;let e=o.findIndex(e=>e[0]===t.value);return-1===e?t:(t.dir=o[e][1],t.order=e+1,t)})))},[s,l,t=>()=>{if(!t)return;let e=o.findIndex(e=>e[0]===t);-1===e?(o.push([t,1]),n(4,o=o.slice(-2))):n(4,o[e][1]=-1*o[e][1],o)},r]}class Vt extends W{constructor(t){super(),V(this,t,Ut,Jt,r,{mdata:3})}}function Wt(t,e,n){const s=t.slice();return s[9]=e[n],s}function Kt(t,e,n){const s=t.slice();return s[6]=e[n],s}function Qt(t){let e;const n=new It({props:{mdata:t[9]}});return{c(){C(n.$$.fragment)},m(t,s){J(n,t,s),e=!0},p(t,e){const s={};2&e&&(s.mdata=t[9]),n.$set(s)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function Xt(t){let e,n,s,l,r,o,c=t[6].title+"",i=t[6].data,g=[];for(let e=0;e<i.length;e+=1)g[e]=Qt(Wt(t,i,e));const $=t=>G(g[t],1,1,()=>{g[t]=null});return{c(){e=p("summary"),n=p("h3"),s=m(c),l=h(),r=p("div");for(let t=0;t<g.length;t+=1)g[t].c();y(n,"class","moveset-title d-ib"),y(r,"class","moveset svelte-1ksp2fv")},m(t,c){u(t,e,c),a(e,n),a(n,s),u(t,l,c),u(t,r,c);for(let t=0;t<g.length;t+=1)g[t].m(r,null);o=!0},p(t,e){if((!o||2&e)&&c!==(c=t[6].title+"")&&b(s,c),2&e){let n;for(i=t[6].data,n=0;n<i.length;n+=1){const s=Wt(t,i,n);g[n]?(g[n].p(s,e),E(g[n],1)):(g[n]=Qt(s),g[n].c(),E(g[n],1),g[n].m(r,null))}for(A(),n=i.length;n<g.length;n+=1)$(n);B()}},i(t){if(!o){for(let t=0;t<i.length;t+=1)E(g[t]);o=!0}},o(t){g=g.filter(Boolean);for(let t=0;t<g.length;t+=1)G(g[t]);o=!1},d(t){t&&f(e),t&&f(l),t&&f(r),d(g,t)}}}function Yt(t){let e,n,s;const l=new Ft({props:{type:t[6].setting,$$slots:{default:[Xt]},$$scope:{ctx:t}}});return{c(){e=p("div"),C(l.$$.fragment),n=h(),y(e,"class","card")},m(t,r){u(t,e,r),J(l,e,null),a(e,n),s=!0},p(t,e){const n={};2&e&&(n.type=t[6].setting),4098&e&&(n.$$scope={dirty:e,ctx:t}),l.$set(n)},i(t){s||(E(l.$$.fragment,t),s=!0)},o(t){G(l.$$.fragment,t),s=!1},d(t){t&&f(e),R(l)}}}function Zt(t){let e;const n=new Vt({props:{mdata:t[1]}});return{c(){C(n.$$.fragment)},m(t,s){J(n,t,s),e=!0},p(t,e){const s={};2&e&&(s.mdata=t[1]),n.$set(s)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function te(t){let e,n,s,l,r=t[1],o=[];for(let e=0;e<r.length;e+=1)o[e]=Yt(Kt(t,r,e));const c=t=>G(o[t],1,1,()=>{o[t]=null});let i=235!==t[0].dex&&Zt(t);return{c(){e=p("section");for(let t=0;t<o.length;t+=1)o[t].c();n=h(),i&&i.c(),s=g(),y(e,"class","moves")},m(t,r){u(t,e,r);for(let t=0;t<o.length;t+=1)o[t].m(e,null);u(t,n,r),i&&i.m(t,r),u(t,s,r),l=!0},p(t,[n]){if(2&n){let s;for(r=t[1],s=0;s<r.length;s+=1){const l=Kt(t,r,s);o[s]?(o[s].p(l,n),E(o[s],1)):(o[s]=Yt(l),o[s].c(),E(o[s],1),o[s].m(e,null))}for(A(),s=r.length;s<o.length;s+=1)c(s);B()}235!==t[0].dex?i?(i.p(t,n),E(i,1)):(i=Zt(t),i.c(),E(i,1),i.m(s.parentNode,s)):i&&(A(),G(i,1,1,()=>{i=null}),B())},i(t){if(!l){for(let t=0;t<r.length;t+=1)E(o[t]);E(i),l=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)G(o[t]);G(i),l=!1},d(t){t&&f(e),d(o,t),t&&f(n),i&&i.d(t),t&&f(s)}}}function ee(t,e,n){let s;o(t,ht,t=>n(3,s=t));let l,r,{pm:c}=e;function i(t,e){let n=function(t){return Z(s.find(e=>e.moveId===t))}(t);return n.isLegacy=l&&l.includes(t),n.isFast=e,n.stab=c.types.includes(n.type),n.stabFactor=n.stab?1.2:1,e?(n.ept=tt(n.energyGain/n.turn),n.dpt=tt(n.power/n.turn),n.eptxdpt=tt(n.ept*n.dpt)):(n.dpe=tt(n.power/n.energy),n.buffs&&(n.buffsDes=function(t){let e=t.buffs.map((t,e)=>t?`${t>0?"+":""}${t}階${et[e]}`:"").filter(Boolean).join(", ");return`${100*t.buffApplyChance}%, ${e}, [${nt[t.buffTarget]}]`}(n))),n}return t.$set=t=>{"pm"in t&&n(0,c=t.pm)},t.$$.update=()=>{1&t.$$.dirty&&(l=c.legacyMoves,n(1,r=[{title:"Fast Moves",data:c.fastMoves.map(t=>i(t,!0)),setting:"fmove"},{title:"Charged Moves",data:c.chargedMoves.map(t=>i(t,!1)),setting:"cmove"}]))},[c,r]}class ne extends W{constructor(t){super(),V(this,t,ee,te,r,{pm:0})}}function se(t,e,n){const s=t.slice();return s[2]=e[n],s}function le(t){let e,n,s,l,r,o,c,i,d,g,$,v,w,k,x,z,M,_,L,S,T=t[2].lv+"",j=t[2].ooo+"",P=(t[2].ooo!==t[2].min?t[2].min:"")+"",H=t[2].ccc+"",I=t[2].wow+"",O=t[2].max+"";return{c(){e=p("tr"),n=p("th"),s=m("Lv"),l=m(T),r=h(),o=p("td"),c=m(j),i=h(),d=p("td"),g=m(P),$=h(),v=p("td"),w=m(H),k=h(),x=p("td"),z=m(I),M=h(),_=p("td"),L=m(O),S=h(),y(n,"class","svelte-3ep3zs"),y(o,"class","svelte-3ep3zs"),y(d,"class","svelte-3ep3zs"),y(v,"class","svelte-3ep3zs"),y(x,"class","svelte-3ep3zs"),y(_,"class","svelte-3ep3zs")},m(t,f){u(t,e,f),a(e,n),a(n,s),a(n,l),a(e,r),a(e,o),a(o,c),a(e,i),a(e,d),a(d,g),a(e,$),a(e,v),a(v,w),a(e,k),a(e,x),a(x,z),a(e,M),a(e,_),a(_,L),a(e,S)},p(t,e){1&e&&T!==(T=t[2].lv+"")&&b(l,T),1&e&&j!==(j=t[2].ooo+"")&&b(c,j),1&e&&P!==(P=(t[2].ooo!==t[2].min?t[2].min:"")+"")&&b(g,P),1&e&&H!==(H=t[2].ccc+"")&&b(w,H),1&e&&I!==(I=t[2].wow+"")&&b(z,I),1&e&&O!==(O=t[2].max+"")&&b(L,O)},d(t){t&&f(e)}}}function re(e){let n,s,l,r,o=e[0],c=[];for(let t=0;t<o.length;t+=1)c[t]=le(se(e,o,t));return{c(){n=p("table"),s=p("thead"),s.innerHTML='<tr><th class="svelte-3ep3zs"><small class="sss">IV/CP</small></th> \n      <th class="svelte-3ep3zs">0-0-0</th> \n      <th class="svelte-3ep3zs">4-4-4</th> \n      <th title="淨化後可能 100%" class="svelte-3ep3zs">13-13-13</th> \n      <th title="淨化後必為 100%" class="svelte-3ep3zs">☆☆☆☆</th> \n      <th class="svelte-3ep3zs">15-15-15</th></tr>',l=h(),r=p("tbody");for(let t=0;t<c.length;t+=1)c[t].c();y(n,"class","pm-cp whs-nw svelte-3ep3zs")},m(t,e){u(t,n,e),a(n,s),a(n,l),a(n,r);for(let t=0;t<c.length;t+=1)c[t].m(r,null)},p(t,[e]){if(1&e){let n;for(o=t[0],n=0;n<o.length;n+=1){const s=se(t,o,n);c[n]?c[n].p(s,e):(c[n]=le(s),c[n].c(),c[n].m(r,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=o.length}},i:t,o:t,d(t){t&&f(n),d(c,t)}}}function oe(t,e,n){let s,{ads:l}=e;return t.$set=t=>{"ads"in t&&n(1,l=t.ads)},t.$$.update=()=>{2&t.$$.dirty&&n(0,s=[{lv:8,ooo:rt(l,[0,0,0,8]),min:rt(l,[0,0,0,8]),ccc:rt(l,[13,13,13,8]),max:rt(l,[15,15,15,8]),wow:ot(l,8)},{lv:13,ooo:rt(l,[0,0,0,13]),min:rt(l,[4,4,4,13]),ccc:rt(l,[13,13,13,13]),max:rt(l,[15,15,15,13]),wow:ot(l,13)}])},[s,l]}class ce extends W{constructor(t){super(),V(this,t,oe,re,r,{ads:1})}}function ie(t,e,n){const s=t.slice();return s[7]=e[n],s}function ae(t,e,n){const s=t.slice();return s[4]=e[n],s}function ue(t){let e;const n=new Lt({props:{klass:"m-icon mr-1",type:t[7]}});return{c(){C(n.$$.fragment)},m(t,s){J(n,t,s),e=!0},p(t,e){const s={};1&e&&(s.type=t[7]),n.$set(s)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function fe(t){let e,n,s,l,r=t[4][1],o=[];for(let e=0;e<r.length;e+=1)o[e]=ue(ie(t,r,e));const c=t=>G(o[t],1,1,()=>{o[t]=null});return{c(){e=p("div");for(let t=0;t<o.length;t+=1)o[t].c();n=h(),y(e,"class","types-factor d-if fwx-w mb-5 pb-1 svelte-5viq5t"),y(e,"data-factor",s=t[4][0]),k(e,"order",t[4][0]),k(e,"--factor","'x"+me(t[4][0])+"'")},m(t,s){u(t,e,s);for(let t=0;t<o.length;t+=1)o[t].m(e,null);a(e,n),l=!0},p(t,i){if(1&i){let s;for(r=t[4][1],s=0;s<r.length;s+=1){const l=ie(t,r,s);o[s]?(o[s].p(l,i),E(o[s],1)):(o[s]=ue(l),o[s].c(),E(o[s],1),o[s].m(e,n))}for(A(),s=r.length;s<o.length;s+=1)c(s);B()}(!l||1&i&&s!==(s=t[4][0]))&&y(e,"data-factor",s),(!l||1&i)&&k(e,"order",t[4][0]),(!l||1&i)&&k(e,"--factor","'x"+me(t[4][0])+"'")},i(t){if(!l){for(let t=0;t<r.length;t+=1)E(o[t]);l=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)G(o[t]);l=!1},d(t){t&&f(e),d(o,t)}}}function de(t){let e,n,s,l,r=t[0],o=[];for(let e=0;e<r.length;e+=1)o[e]=fe(ae(t,r,e));const c=t=>G(o[t],1,1,()=>{o[t]=null});return{c(){e=p("summary"),e.innerHTML='<h3 class="d-ib">各屬性招式傷害係數</h3>',n=h(),s=p("div");for(let t=0;t<o.length;t+=1)o[t].c();y(s,"class","df fd-rr fwx-w jc-se")},m(t,r){u(t,e,r),u(t,n,r),u(t,s,r);for(let t=0;t<o.length;t+=1)o[t].m(s,null);l=!0},p(t,e){if(1&e){let n;for(r=t[0],n=0;n<r.length;n+=1){const l=ae(t,r,n);o[n]?(o[n].p(l,e),E(o[n],1)):(o[n]=fe(l),o[n].c(),E(o[n],1),o[n].m(s,null))}for(A(),n=r.length;n<o.length;n+=1)c(n);B()}},i(t){if(!l){for(let t=0;t<r.length;t+=1)E(o[t]);l=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)G(o[t]);l=!1},d(t){t&&f(e),t&&f(n),t&&f(s),d(o,t)}}}function pe(t){let e,n;const s=new Ft({props:{type:"types",$$slots:{default:[de]},$$scope:{ctx:t}}});return{c(){e=p("div"),C(s.$$.fragment),y(e,"class","card")},m(t,l){u(t,e,l),J(s,e,null),n=!0},p(t,[e]){const n={};1025&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n)},i(t){n||(E(s.$$.fragment,t),n=!0)},o(t){G(s.$$.fragment,t),n=!1},d(t){t&&f(e),R(s)}}}function me(t){return tt(Math.pow(1.6,t))}function he(t,e,n){let s;o(t,bt,t=>n(2,s=t));let{types:l=[]}=e;const r=s.map(t=>t.type);let c=[];return t.$set=t=>{"types"in t&&n(1,l=t.types)},t.$$.update=()=>{if(7&t.$$.dirty){let t=r.reduce((t,e)=>(t[e]=0,t),{});l.forEach(e=>{let n=s.find(t=>t.type===e).effs;n[2].concat(n[3]).forEach(e=>{t[e.type]+=e.factor})}),n(0,c=Object.values(t).reduce((t,e,n)=>e?(t[e]||(t[e]=[]),t[e].push(r[n]),t):t,{})),n(0,c=Object.keys(c).map(t=>[t,c[t]]))}},[c,l]}class ge extends W{constructor(t){super(),V(this,t,he,pe,r,{types:1})}}function $e(t,e,n){const s=t.slice();return s[1]=e[n],s}function ve(t){let e;const n=new Lt({props:{klass:"pm-type",type:t[1]}});return{c(){C(n.$$.fragment)},m(t,s){J(n,t,s),e=!0},p(t,e){const s={};1&e&&(s.type=t[1]),n.$set(s)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function ye(t){let e,n,s,l,r,o,c,i,g,$,v,w,k,x,z,M,_,L,S,T,j,P,H,I=t[0].name+"",O=t[0].dex+"",D=t[0].baseStats.atk+"",F=t[0].baseStats.def+"",N=t[0].baseStats.sta+"",q=t[0].types,U=[];for(let e=0;e<q.length;e+=1)U[e]=ve($e(t,q,e));const V=t=>G(U[t],1,1,()=>{U[t]=null}),W=new ce({props:{ads:t[0].baseStats}});return{c(){e=p("summary"),n=p("h2"),s=p("span"),l=m(I),r=h(),o=p("small"),c=m("#"),i=m(O),g=h(),$=p("div");for(let t=0;t<U.length;t+=1)U[t].c();v=h(),w=p("div"),k=p("div"),x=m(D),z=h(),M=p("div"),_=m(F),L=h(),S=p("div"),T=m(N),j=h(),P=p("div"),C(W.$$.fragment),y(s,"class","pm-name svelte-8cel0h"),y(o,"class","pm-dex svelte-8cel0h"),y($,"class","pm-types df"),y(k,"class","base svelte-8cel0h"),y(k,"data-base","a"),y(M,"class","base svelte-8cel0h"),y(M,"data-base","d"),y(S,"class","base svelte-8cel0h"),y(S,"data-base","s"),y(w,"class","pm-stats svelte-8cel0h"),y(n,"class","summary-title d-if mb-4 mt-4 svelte-8cel0h")},m(t,f){u(t,e,f),a(e,n),a(n,s),a(s,l),a(n,r),a(n,o),a(o,c),a(o,i),a(n,g),a(n,$);for(let t=0;t<U.length;t+=1)U[t].m($,null);a(n,v),a(n,w),a(w,k),a(k,x),a(w,z),a(w,M),a(M,_),a(w,L),a(w,S),a(S,T),u(t,j,f),u(t,P,f),J(W,P,null),H=!0},p(t,e){if((!H||1&e)&&I!==(I=t[0].name+"")&&b(l,I),(!H||1&e)&&O!==(O=t[0].dex+"")&&b(i,O),1&e){let n;for(q=t[0].types,n=0;n<q.length;n+=1){const s=$e(t,q,n);U[n]?(U[n].p(s,e),E(U[n],1)):(U[n]=ve(s),U[n].c(),E(U[n],1),U[n].m($,null))}for(A(),n=q.length;n<U.length;n+=1)V(n);B()}(!H||1&e)&&D!==(D=t[0].baseStats.atk+"")&&b(x,D),(!H||1&e)&&F!==(F=t[0].baseStats.def+"")&&b(_,F),(!H||1&e)&&N!==(N=t[0].baseStats.sta+"")&&b(T,N);const n={};1&e&&(n.ads=t[0].baseStats),W.$set(n)},i(t){if(!H){for(let t=0;t<q.length;t+=1)E(U[t]);E(W.$$.fragment,t),H=!0}},o(t){U=U.filter(Boolean);for(let t=0;t<U.length;t+=1)G(U[t]);G(W.$$.fragment,t),H=!1},d(t){t&&f(e),d(U,t),t&&f(j),t&&f(P),R(W)}}}function be(t){let e,n,s,l,r;const o=new Ft({props:{type:"head",$$slots:{default:[ye]},$$scope:{ctx:t}}}),c=new ge({props:{types:t[0].types}}),i=new ne({props:{pm:t[0]}});return{c(){e=p("section"),n=p("header"),C(o.$$.fragment),s=h(),C(c.$$.fragment),l=h(),C(i.$$.fragment),y(n,"class","pm-info card"),y(e,"class","pm-section L1-box")},m(t,f){u(t,e,f),a(e,n),J(o,n,null),a(e,s),J(c,e,null),a(e,l),J(i,e,null),r=!0},p(t,[e]){const n={};17&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n);const s={};1&e&&(s.types=t[0].types),c.$set(s);const l={};1&e&&(l.pm=t[0]),i.$set(l)},i(t){r||(E(o.$$.fragment,t),E(c.$$.fragment,t),E(i.$$.fragment,t),r=!0)},o(t){G(o.$$.fragment,t),G(c.$$.fragment,t),G(i.$$.fragment,t),r=!1},d(t){t&&f(e),R(o),R(c),R(i)}}}function we(t,e,n){let{pm:s}=e;return t.$set=t=>{"pm"in t&&n(0,s=t.pm)},[s]}class ke extends W{constructor(t){super(),V(this,t,we,be,r,{pm:0})}}function xe(t,e,n){const s=t.slice();return s[7]=e[n],s}function ze(t,e){let n,s,l,r,o,c=e[7].title+"";return{key:t,first:null,c(){n=p("a"),s=m(c),l=h(),y(n,"class","mb-1"),y(n,"href",r="./?dex="+e[7].uid),y(n,"data-uid",o=e[7].uid),this.first=n},m(t,e){u(t,n,e),a(n,s),a(n,l)},p(t,e){1&e&&c!==(c=t[7].title+"")&&b(s,c),1&e&&r!==(r="./?dex="+t[7].uid)&&y(n,"href",r),1&e&&o!==(o=t[7].uid)&&y(n,"data-uid",o)},d(t){t&&f(n)}}}function Me(t){let e,n,s,l,r,o,c,i,d,g,b,w=[],x=new Map,z=t[0];const M=t=>t[7].uid;for(let e=0;e<z.length;e+=1){let n=xe(t,z,e),s=M(n);x.set(s,w[e]=ze(s,n))}return{c(){e=p("summary"),e.innerHTML='<h3 class="d-ib">History</h3>',n=h(),s=p("div"),l=p("div");for(let t=0;t<w.length;t+=1)w[t].c();r=h(),o=p("hr"),c=h(),i=p("a"),d=m("Share 🔗"),y(l,"class","df fd-c"),y(i,"href",g="./?"+t[1]),k(i,"margin-left","3em"),y(s,"class","links whs-nw pl-4 svelte-nj4djv")},m(f,p){u(f,e,p),u(f,n,p),u(f,s,p),a(s,l);for(let t=0;t<w.length;t+=1)w[t].m(l,null);a(s,r),a(s,o),a(s,c),a(s,i),a(i,d),b=$(l,"click",v(t[2]))},p(t,e){const n=t[0];w=q(w,e,M,1,t,n,x,l,N,ze,null,xe),2&e&&g!==(g="./?"+t[1])&&y(i,"href",g)},d(t){t&&f(e),t&&f(n),t&&f(s);for(let t=0;t<w.length;t+=1)w[t].d();b()}}}function _e(t){let e,n;const s=new Ft({props:{type:"history",$$slots:{default:[Me]},$$scope:{ctx:t}}});return{c(){e=p("div"),C(s.$$.fragment),y(e,"class","card history svelte-nj4djv")},m(t,l){u(t,e,l),J(s,e,null),n=!0},p(t,[e]){const n={};1027&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n)},i(t){n||(E(s.$$.fragment,t),n=!0)},o(t){G(s.$$.fragment,t),n=!1},d(t){t&&f(e),R(s)}}}function Le(t,e,n){let s,l,r;o(t,mt,t=>n(3,s=t)),o(t,pt,t=>n(4,l=t)),o(t,dt,t=>n(5,r=t));let c=[],a="";function u(t){let e=s.find(e=>e.uid===t);return`#${t=`.. ${t.split("_")[0]}`.slice(-4)} ${e&&e.name||"-"}`}return t.$$.update=()=>{24&t.$$.dirty&&(n(0,c=l.map(t=>({uid:t,title:u(t)}))),n(1,a=l.map(t=>`dex=${t}`).join("&")))},[c,a,function(t){t.target.href&&i(dt,r=t.target.dataset.uid)}]}class Se extends W{constructor(t){super(),V(this,t,Le,_e,r,{})}}function Te(t,e,n){const s=t.slice();return s[10]=e[n],s}function je(t,e,n){const s=t.slice();return s[7]=e[n],s}function Pe(t,e,n){const s=t.slice();return s[4]=e[n],s}function He(t){let e,n,s,l;return{c(){e=p("div"),y(e,"class","type-icon svelte-szt8pp"),y(e,"data-type",n=t[10].type),y(e,"data-factor",s=t[10].factor)},m(n,s){u(n,e,s),l=$(e,"click",t[3])},p(t,l){2&l&&n!==(n=t[10].type)&&y(e,"data-type",n),2&l&&s!==(s=t[10].factor)&&y(e,"data-factor",s)},d(t){t&&f(e),l()}}}function Ie(t){let e,n=t[7],s=[];for(let e=0;e<n.length;e+=1)s[e]=He(Te(t,n,e));return{c(){e=p("div");for(let t=0;t<s.length;t+=1)s[t].c();y(e,"class","type-panel df svelte-szt8pp")},m(t,n){u(t,e,n);for(let t=0;t<s.length;t+=1)s[t].m(e,null)},p(t,l){if(10&l){let r;for(n=t[7],r=0;r<n.length;r+=1){const o=Te(t,n,r);s[r]?s[r].p(o,l):(s[r]=He(o),s[r].c(),s[r].m(e,null))}for(;r<s.length;r+=1)s[r].d(1);s.length=n.length}},d(t){t&&f(e),d(s,t)}}}function Oe(t){let e,n,s,l,r,o,c,i,g,$,v,w,k=t[4].type+"",z=t[4].effs,M=[];for(let e=0;e<z.length;e+=1)M[e]=Ie(je(t,z,e));return{c(){e=p("div");for(let t=0;t<M.length;t+=1)M[t].c();n=h(),s=p("div"),l=m("/ "),r=m(k),o=m(" /"),c=h(),i=p("div"),g=p("div"),v=h(),y(s,"class","type-title whs-nw svelte-szt8pp"),y(g,"class","type-icon svelte-szt8pp"),y(g,"data-type",$=t[4].type),y(i,"class","type-center svelte-szt8pp"),y(e,"class","type-chart svelte-szt8pp"),y(e,"data-type",w=t[4].type),x(e,"is-show",t[0]===t[4].type)},m(t,f){u(t,e,f);for(let t=0;t<M.length;t+=1)M[t].m(e,null);a(e,n),a(e,s),a(s,l),a(s,r),a(s,o),a(e,c),a(e,i),a(i,g),a(e,v)},p(t,s){if(10&s){let l;for(z=t[4].effs,l=0;l<z.length;l+=1){const r=je(t,z,l);M[l]?M[l].p(r,s):(M[l]=Ie(r),M[l].c(),M[l].m(e,n))}for(;l<M.length;l+=1)M[l].d(1);M.length=z.length}2&s&&k!==(k=t[4].type+"")&&b(r,k),2&s&&$!==($=t[4].type)&&y(g,"data-type",$),2&s&&w!==(w=t[4].type)&&y(e,"data-type",w),3&s&&x(e,"is-show",t[0]===t[4].type)},d(t){t&&f(e),d(M,t)}}}function De(e){let n,s,l,r,o,c,i=e[1],m=[];for(let t=0;t<i.length;t+=1)m[t]=Oe(Pe(e,i,t));return{c(){n=p("div"),s=p("div"),l=h(),r=p("div");for(let t=0;t<m.length;t+=1)m[t].c();y(s,"class","dialog-overlay svelte-szt8pp"),y(r,"class","card svelte-szt8pp"),y(n,"class","dialog-card svelte-szt8pp"),n.hidden=o=!e[0]},m(t,o){u(t,n,o),a(n,s),a(n,l),a(n,r);for(let t=0;t<m.length;t+=1)m[t].m(r,null);c=$(s,"click",e[2])},p(t,[e]){if(11&e){let n;for(i=t[1],n=0;n<i.length;n+=1){const s=Pe(t,i,n);m[n]?m[n].p(s,e):(m[n]=Oe(s),m[n].c(),m[n].m(r,null))}for(;n<m.length;n+=1)m[n].d(1);m.length=i.length}1&e&&o!==(o=!t[0])&&(n.hidden=o)},i:t,o:t,d(t){t&&f(n),d(m,t),c()}}}function Fe(t,e,n){let s,l;return o(t,wt,t=>n(0,s=t)),o(t,bt,t=>n(1,l=t)),[s,l,function(){i(wt,s=null)},function(t){let e=t.target.dataset.type;e!==s&&i(wt,s=e)}]}class Ae extends W{constructor(t){super(),V(this,t,Fe,De,r,{})}}function Be(e){let n,l,r,o,c,i,d,g,v,b,w,k,x,z,M;return{c(){n=p("div"),l=p("label"),r=m("List\n    "),o=p("input"),c=h(),i=p("div"),d=m("\n    Grid"),g=h(),v=p("label"),b=m("Light\n    "),w=p("input"),k=h(),x=p("div"),z=m("\n    Dark"),y(o,"class","switcher-checkbox"),y(o,"type","checkbox"),y(i,"class","switcher-icon"),y(l,"class","gridview-switcher switcher mb-2"),y(w,"class","switcher-checkbox"),y(w,"type","checkbox"),y(x,"class","switcher-icon"),y(v,"class","darktheme-switcher switcher mb-2"),y(n,"class","settings svelte-ciyq2s")},m(t,s){u(t,n,s),a(n,l),a(l,r),a(l,o),o.checked=e[0].gridview,a(l,c),a(l,i),a(l,d),a(n,g),a(n,v),a(v,b),a(v,w),w.checked=e[0].darktheme,a(v,k),a(v,x),a(v,z),M=[$(o,"change",e[1]),$(w,"change",e[2])]},p(t,[e]){1&e&&(o.checked=t[0].gridview),1&e&&(w.checked=t[0].darktheme)},i:t,o:t,d(t){t&&f(n),s(M)}}}function Ee(t,e,n){let s;return o(t,yt,t=>n(0,s=t)),[s,function(){s.gridview=this.checked,yt.set(s)},function(){s.darktheme=this.checked,yt.set(s)}]}class Ge extends W{constructor(t){super(),V(this,t,Ee,Be,r,{})}}function Ne(e){let n,s,l,r;const o=new Ge({});return{c(){n=p("footer"),C(o.$$.fragment),s=h(),l=p("div"),l.innerHTML='\n    GitHub repo:\n    <a class="db svelte-1c8mroz" href="https://github.com/rplus/PvP-moves">https://github.com/rplus/PvP-moves</a>\n    Database:\n    <a class="db svelte-1c8mroz" href="https://pvpoketw.com/">https://pvpoketw.com/</a>\n    Relesed with:\n    <a href="https://opensource.org/licenses/MIT">MIT license</a>',y(l,"class","page-intro svelte-1c8mroz"),y(n,"class","footer df ai-fe svelte-1c8mroz")},m(t,e){u(t,n,e),J(o,n,null),a(n,s),a(n,l),r=!0},p:t,i(t){r||(E(o.$$.fragment,t),r=!0)},o(t){G(o.$$.fragment,t),r=!1},d(t){t&&f(n),R(o)}}}class qe extends W{constructor(t){super(),V(this,t,null,Ne,r,{})}}function Ce(t){let e;const n=new ke({props:{pm:t[0]}});return{c(){C(n.$$.fragment)},m(t,s){J(n,t,s),e=!0},p(t,e){const s={};1&e&&(s.pm=t[0]),n.$set(s)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){G(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function Je(t){let e,n,s,l,r,o,c,i,d;const m=new zt({});let g=t[0]&&Ce(t);const $=new Se({}),v=new Ae({}),b=new qe({});return{c(){e=p("div"),n=p("div"),s=p("h1"),s.textContent="PvP Moves in Pokémon GO",l=h(),C(m.$$.fragment),r=h(),g&&g.c(),o=h(),C($.$$.fragment),c=h(),C(v.$$.fragment),i=h(),C(b.$$.fragment),y(s,"class","h1"),y(n,"class","workspace-in"),y(e,"class","workspace"),x(e,"darktheme",t[1].darktheme),x(e,"gridview",t[1].gridview)},m(t,f){u(t,e,f),a(e,n),a(n,s),a(n,l),J(m,n,null),a(n,r),g&&g.m(n,null),a(n,o),J($,n,null),a(n,c),J(v,n,null),a(e,i),J(b,e,null),d=!0},p(t,[s]){t[0]?g?(g.p(t,s),E(g,1)):(g=Ce(t),g.c(),E(g,1),g.m(n,o)):g&&(A(),G(g,1,1,()=>{g=null}),B()),2&s&&x(e,"darktheme",t[1].darktheme),2&s&&x(e,"gridview",t[1].gridview)},i(t){d||(E(m.$$.fragment,t),E(g),E($.$$.fragment,t),E(v.$$.fragment,t),E(b.$$.fragment,t),d=!0)},o(t){G(m.$$.fragment,t),G(g),G($.$$.fragment,t),G(v.$$.fragment,t),G(b.$$.fragment,t),d=!1},d(t){t&&f(e),R(m),g&&g.d(),R($),R(v),R(b)}}}function Re(t,e,n){let s,l,r,c;return o(t,mt,t=>n(2,s=t)),o(t,dt,t=>n(3,l=t)),o(t,yt,t=>n(1,r=t)),t.$$.update=()=>{12&t.$$.dirty&&n(0,c=s.find(t=>t.uid===l))},[c,r]}return new class extends W{constructor(t){super(),V(this,t,Re,Je,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
