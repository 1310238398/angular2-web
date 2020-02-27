import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'poverty',
    loadChildren: './povertystudent/povertystudent.module#PovertyStudentModule'
  },
  {
    path: 'waitdecide',
    loadChildren: './waitdecide/waitdecide.module#WaitDecideModule'
  },
  {
    path: 'searchinfo',
    loadChildren: './searchinfo/searchinfo.module#SearchInfoModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
