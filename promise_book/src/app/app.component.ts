import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PromiseListPage } from '../pages/teacher/promise-list';
import { StuListPage } from '../pages/student/list';
import { NavPage } from '../pages/navPage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage: any = NavPage;
  constructor() {
    var userType = '';
    var that = this;

    antlinker.getUserBasicInfo({
      fail: function () {

      },
      success: function (res) {
        userType = res.UserType;
        console.log('userType' + userType);
        if (userType === '1') {
          // that.nav.setRoot(StuListPage);
          that.rootPage = StuListPage;
        } else if (userType === '2') {
          // that.nav.setRoot(PromiseListPage);
          that.rootPage = PromiseListPage;
        }

        console.log('this.rootPage' + that.rootPage);
      }

    });

  }
}

