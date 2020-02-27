import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService,} from "ng-zorro-antd";
import {  Router } from "@angular/router";
import * as moment from 'moment';


@Component({
    selector: 'app-createtask',
    templateUrl: './createtask.component.html',
    styleUrls: ['./createtask.component.css']
})
export class CreateTaskComponent implements OnInit {

    //任务类型
    optioncatgray = [];

    forbbien = true;

    searchObj = {
        TaskName: '',
        TaskType: '',
        TaskTime: '',
    };

    values = 30;
    wainTxt = '';   //工作计划提示
    RecordID = ''

    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private router: Router) { }

    ngOnInit(): void {
        this.loadStatus();
        this.searchObj.TaskTime = this.nowDay()
    }

    //提交
    submit() {

        if (!this.searchObj.TaskType.trim()) {
            this.msgSrv.warning('记录类型不能为空！');
            return
        }

        if (!this.searchObj.TaskName.trim()) {
            this.msgSrv.warning('日志标题不能为空！');
            return
        }

        this.httpService.POST({
            Router: ServelUrl.Url.counsellorlogsave,
            Method: 'POST',
            Body: {
                LogTitle: this.searchObj.TaskName,
                RecordType: this.searchObj.TaskType,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.RecordID = res.Data
                this.forbbien = true;
                this.msgSrv.success('创建成功');
                const that = this;
                setTimeout(function () {
                  that.router.navigate(['counselormanage/contdetail'], { queryParams: { fabStatus: '0', RecordID:that.RecordID } });
                }, '2000');
            } else {
                this.msgSrv.warning(res.FeedbackText);
            }
        })
    }

    //任务类型
    loadStatus() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.bizcode,
            Method: 'POST',
            Body: {
                CodeType: 'counsellorlogcodetype'
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optioncatgray = res.Data;
            }
        });
    }

    changeText() {

        console.log(this.searchObj.TaskType)
        if (this.searchObj.TaskType == '001100') {
            this.wainTxt = '(如：XXXX-XXXX学年度第X学期工作计划)'
        } else if (this.searchObj.TaskType == '001200') {
            this.wainTxt = '(如：XXXX-XXXX学年度第X学期工作总结)'
        } else {
            this.wainTxt = ''
        }

        if(this.searchObj.TaskType != '' && this.searchObj.TaskName.trim()){
            this.forbbien = false
        }else{
            this.forbbien = true
        }
    }

    //备注框字数变化
    txtChange(value: string) {
        this.values = 30 - value.length;
        if(this.searchObj.TaskType != '' && this.searchObj.TaskName.trim()){
            this.forbbien = false
        }else{
            this.forbbien = true
        }
    }
    //文本框禁止回车换行
    checkEnter(e) {
        var et = e || window.event;
        var keycode = et.charCode || et.keyCode;
        if (keycode == 13) {
            if (window.event) {
                window.event.returnValue = false;
            } else {
                e.preventDefault(); //for firefox
            }
        }
    }

    nowDay() {
        const Dates = new Date();
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
    }












}
