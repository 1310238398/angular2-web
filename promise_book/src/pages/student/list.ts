import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PromiseService } from '../promise.servise';

import { StuDetailPage } from './detail';

import { PromiseBookMy } from '../promise';

@Component({
    selector: 'stu-list',
    templateUrl: 'list.html'
})
export class StuListPage {
    queryType = '0';
    count = 7;
    commitmentID = '';
    proList: PromiseBookMy[] = [];
    reachBottom = false; //判断是否滑动到底部
    iSNull: boolean;
    currentYear = new Date().getFullYear().toString();

    constructor(public navCtrl: NavController, public promiseServise: PromiseService, public ref: ChangeDetectorRef) {

    }
    // 初始化
    ionViewDidEnter(): void {
        console.log("StuListPage ionViewWillEnter")
        antlinker.configTitle({
            type: "label",
            title: "承诺书",
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configTitleButton({
            type: 'back',
            text: '关闭',
            fail: function () {

            },
            success: function () {
            },
            trigger: function () {
            }
        });
        // antlinker.configNavigationButton({
        //     type: ['more'],
        //     moreOption: ["refresh"],
        //     success: function () {
        //         //设置右上角按钮成功
        //     },
        //     fail: function () {
        //         // 设置右上角按钮失败
        //     },
        //     trigger: function () {
        //         //点击标题时调用
        //     }
        // });
        this.getPromisesList();
    }

    // promise列表
    getPromisesList(): void {
        this.promiseServise.queryPromiseMy().then(res => {
            console.log(res);
            if (res.RE === 0 && res.Data && res.Data.length > 0) {
                this.iSNull = false;
                this.proList = res.Data;
                this.commitmentID = res.Data[res.Data.length - 1].CommitmentID;
            } else if (res.RE === 0 && res.Data && res.Data.length === 0) {
                this.proList = [];
                this.iSNull = true;
            }
        });
    }

    // 滚动
    // doInfinite(infiniteScroll) {
    //     this.promiseServise.queryPromiseMy(this.count, this.commitmentID).then(res => {
    //         if (res.RE === 0 && res.Data && res.Data.length > 0) {
    //             [this.proList,...res.Data];
    //             this.commitmentID = res.Data[res.Data.length - 1].CommitmentID;
    //         }
    //         if (res.RE === 0 && res.Data.length < 20) {
    //             infiniteScroll.enable(false);
    //             this.reachBottom = true;
    //         }
    //         infiniteScroll.complete();
    //     });
    // }

    // 比对年份
    compareA(i: number): boolean {
        console.log(this.currentYear)
        if (i == 0) {
            if (this.proList[i].CreateTime.substring(0, 4) !== this.currentYear) {
                return true;
            } else {
                return false;
            }
        }
        if (this.proList[i].CreateTime.substring(0, 4) === this.proList[i - 1].CreateTime.substring(0, 4)) {
            return false;
        } else {
            return true;
        }
    }

    // 详情页
    goToDetail(id: string): void {
        this.navCtrl.push(StuDetailPage, { commitid: id });
    }
}
