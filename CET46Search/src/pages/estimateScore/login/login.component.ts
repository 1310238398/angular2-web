import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { NavParams, IonicPage, NavController } from "ionic-angular";
import { HttpService } from "../../../http/http.Service";

// import { DefaultData } from "../../../utility/estimateLogin";
import { resultPage } from '../result/result.component'

@Component({
    selector: 'page-login1',
    templateUrl: './login.component.html'
})

export class introduceLoginPage {
    // defaultData
    TicketName: '';
    TicketNub: '';
    Estimate: number;
    UId: string;

    constructor(private navCtrl: NavController, private http: HttpService, private params: NavParams, private HelpUtils: HelpUtils, ) {
        this.UId = window["__UserID"];

    }
    ionViewDidEnter() {
        // ionViewDidEnter() {
        antlinker.configTitle({
            type: "label",
            title: '四六级估分',
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
    }
  
    getFocus(){
        setTimeout(function () {
            let pannel = document.getElementById("ipt1");
            pannel.scrollIntoView(true)
        }, 200);
    }
      getFocus1(){
      
        let _this = this;
        setTimeout(function () {
            let pannel = document.getElementById("ipt2");
            // let pannel = document.getElementById("cont")
            pannel.scrollIntoView(true)
        }, 200);
    }
      getFocus2(){
       
        let _this = this;
        setTimeout(function () {
            let pannel = document.getElementById("ipt3");
            // let pannel = document.getElementById("cont")
            pannel.scrollIntoView(true)
        }, 200);
    }
    
    query(): void {
        if (!this.TicketName) {
            this.HelpUtils.toastPop('请输入姓名');
            return;

        }
        if (!this.TicketNub) {
            this.HelpUtils.toastPop('请输入准考证号');
            return;

        }
        if (!this.Estimate) {
            this.HelpUtils.toastPop('请输入预估分数');
            return;
        }
        if (this.Estimate < 10 || this.Estimate > 710) {
            this.HelpUtils.toastPop('预估分数为10-710分');
            return;
        }
        this.http.postJSON({
            Router: ServelUrl.Url.saveEstimateValue,
            Method: 'POST',
            Body: {
                TicketName: this.TicketName,
                TicketNub: this.TicketNub,
                Estimate: (this.Estimate).toString(),
            }
        }).then(
            comments => {
                if (comments.FeedbackCode == '1') {
                    this.HelpUtils.toastPop(comments.FeedbackText);
                    return;
                }
                else if (comments.FeedbackCode == '0') {
                    // alert(comments.Data);
                    this.UId = comments.Data
                    this.navCtrl.push(resultPage, { UId: this.UId, share: 0 });
                }
            }
            )
    }

}
