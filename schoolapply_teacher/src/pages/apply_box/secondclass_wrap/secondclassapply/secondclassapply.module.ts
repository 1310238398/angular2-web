import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecondClassApplyPage } from "./secondclassapply";


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    SecondClassApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(SecondClassApplyPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    SecondClassApplyPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class SecondClassApplyPageModule { }
