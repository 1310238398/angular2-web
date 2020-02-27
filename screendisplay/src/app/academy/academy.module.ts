import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AcademyComponent} from "./academy.component";
import {AcademyRoutes} from "./academy.routing";

const components = [];

@NgModule({
  imports: [
    SharedModule,
    AcademyRoutes
  ],
  declarations: [AcademyComponent, ...components
],
  entryComponents: [...components],
  providers: [],
})
export class AcademyModule {
}
