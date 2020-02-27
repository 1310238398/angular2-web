import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from "ionic-angular";
import { ServelUrl } from "../../../app/ServelUrl";
import { HttpService } from "../../../http/http.Service";
import { HelpUtils } from "../../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-creatrecord',
  templateUrl: 'creatrecord.html'
})
export class CreatRecordPage {

  temTitle = '评奖信息上报'
  dataSet = {
    recordName: '',
    startTime: '',
    endTime: '',
    recordAddress: ''
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

  dataLenObj = {
    AcademicTerm: '',
    AcademicTermCode: '',
    AcademicYear: '',
    AcademicYearCode: '',
    Weeks: '',
  };

  weekNow = new Date().getDay().toString();
  forbbidbtn = false;
  InteluserCode = ''; //当前用户的ID
  weekString = '';
  uuid = '';
  RecordId = ''

  constructor(private navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });

  }
  //初始化加载
  ionViewDidEnter() {
    this.dataLenObj = this.navParams.get('dataLenObj');
    this.getInteluserCode()
  }

  //离开关闭弹窗
  ionViewWillLeave() {
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    var d = document.querySelector('ion-backdrop');
    if (d) {
      d.dispatchEvent(event)
    }
  }

  //总提交
  submitForm() {

    console.log(this.RecordId)

    if (!this.dataSet.recordName.trim()) {
      this.HelpUtils.toastPopTop('请填写课程(事项)名称');
      return false
    }
    if (!this.dataSet.startTime) {
      this.HelpUtils.toastPopTop('请选择课程(事项)开始时间');
      return false
    }
    if (!this.dataSet.endTime) {
      this.HelpUtils.toastPopTop('请选择课程(事项)结束时间');
      return false
    }
    if (!this.dataSet.recordAddress.trim()) {
      this.HelpUtils.toastPopTop('请填写课程(事项)地点');
      return false
    }

    let weekArr = [];

    for (let i = parseInt(this.dataSet.startTime); i <= parseInt(this.dataSet.endTime); i++) {
      weekArr.push(i)
    }
    this.weekString = weekArr.join(',')

    this.forbbidbtn = true;
    this.uuid = this.guidUUid();

    this.http.postJSON({
      Router: ServelUrl.Url.addattencerecord,
      Method: 'POST',
      Body: {
        CourseName: this.dataSet.recordName,
        Sections: this.weekString,
        ClassRoom: this.dataSet.recordAddress,
        AcademicTermCode: this.dataLenObj.AcademicTermCode,
        AcademicYearCode: this.dataLenObj.AcademicYearCode,
        WeekTime: this.dataLenObj.Weeks,
        Week: this.weekNow,
        InputFrom: '3',
        Remark: this.uuid
      }
    }).then(res => {
      if (!res.FeedbackCode) {

        this.loadClassTable();

        this.HelpUtils.toastPopTop('添加成功');
        const that = this;
        setTimeout(function () {

          var nameListObj = {
            AcademicTermCode: that.dataLenObj.AcademicTermCode,
            AcademicYearCode: that.dataLenObj.AcademicYearCode,
            ClassRoom: that.dataSet.recordAddress,
            CourseName: that.dataSet.recordName,
            Sections: that.weekString,
            Week: that.weekNow,
            WeekTime: that.dataLenObj.Weeks,
            IntelUserCode: that.InteluserCode,
            readName: '1',
            Attendance: '',
            RecordID: that.RecordId,
            TeacherIntelUserCode: '',
          }

          that.navCtrl.push('NameListStudentPage', { dataPass: nameListObj, pagePass: 'index' });
        }, 1500);
        this.forbbidbtn = false;
      } else {
        this.HelpUtils.toastPopTop('创建失败,请联系管理员修改');
      }
    },
      err => console.log(err)
    );
  }


  startChange() {
    this.ArrEndTime = [];
    for (let i = parseInt(this.dataSet.startTime); i <= 12; i++) {
      let addObj = {
        Code: String(i),
        CodeName: '第' + i + '节',
      }
      this.ArrEndTime.push(addObj)
    }
  }

  endChange() {
    this.ArrStartTime = [];
    for (let i = 1; i <= parseInt(this.dataSet.endTime); i++) {
      let addObj = {
        Code: String(i),
        CodeName: '第' + i + '节',
      }
      this.ArrStartTime.push(addObj)
    }
  }

  //获取当前用户intelusercode
  getInteluserCode() {
    this.http.postJSON({
      Router: ServelUrl.Url.getInteluserCode,
      Method: 'POST',
      Body: {}
    }).then(
      res => {
        if (!res.FeedbackCode) {
          this.InteluserCode = res.Data.IntelUserCode;
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
      res => {
        if (!res.FeedbackCode) {
          for (let i = 0; i < res.Data.length; i++) {
            if(res.Data[i].Remark1 == this.uuid){
              this.RecordId = res.Data[i].RecordID;
            }
          }
        }
      },
      err => console.log(err));
  }



  guidUUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }









}
