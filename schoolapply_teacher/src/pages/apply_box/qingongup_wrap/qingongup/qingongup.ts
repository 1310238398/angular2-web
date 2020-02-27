import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServelUrl } from "../../../../app/ServelUrl";
import { HttpService } from "../../../../http/http.Service";
import { HelpUtils } from "../../../../app/utils/HelpUtils";

declare var antlinker;
@IonicPage()
@Component({
  selector: 'qingongup',
  templateUrl: 'qingongup.html',
})
export class QingongUpPage {

  values = 200;
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
  class = []
  ClassName;
  ClassCode;
  Counselor;

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
      title: "我要申请",
      fail: function () { },
      success: function () { }
    });
    this.item = this.navParams.get('item');
    console.log(this.item)
  }

  //初始化加载
  ionViewDidEnter() {
    this.loadStudentInfo();  //获取个人信息
    this.getclass();
  }

  //获取个人班级
  getclass() {
    console.log('getclassbystu');
    this.http.postJSON({
      Router: ServelUrl.Url.getclass,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.class = res.Data;
        var subclasscode = this.class.map(item => item.ClassCode)
        var subclassname = this.class.map(item => item.ClassName)
        this.ClassName = subclassname.toString();
        this.ClassCode = subclasscode.toString();
        console.log('tttt', this.ClassCode, this.ClassName);

        this.getcounselor();
      } else {
        console.log(res);
      }

    })


  }


  //获取班级的辅导员
  getcounselor() {
    this.http.postJSON({
      Router: ServelUrl.Url.getcounselor,
      Method: 'POST',
      Body: {
        ClassCode: this.ClassCode,
      }

    }).then(res => {
      if (!res.FeedbackCode && res.Data) {
        this.Counselor = res.Data.Counselor;
        console.log('aaasss', this.Counselor);
      } else {
        console.log(res);
      }

    })

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
        console.log('学生信息', this.StudentInfo)
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

    var assignObj = Object.assign(formData, this.StudentInfo);

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
          // this.pushtodo();
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

  //推送待办
  pushtodo() {
    this.http.postJSON({
      Router: ServelUrl.Url.pushtodo,
      Method: 'POST',
      Body: {
        Code: this.Counselor,
      }

    }).then(res => {
      if (!res.FeedbackCode) {
        console.log('推送待办成功');
      } else {
        console.log(res);
      }

    })

  }
  //取消
  cancle() {
    this.navCtrl.push('ApplyListPage');
  }

  //跳转岗位页
  gopartwork() {
    this.navCtrl.push('QingongPartListPage');

  }
  //备注框字数变化
  txtChange(value: string) {
    var valueTxt = value.trim();
    this.values = 200 - valueTxt.length;
    if (this.values != 200) {
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
