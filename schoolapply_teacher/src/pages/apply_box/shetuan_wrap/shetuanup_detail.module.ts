import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SheTuanUpDetailPage } from "./shetuanup_detail";




@NgModule({
  declarations: [
    SheTuanUpDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SheTuanUpDetailPage),
  ],
  entryComponents: [
    SheTuanUpDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class SheTuanUpDetailPagePageModule { }
