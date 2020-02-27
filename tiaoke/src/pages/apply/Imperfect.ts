import { Component } from '@angular/core';
import { NavController,AlertController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { ListPage } from "./List";
@Component({
    selector: 'page-imperfect',
    templateUrl: './Imperfect.html'
})
export class ImperfectPage {
    constructor(private navCtrl: NavController, private http: HttpService,private alertCtrl: AlertController) {
        antlinker.configTitle({
            type: "label",
            title: "调课",
            fail: function () {

            },
            success: function () {
            }
        });
    }

    addImperfectBtn(){
        console.log("提交调课申请");
        let confirm = this.alertCtrl.create({
            title: '提示',
            message: '信息确认无误并提交调课申请?',
            buttons: [
                {
                    text: '我再看看'
                },
                {
                    text: '确定',
                    handler: () => {
                        this.navCtrl.push(ListPage);
                    }
                }
            ]
        });
        confirm.present();
    }
}
