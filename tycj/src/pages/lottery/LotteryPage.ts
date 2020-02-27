import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {LotteryDetailPage} from "./detail/LotteryDetailPage";
import {HttpService} from "../../http/http.Service";
import {ServelUrl} from "../../app/ServelUrl";
@Component({
  selector: 'page-lottery',
  templateUrl: './lotterypage.html'
})
export class LotteryPage {
  private Atext: Number=0;
  private Btext: Number=0;
  private Ctext: Number=0;
  private Timer;
  private Flag:boolean=true;
  private num;

  constructor(private navCtl: NavController,private httpService: HttpService) {
  }

  changeNum() {
    this.Atext = Math.floor(Math.random() * 10);
    this.Btext = Math.floor(Math.random() * 10);
    this.Ctext = Math.floor(Math.random() * 10);
  }

  start() {
    this.httpService.postJSON(ServelUrl.Url.getNum, {}).then(
      data => {
        if (!data.FeedbackCode) {
          this.num=data.Data.Number;
        }
      });
    clearInterval(this.Timer);
    this.Timer = setInterval(() => {
      this.changeNum()
    }, 50);
  }

  stop() {
    this.Flag=false;
    this.start();
    setTimeout(() => {
      clearInterval(this.Timer);
      this.Atext=this.num.slice(0,1)||'';
      this.Btext=this.num.slice(1,2)||'';
      this.Ctext=this.num.slice(2,3)||'';
      this.navCtl.push(LotteryDetailPage);
    }, 3000)

  }
}
