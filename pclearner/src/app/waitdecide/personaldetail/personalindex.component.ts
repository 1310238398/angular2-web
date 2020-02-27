import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";


import { TeacherViewComponent } from "./teacherview/teacherview.component";
// import { JingjiquestionComponent } from "./jingjiquestion/jingjiquestion.component";
// import { SelfquestionComponent } from "./selfquestion/selfquestion.component";
// import { StatuspassComponent } from "./statuspass/statuspass.component";
// import { WhychangeComponent } from "./whychange/whychange.component";

@Component({
    selector: 'app-personalindex',
    templateUrl: './personalindex.component.html',
    styleUrls: ['./personalindex.component.css']
})
export class PersonalIndexComponent implements OnInit {

    dataSet = {
        UserCode: '',
        Name: '',
        IsAttach: '',
        EnconomicScore: '',
        SelfAssessmentScore: '',
        CounsellorOpinion: '',
        EliberateStatus: '',
        RecognitionLevel: '',
        Status: ''
    }

    menData = {
        IntelUserCode: '',
        ClassCode: '',
        Status: '',
        RecognitionLevel: '',
        TaskName: '',
        StartDate: '',
        EndDate: '',
        categray: '',
        IsAttach: ''
    }

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


    constructor(public httpService: HttpService, private route: ActivatedRoute, private _message: NzMessageService ) { }

    ngOnInit(): void {

        this.route.params.forEach((params: Params) => {
            this.menData.IntelUserCode = params['IntelUserCode'];
            this.menData.categray = params['categray'];
            this.menData.TaskName = params['TaskName'];
            this.menData.StartDate = params['StartDate'];
            this.menData.EndDate = params['EndDate'];
            this.menData.ClassCode = params['ClassCode'];
            //this.menData.Status = params['Status'];
            this.menData.RecognitionLevel = params['RecognitionLevel'];
        });
        this.statusJsonStr = JSON.parse(sessionStorage.getItem('setStatus'));
        this.userJsonStr = JSON.parse(sessionStorage.getItem('userStatus'));
        this.isSubmitJsonStr = JSON.parse(sessionStorage.getItem('isSubmit'));
        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.eliberateone,
            Method: 'POST',
            Body: {
                IntelUserCode: this.menData.IntelUserCode,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.dataSet = res.Data;
                this.menData.Status = res.Data.Status
                this.menData.IsAttach = res.Data.IsAttach;
            }
        })
    }

    categrayChange(obj) {
        this.menData.categray = obj;
    }

    //弹出评级框
    tankbox(obj) {
        this.disdden = false;
        this.menDataObj.IntelUserCode = obj;
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
                Status: this.menData.Status,
                ConfirmReason: '',
                ConfirmReasonSelect: '',
                RecognitionLevel: String(this.dataSet5.Status)
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.createMessage('success', '提交成功');
                this.disdden = true;
                this.onSearch();
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
