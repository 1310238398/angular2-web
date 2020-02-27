import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {InformationfillingPage} from '../pages/search/Informationfilling';
import {FamilyAddressPage} from "../pages/search/familyaddress/FamilyAddress";
import {PersonreponPage} from "../pages/search/personrepon/Personrepon";
import {FamilyeconomyPage} from "../pages/search/familyeconomy/familyeconomy";
import {RewardPage} from "../pages/search/reward/Reward";
import {SuccessfullPage} from "../pages/search/successfull/Successfull";
import {HttpModule} from "@angular/http";
import {HelpUtils} from "./utils/HelpUtils";
import {HttpService} from "../http/http.Service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser'


@NgModule({
  declarations: [
    MyApp,
    InformationfillingPage,
    FamilyAddressPage,
    PersonreponPage,
    FamilyeconomyPage,
    RewardPage,
    SuccessfullPage

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
        {component: PersonreponPage, name: 'PersonreponPage',}, 
        {component: FamilyeconomyPage, name: 'FamilyeconomyPage',}, 
        {component: RewardPage, name: 'RewardPage',},
        {component: SuccessfullPage, name: 'SuccessfullPage',}
        

      ]
    }),
    //RouterModule.forRoot(routes)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InformationfillingPage,
    FamilyAddressPage,
    PersonreponPage,
    FamilyeconomyPage,
    RewardPage,
    SuccessfullPage
  

  ],
  providers: [HttpService,  HelpUtils, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
