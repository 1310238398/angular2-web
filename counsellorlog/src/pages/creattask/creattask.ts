import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-creattask',
  templateUrl: 'creattask.html'
})
export class CreatTaskPage {

  //任务类型
  optioncatgray = [];

  forbbien = true;

  searchObj = {
    TaskName: '',
    TaskType: {
      Name: '',
      Code: ''
    },
    TaskTime: '',
  };

  wainTxt = '';   //工作计划提示 (如：XXXX-XXXX学年度第X学期工作计划)
  RecordID = '';

  contInfo = {
    LogTitle: "",
    InsertDatetime: "",
    PublishDatetime: "",
    RecordID: '',
    RecordType: "",
    ReleaseStatus: "",
  }

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, public navCtrl: NavController) { }

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
      title: "工作日志",
      fail: function () { },
      success: function () { }
    });

  }

  //初始化加载
  ionViewDidEnter() {
    this.loadStatus();
    this.searchObj.TaskTime = this.nowDay()
  }

  //任务类型
  loadStatus() {
    this.http.postJSON({
      Router: ServelUrl.Url.bizcode,
      Method: 'POST',
      Body: {
        CodeType: 'counsellorlogcodetype'
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.optioncatgray = res.Data;
      }
    });
  }

  //提交
  tabAlert() {
    if (!this.searchObj.TaskType.Name.trim()) {
      this.HelpUtils.toastPopTop('记录类型不能为空!');
      return
    }

    if (!this.searchObj.TaskName.trim()) {
      this.HelpUtils.toastPopTop('日志标题不能为空!');
      return
    }

    this.http.postJSON({
      Router: ServelUrl.Url.counsellorlogsave,
      Method: 'POST',
      Body: {
        LogTitle: this.searchObj.TaskName,
        RecordType: this.searchObj.TaskType.Code,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.RecordID = res.Data
        this.forbbien = true;
        this.HelpUtils.toastPopTop('创建成功');

        this.contInfo.LogTitle = this.searchObj.TaskName;
        this.contInfo.InsertDatetime = this.nowDay();
        this.contInfo.RecordID = res.Data;
        this.contInfo.ReleaseStatus = '0';

        const that = this;
        setTimeout(function () {
          that.navCtrl.push('LogDetailPage', { contInfo: that.contInfo });
        }, 1200);
      } else {
        console.log(res.FeedbackText);
      }
    })
  }

  //修改显示样式
  changeText() {
    if (this.searchObj.TaskType.Code == '001100') {
      this.wainTxt = '(如：XXXX-XXXX学年度第X学期工作计划)'
    } else if (this.searchObj.TaskType.Code == '001200') {
      this.wainTxt = '(如：XXXX-XXXX学年度第X学期工作总结)'
    } else {
      this.wainTxt = ''
    }

    if (this.searchObj.TaskType.Code != '' && this.searchObj.TaskName.trim()) {
      this.forbbien = false
    } else {
      this.forbbien = true
    }
  }

  //日志标题
  txtChange() {
    if (this.searchObj.TaskType.Name != '' && this.searchObj.TaskName.trim()) {
      this.forbbien = false
    } else {
      this.forbbien = true
    }
  }

  //获取当前日期
  nowDay() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day
  }

  //返回上一页
  goBack() {
    window.history.back();
  }


}
