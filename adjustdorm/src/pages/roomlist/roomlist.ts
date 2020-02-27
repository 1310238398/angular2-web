import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { ServelUrl } from "../../app/ServelUrl";
import { HelpUtils } from '../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-roomlist',
  templateUrl: 'roomlist.html'
})
export class RoomListPage {

  itemsObj = [];

  dormitorycode = ''; //楼号
  sexInfo = '';       //性别代码
  searchTxt = '';  //输入的宿舍号
  searchYes = '';  //确定的宿舍号

  Page: number = 1;
  moreData: boolean = true;
  PageNo: number = 20;
  loading: any;


  constructor(private http: HttpService, private HelpUtils: HelpUtils, public navParams: NavParams, public navCtrl: NavController, ) { }

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

    this.sexInfo = JSON.parse(sessionStorage.getItem('sexInfo'));
    this.dormitorycode = JSON.parse(sessionStorage.getItem('dormitorycode'));
  }

  //初始化加载
  ionViewDidEnter() {
    this.loadRoomList();   //获取宿舍号
  }

  //获取宿舍列表
  loadRoomList() {
    this.http.postJSON({
      Router: ServelUrl.Url.getroomdata,
      Method: 'POST',
      Body: {
        sex: this.sexInfo,
        dormitory: this.dormitorycode,
        key: this.searchYes,
        pageindex: 1,
        pagesize: this.PageNo,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.itemsObj = res.Data.items
      } else {
        this.HelpUtils.toastPopTop(res.FeedbackText);
      }
    },
      err => console.log(err)
    );
  }

  //搜索
  serachRoom() {
    this.Page = 1
    this.searchYes = this.searchTxt;
    this.moreData = true;
    this.loadRoomList()
  }

  //软键盘搜索
  onSearchKeyUp(event) {
    if ("Enter" == event.key) {
      this.Page = 1;
      this.searchYes = this.searchTxt;
      this.moreData = true;
      this.loadRoomList()
    }
  }

  //下拉加载
  doInfinite(infiniteScroll) {
    this.Page++
    this.http.postJSON({
      Router: ServelUrl.Url.getroomdata,
      Method: 'POST',
      Body: {
        sex: this.sexInfo,
        dormitory: this.dormitorycode,
        key: this.searchYes,
        pageindex: this.Page,
        pagesize: this.PageNo,
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        if (res.Data != null && res.Data.items.length > 0) {
          this.moreData = true;
          this.itemsObj = this.itemsObj.concat(res.Data.items);
        } else {
          this.moreData = false;
        }
        infiniteScroll.complete();
      } else {
        err => console.log(err)
      }
    });
  }

  //跳转宿舍详情页
  gotoRoom(obj) {
    sessionStorage.setItem('roomCode', JSON.stringify(obj));   //宿舍CODE
    this.navCtrl.push('RoomDetailPage')
  }









}
