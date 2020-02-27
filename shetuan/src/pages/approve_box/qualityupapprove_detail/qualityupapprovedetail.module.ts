import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QualityUpApproveDetailPage } from "./qualityupapprovedetail";




@NgModule({
  declarations: [
    QualityUpApproveDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QualityUpApproveDetailPage),
  ],
  entryComponents: [
    QualityUpApproveDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class QualityUpApproveDetailPageModule { }
