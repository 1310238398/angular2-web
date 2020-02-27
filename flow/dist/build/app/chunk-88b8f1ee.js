/*! Built with http://stenciljs.com */
const{h:e}=window.App;var n="/",t="./",r=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function i(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function o(e){return e.replace(/([=!:$/()])/g,"\\$1")}function a(e){return e&&e.sensitive?"":"i"}function s(e,c,u){return e instanceof RegExp?function(e,n){if(!n)return e;var t=e.source.match(/\((?!\?)/g);if(t)for(var r=0;r<t.length;r++)n.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return e}(e,c):Array.isArray(e)?function(e,n,t){for(var r=[],i=0;i<e.length;i++)r.push(s(e[i],n,t).source);return new RegExp("(?:"+r.join("|")+")",a(t))}(e,c,u):function(e,s,c){return function(e,r,o){for(var s=(o=o||{}).strict,c=!1!==o.end,u=i(o.delimiter||n),l=o.delimiters||t,f=[].concat(o.endsWith||[]).map(i).concat("$").join("|"),d="",p=!1,h=0;h<e.length;h++){var g=e[h];if("string"==typeof g)d+=i(g),p=h===e.length-1&&l.indexOf(g[g.length-1])>-1;else{var m=i(g.prefix),v=g.repeat?"(?:"+g.pattern+")(?:"+m+"(?:"+g.pattern+"))*":g.pattern;r&&r.push(g),g.optional?g.partial?d+=m+"("+v+")?":d+="(?:"+m+"("+v+"))?":d+=m+"("+v+")"}}return c?(s||(d+="(?:"+u+")?"),d+="$"===f?"$":"(?="+f+")"):(s||(d+="(?:"+u+"(?="+f+"))?"),p||(d+="(?="+u+"|"+f+")")),new RegExp("^"+d,a(o))}(function(e,a){for(var s,c=[],u=0,l=0,f="",d=a&&a.delimiter||n,p=a&&a.delimiters||t,h=!1;null!==(s=r.exec(e));){var g=s[0],m=s[1],v=s.index;if(f+=e.slice(l,v),l=v+g.length,m)f+=m[1],h=!0;else{var w="",x=e[l],y=s[2],O=s[3],E=s[4],b=s[5];if(!h&&f.length){var A=f.length-1;p.indexOf(f[A])>-1&&(w=f[A],f=f.slice(0,A))}f&&(c.push(f),f="",h=!1);var j=""!==w&&void 0!==x&&x!==w,S="+"===b||"*"===b,$="?"===b||"*"===b,_=w||d,R=O||E;c.push({name:y||u++,prefix:w,delimiter:_,optional:$,repeat:S,partial:j,pattern:R?o(R):"[^"+i(_)+"]+?"})}}return(f||l<e.length)&&c.push(f+e.substr(l)),c}(e,c),s,c)}(e,c,u)}const c={},u=1e4;let l=0;function f(e,n={}){"string"==typeof n&&(n={path:n});const{path:t="/",exact:r=!1,strict:i=!1}=n,{re:o,keys:a}=function(e,n){const t=`${n.end}${n.strict}`,r=c[t]||(c[t]={}),i=JSON.stringify(e);if(r[i])return r[i];const o=[],a={re:s(e,o,n),keys:o};return l<u&&(r[i]=a,l+=1),a}(t,{end:r,strict:i}),f=o.exec(e);if(!f)return null;const[d,...p]=f,h=e===d;return r&&!h?null:{path:t,url:"/"===t&&""===d?"/":d,isExact:h,params:a.reduce((e,n,t)=>(e[n.name]=p[t],e),{})}}var d=function(n,t=function(n,t){return e("context-consumer",{subscribe:n,renderer:t})}){let r=new Map,i={location:null,titleSuffix:"",root:"/",history:null,subscribeGroupMember:()=>{},createSubscriptionGroup:()=>{}};function o(e,n){Array.isArray(e)?[...e].forEach(e=>{n[e]=i[e]}):n[e]=Object.assign({},i),n.forceUpdate()}function a(e){return n=>{r.has(n)||(r.set(n,e),o(e,n))}}function s(e,n){return a(n)(e),function(){r.delete(e)}}return{Provider:function({state:e,children:n}){return i=e,r.forEach(o),n},Consumer:function({children:e}){return t(s,e[0])},wrapConsumer:function(n,t){const r=n.is;return n=>{var{children:i}=n,o=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&(t[r[i]]=e[r[i]])}return t}(n,["children"]);return e(r,Object.assign({ref:a(t)},o),i)}},injectProps:function(e,n){let t=null;const r=e.prototype.componentWillLoad;e.prototype.componentWillLoad=function(){if(t=s(this.el,n),r)return r.bind(this)()};const i=e.prototype.componentDidUnload;e.prototype.componentDidUnload=function(){if(t(),i)return i.bind(this)()}}}}();const p=!("undefined"==typeof window||!window.document||!window.document.createElement),h=(e,n,t)=>e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent("on"+n,t),g=(e,n,t)=>e.removeEventListener?e.removeEventListener(n,t,!1):e.detachEvent("on"+n,t),m=(e,n)=>n(window.confirm(e)),v=e=>e.metaKey||e.altKey||e.ctrlKey||e.shiftKey,w=()=>{const e=window.navigator.userAgent;return(-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history},x=()=>-1===window.navigator.userAgent.indexOf("Trident"),y=()=>-1===window.navigator.userAgent.indexOf("Firefox"),O=e=>void 0===e.state&&-1===navigator.userAgent.indexOf("CriOS"),E=e=>{try{var n=window[e],t="__storage_test__";return n.setItem(t,t),n.removeItem(t),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0!==n.length}};export{f as a,d as b,E as c,p as d,h as e,g as f,m as g,w as h,x as i,O as j,y as k,v as l};