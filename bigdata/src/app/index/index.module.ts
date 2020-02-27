import {NgModule} from '@angular/core';
import {IndexComponent} from './index.component';
import {ModalHelper} from 'src/app/share/modalHelper';
import {ExpandComponent} from './expand/expand.component';
import {SharedModule} from '../shared/shared.module';
import { IndexRoutes } from 'src/app/index/index.routing';
import { StudentComponent } from './student/student.component';
import { LeaveapplyComponent } from './leaveapply/leaveapply.component';
import { CalcService } from 'src/app/service/calc.service';
import { CommonService } from 'src/app/service/common.service';
import { StudentareaComponent } from './studentarea/studentarea.component';
import { MoreComponent } from './student/more/more.component';
import {XiaojiaComponent} from "./xiaojia/xiaojia.component";

const components = [ExpandComponent, StudentComponent, LeaveapplyComponent, StudentareaComponent, MoreComponent,XiaojiaComponent];

@NgModule({
  imports: [
    SharedModule,
    IndexRoutes
  ],
  declarations: [IndexComponent, ...components,
    StudentComponent,
    LeaveapplyComponent,
    StudentareaComponent
],
  entryComponents: [...components],
  providers: [ModalHelper, CalcService, CommonService],
})
export class IndexModule {
}
