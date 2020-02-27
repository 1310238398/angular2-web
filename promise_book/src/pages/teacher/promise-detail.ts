import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { PromiseService } from '../promise.servise';

// import { PromiseListPage } from './promise-list';
import { ProgressPage } from './progress';
import { NewPage } from './new';

import { PromiseBook } from '../promise';

@Component({
  selector: 'promise-detail',
  templateUrl: 'promise-detail.html'
})
export class PromiseDetailPage {
  promiseBook = new PromiseBook();
  year = '';
  month = '';
  day = '';
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private promiseServise: PromiseService,
    private alertCtrl: AlertController  ) { }

  ionViewDidEnter(): void {
    this.promiseBook.CommitmentID = this.navParams.get('id');
    if (this.promiseBook.CommitmentID) {
      this.getPromiseOne(this.promiseBook.CommitmentID);
    }
  }

  // 精确查询
  getPromiseOne(id: string): void {
    this.promiseServise.queryPromiseone(id).then(res => {
      if (res.RE === 0) {
        antlinker.configTitle({
          type: "label",
          title: res.Data.Title,
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
        this.promiseBook = res.Data;
        if (this.promiseBook.WrittenTime) {
          this.year = this.promiseBook.WrittenTime.substring(0, 4);
          this.month = this.promiseBook.WrittenTime.substring(4, 6);
          this.day = this.promiseBook.WrittenTime.substring(6, 8);
        }
      }
    });
  }

  // 发布
  publish(): void {
    this.promiseServise.publish(this.promiseBook.CommitmentID).then(res => {
      if (res.RE === 0) {
        this.getPromiseOne(this.promiseBook.CommitmentID);
      }
    });
  }

  // 结束
  finish(): void {
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
            this.promiseServise.recycle(this.promiseBook.CommitmentID).then(res => {
              if (res.RE === 0) {
                this.getPromiseOne(this.promiseBook.CommitmentID);
              }
            });
          }
        }
      ]
    });
    alert.present();

  }

  // 修改发文范围
  editMembers(): void {

    this.promiseServise.queryMember(this.promiseBook.CommitmentID).then(res => {
      if (res.RE === 0) {
        this.promiseBook.Members = res.Data;
        var that = this;
        antlinker.openNativeRollSelect({
          Datas: that.promiseBook.Members,
          success: function () {
            //jssdk成功
          },
          fail: function () {
            // jssdk失败
          },
          selected: function (response) {
            //选择完成后处理response（包含选择的人员）
            that.promiseBook.Members = response;

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
    }).then(() => {
      this.save();
    });
  }

  // 保存
  save(): void {
    this.promiseServise.editMember(this.promiseBook.CommitmentID, this.promiseBook.Members).then(res => {
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

  // 查看进度
  goto(ac: string): void {
    this.navCtrl.push(ProgressPage, { id: this.promiseBook.CommitmentID, action: ac });
  }

  // 再次发布
  rePublish(): void {
    this.navCtrl.push(NewPage, { commitid: this.promiseBook.CommitmentID });
  }

}