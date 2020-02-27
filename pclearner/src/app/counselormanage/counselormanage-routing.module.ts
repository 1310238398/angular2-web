import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TypeListComponent} from "./typelist/typelist.component";
import {ContDetailComponent} from "./contdetail/contdetail.component";
import {CreateTaskComponent} from "./createtask/createtask.component";



const routes: Routes = [
  {path:'',component:TypeListComponent},  
  {path:'contdetail',component:ContDetailComponent},
  {path:'createtask',component:CreateTaskComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounselorManageRoutingModule {}
