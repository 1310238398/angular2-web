import { ModalComponent } from './modal/modal.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ModalHelper } from '../share/modalHelper';
import {StaffComponent} from "./staff.component";
import {StaffRouteRoutes} from "./staff-route.routing";

const com = [ModalComponent];
@NgModule({
  imports: [
    SharedModule,
    StaffRouteRoutes
  ],
  declarations: [StaffComponent, ...com],
  entryComponents: [...com],
  providers: [ModalHelper]
})
export class StaffModule { }
