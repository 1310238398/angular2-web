webpackJsonp([15],{

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotPassReasonPageModule", function() { return NotPassReasonPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notpassreason__ = __webpack_require__(307);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotPassReasonPageModule = /** @class */ (function () {
    function NotPassReasonPageModule() {
    }
    NotPassReasonPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notpassreason__["a" /* NotPassReasonPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__notpassreason__["a" /* NotPassReasonPage */]),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__notpassreason__["a" /* NotPassReasonPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], NotPassReasonPageModule);
    return NotPassReasonPageModule;
}());

//# sourceMappingURL=notpassreason.module.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotPassReasonPage; });
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





var NotPassReasonPage = /** @class */ (function () {
    function NotPassReasonPage(http, HelpUtils, navParams, navCtrl) {
        this.http = http;
        this.HelpUtils = HelpUtils;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.values = 50;
        this.numdisb = true;
        this.remarktxt = '';
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
        };
        this.dataSet = {
            action: '',
            title: '',
            filetext: '',
            timestart: '',
            statustxt: '',
            status: ''
        };
        this.appStatus = '';
    }
    NotPassReasonPage.prototype.ionViewWillEnter = function () {
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
    };
    NotPassReasonPage.prototype.notpassTab = function () {
        var _this = this;
        var fromdata = this.dataObj.input_data;
        fromdata['action'] = "counsellor";
        fromdata['statustxt'] = "辅导员审批不通过";
        fromdata['status'] = "3";
        fromdata['istrue'] = "false";
        fromdata['remarktxt'] = this.remarktxt;
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
                _this.HelpUtils.toastPop('提交成功');
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
    NotPassReasonPage.prototype.exitpage = function () {
        if (this.dataObj.flow_code == 'Process_college_good_member' || this.dataObj.flow_code == 'Process_college_class_advanced_class_group' || this.dataObj.flow_code == 'Process_college_three_good' || this.dataObj.flow_code == 'Process_excellent_cadre_at_the_college_level' || this.dataObj.flow_code == 'Process_excellent_student_cadre') {
            this.navCtrl.push('ThreeGoodDetailPage', { dataPass: this.dataObj, appStatus: this.appStatus });
        }
        else if (this.dataObj.flow_code == 'Process_Prize') {
            this.navCtrl.push('AwardReportDetailPage', { dataPass: this.dataObj, appStatus: this.appStatus });
        }
        else if (this.dataObj.flow_code == 'Process_assessment_plus_information_report') {
            this.navCtrl.push('QualityUpApproveDetailPage', { dataPass: this.dataObj, appStatus: this.appStatus });
        }
        else if (this.dataObj.flow_code == 'Process_New_Stu_Information_Approval') {
            this.navCtrl.push('NewStudentInfoDetailPage', { dataPass: this.dataObj, appStatus: this.appStatus });
        }
    };
    //备注框字数变化
    NotPassReasonPage.prototype.txtChange = function (value) {
        var valueTxt = value.trim();
        this.values = 50 - valueTxt.length;
        if (this.values != 50) {
            this.numdisb = false;
        }
        else {
            this.numdisb = true;
        }
    };
    NotPassReasonPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-notpassreason',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/notpassreason/notpassreason.html"*/'<ion-content padding-top>\n    <div class="cover">\n      <div class="content overh" style="padding:0 15px;">\n        <span class="change-title">请填写审批不通过的原因</span>\n        <div class="pro-text overh center relative">\n          <textarea class=\'file-message mr\' #textarea name="remarktxt" [(ngModel)]="remarktxt" (ngModelChange)="txtChange(textarea.value)"\n            style="resize:none" maxlength="50" cols="1" rows="3"></textarea>\n          <p class="file-num absolute">{{values}}</p>\n        </div>\n      </div>\n      <div class="pro-btn center">\n          <button ion-button class="not-css" outline (click)="exitpage()">取消</button>\n          <button ion-button class="yes-css" [disabled]="numdisb" outline (click)="notpassTab()">确定</button>\n      </div>\n    </div>\n  </ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/approve_box/notpassreason/notpassreason.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], NotPassReasonPage);
    return NotPassReasonPage;
}());

//# sourceMappingURL=notpassreason.js.map

/***/ })

});
//# sourceMappingURL=15.js.map