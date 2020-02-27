import { NgModule } from '@angular/core';
import { BizcodeComponent } from './bizcode.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [BizcodeComponent],
  exports: [BizcodeComponent]
})
export class BizcodeModule { }
