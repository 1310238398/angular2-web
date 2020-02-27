import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { PromiseService } from '../promise.servise';
import { PromiseBook, ClassResult } from '../promise';

@Component({
    selector: 'no-sign',
    templateUrl: 'no-sign.html'
})
export class NoSignPage {
    stuList: ClassResult[] = [];
    pro = new PromiseBook();
    iSNull: boolean;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private promiseServise: PromiseService,
        private toastCtrl: ToastController
    ) { }
    ngOnInit(): void {
        const commitID = this.navParams.get('commitid');
        if (commitID) {
            this.getPromiseOne(commitID);
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

    // 精确查询,得到承诺书的状态，进行中的提醒，结束的不再提醒Status（0待签署 1进行中 2已结束）
    getPromiseOne(id: string): void {
        this.promiseServise.queryPromiseone(id).then(res => {
            if (res.RE === 0) {
                this.pro = res.Data;
            }
        }).then(() => {
            this.getNoSignResultList(this.pro.CommitmentID);
        });
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

    // 查询辅导员未签署结果
    getNoSignResultList(commitid: string): void {
        this.promiseServise.queryNoSignResult(commitid).then(res => {
            if (res.RE === 0) {
                if (res.Data.length > 0) {
                    this.stuList = res.Data;
                } else {
                    this.stuList.length = 0;
                    this.iSNull = true;
                }

            }
        });
    }

}