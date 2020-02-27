import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-classlist',
  templateUrl: 'classlist.html'
})
export class ClassListPage {
  level = '';
  dataSet = [];
  dataHeadObj = {
    total: '',
    noback: '',
    back: ''
  }
  staffType = '';
  academycode = '';
  tapBoxSH = false;
  forbbien = true;
  Email = '';

  mengGo = true;
  sendEmail = true;  //是否可以发送邮件

  constructor(private navCtrl: NavController, private http: HttpService, public navParams: NavParams, private HelpUtils: HelpUtils) { }

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

    this.level = JSON.parse(sessionStorage.getItem('level'));
    if (this.level == '3') {
      this.staffType = 'whole';
      this.academycode = this.navParams.get('academy');
    } else {
      this.staffType = 'range';
    }
  }

  //初始化加载
  ionViewDidEnter() {
    this.loadTitleData()
    this.loadAcademicList();
  }

  //获取抬头数据
  loadTitleData() {
    this.http.postJSON({
      Router: ServelUrl.Url.getclasstopcount,
      Method: 'POST',
      Body: {
        type: this.staffType,
        academy: this.academycode
      }
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

  //班级返校数据
  loadAcademicList() {
    this.http.postJSON({
      Router: ServelUrl.Url.getclasscount,
      Method: 'POST',
      Body: {
        type: this.staffType,
        academy: this.academycode
      }
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

  //弹出提示框
  tankBox() {
    this.tapBoxSH = true;
  }

  //点击弹出框的发送按钮
  onPassFun() {
    this.tapBoxSH = false;
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

  //从头部跳转到统计详情页
  goToDetail() {
    this.navCtrl.push('NotReachedInfoPage', { type: 'academy', academy: this.academycode, class: '' });
  }

  //从班级列表跳转到统计详情页
  NavigationTo(obj) {
    this.navCtrl.push('NotReachedInfoPage', { type: 'class', academy: this.academycode, class: obj });
  }

}




