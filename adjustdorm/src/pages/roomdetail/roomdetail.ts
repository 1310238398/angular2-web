import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from '../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-roomdetail',
  templateUrl: 'roomdetail.html'
})
export class RoomDetailPage {

  roomCode = ''; //宿舍Code   
  roomName = ''; //宿舍名称
  setNum = '';   //容纳人数
  itemsObj = [];  //已住学生
  soonObj = [];   //调入的学生
  boongBt = true; //是否有原住学生
  className = ''; //当前班级名称 
  classCode = '';  //当前班级代码

  deleteArr = [];  //被删除的数据
  ArrTotal = [];   //提交的数据集合

  haveLiveNum = 0;
  failLiveNum = 0;

  forbidBtn = false;

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, private alertCtrl: AlertController, public navCtrl: NavController, ) { }

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
      title: "宿舍登记",
      fail: function () { },
      success: function () { }
    });

    this.soonObj = JSON.parse(sessionStorage.getItem('dormUserInfo'));
    this.className = JSON.parse(sessionStorage.getItem('className'));
    this.classCode = JSON.parse(sessionStorage.getItem('classCode'));
    this.roomCode = JSON.parse(sessionStorage.getItem('roomCode'));
    this.failLiveNum = this.soonObj.length;

  }

  //初始化加载
  ionViewDidEnter() {
    this.loadRoomDetail();   //获取宿舍号
  }

  //获取宿舍人员详情
  loadRoomDetail() {
    this.http.postJSON({
      Router: ServelUrl.Url.getroommemberdata,
      Method: 'POST',
      Body: {
        room: this.roomCode,
        class: this.classCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        if (res.Data.items == null || res.Data.items == '') {
          this.boongBt = false;
        } else {
          this.boongBt = true;
          this.itemsObj = res.Data.items;

          for (let i = 0; i < this.itemsObj.length; i++) {
            if (this.itemsObj[i].remove == 'true') {
              this.itemsObj[i].remove = true
            } else {
              this.itemsObj[i].remove = false
            }
          }
        }
        this.roomName = res.Data.roomname;
        this.setNum = res.Data.bednum;

        this.haveLiveNum = this.itemsObj.length;

      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //删除原住学生
  boongDeletBtn(codeId) {
    for (let i = 0; i < this.itemsObj.length; i++) {
      var deleteObj = {
        usercode: '',
        type: 'clear',
        bedcode: ''
      };
      if (this.itemsObj[i].intelusercode == codeId) {
        deleteObj.usercode = this.itemsObj[i].intelusercode;
        this.deleteArr.push(deleteObj);
        this.itemsObj.splice(i, 1);
      }
    }

    this.haveLiveNum = this.itemsObj.length;

  }

  //删除待添加学生
  soonDeletBtn(codeId) {
    for (let i = 0; i < this.soonObj.length; i++) {
      if (this.soonObj[i].code == codeId) {
        this.soonObj.splice(i, 1);
      }
    }

    this.failLiveNum = this.soonObj.length;
  }

  //提交按钮
  submitFunc() {
    var totalNum = 0;
    var soonArr = [];   //添加
    var commonArr = [];  //已住
    this.ArrTotal = [];
    //已住的学生人数
    for (let i = 0; i < this.itemsObj.length; i++) {
      totalNum++;
      var dataObj = {
        usercode: '',
        type: '',
        bedcode: ''
      }

      if (this.itemsObj[i].remove == true) {
        dataObj.type = 'unchange'
      }

      if (this.itemsObj[i].remove == false) {
        dataObj.type = 'nonego'
      }  

      dataObj.usercode = this.itemsObj[i].intelusercode;
      commonArr.push(dataObj)
    }
    //即将添加的学生人数
    for (let i = 0; i < this.soonObj.length; i++) {
      totalNum++;
      var dataObj1 = {
        usercode: '',
        type: 'add',
        bedcode: ''
      }
      dataObj1.usercode = this.soonObj[i].code;
      soonArr.push(dataObj1)
    }
    if (totalNum > parseInt(this.setNum)) {
      this.HelpUtils.toastPopTop('宿舍最多可容纳' + this.setNum + '人');
      return false;
    }

    this.ArrTotal = this.ArrTotal.concat(commonArr);
    this.ArrTotal = this.ArrTotal.concat(soonArr);
    this.ArrTotal = this.ArrTotal.concat(this.deleteArr);
    this.presentConfirm();
  }

  //弹框确定
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '',
      message: '确定要提交此次宿舍调整的结果吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.http.postJSON({
              Router: ServelUrl.Url.getroompushbed,
              Method: 'POST',
              Body: {
                roomcode: this.roomCode,
                bednum: this.setNum,
                assgin: this.ArrTotal
              }
            }).then(res => {
              if (!res.FeedbackCode) {
                this.HelpUtils.toastPopTop('提交成功');
                window.sessionStorage.removeItem('dormUserInfo')
                const that = this;
                setTimeout(function () {
                  that.navCtrl.popToRoot();
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
    alert.present();
  }

  //页面跳转
  gotoIndex() {
    this.navCtrl.popToRoot();
  }
}
