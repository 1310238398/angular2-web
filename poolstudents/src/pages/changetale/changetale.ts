import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var antlinker;
@IonicPage()
@Component({
  selector: 'changetale',
  templateUrl: 'changetale.html',
})
export class ChangeTalePage {

  values = 300;
  numdisb = true;
  filetext = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils) { }

  ionViewWillEnter() {
    // 右上角按钮
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
      title: "家庭经济困难认定",
      fail: function () { },
      success: function () { }
    });
  }

  ionViewDidEnter() {
    this.loadChange()
  }

  //进入页面获取修改原因
  loadChange() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetModifyReason,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          if (comments.Data != null && comments.Data.ModifyReason != '') {
            this.filetext = comments.Data.ModifyReason || [];
            this.txtChange(this.filetext);
          }
        }
      });
  }

  //备注框字数变化
  txtChange(value: string) {
    var valueTxt = value.trim();
    this.values = 300 - valueTxt.length;
    if (this.values != 300) {
      this.numdisb = false;
    } else {
      this.numdisb = true;
    }
  }

  //查询数据
  setcokie() {
    this.http.postJSON({
      Router: ServelUrl.Url.SaveModifyReason,
      Method: 'POST',
      Body: {
        ModifyReason: this.filetext
      }
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.HelpUtils.toastPopTop('提交成功');
          const that = this;
          setTimeout(function () {
            that.navCtrl.push('IndexPage');
          }, '2000');
        } else {
          this.HelpUtils.toastPopTop(comments.FeedbackText);
        }
      });
  }




}
