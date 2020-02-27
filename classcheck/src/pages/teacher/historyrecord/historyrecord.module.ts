import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryRecordPage } from './historyrecord';


@NgModule({
  declarations: [
    HistoryRecordPage
  ],
  imports: [
    IonicPageModule.forChild(HistoryRecordPage),
  ],
  entryComponents: [
    HistoryRecordPage
  ],
})
export class HistoryRecordPageModule {}
