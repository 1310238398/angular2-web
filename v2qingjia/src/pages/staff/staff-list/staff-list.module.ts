import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffListPage } from './staff-list';
import {PipesModule} from "../../../pipes/stringtodate/pipes.module";
import {CommonService} from "../../../app/service/CommonService";

@NgModule({
  declarations: [
    StaffListPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(StaffListPage),
  ],
  providers:[CommonService]
})
export class StaffListPageModule {}
