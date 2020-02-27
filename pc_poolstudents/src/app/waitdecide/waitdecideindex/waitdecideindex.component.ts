import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
    selector: 'app-waitdecideindex',
    templateUrl: './waitdecideindex.component.html',
    styleUrls: ['./waitdecideindex.component.css']
})
export class WaitDecideindexComponent implements OnInit {
    
    dataSet = [];           //页面数据
    optioncatgray = [];     //任务类型
    optionyear = [];        //任务时间

    searchObj = {
        TaskName: '',
        TaskType: '',
        TaskTime: '',
    };

    userIdentity = '';  //当前身份用户
    taskStatus = '';    //任务状态  2已关闭 3进行中 4已结束

    constructor(public httpService: HttpService, private _message: NzMessageService, private confirmServ: NzModalService, private msgSrv: NzMessageService, ) { }

    ngOnInit(): void {
        this.onSearch();
        this.loadStatus();
        this.loadYear();
        this.loadUserStatus()
    }
    //获取数据列表
    onSearch() {
        this.httpService.POST({
            Router: ServelUrl.Url.tasklist,
            Method: 'POST',
            Body: {
                TaskName: this.searchObj.TaskName,
                TaskType: this.searchObj.TaskType,
                Year: this.searchObj.TaskTime,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode && res.Data != null) {
                this.dataSet = res.Data;
                for (let i = 0; i < this.dataSet.length; i++) {
                    this.dataSet[i].EndDate = this.dataSet[i].EndDate.substring(0, 10);
                    this.dataSet[i].created = this.nowDay(this.dataSet[i].created);
                    this.dataSet[i].Grades = this.dataSet[i].Grades.replace(/\s/g, "")
                }
            } else if (res.Data == null) {
                res.Data = []
                this.dataSet = res.Data;
            }
        })
    }
    //任务类型
    loadStatus() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.bizcode,
            Method: 'POST',
            Body: {
                CodeType: 'StudentNeedSupportConfirmType'
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optioncatgray = res.Data;
            }
        });
    }
    //任务时间
    loadYear() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.taskyear,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optionyear = res.Data;
            }
        });
    }
    //登录角色
    loadUserStatus() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.usertype,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (!res.FeedbackCode) {
                if (JSON.stringify(res.Data) == '{}') {
                    this.userIdentity = 'everyone';
                } else {
                    this.userIdentity = res.Data.BizCode;
                }
            } else {
                console.log(res.FeedbackText)
            }
        });
    }
    //本地存储  身份  任务
    setSesstion(obj) {
        sessionStorage.setItem('taskData', JSON.stringify(obj));                    //当前任务详细参数
        sessionStorage.setItem('taskStatus', JSON.stringify(obj.Status));           //当前任务状态
        sessionStorage.setItem('userIdentity', JSON.stringify(this.userIdentity));  //当前用户角色
    }

    //时间戳转化为时间
    nowDay(obj) {
        const Dates = new Date(parseInt(obj) * 1000);
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day;
    }

    //重置
    resetForm(form) {
        form.reset();
    }

}
