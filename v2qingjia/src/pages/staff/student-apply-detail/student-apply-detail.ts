import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../http/http.Service";
import {CommonService} from "../../../app/service/CommonService";
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {ServelUrl} from "../../../app/ServelUrl";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * create by hanzhendong.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var antlinker;
declare var AMap;
declare var moment;

@IonicPage()
@Component({
  selector: 'page-student-apply-detail',
  templateUrl: 'student-apply-detail.html',
})
export class StudentApplyDetailPage {
  leaveApply: any;
  AfterApply: boolean = false;
  applyDate;
  UserInfo;
  AuthReason;
  Location;
  Steps = [];
  @ViewChild('xiaojiacontainerMap') mapElement: ElementRef;
  CertifyImgs = [];

  constructor(private helpUtil: HelpUtils, private DomS: DomSanitizer, private http: HttpService, private commonService: CommonService, private navCtrl: NavController, private params: NavParams, private HelpUtils: HelpUtils) {
    /*
     * 在列表中获取学生信息
     * */
    this.leaveApply = JSON.parse(this.params.get('itemapply'));
      this.commonService.getFlow({ RecordId: this.leaveApply.RecordId,FlowInstanceID: this.leaveApply.FlowInstanceID || ''}).then(data => {
        console.log(data);
        this.Steps = data.Data || [];
      })

    this.UserInfo = {
      Name: this.leaveApply.Name,
      UserCode: this.leaveApply.UserCode,
      AcademyName: this.leaveApply.AcademyName,
      IntelUserCode: this.leaveApply.IntelUserCode,
      Phone: this.leaveApply.Phone,
      ClassName: this.leaveApply.ClassName
    };
    this.applyDate = this.leaveApply.ApplyDate;
    this.leaveApply.LeaveType = {
      Code: this.leaveApply.LeaveType,
      CodeName: this.leaveApply.LeaveTypeName,
    };
    this.leaveApply.OutPlace = {
      Code: this.leaveApply.OutPlace,
      CodeName: this.leaveApply.OutPlaceName,
    };
    if (this.leaveApply.ApproveStatus == 4) {
      this.commonService.getStudentApplyLocationAndAuthReason({
        RecordId: this.leaveApply.RecordId,
        FlowRecordId: this.leaveApply.FlowRecordId
      }).then(data => {
        this.AuthReason = data.Data.RefuseReason;
      })
    }

  }

  ionViewWillEnter() {
    /*、
     * 调用jssdk
     *
     * */
    antlinker.configTitle({
      type: "label",
      title: '请假审批',
      fail: () => {
      },
      success: ''
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "empty",
      success: '',
      fail: () => {
      }
    });
  }

  ionViewDidEnter() {
    if (this.leaveApply.ApproveStatus == 5) {
      this.commonService.getStudentApplyLocationAndAuthReason({RecordId: this.leaveApply.RecordId}).then(data => {
        this.CertifyImgs = data.Data.Attachs;
        console.log(data.Data.Location);
        this.Location = data.Data.Location;
        if (data.Data.Location) {
          var map = new AMap.Map(this.mapElement.nativeElement, {
            resizeEnable: true,
            zoom: 15,
            center: data.Data.Location.split(',')

          });
          var marker = new AMap.Marker({ //添加自定义点标记
            map: map,
            position: data.Data.Location.split(','), //基点位置
            offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
            content: '<div class="marker-route marker-marker-bus-from"></div>'   //自定义点标记覆盖物内容
          });
        }

      });

    }
    if (this.leaveApply.ApproveStatus == 1) {
      if (this.leaveApply.ApplyDate > this.leaveApply.StartDate) {
        this.AfterApply = true;
      }
    }
  }

  /**
   * 不批准
   */
  onUnApprove(apply) {
    this.navCtrl.push('UnapprovedPage', {apply: apply, leaveApply: this.leaveApply});
  }

  /**
   * 批准
   */
  onApprove() {
    this.http.postJSON({
      Router: ServelUrl.Url.StaffAgreeApply,
      Method: 'POST',
      Body: {
        RecordId: this.leaveApply.RecordId,
        FlowRecordId: this.leaveApply.FlowRecordId,
      }
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          // console.log(this.comments);
          this.HelpUtils.presentAlert({
            subTitle: comments.FeedbackText || '处理成功，已放入您的待销假标签下',
            buttons: [{
              text: '确定', role: 'cancel', handler: () => {
                this.navCtrl.push('StaffListPage');
              }
            }]
          });
        }else {
          this.HelpUtils.alert(comments.FeedbackText);
        }
      });
  }

  /**
   * 批准销假
   */
  onApprpveLeave() {
    this.http.postJSON({
      Router: ServelUrl.Url.staffagreerecall,
      Method: 'POST',
      Body: {
        RecordId: this.leaveApply.RecordId,
        FlowRecordId: this.leaveApply.FlowRecordId,
      }
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.HelpUtils.presentAlert({
            subTitle: '销假已批准，已放入您的已销假标签下！',
            buttons: [{
              text: '确定', role: 'cancel', handler: () => {
                this.navCtrl.push('StaffListPage');
              }
            }]
          });
        }
      });
  }

  onReported() {
    this.http.postJSON({
      Router: ServelUrl.Url.queryleavestudentmessage,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.HelpUtils.presentAlert({
            subTitle: '您的撤回申请已提交，请等<br/>待处理。',
            buttons: [{
              text: '确定', role: 'cancel', handler: () => {
                this.navCtrl.push('StaffListPage');
              }
            }]
          });
        }
      });
  }

  /*提醒销假*/
  onInfo() {
    this.http.postJSON({
      Router: ServelUrl.Url.onInfo,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.HelpUtils.toastPop('提醒成功！')
        }
      });
  }

  navPreview(params) {
    this.navCtrl.push('PreviewPage', params)
  }

  isOver(EndDate) {
    //var endDate = moment(EndDate).format('YYYY-MM-DD HH:mm');
    var now = moment(new Date()).format('YYYY-MM-DD HH:mm');
    if (now > EndDate) {
      return true;
    }
    else {
      return false;
    }
  }

  haveFinishDay(EndDate) {
    let now = moment(new Date()).format('YYYY-MM-DD HH:mm');
    let day = this.helpUtil.getDays(EndDate, now);
    console.log(EndDate);
    return day > 0 ? day : 0;
  }
}
