import { Component } from '@angular/core';
import { IonicPage, NavController } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-academiclist',
  templateUrl: 'academiclist.html'
})
export class AcademicListPage {

  dataSet = []
  dataHeadObj = {
    total: '',
    noback: '',
    back: ''
  }

  tapBoxSH = false;
  forbbien = true;
  Email = '';

  mengGo = true;
  sendEmail = true;  //是否可以发送邮件

  constructor(private navCtrl: NavController, private http: HttpService, private HelpUtils: HelpUtils) { }

  //初始化加载
  ionViewWillEnter() {
    antlinker.configTitleButton({
      showClose: true,
      type: "label",
      text: "",
      success: function () { },
      fail: function () { },
      trigger: function () { }
    });
    this.loadTitleData()
    this.loadAcademicList();
  }

  //获取抬头数据
  loadTitleData() {
    this.http.postJSON({
      Router: ServelUrl.Url.getacademytopcount,
      Method: 'GET',
      Body: {}
    }).then(res => {
      if (!res.FeedbackCode) {
        this.dataHeadObj = res.data;
        if (this.dataHeadObj.noback == '0') {
          this.sendEmail = false;
        }
      }
    },
      err => console.log(err));
  }

  //进入页面学院返校数据
  loadAcademicList() {
    this.http.postJSON({
      Router: ServelUrl.Url.getacademycount,
      Method: 'POST',
      Body: {}
    }).then(res => {
      this.mengGo = false;
      if (!res.FeedbackCode) {
        this.dataSet = res.data.items;
        for (let i = 0; i < this.dataSet.length; i++) {
          this.dataSet[i]['notStol'] = parseInt(this.dataSet[i].total) - parseInt(this.dataSet[i].back) - parseInt(this.dataSet[i].noback)
        }
      }
    },
      err => console.log(err));
  }

  //发送邮箱
  tankBox() {
    this.tapBoxSH = true;
  }

  //点击弹出框的发送按钮
  onPassFun() {
    this.tapBoxSH = false
    this.http.postJSON({
      Router: ServelUrl.Url.seedmail,
      Method: 'POST',
      Body: {
        class:'',
        email: this.Email
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPopTop('发送成功');
      }
    },
      err => console.log(err));
  }

  //关闭提示框
  overbox() {
    this.tapBoxSH = false;
  }

  //填写邮箱
  txtChange() {
    var emailXP = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (this.Email.trim() && emailXP.test(this.Email)) {
      this.forbbien = false
    } else {
      this.forbbien = true
    }
  }

  //跳转到班级列表
  NavigationTo(obj) {
    this.navCtrl.push('ClassListPage', { academy: obj });
  }

  //跳转到统计详情页
  goToDetail() {
    this.navCtrl.push('NotReachedInfoPage', { type: 'whole', academy: '', class: '' });
  }



}
