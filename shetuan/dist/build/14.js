webpackJsonp([14],{

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QualityUpApproveDetailPageModule", function() { return QualityUpApproveDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qualityupapprovedetail__ = __webpack_require__(308);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var QualityUpApproveDetailPageModule = /** @class */ (function () {
    function QualityUpApproveDetailPageModule() {
    }
    QualityUpApproveDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__qualityupapprovedetail__["a" /* QualityUpApproveDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__qualityupapprovedetail__["a" /* QualityUpApproveDetailPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__qualityupapprovedetail__["a" /* QualityUpApproveDetailPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], QualityUpApproveDetailPageModule);
    return QualityUpApproveDetailPageModule;
}());

//# sourceMappingURL=qualityupapprovedetail.module.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QualityUpApproveDetailPage; });
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






var QualityUpApproveDetailPage = /** @class */ (function () {
    function QualityUpApproveDetailPage(navCtrl, http, DomSanitizer, HelpUtils, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.DomSanitizer = DomSanitizer;
        this.HelpUtils = HelpUtils;
        this.navParams = navParams;
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
        this.appStatus = '1'; //审批状态  1待审批  2 已审批
    }
    QualityUpApproveDetailPage.prototype.ionViewWillEnter = function () {
        antlinker.configTitle({
            type: "label",
            title: "校园申请",
            fail: function () { },
            success: function () { }
        });
        antlinker.configTitleButton({
            showClose: true,
            type: "label",
            text: "",
            success: function () { },
            fail: function () { },
            trigger: function () { }
        });
        this.dataObj = this.navParams.get('dataPass');
        this.appStatus = this.navParams.get('appStatus');
        this.dataSet = this.navParams.get('dataPass').input_data;
        console.log(this.dataObj);
        console.log(this.dataSet);
    };
    //初始化加载
    QualityUpApproveDetailPage.prototype.ionViewDidEnter = function () {
        this.loadPathImg();
    };
    //获取图片
    QualityUpApproveDetailPage.prototype.loadPathImg = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.GetUserAttachmentURL,
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
    QualityUpApproveDetailPage.prototype.navPreview = function (params) {
        this.navCtrl.push('PreviewPage', params);
    };
    //审批提交
    QualityUpApproveDetailPage.prototype.passTabBtn = function () {
        var _this = this;
        var fromdata = this.dataObj.input_data;
        fromdata['action'] = "school";
        fromdata['statustxt'] = "学生工作处审批已通过";
        fromdata['status'] = "2";
        fromdata['istrue'] = "true";
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.starthandle,
            Method: 'POST',
            Body: {
                record_id: this.dataObj.node_instance_id,
                form_data: JSON.stringify(fromdata)
            }
        }).then(function (res) {
            if (res == 'ok') {
                _this.HelpUtils.toastPopTop('审批成功');
                var that_1 = _this;
                setTimeout(function () {
                    that_1.navCtrl.push('IndexApprovePage');
                }, '1000');
            }
            else {
                _this.HelpUtils.toastPopTop(res);
            }
        }, function (err) { return console.log(err); });
    };
    //跳转到拒绝原因页
    QualityUpApproveDetailPage.prototype.notpassTab = function () {
        this.navCtrl.push('NotPassReasonPage', { dataPass: this.dataObj, appStatus: this.appStatus });
    };
    QualityUpApproveDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-qualityupapprovedetail',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/qualityupapprove_detail/qualityupapprovedetail.html"*/'<ion-content class="index-cont">\n\n    <div class="info-cont overh">\n        <div class="fl">\n            <img class="user-header" [src]="dataSet.AvatarUrl" onerror="this.src=\'assets/images/header.png\'">\n        </div>\n        <div class="fl info-detail">\n            <span class="info-detail-name fn16 db">姓名 : {{dataSet.StaffName}}</span>\n            <span class="db fn14">学院: {{dataSet.StaffDepartmentName}}</span>\n        </div>\n    </div>\n\n    <div class="relative titlestatus-box overh">\n        <div class="" *ngIf="dataSet.status == \'3\'" style="padding:20px 15px 15px;">\n            <p class="fn14" style="color:#FF0000">审批不通过原因</p>\n            <p class="fn14" style="color: #9B9B9B;text-indent:2em">{{dataSet.remarktxt}}</p>\n        </div>\n        <P class="fn18 color4a center" style="margin:15px 0;">{{dataSet.title}}</P>\n\n        <img class="absolute img-css" *ngIf="dataSet.status == \'2\'" src="assets/images/yiwncheng@2x.png">\n        <img class="absolute img-css" *ngIf="dataSet.status == \'1\'" src="assets/images/shenpizhong@2x.png">\n        <img class="absolute img-css" *ngIf="dataSet.status == \'3\'" src="assets/images/butongguo@2x.png">\n    </div>\n\n    <div class="info-box overh">\n        <ul>\n            <li class="css-li">\n                <span class="color9b fn14 fl" style="width: 21%;">奖项名称 : </span>\n                <span class="color4a fn14 fr overh"  style="width: 79%;text-align: right;">{{dataSet.WinningName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">级别 : </span>\n                <span class="color4a fn14 fr">{{dataSet.RewardLevelsName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">名次 : </span>\n                <span class="color4a fn14 fr">{{dataSet.WinningOrderName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">获奖时间 : </span>\n                <span class="color4a fn14 fr">{{dataSet.AwardDate}}</span>\n            </li>\n            <li style="margin-top:10px;">\n                <p class="color9b fn14">获奖证书 : </p>\n                <div class="img-box center">\n                    <p class="fl center" *ngFor="let item of imagepath;let index=index;">\n                        <img (click)="navPreview({time:false,index:index,items:imagepath})" [src]="item.ThumbnailURL" alt="">\n                    </p>\n                </div>\n            </li>\n        </ul>\n    </div>\n\n    <div class="center" style="margin:50px 0" *ngIf="appStatus == \'1\'">\n        <button ion-button class="not-css" outline (click)="notpassTab()">审批不通过</button>\n        <button ion-button class="yes-css" outline (click)="passTabBtn()">审批通过</button>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/qualityupapprove_detail/qualityupapprovedetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], QualityUpApproveDetailPage);
    return QualityUpApproveDetailPage;
}());

//# sourceMappingURL=qualityupapprovedetail.js.map

/***/ })

});
//# sourceMappingURL=14.js.map