import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DormitoryretreatComponent} from "./retreat/dormitoryretreat.component";



const routes: Routes = [
  {
    path: '', component: DormitoryretreatComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DormitoryretreatRoutingModule {
}
