import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampusFuncRoutingModule } from './campus-func-routing.module';
import { FuncComponent } from './func/func.component';
import {SharedModule} from "../shared/shared.module";
import { FuncEditComponent } from './func/func-edit/func-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CampusFuncRoutingModule
  ],
  declarations: [FuncComponent, FuncEditComponent],
  entryComponents:[FuncEditComponent]
})
export class CampusFuncModule { }
