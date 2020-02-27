import {Component} from "@angular/core";
import {HelpUtils} from "../../app/utils/HelpUtils";
@Component({
  selector: 'page-bumen',
  templateUrl: './bumen.html'
})
export class BumenPage {
  item: any;

  constructor(private HelpUtils: HelpUtils) {
    this.item = JSON.parse(localStorage.getItem('item'))||'';
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
}
