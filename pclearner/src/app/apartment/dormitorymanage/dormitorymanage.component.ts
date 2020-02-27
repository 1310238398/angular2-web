import { Component, OnInit } from '@angular/core';
import { ServelUrl } from "../../ServelUrl";
import { HttpService } from "../../../http/http.service";
import { CommonService } from "../../service/common.service";
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";
@Component({
  selector: 'app-dormitorymanage',
  templateUrl: './dormitorymanage.component.html',
  styleUrls: ['./dormitorymanage.component.css']
})
export class DormitorymanageComponent implements OnInit {

  isVisible = false;
  isOnlyVisible = false;
  dataSet = [];
  LeaveTypes = [];
  UseStatuss = [
    { ItemCode: '1', 'ItemName': '可用' },
    { ItemCode: '2', 'ItemName': '不可用' },
  ];
  searchObj = {
    Campus: '',
    Dormitory: '',
    Number: '',
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

  }

  resetForm(form) {
    form.reset();
  }
  // 修改宿舍状态
  edit(data='') {

  }

  // 宿舍详细信息
  details() {
    this.isOnlyVisible = true;
  }
  handleOnlyCancel(e) {
    this.isOnlyVisible = false;
  }
  handleOnlyOk(e) {
    this.isOnlyVisible = false;
  }
  // 添加宿舍
  add() {
    this.isVisible = true;
  }
  handleCancel(e) {

    this.isVisible = false;
  }
  handleOk(e) {
    this.isVisible = false;

  }

  


}

