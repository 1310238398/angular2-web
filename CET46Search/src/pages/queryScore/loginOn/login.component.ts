import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../../http/http.Service";
import { CETData } from "../../../utility/queryScore";

import { waitingPage } from '../waiting/waiting.component'

@Component({
    selector: 'page-login',
    templateUrl: './login.component.html'
})
export class loginPage {
    //证件号 姓名
    TicketName = '';
    TicketNub = '';
    Estimate = '';
    TicketName1 = '';
    TicketNub1 = '';
    Estimate1 = '';
    ID=  '';
    private loadingPop;


    constructor(private navCtrl: NavController, private http: HttpService, private params: NavParams, private HelpUtils: HelpUtils) { }
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


        this.http.postJSON({
            Router: ServelUrl.Url.getDefaultData,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    this.TicketName = comments.Data[0].TicketName || [];
                    this.TicketNub = comments.Data[0].TicketNub || [];
                }
            }
            )
        // this.search();
    }


    getFocus1() {
        let _this = this;
        setTimeout(function () {
            let pannel = document.getElementById("ipt_1");
            pannel.scrollIntoView(true)
        }, 200);
    }
    getFocus2() {
        let _this = this;
        setTimeout(function () {
            let pannel = document.getElementById("ipt_2");
            pannel.scrollIntoView(true)
        }, 200);
    }
    //查询
    login() {
        this.loadingPop = this.HelpUtils.loadingPop();
        this.http.postJSON({  
            Router: ServelUrl.Url.queryScore,
            Method: "POST",
            Body: {
                TicketName: this.TicketName,
                TicketNub: this.TicketNub,
            }
        }).then(
            comments => {
                this.loadingPop.dismiss();
                if (comments.FeedbackCode == 0) {
                    this.ID = comments.Data.ID;       
                    this.navCtrl.push(waitingPage, { id: this.ID });
                } else if (comments.FeedbackCode == 1) {
                    this.HelpUtils.toastPop(comments.FeedbackText);
                }
            }
            )
        const name = this.TicketName;
        let id = this.TicketNub;
    }

}