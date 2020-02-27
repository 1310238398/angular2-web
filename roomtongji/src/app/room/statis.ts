import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd";

import { HttpService } from "../http/http.service";
import { RoomService } from "./room.service";
declare var echarts: any;
@Component({
    selector: 'app-roomstatis',
    templateUrl: './statis.html',
    styleUrls: ['./room.css']
})
export class StatisComponent implements OnInit, AfterViewInit {
    universityInfo = {
        Campus: '',
        Logo: ''
    };
    tabSwitch = 0; // 0显示宿舍楼统计1显示学院统计
    hasLoadAcademyData = false;
    dormitoryLoading = false;
    loadDormitoryMore = false;
    dormitoryMoreLoading = false;
    pageIndex = 1;
    pageSize = 20;
    acPageIndex = 1;
    acPageSize = 20;
    academyDataSet = [];
    academyLoading = false;
    loadAcademyMore = false;
    academyMoreLoading = false;
    academyHeader = {
        student: null,
        occupancy: null,
        roomnum: null,
        emptybedroom: null,
        emptybeds: null
    };
    academySortName = null;
    academySortValue = null;
    roomtotal = '0';
    bedtotal = '0';
    manroom = '0';
    womanroom = '0';
    manoccupancy = '0';
    womanoccupancy = '0';
    occupancyrate = '0';
    empty = '0';//空闲宿舍数
    occupancy = '0';//已住宿舍数
    sortName = null;
    sortValue = null;
    allRoomChart: any;
    emptyBedRoomChart: any;
    emptyBedChart: any;
    emptyRoomBedChart: any;
    checkOptions = [
        { label: '性别', name: null, value: 'Sex', checked: false },
        { label: '总宿舍数', name: null, value: 'roomnums', checked: false },
        { label: '总床位数', name: null, value: 'bednums', checked: false },
        { label: '空闲宿舍', name: null, value: 'empty_room_nums', checked: false },
        { label: '空闲宿舍床位', name: null, value: 'empty_bed_nums', checked: false },
        { label: '空床宿舍', name: null, value: 'half_room_nums', checked: false },
        { label: '空床宿舍床位', name: null, value: 'half_bed_nums', checked: false },
        { label: '已住人数', name: null, value: 'occupancy', checked: false },
        { label: '入住率', name: null, value: 'occupancyrate', checked: false }
    ];
    _dataSet = [];
    header = [];
    option: any;
    initOpts: any;
    constructor(
        private router: Router,
        private msgsrv: NzMessageService,
        public httpService: HttpService,
        public roomService: RoomService
    ) { }

    ngOnInit() {
        this.dormitoryStatis();
        this.getUniversityInfo();
        this.getWholeroom();
        this.getWholebeds();
        this.getManRoom();
        this.getWomanRoom();
        this.getManNumber();
        this.getWoManNumber();
        this.getWholeOccupancyRate();
        // this.getRoomStatis();
        // this.getAllRoomStatisPie();
        // this.getEmptyBedRoomStatisPie();
        // this.getEmptyBedStatisPie();
        // this.getEmptyRoomBedStatisPie();

        this.header = [
            { label: '名称', name: null, value: 'dormitoryname' },
            { label: '性别', name: null, value: 'Sex' },
            { label: '总宿舍数', name: null, value: 'roomnums' },
            { label: '总床位数', name: null, value: 'bednums' },
            { label: '空闲宿舍', name: null, value: 'empty_room_nums' },
            { label: '空闲宿舍床位', name: null, value: 'empty_bed_nums' },
            { label: '空床宿舍', name: null, value: 'half_room_nums' },
            { label: '空床宿舍床位', name: null, value: 'half_bed_nums' },
            { label: '已住人数', name: null, value: 'occupancy' },
            { label: '入住率', name: null, value: 'occupancyrate' }
        ];

    }
    ngAfterViewInit() {
        this.getAllRoomStatisPie();
        this.getEmptyBedRoomStatisPie();
        this.getEmptyBedStatisPie();
        this.getEmptyRoomBedStatisPie();
    }

