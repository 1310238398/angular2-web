import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {IndexApplyPage} from "./indexapply";


@NgModule({
  declarations: [
    IndexApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexApplyPage),
  ],
  exports: [
    IndexApplyPage
  ]
})
export class IndexApplyPageModule { }
