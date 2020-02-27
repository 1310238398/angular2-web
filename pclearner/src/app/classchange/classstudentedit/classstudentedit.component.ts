import {Component, OnInit} from '@angular/core';
import {ServelUrl} from "../../ServelUrl";
import {HttpService} from "../../../http/http.service";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";

@Component({
  selector: 'app-classstudentedit',
  templateUrl: './classstudentedit.component.html',
  styleUrls: ['./classstudentedit.component.less']
})
export class ClassstudenteditComponent implements OnInit {
  StudentClass = [];
  data;
  ClassCode='';
  constructor(private subject: NzModalSubject,
              public msgSrv: NzMessageService,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.loadClass();
  }

  loadClass() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getStudentClass,
      Method: 'POST',
      Body: {
        Name: ''
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.StudentClass = res.Data || [];
        this.StudentClass.forEach(item => {
          item.checked = false;
        })
      }
    })
  }

  refreshStatus(data) {
    this.StudentClass.forEach(item => {
      if (item.ClassCode != data.ClassCode) {
        item.checked = false;
      }else {
        this.ClassCode=data.ClassCode;
      }
    })
    //const $allHaveCheck=this.HaveClassStudent.every(value=>!value.checked);
    //  const $allUnChecked = this.NotHaveClassStudent.every(value => !value.checked);
  }

  save() {
    const anyCheck = this.StudentClass.some(item => {
      return item.checked;
    });
    if (!anyCheck) {
      this.msgSrv.warning("请选择要移入的班级!");
      return;
    }
    this.httpService.postJSON({
      Router: ServelUrl.Url.pullStu,
      Method: 'POST',
      Body: {
        IntelUserCode: this.data.IntelUserCode||'',
        ClassCode: this.ClassCode||''
      }
    }).then(res => {
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
