import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EconomyStatusSummaryComponent} from "./economy-status-summary/economy-status-summary.component";
import {EconomyDetailSummaryComponent} from "./economy-detail-summary/economy-detail-summary.component";
import {EconomyDetailMaterialsComponent} from "./economy-detail-materials/economy-detail-materials.component";
import {EconomyStatusComponent} from "./economy-status/economy-status.component";

const routes: Routes = [
  {
    path: ':pid', component: EconomyStatusSummaryComponent
  },
  {
    path: 'EconomyDetailSummary/:code', component: EconomyDetailSummaryComponent,
    children: [
      {path: '', component: EconomyDetailMaterialsComponent},
      {path: 'ecostatus', component: EconomyStatusComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoolstudentRoutingModule {
}
