import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeStatusApplyDetailPage } from "./changeStatusApply_detail";




@NgModule({
  declarations: [
    ChangeStatusApplyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeStatusApplyDetailPage),
  ],
  entryComponents: [
    ChangeStatusApplyDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class ChangeStatusApplyDetailPageModule { }
