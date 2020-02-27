import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../http/http.service";
import { ServelUrl } from "../../ServelUrl";
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-authstatus',
  templateUrl: './authstatus.component.html',
})
export class AuthstatusComponent implements OnInit {
  dataSet = [];
  searchObj = {
    AcademyCode: '',
    GradeCode: ''
  };
  isDisabled= false;
  Academys = [];
  Grades = [];
  page = {
    Page: 1,
    PageSize: 40,
  };
  total = 0;

  constructor(public msgSrv: NzMessageService, public httpService: HttpService) {
  }


  ngOnInit() {
    //this.onSearch();
    this.loadAcademy();
    this.loadGade();
  }

  /*加载学院*/
  loadAcademy() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getAcademy,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Academys = res.Data || [];
      }

    });

  }


  /*加载年级*/
  loadGade() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.getGrade,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Grades = res.Data || [];
      }

    });

  }

  onSearch(reload = false) {
    if (reload) {
      this.page.Page = 1;
    }
    Object.keys(this.searchObj).forEach(item => {
      if (!this.searchObj[item]) {
        this.searchObj[item] = '';
      }
    });
    this.httpService.POST({
      Router: ServelUrl.Url.countList,
      Method: 'POST',
      Body: Object.assign(this.searchObj, { page: this.page.Page - 1, count: this.page.PageSize })
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.Data.items;
        this.total = res.Data.total;
      }

    });
  }

  resetForm(form) {
    form.reset();
  }
  export() {
    this.isDisabled = true;
    this.httpService.postJSON({
      Router: ServelUrl.Url.exportunauthdetail,
      Method: 'POST',
      Body: {
        AcademyCode: this.searchObj.AcademyCode || '',
        GradeCode: this.searchObj.GradeCode || ''
      }
    }).then(value => {
      this.isDisabled = false;
      if (!value.FeedbackCode) {
        this.msgSrv.success(value.FeedbackText);
        //window.open(value.Data.url);
        var a = document.createElement('a');
        var filename = '未认证信息.xlsx';
        a.href = value.Data.url;
        a.download = filename;
        a.click();
      } else {
        this.msgSrv.warning(value.FeedbackText);
      }
    }).catch(re => {
      this.msgSrv.error('出错了亲');
    });
  }
}
