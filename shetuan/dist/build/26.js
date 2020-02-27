webpackJsonp([26],{

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityPageModule", function() { return ActivityPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__activity__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ActivityPageModule = /** @class */ (function () {
    function ActivityPageModule() {
    }
    ActivityPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__activity__["a" /* ActivityPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__activity__["a" /* ActivityPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__["SelectSearchableModule"],
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__activity__["a" /* ActivityPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], ActivityPageModule);
    return ActivityPageModule;
}());

//# sourceMappingURL=activity.module.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityPage; });
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






var ActivityPage = /** @class */ (function () {
    function ActivityPage(navCtrl, http, DomSanitizer, HelpUtils, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.DomSanitizer = DomSanitizer;
        this.HelpUtils = HelpUtils;
        this.navParams = navParams;
        this.Year = new Date().getFullYear();
        this.values = 50;
        this.uuid = '';
        this.LeaveApply = {
            Activity: '',
            Info: '',
            Starttime: '',
            Place: '',
            Connect: '',
            phone: '',
            peoplenum: '',
            passinfo: ''
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
            code: 'Process_school_activity_apply',
            memo: '',
            name: '社团活动申请',
            record_id: ''
        };
        this.filetext = ''; //输入内容
        this.StudentInfo = {};
        this.MingCiTypes = []; //获奖名次
        this.JiBieTypes = []; //获奖级别
        this.CertifyImgs = [];
        this.RecordIdArr = []; //存储后台返回的RecordID
        this.displayTxt = '取消';
        this.TaskTime = this.nowDay();
        this.subStop = false;
        this.UnionCode = this.navParams.get('UnionCode');
        this.UnionName = this.navParams.get('UnionName');
        this.StaffCode = this.navParams.get('StaffCode');
        this.shetuanstatus = this.navParams.get('shetuanstatus');
        this.ActivityCode = this.navParams.get('ActivityCode');
        this.activitystatus = this.navParams.get('activitystatus');
        this.retijiao = this.navParams.get('retijiao');
    }
    //初始化加载
    ActivityPage.prototype.ionViewWillEnter = function () {
        antlinker.configTitle({
            type: "label",
            title: "社团活动",
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
    ActivityPage.prototype.ionViewDidEnter = function () {
        if (this.activitystatus == 1) {
            this.getactivityinfo();
            this.ActivityStatus = '1';
        }
        else {
            this.ActivityStatus = '2';
        }
        this.loadStudentInfo();
    };
    // 获取已提交的活动信息
    ActivityPage.prototype.getactivityinfo = function () {
        var _this = this;
        console.log(4);
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.getactivityinfo,
            Method: 'POST',
            Body: {
                Uname: this.UnionCode,
                Code: this.ActivityCode
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.LeaveApply = res.Data;
                console.log(_this.LeaveApply);
            }
            else {
                _this.HelpUtils.toastPopTop(res);
            }
        }, function (err) { return console.log(err); });
    };
    //总提交
    ActivityPage.prototype.tabAlert = function () {
        if (this.LeaveApply.Activity.trim() == '') {
            this.HelpUtils.toastPopTop('请输入活动名称');
            return false;
        }
        if (!this.LeaveApply.Info) {
            this.HelpUtils.toastPopTop('请填写活动内容');
            return false;
        }
        if (!this.LeaveApply.Starttime) {
            this.HelpUtils.toastPopTop('请选择举办时间');
            return false;
        }
        if (!this.LeaveApply.Place) {
            this.HelpUtils.toastPopTop('请填写地点');
            return false;
        }
        if (!this.LeaveApply.Connect) {
            this.HelpUtils.toastPopTop('请填写活动联络人');
            return false;
        }
        if (!this.LeaveApply.phone) {
            this.HelpUtils.toastPopTop('请填写联系方式');
            return false;
        }
        if (!this.LeaveApply.peoplenum) {
            this.HelpUtils.toastPopTop('请填写活动人数');
            return false;
        }
        this.subStop = true;
        if (this.LeaveApply.Starttime) {
            var date = new Date((this.LeaveApply).Starttime);
            this.date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        console.log(this.LeaveApply, this.date_value);
        this.setcokie();
    };
    //提交修改
    ActivityPage.prototype.tabAlertr = function () {
        if (this.LeaveApply.Activity.trim() == '') {
            this.HelpUtils.toastPopTop('请输入活动名称');
            return false;
        }
        if (!this.LeaveApply.Info) {
            this.HelpUtils.toastPopTop('请填写活动内容');
            return false;
        }
        if (!this.LeaveApply.Starttime) {
            this.HelpUtils.toastPopTop('请选择举办时间');
            return false;
        }
        if (!this.LeaveApply.Place) {
            this.HelpUtils.toastPopTop('请填写地点');
            return false;
        }
        if (!this.LeaveApply.Connect) {
            this.HelpUtils.toastPopTop('请填写活动联络人');
            return false;
        }
        if (!this.LeaveApply.phone) {
            this.HelpUtils.toastPopTop('请填写联系方式');
            return false;
        }
        if (!this.LeaveApply.peoplenum) {
            this.HelpUtils.toastPopTop('请填写活动人数');
            return false;
        }
        this.subStop = true;
        if (this.LeaveApply.Starttime) {
            var date = new Date((this.LeaveApply).Starttime);
            this.date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        this.setcokie();
    };
    ActivityPage.prototype.cancel = function () {
        var that = this;
        this.subStop = false;
        setTimeout(function () {
            that.navCtrl.push('ShetuanInfoPage', {
                UnionCode: this.UnionCode,
                shetuanstatus: this.shetuanstatus
            });
        }, 1000);
    };
    //======七牛上传
    ActivityPage.prototype.upload = function (obj) {
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
    ActivityPage.prototype.handleFiles = function (event) {
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
    ActivityPage.prototype.getFileExtension = function (filename) {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    };
    //删除附件
    ActivityPage.prototype.deleteCertify = function (event, index) {
        this.CertifyImgs.splice(index, 1);
        this.RecordIdArr.splice(index, 1);
        event.stopPropagation();
    };
    //备注框字数变化
    // txtChange(value: string) {
    //   var valueTxt = value.trim();
    //   this.values = 50 - valueTxt.length;
    //   if (this.values != 50) {
    //     this.subStop = false;
    //   } else {
    //     this.subStop = true;
    //   }
    // }
    //获取当前时间
    ActivityPage.prototype.nowDay = function () {
        var Dates = new Date();
        var year = Dates.getFullYear();
        var month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        var day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day;
    };
    ActivityPage.prototype.ionViewWillLeave = function () {
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
    //获取个人信息
    ActivityPage.prototype.loadStudentInfo = function () {
        var _this = this;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.GetStudentInfo,
            Method: 'POST',
            Body: {
                uid: '',
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.StudentInfo = res.Data;
                console.log('学生信息', _this.StudentInfo);
            }
            else {
                _this.HelpUtils.toastPopTop(res.FeedbackText);
            }
        }, function (err) { return console.log(err); });
    };
    //提交申请
    ActivityPage.prototype.setcokie = function () {
        var _this = this;
        console.log('tmmms');
        this.uuid = this.guidUUid();
        var formData = {
            action: "studentApply",
            title: this.item.name,
            timestart: this.TaskTime,
            statustxt: '社团指导老师审批进行中',
            status: '1',
            ActivityStatus: this.ActivityStatus,
            AVid: this.uuid,
            Uname: this.UnionName,
            ActivityCode: this.ActivityCode,
            UnionCode: this.UnionCode,
            ActivityName: this.LeaveApply.Activity,
            Info: this.LeaveApply.Info,
            Time: this.date_value,
            Place: this.LeaveApply.Place,
            Connect: this.LeaveApply.Connect,
            Phone: this.LeaveApply.phone,
            Num: this.LeaveApply.peoplenum,
        };
        var assignObj = Object.assign(formData, this.StudentInfo);
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.launch,
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
                    that_1.navCtrl.push('ShetuanInfoPage', {
                        UnionCode: this.UnionCode,
                        shetuanstatus: this.shetuanstatus
                    });
                }, 1000);
            }
            else {
                _this.subStop = false;
                _this.HelpUtils.toastPopTop(comments.FeedbackText);
            }
        });
    };
    ActivityPage.prototype.guidUUid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    ActivityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-activity',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/activity/activity.html"*/'<ion-content class="index-cont">\n    <form name="f">\n        <div class="row-mar overh">\n            <P class="fn18 color4a center" style="margin:15px 0;">社团活动申请</P>\n            <div class="cont-form">\n                <ul>\n                    <li class="surplus-num-box" *ngIf="retijiao">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 审批不通过原因</p>\n                        <ion-item>\n                            <ion-textarea maxlength="50" max="50" class="textarea" [(ngModel)]="LeaveApply.passinfo" [readonly]="true" name="passinfo"></ion-textarea>\n                            <!-- <p class="surplus-num" *ngIf="LeaveApply.passinfo.length">{{50 - LeaveApply.passinfo.length}}</p> -->\n                        </ion-item>\n                    </li>\n                    <li class="overh">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 活动名称</p>\n                        <ion-item>\n                            <ion-input type="text" maxlength="30" [(ngModel)]="LeaveApply.Activity" name="Activity"></ion-input>\n                        </ion-item>\n                    </li>\n                    <li class="surplus-num-box">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 活动内容</p>\n                        <!-- <textarea class=\'file-message mr\' #textarea name="filetext" [(ngModel)]="LeaveApply.filetext" (ngModelChange)="txtChange(textarea.value)"\n                                    maxlength="50" rows="2"></textarea> -->\n                        <ion-item>\n                            <ion-textarea maxlength="50" max="50" class="textarea" [(ngModel)]="LeaveApply.Info" name="Info"></ion-textarea>\n                        </ion-item>\n                        <p class="surplus-num" *ngIf="LeaveApply.Info.length">{{50 - LeaveApply.Info.length}}</p>\n                    </li>\n                    <li class="overh">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 举办时间</p>\n                        <ion-item>\n                            <ion-datetime id="Starttime" displayFormat="YYYY-MM-DD" pickerFormat="YYYY MMM DD" monthShortNames="1月, 2月, 3月, 4月, 5月, 6月, 7月, 8月, 9月, 10月, 11月, 12月"\n                                [(ngModel)]="LeaveApply.Starttime" doneText="完成" cancelText="取消" [min]="TaskTime" name="Starttime" [max]="Year+10"></ion-datetime>\n                            <!-- <ion-datetime id="StartDate" displayFormat="YYYY-MM-DD" pickerFormat="YYYY MMM DD" monthShortNames="1月, 2月, 3月, 4月, 5月, 6月, 7月, 8月, 9月, 10月, 11月, 12月"\n                                    [(ngModel)]="LeaveApply.StartDate" doneText="完成" cancelText="取消" [max]="TaskTime" name="StartDate"></ion-datetime> -->\n                        </ion-item>\n                    </li>\n                    <li class="overh">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 举办地点</p>\n                        <ion-item>\n                            <ion-input type="text" maxlength="30" [(ngModel)]="LeaveApply.Place" name="Place"></ion-input>\n                        </ion-item>\n                    </li>\n                    <li class="overh">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 活动联络人</p>\n                        <ion-item>\n                            <ion-input type="text" maxlength="30" [(ngModel)]="LeaveApply.Connect" name="Connect"></ion-input>\n                        </ion-item>\n                    </li>\n                    <li class="overh">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 手机号码</p>\n                        <ion-item>\n                            <ion-input type="number" maxlength="30" [(ngModel)]="LeaveApply.phone" name="phone"></ion-input>\n                        </ion-item>\n                    </li>\n                    <li class="overh">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 预计参加人数</p>\n                        <ion-item>\n                            <ion-input type="number" maxlength="30" [(ngModel)]="LeaveApply.peoplenum" name="peoplenum"></ion-input>\n                        </ion-item>\n                    </li>\n                    <!-- <li>\n                            <p class="text-css">\n                                <i style="color: #ff0000;">*</i> 所获奖项级别</p>\n                            <ion-item>\n                                <ion-select [disabled]="selestFB" [(ngModel)]="LeaveApply.JiBie" interface="action-sheet" [cancelText]="displayTxt" name="JiBie">\n                                    <ion-option [value]=\'item\' *ngFor="let item of JiBieTypes">{{item.CodeName}}\n                                    </ion-option>\n                                </ion-select>\n                            </ion-item>\n                        </li> -->\n                    <!-- <li>\n                            <p class="text-css">\n                                <i style="color: #ff0000;">*</i> 名次</p>\n                            <ion-item>\n                                <ion-select [disabled]="selestMC" [(ngModel)]="LeaveApply.MingCi" interface="action-sheet" [cancelText]="displayTxt" name="MingCi">\n                                    <ion-option [value]=\'item\' *ngFor="let item of MingCiTypes">{{item.CodeName}}\n                                    </ion-option>\n                                </ion-select>\n                            </ion-item>\n                        </li> -->\n                    <!-- <li>\n                            <p class="text-css">\n                                <i style="color: #ff0000;">*</i> 证明材料(证书)</p>\n                            <div class="upload overh">\n                                <span class="container fl relative" *ngIf="CertifyImgs.length<1">\n                                    <input type="file" value="file" class="hiddenFile" (change)="handleFiles($event)">\n                                    <img src="assets/images/add.png" style="width: 100%;">\n                                </span>\n                                <div class="Certify fl relative center" *ngFor="let item of CertifyImgs;let index=index;" [ngClass]="{\'underimg\':index==4}">\n                                    <img class="delete-icon absolute" src="assets/images/delete.png" (click)="deleteCertify($event,index)">\n                                    <img class="file-img" [src]="DomSanitizer.bypassSecurityTrustUrl(item.AttachmentURL)">\n                                </div>\n                                <div class="clear"></div>\n                            </div>\n                        </li> -->\n                </ul>\n            </div>\n        </div>\n    </form>\n    <div class="center" style="margin-top:20px;margin-bottom: 20px;">\n        <!-- <button class="submit-tab mr fn16" ion-button [disabled]="subStop" (click)="tabAlert()" block>提交</button> -->\n        <button *ngIf="activitystatus==1" class="submits-tab" [disabled]="subStop" (click)="cancel()">返回</button>\n        <button *ngIf="activitystatus==1" class="submitr-tab" [disabled]="subStop" (click)="tabAlertr()">提交</button>\n        <button *ngIf="shetuanstatus==1 && !activitystatus" class="submit-tab mr fn16" [disabled]="subStop" (click)="tabAlert()"\n            block>提交</button>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/activity/activity.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], ActivityPage);
    return ActivityPage;
}());

//# sourceMappingURL=activity.js.map

/***/ })

});
//# sourceMappingURL=26.js.map