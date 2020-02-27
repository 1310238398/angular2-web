webpackJsonp([16],{

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewStudentInfoDetailPageModule", function() { return NewStudentInfoDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__newstudentinfodetail__ = __webpack_require__(306);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewStudentInfoDetailPageModule = /** @class */ (function () {
    function NewStudentInfoDetailPageModule() {
    }
    NewStudentInfoDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__newstudentinfodetail__["a" /* NewStudentInfoDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__newstudentinfodetail__["a" /* NewStudentInfoDetailPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__newstudentinfodetail__["a" /* NewStudentInfoDetailPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], NewStudentInfoDetailPageModule);
    return NewStudentInfoDetailPageModule;
}());

//# sourceMappingURL=newstudentinfodetail.module.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewStudentInfoDetailPage; });
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





var NewStudentInfoDetailPage = /** @class */ (function () {
    function NewStudentInfoDetailPage(navCtrl, http, HelpUtils, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.navParams = navParams;
        this.forbidBt = true; //禁用所有input框
        this.numdisb = false; //审批通过按钮
        this.Headimgurl = ''; //  头像链接
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
        this.FamilyAddress = {
            image: '',
            qq: '',
            email: '',
            wechat: '',
            hobby: '',
            StudentAreaName: '',
            familyaddress: '',
            detailaddress: '',
            postalcode: '',
            homephone: '',
            faith: '',
            bank: '',
            bankcard: '',
            offersrange: '',
            firstguardianname: '',
            firstguardiantitle: '',
            firstguardianemployer: '',
            firstguardianposition: '',
            firstguardiancontact: '',
            secondguardianname: '',
            secondguardiantitle: '',
            secondguardianemployer: '',
            secondguardianposition: '',
            secondguardiancontact: '',
            action: '',
            title: '',
            timestart: '',
            remarktxt: '',
            statustxt: '',
            status: '',
        };
        this.appStatus = '1'; //审批状态  1待审批  2 已审批
    }
    NewStudentInfoDetailPage.prototype.ionViewWillEnter = function () {
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
        this.FamilyAddress = this.navParams.get('dataPass').input_data;
        console.log(this.dataObj);
        console.log(this.appStatus);
        this.loadGetLevelList(); //获取监护人称谓
        this.getImgPath(); //该显示的表单字段
    };
    //审批提交
    NewStudentInfoDetailPage.prototype.passTabBtn = function () {
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
                _this.HelpUtils.toastPop('审批成功');
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
    NewStudentInfoDetailPage.prototype.notpassTab = function () {
        this.navCtrl.push('NotPassReasonPage', { dataPass: this.dataObj, appStatus: this.appStatus });
    };
    //获取监护人称谓
    NewStudentInfoDetailPage.prototype.loadGetLevelList = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.bankyquery,
            Method: 'POST',
            Body: {
                CodeType: "MemberType"
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                for (var i = 0; i < res.Data.length; i++) {
                    if (_this.FamilyAddress.firstguardiantitle == res.Data[i].Code) {
                        _this.FamilyAddress['firstguardiantitleName'] = res.Data[i].CodeName;
                    }
                    if (_this.FamilyAddress.secondguardiantitle == res.Data[i].Code) {
                        _this.FamilyAddress['secondguardiantitleName'] = res.Data[i].CodeName;
                    }
                }
            }
            else {
                console.log(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //获取头像
    NewStudentInfoDetailPage.prototype.getImgPath = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.GetAvatarAddress,
            Method: 'POST',
            Body: {
                avatar: this.FamilyAddress.image
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.Headimgurl = res.Data.url;
            }
            else {
                _this.HelpUtils.toastPop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    NewStudentInfoDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'newstudentinfodetail',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/newstudentinfo_detail/newstudentinfodetail.html"*/'<ion-content class="index-cont">\n    <div class="relative titlestatus-box overh">\n        <div class="" *ngIf="FamilyAddress.status == \'3\'" style="padding:20px 15px 15px;">\n            <p class="fn14" style="color:#FF0000">审批不通过原因</p>\n            <p class="fn14" style="color: #9B9B9B;text-indent:2em">{{FamilyAddress.remarktxt}}</p>\n        </div>\n        <P class="fn18 color4a center" style="margin:15px 0;">{{FamilyAddress.title}}</P>\n\n        <img class="absolute img-css" *ngIf="FamilyAddress.status == \'2\'" src="assets/images/yiwncheng@2x.png">\n        <img class="absolute img-css" *ngIf="appStatus == \'1\'" src="assets/images/shenpizhong@2x.png">\n        <img class="absolute img-css" *ngIf="FamilyAddress.status == \'3\'" src="assets/images/butongguo@2x.png">\n    </div>\n\n    <div class="info-cont overh" style="margin-bottom:30px;">\n        <div class="fl">\n            <img class="user-header" [src]="Headimgurl" onerror="this.src=\'assets/images/header.png\'">\n        </div>\n        <div class="fl info-detail">\n            <span class="info-detail-name fn16 db">姓名 : {{FamilyAddress.Name}}</span>\n            <span class="db fn14">学号: {{FamilyAddress.UserCode}}</span>\n            <span class="db fn14">学院: {{FamilyAddress.AcademyName}}</span>\n        </div>\n    </div>\n\n    <div class="cont-form">\n        <ul>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.qq != \'\'">\n                <span class="dib title-css">QQ号</span>\n                <span class="dib cont-css">{{FamilyAddress.qq}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.email != \'\'">\n                <span class="dib title-css">电子邮箱</span>\n                <span class="dib cont-css">{{FamilyAddress.email}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.wechat != \'\'">\n                <span class="dib title-css">微信号</span>\n                <span class="dib cont-css">{{FamilyAddress.wechat}}</span>\n            </li>\n            <li class="min-ht43 bgfff fn16 padding10" *ngIf="FamilyAddress.hobby != \'\'">\n                <span class="dib title-css vertop">爱好特长</span>\n                <span class="dib cont-css lin-ht20">{{FamilyAddress.hobby}}</span>\n            </li>\n            <li class="min-ht43 bgfff fn16 padding10" *ngIf="FamilyAddress.StudentAreaName != \'\'">\n                <span class="dib title-css vertop">家庭地址</span>\n                <span class="dib cont-css lin-ht20">{{FamilyAddress.StudentAreaName}}</span>\n            </li>\n            <li class="min-ht43 bgfff fn16 padding10" *ngIf="FamilyAddress.detailaddress != \'\'">\n                <span class="dib title-css vertop">详细地址</span>\n                <span class="dib cont-css lin-ht20">{{FamilyAddress.detailaddress}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.postalcode != \'\'">\n                <span class="dib title-css">邮政编码</span>\n                <span class="dib cont-css">{{FamilyAddress.postalcode}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.homephone != \'\'">\n                <span class="dib title-css">家庭电话</span>\n                <span class="dib cont-css">{{FamilyAddress.homephone}}</span>\n            </li>\n            <li class="min-ht43 lin-ht43 fn16" *ngIf="FamilyAddress.firstguardianname != \'\'">\n                <span class="dib title-css">监护人一</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.firstguardianname != \'\'">\n                <span class="dib title-css">姓名</span>\n                <span class="dib cont-css">{{FamilyAddress.firstguardianname}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.firstguardiantitle != \'\'">\n                <span class="dib title-css">称谓</span>\n                <span class="dib cont-css">{{FamilyAddress.firstguardiantitle}}</span>\n            </li>\n            <li class="min-ht43 bgfff fn16 padding10" *ngIf="FamilyAddress.firstguardianemployer != \'\'">\n                <span class="dib title-css vertop">工作单位</span>\n                <span class="dib cont-css lin-ht20">{{FamilyAddress.firstguardianemployer}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.firstguardianposition != \'\'">\n                <span class="dib title-css">职务</span>\n                <span class="dib cont-css">{{FamilyAddress.firstguardianposition}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.firstguardiancontact != \'\'">\n                <span class="dib title-css">联系方式</span>\n                <span class="dib cont-css">{{FamilyAddress.firstguardiancontact}}</span>\n            </li>\n            <li class="min-ht43 lin-ht43 fn16" *ngIf="FamilyAddress.secondguardianname != \'\' || FamilyAddress.secondguardiantitle != \'\' || FamilyAddress.secondguardianemployer != \'\' || FamilyAddress.secondguardianposition != \'\' || FamilyAddress.secondguardiancontact != \'\'">\n                <span class="dib title-css">监护人二</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.secondguardianname != \'\'">\n                <span class="dib title-css">姓名</span>\n                <span class="dib cont-css">{{FamilyAddress.secondguardianname}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.secondguardiantitle != \'\'">\n                <span class="dib title-css">称谓</span>\n                <span class="dib cont-css">{{FamilyAddress.secondguardiantitle}}</span>\n            </li>\n            <li class="min-ht43 bgfff fn16 padding10" *ngIf="FamilyAddress.secondguardianemployer != \'\'">\n                <span class="dib title-css vertop">工作单位</span>\n                <span class="dib cont-css lin-ht20">{{FamilyAddress.secondguardianemployer}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.secondguardianposition != \'\'">\n                <span class="dib title-css">职务</span>\n                <span class="dib cont-css">{{FamilyAddress.secondguardianposition}}</span>\n            </li>\n            <li class="min-ht43 bgfff lin-ht43 fn16" *ngIf="FamilyAddress.secondguardiancontact != \'\'">\n                <span class="dib title-css">联系方式</span>\n                <span class="dib cont-css">{{FamilyAddress.secondguardiancontact}}</span>\n            </li>\n        </ul>\n    </div>\n\n    <div class="center" style="margin:30px 0;" *ngIf="appStatus == \'1\'">\n        <button ion-button class="not-css" outline (click)="notpassTab()">审批不通过</button>\n        <button ion-button class="yes-css" outline [disabled]="numdisb" (click)="passTabBtn()">审批通过</button>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/newstudentinfo_detail/newstudentinfodetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], NewStudentInfoDetailPage);
    return NewStudentInfoDetailPage;
}());

//# sourceMappingURL=newstudentinfodetail.js.map

/***/ })

});
//# sourceMappingURL=16.js.map