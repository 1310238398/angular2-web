import { ModalComponent } from './modal/modal.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { FdyComponent } from './fdy.component';
import { NotWriteComponent } from './notwrite/notwrite.component';
import { FdyRouteRoutes } from './fdy-route.routing';
import { ModalHelper } from '../share/modalHelper';
const com = [ModalComponent];
@NgModule({
  imports: [
    SharedModule,
    FdyRouteRoutes
  ],
  declarations: [FdyComponent, NotWriteComponent, ...com],
  entryComponents: [NotWriteComponent, ...com],
  providers: [ModalHelper]
})
export class FdyModule { }
