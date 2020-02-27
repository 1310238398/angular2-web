webpackJsonp([2],{

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityEndPageModule", function() { return ActivityEndPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__activityend__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ActivityEndPageModule = /** @class */ (function () {
    function ActivityEndPageModule() {
    }
    ActivityEndPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__activityend__["a" /* ActivityEndPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__activityend__["a" /* ActivityEndPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_select_searchable__["SelectSearchableModule"],
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__activityend__["a" /* ActivityEndPage */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], ActivityEndPageModule);
    return ActivityEndPageModule;
}());

//# sourceMappingURL=activityend.module.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityEndPage; });
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






var ActivityEndPage = /** @class */ (function () {
    function ActivityEndPage(navCtrl, http, DomSanitizer, HelpUtils, navParams, DomS) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.DomSanitizer = DomSanitizer;
        this.HelpUtils = HelpUtils;
        this.navParams = navParams;
        this.DomS = DomS;
        this.values = 50;
        this.numdisb = true;
        this.temTitle = '辅导员(班主任)考核加分信息上报';
        this.LeaveApply = {
            Activity: '',
            Info: '',
            endinfo: ''
        };
        this.item = {
            code: '',
            memo: '',
            name: '',
            record_id: ''
        };
        this.CertifyImgs = [];
        this.RecordIdArr = []; //存储后台返回的RecordID
        this.displayTxt = '取消';
        this.TaskTime = this.nowDay();
        this.subStop = false;
        this.ActivityCode = this.navParams.get('ActivityCode');
        this.activitystatus = this.navParams.get('activitystatus');
        this.UnionCode = this.navParams.get('UnionCode');
        this.shetuanstatus = this.navParams.get('shetuanstatus');
    }
    //初始化加载
    ActivityEndPage.prototype.ionViewWillEnter = function () {
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
    ActivityEndPage.prototype.ionViewDidEnter = function () {
        this.getactivityinfo();
    };
    //总提交
    ActivityEndPage.prototype.tabAlert = function () {
        var _this = this;
        if (this.LeaveApply.Activity.trim() == '') {
            this.HelpUtils.toastPopTop('请输入活动名称');
            return false;
        }
        if (!this.LeaveApply.Info) {
            this.HelpUtils.toastPopTop('请填写活动内容');
            return false;
        }
        if (!this.LeaveApply.endinfo) {
            this.HelpUtils.toastPopTop('请填写活动总结');
            return false;
        }
        var RecordIdString = this.RecordIdArr.join(',');
        if (!RecordIdString) {
            this.HelpUtils.toastPopTop('请上传图片');
            return false;
        }
        this.subStop = true;
        this.http.postJSON({
            Router: __WEBPACK_IMPORTED_MODULE_3__app_ServelUrl__["a" /* ServelUrl */].Url.updateactivityend,
            Method: 'POST',
            Body: {
                Status: this.activitystatus,
                Code: this.ActivityCode,
                Name: this.LeaveApply.Activity,
                Info: this.LeaveApply.Info,
                End: this.LeaveApply.endinfo,
                AttachmentCode: RecordIdString,
                Scode: this.UnionCode // 社团活动code为unionstatus表服务
            }
        }).then(function (res) {
            if (!res.FeedbackCode) {
                _this.HelpUtils.toastPopTop('社团活动+1');
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
                _this.HelpUtils.toastPopTop(res);
            }
        }, function (err) { return console.log(err); });
    };
    //======七牛上传
    ActivityEndPage.prototype.upload = function (obj) {
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
    ActivityEndPage.prototype.handleFiles = function (event) {
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
    ActivityEndPage.prototype.getFileExtension = function (filename) {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    };
    //删除附件
    ActivityEndPage.prototype.deleteCertify = function (event, index) {
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
    ActivityEndPage.prototype.nowDay = function () {
        var Dates = new Date();
        var year = Dates.getFullYear();
        var month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        var day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day;
    };
    // 获取已提交的活动信息
    ActivityEndPage.prototype.getactivityinfo = function () {
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
    ActivityEndPage.prototype.ionViewWillLeave = function () {
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
    ActivityEndPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-activityend',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/uploadshetuan/activityend/activityend.html"*/'<ion-content class="index-cont">\n    <form name="f">\n        <div class="row-mar overh">\n            <P class="fn18 color4a center" style="margin:15px 0;color:gray;">社团活动总结</P>\n            <div class="cont-form">\n                <ul>\n                    <li class="overh">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 活动名称：</p>\n                        <ion-item>\n                            <ion-input type="text" maxlength="18" [(ngModel)]="LeaveApply.Activity" name="Activity" style="color:#9B9B9B;"></ion-input>\n                        </ion-item>\n                    </li>\n                    <li class="surplus-num-box">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 活动内容：</p>\n                        <!-- <textarea class=\'file-message mr\' #textarea name="filetext" [(ngModel)]="LeaveApply.filetext" (ngModelChange)="txtChange(textarea.value)"\n                                    maxlength="50" rows="2"></textarea> -->\n                        <ion-item>\n                            <ion-textarea maxlength="50" max="50" class="textarea" [(ngModel)]="LeaveApply.Info" name="Info" style="color:#9B9B9B;"></ion-textarea>\n                        </ion-item>\n                        <p class="surplus-num" *ngIf="LeaveApply.Info.length">{{50 - LeaveApply.Info.length}}</p>\n                    </li>\n                    <li class="surplus-num-box">\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 活动总结：</p>\n                        <!-- <textarea class=\'file-message mr\' #textarea name="filetext" [(ngModel)]="LeaveApply.filetext" (ngModelChange)="txtChange(textarea.value)"\n                                    maxlength="50" rows="2"></textarea> -->\n                        <ion-item>\n                            <ion-textarea maxlength="50" max="50" class="textarea" [(ngModel)]="LeaveApply.endinfo" name="endinfo"></ion-textarea>\n                        </ion-item>\n                        <p class="surplus-num" *ngIf="LeaveApply.endinfo.length">{{50 - LeaveApply.endinfo.length}}</p>\n                    </li>\n                    <li>\n                        <p class="text-css">\n                            <i style="color: #ff0000;">*</i> 现场照片：</p>\n                        <div class="upload overh">\n                            <span class="container fl relative" *ngIf="CertifyImgs.length<9">\n                                <input type="file" value="file" class="hiddenFile" (change)="handleFiles($event)">\n                                <img src="assets/images/add.png" style="width: 100%;">\n                            </span>\n                            <div class="Certify fl relative center" *ngFor="let item of CertifyImgs;let index=index;" [ngClass]="{\'underimg\':index==9}">\n                                <img class="delete-icon absolute" src="assets/images/delete.png" (click)="deleteCertify($event,index)">\n                                <img class="file-img" [src]="DomS.bypassSecurityTrustUrl(item.AttachmentURL)">\n                            </div>\n                            <div class="clear"></div>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </form>\n    <div class="center" style="margin-top:20px;margin-bottom: 20px;">\n        <!-- <button class="submit-tab mr fn16" ion-button [disabled]="subStop" (click)="tabAlert()" block>提交</button> -->\n        <!-- <button *ngIf="UserIconUrl" ion-button color="light" [disabled]="subStop" (click)="tabAlert()">取消</button>\n        <button *ngIf="UserIconUrl" ion-button color="default" [disabled]="subStop" (click)="tabAlert()">提交</button> -->\n        <button ion-button class="submit-tab mr fn16" [disabled]="subStop" (click)="tabAlert()" block>完成</button>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/uploadshetuan/activityend/activityend.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_4__http_http_Service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_5__app_utils_HelpUtils__["a" /* HelpUtils */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ActivityEndPage);
    return ActivityEndPage;
}());

//# sourceMappingURL=activityend.js.map

/***/ })

});
//# sourceMappingURL=2.js.map