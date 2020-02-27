import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {UpfileComponent} from "./upfile.component";


const routes: Routes = [
  {
    path: '',
    component: UpfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpfileRoutingModule {
}

