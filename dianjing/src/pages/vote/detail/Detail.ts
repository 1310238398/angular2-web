/*
 * create by lizan 2017/02/28
 * */
import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from "ionic-angular";

@Component({
  selector: 'detail-page',
  templateUrl: './detail.html'
})
export class DetailPage {
  items;
  index;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private params: NavParams) {
    this.items = params.get('items');
    this.index = params.get('index');
  }

  ionViewWillEnter() {
  }
  navView(){
    this.navCtrl.pop()
  }
}
