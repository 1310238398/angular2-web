import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { GeographyComponent } from './geography.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [GeographyComponent],
  exports: [GeographyComponent]
})
export class GeographyModule { }
