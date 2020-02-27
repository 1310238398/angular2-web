import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../http/http.Service";
import {ServelUrl} from "../../../../app/ServelUrl";
import {HelpUtils} from "../../../../app/utils/HelpUtils";
import {ListPage} from "../../list/list";

declare var antlinker;

@IonicPage({
  defaultHistory: ['ListPage']
})
@Component({
  selector: 'page-leave-apply-detail',
  templateUrl: 'leave-apply-detail.html',
})
export class LeaveApplyDetailPage {
  leaveApply: any;
  reader;
  applyDate: string = new Date().toISOString();
  loadingPop;
  UserInfo = {
    Name: '',
    UserCode: '',
    AcademyName: '',
    ClassName: ''
  };

  constructor(private http: HttpService, private navCtrl: NavController, private params: NavParams, private HelpUtils: HelpUtils) {
    this.leaveApply = this.params.get('LeaveApply');
    //this.reader = new FileReader();
    this.http.postJSON({
      Router: ServelUrl.Url.queryleavestudentmessage,
      Method: 'POST',
      Body: {
        TaskCode: ''
      }
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.UserInfo.Name = comments.Data.Name;
          this.UserInfo.UserCode = comments.Data.UserCode;
          this.UserInfo.AcademyName = comments.Data.AcademyName;
          this.UserInfo.ClassName = comments.Data.ClassName;
        }
      });
  }

  ionViewDidEnter() {
    antlinker.configTitle({
      type: "label",
      title: '请假详情',
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

  ionViewWillLeave() {
    //this.navCtrl.setRoot(ListPage,{test:'rrrr'})
    localStorage.setItem('LeaveApply', JSON.stringify(this.leaveApply));
  }

  /*  onLeaveApply() {
      this.loadingPop = this.HelpUtils.loadingPop('请假申请正在提交。。。。。');
      var requestData: any = this.leaveApply;
      requestData.LeaveType = JSON.parse(this.leaveApply.LeaveType).Code || '';
      requestData.OutPlace = JSON.parse(this.leaveApply.OutPlace).Code || '';
      var formData = new FormData();
      if (requestData.Evidence) {
        this.reader.onloadend = (e) => {
          var dataUrl = this.HelpUtils.compress(this.reader.result, 0.1);
          formData.append('file', this.HelpUtils.base64toBlob(dataUrl));
          //  delete requestData.Evidence;
          formData.append('router', ServelUrl.Url.studentleaveapplication);
          formData.append('Body', JSON.stringify(requestData));
          this.submit(formData);
        };
        this.reader.readAsDataURL(requestData.Evidence);
      } else {
        formData.append('router', ServelUrl.Url.studentleaveapplication);
        formData.append('Body', JSON.stringify(requestData));
        this.submit(formData);
      }

    }*/
  onLeaveApply() {
    this.http.postJSON({
      Router: ServelUrl.Url.saveApply,
      Method: 'POST',
      Body: {
        LeaveReason: this.leaveApply.LeaveReason || '',
        StartDate: this.leaveApply.StartDate || '',
        EndDate: this.leaveApply.EndDate || '',
        StartCourse: parseInt(this.leaveApply.StartCourse),
        EndCourse: parseInt(this.leaveApply.EndCourse),
        LeaveType: this.leaveApply.LeaveType.Code || '',
        OutPlace: this.leaveApply.OutPlace.Code || '',
        ClassNum: parseInt(this.leaveApply.ClassNum),
        DetailAddress: this.leaveApply.DetailAddress || '',
        EmergencyPerson: this.leaveApply.EmergencyPerson || '',
        EmergencyNumber: this.leaveApply.EmergencyNumber.toString() || '',
        AttachmentKey: this.leaveApply.AttachmentKey || '',
        AttachmentCode: this.leaveApply.AttachmentCode || '',
      }
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.HelpUtils.presentAlert({
            subTitle: '您的请假申请已提交，请等<br/>待审批。',
            buttons: [{
              text: '确定', role: 'cancel', handler: () => {
                this.navCtrl.push(ListPage)
              }
            }]
          });
        } else {
          this.HelpUtils.toastPop(`${comments.FeedbackText}`);
        }
      });
  }

  submit(formData) {
    this.http.postFormData(formData, (comments) => {
      this.loadingPop.dismiss();
      if (!comments.FeedbackCode) {
        this.HelpUtils.presentAlert({
          subTitle: '您的请假申请已提交，请等<br/>待审批。',
          buttons: [{
            text: '确定', role: 'cancel', handler: () => {
              this.navCtrl.push(ListPage)
            }
          }]
        });
      } else {
        this.HelpUtils.toastPop(`${comments.FeedbackText}`);
      }
    })
  }

}
