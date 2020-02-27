import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityEndPage } from "./activityend";


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    ActivityEndPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityEndPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    ActivityEndPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class ActivityEndPageModule { }
