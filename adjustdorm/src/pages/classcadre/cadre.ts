import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from '../../app/utils/HelpUtils';

declare var antlinker;
@IonicPage(
    {
        name: 'page-cadre',
        segment: 'cadre/:ClassCode'
    }
)
@Component({
    selector: 'page-cadre',
    templateUrl: 'cadre.html'
})
export class CadrePage {

    classCode = '';
    submitIng = true;   //禁用设置状态按钮

    studentDataMale = [];  //男
    studentDataFemale = [];  //女

    loadingYes = false;
    titleShow = false;  //头部提示是否显示

    constructor(public navCtrl: NavController, public navParams: NavParams, public helpUtil: HelpUtils, private http: HttpService, private alertCtrl: AlertController) { }

    ionViewWillEnter() {
        antlinker.configTitle({
            type: "label",
            title: '宿舍登记',
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

        this.submitIng = true;
        this.studentDataMale = [];  //男
        this.studentDataFemale = [];  //女

        this.classCode = this.navParams.get('ClassCode') || '';  //获取班级CODE
        if (this.classCode == ':ClassCode') {
            this.classCode = ''
        }

        var sessinClassCode = JSON.parse(sessionStorage.getItem('classCode'));
        if (sessinClassCode != null) {
            this.classCode = sessinClassCode
        }  
    }

    ionViewDidEnter() {
        this.queryClassStudent();
    }

    //获取班级名单
    queryClassStudent() {
        this.http.postJSON({
            Router: ServelUrl.Url.getclassdata,
            Method: 'POST',
            Body: {
                class: this.classCode,
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.loadingYes = true;
                if(res.Data.type == 'Counselor' || res.Data.type == 'Adviser'){
                    this.titleShow = true;
                }else{
                    this.titleShow = false;
                }
                for (let i = 0; i < res.Data.items.length; i++) {
                    if (res.Data.items[i].sex == '男') {
                        this.studentDataMale.push(res.Data.items[i])
                    }
                    if (res.Data.items[i].sex == '女') {
                        this.studentDataFemale.push(res.Data.items[i])
                    }

                    if (res.Data.items.length > 0) {
                        var classcode = res.Data.items[0].classcode;
                        var classname = res.Data.items[0].classname;
                        sessionStorage.setItem('classCode', JSON.stringify(classcode));   //班级代码
                        sessionStorage.setItem('className', JSON.stringify(classname));   //班级名称
                    }
                }
            } else if (res.FeedbackCode == '1') {
                this.helpUtil.toastPop(res.FeedbackText);
            } else if (res.FeedbackCode == '2') {
                this.CancelConfirm();
            }
        },
            err => console.log(err)
        );
    }

    //无访问权限弹窗
    CancelConfirm() {
        let alert = this.alertCtrl.create({
            title: '',
            message: '无访问权限!',
            buttons: [
                {
                    text: '确定',
                    role: 'cancel',
                    handler: () => {
                        antlinker.closeView({
                            success: function () {
                            },
                            fail: function () {
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    //设置宿舍信息
    setDormInfo() {
        var selUidsMale = [];
        this.studentDataMale.forEach(stu => {
            if (stu.checked === true) {
                var personalObj = {
                    code: stu.intelusercode,
                    name: stu.name
                };
                selUidsMale.push(personalObj);
            }
        });

        var selUidsFemale = [];
        this.studentDataFemale.forEach(stut => {
            if (stut.checked === true) {
                var personalObj = {
                    code: stut.intelusercode,
                    name: stut.name
                };
                selUidsFemale.push(personalObj);
            }
        });

        if (selUidsMale.length && selUidsFemale.length) {
            this.helpUtil.toastPopTop('男女不可混住');
            return false;
        }

        if (!selUidsMale.length && !selUidsFemale.length) {
            this.helpUtil.toastPopTop('请先选择需要调整的学生');
            return false;
        }

        var sexInfo = '';
        var dormUserInfo = [];

        if (selUidsMale.length) {
            dormUserInfo = selUidsMale;
            sexInfo = '0030001'
        } else if (selUidsFemale.length) {
            dormUserInfo = selUidsFemale;
            sexInfo = '0030002'
        }

        sessionStorage.setItem('dormUserInfo', JSON.stringify(dormUserInfo));   //要修改状态的学生ID
        sessionStorage.setItem('sexInfo', JSON.stringify(sexInfo));   //性别 

        this.navCtrl.push('FloorListPage');
    }

    //直接选择复选框
    checkprint() {
        var selUidsMale = [];
        this.studentDataMale.forEach(stu => {
            if (stu.checked === true) {
                selUidsMale.push(stu.intelusercode);
            }
        });

        var selUidsFemale = [];
        this.studentDataFemale.forEach(stut => {
            if (stut.checked === true) {
                selUidsFemale.push(stut.intelusercode);
            }
        });

        if (selUidsMale.length || selUidsFemale.length) {
            this.submitIng = false;
            return false;
        } else {
            this.submitIng = true;
        }
    }

}


