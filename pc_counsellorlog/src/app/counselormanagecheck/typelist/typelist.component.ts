import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import * as moment from 'moment';

@Component({
    selector: 'app-typelist',
    templateUrl: './typelist.component.html',
    styleUrls: ['./typelist.component.css']
})
export class TypeListComponent implements OnInit {

    searchObj = {
        LogTitle: '',      //日志标题
        CateGray: '',      //记录类型
        YearDat: '',       //学年学期名称
        CollegeDat: '',     //学院代码
        TeacherDat: '',     //教师代码
        AcademicYearCode: '', //学年代码
        AcademicTermCode: '', //学期代码
        fabTime: '',     //发布时间
    };

    optioncategray = [];  //记录类型
    optionyear = [];      //学年学期
    optioncollege = [];   //学院
    optionteacher = [];   //辅导员
    optionfabtime = [];   //发布日期(周次)

    page = {
        Page: 1,
        PageSize: 30,
    };

    total = 0;
    values = 10;  //可输入字数
    dataSet = [];

    saveselectYear = '';
    saveselectCollege = '';
    saveselectTeacher = '';
    saveselectAcademicYearCode = '';
    saveselectAcademicTermCode = '';
    saveselectMonth = '';

    constructor(public httpService: HttpService, public router: Router, public route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.forEach((params: Params) => {
            this.searchObj.YearDat = params['selectYear'];
            this.searchObj.CollegeDat = params['selectCollege'];
            this.searchObj.TeacherDat = params['selectTeacher'];
            this.searchObj.AcademicYearCode = params['selectAcademicYearCode'];
            this.searchObj.AcademicTermCode = params['selectAcademicTermCode'];
            this.searchObj.fabTime = params['selectMonth'];

            this.saveselectYear = params['selectYear'];
            this.saveselectCollege = params['selectCollege'];
            this.saveselectTeacher = params['selectTeacher'];
            this.saveselectAcademicYearCode = params['selectAcademicYearCode'];
            this.saveselectAcademicTermCode = params['selectAcademicTermCode'];
            this.saveselectMonth = params['selectMonth'];
        });

        this.loadCate();
        this.onSearchYear();
        this.onSearchCollage();
        this.onloadWeekTime('0');
        this.onSearch();
        this.onSearchTeacher();
    }

    //获取数据列表
    onSearch(reload = false) {
        if (reload) {
            this.page.Page = 1
        }
        var pageStr = String(this.page.Page);

        if (this.searchObj.LogTitle == null) {
            this.searchObj.LogTitle = ''
        }
        if (this.searchObj.CateGray == null) {
            this.searchObj.CateGray = ''
        }
        if (this.searchObj.AcademicYearCode == null) {
            this.searchObj.AcademicYearCode = ''
        }
        if (this.searchObj.AcademicTermCode == null) {
            this.searchObj.AcademicTermCode = ''
        }
        if (this.searchObj.CollegeDat == null) {
            this.searchObj.CollegeDat = ''
        }
        if (this.searchObj.TeacherDat == null) {
            this.searchObj.TeacherDat = ''
        }
        if (this.searchObj.fabTime == null) {
            this.searchObj.fabTime = ''
        }


        this.httpService.POST({
            Router: ServelUrl.Url.searchloglist,
            Method: 'POST',
            Body: {
                Page: pageStr,
                Count: '30',
                LogTitle: this.searchObj.LogTitle,
                RecordType: this.searchObj.CateGray,
                AcademicYearCode: this.searchObj.AcademicYearCode,
                AcademicTermCode: this.searchObj.AcademicTermCode,
                AcademyCode: this.searchObj.CollegeDat,
                IntelUserCode: this.searchObj.TeacherDat,
                WeekTime: this.searchObj.fabTime,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.dataSet = res.Data.Data;
                    this.total = parseInt(res.Data.Total);
                    for (let i = 0; i < this.dataSet.length; i++) {
                        this.dataSet[i].InsertDatetime = this.dataSet[i].InsertDatetime.substring(0, 10)
                        this.dataSet[i].PublishDateTime = this.dataSet[i].PublishDateTime.substring(0, 10)
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
    //记录类型
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
    //获取学年 学期
    onSearchYear() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.counsellorselectyearterm,
            Method: 'POST',
            Body: {
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.optionyear = res.Data;
                    for (let i = 0; i < this.optionyear.length; i++) {
                        this.optionyear[i]['indexNum'] = String(i)
                    }

                } else {
                    this.optionyear = []
                }
            }
        });



    }
    //获取学院
    onSearchCollage() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.getacademyother,
            Method: 'POST',
            Body: {
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optioncollege = res.Data;
            }
        });
    }
    //获取教师
    onSearchTeacher() {
        if (this.searchObj.CollegeDat == null) {
            this.searchObj.CollegeDat = ''
        }
        this.optionteacher = [];
        this.searchObj.TeacherDat = '';

        this.httpService.postJSON({
            Router: ServelUrl.Url.counsellorselectall,
            Method: 'POST',
            Body: {
                AcademyCode: this.searchObj.CollegeDat
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                this.optionteacher = res.Data;
            }
        });
    }

    //获取周次
    onloadWeekTime(obj) {
        if (obj == '1') {
            this.optionfabtime = [];
            this.searchObj.fabTime = null;

            for (let i = 0; i < this.optionyear.length; i++) {
                if (this.optionyear[i].indexNum == this.searchObj.YearDat) {
                    this.searchObj.AcademicYearCode = this.optionyear[i].AcademicYearCode;
                    this.searchObj.AcademicTermCode = this.optionyear[i].AcademicTermCode;
                }
            }
        }

        if (this.searchObj.AcademicYearCode == null) {
            this.searchObj.AcademicYearCode = ''
        }
        if (this.searchObj.AcademicTermCode == null) {
            this.searchObj.AcademicTermCode = ''
        }

        this.httpService.POST({
            Router: ServelUrl.Url.nowweektime,
            Method: 'POST',
            Body: {
                AcademicYearCode: this.searchObj.AcademicYearCode,
                AcademicTermCode: this.searchObj.AcademicTermCode,
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.optionfabtime = res.Data;
                    for (let i = 0; i < this.optionfabtime.length; i++) {
                        this.optionfabtime[i]['Name'] = '第' + this.optionfabtime[i].Weeks + '周'
                    }

                }
            }
        })
    }
    //重置
    resetForm(form) {
        form.reset();
    }

    nowDay(obj) {
        const Dates = new Date(obj * 1000);
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day
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
}
