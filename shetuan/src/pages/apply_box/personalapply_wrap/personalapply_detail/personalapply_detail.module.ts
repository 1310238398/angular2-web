import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalApplyDetailPage } from "./personalapply_detail";




@NgModule({
  declarations: [
    PersonalApplyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalApplyDetailPage),
  ],
  entryComponents: [
    PersonalApplyDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class PersonalApplyDetailPageModule { }
