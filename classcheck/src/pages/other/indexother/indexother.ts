import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HttpService } from "../../../http/http.Service";
import { ServelUrl } from "../../../app/ServelUrl";

declare var antlinker;
@IonicPage()
@Component({
  selector: 'indexother',
  templateUrl: 'indexother.html',
})
export class IndexOtherPage {

  //双向绑定参数
  topTitle = {
    waitShell: 'yes-css',   //样式切换
    overShell: 'not-css',   //样式切换
    titleChange: false,     //缺勤记录 与 考勤统计切换
    AcademicYearCode: '',   //学年代码|
    AcademicTermCode: '',   //学期代码|
    AcademicYear: '',       //学年|
    AcademicTerm: '',       //学期|
    weekTime: '',           //第几周  21
    dataNowTime: '',        //时间 03-09
    weekNowChina: '',       //周几  周三
    weekNowEnglish: String(new Date().getDay()), //周几  3
    startTime: '',    //开始节数
    endTime: '',      //结束节数
    qingJiaCode: true,    //是否选中请假代码
    kuangKeCode: true,    //是否选中旷课代码
    qingJia: '1',    //是否选中请假
    kuangKe: '3',    //是否选中旷课
    moreData: true,   //显示与隐藏加载更多 数据下拉加载
    moreRili: true,   //显示与隐藏加载更多 日历下拉加载
    Page: 1,          //初始页 数据下拉加载
    riliPage: 1,      //初始页 日历下拉加载
    PageNo: 20,       //每页条数
    dayNow: String(new Date().getDay()), //今天是周几
    hiddenBox: false, //日历时间框
    Total: 0,       //缺勤记录条数
    emptyData: false,   //是否显示空页面
    wainTxt: '暂无缺勤记录',   //文本
  }

  dataArr = [];//日历表
  dataRecordList = [];//缺勤记录列表
  dataNameList = [];//考勤统计列表

