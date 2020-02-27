import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ApplicationListPage} from "./applicationlist";


@NgModule({
  declarations: [
      ApplicationListPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicationListPage),
  ],
  exports: [
      ApplicationListPage
  ]
})
export class ApplicationListPageModule { }
