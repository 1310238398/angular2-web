import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { BaoXiuService } from '../baoxiu.service';

import { PersonalTaskNum } from '../baoxiu';

@IonicPage()
@Component({
    selector: 'page-managertasklist',
    templateUrl: 'manager-task-list.html'
})
export class ManagerTaskListPage {
    usercode = '';
    pageSize = 40;
    pageNum = 1;
    reachBottom = false;
    activeSegment = '10';
    repairPersonArr = [];
    waitTaskList = [];
    workerList = [];
    workerTaskList = [];
    statusQuantity = {
        waiting: '',
        processing: '',
        completed: ''
    };
    infiniteScroll: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private baoxiuService: BaoXiuService) {
        this.pageNum = 1;
        this.statusQuantity = {
            waiting: '',
            processing: '',
            completed: ''
        };
        console.log('constructor');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter');
        this.reachBottom = false;
        if (this.infiniteScroll) {
            this.infiniteScroll.enable(true);
        }
        this.activeSegment = sessionStorage.getItem('activeStatus') || '10'
        this.pageNum = 1
        this.getQuantity();
        this.getTask('allwait');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad IndexPage');
    }

    ionViewDidEnter() {
        antlinker.configTitleButton({
            type: 'close',
            text: '关闭',
            fail: function () {

            },
            success: function () {

            },
            trigger: function () {
            }
        });
    }

    // 获取三个状态任务数量
    // Status10 	string 	待处理任务数量
    // Status20 	string 	处理中任务数量
    // Status21 	string 	返工中任务数量
    // Status30 	string 	维修完成任务数量
    // Status31 	string 	无需处理任务数量
    // Status40 	string 	已关闭任务数量
    getQuantity(): void {
        this.baoxiuService.queryRepairQuantity().then(res => {
            if (res.Data) {
                this.statusQuantity.waiting = res.Data.Status10 || '0';
                let status20 = res.Data.Status20 || '0'
                let status21 = res.Data.Status21 || '0'
                this.statusQuantity.processing = (parseInt(status20, 10) + parseInt(status21, 10)).toString() || '0'
                let status30 = res.Data.Status30 || '0'
                let status31 = res.Data.Status31 || '0'
                let status40 = res.Data.Status40 || '0'
                this.statusQuantity.completed = (parseInt(status30, 10) + parseInt(status31, 10) + parseInt(status40, 10)).toString() || '0'
            }
        })
    }

    // segment change
    segmentChanged(event: any) {
        console.log(`status----${event.value}`);
        this.pageNum = 1;
        if (event.value === '10') {
            this.usercode = '';
            this.getTask('allwait');
        } else {
            this.getPersonnelTaskNumber();
        }
        this.getQuantity()
        sessionStorage.setItem('activeStatus', event.value);
    }

    // 比对时间
    compareA(i: number): boolean {
        if (i == 0) {
            return true;
        }
        // if (i === this.waitTaskList.length - 1) {
        //     return false;
        // }
        if (moment.unix(parseInt(this.waitTaskList[i].CreateTime, 10)).format('YYYY-MM-DD') === moment.unix(parseInt(this.waitTaskList[i - 1].CreateTime, 10)).format('YYYY-MM-DD')) {
            return false;
        } else {
            return true;
        }
    }

    // 获取待处理任务列表
    // mark  allwait所有的待处理，self工人自己的任务
    getTask(mark: string): void {
        this.baoxiuService.queryRepairList(this.pageNum, this.pageSize, this.activeSegment, this.usercode).then(res => {
            if (res.Data.Datas) {
                this.pageNum++
                if (mark === 'allwait') {
                    this.waitTaskList = res.Data.Datas;
                } else {
                    this.workerTaskList = res.Data.Datas;
                }
            } else {
                if (mark === 'allwait') {
                    this.waitTaskList = [];
                } else {
                    this.workerTaskList = [];
                }
            }
        }
        );
    }

    // 待办列表
    getFlowsTodo() {
        this.baoxiuService.flowsToDoList().then();
    }

    // 滚动
    doInfinite(infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        this.baoxiuService.queryRepairList(this.pageNum, this.pageSize, this.activeSegment, this.usercode).then(res => {
            if (res.Data.Datas && res.Data.Datas.length > 0) {
                // [this.promiseList, ...res.Data.Datas];
                this.waitTaskList = this.waitTaskList.concat(res.Data.Datas);
                this.pageNum++
            }
            infiniteScroll.complete();
            if (res.Data.Datas && res.Data.Datas.length < this.pageSize) {
                infiniteScroll.enable(false);
                this.reachBottom = true;
            }

        });
    }

    doInfiniteIng(infiniteScroll) {
        this.baoxiuService.queryRepairList(this.pageNum, this.pageSize, this.activeSegment, this.usercode).then(res => {
            if (res.Data.Datas && res.Data.Datas.length > 0) {
                // [this.promiseList, ...res.Data.Datas];
                this.workerTaskList = this.workerTaskList.concat(res.Data.Datas);
                this.pageNum++
            }
            infiniteScroll.complete();
            if (res.Data.Datas && res.Data.Datas.length < this.pageSize) {
                infiniteScroll.enable(false);
                this.reachBottom = true;
            }

        });
    }

    doInfiniteOver(infiniteScroll) {
        this.baoxiuService.queryRepairList(this.pageNum, this.pageSize, this.activeSegment, this.usercode).then(res => {
            if (res.Data.Datas && res.Data.Datas.length > 0) {
                // [this.promiseList, ...res.Data.Datas];
                this.workerTaskList = this.workerTaskList.concat(res.Data.Datas);
                this.pageNum++
            }
            infiniteScroll.complete();
            if (res.Data.Datas && res.Data.Datas.length < this.pageSize) {
                infiniteScroll.enable(false);
                this.reachBottom = true;
            }

        });
    }

    // 获取各维修人员任务数量
    getPersonnelTaskNumber(): void {
        this.baoxiuService.queryPersonnelTaskNumber(this.activeSegment).then(res => {
            if (res.Data) {
                this.workerList = res.Data;
                this.workerList.forEach((value, index) => {
                    this.workerList[index].show = false;
                });
            }
        }
        )
    }

    // 显示、隐藏工人任务
    showWorkTask(worker: PersonalTaskNum): void {
        let show = worker.show

        // 隐藏所有的工人任务列表
        for (let i = 0, len = this.workerList.length; i < len; i++) {
            this.workerList[i].show = false
        }

        // 显示或隐藏当前点击的工人任务列表
        worker.show = !show
        if (show) {
            return
        }

        this.usercode = worker.RepairPersonnelUID;
        this.pageNum = 1
        // this.getTask('self');
        this.baoxiuService.queryRepairList(this.pageNum, this.pageSize, this.activeSegment, this.usercode).then(res => {
            worker.show = !show
            this.workerTaskList = res.Data.Datas || []
            this.pageNum++;
        }
        )
    }

    navigate(recordid: string) {
        this.navCtrl.push('manager-task-detail', {
            recordid: recordid
        });
    }


}