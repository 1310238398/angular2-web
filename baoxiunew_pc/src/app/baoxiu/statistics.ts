import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServelUrl } from './ServelUrl';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";
import { HttpService } from './http/http.service';
import * as qiniu from 'qiniu-js';
import { BaoXiuService } from "./baoxiu.service";

@Component({
    selector: 'app-baoxiu-statistics',
    templateUrl: './statistics.html',
    styleUrls: ['baoxiu.scss']
})

export class StatisticsComponent implements OnInit {
    chartOption: any; // 柱状图数据
    StatisticsType = "WorkloadStatistics"; // 要查询哪个数据
    Time1 = new Date()
    Time2 = new Date()
    StatisticsTitle = "维修人员工作量统计" // 标题

    xAxisData: any; // 柱状图X轴数据

    AreaStatisticsType = "dormitory" // 区域统计项

    AreaStatisticsData = [] // 区域统计数据
    AreaStatisticsItems = [] // 区域统计列

    constructor(
        private router: Router,
        private msgsrv: NzMessageService,
        private httpService: HttpService,
        private baoxiuService: BaoXiuService
    ) {
        console.log("statistics");
    }

    ngOnInit() {
        this.Time1.setDate(this.Time1.getDate() - 7) // 设置开始日期为7天前
        this.Time1 = new Date(this.dateFtt("yyyy-MM-dd", this.Time1)) // 去掉时分秒

        this.getChartOption()
        // this.AreaStatistics()
    }

    // 列表页
    goToList() {
        this.router.navigate(['']);
    }

    // 获取图表数据
    getChartOption() {
        switch (this.StatisticsType) {
            case "WorkloadStatistics":
                // 维修人员工作量统计
                this.WorkloadStatistics()
                break;
            case "ItemStatistics":
                // 维修项目统计
                this.ItemStatistics()
                break;
            case "AreaStatistics":
                // 维修区域统计
                this.AreaStatistics()
                break;
            default:
                this.msgsrv.warning('状态错误!');
                break;
        }
    }

