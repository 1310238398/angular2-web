import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPage } from "./activity";


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    ActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    ActivityPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class ActivityPageModule { }
