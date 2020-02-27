import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServelUrl } from "../../../../app/ServelUrl";
import { HttpService } from "../../../../http/http.Service";
import { HelpUtils } from "../../../../app/utils/HelpUtils";

declare var antlinker;
@IonicPage()
@Component({
  selector: 'personalapply_creat',
  templateUrl: 'personalapply_creat.html',
})
export class PersonalApplyCreatPage {

  values = 3000;
  numdisb = true;
  filetext = ''; //输入内容
  item = {
    code: '',
    memo: '',
    name: '',
    record_id: ''
  };

  timeNow = this.nowDay();

  StudentInfo = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
    antlinker.configTitle({
      type: "label",
      title: "校园申请",
      fail: function () { },
      success: function () { }
    });
    this.item = this.navParams.get('item');
    console.log(this.item)
  }

  //初始化加载
  ionViewDidEnter() {
    this.loadStudentInfo();  //获取个人信息
  }

  //获取个人信息
  loadStudentInfo() {
    this.http.postJSON({
      Router: ServelUrl.Url.GetStudentInfo,
      Method: 'POST',
      Body: {
        uid: '',
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.StudentInfo = res.Data
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //提交申请
  setcokie() {
    var formData = {
      action: "studentApply",
      title: this.item.name,
      filetext: this.filetext,
      timestart: this.timeNow,
      statustxt: '辅导员审批进行中',
      status: '1',
    }

    var assignObj = Object.assign(formData,this.StudentInfo);

    this.numdisb = true;

    this.http.postFLOW({
      Router: ServelUrl.Url.launch,
      Method: 'POST',
      Body: {
        flow_id: '',
        flow_code: this.item.code,
        form_data: JSON.stringify(assignObj)
      }
    }).then(
      comments => {
        if (comments == 'ok') {
          this.HelpUtils.toastPopTop('提交成功');
          const that = this;
          setTimeout(function () {
            that.navCtrl.push('IndexApplyPage');
            this.numdisb = false;
          }, 1000);
        } else {
          this.HelpUtils.toastPopTop(comments.FeedbackText);
        }
      });
  }


  //备注框字数变化
  txtChange(value: string) {
    var valueTxt = value.trim();
    this.values = 3000 - valueTxt.length;
    if (this.values != 3000) {
      this.numdisb = false;
    } else {
      this.numdisb = true;
    }
  }

  //获取日期
  nowDay() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day
  }




}
