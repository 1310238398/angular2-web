import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveApplyDetailPage } from './leave-apply-detail';
import {ApplydetailComponentsModule} from "../../../../components/apply-leave-detail/applydetail.components.module";

@NgModule({
  declarations: [
    LeaveApplyDetailPage
  ],
  imports: [
    ApplydetailComponentsModule,
    IonicPageModule.forChild(LeaveApplyDetailPage),
  ],
})
export class LeaveApplyDetailPageModule {}
