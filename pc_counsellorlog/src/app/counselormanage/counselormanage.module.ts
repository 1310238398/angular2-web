import {NgModule} from '@angular/core';

import {CounselorManageRoutingModule} from './counselormanage-routing.module';
import {SharedModule} from "../shared/shared.module";

import {TypeListComponent} from "./typelist/typelist.component";
import {ContDetailComponent} from "./contdetail/contdetail.component";
import {CreateTaskComponent} from "./createtask/createtask.component";


import {NgxTinymceModule} from "ngx-tinymce";

const COMPOMENTS = [ContDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    NgxTinymceModule.forRoot({
      baseURL: 'assets/lib/tinymce/'
    }),
    CounselorManageRoutingModule
  ],
  declarations: [
    TypeListComponent,
    ContDetailComponent,
    CreateTaskComponent
  ],
  entryComponents: [COMPOMENTS]
})
export class CounselorManageModule {
}
