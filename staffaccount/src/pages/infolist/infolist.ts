import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from '../../app/utils/HelpUtils';

declare var antlinker;
@IonicPage()

@Component({
    selector: 'page-infolist',
    templateUrl: 'infolist.html'
})
export class InfoListPage {

    classCode = '';  //0a7f4501-3e92-4166-943f-9dae837ad6ce
    studentData = [
        { intelusercode: 'dwegfe-4878484', name: '张海峰' },
        { intelusercode: 'dwegfe-4878484', name: '刘旺' },
        { intelusercode: 'dwegfe-4878484', name: '阿凡达' },
        { intelusercode: 'dwegfe-4878484', name: '买买提' },
        { intelusercode: 'dwegfe-4878484', name: '安普渡' },
        { intelusercode: 'dwegfe-4878484', name: '业之峰' },
    ];

    constructor(public navParams: NavParams, public helpUtil: HelpUtils, private http: HttpService, private alertCtrl: AlertController, public navCtrl: NavController, ) { }

    ionViewWillEnter() {
        antlinker.configTitle({
            type: "label",
            title: '学生账号',
            fail: function () { },
            success: function () { }
        });
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () { },
            success: function () { },
            trigger: function () { }
        });

        //this.classCode = this.navParams.get('ClassCode') || '';  //获取班级CODE
    }

    ionViewDidEnter() {
        //this.queryClassStudent();
    }

    //获取班级名单
    queryClassStudent() {

        if (this.classCode == ':ClassCode') {
            this.classCode = ''
        }

        this.http.postJSON({
            Router: ServelUrl.Url.queryclassusers,
            Method: 'POST',
            Body: {
                ClassCode: this.classCode,
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.studentData = res.Data
                console.log(this.studentData, '11111111111111');
            } else {
                this.helpUtil.toastPopTop(res.FeedbackText);
            }
        },
            err => console.log(err)
        );
    }

    //确定重置密码
    resetPassword(obj1, obj2) {

        var alertTxt = '<p class="make-sure">确定要重置 “ <span class="make-sure-name">' + obj2 + '</span> ” 账号的密码吗？修改后将给该用户发送短信通知。</p>'

        let alert = this.alertCtrl.create({
            title: '',
            message: alertTxt,
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: () => {
                        this.http.postJSON({
                            Router: ServelUrl.Url.upstatussort,
                            Method: 'POST',
                            Body: {
                                Uids: obj1,
                            }
                        }).then(res => {
                            if (!res.FeedbackCode) {
                                this.helpUtil.toastPopTop('设置成功');

                            }
                        },
                            err => console.log(err)
                        );
                    }
                }
            ]
        });
        alert.present();
    }

    //说明弹框
    alertPassing() {
        let alert = this.alertCtrl.create({
            title: '',
            message: '<p class="message-wain">无法认证可能是因为系统中的身份信息有误/没有身份信息/学生状态不为“正常在校”。 </p><p class="message-wain">辅导员可通过PC端“学生账号”功能修改学生的身份信息,可通知系统管理员新增学生身份信息,可通过移动端“学生状态”修改学生状态。</p>',
            buttons: [
                {
                    text: '确定',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        alert.present();
    }





}