webpackJsonp([14],{110:function(e,a,t){"use strict";t.d(a,"a",function(){return l});var l=function(){function e(){}return e.leavePrefix="/api/leaveapplication",e.Url={apiUrl:"/api/staff/interface",fileUrl:"/api/staff/file",UserIcon:"/api/apiofbasic/queryusericon",queryleaverole:e.leavePrefix+"/queryleaverole",queryleavecount:e.leavePrefix+"/queryleavecount",checkremindleave:e.leavePrefix+"/checkremindleave",QueryFakeLeaveCount:e.leavePrefix+"/queryfakeleavecount",queryleavetype:e.leavePrefix+"/queryleavetype",queryleaveoutplace:e.leavePrefix+"/queryleaveoutplace",studentleaveapplication:e.leavePrefix+"/studentleaveapplication",studentreturnapplication:e.leavePrefix+"/recallapply",recallapply:e.leavePrefix+"/recallapply",queryleavestudentmessage:e.leavePrefix+"/queryleavestudentmessage",StudentCancelApplication:e.leavePrefix+"/studentcancelapplication",queryoneleavemessage:e.leavePrefix+"/queryoneleavemessage",StaffNotApprovalHandleLeaveApplication:e.leavePrefix+"/staffnotapprovalhandleleaveapplication",staffnorecall:e.leavePrefix+"/staffnorecall",StaffApprovalHandleFakeLeaveApplication:e.leavePrefix+"/staffapprovalhandlefakeleaveapplication",StaffApprovalHandleLeaveApplication:e.leavePrefix+"/staffapprovalhandleleaveapplication",querystudentleaveapplication:e.leavePrefix+"/queryleave",QueryLeaveApplicationPhoto:e.leavePrefix+"/queryleaveapplicationphoto",getSysParams:"/web/system/parameter/sysparameterauto",QueryCampusLocation:e.leavePrefix+"/querycampuslocationbystudent",QueryUserTaskReasonAndLocation:e.leavePrefix+"/queryusertaskreasonandlocation",saveApply:e.leavePrefix+"/apply",QuerySelfLeaveApplication:e.leavePrefix+"yellowpages/queryselfleaveapplication",getUpToken:"/api/fproof/appget",canApply:e.leavePrefix+"/checksalesleave",onInfo:e.leavePrefix+"/checksalesleave"},e}()},135:function(e,a){function t(e){return Promise.resolve().then(function(){throw new Error("Cannot find module '"+e+"'.")})}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=135},164:function(e,a,t){function l(e){var a=o[e];return a?t.e(a[1]).then(function(){return t(a[0])}):Promise.reject(new Error("Cannot find module '"+e+"'."))}var o={"../pages/other/other-detail/other-detail.module.ngfactory":[237,8],"../pages/other/other-list/other-list.module.ngfactory":[238,6],"../pages/preview/preview.module.ngfactory":[239,13],"../pages/staff/staff-list/staff-list.module.ngfactory":[240,3],"../pages/staff/student-apply-detail/student-apply-detail.module.ngfactory":[241,2],"../pages/staff/unapproved/unapproved.module.ngfactory":[242,12],"../pages/student/apply/leave-apply-detail/leave-apply-detail.module.ngfactory":[243,0],"../pages/student/apply/leave-apply/leave-apply.module.ngfactory":[244,11],"../pages/student/list/list.module.ngfactory":[245,9],"../pages/student/myapply/myapplydetail/myapplydetail.module.ngfactory":[246,1],"../pages/student/myapply/myapplylist/myapply.module.ngfactory":[247,5],"../pages/student/resume/resume-leave-address/resume-leave-address.module.ngfactory":[248,10],"../pages/student/resume/resume-leave-detail/resume-leave-detail.module.ngfactory":[249,4],"../pages/student/resume/resume-leave-list/resume-leave-list.module.ngfactory":[250,7]};l.keys=function(){return Object.keys(o)},l.id=164,e.exports=l},198:function(e,a,t){"use strict";function l(e){return r._22(0,[r._18(402653184,1,{nav:0}),(e()(),r.Z(1,0,null,null,2,"ion-nav",[],null,null,null,k.b,k.a)),r._17(6144,null,w.a,null,[L.a]),r.Y(3,4374528,[[1,4],["myNav",4]],0,L.a,[[2,A.a],[2,x.a],T.a,C.a,M.a,r.j,r.u,r.z,r.i,O.l,S.a,[2,q.a],N.a,r.k],{root:[0,"root"]},null),(e()(),r._20(-1,null,["\n"]))],function(e,a){e(a,3,0,a.component.rootPage)},null)}Object.defineProperty(a,"__esModule",{value:!0});var o=t(31),r=t(0),n=(t(7),t(70),t(50)),s=t(51),i=t(110),p=function(){return function(e,a){var t=this;this.http=e,this.HelpUtils=a,this.http.postJSON({Router:i.a.Url.queryleaverole,Method:"POST",Body:{}}).then(function(e){if(console.log(t.nav),console.log(t.nav._linker),-1!=t.nav._linker._history[0].indexOf("myapplydetailpage")||-1!=t.nav._linker._history[0].indexOf("otherdetailpage")||-1!=t.nav._linker._history[0].indexOf("resumeleavedetail"))return!1;if(e.FeedbackCode)t.HelpUtils.alert(e.FeedbackText);else switch(e.Data.Type){case 1:t.rootPage="StaffListPage";break;case 2:t.rootPage="ListPage";break;case 3:t.rootPage="OtherListPage"}})}}(),u=t(93),d=function(){return function(){}}(),c=t(43),y=t(187),f=t(188),g=t(189),v=t(190),m=t(191),h=t(192),_=t(193),P=t(194),b=t(195),k=t(236),w=t(33),L=t(47),A=t(4),x=t(20),T=t(8),C=t(1),M=t(3),O=t(6),S=t(28),q=t(12),N=t(9),H=r.X({encapsulation:2,styles:[],data:{}}),U=r.V("ng-component",p,function(e){return r._22(0,[(e()(),r.Z(0,0,null,null,1,"ng-component",[],null,null,null,l,H)),r.Y(1,49152,null,0,p,[n.a,s.a],null,null)],null,null)},{},{},[]),F=t(13),R=t(95),D=t(16),j=t(86),B=t(75),J=t(94),E=t(14),W=t(30),X=t(34),I=t(76),Q=t(111),G=t(45),K=t(35),Z=t(99),z=t(54),Y=t(101),V=t(97),$=t(106),ee=t(186),ae=t(96),te=t(26),le=t(92),oe=t(98),re=r.W(d,[c.b],function(e){return r._10([r._11(512,r.i,r.S,[[8,[y.a,f.a,g.a,v.a,m.a,h.a,_.a,P.a,b.a,U]],[3,r.i],r.s]),r._11(5120,r.r,r._9,[[3,r.r]]),r._11(4608,F.k,F.j,[r.r,[2,F.s]]),r._11(5120,r.b,r._0,[]),r._11(5120,r.p,r._6,[]),r._11(5120,r.q,r._7,[]),r._11(4608,o.c,o.q,[F.c]),r._11(6144,r.D,null,[o.c]),r._11(4608,o.f,R.a,[]),r._11(5120,o.d,function(e,a,t,l,r){return[new o.k(e,a),new o.o(t),new o.n(l,r)]},[F.c,r.u,F.c,F.c,o.f]),r._11(4608,o.e,o.e,[o.d,r.u]),r._11(135680,o.m,o.m,[F.c]),r._11(4608,o.l,o.l,[o.e,o.m]),r._11(6144,r.B,null,[o.l]),r._11(6144,o.p,null,[o.m]),r._11(4608,r.G,r.G,[r.u]),r._11(4608,o.h,o.h,[F.c]),r._11(4608,o.i,o.i,[F.c]),r._11(4608,u.i,u.n,[F.c,r.w,u.l]),r._11(4608,u.o,u.o,[u.i,u.m]),r._11(5120,u.a,function(e){return[e]},[u.o]),r._11(4608,u.k,u.k,[]),r._11(6144,u.j,null,[u.k]),r._11(4608,u.h,u.h,[u.j]),r._11(6144,u.b,null,[u.h]),r._11(5120,u.f,u.p,[u.b,[2,u.a]]),r._11(4608,u.c,u.c,[u.f]),r._11(4608,D.r,D.r,[]),r._11(4608,D.d,D.d,[]),r._11(4608,j.a,j.a,[T.a,C.a]),r._11(4608,B.a,B.a,[T.a,C.a]),r._11(4608,J.a,J.a,[]),r._11(4608,E.a,E.a,[]),r._11(4608,W.a,W.a,[M.a]),r._11(4608,X.a,X.a,[C.a,M.a,r.u,N.a]),r._11(4608,I.a,I.a,[T.a,C.a]),r._11(5120,F.f,Q.c,[F.q,[2,F.a],C.a]),r._11(4608,F.e,F.e,[F.f]),r._11(5120,G.b,G.d,[T.a,G.a]),r._11(5120,q.a,q.b,[T.a,G.b,F.e,K.b,r.i]),r._11(4608,Z.a,Z.a,[T.a,C.a,q.a]),r._11(4608,z.a,z.a,[T.a,C.a]),r._11(4608,Y.a,Y.a,[T.a,C.a,q.a]),r._11(4608,V.a,V.a,[C.a,M.a,N.a,T.a,O.l]),r._11(4608,$.a,$.a,[T.a,C.a]),r._11(4608,S.a,S.a,[M.a,C.a]),r._11(4608,n.a,n.a,[u.c]),r._11(4608,s.a,s.a,[Z.a,B.a,I.a,$.a]),r._11(512,F.b,F.b,[]),r._11(512,r.k,ee.a,[]),r._11(256,C.b,{mode:"ios",iconMode:"ios",preloadModules:!0},[]),r._11(1024,ae.a,ae.b,[]),r._11(1024,M.a,M.b,[o.b,ae.a,r.u]),r._11(1024,C.a,C.c,[C.b,M.a]),r._11(512,N.a,N.a,[M.a]),r._11(512,te.a,te.a,[]),r._11(512,T.a,T.a,[C.a,M.a,[2,te.a]]),r._11(512,O.l,O.l,[T.a]),r._11(256,G.a,{links:[{loadChildren:"../pages/other/other-detail/other-detail.module.ngfactory#OtherDetailPageModuleNgFactory",name:"OtherDetailPage",segment:"otherdetailpage/:item",priority:"low",defaultHistory:[]},{loadChildren:"../pages/other/other-list/other-list.module.ngfactory#OtherListPageModuleNgFactory",name:"OtherListPage",segment:"other-list",priority:"low",defaultHistory:[]},{loadChildren:"../pages/preview/preview.module.ngfactory#PreviewPageModuleNgFactory",name:"PreviewPage",segment:"preview",priority:"low",defaultHistory:[]},{loadChildren:"../pages/staff/staff-list/staff-list.module.ngfactory#StaffListPageModuleNgFactory",name:"StaffListPage",segment:"staff-list",priority:"low",defaultHistory:[]},{loadChildren:"../pages/staff/student-apply-detail/student-apply-detail.module.ngfactory#StudentApplyDetailPageModuleNgFactory",name:"StudentApplyDetailPage",segment:"student-apply-detail",priority:"low",defaultHistory:[]},{loadChildren:"../pages/staff/unapproved/unapproved.module.ngfactory#UnapprovedPageModuleNgFactory",name:"UnapprovedPage",segment:"unapproved",priority:"low",defaultHistory:[]},{loadChildren:"../pages/student/apply/leave-apply-detail/leave-apply-detail.module.ngfactory#LeaveApplyDetailPageModuleNgFactory",name:"LeaveApplyDetailPage",segment:"leave-apply-detail",priority:"low",defaultHistory:["ListPage"]},{loadChildren:"../pages/student/apply/leave-apply/leave-apply.module.ngfactory#LeaveApplyDetailPageModuleNgFactory",name:"LeaveApplyPage",segment:"leave-apply",priority:"low",defaultHistory:[]},{loadChildren:"../pages/student/list/list.module.ngfactory#ListPageModuleNgFactory",name:"ListPage",segment:"list",priority:"low",defaultHistory:[]},{loadChildren:"../pages/student/myapply/myapplydetail/myapplydetail.module.ngfactory#MyapplydetailPageModuleNgFactory",name:"MyapplydetailPage",segment:"myapplydetailpage/:item",priority:"low",defaultHistory:[]},{loadChildren:"../pages/student/myapply/myapplylist/myapply.module.ngfactory#MyapplyPageModuleNgFactory",name:"MyapplyPage",segment:"myapply",priority:"low",defaultHistory:[]},{loadChildren:"../pages/student/resume/resume-leave-address/resume-leave-address.module.ngfactory#ResumeLeaveAddressPageModuleNgFactory",name:"ResumeLeaveAddressPage",segment:"resume-leave-address",priority:"low",defaultHistory:[]},{loadChildren:"../pages/student/resume/resume-leave-detail/resume-leave-detail.module.ngfactory#ResumeLeaveDetailPageModuleNgFactory",name:"ResumeLeaveDetailPage",segment:"resumeleavedetail/:leaveapply",priority:"low",defaultHistory:[]},{loadChildren:"../pages/student/resume/resume-leave-list/resume-leave-list.module.ngfactory#ResumeLeaveListPageModuleNgFactory",name:"ResumeLeaveListPage",segment:"resume-leave-list",priority:"low",defaultHistory:[]}]},[]),r._11(512,r.h,r.h,[]),r._11(512,le.a,le.a,[r.h]),r._11(1024,K.b,K.c,[le.a,r.o]),r._11(1024,r.c,function(e,a,t,l,r,n,s,i,p,u,d,c,y){return[o.s(e),oe.a(a),J.b(t,l),V.b(r,n,s,i,p),K.d(u,d,c,y)]},[[2,r.t],C.a,M.a,N.a,C.a,M.a,N.a,T.a,O.l,C.a,G.a,K.b,r.u]),r._11(512,r.d,r.d,[[2,r.c]]),r._11(131584,r.f,r.f,[r.u,r.T,r.o,r.k,r.i,r.d]),r._11(512,r.e,r.e,[r.f]),r._11(512,o.a,o.a,[[3,o.a]]),r._11(512,u.e,u.e,[]),r._11(512,u.d,u.d,[]),r._11(512,D.o,D.o,[]),r._11(512,D.g,D.g,[]),r._11(512,D.m,D.m,[]),r._11(512,Q.a,Q.a,[]),r._11(512,d,d,[]),r._11(256,u.l,"XSRF-TOKEN",[]),r._11(256,u.m,"X-XSRF-TOKEN",[]),r._11(256,c.a,p,[]),r._11(256,F.a,"/",[])])});Object(r.M)(),Object(o.j)().bootstrapModuleFactory(re)},50:function(e,a,t){"use strict";t.d(a,"a",function(){return s});t(7);var l=t(93),o=t(110),r=t(234),n=(t.n(r),t(235)),s=(t.n(n),function(){function e(e){this.http=e,this.baseUrl=o.a.Url.apiUrl,this.fileUrl=o.a.Url.fileUrl,this.AccessTokenL="51OCIRDHOBSL5ZKROINWTA"}return e.prototype.responseToJson=function(e){return e||void 0},e.prototype.post=function(e,a){var t=this;void 0===a&&(a=this.baseUrl),this.AccessTokenL=window.__AppWebkey;var o=new l.g({"Content-Type":"application/json",AccessToken:this.AccessTokenL});return this.http.post(a,e||null,{headers:o}).toPromise().then(function(e){return t.responseToJson(e)}).catch(this.catchAuthError)},e.prototype.postJSON=function(e,a){var t=this;void 0===a&&(a=this.baseUrl);var o=new l.g({"Content-Type":"application/json",AccessToken:window.__AppWebkey||this.AccessTokenL});return this.http.post(a,JSON.stringify({Router:e.Router,Method:e.Method||"GET",Body:JSON.stringify(e.Body)}||null),{headers:o}).toPromise().then(function(e){return t.responseToJson(e)}).catch(this.catchAuthError)},e.prototype.postFormData=function(e,a,t){void 0===t&&(t=this.fileUrl);var l=window.__AppWebkey||this.AccessTokenL,o=new XMLHttpRequest;o.open("POST",t,!0),o.setRequestHeader("AccessToken",l),o.onreadystatechange=function(){4==o.readyState&&200===o.status?a(JSON.parse(o.responseText)):console.log("Http status: "+o.status+" , "+o.statusText)},o.send(e)},e.prototype.postXhr=function(e,a,t){void 0===t&&(t=this.baseUrl);var l=window.__AppWebkey||this.AccessTokenL,o=new XMLHttpRequest;return o.open("POST",t,!1),o.setRequestHeader("AccessToken",l),o.send(JSON.stringify({Router:e.Router,Method:e.Method||"GET",Body:JSON.stringify(e.Body)}||null)),4==o.readyState&&200===o.status?a(JSON.parse(o.responseText)):(console.log("Http status: "+o.status+" , "+o.statusText),"")},e.prototype.catchAuthError=function(e){if(console.log(e),401===e.status||403===e.status){var a=void 0;if(e instanceof Response){var t=void 0;a=e.status+":"+(e.statusText||"")+" "+t}console.log(a)}return Promise.reject(e)},e}())},51:function(e,a,t){"use strict";t.d(a,"a",function(){return o});t(7),t(70);var l=t(226),o=(t.n(l),function(){function e(e,a,t,l){this.modalCtrl=e,this.alertCtrl=a,this.Loading=t,this.toastCtrl=l}return e.prototype.alert=function(e){this.alertCtrl.create({title:"提示",subTitle:e,buttons:[{text:"确定"}]}).present()},e.prototype.getDays=function(e,a){e=e.replace(/\-/g,"/"),a=a.replace(/\-/g,"/");var t=new Date(e),l=(new Date(a).getTime()-t.getTime())/864e5,o=+l.toString().replace(/^[^\.]+/,"0");return console.log(o),o>.5?Math.floor(l)+1:Math.floor(l)+.5},e.prototype.getWeekDay=function(e){var a;switch(parseInt(moment(e).format("d"))){case 0:a="周日";break;case 1:a="周一";break;case 2:a="周二";break;case 3:a="周三";break;case 4:a="周四";break;case 5:a="周五";break;case 6:a="周六"}return a},e.prototype.loadingPop=function(e){var a=this.Loading.create({content:e});return a.present(),a},e.prototype.toastPop=function(e){var a=this.toastCtrl.create({message:e,duration:3e3,cssClass:"zj-t-center",position:"middle"});return a.present(),a},e.prototype.presentAlert=function(e){console.log(e.enableBackdropDismiss);var a=this.alertCtrl.create({title:e.title||"",enableBackdropDismiss:e.enableBackdropDismiss,subTitle:e.subTitle||"",buttons:e.buttons||[]});return a.present(),a},e.prototype.modal=function(e,a){var t=this.modalCtrl.create(e,a);return t.present(),t},e.prototype.compress=function(e,a){var t=document.createElement("img");t.src=e;var l=document.createElement("canvas"),o=t.width,r=t.height,n=l.getContext("2d"),s=o,i=r,p=o,u=r,a=a;l.width=o,l.height=r,n.drawImage(t,0,0,s,i,0,0,p,u),e.length<=204800&&(a=.92);return l.toDataURL("image/jpeg",a)},e.prototype.base64toBlob=function(e){var a;a=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):Object(l.unescape)(e.split(",")[1]);for(var t=e.split(",")[0].split(":")[1].split(";")[0],o=new Uint8Array(a.length),r=0;r<a.length;r++)o[r]=a.charCodeAt(r);return new Blob([o],{type:t})},e}())}},[198]);