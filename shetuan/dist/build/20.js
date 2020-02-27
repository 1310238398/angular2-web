webpackJsonp([20],{

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalApplyDetailPageModule", function() { return PersonalApplyDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__personalapply_detail__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PersonalApplyDetailPageModule = /** @class */ (function () {
    function PersonalApplyDetailPageModule() {
    }
    PersonalApplyDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__personalapply_detail__["a" /* PersonalApplyDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__personalapply_detail__["a" /* PersonalApplyDetailPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__personalapply_detail__["a" /* PersonalApplyDetailPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], PersonalApplyDetailPageModule);
    return PersonalApplyDetailPageModule;
}());

//# sourceMappingURL=personalapply_detail.module.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonalApplyDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PersonalApplyDetailPage = /** @class */ (function () {
    function PersonalApplyDetailPage(navParams) {
        this.navParams = navParams;
        this.dataOrigin = {
            status: ''
        };
        this.dataSet = {};
    }
    PersonalApplyDetailPage.prototype.ionViewWillEnter = function () {
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
    PersonalApplyDetailPage.prototype.ionViewDidEnter = function () {
        this.dataOrigin = this.navParams.get('dataPass');
        this.dataSet = this.navParams.get('dataPass').input_data;
        console.log(this.dataOrigin);
        console.log(this.dataSet);
    };
    PersonalApplyDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'personalapply_detail',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/personalapply_wrap/personalapply_detail/personalapply_detail.html"*/'<ion-content class="index-cont">\n    <div class="" *ngIf="dataSet.status == \'3\'" style="padding:20px 15px 15px;">\n        <p class="fn14" style="color:#FF0000">审批不通过原因</p>\n        <p class="fn14" style="color: #9B9B9B;text-indent:2em">{{dataSet.remarktxt}}</p>\n    </div>\n    <P class="fn18 color4a center" style="margin:15px 0;">{{dataSet.title}}</P>\n\n    <img class="absolute" style="width: 50px;top:5px;right:10px;" *ngIf="dataOrigin.status == 9" src="assets/images/yiwncheng@2x.png"\n        alt="">\n    <img class="absolute" style="width: 50px;top:5px;right:10px;" *ngIf="dataSet.status == \'2\' && dataOrigin.status == 1" src="assets/images/shenpizhong@2x.png"\n        alt="">\n    <img class="absolute" style="width: 50px;top:5px;right:10px;" *ngIf="dataSet.status == \'1\' && dataOrigin.status == 1" src="assets/images/shenpizhong@2x.png"\n        alt="">\n    <img class="absolute" style="width: 50px;top:5px;right:10px;" *ngIf="dataSet.status == \'3\'" src="assets/images/butongguo@2x.png"\n        alt="">\n\n    <div class="info-box overh">\n        <pre class="fn14 color4a">{{dataSet.filetext}}</pre>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/personalapply_wrap/personalapply_detail/personalapply_detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], PersonalApplyDetailPage);
    return PersonalApplyDetailPage;
}());

//# sourceMappingURL=personalapply_detail.js.map

/***/ })

});
//# sourceMappingURL=20.js.map