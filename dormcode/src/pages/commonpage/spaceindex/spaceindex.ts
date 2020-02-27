import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from '../../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-spaceindex',
  templateUrl: 'spaceindex.html'
})
export class SpaceIndexPage {

  itemsObj1 = [];
  itemsObj2 = [];
  itemsObj3 = [];

  titleInfo = {
    roomName: '',
    roomCode: '',
    BedNum: '',
    OccupiedBedNum: '',
  }

  QRcode = '';
  userType = ''; //登陆者身份
  dataEmpty = true; //数据是否为空  //true 不为空 false 不为空

  Page: number = 1;
  moreData: boolean = true;
  PageNo: number = 20;
  loading: any;

  pitchType = '';
  memberSrc = '';
  healthSrc = '';
  deciplineSrc = '';

  gotoType = '';  //是否是从大图页面跳转

  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController) { }

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
      title: "宿舍空间",
      fail: function () { },
      success: function () { }
    });

    this.QRcode = JSON.parse(sessionStorage.getItem('QRcode'));
    this.userType = JSON.parse(sessionStorage.getItem('userType'));

    this.gotoType = this.navParams.get('pitchType');
  }
  //初始化加载
  ionViewDidEnter() {
    if (this.gotoType == '3' && this.userType == 'Staff') {
      this.deciplineFunc()
    } else if (this.gotoType != '3' && this.userType == 'Staff'){
      this.memberFunc();
    }
    this.queryTopTitle();
  }
  //获取顶部标题
  queryTopTitle() {
    this.http.postJSON({
      Router: ServelUrl.Url.gettoptitle,
      Method: 'POST',
      Body: {
        type: 'roomqrcode',
        code: this.QRcode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.titleInfo.roomName = res.data.DistrictName + res.data.DormitoryName + res.data.UnitName + res.data.RoomName;
        this.titleInfo.roomCode = res.data.RoomCode;
        this.titleInfo.BedNum = res.data.BedNum;
        this.titleInfo.OccupiedBedNum = res.data.OccupiedBedNum;
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //成员按钮
  memberFunc() {
    this.Page = 1; //'恢复第一页
    this.pitchType = '1';
    this.moreData = true;
    this.memberSrc = 'assets/imgs/people_yellow.png';
    this.healthSrc = 'assets/imgs/weisheng_gray.png';
    this.deciplineSrc = 'assets/imgs/weiji_gray.png';

    this.http.postJSON({
      Router: ServelUrl.Url.getroommember,
      Method: 'POST',
      Body: {
        qrcode: this.QRcode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.itemsObj1 = res.data.items;
        if (this.itemsObj1.length) {
          this.dataEmpty = true;
        } else {
          this.dataEmpty = false;
        }
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //卫生
  healthFunc() {
    this.Page = 1; //'恢复第一页
    this.pitchType = '2';
    this.moreData = true;
    this.memberSrc = 'assets/imgs/people_gray.png';
    this.healthSrc = 'assets/imgs/weisheng_yellow.png';
    this.deciplineSrc = 'assets/imgs/weiji_gray.png';

    this.http.postJSON({
      Router: ServelUrl.Url.gethygiene,
      Method: 'POST',
      Body: {
        qrcode: this.QRcode,
        pageindex: 1,
        pagesize: this.PageNo,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.itemsObj2 = res.data.items;
        if (this.itemsObj2.length) {
          this.dataEmpty = true;
        } else {
          this.dataEmpty = false;
        }
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //违纪
  deciplineFunc() {
    this.Page = 1; //'恢复第一页
    this.pitchType = '3';
    this.moreData = true;
    this.memberSrc = 'assets/imgs/people_gray.png';
    this.healthSrc = 'assets/imgs/weisheng_gray.png';
    this.deciplineSrc = 'assets/imgs/weiji_yellow.png';

    this.http.postJSON({
      Router: ServelUrl.Url.getviolation,
      Method: 'POST',
      Body: {
        qrcode: this.QRcode,
        pageindex: 1,
        pagesize: this.PageNo,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.itemsObj3 = res.data.items;

        if (this.itemsObj3.length) {
          for (let i = 0; i < this.itemsObj3.length; i++) {
            if(this.itemsObj3[i]['image'] == null){
              this.itemsObj3[i]['image'] = ''
            }
          }
          this.dataEmpty = true;
        } else {
          this.dataEmpty = false;
        }
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //下拉加载
  doInfinite(infiniteScroll) {
    this.Page++;
    if (this.pitchType == '2') {
      this.http.postJSON({
        Router: ServelUrl.Url.gethygiene,
        Method: 'POST',
        Body: {
          qrcode: this.QRcode,
          pageindex: this.Page,
          pagesize: this.PageNo,
        }
      }).then(res => {
        if (!res.FeedbackCode) {
          if (res.Data != null && res.data.items.length > 0) {
            this.moreData = true;
            this.itemsObj2 = this.itemsObj2.concat(res.data.items);
          } else {
            this.moreData = false;
          }
          infiniteScroll.complete();
        } else {
          err => console.log(err)
        }
      });
    } else if (this.pitchType == '3') {
      this.http.postJSON({
        Router: ServelUrl.Url.getviolation,
        Method: 'POST',
        Body: {
          qrcode: this.QRcode,
          pageindex: this.Page,
          pagesize: this.PageNo,
        }
      }).then(res => {
        if (!res.FeedbackCode) {
          if (res.Data != null && res.data.items.length > 0) {
            this.moreData = true;
            this.itemsObj3 = this.itemsObj3.concat(res.data.items);
          } else {
            this.moreData = false;
          }
          infiniteScroll.complete();
        } else {
          err => console.log(err)
        }
      });
    }
  }
  //解绑二维码
  unBindCode() {
    const prompt = this.alertCtrl.create({
      title: '',
      message: '<p>确定要将该二维码与 </p>' + '<p>"' + this.titleInfo.roomName + '宿舍"</p>' + '<p>解绑吗？</p>',
      buttons: [
        {
          text: '取消',
          handler: data => { }
        },
        {
          text: '确定',
          handler: data => {
            this.http.postJSON({
              Router: ServelUrl.Url.untieqrcodetoroom,
              Method: 'POST',
              Body: {
                qrcode: this.QRcode,
                roomcode: this.titleInfo.roomCode,
                roomname: this.titleInfo.roomName
              }
            }).then(res => {
              if (!res.FeedbackCode) {
                this.HelpUtils.toastPopTop('解绑成功');
                const that = this;
                setTimeout(function () {
                  if (that.userType == 'Staff') {
                    that.navCtrl.push('ParkListPage');
                  } else if (that.userType == 'StudentCadres') {
                    that.navCtrl.push('MonitorEmptyPage');
                  }
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
  //跳转图片放大
  navPreview(params) {
    this.navCtrl.push('PreviewPage', params)
  }
  //历史纪录页
  gotoHistoryRecord() {
    this.navCtrl.push('HistoryRecordPage')
  }




}
