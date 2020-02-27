import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DetailPage } from "../pages/detail/Detail";
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [
        MyApp,
        DetailPage,
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
                {component: DetailPage, name: 'Detail', segment: 'detail/:ClassCode',defaultHistory:[]}

            ]
        }),
        //RouterModule.forRoot(routes)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        DetailPage
    ],
    providers: [HttpService, HelpUtils, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
