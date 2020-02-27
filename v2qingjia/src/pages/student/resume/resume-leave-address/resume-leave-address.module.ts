import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumeLeaveAddressPage } from './resume-leave-address';
import {CommonService} from "../../../../app/service/CommonService";
@NgModule({
  declarations: [
    ResumeLeaveAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(ResumeLeaveAddressPage),
  ],
  providers:[CommonService]
})
export class ResumeLeaveAddressPageModule {}
