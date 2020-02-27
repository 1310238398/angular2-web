import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-qualityupapprovedetail',
  templateUrl: 'qualityupapprovedetail.html'
})
export class QualityUpApproveDetailPage {

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
    AttachmentCode: '',
    status: ''
  };

  imagepath = [];  //图片

  appStatus = '1';//审批状态  1待审批  2 已审批

  constructor(private navCtrl: NavController, private http: HttpService, private DomSanitizer: DomSanitizer, private HelpUtils: HelpUtils, public navParams: NavParams) { }

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
    console.log(this.dataSet)
  }
  //初始化加载
  ionViewDidEnter() {
    this.loadPathImg();
  }

  //获取图片
  loadPathImg() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetUserAttachmentURL,
      Method: 'POST',
      Body: {
        ids: this.dataSet.AttachmentCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.imagepath = res.Data
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }


  //跳转图片放大
  navPreview(params) {
    this.navCtrl.push('PreviewPage', params)
  }


 //审批提交
 passTabBtn() {

  var fromdata = this.dataObj.input_data;
  fromdata['action'] = "school";
  fromdata['statustxt'] = "学生工作处审批已通过";
  fromdata['status'] = "2";
  fromdata['istrue'] = "true";

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
      }, '1000');
    } else {
      this.HelpUtils.toastPopTop(res);
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
