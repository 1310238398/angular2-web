import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ShetuanInfoPage} from "./shetuaninfo";


@NgModule({
  declarations: [
    ShetuanInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ShetuanInfoPage),
  ],
  exports: [
    ShetuanInfoPage
  ]
})
export class ShetuanInfoPageModule { }


