import { Component } from '@angular/core';
import { IonicPage, NavParams } from "ionic-angular";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'personalapply_detail',
  templateUrl: 'personalapply_detail.html'
})
export class PersonalApplyDetailPage {

  dataOrigin = {
    status:''
  }
  dataSet = {}


  constructor(public navParams: NavParams, ) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () {},
      fail: function () {},
      trigger: function () {}
    });
  }
  //初始化加载
  ionViewDidEnter() {
    this.dataOrigin = this.navParams.get('dataPass');

    this.dataSet = this.navParams.get('dataPass').input_data;

    console.log(this.dataOrigin)
    console.log(this.dataSet)


  }













}
