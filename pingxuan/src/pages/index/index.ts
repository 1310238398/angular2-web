/*
 * create by hanzhendong 2017/00/28
 * */
import { Component } from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";
@IonicPage()
@Component({
    selector: 'page-index',
    templateUrl: 'index.html'
})
export class IndexPage {
  constructor(private navCtrl: NavController) {
  }
  toUrl(){
    this.navCtrl.push('ListPage');
  }
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "十佳班主任评选",
      fail: function () {

      },
      success: function () {
      }
    });

    antlinker.configTitleButton({
      type: 'back',
      text: '',
      fail: function () {

      },
      success: function () {
      },
      trigger: function () {
      }

    });
  }
}
