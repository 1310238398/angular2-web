import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { HttpService } from '../../http/http.service';
import { StatisticsSevice } from './list/statistics.service';



import {PovertyStudentRoutingModule} from "./povertystudent-routing.module";
import {ListComponent} from "./list/list";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {GuanLiComponent} from "./guanli/guanli";




@NgModule({
  imports: [
    PovertyStudentRoutingModule,
    SharedModule
  ],
  declarations: [
    ListComponent,
    GuanLiComponent

  ],
  exports: [RouterModule],
  providers: [HttpService,StatisticsSevice],

})
export class PovertyStudentModule { }
