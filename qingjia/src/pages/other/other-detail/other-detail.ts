import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {HttpService} from "../../../http/http.Service";
import {ServelUrl} from "../../../app/ServelUrl";

/**
 * Generated class for hanzhendong.
 *
 */

declare var antlinker;
@IonicPage({
  segment:'otherdetailpage/:item'
})
@Component({
  selector: 'page-other-detail',
  templateUrl: 'other-detail.html',
})
export class OtherDetailPage {
  leaveApply: any;
  applyDate;
  UserInfo;
  Days;

  constructor(private params: NavParams, private HelpUtils: HelpUtils,private http: HttpService) {
    this.leaveApply = this.params.get('item');
    /*判断是否是字符串
    * 直接字符串为recordid
    * */
    if ((typeof this.leaveApply) == 'string') {
      this.http.postJSON({
        Router: ServelUrl.Url.queryoneleavemessage,
        Method: 'POST',
        Body: {
          RecordId: this.leaveApply
        }
      }).then(
        comments => {
          if (!comments.FeedbackCode) {
            this.leaveApply = comments.Data;
          }
        });
    } else {
      this.applyDate = this.leaveApply.ApplyDate;
      this.Days = this.HelpUtils.getDays(this.leaveApply.StartDate, this.leaveApply.EndDate);
    }


  }
  ionViewWillEnter() {
    /*、
     * 调用jssdk
     *
     * */
    antlinker.configTitle({
      type: "label",
      title: '请假情况',
      fail: '',
      success: ''
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "empty",
      success: '',
      fail: ''
    });
  }

}
