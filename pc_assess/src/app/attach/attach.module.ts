import { NgModule } from '@angular/core';
import { AttachComponent } from './attach.component';
import {SharedModule} from "../shared/shared.module";
import {AttachRouteRoutes} from "./attach-route.routing";

@NgModule({
  imports: [
    SharedModule,
    AttachRouteRoutes
  ],
  declarations: [AttachComponent]
})
export class AttachModule { }
