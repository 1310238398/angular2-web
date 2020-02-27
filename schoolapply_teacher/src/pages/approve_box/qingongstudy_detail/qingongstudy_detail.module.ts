import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QingongStudyDetailPage } from "./qingongstudy_detail";




@NgModule({
  declarations: [
    QingongStudyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QingongStudyDetailPage),
  ],
  entryComponents: [
    QingongStudyDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class QingongStudyDetailPagePageModule { }
