import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import {ApplicationListPage} from "../applicationlist/applicationlist";

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {


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

  //跳转到我要审批
  NavigationToApproved() {
    this.navCtrl.push('ApprovedPage', { pagePass:'approved' });
  }

  //跳转待我要申请
    NavigationToApply() {
    this.navCtrl.push('ApplyPage', { pagePass:'apply' });
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
