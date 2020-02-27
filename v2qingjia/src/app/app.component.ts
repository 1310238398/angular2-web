import {Component, ViewChild} from '@angular/core';
import {HttpService} from "../http/http.Service";
import {HelpUtils} from "./utils/HelpUtils";
import {ServelUrl} from "./ServelUrl";
import {Nav} from "ionic-angular";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;
  rootPage:any ;

  constructor(private http: HttpService, private HelpUtils: HelpUtils) {
    this.http.postJSON({
      Router: ServelUrl.Url.queryleaverole,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        console.log(this.nav);
        console.log(this.nav._linker);
        if (this.nav._linker._history[0].indexOf('myapplydetailpage') != -1 || this.nav._linker._history[0].indexOf('otherdetailpage') != -1 || this.nav._linker._history[0].indexOf('resumeleavedetail') != -1) {
          return false;
        }
        if (!comments.FeedbackCode) {
          switch (comments.Data.Type) {
            case 1://辅导员
            case 3://班主任
            case 7://团支书(导师)
            case 4://学院领导
              //this.nav.setRoot(CounsellorListPage);
              this.rootPage = 'StaffListPage';
              break;
            case 2://学生
              //this.nav.setRoot('ListPage');
              this.rootPage = 'ListPage';
              break;
            case 5://其他人员
              //this.nav.setRoot(OtherListPage);
              this.rootPage = 'OtherListPage';
              break;
          }
        } else {
          this.HelpUtils.alert(comments.FeedbackText);
        }
      });
  }
}

