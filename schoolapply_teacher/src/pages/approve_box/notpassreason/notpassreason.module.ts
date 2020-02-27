import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotPassReasonPage } from "./notpassreason";




@NgModule({
  declarations: [
    NotPassReasonPage,
  ],
  imports: [
    IonicPageModule.forChild(NotPassReasonPage),
  ],
  entryComponents: [
    NotPassReasonPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class NotPassReasonPageModule { }
