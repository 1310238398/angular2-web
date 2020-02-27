import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { RoomService } from "./room.service";
import { Element } from '@angular/compiler';
declare var echarts: any;
declare var $: any
@Component({
    selector: 'app-room_info',
    templateUrl: './room_info.html',
    styleUrls: ['./room_info.css']
})
export class RoomInfoComponent implements OnInit {
    check = 'health';
    violationLoading = false;
    violationData = [];
    total = 0;
    pageIndex = 1;
    pageSize = 10;
    hasScore: boolean;
    roomCode = '';
    roomName = '';
    room = {
        academy: '',
        counselor: '',
        member: [],
        number: '',
        remark: '',
        roomsex: '',
    };
    roomDetailLoading = false;
    lineChart: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private msgsrv: NzMessageService,
        private confirmServ: NzModalService,
        public roomService: RoomService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            this.roomCode = params['roomcode'] || '';
            this.roomName = params['roomname'] || '';
            if (this.roomCode) {
                this.getRoomDetail(this.roomCode);
                this.getRoomScore(this.roomCode);
            }
        });


    }

    // 窗口
    onResize(event: any) {
        if (this.lineChart) {
            this.lineChart.resize();
        }
    }


    // 宿舍信息精确查询
    getRoomDetail(code: string) {
        this.roomDetailLoading = true;
        this.roomService.roomDetailQuery(code).then((res) => {
            this.roomDetailLoading = false;
            this.room = res.data;
        }).catch(() => this.roomDetailLoading = false);
    }

    onModelChange(value) {
        if (value === 'violation') {
            this.getRoomViolation();
        }
        if (value === 'health') {
            this.getRoomScore(this.roomCode);
        }
    }

    pageIndexChange(value) {
        console.log(value);
        if (value) {
            this.pageIndex = value;
            this.getRoomViolation();
        }
    }

    // 宿舍违纪查询
    getRoomViolation() {
        this.violationLoading = true;
        this.roomService.roomViolationQuery(this.roomCode, this.pageIndex, this.pageSize).then(res => {
            this.violationLoading = false;
            if (res.data && res.data.length > 0) {
                this.violationData = res.data;
                this.violationData.forEach(element => {
                    element.showAnnex = false;
                    element.annex = [];
                });
                this.total = res.total;
            } else {
                this.violationData = [];
                this.total = 0;
            }
        }).catch(() => {
            this.violationLoading = false;
            this.violationData = [];
            this.total = 0;
        });
    }

    //查看附件 临时
    loadImg(recordid: string, i: number) {
        if (!this.violationData[i].showAnnex) {
            this.roomService.roomViolationAnnexQuery(recordid).then(res => {
                this.violationData[i].annex = res.data;
                this.violationData[i].showAnnex = true;
                setTimeout(() => { $("#a" + i + "0").click(); }, 100);
            });
        } else {
            $("#a" + i + "0").click();
        }
    }

    //点击查看大图
    viewBigImg(i) {
        $('.jq22' + i).viewer()
    }

    // 宿舍成绩查询
    getRoomScore(code: string) {
        this.lineChart = echarts.init(document.getElementById('lineChart'), '', {
            devicePixelRatio: window.devicePixelRatio,
            renderer: 'canvas',
            width: 'auto',
            height: 'auto'
        });
        this.lineChart.showLoading();
        this.roomService.roomScoreQuery(code).then((res) => {
            if (res.data && res.data.length > 0) {
                this.hasScore = true;
                this.roomScoreLineChart(res.data);
            } else {
                this.hasScore = false;
                document.getElementById("lineChart").style.display = "none";//隐藏
                document.getElementById("lineChart").style.height = "0px";
            }
        }).catch(() => this.hasScore = false);
    }

    roomScoreLineChart(data: any[]) {
        let xData = [];
        let yData = [];
        let weekData = [];
        data.forEach((element) => {
            xData.push(element.day);
            yData.push(element.result);
            weekData.push(element.weeks);
        });
        const options = {
            tooltip: {
                trigger: 'item',
                formatter: "{c}"
            },
            color: ['#59b2e0'],
            grid: {
                left: '5%',
                right: '15%',
                top: '15%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                name: '月/日' + '\n' + '周',
                data: xData,
                axisLabel: {
                    show: true,
                    formatter: function (value, index) {
                        return value + '\n' + weekData[index];
                    }
                },
                // axisLine:{
                //     symbol:['none', 'arrow']
                // }
            },
            yAxis: {
                type: 'value',
                name: '卫生成绩',
                min: 0,
                max: 100
            },
            series: [{
                data: yData,
                type: 'line'
            }]
        };
        this.lineChart.hideLoading();
        this.lineChart.setOption(options);
    }

    // 显示详细信息
    showStuDetail(stu: any) {
        this.roomService.isViewStudentinfo(stu.intelusercode).then((res) => {
            if (res.data && res.data === '可以查看') {
                window.location.href = "/bigdata/#/info?uid=" + stu.intelusercode;
                console.log(window.location.href);
            } else {
                this.msgsrv.warning('您没有权限查看该生的详细信息', { nzDuration: 3000 });
            }
        });
        // this.confirmServ.warning({
        //     title: '这是一条警告信息',
        //     content: '一些附加信息一些附加信息一些附加信息',
        //     okText: '确定'
        // });
    }
}
