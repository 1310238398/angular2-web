import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";

@IonicPage()
@Component({
  selector: 'page-applyfrom',
  templateUrl: 'applyfrom.html'
})
export class ApplyFromPage {


  haveClass = "1";
  dataSet = []

  hiddenBox = false;

  constructor(private navCtrl: NavController, private http: HttpService, ) { }

  //初始化加载
  ionViewWillEnter() {
    // this.weekNow = this.weekSub();
  }

  //跳转到点名页
  NavigationTo(obj) {
    this.navCtrl.push('NameListPage', { dataPass: obj,pagePass:'index' });
  }

  //弹出申请进程
  NavigationToUp(obj) {
    // this.navCtrl.push('NameListPage', { dataPass: obj,pagePass:'index' });
      alert("123")
  }

  //跳转到历史页
  NavtoChange() {
    this.navCtrl.push('HistoryRecordPage');
  }

    //打开日期框
    openBox() {
        this.hiddenBox = true;
    }

    //关闭日期框
    closeTab() {
        this.hiddenBox = false;
    }

  dataTime() {
    const Dates = new Date();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return month + '-' + day
  }




}
