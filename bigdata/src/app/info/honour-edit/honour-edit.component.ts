import { NzMessageService } from 'ng-zorro-antd';
import {HttpService} from 'src/http/http.service';
import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import * as moment from 'moment';
// tslint:disable-next-line:max-line-length
@Component({selector: 'app-honour-edit', templateUrl: './honour-edit.component.html', styleUrls: ['./honour-edit.component.less']})
export class HonourEditComponent implements OnInit {
  scholarshipaid = [];
  RankAmonts = [];
  rankObj;
  data;
  params = {
    recordId: '',
    SsaRecordId: '',
    uid: '',
    academicYear: null,
    academicTerm: null,
    awardDate: '',
    rewardName: '',
    rewardGrade: null,
    rewardLevel: null,
    rewardType: null,
    myRanking: '',
    grantingUnit: ''
  };

  constructor(private msg: NzMessageService, private modal: NzModalRef, private http: HttpService) {}

  ngOnInit() {
    console.log(this.params);
    if (this.data) {
      this.params.recordId = this.data.shRecordId || '';
      this.params.uid = this.data.uid || '';
      this.params.academicYear = this.data.shAcademicYear || '';
      this.params.academicTerm = this.data.shAcademicTerm || '';
      this.params.awardDate = this.data.shAwardDate;
      this.params.rewardName = this.data.shRewardName || '';
      this.params.rewardGrade = this.data.shRewardGrade || '';
      this.params.rewardLevel = this.data.shRewardLevel || '';
      this.params.rewardType = this.data.shRewardType || '';
      this.params.myRanking = this.data.shMyRanking || '';
      this.params.grantingUnit = this.data.shGrantingUnit || '';
    }
  }

  save() {
    this.params.awardDate = moment(this.params.awardDate).format('YYYY-MM-DD') || '';
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/upstudenthonour',
        Body: this.params
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.modal.destroy();
          this.msg.success(res.FeedbackText);
        } else {
          this.msg.error(res.FeedbackText);
        }
      });
    console.log(this.params);
  }
  close() {
    this
      .modal
      .destroy();
  }
}
