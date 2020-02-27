import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ShetuanMemberPage} from "./shetuanmember";


@NgModule({
  declarations: [
    ShetuanMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(ShetuanMemberPage),
  ],
  exports: [
    ShetuanMemberPage
  ]
})
export class ShetuanMemberPageModule { }


