webpackJsonp([25],{

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplyListPageModule", function() { return ApplyListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__applylist__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ApplyListPageModule = /** @class */ (function () {
    function ApplyListPageModule() {
    }
    ApplyListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__applylist__["a" /* ApplyListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__applylist__["a" /* ApplyListPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__applylist__["a" /* ApplyListPage */]
            ]
        })
    ], ApplyListPageModule);
    return ApplyListPageModule;
}());

//# sourceMappingURL=applylist.module.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplyListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_http_Service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ApplyListPage = /** @class */ (function () {
    function ApplyListPage(navCtrl, http, HelpUtils) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.dataSet = [];
    }
    //初始化加载
    ApplyListPage.prototype.ionViewWillEnter = function () {
        antlinker.configTitle({
            type: "label",
            title: "我要申请",
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
    ApplyListPage.prototype.ionViewDidEnter = function () {
        this.loadWatchList(); //获取功能列表
    };
    //获取功能列表 
    ApplyListPage.prototype.loadWatchList = function () {
        var _this = this;
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.flowflows,
            Method: 'GET',
            Body: {
                type_code: 'XYSQ'
            }
        }).then(function (res) {
            if (res.length > 0) {
                for (var i = 0; i < res.length; i++) {
                    res[i]['src'] = 'assets/images/' + res[i].code + '.png';
                    _this.dataSet = res;
                }
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //跳转到申请列表页
    ApplyListPage.prototype.NavigationToApplyFrom = function (obj) {
        if (obj.code == 'Process_college_good_member' || obj.code == 'Process_college_class_advanced_class_group' || obj.code == 'Process_college_three_good' || obj.code == 'Process_excellent_cadre_at_the_college_level' || obj.code == 'Process_excellent_student_cadre') {
            this.navCtrl.push('PersonalApplyCreatPage', { item: obj });
        }
        else if (obj.code == 'Process_Prize') {
            this.navCtrl.push('AwardReportApplyPage', { item: obj });
        }
        else if (obj.code == 'Process_assessment_plus_information_report') {
            this.navCtrl.push('QualityUpPage', { item: obj });
        }
    };
    ApplyListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-applylist',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/applylist/applylist.html"*/'<ion-content class="index-cont">\n    <div class="row-mar overh">\n        <div style="overflow: hidden">\n            <div class="row-mar-list fl" (click)="NavigationToApplyFrom(item)" *ngFor="let item of dataSet;let i=index;">\n                <div class="row-mar-list-top center" [ngStyle]="{\'background\':item.memo}">\n                    <img class="row-mar-list-top-img dib" [src]="item.src" alt="">\n                </div>\n                <div class="row-mar-list-top-title fn14 center">{{item.name}}</div>\n            </div>\n            <div class="row-mar-list fl more-add fn12">\n                <p>&nbsp; 更多申请事务</p>\n                <p>&nbsp; 正在梳理中，</p>\n                <p>&nbsp; 敬请期待... </p>\n            </div>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/applylist/applylist.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__["a" /* HelpUtils */]])
    ], ApplyListPage);
    return ApplyListPage;
}());

//# sourceMappingURL=applylist.js.map

/***/ })

});
//# sourceMappingURL=25.js.map