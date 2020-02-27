import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService, NzModalService, } from "ng-zorro-antd";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from 'moment';


@Component({
    selector: 'app-publishtask',
    templateUrl: './publishtask.component.html',
    styleUrls: ['./publishtask.component.css']
})
export class PublishtaskComponent implements OnInit {

    //任务类型
    optioncatgray = [
        { Code: '9800001', Name: '初次认定' },
        { Code: '9800002', Name: '复核认定' },
    ]
    //任务类型
    optiongrade = [];

    searchObj = {
        TaskName: '',
        TaskType: '',
        Grades: [],
        Note: '',
    };

    TaskId = ''; //任务ID
    _startDate = null;
    _endDate = null;

    values = 30;
    values2 = 100;
    wraphidden = true; //学生自评问卷时间  显示还是隐藏
    onlyRead = false;  //输入框只读
    btnTxt = '创建'

    constructor(public httpService: HttpService, private msgSrv: NzMessageService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.TaskId = params['TaskId'];
        });

        this.loadGrade();
        this.loadStatus();
        if (this.TaskId) {
            this.onlyRead = true;
            this.btnTxt = '修改'
        }
    }

    //提交
    submit() {
        if (this.TaskId) {
            this.submitUpData();
        } else {

            if (!this.searchObj.TaskName.trim()) {
                this.msgSrv.warning('任务标题不能为空！');
                return
            }
            if (!this.searchObj.TaskType.trim()) {
                this.msgSrv.warning('任务类型不能为空！');
                return
            }

            if (this.searchObj.TaskType == '9800001' && this._startDate == null) {
                this.msgSrv.warning('学生自评调查问卷填报开启时间不能为空！');
                return
            }

            if (this._endDate == null) {
                this.msgSrv.warning('学院上报截止时间不能为空！');
                return
            }

            if (this.searchObj.Grades.length == 0) {
                this.msgSrv.warning('受众范围不能为空！');
                return
            }

            this.searchObj.Note = this.searchObj.Note.trim()
            var Grades = this.searchObj.Grades.join(",");
            var StartDate1 = '';
            if (this._startDate != null) {
                StartDate1 = this.nowDay(this._startDate).substring(0, 10)
            }
            var EndDate1 = this.nowDay(this._endDate).substring(0, 10)

            this.httpService.POST({
                Router: ServelUrl.Url.task,
                Method: 'POST',
                Body: {
                    TaskName: this.searchObj.TaskName,
                    TaskType: this.searchObj.TaskType,
                    StartDate: StartDate1,
                    EndDate: EndDate1,
                    Grades: Grades,
                    Note: this.searchObj.Note,
                }
            }).subscribe(res => {
                if (!res.FeedbackCode) {
                    this.msgSrv.success('创建成功');
                    this.router.navigate(['waitdecide']);
                } else {
                    this.msgSrv.warning(res.FeedbackText);
                }
            })
        }


    }

    //修改认定任务提交
    submitUpData() {
        if (this._endDate == null) {
            this.msgSrv.warning('学院上报截止时间不能为空！');
            return
        }

        var EndDate1 = this.nowDay(this._endDate).substring(0, 10)

        this.httpService.POST({
            Router: ServelUrl.Url.uptask,
            Method: 'POST',
            Body: {
                TaskId: this.TaskId,
                EndDate: EndDate1,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.msgSrv.success('修改成功');
                this.router.navigate(['waitdecide']);
            } else {
                this.msgSrv.warning(res.FeedbackText);
            }
        })
    }
    //获取已发布任务内容
    loadFabDetail() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.taskone,
            Method: 'POST',
            Body: {
                TaskId: this.TaskId
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                res.Data.Grades = res.Data.Grades.split(",");
                if (res.Data.TaskType == '9800002') {
                    this.wraphidden = false;
                }

                this.searchObj = res.Data;
                if (res.Data.StartDate) {
                    this._startDate = this.formatDate(res.Data.StartDate);
                }

                console.log(res.Data.EndDate.substring(0, 10))
                this._endDate = this.formatDate(res.Data.EndDate.substring(0, 10));
            }
        });
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
    //加载年级
    loadGrade() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.allgrade,
            Method: 'POST',
            Body: {
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optiongrade = res.Data;
                //加载单个任务详情
                if (this.TaskId) {
                    this.loadFabDetail();
                }
            }
        });
    }
    //备注框字数变化
    txtChange(value: string) {
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

    //自评开始时间显示与隐藏
    keephid() {
        if (this.searchObj.TaskType != '9800001') {
            this.wraphidden = false
        } else {
            this.wraphidden = true
        }
    }
    //标准日期转2018-08-23
    nowDay(obj) {
        const Dates = new Date(obj);
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
    }

    // 字符串转日期
    formatDate(value) {
        var date = new Date(value) //.format("yyyy-MM-dd HH:mm");
        return date;
    }


    newArray = (len) => {
        const result = [];
        for (let i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    };
    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return startValue.getTime() <= new Date().getTime() - 86400000
        }
        return startValue.getTime() >= this._endDate.getTime();

    };
    _disabledEndDate = (endValue) => {

        if (!endValue || !this._startDate) {
            return endValue.getTime() <= new Date().getTime() - 86400000
        }

        if (this._startDate.getTime() + 86400000 > new Date().getTime()) {
            return endValue.getTime() <= this._startDate.getTime() + 86400000;
        } else {
            return endValue.getTime() <= new Date().getTime() - 86400000
        }

    };
    get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
    }
    get _endTime() {
        return {
            nzHideDisabledOptions: true,
            nzDisabledHours: () => {
                return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
            },
            nzDisabledMinutes: (h) => {
                if (this._isSameDay && h === this._startDate.getHours()) {
                    return this.newArray(this._startDate.getMinutes());
                }
                return [];
            },
            nzDisabledSeconds: (h, m) => {
                if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
                    return this.newArray(this._startDate.getSeconds());
                }
                return [];
            }
        }
    }
























}
