import { NgModule } from '@angular/core';

import { ClasschangeRoutingModule } from './classchange-routing.module';
import { StudentlistComponent } from './studentlist/studentlist.component';
import {SharedModule} from "../shared/shared.module";
import { ClassstudenteditComponent } from './classstudentedit/classstudentedit.component';
import { ClassstudentadmineditComponent } from './classstudentadminedit/classstudentadminedit.component';
const Component=[ClassstudenteditComponent, ClassstudentadmineditComponent];
@NgModule({
  imports: [
   SharedModule,
    ClasschangeRoutingModule
  ],
  declarations: [StudentlistComponent,...Component],
  entryComponents:[...Component]
})
export class ClasschangeModule { }
