import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../service/common.service";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpService} from "../../../../http/http.service";
import {ServelUrl} from "../../../ServelUrl";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-studentstatus',
  templateUrl: './edit-studentstatus.component.html',
  styleUrls: ['./edit-studentstatus.component.less']
})
export class EditStudentstatusComponent implements OnInit {
  validateForm: FormGroup;
  StudentStatus = [];
  item = {
    StudentStatus: '',
    IntelUserCode: '',
    Remark: ''
  };
  currentStatus = '';
  data;
  disabled: boolean = false;

  constructor(public fb: FormBuilder, private commonService: CommonService, private subject: NzModalSubject,
              public msgSrv: NzMessageService, private httpService: HttpService) {
  }

  ngOnInit() {
    if (this.data) {
      //this.item = this.data;
      this.currentStatus = this.data.StudentStatusName;
    }
    this.validateForm = this.fb.group({
      StudentStatus: ['', [Validators.required]],
      Remark: [null, [Validators.required, Validators.maxLength(25)]]
    });
    this.commonService.loadBizCode('StudentStatus').then(res => {
      if (!res.FeedbackCode) {
        this.StudentStatus = res.Data || [];
      }
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  save() {
    this.disabled = true;
    if (!this.item.StudentStatus.trim()) {
      this.msgSrv.warning('状态不能为空！');
      return
    }
    this.httpService.postJSON({
      Router: ServelUrl.Url.setStatus,
      Method: 'POST',
      Body: {
        IntelUserCode: this.data.IntelUserCode,
        StudentStatus: this.item.StudentStatus,
        Remark: this.item.Remark
      }
    }).then(res => {
      this.disabled = false;
      if (!res.FeedbackCode) {
        this.msgSrv.success(res.FeedbackText);
        this.subject.next();
        this.close();
      } else {
        this.msgSrv.warning(res.FeedbackText);
      }
    })
  }

  close() {
    this.subject.destroy();
  }
}
