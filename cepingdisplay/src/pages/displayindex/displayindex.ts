import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../http/http.service';
import { HelpUtils } from '../../app/utils/HelpUtils';

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-displayindex',
  templateUrl: 'displayindex.html'
})
export class DisplayIndexPage {
  loading = true;
  taskID = '';               //任务ID
  NameOrUserCode = '';       //学号或者姓名
  InfoData = [];            //详情数据
  emptyData = false;
  isAdd20 = true;

  constructor(private http: HttpService, public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController) { }

  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });

    this.taskID = this.getValue(window.location.href);
    console.log(this.taskID)
    this.loadData();
  }

  //获取数据
  loadData() {
    this.http.postJSON({
      Router: '/api/commtask/statuslist',
      Method: 'POST',
      Body: {
        TaskCode: this.taskID,
        Which: '3',
        AcademyCode: '',
        ClassCode: '',
        NameOrUserCode: this.NameOrUserCode,
        Page: 0,
        Count: 20
      }
    }).then(res => {
      this.loading = false;
      if (!res.FeedbackCode) {
        this.InfoData = res.Data.data;
        if (res.Data.total != '0') {
          this.emptyData = false;
        } else {
          this.emptyData = true;
        }

        if (res.Data.data.length == 20) {
          this.isAdd20 = true;
        } else {
          this.isAdd20 = false;
        }
      }
    })
  }

  //搜索
  serachRoom() {
    this.loadData()
  }

  //软键盘搜索
  onSearchKeyUp(event) {
    if ("Enter" == event.key) {
      this.loadData()
    }
  }

  //获取URL地址参数
  getValue(url) {
    var site = url.lastIndexOf("=");
    return url.substring(site + 1, url.length);
  }




}
