import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../http/http.Service';
import { HelpUtils } from "../../app/utils/HelpUtils";
declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-displayindex',
  templateUrl: 'displayindex.html'
})
export class DisplayIndexPage {

  loading = true;
  searchTxt = '';       //学号或者姓名
  InfoData = [];            //详情数据
  emptyData = false;
  moreData: boolean = true;
  Page = 1;

  constructor(private http: HttpService, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, private HelpUtils: HelpUtils) { }

  ionViewWillEnter() {
    this.searchTxt = this.navParams.get('searchTxt');
    this.loadData();
  }

  loadData() {
    this.http.postJSON({
      Router: '/api/staffmanage/staffusersquery',
      Method: 'POST',
      Body: {
        params: {
          UserCode: '',
          Name: this.searchTxt,
          UserType: '',
          Department: ''
        },
        start: 0,
        limit: 40
      }
    }).then(res => {
      this.loading = false;
      this.InfoData = res.items;
      if (this.InfoData.length > 0) {
        this.emptyData = false
      } else {
        this.emptyData = true;
      }
    })
  }

  //搜索
  serachRoom() {
    this.loadData();
  }

  //软键盘搜索
  onSearchKeyUp(event) {
    if ("Enter" == event.key) {
      this.loadData();
    }
  }

  //下拉加载
  doInfinite(infiniteScroll) {
    this.Page++
    this.http.postJSON({
      Router: '/api/staffmanage/staffusersquery',
      Method: 'POST',
      Body: {
        params: {
          UserCode: '',
          Name: this.searchTxt,
          UserType: '',
          Department: ''
        },
        start: this.Page - 1,
        limit: 20
      }
    }).then(res => {
      this.loading = false;
      if (res.items.length > 0) {
        this.moreData = true;
        this.InfoData = this.InfoData.concat(res.items);
      } else {
        this.moreData = false;
      }
      infiniteScroll.complete();
    })
  }

  //重置账号
  showPrompt(code) {
    const prompt = this.alertCtrl.create({
      title: '提示',
      message: "确定要重置密码吗？重置后密码为123456,并给该用户发送短信通知",
      buttons: [
        {
          text: '取消',
          handler: data => { }
        },
        {
          text: '确定',
          handler: data => {
            this.http.postJSON({
              Router: '/api/staffmanage/userpasswdreset',
              Method: 'POST',
              Body: {
                IntelUserCode: code,
              }
            }).then(res => {
              if (!res.FeedbackCode) {
                this.HelpUtils.toastPopTop('重置成功');
              } else {
                this.HelpUtils.toastPopTop(res.FeedbackText);
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }




}
