import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../../http/http.Service";
import { loginPage } from "../loginOn/login.component"
import { Observable } from 'rxjs/Rx';

import { scorePage } from '../score/score.component';
import { CETData } from "../../../utility/queryScore";

@Component({
    selector: 'page-waiting',
    templateUrl: './waiting.component.html'
})
export class waitingPage {
    objData1 = {
        IsSuccess: CETData, //是否胜利 1胜利 2失败
        Name: CETData,        //姓名
        CetType: CETData,   //准考证号
        EstimateScore: CETData,
        RealScore: CETData,
        HearScore: CETData,
        ReadScore: CETData,
        ComplexScore: CETData,
        WriteScore: CETData,
        IsOutside: CETData,
        RankText: CETData,
        IsWin: CETData,
        WinText: CETData,
    };
    id:'';

    count = 5;
    constructor(private navCtrl: NavController, private http: Http, private params: NavParams, private HelpUtils: HelpUtils) {
        this.id = this.params.get('id');

        const interval = setInterval(() => {
            this.count--;
            if (this.count == 1) {
                clearInterval(interval);
                // this.navCtrl.push(scorePage, { data: JSON.stringify(this.objData1) });
                this.navCtrl.push(scorePage, { data: this.id,share:0});
                console.log(this.id)
            }
        }, 1000);

    }

    ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '四六级查询',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configNavigationButton({
            type: ['more', 'close'],
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
    }
}



