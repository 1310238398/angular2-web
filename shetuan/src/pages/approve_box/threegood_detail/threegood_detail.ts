import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";
declare var antlinker;

@IonicPage()
@Component({
  selector: 'threegood_detail',
  templateUrl: 'threegood_detail.html'
})
export class ThreeGoodDetailPage {

  
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
  }; //整体数据
  dataSet = {
    action: '',
    title: '',
    filetext: '',
    timestart: '',
    statustxt: '',
    status: ''
  };

  appStatus = '1';//审批状态  1待审批  2 已审批
  numdisb = false;

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, private navCtrl: NavController) { }
  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
  }
  //初始化加载
  ionViewDidEnter() {
    this.dataObj = this.navParams.get('dataPass');
    this.appStatus = this.navParams.get('appStatus');
    this.dataSet = this.navParams.get('dataPass').input_data;
    console.log(this.dataSet)
    console.log(this.appStatus)
  }

  //审批提交
  passTabBtn() {

    var fromdata = this.dataObj.input_data;
    fromdata['action'] = "counsellor";
    fromdata['statustxt'] = "辅导员审批已通过";
    fromdata['status'] = "2";
    fromdata['istrue'] = "true";

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
        this.HelpUtils.toastPopTop('审批成功');
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

  //跳转到拒绝原因页
  notpassTab() {
    this.navCtrl.push('NotPassReasonPage', { dataPass: this.dataObj, appStatus: this.appStatus })
  }









}
