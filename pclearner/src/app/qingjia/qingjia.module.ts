import { NgModule } from '@angular/core';

import { QingjiaRoutingModule } from './qingjia-routing.module';
import { QingjiaComponent } from './qingjia/qingjia.component';
import {SharedModule} from "../shared/shared.module";
import {CommonService} from "../service/common.service";
import {DatascopeModule} from "../component/datascope/datascope.module";
const COMPOMENTS=[QingjiaComponent];
@NgModule({
  imports: [
    SharedModule,
    DatascopeModule,
    QingjiaRoutingModule
  ],

  declarations: [...COMPOMENTS],
  providers:[CommonService]
})
export class QingjiaModule { }
