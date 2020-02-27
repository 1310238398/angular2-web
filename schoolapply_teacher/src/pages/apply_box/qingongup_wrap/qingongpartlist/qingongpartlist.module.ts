import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QingongPartListPage } from "./qingongpartlist";




@NgModule({
  declarations: [
    QingongPartListPage,
  ],
  imports: [
    IonicPageModule.forChild(QingongPartListPage),
  ],
  entryComponents: [
    QingongPartListPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class QingongPartListPageModule { }
