import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

declare var antlinker;
@IonicPage()
@Component({
  selector: 'help',
  templateUrl: 'help.html',
})
export class HelpPage {


  constructor(public navCtrl: NavController) {}

  ionViewWillEnter() {
    // 右上角按钮
    var that = this;
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () {

      },
      fail: function () {

      },
      trigger: function () {

      }
    });
  }
  // goSign(){
  //   this.navCtrl.push('PromiseBookTwoPage');
  // }


}
