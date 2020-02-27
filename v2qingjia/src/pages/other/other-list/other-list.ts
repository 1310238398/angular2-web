import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {HttpService} from "../../../http/http.Service";
import {ServelUrl} from "../../../app/ServelUrl";

/**
 * Generated class hanzhendong.
 *
 */
declare var antlinker;
@IonicPage()
@Component({
  selector: 'page-other-list',
  templateUrl: 'other-list.html',
})
export class OtherListPage {
  searchQuery = '';
  ApproveStatus: Number = 3;
  items: Array<any> = [];
  Page: number = 0;
  moreData: boolean = true;
  PageNo: number = 10;
  loading: any;

  constructor(public navCtrl: NavController, private http: HttpService) {

    this.initializeItems()
  }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: '请假情况',
      fail: function () {

      },
      success: function () {
      }
    });
    antlinker.configTitleButton({
      type: 'back',
      text: '关闭',
      fail: function () {

      },
      success: function () {
      },
      trigger: function () {
      }

    });
  }

  initializeItems() {
    this.http.postJSON({
      Router: ServelUrl.Url.querystudentleaveapplication,
      Method: 'POST',
      Body: {
        Page: this.Page,
        PageNo: this.PageNo,
        ApproveStatus: this.ApproveStatus,
      }
    }).then(
      comments => {
        this.items = comments.Data || [];
      });
  }

  /*
   * 查询数据
   * */
  search($event) {
    this.Page = 0;
    this.moreData = true;
    this.http.postJSON({
      Router: ServelUrl.Url.querystudentleaveapplication,
      Method: 'POST',
      Body: {
        SearchValue: $event.target.value || '',
        Page: this.Page,
        PageNo: this.PageNo,
        ApproveStatus: this.ApproveStatus
      }
    }).then(
      data => {
        this.items = data.Data || [];
      },
      err => console.log(err));
  }

  /*
   * 跳转
   * */
  NavigationTo(item) {
    this.navCtrl.push('OtherDetailPage', {item});
  }


  /*
   * 下拉加载
   * */
  doInfinite(infiniteScroll) {
    this.Page++;
    this.http.postJSON({
      Router: ServelUrl.Url.querystudentleaveapplication,
      Method: 'POST',
      Body: {
        SearchValue: this.searchQuery,
        Page: this.Page,
        ApproveStatus: this.ApproveStatus,
        PageNo: this.PageNo,
      }
    }).then(
      comments => {
        if (comments.Data.length > 0) {
          this.moreData = true;
          this.items = this.items.concat(comments.Data);
        } else {
          this.moreData = false;
        }
        infiniteScroll.complete();
      },
      err => console.log(err));
  }
}
