import {Component, OnInit} from '@angular/core';
import {ServelUrl} from "../../ServelUrl";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpService} from "../../../http/http.service";

@Component({
  selector: 'app-classstudentadminedit',
  templateUrl: './classstudentadminedit.component.html',
  styleUrls: ['./classstudentadminedit.component.less']
})
export class ClassstudentadmineditComponent implements OnInit {

  StudentClass = [];
  disabled = false;
  seachValue = '';
  ClassCode='';
  data;
  constructor(private subject: NzModalSubject,
              public msgSrv: NzMessageService,
              private httpService: HttpService) {
  }

  ngOnInit() {
  }

  onSearch() {
    if (!this.seachValue.trim()) {
      this.msgSrv.warning('请输入班级名称!');
      return;
    }
    this.disabled = true;
    this.httpService.postJSON({
      Router: ServelUrl.Url.getStudentClass,
      Method: 'POST',
      Body: {
        Name: this.seachValue
      }
    }).then(res => {
      this.disabled = false;
      if (!res.FeedbackCode) {
        this.StudentClass = res.Data||[];
        this.StudentClass.forEach(item => {
          item.checked = false;
        })
      }
    }).catch(err => {
      this.disabled = false;
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
