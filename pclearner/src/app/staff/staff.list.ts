import { Component, OnInit } from '@angular/core';
import { NzMessageService } from "ng-zorro-antd";
import { HttpService } from "../../http/http.service";
import { StaffEditComponent } from "./edit/staff.edit.component";
import { ModalHelper } from "../shared/helper/modal.helper";
import { ServelUrl } from "../ServelUrl";
import { CommonService } from "../service/common.service";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.list.html',
  styleUrls: ['staff.list.css']
})
export class StaffListComponent implements OnInit {
  dataSet = [];
  StaffTypes = [];
  Departments = [];
  searchObj = {
    UserCode: '',
    Name: '',
    UserType: '',
    Department: ''
  };
  page = {
    Page: 1,
    PageSize: 40,
  };
  total = 0;
  UserTypes = [];

  constructor(private commonService: CommonService,
    public httpService: HttpService,
    public msgSrv: NzMessageService,
    private modalHelper: ModalHelper) {
  }

  ngOnInit() {

    this.loadBizCode('StaffType');
    this.loadDepartment();
  }

  onSearch(reload = false) {
    if (reload) {
      this.page.Page = 1
    }
    console.log(this.searchObj);
    this.httpService.POST({
      Router: ServelUrl.Url.getStaffList,
      Method: 'POST',
      Body: {
        params: {
          UserCode: this.searchObj.UserCode ? this.searchObj.UserCode.trim() : '',
          Name: this.searchObj.Name ? this.searchObj.Name.trim() : '',
          UserType: this.searchObj.UserType,
          Department: this.searchObj.Department
        },
        start: this.page.Page - 1,
        limit: this.page.PageSize
      }
    }).subscribe(res => {
      if (!res.FeedbackCode) {
        this.dataSet = res.items;
        this.total = res.total;
      }
    })
  }
  /*加载bizcode*/
  loadBizCode(code) {
    this.commonService.loadBizCode(code).then(res => {
      if (!res.FeedbackCode) {
        let $_var = `${code}s`;
        this[$_var] = res.Data || [];
      }

    });
  }
  loadDepartment() {
    //departmentinit
    this.httpService.postJSON({
      Router: ServelUrl.Url.getdepartment,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Departments = res.Data || [];
      }

    });
  }

  resetForm(form) {
    form.reset();
  }

  edit(data = '') {
    this.modalHelper.open(StaffEditComponent, { data }).subscribe(() => {
      this.onSearch();
      //this.msgSrv.info('修改成功');
    });
  }
  deleteStaff(code) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.staffdelete,
      Method: 'POST',
      Body: {
        UserCode: code,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.onSearch();
        this.msgSrv.success(res.FeedbackText);
      } else {
        this.msgSrv.warning(res.FeedbackText);
      }
    });
  }
  resetPassWord(code) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.resetsaffpassword,
      Method: 'POST',
      Body: {
        IntelUserCode: code,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.onSearch();
        this.msgSrv.success(res.FeedbackText);
      } else {
        this.msgSrv.warning(res.FeedbackText);
      }
    });
  }
}
