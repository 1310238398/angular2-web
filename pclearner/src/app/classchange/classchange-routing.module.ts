import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentlistComponent} from "./studentlist/studentlist.component";

const routes: Routes = [
  {path: '', component: StudentlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasschangeRoutingModule {
}
