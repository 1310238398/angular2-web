import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'historyrecordstudent',
  templateUrl: 'historyrecordstudent.html',
})
export class HistoryRecordStudentPage {

  dataLenObj = {
    AcademicYearCode: '',           //|AcademicYearCode|字符串|学年代码|
    AcademicTermCode: '',            //|AcademicTermCode|字符串|学期代码|
    AcademicYear: '',            //|AcademicYear|字符串|学年|
    AcademicTerm: '',            //|AcademicTerm|字符串|学期|
    Weeks: '',            //|Weeks|字符串|第几周|
  }

  //时间表
  dataArr = []
  //数据列表
  dataSet = []

  hiddenBox = false;

  dataPass = {
    RecordID: '',
    readName: '2',
    weekNow: '',  //周几 0 1 
    weekCi: '',   //周次
    dataNowTime: '', //选择的日期
    weekNowChina: '',  //周五
    IntelUserCode:'',
    Remark1:''
  }

  haveClassHis = '1'; //有历史纪录

  constructor(private navCtrl: NavController, private http: HttpService, public navParams: NavParams) { }
  //初始化加载
  ionViewDidEnter() {
    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () {},
      success: function () {},
      trigger: function () {}
    });

    this.loadLearnYear();
  }
  //进入页面获取当前学年学期周次
  loadLearnYear() {
    this.http.postJSON({
      Router: ServelUrl.Url.schoolcalendarnowyearterm,
      Method: 'POST',
      Body: {
        Data: ''
      }
    }).then(
      data => {
        if (!data.FeedbackCode && data.Data != null) {
          this.dataLenObj = data.Data;
          this.loadDataTime(); //
        }
      },
      err => console.log(err));
  }

  //获取获取本学期点名日期列表
  loadDataTime() {
    this.http.postJSON({
      Router: ServelUrl.Url.studentAttList,
      Method: 'POST',
      Body: {
        academicYearCode: this.dataLenObj.AcademicYearCode,
        academicTermCode: this.dataLenObj.AcademicTermCode,
      }
    }).then(
      data => {
        if (!data.FeedbackCode && data.Data != null) {
          this.dataArr = data.Data;
          for (let i = 0; i < this.dataArr.length; i++) {
            this.dataArr[i]['WeekChina'] = this.weekSub(this.dataArr[i].Week);
            this.dataArr[i]['checkIs'] = '0'
          }

          if (this.navParams.get('exitData')) {
            this.dataPass = this.navParams.get('exitData');
            for (let i = 0; i < this.dataArr.length; i++) {
              if (this.dataArr[i].WeekTime == this.dataPass.weekCi && this.dataArr[i].Week == this.dataPass.weekNow && this.dataArr[i].Dates == this.dataPass.dataNowTime) {
                this.dataArr[i].checkIs = '1';
              } else {
                this.dataArr[i].checkIs = '0';
              }
            }
          } else {
            this.dataArr[0].checkIs = '1';
            this.dataPass.weekCi = this.dataArr[0].WeekTime;
            this.dataPass.weekNow = this.dataArr[0].Week;
            this.dataPass.dataNowTime = this.dataArr[0].Dates;
            this.dataPass.weekNowChina = this.dataArr[0].WeekChina;
          }
          this.loadClassTable();
        } else {
          this.haveClassHis = '2'
        }
      },
      err => console.log(err));
  }

  //获取历史点名记录
  loadClassTable() {
    this.http.postJSON({
      Router: ServelUrl.Url.studentcourselisthis,
      Method: 'POST',
      Body: {
        academicYearCode: this.dataLenObj.AcademicYearCode,  //学年代码|
        academicTermCode: this.dataLenObj.AcademicTermCode,  //学期代码|
        weekTime: this.dataPass.weekCi,          //周次|
        week: this.dataPass.weekNow,              //周几|
      }
    }).then(
      data => {
        if (!data.FeedbackCode && data.Data != null) {
          this.dataSet = data.Data;
        }
      },
      err => console.log(err));
  }

  //跳转到点名页
  NavigationTo(obj,obj1,obj2) {
    this.dataPass.readName = '2'
    this.dataPass.RecordID = obj;
    this.dataPass.IntelUserCode = obj1;
    this.dataPass.Remark1 = obj2;

    this.navCtrl.push('NameListStudentPage', { dataPass: this.dataPass, pagePass: 'history' });
  }

  //选择日期 刷新当天课表
  loadToday(obj1, obj2, obj3, obj4) {
    this.hiddenBox = false;
    this.dataPass.weekCi = obj1;
    this.dataPass.weekNow = obj2;
    this.dataPass.dataNowTime = obj3;
    this.dataPass.weekNowChina = obj4;

    this.loadClassTable();
    for (let i = 0; i < this.dataArr.length; i++) {
      if (this.dataArr[i].WeekTime == obj1 && this.dataArr[i].Week == obj2 && this.dataArr[i].Dates == obj3) {
        this.dataArr[i].checkIs = '1';
      } else {
        this.dataArr[i].checkIs = '0';
      }
    }
  }

  //打开日期框
  openBox() {
    this.hiddenBox = true;
  }

  //关闭日期框
  closeTab() {
    this.hiddenBox = false;
  }

  //计算今天是周几
  weekSub(obj) {
    switch (obj) {
      case '0':
        return '周日'
      case '1':
        return '周一'
      case '2':
        return '周二'
      case '3':
        return '周三'
      case '4':
        return '周四'
      case '5':
        return '周五'
      case '6':
        return '周六'
      default:
        return '日期错误'
    }
  }

}
