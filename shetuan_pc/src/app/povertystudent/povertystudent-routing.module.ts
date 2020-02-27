import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WaitIndexComponent} from "./waitindex/waitindex.component";
import {CreateShetuanComponent} from "./createshetuan/createshetuan.component";
import {OrganizeGuanliComponent} from "./organizeguanli/organizeguanli.component";
import {ShetuanManageComponent}  from "./shetuanmanage/shetuanmanage.component";
import {ShetuanActivityComponent} from "./shetuanactivity/shetuanactivity.component";
import { GoToShetuanComponent } from './gotoshetuan/gotoshetuan.component';



const routes: Routes = [
  {
    path: '', component: WaitIndexComponent
  },
  {
    path: 'shetuan', component: CreateShetuanComponent
  },
  {
    path: 'goshetuan', component: GoToShetuanComponent
  },
  {
    path: 'organizeguanli', component: OrganizeGuanliComponent
  },
  {
    path: 'shetuanmanage', component: ShetuanManageComponent
  },
  {
    path: 'shetuanactivity', component: ShetuanActivityComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PovertyStudentRoutingModule {
}
