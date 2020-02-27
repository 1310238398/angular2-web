import { NgModule} from '@angular/core';

import { PoolstudentRoutingModule } from './poolstudent-routing.module';
import { EconomyStatusSummaryComponent } from './economy-status-summary/economy-status-summary.component';
import {SharedModule} from "../shared/shared.module";
import { EconomyDetailSummaryComponent } from './economy-detail-summary/economy-detail-summary.component';
import { EconomyDetailMaterialsComponent } from './economy-detail-materials/economy-detail-materials.component';
import { EconomyStatusComponent } from './economy-status/economy-status.component';
import {CommonService} from "../service/common.service";
import {DatascopeModule} from "../component/datascope/datascope.module";
import {SwiperModule} from "ngx-swiper-wrapper";
import { PreviewComponent } from './economy-detail-materials/preview/preview.component';
const COMPOMENTS=[EconomyStatusSummaryComponent,EconomyDetailSummaryComponent,EconomyDetailMaterialsComponent];
@NgModule({
  imports: [
    SharedModule,
    DatascopeModule,
    SwiperModule,
    PoolstudentRoutingModule
  ],

  declarations: [...COMPOMENTS, EconomyStatusComponent, PreviewComponent],
  entryComponents:[PreviewComponent],
  providers:[CommonService]
})
export class PoolstudentModule { }
