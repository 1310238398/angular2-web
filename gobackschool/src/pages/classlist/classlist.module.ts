import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassListPage } from "./classlist";


@NgModule({
  declarations: [
    ClassListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassListPage),
  ],
  exports: [
    ClassListPage
  ]
})
export class ClassListPageModule { }
