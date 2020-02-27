import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {HelpUtils} from "./utils/HelpUtils";
import {HttpService} from "../http/http.Service";
import {IndexPage} from "../pages/Index";
import {ListPage} from "../pages/vote/List";
import {ViewPage} from "../pages/vote/View";

import {FormsModule} from "@angular/forms";
import {OptData} from "./service/OptData";
import {ColData} from "./service/ColData";
import {DetailPage} from "../pages/vote/detail/Detail";
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    ListPage,
    ViewPage,
    DetailPage
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios'
    }, {
      links: [
        {component: IndexPage, name: 'index', segment: 'index', defaultHistory: []},//调课申请列表
        {component: ListPage, name: 'listPage', segment: 'listPage'},//投票列表
        {component: ViewPage, name: 'viewPage', segment: 'viewPage/:vid'},//投票详情
        {component: DetailPage, name: 'Detail', segment: 'Detail'},//投票详情

      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    ListPage,
    ViewPage,
    DetailPage
  ],
  providers: [HttpService, HelpUtils, OptData, ColData, {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }]
})
export class AppModule {
}
