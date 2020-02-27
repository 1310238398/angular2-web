import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HttpService } from "../../../http/http.Service";
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;
@IonicPage()
@Component({
  selector: 'namelist',
  templateUrl: 'namelist.html',
})
export class NameListPage {

  dataSet = []
  isvilible = '';
  sscBox = false; //蒙层

  totalNum = 0; //班级应到人数
  trueNum = 0; //实到人数
  leaveNum = 0;  //请假人数
  lateNum = 0;  //迟到人数
  cutNum = 0;   //旷课人数

  dataPassArr = {
    AcademicTermCode: '',
    AcademicYearCode: '',
    Attendance: '',
    ClassRoom: '',
    CourseName: '',
    IntelUserCode: '',
    RecordID: '',
    Sections: '',
    Week: '',
    WeekTime: '',
    readName: '1', //判断是第一次进入花名册  还是已完成的 1第一次 2 多次  
  }

  mengGo = true;  //加载动画
  pagePass = '';  //从哪个页面进入的

  exitData = {}

  constructor(public navParams: NavParams, private http: HttpService, private HelpUtils: HelpUtils,public navCtrl: NavController,) { }

  ionViewDidEnter() {
    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () {},
      success: function () {},
      trigger: function () {
      }
    });

    this.dataPassArr = this.navParams.get('dataPass');
    this.exitData = this.navParams.get('dataPass');
    this.pagePass = this.navParams.get('pagePass');

    if (this.dataPassArr.readName == '1') {
      this.loadNameFirst();
    } else {
      this.loadNameOver();
    }
  }

  //第一次进入点名册 获取点名前花名册
  loadNameFirst() {
    this.http.postJSON({
      Router: ServelUrl.Url.stulist,
      Method: 'POST',
      Body: {
        courseName: this.dataPassArr.CourseName,
        weekTime: this.dataPassArr.WeekTime,
        week: this.dataPassArr.Week,
        sections: this.dataPassArr.Sections,
        classRoom: this.dataPassArr.ClassRoom,
        academicTermCode: this.dataPassArr.AcademicTermCode,
        academicYearCode: this.dataPassArr.AcademicYearCode,
        teacherIntelUserCode: this.dataPassArr.IntelUserCode,  //IntelUserCode|
      }
    }).then(
      data => {
        this.mengGo = false;
        if (!data.FeedbackCode && data.Data != null) {
          var nowNum = 0;
          for (let i = 0; i < data.Data.length; i++) {
            if (data.Data[i].RecordId == '') {
              data.Data[i]['Status'] = '0'
            } else {
              data.Data[i]['Status'] = '1';
              nowNum++
            }
          }
          this.dataSet = data.Data;
          this.totalNum = this.dataSet.length;
          this.trueNum = this.dataSet.length - nowNum
          this.leaveNum = nowNum;

        }
      },
      err => console.log(err));
  }

  //获取点名后花名册
  loadNameOver() {
    this.http.postJSON({
      Router: ServelUrl.Url.stulisthis,
      Method: 'POST',
      Body: {
        recordID: this.dataPassArr.RecordID,
      }
    }).then(
      data => {
        this.mengGo = false;
        if (!data.FeedbackCode && data.Data != null) {
          this.dataSet = data.Data;
          var qingjiaNum = 0;
          var chidaoNum = 0;
          var kuangkeNum = 0;

          for (let i = 0; i < data.Data.length; i++) {
            if (data.Data[i].Status == '1') {
              qingjiaNum++
            } else if (data.Data[i].Status == '2') {
              chidaoNum++
            } else if (data.Data[i].Status == '3') {
              kuangkeNum++
            }
          }

          this.totalNum = this.dataSet.length; //总人数
          this.trueNum = this.dataSet.length - qingjiaNum - kuangkeNum;   //实到人数
          this.leaveNum = qingjiaNum; //请假人数
          this.lateNum = chidaoNum; //迟到人数
          this.cutNum = kuangkeNum; //旷课人数
        }
      },
      err => console.log(err));
  }

  //出现弹框
  tabBox(obj) {
    if (this.dataPassArr.readName == '1') {
      this.isvilible = obj;
      this.sscBox = true
    }
  }

  //点击遮罩 关闭弹框
  closeTab() {
    this.isvilible = '';
    this.sscBox = false
  }
  //修改出勤状态
  changeStatus(obj1, obj2) {
    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].IntelUserCode == obj1) {
        this.dataSet[i].Status = obj2
      }
    }
    this.isvilible = '';
    this.sscBox = false;

    var totalMen = this.dataSet.length;
    var shidaoMen = 0;
    var qingjiaMen = 0;
    var chidaoMen = 0;
    var kungkeMen = 0;

    for (let i = 0; i < this.dataSet.length; i++) {
      if (this.dataSet[i].Status == '1') {
        qingjiaMen++
      }
      if (this.dataSet[i].Status == '2') {
        chidaoMen++
      }
      if (this.dataSet[i].Status == '3') {
        kungkeMen++
      }
    }

    shidaoMen = totalMen - qingjiaMen - kungkeMen

    this.totalNum = totalMen; //班级总人数
    this.trueNum = shidaoMen; //实到人数
    this.leaveNum = qingjiaMen;  //请假人数
    this.lateNum = chidaoMen;  //迟到人数
    this.cutNum = kungkeMen;   //旷课人数
  }

  //提交 完成与修改
  submitInfo() {
    var dataArr = [];
    var totalMen = this.dataSet.length;
    var shidaoMen = 0;
    var qingjiaMen = 0;
    var chidaoMen = 0;
    var kungkeMen = 0;

    for (let i = 0; i < this.dataSet.length; i++) {
      var dataObj = {}
      dataObj['IntelUserCode'] = this.dataSet[i].IntelUserCode;
      dataObj['RecordID'] = this.dataSet[i].RecordId;
      dataObj['Status'] = this.dataSet[i].Status;
      dataArr.push(dataObj);
      if (this.dataSet[i].Status == '1') {
        qingjiaMen++
      }
      if (this.dataSet[i].Status == '2') {
        chidaoMen++
      }
      if (this.dataSet[i].Status == '3') {
        kungkeMen++
      }
    }

    shidaoMen = totalMen - qingjiaMen - kungkeMen
    var strSpeak = `本堂课应到${totalMen}人,实到${shidaoMen}人,请假${qingjiaMen}人,迟到${chidaoMen}人,旷课${kungkeMen}人`
    this.http.postJSON({
      Router: ServelUrl.Url.savestulist,
      Method: 'POST',
      Body: {
        recordID: this.dataPassArr.RecordID,
        attendance: strSpeak,
        data: dataArr,
      }
    }).then(
      data => {
        if (!data.FeedbackCode && this.pagePass == 'index') {
          this.HelpUtils.toastPopTop('考勤完成');
          var that = this;
          setTimeout(function () {
            that.navCtrl.push('IndexTeacherPage');
          }, '1500');
        } else if (!data.FeedbackCode && this.pagePass == 'history') {
          this.HelpUtils.toastPopTop('修改完成');
          var that = this;
          setTimeout(function () {
            that.navCtrl.push('HistoryRecordPage', {exitData: that.exitData });
          }, '1500');

        } else {
          this.HelpUtils.toastPopTop(data.FeedbackText);
        }
      },
      err => console.log(err));
  }

  changeInfo() {
    this.dataPassArr.readName = '1';
  }

  //点击查看请假单
  lookLeaveList(obj) {
    antlinker.openNewView({
      uri: 'ant://h5app/open?URL=%2fv2qingjia%2f%23%2fmyapplydetailpage%2f' + obj,
      fail: function () {
      }
    });
  }

}
