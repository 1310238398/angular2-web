import {RouterModule, Routes} from "@angular/router";
import {StaffListComponent} from "./staff.list";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: StaffListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {
}
