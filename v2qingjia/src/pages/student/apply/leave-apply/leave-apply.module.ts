import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LeaveApplyPage} from "./leave-apply";

@NgModule({
  declarations: [
    LeaveApplyPage
  ],
  imports: [
    IonicPageModule.forChild(LeaveApplyPage),
  ],
})
export class LeaveApplyDetailPageModule {}
