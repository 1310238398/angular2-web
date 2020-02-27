import { NzMessageService } from 'ng-zorro-antd';
import {HttpService} from 'src/http/http.service';
import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import { isArray } from 'util';
// tslint:disable-next-line:max-line-length
@Component({selector: 'app-specialcharacter-edit', templateUrl: './specialcharacter-edit.component.html', styleUrls: ['./specialcharacter-edit.component.less']})
export class SpecialcharacterEditComponent implements OnInit {
  data;
  params = {
    recordId: '',
    uid: '',
    projectType: null,
    description: '',
    specialCharacterCode: null
  };

  constructor(private msg: NzMessageService, private modal: NzModalRef, private http: HttpService) {}

  ngOnInit() {
    this.params.uid = this.data.uid || '';
    if (this.data.sscRecordId) {
      console.log('编辑', this.data);
      this.params.recordId = this.data.sscRecordId || '';
      this.params.projectType = this.data.sscProjectType || '';
      this.params.description = this.data.sscDescription;
     /*  if (isArray(this.data.sscSpecialCharacterCode)) {
        this.params.specialCharacterCode = this
          .data
          .sscSpecialCharacterCode
          .split() || [];
      } else {
        this.params.specialCharacterCode = this.data.sscSpecialCharacterCode;
      } */
      this.params.specialCharacterCode = this.data.sscSpecialCharacterCode;
    }
  }

  save() {
   // this.params.specialCharacterCode = this.params.specialCharacterCode.join();
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/upstudentspecialcharacter',
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
