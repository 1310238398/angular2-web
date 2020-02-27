webpackJsonp([13],{

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeGoodDetailPagePageModule", function() { return ThreeGoodDetailPagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__threegood_detail__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ThreeGoodDetailPagePageModule = /** @class */ (function () {
    function ThreeGoodDetailPagePageModule() {
    }
    ThreeGoodDetailPagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__threegood_detail__["a" /* ThreeGoodDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__threegood_detail__["a" /* ThreeGoodDetailPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__threegood_detail__["a" /* ThreeGoodDetailPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], ThreeGoodDetailPagePageModule);
    return ThreeGoodDetailPagePageModule;
}());

//# sourceMappingURL=threegood_detail.module.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreeGoodDetailPage; });
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





var ThreeGoodDetailPage = /** @class */ (function () {
    function ThreeGoodDetailPage(http, HelpUtils, navParams, navCtrl) {
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
            status: ''
        };
        this.appStatus = '1'; //审批状态  1待审批  2 已审批
        this.numdisb = false;
    }
    ThreeGoodDetailPage.prototype.ionViewWillEnter = function () {
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
    ThreeGoodDetailPage.prototype.ionViewDidEnter = function () {
        this.dataObj = this.navParams.get('dataPass');
        this.appStatus = this.navParams.get('appStatus');
        this.dataSet = this.navParams.get('dataPass').input_data;
        console.log(this.dataSet);
        console.log(this.appStatus);
    };
    //审批提交
    ThreeGoodDetailPage.prototype.passTabBtn = function () {
        var _this = this;
        var fromdata = this.dataObj.input_data;
        fromdata['action'] = "counsellor";
        fromdata['statustxt'] = "辅导员审批已通过";
        fromdata['status'] = "2";
        fromdata['istrue'] = "true";
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
    //跳转到拒绝原因页
    ThreeGoodDetailPage.prototype.notpassTab = function () {
        this.navCtrl.push('NotPassReasonPage', { dataPass: this.dataObj, appStatus: this.appStatus });
    };
    ThreeGoodDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'threegood_detail',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/threegood_detail/threegood_detail.html"*/'<ion-content class="index-cont">\n\n    <div class="info-cont overh">\n        <div class="fl">\n            <img class="user-header" [src]="dataSet.AvatarUrl" onerror="this.src=\'assets/images/header.png\'">\n        </div>\n        <div class="fl info-detail">\n            <span class="info-detail-name fn16 db">姓名 : {{dataSet.Name}}</span>\n            <span class="db fn14">学号: {{dataSet.UserCode}}</span>\n            <span class="db fn14">学院: {{dataSet.AcademyName}}</span>\n        </div>\n    </div>\n\n\n    <div class="relative titlestatus-box overh">\n        <div class="" *ngIf="dataSet.status == \'3\'" style="padding:20px 15px 15px;">\n            <p class="fn14" style="color:#FF0000">审批不通过原因</p>\n            <p class="fn14" style="color: #9B9B9B;text-indent:2em">{{dataSet.remarktxt}}</p>\n        </div>\n        <P class="fn18 color4a center" style="margin:15px 0;">{{dataSet.title}}</P>\n\n        <img class="absolute img-css" *ngIf="dataSet.status == \'2\' && appStatus == \'2\'" src="assets/images/yiwncheng@2x.png">\n        <img class="absolute img-css" *ngIf="appStatus == \'1\'" src="assets/images/shenpizhong@2x.png">\n        <img class="absolute img-css" *ngIf="dataSet.status == \'3\' && appStatus == \'2\'" src="assets/images/butongguo@2x.png">\n    </div>\n\n\n    <div class="userinfo-box overh">\n        <ul>\n            <li class="css-li" *ngIf="dataSet.title != \'院级先进班集体评选\'">\n                <span class="color9b fn14 fl">年龄 : </span>\n                <span class="color4a fn14 fr">{{dataSet.Age}}</span>\n            </li>\n            <li class="css-li" *ngIf="dataSet.title != \'院级先进班集体评选\'">\n                <span class="color9b fn14 fl">政治面貌 : </span>\n                <span class="color4a fn14 fr">{{dataSet.PoliticalName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">专业 : </span>\n                <span class="color4a fn14 fr">{{dataSet.MajorName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">班级 : </span>\n                <span class="color4a fn14 fr">{{dataSet.ClassName}}</span>\n            </li>\n            <li class="css-li">\n                <span class="color9b fn14 fl">入学时间 : </span>\n                <span class="color4a fn14 fr">{{dataSet.EnrollmentDate}}</span>\n            </li>\n            <li class="css-li" *ngIf="dataSet.title == \'院级先进班集体评选\'">\n                <span class="color9b fn14 fl">人数 : </span>\n                <span class="color4a fn14 fr">{{dataSet.ClassStudentNum}}</span>\n            </li>\n            <li class="css-li" *ngIf="dataSet.title != \'院级先进班集体评选\'">\n                <span class="color9b fn14 fl">职务 : </span>\n                <span class="color4a fn14 fr">{{dataSet.PositionNames}}</span>\n            </li>\n        </ul>\n    </div>\n\n\n    <div class="info-box overh">\n        <p class="color4a">主要事迹</p>\n        <p class="color9b" style="line-height: 18px;text-indent:2em;" *ngIf="dataSet.title != \'院级先进班集体评选\'">\n            (主要事迹应包括：思想政治素质情况，各学期学业成绩及获得奖学金情况，所受表彰奖励情况，参加文体社会活动情况，是否获得校级优秀学生称号等，内容填写要客观、翔实。)</p>\n        <pre class="fn14 color4a">{{dataSet.filetext}}</pre>\n    </div>\n\n    <div class="center" style="margin:50px 0" *ngIf="appStatus == \'1\'">\n        <button ion-button class="not-css" outline (click)="notpassTab()">审批不通过</button>\n        <button ion-button class="yes-css" outline [disabled]="numdisb" (click)="passTabBtn()">审批通过</button>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/threegood_detail/threegood_detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], ThreeGoodDetailPage);
    return ThreeGoodDetailPage;
}());

//# sourceMappingURL=threegood_detail.js.map

/***/ })

});
//# sourceMappingURL=13.js.map