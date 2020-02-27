import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SearchIndexComponent} from "./searchindex/searchindex.component";

const routes: Routes = [
  {
    path: '', component: SearchIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchInfoRoutingModule {
}
