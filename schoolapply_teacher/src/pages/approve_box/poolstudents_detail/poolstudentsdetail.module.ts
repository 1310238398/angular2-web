import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoolStudentsDetailPage } from "./poolstudentsdetail";

@NgModule({
  declarations: [
    PoolStudentsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PoolStudentsDetailPage),
  ],
  entryComponents: [
    PoolStudentsDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class PoolStudentsDetailPageModule { }
