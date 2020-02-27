/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ServelUrl} from "../../app/ServelUrl";
import {HelpUtils} from "../../app/utils/HelpUtils";
import {HttpService} from "../../http/http.Service";
import {NavController} from "ionic-angular";
@Component({
  selector: 'page-chuxing',
  templateUrl: 'chuxing.html'
})
export class ChuxingPage {
  items: Array<any> = [];

  constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService) {

  }

  ionViewDidEnter() {
    antlinker.configTitle({
      type: "label",
      title: '出行',
      fail: function () {

      }
    });
    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () {

      },
      success: function () {
      },
      trigger: function () {
      }

    });
    this.initializeItems();
  }

  initializeItems(value = '') {
    this.http.postJSON({
      Router: ServelUrl.Url.getList,
      Method: 'POST',
      Body: {
        Type: 'chuxing',
        SearchValue: value
      }
    }).then(
      comments => {
        this.items = comments.Data.chuxing || [];
      });
  }


  /*
   * 打电话
   * */
  callPhone(params) {
    this.HelpUtils.callUp(params)
  }


  /*
   * 跳转
   * */
  NavigationTo(item) {
    //this.navCtrl.push('DetailPage', {type: 'kuaidi', item: item, InnerType: item.InnerType});
  }
}
