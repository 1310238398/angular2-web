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
      showClose: true,
      type: "empty",
      success: '',
      fail: ()=>{}
    });
  }

  navView(ev) {
      this.navCtrl.pop();
      ev.stopPropagation();
  }

}
