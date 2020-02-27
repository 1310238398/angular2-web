import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../../../http/http.Service";
import {CommonService} from "../../../../app/service/CommonService";
import {HelpUtils} from "../../../../app/utils/HelpUtils";
import {ServelUrl} from "../../../../app/ServelUrl";

/**
 * Generated class for the MyapplydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare  var antlinker;

@IonicPage({
  segment: 'myapplydetailpage/:item'
})
@Component({
  selector: 'page-myapplydetail',
  templateUrl: 'myapplydetail.html',
})
export class MyapplydetailPage {
  leaveApply: any;
  applyDate;
  AuthReason;
  UserInfo;
  constructor(private http: HttpService, private commonService: CommonService,public viewCtrl: ViewController,public appCtrl: App,public navCtrl: NavController,private params: NavParams, private HelpUtils: HelpUtils, private alerCtrl: AlertController) {
    // console.log(params);
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
            this.dealApply(this.leaveApply);
          }
        });
    } else {

      this.dealApply(this.leaveApply)
    }
  }
  ionViewWillEnter(){
    antlinker.configTitle({
      type: "label",
      title: '我的请假',
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
    this.UserInfo = {
      Name: leaveApply.Name,
      UserCode: leaveApply.UserCode,
      AcademyName: leaveApply.AcademyName,
      ClassName: leaveApply.ClassName
    };
    this.applyDate = leaveApply.ApplyDate;
    this.leaveApply.LeaveType = {
      Code: leaveApply.LeaveType,
      CodeName: leaveApply.LeaveTypeName,
    };
    this.leaveApply.OutPlace = {
      Code: leaveApply.OutPlace,
      CodeName: leaveApply.OutPlaceName,
    };
    if (this.leaveApply.ApproveStatus == 4||this.leaveApply.ApproveStatus == 6) {
      this.commonService.getStudentApplyLocationAndAuthReason({ TaskCode: leaveApply.TaskCode }).then(data => {
        this.AuthReason = data.Data.RefuseReason;
      })
    }
  }


  onReCall() {
    let confirm = this.alerCtrl.create({
      title: '确定取消申请吗？',
      message: '',
      buttons: [
        {
          text: '是',
          handler: () => {
            this.http.postJSON({
              Router: ServelUrl.Url.StudentCancelApplication,
              Method: 'POST',
              Body: {
                TaskCode: this.leaveApply.TaskCode
              }
            }).then(
              comments => {
                if (!comments.FeedbackCode) {
                  this.HelpUtils.presentAlert({
                    subTitle: comments.FeedbackText,
                    buttons: [{
                      text: '确定',
                      role: 'cancel',
                      handler: () => {
                        this.viewCtrl.dismiss();
                        this.appCtrl.getRootNav().push('MyapplyPage');
                      }
                    }]
                  });
                }
              });
          }
        },
        {
          text: '否',
        }
      ]
    });
    confirm.present()
  }
  updateApply(){
   this.navCtrl.setRoot('LeaveApplyPage',{LeaveApply:this.leaveApply})
  }
  updateXiaojiaApply(){
    debugger;
    this.navCtrl.push('ResumeLeaveAddressPage',{TaskCode:this.leaveApply.TaskCode})
  }
}
