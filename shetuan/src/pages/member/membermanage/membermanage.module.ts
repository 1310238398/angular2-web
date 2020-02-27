import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MemberManagePage} from "./membermanage";


@NgModule({
  declarations: [
    MemberManagePage,
  ],
  imports: [
    IonicPageModule.forChild(MemberManagePage),
  ],
  exports: [
    MemberManagePage
  ]
})
export class MemberManagePageModule { }


