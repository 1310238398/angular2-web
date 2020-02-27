import {NgModule} from '@angular/core';
import {IonicPageModule} from "ionic-angular";
import {StepsComponent} from "./steps";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    StepsComponent
  ],

  imports: [
    NgbModule.forRoot(),
    IonicPageModule.forChild(StepsComponent),
  ],

  exports: [
    StepsComponent
  ]
})
export class StepsModule {
}
