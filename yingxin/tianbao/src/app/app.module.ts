import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {InformationfillingPage} from '../pages/search/Informationfilling';
import {FamilyAddressPage} from "../pages/search/familyaddress/FamilyAddress";
import {HttpModule} from "@angular/http";
import {HelpUtils} from "./utils/HelpUtils";
import {HttpService} from "../http/http.Service";
import {AppService} from "./app.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {ProvincePage} from "../pages/search/familyaddress/province/Province";
import {CityPage} from "../pages/search/familyaddress/city/City";
import {CountyPage} from "../pages/search/familyaddress/county/County";


@NgModule({
  declarations: [
    MyApp,
    InformationfillingPage,
    FamilyAddressPage,
    ProvincePage,
    CityPage,
    CountyPage

  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'ios',
      mode: 'ios',
    }, {
      links: [
           {component: InformationfillingPage, name: 'informationfilling', segment: '', defaultHistory: []},
        {component: FamilyAddressPage, name: 'FamilyAddressPage',},  

      ]
    }),
    //RouterModule.forRoot(routes)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InformationfillingPage,
    FamilyAddressPage,
    ProvincePage,
    CityPage,
    CountyPage

  ],
  providers: [HttpService, AppService, HelpUtils, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
