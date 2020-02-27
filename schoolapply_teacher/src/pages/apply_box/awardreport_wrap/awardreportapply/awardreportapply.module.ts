import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwardReportApplyPage } from "./awardreportapply";


import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    AwardReportApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(AwardReportApplyPage),
    SelectSearchableModule,
  ],
  entryComponents: [
    AwardReportApplyPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AwardReportApplyPageModule { }
