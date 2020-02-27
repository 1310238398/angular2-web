import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyFromPage } from "./applyfrom";


@NgModule({
  declarations: [
      ApplyFromPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyFromPage),
  ],
  exports: [
      ApplyFromPage
  ]
})
export class ApplyFromModule { }
