import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CollegerePage } from '../pages/collegeregist/Collegeregist';
import { ProfessionalrePage } from "../pages/collegeregist/professionalregist/Professionalregist";
import { ClassregistPage } from "../pages/collegeregist/professionalregist/classregist/Classregist";
import { EveryclassPage } from "../pages/collegeregist/professionalregist/classregist/everyclass/Everyclass";
import { PersoninfoPage } from "../pages/collegeregist/professionalregist/classregist/everyclass/personinfo/Personinfo";
import { SeachPersonPage } from "../pages/collegeregist/seachperson/Seachperson";
import { HttpModule } from "@angular/http";
import { HelpUtils } from "./utils/HelpUtils";
import { HttpService } from "../http/http.Service";
import {AppService} from "./app.serve";
import { SanitizeHtmlPipe } from "./utils/SanitizeHtmlPipe";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [
        MyApp,
        CollegerePage,
        ProfessionalrePage,
        SeachPersonPage,
        ClassregistPage,
        EveryclassPage,
        PersoninfoPage,
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
                {component: CollegerePage, name: 'CollegerePage', segment: '',defaultHistory: [] },
                {component: ProfessionalrePage, name: 'ProfessionalrePage', segment: 'ProfessionalrePage',defaultHistory: ['CollegerePage']},
                {component: SeachPersonPage, name: 'SeachPersonPage', segment: 'SeachPersonPage',defaultHistory: ['']},
                {component: ClassregistPage, name: 'ClassregistPage', segment: 'ClassregistPage',defaultHistory: ['']},
                {component: EveryclassPage, name: 'EveryclassPage', segment: 'EveryclassPage',defaultHistory: ['']},
                {component: PersoninfoPage, name: 'PersoninfoPage', segment: 'PersoninfoPage',defaultHistory: ['']}

            ]
        }),
        //RouterModule.forRoot(routes)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CollegerePage,
        ProfessionalrePage,
        ClassregistPage,
        EveryclassPage,
        PersoninfoPage,
        SeachPersonPage
    ],
    providers: [HttpService,AppService, HelpUtils, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
