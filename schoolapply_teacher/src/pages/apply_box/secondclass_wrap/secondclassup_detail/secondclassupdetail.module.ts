import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecondClassUpDetailPage } from "./secondclassupdetail";




@NgModule({
  declarations: [
    SecondClassUpDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SecondClassUpDetailPage),
  ],
  entryComponents: [
    SecondClassUpDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class SecondClassUpDetailPageModule { }
