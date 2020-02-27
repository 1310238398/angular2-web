import {NgModule} from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import {SharedModule} from "../shared/shared.module";
import {CounselorManageCheckRoutingModule} from './counselormanagecheck-routing.module';
import {TypeListComponent} from "./typelist/typelist.component";
import {DataStatisticsComponent} from "./datastatistics/datastatistics.component";
import {ContDetailCheckComponent} from "./contdetailcheck/contdetailcheck.component";



const COMPOMENTS = [DataStatisticsComponent];

@NgModule({
  imports: [
    SharedModule,
    NgxEchartsModule,
    CounselorManageCheckRoutingModule
  ],
  declarations: [
    TypeListComponent,
    DataStatisticsComponent,
    ContDetailCheckComponent

  ],
  entryComponents: [COMPOMENTS]
})
export class CounselorManageCheckModule {
}
