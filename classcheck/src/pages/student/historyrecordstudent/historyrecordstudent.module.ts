import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryRecordStudentPage } from './historyrecordstudent';


@NgModule({
  declarations: [
    HistoryRecordStudentPage
  ],
  imports: [
    IonicPageModule.forChild(HistoryRecordStudentPage),
  ],
  entryComponents: [
    HistoryRecordStudentPage
  ],
})
export class HistoryRecordStudentPageModule { }
