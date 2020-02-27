import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoolStudentApplyDetailPage } from "./poolstudentapplydetail";

@NgModule({
  declarations: [
    PoolStudentApplyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PoolStudentApplyDetailPage),
  ],
  entryComponents: [
    PoolStudentApplyDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class PoolStudentApplyDetailPageModule { }
