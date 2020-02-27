import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PromiseService } from '../promise.servise';

import { StudentsPage } from './students';

import { SignResult } from '../promise';

@Component({
    selector: 'nosign-class',
    templateUrl: 'nosign-class.html'
})
export class NoSignClassPage {
    commitmentID = '';
    majorID = '';
    majorName = '';
    signResultList: SignResult[] = [];
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private promiseServise: PromiseService) { }

    ngOnInit(): void {
        this.commitmentID = this.navParams.get('commitid');
        this.majorID = this.navParams.get('majorid');
        this.majorName = this.navParams.get('majorname');
        if (this.commitmentID && this.majorID) {
            this.getNoSchoolWorkersResult(this.commitmentID, 2, this.majorID);
        }
    }

    ionViewDidEnter(): void {
        antlinker.configTitle({
            type: "label",
            title: this.majorName,
            fail: function () {

            },
            success: function () {
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
    }

    // 查询非辅导员的签署结果
    getNoSchoolWorkersResult(id: string, type: number, deptid: string): void {
        this.promiseServise.queryNoSchWorkersResult(id, type, deptid).then(res => {
            if (res.RE === 0) {
                this.signResultList = res.Data;
            }
        });
    }

    goToStudents(res: SignResult): void {
        this.navCtrl.push(StudentsPage, { commitid: this.commitmentID, classid: res.DeptID, classname: res.DeptName, status: 0 });
    }

}