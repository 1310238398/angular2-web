import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../http/http.service";
import { ServelUrl } from "../../ServelUrl";

@Component({
  selector: 'app-classinfo-edit',
  templateUrl: 'classinfo.edit.component.html'
})
export class ClassinfoEditComponent implements OnInit {
  isSaveIng = false;
  item = {
    // Leadership: '',
    Campus: '',
    Counselor: '',
    Adviser: '',
    ClassName: '',
    ClassCode: '',
    Graduate: 'no'
  };
  Counselors = [];
  Leaderships = [];
  Advisers = [];
  campusData = [];
  data;

  constructor(private subject: NzModalSubject,
    public msgSrv: NzMessageService, private httpService: HttpService) {
  }

  ngOnInit() {
    // this.loadStaff('Leadership');
    this.loadStaff('Counselor');
    this.loadStaff('Adviser');
    this.loadCampus();
    if (this.data) {
      this.item.Campus = this.data.Campus;
      this.item.Counselor = this.data.Counselor;
      this.item.Adviser = this.data.Adviser;
      this.item.ClassName = this.data.ClassName;
      this.item.ClassCode = this.data.ClassCode;
      this.item.Graduate = this.data.Status === '1' ? 'no' : 'yes';
    }
  }

  /*加载辅导员、班主任*/
  loadStaff(code) {
    this.httpService.postJSON({
      Router: '/api/classinfo/StaffUserDownBoxInit2',
      Method: 'POST',
      Body: {
        Academy: this.data.Academy,
        StaffType: code
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        let $_var = `${code}s`;
        this[$_var] = res.Data || [];
      }

    });
  }

  /*加载*/
  loadCampus() {
    this.httpService.postJSON({
      Router: '/api/system/parameter/campusquery',
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.campusData = res.Data;
      } else {
        this.campusData = [];
      }
    });
  }

  save() {
    this.isSaveIng = true;
    this.httpService.POST({
      Router: ServelUrl.Url.classupdate,
      Method: 'POST',
      Body: {
        // Leadership: this.item.Leadership,
        Campus: this.item.Campus ? this.item.Campus : '',
        Counselor: this.item.Counselor ? this.item.Counselor : '',
        Adviser: this.item.Adviser ? this.item.Adviser : '',
        ClassCode: this.item.ClassCode,
        Graduate: this.item.Graduate
      }
    }).subscribe(res => {
      this.isSaveIng = false;
      if (res.FeedbackCode === 0) {
        this.msgSrv.success(res.FeedbackText);
        this.subject.next(true);
        this.close();
      } else {
        this.msgSrv.error(res.FeedbackText);
      }
    })
  }

  close() {
    this.subject.destroy();
  }
}
