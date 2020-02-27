import { Component } from '@angular/core';
import { IonicPage, NavParams } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-notcount',
  templateUrl: 'notcount.html'
})
export class NotCountPage {
  total = '';
  classcode = '';
  dataSet = [];
  mengGo = true;

  constructor(private http: HttpService, public navParams: NavParams) { }

  //初始化加载
  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
    this.classcode = this.navParams.get('classcode');
  }

  //初始化加载
  ionViewDidEnter() {
    this.loadAcademicList();
  }

  //获取班级未统计数据
  loadAcademicList() {
    this.http.postJSON({
      Router: ServelUrl.Url.getnostatistics,
      Method: 'POST',
      Body: {
        classcode: this.classcode
      }
    }).then(res => {
      this.mengGo = false;
      if (!res.FeedbackCode) {
        this.total = res.data.total
        this.dataSet = res.data.items;
      }
    },
      err => console.log(err));
  }

}
