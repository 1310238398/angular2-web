webpackJsonp([19],{

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QualityUpPageModule", function() { return QualityUpPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qualityup__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var QualityUpPageModule = /** @class */ (function () {
    function QualityUpPageModule() {
    }
    QualityUpPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__qualityup__["a" /* QualityUpPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__qualityup__["a" /* QualityUpPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__["SelectSearchableModule"],
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__qualityup__["a" /* QualityUpPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], QualityUpPageModule);
    return QualityUpPageModule;
}());

//# sourceMappingURL=qualityup.module.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QualityUpPage; });
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






var QualityUpPage = /** @class */ (function () {
    function QualityUpPage(navCtrl, http, DomSanitizer, HelpUtils, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.DomSanitizer = DomSanitizer;
        this.HelpUtils = HelpUtils;
        this.navParams = navParams;
        this.temTitle = '辅导员(班主任)考核加分信息上报';
        this.LeaveApply = {
            Name: '',
            JiBie: {
                Code: '',
                CodeName: ''
            },
            MingCi: {
                Code: '',
                CodeName: ''
            },
            StartDate: ''
        };
        this.StaffInfo = {
            AvatarUrl: '',
            Name: '',
            UserCode: '',
            IntelUserCode: '',
            Sex: '',
            DepartmentName: '',
        };
        this.item = {
            code: '',
            memo: '',
            name: '',
            record_id: ''
        };
        this.MingCiTypes = []; //获奖名次
        this.JiBieTypes = []; //获奖级别
        this.CertifyImgs = [];
        this.RecordIdArr = []; //存储后台返回的RecordID
        this.displayTxt = '取消';
        this.TaskTime = this.nowDay();
        this.subStop = false;
    }
    QualityUpPage.prototype.ionViewWillEnter = function () {
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
    QualityUpPage.prototype.ionViewDidEnter = function () {
        this.loadGetLevelList(); //获取获奖级别
        this.loadGetMingCi(); //获取获奖名次
        this.loadStaffInfo(); //获取辅导员个人信息
    };
    //获取辅导员个人信息
    QualityUpPage.prototype.loadStaffInfo = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.GetStaffInfo,
            Method: 'POST',
            Body: {
                uid: '',
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.StaffInfo = res.Data;
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //获取获奖级别  国家级 省级
    QualityUpPage.prototype.loadGetLevelList = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.RewardLevelList,
            Method: 'POST',
            Body: {}
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.JiBieTypes = res.Data;
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //获取获奖名次
    QualityUpPage.prototype.loadGetMingCi = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.RewardGradeList,
            Method: 'POST',
            Body: {}
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.MingCiTypes = res.Data;
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //总提交
    QualityUpPage.prototype.tabAlert = function () {
        var _this = this;
        if (this.LeaveApply.Name.trim() == '') {
            this.HelpUtils.toastPopTop('请输入奖项名称');
            return false;
        }
        if (!this.LeaveApply.JiBie.Code) {
            this.HelpUtils.toastPopTop('请选择级别');
            return false;
        }
        if (!this.LeaveApply.MingCi.Code) {
            this.HelpUtils.toastPopTop('请选择名次');
            return false;
        }
        if (!this.LeaveApply.StartDate) {
            this.HelpUtils.toastPopTop('请选择获奖时间');
            return false;
        }
        if (!this.CertifyImgs.length) {
            this.HelpUtils.toastPopTop('请添加获奖证书');
            return false;
        }
        this.subStop = true;
        var RecordIdString = this.RecordIdArr.join(',');
        var formData = {
            action: "counsellorApply",
            title: this.temTitle,
            timestart: this.TaskTime,
            WinningName: this.LeaveApply.Name,
            RewardLevelsCode: this.LeaveApply.JiBie.Code,
            RewardLevelsName: this.LeaveApply.JiBie.CodeName,
            WinningOrderCode: this.LeaveApply.MingCi.Code,
            WinningOrderName: this.LeaveApply.MingCi.CodeName,
            AwardDate: this.LeaveApply.StartDate,
            AttachmentCode: RecordIdString,
            StaffAvatarUrl: this.StaffInfo.AvatarUrl,
            StaffName: this.StaffInfo.Name,
            StaffUserCode: this.StaffInfo.UserCode,
            StaffIntelUserCode: this.StaffInfo.IntelUserCode,
            StaffSex: this.StaffInfo.Sex,
            StaffDepartmentName: this.StaffInfo.DepartmentName,
            statustxt: '学生工作处审批进行中',
            status: '1'
        };
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.launch,
            Method: 'POST',
            Body: {
                flow_id: '',
                flow_code: this.item.code,
                form_data: JSON.stringify(formData)
            }
        }).then(function (res) {
            if (res == 'ok') {
                _this.HelpUtils.toastPopTop('提交成功');
                var that_1 = _this;
                setTimeout(function () {
                    that_1.navCtrl.push('IndexApplyPage');
                }, '1000');
            }
            else {
                _this.subStop = false;
                _this.HelpUtils.toastPopTop(res);
            }
        }, function (err) { return console.log(err); });
    };
    //======七牛上传
    QualityUpPage.prototype.upload = function (obj) {
        this.fileLoading = this.HelpUtils.loadingPop('正在上传，请稍等...');
        var that = this;
        var observable = qiniu.upload(obj.file, obj.key, obj.token, {
            mimeType: ["image/png", "image/jpeg", "image/jpg"]
        }, {
            useCdnDomain: true
        });
        var observer = {
            next: function (res) {
                console.log(res);
                // ...
            },
            error: function (err) {
                that.HelpUtils.toastPop(err.message);
                return false;
                // ...
            },
            complete: function (res) {
                var file = obj.file;
                that.fileLoading.dismiss();
                that.http.postJSON({
                    Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.saveAttach, Method: 'POST', Body: {
                        BizType: 'StudentNeedSupport',
                        AttachmentItemName: file.name || '',
                        AttachmentItemType: file.type,
                        AttachmentItemSize: file.size.toString(),
                        AttachmentURL: res.key,
                        Base64: '',
                    }
                }).then(function (response) {
                    if (!response.FeedbackCode) {
                        that.RecordIdArr.push(response.Data.RecordID);
                        that.CertifyImgs.push({
                            RecordID: response.Data.RecordID,
                            Caption: '',
                            AttachmentURL: window.URL.createObjectURL(file),
                            AttachmentItemSize: file.size.toString(),
                            AttachmentItemType: file.type,
                            AttachmentItemName: file.name,
                        });
                    }
                    else {
                        that.HelpUtils.toastPop(response.FeedbackText);
                    }
                    console.log(res);
                });
            }
        };
        var subscription = observable.subscribe(observer); // 上传开始
    };
    QualityUpPage.prototype.handleFiles = function (event) {
        var _this = this;
        var file = event.target.files[0];
        console.log(file.size, '11111111111');
        if (file.size > 5242880) {
            this.HelpUtils.toastPop('文件大小限制:5M');
            return;
        }
        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
            this.HelpUtils.toastPop('格式错误,请选择"png,jpeg,jpg"格式文件上传');
            return;
        }
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getUpToken,
            Method: 'POST',
            Body: {
                Name: file.name,
                Size: file.size,
                BizType: "SchoolApply"
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.upload({ file: file, key: res.Data.Key, token: res.Data.Proof });
            }
            else if (res.FeedbackText == '获取上传KEY有误，请稍后重试') {
                _this.HelpUtils.toastPopTop('图片错误,请重新选择其他图片上传');
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        });
    };
    //获取上传文件后缀名
    QualityUpPage.prototype.getFileExtension = function (filename) {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    };
    //删除附件
    QualityUpPage.prototype.deleteCertify = function (event, index) {
        this.CertifyImgs.splice(index, 1);
        this.RecordIdArr.splice(index, 1);
        event.stopPropagation();
    };
    //获取当前时间
    QualityUpPage.prototype.nowDay = function () {
        var Dates = new Date();
        var year = Dates.getFullYear();
        var month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        var day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day;
    };
    QualityUpPage.prototype.ionViewWillLeave = function () {
        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        var d = document.querySelector('ion-backdrop');
        if (d) {
            d.dispatchEvent(event);
        }
    };
    QualityUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-qualityup',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/qualityup_wrap/qualityup/qualityup.html"*/'<ion-content class="index-cont">\n    <form name="f">\n        <div class="row-mar overh">\n            <P class="fn18 color4a center" style="margin:15px 0;">辅导员(班主任){{item.name}}</P>\n            <div class="cont-form">\n                <ul>\n                    <li class="overh">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 奖项名称</p>\n                        <ion-item>\n                            <ion-input type="text" maxlength="18" [(ngModel)]="LeaveApply.Name" name="Name"></ion-input>\n                        </ion-item>\n                    </li>\n                    <li>\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 所获奖项级别</p>\n                        <ion-item>\n                            <ion-select [disabled]="selestFB" [(ngModel)]="LeaveApply.JiBie" interface="action-sheet" [cancelText]="displayTxt" name="JiBie">\n                                <ion-option [value]=\'item\' *ngFor="let item of JiBieTypes">{{item.CodeName}}\n                                </ion-option>\n                            </ion-select>\n                        </ion-item>\n                    </li>\n                    <li>\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 名次</p>\n                        <ion-item>\n                            <ion-select [disabled]="selestMC" [(ngModel)]="LeaveApply.MingCi" interface="action-sheet" [cancelText]="displayTxt" name="MingCi">\n                                <ion-option [value]=\'item\' *ngFor="let item of MingCiTypes">{{item.CodeName}}\n                                </ion-option>\n                            </ion-select>\n                        </ion-item>\n                    </li>\n                    <li>\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 获奖时间</p>\n                        <ion-item>\n                            <ion-datetime id="StartDate" displayFormat="YYYY-MM-DD" pickerFormat="YYYY MMM DD" monthShortNames="1月, 2月, 3月, 4月, 5月, 6月, 7月, 8月, 9月, 10月, 11月, 12月"\n                                [(ngModel)]="LeaveApply.StartDate" doneText="完成" cancelText="取消" [max]="TaskTime" name="StartDate"></ion-datetime>\n                        </ion-item>\n                    </li>\n                    <li>\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 证明材料(证书)</p>\n                        <div class="upload overh">\n                            <span class="container fl relative" *ngIf="CertifyImgs.length<1">\n                                <input type="file" value="file" class="hiddenFile" (change)="handleFiles($event)">\n                                <img src="assets/images/add.png" style="width: 100%;">\n                            </span>\n                            <div class="Certify fl relative center" *ngFor="let item of CertifyImgs;let index=index;" [ngClass]="{\'underimg\':index==4}">\n                                <img class="delete-icon absolute" src="assets/images/delete.png" (click)="deleteCertify($event,index)">\n                                <img class="file-img" [src]="DomSanitizer.bypassSecurityTrustUrl(item.AttachmentURL)">\n                            </div>\n                            <div class="clear"></div>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </form>\n    <div class="center" style="margin:20px;">\n        <button class="submit-tab mr fn16" ion-button [disabled]="subStop" (click)="tabAlert()" block>提交</button>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/apply_box/qualityup_wrap/qualityup/qualityup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], QualityUpPage);
    return QualityUpPage;
}());

//# sourceMappingURL=qualityup.js.map

/***/ })

});
//# sourceMappingURL=19.js.map