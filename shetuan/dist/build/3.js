webpackJsonp([3],{

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewDetailPageModule", function() { return PreviewDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previewdetail__ = __webpack_require__(318);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PreviewDetailPageModule = /** @class */ (function () {
    function PreviewDetailPageModule() {
    }
    PreviewDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__previewdetail__["a" /* PreviewDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__previewdetail__["a" /* PreviewDetailPage */]),
            ],
        })
    ], PreviewDetailPageModule);
    return PreviewDetailPageModule;
}());

//# sourceMappingURL=previewdetail.module.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewDetailPage; });
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






var PreviewDetailPage = /** @class */ (function () {
    function PreviewDetailPage(DomS, navCtrl, navParams, http, HelpUtils) {
        this.DomS = DomS;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.items = [];
        this.mark = false;
        this.waterMarks = [];
        this.indexInit = 0;
        this.Endpage = {
            lastid: 1,
            count: 5
        };
        this.honorpicture = false;
        this.SheTuanEND = [];
        this.UnionCode = this.navParams.get('UnionCode');
        this.Member = this.navParams.get('Member');
        this.shetuanstatus = this.navParams.get('shetuanstatus');
        this.ActivityCode = this.navParams.get('ActivityCode');
        this.getunionendoneinfo();
    }
    //初始化加载
    PreviewDetailPage.prototype.ionViewWillEnter = function () {
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
            success: function () {
                // this.navCtrl.push('PreviewPage', {
                //   UnionCode: this.UnionCode,
                //   shetuanstatus: this.shetuanstatus,
                //   Member: this.Member
                // });
            },
            fail: function () { },
            trigger: function () { }
        });
    };
    //初始化加载
    PreviewDetailPage.prototype.ionViewDidEnter = function () {
    };
    //跳转图片放大
    PreviewDetailPage.prototype.navPreview = function (params) {
        this.navCtrl.push('PreviewPhotoPage', params);
    };
    //加载社团活动总结
    PreviewDetailPage.prototype.getunionendoneinfo = function () {
        var _this = this;
        console.log(9);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getunionendoneinfo,
            Method: 'POST',
            Body: {
                Uname: this.ActivityCode,
                pageindex: this.Endpage.lastid,
                pagesize: this.Endpage.count
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                // for (let i = 0; i < res.length; i++) {
                //   res[i].Data = JSON.parse(res[i].Data);
                // }
                _this.SheTuanEND = res.Data.data;
                console.log(_this.SheTuanEND);
            }
        });
    };
    PreviewDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-previewdetail',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/show/previewdetail/previewdetail.html"*/'<!--\n  Generated template for the PreviewPage page.\n\n-->\n<!--水印-->\n<!-- <ion-header>\n  <ion-toolbar>\n    <ion-title>社团活动</ion-title>\n  </ion-toolbar>\n</ion-header> -->\n\n<ion-content class="grid-basic-page PreviewPage" style="background-color:#fafafa;">\n  <ion-card *ngFor=" let item of SheTuanEND " style="margin:2px 0;width:100%;box-shadow:0 2px 5px 0 #E3E3E3 !important;">\n    <ion-card-content>\n      <ion-item>\n        <h2 class="center fn18 honor-content" style="color:#4A4A4A;">{{item.name}}</h2>\n        <div class="center fn14" style="margin-top:10px;">\n          <span style="color:gray;">活动负责人：<span style="color:#4A4A4A;">{{item.username}}</span></span>\n        </div>\n        <div class="center fn14" style="margin-top:5px;">\n          <span style="margin-left:10px;color:gray;">举办时间：<span style="color:#4A4A4A;">{{item.starttime}}</span></span>\n        </div>\n        <div class="hr">\n          <ul *ngFor="let itam of item.attachmenturl;let index=index;">\n            <li>\n              <img (click)="navPreview({time:false,index:index,items:item.attachmenturl})" [src]=\'DomS.bypassSecurityTrustUrl(itam.attachmenturl)\'\n                alt="">\n            </li>\n          </ul>\n        </div>\n      </ion-item>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/show/previewdetail/previewdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */]])
    ], PreviewDetailPage);
    return PreviewDetailPage;
}());

//# sourceMappingURL=previewdetail.js.map

/***/ })

});
//# sourceMappingURL=3.js.map