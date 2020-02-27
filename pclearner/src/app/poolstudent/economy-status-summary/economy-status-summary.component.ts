import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../http/http.service";
import {ServelUrl} from "../../ServelUrl";
import {ModalHelper} from "../../shared/helper/modal.helper";
import {NzMessageService} from "ng-zorro-antd";
import {CommonService} from "../../service/common.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-economy-status-summary',
  templateUrl: './economy-status-summary.component.html',
  styleUrls: ['./economy-status-summary.component.css']
})
export class EconomyStatusSummaryComponent implements OnInit {
  dataSet = [];
  Campuss = [];
  StudentTypes = [];
  isDisabled = false;
  expandForm = false;
  searchObj = {
    UserCode: '',
    Name: '',
    Academy: '',
    Major: '',
    Grade: '',
    Class: '',
    recognition_level:'',
    StartDate: '',
    EndDate: '',
  };
  page = {
    Page: 1,
    PageSize: 40,
    Total: 0
  };


  constructor(private route:ActivatedRoute,private CommonService: CommonService, public httpService: HttpService, private msgSrv: NzMessageService, private modal: ModalHelper) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['pid']);
    localStorage.setItem('pid',this.route.snapshot.params['pid'])
    this.route.params.forEach((params:Params)=>{
      console.log(params);
    });
    this.httpService.postJSON({
      Router: ServelUrl.Url.getCampus,
      Method: 'POST',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Campuss = res.Data || [];
      }

    });
    this.CommonService.loadBizCode('recognition_level').then(res => {
      if (!res.FeedbackCode) {
        this.StudentTypes = res.Data || [];
      }
    })
  }

  export() {
    this.isDisabled = true;
    this.httpService.postJSON({
      Router: ServelUrl.Url.poolExport,
      Method: 'POST',
      Body:{questionnaires:this.route.snapshot.params['pid']||''}
    }).then(value => {
      this.isDisabled = false;
      if (!value.FeedbackCode) {
        this.msgSrv.success(value.FeedbackText);
        // window.open(value.Data.url);
        var a = document.createElement('a');
        var filename = '贫困生数据库.xlsx';
        a.href = value.Data.url;
        a.download = filename;
        a.click();
      } else {
        this.msgSrv.warning(value.FeedbackText);
      }
    }).catch(re => {
      this.msgSrv.error('出错了亲');
    });
    // window.open(ServelUrl.Url.export+params);
  }

  onSearch(load = false) {
    if (load) {
      this.page.Page = 1;
    }
    var querys = [];
    Object.keys(this.searchObj).forEach(key => {
      console.log(key);
      if (this.searchObj[key]) {
        querys.push({key: key, val: this.searchObj[key]})
      }
    })
    this.httpService.POST({
      Router: ServelUrl.Url.poolquery, Method: 'POST', Body: {
        current: this.page.Page,
        pageSize: this.page.PageSize,
        questionnaires: this.route.snapshot.params['pid']||'',
        querys: querys
      }
    }).subscribe(res => {
      if (!res.FeedBackCode) {
        this.dataSet = res.Data.data || [];
        //this.Users[0].Default ='1';
        this.page.Total = res.Data.total;
      }
    })
  }

  resetForm(form) {
    form.reset();
    Object.keys(this.searchObj).forEach(value => {
      this.searchObj[value] = '';
    })
  }
}
