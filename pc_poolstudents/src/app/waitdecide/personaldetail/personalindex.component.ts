import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Component({
    selector: 'app-personalindex',
    templateUrl: './personalindex.component.html',
    styleUrls: ['./personalindex.component.css']
})
export class PersonalIndexComponent implements OnInit {

    dataSet = {}
    //任务详情
    taskData = {
        TaskId: ''
    };
    pageDetail = {
        IntelUserCode: '',
        categray: '',
        Status: '',
        RecognitionLevel: ''
    }

    dataReview = {
        Status: '87000030',
        RefuseReason: '',
        BgStyle1: 'primary',
        BgStyle2: 'default',
        BgStyle3: 'default',
        BgStyle4: 'default',
    }

    isReview = false;   //认定等级 弹框

    userIdentity = '';  //当前用户身份  
    taskStatus = '';    //当前任务状态 2已关闭 3进行中 4已结束
    CounselorStatus = '10';	//辅导员完成状态 10为未完成，20为完成
    AcadamyStatus = '10';	//学院完成状态 10为未提交，20为已提交
    isChange = true;  //是否可以进行修改

    constructor(public httpService: HttpService, private route: ActivatedRoute, private msgSrv: NzMessageService) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.pageDetail.IntelUserCode = params['IntelUserCode'];
            this.pageDetail.categray = params['categray'];
            this.pageDetail.Status = params['Status'];
            this.pageDetail.RecognitionLevel = params['RecognitionLevel'];
        });
        this.taskData = JSON.parse(sessionStorage.getItem('taskData'));
        this.taskStatus = JSON.parse(sessionStorage.getItem('taskStatus'));
        this.userIdentity = JSON.parse(sessionStorage.getItem('userIdentity'));
        this.CounselorStatus = JSON.parse(sessionStorage.getItem('CounselorStatus'));
        this.AcadamyStatus = JSON.parse(sessionStorage.getItem('AcadamyStatus'));

        if (this.taskStatus == '3' && this.userIdentity == 'Counselor' && this.CounselorStatus == '10' && this.AcadamyStatus == '10') {
            this.isChange = true;
        } else {
            this.isChange = false;
        }
        this.onSearch();
    }

    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.eliberateone,
            Method: 'POST',
            Body: {
                IntelUserCode: this.pageDetail.IntelUserCode,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.dataSet = res.Data;
            }
        })
    }

    //评议困难等级
    tankbox = () => {
        this.isReview = true;
    }
    //确定困难等级
    reviewOk = (e) => {
        this.isReview = false;

        this.httpService.POST({
            Router: ServelUrl.Url.groupCommentLevel,
            Method: 'POST',
            Body: {
                IntelUserCode: this.pageDetail.IntelUserCode,
                RecognitionLevel: String(this.dataReview.Status),
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('认定成功');
                this.onSearch();
            }
        })
    }
    //取消批量评议
    reviewCancel = (e) => {
        this.isReview = false;
    }


    //认定等级
    onReviewoff(obj) {
        this.dataReview.Status = obj;
        if (obj == '87000030') {
            this.dataReview.BgStyle1 = 'primary'
            this.dataReview.BgStyle2 = 'default'
            this.dataReview.BgStyle3 = 'default'
            this.dataReview.BgStyle4 = 'default'
        } else if (obj == '87000020') {
            this.dataReview.BgStyle1 = 'default'
            this.dataReview.BgStyle2 = 'primary'
            this.dataReview.BgStyle3 = 'default'
            this.dataReview.BgStyle4 = 'default'
        } else if (obj == '87000010') {
            this.dataReview.BgStyle1 = 'default'
            this.dataReview.BgStyle2 = 'default'
            this.dataReview.BgStyle3 = 'primary'
            this.dataReview.BgStyle4 = 'default'
        } else if (obj == '87000040') {
            this.dataReview.BgStyle1 = 'default'
            this.dataReview.BgStyle2 = 'default'
            this.dataReview.BgStyle3 = 'default'
            this.dataReview.BgStyle4 = 'primary'
        }
    }

    //加载不同组件
    categrayChange(obj) {
        this.pageDetail.categray = obj;
    }




}
