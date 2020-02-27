import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {HelpUtils} from "./utils/HelpUtils";
import {HttpService} from "../http/http.Service";
import {HttpClientModule} from "@angular/common/http";

//import { PromiseService } from '../pages/promisebook/promise.servise';



@NgModule({
  declarations: [
    MyApp,
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
    MyApp,
  ],
  providers: [
    HttpService, HelpUtils,//PromiseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
})
export class AppModule {}
