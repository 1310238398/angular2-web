import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from "../service/common.service";
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from "@angular/router";
// 组件
import { LeaveschoolComponent } from './leaveschool.component';


// 路由
import { LeaveScoolRoutingModule }  from './leaveschool.routing.module'
@NgModule({
  imports: [
    LeaveScoolRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    LeaveschoolComponent,

  ],

  exports: [RouterModule],
  providers: [CommonService]
})
export class LeaveschoolModule { }

