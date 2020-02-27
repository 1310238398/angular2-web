import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'counselormanage',
    loadChildren: './counselormanage/counselormanage.module#CounselorManageModule'
  },
  {
    path: 'counselormanagecheck',
    loadChildren: './counselormanagecheck/counselormanagecheck.module#CounselorManageCheckModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
