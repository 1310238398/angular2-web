import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";
declare var antlinker;

@IonicPage()
@Component({
  selector: 'shetuanup_detail',
  templateUrl: 'shetuanup_detail.html'
})
export class SheTuanUpDetailPage {


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
    this.dataSet = this.navParams.get('dataPass').input_data;

    console.log('a',this.dataObj)
    console.log('b',this.dataSet)
    console.log(this.dataObj.input_data, '1111111')
  }


}
