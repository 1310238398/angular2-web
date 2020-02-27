/**
 * Created by hanzhendong on 2016/12/13.
 */
import { Injectable } from "@angular/core";
import { AlertController, LoadingController,ToastController } from "ionic-angular";

@Injectable()
export class HelpUtils {
    constructor(private alertCtrl: AlertController, private Loading: LoadingController,private toastCtrl:ToastController) {
    }

    /*
     * callup
     * */
    callUp(data) {
        antlinker.onTel(
            {
                tel: data.Phone,
                text: data.Name,
                success: function () {

                }
            }
        );
        /*   let alert = this.alertCtrl.create({
         title: `确认拨打：${data.Name}`,
         subTitle: data.Phone,
         buttons: [
         {
         text: '取消',
         cssClass: 'zj-alert-close'
         },
         {
         text: '确定',
         handler: () => {
         antlinker.onTel(
         {
         tel: data.Phone,
         success: function () {

         }
         }
         );
         //console.log(data.Phone);
         }
         }
         ]
         });
         alert.present();*/
    }

    loadingPop() {
        let loading = this.Loading.create({
            content: '玩命检索中...'
        });
        loading.present();
        return loading;
    }
     toastPop(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            cssClass: 'zj-t-center',
            position: 'middle'
        });
        toast.present();
        return toast;
    }
}
