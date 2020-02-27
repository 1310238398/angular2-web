import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ClassInfoRoutingModule} from "./classinfo.routing.module";
import {ClassinfoListComponent} from "./classinfo.list";
import {ClassinfoEditComponent} from "./edit/classinfo.edit.component";
import { ClassCadreComponent } from "./classcadre/cadre";

const COMPONENT = [ClassinfoEditComponent,ClassCadreComponent];

@NgModule({
  imports: [
    ClassInfoRoutingModule,
    SharedModule
  ],

  declarations: [
    ...COMPONENT,
    ClassinfoListComponent
  ],
  exports: [RouterModule],
  entryComponents: COMPONENT,
  providers: [],
})
export class ClassInfoModule {
}
