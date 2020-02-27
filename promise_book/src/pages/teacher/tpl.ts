import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TplDetailPage } from './tpl-detail';
import { PromiseService } from '../promise.servise';
import { Tpl } from '../promise';

@Component({
  selector: 'tpl',
  templateUrl: 'tpl.html'
})
export class TplPage {
  items: any[] = ['诚信考试承诺书', '假期安全承诺书', '承诺书三'];
  tplList: Tpl[] = [];

  constructor(public navCtrl: NavController, public promiseServise: PromiseService) {

  }

  // 初始化
  ngOnInit() {
    this.getTplList();
  }

  ionViewDidEnter(): void {
    antlinker.configTitle({
      type: "label",
      title: '模板',
      fail: function () {

      },
      success: function () {
      }
  });
  // antlinker.configNavigationButton({
  //     type: ['more'],
  //     moreOption: ["refresh"],
  //     success: function () {
  //         //设置右上角按钮成功
  //     },
  //     fail: function () {
  //         // 设置右上角按钮失败
  //     },
  //     trigger: function () {
  //         //点击标题时调用
  //     }
  // });
  }

  // promise列表
  getTplList(): void {
    this.promiseServise.queryTplList().then(res => {
      if (res.RE === 0 && res.Data && res.Data.length > 0) {
        this.tplList = res.Data;
      }
    });
  }

  itemSelected(tplId: string): void {
    this.navCtrl.push(TplDetailPage, { id: tplId });
  }

}