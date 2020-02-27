import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitorEmptyPage } from "./monitorempty";
import { HelpUtils } from '../../../app/utils/HelpUtils';


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    MonitorEmptyPage,
  ],
  imports: [
    IonicPageModule.forChild(MonitorEmptyPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    MonitorEmptyPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[HelpUtils]

})
export class MonitorEmptyPageModule { }
