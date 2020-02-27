webpackJsonp([5],{

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShetuanPageModule", function() { return ShetuanPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shetuan__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ShetuanPageModule = /** @class */ (function () {
    function ShetuanPageModule() {
    }
    ShetuanPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__shetuan__["a" /* ShetuanPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__shetuan__["a" /* ShetuanPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__shetuan__["a" /* ShetuanPage */]
            ]
        })
    ], ShetuanPageModule);
    return ShetuanPageModule;
}());

//# sourceMappingURL=shetuan.module.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShetuanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_http_Service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_ServelUrl__ = __webpack_require__(191);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ShetuanPage = /** @class */ (function () {
    function ShetuanPage(navCtrl, navParams, http, HelpUtils, DomS) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.DomS = DomS;
        this.items = [];
        this.page = {
            Pagea: 1,
            Page: 1,
            PageSize: 20,
        };
        this.pet = "myshetuan";
        this.shetuanlist = [];
        this.Allshetuanlist = [];
        this.moreData = true;
        this.moreDatae = true;
        this.isdelete = false;
    }
    //初始化加载
    ShetuanPage.prototype.ionViewWillEnter = function () {
        antlinker.configTitle({
            type: "label",
            title: "社团风采",
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
    ShetuanPage.prototype.ionViewDidEnter = function () {
        this.getshetaunlist();
        this.getallshetaunlist();
    };
    //从我的社团进入社团详情页
    ShetuanPage.prototype.openshetuaninfoPage = function (n) {
        console.log(n.Role);
        if (n.Role == '33330006' || n.Role == '33330007') {
            if (n.Days <= 0) {
                this.shetuanstatus = 1; //负责人社团详情
            }
            else {
                this.shetuanstatus = 2; //普通社员
            }
        }
        else {
            this.shetuanstatus = 2; //普通社员
        }
        this.navCtrl.push('ShetuanInfoPage', {
            UnionCode: n.UnionCode,
            Member: n.Member,
            shetuanstatus: this.shetuanstatus
        });
    };
    //从所有社团进入社团详情页
    ShetuanPage.prototype.openashetuaninfoPage = function (n) {
        console.log(n.Role);
        if (n.IsThis == 1) {
            if (n.Role == '33330006' || n.Role == '33330007') {
                if (n.Days <= 0) {
                    this.shetuanstatus = 1; //负责人社团详情
                }
                else {
                    this.shetuanstatus = 2; //普通社员
                }
            }
            else {
                this.shetuanstatus = 2; //普通社员
            }
        }
        else {
            this.shetuanstatus = 3; //非该社团社员
        }
        this.navCtrl.push('ShetuanInfoPage', {
            UnionCode: n.UnionCode,
            shetuanstatus: this.shetuanstatus,
        });
    };
    ShetuanPage.prototype.getallshetaunlist = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_5__app_ServelUrl__["a" /* ServelUrl */].Url.getallshetaunlist,
            Method: 'POST',
            Body: {
                PageNum: this.page.Pagea++,
                PageSize: this.page.PageSize,
                Name: null,
            }
        }).then(function (res) {
            if (res.Data.Datas && !res.FeedbackCode) {
                _this.Allshetuanlist = _this.Allshetuanlist.concat(res.Data.Datas);
            }
        });
    };
    ShetuanPage.prototype.getshetaunlist = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_5__app_ServelUrl__["a" /* ServelUrl */].Url.getshetaunlist,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page++,
                PageSize: this.page.PageSize,
            }
        }).then(function (res) {
            if (res.Data.Datas && !res.FeedbackCode) {
                _this.shetuanlist = _this.shetuanlist.concat(res.Data.Datas);
            }
        });
    };
    ShetuanPage.prototype.doInfinitea = function (infiniteScroll) {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_5__app_ServelUrl__["a" /* ServelUrl */].Url.getallshetaunlist,
            Method: 'POST',
            Body: {
                PageNum: this.page.Pagea++,
                PageSize: this.page.PageSize,
                Name: null,
            }
        }).then(function (res) {
            if (res.Data.Datas && !res.FeedbackCode) {
                _this.moreData = true;
                _this.Allshetuanlist = _this.Allshetuanlist.concat(res.Data.Datas);
            }
            else {
                _this.moreData = false;
            }
            infiniteScroll.complete();
        });
    };
    ShetuanPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_5__app_ServelUrl__["a" /* ServelUrl */].Url.getshetaunlist,
            Method: 'POST',
            Body: {
                PageNum: this.page.Page++,
                PageSize: this.page.PageSize,
                Name: null,
            }
        }).then(function (res) {
            if (res.Data.Datas && !res.FeedbackCode) {
                _this.moreDatae = true;
                _this.shetuanlist = _this.shetuanlist.concat(res.Data.Datas);
            }
            else {
                _this.moreDatae = false;
            }
            infiniteScroll.complete();
        });
    };
    ShetuanPage.prototype.search = function (m) {
        var _this = this;
        console.log(m);
        if (m.length > 20) {
            this.HelpUtils.toastPop('最多输入20字');
            return;
        }
        this.page.Pagea = 1;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_5__app_ServelUrl__["a" /* ServelUrl */].Url.getallshetaunlist,
            Method: 'POST',
            Body: {
                PageNum: this.page.Pagea++,
                PageSize: this.page.PageSize,
                Name: m,
            }
        }).then(function (res) {
            if (!res.FeedbackCode && res.Data.Datas) {
                _this.Allshetuanlist = res.Data.Datas;
            }
            else {
                _this.Allshetuanlist = [];
                _this.HelpUtils.toastPop('未搜索出相关结果');
                console.log(_this.Allshetuanlist);
            }
        });
    };
    ShetuanPage.prototype.delete = function (obi) {
        this.isdelete = true;
    };
    ShetuanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-shetuan',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/shetuan/shetuan.html"*/'<!-- <ion-header>\n    <ion-toolbar>\n        <ion-title>社团风采</ion-title>\n    </ion-toolbar>\n</ion-header> -->\n\n<ion-content class="grid-basic-page">\n    <ion-card style="margin:2px 0;width:100%;box-shadow: 0 2px 5px 0 #E3E3E3 !important;">\n        <div padding>\n            <ion-segment [(ngModel)]="pet">\n                <ion-segment-button value="myshetuan">\n                    我的社团\n                </ion-segment-button>\n                <ion-segment-button value="allshetuan">\n                    全部社团\n                </ion-segment-button>\n            </ion-segment>\n        </div>\n        <div [ngSwitch]="pet">\n            <ion-list *ngSwitchCase="\'allshetuan\'">\n                <form style="width:90%;margin: 0 auto;">\n                    <ion-searchbar name="search" #searchbar [debounce]="350" (ionInput)="search(searchQuery)"\n                        placeholder="搜索" [(ngModel)]="searchQuery" type="search" #si></ion-searchbar>\n                </form>\n            </ion-list>\n        </div>\n\n    </ion-card>\n    <div style="height:3px;background-color: #fafafa;"></div>\n    <div [ngSwitch]="pet">\n        <ion-list *ngSwitchCase="\'allshetuan\'" class="shetuan">\n            <ion-card style="margin: 2px 0 !important;width: 100%;box-shadow:0 2px 5px 0 #E3E3E3 !important;">\n\n                <!-- <ion-item>\n                <ion-avatar item-start>\n                    <img src="assets/img/venkman.jpg">\n                </ion-avatar>\n                <h2>昵称</h2>\n            </ion-item>\n            <ion-card>\n                <ion-card-content>\n                    这是社团内容\n                </ion-card-content>\n            </ion-card> -->\n                <!-- <ion-searchbar (ionInput)="getItems($event)" style="width: 60%;margin-left: 50px;"></ion-searchbar> -->\n                <div *ngIf="Allshetuanlist && Allshetuanlist.length <= 0" class="none">\n                    <img class="noneimg" src="assets/images/kong.png">\n                    <div class="noneFont">暂无更多内容</div>\n                </div>\n\n                <button ion-item *ngFor="let item of Allshetuanlist" (click)="openashetuaninfoPage(item)" icon-start\n                    style="border-bottom:   1px solid #E3E3E3 ;">\n                    <ion-avatar item-start *ngIf="!item.RecordId">\n                        <img id="wechatBox" src="assets/images/社团默认头像.png">\n                    </ion-avatar>\n                    <ion-avatar item-start *ngIf="item.RecordId">\n                        <img id="wechatBox" [src]="DomS.bypassSecurityTrustUrl(item.AttachmentURL)">\n                    </ion-avatar>\n                    <div>\n                        <span class="fn16 color4a">{{item.UnionName}}</span>\n                    </div>\n                    <div>\n                        <p class="fn14 title-content">{{item.UnionInfo}}</p>\n                    </div>\n                    <!-- <ion-icon [name]="\'logo-\' + item.icon" [ngStyle]="{\'color\': item.color}" item-start></ion-icon>\n                            {{ item.title }} -->\n                </button>\n            </ion-card>\n\n            <ion-infinite-scroll *ngIf="moreData && Allshetuanlist.length > 0" (ionInfinite)="doInfinitea($event)">\n                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n            <div style="text-align: center;color: #8e9093;margin-top: 5px;" *ngIf="!moreData">我是有底线的！</div>\n        </ion-list>\n\n\n        <ion-list *ngSwitchCase="\'myshetuan\'" class="shetuan">\n            <ion-card style="margin: 2px 0 !important;width: 100%;box-shadow:0 2px 5px 0 #E3E3E3 !important;">\n\n                <div *ngIf="shetuanlist && shetuanlist.length <= 0" class="none"><img class="noneimg" src="assets/images/kong.png">\n                    <div class="noneFont">暂无更多内容</div>\n                </div>\n\n                <button ion-item *ngFor="let item of shetuanlist" (click)="openshetuaninfoPage(item)" style="border-bottom:   1px solid #E3E3E3 ;">\n                    <ion-avatar item-start *ngIf="!item.RecordId">\n                        <img id="wechatBox" src="assets/images/社团默认头像.png">\n                    </ion-avatar>\n                    <ion-avatar item-start *ngIf="item.RecordId">\n                        <img id="wechatBox" [src]="DomS.bypassSecurityTrustUrl(item.AttachmentURLs)">\n                    </ion-avatar>\n                    <div>\n                        <span class="fn16 color4a">{{item.UnionName}}</span>\n                    </div>\n                    <div>\n                        <p class="fn14 title-content">{{item.UnionInfo}}</p>\n                    </div>\n                </button>\n            </ion-card>\n\n            <!-- <ion-item-sliding *ngFor="let item of shetuanlist" style="border-bottom:   1px solid #E3E3E3 ;">\n                <ion-item>\n\n                    <ion-avatar item-start *ngIf="!item.RecordId">\n                        <img src="assets/images/社团默认头像.png">\n                    </ion-avatar>\n                    <ion-avatar item-start *ngIf="item.RecordId">\n                        <img [src]="DomS.bypassSecurityTrustUrl(item.AttachmentURL)">\n                    </ion-avatar>\n                    <h2 class="fn16">{{item.UnionName}}</h2>\n                    <p class="title-content fn14">{{item.UnionInfo}}</p>\n                    <ion-note class="fn14" item-end>\n                        1111\n                    </ion-note>\n                </ion-item>\n\n                <ion-item-options *ngIf="!isdelete" style="width:60px;">\n                    <button ion-button expandable color="danger" (click)="delete(item)">\n                        <ion-icon name="trash"></ion-icon>\n                        Delete\n                    </button>\n                </ion-item-options>\n                <ion-item-options *ngIf="isdelete" style="width:80px;">\n                    <button ion-button expandable color="danger">\n                        <ion-icon name="trash"></ion-icon>\n                        确认删除\n                    </button>\n                </ion-item-options>\n\n            </ion-item-sliding> -->\n\n            <ion-infinite-scroll *ngIf="moreDatae && shetuanlist.length > 0" (ionInfinite)="doInfinite($event)">\n                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n            <div style="text-align: center;color: #8e9093;margin-top: 5px;" *ngIf="!moreDatae">我是有底线的！</div>\n        </ion-list>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/shetuan/shetuan.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ShetuanPage);
    return ShetuanPage;
}());

//# sourceMappingURL=shetuan.js.map

/***/ })

});
//# sourceMappingURL=5.js.map