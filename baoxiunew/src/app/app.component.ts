import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ServelUrl } from './ServelUrl';
import { Nav } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;
  rootPage: any;

  constructor(
    private httpServise: HttpService
  ) {
    console.log('进入appcomponent');
    console.log('this.rootPage----' + this.rootPage);

    // 如果url是初始的，就根据角色设置默认URL
    let urlInfo = window.location.href.split("/#/")
    if (urlInfo.length < 2 || !urlInfo[1] || urlInfo[1] == "") {
      this.httpServise.postJSON({
        Router: ServelUrl.Url.queryuserrole,
        Method: 'POST',
        Body: {}
      }).then((res) => {
        console.log('角色请求返回');
        if (res.Data && res.Data.length) {
          if (res.Data[0].Code == 'RepairPersonnel') {
            this.nav.setRoot('WorkerTaskListPage');
          } else if (res.Data[0].Code == 'PropertyManager') {
            // this.rootPage = 'ManagerTaskListPage';
            this.nav.setRoot('ManagerTaskListPage');
          } else {
            this.nav.setRoot('BaoXiuPage');
          }
        } else {
          this.nav.setRoot('BaoXiuPage');
        }
      });
    }
  }
}