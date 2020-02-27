import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-notpassreason',
  templateUrl: 'notpassreason.html'
})
export class NotPassReasonPage {

  values = 50;
  numdisb = true;
  remarktxt = '';

  dataObj = {
    flow_code: '',
    flow_id: '',
    flow_name: '',
    id: 0,
    input_data: {},
    is_back: false,
    launch_time: '',
    launcher: '',
    launcher_name: '',
    node_instance_id: '',
    out_data: '',
    processor: '',
    processor_name: '',
    processor_time: '',
    record_id: '',
    status: 0,
    status_text: '',
    title: '',
  };

  dataSet = {
    action: '',
    title: '',
    filetext: '',
    timestart: '',
    statustxt: '',
    status: ''
  };

  appStatus = ''

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, private navCtrl: NavController) { }

  ionViewWillEnter() {
    antlinker.configTitle({
      type: "label",
      title: "校园申请",
      fail: function () { },
      success: function () { }
    });
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
    this.dataObj = this.navParams.get('dataPass');
    this.appStatus = this.navParams.get('appStatus');
    this.dataSet = this.navParams.get('dataPass').input_data;

    console.log(this.dataObj)

  }

  notpassTab() {

    var fromdata = this.dataObj.input_data;
    fromdata['action'] = "counsellor";
    fromdata['statustxt'] = "辅导员审批不通过";
    fromdata['status'] = "3";
    fromdata['istrue'] = "false";
    fromdata['remarktxt'] = this.remarktxt;

    this.numdisb = true;

    this.http.postFLOW({
      Router: ServelUrl.Url.starthandle,
      Method: 'POST',
      Body: {
        record_id: this.dataObj.node_instance_id,
        form_data: JSON.stringify(fromdata)
      }
    }).then(res => {
      if (res == 'ok') {
        this.HelpUtils.toastPop('提交成功');
        const that = this;
        setTimeout(function () {
          that.navCtrl.push('IndexApprovePage');
          that.numdisb = false;
        }, '1000');
      } else {
        console.log(res);
        this.numdisb = false;
      }
    },
      err => console.log(err)
    );
  }

  exitpage() {

    if (this.dataObj.flow_code == 'Process_college_good_member' || this.dataObj.flow_code == 'Process_college_class_advanced_class_group' || this.dataObj.flow_code == 'Process_college_three_good' || this.dataObj.flow_code == 'Process_excellent_cadre_at_the_college_level' || this.dataObj.flow_code == 'Process_excellent_student_cadre' ) {
      this.navCtrl.push('ThreeGoodDetailPage', { dataPass: this.dataObj, appStatus: this.appStatus });
    } else if (this.dataObj.flow_code == 'Process_Prize') {
      this.navCtrl.push('AwardReportDetailPage', { dataPass: this.dataObj, appStatus: this.appStatus });
    }else if (this.dataObj.flow_code == 'Process_assessment_plus_information_report') {
      this.navCtrl.push('QualityUpApproveDetailPage', { dataPass: this.dataObj, appStatus: this.appStatus });
    }else if (this.dataObj.flow_code == 'Process_New_Stu_Information_Approval') {
      this.navCtrl.push('NewStudentInfoDetailPage', { dataPass: this.dataObj, appStatus: this.appStatus });
    }
  }


  //备注框字数变化
  txtChange(value: string) {
    var valueTxt = value.trim();
    this.values = 50 - valueTxt.length;
    if (this.values != 50) {
      this.numdisb = false;
    } else {
      this.numdisb = true;
    }
  }





}
