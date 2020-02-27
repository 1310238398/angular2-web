import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTreeModule } from 'ng-tree-antd';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DormitoryretreatComponent } from './retreat/dormitoryretreat.component';
import { DormitoryretreatRoutingModule } from "./dormitoryretreat-routing.module";

@NgModule({
  imports: [
      DormitoryretreatRoutingModule,
      CommonModule,
      FormsModule,
      SharedModule,
      NzTreeModule
  ],
  declarations: [
      DormitoryretreatComponent
  ],
  exports: [RouterModule],
  providers: [CommonService],

})
export class DormitoryretreatModule { }
