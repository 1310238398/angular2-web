import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {HttpService} from 'src/http/http.service';
import {Component, OnInit} from '@angular/core';
import { CommonService } from '../../service/common.service';
import * as moment from 'moment';

@Component({selector: 'app-cadre-edit', templateUrl: './cadre-edit.component.html', styleUrls: ['./cadre-edit.component.less']})
export class CadreEditComponent implements OnInit {
  editCache = {};
  uid;
  dataSet = [];
  DepartmentOfDutys = [];
  Dutys = [];
  DutyStatuss=[];
  constructor( private modal: NzModalRef, private msg: NzMessageService, private commonService: CommonService, private http: HttpService) {}

  ngOnInit() {
    console.log('uid', this.uid);
    // 初始查询数据
    this.onSearch(this.uid);
   /*  this.modal.afterClose.subscribe(res => {
      this.modal.destroy({name: ''});
    }); */
    // 职务单位
    this.commonService.loadBizCode('DepartmentOfDuty').subscribe(res => {
      if (!res.FeedbackCode) {
        this.DepartmentOfDutys = res.Data;
      }
    });
    // 任职状态
    this.commonService.loadBizCode('CadresDutyStatus').subscribe(res => {
      if (!res.FeedbackCode) {
        this.DutyStatuss = res.Data;
      }
    });
    this.updateEditCache();
  }

  /**
   * 初始化数据
   * @param _value
   */
  onSearch(uid) {
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/querystudentcadres',
        Body: {
          uid: uid
        }
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
            this.dataSet = res.Data || [];
            this.dataSet.forEach((data, index) => {
              data.key = index;
            });
            this.updateEditCache();
        } else {
          console.log(res.Data.FeedbackText);
        }
      });
  }

  change(value) {
    if (value) {
      this.commonService.parametercascadeinit(value).subscribe(res => {
        if (!res.FeedbackCode) {
          this.Dutys = res.Data || [];
        }
      });
    }
  }
  startEdit(key: number): void {
    console.log(key);
    this.change(this.editCache[key].data.DepartmentOfDutyCode);
    this.editCache[key].edit = true;
  }

  cancelEdit(key: number): void {
    this.editCache[key].edit = false;
    this.onSearch(this.uid);
  }

  saveEdit(key: number): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[index] = this.editCache[key].data;
    if (!this.dataSet[index].RecordId) {
       this.dataSet[index].RecordId = '';
      // delete this.dataSet[index].RecordId;
    }
    this.http.POST({
      Router: '/api/pc/bigdata/upstudentcadres',
      Body: {
        recordId: this.dataSet[index].RecordId,
        uid: this.uid, departmentOfDuty: this.dataSet[index].DepartmentOfDutyCode,
        duty: this.dataSet[index].DutyCode,
        dutyStatus: this.dataSet[index].DutyStatus,
        startDate: moment(this.dataSet[index].StartDate).format('YYYY-MM-DD'),
        endDate: moment(this.dataSet[index].EndDate).format('YYYY-MM-DD')
      }
    }).subscribe(res => {
      this.commonService.dealBack(res);
      this.onSearch(this.uid);
    });
    this.editCache[key].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      this.editCache[item.key] = {
        edit: false,
        data: item
      };
    });
  }
  onAdd() {
    const index = (this.dataSet.length - 1) > 0 ? (this.dataSet.length - 1) : 0;
    if (this.dataSet.length > 0 && !this.dataSet[index].RecordId) {
      this.msg.warning('记录尚未保存');
      return;
    }
    let key = index + 1;
    this.dataSet = [...this.dataSet, {
      DepartmentOfDutyCode: null,
      DepartmentOfDuty: '',
      RecordId: '',
      DutyCode: null,
      Duty: '',
      DutyStatus:null,
      DutyStatusName:'',
      key: key,
      StartDate: '',
      EndDate: '',
    }];
    this.updateEditCache();
    this.startEdit(key++);
  }
  onDelete(data) {
    if (data.RecordId) {
      this.http.POST({ Router: '/api/pc/bigdata/delstudentcadres', Body: { recordId: data.RecordId } }).subscribe(res => {
        this.commonService.dealBack(res);
        this.onSearch(this.uid);
      });
    }
  }
}
