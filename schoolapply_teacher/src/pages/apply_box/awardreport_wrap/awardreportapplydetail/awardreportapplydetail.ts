import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { ServelUrl } from "../../../../app/ServelUrl";
import { HttpService } from "../../../../http/http.Service";
import { HelpUtils } from "../../../../app/utils/HelpUtils";


declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-awardreportapplydetail',
  templateUrl: 'awardreportapplydetail.html'
})
export class AwardReportApplyDetailPage {

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

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, private navCtrl: NavController, ) { }

  ionViewWillEnter() {
    // 右上角按钮
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () {},
      fail: function () {},
      trigger: function () {}
    });
    antlinker.configTitle({
      type: "label",
      title: "校园申请",
      fail: function () { },
      success: function () { }
    });
    this.dataObj = this.navParams.get('dataPass');
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









}
