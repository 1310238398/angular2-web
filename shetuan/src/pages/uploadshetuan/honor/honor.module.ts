import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HonorPage } from "./honor";


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    HonorPage,
  ],
  imports: [
    IonicPageModule.forChild(HonorPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    HonorPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class HonorPageModule { }
