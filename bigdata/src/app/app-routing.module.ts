import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './index/index.module#IndexModule',
  },
  {
    path: 'info',
    loadChildren: './info/info.module#InfoModule',
  },
  {
    path: 'academy',
    loadChildren: './academy/academy.module#AcademyModule',
  },
  // {
  //   path: 'assess',
  //   loadChildren: './assess/assess.module#AssessModule',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
