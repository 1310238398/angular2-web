import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {StudentChangeClassComponent} from "./studentchangeclass.component";

const routes: Routes = [
  {
    path: '',
    component: StudentChangeClassComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentChangeClassRoutingModule {
}
