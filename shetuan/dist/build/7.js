webpackJsonp([7],{

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShetuanMemberPageModule", function() { return ShetuanMemberPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shetuanmember__ = __webpack_require__(324);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ShetuanMemberPageModule = /** @class */ (function () {
    function ShetuanMemberPageModule() {
    }
    ShetuanMemberPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__shetuanmember__["a" /* ShetuanMemberPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__shetuanmember__["a" /* ShetuanMemberPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__shetuanmember__["a" /* ShetuanMemberPage */]
            ]
        })
    ], ShetuanMemberPageModule);
    return ShetuanMemberPageModule;
}());

//# sourceMappingURL=shetuanmember.module.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShetuanMemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__http_http_Service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ShetuanMemberPage = /** @class */ (function () {
    function ShetuanMemberPage(navCtrl, navParams, alertCtrl, http, HelpUtils, DomS) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.DomS = DomS;
        this.pet = "member";
        this.page = {
            Page: 1,
            PageSize: 20,
        };
        this.Applypage = {
            Page: 1,
            PageSize: 100,
        };
        this.applymiss = {};
        this.ShetuanMember = [];
        this.ShetuanMemberOne = {
            name: '',
            InsertDatetime: '',
            days: 0,
            CodeName: ''
        };
        this.ApplyMember = [];
        this.applystatus = false;
        this.moreData = true;
        this.moreDatae = true;
        this.ApplyMembers = [];
        this.pagem = {
            Page: 1,
            PageSize: 20,
        };
        this.substatus = false;
        this.subStop = false;
        this.UnionCode = this.navParams.get('UnionCode');
        this.Member = this.navParams.get('Member');
        this.shetuanstatus = this.navParams.get('shetuanstatus');
        this.UnionName = this.navParams.get('UnionName');
    }
    //初始化加载
    ShetuanMemberPage.prototype.ionViewDidEnter = function () {
        this.unionmemberlist();
        this.unionmemberone();
        this.getapplyinfos();
        this.getapplyinfo();
    };
    //初始化加载
    ShetuanMemberPage.prototype.ionViewWillEnter = function () {
        antlinker.configTitle({
            type: "label",
            title: "社团成员",
            fail: function () { },
            success: function () { }
        });
        // 右上角按钮
        // if (this.shetuanstatus==1) {
        //   antlinker.configTitleButton({
        //     showClose: true,
        //     type: "label",
        //     text: "加入申请",
        //     success: function () { 
        //       this.navCtrl.push('MemberManagePage', {
        //         UnionCode: this.UnionCode,
        //         UnionName: this.UnionName,
        //       });
        //     },
        //     fail: function () { },
        //     trigger: function () { }
        //   });
        // }
    };
    //跳转到原生个人主页
    ShetuanMemberPage.prototype.gomemberdetail = function (m) {
        console.log(m.Member);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getxiaoyuanuid,
            Method: 'POST',
            Body: {
                Member: m.Member,
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data) {
                var uid = res.Data;
                console.log(uid);
                antlinker.openNewView({
                    uri: 'ant://contacts/userdetails/open?UID=' + uid,
                    fail: function () {
                    }
                });
            }
        });
    };
    //加载当前社团除自己之外所有成员
    ShetuanMemberPage.prototype.unionmemberlist = function (reload) {
        var _this = this;
        if (reload === void 0) { reload = false; }
        if (reload) {
            this.page.Page = 1;
        }
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.unionmemberlist,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page++,
                PageSize: this.page.PageSize,
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.ShetuanMember = res.Data.Datas;
                console.log(_this.ShetuanMember, 'aaa');
                console.log(Boolean(_this.ShetuanMember.length), 'sss');
            }
        });
    };
    //上拉加载当前社团除自己之外所有成员
    ShetuanMemberPage.prototype.doInfinitea = function (infiniteScroll) {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.unionmemberlist,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page++,
                PageSize: this.page.PageSize,
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (res.Data.Datas.length && !res.FeedbackCode) {
                _this.moreDatae = true;
                _this.ShetuanMember = _this.ShetuanMember.concat(res.Data.Datas);
            }
            else {
                _this.moreDatae = false;
            }
            infiniteScroll.complete();
        });
    };
    //加载自己成员信息
    ShetuanMemberPage.prototype.unionmemberone = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.unionmemberone,
            Method: 'POST',
            Body: {
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data) {
                _this.ShetuanMemberOne = res.Data;
                if (_this.ShetuanMemberOne.days == 0) {
                    _this.ShetuanMemberOne.days = 1;
                }
                console.log(_this.ShetuanMemberOne);
            }
            else {
                _this.ShetuanMemberOne = null;
            }
        });
    };
    //加载当前社团申请列表
    ShetuanMemberPage.prototype.getapplyinfo = function () {
        var _this = this;
        console.log(1);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getapplyinfo,
            Method: 'POST',
            Body: {
                PageNum: this.Applypage.Page,
                PageSize: this.Applypage.PageSize,
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data.Datas) {
                _this.ApplyMember = res.Data.Datas;
                _this.applymiss = _this.ApplyMember.filter(function (item) { return item.status == 1; });
                if (_this.applymiss) {
                    console.log('ok');
                }
                console.log('---------', Boolean(_this.applymiss));
                // if (applymiss.length >  0) {
                //   this.applystatus = true;
                // }
            }
        });
    };
    //成员管理
    //拒绝申请
    ShetuanMemberPage.prototype.pass = function (a) {
        this.shetuanmember = a.Member;
        this.ApplicationCode = a.ApplicationCode;
        this.ApplyStatus = 2;
        this.substatus = true;
        // this.passapplication();
    };
    ShetuanMemberPage.prototype.cancel = function () {
        this.substatus = false;
        this.shenqingapply = null;
    };
    ShetuanMemberPage.prototype.applicationsub = function () {
        this.ApplyInfo = this.shenqingapply;
        this.updateshetuanapply();
        this.substatus = false;
    };
    //同意申请
    ShetuanMemberPage.prototype.agree = function (a) {
        this.shetuanmember = a.Member;
        this.ApplicationCode = a.ApplicationCode;
        this.ApplyStatus = 3;
        this.addshetuanmember();
        this.updateshetuanapply();
        this.subStop = true;
    };
    //拒绝申请理由
    // passapplication() {
    //   const prompt = this.alertCtrl.create({
    //     inputs: [
    //       {
    //         name: 'apply',
    //         placeholder: '请输入拒绝原因',
    //       },
    //     ],
    //     buttons: [
    //       {
    //         text: '取消',
    //         handler: data => {
    //           console.log('Cancel clicked');
    //         }
    //       },
    //       {
    //         text: '确定',
    //         handler: data => {
    //           console.log(data.apply);
    //           if (data.apply.length > 21) {
    //             this.HelpUtils.toastPopTop('拒绝理由不能超过21个字');
    //             return false;
    //           }
    //           this.ApplyInfo = data.apply
    //           this.updateshetuanapply();
    //         }
    //       }
    //     ]
    //   });
    //   prompt.present();
    // }
    //加载当前社团申请列表
    ShetuanMemberPage.prototype.getapplyinfos = function (reload) {
        var _this = this;
        if (reload === void 0) { reload = false; }
        if (reload) {
            this.pagem.Page = 1;
        }
        console.log(1);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getapplyinfo,
            Method: 'POST',
            Body: {
                PageNum: this.pagem.Page++,
                PageSize: this.pagem.PageSize,
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.ApplyMembers = _this.ApplyMembers.concat(res.Data.Datas);
                console.log(_this.ApplyMembers);
                if (reload) {
                    _this.ApplyMembers = res.Data.Datas;
                    // const that = this;
                    // setTimeout(function () {
                    _this.subStop = false;
                    // }, '1000');
                }
            }
        });
    };
    //跳转到成员申请详情页
    ShetuanMemberPage.prototype.gomemberdetails = function (m) {
        if (m.status == 1) {
            this.ApplicationCode = m.ApplicationCode;
            this.navCtrl.push('ManageDetailPage', {
                UnionCode: this.UnionCode,
                UnionName: this.UnionName,
                Member: this.Member,
                shetuanstatus: this.shetuanstatus,
                ApplicationCode: this.ApplicationCode,
            });
        }
        else {
            console.log(777);
            this.gomemberdetail(m);
            // this.HelpUtils.toastPopTop('暂时不支持跳转');
        }
    };
    ShetuanMemberPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getapplyinfo,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page++,
                PageSize: this.page.PageSize,
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (res.Data.Datas.length && !res.FeedbackCode) {
                _this.moreData = true;
                _this.ApplyMembers = _this.ApplyMembers.concat(res.Data.Datas);
            }
            else {
                _this.moreData = false;
            }
            infiniteScroll.complete();
        });
    };
    /*
  社团申请相关
  */
    //添加社团成员
    ShetuanMemberPage.prototype.addshetuanmember = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.addshetuanmember,
            Method: 'POST',
            Body: {
                Code: this.UnionCode,
                Member: this.shetuanmember,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                console.log('save member success');
                _this.unionmemberlist(true);
            }
            else {
                _this.subStop = false;
                console.log('save member fail');
            }
        }, function (err) { return console.log(err); });
    };
    //更新社团申请
    ShetuanMemberPage.prototype.updateshetuanapply = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.updateshetuanapply,
            Method: 'POST',
            Body: {
                Code: this.ApplicationCode,
                Info: this.ApplyInfo,
                Status: this.ApplyStatus,
                Member: this.shetuanmember,
                Uname: this.UnionName,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.getapplyinfos(true);
                _this.getapplyinfo();
                console.log('update apply success');
            }
            else {
                _this.subStop = false;
                console.log('update apply fail');
            }
        }, function (err) { return console.log(err); });
    };
    ShetuanMemberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-shetuanmember',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/member/shetuanmember/shetuanmember.html"*/'<ion-content class="grid-basic-page">\n\n\n    <ion-card style="margin:2px 0;width:100%;box-shadow:0 2px 5px 0 #E3E3E3 !important;" *ngIf="shetuanstatus==1">\n\n        <div padding>\n            <ion-segment [(ngModel)]="pet">\n                <ion-segment-button value="member">\n                    社团成员\n                </ion-segment-button>\n\n                <ion-segment-button value="apply">\n                    加入申请 <span *ngIf=" applymiss && applymiss.length " class="redcircle"></span>\n                </ion-segment-button>\n            </ion-segment>\n        </div>\n    </ion-card>\n    <div *ngIf="shetuanstatus==1" style="height:15px;background-color: #fafafa;"> </div>\n\n    <div [ngSwitch]="pet">\n        <div *ngSwitchCase="\'member\'">\n\n            <ion-card style="width: 100%;margin: 2px 0;box-shadow:0 2px 5px 0 #E3E3E3 !important;" *ngIf="ShetuanMemberOne">\n                <ion-item>\n                    <ion-avatar item-start>\n                        <img id="wechatBox" src="assets/images/morentouxiang@2x.png">\n                    </ion-avatar>\n                    <!-- <div style="line-height: 24px;"> -->\n                    <span *ngIf="(ShetuanMemberOne.Role == \'33330006\' || ShetuanMemberOne.Role == \'33330007\') && ShetuanMemberOne.Day <=0"\n                        class="pepplemain">负责人</span>\n                    <span class="fn16 mainname">{{ShetuanMemberOne.name}}</span>\n                    <span class="sexb fn16" *ngIf="ShetuanMemberOne.CodeName==\'男\'"> <img src="assets/images/nan@2x.png">\n                    </span>\n                    <span class="sexr fn16" *ngIf="ShetuanMemberOne.CodeName==\'女\'"><img src="assets/images/nv@2x.png"></span>\n                    <!-- </div> -->\n                    <div style="color:gray;margin-top: 3px;">\n                        <span class="fn14" style="margin-right: 20px;">加入时间：{{ShetuanMemberOne.InsertDatetime.substr(0,10)}}</span>\n                        <span class="fn14">已加入{{ShetuanMemberOne.days}}天</span>\n                    </div>\n                </ion-item>\n            </ion-card>\n            <div *ngIf="ShetuanMemberOne && ShetuanMember.length" style="height:15px;background-color: #fafafa;"></div>\n            <ion-list>\n                <ion-card style="width: 100%;margin: 2px 0;box-shadow:0 2px 5px 0 #E3E3E3 !important;" *ngIf="ShetuanMember.length">\n                    <button ion-item *ngFor="let item of ShetuanMember " style="border-bottom:   1px solid #E3E3E3;"\n                        (click)="gomemberdetail(item)">\n                        <ion-avatar item-start>\n                            <img id="wechatBox" src="assets/images/morentouxiang@2x.png">\n                        </ion-avatar>\n                        <!-- <div class="fn16 people"> -->\n                        <span *ngIf="(item.Role == \'33330006\' || item.Role == \'33330007\') && item.Day <=0" class="pepplemain">负责人</span>\n                        <span class="fn16 mainname">{{item.name}}</span>\n                        <span class="sexb fn16" *ngIf="item.CodeName==\'男\'"><img src="assets/images/nan@2x.png"></span>\n                        <span class="sexr fn16" *ngIf="item.CodeName==\'女\'"><img src="assets/images/nv@2x.png"></span>\n                        <!-- </div> -->\n                    </button>\n                </ion-card>\n                <ion-infinite-scroll *ngIf="moreDatae" (ionInfinite)="doInfinitea($event)">\n                    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n                    </ion-infinite-scroll-content>\n                </ion-infinite-scroll>\n                <div style="text-align: center;color: #8e9093" *ngIf="!moreDatae">我是有底线的！</div>\n            </ion-list>\n        </div>\n\n        <div *ngSwitchCase="\'apply\'">\n\n            <div *ngIf="ApplyMembers.length <= 0" class="none"><img class="noneimg" src="assets/images/kong.png">\n                <div class="noneFont">暂无更多内容</div>\n            </div>\n\n            <ion-list *ngFor=" let item of ApplyMembers">\n                <ion-card style="width: 100%;margin: 2px 0;box-shadow:0 2px 5px 0 #E3E3E3 !important;">\n                    <button ion-item (click)="gomemberdetails(item)" style="width: 90%;margin:0px auto;border-bottom: 1px solid #E3E3E3;border-top: none;padding: 0;">\n                        <ion-avatar item-start>\n                            <img id="wechatBox" src="assets/images/morentouxiang@2x.png">\n                        </ion-avatar>\n                        <div class="fn16">\n                            <span class="applyname">{{item.name}}</span>\n                            <span class="sexb" *ngIf="item.CodeName==\'男\'"><img src="assets/images/nan@2x.png"></span>\n                            <span class="sexr" *ngIf="item.CodeName==\'女\'"><img src="assets/images/nv@2x.png"></span>\n                        </div>\n                        <div style="height:20px;">\n                            <span class="fn12 peopleinfo">{{item.Info}}</span>\n                        </div>\n                    </button>\n                    <div style="height:25px;">\n                        <button *ngIf="item.status==1" class="fn14 fr abutton" style="width: 60px;height: 25px;" color="default"\n                            [disabled]="subStop" (click)="agree(item)">同意</button>\n                        <button *ngIf="item.status==1" class="fn14 fr pbutton" style="width: 60px;height: 25px;" color="light"\n                            [disabled]="subStop" (click)="pass(item)">拒绝</button>\n                        <span *ngIf="item.status==3 || item.status==5" class="fn16 fr" style="color: #FFC000 ;margin: 8px 15px">已同意该申请</span>\n                        <span *ngIf="item.status==2 || item.status==4" class="fn16 fr" style="color: #9B9B9B ;margin: 8px 15px">已拒绝该申请</span>\n                    </div>\n                </ion-card>\n                <div *ngIf="shetuanstatus==1" style="height:10px;background-color: #fafafa;"></div>\n            </ion-list>\n            <div class="photoalert" *ngIf="substatus">\n                <div class="alertback"></div>\n                <div class="alertwapper">\n                    <div class="alert-content">\n                        <div class="surplus-num-box">\n                            <ion-textarea maxlength="21" max="21" class="textarea" [(ngModel)]="shenqingapply" name="Info"\n                                [placeholder]="\'请输入拒绝原因\'"></ion-textarea>\n                            <!-- <p class="surplus-num" *ngIf="shenqingapply.length">{{21 - shenqingapply.length}}</p> -->\n                        </div>\n                        <div class="btn-wapper-line">\n                            <button ion-button class="btn-ghost" (click)="cancel()">取消</button>\n                            <button ion-button (click)="applicationsub()">确定</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <ion-infinite-scroll *ngIf="moreData" (ionInfinite)="doInfinite($event)">\n                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n            <div style="text-align: center;color: #8e9093" *ngIf="!moreData">我是有底线的！</div>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/member/shetuanmember/shetuanmember.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ShetuanMemberPage);
    return ShetuanMemberPage;
}());

//# sourceMappingURL=shetuanmember.js.map

/***/ })

});
//# sourceMappingURL=7.js.map