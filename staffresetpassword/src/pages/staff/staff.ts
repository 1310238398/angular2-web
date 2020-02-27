import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaffService } from '../staff.service';
import { HelpUtils } from '../../app/utils/HelpUtils';
@IonicPage(
    {
        name: 'page-staff',
        segment: 'staff/:name/:department'
    }
)
@Component({
    selector: 'page-staff',
    templateUrl: 'staff.html'
})
export class StaffPage {
    rzAlert = false;
    resetAlert = false;
    submitIng = false;
    classCode = '';
    staffData = [];
    currentStaff: any;
    name = '';
    department = '';
    start = 0;
    limit = 40;
    isNull: boolean;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public staffService: StaffService,
        public helpUtil: HelpUtils
    ) {
    }

    ionViewWillEnter() {
        
    }

    ionViewDidLoad() {

    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '学工账号',
            fail: function () {

            },
            success: function () {
            }
        });
        this.name = this.navParams.get('name') || '';
        this.department = this.navParams.get('department') || '';
        this.queryStaff(this.name, this.department);
    }


    // 获取学工列表
    queryStaff(name: string, department: string): void {
        let loading = this.loadingCtrl.create({
            content: '正在加载数据...'
        });
        loading.present();
        this.staffService.queryStaff(name, department, this.start, this.limit).then(res => {
            loading.dismiss();
            if (res.items && res.items.length > 0) {
                this.isNull = false;
                this.staffData = res.items;
            } else {
                this.isNull = true;
                this.staffData = [];
            }
        })
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        this.start = this.start + 1;
        this.staffService.queryStaff(this.name, this.department, this.start, this.limit).then(res => {
            infiniteScroll.complete();
            debugger
            if (res.items && res.items.length > 0) {
                this.staffData = [...this.staffData, ...res.items];
            } else {
                infiniteScroll.enable(false);
            }
        })
    }

    // 重置密码
    showReset(stu: any) {
        this.currentStaff = stu;
        this.resetAlert = true;
    }

    resetPassWord() {
        this.resetAlert = false;
        this.staffService.resetPassWord(this.currentStaff.IntelUserCode).then(res => {
            if (res.FeedbackCode === 0) {
                this.helpUtil.toastPop('重置密码成功');
            } else {
                this.helpUtil.toastPop('重置密码失败');
            }
        });
    }
}