import { NzMessageService } from 'ng-zorro-antd';
import {HttpService} from 'src/http/http.service';
import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import * as moment from 'moment';
import { CommonService } from '../../service/common.service';

// tslint:disable-next-line:max-line-length
@Component({selector: 'app-punishment-edit', templateUrl: './punishment-edit.component.html', styleUrls: ['./punishment-edit.component.less']})
export class PunishmentEditComponent implements OnInit {
  data;
  AllDepartment = [];
  params = {
    recordId: '',
    uid: '',
    academicYear: null,
    academicTerm: null,
    punishmentDate: '',
    punishmentSort: null,
    punishmentType: null,
    punishmentReason: null,
    departmentCode: null,
    punishmentFileNo: '',
    punishmentTerm: null,
    punishmentStatus: null,
    detailDescription: '',
    RemovePunishmentFileNo: ''
  };

  constructor(private commonService: CommonService, private msg: NzMessageService, private modal: NzModalRef, private http: HttpService) {}

  ngOnInit() {
    console.log(this.data);
    this.commonService.queryAllDepartment().subscribe(res => {
      if (!res.FeedbackCode) {
        this.AllDepartment = res.Data || [];
      }
    });
    if (this.data) {
      this.params.recordId = this.data.spmRecordId || '';
      this.params.uid = this.data.uid || '';
      this.params.academicYear = this.data.spmAcademicYear || '';
      this.params.academicTerm = this.data.spmAcademicTerm || '';
      this.params.punishmentDate = this.data.spmPunishmentDate || '';
      this.params.punishmentSort = this.data.spmPunishmentSort || '';
      this.params.punishmentType = this.data.spmPunishmentType || '';
      this.params.punishmentReason = this.data.spmPunishmentReason || '';
      this.params.departmentCode = this.data.spmDepartmentCode || '';
      this.params.punishmentFileNo = this.data.spmPunishmentFileNo || '';
      this.params.punishmentTerm = this.data.spmPunishmentTerm || '';
      this.params.punishmentStatus = this.data.spmPunishmentStatus || '';
      this.params.detailDescription = this.data.spmDetailDescription || '';
      this.params.RemovePunishmentFileNo = this.data.spmRemovePunishmentFileNo || '';

    }
  }

  save() {
    this.params.punishmentDate = moment(this.params.punishmentDate).format('YYYY-MM-DD');
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/upstudentpunishment',
        Body: this.params
      })
      .subscribe(res => {
        if (!res.FeedbackCode) {
          this.modal.destroy();
          this.msg.success(res.FeedbackText);
        } else {
          this.msg.error(res.FeedbackText);
        }
      });
    console.log(this.params);
  }
  close() {
    this
      .modal
      .destroy();
  }
}
