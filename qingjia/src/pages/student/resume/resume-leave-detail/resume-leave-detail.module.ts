import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumeLeaveDetailPage } from './resume-leave-detail';
import {ApplydetailComponentsModule} from "../../../../components/apply-leave-detail/applydetail.components.module";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    ResumeLeaveDetailPage,
  ],
  imports: [
    ApplydetailComponentsModule,
    PipesModule,
    IonicPageModule.forChild(ResumeLeaveDetailPage),
  ],
})
export class ResumeLeaveDetailPageModule {}
