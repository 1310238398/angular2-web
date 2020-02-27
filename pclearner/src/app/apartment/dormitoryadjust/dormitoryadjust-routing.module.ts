import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DormitoryadjustComponent} from "./adjust/dormitoryadjust.component";



const routes: Routes = [
  {
    path: '', component: DormitoryadjustComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DormitoryadjustRoutingModule {
}
