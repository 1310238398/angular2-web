import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the PreviewPage page.
 *
 */
declare  var antlinker;
@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

  items = [];
  mark:boolean=false;
  waterMarks = [];
  indexInit = 0;
  time;

  constructor(private DomS: DomSanitizer, private navCtrl: NavController, private params: NavParams) {
    this.items = this.params.get('items');
    this.time = this.params.get('time');
    console.log(this.items);
    this.indexInit = this.params.get('index');
  }


  ionViewWillEnter() {
    /*、
     * 调用jssdk
     *
     * */
    antlinker.configTitle({
      type: "label",
      title: '预览',
      fail: ()=>{},
      success: ''
    });
    antlinker.configTitleButton({
      showClose: false,
      type: "label",
      success: '',
      fail: ()=>{}
    });
  }

  getDataURL(item) {

    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.font = "24px PingFangSC-Regular";
        ctx.fillStyle = "rgba(255, 0, 0,0.5)";
        ctx.fillText(`拍摄时间：${item.AttachmentTime}`, canvas.width - 260, canvas.height - 20);
        resolve({url: canvas.toDataURL('image/jpeg')});
      };
      img.src = item.AttachmentUrl;
      img.onerror = function () {
        reject(new Error('Could not load image at ' + item.url));
      };

    })
  }

  navView(ev) {
    //if (ev.target.tagName != "IMG") {
      this.navCtrl.pop();
      ev.stopPropagation();
   // }
  }

}
