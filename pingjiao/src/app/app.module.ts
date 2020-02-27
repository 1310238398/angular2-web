import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import { EvalTeacherService } from "../pages/EvalTeacher.service";
import { ListPage } from "../pages/student/List";
// import { CollegePage } from "../pages/student/college/CollegePage";
// import { ExplainPage } from "../pages/student/college/ExplainPage";
import {EvalProblem} from "../pages/student/evaluation/EvalProblem";
import {QuestionPage} from "../pages/student/evaluation/QuestionPage";

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { OptData } from "./service/OptData";
import { ColData } from "./service/ColData";


@NgModule({
    declarations: [
        MyApp,
        ListPage,
        // CollegePage,
        // ExplainPage,
        EvalProblem,
        QuestionPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        IonicModule.forRoot(MyApp, {
            mode: 'ios',
            iconMode: 'ios',
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            tabsPlacement: 'bottom',
            pageTransition: 'ios'
        }, {
            links: [
                {component: ListPage, name: 'index', segment: 'index', defaultHistory: []},//首页
                {component: EvalProblem,  segment: 'evalProblem/:params'},//解释页
                {component:QuestionPage, segment:'questionPage/:params'}, //测评题目
                // {component: ExplainPage, name: 'explainPage', segment: 'explainPage'},//首页
                // {component: CollegePage, name: 'collegePage', segment: 'collegePage'},//学院测评
            ]
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ListPage,
        // CollegePage,
        // ExplainPage,
        EvalProblem,
        QuestionPage,
    ],
    providers: [EvalTeacherService, HttpService, HelpUtils, OptData,ColData, {
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }]
})
export class AppModule {
}
