import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {LoginPage} from '../login/LoginPage';
/**
 * Created by developer on 2017/3/15.
 */
@Component({
  selector: 'page-shuoming',
  templateUrl: './shuoming.html'
})
export class ShuomingPage {

  constructor(private navCtrl: NavController) {
  }

  onLogin() {
    this.navCtrl.push(LoginPage);
  }
}
