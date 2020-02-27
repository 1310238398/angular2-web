import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";

@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html'
})
export class ApplyPage {


  haveClass = "1";
  dataSet = []

  hiddenBox = false;

  constructor(private navCtrl: NavController, private http: HttpService, ) { }

  //初始化加载
  ionViewWillEnter() {
    // this.weekNow = this.weekSub();

      antlinker.configTitle({
          type: "label",
          title: "我的申请",
          fail: function () {

          },
          success: function () {
          }
      });
  }

  //跳转到点名页
  NavigationTo(obj) {
    this.navCtrl.push('NameListPage', { dataPass: obj,pagePass:'index' });
  }

  //弹出申请进程
    NavigationToApplyList() {
    this.navCtrl.push('ApplicationListPage', { pagePass:'applicationlist' });
      // alert("123")
  }

  NavigationToUp(){
      alert(121212)
  }

  //跳转到历史页
  NavtoChange() {
    this.navCtrl.push('HistoryRecordPage');
  }

    //打开弹窗
    openBox() {
        this.hiddenBox = true;
    }

    //关闭弹窗
    closeTab() {
        this.hiddenBox = false;
    }






}
