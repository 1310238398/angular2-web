import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {IndexStudentPage} from "./indexstudent";


@NgModule({
  declarations: [
    IndexStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexStudentPage),
  ],
  exports: [
    IndexStudentPage
  ]
})
export class IndexStudentPageModule { }
