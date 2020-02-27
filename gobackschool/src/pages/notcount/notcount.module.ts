import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotCountPage } from "./notcount";


@NgModule({
  declarations: [
    NotCountPage,
  ],
  imports: [
    IonicPageModule.forChild(NotCountPage),
  ],
  exports: [
    NotCountPage
  ]
})
export class NotCountPageModule { }
