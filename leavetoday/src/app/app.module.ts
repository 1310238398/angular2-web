import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SelectSearchableModule } from 'ionic-select-searchable';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelpUtils } from '../app/utils/HelpUtils';
import { HttpService } from '../http/http.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SelectSearchableModule,
    IonicModule.forRoot(MyApp,
      {
        mode: 'ios',
        iconMode: 'ios',
        preloadModules: true
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    HttpService,
    HelpUtils,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
