import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumeLeaveListPage } from './resume-leave-list';
import {PipesModule} from "../../../../pipes/stringtodate/pipes.module";

@NgModule({
  declarations: [
    ResumeLeaveListPage,
  ],
  imports: [
    IonicPageModule.forChild(ResumeLeaveListPage),
    PipesModule,
  ]
})
export class ResumeLeaveListPageModule {}
