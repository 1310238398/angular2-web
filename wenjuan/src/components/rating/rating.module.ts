import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {Ionic2Rating} from "./rating";

@NgModule({
  declarations: [
    Ionic2Rating
  ],
  imports: [
    IonicPageModule.forChild(Ionic2Rating),
  ],
  exports: [
    Ionic2Rating
  ]
})
export class RatingModule {}
