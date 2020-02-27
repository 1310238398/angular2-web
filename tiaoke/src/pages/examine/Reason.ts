/*
 * create by lizan 2017/02/28
 * */
import { Component } from '@angular/core';
import { NavController,NavParams,AlertController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { WaitListPage } from "./List"
@Component({
    selector: 'page-reason',
    templateUrl: './Reason.html'
})
export class ReasonPage {
    infoId;
    adjustReason;
    constructor(private navCtrl: NavController,private params: NavParams, private http: HttpService,private alertCtrl: AlertController) {
        this.infoId = params.get('rid');

    }
    submitBtn(){

        this.http.postJSON({
            Router: ServelUrl.Url.changeadjustcoursestatus,
            Method: 'POST',
            Body: {RecordId:this.infoId,Status:2,NoPassReason:this.adjustReason}
        }).then(
            comments => {
                if (comments.FeedbackCode == 0) {
                    let confirm = this.alertCtrl.create({
                        title: '提示',
                        message: '调课申请审核不通过',
                        buttons: [
                            {
                                text: '确定',
                                handler: () => {
                                    this.navCtrl.push(WaitListPage);
                                }
                            }
                        ]
                    });
                    confirm.present();
                }
            })
    }
}