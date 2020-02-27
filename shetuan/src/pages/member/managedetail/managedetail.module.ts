import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ManageDetailPage} from "./managedetail";


@NgModule({
  declarations: [
    ManageDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageDetailPage),
  ],
  exports: [
    ManageDetailPage
  ]
})
export class ManageDetailPageModule { }