    // 维修人员工作量统计
    WorkloadStatistics() {
        this.StatisticsTitle = "维修人员工作量统计"
        let labelOption = {
            normal: {
                show: true,
                position: 'top',
                distance: '6',
            }
        };
        let body = {
            Time1: Math.round(Number(this.Time1) / 1000).toString(),
            Time2: this.Time2 ? Math.round(Number(this.Time2) / 1000).toString() : null,
        }
        this.baoxiuService.WorkloadStatistics(body).then(
            res => {
                if (res.Data) {
                    let Processed = [], Processing = []

                    this.xAxisData = []

                    res.Data.forEach(v => {
                        this.xAxisData.push({
                            value: v.Name,
                            RepairPersonnelUID: v.RepairPersonnelUID
                        })
                        if (v.Processed == "") {
                            Processed.push("0")
                        } else {
                            Processed.push(v.Processed)
                        }
                        if (v.Processing == "") {
                            Processing.push("0")
                        } else {
                            Processing.push(v.Processing)
                        }
                    });

                    this.chartOption = {
                        color: ['#ff5d00', '#ffa600'],
                        legend: {
                            data: ['已处理', '处理中']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: { show: true },
                                data: this.xAxisData
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '已处理',
                                type: 'bar',
                                label: labelOption,
                                data: Processed
                            },
                            {
                                name: '处理中',
                                type: 'bar',
                                label: labelOption,
                                data: Processing
                            }
                        ]
                    };
                } else {
                    this.msgsrv.warning('获取图表失败！');
                }
            }
        ).catch(res => {
            this.msgsrv.warning('获取图表失败！');
        })
    }

    // 维修项目统计
    ItemStatistics() {
        this.StatisticsTitle = "维修项目统计"
        let labelOption = {
            normal: {
                show: true,
                position: 'top',
                distance: '6',
            }
        };

        let body = {
            Time1: Math.round(Number(this.Time1) / 1000).toString(),
            Time2: this.Time2 ? Math.round(Number(this.Time2) / 1000).toString() : null,
        }

        this.baoxiuService.ItemStatistics(body).then(
            res => {
                if (res.Data) {
                    let TODO = [], Processed = [], Processing = []

                    this.xAxisData = []

                    res.Data.forEach(v => {
                        this.xAxisData.push({
                            value: v.CodeName,
                            ItemCode: v.ItemCode
                        })
                        if (v.TODO == "") {
                            TODO.push("0")
                        } else {
                            TODO.push(v.TODO)
                        }
                        if (v.Processed == "") {
                            Processed.push("0")
                        } else {
                            Processed.push(v.Processed)
                        }
                        if (v.Processing == "") {
                            Processing.push("0")
                        } else {
                            Processing.push(v.Processing)
                        }
                    });

                    this.chartOption = {
                        color: ['#ff5d00', '#ffa600', '#69a100'],
                        legend: {
                            data: ['已处理', '处理中', '待处理']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: { show: true },
                                data: this.xAxisData
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '已处理',
                                type: 'bar',
                                label: labelOption,
                                data: Processed
                            },
                            {
                                name: '处理中',
                                type: 'bar',
                                label: labelOption,
                                data: Processing
                            },
                            {
                                name: '待处理',
                                type: 'bar',
                                label: labelOption,
                                data: TODO
                            }
                        ]
                    };
                } else {
                    this.msgsrv.warning('获取图表失败！');
                }
            }
        ).catch(res => {
            this.msgsrv.warning('获取图表失败！');
        })
    }

    // 点击柱状图
    onChartClick(e) {
        let Status: string
        switch (e.seriesName) {
            case "处理中":
                Status = "20,21"
                break;
            case "已处理":
                Status = "30,31,40"
                break;
            case "待处理":
                Status = "10"
                break;
            default:
                return;
        }

        this.router.navigate([''], {
            queryParams: {
                Status: Status,
                ItemCode: this.xAxisData[e.dataIndex].ItemCode,
                RepairPersonnelUID: this.xAxisData[e.dataIndex].RepairPersonnelUID,
                CreateTime1: this.Time1,
                CreateTime2: this.Time2,
            }
        })
    }

    // 格式化时间
    dateFtt(fmt, date) { //author: meizz   
        var o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    // 维修区域统计
    AreaStatistics() {
        this.StatisticsTitle = "维修区域统计"

        let body = {
            Time1: Math.round(Number(this.Time1) / 1000).toString(),
            Time2: this.Time2 ? Math.round(Number(this.Time2) / 1000).toString() : null,
        }

        let apiObj: any

        switch (this.AreaStatisticsType) {
            case "campus":
                // 校区
                apiObj = this.baoxiuService.CampusAreaStatistics(body)
                break
            case "district":
                // 园区
                apiObj = this.baoxiuService.DistrictAreaStatistics(body)
                break
            case "dormitory":
                // 宿舍楼
                apiObj = this.baoxiuService.DormitoryAreaStatistics(body)
                break
            default:
                this.msgsrv.warning('状态错误!')
                break
        }

        apiObj.then(
            res => {
                if (res.Data) {
                    this.AreaStatisticsData = res.Data
                    this.AreaStatisticsItems = []
                    for (const key in this.AreaStatisticsData[0]) {
                        let k = key.slice(key.indexOf('a') + 1);  // 截取掉用于排序的字符
                        this.AreaStatisticsItems.push({ show: k, sortKey: key })
                        // 构造排序用的对象
                        this.sortMap[key] = null
                    }
                } else {
                    this.msgsrv.warning('获取图表失败！')
                }
            }
        ).catch(res => {
            this.msgsrv.warning('获取图表失败！')
        })
    }

    getKeys(item) {
        return Object.keys(item);
    }

    // 排序
    sort(sortName, value) {
        this.sortName = sortName;
        this.sortValue = value;
        Object.keys(this.sortMap).forEach(key => {
            if (key !== sortName) {
                this.sortMap[key] = null;
            } else {
                this.sortMap[key] = value;
            }
        });
        this.search()
    }
    sortMap = {}
    sortName = null
    sortValue = null
    copyData = [...this.AreaStatisticsData]
    search() {
        this.AreaStatisticsData = [...this.AreaStatisticsData.sort((a, b) => {
            if (a[this.sortName] > b[this.sortName]) {
                return (this.sortValue === 'ascend') ? 1 : -1
            } else if (a[this.sortName] < b[this.sortName]) {
                return (this.sortValue === 'ascend') ? -1 : 1
            } else {
                return 0;
            }
        })]
    }

    // 禁止选择比开始时间小的结束时间
    _startValueChange = () => {
        if (this.Time1 > this.Time2) {
            this.Time2 = null;
        }
    };
    _endValueChange = () => {
        if (this.Time1 > this.Time2) {
            this.Time1 = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this.Time2) {
            return false
        }
        return startValue.getTime() >= this.Time2.getTime();
    };
    _disabledEndDate = (endValue) => {

        if (!endValue || !this.Time1) {
            return false
        }
        return endValue.getTime() <= this.Time1.getTime()
    };
}
