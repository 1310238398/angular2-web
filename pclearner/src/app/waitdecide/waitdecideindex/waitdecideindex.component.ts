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

    dataSet = [ //页面数据
    ];
    //任务类型
    optioncatgray = [
    ]

    //任务时间
    optionyear = [
    ]

    searchObj = {
        TaskName: '',
        TaskType: '',
        TaskTime: '',
    };

    userStatus = '' //当前身份用户

    constructor(public httpService: HttpService, private _message: NzMessageService, private confirmServ: NzModalService, private msgSrv: NzMessageService,) { }

    ngOnInit(): void {
        this.onSearch();
        this.loadStatus();
        this.loadYear();
        this.loadUserStatus();
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
                    this.dataSet[i].EndDate = this.dataSet[i].EndDate.substring(0, 10)
                }
            }else if (res.Data == null) {
                res.Data = []
                this.dataSet = res.Data;
            }
        })
    }

    //重置
    resetForm(form) {
        form.reset();
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
                if(JSON.stringify(res.Data) == '{}'){
                    this.userStatus = 'everyone';
                }else{
                    this.userStatus = res.Data.BizCode;
                }
                
            }else{
                this.createMessage('warning', res.FeedbackText)
            }
        });
    }

    //本地存储  身份  任务阶段
    setSesstion(obj1,obj2) {
        sessionStorage.setItem('setStatus', JSON.stringify(obj1));
        sessionStorage.setItem('userStatus', JSON.stringify(this.userStatus));
        sessionStorage.setItem('useTaskId', JSON.stringify(obj2));
    }

    //公示成功后弹窗
    createMessage = (type, text) => {
        this.msgSrv.create(type, ` ${text}`);
    };

}
