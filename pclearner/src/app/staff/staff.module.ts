import {StaffListComponent} from "./staff.list";
import {StaffRoutingModule} from "./staff.routing.module";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {StaffEditComponent} from "./edit/staff.edit.component";
import {CommonService} from "../service/common.service";

const COMPONENT = [StaffEditComponent];

@NgModule({
  imports: [
    StaffRoutingModule,
    SharedModule
  ],

  declarations: [
    StaffListComponent,
    ...COMPONENT
  ],
  exports: [RouterModule],
  entryComponents: COMPONENT,
  providers: [CommonService],
})
export class StaffModule {
}
