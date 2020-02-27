import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Item } from "ionic-angular";
import { HelpUtils } from "../../app/utils/HelpUtils";
import { HttpService } from "../../http/http.Service";
import { ServelUrl } from "../../app/ServelUrl";



declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-process',
  templateUrl: 'process.html'
})
export class ProcessPage {
  moreData = true;
  Record = [];

  page = {
    Page: 1,
    PageSize: 10,
  };

  constructor(private navCtrl: NavController, public alertCtrl: AlertController, private HelpUtils: HelpUtils, public navParams: NavParams, private http: HttpService) {

  }
  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "学生调班",
      fail: function () { },
      success: function () { }
    });
  }

  //初始化加载
  ionViewDidEnter() {
    this.recordlist();
  }


  // 获取审批中的记录
  recordlist() {
    console.log('获取记录开始');
    this.http.postJSON({
      Router: ServelUrl.Url.recordlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.Record = res.Data.Datas;
        console.log('记录保存', this.Record);
      } else {
        console.log(res);
      }

    })

  }


  doInfinite(infiniteScroll) {
    this.http.postJSON({
      Router: ServelUrl.Url.recordlist,
      Method: 'POST',
      Body: {
        PageNum: this.page.Page++,
        PageSize: this.page.PageSize,
      }
    }).then(res => {
      if (res.Data.Datas.length && !res.FeedbackCode) {
        this.moreData = true;
        this.Record = this.Record.concat(res.Data.Datas);

      } else {
        this.moreData = false;
      }
      infiniteScroll.complete();

    })
  }
}



