import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PromiseService } from '../promise.servise';

import { NoSignMajorPage } from './nosign-major';

import {SignResult } from '../promise';

@Component({
    selector: 'nosign-academy',
    templateUrl: 'nosign-academy.html'
})
export class NoSignAcademyPage {
    commitmentID = '';
    signResultList: SignResult[] = [];
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private promiseServise: PromiseService) { }

    ngOnInit(): void {
        this.commitmentID = this.navParams.get('commitid');
        if (this.commitmentID) {
            this.getNoSchoolWorkersResult(this.commitmentID, 0);
        }
    }

    ionViewDidEnter(): void {
        antlinker.configTitle({
            type: "label",
            title: "未签署",
            fail: function () {
      
            },
            success: function () {
            }
          });
        //   antlinker.configNavigationButton({
        //     type: ['more'],
        //     moreOption: ["refresh"],
        //     success: function () {
        //       //设置右上角按钮成功
        //     },
        //     fail: function () {
        //       // 设置右上角按钮失败
        //     },
        //     trigger: function () {
        //       //点击标题时调用
        //     }
        //   });
    }

    // 查询非辅导员的签署结果
    getNoSchoolWorkersResult(id: string, type: number): void {
        this.promiseServise.queryNoSchWorkersResult(id, type).then(res => {
            if (res.RE === 0) {
                this.signResultList = res.Data;
                console.log(JSON.stringify(this.signResultList));
            }
        });
    }

    goToMajor(res: SignResult): void {
        this.navCtrl.push(NoSignMajorPage, { commitid: this.commitmentID, academyid: res.DeptID,academyname: res.DeptName });
    }

}