    // 窗口
    onResize(event: any) {
        if (this.allRoomChart) {
            this.allRoomChart.resize();
        }
        if (this.emptyBedRoomChart) {
            this.emptyBedRoomChart.resize();
        }
        if (this.emptyBedChart) {
            this.emptyBedChart.resize();
        }
        if (this.emptyRoomBedChart) {
            this.emptyRoomBedChart.resize();
        }
    }

    // 获取学校基本信息
    getUniversityInfo() {
        this.roomService.queryUniversityInfo().then((res) => {
            if (!res.Data) {
                return;
            }
            this.universityInfo.Campus = res.Data.Campus || '';
            this.universityInfo.Logo = res.Data.Logo || '';
        });
    }

    // 获取宿舍入住情况接口【非饼状图】
    // getRoomStatis() {
    //     this.roomService.queryRoomStatis().then((res) => {
    //         if (res.Data && res.Data.Items) {
    //             res.Data.Items.forEach(element => {
    //                 this[element.type] = element.result;
    //             });
    //         }
    //     });
    // }

    // 获取总宿舍数【非饼状图】
    getWholeroom() {
        this.roomService.queryWholeroom().then((res) => {
            if (res.Data && res.Data.Items) {
                this.roomtotal = res.Data.Items[0].roomtotal;
                console.log(this.roomtotal);
            }
        });
    }

    // 获取总床位数【非饼状图】
    getWholebeds() {
        this.roomService.queryWholebeds().then((res) => {
            if (res.Data && res.Data.Items) {
                this.bedtotal = res.Data.Items[0].bedtotal;
            }
        });
    }

    // 获取已入住宿舍数（男）【非饼状图】
    getManRoom() {
        this.roomService.queryManRoom().then((res) => {
            if (res.Data && res.Data.Items) {
                this.manroom = res.Data.Items[0].manroom;
            }
        });
    }

    // 获取已入住宿舍数（女）【非饼状图】
    getWomanRoom() {
        this.roomService.queryWomanRoom().then((res) => {
            if (res.Data && res.Data.Items) {
                this.womanroom = res.Data.Items[0].womanroom;
            }
        });
    }

    // 获取已入住男生人数【非饼状图】
    getManNumber() {
        this.roomService.queryManNumber().then((res) => {
            if (res.Data && res.Data.Items) {
                this.manoccupancy = res.Data.Items[0].manoccupancy;
            }
        });
    }

    // 获取已入女生人数【非饼状图】
    getWoManNumber() {
        this.roomService.queryWoManNumber().then((res) => {
            if (res.Data && res.Data.Items) {
                this.womanoccupancy = res.Data.Items[0].womanoccupancy;
            }
        });
    }

    // 获取入住率）【非饼状图】
    getWholeOccupancyRate() {
        this.roomService.queryWholeOccupancyRate().then((res) => {
            if (res.Data && res.Data.Items) {
                this.occupancyrate = res.Data.Items[0].occupancyrate;
            }
        });
    }

