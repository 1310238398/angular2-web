import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { HttpService } from "../../http/http.Service";
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'promisebookone',
  templateUrl: 'promisebookone.html',
})
export class PromiseBookOnePage {

  itemsSrc = '';
  nowTime = '';
  dataBt = '';
  speakText = '';//修改原因


  constructor(public navCtrl: NavController, private http: HttpService, public navParams: NavParams, public toastCtrl: ToastController, private HelpUtils: HelpUtils) {

    this.dataBt = navParams.get('bTest');

    if (this.dataBt == '1') {

      this.search();

      const Dates = new Date();
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      this.nowTime = year + '年' + month + '月' + day + '日'
    }
  }
  ionViewDidEnter() {
    // 右上角按钮
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () {

      },
      fail: function () {

      },
      trigger: function () {

      }
    });

    antlinker.configTitle({
      type: "label",
      title: "家庭经济困难认定",
      fail: function () {

      },
      success: function () {
      }
    });


  }
  //查询签名
  search() {
    this.http.postJSON({
      Router: ServelUrl.Url.getsign,
      Method: 'POST',
      Body: {
      }
    }).then(
      data => {
        this.itemsSrc = data.Data.Base64 || [];
        this.HelpUtils.toastPopTop('签名成功');
      },
      err => this.HelpUtils.toastPopTop(err));
  }

  //三项总提交
  subThree() {

    this.http.postJSON({
      Router: ServelUrl.Url.threesub,
      Method: 'POST',
      Body: {}
    }).then(
      data => {
        if (!data.FeedbackCode) {
          this.HelpUtils.toastPopTop('提交成功');
          
          const that = this;
          setTimeout(function () {
            that.navCtrl.push('IndexPage');
          }, 2000);
          
        } else {
          this.HelpUtils.toastPopTop(data.FeedbackText);
        }


      },
      err => console.log(err));
  }

  //跳转到首页
  NavtoIndex() {
    this.navCtrl.push('IndexPage');
  }

  //跳转到签名页
  goSign() {
    this.navCtrl.push('PromiseBookTwoPage');
  }


}
