import { CetApply } from './../pages/cet/CetApply';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from "ionic-angular";
import { HttpService } from "../http/http.Service";
import { ServelUrl } from "./ServelUrl";
import { CetDetail } from "../pages/cet/detail/CetDetail";
import { HelpUtils } from "./utils/HelpUtils";

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;

    constructor(private HelpUtils: HelpUtils, private http: HttpService, public platform: Platform) {
        this.http.postJSON({
            Router: ServelUrl.Url.checkstudentcetsignupstatus,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    if (comments.Data != 3) {
                        this.nav.setRoot(CetDetail, {CetStatus: comments.Data})

                    } else {
                        this.nav.setRoot(CetApply)
                    }
                }
            });
       //document.getElementById('spinnerw').style.display = 'none';
    /*    this.HelpUtils.presentAlert({
            title: '特别注意',
            subTitle: `本次报名仅用于四六级考试报名系统的测试，系统会在3月10号下午17：00关闭报名入口，同时清除在此期间的报名数据，如有报考四六级需求的学生，请在接到正式报名通知后务必再次登录系统进行信息填报工作，谢谢！`,
            buttons: [{
                text: '我知道了', role: 'cancel'
            }]
        })*/
    }
}
