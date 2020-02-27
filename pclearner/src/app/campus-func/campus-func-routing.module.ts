import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FuncComponent} from './func/func.component';

const routes: Routes = [
  {path: '', component: FuncComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampusFuncRoutingModule {
}
