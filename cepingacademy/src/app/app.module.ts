
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser'
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import { ListPage } from "../pages/student/List";
import { CollegePage } from "../pages/student/college/CollegePage";
import { InstructorList } from "../pages/student/instructor/InstructorList";
import { InstructorPage } from "../pages/student/instructor/InstructorPage";
import { ExplainPage } from "../pages/student/college/ExplainPage";
import { OptPage } from "../pages/student/instructor/OptPage";



import { FormsModule } from "@angular/forms";
import { OptData } from "./service/OptData";
import { ColData } from "./service/ColData";

@NgModule({
    declarations: [
        MyApp,
        ListPage,
        CollegePage,
        InstructorList,
        InstructorPage,
        OptPage,
        ExplainPage
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
                {component: CollegePage, name: 'index', segment: 'index', defaultHistory: []},//首页
                {component: ExplainPage, name: 'explainPage', segment: 'explainPage'},//首页
            ]
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ListPage,
        CollegePage,
        InstructorList,
        InstructorPage,
        OptPage,
        ExplainPage
    ],
    providers: [HttpService, HelpUtils, OptData,ColData, {
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }]
})
export class AppModule {
}

