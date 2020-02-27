import {NgModule} from '@angular/core';

import {StudentRoutingModule} from './student-routing.module';
import {StudentresetComponent} from './studentreset/studentreset.component';
import {SharedModule} from "../shared/shared.module";
import {AuthstatusComponent} from './authstatus/authstatus.component';
import {AuthdetailComponent} from './authstatus/authdetail/authdetail.component';
import {EditStudentstatusComponent} from './studentreset/edit-studentstatus/edit-studentstatus.component';
import {StudentEditComponent} from "./studentreset/edit/student.edit.component";
import {CommonService} from "../service/common.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  declarations: [StudentresetComponent, AuthstatusComponent, AuthdetailComponent,EditStudentstatusComponent,StudentEditComponent],
  entryComponents:[EditStudentstatusComponent,StudentEditComponent],
  providers:[CommonService]
})
export class StudentModule {
}
