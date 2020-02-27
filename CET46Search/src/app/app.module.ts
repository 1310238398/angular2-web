import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";

import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import { BrowserModule } from "@angular/platform-browser";

//组件
import { loginPage } from '../pages/queryScore/loginOn/login.component';
import { waitingPage } from '../pages/queryScore/waiting/waiting.component';
import { introducePage } from '../pages/estimateScore/introduce/introduce.component';
import { introduceLoginPage } from '../pages/estimateScore/login/login.component';
import { resultPage } from '../pages/estimateScore/result/result.component';
import { scorePage } from '../pages/queryScore/score/score.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    loginPage,
    waitingPage,
    introducePage,
    introduceLoginPage,
    resultPage,
    scorePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      mode: 'ios',
    }, {

        links: [
          { component: loginPage, name: 'loginPage'},
          //  {component: waitingPage, name: 'waitingPage', segment: 'waitingPage'},
          { component: introducePage, name: 'introducePage' },
          { component: introduceLoginPage, name: 'introduceLoginPage' },
          { component: resultPage, name: 'resultPage/:UId/:share' },
          { component: scorePage, name: 'scorepage/:data/:share' }
        ]
      }

    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    loginPage,
    waitingPage,
    introducePage,
    introduceLoginPage,
    resultPage,
    scorePage
  ],
  providers: [


    StatusBar,
    HttpService,
    HelpUtils,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
