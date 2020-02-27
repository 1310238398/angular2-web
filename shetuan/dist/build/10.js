webpackJsonp([10],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexApprovePageModule", function() { return IndexApprovePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__indexapprove__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IndexApprovePageModule = /** @class */ (function () {
    function IndexApprovePageModule() {
    }
    IndexApprovePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__indexapprove__["a" /* IndexApprovePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__indexapprove__["a" /* IndexApprovePage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__indexapprove__["a" /* IndexApprovePage */]
            ]
        })
    ], IndexApprovePageModule);
    return IndexApprovePageModule;
}());

//# sourceMappingURL=indexapprove.module.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexApprovePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_http_Service__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IndexApprovePage = /** @class */ (function () {
    function IndexApprovePage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.dataSet = []; //列表数据
        this.hiddenBox = false; //进程弹框
        this.haveClass = false; //页面是否有数据
        this.dataPrecess = []; //进程数据列表
        this.approvalNum = '1';
        this.waitShell = 'yes-css';
        this.overShell = 'not-css';
        this.notPassText = false; //拒绝原因
        this.notRemark = '';
        this.Page = 0;
        this.moreData = true;
        this.PageNo = 20;
        this.appStatus = '1'; //审批状态  1待审批  2 已审批
    }
    IndexApprovePage.prototype.ionViewWillEnter = function () {
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
        this.waitShell = 'yes-css';
        this.overShell = 'not-css';
    };
    IndexApprovePage.prototype.ionViewDidEnter = function () {
        this.loadIndexJson();
    };
    //获取数据  待审批  
    IndexApprovePage.prototype.loadIndexJson = function () {
        var _this = this;
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.flowtodo,
            Method: 'GET',
            Body: {
                type_code: 'XYSQ,XSXXTB',
                count: this.PageNo,
                last_id: this.Page
            }
        }).then(function (res) {
            if (res.length > 0) {
                for (var i = 0; i < res.length; i++) {
                    res[i].input_data = JSON.parse(res[i].input_data);
                }
                _this.dataSet = res;
                _this.haveClass = false;
            }
            else {
                _this.haveClass = true;
            }
        }, function (err) { return console.log(err); });
    };
    //已审批数据  
    IndexApprovePage.prototype.loadOverJson = function () {
        var _this = this;
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.flowshandle,
            Method: 'GET',
            Body: {
                type_code: 'XYSQ,XSXXTB',
                count: this.PageNo,
                last_id: this.Page
            }
        }).then(function (res) {
            if (res.length > 0) {
                for (var i = 0; i < res.length; i++) {
                    res[i].input_data = JSON.parse(res[i].input_data);
                }
                _this.dataSet = res;
                _this.haveClass = false;
            }
            else {
                _this.haveClass = true;
            }
        }, function (err) { return console.log(err); });
    };
    //打开日期框 获取审批进程 --工作流 
    IndexApprovePage.prototype.openBox = function (obj) {
        var _this = this;
        this.http.postFLOW({
            Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.flowshistory,
            Method: 'GET',
            Body: {
                flow_instance_id: obj
            }
        }).then(function (res) {
            for (var i = 1; i < res.length; i++) {
                res[i].input_data = JSON.parse(res[i].input_data);
            }
            _this.dataPrecess = res;
            _this.hiddenBox = true;
        }, function (err) { return console.log(err); });
    };
    //待审批按钮
    IndexApprovePage.prototype.changeWait = function () {
        this.appStatus = '1';
        this.waitShell = 'yes-css';
        this.overShell = 'not-css';
        this.moreData = true;
        this.loadIndexJson();
    };
    //已审批按钮
    IndexApprovePage.prototype.changeOver = function () {
        this.appStatus = '2';
        this.waitShell = 'not-css';
        this.overShell = 'yes-css';
        this.moreData = true;
        this.loadOverJson();
    };
    IndexApprovePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        var last_id = this.dataSet[this.dataSet.length - 1].id;
        if (this.appStatus == '1') {
            this.http.postFLOW({
                Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.flowtodo,
                Method: 'GET',
                Body: {
                    type_code: 'XYSQ,XSXXTB',
                    count: this.PageNo,
                    last_id: last_id
                }
            }).then(function (res) {
                if (res.length > 0) {
                    _this.moreData = true;
                    for (var i = 0; i < res.length; i++) {
                        res[i].input_data = JSON.parse(res[i].input_data);
                    }
                    _this.dataSet = _this.dataSet.concat(res);
                }
                else {
                    _this.moreData = false;
                }
                infiniteScroll.complete();
            }, function (err) { return console.log(err); });
        }
        else if (this.appStatus == '2') {
            this.http.postFLOW({
                Router: __WEBPACK_IMPORTED_MODULE_2__app_ServelUrl__["a" /* ServelUrl */].Url.flowshandle,
                Method: 'GET',
                Body: {
                    type_code: 'XYSQ,XSXXTB',
                    count: this.PageNo,
                    last_id: last_id
                }
            }).then(function (res) {
                if (res.length > 0) {
                    _this.moreData = true;
                    for (var i = 0; i < res.length; i++) {
                        res[i].input_data = JSON.parse(res[i].input_data);
                    }
                    _this.dataSet = _this.dataSet.concat(res);
                }
                else {
                    _this.moreData = false;
                }
                infiniteScroll.complete();
            }, function (err) { return console.log(err); });
        }
    };
    //进入申请详情页
    IndexApprovePage.prototype.NavigationTo = function (obj) {
        if (obj.flow_code == 'Process_college_good_member' || obj.flow_code == 'Process_college_class_advanced_class_group' || obj.flow_code == 'Process_college_three_good' || obj.flow_code == 'Process_excellent_cadre_at_the_college_level' || obj.flow_code == 'Process_excellent_student_cadre') {
            this.navCtrl.push('ThreeGoodDetailPage', { dataPass: obj, appStatus: this.appStatus });
        }
        else if (obj.flow_code == 'Process_Prize') {
            this.navCtrl.push('AwardReportDetailPage', { dataPass: obj, appStatus: this.appStatus });
        }
        else if (obj.flow_code == 'Process_assessment_plus_information_report') {
            this.navCtrl.push('QualityUpApproveDetailPage', { dataPass: obj, appStatus: this.appStatus });
        }
        else if (obj.flow_code == 'Process_New_Stu_Information_Approval') {
            this.navCtrl.push('NewStudentInfoDetailPage', { dataPass: obj, appStatus: this.appStatus });
        }
    };
    //关闭日期框
    IndexApprovePage.prototype.closeTab = function () {
        this.hiddenBox = false;
    };
    IndexApprovePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-indexapprove',template:/*ion-inline-start:"/home/user02/learn/angular-webapp/shetuan/src/pages/indexapprove/indexapprove.html"*/'<ion-content class="index-cont">\n    <div class="btn-wrap center overh">\n        <span class="dib fn14 center fl" [ngClass]=\'waitShell\' (click)="changeWait()">待审批</span>\n        <span class="dib fn14 center fr" [ngClass]=\'overShell\' (click)="changeOver()">已审批</span>\n    </div>\n\n    <div *ngIf="!haveClass">\n        <ion-list no-lines>\n            <div class="overh" *ngFor="let data of dataSet" style="margin-bottom:5px;box-shadow: 0 2px 5px 0 #E3E3E3;">\n                <ion-item style="border-bottom:none!important;" (click)="NavigationTo(data)">\n                    <h2 class="class-title fn16">{{data.title}}</h2>\n                    <p class="fn14">\n                        <span class="gray-c">申请时间 : {{data.input_data.timestart}}</span>\n                        <span class="gray-c" style="margin-left:10px;">申请人 : </span>\n                        <span class="gray-4a">{{data.launcher_name}}</span>\n                    </p>\n                    <p item-end class="center">\n                        <img class="db mr" src="assets/images/gengduo.png">\n                    </p>\n                </ion-item>\n                <p class="detail-text" style="color: #4A90E2;">\n                    <span class="gray-c fn14">状态 : </span>\n                    <span class="fn14" style="color: #59B4F9;" *ngIf="data.input_data.status == \'1\'">{{data.input_data.statustxt}}</span>\n                    <span class="fn14" style="color: #69C701;" *ngIf="data.input_data.status == \'2\'">{{data.input_data.statustxt}}</span>\n                    <span class="fn14" style="color: #FF4E4E;" *ngIf="data.input_data.status == \'3\'">{{data.input_data.statustxt}}</span>\n                    <span class="fn12 fr" style="color: #FFC000;" (click)="openBox(data.record_id)">查看申请进度</span>\n                </p>\n            </div>\n        </ion-list>\n\n        <div class="ssc-ov fixed" *ngIf="hiddenBox" (click)="closeTab()"></div>\n        <div class="rili-box fixed overh attend-animat" *ngIf="hiddenBox">\n            <p class="rili-box-title fn17 center">申请进程</p>\n            <p class="process-close" (click)="closeTab()">\n                <img src="assets/images/close.png">\n            </p>\n            <div class="maxh" *ngFor="let data of dataPrecess">\n                <p class="process-p fn14">\n                    <span class="fl gray-4a">{{data.title}}</span>\n                    <span class="fr gray-c">{{data.process_time}}</span>\n                </p>\n                <p class="not-process overh" *ngIf="data.input_data.status == \'3\'">\n                    <span class="fl">拒绝原因 : {{data.input_data.remarktxt}}</span>\n                </p>\n            </div>\n\n        </div>\n    </div>\n\n    <div *ngIf="haveClass" class="center">\n        <img src="assets/images/kong.png" style="margin-top:50px;" alt="">\n        <p style="color:#ACACAC;">记录为空</p>\n    </div>\n\n    <ion-infinite-scroll *ngIf="moreData" (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="正在加载更多。。。">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n    <div style="text-align: center;color: #8e9093" *ngIf="!moreData">我是有底线的！</div>\n\n\n\n</ion-content>'/*ion-inline-end:"/home/user02/learn/angular-webapp/shetuan/src/pages/indexapprove/indexapprove.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_3__http_http_Service__["a" /* HttpService */]])
    ], IndexApprovePage);
    return IndexApprovePage;
}());

//# sourceMappingURL=indexapprove.js.map

/***/ })

});
//# sourceMappingURL=10.js.map