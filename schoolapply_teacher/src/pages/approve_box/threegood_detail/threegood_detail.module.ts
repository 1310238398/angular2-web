import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThreeGoodDetailPage } from "./threegood_detail";




@NgModule({
  declarations: [
    ThreeGoodDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ThreeGoodDetailPage),
  ],
  entryComponents: [
    ThreeGoodDetailPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class ThreeGoodDetailPagePageModule { }
