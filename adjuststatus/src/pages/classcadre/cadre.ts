import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
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

    classCode = '';  //0a7f4501-3e92-4166-943f-9dae837ad6ce

    studentData = []; //学生数据
    studentDataOld = [];  //存储旧的学生数据
    studentStatus = []; //状态

    relationship = ''; //选择的状态代码
    redioStu = ''; //选择学生
    submitIng = false;   //禁用设置状态按钮
    mengGo = false;

    Type = '';  //1老师 2学生
    IsStudentCadres = false;  //bool类型 是否为学生干部
    TaskTime = this.nowDay();
    isCanDo = true;

    constructor(public navParams: NavParams, public helpUtil: HelpUtils, private http: HttpService, private alertCtrl: AlertController, public navCtrl: NavController, ) { }

    ionViewWillEnter() {
        antlinker.configTitle({
            type: "label",
            title: '状态调整',
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

        this.classCode = this.navParams.get('ClassCode') || '';  //获取班级CODE
    }

    ionViewDidEnter() {
        this.loadUserType();
        this.loadStatus();
    }

    //获取用户类型
    loadUserType() {
        this.http.postJSON({
            Router: ServelUrl.Url.getusertype,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.Type = res.Data.Type;
                this.IsStudentCadres = res.Data.IsStudentCadres;

                if (this.Type == '1') {
                    this.isCanDo = true;
                } else if (this.Type == '2' && this.IsStudentCadres) {
                    this.isCanDo = true;
                } else {
                    this.isCanDo = false;
                    this.CancelConfirm();
                    return false;
                }

                this.queryClassStudent();
            }
        },
            err => console.log(err)
        );
    }

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
    //获取状态
    loadStatus() {
        this.http.postJSON({
            Router: ServelUrl.Url.bizcode,
            Method: 'POST',
            Body: {
                CodeType: 'StatusSort',
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.studentStatus = res.Data
            } else {
                this.helpUtil.toastPopTop(res.FeedbackText);
            }
        },
            err => console.log(err)
        );
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
                if (this.Type == '1') {
                    for (let i = 0; i < res.Data.length; i++) {
                        res.Data[i]['status'] = ''
                        res.Data[i]['refusion'] = ''
                    }
                    this.studentData = res.Data
                } else if (this.Type == '2') {
                    this.studentDataOld = res.Data  //存储旧的学生数据
                    for (let i = 0; i < res.Data.length; i++) {
                        if (res.Data[i].Approve) {
                            if (res.Data[i].Approve.split("||")[0] == '0') {
                                res.Data[i]['StatusSortName'] = res.Data[i].Approve.split("||")[1]
                            }
                            res.Data[i]['status'] = res.Data[i].Approve.split("||")[0]
                            res.Data[i]['refusion'] = res.Data[i].Approve.split("||")[2]

                        } else {
                            res.Data[i]['status'] = '';
                            res.Data[i]['refusion'] = ''
                        }
                    }
                    this.studentData = res.Data;
                }

                console.log(this.studentData, '11111111111111');
                console.log(this.classCode, '11111111111111');
                console.log('ceshi', '11111111111111');



            } else {
                this.helpUtil.toastPopTop(res.FeedbackText);
            }
        },
            err => console.log(err)
        );
    }

    //设置宿舍信息
    setDormInfo() {
        var isCanMit = false;
        for (let i = 0; i < this.studentData.length; i++) {
            if (this.studentData[i].IntelUserCode == this.redioStu && this.studentData[i].status == '0') {
                isCanMit = true;
            } 
        }

        if (isCanMit) {
            this.alertPassing();
        } else {
            this.mengGo = true;
        }
    }

    //确定是否提交弹框
    presentConfirm() {

        var StatusSortOldName = '';  //修改前的状态名称
        var StatusSortName = '';      //修改的状态名称
        for (let i = 0; i < this.studentDataOld.length; i++) {
            if (this.studentDataOld[i].IntelUserCode == this.redioStu) {
                StatusSortOldName = this.studentDataOld[i].StatusSortName
            }
        }

        for (let i = 0; i < this.studentStatus.length; i++) {
            if (this.studentStatus[i].Code == this.relationship) {
                StatusSortName = this.studentStatus[i].Name
            }
        }

        if (StatusSortOldName == StatusSortName || StatusSortName == '') {
            this.helpUtil.toastPopTop('请选择不同状态');
            return false;
        }

        var alertTxt = ''
        if (StatusSortName == '退学') {
            alertTxt = '确定要将选中的学生设置为“' + StatusSortName + '”吗？设置后,该生将无法进行请假等操作,并会从班级空间中清除'
        } else {
            alertTxt = '确定要将选中的学生设置为“' + StatusSortName + '”吗？'
        }

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
                        this.mengGo = false;
                        if (this.Type == '1') {
                            this.http.postJSON({
                                Router: ServelUrl.Url.upstatussort,
                                Method: 'POST',
                                Body: {
                                    Uids: this.redioStu,
                                    StatusSort: this.relationship
                                }
                            }).then(res => {
                                if (!res.FeedbackCode) {
                                    this.helpUtil.toastPopTop('设置成功');
                                    this.relationship = '';
                                    this.redioStu = '';
                                    this.queryClassStudent()
                                }
                            },
                                err => console.log(err)
                            );
                        } else if (this.Type == '2') {
                            this.startFlow();
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    //工作流函数
    startFlow() {
        var StatusSortOldName = '';  //修改前的状态名称
        var StatusSortName = '';      //修改的状态名称
        for (let i = 0; i < this.studentDataOld.length; i++) {
            if (this.studentDataOld[i].IntelUserCode == this.redioStu) {
                StatusSortOldName = this.studentDataOld[i].StatusSortName
            }
        }

        for (let i = 0; i < this.studentStatus.length; i++) {
            if (this.studentStatus[i].Code == this.relationship) {
                StatusSortName = this.studentStatus[i].Name
            }
        }

        if (StatusSortOldName == StatusSortName) {
            this.helpUtil.toastPopTop('请选择不同状态');
            return false;
        }

        var formData = {
            action: "studentApply",
            title: '状态调整',
            timestart: this.TaskTime,     //开始时间
            IntelUserCode: this.redioStu, //学生的ID
            StatusSortOldName: StatusSortOldName,   //修改前的状态名称
            StatusSort: this.relationship, //修改的状态代码
            StatusSortName: StatusSortName, //修改的状态名称
            statustxt: '辅导员审批进行中',
            remarktxt: '', //不通过原因
            status: '1',
        }

        this.http.postFlowJSON({
            Router: ServelUrl.Url.launch,
            Method: 'POST',
            Body: {
                flow_id: '',
                flow_code: 'Process_Student_Status_Adjust',
                form_data: JSON.stringify(formData)
            }
        }).then(res => {
            if (res == 'ok') {
                this.helpUtil.toastPopTop('提交成功');
                setTimeout(function () {
                    window.location.reload()
                }, 1200);
            }
        },
            err => console.log(err)
        );
    }
    //直接选择单选框
    checkprint() {
        if (this.redioStu) {
            this.submitIng = true;
        } else {
            this.submitIng = false;
        }
    }
    //取消
    cannelBtn() {
        this.mengGo = false;
    }
    //获取当前时间
    nowDay() {
        const Dates = new Date();
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
    }
    //弹出拒绝原因框
    alertNot(obj) {
        let alert = this.alertCtrl.create({
            title: '拒绝原因',
            subTitle: obj,
            buttons: ['确定']
        });
        alert.present();
    }

    //审批中拒绝弹框
    alertPassing() {
        let alert = this.alertCtrl.create({
            title: '',
            message: '该同学状态正在审批中,请审批通过后再调整!',
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