import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'app-resultclasslist',
    templateUrl: './resultclasslist.component.html',
    styleUrls: ['./resultclasslist.component.css']
})
export class ResultClassListComponent implements OnInit {
    //任务信息详情
    taskData = {
        TaskId: '',  //任务ID
        TaskName: '', //认定标题
        Status: '',     //任务状态
        created: '',   //创建时间
        StartDate: '', //开始时间
        EndDate: '',   //结束时间
    }

    dataSet = [
        {
            Class: '17级信息技术',          //|班级名称|
            HardSeries: '20',     //||特殊困难比例|
            HardNormal: '10',     //||困难比例|
            HardCommon: '5',     //||一般比例|
            HardTotal: '35',      //||合计比例|
        }
    ];

    ClassCode = '';
    userIdentity = '';  //当前用户身份 
    AcademyName = '';

    constructor(public httpService: HttpService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.ClassCode = params['ClassCode'];
        });

        this.taskData = JSON.parse(sessionStorage.getItem('taskData'));
        this.userIdentity = JSON.parse(sessionStorage.getItem('userIdentity'));
        this.onSearch()

    }

    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.resultstatics,
            Method: 'POST',
            Body: {
                AcademyCode: this.ClassCode,
                TaskId: this.taskData.TaskId
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.dataSet = res.Data.Datas;
                    this.AcademyName = res.Data.AcademyName;
                }

            }
        })
    }

    goBack(){
        window.history.back();
    }


























}
