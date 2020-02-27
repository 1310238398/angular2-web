import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SheTuanDetailPage } from "./shetuan_detail";




@NgModule({
  declarations: [
    SheTuanDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SheTuanDetailPage),
  ],
  entryComponents: [
    SheTuanDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class SheTuanDetailPagePageModule { }
