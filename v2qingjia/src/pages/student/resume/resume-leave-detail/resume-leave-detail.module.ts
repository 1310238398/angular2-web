import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumeLeaveDetailPage } from './resume-leave-detail';
import {ApplydetailComponentsModule} from "../../../../components/apply-leave-detail/applydetail.components.module";
import {PipesModule} from "../../../../pipes/stringtodate/pipes.module";
import {StepsModule} from "../../../../components/steps/steps.module";
import {CommonService} from "../../../../app/service/CommonService";

@NgModule({
  declarations: [
    ResumeLeaveDetailPage,
  ],
  imports: [
    ApplydetailComponentsModule,
    PipesModule,
    StepsModule,
    IonicPageModule.forChild(ResumeLeaveDetailPage),
  ],
  providers:[CommonService]
})
export class ResumeLeaveDetailPageModule {}
