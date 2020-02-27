import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
// import {ApplicationListPage} from "../applicationlist/applicationlist";

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {
  haveClass = "1";
  dataSet = [];
  url ='/api/v1/flows/launch';
  fromdata = {
        "action":"studentApply",
        "title":"评奖信息上报",
        "operator":"e4959466-08db-4dff-afb6-6fbac53103e9",
        "project":"360bec13-b663-4e5f-bbf9-cdba1f1c65ed",
        "level":"d960c28d-5bb4-4063-9b17-403202a98a88",
        "business":"30281501-6ab3-48d9-89b1-3e18f20db933",
        "time":"2018/6/20 10:20:11",
        "iamges":"a.jpg,b.jpg,c.jpg"

  };
   req = {
       'Router':this.url,
       'Method':'POST',
       'Body':{
           'flow_code':'Process_Prize',
           'form_data':JSON.stringify(this.fromdata)
       }

   };

  hiddenBox = false;

  constructor(private navCtrl: NavController, private http: HttpService, ){
      console.log("from")
      console.log(this.req)
      this.http.postJSON(this.req,ServelUrl.Url.flowUrl)
  }

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

  // //弹出申请进程
  //   NavigationToApplyList() {
  //   this.navCtrl.push('ApplicationListPage', { pagePass:'applicationlist' });
  //     // alert("123")
  // }

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
