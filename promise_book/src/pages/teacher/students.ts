import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { PromiseService } from '../promise.servise';

import { StuDetailPage } from '../student/detail';

import { PromiseBook, ClassResult } from '../promise';

@Component({
    selector: 'students',
    templateUrl: 'students.html'
})
export class StudentsPage {
    stuList: ClassResult[] = [];
    pro = new PromiseBook();
    commitID = '';
    classid = '';
    classname = '';
    status = 0;
    iSNull: boolean;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private promiseServise: PromiseService,
        private toastCtrl: ToastController

    ) { }
    ionViewDidEnter(): void {
        this.commitID = this.navParams.get('commitid');
        this.classid = this.navParams.get('classid');
        this.classname = this.navParams.get('classname');
        this.status = typeof this.navParams.get('status') === 'number' ? this.navParams.get('status') : parseInt(this.navParams.get('status'), 10);
        antlinker.configTitle({
            type: "label",
            title: this.classname,
            fail: function () {

            },
            success: function () {
            }
        });

        if (this.commitID) {
            this.getPromiseOne(this.commitID);
        }
    }

    // 精确查询,得到承诺书的状态，进行中的提醒，结束的不再提醒Status,进行中的不能导出，结束的导出（0待签署 1进行中 2已结束）
    getPromiseOne(id: string): void {
        this.promiseServise.queryPromiseone(id).then(res => {
            if (res.RE === 0) {
                this.pro = res.Data;
            }
        }).then(() => {
            if (this.classid) {
                this.getClassResultList(this.commitID, this.classid, this.status);
            }
        });
    }

    // 查询班级的签署结果 签署状态(0未签署 1已签署 9全部)
    getClassResultList(commitid: string, classid: string, status: number): void {
        this.promiseServise.queryClassResult(commitid, classid, status).then(res => {
            if (res.RE === 0) {
                if (res.Data.length > 0) {
                    this.stuList = res.Data;
                } else {
                    this.stuList.length=0;
                    this.iSNull=true;
                }

            }
        });
    }

    // 导出
    export(userid: string): void {
        this.navCtrl.push(StuDetailPage, { commitid: this.commitID, userid: userid });
    }

    // 短信提醒
    remind(userid: string): void {
        this.promiseServise.remind(this.pro.CommitmentID, userid).then(res => {
            if (res.RE === 0) {
                let toast = this.toastCtrl.create({
                    message: res.Data.Desc,
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
        });
    }

}