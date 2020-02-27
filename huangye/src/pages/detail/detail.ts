/**
 * Created by hanzhendong on 2016/11/29.
 */
import {Component} from '@angular/core';

import {NavParams, IonicPage} from 'ionic-angular';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HelpUtils} from "../../app/utils/HelpUtils";

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  item: any;
  type: string = '';//业务类型
  flagIframe: boolean = false;
  Url: SafeResourceUrl;
  kuaidi: boolean = false;
  kuaidiInfo = {InnerType: '', kuaidiNum: ''};

  constructor( private params: NavParams, private HelpUtils: HelpUtils, private sanitizer: DomSanitizer) {
    this.type = this.params.get('type');
    if (this.type == 'bumen') {
      this.item = JSON.parse(params.get('item'));
    } else {
      this.item = params.get('item');
    }

    this.kuaidiInfo.InnerType = this.params.get('InnerType');
    /*、
     * 调用jssdk
     *
     * */
    antlinker.configTitle({
      type: "label",
      title: '详细',
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
  }

  callUp(params) {
    this.HelpUtils.callUp(params)
  }


  search() {
    if (!this.kuaidiInfo.InnerType) {
      this.HelpUtils.toastPop('未获取到快递类型！');
      return;
    }
    if (!this.kuaidiInfo.kuaidiNum) {
      this.HelpUtils.toastPop('请输入快递单号！');
      return;
    }
    let url = 'https://m.kuaidi100.com/index_all.html?type=' + this.kuaidiInfo.InnerType + '&postid=' + this.kuaidiInfo.kuaidiNum;
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.flagIframe = true;
  }

  choice() {
    switch (this.type) {
      case 'bumen': {
        return true;
      }
      case'chuxing': {
        return true
      }
      case'yinhang': {
        return true
      }
      case'ggfuwu': {
        return true
      }
      case'teacher': {
        return true
      }
    }

  }
}
