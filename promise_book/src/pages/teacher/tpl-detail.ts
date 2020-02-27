import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PromiseService } from '../promise.servise';
import { Tpl } from '../promise';
import { NewPage } from './new';

@Component({
  selector: 'tpl-detail',
  templateUrl: 'tpl-detail.html'
})
export class TplDetailPage {
  detail = new Tpl();

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private promiseServise: PromiseService
  ) {
    const id = navParams.get('id');
    if (id) {
      this.getTplOne(id);
    }
  }

  ionViewDidEnter(): void {
    antlinker.configTitle({
      type: "label",
      title: "承诺书模板",
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
  }

  // 模板内容
  getTplOne(id: string): void {
    this.promiseServise.queryTplOne(id).then(res => {
      if (res.RE === 0) {
        this.detail = res.Data;
      }
    });
  }

  // 使用
  use(): void {
    this.navCtrl.push(NewPage, { tplId: this.detail.TplID });
  }

}