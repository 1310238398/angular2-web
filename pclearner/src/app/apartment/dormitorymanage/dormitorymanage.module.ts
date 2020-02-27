import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CommonService } from "../../service/common.service";
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from "@angular/router";

// 组件
import { DormitorymanageComponent } from './dormitorymanage.component';


// 路由
import { DormitorymanageRoutingModule } from './dormitorymanage.routing.module';

@NgModule({
  imports: [
    DormitorymanageRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,

  ],
  declarations: [
    DormitorymanageComponent
  ],

  exports: [RouterModule],
  providers: [CommonService]
})
export class DormitorymanageModule { }
