import { NgModule } from '@angular/core';
import { StaffListComponent } from './staff-list.component';
import { SharedModule } from '../shared/shared.module';
import { StaffListRoutes } from './staff-list.routing';
import {CommonService} from "../service/common.service";

@NgModule({
  imports: [
    SharedModule,
    StaffListRoutes
  ],
  declarations: [StaffListComponent],
    providers:[CommonService]
})
export class StaffListModule { }
