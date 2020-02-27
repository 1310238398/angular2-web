import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartDetailPage } from "./partdetail";




@NgModule({
  declarations: [
    PartDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PartDetailPage),
  ],
  entryComponents: [
    PartDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class PartDetailPageModule { }
