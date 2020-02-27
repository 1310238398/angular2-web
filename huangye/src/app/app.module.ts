import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {HelpUtils} from "./utils/HelpUtils";
import {HttpService} from "../http/http.Service";
import {BrowserModule} from "@angular/platform-browser";
import {SearchModule} from "../pages/search/search.module";
import {KuaidiModule} from "../pages/kuaidi/kuaidi.module";
import {KuaidiPage} from "../pages/kuaidi/kuaidi";
import {YinhangModule} from "../pages/yinhang/yinhang.module";
import {YinhangPage} from "../pages/yinhang/yinhang";
import {GgfuwuPage} from "../pages/fuwu/ggfuwu";
import {GgfuwuModule} from "../pages/fuwu/ggfuwu.module";
import {DetailModule} from "../pages/detail/detail.module";
import {DetailPage} from "../pages/detail/detail";
import {SearchHistory} from "../pages/search/history/searchhistory";
import {HistoryModule} from "../pages/search/history/searchhistory.module";
import {BumenModule} from "../pages/bumen/bumen.module";
import {BumenPage} from "../pages/bumen/bumen";
import {ChuxingModule} from "../pages/chuxing/chuxing.module";
import {ChuxingPage} from "../pages/chuxing/chuxing";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      mode: 'ios',
    }, {

      links: [
       /* {component: SearchPage, name: 'SearchPage', defaultHistory: []},*/
        {component: DetailPage, name: 'DetailPage', segment: 'DetailPage/:type/:item'},
        {component: SearchHistory, name: 'SearchHistory'},
        {component: BumenPage, name: 'BumenPage'},
        {component: KuaidiPage, name: 'KuaidiPage'},
        {component: YinhangPage, name: 'YinhangPage'},
        {component: ChuxingPage, name: 'ChuxingPage'},
        {component: GgfuwuPage, name: 'GgfuwuPage'}
      ]
    }),
    SearchModule,
    DetailModule,
    HistoryModule,
    KuaidiModule,
    YinhangModule,
    GgfuwuModule,
    BumenModule,
    ChuxingModule
    //RouterModule.forRoot(routes)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [HttpService, HelpUtils, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
