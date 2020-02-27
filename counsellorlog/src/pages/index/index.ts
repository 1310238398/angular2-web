import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {

  dataSet = [];
  Page = 1;
  moreData = true;
  PageNo = '20';
  loading: any;
  total = 0;

  constructor(private navCtrl: NavController, private http: HttpService, public navParams: NavParams) { }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "工作日志",
      fail: function () { },
      success: function () { }
    });

  }

  ngAfterViewInit() {
    this.initItems();
  }

  //进入页面刷新数据
  initItems() {
    this.http.postJSON({
      Router: ServelUrl.Url.counsellorLogList,
      Method: 'POST',
      Body: {
        Page: '1',
        Count: this.PageNo,
        LogTitle: '',
        RecordType: '',
        CreatStartTime: '',
        CreatEndTime: '',
        ReleaseStatus: '',
        PublishStartTime: '',
        PublishEndTime: '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        if (res.Data != null) {
          this.dataSet = res.Data.Data;
          for (let i = 0; i < this.dataSet.length; i++) {
            this.dataSet[i].InsertDatetime = this.dataSet[i].InsertDatetime.substring(0, 10)
            this.dataSet[i].PublishDatetime = this.dataSet[i].PublishDatetime.substring(0, 10)
          }
        } else {
          this.dataSet = []
        }
      }
    });
  }

  //下拉加载
  doInfinite(infiniteScroll) {
    this.Page++
    this.http.postJSON({
      Router: ServelUrl.Url.counsellorLogList,
      Method: 'POST',
      Body: {
        Page: this.Page.toString(),
        Count: this.PageNo,
        LogTitle: '',
        RecordType: '',
        CreatStartTime: '',
        CreatEndTime: '',
        ReleaseStatus: '',
        PublishStartTime: '',
        PublishEndTime: '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        if (res.Data != null && res.Data.Data.length > 0) {
          this.moreData = true;
          this.dataSet = this.dataSet.concat(res.Data.Data);
          for (let i = 0; i < this.dataSet.length; i++) {
            this.dataSet[i].InsertDatetime = this.dataSet[i].InsertDatetime.substring(0, 10)
            this.dataSet[i].PublishDatetime = this.dataSet[i].PublishDatetime.substring(0, 10)
          }
        } else {
          this.moreData = false;
        }
        infiniteScroll.complete();
      } else {
        err => console.log(err)
      }
    });
  }

  //跳转创建页
  creatLog() {
    this.navCtrl.push('CreatTaskPage');
  }

  //跳转到点名页
  NavigationTo(obj) {
    this.navCtrl.push('LogDetailPage', { contInfo: obj });
  }


}
