import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PromiseService } from '../promise.servise';
import { SignResult } from '../promise';
import { ClassPage } from './non-worker-class';

@Component({
  selector: 'non-worker-major',
  templateUrl: 'non-worker-major.html'
})
export class MajorPage {
  commitID = '';
  majorList: SignResult[] = [];
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private promiseServise: PromiseService
  ) { }
  ionViewDidEnter(): void {
    this.commitID = this.navParams.get('commitid');
    const academyid = this.navParams.get('academyid');
    const academyName = this.navParams.get('academyname');
    antlinker.configTitle({
      type: "label",
      title: academyName,
      fail: function () {

      },
      success: function () {
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

    if (this.commitID && academyid) {
      this.getMajorList(this.commitID, academyid);
    }
  }

  // 模板内容
  getMajorList(commitid: string, academyid: string): void {
    this.promiseServise.queryNoSchWorkersResult(commitid, 1, academyid).then(res => {
      if (res.RE === 0) {
        this.majorList = res.Data;
      }
    });
  }

  // 班级
  goToClass(major: SignResult): void {
    this.navCtrl.push(ClassPage, { commitid: this.commitID, majorid: major.DeptID,majorname: major.DeptName });
  }

}