  constructor(public navParams: NavParams, private http: HttpService, public navCtrl: NavController) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () { },
      success: function () { },
      trigger: function () { }
    });
    

    if(this.dataRecordList.length == 0 && this.dataNameList.length == 0){
      this.loadLearnYear();
    }

    if(this.dataNameList.length != 0){
      this.topTitle.emptyData = false;
    }

    this.topTitle.weekNowChina = this.weekSub(this.topTitle.dayNow);
    this.topTitle.dataNowTime = this.dataTime();
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
          this.topTitle.AcademicYearCode = data.Data.AcademicYearCode;
          this.topTitle.AcademicTermCode = data.Data.AcademicTermCode;
          this.topTitle.AcademicYear = data.Data.AcademicYear;
          this.topTitle.AcademicTerm = data.Data.AcademicTerm;
          this.topTitle.weekTime = data.Data.Weeks;
          this.loadClassTable();
          this.loadDataTime();
        }
      },
      err => console.log(err));
  }
  //进入页面获取缺勤记录
  loadClassTable() {
    this.http.postJSON({
      Router: ServelUrl.Url.getabsentsearchlist,
      Method: 'POST',
      Body: {
        schoolyear: this.topTitle.AcademicYearCode,  //学年代码|
        schoolterm: this.topTitle.AcademicTermCode,  //学期代码|
        weektime: this.topTitle.weekTime,            //周次|
        week: this.topTitle.weekNowEnglish,          //周几 3
        startsections: this.topTitle.startTime,
        endsections: this.topTitle.endTime,
        leave: this.topTitle.qingJia,
        absent: this.topTitle.kuangKe,
        pageindex: this.topTitle.Page,
        pagesize: this.topTitle.PageNo
      }
    }).then(
      res => {
        if (!res.FeedbackCode && res.Data.items.length > 0) {
          for (let i = 0; i < res.Data.items.length; i++) {
            var tempArr = res.Data.items[i].Sections.split(",");
            var sect1 = tempArr[0];
            var sect2 = tempArr[tempArr.length - 1];
            res.Data.items[i].Sections = sect1 + '-' + sect2
          }
          this.dataRecordList = this.dataRecordList.concat(res.Data.items);
          this.topTitle.Total = res.Data.total;
          this.topTitle.moreData = true;
          this.topTitle.emptyData = false;
        } else if (!res.FeedbackCode && res.Data.items.length == 0 && res.Data.total != 0) {
          this.topTitle.moreData = false;
        } else if (!res.FeedbackCode && res.Data.items.length == 0 && res.Data.total == 0) {
          this.topTitle.Total = res.Data.total;
          this.dataRecordList = [];
          this.topTitle.moreData = false;
          this.topTitle.emptyData = true;
        } else {
          console.log(res.FeedbackText)
        }
      },
      err => console.log(err));
  }
  //获取缺勤日历
  loadDataTime() {
    this.http.postJSON({
      Router: ServelUrl.Url.getabsentrecord,
      Method: 'POST',
      Body: {
        schoolyear: this.topTitle.AcademicYearCode,  //学年代码|
        schoolterm: this.topTitle.AcademicTermCode,  //学期代码|
        pageindex: this.topTitle.riliPage,
        pagesize: this.topTitle.PageNo
      }
    }).then(
      res => {
        if (!res.FeedbackCode && res.Data.items.length > 0) {
          for (let i = 0; i < res.Data.items.length; i++) {
            res.Data.items[i]['Dates'] = res.Data.items[i].days.substring(res.Data.items[i].days.length - 5, res.Data.items[i].days.length);
          }
          this.dataArr = this.dataArr.concat(res.Data.items);
          this.topTitle.moreRili = true;
        } else {
          this.topTitle.moreRili = false;
        }
      },
      err => console.log(err));
  }
  //选择日期 刷新当天课表
  loadToday(obj) {
    this.topTitle.hiddenBox = false;

    this.topTitle.dataNowTime = obj.Dates;
    this.topTitle.weekNowChina = obj.week;
    this.topTitle.weekTime = obj.weektime;

    this.topTitle.weekTime = obj.weektime;            //周次|
    this.topTitle.weekNowEnglish = obj.numweek;         //周几 3
    this.topTitle.startTime = '';
    this.topTitle.endTime = '';
    this.topTitle.qingJiaCode = true;
    this.topTitle.kuangKeCode = true;
    this.topTitle.qingJia = '1';
    this.topTitle.kuangKe = '3';
    this.topTitle.Page = 1;
    this.dataRecordList = [];

    this.loadClassTable();
    for (let i = 0; i < this.dataArr.length; i++) {
      if (this.dataArr[i] == obj) {
        this.dataArr[i].checkIs = '1';
      } else {
        this.dataArr[i].checkIs = '0';
      }
    }
  }
  //==============考勤统计ts==================

  //获取考勤统计数据
  loadCheckTotal() {
    this.http.postJSON({
      Router: ServelUrl.Url.getthissemesterattendancestatistics,
      Method: 'POST',
      Body: {
        schoolyear: this.topTitle.AcademicYearCode,  //学年代码|
        schoolterm: this.topTitle.AcademicTermCode,  //学期代码|
        pageindex: this.topTitle.Page,
        pagesize: this.topTitle.PageNo
      }
    }).then(
      res => {
        if (!res.FeedbackCode) {
          if (!res.FeedbackCode && res.Data.items.length > 0) {
            this.dataNameList = this.dataNameList.concat(res.Data.items);
            this.topTitle.moreData = true;
            this.topTitle.emptyData = false;
          } else if (!res.FeedbackCode && res.Data.items.length == 0 && res.Data.total != 0) {
            this.topTitle.moreData = false;
          } else if (!res.FeedbackCode && res.Data.items.length == 0) {
            this.topTitle.moreData = false;
            this.topTitle.emptyData = true;
          } else {
            console.log(res.FeedbackText)
          }
        }
      },
      err => console.log(err));
  }

  //进入详情页
  gotoOtherDetail(obj1, obj2, ) {
    this.navCtrl.push('OtherDetailPage', { IntelUserCode: obj1, checkStatus: obj2, schoolyear: this.topTitle.AcademicYearCode, schoolterm: this.topTitle.AcademicTermCode });
  }

  //缺勤 记录下拉刷新
  doInfinite(infiniteScroll) {
    if (!this.topTitle.titleChange) {
      this.topTitle.Page++
      this.loadClassTable();
    } else {
      this.topTitle.Page++
      this.loadCheckTotal();
    }
    infiniteScroll.complete();
  }
  //日历下拉刷新
  riLiinite(riLiScroll) {
    this.topTitle.riliPage++
    this.loadDataTime();
    riLiScroll.complete();
  }
  //缺勤记录
  changeWait() {
    this.dataRecordList = [];
    this.dataNameList = [];
    this.topTitle.Page = 1;
    this.topTitle.wainTxt = '暂无缺勤记录';
    this.topTitle.titleChange = false;
    this.topTitle.waitShell = 'yes-css';
    this.topTitle.overShell = 'not-css';
    this.loadClassTable();
  }
  //考勤统计
  changeOver() {
    this.dataRecordList = [];
    this.dataNameList = [];
    this.topTitle.Page = 1;
    this.topTitle.wainTxt = '暂无考勤统计';
    this.topTitle.titleChange = true;
    this.topTitle.waitShell = 'not-css';
    this.topTitle.overShell = 'yes-css';
    this.loadCheckTotal();
  }
  //请假复选框
  qingJiaCheck() {
    if (this.topTitle.qingJiaCode) {
      this.topTitle.qingJia = '1'
    } else {
      this.topTitle.qingJia = ''
    }
    this.dataRecordList = [];
    this.topTitle.Page = 1;
    this.loadClassTable();
  }
  //旷课复选框
  kuangKeCheck() {
    if (this.topTitle.kuangKeCode) {
      this.topTitle.kuangKe = '3'
    } else {
      this.topTitle.kuangKe = ''
    }
    this.topTitle.Page = 1;
    this.dataRecordList = [];
    this.loadClassTable();
  }
  //开始时间
  startChange() {
    this.ArrEndTime = [];
    for (let i = parseInt(this.topTitle.startTime); i <= 12; i++) {
      let addObj = {
        Code: String(i),
        CodeName: '第' + i + '节',
      }
      this.ArrEndTime.push(addObj)
    }
    this.topTitle.Page = 1;
    this.dataRecordList = [];
    this.loadClassTable();
  }
  //结束时间
  endChange() {
    this.ArrStartTime = [];
    for (let i = 1; i <= parseInt(this.topTitle.endTime); i++) {
      let addObj = {
        Code: String(i),
        CodeName: '第' + i + '节',
      }
      this.ArrStartTime.push(addObj)
    }
    this.topTitle.Page = 1;
    this.dataRecordList = [];
    this.loadClassTable();
  }
  //打开日期框
  openBox() {
    this.topTitle.hiddenBox = true;
  }
  //关闭日期框
  closeTab() {
    this.topTitle.hiddenBox = false;
  }
  //计算是周几
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
  //当前日期
  dataTime() {
    const Dates = new Date();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return month + '-' + day
  }
  //点击查看请假单
  lookLeaveList(obj) {
    antlinker.openNewView({
      uri: 'ant://h5app/open?URL=%2fv2qingjia%2f%23%2fmyapplydetailpage%2f' + obj,
      fail: function () { }
    });
  }

  ArrStartTime = [
    { Code: '1', CodeName: '第1节' },
    { Code: '2', CodeName: '第2节' },
    { Code: '3', CodeName: '第3节' },
    { Code: '4', CodeName: '第4节' },
    { Code: '5', CodeName: '第5节' },
    { Code: '6', CodeName: '第6节' },
    { Code: '7', CodeName: '第7节' },
    { Code: '8', CodeName: '第8节' },
    { Code: '9', CodeName: '第9节' },
    { Code: '10', CodeName: '第10节' },
    { Code: '11', CodeName: '第11节' },
    { Code: '12', CodeName: '第12节' },
  ];
  ArrEndTime = [
    { Code: '1', CodeName: '第1节' },
    { Code: '2', CodeName: '第2节' },
    { Code: '3', CodeName: '第3节' },
    { Code: '4', CodeName: '第4节' },
    { Code: '5', CodeName: '第5节' },
    { Code: '6', CodeName: '第6节' },
    { Code: '7', CodeName: '第7节' },
    { Code: '8', CodeName: '第8节' },
    { Code: '9', CodeName: '第9节' },
    { Code: '10', CodeName: '第10节' },
    { Code: '11', CodeName: '第11节' },
    { Code: '12', CodeName: '第12节' },
  ];




}
