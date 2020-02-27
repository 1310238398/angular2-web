import { NzMessageService } from 'ng-zorro-antd';
import {HttpService} from 'src/http/http.service';
import {Component, OnInit} from '@angular/core';
import { CommonService } from '../../service/common.service';
import * as moment from 'moment';

@Component({selector: 'app-status-edit', templateUrl: './status-edit.component.html', styleUrls: ['./status-edit.component.less']})
export class StatusEditComponent implements OnInit {
  editCache = {};
  uid;
  dataSet = [];
  departments = [];
  StatusSorts = [];
  constructor(private msg: NzMessageService, private commonService: CommonService, private http: HttpService) {}

  ngOnInit() {
    console.log('uid', this.uid);
   this.onSearch(this.uid);
    // 状态
    this.commonService.loadBizCode('StatusSort').subscribe(res => {
      if (!res.FeedbackCode) {
        this.StatusSorts = res.Data;
      }
    });
    this.commonService.queryAllDepartment().subscribe(res => {
      if (!res.FeedbackCode) {
        this.departments = res.Data || [];
      }
    });
    // 初始查询数据
    // this.onSearch();
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
        Router: '/api/pc/bigdata/querystudentstatus',
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

  startEdit(key: number): void {
    console.log(key);
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
      Router: '/api/pc/bigdata/upstudentstatus',
      Body: {
        recordId: this.dataSet[index].RecordId,
        uid: this.uid,
        statusSort: this.dataSet[index].StatusSortCode,
        reason: this.dataSet[index].Reason,
        departmentCode: this.dataSet[index].DepartmentCode,
        startDate: moment(this.dataSet[index].StartDate).format('YYYY-MM-DD'),
        endDate: moment(this.dataSet[index].EndDate).format('YYYY-MM-DD')
      }
    }).subscribe(res => {
      this.onSearch(this.uid);
      this.commonService.dealBack(res);
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
      StatusSort: null,
      Reason: '',
      RecordId: '',
      DepartmentCode: '',
      key: key,
      StartDate: '',
      EndDate: '',
    }];
    this.updateEditCache();
    this.startEdit(key++);
  }
  onDelete(data) {
    if (data.RecordId) {
      this.http.POST({ Router: '/api/pc/bigdata/delstudentstatus', Body: { recordId: data.RecordId } }).subscribe(res => {
        this.onSearch(this.uid);
        this.commonService.dealBack(res);
      });
    }
  }
}
