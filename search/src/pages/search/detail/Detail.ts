/**
 * Created by hanzhendong on 2016/11/29.
 */
import { Component } from '@angular/core';
import { HttpService } from "../../../http/http.Service";
import { ToastController, NavParams } from 'ionic-angular';
import { HelpUtils } from "../../../app/utils/HelpUtils";
import { NavController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {
    item: any;
    listitems: any = [];
bigImage: boolean = false;
Url;
    constructor(private params: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils,
        private http: HttpService, public navCtrl: NavController) {
        this.item = params.data.chat;
     /*   if (this.item.IntelUserCode === '') {
            err => console.log(err);
        } else {

        }*/
        if(this.item.IntelUserCode)(
          this.http.postJSON({
            Router: ServelUrl.Url.getCounselorname,
            Method: 'POST',
            Body: {
              IntelUserCode: this.item.IntelUserCode
            }
          }).then(
            comments => {
              this.listitems = comments.Data || [];
            }
          )
        )
        /*、
         * 调用jssdk
         *
         * */
        let title: string = '';
        if (this.item.Name === '') {
            err => console.log(err);
        } else  {
            title = this.item.Name;
        }
        antlinker.configTitle({
            type: "label",
            title: title,
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
    }

    callUp(params) {
        this.HelpUtils.callUp(params)
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
    picBig(item) {

    }
    isArray(val): boolean {
        return val instanceof Array;
    }
     isUrl(val): boolean {
         var urlR ="[http]{4}\\:?";
         var url= val.match(urlR);
        return url;
    }
    //点击放大图片
shouBigImage(imageName) {
   this.Url = imageName;
    this.bigImage = true;
}
 //隐藏大图
hideBigImage() {
    this.bigImage = false;
}
}
