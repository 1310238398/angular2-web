import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DetailPage } from "../pages/classimport/Detail";
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import {BrowserModule} from "@angular/platform-browser";
import {DescPage} from "../pages/desc/desc";

@NgModule({
    declarations: [
        MyApp,
        DetailPage,
        DescPage
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
                {component: DetailPage, name: 'Detail', segment: '',defaultHistory:[]},
                {component: DescPage, name: 'DescPage', segment: 'DescPage',defaultHistory:[]}

            ]
        }),
        //RouterModule.forRoot(routes)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        DetailPage,
        DescPage
    ],
    providers: [HttpService, HelpUtils, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
