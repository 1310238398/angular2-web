import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WaitDecideindexComponent} from "./waitdecideindex/waitdecideindex.component";
import {PublishtaskComponent} from "./publishtask/publishtask.component";

import {WaitdecideHomepageComponent} from "./waitdecidehomepage/waitdecidehomepage.component";
import {StudentWaitdecideComponent} from "./studentwaitdecide/studentwaitdecide.component";
import {GroupNameComponent} from "./groupname/groupname.component";

import {PersonalIndexComponent} from "./personaldetail/personalindex.component";
import {ResultSeeComponent} from "./resultsee/resultsee.component";

const routes: Routes = [
  {
    path: '', component: WaitDecideindexComponent
  },
  {
    path: 'publishtask', component: PublishtaskComponent,
  },
  {
    path: 'waitdecidehomepage', component: WaitdecideHomepageComponent,
  },
  {
    path: 'studentwaitdecide', component: StudentWaitdecideComponent,
  },
  {
    path: 'groupname', component: GroupNameComponent,
  },
  {
    path: 'personalindex', component: PersonalIndexComponent,
  },
  {
    path: 'resultsee', component: ResultSeeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitDecideRoutingModule {
}
