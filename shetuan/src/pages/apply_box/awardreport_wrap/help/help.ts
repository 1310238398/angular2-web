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
