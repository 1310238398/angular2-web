import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import * as moment from 'moment';

@Component({
    selector: 'app-typelist',
    templateUrl: './typelist.component.html',
    styleUrls: ['./typelist.component.css']
})
export class TypeListComponent implements OnInit {

    dataSet = [];
    searchObj = {
        LogTitle: '',      //日志标题
        CateGray: '',      //记录类型
        PublishStatus: '', //发布状态
    };
    _startDate = null; //创建时间 - 开始时间
    _endDate = null;    //创建时间 - 结束时间
    PubstartDate = null; //发布时间 - 开始时间
    PubendDate = null;   //发布时间 - 结束时间

    optioncategray = []

    optionspubstatus = [  //发布状态
        { Name: '未发布', Code: '0' },
        { Name: '已发布', Code: '1' },
    ]
    page = {
        Page: 1,
        PageSize: 30,
    };

    total = 0;
    values = 10;  //可输入字数
    constructor(public httpService: HttpService, public msgSrv: NzMessageService, public router: Router, public route: ActivatedRoute) { }
    ngOnInit(): void {
        this.onSearch();
        this.loadCate();
    }

    //获取数据列表
    onSearch(reload = false) {
        if (reload) {
            this.page.Page = 1
        }

        var CreatStartTime = this._startDate;
        var CreatEndTime = this._endDate;
        var PublishStartTime = this.PubstartDate;
        var PublishEndTime = this.PubendDate;

        if (this.searchObj.LogTitle == null) {
            this.searchObj.LogTitle = '';
        }
        if (this.searchObj.CateGray == null) {
            this.searchObj.CateGray = '';
        }
        if (this.searchObj.PublishStatus == null) {
            this.searchObj.PublishStatus = '';
        }
        if (this._startDate == null) {
            CreatStartTime = '';
        } else {
            CreatStartTime = String(this.getNewTime(CreatStartTime))
        }

        if (this._endDate == null) {
            CreatEndTime = '';
        } else {
            CreatEndTime = String(this.getOldTime(CreatEndTime))
        }

        if (this.PubstartDate == null) {
            PublishStartTime = '';
        } else {
            PublishStartTime = String(this.getNewTime(PublishStartTime))
        }

        if (this.PubendDate == null) {
            PublishEndTime = '';
        } else {
            PublishEndTime = String(this.getOldTime(PublishEndTime))
        }


        var pageStr = String(this.page.Page);

        this.httpService.POST({
            Router: ServelUrl.Url.counsellorLogList,
            Method: 'POST',
            Body: {
                Page: pageStr,
                Count: '30',
                LogTitle: this.searchObj.LogTitle,
                RecordType: this.searchObj.CateGray,
                CreatStartTime: CreatStartTime,
                CreatEndTime: CreatEndTime,
                ReleaseStatus: this.searchObj.PublishStatus,
                PublishStartTime: PublishStartTime,
                PublishEndTime: PublishEndTime,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.dataSet = res.Data.Data;
                    this.total = parseInt(res.Data.Total);
                    for (let i = 0; i < this.dataSet.length; i++) {

                        this.dataSet[i].InsertDatetime = this.dataSet[i].InsertDatetime.substring(0, 10)
                        this.dataSet[i].PublishDatetime = this.dataSet[i].PublishDatetime.substring(0, 10)

                        if (this.dataSet[i].RecordType == '001100') {
                            this.dataSet[i]['RecordName'] = '工作计划'
                        } else if (this.dataSet[i].RecordType == '001200') {
                            this.dataSet[i]['RecordName'] = '工作总结'
                        } else if (this.dataSet[i].RecordType == '001300') {
                            this.dataSet[i]['RecordName'] = '班会记录'
                        } else if (this.dataSet[i].RecordType == '001400') {
                            this.dataSet[i]['RecordName'] = '关心学生谈心记录'
                        } else if (this.dataSet[i].RecordType == '001500') {
                            this.dataSet[i]['RecordName'] = '与学生家长联系情况'
                        } else if (this.dataSet[i].RecordType == '001600') {
                            this.dataSet[i]['RecordName'] = '卫生检查记录'
                        } else if (this.dataSet[i].RecordType == '001700') {
                            this.dataSet[i]['RecordName'] = '晚自习检查记录'
                        }
                    }
                } else {
                    this.dataSet = []
                }
            }
        })
    }

    //重置
    resetForm(form) {
        form.reset();
    }

    //加载记录类型
    loadCate() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.bizcode,
            Method: 'POST',
            Body: {
                CodeType: 'counsellorlogcodetype'
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optioncategray = res.Data;
            }
        });
    }

    //备注框字数变化
    txtChange(value: string) {
        this.values = 10 - value.length
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

    //时间不到10前面加0
    addTime(data) {
        if (data < 10) {
            return '0' + data
        }
        return data
    }

    //时间转为时间戳
    getNewTime(obj) {
        var date = new Date(obj);
        var date_value = date.getFullYear() + '-' + this.addTime(date.getMonth() + 1) + '-' + this.addTime(date.getDate()) + ' 00' + ':' + '00' + ':' + '01';
        return date_value
    }
    //时间转为时间戳
    getOldTime(obj) {
        var date = new Date(obj);
        var date_value = date.getFullYear() + '-' + this.addTime(date.getMonth() + 1) + '-' + this.addTime(date.getDate()) + ' 23' + ':' + '59' + ':' + '59';
        return date_value
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
            return false
        }
        return startValue.getTime() >= this._endDate.getTime();

    };
    _disabledEndDate = (endValue) => {

        if (!endValue || !this._startDate) {
            return false
        }
        return endValue.getTime() <= this._startDate.getTime()

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



    _startValueChange1 = () => {
        if (this.PubstartDate > this.PubendDate) {
            this.PubendDate = null;
        }
    };
    _endValueChange1 = () => {
        if (this.PubstartDate > this.PubendDate) {
            this.PubstartDate = null;
        }
    };
    _disabledStartDate1 = (startValue) => {
        if (!startValue || !this.PubendDate) {
            return false
        }
        return startValue.getTime() >= this.PubendDate.getTime();

    };
    _disabledEndDate1 = (endValue) => {

        if (!endValue || !this.PubstartDate) {
            return false
        }
        return endValue.getTime() <= this.PubstartDate.getTime()

    };
    get _isSameDay1() {
        return this.PubstartDate && this.PubendDate && moment(this.PubstartDate).isSame(this.PubendDate, 'day')
    }
    get _endTime1() {
        return {
            nzHideDisabledOptions: true,
            nzDisabledHours: () => {
                return this._isSameDay ? this.newArray(this.PubstartDate.getHours()) : [];
            },
            nzDisabledMinutes: (h) => {
                if (this._isSameDay && h === this.PubstartDate.getHours()) {
                    return this.newArray(this.PubstartDate.getMinutes());
                }
                return [];
            },
            nzDisabledSeconds: (h, m) => {
                if (this._isSameDay && h === this.PubstartDate.getHours() && m === this.PubstartDate.getMinutes()) {
                    return this.newArray(this.PubstartDate.getSeconds());
                }
                return [];
            }
        }
    }










}
