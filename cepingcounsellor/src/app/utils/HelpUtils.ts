import {Injectable} from "@angular/core";
import {ModalController, AlertController, LoadingController, ToastController} from "ionic-angular";
import {unescape} from "querystring";

declare var moment;

@Injectable()
export class HelpUtils {
  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, private Loading: LoadingController, private toastCtrl: ToastController) {
  }

  /*
   * callup
   * */
  alert(msg) {
    let alert = this.alertCtrl.create({
      title: `提示`,
      subTitle: msg,
      buttons: [
        {
          text: '确定'
        }
      ]
    });
    alert.present();
  }

  loadingPop(text) {
    let loading = this.Loading.create({
      content: text
    });
    loading.present();
    return loading;
  }

  toastPop(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      cssClass: 'zj-t-center',
      position: 'middle'
    });
    toast.present();
    return toast;
  }

  toastPopTop(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1200,
      cssClass: 'zj-t-center',
      position: 'top'
    });
    toast.present();
    return toast;
  }

  presentAlert(message) {
    console.log(message.enableBackdropDismiss);
    let alert = this.alertCtrl.create({
      title: message.title || '',
      enableBackdropDismiss: message.enableBackdropDismiss,
      subTitle: message.subTitle || '',
      buttons: message.buttons || []
    });
    alert.present();
    return alert;
  }




}
