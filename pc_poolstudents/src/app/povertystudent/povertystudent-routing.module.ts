import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WaitIndexComponent} from "./waitindex/waitindex.component";
import {WaitDetailComponent} from "./waitdetail/waitdetail.component";

const routes: Routes = [
  {
    path: '', component: WaitIndexComponent
  },
  {
    path: 'waitdetail', component: WaitDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PovertyStudentRoutingModule {
}
