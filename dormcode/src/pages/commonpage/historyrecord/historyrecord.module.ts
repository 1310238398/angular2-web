import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryRecordPage } from "./historyrecord";
import { HelpUtils } from '../../../app/utils/HelpUtils';

@NgModule({
  declarations: [
    HistoryRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryRecordPage),
  ],
  entryComponents: [
    HistoryRecordPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[HelpUtils]

})
export class HistoryRecordPageModule { }
