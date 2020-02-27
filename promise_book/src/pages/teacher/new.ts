import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateTime } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { PromiseService } from '../promise.servise';

import { PromiseListPage } from './promise-list';
import { TplPage } from './tpl';
import { PreviewPage } from './preview';

import { PromiseBook, Member } from '../promise';
import { App, ViewController } from 'ionic-angular';


@Component({
  selector: 'new',
  templateUrl: 'new.html'
})
export class NewPage {
  @ViewChild(DateTime) datePicker: DateTime;
  commit: PromiseBook;
  promiseBook = new PromiseBook();
  selectMembers = true;
  myDate = "";
  checkTitle = false;
  checkContent = false;
  ISOinCode = (new Date()).toISOString();
  isCreater: number;
  loading = false;
  options: any = {
    placeholderText: '请在此输入正文，系统会自动生成承诺人与签署日期',
    charCounterCount: false,
    charCounterMax: 4999,
    height: 220,
    toolbarButtons: [],
    imageInsertButtons: []
  }
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private promiseServise: PromiseService,
    private toastCtrl: ToastController,
    public appCtrl: App,
    private alertCtrl: AlertController) {
    console.log('constructor');
    this.promiseBook.Members = [];
  }

  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
    antlinker.configTitle({
      type: "label",
      title: "新建承诺书",
      fail: function () {

      },
      success: function () {
      }
    });
    antlinker.configTitleButton({
      type: 'close',
      text: '关闭',
      fail: function () {

      },
      success: function () {
      },
      trigger: function () {
      }
    });
    // antlinker.configNavigationButton({
    //   type: ['more'],
    //   moreOption: ["refresh"],
    //   success: function () {
    //     //设置右上角按钮成功
    //   },
    //   fail: function () {
    //     // 设置右上角按钮失败
    //   },
    //   trigger: function () {
    //     //点击标题时调用
    //   }
    // });
    const tplId = this.navParams.get('tplId');
    const commitID = this.navParams.get('commitid');
    // this.commit = this.navParams.get('commit');
    this.commit = JSON.parse(localStorage.getItem("commits"));
    if (tplId) {
      this.getTplOne(tplId);
      localStorage.removeItem('commits');
    }
    if (commitID) {
      this.getPromiseOne(commitID);
      localStorage.removeItem('commits');
    }
    if (this.commit) {
      //alert(JSON.stringify(this.commit));
      this.promiseBook.Content = this.commit.Content;
      this.promiseBook.Title = this.commit.Title;
      this.promiseBook.Members = this.commit.Members;
      this.promiseBook.WrittenTime = this.commit.WrittenTime;
      if (this.promiseBook.Title) {
        this.checkTitle = true
      }
      if (this.promiseBook.Content) {
        this.checkContent = true
      }
      this.selectMembers = false;
      if (this.promiseBook.WrittenTime) {
        const date = this.promiseBook.WrittenTime.substring(0, 4) + '-' + this.promiseBook.WrittenTime.substring(4, 6) + '-' + this.promiseBook.WrittenTime.substring(6);
        this.promiseBook.WrittenTime = new Date(date).toISOString();
      }
      localStorage.removeItem('commits');
    }
  }

  // 精确查询
  getPromiseOne(id: string): void {
    this.promiseServise.queryPromiseone(id).then(res => {
      if (res.RE === 0) {
        this.promiseBook.Title = res.Data.Title;
        this.promiseBook.Content = res.Data.Content;
        if (this.promiseBook.Title) {
          this.checkTitle = true
        }
        if (this.promiseBook.Content) {
          this.checkContent = true
        }
        this.isCreater = res.Data.IsCreater;
        this.queryMember(id);
      }
    });
  }

  queryMember(commitid: string): void {
    this.promiseServise.queryMember(commitid).then(res => {
      if (res.RE === 0) {
        if (this.isCreater === 1) {
          this.selectMembers = false;
          this.promiseBook.Members = res.Data;
        }
      }
    });
  }

  // 模板内容
  getTplOne(id: string): void {

    this.promiseServise.queryTplOne(id).then(res => {
      if (res.RE === 0) {
        this.promiseBook.Title = res.Data.Title;
        this.promiseBook.Content = res.Data.Content;
        if (this.promiseBook.Title) {
          this.checkTitle = true
        }
        if (this.promiseBook.Content) {
          this.checkContent = true
        }
      }
    });
  }

  // 一键删除 标题
  clearTitle(): void {
    console.log('clear title');
    this.promiseBook.Title = '';
    this.checkTitle = false;
  }

  // 一键删除 内容
  clearContent(): void {
    console.log('clear Content');

    this.promiseBook.Content = '';
    this.checkContent = false;
  }

  // 标题超长提示
  getTitleLength(event: any) { // with type info
    if (this.promiseBook.Title && this.promiseBook.Title.trim().length === 0) {
      this.checkTitle = false;
      return;
    } else if (this.promiseBook.Title && this.promiseBook.Title.trim().length > 0) {
      this.checkTitle = true;
    }
    if (this.promiseBook.Title && this.promiseBook.Title.trim().length >= 30) {
      let toast = this.toastCtrl.create({
        message: '最多输入30字',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  // 内容超长提示
  getModelLength(event: any) { // with type info
    console.log(this.promiseBook.Content.length);
    if (this.promiseBook.Content) {
      let contentHtml = this.promiseBook.Content;  //获取html代码
      let reg1 = new RegExp("<style[^>]*?>(\\s*?|.*?)*?</style>", "gi");    // 标签的正则表达式
      let reg2 = new RegExp("<script[^>]*?>(\\s*?|.*?)*?</script>", "gi");    // 标签的正则表达式
      let reg3 = new RegExp("<[^<]*>", "gi");    // 标签的正则表达式
      let reg4 = new RegExp("[\\n\\r]*");    // 标签的正则表达式
      let reg5 = new RegExp("/[ ]|[&nbsp;]/g");    // 标签的正则表达式
      let con = contentHtml.replace(reg1, "").replace(reg2, "").replace(reg3, "").replace(reg4, "");
      con = con.replace(/[ ]|[&nbsp;]/g, '');
      if (con.trim().length === 0) {
        this.checkContent = false;
        return;
      } else {
        this.checkContent = true;
      }
      if (con.length >= 5000) {
        let toast = this.toastCtrl.create({
          message: '最多输入5000字',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    }
  }

  // 选人
  select(): void {
    var that = this;
    antlinker.openNativeRollSelect({
      Datas: that.promiseBook.Members,
      success: function () {
        //jssdk成功
      },
      fail: function () {
        // jssdk失败
      },
      selected: (response) => {
        //选择完成后处理response（包含选择的人员）
        // alert('ios测试弹出用' + JSON.stringify(response));

        console.log(JSON.stringify(response));
        if (response.length > 0) {
          // setTimeout(()=>this.loading = true,1);
          this.selectMembers = false;
          this.promiseBook.Members = response;
          this.userCount(response);
        } else {
          this.selectMembers = true;
          this.promiseBook.Members = [];
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: '承诺书由学生签署，此范围内没有符合条件的用户，请重新选取',
            buttons: ['知道了']
          });
          alert.present();
        }

      }
    })
  }

  userCount(data: any[]): void {
    // console.log(this.loading);
    this.promiseServise.queryUserCount(data).then(res => {
      // this.loading = false;
      if (res.RE === 0) {
        let desc = '';
        if (res.Data.Count === 0) {
          this.selectMembers = true;
          this.promiseBook.Members = [];
          desc = `承诺书由学生签署，此范围内没有符合条件的用户，请重新选取`;
        } else {
          if (res.Data.IsCounselor === 1) {
            desc = `承诺书由学生签署，过滤掉不符合要求的用户后，将给${res.Data.Count}名你管理的学生发文`;
          } else {
            desc = `承诺书由学生签署，过滤掉不符合要求的用户后，将给${res.Data.Count}名学生发文`;
          }
        }
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: desc,
          buttons: ['知道了']
        });
        alert.present();
      }
    });
  }
  // test() {
  //   console.log((new Date()).toISOString());
  //   this.promiseBook.WrittenTime = (new Date()).toISOString();
  // }
  // 保存
  onSubmit(): void {
    if (!this.promiseBook.Title.trim()) {
      let toast = this.toastCtrl.create({
        message: '请输入标题',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return;
    }
    if (!this.promiseBook.Content.trim()) {
      let toast = this.toastCtrl.create({
        message: '请输入正文',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return;
    }
    if (this.promiseBook.WrittenTime) {
      console.log('new' + this.promiseBook.WrittenTime);
      // let date = new Date();
      // var datePipe = new DatePipe("en-US");
      // this.promiseBook.WrittenTime = datePipe.transform(this.promiseBook.WrittenTime, 'yyyyMMdd');
      this.promiseBook.WrittenTime = this.promiseBook.WrittenTime.substring(0, 4) + this.promiseBook.WrittenTime.substring(5, 7) + this.promiseBook.WrittenTime.substring(8, 10);
    } else {
      this.promiseBook.WrittenTime = '';
    }
    console.log('new' + JSON.stringify(this.promiseBook));

    // this.promiseBook.Members = [
    //   {
    //     Type: 9,
    //     BuID: "59a665111d41c8017446a97c"
    //     BuID: '59a665111d41c8017446a97c'
    //   }];
    this.promiseServise.addPromise(this.promiseBook).then(res => {
      if (res.RE === 0) {
        this.navCtrl.setRoot(PromiseListPage);
        // this.appCtrl.getRootNav().push(PromiseListPage);
        // this.navCtrl.setRoot(PromiseListPage);
      }
    });
  }

  goto(): void {
    this.navCtrl.push(TplPage);
  }

  // 预览
  gotoPreview(): void {
    if (this.promiseBook.WrittenTime) {
      console.log(this.promiseBook.WrittenTime);
      this.promiseBook.WrittenTime = this.promiseBook.WrittenTime.substring(0, 4) + this.promiseBook.WrittenTime.substring(5, 7) + this.promiseBook.WrittenTime.substring(8, 10);
      // let date = new Date();
      // var datePipe = new DatePipe("en-US");

      // this.promiseBook.WrittenTime = datePipe.transform(this.promiseBook.WrittenTime, 'yyyyMMdd');
    }
    else {
      this.promiseBook.WrittenTime = '';
    }
    console.log(JSON.stringify(this.promiseBook));
    this.navCtrl.push(PreviewPage, { book: this.promiseBook });
  }

  ionViewWillLeave() {
    console.log("gg")
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    var d = document.querySelector('ion-backdrop');
    if (d) {
      d.dispatchEvent(event)
    }

    localStorage.removeItem('LeaveApply');
  }

}