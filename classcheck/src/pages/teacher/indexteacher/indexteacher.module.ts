import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexTeacherPage } from "./indexteacher";


@NgModule({
  declarations: [
    IndexTeacherPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexTeacherPage),
  ],
  exports: [
    IndexTeacherPage
  ]
})
export class IndexTeacherPageModule { }
