import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {TypeListComponent} from "./typelist/typelist.component";
import {DataStatisticsComponent} from "./datastatistics/datastatistics.component";
import {ContDetailCheckComponent} from "./contdetailcheck/contdetailcheck.component";



const routes: Routes = [
  {path:'',component:DataStatisticsComponent},
  {path:'typelist',component:TypeListComponent}, 
  {path:'contdetailcheck',component:ContDetailCheckComponent},  


  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounselorManageCheckRoutingModule {}
