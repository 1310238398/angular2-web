import { Component, ViewChild } from '@angular/core';
import { ServelUrl } from "../app/ServelUrl";
import { Nav, Platform, NavParams, NavController } from "ionic-angular";
import { HttpService } from "../http/http.Service";
import { loginPage } from '../pages/queryScore/loginOn/login.component';
import { introducePage } from '../pages/estimateScore/introduce/introduce.component';
import { resultPage } from '../pages/estimateScore/result/result.component'
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = introducePage;
  Estimate: string;

  constructor(private http: HttpService) {
 
  }
}

