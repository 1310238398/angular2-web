webpackJsonp([23],{

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardReportApplyDetailPageModule", function() { return AwardReportApplyDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__awardreportapplydetail__ = __webpack_require__(300);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AwardReportApplyDetailPageModule = /** @class */ (function () {
    function AwardReportApplyDetailPageModule() {
    }
    AwardReportApplyDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__awardreportapplydetail__["a" /* AwardReportApplyDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__awardreportapplydetail__["a" /* AwardReportApplyDetailPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__awardreportapplydetail__["a" /* AwardReportApplyDetailPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], AwardReportApplyDetailPageModule);
    return AwardReportApplyDetailPageModule;
}());

//# sourceMappingURL=awardreportapplydetail.module.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardReportApplyDetailPage; });
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





var AwardReportApplyDetailPage = /** @class */ (function () {
    function AwardReportApplyDetailPage(http, HelpUtils, navParams, navCtrl) {
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.dataObj = {
            flow_code: '',
            flow_id: '',
            flow_name: '',
            id: 0,
            input_data: {},
            is_back: false,
            launch_time: '',
            launcher: '',
            launcher_name: '',
            node_instance_id: '',
            out_data: '',
            processor: '',
            processor_name: '',
            processor_time: '',
            record_id: '',
            status: 0,
            status_text: '',
            title: '',
        }; //整体数据
        this.dataSet = {
            action: '',
            title: '',
            filetext: '',
            timestart: '',
            statustxt: '',
            AttachmentCode: '',
            status: ''
        };
        this.imagepath = []; //图片
    }
    AwardReportApplyDetailPage.prototype.ionViewWillEnter = function () {
        // 右上角按钮
        antlinker.configTitleButton({
            showClose: true,
            type: "label",
            text: "",
            success: function () { },
            fail: function () { },
            trigger: function () { }
        });
        antlinker.configTitle({
            type: "label",
            title: "校园申请",
            fail: function () { },
            success: function () { }
        });
        this.dataObj = this.navParams.get('dataPass');
        this.dataSet = this.navParams.get('dataPass').input_data;
        console.log(this.dataObj);
        console.log(this.dataSet);
    };
    //初始化加载
    AwardReportApplyDetailPage.prototype.ionViewDidEnter = function () {
        this.loadPathImg();
    };
    //获取图片
    AwardReportApplyDetailPage.prototype.loadPathImg = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.GetUserAttachmentURL,
            Method: 'POST',
            Body: {
                ids: this.dataSet.AttachmentCode
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.imagepath = res.Data;
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //跳转图片放大
    AwardReportApplyDetailPage.prototype.navPreview = function (params) {
        this.navCtrl.push('PreviewPage', params);
    };
    AwardReportApplyDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-awardreportapplydetail',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/awardreport_wrap/awardreportapplydetail/awardreportapplydetail.html"*/'<ion-content class="index-cont">\n    <div class="" *ngIf="dataSet.status == \'3\'" style="padding:20px 15px 15px;">\n        <p class="fn14" style="color:#FF0000">审批不通过原因</p>\n        <p class="fn14" style="color: #9B9B9B;text-indent:2em">{{dataSet.remarktxt}}</p>\n    </div>\n    <P class="fn18 color4a center" style="margin:15px 0;">{{dataSet.title}}</P>\n\n    <img class="absolute" style="width: 50px;top:5px;right:10px;" *ngIf="dataObj.status == 9" src="assets/images/yiwncheng@2x.png"\n        alt="">\n    <img class="absolute" style="width: 50px;top:5px;right:10px;" *ngIf="dataSet.status == \'2\' && dataObj.status == 1" src="assets/images/shenpizhong@2x.png"\n        alt="">\n    <img class="absolute" style="width: 50px;top:5px;right:10px;" *ngIf="dataSet.status == \'1\' && dataObj.status == 1" src="assets/images/shenpizhong@2x.png"\n        alt="">\n    <img class="absolute" style="width: 50px;top:5px;right:10px;" *ngIf="dataSet.status == \'3\'" src="assets/images/butongguo@2x.png"\n        alt="">\n\n    <div class="info-box overh">\n        <ul>\n            <li class="css-li">\n                <span class="color9b fn14 fl" style="width: 21%;">获奖项目 : </span>\n                <span class="color4a fn14 fr">{{dataSet.WinningName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">级别 : </span>\n                <span class="color4a fn14 fr">{{dataSet.RewardLevelsName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">名次 : </span>\n                <span class="color4a fn14 fr">{{dataSet.WinningOrderName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">获奖时间 : </span>\n                <span class="color4a fn14 fr">{{dataSet.AwardDate}}</span>\n            </li>\n            <li style="margin-top:10px;">\n                <p class="color9b fn14">获奖证书 : </p>\n                <div class="img-box center">\n                    <p class="fl center" *ngFor="let item of imagepath;let index=index;">\n                        <img (click)="navPreview({time:false,index:index,items:imagepath})" [src]="item.ThumbnailURL" alt="">\n                    </p>\n                </div>\n            </li>\n        </ul>\n    </div>\n\n\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/awardreport_wrap/awardreportapplydetail/awardreportapplydetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], AwardReportApplyDetailPage);
    return AwardReportApplyDetailPage;
}());

//# sourceMappingURL=awardreportapplydetail.js.map

/***/ })

});
//# sourceMappingURL=23.js.map