webpackJsonp([4],{

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewPageModule", function() { return PreviewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__preview__ = __webpack_require__(317);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PreviewPageModule = /** @class */ (function () {
    function PreviewPageModule() {
    }
    PreviewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__preview__["a" /* PreviewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__preview__["a" /* PreviewPage */]),
            ],
        })
    ], PreviewPageModule);
    return PreviewPageModule;
}());

//# sourceMappingURL=preview.module.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewPage; });
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






var PreviewPage = /** @class */ (function () {
    function PreviewPage(DomS, navCtrl, navParams, http, HelpUtils) {
        this.DomS = DomS;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.SheTuanEND = [];
        this.mark = false;
        this.waterMarks = [];
        this.indexInit = 0;
        this.honorpicture = false;
        this.Endpage = {
            lastid: 1,
            count: 10
        };
        this.moreDatar = true;
        this.UnionCode = this.navParams.get('UnionCode');
        this.Member = this.navParams.get('Member');
        this.shetuanstatus = this.navParams.get('shetuanstatus');
        this.getunionendinfo();
        console.log('f' + this.UnionCode);
        if (this.UnionCode && this.Member) {
            this.sesstionCut();
        }
    }
    //初始化加载
    PreviewPage.prototype.ionViewWillEnter = function () {
        antlinker.configTitle({
            type: "label",
            title: "社团活动",
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
    //存储缓存
    PreviewPage.prototype.sesstionCut = function () {
        sessionStorage.setItem('UnionCode', this.UnionCode);
        sessionStorage.setItem('Member', this.Member);
        console.log(17);
        console.log(sessionStorage.getItem('UnionCode'));
    };
    //初始化加载
    PreviewPage.prototype.ionViewDidEnter = function () {
        console.log('ses');
        if (!this.UnionCode) {
            this.UnionCode = sessionStorage.getItem('UnionCode');
        }
        if (!this.Member) {
            this.Member = sessionStorage.getItem('Member');
        }
        console.log(this.UnionCode);
    };
    //活动detail页展示
    PreviewPage.prototype.godetail = function (m) {
        this.ActivityCode = m.activityCode;
        this.navCtrl.push('PreviewDetailPage', {
            UnionCode: this.UnionCode,
            shetuanstatus: this.shetuanstatus,
            Member: this.Member,
            ActivityCode: this.ActivityCode
        });
    };
    //加载社团活动总结
    PreviewPage.prototype.getunionendinfo = function () {
        var _this = this;
        console.log(9);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getunionendinfo,
            Method: 'POST',
            Body: {
                Uname: this.UnionCode,
                pageindex: this.Endpage.lastid,
                pagesize: this.Endpage.count
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data.data) {
                // for (let i = 0; i < res.length; i++) {
                //   res[i].Data = JSON.parse(res[i].Data);
                // }
                _this.SheTuanEND = res.Data.data;
                console.log(_this.SheTuanEND);
            }
        });
    };
    //上拉加载社团总结
    PreviewPage.prototype.doInfiniter = function (infiniteScroll) {
        var _this = this;
        console.log('荣誉');
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getunionendinfo,
            Method: 'POST',
            Body: {
                Uname: this.UnionCode,
                pageindex: this.Endpage.lastid++,
                pagesize: this.Endpage.count
            }
        }).then(function (res) {
            if (res.Data.Datas && !res.FeedbackCode) {
                _this.moreDatar = true;
                _this.SheTuanEND = _this.SheTuanEND.concat(res.Data.data);
            }
            else {
                _this.moreDatar = false;
                console.log('荣誉wu');
            }
            infiniteScroll.complete();
        });
    };
    PreviewPage.prototype.navView = function (ev) {
        this.navCtrl.pop();
        ev.stopPropagation();
    };
    PreviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-preview',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/show/preview/preview.html"*/'<!--\n  Generated template for the PreviewPage page.\n\n-->\n<!--水印-->\n<!-- <ion-header>\n  <ion-toolbar>\n    <ion-title>社团活动</ion-title>\n  </ion-toolbar>\n</ion-header> -->\n\n<ion-content class="grid-basic-page">\n  <div *ngIf="SheTuanEND.length <= 0" class="none">\n    <img class="noneimg" src="assets/images/kong.png">\n    <div class="noneFont">暂无更多内容</div>\n  </div>\n  <ion-list *ngFor=" let item of SheTuanEND " style="background-color:#fafafa">\n    <div style="height:15px;"></div>\n    <div class="fn14" style="text-align: center;height: 15px;color:#9B9B9B;">{{item.starttime}}</div>\n    <div style="height:15px;"></div>\n    <ion-card style="margin:2px 0;width:100%;box-shadow:0 2px 5px 0 #E3E3E3 !important;" (click)="godetail(item)">\n        <h2 class="fn18 honor-content" style="text-align: center;margin: 10px 0;color:#4A4A4A;">{{item.name}}</h2>\n          <button ion-item>\n            <ul *ngFor="let item of item.attachmenturl.slice(0,3) ">\n              <li>\n                <img [src]=\'DomS.bypassSecurityTrustUrl(item.attachmenturl)\'>\n              </li>\n            </ul>\n          </button>\n    </ion-card>\n  </ion-list>\n    <ion-infinite-scroll *ngIf="moreDatar" (ionInfinite)="doInfiniter($event)">\n      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n    <div style="text-align: center;color: #8e9093" *ngIf="!moreDatar">我是有底线的！</div>\n\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/show/preview/preview.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */]])
    ], PreviewPage);
    return PreviewPage;
}());

//# sourceMappingURL=preview.js.map

/***/ })

});
//# sourceMappingURL=4.js.map