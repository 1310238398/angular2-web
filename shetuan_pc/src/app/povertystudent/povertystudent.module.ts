import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { HttpService } from '../../http/http.service';


import {PovertyStudentRoutingModule} from "./povertystudent-routing.module";
import {WaitIndexComponent} from "./waitindex/waitindex.component";
import {CreateShetuanComponent} from "./createshetuan/createshetuan.component";
import {OrganizeGuanliComponent} from "./organizeguanli/organizeguanli.component";
import {ShetuanManageComponent}  from "./shetuanmanage/shetuanmanage.component";
import {ShetuanActivityComponent} from "./shetuanactivity/shetuanactivity.component";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GoToShetuanComponent } from './gotoshetuan/gotoshetuan.component';



@NgModule({
  imports: [
    PovertyStudentRoutingModule,
    SharedModule
  ],
  declarations: [
    WaitIndexComponent,
    CreateShetuanComponent,
    OrganizeGuanliComponent,
    ShetuanManageComponent,
    ShetuanActivityComponent,
    GoToShetuanComponent

  ],
  exports: [RouterModule],
  providers: [HttpService],

})
export class PovertyStudentModule { }
