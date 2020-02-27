import { NgModule } from '@angular/core';
import { AcademyComponent } from './academy.component';
import {SharedModule} from '../shared/shared.module';
import {AcademyRoutes} from './academy.routing';

@NgModule({
  imports: [
    SharedModule,
    AcademyRoutes
  ],
  declarations: [AcademyComponent]
})
export class AcademyModule { }
