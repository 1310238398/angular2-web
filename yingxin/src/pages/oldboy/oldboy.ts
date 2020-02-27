/**
 * Created by hanzhendong on 2017/6/22.
 */
import {Component} from "@angular/core";
@Component({
  selector: 'page-oldboy',
  templateUrl: 'oldboy.html'
})
export class OldBoy {
  constructor() {
    antlinker.configTitle({
      type: "label",
      title: '迎新',
      fail: function () {

      },
      success: function () {
      }
    });
  }

  /*跳转到首页*/
  onIndex() {
    var uri = 'ant://home/open';
    antlinker.openNewView({
      uri: uri,
      fail: function () {

      }
    });
  }

  /*跳转到问问*/
  onHelp() {
    var uri = 'ant://ask/columnlist/open';
    antlinker.openNewView({
      uri: uri,
      fail: function () {

      }
    });

  }
}
