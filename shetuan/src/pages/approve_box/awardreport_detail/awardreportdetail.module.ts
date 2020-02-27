import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwardReportDetailPage } from "./awardreportdetail";




@NgModule({
  declarations: [
    AwardReportDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AwardReportDetailPage),
  ],
  entryComponents: [
    AwardReportDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AwardReportDetailPageModule { }
