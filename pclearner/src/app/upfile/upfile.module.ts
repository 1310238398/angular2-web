import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {UpfileComponent} from "./upfile.component";
import {UpfileRoutingModule} from "./upfile.routing.module";
import {RouterModule} from "@angular/router";

import {SharedModule} from "../shared/shared.module";
import {CommonService} from "../service/common.service";

import { HttpService } from '../../http/http.service';


@NgModule({
  imports: [
    UpfileRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
  	UpfileComponent
  ],
  exports: [RouterModule],
  providers: [CommonService,HttpService],

})
export class UpfileModule { }

