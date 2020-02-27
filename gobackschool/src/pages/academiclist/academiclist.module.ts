import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcademicListPage } from "./academiclist";


@NgModule({
  declarations: [
    AcademicListPage,
  ],
  imports: [
    IonicPageModule.forChild(AcademicListPage),
  ],
  exports: [
    AcademicListPage
  ]
})
export class AcademicListPageModule { }
