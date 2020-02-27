import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CadreService } from '../../cadre.service';
import { HelpUtils } from '../../../app/utils/HelpUtils';
@IonicPage(
    {
        name: 'page-student',
        segment: 'student/:classcode/:duty/:uids'
    }
)
@Component({
    selector: 'page-student',
    templateUrl: 'student.html'
})
export class StudentPage {
    submitIng = false;
    classCode = '';
    duty = '';
    uids = '';
    uidsArr = [];
    studentData = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public cadreService: CadreService,
        public helpUtil: HelpUtils
    ) {
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad');
    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '班委管理',
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
        this.classCode = this.navParams.get('classcode') || '';
        this.duty = this.navParams.get('duty') || '';
        this.uids = this.navParams.get('uids') || '';
        this.uids ? this.uidsArr = this.uids.split(',') : [];
        if (this.classCode) {
            this.queryClassStudent(this.classCode);
        }
    }


    // 获取班级名单
    queryClassStudent(code: string): void {
        let loading = this.loadingCtrl.create({
            content: '正在加载数据...'
        });
        loading.present();
        this.cadreService.queryClassStudent(code).then(res => {
            loading.dismiss();
            if (res.FeedbackCode === 0) {
                this.studentData = res.Data;
                this.studentData.forEach(stu => {
                    if (this.uidsArr.find((uid) => uid === stu.IntelUserCode)) {
                        stu.checked = true;
                    } else {
                        stu.checked = false;
                    }
                });
            } else {
                this.studentData = [];
                this.helpUtil.toastPop(res.FeedbackText);
            }
        })
    }
    // 宿舍楼违纪
    saveCadre() {
        let selectedUids = [];
        console.log(this.studentData);
        this.studentData.forEach(stu => {
            if (stu.checked === true) {
                selectedUids.push(stu.IntelUserCode);
            }
        });
        console.log('selectedUids' + selectedUids);
        // if (selectedUids.length === 0) {
        //     this.helpUtil.toastPop('请选择班委');
        //     return;
        // }
        this.submitIng = true;

        this.cadreService.setClassCadre(this.classCode, this.duty, selectedUids.join(',')).then(res => {
            if (res.FeedbackCode === 0) {
                this.helpUtil.toastPop('保存成功');
                setTimeout(() => {
                    this.navCtrl.pop();
                }, 500);
            } else {
                this.helpUtil.toastPop(res.FeedbackText);
            }
            this.submitIng = false;
        }).catch(() => this.submitIng = false);
    }
}