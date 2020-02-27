import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

//组件
import { DormitorycheckComponent } from './dormitorycheck.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { PreviewcheckComponent } from './previewcheck/previewcheck.component';
import { ResultComponent } from './result/result.component';
import { ProgressComponent } from './progress/progress.component';
import { PeopleComponent } from './progress/people.component';
import { DormComponent } from './progress/dorm.component';


import { AssignDormitoryComponent } from './assigndormitory/assigndormitory.component'
import { ResultDetailComponent } from "./result/resultdetails.component";

const routes: Routes = [

  { path: '', component: DormitorycheckComponent },

  { path: 'newtask', component: NewtaskComponent },
  { path: 'assign', component: AssignDormitoryComponent },
  { path: 'previewcheck', component: PreviewcheckComponent },
  { path: 'result', component: ResultComponent },
  {
    path: 'progress', component: ProgressComponent,
    children: [
      { path: '', component: PeopleComponent },
      { path: 'dorm', component: DormComponent },
    ]
  },
  { path: 'resultdetail', component: ResultDetailComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckRoutingModule {
}
