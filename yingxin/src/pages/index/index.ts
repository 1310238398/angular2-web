/**
 * Created by hanzhendong on 2017/6/22.
 */
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HttpService} from "../../http/http.Service";
import {ServelUrl} from "../../app/ServelUrl";
import {TaskPage} from "../task/task";
import {OldBoy} from "../oldboy/oldboy";

@Component({
    selector: 'page-index',
    templateUrl: 'index.html'
})
export class Index {
    Content = '';

    constructor(private httpService: HttpService, private navCtl: NavController) {
        antlinker.configTitle({
            type: "label",
            title: '迎新',
            fail: function () {

            },
            success: function () {
            }
        });
          this.httpService.postJSON({
            Router: ServelUrl.Url.content,
            Method: 'POST',
            Body: {}
          }).then(res => {
            this.Content=res.Data.Content;
          });
    }

    ionViewWillEnter() {

    }

    onStart() {
        console.log('btm')
        /*初始化*/
        this.httpService.postJSON({
            Router: ServelUrl.Url.init,
            Method: 'POST',
            Body: {}
        }).then(res => {
        });
        /*检查状态*/
        this.httpService.postJSON({
            Router: ServelUrl.Url.check,
            Method: 'POST',
            Body: {}
        }).then(res => {
            if (res.Data.IsNew) {
                this.navCtl.push(TaskPage)
            } else {
                this.navCtl.push(OldBoy)
            }
        });
        //this.navCtl.push('OldBoy');
    }
}
