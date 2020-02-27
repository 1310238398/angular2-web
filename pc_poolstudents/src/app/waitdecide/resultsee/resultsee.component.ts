import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'app-resultsee',
    templateUrl: './resultsee.component.html',
    styleUrls: ['./resultsee.component.css']
})
export class ResultSeeComponent implements OnInit {

    //任务信息详情
    taskData = {
        TaskId: '',  //任务ID
        TaskName: '', //认定标题
        Status: '',     //任务状态
        created: '',   //创建时间
        StartDate: '', //开始时间
        EndDate: '',   //结束时间
        TaskType:''
    }

    ClassCode = '';
    dataStudent = '' //班级总人数及各困难人数
    userIdentity = '';  //当前用户身份 

    dataSet = [];

    //分页
    page = {
        Page: 1,
        PageSize: 40,
        total: 0,
    };

    constructor(public httpService: HttpService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.ClassCode = params['ClassCode'];
        });

        this.taskData = JSON.parse(sessionStorage.getItem('taskData'));
        this.userIdentity = JSON.parse(sessionStorage.getItem('userIdentity'));

        if (this.userIdentity == 'FundCenter') {
            this.onFundingResult();
        } else {
            this.onSearch()
        }

    }

    // == 辅导员 学院
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.waitresultlist,
            Method: 'POST',
            Body: {
                ClassCode: this.ClassCode,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.dataSet = res.Data.Students;
                    this.dataStudent = res.Data.CountDetail;
                }

            }
        })
    }

    // == 资助中心
    onFundingResult() {
        this.httpService.POST({
            Router: ServelUrl.Url.FundCenterResultList,
            Method: 'POST',
            Body: {
                Page: this.page.Page,
                Count: this.page.PageSize,
                AcademyCode: this.ClassCode,
                TaskId: this.taskData.TaskId,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.dataSet = res.Data.Students;
                    this.dataStudent = res.Data.CountDetail;
                    this.page.total = parseInt(res.Data.Total);
                }

            }
        })
    }

























}
