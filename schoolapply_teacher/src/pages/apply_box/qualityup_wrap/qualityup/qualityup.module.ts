import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QualityUpPage } from "./qualityup";


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    QualityUpPage,
  ],
  imports: [
    IonicPageModule.forChild(QualityUpPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    QualityUpPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class QualityUpPageModule { }
