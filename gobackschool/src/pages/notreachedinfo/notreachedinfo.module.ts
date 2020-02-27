import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotReachedInfoPage } from "./notreachedinfo";


@NgModule({
  declarations: [
    NotReachedInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(NotReachedInfoPage),
  ],
  exports: [
    NotReachedInfoPage
  ]
})
export class NotReachedInfoPageModule { }
