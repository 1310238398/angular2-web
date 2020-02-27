import { Component, ViewChild } from '@angular/core';
import { Nav } from "ionic-angular";
import { HttpService } from "../http/http.Service";
import { HelpUtils } from "./utils/HelpUtils";
import { ServelUrl } from "./ServelUrl";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;
  rootPage: any;

  constructor(private http: HttpService, private HelpUtils: HelpUtils) {
    this.http.postJSON({
      Router: ServelUrl.Url.getentrancelist,
      Method: 'POST',
      Body: {}
    }).then(
      comments => {
        if (!comments.FeedbackCode) {
          switch (comments.Data.level) {
            case '1'://班干部
              this.rootPage = 'IndexStudentPage';
              break;
            case '2'://任课老师
              this.rootPage = 'IndexTeacherPage';
              break;
            case '3'://班主任或辅导员或学院分管领导
              this.rootPage = 'IndexOtherPage';
              break;
          }
        } else {
          this.HelpUtils.alert(comments.FeedbackText);
        }
      });
  }

}

