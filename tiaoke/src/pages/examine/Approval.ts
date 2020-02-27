/*
 * create by lizan 2017/02/28
 * */
import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { ReasonPage } from "./Reason";
import { WaitListPage } from "./List";

@Component({
    selector: 'page-approval',
    templateUrl: './Approval.html'
})
export class ApprovalPage {
    reasonPage = ReasonPage;
    infoId;
    info = {
        CourseName:'',//课程名称
        CourseType:'',//课程性质
        ClassName:'',//班级名称
        AdjustReason:'',//调课原因
        Details:[]
    }
    shouInfo = 0;
    qualitylist;
    BeforeAdjustDate_1;//原课程时间
    BeforeAdjustAddress_1;//原课程地点
    AdjustAdjustDate_1;//调整后时间
    AdjustAddress_1;//调整后课程地点
    BeforeAdjustDate_2;//原课程时间
    BeforeAdjustAddress_2;//原课程地点
    AdjustAdjustDate_2;//调整后时间
    AdjustAddress_2;//调整后课程地点

    constructor(private navCtrl: NavController, private params: NavParams, private http: HttpService,private alertCtrl: AlertController) {
        this.infoId = params.get('rid');
        this.http.postJSON({
            Router: ServelUrl.Url.getcoursenature,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    this.qualitylist = comments.Data;

                    this.http.postJSON({
                        Router: ServelUrl.Url.queryoneadjustcourse,
                        Method: 'POST',
                        Body: {RecordId:this.infoId}
                    }).then(
                        comments => {
                            if (comments.FeedbackCode == 0) {
                                this.info = comments.Data;
                                for(var i = 0;i<this.qualitylist.length;i++){
                                    if(this.qualitylist[i].Code == this.info.CourseType) {
                                        this.info.CourseType = this.qualitylist[i].CodeName;
                                    }
                                }
                                //获取调课信息
                                for(var i = 0;i<this.info.Details.length;i++) {
                                    if(i == 0) {
                                        //原课程时间
                                        this.BeforeAdjustDate_1 = this.info.Details[i].BeforeAdjustTime;
                                        this.BeforeAdjustAddress_1 = this.info.Details[i].BeforeAdjustAddress;//原课程地点
                                        this.AdjustAdjustDate_1 = this.info.Details[i].AdjustTime;//调整后时间
                                        this.AdjustAddress_1 = this.info.Details[i].AdjustAddress;//调整后地点
                                    }
                                    if(i == 1){
                                        this.shouInfo = 1;
                                        this.BeforeAdjustDate_2 = this.info.Details[i].BeforeAdjustTime;
                                        this.BeforeAdjustAddress_2 = this.info.Details[i].BeforeAdjustAddress;//原课程地点
                                        this.AdjustAdjustDate_2 = this.info.Details[i].AdjustTime;//调整后时间
                                        this.AdjustAddress_2 = this.info.Details[i].AdjustAddress;//调整后地点
                                    }
                                }
                            }
                        });

                }
            });

    }
    ToReasonPage(){//跳转审核不通过,输入不通过原因页面
        this.navCtrl.push(ReasonPage, {rid: this.infoId});
    }
    approvalTo(){//审核通过,不需要输入原因
        let flag = 1;//调整后时间地点不为空,状态1,审核后为已完成;为空,状态为3,审核通过后可补全调课后信息.
        if(this.AdjustAdjustDate_1 == "" || this.AdjustAddress_1 == "" ||this.AdjustAdjustDate_2 == "" || this.AdjustAddress_2 == ""){
            flag = 3;
        }
        this.http.postJSON({
            Router: ServelUrl.Url.changeadjustcoursestatus,
            Method: 'POST',
            Body: {RecordId:this.infoId,Status:flag}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    let confirm = this.alertCtrl.create({
                        title: '提示',
                        message: '调课流程处理完毕',
                        buttons: [
                            {
                                text: '确定',
                                handler: () => {
                                    this.navCtrl.push(WaitListPage);
                                }
                            }
                        ]
                    });
                    confirm.present();
                }
            })


    }
}