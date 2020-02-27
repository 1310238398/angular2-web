import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from "../../../ServelUrl";
import { NzMessageService } from "ng-zorro-antd";
import { DatePipe, NgClass } from "@angular/common";

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  constructor(private confirmServ: NzModalService, private datePipe: DatePipe, public msgSrv: NzMessageService, private route: Router,
    private httpService: HttpService, private router: ActivatedRoute, ) { }
  isVisible = false;
  isOnlyVisible = false;
  // 按钮置灰
  isGray = true;
  isYellow = false;
  _indeterminate = false;
  _displayData = [];
  _allChecked = false;

  weeks: any[] = [];
  Campus = [];
  calendarweeks: any[] = [];
  universityID = '';
  type: any[] = [];
  yearterm: '';

  now;
  preDate;
  campusName = '全部校区';
  typeName = '';
  weekName = '';
  // campLen;
  campArr = [];

  createdObj = {
    Campus: '',
    Type: '',
    Weeks: '',
    StartTime: '',
    EndTime: '',
    TaskTitle: ''
  }
  startDate;
  endDate;
  taskid;

  // 接收上一页的传值
  PrecampusCode: '';
  Pretype: '';
  PreendDate: '';
  PrestartDate: '';
  PretaskID: '';
  PretaskName: '';
  Preweek: '';
  ngOnInit() {
    this.loadCampus();
    this.queryWeeks();
    this.queryType();
    this.nowyearterm();
    this.router.params.subscribe((params: Params) => {
      this.PrecampusCode = params['campus'];
      this.Pretype = params['type'];
      this.PreendDate = params['endTime'];
      this.PrestartDate = params['starttime'];
      this.PretaskID = params['taskId'];
      this.PretaskName = params['taskName'];
      this.Preweek = params['week'];
      if (JSON.stringify(params) !== '{}') {
        this.createdObj.Campus = this.PrecampusCode;
        this.createdObj.Type = this.Pretype;
        this.createdObj.Weeks = this.Preweek;
        this.createdObj.EndTime = this.PreendDate;
        this.createdObj.StartTime = this.PrestartDate;
        this.createdObj.TaskTitle = this.PretaskName;
      }
      this.btnColor();
    })
  }
  /*校区*/
  loadCampus() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.campusList,
      Method: 'POST',
      Body: {
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.Campus = res.Data;
      }
    });

  }
  // 获取检查类型
  queryType() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.parameterinit,
      Method: 'POST',
      Body: {
        parameter: ["DormitoryCheck"]
      }
    }).then(res => {
      this.type = res.Data;
      this.createdObj.Type = this.type[0].ItemCode;
    })
  }
  // 周次
  queryWeeks() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.schoolcalendarweeks,
      Method: 'POST',
      Body: {
        After: '1'
      }
    }).then(res => {
      this.calendarweeks = res.Data;
      for (let i = 0; i < res.Data.length; i++) {
        this.weeks.push(res.Data[i].Weeks);

      }

      if (this.createdObj.Weeks == undefined) {
        this.createdObj.StartTime = null;
        this.createdObj.EndTime = null;
      }
    })
  }
  // 当前学期
  nowyearterm() {
    this.httpService.postJSON({
      Router: ServelUrl.Url.nowyearterm,
      Method: 'POST',
      Body: {}
    }).then(res => {
      this.yearterm = res.Data.AcademicTerm;
    })
  }
  // 判断是否按钮颜色
  btnColor() {
    if (this.createdObj.Type != '' && this.createdObj.Weeks != '' && this.createdObj.StartTime != '' && this.createdObj.EndTime != '' && this.createdObj.Type != null && this.createdObj.Weeks != null && this.createdObj.StartTime != null && this.createdObj.EndTime != null) {
      this.isYellow = true;
      this.isGray = false;
    }
    else {
      this.isGray = true;
      this.isYellow = false;
    }
  }
  date(e, week) {
    this.calendarweeks.forEach(element => {
      if (e == element.Weeks) {
        this.createdObj.StartTime = element.StartDate;
        this.createdObj.EndTime = element.EndDate;
      }
    });
  }
  taskTitle(title, type) {
    // if(this.c)
    // this.campusName = this.createdObj.Campus;
    // for (let i = 0; i < this.createdObj.Campus.length; i++) {
    //   this.Campus.forEach(element => {
    //     if (this.createdObj.Campus[i] == element.CampusCode) {
    //       this.campusName += element.CampusName + ',';
    //     }
    //   });
    // }
    // this.campusName = this.campusName.substr(0, this.campusName.length - 1);
    if (type == 'campus') {
      if (title == '') {
        this.campusName = '全部校区'
      } else {
        this.campusName = '';
        for (let i = 0; i < title.length; i++) {
          this.Campus.forEach(element => {
            if (title[i] == element.CampusCode) {
              this.campusName += element.CampusName + ',';
            }
          });
        }
        this.campusName = this.campusName.substr(0, this.campusName.length - 1);
      }
    }
    if (type == 'type' || type == 'week') {
      this.type.forEach(element => {
        if (this.createdObj.Type == element.ItemCode) {
          this.typeName = element.ItemName
        }
      });
      // 周次
      title = '第' + this.createdObj.Weeks + '周';
      this.weekName = title;
      // this.campLen = this.createdObj.Campus;
      if (this.createdObj.Campus == '') {
        this.campusName = '全部校区,';
      } else {
        this.campusName = '';

        if (this.createdObj.Campus) {
          if (typeof (this.createdObj.Campus) == "string") {
            this.campArr = this.createdObj.Campus.split(",");
          } else {
            this.campArr = this.createdObj.Campus;
          }
          for (let i = 0; i < this.campArr.length; i++) {
            this.Campus.forEach(element => {
              if (this.campArr[i] == element.CampusCode) {
                this.campusName += element.CampusName + ',';
              }
            });
          }
        }
      }
      this.campusName = this.campusName.substr(0, this.campusName.length - 1);

    }

    // // 类型
    this.type.forEach(element => {
      if (this.createdObj.Type == element.ItemCode) {
        this.typeName = element.ItemName
      }
    });
    // }
    // if (type == 'week') {
    // title = '第' + title + '周';
    // this.weekName = title;
    // 周次
    title = '第' + this.createdObj.Weeks + '周';
    this.weekName = title;

    this.createdObj.TaskTitle = this.yearterm + this.weekName + this.typeName + '任务(' + this.campusName + ')';
    this.btnColor();
  }
  assignChecher() {
    this.isVisible = true;

  }
  handleOk = (e) => {
    this.isVisible = false;
  }

  handleCancel = (e) => {
    var that = this;
    this.confirmServ.confirm({
      title: '你编辑的内容未保存，确认退出吗？',
      content: '',
      zIndex: 10000,
      onOk() {
        that.isVisible = false;

      },
      onCancel() {
        that.isVisible = true;
      }
    });
  }
  preview() {
    this.isOnlyVisible = true;
  }
  PreviewhandleCancel() {
    this.isOnlyVisible = false;
  }
  PreviewhandleOk() {
    this.isOnlyVisible = false;
  }
  cancel() {
    if (this.createdObj.Weeks == '' && this.createdObj.StartTime == '' && this.createdObj.EndTime == '') {
      this.route.navigate(['./dormitorycheck']);
    } else {
      var those = this;
      this.confirmServ.confirm({
        title: '你编辑的内容未保存，确认退出吗？',
        content: '',
        zIndex: 10000,
        onOk() {
          those.route.navigate(['./dormitorycheck']);
        },
        onCancel() {

        }
      });
    }

  }
  nextPage() {
    this.nullToString();
    let routeCampus = [];
    if (this.createdObj.Type == '') {
      this.msgSrv.success('请选择类型');
      return;
    }
    if (this.createdObj.Weeks == '') {
      this.msgSrv.success('请选择周次');
      return;
    }
    console.log("判断时间")
    if (this.createdObj.StartTime == '') {
      this.msgSrv.success('请填写起始时间');
      return;
    }
    if (this.createdObj.EndTime == '') {
      this.msgSrv.success('请填写结束时间');
      return;
    }
    if (this.createdObj.TaskTitle == '') {
      this.msgSrv.success('请填写任务标题');
      return;
    }
    let bodyCampus: string = '';
    let campuName: string = '';
    // 若校区为空，将所有校区ID保存起来，传值
    if (this.createdObj.Campus == "") {
      this.Campus.forEach(element => {
        bodyCampus += element.CampusCode + ',';
        campuName += element.CampusName + ',';
      });
      // bodyCampus.
      bodyCampus = bodyCampus.substr(0, bodyCampus.length - 1);
      campuName = campuName.substr(0, campuName.length - 1);
    } else {
      bodyCampus += this.createdObj.Campus;
      this.Campus.forEach(element => {
        if (this.createdObj.Campus == element.CampusCode) {
          campuName += element.CampusName + ',';
        }
      });

    }

    this.startDate = this.datePipe.transform(this.createdObj.StartTime, 'yyyyMMddHHmmss');
    this.endDate = this.datePipe.transform(this.createdObj.EndTime, 'yyyyMMddHHmmss');
    this.now = new Date();
    this.preDate = this.datePipe.transform(new Date(this.now.getTime() - 24 * 60 * 60 * 1000), 'yyyyMMddHHmmss');
    if (this.startDate > this.endDate) {
      this.msgSrv.success('起始时间不能大于结束时间');
      return;
    }
    if (this.startDate < this.preDate || this.endDate < this.preDate) {
      this.msgSrv.success("起始时间和截止时间都要大于等于当前时间");
      return;
    }
    if (this.PretaskID) {
      this.taskid = this.PretaskID;
    } else {
      this.taskid = '';
    }
    this.httpService.postJSON({
      Router: ServelUrl.Url.saveTask,
      Method: 'POST',
      Body: {
        TaskId: this.taskid,
        Status: '1',
        Campus: bodyCampus,
        Type: this.createdObj.Type,
        Weeks: this.createdObj.Weeks,
        StartDate: this.startDate,
        EndDate: this.endDate,
        TaskName: this.createdObj.TaskTitle,
      }
    }).then(res => {
      if (this.createdObj.Campus == undefined) {
        this.Campus.forEach(element => {
          // bodyCampus += element.CampusID + ',';
          routeCampus.push(element.CampusID)
        });
      } else {
        routeCampus.push(this.createdObj.Campus);
      }
      this.route.navigate(['./dormitorycheck/assign', {
        campusId: bodyCampus, taskId: res.Data, campus: campuName, type: this.createdObj.Type, week: this.createdObj.Weeks,
        startDate: this.createdObj.StartTime, endDate: this.createdObj.EndTime, taskName: this.createdObj.TaskTitle
      }]);
    })


  }
  // 转类型
  nullToString() {
    for (var key in this.createdObj) {
      if (this.createdObj.hasOwnProperty(key)) {
        // var element = object[key];
        if (this.createdObj[key] == null) {
          this.createdObj[key] = "";
        }

      }
    }
  }


}

