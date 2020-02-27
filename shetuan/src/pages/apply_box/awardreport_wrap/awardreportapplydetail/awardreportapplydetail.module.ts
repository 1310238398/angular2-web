import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwardReportApplyDetailPage } from "./awardreportapplydetail";




@NgModule({
  declarations: [
    AwardReportApplyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AwardReportApplyDetailPage),
  ],
  entryComponents: [
    AwardReportApplyDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AwardReportApplyDetailPageModule { }
