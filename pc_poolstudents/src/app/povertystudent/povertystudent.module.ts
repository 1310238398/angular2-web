import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SharedModule} from "../shared/shared.module";
import {CommonService} from "../service/common.service";
import {RouterModule} from "@angular/router";

import { HttpService } from '../../http/http.service';


import {PovertyStudentRoutingModule} from "./povertystudent-routing.module";
import {WaitIndexComponent} from "./waitindex/waitindex.component";
import {WaitDetailComponent} from "./waitdetail/waitdetail.component";

import {ApplyBookComponent} from "./waitdetail/applybook/applybook.component";
import {JingjiquestionComponent} from "./waitdetail/jingjiquestion/jingjiquestion.component";
import {SelfquestionComponent} from "./waitdetail/selfquestion/selfquestion.component";
import {StatuspassComponent} from "./waitdetail/statuspass/statuspass.component";
import {WhychangeComponent} from "./waitdetail/whychange/whychange.component";

@NgModule({
  imports: [
    PovertyStudentRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    WaitIndexComponent,
    WaitDetailComponent,
    ApplyBookComponent,
    JingjiquestionComponent,
    SelfquestionComponent,
    StatuspassComponent,
    WhychangeComponent
  ],
  exports: [RouterModule],
  providers: [CommonService,HttpService],

})
export class PovertyStudentModule { }
