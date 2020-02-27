import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../../http/http.service';
import { ServelUrl } from "../../../app/ServelUrl";
import { HelpUtils } from '../../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-roomlist',
  templateUrl: 'roomlist.html'
})
export class RoomListPage {

  itemsObj = [];

  unitCode = ''; //单元号
  QRcode = '';
  parkName = '';    //园区 楼  单元名称

  Page: number = 1;
  moreData: boolean = true;
  PageNo: number = 20;
  loading: any;

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
      title: "二维码绑定",
      fail: function () { },
      success: function () { }
    });

    this.unitCode = this.navParams.get('code');
    this.QRcode = JSON.parse(sessionStorage.getItem('QRcode'));
  }

  //初始化加载
  ionViewDidEnter() {
    this.queryTopTitle();
    this.loadRoomList();   //获取宿舍号
  }
  //获取顶部标题
  queryTopTitle() {
    this.http.postJSON({
      Router: ServelUrl.Url.gettoptitle,
      Method: 'POST',
      Body: {
        type: 'unit',
        code: this.unitCode
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.parkName = res.data.DistrictName + res.data.DormitoryName + res.data.UnitName
      } else {
        this.HelpUtils.toastPop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }
  //获取宿舍列表
  loadRoomList() {
    this.http.postJSON({
      Router: ServelUrl.Url.getroom,
      Method: 'POST',
      Body: {
        unit: this.unitCode,
        pageindex: 1,
        pagesize: this.PageNo,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.itemsObj = res.data.items
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //下拉加载
  doInfinite(infiniteScroll) {
    this.Page++
    this.http.postJSON({
      Router: ServelUrl.Url.getroom,
      Method: 'POST',
      Body: {
        unit: this.unitCode,
        pageindex: this.Page,
        pagesize: this.PageNo,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        if (res.data != null && res.data.items.length > 0) {
          this.moreData = true;
          this.itemsObj = this.itemsObj.concat(res.data.items);
        } else {
          this.moreData = false;
        }
        infiniteScroll.complete();
      } else {
        err => console.log(err)
      }
    });
  }

  //绑定二维码
  bindCode(obj1, obj2) {
    const prompt = this.alertCtrl.create({
      title: '',
      message: '<p>确定要将该二维码与 </p>' + '<p>"' + this.parkName + obj2 + '宿舍"</p>' + '<p>绑定吗？</p>',
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
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
                roomname: this.parkName + obj2
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
