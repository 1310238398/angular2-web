import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ApplyListPage} from "./applylist";


@NgModule({
  declarations: [
    ApplyListPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyListPage),
  ],
  exports: [
    ApplyListPage
  ]
})
export class ApplyListPageModule { }
