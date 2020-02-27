import {Component} from '@angular/core';
import {LoginPage} from "../pages/login/LoginPage";
import {ResultPage} from "../pages/result/ResultPage";
/**
 * Created by hanzhendong on 2017/3/15.
 */
@Component({
  template: `
    <ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = ResultPage;

  constructor() {
    //document.getElementById('spinnerw').style.display = 'none';
  }
}
