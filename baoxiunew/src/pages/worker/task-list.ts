import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { BaoXiuService } from '../baoxiu.service';

@IonicPage()
@Component({
    selector: 'page-workertasklist',
    templateUrl: 'task-list.html'
})
export class WorkerTaskListPage {
    pageSize = 40;
    pageNum = 1;
    lastTime = 0; // 已办分页使用，最后一条处理时间戳(第一页可传递0)
    reachBottom = false;
    activeSegment = '10'; //当前选中segment
    statusQuantity = {
        waiting: 0,
        processing: 0,
        completed: 0
    };
    doneList = [] // 已完成列表
    todeDataList = [];
    proceingDataList = [];
    completedDataList = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private baoxiuService: BaoXiuService) {
        console.log('constructor');
    }

    ionViewWillEnter() {
        this.activeSegment = sessionStorage.getItem('activeStatus') || '10'
        this.pageNum = 1
        this.getFlowsTodo();
        // this.getFlowsDone();
        console.log('ionViewWillEnter');
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

        console.log('进入task-list')
        this.getQuantity()
    }

    segmentChanged(event: any) {
        console.log(`status----${event.value}`)
        this.getQuantity()
        this.pageNum = 1
        this.getRepairList()
        this.getFlowsTodo()
        sessionStorage.setItem('activeStatus', event.value);
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
                this.statusQuantity.completed = parseInt(res.Data.Status30, 10) + parseInt(res.Data.Status31, 10) + parseInt(res.Data.Status40, 10) || 0
            }
        });
    }

    // 比对日期
    compareA(type: string, i: number): boolean {
        if (i == 0) {
            return true;
        }
        switch (type) {
            case 'todo':
                // if (i === this.todeDataList.length - 1) {
                //     return false;
                // }
                if (this.todeDataList[i].launch_time === this.todeDataList[i - 1].launch_time) {
                    return false;
                } else {
                    return true;
                }
            case 'proceing':
                // if (i === this.proceingDataList.length - 1) {
                //     return false;
                // }
                if (this.proceingDataList[i].launch_time === this.proceingDataList[i - 1].launch_time) {
                    return false;
                } else {
                    return true;
                }
            default:
                // if (i === this.doneList.length - 1) {
                //     return false;
                // }
                let newDate1 = new Date()
                newDate1.setTime(this.doneList[i].CreateTime * 1000)

                let newDate2 = new Date()
                newDate2.setTime(this.doneList[i - 1].CreateTime * 1000)
                if (newDate1.getFullYear() + newDate1.getMonth() + newDate1.getDate() == newDate2.getFullYear() + newDate2.getMonth() + newDate2.getDate()) {
                    return false;
                } else {
                    return true;
                }
        }
    }

    // 待办列表
    getFlowsTodo() {
        this.baoxiuService.flowsToDoList().then(res => {
            this.todeDataList = [];
            this.proceingDataList = [];
            if (res && res.length > 0) {
                res.forEach((value, index) => {
                    if (value.node_code === 'Status10') {
                        value.input_data = JSON.parse(value.input_data);
                        this.todeDataList.push(value);
                    } else if (value.node_code === 'Receive' || value.node_code === 'Designate' || value.node_code === 'Rework') {
                        value.input_data = JSON.parse(value.input_data);
                        this.proceingDataList.push(value);
                    }
                })
                console.log(this.todeDataList)
                console.log(this.proceingDataList)
                this.statusQuantity.waiting = this.todeDataList.length;
                this.statusQuantity.processing = this.proceingDataList.length;
            }
        })
    }

    // 已办列表 (工作流的接口现在无法实现需求，暂时不用这种方式)
    // getFlowsDone() {
    //     this.baoxiuService.flowsDoneList(this.lastTime, '40').then(res => {
    //         if (res && res.length > 0) {
    //             res.forEach((value, index) => {
    //                 value.out_data = JSON.parse(value.out_data);
    //                 this.completedDataList.push(value);
    //                 if (index === res.length - 1) {
    //                     this.lastTime = value.process_time;
    //                 }
    //             });
    //             this.statusQuantity.completed = this.completedDataList.length;
    //         } else {
    //             this.completedDataList = [];
    //         }
    //     });
    // }

    // 滚动
    doInfinite(infiniteScroll) {
        this.baoxiuService.queryRepairList(this.pageNum, this.pageSize, this.activeSegment).then(res => {
            if (res.Data.Datas) {
                this.doneList = this.doneList.concat(res.Data.Datas)
                this.pageNum++
            }
            infiniteScroll.complete();
            if (!res || (this.doneList.length < this.pageSize)) {
                infiniteScroll.enable(false)
                this.reachBottom = true
            }
        })
    }

    // 获取报修任务列表
    getRepairList(): void {
        this.baoxiuService.queryRepairList(this.pageNum, this.pageSize, this.activeSegment).then(
            res => {
                if (res.Data.Datas) {
                    this.doneList = res.Data.Datas
                    this.pageNum++
                } else {
                    this.doneList = []
                }
            }
        );
    }

    navigate(id: string) {
        this.navCtrl.push('detail-page', {
            recordid: id,
            // flowinstanceid: data.flow_instance_id,
            // serialnumber: data.input_data.SerialNumber
        });
    }
}
