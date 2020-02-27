import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'speak',
  templateUrl: 'speak.html',
})
export class SpeakPage {

  items = {};
  text = '';
  exChange = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () {},
      fail: function () {},
      trigger: function () {}
    });
    antlinker.configTitle({
      type: "label",
      title: "家庭经济困难认定",
      fail: function () {},
      success: function () {}
    });
    this.exChange = this.navParams.get('exChange');
    console.log(this.exChange)
  }

  NavtoTwo() {
    window.history.back();
    //this.navCtrl.push('UploadingTwoPage', { exChange: this.exChange });
  }


}
