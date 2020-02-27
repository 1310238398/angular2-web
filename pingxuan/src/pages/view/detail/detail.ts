/*
 * create by hanzhendong 2017/10/17
 * */
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-list-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  Photos;
  index;

  constructor(private navCtrl: NavController, private param: NavParams) {
    this.Photos = this.param.get('Photos');
    this.index = this.param.get('index');
  }

  ionViewWillEnter() {

  }

  navView() {
    this.navCtrl.pop()
  }
}
