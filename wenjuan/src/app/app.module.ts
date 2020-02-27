import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { QuestionServiceProvider } from '../providers/question-service/question-service';
import {HttpService} from "../http/http.Service";
import {HelpUtils} from "./utils/HelpUtils";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      mode: 'ios',
      iconMode: 'ios',
      preloadModules: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService, HelpUtils,
    QuestionServiceProvider,
  ]
})
export class AppModule {}
