import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentresetComponent } from "./studentreset/studentreset.component";
import { AuthstatusComponent } from "./authstatus/authstatus.component";
import { AuthdetailComponent } from "./authstatus/authdetail/authdetail.component";

const routes: Routes = [
  { path: 'reset', component: StudentresetComponent },
  { path: 'authstatus', component: AuthstatusComponent },
  { path: 'authdetail', component: AuthdetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
