import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../../http/http.Service";


import { introduceLoginPage } from '../login/login.component';
import { resultPage } from "../result/result.component";

const now = new Date();
@IonicPage()
@Component({
    selector: 'page-introduce',
    templateUrl: './introduce.component.html'
})

export class introducePage {
    activityTime;
    constructor(private navCtrl: NavController, private http: HttpService, private params: NavParams, private HelpUtils: HelpUtils, ) {

    }

    ionViewDidEnter() {

        this.http.postJSON({
            Router: ServelUrl.Url.isestimate,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                // this.activityTime = comments.Data.OpenTime || [];
                console.log(comments.FeedbackCode)
                if (comments.FeedbackCode == 0) {
                    this.navCtrl.push(resultPage, { UId: comments.Data.ID, close: true });
                }

            });


        antlinker.configTitle({
            type: "label",
            title: '四六级估分',
            fail: function () {

            },
            success: function () {
            }
        });

        antlinker.configNavigationButton({
            type: ['more'],
            option: ["refresh"],
            buttonTitle: '更多',
            moreOption: ["refresh"],
            success: function () {
                // alert('success被调用');
                //设置右上角按钮成功
            },
            fail: function () {
                // alert('fail被调用');
                // 设置右上角按钮失败
            },
        });
        this.initializeItems();
    }

    initializeItems() {
        this.http.postJSON({
            Router: ServelUrl.Url.estimateTime,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                this.activityTime = comments.Data.OpenTime || [];
            });
    }
    navTo(): void {
        this.navCtrl.push(introduceLoginPage);

    }

}

