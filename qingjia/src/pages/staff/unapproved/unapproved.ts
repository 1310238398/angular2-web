import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HelpUtils} from "../../../app/utils/HelpUtils";
import {ServelUrl} from "../../../app/ServelUrl";
import {HttpService} from "../../../http/http.Service";

/**
 * Generated hanzhendong
 *
 */
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-unapproved',
  template: `
    <ion-content class="outer-content" padding-top>
      <ion-list>
        <ion-item>
          <ion-textarea rows="6" [(ngModel)]="Reason"
                        placeholder="请输入不通过原因"></ion-textarea>
        </ion-item>
      </ion-list>
      <div padding *ngIf="$apply">
        <button ion-button color="zj-main-color" (click)="applySubmit()" block>确定</button>
      </div>
      <div padding *ngIf="!$apply">
        <button ion-button color="zj-main-color" (click)="xiaojiaSubmit()" block>确定</button>
      </div>
    </ion-content>`
})
export class UnapprovedPage {
  Reason;
  TaskCode: String;
  $apply: boolean = true;

  constructor(private http: HttpService, private navCtrl: NavController, private params: NavParams, private HelpUtils: HelpUtils,) {

  }

  ionViewWillEnter() {
    this.TaskCode = this.params.get('TaskCode');
    this.$apply = this.params.get('apply');
    antlinker.configTitle({
      type: "label",
      title: '请假审批',
      fail: function () {

      },
      success: function () {
      }
    });
  }

  applySubmit() {
    this.http.postJSON({
      Router: ServelUrl.Url.StaffNotApprovalHandleLeaveApplication,
      Method: 'POST',
      Body: {
        TaskCode: this.TaskCode,
        Reason: this.Reason||''
      }
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.HelpUtils.presentAlert({
            subTitle: '请假申请已拒绝，已放入您的未准假标签下',
            buttons: [{
              text: '确定', role: 'cancel', handler: () => {
                this.navCtrl.push('StaffListPage');
              }
            }]
          });
        }
      });
  }

  xiaojiaSubmit() {
    this.http.postJSON({
      Router: ServelUrl.Url.staffnorecall,
      Method: 'POST',
      Body: {
        TaskCode: this.TaskCode,
        Reason: this.Reason||''
      }
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          this.HelpUtils.presentAlert({
            subTitle: '销假申请已拒绝，学生需要重新申请销假！',
            buttons: [{
              text: '确定', role: 'cancel', handler: () => {
                this.navCtrl.push('StaffListPage');
              }
            }]
          });
        }
      });
  }
}
