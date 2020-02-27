import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TianbaoPage } from "./tianbao";


@NgModule({
  declarations: [
    TianbaoPage,
  ],
  imports: [
    IonicPageModule.forChild(TianbaoPage),
  ],
  entryComponents: [
    TianbaoPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class TianbaoPageModule { }
