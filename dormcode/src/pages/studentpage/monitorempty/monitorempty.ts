import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from '../../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-monitorempty',
  templateUrl: 'monitorempty.html'
})
export class MonitorEmptyPage {

  itemsObj = [];

  QRcode = '';
  studentType = '';   // StudentCadres  班委     普通学生
  departCode = '';

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public alertCtrl: AlertController) { }

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
      title: "二维码绑定",
      fail: function () { },
      success: function () { }
    });
    this.QRcode = JSON.parse(sessionStorage.getItem('QRcode'));
    this.studentType = JSON.parse(sessionStorage.getItem('userType'));
    this.departCode = JSON.parse(sessionStorage.getItem('DepartmentCode'));
  }
  //初始化加载
  ionViewDidEnter() {
    if (this.studentType == 'StudentCadres') {
      this.loadRoomList();   //获取宿舍
    }
  }
  //获取宿舍列表
  loadRoomList() {
    this.http.postJSON({
      Router: ServelUrl.Url.getclasscadreroomlist,
      Method: 'POST',
      Body: {
        class: this.departCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.itemsObj = res.data.items;
        for (let i = 0; i < this.itemsObj.length; i++) {
          this.itemsObj[i]['name'] = this.itemsObj[i].DistrictName + this.itemsObj[i].DormitoryName + this.itemsObj[i].UnitName + this.itemsObj[i].RoomName
        }
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //绑定二维码
  bindCode(obj1, obj2) {
    const prompt = this.alertCtrl.create({
      title: '',
      message: '<p>确定要将该二维码与 </p>' + '<p>"' + obj2 + '宿舍"</p>' + '<p>绑定吗？</p>',
      buttons: [
        {
          text: '取消',
          handler: data => { }
        },
        {
          text: '确定',
          handler: data => {
            this.http.postJSON({
              Router: ServelUrl.Url.bindqrcodetoroom,
              Method: 'POST',
              Body: {
                qrcode: this.QRcode,
                roomcode: obj1,
                roomname: obj2
              }
            }).then(res => {
              if (!res.FeedbackCode) {
                this.HelpUtils.toastPopTop('绑定成功');

                setTimeout(function () {
                  antlinker.closeView({
                    success: function () {
                    },
                    fail: function () {
                    }
                  });
                }, 1200);
              } else {
                this.HelpUtils.toastPopTop(res.FeedbackText);
              }
            },
              err => console.log(err)
            );
          }
        }
      ]
    });
    prompt.present();
  }

}
