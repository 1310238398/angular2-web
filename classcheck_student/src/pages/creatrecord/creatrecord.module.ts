import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatRecordPage } from "./creatrecord";


@NgModule({
  declarations: [
    CreatRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatRecordPage),
  ],
  entryComponents: [
    CreatRecordPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class CreatRecordPageModule { }
