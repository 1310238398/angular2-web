import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QingongUpDetailPage } from "./qingongup_detail";




@NgModule({
  declarations: [
    QingongUpDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QingongUpDetailPage),
  ],
  entryComponents: [
    QingongUpDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class QingongUpDetailPagePageModule { }
