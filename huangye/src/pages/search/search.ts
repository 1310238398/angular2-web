/*
 * create by hanzhendong 2016/11/27
 * */
import {Component} from '@angular/core';
import {ServelUrl} from "../../app/ServelUrl";
import {HelpUtils} from "../../app/utils/HelpUtils";
import {HttpService} from "../../http/http.Service";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-search',
  templateUrl: './search.html'
})
export class SearchPage {
  items: Array<any> = [];

  constructor(public navCtrl: NavController, private HelpUtils: HelpUtils, private http: HttpService) {
    /*  antlinker.configTitle({
        type: "label",
        title: '黄页',
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

      });*/
  }

  ionViewDidEnter() {
    this.initializeItems();
  }

  initializeItems() {
    this.http.postJSON({
      Router: ServelUrl.Url.getList,
      Method: 'POST',
      Body: {
        Type: 'bumen',
        SearchValue: ''
      }
    }).then(
      comments => {
        this.items = comments.Data.bumen || [];
      });
  }


  navToSearch() {
    var uri = 'ant://contacts/yellowpages/open?URI=' + encodeURIComponent('#/nav/n4/' + 'SearchHistory')
    antlinker.openNewView({
      uri: uri,
      fail: function () {

      }
    });
  //   console.log(1);
    //this.navCtrl.push('SearchHistory');
  }

  nav(page, flag = false) {
    var uri = '';
    if (flag) {
      uri = 'ant://antwebview/open?URL=' + page + '&TITLE=集结号单车'
      // this.HelpUtils.toastPop(uri)
    } else {
      //uri = 'ant://h5app/open?URL=' + encodeURIComponent('qingjia/#' + '/myapplydetailpage/331fb538-0d48-4d82-acdf-51e3caf52779')
      uri = 'ant://contacts/yellowpages/open?URI=' + encodeURIComponent('#/nav/n4/' + page)
    }
    //this.navCtrl.push(page);
    antlinker.openNewView({
      uri: uri,
      fail: function () {

      }
    });

    //  this.navCtrl.push(page);
  }

  /*
   * 打电话
   * */
  callPhone(params) {
    this.HelpUtils.callUp(params)
  }


  /*
   * 跳转
   * */
  NavigationTo(item) {
    var uri = 'ant://contacts/yellowpages/open?URI=' + encodeURIComponent('#/nav/n4/' + 'BumenPage');
    localStorage.setItem('item',JSON.stringify(item));
    antlinker.openNewView({
      uri: uri,
      fail: function () {

      }
    });
    // window.location.href =encodeURIComponent('#/DetailPage/bumen/' + JSON.stringify(item))
    // this.navCtrl.push('DetailPage', {type: 'bumen', item: JSON.stringify(item)});
  }
}
