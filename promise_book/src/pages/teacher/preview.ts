import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PromiseService } from '../promise.servise';

import { PromiseListPage } from './promise-list';
// import { NewPage } from './new';


import { PromiseBook } from '../promise';

@Component({
    selector: 'preview',
    templateUrl: 'preview.html'
})
export class PreviewPage {
    promiseBook = new PromiseBook();
    year = '';
    month = '';
    day = '';
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private promiseServise: PromiseService
    ) { }

    ionViewDidEnter(): void {
        this.promiseBook = this.navParams.get('book');
        antlinker.configTitle({
            type: "label",
            title: this.promiseBook.Title,
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

        if (this.promiseBook.WrittenTime) {
            this.year = this.promiseBook.WrittenTime.substring(0, 4);
            this.month = this.promiseBook.WrittenTime.substring(4, 6);
            this.day = this.promiseBook.WrittenTime.substring(6, 8);
        }
    }

    // leave
    ionViewWillLeave() {
        // debugger;
        //this.navCtrl.remove(2);
        localStorage.setItem("commits", JSON.stringify(this.promiseBook));
        // this.navCtrl.popTo(NewPage);
    }

    // 使用
    use(): void {
        this.promiseServise.addPromise(this.promiseBook).then(res => {
            if (res.RE === 0) {
                localStorage.removeItem('commits');
                // this.navCtrl.first();
                this.navCtrl.setRoot(PromiseListPage);
                // this.navCtrl.push(PromiseListPage);
            }
        });
    }

}