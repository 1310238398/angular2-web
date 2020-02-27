webpackJsonp([21],{

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalApplyCreatPageModule", function() { return PersonalApplyCreatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__personalapply_creat__ = __webpack_require__(302);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PersonalApplyCreatPageModule = /** @class */ (function () {
    function PersonalApplyCreatPageModule() {
    }
    PersonalApplyCreatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__personalapply_creat__["a" /* PersonalApplyCreatPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__personalapply_creat__["a" /* PersonalApplyCreatPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__personalapply_creat__["a" /* PersonalApplyCreatPage */]
            ],
        })
    ], PersonalApplyCreatPageModule);
    return PersonalApplyCreatPageModule;
}());

//# sourceMappingURL=personalapply_creat.module.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonalApplyCreatPage; });
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





var PersonalApplyCreatPage = /** @class */ (function () {
    function PersonalApplyCreatPage(navCtrl, navParams, http, HelpUtils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.values = 3000;
        this.numdisb = true;
        this.filetext = ''; //输入内容
        this.item = {
            code: '',
            memo: '',
            name: '',
            record_id: ''
        };
        this.timeNow = this.nowDay();
        this.StudentInfo = {};
    }
    PersonalApplyCreatPage.prototype.ionViewWillEnter = function () {
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
        this.item = this.navParams.get('item');
        console.log(this.item);
    };
    //初始化加载
    PersonalApplyCreatPage.prototype.ionViewDidEnter = function () {
        this.loadStudentInfo(); //获取个人信息
    };
    //获取个人信息
    PersonalApplyCreatPage.prototype.loadStudentInfo = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.GetStudentInfo,
            Method: 'POST',
            Body: {
                uid: '',
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.StudentInfo = res.Data;
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //提交申请
    PersonalApplyCreatPage.prototype.setcokie = function () {
        var _this = this;
        var formData = {
            action: "studentApply",
            title: this.item.name,
            filetext: this.filetext,
            timestart: this.timeNow,
            statustxt: '辅导员审批进行中',
            status: '1',
        };
        var assignObj = Object.assign(formData, this.StudentInfo);
        this.numdisb = true;
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.launch,
            Method: 'POST',
            Body: {
                flow_id: '',
                flow_code: this.item.code,
                form_data: JSON.stringify(assignObj)
            }
        }).then(function (comments) {
            if (comments == 'ok') {
                _this.HelpUtils.toastPopTop('提交成功');
                var that_1 = _this;
                setTimeout(function () {
                    that_1.navCtrl.push('IndexApplyPage');
                    this.numdisb = false;
                }, '1000');
            }
            else {
                _this.HelpUtils.toastPopTop(comments.FeedbackText);
            }
        });
    };
    //备注框字数变化
    PersonalApplyCreatPage.prototype.txtChange = function (value) {
        var valueTxt = value.trim();
        this.values = 3000 - valueTxt.length;
        if (this.values != 3000) {
            this.numdisb = false;
        }
        else {
            this.numdisb = true;
        }
    };
    //获取日期
    PersonalApplyCreatPage.prototype.nowDay = function () {
        var Dates = new Date();
        var year = Dates.getFullYear();
        var month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        var day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day;
    };
    PersonalApplyCreatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'personalapply_creat',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/personalapply_wrap/personalapply_creat/personalapply_creat.html"*/'<ion-content padding-top>\n  <div class="cover">\n    <div class="content overh" style="padding:0 15px;">\n      <p class="change-title fn18 color4a center" style="margin:15px 0;">{{item.name}}</p>\n\n      <div class="pro-text overh relative">\n        <p class="left color4a fn14">\n          <span style="color: red;">*</span>\n          <span>主要事迹</span>\n        </p>\n        <p class="color9b" style="line-height: 18px;text-indent:2em;" *ngIf="item.code != \'Process_college_class_advanced_class_group\'">\n          (主要事迹应包括：思想政治素质情况，各学期学业成绩及获得奖学金情况，所受表彰奖励情况，参加文体社会活动情况，是否获得校级优秀学生称号等，内容填写要客观、翔实。)</p>\n        <textarea class=\'file-message mr\' #textarea name="filetext" [(ngModel)]="filetext" (ngModelChange)="txtChange(textarea.value)"\n          maxlength="3000" rows="5"></textarea>\n        <p class="file-num absolute">{{values}}</p>\n      </div>\n    </div>\n    <div class="pro-btn center">\n      <button ion-button color="secondary" [disabled]="numdisb" (click)="setcokie()">确定</button>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/personalapply_wrap/personalapply_creat/personalapply_creat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__["a" /* HelpUtils */]])
    ], PersonalApplyCreatPage);
    return PersonalApplyCreatPage;
}());

//# sourceMappingURL=personalapply_creat.js.map

/***/ })

});
//# sourceMappingURL=21.js.map