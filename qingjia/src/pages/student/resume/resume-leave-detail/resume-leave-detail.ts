import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../../http/http.Service";
import {ServelUrl} from "../../../../app/ServelUrl";

/**
 * Generated by hanzhendong.
 *
 */
declare  var antlinker;
@IonicPage({
  segment: 'resumeleavedetail/:leaveapply'
})
@Component({
  selector: 'page-resume-leave-detail',
  templateUrl: 'resume-leave-detail.html',
})
export class ResumeLeaveDetailPage {
  leaveApply: any;
  applyDate: string = new Date().toISOString();
  UserInfo = {
    Name: '',
    UserCode: '',
    AcademyName: '',
    ClassName: '',
    applyDate: ''
  };
  bizType;

  constructor(private http: HttpService, private navCtrl: NavController, private params: NavParams) {
    this.bizType = this.params.get('leaveapply');
    /*判断是否是字符串
     * 直接字符串为recordid
     * */
    if (!this.isJSON(this.bizType)) {

      this.http.postJSON({
        Router: ServelUrl.Url.queryoneleavemessage,
        Method: 'POST',
        Body: {
          RecordId: this.bizType
        }
      }).then(
        comments => {
          if (!comments.FeedbackCode) {
            this.leaveApply = comments.Data;
            this.dealApply(this.leaveApply);
            //  this.dealApply(this.leaveApply);
          }
        });
    } else {
      this.leaveApply = JSON.parse(this.params.get('leaveapply'));
      this.dealUserInfo();

    }
  }
  ionViewWillEnter(){
    antlinker.configTitle({
      type: "label",
      title: '销假详情',
      fail: ()=>{},
      success: ''
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "empty",
      success: '',
      fail: ()=>{}
    });
  }
  dealApply(leaveApply) {
    console.log(this.leaveApply)
    this.UserInfo.Name = leaveApply.Name;
    this.UserInfo.UserCode = leaveApply.UserCode;
    this.UserInfo.AcademyName = leaveApply.AcademyName;
    this.UserInfo.ClassName =leaveApply.ClassName;
    this.UserInfo.applyDate = leaveApply.ApplyDate;
    this.applyDate = leaveApply.ApplyDate;
    this.leaveApply.LeaveType = {
      Code: leaveApply.LeaveType,
      CodeName: leaveApply.LeaveTypeName,
    };
    this.leaveApply.OutPlace = {
      Code: leaveApply.OutPlace,
      CodeName: leaveApply.OutPlaceName,
    };
  }

  dealUserInfo(){
    this.http.postJSON({
      Router: ServelUrl.Url.queryleavestudentmessage,
      Method: 'POST',
      Body: {
        TaskCode: this.leaveApply.TaskCode
      }
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.UserInfo.Name = comments.Data.Name;
          this.UserInfo.UserCode = comments.Data.UserCode;
          this.UserInfo.AcademyName = comments.Data.AcademyName;
          this.UserInfo.ClassName = comments.Data.ClassName;
          this.UserInfo.applyDate = comments.Data.ApplyDate;
        }
      });
  }
  isJSON(str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        console.log('转换成功：' + obj);
        return true;
      } catch (e) {
        console.log('error：' + str + '!!!' + e);
        return false;
      }
    }
    console.log('It is not a string!')
  }

  onReCall() {
    this.navCtrl.push('ResumeLeaveAddressPage', {TaskCode: this.leaveApply.TaskCode});
  }
}
