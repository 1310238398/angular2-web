import {Component} from "@angular/core";
import {HttpService} from "../../../http/http.Service";
import {ServelUrl} from "../../../app/ServelUrl";
import {NavParams} from "ionic-angular";
/**
 * Created by hanzhendong on 2017/3/17.
 */
@Component({
  selector: "page-LotteryDetail",
  templateUrl: "./lotterydetailpage.html"
})
export class LotteryDetailPage {
  private Status;
  private Lottery = {
    Number: '',
    Category:''

  }

  constructor(private httpService: HttpService,private params: NavParams) {
    this.Status=this.params.get('Status');

    this.httpService.postJSON(ServelUrl.Url.getNum, {}).then(
      data => {
        if (!data.FeedbackCode) {
          this.Lottery.Category=data.Data.Category||'';
          this.Lottery.Number=data.Data.Number||'';
        }
      });
  }
}
