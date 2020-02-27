import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './index/index.module#IndexModule',
  },
  {
    path: 'stafflist',
    loadChildren: './staff-list/staff-list.module#StaffListModule',
  },
  {
    path: 'academy',
    loadChildren: './academy/academy.module#AcademyModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
