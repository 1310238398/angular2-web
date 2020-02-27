webpackJsonp([9],{

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageDetailPageModule", function() { return ManageDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__managedetail__ = __webpack_require__(313);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ManageDetailPageModule = /** @class */ (function () {
    function ManageDetailPageModule() {
    }
    ManageDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__managedetail__["a" /* ManageDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__managedetail__["a" /* ManageDetailPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__managedetail__["a" /* ManageDetailPage */]
            ]
        })
    ], ManageDetailPageModule);
    return ManageDetailPageModule;
}());

//# sourceMappingURL=managedetail.module.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageDetailPage; });
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






var ManageDetailPage = /** @class */ (function () {
    function ManageDetailPage(navCtrl, navParams, alertCtrl, http, HelpUtils, DomS) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.DomS = DomS;
        this.ShetuanApplyOne = {
            name: '',
            InsertDatetime: '',
            Info: '',
            Member: ''
        };
        this.subStop = false;
        this.page = {
            Page: 1,
            PageSize: 2,
        };
        this.substatus = false;
        this.UnionCode = this.navParams.get('UnionCode');
        this.UnionName = this.navParams.get('UnionName');
        this.ApplicationCode = this.navParams.get('ApplicationCode');
        this.Member = this.navParams.get('Member');
        this.shetuanstatus = this.navParams.get('shetuanstatus');
        console.log(this.UnionCode);
    }
    //初始化加载
    ManageDetailPage.prototype.ionViewWillEnter = function () {
        antlinker.configTitle({
            type: "label",
            title: "社团成员",
            fail: function () { },
            success: function () { }
        });
        // 右上角按钮
        antlinker.configTitleButton({
            showClose: true,
            type: "label",
            text: "",
            success: function () { },
            fail: function () { },
            trigger: function () { }
        });
    };
    //初始化加载
    ManageDetailPage.prototype.ionViewDidEnter = function () {
        this.getoneapplyinfo();
    };
    //拒绝申请
    //拒绝申请
    ManageDetailPage.prototype.pass = function (a) {
        this.shetuanmember = a.Member;
        this.ApplicationCode = a.ApplicationCode;
        this.ApplyStatus = 2;
        this.substatus = true;
        // this.passapplication();
    };
    ManageDetailPage.prototype.cancel = function () {
        this.substatus = false;
        this.shenqingapply = null;
    };
    ManageDetailPage.prototype.applicationsub = function () {
        this.ApplyInfo = this.shenqingapply;
        this.updateshetuanapply();
        this.substatus = false;
    };
    //同意申请
    ManageDetailPage.prototype.agree = function (a) {
        this.shetuanmember = a.Member;
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
    //获取特定人员申请详情
    ManageDetailPage.prototype.getoneapplyinfo = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getoneapplyinfo,
            Method: 'POST',
            Body: {
                Code: this.ApplicationCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data) {
                _this.ShetuanApplyOne = res.Data;
            }
            else {
                console.log('save apply fail');
            }
        }, function (err) { return console.log(err); });
    };
    //添加社团成员
    ManageDetailPage.prototype.addshetuanmember = function () {
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
            }
            else {
                _this.subStop = false;
                console.log('save member fail');
            }
        }, function (err) { return console.log(err); });
    };
    //更新社团申请
    ManageDetailPage.prototype.updateshetuanapply = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.updateshetuanapply,
            Method: 'POST',
            Body: {
                Code: this.ApplicationCode,
                Uname: this.UnionName,
                Info: this.ApplyInfo,
                Status: this.ApplyStatus,
                Member: this.shetuanmember,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                console.log('a' + _this.UnionCode);
                _this.navCtrl.push('ShetuanMemberPage', {
                    UnionCode: _this.UnionCode,
                    Member: _this.Member,
                    shetuanstatus: _this.shetuanstatus,
                });
                console.log('update apply success');
            }
            else {
                _this.subStop = false;
                console.log('update apply fail');
            }
        }, function (err) { return console.log(err); });
    };
    //跳转到原生个人主页
    ManageDetailPage.prototype.gomemberdetail = function (m) {
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
    ManageDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-managedetail',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/member/managedetail/managedetail.html"*/'<!-- <ion-header>\n    <ion-toolbar>\n        <ion-title>社团成员</ion-title>\n    </ion-toolbar>\n</ion-header> -->\n\n<ion-content class="grid-basic-page" style="background: #FAFAFA !important;">\n    <ion-card style="margin:2px 0;width:100%;max-height: 70px;box-shadow:0 2px 5px 0 #E3E3E3 !important;">\n        <button ion-item (click)="gomemberdetail(ShetuanApplyOne)">\n            <ion-avatar item-start>\n                <img id="wechatBox" src="assets/images/morentouxiang@2x.png">\n            </ion-avatar>\n            <div class="fn14">\n                <span>{{ShetuanApplyOne.name}}</span>\n                <span class="sex" *ngIf="ShetuanApplyOne.CodeName==\'男\'"><img src="assets/images/nan@2x.png"></span>\n                <span class="sex" *ngIf="ShetuanApplyOne.CodeName==\'女\'"><img src="assets/images/nv@2x.png"></span>\n            </div>\n        </button>\n    </ion-card>\n    <ion-card class="yuanyin">\n        <span class="fn14" style="margin-left: 5px;line-height: 28px;">申请原因：{{ShetuanApplyOne.Info}}</span>\n    </ion-card>\n\n    <div style="margin:15px auto;width: 85%;">\n        <span class="fn14" style="margin-left: 5px;">申请时间：{{ShetuanApplyOne.InsertDatetime.substr(0,10)}}</span>\n    </div>\n\n    <div class="center">\n        <button class="mr fn14 pbutton" [disabled]="subStop" (click)="pass(ShetuanApplyOne)">拒绝</button>\n        <button class="mr fn14 abutton" [disabled]="subStop" (click)="agree(ShetuanApplyOne)">同意</button>\n    </div>\n    <div class="photoalert" *ngIf="substatus">\n        <div class="alertback"></div>\n        <div class="alertwapper">\n            <div class="alert-content">\n                <div class="surplus-num-box">\n                    <ion-textarea maxlength="21" max="21" class="textarea" [(ngModel)]="shenqingapply" name="Info" [placeholder]="\'请输入拒绝原因\'"></ion-textarea>\n                    <!-- <p class="surplus-num" *ngIf="shenqingapply.length">{{21 - shenqingapply.length}}</p> -->\n                </div>\n                <div class="btn-wapper-line">\n                    <button ion-button class="btn-ghost" (click)="cancel()">取消</button>\n                    <button ion-button (click)="applicationsub()">确定</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/member/managedetail/managedetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ManageDetailPage);
    return ManageDetailPage;
}());

//# sourceMappingURL=managedetail.js.map

/***/ })

});
//# sourceMappingURL=9.js.map