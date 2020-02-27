import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {

  dataLenObj = {
    AcademicYearCode: '',           //|AcademicYearCode|字符串|学年代码|
    AcademicTermCode: '',            //|AcademicTermCode|字符串|学期代码|
    AcademicYear: '',            //|AcademicYear|字符串|学年|
    AcademicTerm: '',            //|AcademicTerm|字符串|学期|
    Weeks: '',            //|Weeks|字符串|第几周|
  }

  dataSet = []
  weekNow = '';  //今天周几
  dataNowTime = '';  //当前日期
  haveClass = '1'; //今天有课程

  constructor(private navCtrl: NavController, private http: HttpService, ) { }

  //初始化加载
  ionViewWillEnter() {
    this.loadLearnYear();
    this.weekNow = this.weekSub(); //
    this.dataNowTime = this.dataTime();
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
          this.loadClassTable();
        }
      },
      err => console.log(err));
  }

  //进入页面获取当天的课程表
  loadClassTable() {
    var AliboNum = String(new Date().getDay());
    this.http.postJSON({
      Router: ServelUrl.Url.studentcourselist,
      Method: 'POST',
      Body: {
        academicYearCode: this.dataLenObj.AcademicYearCode,  //学年代码|
        academicTermCode: this.dataLenObj.AcademicTermCode,  //学期代码|
        weekTime: this.dataLenObj.Weeks,          //周次|
        week: AliboNum,              //周几|
      }
    }).then(
      data => {
        if (!data.FeedbackCode && data.Data != null) {
          this.haveClass = '1'
          for (let i = 0; i < data.Data.length; i++) {
            if (data.Data[i].Attendance == '') {
              data.Data[i]['readName'] = '1'
            } else {
              data.Data[i]['readName'] = '2'
            }
          }
          this.dataSet = data.Data;
        } else {
          this.haveClass = '2'
        }
      },
      err => console.log(err));
  }

  //跳转到点名页
  NavigationTo(obj) {
    this.navCtrl.push('NameListPage', { dataPass: obj, pagePass: 'index' });
  }

  //跳转到创建考勤页
  NavtoCreatPage() {
    this.navCtrl.push('CreatRecordPage', { dataLenObj: this.dataLenObj,index:'1'});
  }

  //跳转到历史页
  NavtoChange() {
    this.navCtrl.push('HistoryRecordPage');
  }

  //计算今天是周几
  weekSub() {
    var day = new Date().getDay(),
      text = "";
    switch (day) {
      case 0:
        text = "周日";
        break;
      case 1:
        text = "周一";
        break;
      case 2:
        text = "周二";
        break;
      case 3:
        text = "周三";
        break;
      case 4:
        text = "周四";
        break;
      case 5:
        text = "周五";
        break;
      case 6:
        text = "周六";
        break;
    }
    return text;
  }
  //计算月日
  dataTime() {
    const Dates = new Date();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return month + '-' + day
  }




}
