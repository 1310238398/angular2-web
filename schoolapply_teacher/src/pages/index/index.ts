import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {

  constructor(private navCtrl: NavController) { }
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "校园申请",
      fail: function () { },
      success: function () { }
    });
  }


  //进入申请页
  gotoMyapply() {
    this.navCtrl.push('IndexApplyPage');
  }

  //进入审批页
  gotoMyapprove() {
    this.navCtrl.push('IndexApprovePage');
  }
}



