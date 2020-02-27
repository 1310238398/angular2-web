import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SharedModule} from "../shared/shared.module";
import {CommonService} from "../service/common.service";
import {RouterModule} from "@angular/router";

import { HttpService } from '../../http/http.service';


import {WaitDecideRoutingModule} from "./waitdecide-routing.module";
import {WaitDecideindexComponent} from "./waitdecideindex/waitdecideindex.component";
import {PublishtaskComponent} from "./publishtask/publishtask.component";

import {WaitdecideHomepageComponent} from "./waitdecidehomepage/waitdecidehomepage.component";
import {StudentWaitdecideComponent} from "./studentwaitdecide/studentwaitdecide.component";
import {GroupNameComponent} from "./groupname/groupname.component";

import {PersonalIndexComponent} from "./personaldetail/personalindex.component";
import {TeacherViewComponent} from "./personaldetail/teacherview/teacherview.component";
import {StudentViewComponent} from "./personaldetail/studentview/studentview.component";

import {ApplyBookComponent} from "./personaldetail/applybook/applybook.component";
import {JingjiquestionComponent} from "./personaldetail/jingjiquestion/jingjiquestion.component";
import {SelfquestionComponent} from "./personaldetail/selfquestion/selfquestion.component";

import {ResultSeeComponent} from "./resultsee/resultsee.component";

@NgModule({
  imports: [
    WaitDecideRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    WaitDecideindexComponent,
    PublishtaskComponent,
    WaitdecideHomepageComponent,
    StudentWaitdecideComponent,
    GroupNameComponent,
    PersonalIndexComponent,
    TeacherViewComponent,
    StudentViewComponent,
    ResultSeeComponent,
    ApplyBookComponent,
    JingjiquestionComponent,
    SelfquestionComponent
  ],
  exports: [RouterModule],
  providers: [CommonService,HttpService],

})
export class WaitDecideModule { }
