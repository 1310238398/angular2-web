import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListComponent} from "./list/list";
import {GuanLiComponent} from "./guanli/guanli";


const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'guanli', component: GuanLiComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PovertyStudentRoutingModule {
}
