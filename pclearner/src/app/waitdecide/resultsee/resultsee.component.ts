import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";
import { NzMessageService, NzModalService } from "ng-zorro-antd";


@Component({
    selector: 'app-resultsee',
    templateUrl: './resultsee.component.html',
    styleUrls: ['./resultsee.component.css']
})
export class ResultSeeComponent implements OnInit {

    TaskName = "";  //任务标题
    StartDate = ""; //开始时间
    EndDate = "";   //结束时间
    ClassCode = ""; //班级代码

    dataStudent = '' //班级总人数及各困难人数
    useTaskIdStr = ''  //任务ID

    //页面数据
    dataSet = [];

    constructor(public httpService: HttpService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.TaskName = params['TaskName'];
            this.StartDate = params['StartDate'];
            this.EndDate = params['EndDate'];
            this.ClassCode = params['ClassCode'];
        });
        this.useTaskIdStr = JSON.parse(sessionStorage.getItem('useTaskId'));

        this.onSearch()
    }

    //待认定学生
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.waitresultlist,
            Method: 'POST',
            Body: {
                ClassCode: this.ClassCode,
                TaskId: this.useTaskIdStr
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if(res.Data != null){
                    this.dataSet = res.Data.Students;
                    this.dataStudent = res.Data.CountDetail;
                }

            }
        })
    }

























}
