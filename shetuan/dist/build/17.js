webpackJsonp([17],{

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AwardReportDetailPageModule", function() { return AwardReportDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__awardreportdetail__ = __webpack_require__(305);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AwardReportDetailPageModule = /** @class */ (function () {
    function AwardReportDetailPageModule() {
    }
    AwardReportDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__awardreportdetail__["a" /* AwardReportDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__awardreportdetail__["a" /* AwardReportDetailPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__awardreportdetail__["a" /* AwardReportDetailPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], AwardReportDetailPageModule);
    return AwardReportDetailPageModule;
}());

//# sourceMappingURL=awardreportdetail.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardReportDetailPage; });
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





var AwardReportDetailPage = /** @class */ (function () {
    function AwardReportDetailPage(http, HelpUtils, navParams, navCtrl) {
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
        this.appStatus = '1'; //审批状态  1待审批  2 已审批
        this.numdisb = false;
        this.imagepath = []; //图片
        this.operator = '';
    }
    AwardReportDetailPage.prototype.ionViewWillEnter = function () {
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
        console.log(this.dataSet);
        console.log(this.appStatus);
    };
    //初始化加载
    AwardReportDetailPage.prototype.ionViewDidEnter = function () {
        this.loadPathImg();
        this.loadGetIntelUser();
    };
    //审批提交
    AwardReportDetailPage.prototype.passTabBtn = function () {
        var _this = this;
        var fromdata = this.dataObj.input_data;
        fromdata['action'] = "counsellor";
        fromdata['statustxt'] = "辅导员审批已通过";
        fromdata['status'] = "2";
        fromdata['istrue'] = "true";
        fromdata['operator'] = this.operator;
        this.numdisb = true;
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.starthandle,
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
                    that_1.numdisb = false;
                }, '1000');
            }
            else {
                console.log(res);
                _this.numdisb = false;
            }
        }, function (err) { return console.log(err); });
    };
    //获取图片
    AwardReportDetailPage.prototype.loadPathImg = function () {
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
    //获取当前用户
    AwardReportDetailPage.prototype.loadGetIntelUser = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.GetIntelUser,
            Method: 'POST',
            Body: {}
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.operator = res.Data;
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //跳转图片放大
    AwardReportDetailPage.prototype.navPreview = function (params) {
        this.navCtrl.push('PreviewPage', params);
    };
    //跳转到拒绝原因页
    AwardReportDetailPage.prototype.notpassTab = function () {
        this.navCtrl.push('NotPassReasonPage', { dataPass: this.dataObj, appStatus: this.appStatus });
    };
    AwardReportDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-awardreportdetail',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/awardreport_detail/awardreportdetail.html"*/'<ion-content class="index-cont">\n\n    <div class="info-cont overh">\n        <div class="fl">\n            <img class="user-header" [src]="dataSet.AvatarUrl" onerror="this.src=\'assets/images/header.png\'">\n        </div>\n        <div class="fl info-detail">\n            <span class="info-detail-name fn16 db">姓名 : {{dataSet.Name}}</span>\n            <span class="db fn14">学号: {{dataSet.UserCode}}</span>\n            <span class="db fn14">学院: {{dataSet.AcademyName}}</span>\n        </div>\n    </div>\n\n\n    <div class="relative titlestatus-box overh">\n        <div class="" *ngIf="dataSet.status == \'3\'" style="padding:20px 15px 15px;">\n            <p class="fn14" style="color:#FF0000">审批不通过原因</p>\n            <p class="fn14" style="color: #9B9B9B;text-indent:2em">{{dataSet.remarktxt}}</p>\n        </div>\n        <P class="fn18 color4a center" style="margin:15px 0;">{{dataSet.title}}</P>\n\n        <img class="absolute img-css" *ngIf="dataSet.status == \'2\' && appStatus == \'2\'" src="assets/images/yiwncheng@2x.png">\n        <img class="absolute img-css" *ngIf="appStatus == \'1\'" src="assets/images/shenpizhong@2x.png">\n        <img class="absolute img-css" *ngIf="dataSet.status == \'3\' && appStatus == \'2\'" src="assets/images/butongguo@2x.png">\n    </div>\n\n    <div class="userinfo-box overh">\n        <ul>\n            <li class="css-li" *ngIf="dataSet.title != \'院级先进班集体评选\'">\n                <span class="color9b fn14 fl">年龄 : </span>\n                <span class="color4a fn14 fr">{{dataSet.Age}}</span>\n            </li>\n            <li class="css-li" *ngIf="dataSet.title != \'院级先进班集体评选\'">\n                <span class="color9b fn14 fl">政治面貌 : </span>\n                <span class="color4a fn14 fr">{{dataSet.PoliticalName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">专业 : </span>\n                <span class="color4a fn14 fr">{{dataSet.MajorName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">班级 : </span>\n                <span class="color4a fn14 fr">{{dataSet.ClassName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">入学时间 : </span>\n                <span class="color4a fn14 fr">{{dataSet.EnrollmentDate}}</span>\n            </li>\n            <li class="css-li" *ngIf="dataSet.title == \'院级先进班集体评选\'">\n                <span class="color9b fn14 fl">人数 : </span>\n                <span class="color4a fn14 fr">{{dataSet.ClassStudentNum}}</span>\n            </li>\n            <li class="css-li" *ngIf="dataSet.title != \'院级先进班集体评选\'">\n                <span class="color9b fn14 fl">职务 : </span>\n                <span class="color4a fn14 fr">{{dataSet.PositionNames}}</span>\n            </li>\n        </ul>\n    </div>\n\n    <div class="info-box overh">\n        <ul>\n            <li class="css-li">\n                <span class="color9b fn14 fl" style="width: 21%;">获奖项目 : </span>\n                <span class="color4a fn14 fr">{{dataSet.WinningName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">级别 : </span>\n                <span class="color4a fn14 fr">{{dataSet.RewardLevelsName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">名次 : </span>\n                <span class="color4a fn14 fr">{{dataSet.WinningOrderName}}</span>\n            </li>\n\n            <li class="css-li">\n                <span class="color9b fn14 fl">获奖时间 : </span>\n                <span class="color4a fn14 fr">{{dataSet.AwardDate}}</span>\n            </li>\n            <li style="margin-top:10px;">\n                <p class="color9b fn14">获奖证书 : </p>\n                <div class="img-box center">\n                    <p class="fl center" *ngFor="let item of imagepath;let index=index;">\n                        <img (click)="navPreview({time:false,index:index,items:imagepath})" [src]="item.ThumbnailURL" alt="">\n                    </p>\n                </div>\n            </li>\n        </ul>\n    </div>\n    <div class="center" style="margin:30px 0;" *ngIf="appStatus == \'1\'">\n        <button ion-button class="not-css" outline (click)="notpassTab()">审批不通过</button>\n        <button ion-button class="yes-css" outline [disabled]="numdisb" (click)="passTabBtn()">审批通过</button>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/awardreport_detail/awardreportdetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], AwardReportDetailPage);
    return AwardReportDetailPage;
}());

//# sourceMappingURL=awardreportdetail.js.map

/***/ })

});
//# sourceMappingURL=17.js.map