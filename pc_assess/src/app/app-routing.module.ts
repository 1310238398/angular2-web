import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './fdy/fdy.module#FdyModule',
  },
  {
    path: 'staff_assess',
    loadChildren: './staff/staff.module#StaffModule',
  },
  {
    path: 'attachmment/:AttachmentCode',
    loadChildren: './attach/attach.module#AttachModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