    // 获取总宿舍统计【饼状图】
    getAllRoomStatisPie() {
        this.allRoomChart = echarts.init(document.getElementById('allroom'), '', {
            devicePixelRatio: window.devicePixelRatio,
            renderer: 'canvas',
            width: 'auto',
            height: 'auto'
        });
        this.allRoomChart.showLoading();
        this.roomService.allRoomStatisPie().then((res) => {
            if (res.Data && res.Data.Items) {
                const data = [];
                res.Data.Items.forEach(element => {
                    if (element.type === 'occupancy') {
                        data.push({
                            value: element.result,
                            name: '已入住宿舍'
                        });
                    } else {
                        data.push({
                            value: element.result,
                            name: '空闲宿舍'
                        });
                    }
                });
                this.allRoomPie(data);
            }
        });
    }
    // 总宿舍统计
    allRoomPie(roomdata: any) {
        const options = {
            baseOption: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                color: ['#0B81DE', '#8AE6F5'],
                legend: {
                    orient: 'vertical',
                    // right: '10px',
                    top: 'middle',
                    // textStyle: {
                    //     fontSize: 13
                    // },
                    data: ['已入住宿舍', '空闲宿舍'],
                    formatter: function (name) {
                        let value = '';
                        roomdata.forEach(element => {
                            if (element.name === name) {
                                value = name + '\n' + element.value + '间'
                            }
                        });
                        return value;
                    }
                },
                series: [
                    {
                        name: '总宿舍统计',
                        type: 'pie',
                        hoverAnimation: true,
                        hoverOffset: 3,
                        // center: ['30%', '55%'],
                        radius: ['60%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: roomdata
                    }
                ]
            },
            media: [ // 这里定义了 media query 的逐条规则。
                {
                    query: {
                        maxWidth: 270,
                    },   // 这里写规则。
                    option: {       // 这里写此规则满足下的option。
                        legend: {
                            right: 5,
                            top: 'middle',
                            textStyle: {
                                fontSize: 11
                            }
                        },
                        series: [
                            {
                                center: ['25%', '50%'],
                                radius: ['60%', '80%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        minWidth: 270,
                        maxWidth: 360,
                    },   // 第二个规则。
                    option: {       // 第二个规则对应的option。
                        legend: {
                            right: '5%',
                            top: 'middle',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        series: [
                            {
                                center: ['30%', '50%'],
                                radius: ['65%', '80%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        minWidth: 360,
                    },   // 第二个规则。
                    option: {       // 第二个规则对应的option。
                        legend: {
                            right: '10%',
                            top: 'middle',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        series: [
                            {
                                center: ['35%', '50%'],
                                radius: ['65%', '80%']
                            }
                        ]
                    }
                }
            ]
        };
        // this.allRoomChart = echarts.init(document.getElementById('allroom'), '', {
        //     devicePixelRatio: window.devicePixelRatio,
        //     renderer: 'canvas',
        //     width: 'auto',
        //     height: 'auto'
        // });
        this.allRoomChart.hideLoading();
        this.allRoomChart.setOption(options);
        this.allRoomChart.on('click', (params) => {
            let type = '';
            // params.name === '已入住宿舍' ? type = 'hasPeopleRoom' : type = 'noPeopleRoom';
            // this.router.navigate(['/roomstatis/search'], { queryParams: { type: type } });
            if (params.name === '已入住宿舍') {
                type = 'hasPeopleRoom';
                this.router.navigate(['/roomstatis/search'], { queryParams: { type: type, sex: 'whole' } });
            } else {
                type = 'noPeopleRoom';
                this.router.navigate(['/roomstatis/search'], { queryParams: { type: type } });
            }
        });
    }

    // 空床宿舍统计【饼状图】
    getEmptyBedRoomStatisPie() {
        this.emptyBedRoomChart = echarts.init(document.getElementById('emptyBedRoom'), '', {
            devicePixelRatio: window.devicePixelRatio,
            renderer: 'canvas',
            width: 'auto',
            height: 'auto'
        });
        this.emptyBedRoomChart.showLoading();
        this.roomService.emptyBedRoomStatisPie().then((res) => {
            if (res.Data && res.Data.Items) {
                const data = [];
                res.Data.Items.forEach(element => {
                    if (element.type === 'man') {
                        data.push({
                            value: element.result,
                            name: '空床宿舍(男)'
                        });
                    } else {
                        data.push({
                            value: element.result,
                            name: '空床宿舍(女)'
                        });
                    }
                });
                this.emptyBedRoomPie(data);
            }
        });
    }
    // 空床宿舍
    emptyBedRoomPie(roomdata: any) {
        const option = {
            baseOption: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                color: ['#FC2F58', '#FDBA83'],
                legend: {
                    orient: 'vertical',
                    right: '10px',
                    top: 'middle',
                    textStyle: {
                        fontSize: 13
                    },
                    data: ['空床宿舍(男)', '空床宿舍(女)'],
                    formatter: function (name) {
                        let value = '';
                        roomdata.forEach(element => {
                            if (element.name === name) {
                                value = name + '\n' + element.value + '间'
                            }
                        });
                        return value;
                    }
                },
                series: [
                    {
                        name: '空床宿舍统计',
                        type: 'pie',
                        hoverAnimation: true,
                        hoverOffset: 3,
                        center: ['30%', '55%'],
                        radius: ['60%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: roomdata
                    }
                ]
            },
            media: [ // 这里定义了 media query 的逐条规则。
                {
                    query: {
                        maxWidth: 270,
                    },   // 这里写规则。
                    option: {       // 这里写此规则满足下的option。
                        legend: {
                            right: 0,
                            top: 'middle',
                            textStyle: {
                                fontSize: 11
                            }
                        },
                        series: [
                            {
                                center: ['25%', '50%'],
                                radius: ['60%', '80%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        minWidth: 270,
                        maxWidth: 360,
                    },   // 第二个规则。
                    option: {       // 第二个规则对应的option。
                        legend: {
                            right: '5px',
                            top: 'middle',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        series: [
                            {
                                center: ['30%', '50%'],
                                radius: ['65%', '80%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        minWidth: 360,
                    },   // 第二个规则。
                    option: {       // 第二个规则对应的option。
                        legend: {
                            right: '10%',
                            top: 'middle',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        series: [
                            {
                                center: ['35%', '50%'],
                                radius: ['65%', '80%']
                            }
                        ]
                    }
                }
            ]
        };
        // this.emptyBedRoomChart = echarts.init(document.getElementById('emptyBedRoom'), '', {
        //     devicePixelRatio: window.devicePixelRatio,
        //     renderer: 'canvas',
        //     width: 'auto',
        //     height: 'auto'
        // });
        this.emptyBedRoomChart.hideLoading();
        this.emptyBedRoomChart.setOption(option);
        this.emptyBedRoomChart.on('click', (params) => {
            let sex = '';
            params.name === '空床宿舍(男)' ? sex = '0030001' : sex = '0030002';
            this.router.navigate(['/roomstatis/search'], { queryParams: { type: 'emptybedRoom', sex: sex } });
        });
    }
    // 空闲床位统计【饼状图】
    getEmptyBedStatisPie() {
        this.emptyBedChart = echarts.init(document.getElementById('emptyBed'), '', {
            devicePixelRatio: window.devicePixelRatio,
            renderer: 'canvas',
            width: 'auto',
            height: 'auto'
        });
        this.emptyBedChart.showLoading();
        this.roomService.emptyBedStatisPie().then((res) => {
            if (res.Data && res.Data.Items) {
                const data = [];
                res.Data.Items.forEach(element => {
                    if (element.type === 'emptybedroom') {
                        data.push({
                            value: element.result,
                            name: '空床宿舍'
                        });
                    } else {
                        data.push({
                            value: element.result,
                            name: '空闲宿舍'
                        });
                    }
                });
                this.emptyBedPie(data);
            }
        });
    }
    // 空闲床位
    emptyBedPie(roomdata: any) {
        const option = {
            baseOption: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                color: ['#F7A935', '#ACED6B'],
                legend: {
                    orient: 'vertical',
                    right: '10px',
                    top: 'middle',
                    textStyle: {
                        fontSize: 13
                    },
                    data: ['空闲宿舍', '空床宿舍'],
                    formatter: function (name) {
                        let value = '';
                        roomdata.forEach(element => {
                            if (element.name === name) {
                                value = name + '\n' + element.value + '张'
                            }
                        });
                        return value;
                    }
                },
                series: [
                    {
                        name: '空闲床位统计',
                        type: 'pie',
                        hoverAnimation: true,
                        hoverOffset: 3,
                        center: ['30%', '55%'],
                        radius: ['60%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: roomdata
                    }
                ]
            },
            media: [ // 这里定义了 media query 的逐条规则。
                {
                    query: {
                        maxWidth: 270,
                    },   // 这里写规则。
                    option: {       // 这里写此规则满足下的option。
                        legend: {
                            right: 0,
                            top: 'middle',
                            textStyle: {
                                fontSize: 11
                            }
                        },
                        series: [
                            {
                                center: ['25%', '50%'],
                                radius: ['60%', '80%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        minWidth: 270,
                        maxWidth: 360,
                    },   // 第二个规则。
                    option: {       // 第二个规则对应的option。
                        legend: {
                            right: '5%',
                            top: 'middle',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        series: [
                            {
                                center: ['30%', '50%'],
                                radius: ['65%', '80%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        minWidth: 360,
                    },   // 第二个规则。
                    option: {       // 第二个规则对应的option。
                        legend: {
                            right: '10%',
                            top: 'middle',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        series: [
                            {
                                center: ['35%', '50%'],
                                radius: ['65%', '80%']
                            }
                        ]
                    }
                }
            ]
        };
        // this.emptyBedChart = echarts.init(document.getElementById('emptyBed'), '', {
        //     devicePixelRatio: window.devicePixelRatio,
        //     renderer: 'canvas',
        //     width: 'auto',
        //     height: 'auto'
        // });
        this.emptyBedChart.hideLoading();
        this.emptyBedChart.setOption(option);
        this.emptyBedChart.on('click', (params) => {
            if (params.name === '空床宿舍') {
                this.router.navigate(['/roomstatis/search'], { queryParams: { type: 'emptybedRoom', sex: 'whole' } });
            }
            else {
                this.router.navigate(['/roomstatis/search'], { queryParams: { type: 'noPeopleRoom' } });
            }
        });
    }
    // 空床宿舍床位统计【饼状图】
    getEmptyRoomBedStatisPie() {
        this.emptyRoomBedChart = echarts.init(document.getElementById('emptyRoomBed'), '', {
            devicePixelRatio: window.devicePixelRatio,
            renderer: 'canvas',
            width: 'auto',
            height: 'auto'
        });
        this.emptyRoomBedChart.showLoading();
        this.roomService.emptyRoomBedStatisPie().then((res) => {
            if (res.Data && res.Data.Items) {
                const data = [];
                res.Data.Items.forEach(element => {
                    if (element.type === 'man') {
                        data.push({
                            value: element.result,
                            name: '空床宿舍(男)'
                        });
                    } else {
                        data.push({
                            value: element.result,
                            name: '空床宿舍(女)'
                        });
                    }
                });
                this.emptyRoomBedPie(data);
            }
        });
    }
    // 空床宿舍床位
    emptyRoomBedPie(roomdata: any) {
        const option = {
            baseOption: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                color: ['#8001DE', '#DD02FD'],
                legend: {
                    orient: 'vertical',
                    right: '10px',
                    top: 'middle',
                    textStyle: {
                        fontSize: 13
                    },
                    data: ['空床宿舍(男)', '空床宿舍(女)'],
                    formatter: function (name) {
                        let value = '';
                        roomdata.forEach(element => {
                            if (element.name === name) {
                                value = name + '\n' + element.value + '张'
                            }
                        });
                        return value;
                    }
                },
                series: [
                    {
                        name: '空床宿舍床位统计',
                        type: 'pie',
                        hoverAnimation: true,
                        hoverOffset: 3,
                        center: ['30%', '55%'],
                        radius: ['60%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: roomdata
                    }
                ]
            },
            media: [ // 这里定义了 media query 的逐条规则。
                {
                    query: {
                        maxWidth: 270,
                    },   // 这里写规则。
                    option: {       // 这里写此规则满足下的option。
                        legend: {
                            right: 0,
                            top: 'middle',
                            textStyle: {
                                fontSize: 11
                            }
                        },
                        series: [
                            {
                                center: ['25%', '50%'],
                                radius: ['60%', '80%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        minWidth: 270,
                        maxWidth: 360,
                    },   // 第二个规则。
                    option: {       // 第二个规则对应的option。
                        legend: {
                            right: '5px',
                            top: 'middle',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        series: [
                            {
                                center: ['30%', '50%'],
                                radius: ['65%', '80%']
                            }
                        ]
                    }
                },
                {
                    query: {
                        minWidth: 360,
                    },   // 第二个规则。
                    option: {       // 第二个规则对应的option。
                        legend: {
                            right: '10%',
                            top: 'middle',
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        series: [
                            {
                                center: ['35%', '50%'],
                                radius: ['65%', '80%']
                            }
                        ]
                    }
                }
            ]
        };
        // this.emptyRoomBedChart = echarts.init(document.getElementById('emptyRoomBed'), '', {
        //     devicePixelRatio: window.devicePixelRatio,
        //     renderer: 'canvas',
        //     width: 'auto',
        //     height: 'auto'
        // });
        this.emptyRoomBedChart.hideLoading();
        this.emptyRoomBedChart.setOption(option);
        this.emptyRoomBedChart.on('click', (params) => {
            let sex = '';
            params.name === '空床宿舍(男)' ? sex = '0030001' : sex = '0030002';
            this.router.navigate(['/roomstatis/search'], { queryParams: { type: 'emptybedRoom', sex: sex } });
        });
    }
    // 宿舍楼统计
    // this._dataSet = [
    //     {
    //         num: {
    //             value: '1',
    //             show: true
    //         },
    //         name: {
    //             value: '学院名称',
    //             show: true
    //         },
    //         sex: {
    //             value: '女',
    //             show: true
    //         },
    //         allroom: {
    //             value: '100',
    //             show: true
    //         },
    //         allbed: {
    //             value: '600',
    //             show: true
    //         },
    //     }
    // ];
    // this._dataSet = res.data;
    dormitoryStatis() {
        this.dormitoryLoading = true;
        this.roomService.dormitoryStatis(this.pageIndex, this.pageSize).then(res => {
            if (!res.data) {
                return;
            }
            const dataArr = res.data;
            const temporaryData = [];
            dataArr.forEach((currentValue, index) => {
                let obj = {};
                for (let curr in currentValue) {
                    obj[curr] = {
                        value: currentValue[curr],
                        show: true
                    };
                }
                temporaryData.push(obj);
            });
            this._dataSet = temporaryData;
            this.dormitoryLoading = false;
            this.pageIndex * 20 < res.total ? this.loadDormitoryMore = true : this.loadDormitoryMore = false;
        }).catch(() => this.dormitoryLoading = false);
    }

    // 加载更多
    loadMoreDormitory() {
        this.pageIndex++;
        this.loadDormitoryMore = false;
        this.dormitoryMoreLoading = true;
        this.roomService.dormitoryStatis(this.pageIndex, this.pageSize).then(res => {
            if (!res.data) {
                return;
            }
            const dataArr = res.data;
            const temporaryData = [];
            dataArr.forEach((currentValue, index) => {
                let obj = {};
                for (let curr in currentValue) {
                    obj[curr] = {
                        value: currentValue[curr],
                        show: true
                    };
                    const allChecked = this.checkOptions.every(value => value.checked === true);
                    const allUnChecked = this.checkOptions.every(value => value.checked === false);
                    if (allChecked || allUnChecked) {

                    } else {
                        this.checkOptions.forEach(element => {
                            if (curr === element.value) {
                                obj[curr].show = element.checked;
                            }
                        });
                    }
                }
                temporaryData.push(obj);
            });
            this._dataSet = [...this._dataSet, ...temporaryData];
            this.pageIndex * 20 < res.total ? this.loadDormitoryMore = true : this.msgsrv.info('已加载完成', { nzDuration: 5000 });
            this.dormitoryMoreLoading = false;
        }).catch(() => this.dormitoryLoading = false);
    }

    // 展示字段筛选
    log(value: any[]): void {
        const allChecked = value.every(value => value.checked === true);
        const allUnChecked = value.every(value => value.checked === false);
        this.header = [
            { label: '宿舍楼名称', name: null, value: 'dormitoryname' }
        ];
        // 全选、全部选都显示全部
        if (allChecked || allUnChecked) {

            this.header = [...this.header, ...value];
            this._dataSet.forEach((dvalue, dindex) => {
                let arrLabel = Object.entries(dvalue);
                for (let i = 0; i < arrLabel.length; i++) {
                    arrLabel[i][1].show = true;
                }
            });
            return;
        }

        value.forEach((_value, _index) => {
            if (_value.checked) {
                this.header.push(_value);
                this._dataSet.forEach((dvalue, dindex) => {
                    // debugger;
                    // let strlabel = Object.entries(dvalue)[_index][0];
                    // this._dataSet[dindex][strlabel].show = true;
                    dvalue[_value.value].show = true;
                });
            } else {
                this._dataSet.forEach((dvalue, dindex) => {
                    // let strlabel = Object.entries(dvalue)[_index][0];
                    // this._dataSet[dindex][strlabel].show = false;
                    dvalue[_value.value].show = false;
                });
            }
        });
    }

    // 排序
    sort(sortName, value) {
        console.log('sort   ' + value);
        if (!value) {
            return;
        }
        this.sortName = sortName;
        this.sortValue = value;
        this.header.forEach(element => {
            if (element.value === this.sortName) {
                element.name = this.sortValue;
            } else {
                element.name = null;
            }
        });
        this.sortMethod();
    }

    sortMethod() {
        if (this.sortName === 'Sex') {
            this._dataSet = [...this._dataSet.sort((a, b) => {
                if (a[this.sortName].value > b[this.sortName].value) {
                    return (this.sortValue === 'ascend') ? 1 : -1;
                } else if (a[this.sortName].value < b[this.sortName].value) {
                    return (this.sortValue === 'ascend') ? -1 : 1;
                } else {
                    return 0;
                }
            })];
        } else {
            this._dataSet = [...this._dataSet.sort((a, b) => {
                if (parseFloat(a[this.sortName].value) > parseFloat(b[this.sortName].value)) {
                    return (this.sortValue === 'ascend') ? 1 : -1;
                } else if (parseFloat(a[this.sortName].value) < parseFloat(b[this.sortName].value)) {
                    return (this.sortValue === 'ascend') ? -1 : 1;
                } else {
                    // return 0;
                    if (a['dormitoryname'].value > b['dormitoryname'].value) {
                        return (this.sortValue === 'ascend') ? 1 : -1;
                    } else if (a['dormitoryname'].value < b['dormitoryname'].value) {
                        return (this.sortValue === 'ascend') ? -1 : 1;
                    } else {
                        return 0;
                    }
                }
            })];
        }
    }

    // 切换学院
    tabSwitchAcademy() {
        this.tabSwitch = 1;
        if (!this.hasLoadAcademyData) {
            this.hasLoadAcademyData = true;
            this.academyStatis();
        }
    }

    // 学院统计
    academyStatis() {
        this.academyLoading = true;
        this.roomService.academyStatis(this.acPageIndex, this.acPageSize).then(res => {
            this.academyLoading = false;
            if (res.total && res.total > 0) {
                this.academyDataSet = res.data;
                this.loadAcademyMore = true;
                this.acPageIndex * 20 < res.total ? this.loadAcademyMore = true : this.loadAcademyMore = false;
            } else {
                this.academyDataSet = [];
            }
        }).catch(() => this.academyLoading = false);
    }

    // 加载更多
    loadMoreAcademy() {
        this.acPageIndex++;
        this.loadAcademyMore = false;
        this.academyMoreLoading = true;
        this.roomService.academyStatis(this.acPageIndex, this.acPageSize).then(res => {
            this.academyDataSet = [...this.academyDataSet, ...res.data];
            this.acPageIndex * 20 < res.total ? this.loadAcademyMore = true : this.msgsrv.info('已加载完成', { nzDuration: 5000 });
            this.academyMoreLoading = false;
        }).catch(() => this.academyLoading = false);
    }

    // 学院排序
    academySort(sortName, value) {
        if (!value) {
            return;
        }
        this.academySortName = sortName;
        this.academySortValue = value;
        Object.keys(this.academyHeader).forEach(key => {
            if (key !== sortName) {
                this.academyHeader[key] = null;
            } else {
                this.academyHeader[key] = value;
            }
        });
        this.academySortMethod();
    }

    academySortMethod() {
        this.academyDataSet = [...this.academyDataSet.sort((a, b) => {
            if (parseFloat(a[this.academySortName]) > parseFloat(b[this.academySortName])) {
                return (this.academySortValue === 'ascend') ? 1 : -1;
            } else if (parseFloat(a[this.academySortName]) < parseFloat(b[this.academySortName])) {
                return (this.academySortValue === 'ascend') ? -1 : 1;
            } else {
                // return 0;
                if (a['academynmae'] > b['academynmae']) {
                    return (this.sortValue === 'ascend') ? 1 : -1;
                } else if (a['academynmae'] < b['academynmae']) {
                    return (this.sortValue === 'ascend') ? -1 : 1;
                } else {
                    return 0;
                }
            }
        })];
    }

}
