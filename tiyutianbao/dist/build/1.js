webpackJsonp([1],{243:function(e,n,t){"use strict";function r(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,0,null,null,9,"ion-item",[["class","item item-block"],["detail-push",""]],null,[[null,"click"]],function(e,n,t){var r=!0;if("click"===n){r=!1!==e.component.NavigationTo(e.context.$implicit)&&r}return r},y.b,y.a)),l["ɵdid"](1,1097728,null,3,N.a,[R.a,S.a,l.ElementRef,l.Renderer,[2,G.a]],null,null),l["ɵqud"](335544320,1,{contentLabel:0}),l["ɵqud"](603979776,2,{_buttons:1}),l["ɵqud"](603979776,3,{_icons:1}),l["ɵdid"](5,16384,null,0,b.a,[],null,null),(e()(),l["ɵted"](-1,2,["\n          "])),(e()(),l["ɵeld"](7,0,null,2,1,"h2",[],null,null,null,null,null)),(e()(),l["ɵted"](8,null,["",""])),(e()(),l["ɵted"](-1,2,["\n      "]))],null,function(e,n){e(n,8,0,n.context.$implicit.CodeName)})}function a(e){return l["ɵvid"](0,[(e()(),l["ɵted"](-1,null,["\n"])),(e()(),l["ɵeld"](1,0,null,null,9,"ion-content",[["class","outer-content"]],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,F.b,F.a)),l["ɵdid"](2,4374528,null,0,P.a,[S.a,T.a,M.a,l.ElementRef,l.Renderer,O.a,k.a,l.NgZone,[2,L.a],[2,_.a]],null,null),(e()(),l["ɵted"](-1,1,["\n  "])),(e()(),l["ɵeld"](4,0,null,1,5,"ion-list",[],null,null,null,null,null)),l["ɵdid"](5,16384,null,0,A.a,[S.a,l.ElementRef,l.Renderer,T.a,w.m,M.a],null,null),(e()(),l["ɵted"](-1,null,["\n\n      "])),(e()(),l["ɵand"](16777216,null,null,1,null,r)),l["ɵdid"](8,802816,null,0,B.NgForOf,[l.ViewContainerRef,l.TemplateRef,l.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(e()(),l["ɵted"](-1,null,["\n\n  "])),(e()(),l["ɵted"](-1,1,["\n"]))],function(e,n){e(n,8,0,n.component.items)},function(e,n){e(n,1,0,l["ɵnov"](n,2).statusbarPadding,l["ɵnov"](n,2)._hasRefresher)})}Object.defineProperty(n,"__esModule",{value:!0});var l=t(0),i=(t(5),t(74),t(123)),o=t(246),u=function(){function e(e,n,t,r){var a=this;this.navParams=e,this.appService=n,this.navCtrl=t,this.viewCtrl=r,this.Type=this.navParams.get("Type"),n.getRegionByHouseStreet(n.getCurrentStreet().GeographyCode).then(function(e){e.FeedbackCode||(a.items=e.Data||[])}),antlinker.configTitleButton({type:"close",text:"关闭",fail:function(){},success:function(){}})}return e.prototype.NavigationTo=function(e){var n=new o.a;n.GeographyCode=e.Code,n.GeographyName=e.CodeName,"无"==e.CodeName?(this.appService.setCurrentRegion(n),this.navCtrl.setRoot(this.appService.getCurrentParentPage(),{Type:this.Type}),this.appService.send({OriginAreaCode:this.appService.getCurrentStreet().GeographyCode,OriginAreaCodeName:""+this.appService.getCurrentProvince().GeographyName+this.appService.getCurrentCounty().GeographyName+"\n        "+this.appService.getCurrentCounty().GeographyName+this.appService.getCurrentStreet().GeographyName})):(this.appService.setCurrentRegion(n),this.navCtrl.setRoot(this.appService.getCurrentParentPage(),{Type:this.Type}),this.appService.send({OriginAreaCode:this.appService.getCurrentRegion().GeographyCode,OriginAreaCodeName:""+this.appService.getCurrentProvince().GeographyName+this.appService.getCurrentCounty().GeographyName+"\n      "+this.appService.getCurrentCounty().GeographyName+this.appService.getCurrentStreet().GeographyName+this.appService.getCurrentRegion().GeographyName}))},e}(),p=function(){return function(){}}(),d=t(124),c=t(125),s=t(126),g=t(127),m=t(128),h=t(129),C=t(130),v=t(131),f=t(133),y=t(132),N=t(16),R=t(14),S=t(1),G=t(40),b=t(55),F=t(200),P=t(21),T=t(3),M=t(9),O=t(8),k=t(24),L=t(4),_=t(20),A=t(45),w=t(6),B=t(10),E=t(11),q=l["ɵcrt"]({encapsulation:2,styles:[],data:{}}),x=l["ɵccf"]("page-region",u,function(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,0,null,null,1,"page-region",[],null,null,null,a,q)),l["ɵdid"](1,49152,null,0,u,[E.a,i.a,_.a,L.a],null,null)],null,null)},{},{},[]),D=t(12),z=t(75),I=t(36);t.d(n,"RegionPageModuleNgFactory",function(){return $});var $=l["ɵcmf"](p,[],function(e){return l["ɵmod"]([l["ɵmpd"](512,l.ComponentFactoryResolver,l["ɵCodegenComponentFactoryResolver"],[[8,[d.a,c.a,s.a,g.a,m.a,h.a,C.a,v.a,f.a,x]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l["ɵmpd"](4608,B.NgLocalization,B.NgLocaleLocalization,[l.LOCALE_ID,[2,B["ɵa"]]]),l["ɵmpd"](4608,D["ɵi"],D["ɵi"],[]),l["ɵmpd"](4608,D.FormBuilder,D.FormBuilder,[]),l["ɵmpd"](512,B.CommonModule,B.CommonModule,[]),l["ɵmpd"](512,D["ɵba"],D["ɵba"],[]),l["ɵmpd"](512,D.FormsModule,D.FormsModule,[]),l["ɵmpd"](512,D.ReactiveFormsModule,D.ReactiveFormsModule,[]),l["ɵmpd"](512,z.a,z.a,[]),l["ɵmpd"](512,z.b,z.b,[]),l["ɵmpd"](512,p,p,[]),l["ɵmpd"](256,I.a,u,[])])})},246:function(e,n,t){"use strict";t.d(n,"a",function(){return r});var r=function(){return function(){this.GeographyName="",this.GeographyCode=""}}()}});