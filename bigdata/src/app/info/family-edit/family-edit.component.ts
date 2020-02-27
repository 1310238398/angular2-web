import { NzMessageService } from 'ng-zorro-antd';
import {HttpService} from 'src/http/http.service';
import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';

@Component({selector: 'app-family-edit', templateUrl: './family-edit.component.html', styleUrls: ['./family-edit.component.less']})
export class FamilyEditComponent implements OnInit {
  params = {
    RecordId: '',
    uid: '',
    MemberTypeCode: '',
    MemberName: '',
    MemberWorkUnit: '',
    Duty: '',
    MobilePhone: ''
  };

  constructor(private msg: NzMessageService, private modal: NzModalRef, private http: HttpService) {}

  ngOnInit() {
    console.log(this.params);
  }

  save() {
    const payload = {
      recordId: this.params.RecordId || '',
      uid: this.params.uid,
      memberType: this.params.MemberTypeCode,
      memberName: this.params.MemberName,
      memberWorkUnit: this.params.MemberWorkUnit,
      duty: this.params.Duty,
      mobilePhone: this.params.MobilePhone
    };
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/upstudentfamilymember',
        Body: payload
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
