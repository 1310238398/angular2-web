import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherListPage } from './other-list';
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    OtherListPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(OtherListPage),
  ],
})
export class OtherListPageModule {}
