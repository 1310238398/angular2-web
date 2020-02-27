import {NgModule} from '@angular/core';
import {IonicPageModule} from "ionic-angular";
import {ApplyLeaveDetailComponent} from "./apply-leave-detail";
import {PipesModule} from "../../pipes/pipes.module";


@NgModule({
  declarations: [
    ApplyLeaveDetailComponent,
  ],

  imports: [
    PipesModule,
    IonicPageModule.forChild(ApplyLeaveDetailComponent),
  ],

  exports: [
    ApplyLeaveDetailComponent
  ]
})
export class ApplydetailComponentsModule {
}
