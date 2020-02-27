import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApartmentlistComponent} from './apartmentsearchlist/apartmentlist.component';

const routes: Routes = [
  {path: '', component: ApartmentlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentSearchRoutingModule {
}