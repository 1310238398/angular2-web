import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeClassApplyDetailPage } from "./changeclassapply_detail";




@NgModule({
  declarations: [
    ChangeClassApplyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeClassApplyDetailPage),
  ],
  entryComponents: [
    ChangeClassApplyDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class ChangeClassApplyDetailPagePageModule { }
