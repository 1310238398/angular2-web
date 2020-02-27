import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {IndexApprovePage} from "./indexapprove";


@NgModule({
  declarations: [
    IndexApprovePage,
  ],
  imports: [
    IonicPageModule.forChild(IndexApprovePage),
  ],
  exports: [
    IndexApprovePage
  ]
})
export class IndexApprovePageModule { }
