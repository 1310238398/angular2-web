webpackJsonp([8],{

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberManagePageModule", function() { return MemberManagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__membermanage__ = __webpack_require__(314);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MemberManagePageModule = /** @class */ (function () {
    function MemberManagePageModule() {
    }
    MemberManagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__membermanage__["a" /* MemberManagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__membermanage__["a" /* MemberManagePage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__membermanage__["a" /* MemberManagePage */]
            ]
        })
    ], MemberManagePageModule);
    return MemberManagePageModule;
}());

//# sourceMappingURL=membermanage.module.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MemberManagePage; });
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






var MemberManagePage = /** @class */ (function () {
    function MemberManagePage(navCtrl, navParams, alertCtrl, http, HelpUtils, DomS) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.DomS = DomS;
        this.ApplyMember = [];
        this.page = {
            Page: 1,
            PageSize: 2,
        };
        this.moreData = true;
        this.UnionCode = this.navParams.get('UnionCode');
        this.UnionName = this.navParams.get('UnionName');
        console.log(this.UnionCode);
    }
    //初始化加载
    MemberManagePage.prototype.ionViewDidEnter = function () {
        console.log(11111111);
        if (this.UnionCode) {
            console.log(44);
            this.getapplyinfo();
        }
    };
    //初始化加载
    MemberManagePage.prototype.ionViewWillEnter = function () {
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
    //拒绝申请
    MemberManagePage.prototype.pass = function (a) {
        this.shetuanmember = a.Member;
        this.ApplicationCode = a.ApplicationCode;
        this.ApplyStatus = 2;
        this.passapplication();
    };
    //同意申请
    MemberManagePage.prototype.agree = function (a) {
        this.shetuanmember = a.Member;
        this.ApplicationCode = a.ApplicationCode;
        this.ApplyStatus = 3;
        this.addshetuanmember();
        this.updateshetuanapply();
    };
    //拒绝申请理由
    MemberManagePage.prototype.passapplication = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            // title: 'Login',
            // message: this.message,
            inputs: [
                {
                    name: 'apply',
                    placeholder: '请输入拒绝原因',
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        console.log(data.apply);
                        _this.ApplyInfo = data.apply;
                        _this.updateshetuanapply();
                    }
                }
            ]
        });
        prompt.present();
    };
    //加载当前社团申请列表
    MemberManagePage.prototype.getapplyinfo = function (reload) {
        var _this = this;
        if (reload === void 0) { reload = false; }
        if (reload) {
            this.page.Page = 1;
        }
        console.log(1);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getapplyinfo,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page++,
                PageSize: this.page.PageSize,
                Code: this.UnionCode,
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.ApplyMember = _this.ApplyMember.concat(res.Data.Datas);
                console.log(_this.ApplyMember);
                if (reload) {
                    _this.ApplyMember = res.Data.Datas;
                }
            }
        });
    };
    //跳转到成员申请详情页
    MemberManagePage.prototype.gomemberdetail = function (m) {
        if (m.status == 1) {
            this.ApplicationCode = m.ApplicationCode;
            this.navCtrl.push('ManageDetailPage', {
                UnionCode: this.UnionCode,
                UnionName: this.UnionName,
                ApplicationCode: this.ApplicationCode,
            });
        }
        if (m.status == 2 || m.status == 3) {
            antlinker.openNewView({
                uri: 'ant://contacts/userdetails/open?UID=' + m.Member,
                fail: function () {
                }
            });
        }
    };
    MemberManagePage.prototype.doInfinite = function (infiniteScroll) {
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
                _this.ApplyMember = _this.ApplyMember.concat(res.Data.Datas);
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
    MemberManagePage.prototype.addshetuanmember = function () {
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
                console.log('save member fail');
            }
        }, function (err) { return console.log(err); });
    };
    //更新社团申请
    MemberManagePage.prototype.updateshetuanapply = function () {
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
                var that_1 = _this;
                setTimeout(function () {
                    that_1.getapplyinfo(true);
                }, '1000');
                console.log('update apply success');
            }
            else {
                console.log('update apply fail');
            }
        }, function (err) { return console.log(err); });
    };
    MemberManagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-membermanage',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/member/membermanage/membermanage.html"*/'<!-- <ion-header>\n    <ion-toolbar>\n        <ion-title>社团成员</ion-title>\n    </ion-toolbar>\n</ion-header> -->\n\n<ion-content>\n        <div *ngIf="ApplyMember.length <= 0" class="none"><img class="noneimg" src="assets/images/kong.png">\n            <div class="noneFont">暂无更多内容</div>\n        </div>\n    \n        <ion-card style="width: 100%;margin: 15px 0" *ngFor=" let item of ApplyMember">\n            <ion-list>\n                <button ion-item (click)="gomemberdetail(item)">\n                    <ion-avatar item-start>\n                        <img id="wechatBox" src="assets/images/header.png">\n                    </ion-avatar>\n                    <div class="fn12">\n                        <span>{{item.name}}</span>\n                        <span class="sex" *ngIf="item.CodeName==\'男\'"><img  src="assets/images/nan.png"></span>\n                        <span class="sex" *ngIf="item.CodeName==\'女\'"><img  src="assets/images/nv.png"></span>\n                    </div>\n                    <span class="fn10">{{item.Info}}</span>\n                </button>\n                <div>\n                    <button *ngIf="item.status==1"  class="fn10 fr abutton" style="width: 50px;height: 25px;" color="default" [disabled]="subStop"\n                        (click)="agree(item)">同意</button>\n                    <button *ngIf="item.status==1"  class="fn10 fr pbutton" style="width: 50px;height: 25px;" color="light" [disabled]="subStop"\n                        (click)="pass(item)">拒绝</button>\n                    <span *ngIf="item.status==3 || item.status==5" class="fn12 fr" style="color: #FFC000 ;margin-right: 5px">已同意该申请</span>\n                    <span *ngIf="item.status==2 || item.status==4" class="fn12 fr" style="color: #9B9B9B ;margin-right: 5px">已拒绝该申请</span>\n                </div>\n            </ion-list>\n        </ion-card>\n    <ion-infinite-scroll *ngIf="moreData" (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n    <div style="text-align: center;color: #8e9093" *ngIf="!moreData">我是有底线的！</div>\n\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/member/membermanage/membermanage.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], MemberManagePage);
    return MemberManagePage;
}());

//# sourceMappingURL=membermanage.js.map

/***/ })

});
//# sourceMappingURL=8.js.map