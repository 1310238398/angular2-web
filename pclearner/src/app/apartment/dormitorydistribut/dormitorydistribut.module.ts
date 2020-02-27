import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTreeModule } from 'ng-tree-antd';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DormitorydistributComponent } from './distribution/dormitorydistribut.component';
import { DormitorydistributRoutingModule } from "./dormitorydistribut-routing.module";

@NgModule({
  imports: [
      DormitorydistributRoutingModule,
      CommonModule,
      FormsModule,
      SharedModule,
      NzTreeModule
  ],
  declarations: [
      DormitorydistributComponent
  ],
  exports: [RouterModule],
  providers: [CommonService],

})
export class DormitorydistributModule { }
