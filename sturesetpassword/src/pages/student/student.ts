import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StudentService } from '../student.service';
import { HelpUtils } from '../../app/utils/HelpUtils';
@IonicPage(
    {
        name: 'page-student',
        segment: 'student/:ClassCode'
    }
)
@Component({
    selector: 'page-student',
    templateUrl: 'student.html'
})
export class StudentPage {
    rzAlert = false;
    resetAlert = false;
    submitIng = false;
    classCode = '';
    studentData = [];
    currentStu: any;
    isNull: boolean;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public studentService: StudentService,
        public helpUtil: HelpUtils
    ) {
    }

    ionViewWillEnter() {
        debugger
        this.classCode = this.navParams.get('ClassCode') || '';
        if (this.classCode) {
            console.log(this.classCode)
            this.queryClassStudent(this.classCode);
        }
        console.log('ionViewWillEnter');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad');
    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '学生账号',
            fail: function () {

            },
            success: function () {
            }
        });
        console.log('ionViewDidEnter');
    }


    // 获取班级名单
    queryClassStudent(code: string): void {
        let loading = this.loadingCtrl.create({
            content: '正在加载数据...'
        });
        loading.present();
        this.studentService.queryClassStudent(code).then(res => {
            loading.dismiss();
            if (res.FeedbackCode === 0) {
                if (res.Data && res.Data.length > 0) {
                    this.isNull = false;
                    this.studentData = res.Data;
                } else {
                    this.isNull = true;
                    this.studentData = [];
                }
            } else {
                this.studentData = [];
                this.helpUtil.toastPop(res.FeedbackText);
            }
        })
    }

    // 无法登录原因
    why() {
        this.rzAlert = true;
    }

    // 重置密码
    showReset(stu: any) {
        this.currentStu = stu;
        this.resetAlert = true;
    }

    resetPassWord() {
        this.resetAlert = false;
        this.studentService.resetPassWord(this.currentStu.IntelUserCode).then(res => {
            if (res.FeedbackCode === 0) {
                this.helpUtil.toastPop('重置密码成功');
            } else {
                this.helpUtil.toastPop('重置密码失败');
            }
        });
    }
}