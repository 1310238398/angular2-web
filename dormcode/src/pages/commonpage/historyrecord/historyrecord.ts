import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from '../../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-historyrecord',
  templateUrl: 'historyrecord.html'
})
export class HistoryRecordPage {

  dataSet = [];
  QRcode = '';

  Page: number = 1;
  moreData: boolean = true;
  PageNo: number = 20;
  loading: any;

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });

    antlinker.configTitle({
      type: "label",
      title: "绑定记录",
      fail: function () { },
      success: function () { }
    });
    this.QRcode = JSON.parse(sessionStorage.getItem('QRcode'));

  }

  //初始化加载
  ionViewDidEnter() {
    this.loadHistoryRecord();   //获取绑定记录
  }

  //获取绑定记录
  loadHistoryRecord() {
    this.http.postJSON({
      Router: ServelUrl.Url.getqrcodebindhistory,
      Method: 'POST',
      Body: {
        qrcode: this.QRcode,
        pageindex: 1,
        pagesize: this.PageNo,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.data.items;
        for (let i = 0; i < this.dataSet.length; i++) {
          if(this.dataSet[i].Status == '1'){
            this.dataSet[i]['bindTxt'] = '绑定';
          }else{
            this.dataSet[i]['bindTxt'] = '解绑';
          }
          
        }
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //下拉加载
  doInfinite(infiniteScroll) {
    this.Page++
    this.http.postJSON({
      Router: ServelUrl.Url.getqrcodebindhistory,
      Method: 'POST',
      Body: {
        qrcode: this.QRcode,
        pageindex: this.Page,
        pagesize: this.PageNo,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        if (res.Data.items.length > 0) {
          this.moreData = true;
          this.dataSet = this.dataSet.concat(res.Data.items);
        } else {
          this.moreData = false;
        }
        infiniteScroll.complete();
      } else {
        err => console.log(err)
      }
    });
  }


}
