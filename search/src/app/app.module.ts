import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/Search';
import { DetailPage } from "../pages/search/detail/Detail";
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import { SanitizeHtmlPipe } from "./utils/SanitizeHtmlPipe";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [
        MyApp,
        SearchPage,
        DetailPage,
        SanitizeHtmlPipe
    ],
    imports: [
      BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            iconMode: 'ios',
            mode: 'ios',
        }, {
            links: [
                {component: SearchPage, name: 'Search', segment: '',defaultHistory: [] },
                {component: DetailPage, name: 'Detail', segment: 'detail',defaultHistory: ['SearchPage']}

            ]
        }),
        //RouterModule.forRoot(routes)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SearchPage,
        DetailPage
    ],
    providers: [HttpService, HelpUtils, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
