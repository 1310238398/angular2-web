import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServelUrl } from "../../app/ServelUrl";
import { HttpService } from "../../http/http.Service";
import { HelpUtils } from "../../app/utils/HelpUtils";

declare var antlinker;

@IonicPage()
@Component({
  selector: 'page-notreachedinfo',
  templateUrl: 'notreachedinfo.html'
})
export class NotReachedInfoPage {

  dataSet = [];
  dataHeadObj = {
    total: '',
    noback: '',
    back: ''
  }

  level = '';   //角色  3 校级学工
  powerType = ''; //是否有权限
  NotCounttotal = ''; //未统计人数
  PageAjax = {
    type: '',
    academy: '',
    class: '',
    Page: 1,
    PageNo: 20,
  }
  reasonObj = [];
  reasonCode = ''; //选择的关键字
  moreData: boolean = true;

  tapBoxSH = false;
  forbbien = true;
  Email = '';
  haveClass = false;

  mengGo = false;     //loading
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

    antlinker.configTitle({
      type: "label",
      title: "返校人员统计",
      fail: function () { },
      success: function () { }
    });

    this.PageAjax.type = this.navParams.get('type');
    this.PageAjax.academy = this.navParams.get('academy');
    this.PageAjax.class = this.navParams.get('class');
    this.level = JSON.parse(sessionStorage.getItem('level'));

    if (this.level == '3' || this.PageAjax.class) {
      this.powerType = 'noauth';
    } else {
      this.powerType = 'auth';
    }
  }

  //初始化加载
  ionViewDidEnter() {
    if (this.PageAjax.class) {
      this.loadNotCount();
    }

    this.PageAjax.Page = 1;
    this.reasonCode = '';
    this.loadStatus();
    this.loadDetailList();
  }

  //获取班级未统计数据
  loadNotCount() {
    this.http.postJSON({
      Router: ServelUrl.Url.getnostatistics,
      Method: 'POST',
      Body: {
        classcode: this.PageAjax.class
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.NotCounttotal = res.data.total;
      }
    },
      err => console.log(err));
  }

  //获取未到原因关键字
  loadStatus() {
    var codeID = '';
    if (this.PageAjax.class) {
      codeID = this.PageAjax.class
    } else {
      codeID = this.PageAjax.academy
    }

    this.http.postJSON({
      Router: ServelUrl.Url.getreturnstatusstatistics,
      Method: 'POST',
      Body: {
        range: this.PageAjax.type,
        type: this.powerType,
        code: codeID,
      }
    }).then(res => {
      if (!res.feedbackCode) {
        this.reasonObj = res.data
        for (let i = 0; i < this.reasonObj.length; i++) {
          this.reasonObj[i]['checked'] = false;
        }

        console.log(this.reasonObj)
      }
    },
      err => console.log(err));
  }

  //获取详细未返校数据
  loadDetailList() {

    var codeID = '';
    if (this.PageAjax.class) {
      codeID = this.PageAjax.class
    } else {
      codeID = this.PageAjax.academy
    }

    this.http.postJSON({
      Router: ServelUrl.Url.getdetails,
      Method: 'POST',
      Body: {
        range: this.PageAjax.type,
        type: this.powerType,
        code: codeID,
        reasoncode: this.reasonCode,
        pageindex: this.PageAjax.Page,
        pagesize: this.PageAjax.PageNo,
      }
    }).then(res => {
      this.mengGo = false;
      if (!res.FeedbackCode) {
        if (res.data.total) {
          this.dataSet = res.data.items;
          this.haveClass = false;
        } else {
          this.haveClass = true;
        }
      }
    },
      err => console.log(err));
  }

  //选择未到关键字
  checkWhyBtn(obj) {
    this.moreData = true;
    this.reasonCode = '';
    this.reasonObj.forEach(element => {
      if (element.typecode == obj && element.checked) {
        element.checked = false;
        this.reasonCode = '';
      } else {
        element.checked = false;
        if (element.typecode == obj && !element.checked) {
          element.checked = true;
          this.reasonCode = element.typecode;
        }
      }
    });
    
    this.PageAjax.Page = 1
    this.loadDetailList();
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
        class: this.PageAjax.class,
        email: this.Email
      }
    }).then(res => {
      if (!res.FeedbackCode) {
        this.HelpUtils.toastPopTop('发送成功');
      }else if(res.FeedbackText == '没有未到数据'){
        this.HelpUtils.toastPopTop('没有未到数据');
      }
    },
      err => console.log(err));
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

  //查看放大图片
  navPreview(params) {
    this.navCtrl.push('PreviewPage', params)
  }

  //下拉加载
  doInfinite(infiniteScroll) {
    var codeID = '';
    if (this.PageAjax.class) {
      codeID = this.PageAjax.class
    } else {
      codeID = this.PageAjax.academy
    }
    this.PageAjax.Page++
    this.http.postJSON({
      Router: ServelUrl.Url.getdetails,
      Method: 'POST',
      Body: {
        range: this.PageAjax.type,
        type: this.powerType,
        code: codeID,
        reasoncode: this.reasonCode,
        pageindex: this.PageAjax.Page,
        pagesize: this.PageAjax.PageNo,
      }
    }).then(res => {
      if (res.data.items != null) {
        this.moreData = true;
        this.dataSet = this.dataSet.concat(res.data.items);
      } else {
        this.moreData = false;
        this.PageAjax.Page = 1;
        this.reasonCode = '';

      }
      infiniteScroll.complete();
    },
      err => console.log(err));
  }

  //关闭提示框
  overbox() {
    this.tapBoxSH = false;
  }

  //跳转未统计页面
  gotoNotTotal() {
    this.navCtrl.push('NotCountPage', { classcode: this.PageAjax.class })
  }

}
