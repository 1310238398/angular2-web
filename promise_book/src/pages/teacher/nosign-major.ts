import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PromiseService } from '../promise.servise';

import { NoSignClassPage } from './nosign-class';

import { SignResult } from '../promise';

@Component({
    selector: 'nosign-major',
    templateUrl: 'nosign-major.html'
})
export class NoSignMajorPage {
    commitmentID = '';
    academyID = '';
    academyName = '';
    signResultList: SignResult[] = [];
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private promiseServise: PromiseService) { }

    ionViewDidEnter(): void {
        this.commitmentID = this.navParams.get('commitid');
        this.academyID = this.navParams.get('academyid');
        this.academyName = this.navParams.get('academyname');

        antlinker.configTitle({
            type: "label",
            title: this.academyName,
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

        if (this.commitmentID && this.academyID) {
            this.getNoSchoolWorkersResult(this.commitmentID, 1, this.academyID);
        }
    }

    // 查询非辅导员的签署结果
    getNoSchoolWorkersResult(id: string, type: number, deptid: string): void {
        this.promiseServise.queryNoSchWorkersResult(id, type, deptid).then(res => {
            if (res.RE === 0) {
                this.signResultList = res.Data;
            }
        });
    }

    goToClass(res: SignResult): void {
        this.navCtrl.push(NoSignClassPage, { commitid: this.commitmentID, majorid: res.DeptID, majorname: res.DeptName });
    }

}