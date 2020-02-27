webpackJsonp([6],{

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewPhotoPageModule", function() { return PreviewPhotoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previewphoto__ = __webpack_require__(315);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PreviewPhotoPageModule = /** @class */ (function () {
    function PreviewPhotoPageModule() {
    }
    PreviewPhotoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__previewphoto__["a" /* PreviewPhotoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__previewphoto__["a" /* PreviewPhotoPage */]),
            ],
        })
    ], PreviewPhotoPageModule);
    return PreviewPhotoPageModule;
}());

//# sourceMappingURL=previewphoto.module.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewPhotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PreviewPhotoPage = /** @class */ (function () {
    function PreviewPhotoPage(DomS, navCtrl, params) {
        this.DomS = DomS;
        this.navCtrl = navCtrl;
        this.params = params;
        this.items = [];
        this.mark = false;
        this.waterMarks = [];
        this.indexInit = 0;
        this.items = this.params.get('items');
        this.time = this.params.get('time');
        console.log(this.items);
        this.indexInit = this.params.get('index');
    }
    PreviewPhotoPage.prototype.ionViewWillEnter = function () {
        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '预览',
            fail: function () { },
            success: ''
        });
        antlinker.configTitleButton({
            showClose: true,
            type: "empty",
            success: '',
            fail: function () { }
        });
    };
    PreviewPhotoPage.prototype.navView = function (ev) {
        this.navCtrl.pop();
        ev.stopPropagation();
    };
    PreviewPhotoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-previewphoto',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/previewphoto/previewphoto.html"*/'<!--\n  Generated template for the PreviewPage page.\n\n-->\n<!--水印-->\n<ion-content class="outer-content" *ngIf="time">\n  <ion-slides pager [loop]=\'items.length>1\'\n              initialSlide={{indexInit}} (click)="navView($event)">\n    <ion-slide *ngFor="let item of items">\n      <img (click)="navView($event)" [src]=\'DomS.bypassSecurityTrustUrl(item.attachmenturl)\'/>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n<ion-content class="outer-content" *ngIf="!time">\n  <ion-slides pager [loop]=\'items.length>1\'\n              initialSlide={{indexInit}} (click)="navView($event)">\n    <ion-slide *ngFor="let item of items">\n      <img [src]=\'DomS.bypassSecurityTrustUrl(item.attachmenturl)\'/>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n\n'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/previewphoto/previewphoto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], PreviewPhotoPage);
    return PreviewPhotoPage;
}());

//# sourceMappingURL=previewphoto.js.map

/***/ })

});
//# sourceMappingURL=6.js.map