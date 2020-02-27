import { CetApply } from './../pages/cet/CetApply';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import { CetDetail } from "../pages/cet/detail/CetDetail";
import { Declare } from "../pages/cet/declare/Declare";
import { Apply } from "../pages/cet/apply/Apply";
import { Pop } from "./component/Pop";
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [
        MyApp,
        CetApply,
        Apply,
        CetDetail,
        Declare,
        Pop
    ],
    imports: [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp, {
                mode: 'ios',
                iconMode: 'ios',
                tabsPlacement: 'bottom',
                pageTransition: 'ios',
            },
            {
                links: [
                    {component: CetApply, segment: 'cetapply:/CetApply', defaultHistory: []},
                    {component: Declare, segment: 'declare'},
                ]
            }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CetApply,
        Apply,
        CetDetail,
        Declare
    ],
    providers: [HttpService, HelpUtils, {
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }]
})
export class AppModule {
}
