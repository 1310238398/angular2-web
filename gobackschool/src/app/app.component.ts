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

    
    //this.rootPage = 'NotReachedInfoPage';

    this.http.postJSON({
      Router: ServelUrl.Url.getaccess,
      Method: 'GET',
      Body: {}
    }).then(comments => {
      if (!comments.FeedbackCode) {
        sessionStorage.setItem('level', JSON.stringify(comments.data.level));
        switch (comments.data.level) {
          case '1'://班干部
            sessionStorage.setItem('classcode', JSON.stringify(comments.data.classcode));
            this.rootPage = 'NameListPage';
            break;
          case '2'://院级
            this.rootPage = 'ClassListPage';
            break;
          case '3'://校级
            this.rootPage = 'AcademicListPage';
            break;
          case '5'://无权限
            alert('无访问权限')
            break;
        }
      } else {
        this.HelpUtils.alert(comments.FeedbackText);
      }
    });
  }

}



