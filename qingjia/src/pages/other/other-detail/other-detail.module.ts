import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherDetailPage } from './other-detail';
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    OtherDetailPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(OtherDetailPage),
  ],
})
export class OtherDetailPageModule {}
