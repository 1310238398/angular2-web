/**
 * Created by hanzhendong on 2016/12/13.
 */
import {Injectable} from "@angular/core";
import {AlertController, LoadingController, ToastController} from "ionic-angular";
import {unescape} from "querystring";

@Injectable()
export class HelpUtils {
    constructor(private alertCtrl: AlertController, private Loading: LoadingController, private toastCtrl: ToastController) {
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

    presentAlert(message) {
        let alert = this.alertCtrl.create({
            title: message.title || '',
            subTitle: message.subTitle || '',
            buttons: message.buttons || []
        });
        alert.present();
        return alert;
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
            duration: 3000,
            cssClass: 'zj-t-center',
            position: 'middle'
        });
        toast.present();
        return toast;
    }

    /**
     *
     * @param result
     * @param quality
     * @returns {string}
     */
    compress1(img, quality, Orientation) {
        //    用于压缩图片的canvas
        var canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        var base64 = null;
        if (Orientation != "" && Orientation != 1 && Orientation != undefined) {
            var width = img.naturalWidth;
            var height = img.naturalHeight;
            switch (Orientation) {
                case 6://需要顺时针90度旋转
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 8://需要逆时针90度旋转
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(-90 * Math.PI / 180);
                    ctx.drawImage(img, -width, 0);
                    break;
                case 3://需要180度旋转
                    ctx.rotate(180 * Math.PI / 180);
                    ctx.drawImage(img, -width, -height);
                    break;
            }
        }
        var dataUrl = canvas.toDataURL('image/jpeg', quality);

        return dataUrl;
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

//获取照片的元信息（拍摄方向）
    getPhotoOrientation(img) {
        var orient;
        console.log(img)
        EXIF.getData(img, function () {
            EXIF.getAllTags(this);
            orient = EXIF.getTag(this, 'Orientation');
        });
        return orient;
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
