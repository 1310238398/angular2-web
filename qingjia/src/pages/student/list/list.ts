import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {HttpService} from "../../../http/http.Service";
import {ServelUrl} from "../../../app/ServelUrl";

/**
 * Generated class for the ListPage page.
 *
 */
declare var antlinker;
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  items: Array<any> = [];
  myApplyCount: number = 0;
  ResumeLeaveCount: number = 0;
  LeaveApplyPage: any = 'LeaveApplyPage';
  ResumeLeaveList: any = 'ResumeLeaveListPage';
  MyApply: any = 'MyapplyPage';
  isInfo:boolean=false;

  constructor(private http: HttpService) {
  }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: '请假',
      fail: ()=>{},
      success: ''
    });

    antlinker.configTitleButton({
      type: 'back',
      text: '',
      fail: ()=>{},
      success: ''

    });
    localStorage.removeItem('LeaveApply');
    this.getCount();

  }
  getCount() {
    /**
     * 学生请假数量
     */
    this.http.postJSON({
      Router: ServelUrl.Url.queryleavecount,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.myApplyCount = comments.Data.LeaveApplicationCount;
        }
      });
    /**
     * 学生销假数量
     */
    this.http.postJSON({
      Router: ServelUrl.Url.QueryFakeLeaveCount,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.ResumeLeaveCount = comments.Data.LeaveApplicationCount
        }
      });
    /*是否有铃铛*/
    this.http.postJSON({
      Router: ServelUrl.Url.checkremindleave,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.isInfo = comments.Data.Leave?true:false;
        }
      });
  }

  doRefresh(refresher) {
    this.getCount();
    refresher.complete();
  }

  ionViewDidLeave() {
    /* let his = this.navCtrl['_linker']._history;
     if (his.length == 1 && his[0] == '/') {
         console.log('离开');
         antlinker.closeView({
             success: function () {
             },
             fail: function () {

             },

         });

     }*/
  }
}
