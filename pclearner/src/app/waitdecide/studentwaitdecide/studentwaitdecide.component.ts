import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";


@Component({
    selector: 'app-studentwaitdecide',
    templateUrl: './studentwaitdecide.component.html',
    styleUrls: ['./studentwaitdecide.component.css']
})
export class StudentWaitdecideComponent implements OnInit {
    //页面数据
    dataSet = [];
    dataSet1 = [];
    dataSet2 = [];

    TaskName = "";  //任务标题
    StartDate = ""; //开始时间
    EndDate = "";   //结束时间
    ClassCode = ""; //班级代码
    Status = "";    //进程状态
    RecognitionLevel = "";  //认定结果码

    teacherT = "辅导员认定意见" //
    statusText = "待认定学生"  //头部显示状态
    smallBt = false;   //是否显示 公示小组评议成员
    tabBt = false;   //是否显示 打印问卷及打分表

    teacherAttitude = "" //辅导员认定意见
    studentAttitude = "" //小组评议
    CounsellorOpinion = '0' //辅导员认定意见 ""未公示 0已公示

    disdden = true;

    menDataObj = {
        IntelUserCode: '',
        Status: '',
    }
    dataSet5 = {
        Status: '87000030',
        RefuseReason: '',
        BgStyle1: 'primary',
        BgStyle2: 'default',
        BgStyle3: 'default',
        BgStyle4: 'default',
    }

    statusJsonStr = ''  //任务阶段  3开启
    userJsonStr = ''    //身份 
    isSubmitJsonStr = '' //是否提交学校
    useTaskIdStr = ''  //任务ID

    comeStatus = ''  //当前用户的状态


    constructor(public httpService: HttpService, private route: ActivatedRoute, private _message: NzMessageService) { }

    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            this.TaskName = params['TaskName'];
            this.StartDate = params['StartDate'];
            this.EndDate = params['EndDate'];
            this.ClassCode = params['ClassCode'];
            this.Status = params['Status'];
            this.RecognitionLevel = params['RecognitionLevel'];
        });

        //return false

        this.statusJsonStr = JSON.parse(sessionStorage.getItem('setStatus'));
        this.userJsonStr = JSON.parse(sessionStorage.getItem('userStatus'));
        this.isSubmitJsonStr = JSON.parse(sessionStorage.getItem('isSubmit'));
        this.useTaskIdStr = JSON.parse(sessionStorage.getItem('useTaskId'));

        this.headStatus();

        if (this.Status == '0') {
            this.onSearch();
        } else {
            this.onSearchOther()
        }
    }

    //待认定学生
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.confirmstudentlist,
            Method: 'POST',
            Body: {
                ClassCode: this.ClassCode,
                TaskId: this.useTaskIdStr
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.dataSet = res.Data.UnConfirmStudent;
                    this.dataSet1 = res.Data.OtherStudent;
                    this.CounsellorOpinion = res.Data.CounsellorOpinion
                    if (this.CounsellorOpinion == '0') {
                        //this.smallBt = false;
                    }
                }
            }
        })
    }

    //待认定学生 
    onSearchOther() {
        this.httpService.POST({
            Router: ServelUrl.Url.eliberatelist,
            Method: 'POST',
            Body: {
                ClassCode: this.ClassCode,
                Status: this.Status,
                RecognitionLevel: this.RecognitionLevel,
                TaskId: this.useTaskIdStr

            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.dataSet2 = res.Data
            }
        })
    }

    //头部显示状态判断
    headStatus() {
        if (this.Status == '0') {
            this.statusText = '待认定学生';
            this.teacherT = "辅导员认定意见";
            this.smallBt = true;
        } else if (this.Status == '41') {
            this.statusText = '直接认定学生'
            this.teacherT = "辅导员认定意见"
            this.teacherAttitude = '直接认定'
        } else if (this.Status == '42') {
            this.statusText = '一票否决学生'
            this.teacherT = "辅导员认定意见"
            this.teacherAttitude = '一票否决'
        } else if (this.Status == '43' && this.RecognitionLevel == '1') {
            this.statusText = '小组评议学生'
            this.teacherT = "辅导员认定意见"
            this.tabBt = true;
            this.teacherAttitude = '小组评议'
            this.studentAttitude = '1'
        } else if (this.Status == '43' && this.RecognitionLevel == '0') {
            this.statusText = '待评议学生'
            this.teacherT = "民主评议结果"
        } else if (this.Status == '43' && this.RecognitionLevel == '87000010') {
            this.statusText = '一般困难学生'
            this.teacherT = "民主评议结果"
        } else if (this.Status == '43' && this.RecognitionLevel == '87000020') {
            this.statusText = '困难学生'
            this.teacherT = "民主评议结果"
        } else if (this.Status == '43' && this.RecognitionLevel == '87000030') {
            this.statusText = '特殊困难学生'
            this.teacherT = "民主评议结果"
        } else if (this.Status == '43' && this.RecognitionLevel == '87000040') {
            this.statusText = '不予评级学生'
            this.teacherT = "民主评议结果"
        }
    }

    //弹出评级框
    tankbox(obj1,obj2) {
        this.disdden = false;
        this.menDataObj.IntelUserCode = obj1;
        this.comeStatus = obj2
    }

    //关闭评级框
    overbox() {
        this.disdden = true;
    }


    //提交
    onPass() {
        this.httpService.POST({
            Router: ServelUrl.Url.counselorconfirm,
            Method: 'POST',
            Body: {
                IntelUserCode: this.menDataObj.IntelUserCode,
                Status: this.comeStatus,
                ConfirmReason: '',
                ConfirmReasonSelect: '',
                RecognitionLevel: String(this.dataSet5.Status)
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.createMessage('success', '提交成功');
                this.disdden = true;

                if (this.Status == '0') {
                    this.onSearch();
                } else {
                    this.onSearchOther()
                }

            }
        })
    }

    //是否通过
    onoff(obj) {
        this.dataSet5.Status = obj;
        if (obj == '87000030') {
            this.dataSet5.BgStyle1 = 'primary'
            this.dataSet5.BgStyle2 = 'default'
            this.dataSet5.BgStyle3 = 'default'
            this.dataSet5.BgStyle4 = 'default'
        } else if (obj == '87000020') {
            this.dataSet5.BgStyle1 = 'default'
            this.dataSet5.BgStyle2 = 'primary'
            this.dataSet5.BgStyle3 = 'default'
            this.dataSet5.BgStyle4 = 'default'
        } else if (obj == '87000010') {
            this.dataSet5.BgStyle1 = 'default'
            this.dataSet5.BgStyle2 = 'default'
            this.dataSet5.BgStyle3 = 'primary'
            this.dataSet5.BgStyle4 = 'default'
        } else if (obj == '87000040') {
            this.dataSet5.BgStyle1 = 'default'
            this.dataSet5.BgStyle2 = 'default'
            this.dataSet5.BgStyle3 = 'default'
            this.dataSet5.BgStyle4 = 'primary'
        }
    }

    createMessage = (type, text) => {
        this._message.create(type, `${text}`);
    };












}
