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
      duration: 1200,
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

  modal(page, data) {
    let modal = this.modalCtrl.create(page, data);
    modal.present();
    return modal;
  }


  /**
   *
   * @param result
   * @param quality
   * @returns {string}
   */
  compress(result, quality) {
    var img = document.createElement('img');
    var maxsize = 200 * 1024;
    img.src = result;
    //    用于压缩图片的canvas
    var canvas = document.createElement("canvas");
    var width = img.width;
    var height = img.height;
    var context = canvas.getContext('2d');

    // draw image params
    var sx = 0;
    var sy = 0;
    var sWidth = width;
    var sHeight = height;
    var dx = 0;
    var dy = 0;
    var dWidth = width;
    var dHeight = height;
    var quality = quality;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    if (result.length <= maxsize) {
      quality = 0.92;
    }
    var dataUrl = canvas.toDataURL('image/jpeg', quality);

    return dataUrl;
  }

  base64toBlob(dataUrl) {
    var byteString;
    if (dataUrl.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataUrl.split(',')[1]);
    else
      byteString = unescape(dataUrl.split(',')[1]);

    // separate out the mime component
    var mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }
}
