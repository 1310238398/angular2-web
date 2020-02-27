import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../http/http.service";
import {ServelUrl} from "../../../ServelUrl";
import {ActivatedRoute, Params} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-authdetail',
  templateUrl: './authdetail.component.html',
})
export class AuthdetailComponent implements OnInit {
  dataSet = [];
  page = {
    Page: 1,
    PageSize: 40,
  };
  total = 0;
  AcademyCode;
  GradeCode;
  isDisabled:boolean=false;
  constructor(public msgSrv: NzMessageService,private route: ActivatedRoute, public httpService: HttpService) {
  }


  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.AcademyCode=params['AcademyCode'];
      this.GradeCode=params['GradeCode'];
     this.onSearch(params['AcademyCode'], params['GradeCode']);
    });
  }

  onSearch(AcademyCode, GradeCode) {
    this.httpService.POST({
      Router: ServelUrl.Url.getAuthdetail,
      Method: 'POST',
      Body: {
        AcademyCode: AcademyCode,
        GradeCode: GradeCode,
        page: this.page.Page - 1,
        count: this.page.PageSize
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.Data.items;
        this.total = res.Data.total;
      }

    });
  }
  export() {
    this.isDisabled = true;
    this.httpService.postJSON({
      Router: ServelUrl.Url.exportunauthdetail,
      Method: 'POST',
      Body: {
        AcademyCode:this.AcademyCode||'',
        GradeCode:this.GradeCode||''
      }
    }).then(value => {
      this.isDisabled=false;
      if (!value.FeedbackCode) {
        this.msgSrv.success(value.FeedbackText);
       // window.open(value.Data.url);
        var a = document.createElement('a');
        var filename = '未认证信息.xlsx';
        a.href = value.Data.url;
        a.download = filename;
        a.click();
      } else {
        this.msgSrv.warning(value.FeedbackText)
      }
    }).catch(re=>{
      this.msgSrv.error('出错了亲')
    })
  }
}
