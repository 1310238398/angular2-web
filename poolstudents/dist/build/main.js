webpackJsonp([8],{108:function(e,t,o){"use strict";o.d(t,"a",function(){return p});o(7);var a=o(87),n=o(195),r=o(229),s=(o.n(r),o(230)),p=(o.n(s),function(){function e(e){this.http=e,this.baseUrl=n.a.Url.apiUrl,this.fileUrl=n.a.Url.fileUrl,this.AccessTokenL="QRVA9UKWONMTWGCOQNW4JW"}return e.prototype.responseToJson=function(e){return e||void 0},e.prototype.post=function(e,t){var o=this;void 0===t&&(t=this.baseUrl),this.AccessTokenL=window.__AppWebkey;var n=new a.g({"Content-Type":"application/json",AccessToken:this.AccessTokenL});return this.http.post(t,e||null,{headers:n}).toPromise().then(function(e){return o.responseToJson(e)}).catch(this.catchAuthError)},e.prototype.postJSON=function(e,t){var o=this;void 0===t&&(t=this.baseUrl);var n=new a.g({"Content-Type":"application/json",AccessToken:window.__AppWebkey||this.AccessTokenL});return this.http.post(t,JSON.stringify({Router:e.Router,Method:e.Method||"GET",Body:JSON.stringify(e.Body)}||null),{headers:n}).toPromise().then(function(e){return o.responseToJson(e)}).catch(this.catchAuthError)},e.prototype.postFormData=function(e,t,o){void 0===o&&(o=this.fileUrl);var a=window.__AppWebkey||this.AccessTokenL,n=new XMLHttpRequest;n.open("POST",o,!0),n.setRequestHeader("AccessToken",a),n.onreadystatechange=function(){4==n.readyState&&200===n.status?t(JSON.parse(n.responseText)):console.log("Http status: "+n.status+" , "+n.statusText)},n.send(e)},e.prototype.postXhr=function(e,t,o){void 0===o&&(o=this.baseUrl);var a=window.__AppWebkey||this.AccessTokenL,n=new XMLHttpRequest;return n.open("POST",o,!1),n.setRequestHeader("AccessToken",a),n.send(JSON.stringify({Router:e.Router,Method:e.Method||"GET",Body:JSON.stringify(e.Body)}||null)),4==n.readyState&&200===n.status?t(JSON.parse(n.responseText)):(console.log("Http status: "+n.status+" , "+n.statusText),"")},e.prototype.catchAuthError=function(e){if(console.log(e),401===e.status||403===e.status){var t=void 0;if(e instanceof Response){var o=void 0;t=e.status+":"+(e.statusText||"")+" "+o}console.log(t)}return Promise.reject(e)},e}())},109:function(e,t,o){"use strict";o.d(t,"a",function(){return n});o(7),o(107);var a=o(231),n=(o.n(a),function(){function e(e,t,o,a){this.modalCtrl=e,this.alertCtrl=t,this.Loading=o,this.toastCtrl=a}return e.prototype.alert=function(e){this.alertCtrl.create({title:"提示",subTitle:e,buttons:[{text:"确定"}]}).present()},e.prototype.getDays=function(e,t){e=e.replace(/\-/g,"/"),t=t.replace(/\-/g,"/");var o=new Date(e),a=(new Date(t).getTime()-o.getTime())/864e5,n=+a.toString().replace(/^[^\.]+/,"0");return 0==n?Math.floor(a):n>.5?Math.floor(a)+1:Math.floor(a)+.5},e.prototype.getWeekDay=function(e){var t;switch(parseInt(moment(e).format("d"))){case 0:t="周日";break;case 1:t="周一";break;case 2:t="周二";break;case 3:t="周三";break;case 4:t="周四";break;case 5:t="周五";break;case 6:t="周六"}return t},e.prototype.loadingPop=function(e){var t=this.Loading.create({content:e});return t.present(),t},e.prototype.toastPop=function(e){var t=this.toastCtrl.create({message:e,duration:1500,cssClass:"zj-t-center",position:"middle"});return t.present(),t},e.prototype.toastPopTop=function(e){var t=this.toastCtrl.create({message:e,duration:1500,cssClass:"zj-t-center",position:"top"});return t.present(),t},e.prototype.presentAlert=function(e){console.log(e.enableBackdropDismiss);var t=this.alertCtrl.create({title:e.title||"",enableBackdropDismiss:e.enableBackdropDismiss,subTitle:e.subTitle||"",buttons:e.buttons||[]});return t.present(),t},e.prototype.modal=function(e,t){var o=this.modalCtrl.create(e,t);return o.present(),o},e.prototype.compress=function(e,t){var o=document.createElement("img");o.src=e;var a=document.createElement("canvas"),n=o.width,r=o.height,s=a.getContext("2d"),p=n,i=r,l=n,d=r;t=t;a.width=n,a.height=r,s.drawImage(o,0,0,p,i,0,0,l,d),e.length<=204800&&(t=.92);return a.toDataURL("image/jpeg",t)},e.prototype.base64toBlob=function(e){var t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):Object(a.unescape)(e.split(",")[1]);for(var o=e.split(",")[0].split(":")[1].split(";")[0],n=new Uint8Array(t.length),r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return new Blob([n],{type:o})},e}())},126:function(e,t){function o(e){return Promise.resolve().then(function(){throw new Error("Cannot find module '"+e+"'.")})}o.keys=function(){return[]},o.resolve=o,e.exports=o,o.id=126},159:function(e,t,o){function a(e){var t=n[e];return t?o.e(t[1]).then(function(){return o(t[0])}):Promise.reject(new Error("Cannot find module '"+e+"'."))}var n={"../pages/changetale/changetale.module.ngfactory":[235,6],"../pages/help/help.module.ngfactory":[236,5],"../pages/index/index.module.ngfactory":[237,4],"../pages/preview/preview.module.ngfactory":[238,3],"../pages/promisebookone/promisebookone.module.ngfactory":[239,2],"../pages/promisebooktwo/promisebooktwo.module.ngfactory":[240,0],"../pages/speak/speak.module.ngfactory":[241,1],"../pages/uploadingtwo/uploadingtwo.module.ngfactory":[242,7]};a.keys=function(){return Object.keys(n)},a.id=159,e.exports=a},195:function(e,t,o){"use strict";o.d(t,"a",function(){return a});var a=function(){function e(){}return e.leavePrefix="/api/leaveflow",e.Url={apiUrl:"/api/staff/interface",fileUrl:"/api/staff/file",UserIcon:"/api/apiofbasic/queryusericon",getUpToken:"/api/fproof/appget",substatus:"/api/poorstudent/substatus",getsign:"/api/poorstudent/getsign",saveattach:"/api/system/saveattach",upattachcaption:"/api/poorstudent/upattachcaption",threesub:"/api/poorstudent/sub",poorsaveattach:"/api/poorstudent/saveattach",GetModifyReason:"/api/poorstudent/GetModifyReason",SaveModifyReason:"/api/poorstudent/SaveModifyReason",DelModifyReason:"/api/poorstudent/DelModifyReason",QueryUp:"/api/poorstudent/QueryUp"},e}()},196:function(e,t,o){"use strict";function a(e){return r["ɵvid"](0,[(e()(),r["ɵeld"](0,0,null,null,2,"ion-nav",[],null,null,null,w.b,w.a)),r["ɵprd"](6144,null,T.a,null,[P.a]),r["ɵdid"](2,4374528,[["myNav",4]],0,P.a,[[2,C.a],[2,A.a],R.a,M.a,N.a,r.ElementRef,r.NgZone,r.Renderer,r.ComponentFactoryResolver,I.l,O.a,[2,S.a],U.a,r.ErrorHandler],{root:[0,"root"]},null),(e()(),r["ɵted"](-1,null,["\n"]))],function(e,t){e(t,2,0,t.component.rootPage)},null)}Object.defineProperty(t,"__esModule",{value:!0});var n=o(31),r=o(0),s=(o(7),o(107),function(){return function(){this.rootPage="IndexPage"}}()),p=o(109),i=o(108),l=o(87),d=function(){return function(){}}(),u=o(40),c=o(186),m=o(187),g=o(188),f=o(189),y=o(190),h=o(191),b=o(192),v=o(193),k=o(194),w=o(234),T=o(33),P=o(47),C=o(4),A=o(20),R=o(8),M=o(1),N=o(3),I=o(6),O=o(28),S=o(12),U=o(9),E=r["ɵcrt"]({encapsulation:2,styles:[],data:{}}),F=r["ɵccf"]("ng-component",s,function(e){return r["ɵvid"](0,[(e()(),r["ɵeld"](0,0,null,null,1,"ng-component",[],null,null,null,a,E)),r["ɵdid"](1,49152,null,0,s,[],null,null)],null,null)},{},{},[]),L=o(13),x=o(89),H=o(16),j=o(77),D=o(69),_=o(88),B=o(15),J=o(30),Z=o(34),W=o(85),q=o(110),X=o(42),G=o(35),K=o(93),Q=o(55),z=o(97),V=o(91),Y=o(70),$=o(185),ee=o(90),te=o(26),oe=o(86),ae=o(92),ne=r["ɵcmf"](d,[u.b],function(e){return r["ɵmod"]([r["ɵmpd"](512,r.ComponentFactoryResolver,r["ɵCodegenComponentFactoryResolver"],[[8,[c.a,m.a,g.a,f.a,y.a,h.a,b.a,v.a,k.a,F]],[3,r.ComponentFactoryResolver],r.NgModuleRef]),r["ɵmpd"](5120,r.LOCALE_ID,r["ɵm"],[[3,r.LOCALE_ID]]),r["ɵmpd"](4608,L.k,L.j,[r.LOCALE_ID,[2,L.s]]),r["ɵmpd"](5120,r.APP_ID,r["ɵf"],[]),r["ɵmpd"](5120,r.IterableDiffers,r["ɵk"],[]),r["ɵmpd"](5120,r.KeyValueDiffers,r["ɵl"],[]),r["ɵmpd"](4608,n.c,n.q,[L.c]),r["ɵmpd"](6144,r.Sanitizer,null,[n.c]),r["ɵmpd"](4608,n.f,x.a,[]),r["ɵmpd"](5120,n.d,function(e,t,o,a,r){return[new n.k(e,t),new n.o(o),new n.n(a,r)]},[L.c,r.NgZone,L.c,L.c,n.f]),r["ɵmpd"](4608,n.e,n.e,[n.d,r.NgZone]),r["ɵmpd"](135680,n.m,n.m,[L.c]),r["ɵmpd"](4608,n.l,n.l,[n.e,n.m]),r["ɵmpd"](6144,r.RendererFactory2,null,[n.l]),r["ɵmpd"](6144,n.p,null,[n.m]),r["ɵmpd"](4608,r.Testability,r.Testability,[r.NgZone]),r["ɵmpd"](4608,n.h,n.h,[L.c]),r["ɵmpd"](4608,n.i,n.i,[L.c]),r["ɵmpd"](4608,l.i,l.n,[L.c,r.PLATFORM_ID,l.l]),r["ɵmpd"](4608,l.o,l.o,[l.i,l.m]),r["ɵmpd"](5120,l.a,function(e){return[e]},[l.o]),r["ɵmpd"](4608,l.k,l.k,[]),r["ɵmpd"](6144,l.j,null,[l.k]),r["ɵmpd"](4608,l.h,l.h,[l.j]),r["ɵmpd"](6144,l.b,null,[l.h]),r["ɵmpd"](5120,l.f,l.p,[l.b,[2,l.a]]),r["ɵmpd"](4608,l.c,l.c,[l.f]),r["ɵmpd"](4608,H.m,H.m,[]),r["ɵmpd"](4608,H.c,H.c,[]),r["ɵmpd"](4608,j.a,j.a,[R.a,M.a]),r["ɵmpd"](4608,D.a,D.a,[R.a,M.a]),r["ɵmpd"](4608,_.a,_.a,[]),r["ɵmpd"](4608,B.a,B.a,[]),r["ɵmpd"](4608,J.a,J.a,[N.a]),r["ɵmpd"](4608,Z.a,Z.a,[M.a,N.a,r.NgZone,U.a]),r["ɵmpd"](4608,W.a,W.a,[R.a,M.a]),r["ɵmpd"](5120,L.f,q.c,[L.q,[2,L.a],M.a]),r["ɵmpd"](4608,L.e,L.e,[L.f]),r["ɵmpd"](5120,X.b,X.d,[R.a,X.a]),r["ɵmpd"](5120,S.a,S.b,[R.a,X.b,L.e,G.b,r.ComponentFactoryResolver]),r["ɵmpd"](4608,K.a,K.a,[R.a,M.a,S.a]),r["ɵmpd"](4608,Q.a,Q.a,[R.a,M.a]),r["ɵmpd"](4608,z.a,z.a,[R.a,M.a,S.a]),r["ɵmpd"](4608,V.a,V.a,[M.a,N.a,U.a,R.a,I.l]),r["ɵmpd"](4608,Y.a,Y.a,[R.a,M.a]),r["ɵmpd"](4608,O.a,O.a,[N.a,M.a]),r["ɵmpd"](4608,i.a,i.a,[l.c]),r["ɵmpd"](4608,p.a,p.a,[K.a,D.a,W.a,Y.a]),r["ɵmpd"](512,L.b,L.b,[]),r["ɵmpd"](512,r.ErrorHandler,$.a,[]),r["ɵmpd"](256,M.b,{mode:"ios",iconMode:"ios",preloadModules:!0},[]),r["ɵmpd"](1024,ee.a,ee.b,[]),r["ɵmpd"](1024,N.a,N.b,[n.b,ee.a,r.NgZone]),r["ɵmpd"](1024,M.a,M.c,[M.b,N.a]),r["ɵmpd"](512,U.a,U.a,[N.a]),r["ɵmpd"](512,te.a,te.a,[]),r["ɵmpd"](512,R.a,R.a,[M.a,N.a,[2,te.a]]),r["ɵmpd"](512,I.l,I.l,[R.a]),r["ɵmpd"](256,X.a,{links:[{loadChildren:"../pages/changetale/changetale.module.ngfactory#ChangeTalePageModuleNgFactory",name:"ChangeTalePage",segment:"changetale",priority:"low",defaultHistory:[]},{loadChildren:"../pages/help/help.module.ngfactory#HelpPageModuleNgFactory",name:"HelpPage",segment:"help",priority:"low",defaultHistory:[]},{loadChildren:"../pages/index/index.module.ngfactory#IndexPageModuleNgFactory",name:"IndexPage",segment:"index",priority:"low",defaultHistory:[]},{loadChildren:"../pages/preview/preview.module.ngfactory#PreviewPageModuleNgFactory",name:"PreviewPage",segment:"preview",priority:"low",defaultHistory:[]},{loadChildren:"../pages/promisebookone/promisebookone.module.ngfactory#PromiseBookOneModuleNgFactory",name:"PromiseBookOnePage",segment:"promisebookone",priority:"low",defaultHistory:[]},{loadChildren:"../pages/promisebooktwo/promisebooktwo.module.ngfactory#PromiseBookTwoModuleNgFactory",name:"PromiseBookTwoPage",segment:"promisebooktwo",priority:"low",defaultHistory:[]},{loadChildren:"../pages/speak/speak.module.ngfactory#SpeakPageModuleNgFactory",name:"SpeakPage",segment:"speak",priority:"low",defaultHistory:[]},{loadChildren:"../pages/uploadingtwo/uploadingtwo.module.ngfactory#UploadingTwoPageModuleNgFactory",name:"UploadingTwoPage",segment:"uploadingtwo",priority:"low",defaultHistory:[]}]},[]),r["ɵmpd"](512,r.Compiler,r.Compiler,[]),r["ɵmpd"](512,oe.a,oe.a,[r.Compiler]),r["ɵmpd"](1024,G.b,G.c,[oe.a,r.Injector]),r["ɵmpd"](1024,r.APP_INITIALIZER,function(e,t,o,a,r,s,p,i,l,d,u,c,m){return[n.s(e),ae.a(t),_.b(o,a),V.b(r,s,p,i,l),G.d(d,u,c,m)]},[[2,r.NgProbeToken],M.a,N.a,U.a,M.a,N.a,U.a,R.a,I.l,M.a,X.a,G.b,r.NgZone]),r["ɵmpd"](512,r.ApplicationInitStatus,r.ApplicationInitStatus,[[2,r.APP_INITIALIZER]]),r["ɵmpd"](131584,r.ApplicationRef,r.ApplicationRef,[r.NgZone,r["ɵConsole"],r.Injector,r.ErrorHandler,r.ComponentFactoryResolver,r.ApplicationInitStatus]),r["ɵmpd"](512,r.ApplicationModule,r.ApplicationModule,[r.ApplicationRef]),r["ɵmpd"](512,n.a,n.a,[[3,n.a]]),r["ɵmpd"](512,l.e,l.e,[]),r["ɵmpd"](512,l.d,l.d,[]),r["ɵmpd"](512,H.l,H.l,[]),r["ɵmpd"](512,H.d,H.d,[]),r["ɵmpd"](512,H.k,H.k,[]),r["ɵmpd"](512,q.a,q.a,[]),r["ɵmpd"](512,d,d,[]),r["ɵmpd"](256,l.l,"XSRF-TOKEN",[]),r["ɵmpd"](256,l.m,"X-XSRF-TOKEN",[]),r["ɵmpd"](256,u.a,s,[]),r["ɵmpd"](256,L.a,"/",[])])});Object(r.enableProdMode)(),Object(n.j)().bootstrapModuleFactory(ne)}},[196]);