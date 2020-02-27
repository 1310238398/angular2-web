import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTreeModule } from 'ng-tree-antd';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DormitoryadjustComponent } from './adjust/dormitoryadjust.component';
import { DormitoryadjustRoutingModule } from "./dormitoryadjust-routing.module";

@NgModule({
  imports: [
      DormitoryadjustRoutingModule,
      CommonModule,
      FormsModule,
      SharedModule,
      NzTreeModule
  ],
  declarations: [
      DormitoryadjustComponent
  ],
  exports: [RouterModule],
  providers: [CommonService],

})
export class DormitoryadjustModule { }
