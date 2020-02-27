import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { ListPage } from "./List";
@Component({
    selector: 'page-viewlesson',
    templateUrl: './ViewLesson.html'
})
export class ViewLessonPage {
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
    constructor(private navCtrl: NavController, private params: NavParams,private http: HttpService,private alertCtrl: AlertController) {

        this.infoId = params.get('rid');
        //查询课程性质
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
}
