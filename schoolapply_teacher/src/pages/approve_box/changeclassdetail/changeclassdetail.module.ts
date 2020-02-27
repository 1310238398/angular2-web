import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeClassDetailPage } from "./changeclassdetail";




@NgModule({
  declarations: [
    ChangeClassDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeClassDetailPage),
  ],
  entryComponents: [
    ChangeClassDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class ChangeClassDetailPageModule { }
