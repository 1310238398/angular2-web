import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-secondclassroomdetail',
  templateUrl: 'secondclassroomdetail.html'
})
export class SecondClassRoomDetailPage {

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

  appStatus = '1';//审批状态  1待审批  2 已审批
  numdisb = false;
  imagepath = [];  //图片
  operator = ''
  IntelUserCode;
  SubCode = '';
  action = '';
  scorerank = {
    LimitMax: 0,
    LimitMin: 0
  };

  LeaveApply = {
    CustomScore: ''
  }

  VarName = '';
  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, private navCtrl: NavController, ) { }

  ionViewWillEnter() {
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
    this.IntelUserCode = this.navParams.get('dataPass').input_data.IntelUserCode;
    this.SubCode = this.navParams.get('dataPass').input_data.SubCode;
    this.action = this.navParams.get('dataPass').input_data['action'];
    if (this.SubCode) {
      this.loadlimit();

    }
    console.log(this.dataSet)
    console.log(this.appStatus)
    console.log('IntelUserCode', this.IntelUserCode)

  }

  //初始化加载
  ionViewDidEnter() {
    this.loadPathImg();
    this.loadGetIntelUser();
    this.SecondClassSchoolCheck();
  }

  //自定义分数判断
  loadlimit() {
    if (this.action != 'ClassCommittee') {
      return false;
    }

    this.http.postJSON({
      Router: ServelUrl.Url.getcustomscore,
      Method: 'POST',
      Body: {
        Code: this.SubCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.scorerank = res.Data;
        console.log('scorerank', res, this.scorerank);

      } else {
        console.log(res);
      }
    },
      err => console.log(err)
    );

  }

  //审批提交
  passTabBtn() {

    var fromdata = this.dataObj.input_data;
    if (this.dataObj.input_data['action'] == 'studentApply') {
      fromdata['action'] = "ClassCommittee";
      fromdata['statustxt'] = "班委审批已通过";
    } else if (this.dataObj.input_data['action'] == 'ClassCommittee') {
      fromdata['action'] = "Counsellor";
      fromdata['statustxt'] = "辅导员审批已通过";
    }

    if (this.scorerank.LimitMax != 0) {
      if (!this.LeaveApply.CustomScore) {
        this.HelpUtils.toastPopTop('请填写自定义分数');
        return false;
      }

      var reg = /^([1-9]\d*|0)(\.\d{1,2})?$/;
      if (!reg.test(this.LeaveApply.CustomScore)) {
        this.HelpUtils.toastPopTop('请输入合法的格式');
        return false;
      }

      if (Number(this.LeaveApply.CustomScore) > this.scorerank.LimitMax / 100 || Number(this.LeaveApply.CustomScore) < this.scorerank.LimitMin / 100) {
        console.log('CustomScore', this.LeaveApply.CustomScore);
        this.HelpUtils.toastPopTop('自定义分数请参照右边的范围区间！');
        return false;
      }

      fromdata['CustomScore'] = Number(this.LeaveApply.CustomScore) * 100;
      console.log('CustomScore', fromdata['CustomScore']);

    }

    fromdata['status'] = "2";
    fromdata['istrue'] = "true";
    fromdata['operator'] = this.operator

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
        }, 1000);
      } else {
        console.log(res);
        this.numdisb = false;
      }
    },
      err => console.log(err)
    );
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
        console.log(res.FeedbackCode);

      }
    },
      err => console.log(err)
    );
  }

  //获取当前用户
  loadGetIntelUser() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetIntelUser,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.operator = res.Data
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //获取当前用户
  SecondClassSchoolCheck() {
    this.http.postJSON({
      Router: ServelUrl.Url.SecondClassSchoolCheck,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.VarName = res.Data.VarName;
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

  //跳转到拒绝原因页
  notpassTab() {
    this.navCtrl.push('NotPassReasonPage', { dataPass: this.dataObj, appStatus: this.appStatus })
  }



  gosecondclass() {
    const code = this.IntelUserCode;
    // alert(code);

    antlinker.openNewView({
      uri: `ant://h5app/open?URL=` + encodeURIComponent(`nsecondclassroom/#/demo/${code}`),
      fail: function () {
      }
    });


  }






}
