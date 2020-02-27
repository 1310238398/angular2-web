/*! Built with http://stenciljs.com */
var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(i,r){function a(e){try{u(o.next(e))}catch(e){r(e)}}function c(e){try{u(o.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(a,c)}u((o=o.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,o,i,r,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function c(r){return function(c){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(i=o[2&r[0]?"return":r[0]?"throw":"next"])&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[0,i.value]),r[0]){case 0:case 1:i=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,o=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){a=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){a.label=r[1];break}if(6===r[0]&&a.label<i[1]){a.label=i[1],i=r;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(r);break}i[2]&&a.ops.pop(),a.trys.pop();continue}r=t.call(e,a)}catch(e){r=[6,e],o=0}finally{n=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,c])}}};App.loadBundle("y26fydl8",["require","exports","./chunk-929bc6d6.js"],function(e,t,n){var o=window.App.h;function i(e){return function(e,t,n){return void 0===n&&(n=!1),e.matchMedia?e.matchMedia("(any-pointer:coarse)").matches:n}(e)}var r=function(){function t(){}return t.prototype.componentDidLoad=function(){!function(t,n){__awaiter(this,void 0,void 0,function(){return __generator(this,function(o){switch(o.label){case 0:return n.getBoolean("inputShims",function(e){return function(e){return function(e,t){return/iPad|iPhone|iPod/i.test(e.navigator.userAgent)}(e)}(e)&&i(e)}(t))?[4,new Promise(function(t,n){e(["./input-shims.js"],t,n)})]:[3,2];case 1:o.sent().startInputShims(t.document,n),o.label=2;case 2:return[2]}})})}(this.win,this.config)},t.prototype.hostData=function(){var e,t,n,o=function(e){var t=e;return!!(t.cordova||t.phonegap||t.PhoneGap)}(t=this.win)||!(!(n=t.Capacitor)||!n.isNative),i=this.config.getBoolean("statusbarPadding",o);return{class:(e={},e[this.mode]=!0,e["statusbar-padding"]=i,e)}},t.prototype.render=function(){var e=this.config.getBoolean("isDevice",i(this.win));return[o("ion-tap-click",null),e&&o("ion-status-tap",null),o("slot",null)]},Object.defineProperty(t,"is",{get:function(){return"ion-app"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"host",{get:function(){return{theme:"app"}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{config:{context:"config"},el:{elementRef:!0},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"audio,canvas,progress,video{vertical-align:baseline}audio:not([controls]){display:none;height:0}b,strong{font-weight:700}img{max-width:100%;border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{height:1px;border-width:0;-webkit-box-sizing:content-box;box-sizing:content-box}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}input,label,select,textarea{font-family:inherit;line-height:normal}textarea{overflow:auto;height:auto;font:inherit;color:inherit}textarea::-webkit-input-placeholder{padding-left:2px}textarea:-ms-input-placeholder{padding-left:2px}textarea::-ms-input-placeholder{padding-left:2px}textarea::placeholder{padding-left:2px}form,input,optgroup,select{margin:0;font:inherit;color:inherit}html input[type=button],input[type=reset],input[type=submit]{cursor:pointer;-webkit-appearance:button}[tappable],[tappable] div,[tappable] ion-icon,[tappable] ion-label,[tappable] span,a,a div,a ion-icon,a ion-label,a span,button,button div,button ion-icon,button ion-label,button span,input,textarea{-ms-touch-action:manipulation;touch-action:manipulation}a ion-label,button ion-label{pointer-events:none}button{border:0;border-radius:0;font-family:inherit;font-style:inherit;font-variant:inherit;line-height:1;text-transform:none;cursor:pointer;-webkit-appearance:button}[tappable]{cursor:pointer}a[disabled],button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}input[type=checkbox],input[type=radio]{padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}.hide,[hidden],template{display:none!important}.sticky{position:-webkit-sticky;position:sticky;top:0}.click-block{display:none}.click-block-enabled{left:0;right:0;top:0;bottom:0;-webkit-transform:translate3d(0,-100%,0) translateY(1px);transform:translate3d(0,-100%,0) translateY(1px);position:absolute;z-index:99999;display:block;opacity:0;contain:strict}.click-block-active{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}*{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}html{width:100%;height:100%;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}body{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin:0;padding:0;position:fixed;overflow:hidden;width:100%;max-width:100%;height:100%;max-height:100%;text-rendering:optimizeLegibility;-webkit-user-drag:none;-ms-content-zooming:none;-ms-touch-action:manipulation;touch-action:manipulation;word-wrap:break-word;overscroll-behavior-y:contain;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a{background-color:transparent;color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}a:not(.button):hover{opacity:.7}h1,h2,h3,h4,h5,h6{margin-top:16px;margin-bottom:10px;font-weight:500;line-height:1.2}h1{margin-top:20px;font-size:26px}h2{margin-top:18px;font-size:24px}h3{font-size:22px}h4{font-size:20px}h5{font-size:18px}h6{font-size:16px}small{font-size:75%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}.ion-page,ion-app,ion-nav,ion-router-outlet,ion-tab,ion-tabs{left:0;right:0;top:0;bottom:0;position:absolute;z-index:0;overflow:hidden;contain:layout size style}.ion-page,ion-app{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.hide-page{opacity:0}.nav-decor{display:none}.show-decor>.nav-decor{left:0;right:0;top:0;bottom:0;position:absolute;z-index:0;display:block;background:#000;pointer-events:none}[app-viewport],[nav-viewport],[overlay-portal],[tab-portal],ion-action-sheet-controller,ion-alert-controller,ion-animation-controller,ion-input-shims,ion-loading-controller,ion-menu-controller,ion-modal-controller,ion-nav-controller,ion-picker-controller,ion-route,ion-route-controller,ion-status-tap,ion-tap-click,ion-toast-controller{display:none}[text-center]{text-align:center!important}[text-justify]{text-align:justify!important}[text-start]{text-align:left;text-align:start!important}[text-end]{text-align:right;text-align:end!important}[text-left]{text-align:left!important}[text-right]{text-align:right!important}[text-nowrap]{white-space:nowrap!important}[text-wrap]{white-space:normal!important}[text-uppercase]{text-transform:uppercase!important}[text-lowercase]{text-transform:lowercase!important}[text-capitalize]{text-transform:capitalize!important}[float-left],[float-start]{float:left!important}[float-end],[float-right]{float:right!important}\@media (min-width:576px){[text-sm-center]{text-align:center!important}[text-sm-justify]{text-align:justify!important}[text-sm-start]{text-align:left;text-align:start!important}[text-sm-end]{text-align:right;text-align:end!important}[text-sm-left]{text-align:left!important}[text-sm-right]{text-align:right!important}[text-sm-nowrap]{white-space:nowrap!important}[text-sm-wrap]{white-space:normal!important}[text-sm-uppercase]{text-transform:uppercase!important}[text-sm-lowercase]{text-transform:lowercase!important}[text-sm-capitalize]{text-transform:capitalize!important}[float-sm-left],[float-sm-start]{float:left!important}[float-sm-end],[float-sm-right]{float:right!important}}\@media (min-width:768px){[text-md-center]{text-align:center!important}[text-md-justify]{text-align:justify!important}[text-md-start]{text-align:left;text-align:start!important}[text-md-end]{text-align:right;text-align:end!important}[text-md-left]{text-align:left!important}[text-md-right]{text-align:right!important}[text-md-nowrap]{white-space:nowrap!important}[text-md-wrap]{white-space:normal!important}[text-md-uppercase]{text-transform:uppercase!important}[text-md-lowercase]{text-transform:lowercase!important}[text-md-capitalize]{text-transform:capitalize!important}[float-md-left],[float-md-start]{float:left!important}[float-md-end],[float-md-right]{float:right!important}}\@media (min-width:992px){[text-lg-center]{text-align:center!important}[text-lg-justify]{text-align:justify!important}[text-lg-start]{text-align:left;text-align:start!important}[text-lg-end]{text-align:right;text-align:end!important}[text-lg-left]{text-align:left!important}[text-lg-right]{text-align:right!important}[text-lg-nowrap]{white-space:nowrap!important}[text-lg-wrap]{white-space:normal!important}[text-lg-uppercase]{text-transform:uppercase!important}[text-lg-lowercase]{text-transform:lowercase!important}[text-lg-capitalize]{text-transform:capitalize!important}[float-lg-left],[float-lg-start]{float:left!important}[float-lg-end],[float-lg-right]{float:right!important}}\@media (min-width:1200px){[text-xl-center]{text-align:center!important}[text-xl-justify]{text-align:justify!important}[text-xl-start]{text-align:left;text-align:start!important}[text-xl-end]{text-align:right;text-align:end!important}[text-xl-left]{text-align:left!important}[text-xl-right]{text-align:right!important}[text-xl-nowrap]{white-space:nowrap!important}[text-xl-wrap]{white-space:normal!important}[text-xl-uppercase]{text-transform:uppercase!important}[text-xl-lowercase]{text-transform:lowercase!important}[text-xl-capitalize]{text-transform:capitalize!important}[float-xl-left],[float-xl-start]{float:left!important}[float-xl-end],[float-xl-right]{float:right!important}}ion-app [no-padding],ion-app [no-padding] .scroll-inner{padding:0}ion-app [no-margin],ion-app [no-margin] ion-scroll{margin:0}.app-md{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;background-color:var(--ion-background-md-color,var(--ion-background-color,#fff))}.app-md ion-tabs ion-tabbar:not(.placement-top){padding-bottom:calc(env(safe-area-inset-bottom) + 0);height:calc(56px + env(safe-area-inset-bottom))}.app-md ion-footer .toolbar:last-child{padding-bottom:calc(env(safe-area-inset-bottom) + 4px);min-height:calc(56px + constant(safe-area-inset-bottom));min-height:calc(56px + env(safe-area-inset-bottom))}.app-md.statusbar-padding .ion-page>.toolbar:first-child,.app-md.statusbar-padding .ion-page>ion-header>.toolbar:first-child,.app-md.statusbar-padding ion-menu>.menu-inner>.toolbar:first-child,.app-md.statusbar-padding ion-menu>.menu-inner>ion-header>.toolbar:first-child,.app-md.statusbar-padding ion-tab ion-nav .ion-page>ion-header>.toolbar:first-child{padding-top:calc(env(safe-area-inset-top) + 4px);min-height:calc(56px + 20px);min-height:calc(56px + constant(safe-area-inset-top));min-height:calc(56px + env(safe-area-inset-top))}.app-md.statusbar-padding .ion-page>ion-content:first-child ion-scroll,.app-md.statusbar-padding .ion-page>ion-header>ion-content:first-child ion-scroll,.app-md.statusbar-padding ion-menu>.menu-inner>ion-content:first-child ion-scroll,.app-md.statusbar-padding ion-menu>.menu-inner>ion-header>ion-content:first-child ion-scroll,.app-md.statusbar-padding ion-tab ion-nav .ion-page>ion-header>ion-content:first-child ion-scroll{padding-top:20px;padding-top:calc(env(safe-area-inset-top) + 0px)}.app-md [padding],.app-md [padding] .scroll-inner{padding:16px}.app-md [padding-top],.app-md [padding-top] .scroll-inner{padding-top:16px}.app-md [padding-left],.app-md [padding-left] .scroll-inner{padding-left:16px}.app-md [padding-right],.app-md [padding-right] .scroll-inner{padding-right:16px}.app-md [padding-bottom],.app-md [padding-bottom] .scroll-inner{padding-bottom:16px}.app-md [padding-vertical],.app-md [padding-vertical] .scroll-inner{padding-top:16px;padding-bottom:16px}.app-md [padding-horizontal],.app-md [padding-horizontal] .scroll-inner{padding-left:16px;padding-right:16px}.app-md [margin],.app-md [margin] .scroll-inner{margin:16px}.app-md [margin-top],.app-md [margin-top] .scroll-inner{margin-top:16px}.app-md [margin-left],.app-md [margin-left] .scroll-inner,.app-md [margin-start],.app-md [margin-start] .scroll-inner{margin-left:16px}.app-md [margin-end],.app-md [margin-end] .scroll-inner,.app-md [margin-right],.app-md [margin-right] .scroll-inner{margin-right:16px}.app-md [margin-bottom],.app-md [margin-bottom] .scroll-inner{margin-bottom:16px}.app-md [margin-vertical],.app-md [margin-vertical] .scroll-inner{margin-top:16px;margin-bottom:16px}.app-md [margin-horizontal],.app-md [margin-horizontal] .scroll-inner{margin-left:16px;margin-right:16px}"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),t}(),a=function(){function e(){this.duration=300}return e.prototype.onStatusTap=function(){var e=this;this.queue.read(function(){var t=e.win.innerWidth,n=e.win.innerWidth,o=e.win.document.elementFromPoint(t/2,n/2);if(o){var i=o.closest("ion-scroll");i&&i.componentOnReady().then(function(){e.queue.write(function(){i.scrollToTop(e.duration)})})}})},Object.defineProperty(e,"is",{get:function(){return"ion-status-tap"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{duration:{type:Number,attr:"duration"},queue:{context:"queue"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"window:statusTap",method:"onStatusTap"}]},enumerable:!0,configurable:!0}),e}(),c=function(){function e(){this.lastTouch=10*-p,this.lastActivated=0,this.cancelled=!1,this.clearDefers=new WeakMap}return e.prototype.onBodyClick=function(e){this.cancelled&&(e.preventDefault(),e.stopPropagation())},e.prototype.onTouchStart=function(e){this.lastTouch=n.now(e),this.pointerDown(e)},e.prototype.onTouchEnd=function(e){this.lastTouch=n.now(e),this.pointerUp(e)},e.prototype.onMouseDown=function(e){var t=n.now(e)-p;this.lastTouch<t&&this.pointerDown(e)},e.prototype.onMouseUp=function(e){var t=n.now(e)-p;this.lastTouch<t&&this.pointerUp(e)},e.prototype.cancelActive=function(){clearTimeout(this.activeDefer),this.activatableEle&&(this.removeActivated(!1),this.activatableEle=void 0),this.cancelled=!0},e.prototype.pointerDown=function(e){this.activatableEle||(this.cancelled=!1,this.setActivatedElement(e.target.closest("a,button,[tappable]"),e))},e.prototype.pointerUp=function(e){this.setActivatedElement(void 0,e),this.cancelled&&e.cancelable&&e.preventDefault()},e.prototype.setActivatedElement=function(e,t){var o=this,i=this.activatableEle;if(!e||e!==i){clearTimeout(this.activeDefer),this.activeDefer=void 0;var r=n.pointerCoord(t),a=r.x,c=r.y;if(i){if(this.clearDefers.has(i))throw new Error("internal error");i.classList.contains(u)||this.addActivated(i,a,c),this.removeActivated(!0)}if(e){var l=this.clearDefers.get(e);l&&(clearTimeout(l),this.clearDefers.delete(e)),e.classList.remove(u),this.activeDefer=setTimeout(function(){o.addActivated(e,a,c),o.activeDefer=void 0},s)}this.activatableEle=e}},e.prototype.addActivated=function(e,t,n){this.lastActivated=Date.now(),e.classList.add(u);var o=new CustomEvent("ionActivated",{bubbles:!1,detail:{x:t,y:n}});e.dispatchEvent(o)},e.prototype.removeActivated=function(e){var t=this,n=this.activatableEle;if(n){var o=l-Date.now()+this.lastActivated;if(e&&o>0){var i=setTimeout(function(){n.classList.remove(u),t.clearDefers.delete(n)},l);this.clearDefers.set(n,i)}else n.classList.remove(u)}},Object.defineProperty(e,"is",{get:function(){return"ion-tap-click"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{el:{elementRef:!0},enableListener:{context:"enableListener"},isServer:{context:"isServer"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"body:click",method:"onBodyClick",capture:!0},{name:"document:touchstart",method:"onTouchStart",capture:!0,passive:!0},{name:"document:touchcancel",method:"onTouchEnd",capture:!0},{name:"document:touchend",method:"onTouchEnd",capture:!0},{name:"document:mousedown",method:"onMouseDown",capture:!0,passive:!0},{name:"document:mouseup",method:"onMouseUp",capture:!0},{name:"body:ionScrollStart",method:"cancelActive"},{name:"body:ionGestureCaptured",method:"cancelActive"}]},enumerable:!0,configurable:!0}),e}(),u="activated",s=200,l=200,p=2500;t.IonApp=r,t.IonStatusTap=a,t.IonTapClick=c,Object.defineProperty(t,"__esModule",{value:!0})});