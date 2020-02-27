import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ShetuanPage} from "./shetuan";


@NgModule({
  declarations: [
    ShetuanPage,
  ],
  imports: [
    IonicPageModule.forChild(ShetuanPage),
  ],
  exports: [
    ShetuanPage
  ]
})
export class ShetuanPageModule { }


