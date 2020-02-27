import { Component, OnInit } from '@angular/core';
import { ServelUrl } from "../../ServelUrl";
import { HttpService } from "../../../http/http.service";
import { CommonService } from "../../service/common.service";
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";
declare var antlinker;
@Component({
  selector: 'app-qingjia',
  templateUrl: './qingjia.component.html',
  styleUrls: ['./qingjia.component.less']
})
export class QingjiaComponent implements OnInit {
  dataSet = [];
  LeaveTypes = [];
  ApproveStatuss = [
    { ItemCode: '1', 'ItemName': '待审批' },
    { ItemCode: '2', 'ItemName': '待销假' },
    { ItemCode: '5', 'ItemName': '正销假' },
    { ItemCode: '3', 'ItemName': '已销假' },
    { ItemCode: '4', 'ItemName': '请假未批准' },
    { ItemCode: '6', 'ItemName': '销假未批准' },
  ];
  searchObj = {
    UserCode: '',
    Name: '',
    Academy: '',
    Major: '',
    Grade: '',
    Class: '',
    StudentType: '',
    LeaveType: '',
    StartDate: '',
    antStartDate: '',
    EndDate: '',
    antEndDate: '',
    ApproveStatus: ''
  };
  page = {
    Page: 1,
    PageSize: 40,
  };
  total = 0;
  isDisabled = false;

  constructor(private datePipe: DatePipe,
    private commonService: CommonService, public httpService: HttpService, public msgSrv: NzMessageService) {
  }

  ngOnInit() {
    this.loadBizCode('StudentType');
    this.loadBizCode('LeaveType');
    // alert(antlinker.universityCode())
  }

  /*加载bizcode*/
  loadBizCode(code) {
    this.commonService.loadBizCode(code).then(res => {
      if (!res.FeedbackCode) {
        const $_var = `${code}s`;
        this[$_var] = res.Data || [];
      }

    });

  }

  onSearch(reload = false) {
    if (reload) {
      this.page.Page = 1;
    }
    this.searchObj.StartDate = this.datePipe.transform(this.searchObj.antStartDate, 'yyyy-MM-dd');
    this.searchObj.EndDate = this.datePipe.transform(this.searchObj.antEndDate, 'yyyy-MM-dd');
    if (this.searchObj.StartDate > this.searchObj.EndDate) {
      this.msgSrv.info('开始时间不能在结束时间之后！');
      return;
    }
    Object.keys(this.searchObj).forEach(value => {
      this.searchObj[value] = this.searchObj[value] || '';
    });

    this.httpService.POST({
      Router: ServelUrl.Url.leaveList,
      Method: 'POST',
      Body: {
        params: this.searchObj,
        start: this.page.Page - 1,
        limit: this.page.PageSize
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.items;
        this.total = res.total;
      }

    });
  }

  resetForm(form) {
    form.reset();
    this.searchObj.Academy = null;
    this.searchObj.Major = null;
    this.searchObj.Grade = null;
    this.searchObj.Class = null;
  }

  export() {
    this.isDisabled = true;
    this.httpService.postJSON({
      Router: ServelUrl.Url.export,
      Method: 'POST',
      Body: this.searchObj
    }).then(value => {
      this.isDisabled = false;
      if (!value.FeedbackCode) {
        this.msgSrv.success(value.FeedbackText);
       // window.open(value.Data.url);
        var a = document.createElement('a');
        var filename = '请假信息.xlsx';
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


}
