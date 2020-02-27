import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { NewPage } from './new';
import { PromiseDetailPage } from './promise-detail';
import { ProgressPage } from './progress';

import { PromiseService } from '../promise.servise';

import { PromiseBook } from '../promise';

@Component({
  selector: 'promise-list',
  templateUrl: 'promise-list.html'
})
export class PromiseListPage {
  queryType = '0';
  count = 20;
  commitmentID = '';
  pro = new PromiseBook();
  promiseList: PromiseBook[] = [];
  reachBottom = false; //判断是否滑动到底部
  reachBottomWaite = false;
  reachBottomIng = false;
  reachBottomOver = false;
  iSNull: boolean;
  currentYear = new Date().getFullYear().toString();

  constructor(public navCtrl: NavController, public promiseServise: PromiseService, public ref: ChangeDetectorRef, private toastCtrl: ToastController, private alertCtrl: AlertController,
  ) {
    localStorage.removeItem('commits');
  }
  // ngOnInit(): void {
    
  // }
  // 初始化
  ionViewDidEnter(): void {
    console.log("PromiseListPage ionViewWillEnter")    
    antlinker.configTitle({
      type: "label",
      title: '承诺书',
      fail: function () {

      },
      success: function () {
      }
    });
    antlinker.configTitleButton({
      type: 'back',
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
    this.selectedPromisesList();

  }

  segmentChanged(event: any) {
    this.queryType = event.value;
    this.reachBottom=false;
    this.reachBottomWaite=false;
    this.reachBottomIng=false;
    this.reachBottomOver=false;
    this.selectedPromisesList();
  }


  // promise列表
  selectedPromisesList(): void {
    this.promiseServise.queryPromisePage(parseInt(this.queryType, 10), this.count, '').then(res => {
      if (res.RE === 0 && res.Data && res.Data.length > 0) {
        this.iSNull = false;
        this.promiseList = [];
        this.promiseList = res.Data;
        this.commitmentID = this.promiseList[this.promiseList.length - 1].CommitmentID;
      } else if (res.RE === 0 && res.Data && res.Data.length === 0) {
        this.promiseList = [];
        this.iSNull = true;
      }
    });
  }

  // 滚动
  doInfinite(infiniteScroll) {
    this.promiseServise.queryPromisePage(parseInt(this.queryType, 10), this.count, this.commitmentID).then(res => {
      if (res.RE === 0 && res.Data && res.Data.length > 0) {
        // [this.promiseList, ...res.Data];
        this.promiseList = this.promiseList.concat(res.Data);
        this.commitmentID = this.promiseList[this.promiseList.length - 1].CommitmentID;
      }
      infiniteScroll.complete();
      if (res.RE === 0 && res.Data.length < 20) {
        infiniteScroll.enable(false);

        this.reachBottom = true;

      }

    });
  }
  doInfiniteWaite(infiniteScroll) {
    this.promiseServise.queryPromisePage(parseInt(this.queryType, 10), this.count, this.commitmentID).then(res => {
      if (res.RE === 0 && res.Data && res.Data.length > 0) {
        // [this.promiseList, ...res.Data];
        this.promiseList = this.promiseList.concat(res.Data);
        this.commitmentID = this.promiseList[this.promiseList.length - 1].CommitmentID;
      }
      infiniteScroll.complete();
      if (res.RE === 0 && res.Data.length < 20) {
        infiniteScroll.enable(false);
        this.reachBottomWaite = true;
      }

    });
  }
  doInfiniteIng(infiniteScroll) {
    this.promiseServise.queryPromisePage(parseInt(this.queryType, 10), this.count, this.commitmentID).then(res => {
      if (res.RE === 0 && res.Data && res.Data.length > 0) {
        // [this.promiseList, ...res.Data];
        this.promiseList = this.promiseList.concat(res.Data);
        this.commitmentID = this.promiseList[this.promiseList.length - 1].CommitmentID;
      }
      infiniteScroll.complete();
      if (res.RE === 0 && res.Data.length < 20) {
        infiniteScroll.enable(false);
        this.reachBottomIng = true
      }

    });
  }
  doInfiniteOver(infiniteScroll) {
    this.promiseServise.queryPromisePage(parseInt(this.queryType, 10), this.count, this.commitmentID).then(res => {
      if (res.RE === 0 && res.Data && res.Data.length > 0) {
        // [this.promiseList, ...res.Data];
        this.promiseList = this.promiseList.concat(res.Data);
        this.commitmentID = this.promiseList[this.promiseList.length - 1].CommitmentID;
      }
      infiniteScroll.complete();
      if (res.RE === 0 && res.Data.length < 20) {
        infiniteScroll.enable(false);
        this.reachBottomOver = true;
      }

    });
  }


  // 比对年份
  compareA(i: number): boolean {
    console.log(this.currentYear)
    if (i == 0) {
      if (this.promiseList[i].CreateTime.substring(0, 4) !== this.currentYear) {
        return true;
      } else {
        return false;
      }
    }
    if (this.promiseList[i].CreateTime.substring(0, 4) === this.promiseList[i - 1].CreateTime.substring(0, 4)) {
      return false;
    } else {
      return true;
    }
  }

  // removeHtml(shtml: string): string {
  //   let content = '';
  //   let reg1 = new RegExp("<style[^>]*?>(\\s*?|.*?)*?</style>", "gi");    // 标签的正则表达式
  //   let reg2 = new RegExp("<script[^>]*?>(\\s*?|.*?)*?</script>", "gi");    // 标签的正则表达式
  //   let reg3 = new RegExp("<[^<]*>", "gi");    // 标签的正则表达式
  //   let reg4 = new RegExp("[\\n\\r]*");    // 标签的正则表达式
  //   let reg5 = new RegExp("/&nbsp;/");    // 标签的正则表达式
  //   content = shtml.replace(reg1, "").replace(reg2, "").replace(reg3, "").replace(reg4, "").replace(reg5, "");

  //   return content.length > 50 ? content.substring(0, 51) + '...' : content;
  // }

  // 发布
  publish(pro: PromiseBook): void {
    this.promiseServise.publish(pro.CommitmentID).then(res => {
      if (res.RE === 0) {
        pro.Status = 1;
      }
    });
  }

  // 修改发文范围
  changeScope(commitid: string): void {
    // 选人
    this.pro.CommitmentID = commitid;
    this.promiseServise.queryMember(commitid).then(res => {
      if (res.RE === 0) {
        this.pro.Members = res.Data;
        var that = this;
        console.log(`this.pro.Members+++${this.pro.Members}`);
        antlinker.openNativeRollSelect({
          Datas: that.pro.Members,
          success: function () {
            //jssdk成功
          },
          fail: function () {
            // jssdk失败
          },
          selected: function (response) {
            //选择完成后处理response（包含选择的人员）
            that.pro.Members = response;
            that.queryUserCount(response);
          }
        })
      }
    });

  }

  queryUserCount(member: any): void {
    this.promiseServise.queryUserCount(member).then(res => {
      console.log('res++ + ' + JSON.stringify(res));
      if (res.RE === 0) {
        let desc = '';
        if (res.Data.Count === 0) {
          this.pro.Members = [];
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
    }).then(() => {
      this.save();
    });
  }

  // 精确查询
  getPromiseOne(id: string): void {
    this.promiseServise.queryPromiseone(id).then(res => {
      if (res.RE === 0) {
        this.pro = res.Data;
      }
    }).then(() => {

    });
  }

  // 保存
  save(): void {
    this.promiseServise.editMember(this.pro.CommitmentID, this.pro.Members).then(res => {
      if (res.RE === 0) {
        // let toast = this.toastCtrl.create({
        //   message: '修改成功发文范围成功',
        //   duration: 3000,
        //   position: 'bottom'
        // });
        // toast.present();
      }
    });
  }

  // 再次发布
  rePublish(id: string): void {
    localStorage.removeItem('commits');
    this.navCtrl.push(NewPage, { commitid: id });
  }

  // 结束
  finish(pro: PromiseBook): void {
    let alert = this.alertCtrl.create({
      title: '',
      message: '结束后未签署的学生将无法再签署，确定结束吗？',
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
            console.log('Buy clicked');
            this.promiseServise.recycle(pro.CommitmentID).then(res => {
              if (res.RE === 0) {
                pro.Status = 2;
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  // 新建
  newPage(): void {
    localStorage.removeItem('commits');
    this.navCtrl.push(NewPage);
  }

  // 详情页
  goToDetail(id: string): void {
    this.navCtrl.push(PromiseDetailPage, { id: id });
  }

  // 查看进度
  checkProgress(id: string, ac: string): void {
    this.navCtrl.push(ProgressPage, { id: id, action: ac });
  }

}
