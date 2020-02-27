import { NzMessageService } from 'ng-zorro-antd';
import {HttpService} from 'src/http/http.service';
import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import * as moment from 'moment';
import { CommonService } from '../../service/common.service';
import { ERROR_COLLECTOR_TOKEN } from '@angular/platform-browser-dynamic/src/compiler_factory';

// tslint:disable-next-line:max-line-length
@Component({selector: 'app-safetyincident-edit', templateUrl: './safetyincident-edit.component.html', styleUrls: ['./safetyincident-edit.component.less']})
export class SafetyincidentEditComponent implements OnInit {
  data;
  PlaceTypes = [];
  PlaceTypeDetails = [];
  incidentModes = [];
  IncidentTypes = [];
  params = {
    recordId: '',
    uid: '',
    incidentDate: '', // 	事故日期
    incidentAreaCode: '', // 	事故地址代码
    incidentDetailAddress: '', // 	事故详细地址
    incidentDetail: '', // 	事故详情
    dateType: null, // 	日期性质
    placeType: null, // 	地点性质
    placeTypeDetail: '', // 	详细地点性质
    incidentType: null, // 	事故性质
    incidentMode: null, // 	事故方式
    incidentResult: null, // 	事故结果
    dealDetail: null, // 	处置情况
    compensation: '', // 	赔偿情况
    humanitarianAid: '', // 	人道主义援助
    consultation: '', // 	心理疏导
    otherMeasures: '', // 	其它措施
  };
  incidentAreaCodeObj = {
    sheng: null,
    shi: null,
    xian: null
  };
  constructor(private commonService: CommonService, private msg: NzMessageService, private modal: NzModalRef, private http: HttpService) {}

  ngOnInit() {
    console.log(this.data);
    this.commonService.loadBizCode('PlaceType').subscribe(res => {
      if (!res.FeedbackCode) {
        this.PlaceTypes = res.Data || [];
      }
    });
    this.commonService.loadBizCode('IncidentType').subscribe(res => {
      if (!res.FeedbackCode) {
        this.IncidentTypes = res.Data || [];
      }
    });
    if (this.data) {
      this.incidentAreaCodeObj = this.commonService.getAreaObj(this.params.incidentAreaCode);
      this.params.recordId = this.data.ssiRecordId || '';
      this.params.uid = this.data.uid || '';
      this.params.incidentDate = this.data.ssiIncidentDate || '';
      this.params.incidentAreaCode = this.data.ssiIncidentAreaCode || '';
      this.params.incidentDetailAddress = this.data.ssiIncidentDetailAddress || '';
      this.params.incidentDetail = this.data.ssiIncidentDetail || '';
      this.params.dateType = this.data.ssiDateType || '';
      this.params.placeType = this.data.ssiPlaceType || '';
      this.change(this.params.placeType, 'placeType');
      this.params.placeTypeDetail = this.data.ssiPlaceTypeDetail || '';
      this.params.incidentType = this.data.ssiIncidentType || '';
      this.change(this.params.incidentType, 'IncidentType');
      this.params.incidentMode = this.data.ssiIncidentMode || '';
      this.params.incidentResult = this.data.ssiIncidentResult || '';
      this.params.dealDetail = this.data.ssiDealDetail || '';
      this.params.consultation = this.data.ssiConsultation || '';
      this.params.compensation = this.data.ssiCompensation || '';
      this.params.humanitarianAid = this.data.ssiHumanitarianAid || '';
      this.params.otherMeasures = this.data.ssiOtherMeasures || '';
    }
  }
  change(value, type) {
    console.log('change', value);
    this.commonService.parametercascadeinit(value).subscribe(res => {
      if (!res.FeedbackCode) {
        switch (type) {
          case 'placeType':
            this.PlaceTypeDetails = res.Data || [];
            if (this.data.ssiPlaceTypeDetail) {
              this.params.placeTypeDetail = this.data.ssiPlaceTypeDetail;
            } else {
              this.params.placeTypeDetail = null;
            }
            break;
          case 'IncidentType':
            this.incidentModes = res.Data || [];
            this.params.incidentMode = null;
            if (this.data.ssiIncidentMode) {
              this.params.incidentMode = this.data.ssiIncidentMode;
            } else {
              this.params.incidentMode = null;
            }
            break;
        }
      }
    });

  }
  save() {
     this.params.incidentDate = moment(this.params.incidentDate).format('YYYY-MM-DD');
    this.params.incidentAreaCode = this.incidentAreaCodeObj.xian;
    this
      .http
      .POST({
        Router: '/api/pc/bigdata/upstudentsafetyincident',
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
