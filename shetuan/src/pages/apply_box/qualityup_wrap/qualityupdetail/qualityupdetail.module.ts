import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QualityUpDetailPage } from "./qualityupdetail";




@NgModule({
  declarations: [
    QualityUpDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QualityUpDetailPage),
  ],
  entryComponents: [
    QualityUpDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class QualityUpDetailPageModule { }
