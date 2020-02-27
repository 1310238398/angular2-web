import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClassService } from '../../class.service';
import { HelpUtils } from '../../../app/utils/HelpUtils';
@IonicPage(
    {
        name: 'page-class',
        segment: 'class'
    }
)
@Component({
    selector: 'page-class',
    templateUrl: 'class.html'
})
export class ClassPage {
    isNull: boolean;
    submitIng = false;
    classCode = '';
    role = '';
    classData = {
        myClass: [],
        otherClass: []
    };
    setClassRole = false;
    confirmSetClassRole = false;
    cancleClassRole = false;
    confirmCancleClassRole = false;
    set = {
        fdy: false,
        bzr: false
    };
    currentClass: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public classService: ClassService,
        public helpUtil: HelpUtils
    ) {
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter');
        this.getStaffClass();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad');
    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '班级调整',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () {

            },
            success: function () {

            },
            trigger: function () {
            }
        });
        console.log('ionViewDidEnter');
    }


    // 获取班级
    getStaffClass(): void {
        // let loading = this.loadingCtrl.create({
        //     content: '正在加载数据...'
        // });
        // loading.present();
        this.classService.queryStaffClass().then(res => {
            // loading.dismiss();
            if (res.FeedbackCode === 0) {
                this.classData.otherClass = res.Data.otherClass || [];
                this.classData.myClass = res.Data.myClass || [];
                if (this.classData.otherClass.length > 0 || this.classData.myClass.length > 0) {
                    this.isNull = false;
                } else {
                    this.isNull = true;
                }
                console.log('this.classData.otherClass' + this.classData.otherClass)
                console.log('this.classData.myClass' + this.classData.myClass)
            } else {
                this.classData.otherClass = [];
                this.classData.myClass = [];
                this.isNull = true;
                this.helpUtil.toastPop(res.FeedbackText);
            }
        })
    }
    // 取消编辑角色
    cancleRole(data: any) {
        this.currentClass = data;
        this.currentClass.IsCounselor === '1' ? this.currentClass.selectedCounselor = true : this.currentClass.selectedCounselor = false;
        this.currentClass.IsAdviser === '1' ? this.currentClass.selectedAdviser = true : this.currentClass.selectedAdviser = false;
        this.cancleClassRole = true;
    }
    // 学院编辑角色
    setRole(data: any) {
        this.currentClass = data;
        this.currentClass.IsCounselor === '1' ? this.currentClass.selectedCounselor = true : this.currentClass.selectedCounselor = false;
        this.currentClass.IsAdviser === '1' ? this.currentClass.selectedAdviser = true : this.currentClass.selectedAdviser = false;
        this.setClassRole = true;
    }

    updateRole(type) {
        console.log('Cucumbers new state:' + type);
        if (type === 'fdy' && this.set.fdy) {
            this.set.bzr = false;
        }
        if (type === 'bzr' && this.set.bzr) {
            this.set.fdy = false;
        }
    }

    // 确认取消班主任、辅导员
    confirmCancleRole() {
        // if ((this.currentClass.IsCounselor === '1' && !this.currentClass.selectedCounselor) || this.currentClass.IsAdviser === '1' && !this.currentClass.selectedAdviser) {
        if (this.currentClass.IsCounselor === '1' && !this.currentClass.selectedCounselor) {
            this.cancleClassRole = false;
            this.confirmCancleClassRole = true;
        } else {
            this.cancleClassRole = false;
            this.saveCancleRole();
        }
    }

    // 取消班级角色
    saveCancleRole() {
        this.confirmCancleClassRole = false;
        this.cancleClassRole = false;
        if (this.currentClass.IsCounselor === '1' && !this.currentClass.selectedCounselor) {
            this.classService.setClassRole(this.currentClass.ClassCode, '02').then(res => {
                if (res.FeedbackCode === 0) {
                    this.getStaffClass();
                    this.helpUtil.toastPop('取消辅导员成功');
                    this.syncClassGroup();
                } else {
                    this.helpUtil.toastPop(res.FeedbackText);
                }
            });
        }
        if (this.currentClass.IsCounselor === '0' && this.currentClass.selectedCounselor) {
            this.classService.setClassRole(this.currentClass.ClassCode, '12').then(res => {
                if (res.FeedbackCode === 0) {
                    this.getStaffClass();
                    this.helpUtil.toastPop('设置辅导员成功');
                    this.syncClassGroup();
                } else {
                    this.helpUtil.toastPop(res.FeedbackText);
                }
            });
        }
        if (this.currentClass.IsAdviser === '1' && !this.currentClass.selectedAdviser) {
            this.classService.setClassRole(this.currentClass.ClassCode, '01').then(res => {
                if (res.FeedbackCode === 0) {
                    this.getStaffClass();
                    this.helpUtil.toastPop('取消班主任成功');
                    this.syncClassGroup();
                } else {
                    this.helpUtil.toastPop(res.FeedbackText);
                }

            });
        }
        if (this.currentClass.IsAdviser === '0' && this.currentClass.selectedAdviser) {
            this.classService.setClassRole(this.currentClass.ClassCode, '11').then(res => {
                if (res.FeedbackCode === 0) {
                    this.getStaffClass();
                    this.helpUtil.toastPop('设置班主任成功');
                    this.syncClassGroup();
                } else {
                    this.helpUtil.toastPop(res.FeedbackText);
                }

            });
        }
    }

    // 确认设置班主任、辅导员
    cinfirmSetRole() {
        this.confirmSetClassRole = true;
    }

    // 设置班级角色
    saveSetRole() {
        // this.confirmSetClassRole = false;
        this.setClassRole = false;
        if (this.currentClass.selectedCounselor) {
            this.classService.setClassRole(this.currentClass.ClassCode, '12').then(res => {
                if (res.FeedbackCode === 0) {
                    this.getStaffClass();
                    this.helpUtil.toastPop('设置辅导员成功');
                    this.syncClassGroup();
                } else {
                    this.helpUtil.toastPop(res.FeedbackText);
                }
            });
        }
        if (this.currentClass.selectedAdviser) {
            this.classService.setClassRole(this.currentClass.ClassCode, '11').then(res => {
                if (res.FeedbackCode === 0) {
                    this.getStaffClass();
                    this.helpUtil.toastPop('设置班主任成功');
                    this.syncClassGroup();
                } else {
                    this.helpUtil.toastPop(res.FeedbackText);
                }
            });
        }
    }

    syncClassGroup() {
        this.classService.syncClassGroup().then(res => {
            if (res.RE === 0) {
                console.log('同步成功');
            } else {
                console.log('同步失败');
            }
        });
    }
}