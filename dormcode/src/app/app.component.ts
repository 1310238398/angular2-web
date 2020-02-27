import { Component, ViewChild } from '@angular/core';
import { Nav, AlertController } from 'ionic-angular';
import { HttpService } from '../http/http.service';
import { ServelUrl } from "./ServelUrl";
import { HelpUtils } from '../app/utils/HelpUtils';
declare var antlinker;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;

  rootPage: any;
  QRcode = '';
  bandCode: any;

  TaskId = '';  //违纪检查ID
  RoomCode = '';  //宿舍code
  Weeks = '';  //
  roomName = '';  //

  disdden = false;

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public alertCtrl: AlertController) {
    this.QRcode = this.getValue(window.location.href);
    sessionStorage.setItem('QRcode', JSON.stringify(this.QRcode));   //存储二维码Code

    //判断是否绑定
    this.http.postJSON({
      Router: ServelUrl.Url.getqrcodebindstatus,
      Method: 'POST',
      Body: {
        qrcode: this.QRcode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        if (res.data.status == 'bind') {
          this.bandCode = true;  //被绑定
        } else if (res.data.status == 'nobind') {
          this.bandCode = false;  //未被绑定
        }

        if (res.data.type == 'normal') {
          this.loadUserType();
        } else if (res.data.type == 'dormitorycheck' && res.data.status == 'operable') {
          this.TaskId = res.data.parameter.taskid
          this.RoomCode = res.data.parameter.roomcode
          this.Weeks = res.data.parameter.weeks;
          this.roomName = (res.data.parameter.title).replace(/\#/g, "号楼");

          if (res.data.parameter.check == 'no') {
            window.location.href = '/roomcheck/#/score/antlinker-ssjz/' + this.TaskId + '/' + this.RoomCode + '/' + this.roomName + '/' + this.Weeks + '/true';
          } else {
            window.location.href = '/roomcheck/#/scoredetail/antlinker-ssjz/' + this.TaskId + '/' + this.RoomCode + '/' + this.roomName + '/' + this.Weeks + '/2' + '/true';
          }

        } else if (res.data.type == 'dormitorycheck' && res.data.status == 'nooperable') {
          console.log(res.data.type,'111111111111111' )
          this.disdden = true;
        }
      }
    },
      err => console.log(err)
    );
  }

  gotoOrigin() {
    antlinker.closeView({
      success: function () {
      },
      fail: function () {
      }
    });
  }

  //获取当前角色
  loadUserType() {
    this.http.postJSON({
      Router: ServelUrl.Url.getaeccss,
      Method: 'POST',
      Body: {}
    }).then(comments => {
      if (!comments.FeedbackCode) {
        sessionStorage.setItem('userType', JSON.stringify(comments.Data.Role));   //身份
        sessionStorage.setItem('DepartmentCode', JSON.stringify(comments.Data.DepartmentCode));   //班级code
        switch (comments.Data.Role) {
          case 'Staff'://学工人员
            if (this.bandCode) {
              this.rootPage = 'SpaceIndexPage';
            } else {
              this.rootPage = 'ParkListPage';
            }
            break;
          case 'StudentCadres'://学生干部
            if (this.bandCode) {
              this.rootPage = 'SpaceIndexPage';
            } else {
              this.rootPage = 'MonitorEmptyPage';
            }
            break;
          case 'Student':   //普通学生
            if (this.bandCode) {
              this.rootPage = 'SpaceIndexPage';
            } else {
              this.rootPage = 'MonitorEmptyPage';
            }
            break;
          case 'NotFound'://班主任或辅导员或学院分管领导
            this.HelpUtils.alert('查无此人');
            break;
        }
      } else {
        console.log(comments.FeedbackText)
      }
    });
  }

  //获取URL地址参数
  getValue(url) {
    var site = url.lastIndexOf("=");
    return url.substring(site + 1, url.length);
  }





}




