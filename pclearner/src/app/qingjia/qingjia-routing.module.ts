import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QingjiaComponent} from "./qingjia/qingjia.component";

const routes: Routes = [
  {path:'',component:QingjiaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QingjiaRoutingModule { }
