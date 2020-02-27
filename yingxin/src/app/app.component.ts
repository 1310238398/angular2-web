import {Component, ViewChild} from '@angular/core';
import {HttpService} from "../http/http.Service";
import {ServelUrl} from "./ServelUrl";
import {Nav} from "ionic-angular";
import {TaskPage} from "../pages/task/task";
import {OldBoy} from "../pages/oldboy/oldboy";
import {Index} from "../pages/index/index";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  constructor(private httpService: HttpService) {
    this.httpService.postJSON({
      Router: ServelUrl.Url.check,
      Method: 'POST',
      Body: {}
    }).then(res => {
      /*是否初始化*/
      if (res.Data.IsDone) {
        /*是否新生*/
        if (res.Data.IsNew) {
          this.nav.setRoot(TaskPage);
        } else {
          this.nav.setRoot(OldBoy);
        }
      } else {
        this.nav.setRoot(Index);
      }
    })
  }
  ionViewDidEnter(){
  }

}

