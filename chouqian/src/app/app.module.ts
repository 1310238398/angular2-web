import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import { LoginPage } from "../pages/login/LoginPage";
import { ResultPage } from "../pages/result/ResultPage";
import { LotteryPage } from '../pages/lottery/LotteryPage';
import {FormsModule} from "@angular/forms";
import {LotteryDetailPage} from "../pages/lottery/detail/LotteryDetailPage";
import { BrowserModule } from '@angular/platform-browser';

/**
 * Created by hanzhendong on 2017/3/15.
 */
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ResultPage,
    LotteryPage,
    LotteryDetailPage
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      iconMode: 'ios',
      tabsPlacement: 'bottom',
      pageTransition: 'ios',
    }, {
      links: [
        {component: ResultPage, name: 'ResultPage', segment: 'resultpage', defaultHistory: []},
        {component: LoginPage,name: 'LoginPage', segment: 'loginpage'},
        {component: LotteryDetailPage,name: 'LotteryDetailPage', segment: 'lotterydetailpage/:Status'},
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ResultPage,
    LotteryPage,
    LotteryDetailPage
  ],
  providers: [HttpService, HelpUtils, {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }]
})
export class AppModule {
}
