import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NzMessageService, NzModalService, } from "ng-zorro-antd";

@Component({
    selector: 'app-groupname',
    templateUrl: './groupname.component.html',
    styleUrls: ['./groupname.component.css']
})
export class GroupNameComponent implements OnInit {

    searchObj = {
        NoticeTitle: '',
        Personnel: '',
    };

    TaskName = '';
    ClassCode = '';
    StartDate = '';
    EndDate = '';
    Status = '';
    RecognitionLevel = '';

    values = 30;
    values2 = 100;
    isVisible = false;

    trueOrf = false //输入框禁用

    isSubmitJsonStr = '' //是否提交学校

    bandChange = false

    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private confirmServ: NzModalService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.TaskName = params['TaskName'];
            this.StartDate = params['StartDate'];
            this.EndDate = params['EndDate'];
            this.ClassCode = params['ClassCode'];
            this.Status = params['Status'];
            this.RecognitionLevel = params['RecognitionLevel'];
        });

        this.isSubmitJsonStr = JSON.parse(sessionStorage.getItem('isSubmit'));

        if (this.isSubmitJsonStr == '2') {
            this.bandChange = true
        }

        this.loadsubmit()

    }

    //获取公示人员名单
    loadsubmit() {
        this.httpService.POST({
            Router: ServelUrl.Url.qnotice,
            Method: 'POST',
            Body: {
                ClassCode: this.ClassCode,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.trueOrf = true;
                    this.searchObj.NoticeTitle = res.Data.NoticeTitle;
                    this.searchObj.Personnel = res.Data.Personnel;
                    this.txtChange1(this.searchObj.NoticeTitle)
                    this.txtChange2(this.searchObj.Personnel)
                } else {
                    this.trueOrf = false;
                }
            }
        })
    }

    //修改公示小组名单
    changeModal() {
        this.trueOrf = false;
    }

    showModal = () => {
        if (!this.searchObj.NoticeTitle.trim()) {
            this.msgSrv.warning('公告标题不能为空！');
            return
        }
        if (!this.searchObj.Personnel.trim()) {
            this.msgSrv.warning('小组成员名单不能为空！');
            return
        }

        this.isVisible = true;
    }
 
    handleOk = (e) => {
        console.log('点击了确定');
        this.isVisible = false;
        this.httpService.POST({
            Router: ServelUrl.Url.notice,
            Method: 'POST',
            Body: {
                ClassCode: this.ClassCode,
                NoticeTitle: this.searchObj.NoticeTitle,
                Personnel: this.searchObj.Personnel,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.createMessage('success', '公示成功')
                const that = this;
                setTimeout(function () {
                    that.router.navigate(['/waitdecide/studentwaitdecide', { ClassCode: that.ClassCode, TaskName: that.TaskName, Status: '0', RecognitionLevel: '0', StartDate: that.StartDate, EndDate: that.EndDate }]);
                }, '1500');
            } else {
                this.createMessage('error', res.FeedbackText)
            }
        })
    }

    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }

    //公示成功后弹窗
    createMessage = (type, text) => {
        this.msgSrv.create(type, ` ${text}`);
    };

    //备注框字数变化
    txtChange1(value: string) {
        this.values = 30 - value.length
    }
    //备注框字数变化
    txtChange2(value: string) {
        this.values2 = 100 - value.length
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




}
