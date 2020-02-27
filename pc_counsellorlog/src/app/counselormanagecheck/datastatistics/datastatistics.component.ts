import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../ServelUrl";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
    selector: 'app-datastatistics',
    templateUrl: './datastatistics.component.html',
    styleUrls: ['./datastatistics.component.css']
})
export class DataStatisticsComponent implements OnInit {

    searchObj = {
        CateYear: '',           //学年学期
        CateCollege: '',        //学院
        Teacher: '',            //辅导员
        AcademicYearCode: '',    //学年代码
        AcademicTermCode: '',    //学期代码
    };

    optionyear = []; //学年学期 AcademicNameTerm,AcademicTermCode,AcademicYearCode
    optioncollege = []; //学院
    optionteacher = []; ////辅导员 IntelUserCode name

    chartOption: any;

    constructor(public httpService: HttpService, public router: Router, public route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.searchObj.CateYear = params['selectYear'];
            this.searchObj.CateCollege = params['selectCollege'];
            this.searchObj.Teacher = params['selectTeacher'];
            this.searchObj.AcademicYearCode = params['selectAcademicYearCode'];
            this.searchObj.AcademicTermCode = params['selectAcademicTermCode'];
        });

        this.onSearchYear();  //获取所有有数据的学年学期
        this.onSearchCollage(); //获取学院    
        this.onSearchTeacher(); //获取所有老师
    }

    //获取学年 学期
    onSearchYear() {
        this.httpService.POST({
            Router: ServelUrl.Url.counsellorselectyearterm,
            Method: 'POST',
            Body: {
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    this.optionyear = res.Data;
                    for (let i = 0; i < this.optionyear.length; i++) {
                        this.optionyear[i]['indexNum'] = String(i)
                    }
                    this.searchObj.CateYear = this.optionyear[0].indexNum;
                    this.searchObj.AcademicYearCode = this.optionyear[0].AcademicYearCode;
                    this.searchObj.AcademicTermCode = this.optionyear[0].AcademicTermCode;

                    this.loadTuxDataWeek();
                } else {
                    this.optionyear = []
                }
            }
        })
    }

    //获取学院
    onSearchCollage() {
        this.httpService.POST({
            Router: ServelUrl.Url.getacademyother,
            Method: 'POST',
            Body: {
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.optioncollege = res.Data;
            }
        })
    }

    //获取教师
    onSearchTeacher() {
        this.optionteacher = [];
        this.searchObj.Teacher = '';

        if (this.searchObj.CateCollege == null) {
            this.searchObj.CateCollege = ''
        }

        this.httpService.POST({
            Router: ServelUrl.Url.counsellorselectall,
            Method: 'POST',
            Body: {
                AcademyCode: this.searchObj.CateCollege
            }
        }).subscribe(res => {
            if (!res.FeedbackCode) {
                this.optionteacher = res.Data;
            }
        })
    }

    //获取周次  获取数据
    loadTuxDataWeek() {
        var xAxisWeek = []; //周次
        var seriesData = [];

        //获取周次
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
                    for (let i = 0; i < res.Data.length; i++) {
                        xAxisWeek.push(res.Data[i].Weeks);
                        seriesData.push('0')
                    }
                }
            }
        })

        //获取数据
        if (this.searchObj.CateCollege == null) {
            this.searchObj.CateCollege = ''
        }
        if (this.searchObj.Teacher == null) {
            this.searchObj.Teacher = ''
        }
        this.httpService.postJSON({
            Router: ServelUrl.Url.leadershipsearch,
            Method: 'POST',
            Body: {
                AcademicYearCode: this.searchObj.AcademicYearCode,
                AcademicTermCode: this.searchObj.AcademicTermCode,
                AcademyCode: this.searchObj.CateCollege,
                IntelUserCode: this.searchObj.Teacher,
            }
        }).then(res => {
            if (!res.FeedbackCode) {
                if (res.Data != null) {
                    for (let i = 0; i < xAxisWeek.length; i++) {
                        for (let j = 0; j < res.Data.length; j++) {
                            if (xAxisWeek[i] == res.Data[j].WeekTime) {
                                seriesData.splice(i, 1, res.Data[j].Number)
                            }

                        }
                    }
                }

                this.chartOption = {
                    title: {
                        text: '总发布量 (篇)'
                    },
                    color: ['#E78D50'],
                    tooltip: {},
                    legend: {
                        data: ['']
                    },
                    xAxis: {
                        name: '周次',
                        data: xAxisWeek
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                    },
                    series: [{
                        name: '发布量',
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'top'
                        },
                        data: seriesData
                    }]
                };
            }
        });
    }

    //点击查询按钮
    loadTuxData() {
        if (this.searchObj.CateYear) {
            for (let i = 0; i < this.optionyear.length; i++) {
                if (this.optionyear[i].indexNum == this.searchObj.CateYear) {
                    this.searchObj.AcademicYearCode = this.optionyear[i].AcademicYearCode;
                    this.searchObj.AcademicTermCode = this.optionyear[i].AcademicTermCode;
                }
            }
        }
        this.loadTuxDataWeek()
    }

    //点击事件
    onChartClick(evn) {
        var paramsObj = {
            selectYear: this.searchObj.CateYear,
            selectCollege: this.searchObj.CateCollege,
            selectTeacher: this.searchObj.Teacher,
            selectAcademicYearCode: this.searchObj.AcademicYearCode,
            selectAcademicTermCode: this.searchObj.AcademicTermCode,
            selectMonth: evn.dataIndex + 1,
        }
        this.router.navigate(['counselormanagecheck/typelist'], { queryParams: { selectYear: this.searchObj.CateYear, selectCollege: this.searchObj.CateCollege, selectTeacher: this.searchObj.Teacher, selectAcademicYearCode: this.searchObj.AcademicYearCode, selectAcademicTermCode: this.searchObj.AcademicTermCode, selectMonth: evn.dataIndex + 1 } });
    }

    //重置
    resetForm(form) {
        form.reset();
    }

}
