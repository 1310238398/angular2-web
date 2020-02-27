import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { PromiseService } from '../promise.servise';

import { StuListPage } from './list';
import { StuSignPage } from './sign';

import { PromiseBookMy } from '../promise';

@Component({
    selector: 'stu-detail',
    templateUrl: 'detail.html'
})
export class StuDetailPage {
    @ViewChild(Navbar) navBar: Navbar;
    pro = new PromiseBookMy();
    year = '';
    month = '';
    day = '';
    writtenYear = '';
    writtenMonth = '';
    writtenDay = '';
    userID = '';
    back: boolean;
    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private toastCtrl: ToastController,
        private promiseServise: PromiseService) { }

    ionViewDidEnter(): void {
        this.pro.CommitmentID = this.navParams.get('commitid');
        this.userID = this.navParams.get('userid');
        this.back = this.navParams.get('back');
        if (this.pro.CommitmentID) {
            this.getPromiseOne(this.pro.CommitmentID, this.userID);
        }
    }

    // 精确查询
    getPromiseOne(id: string, userid: string): void {
        this.promiseServise.queryPromiseUserOne(id, userid).then(res => {
            if (res.RE === 0) {
                antlinker.configTitle({
                    type: "label",
                    title: res.Data.Title,
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


                this.pro = res.Data;
                if (this.pro.WrittenTime) {
                    this.writtenYear = this.pro.WrittenTime.substring(0, 4);
                    this.writtenMonth = this.pro.WrittenTime.substring(4, 6);
                    this.writtenDay = this.pro.WrittenTime.substring(6, 8);
                }
                if (this.pro.SignTime) {
                    this.year = this.pro.SignTime.substring(0, 4);
                    this.month = this.pro.SignTime.substring(4, 6);
                    this.day = this.pro.SignTime.substring(6, 8);
                }
                if (this.back && this.pro.SignLink) {
                    setTimeout(() => {
                        let toast = this.toastCtrl.create({
                            message: '签署成功',
                            duration: 3000,
                            position: 'bottom'
                        });
                        toast.present();
                    }, 1);
                }
            }
        });
    }

    export(): void {
        // 获取用户的基本信息
        if (!this.userID) {
            var that = this;
            antlinker.getUserBasicInfo({
                fail: function () {

                },
                success: function (res) {
                    that.share(res.UserID);
                }
            });
        } else {
            this.share(this.userID);
        }
    }

    share(userid: string): void {
        if (this.pro.CommitmentID && userid) {
            this.promiseServise.export(this.pro.CommitmentID, userid).then(res => {
                antlinker.sharePlatform({
                    option: ['qq', 'wechat'],
                    shareContent: {
                        title: res.Data.Desc, // 分享标题
                        desc: '', // 分享描述
                        link: res.Data.DownLink, // 分享链接
                        imgUrl: '../../assets/img/pdf.png',
                        id: `${userid}_${this.pro.CommitmentID}`, // id
                        type: 'commitment', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                    },
                    success: function () {
                        //设置右上角按钮成功
                    },
                    fail: function () {
                        // 设置右上角按钮失败
                    }
                })
            });
        }
    }

    // 签署
    goSign(): void {
        this.promiseServise.queryPromiseUserOne(this.pro.CommitmentID).then(res => {
            if (res.RE === 0) {
                if (res.Data.Status === 0) {
                    this.pro.Status = 0;
                    let toast = this.toastCtrl.create({
                        message: '签署时间已截止',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                } else {
                    this.navCtrl.push(StuSignPage, { commitid: this.pro.CommitmentID });
                }
            }

        });

    }

    // leave
    ionViewWillLeave() {
        // debugger;
        //this.navCtrl.remove(2);
        // this.navBar.backButtonClick = (e: UIEvent) => {
        //     //Write here wherever you wanna do
        //     console.log('back to list');
        //     this.navCtrl.push(StuListPage)
        // }
        // if (this.navParams.get('back')) {
        //     this.navCtrl.push(StuListPage)
        // }
        if (this.back) {
            this.navCtrl.push(StuListPage)
        }

    }

}