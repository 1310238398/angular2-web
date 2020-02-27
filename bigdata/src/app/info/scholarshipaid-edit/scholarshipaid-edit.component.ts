import { NzMessageService } from 'ng-zorro-antd';
import {HttpService} from 'src/http/http.service';
import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';

// tslint:disable-next-line:max-line-length
@Component({selector: 'app-scholarshipaid-edit', templateUrl: './scholarshipaid-edit.component.html', styleUrls: ['./scholarshipaid-edit.component.less']})
export class ScholarshipaidEditComponent implements OnInit {
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
    scholarshipAidCode: '',
    rankCode: '',
    isPayment: '',
    amount: ''
  };

  constructor(private msg: NzMessageService, private modal: NzModalRef, private http: HttpService) {}

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.params.recordId = this.data.ssaRecordId || '';
      this.params.uid = this.data.uid || '';
      this.params.academicYear = this.data.ssaAcademicYear || '';
      this.params.academicTerm = this.data.ssaAcademicTerm || '';
      this.params.scholarshipAidCode = this.data.ssaScholarshipAidCode || '';
      this.getRankmountsquery(this.params.scholarshipAidCode);
      this.params.rankCode = this.data.ssaRankCode || '';
      this.params.isPayment = this.data.ssaIsPayment || '';
      this.params.amount = this.data.sarAmount || '';
    }
    this.getScholarshipaid();
  }

  save() {
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/upstudentscholarshipaid',
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
  /**
   * 获取奖助项目
   */
  getScholarshipaid() {
    this.http.POST({ Router: 'api/pc/bigdata/queryscholarshipaid' }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.scholarshipaid = res.Data;
      }
    });
  }
  /**
   * 获取奖助项目
   */
  getRankmountsquery(ScholarshipAidCode= '') {
    console.log(ScholarshipAidCode);
    this.http.POST({ Router: '/api/pc/bigdata/rankmountsquery', Body: {ScholarshipAidCode: ScholarshipAidCode} }).subscribe(res => {
      if (!res.FeedbackCode) {
        console.log(res.Data);
        this.RankAmonts = res.Data;
        this.RankAmonts.forEach(item => {
          item.Lable = `${item.Ranking}${item.Amount}`;
        });
      }
    });
  }
  /**
   *等次金额变动
   */
rankMountChange(rank) {
console.log(rank);
this.params.rankCode = rank.RankCode;
this.params.amount = rank.Amount;
}
  close() {
    this
      .modal
      .destroy();
  }
}
