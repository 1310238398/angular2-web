import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PromiseService } from '../promise.servise';

import { MajorPage } from './non-worker-major';
import { NoSignAcademyPage } from './nosign-academy';
import { StudentsPage } from './students';
import { NoSignPage } from './no-sign';

import { SignCount, SignResult } from '../promise';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressPage {
  commitmentID = '';
  commitmentStatus = 0;
  sign = new SignCount();
  signResultList: SignResult[] = [];
  showProgress = false;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private promiseServise: PromiseService) { }

  ionViewDidEnter(): void {
    this.commitmentID = this.navParams.get('id');
    const action = this.navParams.get('action');
    antlinker.configTitle({
      type: "label",
      title: action,
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

    if (this.commitmentID) {
      this.getSignCount(this.commitmentID);
    }
  }

  // 签署数量
  getSignCount(id: string): void {
    this.promiseServise.signCount(id).then(res => {
      if (res.RE === 0) {
        this.sign = res.Data;
        if (this.sign.TotalCount > 0) {
          let percent = this.sign.SignCount / this.sign.TotalCount;
          if (percent > 0) {
            // this.showProgress = true;
            document.getElementById("circle").style.display = ('block');
            document.getElementById("circle").setAttribute('stroke-dasharray', 408 * percent + " 409");
          } else {
            document.getElementById("circle").style.display = ('none');
          }
        }
        if (res.Data.IsCounselor === 0) { //0非辅导员,1为辅导员
          this.getNoSchoolWorkersResult(this.commitmentID, 0);
        } else {
          this.getSchoolWorkersResult(this.commitmentID);
        }
      }
    });
  }

  // 查询辅导员的签署结果
  getSchoolWorkersResult(id: string): void {
    this.promiseServise.querySchWorkersResult(id).then(res => {
      if (res.RE === 0) {
        this.signResultList = res.Data;
      }
    });
  }

  // 查询非辅导员的签署结果
  getNoSchoolWorkersResult(id: string, type: number): void {
    this.promiseServise.queryNoSchWorkersResult(id, type).then(res => {
      if (res.RE === 0) {
        this.signResultList = res.Data;
      }
    });
  }

  // 进入非辅导员的签署结果->专业界面
  goToMajor(aca: SignResult): void {
    this.navCtrl.push(MajorPage, { commitid: this.commitmentID, academyid: aca.DeptID, academyname: aca.DeptName });
  }

  // 进入辅导员的签署结果->班级内学生界面
  goToStudents(res: SignResult): void {
    this.navCtrl.push(StudentsPage, { commitid: this.commitmentID, classid: res.DeptID, classname: res.DeptName, status: 9 });
  }

  // 谁还未签署->非辅导员->学院界面
  goToAcademy(): void {
    console.log('no-sign');
    this.navCtrl.push(NoSignAcademyPage, { commitid: this.commitmentID });
  }

  // 谁还未签署->辅导员->界面
  goToNoSign(): void {
    this.navCtrl.push(NoSignPage, { commitid: this.commitmentID });
  }


}