import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClassinfoListComponent} from "./classinfo.list";

const routes: Routes = [
  {
    path: '',
    component: ClassinfoListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassInfoRoutingModule {
}
