import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { StatisticsSevice } from './statistics.service';


declare const Viewer: any;
declare var $: any
@Component({
    templateUrl: './list.html',
    styleUrls: ['./list.css']
})
export class ListComponent implements OnInit {
    boy = 0;
    girl = 0;
    boycloth = [];
    boyfoot = [];
    girlcloth = [];
    girlfoot = [];
    isVisible = false;
    loading = false;
    dataSet = [];
    academyData = [];
    gradeData = [];
    total: number;
    pageIndex = 1;
    pageSize = 20;
    search = {
        Academy: {
            AcademyCode: '',
            AcademyName: ''
        },
        GradeName: ''
    };
    constructor(
        private message: NzMessageService,
        private statisticsSevice: StatisticsSevice) { }
    ngOnInit() {
        this.getAcademyList();
        this.getGradeList();
    }


    // 请求违纪列表
    getStatisticsList() {
        this.loading = true;
        let academyCode = this.search.Academy ? this.search.Academy.AcademyCode : '';
        this.statisticsSevice.queryStatisticsList(academyCode, this.search.GradeName, this.pageIndex, this.pageSize).subscribe(res => {
            this.loading = false;
            if (res.Data.total && parseInt(res.Data.total, 10) > 0) {
                this.dataSet = res.Data.datas;
                this.total = parseInt(res.Data.total, 10);
               
            } else {
                this.dataSet = [];
                this.total = 0;
            }
        });
    }

    // 请求违纪列表
    getStatisticsPageChange(page) {
        console.log('page' + page);
        if (!page || page === 0 || page === this.pageIndex) {
            return;
        }
        this.pageIndex = page;
        this.getStatisticsList();
    }

    // 查询
    searchFunc() {
        this.pageIndex = 1;
        this.getStatisticsList();
    }

    // 重置
    reset() {

    }

    // 导出
    down() {
        let academyCode = this.search.Academy ? this.search.Academy.AcademyCode : '';
        this.statisticsSevice.down(academyCode, this.search.GradeName).subscribe(res => {
            if (res.Data.url) {
                window.location.href = res.Data.url;
            }
        });

    }

    // 学院列表
    getAcademyList() {
        this.statisticsSevice.queryAcademyList().subscribe(res => {
            res.Data && res.Data.length > 0 ? this.academyData = res.Data : this.academyData = [];
        });
    }

    // 年级列表
    getGradeList() {
        this.statisticsSevice.queryGradeList().subscribe(res => {
            res.Data && res.Data.length > 0 ? this.gradeData = res.Data : this.gradeData = [];
            if (this.gradeData.length > 0) {
                this.search.GradeName = this.gradeData[this.gradeData.length - 1].GradeName;
                this.getStatisticsList();
            }
        });
    }

    showModal(): void {
        let academyCode = this.search.Academy ? this.search.Academy.AcademyCode : '';
        this.statisticsSevice.queryStatisticsList(academyCode, this.search.GradeName, this.pageIndex, this.pageSize).subscribe(res => {
            if (res.Data.total && parseInt(res.Data.total, 10) > 0) {
                this.dataSet = res.Data.datas;
                this.total = parseInt(res.Data.total, 10);
                let staticData = res.Data.text;
                let cloth = staticData.cloth;
                let foot = staticData.foot;
                this.girl = 0;
                this.boy = 0;
                this.girlcloth = [];
                this.girlfoot = [];
                this.boycloth = [];
                this.boyfoot = [];
                cloth.forEach(element => {
                    if (element.SexName === '女') {
                        this.girlcloth.push(element);
                        // let girl = this.girl;
                        // let c = parseInt(element.C);
                        this.girl = this.girl + parseInt(element.C);
                    } else if (element.SexName === '男') {
                        this.boycloth.push(element);
                        // let boy = this.boy;
                        // let c = parseInt(element.C);
                        this.boy = this.boy + parseInt(element.C);
                    }
                });
                foot.forEach(element => {
                    if (element.SexName === '女') {
                        this.girlfoot.push(element);
                    } else if (element.SexName === '男') {
                        this.boyfoot.push(element);
                    }
                });
            } else {
                this.dataSet = [];
                this.total = 0;
                this.girl = 0;
                this.boy = 0;
                this.girlcloth = [];
                this.girlfoot = [];
                this.boycloth = [];
                this.boyfoot = [];
            }
            this.isVisible = true;
        });
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }
}