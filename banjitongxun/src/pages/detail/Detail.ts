/**
 * Created by hanzhendong on 2016/11/29.
 */
import { Component } from '@angular/core';
import { HttpService } from "../../http/http.Service";
import { ToastController, NavParams } from 'ionic-angular';
import { HelpUtils } from "../../app/utils/HelpUtils";
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {
    item: any;
    listitems: any = [];
    ClassCode = '';
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
        private http: HttpService, public navCtrl: NavController) {
        // this.item = params.data.chat;
        this.ClassCode = this.params.get('ClassCode');
        console.log(this.ClassCode);

        this.http.postJSON({
            Router: ServelUrl.Url.TelPageList,
            Method: 'POST',
            Body: { ClassCode: this.ClassCode || '' }
        }).then(
            comments => {
                if (comments.Data) {
                    this.listitems = comments.Data || [];
                }
            },
            err => console.log(err));

        /*、
         * 调用jssdk
         *
         * */
        antlinker.configTitle({
            type: "label",
            title: '通讯录',
            fail: function () {

            },
            success: function () {
            }
        });
        antlinker.configTitleButton({
            type: 'back',
            text: '关闭',
            fail: function () {

            },
            success: function () {
            },
            trigger: function () {
            }

        });
    }
     ionViewDidEnter() {}
    ionViewCanLeave() {
        // alert('ggggg');
        //   console.log("ggggg");

        antlinker.closeView({
            success: function () {
                // console.log('success');
            },
            fail: function () {

            },

        });
    }
    callPhone(params) {
        console.log(params);
        this.HelpUtils.callUp(params);
    }


    showToast(position: string, mes: string) {
        let toast = this.toastCtrl.create({
            message: mes,
            duration: 2000,
            cssClass: 'zj-toast',
            position: position
        });

        toast.present(toast);
    }

    isArray(val): boolean {
        return val instanceof Array;
    }
    onDetailPage() {
        this.HelpUtils.presentAlert({
            subTitle: `数据来源于校园集结号绑定的手机号码，可通过在设置中修改绑定手机同步到通讯录中。`,
            buttons: [{
                text: '我知道了', role: 'cancel', handler: () => {

                }
            }]
        });
    }
}
