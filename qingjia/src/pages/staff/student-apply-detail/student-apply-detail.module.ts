import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentApplyDetailPage } from './student-apply-detail';
import {UserInfoComponentsModule} from "../../../components/userinfo/userinfo.components.module";
import {ApplydetailComponentsModule} from "../../../components/apply-leave-detail/applydetail.components.module";
import {CommonService} from "../../../app/service/CommonService";

@NgModule({
  declarations: [
    StudentApplyDetailPage,
  ],
  imports: [
    UserInfoComponentsModule,
    ApplydetailComponentsModule,
    IonicPageModule.forChild(StudentApplyDetailPage),
  ],
  providers:[CommonService]
})
export class StudentApplyDetailPageModule {}
