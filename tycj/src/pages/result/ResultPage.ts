import {HttpService} from './../../http/http.Service';
import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {ShuomingPage} from '../shuoming/Shuoming';
import {ServelUrl} from "../../app/ServelUrl";
/**
 * Created by developer on 2017/3/15.
 */
@Component({
  selector: 'page-result',
  templateUrl: './resultpage.html'
})
export class ResultPage {
  private results: Array<any>;

  constructor(private navCtrl: NavController, private httpService: HttpService) {
    this.httpService.postJSON(ServelUrl.Url.queryDetials, {}).then(
      data => {
        if (!data.FeedbackCode) {
          this.results = data.Data || [];
        }
      });
  }

  onShuoming() {
    this.navCtrl.push(ShuomingPage);
  }
}
