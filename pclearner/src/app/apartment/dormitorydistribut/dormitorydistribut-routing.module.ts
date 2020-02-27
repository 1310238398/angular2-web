import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DormitorydistributComponent} from "./distribution/dormitorydistribut.component";



const routes: Routes = [
  {
    path: '', component: DormitorydistributComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DormitorydistributRoutingModule {
}
