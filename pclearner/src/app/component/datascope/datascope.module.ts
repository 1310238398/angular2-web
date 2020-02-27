import { NgModule } from '@angular/core';
import {DatascopeComponent} from "./datascope.component";
import {SharedModule} from "../../shared/shared.module";

const COMPOMENTS=[DatascopeComponent];
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [...COMPOMENTS],
  exports:[DatascopeComponent]
})
export class DatascopeModule { }
